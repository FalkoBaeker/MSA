"""PDF-Seiten als Bilder einlesen.

CamScanner-PDFs enthalten pro Seite ein eingebettetes Foto. Wir rendern jede
Seite mit hoher Auflösung (Standard 300 DPI), damit die anschließende
Texterkennung genug Details hat.
"""

from __future__ import annotations

from dataclasses import dataclass

import fitz  # PyMuPDF
import numpy as np


@dataclass
class Page:
    """Eine gerenderte Seite als BGR-Bild (OpenCV-Konvention)."""

    index: int          # 0-basierte Seitennummer
    image: np.ndarray   # H x W x 3, uint8, BGR
    dpi: int


def render_pdf(path: str, dpi: int = 300) -> list[Page]:
    """Rendert alle Seiten eines PDFs zu Bildern."""
    pages: list[Page] = []
    zoom = dpi / 72.0  # PDF-Punkte sind 72 DPI
    matrix = fitz.Matrix(zoom, zoom)
    with fitz.open(path) as doc:
        for i, page in enumerate(doc):
            pix = page.get_pixmap(matrix=matrix, alpha=False)
            arr = np.frombuffer(pix.samples, dtype=np.uint8)
            arr = arr.reshape(pix.height, pix.width, pix.n)
            # PyMuPDF liefert RGB -> OpenCV erwartet BGR
            bgr = arr[:, :, ::-1].copy()
            pages.append(Page(index=i, image=bgr, dpi=dpi))
    return pages
