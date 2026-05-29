# 🎓 MSA Mathe Trainer – Brandenburg

Eine kleine interaktive Übungs-App für die **MSA Mathematik-Prüfung in Brandenburg** (Jahrgangsstufe 10, mittlerer Schulabschluss).

Gemacht für meine Tochter, die in einer Woche ihre Prüfung schreibt – aber für alle nutzbar. 💪

## Was kann die App?

- **Übungsaufgaben nach Themen** sortiert (Bruch- & Prozentrechnung, Terme & Gleichungen, Funktionen, Geometrie & Pythagoras, Trigonometrie, Wahrscheinlichkeit & Statistik)
- **Sofortige Lösungskontrolle** – richtig/falsch direkt sichtbar
- **Tipps auf Knopfdruck**, wenn man nicht weiterkommt
- **Schritt-für-Schritt-Erklärungen** ("für Dummies") nach jeder Aufgabe
- **Formeln & Merksätze** zu jedem Thema
- **Prüfungsmodus**: 20 zufällig gemischte Aufgaben aus allen Themen
- **7-Tage-Lernplan** für die letzte Woche vor der Prüfung
- **Fortschritt wird gespeichert** (im Browser, ganz lokal)
- Läuft **komplett offline**, auch auf dem Handy 📱

## Wie starte ich sie?

Ganz einfach – **keine Installation nötig**:

1. Repo herunterladen (oder ZIP entpacken).
2. Die Datei **`index.html`** doppelklicken → öffnet sich im Browser.

Fertig! Funktioniert auf Computer, Tablet und Handy.

> 💡 Tipp: Auf dem Handy kann man die Seite über "Zum Startbildschirm hinzufügen"
> ablegen, dann fühlt es sich an wie eine echte App.

## Dateien

| Datei        | Inhalt                                   |
|--------------|------------------------------------------|
| `index.html` | Grundgerüst der Seite                    |
| `style.css`  | Aussehen / Design                        |
| `app.js`     | Logik (Quiz, Antwortprüfung, Fortschritt)|
| `data.js`    | Alle Aufgaben, Lösungen & Erklärungen    |

## Neue Aufgaben hinzufügen

Aufgaben stehen in `data.js`. Eine Aufgabe sieht so aus:

```js
{
  id: 999,                 // eindeutige Nummer
  type: "input",           // "input" (Eingabe) oder "mc" (Multiple Choice)
  q: "Berechne 7 · 8.",    // die Frage (HTML erlaubt)
  answer: 56,              // richtige Antwort
  // options: [...],       // nur bei "mc"
  tip: "Kleines 1x1.",     // Tipp
  steps: ["7 · 8 = 56."],  // Lösungsweg Schritt für Schritt
}
```

Einfach in das passende Thema einfügen – die App erkennt es automatisch.

Viel Erfolg bei der Prüfung! 🍀
