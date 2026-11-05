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
   UNIVERSE, GALAXY, BIG BANG THEORY & HIGGS BOSON — concept pages mixed in between questions
   Register it in portalData.js like any other test (file: "Universe_Galaxy_Big_Bang_Higgs_Boson").
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

     thumb : "444e9f79-776c-47d8-a079-f52d51ea904a.png"                      (image link, file next to index.html)
             or { image, banner, line1, line2, line3, person, logo, badge, ribbon, burst:"", mode:"creator"|"pro"|"image" }
             mode "creator" = teacher-style thumbnail: red top banner (banner), white line1, big gold line2,
             cyan line3, teacher cut-out photo on the right, round channel logo top-right.
             Teacher photo + logo: put images/person.png (transparent PNG) and images/logo.png next to index.html, OR just pick them
             inside the studio once (they are remembered in the browser and reused for every chapter).
             "pro" mode uses badge / ribbon instead. Keep burst:"" (empty) so no star sticker is drawn; the blank premium emblem is part of the background image instead.
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
    title: "Class Overview — What We Will Learn Today",

    thumb: {
      image: "images/444e9f79-776c-47d8-a079-f52d51ea904a.png",
      banner: "ALL COMPETITIVE EXAMS",
      line1: "GEOGRAPHY",
      line2: "BIG BANG",
      line3: "UNIVERSE & GALAXY",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Universe, Galaxy, Big Bang Theory & Higgs Boson | Competitive Exams Geography",
      altTitles: [
        "Big Bang Theory & Who Proposed What | Competitive Exams Geography",
        "Higgs Boson (God Particle) in 1 Class | Competitive Exams General Science",
        "Universe & Galaxy: Milky Way, Andromeda, Dwarf Galaxy | Competitive Exams",
        "Origin of the Universe Full Class with Practice Questions | SSC UPSC Railways"
      ],
      description:
"The origin of the universe is a small topic that gives you sure-shot marks in Competitive Exams — in this class you learn every fact the exam asks, with simple reasons and memory tricks.\n\n" +
"📌 IN THIS CLASS\n" +
"✅ Universe: meaning, Cosmology and how atoms and gas clouds formed\n" +
"✅ Galaxy: Milky Way, Andromeda, Dwarf Galaxy and the number of stars\n" +
"✅ Big Bang Theory: Georges Lemaître and the 4 theories with their proposers\n" +
"✅ Higgs Boson (God Particle), CERN and the Large Hadron Collider\n" +
"✅ Classic traps and a memory trick for every theory\n" +
"✅ 20 practice questions right after the concepts\n\n" +
"⏱️ CHAPTERS\n" +
"00:00 Class overview\n00:00 Universe\n00:00 Practice: Universe\n00:00 Galaxy\n00:00 Practice: Galaxy\n00:00 The Big Bang Theory\n00:00 Practice: Big Bang Theory\n00:00 Higgs Boson\n00:00 Practice: Higgs Boson\n\n" +
"👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n" +
"#Geography #Universe #BigBang #HiggsBoson #CompetitiveExams",
      tags: [
        "universe", "galaxy", "big bang theory", "higgs boson",
        "god particle", "large hadron collider", "CERN", "milky way galaxy",
        "andromeda galaxy", "georges lemaitre", "steady state theory", "pulsating universe theory",
        "inflationary theory", "origin of universe", "geography for competitive exam", "lucent gk geography",
        "SSC geography", "UPSC geography", "railway geography", "competitive exams preparation",
        "universe and galaxy", "dwarf galaxy", "cosmology", "general science",
        "big bang theory proposers", "SSC CGL geography universe", "space sciences"
      ],
      hashtags: ["Geography", "Universe", "BigBang", "HiggsBoson", "CompetitiveExams"],
      thumbText: "BIG BANG + UNIVERSE + HIGGS BOSON",
      pinnedComment: "📌 Practice what you learned: solve the 20 questions in the class, then write your score below. Which theory proposer was hardest to remember — Lemaître, Hoyle, Sandage or Guth? 👇",
      communityPost: "🌌 New class is live: Universe, Galaxy, Big Bang Theory & Higgs Boson — every exam fact, memory tricks and 20 practice questions for Competitive Exams. Tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Universe\n00:00 Practice: Universe\n00:00 Galaxy\n00:00 Practice: Galaxy\n00:00 The Big Bang Theory\n00:00 Practice: Big Bang Theory\n00:00 Higgs Boson\n00:00 Practice: Higgs Boson",
      playlist: "Competitive Exams Geography — Universe & Solar System"
    },

    html: `
      <p class="cp-lead">Today's class is a <u>fast-track on the Universe</u> — what it is, how it began, and the
      one particle scientists chased for 50 years. These four small topics give <b>sure-shot one-line facts</b>
      in every Competitive Exam.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>4</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>30+</b><span>Key facts</span></div>
        <div class="cp-stat"><b>20</b><span>Practice questions</span></div>
        <div class="cp-stat"><b>~20 min</b><span>Time needed</span></div>
      </div>

      <div class="cp-divider">Your roadmap</div>

      <ul class="cp-timeline">
        <li><b>Universe</b><br>Meaning, Cosmology and how atoms and gas clouds appeared.</li>
        <li><b>Practice</b> — 4 questions on the universe.</li>
        <li><b>Galaxy</b><br>Milky Way, Andromeda, Dwarf Galaxy and the star count.</li>
        <li><b>Practice</b> — 5 questions on galaxies.</li>
        <li><b>The Big Bang Theory</b><br>Georges Lemaître and the four theories with their proposers.</li>
        <li><b>Practice</b> — 6 questions on the Big Bang and the other theories.</li>
        <li><b>Higgs Boson</b><br>CERN, the Large Hadron Collider and the “God Particle”.</li>
        <li><b>Practice</b> — 5 questions on the Higgs Boson.</li>
      </ul>

      <div class="cp-divider">What you will be able to do</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🌌 Define the universe</div>Explain what the universe contains and what Cosmology studies.</div>
        <div class="cp-card violet"><div class="cp-card-title">🌀 Know our galaxy</div>Tell the Milky Way from Andromeda and quote the star-count figures.</div>
        <div class="cp-card amber"><div class="cp-card-title">💥 Match theories</div>Match Big Bang, Steady State, Pulsating and Inflationary theories to their proposers.</div>
        <div class="cp-card teal"><div class="cp-card-title">⚛️ Explain the Higgs Boson</div>Say where it was found, when it was announced and why it is called the God Particle.</div>
      </div>

      <div class="cp-note exam"><b>Why it matters:</b> questions such as “Who proposed the Big Bang Theory?” and
      “What is the God Particle?” are repeated in SSC, UPSC, Banking, Railways and Defence exams.</div>

      <div class="cp-note tip">Read each concept page fully, then attempt the questions right after it.
      The exam clock pauses on concept pages, so take your time.</div>

      <div class="cp-chips"><span>Competitive Exams</span><span>Geography</span><span>Universe</span><span>Big Bang</span><span>Higgs Boson</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE ─────────── */
  2: {
    type: "concept",
    icon: "🌌",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Universe",
    html: `
      <p class="cp-lead">The universe is <u>everything that exists</u> — all matter, all energy, every planet, star and galaxy,
      and even the empty space between galaxies. Nothing is “outside” it.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>Cosmology</b><span>Study of the universe</span></div>
        <div class="cp-stat"><b>Big Bang</b><span>Origin theory</span></div>
        <div class="cp-stat"><b>13.8 bn</b><span>Years old</span></div>
        <div class="cp-stat"><b>2</b><span>Parts (book view)</span></div>
      </div>

      <div class="cp-divider">1 · What does the universe contain?</div>

      <div class="cp-grid c3">
        <div class="cp-card blue"><div class="cp-card-title">⚛️ Matter</div>Everything physical — planets, stars, dust and gas.</div>
        <div class="cp-card amber"><div class="cp-card-title">⚡ Energy</div>Light, heat and every other form of energy.</div>
        <div class="cp-card violet"><div class="cp-card-title">🌠 Galaxies &amp; space</div>Billions of galaxies and the vast intergalactic space between them.</div>
      </div>

      <div class="cp-formula" translate="no">
        <small>Meaning of the word</small>
        Cosmology = cosmos (universe) + logos (science)
      </div>

      <div class="cp-note remember">Cosmology is the <u>study of the whole universe</u> — its origin, structure and future.</div>

      <div class="cp-fig"><img src="images/824f0f7a-bedf-485e-86cd-14643cc6222c.png" alt="Scale ladder: Earth, Solar System, Milky Way, Universe" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

      <div class="cp-divider">2 · How did matter form after the beginning?</div>

      <ol class="cp-steps">
        <li>The universe was born in the <b>Big Bang</b>.</li>
        <li>After its birth, <b>atoms</b> came into existence.</li>
        <li>With these atoms, <b>dust and clouds of gases</b> formed.</li>
        <li>Over time these clouds gathered into <b>stars and galaxies</b>.</li>
      </ol>

      <div class="cp-note info">Some books divide the universe into two parts: <b>(a) Atmosphere</b> and <b>(b) Space</b>.</div>

      <div class="cp-note trap"><b>Cosmology</b> studies the universe as a whole. <b>Cosmography</b> only describes or maps it, and <b>Cartography</b> is map-making.</div>
      <div class="cp-note exam">Exams love the one-liner: <u>“Study of the universe is called Cosmology.”</u></div>
      <div class="cp-mnemonic"><b>COSMOS</b> = whole universe → <b>COSMO</b>logy = study of the whole universe</div>

      <details class="cp-collapse">
        <summary>Why do we say “space” and “universe” are not the same?</summary>
        <p>Space is only the empty region between objects. The <u>universe</u> is bigger: it includes space <i>plus</i> all the matter and energy inside it.</p>
      </details>

      <div class="cp-chips"><span>Geography</span><span>Cosmology</span><span>Universe</span><span>One-liner facts</span></div>
