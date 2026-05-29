/* =====================================================================
   MSA Mathe Trainer – App-Logik
   ===================================================================== */

const app = document.getElementById("app");
const scoreNum = document.getElementById("scoreNum");
const STORE_KEY = "msa_mathe_solved_v1";

/* ---------- Fortschritt (localStorage) ---------- */
function loadSolved() {
  try { return new Set(JSON.parse(localStorage.getItem(STORE_KEY)) || []); }
  catch { return new Set(); }
}
function saveSolved(set) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify([...set])); } catch {}
}
let solved = loadSolved();

function totalQuestions() {
  return TOPICS.reduce((n, t) => n + t.questions.length, 0);
}
function updateScorePill() { scoreNum.textContent = solved.size; }

/* ---------- Antwort-Prüfung ---------- */
function normalize(s) {
  return String(s)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(",", ".")
    .replace(/[€%°]/g, "")
    .replace(/cm³|cm²|cm|m³|m²|m|kg|g|€|euro/g, "");
}
function asNumber(s) {
  const n = parseFloat(String(s).replace(",", ".").replace(/[^0-9.\-]/g, ""));
  return isNaN(n) ? null : n;
}
function checkAnswer(q, given) {
  const candidates = [q.answer, ...(q.accept || [])];
  const g = normalize(given);
  if (g === "") return false;
  for (const c of candidates) {
    if (normalize(c) === g) return true;
    const cn = asNumber(c), gn = asNumber(given);
    if (cn !== null && gn !== null && Math.abs(cn - gn) < 0.05) return true;
  }
  return false;
}

/* ---------- kleine Helfer ---------- */
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
function topicById(id) { return TOPICS.find(t => t.id === id); }
function solvedInTopic(t) { return t.questions.filter(q => solved.has(q.id)).length; }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =====================================================================
   START-SEITE
   ===================================================================== */
function renderHome() {
  app.innerHTML = "";
  updateScorePill();

  app.appendChild(el("h1", null, "Hey! Bereit für die MSA Mathe? 🚀"));
  app.appendChild(el("p", "sub",
    "Wähle ein Thema und übe Aufgaben mit sofortiger Lösungskontrolle. " +
    "Du kannst dir bei jeder Aufgabe einen <b>Tipp</b> holen oder die " +
    "<b>Schritt-für-Schritt-Erklärung</b> anzeigen lassen. Dein Fortschritt wird gespeichert."));

  /* Aktions-Karten */
  const actions = el("div", "grid");

  const mix = el("button", "card action-card");
  mix.innerHTML =
    `<span class="emoji">🎯</span>
     <div><div class="card-title">Prüfungsmodus</div>
     <div class="card-meta" style="color:#eaeaff">20 gemischte Aufgaben aus allen Themen</div></div>`;
  mix.onclick = () => startMix();
  actions.appendChild(mix);

  const plan = el("button", "card action-card alt");
  plan.innerHTML =
    `<span class="emoji">🗓️</span>
     <div><div class="card-title">7-Tage-Lernplan</div>
     <div class="card-meta">Was übe ich an welchem Tag?</div></div>`;
  plan.onclick = () => renderPlan();
  actions.appendChild(plan);

  app.appendChild(actions);

  /* Themen */
  app.appendChild(el("div", "section-title", "Themen üben"));
  const grid = el("div", "grid");
  TOPICS.forEach(t => {
    const done = solvedInTopic(t);
    const total = t.questions.length;
    const pct = Math.round((done / total) * 100);
    const card = el("button", "card");
    card.innerHTML =
      `<div class="emoji">${t.emoji}</div>
       <div class="card-title">${t.name}</div>
       <div class="card-meta">${done} / ${total} gelöst</div>
       <div class="progress"><div style="width:${pct}%"></div></div>`;
    card.onclick = () => renderTopicIntro(t.id);
    grid.appendChild(card);
  });
  app.appendChild(grid);

  if (solved.size > 0) {
    const reset = el("div", "row");
    reset.style.marginTop = "26px";
    const b = el("button", "btn ghost", "🔄 Fortschritt zurücksetzen");
    b.onclick = () => {
      if (confirm("Wirklich allen Fortschritt löschen?")) {
        solved = new Set(); saveSolved(solved); renderHome();
      }
    };
    reset.appendChild(b);
    app.appendChild(reset);
  }
  window.scrollTo(0, 0);
}

/* =====================================================================
   THEMEN-INTRO (Erklärung + Formeln)
   ===================================================================== */
