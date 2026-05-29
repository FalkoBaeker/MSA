/* =====================================================================
   MSA Mathe Trainer – Brandenburg
   Aufgaben-Datenbank
   ---------------------------------------------------------------------
   Aufbau einer Aufgabe:
   {
     id:        eindeutige Nummer
     type:      "mc" (Multiple Choice) | "input" (Eingabe)
     q:         Frage (HTML erlaubt: <sup>, <sub>, &middot; usw.)
     options:   [..]            nur bei "mc"
     answer:    richtige Antwort (Text/Zahl)
     accept:    [..]            optionale weitere gültige Schreibweisen
     unit:      z.B. "cm²"      optionale Einheit (nur Anzeige)
     part:      "A" = hilfsmittelfrei | "B" = mit Taschenrechner
     points:    Punktwert für die Probeklausur (1–3)
     tip:       kurzer Tipp (Stufe 1), VOR der Lösung
     steps:     [..]            Lösungsweg Schritt für Schritt (Stufe 2)
     deep:      noch ausführlichere Erklärung "für Dummies" (Stufe 3)
   }
   ===================================================================== */

const TOPICS = [
  /* ================================================================= */
  {
    id: "bruch",
    name: "Bruch-, Prozent- & Zinsrechnung",
    emoji: "🍕",
    intro:
      "Hier geht's um Brüche, Prozente, Zinsen und den Dreisatz. Merke dir: " +
      "<b>„von“ heißt mal (&middot;)</b> und <b>Prozent heißt „von 100“</b>. " +
      "15 % sind also 15/100 = 0,15.",
    formulas: [
      "Prozentwert = Grundwert &middot; Prozentsatz &nbsp; (z.B. 0,15 für 15 %)",
      "Grundwert = Prozentwert &divide; Prozentsatz",
      "Prozentsatz = Prozentwert &divide; Grundwert",
      "Brüche addieren: erst gleichnamig machen (gleicher Nenner)",
      "Brüche multiplizieren: Zähler &middot; Zähler, Nenner &middot; Nenner",
      "Zinsen = Kapital &middot; Zinssatz &middot; (Jahre)",
      "Bruch &rarr; Prozent: Bruch &middot; 100 % &nbsp; (z.B. 3/4 = 75 %)",
    ],
    questions: [
      {
        id: 101, type: "mc", part: "A", points: 1,
        q: "Berechne: <b>3/4 + 1/8</b>",
        options: ["7/8", "4/12", "4/8", "1/2"],
        answer: "7/8",
        tip: "Beide Brüche brauchen denselben Nenner. 8 passt gut.",
        steps: [
          "Gemeinsamer Nenner ist 8.",
          "3/4 erweitern (oben und unten &middot; 2): 3/4 = 6/8.",
          "Jetzt addieren: 6/8 + 1/8 = 7/8.",
        ],
        deep:
          "Stell dir eine Pizza vor, die in 8 Stücke geteilt ist. 3/4 der Pizza " +
          "sind 6 von 8 Stücken (weil 3/4 = 6/8). Plus noch 1 Stück (1/8) macht " +
          "zusammen 7 von 8 Stücken = 7/8. Brüche kann man nur addieren, wenn der " +
          "Nenner (die untere Zahl, also die Stückgröße) gleich ist – deshalb machen " +
          "wir 3/4 erst zu 6/8.",
      },
      {
        id: 102, type: "mc", part: "A", points: 1,
        q: "Berechne: <b>2/3 &middot; 3/5</b>",
        options: ["2/5", "6/8", "5/8", "1/3"],
        answer: "2/5",
        tip: "Beim Malnehmen einfach Zähler mal Zähler und Nenner mal Nenner.",
        steps: [
          "Zähler: 2 &middot; 3 = 6.",
          "Nenner: 3 &middot; 5 = 15.",
          "Ergebnis 6/15, kürzen mit 3: 6/15 = 2/5.",
        ],
        deep:
          "Brüche multiplizieren ist einfacher als addieren: oben mal oben, unten mal " +
          "unten – kein gemeinsamer Nenner nötig. 6/15 lässt sich noch kürzen: 6 und 15 " +
          "haben beide den Teiler 3 (6 = 2&middot;3, 15 = 5&middot;3). Teilst du beide durch 3, " +
          "bleibt 2/5. Kürzen heißt: gleiche Zahl oben UND unten wegteilen – der Wert " +
          "bleibt gleich.",
      },
      {
        id: 103, type: "input", part: "A", points: 1,
        q: "Wie viel sind <b>15 % von 240</b>?",
        answer: 36,
        tip: "15 % = 0,15. „von“ heißt mal.",
        steps: [
          "15 % als Kommazahl: 15 &divide; 100 = 0,15.",
          "240 &middot; 0,15 = 36.",
        ],
        deep:
          "Prozent bedeutet „von hundert“. 15 % heißt also 15 von 100 Teilen, als " +
          "Kommazahl 0,15. Wenn du 15 % „von 240“ willst, rechnest du 240 &middot; 0,15. " +
          "Ohne Taschenrechner geht's auch so: 10 % von 240 = 24 (Komma eine Stelle nach " +
          "links), 5 % ist die Hälfte davon = 12. Zusammen 24 + 12 = 36.",
      },
      {
        id: 104, type: "input", part: "A", points: 2,
        q: "Ein Pulli kostet <b>80 €</b> und wird um <b>25 % reduziert</b>. Was ist der neue Preis (in €)?",
        answer: 60, unit: "€",
        tip: "Wenn 25 % weg sind, bleiben 75 % übrig.",
        steps: [
          "25 % Rabatt → es bleiben 100 % − 25 % = 75 % = 0,75.",
          "80 € &middot; 0,75 = 60 €.",
          "(Oder: 25 % von 80 = 20 €. 80 − 20 = 60 €.)",
        ],
        deep:
          "Es gibt zwei Denkwege. Weg 1: Rabatt ausrechnen und abziehen. 25 % von 80 € " +
          "= 20 € Rabatt, also 80 − 20 = 60 €. Weg 2 (schneller): Wenn 25 % abgezogen " +
          "werden, bezahlst du noch 75 % vom Preis. 75 % von 80 € = 0,75 &middot; 80 = 60 €. " +
          "25 % ist übrigens genau ein Viertel – ein Viertel von 80 ist 20.",
      },
      {
        id: 105, type: "input", part: "A", points: 1,
        q: "<b>45</b> sind wie viel <b>Prozent von 180</b>?",
        answer: 25, unit: "%",
        tip: "Prozentsatz = Teil ÷ Ganzes.",
        steps: [
          "45 &divide; 180 = 0,25.",
          "0,25 = 25 %.",
        ],
        deep:
          "Hier ist der Prozentsatz gesucht. Du teilst den Teil (45) durch das Ganze " +
          "(180) und bekommst eine Kommazahl: 0,25. Diese machst du zu Prozent, indem du " +
          "&middot; 100 rechnest: 0,25 = 25 %. Kontrolle: 45 ist ein Viertel von 180 " +
          "(180 &divide; 4 = 45), und ein Viertel sind 25 %.",
      },
      {
        id: 106, type: "input", part: "A", points: 2,
        q: "<b>30 %</b> eines Geldbetrags sind <b>60 €</b>. Wie groß ist der ganze Betrag (in €)?",
        answer: 200, unit: "€",
        tip: "Hier ist der Grundwert (das Ganze) gesucht: Teil ÷ Prozentsatz.",
        steps: [
          "30 % = 0,30.",
          "Grundwert = 60 &divide; 0,30 = 200 €.",
        ],
        deep:
          "Diesmal kennst du den Teil (60 €) und den Prozentsatz (30 %), gesucht ist das " +
          "Ganze. Trick: Wenn 30 % = 60 € sind, dann sind 10 % = 20 € (durch 3 geteilt). " +
          "Und 100 % (das Ganze) sind dann 10 &middot; 20 € = 200 €. Das „Runterrechnen auf " +
          "10 % oder 1 %“ und dann hochrechnen ist bei Prozenten oft der einfachste Weg.",
      },
      {
        id: 107, type: "input", part: "B", points: 1,
        q: "Du legst <b>1500 €</b> für 1 Jahr zu <b>2 % Zinsen</b> an. Wie viel Zinsen bekommst du (in €)?",
        answer: 30, unit: "€",
        tip: "Zinsen = Kapital · Zinssatz.",
        steps: [
          "2 % = 0,02.",
          "1500 € &middot; 0,02 = 30 €.",
        ],
        deep:
          "Zinsen sind einfach „Prozente vom Geld“, das du auf der Bank hast. 2 % von " +
          "1500 € berechnest du wie jeden Prozentwert: 1500 &middot; 0,02 = 30 €. Nach einem " +
          "Jahr hast du also 30 € mehr, insgesamt 1530 €.",
      },
      {
        id: 108, type: "mc", part: "A", points: 1,
        q: "Schreibe <b>0,75</b> als gekürzten Bruch.",
        options: ["3/4", "7/5", "2/3", "1/4"],
        answer: "3/4",
        tip: "0,75 = 75/100. Jetzt kürzen.",
        steps: [
          "0,75 = 75/100.",
          "Mit 25 kürzen: 75 &divide; 25 = 3, 100 &divide; 25 = 4.",
          "Ergebnis: 3/4.",
        ],
        deep:
          "Eine Kommazahl mit zwei Nachkommastellen ist „etwas von Hundert“. 0,75 = " +
          "75 Hundertstel = 75/100. Dann kürzt du: 75 und 100 sind beide durch 25 teilbar. " +
          "75 &divide; 25 = 3 und 100 &divide; 25 = 4, also 3/4. Merke dir: 0,5 = 1/2, " +
          "0,25 = 1/4, 0,75 = 3/4 – die kommen ständig vor.",
      },
      {
        id: 109, type: "input", part: "B", points: 2,
        q: "<b>Dreisatz:</b> 4 Brötchen kosten 1,40 €. Was kosten <b>7 Brötchen</b> (in €)?",
        answer: 2.45, unit: "€",
        tip: "Erst auf 1 Brötchen runterrechnen, dann auf 7 hoch.",
        steps: [
          "1 Brötchen: 1,40 € &divide; 4 = 0,35 €.",
          "7 Brötchen: 0,35 € &middot; 7 = 2,45 €.",
        ],
        deep:
          "Der Dreisatz geht immer in zwei Schritten: erst auf EINS runter, dann auf die " +
          "gesuchte Anzahl hoch. 4 Brötchen = 1,40 €, also 1 Brötchen = 1,40 &divide; 4 = " +
          "0,35 €. Jetzt 7 Brötchen: 0,35 &middot; 7 = 2,45 €. Der Weg über „1 Stück“ ist " +
          "der sichere Trick bei fast allen Dreisatz-Aufgaben.",
      },
      {
        id: 110, type: "input", part: "B", points: 2,
        q: "Eine Jacke kostet nach <b>20 % Rabatt</b> noch <b>96 €</b>. Wie hoch war der Originalpreis (in €)?",
        answer: 120, unit: "€",
        tip: "96 € entsprechen 80 % des Originalpreises.",
        steps: [
          "Nach 20 % Rabatt bleiben 80 % = 0,80.",
          "96 € sind also 0,80 vom Original.",
          "Original = 96 &divide; 0,80 = 120 €.",
        ],
        deep:
          "Achtung – die häufigste Falle: Man darf NICHT einfach 20 % zu 96 € addieren! " +
          "Denn die 20 % bezogen sich auf den höheren Originalpreis. Richtig: Nach 20 % " +
          "Rabatt zahlst du noch 80 % vom Original. Diese 80 % sind 96 €. Also sind 10 % " +
          "= 12 € (96 &divide; 8) und 100 % = 120 €. Probe: 20 % von 120 = 24 € Rabatt, " +
          "120 − 24 = 96 €. ✔",
      },
      {
        id: 111, type: "mc", part: "A", points: 1,
        q: "Berechne: <b>5/6 − 1/3</b>",
        options: ["1/2", "4/3", "1/6", "2/3"],
        answer: "1/2",
        tip: "Mach 1/3 auf den Nenner 6.",
        steps: [
          "1/3 = 2/6 (erweitern mit 2).",
          "5/6 − 2/6 = 3/6.",
          "3/6 kürzen = 1/2.",
        ],
        deep:
          "Auch beim Subtrahieren brauchst du gleiche Nenner. 1/3 passt 2-mal in 6, also " +
          "1/3 = 2/6. Dann 5/6 − 2/6 = 3/6 (nur die Zähler abziehen, Nenner bleibt). " +
          "3/6 ist die Hälfte, also 1/2.",
      },
      {
        id: 112, type: "input", part: "A", points: 1,
        q: "Berechne <b>3/5 von 200</b>.",
        answer: 120,
        tip: "Erst durch den Nenner teilen, dann mit dem Zähler malnehmen.",
        steps: [
          "1/5 von 200 = 200 &divide; 5 = 40.",
          "3/5 = 3 &middot; 40 = 120.",
        ],
        deep:
          "„3/5 von 200“ heißt: teile 200 in 5 gleiche Teile und nimm davon 3. Ein Teil " +
          "(1/5) = 200 &divide; 5 = 40. Drei davon = 3 &middot; 40 = 120. Bruchteile von " +
          "etwas berechnest du also: durch den Nenner teilen, mal den Zähler.",
      },
      {
        id: 113, type: "input", part: "A", points: 1,
        q: "Schreibe den Bruch <b>3/4 als Prozent</b>.",
        answer: 75, unit: "%",
        tip: "Bruch · 100 % ergibt den Prozentwert.",
        steps: [
          "3/4 = 3 &divide; 4 = 0,75.",
          "0,75 &middot; 100 % = 75 %.",
        ],
        deep:
          "Jeder Bruch ist auch eine Division: 3/4 = 3 geteilt durch 4 = 0,75. Und jede " +
          "Kommazahl wird zu Prozent, indem du &middot; 100 rechnest (Komma zwei Stellen " +
          "nach rechts): 0,75 → 75 %. Gut zu merken: 1/2 = 50 %, 1/4 = 25 %, 3/4 = 75 %.",
      },
      {
        id: 114, type: "input", part: "A", points: 1,
        q: "Berechne <b>120 % von 50</b>.",
        answer: 60,
        tip: "120 % = 1,2. Mehr als 100 % heißt mehr als das Ganze.",
        steps: [
          "120 % = 1,20.",
          "50 &middot; 1,2 = 60.",
        ],
        deep:
          "Prozente können auch größer als 100 sein. 100 % von 50 wären 50 (das Ganze). " +
          "120 % sind das Ganze plus noch 20 % obendrauf. 20 % von 50 = 10, also 50 + 10 = " +
          "60. Oder direkt: 50 &middot; 1,2 = 60.",
      },
      {
        id: 115, type: "input", part: "B", points: 2,
        q: "Ein Handy kostet <b>300 €</b> und wird um <b>12 % teurer</b>. Was ist der neue Preis (in €)?",
        answer: 336, unit: "€",
        tip: "Teurer = 100 % + 12 % = 112 % = 1,12.",
        steps: [
          "Aufschlag: 12 % von 300 = 0,12 &middot; 300 = 36 €.",
          "Neuer Preis: 300 + 36 = 336 €.",
          "(Oder direkt: 300 &middot; 1,12 = 336 €.)",
        ],
        deep:
          "Wenn etwas teurer wird, kommen Prozente DAZU. Du kannst den Aufschlag einzeln " +
          "berechnen (12 % von 300 = 36 €) und addieren. Oder schneller mit dem Faktor: " +
          "100 % + 12 % = 112 % = 1,12, also 300 &middot; 1,12 = 336 €. Beim Rabatt wäre der " +
          "Faktor kleiner als 1 (z.B. 0,88 für 12 % günstiger).",
      },
      {
        id: 116, type: "input", part: "B", points: 2,
        q: "<b>Zinsen:</b> 250 € werden für <b>2 Jahre</b> zu <b>3 % pro Jahr</b> angelegt. Wie viel Zinsen insgesamt (in €)?",
        answer: 15, unit: "€",
        tip: "Zinsen = Kapital · Zinssatz · Jahre.",
        steps: [
          "Zinsen pro Jahr: 250 &middot; 0,03 = 7,50 €.",
          "Für 2 Jahre: 7,50 &middot; 2 = 15 €.",
        ],
        deep:
          "Pro Jahr bekommst du 3 % von 250 € = 7,50 €. Über 2 Jahre also doppelt: 15 € " +
          "(hier ohne Zinseszins gerechnet, wie in der MSA üblich). Die Formel " +
          "Zinsen = Kapital &middot; Zinssatz &middot; Jahre fasst das zusammen: " +
          "250 &middot; 0,03 &middot; 2 = 15 €.",
      },
      {
        id: 117, type: "input", part: "B", points: 2,
        q: "Ein Artikel kostet <b>200 € netto</b>. Dazu kommen <b>19 % Mehrwertsteuer</b>. Wie hoch ist der Bruttopreis (in €)?",
        answer: 238, unit: "€",
        tip: "Brutto = Netto + 19 % = Netto · 1,19.",
        steps: [
          "Mehrwertsteuer: 19 % von 200 = 0,19 &middot; 200 = 38 €.",
          "Bruttopreis: 200 + 38 = 238 €.",
        ],
        deep:
          "Netto ist der Preis ohne Steuer, Brutto mit Steuer. Die 19 % MwSt werden auf " +
          "den Nettopreis draufgerechnet: 19 % von 200 = 38 €. Brutto = 200 + 38 = 238 €. " +
          "Mit Faktor: 200 &middot; 1,19 = 238 €.",
      },
      {
        id: 118, type: "input", part: "A", points: 2,
        q: "In einer Klasse mit <b>60 Schülern</b> sind <b>24 Mädchen</b>. Wie viel Prozent sind Mädchen?",
        answer: 40, unit: "%",
        tip: "Prozentsatz = Teil ÷ Ganzes, dann · 100.",
        steps: [
          "24 &divide; 60 = 0,4.",
          "0,4 = 40 %.",
        ],
        deep:
          "Du willst wissen, welcher Anteil der Klasse Mädchen sind. Teile den Teil (24) " +
          "durch das Ganze (60): 24 &divide; 60 = 0,4. Als Prozent &middot; 100 = 40 %. " +
          "Also sind 40 % Mädchen und 60 % Jungen.",
      },
      {
        id: 119, type: "input", part: "B", points: 3,
        q: "Ein Preis sinkt von <b>80 €</b> auf <b>60 €</b>. Um wie viel <b>Prozent</b> ist er gesunken?",
        answer: 25, unit: "%",
        tip: "Erst die Veränderung (in €) ausrechnen, dann durch den ALTEN Preis teilen.",
        steps: [
          "Veränderung: 80 − 60 = 20 € weniger.",
          "Bezogen auf den alten Preis: 20 &divide; 80 = 0,25.",
          "0,25 = 25 %.",
        ],
        deep:
          "Bei „um wie viel Prozent geändert“ ist der Bezugspunkt immer der ALTE/" +
          "ursprüngliche Wert (hier 80 €). Erst die Differenz: 80 − 60 = 20 €. Dann diese " +
          "20 € im Verhältnis zu 80 €: 20 &divide; 80 = 0,25 = 25 %. Der Preis ist also um " +
          "25 % gefallen.",
      },
      {
        id: 120, type: "mc", part: "A", points: 1,
        q: "Schreibe <b>7/10</b> als Dezimalzahl.",
        options: ["0,7", "7,0", "0,07", "1,7"],
        answer: "0,7",
        tip: "Zehntel = eine Stelle hinter dem Komma.",
        steps: [
          "7/10 = 7 &divide; 10 = 0,7.",
        ],
        deep:
          "Teilen durch 10 verschiebt das Komma eine Stelle nach links: aus 7 wird 0,7. " +
          "7/10 sind sieben Zehntel, und ein Zehntel ist 0,1 – sieben davon also 0,7.",
      },
      {
        id: 121, type: "mc", part: "A", points: 1,
        q: "Kürze vollständig: <b>12/18</b>",
        options: ["2/3", "6/9", "4/6", "3/4"],
        answer: "2/3",
        tip: "Suche die größte Zahl, durch die 12 UND 18 teilbar sind.",
        steps: [
          "12 und 18 sind beide durch 6 teilbar.",
          "12 &divide; 6 = 2, &nbsp; 18 &divide; 6 = 3.",
          "Ergebnis: 2/3.",
        ],
        deep:
          "Kürzen heißt, Zähler und Nenner durch dieselbe Zahl zu teilen. 12 und 18 haben " +
          "den größten gemeinsamen Teiler 6. 12 &divide; 6 = 2, 18 &divide; 6 = 3 → 2/3. " +
          "6/9 und 4/6 wären zwar gleich groß, aber noch nicht VOLLSTÄNDIG gekürzt.",
      },
      {
        id: 122, type: "mc", part: "A", points: 1,
        q: "Schreibe <b>0,2</b> als gekürzten Bruch.",
        options: ["1/5", "2/100", "1/2", "2/5"],
        answer: "1/5",
        tip: "0,2 = 2/10, dann kürzen.",
        steps: [
          "0,2 = 2/10.",
          "Mit 2 kürzen: 2/10 = 1/5.",
        ],
        deep:
          "Eine Nachkommastelle = Zehntel: 0,2 = 2/10. Kürzen mit 2 ergibt 1/5. Probe: " +
          "1 &divide; 5 = 0,2. ✔",
      },
    ],
  },

  /* ================================================================= */
  {
    id: "algebra",
    name: "Terme & Gleichungen",
    emoji: "🔢",
    intro:
      "Eine Gleichung ist wie eine Waage: was du links machst, musst du auch rechts " +
      "machen. Ziel ist immer, das <b>x alleine</b> auf eine Seite zu bekommen. " +
      "Du darfst auf beiden Seiten das Gleiche +, −, &middot; oder &divide;.",
    formulas: [
      "Gleichung lösen: x Schritt für Schritt isolieren (immer auf BEIDEN Seiten)",
      "Klammer auflösen: a&middot;(b+c) = a&middot;b + a&middot;c",
      "1. binomische Formel: (a+b)² = a² + 2ab + b²",
      "2. binomische Formel: (a−b)² = a² − 2ab + b²",
      "3. binomische Formel: (a+b)(a−b) = a² − b²",
    ],
    questions: [
      {
        id: 201, type: "input", part: "A", points: 1,
        q: "Löse die Gleichung: <b>3x + 5 = 20</b>",
        answer: 5,
        tip: "Erst die +5 wegbekommen, dann durch 3 teilen.",
        steps: [
          "| −5 auf beiden Seiten: 3x = 15.",
          "| &divide;3: x = 5.",
        ],
        deep:
          "Denk an eine Waage: links 3x + 5, rechts 20, beide gleich schwer. Damit x " +
          "allein bleibt, nimmst du erst die +5 weg – aber von BEIDEN Seiten: " +
          "3x = 15. Dann steht da „3 mal x = 15“, also teilst du beide Seiten durch 3: " +
          "x = 5. Probe: 3&middot;5 + 5 = 20. ✔ Immer dieselbe Reihenfolge: erst +/−, dann " +
          "&middot;/&divide;.",
      },
      {
        id: 202, type: "input", part: "A", points: 2,
        q: "Löse: <b>2x − 7 = 5x + 8</b>",
        answer: -5,
        tip: "Bring alle x auf eine Seite, alle Zahlen auf die andere.",
        steps: [
          "| −5x: 2x − 5x − 7 = 8 → −3x − 7 = 8.",
          "| +7: −3x = 15.",
          "| &divide;(−3): x = −5.",
        ],
        deep:
          "Wenn x auf beiden Seiten steht, sammelst du es zuerst auf einer Seite. Ziehst " +
          "du 5x ab, bleibt links 2x − 5x = −3x. Dann die Zahlen auf die andere Seite " +
          "(+7): −3x = 15. Zuletzt durch −3 teilen – Vorsicht beim Minus: 15 &divide; (−3) " +
          "= −5. Tipp: Lieber so umstellen, dass möglichst eine positive x-Zahl entsteht.",
      },
      {
        id: 203, type: "input", part: "A", points: 2,
        q: "Löse: <b>4 &middot; (x − 2) = 12</b>",
        answer: 5,
        tip: "Du kannst direkt durch 4 teilen oder zuerst die Klammer auflösen.",
        steps: [
          "| &divide;4: x − 2 = 3.",
          "| +2: x = 5.",
        ],
        deep:
          "Hier steht eine Klammer mal 4. Am schnellsten teilst du beide Seiten zuerst " +
          "durch 4: dann verschwindet die 4 und es bleibt x − 2 = 3. Plus 2 → x = 5. " +
          "Alternative: erst ausmultiplizieren 4x − 8 = 12, dann +8 und &divide;4 – führt " +
          "zum selben Ergebnis.",
      },
      {
        id: 204, type: "mc", part: "A", points: 1,
        q: "Fasse zusammen: <b>3a + 2b − a + 4b</b>",
        options: ["2a + 6b", "3a + 8b", "2a + 4b", "4a + 6b"],
        answer: "2a + 6b",
        tip: "Nur gleiche Buchstaben darfst du zusammenrechnen.",
        steps: [
          "Die a: 3a − a = 2a.",
          "Die b: 2b + 4b = 6b.",
          "Zusammen: 2a + 6b.",
        ],
        deep:
          "Buchstaben sind wie Sorten von Obst: a = Äpfel, b = Birnen. 3 Äpfel minus " +
          "1 Apfel = 2 Äpfel (2a). 2 Birnen plus 4 Birnen = 6 Birnen (6b). Äpfel und " +
          "Birnen kannst du NICHT zusammenzählen, deshalb bleibt es 2a + 6b. Nur „gleiche " +
          "Sorten“ darf man verrechnen.",
      },
      {
        id: 205, type: "mc", part: "A", points: 1,
        q: "Multipliziere die Klammer aus: <b>3 &middot; (2x + 4)</b>",
        options: ["6x + 12", "6x + 4", "5x + 7", "2x + 12"],
        answer: "6x + 12",
        tip: "Die 3 muss mit JEDEM Glied in der Klammer multipliziert werden.",
        steps: [
          "3 &middot; 2x = 6x.",
          "3 &middot; 4 = 12.",
          "Ergebnis: 6x + 12.",
        ],
        deep:
          "Eine Zahl vor der Klammer wird mit ALLEM in der Klammer multipliziert – nicht " +
          "nur mit dem ersten Teil. Also 3 &middot; 2x = 6x UND 3 &middot; 4 = 12. Häufiger " +
          "Fehler: die 4 vergessen. Das nennt man Distributivgesetz.",
      },
      {
        id: 206, type: "mc", part: "A", points: 2,
        q: "Wende die binomische Formel an: <b>(x + 3)<sup>2</sup></b>",
        options: ["x² + 6x + 9", "x² + 9", "x² + 3x + 9", "x² + 6x + 6"],
        answer: "x² + 6x + 9",
        tip: "1. binomische Formel: (a+b)² = a² + 2ab + b².",
        steps: [
          "a = x, b = 3.",
          "a² = x², &nbsp; 2ab = 2&middot;x&middot;3 = 6x, &nbsp; b² = 9.",
          "Ergebnis: x² + 6x + 9.",
        ],
        deep:
          "(x+3)² heißt (x+3)&middot;(x+3) – NICHT x² + 9! Der häufigste Fehler ist, das " +
          "mittlere Glied zu vergessen. Die 1. binomische Formel merkt sich: das Quadrat " +
          "der ersten Zahl (x²), plus zweimal das Produkt beider (2&middot;x&middot;3 = 6x), " +
          "plus das Quadrat der zweiten (3² = 9). Ergebnis x² + 6x + 9.",
      },
      {
        id: 207, type: "input", part: "B", points: 2,
        q: "Gleichungssystem: <b>x + y = 10</b> und <b>x − y = 4</b>. Wie groß ist <b>x</b>?",
        answer: 7,
        tip: "Addiere beide Gleichungen – das y fällt weg!",
        steps: [
          "Beide Gleichungen addieren: (x+y) + (x−y) = 10 + 4.",
          "2x = 14.",
          "x = 7. (und y = 3)",
        ],
        deep:
          "Bei zwei Gleichungen mit x und y ist das Additionsverfahren oft am schnellsten: " +
          "Du addierst die Gleichungen Zeile für Zeile. Links: x + y + x − y = 2x " +
          "(das +y und −y heben sich auf!). Rechts: 10 + 4 = 14. Also 2x = 14 → x = 7. " +
          "Setzt du x = 7 in die erste Gleichung ein, kommt y = 3 heraus.",
      },
      {
        id: 208, type: "input", part: "A", points: 1,
        q: "Löse: <b>x / 4 = 3</b>",
        answer: 12,
        tip: "Mal 4 rechnen, um das Teilen rückgängig zu machen.",
        steps: [
          "| &middot;4: x = 3 &middot; 4.",
          "x = 12.",
        ],
        deep:
          "x/4 bedeutet „x geteilt durch 4“. Um x zu befreien, machst du das Teilen " +
          "rückgängig – mit dem Gegenteil, also mal 4. Beide Seiten &middot; 4: x = 12. " +
          "Probe: 12 &divide; 4 = 3. ✔",
      },
      {
        id: 209, type: "input", part: "A", points: 1,
        q: "Löse: <b>x<sup>2</sup> = 49</b> (gib die positive Lösung an)",
        answer: 7,
        tip: "Was mal sich selbst ergibt 49?",
        steps: [
          "Wurzel ziehen: x = ±√49.",
          "√49 = 7.",
          "Positive Lösung: x = 7 (es gibt auch x = −7).",
        ],
        deep:
          "x² = 49 fragt: welche Zahl mal sich selbst ist 49? Das ist 7, denn 7&middot;7 = " +
          "49. Wichtig: auch (−7)&middot;(−7) = 49, deshalb hat x² = 49 eigentlich ZWEI " +
          "Lösungen: +7 und −7. Hier ist die positive gefragt, also 7. Wurzelziehen ist " +
          "die Umkehrung vom Quadrieren.",
      },
      {
        id: 210, type: "input", part: "A", points: 2,
        q: "Löse: <b>5x − 3 = 2x + 9</b>",
        answer: 4,
        tip: "x auf eine Seite, Zahlen auf die andere.",
        steps: [
          "| −2x: 3x − 3 = 9.",
          "| +3: 3x = 12.",
          "| &divide;3: x = 4.",
        ],
        deep:
          "x steht auf beiden Seiten. Ziehe 2x ab → links bleibt 5x − 2x = 3x: also " +
          "3x − 3 = 9. Dann +3 (Zahlen nach rechts): 3x = 12. Zuletzt &divide;3: x = 4. " +
          "Probe: 5&middot;4 − 3 = 17 und 2&middot;4 + 9 = 17 – beide Seiten gleich. ✔",
      },
      {
        id: 211, type: "input", part: "A", points: 1,
        q: "Löse: <b>7x = 56</b>",
        answer: 8,
        tip: "Nur noch durch 7 teilen.",
        steps: ["| &divide;7: x = 56 &divide; 7 = 8."],
        deep:
          "„7 mal x = 56“ – gesucht ist die Zahl, die mit 7 multipliziert 56 ergibt. Du " +
          "machst das Mal rückgängig, indem du durch 7 teilst: 56 &divide; 7 = 8.",
      },
      {
        id: 212, type: "input", part: "A", points: 1,
        q: "Löse: <b>x + 12 = 5</b>",
        answer: -7,
        tip: "12 abziehen. Das Ergebnis darf negativ sein.",
        steps: ["| −12: x = 5 − 12 = −7."],
        deep:
          "Um x allein zu haben, ziehst du 12 ab: x = 5 − 12. Da 12 größer als 5 ist, " +
          "landest du im Minus: 5 − 12 = −7. Negative Ergebnisse sind völlig normal.",
      },
      {
        id: 213, type: "mc", part: "A", points: 1,
        q: "Multipliziere aus: <b>2 &middot; (x + 3)</b>",
        options: ["2x + 6", "2x + 3", "x + 6", "2x + 5"],
        answer: "2x + 6",
        tip: "2 mal jedes Glied in der Klammer.",
        steps: ["2 &middot; x = 2x.", "2 &middot; 3 = 6.", "Ergebnis: 2x + 6."],
        deep:
          "Die 2 wird mit beiden Teilen der Klammer multipliziert: 2&middot;x = 2x und " +
          "2&middot;3 = 6. Zusammen 2x + 6. Nicht nur das x verdoppeln und die 3 stehen " +
          "lassen!",
      },
      {
        id: 214, type: "input", part: "A", points: 1,
        q: "Löse: <b>3x + 4 = 19</b>",
        answer: 5,
        tip: "Erst −4, dann ÷3.",
        steps: ["| −4: 3x = 15.", "| &divide;3: x = 5."],
        deep:
          "Reihenfolge wie immer: zuerst die +4 wegnehmen (−4 auf beiden Seiten) → " +
          "3x = 15. Dann durch 3 teilen → x = 5. Probe: 3&middot;5 + 4 = 19. ✔",
      },
      {
        id: 215, type: "mc", part: "A", points: 2,
        q: "Wende die binomische Formel an: <b>(x − 5)<sup>2</sup></b>",
        options: ["x² − 10x + 25", "x² − 25", "x² + 25", "x² − 5x + 25"],
        answer: "x² − 10x + 25",
        tip: "2. binomische Formel: (a−b)² = a² − 2ab + b².",
        steps: [
          "a = x, b = 5.",
          "a² = x², &nbsp; −2ab = −2&middot;x&middot;5 = −10x, &nbsp; b² = 25.",
          "Ergebnis: x² − 10x + 25.",
        ],
        deep:
          "Die 2. binomische Formel ist wie die erste, nur mit Minus in der Mitte: das " +
          "Quadrat der ersten Zahl (x²), MINUS zweimal das Produkt (2&middot;x&middot;5 = 10x), " +
          "plus das Quadrat der zweiten (5² = 25). Das letzte Glied bleibt positiv, weil " +
          "minus mal minus = plus. Ergebnis: x² − 10x + 25.",
      },
      {
        id: 216, type: "mc", part: "A", points: 2,
        q: "Wende die binomische Formel an: <b>(x + 4)(x − 4)</b>",
        options: ["x² − 16", "x² + 16", "x² − 8x", "x² − 8"],
        answer: "x² − 16",
        tip: "3. binomische Formel: (a+b)(a−b) = a² − b².",
        steps: [
          "a = x, b = 4.",
          "a² − b² = x² − 16.",
        ],
        deep:
          "Wenn in zwei Klammern dasselbe steht, nur einmal mit + und einmal mit −, dann " +
          "heben sich die mittleren Glieder auf. Übrig bleibt erste² minus zweite²: " +
          "x² − 4² = x² − 16. Das ist die 3. binomische Formel – sehr praktisch.",
      },
      {
        id: 217, type: "input", part: "A", points: 1,
        q: "Setze ein: Wie groß ist <b>2x + 3y</b> für <b>x = 4</b> und <b>y = 2</b>?",
        answer: 14,
        tip: "Erst die Buchstaben durch die Zahlen ersetzen.",
        steps: ["2 &middot; 4 + 3 &middot; 2 = 8 + 6 = 14."],
        deep:
          "Einsetzen heißt: jeden Buchstaben durch seine Zahl ersetzen. Aus 2x wird " +
          "2&middot;4 = 8, aus 3y wird 3&middot;2 = 6. Punkt-vor-Strich beachten: erst die " +
          "Mal-Rechnungen, dann addieren: 8 + 6 = 14.",
      },
      {
        id: 218, type: "input", part: "A", points: 2,
        q: "Löse: <b>6x − 4 = 2x + 12</b>",
        answer: 4,
        tip: "x sammeln, Zahlen auf die andere Seite.",
        steps: ["| −2x: 4x − 4 = 12.", "| +4: 4x = 16.", "| &divide;4: x = 4."],
        deep:
          "Erst x auf eine Seite (−2x): 6x − 2x = 4x → 4x − 4 = 12. Dann Zahlen nach " +
          "rechts (+4): 4x = 16. Dann &divide;4: x = 4. Probe: 6&middot;4 − 4 = 20 und " +
          "2&middot;4 + 12 = 20. ✔",
      },
      {
        id: 219, type: "input", part: "A", points: 2,
        q: "Das <b>Doppelte einer Zahl</b> plus <b>5</b> ergibt <b>17</b>. Wie heißt die Zahl?",
        answer: 6,
        tip: "Stelle die Gleichung auf: 2x + 5 = 17.",
        steps: ["Gleichung: 2x + 5 = 17.", "| −5: 2x = 12.", "| &divide;2: x = 6."],
        deep:
          "Textaufgaben übersetzt man Wort für Wort in eine Gleichung. „Eine Zahl“ = x, " +
          "„das Doppelte“ = 2x, „plus 5“ = +5, „ergibt 17“ = = 17. Also 2x + 5 = 17. " +
          "Lösen: −5 → 2x = 12, &divide;2 → x = 6. Probe: 2&middot;6 + 5 = 17. ✔",
      },
      {
        id: 220, type: "input", part: "A", points: 1,
        q: "Löse: <b>0,5x = 10</b>",
        answer: 20,
        tip: "0,5x ist die Hälfte von x. Mal 2 rechnen.",
        steps: ["| &middot;2: x = 20.", "(weil 0,5 = ½)"],
        deep:
          "0,5x ist dasselbe wie „die Hälfte von x“. Wenn die Hälfte 10 ist, ist das " +
          "Ganze 20. Rechnerisch teilst du durch 0,5 (oder einfacher: mal 2): " +
          "10 &middot; 2 = 20.",
      },
    ],
  },

  /* ================================================================= */
  {
    id: "funktionen",
    name: "Lineare & quadratische Funktionen",
    emoji: "📈",
    intro:
      "Eine <b>lineare Funktion</b> ist eine Gerade: <b>y = m&middot;x + b</b>. " +
      "Das <b>m</b> ist die Steigung (wie steil), das <b>b</b> ist der Schnittpunkt " +
      "mit der y-Achse. Eine <b>quadratische Funktion</b> (mit x²) ist eine Parabel " +
      "(U-Form).",
    formulas: [
      "Gerade: y = m&middot;x + b &nbsp; (m = Steigung, b = y-Achsenabschnitt)",
      "Steigung aus 2 Punkten: m = (y₂ − y₁) / (x₂ − x₁)",
      "Nullstelle: y = 0 setzen und nach x auflösen",
      "m > 0 → Gerade steigt, &nbsp; m < 0 → Gerade fällt",
      "parallel = gleiche Steigung m",
      "Scheitelpunktform: y = (x − d)² + e → Scheitel bei S(d | e)",
    ],
    questions: [
      {
        id: 301, type: "mc", part: "A", points: 2,
        q: "Eine Gerade geht durch die Punkte (0|2) und (2|6). Wie groß ist die <b>Steigung m</b>?",
        options: ["2", "1", "3", "4"],
        answer: "2",
        tip: "m = (y₂ − y₁) / (x₂ − x₁).",
        steps: ["m = (6 − 2) / (2 − 0).", "m = 4 / 2 = 2."],
        deep:
          "Die Steigung sagt: wie viel geht's hoch, wenn ich eins nach rechts gehe? Du " +
          "rechnest „Höhenunterschied geteilt durch Schrittweite“: oben die y-Werte " +
          "abziehen (6 − 2 = 4), unten die x-Werte (2 − 0 = 2), dann teilen: 4/2 = 2. " +
          "Also: pro Schritt nach rechts geht die Gerade 2 nach oben.",
      },
      {
        id: 302, type: "input", part: "A", points: 1,
        q: "Gegeben ist <b>f(x) = 2x + 3</b>. Berechne <b>f(4)</b>.",
        answer: 11,
        tip: "Setze einfach 4 für jedes x ein.",
        steps: ["f(4) = 2 &middot; 4 + 3.", "= 8 + 3 = 11."],
        deep:
          "f(4) heißt: „Was kommt heraus, wenn x = 4 ist?“ Du ersetzt jedes x durch 4: " +
          "2&middot;4 + 3. Punkt vor Strich: erst 2&middot;4 = 8, dann + 3 = 11. Der Punkt " +
          "(4 | 11) liegt also auf der Geraden.",
      },
      {
        id: 303, type: "mc", part: "A", points: 1,
        q: "Wo schneidet die Gerade <b>y = −3x + 5</b> die y-Achse?",
        options: ["bei 5", "bei −3", "bei 0", "bei −5"],
        answer: "bei 5",
        tip: "Der y-Achsenabschnitt ist immer das b (die Zahl ohne x).",
        steps: ["Form y = m&middot;x + b. Hier ist b = 5.", "Also Schnittpunkt (0|5)."],
        deep:
          "Die y-Achse ist dort, wo x = 0 ist. Setzt du x = 0 ein: y = −3&middot;0 + 5 = 5. " +
          "Deshalb ist das b (die Zahl ohne x) immer genau der Schnittpunkt mit der " +
          "y-Achse. Hier b = 5, also schneidet die Gerade die y-Achse bei (0|5).",
      },
      {
        id: 304, type: "input", part: "A", points: 1,
        q: "Berechne die <b>Nullstelle</b> von <b>f(x) = 2x − 8</b>.",
        answer: 4,
        tip: "Nullstelle heißt: setze f(x) = 0.",
        steps: ["2x − 8 = 0.", "| +8: 2x = 8.", "| &divide;2: x = 4."],
        deep:
          "Eine Nullstelle ist die Stelle, wo die Gerade die x-Achse kreuzt – dort ist " +
          "y = 0. Also setzt du die Funktion gleich 0: 2x − 8 = 0, und löst nach x: " +
          "+8 → 2x = 8, &divide;2 → x = 4. Die Gerade schneidet die x-Achse bei (4|0).",
      },
      {
        id: 305, type: "mc", part: "A", points: 1,
        q: "Welche dieser Funktionen ist eine <b>Parabel</b>?",
        options: ["y = x²", "y = 2x + 1", "y = 3", "y = 1/x"],
        answer: "y = x²",
        tip: "Eine Parabel erkennst du am x² (x hoch zwei).",
        steps: ["Parabeln haben ein x².", "y = x² ist die einzige mit x² → Parabel."],
        deep:
          "Der Graph einer Funktion mit x² ist eine Parabel – die typische U-Form (oder " +
          "umgedrehtes U). y = 2x + 1 ist eine Gerade (nur x hoch 1), y = 3 eine waagerechte " +
          "Linie, y = 1/x eine Hyperbel. Nur y = x² hat das x² → Parabel.",
      },
      {
        id: 306, type: "input", part: "B", points: 2,
        q: "Die Parabel <b>y = (x − 2)² + 3</b> hat ihren Scheitelpunkt bei S(? | 3). Gib die <b>x-Koordinate</b> des Scheitels an.",
        answer: 2,
        tip: "Scheitelpunktform y = (x − d)² + e → Scheitel S(d | e). Achtung Vorzeichen!",
        steps: ["Form: y = (x − d)² + e.", "Hier (x − 2)² → d = 2.", "Scheitel S(2 | 3)."],
        deep:
          "Der Scheitelpunkt ist der tiefste (oder höchste) Punkt der Parabel. In der " +
          "Scheitelpunktform y = (x − d)² + e kannst du ihn direkt ablesen: S(d | e). " +
          "Achtung beim Vorzeichen: in der Klammer steht (x − 2), also d = +2 (das Minus " +
          "gehört zur Formel). Der e-Wert (+3) ist die Höhe. Scheitel: S(2 | 3).",
      },
      {
        id: 307, type: "mc", part: "A", points: 1,
        q: "Wann <b>fällt</b> eine Gerade y = m&middot;x + b von links nach rechts?",
        options: ["wenn m < 0", "wenn m > 0", "wenn b < 0", "wenn b > 0"],
        answer: "wenn m < 0",
        tip: "Die Steigung m entscheidet über steigen/fallen.",
        steps: ["m > 0: Gerade steigt.", "m < 0: Gerade fällt."],
        deep:
          "Nur die Steigung m bestimmt die Richtung. Ist m positiv, geht die Gerade nach " +
          "oben (steigt). Ist m negativ, geht sie nach unten (fällt). Das b verschiebt die " +
          "Gerade nur hoch/runter, ändert aber nicht, ob sie steigt oder fällt.",
      },
      {
        id: 308, type: "input", part: "A", points: 1,
        q: "Gegeben ist <b>f(x) = x² − 4</b>. Berechne <b>f(3)</b>.",
        answer: 5,
        tip: "Erst 3 hoch zwei, dann minus 4.",
        steps: ["f(3) = 3² − 4.", "= 9 − 4 = 5."],
        deep:
          "Einsetzen: jedes x wird zu 3. 3² bedeutet 3&middot;3 = 9 (nicht 3&middot;2!). " +
          "Dann − 4: 9 − 4 = 5. Der Punkt (3 | 5) liegt auf der Parabel.",
      },
      {
        id: 309, type: "input", part: "A", points: 2,
        q: "Eine Gerade hat die Steigung 3 und den y-Achsenabschnitt −2. Berechne <b>f(2)</b>.",
        answer: 4,
        tip: "Die Funktion lautet f(x) = 3x − 2.",
        steps: ["f(x) = 3x − 2.", "f(2) = 3 &middot; 2 − 2 = 6 − 2 = 4."],
        deep:
          "Zuerst die Funktionsgleichung aufstellen: Steigung m = 3, y-Achsenabschnitt " +
          "b = −2, also f(x) = 3x − 2. Dann x = 2 einsetzen: 3&middot;2 − 2 = 6 − 2 = 4.",
      },
      {
        id: 310, type: "input", part: "A", points: 1,
        q: "Gegeben ist <b>f(x) = −2x + 6</b>. Berechne <b>f(0)</b>.",
        answer: 6,
        tip: "x = 0 einsetzen.",
        steps: ["f(0) = −2 &middot; 0 + 6 = 0 + 6 = 6."],
        deep:
          "Bei x = 0 fällt der x-Teil weg, weil −2&middot;0 = 0. Übrig bleibt nur das b: " +
          "f(0) = 6. Das ist auch der y-Achsenabschnitt – f(0) ist IMMER der Schnittpunkt " +
          "mit der y-Achse.",
      },
      {
        id: 311, type: "input", part: "A", points: 1,
        q: "Berechne die <b>Nullstelle</b> von <b>f(x) = 3x − 9</b>.",
        answer: 3,
        tip: "f(x) = 0 setzen.",
        steps: ["3x − 9 = 0.", "| +9: 3x = 9.", "| &divide;3: x = 3."],
        deep:
          "Nullstelle = dort, wo y = 0. Also 3x − 9 = 0. Plus 9: 3x = 9. Durch 3: x = 3. " +
          "Die Gerade kreuzt die x-Achse bei (3 | 0).",
      },
      {
        id: 312, type: "mc", part: "A", points: 1,
        q: "Wie groß ist die <b>Steigung</b> von <b>y = 4x − 1</b>?",
        options: ["4", "−1", "1", "−4"],
        answer: "4",
        tip: "Die Zahl direkt vor dem x ist die Steigung m.",
        steps: ["Form y = m&middot;x + b. Vor dem x steht 4 → m = 4."],
        deep:
          "In y = m&middot;x + b ist m (die Zahl vor dem x) die Steigung. Hier ist das die 4. " +
          "Die −1 ist das b, also der y-Achsenabschnitt – nicht die Steigung.",
      },
      {
        id: 313, type: "input", part: "A", points: 2,
        q: "Eine Gerade verläuft durch (1|2) und (3|8). Wie groß ist die <b>Steigung</b>?",
        answer: 3,
        tip: "m = (y₂ − y₁) / (x₂ − x₁).",
        steps: ["m = (8 − 2) / (3 − 1).", "= 6 / 2 = 3."],
        deep:
          "Steigung = Höhenunterschied geteilt durch Schrittweite. y: 8 − 2 = 6 (so viel " +
          "geht's hoch). x: 3 − 1 = 2 (so weit nach rechts). m = 6 &divide; 2 = 3. Pro " +
          "Schritt nach rechts geht die Gerade also 3 nach oben.",
      },
      {
        id: 314, type: "input", part: "A", points: 1,
        q: "Gegeben ist <b>f(x) = x²</b>. Berechne <b>f(−3)</b>.",
        answer: 9,
        tip: "Minus mal minus ergibt plus!",
        steps: ["f(−3) = (−3)² = (−3) &middot; (−3) = 9."],
        deep:
          "(−3)² bedeutet (−3)&middot;(−3). Und minus mal minus ergibt plus, also +9. " +
          "Deshalb sind die y-Werte einer x²-Parabel immer positiv – die Parabel liegt " +
          "(bei y = x²) komplett oberhalb der x-Achse, egal ob x positiv oder negativ ist.",
      },
      {
        id: 315, type: "mc", part: "A", points: 1,
        q: "Wo schneidet <b>y = 2x</b> die y-Achse?",
        options: ["bei 0", "bei 2", "bei −2", "bei 1"],
        answer: "bei 0",
        tip: "Es gibt kein +b, also ist b = 0.",
        steps: ["y = 2x = 2x + 0. → b = 0.", "Schnittpunkt (0|0)."],
        deep:
          "Wenn keine extra Zahl dahinter steht, ist b = 0. Die Gerade geht dann genau " +
          "durch den Ursprung (0|0). Probe: x = 0 einsetzen → y = 2&middot;0 = 0.",
      },
      {
        id: 316, type: "input", part: "A", points: 1,
        q: "Die Parabel <b>y = x² + 2</b> hat den Scheitelpunkt S(0 | ?). Gib die <b>y-Koordinate</b> an.",
        answer: 2,
        tip: "+2 verschiebt die Parabel um 2 nach oben.",
        steps: ["Normalparabel y = x² hat Scheitel (0|0).", "+2 hebt sie um 2 → S(0|2)."],
        deep:
          "y = x² hat ihren tiefsten Punkt bei (0|0). Das „+2“ schiebt die ganze Parabel " +
          "um 2 nach oben, also wandert der Scheitel auf (0|2). Eine Zahl, die hinten " +
          "addiert wird, verschiebt immer senkrecht (hoch/runter).",
      },
      {
        id: 317, type: "input", part: "B", points: 2,
        q: "Ein Handytarif: <b>5 € Grundgebühr</b> plus <b>2 € pro Stunde</b> Surfen. Was kosten <b>6 Stunden</b> (in €)?",
        answer: 17, unit: "€",
        tip: "Funktion: K(x) = 5 + 2·x. Setze x = 6 ein.",
        steps: ["K(x) = 5 + 2x.", "K(6) = 5 + 2 &middot; 6 = 5 + 12 = 17 €."],
        deep:
          "Solche Tarife sind lineare Funktionen: die Grundgebühr ist das feste b (5 €), " +
          "der Preis pro Stunde ist die Steigung m (2 €). Formel: K(x) = 2x + 5. Für " +
          "6 Stunden: 2&middot;6 + 5 = 17 €. Die Grundgebühr zahlst du immer, egal wie viel " +
          "du surfst.",
      },
      {
        id: 318, type: "mc", part: "A", points: 2,
        q: "Welche Gerade ist <b>parallel</b> zu <b>y = 3x + 1</b>?",
        options: ["y = 3x − 4", "y = −3x + 1", "y = x + 3", "y = 2x + 1"],
        answer: "y = 3x − 4",
        tip: "Parallel heißt: gleiche Steigung m.",
        steps: ["y = 3x + 1 hat Steigung 3.", "Parallel = auch Steigung 3 → y = 3x − 4."],
        deep:
          "Zwei Geraden sind parallel, wenn sie gleich steil sind – also dieselbe Steigung " +
          "m haben. Die Ausgangsgerade hat m = 3. Gesucht ist eine andere mit m = 3: das " +
          "ist y = 3x − 4 (anderes b, aber gleiches m, deshalb parallel und nur " +
          "verschoben).",
      },
      {
        id: 319, type: "input", part: "A", points: 2,
        q: "Für welches <b>x</b> ist <b>f(x) = 9</b>, wenn <b>f(x) = 2x + 1</b>?",
        answer: 4,
        tip: "Setze 2x + 1 = 9 und löse nach x.",
        steps: ["2x + 1 = 9.", "| −1: 2x = 8.", "| &divide;2: x = 4."],
        deep:
          "Diesmal ist das Ergebnis (y = 9) gegeben und das x gesucht – also rückwärts. " +
          "Du setzt die Funktion gleich 9: 2x + 1 = 9. Lösen wie eine normale Gleichung: " +
          "−1 → 2x = 8, &divide;2 → x = 4. Bei x = 4 liefert die Funktion den Wert 9.",
      },
      {
        id: 320, type: "input", part: "A", points: 1,
        q: "Wo schneidet <b>f(x) = −x + 7</b> die <b>y-Achse</b>? Gib den y-Wert an.",
        answer: 7,
        tip: "b ablesen (die Zahl ohne x).",
        steps: ["b = 7 → Schnittpunkt (0 | 7)."],
        deep:
          "Der y-Achsenabschnitt ist immer die Zahl ohne x, hier +7. Kontrolle: x = 0 " +
          "einsetzen → y = −0 + 7 = 7. Die Gerade kreuzt die y-Achse bei (0|7).",
      },
      {
        id: 321, type: "input", part: "B", points: 3,
        q: "Eine Gerade hat die Steigung <b>3</b> und die Nullstelle bei <b>x = 2</b>. Wie groß ist der <b>y-Achsenabschnitt b</b>?",
        answer: -6,
        tip: "Setze den Punkt (2|0) in y = 3x + b ein.",
        steps: [
          "Funktion: y = 3x + b.",
          "Nullstelle (2|0) einsetzen: 0 = 3 &middot; 2 + b.",
          "0 = 6 + b → b = −6.",
        ],
        deep:
          "Eine Nullstelle bei x = 2 bedeutet: der Punkt (2|0) liegt auf der Geraden. " +
          "Setzt du ihn in y = 3x + b ein, kennst du x, y und m und kannst b ausrechnen: " +
          "0 = 3&middot;2 + b → 0 = 6 + b → b = −6. Die Geradengleichung ist also y = 3x − 6.",
      },
    ],
  },

  /* ================================================================= */
  {
    id: "geometrie",
    name: "Flächen, Körper & Pythagoras",
    emoji: "📐",
    intro:
      "Hier rechnest du Flächen (Fläche = innen), Umfang (außen herum), Volumen " +
      "(Inhalt von Körpern) und nutzt den <b>Satz des Pythagoras</b> im " +
      "rechtwinkligen Dreieck: <b>a² + b² = c²</b> (c ist immer die längste Seite, " +
      "gegenüber dem rechten Winkel).",
    formulas: [
      "Rechteck: A = a &middot; b &nbsp; | &nbsp; Umfang U = 2&middot;(a + b)",
      "Quadrat: A = a² &nbsp; | &nbsp; Umfang U = 4 &middot; a",
      "Dreieck: A = ½ &middot; g &middot; h (Grundseite mal Höhe halbe)",
      "Kreis: A = π &middot; r² &nbsp; | &nbsp; Umfang U = 2 &middot; π &middot; r (= π &middot; d)",
      "Quader: V = a &middot; b &middot; c",
      "Würfel: V = a³ &nbsp; | &nbsp; Oberfläche O = 6 &middot; a²",
      "Zylinder: V = π &middot; r² &middot; h",
      "Pythagoras: a² + b² = c² &nbsp; (π ≈ 3,14)",
      "Winkelsumme im Dreieck = 180°",
    ],
    questions: [
      {
        id: 401, type: "input", part: "A", points: 1,
        q: "Ein Rechteck ist 8 cm lang und 5 cm breit. Wie groß ist die <b>Fläche</b>?",
        answer: 40, unit: "cm²",
        tip: "Fläche vom Rechteck = Länge mal Breite.",
        steps: ["A = a &middot; b = 8 cm &middot; 5 cm = 40 cm²."],
        deep:
          "Die Fläche sagt, wie viel Platz innen ist. Beim Rechteck multiplizierst du " +
          "Länge mal Breite: 8 &middot; 5 = 40. Einheit: cm mal cm = cm² (Quadratzentimeter). " +
          "Stell dir 8 Reihen mit je 5 kleinen 1-cm-Kästchen vor = 40 Kästchen.",
      },
      {
        id: 402, type: "input", part: "B", points: 2,
        q: "Ein Kreis hat den Radius r = 5 cm. Berechne die <b>Fläche</b> (mit π ≈ 3,14).",
        answer: 78.5, unit: "cm²",
        tip: "A = π · r². Erst r quadrieren, dann mal π.",
        steps: ["A = π &middot; r² = 3,14 &middot; 5².", "= 3,14 &middot; 25.", "= 78,5 cm²."],
        deep:
          "Reihenfolge ist wichtig: erst r² (also 5&middot;5 = 25), DANN mal π. Häufiger " +
          "Fehler: (π&middot;r) erst und dann quadrieren – falsch! Richtig: " +
          "A = 3,14 &middot; 25 = 78,5 cm². Der Radius ist der Abstand vom Mittelpunkt zum " +
          "Rand (halber Durchmesser).",
      },
      {
        id: 403, type: "input", part: "A", points: 1,
        q: "Ein Quader hat die Maße 3 cm &middot; 4 cm &middot; 5 cm. Wie groß ist das <b>Volumen</b>?",
        answer: 60, unit: "cm³",
        tip: "Volumen vom Quader = Länge · Breite · Höhe.",
        steps: ["V = 3 &middot; 4 &middot; 5 = 60 cm³."],
        deep:
          "Volumen ist der Rauminhalt – wie viel passt hinein. Beim Quader multiplizierst " +
          "du alle drei Kantenlängen: 3 &middot; 4 &middot; 5 = 60. Einheit: cm&middot;cm&middot;cm = " +
          "cm³ (Kubikzentimeter). Reihenfolge egal, das Ergebnis ist immer gleich.",
      },
      {
        id: 404, type: "input", part: "A", points: 2,
        q: "Ein Würfel hat die Kantenlänge 4 cm. Wie groß ist seine <b>Oberfläche</b>?",
        answer: 96, unit: "cm²",
        tip: "Ein Würfel hat 6 gleiche quadratische Flächen.",
        steps: ["Eine Fläche: 4 &middot; 4 = 16 cm².", "6 Flächen: 6 &middot; 16 = 96 cm²."],
        deep:
          "Ein Würfel hat 6 gleich große quadratische Seiten (wie ein Spielwürfel). Eine " +
          "Seite hat die Fläche 4&middot;4 = 16 cm². Da es 6 davon gibt, mal 6: 96 cm². " +
          "Oberfläche heißt „alles außen zusammen“ – nicht zu verwechseln mit dem Volumen " +
          "(das wäre 4³ = 64 cm³).",
      },
      {
        id: 405, type: "input", part: "A", points: 2,
        q: "Rechtwinkliges Dreieck mit den Katheten 3 cm und 4 cm. Wie lang ist die <b>Hypotenuse</b> c?",
        answer: 5, unit: "cm",
        tip: "Pythagoras: a² + b² = c². Am Ende die Wurzel ziehen!",
        steps: ["c² = a² + b² = 3² + 4² = 9 + 16 = 25.", "c = √25 = 5 cm."],
        deep:
          "Der Satz des Pythagoras gilt nur im rechtwinkligen Dreieck. Die zwei kurzen " +
          "Seiten (Katheten) ins Quadrat und addieren: 3² + 4² = 9 + 16 = 25. Das Ergebnis " +
          "ist c² – also musst du am Ende noch die Wurzel ziehen: c = √25 = 5 cm. Das " +
          "3-4-5-Dreieck ist ein Klassiker.",
      },
      {
        id: 406, type: "input", part: "A", points: 2,
        q: "Rechtwinkliges Dreieck: Hypotenuse c = 13 cm, eine Kathete = 5 cm. Wie lang ist die <b>andere Kathete</b>?",
        answer: 12, unit: "cm",
        tip: "Hier ist eine Kathete gesucht: b² = c² − a².",
        steps: ["b² = c² − a² = 13² − 5² = 169 − 25 = 144.", "b = √144 = 12 cm."],
        deep:
          "Wenn die Hypotenuse (längste Seite) gegeben ist und eine Kathete gesucht wird, " +
          "musst du UMSTELLEN: aus a² + b² = c² wird b² = c² − a² (minus statt plus). " +
          "Also 13² − 5² = 169 − 25 = 144, dann Wurzel: b = 12 cm. Faustregel: längste " +
          "Seite quadrieren und die bekannte Kathete abziehen.",
      },
      {
        id: 407, type: "input", part: "A", points: 2,
        q: "Ein Dreieck hat die Grundseite g = 10 cm und die Höhe h = 6 cm. Wie groß ist die <b>Fläche</b>?",
        answer: 30, unit: "cm²",
        tip: "Dreiecksfläche = ½ · Grundseite · Höhe.",
        steps: ["A = ½ &middot; g &middot; h.", "= ½ &middot; 10 &middot; 6 = ½ &middot; 60 = 30 cm²."],
        deep:
          "Ein Dreieck ist quasi ein halbes Rechteck. Deshalb: Grundseite mal Höhe und das " +
          "Ganze halbieren. 10 &middot; 6 = 60, davon die Hälfte = 30 cm². Wichtig: die Höhe " +
          "steht senkrecht auf der Grundseite – nicht die schräge Seite verwenden.",
      },
      {
        id: 408, type: "input", part: "B", points: 2,
        q: "Ein Zylinder hat den Radius r = 2 cm und die Höhe h = 10 cm. Berechne das <b>Volumen</b> (mit π ≈ 3,14).",
        answer: 125.6, unit: "cm³",
        tip: "V = π · r² · h.",
        steps: [
          "V = π &middot; r² &middot; h = 3,14 &middot; 2² &middot; 10.",
          "= 3,14 &middot; 4 &middot; 10.",
          "= 125,6 cm³.",
        ],
        deep:
          "Ein Zylinder (z.B. eine Dose) ist ein Kreis, der in die Höhe gezogen wird. Du " +
          "rechnest zuerst die Grundfläche (Kreis: π&middot;r² = 3,14&middot;4 = 12,56 cm²) und " +
          "multiplizierst sie mit der Höhe: 12,56 &middot; 10 = 125,6 cm³. Auch hier: erst " +
          "r² (= 4), nicht (π&middot;r)².",
      },
      {
        id: 409, type: "input", part: "B", points: 2,
        q: "Ein Kreis hat den Radius r = 7 cm. Berechne den <b>Umfang</b> (mit π ≈ 3,14).",
        answer: 43.96, unit: "cm",
        tip: "Umfang = 2 · π · r.",
        steps: ["U = 2 &middot; π &middot; r = 2 &middot; 3,14 &middot; 7.", "= 6,28 &middot; 7 = 43,96 cm."],
        deep:
          "Der Umfang ist die Länge der Kreislinie (einmal außen herum). Formel: " +
          "U = 2&middot;π&middot;r. Pass auf den Unterschied auf: Umfang braucht r hoch 1 (nur " +
          "mal 2π), die FLÄCHE bräuchte r². Hier: 2 &middot; 3,14 &middot; 7 = 43,96 cm.",
      },
      {
        id: 410, type: "mc", part: "A", points: 1,
        q: "Wie groß ist die <b>Winkelsumme</b> in einem Dreieck?",
        options: ["180°", "360°", "90°", "270°"],
        answer: "180°",
        tip: "Egal welche Form das Dreieck hat – die Summe ist immer gleich.",
        steps: ["Die drei Innenwinkel eines Dreiecks ergeben zusammen immer 180°."],
        deep:
          "In jedem Dreieck – egal ob spitz, stumpf oder rechtwinklig – ergeben die drei " +
          "Innenwinkel zusammen 180°. Das hilft oft: Wenn zwei Winkel bekannt sind (z.B. " +
          "90° und 60°), ist der dritte 180 − 90 − 60 = 30°. (Im Viereck wären es 360°.)",
      },
      {
        id: 411, type: "input", part: "A", points: 1,
        q: "Ein Rechteck ist 8 cm lang und 5 cm breit. Wie groß ist der <b>Umfang</b>?",
        answer: 26, unit: "cm",
        tip: "Umfang = 2 · (Länge + Breite).",
        steps: ["U = 2 &middot; (8 + 5) = 2 &middot; 13 = 26 cm."],
        deep:
          "Der Umfang ist der Weg einmal außen herum. Ein Rechteck hat zwei lange und zwei " +
          "kurze Seiten: 8 + 5 + 8 + 5 = 26 cm. Kürzer: 2&middot;(8 + 5) = 26 cm. Nicht mit " +
          "der Fläche verwechseln (die wäre 8&middot;5 = 40 cm²).",
      },
      {
        id: 412, type: "input", part: "A", points: 1,
        q: "Ein Quadrat hat die Seitenlänge 6 cm. Wie groß ist die <b>Fläche</b>?",
        answer: 36, unit: "cm²",
        tip: "Quadratfläche = Seite · Seite.",
        steps: ["A = a² = 6 &middot; 6 = 36 cm²."],
        deep:
          "Beim Quadrat sind alle Seiten gleich lang, also Fläche = Seite mal Seite = " +
          "6&middot;6 = 36 cm². Das ist dasselbe wie 6² (sechs hoch zwei) – daher der Name " +
          "„Quadratzahl“.",
      },
      {
        id: 413, type: "input", part: "A", points: 1,
        q: "Ein Quadrat hat die Seitenlänge 6 cm. Wie groß ist der <b>Umfang</b>?",
        answer: 24, unit: "cm",
        tip: "Vier gleiche Seiten: U = 4 · a.",
        steps: ["U = 4 &middot; 6 = 24 cm."],
        deep:
          "Ein Quadrat hat vier gleich lange Seiten. Einmal außen herum = 4 mal die " +
          "Seitenlänge: 4&middot;6 = 24 cm.",
      },
      {
        id: 414, type: "input", part: "A", points: 1,
        q: "Ein Würfel hat die Kantenlänge 3 cm. Wie groß ist das <b>Volumen</b>?",
        answer: 27, unit: "cm³",
        tip: "Würfelvolumen = a · a · a = a³.",
        steps: ["V = 3³ = 3 &middot; 3 &middot; 3 = 27 cm³."],
        deep:
          "Beim Würfel sind alle Kanten gleich, also Volumen = Kante hoch drei: " +
          "3&middot;3&middot;3 = 27 cm³. Das „hoch drei“ heißt Kubik – deshalb cm³.",
      },
      {
        id: 415, type: "input", part: "A", points: 1,
        q: "Ein Dreieck hat die Grundseite 8 cm und die Höhe 5 cm. Wie groß ist die <b>Fläche</b>?",
        answer: 20, unit: "cm²",
        tip: "A = ½ · g · h.",
        steps: ["A = ½ &middot; 8 &middot; 5 = ½ &middot; 40 = 20 cm²."],
        deep:
          "Grundseite mal Höhe, geteilt durch 2: 8&middot;5 = 40, halbiert = 20 cm². Tipp: " +
          "Du kannst auch erst halbieren (z.B. 8 &divide; 2 = 4) und dann mal die Höhe: " +
          "4 &middot; 5 = 20 – manchmal einfacher im Kopf.",
      },
      {
        id: 416, type: "input", part: "A", points: 2,
        q: "Rechtwinkliges Dreieck mit den Katheten 6 cm und 8 cm. Wie lang ist die <b>Hypotenuse</b>?",
        answer: 10, unit: "cm",
        tip: "a² + b² = c², dann Wurzel.",
        steps: ["c² = 6² + 8² = 36 + 64 = 100.", "c = √100 = 10 cm."],
        deep:
          "Katheten quadrieren und addieren: 6² + 8² = 36 + 64 = 100 = c². Wurzel ziehen: " +
          "c = 10 cm. Das ist das 6-8-10-Dreieck – einfach das 3-4-5-Dreieck verdoppelt.",
      },
      {
        id: 417, type: "input", part: "B", points: 2,
        q: "Ein Kreis hat den Radius r = 10 cm. Berechne die <b>Fläche</b> (mit π ≈ 3,14).",
        answer: 314, unit: "cm²",
        tip: "A = π · r².",
        steps: ["A = 3,14 &middot; 10² = 3,14 &middot; 100 = 314 cm²."],
        deep:
          "Erst r²: 10&middot;10 = 100. Dann mal π: 3,14 &middot; 100 = 314 cm². Das Mal-100 " +
          "verschiebt das Komma einfach zwei Stellen nach rechts – darum so eine glatte " +
          "Zahl.",
      },
      {
        id: 418, type: "input", part: "B", points: 2,
        q: "Ein Kreis hat den Durchmesser d = 10 cm. Berechne den <b>Umfang</b> (mit π ≈ 3,14).",
        answer: 31.4, unit: "cm",
        tip: "Mit dem Durchmesser: U = π · d.",
        steps: ["U = π &middot; d = 3,14 &middot; 10 = 31,4 cm."],
        deep:
          "Wenn der Durchmesser d gegeben ist (nicht der Radius), ist es sogar einfacher: " +
          "U = π &middot; d = 3,14 &middot; 10 = 31,4 cm. (Der Durchmesser ist doppelt so lang wie " +
          "der Radius, deshalb U = 2&middot;π&middot;r = π&middot;d – beides dasselbe.)",
      },
      {
        id: 419, type: "input", part: "A", points: 1,
        q: "Ein Quader hat die Maße 5 cm &middot; 2 cm &middot; 3 cm. Wie groß ist das <b>Volumen</b>?",
        answer: 30, unit: "cm³",
        tip: "Alle drei Kanten multiplizieren.",
        steps: ["V = 5 &middot; 2 &middot; 3 = 30 cm³."],
        deep:
          "Länge mal Breite mal Höhe: 5&middot;2&middot;3 = 30 cm³. Du kannst in beliebiger " +
          "Reihenfolge rechnen, z.B. erst 5&middot;2 = 10, dann &middot;3 = 30.",
      },
      {
        id: 420, type: "input", part: "B", points: 2,
        q: "Ein Zylinder hat den Radius r = 3 cm und die Höhe h = 10 cm. Berechne das <b>Volumen</b> (mit π ≈ 3,14).",
        answer: 282.6, unit: "cm³",
        tip: "V = π · r² · h. Erst r² = 9.",
        steps: ["V = 3,14 &middot; 3² &middot; 10 = 3,14 &middot; 9 &middot; 10.", "= 282,6 cm³."],
        deep:
          "Erst die kreisförmige Grundfläche: π&middot;r² = 3,14&middot;9 = 28,26 cm². Dann mal " +
          "die Höhe: 28,26 &middot; 10 = 282,6 cm³. Denk dran: r² zuerst (3&middot;3 = 9), nicht " +
          "3&middot;2.",
      },
      {
        id: 421, type: "input", part: "A", points: 2,
        q: "Ein Würfel hat die Kantenlänge 5 cm. Wie groß ist die <b>Oberfläche</b>?",
        answer: 150, unit: "cm²",
        tip: "6 gleiche Quadrate: O = 6 · a².",
        steps: ["Eine Seite: 5² = 25 cm².", "6 Seiten: 6 &middot; 25 = 150 cm²."],
        deep:
          "Oberfläche = alle 6 Seitenflächen zusammen. Eine Seite ist ein Quadrat mit " +
          "5&middot;5 = 25 cm². Mal 6 ergibt 150 cm². (Das Volumen wäre dagegen 5³ = 125 cm³ " +
          "– nicht verwechseln: Oberfläche in cm², Volumen in cm³.)",
      },
      {
        id: 422, type: "input", part: "A", points: 2,
        q: "Rechtwinkliges Dreieck: Hypotenuse = 15 cm, eine Kathete = 9 cm. Wie lang ist die <b>andere Kathete</b>?",
        answer: 12, unit: "cm",
        tip: "Kathete gesucht: b² = c² − a².",
        steps: ["b² = 15² − 9² = 225 − 81 = 144.", "b = √144 = 12 cm."],
        deep:
          "Hypotenuse gegeben, Kathete gesucht → umstellen zu b² = c² − a². Also " +
          "15² − 9² = 225 − 81 = 144, Wurzel = 12 cm. Das 9-12-15-Dreieck ist das " +
          "3-4-5-Dreieck mal 3.",
      },
      {
        id: 423, type: "input", part: "B", points: 2,
        q: "Ein rechteckiger Garten ist 12 m lang und 8 m breit und soll eingezäunt werden. Wie viele <b>Meter Zaun</b> braucht man?",
        answer: 40, unit: "m",
        tip: "Zaun = Umfang = 2 · (Länge + Breite).",
        steps: ["U = 2 &middot; (12 + 8) = 2 &middot; 20 = 40 m."],
        deep:
          "Ein Zaun geht außen herum – das ist der Umfang, nicht die Fläche. " +
          "2&middot;(12 + 8) = 40 m. Wenn nach „Rasen säen“ oder „Fläche“ gefragt wäre, " +
          "müsstest du dagegen 12&middot;8 = 96 m² rechnen. Erst überlegen: außen herum " +
          "(Umfang) oder innen drin (Fläche)?",
      },
      {
        id: 424, type: "input", part: "A", points: 2,
        q: "Ein Rechteck hat die Fläche 30 cm² und die Länge 6 cm. Wie <b>breit</b> ist es?",
        answer: 5, unit: "cm",
        tip: "Aus A = a · b folgt b = A ÷ a.",
        steps: ["b = A &divide; a = 30 &divide; 6 = 5 cm."],
        deep:
          "Hier ist die Fläche gegeben und eine Seite gesucht – also rückwärts. Aus " +
          "Fläche = Länge &middot; Breite folgt Breite = Fläche &divide; Länge = 30 &divide; 6 = " +
          "5 cm. Probe: 6 &middot; 5 = 30 cm². ✔",
      },
    ],
  },

  /* ================================================================= */
  {
    id: "trigonometrie",
    name: "Trigonometrie (Sinus, Cosinus, Tangens)",
    emoji: "📏",
    intro:
      "Im rechtwinkligen Dreieck verbinden Sinus, Cosinus und Tangens Winkel und " +
      "Seiten. Eselsbrücke <b>SOHCAHTOA</b>: <b>S</b>in = <b>O</b>pposite/<b>H</b>ypotenuse, " +
      "<b>C</b>os = <b>A</b>nliegend/<b>H</b>ypotenuse, <b>T</b>an = <b>O</b>pposite/<b>A</b>nliegend. " +
      "Die <b>Hypotenuse</b> ist die längste Seite (gegenüber dem rechten Winkel).",
    formulas: [
      "sin(α) = Gegenkathete / Hypotenuse",
      "cos(α) = Ankathete / Hypotenuse",
      "tan(α) = Gegenkathete / Ankathete",
      "Gegenkathete = liegt dem Winkel α gegenüber",
      "Ankathete = liegt am Winkel α an (nicht die Hypotenuse)",
      "Taschenrechner: für Winkel-Berechnung sin⁻¹, cos⁻¹, tan⁻¹ (Modus DEG!)",
    ],
    questions: [
      {
        id: 501, type: "mc", part: "A", points: 1,
        q: "Welche Formel gilt für den <b>Sinus</b>?",
        options: [
          "sin(α) = Gegenkathete / Hypotenuse",
          "sin(α) = Ankathete / Hypotenuse",
          "sin(α) = Gegenkathete / Ankathete",
          "sin(α) = Hypotenuse / Gegenkathete",
        ],
        answer: "sin(α) = Gegenkathete / Hypotenuse",
        tip: "SOH: Sinus = Opposite (Gegenkathete) / Hypotenuse.",
        steps: ["Sinus = Gegenkathete geteilt durch Hypotenuse (SOH)."],
        deep:
          "SOHCAHTOA ist die Eselsbrücke. Das erste Päckchen SOH heißt: Sinus = " +
          "Opposite (= Gegenkathete, die Seite gegenüber dem Winkel) geteilt durch die " +
          "Hypotenuse (die längste Seite). Die Hypotenuse ist immer im Spiel bei Sinus " +
          "und Cosinus.",
      },
      {
        id: 502, type: "mc", part: "A", points: 1,
        q: "Welche Formel gilt für den <b>Tangens</b>?",
        options: [
          "tan(α) = Gegenkathete / Ankathete",
          "tan(α) = Ankathete / Gegenkathete",
          "tan(α) = Gegenkathete / Hypotenuse",
          "tan(α) = Ankathete / Hypotenuse",
        ],
        answer: "tan(α) = Gegenkathete / Ankathete",
        tip: "TOA: Tangens = Opposite / Adjacent (Gegen / Anliegend).",
        steps: ["Tangens = Gegenkathete geteilt durch Ankathete (TOA)."],
        deep:
          "Das letzte Päckchen TOA: Tangens = Opposite (Gegenkathete) durch Adjacent " +
          "(Ankathete). Beim Tangens kommt die Hypotenuse NICHT vor – nur die beiden " +
          "kurzen Seiten. Praktisch, wenn die Hypotenuse gar nicht gegeben ist.",
      },
      {
        id: 503, type: "input", part: "A", points: 2,
        q: "In einem rechtwinkligen Dreieck ist die Gegenkathete 4 cm und die Hypotenuse 8 cm lang. Berechne <b>sin(α)</b> (als Dezimalzahl).",
        answer: 0.5,
        tip: "sin = Gegenkathete / Hypotenuse.",
        steps: ["sin(α) = Gegenkathete / Hypotenuse = 4 / 8.", "= 0,5."],
        deep:
          "Du setzt einfach in die Sinus-Formel ein: Gegenkathete (4) geteilt durch " +
          "Hypotenuse (8) = 4/8 = 0,5. Der Sinus ist immer eine Zahl zwischen 0 und 1, " +
          "weil die Gegenkathete nie länger als die Hypotenuse sein kann.",
      },
      {
        id: 504, type: "input", part: "B", points: 1,
        q: "Berechne mit dem Taschenrechner: <b>sin(30°)</b> (als Dezimalzahl).",
        answer: 0.5,
        tip: "Achte darauf, dass dein Taschenrechner auf DEG (Grad) steht!",
        steps: ["Taschenrechner auf DEG stellen.", "sin(30°) = 0,5."],
        deep:
          "Beim Taschenrechner ist der wichtigste Punkt der Modus: Es muss DEG (Degree = " +
          "Grad) eingestellt sein, NICHT RAD. Steht da RAD, kommt Unsinn raus. sin(30°) = " +
          "0,5 ist ein Wert, den man sich gut merken kann.",
      },
      {
        id: 505, type: "input", part: "B", points: 2,
        q: "Gegeben: cos(60°) = 0,5 und die Hypotenuse ist 10 cm. Wie lang ist die <b>Ankathete</b>?",
        answer: 5, unit: "cm",
        tip: "cos(α) = Ankathete / Hypotenuse → Ankathete = cos(α) · Hypotenuse.",
        steps: [
          "cos(α) = Ankathete / Hypotenuse.",
          "Ankathete = cos(60°) &middot; Hypotenuse = 0,5 &middot; 10.",
          "= 5 cm.",
        ],
        deep:
          "Die Formel cos = Ankathete / Hypotenuse stellst du nach der gesuchten Seite um: " +
          "Ankathete = cos(α) &middot; Hypotenuse. Mit cos(60°) = 0,5 und Hypotenuse 10 cm: " +
          "0,5 &middot; 10 = 5 cm. (Umstellen wie bei einer Bruchgleichung: mal Hypotenuse " +
          "auf beiden Seiten.)",
      },
      {
        id: 506, type: "input", part: "A", points: 2,
        q: "Ankathete = 6 cm, Hypotenuse = 10 cm. Berechne <b>cos(α)</b> (als Dezimalzahl).",
        answer: 0.6,
        tip: "cos = Ankathete / Hypotenuse.",
        steps: ["cos(α) = 6 / 10 = 0,6."],
        deep:
          "Cosinus = Ankathete (die am Winkel anliegende kurze Seite) geteilt durch die " +
          "Hypotenuse: 6/10 = 0,6. Auch der Cosinus liegt immer zwischen 0 und 1.",
      },
      {
        id: 507, type: "input", part: "B", points: 1,
        q: "Berechne <b>tan(45°)</b> (als Dezimalzahl).",
        answer: 1,
        tip: "Tippe tan(45) im DEG-Modus ein.",
        steps: ["tan(45°) = 1."],
        deep:
          "tan(45°) = 1 ist ein Spezialwert: Bei 45° sind Gegenkathete und Ankathete " +
          "gleich lang, und gleich geteilt durch gleich ergibt 1. Gut zum Merken.",
      },
      {
        id: 508, type: "input", part: "B", points: 2,
        q: "Es gilt <b>sin(α) = 0,5</b>. Wie groß ist der <b>Winkel α</b> (in Grad)?",
        answer: 30, unit: "°",
        tip: "Nutze die Umkehrtaste sin⁻¹ (oft 2nd/SHIFT + sin).",
        steps: ["α = sin⁻¹(0,5).", "α = 30°."],
        deep:
          "Wenn der Sinus-Wert bekannt ist und der WINKEL gesucht wird, brauchst du die " +
          "Umkehrfunktion sin⁻¹ (am Taschenrechner meist mit SHIFT oder 2nd + sin). " +
          "sin⁻¹(0,5) = 30°. Auch hier muss der Rechner auf DEG stehen.",
      },
      {
        id: 509, type: "input", part: "B", points: 2,
        q: "Gegenkathete = 5 cm, Ankathete = 5 cm. Wie groß ist der <b>Winkel α</b> (in Grad)?",
        answer: 45, unit: "°",
        tip: "Erst tan(α) berechnen, dann tan⁻¹ nutzen.",
        steps: ["tan(α) = Gegen / Ank = 5/5 = 1.", "α = tan⁻¹(1) = 45°."],
        deep:
          "Du kennst beide Katheten, also nimmst du den Tangens (der braucht keine " +
          "Hypotenuse): tan(α) = 5/5 = 1. Jetzt den Winkel: α = tan⁻¹(1) = 45°. Logisch, " +
          "denn wenn beide Katheten gleich lang sind, ist das Dreieck symmetrisch → 45°.",
      },
      {
        id: 510, type: "input", part: "B", points: 3,
        q: "Gegenkathete = 6 cm und sin(30°) = 0,5. Wie lang ist die <b>Hypotenuse</b>?",
        answer: 12, unit: "cm",
        tip: "sin = Gegen / Hyp → Hyp = Gegen / sin(α).",
        steps: [
          "sin(α) = Gegenkathete / Hypotenuse.",
          "Hypotenuse = Gegenkathete / sin(α) = 6 / 0,5.",
          "= 12 cm.",
        ],
        deep:
          "Diesmal steht die gesuchte Größe (Hypotenuse) im NENNER der Formel. Beim " +
          "Umstellen tauschen Hypotenuse und sin(α) die Plätze: Hyp = Gegen &divide; sin(α) " +
          "= 6 &divide; 0,5 = 12 cm. (Geteilt durch 0,5 ist dasselbe wie mal 2.)",
      },
      {
        id: 511, type: "mc", part: "A", points: 1,
        q: "Welche Formel gilt für den <b>Cosinus</b>?",
        options: [
          "cos(α) = Ankathete / Hypotenuse",
          "cos(α) = Gegenkathete / Hypotenuse",
          "cos(α) = Gegenkathete / Ankathete",
          "cos(α) = Hypotenuse / Ankathete",
        ],
        answer: "cos(α) = Ankathete / Hypotenuse",
        tip: "CAH: Cosinus = Adjacent (Ankathete) / Hypotenuse.",
        steps: ["Cosinus = Ankathete geteilt durch Hypotenuse (CAH)."],
        deep:
          "Das mittlere Päckchen CAH: Cosinus = Adjacent (Ankathete) durch Hypotenuse. " +
          "Der Unterschied zum Sinus ist nur, ob die Seite am Winkel ANLIEGT (Cosinus) " +
          "oder ihm GEGENÜBER liegt (Sinus).",
      },
      {
        id: 512, type: "input", part: "B", points: 1,
        q: "Berechne <b>cos(60°)</b> (als Dezimalzahl).",
        answer: 0.5,
        tip: "Taschenrechner im DEG-Modus.",
        steps: ["cos(60°) = 0,5."],
        deep:
          "cos(60°) = 0,5 ist wieder ein nützlicher Merkwert. (Interessant: sin(30°) ist " +
          "auch 0,5 – das ist kein Zufall, sondern liegt an der Symmetrie im Dreieck.)",
      },
      {
        id: 513, type: "input", part: "A", points: 2,
        q: "Gegenkathete = 3 cm, Ankathete = 4 cm. Berechne <b>tan(α)</b> (als Dezimalzahl).",
        answer: 0.75,
        tip: "tan = Gegenkathete / Ankathete.",
        steps: ["tan(α) = 3 / 4 = 0,75."],
        deep:
          "Tangens braucht nur die beiden Katheten: Gegenkathete (3) geteilt durch " +
          "Ankathete (4) = 3/4 = 0,75. Anders als Sinus/Cosinus kann der Tangens auch " +
          "größer als 1 werden (wenn die Gegenkathete länger ist als die Ankathete).",
      },
    ],
  },

  /* ================================================================= */
  {
    id: "stochastik",
    name: "Wahrscheinlichkeit & Statistik",
    emoji: "🎲",
    intro:
      "Eine <b>Wahrscheinlichkeit</b> sagt, wie wahrscheinlich etwas passiert – " +
      "immer zwischen 0 (nie) und 1 (immer). Formel: <b>günstige ÷ alle</b> Möglichkeiten. " +
      "Bei <b>Statistik</b> beschreibst du Datenreihen mit Mittelwert, Median und Spannweite.",
    formulas: [
      "Wahrscheinlichkeit P = günstige Fälle / alle Fälle",
      "P liegt immer zwischen 0 und 1",
      "Mittelwert = Summe aller Werte / Anzahl der Werte",
      "Median = mittlerer Wert (Daten erst der Größe nach ordnen!)",
      "Spannweite = größter Wert − kleinster Wert",
      "mehrstufig (UND): Wahrscheinlichkeiten entlang des Astes multiplizieren",
    ],
    questions: [
      {
        id: 601, type: "mc", part: "A", points: 1,
        q: "Du würfelst mit einem normalen Würfel. Wie groß ist die Wahrscheinlichkeit für eine <b>6</b>?",
        options: ["1/6", "1/2", "1/3", "6"],
        answer: "1/6",
        tip: "günstige Fälle ÷ alle Fälle.",
        steps: ["Günstig: eine 6 → 1.", "Alle: 6 Zahlen → 6.", "P = 1/6."],
        deep:
          "Ein Würfel hat 6 gleich wahrscheinliche Seiten. Du willst genau eine davon " +
          "(die 6) – das ist 1 günstiger Fall von 6 möglichen, also P = 1/6. Die " +
          "Grundformel ist immer: günstige Fälle geteilt durch alle Fälle.",
      },
      {
        id: 602, type: "input", part: "A", points: 1,
        q: "Berechne den <b>Mittelwert</b> von 4, 6, 8 und 10.",
        answer: 7,
        tip: "Alle addieren, dann durch die Anzahl teilen.",
        steps: ["Summe: 4 + 6 + 8 + 10 = 28.", "Anzahl: 4 Werte.", "Mittelwert = 28 / 4 = 7."],
        deep:
          "Der Mittelwert (Durchschnitt) ist: alles zusammenzählen und durch die Anzahl " +
          "der Werte teilen. Summe = 28, Anzahl = 4, also 28 &divide; 4 = 7. Achtung: durch " +
          "die ANZAHL teilen, nicht durch den größten Wert.",
      },
      {
        id: 603, type: "input", part: "A", points: 1,
        q: "Bestimme den <b>Median</b> von 3, 7 und 9.",
        answer: 7,
        tip: "Der Median ist der Wert genau in der Mitte (nach dem Ordnen).",
        steps: ["Daten geordnet: 3, 7, 9.", "Mittlerer Wert = 7."],
        deep:
          "Der Median teilt die geordnete Reihe in zwei Hälften. Erst der Größe nach " +
          "sortieren (3, 7, 9 ist schon sortiert), dann den mittleren Wert nehmen: 7. " +
          "Bei einer geraden Anzahl von Werten nimmt man den Mittelwert der beiden " +
          "mittleren.",
      },
      {
        id: 604, type: "mc", part: "B", points: 2,
        q: "Du wirfst eine Münze <b>zweimal</b>. Wie groß ist die Wahrscheinlichkeit für <b>zweimal Kopf</b>?",
        options: ["1/4", "1/2", "1/3", "2"],
        answer: "1/4",
        tip: "Bei UND-Ereignissen multiplizierst du die Wahrscheinlichkeiten.",
        steps: ["P(Kopf) = 1/2 pro Wurf.", "Zweimal Kopf: 1/2 &middot; 1/2 = 1/4."],
        deep:
          "Bei mehreren Würfen hintereinander, bei denen ALLES klappen muss (Kopf UND " +
          "wieder Kopf), multiplizierst du die Einzelwahrscheinlichkeiten: " +
          "1/2 &middot; 1/2 = 1/4. Anschaulich: Mögliche Ergebnisse sind KK, KZ, ZK, ZZ – " +
          "vier Stück, und nur eins davon ist „zweimal Kopf“, also 1/4.",
      },
      {
        id: 605, type: "mc", part: "A", points: 2,
        q: "In einer Urne sind 3 rote und 7 blaue Kugeln. Wie groß ist die Wahrscheinlichkeit, eine <b>rote</b> zu ziehen?",
        options: ["3/10", "7/10", "1/3", "3/7"],
        answer: "3/10",
        tip: "günstige (rote) ÷ alle Kugeln.",
        steps: ["Rote Kugeln: 3.", "Alle Kugeln: 3 + 7 = 10.", "P(rot) = 3/10."],
        deep:
          "Günstige Fälle sind die roten Kugeln (3). Alle Fälle sind ALLE Kugeln zusammen " +
          "(3 + 7 = 10) – nicht nur die blauen! P(rot) = 3/10. Häufiger Fehler: 3/7 " +
          "(rot durch blau) – falsch, es muss durch die Gesamtzahl geteilt werden.",
      },
      {
        id: 606, type: "input", part: "A", points: 1,
        q: "Berechne die <b>Spannweite</b> von 5, 12, 8 und 20.",
        answer: 15,
        tip: "Spannweite = größter − kleinster Wert.",
        steps: ["Größter Wert: 20, kleinster Wert: 5.", "Spannweite = 20 − 5 = 15."],
        deep:
          "Die Spannweite zeigt, wie weit die Werte auseinander liegen: einfach den " +
          "größten minus den kleinsten Wert. Hier 20 − 5 = 15. Die Werte dazwischen sind " +
          "dafür egal.",
      },
      {
        id: 607, type: "input", part: "A", points: 2,
        q: "Berechne den <b>Mittelwert</b> von 2, 2, 5, 7 und 9.",
        answer: 5,
        tip: "Summe durch Anzahl (hier 5 Werte).",
        steps: ["Summe: 2 + 2 + 5 + 7 + 9 = 25.", "Mittelwert = 25 / 5 = 5."],
        deep:
          "Auch wenn Werte doppelt vorkommen (die 2 zweimal), zählst du sie ganz normal " +
          "mit. Summe = 25, Anzahl = 5 Werte, Mittelwert = 25 &divide; 5 = 5.",
      },
      {
        id: 608, type: "mc", part: "A", points: 1,
        q: "Zwischen welchen Werten liegt eine Wahrscheinlichkeit <b>immer</b>?",
        options: ["zwischen 0 und 1", "zwischen −1 und 1", "zwischen 0 und 100", "zwischen 1 und 6"],
        answer: "zwischen 0 und 1",
        tip: "0 = unmöglich, 1 = sicher.",
        steps: [
          "Kleiner als 0 (unmöglich) geht nicht.",
          "Größer als 1 (sicher) geht nicht.",
          "Also immer zwischen 0 und 1.",
        ],
        deep:
          "Eine Wahrscheinlichkeit von 0 heißt: passiert nie. 1 heißt: passiert sicher. " +
          "Alles dazwischen sind die „Vielleicht“-Fälle. Negativ oder größer als 1 ergibt " +
          "keinen Sinn. Als Prozent wäre das 0 % bis 100 %.",
      },
      {
        id: 609, type: "input", part: "A", points: 1,
        q: "Berechne den <b>Mittelwert</b> von 10, 20 und 30.",
        answer: 20,
        tip: "Summe ÷ Anzahl.",
        steps: ["Summe: 10 + 20 + 30 = 60.", "Mittelwert = 60 / 3 = 20."],
        deep:
          "Zusammenzählen: 60. Durch die Anzahl (3 Werte) teilen: 60 &divide; 3 = 20. Bei " +
          "gleichmäßig verteilten Werten liegt der Mittelwert genau in der Mitte.",
      },
      {
        id: 610, type: "input", part: "A", points: 1,
        q: "Bestimme den <b>Median</b> von 2, 4, 6, 8 und 10.",
        answer: 6,
        tip: "Mittlerer Wert der geordneten Reihe.",
        steps: ["Geordnet: 2, 4, 6, 8, 10.", "Mittlerer (3.) Wert = 6."],
        deep:
          "Bei 5 Werten ist der mittlere der 3. Wert. Geordnet (2, 4, 6, 8, 10) steht in " +
          "der Mitte die 6 – zwei Werte links, zwei rechts. Der Median ist robust gegen " +
          "„Ausreißer“ und oft aussagekräftiger als der Mittelwert.",
      },
      {
        id: 611, type: "mc", part: "A", points: 1,
        q: "Du würfelst. Wie groß ist die Wahrscheinlichkeit für eine <b>gerade Zahl</b>?",
        options: ["1/2", "1/3", "1/6", "2/3"],
        answer: "1/2",
        tip: "Welche Zahlen sind gerade? Wie viele von 6?",
        steps: ["Gerade Zahlen: 2, 4, 6 → 3 Stück.", "P = 3/6 = 1/2."],
        deep:
          "Gerade Augenzahlen sind 2, 4 und 6 – das sind 3 von 6 möglichen. P = 3/6, und " +
          "das kürzt sich zu 1/2. Genau die Hälfte aller Würfelzahlen ist gerade.",
      },
      {
        id: 612, type: "input", part: "A", points: 1,
        q: "Berechne die <b>Spannweite</b> von 3, 9 und 15.",
        answer: 12,
        tip: "Größter minus kleinster Wert.",
        steps: ["15 − 3 = 12."],
        deep:
          "Spannweite = größter Wert (15) minus kleinster Wert (3) = 12. Sie misst, wie " +
          "breit die Daten gestreut sind.",
      },
      {
        id: 613, type: "mc", part: "A", points: 2,
        q: "Ein Glücksrad hat 8 gleich große Felder, 2 davon sind rot. Wie groß ist <b>P(rot)</b>?",
        options: ["1/4", "1/8", "3/4", "2/6"],
        answer: "1/4",
        tip: "günstige (rote) ÷ alle Felder, dann kürzen.",
        steps: ["P(rot) = 2/8.", "Kürzen mit 2: 2/8 = 1/4."],
        deep:
          "2 rote Felder von 8 insgesamt → P = 2/8. Brüche bei Wahrscheinlichkeiten kürzt " +
          "man, wenn möglich: 2/8 = 1/4. Also landet das Rad in einem von vier Fällen auf " +
          "Rot.",
      },
      {
        id: 614, type: "mc", part: "B", points: 2,
        q: "Du wirfst eine Münze <b>dreimal</b>. Wie groß ist die Wahrscheinlichkeit für <b>dreimal Kopf</b>?",
        options: ["1/8", "1/4", "1/6", "3/8"],
        answer: "1/8",
        tip: "1/2 für jeden Wurf, alle multiplizieren.",
        steps: ["1/2 &middot; 1/2 &middot; 1/2 = 1/8."],
        deep:
          "Drei Würfe, alle müssen Kopf zeigen → drei Mal 1/2 multiplizieren: " +
          "1/2 &middot; 1/2 &middot; 1/2 = 1/8. Es gibt insgesamt 2&middot;2&middot;2 = 8 mögliche " +
          "Ergebnisfolgen, und nur eine davon ist KKK.",
      },
      {
        id: 615, type: "input", part: "A", points: 2,
        q: "Berechne den <b>Mittelwert</b> von 12, 15, 9, 16 und 8.",
        answer: 12,
        tip: "Alle addieren, durch 5 teilen.",
        steps: ["Summe: 12 + 15 + 9 + 16 + 8 = 60.", "Mittelwert = 60 / 5 = 12."],
        deep:
          "Erst sauber zusammenzählen: 12 + 15 = 27, + 9 = 36, + 16 = 52, + 8 = 60. Dann " +
          "durch die Anzahl (5) teilen: 60 &divide; 5 = 12.",
      },
      {
        id: 616, type: "mc", part: "B", points: 2,
        q: "Du wirfst <b>zwei Würfel</b>. Wie groß ist die Wahrscheinlichkeit, mit <b>beiden eine 6</b> zu würfeln?",
        options: ["1/36", "1/12", "1/6", "2/6"],
        answer: "1/36",
        tip: "Pro Würfel 1/6, beide multiplizieren.",
        steps: ["P(6) = 1/6 pro Würfel.", "Beide: 1/6 &middot; 1/6 = 1/36."],
        deep:
          "Jeder Würfel zeigt mit 1/6 eine 6. Damit BEIDE gleichzeitig 6 zeigen, " +
          "multiplizierst du: 1/6 &middot; 1/6 = 1/36. Es gibt 6&middot;6 = 36 mögliche " +
          "Kombinationen, und nur eine ist (6, 6).",
      },
      {
        id: 617, type: "input", part: "B", points: 2,
        q: "In einer Klasse mit 25 Schülern ergibt die Summe aller Mathenoten 75. Wie hoch ist der <b>Notendurchschnitt</b>?",
        answer: 3,
        tip: "Durchschnitt = Summe ÷ Anzahl.",
        steps: ["75 &divide; 25 = 3."],
        deep:
          "Der Durchschnitt ist die Summe geteilt durch die Anzahl. Hier brauchst du nicht " +
          "alle Einzelnoten – die Summe (75) und die Anzahl (25 Schüler) reichen: " +
          "75 &divide; 25 = 3. Der Notendurchschnitt ist 3,0.",
      },
      {
        id: 618, type: "mc", part: "A", points: 2,
        q: "Du würfelst einmal. Wie groß ist die Wahrscheinlichkeit, <b>keine 6</b> zu würfeln?",
        options: ["5/6", "1/6", "1/2", "4/6"],
        answer: "5/6",
        tip: "Wie viele Zahlen sind NICHT die 6?",
        steps: ["Keine 6 → 1, 2, 3, 4, 5 = 5 günstige Fälle.", "P = 5/6."],
        deep:
          "„Keine 6“ heißt: irgendeine der anderen fünf Zahlen (1–5). Das sind 5 günstige " +
          "von 6 möglichen, also 5/6. Trick: Gegenwahrscheinlichkeit = 1 − P(6) = " +
          "1 − 1/6 = 5/6. Alle Wahrscheinlichkeiten zusammen ergeben immer 1.",
      },
      {
        id: 619, type: "mc", part: "A", points: 2,
        q: "In einer Urne sind 4 rote und 6 grüne Kugeln. Wie groß ist <b>P(grün)</b>?",
        options: ["3/5", "2/5", "6/4", "4/10"],
        answer: "3/5",
        tip: "grüne ÷ alle, dann kürzen.",
        steps: ["P(grün) = 6/10.", "Kürzen mit 2: 6/10 = 3/5."],
        deep:
          "6 grüne von insgesamt 10 Kugeln (4 + 6) → P = 6/10. Gekürzt mit 2 ergibt 3/5. " +
          "Beide Schreibweisen sind richtig, aber gekürzt ist üblicher.",
      },
      {
        id: 620, type: "input", part: "A", points: 2,
        q: "Bestimme den <b>Median</b> von 5, 5, 5, 10 und 15.",
        answer: 5,
        tip: "Reihe ordnen, mittleren Wert nehmen.",
        steps: ["Geordnet: 5, 5, 5, 10, 15.", "Mittlerer (3.) Wert = 5."],
        deep:
          "Schon geordnet: 5, 5, 5, 10, 15. Der mittlere (3.) Wert ist 5 – das ist der " +
          "Median. Interessant: der Mittelwert wäre hier 8 (40 &divide; 5), also ganz anders. " +
          "Die hohen Werte (10, 15) ziehen den Mittelwert hoch, den Median aber nicht.",
      },
    ],
  },

  /* ================================================================= */
  {
    id: "sachaufgaben",
    name: "Sach- & Textaufgaben",
    emoji: "🧩",
    intro:
      "In Teil B kommen viele <b>Textaufgaben</b> aus dem Alltag. Trick: 1) Aufgabe " +
      "in Ruhe lesen, 2) aufschreiben was <b>gegeben</b> und was <b>gesucht</b> ist, " +
      "3) passenden Rechenweg wählen (oft Dreisatz, Prozent oder eine Formel), " +
      "4) mit Einheit antworten und kurz prüfen, ob das Ergebnis Sinn ergibt.",
    formulas: [
      "Geschwindigkeit = Strecke / Zeit",
      "Dreisatz: erst auf 1 Stück / 1 Einheit runter, dann hoch",
      "Maßstab 1 : n → 1 cm auf der Karte = n cm in echt",
      "Einheiten: 1 m = 100 cm, 1 km = 1000 m, 1 h = 60 min",
      "Sinnvoll runden und IMMER mit Einheit antworten",
    ],
    questions: [
      {
        id: 701, type: "input", part: "B", points: 2,
        q: "Ein Auto fährt <b>180 km in 2 Stunden</b>. Wie hoch ist die Durchschnittsgeschwindigkeit (in km/h)?",
        answer: 90, unit: "km/h",
        tip: "Geschwindigkeit = Strecke ÷ Zeit.",
        steps: ["v = Strecke / Zeit = 180 km / 2 h = 90 km/h."],
        deep:
          "km/h heißt „Kilometer pro Stunde“ – also wie viele km in EINER Stunde. Du " +
          "teilst die Strecke durch die Zeit: 180 &divide; 2 = 90 km/h. Das Wort „pro“ ist " +
          "ein Hinweis aufs Teilen.",
      },
      {
        id: 702, type: "input", part: "B", points: 2,
        q: "<b>3 kg Äpfel</b> kosten 4,50 €. Was kosten <b>5 kg</b> (in €)?",
        answer: 7.5, unit: "€",
        tip: "Dreisatz: erst Preis für 1 kg.",
        steps: ["1 kg: 4,50 € &divide; 3 = 1,50 €.", "5 kg: 1,50 € &middot; 5 = 7,50 €."],
        deep:
          "Klassischer Dreisatz. Erst runter auf 1 kg: 4,50 &divide; 3 = 1,50 €. Dann hoch " +
          "auf 5 kg: 1,50 &middot; 5 = 7,50 €. Der Zwischenschritt „pro 1 kg“ macht es " +
          "übersichtlich.",
      },
      {
        id: 703, type: "input", part: "B", points: 3,
        q: "Ein Zimmer ist <b>4 m × 5 m</b> groß und soll mit Teppich für <b>12 €/m²</b> ausgelegt werden. Wie teuer ist das (in €)?",
        answer: 240, unit: "€",
        tip: "Erst die Fläche, dann mal den Quadratmeterpreis.",
        steps: ["Fläche: 4 m &middot; 5 m = 20 m².", "Kosten: 20 &middot; 12 € = 240 €."],
        deep:
          "Zwei Schritte: 1) Wie groß ist der Boden? Fläche = 4 &middot; 5 = 20 m². " +
          "2) Was kostet das? Pro m² 12 €, also 20 &middot; 12 = 240 €. Das „/m²“ beim Preis " +
          "sagt dir: erst die Fläche in m² ausrechnen, dann multiplizieren.",
      },
      {
        id: 704, type: "input", part: "B", points: 2,
        q: "Ein Tank fasst <b>60 Liter</b> und ist zu <b>25 %</b> gefüllt. Wie viele Liter sind drin?",
        answer: 15, unit: "Liter",
        tip: "25 % von 60 = ein Viertel von 60.",
        steps: ["25 % = 0,25.", "60 &middot; 0,25 = 15 Liter.", "(25 % = ¼, und 60 &divide; 4 = 15.)"],
        deep:
          "25 % sind genau ein Viertel. Ein Viertel von 60 ist 60 &divide; 4 = 15 Liter. " +
          "Oder mit Kommazahl: 60 &middot; 0,25 = 15. Beides führt zum selben Ergebnis.",
      },
      {
        id: 705, type: "input", part: "B", points: 3,
        q: "Auf einer Karte im <b>Maßstab 1 : 1000</b> ist eine Strecke <b>5 cm</b> lang. Wie lang ist sie in Wirklichkeit (in Metern)?",
        answer: 50, unit: "m",
        tip: "1 : 1000 → jeder cm auf der Karte ist 1000 cm in echt.",
        steps: [
          "5 cm &middot; 1000 = 5000 cm in Wirklichkeit.",
          "5000 cm = 50 m (durch 100 teilen).",
        ],
        deep:
          "Maßstab 1 : 1000 heißt: 1 cm auf der Karte entspricht 1000 cm in echt. Also " +
          "5 cm &middot; 1000 = 5000 cm. Jetzt noch in Meter umrechnen: 100 cm = 1 m, also " +
          "5000 &divide; 100 = 50 m. Das Umrechnen der Einheit am Schluss wird oft vergessen!",
      },
      {
        id: 706, type: "input", part: "B", points: 2,
        q: "Ein Handwerker berechnet <b>40 € Anfahrt</b> plus <b>35 € pro Stunde</b>. Was kostet ein Einsatz von <b>3 Stunden</b> (in €)?",
        answer: 145, unit: "€",
        tip: "Anfahrt + (Stundensatz · Stunden).",
        steps: ["Arbeit: 35 € &middot; 3 = 105 €.", "Plus Anfahrt: 105 + 40 = 145 €."],
        deep:
          "Hier gibt es einen festen Teil (Anfahrt 40 €, fällt nur einmal an) und einen " +
          "veränderlichen Teil (35 € mal Stundenzahl). Erst die Arbeitszeit: 35 &middot; 3 = " +
          "105 €. Dann die Anfahrt addieren: 105 + 40 = 145 €. Punkt vor Strich – erst " +
          "mal, dann plus.",
      },
      {
        id: 707, type: "input", part: "B", points: 2,
        q: "Aus einem Hahn laufen <b>8 Liter pro Minute</b>. Wie lange dauert es, <b>200 Liter</b> zu füllen (in Minuten)?",
        answer: 25, unit: "min",
        tip: "Gesamtmenge ÷ Menge pro Minute.",
        steps: ["200 &divide; 8 = 25 Minuten."],
        deep:
          "Pro Minute kommen 8 Liter. Wie viele Minuten brauchst du für 200 Liter? Teile " +
          "die Gesamtmenge durch die Menge pro Minute: 200 &divide; 8 = 25 Minuten. Probe: " +
          "25 &middot; 8 = 200 Liter. ✔",
      },
      {
        id: 708, type: "input", part: "B", points: 2,
        q: "Ein Rezept für <b>4 Personen</b> braucht <b>600 g Mehl</b>. Wie viel Mehl für <b>6 Personen</b> (in g)?",
        answer: 900, unit: "g",
        tip: "Dreisatz: erst Mehl pro Person.",
        steps: ["1 Person: 600 g &divide; 4 = 150 g.", "6 Personen: 150 g &middot; 6 = 900 g."],
        deep:
          "Dreisatz übers „pro Person“: 600 &divide; 4 = 150 g pro Person, dann " +
          "150 &middot; 6 = 900 g für 6 Personen. Mehr Personen → mehr Mehl, das passt von " +
          "der Größenordnung.",
      },
      {
        id: 709, type: "input", part: "B", points: 2,
        q: "Eine Klasse sammelt <b>250 €</b> und möchte <b>15 %</b> davon spenden. Wie viel wird gespendet (in €)?",
        answer: 37.5, unit: "€",
        tip: "15 % von 250 = 0,15 · 250.",
        steps: ["250 &middot; 0,15 = 37,50 €."],
        deep:
          "Ein normaler Prozentwert: 15 % von 250 € = 0,15 &middot; 250 = 37,50 €. Im Kopf: " +
          "10 % von 250 = 25 €, 5 % = 12,50 €, zusammen 37,50 €.",
      },
      {
        id: 710, type: "input", part: "B", points: 2,
        q: "Ein Handy kostet <b>480 €</b> und wird in <b>12 gleichen Monatsraten</b> bezahlt. Wie hoch ist eine Rate (in €)?",
        answer: 40, unit: "€",
        tip: "Gesamtpreis ÷ Anzahl der Raten.",
        steps: ["480 &divide; 12 = 40 €."],
        deep:
          "Der Gesamtpreis wird gleichmäßig auf 12 Monate verteilt: 480 &divide; 12 = 40 € " +
          "pro Monat. Probe: 12 &middot; 40 = 480 €. ✔",
      },
      {
        id: 711, type: "mc", part: "B", points: 2,
        q: "Ein Zug fährt um <b>9:40 Uhr</b> ab und ist <b>2 Stunden 35 Minuten</b> unterwegs. Wann kommt er an?",
        options: ["12:15 Uhr", "11:15 Uhr", "12:05 Uhr", "12:35 Uhr"],
        answer: "12:15 Uhr",
        tip: "Erst die Stunden, dann die Minuten dazu (60 min = 1 h beachten).",
        steps: [
          "9:40 + 2 Stunden = 11:40 Uhr.",
          "11:40 + 35 min: 40 + 35 = 75 min = 1 h 15 min.",
          "11:40 + 35 min = 12:15 Uhr.",
        ],
        deep:
          "Bei Zeitrechnung getrennt vorgehen: erst die ganzen Stunden addieren (9:40 + 2 h " +
          "= 11:40). Dann die Minuten: 40 + 35 = 75 Minuten. Da 60 Minuten = 1 Stunde, " +
          "sind 75 min = 1 h 15 min. Also 11:40 + 35 min = 12:15 Uhr. Minuten nie über 60 " +
          "stehen lassen!",
      },
      {
        id: 712, type: "input", part: "B", points: 2,
        q: "Ein Eimer fasst <b>10 Liter</b>. Ein Hahn füllt <b>2,5 Liter pro Minute</b>. Wie lange dauert das Füllen (in Minuten)?",
        answer: 4, unit: "min",
        tip: "Menge ÷ Menge pro Minute.",
        steps: ["10 &divide; 2,5 = 4 Minuten."],
        deep:
          "10 Liter geteilt durch 2,5 Liter pro Minute = 4 Minuten. Falls dich das Teilen " +
          "durch eine Kommazahl stört: 2,5 passt 4-mal in 10 (2,5 + 2,5 + 2,5 + 2,5 = 10).",
      },
    ],
  },
];