`
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "The scientific study of the universe as a whole is known as:",
    options: ["Cosmography", "Cosmology", "Cartography", "Selenology"],
    correct: "2",
    exptext: "✅ Cosmology — it comes from cosmos (universe) + logos (science). 📌 Cosmos = whole universe, so COSMOlogy = study of the whole universe. ❌ Cosmography only describes or maps the universe, Cartography is map-making and Selenology is the study of the Moon.",
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "Consider the following statements about the universe:\n1. It includes all matter, energy, planets, stars and galaxies.\n2. The word Cosmology comes from cosmos (universe) and logos (science).\n3. Atoms came into existence after the birth of the universe.\nWhich of the statements given above are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three statements are correct. 📌 Universe = everything that exists; atoms came first, then dust and gas clouds. ❌ Options with “only” leave out one true statement.",
  },

  /* ─────────── 5 · QUESTION ─────────── */
  5: {
    questext: "According to the classification given in the book, the universe can be divided into two parts, namely:",
    options: ["Atmosphere and Space", "Land and Water", "Galaxies and Stars", "Matter and Energy"],
    correct: "1",
    exptext: "✅ Atmosphere and Space. 📌 Remember “A and S”. ❌ Matter and Energy is a tempting pair because the universe does contain both, but it is not the classification asked here.",
  },

  /* ─────────── 6 · QUESTION ─────────── */
  6: {
    questext: "Arrange the following in the increasing order of size:\n1. Solar System\n2. Milky Way Galaxy\n3. Universe\n4. Earth",
    options: ["1-4-2-3", "2-1-4-3", "4-1-2-3", "4-2-1-3"],
    correct: "3",
    exptext: "✅ 4-1-2-3 (Earth → Solar System → Milky Way Galaxy → Universe). 📌 Each one sits inside the next bigger one, like Russian dolls. ❌ The Milky Way holds the Solar System, so it cannot come before it.",
  },

  /* ─────────── 7 · CONCEPT PAGE ─────────── */
  7: {
    type: "concept",
    icon: "🌀",
    accent: "#a855f7",
    pauseTimer: true,
    title: "Galaxy",
    html: `
      <p class="cp-lead">A galaxy is a <u>giant family of billions of stars</u>, held together by gravity, along with gas clouds
      (mainly hydrogen) and dust. Each galaxy floats alone in space, far from similar systems.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>10<sup>11</sup></b><span>Galaxies (about 100 billion)</span></div>
        <div class="cp-stat"><b>10<sup>11</sup></b><span>Stars in each galaxy</span></div>
        <div class="cp-stat"><b>10<sup>22</sup></b><span>Stars in the universe</span></div>
        <div class="cp-stat"><b>Spiral</b><span>Shape of the Milky Way</span></div>
      </div>

      <div class="cp-divider">1 · What is inside a galaxy?</div>

      <div class="cp-grid c3">
        <div class="cp-card amber"><div class="cp-card-title">⭐ Stars</div>Billions of them — about 100 billion on average.</div>
        <div class="cp-card blue"><div class="cp-card-title">☁️ Gas clouds</div>Mainly hydrogen gas.</div>
        <div class="cp-card pink"><div class="cp-card-title">✨ Dust</div>Tiny solid grains between the stars.</div>
      </div>

      <div class="cp-formula" translate="no">
        <small>Counting the stars</small>
        10¹¹ galaxies × 10¹¹ stars = 10²² stars
      </div>

      <div class="cp-divider">2 · Galaxies you must know</div>

      <table>
        <thead><tr><th>Galaxy</th><th>Key fact</th></tr></thead>
        <tbody>
          <tr><td><b>Milky Way</b></td><td>Home of the Earth and the Solar System; <u>spiral</u> in shape</td></tr>
          <tr><td><b>Andromeda</b></td><td>Our <u>nearest</u> large spiral galaxy</td></tr>
          <tr><td><b>Dwarf Galaxy</b></td><td>Called the “latest known galaxy” in exam books</td></tr>
        </tbody>
      </table>

      <div class="cp-note info">The first person to see the Milky Way's countless stars through a telescope was <b>Galileo Galilei</b> (1610).</div>

      <div class="cp-vs">
        <div class="good"><h4>✅ Milky Way</h4>The galaxy we <b>live in</b></div>
        <div class="bad"><h4>❌ Andromeda</h4>The <b>nearest large</b> galaxy next door — not our home</div>
      </div>

      <div class="cp-note trap">The number <b>10²²</b> is the count of <u>stars</u>, not of galaxies. Galaxies are only about <b>10¹¹</b>.</div>
      <div class="cp-note exam">“First person to see the Milky Way” → <b>Galileo</b>. “Nearest galaxy” → <b>Andromeda</b>.</div>
      <div class="cp-mnemonic"><b>M</b>ilky Way = <b>M</b>y home · <b>A</b>ndromeda = <b>A</b>cross the street</div>

      <details class="cp-collapse">
        <summary>Why is it called “Milky” Way?</summary>
        <p>From Earth, the stars of our galaxy look like a pale, <u>milk-coloured band</u> across the night sky.</p>
      </details>

      <div class="cp-chips"><span>Geography</span><span>Galaxy</span><span>Milky Way</span><span>Andromeda</span></div>
