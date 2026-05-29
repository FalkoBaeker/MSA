# 🎓 MSA Mathe Trainer – Brandenburg

Eine kleine interaktive Übungs-App für die **MSA Mathematik-Prüfung in Brandenburg** (Jahrgangsstufe 10, mittlerer Schulabschluss).

Gemacht für meine Tochter, die in einer Woche ihre Prüfung schreibt – aber für alle nutzbar. 💪

## Was kann die App?

- **Über 130 Übungsaufgaben** nach Themen sortiert: Bruch-/Prozent-/Zinsrechnung, Terme & Gleichungen, Funktionen, Geometrie & Pythagoras, Trigonometrie, Wahrscheinlichkeit & Statistik, Sach- & Textaufgaben
- **Sofortige Lösungskontrolle** – richtig/falsch direkt sichtbar
- **Drei Hilfe-Stufen pro Aufgabe:**
  1. 💡 **Tipp** (kleiner Anstoß)
  2. **Schritt-für-Schritt-Lösung** (was rechne ich in welcher Reihenfolge)
  3. 🤔 **Noch genauere Erklärung "für Dummies"**, wenn man's immer noch nicht versteht
- **📝 Probeklausuren**, die sich **jedes Mal neu** aus der Aufgaben-Datenbank zusammensetzen – mit echtem Aufbau (**Teil A ohne Hilfsmittel** + **Teil B mit Taschenrechner**), Punktebewertung und ungefährer Note
- **Formeln & Merksätze** zu jedem Thema
- **🎯 Schnelltest**: 20 zufällig gemischte Aufgaben
- **🗓️ 7-Tage-Lernplan** für die letzte Woche vor der Prüfung
- **Fortschritt wird gespeichert** (im Browser, ganz lokal)
- Läuft **komplett offline**, auch auf dem Handy 📱

> 📚 Tipp: Die **echten Original-Prüfungen der letzten Jahre** für Brandenburg gibt es
> kostenlos auf dem [Bildungsserver Berlin-Brandenburg](https://bildungsserver.berlin-brandenburg.de/unterricht/pruefungen/pruefungen-10/pruefungsaufgaben-mathematik)
> als PDF – ideal als Ergänzung zum Üben mit dieser App.

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
  part: "A",               // "A" (ohne Hilfsmittel) oder "B" (mit Taschenrechner)
  points: 1,               // Punktwert für die Probeklausur
  tip: "Kleines 1x1.",     // Stufe 1: Tipp
  steps: ["7 · 8 = 56."],  // Stufe 2: Lösungsweg Schritt für Schritt
  deep: "Mal-Rechnen ...", // Stufe 3: ausführlichere Erklärung
}
```

Einfach in das passende Thema einfügen – die App erkennt es automatisch.

Viel Erfolg bei der Prüfung! 🍀
