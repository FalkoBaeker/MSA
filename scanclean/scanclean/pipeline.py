"""Gesamtablauf: CamScanner-PDF -> gereinigtes, editierbares DOCX.

Verbindet die Einzelschritte (Reinigung, OCR, Layout, Rekonstruktion) zu einem
durchgängigen Vorgang über alle Seiten.
"""

from __future__ import annotations

from dataclasses import dataclass

import cv2
import numpy as np

from .extract import render_pdf
from .clean import clean_page
from .ocr import run_ocr
from .layout import build_page_model, PageModel
from .reconstruct import build_document


@dataclass
class PageResult:
    model: PageModel
    cleaned: np.ndarray


def process_pdf(pdf_path: str, dpi: int = 300, lang: str = "deu",
                progress=None) -> list[PageResult]:
    """Verarbeitet alle Seiten und liefert Modelle + gereinigte Bilder."""
    pages = render_pdf(pdf_path, dpi=dpi)
    results: list[PageResult] = []
    for page in pages:
        if progress:
            progress(page.index + 1, len(pages))
        cleaned = clean_page(page.image, dpi=page.dpi)
        ocr = run_ocr(cleaned, lang=lang)
        model = build_page_model(ocr.words, cleaned, page.dpi,
                                 first_page=(page.index == 0))
        results.append(PageResult(model=model, cleaned=cleaned))
    return results


def to_docx(results: list[PageResult], out_path: str) -> None:
    build_document([(r.model, r.cleaned) for r in results], out_path)


def to_clean_pdf(results: list[PageResult], out_path: str) -> None:
    """Schreibt die gereinigten Seiten als 'echtes Scan'-PDF (nicht editierbar)."""
    from PIL import Image

    imgs = [Image.fromarray(r.cleaned).convert("RGB") for r in results]
    if not imgs:
        return
    imgs[0].save(out_path, save_all=True, append_images=imgs[1:],
                 resolution=float(results[0].model.dpi))


def convert(pdf_path: str, docx_path: str, clean_pdf_path: str | None = None,
            dpi: int = 300, lang: str = "deu", progress=None) -> None:
    results = process_pdf(pdf_path, dpi=dpi, lang=lang, progress=progress)
    to_docx(results, docx_path)
    if clean_pdf_path:
        to_clean_pdf(results, clean_pdf_path)