function renderTopicIntro(topicId) {
  const t = topicById(topicId);
  app.innerHTML = "";

  app.appendChild(el("div", "crumbs", `${t.emoji} ${t.name}`));
  app.appendChild(el("h1", null, "Worum geht's hier?"));
  app.appendChild(el("div", "intro-box", t.intro));

  const fb = el("div", "formula-box");
  fb.innerHTML =
    `<h3>📋 Wichtige Formeln & Merksätze</h3>
     <ul>${t.formulas.map(f => `<li>${f}</li>`).join("")}</ul>`;
  app.appendChild(fb);

  const row = el("div", "row");
  const start = el("button", "btn", `▶️ ${t.questions.length} Aufgaben üben`);
  start.onclick = () => startQuiz(t.questions, `${t.emoji} ${t.name}`, topicId);
  const back = el("button", "btn secondary", "← Zurück");
  back.onclick = renderHome;
  row.appendChild(start);
  row.appendChild(back);
  app.appendChild(row);
  window.scrollTo(0, 0);
}

/* =====================================================================
   QUIZ
   ===================================================================== */
function startQuiz(questions, title, topicId) {
  quiz = {
    list: questions,
    title,
    topicId: topicId || null,
    index: 0,
    correct: 0,
    answeredThis: false,
  };
  renderQuestion();
}
function startMix() {
  const all = TOPICS.flatMap(t => t.questions);
  const picked = shuffle(all).slice(0, Math.min(20, all.length));
  startQuiz(picked, "🎯 Prüfungsmodus", "__mix__");
}

let quiz = null;

function renderQuestion() {
  const q = quiz.list[quiz.index];
  quiz.answeredThis = false;
  app.innerHTML = "";

  /* Kopfzeile */
  const head = el("div", "quiz-head");
  head.appendChild(el("div", "crumbs", quiz.title));
  head.appendChild(el("div", "qcount", `Aufgabe ${quiz.index + 1} / ${quiz.list.length}`));
  app.appendChild(head);

  const bar = el("div", "qbar");
  const barFill = el("div");
  barFill.style.width = `${(quiz.index / quiz.list.length) * 100}%`;
  bar.appendChild(barFill);
  app.appendChild(bar);

  /* Frage-Karte */
  const card = el("div", "question");
  card.appendChild(el("div", "qtext", q.q));

  const answerArea = el("div");

  if (q.type === "mc") {
    const opts = el("div", "options");
    shuffle(q.options).forEach(optText => {
      const b = el("button", "option", optText);
      b.onclick = () => handleMC(b, optText, q, opts);
      opts.appendChild(b);
    });
    answerArea.appendChild(opts);
  } else {
    const wrap = el("div", "input-wrap");
    const input = el("input");
    input.type = "text";
    input.setAttribute("inputmode", "decimal");
    input.placeholder = "Deine Antwort …";
    input.id = "answerInput";
    wrap.appendChild(input);
    if (q.unit) wrap.appendChild(el("span", "unit", q.unit));
    answerArea.appendChild(wrap);

    const checkRow = el("div", "row");
    checkRow.style.marginTop = "12px";
    const checkBtn = el("button", "btn", "✓ Prüfen");
    checkBtn.onclick = () => handleInput(q, input, checkBtn);
    checkRow.appendChild(checkBtn);
    answerArea.appendChild(checkRow);

    input.addEventListener("keydown", e => {
      if (e.key === "Enter" && !quiz.answeredThis) handleInput(q, input, checkBtn);
    });
    setTimeout(() => input.focus(), 50);
  }
  card.appendChild(answerArea);

  /* Tipp */
  const tipBtn = el("button", "btn ghost", "💡 Tipp anzeigen");
  tipBtn.style.marginTop = "16px";
  const tipBox = el("div", "tipbox", `<b>Tipp:</b> ${q.tip || "Lies die Aufgabe in Ruhe nochmal durch."}`);
  tipBtn.onclick = () => { tipBox.classList.toggle("show"); };
  card.appendChild(tipBtn);
  card.appendChild(tipBox);

  /* Feedback-Platzhalter */
  const fb = el("div", "feedback");
  fb.id = "feedback";
  card.appendChild(fb);

  app.appendChild(card);

  /* Untere Buttons */
  const bottom = el("div", "actions-bottom");
  const home = el("button", "btn secondary", "✖ Beenden");
  home.onclick = renderHome;
  bottom.appendChild(home);

  const next = el("button", "btn", quiz.index + 1 < quiz.list.length ? "Weiter →" : "Fertig 🏁");
  next.id = "nextBtn";
  next.disabled = true;
  next.onclick = goNext;
  bottom.appendChild(next);
  app.appendChild(bottom);

  window.scrollTo(0, 0);
}

