"""Stufe-1-Demo: PDF reinigen + OCR, Ergebnisse rausschreiben."""

import sys
from pathlib import Path

import cv2

from scanclean.extract import render_pdf
from scanclean.clean import clean_page
from scanclean.ocr import run_ocr


def main(pdf_path: str, out_dir: str = "out") -> None:
    out = Path(out_dir)
    out.mkdir(exist_ok=True)
    pages = render_pdf(pdf_path, dpi=300)
    print(f"{len(pages)} Seite(n) gerendert.")
    for page in pages:
        cleaned = clean_page(page.image, dpi=page.dpi)
        img_path = out / f"seite{page.index + 1}_sauber.png"
        cv2.imwrite(str(img_path), cleaned)

        ocr = run_ocr(cleaned, lang="deu")
        txt_path = out / f"seite{page.index + 1}_text.txt"
        txt_path.write_text(ocr.text, encoding="utf-8")
        print(f"Seite {page.index + 1}: {len(ocr.words)} Wörter erkannt "
              f"-> {img_path.name}, {txt_path.name}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "out")
