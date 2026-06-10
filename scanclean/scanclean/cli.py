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
                        help="zusätzlich ein reines Bild-PDF ohne Textebene")
    parser.add_argument("--dpi", type=int, default=300,
                        help="Render-Auflösung (Standard 300)")
    parser.add_argument("--lang", default="deu",
                        help="OCR-Sprache(n) für Tesseract (Standard deu)")
    parser.add_argument("--flow", action="store_true",
                        help="Fließtext statt originalgetreuem Overlay "
                             "(einfacher, aber nicht 1:1)")
    parser.add_argument("--docx-only", action="store_true",
                        help="nur das editierbare DOCX erzeugen")
    parser.add_argument("--pdf-only", action="store_true",
                        help="nur die durchsuchbare PDF erzeugen")
    args = parser.parse_args(argv)
    style = "flow" if args.flow else "overlay"
    if args.docx_only and args.pdf_only:
        parser.error("--docx-only und --pdf-only schließen sich aus.")
    make_docx = not args.pdf_only
    make_pdf = not args.docx_only

    if args.output and len(args.pdf) > 1:
        parser.error("-o/--output ist nur bei einer einzelnen Eingabedatei erlaubt.")

    for pdf in args.pdf:
        src = Path(pdf)
        if not src.exists():
            print(f"Übersprungen (nicht gefunden): {src}", file=sys.stderr)
            continue
        if args.output:
            stem_path = Path(args.output)
            base = stem_path.with_suffix("")
        else:
            outdir = Path(args.outdir) if args.outdir else src.parent
            outdir.mkdir(parents=True, exist_ok=True)
            base = outdir / src.stem

        docx_path = base.with_suffix(".docx") if make_docx else None
        searchable_pdf_path = base.with_suffix(".pdf") if make_pdf else None
        clean_pdf_path = base.with_suffix(".clean.pdf") if args.clean_pdf else None

        print(f"Verarbeite: {src.name}")
        convert(str(src),
                str(docx_path) if docx_path else None,
                str(searchable_pdf_path) if searchable_pdf_path else None,
                str(clean_pdf_path) if clean_pdf_path else None,
                dpi=args.dpi, lang=args.lang, style=style, progress=_progress)
        outs = [p for p in (docx_path, searchable_pdf_path, clean_pdf_path) if p]
        print("  -> " + "  +  ".join(str(p) for p in outs))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