`
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "The Milky Way Galaxy, the home of our Solar System, is ______ in shape.",
    options: ["Elliptical", "Irregular", "Spiral", "Lenticular"],
    correct: "3",
    exptext: "✅ Spiral — the Milky Way is a spiral galaxy. 📌 Home galaxy = spiral. ❌ Elliptical, irregular and lenticular are other galaxy shapes, but not the Milky Way's.",
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "Who was the first person to see the Milky Way galaxy through a telescope?",
    options: ["Galileo Galilei", "Nicolaus Copernicus", "Johannes Kepler", "Isaac Newton"],
    correct: "1",
    exptext: "✅ Galileo Galilei, who saw that it is made of countless stars. 📌 Telescope + first = Galileo. ❌ Copernicus proposed the Sun-centred model, Kepler gave the laws of planetary motion and Newton gave gravity.",
  },

  /* ─────────── 10 · QUESTION ─────────── */
  10: {
    questext: "Which of the following is the nearest large spiral galaxy to our Milky Way?",
    options: ["Whirlpool Galaxy", "Sombrero Galaxy", "Cartwheel Galaxy", "Andromeda Galaxy"],
    correct: "4",
    exptext: "✅ Andromeda Galaxy. 📌 Andromeda = Across the street. ❌ Whirlpool, Sombrero and Cartwheel are real galaxies, but they are much farther away.",
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "Consider the following statements:\n1. On average, each galaxy has about 100 billion stars.\n2. The total number of galaxies in the universe is about 10²².\n3. The Milky Way is spiral in shape.\nWhich of the statements given above are correct?",
    options: ["1 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ 1 and 3 only. 📌 Galaxies ≈ 10¹¹ and stars ≈ 10²². ❌ Statement 2 is wrong because 10²² is the number of stars, not galaxies.",
  },

  /* ─────────── 12 · QUESTION ─────────── */
  12: {
    questext: "According to the book, the total number of stars in the universe is about:",
    options: ["10²² stars", "10¹¹ stars", "10⁸ stars", "10³³ stars"],
    correct: "1",
    exptext: "✅ 10²² stars. 📌 100 billion galaxies × 100 billion stars = 10¹¹ × 10¹¹ = 10²². ❌ 10¹¹ is the number of galaxies (and of stars per galaxy) — it is not the total.",
  },

  /* ─────────── 13 · CONCEPT PAGE ─────────── */
  13: {
    type: "concept",
    icon: "💥",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "The Big Bang Theory",
    html: `
      <p class="cp-lead">The Big Bang Theory says the universe began as a <u>tiny, extremely dense lump</u> called the
      <b>primeval atom</b>. Then a gigantic explosion — the Big Bang — spread everything outward, and the universe is still expanding.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>13.8 bn</b><span>Years ago</span></div>
        <div class="cp-stat"><b>Lemaître</b><span>Proposer</span></div>
        <div class="cp-stat"><b>Primeval</b><span>Atom (the lump)</span></div>
        <div class="cp-stat"><b>4</b><span>Origin theories</span></div>
      </div>

      <div class="cp-divider">1 · The story in four steps</div>

      <ol class="cp-steps">
        <li>All the matter was packed in one concentrated lump — the <b>primeval atom</b>.</li>
        <li>About <b>13.8 billion years ago</b> it exploded: the <b>Big Bang</b>.</li>
        <li>The explosion led to the formation of <b>galaxies of stars</b> and other cosmic bodies.</li>
        <li>Since then, the galaxies have been <b>flying away</b> from one another, so the universe <u>keeps expanding</u>.</li>
      </ol>

      <div class="cp-fig"><img src="images/6dd07b0d-799e-4463-9471-5d52cec5a2fb.png" alt="Big Bang expanding into atoms, gas clouds and galaxies" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

      <div class="cp-note remember">Think of a balloon with dots drawn on it. When you blow it up, every dot moves away from every other dot — that is how galaxies move.</div>

      <div class="cp-divider">2 · Theories regarding the origin of the universe</div>

      <table>
        <thead><tr><th>Theory</th><th>Proponent</th></tr></thead>
        <tbody>
          <tr><td><b>Big Bang Theory</b></td><td>Georges Lemaître</td></tr>
          <tr><td><b>Steady State Theory</b></td><td>Thomas Gold and Hermann Bondi</td></tr>
          <tr><td><b>Pulsating Universe Theory</b></td><td>Dr. Allan Sandage</td></tr>
          <tr><td><b>Inflationary Theory</b></td><td>Alan H. Guth</td></tr>
        </tbody>
      </table>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">Steady State</div>The universe has no beginning or end and always looks the same.</div>
        <div class="cp-card red"><div class="cp-card-title">Pulsating Universe</div>The universe expands and contracts again and again, like a heartbeat.</div>
      </div>

      <div class="cp-note info">Georges Lemaître was a <b>Belgian Roman Catholic priest</b>, physicist, astronomer and cosmologist.</div>

      <div class="cp-note trap">Do not mix up <b>Big Bang</b> (Lemaître) with <b>Inflationary</b> (Guth). Guth's idea is about a very rapid expansion <i>just after</i> the Big Bang.</div>
      <div class="cp-note exam">The most repeated question: <u>“Big Bang Theory was proposed by?”</u> → <b>Georges Lemaître</b>.</div>
      <div class="cp-mnemonic"><b>L</b>emaître lit the <b>B</b>ang · <b>G</b>old &amp; <b>B</b>ondi kept it <b>S</b>teady · <b>S</b>andage made it <b>P</b>ulse · <b>G</b>uth made it <b>I</b>nflate</div>

      <details class="cp-collapse">
        <summary>Who gave the name “Big Bang”?</summary>
        <p>The English astronomer <b>Fred Hoyle</b> used the words “Big Bang” in 1949, almost as a joke, because he supported the <u>Steady State</u> idea. The name stuck. In 1929 <b>Edwin Hubble</b> showed that galaxies are moving away, which strongly supported the theory.</p>
      </details>

      <div class="cp-chips"><span>Geography</span><span>Big Bang</span><span>Lemaître</span><span>Theories of origin</span></div>
