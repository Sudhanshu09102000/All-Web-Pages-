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
   INDIAN POLITY AND CONSTITUTION — Evolution of Indian Constitution
   Register it in portalData.js like any other test.
   Entry 1 = CLASS OVERVIEW. Then: concept page → its questions → next concept page …
   Every concept-page title is the same as the subtopic name in the book.
   Format = exactly as in concept-demo.js (type "concept", icon, accent, pauseTimer, html;
   questions: questext, options[4], correct "1".."4", exptext).
   Emphasis: only <u> and <b> (never cp-hl). Images: aaf8c16e-b2dc-40d6-b870-5a23b2af19e3.png … bdcc92f4-8d64-4a3e-afb1-f93bf941b630.png and images/714edc1c-09d3-42f6-83fc-755cfc7ececc.png next to index.html.
════════════════════════════════════════════════════════════════ */

window.TEST_DATA = {
  /* ─────────── 1 · CLASS OVERVIEW ─────────── */
  1: {
    type: "concept",
    icon: "🎯",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      "image": "images/714edc1c-09d3-42f6-83fc-755cfc7ececc.png",
      "banner": "POLITY FOR ALL EXAMS",
      "line1": "EVOLUTION OF",
      "line2": "CONSTITUTION",
      "line3": "1773 → 1950",
      "badge": "FULL CLASS",
      "ribbon": "ACTS • COMMITTEES • MCQs",
      "burst": "All competitive exams",
      "mode": "creator"
    },
    yt: {
      "title": "Evolution of Indian Constitution | 1773 to 1950 All Acts in One Class | Polity for SSC, UPSC, Railways",
      "altTitles": [
        "Regulating Act 1773 to Independence Act 1947 — Full Polity Revision",
        "Government of India Act 1935 & 1919 Explained Simply | Indian Polity",
        "Constituent Assembly Committees & Chairmen | Polity One Shot",
        "Stop Mixing the Acts! Indian Constitution History Made Easy"
      ],
      "description": "How did our Constitution evolve? In this class we go from the Regulating Act of 1773 to the Constituent Assembly and learn every important Act with one simple idea.\n\n📌 IN THIS CLASS\n✅ Political Science basics and thinkers\n✅ Republic of India and Government of India\n✅ Regulating Act 1773 to Charter Act 1853\n✅ Acts of 1858, 1861, 1892, 1909, 1915, 1919, 1935\n✅ Cripps Mission, Cabinet Mission, Mountbatten Plan, Independence Act\n✅ Constituent Assembly committees and chairmen\n✅ Practice questions after every concept\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Introduction and Republic of India\n00:00 Evolution of Indian Constitution\n00:00 Reforms before 1857\n00:00 Reforms after 1857\n00:00 Cripps, Cabinet Mission and Independence Act\n00:00 Constituent Assembly and committees\n\n👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n#IndianPolity #Constitution #SSC #UPSC",
      "tags": [
        "indian polity",
        "evolution of indian constitution",
        "regulating act 1773",
        "government of india act 1935",
        "government of india act 1919",
        "morley minto reforms",
        "cabinet mission plan",
        "constituent assembly",
        "drafting committee",
        "polity for ssc",
        "polity for upsc",
        "lucent general knowledge polity",
        "indian constitution history",
        "polity one shot",
        "competitive exams polity"
      ],
      "hashtags": [
        "IndianPolity",
        "Constitution",
        "SSC",
        "UPSC"
      ],
      "thumbText": "EVOLUTION OF CONSTITUTION",
      "pinnedComment": "📌 Solve the practice questions after each concept page and write your score below. Which Act do you mix up the most — 1909 or 1919? 👇",
      "communityPost": "🏛️ New Polity class is live: Evolution of the Indian Constitution from 1773 to 1950 with committees and MCQs. Start with the overview and tell me your score! 🎯",
      "chapters": "00:00 Class overview\n00:00 Introduction and Republic of India\n00:00 Evolution of Indian Constitution\n00:00 Reforms before 1857\n00:00 Reforms after 1857\n00:00 Cripps, Cabinet Mission and Independence Act\n00:00 Constituent Assembly and committees",
      "playlist": "Indian Polity — Complete Course"
    },
    html: `
      <p class="cp-lead">This class covers the <u>opening of Indian Polity</u>: how the idea of government began, what the Republic of India is, and — most important — <u>how our Constitution evolved</u> from the Regulating Act of 1773 to the Constituent Assembly of 1946–50. By the end you will <b>link every Act to its one big idea</b>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>29</b><span>Concept pages</span></div><div class="cp-stat"><b>105</b><span>Practice questions</span></div><div class="cp-stat"><b>25+</b><span>British-era Acts &amp; plans</span></div><div class="cp-stat"><b>~90 min</b><span>Time needed</span></div></div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline"><li><b>Introduction → Republic → Government of India → Constitution</b><br>Basic ideas, symbols and the structure of the Government.</li><li><b>1. Evolution of Indian Constitution</b><br>The big picture from 1773 to 1950.</li><li><b>Reforms Before 1857</b><br>Regulating Act 1773, Pitt's India Act 1784, Charter Acts 1793, 1813, 1833, 1853.</li><li><b>Reforms After 1857</b><br>Acts of 1858, 1861, 1892, 1909, 1915, 1919 and 1935; Simon Commission.</li><li><b>Road to Independence</b><br>Cripps Mission, Cabinet Mission, Mountbatten Plan, Independence Act 1947, Interim Government and First Cabinet.</li><li><b>2. Constituent Assembly and Making of the Constitution</b><br>How the Assembly worked and who led each committee.</li></ul>
      <div class="cp-divider">What you will be able to do</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">📜 Name the Act</div>Link each Act to its <u>one-line idea</u> in seconds.</div><div class="cp-card green"><div class="cp-card-title">🧩 Spot the trap</div>Tell apart look-alike Acts (1909 vs 1919, 1892 vs 1861, Cripps vs Cabinet Mission).</div><div class="cp-card amber"><div class="cp-card-title">🗂️ Match the committee</div>Recall every Constituent Assembly committee and its chairman.</div><div class="cp-card red"><div class="cp-card-title">🎯 Solve MCQs fast</div>Answer chronology, statement and match-type questions with confidence.</div></div>
      <div class="cp-note exam"><b>Why it matters:</b> Polity questions in SSC, UPSC, Banking, Railways and Defence exams are repeatedly asked from the <u>Acts of 1773, 1858, 1909, 1919 and 1935</u> and from the <u>Constituent Assembly</u>.</div>
      <div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages, so take your time.</div>
      <div class="cp-chips"><span>Indian Polity</span><span>Constitution</span><span>British Acts</span><span>Constituent Assembly</span><span>All competitive exams</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE — Introduction — Political Science & Early Thinkers ─────────── */
  2: {
    type: "concept",
    icon: "🏛️",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Introduction — Political Science & Early Thinkers",
    html: `
      <p class="cp-lead"><b>Political Science</b> is the study of the <u>state and the government</u> — how power is organised, used and limited. Even the word <u>Politics</u> comes from ancient Greece.</p>
      <div class="cp-stats"><div class="cp-stat"><b>Polis</b><span>= City-state</span></div><div class="cp-stat"><b>Aristotle</b><span>Father of Pol. Science</span></div><div class="cp-stat"><b>Manu</b><span>1st Indian thinker</span></div><div class="cp-stat"><b>Kautilya</b><span>Arthashastra</span></div></div>
      <div class="cp-divider">1 · Where does the word “Politics” come from?</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Greek word “Polis”</div><b>Polis</b> means a <u>city-state</u>, the general form of political organisation in ancient Greece.</div><div class="cp-card green"><div class="cp-card-title">From Polis to Politics</div>Everything about the polis — its citizens, rules and government — came to be called <b>Politics</b>.</div></div>
      <div class="cp-divider">2 · Greek thinkers — who came first?</div>
      <ul class="cp-timeline"><li><b>Sophists</b><br>Wandering teachers of wisdom. <u>Protagoras</u> and <u>Gorgias</u> were the first in Athens to explain a political theory.</li><li><b>Socrates, Plato and Aristotle</b><br>Later they studied the problems of the state and the government in a scientific way.</li><li><b>Plato</b><br>The student of Socrates and the teacher of Aristotle.</li><li><b>Aristotle</b><br>The student of Plato. He is regarded as the <u>father of the science of Politics in the West</u>. His famous book is <b>“Politics”</b>.</li></ul>
      <div class="cp-mnemonic">Teacher chain: <b>S → P → A</b> — <b>S</b>ocrates taught <b>P</b>lato, Plato taught <b>A</b>ristotle.</div>
      <div class="cp-note remember">Aristotle said: “Man is by nature a <u>political animal</u>”. A person who lives without a state is either above humanity or below it.</div>
      <div class="cp-divider">3 · Early Indian thinkers</div>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">Manu</div>Considered the <u>first political thinker of India</u>. His book <b>Manusmriti</b> is regarded as the first book of law in India.</div><div class="cp-card red"><div class="cp-card-title">Kautilya (Chanakya)</div>He gave a concrete shape to political thinking in his book <b>Arthashastra</b>, a well-known book of Indian polity.</div></div>
      <table><thead><tr><th>Thinker</th><th>Land</th><th>Known for</th></tr></thead><tbody><tr><td>Protagoras, Gorgias</td><td>Greece</td><td>First to explain political theory in Athens (Sophists)</td></tr><tr><td>Aristotle</td><td>Greece</td><td>Father of Political Science in the West; book <i>Politics</i></td></tr><tr><td>Manu</td><td>India</td><td>First political thinker; <i>Manusmriti</i></td></tr><tr><td>Kautilya</td><td>India</td><td><i>Arthashastra</i> (statecraft, economy, administration)</td></tr></tbody></table>
      <div class="cp-note exam">Kautilya, Chanakya and Vishnugupta are the <b>same person</b>, the adviser of Chandragupta Maurya. The <i>Arthashastra</i> manuscript was found in 1905 by R. Shamasastry.</div>
      <div class="cp-note trap">Do not mix up the titles: <b>Aristotle</b> = father of Political Science (West); <b>Manu</b> = first political thinker of India; <b>Kautilya</b> = Arthashastra.</div>
      <div class="cp-chips"><span>Political Science</span><span>Polis</span><span>Aristotle</span><span>Kautilya</span><span>Manusmriti</span></div>
    `
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "Who is regarded as the ‘father of Political Science’ in the West?",
    options: ["Aristotle", "Protagoras", "Plato", "Socrates"],
    correct: "1",
    exptext: "✅ Aristotle. 📌 Plato was his teacher and Socrates was Plato's teacher, but only Aristotle carries the ‘father of Political Science’ title. ❌ Protagoras was a Sophist.",
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "The word ‘Politics’ is derived from the Greek word ‘Polis’, which means:",
    options: ["A law", "A city-state", "A citizen", "A king"],
    correct: "2",
    exptext: "✅ Polis = city-state, the general form of political organisation in ancient Greece. 📌 Politics literally means ‘matters of the polis’.",
  },

  /* ─────────── 5 · QUESTION ─────────── */
  5: {
    questext: "Which Indian thinker is considered the first political thinker of India, and which book is linked to him?",
    options: ["Kautilya — Rajatarangini", "Kautilya — Manusmriti", "Manu — Arthashastra", "Manu — Manusmriti"],
    correct: "4",
    exptext: "✅ Manu — Manusmriti, regarded as the first book of law in India. 📌 Arthashastra belongs to Kautilya (Chanakya). ❌ Rajatarangini is Kalhana's history of Kashmir.",
  },

  /* ─────────── 6 · CONCEPT PAGE — Republic of India ─────────── */
  6: {
    type: "concept",
    icon: "🇮🇳",
    accent: "#f97316",
    pauseTimer: true,
    title: "Republic of India",
    html: `
      <p class="cp-lead">India is a <u>union of states</u> and a <b>Sovereign, Socialist, Secular, Democratic Republic</b> with a <u>parliamentary system</u> of government. Everything runs according to the <b>Constitution</b>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>26 Nov 1949</b><span>Constitution adopted</span></div><div class="cp-stat"><b>26 Jan 1950</b><span>Came into force</span></div><div class="cp-stat"><b>Parliamentary</b><span>System</span></div><div class="cp-stat"><b>Federal</b><span>with unitary features</span></div></div>
      <div class="cp-divider">1 · What do the five words mean?</div>
      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">Sovereign</div>India takes its own decisions — no outside power controls it.</div><div class="cp-card amber"><div class="cp-card-title">Socialist</div>Fair distribution of wealth and equal opportunity.</div><div class="cp-card teal"><div class="cp-card-title">Secular</div>The State has no official religion and treats all religions equally.</div><div class="cp-card green"><div class="cp-card-title">Democratic</div>Power belongs to the people, who elect their rulers.</div><div class="cp-card red"><div class="cp-card-title">Republic</div>The head of the State is elected, not hereditary.</div></div>
      <div class="cp-note exam">The words <b>Socialist</b> and <b>Secular</b> (and ‘Integrity’) were added to the Preamble by the <u>42nd Amendment, 1976</u>.</div>
      <div class="cp-divider">2 · Who rules — the Union</div>
      <div class="cp-grid c2"><div class="cp-card violet"><div class="cp-card-title">President</div>The <u>constitutional head</u> (nominal head) of the Union executive.</div><div class="cp-card pink"><div class="cp-card-title">Council of Ministers + PM</div>Under <b>Article 74(1)</b> a Council of Ministers headed by the Prime Minister <u>aids and advises</u> the President.</div></div>
      <div class="cp-note remember">The President must act on this advice. The <b>real executive power</b> lies with the Council of Ministers with the <u>Prime Minister as its head</u>.</div>
      <div class="cp-note exam">The 42nd Amendment made the advice <b>binding</b>; the 44th Amendment (1978) lets the President send it back <u>once</u> for reconsideration, but the second advice is binding.</div>
      <div class="cp-divider">3 · The State level mirrors the Union</div>
      <table><thead><tr><th>Level</th><th>Constitutional head</th><th>Real power</th><th>Responsible to</th></tr></thead><tbody><tr><td>Union</td><td>President</td><td>PM + Council of Ministers</td><td>Lok Sabha (House of the People)</td></tr><tr><td>State</td><td>Governor</td><td>Chief Minister + Council of Ministers</td><td>Legislative Assembly of the State</td></tr></tbody></table>
      <div class="cp-divider">4 · Federal, but with a strong Centre</div>
      <ol class="cp-steps"><li>The Constitution is <b>federal in structure</b> but has <b>unitary features</b>.</li><li>It divides law-making powers between Parliament and the State Legislatures.</li><li><b>Residual powers</b> (subjects not listed anywhere) are vested in <u>Parliament</u>.</li><li>The power to <b>amend the Constitution</b> also belongs to Parliament (Article 368).</li></ol>
      <div class="cp-note tip">Independent bodies protected by the Constitution: <b>Judiciary, CAG, Public Service Commissions and the Chief Election Commissioner</b>.</div>
      <div class="cp-chips"><span>Preamble</span><span>Article 74</span><span>Parliamentary system</span><span>Federal structure</span></div>
    `
  },

  /* ─────────── 7 · QUESTION ─────────── */
  7: {
    questext: "Article 74(1) of the Constitution provides for:",
    options: ["A Council of Ministers headed by the Prime Minister to aid and advise the President", "Impeachment of the President", "Appointment of the Governor", "Proclamation of Emergency"],
    correct: "1",
    exptext: "✅ Article 74(1) = Council of Ministers with the PM at the head to aid and advise the President. 📌 Real executive power lies with this council. ❌ Impeachment is Article 61.",
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "At the Union level, the Council of Ministers is collectively responsible to:",
    options: ["Lok Sabha", "Rajya Sabha", "The Supreme Court", "The President"],
    correct: "1",
    exptext: "✅ Lok Sabha (House of the People). 📌 In a state, the council is responsible to the Legislative Assembly. If the Lok Sabha loses confidence, the ministry must go.",
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "The Constitution of India was adopted and came into force respectively on:",
    options: ["26 Nov 1949 and 26 Jan 1950", "26 Jan 1950 and 26 Nov 1949", "15 Aug 1947 and 26 Jan 1950", "26 Nov 1949 and 15 Aug 1950"],
    correct: "1",
    exptext: "✅ Adopted 26 Nov 1949 (now Constitution Day) and enforced 26 Jan 1950 (Republic Day). 📌 15 Aug 1947 is Independence Day.",
  },

  /* ─────────── 10 · QUESTION ─────────── */
  10: {
    questext: "The words ‘Socialist’ and ‘Secular’ were added to the Preamble by which Amendment?",
    options: ["24th Amendment, 1971", "44th Amendment, 1978", "86th Amendment, 2002", "42nd Amendment, 1976"],
    correct: "4",
    exptext: "✅ 42nd Amendment (1976), often called the ‘Mini-Constitution’. 📌 It also added the word ‘Integrity’. ❌ 44th (1978) restored many rights curtailed earlier.",
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "Which Amendment made the President bound by the advice of the Council of Ministers?",
    options: ["61st Amendment", "44th Amendment", "42nd Amendment", "1st Amendment"],
    correct: "3",
    exptext: "✅ 42nd Amendment (1976) made the advice binding. 📌 The 44th (1978) allowed the President to return the advice once for reconsideration; after that it is binding.",
  },

  /* ─────────── 12 · CONCEPT PAGE — Government of India ─────────── */
  12: {
    type: "concept",
    icon: "🏢",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Government of India",
    html: `
      <p class="cp-lead">This page gives a <u>snapshot of India's government</u> — its name, type, capital, branches and symbols. These are favourite one-line facts for exams.</p>
      <div class="cp-stats"><div class="cp-stat"><b>28</b><span>States</span></div><div class="cp-stat"><b>8</b><span>Union Territories</span></div><div class="cp-stat"><b>New Delhi</b><span>Capital</span></div><div class="cp-stat"><b>15 Aug 1947</b><span>Independence</span></div></div>
      <table><thead><tr><th>Particulars</th><th>Description</th></tr></thead><tbody><tr><td>Country name</td><td>Republic of India; <b>Bharat Ganarajya</b></td></tr><tr><td>Government type</td><td>Sovereign Socialist Secular Democratic Republic with a parliamentary system</td></tr><tr><td>Capital</td><td>New Delhi</td></tr><tr><td>Administrative divisions</td><td>28 States and 8 Union Territories</td></tr><tr><td>Independence</td><td>15 August 1947 (from British colonial rule)</td></tr><tr><td>Constitution</td><td>Came into force on 26 January 1950</td></tr><tr><td>Legal system</td><td>The Constitution is the fountain source of the legal system</td></tr></tbody></table>
      <div class="cp-divider">1 · The three branches</div>
      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">Executive</div><b>President</b> = Head of the State. <b>Prime Minister</b> = Head of the Government, who runs office with the support of the Council of Ministers (the Cabinet Ministry).</div><div class="cp-card green"><div class="cp-card-title">Legislature</div><b>Parliament</b> = President + <u>Lok Sabha</u> (House of the People) + <u>Rajya Sabha</u> (Council of States).</div><div class="cp-card amber"><div class="cp-card-title">Judiciary</div>The <u>Supreme Court</u> is the apex body of the legal system, followed by High Courts and subordinate courts.</div></div>
      <div class="cp-note trap">Head of the <b>State</b> (President) is not the same as head of the <b>Government</b> (Prime Minister).</div>
      <div class="cp-divider">2 · Eight Union Territories</div>
      <div class="cp-chips"><span>Andaman & Nicobar Islands</span><span>Chandigarh</span><span>Dadra & Nagar Haveli and Daman & Diu</span><span>Delhi (NCT)</span><span>Jammu & Kashmir</span><span>Ladakh</span><span>Lakshadweep</span><span>Puducherry</span></div>
      <div class="cp-divider">3 · The National Flag</div>
      <div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">Colours</div>A horizontal tricolour of equal bands: <b>deep saffron (kesaria)</b> on top, <b>white</b> in the middle, <b>dark green</b> at the bottom.</div><div class="cp-card blue"><div class="cp-card-title">The wheel</div>A <b>navy blue wheel</b> in the centre of the white band — the <u>Ashoka Chakra of Sarnath</u> with 24 spokes.</div></div>
      <div class="cp-note exam">Length : breadth of the flag = <b>3 : 2</b>. The Constituent Assembly adopted the flag on <u>22 July 1947</u>.</div>
      <div class="cp-divider">4 · National days</div>
      <table><thead><tr><th>Date</th><th>Day</th></tr></thead><tbody><tr><td>26 January</td><td>Republic Day</td></tr><tr><td>15 August</td><td>Independence Day</td></tr><tr><td>2 October</td><td>Gandhi Jayanti (Mahatma Gandhi's birthday)</td></tr></tbody></table>
      <div class="cp-chips"><span>President</span><span>Prime Minister</span><span>Lok Sabha</span><span>Rajya Sabha</span><span>Supreme Court</span></div>
    `
  },

  /* ─────────── 13 · QUESTION ─────────── */
  13: {
    questext: "In India, who is the Head of the Government?",
    options: ["The Speaker of Lok Sabha", "The Chief Justice of India", "The President", "The Prime Minister"],
    correct: "4",
    exptext: "✅ Prime Minister (with the Council of Ministers). 📌 The President is the Head of the State, i.e. the ceremonial and constitutional head.",
  },

  /* ─────────── 14 · QUESTION ─────────── */
  14: {
    questext: "Which of the following is NOT a Union Territory of India?",
    options: ["Puducherry", "Ladakh", "Lakshadweep", "Sikkim"],
    correct: "4",
    exptext: "✅ Sikkim is a State (it joined in 1975). 📌 India has 28 States and 8 UTs, and Ladakh became a UT in 2019.",
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "The wheel in the centre of the National Flag is the representation of:",
    options: ["Wheel of Bodh Gaya", "Ashoka Chakra at Sarnath", "Dharma Chakra of Konark", "Sudarshana Chakra"],
    correct: "2",
    exptext: "✅ The navy blue wheel is the Ashoka Chakra of Sarnath (24 spokes). ❌ The Konark wheel is on a temple, not on the flag.",
  },

  /* ─────────── 16 · CONCEPT PAGE — Constitution ─────────── */
  16: {
    type: "concept",
    icon: "📜",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Constitution",
    html: `
      <p class="cp-lead">A <b>Constitution</b> is the <u>foundational law</u> of a country. It decides on what principles the government is based and how power is shared. Think of it as the <u>rulebook of the nation</u>.</p>
      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">It lays down</div>The framework and <b>principal functions</b> of the various organs of government.</div><div class="cp-card green"><div class="cp-card-title">It explains</div>How the government and its <b>citizens interact</b>.</div><div class="cp-card violet"><div class="cp-card-title">It protects</div>The fundamental principles on which the country is run.</div></div>
      <div class="cp-note remember">Almost all democratic countries have a <b>written constitution</b>. India has an <u>elaborate written constitution</u>, enacted by a <b>Constituent Assembly</b> set up specially for the purpose.</div>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Example</th></tr></thead><tbody><tr><td>Written / codified</td><td>Main rules are collected in one document</td><td>India, USA</td></tr><tr><td>Unwritten / uncodified</td><td>Rules are spread over laws, court rulings and conventions</td><td>United Kingdom, New Zealand, Israel</td></tr></tbody></table>
      <div class="cp-note trap">‘Unwritten’ does not mean there are no written laws. It only means there is <b>no single codified document</b>.</div>
      <div class="cp-chips"><span>Fundamental law</span><span>Written constitution</span><span>Constituent Assembly</span></div>
    `
  },

  /* ─────────── 17 · QUESTION ─────────── */
  17: {
    questext: "Which of these democratic countries does NOT have a single written (codified) constitution?",
    options: ["United States", "India", "United Kingdom", "Japan"],
    correct: "3",
    exptext: "✅ The UK is the classic example (New Zealand and Israel are also uncodified). 📌 India's Constitution was framed by a specially formed Constituent Assembly.",
  },

  /* ─────────── 18 · QUESTION ─────────── */
  18: {
    questext: "A Constitution is best described as:",
    options: ["A collection of party manifestos", "The foundational law that sets out the principles and framework of government", "A list of court judgments", "A temporary order of the ruler"],
    correct: "2",
    exptext: "✅ A constitution is the fundamental law of the land. 📌 It lays down the organs of government, their functions and how they relate to citizens.",
  },

  /* ─────────── 19 · CONCEPT PAGE — 1. Evolution of Indian Constitution ─────────── */
  19: {
    type: "concept",
    icon: "🧭",
    accent: "#6366f1",
    pauseTimer: true,
    title: "1. Evolution of Indian Constitution",
    html: `
      <p class="cp-lead">Our Constitution did not appear suddenly. It was <u>built step by step</u> over more than 150 years through British laws, movements and the debates of the Constituent Assembly.</p>
      <div class="cp-stats"><div class="cp-stat"><b>22</b><span>Parts at start</span></div><div class="cp-stat"><b>395</b><span>Articles at start</span></div><div class="cp-stat"><b>8</b><span>Schedules at start</span></div><div class="cp-stat"><b>Largest</b><span>Written constitution</span></div></div>
      <div class="cp-note remember"><b>Original text:</b> 22 Parts, 395 Articles, 8 Schedules (adopted 26 Nov 1949; effective 26 Jan 1950). <b>Present text</b> (after many amendments): about 25 Parts, around 448 Articles, 12 Schedules.</div>
      <div class="cp-note tip">Ancient Indian systems show some reflections in the Constitution, but its <u>direct sources</u> lie in the administrative and legislative developments of the <b>British period</b>.</div>
      <div class="cp-divider">The journey in one view</div>
      <ul class="cp-timeline"><li><b>1773 – 1853</b><br>Company rule: Regulating Act, Pitt's India Act and the Charter Acts. Parliament slowly tightens control.</li><li><b>1858 – 1909</b><br>Crown rule: Indians are slowly associated with law-making; elections and communal electorates appear.</li><li><b>1919 – 1935</b><br>Dyarchy, then provincial autonomy and the federal scheme.</li><li><b>1946 – 1947</b><br>Cabinet Mission, Interim Government, Mountbatten Plan and the Independence Act.</li><li><b>1946 – 1950</b><br>The Constituent Assembly writes the Constitution.</li></ul>
      <div class="cp-fig"><img src="images/aaf8c16e-b2dc-40d6-b870-5a23b2af19e3.png" alt="Timeline from the Regulating Act 1773 to the Constitution 1950" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic"><b>R</b>egulate → <b>P</b>itt → <b>C</b>harters → <b>C</b>rown → <b>C</b>ouncils → <b>D</b>yarchy → <b>F</b>ederation → <b>F</b>reedom</div>
      <div class="cp-chips"><span>Constituent Assembly</span><span>British Acts</span><span>1773 to 1950</span></div>
    `
  },

  /* ─────────── 20 · QUESTION ─────────── */
  20: {
    questext: "The Constitution of India as originally adopted had:",
    options: ["22 Parts, 395 Articles and 8 Schedules", "25 Parts, 448 Articles and 12 Schedules", "22 Parts, 448 Articles and 8 Schedules", "20 Parts, 395 Articles and 10 Schedules"],
    correct: "1",
    exptext: "✅ 22 Parts, 395 Articles, 8 Schedules at the beginning. 📌 It has grown to about 25 Parts, around 448 Articles and 12 Schedules through amendments.",
  },

  /* ─────────── 21 · QUESTION ─────────── */
  21: {
    questext: "The direct sources of the Indian Constitution are mainly found in:",
    options: ["The Magna Carta only", "The Vedas only", "The US Declaration of Independence only", "Administrative and legislative developments of the British period"],
    correct: "4",
    exptext: "✅ The British-era Acts and reforms. 📌 Ancient ideas reflect in it, but the direct sources are British-era Acts such as those of 1909, 1919 and 1935.",
  },

  /* ─────────── 22 · CONCEPT PAGE — Administrative & Legislative Reforms Before 1857 ─────────── */
  22: {
    type: "concept",
    icon: "⏳",
    accent: "#a855f7",
    pauseTimer: true,
    title: "Administrative & Legislative Reforms Before 1857",
    html: `
      <p class="cp-lead">From <b>1773 to 1853</b> the East India Company was both a <u>trading company and a ruler</u>. The British Parliament kept passing Acts to <u>control it step by step</u>.</p>
      <div class="cp-divider">Six Acts, six big ideas</div>
      <table><thead><tr><th>Year</th><th>Act</th><th>One-line idea</th></tr></thead><tbody><tr><td>1773</td><td>Regulating Act</td><td>Parliament's control begins; Governor General; Supreme Court at Calcutta</td></tr><tr><td>1784</td><td>Pitt's India Act</td><td>Board of Control — political and commercial work separated</td></tr><tr><td>1793</td><td>Charter Act</td><td>Earlier provisions consolidated</td></tr><tr><td>1813</td><td>Charter Act</td><td>Company's trade monopoly ends</td></tr><tr><td>1833</td><td>Charter Act</td><td>Governor-General of India; Law Commission</td></tr><tr><td>1853</td><td>Charter Act</td><td>The last Charter Act; open competition</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>R</b>un <b>P</b>itt, <b>C</b>harter <b>C</b>harter <b>C</b>harter — <b>R</b>egulating, <b>P</b>itt, then three <b>C</b>harters (1793, 1813, 1833) and the last one in 1853.</div>
      <div class="cp-note exam">Why ‘Charter’ Acts? The Company's trading rights were given for 20 years at a time, so Parliament renewed the <u>charter</u> and used each renewal to <b>add reforms</b>.</div>
      <div class="cp-note trap">Pitt's India Act (1784) is <b>not</b> a Charter Act. The Charter Acts are those of 1793, 1813, 1833 and 1853.</div>
    `
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "Which is the correct chronological order?",
    options: ["Regulating Act → Pitt's India Act → Charter Act 1813 → Charter Act 1833", "Pitt's India Act → Regulating Act → Charter Act 1813 → Charter Act 1833", "Regulating Act → Charter Act 1813 → Pitt's India Act → Charter Act 1833", "Regulating Act → Pitt's India Act → Charter Act 1833 → Charter Act 1813"],
    correct: "1",
    exptext: "✅ 1773 → 1784 → 1813 → 1833. 📌 Regulating came first, so it could be improved by Pitt's Act.",
  },

  /* ─────────── 24 · QUESTION ─────────── */
  24: {
    questext: "Which was the last of the Charter Acts?",
    options: ["Charter Act of 1853", "Government of India Act, 1858", "Charter Act of 1813", "Charter Act of 1833"],
    correct: "1",
    exptext: "✅ Charter Act of 1853. 📌 After the Revolt of 1857, the Company was abolished by the Government of India Act, 1858, which is not a Charter Act.",
  },

  /* ─────────── 25 · CONCEPT PAGE — Regulating Act of 1773 ─────────── */
  25: {
    type: "concept",
    icon: "⚖️",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Regulating Act of 1773",
    html: `
      <p class="cp-lead">This was the <u>first real step by the British Parliament</u> to control the East India Company's rule in India. The word ‘regulating’ itself means ‘to bring under rules’.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1773</b><span>Year</span></div><div class="cp-stat"><b>Lord North</b><span>PM behind it</span></div><div class="cp-stat"><b>W. Hastings</b><span>1st Gov. General</span></div><div class="cp-stat"><b>1774</b><span>Supreme Court</span></div></div>
      <div class="cp-divider">1 · What did it do?</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Parliamentary control</div>Governance of the East India Company was put <u>under British parliamentary control</u>. The Act was based on the report of a committee headed by <b>Prime Minister Lord North</b>.</div><div class="cp-card green"><div class="cp-card-title">Governor General</div>The Governor of Bengal became <b>Governor General</b> for the three Presidencies of Calcutta, Bombay and Madras. <b>Warren Hastings</b> was the first one.</div><div class="cp-card amber"><div class="cp-card-title">Supreme Court</div>A <u>Supreme Court</u> was set up at Calcutta (now Kolkata) in <b>1774</b>.</div><div class="cp-card red"><div class="cp-card-title">Law-making</div>The Governor General could make rules, regulations and ordinances with the <u>consent of the Supreme Court</u>.</div></div>
      <table><thead><tr><th>Judges of the first Supreme Court</th><th></th></tr></thead><tbody><tr><td>Chief Justice</td><td><b>Sir Elijah Impey</b></td></tr><tr><td>Other three judges</td><td>Chambers, Lemaistre and Hyde</td></tr></tbody></table>
      <div class="cp-note exam"><b>Memory hook:</b> 1773 → <u>First</u> Governor General → <u>First</u> Supreme Court → <u>First</u> parliamentary control.</div>
      <div class="cp-note trap">Under this Act the Governor General ruled mainly Bengal. The Presidencies of Bombay and Madras were <b>subordinate</b> to him in important matters.</div>
      <div class="cp-mnemonic"><b>L</b>ord North <b>H</b>astings <b>I</b>mpey — “<b>L</b>et <b>H</b>im <b>I</b>mprove”</div>
      <div class="cp-chips"><span>1773</span><span>Lord North</span><span>Warren Hastings</span><span>Elijah Impey</span></div>
    `
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "The Regulating Act of 1773 was based on the report of a committee headed by:",
    options: ["Lord North", "Lord Cornwallis", "Lord Macaulay", "William Pitt"],
    correct: "1",
    exptext: "✅ Lord North, the British Prime Minister. 📌 William Pitt's name is linked to the 1784 Act.",
  },

  /* ─────────── 27 · QUESTION ─────────── */
  27: {
    questext: "Who was the first Governor General of Bengal (under the Regulating Act 1773)?",
    options: ["William Bentinck", "Lord Clive", "Lord Cornwallis", "Warren Hastings"],
    correct: "4",
    exptext: "✅ Warren Hastings. 📌 Bentinck became the first Governor-General of India under the Charter Act 1833.",
  },

  /* ─────────── 28 · QUESTION ─────────── */
  28: {
    questext: "A Supreme Court was established in Calcutta in 1774 with which person as the first Chief Justice?",
    options: ["Sir John Simon", "Sir William Jones", "Sir Robert Chambers", "Sir Elijah Impey"],
    correct: "4",
    exptext: "✅ Sir Elijah Impey. 📌 Chambers was one of the other three judges (the others were Lemaistre and Hyde).",
  },

  /* ─────────── 29 · QUESTION ─────────── */
  29: {
    questext: "Which Act first brought the affairs of the East India Company under the control of the British Parliament?",
    options: ["Government of India Act, 1858", "Regulating Act, 1773", "Charter Act, 1793", "Pitt's India Act, 1784"],
    correct: "2",
    exptext: "✅ Regulating Act 1773 started parliamentary control. 📌 The 1784 Act deepened it, and 1858 ended the Company's rule entirely.",
  },

  /* ─────────── 30 · CONCEPT PAGE — Pitts India Act of 1784 ─────────── */
  30: {
    type: "concept",
    icon: "🧑‍⚖️",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Pitts India Act of 1784",
    html: `
      <p class="cp-lead">The Regulating Act left the Company badly managed. <b>Pitt's India Act</b> was passed to <u>improve discipline</u> in the Company's administration. It created a <u>dual system of control</u>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1784</b><span>Year</span></div><div class="cp-stat"><b>6</b><span>Board members</span></div><div class="cp-stat"><b>Dual</b><span>Control system</span></div></div>
      <div class="cp-divider">1 · Two bodies, two jobs</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Board of Control</div>A <b>6-member</b> board headed by a minister of the British Government. All <u>political responsibilities</u> went to it.</div><div class="cp-card amber"><div class="cp-card-title">Court of Directors</div>The Company's own body. Only <u>trade and commerce</u> matters remained with it.</div></div>
      <div class="cp-vs"><div class="good"><h4>✅ Correct</h4>Politics = Board of Control; Trade = Court of Directors</div><div class="bad"><h4>❌ Trap</h4>Saying the Court of Directors ruled India fully after 1784</div></div>
      <div class="cp-note remember">Provinces now had to <b>follow the instructions of the Central Government</b>, and the Governor General could <u>dismiss a failing provincial government</u>.</div>
      <div class="cp-mnemonic"><b>B</b>oard = <b>B</b>ritish <b>B</b>oss (politics); <b>D</b>irectors = <b>D</b>eals (trade)</div>
      <div class="cp-chips"><span>1784</span><span>Board of Control</span><span>Dual system</span></div>
    `
  },

  /* ─────────── 31 · QUESTION ─────────── */
  31: {
    questext: "The Board of Control, a 6-member body, was created by:",
    options: ["Charter Act, 1813", "Regulating Act, 1773", "Indian Councils Act, 1861", "Pitt's India Act, 1784"],
    correct: "4",
    exptext: "✅ Pitt's India Act 1784. 📌 It looked after all political matters of the Company.",
  },

  /* ─────────── 32 · QUESTION ─────────── */
  32: {
    questext: "After Pitt's India Act, trade and commercial matters remained under:",
    options: ["The Court of Directors", "The Supreme Court", "The Viceroy's Council", "The Board of Control"],
    correct: "1",
    exptext: "✅ Court of Directors. 📌 This split is called the ‘dual system’: politics with the Board of Control and trade with the Court of Directors.",
  },

  /* ─────────── 33 · QUESTION ─────────── */
  33: {
    questext: "Pitt's India Act was passed mainly to:",
    options: ["Create the post of Viceroy", "End the Company's trade monopoly", "Introduce provincial autonomy", "Improve upon the provisions of the Regulating Act 1773 and bring discipline to the Company's administration"],
    correct: "4",
    exptext: "✅ To fix the defects of the 1773 Act. ❌ The trade monopoly ended in 1813, and the Viceroy post came in 1858.",
  },

  /* ─────────── 34 · CONCEPT PAGE — Charter Act of 1793 ─────────── */
  34: {
    type: "concept",
    icon: "📑",
    accent: "#22c55e",
    pauseTimer: true,
    title: "Charter Act of 1793",
    html: `
      <p class="cp-lead">This Act is mostly a <u>tidy-up</u>. The main provisions of the previous Acts were <b>consolidated</b> and the Company's charter was renewed.</p>
      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">Consolidation</div>Main provisions of earlier Acts were gathered in one Act.</div><div class="cp-card amber"><div class="cp-card-title">Salaries</div>Salaries of the members of the Board of Control were paid from <u>Indian revenue</u>.</div><div class="cp-card green"><div class="cp-card-title">Courts</div>Courts were given the power to <u>interpret</u> rules and regulations.</div></div>
      <div class="cp-note exam">Exam angle: this Act is asked for the point of <b>salaries of the Board of Control members from Indian revenue</b>.</div>
      <div class="cp-note trap">Do not confuse ‘Charter Act 1793’ (consolidation) with ‘Charter Act 1813’ (end of the trade monopoly).</div>
      <div class="cp-chips"><span>1793</span><span>Consolidation</span><span>Indian revenue</span></div>
    `
  },

  /* ─────────── 35 · QUESTION ─────────── */
  35: {
    questext: "Under the Charter Act of 1793, the salaries of the members of the Board of Control were to be paid from:",
    options: ["The Company's profit only", "British revenue", "Indian revenue", "Donations"],
    correct: "3",
    exptext: "✅ Indian revenue. 📌 This was an important financial burden placed on India.",
  },

  /* ─────────── 36 · QUESTION ─────────── */
  36: {
    questext: "Which Act mainly consolidated the main provisions of the previous Acts and gave courts the power to interpret rules and regulations?",
    options: ["Indian Councils Act, 1892", "Charter Act of 1793", "Charter Act of 1833", "Government of India Act, 1858"],
    correct: "2",
    exptext: "✅ Charter Act of 1793. 📌 Courts were given power to interpret rules and regulations.",
  },

  /* ─────────── 37 · CONCEPT PAGE — Charter Act of 1813 ─────────── */
  37: {
    type: "concept",
    icon: "🚢",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "Charter Act of 1813",
    html: `
      <p class="cp-lead">This Act <u>broke the Company's trade monopoly</u> in India. Now other British merchants could trade here, so the Company became more of a <b>ruler</b> than a trader.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1813</b><span>Year</span></div><div class="cp-stat"><b>Monopoly</b><span>Ended</span></div><div class="cp-stat"><b>₹1 lakh</b><span>For education</span></div></div>
      <div class="cp-divider">1 · Key changes</div>
      <div class="cp-grid c2"><div class="cp-card red"><div class="cp-card-title">Trade monopoly ends</div>The trade monopoly of the East India Company came to an end. (Trade in <u>tea</u> and with <u>China</u> stayed with the Company.)</div><div class="cp-card blue"><div class="cp-card-title">Bigger Presidency councils</div>Powers of the Councils of Madras, Bombay and Calcutta were enlarged, with greater control by the British Parliament.</div><div class="cp-card green"><div class="cp-card-title">Missionaries</div><u>Christian missionaries</u> were allowed to spread their religion in India.</div><div class="cp-card amber"><div class="cp-card-title">Local bodies</div>Local autonomous bodies were empowered to <u>levy taxes</u>.</div></div>
      <div class="cp-note remember">The Act also set aside <b>₹1 lakh a year</b> for education and learning, the first such government grant.</div>
      <div class="cp-mnemonic">1813: <b>M</b>onopoly <b>M</b>issionaries <b>M</b>oney for education — <b>3 M's</b></div>
      <div class="cp-chips"><span>1813</span><span>Monopoly ended</span><span>Missionaries</span><span>Education grant</span></div>
    `
  },

  /* ─────────── 38 · QUESTION ─────────── */
  38: {
    questext: "Which Charter Act ended the trade monopoly of the East India Company (except tea and trade with China)?",
    options: ["Charter Act of 1833", "Charter Act of 1793", "Charter Act of 1813", "Charter Act of 1853"],
    correct: "3",
    exptext: "✅ Charter Act 1813. 📌 The 1833 Act ended the Company's commercial functions altogether.",
  },

  /* ─────────── 39 · QUESTION ─────────── */
  39: {
    questext: "Christian missionaries were first allowed to spread their religion in India by:",
    options: ["Charter Act of 1853", "Regulating Act of 1773", "Charter Act of 1813", "Indian Councils Act of 1861"],
    correct: "3",
    exptext: "✅ Charter Act 1813. 📌 The same Act also set aside funds for education.",
  },

  /* ─────────── 40 · QUESTION ─────────── */
  40: {
    questext: "A sum of ₹1 lakh a year for the revival and promotion of education was provided in:",
    options: ["Wood's Despatch of 1854", "Government of India Act, 1919", "Charter Act of 1833", "Charter Act of 1813"],
    correct: "4",
    exptext: "✅ Charter Act of 1813. 📌 It is the first Act that gave money to education. Wood's Despatch came later in 1854.",
  },

  /* ─────────── 41 · CONCEPT PAGE — Charter Act of 1833 ─────────── */
  41: {
    type: "concept",
    icon: "🏛️",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Charter Act of 1833",
    html: `
      <p class="cp-lead">This Act made <u>India one administrative unit</u>. For the first time the Governor-General's Government was called the <b>‘Government of India’</b> and his Council the <b>‘Indian Council’</b>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1833</b><span>Year</span></div><div class="cp-stat"><b>Bentinck</b><span>1st G-G of India</span></div><div class="cp-stat"><b>Macaulay</b><span>Law Member</span></div><div class="cp-stat"><b>1843</b><span>Slavery abolished</span></div></div>
      <div class="cp-divider">1 · What changed?</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Vast powers</div>The Governor General and his Council could legislate for the <u>whole of India</u>, subject to the approval of the Board of Controllers.</div><div class="cp-card green"><div class="cp-card-title">One budget</div>The Council had full powers over revenue, and a <b>single budget</b> for the country was prepared by the Governor General.</div><div class="cp-card amber"><div class="cp-card-title">Company's role</div>The Company became an administrative and political body. Lords and ministers were nominated as ex-officio members of the Board of Controllers.</div><div class="cp-card red"><div class="cp-card-title">Law Commission</div>A <u>Law Commission</u> was set up for consolidation and codification of Indian laws.</div></div>
      <div class="cp-note remember"><b>Lord Macaulay</b> was appointed <u>Chairman of the First Law Commission (1835)</u>, and Sir James Stephen was appointed as a Law Member in place of Lord Macaulay.</div>
      <div class="cp-note exam"><b>Slavery</b> was declared illegal through this Charter Act and was <u>abolished in 1843</u>.</div>
      <div class="cp-mnemonic">1833 = <b>one India</b>, <b>one budget</b>, <b>one law-making Council</b></div>
      <div class="cp-chips"><span>1833</span><span>Governor-General of India</span><span>Law Commission</span><span>Macaulay</span></div>
    `
  },

  /* ─────────── 42 · QUESTION ─────────── */
  42: {
    questext: "Under which Act was the Governor-General of Bengal made the Governor-General of India?",
    options: ["Regulating Act of 1773", "Charter Act of 1853", "Charter Act of 1833", "Government of India Act, 1858"],
    correct: "3",
    exptext: "✅ Charter Act 1833. 📌 Lord William Bentinck became the first Governor-General of India. ❌ The Viceroy title came only in 1858.",
  },

  /* ─────────── 43 · QUESTION ─────────── */
  43: {
    questext: "The First Law Commission (1835) was headed by:",
    options: ["Sir John Simon", "Lord Macaulay", "Lord Dalhousie", "Lord Cornwallis"],
    correct: "2",
    exptext: "✅ Lord Macaulay. 📌 The Charter Act 1833 provided for the commission for consolidation and codification of Indian laws.",
  },

  /* ─────────── 44 · QUESTION ─────────── */
  44: {
    questext: "Slavery was declared illegal under the Charter Act of 1833 and was finally abolished in:",
    options: ["1813", "1857", "1861", "1843"],
    correct: "4",
    exptext: "✅ 1843. 📌 The Act declared slavery illegal, and abolition came a decade later.",
  },

  /* ─────────── 45 · QUESTION ─────────── */
  45: {
    questext: "Which Charter Act first used the terms ‘Government of India’ and ‘Indian Council’?",
    options: ["Charter Act of 1833", "Charter Act of 1793", "Charter Act of 1813", "Indian Councils Act of 1861"],
    correct: "1",
    exptext: "✅ Charter Act 1833. 📌 The Government now had law-making powers for the whole country and one budget.",
  },

  /* ─────────── 46 · CONCEPT PAGE — Charter Act of 1853 ─────────── */
  46: {
    type: "concept",
    icon: "🏁",
    accent: "#ec4899",
    pauseTimer: true,
    title: "Charter Act of 1853",
    html: `
      <p class="cp-lead">This was the <u>last of the Charter Acts</u>. It followed a report of Governor General Dalhousie on how to improve the administration of the company.</p>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Separate Governor for Bengal</div>A <u>separate Governor for Bengal</u> was to be appointed.</div><div class="cp-card green"><div class="cp-card-title">Legislative vs executive</div>The <b>legislative</b> and <b>administrative</b> functions of the Council were separately identified.</div><div class="cp-card amber"><div class="cp-card-title">Open competition</div>Recruitment of the Company's employees was to be done through <u>competitive examinations</u>.</div><div class="cp-card red"><div class="cp-card-title">End at any time</div>The British Parliament could <u>end the Company's governance</u> at any suitable time.</div></div>
      <div class="cp-note exam">The open competition for civil services was a big step: jobs now depended on <b>merit</b>, not on the patronage of the Directors. (The Macaulay Committee of 1854 prepared the scheme.)</div>
      <div class="cp-note trap">Not ‘Charter Act 1833’ for competitive exams. The 1833 Act only spoke of merit in principle; <b>1853</b> actually brought competition.</div>
      <div class="cp-mnemonic">1853 = <b>L</b>ast Charter, <b>L</b>egislative split, <b>L</b>ets exam decide</div>
      <div class="cp-chips"><span>1853</span><span>Last Charter Act</span><span>Competitive exams</span></div>
    `
  },

  /* ─────────── 47 · QUESTION ─────────── */
  47: {
    questext: "Open competitive examination for the Company's civil service was introduced by:",
    options: ["Government of India Act, 1919", "Indian Councils Act of 1861", "Charter Act of 1833", "Charter Act of 1853"],
    correct: "4",
    exptext: "✅ Charter Act 1853. 📌 This laid the base for the later Indian Civil Service exam.",
  },

  /* ─────────── 48 · QUESTION ─────────── */
  48: {
    questext: "Which was the last Charter Act passed by the British Parliament?",
    options: ["Charter Act of 1833", "Charter Act of 1813", "Charter Act of 1853", "Charter Act of 1858"],
    correct: "3",
    exptext: "✅ Charter Act 1853. 📌 After this the Crown took over in 1858. There is no ‘Charter Act of 1858’.",
  },

  /* ─────────── 49 · QUESTION ─────────── */
  49: {
    questext: "The Charter Act of 1853 empowered the British Parliament to:",
    options: ["Create a Law Commission", "End the Company's governance of India at any suitable time", "Abolish slavery", "Introduce provincial autonomy"],
    correct: "2",
    exptext: "✅ Parliament could end Company rule whenever it liked. ❌ Law Commission = 1833; Slavery = 1833/1843; provincial autonomy = 1935.",
  },

  /* ─────────── 50 · CONCEPT PAGE — Administrative & Legislative Reforms After 1857 ─────────── */
  50: {
    type: "concept",
    icon: "👑",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Administrative & Legislative Reforms After 1857",
    html: `
      <p class="cp-lead">The <b>Revolt of 1857</b> shook the British. They ended the Company's rule and began <u>direct rule by the Crown</u>. From now on, each Act slowly gave Indians a <u>larger voice</u> — but always in a controlled way.</p>
      <div class="cp-divider">One idea per Act</div>
      <ul class="cp-timeline"><li><b>1858</b> — The Crown takes over from the Company.</li><li><b>1861</b> — Indians are <u>nominated</u> to the Legislative Council.</li><li><b>1892</b> — The first touch of <u>indirect election</u>.</li><li><b>1909</b> — <u>Separate electorates</u> for Muslims; elected members in the councils.</li><li><b>1915</b> — Consolidation of earlier Acts.</li><li><b>1919</b> — <u>Dyarchy</u> in provinces and a two-house Centre.</li><li><b>1935</b> — <u>Provincial autonomy</u> and the federal plan.</li><li><b>1947</b> — Independence Act ends British rule.</li></ul>
      <div class="cp-mnemonic"><b>C</b>rown → <b>N</b>ominate → <b>E</b>lect → <b>C</b>ommunal → <b>D</b>yarchy → <b>F</b>ederal → <b>F</b>ree</div>
      <div class="cp-note exam">Very commonly asked: <b>match the Act with its feature</b>. Learn the one-line idea above for each Act.</div>
    `
  },

  /* ─────────── 51 · QUESTION ─────────── */
  51: {
    questext: "Arrange in chronological order: (1) Indian Councils Act 1892 (2) Indian Councils Act 1861 (3) Government of India Act 1919 (4) Morley-Minto Reforms 1909",
    options: ["2 – 1 – 4 – 3", "1 – 2 – 4 – 3", "2 – 1 – 3 – 4", "1 – 2 – 3 – 4"],
    correct: "1",
    exptext: "✅ 1861 → 1892 → 1909 → 1919, i.e. 2-1-4-3. 📌 Use the mnemonic Nominate → Elect → Communal → Dyarchy.",
  },

  /* ─────────── 52 · QUESTION ─────────── */
  52: {
    questext: "Direct rule of the British Crown in India began after which Act?",
    options: ["Government of India Act, 1915", "Indian Councils Act, 1861", "Government of India Act, 1858", "Charter Act, 1853"],
    correct: "3",
    exptext: "✅ Government of India Act 1858. 📌 It came after the Revolt of 1857.",
  },

  /* ─────────── 53 · CONCEPT PAGE — Government of India Act, 1858 ─────────── */
  53: {
    type: "concept",
    icon: "🦁",
    accent: "#dc2626",
    pauseTimer: true,
    title: "Government of India Act, 1858",
    html: `
      <p class="cp-lead">After the Revolt of 1857, the British Crown decided to <u>take over sovereignty from the East India Company</u>. The Revolt was an armed sepoy mutiny to the British, but is remembered by Indians as the <b>First War of Independence</b>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1858</b><span>Year</span></div><div class="cp-stat"><b>15</b><span>Council of India</span></div><div class="cp-stat"><b>Secy. of State</b><span>New head</span></div><div class="cp-stat"><b>Canning</b><span>1st Viceroy</span></div></div>
      <div class="cp-divider">1 · Key points</div>
      <ol class="cp-steps"><li>This was the <b>first statute</b> for the governance of India under <u>direct rule of the British Government</u>.</li><li>The powers of the Crown were exercised by the <b>Secretary of State for India</b>, helped by a <u>council of 15 members</u> called the <b>Council of India</b>.</li><li>The Governor-General became the <b>Viceroy</b> and the head of the Government of India.</li><li>The Board of Control and the Court of Directors came to an end.</li><li>The Secretary of State was ultimately responsible to the <b>British Parliament</b>.</li></ol>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Provinces</div>The country was divided into provinces, each headed by a <b>Governor or Lieutenant Governor</b> with an Executive Council.</div><div class="cp-card red"><div class="cp-card-title">Controlled by the Centre</div>Provincial governments worked under the <u>superintendence, direction and control</u> of the Governor General in all matters.</div></div>
      <div class="cp-note remember">The Act provided absolute <u>imperial control</u> without any popular participation by Indians.</div>
      <div class="cp-note exam"><b>Queen Victoria's Proclamation</b> (1 November 1858, read out at Allahabad) promised fair treatment and no more territorial expansion.</div>
      <div class="cp-mnemonic">1858: <b>C</b>rown + <b>C</b>ouncil of 15 + <b>C</b>anning</div>
      <div class="cp-chips"><span>1858</span><span>Secretary of State</span><span>Council of India</span><span>Viceroy</span></div>
    `
  },

  /* ─────────── 54 · QUESTION ─────────── */
  54: {
    questext: "The first statute for governance of India under the direct rule of the British Government was:",
    options: ["Government of India Act, 1858", "Regulating Act, 1773", "Charter Act, 1853", "Indian Councils Act, 1861"],
    correct: "1",
    exptext: "✅ Government of India Act 1858. 📌 Before this, the Company ruled on behalf of the Crown.",
  },

  /* ─────────── 55 · QUESTION ─────────── */
  55: {
    questext: "Under the Government of India Act 1858, the Secretary of State for India was assisted by a Council of how many members?",
    options: ["6", "15", "21", "12"],
    correct: "2",
    exptext: "✅ 15 members (the Council of India). 📌 6 is the size of the Board of Control under Pitt's India Act.",
  },

  /* ─────────── 56 · QUESTION ─────────── */
  56: {
    questext: "Who became the first Viceroy of India after the Act of 1858?",
    options: ["Lord Curzon", "Lord Ripon", "Lord Dalhousie", "Lord Canning"],
    correct: "4",
    exptext: "✅ Lord Canning. 📌 Dalhousie served earlier (Governor-General 1848–56).",
  },

  /* ─────────── 57 · QUESTION ─────────── */
  57: {
    questext: "Which institutions of the East India Company's system ended with the Government of India Act 1858?",
    options: ["Board of Control and Court of Directors", "Supreme Court and Law Commission", "Federal Court and Reserve Bank", "Legislative Assembly and Council of State"],
    correct: "1",
    exptext: "✅ The Board of Control and the Court of Directors ended. 📌 The new authority was the Secretary of State for India with the Council of India.",
  },

  /* ─────────── 58 · CONCEPT PAGE — Indian Councils Act, 1861 ─────────── */
  58: {
    type: "concept",
    icon: "🪑",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Indian Councils Act, 1861",
    html: `
      <p class="cp-lead">An <u>important landmark</u>. This Act allowed the Viceroy to <b>invite Indians</b> into his law-making council — the first small step towards sharing power.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1861</b><span>Year</span></div><div class="cp-stat"><b>Nominate</b><span>Indians</span></div><div class="cp-stat"><b>Portfolio</b><span>System</span></div><div class="cp-stat"><b>6 months</b><span>Ordinance</span></div></div>
      <div class="cp-divider">1 · What changed?</div>
      <div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">Indians nominated</div>The Governor General could <u>nominate</u> Indian representatives to his expanded council while making laws.</div><div class="cp-card blue"><div class="cp-card-title">Non-official members</div>His Executive Council could include some <b>additional non-official members</b> when it met as the Legislative Council.</div><div class="cp-card amber"><div class="cp-card-title">Decentralisation</div>Law-making powers were decentralised: the Governments of <u>Bombay and Madras</u> got legislative powers back.</div><div class="cp-card red"><div class="cp-card-title">Weak council</div>The council was <b>neither representative nor deliberative</b> in any sense.</div></div>
      <div class="cp-note exam">The Viceroy was given power to issue <b>ordinances</b> in emergencies, valid for <u>six months</u>. The ‘portfolio system’ (one member = one department) was legalised.</div>
      <div class="cp-note trap">1861 means <b>nomination</b>, not election. Elections (indirect) start in 1892.</div>
      <div class="cp-mnemonic">1861 = <b>N</b>ominate, <b>N</b>ot <b>N</b>elected</div>
      <div class="cp-chips"><span>1861</span><span>Nomination</span><span>Portfolio system</span><span>Ordinance</span></div>
    `
  },

  /* ─────────── 59 · QUESTION ─────────── */
  59: {
    questext: "Which Act enabled the Governor General to nominate Indians to his legislative council for the first time?",
    options: ["Indian Councils Act, 1861", "Government of India Act, 1919", "Indian Councils Act, 1892", "Morley-Minto Reforms, 1909"],
    correct: "1",
    exptext: "✅ 1861. 📌 The nominated Indians were few, and the council was neither representative nor deliberative.",
  },

  /* ─────────── 60 · QUESTION ─────────── */
  60: {
    questext: "The Indian Councils Act, 1861 gave the Viceroy the power to issue ordinances in an emergency for a period of:",
    options: ["3 months", "2 years", "6 months", "1 year"],
    correct: "3",
    exptext: "✅ Six months. 📌 This was the first ordinance-making power in Indian constitutional history.",
  },

  /* ─────────── 61 · QUESTION ─────────── */
  61: {
    questext: "Which Act decentralised legislative powers by giving them back to the Governments of Bombay and Madras?",
    options: ["Indian Independence Act, 1947", "Charter Act, 1833", "Indian Councils Act, 1861", "Government of India Act, 1935"],
    correct: "3",
    exptext: "✅ 1861. 📌 In 1833 the Presidencies had lost their law-making powers; the 1861 Act restored them.",
  },

  /* ─────────── 62 · CONCEPT PAGE — Indian Councils Act, 1892 ─────────── */
  62: {
    type: "concept",
    icon: "🗳️",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Indian Councils Act, 1892",
    html: `
      <p class="cp-lead">Indian leaders wanted <u>real representation</u>. The 1892 Act brought in a <b>weak form of election</b> and gave members the right to discuss the Budget.</p>
      <div class="cp-divider">1 · Key features</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Indirect election</div>Non-official members of the Central council were <b>nominated</b> on the recommendation of the <u>Bengal Chamber of Commerce</u> and the Provincial Councils.</div><div class="cp-card green"><div class="cp-card-title">Provincial councils</div>Non-official members of provincial councils were nominated by local bodies such as <u>universities, district boards, municipalities and zamindars</u>.</div><div class="cp-card amber"><div class="cp-card-title">Budget</div>Councils could <u>discuss the Budget</u> and address questions to the Executive.</div><div class="cp-card red"><div class="cp-card-title">No vote</div>But they could not vote on the Budget or ask supplementary questions.</div></div>
      <div class="cp-note remember">The word ‘election’ was <b>not used</b> in the Act. Members were still ‘nominated’ but on the recommendation of various bodies, which is why it is called <u>indirect election</u>.</div>
      <div class="cp-mnemonic">1892 = <b>D</b>iscuss the Budget, but no <b>D</b>ecision (vote)</div>
      <div class="cp-chips"><span>1892</span><span>Indirect election</span><span>Budget discussion</span></div>
    `
  },

  /* ─────────── 63 · QUESTION ─────────── */
  63: {
    questext: "The principle of indirect election was introduced for the first time by:",
    options: ["Morley-Minto Reforms, 1909", "Indian Councils Act, 1892", "Government of India Act, 1919", "Indian Councils Act, 1861"],
    correct: "2",
    exptext: "✅ 1892. 📌 Direct election appeared only later, and the Morley-Minto reforms of 1909 expanded elections.",
  },

  /* ─────────── 64 · QUESTION ─────────── */
  64: {
    questext: "Under the Indian Councils Act, 1892, the members of the Legislative Councils could:",
    options: ["Vote on the Budget", "Pass their own bills freely", "Discuss the Budget and ask questions, but not vote on the Budget", "Choose the Viceroy"],
    correct: "3",
    exptext: "✅ Discuss and question — no vote. 📌 Power to move resolutions on the Budget came in 1909.",
  },

  /* ─────────── 65 · QUESTION ─────────── */
  65: {
    questext: "Non-official members of the Provincial Councils under the 1892 Act were nominated by:",
    options: ["The British Parliament", "The Secretary of State", "Direct vote of all adults", "Local bodies such as universities, district boards, municipalities and zamindars"],
    correct: "4",
    exptext: "✅ Local bodies recommended the names. 📌 This was indirect election.",
  },

  /* ─────────── 66 · CONCEPT PAGE — Morley-Minto Reforms and the Indian Councils Act, 1909 ─────────── */
  66: {
    type: "concept",
    icon: "🧩",
    accent: "#f97316",
    pauseTimer: true,
    title: "Morley-Minto Reforms and the Indian Councils Act, 1909",
    html: `
      <p class="cp-lead">This Act is famous for one thing: it <u>legalised communalism</u> by giving Muslims <b>separate electorates</b>. Reforms were proposed by <b>Lord Morley</b> (Secretary of State) and <b>Lord Minto</b> (Viceroy).</p>
      <div class="cp-stats"><div class="cp-stat"><b>1909</b><span>Year</span></div><div class="cp-stat"><b>16 → 60</b><span>Additional members</span></div><div class="cp-stat"><b>S. P. Sinha</b><span>1st Indian in Exec. Council</span></div><div class="cp-stat"><b>Minto</b><span>Communal electorate</span></div></div>
      <div class="cp-divider">1 · What did it do?</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Bigger council</div>Additional members of the Imperial Legislative Council were raised from <b>16 to 60</b> (excluding Executive Councillors).</div><div class="cp-card green"><div class="cp-card-title">First Indian</div>For the first time Indians joined the executive councils. <b>Satyendra Prasad Sinha</b> became the first Indian in the Viceroy's Executive Council as <u>Law Member</u>.</div><div class="cp-card amber"><div class="cp-card-title">Special seats</div>Separate representation for <u>presidency corporations, chambers of commerce, universities, zamindars, Sikhs, Indian Christians, Anglo-Indians and Europeans</u>.</div><div class="cp-card red"><div class="cp-card-title">Muslim electorate</div>For the first time, <b>separate representation for the Muslim community</b>. This legalised communalism.</div></div>
      <div class="cp-note exam"><b>Lord Minto</b> is known as the <u>‘Father of Communal Electorate’</u>.</div>
      <div class="cp-divider">2 · Elected members, but still controlled</div>
      <ol class="cp-steps"><li>Provincial Councils were enlarged and <b>official majority was ended</b> there.</li><li>At the Centre, elected members were introduced but the <u>official majority stayed</u>.</li><li>Councils could move <b>resolutions on the Budget</b> and public matters, except on Armed Forces, Foreign Affairs and Indian States.</li></ol>
      <div class="cp-note trap">Do not say ‘Morley-Minto gave Indians full control’. The <b>Viceroy still kept the final say</b>.</div>
      <div class="cp-mnemonic"><b>M</b>orley-<b>M</b>into = <b>M</b>uslims got separate <b>M</b>embers</div>
      <div class="cp-chips"><span>1909</span><span>Communal electorate</span><span>Satyendra Sinha</span><span>Separate representation</span></div>
    `
  },

  /* ─────────── 67 · QUESTION ─────────── */
  67: {
    questext: "Who is known as the ‘Father of Communal Electorate’ in India?",
    options: ["Lord Chelmsford", "Lord Minto", "Lord Curzon", "Lord Morley"],
    correct: "2",
    exptext: "✅ Lord Minto. 📌 Morley was the Secretary of State. Both names are in the ‘Morley-Minto Reforms’.",
  },

  /* ─────────── 68 · QUESTION ─────────── */
  68: {
    questext: "Who became the first Indian member of the Viceroy's Executive Council in 1909?",
    options: ["Dadabhai Naoroji", "Surendranath Banerjee", "Motilal Nehru", "Satyendra Prasad Sinha"],
    correct: "4",
    exptext: "✅ Satyendra Prasad Sinha, appointed as the Law Member. 📌 This is the first time Indians were associated with the Viceroy's Executive Council.",
  },

  /* ─────────── 69 · QUESTION ─────────── */
  69: {
    questext: "Under the Indian Councils Act, 1909, the maximum number of additional members of the Imperial Legislative Council was raised from 16 to:",
    options: ["60", "40", "144", "100"],
    correct: "1",
    exptext: "✅ 60 (excluding the Executive Councillors). 📌 144 is the size of the Legislative Assembly under the 1919 Act.",
  },

  /* ─────────── 70 · QUESTION ─────────── */
  70: {
    questext: "Separate electorate for the Muslims was introduced for the first time by:",
    options: ["Indian Councils Act, 1909", "Indian Councils Act, 1892", "Government of India Act, 1935", "Government of India Act, 1919"],
    correct: "1",
    exptext: "✅ 1909. 📌 The 1919 Act extended it to Sikhs, Christians, Anglo-Indians and Europeans, and the 1935 Act extended it further.",
  },

  /* ─────────── 71 · QUESTION ─────────── */
  71: {
    questext: "Which of the following was NOT a feature of the Morley-Minto Reforms?",
    options: ["Separate electorate for Muslims", "Increase in the size of the legislative councils", "First Indian in the Viceroy's Executive Council", "Dyarchy in the provinces"],
    correct: "4",
    exptext: "✅ Dyarchy came in 1919. 📌 The 1909 reforms are all about elections, communal electorates and the larger councils.",
  },

  /* ─────────── 72 · CONCEPT PAGE — The Government of India Act, 1915 ─────────── */
  72: {
    type: "concept",
    icon: "🗂️",
    accent: "#64748b",
    pauseTimer: true,
    title: "The Government of India Act, 1915",
    html: `
      <p class="cp-lead">This was a <u>housekeeping Act</u>. It did not bring a new idea. It simply <b>collected and joined together</b> the provisions of the earlier Government of India Acts into one law.</p>
      <div class="cp-note remember"><b>Consolidating Act</b> = an Act that gathers earlier laws on the same subject into one clear document, without changing the principles.</div>
      <div class="cp-note exam">If you are asked ‘Which Act was passed to consolidate the previous Government of India Acts?’ the answer is <b>1915</b>.</div>
      <div class="cp-chips"><span>1915</span><span>Consolidation</span></div>
    `
  },

  /* ─────────── 73 · QUESTION ─────────── */
  73: {
    questext: "The Government of India Act, 1915 was passed mainly to:",
    options: ["Separate Burma from India", "Introduce Dyarchy", "Create a Federal Court", "Consolidate the provisions of the preceding Government of India Acts"],
    correct: "4",
    exptext: "✅ Consolidation. 📌 Dyarchy = 1919, Federal Court = 1935/37, Burma separated = 1935.",
  },

  /* ─────────── 74 · CONCEPT PAGE — Montagu-Chelmsford Reforms and the Government of India Act, 1919 ─────────── */
  74: {
    type: "concept",
    icon: "🔀",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Montagu-Chelmsford Reforms and the Government of India Act, 1919",
    html: `
      <p class="cp-lead">The 1919 Act introduced <u>dyarchy</u> (dual government) in the provinces: some subjects went to elected Indian ministers, others stayed with the British Governor. It was prepared by <b>Montagu</b> (Secretary of State) and <b>Lord Chelmsford</b> (Viceroy).</p>
      <div class="cp-stats"><div class="cp-stat"><b>1919</b><span>Year</span></div><div class="cp-stat"><b>Dyarchy</b><span>In provinces</span></div><div class="cp-stat"><b>2 Houses</b><span>At the Centre</span></div><div class="cp-stat"><b>1926</b><span>Central PSC</span></div></div>
      <div class="cp-divider">1 · Dyarchy (dual government) in provinces</div>
      <div class="cp-fig"><img src="images/ce1e67a5-22f5-4377-8402-2303d71a97e8.png" alt="Dyarchy: Transferred and Reserved subjects in the provinces" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">Transferred subjects</div>Run by the Governor with <b>Ministers responsible to the Legislative Council</b> (where about <u>70%</u> of the members were elected). e.g., education, health, local self-government, agriculture.</div><div class="cp-card red"><div class="cp-card-title">Reserved subjects</div>Run by the Governor and his <b>Executive Council</b> with <u>no responsibility to the Legislature</u>. e.g., law and order (police), justice, land revenue, finance.</div></div>
      <div class="cp-note remember">The idea of dyarchy was developed by the British official <b>Lionel Curtis</b>.</div>
      <div class="cp-divider">2 · Centre: two houses, for the first time</div>
      <table><thead><tr><th></th><th>Council of State (Upper House)</th><th>Legislative Assembly (Lower House)</th></tr></thead><tbody><tr><td>Total members</td><td>60</td><td>about 144</td></tr><tr><td>Elected</td><td>34</td><td>104</td></tr><tr><td>Term</td><td>5 years</td><td>3 years</td></tr></tbody></table>
      <div class="cp-note exam">The Central Legislature became <b>bicameral</b>. In six provinces the Legislature was also bicameral (Assembly + Council); in other provinces it was <u>unicameral</u>.</div>
      <div class="cp-divider">3 · Other important changes</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">High Commissioner</div>A new post of <b>High Commissioner for India in London</b> took over some functions of the Secretary of State.</div><div class="cp-card amber"><div class="cp-card-title">Public Service Commission</div>Provision for a public service commission. The <u>Central Public Service Commission</u> was set up in <b>1926</b> to recruit civil servants.</div><div class="cp-card green"><div class="cp-card-title">Women's vote</div><b>Indian women</b> were allowed the right to vote for the first time (limited, property-based and decided province by province). David Lloyd George was the then British Prime Minister.</div><div class="cp-card violet"><div class="cp-card-title">Budgets</div><b>Provincial budgets were separated</b> from the central budget; provincial legislatures could present their own budgets and levy taxes on provincial sources.</div></div>
      <div class="cp-divider">4 · Centre and provinces — the split</div>
      <div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Central subjects</div>Kept <u>exclusively</u> under the control of the Central Government.</div><div class="cp-card amber"><div class="cp-card-title">Provincial subjects</div>Sub-divided into <b>‘transferred’</b> and <b>‘reserved’</b> subjects.</div></div>
      <div class="cp-note trap">The Governor General kept big powers: <b>veto</b>, power to <b>certify</b> a bill or grant refused by the Legislature, and power to make <b>Ordinances</b>. The Crown could also veto a bill passed by the Central Legislature.</div>
      <div class="cp-vs"><div class="good"><h4>✅ Correct</h4>Provincial dyarchy = 1919</div><div class="bad"><h4>❌ Trap</h4>Saying dyarchy was introduced at the Centre in 1919</div></div>
      <div class="cp-mnemonic">1919 = <b>D</b>ual rule in provinces, <b>D</b>ual Houses at the Centre</div>
      <div class="cp-chips"><span>1919</span><span>Dyarchy</span><span>Lionel Curtis</span><span>Bicameral Centre</span><span>High Commissioner</span></div>
    `
  },

  /* ─────────── 75 · QUESTION ─────────── */
  75: {
    questext: "Dyarchy (dual government) was introduced in the provinces by:",
    options: ["Indian Councils Act, 1909", "Government of India Act, 1919", "Government of India Act, 1935", "Indian Independence Act, 1947"],
    correct: "2",
    exptext: "✅ GoI Act 1919. 📌 The 1935 Act abolished it in the provinces (and planned it for the Centre).",
  },

  /* ─────────── 76 · QUESTION ─────────── */
  76: {
    questext: "Which of the following was a ‘transferred’ subject under the 1919 Act?",
    options: ["Education", "Finance", "Police", "Land revenue"],
    correct: "1",
    exptext: "✅ Education, along with health, local self-government, agriculture etc. 📌 Police and Finance were reserved subjects.",
  },

  /* ─────────── 77 · QUESTION ─────────── */
  77: {
    questext: "Under the Montagu-Chelmsford Reforms, ‘reserved’ subjects were administered by:",
    options: ["Ministers responsible to the Legislature", "The Governor and his Executive Council, without responsibility to the Legislature", "The Secretary of State directly", "The Federal Court"],
    correct: "2",
    exptext: "✅ The Governor and the Executive Council. 📌 Transferred subjects were with ministers responsible to the Legislature.",
  },

  /* ─────────── 78 · QUESTION ─────────── */
  78: {
    questext: "The British official whose ideas on ‘Dyarchy’ influenced the Government of India Act, 1919 was:",
    options: ["Lionel Curtis", "Cyril Radcliffe", "Lord Macaulay", "A. O. Hume"],
    correct: "1",
    exptext: "✅ Lionel Curtis. 📌 Cyril Radcliffe headed the Boundary Commission in 1947.",
  },

  /* ─────────── 79 · QUESTION ─────────── */
  79: {
    questext: "The Central Legislature under the 1919 Act consisted of:",
    options: ["Lok Sabha and Rajya Sabha", "Council of State and Legislative Assembly", "Federal Assembly and Council of State", "House of Commons and House of Lords"],
    correct: "2",
    exptext: "✅ Council of State (60, upper) and Legislative Assembly (about 144, lower). 📌 Federal Assembly and Council of State were the 1935 plan.",
  },

  /* ─────────── 80 · QUESTION ─────────── */
  80: {
    questext: "A new office of the ‘High Commissioner for India’ in London was created by:",
    options: ["Government of India Act, 1935", "Government of India Act, 1919", "Government of India Act, 1858", "Charter Act, 1853"],
    correct: "2",
    exptext: "✅ 1919. 📌 He took over some of the functions of the Secretary of State.",
  },

  /* ─────────── 81 · CONCEPT PAGE — Simon Commission ─────────── */
  81: {
    type: "concept",
    icon: "🔍",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Simon Commission",
    html: `
      <p class="cp-lead">The 1919 Act promised a review after ten years. Britain sent a commission <u>earlier than planned</u>, but with <b>no Indian member</b>. This angered every Indian party.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1927</b><span>Appointed</span></div><div class="cp-stat"><b>Sir John Simon</b><span>Chairman</span></div><div class="cp-stat"><b>1930</b><span>Report</span></div><div class="cp-stat"><b>0</b><span>Indian members</span></div></div>
      <ol class="cp-steps"><li>The commission headed by <b>Sir John Simon</b> was constituted in <u>1927</u> to inquire into the working of the Act of 1919.</li><li>It placed its report in <b>1930</b>.</li><li>The report was examined by the British Parliament and the Government of India, and a <u>Bill was drafted accordingly</u> — it became the Government of India Act, 1935.</li></ol>
      <div class="cp-note remember">Indians boycotted it with the slogan <b>“Simon Go Back”</b>. Lala Lajpat Rai was injured in a lathi-charge in Lahore (1928) and died soon after.</div>
      <div class="cp-note exam">In 1929 Viceroy <b>Lord Irwin</b> declared that <u>Dominion Status</u> was the natural goal for India, but it was <b>not conferred</b> by the 1935 Act.</div>
      <div class="cp-mnemonic"><b>S</b>imon <b>S</b>even <b>S</b>ahibs — no Indian!</div>
      <div class="cp-chips"><span>1927</span><span>Simon</span><span>Boycott</span><span>1930 Report</span></div>
    `
  },

  /* ─────────── 82 · QUESTION ─────────── */
  82: {
    questext: "The Simon Commission was constituted in:",
    options: ["1919", "1935", "1927", "1942"],
    correct: "3",
    exptext: "✅ 1927. 📌 It examined the working of the 1919 Act and reported in 1930.",
  },

  /* ─────────── 83 · QUESTION ─────────── */
  83: {
    questext: "What made the Simon Commission unacceptable to Indians?",
    options: ["It supported full independence", "It was appointed by the Congress", "It was headed by an Indian", "It had no Indian member"],
    correct: "4",
    exptext: "✅ All members were British. 📌 Hence the slogan ‘Simon Go Back’.",
  },

  /* ─────────── 84 · QUESTION ─────────── */
  84: {
    questext: "The Government of India Act, 1935 was drafted on the basis of:",
    options: ["The Mountbatten Plan", "The Cabinet Mission Plan", "The Cripps proposals", "The report of the Simon Commission and later discussions"],
    correct: "4",
    exptext: "✅ Simon Commission report (1930) + discussions. 📌 Cripps, Cabinet Mission and Mountbatten all came after 1935.",
  },

  /* ─────────── 85 · CONCEPT PAGE — The Government of India Act, 1935 ─────────── */
  85: {
    type: "concept",
    icon: "🏗️",
    accent: "#6366f1",
    pauseTimer: true,
    title: "The Government of India Act, 1935",
    html: `
      <p class="cp-lead">This is the <u>most important Act</u> in this chapter. It was the <b>longest and most detailed</b> Act of the British period and the <b>main base of our Constitution</b> — much of the Constitution's structure comes from it.</p>
      <div class="cp-stats"><div class="cp-stat"><b>321</b><span>Sections</span></div><div class="cp-stat"><b>10</b><span>Schedules</span></div><div class="cp-stat"><b>1935</b><span>Passed</span></div><div class="cp-stat"><b>1937</b><span>Provincial autonomy</span></div></div>
      <div class="cp-divider">1 · A federation was planned</div>
      <ol class="cp-steps"><li>The Act prescribed a <b>Federation</b> with <u>Provinces and Indian States</u> as units.</li><li>It was <u>optional for the Indian States</u> to join.</li><li>The States never joined, so the <b>Federation never came into being</b>.</li></ol>
      <div class="cp-divider">2 · New provinces and boundaries</div>
      <div class="cp-grid c2"><div class="cp-card red"><div class="cp-card-title">Burma</div><b>Burma was separated</b> from India.</div><div class="cp-card green"><div class="cp-card-title">New provinces</div>Two new provinces, <b>Orissa</b> and <b>Sind</b>, were created.</div></div>
      <div class="cp-divider">3 · The three lists</div>
      <div class="cp-fig"><img src="images/7910ca94-6279-4270-a113-b08574a43986.png" alt="Federal, Provincial and Concurrent lists under the 1935 Act" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">Federal List</div>Only the <b>Federal Legislature</b> could make laws.</div><div class="cp-card green"><div class="cp-card-title">Provincial List</div>Only the <b>Provincial Legislature</b> could make laws.</div><div class="cp-card amber"><div class="cp-card-title">Concurrent List</div><b>Both</b> could make laws.</div></div>
      <div class="cp-note remember">Subjects not in any list: the <b>Governor-General</b> could authorise either the Federal or the Provincial Legislature to make a law.</div>
      <div class="cp-divider">4 · Provincial autonomy and the Governor</div>
      <ol class="cp-steps"><li>The executive authority of a Province was exercised by a <b>Governor on behalf of the Crown</b>, not as a subordinate of the Governor General.</li><li>The Governor had to act with the advice of <u>Ministers responsible to the Legislature</u>.</li><li>In some matters, the Governor acted <b>‘in his discretion’</b> under the control of the Governor General.</li></ol>
      <div class="cp-divider">5 · The Centre</div>
      <ol class="cp-steps"><li>The executive authority of the Centre was vested in the <b>Governor General</b> (on behalf of the Crown).</li><li>Counsellors or a Council of Ministers responsible to the Legislature was <u>not appointed</u>, although such provisions existed in the Act.</li><li>The Central Legislature was <b>bicameral</b>: Federal Assembly and Council of State.</li><li>In <b>six provinces</b> the legislature was bicameral (Assembly + Council); in others it was unicameral.</li></ol>
      <div class="cp-note exam"><b>Governor General's special powers:</b> veto on a bill, prevent discussion and suspend proceedings on a bill, make independent legislation, and require prior sanction before a bill on certain subjects.</div>
      <div class="cp-note trap">Dominion Status was <b>not</b> conferred by this Act, even though it had been talked about since 1929.</div>
      <details class="cp-collapse"><summary>Why is this Act called the base of our Constitution?</summary><p>Many parts we see today — the Federal system, the three-list division of powers, the office of the Governor, emergency provisions, Public Service Commissions and the idea of a Federal Court — were first written down in this Act. The Constituent Assembly kept the useful parts and rebuilt the rest on democratic principles.</p></details>
      <div class="cp-mnemonic">1935 = <b>3 lists</b>, <b>3 key words</b>: <b>F</b>ederation (planned), <b>A</b>utonomy (provincial), <b>G</b>overnor</div>
      <div class="cp-chips"><span>1935</span><span>321 Sections</span><span>Three lists</span><span>Provincial autonomy</span><span>Federation never formed</span></div>
    `
  },

  /* ─────────── 86 · QUESTION ─────────── */
  86: {
    questext: "The Government of India Act, 1935 contained:",
    options: ["321 Sections and 10 Schedules", "250 Sections and 8 Schedules", "395 Sections and 12 Schedules", "200 Sections and 5 Schedules"],
    correct: "1",
    exptext: "✅ 321 Sections and 10 Schedules. 📌 Do not confuse it with the Constitution's 395 Articles and 8 Schedules at the start.",
  },

  /* ─────────── 87 · QUESTION ─────────── */
  87: {
    questext: "The Federation proposed by the Government of India Act, 1935 never came into being because:",
    options: ["The Muslim League asked for a separate unit", "The Federal Court rejected it", "The Indian States did not join it", "Burma refused"],
    correct: "3",
    exptext: "✅ Joining was optional for the Indian States and they never joined.",
  },

  /* ─────────── 88 · QUESTION ─────────── */
  88: {
    questext: "Under the Government of India Act, 1935, which new provinces were created?",
    options: ["Bihar and Bengal", "Assam and Punjab", "Orissa and Sind", "Burma and Ceylon"],
    correct: "3",
    exptext: "✅ Orissa and Sind. 📌 Burma was separated from India.",
  },

  /* ─────────── 89 · QUESTION ─────────── */
  89: {
    questext: "Consider the statements about the Government of India Act, 1935: (1) It divided powers into three lists. (2) It proposed an All-India Federation. (3) It conferred Dominion Status on India. Which are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ 1 and 2 only. 📌 Dominion Status was not conferred. The Act had Federal, Provincial and Concurrent lists, and a federation that was only planned.",
  },

  /* ─────────── 90 · QUESTION ─────────── */
  90: {
    questext: "The Federal, Provincial and Concurrent Lists were first introduced in India by:",
    options: ["Indian Independence Act, 1947", "Government of India Act, 1919", "Indian Councils Act, 1909", "Government of India Act, 1935"],
    correct: "4",
    exptext: "✅ GoI Act 1935. 📌 The 1919 Act had only Central and Provincial subjects.",
  },

  /* ─────────── 91 · QUESTION ─────────── */
  91: {
    questext: "Under the Government of India Act, 1935, the Provincial Governor was required to act on the advice of:",
    options: ["The Secretary of State only", "Ministers responsible to the Legislature (except where he acted in his discretion)", "The Federal Court", "The Viceroy only"],
    correct: "2",
    exptext: "✅ Ministers responsible to the Legislature. 📌 Exceptions: ‘discretion’ and ‘special responsibilities’.",
  },

  /* ─────────── 92 · QUESTION ─────────── */
  92: {
    questext: "Which Act is regarded as the main source from which many provisions of the Indian Constitution were taken?",
    options: ["Indian Councils Act, 1892", "Government of India Act, 1935", "Government of India Act, 1858", "Indian Independence Act, 1947"],
    correct: "2",
    exptext: "✅ GoI Act 1935. 📌 The federal scheme, Governor's office, emergency powers and Public Service Commissions came from it.",
  },

  /* ─────────── 93 · CONCEPT PAGE — Cripps Mission ─────────── */
  93: {
    type: "concept",
    icon: "✉️",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "Cripps Mission",
    html: `
      <p class="cp-lead">In the middle of World War II, Britain needed Indian support. In <b>March 1942</b> <u>Sir Stafford Cripps</u>, a member of the British cabinet, brought a <b>draft declaration</b> with proposals for India's future.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1942</b><span>Year</span></div><div class="cp-stat"><b>S. Cripps</b><span>Leader</span></div><div class="cp-stat"><b>Dominion</b><span>Status offered</span></div><div class="cp-stat"><b>After War</b><span>Proposals apply</span></div></div>
      <div class="cp-divider">1 · What did the proposals say?</div>
      <ol class="cp-steps"><li>The Constitution would be framed by an <b>elected Constituent Assembly</b> of Indians.</li><li>India would get <u>Dominion Status</u>.</li><li>There would be <b>one Indian Union</b> including all Provinces and Indian States.</li><li>A Province or State not accepting the Constitution could <u>stay out</u>, and the British Government could make separate arrangements with it.</li></ol>
      <div class="cp-note remember">The proposals were to be adopted <u>at the end of the Second World War</u>, provided the Congress and the Muslim League could accept them.</div>
      <div class="cp-note trap">The right to ‘stay out’ (non-accession) encouraged the idea of <b>separate states</b> — that is why Congress rejected it.</div>
      <div class="cp-note exam">Gandhi described the proposals as <b>“a post-dated cheque on a failing bank”</b>. The failure of the Mission was followed by the <u>Quit India Movement</u> in August 1942.</div>
      <div class="cp-mnemonic">Cripps = <b>C</b>onstituent assembly + <b>C</b>hoice to stay out</div>
      <div class="cp-chips"><span>1942</span><span>Cripps</span><span>Dominion Status</span><span>Post-dated cheque</span></div>
    `
  },

  /* ─────────── 94 · QUESTION ─────────── */
  94: {
    questext: "The Cripps Mission came to India in:",
    options: ["March 1942", "August 1930", "March 1946", "June 1947"],
    correct: "1",
    exptext: "✅ March 1942. 📌 March 1946 is the Cabinet Mission.",
  },

  /* ─────────── 95 · QUESTION ─────────── */
  95: {
    questext: "According to the Cripps proposals, after the war the Constitution of India was to be framed by:",
    options: ["An elected Constituent Assembly of the Indian people", "The Viceroy's Executive Council", "The Princely States only", "The British Parliament"],
    correct: "1",
    exptext: "✅ An elected Constituent Assembly. 📌 It also promised Dominion Status and the right of provinces to stay out.",
  },

  /* ─────────── 96 · QUESTION ─────────── */
  96: {
    questext: "Which of the following proposals of the Cripps Mission alarmed the nationalists most?",
    options: ["One Indian Union", "Any Province or State could stay out of the Union", "Dominion Status", "Elected Constituent Assembly"],
    correct: "2",
    exptext: "✅ The right to stay out threatened the unity of India and could lead to partition.",
  },

  /* ─────────── 97 · CONCEPT PAGE — Cabinet Mission Plan ─────────── */
  97: {
    type: "concept",
    icon: "🧳",
    accent: "#22c55e",
    pauseTimer: true,
    title: "Cabinet Mission Plan",
    html: `
      <p class="cp-lead">In <b>March 1946</b> the new Labour Government under <u>Lord Attlee</u> sent a <b>Cabinet Mission</b> to India to help India achieve independence as early as possible and to set up a <u>Constituent Assembly</u>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>1946</b><span>Year</span></div><div class="cp-stat"><b>3</b><span>Cabinet Ministers</span></div><div class="cp-stat"><b>389</b><span>Constituent Assembly</span></div><div class="cp-stat"><b>3</b><span>Union subjects</span></div></div>
      <table><thead><tr><th>Members of the Mission</th><th>Position</th></tr></thead><tbody><tr><td>Lord Pethick-Lawrence</td><td>Secretary of State for India (Chair)</td></tr><tr><td>Sir Stafford Cripps</td><td>President of the Board of Trade</td></tr><tr><td>A. V. Alexander</td><td>First Lord of the Admiralty</td></tr></tbody></table>
      <div class="cp-divider">1 · Main points of the Plan</div>
      <div class="cp-grid c2"><div class="cp-card red"><div class="cp-card-title">No Pakistan</div>The Mission <u>rejected</u> the demand for a separate Constituent Assembly and a separate State for Muslims.</div><div class="cp-card blue"><div class="cp-card-title">Union of India</div>A <b>Union of India</b> of British India and the States with only three Union subjects: <u>Foreign Affairs, Defence and Communications</u>.</div><div class="cp-card green"><div class="cp-card-title">Residuary powers</div>All <b>residuary powers</b> would be with the Provinces and the States.</div><div class="cp-card amber"><div class="cp-card-title">Union organs</div>A Union <b>Executive and Legislature</b> of representatives of Provinces and States.</div></div>
      <div class="cp-note exam">A major <b>communal issue</b> in the legislature needed a <u>majority of each of the two major communities</u> present and voting, plus a majority of all members present and voting.</div>
      <div class="cp-divider">2 · Grouping of Provinces</div>
      <div class="cp-fig"><img src="images/bdcc92f4-8d64-4a3e-afb1-f93bf941b630.png" alt="Cabinet Mission Plan: Group A, Group B and Group C of provinces" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Group</th><th>Provinces (broad idea)</th></tr></thead><tbody><tr><td>A</td><td>Hindu-majority provinces (Madras, Bombay, UP, Bihar, CP, Orissa)</td></tr><tr><td>B</td><td>Muslim-majority provinces in the North-West (Punjab, NWFP, Sind)</td></tr><tr><td>C</td><td>Bengal and Assam</td></tr></tbody></table>
      <div class="cp-note remember">The provinces could form groups with executives and legislatures, and each group could decide the provincial subjects.</div>
      <div class="cp-divider">3 · Constituent Assembly under the Plan</div>
      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">Total</div><b>389</b> members: 292 from British-Indian provinces + 4 Chief Commissioner provinces + 93 from the Princely States.</div><div class="cp-card green"><div class="cp-card-title">Method</div>Provincial members were <u>elected by the Provincial Legislative Assemblies</u> in three communal groups: General, Muslim and Sikh.</div><div class="cp-card amber"><div class="cp-card-title">Ratio</div>Roughly <b>one seat per million</b> of the population.</div></div>
      <div class="cp-mnemonic"><b>3 ministers</b>, <b>3 subjects</b>, <b>3 groups</b> — the Cabinet Mission is a ‘triple-3’</div>
      <div class="cp-chips"><span>March 1946</span><span>Pethick-Lawrence</span><span>Groups A, B, C</span><span>389 seats</span></div>
    `
  },

  /* ─────────── 98 · QUESTION ─────────── */
  98: {
    questext: "Which of these was NOT a member of the Cabinet Mission (1946)?",
    options: ["A. V. Alexander", "Sir Stafford Cripps", "Lord Mountbatten", "Lord Pethick-Lawrence"],
    correct: "3",
    exptext: "✅ Mountbatten came as the last Viceroy in 1947. 📌 The mission had three cabinet ministers.",
  },

  /* ─────────── 99 · QUESTION ─────────── */
  99: {
    questext: "Under the Cabinet Mission Plan, the Union was to have which subjects only?",
    options: ["Police, Prisons and Land revenue", "Education, Health and Agriculture", "Finance, Law and Industry", "Foreign Affairs, Defence and Communications"],
    correct: "4",
    exptext: "✅ Foreign Affairs, Defence and Communications. 📌 All other (residuary) powers were with the Provinces and States.",
  },

  /* ─────────── 100 · QUESTION ─────────── */
  100: {
    questext: "The Cabinet Mission Plan rejected:",
    options: ["The idea of Interim Government", "The demand for a separate State (Pakistan) and a separate Constituent Assembly for Muslims", "Dominion Status", "The idea of a Constituent Assembly"],
    correct: "2",
    exptext: "✅ It rejected Pakistan. 📌 It proposed a Union with three groups of provinces instead.",
  },

  /* ─────────── 101 · QUESTION ─────────── */
  101: {
    questext: "The total strength of the Constituent Assembly proposed by the Cabinet Mission Plan was:",
    options: ["299", "389", "250", "284"],
    correct: "2",
    exptext: "✅ 389 (292 provinces + 4 Chief Commissioner provinces + 93 States). 📌 After Partition the strength became 299.",
  },

  /* ─────────── 102 · QUESTION ─────────── */
  102: {
    questext: "In the Cabinet Mission Plan, members of the Constituent Assembly from the provinces were to be elected by:",
    options: ["The Secretary of State", "The Viceroy", "The Provincial Legislative Assemblies", "Direct adult franchise"],
    correct: "3",
    exptext: "✅ Provincial Legislative Assemblies. 📌 Hence the Constituent Assembly was indirectly elected.",
  },

  /* ─────────── 103 · CONCEPT PAGE — The Mountbatten Plan ─────────── */
  103: {
    type: "concept",
    icon: "✂️",
    accent: "#dc2626",
    pauseTimer: true,
    title: "The Mountbatten Plan",
    html: `
      <p class="cp-lead">When the Cabinet Mission Plan broke down, communal violence spread. The last Viceroy, <b>Lord Mountbatten</b>, announced a plan to <u>transfer power and partition the country</u>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>3 June 1947</b><span>Plan announced</span></div><div class="cp-stat"><b>2</b><span>Dominions</span></div><div class="cp-stat"><b>15 Aug 1947</b><span>Date of transfer</span></div></div>
      <ol class="cp-steps"><li>The plan for <b>transfer of power to the Indians and partition</b> of the country was laid down in the Mountbatten Plan.</li><li>It was given a formal shape by a <u>statement of the British Government on 3 June 1947</u>.</li><li>India would be divided into <b>two Dominions</b>: India and Pakistan.</li><li>Provinces like Bengal and Punjab were to be partitioned; boundaries were drawn by a Boundary Commission headed by <b>Cyril Radcliffe</b>.</li><li>In a referendum held on <b>6 July 1947</b>, <u>Sylhet (Assam)</u> decided to join East Bengal (a part of the new country, Pakistan).</li></ol>
      <div class="cp-note exam">The date for transfer of power was <b>advanced</b> to <u>15 August 1947</u> (earlier it was June 1948).</div>
      <div class="cp-note trap">Do not mix up the three plans: <b>Cripps</b> (1942) = Dominion Status after the war; <b>Cabinet Mission</b> (1946) = Union and groups; <b>Mountbatten</b> (1947) = Partition.</div>
      <div class="cp-mnemonic"><b>M</b>ountbatten = <b>M</b>onth of June, <b>M</b>aps cut in two</div>
      <div class="cp-chips"><span>3 June 1947</span><span>Partition</span><span>Sylhet referendum</span><span>Radcliffe</span></div>
    `
  },

  /* ─────────── 104 · QUESTION ─────────── */
  104: {
    questext: "The plan for the transfer of power and partition of India was given a formal shape in the British Government's statement of:",
    options: ["3 June 1947", "26 January 1950", "16 May 1946", "15 August 1947"],
    correct: "1",
    exptext: "✅ 3 June 1947 (the Mountbatten Plan). 📌 16 May 1946 is the date of the Cabinet Mission statement.",
  },

  /* ─────────── 105 · QUESTION ─────────── */
  105: {
    questext: "In the referendum of July 1947, which area of Assam decided to join East Bengal (Pakistan)?",
    options: ["Cachar", "Tripura", "Garo Hills", "Sylhet"],
    correct: "4",
    exptext: "✅ Sylhet (6 July 1947 referendum). 📌 The Radcliffe Boundary Commission drew the final borders.",
  },

  /* ─────────── 106 · QUESTION ─────────── */
  106: {
    questext: "The last Viceroy of India who proposed the partition plan was:",
    options: ["Lord Mountbatten", "Lord Irwin", "Lord Wavell", "Lord Linlithgow"],
    correct: "1",
    exptext: "✅ Lord Mountbatten. 📌 Lord Wavell was his predecessor; Mountbatten later became the first Governor-General of free India.",
  },

  /* ─────────── 107 · CONCEPT PAGE — The Indian Independence Act, 1947 of the British Parliament ─────────── */
  107: {
    type: "concept",
    icon: "🎉",
    accent: "#f97316",
    pauseTimer: true,
    title: "The Indian Independence Act, 1947 of the British Parliament",
    html: `
      <p class="cp-lead">This was the <u>final British law for India</u>. It ended British rule and created <b>two independent Dominions</b> — India and Pakistan — from <b>15 August 1947</b>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>18 Jul 1947</b><span>Royal assent</span></div><div class="cp-stat"><b>15 Aug 1947</b><span>Came into effect</span></div><div class="cp-stat"><b>2</b><span>Dominions</span></div><div class="cp-stat"><b>1935 Act</b><span>Used temporarily</span></div></div>
      <div class="cp-divider">1 · The key changes</div>
      <ol class="cp-steps"><li>The Government of India Act, 1935 was <b>amended by Adaptation Orders</b> in both India and Pakistan for setting up an <u>interim Constituent Assembly</u> to draw up the future Constitution.</li><li>From <b>15 August 1947</b> India ceased to be a Dependency, and the suzerainty (paramountcy) of the British Crown over the Indian States, and the treaty relations with Tribal Areas, <u>lapsed</u>.</li><li>The office of the <b>Secretary of State for India</b> was abolished.</li><li>The Governor-General and the Governors <u>lost the extraordinary powers</u> of legislation to compete with the Legislature.</li><li>The old Central Legislature (Legislative Assembly + Council of State) <b>ceased to exist on 14 August 1947</b>.</li><li>The <b>Constituent Assembly</b> also functioned as the Central Legislature, with complete sovereignty.</li></ol>
      <div class="cp-note remember"><b>Lord Mountbatten</b> became the first Governor-General of free India; later C. Rajagopalachari became the Governor-General (1948–50).</div>
      <div class="cp-note exam">The Dominion legislatures got full power to <u>repeal or amend any British law</u>, including this Act.</div>
      <div class="cp-mnemonic"><b>14 Aug</b> the old Legislature ends → <b>15 Aug</b> two free Dominions begin</div>
      <div class="cp-chips"><span>1947</span><span>Two Dominions</span><span>Secretary of State abolished</span><span>Constituent Assembly as Legislature</span></div>
    `
  },

  /* ─────────── 108 · QUESTION ─────────── */
  108: {
    questext: "The Indian Independence Act, 1947 came into effect on:",
    options: ["26 January 1950", "15 August 1947", "18 July 1947", "3 June 1947"],
    correct: "2",
    exptext: "✅ 15 August 1947. 📌 The Act received the Royal assent on 18 July 1947.",
  },

  /* ─────────── 109 · QUESTION ─────────── */
  109: {
    questext: "Which office was abolished by the Indian Independence Act, 1947?",
    options: ["Secretary of State for India", "Chief Justice of India", "Speaker of the Assembly", "Governor of Bengal"],
    correct: "1",
    exptext: "✅ The office of the Secretary of State for India. 📌 The Viceroy's role became that of a constitutional Governor-General.",
  },

  /* ─────────── 110 · QUESTION ─────────── */
  110: {
    questext: "After 15 August 1947, the body that acted as the Central Legislature of India with complete sovereignty was the:",
    options: ["Parliament of the United Kingdom", "Imperial Legislative Council", "Council of State", "Constituent Assembly"],
    correct: "4",
    exptext: "✅ The Constituent Assembly. 📌 The Central Legislature of British India ceased to exist on 14 August 1947.",
  },

  /* ─────────── 111 · QUESTION ─────────── */
  111: {
    questext: "Who was the first Governor-General of independent India?",
    options: ["Lord Wavell", "C. Rajagopalachari", "Dr. Rajendra Prasad", "Lord Mountbatten"],
    correct: "4",
    exptext: "✅ Lord Mountbatten. 📌 C. Rajagopalachari was the first Indian and the last Governor-General. Dr Rajendra Prasad was the first President.",
  },

  /* ─────────── 112 · QUESTION ─────────── */
  112: {
    questext: "The Indian Independence Act, 1947 made the British suzerainty over the Indian States:",
    options: ["Permanent", "Stronger", "Lapse", "Transferred to the Viceroy"],
    correct: "3",
    exptext: "✅ It lapsed. 📌 The States were free to join India or Pakistan, and most joined India.",
  },

  /* ─────────── 113 · CONCEPT PAGE — Interim Government (Sept. 2, 1946) ─────────── */
  113: {
    type: "concept",
    icon: "🤝",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Interim Government (Sept. 2, 1946)",
    html: `
      <p class="cp-lead">After the elections to the Constituent Assembly, an <b>Interim Government</b> was formed on <u>2 September 1946</u> as proposed by the Cabinet Mission. Its job was to run the country until the new Constitution was ready.</p>
      <div class="cp-stats"><div class="cp-stat"><b>2 Sep 1946</b><span>Sworn in</span></div><div class="cp-stat"><b>Nehru</b><span>Vice-President of Council</span></div><div class="cp-stat"><b>14</b><span>Members listed</span></div><div class="cp-stat"><b>26 Oct 1946</b><span>League joins</span></div></div>
      <div class="cp-note remember"><b>Jawaharlal Nehru</b> was the <u>Vice-President of the Viceroy's Executive Council</u> (the Viceroy was its President). The Muslim League joined later, on 26 October 1946.</div>
      <table><thead><tr><th>Member</th><th>Portfolio</th></tr></thead><tbody><tr><td>Jawaharlal Nehru</td><td>Vice-President of the Council; External Affairs &amp; Commonwealth Relations</td></tr><tr><td>Sardar Vallabhbhai Patel</td><td>Home, Information and Broadcasting</td></tr><tr><td>Dr. Rajendra Prasad</td><td>Food and Agriculture</td></tr><tr><td>Dr. John Mathai</td><td>Industries and Supplies</td></tr><tr><td>Jagjivan Ram</td><td>Labour</td></tr><tr><td>Sardar Baldev Singh</td><td>Defence</td></tr><tr><td>C. H. Bhabha</td><td>Works, Mines and Power</td></tr><tr><td>Liaquat Ali Khan</td><td>Finance</td></tr><tr><td>Abdur Rab Nishtar</td><td>Posts and Air</td></tr><tr><td>Asaf Ali</td><td>Railways and Transport</td></tr><tr><td>C. Rajagopalachari</td><td>Education and Arts</td></tr><tr><td>I. I. Chundrigar</td><td>Commerce</td></tr><tr><td>Ghazanfar Ali Khan</td><td>Health</td></tr><tr><td>Joginder Nath Mandal</td><td>Law</td></tr></tbody></table>
      <div class="cp-note exam">Four of the portfolio-holders (Liaquat Ali Khan, Abdur Rab Nishtar, I. I. Chundrigar, Ghazanfar Ali Khan) and <b>J. N. Mandal</b> were nominated by the Muslim League.</div>
      <div class="cp-note tip">Easy memory: <b>Nehru = External, Patel = Home, Liaquat = Finance, Baldev = Defence, Mandal = Law</b>.</div>
      <div class="cp-mnemonic">Interim: <b>L</b>iaquat <b>L</b>ooks after <b>L</b>akhs (Finance); <b>L</b>aw → <b>M</b>andal</div>
      <div class="cp-chips"><span>2 Sep 1946</span><span>Nehru</span><span>Liaquat Ali Khan</span><span>Interim Government</span></div>
    `
  },

  /* ─────────── 114 · QUESTION ─────────── */
  114: {
    questext: "In the Interim Government of 1946, who held the Finance portfolio?",
    options: ["Dr. John Mathai", "R. K. Shanmugham Chetty", "C. Rajagopalachari", "Liaquat Ali Khan"],
    correct: "4",
    exptext: "✅ Liaquat Ali Khan of the Muslim League. 📌 R. K. Shanmugham Chetty became the first Finance Minister of independent India.",
  },

  /* ─────────── 115 · QUESTION ─────────── */
  115: {
    questext: "Who held the Law portfolio in the Interim Government of 1946?",
    options: ["Asaf Ali", "Joginder Nath Mandal", "Rajendra Prasad", "B. R. Ambedkar"],
    correct: "2",
    exptext: "✅ J. N. Mandal. 📌 Dr Ambedkar became the Law Minister in the First Cabinet of independent India (1947).",
  },

  /* ─────────── 116 · QUESTION ─────────── */
  116: {
    questext: "Who was the Vice-President of the Viceroy's Executive Council in the Interim Government (2 Sept 1946)?",
    options: ["Jawaharlal Nehru", "Rajendra Prasad", "M. A. Jinnah", "Sardar Patel"],
    correct: "1",
    exptext: "✅ Jawaharlal Nehru, who also held External Affairs and Commonwealth Relations. 📌 Sardar Patel had Home, Information and Broadcasting.",
  },

  /* ─────────── 117 · CONCEPT PAGE — First Cabinet of Independent India (1947) ─────────── */
  117: {
    type: "concept",
    icon: "🇮🇳",
    accent: "#22c55e",
    pauseTimer: true,
    title: "First Cabinet of Independent India (1947)",
    html: `
      <p class="cp-lead">On <b>15 August 1947</b> free India got its <u>first Union Cabinet</u>. It had leaders from different regions and communities and even a non-Congress leader (Dr. Ambedkar) — to show a <b>national unity government</b>.</p>
      <table><thead><tr><th>Member</th><th>Portfolio</th></tr></thead><tbody><tr><td>Jawaharlal Nehru</td><td>Prime Minister; External Affairs &amp; Commonwealth Relations; Scientific Research</td></tr><tr><td>Sardar Vallabhbhai Patel</td><td>Home, Information and Broadcasting; States</td></tr><tr><td>Dr. Rajendra Prasad</td><td>Food and Agriculture</td></tr><tr><td>Maulana Abul Kalam Azad</td><td>Education</td></tr><tr><td>Dr. John Mathai</td><td>Railways and Transport</td></tr><tr><td>R. K. Shanmugham Chetty</td><td>Finance</td></tr><tr><td>Dr. B. R. Ambedkar</td><td>Law</td></tr><tr><td>Jagjivan Ram</td><td>Labour</td></tr><tr><td>Sardar Baldev Singh</td><td>Defence</td></tr><tr><td>Rajkumari Amrit Kaur</td><td>Health</td></tr><tr><td>C. H. Bhabha</td><td>Commerce</td></tr><tr><td>Rafi Ahmed Kidwai</td><td>Communication</td></tr><tr><td>Dr. Shyama Prasad Mukherjee</td><td>Industries and Supplies</td></tr><tr><td>V. N. Gadgil</td><td>Works, Mines and Power</td></tr></tbody></table>
      <div class="cp-note exam"><b>Firsts</b>: Nehru — first PM; Patel — first Home Minister (and Deputy PM); Chetty — first Finance Minister; Ambedkar — first Law Minister; Rajkumari Amrit Kaur — first (woman) Health Minister.</div>
      <div class="cp-note trap">Patel was the Home Minister in the Interim Government too — but in 1947 he also got the <b>Ministry of States</b>, which handled the integration of princely states.</div>
      <div class="cp-mnemonic">Remember: <b>C</b>hetty = <b>C</b>ash (Finance), <b>A</b>mbedkar = <b>A</b>rticles (Law), <b>A</b>mrit Kaur = <b>A</b>rogya (Health)</div>
      <div class="cp-chips"><span>First Cabinet</span><span>Ambedkar</span><span>Shanmugham Chetty</span><span>Amrit Kaur</span></div>
    `
  },

  /* ─────────── 118 · QUESTION ─────────── */
  118: {
    questext: "Who was the first Finance Minister of independent India?",
    options: ["Liaquat Ali Khan", "John Mathai", "R. K. Shanmugham Chetty", "C. D. Deshmukh"],
    correct: "3",
    exptext: "✅ R. K. Shanmugham Chetty. 📌 John Mathai succeeded him as the Finance Minister in 1948. Liaquat Ali Khan held the portfolio only in the Interim Government.",
  },

  /* ─────────── 119 · QUESTION ─────────── */
  119: {
    questext: "Who was the first Law Minister of independent India?",
    options: ["Dr. B. R. Ambedkar", "Sardar Patel", "Dr. Rajendra Prasad", "Rafi Ahmed Kidwai"],
    correct: "1",
    exptext: "✅ Dr B. R. Ambedkar. 📌 He was also the Chairman of the Drafting Committee of the Constituent Assembly.",
  },

  /* ─────────── 120 · QUESTION ─────────── */
  120: {
    questext: "Who was the Minister of Industries and Supplies in the First Cabinet of independent India?",
    options: ["C. H. Bhabha", "Dr. Shyama Prasad Mukherjee", "V. N. Gadgil", "Rafi Ahmed Kidwai"],
    correct: "2",
    exptext: "✅ Dr Shyama Prasad Mukherjee. 📌 V. N. Gadgil had Works, Mines and Power; Kidwai had Communication.",
  },

  /* ─────────── 121 · CONCEPT PAGE — 2. Constituent Assembly and Making of the Constitution ─────────── */
  121: {
    type: "concept",
    icon: "🖋️",
    accent: "#6366f1",
    pauseTimer: true,
    title: "2. Constituent Assembly and Making of the Constitution",
    html: `
      <p class="cp-lead">The <b>Constituent Assembly</b> was the special body that <u>wrote the Constitution of India</u>. Its members were chosen by the elected members of provincial assemblies — so it represented the people in an indirect way.</p>
      <div class="cp-stats"><div class="cp-stat"><b>389</b><span>Original strength</span></div><div class="cp-stat"><b>299</b><span>After Partition</span></div><div class="cp-stat"><b>9 Dec 1946</b><span>First meeting</span></div><div class="cp-stat"><b>26 Nov 1949</b><span>Adopted</span></div></div>
      <div class="cp-divider">1 · How was it formed?</div>
      <ol class="cp-steps"><li>The Cabinet Mission planned a Constituent Assembly to frame the Constitution.</li><li>Members were <b>elected by the Provincial Legislative Assemblies</b>.</li><li>Each Province and each Indian State got seats roughly in the ratio of <u>one to a million</u> of its population.</li><li>The seats of each Province were shared among the main communities there: <b>Sikh, Muslim and General</b>.</li></ol>
      <div class="cp-divider">2 · Important events</div>
      <ul class="cp-timeline"><li><b>9 Dec 1946</b><br>First meeting. <u>Sachchidananda Sinha</u>, the oldest member, was the temporary president.</li><li><b>11 Dec 1946</b><br><u>Dr. Rajendra Prasad</u> was elected the President of the Constituent Assembly.</li><li><b>13 Dec 1946</b><br>Nehru moved the <b>Objectives Resolution</b>. It later became the Preamble.</li><li><b>22 July 1947</b><br>The National Flag was adopted.</li><li><b>29 Aug 1947</b><br>The <b>Drafting Committee</b> was set up under Dr. B. R. Ambedkar.</li><li><b>26 Nov 1949</b><br>The Constitution was adopted (Articles on citizenship, elections, etc. came into force at once).</li><li><b>24 Jan 1950</b><br>Members signed the Constitution. <b>26 Jan 1950</b> — it came into force.</li></ul>
      <div class="cp-note remember">After <u>15 August 1947</u> the Constituent Assembly also worked as the <b>Central Legislature</b> with complete sovereignty. When it met to make laws, it was chaired by G. V. Mavalankar.</div>
      <div class="cp-note exam"><b>Time taken: 2 years, 11 months, 18 days</b>. Total of 11 sessions and 165 days of work. After Partition, the membership came down to <u>299</u>.</div>
      <div class="cp-note trap">The Constituent Assembly was <b>not elected on adult franchise</b>. Do not say it was elected by direct vote of all citizens.</div>
      <div class="cp-mnemonic"><b>9-11-13</b> December 1946: <b>9</b> first meeting, <b>11</b> President, <b>13</b> Objectives Resolution</div>
      <details class="cp-collapse"><summary>What happened to the Constitution after it was adopted?</summary><p>The Constitution was passed on 26 November 1949, but only a few provisions (citizenship, elections, provisional parliament and temporary provisions) came into force at once. The rest started on 26 January 1950, the day we celebrate as Republic Day. Since 2015, 26 November is observed as Constitution Day (Samvidhan Diwas).</p></details>
      <div class="cp-chips"><span>Constituent Assembly</span><span>Rajendra Prasad</span><span>Objectives Resolution</span><span>389 members</span></div>
    `
  },

  /* ─────────── 122 · QUESTION ─────────── */
  122: {
    questext: "The members of the Constituent Assembly were elected by:",
    options: ["The Provincial Legislative Assemblies", "The Viceroy", "Direct vote of all adult citizens", "The British Parliament"],
    correct: "1",
    exptext: "✅ Provincial Legislative Assemblies. 📌 Seats were distributed in the ratio of about one per million.",
  },

  /* ─────────── 123 · QUESTION ─────────── */
  123: {
    questext: "Who was the temporary (interim) President of the Constituent Assembly at its first meeting?",
    options: ["Jawaharlal Nehru", "B. R. Ambedkar", "Sachchidananda Sinha", "Rajendra Prasad"],
    correct: "3",
    exptext: "✅ Dr Sachchidananda Sinha, the oldest member. 📌 Rajendra Prasad was elected permanent President on 11 Dec 1946.",
  },

  /* ─────────── 124 · QUESTION ─────────── */
  124: {
    questext: "The first meeting of the Constituent Assembly was held on:",
    options: ["13 December 1946", "9 December 1946", "26 November 1949", "15 August 1947"],
    correct: "2",
    exptext: "✅ 9 December 1946. 📌 13 Dec 1946 was the day of the Objectives Resolution.",
  },

  /* ─────────── 125 · QUESTION ─────────── */
  125: {
    questext: "The Objectives Resolution in the Constituent Assembly was moved by:",
    options: ["Jawaharlal Nehru", "K. M. Munshi", "B. R. Ambedkar", "Sardar Patel"],
    correct: "1",
    exptext: "✅ Jawaharlal Nehru on 13 Dec 1946. 📌 It later formed the base of the Preamble.",
  },

  /* ─────────── 126 · QUESTION ─────────── */
  126: {
    questext: "How long did the Constituent Assembly take to frame the Constitution?",
    options: ["4 years 2 months", "1 year 6 months", "2 years, 11 months and 18 days", "3 years 11 months"],
    correct: "3",
    exptext: "✅ 2 years 11 months 18 days. 📌 The Constitution was adopted on 26 Nov 1949.",
  },

  /* ─────────── 127 · QUESTION ─────────── */
  127: {
    questext: "After Partition (August 1947), the strength of the Constituent Assembly was reduced to:",
    options: ["299", "250", "284", "389"],
    correct: "1",
    exptext: "✅ 299. 📌 389 was the original strength, and 284 members signed the final document on 24 Jan 1950.",
  },

  /* ─────────── 128 · CONCEPT PAGE — Important Committees of the Constituent Assembly and their Chairman ─────────── */
  128: {
    type: "concept",
    icon: "🗂️",
    accent: "#ec4899",
    pauseTimer: true,
    title: "Important Committees of the Constituent Assembly and their Chairman",
    html: `
      <p class="cp-lead">The Constituent Assembly did its work through <u>committees</u>. Knowing <b>which committee was led by whom</b> is one of the most-repeated facts of Polity.</p>
      <table><thead><tr><th>S.</th><th>Name of the Committee</th><th>Chairman</th></tr></thead><tbody><tr><td>1</td><td>Committee on the Rules of Procedure</td><td><b>Dr. Rajendra Prasad</b></td></tr><tr><td>2</td><td>Steering Committee</td><td><b>Dr. Rajendra Prasad</b></td></tr><tr><td>3</td><td>Finance and Staff Committee</td><td><b>Dr. Rajendra Prasad</b></td></tr><tr><td>4</td><td>Ad hoc Committee on the National Flag</td><td><b>Dr. Rajendra Prasad</b></td></tr><tr><td>5</td><td>Union Constitution Committee</td><td><b>Pt. Jawaharlal Nehru</b></td></tr><tr><td>6</td><td>Union Powers Committee</td><td><b>Pt. Jawaharlal Nehru</b></td></tr><tr><td>7</td><td>States Committee</td><td><b>Pt. Jawaharlal Nehru</b></td></tr><tr><td>8</td><td>Advisory Committee on Fundamental Rights, Minorities and Tribal and Excluded Areas</td><td><b>Sardar Vallabhbhai Patel</b></td></tr><tr><td>9</td><td>Drafting Committee</td><td><b>Dr. B. R. Ambedkar</b></td></tr><tr><td>10</td><td>Credential Committee</td><td><b>Alladi Krishnaswami Ayyar</b></td></tr></tbody></table>
      <div class="cp-grid c3"><div class="cp-card blue"><div class="cp-card-title">Prasad's 4</div>Rules, Steering, Finance &amp; Staff, Ad hoc Flag.</div><div class="cp-card green"><div class="cp-card-title">Nehru's 3</div>Union Constitution, Union Powers, States.</div><div class="cp-card amber"><div class="cp-card-title">One each</div>Patel — Advisory; Ambedkar — Drafting; Ayyar — Credential.</div></div>
      <div class="cp-note exam">The <b>Drafting Committee</b> (29 Aug 1947) had <u>7 members</u>, with Dr. B. R. Ambedkar as Chairman. B. N. Rau was the Constitutional Adviser.</div>
      <div class="cp-note remember">Sub-committees of the Advisory Committee: <b>Fundamental Rights Sub-Committee — J. B. Kripalani</b>; <b>Minorities Sub-Committee — H. C. Mukherjee</b>.</div>
      <div class="cp-note trap">Dr. Ambedkar is called the <u>‘Father of the Constitution’</u>, but the <b>President</b> of the Constituent Assembly was Dr. Rajendra Prasad.</div>
      <div class="cp-mnemonic"><b>P</b>rasad = <b>P</b>rocedure, <b>P</b>rogramme (Steering), <b>P</b>urse (Finance), <b>P</b>ataka (Flag). <b>N</b>ehru = <b>N</b>ation's structure (Union and States).</div>
      <div class="cp-chips"><span>Drafting Committee</span><span>Ambedkar</span><span>Union Powers — Nehru</span><span>Advisory — Patel</span></div>
    `
  },

  /* ─────────── 129 · QUESTION ─────────── */
  129: {
    questext: "Who was the Chairman of the Drafting Committee of the Constituent Assembly?",
    options: ["Dr. B. R. Ambedkar", "Sardar Patel", "Jawaharlal Nehru", "Dr. Rajendra Prasad"],
    correct: "1",
    exptext: "✅ Dr B. R. Ambedkar. 📌 Prasad was the President of the Assembly.",
  },

  /* ─────────── 130 · QUESTION ─────────── */
  130: {
    questext: "Who chaired the Union Powers Committee of the Constituent Assembly?",
    options: ["Sardar Patel", "K. M. Munshi", "Jawaharlal Nehru", "Rajendra Prasad"],
    correct: "3",
    exptext: "✅ Nehru (also Union Constitution and States Committees).",
  },

  /* ─────────── 131 · QUESTION ─────────── */
  131: {
    questext: "The Advisory Committee on Fundamental Rights, Minorities and Tribal and Excluded Areas was headed by:",
    options: ["Dr. B. R. Ambedkar", "Sardar Vallabhbhai Patel", "Alladi Krishnaswami Ayyar", "J. B. Kripalani"],
    correct: "2",
    exptext: "✅ Sardar Patel. 📌 J. B. Kripalani chaired its Fundamental Rights sub-committee.",
  },

  /* ─────────── 132 · QUESTION ─────────── */
  132: {
    questext: "Who was the Chairman of the Credential Committee of the Constituent Assembly?",
    options: ["Rajendra Prasad", "Alladi Krishnaswami Ayyar", "H. C. Mukherjee", "K. M. Munshi"],
    correct: "2",
    exptext: "✅ Alladi Krishnaswami Ayyar. 📌 He was also a member of the Drafting Committee.",
  },

  /* ─────────── 133 · QUESTION ─────────── */
  133: {
    questext: "Which of the following committees of the Constituent Assembly was headed by Dr. Rajendra Prasad?",
    options: ["Union Constitution Committee", "States Committee", "Drafting Committee", "Steering Committee"],
    correct: "4",
    exptext: "✅ Steering Committee (also Rules of Procedure, Finance & Staff, and Ad hoc Committee on the National Flag).",
  },

  /* ─────────── 134 · QUESTION ─────────── */
  134: {
    questext: "Which of the following committee–chairman pairs is INCORRECT?",
    options: ["Drafting Committee — Jawaharlal Nehru", "States Committee — Jawaharlal Nehru", "Rules of Procedure — Rajendra Prasad", "Credential Committee — Alladi Krishnaswami Ayyar"],
    correct: "1",
    exptext: "✅ Incorrect pair: Drafting Committee was chaired by Dr B. R. Ambedkar, not Nehru. 📌 Others are correct as per the table.",
  },

  /* ─────────── 135 · QUESTION ─────────── */
  135: {
    questext: "How many members were there in the Drafting Committee when it was set up on 29 August 1947?",
    options: ["5", "9", "11", "7"],
    correct: "4",
    exptext: "✅ Seven members, with Dr Ambedkar as Chairman.",
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which concept page)
     images/714edc1c-09d3-42f6-83fc-755cfc7ececc.png → ENTRY 1 (class overview, "thumb" field)
     aaf8c16e-b2dc-40d6-b870-5a23b2af19e3.png → "1. Evolution of Indian Constitution"
     ce1e67a5-22f5-4377-8402-2303d71a97e8.png → "Montagu-Chelmsford Reforms and the Government of India Act, 1919" (Dyarchy)
     7910ca94-6279-4270-a113-b08574a43986.png → "The Government of India Act, 1935" (three lists)
     bdcc92f4-8d64-4a3e-afb1-f93bf941b630.png → "Cabinet Mission Plan" (Groups A, B, C)

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name)
   images/714edc1c-09d3-42f6-83fc-755cfc7ececc.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920×1080 px, ultra-sharp, vibrant cinematic 3D illustration in deep indigo, violet and electric-blue tones (accent #6366f1) with warm saffron-gold highlights. Dark edges and a bright soft glow behind the right-centre of the frame, where a teacher's photo will be placed later. Spread a few soft, glowing, slightly blurred decorative 3D elements behind the right side: an open book of law, a golden scale of justice, a quill pen with a rolled scroll, and a glowing Ashoka-wheel style circle. Keep the LEFT 62% of the frame calm, darker and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image. Clean, most beautiful, colorful, professional, high-contrast composition.
   aaf8c16e-b2dc-40d6-b870-5a23b2af19e3.png: Create a clean, colorful horizontal infographic timeline on a dark navy background, 1600×900 px, titled with NO text in the image except these short labels in large clear English: "1773 Regulating Act", "1784 Pitt's India Act", "1833 Charter Act", "1858 Crown Rule", "1909 Morley-Minto", "1919 Dyarchy", "1935 Provincial Autonomy", "1947 Independence", "1950 Constitution". Use evenly spaced glowing milestone dots joined by a line, each label under a small simple icon, a gradient from indigo to saffron along the line. Flat modern vector style, high contrast, no people, no logos, no watermarks.
   ce1e67a5-22f5-4377-8402-2303d71a97e8.png: Create a clear educational diagram on a dark navy background, 1600×900 px, with the heading "DYARCHY 1919 (Provinces)". A central box "GOVERNOR" splits into two columns. Left column in green titled "TRANSFERRED SUBJECTS" with the items "Education, Health, Local Self-Government, Agriculture" and below it "Ministers responsible to Legislative Council". Right column in red titled "RESERVED SUBJECTS" with the items "Police, Justice, Land Revenue, Finance" and below it "Governor + Executive Council". Flat modern vector style, large readable English text, no people, no logos, no watermarks.
   7910ca94-6279-4270-a113-b08574a43986.png: Create a clear educational diagram on a dark navy background, 1600×900 px, with the heading "GOVERNMENT OF INDIA ACT, 1935 — THREE LISTS". Three equal coloured boxes: blue "FEDERAL LIST — only the Federal Legislature makes laws", green "PROVINCIAL LIST — only the Provincial Legislature makes laws", amber "CONCURRENT LIST — both can make laws". Add a small note below: "Residuary powers: Governor-General". Flat modern vector style, large readable English text, no people, no logos, no watermarks.
   bdcc92f4-8d64-4a3e-afb1-f93bf941b630.png: Create a simple schematic (NOT a geographic map) on a dark navy background, 1600×900 px, with the heading "CABINET MISSION PLAN 1946 — GROUPING OF PROVINCES". Three rounded boxes: "GROUP A — Madras, Bombay, UP, Bihar, CP, Orissa" in green; "GROUP B — Punjab, NWFP, Sind" in blue; "GROUP C — Bengal, Assam" in amber. Above them a bigger box "UNION OF INDIA: Foreign Affairs, Defence, Communications". Flat modern vector style, large readable English text, no people, no logos, no watermarks.
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   CHANGE LOG (kept here only; nothing of this is written inside the pages)
   • Interim Government: the table is dated Sept 1946 (book prints "Cabinet Mission in 1945"); League members joined 26 Oct 1946.
   • Spellings corrected: Elijah Impey, Lemaistre (book: "Impe", "Limenster"); Shanmugham Chetty kept as in book.
   • Dominion Status: book credits the Simon Commission (1929); the 1929 declaration was made by Viceroy Lord Irwin, so the page says so.
   • Constitution counts: original 22 parts / 395 articles / 8 schedules; present ≈ 25 parts / ≈ 448 articles / 12 schedules. Check the latest amendment count before using it.
   • Union Territories: 8 (J&K and Ladakh are UTs since 2019; Dadra & Nagar Haveli and Daman & Diu merged in 2020).
   • National Flag: ratio 3:2, adopted 22 July 1947, added for completeness. Constitution Day (26 Nov) observed since 2015.
   • Uncodified constitutions: UK, plus New Zealand and Israel (book says only the UK).
   • Charter Act 1813: tea and China trade stayed with the Company; ₹1 lakh education grant added.
   • Constituent Assembly: dates, strength after Partition (299) and committee extras (Kripalani, H. C. Mukherjee) added from standard sources.
   • Women's vote 1919: described as allowed (province by province), not granted outright.
   • exptext is plain text with emojis (✅ 📌 ❌); if your portal renders HTML there, it can be upgraded.
   ════════════════════════════════════════════════════════════════ */