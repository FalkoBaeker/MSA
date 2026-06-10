"""Kommandozeile für scanclean.

Beispiele:
    python -m scanclean eingang.pdf
    python -m scanclean eingang.pdf -o ausgang.docx --clean-pdf
    python -m scanclean *.pdf --outdir konvertiert/
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from .pipeline import convert


def _progress(page: int, total: int) -> None:
    print(f"  Seite {page}/{total} ...", flush=True)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="scanclean",
        description="Wandelt CamScanner-PDFs in saubere, editierbare DOCX um.")
    parser.add_argument("pdf", nargs="+", help="Eingabe-PDF(s)")
    parser.add_argument("-o", "--output",
                        help="Ziel-DOCX (nur bei genau einer Eingabedatei)")
    parser.add_argument("--outdir", help="Zielordner für mehrere Dateien")
    parser.add_argument("--clean-pdf", action="store_true",
                        help="zusätzlich ein gereinigtes 'Scan'-PDF schreiben")
    parser.add_argument("--dpi", type=int, default=300,
                        help="Render-Auflösung (Standard 300)")
    parser.add_argument("--lang", default="deu",
                        help="OCR-Sprache(n) für Tesseract (Standard deu)")
    args = parser.parse_args(argv)

    if args.output and len(args.pdf) > 1:
        parser.error("-o/--output ist nur bei einer einzelnen Eingabedatei erlaubt.")

    for pdf in args.pdf:
        src = Path(pdf)
        if not src.exists():
            print(f"Übersprungen (nicht gefunden): {src}", file=sys.stderr)
            continue
        if args.output:
            docx_path = Path(args.output)
        else:
            outdir = Path(args.outdir) if args.outdir else src.parent
            outdir.mkdir(parents=True, exist_ok=True)
            docx_path = outdir / (src.stem + ".docx")
        clean_pdf_path = (docx_path.with_suffix(".clean.pdf")
                          if args.clean_pdf else None)

        print(f"Verarbeite: {src.name}")
        convert(str(src), str(docx_path),
                str(clean_pdf_path) if clean_pdf_path else None,
                dpi=args.dpi, lang=args.lang, progress=_progress)
        print(f"  -> {docx_path}"
              + (f"  +  {clean_pdf_path}" if clean_pdf_path else ""))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