`
  },

  /* ─────────── 14 · QUESTION ─────────── */
  14: {
    questext: "The Big Bang Theory was proposed by:",
    options: ["Edwin Hubble", "Georges Lemaître", "Fred Hoyle", "Alan H. Guth"],
    correct: "2",
    exptext: "✅ Georges Lemaître, a Belgian Roman Catholic priest and cosmologist. 📌 Lemaître lit the Bang. ❌ Hubble showed that galaxies are moving apart, Hoyle supported the Steady State idea, and Guth proposed Inflation.",
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "Match List-I (Theory) with List-II (Proponent):\nA. Big Bang Theory\nB. Steady State Theory\nC. Pulsating Universe Theory\nD. Inflationary Theory\n1. Alan H. Guth\n2. Allan Sandage\n3. Georges Lemaître\n4. Thomas Gold and Hermann Bondi",
    options: ["A-1, B-2, C-3, D-4", "A-3, B-2, C-4, D-1", "A-3, B-4, C-2, D-1", "A-2, B-1, C-4, D-3"],
    correct: "3",
    exptext: "✅ A-3, B-4, C-2, D-1. 📌 Lemaître lit the Bang; Gold & Bondi kept it Steady; Sandage made it Pulse; Guth made it Inflate. ❌ The other options swap the proposers of two theories.",
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "The Inflationary Theory of the origin of the universe was proposed by:",
    options: ["Fred Hoyle", "Allan Sandage", "Georges Lemaître", "Alan H. Guth"],
    correct: "4",
    exptext: "✅ Alan H. Guth. 📌 Guth made it Inflate. ❌ Lemaître is linked with the Big Bang, and Sandage with the Pulsating Universe.",
  },

  /* ─────────── 17 · QUESTION ─────────── */
  17: {
    questext: "The Big Bang is believed to have occurred about ______ ago.",
    options: ["13.8 billion years", "4.6 billion years", "1.38 billion years", "138 billion years"],
    correct: "1",
    exptext: "✅ About 13.8 billion years ago. 📌 Remember 13.8 — the age of the universe. ❌ 4.6 billion years is the age of the Earth, and the other two figures are far off.",
  },

  /* ─────────── 18 · QUESTION ─────────── */
  18: {
    questext: "Which of the following statements about the Big Bang is NOT correct?",
    options: ["All the matter was originally a concentrated lump called the primeval atom", "Since the explosion, galaxies have been moving away from one another", "The universe is contracting at present because of the Big Bang", "The explosion led to the formation of galaxies of stars and other cosmic bodies"],
    correct: "3",
    exptext: "✅ The statement about contraction is wrong — the universe is expanding. 📌 Big Bang → expansion (not contraction). ❌ The other three statements are correct. Contraction belongs to the Pulsating Universe idea.",
  },

  /* ─────────── 19 · QUESTION ─────────── */
  19: {
    questext: "Arrange the following events in the correct order:\n1. Atoms came into existence\n2. The Big Bang took place\n3. Dust and clouds of gases formed\n4. Galaxies of stars formed",
    options: ["2-3-1-4", "2-4-1-3", "1-2-3-4", "2-1-3-4"],
    correct: "4",
    exptext: "✅ 2-1-3-4 (Big Bang → atoms → dust and gas clouds → galaxies of stars). 📌 Bang → Atoms → Clouds → Galaxies. ❌ Atoms cannot exist before the Big Bang, and gas clouds are made from atoms.",
  },

  /* ─────────── 20 · CONCEPT PAGE ─────────── */
  20: {
    type: "concept",
    icon: "⚛️",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Higgs Boson",
    html: `
      <p class="cp-lead">The Higgs Boson is a tiny particle that scientists searched for about <u>50 years</u>.
      It is nicknamed the <b>“God Particle”</b> and helps us understand how particles get mass and how the universe took shape.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>27 km</b><span>LHC tunnel length</span></div>
        <div class="cp-stat"><b>≈100 m</b><span>Depth underground</span></div>
        <div class="cp-stat"><b>4 Jul 2012</b><span>Particle announced</span></div>
        <div class="cp-stat"><b>CERN</b><span>Geneva, Switzerland</span></div>
      </div>

      <div class="cp-divider">1 · The mega experiment</div>

      <div class="cp-grid c2">
        <div class="cp-card teal"><div class="cp-card-title">🏛️ Who</div><b>CERN</b> — the European Centre for Nuclear Research, in Geneva. Thousands of scientists took part.</div>
        <div class="cp-card blue"><div class="cp-card-title">🛠️ Where</div>The <b>Large Hadron Collider (LHC)</b>, a 27 km long tunnel about 100 m deep.</div>
        <div class="cp-card amber"><div class="cp-card-title">💫 How</div>Proton beams, moving almost at the speed of light, were collided head-on.</div>
        <div class="cp-card violet"><div class="cp-card-title">🎯 Why</div>To recreate, on a tiny scale, the conditions just after the <b>Big Bang</b>.</div>
      </div>

      <div class="cp-divider">2 · Dates to remember</div>

      <ul class="cp-timeline">
        <li><b>30 March 2010</b> — the historic experiment was successfully conducted at the LHC.</li>
        <li><b>4 July 2012</b> — CERN announced a particle almost the same as the Higgs Boson.</li>
        <li><b>14 February 2013</b> — the LHC was closed for upgrading.</li>
        <li><b>June 2015</b> — the LHC was restarted.</li>
      </ul>

      <div class="cp-divider">3 · Mysteries it helps to solve</div>

      <div class="cp-chips"><span>Dark matter</span><span>Dark energy</span><span>Extra dimensions</span><span>Higgs Boson</span><span>God Particle</span></div>

      <div class="cp-note info">The particle is named after <b>Peter Higgs</b>. The word <b>“boson”</b> honours the Indian physicist <b>Satyendra Nath Bose</b>. Peter Higgs and François Englert received the <b>Nobel Prize in Physics in 2013</b>.</div>

      <div class="cp-note trap">The LHC was <u>not closed for ever</u> on 14 February 2013. It was shut for upgrading and <b>restarted in June 2015</b>.</div>
      <div class="cp-note exam">Common questions: <b>“God Particle” = Higgs Boson</b>, <b>CERN is in Geneva</b>, <b>LHC tunnel = 27 km</b>.</div>
      <div class="cp-mnemonic"><b>H</b>iggs = <b>H</b>eavy-giver (gives mass) · <b>B</b>oson = <b>B</b>ose</div>

      <details class="cp-collapse">
        <summary>Why is it called the “God Particle”?</summary>
        <p>The nickname became popular after a physicist wrote a book on it. Most scientists dislike it, but it is <u>very common in exams</u>, so remember it.</p>
      </details>

      <div class="cp-chips"><span>Geography</span><span>Higgs Boson</span><span>CERN</span><span>LHC</span></div>
