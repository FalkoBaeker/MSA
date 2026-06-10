"""Layout-Analyse: aus OCR-Wörtern + Bild ein strukturiertes Seitenmodell bauen.

Wir gruppieren Wörter zu Zeilen, schätzen Schriftgröße/Fettung, erkennen
waagerechte Trennlinien und Grafikbereiche (z. B. das Logo), damit die
Rekonstruktion das Layout möglichst originalgetreu nachbauen kann.
"""

from __future__ import annotations

from dataclasses import dataclass, field

import cv2
import numpy as np

from .ocr import Word


@dataclass
class Line:
    words: list[Word]
    left: int
    top: int
    right: int
    bottom: int
    font_pt: float
    bold: bool
    align: str  # "left" | "right" | "center"
    raw_h: float = 0.0      # gemessene Zeichenhöhe (px) vor Normalisierung
    indent_level: int = 0   # Einrückungsstufe (0 = linker Rand)

    @property
    def text(self) -> str:
        return " ".join(w.text for w in self.words)


@dataclass
class HLine:
    x1: int
    y1: int
    x2: int
    y2: int


@dataclass
class Graphic:
    """Ein Bildbereich (z. B. Logo), der als Bild übernommen wird."""

    left: int
    top: int
    right: int
    bottom: int


@dataclass
class PageModel:
    width: int
    height: int
    dpi: int
    body_pt: float = 11.0          # dominante Textgröße der Seite
    indent_step_px: int = 1         # Pixel pro Einrückungsstufe
    lines: list[Line] = field(default_factory=list)
    hlines: list[HLine] = field(default_factory=list)
    graphics: list[Graphic] = field(default_factory=list)
    tables: list[Graphic] = field(default_factory=list)  # als Bild übernommen


def px_to_pt(px: float, dpi: int) -> float:
    return px * 72.0 / dpi


def _ink_density(gray: np.ndarray, word: Word) -> float:
    """Tinten-Dichte (Anteil dunkler Pixel) im Wort-Kasten."""
    y0, y1 = max(0, word.top), min(gray.shape[0], word.top + word.height)
    x0, x1 = max(0, word.left), min(gray.shape[1], word.left + word.width)
    crop = gray[y0:y1, x0:x1]
    if crop.size == 0:
        return 0.0
    return float(np.count_nonzero(crop < 128)) / crop.size


