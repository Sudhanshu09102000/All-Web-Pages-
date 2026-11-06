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
   CONSTITUTION: EVOLUTION, MAKING AND SOURCES — concept pages mixed in between questions
   Subject folder : Indian_Polity_and_Constitution
   Chapter        : Constitution_Evolution_Making_and_Sources
   Register it in portalData.js like any other test (name: "Constitution: Evolution, Making and Sources").
   Entry 1 is always the CLASS OVERVIEW page (what we will learn in this class).

   Written in the order shown to the learner:
       1: concept page   2: concept page   3: question …

   CONCEPT PAGE fields
     type       : "concept"                 (required)
     title      : "Charter Act of 1833"
     icon       : "🏛️"                       (emoji, optional)
     accent     : "#22c55e"                 (colour of this page, optional)
     pauseTimer : true                      (stops the exam clock while reading)
     html       : `...any HTML, text, <img>, tables...`

   🎬 YOUTUBE STUDIO (ENTRY 1 only): the chapter ICON on that page opens the studio (Thumbnail + YouTube Kit).
     thumb : { image, banner, line1, line2, line3, badge, ribbon, burst:"", mode:"creator" }
     yt    : { title, altTitles:[], description, tags:[] (join(", ") length = exactly 500), hashtags:[], pinnedComment,
               thumbText, communityPost, chapters, playlist }
     NOTE: export needs the site opened over http(s)://, not file:// (browser canvas rule).

   QUESTION fields:
     questext, options[4], correct:"1".."4", exptext

   Toolkit classes used inside html:
     cp-lead, cp-card (blue green amber red violet teal pink), cp-grid (c2 c3 c4), cp-note (tip trap trick remember info exam good),
     cp-example, cp-mnemonic, cp-vs, cp-stats / cp-stat, cp-chips, cp-timeline, details.cp-collapse, cp-divider, cp-fig, plain <table>
     EMPHASIS RULE: never use the brown cp-hl highlight. Emphasise key words with <u>underline</u> (and <b>bold</b>) only.

   🌐 TRANSLATION: automatic. Text is real HTML text; one sentence per element; emphasis with <b>, <u>, <i> only.
════════════════════════════════════════════════════════════════ */