`
  },

  /* ─────────── 21 · QUESTION ─────────── */
  21: {
    questext: "The Large Hadron Collider (LHC), where the Higgs Boson experiment was carried out, is operated by CERN near which city?",
    options: ["Paris", "Geneva", "Berlin", "London"],
    correct: "2",
    exptext: "✅ Geneva (Switzerland). 📌 CERN = Centre in Geneva. ❌ Paris, Berlin and London are famous European science cities, but CERN is not there.",
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "The “God Particle” is the popular name of:",
    options: ["Neutrino", "Quark", "Photon", "Higgs Boson"],
    correct: "4",
    exptext: "✅ Higgs Boson. 📌 God Particle = Higgs Boson. ❌ Neutrino, quark and photon are real particles, but none is called the God Particle.",
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "The tunnel of the Large Hadron Collider is about ______ long.",
    options: ["27 km", "17 km", "40 km", "100 km"],
    correct: "1",
    exptext: "✅ 27 km. 📌 LHC = 27 km ring. ❌ 17 km and 40 km are look-alike distractors, and 100 (feet or metres) is the depth, not the length.",
  },

  /* ─────────── 24 · QUESTION ─────────── */
  24: {
    questext: "Consider the following statements:\n1. The historic LHC experiment was successfully conducted on 30 March 2010.\n2. CERN announced a particle almost the same as the Higgs Boson on 4 July 2012.\n3. The LHC was closed permanently on 14 February 2013.\nWhich of the statements given above are correct?",
    options: ["1 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ 1 and 2 only. 📌 The LHC was shut for upgrading in 2013 and restarted in June 2015. ❌ Statement 3 is wrong because the closure was not permanent.",
  },

  /* ─────────── 25 · QUESTION ─────────── */
  25: {
    questext: "The 2013 Nobel Prize in Physics for the theory linked to the Higgs Boson was shared by:",
    options: ["Peter Higgs and Satyendra Nath Bose", "Peter Higgs and François Englert", "Peter Higgs and Stephen Hawking", "François Englert and Albert Einstein"],
    correct: "2",
    exptext: "✅ Peter Higgs and François Englert. 📌 Higgs + Englert = 2013 Nobel. ❌ Bose gave his name to bosons but died long before 2013; Hawking and Einstein did not win for this.",
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     444e9f79-776c-47d8-a079-f52d51ea904a.png → ENTRY 1 (class overview, "thumb" field)  — not numbered
     824f0f7a-bedf-485e-86cd-14643cc6222c.png → ENTRY 2 (Universe — size ladder: Earth → Solar System → Milky Way → Universe)
     6dd07b0d-799e-4463-9471-5d52cec5a2fb.png → ENTRY 13 (The Big Bang Theory — expansion schematic)

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name)
   444e9f79-776c-47d8-a079-f52d51ea904a.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920×1080 px, ultra-sharp, in a premium, classic, refined editorial style (NOT cartoonish: no cartoon, toy-like, clip-art, comic or glossy cartoon-3D look). Deep midnight-navy and near-black base with a smooth, subtle indigo gradient (accent #6366f1) and restrained champagne-gold highlights; soft cinematic lighting with a gentle warm glow behind the right-centre of the frame, where a teacher's photo will be placed later; fine dark vignette on the edges, very subtle fine grain texture, realistic shallow depth of field. Place only 3 elegant, realistic, softly blurred objects mostly on the right and in the back: a faint realistic spiral galaxy glowing in indigo and gold, a thin gold-lined circular ring like a particle-collider tunnel, and one small brushed-metal sphere with natural reflections. Do NOT add any star, starburst or explosion sticker. Add ONE blank premium emblem: a refined, classic round seal with a thin champagne-gold rim, fine engraved double border and a smooth, completely EMPTY dark-navy centre with a faint glow, realistic brushed-metal / enamel finish, about 20% of the frame height, placed near the lower centre of the frame (about 60% from the left and 72% from the top) so I can write my own text inside it later. Keep the LEFT 62% of the frame calm, dark and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image (the emblem stays blank). Sophisticated, balanced, high-contrast, professional composition.
   824f0f7a-bedf-485e-86cd-14643cc6222c.png: Create a clean flat vector diagram on a dark navy background, 16:9, 1200×675 px, no people, no logos, no watermarks, no map. Four circles of clearly increasing size arranged left to right with thick arrows between them, each with ONE short English label in VERY LARGE bold white text under it: "EARTH", "SOLAR SYSTEM", "MILKY WAY", "UNIVERSE". Use thick lines, simple shapes and a restrained colour palette (blue, violet, gold). Very few labels so it stays readable when shown small.
   6dd07b0d-799e-4463-9471-5d52cec5a2fb.png: Create a clean flat vector diagram on a dark navy background, 16:9, 1200×675 px, no people, no logos, no watermarks, no map. On the left a small bright gold starburst labelled "BIG BANG"; from it a wide expanding cone opens to the right through three stages drawn as simple shapes with ONE short label each in VERY LARGE bold white text: "ATOMS", "GAS CLOUDS", "GALAXIES". Add a thick arrow along the cone labelled "EXPANDING". Thick lines, simple shapes, restrained colours (gold, orange, violet), very few labels so it stays readable when shown small.
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   CHANGE LOG (corrections and additions made to the book's content; none of these words appear inside the pages)
   1. Universe diameter: the book gives 10^8 light years. The page does not quote it, because the observable universe is estimated to be about 93 billion light years across.
   2. Age of the universe: the book gives 13.798 billion years; the page uses the rounded value 13.8 billion years. The Higgs section of the book says "15 billion years ago"; the page uses 13.8 billion years.
   3. Galaxy counts (10^11 galaxies, 10^11 stars per galaxy, 10^22 stars): kept as the standard exam figures from the book. Modern estimates of the number of galaxies are higher, so these are shown as "about" figures.
   4. Milky Way: the book says it formed 5 billion years after the Big Bang. This line was left out because the Milky Way's oldest stars are more than 13 billion years old. The book's "spiral" shape is kept (it is more precisely a barred spiral).
   5. Galileo: the book says he was the "first person to see" the Milky Way; the page adds "through a telescope (1610)" for accuracy.
   6. Andromeda: the book says "nearest galaxy"; the page says "nearest large spiral galaxy" (small dwarf galaxies are closer).
   7. Dwarf Galaxy: the book's line "Latest known galaxy is the Dwarf Galaxy" is kept only as exam wording; no other claim was added.
   8. Universe in two parts (Atmosphere and Space): kept as the book's classification; shown as "some books divide...".
   9. Theories table: "George Lamaitre" corrected to Georges Lemaître; "Herman Bondy" to Hermann Bondi; "Dr. Allen Sundes" to Allan Sandage. Steady State's idea, Pulsating idea and Inflation idea were explained in simple words (addition).
   10. Big Bang: added that the name was coined by Fred Hoyle (1949) and that Hubble's 1929 observation supported expansion (additions). "Primeval atom" kept from the book.
   11. LHC: the book says "100 feet deep"; corrected to about 100 m deep. "More than 1000 scientists" changed to "thousands of scientists". "Same velocity of light" changed to "almost the speed of light". Tunnel length 27 km kept.
   12. First LHC experiment date 30 March 2010 kept (first high-energy collisions); Higgs-like particle announcement on 4 July 2012 kept.
   13. LHC closure: the book says it was "closed" on 14 February 2013; the page says it was closed for upgrading (restart in June 2015 kept from the book).
   14. Higgs Boson naming (Peter Higgs; boson from S. N. Bose) and the 2013 Nobel Prize in Physics (Higgs and Englert) were added because they are frequent exam facts; question 5 of the Higgs section is based on them.
   15. "Dark matter, dark energy, extra dimension" listed as mysteries the experiment helps to study; "Higgs Boson and God Particle" shown separately as the particle itself, not a mystery.
   16. Out-of-scope content on the same pages (explorers, geographers, Star, Solar System, Heliocentrism, Sun) was ignored.
   ════════════════════════════════════════════════════════════════ */