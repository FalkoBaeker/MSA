# scanclean

Wandelt mit **CamScanner** erstellte PDFs (im Kern abfotografierte Seiten) in
saubere, **bearbeitbare** Dokumente um – komplett **offline**, ohne KI/Cloud.

Es passieren zwei Dinge:

1. **Entfotografieren** – ungleichmäßiges Licht/Schatten werden entfernt, der
   Hintergrund wird gleichmäßig weiß, der Text scharf, Schräglage korrigiert.
   Das Ergebnis sieht aus wie ein echter Scan statt wie ein Foto.
2. **Rekonstruktion ins DOCX** – deutsche Texterkennung (Tesseract) macht den
   Inhalt zu **echtem, editierbarem Text**.

### Zwei Modi

- **`overlay` (Standard, maximale Treue):** Hintergrund ist eine weiße Seite mit
  nur den bewahrten Grafiken (Logo/Briefkopf, Tabellen als Bild, Trennlinien) –
  der Originaltext (und das CamScanner-Wasserzeichen) ist entfernt. Darüber liegt
  der erkannte Text als **absolut positionierte, editierbare Textfelder** an den
  Originalkoordinaten. Ergebnis: sieht praktisch aus wie das Original, ist aber
  bearbeitbar.
- **`flow` (`--flow`):** klassischer Fließtext von oben nach unten. Einfacher zu
  bearbeiten, aber das Layout sitzt nicht 1:1.

## Installation

System-Abhängigkeiten (einmalig):

```bash
sudo apt-get install -y tesseract-ocr tesseract-ocr-deu poppler-utils
```

Python-Pakete:

```bash
pip install -r requirements.txt
```

## Benutzung

```bash
# Eine Datei -> befund.docx daneben
python -m scanclean befund.pdf

# Ziel selbst wählen + zusätzlich gereinigtes "Scan"-PDF
python -m scanclean befund.pdf -o ergebnis.docx --clean-pdf

# Mehrere Dateien in einen Zielordner
python -m scanclean *.pdf --outdir konvertiert/
```

Optionen:

| Option | Bedeutung |
|---|---|
| `-o, --output` | Ziel-DOCX (nur bei einer Eingabedatei) |
| `--outdir` | Zielordner bei mehreren Dateien |
| `--clean-pdf` | zusätzlich ein gereinigtes, nicht editierbares Scan-PDF |
| `--dpi` | Render-Auflösung (Standard 300) |
| `--lang` | OCR-Sprache(n), z. B. `deu`, `deu+eng` |

## Wie gut wird es?

- **Optik (entfotografiert):** sehr zuverlässig.
- **Text (deutsche OCR):** typisch ~95 % korrekt; Zahlen-/Sonderzeichen bitte
  gegenlesen.
- **Layout:** wird sehr nah nachgebaut, aber nicht pixelgenau – echter Text und
  echte Größen werden neu gesetzt. Dafür ist alles bearbeitbar.
- **Schriftart:** Annäherung über eine serifenlose Standardschrift (Arial);
  der exakte Originalfont wird nicht garantiert.

## Aufbau

```
scanclean/
  extract.py      PDF-Seiten zu Bildern rendern (PyMuPDF)
  clean.py        Reinigung: Schatten weg, weiß, scharf, gerade (OpenCV)
  ocr.py          deutsche Texterkennung mit Position/Stil (Tesseract)
  layout.py       Zeilen/Größen/Fettung, Logo- & Tabellen-Erkennung, Normalisierung
  overlay.py      Standard-Modus: Hintergrundbild + absolut positionierte Textfelder
  reconstruct.py  Flow-Modus: klassisches Fließtext-DOCX
  pipeline.py     Gesamtablauf PDF -> DOCX (+ optional Scan-PDF)
  cli.py          Kommandozeile
  preview.py      Vorschau-Renderer zur Qualitätskontrolle
```
