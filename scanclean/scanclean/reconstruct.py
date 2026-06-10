"""Rekonstruktion: aus dem Seitenmodell ein editierbares DOCX bauen.

Ziel ist ein frisches, weißes Dokument mit echtem Text an möglichst
originalgetreuer Position, echten Trennlinien und dem Logo als Bild.
Der Text bleibt voll bearbeitbar (Tippfehler, Unterstreichungen ...).
"""

from __future__ import annotations

import io

import cv2
import numpy as np
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.shared import Pt, Inches, RGBColor

from .layout import PageModel, Line, px_to_pt

# Standardfont: serifenlos, nah an der valera-Schrift (Arial/Helvetica-Klasse)
DEFAULT_FONT = "Arial"


def _set_paragraph_border_bottom(paragraph) -> None:
    """Zeichnet eine echte Linie unter einen (leeren) Absatz."""
    p = paragraph._p
    pPr = p.get_or_add_pPr()
    borders = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), "000000")
    borders.append(bottom)
    pPr.append(borders)


def _add_line_paragraph(doc, line: Line, dpi: int, margin_left_px: int,
                        space_before_pt: float) -> None:
    para = doc.add_paragraph()
    pf = para.paragraph_format
    pf.space_after = Pt(0)
    pf.space_before = Pt(max(0.0, space_before_pt))
    pf.line_spacing = 1.0

    if line.align == "right":
        para.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    elif line.align == "center":
        para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    else:
        para.alignment = WD_ALIGN_PARAGRAPH.LEFT
        indent_px = line.left - margin_left_px
        if indent_px > 8:
            pf.left_indent = Pt(px_to_pt(indent_px, dpi))

    run = para.add_run(line.text)
    run.font.name = DEFAULT_FONT
    run.font.size = Pt(line.font_pt)
    run.font.bold = line.bold
    run.font.color.rgb = RGBColor(0, 0, 0)


def _add_logo(doc, cleaned: np.ndarray, graphic, dpi: int) -> None:
    crop = cleaned[graphic.top:graphic.bottom, graphic.left:graphic.right]
    if crop.size == 0:
        return
    ok, buf = cv2.imencode(".png", crop)
    if not ok:
        return
    stream = io.BytesIO(buf.tobytes())
    width_in = (graphic.right - graphic.left) / dpi
    para = doc.add_paragraph()
    para.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    para.paragraph_format.space_after = Pt(2)
    run = para.add_run()
    run.add_picture(stream, width=Inches(width_in))


def build_docx(model: PageModel, cleaned: np.ndarray, out_path: str) -> None:
    doc = Document()
    section = doc.sections[0]
    section.page_width = Inches(8.27)   # A4
    section.page_height = Inches(11.69)

    # Linker Rand = kleinster Textanfang; daran richten wir Einrückungen aus
    margin_left_px = min((ln.left for ln in model.lines), default=0)
    margin_top_px = min((ln.top for ln in model.lines), default=0)
    section.left_margin = Inches(max(0.4, margin_left_px / model.dpi))
    section.right_margin = Inches(0.4)
    section.top_margin = Inches(max(0.4, margin_top_px / model.dpi))
    section.bottom_margin = Inches(0.4)

    # Logo(s) zuerst (liegen oben)
    for g in model.graphics:
        _add_logo(doc, cleaned, g, model.dpi)

    hlines = sorted(model.hlines, key=lambda h: h.y1)
    hl_idx = 0
    prev_bottom = margin_top_px

    for line in model.lines:
        # Trennlinien einfügen, die vor dieser Zeile liegen
        while hl_idx < len(hlines) and hlines[hl_idx].y1 < line.top:
            sep = doc.add_paragraph()
            sep.paragraph_format.space_before = Pt(2)
            sep.paragraph_format.space_after = Pt(2)
            _set_paragraph_border_bottom(sep)
            hl_idx += 1

        gap_px = line.top - prev_bottom
        space_before = px_to_pt(gap_px, model.dpi) - line.font_pt * 0.2
        _add_line_paragraph(doc, line, model.dpi, margin_left_px, space_before)
        prev_bottom = line.bottom

    doc.save(out_path)
