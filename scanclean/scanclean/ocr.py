"""Deutsche Texterkennung mit Tesseract (offline).

Wir holen nicht nur den reinen Text, sondern auch Position, Größe und einfache
Stil-Hinweise pro Wort – das brauchen wir später, um das Layout in DOCX
nachzubauen.
"""

from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np
import pytesseract
from pytesseract import Output


@dataclass
class Word:
    text: str
    left: int
    top: int
    width: int
    height: int
    conf: float
    line_id: tuple[int, int, int]  # (block, par, line) zur Gruppierung


@dataclass
class OcrResult:
    words: list[Word] = field(default_factory=list)

    @property
    def text(self) -> str:
        """Rekonstruierter Lesetext (für eine schnelle Qualitätsprüfung)."""
        lines: dict[tuple[int, int, int], list[str]] = {}
        for w in self.words:
            lines.setdefault(w.line_id, []).append(w.text)
        return "\n".join(" ".join(parts) for parts in lines.values())


def run_ocr(gray: np.ndarray, lang: str = "deu", min_conf: float = 30.0) -> OcrResult:
    """Führt Tesseract aus und liefert strukturierte Wortdaten."""
    data = pytesseract.image_to_data(
        gray, lang=lang, output_type=Output.DICT,
        config="--oem 1 --psm 3",
    )
    result = OcrResult()
    n = len(data["text"])
    for i in range(n):
        text = data["text"][i].strip()
        conf = float(data["conf"][i])
        if not text or conf < min_conf:
            continue
        result.words.append(
            Word(
                text=text,
                left=int(data["left"][i]),
                top=int(data["top"][i]),
                width=int(data["width"][i]),
                height=int(data["height"][i]),
                conf=conf,
                line_id=(
                    int(data["block_num"][i]),
                    int(data["par_num"][i]),
                    int(data["line_num"][i]),
                ),
            )
        )
    return result
