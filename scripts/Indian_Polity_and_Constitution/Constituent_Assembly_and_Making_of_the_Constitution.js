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
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",

    /* 🎬 tap the 🎯 icon on this page → thumbnail studio + YouTube kit */
    thumb: {
      image: "images/Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "INDIAN POLITY",
      line2: "CONSTITUENT",
      line3: "ASSEMBLY",
      badge: "FULL CLASS",
      ribbon: "COMMITTEES • DATES • PRACTICE",
      burst: "All exams",
      mode: "creator"
    },
    yt: {
      title: "Constituent Assembly & Making of the Constitution | Indian Polity | All Competitive Exams",
      altTitles: [
        "Constituent Assembly Committees & Chairmen Trick | Indian Polity | Competitive Exams",
        "Drafting Committee, Objective Resolution & Key Dates | Indian Polity Full Class",
        "26 Nov 1949 vs 26 Jan 1950: Never Confuse These Dates | Indian Polity",
        "Making of the Indian Constitution Full Class with Practice Questions | Competitive Exams"
      ],
      description: "How was the Constitution of India actually made? In this class you will learn who sat in the Constituent Assembly, which committees did the work, and the exact dates asked again and again in competitive exams.\n\n📌 IN THIS CLASS\n✅ How the Assembly was elected: 389 seats, 296 + 93, and 299 after partition\n✅ All 17 committees and their chairmen, grouped so you can remember them\n✅ Objective Resolution: mover, dates and its six objectives\n✅ Drafting Committee: chairman, members, replacements and key dates\n✅ 26 Nov 1949 vs 26 Jan 1950 and Constitution Day\n✅ 31 practice questions right after the concepts\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Constituent Assembly and Making of the Constitution\n00:00 Practice: composition of the Assembly\n00:00 Important Committees and their Chairman\n00:00 Practice: committees and chairmen\n00:00 Objective Resolution\n00:00 Practice: Objective Resolution\n00:00 Drafting Committee\n00:00 Practice: Drafting Committee\n00:00 Passing and Enforcement of the Constitution\n00:00 Practice: dates and Constitution Day\n\n👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n#IndianPolity #ConstituentAssembly #Constitution #CompetitiveExams",
      tags: [
        "constituent assembly",
        "making of the constitution",
        "indian polity",
        "indian polity for competitive exams",
        "constituent assembly committees",
        "committees and chairmen",
        "drafting committee",
        "objective resolution",
        "constitution day",
        "26 november 1949",
        "26 january 1950",
        "polity tricks",
        "polity mcq",
        "ssc cgl polity",
        "upsc polity",
        "banking exam polity",
        "railway exam polity",
        "defence exam polity",
        "constitution of india",
        "polity full class"
      ],
      hashtags: [
        "IndianPolity",
        "ConstituentAssembly",
        "Constitution",
        "CompetitiveExams"
      ],
      thumbText: "CONSTITUENT ASSEMBLY",
      pinnedComment: "📌 Practice what you learned: solve the 31 questions in the class, then write your answers below. Which was hardest — committees and chairmen, or the dates? 👇",
      communityPost: "🏛️ New Polity class is live: Constituent Assembly and Making of the Constitution — committees, chairmen, Drafting Committee and key dates, with 31 practice questions. Start with the overview and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Constituent Assembly and Making of the Constitution\n00:00 Practice: composition of the Assembly\n00:00 Important Committees and their Chairman\n00:00 Practice: committees and chairmen\n00:00 Objective Resolution\n00:00 Practice: Objective Resolution\n00:00 Drafting Committee\n00:00 Practice: Drafting Committee\n00:00 Passing and Enforcement of the Constitution\n00:00 Practice: dates and Constitution Day",
      playlist: "Indian Polity — Competitive Exams Full Classes"
    },

    html: `
      <p class="cp-lead">Today's class explains <u>how the Constitution of India was actually made</u> —
      who sat in the Constituent Assembly, which committees did the work, what the Objective Resolution promised,
      and the exact dates on which the Constitution was passed and came into force.
      Dates and names from this chapter are asked again and again, so we will make them <b>easy to remember</b>.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>5</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>31</b><span>Practice questions</span></div>
        <div class="cp-stat"><b>30+</b><span>Key facts</span></div>
        <div class="cp-stat"><b>~30 min</b><span>Time needed</span></div>
      </div>

      <div class="cp-divider">Your roadmap</div>

      <ul class="cp-timeline">
        <li><b>2. Constituent Assembly and Making of the Constitution</b><br>How members were chosen, the 389 → 299 change, the symbol and the time taken.</li>
        <li><b>Practice</b> — 7 questions on composition and the Assembly's journey.</li>
        <li><b>Important Committees of the Constituent Assembly and their Chairman</b><br>All 17 committees and who chaired each one.</li>
        <li><b>Practice</b> — 7 questions on committees and chairmen.</li>
        <li><b>Objective Resolution</b><br>Who moved it, when it was adopted and its six objectives.</li>
        <li><b>Practice</b> — 5 questions on the Objective Resolution.</li>
        <li><b>Drafting Committee</b><br>Chairman, members, replacements and the date of the draft.</li>
        <li><b>Practice</b> — 6 questions on the Drafting Committee.</li>
        <li><b>Passing and Enforcement of the Constitution</b><br>26 Nov 1949, 26 Jan 1950 and Constitution Day.</li>
        <li><b>Practice</b> — 6 questions on dates, chronology and Constitution Day.</li>
      </ul>

      <div class="cp-divider">What you will be able to do</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🏛️ Explain the Assembly</div>Tell how its members were elected and how 389 seats became 299 after partition.</div>
        <div class="cp-card green"><div class="cp-card-title">🗂️ Match committees</div>Pair every committee with its chairman without confusion.</div>
        <div class="cp-card amber"><div class="cp-card-title">📜 Recall the Resolution</div>Name the mover, the dates and the six objectives of the Objective Resolution.</div>
        <div class="cp-card red"><div class="cp-card-title">📅 Fix the dates</div>Separate 26 Nov 1949 from 26 Jan 1950 and place every event in order.</div>
      </div>

      <div class="cp-note exam"><b>Why it matters:</b> questions on committees, chairmen, dates and the Drafting Committee
      appear in almost every Polity paper — SSC, UPSC, Banking, Railways and Defence exams alike.</div>

      <div class="cp-note tip">Read each concept page fully, then attempt the questions right after it.
      The exam clock pauses on concept pages, so take your time.</div>

      <div class="cp-chips"><span>Indian Polity</span><span>Constitution</span><span>Constituent Assembly</span><span>All Competitive Exams</span></div>
`
  },

  /* ─────────── 2 · CONCEPT PAGE ─────────── */
  2: {
    type: "concept",
    icon: "🏛️",
    accent: "#3b82f6",
    pauseTimer: true,
    title: "2. Constituent Assembly and Making of the Constitution",
    html: `
      <p class="cp-lead">India's Constitution was not written by one person in one sitting.
      A special elected body, the <u>Constituent Assembly</u>, drafted it over <b>nearly three years</b>.
      This page tells you how its members were chosen, how big it was, and how its size shrank after partition.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>389</b><span>Original strength</span></div>
        <div class="cp-stat"><b>299</b><span>After partition</span></div>
        <div class="cp-stat"><b>15</b><span>Women members</span></div>
        <div class="cp-stat"><b>1 : 10 lakh</b><span>Seat ratio</span></div>
      </div>

      <div class="cp-divider">1 · Why it was formed and how members were chosen</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🎯 The idea</div>The <b>Cabinet Mission</b> envisaged a Constituent Assembly to <u>frame a Constitution</u> for the country.</div>
        <div class="cp-card green"><div class="cp-card-title">🗳️ The election</div>Members were elected by the <b>Provincial Legislative Assemblies</b>, not directly by the voters.</div>
        <div class="cp-card amber"><div class="cp-card-title">⚖️ The seat rule</div>Every Province and Indian State got seats in proportion to its population, roughly <b>one seat for every million</b> people.</div>
        <div class="cp-card violet"><div class="cp-card-title">🤝 Community split</div>The seats of each Province were shared among the main communities: <b>Sikh, Muslim and General</b>.</div>
      </div>

      <div class="cp-note trap"><b>Trap:</b> the Assembly was <u>indirectly elected</u> — the Provincial Legislative Assemblies chose the members, and there was no direct vote by the public.</div>

      <div class="cp-divider">2 · How big was it?</div>

      <table>
        <thead><tr><th>Group</th><th>Seats</th></tr></thead>
        <tbody>
          <tr><td>Indian States (Princely States)</td><td>93</td></tr>
          <tr><td>British India</td><td>296</td></tr>
          <tr><td>— of which Governors' provinces</td><td>292</td></tr>
          <tr><td>— of which Chief Commissioners' provinces (1 each from 4)</td><td>4</td></tr>
          <tr><td><b>Total (planned)</b></td><td><b>389</b></td></tr>
        </tbody>
      </table>

      <div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution/1.png" alt="Diagram: 389 seats split into British India 296 and Princely States 93" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

      <div class="cp-mnemonic">296 + 93 = 389 — “<b>Two-nine-six</b> for the <b>British</b>, <b>nine-three</b> for the <b>princes</b>”</div>

      <div class="cp-divider">3 · After the partition of India</div>

      <table>
        <thead><tr><th>Stage</th><th>Strength</th></tr></thead>
        <tbody>
          <tr><td>Planned for undivided India</td><td>389</td></tr>
          <tr><td>After partition</td><td><b>299</b> (including <b>15 women</b>)</td></tr>
          <tr><td>Members who signed the finally approved Constitution</td><td>284</td></tr>
        </tbody>
      </table>

      <details class="cp-collapse">
        <summary>Why did the strength fall from 389 to 299?</summary>
        <p>The Assembly had been elected for <i>undivided</i> India. When the country was partitioned,
        the seats of the areas that went to Pakistan were no longer part of the Indian Assembly, so the strength came down to 299.</p>
      </details>

      <div class="cp-divider">4 · The Assembly's own journey</div>

      <ul class="cp-timeline">
        <li><b>9 December 1946</b> — first meeting of the Assembly, which had been elected for <u>undivided India</u>.</li>
        <li><b>14 August 1947</b> — it reassembled as the <u>sovereign Constituent Assembly</u> for the Dominion of India.</li>
        <li><b>26 November 1949</b> — the Constitution was declared passed.</li>
      </ul>

      <div class="cp-grid c2">
        <div class="cp-card teal"><div class="cp-card-title">⏳ Time taken</div>The Assembly needed <b>2 years, 11 months and 18 days</b> to finalise the Constitution.</div>
        <div class="cp-card pink"><div class="cp-card-title">🐘 Symbol</div>The <b>elephant</b> was adopted as the symbol (seal) of the Constituent Assembly.</div>
      </div>

      <div class="cp-note exam"><b>Exam favourites:</b> 389 (original), 299 (after partition), 15 women, the elephant seal and <u>2 years 11 months 18 days</u>.</div>

      <div class="cp-chips"><span>Cabinet Mission</span><span>389 → 299</span><span>Elephant seal</span><span>9 Dec 1946</span></div>
`
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "The members of the Constituent Assembly were elected by the:",
    options: ["Voters directly on the basis of adult franchise", "Viceroy's Executive Council", "Provincial Legislative Assemblies", "Central Legislative Assembly"],
    correct: "3",
    exptext: "✅ Provincial Legislative Assemblies chose the members, so the election was indirect. 📌 Indirect election = the people did not vote directly. ❌ Direct adult franchise was not used; the Viceroy's Council and the Central Legislature did not elect the members."
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "Seats in the Constituent Assembly were allotted to each Province and Indian State roughly in the ratio of:",
    options: ["One seat for every 5 lakh of population", "One seat for every 10 lakh of population", "One seat for every 25 lakh of population", "One seat for every 1 lakh of population"],
    correct: "2",
    exptext: "✅ The ratio was roughly one to a million, i.e. one seat per 10 lakh people. 📌 Remember: one to a million. ❌ 5 lakh, 25 lakh and 1 lakh are made-up ratios that look similar."
  },

  /* ─────────── 5 · QUESTION ─────────── */
  5: {
    questext: "Out of the total planned strength of 389 in the Constituent Assembly, how many seats were for the Indian States (Princely States)?",
    options: ["93", "296", "292", "89"],
    correct: "1",
    exptext: "✅ 93 seats were for the Indian States. 📌 296 + 93 = 389. ❌ 296 is British India's share and 292 is only the part from Governors' provinces."
  },

  /* ─────────── 6 · QUESTION ─────────── */
  6: {
    questext: "Which one of the following was NOT among the main communities recognised for distributing the seats within each Province?",
    options: ["Muslim", "Christian", "General", "Sikh"],
    correct: "2",
    exptext: "✅ Christian was not listed. 📌 The three recognised communities were Sikh, Muslim and General. ❌ Sikh, Muslim and General were all recognised."
  },

  /* ─────────── 7 · QUESTION ─────────── */
  7: {
    questext: "Consider the following statements about the Constituent Assembly:\n1. The elephant was adopted as its symbol (seal).\n2. After partition its strength came down to 299, including 15 women.\n3. Its members were elected on the basis of universal adult franchise.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Elephant seal + 299 members + 15 women. ❌ Statement 3 is wrong because the members were elected by the Provincial Legislative Assemblies, not by universal adult franchise."
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "The Constituent Assembly, elected for undivided India, reassembled as the sovereign Constituent Assembly for the Dominion of India on:",
    options: ["3 June 1947", "15 August 1947", "14 August 1947", "9 December 1946"],
    correct: "3",
    exptext: "✅ It reassembled on 14 August 1947, just before independence. 📌 9 Dec 1946 = first meeting; 14 Aug 1947 = sovereign body. ❌ 15 August is Independence Day, and 3 June 1947 is the date of the Mountbatten statement."
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "How much time did the Constituent Assembly take to finalise the Constitution of India?",
    options: ["2 years, 11 months and 18 days", "2 years, 11 months and 8 days", "3 years and 2 months", "2 years, 10 months and 18 days"],
    correct: "1",
    exptext: "✅ It took 2 years, 11 months and 18 days. 📌 Say it as 2-11-18. ❌ The other options change one number slightly to tempt you."
  },

  /* ─────────── 10 · CONCEPT PAGE ─────────── */
  10: {
    type: "concept",
    icon: "🗂️",
    accent: "#22c55e",
    pauseTimer: true,
    title: "Important Committees of the Constituent Assembly and their Chairman",
    html: `
      <p class="cp-lead">The Constituent Assembly did not draft the Constitution in one big hall discussion.
      It split the work among <u>committees</u>, each led by a senior leader.
      Questions here are almost always <b>“Who chaired which committee?”</b> — so we organise them by chairman.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>17</b><span>Committees listed</span></div>
        <div class="cp-stat"><b>4</b><span>Led by R. Prasad</span></div>
        <div class="cp-stat"><b>3</b><span>Led by J. Nehru</span></div>
        <div class="cp-stat"><b>1</b><span>Led by B.R. Ambedkar</span></div>
      </div>

      <div class="cp-divider">1 · Memorise by chairman</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">Dr. Rajendra Prasad</div>Rules of Procedure Committee, Steering Committee, Finance and Staff Committee and the Ad hoc Committee on the National Flag.</div>
        <div class="cp-card green"><div class="cp-card-title">Jawaharlal Nehru</div>Union Constitution Committee, Union Powers Committee and States Committee.</div>
        <div class="cp-card amber"><div class="cp-card-title">Sardar Vallabhbhai Patel</div>Advisory Committee on Fundamental Rights, Minorities and Tribal and Excluded Areas.</div>
        <div class="cp-card red"><div class="cp-card-title">Dr. B.R. Ambedkar</div>The <b>Drafting Committee</b>, which gave shape to the text of the Constitution.</div>
      </div>

      <div class="cp-mnemonic"><b>Prasad</b> = the house-keeping four (Procedure, Steering, Finance, Flag); <b>Nehru</b> = the “Union” three (Union Constitution, Union Powers, States).</div>

      <div class="cp-divider">2 · The full list</div>

      <table>
        <thead><tr><th>S.</th><th>Name of the Committee</th><th>Chairman</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Committee on the Rules of Procedure</td><td>Dr. Rajendra Prasad</td></tr>
          <tr><td>2</td><td>Steering Committee</td><td>Dr. Rajendra Prasad</td></tr>
          <tr><td>3</td><td>Finance and Staff Committee</td><td>Dr. Rajendra Prasad</td></tr>
          <tr><td>4</td><td>Ad hoc Committee on the National Flag</td><td>Dr. Rajendra Prasad</td></tr>
          <tr><td>5</td><td>Union Constitution Committee</td><td>Jawaharlal Nehru</td></tr>
          <tr><td>6</td><td>Union Powers Committee</td><td>Jawaharlal Nehru</td></tr>
          <tr><td>7</td><td>States Committee</td><td>Jawaharlal Nehru</td></tr>
          <tr><td>8</td><td>Advisory Committee on Fundamental Rights, Minorities and Tribal and Excluded Areas</td><td>Sardar Vallabhbhai Patel</td></tr>
          <tr><td>9</td><td>Drafting Committee</td><td>Dr. B.R. Ambedkar</td></tr>
          <tr><td>10</td><td>Credential Committee</td><td>Alladi Krishnaswami Ayyar</td></tr>
          <tr><td>11</td><td>House Committee</td><td>B. Pattabhi Sitaramayya</td></tr>
          <tr><td>12</td><td>Order of Business Committee</td><td>K.M. Munshi</td></tr>
          <tr><td>13</td><td>Committee on the Functions of the Constituent Assembly</td><td>G.V. Mavalankar</td></tr>
          <tr><td>14</td><td>Minorities Sub-Committee</td><td>H.C. Mookerjee</td></tr>
          <tr><td>15</td><td>Fundamental Rights Sub-Committee</td><td>J.B. Kripalani</td></tr>
          <tr><td>16</td><td>North-East Frontier Tribal Areas and Assam Excluded and Partially Excluded Areas Sub-Committee</td><td>Gopinath Bardoloi</td></tr>
          <tr><td>17</td><td>Excluded and Partially Excluded Areas (other than Assam) Sub-Committee</td><td>A.V. Thakkar</td></tr>
        </tbody>
      </table>

      <div class="cp-note trap"><b>Trap 1:</b> <u>J.B. Kripalani</u> chaired the Fundamental Rights <i>Sub-Committee</i>, while <u>Sardar Patel</u> chaired the bigger <i>Advisory Committee</i> above it.</div>
      <div class="cp-note trap"><b>Trap 2:</b> <u>Gopinath Bardoloi</u> handled the North-East and Assam areas, whereas <u>A.V. Thakkar</u> handled the excluded areas <i>other than Assam</i>.</div>
      <div class="cp-note exam">Chairman-matching is the favourite format: <b>Credential → Alladi Krishnaswami Ayyar</b>, <b>House → Pattabhi Sitaramayya</b>, <b>Order of Business → K.M. Munshi</b>, <b>Functions of the Assembly → G.V. Mavalankar</b>.</div>

      <div class="cp-divider">3 · How the committees' work flowed</div>

      <ol class="cp-steps">
        <li>The principles of the Constitution were <b>outlined by the various committees</b> of the Assembly.</li>
        <li>There was a <b>general discussion</b> on the reports of these committees.</li>
        <li>The Assembly then <b>appointed the Drafting Committee</b> with Dr. B.R. Ambedkar as Chairman.</li>
      </ol>

      <div class="cp-chips"><span>17 committees</span><span>Prasad ×4</span><span>Nehru ×3</span><span>Patel</span><span>Ambedkar</span></div>
`
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "Who chaired the Union Powers Committee of the Constituent Assembly?",
    options: ["Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Dr. B.R. Ambedkar", "Dr. Rajendra Prasad"],
    correct: "1",
    exptext: "✅ Jawaharlal Nehru chaired the Union Powers Committee. 📌 Nehru = the Union three (Union Constitution, Union Powers, States). ❌ Prasad led the procedural committees; Patel chaired the Advisory Committee; Ambedkar chaired the Drafting Committee."
  },

  /* ─────────── 12 · QUESTION ─────────── */
  12: {
    questext: "The Advisory Committee on Fundamental Rights, Minorities and Tribal and Excluded Areas was chaired by:",
    options: ["Dr. Rajendra Prasad", "H.C. Mookerjee", "J.B. Kripalani", "Sardar Vallabhbhai Patel"],
    correct: "4",
    exptext: "✅ Sardar Patel chaired the Advisory Committee. 📌 Patel = Advisory Committee; its sub-committees had other chairmen. ❌ Kripalani chaired the Fundamental Rights Sub-Committee and Mookerjee the Minorities Sub-Committee."
  },

  /* ─────────── 13 · QUESTION ─────────── */
  13: {
    questext: "Who was the Chairman of the Credential Committee of the Constituent Assembly?",
    options: ["K.M. Munshi", "B. Pattabhi Sitaramayya", "Alladi Krishnaswami Ayyar", "G.V. Mavalankar"],
    correct: "3",
    exptext: "✅ Alladi Krishnaswami Ayyar chaired the Credential Committee. 📌 Credentials = Ayyar. ❌ Munshi chaired Order of Business, Mavalankar the Functions of the Assembly committee, and Sitaramayya the House Committee."
  },

  /* ─────────── 14 · QUESTION ─────────── */
  14: {
    questext: "Match List I (Committee) with List II (Chairman):\nList I: A. Committee on the Rules of Procedure; B. Fundamental Rights Sub-Committee; C. Minorities Sub-Committee; D. House Committee.\nList II: 1. J.B. Kripalani; 2. H.C. Mookerjee; 3. B. Pattabhi Sitaramayya; 4. Dr. Rajendra Prasad.",
    options: ["A-1, B-4, C-2, D-3", "A-4, B-2, C-1, D-3", "A-3, B-1, C-2, D-4", "A-4, B-1, C-2, D-3"],
    correct: "4",
    exptext: "✅ A-4, B-1, C-2, D-3. 📌 Prasad = Procedure, Kripalani = Fundamental Rights, Mookerjee = Minorities, Sitaramayya = House. ❌ The other options swap Kripalani and Mookerjee or move Prasad and Sitaramayya."
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "Which one of the following committees was NOT chaired by Dr. Rajendra Prasad?",
    options: ["Steering Committee", "Ad hoc Committee on the National Flag", "Finance and Staff Committee", "States Committee"],
    correct: "4",
    exptext: "✅ The States Committee was chaired by Jawaharlal Nehru. 📌 Prasad's four: Rules of Procedure, Steering, Finance and Staff, National Flag. ❌ The other three were all chaired by Dr. Rajendra Prasad."
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "Consider the following statements:\n1. Jawaharlal Nehru chaired the Union Constitution Committee, the Union Powers Committee and the States Committee.\n2. Dr. Rajendra Prasad chaired the Fundamental Rights Sub-Committee.\n3. K.M. Munshi chaired the Order of Business Committee.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 1 and 3 are correct. 📌 Nehru's three; Munshi = Order of Business. ❌ Statement 2 is wrong because J.B. Kripalani chaired the Fundamental Rights Sub-Committee."
  },

  /* ─────────── 17 · QUESTION ─────────── */
  17: {
    questext: "Who chaired the North-East Frontier Tribal Areas and Assam Excluded and Partially Excluded Areas Sub-Committee?",
    options: ["G.V. Mavalankar", "J.B. Kripalani", "Gopinath Bardoloi", "A.V. Thakkar"],
    correct: "3",
    exptext: "✅ Gopinath Bardoloi chaired it. 📌 Bardoloi = North-East and Assam; Thakkar = excluded areas other than Assam. ❌ A.V. Thakkar chaired the other excluded-areas sub-committee, Kripalani the Fundamental Rights Sub-Committee and Mavalankar the Functions committee."
  },

  /* ─────────── 18 · CONCEPT PAGE ─────────── */
  18: {
    type: "concept",
    icon: "📜",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "Objective Resolution",
    html: `
      <p class="cp-lead">Before the Assembly wrote a single article, it first decided <u>what kind of country it wanted to build</u>.
      That statement of aims is the <b>Objective Resolution</b> — the philosophical starting point of the Constitution.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>13 Dec 1946</b><span>Moved</span></div>
        <div class="cp-stat"><b>22 Jan 1947</b><span>Adopted</span></div>
        <div class="cp-stat"><b>Nehru</b><span>Mover</span></div>
        <div class="cp-stat"><b>6</b><span>Objectives</span></div>
      </div>

      <div class="cp-divider">1 · The basic facts</div>

      <table>
        <thead><tr><th>Point</th><th>Detail</th></tr></thead>
        <tbody>
          <tr><td>Moved in</td><td>The first session of the Constituent Assembly</td></tr>
          <tr><td>Moved on</td><td>13 December 1946</td></tr>
          <tr><td>Moved by</td><td>Pt. Jawaharlal Nehru</td></tr>
          <tr><td>Adopted on</td><td>22 January 1947, after considerable deliberation and debate</td></tr>
        </tbody>
      </table>

      <div class="cp-divider">2 · The six objectives</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">1 · Unity and a written Constitution</div>To foster the unity of the Nation, ensure its economic and political security, have a written Constitution and proclaim India a <b>Sovereign Democratic Republic</b>.</div>
        <div class="cp-card green"><div class="cp-card-title">2 · Federal form</div>To have a <b>federal</b> form of Government with the distribution of powers between the Centre and the States.</div>
        <div class="cp-card amber"><div class="cp-card-title">3 · Justice for all</div>To secure <b>justice, equality and freedom</b> of thought, expression, belief, faith, worship, vocation, association and action to all the people of India.</div>
        <div class="cp-card red"><div class="cp-card-title">4 · Safeguards</div>To provide adequate safeguards for <b>minorities</b>, backward and tribal areas, and depressed and other backward classes.</div>
        <div class="cp-card violet"><div class="cp-card-title">5 · Territorial integrity</div>To maintain the <b>integrity of the territory</b> of the republic and its sovereign rights on land, sea and air, according to justice and the law of civilised nations.</div>
        <div class="cp-card teal"><div class="cp-card-title">6 · Place in the world</div>To attain a <b>rightful and honoured place in the world</b> and contribute to world peace and the welfare of mankind.</div>
      </div>

      <div class="cp-mnemonic">Six aims = <b>U F J S I W</b> — “<b>U</b>nity <b>F</b>irst, <b>J</b>ustice <b>S</b>urely <b>I</b>mproves the <b>W</b>orld”</div>

      <div class="cp-vs">
        <div class="good"><h4>✅ Remember</h4>Moved <b>13 Dec 1946</b> → adopted <b>22 Jan 1947</b> (about five weeks later)</div>
        <div class="bad"><h4>❌ Trap</h4>Do not confuse the <u>moving</u> date with the <u>adoption</u> date, and do not say it was moved by Dr. Rajendra Prasad or Dr. Ambedkar</div>
      </div>

      <div class="cp-note exam">The aims of this Resolution reappear in the <b>Preamble</b> of the Constitution — that is why examiners treat it as the Constitution's “philosophy”.</div>
      <div class="cp-note tip">The Resolution speaks of a <b>federal</b> form of government and a <b>Sovereign Democratic Republic</b>; it does not propose a unitary state.</div>

      <div class="cp-chips"><span>Objective Resolution</span><span>Nehru</span><span>13 Dec 1946</span><span>22 Jan 1947</span></div>
`
  },

  /* ─────────── 19 · QUESTION ─────────── */
  19: {
    questext: "The Objective Resolution was moved in the first session of the Constituent Assembly on 13 December 1946 by:",
    options: ["Sardar Vallabhbhai Patel", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Dr. Rajendra Prasad"],
    correct: "3",
    exptext: "✅ Pt. Jawaharlal Nehru moved the Objective Resolution. 📌 Nehru moved the aims. ❌ Prasad presided over the Assembly, Ambedkar chaired the Drafting Committee and Patel chaired the Advisory Committee."
  },

  /* ─────────── 20 · QUESTION ─────────── */
  20: {
    questext: "The Objective Resolution was adopted by the Constituent Assembly on:",
    options: ["13 December 1946", "22 July 1947", "26 January 1947", "22 January 1947"],
    correct: "4",
    exptext: "✅ It was adopted on 22 January 1947 after considerable debate. 📌 Moved 13 Dec 1946, adopted 22 Jan 1947. ❌ 13 December 1946 is the date it was moved, and 22 July 1947 is a different date that is easy to confuse with it."
  },

  /* ─────────── 21 · QUESTION ─────────── */
  21: {
    questext: "Which one of the following was NOT among the objectives embodied in the Objective Resolution?",
    options: ["A federal form of government with distribution of powers between the Centre and the States", "A unitary form of government with all powers vested in the Centre", "A rightful and honoured place for India in the world", "Safeguards for minorities, backward and tribal areas"],
    correct: "2",
    exptext: "✅ A unitary form was not an objective. 📌 The Resolution asked for a federal form. ❌ The other three were all stated aims of the Resolution."
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "Consider the following statements about the Objective Resolution:\n1. It was moved by Dr. Rajendra Prasad.\n2. It was adopted on 22 January 1947.\n3. It sought safeguards for minorities, backward and tribal areas.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 2 and 3 are correct. 📌 Adopted 22 Jan 1947 with safeguards for minorities. ❌ Statement 1 is wrong because Nehru, not Rajendra Prasad, moved it."
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "According to the Objective Resolution, India was to be proclaimed as a:",
    options: ["Union of Princely States", "Sovereign Socialist Secular Democratic Republic", "Sovereign Democratic Republic", "Dominion within the Commonwealth"],
    correct: "3",
    exptext: "✅ Sovereign Democratic Republic. 📌 The words Socialist and Secular were not part of this Resolution. ❌ Dominion status and a union of princely states were not its aim."
  },

  /* ─────────── 24 · CONCEPT PAGE ─────────── */
  24: {
    type: "concept",
    icon: "✍️",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Drafting Committee",
    html: `
      <p class="cp-lead">Dr. B.R. Ambedkar led the committee that <u>turned the Assembly's ideas into the actual text</u> of the Constitution.
      Exam questions focus on its <b>dates, members and replacements</b>, so learn them as a short story.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>29 Aug 1947</b><span>Appointed</span></div>
        <div class="cp-stat"><b>21 Feb 1948</b><span>Draft submitted</span></div>
        <div class="cp-stat"><b>7</b><span>Members incl. Chairman</span></div>
        <div class="cp-stat"><b>B.N. Rau</b><span>Constitutional Adviser</span></div>
      </div>

      <div class="cp-divider">1 · What it did and when</div>

      <ul class="cp-timeline">
        <li><b>29 August 1947</b> — the Assembly appointed the <u>Drafting Committee</u> with Dr. B.R. Ambedkar as Chairman.</li>
        <li><b>Its task</b> — to scrutinise the draft text of the Constitution prepared by the Constitutional Adviser <b>B.N. Rau</b> (Benegal Narsing Rao).</li>
        <li><b>21 February 1948</b> — the Committee submitted the <u>Draft Constitution of India</u> to the President of the Assembly.</li>
      </ul>

      <div class="cp-divider">2 · Members of the Drafting Committee</div>

      <table>
        <thead><tr><th>Member</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Dr. B.R. Ambedkar</td><td><b>Chairman</b></td></tr>
          <tr><td>N. Gopalaswami Ayyangar</td><td>Member</td></tr>
          <tr><td>Alladi Krishnaswami Ayyar</td><td>Member</td></tr>
          <tr><td>K.M. Munshi</td><td>Member</td></tr>
          <tr><td>Syed Mohammad Saadulla</td><td>Member</td></tr>
          <tr><td>B.L. Mitter</td><td>Later replaced by <b>N. Madhava Rao</b></td></tr>
          <tr><td>D.P. Khaitan</td><td>Replaced on his death in 1948 by <b>T.T. Krishnamachari</b></td></tr>
        </tbody>
      </table>

      <div class="cp-mnemonic">Members in order: <b>G</b>opalaswami, <b>A</b>lladi, <b>M</b>unshi, <b>S</b>aadulla, <b>M</b>itter, <b>K</b>haitan — “<b>G</b>reat <b>A</b>ides <b>M</b>ade <b>S</b>ound <b>M</b>asterpiece <b>K</b>anoon”</div>

      <div class="cp-grid c2">
        <div class="cp-card amber"><div class="cp-card-title">🔁 Replacement 1</div><b>B.L. Mitter</b> → later replaced by <b>N. Madhava Rao</b>.</div>
        <div class="cp-card red"><div class="cp-card-title">🔁 Replacement 2</div><b>D.P. Khaitan</b> → replaced on his death in 1948 by <b>T.T. Krishnamachari</b>.</div>
      </div>

      <div class="cp-note trap"><b>Trap:</b> <u>Sardar Patel</u> and <u>Jawaharlal Nehru</u> chaired other committees — they were <i>not</i> members of the Drafting Committee.</div>
      <div class="cp-note trap"><b>Trap:</b> B.N. Rau prepared the <u>first draft text</u> as Constitutional Adviser; the Drafting Committee only scrutinised it and was chaired by Ambedkar.</div>
      <div class="cp-note exam">Favourite question types: <b>Chairman</b> (Ambedkar), <b>date of appointment</b> (29 Aug 1947), <b>date of draft</b> (21 Feb 1948), and <b>who replaced whom</b>.</div>

      <details class="cp-collapse">
        <summary>Two dates in one line — how to avoid mixing them?</summary>
        <p>Think “<b>29 Aug 1947 → appointed</b>” and “<b>21 Feb 1948 → submitted</b>”. There are about six months between them,
        and both come <i>before</i> the final passing on 26 November 1949.</p>
      </details>

      <div class="cp-chips"><span>Drafting Committee</span><span>Ambedkar</span><span>B.N. Rau</span><span>29 Aug 1947</span><span>21 Feb 1948</span></div>
`
  },

  /* ─────────── 25 · QUESTION ─────────── */
  25: {
    questext: "Who was the Chairman of the Drafting Committee of the Constituent Assembly?",
    options: ["Dr. Rajendra Prasad", "B.N. Rau", "Jawaharlal Nehru", "Dr. B.R. Ambedkar"],
    correct: "4",
    exptext: "✅ Dr. B.R. Ambedkar chaired the Drafting Committee. 📌 Ambedkar = Drafting. ❌ Prasad was President of the Assembly, Nehru chaired the Union committees and B.N. Rau was the Constitutional Adviser."
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "The Drafting Committee of the Constituent Assembly was appointed on:",
    options: ["29 August 1947", "14 August 1947", "21 February 1948", "9 December 1946"],
    correct: "1",
    exptext: "✅ 29 August 1947. 📌 29 Aug 1947 = appointed. ❌ 14 August 1947 is when the Assembly became sovereign, and 21 February 1948 is the date the draft was submitted."
  },

  /* ─────────── 27 · QUESTION ─────────── */
  27: {
    questext: "The Drafting Committee submitted the Draft Constitution of India to the President of the Assembly on:",
    options: ["26 November 1949", "21 February 1948", "29 August 1947", "24 January 1950"],
    correct: "2",
    exptext: "✅ 21 February 1948. 📌 21 Feb 1948 = draft submitted. ❌ 29 August 1947 is the appointment date, 26 November 1949 is the final passing and 24 January 1950 is the final signing."
  },

  /* ─────────── 28 · QUESTION ─────────── */
  28: {
    questext: "The Drafting Committee was set up to scrutinise the draft text of the Constitution prepared by the:",
    options: ["Constitutional Adviser K.M. Munshi", "Constitutional Adviser B.N. Rau", "President of the Assembly Dr. Rajendra Prasad", "Chairman Dr. B.R. Ambedkar"],
    correct: "2",
    exptext: "✅ The draft text was prepared by the Constitutional Adviser B.N. Rau. 📌 Rau drafts, the Committee scrutinises. ❌ Munshi was only a member, and Ambedkar and Prasad did not prepare this first draft."
  },

  /* ─────────── 29 · QUESTION ─────────── */
  29: {
    questext: "Consider the following statements about the Drafting Committee:\n1. Syed Mohammad Saadulla was replaced by T.T. Krishnamachari.\n2. B.L. Mitter was later replaced by N. Madhava Rao.\n3. D.P. Khaitan was replaced by T.T. Krishnamachari after his death in 1948.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 2 and 3 are correct. 📌 Mitter → Madhava Rao; Khaitan → Krishnamachari. ❌ Statement 1 is wrong because Saadulla remained a member."
  },

  /* ─────────── 30 · QUESTION ─────────── */
  30: {
    questext: "Which one of the following was NOT a member of the Drafting Committee?",
    options: ["Sardar Vallabhbhai Patel", "Syed Mohammad Saadulla", "K.M. Munshi", "Alladi Krishnaswami Ayyar"],
    correct: "1",
    exptext: "✅ Sardar Patel was not a member. 📌 Patel chaired the Advisory Committee instead. ❌ Ayyar, Munshi and Saadulla were all members of the Drafting Committee."
  },

  /* ─────────── 31 · CONCEPT PAGE ─────────── */
  31: {
    type: "concept",
    icon: "📅",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Passing and Enforcement of the Constitution",
    html: `
      <p class="cp-lead">The Constitution was <u>passed on one date and fully enforced on another</u>,
      and this difference is one of the most-asked points in Polity.
      This page puts every key date in order and explains Constitution Day.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>26 Nov 1949</b><span>Declared passed</span></div>
        <div class="cp-stat"><b>24 Jan 1950</b><span>Members signed</span></div>
        <div class="cp-stat"><b>26 Jan 1950</b><span>Commencement</span></div>
        <div class="cp-stat"><b>26 Nov</b><span>Constitution Day</span></div>
      </div>

      <div class="cp-divider">1 · Passing the Constitution</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">📖 Third reading</div>The <b>third and final reading</b> of the draft was completed on <b>26 November 1949</b>.</div>
        <div class="cp-card green"><div class="cp-card-title">✍️ Signature</div>On that date the President of the Assembly signed it and the Constitution was <u>declared as passed</u>.</div>
      </div>

      <div class="cp-divider">2 · Two dates, two sets of provisions</div>

      <div class="cp-vs">
        <div class="good"><h4>26 November 1949</h4>Provisions on <b>citizenship, elections and the provisional Parliament</b> came into effect immediately.</div>
        <div class="bad"><h4>26 January 1950</h4>The <b>rest of the provisions</b> came into force; the Constitution calls this the <u>date of its commencement</u>.</div>
      </div>

      <table>
        <thead><tr><th>Date</th><th>Event</th></tr></thead>
        <tbody>
          <tr><td>9 Dec 1946</td><td>First meeting of the Constituent Assembly</td></tr>
          <tr><td>13 Dec 1946</td><td>Objective Resolution moved by Nehru</td></tr>
          <tr><td>22 Jan 1947</td><td>Objective Resolution adopted</td></tr>
          <tr><td>14 Aug 1947</td><td>Assembly reassembled as sovereign Assembly</td></tr>
          <tr><td>29 Aug 1947</td><td>Drafting Committee appointed</td></tr>
          <tr><td>21 Feb 1948</td><td>Draft submitted to the President of the Assembly</td></tr>
          <tr><td>26 Nov 1949</td><td>Constitution declared passed; some provisions effective</td></tr>
          <tr><td>24 Jan 1950</td><td>Final signing by the members</td></tr>
          <tr><td>26 Jan 1950</td><td>Rest of the Constitution in force</td></tr>
        </tbody>
      </table>

      <div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution/2.png" alt="Timeline: 9 Dec 1946, 14 Aug 1947, 26 Nov 1949, 26 Jan 1950" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

      <div class="cp-mnemonic">“<b>Nov</b>ember <b>passes</b>, <b>Jan</b>uary <b>performs</b>” — 26 Nov 1949 = passed, 26 Jan 1950 = in force</div>

      <div class="cp-divider">3 · Constitution Day</div>

      <div class="cp-grid c2">
        <div class="cp-card amber"><div class="cp-card-title">📅 Date</div><b>26 November</b> is observed as <u>Constitution Day</u>.</div>
        <div class="cp-card violet"><div class="cp-card-title">🎂 Why</div>It celebrates the <b>125th birth anniversary of Dr. B.R. Ambedkar</b>.</div>
        <div class="cp-card teal"><div class="cp-card-title">🏢 Who decided</div>The <b>Ministry of Social Justice and Empowerment</b> of the Government of India decided to observe it.</div>
        <div class="cp-card pink"><div class="cp-card-title">🗓️ From when</div>It has been observed <b>with effect from 2015</b>.</div>
      </div>

      <div class="cp-note trap"><b>Trap:</b> Constitution Day (<u>26 November</u>) is not the same as Republic Day (<u>26 January</u>).</div>
      <div class="cp-note exam">If a question asks “when did the Constitution come into force?”, the answer is <b>26 January 1950</b>, not the date it was passed.</div>

      <div class="cp-chips"><span>26 Nov 1949</span><span>26 Jan 1950</span><span>Constitution Day</span><span>Commencement</span></div>
`
  },

  /* ─────────── 32 · QUESTION ─────────── */
  32: {
    questext: "The third and final reading of the draft Constitution was completed, and the Constitution was declared as passed, on:",
    options: ["26 January 1950", "26 November 1949", "21 February 1948", "24 January 1950"],
    correct: "2",
    exptext: "✅ 26 November 1949. 📌 November passes. ❌ 26 January 1950 is when the rest came into force and 21 February 1948 is when the draft was submitted."
  },

  /* ─────────── 33 · QUESTION ─────────── */
  33: {
    questext: "Which provisions of the Constitution came into effect immediately on 26 November 1949?",
    options: ["Relations between the Union and the States", "Emergency provisions and the amendment procedure", "Fundamental Rights and Directive Principles", "Citizenship, elections and the provisional Parliament"],
    correct: "4",
    exptext: "✅ Citizenship, elections and provisional Parliament. 📌 Only a few provisions started on 26 Nov 1949. ❌ The other groups came into force with the rest of the Constitution on 26 January 1950."
  },

  /* ─────────── 34 · QUESTION ─────────── */
  34: {
    questext: "The date on which the rest of the Constitution came into force, referred to in the Constitution as the date of its commencement, is:",
    options: ["26 January 1950", "15 August 1947", "26 November 1949", "24 January 1950"],
    correct: "1",
    exptext: "✅ 26 January 1950. 📌 January performs. ❌ 26 November 1949 is the passing date, 24 January 1950 is the signing date and 15 August 1947 is Independence Day."
  },

  /* ─────────── 35 · QUESTION ─────────── */
  35: {
    questext: "Constitution Day is observed on 26 November with effect from 2015 to celebrate which anniversary?",
    options: ["The 125th birth anniversary of Dr. B.R. Ambedkar", "The 125th birth anniversary of Jawaharlal Nehru", "The 75th anniversary of the Objective Resolution", "The 100th birth anniversary of Dr. Rajendra Prasad"],
    correct: "1",
    exptext: "✅ The 125th birth anniversary of Dr. B.R. Ambedkar. 📌 Constitution Day = 26 Nov, from 2015. ❌ The other anniversaries were not the reason given for starting the observance."
  },

  /* ─────────── 36 · QUESTION ─────────── */
  36: {
    questext: "Arrange the following events in chronological order:\nA. Adoption of the Objective Resolution\nB. Appointment of the Drafting Committee\nC. Submission of the Draft Constitution to the President of the Assembly\nD. Declaration of the Constitution as passed",
    options: ["B-A-C-D", "A-C-B-D", "A-B-D-C", "A-B-C-D"],
    correct: "4",
    exptext: "✅ A-B-C-D. 📌 22 Jan 1947 → 29 Aug 1947 → 21 Feb 1948 → 26 Nov 1949. ❌ The other orders place the draft or the passing before the appointment of the Drafting Committee."
  },

  /* ─────────── 37 · QUESTION ─────────── */
  37: {
    questext: "Consider the following statements:\n1. The Constitution was declared passed on 26 November 1949 after the President of the Assembly signed it.\n2. All the provisions of the Constitution came into force on 26 November 1949.\n3. The Ministry of Social Justice and Empowerment decided to observe Constitution Day on 26 November.\nWhich of the statements given above is/are correct?",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 1 and 3 are correct. 📌 Passed 26 Nov 1949, enforced 26 Jan 1950. ❌ Statement 2 is wrong because only some provisions started on 26 November 1949; the rest came into force on 26 January 1950."
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     images/Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution/thumbnail.png → ENTRY 1 (class overview, "thumb" field)  — not numbered
     images/Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution/1.png → ENTRY 2 (2. Constituent Assembly and Making of the Constitution) — seat split 389 = 296 + 93, then 299 after partition
     images/Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution/2.png → ENTRY 31 (Passing and Enforcement of the Constitution) — timeline of the four key dates

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name)
   images/Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution/thumbnail.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920x1080 px, ultra-sharp, vibrant cinematic 3D illustration in deep violet, indigo and electric-blue tones (accent #8b5cf6) with warm gold highlights. Dark edges and a bright soft glow behind the right-centre of the frame, where a teacher's photo will be placed later. Spread a few soft, glowing, slightly blurred decorative 3D elements around the frame, mostly behind the right side: a glossy parchment scroll, a quill pen, a golden Ashoka-style wheel without any text, and a stack of thick law books. Keep the LEFT 62% of the frame calm, darker and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image. Clean, most beautiful, colorful, professional, high-contrast composition.
   images/Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution/1.png: Create a clean flat vector diagram, 16:9, 1200x675 px, on a dark navy background (#0b1220). Top centre: VERY LARGE bold white text "389" with a small caption "TOTAL SEATS". Below it, one wide horizontal bar split into two blocks: a large blue block labelled "BRITISH INDIA 296" and a smaller amber block labelled "PRINCELY STATES 93". At the bottom, a thick arrow pointing down to a green box labelled "AFTER PARTITION 299". Use exactly these English labels, VERY LARGE bold text, thick lines and simple shapes only, so it stays readable when shown small. No people, no logos, no watermarks, no extra text.
   images/Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution/2.png: Create a clean flat vector timeline diagram, 16:9, 1200x675 px, on a dark navy background (#0b1220). One thick horizontal line with four large round markers, left to right. Above each marker put a date in VERY LARGE bold white text, and below it a short caption in bold light-teal text: "9 DEC 1946" with "FIRST MEETING"; "14 AUG 1947" with "SOVEREIGN"; "26 NOV 1949" with "PASSED"; "26 JAN 1950" with "IN FORCE". Use exactly these English labels, thick lines and simple shapes only, so it stays readable when shown small. No people, no logos, no watermarks, no extra text.
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   CHANGE LOG (corrections and additions made to the book's content)
   1. Pages 'Interim Government' and 'First Cabinet of Independent India' tables, Mountbatten Plan, Indian Independence Act etc. on PDF page 205 and 'Different Sources of Indian Constitution' on PDF page 206 are other topics and were left out.
   2. Spelling/name standardised: 'Pt. Jawahar Lal Nehru' written as Jawaharlal Nehru; 'H.C. Mookherjee' as H.C. Mookerjee; 'Alladi Krishnaswami Ayyar' and 'Syed Mohammad Saadulla' kept as standard spellings; 'Dr. K.M. Munshi' written as K.M. Munshi.
   3. Book says 284 members were 'actually present on the 26th November 1949 and signed'. The signing by the members was completed on 24 January 1950; the concept page therefore says 284 members signed the finally approved Constitution, and 24 January 1950 is listed as the date of final signing.
   4. Added (not in the book): the count '7 members including the Chairman' for the Drafting Committee (Ambedkar + the six names listed in the book).
   5. Added (not in the book): the Objective Resolution's aims reappear in the Preamble of the Constitution (exam note on the Objective Resolution page).
   6. Added (not in the book): short explanation of why the strength fell from 389 to 299 (seats of areas that went to Pakistan were no longer in the Indian Assembly).
   7. Added (not in the book): timeline table on the last page combines dates given in the book with 24 January 1950 (final signing).
   8. The six objectives of the Objective Resolution are numbered and shortened from the book's wording; the meaning is unchanged.
   9. Committee list: the four sub-committees (nos. 14 to 17) are shown as the book lists them; chairman groupings for nos. 1 to 7 follow the book's merged cells (Rajendra Prasad: 1 to 4; Nehru: 5 to 7).
   10. Scan quality: PDF page 206 (Lucent p. 206) is blurry; all figures (389, 93, 296, 292, 4, 299, 15, 284, dates and names) were cross-checked against standard references.
   ════════════════════════════════════════════════════════════════ */
