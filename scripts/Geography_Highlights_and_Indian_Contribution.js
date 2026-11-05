/* ── STYLE SNIPPET: hides the thumbnail box and the "Open Thumbnail & YouTube Kit" link on page 1 (the chapter icon still opens the studio) ── */
(function () {
  function hide(el) {
    if (!el || el.getAttribute("data-hidden")) return;
    el.setAttribute("data-hidden", "1");
    el.style.setProperty("display", "none", "important");
  }
  function sweep() {
    document.querySelectorAll("img.cp-thumb-img").forEach(function (img) {
      var p = img.parentElement;
      hide(p && !p.querySelector("p,.cp-lead,.cp-stats") ? p : img);
    });
    document.querySelectorAll("button,a,[role=button]").forEach(function (el) {
      if (/open thumbnail/i.test(el.textContent || "")) hide(el);
    });
  }
  try { new MutationObserver(sweep).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  sweep();
})();

/* ════════════════════════════════════════════════════════════════
   DEMO — concept pages mixed in between questions
   Register it in portalData.js like any other test (file: "concept-demo").
   Entry 1 is always the CLASS OVERVIEW page (what we will learn in this class).

   Write entries in the order you want them shown:
       1: concept page   2: question   3: question   4: concept page …

   CONCEPT PAGE fields
     type       : "concept"                 (required)
     title      : "Percentage — Fast Fractions"
     icon       : "📊"                       (emoji, optional)
     accent     : "#22c55e"                 (colour of this page, optional)
     pauseTimer : true                      (optional – stops the exam clock while reading)
     html       : `...any HTML, text, <img>, tables...`

   🎬 YOUTUBE STUDIO (optional – put these two fields on ENTRY 1 only)
     The chapter ICON on that page becomes tappable (pulsing red ▶ badge).
     Tapping it opens a studio with 2 tabs:
       🎬 Thumbnail  – composes a 1920×1080 YouTube thumbnail from YOUR image
                       (Pro design / Image only, editable text, accent colour)
                       → Download HD PNG (1920×1080) or YouTube JPG (1280×720, <2 MB)
       📋 Kit        – best title, A/B titles, description, tags, hashtags,
                       pinned comment, thumbnail text, community post, chapters,
                       playlist … each with a one-tap COPY button + "Copy everything".
     The thumbnail box and the "Open Thumbnail & YouTube Kit" link are hidden on the page (see the first snippet); the chapter icon opens the studio.

     thumb : "thumbnail.jpg"                      (image link, file next to index.html)
             or { image, banner, line1, line2, line3, person, logo, badge, ribbon, burst, mode:"creator"|"pro"|"image" }
             mode "creator" = teacher-style thumbnail: red top banner (banner), white line1, big gold line2,
             cyan line3, teacher cut-out photo on the right, round channel logo top-right.
             Teacher photo + logo: put images/person.png (transparent PNG) and images/logo.png next to index.html, OR just pick them
             inside the studio once (they are remembered in the browser and reused for every chapter).
             "pro" mode uses badge / ribbon / burst instead.
     yt    : { title, altTitles:[], description, tags:[], hashtags:[], pinnedComment,
               thumbText, communityPost, chapters, playlist, extra:[{icon,label,text}] }
     NOTE: export needs the site opened over http(s)://, not file:// (browser canvas rule).

   QUESTION fields stay exactly as before:
     questext, options[4], correct:"1".."4", quesimage, exptext, expimage

   Toolkit classes you can use inside html:
     cp-lead, cp-card (blue green amber red violet teal pink), cp-grid (c2 c3 c4),
     cp-formula, cp-frac, cp-note (tip trap trick remember info exam good),
     cp-steps (ol), cp-example (cp-q / cp-a), cp-mnemonic, cp-vs (good / bad),
     cp-stats / cp-stat, cp-chips, cp-timeline (ul), details.cp-collapse,
     cp-divider, cp-fig, cp-key, plain <table>, <img>, h2/h3/h4
     EMPHASIS RULE: never use the brown cp-hl highlight. Emphasise key words with <u>underline</u> (and <b>bold</b>) only.

   🌐 TRANSLATION (automatic, nothing to write in this file)
     When the Translate button is on, index.html translates every concept page (title, lead, stats, roadmap,
     cards, notes, steps, tables, chips …) and shows it under each English block with the SAME tag, font, size,
     weight, bold and underline. To keep it clean:
       • write all text as real HTML text (never inside images / SVG / CSS content)
       • emphasise with <b>, <u>, <i> only; keep one sentence inside ONE element
       • add translate="no" (or class="notranslate") on anything that must stay untranslated, e.g. a pure formula
       • thumb / yt fields stay English (they are not translated)
════════════════════════════════════════════════════════════════ */

window.TEST_DATA = {
  /* ─────────── 1 · CLASS OVERVIEW (opening summary page) ─────────── */
  1: {
    type: "concept",
    icon: "🎯",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Class Overview — Geography Highlights",

    /* 🎬 tap the 🎯 icon on this page → thumbnail studio + YouTube kit */
    thumb: {
      image: "images/7923164c-d005-4555-8441-82ffb6252e9a.png",
      banner: "ALL COMPETITIVE EXAMS",
      line1: "GEOGRAPHY HIGHLIGHTS",
      line2: "FATHERS & THINKERS",
      line3: "INDIA'S CONTRIBUTION",
      badge: "FULL CLASS",
      ribbon: "NAMES • BOOKS • TRICKS",
      burst: "All competitive exams",
      mode: "creator"
    },
    yt: {
      title: "Geography Highlights: Fathers of Geography, Indian Astronomers & Explorers | All Competitive Exams",
      altTitles: [
        "Who is the Father of Geography? Eratosthenes, Humboldt, Ratzel, Sauer | All Competitive Exams",
        "Aryabhatta to Bhaskaracharya: Indian Geographers Full Revision | UPSC SSC Geography",
        "Vasco da Gama, Columbus, Magellan, Cook & Amundsen in Order | Geography for Competitive Exams",
        "Geography Highlights Full Class with 56 Practice Questions | SSC UPSC Banking Railways"
      ],
      description: "Who is the Father of Geography, who measured the Earth first, and which Indian scholar wrote which book? This full class turns the Highlights of Geography into easy pairs you can remember for SSC, UPSC, Banking, Railways and Defence exams.\n\n📌 IN THIS CLASS\n✅ Eratosthenes, the word Geography and the Greek pioneers\n✅ Ptolemy, Strabo, Pliny and the Dark Age\n✅ Indians’ Contribution: Rig Veda, Aryabhatta, Varahamihira, Brahmagupta, Bhaskaracharya\n✅ Jambu Dweep, Mahendra Malai, Ujjain Prime Meridian, Higgs and Bose\n✅ Arab geographers, Baitul Hikma, Marco Polo and the great explorers\n✅ Renaissance inventions, Varenius, Humboldt, Ratzel, Vidal, Mackinder, Sauer, Herbertson\n✅ 56 practice questions right after the concepts\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Highlights\n00:00 The Word Geography & Eratosthenes\n00:00 Greek Pioneers of Geography\n00:00 Roman-Era Scholars & the Dark Age\n00:00 Indians' Contribution in Geography\n00:00 Vedic Knowledge — The Rig Veda\n00:00 Aryabhatta\n00:00 Varahamihira\n00:00 Brahmagupta\n00:00 Bhaskaracharya\n00:00 Ancient Names of India & the Prime Meridian\n00:00 Higgs, Bose and the God Particle\n00:00 More Highlights — Arabs, Explorers & Modern Geographers\n00:00 Arab Geographers & Baitul Hikma\n00:00 Marco Polo & the Age of Discovery\n00:00 Renaissance Discoveries & Inventions\n00:00 Varenius & Humboldt\n00:00 Human Geography — Ratzel & Vidal de la Blache\n00:00 Mackinder's Heartland Theory\n00:00 Sauer & Herbertson\n\n👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n#Geography #UPSC #SSC #CompetitiveExams",
      tags: [
        "geography highlights",
        "father of geography",
        "eratosthenes",
        "indian geographers",
        "aryabhatta",
        "varahamihira",
        "brahmagupta",
        "bhaskaracharya",
        "ujjain prime meridian",
        "baitul hikma",
        "al biruni",
        "marco polo",
        "vasco da gama",
        "ratzel",
        "vidal de la blache",
        "mackinder heartland theory",
        "geography for upsc",
        "geography for ssc",
        "geography for competitive exams",
        "geography one liners"
      ],
      hashtags: [
        "Geography",
        "UPSC",
        "SSC",
        "CompetitiveExams"
      ],
      thumbText: "FATHERS OF GEOGRAPHY",
      pinnedComment: "📌 Practice what you learned: solve all the questions in the class, then write your score below. Which pair confused you most — Al-Khwarizmi vs Al-Biruni or Ratzel vs Vidal? 👇",
      communityPost: "🌍 New class is live: Geography Highlights — Fathers of Geography, Indian astronomers, Arab scholars and explorers, with practice questions for all competitive exams. Start with the class overview and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Highlights\n00:00 The Word Geography & Eratosthenes\n00:00 Greek Pioneers of Geography\n00:00 Roman-Era Scholars & the Dark Age\n00:00 Indians' Contribution in Geography\n00:00 Vedic Knowledge — The Rig Veda\n00:00 Aryabhatta\n00:00 Varahamihira\n00:00 Brahmagupta\n00:00 Bhaskaracharya\n00:00 Ancient Names of India & the Prime Meridian\n00:00 Higgs, Bose and the God Particle\n00:00 More Highlights — Arabs, Explorers & Modern Geographers\n00:00 Arab Geographers & Baitul Hikma\n00:00 Marco Polo & the Age of Discovery\n00:00 Renaissance Discoveries & Inventions\n00:00 Varenius & Humboldt\n00:00 Human Geography — Ratzel & Vidal de la Blache\n00:00 Mackinder's Heartland Theory\n00:00 Sauer & Herbertson",
      playlist: "Geography for All Competitive Exams — Full Classes"
    },

    html: `
      <p class="cp-lead">This class covers the <u>Highlights of Geography</u> — who gave the subject its name, who first measured the Earth, which Indian scholars wrote which book, how Arab scholars and European explorers carried the subject forward, and who is the <b>“Father”</b> of each branch. These <b>names, books and titles</b> are asked again and again in SSC, UPSC, Banking, Railways and Defence exams.</p>

      <div class="cp-stats"><div class="cp-stat"><b>21</b><span>Concept pages</span></div><div class="cp-stat"><b>56</b><span>Practice questions</span></div><div class="cp-stat"><b>50+</b><span>Key facts</span></div><div class="cp-stat"><b>~50 min</b><span>Time needed</span></div></div>

      <div class="cp-divider">Your roadmap</div>

      <ul class="cp-timeline"><li><b>Highlights</b><br>Eratosthenes and the Greek pioneers, Roman-era scholars and the Dark Age.</li><li><b>Indians’ Contribution in Geography</b><br>Rig Veda, Aryabhatta, Varahamihira, Brahmagupta, Bhaskaracharya, ancient names of India, the Prime Meridian at Ujjain, Higgs and Bose.</li><li><b>Arabs, Explorers &amp; Modern Geographers</b><br>Baitul Hikma, Al-Khwarizmi, Al-Biruni, Marco Polo, Vasco da Gama, Columbus, Magellan, the Renaissance, Humboldt, Ratzel, Vidal, Mackinder, Sauer and Herbertson.</li><li><b>Practice</b> — questions right after every concept page.</li></ul>

      <div class="cp-divider">What you will be able to do</div>

      <div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">👑 Fathers of Geography</div>Match every “Father of …” title with the right scholar without confusion.</div><div class="cp-card blue"><div class="cp-card-title">📚 Books &amp; authors</div>Remember which Indian, Arab and Greek scholar wrote which famous book.</div><div class="cp-card amber"><div class="cp-card-title">⛵ Explorers &amp; dates</div>Place Marco Polo, Vasco da Gama, Columbus, Magellan, Cook and Amundsen in the right order.</div><div class="cp-card red"><div class="cp-card-title">⚠️ Exam traps</div>Spot look-alike pairs such as Ratzel vs Vidal, Aryabhatta vs Bhaskaracharya, Al-Khwarizmi vs Al-Biruni.</div></div>

      <div class="cp-note exam"><b>Why it matters:</b> “Who is the Father of …?”, “Who wrote …?” and “Which is NOT correctly matched?” questions come from this part of Geography in almost every exam cycle.</div>

      <div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages, so take your time.</div>

      <div class="cp-chips"><span>All competitive exams</span><span>Geography</span><span>Fathers of Geography</span><span>Indian Astronomers</span><span>Explorers</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE · ROADMAP · HIGHLIGHTS ─────────── */
  2: {
    type: "concept",
    icon: "🗺️",
    accent: "#22c55e",
    pauseTimer: true,
    title: "Highlights",
    html: `
      <p class="cp-lead">“Highlights” is the quick-fire list of <u>who did what</u> in the early history of Geography — from the Greeks who named the subject to the thinkers of the Roman era and the Dark Age.</p>

      <div class="cp-divider">In this section</div>

      <ul class="cp-timeline"><li><b>The Word Geography &amp; Eratosthenes</b><br>Meaning of the word, first measurement of the Earth, two “Father” titles.</li><li><b>Greek Pioneers of Geography</b><br>Hecataeus, Hipparchus, Aristotle, Thales, Anaximander and Herodotus.</li><li><b>Roman-Era Scholars &amp; the Dark Age</b><br>Ptolemy, Strabo, Pliny and the Dark Age (about 300–1200 AD).</li></ul>

      <div class="cp-note tip">Most questions here are of one type: <b>person ↔ achievement / book / title</b>. Learn each pair once and you are done.</div>

      <div class="cp-chips"><span>Greeks</span><span>Romans</span><span>Fathers of Geography</span></div>
    `
  },

  /* ─────────── 3 · CONCEPT PAGE · A1 ─────────── */
  3: {
    type: "concept",
    icon: "🏛️",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "The Word Geography &amp; Eratosthenes",
    html: `
      <p class="cp-lead">The word <b>Geography</b> comes from two Greek words — <u>Geo</u> (earth) and <u>Graphos</u> (description). It was first used by the Greek scholar <b>Eratosthenes</b>, so the Greeks laid the first foundation of the subject.</p>

      <div class="cp-stats"><div class="cp-stat"><b>276–194 BC</b><span>Eratosthenes</span></div><div class="cp-stat"><b>Geo + Graphos</b><span>Greek roots</span></div><div class="cp-stat"><b>Geographica</b><span>His treatise</span></div><div class="cp-stat"><b>Equator</b><span>First measured</span></div></div>

      <div class="cp-divider">1 · Word and meaning</div>

      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Who first used the word “Geography”</td><td><b>Eratosthenes</b> (276–194 BC), a Greek scholar</td></tr><tr><td>Greek roots</td><td><u>Geo</u> = earth, <u>Graphos</u> = description</td></tr><tr><td>Meaning</td><td>Description of the Earth</td></tr><tr><td>First arrangement of the subject</td><td>Done by the <b>Greeks</b></td></tr><tr><td>Famous treatise</td><td><b>Geographica</b></td></tr></tbody></table>

      <div class="cp-divider">2 · Why Eratosthenes is so important</div>

      <div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">📏 Measured the Earth</div>He was the <u>first to calculate</u> the length of the equator and the circumference of the Earth.</div><div class="cp-card blue"><div class="cp-card-title">👑 Two “Father” titles</div>So he is called the <b>Father of Geodesy</b> and also the <b>Father of Geography</b>.</div></div>

      <div class="cp-fig"><img src="images/db750dfa-738e-4d03-8a93-979f40200471.png" alt="Sun rays, two cities and a shadow angle used to measure the Earth" style="display:block;width:100%;max-width:320px;max-height:200px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

      <details class="cp-collapse"><summary>How did he measure the Earth?</summary><p>Geodesy is the science of measuring the size and shape of the Earth. At noon the Sun’s rays fell straight down a well at Syene, but a vertical stick at Alexandria cast a shadow of about 7.2°, which is 1/50 of a full circle. So the distance between the two cities × 50 gave the Earth’s circumference.</p></details>

      <div class="cp-note trap"><b>Father of Geography</b> = Eratosthenes, <b>Father of History</b> = Herodotus, <b>Father of Modern Geography</b> = Humboldt. Do not mix the three.</div>

      <div class="cp-note exam">Direct questions: “Who first used the word Geography?” and “Who is called the Father of Geodesy?” — the answer to both is Eratosthenes.</div>

      <div class="cp-mnemonic"><b>E</b>ratosthenes — <b>E</b>arth’s <b>E</b>quator: three E’s to remember who measured it first.</div>

      <div class="cp-chips"><span>Greek</span><span>Eratosthenes</span><span>Geographica</span></div>
    `
  },

  /* ─────────── 4 · QUESTION · A1 ─────────── */
  4: {
    questext: "The word “Geography” is derived from which two Greek words?",
    options: ["Geo and Graphos", "Geo and Logos", "Cosmos and Graphos", "Geo and Metron"],
    correct: "1",
    exptext: "✅ Geo (earth) + Graphos (description) = description of the Earth. 📌 Graphos means “writing/description”. ❌ Logos means “science” and is used in Cosmology, Cosmos means universe, and Metron means measure.",
  },

  /* ─────────── 5 · QUESTION · A1 ─────────── */
  5: {
    questext: "Who first used the word “Geography” and is also called the Father of Geography?",
    options: ["Eratosthenes", "Herodotus", "Ptolemy", "Hipparchus"],
    correct: "1",
    exptext: "✅ Eratosthenes (276–194 BC) first used the word and wrote Geographica. 📌 He was also the first to calculate the Earth’s circumference. ❌ Herodotus is the Father of History, Ptolemy is a cartographer and Hipparchus divided the circle into 360°.",
  },

  /* ─────────── 6 · QUESTION · A1 ─────────── */
  6: {
    questext: "Which of the following is NOT correct about Eratosthenes?",
    options: ["He lived from 276 to 194 BC", "He tried to calculate the circumference of the Earth", "He wrote the treatise “Geographica”", "He wrote the famous book “Ges Periodos”"],
    correct: "4",
    exptext: "✅ “Ges Periodos” was written by Hecataeus, not Eratosthenes. 📌 Eratosthenes = Geographica + Earth’s circumference. ❌ The other three statements are true about Eratosthenes.",
  },

  /* ─────────── 7 · CONCEPT PAGE · A2 ─────────── */
  7: {
    type: "concept",
    icon: "🏺",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Greek Pioneers of Geography",
    html: `
      <p class="cp-lead">Six Greek thinkers built the base of Geography. Each one is remembered for <u>one big idea</u> — learn the idea and you can name the person.</p>

      <table><thead><tr><th>Scholar</th><th>Known for</th></tr></thead><tbody><tr><td><b>Hecataeus</b></td><td>Greek author; famous book <b>Ges Periodos</b> — “description of the Earth”</td></tr><tr><td><b>Hipparchus</b></td><td>First person to divide the circle into <u>360°</u> (based on Babylonian mathematics); credited with the <b>astrolabe</b> to find longitudes and latitudes</td></tr><tr><td><b>Aristotle</b></td><td>First thinker to write that the Earth is <u>spherical</u>, on the basis of sound reasoning</td></tr><tr><td><b>Thales</b></td><td>First scholar who tried to <u>measure</u> the Earth</td></tr><tr><td><b>Anaximander</b></td><td>First to <u>draw maps</u> — regarded as the <b>first cartographer</b></td></tr><tr><td><b>Thales + Anaximander</b></td><td>Together called the <b>Fathers of Mathematical Geography</b></td></tr><tr><td><b>Herodotus</b></td><td><b>Father of History</b>; first scholar who tried to draw <u>meridians</u> on a map</td></tr></tbody></table>

      <div class="cp-divider">Herodotus’ famous line</div>

      <div class="cp-example"><div class="cp-q">What did Herodotus say about history and geography?</div><div class="cp-a">“All history must be treated <b>geographically</b> and all geography must be treated <b>historically</b>.” — the two subjects depend on each other.</div></div>

      <div class="cp-vs"><div class="good"><h4>✅ Correct</h4>Anaximander = first to <b>draw maps</b> (first cartographer).</div><div class="bad"><h4>❌ Trap</h4>Thales = first cartographer ✗ — Thales is the one who tried to <b>measure</b> the Earth.</div></div>

      <div class="cp-note trap">Aristotle gave the <b>spherical</b> Earth; Hipparchus gave <b>360°</b> and the astrolabe; Hecataeus gave <b>Ges Periodos</b>. Do not swap these three.</div>

      <div class="cp-note exam">“Fathers of Mathematical Geography” → <b>Thales and Anaximander</b>. This pair is a favourite one-liner.</div>

      <div class="cp-mnemonic"><b>H H A T A H</b> → <b>H</b>ecataeus = Book, <b>H</b>ipparchus = 360°, <b>A</b>ristotle = Sphere, <b>T</b>hales = Measure, <b>A</b>naximander = Maps, <b>H</b>erodotus = History.</div>

      <div class="cp-chips"><span>Hecataeus</span><span>Hipparchus</span><span>Aristotle</span><span>Thales</span><span>Anaximander</span><span>Herodotus</span></div>
    `
  },

  /* ─────────── 8 · QUESTION · A2 ─────────── */
  8: {
    questext: "“Ges Periodos”, meaning the description of the Earth, is the famous book of:",
    options: ["Eratosthenes", "Strabo", "Hecataeus", "Herodotus"],
    correct: "3",
    exptext: "✅ Hecataeus, a Greek author, wrote Ges Periodos. 📌 Ges = earth, Periodos = description/circuit. ❌ Eratosthenes wrote Geographica, and Herodotus is known as the Father of History.",
  },

  /* ─────────── 9 · QUESTION · A2 ─────────── */
  9: {
    questext: "Who was the first person to divide the circle into 360° and is credited with the astrolabe for finding latitudes and longitudes?",
    options: ["Aristotle", "Thales", "Hipparchus", "Ptolemy"],
    correct: "3",
    exptext: "✅ Hipparchus used Babylonian mathematics to divide the circle into 360°. 📌 360° + astrolabe = Hipparchus. ❌ Aristotle is linked with the spherical Earth, Thales with measuring the Earth, and Ptolemy with cartography.",
  },

  /* ─────────── 10 · QUESTION · A2 ─────────── */
  10: {
    questext: "Consider the statements: 1. Anaximander was the first to draw maps. 2. Thales was the first scholar who tried to measure the Earth. 3. Thales and Anaximander are called the Fathers of Mathematical Geography. Which of these are correct?",
    options: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three statements are correct. 📌 Maps = Anaximander, Measure = Thales, and together they are the Fathers of Mathematical Geography. ❌ Options with “only” leave out a true statement.",
  },

  /* ─────────── 11 · QUESTION · A2 ─────────── */
  11: {
    questext: "Which Greek thinker was the first to write that the Earth is spherical on the basis of sound reasoning?",
    options: ["Aristotle", "Thales", "Strabo", "Hecataeus"],
    correct: "1",
    exptext: "✅ Aristotle first argued for a spherical Earth with sound reasoning. 📌 Aristotle = Sphere. ❌ Thales tried to measure the Earth, Strabo is linked with an oblong Earth, and Hecataeus wrote Ges Periodos.",
  },

  /* ─────────── 12 · QUESTION · A2 ─────────── */
  12: {
    questext: "“All history must be treated geographically and all geography must be treated historically.” This statement is attributed to:",
    options: ["Strabo", "Eratosthenes", "Pliny", "Herodotus"],
    correct: "4",
    exptext: "✅ Herodotus, the Father of History, said this. 📌 He is also the first scholar who tried to draw meridians on a map. ❌ Strabo, Eratosthenes and Pliny are famous for other works and are not linked with this quotation.",
  },

  /* ─────────── 13 · CONCEPT PAGE · B ─────────── */
  13: {
    type: "concept",
    icon: "📜",
    accent: "#06b6d4",
    pauseTimer: true,
    title: "Roman-Era Scholars &amp; the Dark Age",
    html: `
      <p class="cp-lead">After the Greeks, three scholars of the Roman era carried geography forward — <b>Ptolemy</b>, <b>Strabo</b> and <b>Pliny</b>. Then came a long gap that the Christian world calls the <u>Dark Age</u>.</p>

      <table><thead><tr><th>Scholar / Period</th><th>Known for</th></tr></thead><tbody><tr><td><b>Ptolemy</b></td><td>Most famous scholar of <u>cartography</u> and general geography of the Roman era; his articles inspired explorers of the Age of Discovery to find the <b>Terra Incognita</b> (unknown lands); his treatise is the <b>Almagest</b></td></tr><tr><td><b>Strabo</b> (64 BC – about 24 AD)</td><td>Considered the Earth to be <u>oblong</u></td></tr><tr><td><b>Pliny</b> (23–79 AD)</td><td>Famous book <b>Naturalis Historia</b> (also written Historia Naturalis)</td></tr><tr><td><b>Dark Age</b> (about 300–1200 AD)</td><td>In Christian countries there were <u>no important or revolutionary</u> thoughts or discoveries</td></tr></tbody></table>

      <div class="cp-grid c2"><div class="cp-card red"><div class="cp-card-title">🧭 Terra Incognita</div>Latin for “<b>unknown land</b>” — the unexplored regions that Ptolemy’s work inspired people to search for.</div><div class="cp-card violet"><div class="cp-card-title">🌑 Why “Dark”?</div>Not because of darkness, but because <u>little new knowledge</u> was added in Christian countries during this time.</div></div>

      <div class="cp-note trap">Aristotle → <b>spherical</b> Earth. Strabo → <b>oblong</b> Earth. Both are Earth-shape answers, so read the name carefully.</div>

      <div class="cp-note exam">“Terra Incognita” and “Dark Age” are direct-meaning questions; “Naturalis Historia → Pliny” is a direct author question.</div>

      <div class="cp-mnemonic"><b>P</b>tolemy = <b>P</b>ictures (maps), <b>S</b>trabo = <b>S</b>hape (oblong), <b>P</b>liny = <b>P</b>lants and nature (Natural History).</div>

      <div class="cp-chips"><span>Ptolemy</span><span>Strabo</span><span>Pliny</span><span>Dark Age</span></div>
    `
  },

  /* ─────────── 14 · QUESTION · B ─────────── */
  14: {
    questext: "The articles of Ptolemy inspired explorers to discover the “Terra Incognita”. What does this term mean?",
    options: ["Holy lands", "Unknown lands", "Frozen seas", "Lost cities"],
    correct: "2",
    exptext: "✅ Terra Incognita = unknown land. 📌 Ptolemy’s maps and writings pushed later explorers to search beyond the known world. ❌ Holy lands, frozen seas and lost cities are not what the term means.",
  },

  /* ─────────── 15 · QUESTION · B ─────────── */
  15: {
    questext: "Which scholar considered the Earth to be oblong?",
    options: ["Aristotle", "Ptolemy", "Strabo", "Hipparchus"],
    correct: "3",
    exptext: "✅ Strabo is the scholar linked with the oblong Earth. 📌 Oblong = Strabo, Sphere = Aristotle. ❌ Aristotle argued for a spherical Earth, Ptolemy was a cartographer, and Hipparchus is known for 360° and the astrolabe.",
  },

  /* ─────────── 16 · QUESTION · B ─────────── */
  16: {
    questext: "“Naturalis Historia” (Historia Naturalis) is the famous book of:",
    options: ["Pliny", "Strabo", "Ptolemy", "Hecataeus"],
    correct: "1",
    exptext: "✅ Pliny (23–79 AD) wrote Naturalis Historia. 📌 Pliny = Natural History. ❌ Strabo is linked with the oblong Earth, Ptolemy with the Almagest, and Hecataeus with Ges Periodos.",
  },

  /* ─────────── 17 · QUESTION · B ─────────── */
  17: {
    questext: "The period from about 300 AD to 1200 AD is called the “Dark Age” in Christian countries because:",
    options: ["All Greek geographers were forgotten", "Sea travel was banned by law", "The Sun was not studied at all", "No important or revolutionary thoughts or discoveries came during this period"],
    correct: "4",
    exptext: "✅ The name shows the lack of important thoughts and discoveries. 📌 “Dark” means little new knowledge, not literal darkness. ❌ The other reasons are not given for the name “Dark Age”.",
  },

  /* ─────────── 18 · CONCEPT PAGE · ROADMAP · INDIANS ─────────── */
  18: {
    type: "concept",
    icon: "🇮🇳",
    accent: "#ec4899",
    pauseTimer: true,
    title: "Indians’ Contribution in Geography",
    html: `
      <p class="cp-lead">India’s geographical thinking is very old. From the <u>Rig Veda</u> to <u>Bhaskaracharya</u>, Indian scholars studied stars, seasons, eclipses and the shape of the Earth — and their books even travelled to Baghdad.</p>

      <div class="cp-divider">In this section</div>

      <ul class="cp-timeline"><li><b>Vedic Knowledge — The Rig Veda</b><br>Stars and the five seasons of India.</li><li><b>Aryabhatta</b><br>Spherical Earth and its circumference.</li><li><b>Varahamihira</b><br>Eclipses and the Panchasiddhantika.</li><li><b>Brahmagupta</b><br>Brahma Siddhanta and Khandakhadyaka.</li><li><b>Bhaskaracharya</b><br>Gravitation, Leelavati and Bijaganit.</li><li><b>Ancient Names of India &amp; the Prime Meridian</b><br>Jambu Dweep, Mahendra Malai and Ujjain.</li><li><b>Higgs, Bose and the God Particle</b><br>The Indian link to the “boson”.</li></ul>

      <div class="cp-note tip">Learn the Indian scholars in <b>time order</b>: Aryabhatta → Varahamihira → Brahmagupta → Bhaskaracharya.</div>

      <div class="cp-chips"><span>Indian Geography</span><span>Astronomers</span><span>Books</span></div>
    `
  },

  /* ─────────── 19 · CONCEPT PAGE · VEDIC ─────────── */
  19: {
    type: "concept",
    icon: "📜",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Vedic Knowledge — The Rig Veda",
    html: `
      <p class="cp-lead">The <b>Rig Veda</b>, one of the oldest texts in the world, already contains geographical and astronomical ideas — a description of <u>stars</u> and of the <u>seasons of India</u>.</p>

      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">⭐ Stars</div>The Rig Veda has a description of <b>stars</b>.</div><div class="cp-card green"><div class="cp-card-title">🌦️ Seasons</div>It describes the <b>five seasons</b> of India.</div><div class="cp-card amber"><div class="cp-card-title">🕰️ 600 BC</div>Indian astronomy/astrology (Jyotisha) started around <b>600 BC</b>, the age of Buddha.</div></div>

      <div class="cp-note trap">Do not link the stars and seasons with the Yajur, Sama or Atharva Veda in the exam — the <b>Rig Veda</b> is the one named here.</div>

      <div class="cp-note exam">Typical question: “Which Veda describes the stars and the five seasons of India?” → Rig Veda.</div>

      <div class="cp-mnemonic"><b>R</b>ig Veda = <b>R</b>ing of stars and <b>R</b>itus (seasons).</div>

      <div class="cp-chips"><span>Rig Veda</span><span>Stars</span><span>Five seasons</span></div>
    `
  },

  /* ─────────── 20 · QUESTION · VEDIC ─────────── */
  20: {
    questext: "Which Vedic text contains a description of stars and also describes the five seasons of India?",
    options: ["Yajur Veda", "Rig Veda", "Sama Veda", "Atharva Veda"],
    correct: "2",
    exptext: "✅ The Rig Veda describes stars and the five seasons of India. 📌 Rig Veda = oldest Veda, stars + seasons. ❌ Yajur, Sama and Atharva Veda are not named for these descriptions.",
  },

  /* ─────────── 21 · CONCEPT PAGE · ARYA ─────────── */
  21: {
    type: "concept",
    icon: "🌍",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Aryabhatta",
    html: `
      <p class="cp-lead"><b>Aryabhatta</b> told, long before Europe, that the Earth is a <u>spherical body</u> — and his calculation of its size was astonishingly close to the modern value.</p>

      <div class="cp-stats"><div class="cp-stat"><b>476 AD</b><span>Born</span></div><div class="cp-stat"><b>24,835 miles</b><span>His value</span></div><div class="cp-stat"><b>24,901 miles</b><span>Present value</span></div><div class="cp-stat"><b>66 miles</b><span>Difference</span></div></div>

      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Born</td><td><b>476 AD</b></td></tr><tr><td>Shape of Earth</td><td>Told that the Earth is <u>spherical</u></td></tr><tr><td>Circumference calculated</td><td><b>24,835 miles</b></td></tr><tr><td>Present calculation</td><td>About <b>24,901 miles</b> — very close</td></tr><tr><td>Famous book</td><td><b>Aryabhatiyam</b></td></tr><tr><td>Hindi term “Bhugol”</td><td>The Hindi word for geography, <b>Bhugol</b>, was first used in the <u>Surya Siddhanta</u></td></tr></tbody></table>

      <div class="cp-example"><div class="cp-q">How close was Aryabhatta’s value?</div><div class="cp-a">24,901 − 24,835 = <b class="cp-green">66 miles</b> only — a difference of well under 1%.</div></div>

      <div class="cp-note trap"><b>Spherical Earth</b> → Aryabhatta. <b>Force of gravitation</b> → Bhaskaracharya. Both say “round Earth”, but only Bhaskaracharya adds gravitation.</div>

      <div class="cp-note exam">Frequently asked: birth year 476 AD, the figure 24,835 miles, the book Aryabhatiyam and the word “Bhugol”.</div>

      <div class="cp-mnemonic"><b>Arya</b>bhatta’s <b>ball</b> — the round Earth: 476 → 24,835.</div>

      <div class="cp-chips"><span>476 AD</span><span>Aryabhatiyam</span><span>Spherical Earth</span><span>Bhugol</span></div>
    `
  },

  /* ─────────── 22 · QUESTION · ARYA ─────────── */
  22: {
    questext: "Which Indian geographer, born in 476 AD, told that the Earth is a spherical body?",
    options: ["Varahamihira", "Brahmagupta", "Aryabhatta", "Bhaskaracharya"],
    correct: "3",
    exptext: "✅ Aryabhatta, born in 476 AD, described the Earth as spherical. 📌 Birth year 476 AD = Aryabhatta. ❌ Varahamihira, Brahmagupta and Bhaskaracharya lived later.",
  },

  /* ─────────── 23 · QUESTION · ARYA ─────────── */
  23: {
    questext: "Aryabhatta calculated the Earth’s circumference as 24,835 miles. The present calculation is very close to:",
    options: ["24,901 miles", "24,053 miles", "25,835 miles", "26,901 miles"],
    correct: "1",
    exptext: "✅ The present value is about 24,901 miles. 📌 Difference with Aryabhatta = only 66 miles. ❌ The other figures are too far from the modern value.",
  },

  /* ─────────── 24 · QUESTION · ARYA ─────────── */
  24: {
    questext: "Aryabhatta’s famous book is:",
    options: ["Siddhanta Shiromani", "Panchasiddhantika", "Leelavati", "Aryabhatiyam"],
    correct: "4",
    exptext: "✅ Aryabhatiyam is Aryabhatta’s book. 📌 The book carries his own name. ❌ Siddhanta Shiromani and Leelavati belong to Bhaskaracharya, and Panchasiddhantika to Varahamihira.",
  },

  /* ─────────── 25 · QUESTION · ARYA ─────────── */
  25: {
    questext: "The Hindi term “Bhugol” for geography was first used in which book?",
    options: ["Leelavati", "Surya Siddhanta", "Bijaganit", "Karanakutuhal"],
    correct: "2",
    exptext: "✅ “Bhugol” was first used in the Surya Siddhanta. 📌 Bhugol = Hindi word for geography. ❌ Leelavati and Bijaganit are mathematics books, and Karanakutuhal is an astronomy work of Bhaskaracharya.",
  },

  /* ─────────── 26 · CONCEPT PAGE · VARAH ─────────── */
  26: {
    type: "concept",
    icon: "🌙",
    accent: "#f97316",
    pauseTimer: true,
    title: "Varahamihira",
    html: `
      <p class="cp-lead"><b>Varahamihira</b> (505–587 AD) was the most famous geographer of India <u>after Aryabhatta</u>. He explained <b>eclipses</b> and wrote the <b>Panchasiddhantika</b>.</p>

      <div class="cp-stats"><div class="cp-stat"><b>505–587 AD</b><span>Lifetime</span></div><div class="cp-stat"><b>Eclipses</b><span>Solar and lunar</span></div><div class="cp-stat"><b>5</b><span>Siddhantas</span></div><div class="cp-stat"><b>Panchasiddhantika</b><span>His treatise</span></div></div>

      <div class="cp-divider">The five concepts in Panchasiddhantika</div>

      <div class="cp-grid c3"><div class="cp-card violet"><div class="cp-card-title">1 · Vasishtha</div>One of the five astronomical systems discussed.</div><div class="cp-card blue"><div class="cp-card-title">2 · Paitamaha</div>The second system discussed.</div><div class="cp-card green"><div class="cp-card-title">3 · Paulisha</div>The third system discussed.</div><div class="cp-card amber"><div class="cp-card-title">4 · Saura</div>The Sun-based (Surya) system.</div><div class="cp-card red"><div class="cp-card-title">5 · Romaka</div>The fifth system discussed.</div></div>

      <div class="cp-note trap"><b>Panchasiddhantika</b> (Varahamihira) is not the same as <b>Siddhanta Shiromani</b> (Bhaskaracharya). “Pancha” = five, so remember the five concepts.</div>

      <div class="cp-note exam">Typical questions: “Who gave information about solar and lunar eclipses?” and “Which book discusses the five siddhantas?”</div>

      <div class="cp-mnemonic"><b>Pancha</b> = 5 → <b>V P P S R</b> = <b>V</b>asishtha, <b>P</b>aitamaha, <b>P</b>aulisha, <b>S</b>aura, <b>R</b>omaka.</div>

      <div class="cp-chips"><span>505–587 AD</span><span>Eclipses</span><span>Panchasiddhantika</span></div>
    `
  },

  /* ─────────── 27 · QUESTION · VARAH ─────────── */
  27: {
    questext: "Who was the most famous geographer of India after Aryabhatta (505–587 AD)?",
    options: ["Brahmagupta", "Bhaskaracharya", "Varahamihira", "Satyendra Nath Bose"],
    correct: "3",
    exptext: "✅ Varahamihira (505–587 AD) came next after Aryabhatta. 📌 Aryabhatta → Varahamihira in time order. ❌ Brahmagupta and Bhaskaracharya lived later, and Bose is a modern physicist.",
  },

  /* ─────────── 28 · QUESTION · VARAH ─────────── */
  28: {
    questext: "Varahamihira gave information about which of the following?",
    options: ["Solar and lunar eclipses", "The force of gravitation", "The prime meridian at Greenwich", "The circumference of the Earth in miles"],
    correct: "1",
    exptext: "✅ He gave information about solar and lunar eclipses. 📌 Eclipses = Varahamihira. ❌ Gravitation is linked with Bhaskaracharya, and the circumference in miles with Aryabhatta.",
  },

  /* ─────────── 29 · QUESTION · VARAH ─────────── */
  29: {
    questext: "Which of the following is NOT one of the five concepts discussed in Varahamihira’s Panchasiddhantika?",
    options: ["Vasishtha", "Romaka", "Paulisha", "Siddhanta Shiromani"],
    correct: "4",
    exptext: "✅ Siddhanta Shiromani is a separate book of Bhaskaracharya. 📌 The five are Vasishtha, Paitamaha, Paulisha, Saura and Romaka. ❌ Vasishtha, Romaka and Paulisha are all part of the five.",
  },

  /* ─────────── 30 · CONCEPT PAGE · BRAHMA ─────────── */
  30: {
    type: "concept",
    icon: "📚",
    accent: "#84cc16",
    pauseTimer: true,
    title: "Brahmagupta",
    html: `
      <p class="cp-lead"><b>Brahmagupta</b> (598–665 AD) wrote two great treatises, and both were <u>translated into Arabic</u> at Baghdad — a proof that Indian knowledge reached the Arab world.</p>

      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Lifetime</td><td><b>598–665 AD</b></td></tr><tr><td>Treatise 1</td><td><b>Brahma Siddhanta</b> (Brahmasphutasiddhanta)</td></tr><tr><td>Treatise 2</td><td><b>Khandakhadyaka</b></td></tr><tr><td>Translation</td><td>Both were translated into <u>Arabic</u> at <b>Baghdad</b> during the reign of Caliph <b>Harun-al-Rashid</b></td></tr></tbody></table>

      <div class="cp-note trap">Brahma Siddhanta is by <b>Brahmagupta</b> — the name “Brahma” sits inside “Brahmagupta”. Do not give it to Varahamihira.</div>

      <div class="cp-note exam">Remember “two books + Baghdad + Harun-al-Rashid” as one package.</div>

      <div class="cp-mnemonic"><b>Brahma</b>gupta → <b>Brahma</b> Siddhanta; he travelled to <b>B</b>aghdad through his books.</div>

      <div class="cp-chips"><span>598–665 AD</span><span>Brahma Siddhanta</span><span>Khandakhadyaka</span><span>Baghdad</span></div>
    `
  },

  /* ─────────── 31 · QUESTION · BRAHMA ─────────── */
  31: {
    questext: "The Brahma Siddhanta and the Khandakhadyaka were written by:",
    options: ["Aryabhatta", "Brahmagupta", "Varahamihira", "Bhaskaracharya"],
    correct: "2",
    exptext: "✅ Brahmagupta (598–665 AD) wrote both treatises. 📌 Brahma Siddhanta carries part of his name. ❌ Aryabhatta wrote Aryabhatiyam, Varahamihira wrote Panchasiddhantika, and Bhaskaracharya wrote Siddhanta Shiromani.",
  },

  /* ─────────── 32 · QUESTION · BRAHMA ─────────── */
  32: {
    questext: "The treatises of Brahmagupta were translated into Arabic in which city?",
    options: ["Cairo", "Mecca", "Baghdad", "Samarkand"],
    correct: "3",
    exptext: "✅ They were translated at Baghdad in the time of Caliph Harun-al-Rashid. 📌 Baghdad = centre of Arab learning. ❌ Cairo, Mecca and Samarkand are not named for this translation.",
  },

  /* ─────────── 33 · CONCEPT PAGE · BHASKARA ─────────── */
  33: {
    type: "concept",
    icon: "🍎",
    accent: "#3b82f6",
    pauseTimer: true,
    title: "Bhaskaracharya",
    html: `
      <p class="cp-lead"><b>Bhaskaracharya</b> (1114–1185 AD) said that the Earth is spherical and <u>attracts everything by its force of gravitation</u> — an idea ahead of his time.</p>

      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Lifetime</td><td><b>1114–1185 AD</b></td></tr><tr><td>Astronomy books</td><td><b>Siddhanta Shiromani</b> and <b>Karanakutuhal</b> (“Calculation of Astronomical Wonders”)</td></tr><tr><td>Idea about the Earth</td><td>Spherical, and attracts everything by the force of <u>gravitation</u></td></tr><tr><td>Famous mathematics books</td><td><b>Leelavati</b> and <b>Bijaganit</b></td></tr></tbody></table>

      <div class="cp-divider">Indian astronomers in time order</div>

      <ul class="cp-timeline"><li><b>Aryabhatta</b> — born 476 AD</li><li><b>Varahamihira</b> — 505–587 AD</li><li><b>Brahmagupta</b> — 598–665 AD</li><li><b>Bhaskaracharya</b> — 1114–1185 AD</li></ul>

      <div class="cp-vs"><div class="good"><h4>✅ Correct</h4>Gravitation + Leelavati + Bijaganit → <b>Bhaskaracharya</b>.</div><div class="bad"><h4>❌ Trap</h4>Spherical Earth alone is not enough to choose Bhaskaracharya — Aryabhatta said it first.</div></div>

      <div class="cp-note exam">Chronology questions ask the order of the four astronomers — keep the four dates in mind.</div>

      <div class="cp-mnemonic"><b>B</b>haskara = <b>B</b>ijaganit + <b>B</b>ook of gravitation: <b>B-B-B</b>.</div>

      <div class="cp-chips"><span>1114–1185 AD</span><span>Leelavati</span><span>Bijaganit</span><span>Gravitation</span></div>
    `
  },

  /* ─────────── 34 · QUESTION · BHASKARA ─────────── */
  34: {
    questext: "Which scholar wrote the famous mathematics books “Leelavati” and “Bijaganit”?",
    options: ["Bhaskaracharya", "Aryabhatta", "Brahmagupta", "Varahamihira"],
    correct: "1",
    exptext: "✅ Bhaskaracharya (1114–1185 AD) wrote Leelavati and Bijaganit. 📌 He also wrote Siddhanta Shiromani. ❌ The other three have different famous works.",
  },

  /* ─────────── 35 · QUESTION · BHASKARA ─────────── */
  35: {
    questext: "Who stated that the Earth is spherical and attracts everything by the force of gravitation?",
    options: ["Aryabhatta", "Varahamihira", "Brahmagupta", "Bhaskaracharya"],
    correct: "4",
    exptext: "✅ Bhaskaracharya linked the spherical Earth with the force of gravitation. 📌 Gravitation = Bhaskaracharya. ❌ Aryabhatta only told that the Earth is spherical.",
  },

  /* ─────────── 36 · QUESTION · BHASKARA ─────────── */
  36: {
    questext: "Arrange these Indian scholars in chronological order (earliest first): 1. Bhaskaracharya 2. Brahmagupta 3. Aryabhatta 4. Varahamihira",
    options: ["3 – 2 – 4 – 1", "4 – 3 – 2 – 1", "3 – 4 – 2 – 1", "3 – 4 – 1 – 2"],
    correct: "3",
    exptext: "✅ Aryabhatta (476) → Varahamihira (505–587) → Brahmagupta (598–665) → Bhaskaracharya (1114–1185). 📌 A → V → B → B. ❌ Other orders put Brahmagupta or Bhaskaracharya too early.",
  },

  /* ─────────── 37 · CONCEPT PAGE · NAMES ─────────── */
  37: {
    type: "concept",
    icon: "🗺️",
    accent: "#e11d48",
    pauseTimer: true,
    title: "Ancient Names of India &amp; the Prime Meridian",
    html: `
      <p class="cp-lead">Ancient Indian books gave names to the land and even chose their own <u>prime meridian</u> — long before Greenwich became the world standard.</p>

      <div class="cp-grid c3"><div class="cp-card amber"><div class="cp-card-title">🏝️ Jambu Dweep</div>India has been described as <b>Jambu Dweep</b> in the Puranas.</div><div class="cp-card teal"><div class="cp-card-title">⛰️ Mahendra Malai</div>The eastern part of India (coast and Eastern Ghats) was called <b>Mahendra Malai</b> in ancient India.</div><div class="cp-card blue"><div class="cp-card-title">📍 Ujjain</div>Early Indian geographers held that the <b>Prime Meridian</b> passes through <b>Ujjain</b>.</div></div>

      <table><thead><tr><th>Ancient name / idea</th><th>Meaning</th></tr></thead><tbody><tr><td>Jambu Dweep</td><td>Name of India in the <u>Puranas</u></td></tr><tr><td>Mahendra Malai</td><td>Eastern part of ancient India</td></tr><tr><td>Prime Meridian</td><td>Passes through <u>Ujjain</u> (early Indian geographers)</td></tr></tbody></table>

      <div class="cp-note info">Ujjain also lies close to the <b>Tropic of Cancer</b>, which made it an ideal place for ancient Indian astronomers.</div>

      <div class="cp-note trap">The modern Prime Meridian passes through <b>Greenwich</b>; the <b>early Indian</b> one passed through <b>Ujjain</b>. The question will tell you which.</div>

      <div class="cp-mnemonic"><b>J</b>ambu = <b>J</b>ust India (Puranas); <b>U</b>jjain = <b>U</b>s (our own) Prime Meridian.</div>

      <div class="cp-chips"><span>Jambu Dweep</span><span>Mahendra Malai</span><span>Ujjain</span></div>
    `
  },

  /* ─────────── 38 · QUESTION · NAMES ─────────── */
  38: {
    questext: "In the Puranas, India has been described as:",
    options: ["Kusha Dweep", "Jambu Dweep", "Plaksha Dweep", "Shaka Dweep"],
    correct: "2",
    exptext: "✅ The Puranas describe India as Jambu Dweep. 📌 Jambu = the Indian name. ❌ Kusha, Plaksha and Shaka Dweep are other divisions named in the Puranas.",
  },

  /* ─────────── 39 · QUESTION · NAMES ─────────── */
  39: {
    questext: "According to the early Indian geographers, the Prime Meridian passes through:",
    options: ["Varanasi", "Delhi", "Ujjain", "Pataliputra"],
    correct: "3",
    exptext: "✅ Early Indian geographers placed the Prime Meridian at Ujjain. 📌 Ujjain = ancient Indian Prime Meridian. ❌ Varanasi, Delhi and Pataliputra were never held as the Prime Meridian.",
  },

  /* ─────────── 40 · QUESTION · NAMES ─────────── */
  40: {
    questext: "Which part of ancient India was called “Mahendra Malai”?",
    options: ["The eastern part", "The western coast", "The northern mountains", "The Thar desert"],
    correct: "1",
    exptext: "✅ The eastern part (coast and Eastern Ghats) was Mahendra Malai. 📌 Mahendra Malai = East. ❌ The west coast, northern mountains and desert are not linked with this name.",
  },

  /* ─────────── 41 · CONCEPT PAGE · HIGGS ─────────── */
  41: {
    type: "concept",
    icon: "⚛️",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Higgs, Bose and the God Particle",
    html: `
      <p class="cp-lead">To understand <b>cosmology</b>, the British scientist <b>Higgs</b> propagated the idea of the <u>God Particle</u> in <b>1964</b> — and it was based on the <b>Boson theory</b> of the Indian scientist <b>Satyendra Nath Bose</b>.</p>

      <div class="cp-grid c2"><div class="cp-card violet"><div class="cp-card-title">🇬🇧 Higgs — 1964</div>Propagated the concept of the <b>God Particle</b>.</div><div class="cp-card green"><div class="cp-card-title">🇮🇳 Bose</div>His <b>Boson theory</b> is the base of the idea; “boson” is named after him.</div></div>

      <table><thead><tr><th>Name</th><th>Role</th></tr></thead><tbody><tr><td>Peter Higgs</td><td>British scientist who propounded the God Particle concept in 1964</td></tr><tr><td>Satyendra Nath Bose</td><td>Indian scientist whose Boson theory it was based on</td></tr></tbody></table>

      <div class="cp-note info">The Higgs boson was confirmed at CERN in 2012, and the 2013 Nobel Prize in Physics went to Higgs and Englert.</div>

      <div class="cp-note trap">The particle carries <b>Higgs’</b> name but the word <b>boson</b> honours <b>Bose</b> — an Indian link that exams love.</div>

      <div class="cp-mnemonic"><b>H</b>iggs = <b>H</b>eavenly particle (God Particle); <b>B</b>ose = <b>B</b>oson.</div>

      <div class="cp-chips"><span>1964</span><span>God Particle</span><span>Boson</span><span>Satyendra Nath Bose</span></div>
    `
  },

  /* ─────────── 42 · QUESTION · HIGGS ─────────── */
  42: {
    questext: "The concept of the “God Particle” was propagated in 1964 by the British scientist:",
    options: ["Satyendra Nath Bose", "Isaac Newton", "Max Planck", "Higgs"],
    correct: "4",
    exptext: "✅ Higgs propagated the God Particle concept in 1964. 📌 Higgs = God Particle. ❌ Bose gave the boson theory, Newton studied gravity, and Planck founded quantum theory.",
  },

  /* ─────────── 43 · QUESTION · HIGGS ─────────── */
  43: {
    questext: "The “boson” of the God Particle idea is based on the theory of which Indian scientist?",
    options: ["C. V. Raman", "Satyendra Nath Bose", "Homi J. Bhabha", "Meghnad Saha"],
    correct: "2",
    exptext: "✅ The Boson theory is by Satyendra Nath Bose. 📌 Boson = Bose. ❌ Raman is linked with light scattering, Bhabha with the nuclear programme, and Saha with the ionisation equation.",
  },

  /* ─────────── 44 · CONCEPT PAGE · ROADMAP · ARABS ─────────── */
  44: {
    type: "concept",
    icon: "🧭",
    accent: "#a855f7",
    pauseTimer: true,
    title: "More Highlights — Arabs, Explorers &amp; Modern Geographers",
    html: `
      <p class="cp-lead">The story now moves to <u>Baghdad</u>, then to the <u>sea routes</u> of the explorers, and finally to the <u>thinkers</u> who made Geography a modern subject.</p>

      <div class="cp-divider">In this section</div>

      <ul class="cp-timeline"><li><b>Arab Geographers &amp; Baitul Hikma</b><br>Al-Khwarizmi, Al-Mamun, Al-Balakhi and Al-Biruni.</li><li><b>Marco Polo &amp; the Age of Discovery</b><br>Marco Polo, Vasco da Gama, Columbus, Magellan, Tasman, Cook and Amundsen.</li><li><b>Renaissance Discoveries &amp; Inventions</b><br>Printing press, Copernicus, Galileo, Kepler and Newton.</li><li><b>Varenius &amp; Humboldt</b><br>The foundation of modern Geography.</li><li><b>Human Geography — Ratzel &amp; Vidal de la Blache</b><br>Two founders, two views.</li><li><b>Mackinder’s Heartland Theory</b><br>Political geography of the world.</li><li><b>Sauer &amp; Herbertson</b><br>Cultural Geography and Natural Regions.</li></ul>

      <div class="cp-note tip">Keep a mental timeline: <b>Arabs → Marco Polo → Explorers → Renaissance → Modern geographers</b>.</div>

      <div class="cp-chips"><span>Arabs</span><span>Explorers</span><span>Modern Geography</span></div>
    `
  },

  /* ─────────── 45 · CONCEPT PAGE · ARAB ─────────── */
  45: {
    type: "concept",
    icon: "🕌",
    accent: "#10b981",
    pauseTimer: true,
    title: "Arab Geographers &amp; Baitul Hikma",
    html: `
      <p class="cp-lead">Arab scholars <u>saved, translated and improved</u> the knowledge of Greeks and Indians. Their centre of learning was <b>Baitul Hikma</b> in Baghdad.</p>

      <table><thead><tr><th>Name / Place</th><th>Contribution</th></tr></thead><tbody><tr><td><b>Baitul Hikma</b> (House of Wisdom)</td><td>Educational institute established in <b>Baghdad</b> under the patronage of Caliph <b>Harun-al-Rashid</b></td></tr><tr><td><b>Al-Khwarizmi</b> (about 780–850 AD)</td><td>Wrote the book <b>Sind Hind</b></td></tr><tr><td><b>Caliph Al-Mamun</b> (reign from 813 AD)</td><td>Got Ptolemy’s treatise translated into Arabic with the title <b>Almagest</b></td></tr><tr><td><b>Al-Balakhi</b></td><td>Prepared <b>Kitab-al-Ashkal</b>, the <u>first climatic atlas</u></td></tr><tr><td><b>Al-Biruni</b></td><td>Wrote <b>Kitab-al-Hind</b> (about 1030 AD); the 11th century is the <u>Period of Al-Biruni</u> in the Arab world; his <b>Al-Qanun-al-Masudi</b> was written in the style of Ptolemy’s Almagest</td></tr><tr><td><b>Arabs</b></td><td>First to present a <u>seasonal account of the monsoon</u></td></tr></tbody></table>

      <div class="cp-vs"><div class="good"><h4>✅ Correct</h4>Al-Khwarizmi → <b>Sind Hind</b>; Al-Biruni → <b>Kitab-al-Hind</b>.</div><div class="bad"><h4>❌ Trap</h4>Both titles end in “Hind” — swapping the authors is the classic mistake.</div></div>

      <div class="cp-note trap"><b>Almagest</b> is Ptolemy’s treatise, but the Arabic title was given when <b>Al-Mamun</b> had it translated.</div>

      <div class="cp-note exam">Three direct pairs: Baitul Hikma → Baghdad, Kitab-al-Ashkal → Al-Balakhi, Kitab-al-Hind → Al-Biruni.</div>

      <div class="cp-mnemonic"><b>K</b>hwarizmi = <b>S</b>ind Hind; <b>B</b>iruni = <b>K</b>itab-al-Hind; <b>B</b>alakhi = <b>A</b>shkal atlas.</div>

      <div class="cp-chips"><span>Baitul Hikma</span><span>Al-Khwarizmi</span><span>Al-Biruni</span><span>Monsoon</span></div>
    `
  },

  /* ─────────── 46 · QUESTION · ARAB ─────────── */
  46: {
    questext: "Baitul Hikma, established under the patronage of Caliph Harun-al-Rashid, was an educational institute in:",
    options: ["Cairo", "Cordoba", "Baghdad", "Mecca"],
    correct: "3",
    exptext: "✅ Baitul Hikma was in Baghdad. 📌 Baitul Hikma = House of Wisdom. ❌ Cairo, Cordoba and Mecca are other Muslim cities but not the home of Baitul Hikma.",
  },

  /* ─────────── 47 · QUESTION · ARAB ─────────── */
  47: {
    questext: "Which Arab geographer wrote the book “Sind Hind”?",
    options: ["Al-Khwarizmi", "Al-Biruni", "Al-Balakhi", "Al-Idrisi"],
    correct: "1",
    exptext: "✅ Al-Khwarizmi wrote Sind Hind. 📌 Sind Hind = Khwarizmi. ❌ Al-Biruni wrote Kitab-al-Hind, and Al-Balakhi prepared Kitab-al-Ashkal.",
  },

  /* ─────────── 48 · QUESTION · ARAB ─────────── */
  48: {
    questext: "Ptolemy’s treatise was translated into Arabic with the title “Almagest” by the order of Caliph:",
    options: ["Harun-al-Rashid", "Al-Mansur", "Al-Walid", "Al-Mamun"],
    correct: "4",
    exptext: "✅ Caliph Al-Mamun got it translated (reign from 813 AD). 📌 Almagest = Ptolemy + Al-Mamun. ❌ Harun-al-Rashid is linked with Baitul Hikma, not with the Almagest.",
  },

  /* ─────────── 49 · QUESTION · ARAB ─────────── */
  49: {
    questext: "“Kitab-al-Ashkal”, the first climatic atlas, was prepared by:",
    options: ["Al-Biruni", "Al-Balakhi", "Al-Khwarizmi", "Al-Mamun"],
    correct: "2",
    exptext: "✅ Al-Balakhi prepared Kitab-al-Ashkal. 📌 Ashkal = first climatic atlas. ❌ Al-Biruni and Al-Khwarizmi wrote other books, and Al-Mamun was a Caliph.",
  },

  /* ─────────── 50 · QUESTION · ARAB ─────────── */
  50: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Al-Biruni – Al-Qanun-al-Masudi", "Al-Balakhi – Kitab-al-Ashkal", "Al-Khwarizmi – Kitab-al-Hind", "Al-Khwarizmi – Sind Hind"],
    correct: "3",
    exptext: "✅ Kitab-al-Hind was written by Al-Biruni, not Al-Khwarizmi. 📌 Khwarizmi = Sind Hind, Biruni = Kitab-al-Hind. ❌ The other three pairs are correct.",
  },

  /* ─────────── 51 · QUESTION · ARAB ─────────── */
  51: {
    questext: "Consider the statements: 1. Arabs were the first to present a seasonal account of the monsoon. 2. Al-Biruni wrote Kitab-al-Hind in about 1030 AD. 3. Al-Qanun-al-Masudi was written in the style of Ptolemy’s Almagest. Which are correct?",
    options: ["1 and 2 only", "1, 2 and 3", "2 and 3 only", "1 and 3 only"],
    correct: "2",
    exptext: "✅ All three statements are correct. 📌 Monsoon = Arabs, 1030 AD = Al-Biruni, Masudi = Almagest style. ❌ Every “only” option drops a true statement.",
  },

  /* ─────────── 52 · CONCEPT PAGE · VOYAGES ─────────── */
  52: {
    type: "concept",
    icon: "⛵",
    accent: "#eab308",
    pauseTimer: true,
    title: "Marco Polo &amp; the Age of Discovery",
    html: `
      <p class="cp-lead">From Marco Polo’s land journey to Amundsen’s South Pole, explorers <u>opened the world</u> to Geography. Learn <b>who went where</b> and <b>in what order</b>.</p>

      <table><thead><tr><th>Explorer</th><th>Achievement</th></tr></thead><tbody><tr><td><b>Marco Polo</b> (13th century)</td><td>Great trade-traveller who travelled for the first time from the <u>Mediterranean</u> side of Europe to the Pacific coast of Asia</td></tr><tr><td><b>Christopher Columbus</b></td><td>Resident of Genoa; discovered <b>America</b> (1492), then called the <u>New World</u></td></tr><tr><td><b>Amerigo Vespucci</b></td><td>The New World was named <b>America</b> after him</td></tr><tr><td><b>Vasco da Gama</b> (Portuguese)</td><td>Reached <b>Calicut</b> port in India in <b>1498</b> via the <u>Cape of Good Hope</u> — a new sea-route to India</td></tr><tr><td><b>Magellan</b> (Portuguese)</td><td>His expedition went around the whole world (1519–1522)</td></tr><tr><td><b>Tasman</b> (Dutch)</td><td>Discovered <b>Tasmania</b> and travelled to <b>New Zealand</b></td></tr><tr><td><b>Captain James Cook</b> (English)</td><td>Sailed round the Antarctic between <b>1772 and 1775</b>; also discovered the <b>Hawaiian Islands</b></td></tr><tr><td><b>Roald Amundsen</b></td><td>Reached the <b>South Pole</b> in <b>1911</b></td></tr></tbody></table>

      <div class="cp-divider">Time order</div>

      <ul class="cp-timeline"><li><b>13th century</b> — Marco Polo</li><li><b>1492</b> — Columbus reaches America</li><li><b>1498</b> — Vasco da Gama reaches Calicut</li><li><b>1519–1522</b> — Magellan’s round-the-world voyage</li><li><b>1772–1775</b> — Cook in Antarctic waters</li><li><b>1911</b> — Amundsen at the South Pole</li></ul>

      <div class="cp-note trap">Vasco da Gama came to <b>India</b>; Columbus found <b>America</b>; Amundsen reached the <b>South Pole</b>, not Magellan or Cook.</div>

      <div class="cp-note exam">“Pair NOT correctly matched” and “chronological order” are the two favourite formats here.</div>

      <div class="cp-mnemonic"><b>V</b>asco = <b>V</b>ia Good Hope to Calicut; <b>C</b>olumbus = <b>C</b>ontinent America; <b>A</b>mundsen = <b>A</b>ntarctic pole.</div>

      <div class="cp-chips"><span>Marco Polo</span><span>Vasco da Gama</span><span>Columbus</span><span>Magellan</span><span>Amundsen</span></div>
    `
  },

  /* ─────────── 53 · QUESTION · VOYAGES ─────────── */
  53: {
    questext: "Which Portuguese traveller-sailor reached the Calicut port of India via the Cape of Good Hope in 1498?",
    options: ["Vasco da Gama", "Bartolomeu Dias", "Magellan", "Christopher Columbus"],
    correct: "1",
    exptext: "✅ Vasco da Gama reached Calicut in 1498 and discovered a new sea-route to India. 📌 1498 + Calicut = Vasco da Gama. ❌ Dias only reached the Cape, Magellan circled the world, and Columbus reached America.",
  },

  /* ─────────── 54 · QUESTION · VOYAGES ─────────── */
  54: {
    questext: "The “New World” was named America after the name of the explorer:",
    options: ["Christopher Columbus", "John Cabot", "Ferdinand Magellan", "Amerigo Vespucci"],
    correct: "4",
    exptext: "✅ America is named after Amerigo Vespucci. 📌 Columbus discovered it, but Vespucci gave the name. ❌ Columbus, Cabot and Magellan did not give their names to the continent.",
  },

  /* ─────────── 55 · QUESTION · VOYAGES ─────────── */
  55: {
    questext: "Tasmania was discovered by the Dutch sailor:",
    options: ["James Cook", "Tasman", "Magellan", "Roald Amundsen"],
    correct: "2",
    exptext: "✅ Tasman discovered Tasmania and also travelled to New Zealand. 📌 Tasman → Tasmania. ❌ Cook sailed round Antarctica, Magellan circled the world, and Amundsen reached the South Pole.",
  },

  /* ─────────── 56 · QUESTION · VOYAGES ─────────── */
  56: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Amundsen – South Pole (1911)", "Cook – Hawaiian Islands", "Magellan – South Pole", "Tasman – Tasmania"],
    correct: "3",
    exptext: "✅ The South Pole was reached by Amundsen, not Magellan. 📌 Magellan = round-the-world expedition. ❌ The other three pairs are correct.",
  },

  /* ─────────── 57 · QUESTION · VOYAGES ─────────── */
  57: {
    questext: "Arrange in chronological order (earliest first): 1. Vasco da Gama reaches Calicut 2. Magellan’s expedition goes around the world 3. Cook sails round the Antarctic 4. Amundsen reaches the South Pole",
    options: ["2 – 1 – 3 – 4", "1 – 2 – 3 – 4", "1 – 3 – 2 – 4", "1 – 2 – 4 – 3"],
    correct: "2",
    exptext: "✅ 1498 → 1519–22 → 1772–75 → 1911. 📌 Think: India route, world circle, Antarctic sail, South Pole. ❌ The other orders place Cook or Amundsen too early.",
  },

  /* ─────────── 58 · CONCEPT PAGE · RENAISS ─────────── */
  58: {
    type: "concept",
    icon: "💡",
    accent: "#d946ef",
    pauseTimer: true,
    title: "Renaissance Discoveries &amp; Inventions",
    html: `
      <p class="cp-lead">The Renaissance changed how people saw the Sun, the stars and the Earth. Five names and five ideas are enough.</p>

      <table><thead><tr><th>Discovery / Invention</th><th>Person / Time</th></tr></thead><tbody><tr><td>Printing Press</td><td>Printing — Europe, 15th century</td></tr><tr><td>The Solar System</td><td><b>Copernicus</b> (1543 AD)</td></tr><tr><td>Telescope (for astronomy)</td><td><b>Galileo</b> (1609 AD)</td></tr><tr><td>Works on Astronomy</td><td><b>Kepler</b></td></tr><tr><td>Spheroid shape of the Earth</td><td><b>Newton</b></td></tr></tbody></table>

      <div class="cp-note trap">Copernicus = <b>Solar System</b>, Galileo = <b>Telescope</b>. Do not give the Solar System to Galileo.</div>

      <div class="cp-note exam">“Which pair is NOT correctly matched?” is the usual format for this table.</div>

      <div class="cp-mnemonic"><b>C</b>opernicus = <b>C</b>entre Sun, <b>G</b>alileo = <b>G</b>lass (telescope), <b>K</b>epler = <b>K</b>eeps the planets’ laws, <b>N</b>ewton = <b>N</b>early-round Earth.</div>

      <div class="cp-chips"><span>Copernicus</span><span>Galileo</span><span>Kepler</span><span>Newton</span></div>
    `
  },

  /* ─────────── 59 · QUESTION · RENAISS ─────────── */
  59: {
    questext: "The work on the Solar System in 1543 AD is credited to:",
    options: ["Copernicus", "Galileo", "Kepler", "Newton"],
    correct: "1",
    exptext: "✅ Copernicus presented the Solar System work in 1543 AD. 📌 1543 = Copernicus. ❌ Galileo is linked with the telescope (1609), Kepler with astronomy works, and Newton with the Earth’s spheroid shape.",
  },

  /* ─────────── 60 · QUESTION · RENAISS ─────────── */
  60: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Telescope – Galileo", "Works on Astronomy – Kepler", "Spheroid shape of the Earth – Newton", "Solar System – Newton"],
    correct: "4",
    exptext: "✅ The Solar System is linked with Copernicus, not Newton. 📌 Newton = spheroid shape of the Earth. ❌ The other three pairs are correct.",
  },

  /* ─────────── 61 · CONCEPT PAGE · VARHUM ─────────── */
  61: {
    type: "concept",
    icon: "📖",
    accent: "#64748b",
    pauseTimer: true,
    title: "Varenius &amp; Humboldt",
    html: `
      <p class="cp-lead">Geography became an <u>independent subject</u> in the <b>19th century</b>. Two names stand at its foundation — <b>Varenius</b> and <b>Humboldt</b>.</p>

      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🧱 Varenius</div>Laid the foundation of the <b>dichotomy</b> of <u>Systematic Geography</u> and <u>Regional Geography</u> for the first time.</div><div class="cp-card green"><div class="cp-card-title">🌿 Alexander von Humboldt (1769–1859)</div>German geographer; famous book <b>Cosmos</b>; played a great role in the development of <b>Cosmology</b>.</div></div>

      <table><thead><tr><th>Humboldt’s work</th><th>Detail</th></tr></thead><tbody><tr><td>Panama</td><td>First person who had the idea to construct a <u>canal across the Panama isthmus</u></td></tr><tr><td>Isotherms</td><td>First to depict <b>isotherms</b> on the map</td></tr><tr><td>Titles</td><td><b>Father of Climatology</b>, <b>Father of Modern Geography</b>, <b>Father of Vegetation Geography</b></td></tr></tbody></table>

      <div class="cp-note trap">Humboldt is <b>not</b> the Father of Political or Cultural Geography — those titles belong to Ratzel and Sauer.</div>

      <div class="cp-note exam">Favourite one-liners: “Cosmos → Humboldt”, “isotherms → Humboldt”, “dichotomy → Varenius”.</div>

      <div class="cp-mnemonic"><b>V</b>arenius = <b>V</b>ersus (Systematic vs Regional); <b>H</b>umboldt = <b>H</b>eat lines (isotherms).</div>

      <div class="cp-chips"><span>Varenius</span><span>Humboldt</span><span>Cosmos</span><span>Isotherms</span></div>
    `
  },

  /* ─────────── 62 · QUESTION · VARHUM ─────────── */
  62: {
    questext: "Who laid the foundation of the dichotomy of Systematic Geography and Regional Geography for the first time?",
    options: ["Humboldt", "Varenius", "Ratzel", "Herbertson"],
    correct: "2",
    exptext: "✅ Varenius laid this foundation. 📌 Dichotomy = two parts: Systematic and Regional. ❌ Humboldt, Ratzel and Herbertson are famous for other contributions.",
  },

  /* ─────────── 63 · QUESTION · VARHUM ─────────── */
  63: {
    questext: "Which German geographer wrote “Cosmos” and is called the Father of Modern Geography?",
    options: ["Friedrich Ratzel", "Varenius", "Alexander von Humboldt", "Herbertson"],
    correct: "3",
    exptext: "✅ Humboldt (1769–1859) wrote Cosmos. 📌 Cosmos + isotherms = Humboldt. ❌ Ratzel is the Father of Political Geography, and Varenius and Herbertson are famous for other contributions.",
  },

  /* ─────────── 64 · QUESTION · VARHUM ─────────── */
  64: {
    questext: "Alexander von Humboldt is NOT known as the:",
    options: ["Father of Political Geography", "Father of Climatology", "Father of Vegetation Geography", "Father of Modern Geography"],
    correct: "1",
    exptext: "✅ The Father of Political Geography is Ratzel. 📌 Humboldt = Climatology, Vegetation, Modern Geography. ❌ The other three titles are Humboldt’s.",
  },

  /* ─────────── 65 · CONCEPT PAGE · RATVID ─────────── */
  65: {
    type: "concept",
    icon: "🧬",
    accent: "#f43f5e",
    pauseTimer: true,
    title: "Human Geography — Ratzel &amp; Vidal de la Blache",
    html: `
      <p class="cp-lead">In the early <b>20th century</b> Geography became the study of the <u>mutual relation between humans and environment</u>. Two main theories grew — <b>Determinism</b> (Ratzel’s side) and <b>Possibilism</b> (Vidal’s side).</p>

      <div class="cp-grid c2"><div class="cp-card red"><div class="cp-card-title">🇩🇪 Friedrich Ratzel</div><b>Father of Political Geography and Human Geography</b>; book <b>Anthropogeography</b>; ideas identical with Darwin’s theory of evolution.</div><div class="cp-card blue"><div class="cp-card-title">🇫🇷 Vidal de la Blache</div>French geographer; founder of <b>Possibilism</b>; considered the <b>real founder of Human Geography</b>.</div></div>

      <table><thead><tr><th>Ratzel’s ideas</th><th>Meaning</th></tr></thead><tbody><tr><td>Lebensraum</td><td>Living space — the geographical region where different species evolve</td></tr><tr><td>State as an organism</td><td>He compared the state with a living organism</td></tr><tr><td>Expansion of boundary</td><td>A need to fulfil natural biological need</td></tr></tbody></table>

      <div class="cp-vs"><div class="good"><h4>✅ Ratzel</h4>Political Geography + Anthropogeography + Lebensraum.</div><div class="bad"><h4>✅ Vidal</h4>Possibilism + “real founder” of Human Geography.</div></div>

      <div class="cp-note trap">Both are linked with “Human Geography” — Ratzel as <b>Father</b>, Vidal as the <b>real founder</b>. Read the exact words of the question.</div>

      <div class="cp-note exam">Fixed pairs: Anthropogeography → Ratzel, Lebensraum → Ratzel, Possibilism → Vidal.</div>

      <div class="cp-mnemonic"><b>R</b>atzel = <b>R</b>ule of the state (Political); <b>V</b>idal = <b>V</b>arious possibilities (Possibilism).</div>

      <div class="cp-chips"><span>Ratzel</span><span>Anthropogeography</span><span>Lebensraum</span><span>Possibilism</span></div>
    `
  },

  /* ─────────── 66 · QUESTION · RATVID ─────────── */
  66: {
    questext: "Who is considered the Father of Political Geography and Human Geography and wrote “Anthropogeography”?",
    options: ["Vidal de la Blache", "Mackinder", "Carl Sauer", "Ratzel"],
    correct: "4",
    exptext: "✅ Ratzel wrote Anthropogeography. 📌 Ratzel = Political + Human Geography. ❌ Vidal founded Possibilism, Mackinder gave the Heartland Theory, and Sauer is the Father of Cultural Geography.",
  },

  /* ─────────── 67 · QUESTION · RATVID ─────────── */
  67: {
    questext: "Possibilism was founded by:",
    options: ["Ratzel", "Vidal de la Blache", "Herbertson", "Humboldt"],
    correct: "2",
    exptext: "✅ Vidal de la Blache, a French geographer, founded Possibilism. 📌 Possibilism = Vidal. ❌ Ratzel’s view is the opposite, Herbertson studied regions, and Humboldt wrote Cosmos.",
  },

  /* ─────────── 68 · QUESTION · RATVID ─────────── */
  68: {
    questext: "The concept of “Lebensraum” is associated with:",
    options: ["Mackinder", "Vidal de la Blache", "Ratzel", "Sauer"],
    correct: "3",
    exptext: "✅ Ratzel is the father of the Lebensraum concept. 📌 Lebensraum = living space. ❌ Mackinder gave the Heartland Theory, Vidal the Possibilism, and Sauer the Cultural Geography.",
  },

  /* ─────────── 69 · QUESTION · RATVID ─────────── */
  69: {
    questext: "Which of the following statements about Ratzel is NOT correct?",
    options: ["He founded Possibilism", "He compared the state with a living organism", "His ideas were similar to Darwin’s theory of evolution", "He wrote the book Anthropogeography"],
    correct: "1",
    exptext: "✅ Possibilism was founded by Vidal de la Blache. 📌 Ratzel = organism state + Darwin + Anthropogeography. ❌ The other three statements are true about Ratzel.",
  },

  /* ─────────── 70 · QUESTION · RATVID ─────────── */
  70: {
    questext: "Vidal de la Blache is considered the real founder of:",
    options: ["Political Geography", "Cultural Geography", "Natural Geography", "Human Geography"],
    correct: "4",
    exptext: "✅ Vidal is the real founder of Human Geography. 📌 Ratzel = Father of Human Geography, Vidal = real founder. ❌ Political Geography is Ratzel’s, Cultural Geography is Sauer’s, and Natural regions are Herbertson’s.",
  },

  /* ─────────── 71 · CONCEPT PAGE · MACK ─────────── */
  71: {
    type: "concept",
    icon: "🌐",
    accent: "#0d9488",
    pauseTimer: true,
    title: "Mackinder’s Heartland Theory",
    html: `
      <p class="cp-lead">The British geographer <b>Mackinder</b> gave the famous <u>Heartland Theory</u> — a simple chain of control that links <b>Eastern Europe</b> to the <b>whole world</b>.</p>

      <div class="cp-stats"><div class="cp-stat"><b>Mackinder</b><span>British geographer</span></div><div class="cp-stat"><b>Heartland</b><span>Theory</span></div><div class="cp-stat"><b>1919</b><span>Book year</span></div><div class="cp-stat"><b>3 steps</b><span>Chain of control</span></div></div>

      <div class="cp-divider">The chain of control</div>

      <ol class="cp-steps"><li>One who rules <b>Eastern Europe</b> commands the <b>Heartland</b>.</li><li>One who rules the <b>Heartland</b> commands the <b>World-Island</b>.</li><li>One who rules the <b>World-Island</b> commands the <b>World</b>.</li></ol>

      <div class="cp-fig"><img src="images/dbd369b8-7210-4633-8a0b-a4657789ba50.png" alt="Nested zones: Eastern Europe, Heartland, World-Island and World" style="display:block;width:100%;max-width:320px;max-height:200px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Theory</td><td><b>The Heartland Theory</b></td></tr><tr><td>Famous book</td><td><b>Democratic Ideals and Reality</b> (1919)</td></tr><tr><td>Scholar</td><td>British geographer <b>Mackinder</b></td></tr></tbody></table>

      <div class="cp-note trap">The first step is <b>Eastern Europe → Heartland</b>; the words “Rimland” or “Sea power” belong to other theories.</div>

      <div class="cp-note exam">Typical items: theory name, book name, year 1919, and the first link “Eastern Europe → Heartland”.</div>

      <div class="cp-mnemonic"><b>E</b>ast Europe → <b>H</b>eartland → <b>W</b>orld-Island → <b>W</b>orld: <b>E-H-W-W</b>, “Eat Hot Waffles Weekly”.</div>

      <div class="cp-chips"><span>Mackinder</span><span>Heartland</span><span>1919</span></div>
    `
  },

  /* ─────────── 72 · QUESTION · MACK ─────────── */
  72: {
    questext: "Who gave the famous “Heartland Theory”?",
    options: ["Ratzel", "Mackinder", "Sauer", "Herbertson"],
    correct: "2",
    exptext: "✅ The British geographer Mackinder gave the Heartland Theory. 📌 Heartland = Mackinder. ❌ Ratzel is the Father of Political Geography, Sauer of Cultural Geography, and Herbertson is linked with Natural Regions.",
  },

  /* ─────────── 73 · QUESTION · MACK ─────────── */
  73: {
    questext: "Mackinder presented his ideas in the 1919 book titled:",
    options: ["Anthropogeography", "Cosmos", "Democratic Ideals and Reality", "Geographica"],
    correct: "3",
    exptext: "✅ The 1919 book is Democratic Ideals and Reality. 📌 1919 + Heartland = Mackinder’s book. ❌ Anthropogeography is Ratzel’s book, Cosmos is Humboldt’s, and Geographica is Eratosthenes’ treatise.",
  },

  /* ─────────── 74 · QUESTION · MACK ─────────── */
  74: {
    questext: "According to Mackinder, one who rules Eastern Europe commands the:",
    options: ["Heartland", "World-Island", "World", "Rimland"],
    correct: "1",
    exptext: "✅ Rule of Eastern Europe leads to command of the Heartland. 📌 Order: Eastern Europe → Heartland → World-Island → World. ❌ World-Island and World come later in the chain, and Rimland belongs to another theory.",
  },

  /* ─────────── 75 · CONCEPT PAGE · SAUHER ─────────── */
  75: {
    type: "concept",
    icon: "🌿",
    accent: "#7c3aed",
    pauseTimer: true,
    title: "Sauer &amp; Herbertson",
    html: `
      <p class="cp-lead">Two more titles to finish: <b>Carl Ortwin Sauer</b> for <u>Cultural Geography</u> and <b>Herbertson</b> for <u>Natural Regions</u>.</p>

      <div class="cp-grid c2"><div class="cp-card teal"><div class="cp-card-title">🇺🇸 Carl Ortwin Sauer</div>American geographer; the <b>Father of Cultural Geography</b>.</div><div class="cp-card green"><div class="cp-card-title">🇬🇧 Herbertson</div>British geographer; divided the world into <b>15 Natural Regions</b> on the basis of the mutual relation between <u>physical features, climate and vegetation</u>.</div></div>

      <table><thead><tr><th>Name</th><th>Title / Work</th></tr></thead><tbody><tr><td>Carl Ortwin Sauer</td><td>Father of Cultural Geography</td></tr><tr><td>Herbertson</td><td>15 Natural Regions; first person who studied Natural Geography in this way</td></tr></tbody></table>

      <div class="cp-note trap">Sauer is <b>Cultural</b>, Ratzel is <b>Political + Human</b>, Humboldt is <b>Modern</b>. Match the adjective, not just the surname.</div>

      <div class="cp-note exam">Numbers help: <b>15</b> Natural Regions = Herbertson.</div>

      <div class="cp-mnemonic"><b>S</b>auer = <b>S</b>ociety and culture; <b>H</b>erbertson = <b>H</b>abitat regions (15).</div>

      <div class="cp-chips"><span>Sauer</span><span>Cultural Geography</span><span>Herbertson</span><span>15 Natural Regions</span></div>
    `
  },

  /* ─────────── 76 · QUESTION · SAUHER ─────────── */
  76: {
    questext: "American geographer Carl Ortwin Sauer is considered the Father of:",
    options: ["Political Geography", "Vegetation Geography", "Climatology", "Cultural Geography"],
    correct: "4",
    exptext: "✅ Sauer is the Father of Cultural Geography. 📌 Sauer = Cultural. ❌ Political Geography is Ratzel’s, and Vegetation Geography and Climatology are Humboldt’s.",
  },

  /* ─────────── 77 · QUESTION · SAUHER ─────────── */
  77: {
    questext: "Which British geographer divided the world into 15 Natural Regions on the basis of physical features, climate and vegetation?",
    options: ["Mackinder", "Herbertson", "Sauer", "Varenius"],
    correct: "2",
    exptext: "✅ Herbertson divided the world into 15 Natural Regions. 📌 15 = Herbertson. ❌ Mackinder gave the Heartland Theory, Sauer is American, and Varenius laid the Systematic–Regional dichotomy.",
  }

};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     images/7923164c-d005-4555-8441-82ffb6252e9a.png → ENTRY 1 (class overview, "thumb" field) — not numbered
     images/db750dfa-738e-4d03-8a93-979f40200471.png         → concept page "The Word Geography & Eratosthenes" (Eratosthenes measuring the Earth)
     images/dbd369b8-7210-4633-8a0b-a4657789ba50.png         → concept page "Mackinder's Heartland Theory" (nested zones: Eastern Europe, Heartland, World-Island, World)

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name)
   images/7923164c-d005-4555-8441-82ffb6252e9a.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920×1080 px, ultra-sharp, vibrant cinematic 3D illustration in deep indigo, violet and electric-blue tones (accent #6366f1) with warm gold highlights. Dark edges and a bright soft glow behind the right-centre of the frame, where a teacher's photo will be placed later. Spread a few soft, glowing, slightly blurred decorative 3D elements around the frame, mostly behind the right side: a glossy blue-and-green globe, an antique brass astrolabe, a compass, a rolled old parchment map with no readable writing, a telescope and a small sailing-ship silhouette. Keep the LEFT 62% of the frame calm, darker and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image. Clean, most beautiful, colorful, professional, high-contrast composition.
   images/db750dfa-738e-4d03-8a93-979f40200471.png: Create a clean flat-vector educational diagram, 16:9 landscape, 1200x675 px, on a dark navy background (#0f172a), no people, no logos, no watermarks. Show a large blue circle (the Earth) in the middle with two small bright dots on its surface, labelled exactly "SYENE" (upper dot) and "ALEXANDRIA" (lower dot). From the top draw several parallel yellow lines labelled exactly "SUN RAYS" hitting the Earth. At ALEXANDRIA draw a short vertical stick with a short shadow and a small arc labelled exactly "7.2°". Use only these four labels, VERY LARGE bold white text, thick lines and simple shapes so it stays readable when shown small.
   images/dbd369b8-7210-4633-8a0b-a4657789ba50.png: Create a clean flat-vector schematic diagram (not a map), 16:9 landscape, 1200x675 px, on a dark navy background (#0f172a), no people, no logos, no watermarks. Draw three nested rounded shapes: the innermost gold shape labelled exactly "HEARTLAND", the middle teal shape labelled exactly "WORLD-ISLAND", the outer blue shape labelled exactly "WORLD". Add one thick arrow coming from outside the left edge of the Heartland shape, labelled exactly "EASTERN EUROPE". Use only these four labels, VERY LARGE bold white text, thick lines and simple shapes so it stays readable when shown small.

   CHANGE LOG  (corrections / additions made silently in the pages)
     1. Hipparchus: "Assyrian mathematics" written as Babylonian mathematics; the astrolabe is written as "credited" to him.
     2. Ptolemy: described as a scholar of the Roman era (he worked in Alexandria); "Great Ages of Discoveries (14th and 15th century)" written simply as the Age of Discovery.
     3. Strabo: dates 64 BC - 36 AD written as 64 BC - about 24 AD; "Roman geographer" not repeated. "Considered the Earth oblong" kept as the exam-standard statement (Strabo's oblong shape actually describes the inhabited world).
     4. Pliny: "Historia Naturalis" shown as Naturalis Historia (also written Historia Naturalis).
     5. Dark Age: kept as about 300-1200 AD as in the book (other sources give a shorter span).
     6. Rig Veda: "oldest text in the world" written as one of the oldest texts; "Indian astrology" written as astronomy/astrology (Jyotisha). "Five seasons" kept as in the book.
     7. Aryabhatta: the "Bhugol" line is worded as "first used in the Surya Siddhanta" (the book credits it to Aryabhatta's book, but Surya Siddhanta is an older text); added the 24,901 - 24,835 = 66 miles working.
     8. Varahamihira: "astrological treatise" written as treatise on astronomy; spellings Vaashist, Paitamah, Polas, Saur, Romac corrected to Vasishtha, Paitamaha, Paulisha, Saura, Romaka.
     9. Brahmagupta: "Khand Kavya" corrected to Khandakhadyaka; Brahma Siddhanta shown with its full name Brahmasphutasiddhanta. Translation at Baghdad under Harun-al-Rashid kept as in the book.
    10. Bhaskaracharya: Karanakutuhal and Bijaganit kept in the book's spellings (also written Karanakutuhala and Bijaganita).
    11. Mahendra Malai: "eastern coast" written as eastern part (coast and Eastern Ghats).
    12. Ujjain: added the note that it lies close to the Tropic of Cancer.
    13. Higgs: "Boson thery" corrected to Boson theory; named Peter Higgs; added the 2012 CERN confirmation and the 2013 Nobel Prize.
    14. Baitul Hikma: added the English name House of Wisdom.
    15. Al-Khwarizmi: dates 813-883 AD corrected to about 780-850 AD.
    16. Caliph Al-Mamun: "1813 AD" corrected to reign from 813 AD.
    17. Al-Baruni corrected to Al-Biruni; "Kitab-al-Hind (Geography of India)" written simply as Kitab-al-Hind.
    18. Marco Polo: "Mediterranean to Pacific Ocean" explained as the Mediterranean side of Europe to the Pacific coast of Asia.
    19. Columbus: "Geneva" corrected to Genoa; added 1492.
    20. Amerigo Vespucci: "Portuguese traveller" not repeated (he was Italian-born).
    21. Magellan: "1520 AD" corrected to the expedition of 1519-1522.
    22. Tasman: "Holland" written as Dutch.
    23. Cook and Amundsen: the sentence "He also discovered the Hawaiian Islands" belongs to Cook, not Amundsen; Amundsen reached the South Pole in 1911.
    24. Printing press: "about 1470 AD" written as 15th century; Telescope written as "telescope (for astronomy) - Galileo, 1609".
    25. Verenius corrected to Varenius.
    26. Humboldt: the claim that he coined the terms Climatology and Permafrost is not repeated (permafrost was named later); his Climatology contribution is kept through his titles and isotherms.
    27. Ratzel: Lebensraum explained as "living space"; added the two theories Determinism and Possibilism.
    28. Mackinder: the long quotation replaced by the standard chain Eastern Europe - Heartland - World-Island - World.
    29. Herbertson: "first person who studied Natural Geography" kept only in the table in softer wording; 15 Natural Regions kept.
    30. Eratosthenes: added the one-line meaning of Geodesy and the shadow-method explanation.
   ════════════════════════════════════════════════════════════════ */
