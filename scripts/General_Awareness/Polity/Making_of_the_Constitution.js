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
   MAKING OF THE CONSTITUTION — concept pages mixed in between questions
   Register it in portalData.js like any other test (file: "Making_of_the_Constitution").
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
    accent: "#6366f1",
    pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",

    /* 🎬 tap the 🎯 icon on this page → thumbnail studio + YouTube kit */
    thumb: {
      "image": "images/General_Awareness/Polity/Making_of_the_Constitution/thumbnail.png",
      "banner": "ALL COMPETITIVE EXAMS",
      "line1": "MAKING OF THE",
      "line2": "CONSTITUTION",
      "line3": "FULL CLASS + MCQs",
      "badge": "POLITY",
      "ribbon": "COMMITTEES • DATES • MCQs",
      "burst": "",
      "mode": "creator"
    },
    yt: {
      "title": "Making of the Constitution | Constituent Assembly Full Class | SSC, UPSC, Railways Polity",
      "altTitles": [
            "Constituent Assembly Full Class: Committees, Drafting Committee & Dates | Polity",
            "Making of the Constitution in One Class | All Exams Polity Revision",
            "Drafting Committee & Objectives Resolution Explained | Polity for SSC, UPSC",
            "Constitution Making: Every Date, Committee & Chairman | Polity MCQs"
      ],
      "description": "The Making of the Constitution is one of the highest-scoring Polity chapters for every competitive exam – this full class covers the Constituent Assembly from the first demand to the day the Constitution came into force.\n\n📌 IN THIS CLASS\n✅ Demand for a Constituent Assembly: 1934 → 1946\n✅ Cabinet Mission Plan, 389 seats and how members were chosen\n✅ Elections 1946, Interim Government and the Objectives Resolution\n✅ Changes by the Independence Act, 1947\n✅ All committees and their chairmen\n✅ Drafting Committee, three readings, adoption and enforcement\n✅ 50 practice questions right after the concepts\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Demand for a Constituent Assembly\n00:00 The Cabinet Mission Plan, 1946 & Composition of the Assembly\n00:00 Elections to the Assembly (July–August 1946) & Women Members\n00:00 Interim Government, 1946\n00:00 Objectives Resolution\n00:00 Changes by the Independence Act, 1947\n00:00 Other Functions Performed & Office-bearers\n00:00 Quick Facts – Constitution Making\n00:00 Committees of the Constituent Assembly\n00:00 Drafting Committee – Most Important\n00:00 Enactment of the Constitution\n00:00 Adoption – 26 November 1949\n00:00 Enforcement of the Constitution\n00:00 Experts Committee, 1946\n00:00 Criticism of the Constituent Assembly\n00:00 Important Facts to Remember\n00:00 First Cabinet of Free India, 1947\n\n👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n#Polity #ConstituentAssembly #SSCCGL #UPSC",
      "tags": [
            "making of the constitution",
            "constituent assembly",
            "indian polity",
            "polity for all exams",
            "constituent assembly of india",
            "drafting committee",
            "objectives resolution",
            "cabinet mission plan",
            "indian constitution",
            "constitution making",
            "polity full class",
            "polity questions",
            "polity mcq",
            "polity for ssc cgl",
            "polity for upsc",
            "polity for railways",
            "polity for banking",
            "polity for defence",
            "laxmikanth polity",
            "ssc cgl polity",
            "upsc prelims polity",
            "ssc gk",
            "general studies",
            "static gk",
            "interim government 1946",
            "ibps polity"
      ],
      "hashtags": [
            "Polity",
            "ConstituentAssembly",
            "SSCCGL",
            "UPSC"
      ],
      "thumbText": "MAKING OF THE CONSTITUTION",
      "pinnedComment": "📌 Solve the practice questions in the class and write your score below. Which was the toughest: committees and chairmen or the dates? 👇",
      "communityPost": "📜 New Polity class is live: Making of the Constitution – Constituent Assembly, committees, Drafting Committee and every date for all competitive exams. Start with the overview, then try the questions and tell me your score! 🎯",
      "chapters": "00:00 Class overview\n00:00 Demand for a Constituent Assembly\n00:00 The Cabinet Mission Plan, 1946 & Composition of the Assembly\n00:00 Elections to the Assembly (July–August 1946) & Women Members\n00:00 Interim Government, 1946\n00:00 Objectives Resolution\n00:00 Changes by the Independence Act, 1947\n00:00 Other Functions Performed & Office-bearers\n00:00 Quick Facts – Constitution Making\n00:00 Committees of the Constituent Assembly\n00:00 Drafting Committee – Most Important\n00:00 Enactment of the Constitution\n00:00 Adoption – 26 November 1949\n00:00 Enforcement of the Constitution\n00:00 Experts Committee, 1946\n00:00 Criticism of the Constituent Assembly\n00:00 Important Facts to Remember\n00:00 First Cabinet of Free India, 1947",
      "playlist": "Polity – Full Classes for All Competitive Exams"
    },

    html: `
      <p class="cp-lead">Today's class covers <u>how the Indian Constitution was made</u> – from the first demand for a Constituent Assembly to the day it came into force. This chapter gives <b>sure-shot one-mark questions</b> in every competitive exam, and it is mostly dates, numbers and names that you can lock in with the memory hooks given here.</p><div class="cp-stats"><div class="cp-stat"><b>17</b><span>Concept pages</span></div><div class="cp-stat"><b>50</b><span>Practice questions</span></div><div class="cp-stat"><b>50+</b><span>Key facts</span></div><div class="cp-stat"><b>~60 min</b><span>Time needed</span></div></div><div class="cp-divider">Your roadmap</div><ul class="cp-timeline"><li><b>Demand for a Constituent Assembly</b> – 4 questions</li><li><b>The Cabinet Mission Plan, 1946 &amp; Composition of the Assembly</b> – 5 questions</li><li><b>Elections to the Assembly (July–August 1946) &amp; Women Members</b> – 3 questions</li><li><b>Interim Government, 1946</b> – 2 questions</li><li><b>Objectives Resolution</b> – 4 questions</li><li><b>Changes by the Independence Act, 1947</b> – 3 questions</li><li><b>Other Functions Performed &amp; Office-bearers</b> – 2 questions</li><li><b>Quick Facts – Constitution Making</b> – 2 questions</li><li><b>Committees of the Constituent Assembly</b> – 4 questions</li><li><b>Drafting Committee – Most Important</b> – 5 questions</li><li><b>Enactment of the Constitution</b> – 3 questions</li><li><b>Adoption – 26 November 1949</b> – 2 questions</li><li><b>Enforcement of the Constitution</b> – 3 questions</li><li><b>Experts Committee, 1946</b> – 1 question</li><li><b>Criticism of the Constituent Assembly</b> – 2 questions</li><li><b>Important Facts to Remember</b> – 3 questions</li><li><b>First Cabinet of Free India, 1947</b> – 2 questions</li></ul><div class="cp-divider">What you will be able to do</div><div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">📣 Trace the demand</div>Place 1934, 1935, 1938, 1940, 1942 and 1946 in the right order.</div><div class="cp-card blue"><div class="cp-card-title">🏛️ Explain the Assembly</div>State its 389 seats, how members were chosen and how it changed in 1947.</div><div class="cp-card amber"><div class="cp-card-title">🗂️ Match committees</div>Link every major committee with its chairman without confusion.</div><div class="cp-card red"><div class="cp-card-title">⚠️ Avoid traps</div>Separate look-alike facts: 114 vs 141 days, 299 vs 284, moved vs adopted.</div></div><div class="cp-note exam"><b>Why it matters:</b> questions from this chapter appear in SSC, UPSC Prelims, Railways, Banking and Defence exams, and the same facts help later chapters on the Preamble and the Constitution's features.</div><div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages, so take your time.</div><div class="cp-chips"><span>All Competitive Exams</span><span>Polity</span><span>Making of the Constitution</span><span>High-yield</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE (pauses the timer) ─────────── */
  2: {
    type: "concept",
    icon: "📣",
    accent: "#22c55e",
    pauseTimer: true,
    title: "Demand for a Constituent Assembly",
    html: `
      <p class="cp-lead">A <u>Constituent Assembly</u> is a special body elected or formed only to write a country's Constitution. Before India could get one, the idea had to travel from a <b>single thinker</b> to the <b>Congress</b>, then to the <b>British Government</b>. Remember this chain and the whole topic opens up.</p><div class="cp-stats"><div class="cp-stat"><b>1934</b><span>M. N. Roy</span></div><div class="cp-stat"><b>1935</b><span>INC demand</span></div><div class="cp-stat"><b>1940</b><span>August Offer</span></div><div class="cp-stat"><b>1946</b><span>Cabinet Mission</span></div></div><div class="cp-divider">Timeline of the demand</div><ul class="cp-timeline"><li><b>1934 – M. N. Roy:</b> put forward the idea of a Constituent Assembly for India for the <u>first time</u>. He was a pioneer of the communist movement in India.</li><li><b>1935 – INC:</b> the Indian National Congress <u>officially demanded</u> a Constituent Assembly to frame India's Constitution for the first time.</li><li><b>1938 – Nehru:</b> declared that the Constitution of free India must be framed by a Constituent Assembly elected on <u>adult franchise</u>, without outside interference.</li><li><b>1940 – August Offer:</b> the British Government <u>accepted the demand in principle</u>.</li><li><b>1942 – Cripps Mission:</b> Sir Stafford Cripps brought a draft proposal for an independent Constitution to be adopted <i>after</i> World War II. The Muslim League rejected it and demanded <b>two separate</b> Constituent Assemblies for two states.</li><li><b>1946 – Cabinet Mission:</b> sent after the Cripps Mission failed.</li></ul><div class="cp-note exam"><b>Key facts:</b> first to propose the idea – <b>M. N. Roy (1934)</b>; first official demand by Congress – <b>1935</b>; accepted in principle – <b>August Offer, 1940</b>.</div><div class="cp-note trap">Do not mix up <b>who proposed</b> (Roy, 1934) with <b>who officially demanded</b> (Congress, 1935). Also, the British accepted the demand in <b>1940</b>, not at the Cabinet Mission stage.</div><div class="cp-mnemonic">Years in order: <b>34 – 35 – 38 – 40 – 42 – 46</b> → “<b>R</b>oy, <b>C</b>ongress, <b>N</b>ehru, <b>A</b>ugust, <b>C</b>ripps, <b>C</b>abinet” = <b>R-C-N-A-C-C</b>.</div><details class="cp-collapse"><summary>Why did the Muslim League reject the Cripps proposal?</summary><p>The League wanted a separate state of its own. So instead of one Assembly for the whole of India, it demanded two separate Constituent Assemblies for two states.</p></details><div class="cp-chips"><span>Polity</span><span>Constituent Assembly</span><span>High-yield</span></div>
    `
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "Who put forward the idea of a Constituent Assembly for India for the first time, in 1934?",
    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "C. Rajagopalachari", "M. N. Roy"],
    correct: "4",
    exptext: "✅ M. N. Roy (1934) first put forward the idea. 📌 Roy → Congress → Nehru → August Offer. ❌ Nehru spoke of adult franchise in 1938, and Gandhi was never the first proposer.",
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "In which year did the Indian National Congress officially demand a Constituent Assembly for the first time?",
    options: ["1932", "1934", "1935", "1938"],
    correct: "3",
    exptext: "✅ 1935 – first official Congress demand. 📌 1934 is only the year of M. N. Roy's idea. ❌ 1938 is Nehru's statement on adult franchise.",
  },

  /* ─────────── 5 · QUESTION ─────────── */
  5: {
    questext: "The demand for a Constituent Assembly was accepted in principle by the British Government in the:",
    options: ["Cripps Mission, 1942", "August Offer, 1940", "Cabinet Mission Plan, 1946", "Government of India Act, 1935"],
    correct: "2",
    exptext: "✅ August Offer, 1940 accepted it in principle. 📌 Cripps (1942) brought a draft proposal; Cabinet Mission (1946) gave the actual framework. ❌ The 1935 Act did not provide for a Constituent Assembly.",
  },

  /* ─────────── 6 · QUESTION ─────────── */
  6: {
    questext: "Arrange the events in chronological order: 1. Cripps Mission  2. Nehru's declaration on adult franchise  3. August Offer  4. M. N. Roy's idea",
    options: ["4 – 2 – 3 – 1", "4 – 3 – 2 – 1", "2 – 4 – 3 – 1", "4 – 2 – 1 – 3"],
    correct: "1",
    exptext: "✅ Roy (1934) → Nehru (1938) → August Offer (1940) → Cripps (1942). 📌 Use the 34-35-38-40-42-46 chain. ❌ Putting Cripps before the August Offer is the common slip.",
  },

  /* ─────────── 7 · CONCEPT PAGE (pauses the timer) ─────────── */
  7: {
    type: "concept",
    icon: "🏛️",
    accent: "#3b82f6",
    pauseTimer: true,
    title: "The Cabinet Mission Plan, 1946 & Composition of the Assembly",
    html: `
      <p class="cp-lead">After the Cripps Mission failed, Britain sent a <u>three-member Cabinet Mission</u> in 1946. One of its proposals was accepted, and it gave the <b>framework</b> for forming the Constituent Assembly. The Assembly was constituted in <b>November 1946</b> under this plan.</p><div class="cp-stats"><div class="cp-stat"><b>389</b><span>Total seats</span></div><div class="cp-stat"><b>296</b><span>British India</span></div><div class="cp-stat"><b>93</b><span>Princely States</span></div><div class="cp-stat"><b>≈ 1</b><span>seat per million</span></div></div><div class="cp-divider">The three members</div><div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">Lord Pethick Lawrence</div>Secretary of State for India, member of the Mission.</div><div class="cp-card green"><div class="cp-card-title">Sir Stafford Cripps</div>The same Cripps who came in 1942.</div><div class="cp-card amber"><div class="cp-card-title">A. V. Alexander</div>Third member of the Cabinet Mission.</div></div><div class="cp-divider">Structure of the Assembly</div><div class="cp-fig"><img src="images/General_Awareness/Polity/Making_of_the_Constitution/1.png" alt="389 seats: 296 British India and 93 Princely States" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div><table><thead><tr><th>Part</th><th>Seats</th><th>Note</th></tr></thead><tbody><tr><td>British India</td><td>296</td><td>292 from 11 Governors' provinces + 4 from Chief Commissioners' provinces (one each)</td></tr><tr><td>Princely States</td><td>93</td><td>Nominated by the heads of the states</td></tr><tr><td><b>Total</b></td><td><b>389</b></td><td>Roughly 1 seat for every 1 million people</td></tr></tbody></table><div class="cp-divider">Features of the scheme</div><ol class="cp-steps"><li>Seats of each British province were divided among <b>three communities</b> – Muslims, Sikhs and General (everyone except Muslims and Sikhs) – in proportion to population.</li><li>Each community's representatives were elected by that community's members in the <u>Provincial Legislative Assembly</u>.</li><li>Voting used <b>proportional representation by single transferable vote (STV)</b>.</li><li>Representatives of Princely States were <b>nominated</b> by the heads of the states.</li></ol><div class="cp-note remember">So the Assembly was <b>partly elected, partly nominated</b>, and members were <u>indirectly elected</u> on a <u>limited franchise</u>.</div><div class="cp-note trap">It was <b>not</b> elected directly on adult franchise. And remember <b>292 + 4 = 296</b>.</div><div class="cp-mnemonic"><b>3-8-9</b> → <b>389</b> = <b>296</b> + <b>93</b>. “Cabinet Mission = <b>3</b> members, <b>3</b> communities.”</div><div class="cp-chips"><span>Cabinet Mission</span><span>389 seats</span><span>STV</span></div>
    `
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "Which of the following was NOT a member of the Cabinet Mission, 1946?",
    options: ["Lord Pethick Lawrence", "Sir Stafford Cripps", "A. V. Alexander", "Lord Mountbatten"],
    correct: "4",
    exptext: "✅ Lord Mountbatten was not on the Mission. 📌 The three members were Pethick Lawrence, Cripps and Alexander. ❌ Mountbatten is linked to the 3 June 1947 plan, not to 1946.",
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "The original total strength of the Constituent Assembly under the Cabinet Mission Plan was:",
    options: ["296", "299", "389", "292"],
    correct: "3",
    exptext: "✅ 389 = 296 (British India) + 93 (Princely States). 📌 299 is the reduced strength after the Muslim League withdrew. ❌ 296 and 292 are only parts of the British India share.",
  },

  /* ─────────── 10 · QUESTION ─────────── */
  10: {
    questext: "How many seats were allotted to the Princely States in the Constituent Assembly?",
    options: ["70", "93", "89", "99"],
    correct: "2",
    exptext: "✅ 93 seats, nominated by heads of states. 📌 70 is the number after the 1947 changes. ❌ 89 and 99 are not related figures.",
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "Consider the statements about the Constituent Assembly:\n1. Members were directly elected on adult franchise.\n2. Each community's representatives were elected by that community's members in the Provincial Legislative Assembly through STV.\n3. Princely States' representatives were nominated by the heads of the states.\nWhich are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 2 and 3 are correct. 📌 Remember: indirect election + limited franchise. ❌ Statement 1 is wrong because the election was indirect.",
  },

  /* ─────────── 12 · QUESTION ─────────── */
  12: {
    questext: "How many seats from the British India share came from the Chief Commissioners' provinces?",
    options: ["11", "15", "93", "4 (one each)"],
    correct: "4",
    exptext: "✅ 4 seats, one for each Chief Commissioner's province. 📌 292 from Governors' provinces + 4 = 296. ❌ 11 is the number of Governors' provinces, not seats of Chief Commissioners' provinces.",
  },

  /* ─────────── 13 · CONCEPT PAGE (pauses the timer) ─────────── */
  13: {
    type: "concept",
    icon: "🗳️",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "Elections to the Assembly (July–August 1946) & Women Members",
    html: `
      <p class="cp-lead">Elections to the <b>296</b> British-India seats were held in <u>July–August 1946</u>. The Congress swept the polls, the Muslim League came second, and the princely states stayed away.</p><div class="cp-stats"><div class="cp-stat"><b>208</b><span>INC</span></div><div class="cp-stat"><b>73</b><span>Muslim League</span></div><div class="cp-stat"><b>15</b><span>Others</span></div><div class="cp-stat"><b>15</b><span>Women members</span></div></div><table><thead><tr><th>Group</th><th>Seats</th></tr></thead><tbody><tr><td>Indian National Congress (INC)</td><td>208</td></tr><tr><td>Muslim League</td><td>73</td></tr><tr><td>Small groups &amp; independents</td><td>15</td></tr><tr><td><b>Total</b></td><td><b>296</b></td></tr></tbody></table><div class="cp-note trap">The <b>93 princely-state seats were left vacant</b> at this stage because the states stayed away from the Assembly.</div><div class="cp-note info">Though not elected directly on adult franchise, the Assembly represented all sections – Hindus, Muslims, Sikhs, Parsis, Anglo-Indians, Indian Christians, SCs, STs and women. It had almost all important leaders of the time, <u>except Mahatma Gandhi</u>.</div><div class="cp-divider">Women in the Constituent Assembly</div><p class="cp-lead">There were <b>15 women members</b>, who contributed to women's rights, social welfare and fundamental rights.</p><div class="cp-chips"><span>Ammu Swaminathan</span><span>Dakshayani Velayudhan</span><span>Begum Aizaz Rasul</span><span>Durgabai Deshmukh</span><span>Hansa Jivraj Mehta</span><span>Kamla Chaudhry</span><span>Leela Roy</span><span>Malati Choudhury</span><span>Purnima Banerjee</span><span>Rajkumari Amrit Kaur</span><span>Renuka Ray</span><span>Sarojini Naidu</span><span>Sucheta Kriplani</span><span>Vijaya Lakshmi Pandit</span><span>Annie Mascarene</span></div><div class="cp-note exam">Exam favourites: <b>Sarojini Naidu, Rajkumari Amrit Kaur, Durgabai Deshmukh, Hansa Mehta, Vijaya Lakshmi Pandit, Sucheta Kriplani</b>.</div><div class="cp-mnemonic"><b>208 + 73 + 15 = 296</b> – “Congress took <b>two-oh-eight</b>, League <b>seventy-three</b>.”</div>
    `
  },

  /* ─────────── 14 · QUESTION ─────────── */
  14: {
    questext: "In the 1946 elections to the Constituent Assembly, how many of the 296 seats did the INC win?",
    options: ["208", "73", "199", "215"],
    correct: "1",
    exptext: "✅ INC won 208 seats. 📌 208 + 73 + 15 = 296. ❌ 73 is the Muslim League's tally.",
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "Which statement about the 1946 elections is correct?",
    options: ["The 93 princely-state seats were filled by election", "Mahatma Gandhi was a member of the Assembly", "The Muslim League won 73 seats", "Members were elected directly on adult franchise"],
    correct: "3",
    exptext: "✅ The Muslim League won 73 seats. 📌 Princely-state seats stayed vacant at first, and Gandhi was not a member. ❌ The election was indirect and on a limited franchise.",
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "Which of the following was NOT a woman member of the Constituent Assembly?",
    options: ["Sarojini Naidu", "Annie Besant", "Durgabai Deshmukh", "Annie Mascarene"],
    correct: "2",
    exptext: "✅ Annie Besant was not a member. 📌 15 women were members, including Naidu, Amrit Kaur and Hansa Mehta. ❌ Annie Mascarene is easy to confuse with Besant, but she was a member.",
  },

  /* ─────────── 17 · CONCEPT PAGE (pauses the timer) ─────────── */
  17: {
    type: "concept",
    icon: "🏢",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Interim Government, 1946",
    html: `
      <p class="cp-lead">While the Assembly was being formed, an <u>Interim Government</u> was set up on <b>2 September 1946</b>. It worked inside the Viceroy's Executive Council, so the <b>Viceroy remained its head</b> and Nehru was its <b>Vice-President</b>.</p><table><thead><tr><th>Member</th><th>Portfolio(s)</th></tr></thead><tbody><tr><td>Jawaharlal Nehru</td><td>Vice-President of Council; External Affairs &amp; Commonwealth Relations</td></tr><tr><td>Sardar Vallabhbhai Patel</td><td>Home, Information &amp; Broadcasting</td></tr><tr><td>Dr. Rajendra Prasad</td><td>Food &amp; Agriculture</td></tr><tr><td>Dr. John Mathai</td><td>Industries &amp; Supplies</td></tr><tr><td>Sardar Baldev Singh</td><td>Defence</td></tr><tr><td>C. H. Bhabha</td><td>Works, Mines &amp; Power</td></tr><tr><td>Liaquat Ali Khan</td><td>Finance</td></tr><tr><td>Abdur Rab Nishtar</td><td>Posts &amp; Air</td></tr><tr><td>Asaf Ali</td><td>Railways &amp; Transport</td></tr><tr><td>C. Rajagopalachari</td><td>Education &amp; Arts</td></tr><tr><td>Jagjivan Ram</td><td>Labour</td></tr><tr><td>Ghazanfar Ali Khan</td><td>Health</td></tr><tr><td>Jogindar Nath Mandal</td><td>Law</td></tr></tbody></table><div class="cp-note trap">Do not confuse this with the <b>First Cabinet of Free India (1947)</b>: there Nehru is <i>Prime Minister</i> and Ambedkar is <i>Law Minister</i>. Here Nehru is only <i>Vice-President</i> of the Council and <b>Liaquat Ali Khan holds Finance</b>.</div><div class="cp-mnemonic">Interim = <b>Vice</b>-President Nehru (Viceroy is boss). Free India = <b>Prime</b> Minister Nehru.</div>
    `
  },

  /* ─────────── 18 · QUESTION ─────────── */
  18: {
    questext: "Who was the Vice-President of the Viceroy's Executive Council in the Interim Government formed on 2 September 1946?",
    options: ["Sardar Vallabhbhai Patel", "Dr. Rajendra Prasad", "Liaquat Ali Khan", "Jawaharlal Nehru"],
    correct: "4",
    exptext: "✅ Nehru was Vice-President of the Council. 📌 The Viceroy remained the head. ❌ Patel held Home; Liaquat held Finance.",
  },

  /* ─────────── 19 · QUESTION ─────────── */
  19: {
    questext: "Which pair of Interim Government member and portfolio is correctly matched?",
    options: ["Liaquat Ali Khan – Finance", "Sardar Patel – Defence", "Baldev Singh – Home", "C. Rajagopalachari – Railways"],
    correct: "1",
    exptext: "✅ Liaquat Ali Khan held Finance. 📌 Patel – Home; Baldev Singh – Defence; Rajagopalachari – Education and Arts. ❌ The other pairs swap portfolios.",
  },

  /* ─────────── 20 · CONCEPT PAGE (pauses the timer) ─────────── */
  20: {
    type: "concept",
    icon: "📜",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Objectives Resolution",
    html: `
      <p class="cp-lead">The <u>Objectives Resolution</u> is the Assembly's statement of purpose. It laid down the <b>fundamentals and philosophy</b> of the constitutional structure and later became the heart of the Preamble.</p><div class="cp-stats"><div class="cp-stat"><b>13 Dec 1946</b><span>Moved by Nehru</span></div><div class="cp-stat"><b>22 Jan 1947</b><span>Adopted</span></div><div class="cp-stat"><b>Unanimous</b><span>Vote</span></div><div class="cp-stat"><b>Preamble</b><span>Its modified form</span></div></div><div class="cp-note remember">It declared a “<b>firm and solemn resolve to proclaim India as an Independent Sovereign Republic</b>” and to draw up a Constitution for her future governance.</div><div class="cp-divider">Main provisions</div><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Power from the people</div>All power and authority of sovereign India and its organs are derived from the <u>people</u>.</div><div class="cp-card green"><div class="cp-card-title">Justice, equality, freedom</div>Justice (social, economic, political); equality of status, opportunity and before law; freedom of thought, expression, belief, faith, worship, vocation, association and action.</div><div class="cp-card amber"><div class="cp-card-title">Safeguards</div>Adequate safeguards for minorities, backward, tribal and depressed classes.</div><div class="cp-card red"><div class="cp-card-title">Residuary powers</div>Residuary powers rest with the <b>Union</b>, not with the provinces.</div></div><div class="cp-note exam">Adopted <b>unanimously on 22 January 1947</b>. Its modified version forms the <u>Preamble</u> of the present Constitution.</div><div class="cp-note trap"><b>Moved</b> (13 Dec 1946) and <b>adopted</b> (22 Jan 1947) are different dates. Residuary powers go to the <b>Union</b>.</div><div class="cp-mnemonic"><b>13</b>th moved, <b>22</b>nd adopted – “Nehru moved it in <b>December</b>, the House passed it in <b>January</b>.”</div>
    `
  },

  /* ─────────── 21 · QUESTION ─────────── */
  21: {
    questext: "The Objectives Resolution was moved in the Constituent Assembly on:",
    options: ["9 December 1946", "22 January 1947", "13 December 1946", "26 November 1949"],
    correct: "3",
    exptext: "✅ Moved by Nehru on 13 December 1946. 📌 9 December 1946 is the date the Assembly first met. ❌ 22 January 1947 is the adoption date.",
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "The Objectives Resolution was adopted unanimously on:",
    options: ["13 December 1946", "22 January 1947", "15 August 1947", "26 January 1950"],
    correct: "2",
    exptext: "✅ Adopted unanimously on 22 January 1947. 📌 Moved in December, adopted in January. ❌ 15 August 1947 is Independence Day and 26 January 1950 is commencement.",
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "The modified version of the Objectives Resolution forms which part of the Constitution?",
    options: ["The Fundamental Duties", "The Directive Principles", "The Seventh Schedule", "The Preamble"],
    correct: "4",
    exptext: "✅ The Preamble. 📌 Sovereign Republic, justice, equality and liberty all come from it. ❌ The other parts were developed separately.",
  },

  /* ─────────── 24 · QUESTION ─────────── */
  24: {
    questext: "Which of the following was NOT a provision of the Objectives Resolution?",
    options: ["Residuary powers rest with the provinces", "All power of sovereign India is derived from the people", "Safeguards for minorities and backward classes", "Residuary powers rest with the Union"],
    correct: "1",
    exptext: "✅ Residuary powers were given to the Union, not the provinces. 📌 Strong-Union idea. ❌ The other three statements are actual provisions.",
  },

  /* ─────────── 25 · CONCEPT PAGE (pauses the timer) ─────────── */
  25: {
    type: "concept",
    icon: "⚖️",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Changes by the Independence Act, 1947",
    html: `
      <p class="cp-lead">Princely states that had stayed away <u>gradually joined</u>. On <b>28 April 1947</b> six states took their seats, and after the <b>Mountbatten Plan (3 June 1947)</b> most others followed. Then the <b>Indian Independence Act, 1947</b> changed the Assembly's position in <b>three ways</b>.</p><div class="cp-grid c3"><div class="cp-card green"><div class="cp-card-title">1 · Fully sovereign</div>It became a sovereign body, free to frame <u>any Constitution</u> it liked.</div><div class="cp-card blue"><div class="cp-card-title">2 · Legislative body too</div>It became the first Parliament (Dominion Legislature).</div><div class="cp-card red"><div class="cp-card-title">3 · League withdrew</div>The Muslim League members withdrew, so the strength fell.</div></div><table><thead><tr><th></th><th>Before</th><th>After</th></tr></thead><tbody><tr><td>Total strength</td><td>389</td><td><b>299</b></td></tr><tr><td>British provinces</td><td>296</td><td><b>229</b></td></tr><tr><td>Princely States</td><td>93</td><td><b>70</b></td></tr></tbody></table><table><thead><tr><th>Role</th><th>Chairman</th></tr></thead><tbody><tr><td>As constitution-maker</td><td>Dr. Rajendra Prasad</td></tr><tr><td>As legislature</td><td>G. V. Mavlankar</td></tr></tbody></table><div class="cp-note exam">Both functions ran side by side till <b>26 November 1949</b>.</div><div class="cp-note trap"><b>299 = 229 + 70</b>. Do not mix 299 with 284 (the number who actually signed).</div><div class="cp-mnemonic">Prasad <b>P</b>repares the Constitution, Mavlankar <b>M</b>akes the laws – <b>P</b> for Constitution-<b>P</b>repare, <b>M</b> for <b>M</b>aking laws.</div>
    `
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "After the Muslim League withdrew, the strength of the Constituent Assembly fell from 389 to:",
    options: ["296", "284", "299", "229"],
    correct: "3",
    exptext: "✅ 299 = 229 (British provinces) + 70 (states). 📌 389 → 299. ❌ 284 is how many signed the Constitution; 229 is only the provinces' share.",
  },

  /* ─────────── 27 · QUESTION ─────────── */
  27: {
    questext: "Which of the following was NOT a change brought by the Indian Independence Act, 1947 in the Assembly's position?",
    options: ["It became a fully sovereign body", "It became subject to the British Parliament's approval", "It became a legislative body also", "The Muslim League withdrew from it"],
    correct: "2",
    exptext: "✅ The Act made it sovereign, not subject to British approval. 📌 Three changes: sovereign, legislative, League withdrew. ❌ The other three actually happened.",
  },

  /* ─────────── 28 · QUESTION ─────────── */
  28: {
    questext: "Who chaired the Constituent Assembly when it met as a legislative body?",
    options: ["Dr. Rajendra Prasad", "H. C. Mukherjee", "Dr. Sachchidananda Sinha", "G. V. Mavlankar"],
    correct: "4",
    exptext: "✅ G. V. Mavlankar chaired the legislative sittings. 📌 Prasad chaired it as constitution-maker. ❌ Sinha was only the temporary President.",
  },

  /* ─────────── 29 · CONCEPT PAGE (pauses the timer) ─────────── */
  29: {
    type: "concept",
    icon: "🎖️",
    accent: "#ec4899",
    pauseTimer: true,
    title: "Other Functions Performed & Office-bearers",
    html: `
      <p class="cp-lead">Besides framing the Constitution and making ordinary laws, the Assembly also did several <u>national tasks</u>. They are tested again and again as <b>date → event</b> pairs.</p><ul class="cp-timeline"><li><b>May 1949:</b> ratified India's membership of the <u>Commonwealth</u>.</li><li><b>22 July 1947:</b> adopted the <u>National Flag</u>.</li><li><b>24 January 1950:</b> adopted the <u>National Anthem and National Song</u>.</li><li><b>24 January 1950:</b> elected <u>Dr. Rajendra Prasad as the first President of India</u>.</li></ul><div class="cp-divider">Who presided?</div><table><thead><tr><th>Post</th><th>Person</th></tr></thead><tbody><tr><td>Temporary President</td><td>Dr. Sachchidananda Sinha</td></tr><tr><td>President (as constituent body)</td><td>Dr. Rajendra Prasad</td></tr><tr><td>Chair (as legislative body)</td><td>G. V. Mavlankar</td></tr><tr><td>Vice-Presidents</td><td>V. T. Krishnamachari and H. C. Mukherjee</td></tr></tbody></table><div class="cp-note trap">Flag is <b>1947</b> (22 July); anthem, song and first President election are all <b>24 January 1950</b> – <u>two days</u> before the Republic began.</div><div class="cp-mnemonic"><b>F</b>lag in <b>J</b>uly, <b>A</b>nthem in <b>J</b>anuary (1950).</div>
    `
  },

  /* ─────────── 30 · QUESTION ─────────── */
  30: {
    questext: "The National Flag was adopted by the Constituent Assembly on:",
    options: ["22 July 1947", "15 August 1947", "24 January 1950", "26 January 1950"],
    correct: "1",
    exptext: "✅ 22 July 1947. 📌 Before independence day. ❌ 24 Jan 1950 is the anthem/song date; 26 Jan 1950 is commencement.",
  },

  /* ─────────── 31 · QUESTION ─────────── */
  31: {
    questext: "Which of the following was done by the Constituent Assembly on 24 January 1950?",
    options: ["Ratified Commonwealth membership", "Adopted the National Flag", "Adopted the National Anthem and National Song and elected the first President", "Passed the Constitution"],
    correct: "3",
    exptext: "✅ Anthem, song and first President election – all on 24 Jan 1950. 📌 Commonwealth: May 1949; flag: 22 July 1947. ❌ The Constitution was adopted on 26 Nov 1949.",
  },

  /* ─────────── 32 · CONCEPT PAGE (pauses the timer) ─────────── */
  32: {
    type: "concept",
    icon: "⚡",
    accent: "#06b6d4",
    pauseTimer: true,
    title: "Quick Facts – Constitution Making",
    html: `
      <p class="cp-lead">A small cluster of <u>numbers</u> that examiners love. Learn them as pairs.</p><div class="cp-stats"><div class="cp-stat"><b>11</b><span>Sessions</span></div><div class="cp-stat"><b>2y 11m 18d</b><span>Total time</span></div><div class="cp-stat"><b>≈ 60</b><span>Countries studied</span></div><div class="cp-stat"><b>114</b><span>Days on the draft</span></div></div><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Sessions</div><b>11 sessions</b> over <b>2 years, 11 months, 18 days</b>.</div><div class="cp-card green"><div class="cp-card-title">Foreign study</div>About <b>60 countries'</b> constitutions were studied.</div><div class="cp-card amber"><div class="cp-card-title">Draft considered</div>The draft was considered for <b>114 days</b>.</div><div class="cp-card violet"><div class="cp-card-title">Expenditure</div>Total expenditure was <b>₹64 lakh</b>.</div></div><table><thead><tr><th>Event</th><th>Date</th></tr></thead><tbody><tr><td>First session</td><td>9–23 December 1946</td></tr><tr><td>Final session</td><td>24 January 1950</td></tr><tr><td>Provisional Parliament</td><td>From 26 January 1950 till the 1951–52 elections</td></tr></tbody></table><div class="cp-note trap"><b>114 days</b> = the Assembly on the draft; <b>141 days</b> = the Drafting Committee's sittings. Don't swap them.</div><div class="cp-mnemonic"><b>11</b> sessions, <b>114</b> days – both start with “<b>11</b>”.</div>
    `
  },

  /* ─────────── 33 · QUESTION ─────────── */
  33: {
    questext: "How many sessions did the Constituent Assembly hold in total?",
    options: ["9", "11", "12", "14"],
    correct: "2",
    exptext: "✅ 11 sessions over 2 years, 11 months and 18 days. 📌 Both ‘11’s. ❌ Other numbers are not given in the record.",
  },

  /* ─────────── 34 · QUESTION ─────────── */
  34: {
    questext: "For how many days did the Constituent Assembly consider the draft Constitution?",
    options: ["60 days", "141 days", "165 days", "114 days"],
    correct: "4",
    exptext: "✅ 114 days. 📌 141 days is the Drafting Committee's sittings. ❌ 60 is the approx. number of countries studied.",
  },

  /* ─────────── 35 · CONCEPT PAGE (pauses the timer) ─────────── */
  35: {
    type: "concept",
    icon: "🗂️",
    accent: "#a855f7",
    pauseTimer: true,
    title: "Committees of the Constituent Assembly",
    html: `
      <p class="cp-lead">The Assembly did its real work through <u>committees</u>. There were <b>8 major committees</b> and several minor ones. Always learn <b>committee → chairman</b> together.</p><div class="cp-divider">Major committees &amp; chairmen</div><table><thead><tr><th>Committee</th><th>Chairman</th></tr></thead><tbody><tr><td>Union Constitution Committee</td><td>J. L. Nehru</td></tr><tr><td>Union Powers Committee</td><td>Jawaharlal Nehru</td></tr><tr><td>Provincial Constitution Committee</td><td>Sardar Patel</td></tr><tr><td>Drafting Committee</td><td>Dr. B. R. Ambedkar</td></tr><tr><td>Rules of Procedure Committee</td><td>Dr. Rajendra Prasad</td></tr><tr><td>States Committee (negotiating with states)</td><td>Jawaharlal Nehru</td></tr><tr><td>Steering Committee</td><td>Dr. Rajendra Prasad</td></tr><tr><td>Advisory Committee (Fundamental Rights, Minorities, Tribal &amp; Excluded Areas)</td><td>Sardar Patel</td></tr></tbody></table><div class="cp-divider">Sub-committees of the Advisory Committee</div><table><thead><tr><th>Sub-committee</th><th>Chairman</th></tr></thead><tbody><tr><td>Fundamental Rights</td><td>J. B. Kripalani</td></tr><tr><td>Minorities</td><td>H. C. Mookerjee</td></tr><tr><td>NE Frontier Tribal Areas &amp; Assam Excluded/Partially Excluded Areas</td><td>Gopinath Bardoloi</td></tr><tr><td>Excluded &amp; Partially Excluded Areas (other than Assam)</td><td>A. V. Thakkar</td></tr></tbody></table><div class="cp-divider">Minor committees &amp; chairmen</div><table><thead><tr><th>Committee</th><th>Chairman</th></tr></thead><tbody><tr><td>Finance &amp; Staff Committee</td><td>Dr. Rajendra Prasad</td></tr><tr><td>House Committee</td><td>B. Pattabhi Sitaramayya</td></tr><tr><td>Order of Business Committee</td><td>Dr. K. M. Munshi</td></tr><tr><td>Ad-hoc Committee on National Flag</td><td>Dr. Rajendra Prasad</td></tr><tr><td>Committee on Functions of the Assembly</td><td>G. V. Mavlankar</td></tr><tr><td>Linguistic Provinces Commission</td><td>S. K. Dar (not an Assembly member)</td></tr><tr><td>Special Committee to Examine Draft Constitution</td><td>Jawaharlal Nehru</td></tr><tr><td>Press Gallery Committee</td><td>Usha Nath Sen</td></tr><tr><td>Ad-hoc Committee on Citizenship and Supreme Court</td><td>S. Varadachariar</td></tr></tbody></table><div class="cp-note exam"><b>Nehru</b> chaired Union Constitution, Union Powers and States; <b>Prasad</b> chaired Rules of Procedure and Steering; <b>Patel</b> chaired Provincial Constitution and Advisory.</div><div class="cp-mnemonic"><b>N</b>ehru = <b>U</b>nion (×2) + <b>S</b>tates; <b>P</b>rasad = <b>R</b>ules + <b>S</b>teering; <b>P</b>atel = <b>P</b>rovincial + <b>A</b>dvisory.</div><details class="cp-collapse"><summary>Why is S. K. Dar special?</summary><p>He chaired the Linguistic Provinces Commission, and he was <b>not</b> a member of the Assembly.</p></details>
    `
  },

  /* ─────────── 36 · QUESTION ─────────── */
  36: {
    questext: "Who was the Chairman of the Provincial Constitution Committee?",
    options: ["Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Dr. Rajendra Prasad", "Dr. B. R. Ambedkar"],
    correct: "1",
    exptext: "✅ Patel chaired it (and the Advisory Committee). 📌 Patel = Provincial + Advisory. ❌ Nehru chaired Union committees; Ambedkar chaired Drafting.",
  },

  /* ─────────── 37 · QUESTION ─────────── */
  37: {
    questext: "Which committee–chairman pair is correctly matched?",
    options: ["Union Powers Committee – Sardar Patel", "Rules of Procedure Committee – J. L. Nehru", "Steering Committee – Dr. Rajendra Prasad", "States Committee – Dr. B. R. Ambedkar"],
    correct: "3",
    exptext: "✅ Prasad chaired the Steering Committee. 📌 Nehru chaired Union Powers and States committees. ❌ The other pairs are wrong.",
  },

  /* ─────────── 38 · QUESTION ─────────── */
  38: {
    questext: "Who chaired the Fundamental Rights sub-committee of the Advisory Committee?",
    options: ["H. C. Mookerjee", "J. B. Kripalani", "Gopinath Bardoloi", "A. V. Thakkar"],
    correct: "2",
    exptext: "✅ J. B. Kripalani. 📌 Minorities was Mookerjee. ❌ Bardoloi handled NE tribal areas; Thakkar the other excluded areas.",
  },

  /* ─────────── 39 · QUESTION ─────────── */
  39: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Order of Business Committee – Dr. K. M. Munshi", "House Committee – B. Pattabhi Sitaramayya", "Linguistic Provinces Commission – S. K. Dar", "Committee on Functions of the Assembly – Dr. K. M. Munshi"],
    correct: "4",
    exptext: "✅ The Functions committee was chaired by G. V. Mavlankar. 📌 Munshi chaired Order of Business. ❌ The other three pairs are correct.",
  },

  /* ─────────── 40 · CONCEPT PAGE (pauses the timer) ─────────── */
  40: {
    type: "concept",
    icon: "✍️",
    accent: "#f97316",
    pauseTimer: true,
    title: "Drafting Committee – Most Important",
    html: `
      <p class="cp-lead">The <u>Drafting Committee</u> turned the Assembly's decisions into a clean draft. It was set up on <b>29 August 1947</b> with <b>seven members</b>, and <b>Dr. B. R. Ambedkar</b> was its Chairman.</p><table><thead><tr><th>Member</th><th>Note</th></tr></thead><tbody><tr><td>Dr. B. R. Ambedkar</td><td>Chairman</td></tr><tr><td>N. Gopalaswamy Ayyangar</td><td></td></tr><tr><td>Alladi Krishnaswamy Ayyar</td><td></td></tr><tr><td>Dr. K. M. Munshi</td><td></td></tr><tr><td>Syed Mohammad Saadullah</td><td></td></tr><tr><td>N. Madhava Rau</td><td>Replaced B. L. Mitter, who resigned</td></tr><tr><td>T. T. Krishnamachari</td><td>Replaced D. P. Khaitan, who died in 1948</td></tr></tbody></table><div class="cp-divider">Key facts</div><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Sittings</div>It sat for only <b>141 days</b>; first meeting on <b>30 August 1947</b>.</div><div class="cp-card green"><div class="cp-card-title">First draft</div>Prepared by <b>B. N. Rau</b>, the Constitutional Advisor: <b>243 Articles and 13 Schedules</b>.</div></div><div class="cp-note trap">B. N. Rau was the <b>Constitutional Advisor</b>, not a member of the Drafting Committee. And <b>141 days</b> is the Committee, <b>114 days</b> is the Assembly.</div><div class="cp-note exam">Memory pair: <b>Mitter → Madhava Rau</b> (resigned); <b>Khaitan → T. T. Krishnamachari</b> (died).</div><div class="cp-mnemonic">Two replacements: <b>M</b>itter→<b>M</b>adhava Rau, <b>K</b>haitan→<b>K</b>rishnamachari.</div>
    `
  },

  /* ─────────── 41 · QUESTION ─────────── */
  41: {
    questext: "The Drafting Committee of the Constituent Assembly was set up on:",
    options: ["29 August 1947", "13 December 1946", "15 August 1947", "26 November 1949"],
    correct: "1",
    exptext: "✅ 29 August 1947; first meeting 30 Aug. 📌 The Committee was formed after independence. ❌ 13 Dec 1946 is the Objectives Resolution.",
  },

  /* ─────────── 42 · QUESTION ─────────── */
  42: {
    questext: "How many members did the Drafting Committee have?",
    options: ["5", "9", "7", "11"],
    correct: "3",
    exptext: "✅ Seven members including the Chairman. 📌 Ambedkar chaired. ❌ Other numbers are not correct.",
  },

  /* ─────────── 43 · QUESTION ─────────── */
  43: {
    questext: "D. P. Khaitan, who died in 1948, was replaced in the Drafting Committee by:",
    options: ["N. Madhava Rau", "T. T. Krishnamachari", "K. M. Munshi", "Syed Mohammad Saadullah"],
    correct: "2",
    exptext: "✅ T. T. Krishnamachari. 📌 B. L. Mitter (resigned) was replaced by N. Madhava Rau. ❌ Munshi and Saadullah were original members.",
  },

  /* ─────────── 44 · QUESTION ─────────── */
  44: {
    questext: "The first draft prepared by the Constitutional Advisor B. N. Rau contained:",
    options: ["315 Articles and 8 Schedules", "395 Articles and 8 Schedules", "395 Articles and 22 Parts", "243 Articles and 13 Schedules"],
    correct: "4",
    exptext: "✅ 243 Articles and 13 Schedules. 📌 The final text had 395 Articles and 8 Schedules. ❌ Those figures belong to later stages.",
  },

  /* ─────────── 45 · QUESTION ─────────── */
  45: {
    questext: "Consider the statements:\n1. Dr. B. R. Ambedkar was the Chairman of the Drafting Committee.\n2. The Drafting Committee sat for 141 days.\n3. B. N. Rau was a member of the Drafting Committee.\nWhich are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ 1 and 2 are correct. 📌 Rau was only the Constitutional Advisor. ❌ Statement 3 is wrong.",
  },

  /* ─────────── 46 · CONCEPT PAGE (pauses the timer) ─────────── */
  46: {
    type: "concept",
    icon: "📚",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Enactment of the Constitution",
    html: `
      <p class="cp-lead">The Constitution passed through <u>three readings</u>, like an ordinary Bill. Learn each reading by <b>date + what happened</b>.</p><div class="cp-fig"><img src="images/General_Awareness/Polity/Making_of_the_Constitution/2.png" alt="Three readings of the Constitution" style="display:block;width:100%;max-width:320px;max-height:200px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div><ol class="cp-steps"><li><b>First reading:</b> Dr. Ambedkar introduced the final draft on <b>4 November 1948</b>; general discussion lasted <b>5 days</b> (till 9 November 1948).</li><li><b>Second reading:</b> <b>15 November 1948 to 17 October 1949</b>; <b>7,635 amendments</b> proposed, <b>2,473</b> actually discussed.</li><li><b>Third reading:</b> began <b>14 November 1949</b>; Ambedkar moved that “the Constitution as settled be passed”.</li></ol><div class="cp-note exam">Ambedkar introduced the draft (<b>4 Nov 1948</b>) and moved it for passing (<b>14 Nov 1949</b>).</div><div class="cp-note trap">Two similar dates: <b>14 Nov 1949</b> (third reading starts) vs <b>26 Nov 1949</b> (adoption).</div><div class="cp-mnemonic"><b>1</b>st reading <b>4</b> Nov 48 (5 days). <b>2</b>nd: <b>15 Nov 48 – 17 Oct 49</b>. <b>3</b>rd: <b>14</b> Nov 49.</div>
    `
  },

  /* ─────────── 47 · QUESTION ─────────── */
  47: {
    questext: "Dr. B. R. Ambedkar introduced the final draft of the Constitution in the Assembly on:",
    options: ["4 November 1948", "15 November 1948", "14 November 1949", "26 November 1949"],
    correct: "1",
    exptext: "✅ 4 November 1948 – first reading. 📌 General discussion lasted 5 days. ❌ 14 Nov 1949 is the start of the third reading.",
  },

  /* ─────────── 48 · QUESTION ─────────── */
  48: {
    questext: "During the second reading of the Constitution, the number of amendments proposed and discussed were respectively:",
    options: ["2,473 proposed and 7,635 discussed", "7,635 proposed and 4,273 discussed", "7,635 proposed and 2,473 discussed", "5,376 proposed and 2,473 discussed"],
    correct: "3",
    exptext: "✅ 7,635 proposed, 2,473 discussed. 📌 Many more were proposed than discussed. ❌ Other options swap or alter the figures.",
  },

  /* ─────────── 49 · QUESTION ─────────── */
  49: {
    questext: "Which reading of the Constitution ran from 15 November 1948 to 17 October 1949?",
    options: ["First reading", "Second reading", "Third reading", "Final reading"],
    correct: "2",
    exptext: "✅ The second reading. 📌 Third reading began on 14 Nov 1949. ❌ The first reading lasted only till 9 Nov 1948.",
  },

  /* ─────────── 50 · CONCEPT PAGE (pauses the timer) ─────────── */
  50: {
    type: "concept",
    icon: "🖋️",
    accent: "#84cc16",
    pauseTimer: true,
    title: "Adoption – 26 November 1949",
    html: `
      <p class="cp-lead">The motion was passed and the Constitution was <u>signed on 26 November 1949</u>. This is why <b>26 November</b> is celebrated as Constitution Day.</p><div class="cp-stats"><div class="cp-stat"><b>26 Nov 1949</b><span>Adopted</span></div><div class="cp-stat"><b>284 / 299</b><span>Present &amp; signed</span></div><div class="cp-stat"><b>395</b><span>Articles</span></div><div class="cp-stat"><b>8</b><span>Schedules</span></div></div><div class="cp-note exam">As adopted it had a <b>Preamble, 395 Articles, 8 Schedules and 22 Parts</b>.</div><div class="cp-note info">Dr. B. R. Ambedkar = <b>Father of the Indian Constitution</b> / Chief Architect / ‘Modern Manu’.</div><div class="cp-note trap">Of 299 members only <b>284</b> were present and signed. Do not write 299 as the number of signatories.</div><div class="cp-mnemonic"><b>26-11-49</b>: <b>3-9-5 → 395</b> Articles.</div>
    `
  },

  /* ─────────── 51 · QUESTION ─────────── */
  51: {
    questext: "Of the 299 members of the Assembly, how many were present and signed the Constitution on 26 November 1949?",
    options: ["299", "289", "296", "284"],
    correct: "4",
    exptext: "✅ 284 members signed. 📌 299 was the total strength. ❌ 289 and 296 are not the correct counts.",
  },

  /* ─────────── 52 · QUESTION ─────────── */
  52: {
    questext: "The Constitution as adopted on 26 November 1949 contained:",
    options: ["A Preamble, 395 Articles, 8 Schedules and 22 Parts", "A Preamble, 395 Articles, 12 Schedules and 25 Parts", "A Preamble, 315 Articles, 8 Schedules and 22 Parts", "A Preamble, 243 Articles, 13 Schedules and 22 Parts"],
    correct: "1",
    exptext: "✅ Preamble, 395 Articles, 8 Schedules, 22 Parts. 📌 243/13 is Rau's first draft. ❌ Other options mix figures from other stages.",
  },

  /* ─────────── 53 · CONCEPT PAGE (pauses the timer) ─────────── */
  53: {
    type: "concept",
    icon: "🇮🇳",
    accent: "#e11d48",
    pauseTimer: true,
    title: "Enforcement of the Constitution",
    html: `
      <p class="cp-lead">The Constitution came into force in <u>two stages</u>.</p><div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">26 November 1949</div>Provisions on <b>citizenship, elections, provisional Parliament</b>, etc. – Articles <b>5, 6, 7, 8, 9, 60, 324, 366, 367, 379, 380, 388, 391, 392, 393</b>.</div><div class="cp-card green"><div class="cp-card-title">26 January 1950</div>The remaining (major) part – the <b>date of commencement</b>, celebrated as <u>Republic Day</u>.</div></div><div class="cp-divider">Why 26 January?</div><div class="cp-note remember">On this day in <b>1930</b>, <u>Purna Swaraj Day</u> was celebrated, following the <b>Lahore Session (Dec 1929)</b> of the INC.</div><div class="cp-note exam">On commencement, the <b>Independence Act 1947</b> and the <b>Government of India Act 1935</b> were repealed.</div><div class="cp-note trap">Fundamental Rights and DPSP started on <b>26 Jan 1950</b>, not 26 Nov 1949.</div><div class="cp-mnemonic"><b>Nov</b>ember = <b>few</b> articles; <b>Jan</b>uary = <b>all</b> the rest.</div>
    `
  },

  /* ─────────── 54 · QUESTION ─────────── */
  54: {
    questext: "Why was 26 January chosen as the date of commencement of the Constitution?",
    options: ["Quit India Movement began on this date", "The Dandi March ended on this date", "Purna Swaraj Day was celebrated on 26 January 1930", "The Jallianwala Bagh massacre took place on this date"],
    correct: "3",
    exptext: "✅ Purna Swaraj Day, 1930 (after the Lahore Session). 📌 Republic Day honours that pledge. ❌ The other events are unrelated to this date.",
  },

  /* ─────────── 55 · QUESTION ─────────── */
  55: {
    questext: "Which provisions came into force on 26 November 1949?",
    options: ["Fundamental Rights", "Citizenship, elections and provisional Parliament", "Directive Principles", "Emergency provisions"],
    correct: "2",
    exptext: "✅ Citizenship, elections, provisional Parliament (Arts. 5–9, 60, 324, 366, 367, 379, 380, 388, 391–393). 📌 The rest started on 26 Jan 1950. ❌ The other options started later.",
  },

  /* ─────────── 56 · QUESTION ─────────── */
  56: {
    questext: "On the commencement of the Constitution, which Acts were repealed?",
    options: ["Government of India Act, 1919 and Morley-Minto Reforms", "Regulating Act, 1773 and Pitt's India Act", "Cabinet Mission Plan and Cripps Proposals", "Indian Independence Act, 1947 and Government of India Act, 1935"],
    correct: "4",
    exptext: "✅ The Independence Act 1947 and GoI Act 1935. 📌 Constitution replaced the colonial laws. ❌ Other options are earlier or non-statutory.",
  },

  /* ─────────── 57 · CONCEPT PAGE (pauses the timer) ─────────── */
  57: {
    type: "concept",
    icon: "🔬",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Experts Committee, 1946",
    html: `
      <p class="cp-lead">While elections were still on, the Congress appointed an <u>Experts Committee</u> on <b>8 July 1946</b> to prepare material for the Assembly.</p><table><thead><tr><th>Role</th><th>Members</th></tr></thead><tbody><tr><td>Chairman</td><td>Jawaharlal Nehru</td></tr><tr><td>Members</td><td>M. Asaf Ali, K. M. Munshi, N. Gopalaswami Ayyangar, K. T. Shah, D. R. Gadgil, Humayun Kabir, K. Santhanam</td></tr><tr><td>Co-opted member &amp; convener</td><td>Krishna Kripalani</td></tr></tbody></table><ul class="cp-timeline"><li><b>First sitting:</b> New Delhi, 20–22 July 1946.</li><li><b>Second sitting:</b> Bombay, 15–17 August 1946.</li></ul><div class="cp-note trap">It was a <b>Congress</b> committee (not a Constituent Assembly committee), appointed <b>before</b> the Assembly met.</div><div class="cp-mnemonic"><b>8-7-46</b> → Nehru heads the Experts.</div>
    `
  },

  /* ─────────── 58 · QUESTION ─────────── */
  58: {
    questext: "The Experts Committee, appointed by the Congress on 8 July 1946 to prepare material for the Assembly, was chaired by:",
    options: ["Jawaharlal Nehru", "Sardar Patel", "Dr. Rajendra Prasad", "K. M. Munshi"],
    correct: "1",
    exptext: "✅ Nehru was Chairman. 📌 Krishna Kripalani was convener. ❌ Munshi was only a member.",
  },

  /* ─────────── 59 · CONCEPT PAGE (pauses the timer) ─────────── */
  59: {
    type: "concept",
    icon: "🗣️",
    accent: "#d946ef",
    pauseTimer: true,
    title: "Criticism of the Constituent Assembly",
    html: `
      <p class="cp-lead">Critics argued that the Assembly was <u>not truly representative</u>. Three famous voices are often asked together.</p><div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">Granville Austin</div>US expert: “The Assembly was a one-party body in an essentially one-party country. The Assembly was the Congress and the Congress was India.”</div><div class="cp-card red"><div class="cp-card-title">Lord Viscount Simon</div>Called it “a body of Hindus.”</div><div class="cp-card amber"><div class="cp-card-title">Winston Churchill</div>Said it represented “only one major community in India.”</div></div><div class="cp-note trap">Granville Austin = <b>one-party</b> body; Simon = <b>Hindus</b>; Churchill = <b>one major community</b>.</div><div class="cp-mnemonic"><b>A</b>ustin → <b>A</b>ll Congress; <b>S</b>imon → <b>S</b>ame community (Hindus); <b>C</b>hurchill → <b>C</b>ommunity.</div>
    `
  },

  /* ─────────── 60 · QUESTION ─────────── */
  60: {
    questext: "Who said, “The Assembly was the Congress and the Congress was India”?",
    options: ["Winston Churchill", "Lord Viscount Simon", "Granville Austin", "Sir Stafford Cripps"],
    correct: "3",
    exptext: "✅ Granville Austin. 📌 One-party body in a one-party country. ❌ Churchill and Simon had different criticisms.",
  },

  /* ─────────── 61 · QUESTION ─────────── */
  61: {
    questext: "Who described the Constituent Assembly as “a body of Hindus”?",
    options: ["Winston Churchill", "Lord Viscount Simon", "Granville Austin", "Lord Pethick Lawrence"],
    correct: "2",
    exptext: "✅ Lord Viscount Simon. 📌 Churchill said ‘only one major community’. ❌ Austin called it one-party; Pethick Lawrence was a Cabinet Mission member.",
  },

  /* ─────────── 62 · CONCEPT PAGE (pauses the timer) ─────────── */
  62: {
    type: "concept",
    icon: "⭐",
    accent: "#facc15",
    pauseTimer: true,
    title: "Important Facts to Remember",
    html: `
      <p class="cp-lead">A set of <u>who-did-what</u> facts. They are small but appear regularly as one-mark questions.</p><table><thead><tr><th>Role</th><th>Person / Fact</th></tr></thead><tbody><tr><td>Secretary to the Assembly</td><td>H. V. R. Iyengar</td></tr><tr><td>Chief Draftsman</td><td>S. N. Mukerjee</td></tr><tr><td>Calligrapher (original Constitution, flowing italic)</td><td>Prem Behari Narain Raizada</td></tr><tr><td>Artwork / decoration</td><td>Shantiniketan artists – Nandalal Bose and Beohar Rammanohar Sinha</td></tr><tr><td>Hindi calligraphy</td><td>Vasant Krishan Vaidya, decorated by Nandalal Bose</td></tr><tr><td>Language of the Constitution</td><td>English</td></tr><tr><td>Symbol of the Constituent Assembly</td><td>Elephant</td></tr></tbody></table><div class="cp-note remember">Dr. Ambedkar: “On the 26th Jan 1950, we are going to enter a life of contradictions. In politics we will have equality and in social and economic life we will have inequality.”</div><div class="cp-note trap"><b>Chief Draftsman</b> (S. N. Mukerjee) ≠ <b>Secretary</b> (H. V. R. Iyengar) ≠ <b>Constitutional Advisor</b> (B. N. Rau).</div><div class="cp-mnemonic"><b>R</b>aizada <b>R</b>ites (writes); <b>N</b>andalal <b>N</b>ishaan (decorates).</div>
    `
  },

  /* ─────────── 63 · QUESTION ─────────── */
  63: {
    questext: "Who was the Secretary to the Constituent Assembly?",
    options: ["S. N. Mukerjee", "B. N. Rau", "V. T. Krishnamachari", "H. V. R. Iyengar"],
    correct: "4",
    exptext: "✅ H. V. R. Iyengar. 📌 S. N. Mukerjee was Chief Draftsman. ❌ B. N. Rau was Constitutional Advisor.",
  },

  /* ─────────── 64 · QUESTION ─────────── */
  64: {
    questext: "The original Constitution was handwritten in a flowing italic style by:",
    options: ["Prem Behari Narain Raizada", "Nandalal Bose", "Vasant Krishan Vaidya", "Beohar Rammanohar Sinha"],
    correct: "1",
    exptext: "✅ Prem Behari Narain Raizada. 📌 Bose and Sinha decorated; Vaidya did Hindi calligraphy. ❌ Not the main English calligraphers.",
  },

  /* ─────────── 65 · QUESTION ─────────── */
  65: {
    questext: "Which of the following pairs is correctly matched?",
    options: ["Calligrapher – Nandalal Bose", "Secretary – S. N. Mukerjee", "Chief Draftsman – S. N. Mukerjee", "Hindi calligraphy – Prem Behari Narain Raizada"],
    correct: "3",
    exptext: "✅ S. N. Mukerjee was Chief Draftsman. 📌 Calligrapher: Raizada; Secretary: Iyengar. ❌ The other pairs swap roles.",
  },

  /* ─────────── 66 · CONCEPT PAGE (pauses the timer) ─────────── */
  66: {
    type: "concept",
    icon: "🧾",
    accent: "#10b981",
    pauseTimer: true,
    title: "First Cabinet of Free India, 1947",
    html: `
      <p class="cp-lead">The <u>First Cabinet of Free India</u> (1947) had <b>14 members</b>, with Nehru as <b>Prime Minister</b>.</p><table><thead><tr><th>Member</th><th>Portfolio(s)</th></tr></thead><tbody><tr><td>Jawaharlal Nehru</td><td>Prime Minister; External Affairs &amp; Commonwealth; Scientific Research</td></tr><tr><td>Sardar Vallabhbhai Patel</td><td>Home, Information &amp; Broadcasting; States</td></tr><tr><td>Dr. Rajendra Prasad</td><td>Food &amp; Agriculture</td></tr><tr><td>Maulana Abul Kalam Azad</td><td>Education</td></tr><tr><td>Dr. John Mathai</td><td>Railways &amp; Transport</td></tr><tr><td>R. K. Shanmukham Chetty</td><td>Finance</td></tr><tr><td>Dr. B. R. Ambedkar</td><td>Law</td></tr><tr><td>Jagjivan Ram</td><td>Labour</td></tr><tr><td>Sardar Baldev Singh</td><td>Defence</td></tr><tr><td>Rajkumari Amrit Kaur</td><td>Health</td></tr><tr><td>C. H. Bhabha</td><td>Commerce</td></tr><tr><td>Rafi Ahmed Kidwai</td><td>Communication</td></tr><tr><td>Dr. Shyama Prasad Mukherji</td><td>Industries &amp; Supplies</td></tr><tr><td>V. N. Gadgil</td><td>Works, Mines &amp; Power</td></tr></tbody></table><div class="cp-note exam"><b>Ambedkar = Law</b>, <b>Shanmukham Chetty = Finance</b>, <b>Amrit Kaur = Health</b>, <b>Azad = Education</b>.</div><div class="cp-note trap">The <b>1946 Interim Government</b> had Liaquat Ali Khan as Finance and J. N. Mandal as Law; the <b>1947 Cabinet</b> has Chetty and Ambedkar.</div><div class="cp-mnemonic"><b>A</b>mbedkar–<b>L</b>aw, <b>A</b>zad–<b>E</b>ducation, <b>A</b>mrit Kaur–<b>H</b>ealth.</div>
    `
  },

  /* ─────────── 67 · QUESTION ─────────── */
  67: {
    questext: "Who was the first Law Minister in the First Cabinet of Free India (1947)?",
    options: ["Sardar Patel", "Dr. B. R. Ambedkar", "Jawaharlal Nehru", "K. M. Munshi"],
    correct: "2",
    exptext: "✅ Dr. B. R. Ambedkar. 📌 Mandal held Law in the 1946 Interim Government. ❌ Patel – Home; Nehru – PM and External Affairs.",
  },

  /* ─────────── 68 · QUESTION ─────────── */
  68: {
    questext: "Which minister–portfolio pair in the 1947 First Cabinet is correctly matched?",
    options: ["R. K. Shanmukham Chetty – Law", "Rajkumari Amrit Kaur – Finance", "Sardar Baldev Singh – Health", "Maulana Abul Kalam Azad – Education"],
    correct: "4",
    exptext: "✅ Azad – Education. 📌 Chetty – Finance; Amrit Kaur – Health; Baldev Singh – Defence. ❌ The other three pairs are swapped.",
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     images/General_Awareness/Polity/Making_of_the_Constitution/thumbnail.png → ENTRY 1 (class overview, "thumb" field)  — not numbered
     images/General_Awareness/Polity/Making_of_the_Constitution/1.png → concept page "The Cabinet Mission Plan, 1946 & Composition of the Assembly"
     images/General_Awareness/Polity/Making_of_the_Constitution/2.png → concept page "Enactment of the Constitution"

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name inside the images/General_Awareness/Polity/Making_of_the_Constitution/ folder)
   images/General_Awareness/Polity/Making_of_the_Constitution/thumbnail.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920×1080 px, ultra-sharp, in a premium, classic, refined editorial style (NOT cartoonish: no cartoon, toy-like, clip-art, comic or glossy cartoon-3D look). Deep midnight-navy and near-black base with a smooth, subtle indigo gradient (accent #6366f1) and restrained champagne-gold highlights; soft cinematic lighting with a gentle warm glow behind the right-centre of the frame, where a teacher's photo will be placed later; fine dark vignette on the edges, very subtle fine grain texture, realistic shallow depth of field. Place only 3 elegant, realistic, softly blurred objects mostly on the right and in the back: an antique bound book with an engraved gold-edged cover, a classic brass fountain pen resting beside it and a rolled parchment scroll with a thin ribbon, rendered matte or brushed-metal with natural reflections. Do NOT add any star, starburst or explosion sticker. Add ONE blank premium emblem: a refined, classic round seal with a thin champagne-gold rim, fine engraved double border and a smooth, completely EMPTY dark-navy centre with a faint glow, realistic brushed-metal / enamel finish, about 20% of the frame height, placed near the lower centre of the frame (about 60% from the left and 72% from the top) so I can write my own text inside it later. Keep the LEFT 62% of the frame calm, dark and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image (the emblem stays blank). Sophisticated, balanced, high-contrast, professional composition.
   images/General_Awareness/Polity/Making_of_the_Constitution/1.png: Create a clean flat vector diagram, 16:9, 1200×675 px, on a dark navy background. Show one big rounded box at the top with the exact label "389 SEATS", and two smaller boxes below connected by thick lines: left box "296 BRITISH INDIA" (blue) and right box "93 PRINCELY STATES" (amber). Very few labels, VERY LARGE bold white text, thick lines, simple shapes, readable when small. No people, no logos, no watermarks.
   images/General_Awareness/Polity/Making_of_the_Constitution/2.png: Create a clean flat vector diagram, 16:9, 1200×675 px, on a dark navy background. Show a horizontal flow of three big rounded boxes joined by thick arrows with the exact labels "1ST READING 4 NOV 1948", "2ND READING 15 NOV 1948 – 17 OCT 1949" and "3RD READING 14 NOV 1949", ending in a final green box "ADOPTED 26 NOV 1949". VERY LARGE bold white text, thick lines, simple shapes, readable when small. No people, no logos, no watermarks.

   CHANGE LOG (corrections / additions made to the book's content; none of these words appear inside the pages)
     1. Second reading amendments: notes say 7,653 proposed → written as 7,635 (the official figure); 2,473 discussed unchanged.
     2. "Symbol: of the Constitution – Elephant" → written as "Symbol of the Constituent Assembly – Elephant" (the elephant is the Assembly's seal).
     3. Spelling normalised: "Shanmugham Chetty" → "Shanmukham Chetty"; "Mavalankar/Mavlankar" → "Mavlankar"; "Gopalaswamy/Gopalaswami" Ayyangar kept as in committee tables.
     4. Interim Government table: the note's misplaced heading "Election Results to the Assembly" was dropped; Syed Ali Zaheer (Commerce) was omitted because his portfolio could not be confirmed from the notes' own context. The remaining 13 rows follow the notes.
     5. "Major Committees (8)": the notes list 7 rows + the Advisory Committee below; all 8 are shown in one table. The fifth Advisory sub-committee ("Tribal Areas", no chairman given) is omitted.
     6. Meaning clarified: Indian Independence Act made the Assembly sovereign "free to frame any Constitution" (the notes' wording kept); extra explanatory lines (why Muslim League rejected Cripps, memory hooks, traps) were added for understanding.
     7. Constitution Day (26 November) mention added on the Adoption page.
   ════════════════════════════════════════════════════════════════ */