function showFeedback(ok, q, given) {
  const fb = document.getElementById("feedback");
  fb.className = "feedback show " + (ok ? "ok" : "no");
  const correctTxt = q.unit ? `${q.answer} ${q.unit}` : `${q.answer}`;
  let html = ok
    ? `<div class="fb-title">✅ Richtig! Super gemacht.</div>`
    : `<div class="fb-title">❌ Nicht ganz.</div>
       <div>Richtige Antwort: <span class="correct-answer">${correctTxt}</span></div>`;
  if (q.steps && q.steps.length) {
    html += `<div style="margin-top:10px;font-weight:700">So geht's:</div>
             <ol class="steps">${q.steps.map(s => `<li>${s}</li>`).join("")}</ol>`;
  }
  fb.innerHTML = html;

  if (ok && !solved.has(q.id)) {
    solved.add(q.id);
    saveSolved(solved);
  }
  if (ok) quiz.correct++;
  updateScorePill();

  quiz.answeredThis = true;
  const next = document.getElementById("nextBtn");
  if (next) { next.disabled = false; next.focus(); }
}

function handleMC(btn, chosen, q, container) {
  if (quiz.answeredThis) return;
  const ok = normalize(chosen) === normalize(q.answer);
  [...container.children].forEach(b => {
    b.disabled = true;
    if (normalize(b.textContent) === normalize(q.answer)) b.classList.add("correct");
  });
  if (!ok) btn.classList.add("wrong");
  showFeedback(ok, q, chosen);
}

function handleInput(q, input, checkBtn) {
  if (quiz.answeredThis) return;
  const val = input.value.trim();
  if (val === "") { input.focus(); return; }
  const ok = checkAnswer(q, val);
  input.disabled = true;
  checkBtn.disabled = true;
  input.style.borderColor = ok ? "var(--good)" : "var(--bad)";
  showFeedback(ok, q, val);
}

function goNext() {
  quiz.index++;
  if (quiz.index < quiz.list.length) renderQuestion();
  else renderResult();
}

/* =====================================================================
   ERGEBNIS
   ===================================================================== */
function renderResult() {
  app.innerHTML = "";
  const total = quiz.list.length;
  const correct = quiz.correct;
  const pct = Math.round((correct / total) * 100);

  let emoji, msg;
  if (pct >= 90)      { emoji = "🏆"; msg = "Wahnsinn! Du bist richtig fit. Weiter so!"; }
  else if (pct >= 70) { emoji = "🎉"; msg = "Sehr gut! Das sitzt schon ziemlich gut."; }
  else if (pct >= 50) { emoji = "💪"; msg = "Solide! Schau dir die Fehler nochmal an und übe das Thema gleich nochmal."; }
  else                { emoji = "📚"; msg = "Kein Stress – Übung macht den Meister. Geh die Erklärungen durch und probier's nochmal!"; }

  const card = el("div", "result-card");
  card.innerHTML =
    `<div class="result-emoji">${emoji}</div>
     <div class="result-score">${correct} / ${total}</div>
     <div class="result-msg">${pct}% richtig.<br>${msg}</div>`;

  const row = el("div", "row");
  row.style.justifyContent = "center";
  const again = el("button", "btn", "🔁 Nochmal üben");
  again.onclick = () => startQuiz(quiz.list, quiz.title, quiz.topicId);
  const home = el("button", "btn secondary", "🏠 Startseite");
  home.onclick = renderHome;
  row.appendChild(again);
  row.appendChild(home);
  card.appendChild(row);

  app.appendChild(card);
  window.scrollTo(0, 0);
}

/* =====================================================================
   LERNPLAN
   ===================================================================== */
function renderPlan() {
  app.innerHTML = "";
  app.appendChild(el("div", "crumbs", "🗓️ 7-Tage-Lernplan"));
  app.appendChild(el("h1", null, "Deine letzte Woche vor der Prüfung"));
  app.appendChild(el("p", "sub",
    "Jeden Tag ein Thema. Übe so lange, bis du die meisten Aufgaben richtig hast. " +
    "Tag 7 ist nur Wiederholung – und früh schlafen gehen!"));

  STUDY_PLAN.forEach(p => {
    const item = el("div", "plan-item");
    item.appendChild(el("div", "plan-day", p.day));
    item.appendChild(el("div", null, p.text));
    const go = el("button", "btn secondary go", "Üben →");
    if (p.topic === "__mix__") go.onclick = () => startMix();
    else go.onclick = () => renderTopicIntro(p.topic);
    item.appendChild(go);
    app.appendChild(item);
  });

  const back = el("button", "btn secondary", "← Zurück");
  back.style.marginTop = "16px";
  back.onclick = renderHome;
  app.appendChild(back);
  window.scrollTo(0, 0);
}

/* ---------- Start ---------- */
document.getElementById("homeBtn").onclick = renderHome;
renderHome();
