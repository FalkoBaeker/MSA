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
     tip:       kurzer Tipp, der VOR der Lösung angezeigt werden kann
     steps:     [..]            Lösungsweg Schritt für Schritt
   }
   ===================================================================== */

const TOPICS = [
  /* ================================================================= */
  {
    id: "bruch",
    name: "Bruch- & Prozentrechnung",
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
    ],
    questions: [
      {
        id: 101, type: "mc",
        q: "Berechne: <b>3/4 + 1/8</b>",
        options: ["7/8", "4/12", "4/8", "1/2"],
        answer: "7/8",
        tip: "Beide Brüche brauchen denselben Nenner. 8 passt gut.",
        steps: [
          "Gemeinsamer Nenner ist 8.",
          "3/4 erweitern (oben und unten &middot; 2): 3/4 = 6/8.",
          "Jetzt addieren: 6/8 + 1/8 = 7/8.",
        ],
      },
      {
        id: 102, type: "mc",
        q: "Berechne: <b>2/3 &middot; 3/5</b>",
        options: ["2/5", "6/8", "5/8", "1/3"],
        answer: "2/5",
        tip: "Beim Malnehmen einfach Zähler mal Zähler und Nenner mal Nenner.",
        steps: [
          "Zähler: 2 &middot; 3 = 6.",
          "Nenner: 3 &middot; 5 = 15.",
          "Ergebnis 6/15, kürzen mit 3: 6/15 = 2/5.",
        ],
      },
      {
        id: 103, type: "input",
        q: "Wie viel sind <b>15 % von 240</b>?",
        answer: 36,
        tip: "15 % = 0,15. „von“ heißt mal.",
        steps: [
          "15 % als Kommazahl: 15 &divide; 100 = 0,15.",
          "240 &middot; 0,15 = 36.",
        ],
      },
      {
        id: 104, type: "input",
        q: "Ein Pulli kostet <b>80 €</b> und wird um <b>25 % reduziert</b>. Was ist der neue Preis (in €)?",
        answer: 60, unit: "€",
        tip: "Wenn 25 % weg sind, bleiben 75 % übrig.",
        steps: [
          "25 % Rabatt → es bleiben 100 % − 25 % = 75 % = 0,75.",
          "80 € &middot; 0,75 = 60 €.",
          "(Oder: 25 % von 80 = 20 €. 80 − 20 = 60 €.)",
        ],
      },
      {
        id: 105, type: "input",
        q: "<b>45</b> sind wie viel <b>Prozent von 180</b>?",
        answer: 25, unit: "%",
        tip: "Prozentsatz = Teil ÷ Ganzes.",
        steps: [
          "45 &divide; 180 = 0,25.",
          "0,25 = 25 %.",
        ],
      },
      {
        id: 106, type: "input",
        q: "<b>30 %</b> eines Geldbetrags sind <b>60 €</b>. Wie groß ist der ganze Betrag (in €)?",
        answer: 200, unit: "€",
        tip: "Hier ist der Grundwert (das Ganze) gesucht: Teil ÷ Prozentsatz.",
        steps: [
          "30 % = 0,30.",
          "Grundwert = 60 &divide; 0,30 = 200 €.",
        ],
      },
      {
        id: 107, type: "input",
        q: "Du legst <b>1500 €</b> für 1 Jahr zu <b>2 % Zinsen</b> an. Wie viel Zinsen bekommst du (in €)?",
        answer: 30, unit: "€",
        tip: "Zinsen = Kapital · Zinssatz.",
        steps: [
          "2 % = 0,02.",
          "1500 € &middot; 0,02 = 30 €.",
        ],
      },
      {
        id: 108, type: "mc",
        q: "Schreibe <b>0,75</b> als gekürzten Bruch.",
        options: ["3/4", "7/5", "2/3", "1/4"],
        answer: "3/4",
        tip: "0,75 = 75/100. Jetzt kürzen.",
        steps: [
          "0,75 = 75/100.",
          "Mit 25 kürzen: 75 &divide; 25 = 3, 100 &divide; 25 = 4.",
          "Ergebnis: 3/4.",
        ],
      },
      {
        id: 109, type: "input",
        q: "<b>Dreisatz:</b> 4 Brötchen kosten 1,40 €. Was kosten <b>7 Brötchen</b> (in €)?",
        answer: 2.45, unit: "€",
        tip: "Erst auf 1 Brötchen runterrechnen, dann auf 7 hoch.",
        steps: [
          "1 Brötchen: 1,40 € &divide; 4 = 0,35 €.",
          "7 Brötchen: 0,35 € &middot; 7 = 2,45 €.",
        ],
      },
      {
        id: 110, type: "input",
        q: "Eine Jacke kostet nach <b>20 % Rabatt</b> noch <b>96 €</b>. Wie hoch war der Originalpreis (in €)?",
        answer: 120, unit: "€",
        tip: "96 € entsprechen 80 % des Originalpreises.",
        steps: [
          "Nach 20 % Rabatt bleiben 80 % = 0,80.",
          "96 € sind also 0,80 vom Original.",
          "Original = 96 &divide; 0,80 = 120 €.",
        ],
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
        id: 201, type: "input",
        q: "Löse die Gleichung: <b>3x + 5 = 20</b>",
        answer: 5,
        tip: "Erst die +5 wegbekommen, dann durch 3 teilen.",
        steps: [
          "| −5 auf beiden Seiten: 3x = 15.",
          "| &divide;3: x = 5.",
        ],
      },
      {
        id: 202, type: "input",
        q: "Löse: <b>2x − 7 = 5x + 8</b>",
        answer: -5,
        tip: "Bring alle x auf eine Seite, alle Zahlen auf die andere.",
        steps: [
          "| −5x: 2x − 5x − 7 = 8 → −3x − 7 = 8.",
          "| +7: −3x = 15.",
          "| &divide;(−3): x = −5.",
        ],
      },
      {
        id: 203, type: "input",
        q: "Löse: <b>4 &middot; (x − 2) = 12</b>",
        answer: 5,
        tip: "Du kannst direkt durch 4 teilen oder zuerst die Klammer auflösen.",
        steps: [
          "| &divide;4: x − 2 = 3.",
          "| +2: x = 5.",
        ],
      },
      {
        id: 204, type: "mc",
        q: "Fasse zusammen: <b>3a + 2b − a + 4b</b>",
        options: ["2a + 6b", "3a + 8b", "2a + 4b", "4a + 6b"],
        answer: "2a + 6b",
        tip: "Nur gleiche Buchstaben darfst du zusammenrechnen.",
        steps: [
          "Die a: 3a − a = 2a.",
          "Die b: 2b + 4b = 6b.",
          "Zusammen: 2a + 6b.",
        ],
      },
      {
        id: 205, type: "mc",
        q: "Multipliziere die Klammer aus: <b>3 &middot; (2x + 4)</b>",
        options: ["6x + 12", "6x + 4", "5x + 7", "2x + 12"],
        answer: "6x + 12",
        tip: "Die 3 muss mit JEDEM Glied in der Klammer multipliziert werden.",
        steps: [
          "3 &middot; 2x = 6x.",
          "3 &middot; 4 = 12.",
          "Ergebnis: 6x + 12.",
        ],
      },
      {
        id: 206, type: "mc",
        q: "Wende die binomische Formel an: <b>(x + 3)<sup>2</sup></b>",
        options: ["x² + 6x + 9", "x² + 9", "x² + 3x + 9", "x² + 6x + 6"],
        answer: "x² + 6x + 9",
        tip: "1. binomische Formel: (a+b)² = a² + 2ab + b².",
        steps: [
          "a = x, b = 3.",
          "a² = x², &nbsp; 2ab = 2&middot;x&middot;3 = 6x, &nbsp; b² = 9.",
          "Ergebnis: x² + 6x + 9.",
        ],
      },
      {
        id: 207, type: "input",
        q: "Gleichungssystem: <b>x + y = 10</b> und <b>x − y = 4</b>. Wie groß ist <b>x</b>?",
        answer: 7,
        tip: "Addiere beide Gleichungen – das y fällt weg!",
        steps: [
          "Beide Gleichungen addieren: (x+y) + (x−y) = 10 + 4.",
          "2x = 14.",
          "x = 7. (und y = 3)",
        ],
      },
      {
        id: 208, type: "input",
        q: "Löse: <b>x / 4 = 3</b>",
        answer: 12,
        tip: "Mal 4 rechnen, um das Teilen rückgängig zu machen.",
        steps: [
          "| &middot;4: x = 3 &middot; 4.",
          "x = 12.",
        ],
      },
      {
        id: 209, type: "input",
        q: "Löse: <b>x<sup>2</sup> = 49</b> (gib die positive Lösung an)",
        answer: 7,
        tip: "Was mal sich selbst ergibt 49?",
        steps: [
          "Wurzel ziehen: x = ±√49.",
          "√49 = 7.",
          "Positive Lösung: x = 7 (es gibt auch x = −7).",
        ],
      },
      {
        id: 210, type: "input",
        q: "Löse: <b>5x − 3 = 2x + 9</b>",
        answer: 4,
        tip: "x auf eine Seite, Zahlen auf die andere.",
        steps: [
          "| −2x: 3x − 3 = 9.",
          "| +3: 3x = 12.",
          "| &divide;3: x = 4.",
        ],
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
      "Scheitelpunktform: y = (x − d)² + e → Scheitel bei S(d | e)",
    ],
    questions: [
      {
        id: 301, type: "mc",
        q: "Eine Gerade geht durch die Punkte (0|2) und (2|6). Wie groß ist die <b>Steigung m</b>?",
        options: ["2", "1", "3", "4"],
        answer: "2",
        tip: "m = (y₂ − y₁) / (x₂ − x₁).",
        steps: [
          "m = (6 − 2) / (2 − 0).",
          "m = 4 / 2 = 2.",
        ],
      },
      {
        id: 302, type: "input",
        q: "Gegeben ist <b>f(x) = 2x + 3</b>. Berechne <b>f(4)</b>.",
        answer: 11,
        tip: "Setze einfach 4 für jedes x ein.",
        steps: [
          "f(4) = 2 &middot; 4 + 3.",
          "= 8 + 3 = 11.",
        ],
      },
      {
        id: 303, type: "mc",
        q: "Wo schneidet die Gerade <b>y = −3x + 5</b> die y-Achse?",
        options: ["bei 5", "bei −3", "bei 0", "bei −5"],
        answer: "bei 5",
        tip: "Der y-Achsenabschnitt ist immer das b (die Zahl ohne x).",
        steps: [
          "Form y = m&middot;x + b. Hier ist b = 5.",
          "Also Schnittpunkt mit y-Achse bei (0|5).",
        ],
      },
      {
        id: 304, type: "input",
        q: "Berechne die <b>Nullstelle</b> von <b>f(x) = 2x − 8</b>.",
        answer: 4,
        tip: "Nullstelle heißt: setze f(x) = 0.",
        steps: [
          "2x − 8 = 0.",
          "| +8: 2x = 8.",
          "| &divide;2: x = 4.",
        ],
      },
      {
        id: 305, type: "mc",
        q: "Welche dieser Funktionen ist eine <b>Parabel</b>?",
        options: ["y = x²", "y = 2x + 1", "y = 3", "y = 1/x"],
        answer: "y = x²",
        tip: "Eine Parabel erkennst du am x² (x hoch zwei).",
        steps: [
          "Parabeln haben ein x².",
          "y = x² ist die einzige mit x² → Parabel.",
        ],
      },
      {
        id: 306, type: "input",
        q: "Die Parabel <b>y = (x − 2)² + 3</b> hat ihren Scheitelpunkt bei S(? | 3). Gib die <b>x-Koordinate</b> des Scheitels an.",
        answer: 2,
        tip: "Scheitelpunktform y = (x − d)² + e → Scheitel S(d | e). Achtung Vorzeichen!",
        steps: [
          "Form: y = (x − d)² + e.",
          "Hier (x − 2)² → d = 2.",
          "Scheitel S(2 | 3), also x = 2.",
        ],
      },
      {
        id: 307, type: "mc",
        q: "Wann <b>fällt</b> eine Gerade y = m&middot;x + b von links nach rechts?",
        options: ["wenn m < 0", "wenn m > 0", "wenn b < 0", "wenn b > 0"],
        answer: "wenn m < 0",
        tip: "Die Steigung m entscheidet über steigen/fallen.",
        steps: [
          "m > 0: Gerade steigt (geht nach oben).",
          "m < 0: Gerade fällt (geht nach unten).",
        ],
      },
      {
        id: 308, type: "input",
        q: "Gegeben ist <b>f(x) = x² − 4</b>. Berechne <b>f(3)</b>.",
        answer: 5,
        tip: "Erst 3 hoch zwei, dann minus 4.",
        steps: [
          "f(3) = 3² − 4.",
          "= 9 − 4 = 5.",
        ],
      },
      {
        id: 309, type: "input",
        q: "Eine Gerade hat die Steigung 3 und den y-Achsenabschnitt −2. Berechne <b>f(2)</b>.",
        answer: 4,
        tip: "Die Funktion lautet f(x) = 3x − 2.",
        steps: [
          "f(x) = 3x − 2.",
          "f(2) = 3 &middot; 2 − 2 = 6 − 2 = 4.",
        ],
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
      "Rechteck: A = a &middot; b",
      "Dreieck: A = ½ &middot; g &middot; h (Grundseite mal Höhe halbe)",
      "Kreis: A = π &middot; r² &nbsp; | &nbsp; Umfang U = 2 &middot; π &middot; r &nbsp; (π ≈ 3,14)",
      "Quader: V = a &middot; b &middot; c",
      "Würfel: V = a³ &nbsp; | &nbsp; Oberfläche O = 6 &middot; a²",
      "Zylinder: V = π &middot; r² &middot; h",
      "Pythagoras: a² + b² = c²",
      "Winkelsumme im Dreieck = 180°",
    ],
    questions: [
      {
        id: 401, type: "input",
        q: "Ein Rechteck ist 8 cm lang und 5 cm breit. Wie groß ist die <b>Fläche</b>?",
        answer: 40, unit: "cm²",
        tip: "Fläche vom Rechteck = Länge mal Breite.",
        steps: ["A = a &middot; b = 8 cm &middot; 5 cm = 40 cm²."],
      },
      {
        id: 402, type: "input",
        q: "Ein Kreis hat den Radius r = 5 cm. Berechne die <b>Fläche</b> (mit π ≈ 3,14).",
        answer: 78.5, unit: "cm²",
        tip: "A = π · r². Erst r quadrieren, dann mal π.",
        steps: [
          "A = π &middot; r² = 3,14 &middot; 5².",
          "= 3,14 &middot; 25.",
          "= 78,5 cm².",
        ],
      },
      {
        id: 403, type: "input",
        q: "Ein Quader hat die Maße 3 cm &middot; 4 cm &middot; 5 cm. Wie groß ist das <b>Volumen</b>?",
        answer: 60, unit: "cm³",
        tip: "Volumen vom Quader = Länge · Breite · Höhe.",
        steps: ["V = 3 &middot; 4 &middot; 5 = 60 cm³."],
      },
      {
        id: 404, type: "input",
        q: "Ein Würfel hat die Kantenlänge 4 cm. Wie groß ist seine <b>Oberfläche</b>?",
        answer: 96, unit: "cm²",
        tip: "Ein Würfel hat 6 gleiche quadratische Flächen.",
        steps: [
          "Eine Fläche: 4 &middot; 4 = 16 cm².",
          "6 Flächen: 6 &middot; 16 = 96 cm².",
        ],
      },
      {
        id: 405, type: "input",
        q: "Rechtwinkliges Dreieck mit den Katheten 3 cm und 4 cm. Wie lang ist die <b>Hypotenuse</b> c?",
        answer: 5, unit: "cm",
        tip: "Pythagoras: a² + b² = c². Am Ende die Wurzel ziehen!",
        steps: [
          "c² = a² + b² = 3² + 4² = 9 + 16 = 25.",
          "c = √25 = 5 cm.",
        ],
      },
      {
        id: 406, type: "input",
        q: "Rechtwinkliges Dreieck: Hypotenuse c = 13 cm, eine Kathete = 5 cm. Wie lang ist die <b>andere Kathete</b>?",
        answer: 12, unit: "cm",
        tip: "Hier ist eine Kathete gesucht: b² = c² − a².",
        steps: [
          "b² = c² − a² = 13² − 5² = 169 − 25 = 144.",
          "b = √144 = 12 cm.",
        ],
      },
      {
        id: 407, type: "input",
        q: "Ein Dreieck hat die Grundseite g = 10 cm und die Höhe h = 6 cm. Wie groß ist die <b>Fläche</b>?",
        answer: 30, unit: "cm²",
        tip: "Dreiecksfläche = ½ · Grundseite · Höhe.",
        steps: [
          "A = ½ &middot; g &middot; h.",
          "= ½ &middot; 10 &middot; 6 = ½ &middot; 60 = 30 cm².",
        ],
      },
      {
        id: 408, type: "input",
        q: "Ein Zylinder hat den Radius r = 2 cm und die Höhe h = 10 cm. Berechne das <b>Volumen</b> (mit π ≈ 3,14).",
        answer: 125.6, unit: "cm³",
        tip: "V = π · r² · h.",
        steps: [
          "V = π &middot; r² &middot; h = 3,14 &middot; 2² &middot; 10.",
          "= 3,14 &middot; 4 &middot; 10.",
          "= 125,6 cm³.",
        ],
      },
      {
        id: 409, type: "input",
        q: "Ein Kreis hat den Radius r = 7 cm. Berechne den <b>Umfang</b> (mit π ≈ 3,14).",
        answer: 43.96, unit: "cm",
        tip: "Umfang = 2 · π · r.",
        steps: [
          "U = 2 &middot; π &middot; r = 2 &middot; 3,14 &middot; 7.",
          "= 6,28 &middot; 7 = 43,96 cm.",
        ],
      },
      {
        id: 410, type: "mc",
        q: "Wie groß ist die <b>Winkelsumme</b> in einem Dreieck?",
        options: ["180°", "360°", "90°", "270°"],
        answer: "180°",
        tip: "Egal welche Form das Dreieck hat – die Summe ist immer gleich.",
        steps: ["Die drei Innenwinkel eines Dreiecks ergeben zusammen immer 180°."],
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
      "Seiten. Merksatz: <b>GAGA HühnerHof Ankegacker</b> bzw. die Eselsbrücke " +
      "<b>SOHCAHTOA</b>: Sin=Gegen/Hypo, Cos=Anliegend/Hypo, Tan=Gegen/Anliegend. " +
      "Die <b>Hypotenuse</b> ist die längste Seite (gegenüber dem rechten Winkel).",
    formulas: [
      "sin(α) = Gegenkathete / Hypotenuse",
      "cos(α) = Ankathete / Hypotenuse",
      "tan(α) = Gegenkathete / Ankathete",
      "Gegenkathete = liegt dem Winkel α gegenüber",
      "Ankathete = liegt am Winkel α an (nicht die Hypotenuse)",
    ],
    questions: [
      {
        id: 501, type: "mc",
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
      },
      {
        id: 502, type: "mc",
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
      },
      {
        id: 503, type: "input",
        q: "In einem rechtwinkligen Dreieck ist die Gegenkathete 4 cm und die Hypotenuse 8 cm lang. Berechne <b>sin(α)</b> (als Dezimalzahl).",
        answer: 0.5,
        tip: "sin = Gegenkathete / Hypotenuse.",
        steps: [
          "sin(α) = Gegenkathete / Hypotenuse = 4 / 8.",
          "= 0,5.",
        ],
      },
      {
        id: 504, type: "input",
        q: "Berechne mit dem Taschenrechner: <b>sin(30°)</b> (als Dezimalzahl).",
        answer: 0.5,
        tip: "Achte darauf, dass dein Taschenrechner auf DEG (Grad) steht!",
        steps: [
          "Taschenrechner auf DEG stellen.",
          "sin(30°) = 0,5.",
        ],
      },
      {
        id: 505, type: "input",
        q: "Gegeben: cos(60°) = 0,5 und die Hypotenuse ist 10 cm. Wie lang ist die <b>Ankathete</b>?",
        answer: 5, unit: "cm",
        tip: "cos(α) = Ankathete / Hypotenuse → Ankathete = cos(α) · Hypotenuse.",
        steps: [
          "cos(α) = Ankathete / Hypotenuse.",
          "Ankathete = cos(60°) &middot; 10 = 0,5 &middot; 10.",
          "= 5 cm.",
        ],
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
        id: 601, type: "mc",
        q: "Du würfelst mit einem normalen Würfel. Wie groß ist die Wahrscheinlichkeit für eine <b>6</b>?",
        options: ["1/6", "1/2", "1/3", "6"],
        answer: "1/6",
        tip: "günstige Fälle ÷ alle Fälle.",
        steps: [
          "Günstig: eine 6 → 1 Möglichkeit.",
          "Alle: 6 Zahlen → 6 Möglichkeiten.",
          "P = 1/6.",
        ],
      },
      {
        id: 602, type: "input",
        q: "Berechne den <b>Mittelwert</b> von 4, 6, 8 und 10.",
        answer: 7,
        tip: "Alle addieren, dann durch die Anzahl teilen.",
        steps: [
          "Summe: 4 + 6 + 8 + 10 = 28.",
          "Anzahl: 4 Werte.",
          "Mittelwert = 28 / 4 = 7.",
        ],
      },
      {
        id: 603, type: "input",
        q: "Bestimme den <b>Median</b> von 3, 7 und 9.",
        answer: 7,
        tip: "Der Median ist der Wert genau in der Mitte (nach dem Ordnen).",
        steps: [
          "Daten geordnet: 3, 7, 9.",
          "Mittlerer Wert = 7.",
        ],
      },
      {
        id: 604, type: "mc",
        q: "Du wirfst eine Münze <b>zweimal</b>. Wie groß ist die Wahrscheinlichkeit für <b>zweimal Kopf</b>?",
        options: ["1/4", "1/2", "1/3", "2"],
        answer: "1/4",
        tip: "Bei UND-Ereignissen multiplizierst du die Wahrscheinlichkeiten.",
        steps: [
          "P(Kopf) = 1/2 pro Wurf.",
          "Zweimal Kopf: 1/2 &middot; 1/2 = 1/4.",
        ],
      },
      {
        id: 605, type: "mc",
        q: "In einer Urne sind 3 rote und 7 blaue Kugeln. Wie groß ist die Wahrscheinlichkeit, eine <b>rote</b> zu ziehen?",
        options: ["3/10", "7/10", "1/3", "3/7"],
        answer: "3/10",
        tip: "günstige (rote) ÷ alle Kugeln.",
        steps: [
          "Rote Kugeln: 3.",
          "Alle Kugeln: 3 + 7 = 10.",
          "P(rot) = 3/10.",
        ],
      },
      {
        id: 606, type: "input",
        q: "Berechne die <b>Spannweite</b> von 5, 12, 8 und 20.",
        answer: 15,
        tip: "Spannweite = größter − kleinster Wert.",
        steps: [
          "Größter Wert: 20, kleinster Wert: 5.",
          "Spannweite = 20 − 5 = 15.",
        ],
      },
      {
        id: 607, type: "input",
        q: "Berechne den <b>Mittelwert</b> von 2, 2, 5, 7 und 9.",
        answer: 5,
        tip: "Summe durch Anzahl (hier 5 Werte).",
        steps: [
          "Summe: 2 + 2 + 5 + 7 + 9 = 25.",
          "Mittelwert = 25 / 5 = 5.",
        ],
      },
      {
        id: 608, type: "mc",
        q: "Zwischen welchen Werten liegt eine Wahrscheinlichkeit <b>immer</b>?",
        options: ["zwischen 0 und 1", "zwischen −1 und 1", "zwischen 0 und 100", "zwischen 1 und 6"],
        answer: "zwischen 0 und 1",
        tip: "0 = unmöglich, 1 = sicher.",
        steps: [
          "Eine Wahrscheinlichkeit kann nicht kleiner als 0 (unmöglich) sein.",
          "Und nicht größer als 1 (sicher).",
          "Also immer zwischen 0 und 1.",
        ],
      },
    ],
  },
];

/* 7-Tage-Lernplan für die letzte Woche vor der Prüfung */
const STUDY_PLAN = [
  { day: "Tag 1", topic: "bruch",        text: "Bruch- & Prozentrechnung. Das ist die Basis für fast alles. Übe bis du 8/10 schaffst." },
  { day: "Tag 2", topic: "algebra",      text: "Terme & Gleichungen. Gleichungen lösen kommt in JEDER Prüfung dran." },
  { day: "Tag 3", topic: "funktionen",   text: "Lineare & quadratische Funktionen. Steigung, y-Achsenabschnitt, Nullstellen." },
  { day: "Tag 4", topic: "geometrie",    text: "Flächen, Körper & Pythagoras. Formeln stehen in der Formelsammlung – übe das Einsetzen." },
  { day: "Tag 5", topic: "trigonometrie",text: "Trigonometrie. SOHCAHTOA auswendig. Taschenrechner auf DEG stellen!" },
  { day: "Tag 6", topic: "stochastik",   text: "Wahrscheinlichkeit & Statistik. Meist einfache Punkte – nimm sie mit!" },
  { day: "Tag 7", topic: "__mix__",      text: "Großer Mix / Prüfungsmodus. Alles gemischt üben, dann früh ins Bett. Du schaffst das! 💪" },
];