def group_lines(words: list[Word], gray: np.ndarray, dpi: int,
                page_width: int) -> list[Line]:
    """Gruppiert Wörter anhand der Tesseract-Zeilen-IDs zu Zeilen.

    Fettung wird *relativ* zur Seite bestimmt: Wörter, deren Tinten-Dichte
    deutlich über dem Median der Seite liegt, gelten als fett. Das ist robust
    gegen den globalen Kontrast der Reinigung.
    """
    densities = {id(w): _ink_density(gray, w) for w in words}
    vals = sorted(densities.values())
    median_density = vals[len(vals) // 2] if vals else 0.0
    bold_threshold = median_density * 1.22

    buckets: dict[tuple[int, int, int], list[Word]] = {}
    for w in words:
        buckets.setdefault(w.line_id, []).append(w)

    # große waagerechte Lücke innerhalb einer Zeile -> eigenständige Segmente
    # (trennt z. B. eine linksbündige Überschrift vom rechtsbündigen Datum)
    gap_split = page_width * 0.16

    lines: list[Line] = []
    for ws in buckets.values():
        ws.sort(key=lambda w: w.left)
        segments: list[list[Word]] = [[ws[0]]]
        for prev, cur in zip(ws, ws[1:]):
            if cur.left - (prev.left + prev.width) > gap_split:
                segments.append([cur])
            else:
                segments[-1].append(cur)

        for seg in segments:
            left = min(w.left for w in seg)
            top = min(w.top for w in seg)
            right = max(w.left + w.width for w in seg)
            bottom = max(w.top + w.height for w in seg)
            heights = sorted(w.height for w in seg)
            median_h = heights[len(heights) // 2]
            # vorläufige Größe; die echte wird in _normalize_lines gesetzt
            font_pt = round(px_to_pt(median_h, dpi) * 0.95, 1)

            bold_votes = sum(densities[id(w)] > bold_threshold for w in seg)
            bold = bold_votes >= max(1, (len(seg) + 1) // 2)

            # Ausrichtung grob aus Position ableiten
            align = "left"
            if left > page_width * 0.55:
                align = "right"

            lines.append(Line(
                words=seg, left=left, top=top, right=right, bottom=bottom,
                font_pt=font_pt, bold=bold, align=align, raw_h=float(median_h),
            ))
    lines.sort(key=lambda ln: (ln.top, ln.left))
    return lines


def _percentile(values: list[float], q: float) -> float:
    if not values:
        return 0.0
    s = sorted(values)
    idx = min(len(s) - 1, max(0, int(q * (len(s) - 1))))
    return s[idx]


def normalize_lines(lines: list[Line], dpi: int) -> tuple[float, int]:
    """Schnappt Schriftgrößen auf wenige Stufen und Einrückungen auf ein Raster.

    Scans haben eigentlich eine einheitliche Textgröße und einen festen linken
    Rand; die OCR-Messungen schwanken aber leicht. Wir bestimmen die *dominante*
    Textgröße/Randposition und richten alle Zeilen daran aus – das ergibt ein
    ruhiges, originalgetreues Schriftbild statt zappelnder Größen.

    Liefert (body_pt, indent_step_px) zurück.
    """
    if not lines:
        return 11.0, max(1, int(dpi * 0.18))

    # dominante Zeichenhöhe (nach Wortanzahl gewichtet) = Fließtext
    weighted = [ln.raw_h for ln in lines for _ in ln.words]
    body_h = _percentile(weighted, 0.5) or lines[0].raw_h
    body_pt = round(px_to_pt(body_h, dpi) * 0.95, 1)

    # linker Rand robust aus dem unteren Bereich der Startpositionen
    margin = _percentile([float(ln.left) for ln in lines], 0.1)
    indent_step = max(1, int(dpi * 0.18))  # ~0,45 cm pro Stufe

    for ln in lines:
        ratio = ln.raw_h / body_h if body_h else 1.0
        if ratio < 1.25:
            ln.font_pt = body_pt
        elif ratio < 1.7:
            ln.font_pt = round(body_pt * 1.3, 1)
        else:
            ln.font_pt = round(body_pt * 1.7, 1)
        ln.indent_level = max(0, min(8, round((ln.left - margin) / indent_step)))

    return body_pt, indent_step


def detect_hlines(gray: np.ndarray, dpi: int) -> list[HLine]:
    """Findet lange, dünne waagerechte Linien (Trenner)."""
    binr = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 15, 10)
    min_len = int(gray.shape[1] * 0.25)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (min_len, 1))
    horiz = cv2.morphologyEx(binr, cv2.MORPH_OPEN, kernel)
    contours, _ = cv2.findContours(horiz, cv2.RETR_EXTERNAL,
                                   cv2.CHAIN_APPROX_SIMPLE)
    result: list[HLine] = []
    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        if w >= min_len and h <= max(4, dpi // 60):
            result.append(HLine(x, y + h // 2, x + w, y + h // 2))
    result.sort(key=lambda l: l.y1)
    return result


def detect_tables(gray: np.ndarray, dpi: int) -> list[Graphic]:
    """Findet Tabellenbereiche über sich kreuzende Gitterlinien.

    Wir erkennen lange waagerechte und senkrechte Linien getrennt, überlagern
    sie und betrachten zusammenhängende Gitterflächen als Tabelle. Diese werden
    später als Bild übernommen (auf Wunsch nicht als Text rekonstruiert).
    """
    binr = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 15, 10)
    h_len = max(20, dpi // 6)
    v_len = max(15, dpi // 8)
    h_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (h_len, 1))
    v_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, v_len))
    horiz = cv2.morphologyEx(binr, cv2.MORPH_OPEN, h_kernel)
    vert = cv2.morphologyEx(binr, cv2.MORPH_OPEN, v_kernel)
    grid = cv2.bitwise_or(horiz, vert)
    # Lücken schließen, damit eine Tabelle zu einer Fläche verschmilzt
    grid = cv2.dilate(grid, cv2.getStructuringElement(
        cv2.MORPH_RECT, (dpi // 12, dpi // 12)))
    contours, _ = cv2.findContours(grid, cv2.RETR_EXTERNAL,
                                   cv2.CHAIN_APPROX_SIMPLE)
    result: list[Graphic] = []
    for c in contours:
        x, y, bw, bh = cv2.boundingRect(c)
        if bw < dpi * 1.5 or bh < dpi * 0.5:
            continue
        # echte Tabelle braucht waagerechte UND senkrechte Linien im Bereich
        roi_h = horiz[y:y + bh, x:x + bw]
        roi_v = vert[y:y + bh, x:x + bw]
        if cv2.countNonZero(roi_h) < bw or cv2.countNonZero(roi_v) < bh:
            continue
        pad = dpi // 30
        result.append(Graphic(max(0, x - pad), max(0, y - pad),
                              min(gray.shape[1], x + bw + pad),
                              min(gray.shape[0], y + bh + pad)))
    return result


def detect_graphics(gray: np.ndarray, words: list[Word], dpi: int,
                    top_fraction: float = 0.18,
                    left_fraction: float = 0.50) -> list[Graphic]:
    """Erkennt den Logo-/Briefkopf-Block im oberen, rechten Seitenbereich.

    Briefköpfe (Häkchen-Symbol + Schriftzug + Untertitel) sind als Mischung aus
    Grafik und stilisiertem Text schwer als Einzelteile zu rekonstruieren.
    Wir fassen daher den dunklen Inhalt oben rechts zu *einem* Bildblock
    zusammen und übernehmen ihn 1:1 als Bild.
    """
    h, w = gray.shape[:2]
    y_limit = int(h * top_fraction)
    x_start = int(w * left_fraction)

    region = gray[0:y_limit, x_start:w]
    binr = cv2.adaptiveThreshold(
        region, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 25, 15)
    # kleines Rauschen entfernen
    binr = cv2.morphologyEx(
        binr, cv2.MORPH_OPEN,
        cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2)))

    ys, xs = np.where(binr > 0)
    if xs.size < (dpi // 4):
        return []
    pad = dpi // 30
    left = x_start + max(0, int(xs.min()) - pad)
    right = x_start + min(region.shape[1], int(xs.max()) + pad)
    top = max(0, int(ys.min()) - pad)
    bottom = min(y_limit, int(ys.max()) + pad)
    if (right - left) < dpi // 3 or (bottom - top) < dpi // 6:
        return []
    return [Graphic(left, top, right, bottom)]


def build_page_model(words: list[Word], gray: np.ndarray, dpi: int,
                     first_page: bool = True) -> PageModel:
    h, w = gray.shape[:2]
    model = PageModel(width=w, height=h, dpi=dpi)
    # Den Briefkopf/Logo-Block nur auf der ersten Seite suchen – Folgeseiten
    # haben in der Regel keinen Briefkopf, und der Detektor würde dort
    # fälschlich Fließtext als Bild übernehmen.
    model.graphics = detect_graphics(gray, words, dpi) if first_page else []
    model.tables = detect_tables(gray, dpi)
    # Wörter, die im Logo- oder Tabellenbereich liegen, nicht als Text übernehmen
    regions = model.graphics + model.tables
    graphic_words = set()
    for i, word in enumerate(words):
        cx = word.left + word.width / 2
        cy = word.top + word.height / 2
        for g in regions:
            if g.left <= cx <= g.right and g.top <= cy <= g.bottom:
                graphic_words.add(i)
    text_words = [w for i, w in enumerate(words) if i not in graphic_words]
    lines = group_lines(text_words, gray, dpi, w)

    # Überdimensionale Fehllesungen herausfiltern (z. B. Logo-Glyphen, die als
    # riesiger "Text" erkannt wurden): deutlich größer als der Fließtext und
    # nur wenige Wörter.
    font_sizes = sorted(ln.font_pt for ln in lines)
    if font_sizes:
        median_font = font_sizes[len(font_sizes) // 2]
        lines = [
            ln for ln in lines
            if not (ln.font_pt > median_font * 2.2 and len(ln.words) <= 3)
        ]

    model.body_pt, model.indent_step_px = normalize_lines(lines, dpi)
    model.lines = lines
    model.hlines = detect_hlines(gray, dpi)
    return model
