"""Vorschau-Renderer: zeichnet das rekonstruierte Seitenmodell als Bild.

Dient zur Qualitätskontrolle der Rekonstruktion ohne Office-Programm.
Wir nutzen Liberation Sans (metrik-kompatibel zu Arial), damit die Vorschau
dem späteren DOCX nahekommt.
"""

from __future__ import annotations

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

from .layout import PageModel

FONT_REGULAR = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"


def _font(bold: bool, px: int) -> ImageFont.FreeTypeFont:
    path = FONT_BOLD if bold else FONT_REGULAR
    return ImageFont.truetype(path, max(6, px))


def render_preview(model: PageModel, cleaned: np.ndarray, out_path: str) -> None:
    canvas = Image.new("RGB", (model.width, model.height), "white")
    draw = ImageDraw.Draw(canvas)

    # Logo(s) als Bild einsetzen
    for g in model.graphics:
        crop = cleaned[g.top:g.bottom, g.left:g.right]
        if crop.size:
            rgb = cv2.cvtColor(crop, cv2.COLOR_GRAY2RGB)
            canvas.paste(Image.fromarray(rgb), (g.left, g.top))

    # Trennlinien
    for h in model.hlines:
        draw.line([(h.x1, h.y1), (h.x2, h.y2)], fill="black", width=2)

    # Textzeilen an Originalposition
    for line in model.lines:
        px = int(round(line.font_pt * model.dpi / 72.0))
        font = _font(line.bold, px)
        draw.text((line.left, line.top), line.text, fill="black", font=font)

    canvas.save(out_path)
