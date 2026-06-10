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
    lines: list[Line] = field(default_factory=list)
    hlines: list[HLine] = field(default_factory=list)
    graphics: list[Graphic] = field(default_factory=list)


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
    bold_threshold = median_density * 1.35

    buckets: dict[tuple[int, int, int], list[Word]] = {}
    for w in words:
        buckets.setdefault(w.line_id, []).append(w)

    lines: list[Line] = []
    for ws in buckets.values():
        ws.sort(key=lambda w: w.left)
        left = min(w.left for w in ws)
        top = min(w.top for w in ws)
        right = max(w.left + w.width for w in ws)
        bottom = max(w.top + w.height for w in ws)
        heights = sorted(w.height for w in ws)
        median_h = heights[len(heights) // 2]
        font_pt = round(px_to_pt(median_h, dpi) * 0.95, 1)

        bold_votes = sum(densities[id(w)] > bold_threshold for w in ws)
        bold = bold_votes >= max(1, (len(ws) + 1) // 2)

        # Ausrichtung grob aus Position ableiten
        center = (left + right) / 2
        align = "left"
        if left > page_width * 0.55:
            align = "right"
        elif abs(center - page_width / 2) < page_width * 0.06 and left > page_width * 0.25:
            align = "center"

        lines.append(Line(
            words=ws, left=left, top=top, right=right, bottom=bottom,
            font_pt=font_pt, bold=bold, align=align,
        ))
    lines.sort(key=lambda ln: (ln.top, ln.left))
    return lines


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
    # Wörter, die im Logo-Bereich liegen, nicht als Text übernehmen
    graphic_words = set()
    for i, word in enumerate(words):
        cx = word.left + word.width / 2
        cy = word.top + word.height / 2
        for g in model.graphics:
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

    model.lines = lines
    model.hlines = detect_hlines(gray, dpi)
    return model
