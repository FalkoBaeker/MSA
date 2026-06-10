"""Bildreinigung: aus einem Foto einen sauberen Scan machen.

Die Schritte zielen darauf ab, den "fotografierten" Eindruck zu entfernen:
  1. Graustufen
  2. Hintergrund schätzen und herausrechnen  -> ungleichmäßiges Licht /
     Schatten verschwinden, der Hintergrund wird gleichmäßig weiß
  3. leichte Schärfung & Kontrast            -> Text wird knackig
  4. Schräglage korrigieren (Deskew)         -> Seite steht gerade

Das Ergebnis ist ein helles Graustufenbild mit weißem Hintergrund, das wie
ein echter Scan aussieht – nicht binarisiert, damit feine Details (Logo,
dünne Linien) erhalten bleiben.
"""

from __future__ import annotations

import cv2
import numpy as np


def to_gray(image: np.ndarray) -> np.ndarray:
    if image.ndim == 3:
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return image


def remove_background(gray: np.ndarray, dpi: int = 300) -> np.ndarray:
    """Schätzt den (hellen) Hintergrund und teilt ihn heraus.

    Per morphologischem Closing mit großem Kernel bekommen wir ein Bild, das
    nur noch die Beleuchtung/den Papierhintergrund enthält (Text verschwindet,
    weil er dünn und dunkel ist). Teilen wir das Original dadurch, bleibt der
    Hintergrund gleichmäßig hell und Schatten verschwinden.
    """
    # Kernelgröße an Auflösung koppeln, damit Buchstaben "geschluckt" werden
    k = max(15, int(dpi / 10) | 1)  # ungerade
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
    background = cv2.morphologyEx(gray, cv2.MORPH_CLOSE, kernel)
    # Division: Original / Hintergrund -> normalisiert auf 0..255
    norm = cv2.divide(gray, background, scale=255)
    return norm


def boost_contrast(gray: np.ndarray) -> np.ndarray:
    """Weißt den Hintergrund komplett auf und verstärkt den Textkontrast.

    Eine sanfte Schwelle drückt alles oberhalb eines hohen Werts auf reines
    Weiß; darunter wird der Kontrast linear gestreckt. Das entfernt
    Papier-Rauschen, ohne den Text zu zerstören.
    """
    white_point = 230
    black_point = 80
    out = gray.astype(np.float32)
    out = (out - black_point) * (255.0 / (white_point - black_point))
    out = np.clip(out, 0, 255).astype(np.uint8)
    return out


def sharpen(gray: np.ndarray) -> np.ndarray:
    blur = cv2.GaussianBlur(gray, (0, 0), sigmaX=1.0)
    return cv2.addWeighted(gray, 1.5, blur, -0.5, 0)


def estimate_skew(gray: np.ndarray) -> float:
    """Schätzt den Schräglagewinkel in Grad über die Textmasse."""
    inv = cv2.bitwise_not(gray)
    _, thresh = cv2.threshold(inv, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    coords = np.column_stack(np.where(thresh > 0))
    if coords.shape[0] < 50:
        return 0.0
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = 90 + angle
    # Nur kleine Korrekturen anwenden (CamScanner entzerrt meist schon grob)
    if abs(angle) > 15:
        return 0.0
    return angle


def deskew(gray: np.ndarray, angle: float) -> np.ndarray:
    if abs(angle) < 0.1:
        return gray
    h, w = gray.shape[:2]
    center = (w // 2, h // 2)
    matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
    return cv2.warpAffine(
        gray, matrix, (w, h),
        flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE,
    )


def remove_watermark(gray: np.ndarray) -> np.ndarray:
    """Übermalt das 'Scanned with CamScanner'-Wasserzeichen unten rechts.

    Es sitzt zuverlässig in der unteren rechten Ecke; wir weißen einen
    konservativen Eckbereich, um echten Inhalt nicht zu treffen.
    """
    h, w = gray.shape[:2]
    y0 = int(h * 0.94)
    x0 = int(w * 0.78)
    out = gray.copy()
    out[y0:h, x0:w] = 255
    return out


def clean_page(image: np.ndarray, dpi: int = 300) -> np.ndarray:
    """Komplette Reinigungs-Pipeline. Gibt sauberes Graustufenbild zurück."""
    gray = to_gray(image)
    norm = remove_background(gray, dpi=dpi)
    boosted = boost_contrast(norm)
    sharp = sharpen(boosted)
    angle = estimate_skew(sharp)
    result = deskew(sharp, angle)
    result = remove_watermark(result)
    return result