window.TEST_DATA = {

  /* ─────────── 1 · CLASS OVERVIEW (opening summary page) ─────────── */
  1: {
    type: "concept",
    icon: "🎯",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",

    /* 🎬 tap the 🎯 icon on this page → thumbnail studio + YouTube kit */
    thumb: {
      "image": "images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/thumbnail.png",
      "banner": "ALL COMPETITIVE EXAMS 2026",
      "line1": "COMPLETE CLASS",
      "line2": "INDIAN CONSTITUTION",
      "line3": "EVOLUTION • MAKING • SOURCES",
      "badge": "FULL CLASS",
      "ribbon": "ACTS • COMMITTEES • SOURCES",
      "burst": "",
      "mode": "creator"
    },
    yt: {
      "title": "Indian Constitution: Evolution, Making & Sources | Polity for All Competitive Exams",
      "altTitles": [
            "Regulating Act 1773 to Independence Act 1947 in One Class | Indian Polity",
            "Constituent Assembly, Committees & Drafting Committee Explained | Indian Polity",
            "Sources of Indian Constitution Trick: Which Feature From Which Country?",
            "Indian Polity Full Class: Acts, Missions and Making of the Constitution | SSC UPSC"
      ],
      "description": "The history of the Indian Constitution is one of the most repeated topics in SSC, UPSC, Banking, Railways and Defence exams. In this full class you learn every Act, plan, committee and borrowed feature in simple language with tricks and practice.\n\n📌 IN THIS CLASS\n✅ Regulating Act 1773, Pitt's India Act 1784 and the Charter Acts of 1793, 1813, 1833 and 1853\n✅ Government of India Act 1858, Indian Councils Acts of 1861, 1892 and 1909\n✅ Montagu-Chelmsford Reforms and Dyarchy (1919), Simon Commission and Government of India Act 1935\n✅ Cripps Mission, Cabinet Mission, Mountbatten Plan and Indian Independence Act 1947\n✅ Interim Government of 1946 and the First Cabinet of free India\n✅ Constituent Assembly, its committees and chairmen, and the Drafting Committee\n✅ Adoption, commencement and Constitution Day\n✅ Sources of the Indian Constitution: which feature came from which country\n✅ Practice questions after every concept\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 What is a Constitution\n00:00 Acts before 1857 (Regulating Act to Charter Act 1853)\n00:00 Acts after 1857 (1858 to 1919)\n00:00 Simon Commission and Government of India Act 1935\n00:00 Cripps Mission, Cabinet Mission and Mountbatten Plan\n00:00 Independence Act, Interim Government and First Cabinet\n00:00 Constituent Assembly and its committees\n00:00 Drafting Committee, adoption and Constitution Day\n00:00 Sources of the Indian Constitution\n\n👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n#IndianPolity #Constitution #SSCCGL #UPSC",
      "tags": [
            "indian polity and constitution",
            "government of india act 1935",
            "polity mcq",
            "constitution sources trick",
            "constitution of india",
            "sources of indian constitution",
            "montagu chelmsford reforms",
            "cabinet mission plan",
            "polity for railways exams",
            "polity for defence exams",
            "morley minto reforms",
            "charter act 1833",
            "polity for ssc cgl",
            "polity lecture",
            "cripps mission 1942",
            "indian polity",
            "indian independence act 1947",
            "polity for banking exams",
            "static gk",
            "charter act 1853",
            "acts before independence",
            "polity full class"
      ],
      "hashtags": [
            "IndianPolity",
            "Constitution",
            "SSCCGL",
            "UPSC"
      ],
      "thumbText": "INDIAN CONSTITUTION: EVOLUTION, MAKING & SOURCES",
      "pinnedComment": "📌 Practice what you learned: solve the questions after each concept page, then write your score below. Which topic was hardest for you — the Acts, the committees or the sources of the Constitution? 👇",
      "communityPost": "📜 New class is live: Indian Constitution — Evolution, Making and Sources. All Acts, missions, committees and borrowed features in one class with practice questions for all competitive exams. Start with the overview and tell me your score! 🎯",
      "chapters": "00:00 Class overview\n00:00 What is a Constitution\n00:00 Acts before 1857 (Regulating Act to Charter Act 1853)\n00:00 Acts after 1857 (1858 to 1919)\n00:00 Simon Commission and Government of India Act 1935\n00:00 Cripps Mission, Cabinet Mission and Mountbatten Plan\n00:00 Independence Act, Interim Government and First Cabinet\n00:00 Constituent Assembly and its committees\n00:00 Drafting Committee, adoption and Constitution Day\n00:00 Sources of the Indian Constitution",
      "playlist": "Indian Polity and Constitution — Full Classes"
    },

    html: `
      <p class="cp-lead">Today's class tells the <u>full story of how our Constitution was made</u>: the British-era Acts, the missions and plans, the Constituent Assembly, and the <b>countries our Constitution borrowed from</b>. By the end you will <b>recall every Act, date, committee and source</b> with confidence.</p>
      <div class="cp-stats"><div class="cp-stat"><b>30</b><span>Concept pages</span></div><div class="cp-stat"><b>60+</b><span>Key facts</span></div><div class="cp-stat"><b>102</b><span>Practice questions</span></div><div class="cp-stat"><b>~2 hrs</b><span>Time needed</span></div></div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline"><li><b>Constitution — Meaning</b><br>What a Constitution is, and the key numbers of ours.</li><li><b>Acts before 1857</b><br>Regulating Act 1773, Pitt's India Act 1784, and the Charter Acts of 1793, 1813, 1833 and 1853.</li><li><b>Acts after 1857</b><br>1858, 1861, 1892, Morley-Minto 1909, 1915 and the Montagu-Chelmsford reforms of 1919.</li><li><b>Towards Independence</b><br>Simon Commission, Act of 1935, Cripps Mission, Cabinet Mission, Mountbatten Plan and the Independence Act, 1947.</li><li><b>Interim Government and First Cabinet</b><br>Who held which portfolio in 1946 and 1947.</li><li><b>Constituent Assembly</b><br>How it was formed, its committees and chairmen.</li><li><b>Drafting and adoption</b><br>Drafting Committee, key dates and Constitution Day.</li><li><b>Sources of the Constitution</b><br>Which feature came from which country.</li></ul>
      <div class="cp-divider">What you will be able to do</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">📜 Sequence the Acts</div>Put every Act and plan from 1773 to 1947 in the <b>correct order</b> and know its one big idea.</div><div class="cp-card amber"><div class="cp-card-title">🥇 Recall the ‘firsts’</div>First Governor-General, first Supreme Court, first Indian in the Executive Council and more.</div><div class="cp-card green"><div class="cp-card-title">👥 Master the Assembly</div>Know the committees, chairmen, members and the <b>dates</b> of adoption and enforcement.</div><div class="cp-card red"><div class="cp-card-title">🌍 Match the sources</div>Link each borrowed feature to its country, without confusion.</div></div>
      <div class="cp-note exam"><b>Why it matters:</b> questions on Acts, committees and sources appear almost every year in SSC, UPSC, Banking, Railways and Defence exams. This chapter is also the base for Fundamental Rights, DPSP and Amendments.</div>
      <div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages, so take your time.</div>
      <div class="cp-chips"><span>All competitive exams</span><span>Indian Polity</span><span>Constitution</span><span>High-yield</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE — Constitution — Meaning and Our Constitution ─────────── */
  2: {
    type: "concept",
    icon: "📜",
    accent: "#22c55e",
    pauseTimer: true,
    title: "Constitution — Meaning and Our Constitution",
    html: `
      <p class="cp-lead">A <b>Constitution</b> is the <u>foundational law</u> of a country. It lays down the basic principles on which the government is run, the main organs of the government and their functions, and how the government deals with its citizens.</p>
      <div class="cp-stats"><div class="cp-stat"><b>22</b><span>Parts (original)</span></div><div class="cp-stat"><b>395</b><span>Articles (original)</span></div><div class="cp-stat"><b>8</b><span>Schedules (original)</span></div><div class="cp-stat"><b>1950</b><span>In force</span></div></div>
      <div class="cp-divider">What a Constitution does</div>
      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">🏛️ Sets the framework</div>It names the organs of government (Legislature, Executive, Judiciary) and defines what each can do.</div><div class="cp-card green"><div class="cp-card-title">🤝 Links state and citizen</div>It decides how the government and the people deal with each other, including rights and duties.</div><div class="cp-card amber"><div class="cp-card-title">📐 Gives basic principles</div>It states the fundamental principles on which the governance of the country rests.</div></div>
      <div class="cp-divider">Our Constitution</div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Written or unwritten?</td><td><b>Written</b> and elaborate (the United Kingdom is the main democracy <u>without</u> a written constitution)</td></tr><tr><td>Made by</td><td>A <b>Constituent Assembly</b> set up specially for the purpose</td></tr><tr><td>Adopted</td><td><b>26 November 1949</b></td></tr><tr><td>Came into force</td><td><b>26 January 1950</b></td></tr><tr><td>Original size</td><td>22 Parts, 395 Articles, 8 Schedules</td></tr><tr><td>Present size</td><td>25 Parts and 12 Schedules (about 448 Articles), because of amendments</td></tr></tbody></table>
      <div class="cp-note info">Ancient Indian systems are reflected in the Constitution, but its <b>direct sources</b> lie in the <u>administrative and legislative developments of the British period</u>. That is why we study the British-era Acts next.</div>
      <div class="cp-note trap"><b>Adopted ≠ In force.</b> The Constitution was adopted on 26 <u>November</u> 1949 but came into full operation on 26 <u>January</u> 1950.</div>
      <div class="cp-mnemonic">Adopted in <b>Nov</b>, in force in <b>Jan</b> — the date is 26 both times.</div>
      <div class="cp-chips"><span>Polity</span><span>Constitution</span><span>Basics</span></div>
    `
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "Which of the following democratic countries does NOT have a written constitution?",
    options: ["United States of America", "United Kingdom", "Canada", "Australia"],
    correct: "2",
    exptext: "✅ The United Kingdom has an unwritten (uncodified) constitution. 📌 Almost every democratic country, including India, has a written constitution. ❌ USA, Canada and Australia all have written constitutions."
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "The Constitution of India, as originally adopted, had how many Parts, Articles and Schedules?",
    options: ["22 Parts, 395 Articles, 8 Schedules", "25 Parts, 448 Articles, 12 Schedules", "22 Parts, 395 Articles, 12 Schedules", "20 Parts, 360 Articles, 9 Schedules"],
    correct: "1",
    exptext: "✅ The original text had 22 Parts, 395 Articles and 8 Schedules. 📌 Today it has 25 Parts and 12 Schedules because of amendments. ❌ The second option is the present size, not the original; the others mix numbers."
  },

  /* ─────────── 5 · QUESTION ─────────── */
  5: {
    questext: "On which date was the Constitution of India adopted by the Constituent Assembly?",
    options: ["26 January 1950", "15 August 1947", "9 December 1946", "26 November 1949"],
    correct: "4",
    exptext: "✅ The Constituent Assembly adopted the Constitution on 26 November 1949. 📌 26 January 1950 is the date of commencement; 9 December 1946 is the first meeting of the Assembly. ❌ 15 August 1947 is Independence Day, not the adoption date."
  },

  /* ─────────── 6 · CONCEPT PAGE — Administrative & Legislative Reforms Before 1857 ─────────── */
  6: {
    type: "concept",
    icon: "🕰️",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "Administrative & Legislative Reforms Before 1857",
    html: `
      <p class="cp-lead">Before 1857 the East India Company ruled large parts of India. Step by step, the <u>British Parliament tightened its control</u> through the Regulating Act and four Charter Acts. This is the roadmap for the next six pages.</p>
      <table><thead><tr><th>Act</th><th>Year</th><th>One-line idea</th></tr></thead><tbody><tr><td>Regulating Act</td><td>1773</td><td>First Parliamentary control; Governor-General of Bengal; Supreme Court at Calcutta</td></tr><tr><td>Pitt's India Act</td><td>1784</td><td>Board of Control for politics; Court of Directors for trade</td></tr><tr><td>Charter Act</td><td>1793</td><td>Earlier provisions consolidated; Board salaries from Indian revenue</td></tr><tr><td>Charter Act</td><td>1813</td><td>Company's trade monopoly ended; missionaries allowed</td></tr><tr><td>Charter Act</td><td>1833</td><td>Governor-General of India; Law Commission; centralised legislation</td></tr><tr><td>Charter Act</td><td>1853</td><td>Last Charter Act; competitive exams; legislative functions separated</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/1.png" alt="Timeline of Acts from 1773 to 1853" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap"><b>Regulating Act (1773) vs Pitt's India Act (1784)</b> are often swapped. Remember: 1773 = first Governor-General and Supreme Court; 1784 = Board of Control.</div>
      <div class="cp-note trick">The four Charter Acts come every <b>20 years</b>: <b>1793, 1813, 1833, 1853</b>.</div>
      <div class="cp-mnemonic"><b>93</b> Salary, <b>13</b> Monopoly ends, <b>33</b> Centralisation, <b>53</b> Competition.</div>
      <div class="cp-chips"><span>Before 1857</span><span>Company rule</span><span>Charter Acts</span></div>
    `
  },

  /* ─────────── 7 · CONCEPT PAGE — Regulating Act of 1773 ─────────── */
  7: {
    type: "concept",
    icon: "⚖️",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Regulating Act of 1773",
    html: `
      <p class="cp-lead">The <b>Regulating Act, 1773</b> was the <u>first step</u> taken by the British Parliament to control the East India Company. It followed the work of a committee under the government of Prime Minister <b>Lord North</b>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1773</b><span>Year</span></div><div class="cp-stat"><b>1774</b><span>Supreme Court</span></div><div class="cp-stat"><b>1st</b><span>Warren Hastings</span></div><div class="cp-stat"><b>4</b><span>Judges in all</span></div></div>
      <div class="cp-divider">Key provisions</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">👑 Governor-General</div>The Governor of Bengal became <b>Governor-General</b> for all three Presidencies of Calcutta, Bombay and Madras. <b>Warren Hastings</b> was the first one.</div><div class="cp-card green"><div class="cp-card-title">🏛️ Supreme Court, Calcutta</div>Set up in <b>1774</b>. <b>Sir Elijah Impey</b> was the first Chief Justice; the other 3 judges were Chambers, Lemaistre and Hyde.</div><div class="cp-card amber"><div class="cp-card-title">🇬🇧 Parliamentary control</div>The governance of the Company was put under <u>British parliamentary control</u>.</div><div class="cp-card violet"><div class="cp-card-title">📜 Rule-making</div>The Governor-General was empowered to make rules, regulations and ordinances with the consent of the Supreme Court.</div></div>
      <div class="cp-note trap">The Supreme Court of <b>1774</b> at Calcutta is <u>not</u> the Supreme Court of India, which started only in 1950.</div>
      <div class="cp-note exam">Favourite “first” facts: <b>first Governor-General</b> (Warren Hastings), <b>first Supreme Court</b> (Calcutta, 1774), <b>first Chief Justice</b> (Elijah Impey).</div>
      <div class="cp-mnemonic"><b>Regulating</b> = <b>R</b>ules from Parliament: <b>G</b>overnor-General + <b>S</b>upreme Court (G-S).</div>
      <div class="cp-chips"><span>1773</span><span>Warren Hastings</span><span>Supreme Court 1774</span></div>
    `
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "The Governor of Bengal was made the Governor-General of Bengal, with control over all three Presidencies, by which Act?",
    options: ["Pitt's India Act, 1784", "Charter Act, 1793", "Regulating Act, 1773", "Charter Act, 1833"],
    correct: "3",
    exptext: "✅ The Regulating Act of 1773 created the post of Governor-General of Bengal. 📌 It was the first Act by which Parliament regulated Company rule. ❌ In 1784 the Board of Control was created, and in 1833 the post became Governor-General of India."
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "Who was the first Governor-General of Bengal under the Regulating Act of 1773?",
    options: ["Lord Cornwallis", "Warren Hastings", "Robert Clive", "William Bentinck"],
    correct: "2",
    exptext: "✅ Warren Hastings held the post first. 📌 Bentinck was the first Governor-General of India (1833 Act). ❌ Cornwallis came later and Clive was a Company officer before 1773."
  },

  /* ─────────── 10 · QUESTION ─────────── */
  10: {
    questext: "A Supreme Court was established at Calcutta in which year?",
    options: ["1774", "1773", "1784", "1793"],
    correct: "1",
    exptext: "✅ The Regulating Act was passed in 1773, and the Court began in 1774. 📌 Remember: Act = 1773, Court = 1774. ❌ 1784 and 1793 are the years of Pitt's India Act and the Charter Act."
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "Who was the first Chief Justice of the Supreme Court at Calcutta?",
    options: ["Robert Chambers", "John Hyde", "Lord Macaulay", "Sir Elijah Impey"],
    correct: "4",
    exptext: "✅ Sir Elijah Impey was the first Chief Justice. 📌 Chambers, Lemaistre and Hyde were the other judges. ❌ Macaulay is linked to the Law Commission of 1833, not the Supreme Court."
  },

  /* ─────────── 12 · QUESTION ─────────── */
  12: {
    questext: "Which of the following was NOT a provision of the Regulating Act of 1773?",
    options: ["A Supreme Court was set up at Calcutta", "The Governor of Bengal became Governor-General", "A six-member Board of Control to manage political affairs", "Company rule came under Parliamentary control"],
    correct: "3",
    exptext: "✅ The Board of Control belongs to Pitt's India Act of 1784. 📌 1773 = Governor-General + Supreme Court; 1784 = Board of Control. ❌ The other three are real provisions of the 1773 Act."
  },

  /* ─────────── 13 · QUESTION ─────────── */
  13: {
    questext: "Consider the statements about the Regulating Act, 1773. 1. It was the first step by Parliament to control the Company. 2. It set up a Supreme Court at Calcutta. 3. It ended the Company's trade monopoly. Which are correct?",
    options: ["1 only", "2 and 3 only", "1 and 2 only", "1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 The trade monopoly ended only with the Charter Act of 1813. ❌ Statement 3 is wrong, so the options with 3 are out."
  },

  /* ─────────── 14 · CONCEPT PAGE — Pitt's India Act of 1784 ─────────── */
  14: {
    type: "concept",
    icon: "🏦",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Pitt's India Act of 1784",
    html: `
      <p class="cp-lead"><b>Pitt's India Act, 1784</b> was passed to <u>improve the Regulating Act of 1773</u> and bring better discipline to the Company's administration. It created a <b>dual system</b> of control.</p>
      <div class="cp-divider">Who controlled what?</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🏛️ Board of Control</div>A <b>6-member</b> Board headed by a minister of the British Government. All <u>political</u> responsibilities were given to it.</div><div class="cp-card amber"><div class="cp-card-title">💼 Court of Directors</div>The Company's directors looked after <u>trade and commerce</u> issues only.</div></div>
      <div class="cp-note info">The provincial governments (Presidencies) had to follow the instructions of the Central Government in Bengal, which strengthened the Governor-General's control.</div>
      <div class="cp-note trap">Do not mix up: <b>Board of Control = politics</b>, <b>Court of Directors = trade</b>.</div>
      <div class="cp-note exam">Pitt's Act made the <u>British Government</u> the real master of political affairs. This is the first time politics and trade were separated.</div>
      <div class="cp-mnemonic"><b>B</b>oard = <b>B</b>oss of politics; <b>D</b>irectors = <b>D</b>ealers of trade.</div>
      <div class="cp-chips"><span>1784</span><span>Board of Control</span><span>Dual system</span></div>
    `
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "Under Pitt's India Act of 1784, political affairs of the Company were placed under which body?",
    options: ["Board of Control", "Court of Directors", "Supreme Court at Calcutta", "Council of India"],
    correct: "1",
    exptext: "✅ The Board of Control looked after political matters. 📌 The Court of Directors handled only trade and commerce. ❌ The Council of India was created only in 1858."
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "How many members did the Board of Control created by Pitt's India Act have?",
    options: ["4", "12", "15", "6"],
    correct: "4",
    exptext: "✅ The Board of Control had 6 members, headed by a British minister. 📌 15 is the size of the Council of India set up in 1858. ❌ 4 and 12 are not linked with this Board."
  },

  /* ─────────── 17 · QUESTION ─────────── */
  17: {
    questext: "Pitt's India Act of 1784 was passed mainly to:",
    options: ["End the trade monopoly of the Company", "Improve the Regulating Act and bring better discipline in Company administration", "Abolish the Company and transfer rule to the Crown", "Introduce provincial autonomy"],
    correct: "2",
    exptext: "✅ It improved the 1773 Act and tightened discipline. 📌 Transfer to the Crown came only through the Act of 1858. ❌ Monopoly ended in 1813 and provincial autonomy came in 1935."
  },

  /* ─────────── 18 · CONCEPT PAGE — Charter Act of 1793 ─────────── */
  18: {
    type: "concept",
    icon: "📑",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Charter Act of 1793",
    html: `
      <p class="cp-lead">The <b>Charter Act, 1793</b> was mainly a <u>consolidation</u> Act. It gathered the main provisions of the earlier Acts in one place.</p>
      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">📚 Consolidation</div>Main provisions of the previous Acts were put together.</div><div class="cp-card green"><div class="cp-card-title">💰 Salaries</div>Salaries of the members of the Board of Control were paid from <b>Indian revenue</b>.</div><div class="cp-card violet"><div class="cp-card-title">⚖️ Courts</div>Courts were given the power to interpret rules and regulations.</div></div>
      <div class="cp-note exam">Remember the <u>salary</u> point: the Indian taxpayer paid for the British Board of Control.</div>
      <div class="cp-mnemonic"><b>93</b> = <b>S</b>alary of the Board from India.</div>
      <div class="cp-chips"><span>1793</span><span>Consolidation</span><span>Board salaries</span></div>
    `
  },

  /* ─────────── 19 · QUESTION ─────────── */
  19: {
    questext: "Under the Charter Act of 1793, the salaries of the members of the Board of Control were to be paid from:",
    options: ["The British Treasury", "The Company's profits in Britain", "Indian revenue", "Donations from Indian princes"],
    correct: "3",
    exptext: "✅ The Act placed the cost on Indian revenue. 📌 Think: 1793 = salary. ❌ The other sources were never provided by the Act."
  },

  /* ─────────── 20 · QUESTION ─────────── */
  20: {
    questext: "Arrange these in the correct chronological order: 1. Pitt's India Act 2. Regulating Act 3. Charter Act of 1793 4. Government of India Act, 1858.",
    options: ["2, 1, 3, 4", "1, 2, 3, 4", "2, 3, 1, 4", "1, 3, 2, 4"],
    correct: "1",
    exptext: "✅ Order: Regulating Act (1773), Pitt's Act (1784), Charter Act (1793), Government of India Act (1858). 📌 Years: 1773, 1784, 1793, 1858. ❌ Options starting with Pitt's Act wrongly place it before 1773."
  },

  /* ─────────── 21 · CONCEPT PAGE — Charter Act of 1813 ─────────── */
  21: {
    type: "concept",
    icon: "⛪",
    accent: "#ec4899",
    pauseTimer: true,
    title: "Charter Act of 1813",
    html: `
      <p class="cp-lead">The <b>Charter Act, 1813</b> ended the Company's <u>monopoly of trade</u> in India and opened the door for other British traders and missionaries.</p>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">🛒 Trade monopoly ends</div>The Company's trade monopoly in India came to an end. The Company kept its tea and China trade monopoly.</div><div class="cp-card violet"><div class="cp-card-title">✝️ Missionaries</div>Christian missionaries were allowed to spread their religion in India.</div><div class="cp-card blue"><div class="cp-card-title">🏛️ Councils</div>Powers of the Councils of Madras, Bombay and Calcutta were enlarged, and they came under greater control of the British Parliament.</div><div class="cp-card green"><div class="cp-card-title">💷 Taxes</div>Local autonomous bodies were empowered to levy taxes.</div></div>
      <div class="cp-note trap">The monopoly ended in <b>India trade</b>, but the <u>tea and China trade</u> monopoly stayed with the Company.</div>
      <div class="cp-note exam">Two famous points of 1813: <b>monopoly ends</b> and <b>missionaries allowed</b>.</div>
      <div class="cp-mnemonic"><b>13</b> = <b>M</b>onopoly ends and <b>M</b>issionaries enter.</div>
      <div class="cp-chips"><span>1813</span><span>Monopoly ends</span><span>Missionaries</span></div>
    `
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "Which Charter Act ended the trade monopoly of the East India Company in India?",
    options: ["Charter Act of 1793", "Charter Act of 1833", "Charter Act of 1853", "Charter Act of 1813"],
    correct: "4",
    exptext: "✅ The Act of 1813 ended the Company's trade monopoly in India. 📌 1833 ended its commercial functions altogether. ❌ 1793 only consolidated earlier laws and 1853 introduced competitive exams."
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "Christian missionaries were permitted to spread their religion in India by which Act?",
    options: ["Regulating Act of 1773", "Charter Act of 1813", "Pitt's India Act of 1784", "Government of India Act, 1858"],
    correct: "2",
    exptext: "✅ The Charter Act of 1813 allowed missionaries. 📌 13 = Monopoly ends and Missionaries. ❌ The other Acts do not have this provision."
  },

  /* ─────────── 24 · QUESTION ─────────── */
  24: {
    questext: "Which of the following was NOT a provision of the Charter Act of 1813?",
    options: ["Company's trade monopoly in India ended", "Missionaries were allowed to preach in India", "The Company's monopoly over tea and China trade was ended", "Local bodies could levy taxes"],
    correct: "3",
    exptext: "✅ The tea and China monopoly continued, so this statement is false. 📌 Only the India trade monopoly ended in 1813. ❌ The other three are true provisions of 1813."
  },

  /* ─────────── 25 · CONCEPT PAGE — Charter Act of 1833 ─────────── */
  25: {
    type: "concept",
    icon: "🏛️",
    accent: "#3b82f6",
    pauseTimer: true,
    title: "Charter Act of 1833",
    html: `
      <p class="cp-lead">The <b>Charter Act, 1833</b> made the Company an <u>administrative body</u> and <u>centralised</u> power in the Governor-General.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1st</b><span>Gov-Gen of India: Bentinck</span></div><div class="cp-stat"><b>1</b><span>Single budget</span></div><div class="cp-stat"><b>1843</b><span>Slavery abolished</span></div><div class="cp-stat"><b>Law</b><span>Commission set up</span></div></div>
      <div class="cp-divider">Key provisions</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">👑 Governor-General of India</div>The Governor-General of Bengal became the <b>Governor-General of India</b>. The Government was for the first time called the <u>‘Government of India’</u> and his Council the ‘Indian Council’.</div><div class="cp-card green"><div class="cp-card-title">📜 Law Commission</div>A Law Commission was set up to consolidate and codify Indian laws. <b>Lord Macaulay</b> was its first Chairman.</div><div class="cp-card amber"><div class="cp-card-title">💰 Single budget</div>The Council got full powers over revenue, and a <u>single budget</u> for the country was prepared by the Governor-General.</div><div class="cp-card red"><div class="cp-card-title">⛓️ Slavery</div>Slavery was declared illegal, and was actually abolished in <b>1843</b>.</div></div>
      <div class="cp-note exam">The Company was reduced to an <b>administrative and political body</b>. Its commercial work ended. The Council could legislate for the whole of India, subject to the approval of the Board of Control.</div>
      <div class="cp-note info">The Act also said that no Indian could be barred from office only on the ground of religion, birth or descent.</div>
      <div class="cp-mnemonic"><b>33</b> = <b>C</b>entralisation: one Governor-General, one budget, one law-making Council.</div>
      <div class="cp-chips"><span>1833</span><span>Bentinck</span><span>Law Commission</span><span>Macaulay</span></div>
    `
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "Who became the first Governor-General of India under the Charter Act of 1833?",
    options: ["Lord William Bentinck", "Warren Hastings", "Lord Canning", "Lord Dalhousie"],
    correct: "1",
    exptext: "✅ Bentinck was the first Governor-General of India. 📌 Warren Hastings was the first Governor-General of Bengal; Canning was the first Viceroy. ❌ Dalhousie served later, in the 1850s."
  },

  /* ─────────── 27 · QUESTION ─────────── */
  27: {
    questext: "By which Act did the East India Company lose its commercial functions and become a purely administrative body?",
    options: ["Charter Act of 1813", "Charter Act of 1853", "Regulating Act of 1773", "Charter Act of 1833"],
    correct: "4",
    exptext: "✅ The 1833 Act ended commercial functions. 📌 1813 ended the India trade monopoly; 1833 ended commercial work completely. ❌ 1853 introduced competitive exams."
  },

  /* ─────────── 28 · QUESTION ─────────── */
  28: {
    questext: "Who was the Chairman of the First Law Commission established under the Charter Act of 1833?",
    options: ["Warren Hastings", "Lord Macaulay", "William Bentinck", "Sir Elijah Impey"],
    correct: "2",
    exptext: "✅ Lord Macaulay chaired the first Law Commission. 📌 Macaulay is also known for codifying Indian laws. ❌ Impey was the first Chief Justice of 1774 and Bentinck the Governor-General."
  },

  /* ─────────── 29 · QUESTION ─────────── */
  29: {
    questext: "Consider the Charter Act of 1833. 1. The legislative power was centralised in the Governor-General's Council. 2. A single budget was prepared for the country. 3. Entry to civil services was made through competitive examinations. Which are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Competitive exams came with the Charter Act of 1853. ❌ Statement 3 is wrong, so options with 3 fail."
  },

  /* ─────────── 30 · QUESTION ─────────── */
  30: {
    questext: "Slavery in India was declared illegal under the Charter Act of 1833 and was actually abolished in which year?",
    options: ["1833", "1843", "1853", "1858"],
    correct: "2",
    exptext: "✅ Slavery was formally abolished in 1843. 📌 The Act declared it illegal; the abolition came ten years later. ❌ 1833 is the Act year, not the abolition year."
  },

  /* ─────────── 31 · CONCEPT PAGE — Charter Act of 1853 ─────────── */
  31: {
    type: "concept",
    icon: "🎓",
    accent: "#f97316",
    pauseTimer: true,
    title: "Charter Act of 1853",
    html: `
      <p class="cp-lead">The <b>Charter Act, 1853</b> was the <u>last of the Charter Acts</u>. It made important changes in the system of Indian legislation and in recruitment.</p>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🧑‍⚖️ Separate functions</div><u>Legislative and administrative functions</u> of the Council were separately identified.</div><div class="cp-card green"><div class="cp-card-title">📝 Competitive exams</div>Recruitment of the Company's employees was to be done through <b>competitive examinations</b>.</div><div class="cp-card amber"><div class="cp-card-title">📍 Bengal</div>A separate Governor (Lieutenant Governor) was to be appointed for Bengal.</div><div class="cp-card red"><div class="cp-card-title">⏳ End of Company</div>Parliament could end the Company's rule at any suitable time. It did so in 1858.</div></div>
      <div class="cp-note exam">Remember the 1853 keyword: <b>Competition</b>. Merit-based entry into the civil service began here.</div>
      <div class="cp-note trap">1853 did <u>not</u> end the Company. The Company's rule ended in <b>1858</b>.</div>
      <div class="cp-mnemonic"><b>53</b> = <b>C</b>ompetition, the last <b>C</b>harter.</div>
      <div class="cp-chips"><span>1853</span><span>Last Charter Act</span><span>Competitive exams</span></div>
    `
  },

  /* ─────────── 32 · QUESTION ─────────── */
  32: {
    questext: "Open competitive examinations for recruitment to the Company's services were introduced by which Act?",
    options: ["Charter Act of 1813", "Charter Act of 1833", "Government of India Act, 1858", "Charter Act of 1853"],
    correct: "4",
    exptext: "✅ The 1853 Act introduced competitive exams. 📌 53 = Competition. ❌ The 1833 Act focused on centralisation, and the 1858 Act on Crown rule."
  },

  /* ─────────── 33 · QUESTION ─────────── */
  33: {
    questext: "Which of the following was the last of the Charter Acts?",
    options: ["Charter Act of 1833", "Government of India Act, 1858", "Charter Act of 1853", "Charter Act of 1813"],
    correct: "3",
    exptext: "✅ The Act of 1853 was the last Charter Act. 📌 The Government of India Act, 1858 is not a Charter Act; it transferred rule to the Crown. ❌ 1813 and 1833 came before 1853."
  },

  /* ─────────── 34 · QUESTION ─────────── */
  34: {
    questext: "Which of the following was NOT done by the Charter Act of 1853?",
    options: ["It separated legislative and administrative functions of the Council", "It ended the rule of the Company and transferred it to the Crown", "It introduced competitive exams for recruitment", "It provided for a separate Governor for Bengal"],
    correct: "2",
    exptext: "✅ The transfer to the Crown happened in 1858, not 1853. 📌 1853 only empowered Parliament to end Company rule at any time. ❌ The other three are real provisions of the 1853 Act."
  },

  /* ─────────── 35 · CONCEPT PAGE — Administrative & Legislative Reforms After 1857 ─────────── */
  35: {
    type: "concept",
    icon: "🗺️",
    accent: "#84cc16",
    pauseTimer: true,
    title: "Administrative & Legislative Reforms After 1857",
    html: `
      <p class="cp-lead">After the <u>Revolt of 1857</u>, the British Crown took direct control. From then on, each Act slowly gave Indians a little more share in law-making, ending in the big federal plan of 1935.</p>
      <table><thead><tr><th>Act / Plan</th><th>Year</th><th>One-line idea</th></tr></thead><tbody><tr><td>Government of India Act</td><td>1858</td><td>Crown rule; Secretary of State; Council of India</td></tr><tr><td>Indian Councils Act</td><td>1861</td><td>Indians nominated to the Legislative Council; portfolio system</td></tr><tr><td>Indian Councils Act</td><td>1892</td><td>Right to discuss the budget and ask questions</td></tr><tr><td>Morley-Minto Reforms</td><td>1909</td><td>Separate electorate for Muslims; first Indian in Executive Council</td></tr><tr><td>Government of India Act</td><td>1915</td><td>Consolidation of earlier Acts</td></tr><tr><td>Montagu-Chelmsford Reforms</td><td>1919</td><td>Dyarchy in provinces; bicameral Centre</td></tr><tr><td>Government of India Act</td><td>1935</td><td>Federation plan; provincial autonomy; three lists</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/2.png" alt="Timeline of Acts from 1858 to 1935" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Questions often ask <b>“which Act first…”</b>: first Crown rule (1858), first Indians nominated (1861), first communal electorate (1909), first women's vote and first dyarchy (1919).</div>
      <div class="cp-mnemonic"><b>58</b> Crown, <b>61</b> Indians, <b>92</b> Questions, <b>09</b> Muslims, <b>19</b> Dyarchy, <b>35</b> Federation.</div>
      <div class="cp-chips"><span>After 1857</span><span>Crown rule</span><span>Reforms</span></div>
    `
  },

  /* ─────────── 36 · CONCEPT PAGE — Government of India Act, 1858 ─────────── */
  36: {
    type: "concept",
    icon: "👑",
    accent: "#06b6d4",
    pauseTimer: true,
    title: "Government of India Act, 1858",
    html: `
      <p class="cp-lead">After the <b>Revolt of 1857</b> (called a sepoy mutiny by British writers and the First War of Independence by Indians), the British Crown took over sovereignty from the East India Company. The <b>Government of India Act, 1858</b> was the <u>first Act</u> for the direct rule of India by the British Government.</p>
      <div class="cp-divider">Key provisions</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🏛️ Secretary of State</div>The powers of the Crown were exercised by the <b>Secretary of State for India</b>, who was responsible to the British Parliament.</div><div class="cp-card green"><div class="cp-card-title">👥 Council of India</div>He was assisted by a council of <b>15 members</b>, the Council of India.</div><div class="cp-card amber"><div class="cp-card-title">🗺️ Provinces</div>The country was divided into provinces headed by a Governor or Lieutenant Governor, aided by an Executive Council.</div><div class="cp-card red"><div class="cp-card-title">🔒 Control</div>All authority was vested in the Governor-General-in-Council, who was responsible to the Secretary of State. The provinces worked under his superintendence and control.</div></div>
      <div class="cp-note info">The Governor-General now also became the <b>Viceroy</b>, the Crown's representative. <b>Lord Canning</b> was the first Viceroy. The old Board of Control and Court of Directors were abolished.</div>
      <div class="cp-note exam">The Act gave <u>absolute imperial control</u> with <u>no popular participation</u> of Indians in administration.</div>
      <div class="cp-mnemonic"><b>58</b> = Company out, <b>C</b>rown in; <b>S</b>ecretary of State + <b>15</b> in Council.</div>
      <div class="cp-chips"><span>1858</span><span>Crown rule</span><span>Secretary of State</span><span>Lord Canning</span></div>
    `
  },

  /* ─────────── 37 · QUESTION ─────────── */
  37: {
    questext: "Which Act transferred the governance of India from the East India Company to the British Crown?",
    options: ["Government of India Act, 1858", "Charter Act of 1853", "Indian Councils Act, 1861", "Government of India Act, 1919"],
    correct: "1",
    exptext: "✅ The 1858 Act ended Company rule after the Revolt of 1857. 📌 It created the Secretary of State for India. ❌ 1853 did not end the Company, and 1861 was a later reform."
  },

  /* ─────────── 38 · QUESTION ─────────── */
  38: {
    questext: "How many members were there in the Council of India that assisted the Secretary of State under the Government of India Act, 1858?",
    options: ["6", "12", "60", "15"],
    correct: "4",
    exptext: "✅ The Council of India had 15 members. 📌 6 was the size of the Board of Control in 1784, and 60 is the size of the Council of State in 1919. ❌ 12 is not linked with this Council."
  },

  /* ─────────── 39 · QUESTION ─────────── */
  39: {
    questext: "Who was the first Viceroy of India?",
    options: ["Lord Dalhousie", "Lord Minto", "Lord Canning", "Lord Chelmsford"],
    correct: "3",
    exptext: "✅ Lord Canning became the first Viceroy after the 1858 Act. 📌 Governor-General was also called the Viceroy from 1858. ❌ Dalhousie was the last Governor-General; Minto and Chelmsford came later."
  },

  /* ─────────── 40 · QUESTION ─────────── */
  40: {
    questext: "Under the Government of India Act, 1858, the powers of the Crown over India were exercised by:",
    options: ["Governor-General of Bengal", "Secretary of State for India", "Court of Directors", "Prime Minister of Britain"],
    correct: "2",
    exptext: "✅ The Secretary of State for India exercised Crown powers, with the Council of India to help. 📌 The Secretary of State was responsible to the British Parliament. ❌ The Court of Directors was abolished in 1858."
  },

  /* ─────────── 41 · CONCEPT PAGE — Indian Councils Act, 1861 ─────────── */
  41: {
    type: "concept",
    icon: "🗳️",
    accent: "#a855f7",
    pauseTimer: true,
    title: "Indian Councils Act, 1861",
    html: `
      <p class="cp-lead">The <b>Indian Councils Act, 1861</b> is an important <u>landmark</u>. For the first time, Indians were associated with law-making, though only by <b>nomination</b>.</p>
      <div class="cp-divider">Key provisions</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🧑‍🤝‍🧑 Indians nominated</div>The Governor-General could <u>nominate Indian representatives</u> to his expanded council for legislative work.</div><div class="cp-card green"><div class="cp-card-title">➕ Non-official members</div>Certain additional non-official members joined the Executive Council when it worked as a Legislative Council.</div><div class="cp-card amber"><div class="cp-card-title">🗺️ Devolution</div>Legislative powers were decentralised and vested in the governments of <b>Bombay and Madras</b>.</div><div class="cp-card violet"><div class="cp-card-title">📋 Portfolio system</div>The portfolio system was introduced by Lord Canning, giving each member a department.</div></div>
      <div class="cp-note info">The Viceroy could also issue <b>ordinances</b> in emergencies, valid for 6 months.</div>
      <div class="cp-note trap">This Legislative Council was <u>neither representative nor deliberative</u>. Nomination is not election.</div>
      <div class="cp-mnemonic"><b>61</b> = <b>I</b>ndians <b>I</b>nvited (by nomination).</div>
      <div class="cp-chips"><span>1861</span><span>Nomination</span><span>Portfolio system</span></div>
    `
  },

  /* ─────────── 42 · QUESTION ─────────── */
  42: {
    questext: "By which Act were Indians first associated with law-making by nomination to the Governor-General's expanded Council?",
    options: ["Indian Councils Act, 1861", "Indian Councils Act, 1892", "Indian Councils Act, 1909", "Government of India Act, 1919"],
    correct: "1",
    exptext: "✅ The 1861 Act brought in nominated Indian members. 📌 The element of election came later, in 1892 and 1909. ❌ The later Acts are not the first to add Indians."
  },

  /* ─────────── 43 · QUESTION ─────────── */
  43: {
    questext: "The portfolio system in the Governor-General's Council was introduced by:",
    options: ["Lord Curzon", "Lord Morley", "Lord Minto", "Lord Canning"],
    correct: "4",
    exptext: "✅ Lord Canning introduced the portfolio system. 📌 Each member of the Council was given charge of a department. ❌ Curzon, Morley and Minto belong to later reforms."
  },

  /* ─────────── 44 · QUESTION ─────────── */
  44: {
    questext: "The power to issue ordinances in an emergency (valid for 6 months) was given to the Governor-General by which Act?",
    options: ["Indian Councils Act, 1892", "Charter Act of 1853", "Indian Councils Act, 1861", "Regulating Act of 1773"],
    correct: "3",
    exptext: "✅ The Act of 1861 gave the Viceroy ordinance powers. 📌 He could make ordinances for 6 months in emergencies. ❌ The 1773 and 1853 Acts did not give such powers."
  },

  /* ─────────── 45 · CONCEPT PAGE — Indian Councils Act, 1892 ─────────── */
  45: {
    type: "concept",
    icon: "❓",
    accent: "#eab308",
    pauseTimer: true,
    title: "Indian Councils Act, 1892",
    html: `
      <p class="cp-lead">The <b>Indian Councils Act, 1892</b> added a <u>little more voice</u> to the Councils: they could now discuss the Budget and put questions, though they could not vote.</p>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🏛️ Nomination by bodies</div>Non-official members of the Indian Legislative Council were nominated on the recommendation of the Bengal Chamber of Commerce and Provincial Councils. In the Provincial Councils, they were nominated by universities, district boards, municipalities, zamindars and similar bodies.</div><div class="cp-card green"><div class="cp-card-title">💬 New powers</div>Councils could <u>discuss the Budget</u> and <u>address questions to the Executive</u>.</div></div>
      <div class="cp-note trap">They could <b>discuss</b> the Budget but not <b>vote</b> on it. Voting powers came later.</div>
      <div class="cp-mnemonic"><b>92</b> = <b>Q</b>uestions and <b>B</b>udget talk, no vote.</div>
      <div class="cp-chips"><span>1892</span><span>Budget discussion</span><span>Questions</span></div>
    `
  },

  /* ─────────── 46 · QUESTION ─────────── */
  46: {
    questext: "Which Act gave the Legislative Councils the right to discuss the Budget and put questions to the Executive?",
    options: ["Indian Councils Act, 1861", "Indian Councils Act, 1892", "Charter Act of 1833", "Government of India Act, 1858"],
    correct: "2",
    exptext: "✅ The 1892 Act gave this right. 📌 It was a small step toward representation. ❌ The 1861 Act only provided for nomination."
  },

  /* ─────────── 47 · QUESTION ─────────── */
  47: {
    questext: "Which of the following was NOT a feature of the Indian Councils Act, 1892?",
    options: ["Members could vote on the Budget", "Members could discuss the Budget", "Members could address questions to the Executive", "Non-official members were nominated through certain bodies"],
    correct: "1",
    exptext: "✅ Voting on the Budget was not allowed. 📌 Discussion and questions were the new rights. ❌ The other three are true."
  },

  /* ─────────── 48 · CONCEPT PAGE — Morley-Minto Reforms and the Indian Councils Act, 1909 ─────────── */
  48: {
    type: "concept",
    icon: "🕌",
    accent: "#f43f5e",
    pauseTimer: true,
    title: "Morley-Minto Reforms and the Indian Councils Act, 1909",
    html: `
      <p class="cp-lead">The reforms suggested by Secretary of State <b>Lord Morley</b> and Viceroy <b>Lord Minto</b> were enacted as the <b>Indian Councils Act, 1909</b>. It increased Indian involvement but also introduced <u>separate electorates</u>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>60</b><span>Additional members</span></div><div class="cp-stat"><b>16</b><span>Earlier limit</span></div><div class="cp-stat"><b>1st</b><span>Indian in Exec. Council</span></div><div class="cp-stat"><b>1st</b><span>Separate electorate</span></div></div>
      <div class="cp-divider">Key provisions</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🔢 Larger Council</div>The maximum number of additional members of the Imperial Legislative Council was raised from <b>16 to 60</b>.</div><div class="cp-card green"><div class="cp-card-title">🧑‍⚖️ First Indian</div><b>Satyendra Prasad Sinha</b> became the first Indian member of the Viceroy's Executive Council, as <u>Law Member</u>.</div><div class="cp-card amber"><div class="cp-card-title">🗳️ Election element</div>In the Provincial Councils, elected non-official members were added so the <u>official majority ended</u>. At the Centre, the official majority stayed.</div><div class="cp-card red"><div class="cp-card-title">🕌 Separate electorates</div>Separate representation was given to the <b>Muslim community</b>. This legalised ‘communalism’, and Lord Minto is called the <b>Father of Communal Electorate</b>.</div></div>
      <div class="cp-note exam">Other points: separate seats for presidency corporations, chambers of commerce, universities and zamindars. The Councils could move resolutions on the Budget and on matters of public interest, except subjects like the armed forces, foreign affairs and Indian States.</div>
      <div class="cp-note trap">At the <b>Centre</b> the official majority was <u>kept</u>; only the <b>provinces</b> lost it.</div>
      <div class="cp-mnemonic"><b>M</b>into = <b>M</b>uslim electorate; <b>M</b>orley = <b>M</b>ore Indians.</div>
      <div class="cp-chips"><span>1909</span><span>Morley-Minto</span><span>Communal electorate</span></div>
    `
  },

  /* ─────────── 49 · QUESTION ─────────── */
  49: {
    questext: "Who is known as the ‘Father of Communal Electorate’ in India?",
    options: ["Lord Morley", "Lord Curzon", "Lord Chelmsford", "Lord Minto"],
    correct: "4",
    exptext: "✅ Lord Minto gave separate electorates to Muslims under the 1909 Act. 📌 Morley and Minto together gave their names to the reforms. ❌ Morley was the Secretary of State; Curzon and Chelmsford came before or after."
  },

  /* ─────────── 50 · QUESTION ─────────── */
  50: {
    questext: "Who became the first Indian member of the Viceroy's Executive Council in 1909?",
    options: ["Dadabhai Naoroji", "Gopal Krishna Gokhale", "Satyendra Prasad Sinha", "Surendranath Banerjea"],
    correct: "3",
    exptext: "✅ Satyendra Prasad Sinha joined as the Law Member. 📌 The Act of 1909 allowed Indians in the Executive Councils for the first time. ❌ The other three were famous leaders but not appointed to the Viceroy's Council."
  },

  /* ─────────── 51 · QUESTION ─────────── */
  51: {
    questext: "Under the Indian Councils Act, 1909, the maximum number of additional members of the Imperial Legislative Council was raised to:",
    options: ["16", "60", "100", "144"],
    correct: "2",
    exptext: "✅ The number rose from 16 to 60. 📌 Remember the pair: 16 → 60. ❌ 144 refers to the Legislative Assembly of 1919."
  },

  /* ─────────── 52 · QUESTION ─────────── */
  52: {
    questext: "Separate electorates were first provided by the Indian Councils Act, 1909 for which community?",
    options: ["Muslims", "Sikhs", "Indian Christians", "Anglo-Indians"],
    correct: "1",
    exptext: "✅ The 1909 Act gave separate electorates to Muslims. 📌 Sikhs, Indian Christians and Anglo-Indians got them in 1919. ❌ These three were added later."
  },

  /* ─────────── 53 · QUESTION ─────────── */
  53: {
    questext: "Consider the Indian Councils Act, 1909. 1. It legalised separate representation for the Muslim community. 2. It ended the official majority in the Central Legislative Council. 3. It added elected non-official members in the Provincial Councils. Which are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1, 2 and 3", "1 and 3 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 3 are correct. 📌 At the Centre, the official majority was kept. ❌ Statement 2 is wrong, so options including it fail."
  },

  /* ─────────── 54 · CONCEPT PAGE — The Government of India Act, 1915 ─────────── */
  54: {
    type: "concept",
    icon: "📚",
    accent: "#10b981",
    pauseTimer: true,
    title: "The Government of India Act, 1915",
    html: `
      <p class="cp-lead">The <b>Government of India Act, 1915</b> was passed only to <u>consolidate</u> the provisions of the earlier Government of India Acts into one Act.</p>
      <div class="cp-note tip">Think of it as a <b>tidy-up Act</b>: no big new idea, only gathering the old laws together.</div>
      <div class="cp-note trap">Do not mistake 1915 for the reforms of 1919. The 1915 Act made <u>no new changes</u>.</div>
      <div class="cp-mnemonic"><b>15</b> = <b>C</b>lean-up, <b>C</b>onsolidation.</div>
      <div class="cp-chips"><span>1915</span><span>Consolidation</span></div>
    `
  },

  /* ─────────── 55 · QUESTION ─────────── */
  55: {
    questext: "The Government of India Act, 1915 was mainly passed to:",
    options: ["Introduce dyarchy in the provinces", "Set up the Federal Court", "Consolidate the provisions of the earlier Government of India Acts", "Grant Dominion Status"],
    correct: "3",
    exptext: "✅ It merged earlier Acts into one. 📌 It brought no new reform of its own. ❌ Dyarchy came in 1919, the Federal Court in 1935."
  },

  /* ─────────── 56 · CONCEPT PAGE — Montagu-Chelmsford Reforms and the Government of India Act, 1919 ─────────── */
  56: {
    type: "concept",
    icon: "⚙️",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Montagu-Chelmsford Reforms and the Government of India Act, 1919",
    html: `
      <p class="cp-lead"><b>E. S. Montagu</b> (Secretary of State) and <b>Lord Chelmsford</b> (Viceroy) prepared the <b>Government of India Act, 1919</b>. Its big idea was <u>Dyarchy</u>, or dual government, in the provinces.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1919</b><span>Act</span></div><div class="cp-stat"><b>Dyarchy</b><span>In provinces</span></div><div class="cp-stat"><b>70%</b><span>Elected in provinces</span></div><div class="cp-stat"><b>2</b><span>Houses at Centre</span></div></div>
      <div class="cp-divider">Dyarchy in the provinces</div>
      <div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/3.png" alt="Dyarchy: transferred and reserved subjects" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">🟢 Transferred subjects</div>Run by the Governor with <b>Ministers responsible to the Legislative Council</b>. Elected members in the Council rose to 70 per cent.</div><div class="cp-card red"><div class="cp-card-title">🔴 Reserved subjects</div>Run by the Governor and his Executive Council with <u>no responsibility</u> to the Legislature.</div></div>
      <div class="cp-divider">Other key provisions</div>
      <table><thead><tr><th>Point</th><th>Provision</th></tr></thead><tbody><tr><td>High Commissioner</td><td>New office of <b>High Commissioner for India</b> in London</td></tr><tr><td>Public Service Commission</td><td>Provided for it; the Central PSC was set up in <b>1926</b></td></tr><tr><td>Women's vote</td><td>Voting right to some Indian women for the <b>first time</b> (PM of England: Lloyd George)</td></tr><tr><td>Subjects</td><td>Divided into <b>Central</b> and <b>Provincial</b>; provincial ones split into transferred and reserved</td></tr><tr><td>Budget</td><td>Provincial budget <b>separated</b> from the Central budget</td></tr><tr><td>Bicameral Centre</td><td><b>Council of State</b> (60 members, 34 elected) and <b>Legislative Assembly</b> (about 144 members, 104 elected)</td></tr><tr><td>Electorates</td><td>Arranged on a communal and sectional basis, developing the Morley-Minto device</td></tr></tbody></table>
      <div class="cp-note exam">The Governor-General kept overriding powers: <b>previous sanction</b> for some Bills, <b>veto</b> or reserving Bills for the Crown, <b>certifying</b> a Bill or grant refused by the Legislature, and making <b>Ordinances</b> in an emergency.</div>
      <div class="cp-note info">The idea of Dyarchy is linked to <b>Lionel Curtis</b>. The Governor-General in Council stayed responsible only to the British Parliament through the Secretary of State.</div>
      <div class="cp-note trap">Dyarchy was in the <b>provinces</b>, not at the Centre. (The 1935 Act planned dyarchy at the Centre, but it never began.)</div>
      <div class="cp-mnemonic"><b>T</b>ransferred → <b>T</b>eam of Ministers; <b>R</b>eserved → <b>R</b>uler (Governor).</div>
      <div class="cp-chips"><span>1919</span><span>Dyarchy</span><span>Bicameral</span><span>Women's vote</span></div>
    `
  },

  /* ─────────── 57 · QUESTION ─────────── */
  57: {
    questext: "Dyarchy, or dual government, was introduced by the Government of India Act, 1919 at the level of:",
    options: ["The Centre", "The Provinces", "Princely States", "Both Centre and Provinces"],
    correct: "2",
    exptext: "✅ Dyarchy was introduced in the provinces. 📌 The plan for dyarchy at the Centre came in the 1935 Act but never started. ❌ The 1919 Act did not apply dyarchy at the Centre."
  },

  /* ─────────── 58 · QUESTION ─────────── */
  58: {
    questext: "Under dyarchy, ‘transferred’ subjects were administered by the Governor with the help of:",
    options: ["Ministers responsible to the Legislative Council", "The Executive Council with no responsibility to the Legislature", "The Secretary of State", "The Viceroy alone"],
    correct: "1",
    exptext: "✅ Ministers answerable to the Legislative Council ran transferred subjects. 📌 Reserved subjects were run by the Governor and his Executive Council. ❌ The other options describe reserved or unrelated arrangements."
  },

  /* ─────────── 59 · QUESTION ─────────── */
  59: {
    questext: "The Council of State, the Upper House created by the Government of India Act, 1919, had how many members?",
    options: ["34", "104", "144", "60"],
    correct: "4",
    exptext: "✅ The Council of State had 60 members, of whom 34 were elected. 📌 The Lower House was the Legislative Assembly, with about 144 members. ❌ 34 is the number elected and 104 the elected members of the Assembly."
  },

  /* ─────────── 60 · QUESTION ─────────── */
  60: {
    questext: "Which of the following was NOT provided by the Government of India Act, 1919?",
    options: ["A bicameral Central Legislature", "Separation of the provincial budget from the Central budget", "Federation of British Indian provinces and Princely States", "Office of High Commissioner for India in London"],
    correct: "3",
    exptext: "✅ The federation plan belongs to the 1935 Act. 📌 1919 = dyarchy and bicameral Centre. ❌ The other three are provisions of 1919."
  },

  /* ─────────── 61 · QUESTION ─────────── */
  61: {
    questext: "The office of the High Commissioner for India in London and a provision for a Public Service Commission were created by:",
    options: ["Government of India Act, 1858", "Government of India Act, 1919", "Indian Councils Act, 1909", "Government of India Act, 1935"],
    correct: "2",
    exptext: "✅ Both were provided under the 1919 Act. 📌 The Central Public Service Commission was set up in 1926. ❌ The 1935 Act set up a Federal Public Service Commission, not these."
  },

  /* ─────────── 62 · QUESTION ─────────── */
  62: {
    questext: "The Lower House of the Central Legislature, formed under the Government of India Act, 1919, was named:",
    options: ["Legislative Assembly", "Federal Assembly", "Council of State", "House of the People"],
    correct: "1",
    exptext: "✅ The Lower House was the Legislative Assembly. 📌 The Upper House was the Council of State. ❌ Federal Assembly is the 1935 plan; House of the People is the Lok Sabha."
  },

  /* ─────────── 63 · CONCEPT PAGE — Simon Commission ─────────── */
  63: {
    type: "concept",
    icon: "🔍",
    accent: "#d946ef",
    pauseTimer: true,
    title: "Simon Commission",
    html: `
      <p class="cp-lead">The <b>Simon Commission</b>, headed by <b>Sir John Simon</b>, was formed in <b>1927</b> to inquire into the working of the <u>Act of 1919</u>.</p>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">📅 Dates</div>Formed in <b>1927</b>; placed its report in <b>1930</b>.</div><div class="cp-card green"><div class="cp-card-title">➡️ Result</div>The report was examined by the British Parliament, and the <b>Government of India Bill</b> was drafted accordingly, leading to the Act of 1935.</div></div>
      <div class="cp-note trap">The Commission had <u>no Indian member</u>, which is why it was opposed in India.</div>
      <div class="cp-mnemonic"><b>S</b>imon = <b>S</b>tudy of the 1919 Act: <b>27</b> formed, <b>30</b> report.</div>
      <div class="cp-chips"><span>Simon</span><span>1927</span><span>Report 1930</span></div>
    `
  },

  /* ─────────── 64 · QUESTION ─────────── */
  64: {
    questext: "The Statutory Commission of 1927 headed by Sir John Simon was set up to inquire into the working of which Act?",
    options: ["Government of India Act, 1858", "Indian Councils Act, 1909", "Government of India Act, 1935", "Government of India Act, 1919"],
    correct: "4",
    exptext: "✅ It examined how the Act of 1919 worked. 📌 Its report in 1930 helped shape the 1935 Act. ❌ 1935 came after the Commission; 1858 and 1909 were not under review."
  },

  /* ─────────── 65 · QUESTION ─────────── */
  65: {
    questext: "The report of the Simon Commission was placed in which year?",
    options: ["1927", "1935", "1930", "1942"],
    correct: "3",
    exptext: "✅ The Commission was formed in 1927 and reported in 1930. 📌 Remember: 27 formed, 30 report. ❌ 1935 is the year of the Act and 1942 of the Cripps Mission."
  },

  /* ─────────── 66 · CONCEPT PAGE — The Government of India Act, 1935 ─────────── */
  66: {
    type: "concept",
    icon: "🏗️",
    accent: "#fb7185",
    pauseTimer: true,
    title: "The Government of India Act, 1935",
    html: `
      <p class="cp-lead">The <b>Government of India Act, 1935</b> was a long document with <b>321 Sections and 10 Schedules</b>. It is the <u>main source</u> of the skeleton of our present Constitution.</p>
      <div class="cp-stats"><div class="cp-stat"><b>321</b><span>Sections</span></div><div class="cp-stat"><b>10</b><span>Schedules</span></div><div class="cp-stat"><b>3</b><span>Legislative Lists</span></div><div class="cp-stat"><b>0</b><span>Federation started</span></div></div>
      <div class="cp-divider">Key provisions</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🏛️ Federation plan</div>It prescribed a <b>federation</b> of Provinces and Indian States. It was <u>optional</u> for the States to join, and since they never joined, the Federation <b>never came into being</b>.</div><div class="cp-card green"><div class="cp-card-title">🗺️ New provinces</div>Burma was separated from India, and two new provinces, <b>Orissa and Sind</b>, were created.</div><div class="cp-card amber"><div class="cp-card-title">👤 Governor</div>The Governor acted on behalf of the Crown, with the advice of Ministers responsible to the Legislature, but ‘in his discretion’ in certain matters.</div><div class="cp-card violet"><div class="cp-card-title">🏛️ Bicameral</div>The Central Legislature was bicameral: <b>Federal Assembly</b> and <b>Council of State</b>. Six provinces had two Houses.</div></div>
      <div class="cp-divider">Three lists</div>
      <div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/4.png" alt="Federal, Provincial and Concurrent lists" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>List</th><th>Who can make laws?</th></tr></thead><tbody><tr><td>Federal List</td><td>Federal Legislature (exclusive)</td></tr><tr><td>Provincial List</td><td>Provincial Legislature (exclusive)</td></tr><tr><td>Concurrent List</td><td>Both Federal and Provincial Legislatures</td></tr><tr><td>Residuary matters</td><td>Governor-General could authorise either Legislature to legislate</td></tr></tbody></table>
      <div class="cp-note exam">The Governor-General had <b>independent powers of legislation</b>, power of veto, and could stop discussions on a Bill. Bills were also subject to the <u>Crown's veto</u>.</div>
      <div class="cp-note trap"><b>Dominion Status was NOT given</b> by the 1935 Act. The Council of Ministers responsible to the Central Legislature was <u>never appointed</u>.</div>
      <details class="cp-collapse"><summary>Why did the Federation never begin?</summary><p>The Act said that it would begin only when enough Indian States agreed to join. Since the States never agreed, the Federal part of the Act never started. Only the provincial part worked.</p></details>
      <div class="cp-mnemonic"><b>1935</b>: <b>F</b>ederation on paper, <b>3</b> Lists, <b>O</b>rissa + <b>S</b>ind born, <b>B</b>urma out.</div>
      <div class="cp-chips"><span>1935</span><span>321 Sections</span><span>Federation</span><span>Three Lists</span></div>
    `
  },

  /* ─────────── 67 · QUESTION ─────────── */
  67: {
    questext: "The Government of India Act, 1935 contained how many Sections and Schedules?",
    options: ["395 Sections and 8 Schedules", "321 Sections and 10 Schedules", "321 Sections and 8 Schedules", "250 Sections and 10 Schedules"],
    correct: "2",
    exptext: "✅ The Act had 321 Sections and 10 Schedules. 📌 395 and 8 are the numbers for the original Constitution of India. ❌ The other combinations mix up the numbers."
  },

  /* ─────────── 68 · QUESTION ─────────── */
  68: {
    questext: "The Federation proposed under the Government of India Act, 1935 never came into being because:",
    options: ["Indian States did not join it", "The Congress accepted it fully", "The Second World War had already ended", "The Federal Court rejected it"],
    correct: "1",
    exptext: "✅ Joining was optional for the States, and they never did. 📌 Only provincial autonomy was put into practice. ❌ The other reasons are invented."
  },

  /* ─────────── 69 · QUESTION ─────────── */
  69: {
    questext: "Which two new provinces were created by the Government of India Act, 1935?",
    options: ["Assam and Bihar", "Punjab and Bengal", "Madras and Bombay", "Orissa and Sind"],
    correct: "4",
    exptext: "✅ Orissa and Sind were created as separate provinces. 📌 Burma was also separated from India by the same Act. ❌ The other pairs already existed."
  },

  /* ─────────── 70 · QUESTION ─────────── */
  70: {
    questext: "The three-fold division of legislative powers under the Act of 1935 consisted of:",
    options: ["Union List, State List and Concurrent List", "Central List, Local List and Residuary List", "Federal List, Provincial List and Concurrent List", "Federal List, Provincial List and Residuary List"],
    correct: "3",
    exptext: "✅ The 1935 lists were Federal, Provincial and Concurrent. 📌 The words ‘Union’ and ‘State’ are used in our Constitution. ❌ The other options use wrong names."
  },

  /* ─────────── 71 · QUESTION ─────────── */
  71: {
    questext: "Which of the following was NOT a feature of the Government of India Act, 1935?",
    options: ["Separation of Burma from India", "Dominion Status was conferred on India", "A federation of Provinces and Indian States was proposed", "Three legislative lists were provided"],
    correct: "2",
    exptext: "✅ Dominion Status was not granted by the 1935 Act. 📌 The Act was only a step toward self-government. ❌ The other three are real features of the 1935 Act."
  },

  /* ─────────── 72 · QUESTION ─────────── */
  72: {
    questext: "Consider the Government of India Act, 1935. 1. The Central Legislature was bicameral. 2. The Governor-General had independent powers of legislation. 3. The Federation came into existence soon after the Act. Which are correct?",
    options: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 1 and 2 are correct. 📌 The Federation never began. ❌ Statement 3 is wrong, so options with 3 are out."
  },

  /* ─────────── 73 · QUESTION ─────────── */
  73: {
    questext: "In the Act of 1935, which of the following is correct about the Provincial Legislatures?",
    options: ["All provincial legislatures were bicameral", "Six provinces had bicameral legislatures and the rest had unicameral ones", "All were unicameral", "Only Bengal was bicameral"],
    correct: "2",
    exptext: "✅ Six provinces had two Houses; the rest had one. 📌 The six provinces had a Legislative Assembly and a Legislative Council. ❌ The other statements are not true."
  },

  /* ─────────── 74 · CONCEPT PAGE — Cripps Mission ─────────── */
  74: {
    type: "concept",
    icon: "✈️",
    accent: "#65a30d",
    pauseTimer: true,
    title: "Cripps Mission",
    html: `
      <p class="cp-lead">In <b>March 1942</b>, <b>Sir Stafford Cripps</b>, a member of the British Cabinet, came to India with a draft declaration. The proposals were to be adopted <u>after the Second World War</u>, if the Congress and the Muslim League accepted them.</p>
      <div class="cp-divider">The proposals</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🏛️ Constituent Assembly</div>The Constitution of India was to be framed by an <b>elected Constituent Assembly</b> of Indians.</div><div class="cp-card green"><div class="cp-card-title">🇮🇳 Dominion Status</div>The Constitution should give India <b>Dominion Status</b>.</div><div class="cp-card amber"><div class="cp-card-title">🤝 One Union</div>There would be one Indian Union comprising all the Provinces and Indian States.</div><div class="cp-card red"><div class="cp-card-title">🚪 Opt-out</div>Any Province or State not accepting the Constitution could keep its existing position, and the British could make separate arrangements with it.</div></div>
      <div class="cp-note info">The proposals were not accepted by the major Indian parties, so the Mission failed.</div>
      <div class="cp-note trap">Cripps offered <u>Dominion Status after the war</u>, not full independence at once.</div>
      <div class="cp-mnemonic"><b>Cripps 42</b> = <b>C</b>onstituent assembly + <b>D</b>ominion status + <b>O</b>pt-out (C-D-O).</div>
      <div class="cp-chips"><span>March 1942</span><span>Stafford Cripps</span><span>Dominion Status</span></div>
    `
  },

  /* ─────────── 75 · QUESTION ─────────── */
  75: {
    questext: "The Cripps Mission came to India in which year?",
    options: ["1940", "1944", "1942", "1946"],
    correct: "3",
    exptext: "✅ Sir Stafford Cripps came in March 1942. 📌 1946 is the year of the Cabinet Mission. ❌ 1940 and 1944 are not linked with these missions."
  },

  /* ─────────── 76 · QUESTION ─────────── */
  76: {
    questext: "Which of the following was part of the Cripps proposals of 1942?",
    options: ["Immediate complete independence during the war", "A separate sovereign Pakistan", "Abolition of the Princely States", "Dominion Status for India after the war"],
    correct: "4",
    exptext: "✅ The draft offered Dominion Status after the war. 📌 It also promised an elected Constituent Assembly. ❌ Immediate independence and Pakistan were not offered by Cripps."
  },

  /* ─────────── 77 · QUESTION ─────────── */
  77: {
    questext: "According to the Cripps proposals, a Province not accepting the new Constitution would:",
    options: ["Be free to retain its existing constitutional position", "Be forced to join the Union", "Be dissolved immediately", "Be merged with a neighbouring Province"],
    correct: "1",
    exptext: "✅ Such a Province could stay as it was, and the British could make separate arrangements. 📌 This is called the opt-out clause. ❌ No force was proposed."
  },

  /* ─────────── 78 · CONCEPT PAGE — Cabinet Mission Plan ─────────── */
  78: {
    type: "concept",
    icon: "🧳",
    accent: "#0d9488",
    pauseTimer: true,
    title: "Cabinet Mission Plan",
    html: `
      <p class="cp-lead">In <b>March 1946</b>, Prime Minister <b>Clement Attlee</b> sent a <b>Cabinet Mission</b> to India, with <b>three</b> Cabinet Ministers, to help India reach independence as early as possible and to set up a <u>Constituent Assembly</u>.</p>
      <div class="cp-divider">Members of the Mission</div>
      <table><thead><tr><th>Member</th></tr></thead><tbody><tr><td>Lord Pethick-Lawrence</td></tr><tr><td>Sir Stafford Cripps</td></tr><tr><td>A. V. Alexander</td></tr></tbody></table>
      <div class="cp-divider">The Plan</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🇮🇳 Union of India</div>A Union of British India and the States with power over <b>Foreign Affairs, Defence and Communications</b>.</div><div class="cp-card green"><div class="cp-card-title">🏛️ Residuary powers</div>All residuary powers would vest in the <b>Provinces and the States</b>.</div><div class="cp-card amber"><div class="cp-card-title">🚫 Pakistan rejected</div>The Mission rejected the claim for a separate Constituent Assembly and a separate State for the Muslims.</div><div class="cp-card violet"><div class="cp-card-title">👥 Groups</div>Provinces could form groups with their own executives and legislatures. (They were Groups A, B and C.)</div></div>
      <div class="cp-note exam">A decision on a major communal issue needed the support of a majority of each of the two major communities present and voting, as well as a majority of all members present and voting.</div>
      <div class="cp-note trap">The Union had only <b>three subjects</b>. Do not add Finance or Railways.</div>
      <div class="cp-mnemonic"><b>PCA</b>: <b>P</b>ethick-Lawrence, <b>C</b>ripps, <b>A</b>lexander; Union subjects <b>FDC</b>: Foreign, Defence, Communications.</div>
      <div class="cp-chips"><span>1946</span><span>Three Ministers</span><span>Union of India</span></div>
    `
  },

  /* ─────────── 79 · QUESTION ─────────── */
  79: {
    questext: "Which of the following was NOT a member of the Cabinet Mission of 1946?",
    options: ["Lord Pethick-Lawrence", "Sir Stafford Cripps", "A. V. Alexander", "Lord Mountbatten"],
    correct: "4",
    exptext: "✅ Lord Mountbatten was the Viceroy and came with the 1947 plan. 📌 The Cabinet Mission had three British Cabinet Ministers. ❌ The other three were the members."
  },

  /* ─────────── 80 · QUESTION ─────────── */
  80: {
    questext: "According to the Cabinet Mission Plan, the Union of India was to have power over:",
    options: ["Foreign Affairs, Finance and Railways", "Defence, Education and Health", "Foreign Affairs, Defence and Communications", "Communications, Agriculture and Trade"],
    correct: "3",
    exptext: "✅ The Union was to control Foreign Affairs, Defence and Communications. 📌 Remember FDC. ❌ The other lists contain wrong subjects."
  },

  /* ─────────── 81 · QUESTION ─────────── */
  81: {
    questext: "Under the Cabinet Mission Plan, the residuary powers were to be vested in:",
    options: ["The Provinces and the States", "The Union Government", "The Viceroy", "The British Parliament"],
    correct: "1",
    exptext: "✅ Residuary powers were to stay with the Provinces and the States. 📌 This was a weak-Centre plan. ❌ The Constitution of India later gave residuary powers to the Centre."
  },

  /* ─────────── 82 · QUESTION ─────────── */
  82: {
    questext: "The Cabinet Mission Plan of 1946:",
    options: ["Accepted the demand for Pakistan", "Proposed a strong unitary government", "Rejected the demand for a separate sovereign Muslim State", "Offered Dominion Status without a Constituent Assembly"],
    correct: "3",
    exptext: "✅ It rejected a separate State and proposed a Union with Groups. 📌 The plan was to help set up a Constituent Assembly. ❌ The other statements are not true."
  },

  /* ─────────── 83 · CONCEPT PAGE — The Mountbatten Plan ─────────── */
  83: {
    type: "concept",
    icon: "✂️",
    accent: "#c2410c",
    pauseTimer: true,
    title: "The Mountbatten Plan",
    html: `
      <p class="cp-lead">The <b>Mountbatten Plan</b> laid down the way to <u>transfer power</u> to Indians and to <u>partition</u> the country into India and Pakistan.</p>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">📅 Date</div>It was given formal shape by a statement of the British Government on <b>3 June 1947</b>.</div><div class="cp-card green"><div class="cp-card-title">➡️ Result</div>It led to the <b>Indian Independence Act, 1947</b>.</div></div>
      <div class="cp-note trap">Do not mix it with the <b>Cabinet Mission Plan (1946)</b>, which tried to keep India united.</div>
      <div class="cp-mnemonic"><b>3 June</b> = <b>Partition</b> plan; <b>Mountbatten</b> = last Viceroy.</div>
      <div class="cp-chips"><span>3 June 1947</span><span>Partition</span><span>Transfer of power</span></div>
    `
  },

  /* ─────────── 84 · QUESTION ─────────── */
  84: {
    questext: "The Mountbatten Plan was formally announced by a statement of the British Government on:",
    options: ["15 August 1947", "16 May 1946", "26 January 1950", "3 June 1947"],
    correct: "4",
    exptext: "✅ The statement was made on 3 June 1947. 📌 It is also called the 3 June Plan. ❌ 16 May 1946 is linked with the Cabinet Mission; the others are later dates."
  },

  /* ─────────── 85 · QUESTION ─────────── */
  85: {
    questext: "The plan for the transfer of power and the partition of India was laid down in the:",
    options: ["Mountbatten Plan", "Cripps Proposals", "Cabinet Mission Plan", "Simon Commission Report"],
    correct: "1",
    exptext: "✅ The Mountbatten Plan provided for partition and transfer of power. 📌 It led to the Independence Act. ❌ The other three did not provide for partition."
  },

  /* ─────────── 86 · CONCEPT PAGE — The Indian Independence Act, 1947 ─────────── */
  86: {
    type: "concept",
    icon: "🕊️",
    accent: "#2563eb",
    pauseTimer: true,
    title: "The Indian Independence Act, 1947",
    html: `
      <p class="cp-lead">The <b>Indian Independence Act, 1947</b> was passed by the British Parliament. From <b>15 August 1947</b>, India ceased to be a Dependency, and two new countries, India and Pakistan, came into being.</p>
      <div class="cp-divider">What changed</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🇬🇧 Crown's rights end</div>The suzerainty of the British Crown over the Indian States and treaty relations with Tribal Areas <b>lapsed</b>.</div><div class="cp-card red"><div class="cp-card-title">🗑️ Secretary of State</div>The office of the <b>Secretary of State for India</b> was abolished.</div><div class="cp-card amber"><div class="cp-card-title">⚖️ Special powers</div>The Governor-General and the Governors lost their extraordinary powers of legislation.</div><div class="cp-card green"><div class="cp-card-title">🏛️ Constituent Assembly</div>The Central Legislature ceased to exist on <b>14 August 1947</b>, and the Constituent Assembly itself functioned also as the Central Legislature with full sovereignty.</div></div>
      <div class="cp-note info"><b>Sylhet (Assam):</b> in a referendum held in July 1947, Sylhet decided to join the province of East Bengal, which became a part of Pakistan.</div>
      <div class="cp-note info">The Government of India Act, 1935 was amended by Adaptation Orders in both India and Pakistan to set up an interim Constituent Assembly.</div>
      <div class="cp-note trap">The Princely States were not merged automatically. Their rulers got a choice, and the Crown's suzerainty simply lapsed.</div>
      <div class="cp-mnemonic"><b>15 Aug</b> = Dependency <b>ends</b>; <b>14 Aug</b> = old Legislature <b>ends</b>.</div>
      <div class="cp-chips"><span>1947</span><span>Independence Act</span><span>Sylhet</span></div>
    `
  },

  /* ─────────── 87 · QUESTION ─────────── */
  87: {
    questext: "Which office was abolished by the Indian Independence Act, 1947?",
    options: ["Viceroy of India", "Secretary of State for India", "Chief Justice of India", "Speaker of the Legislative Assembly"],
    correct: "2",
    exptext: "✅ The office of the Secretary of State for India ended. 📌 The Crown's control over India ended. ❌ The other three did not end under this Act in the way stated."
  },

  /* ─────────── 88 · QUESTION ─────────── */
  88: {
    questext: "The Central Legislature of India, made of the Legislative Assembly and the Council of States, ceased to exist on:",
    options: ["14 August 1947", "15 August 1947", "26 November 1949", "26 January 1950"],
    correct: "1",
    exptext: "✅ It ceased to exist on 14 August 1947. 📌 The Constituent Assembly then worked as the Central Legislature. ❌ The other dates are later."
  },

  /* ─────────── 89 · QUESTION ─────────── */
  89: {
    questext: "In a referendum held in July 1947, Sylhet (Assam) decided to join:",
    options: ["West Bengal", "Punjab", "Bihar", "The province of East Bengal (Pakistan)"],
    correct: "4",
    exptext: "✅ Sylhet joined East Bengal, which became part of Pakistan. 📌 It was a part of Assam before this referendum. ❌ The other three are Indian provinces."
  },

  /* ─────────── 90 · QUESTION ─────────── */
  90: {
    questext: "Which of the following was NOT a result of the Indian Independence Act, 1947?",
    options: ["The Crown's suzerainty over Indian States lapsed", "The office of the Secretary of State for India was abolished", "All Princely States were automatically merged into India", "The Constituent Assembly also worked as the Central Legislature"],
    correct: "3",
    exptext: "✅ There was no automatic merger. 📌 States had to choose or be integrated later. ❌ The other three are real results of the Act."
  },

  /* ─────────── 91 · CONCEPT PAGE — Interim Government (2 September 1946) ─────────── */
  91: {
    type: "concept",
    icon: "🏛️",
    accent: "#db2777",
    pauseTimer: true,
    title: "Interim Government (2 September 1946)",
    html: `
      <p class="cp-lead">The <b>Interim Government</b> was formed on <b>2 September 1946</b> as per the proposal of the Cabinet Mission. <b>Jawaharlal Nehru</b> was the Vice-President of its Council.</p>
      <table><thead><tr><th>Member</th><th>Portfolio</th></tr></thead><tbody><tr><td>Jawaharlal Nehru</td><td>Vice-President of the Council; External Affairs and Commonwealth Relations</td></tr><tr><td>Sardar Vallabhbhai Patel</td><td>Home; Information and Broadcasting</td></tr><tr><td>Dr. Rajendra Prasad</td><td>Food and Agriculture</td></tr><tr><td>Dr. John Mathai</td><td>Industries and Supplies</td></tr><tr><td>Jagjivan Ram</td><td>Labour</td></tr><tr><td>Sardar Baldev Singh</td><td>Defence</td></tr><tr><td>C. H. Bhabha</td><td>Works, Mines and Power</td></tr><tr><td>Liaquat Ali Khan</td><td>Finance</td></tr><tr><td>Abdur Rab Nishtar</td><td>Posts and Air</td></tr><tr><td>Asaf Ali</td><td>Railways</td></tr><tr><td>C. Rajagopalachari</td><td>Education and Arts</td></tr><tr><td>I. I. Chundrigar</td><td>Commerce</td></tr><tr><td>Ghazanfar Ali Khan</td><td>Health</td></tr><tr><td>Joginder Nath Mandal</td><td>Law</td></tr></tbody></table>
      <div class="cp-note info">The Muslim League members (Liaquat Ali Khan, Nishtar, Chundrigar, Ghazanfar Ali Khan and, on the League's nomination, Mandal) joined in October 1946.</div>
      <div class="cp-note trap">Dr. Ambedkar was Law Minister in the <b>first Cabinet of free India (1947)</b>. In the Interim Government the Law portfolio was with <b>Joginder Nath Mandal</b>.</div>
      <div class="cp-mnemonic"><b>L</b>iaquat = <b>L</b>edger (Finance); <b>B</b>aldev = <b>B</b>attle (Defence).</div>
      <div class="cp-chips"><span>Interim Government</span><span>Nehru</span><span>1946</span></div>
    `
  },

  /* ─────────── 92 · QUESTION ─────────── */
  92: {
    questext: "Who was the Vice-President of the Council in the Interim Government formed on 2 September 1946?",
    options: ["Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Dr. Rajendra Prasad", "Liaquat Ali Khan"],
    correct: "2",
    exptext: "✅ Nehru headed the Interim Government as Vice-President of the Council. 📌 He also held External Affairs and Commonwealth Relations. ❌ Patel held Home and Prasad held Food and Agriculture."
  },

  /* ─────────── 93 · QUESTION ─────────── */
  93: {
    questext: "Who held the Finance portfolio in the Interim Government of 1946?",
    options: ["Liaquat Ali Khan", "Sardar Vallabhbhai Patel", "Dr. John Mathai", "R. K. Shanmukham Chetty"],
    correct: "1",
    exptext: "✅ Liaquat Ali Khan was the Finance member. 📌 Shanmukham Chetty became the first Finance Minister of free India in 1947. ❌ Patel held Home and Mathai held Industries and Supplies."
  },

  /* ─────────── 94 · QUESTION ─────────── */
  94: {
    questext: "Who held the Law portfolio in the Interim Government of 1946?",
    options: ["Dr. B. R. Ambedkar", "Asaf Ali", "C. H. Bhabha", "Joginder Nath Mandal"],
    correct: "4",
    exptext: "✅ Joginder Nath Mandal was the Law member. 📌 Ambedkar became Law Minister in the first Cabinet of free India (1947). ❌ Asaf Ali held Railways and Bhabha Works, Mines and Power."
  },

  /* ─────────── 95 · CONCEPT PAGE — First Cabinet of Free India (1947) ─────────── */
  95: {
    type: "concept",
    icon: "🇮🇳",
    accent: "#ca8a04",
    pauseTimer: true,
    title: "First Cabinet of Free India (1947)",
    html: `
      <p class="cp-lead">The <b>first Cabinet of free India</b> was led by <b>Jawaharlal Nehru</b> as Prime Minister. It had 14 members.</p>
      <table><thead><tr><th>Member</th><th>Portfolio</th></tr></thead><tbody><tr><td>Jawaharlal Nehru</td><td>Prime Minister; External Affairs and Commonwealth Relations; Scientific Research</td></tr><tr><td>Sardar Vallabhbhai Patel</td><td>Home; Information and Broadcasting; States</td></tr><tr><td>Dr. Rajendra Prasad</td><td>Food and Agriculture</td></tr><tr><td>Maulana Abul Kalam Azad</td><td>Education</td></tr><tr><td>Dr. John Mathai</td><td>Railways and Transport</td></tr><tr><td>R. K. Shanmukham Chetty</td><td>Finance</td></tr><tr><td>Dr. B. R. Ambedkar</td><td>Law</td></tr><tr><td>Jagjivan Ram</td><td>Labour</td></tr><tr><td>Sardar Baldev Singh</td><td>Defence</td></tr><tr><td>Rajkumari Amrit Kaur</td><td>Health</td></tr><tr><td>C. H. Bhabha</td><td>Commerce</td></tr><tr><td>Rafi Ahmed Kidwai</td><td>Communications</td></tr><tr><td>Dr. Syama Prasad Mookerjee</td><td>Industries and Supplies</td></tr><tr><td>N. V. Gadgil</td><td>Works, Mines and Power</td></tr></tbody></table>
      <div class="cp-note exam">Favourite ‘first’ questions: first <b>Finance Minister</b> (Shanmukham Chetty), first <b>Law Minister</b> (Ambedkar), first <b>Health Minister</b> (Rajkumari Amrit Kaur), first <b>Education Minister</b> (Maulana Azad).</div>
      <div class="cp-note trap">Do not confuse the two lists: <b>Interim (1946)</b> had Liaquat Ali Khan as Finance and Mandal as Law; <b>first Cabinet (1947)</b> had Chetty as Finance and Ambedkar as Law.</div>
      <div class="cp-mnemonic"><b>A</b>mbedkar = <b>A</b>dvocate (Law); <b>A</b>zad = <b>A</b>cademics (Education); <b>A</b>mrit Kaur = <b>A</b>rogya (Health).</div>
      <div class="cp-chips"><span>1947</span><span>First Cabinet</span><span>Nehru</span></div>
    `
  },

  /* ─────────── 96 · QUESTION ─────────── */
  96: {
    questext: "Who was the first Finance Minister of independent India?",
    options: ["Dr. John Mathai", "Liaquat Ali Khan", "R. K. Shanmukham Chetty", "Sardar Patel"],
    correct: "3",
    exptext: "✅ Shanmukham Chetty was the first Finance Minister of free India. 📌 Liaquat Ali Khan was the Finance member in 1946. ❌ Mathai took over Railways and Transport."
  },

  /* ─────────── 97 · QUESTION ─────────── */
  97: {
    questext: "Who was the first Law Minister of independent India?",
    options: ["Joginder Nath Mandal", "Dr. B. R. Ambedkar", "K. M. Munshi", "C. Rajagopalachari"],
    correct: "2",
    exptext: "✅ Dr. B. R. Ambedkar was the first Law Minister. 📌 Mandal was Law member in 1946, not 1947. ❌ Munshi and Rajagopalachari were not Law Ministers in the first Cabinet."
  },

  /* ─────────── 98 · QUESTION ─────────── */
  98: {
    questext: "Match the Minister in the first Cabinet with the portfolio. A. Maulana Azad B. Sardar Baldev Singh C. Rafi Ahmed Kidwai D. Syama Prasad Mookerjee. 1. Defence 2. Communications 3. Education 4. Industries and Supplies.",
    options: ["A-3, B-1, C-4, D-2", "A-1, B-3, C-2, D-4", "A-3, B-1, C-2, D-4", "A-2, B-4, C-3, D-1"],
    correct: "3",
    exptext: "✅ A-3 (Azad: Education), B-1 (Baldev Singh: Defence), C-2 (Kidwai: Communications), D-4 (Mookerjee: Industries and Supplies). 📌 Azad = Education; Baldev = Defence. ❌ The other options swap the portfolios."
  },

  /* ─────────── 99 · CONCEPT PAGE — 2. Constituent Assembly and Making of the Constitution ─────────── */
  99: {
    type: "concept",
    icon: "🏗️",
    accent: "#16a34a",
    pauseTimer: true,
    title: "2. Constituent Assembly and Making of the Constitution",
    html: `
      <p class="cp-lead">The <b>Cabinet Mission</b> planned a <u>Constituent Assembly</u> to frame the Constitution. Its members were <b>elected by the Provincial Legislative Assemblies</b>, not directly by the people.</p>
      <div class="cp-stats"><div class="cp-stat"><b>389</b><span>Original seats</span></div><div class="cp-stat"><b>299</b><span>After partition</span></div><div class="cp-stat"><b>1 : 10 lakh</b><span>Seat ratio</span></div><div class="cp-stat"><b>9 Dec 1946</b><span>First meeting</span></div></div>
      <div class="cp-divider">How the Assembly was formed</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🗳️ Election</div>Members were elected by the Provincial Legislative Assemblies. This is an <u>indirect</u> election.</div><div class="cp-card green"><div class="cp-card-title">🔢 Seats</div>Each Province and each Indian State got seats in proportion to its population, roughly <b>one seat for a million</b>.</div><div class="cp-card amber"><div class="cp-card-title">👥 Communities</div>Seats were distributed among the main communities of each Province: <b>Sikh, Muslim and General</b>.</div><div class="cp-card violet"><div class="cp-card-title">🧑‍💼 Leaders</div><b>Sachchidananda Sinha</b> was the temporary President; <b>Dr. Rajendra Prasad</b> was elected President of the Assembly on 11 December 1946.</div></div>
      <div class="cp-note exam">Out of the 389 seats, 296 were for British India and 93 for the Princely States. After partition the strength fell to 299.</div>
      <div class="cp-note trap">Members were <b>not</b> elected by adult franchise. Also, the communities recognised were <u>General, Muslim and Sikh</u>, not ‘Hindu’.</div>
      <div class="cp-mnemonic"><b>1 seat per 10 lakh</b>; communities <b>G-M-S</b> (General, Muslim, Sikh).</div>
      <div class="cp-chips"><span>Constituent Assembly</span><span>Rajendra Prasad</span><span>1946</span></div>
    `
  },

  /* ─────────── 100 · QUESTION ─────────── */
  100: {
    questext: "The members of the Constituent Assembly of India were:",
    options: ["Elected directly by all adult citizens", "Nominated entirely by the Viceroy", "Appointed by the British Parliament", "Elected by the Provincial Legislative Assemblies"],
    correct: "4",
    exptext: "✅ They were elected indirectly by the Provincial Legislative Assemblies. 📌 Seats were also allotted to the Indian States. ❌ Universal adult franchise was not used."
  },

  /* ─────────── 101 · QUESTION ─────────── */
  101: {
    questext: "In the Constituent Assembly, seats were allotted to Provinces and States roughly in the ratio of:",
    options: ["One seat for every million of population", "One seat for every lakh of population", "One seat for every 10 million", "One seat for every 100,000 voters"],
    correct: "1",
    exptext: "✅ The ratio was about one seat per million. 📌 This was based on population. ❌ The other ratios are not correct."
  },

  /* ─────────── 102 · QUESTION ─────────── */
  102: {
    questext: "Who was elected the permanent President of the Constituent Assembly?",
    options: ["Sachchidananda Sinha", "Dr. Rajendra Prasad", "Dr. B. R. Ambedkar", "Jawaharlal Nehru"],
    correct: "2",
    exptext: "✅ Dr. Rajendra Prasad was elected President on 11 December 1946. 📌 Sachchidananda Sinha was the temporary President at the first meeting. ❌ Ambedkar chaired the Drafting Committee and Nehru was a leader of the Assembly."
  },

  /* ─────────── 103 · QUESTION ─────────── */
  103: {
    questext: "Which are the main communities recognised for seat distribution in the Constituent Assembly?",
    options: ["Hindu, Muslim and Sikh", "General, Muslim and Sikh", "General, Muslim and Christian", "Hindu, Muslim, Sikh and Christian"],
    correct: "2",
    exptext: "✅ General, Muslim and Sikh were recognised. 📌 Remember G-M-S. ❌ ‘Hindu’ and ‘Christian’ were not used as separate categories."
  },

  /* ─────────── 104 · QUESTION ─────────── */
  104: {
    questext: "The first meeting of the Constituent Assembly was held on:",
    options: ["26 November 1949", "15 August 1947", "26 January 1950", "9 December 1946"],
    correct: "4",
    exptext: "✅ The Assembly met for the first time on 9 December 1946. 📌 It adopted the Constitution on 26 November 1949. ❌ The other dates are later."
  },

  /* ─────────── 105 · CONCEPT PAGE — Important Committees of the Constituent Assembly and their Chairmen ─────────── */
  105: {
    type: "concept",
    icon: "👥",
    accent: "#9333ea",
    pauseTimer: true,
    title: "Important Committees of the Constituent Assembly and their Chairmen",
    html: `
      <p class="cp-lead">The Assembly worked through many committees. Learn <u>who chaired what</u>: it is a favourite match-the-following topic.</p>
      <table><thead><tr><th>Committee</th><th>Chairman</th></tr></thead><tbody><tr><td>Rules of Procedure Committee</td><td>Dr. Rajendra Prasad</td></tr><tr><td>Steering Committee</td><td>Dr. Rajendra Prasad</td></tr><tr><td>Finance and Staff Committee</td><td>Dr. Rajendra Prasad</td></tr><tr><td>Ad hoc Committee on the National Flag</td><td>Dr. Rajendra Prasad</td></tr><tr><td>Union Constitution Committee</td><td>Jawaharlal Nehru</td></tr><tr><td>Union Powers Committee</td><td>Jawaharlal Nehru</td></tr><tr><td>States Committee</td><td>Jawaharlal Nehru</td></tr><tr><td>Advisory Committee on Fundamental Rights, Minorities and Tribal and Excluded Areas</td><td>Sardar Vallabhbhai Patel</td></tr><tr><td>Drafting Committee</td><td>Dr. B. R. Ambedkar</td></tr><tr><td>Credentials Committee</td><td>Alladi Krishnaswami Ayyar</td></tr><tr><td>House Committee</td><td>B. Pattabhi Sitaramayya</td></tr><tr><td>Order of Business Committee</td><td>K. M. Munshi</td></tr><tr><td>Committee on the Functions of the Constituent Assembly</td><td>G. V. Mavalankar</td></tr></tbody></table>
      <div class="cp-note trick"><b>Prasad</b> = procedure (Rules, Steering, Finance, Flag). <b>Nehru</b> = the three Union/States committees. <b>Patel</b> = Advisory (rights).</div>
      <div class="cp-note trap">Ambedkar chaired only the <b>Drafting</b> Committee, not the Steering Committee.</div>
      <div class="cp-mnemonic"><b>P</b>rasad → <b>P</b>rocedure; <b>N</b>ehru → <b>N</b>ation's Union; <b>P</b>atel → <b>P</b>rotection of rights.</div>
      <div class="cp-chips"><span>Committees</span><span>Chairmen</span><span>Match type</span></div>
    `
  },

  /* ─────────── 106 · QUESTION ─────────── */
  106: {
    questext: "Who chaired the Union Constitution Committee of the Constituent Assembly?",
    options: ["Dr. Rajendra Prasad", "Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Dr. B. R. Ambedkar"],
    correct: "3",
    exptext: "✅ Jawaharlal Nehru chaired the Union Constitution Committee. 📌 He also chaired the Union Powers and States Committees. ❌ Prasad chaired the procedure committees; Patel the Advisory Committee."
  },

  /* ─────────── 107 · QUESTION ─────────── */
  107: {
    questext: "The Advisory Committee on Fundamental Rights, Minorities and Tribal and Excluded Areas was chaired by:",
    options: ["Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Dr. B. R. Ambedkar", "K. M. Munshi"],
    correct: "1",
    exptext: "✅ Sardar Patel chaired this committee. 📌 Patel = rights and minorities. ❌ Ambedkar chaired the Drafting Committee."
  },

  /* ─────────── 108 · QUESTION ─────────── */
  108: {
    questext: "Which of the following committees was NOT chaired by Dr. Rajendra Prasad?",
    options: ["Rules of Procedure Committee", "Steering Committee", "Union Powers Committee", "Finance and Staff Committee"],
    correct: "3",
    exptext: "✅ Jawaharlal Nehru chaired the Union Powers Committee. 📌 Prasad chaired Rules of Procedure, Steering, Finance and Staff and the Flag committee. ❌ The other three were chaired by Prasad."
  },

  /* ─────────── 109 · QUESTION ─────────── */
  109: {
    questext: "Who was the Chairman of the Credentials Committee of the Constituent Assembly?",
    options: ["Dr. B. R. Ambedkar", "Pattabhi Sitaramayya", "G. V. Mavalankar", "Alladi Krishnaswami Ayyar"],
    correct: "4",
    exptext: "✅ Alladi Krishnaswami Ayyar chaired the Credentials Committee. 📌 He was also a member of the Drafting Committee. ❌ The other names chaired different committees."
  },

  /* ─────────── 110 · CONCEPT PAGE — The Drafting Committee ─────────── */
  110: {
    type: "concept",
    icon: "✍️",
    accent: "#0891b2",
    pauseTimer: true,
    title: "The Drafting Committee",
    html: `
      <p class="cp-lead">The <b>Drafting Committee</b> examined the draft text of the Constitution prepared by the Constitutional Advisor (<b>B. N. Rau</b>) and prepared the draft Constitution. It was chaired by <b>Dr. B. R. Ambedkar</b>, who is called the <u>Father of the Indian Constitution</u>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>29 Aug 1947</b><span>Set up</span></div><div class="cp-stat"><b>7</b><span>Members</span></div><div class="cp-stat"><b>21 Feb 1948</b><span>Draft submitted</span></div><div class="cp-stat"><b>Ambedkar</b><span>Chairman</span></div></div>
      <div class="cp-divider">Members</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">📋 Members</div>Dr. B. R. Ambedkar (Chairman), N. Gopalaswami Ayyangar, Alladi Krishnaswami Ayyar, K. M. Munshi, Syed Mohammad Saadullah, N. Madhava Rao and T. T. Krishnamachari.</div><div class="cp-card amber"><div class="cp-card-title">🔄 Replacements</div>N. Madhava Rao replaced B. L. Mitter. T. T. Krishnamachari replaced D. P. Khaitan, who died in 1948.</div></div>
      <div class="cp-note exam">The Committee submitted the <b>Draft Constitution</b> to the President of the Constituent Assembly on <b>21 February 1948</b>.</div>
      <div class="cp-note trap">Jawaharlal Nehru and Sardar Patel were <u>not</u> members of the Drafting Committee.</div>
      <div class="cp-mnemonic">Drafting = <b>7</b> members, set up <b>29 Aug</b>, draft on <b>21 Feb</b>.</div>
      <div class="cp-chips"><span>Drafting Committee</span><span>Ambedkar</span><span>7 members</span></div>
    `
  },

  /* ─────────── 111 · QUESTION ─────────── */
  111: {
    questext: "Who was the Chairman of the Drafting Committee of the Constituent Assembly?",
    options: ["Dr. B. R. Ambedkar", "Jawaharlal Nehru", "Dr. Rajendra Prasad", "Sardar Vallabhbhai Patel"],
    correct: "1",
    exptext: "✅ Dr. B. R. Ambedkar chaired the Drafting Committee. 📌 He is called the Father of the Indian Constitution. ❌ The other three chaired different committees."
  },

  /* ─────────── 112 · QUESTION ─────────── */
  112: {
    questext: "The Drafting Committee of the Constituent Assembly was set up on:",
    options: ["9 December 1946", "29 August 1947", "26 November 1949", "21 February 1948"],
    correct: "2",
    exptext: "✅ It was set up on 29 August 1947. 📌 It submitted its draft on 21 February 1948. ❌ 9 December 1946 is the first meeting; 26 November 1949 is adoption."
  },

  /* ─────────── 113 · QUESTION ─────────── */
  113: {
    questext: "Which of the following was NOT a member of the Drafting Committee?",
    options: ["Jawaharlal Nehru", "K. M. Munshi", "Alladi Krishnaswami Ayyar", "N. Gopalaswami Ayyangar"],
    correct: "1",
    exptext: "✅ Nehru was not a member of the Drafting Committee. 📌 He chaired three other committees. ❌ The other three were members."
  },

  /* ─────────── 114 · QUESTION ─────────── */
  114: {
    questext: "The Draft Constitution was submitted to the President of the Constituent Assembly on:",
    options: ["29 August 1947", "26 November 1949", "24 January 1950", "21 February 1948"],
    correct: "4",
    exptext: "✅ It was submitted on 21 February 1948. 📌 Adoption came more than a year later. ❌ The other dates are linked with the setting up, adoption and signing."
  },

  /* ─────────── 115 · QUESTION ─────────── */
  115: {
    questext: "Who replaced D. P. Khaitan on the Drafting Committee after his death in 1948?",
    options: ["N. Madhava Rao", "K. M. Munshi", "T. T. Krishnamachari", "Syed Mohammad Saadullah"],
    correct: "3",
    exptext: "✅ T. T. Krishnamachari took the seat. 📌 N. Madhava Rao replaced B. L. Mitter. ❌ Munshi and Saadullah were original members."
  },

  /* ─────────── 116 · CONCEPT PAGE — Adoption and Enforcement of the Constitution ─────────── */
  116: {
    type: "concept",
    icon: "📅",
    accent: "#dc2626",
    pauseTimer: true,
    title: "Adoption and Enforcement of the Constitution",
    html: `
      <p class="cp-lead">After about <b>three years of work</b>, the Constituent Assembly <u>adopted</u> the Constitution on <b>26 November 1949</b>. Some parts started at once and the rest on <b>26 January 1950</b>.</p>
      <div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/5.png" alt="Timeline of the making of the Constitution" style="display:block;width:100%;max-width:320px;max-height:200px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Date</th><th>Event</th></tr></thead><tbody><tr><td>9 Dec 1946</td><td>First meeting of the Constituent Assembly</td></tr><tr><td>29 Aug 1947</td><td>Drafting Committee set up</td></tr><tr><td>21 Feb 1948</td><td>Draft Constitution submitted</td></tr><tr><td>26 Nov 1949</td><td>Third reading completed; Constitution adopted</td></tr><tr><td>24 Jan 1950</td><td>Members signed the Constitution</td></tr><tr><td>26 Jan 1950</td><td>Constitution came into full force</td></tr></tbody></table>
      <div class="cp-note exam">Provisions on <b>citizenship, elections and the provisional Parliament</b> came into force on <b>26 November 1949</b>. The rest came into force on <b>26 January 1950</b>, called the ‘date of its commencement’.</div>
      <div class="cp-note info">26 January was chosen because the Congress had declared <b>Purna Swaraj</b> on 26 January 1930.</div>
      <div class="cp-note trap">Date of <b>adoption</b> (26 Nov 1949) is not the date of <b>commencement</b> (26 Jan 1950).</div>
      <div class="cp-mnemonic"><b>Nov</b> = <b>N</b>ow some parts; <b>Jan</b> = <b>J</b>oins all parts.</div>
      <div class="cp-chips"><span>26 Nov 1949</span><span>24 Jan 1950</span><span>26 Jan 1950</span></div>
    `
  },

  /* ─────────── 117 · QUESTION ─────────── */
  117: {
    questext: "The provisions relating to citizenship, elections and the provisional Parliament came into force on:",
    options: ["26 January 1950", "26 November 1949", "15 August 1947", "24 January 1950"],
    correct: "2",
    exptext: "✅ These provisions applied from 26 November 1949. 📌 The rest of the Constitution came into force on 26 January 1950. ❌ 24 January 1950 is the date of signing."
  },

  /* ─────────── 118 · QUESTION ─────────── */
  118: {
    questext: "The Constitution of India came into full operation on:",
    options: ["26 January 1950", "26 November 1949", "24 January 1950", "15 August 1947"],
    correct: "1",
    exptext: "✅ It commenced on 26 January 1950. 📌 This date is called the date of its commencement. ❌ 26 November 1949 is the date of adoption."
  },

  /* ─────────── 119 · QUESTION ─────────── */
  119: {
    questext: "On which date did the members of the Constituent Assembly sign the Constitution?",
    options: ["26 November 1949", "26 January 1950", "21 February 1948", "24 January 1950"],
    correct: "4",
    exptext: "✅ The members signed on 24 January 1950. 📌 Two days later, the Constitution came into force. ❌ The other dates are for adoption, commencement and the draft."
  },

  /* ─────────── 120 · QUESTION ─────────── */
  120: {
    questext: "Why was 26 January chosen as the date for the commencement of the Constitution?",
    options: ["It was the birthday of Dr. Ambedkar", "It was the day of Independence", "It marked the anniversary of the Purna Swaraj declaration of 1930", "It was the day the Constituent Assembly first met"],
    correct: "3",
    exptext: "✅ It was chosen to honour the Purna Swaraj Day of 1930. 📌 Republic Day is celebrated on this date. ❌ Ambedkar was born on 14 April; Independence Day is 15 August."
  },

  /* ─────────── 121 · QUESTION ─────────── */
  121: {
    questext: "Arrange these events in order: 1. Drafting Committee set up 2. Draft Constitution submitted 3. Constitution adopted 4. Constitution came into force.",
    options: ["1, 2, 3, 4", "2, 1, 3, 4", "1, 3, 2, 4", "1, 2, 4, 3"],
    correct: "1",
    exptext: "✅ Order: 29 Aug 1947, 21 Feb 1948, 26 Nov 1949, 26 Jan 1950. 📌 Set up → Draft → Adopted → In force. ❌ The other orders break the timeline."
  },

  /* ─────────── 122 · CONCEPT PAGE — Constitution Day ─────────── */
  122: {
    type: "concept",
    icon: "🎉",
    accent: "#7c3aed",
    pauseTimer: true,
    title: "Constitution Day",
    html: `
      <p class="cp-lead"><b>Constitution Day</b> (<i>Samvidhan Divas</i>) is observed on <b>26 November</b>, the day the Constitution was adopted.</p>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">🎂 Why?</div>It marks the <b>125th birth anniversary of Dr. B. R. Ambedkar</b> and honours the adoption of the Constitution.</div><div class="cp-card green"><div class="cp-card-title">🏛️ Who decided?</div>The Government of India's <b>Ministry of Social Justice and Empowerment</b> decided to observe it from <b>2015</b>.</div></div>
      <div class="cp-note trap">Constitution Day is on <b>26 November</b>, while Republic Day is on <b>26 January</b>.</div>
      <div class="cp-mnemonic"><b>Nov 26</b> = <b>Constitution Day</b>; <b>Jan 26</b> = <b>Republic Day</b>.</div>
      <div class="cp-chips"><span>26 November</span><span>Since 2015</span><span>Ambedkar</span></div>
    `
  },

  /* ─────────── 123 · QUESTION ─────────── */
  123: {
    questext: "Constitution Day is observed in India every year on:",
    options: ["26 January", "26 November", "15 August", "14 April"],
    correct: "2",
    exptext: "✅ It is observed on 26 November, the date of adoption. 📌 The practice started in 2015. ❌ 26 January is Republic Day and 14 April is Ambedkar's birth date."
  },

  /* ─────────── 124 · QUESTION ─────────── */
  124: {
    questext: "Which Ministry of the Government of India decided to observe Constitution Day from 2015?",
    options: ["Ministry of Law and Justice", "Ministry of Home Affairs", "Ministry of Parliamentary Affairs", "Ministry of Social Justice and Empowerment"],
    correct: "4",
    exptext: "✅ The Ministry of Social Justice and Empowerment took the decision. 📌 It was linked to the 125th birth anniversary of Dr. Ambedkar. ❌ The other ministries did not make this decision."
  },

  /* ─────────── 125 · CONCEPT PAGE — 3. Different Sources of Indian Constitution ─────────── */
  125: {
    type: "concept",
    icon: "🌍",
    accent: "#ea580c",
    pauseTimer: true,
    title: "3. Different Sources of Indian Constitution",
    html: `
      <p class="cp-lead">The <u>skeleton</u> of our Constitution came from the <b>Government of India Act, 1935</b> (federal scheme, office of Governor, emergency powers and more). Many other features were <b>borrowed from other countries</b>.</p>
      <table><thead><tr><th>Source</th><th>Features borrowed</th></tr></thead><tbody><tr><td>Government of India Act, 1935</td><td>Federal system, office of Governor, emergency powers, Public Service Commissions</td></tr><tr><td>Britain</td><td>Law-making procedures, rule of law, single citizenship, bicameral parliamentary system, office of CAG</td></tr><tr><td>USA</td><td>Independence of judiciary, judicial review, fundamental rights, removal of Supreme Court and High Court judges, Preamble, functions of President and Vice-President</td></tr><tr><td>Canada</td><td>Federation with a strong Centre, residuary powers to the Centre, Supreme Court's advisory jurisdiction</td></tr><tr><td>Ireland</td><td>Directive Principles of State Policy, method of Presidential elections, nomination of members to Rajya Sabha by the President</td></tr><tr><td>Weimar Constitution of Germany</td><td>Suspension of fundamental rights during an Emergency</td></tr><tr><td>Australia</td><td>Concurrent List, trade and commerce provisions</td></tr><tr><td>South Africa</td><td>Amendment of the Constitution by 2/3 majority; election of Rajya Sabha members by proportional representation</td></tr><tr><td>France</td><td>Republican system; ideals of Liberty, Equality and Fraternity</td></tr><tr><td>Former USSR</td><td>Ideals of justice in the Preamble; Fundamental Duties</td></tr></tbody></table>
      <div class="cp-note exam">One of the <b>most repeated</b> topics in competitive exams. Learn each country with its <u>one or two key features</u>.</div>
      <div class="cp-note trap"><b>Fundamental Rights</b> came from the <u>USA</u>, not Britain. <b>DPSP</b> came from <u>Ireland</u>. <b>Fundamental Duties</b> came from the <u>USSR</u>.</div>
      <div class="cp-mnemonic"><b>I</b>re-<b>D</b>PSP, <b>A</b>us-<b>C</b>oncurrent, <b>C</b>an-<b>C</b>entre, <b>SA</b>-<b>A</b>mendment, <b>US</b>-Rights + Judicial review, <b>Fr</b>-Liberty, <b>Ger</b>-Emergency, <b>USSR</b>-Duties.</div>
      <details class="cp-collapse"><summary>A quick way to remember</summary><p>Think of the Constitution as a patchwork quilt. The cloth is the Government of India Act, 1935. The patches come from Britain (Parliament), USA (rights), Canada (strong Centre), Ireland (DPSP), Australia (Concurrent List), South Africa (amendment), Germany (emergency), France (Liberty, Equality, Fraternity) and USSR (Duties).</p></details>
      <div class="cp-chips"><span>Sources</span><span>Borrowed features</span><span>High-yield</span></div>
    `
  },

  /* ─────────── 126 · QUESTION ─────────── */
  126: {
    questext: "The Directive Principles of State Policy in the Indian Constitution were borrowed from the Constitution of:",
    options: ["USA", "Canada", "Ireland", "Australia"],
    correct: "3",
    exptext: "✅ DPSP were borrowed from Ireland. 📌 Ireland also gave the method of Presidential election and Rajya Sabha nominations. ❌ USA gave rights and judicial review; Canada gave the strong Centre; Australia gave the Concurrent List."
  },

  /* ─────────── 127 · QUESTION ─────────── */
  127: {
    questext: "The idea of the Concurrent List in the Indian Constitution was borrowed from:",
    options: ["Canada", "Australia", "Ireland", "South Africa"],
    correct: "2",
    exptext: "✅ The Concurrent List came from Australia. 📌 Australia also gave the trade and commerce provisions. ❌ Canada gave the strong Centre and residuary powers."
  },

  /* ─────────── 128 · QUESTION ─────────── */
  128: {
    questext: "Judicial review and the removal of Supreme Court and High Court judges are features borrowed from the Constitution of:",
    options: ["USA", "Britain", "Canada", "France"],
    correct: "1",
    exptext: "✅ These came from the USA. 📌 The USA also gave Fundamental Rights, the Preamble and the independence of the judiciary. ❌ Britain gave law-making procedures; Canada gave the strong Centre."
  },

  /* ─────────── 129 · QUESTION ─────────── */
  129: {
    questext: "A federation with a strong Centre and the vesting of residuary powers in the Centre were borrowed from the Constitution of:",
    options: ["USA", "Australia", "Ireland", "Canada"],
    correct: "4",
    exptext: "✅ Canada's model gave a strong Centre with residuary powers. 📌 Canada also gave the advisory jurisdiction of the Supreme Court. ❌ The USA gave rights; Australia the Concurrent List."
  },

  /* ─────────── 130 · QUESTION ─────────── */
  130: {
    questext: "The procedure of amending the Constitution (2/3 majority) and the election of Rajya Sabha members by proportional representation are borrowed from:",
    options: ["Ireland", "Australia", "South Africa", "France"],
    correct: "3",
    exptext: "✅ Both were borrowed from South Africa. 📌 Ireland gave the Rajya Sabha nominations, not the election method. ❌ France and Australia gave different features."
  },

  /* ─────────── 131 · QUESTION ─────────── */
  131: {
    questext: "Which of the following features of the Indian Constitution was NOT borrowed from Britain?",
    options: ["Law-making procedures", "Fundamental Rights", "Rule of law", "Office of the Comptroller and Auditor General"],
    correct: "2",
    exptext: "✅ Fundamental Rights came from the USA. 📌 Britain gave law-making procedures, rule of law, single citizenship, a bicameral parliamentary system and the CAG. ❌ The other three are British features."
  },

  /* ─────────── 132 · QUESTION ─────────── */
  132: {
    questext: "Match the Constitution with the feature borrowed from it. A. Weimar Constitution of Germany B. French Constitution C. Constitution of the former USSR D. Irish Constitution. 1. Fundamental Duties 2. Suspension of fundamental rights during Emergency 3. Liberty, Equality and Fraternity 4. Nomination of Rajya Sabha members.",
    options: ["A-1, B-3, C-2, D-4", "A-3, B-2, C-1, D-4", "A-2, B-3, C-1, D-4", "A-2, B-1, C-3, D-4"],
    correct: "3",
    exptext: "✅ A-2 (Germany: Emergency), B-3 (France: Liberty, Equality, Fraternity), C-1 (USSR: Fundamental Duties), D-4 (Ireland: Rajya Sabha nominations). 📌 Germany = Emergency; France = Liberty; USSR = Duties. ❌ The other options swap the features."
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/thumbnail.png → ENTRY 1 (class overview, “thumb” field) — not numbered
     images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/1.png → Concept page “Administrative & Legislative Reforms Before 1857”
     images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/2.png → Concept page “Administrative & Legislative Reforms After 1857”
     images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/3.png → Concept page “Montagu-Chelmsford Reforms and the Government of India Act, 1919”
     images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/4.png → Concept page “The Government of India Act, 1935”
     images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/5.png → Concept page “Adoption and Enforcement of the Constitution”

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name inside the images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/ folder)
   images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/thumbnail.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920×1080 px, ultra-sharp, in a premium, classic, refined editorial style (NOT cartoonish: no cartoon, toy-like, clip-art, comic or glossy cartoon-3D look). Deep midnight-navy and near-black base with a smooth, subtle sky-blue gradient (accent #0ea5e9) and restrained champagne-gold highlights; soft cinematic lighting with a gentle warm glow behind the right-centre of the frame, where a teacher's photo will be placed later; fine dark vignette on the edges, very subtle fine grain texture, realistic shallow depth of field. Place only 3 elegant, realistic, softly blurred objects mostly on the right and in the back: an antique leather-bound book with a fine gold-embossed spine, a brass set of balance scales of justice, and a rolled parchment scroll with a quill, rendered matte or brushed-metal with natural reflections. Do NOT add any star, starburst or explosion sticker. Add ONE blank premium emblem: a refined, classic round seal with a thin champagne-gold rim, fine engraved double border and a smooth, completely EMPTY dark-navy centre with a faint glow, realistic brushed-metal / enamel finish, about 20% of the frame height, placed near the lower centre of the frame (about 60% from the left and 72% from the top) so I can write my own text inside it later. Keep the LEFT 62% of the frame calm, dark and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image (the emblem stays blank). Sophisticated, balanced, high-contrast, professional composition.
   images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/1.png: Create a clean flat vector diagram on a dark navy background, 16:9, 1200×675 px, very few labels, VERY LARGE bold white text, thick lines and simple shapes so it stays readable when shown small. No people, no logos, no watermarks. Use these exact short English labels only: a horizontal timeline with 6 dots and the labels “1773”, “1784”, “1793”, “1813”, “1833”, “1853”, each with a tiny label under it: “Regulating”, “Pitt's”, “Charter”, “Charter”, “Charter”, “Charter”. Title: “Before 1857”. Accent colour sky blue.
   images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/2.png: Create a clean flat vector diagram on a dark navy background, 16:9, 1200×675 px, very few labels, VERY LARGE bold white text, thick lines and simple shapes so it stays readable when shown small. No people, no logos, no watermarks. Use these exact short English labels only: a horizontal timeline with 6 dots and the labels “1858”, “1861”, “1892”, “1909”, “1919”, “1935”, each with a tiny label under it: “Crown”, “Indians”, “Budget”, “Morley-Minto”, “Dyarchy”, “Federation”. Title: “After 1857”. Accent colour amber.
   images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/3.png: Create a clean flat vector diagram on a dark navy background, 16:9, 1200×675 px, very few labels, VERY LARGE bold white text, thick lines and simple shapes so it stays readable when shown small. No people, no logos, no watermarks. Use these exact short English labels only: a simple tree. Top box: “Provincial Subjects”. Two boxes below it, left (green): “Transferred → Ministers”, right (red): “Reserved → Governor”. Title: “Dyarchy 1919”.
   images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/4.png: Create a clean flat vector diagram on a dark navy background, 16:9, 1200×675 px, very few labels, VERY LARGE bold white text, thick lines and simple shapes so it stays readable when shown small. No people, no logos, no watermarks. Use these exact short English labels only: three large equal boxes side by side with labels “Federal List”, “Provincial List”, “Concurrent List”, and small captions under them: “Centre”, “Provinces”, “Both”. Title: “Act of 1935”.
   images/Indian_Polity_and_Constitution/Constitution_Evolution_Making_and_Sources/5.png: Create a clean flat vector diagram on a dark navy background, 16:9, 1200×675 px, very few labels, VERY LARGE bold white text, thick lines and simple shapes so it stays readable when shown small. No people, no logos, no watermarks. Use these exact short English labels only: a horizontal timeline with 6 dots and the labels “1946”, “1947”, “1948”, “1949”, “1950”, with captions: “Assembly meets”, “Drafting Committee”, “Draft ready”, “Adopted 26 Nov”, “In force 26 Jan”. Title: “Making of the Constitution”.

   CHANGE LOG (corrections and additions made to the book's content; nothing of this is written inside the pages)
   1. Original size of the Constitution: the book says 393 Articles; corrected to 395 Articles (22 Parts, 395 Articles, 8 Schedules). Present size added as 25 Parts, 12 Schedules and about 448 Articles (VERIFY the latest article count).
   2. Adoption date: OCR read ‘20 November, 1949’ and ‘26 January, 1930’; written as 26 November 1949 and 26 January 1950.
   3. Regulating Act 1773: judge names corrected to Sir Elijah Impey (first Chief Justice), Robert Chambers, Stephen Lemaistre and John Hyde. ‘Governor of Bengal’ written as Governor-General of Bengal. The Lord North remark is kept as ‘government of Prime Minister Lord North’.
   4. Pitt's India Act 1784: the line about the Governor-General dismissing a failing provincial government was dropped as doubtful; replaced with control over the Presidencies.
   5. Charter Act 1813: added that the tea and China trade monopoly continued (the book only says the monopoly ended).
   6. Charter Act 1833: the year ‘1835’ for Macaulay as Law Commission chairman and the line about Sir James Stephen replacing him were dropped as inaccurate. Added: first Governor-General of India = William Bentinck; no Indian to be barred from office on grounds of religion, birth or descent.
   7. Charter Act 1853: the line ‘followed a report of Governor-General Dalhousie’ was dropped as doubtful. Added that the separate Governor was a Lieutenant Governor and that Company rule ended in 1858.
   8. Government of India Act 1858: added Viceroy title, Lord Canning as first Viceroy, and the abolition of the Board of Control and Court of Directors.
   9. Indian Councils Act 1861: the book repeated the Secretary of State / Council of India text of 1858 under this Act. Replaced with the correct 1861 points (nominated Indian members, portfolio system under Lord Canning, ordinances for 6 months, devolution to Bombay and Madras).
   10. Indian Councils Act 1892: wording clarified; ‘nominated by’ bodies kept as recommended by them.
   11. Morley-Minto 1909 and Montagu-Chelmsford 1919: women's vote written as ‘some Indian women’ (property-based). Council of State figure ‘6)’ read as 60 members (34 elected); Legislative Assembly kept ‘about 144’ (104 elected).
   12. Simon Commission: added that it had no Indian member.
   13. Act of 1935: the book says Dominion Status was ‘promised by the Simon Commission in 1929’; the 1929 promise was made by Viceroy Lord Irwin, so that line was dropped. Added Federal Assembly / Council of State names kept as in the book.
   14. Cripps Mission: added that the proposals were not accepted by the major Indian parties.
   15. Cabinet Mission: ‘Lord Attlee’ written as Prime Minister Clement Attlee; names written as Pethick-Lawrence, Cripps and A. V. Alexander. Added Groups A, B and C (VERIFY if you want this detail).
   16. Indian Independence Act 1947: the Sylhet referendum written as ‘July 1947’ (the date was unclear in the PDF).
   17. Interim Government table: the PDF had blank portfolios for Asaf Ali and C. Rajagopalachari; filled as Railways and Education and Arts. Added a note that the Muslim League members joined in October 1946. I. I. Chundrigar spelling corrected.
   18. First Cabinet table: names corrected to R. K. Shanmukham Chetty, Rafi Ahmed Kidwai, Dr. Syama Prasad Mookerjee and N. V. Gadgil (PDF: V. N. Gadgil). Misaligned OCR portfolios of Nehru were fixed.
   19. Constituent Assembly: added seat figures (389 original, 296 British India and 93 States, 299 after partition), first meeting 9 Dec 1946, and the two Presidents. These were not in the PDF text.
   20. Committees: the PDF list was partly unreadable; added House Committee (Pattabhi Sitaramayya), Order of Business Committee (K. M. Munshi) and Committee on the Functions of the Constituent Assembly (G. V. Mavalankar). Credentials Committee chairman written as Alladi Krishnaswami Ayyar.
   21. Drafting Committee: added the set-up date (29 Aug 1947) and the constitutional advisor B. N. Rau; names of members and replacements written in full from the PDF.
   22. Adoption and enforcement: added the signing date 24 Jan 1950 and the Purna Swaraj link for 26 January.
   23. Constitution Day: Ministry named as Ministry of Social Justice and Empowerment; 125th birth anniversary of Dr. B. R. Ambedkar.
   24. Sources: the PDF text for Germany and Australia was partly garbled; written as ‘suspension of fundamental rights during an Emergency’ (Germany) and ‘Concurrent List, trade and commerce provisions’ (Australia). Ireland's ‘method of Presidential elections’ and ‘nomination of Rajya Sabha members’ kept. Added Public Service Commissions under the 1935 Act.
   25. Scope: the introduction (Politics, Republic of India fact sheet) before ‘Constitution’ was left out as it belongs to the earlier topic.
   ════════════════════════════════════════════════════════════════ */
