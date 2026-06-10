"""Stufe-2-Demo: PDF -> reinigen -> OCR -> Layout -> editierbares DOCX (je Seite)."""

import sys
from pathlib import Path

import cv2

from scanclean.extract import render_pdf
from scanclean.clean import clean_page
from scanclean.ocr import run_ocr
from scanclean.layout import build_page_model
from scanclean.reconstruct import build_docx


def main(pdf_path: str, out_dir: str = "out") -> None:
    out = Path(out_dir)
    out.mkdir(exist_ok=True)
    pages = render_pdf(pdf_path, dpi=300)
    for page in pages:
        cleaned = clean_page(page.image, dpi=page.dpi)
        cv2.imwrite(str(out / f"seite{page.index + 1}_sauber.png"), cleaned)
        ocr = run_ocr(cleaned, lang="deu")
        model = build_page_model(ocr.words, cleaned, page.dpi,
                                 first_page=(page.index == 0))
        docx_path = out / f"seite{page.index + 1}.docx"
        build_docx(model, cleaned, str(docx_path))
        print(f"Seite {page.index + 1}: {len(model.lines)} Zeilen, "
              f"{len(model.hlines)} Linien, {len(model.graphics)} Grafik(en) "
              f"-> {docx_path.name}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "out")