/* 7-Tage-Lernplan für die letzte Woche vor der Prüfung */
const STUDY_PLAN = [
  { day: "Tag 1", topic: "bruch",         text: "Bruch-, Prozent- & Zinsrechnung. Das ist die Basis für fast alles. Übe, bis du die meisten Aufgaben schaffst." },
  { day: "Tag 2", topic: "algebra",       text: "Terme & Gleichungen. Gleichungen lösen kommt in JEDER Prüfung dran – auch im hilfsmittelfreien Teil A." },
  { day: "Tag 3", topic: "funktionen",    text: "Lineare & quadratische Funktionen. Steigung, y-Achsenabschnitt, Nullstellen, Parabeln." },
  { day: "Tag 4", topic: "geometrie",     text: "Flächen, Körper & Pythagoras. Formeln stehen in der Formelsammlung – übe vor allem das Einsetzen." },
  { day: "Tag 5", topic: "trigonometrie", text: "Trigonometrie. SOHCAHTOA auswendig. Taschenrechner auf DEG stellen!" },
  { day: "Tag 6", topic: "stochastik",    text: "Wahrscheinlichkeit & Statistik UND Sach-/Textaufgaben. Meist gut machbare Punkte – die nimmt man mit!" },
  { day: "Tag 7", topic: "__exam__",      text: "Komplette Probeklausur (Teil A + Teil B) unter echten Bedingungen. Danach früh ins Bett. Du schaffst das! 💪" },
];

/* Notenschlüssel (ungefähr, prozentbasiert – der genaue Schlüssel
   schwankt von Jahr zu Jahr leicht) */
const GRADE_SCALE = [
  { min: 87, grade: "1 (sehr gut)" },
  { min: 73, grade: "2 (gut)" },
  { min: 59, grade: "3 (befriedigend)" },
  { min: 45, grade: "4 (ausreichend)" },
  { min: 18, grade: "5 (mangelhaft)" },
  { min: 0,  grade: "6 (ungenügend)" },
];
