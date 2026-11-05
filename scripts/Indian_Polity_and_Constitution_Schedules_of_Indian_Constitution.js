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
   INDIAN POLITY & CONSTITUTION — 5. Schedules of Indian Constitution
   Register it in portalData.js like any other test (file: "Indian_Polity_and_Constitution_Schedules_of_Indian_Constitution").
   Entry 1 is the CLASS OVERVIEW page. Order: concept page → its practice questions → next concept page …
   Format identical to concept-demo.js (concept pages + question entries).
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
      image: "images/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "INDIAN POLITY",
      line2: "12 SCHEDULES",
      line3: "ONE-SHOT REVISION",
      badge: "FULL CLASS",
      ribbon: "TABLES • TRICKS • PRACTICE",
      burst: "Competitive exams",
      mode: "creator"
    },
    yt: {
      title: "12 Schedules of the Indian Constitution in One Class | Indian Polity | Competitive exams",
      altTitles: [
        "Schedules of Indian Constitution: 1st to 12th Schedule Trick | Polity for all exams",
        "7th Schedule Lists, 8th Schedule 22 Languages & More | Indian Polity",
        "Never Confuse 5th vs 6th and 11th vs 12th Schedule Again | Indian Polity",
        "All 12 Schedules + 45 Practice Questions | Constitution of India | SSC, UPSC, Banking"
      ],
      description:
"The 12 Schedules of the Indian Constitution give sure-shot marks in SSC, UPSC, Banking, Railways and Defence exams — in this class you learn each Schedule by its subject, its Amendment and its key number.\n\n" +
"📌 IN THIS CLASS\n" +
"✅ 8 Schedules at adoption and the 4 added later (9th, 10th, 11th, 12th)\n" +
"✅ 1st Schedule: 28 States and 8 Union Territories\n" +
"✅ 2nd Schedule: Parts A to E (salaries) and the omitted Part B\n" +
"✅ 3rd and 4th Schedules: oaths and Rajya Sabha seats\n" +
"✅ 5th vs 6th Schedule: Scheduled Areas vs tribal areas of the North-East\n" +
"✅ 7th Schedule: Union, State and Concurrent Lists and the 42nd Amendment\n" +
"✅ 8th Schedule: the 22 languages and how the list grew\n" +
"✅ 9th and 10th Schedules: validation of Acts and the anti-defection law\n" +
"✅ 11th and 12th Schedules: Panchayats (29) and Municipalities (18)\n" +
"✅ 45 practice questions right after the concepts\n\n" +
"⏱️ CHAPTERS\n" +
"00:00 Class overview\n00:00 5. Schedules of Indian Constitution\n00:00 1st to 4th Schedule\n00:00 5th and 6th Schedule\n00:00 7th Schedule\n00:00 8th Schedule\n00:00 9th and 10th Schedule\n00:00 11th and 12th Schedule\n\n" +
"👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n" +
"#IndianPolity #SchedulesOfConstitution #SSCCGL #UPSC",
      tags: [
        "schedules of indian constitution", "12 schedules of constitution", "indian polity", "indian polity for competitive exams",
        "7th schedule union state concurrent list", "8th schedule 22 languages", "9th schedule", "10th schedule anti defection law",
        "11th schedule panchayats", "12th schedule municipalities", "5th and 6th schedule difference", "constitution of india",
        "polity tricks", "SSC CGL polity", "UPSC polity", "competitive exams polity", "static gk", "general awareness"
      ],
      hashtags: ["IndianPolity", "Schedules", "Constitution", "SSCCGL"],
      thumbText: "12 SCHEDULES OF CONSTITUTION",
      pinnedComment: "📌 Practice what you learned: solve the 45 questions in the class, then write your score below. Which pair confused you most — 5th vs 6th or 11th vs 12th Schedule? 👇",
      communityPost: "📜 New class is live: the 12 Schedules of the Indian Constitution — tables, tricks and 45 practice questions for all competitive exams. Start with the class overview, then tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 5. Schedules of Indian Constitution\n00:00 1st to 4th Schedule\n00:00 5th and 6th Schedule\n00:00 7th Schedule\n00:00 8th Schedule\n00:00 9th and 10th Schedule\n00:00 11th and 12th Schedule",
      playlist: "Indian Polity — Fast Track Classes"
    },

    html: `
<p class="cp-lead">Today's class is a <u>fast-track on the 12 Schedules of the Indian Constitution</u> — a small chapter that gives <b>sure-shot marks</b> in every polity paper. By the end you will <b>recognise each Schedule by its subject, its Amendment and its key number</b>.</p>

<div class="cp-stats">
  <div class="cp-stat"><b>14</b><span>Concept pages</span></div>
  <div class="cp-stat"><b>45</b><span>Practice questions</span></div>
  <div class="cp-stat"><b>12</b><span>Schedules</span></div>
  <div class="cp-stat"><b>~45 min</b><span>Time needed</span></div>
</div>

<div class="cp-divider">Your roadmap</div>

<ul class="cp-timeline">
  <li><b>5. Schedules of Indian Constitution</b><br>8 at adoption, 4 added later, and the full list at a glance.</li>
  <li><b>1st Schedule</b><br>States and Union Territories (28 + 8).</li>
  <li><b>2nd Schedule</b><br>Salaries of high office-holders, Parts A to E.</li>
  <li><b>3rd and 4th Schedules</b><br>Oaths and affirmations; Rajya Sabha seats.</li>
  <li><b>5th and 6th Schedules</b><br>Scheduled Areas vs tribal areas of the North-East.</li>
  <li><b>7th Schedule</b><br>Union, State and Concurrent Lists.</li>
  <li><b>8th Schedule</b><br>The 22 recognised languages.</li>
  <li><b>9th and 10th Schedules</b><br>Validation of Acts; anti-defection law.</li>
  <li><b>11th and 12th Schedules</b><br>Panchayats (29 subjects) and Municipalities (18 subjects).</li>
</ul>

<div class="cp-divider">What you will be able to do</div>

<div class="cp-grid c2">
  <div class="cp-card blue"><div class="cp-card-title">📜 Match Schedule to subject</div>Name the Schedule from a one-line description in a few seconds.</div>
  <div class="cp-card green"><div class="cp-card-title">⚖️ Use the three Lists</div>Decide whether a subject is Union, State or Concurrent.</div>
  <div class="cp-card amber"><div class="cp-card-title">🔢 Remember the numbers</div>28 + 8, 245, 22 languages, 29 and 18 subjects.</div>
  <div class="cp-card red"><div class="cp-card-title">⚠️ Avoid the traps</div>5th vs 6th, 11th vs 12th, and which oaths are not in the 3rd Schedule.</div>
</div>

<div class="cp-note exam"><b>Why it matters:</b> Schedules appear in SSC, UPSC Prelims, Banking, Railways and Defence exams almost every year — mostly as match-the-following and “which is NOT” questions.</div>
<div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages, so take your time.</div>

<div class="cp-chips"><span>Indian Polity</span><span>Constitution</span><span>Schedules</span><span>All competitive exams</span></div>
`
  },

  /* ─────────── 2 · CONCEPT PAGE — 5. Schedules of Indian Constitution ─────────── */
  2: {
    type: "concept",
    icon: "📜",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "5. Schedules of Indian Constitution",
    html: `
<p class="cp-lead">The Articles of the Constitution say <u>what</u> the rules are; the <b>Schedules</b> are the lists and tables at the end of the book that hold the <u>details</u> — names of States, salaries, oaths, languages, subjects. They carry the same legal force as the Articles.</p>

<div class="cp-stats">
  <div class="cp-stat"><b>8</b><span>At adoption</span></div>
  <div class="cp-stat"><b>+4</b><span>Added later</span></div>
  <div class="cp-stat"><b>12</b><span>Total today</span></div>
</div>

<div class="cp-fig"><img src="images/1.png" alt="Timeline: 8 Schedules in 1950, then 9th, 10th, 11th and 12th added" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

<div class="cp-divider">The 12 Schedules at a glance</div>

<table>
  <thead><tr><th>Schedule</th><th>What it deals with</th></tr></thead>
  <tbody>
    <tr><td><b>1st</b></td><td>States and Union Territories</td></tr>
    <tr><td><b>2nd</b></td><td>Salaries and emoluments of high office-holders</td></tr>
    <tr><td><b>3rd</b></td><td>Forms of oath and affirmation</td></tr>
    <tr><td><b>4th</b></td><td>Rajya Sabha seats for States and UTs</td></tr>
    <tr><td><b>5th</b></td><td>Scheduled Areas and Scheduled Tribes</td></tr>
    <tr><td><b>6th</b></td><td>Tribal areas of Assam, Meghalaya, Tripura, Mizoram</td></tr>
    <tr><td><b>7th</b></td><td>Union, State and Concurrent Lists</td></tr>
    <tr><td><b>8th</b></td><td>Recognised languages</td></tr>
    <tr><td><b>9th</b></td><td>Validation of certain Acts and Regulations</td></tr>
    <tr><td><b>10th</b></td><td>Anti-defection law</td></tr>
    <tr><td><b>11th</b></td><td>Powers of Panchayats</td></tr>
    <tr><td><b>12th</b></td><td>Powers of Municipalities</td></tr>
  </tbody>
</table>

<div class="cp-divider">The four Schedules added later</div>

<ul class="cp-timeline">
  <li><b>9th Schedule</b> — 1st Amendment, 1951</li>
  <li><b>10th Schedule</b> — 52nd Amendment, 1985</li>
  <li><b>11th Schedule</b> — 73rd Amendment, 1992</li>
  <li><b>12th Schedule</b> — 74th Amendment, 1992</li>
</ul>

<div class="cp-note trap"><b>Trap:</b> the 10th, 11th and 12th Schedules are all products of the <u>1980s–90s reforms</u>; only the <b>9th</b> belongs to the early 1950s.</div>
<div class="cp-note exam">Questions often ask <u>which Schedule was added by which Amendment</u>, or match a Schedule with its subject. Learn the table above first.</div>
<div class="cp-mnemonic">S S O R S T L L V D P M — “<b>S</b>ome <b>S</b>illy <b>O</b>wls <b>R</b>ead <b>S</b>tories <b>T</b>o <b>L</b>ittle <b>L</b>azy <b>V</b>ultures; <b>D</b>ogs <b>P</b>refer <b>M</b>eat”</div>
`
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "How many Schedules did the Constitution of India have at the time of its adoption?",
    options: ["Ten", "Twelve", "Six", "Eight"],
    correct: "4",
    exptext: "✅ Eight — the Constitution began with 8 Schedules. 📌 Four more were added later: 9th (1951), 10th (1985), 11th and 12th (1992). ❌ Twelve is today's total, not the original number.",
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "Arrange the following Schedules in the order in which they were added to the Constitution (earliest first): 1. Tenth Schedule 2. Ninth Schedule 3. Twelfth Schedule 4. Eleventh Schedule",
    options: ["2 – 1 – 4 – 3", "1 – 2 – 4 – 3", "2 – 1 – 3 – 4", "2 – 4 – 1 – 3"],
    correct: "1",
    exptext: "✅ 2 – 1 – 4 – 3: Ninth (1st Amendment, 1951) → Tenth (52nd, 1985) → Eleventh (73rd, 1992) → Twelfth (74th, 1992). 📌 The Amendment numbers rise in the same order: 1, 52, 73, 74. ❌ The Eleventh (Panchayats) comes before the Twelfth (Municipalities).",
  },

  /* ─────────── 5 · CONCEPT PAGE — 1st Schedule ─────────── */
  5: {
    type: "concept",
    icon: "🗺️",
    accent: "#22c55e",
    pauseTimer: true,
    title: "1st Schedule",
    html: `
<p class="cp-lead">The First Schedule is the Constitution's <u>official address book of India</u>: it lists every <b>State</b> and <b>Union Territory</b> along with its territory.</p>

<div class="cp-stats">
  <div class="cp-stat"><b>28</b><span>States</span></div>
  <div class="cp-stat"><b>8</b><span>Union Territories</span></div>
</div>

<div class="cp-divider">Key facts</div>

<div class="cp-grid c2">
  <div class="cp-card blue"><div class="cp-card-title">Why it exists</div>Article 1 says India is a Union of States, and the States and their territories are those <b>specified in the First Schedule</b>.</div>
  <div class="cp-card green"><div class="cp-card-title">Who can alter it</div>Under Articles 3 and 4, <b>Parliament</b> amends the First Schedule when a State or UT is formed, merged, renamed or its boundary is altered.</div>
</div>

<div class="cp-divider">The 8 Union Territories</div>

<table>
  <thead><tr><th>No.</th><th>Union Territory</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Andaman and Nicobar Islands</td></tr>
    <tr><td>2</td><td>Chandigarh</td></tr>
    <tr><td>3</td><td>Dadra and Nagar Haveli and Daman and Diu</td></tr>
    <tr><td>4</td><td>Delhi (National Capital Territory)</td></tr>
    <tr><td>5</td><td>Jammu and Kashmir</td></tr>
    <tr><td>6</td><td>Ladakh</td></tr>
    <tr><td>7</td><td>Lakshadweep</td></tr>
    <tr><td>8</td><td>Puducherry</td></tr>
  </tbody>
</table>

<div class="cp-note trap"><b>Trap:</b> a law under Article 3 or 4 that forms a State is <u>not</u> a constitutional amendment under Article 368. It needs only a <b>simple majority</b> in Parliament.</div>
<div class="cp-note exam">The exam favourites are the <b>count (28 + 8)</b> and the <b>list of Union Territories</b>. Remember that Goa, Sikkim and Telangana are States, not UTs.</div>
<div class="cp-mnemonic">1st Schedule = <b>1</b> list of <b>all</b> units — “the first thing you see on India's map”.</div>
`
  },

  /* ─────────── 6 · QUESTION ─────────── */
  6: {
    questext: "How many States and Union Territories are listed in the First Schedule at present?",
    options: ["29 States and 7 Union Territories", "28 States and 9 Union Territories", "27 States and 8 Union Territories", "28 States and 8 Union Territories"],
    correct: "4",
    exptext: "✅ 28 States and 8 Union Territories. 📌 Telangana (2014) made it 29 States; the 2019 reorganisation of Jammu & Kashmir into two UTs brought it back to 28 States and 8 UTs. ❌ 29 + 7 is the older position.",
  },

  /* ─────────── 7 · QUESTION ─────────── */
  7: {
    questext: "Which of the following is NOT a Union Territory listed in the First Schedule?",
    options: ["Ladakh", "Goa", "Lakshadweep", "Puducherry"],
    correct: "2",
    exptext: "✅ Goa — it is a State. 📌 UTs are Andaman & Nicobar, Chandigarh, Dadra & Nagar Haveli and Daman & Diu, Delhi, Jammu & Kashmir, Ladakh, Lakshadweep, Puducherry. ❌ The other three are all Union Territories.",
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "Consider the statements about the First Schedule: 1. It contains the names of the States and Union Territories and their territories. 2. A law of Parliament forming a State must be passed by the special majority required for an amendment under Article 368. Which of the statements is/are correct?",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ 1 only. 📌 Under Article 4, laws that alter the First Schedule are not constitutional amendments under Article 368 — a simple majority is enough. ❌ Statement 2 is wrong for that reason.",
  },

  /* ─────────── 9 · CONCEPT PAGE — 2nd Schedule ─────────── */
  9: {
    type: "concept",
    icon: "💰",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "2nd Schedule",
    html: `
<p class="cp-lead">The Second Schedule is the <u>salary slip of the Constitution</u>. It names the high office-holders whose <b>salary and emoluments</b> are fixed in five Parts (A to E).</p>

<table>
  <thead><tr><th>Part</th><th>Salary and emoluments of</th></tr></thead>
  <tbody>
    <tr><td><b>Part A</b></td><td>The President and the Governors of the States</td></tr>
    <tr><td><b>Part B</b></td><td>Omitted</td></tr>
    <tr><td><b>Part C</b></td><td>Speaker and Deputy Speaker of the Lok Sabha; Chairman and Deputy Chairman of the Rajya Sabha; Speaker and Deputy Speaker of State Legislative Assemblies; Chairman and Deputy Chairman of State Legislative Councils</td></tr>
    <tr><td><b>Part D</b></td><td>Judges of the Supreme Court and the High Courts</td></tr>
    <tr><td><b>Part E</b></td><td>Comptroller and Auditor General of India</td></tr>
  </tbody>
</table>

<div class="cp-grid c2">
  <div class="cp-card amber"><div class="cp-card-title">Why a Schedule?</div>These posts must be <b>independent</b>. Fixing their pay in the Constitution keeps it away from day-to-day political bargaining.</div>
  <div class="cp-card violet"><div class="cp-card-title">Remember the pattern</div>A = executive heads · C = presiding officers · D = judges · E = auditor.</div>
</div>

<div class="cp-note trap"><b>Trap:</b> the salary of the <u>Prime Minister, Union Ministers and MPs</u> is <b>not</b> given here. It is fixed by ordinary laws of Parliament.</div>
<div class="cp-note exam">Questions ask <u>“Part D deals with…”</u>, <u>“Part E deals with…”</u> or <u>“which Part is omitted”</u> (answer: <b>Part B</b>).</div>
<div class="cp-mnemonic">A-B-C-D-E → <b>A</b>head of State · <b>B</b>lank · <b>C</b>hair-holders · <b>D</b>ispensers of justice · <b>E</b>xaminer of accounts</div>
`
  },

  /* ─────────── 10 · QUESTION ─────────── */
  10: {
    questext: "Part D of the Second Schedule deals with the salary and emoluments of —",
    options: ["President and Governors", "Comptroller and Auditor General of India", "Judges of the Supreme Court and High Courts", "Speaker of the Lok Sabha"],
    correct: "3",
    exptext: "✅ Judges of the Supreme Court and the High Courts. 📌 D = Dispensers of justice. ❌ President and Governors are in Part A, CAG in Part E, presiding officers in Part C.",
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "The salary and emoluments of the Comptroller and Auditor General of India are given in which Part of the Second Schedule?",
    options: ["Part D", "Part C", "Part E", "Part A"],
    correct: "3",
    exptext: "✅ Part E. 📌 E = Examiner of accounts. ❌ Part D is for judges, Part C for presiding officers, Part A for the President and Governors.",
  },

  /* ─────────── 12 · QUESTION ─────────── */
  12: {
    questext: "Which Part of the Second Schedule has been omitted?",
    options: ["Part B", "Part A", "Part C", "Part E"],
    correct: "1",
    exptext: "✅ Part B. 📌 A-B-C-D-E: the B is the 'Blank' one. ❌ Parts A, C, D and E are all in force.",
  },

  /* ─────────── 13 · QUESTION ─────────── */
  13: {
    questext: "Which of the following is NOT covered by the Second Schedule?",
    options: ["Governor of a State", "Speaker of the Lok Sabha", "Deputy Chairman of the Rajya Sabha", "Prime Minister of India"],
    correct: "4",
    exptext: "✅ Prime Minister — the PM's pay is fixed by a law of Parliament. 📌 Ministers' and MPs' salaries also come from Acts of Parliament. ❌ Governor (Part A) and the Speaker and Deputy Chairman (Part C) are in the Schedule.",
  },

  /* ─────────── 14 · CONCEPT PAGE — 3rd Schedule ─────────── */
  14: {
    type: "concept",
    icon: "🤝",
    accent: "#ec4899",
    pauseTimer: true,
    title: "3rd Schedule",
    html: `
<p class="cp-lead">Before taking charge, many office-holders must make a solemn <b>oath or affirmation</b>. The Third Schedule gives the <u>exact wording (forms)</u> of those oaths.</p>

<div class="cp-grid c2">
  <div class="cp-card blue"><div class="cp-card-title">Union level</div>Union Ministers · candidates for Parliament · Members of Parliament · Judges of the Supreme Court · Comptroller and Auditor General</div>
  <div class="cp-card green"><div class="cp-card-title">State level</div>State Ministers · candidates for the State Legislature · Members of the State Legislature · Judges of the High Courts</div>
</div>

<div class="cp-note remember">The oath says who you will be loyal to: the <b>Constitution of India</b>, India's <u>sovereignty and integrity</u>, and faithful discharge of duty.</div>

<div class="cp-divider">Where the other oaths are</div>

<table>
  <thead><tr><th>Office</th><th>Oath is in</th></tr></thead>
  <tbody>
    <tr><td>President</td><td>Article 60</td></tr>
    <tr><td>Governor</td><td>Article 159</td></tr>
  </tbody>
</table>

<div class="cp-note trap"><b>Trap:</b> the oaths of the <u>President</u> and the <u>Governor</u> are written in the <b>Articles</b>, not in the Third Schedule.</div>
<div class="cp-note exam">Typical question: “Which of these is <b>not</b> in the Third Schedule?” — pick the President or Governor.</div>
<div class="cp-mnemonic"><b>3</b>rd = <b>3</b> words: <b>O</b>ath · <b>A</b>ffirmation · <b>F</b>orms.</div>
`
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "Which Schedule contains the forms of oath and affirmation for Union Ministers and Judges?",
    options: ["Second Schedule", "Third Schedule", "Fourth Schedule", "Seventh Schedule"],
    correct: "2",
    exptext: "✅ Third Schedule. 📌 It gives the forms of oaths and affirmations. ❌ Second is for salaries, Fourth for Rajya Sabha seats, Seventh for the three Lists.",
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "The form of oath of which of the following is NOT given in the Third Schedule?",
    options: ["Judge of the Supreme Court", "Member of Parliament", "President of India", "Comptroller and Auditor General"],
    correct: "3",
    exptext: "✅ President — the oath is in Article 60 of the Constitution. 📌 The Governor's oath is in Article 159. ❌ Judges, MPs and the CAG take oaths in forms laid down in the Third Schedule.",
  },

  /* ─────────── 17 · QUESTION ─────────── */
  17: {
    questext: "Consider the statements about the Third Schedule: 1. It has forms of oath for candidates contesting elections to Parliament. 2. It has forms of oath for members of the State Legislature. Which of the statements is/are correct?",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both 1 and 2. 📌 The Schedule covers candidates and members at both Union and State levels, plus Ministers and judges. ❌ Neither 'only' option fits, because both statements are correct.",
  },

  /* ─────────── 18 · CONCEPT PAGE — 4th Schedule ─────────── */
  18: {
    type: "concept",
    icon: "🏛️",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "4th Schedule",
    html: `
<p class="cp-lead">The Rajya Sabha is the <u>House of the States</u>. The Fourth Schedule decides <b>how many seats each State and Union Territory gets</b> in it.</p>

<div class="cp-stats">
  <div class="cp-stat"><b>233</b><span>Elected members</span></div>
  <div class="cp-stat"><b>12</b><span>Nominated</span></div>
  <div class="cp-stat"><b>245</b><span>Present strength</span></div>
  <div class="cp-stat"><b>250</b><span>Maximum</span></div>
</div>

<div class="cp-grid c2">
  <div class="cp-card blue"><div class="cp-card-title">Elected seats</div>Distributed to States and to the UTs that have representation: <b>Delhi, Puducherry and Jammu &amp; Kashmir</b>. Bigger population means more seats.</div>
  <div class="cp-card teal"><div class="cp-card-title">Nominated seats</div>The President nominates <b>12</b> persons with special knowledge in literature, science, art and social service (Article 80).</div>
</div>

<div class="cp-note remember">The Schedule lists seats <u>only for elected members</u>. The 12 nominated members are not allotted to any State.</div>
<div class="cp-note exam">Learn the three numbers: <b>245 total = 233 elected + 12 nominated</b>, with 250 as the constitutional ceiling.</div>
<div class="cp-mnemonic"><b>4</b>th = <b>4</b> “R”: <b>R</b>ajya Sabha <b>R</b>epresents <b>R</b>egions' <b>R</b>ights.</div>
`
  },

  /* ─────────── 19 · QUESTION ─────────── */
  19: {
    questext: "Allocation of seats in the Rajya Sabha to the States and Union Territories is given in which Schedule?",
    options: ["Fourth Schedule", "Third Schedule", "Fifth Schedule", "Second Schedule"],
    correct: "1",
    exptext: "✅ Fourth Schedule. 📌 It lists the elected seats of each State and UT. ❌ The Fifth Schedule is about Scheduled Areas and Scheduled Tribes.",
  },

  /* ─────────── 20 · QUESTION ─────────── */
  20: {
    questext: "The present strength of the Rajya Sabha is 245. How many of its members are nominated by the President?",
    options: ["2", "10", "15", "12"],
    correct: "4",
    exptext: "✅ 12 — drawn from literature, science, art and social service. 📌 245 = 233 elected + 12 nominated. ❌ The figure 2 is a distractor taken from the old nomination to the Lok Sabha.",
  },

  /* ─────────── 21 · CONCEPT PAGE — 5th Schedule ─────────── */
  21: {
    type: "concept",
    icon: "🌿",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "5th Schedule",
    html: `
<p class="cp-lead">The Fifth Schedule protects the land, culture and rights of tribal people living in <u>Scheduled Areas</u>, by giving a special system of <b>administration and control</b> to <b>Scheduled Areas and Scheduled Tribes</b>.</p>

<div class="cp-grid c2">
  <div class="cp-card green"><div class="cp-card-title">Where it applies</div>All States <b>except</b> Assam, Meghalaya, Tripura and Mizoram (those four come under the Sixth Schedule). Scheduled Areas exist in States such as Jharkhand, Odisha, Chhattisgarh and Madhya Pradesh.</div>
  <div class="cp-card amber"><div class="cp-card-title">Key players</div>The <b>President</b> declares a Scheduled Area. The <b>Governor</b> reports on its administration and can make regulations. A <b>Tribes Advisory Council</b> advises.</div>
</div>

<ol class="cp-steps">
  <li>The President declares an area to be a <b>Scheduled Area</b>.</li>
  <li>The Governor makes regulations to protect tribal land and money-lending.</li>
  <li>A Tribes Advisory Council gives advice on tribal welfare.</li>
</ol>

<div class="cp-note trap"><b>Trap:</b> <u>5th = most States</u>; <u>6th = four North-Eastern States</u>. Do not swap them.</div>
<div class="cp-note exam">Common question: “Administration and control of Scheduled Areas and Scheduled Tribes” — answer <b>Fifth Schedule</b>.</div>
<div class="cp-mnemonic"><b>5</b> = “<b>F</b>ive-<b>F</b>ive: <b>F</b>orests and <b>F</b>olk of the tribes”.</div>
`
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "Administration and control of Scheduled Areas and Scheduled Tribes is provided for in the —",
    options: ["Sixth Schedule", "Fifth Schedule", "Fourth Schedule", "Ninth Schedule"],
    correct: "2",
    exptext: "✅ Fifth Schedule. 📌 It covers Scheduled Areas and Tribes in most States. ❌ The Sixth Schedule covers only Assam, Meghalaya, Tripura and Mizoram.",
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "Who declares an area to be a 'Scheduled Area' under the Fifth Schedule?",
    options: ["The Governor", "Parliament", "The President", "The Tribes Advisory Council"],
    correct: "3",
    exptext: "✅ The President, by an order. 📌 The Governor reports on it and makes regulations; the Tribes Advisory Council only advises. ❌ Parliament does not declare Scheduled Areas.",
  },

  /* ─────────── 24 · CONCEPT PAGE — 6th Schedule ─────────── */
  24: {
    type: "concept",
    icon: "⛰️",
    accent: "#ef4444",
    pauseTimer: true,
    title: "6th Schedule",
    html: `
<p class="cp-lead">The Sixth Schedule gives <u>self-rule inside the State</u> to the tribal areas of four North-Eastern States through <b>Autonomous District Councils</b> and Regional Councils.</p>

<table>
  <thead><tr><th>Covers</th><th>Tribal areas of</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Assam</td></tr>
    <tr><td>2</td><td>Meghalaya</td></tr>
    <tr><td>3</td><td>Tripura</td></tr>
    <tr><td>4</td><td>Mizoram</td></tr>
  </tbody>
</table>

<div class="cp-divider">5th vs 6th Schedule</div>

<div class="cp-grid c2">
  <div class="cp-card violet"><div class="cp-card-title">5th Schedule</div>Most States · Scheduled Areas · Governor and <b>Tribes Advisory Council</b>.</div>
  <div class="cp-card teal"><div class="cp-card-title">6th Schedule</div>Assam, Meghalaya, Tripura, Mizoram · <b>Autonomous District Councils</b> with law-making and judicial powers.</div>
</div>

<div class="cp-note trap"><b>Trap:</b> <u>Nagaland</u>, Manipur and Arunachal Pradesh are in the North-East, but their tribal areas are <b>not</b> under the Sixth Schedule.</div>
<div class="cp-note exam">If you see “Autonomous District Council”, think <b>Sixth Schedule</b> immediately.</div>
<div class="cp-mnemonic"><b>A</b>ssam, <b>M</b>eghalaya, <b>T</b>ripura, <b>M</b>izoram → “<b>A</b> <b>M</b>an <b>T</b>akes <b>M</b>ilk” (the 6th Schedule States).</div>
`
  },

  /* ─────────── 25 · QUESTION ─────────── */
  25: {
    questext: "Autonomous District Councils are provided for under which Schedule?",
    options: ["Sixth Schedule", "Fifth Schedule", "Eighth Schedule", "Eleventh Schedule"],
    correct: "1",
    exptext: "✅ Sixth Schedule. 📌 It gives Autonomous District and Regional Councils to tribal areas. ❌ The Fifth Schedule uses a Tribes Advisory Council instead.",
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "The Sixth Schedule applies to the tribal areas of which set of States?",
    options: ["Assam, Nagaland, Manipur and Arunachal Pradesh", "Meghalaya, Sikkim, Tripura and Manipur", "Mizoram, Nagaland, Assam and Tripura", "Assam, Meghalaya, Tripura and Mizoram"],
    correct: "4",
    exptext: "✅ Assam, Meghalaya, Tripura and Mizoram. 📌 Memory hook: A-M-T-M. ❌ Nagaland, Manipur and Arunachal Pradesh are not covered by the Sixth Schedule.",
  },

  /* ─────────── 27 · QUESTION ─────────── */
  27: {
    questext: "Consider the statements: 1. The Fifth Schedule deals with the tribal areas of Assam, Meghalaya, Tripura and Mizoram. 2. The Sixth Schedule provides for Autonomous District Councils. Which of the statements is/are correct?",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ 2 only. 📌 The four North-Eastern States are under the Sixth Schedule. ❌ Statement 1 wrongly gives them to the Fifth Schedule.",
  },

  /* ─────────── 28 · CONCEPT PAGE — 7th Schedule ─────────── */
  28: {
    type: "concept",
    icon: "⚖️",
    accent: "#84cc16",
    pauseTimer: true,
    title: "7th Schedule",
    html: `
<p class="cp-lead">India is a federation, so <u>who may make laws on what?</u> must be clear. The Seventh Schedule divides powers between the <b>Union</b> and the <b>States</b> into three lists (Article 246).</p>

<div class="cp-fig"><img src="images/2.png" alt="Three lists: Union List, State List and Concurrent List" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

<div class="cp-grid c3">
  <div class="cp-card blue"><div class="cp-card-title">Union List</div><b>Only Parliament</b> makes laws. About 100 subjects: defence, foreign affairs, atomic energy, railways, banking, currency, citizenship.</div>
  <div class="cp-card green"><div class="cp-card-title">State List</div><b>Only State Legislatures</b> make laws (in normal times). About 61 subjects: police, public order, agriculture, public health, land, local government.</div>
  <div class="cp-card amber"><div class="cp-card-title">Concurrent List</div><b>Both</b> can make laws. About 52 subjects: education, forests, criminal law, marriage and divorce, trade unions, protection of wild animals and birds.</div>
</div>

<div class="cp-divider">Rules to remember</div>

<ol class="cp-steps">
  <li><b>Residuary powers</b> (subjects not in any list) belong to <b>Parliament</b> (Article 248).</li>
  <li>If a Union law and a State law clash on a Concurrent subject, the <b>Union law prevails</b> (Article 254), with a limited exception when the State law has the President's assent.</li>
  <li>The <b>42nd Amendment (1976)</b> shifted five subjects from the State List to the Concurrent List: <b>education, forests, weights and measures, protection of wild animals and birds, administration of justice</b>.</li>
</ol>

<table>
  <thead><tr><th>List</th><th>Who legislates</th><th>Memory image</th></tr></thead>
  <tbody>
    <tr><td>Union</td><td>Parliament only</td><td>National matters</td></tr>
    <tr><td>State</td><td>State Legislature only</td><td>Local matters</td></tr>
    <tr><td>Concurrent</td><td>Both (Union wins in a clash)</td><td>Shared matters</td></tr>
  </tbody>
</table>

<div class="cp-note trap"><b>Trap:</b> <u>Police and public order</u> are in the <b>State List</b>; <u>Education and Forests</u> are in the <b>Concurrent List</b>; <u>Defence</u> is in the <b>Union List</b>.</div>
<div class="cp-note exam">Very high yield. Expect “which list?”, “which is NOT in …” and “42nd Amendment shifted …” questions.</div>
<div class="cp-mnemonic">“<b>U</b>nion = <b>U</b>pper (national), <b>S</b>tate = <b>S</b>treet (local), <b>C</b>oncurrent = <b>C</b>ommon”</div>
`
  },

  /* ─────────── 29 · QUESTION ─────────── */
  29: {
    questext: "'Police' is included in which List of the Seventh Schedule?",
    options: ["Union List", "State List", "Concurrent List", "Both Union and State Lists"],
    correct: "2",
    exptext: "✅ State List — police and public order are State subjects. 📌 Defence and foreign affairs are Union subjects. ❌ The Union List does not contain ordinary State police.",
  },

  /* ─────────── 30 · QUESTION ─────────── */
  30: {
    questext: "Which of the following subjects is in the Concurrent List?",
    options: ["Defence", "Agriculture", "Education", "Public order"],
    correct: "3",
    exptext: "✅ Education. 📌 It was moved to the Concurrent List by the 42nd Amendment (1976). ❌ Defence is a Union subject; Agriculture and Public order are State subjects.",
  },

  /* ─────────── 31 · QUESTION ─────────── */
  31: {
    questext: "Which of the following is NOT a subject of the Union List?",
    options: ["Public health and sanitation", "Defence", "Atomic energy", "Banking"],
    correct: "1",
    exptext: "✅ Public health and sanitation — a State subject. 📌 Defence, atomic energy and banking are Union subjects. ❌ The other three are all in the Union List.",
  },

  /* ─────────── 32 · QUESTION ─────────── */
  32: {
    questext: "Which of the following subjects was shifted from the State List to the Concurrent List by the 42nd Amendment (1976)?",
    options: ["Police", "Agriculture", "Public order", "Forests"],
    correct: "4",
    exptext: "✅ Forests. 📌 The five shifted subjects: education, forests, weights and measures, protection of wild animals and birds, administration of justice. ❌ Police, Agriculture and Public order remain in the State List.",
  },

  /* ─────────── 33 · QUESTION ─────────── */
  33: {
    questext: "Consider the statements: 1. Residuary powers of legislation belong to Parliament. 2. In case of a conflict on a Concurrent List subject, the State law always prevails. Which of the statements is/are correct?",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ 1 only. 📌 Article 248 gives residuary powers to Parliament; under Article 254 the Union law generally prevails in a clash. ❌ Statement 2 is wrong — the State law does not 'always' prevail.",
  },

  /* ─────────── 34 · QUESTION ─────────── */
  34: {
    questext: "Consider the pairs: 1. Defence — Union List 2. Agriculture — State List 3. Marriage and divorce — State List. Which of the pairs is/are correctly matched?",
    options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ 1 and 2 only. 📌 Marriage and divorce is in the Concurrent List. ❌ Pair 3 is wrong, so options containing it are wrong.",
  },

  /* ─────────── 35 · CONCEPT PAGE — 8th Schedule ─────────── */
  35: {
    type: "concept",
    icon: "🗣️",
    accent: "#f97316",
    pauseTimer: true,
    title: "8th Schedule",
    html: `
<p class="cp-lead">India speaks hundreds of languages. The Eighth Schedule lists the <b>languages recognised by the Constitution</b>. Today there are <u>22</u>.</p>

<div class="cp-fig"><img src="images/3.png" alt="Growth of the Eighth Schedule: 14 to 15 to 18 to 22 languages" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

<div class="cp-stats">
  <div class="cp-stat"><b>14</b><span>At adoption</span></div>
  <div class="cp-stat"><b>22</b><span>Today</span></div>
</div>

<div class="cp-divider">How the list grew</div>

<table>
  <thead><tr><th>Year</th><th>Amendment</th><th>Language(s) added</th><th>Total</th></tr></thead>
  <tbody>
    <tr><td>1950</td><td>Original</td><td>14 languages</td><td>14</td></tr>
    <tr><td>1967</td><td>21st</td><td>Sindhi</td><td>15</td></tr>
    <tr><td>1992</td><td>71st</td><td>Konkani, Manipuri, Nepali</td><td>18</td></tr>
    <tr><td>2003</td><td>92nd</td><td>Bodo, Dogri, Maithili, Santhali</td><td>22</td></tr>
  </tbody>
</table>

<details class="cp-collapse">
  <summary>The 22 languages (alphabetical)</summary>
  <p>Assamese · Bengali · Bodo · Dogri · Gujarati · Hindi · Kannada · Kashmiri · Konkani · Maithili · Malayalam · Manipuri · Marathi · Nepali · Odia · Punjabi · Sanskrit · Santhali · Sindhi · Tamil · Telugu · Urdu</p>
</details>

<div class="cp-note trap"><b>Trap:</b> <u>English, Tulu, Bhojpuri and Rajasthani</u> are <b>not</b> in the Eighth Schedule. Also, a language being in this Schedule is not the same as being a “classical language”.</div>
<div class="cp-note exam">Learn the three jumps: <b>1967 (Sindhi)</b>, <b>1992 (Konkani, Manipuri, Nepali)</b>, <b>2003 (Bodo, Dogri, Maithili, Santhali)</b>. The spelling “Oriya” was replaced by <b>Odia</b> by the 96th Amendment (2011).</div>
<div class="cp-mnemonic">Remember “<b>1-3-4</b>”: Sindhi is <b>1</b>, then <b>3</b> in 1992, then <b>4</b> in 2003 → 14 + 1 + 3 + 4 = <b>22</b>.</div>
`
  },

  /* ─────────── 36 · QUESTION ─────────── */
  36: {
    questext: "How many languages are recognised in the Eighth Schedule at present?",
    options: ["18", "22", "14", "24"],
    correct: "2",
    exptext: "✅ 22. 📌 14 + 1 (Sindhi) + 3 (Konkani, Manipuri, Nepali) + 4 (Bodo, Dogri, Maithili, Santhali) = 22. ❌ 18 was the count after 1992; 14 was the original number.",
  },

  /* ─────────── 37 · QUESTION ─────────── */
  37: {
    questext: "How many languages were included in the Eighth Schedule when the Constitution was adopted?",
    options: ["15", "18", "14", "22"],
    correct: "3",
    exptext: "✅ 14. 📌 Sindhi was added in 1967 as the 15th. ❌ 18 and 22 are later totals.",
  },

  /* ─────────── 38 · QUESTION ─────────── */
  38: {
    questext: "Which of the following languages is NOT included in the Eighth Schedule?",
    options: ["Tulu", "Santhali", "Dogri", "Bodo"],
    correct: "1",
    exptext: "✅ Tulu — it is not an Eighth Schedule language. 📌 Bhojpuri, Rajasthani and English are also outside it. ❌ Santhali, Dogri and Bodo were added in 2003.",
  },

  /* ─────────── 39 · QUESTION ─────────── */
  39: {
    questext: "Which of the following languages was added to the Eighth Schedule by the 92nd Constitutional Amendment (2003)?",
    options: ["Sindhi", "Konkani", "Nepali", "Maithili"],
    correct: "4",
    exptext: "✅ Maithili (with Bodo, Dogri and Santhali). 📌 92nd = 2003 = four languages. ❌ Sindhi came in 1967; Konkani and Nepali in 1992.",
  },

  /* ─────────── 40 · QUESTION ─────────── */
  40: {
    questext: "Konkani, Manipuri and Nepali were added to the Eighth Schedule by which Constitutional Amendment?",
    options: ["21st Amendment (1967)", "71st Amendment (1992)", "92nd Amendment (2003)", "96th Amendment (2011)"],
    correct: "2",
    exptext: "✅ 71st Amendment (1992). 📌 This raised the number of languages from 15 to 18. ❌ The 21st added only Sindhi; the 92nd added four languages in 2003.",
  },

  /* ─────────── 41 · QUESTION ─────────── */
  41: {
    questext: "By which Constitutional Amendment was the name 'Oriya' replaced by 'Odia' in the Eighth Schedule?",
    options: ["92nd Amendment (2003)", "71st Amendment (1992)", "96th Amendment (2011)", "21st Amendment (1967)"],
    correct: "3",
    exptext: "✅ 96th Amendment (2011). 📌 It changed the spelling only; the language count stayed at 22. ❌ The other Amendments added languages.",
  },

  /* ─────────── 42 · CONCEPT PAGE — 9th Schedule ─────────── */
  42: {
    type: "concept",
    icon: "🛡️",
    accent: "#06b6d4",
    pauseTimer: true,
    title: "9th Schedule",
    html: `
<p class="cp-lead">The Ninth Schedule holds <b>“Validation of certain Acts and Regulations”</b> — a list of laws that were meant to be <u>protected from being struck down by courts</u>.</p>

<div class="cp-grid c2">
  <div class="cp-card blue"><div class="cp-card-title">Origin</div>Added by the <b>First Constitutional Amendment, 1951</b> through <b>Article 31B</b>, mainly to protect <u>land reform</u> laws.</div>
  <div class="cp-card green"><div class="cp-card-title">Idea</div>Land reform laws were being challenged as violating Fundamental Rights, so they were placed in a Schedule for protection.</div>
</div>

<div class="cp-divider">Judicial review today</div>

<div class="cp-vs">
  <div class="good"><h4>✅ Position today</h4>In <b>I.R. Coelho v. State of Tamil Nadu (2007)</b> the Supreme Court held that laws placed in the Ninth Schedule <u>after 24 April 1973</u> can be reviewed if they violate the <b>basic structure</b>.</div>
  <div class="bad"><h4>❌ Common mistake</h4>Believing that the Ninth Schedule gives <b>total</b> protection from the courts.</div>
</div>

<div class="cp-note trap"><b>Trap:</b> 24 April 1973 is the date of the <u>Kesavananda Bharati</u> judgment, but the case that decided the review question is <b>I.R. Coelho (2007)</b>.</div>
<div class="cp-note exam">Learn three things: <b>1951</b>, <b>Article 31B</b>, <b>I.R. Coelho (2007)</b>.</div>
<div class="cp-mnemonic"><b>9</b>th = the <b>first shield</b>: 1951 → Article 31B → land reforms → later reviewable (2007).</div>
`
  },

  /* ─────────── 43 · QUESTION ─────────── */
  43: {
    questext: "Which Schedule was added to the Constitution by the First Constitutional Amendment Act, 1951?",
    options: ["Ninth Schedule", "Tenth Schedule", "Eleventh Schedule", "Twelfth Schedule"],
    correct: "1",
    exptext: "✅ Ninth Schedule. 📌 First Amendment (1951) = Ninth Schedule = Article 31B = land reforms. ❌ The Tenth came in 1985; the Eleventh and Twelfth in 1992.",
  },

  /* ─────────── 44 · QUESTION ─────────── */
  44: {
    questext: "The Ninth Schedule was added mainly to protect which type of laws from court challenge?",
    options: ["Election laws", "Defence laws", "Tax laws", "Land reform laws"],
    correct: "4",
    exptext: "✅ Land reform laws. 📌 The aim was to carry out zamindari abolition and land redistribution smoothly. ❌ Election, defence and tax laws were not the purpose.",
  },

  /* ─────────── 45 · QUESTION ─────────── */
  45: {
    questext: "In which case did the Supreme Court hold that laws placed in the Ninth Schedule after 24 April 1973 are open to judicial review?",
    options: ["Kesavananda Bharati v. State of Kerala (1973)", "I.R. Coelho v. State of Tamil Nadu (2007)", "Minerva Mills v. Union of India (1980)", "Golaknath v. State of Punjab (1967)"],
    correct: "2",
    exptext: "✅ I.R. Coelho v. State of Tamil Nadu (2007). 📌 Laws violating the basic structure can be struck down even if they are in the Ninth Schedule. ❌ Kesavananda Bharati (1973) supplied the date, not this ruling.",
  },

  /* ─────────── 46 · QUESTION ─────────── */
  46: {
    questext: "Consider the statements: 1. The Ninth Schedule was part of the original Constitution of 1950. 2. Laws in the Ninth Schedule are completely immune from judicial review. Which of the statements is/are correct?",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "4",
    exptext: "✅ Neither 1 nor 2. 📌 The Ninth Schedule was added in 1951, and after I.R. Coelho (2007) its laws can be reviewed on the basic-structure test. ❌ Both statements are false.",
  },

  /* ─────────── 47 · CONCEPT PAGE — 10th Schedule ─────────── */
  47: {
    type: "concept",
    icon: "🚪",
    accent: "#a855f7",
    pauseTimer: true,
    title: "10th Schedule",
    html: `
<p class="cp-lead">Legislators who switch parties for power or money destabilise governments. The Tenth Schedule contains the <b>anti-defection law</b> — <u>provisions for disqualification on the ground of defection</u>.</p>

<div class="cp-grid c2">
  <div class="cp-card pink"><div class="cp-card-title">Introduced</div>By the <b>52nd Constitutional Amendment Act, 1985</b>.</div>
  <div class="cp-card blue"><div class="cp-card-title">Later</div>The <b>91st Amendment (2003)</b> removed the exemption for a <u>split</u> of one-third of a party's legislators. A <b>merger</b> is still allowed.</div>
</div>

<div class="cp-divider">When a member is disqualified</div>

<ol class="cp-steps">
  <li>He or she <b>voluntarily gives up</b> membership of the party.</li>
  <li>He or she votes or abstains <b>against the party whip</b> without permission.</li>
  <li>An <b>independent</b> member joins a party after the election.</li>
  <li>A <b>nominated</b> member joins a party after six months of taking a seat.</li>
</ol>

<div class="cp-note good"><b>Exception:</b> if <u>two-thirds</u> of the legislature party agree to <b>merge</b> with another party, those members are not disqualified.</div>
<div class="cp-note remember">The <b>Presiding Officer</b> (Speaker or Chairman) decides, and the courts can review the decision.</div>
<div class="cp-note trap"><b>Trap:</b> an <u>independent member who joins a party</u> is <b>disqualified</b>; it is not an exception.</div>
<div class="cp-mnemonic"><b>10</b> = “<b>T</b>en — <b>T</b>urncoat <b>T</b>est”: 52nd made the test, 91st took away the split door.</div>
`
  },

  /* ─────────── 48 · QUESTION ─────────── */
  48: {
    questext: "The anti-defection law, contained in the Tenth Schedule, was introduced by which Constitutional Amendment?",
    options: ["42nd Amendment (1976)", "61st Amendment (1989)", "52nd Amendment (1985)", "91st Amendment (2003)"],
    correct: "3",
    exptext: "✅ 52nd Amendment (1985). 📌 The 91st (2003) later refined it. ❌ The 42nd (1976) is the 'mini-Constitution'; the 61st lowered the voting age to 18.",
  },

  /* ─────────── 49 · QUESTION ─────────── */
  49: {
    questext: "What was the effect of the 91st Amendment (2003) on the anti-defection law?",
    options: ["It removed the exemption for a 'split' in a political party", "It inserted the Tenth Schedule", "It gave decisions on defection to the Election Commission", "It raised the merger requirement to three-fourths"],
    correct: "1",
    exptext: "✅ It removed the exemption for a split. 📌 Merger with the agreement of two-thirds of the legislature party is still protected. ❌ The Tenth Schedule was inserted in 1985, and the Presiding Officer still decides.",
  },

  /* ─────────── 50 · QUESTION ─────────── */
  50: {
    questext: "A merger of political parties protects the members from disqualification if at least what fraction of the legislature party agrees?",
    options: ["One-third", "One-half", "Three-fourths", "Two-thirds"],
    correct: "4",
    exptext: "✅ Two-thirds. 📌 One-third was the old 'split' rule, removed in 2003. ❌ One-half and three-fourths are not the legal thresholds.",
  },

  /* ─────────── 51 · QUESTION ─────────── */
  51: {
    questext: "Consider the statements about the Tenth Schedule: 1. An independent member who joins a political party after election is exempt from disqualification. 2. A member who votes against the party whip without permission can be disqualified. Which of the statements is/are correct?",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ 2 only. 📌 Defying the whip is a ground for disqualification. ❌ Statement 1 is wrong: an independent joining a party after election is disqualified.",
  },

  /* ─────────── 52 · CONCEPT PAGE — 11th Schedule ─────────── */
  52: {
    type: "concept",
    icon: "🏡",
    accent: "#e11d48",
    pauseTimer: true,
    title: "11th Schedule",
    html: `
<p class="cp-lead">The Eleventh Schedule is the <u>job list of village governments</u>: it lists the <b>29 subjects</b> over which <b>Panchayats</b> have powers, authority and responsibilities.</p>

<div class="cp-stats">
  <div class="cp-stat"><b>29</b><span>Subjects</span></div>
  <div class="cp-stat"><b>73rd</b><span>Amendment</span></div>
  <div class="cp-stat"><b>1992</b><span>Passed</span></div>
</div>

<div class="cp-grid c2">
  <div class="cp-card green"><div class="cp-card-title">Connected to</div>Part IX of the Constitution (Articles 243 to 243-O) on Panchayati Raj.</div>
  <div class="cp-card amber"><div class="cp-card-title">Examples of subjects</div>Agriculture, drinking water, rural housing, roads, primary education, minor irrigation, poverty alleviation.</div>
</div>

<div class="cp-note exam">Learn the pair: <b>Eleventh Schedule = Panchayats = 73rd Amendment = 29 subjects</b>.</div>
<div class="cp-note trap"><b>Trap:</b> do not mix with the <u>Twelfth Schedule</u> — that one is for Municipalities (18 subjects).</div>
<div class="cp-mnemonic">11 = “<b>11</b> players on a village field” → <b>P</b>anchayats, <b>P</b>layers of <b>29</b> subjects.</div>
`
  },

  /* ─────────── 53 · QUESTION ─────────── */
  53: {
    questext: "Which Schedule lists the subjects over which Panchayats have jurisdiction?",
    options: ["Twelfth Schedule", "Eleventh Schedule", "Seventh Schedule", "Sixth Schedule"],
    correct: "2",
    exptext: "✅ Eleventh Schedule. 📌 It relates to the 73rd Amendment Act (Panchayati Raj). ❌ The Twelfth Schedule relates to Municipalities.",
  },

  /* ─────────── 54 · QUESTION ─────────── */
  54: {
    questext: "The Eleventh Schedule was added to the Constitution by which Amendment Act?",
    options: ["74th Amendment Act, 1992", "42nd Amendment Act, 1976", "73rd Amendment Act, 1992", "44th Amendment Act, 1978"],
    correct: "3",
    exptext: "✅ 73rd Amendment Act, 1992. 📌 It gave constitutional status to Panchayati Raj. ❌ The 74th Amendment relates to Municipalities and the Twelfth Schedule.",
  },

  /* ─────────── 55 · QUESTION ─────────── */
  55: {
    questext: "How many subjects are listed in the Eleventh Schedule?",
    options: ["29", "18", "21", "34"],
    correct: "1",
    exptext: "✅ 29. 📌 Panchayats = 29 subjects. ❌ 18 is the number of subjects in the Twelfth Schedule (Municipalities).",
  },

  /* ─────────── 56 · CONCEPT PAGE — 12th Schedule ─────────── */
  56: {
    type: "concept",
    icon: "🏙️",
    accent: "#10b981",
    pauseTimer: true,
    title: "12th Schedule",
    html: `
<p class="cp-lead">The Twelfth Schedule is the <u>job list of city governments</u>: it lists the <b>18 subjects</b> over which <b>Municipalities</b> have powers, authority and responsibilities.</p>

<div class="cp-stats">
  <div class="cp-stat"><b>18</b><span>Subjects</span></div>
  <div class="cp-stat"><b>74th</b><span>Amendment</span></div>
  <div class="cp-stat"><b>1992</b><span>Passed</span></div>
</div>

<div class="cp-grid c2">
  <div class="cp-card teal"><div class="cp-card-title">Connected to</div>Part IX-A of the Constitution (Articles 243-P to 243-ZG) on Municipalities.</div>
  <div class="cp-card blue"><div class="cp-card-title">Examples of subjects</div>Urban planning, water supply, public health and sanitation, fire services, slum improvement, urban forestry.</div>
</div>

<div class="cp-vs">
  <div class="good"><h4>✅ 11th Schedule</h4>Panchayats · <b>29</b> subjects · <b>73rd</b> Amendment</div>
  <div class="bad"><h4>🏙️ 12th Schedule</h4>Municipalities · <b>18</b> subjects · <b>74th</b> Amendment</div>
</div>

<div class="cp-note trap"><b>Trap:</b> <u>Rural = 73rd = 11th = 29</u> and <u>Urban = 74th = 12th = 18</u>. A wrong pair usually swaps the numbers.</div>
<div class="cp-note exam">The pairing of <b>Schedule, local body, Amendment number and subject count</b> is the standard exam question.</div>
<div class="cp-mnemonic">The <b>bigger</b> number <b>29</b> goes with the <b>smaller</b> Amendment <b>73rd</b>; <b>18</b> goes with <b>74th</b>.</div>
`
  },

  /* ─────────── 57 · QUESTION ─────────── */
  57: {
    questext: "How many subjects are listed in the Twelfth Schedule over which Municipalities have jurisdiction?",
    options: ["29", "14", "22", "18"],
    correct: "4",
    exptext: "✅ 18. 📌 Municipalities = 18 subjects. ❌ 29 is for Panchayats (Eleventh Schedule); 22 is the number of languages in the Eighth Schedule.",
  },

  /* ─────────── 58 · QUESTION ─────────── */
  58: {
    questext: "The Twelfth Schedule was added to the Constitution by which Amendment Act?",
    options: ["73rd Amendment Act, 1992", "74th Amendment Act, 1992", "75th Amendment Act, 1994", "91st Amendment Act, 2003"],
    correct: "2",
    exptext: "✅ 74th Amendment Act, 1992. 📌 It gave constitutional status to urban local bodies. ❌ The 73rd Amendment relates to Panchayats and the Eleventh Schedule.",
  },

  /* ─────────── 59 · QUESTION ─────────── */
  59: {
    questext: "Which of the following pairs is correctly matched?",
    options: ["Twelfth Schedule – Municipalities – 29 subjects", "Eleventh Schedule – Municipalities – 18 subjects", "Eleventh Schedule – Panchayats – 29 subjects", "Twelfth Schedule – Panchayats – 18 subjects"],
    correct: "3",
    exptext: "✅ Eleventh Schedule – Panchayats – 29 subjects. 📌 Rural = 11th = 73rd = 29; Urban = 12th = 74th = 18. ❌ The other pairs swap the local body or the subject count.",
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     thumbnail.png → ENTRY 1 (class overview, "thumb" field) — not numbered
     1.png → "5. Schedules of Indian Constitution" page (timeline: 8 at adoption, then 9th, 10th, 11th, 12th added)
     2.png → "7th Schedule" page (three Lists: Union, State, Concurrent)
     3.png → "8th Schedule" page (growth of the list: 14 → 15 → 18 → 22 languages)

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name)
   images/thumbnail.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920x1080 px, ultra-sharp, vibrant cinematic 3D illustration in deep indigo, violet and electric-blue tones (accent #6366f1) with warm gold highlights. Dark edges and a bright soft glow behind the right-centre of the frame, where a teacher's photo will be placed later. Spread a few soft, glowing, slightly blurred decorative 3D elements around the frame, mostly behind the right side: an open antique book with glowing pages, a golden scale of justice, a gavel, and a few floating glossy scroll sheets. Keep the LEFT 62% of the frame calm, darker and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image. Clean, most beautiful, colorful, professional, high-contrast composition.
   images/1.png: Create a 16:9 image, 1200x675 px, clean flat vector diagram on a dark navy background. A horizontal timeline with thick lines and simple shapes: a large circle on the left labelled "1950" with the text "8 Schedules"; then three milestone circles labelled "1951 · 9th", "1985 · 10th", "1992 · 11th & 12th"; at the far right a large badge "12". Use VERY LARGE bold white and cyan English text, only these labels, thick lines, high contrast. No people, no logos, no watermarks.
   images/2.png: Create a 16:9 image, 1200x675 px, clean flat vector diagram on a dark navy background. Three big rounded boxes side by side with thick outlines: blue box labelled "UNION LIST" with the small text "Parliament", green box labelled "STATE LIST" with the small text "State Legislature", amber box labelled "CONCURRENT LIST" with the small text "Both". Above them a wide bar labelled "7th SCHEDULE". VERY LARGE bold white English text, only these labels, thick lines, simple shapes. No people, no logos, no watermarks.
   images/3.png: Create a 16:9 image, 1200x675 px, clean flat vector diagram on a dark navy background. Four ascending steps (staircase) with thick outlines, left to right labelled "14" with "1950", "15" with "1967", "18" with "1992", "22" with "2003", each step a different bright colour, and a title bar "8th SCHEDULE: LANGUAGES". VERY LARGE bold white English text, only these labels, thick lines, simple shapes. No people, no logos, no watermarks.
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   CHANGE LOG (corrections / additions made to the book's content — nothing of this is written as "updated" inside the pages)
   1. 2nd Schedule, Part C: the book says "Chairman/Vice Chairman of Rajya Sabha"; the correct post is "Deputy Chairman". Written in full as Speaker/Deputy Speaker (Lok Sabha and State Assemblies) and Chairman/Deputy Chairman (Rajya Sabha and State Councils).
   2. 2nd Schedule: added the trap that PM, Ministers and MPs salaries are fixed by Acts of Parliament, not by this Schedule.
   3. 3rd Schedule: added the persons covered (Union/State Ministers, candidates, members, Supreme Court/High Court judges, CAG) and that the oaths of the President (Art. 60) and Governor (Art. 159) are in the Articles.
   4. 1st Schedule: added the names of the 8 Union Territories and Articles 1, 3 and 4. Count 28 States + 8 UTs matches the book and is current.
   5. 4th Schedule: added 233 elected + 12 nominated = 245 (max 250) and the UTs with seats (Delhi, Puducherry, Jammu & Kashmir). VERIFY the 233 figure with the latest Rajya Sabha data.
   6. 5th/6th Schedules: added the role of President, Governor and Tribes Advisory Council (5th), Autonomous District Councils (6th), and the Nagaland/Manipur/Arunachal trap.
   7. 7th Schedule: added examples, Articles 246, 248 and 254, the 42nd Amendment shift of five subjects, and the commonly quoted counts (about 100 / 61 / 52). VERIFY the counts against the latest Lok Sabha/Rajya Sabha Secretariat list (the GST Amendment altered a few entries).
   8. 8th Schedule: added the original 14, the year-wise additions (21st, 71st, 92nd Amendments) and the full list of 22 with the spelling "Odia" (96th Amendment, 2011) instead of "Oriya".
   9. 9th Schedule: added 1st Amendment 1951, Article 31B and the I.R. Coelho (2007) position on judicial review.
   10. 10th Schedule: the book says it "followed latest developments by 91st amendment"; this is made specific — the 91st Amendment (2003) removed the one-third 'split' exemption; merger by two-thirds remains. Added the grounds of disqualification and the role of the Presiding Officer.
   11. 11th and 12th Schedules: added Part IX (Arts. 243–243-O) and Part IX-A (Arts. 243-P–243-ZG) and example subjects.
   12. Not used (out of scope): the Parts XVI–XXII list, the Article 370 declaration box, the sentence "during the succeeding sixty-five years", and section "6. Special Features of Indian Constitution", which appear on the same PDF page.
   ════════════════════════════════════════════════════════════════ */
