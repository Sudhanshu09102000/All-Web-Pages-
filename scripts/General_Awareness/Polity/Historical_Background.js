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
   HISTORICAL BACKGROUND — concept pages mixed in between questions
   Register it in portalData.js like any other test (file: "Historical_Background").
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

     thumb : "images/<Field>/<Subject>/<Chapter_Name>/thumbnail.png"   (image link, relative to index.html)
             or { image, banner, line1, line2, line3, person, logo, badge, ribbon, burst:"", mode:"creator"|"pro"|"image" }
             mode "creator" = teacher-style thumbnail: red top banner (banner), white line1, big gold line2,
             cyan line3, teacher cut-out photo on the right, round channel logo top-right.
             Teacher photo + logo: put images/person.png (transparent PNG) and images/logo.png next to index.html, OR just pick them
             inside the studio once (they are remembered in the browser and reused for every chapter).
             "pro" mode uses badge / ribbon instead. Keep burst:"" (empty) so no star sticker is drawn; the blank premium emblem is part of the background image instead.
     yt    : { title, altTitles:[], description, tags:[] (join(", ") length = exactly 500), hashtags:[], pinnedComment,
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
    accent: "#d97706",
    pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",

    /* 🎬 tap the 🎯 icon on this page → thumbnail studio + YouTube kit */
    thumb: {
      "image": "images/General_Awareness/Polity/Historical_Background/thumbnail.png",
      "banner": "COMPETITIVE EXAMS 2026",
      "line1": "INDIAN POLITY",
      "line2": "ALL ACTS",
      "line3": "1773 – 1947",
      "badge": "FULL CLASS",
      "ribbon": "ACTS • FIRSTS • PRACTICE",
      "burst": "",
      "mode": "creator"
    },
    yt: {
      "title": "Historical Background of Indian Polity | All Acts 1773–1947 | Competitive exams",
      "altTitles": [
            "Regulating Act 1773 to Independence Act 1947 in One Class | Polity",
            "Polity Historical Background: Company Rule + Crown Rule Full Class",
            "Never Forget the Order of Acts! Polity Tricks | Competitive exams",
            "13 Acts You Must Know for Polity | Full Class with Practice Questions"
      ],
      "description": "Every Polity question on the Constitution's history starts with the same 13 Acts — in this full class you learn them in order, with all the “firsts” that exams love.\n\n📌 IN THIS CLASS\n✅ Company Rule: Regulating Act 1773 to Charter Act 1853\n✅ Crown Rule: GOI Act 1858 to GOI Act 1935\n✅ Indian Independence Act 1947 and the end of British rule\n✅ Classic traps: 1833 vs 1861, 1919 vs 1935\n✅ 60 practice questions right after the concepts\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Historical Background\n00:00 Company Rule (1773–1858)\n00:00 Regulating Act 1773\n00:00 Pitt's India Act 1784\n00:00 Charter Acts 1793, 1813, 1833, 1853\n00:00 Crown Rule (1858–1947)\n00:00 GOI Act 1858 and ICA 1861, 1892\n00:00 ICA 1909 Morley-Minto\n00:00 GOI Act 1919 and 1935\n00:00 Indian Independence Act 1947\n\n👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n#SSCCGL #IndianPolity #HistoricalBackground #UPSC",
      "tags": [
            "indian polity",
            "ssc cgl polity",
            "charter acts",
            "polity notes",
            "polity full class",
            "polity lecture",
            "morley minto reforms",
            "pitts india act 1784",
            "polity mcq",
            "charter act 1853",
            "historical background",
            "constitutional development",
            "communal electorate",
            "double government",
            "modern history polity",
            "charter act 1833",
            "regulating act 1773",
            "polity questions",
            "laxmikanth",
            "banking exams polity",
            "government of india act 1858",
            "ssc chsl polity",
            "defence exams polity",
            "provincial autonomy",
            "constitutional history",
            "polity tricks"
      ],
      "hashtags": [
            "SSCCGL",
            "IndianPolity",
            "HistoricalBackground",
            "UPSC"
      ],
      "thumbText": "HISTORICAL BACKGROUND • ALL ACTS",
      "pinnedComment": "📌 Practice what you learned: solve the questions in the class, then write your score below. Which Act confuses you most — 1919 or 1935? 👇",
      "communityPost": "🏛️ New Polity class is live: Historical Background — all 13 Acts from 1773 to 1947 with firsts, traps and practice questions. Start with the overview and tell me your score! 🎯",
      "chapters": "00:00 Class overview\n00:00 Historical Background\n00:00 Company Rule (1773–1858)\n00:00 Regulating Act 1773\n00:00 Pitt's India Act 1784\n00:00 Charter Acts 1793, 1813, 1833, 1853\n00:00 Crown Rule (1858–1947)\n00:00 GOI Act 1858 and ICA 1861, 1892\n00:00 ICA 1909 Morley-Minto\n00:00 GOI Act 1919 and 1935\n00:00 Indian Independence Act 1947",
      "playlist": "Competitive exams Polity — Full Classes"
    },

    html: `
      <p class="cp-lead">Today's class covers the <u>complete Historical Background of the Indian Constitution</u> — all <b>13 Acts from 1773 to 1947</b>, from the Regulating Act to the Indian Independence Act. By the end you will be able to place every Act in order and recall its <b>firsts</b> instantly.</p>
      <div class="cp-stats"><div class="cp-stat"><b>16</b><span>Concept pages</span></div><div class="cp-stat"><b>13</b><span>Key Acts</span></div><div class="cp-stat"><b>60</b><span>Practice questions</span></div><div class="cp-stat"><b>~60 min</b><span>Time needed</span></div></div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Historical Background</b><br>EIC arrives in 1600; two phases of rule.</li>
        <li><b>Company Rule (1773–1858)</b><br>Regulating Act 1773, Pitt's India Act 1784, Charter Acts 1793, 1813, 1833, 1853.</li>
        <li><b>Crown Rule (1858–1947)</b><br>GOI Act 1858, ICA 1861, 1892, 1909, GOI Act 1919, 1935.</li>
        <li><b>Indian Independence Act, 1947</b><br>Two dominions, end of British rule.</li>
        <li><b>Practice</b> — questions placed right after every Act.</li>
      </ul>
      <div class="cp-divider">What you will be able to do</div>
      <div class="cp-grid c2">
        <div class="cp-card amber"><div class="cp-card-title">📜 Arrange Acts</div>Put all 13 Acts in the correct <b>chronological order</b>.</div>
        <div class="cp-card blue"><div class="cp-card-title">🥇 Recall firsts</div>First G-G, first Viceroy, first Indian in the Executive Council and more.</div>
        <div class="cp-card green"><div class="cp-card-title">⚖️ Spot differences</div>Separate similar Acts: <b>1833 vs 1861</b>, <b>1919 vs 1935</b>.</div>
        <div class="cp-card red"><div class="cp-card-title">⚠️ Avoid traps</div>Catch classic swaps such as Board of Control vs Court of Directors.</div>
      </div>
      <div class="cp-note exam"><b>Why it matters:</b> this chapter is a <u>sure-shot scorer</u> in Polity. Many questions ask “which Act first introduced …”.</div>
      <div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages.</div>
      <div class="cp-chips"><span>Competitive exams</span><span>Polity</span><span>Historical Background</span><span>1773–1947</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE ─────────── */
  2: {
    type: "concept",
    icon: "🏛️",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Historical Background",
    html: `
      <p class="cp-lead">The British came to India in <b>1600</b> as <u>traders</u> through the <b>East India Company (EIC)</b>, under a <b>charter of Queen Elizabeth I</b>. Slowly the traders became rulers, and the British Parliament passed a chain of Acts to control them. These Acts are the <u>constitutional development</u> of India.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1600</b><span>EIC arrives</span></div><div class="cp-stat"><b>1773–1858</b><span>Company Rule</span></div><div class="cp-stat"><b>1858–1947</b><span>Crown Rule</span></div><div class="cp-stat"><b>13</b><span>Key Acts</span></div></div>
      <div class="cp-divider">Two phases of British rule</div>
      <div class="cp-grid c2">
        <div class="cp-card amber"><div class="cp-card-title">Company Rule (1773–1858)</div>The <b>Company</b> governs India, but <u>Parliament tightens its control</u> Act by Act.</div>
        <div class="cp-card violet"><div class="cp-card-title">Crown Rule (1858–1947)</div>After the Revolt of 1857 the <b>Crown</b> takes <u>direct control</u>; the period ends with independence.</div>
      </div>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Historical_Background/1.png" alt="Timeline of Company Rule and Crown Rule" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table>
      <thead><tr><th>Phase</th><th>Acts (in order)</th></tr></thead>
      <tbody>
      <tr><td><b>Company Rule</b></td><td>Regulating Act 1773 → Pitt's India Act 1784 → Charter Acts of 1793, 1813, 1833, 1853</td></tr>
      <tr><td><b>Crown Rule</b></td><td>GOI Act 1858 → Indian Councils Acts 1861, 1892, 1909 → GOI Act 1919 → GOI Act 1935 → Indian Independence Act 1947</td></tr>
      </tbody>
      </table>
      <div class="cp-note trap"><b>Charter Acts</b> belong to <u>Company Rule</u>. <b>Indian Councils Acts</b> belong to <u>Crown Rule</u>. Never swap the two groups.</div>
      <div class="cp-note exam">Questions ask <b>“which Act first introduced …”</b>. Learn each Act as a list of <u>firsts</u>.</div>
      <div class="cp-mnemonic">Company Rule = <b>1 Regulating + 1 Pitt + 4 Charter</b> = 6 Acts. Crown Rule = <b>7 Acts</b>.</div>
      <div class="cp-chips"><span>Competitive exams</span><span>Polity</span><span>Modern History link</span><span>High-yield</span></div>
    `
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "The British East India Company came to India in 1600 under a charter granted by which ruler?",
    options: ["Queen Elizabeth I", "Queen Victoria", "King James I", "King George III"],
    correct: "1",
    exptext: "✅ Queen Elizabeth I granted the charter in 1600. 📌 Traders first, rulers later. ❌ Victoria belongs to the Crown Rule period after 1858."
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "Which of the following is NOT an Act of the Company Rule period (1773–1858)?",
    options: ["Pitt's India Act, 1784", "Indian Councils Act, 1861", "Charter Act, 1833", "Regulating Act, 1773"],
    correct: "2",
    exptext: "✅ The Indian Councils Act 1861 came after 1858, so it is Crown Rule. 📌 Charter Acts = Company Rule; Councils Acts = Crown Rule. ❌ The other three are all before 1858."
  },

  /* ─────────── 5 · CONCEPT PAGE ─────────── */
  5: {
    type: "concept",
    icon: "📜",
    accent: "#64748b",
    pauseTimer: true,
    title: "Company Rule (1773–1858)",
    html: `
      <p class="cp-lead">Under <b>Company Rule</b> the EIC still ran India, but <u>six Acts</u> moved power step by step from the Company to the British Government.</p>
      <div class="cp-divider">Roadmap</div>
      <ul class="cp-timeline">
        <li><b>Regulating Act, 1773</b><br>First step by the British Government to control the EIC.</li>
        <li><b>Pitt's India Act, 1784</b><br>Double Government: Board of Control + Court of Directors.</li>
        <li><b>Charter Act, 1793</b><br>Trade monopoly extended by 20 years.</li>
        <li><b>Charter Act, 1813</b><br>Monopoly ended (except tea and China trade).</li>
        <li><b>Charter Act, 1833</b><br>Final step towards centralisation; first G-G of India.</li>
        <li><b>Charter Act, 1853</b><br>Last Charter Act; legislative and executive separated.</li>
      </ul>
      <div class="cp-note tip">Read the six Acts as one story: <b>control → double government → monopoly shrinks → centralisation → separation of powers</b>.</div>
      <div class="cp-chips"><span>1773</span><span>1784</span><span>1793</span><span>1813</span><span>1833</span><span>1853</span></div>
    `
  },

  /* ─────────── 6 · CONCEPT PAGE ─────────── */
  6: {
    type: "concept",
    icon: "⚖️",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Regulating Act, 1773",
    html: `
      <p class="cp-lead">The <u>FIRST step</u> taken by the British Government to <b>control the East India Company</b>. Company officials were misusing power, so Parliament decided to regulate them.</p>
      <div class="cp-divider">Key features</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">G-G of Bengal</div>The Governor of Bengal became the <b>Governor-General of Bengal</b>, helped by an <b>Executive Council of 4 members</b>.</div>
        <div class="cp-card green"><div class="cp-card-title">1st G-G</div><b>Lord Warren Hastings</b> was the first Governor-General of Bengal.</div>
        <div class="cp-card amber"><div class="cp-card-title">Bombay & Madras</div>Earlier independent, now <u>subordinate</u> to the Governor-General of Bengal.</div>
        <div class="cp-card violet"><div class="cp-card-title">Supreme Court (1774)</div>Set up at <b>Calcutta</b>: <b>1 Chief Justice + 3 Judges</b>.</div>
      </div>
      <div class="cp-note remember">Company servants were <u>prohibited</u> from taking <b>bribes or presents</b> from Indians (and from private trade).</div>
      <div class="cp-note trap">In 1773 the title was Governor-General of <b>Bengal</b>, not of India. “Of India” came in <b>1833</b>.</div>
      <div class="cp-note exam">Favourite questions: <b>first G-G of Bengal</b>, <b>strength of the council</b> and <b>judges of the Supreme Court</b>.</div>
      <div class="cp-mnemonic"><b>1773 = 1st control · 4 councillors · 1 + 3 judges</b></div>
      <div class="cp-chips"><span>Regulating Act</span><span>1773</span><span>Warren Hastings</span><span>Supreme Court Calcutta</span></div>
    `
  },

  /* ─────────── 7 · QUESTION ─────────── */
  7: {
    questext: "Which Act was the FIRST step taken by the British Government to control the East India Company?",
    options: ["Pitt's India Act, 1784", "Charter Act, 1793", "Charter Act, 1813", "Regulating Act, 1773"],
    correct: "4",
    exptext: "✅ The Regulating Act 1773 was the first attempt by Parliament to regulate the Company. 📌 “Regulating” = first control. ❌ Pitt's Act (1784) came later and created Double Government."
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "Under the Regulating Act, 1773, the Governor of Bengal was designated as:",
    options: ["Governor-General of India", "Viceroy of India", "Governor-General of Bengal", "Governor of India"],
    correct: "3",
    exptext: "✅ He became the Governor-General of Bengal. 📌 Bengal in 1773, India in 1833, Viceroy in 1858. ❌ Governor-General of India started with the Charter Act 1833; Viceroy with the Act of 1858."
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "Consider the statements about the Regulating Act, 1773: 1. The Governor-General of Bengal had an Executive Council of four members. 2. Bombay and Madras were made subordinate to Bengal. 3. A Supreme Court was set up at Calcutta with a Chief Justice and three judges. Which are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1, 2 and 3", "1 and 3 only"],
    correct: "3",
    exptext: "✅ All three statements are true. 📌 4 councillors, 1 + 3 judges, Bengal above Bombay and Madras. ❌ Dropping any one statement makes the option incomplete."
  },

  /* ─────────── 10 · QUESTION ─────────── */
  10: {
    questext: "Which of the following was NOT a provision of the Regulating Act, 1773?",
    options: ["Setting up the Supreme Court at Calcutta", "Ban on company servants taking bribes or presents", "Making Bombay and Madras subordinate to Bengal", "Creation of a Board of Control for political affairs"],
    correct: "4",
    exptext: "✅ The Board of Control came with Pitt's India Act 1784. 📌 1773 = G-G of Bengal + Court; 1784 = Double Government. ❌ The other three were all in the 1773 Act."
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "Who was the first Governor-General of Bengal?",
    options: ["Lord William Bentinck", "Lord Warren Hastings", "Lord Canning", "Lord Cornwallis"],
    correct: "2",
    exptext: "✅ Warren Hastings was the first G-G of Bengal (1773). 📌 Hastings = Bengal, Bentinck = India, Canning = Viceroy. ❌ Bentinck was the first G-G of India (1833); Canning the first Viceroy (1858)."
  },

  /* ─────────── 12 · CONCEPT PAGE ─────────── */
  12: {
    type: "concept",
    icon: "🏦",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Pitt's India Act, 1784",
    html: `
      <p class="cp-lead">This Act created the <b>Double Government</b>: the Company kept <u>trade</u>, while the British Government took <u>politics</u>. For the first time the Company's lands were officially called <b>“British possessions”</b>.</p>
      <div class="cp-divider">Key features</div>
      <table>
      <thead><tr><th>Body</th><th>Function</th></tr></thead>
      <tbody>
      <tr><td><b>Board of Control</b></td><td><u>Political</u> functions (British Government's body)</td></tr>
      <tr><td><b>Court of Directors</b></td><td><u>Commercial</u> functions (Company's body)</td></tr>
      </tbody>
      </table>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Historical_Background/2.png" alt="Double Government: Board of Control and Court of Directors" style="display:block;width:100%;max-width:320px;max-height:200px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">“British Possessions”</div><b>First time</b> the EIC territories in India were called British possessions.</div>
        <div class="cp-card green"><div class="cp-card-title">Supreme control</div>The <b>British Government</b> got supreme control over the Company's administration in India.</div>
      </div>
      <div class="cp-note trap"><b>Board of Control = Politics</b> and <b>Court of Directors = Commerce</b>. Exams love swapping them.</div>
      <div class="cp-note exam">Double Government was created in <b>1784</b> and ended by the <b>Act of 1858</b>.</div>
      <div class="cp-mnemonic"><b>B</b>oard of Control = <b>B</b>ritish Government's politics · <b>C</b>ourt of Directors = <b>C</b>ompany's commerce</div>
      <div class="cp-chips"><span>Pitt's India Act</span><span>1784</span><span>Double Government</span></div>
    `
  },

  /* ─────────── 13 · QUESTION ─────────── */
  13: {
    questext: "The system of Double Government in India was introduced by:",
    options: ["Pitt's India Act, 1784", "Regulating Act, 1773", "Charter Act, 1793", "Government of India Act, 1858"],
    correct: "1",
    exptext: "✅ Pitt's India Act 1784 created the Board of Control and the Court of Directors. 📌 Double Government = 1784 to 1858. ❌ The 1858 Act ended it."
  },

  /* ─────────── 14 · QUESTION ─────────── */
  14: {
    questext: "Under the Double Government system of 1784, the Court of Directors looked after:",
    options: ["Political affairs", "Commercial affairs", "Legislative affairs", "Judicial appointments"],
    correct: "2",
    exptext: "✅ The Court of Directors handled the commercial side. 📌 Politics belonged to the Board of Control. ❌ Political affairs were with the Board, not the Court."
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "The territories of the East India Company in India were called “British possessions” for the first time by:",
    options: ["Regulating Act, 1773", "Charter Act, 1813", "Pitt's India Act, 1784", "Charter Act, 1833"],
    correct: "3",
    exptext: "✅ Pitt's India Act 1784 used the term for the first time. 📌 It also gave the Government supreme control. ❌ The 1773 Act only regulated the Company."
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "Consider the statements: 1. The Board of Control was created to manage the commercial functions of the Company. 2. Pitt's India Act called the Company's territories “British possessions”. 3. The British Government got supreme control over the Company's administration. Which are correct?",
    options: ["1 and 2 only", "1 and 3 only", "1, 2 and 3", "2 and 3 only"],
    correct: "4",
    exptext: "✅ Statements 2 and 3 are correct. 📌 Board of Control = political. ❌ Statement 1 is wrong: commercial work stayed with the Court of Directors."
  },

  /* ─────────── 17 · CONCEPT PAGE ─────────── */
  17: {
    type: "concept",
    icon: "⏳",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Charter Act, 1793",
    html: `
      <p class="cp-lead">A short Act with <u>one big idea</u>: the Company's <b>trade monopoly</b> in India was <b>extended for 20 more years</b>.</p>
      <table>
      <thead><tr><th>Charter Act</th><th>What happened to the trade monopoly</th></tr></thead>
      <tbody>
      <tr><td><b>1793</b></td><td>Extended for <b>20 years</b></td></tr>
      <tr><td><b>1813</b></td><td>Abolished (except tea and China trade)</td></tr>
      <tr><td><b>1833</b></td><td>Commercial activities ended completely</td></tr>
      <tr><td><b>1853</b></td><td>Last Charter Act</td></tr>
      </tbody>
      </table>
      <div class="cp-note remember">Charter Acts were passed <u>every 20 years</u> to renew the Company's charter.</div>
      <div class="cp-note exam">1793 is a <b>minor</b> Act. Remember just: <b>monopoly extended, 20 years</b>.</div>
      <div class="cp-chips"><span>Charter Act</span><span>1793</span><span>Monopoly extended</span></div>
    `
  },

  /* ─────────── 18 · QUESTION ─────────── */
  18: {
    questext: "By the Charter Act, 1793, the trade monopoly of the East India Company in India was extended for how many years?",
    options: ["20 years", "10 years", "30 years", "5 years"],
    correct: "1",
    exptext: "✅ The monopoly was extended by 20 years. 📌 Charter Acts renewed the charter every 20 years. ❌ 10, 30 and 5 years are not linked with this Act."
  },

  /* ─────────── 19 · QUESTION ─────────── */
  19: {
    questext: "Which is the correct chronological order of these Acts?",
    options: ["Pitt's India Act → Regulating Act → Charter Act 1793 → Charter Act 1813", "Regulating Act → Charter Act 1793 → Pitt's India Act → Charter Act 1813", "Regulating Act → Pitt's India Act → Charter Act 1813 → Charter Act 1793", "Regulating Act → Pitt's India Act → Charter Act 1793 → Charter Act 1813"],
    correct: "4",
    exptext: "✅ 1773 → 1784 → 1793 → 1813. 📌 Remember 73, 84, 93, 13. ❌ The other orders mix up the years."
  },

  /* ─────────── 20 · CONCEPT PAGE ─────────── */
  20: {
    type: "concept",
    icon: "📚",
    accent: "#f97316",
    pauseTimer: true,
    title: "Charter Act, 1813",
    html: `
      <p class="cp-lead">The Company's trade monopoly was <u>abolished</u>, but not fully. This Act also opened the door to <b>missionaries and Western education</b>.</p>
      <div class="cp-grid c2">
        <div class="cp-card red"><div class="cp-card-title">Monopoly abolished</div>Ended <b>except for tea and the China trade</b>.</div>
        <div class="cp-card blue"><div class="cp-card-title">Missionaries</div>Christian <b>missionaries</b> were allowed to come to India for education.</div>
        <div class="cp-card green"><div class="cp-card-title">Western education</div><b>Western education</b> was promoted in the British territories (a yearly grant of ₹1 lakh was set aside).</div>
        <div class="cp-card amber"><div class="cp-card-title">Why it matters</div>Trade opened to British merchants; Company became more of a ruler.</div>
      </div>
      <div class="cp-note trap">Monopoly was <b>not completely</b> abolished in 1813. Tea and China trade stayed. Complete end came in <b>1833</b>.</div>
      <div class="cp-mnemonic"><b>1813 = “Tea and China stay, missionaries come”</b></div>
      <div class="cp-chips"><span>Charter Act</span><span>1813</span><span>Missionaries</span><span>Western education</span></div>
    `
  },

  /* ─────────── 21 · QUESTION ─────────── */
  21: {
    questext: "Which Charter Act abolished the Company's trade monopoly in India, except for tea and the China trade?",
    options: ["Charter Act, 1813", "Charter Act, 1793", "Charter Act, 1833", "Charter Act, 1853"],
    correct: "1",
    exptext: "✅ Charter Act 1813 ended the monopoly except for tea and China trade. 📌 Tea + China exception = 1813. ❌ 1833 ended the Company's commercial role completely."
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "Which of the following was NOT a feature of the Charter Act, 1813?",
    options: ["Christian missionaries were allowed to come to India", "Company's commercial activities were completely ended", "Monopoly abolished except for tea and China trade", "Western education was promoted in British territories"],
    correct: "2",
    exptext: "✅ Commercial activities ended completely only in 1833. 📌 1813 = partial end of monopoly. ❌ The other three are real features of 1813."
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "Consider the statements: 1. The Charter Act 1813 allowed missionaries to come to India. 2. It promoted Western education in British territories. 3. It ended the Company's monopoly over tea and China trade. Which are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Tea and China trade were the exceptions. ❌ Statement 3 is wrong: the monopoly over tea and China trade continued."
  },

  /* ─────────── 24 · CONCEPT PAGE ─────────── */
  24: {
    type: "concept",
    icon: "🧭",
    accent: "#22c55e",
    pauseTimer: true,
    title: "Charter Act, 1833 (Saint Helena Act)",
    html: `
      <p class="cp-lead">The <u>FINAL step towards centralisation</u> in British India. All legislative power moved to one body, and the Company became only an <b>administrative body</b>.</p>
      <div class="cp-divider">Key features</div>
      <div class="cp-grid c2">
        <div class="cp-card green"><div class="cp-card-title">G-G of India</div>Governor-General of Bengal became <b>Governor-General of India</b>. <b>Lord William Bentinck</b> was the first.</div>
        <div class="cp-card red"><div class="cp-card-title">Centralisation</div>Governors of <b>Bombay and Madras lost their legislative powers</b>.</div>
        <div class="cp-card blue"><div class="cp-card-title">Regulations → Acts</div>Old laws were called <b>Regulations</b>; new laws were called <b>Acts</b>.</div>
        <div class="cp-card amber"><div class="cp-card-title">EIC = admin body</div><b>Commercial activities ended</b>; the Company only administered.</div>
      </div>
      <div class="cp-note remember">Open competition for civil servants was <u>attempted</u> but <b>rejected by the Court of Directors</b>. Indians were <u>not to be barred</u> from Company offices.</div>
      <div class="cp-note trap">1833 = <b>centralisation</b>. 1861 = <b>decentralisation</b>. Do not mix them.</div>
      <div class="cp-mnemonic"><b>B</b>entinck = <b>B</b>ig <b>B</b>oss of <b>India</b> (first G-G of India)</div>
      <div class="cp-chips"><span>Charter Act</span><span>1833</span><span>Bentinck</span><span>Centralisation</span></div>
    `
  },

  /* ─────────── 25 · QUESTION ─────────── */
  25: {
    questext: "Who was the first Governor-General of India?",
    options: ["Lord Warren Hastings", "Lord William Bentinck", "Lord Canning", "Lord Cornwallis"],
    correct: "2",
    exptext: "✅ Bentinck became the first G-G of India under the Charter Act 1833. 📌 Hastings = Bengal, Bentinck = India, Canning = Viceroy. ❌ Canning was the first Viceroy (1858)."
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "Which Act is also known as the Saint Helena Act?",
    options: ["Charter Act, 1833", "Charter Act, 1813", "Charter Act, 1853", "Regulating Act, 1773"],
    correct: "1",
    exptext: "✅ The Charter Act 1833 is called the Saint Helena Act. 📌 Saint Helena = 1833 = G-G of India. ❌ The other Acts do not carry this nickname."
  },

  /* ─────────── 27 · QUESTION ─────────── */
  27: {
    questext: "After the Charter Act of 1833, laws made earlier and later were called respectively:",
    options: ["Acts and Regulations", "Ordinances and Acts", "Regulations and Acts", "Regulations and Ordinances"],
    correct: "3",
    exptext: "✅ Old laws = Regulations; new laws = Acts. 📌 R before 1833, A after 1833. ❌ Ordinances are emergency laws of the Viceroy (1861)."
  },

  /* ─────────── 28 · QUESTION ─────────── */
  28: {
    questext: "Consider the Charter Act, 1833: 1. The Company became a purely administrative body. 2. The governors of Bombay and Madras lost legislative powers. 3. Open competition for civil servants was successfully introduced. Which are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1, 2 and 3", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Open competition really began in 1853. ❌ In 1833 the Court of Directors rejected open competition."
  },

  /* ─────────── 29 · QUESTION ─────────── */
  29: {
    questext: "The Charter Act of 1833 is described as the final step towards:",
    options: ["Decentralisation of powers", "Provincial autonomy", "Federalism", "Centralisation in British India"],
    correct: "4",
    exptext: "✅ All legislative power was centralised in the G-G of India. 📌 1833 centralised, 1861 decentralised. ❌ Provincial autonomy came in 1935."
  },

  /* ─────────── 30 · CONCEPT PAGE ─────────── */
  30: {
    type: "concept",
    icon: "🏗️",
    accent: "#06b6d4",
    pauseTimer: true,
    title: "Charter Act, 1853",
    html: `
      <p class="cp-lead">The <u>LAST Charter Act</u> passed by the British Parliament. It separated lawmaking from administration and made <b>open competition</b> a reality.</p>
      <div class="cp-divider">Key features</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">Separation</div><b>Legislative and executive</b> functions were <u>separated for the first time</u> in the G-G's council.</div>
        <div class="cp-card green"><div class="cp-card-title">6 councillors</div><b>6 Legislative Councillors</b> were added; an <b>Indian (Central) Legislative Council</b> was created (a “mini-Parliament”).</div>
        <div class="cp-card amber"><div class="cp-card-title">Open competition</div>Open competition for civil servants was <u>actually introduced</u> this time (failed in 1833).</div>
        <div class="cp-card violet"><div class="cp-card-title">Last of its kind</div>No Charter Act came after 1853.</div>
      </div>
      <div class="cp-note trap">1833 <b>attempted</b> open competition (rejected). 1853 <b>introduced</b> it. Do not mix them.</div>
      <div class="cp-note exam">Key words: <b>last Charter Act · separation · mini-Parliament · open competition</b>.</div>
      <div class="cp-mnemonic"><b>53 = Last, Split, Compete</b> (last Act, split powers, competitive exam)</div>
      <div class="cp-chips"><span>Charter Act</span><span>1853</span><span>Open competition</span><span>Legislative Council</span></div>
    `
  },

  /* ─────────── 31 · QUESTION ─────────── */
  31: {
    questext: "Which was the LAST Charter Act passed by the British Parliament?",
    options: ["Charter Act, 1833", "Charter Act, 1813", "Charter Act, 1853", "Government of India Act, 1858"],
    correct: "3",
    exptext: "✅ The Charter Act 1853 was the last. 📌 After it came Crown Rule. ❌ The 1858 Act is not a Charter Act; it ended Company Rule."
  },

  /* ─────────── 32 · QUESTION ─────────── */
  32: {
    questext: "Legislative and executive functions were separated for the first time in the Governor-General's council by:",
    options: ["Charter Act, 1853", "Charter Act, 1833", "Indian Councils Act, 1861", "Government of India Act, 1858"],
    correct: "1",
    exptext: "✅ The 1853 Act separated the two for the first time. 📌 A legislative council like a “mini-Parliament”. ❌ 1833 centralised lawmaking; 1861 brought Indians in."
  },

  /* ─────────── 33 · QUESTION ─────────── */
  33: {
    questext: "Which of the following was NOT a feature of the Charter Act, 1853?",
    options: ["Addition of 6 Legislative Councillors", "Creation of the post of Secretary of State for India", "Creation of an Indian (Central) Legislative Council", "Separation of legislative and executive functions"],
    correct: "2",
    exptext: "✅ The Secretary of State post was created in 1858. 📌 1853 = still Company Rule. ❌ The other three are 1853 features."
  },

  /* ─────────── 34 · QUESTION ─────────── */
  34: {
    questext: "Consider the statements: 1. The Charter Act 1853 was the last Charter Act. 2. It introduced open competition for civil servants. 3. It ended the Company's trade monopoly. Which are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Last Act + open competition. ❌ Trade monopoly had ended earlier (1813 and 1833)."
  },

  /* ─────────── 35 · CONCEPT PAGE ─────────── */
  35: {
    type: "concept",
    icon: "👑",
    accent: "#a855f7",
    pauseTimer: true,
    title: "Crown Rule (1858–1947)",
    html: `
      <p class="cp-lead">After the Revolt of 1857 the <b>British Crown</b> took India directly. <u>Seven Acts</u> then moved India from <b>Viceroy's rule</b> to <b>independence</b>.</p>
      <div class="cp-divider">Roadmap</div>
      <ul class="cp-timeline">
        <li><b>Government of India Act, 1858</b><br>EIC abolished; Viceroy and Secretary of State created.</li>
        <li><b>Indian Councils Act, 1861</b><br>Indians in lawmaking; decentralisation; portfolio system.</li>
        <li><b>Indian Councils Act, 1892</b><br>Budget discussion; limited indirect elections.</li>
        <li><b>Indian Councils Act, 1909</b><br>Morley-Minto Reforms; separate electorate for Muslims.</li>
        <li><b>Government of India Act, 1919</b><br>Dyarchy in provinces; bicameralism; direct elections.</li>
        <li><b>Government of India Act, 1935</b><br>Provincial autonomy; Federal Court; RBI.</li>
        <li><b>Indian Independence Act, 1947</b><br>Two dominions; end of British rule.</li>
      </ul>
      <div class="cp-note tip">Story line: <b>Crown takes over → Indians join councils → elections → communal electorates → dyarchy → autonomy → freedom</b>.</div>
      <div class="cp-chips"><span>1858</span><span>1861</span><span>1892</span><span>1909</span><span>1919</span><span>1935</span><span>1947</span></div>
    `
  },

  /* ─────────── 36 · CONCEPT PAGE ─────────── */
  36: {
    type: "concept",
    icon: "🔄",
    accent: "#e11d48",
    pauseTimer: true,
    title: "Government of India Act, 1858",
    html: `
      <p class="cp-lead">Called the <b>“Act for the Better Government of India”</b>. It <u>abolished the East India Company</u> and <u>transferred all powers to the British Crown</u>.</p>
      <div class="cp-divider">Key features</div>
      <div class="cp-grid c2">
        <div class="cp-card red"><div class="cp-card-title">Viceroy created</div>The G-G of India also became <b>Viceroy</b>. <b>Lord Canning</b> was the <u>first Viceroy of India</u>.</div>
        <div class="cp-card blue"><div class="cp-card-title">Double Government ended</div><b>Board of Control</b> and <b>Court of Directors</b> were both <u>abolished</u>.</div>
        <div class="cp-card green"><div class="cp-card-title">Secretary of State</div>A new post: <b>Secretary of State for India</b>, a <u>member of the British Cabinet</u>.</div>
        <div class="cp-card amber"><div class="cp-card-title">Council of India</div>A <b>15-member Council of India</b> assisted him (advisory role).</div>
      </div>
      <div class="cp-note trap"><b>G-G of India</b> = Bentinck (1833). <b>Viceroy</b> = Canning (1858). The Viceroy is the Crown's representative.</div>
      <div class="cp-note exam">1858 = <b>end of EIC</b>, <b>end of Double Government</b>, <b>start of Crown Rule</b>.</div>
      <div class="cp-mnemonic"><b>C</b>anning = <b>C</b>rown's first Viceroy</div>
      <div class="cp-chips"><span>GOI Act 1858</span><span>Viceroy</span><span>Secretary of State</span><span>Council of India</span></div>
    `
  },

  /* ─────────── 37 · QUESTION ─────────── */
  37: {
    questext: "Which Act abolished the East India Company and transferred its powers to the British Crown?",
    options: ["Government of India Act, 1858", "Charter Act, 1853", "Indian Councils Act, 1861", "Pitt's India Act, 1784"],
    correct: "1",
    exptext: "✅ The GOI Act 1858 ended Company Rule. 📌 “Act for the Better Government of India”. ❌ The Charter Act 1853 still left the Company in charge."
  },

  /* ─────────── 38 · QUESTION ─────────── */
  38: {
    questext: "Who was the first Viceroy of India?",
    options: ["Lord William Bentinck", "Lord Canning", "Lord Dalhousie", "Lord Warren Hastings"],
    correct: "2",
    exptext: "✅ Lord Canning became the first Viceroy in 1858. 📌 Canning = Crown. ❌ Bentinck was the first G-G of India; Hastings the first G-G of Bengal."
  },

  /* ─────────── 39 · QUESTION ─────────── */
  39: {
    questext: "Which post was created in 1858 as a member of the British Cabinet to head the Indian administration?",
    options: ["Viceroy of India", "Governor-General of India", "High Commissioner for India", "Secretary of State for India"],
    correct: "4",
    exptext: "✅ The Secretary of State for India was a British Cabinet minister. 📌 He was assisted by a 15-member Council of India. ❌ The High Commissioner post came in 1919."
  },

  /* ─────────── 40 · QUESTION ─────────── */
  40: {
    questext: "Which of the following was NOT provided by the Government of India Act, 1858?",
    options: ["Post of Viceroy of India", "Separate electorate for Muslims", "A 15-member Council of India", "End of the Double Government system"],
    correct: "2",
    exptext: "✅ Separate electorates came with the 1909 Act. 📌 1858 is about administration, not electorates. ❌ The other three are 1858 features."
  },

  /* ─────────── 41 · CONCEPT PAGE ─────────── */
  41: {
    type: "concept",
    icon: "🧩",
    accent: "#3b82f6",
    pauseTimer: true,
    title: "Indian Councils Act, 1861",
    html: `
      <p class="cp-lead">The <u>beginning of representative institutions</u> in India: Indians were first <b>associated with lawmaking</b>, and powers were <b>decentralised</b>.</p>
      <div class="cp-divider">Key features</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">Indians in lawmaking</div>In <b>1862</b> Lord Canning nominated <b>Raja of Benaras, Maharaja of Patiala and Sir Dinkar Rao</b>.</div>
        <div class="cp-card green"><div class="cp-card-title">Decentralisation</div>Legislative powers were <u>restored</u> to the <b>Bombay and Madras</b> Presidencies.</div>
        <div class="cp-card amber"><div class="cp-card-title">Ordinance power</div>The Viceroy could issue an <b>ordinance in an emergency</b>, valid for <b>6 months</b>.</div>
        <div class="cp-card violet"><div class="cp-card-title">Portfolio system</div><b>Recognised</b> by the Act (introduced by Lord Canning in <b>1859</b>).</div>
      </div>
      <table>
      <thead><tr><th>New Legislative Council</th><th>Year</th></tr></thead>
      <tbody>
      <tr><td>Bengal</td><td><b>1862</b></td></tr>
      <tr><td>North-Western Provinces</td><td><b>1886</b></td></tr>
      <tr><td>Punjab</td><td><b>1897</b></td></tr>
      </tbody>
      </table>
      <div class="cp-note trap">1833 took legislative power <b>away</b> from Bombay and Madras; 1861 <b>gave it back</b>.</div>
      <div class="cp-mnemonic"><b>1861</b> = Indians <b>in</b>, powers <b>down</b> (to provinces), ordinance <b>6 months</b></div>
      <div class="cp-chips"><span>ICA 1861</span><span>Portfolio system</span><span>Ordinance</span><span>Decentralisation</span></div>
    `
  },

  /* ─────────── 42 · QUESTION ─────────── */
  42: {
    questext: "Which Act marked the beginning of representative institutions in India by associating Indians with lawmaking?",
    options: ["Charter Act, 1833", "Indian Councils Act, 1892", "Indian Councils Act, 1861", "Indian Councils Act, 1909"],
    correct: "3",
    exptext: "✅ The 1861 Act first brought Indians into the Viceroy's legislative council. 📌 Canning nominated 3 Indians in 1862. ❌ 1892 and 1909 expanded the idea later."
  },

  /* ─────────── 43 · QUESTION ─────────── */
  43: {
    questext: "Under the Indian Councils Act, 1861, an ordinance issued by the Viceroy in an emergency was valid for:",
    options: ["6 months", "3 months", "1 year", "2 years"],
    correct: "1",
    exptext: "✅ An ordinance was valid for 6 months. 📌 Ordinance power began in 1861. ❌ 3 months, 1 year and 2 years are not provided."
  },

  /* ─────────── 44 · QUESTION ─────────── */
  44: {
    questext: "Which is the correct order of creation of the new Legislative Councils?",
    options: ["Bengal → Punjab → North-Western Provinces", "North-Western Provinces → Bengal → Punjab", "Punjab → Bengal → North-Western Provinces", "Bengal → North-Western Provinces → Punjab"],
    correct: "4",
    exptext: "✅ Bengal (1862), NW Provinces (1886), Punjab (1897). 📌 Remember 62, 86, 97. ❌ The other orders mix the years."
  },

  /* ─────────── 45 · QUESTION ─────────── */
  45: {
    questext: "Which Indians did Lord Canning nominate to his Legislative Council in 1862?",
    options: ["Raja of Benaras, Maharaja of Patiala and Sir Dinkar Rao", "Raja of Benaras, Maharaja of Gwalior and Sir Salar Jung", "Maharaja of Patiala, Nawab of Bhopal and Sir Dinkar Rao", "Raja of Benaras, Maharaja of Mysore and Sir Syed Ahmad Khan"],
    correct: "1",
    exptext: "✅ The three nominees were Raja of Benaras, Maharaja of Patiala and Sir Dinkar Rao. 📌 B-P-D. ❌ The other options replace one or more of the real nominees."
  },

  /* ─────────── 46 · QUESTION ─────────── */
  46: {
    questext: "The portfolio system, recognised by the Indian Councils Act 1861, had been introduced by Lord Canning in:",
    options: ["1858", "1861", "1862", "1859"],
    correct: "4",
    exptext: "✅ Canning introduced it in 1859; the 1861 Act recognised it. 📌 1859 introduced, 1861 recognised. ❌ 1861 is the year of recognition, not introduction."
  },

  /* ─────────── 47 · CONCEPT PAGE ─────────── */
  47: {
    type: "concept",
    icon: "🗣️",
    accent: "#84cc16",
    pauseTimer: true,
    title: "Indian Councils Act, 1892",
    html: `
      <p class="cp-lead">This Act gave the councils <u>more voice</u> and introduced a <b>limited, indirect</b> kind of election.</p>
      <div class="cp-grid c2">
        <div class="cp-card green"><div class="cp-card-title">Increased powers</div>Councils could <b>discuss the budget</b> and <b>ask questions</b> to the executive.</div>
        <div class="cp-card amber"><div class="cp-card-title">Limited indirect elections</div>Non-official seats were filled indirectly, but the word <b>“election”</b> was <u>not used</u>.</div>
      </div>
      <div class="cp-note trap">The Act used the phrase <b>“nomination on recommendation”</b>, not “election”. It was an <u>election in practice only</u>.</div>
      <div class="cp-mnemonic"><b>1892</b> = <b>Q</b>uestions and <b>B</b>udget, <b>no</b> “election” word</div>
      <div class="cp-chips"><span>ICA 1892</span><span>Budget</span><span>Questions</span><span>Indirect elections</span></div>
    `
  },

  /* ─────────── 48 · QUESTION ─────────── */
  48: {
    questext: "Under the Indian Councils Act, 1892, the legislative councils were given the power to:",
    options: ["Pass the budget", "Elect the Viceroy", "Discuss the budget and ask questions to the executive", "Remove the executive council"],
    correct: "3",
    exptext: "✅ They could discuss the budget and ask questions. 📌 Discuss, not vote. ❌ They could not pass the budget or remove the executive."
  },

  /* ─────────── 49 · QUESTION ─────────── */
  49: {
    questext: "The Indian Councils Act, 1892 introduced which method for filling non-official seats?",
    options: ["Direct election on adult franchise", "Limited indirect election called “nomination on recommendation”", "Separate electorates for communities", "Complete nomination by the Viceroy only"],
    correct: "2",
    exptext: "✅ Limited indirect election, officially called nomination on recommendation. 📌 The word “election” was avoided. ❌ Direct election came in 1919."
  },

  /* ─────────── 50 · QUESTION ─────────── */
  50: {
    questext: "Consider the statements: 1. The 1892 Act allowed councils to discuss the budget. 2. The word “election” was officially used in the Act. 3. Non-official seats were filled through limited indirect elections. Which are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1, 2 and 3", "1 and 3 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 3 are correct. 📌 Election in practice, not in words. ❌ Statement 2 is wrong: the word was not used."
  },

  /* ─────────── 51 · CONCEPT PAGE ─────────── */
  51: {
    type: "concept",
    icon: "🗳️",
    accent: "#ec4899",
    pauseTimer: true,
    title: "Indian Councils Act, 1909 (Morley-Minto Reforms)",
    html: `
      <p class="cp-lead">Known as the <b>Morley-Minto Reforms</b>. It put the <u>first Indian in the Viceroy's Executive Council</u> and began <u>communal (separate) electorates</u>.</p>
      <div class="cp-divider">Key features</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">Indian in Executive Council</div><b>Satyendra Prasad Sinha</b> was the <u>first Indian</u> in the Viceroy's Executive Council (<b>Law Member</b>).</div>
        <div class="cp-card red"><div class="cp-card-title">Communal electorate</div><b>Separate electorate for Muslims</b>: Muslims were elected only by Muslims.</div>
        <div class="cp-card amber"><div class="cp-card-title">Father of communal electorate</div><b>Lord Minto</b> is called the <u>Father of Communal Electorate</u>.</div>
        <div class="cp-card green"><div class="cp-card-title">Other seats</div>Separate representation for <b>presidency corporations, chambers of commerce, universities, zamindars</b>.</div>
      </div>
      <div class="cp-note trap"><b>1909</b> = separate electorate for <b>Muslims only</b>. <b>1919</b> extended it to Sikhs, Indian Christians, Anglo-Indians, Europeans.</div>
      <div class="cp-note exam">Key names: <b>Morley (Secretary of State), Minto (Viceroy), Sinha (first Indian)</b>.</div>
      <div class="cp-mnemonic"><b>M</b>into = <b>M</b>uslim electorate</div>
      <div class="cp-chips"><span>ICA 1909</span><span>Morley-Minto</span><span>Communal electorate</span><span>Satyendra Prasad Sinha</span></div>
    `
  },

  /* ─────────── 52 · QUESTION ─────────── */
  52: {
    questext: "The Morley-Minto Reforms are associated with which Act?",
    options: ["Indian Councils Act, 1892", "Government of India Act, 1919", "Indian Councils Act, 1909", "Government of India Act, 1935"],
    correct: "3",
    exptext: "✅ The 1909 Act is called the Morley-Minto Reforms. 📌 Morley + Minto = 1909. ❌ Montagu-Chelmsford is the 1919 Act."
  },

  /* ─────────── 53 · QUESTION ─────────── */
  53: {
    questext: "Who was the first Indian member of the Viceroy's Executive Council?",
    options: ["Satyendra Prasad Sinha", "Dadabhai Naoroji", "Gopal Krishna Gokhale", "Surendranath Banerjee"],
    correct: "1",
    exptext: "✅ S. P. Sinha joined as Law Member under the 1909 Act. 📌 First Indian = Sinha. ❌ The others were Congress leaders, not Executive Council members at that time."
  },

  /* ─────────── 54 · QUESTION ─────────── */
  54: {
    questext: "Who is regarded as the Father of Communal Electorate in India?",
    options: ["Lord Morley", "Lord Minto", "Lord Curzon", "Lord Canning"],
    correct: "2",
    exptext: "✅ Lord Minto, the Viceroy, supported separate electorates for Muslims. 📌 Minto = Muslim electorate. ❌ Morley was the Secretary of State."
  },

  /* ─────────── 55 · QUESTION ─────────── */
  55: {
    questext: "Which of the following was NOT provided by the Indian Councils Act, 1909?",
    options: ["Separate electorate for Muslims", "Introduction of direct elections for the first time", "Separate representation for universities and zamindars", "An Indian member in the Viceroy's Executive Council"],
    correct: "2",
    exptext: "✅ Direct elections were introduced first in 1919. 📌 1909 = communal + first Indian in council. ❌ The other three are 1909 features."
  },

  /* ─────────── 56 · QUESTION ─────────── */
  56: {
    questext: "Consider the statements: 1. The 1909 Act provided a separate electorate for Muslims. 2. Muslim members were elected only by Muslim voters. 3. Sikhs and Indian Christians got separate electorates under this Act. Which are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 1909 = only Muslims. ❌ Sikhs, Indian Christians, Anglo-Indians and Europeans were added in 1919."
  },

  /* ─────────── 57 · QUESTION ─────────── */
  57: {
    questext: "Match the person with the distinction: 1. Warren Hastings 2. William Bentinck 3. Lord Canning 4. Satyendra Prasad Sinha; A. First Viceroy B. First G-G of Bengal C. First G-G of India D. First Indian in the Viceroy's Executive Council",
    options: ["1-C, 2-B, 3-A, 4-D", "1-B, 2-C, 3-D, 4-A", "1-A, 2-C, 3-B, 4-D", "1-B, 2-C, 3-A, 4-D"],
    correct: "4",
    exptext: "✅ Hastings = G-G of Bengal, Bentinck = G-G of India, Canning = Viceroy, Sinha = first Indian. 📌 1773 → 1833 → 1858 → 1909. ❌ Other options swap Bengal, India and Viceroy."
  },

  /* ─────────── 58 · CONCEPT PAGE ─────────── */
  58: {
    type: "concept",
    icon: "🎭",
    accent: "#d946ef",
    pauseTimer: true,
    title: "Government of India Act, 1919 (Montagu-Chelmsford Reforms)",
    html: `
      <p class="cp-lead">The <b>Montagu-Chelmsford Reforms</b> (came into force in <b>1921</b>) brought <u>Dyarchy in the provinces</u> and many <u>“first time” features</u>.</p>
      <div class="cp-divider">Dyarchy in provinces</div>
      <table>
      <thead><tr><th>Subjects</th><th>Run by</th><th>Responsible?</th></tr></thead>
      <tbody>
      <tr><td><b>Transferred</b></td><td><u>Ministers</u></td><td>Yes, to the legislative council</td></tr>
      <tr><td><b>Reserved</b></td><td><u>Governor</u> and his council</td><td>No</td></tr>
      </tbody>
      </table>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Historical_Background/3.png" alt="Dyarchy: transferred and reserved subjects" style="display:block;width:100%;max-width:320px;max-height:200px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-divider">First time features</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">Bicameralism</div><b>First time</b> at the Centre: <b>Council of State</b> (upper) + <b>Legislative Assembly</b> (lower).</div>
        <div class="cp-card green"><div class="cp-card-title">Direct elections</div><b>First time</b> direct elections were introduced in India.</div>
        <div class="cp-card amber"><div class="cp-card-title">Budgets</div>Provincial and Central budgets were <b>separated for the first time</b>.</div>
        <div class="cp-card red"><div class="cp-card-title">Communal electorate</div>Extended to <b>Sikhs, Indian Christians, Anglo-Indians and Europeans</b>.</div>
      </div>
      <div class="cp-note remember"><b>3 of 6</b> Viceroy's Executive Council members were to be Indian. A <b>High Commissioner for India</b> was posted in London. The <b>Public Service Commission</b> was set up in <b>1926</b>.</div>
      <div class="cp-note trap">1919 = Dyarchy in <b>provinces</b>. 1935 = Dyarchy at the <b>Centre</b> (and provinces got autonomy).</div>
      <div class="cp-mnemonic"><b>1919 = D</b>yarchy, <b>D</b>irect elections, <b>D</b>ouble house</div>
      <div class="cp-chips"><span>GOI Act 1919</span><span>Dyarchy</span><span>Montagu-Chelmsford</span><span>Direct elections</span></div>
    `
  },

  /* ─────────── 59 · QUESTION ─────────── */
  59: {
    questext: "Dyarchy in the provinces was introduced by:",
    options: ["Government of India Act, 1919", "Indian Councils Act, 1909", "Government of India Act, 1935", "Indian Councils Act, 1861"],
    correct: "1",
    exptext: "✅ The GOI Act 1919 introduced dyarchy in the provinces. 📌 Transferred = ministers, Reserved = Governor. ❌ 1935 abolished it in provinces."
  },

  /* ─────────── 60 · QUESTION ─────────── */
  60: {
    questext: "Under Dyarchy of 1919, the reserved subjects were administered by:",
    options: ["Ministers responsible to the legislative council", "The Secretary of State directly", "The Governor, not responsible to the legislature", "The Viceroy's Executive Council"],
    correct: "3",
    exptext: "✅ The Governor ran reserved subjects without responsibility to the legislature. 📌 Transferred = ministers. ❌ Ministers handled only transferred subjects."
  },

  /* ─────────── 61 · QUESTION ─────────── */
  61: {
    questext: "Consider the statements about the GOI Act, 1919: 1. Direct elections were introduced for the first time. 2. A bicameral legislature was set up at the Centre for the first time. 3. Provincial and Central budgets were separated for the first time. Which are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three firsts belong to 1919. 📌 Direct election, two houses, separate budgets. ❌ Dropping any one is incomplete."
  },

  /* ─────────── 62 · QUESTION ─────────── */
  62: {
    questext: "The Public Service Commission for recruiting civil servants was established in:",
    options: ["1926", "1919", "1921", "1935"],
    correct: "1",
    exptext: "✅ The Public Service Commission was set up in 1926 under the 1919 Act. 📌 The Act came into force in 1921. ❌ 1935 provided Federal, Provincial and Joint PSCs."
  },

  /* ─────────── 63 · QUESTION ─────────── */
  63: {
    questext: "Which of the following was NOT a feature of the Government of India Act, 1919?",
    options: ["Office of High Commissioner for India in London", "Provincial autonomy", "Communal electorate extended to Sikhs and Anglo-Indians", "Dyarchy in the provinces"],
    correct: "2",
    exptext: "✅ Provincial autonomy came with the 1935 Act. 📌 1919 = dyarchy, not autonomy. ❌ The other three are 1919 features."
  },

  /* ─────────── 64 · QUESTION ─────────── */
  64: {
    questext: "The Government of India Act, 1919 came into force in:",
    options: ["1919", "1921", "1923", "1926"],
    correct: "2",
    exptext: "✅ The Act was passed in 1919 but came into force in 1921. 📌 Passed 1919, in force 1921. ❌ 1926 is the year the PSC was set up."
  },

  /* ─────────── 65 · CONCEPT PAGE ─────────── */
  65: {
    type: "concept",
    icon: "📘",
    accent: "#0d9488",
    pauseTimer: true,
    title: "Government of India Act, 1935",
    html: `
      <p class="cp-lead">The <u>last big constitutional Act</u> before independence. It gave <b>Provincial Autonomy</b> and later became a major source of the Indian Constitution.</p>
      <div class="cp-divider">Key features</div>
      <div class="cp-grid c2">
        <div class="cp-card green"><div class="cp-card-title">Provincial autonomy</div><b>Dyarchy in provinces abolished</b>; responsible government in provinces, effective <b>1937</b> and <u>stopped in 1939</u>.</div>
        <div class="cp-card red"><div class="cp-card-title">Dyarchy at Centre</div><b>Dyarchy introduced at the Centre</b>; the federal part never actually came into operation.</div>
        <div class="cp-card blue"><div class="cp-card-title">Bicameralism in provinces</div>Six provinces: <b>Bengal, Bombay, Madras, Bihar, Assam, UP</b>.</div>
        <div class="cp-card amber"><div class="cp-card-title">Communal electorate</div>Extended to <b>Scheduled Castes, women and labour (workers)</b>.</div>
      </div>
      <div class="cp-grid c2">
        <div class="cp-card violet"><div class="cp-card-title">Franchise</div>About <b>10% of the population</b> got the right to vote.</div>
        <div class="cp-card teal"><div class="cp-card-title">Institutions</div><b>Reserve Bank of India</b> (RBI) set up; <b>Federal + Provincial + Joint</b> Public Service Commissions; <b>Federal Court</b> established in <b>1937</b>.</div>
      </div>
      <div class="cp-note trap"><b>1919 = dyarchy in provinces; 1935 = dyarchy at Centre</b>, and provinces got autonomy.</div>
      <div class="cp-mnemonic"><b>1935 = P</b>rovincial autonomy, <b>R</b>BI, <b>F</b>ederal Court: “<b>PRF</b>”</div>
      <div class="cp-chips"><span>GOI Act 1935</span><span>Provincial autonomy</span><span>Federal Court</span><span>RBI</span></div>
    `
  },

  /* ─────────── 66 · QUESTION ─────────── */
  66: {
    questext: "What change did the Government of India Act, 1935 make regarding dyarchy?",
    options: ["Introduced it in the provinces for the first time", "Abolished it at the Centre and extended it in the provinces", "Retained it in the provinces and abolished it at the Centre", "Abolished it in the provinces and introduced it at the Centre"],
    correct: "4",
    exptext: "✅ Provinces got autonomy and dyarchy moved to the Centre. 📌 1919 = provinces; 1935 = Centre. ❌ Introduction in provinces happened in 1919."
  },

  /* ─────────── 67 · QUESTION ─────────── */
  67: {
    questext: "Which of the following was NOT among the six provinces given bicameral legislatures by the Government of India Act, 1935?",
    options: ["Punjab", "Bengal", "Bihar", "Assam"],
    correct: "1",
    exptext: "✅ Punjab was not among the six. 📌 Six = Bengal, Bombay, Madras, Bihar, Assam, UP. ❌ Bengal, Bihar and Assam were included."
  },

  /* ─────────── 68 · QUESTION ─────────── */
  68: {
    questext: "The Federal Court was established in India in:",
    options: ["1935", "1939", "1937", "1947"],
    correct: "3",
    exptext: "✅ The Federal Court was set up in 1937 as provided by the 1935 Act. 📌 Act 1935, court 1937. ❌ 1939 is when provincial autonomy stopped."
  },

  /* ─────────── 69 · QUESTION ─────────── */
  69: {
    questext: "Under the GOI Act, 1935, about what percentage of the population got the right to vote?",
    options: ["About 3%", "About 25%", "About 50%", "About 10%"],
    correct: "4",
    exptext: "✅ Roughly 10% of the population got voting rights. 📌 Ten percent, still a minority. ❌ 25% and 50% are far too high for 1935."
  },

  /* ─────────── 70 · QUESTION ─────────── */
  70: {
    questext: "Which of the following was established as part of the framework of the Government of India Act, 1935?",
    options: ["Reserve Bank of India", "State Bank of India", "Planning Commission", "Election Commission of India"],
    correct: "1",
    exptext: "✅ The RBI was set up under the 1935 framework. 📌 RBI = 1935. ❌ SBI, Planning Commission and Election Commission came after independence."
  },

  /* ─────────── 71 · QUESTION ─────────── */
  71: {
    questext: "Consider the statements: 1. Provincial autonomy took effect in 1937. 2. It continued without any break until 1947. 3. The Act extended communal electorates to Scheduled Castes, women and labour. Which are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 3 are correct. 📌 1937 start, 1939 stop. ❌ Statement 2 is wrong: it stopped in 1939."
  },

  /* ─────────── 72 · QUESTION ─────────── */
  72: {
    questext: "Which is the correct chronological order of these Acts? 1. GOI Act 1919 2. ICA 1909 3. ICA 1892 4. GOI Act 1935",
    options: ["2 → 3 → 1 → 4", "3 → 2 → 1 → 4", "3 → 1 → 2 → 4", "3 → 2 → 4 → 1"],
    correct: "2",
    exptext: "✅ 1892 → 1909 → 1919 → 1935. 📌 92, 09, 19, 35. ❌ The other orders mix up the years."
  },

  /* ─────────── 73 · CONCEPT PAGE ─────────── */
  73: {
    type: "concept",
    icon: "🕊️",
    accent: "#eab308",
    pauseTimer: true,
    title: "Indian Independence Act, 1947",
    html: `
      <p class="cp-lead">On <b>20 February 1947</b> PM <b>Clement Attlee</b> declared that British rule would end by <b>30 June 1948</b>. The Act actually brought <u>independence on 15 August 1947</u>.</p>
      <div class="cp-divider">Key features</div>
      <div class="cp-grid c2">
        <div class="cp-card green"><div class="cp-card-title">Independence</div>India declared <b>independent and sovereign</b> from <b>15 August 1947</b>.</div>
        <div class="cp-card blue"><div class="cp-card-title">Two dominions</div><b>India and Pakistan</b> were created.</div>
        <div class="cp-card red"><div class="cp-card-title">Viceroy abolished</div>Each dominion got a <b>Governor-General</b>, appointed by the British King.</div>
        <div class="cp-card amber"><div class="cp-card-title">Secretary of State abolished</div>The office of Secretary of State for India ended.</div>
      </div>
      <div class="cp-grid c2">
        <div class="cp-card violet"><div class="cp-card-title">Constituent Assemblies</div>Empowered to <b>frame the new constitution</b>.</div>
        <div class="cp-card teal"><div class="cp-card-title">Princely states</div><b>British paramountcy lapsed</b>; states could join India or Pakistan or stay independent.</div>
      </div>
      <div class="cp-note remember">Till the new constitution came, the country was governed by the <b>GOI Act 1935</b>. The title <b>“Emperor of India”</b> was dropped from the King's titles.</div>
      <div class="cp-note trap"><b>Viceroy</b> post ended, but the <b>Governor-General</b> post continued in each dominion.</div>
      <div class="cp-mnemonic"><b>1947 = 2 dominions, 0 Viceroys, 0 paramountcy</b></div>
      <div class="cp-chips"><span>Independence Act</span><span>15 August 1947</span><span>Two dominions</span><span>Paramountcy</span></div>
    `
  },

  /* ─────────── 74 · QUESTION ─────────── */
  74: {
    questext: "Under the Indian Independence Act, 1947, India became independent and sovereign from:",
    options: ["20 February 1947", "30 June 1948", "15 August 1947", "26 January 1950"],
    correct: "3",
    exptext: "✅ Independence came on 15 August 1947. 📌 The Act advanced the date. ❌ 30 June 1948 was Attlee's original deadline."
  },

  /* ─────────── 75 · QUESTION ─────────── */
  75: {
    questext: "Attlee's declaration of 20 February 1947 said that British rule in India would end by:",
    options: ["30 June 1948", "15 August 1947", "31 December 1947", "26 January 1950"],
    correct: "1",
    exptext: "✅ The original deadline was 30 June 1948. 📌 It was advanced to 15 August 1947. ❌ 26 January 1950 is the Republic date."
  },

  /* ─────────── 76 · QUESTION ─────────── */
  76: {
    questext: "Which of the following was NOT a provision of the Indian Independence Act, 1947?",
    options: ["Creation of two dominions, India and Pakistan", "A Viceroy for each dominion", "Lapse of British paramountcy over princely states", "Abolition of the office of Secretary of State for India"],
    correct: "2",
    exptext: "✅ Each dominion got a Governor-General, not a Viceroy. 📌 Viceroy ended in 1947. ❌ The other three are real provisions."
  },

  /* ─────────── 77 · QUESTION ─────────── */
  77: {
    questext: "Consider the statements: 1. Constituent Assemblies were empowered to frame a constitution. 2. Princely states were free to join India or Pakistan or remain independent. 3. The title “Emperor of India” was retained by the British King. Which are correct?",
    options: ["2 and 3 only", "1 and 3 only", "1, 2 and 3", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct. 📌 The empire title was dropped. ❌ Statement 3 is wrong."
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     images/General_Awareness/Polity/Historical_Background/thumbnail.png → ENTRY 1 (class overview, "thumb" field)  — not numbered
     images/General_Awareness/Polity/Historical_Background/1.png → ENTRY 2 (Historical Background)
     images/General_Awareness/Polity/Historical_Background/2.png → ENTRY 12 (Pitt's India Act, 1784)
     images/General_Awareness/Polity/Historical_Background/3.png → ENTRY 58 (Government of India Act, 1919 (Montagu-Chelmsford Reforms))

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name inside the images/General_Awareness/Polity/Historical_Background/ folder)
   images/General_Awareness/Polity/Historical_Background/thumbnail.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920×1080 px, ultra-sharp, in a premium, classic, refined editorial style (NOT cartoonish: no cartoon, toy-like, clip-art, comic or glossy cartoon-3D look). Deep midnight-navy and near-black base with a smooth, subtle amber gradient (accent #d97706) and restrained champagne-gold highlights; soft cinematic lighting with a gentle warm glow behind the right-centre of the frame, where a teacher's photo will be placed later; fine dark vignette on the edges, very subtle fine grain texture, realistic shallow depth of field. Place only 3 elegant, realistic, softly blurred objects mostly on the right and in the back: an antique brass compass, a rolled aged parchment scroll tied with a ribbon and sealed with plain wax (completely blank, no writing), and a vintage quill pen in an inkwell, rendered matte or brushed-metal with natural reflections. Do NOT add any star, starburst or explosion sticker. Add ONE blank premium emblem: a refined, classic round seal with a thin champagne-gold rim, fine engraved double border and a smooth, completely EMPTY dark-navy centre with a faint glow, realistic brushed-metal / enamel finish, about 20% of the frame height, placed near the lower centre of the frame (about 60% from the left and 72% from the top) so I can write my own text inside it later. Keep the LEFT 62% of the frame calm, dark and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image (the emblem stays blank). Sophisticated, balanced, high-contrast, professional composition.
   images/General_Awareness/Polity/Historical_Background/1.png: Clean flat vector diagram, 16:9, 1200x675 px, dark navy background (#0f172a), very few labels, VERY LARGE bold white English text, thick lines, simple rounded shapes, high contrast, readable when small, no people, no logos, no watermarks, no extra text beyond the labels listed. Horizontal timeline arrow. Left bar in amber labelled exactly “Company Rule” with “1773 – 1858” under it; right bar in violet labelled exactly “Crown Rule” with “1858 – 1947” under it; a small marker at the junction labelled “1858”. Only these labels.
   images/General_Awareness/Polity/Historical_Background/2.png: Clean flat vector diagram, 16:9, 1200x675 px, dark navy background (#0f172a), very few labels, VERY LARGE bold white English text, thick lines, simple rounded shapes, high contrast, readable when small, no people, no logos, no watermarks, no extra text beyond the labels listed. Diagram of Double Government. A top box in violet labelled exactly “British Government”; an arrow down to a left box labelled exactly “Board of Control” with the word “Politics” below it, and an arrow down to a right box labelled exactly “Court of Directors” with the word “Commerce” below it. Title at the top: “Double Government 1784”. Only these labels.
   images/General_Awareness/Polity/Historical_Background/3.png: Clean flat vector diagram, 16:9, 1200x675 px, dark navy background (#0f172a), very few labels, VERY LARGE bold white English text, thick lines, simple rounded shapes, high contrast, readable when small, no people, no logos, no watermarks, no extra text beyond the labels listed. Diagram of Dyarchy 1919. A top box labelled exactly “Governor”; an arrow down-left to a green box labelled “Transferred” with “Ministers” below it, and an arrow down-right to a red box labelled “Reserved” with “Governor” below it. Title at the top: “Dyarchy in Provinces”. Only these labels.
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   CHANGE LOG (corrections / additions made to the book's content, silently applied inside the pages)
     1. Government of India Act 1919: the notes say reserved subjects were with the “G-G”; corrected to the Governor (provincial level), with his council.
     2. Government of India Act 1935: added that the federal part (dyarchy at the Centre) never actually came into operation.
     3. Charter Act 1813: added the yearly grant of ₹1 lakh for education (not in the notes).
     4. Regulating Act 1773: added that company servants were also barred from private trade (the notes mention only bribes and presents).
     5. Historical Background / Crown Rule: added the context line “after the Revolt of 1857 the Crown took India directly”.
     6. Indian Independence Act 1947: added that independence was actually on 15 August 1947 (the notes give Attlee's 30 June 1948 date first); the notes' “Emperor of India” title drop kept as written.
     7. Indian Councils Act 1861: the notes say “NW Provinces (1886)”; written in full as North-Western Provinces.
     8. Subject folder: the notes did not name one, so “Polity” was used (images/General_Awareness/Polity/Historical_Background/ and scripts/Historical_Background/). Change it with find & replace if your folder is different.
   ════════════════════════════════════════════════════════════════ */