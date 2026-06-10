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
from .ocr import run_ocr, OcrResult
from .layout import build_page_model, PageModel
from .reconstruct import build_document
from .overlay import build_overlay_document


@dataclass
class PageResult:
    model: PageModel
    cleaned: np.ndarray
    ocr: OcrResult


def process_pdf(pdf_path: str, dpi: int = 300, lang: str = "deu",
                progress=None) -> list[PageResult]:
    """Verarbeitet alle Seiten und liefert Modelle + gereinigte Bilder + OCR."""
    pages = render_pdf(pdf_path, dpi=dpi)
    results: list[PageResult] = []
    for page in pages:
        if progress:
            progress(page.index + 1, len(pages))
        cleaned = clean_page(page.image, dpi=page.dpi)
        ocr = run_ocr(cleaned, lang=lang)
        model = build_page_model(ocr.words, cleaned, page.dpi,
                                 first_page=(page.index == 0))
        results.append(PageResult(model=model, cleaned=cleaned, ocr=ocr))
    return results


def to_docx(results: list[PageResult], out_path: str,
            style: str = "overlay") -> None:
    """Schreibt das DOCX.

    style="overlay": Hintergrundbild + editierbare Textebene (originalgetreu).
    style="flow":    klassischer Fließtext (einfacher, aber nicht 1:1).
    """
    pages = [(r.model, r.cleaned) for r in results]
    if style == "flow":
        build_document(pages, out_path)
    else:
        build_overlay_document(pages, out_path)


def to_clean_pdf(results: list[PageResult], out_path: str) -> None:
    """Schreibt die gereinigten Seiten als 'echtes Scan'-PDF (nicht editierbar)."""
    from PIL import Image

    imgs = [Image.fromarray(r.cleaned).convert("RGB") for r in results]
    if not imgs:
        return
    imgs[0].save(out_path, save_all=True, append_images=imgs[1:],
                 resolution=float(results[0].model.dpi))


def to_searchable_pdf(results: list[PageResult], out_path: str) -> None:
    """Durchsuchbare PDF: gereinigtes Bild + unsichtbare OCR-Textebene.

    Sieht identisch zum (entfotografierten) Original aus, der Text lässt sich
    aber markieren, kopieren und durchsuchen.
    """
    import fitz  # PyMuPDF

    doc = fitz.open()
    for r in results:
        dpi = r.model.dpi
        scale = 72.0 / dpi  # Pixel -> PDF-Punkte
        w_pt = r.cleaned.shape[1] * scale
        h_pt = r.cleaned.shape[0] * scale
        page = doc.new_page(width=w_pt, height=h_pt)

        ok, buf = cv2.imencode(".png", r.cleaned)
        if ok:
            page.insert_image(fitz.Rect(0, 0, w_pt, h_pt), stream=buf.tobytes())

        # unsichtbarer Text (render_mode=3) an den Wortpositionen
        for word in r.ocr.words:
            fontsize = max(4.0, word.height * scale * 0.92)
            baseline = fitz.Point(word.left * scale,
                                  (word.top + word.height) * scale)
            try:
                page.insert_text(baseline, word.text, fontsize=fontsize,
                                 render_mode=3, fontname="helv")
            except Exception:
                # exotische Zeichen überspringen, statt abzubrechen
                continue
    doc.save(out_path, deflate=True)
    doc.close()


def convert(pdf_path: str, docx_path: str | None = None,
            searchable_pdf_path: str | None = None,
            clean_pdf_path: str | None = None,
            dpi: int = 300, lang: str = "deu", style: str = "overlay",
            progress=None) -> None:
    """Verarbeitet ein PDF und schreibt die gewünschten Ausgaben.

    docx_path:           editierbares DOCX (Overlay/Flow)
    searchable_pdf_path: identisch aussehende, durchsuchbare PDF
    clean_pdf_path:      reines gereinigtes Bild-PDF (ohne Textebene)
    """
    results = process_pdf(pdf_path, dpi=dpi, lang=lang, progress=progress)
    if docx_path:
        to_docx(results, docx_path, style=style)
    if searchable_pdf_path:
        to_searchable_pdf(results, searchable_pdf_path)
    if clean_pdf_path:
        to_clean_pdf(results, clean_pdf_path)
