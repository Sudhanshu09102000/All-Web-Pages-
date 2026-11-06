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
    title: "Class Overview — Important Parts, Articles of the Constitution",
    thumb: {
      image: "images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/thumbnail.png",
      banner: "ALL COMPETITIVE EXAMS",
      line1: "INDIAN POLITY",
      line2: "PARTS & ARTICLES",
      line3: "OF THE CONSTITUTION",
      badge: "FULL CLASS",
      ribbon: "PARTS • ARTICLES • PRACTICE",
      burst: "SSC • UPSC • Banking",
      mode: "creator"
    },
    yt: {
      "title": "Important Parts & Articles of the Indian Constitution | Polity for All Competitive Exams",
      "altTitles": [
        "Indian Constitution Parts and Articles in One Class | SSC, UPSC, Banking, Railways",
        "Article 1 to 395: Which Part Has Which Subject? | Indian Polity Fast Revision",
        "Fundamental Rights, DPSP, Emergency & Elections Articles | Polity Full Class",
        "Constitution Articles Memory Tricks + Practice Questions | All Competitive Exams"
      ],
      "description": "Parts and Articles of the Constitution are asked in almost every competitive exam — in this class you learn them with simple explanations, tables, traps and memory hooks.\n\n📌 IN THIS CLASS\n✅ Part I–II: Union, territory and citizenship\n✅ Part III: all Fundamental Rights, writs and Art. 33–35\n✅ Part IV and IV A: Directive Principles and Fundamental Duties\n✅ Part V: President, Parliament, Judiciary, Lokpal, Lokayukta and CAG\n✅ Part VI to XXII: States, Panchayats, Finance, Services, Elections, Languages, Emergency, Amendment, Special status\n✅ 178 practice questions right after the concepts\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Part-I (Art. 1–4) · Part-II (Art. 5–11)\n00:00 Part-III Fundamental Rights\n00:00 Right to Equality (Art. 14–18)\n00:00 Right to Freedom (Art. 19–22)\n00:00 Right against Exploitation (Art. 23–24)\n00:00 Right to Freedom of Religion (Art. 25–28)\n00:00 Cultural and Educational Rights (Art. 29–30)\n00:00 Saving of certain Laws (Art. 31A–31C)\n00:00 Right to Constitutional Remedies (Art. 32)\n00:00 Art. 33 to 35\n00:00 Part IV\n00:00 Parts of Indian Constitution\n00:00 Part IV continued\n00:00 Part IV continued\n00:00 Part IV A\n00:00 Part V\n00:00 Chapter–I : The Executive (Art. 52–76)\n00:00 Chapter–II : Parliament (Art. 79–100)\n00:00 Chapter–II : Parliament (Art. 105–122)\n00:00 Chapter–III : Legislative Powers of the President (Art. 123)\n00:00 Chapter–IV : The Union Judiciary (Art. 124–135)\n00:00 Chapter–IV : The Union Judiciary (Art. 136–144)\n00:00 Lokpal\n00:00 Lokayukta\n00:00 Chapter–V : Comptroller and Auditor-General of India (Art. 148–149)\n00:00 Part VI to Part IX A\n00:00 Part IX B\n00:00 Part X to Part XII\n00:00 Part XIII\n00:00 Part XIV\n00:00 Part XIV A\n00:00 Part XV\n00:00 Part XVI and Part XVII\n00:00 Part XVIII\n00:00 Part XIX\n00:00 Part XX\n00:00 Part XXI\n00:00 Part XXII\n\n👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n#IndianPolity #ConstitutionOfIndia #SSC #UPSC",
      "tags": [
        "indian polity",
        "articles of indian constitution",
        "parts of indian constitution",
        "fundamental rights articles",
        "directive principles articles",
        "fundamental duties article 51A",
        "emergency provisions article 352",
        "article 32 writs",
        "polity for ssc",
        "polity for upsc",
        "polity for banking",
        "polity for railways",
        "polity for defence exams",
        "important articles of constitution",
        "constitution articles tricks",
        "polity mcq",
        "lokpal and lokayukta",
        "indian constitution parts 1 to 22",
        "polity fast revision",
        "competitive exams polity"
      ],
      "hashtags": [
        "IndianPolity",
        "ConstitutionOfIndia",
        "Articles",
        "CompetitiveExams"
      ],
      "thumbText": "PARTS & ARTICLES OF THE CONSTITUTION",
      "pinnedComment": "📌 Practice what you learned: solve all the questions in the class, then write your score below. Which Part or Article do you find most confusing — Emergency, Finance or Fundamental Rights? 👇",
      "communityPost": "📘 New class is live: Important Parts & Articles of the Indian Constitution — tables, traps, memory hooks and 178 practice questions for all competitive exams. Start with the class overview and tell me your score! 🎯",
      "chapters": "00:00 Class overview\n00:00 Part-I (Art. 1–4) · Part-II (Art. 5–11)\n00:00 Part-III Fundamental Rights\n00:00 Right to Equality (Art. 14–18)\n00:00 Right to Freedom (Art. 19–22)\n00:00 Right against Exploitation (Art. 23–24)\n00:00 Right to Freedom of Religion (Art. 25–28)\n00:00 Cultural and Educational Rights (Art. 29–30)\n00:00 Saving of certain Laws (Art. 31A–31C)\n00:00 Right to Constitutional Remedies (Art. 32)\n00:00 Art. 33 to 35\n00:00 Part IV\n00:00 Parts of Indian Constitution\n00:00 Part IV continued\n00:00 Part IV continued\n00:00 Part IV A\n00:00 Part V\n00:00 Chapter–I : The Executive (Art. 52–76)\n00:00 Chapter–II : Parliament (Art. 79–100)\n00:00 Chapter–II : Parliament (Art. 105–122)\n00:00 Chapter–III : Legislative Powers of the President (Art. 123)\n00:00 Chapter–IV : The Union Judiciary (Art. 124–135)\n00:00 Chapter–IV : The Union Judiciary (Art. 136–144)\n00:00 Lokpal\n00:00 Lokayukta\n00:00 Chapter–V : Comptroller and Auditor-General of India (Art. 148–149)\n00:00 Part VI to Part IX A\n00:00 Part IX B\n00:00 Part X to Part XII\n00:00 Part XIII\n00:00 Part XIV\n00:00 Part XIV A\n00:00 Part XV\n00:00 Part XVI and Part XVII\n00:00 Part XVIII\n00:00 Part XIX\n00:00 Part XX\n00:00 Part XXI\n00:00 Part XXII",
      "playlist": "Indian Polity — Constitution Full Classes"
    },
    html: `<p class="cp-lead">This class is a <u>complete walk through the Parts and Articles of the Indian Constitution</u> — which Part holds which subject, and which Article holds which idea. By the end you will <b>stop memorising numbers blindly and start recognising patterns</b>.</p><div class="cp-stats"><div class="cp-stat"><b>38</b><span>Concept pages</span></div><div class="cp-stat"><b>178</b><span>Practice questions</span></div><div class="cp-stat"><b>270+</b><span>Key facts</span></div><div class="cp-stat"><b>~185 min</b><span>Time needed</span></div></div><div class="cp-divider">Your roadmap</div><ul class="cp-timeline"><li><b>Part I–II</b><br>The Union, its territory and citizenship.</li><li><b>Part III — Fundamental Rights (Art. 12–35)</b><br>All six rights, writs, and the last Articles of the Part.</li><li><b>Part IV and IV A — DPSP and Fundamental Duties (Art. 36–51A)</b><br>Goals of the State and the 11 duties of citizens.</li><li><b>Parts of Indian Constitution</b><br>The master table of all Parts and Article ranges.</li><li><b>Part V — The Union (Art. 52–151)</b><br>Executive, Parliament, the President’s ordinances, Supreme Court, Lokpal, Lokayukta and CAG.</li><li><b>Part VI to Part XII</b><br>States, Panchayats, Municipalities, Co-operatives, Union–State relations and Finance.</li><li><b>Part XIII to Part XXII</b><br>Trade, Services, Tribunals, Elections, Languages, Emergency, Amendment, Special status and Repeals.</li></ul><div class="cp-divider">What you will be able to do</div><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">📚 Match Part to subject</div>Say instantly which Part deals with Panchayats, Elections, Emergency or Amendment.</div><div class="cp-card green"><div class="cp-card-title">🔢 Match Article to idea</div>Link key Articles such as 14, 21, 32, 44, 61, 72, 110, 124, 280, 311, 324, 352 and 368 with their meaning.</div><div class="cp-card amber"><div class="cp-card-title">🧠 Use memory hooks</div>Recall long Article lists with short mnemonics and keywords.</div><div class="cp-card red"><div class="cp-card-title">⚠️ Avoid traps</div>Spot look-alike Articles, such as 123 vs 213, 341 vs 342 and 268 vs 270.</div></div><div class="cp-note exam"><b>Why it matters:</b> “Which Article deals with…?” is one of the most repeated question types in SSC, UPSC, Banking, Railways and Defence exams.</div><div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages, so take your time.</div><div class="cp-chips"><span>Competitive exams</span><span>Indian Polity</span><span>Articles of the Constitution</span><span>Parts of the Constitution</span></div>`
  },

  /* ─────────── 2 · CONCEPT PAGE — Part-I (Art. 1–4) · Part-II (Art. 5–11) — The Union and its territory · Citizenship ─────────── */
  2: {
    type: "concept",
    icon: "🗺️",
    accent: "#22c55e",
    pauseTimer: true,
    title: "Part-I (Art. 1–4) · Part-II (Art. 5–11) — The Union and its territory · Citizenship",
    html: `<p class="cp-lead">The Constitution begins by answering two basic questions: <u>what is India</u> (Part I) and <u>who is an Indian</u> (Part II). Everything else — rights, duties, government — is built on these two answers.</p><div class="cp-stats"><div class="cp-stat"><b>Art. 1–4</b><span>Part I</span></div><div class="cp-stat"><b>Art. 5–11</b><span>Part II</span></div><div class="cp-stat"><b>2</b><span>Parts</span></div></div><div class="cp-divider">Part I · The Union and its territory</div><table><thead><tr><th>Article</th><th>What it says</th></tr></thead><tbody><tr><td><b>Art. 1</b></td><td>India, that is Bharat, is a <u>Union of States</u>.</td></tr><tr><td><b>Art. 2</b></td><td>Parliament can <u>admit or establish</u> new States into the Union.</td></tr><tr><td><b>Art. 3</b></td><td>Parliament can form new States and change the <u>areas, boundaries or names</u> of existing States.</td></tr><tr><td><b>Art. 4</b></td><td>Laws under Art. 2 and 3 are <u>not</u> treated as constitutional amendments under Art. 368.</td></tr></tbody></table><div class="cp-note remember"><b>Why Art. 4 matters:</b> because of it, a new State can be created by an ordinary law passed by a simple majority, without the long amendment procedure.</div><div class="cp-divider">Part II · Citizenship</div><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>Art. 5</b></td><td>Citizenship at the start of the Constitution</td></tr><tr><td><b>Art. 6–7</b></td><td>Rights of persons who migrated to or from Pakistan</td></tr><tr><td><b>Art. 8</b></td><td>Rights of persons of Indian origin living abroad</td></tr><tr><td><b>Art. 9</b></td><td>No Indian citizenship for a person who voluntarily takes foreign citizenship</td></tr><tr><td><b>Art. 10</b></td><td>Continuance of the rights of citizenship</td></tr><tr><td><b>Art. 11</b></td><td><u>Parliament</u> can regulate citizenship by law</td></tr></tbody></table><div class="cp-note trap"><b>Trap:</b> the Constitution only tells who was a citizen on 26 January 1950. Later rules for gaining or losing citizenship come from a Parliament law under Art. 11 (the Citizenship Act, 1955).</div><div class="cp-note exam"><b>Exam note:</b> “Art. 1–4 = Territory, Art. 5–11 = Citizenship” is a favourite one-line match question.</div><div class="cp-mnemonic"><b>1-4</b> → <b>T</b>erritory, <b>5-11</b> → <b>C</b>itizenship. Remember “<b>T</b>hree <b>C</b>ups” — T before C, 1 before 5.</div><div class="cp-chips"><span>Part I</span><span>Part II</span><span>Art. 3</span><span>Art. 11</span></div>`
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "Which Article of the Constitution says that “India, that is Bharat, shall be a Union of States”?",
    options: ["Article 2","Article 3","Article 4","Article 1"],
    correct: "4",
    exptext: "✅ Art. 1 gives India’s name and calls it a Union of States. 📌 Art. 1 = name, Art. 2 = admit new States, Art. 3 = reshape States. ❌ Art. 2, 3 and 4 deal with admission, formation and the legal effect of such laws, not the description of India.",
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "Articles 5 to 11 of the Constitution deal with which subject?",
    options: ["Citizenship","Fundamental Rights","The Union and its territory","Directive Principles of State Policy"],
    correct: "1",
    exptext: "✅ Part II (Art. 5–11) is about citizenship. 📌 Part I = territory, Part II = citizenship. ❌ Fundamental Rights are Art. 12–35 (Part III) and DPSP are Art. 36–51 (Part IV).",
  },

  /* ─────────── 5 · QUESTION ─────────── */
  5: {
    questext: "Under which Article can Parliament make laws to regulate the acquisition and termination of citizenship?",
    options: ["Article 5","Article 11","Article 3","Article 9"],
    correct: "2",
    exptext: "✅ Art. 11 gives Parliament full power to regulate citizenship by law. 📌 Art. 5–10 only fixed who was a citizen at the start. ❌ Art. 3 is about State boundaries and Art. 9 only says a person who voluntarily takes foreign citizenship is not an Indian citizen.",
  },

  /* ─────────── 6 · CONCEPT PAGE — Part-III Fundamental Rights ─────────── */
  6: {
    type: "concept",
    icon: "⚖️",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "Part-III Fundamental Rights",
    html: `<p class="cp-lead">Part III (<b>Art. 12–35</b>) is called the <u>Magna Carta of India</u>. It lists the basic rights that every person or citizen enjoys against the State, and the courts protect them.</p><div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/1.png" alt="Six Fundamental Rights with their Article numbers" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div><div class="cp-stats"><div class="cp-stat"><b>12–35</b><span>Articles</span></div><div class="cp-stat"><b>6</b><span>Fundamental Rights</span></div><div class="cp-stat"><b>Art. 12–13</b><span>Key opening Articles</span></div></div><div class="cp-divider">Your roadmap for Part III</div><table><thead><tr><th>Right</th><th>Articles</th></tr></thead><tbody><tr><td>Right to Equality</td><td>Art. 14–18</td></tr><tr><td>Right to Freedom</td><td>Art. 19–22 (incl. 21A)</td></tr><tr><td>Right against Exploitation</td><td>Art. 23–24</td></tr><tr><td>Right to Freedom of Religion</td><td>Art. 25–28</td></tr><tr><td>Cultural and Educational Rights</td><td>Art. 29–30</td></tr><tr><td>Right to Constitutional Remedies</td><td>Art. 32</td></tr><tr><td>Saving of certain Laws</td><td>Art. 31A–31C</td></tr><tr><td>Last Articles of Part III</td><td>Art. 33–35</td></tr></tbody></table><div class="cp-divider">The two opening Articles</div><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Art. 12 — Definition</div>Says what “<b>State</b>” means in Part III: the Government and Parliament of India, the Government and Legislature of every State, and all local or other authorities.</div><div class="cp-card violet"><div class="cp-card-title">Art. 13 — Inconsistent laws</div>Any law that goes against a Fundamental Right is <u>void</u> to the extent of the inconsistency. This is the base of <b>judicial review</b>.</div></div><div class="cp-note remember"><b>Property:</b> the Right to Property was a Fundamental Right (Art. 31) at first. It was removed by the 44th Amendment (1978) and is now a legal right under <b>Art. 300A</b>, which is why we have only <u>six</u> Fundamental Rights today.</div><div class="cp-note trap"><b>Trap:</b> Art. 12 and 13 are <u>not</u> separate rights. They are tools that tell us who must follow the rights and what happens to laws that break them.</div><div class="cp-note exam"><b>Exam note:</b> “Which Article defines State?” and “Which is no longer a Fundamental Right?” are repeated questions.</div><div class="cp-mnemonic"><b>12</b> = who is bound (Definition), <b>13</b> = what happens to bad laws (void).</div><div class="cp-chips"><span>Art. 12</span><span>Art. 13</span><span>Judicial review</span><span>6 rights</span></div>`
  },

  /* ─────────── 7 · QUESTION ─────────── */
  7: {
    questext: "Which Article defines the term “State” for the purposes of Part III (Fundamental Rights)?",
    options: ["Article 13","Article 14","Article 12","Article 36"],
    correct: "3",
    exptext: "✅ Art. 12 defines “State” for Fundamental Rights. 📌 Art. 36 defines State for Part IV (DPSP). ❌ Art. 13 deals with laws against the rights, and Art. 14 is the first right (equality).",
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "According to Article 13, a law that is inconsistent with the Fundamental Rights is —",
    options: ["valid only for one year","valid if the President approves it","only suspended until it is amended","void to the extent of the inconsistency"],
    correct: "4",
    exptext: "✅ Art. 13 makes such a law void to the extent of the conflict. 📌 This gives courts the power of judicial review. ❌ The Constitution does not allow a one-year validity, presidential approval or mere suspension.",
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "Which of the following is NOT a Fundamental Right at present?",
    options: ["Right to Property","Right to Equality","Right against Exploitation","Right to Constitutional Remedies"],
    correct: "1",
    exptext: "✅ Right to Property was removed from Part III by the 44th Amendment, 1978. 📌 It is now a legal right under Art. 300A. ❌ Equality, protection against exploitation and constitutional remedies are all still Fundamental Rights.",
  },

  /* ─────────── 10 · QUESTION ─────────── */
  10: {
    questext: "How many Fundamental Rights are guaranteed by the Constitution at present?",
    options: ["Seven","Six","Five","Eight"],
    correct: "2",
    exptext: "✅ There are six rights today. 📌 Originally there were seven; the Right to Property was dropped. ❌ Seven was the original number; five and eight were never correct.",
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "Consider the statements about the Right to Property:\n1. It was originally a Fundamental Right under Article 31.\n2. It was removed from the list of Fundamental Rights by the 44th Amendment.\n3. It is now a constitutional right under Article 300A.\nWhich of the statements are correct?",
    options: ["1 and 2 only","2 and 3 only","1 and 3 only","1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three statements are correct. 📌 Property moved from Part III to Part XII (Art. 300A). ❌ Leaving out any one statement makes the option incomplete.",
  },

  /* ─────────── 12 · CONCEPT PAGE — Right to Equality (Art. 14–18) ─────────── */
  12: {
    type: "concept",
    icon: "🟰",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Right to Equality (Art. 14–18)",
    html: `<p class="cp-lead">The Right to Equality says that the law treats everyone alike. No one gets special treatment just because of who they are. Five Articles make this real: <b>14, 15, 16, 17 and 18</b>.</p><div class="cp-stats"><div class="cp-stat"><b>Art. 14–18</b><span>Articles</span></div><div class="cp-stat"><b>5</b><span>Articles</span></div><div class="cp-stat"><b>Art. 14</b><span>For all persons</span></div></div><table><thead><tr><th>Article</th><th>What it gives</th><th>Who gets it</th></tr></thead><tbody><tr><td><b>14</b></td><td>Equality before law and equal protection of the laws</td><td>All <u>persons</u></td></tr><tr><td><b>15</b></td><td>No discrimination on grounds of religion, race, caste, sex or place of birth</td><td><u>Citizens</u></td></tr><tr><td><b>16</b></td><td>Equality of opportunity in public employment</td><td><u>Citizens</u></td></tr><tr><td><b>17</b></td><td>Abolition of untouchability</td><td>Everyone</td></tr><tr><td><b>18</b></td><td>Abolition of titles</td><td>Citizens (and foreigners holding office)</td></tr></tbody></table><div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">Art. 15 and 16 — exceptions</div>The State may make special provisions for women, children, SC, ST and backward classes. In 2019 the 103rd Amendment added 10% reservation for economically weaker sections in <b>Art. 15(6)</b> and <b>Art. 16(6)</b>.</div><div class="cp-card amber"><div class="cp-card-title">Art. 17 — law</div>Untouchability is an offence. The law is the Protection of Civil Rights Act, 1955.</div><div class="cp-card blue"><div class="cp-card-title">Art. 18 — titles</div>The State cannot give titles, except <u>military and academic</u> distinctions. Awards like Bharat Ratna and Padma awards are not titles.</div><div class="cp-card violet"><div class="cp-card-title">Art. 14 — two ideas</div>“Equality before law” is a British idea (no one above the law). “Equal protection of laws” is an American idea (equals treated equally).</div></div><div class="cp-note trap"><b>Trap:</b> Art. 14 protects <u>all persons</u>, including foreigners. Art. 15 and 16 protect only <u>citizens</u>.</div><div class="cp-note exam"><b>Exam note:</b> the five grounds in Art. 15 are religion, race, caste, sex, place of birth. “Descent” and “residence” appear only in Art. 16.</div><div class="cp-mnemonic"><b>14</b> everyone equal · <b>15</b> five grounds · <b>16</b> jobs · <b>17</b> untouchability · <b>18</b> titles — “<b>1</b>-<b>4</b> to <b>8</b>”: 14 → 18, five Articles.</div><div class="cp-chips"><span>Art. 14</span><span>Art. 15</span><span>Art. 16</span><span>Art. 17</span><span>Art. 18</span></div>`
  },

  /* ─────────── 13 · QUESTION ─────────── */
  13: {
    questext: "Which Article of the Constitution abolishes untouchability?",
    options: ["Article 14","Article 15","Article 17","Article 18"],
    correct: "3",
    exptext: "✅ Art. 17 abolishes untouchability and makes its practice an offence. 📌 Art. 17 = untouchability, Art. 18 = titles. ❌ Art. 14 is equality before law, Art. 15 prohibits discrimination and Art. 18 abolishes titles.",
  },

  /* ─────────── 14 · QUESTION ─────────── */
  14: {
    questext: "“Equality before law and equal protection of the laws” within the territory of India is guaranteed to all persons by —",
    options: ["Article 14","Article 15","Article 16","Article 21A"],
    correct: "1",
    exptext: "✅ Art. 14 covers all persons, citizens and non-citizens alike. 📌 Equality starts with Art. 14. ❌ Art. 15 and 16 are for citizens only, and Art. 21A is about education.",
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "Discrimination on grounds only of religion, race, caste, sex or place of birth is prohibited by —",
    options: ["Article 14","Article 15","Article 16","Article 17"],
    correct: "2",
    exptext: "✅ Art. 15 lists exactly these five grounds. 📌 Five grounds, Art. 15. ❌ Art. 16 is about jobs, Art. 17 about untouchability and Art. 14 is the general equality rule.",
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "Which of the following is NOT prohibited by Article 18 — that is, which distinction may a citizen still accept from the State?",
    options: ["Title of “Rai Bahadur”","Title of “Raja”","Military and academic distinctions","Title of “Sir”"],
    correct: "3",
    exptext: "✅ Art. 18 allows only military and academic distinctions. 📌 Bharat Ratna and Padma awards are not titles. ❌ Rai Bahadur, Raja and Sir are the titles of the colonial and princely era and are abolished.",
  },

  /* ─────────── 17 · QUESTION ─────────── */
  17: {
    questext: "Consider the following Articles:\n1. Article 14\n2. Article 15\n3. Article 16\nWhich of these rights is available to foreigners also?",
    options: ["1 only","1 and 2 only","2 and 3 only","1, 2 and 3"],
    correct: "1",
    exptext: "✅ Only Art. 14 is available to all persons, including foreigners. 📌 Art. 14 = persons, Art. 15 and 16 = citizens. ❌ The other options wrongly include Art. 15 and 16.",
  },

  /* ─────────── 18 · QUESTION ─────────── */
  18: {
    questext: "The 10% reservation for economically weaker sections (103rd Amendment, 2019) was added through which clauses?",
    options: ["Article 15(4) and Article 16(4)","Article 15(6) and Article 16(6)","Article 15(5) and Article 16(5)","Article 17 and Article 18"],
    correct: "2",
    exptext: "✅ The 103rd Amendment inserted clauses (6) in Art. 15 and Art. 16. 📌 EWS = 103rd Amendment = 15(6) and 16(6). ❌ 15(4) and 16(4) deal with backward classes, and Art. 15(5) with admission to educational institutions.",
  },

  /* ─────────── 19 · CONCEPT PAGE — Right to Freedom (Art. 19–22) ─────────── */
  19: {
    type: "concept",
    icon: "🕊️",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "Right to Freedom (Art. 19–22)",
    html: `<p class="cp-lead">Freedom is not only about moving about. It means speaking, forming groups, working, staying safe from unfair punishment, and being free from arbitrary arrest. Four main Articles cover it: <b>19, 20, 21 and 22</b>, plus <b>21A</b> for education.</p><div class="cp-stats"><div class="cp-stat"><b>Art. 19</b><span>6 freedoms</span></div><div class="cp-stat"><b>Art. 20</b><span>3 protections</span></div><div class="cp-stat"><b>Art. 21</b><span>Life & liberty</span></div><div class="cp-stat"><b>Art. 21A</b><span>Education</span></div></div><div class="cp-divider">Art. 19 — the six freedoms (citizens only)</div><table><thead><tr><th>Clause</th><th>Freedom</th></tr></thead><tbody><tr><td>19(1)(a)</td><td>Speech and expression</td></tr><tr><td>19(1)(b)</td><td>Assemble peacefully without arms</td></tr><tr><td>19(1)(c)</td><td>Form associations, unions or co-operative societies</td></tr><tr><td>19(1)(d)</td><td>Move freely throughout India</td></tr><tr><td>19(1)(e)</td><td>Reside and settle in any part of India</td></tr><tr><td>19(1)(g)</td><td>Practise any profession, occupation, trade or business</td></tr></tbody></table><div class="cp-note remember">The freedom to acquire, hold and dispose of property was Art. 19(1)(f). It was deleted by the 44th Amendment (1978), so clause (f) is missing in the list.</div><div class="cp-divider">Art. 20 to 22</div><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Art. 20 — fair punishment</div><ol><li>No <u>ex post facto</u> penal law.</li><li>No <u>double jeopardy</u> (punished twice for the same offence).</li><li>No <u>self-incrimination</u> (no one is forced to be a witness against himself).</li></ol></div><div class="cp-card green"><div class="cp-card-title">Art. 21 — life and liberty</div>No person shall lose life or personal liberty except by <u>procedure established by law</u>. It is available to <b>all persons</b>.</div><div class="cp-card amber"><div class="cp-card-title">Art. 21A — education</div>Free and compulsory education for children aged <b>6 to 14</b> years (86th Amendment, 2002).</div><div class="cp-card red"><div class="cp-card-title">Art. 22 — arrest and detention</div>Right to know the grounds, to consult a lawyer, and to be produced before a magistrate within <b>24 hours</b> (journey time not counted).</div></div><div class="cp-note trap"><b>Trap 1:</b> Art. 19 is only for <u>citizens</u>, but Art. 20, 21 and 22 protect <u>persons</u>. Art. 22 safeguards do not apply to enemy aliens or to persons under preventive detention.</div><div class="cp-note trick"><b>Trick:</b> Art. 20 and Art. 21 can never be suspended, even during a National Emergency (44th Amendment).</div><div class="cp-note exam"><b>Exam note:</b> the Maneka Gandhi case (1978) widened Art. 21 so that “procedure established by law” must also be fair and reasonable.</div><div class="cp-mnemonic"><b>20</b> = “<b>3 No’s</b>” (no retro-law, no double trial, no forced testimony). <b>21</b> = life. <b>22</b> = arrest, <b>24 hours</b>.</div><div class="cp-chips"><span>Art. 19</span><span>Art. 20</span><span>Art. 21</span><span>Art. 21A</span><span>Art. 22</span></div>`
  },

  /* ─────────── 20 · QUESTION ─────────── */
  20: {
    questext: "How many freedoms are guaranteed to citizens under Article 19(1) at present?",
    options: ["Seven","Five","Six","Eight"],
    correct: "3",
    exptext: "✅ There are six freedoms now. 📌 Originally seven; the property freedom was deleted. ❌ Seven is the old number; five and eight are never correct.",
  },

  /* ─────────── 21 · QUESTION ─────────── */
  21: {
    questext: "Protection against double jeopardy is provided under which Article?",
    options: ["Article 19","Article 21","Article 22","Article 20"],
    correct: "4",
    exptext: "✅ Art. 20(2) says no person can be prosecuted and punished twice for the same offence. 📌 Art. 20 = no retro-law, no double jeopardy, no self-incrimination. ❌ Art. 19 lists freedoms, Art. 21 is life and liberty, and Art. 22 is arrest and detention.",
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "Which of the following is NOT a freedom guaranteed under Article 19(1) at present?",
    options: ["Right to acquire, hold and dispose of property","Freedom of speech and expression","Freedom to form associations or unions","Freedom to move freely throughout India"],
    correct: "1",
    exptext: "✅ The property freedom (Art. 19(1)(f)) was deleted by the 44th Amendment. 📌 Property now lies in Art. 300A. ❌ Speech, association and free movement are all still in Art. 19(1).",
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "Article 21A, which provides free and compulsory education for children aged 6 to 14 years, was inserted by the —",
    options: ["42nd Amendment Act, 1976","86th Amendment Act, 2002","44th Amendment Act, 1978","73rd Amendment Act, 1992"],
    correct: "2",
    exptext: "✅ The 86th Amendment inserted Art. 21A. 📌 The Right to Education Act, 2009 followed. ❌ The 42nd added Fundamental Duties, the 44th removed property rights and the 73rd added Panchayats.",
  },

  /* ─────────── 24 · QUESTION ─────────── */
  24: {
    questext: "Consider the following about Article 20:\n1. No ex post facto criminal law.\n2. Protection against double jeopardy.\n3. Protection against self-incrimination.\n4. Protection against arbitrary arrest.\nWhich of the statements are correct?",
    options: ["1 and 2 only","2 and 3 only","1, 2 and 3 only","1, 2, 3 and 4"],
    correct: "3",
    exptext: "✅ Art. 20 covers statements 1, 2 and 3. 📌 Arrest protection is Art. 22, not Art. 20. ❌ Option 4 wrongly adds arrest, and options 1 and 2 leave out a protection.",
  },

  /* ─────────── 25 · QUESTION ─────────── */
  25: {
    questext: "As per Article 22, an arrested person must be produced before the nearest magistrate within —",
    options: ["12 hours","48 hours","72 hours","24 hours, excluding journey time"],
    correct: "4",
    exptext: "✅ Art. 22(2) fixes 24 hours, not counting travel time. 📌 Art. 22 safeguards do not apply to preventive detention. ❌ 12, 48 and 72 hours are not in the Constitution.",
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "Which of the following is available to both citizens and foreigners?",
    options: ["Protection of life and personal liberty (Article 21)","Freedom of speech and expression (Article 19)","Equality of opportunity in public employment (Article 16)","Freedom to reside and settle in any part of India (Article 19)"],
    correct: "1",
    exptext: "✅ Art. 21 protects all persons. 📌 Art. 19 and 16 are for citizens only. ❌ Free speech, public employment equality and the freedom to settle are all citizen-only rights.",
  },

  /* ─────────── 27 · CONCEPT PAGE — Right against Exploitation (Art. 23–24) ─────────── */
  27: {
    type: "concept",
    icon: "⛓️",
    accent: "#a855f7",
    pauseTimer: true,
    title: "Right against Exploitation (Art. 23–24)",
    html: `<p class="cp-lead">These two Articles protect the weakest — people who can be sold, forced to work, or made to do dangerous jobs as children. <b>Art. 23</b> protects people of all ages. <b>Art. 24</b> protects children.</p><div class="cp-grid c2"><div class="cp-card red"><div class="cp-card-title">Art. 23 — forced labour</div>Bans <u>traffic in human beings</u>, <u>begar</u> (unpaid forced work) and other forced labour. It protects even against <u>private persons</u>.</div><div class="cp-card amber"><div class="cp-card-title">Art. 24 — child labour</div>No child below <b>14 years</b> can be employed in a <u>factory, mine or other hazardous work</u>.</div></div><div class="cp-note remember"><b>Exception:</b> the State may order compulsory service for a <u>public purpose</u>, such as national service. It cannot discriminate only on grounds of religion, race, caste or class.</div><div class="cp-note trap"><b>Trap:</b> Art. 24 does not ban all child work. It bans work in <u>hazardous</u> jobs such as factories and mines.</div><div class="cp-note exam"><b>Exam note:</b> “Begar” is the keyword. Whenever you see begar, forced labour or human trafficking, the answer is Art. 23.</div><div class="cp-mnemonic"><b>23</b> = grown-ups sold or forced to work · <b>24</b> = kids in factories and mines.</div><div class="cp-chips"><span>Art. 23</span><span>Art. 24</span><span>Begar</span><span>Child labour</span></div>`
  },

  /* ─────────── 28 · QUESTION ─────────── */
  28: {
    questext: "Traffic in human beings and begar are prohibited under which Article?",
    options: ["Article 21","Article 23","Article 24","Article 17"],
    correct: "2",
    exptext: "✅ Art. 23 bans human trafficking, begar and forced labour. 📌 Begar = Art. 23. ❌ Art. 24 protects children, Art. 21 is life and liberty and Art. 17 is untouchability.",
  },

  /* ─────────── 29 · QUESTION ─────────── */
  29: {
    questext: "Article 24 prohibits the employment of children below which age in factories, mines and hazardous jobs?",
    options: ["12 years","16 years","14 years","18 years"],
    correct: "3",
    exptext: "✅ Art. 24 sets the limit at 14 years. 📌 Art. 24 = children below 14. ❌ 12, 16 and 18 are not the constitutional age.",
  },

  /* ─────────── 30 · QUESTION ─────────── */
  30: {
    questext: "Which of the following is permitted by the Constitution despite Article 23?",
    options: ["Forced labour imposed by a private employer","Begar","Traffic in human beings","Compulsory service imposed by the State for public purposes"],
    correct: "4",
    exptext: "✅ The State may impose compulsory service for public purposes. 📌 Public-purpose service is the only exception. ❌ Private forced labour, begar and trafficking are all banned.",
  },

  /* ─────────── 31 · CONCEPT PAGE — Right to Freedom of Religion (Art. 25–28) ─────────── */
  31: {
    type: "concept",
    icon: "🕌",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Right to Freedom of Religion (Art. 25–28)",
    html: `<p class="cp-lead">India is a <u>secular</u> State. The State has no religion, but every person is free to follow one (or none). <b>Art. 25 to 28</b> protect this freedom, and each Article covers a different side of it.</p><table><thead><tr><th>Article</th><th>Subject</th><th>Key point</th></tr></thead><tbody><tr><td><b>25</b></td><td>Freedom of conscience, free profession, practice and propagation of religion</td><td>For <u>every person</u>; subject to public order, morality and health</td></tr><tr><td><b>26</b></td><td>Freedom to manage religious affairs</td><td>For <u>religious denominations</u></td></tr><tr><td><b>27</b></td><td>Freedom from paying taxes for promoting any religion</td><td>No tax money for a particular religion</td></tr><tr><td><b>28</b></td><td>Freedom to attend religious instruction or worship in certain educational institutions</td><td>No compulsion</td></tr></tbody></table><div class="cp-divider">Art. 28 — four types of institution</div><div class="cp-grid c2"><div class="cp-card red"><div class="cp-card-title">Wholly State-funded</div><u>No</u> religious instruction at all.</div><div class="cp-card green"><div class="cp-card-title">State-recognised or aided</div>Religious instruction allowed, but <u>no one can be forced</u> to attend.</div><div class="cp-card blue"><div class="cp-card-title">Run by the State but set up by a trust</div>Religious instruction allowed.</div><div class="cp-card amber"><div class="cp-card-title">Private institutions</div>Free to give religious instruction.</div></div><div class="cp-note remember">Art. 25 explains that carrying the <b>kirpan</b> is part of the Sikh religion.</div><div class="cp-note trap"><b>Trap:</b> Art. 25 is an <u>individual</u> right, while Art. 26 belongs to a <u>religious group</u> (denomination).</div><div class="cp-note exam"><b>Exam note:</b> “propagation” (spreading) of religion is in Art. 25, but it does not include forced conversion.</div><div class="cp-mnemonic"><b>25</b> = I (individual) · <b>26</b> = group · <b>27</b> = taxes · <b>28</b> = schools — “<b>I</b>, <b>G</b>roup, <b>T</b>ax, <b>S</b>chool”.</div><div class="cp-chips"><span>Art. 25</span><span>Art. 26</span><span>Art. 27</span><span>Art. 28</span></div>`
  },

  /* ─────────── 32 · QUESTION ─────────── */
  32: {
    questext: "Which Article guarantees freedom of conscience and the right to freely profess, practise and propagate religion?",
    options: ["Article 25","Article 26","Article 27","Article 28"],
    correct: "1",
    exptext: "✅ Art. 25 gives this right to every person. 📌 25 = individual. ❌ Art. 26 is for religious denominations, Art. 27 is about taxes and Art. 28 about religious instruction.",
  },

  /* ─────────── 33 · QUESTION ─────────── */
  33: {
    questext: "Freedom from payment of taxes for the promotion of any particular religion is guaranteed by —",
    options: ["Article 25","Article 27","Article 26","Article 29"],
    correct: "2",
    exptext: "✅ Art. 27 says no one can be forced to pay taxes to promote a religion. 📌 27 = tax. ❌ Art. 25 is freedom of religion, Art. 26 is managing religious affairs and Art. 29 is protecting minority interests.",
  },

  /* ─────────── 34 · QUESTION ─────────── */
  34: {
    questext: "As per Article 28, religious instruction is completely prohibited in educational institutions that are —",
    options: ["recognised by the State","receiving aid from the State","wholly maintained out of State funds","administered by the State but established under a trust"],
    correct: "3",
    exptext: "✅ Art. 28(1) bans religious instruction in wholly State-funded institutions. 📌 Recognised or aided institutions may teach, but not force students. ❌ The other three types of institutions may give religious instruction, with the conditions in Art. 28.",
  },

  /* ─────────── 35 · QUESTION ─────────── */
  35: {
    questext: "The right of every religious denomination to manage its own affairs in matters of religion is given by —",
    options: ["Article 25","Article 27","Article 30","Article 26"],
    correct: "4",
    exptext: "✅ Art. 26 gives this right to religious denominations. 📌 Art. 25 = person, Art. 26 = denomination. ❌ Art. 25 is for individuals, Art. 27 is about taxes and Art. 30 is about minority educational institutions.",
  },

  /* ─────────── 36 · CONCEPT PAGE — Cultural and Educational Rights (Art. 29–30) ─────────── */
  36: {
    type: "concept",
    icon: "🏛️",
    accent: "#ec4899",
    pauseTimer: true,
    title: "Cultural and Educational Rights (Art. 29–30)",
    html: `<p class="cp-lead">India has many languages, scripts and communities. <b>Art. 29</b> protects their culture and <b>Art. 30</b> lets minorities run their own schools and colleges. Both Articles keep India’s diversity safe.</p><table><thead><tr><th>Article</th><th>Subject</th><th>Who can use it</th></tr></thead><tbody><tr><td><b>29(1)</b></td><td>Protection of interests of minorities: <u>conserve</u> your distinct language, script or culture</td><td><u>Any section of citizens</u></td></tr><tr><td><b>29(2)</b></td><td>No denial of admission to State-run or State-aided institutions only on grounds of religion, race, caste or language</td><td><u>Every citizen</u></td></tr><tr><td><b>30(1)</b></td><td>Minorities, based on religion or language, can <u>establish and administer</u> educational institutions</td><td><u>Minorities</u></td></tr><tr><td><b>30(2)</b></td><td>The State cannot discriminate in giving aid because the institution is under a minority</td><td>Minority institutions</td></tr></tbody></table><div class="cp-note trap"><b>Trap:</b> the heading says “minorities” but Art. 29(1) is available to <u>any section of citizens</u>, even the majority, if they have a distinct language, script or culture. Art. 30 is only for religious and linguistic minorities.</div><div class="cp-note exam"><b>Exam note:</b> “Establish <u>and</u> administer” is the key phrase of Art. 30.</div><div class="cp-mnemonic"><b>29</b> = <b>C</b>ulture (conserve) · <b>30</b> = <b>S</b>chools (set up and run).</div><div class="cp-chips"><span>Art. 29</span><span>Art. 30</span><span>Minorities</span><span>Language & script</span></div>`
  },

  /* ─────────── 37 · QUESTION ─────────── */
  37: {
    questext: "Which Article gives minorities the right to establish and administer educational institutions of their choice?",
    options: ["Article 30","Article 29","Article 28","Article 26"],
    correct: "1",
    exptext: "✅ Art. 30(1) gives this right to religious and linguistic minorities. 📌 30 = schools. ❌ Art. 29 protects language and culture, Art. 28 limits religious instruction and Art. 26 is about religious affairs.",
  },

  /* ─────────── 38 · QUESTION ─────────── */
  38: {
    questext: "Any section of citizens having a distinct language, script or culture has the right to conserve it under —",
    options: ["Article 30","Article 29","Article 25","Article 15"],
    correct: "2",
    exptext: "✅ Art. 29(1) is open to any section of citizens, not only minorities. 📌 29 = conserve culture. ❌ Art. 30 deals with educational institutions, Art. 25 with religion and Art. 15 with discrimination.",
  },

  /* ─────────── 39 · QUESTION ─────────── */
  39: {
    questext: "Consider the following statements about Article 30:\n1. It applies to minorities based on religion or language.\n2. It gives the right to establish and administer educational institutions.\n3. The State cannot discriminate in giving aid on the ground that the institution is managed by a minority.\nWhich statements are correct?",
    options: ["1 only","2 only","1 and 2 only","1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three are part of Art. 30. 📌 Remember “establish and administer” and the no-discrimination in aid rule. ❌ The other options leave out one or two correct statements.",
  },

  /* ─────────── 40 · CONCEPT PAGE — Saving of certain Laws (Art. 31A–31C) ─────────── */
  40: {
    type: "concept",
    icon: "🛡️",
    accent: "#84cc16",
    pauseTimer: true,
    title: "Saving of certain Laws (Art. 31A–31C)",
    html: `<p class="cp-lead">After the Right to Property was removed (see Part III), three Articles still protect <u>certain laws</u> from being struck down for breaking Fundamental Rights. They were added to make land reform and social laws possible.</p><table><thead><tr><th>Article</th><th>Subject</th><th>Added by</th></tr></thead><tbody><tr><td><b>31A</b></td><td>Saving of laws providing for acquisition of <u>estates</u> etc.</td><td>1st Amendment, 1951</td></tr><tr><td><b>31B</b></td><td>Validation of certain Acts and Regulations (<u>Ninth Schedule</u>)</td><td>1st Amendment, 1951</td></tr><tr><td><b>31C</b></td><td>Saving of laws giving effect to certain <u>directive principles</u></td><td>25th Amendment, 1971</td></tr></tbody></table><div class="cp-note remember">In the <b>I. R. Coelho case (2007)</b> the Supreme Court held that laws placed in the Ninth Schedule after 24 April 1973 can be tested in court for violating the basic structure.</div><div class="cp-note trap"><b>Trap:</b> Art. 31B and the Ninth Schedule go together, but Art. 31B is in the main Constitution, while the Ninth Schedule is a list.</div><div class="cp-mnemonic"><b>A</b> = <b>A</b>cquisition of estates, <b>B</b> = <b>B</b>ook of laws (Ninth Schedule), <b>C</b> = <b>C</b>ode of DPSP.</div><div class="cp-chips"><span>Art. 31A</span><span>Art. 31B</span><span>Art. 31C</span><span>Ninth Schedule</span></div>`
  },

  /* ─────────── 41 · QUESTION ─────────── */
  41: {
    questext: "Article 31B deals with —",
    options: ["Saving of laws providing for acquisition of estates","Saving of laws giving effect to certain directive principles","Validation of certain Acts and Regulations","Protection of life and personal liberty"],
    correct: "3",
    exptext: "✅ Art. 31B validates the laws placed in the Ninth Schedule. 📌 A = estates, B = Ninth Schedule, C = DPSP. ❌ The other options describe Art. 31A, Art. 31C and Art. 21.",
  },

  /* ─────────── 42 · QUESTION ─────────── */
  42: {
    questext: "Which Article saves laws giving effect to certain directive principles of State policy from challenge on the ground of violating Fundamental Rights?",
    options: ["Article 31A","Article 31B","Article 32","Article 31C"],
    correct: "4",
    exptext: "✅ Art. 31C was inserted by the 25th Amendment (1971). 📌 C = Code of DPSP. ❌ Art. 31A is about estates, Art. 31B about validation of Acts and Art. 32 about remedies.",
  },

  /* ─────────── 43 · QUESTION ─────────── */
  43: {
    questext: "Articles 31A and 31B were inserted in the Constitution by the —",
    options: ["First Amendment Act, 1951","Twenty-fourth Amendment Act, 1971","Forty-second Amendment Act, 1976","Forty-fourth Amendment Act, 1978"],
    correct: "1",
    exptext: "✅ The First Amendment added Art. 31A and 31B and the Ninth Schedule. 📌 First amendment = land reform protection. ❌ The 24th, 42nd and 44th Amendments are linked to other changes.",
  },

  /* ─────────── 44 · CONCEPT PAGE — Right to Constitutional Remedies (Art. 32) ─────────── */
  44: {
    type: "concept",
    icon: "🔨",
    accent: "#f97316",
    pauseTimer: true,
    title: "Right to Constitutional Remedies (Art. 32)",
    html: `<p class="cp-lead">A right is useful only if you can go to court when it is violated. <b>Art. 32</b> gives you that power. Dr B. R. Ambedkar called it the <u>“heart and soul” of the Constitution</u>.</p><div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/2.png" alt="Five writs and their meanings" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div><div class="cp-stats"><div class="cp-stat"><b>Art. 32</b><span>Remedy</span></div><div class="cp-stat"><b>5</b><span>Writs</span></div><div class="cp-stat"><b>Art. 226</b><span>High Courts</span></div></div><div class="cp-divider">The five writs</div><table><thead><tr><th>Writ</th><th>Meaning</th><th>Use</th></tr></thead><tbody><tr><td><b>Habeas Corpus</b></td><td>“Produce the body”</td><td>Release of a person who is illegally detained</td></tr><tr><td><b>Mandamus</b></td><td>“We command”</td><td>Orders a public official to perform a public duty</td></tr><tr><td><b>Prohibition</b></td><td>“To forbid”</td><td>A higher court stops a lower court from going beyond its jurisdiction</td></tr><tr><td><b>Certiorari</b></td><td>“To be certified”</td><td>A higher court cancels a lower court’s order</td></tr><tr><td><b>Quo Warranto</b></td><td>“By what authority”</td><td>Questions the right of a person to hold a public office</td></tr></tbody></table><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Supreme Court — Art. 32</div>Can issue writs <u>only for Fundamental Rights</u>. Going to the Supreme Court under Art. 32 is itself a Fundamental Right.</div><div class="cp-card green"><div class="cp-card-title">High Courts — Art. 226</div>Can issue writs for Fundamental Rights <u>and for any other purpose</u>. Their power is wider.</div></div><div class="cp-note trap"><b>Trap:</b> Prohibition works <u>while</u> a case is going on; Certiorari works <u>after</u> the lower court has decided.</div><div class="cp-note exam"><b>Exam note:</b> the writs are borrowed from English law, and Art. 32 can be suspended only during a National Emergency (Art. 359).</div><div class="cp-mnemonic"><b>H</b>a<b>M</b> <b>P</b>ass <b>C</b>ertain <b>Q</b>uizzes — <b>H</b>abeas, <b>M</b>andamus, <b>P</b>rohibition, <b>C</b>ertiorari, <b>Q</b>uo warranto.</div><div class="cp-chips"><span>Art. 32</span><span>Art. 226</span><span>Writs</span><span>Dr B. R. Ambedkar</span></div>`
  },

  /* ─────────── 45 · QUESTION ─────────── */
  45: {
    questext: "Who described Article 32 as the “heart and soul” of the Constitution?",
    options: ["Jawaharlal Nehru","Dr B. R. Ambedkar","Sardar Vallabhbhai Patel","Dr Rajendra Prasad"],
    correct: "2",
    exptext: "✅ Dr Ambedkar gave Art. 32 this title. 📌 Art. 32 = heart and soul. ❌ The other leaders were part of the Constituent Assembly, but this statement is linked to Dr Ambedkar.",
  },

  /* ─────────── 46 · QUESTION ─────────── */
  46: {
    questext: "Which writ literally means “to produce the body” and is used to free a person who is illegally detained?",
    options: ["Mandamus","Certiorari","Habeas Corpus","Quo Warranto"],
    correct: "3",
    exptext: "✅ Habeas Corpus orders the detainer to produce the person before the court. 📌 Habeas = body. ❌ Mandamus commands a duty, Certiorari cancels an order and Quo Warranto questions authority.",
  },

  /* ─────────── 47 · QUESTION ─────────── */
  47: {
    questext: "Which writ is issued by a court to command a public official to perform a public duty?",
    options: ["Prohibition","Habeas Corpus","Certiorari","Mandamus"],
    correct: "4",
    exptext: "✅ Mandamus means “we command”. 📌 Mandamus = duty. ❌ Prohibition stops a lower court, Habeas Corpus protects liberty and Certiorari cancels orders.",
  },

  /* ─────────── 48 · QUESTION ─────────── */
  48: {
    questext: "The writ of Quo Warranto is issued to find out —",
    options: ["by what authority a person holds a public office","whether a person is illegally detained","whether a public duty is being neglected","whether a lower court has acted beyond its jurisdiction"],
    correct: "1",
    exptext: "✅ Quo Warranto asks “by what authority?”. 📌 Quo = who gave you the right. ❌ The other options describe Habeas Corpus, Mandamus and Prohibition.",
  },

  /* ─────────── 49 · QUESTION ─────────── */
  49: {
    questext: "Which Article gives the High Courts power to issue writs for the enforcement of Fundamental Rights and for any other purpose?",
    options: ["Article 32","Article 226","Article 131","Article 136"],
    correct: "2",
    exptext: "✅ Art. 226 has a wider reach than Art. 32. 📌 SC = 32 (FRs only), HC = 226 (FRs and other purposes). ❌ Art. 32 is the Supreme Court’s power, Art. 131 is original jurisdiction and Art. 136 is special leave.",
  },

  /* ─────────── 50 · QUESTION ─────────── */
  50: {
    questext: "Which writ is issued by a higher court to prevent a lower court from continuing proceedings beyond its jurisdiction?",
    options: ["Certiorari","Mandamus","Prohibition","Habeas Corpus"],
    correct: "3",
    exptext: "✅ Prohibition stops the case while it is still going on. 📌 Prohibition = before the decision, Certiorari = after the decision. ❌ Certiorari cancels an order already passed, Mandamus commands a duty and Habeas Corpus frees a detained person.",
  },

  /* ─────────── 51 · CONCEPT PAGE — Art. 33 to 35 — Last Articles of Part III ─────────── */
  51: {
    type: "concept",
    icon: "🪖",
    accent: "#3b82f6",
    pauseTimer: true,
    title: "Art. 33 to 35 — Last Articles of Part III",
    html: `<p class="cp-lead">The last three Articles of Part III are <u>support Articles</u>. They decide how far rights can be limited for the forces and during martial law, and who can make laws about them.</p><table><thead><tr><th>Article</th><th>What it does</th></tr></thead><tbody><tr><td><b>33</b></td><td><u>Parliament</u> can modify the rights of the Armed Forces, police and similar forces so that they can do their duty and keep discipline.</td></tr><tr><td><b>34</b></td><td>Rights can be restricted while <u>martial law</u> is in force in any area.</td></tr><tr><td><b>35</b></td><td><u>Only Parliament</u> (not State legislatures) can make laws to give effect to certain Fundamental Rights and to punish acts declared offences in Part III.</td></tr></tbody></table><div class="cp-note trap"><b>Trap:</b> Martial law (Art. 34) is different from a National Emergency (Art. 352). The word “martial law” is not defined in the Constitution.</div><div class="cp-note exam"><b>Exam note:</b> “Only Parliament can legislate” is the main idea of Art. 35.</div><div class="cp-mnemonic"><b>33</b> = <b>F</b>orces, <b>34</b> = <b>M</b>artial law, <b>35</b> = <b>P</b>arliament only.</div><div class="cp-chips"><span>Art. 33</span><span>Art. 34</span><span>Art. 35</span><span>Martial law</span></div>`
  },

  /* ─────────── 52 · QUESTION ─────────── */
  52: {
    questext: "Which Article empowers Parliament to restrict or modify the Fundamental Rights of members of the Armed Forces?",
    options: ["Article 34","Article 35","Article 32","Article 33"],
    correct: "4",
    exptext: "✅ Art. 33 allows Parliament to adjust rights for the forces. 📌 33 = forces. ❌ Art. 34 is martial law, Art. 35 is about who makes laws, and Art. 32 is remedies.",
  },

  /* ─────────── 53 · QUESTION ─────────── */
  53: {
    questext: "Restrictions on Fundamental Rights while martial law is in force in any area are dealt with in —",
    options: ["Article 34","Article 33","Article 35","Article 352"],
    correct: "1",
    exptext: "✅ Art. 34 deals with martial law. 📌 34 = martial law. ❌ Art. 33 is for forces, Art. 35 for law-making and Art. 352 is for National Emergency.",
  },

  /* ─────────── 54 · QUESTION ─────────── */
  54: {
    questext: "Under Article 35, laws to give effect to certain Fundamental Rights can be made by —",
    options: ["State legislatures only","Parliament only","Parliament and State legislatures jointly","The President by ordinance only"],
    correct: "2",
    exptext: "✅ Art. 35 gives this power to Parliament alone. 📌 35 = Parliament only. ❌ State legislatures cannot make such laws, and the President cannot do it alone.",
  },

  /* ─────────── 55 · CONCEPT PAGE — Part IV — Directive Principles of State Policy (Art. 36–40) ─────────── */
  55: {
    type: "concept",
    icon: "🧭",
    accent: "#d946ef",
    pauseTimer: true,
    title: "Part IV — Directive Principles of State Policy (Art. 36–40)",
    html: `<p class="cp-lead">Directive Principles are <u>goals</u> that guide the Government while making laws. They aim to create a welfare State. Part IV runs from <b>Art. 36 to 51</b>, and this page covers the first five Articles.</p><div class="cp-stats"><div class="cp-stat"><b>Art. 36–51</b><span>Part IV</span></div><div class="cp-stat"><b>Ireland</b><span>Idea borrowed from</span></div><div class="cp-stat"><b>Non-justiciable</b><span>Court cannot enforce</span></div></div><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>36</b></td><td>Definition — “State” has the same meaning as in Part III</td></tr><tr><td><b>37</b></td><td>Application of the principles: <u>not enforceable by any court</u>, but fundamental in governing the country</td></tr><tr><td><b>38</b></td><td>State to secure a <u>social order</u> for the promotion of welfare of the people</td></tr><tr><td><b>39</b></td><td>Certain principles of policy to be followed by the State</td></tr><tr><td><b>39A</b></td><td><u>Equal justice and free legal aid</u></td></tr><tr><td><b>40</b></td><td>Organisation of <u>village panchayats</u></td></tr></tbody></table><div class="cp-divider">Art. 39 in plain words</div><div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">Livelihood and wealth</div>Adequate means of livelihood for all, and fair sharing of the country’s resources so that wealth does not gather in a few hands.</div><div class="cp-card blue"><div class="cp-card-title">Equal pay</div><u>Equal pay for equal work</u> for men and women.</div><div class="cp-card amber"><div class="cp-card-title">Health of workers and children</div>Protect the health and strength of workers, and keep children from abuse.</div><div class="cp-card violet"><div class="cp-card-title">Opportunities for children</div>Children should get opportunities to grow in a healthy manner and in freedom and dignity.</div></div><div class="cp-note remember"><b>Art. 39A</b> was added by the 42nd Amendment (1976), and <b>Art. 40</b> is the Gandhian idea of rural self-government.</div><div class="cp-note trap"><b>Trap:</b> Fundamental Rights are <u>justiciable</u> (courts enforce them), while DPSP are <u>non-justiciable</u>. Despite this, they are called “fundamental in the governance of the country”.</div><div class="cp-note exam"><b>Exam note:</b> the DPSP were borrowed from the Irish Constitution.</div><div class="cp-mnemonic"><b>36</b> define, <b>37</b> no court, <b>38</b> welfare, <b>39</b> principles, <b>39A</b> legal aid, <b>40</b> panchayats — “<b>D</b>on’t <b>N</b>eed <b>W</b>ar, <b>P</b>lease <b>L</b>aw <b>P</b>anchayat”.</div><div class="cp-chips"><span>DPSP</span><span>Art. 37</span><span>Art. 39A</span><span>Art. 40</span></div>`
  },

  /* ─────────── 56 · QUESTION ─────────── */
  56: {
    questext: "Which Article of the Constitution says that Directive Principles are not enforceable by any court?",
    options: ["Article 36","Article 38","Article 37","Article 39"],
    correct: "3",
    exptext: "✅ Art. 37 says the principles are not enforceable by courts, yet are fundamental in governance. 📌 37 = no court. ❌ Art. 36 only defines State, Art. 38 aims at a social order and Art. 39 lists the policy principles.",
  },

  /* ─────────── 57 · QUESTION ─────────── */
  57: {
    questext: "Equal justice and free legal aid is a Directive Principle mentioned in —",
    options: ["Article 39","Article 40","Article 38","Article 39A"],
    correct: "4",
    exptext: "✅ Art. 39A was added by the 42nd Amendment, 1976. 📌 39A = legal aid. ❌ Art. 39 has other principles, Art. 40 is panchayats and Art. 38 is welfare of the people.",
  },

  /* ─────────── 58 · QUESTION ─────────── */
  58: {
    questext: "The Directive Principle regarding the organisation of village panchayats is found in —",
    options: ["Article 40","Article 39","Article 41","Article 243"],
    correct: "1",
    exptext: "✅ Art. 40 asks the State to organise village panchayats. 📌 Gandhian principle. ❌ Art. 41 is on work and education, Art. 39 on policy principles, and Art. 243 is the panchayat Part IX.",
  },

  /* ─────────── 59 · QUESTION ─────────── */
  59: {
    questext: "The idea of Directive Principles of State Policy in the Indian Constitution was borrowed from the Constitution of —",
    options: ["the United States of America","Ireland","Canada","Australia"],
    correct: "2",
    exptext: "✅ The DPSP idea comes from Ireland. 📌 DPSP = Ireland. ❌ The USA gave Fundamental Rights, Canada the federal structure with a strong Centre and Australia the Concurrent List.",
  },

  /* ─────────── 60 · QUESTION ─────────── */
  60: {
    questext: "“Equal pay for equal work for both men and women” is mentioned in the Constitution as a —",
    options: ["Fundamental Right under Article 14","Fundamental Right under Article 16","Directive Principle under Article 39","Directive Principle under Article 38"],
    correct: "3",
    exptext: "✅ Art. 39(d), a DPSP, says equal pay for equal work. 📌 It is not a Fundamental Right. ❌ Art. 14 and 16 give equality and equal opportunity, but not equal pay directly, and Art. 38 is about a social order.",
  },

  /* ─────────── 61 · CONCEPT PAGE — Parts of Indian Constitution ─────────── */
  61: {
    type: "concept",
    icon: "🗂️",
    accent: "#06b6d4",
    pauseTimer: true,
    title: "Parts of Indian Constitution",
    html: `<p class="cp-lead">Think of the Constitution as a book with <u>Parts</u>, like chapters. Each Part covers one subject and a set of Articles. Learning this table is the <b>master key</b> for answering Part–Article questions.</p><div class="cp-stats"><div class="cp-stat"><b>22</b><span>Original Parts</span></div><div class="cp-stat"><b>4</b><span>Parts inserted later</span></div><div class="cp-stat"><b>1</b><span>Part repealed (VII)</span></div></div><table><thead><tr><th>Part</th><th>Article</th><th>Provisions</th></tr></thead><tbody><tr><td></td><td></td><td>Preamble</td></tr><tr><td>I</td><td>1 to 4</td><td>The Union and its Territory</td></tr><tr><td>II</td><td>5 to 11</td><td>Citizenship</td></tr><tr><td>III</td><td>12 to 35</td><td>Fundamental Rights</td></tr><tr><td>IV</td><td>36 to 51</td><td>Directive Principles of State Policy</td></tr><tr><td>IV A</td><td>51 A</td><td>Fundamental Duties</td></tr><tr><td>V</td><td>52 to 151</td><td>The Union</td></tr><tr><td>VI</td><td>152 to 237</td><td>The States</td></tr><tr><td>VII</td><td>238</td><td>The States in part B of the first Schedule (repealed)</td></tr><tr><td>VIII</td><td>239 to 241</td><td>The Union Territories</td></tr><tr><td>IX</td><td>243 to 243 O</td><td>The Panchayats</td></tr><tr><td>IX A</td><td>243 P to 243 ZG</td><td>The Municipalities</td></tr><tr><td>IX B</td><td>243 ZH to 243 ZT</td><td>The Co-operative Societies</td></tr><tr><td>X</td><td>244 to 244 A</td><td>The Scheduled and Tribal Areas</td></tr><tr><td>XI</td><td>245 to 263</td><td>Relations between the Union and the States</td></tr><tr><td>XII</td><td>264 to 300 A</td><td>Finance, Property, Contracts and Suits</td></tr><tr><td>XIII</td><td>301 to 307</td><td>Trade, Commerce and Intercourse within the Territory of India</td></tr><tr><td>XIV</td><td>308 to 323</td><td>Services under the Union and the States</td></tr><tr><td>XIV A</td><td>323 A to 323 B</td><td>Tribunals</td></tr><tr><td>XV</td><td>324 to 329</td><td>Elections</td></tr><tr><td>XVI</td><td>330 to 342</td><td>Special Provisions relating to certain classes</td></tr><tr><td>XVII</td><td>343 to 351</td><td>Official Language</td></tr><tr><td>XVIII</td><td>352 to 360</td><td>Emergency Provisions</td></tr><tr><td>XIX</td><td>361 to 367</td><td>Miscellaneous</td></tr><tr><td>XX</td><td>368</td><td>Amendment of the Constitution</td></tr><tr><td>XXI</td><td>369 to 392</td><td>Temporary, Transitional and Special Provisions</td></tr><tr><td>XXII</td><td>393 to 395</td><td>Short title, Commencement, Authoritative Text in Hindi and Repeals</td></tr></tbody></table><div class="cp-note trap"><b>Trap:</b> Part IV A, IX A, IX B and XIV A are <u>later additions</u>, and Part VII was repealed. That is why Part numbers look as if they jump.</div><div class="cp-note exam"><b>Exam note:</b> “Part XVIII → Emergency”, “Part XX → Amendment”, “Part IV A → Fundamental Duties” are the most-asked pairs.</div><div class="cp-mnemonic">Three “<b>III-V-XX</b>” anchors: <b>III</b> = Rights, <b>V</b> = Union, <b>XX</b> = Amendment. Add <b>XVIII</b> = Emergency and you can find the rest by counting.</div><div class="cp-chips"><span>Part III</span><span>Part IV A</span><span>Part XV</span><span>Part XVIII</span><span>Part XX</span></div>`
  },

  /* ─────────── 62 · QUESTION ─────────── */
  62: {
    questext: "Fundamental Duties are contained in which Part of the Constitution?",
    options: ["Part III","Part IV","Part V","Part IV A"],
    correct: "4",
    exptext: "✅ Art. 51A is the only Article of Part IV A. 📌 IV A = duties. ❌ Part III is Fundamental Rights, Part IV is DPSP and Part V is the Union.",
  },

  /* ─────────── 63 · QUESTION ─────────── */
  63: {
    questext: "Emergency Provisions (Art. 352–360) are contained in which Part?",
    options: ["Part XVIII","Part XVII","Part XIX","Part XX"],
    correct: "1",
    exptext: "✅ Part XVIII covers emergency provisions. 📌 XVIII = Emergency. ❌ Part XVII is Official Language, Part XIX is Miscellaneous and Part XX is Amendment.",
  },

  /* ─────────── 64 · QUESTION ─────────── */
  64: {
    questext: "Articles 324 to 329 belong to which Part of the Constitution?",
    options: ["Part XIV","Part XV","Part XVI","Part XVIII"],
    correct: "2",
    exptext: "✅ Part XV deals with Elections. 📌 XV = Elections (Art. 324 begins it). ❌ Part XIV is Services, Part XVI is special provisions for certain classes and Part XVIII is Emergency.",
  },

  /* ─────────── 65 · QUESTION ─────────── */
  65: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Part IX – The Panchayats","Part IX A – The Municipalities","Part X – Official Language","Part XVIII – Emergency Provisions"],
    correct: "3",
    exptext: "✅ Part X deals with Scheduled and Tribal Areas, not Official Language. 📌 Official Language is Part XVII. ❌ The other three pairs are correct.",
  },

  /* ─────────── 66 · QUESTION ─────────── */
  66: {
    questext: "Which Part of the Constitution was repealed by the Seventh Amendment Act, 1956?",
    options: ["Part VI","Part VIII","Part IX","Part VII"],
    correct: "4",
    exptext: "✅ Part VII (the States in Part B of the First Schedule) was repealed after the reorganisation of States. 📌 The “Part B States” ended in 1956. ❌ Part VI, VIII and IX are still in force.",
  },

  /* ─────────── 67 · QUESTION ─────────── */
  67: {
    questext: "Part XX of the Constitution deals with —",
    options: ["Amendment of the Constitution","Emergency Provisions","Temporary, Transitional and Special Provisions","Official Language"],
    correct: "1",
    exptext: "✅ Part XX has only Art. 368. 📌 XX = amendment. ❌ Emergency is Part XVIII, Temporary provisions Part XXI and Official Language Part XVII.",
  },

  /* ─────────── 68 · CONCEPT PAGE — Part IV continued — Art. 41 to 43B ─────────── */
  68: {
    type: "concept",
    icon: "👷",
    accent: "#eab308",
    pauseTimer: true,
    title: "Part IV continued — Art. 41 to 43B",
    html: `<p class="cp-lead">These Articles are the <u>socialist</u> part of the Directive Principles. They protect workers, give them a decent living, and encourage co-operative societies.</p><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>41</b></td><td>Right to <u>work, education and public assistance</u> in certain cases (unemployment, old age, sickness, disablement)</td></tr><tr><td><b>42</b></td><td>Just and humane conditions of work and <u>maternity relief</u></td></tr><tr><td><b>43</b></td><td><u>Living wage</u> for workers</td></tr><tr><td><b>43A</b></td><td><u>Participation of workers</u> in management of industries</td></tr><tr><td><b>43B</b></td><td>Promotion of <u>co-operative societies</u>: voluntary formation, autonomous functioning, democratic control and professional management</td></tr></tbody></table><div class="cp-note remember"><b>43A</b> was added by the 42nd Amendment (1976), and <b>43B</b> by the 97th Amendment (2011).</div><div class="cp-note trap"><b>Trap:</b> “Living wage” (Art. 43) is different from “minimum wage”: a living wage gives a decent standard of life.</div><div class="cp-note exam"><b>Exam note:</b> the 97th Amendment also added Part IX B (Co-operative Societies), and the right to form co-operatives in Art. 19(1)(c).</div><div class="cp-mnemonic"><b>41</b> work · <b>42</b> mother · <b>43</b> wage · <b>43A</b> workers manage · <b>43B</b> co-operatives — “<b>W</b>ork, <b>M</b>other, <b>W</b>age”.</div><div class="cp-chips"><span>Art. 41</span><span>Art. 42</span><span>Art. 43</span><span>Art. 43A</span><span>Art. 43B</span></div>`
  },

  /* ─────────── 69 · QUESTION ─────────── */
  69: {
    questext: "Participation of workers in the management of industries is a Directive Principle under —",
    options: ["Article 43","Article 43A","Article 42","Article 41"],
    correct: "2",
    exptext: "✅ Art. 43A was added by the 42nd Amendment. 📌 43A = workers manage. ❌ Art. 43 is a living wage, Art. 42 is humane work conditions and Art. 41 is right to work.",
  },

  /* ─────────── 70 · QUESTION ─────────── */
  70: {
    questext: "The promotion of co-operative societies was added to the Directive Principles (Art. 43B) by the —",
    options: ["42nd Amendment Act, 1976","44th Amendment Act, 1978","97th Amendment Act, 2011","86th Amendment Act, 2002"],
    correct: "3",
    exptext: "✅ The 97th Amendment added Art. 43B. 📌 97th = co-operatives. ❌ The 42nd added Art. 39A, 43A and 48A, the 44th changed Art. 38 and the 86th changed Art. 45.",
  },

  /* ─────────── 71 · QUESTION ─────────── */
  71: {
    questext: "Which Directive Principle provides for “just and humane conditions of work and maternity relief”?",
    options: ["Article 41","Article 43","Article 47","Article 42"],
    correct: "4",
    exptext: "✅ Art. 42 gives humane work conditions and maternity relief. 📌 42 = mother. ❌ Art. 41 is right to work, Art. 43 is a living wage and Art. 47 is nutrition and public health.",
  },

  /* ─────────── 72 · QUESTION ─────────── */
  72: {
    questext: "The Directive Principle that directs the State to secure a living wage for workers is contained in —",
    options: ["Article 43","Article 41","Article 42","Article 43A"],
    correct: "1",
    exptext: "✅ Art. 43 is about a living wage. 📌 43 = wage. ❌ Art. 41 is work, Art. 42 is maternity relief and Art. 43A is worker participation.",
  },

  /* ─────────── 73 · CONCEPT PAGE — Part IV continued — Art. 44 to 51 ─────────── */
  73: {
    type: "concept",
    icon: "🌍",
    accent: "#10b981",
    pauseTimer: true,
    title: "Part IV continued — Art. 44 to 51",
    html: `<p class="cp-lead">The last eight DPSP Articles cover family law, children, weaker sections, health, farming, nature, culture, justice and peace. They carry a lot of exam value, so learn each one with a keyword.</p><table><thead><tr><th>Article</th><th>Subject</th><th>Keyword</th></tr></thead><tbody><tr><td><b>44</b></td><td>Uniform civil code for the citizens</td><td>UCC</td></tr><tr><td><b>45</b></td><td>Early childhood care and education for children below <u>six years</u></td><td>Below 6</td></tr><tr><td><b>46</b></td><td>Educational and economic interests of <u>SC, ST</u> and other weaker sections</td><td>SC/ST</td></tr><tr><td><b>47</b></td><td>Raise level of <u>nutrition</u> and standard of living, improve public health</td><td>Nutrition</td></tr><tr><td><b>48</b></td><td>Organisation of <u>agriculture and animal husbandry</u></td><td>Farming</td></tr><tr><td><b>48A</b></td><td>Protection of <u>environment</u>, forests and wild life</td><td>Environment</td></tr><tr><td><b>49</b></td><td>Protection of <u>monuments</u> and places and objects of national importance</td><td>Monuments</td></tr><tr><td><b>50</b></td><td><u>Separation of judiciary from executive</u></td><td>Judiciary</td></tr><tr><td><b>51</b></td><td>Promotion of <u>international peace and security</u></td><td>Peace</td></tr></tbody></table><div class="cp-note remember"><b>Art. 45:</b> the 86th Amendment (2002) moved free education for ages 6–14 into Art. 21A, so Art. 45 now deals with early childhood care for children below six years.</div><div class="cp-note trap"><b>Trap:</b> Art. 21A (education, a Fundamental Right) and Art. 45 (childcare, a DPSP) are neighbours in the exam, but they are different.</div><div class="cp-note exam"><b>Exam note:</b> Art. 48A (environment) was added by the 42nd Amendment, 1976.</div><div class="cp-mnemonic"><b>44</b> civil code · <b>45</b> kids · <b>46</b> SC/ST · <b>47</b> food · <b>48</b> farm · <b>48A</b> green · <b>49</b> monuments · <b>50</b> courts · <b>51</b> peace — “<b>U</b>nity <b>K</b>ids <b>S</b>trong <b>F</b>ood <b>F</b>arm <b>G</b>reen <b>M</b>onuments <b>C</b>ourts <b>P</b>eace”.</div><div class="cp-chips"><span>Art. 44 UCC</span><span>Art. 48A</span><span>Art. 50</span><span>Art. 51</span></div>`
  },

  /* ─────────── 74 · QUESTION ─────────── */
  74: {
    questext: "Which Article of the Constitution directs the State to secure a Uniform Civil Code for the citizens?",
    options: ["Article 43","Article 44","Article 45","Article 46"],
    correct: "2",
    exptext: "✅ Art. 44 is the UCC Article. 📌 44 = UCC. ❌ Art. 43 is a living wage, Art. 45 is childcare and Art. 46 is for SC and ST.",
  },

  /* ─────────── 75 · QUESTION ─────────── */
  75: {
    questext: "Separation of the judiciary from the executive is a Directive Principle under —",
    options: ["Article 49","Article 51","Article 50","Article 48"],
    correct: "3",
    exptext: "✅ Art. 50 aims at an independent judiciary. 📌 50 = judiciary. ❌ Art. 49 is monuments, Art. 51 is international peace and Art. 48 is agriculture.",
  },

  /* ─────────── 76 · QUESTION ─────────── */
  76: {
    questext: "The protection and improvement of the environment and safeguarding of forests and wild life is directed by —",
    options: ["Article 48","Article 47","Article 49","Article 48A"],
    correct: "4",
    exptext: "✅ Art. 48A was added by the 42nd Amendment, 1976. 📌 48A = green. ❌ Art. 48 is agriculture, Art. 47 is nutrition and Art. 49 is monuments.",
  },

  /* ─────────── 77 · QUESTION ─────────── */
  77: {
    questext: "The State’s duty to promote international peace and security is stated in —",
    options: ["Article 51","Article 50","Article 52","Article 48A"],
    correct: "1",
    exptext: "✅ Art. 51 is the last DPSP. 📌 51 = peace (last of Part IV). ❌ Art. 50 is separation of judiciary, Art. 52 begins Part V (President) and Art. 48A is environment.",
  },

  /* ─────────── 78 · QUESTION ─────────── */
  78: {
    questext: "After the 86th Amendment, Article 45 provides for —",
    options: ["free and compulsory education for children aged 6 to 14 years","early childhood care and education for children below six years","free legal aid for the poor","educational interests of SC and ST"],
    correct: "2",
    exptext: "✅ Art. 45 now deals with early childhood care for children below six. 📌 6 to 14 is Art. 21A. ❌ The other options are Art. 21A, Art. 39A and Art. 46.",
  },

  /* ─────────── 79 · QUESTION ─────────── */
  79: {
    questext: "Which of the following is NOT a Directive Principle of State Policy?",
    options: ["Uniform civil code (Article 44)","Separation of judiciary from executive (Article 50)","Right to free and compulsory education for children aged 6 to 14 (Article 21A)","Protection of environment (Article 48A)"],
    correct: "3",
    exptext: "✅ Art. 21A is in Part III, as a Fundamental Right. 📌 Fundamental Right = court can enforce it. ❌ UCC, judicial separation and environment protection are in Part IV.",
  },

  /* ─────────── 80 · QUESTION ─────────── */
  80: {
    questext: "Which Article directs the State to improve the educational and economic interests of Scheduled Castes, Scheduled Tribes and other weaker sections?",
    options: ["Article 45","Article 47","Article 15","Article 46"],
    correct: "4",
    exptext: "✅ Art. 46 is the DPSP for SC, ST and weaker sections. 📌 46 = SC/ST. ❌ Art. 45 is childcare, Art. 47 is nutrition, and Art. 15 is a Fundamental Right of non-discrimination.",
  },

  /* ─────────── 81 · CONCEPT PAGE — Part IV A — Art. 51A Fundamental Duties ─────────── */
  81: {
    type: "concept",
    icon: "📜",
    accent: "#f43f5e",
    pauseTimer: true,
    title: "Part IV A — Art. 51A Fundamental Duties",
    html: `<p class="cp-lead">Rights are one side of the coin. <b>Art. 51A</b> is the other side: <u>duties</u> that every citizen should follow. These duties are <b>non-justiciable</b> — the courts do not enforce them directly.</p><div class="cp-stats"><div class="cp-stat"><b>Art. 51A</b><span>Only Article</span></div><div class="cp-stat"><b>42nd</b><span>Amendment (1976)</span></div><div class="cp-stat"><b>11</b><span>Duties now</span></div><div class="cp-stat"><b>USSR</b><span>Source</span></div></div><div class="cp-divider">The 11 duties in simple words</div><ol class="cp-steps"><li>Respect the Constitution, the National Flag and the National Anthem.</li><li>Follow the noble ideals of the freedom struggle.</li><li>Protect the <u>sovereignty, unity and integrity</u> of India.</li><li>Defend the country and render national service when called.</li><li>Promote harmony and brotherhood, and give up practices that insult women.</li><li>Value and preserve our rich heritage and composite culture.</li><li>Protect and improve the natural environment.</li><li>Develop <u>scientific temper</u>, humanism and a spirit of inquiry.</li><li>Protect public property and give up violence.</li><li>Strive for <u>excellence</u> in individual and collective activity.</li><li>Parent or guardian to give opportunities for education to a child aged <b>6 to 14</b> years (added by 86th Amendment, 2002).</li></ol><div class="cp-note remember">The 42nd Amendment added ten duties on the recommendation of the <b>Swaran Singh Committee</b>, and the 86th Amendment added the eleventh.</div><div class="cp-note trap"><b>Trap:</b> Duties apply only to <u>citizens</u>, and there is no punishment written in the Constitution for not following them.</div><div class="cp-note exam"><b>Exam note:</b> the idea of Fundamental Duties was taken from the Constitution of the former USSR.</div><div class="cp-mnemonic"><b>51A</b> = “<b>51</b> + <b>A</b>ctions” — and <b>42</b> + <b>1</b> (86th) = <b>11</b> duties.</div><div class="cp-chips"><span>Art. 51A</span><span>Part IV A</span><span>42nd Amendment</span><span>Swaran Singh Committee</span></div>`
  },

  /* ─────────── 82 · QUESTION ─────────── */
  82: {
    questext: "Fundamental Duties were added to the Constitution by which Amendment?",
    options: ["42nd Amendment Act, 1976","44th Amendment Act, 1978","73rd Amendment Act, 1992","86th Amendment Act, 2002"],
    correct: "1",
    exptext: "✅ The 42nd Amendment inserted Part IV A and Art. 51A. 📌 42nd = the “mini-Constitution”. ❌ The 44th, 73rd and 86th did other jobs (the 86th added the eleventh duty).",
  },

  /* ─────────── 83 · QUESTION ─────────── */
  83: {
    questext: "How many Fundamental Duties are there in the Constitution at present?",
    options: ["Ten","Eleven","Nine","Twelve"],
    correct: "2",
    exptext: "✅ There are eleven duties now. 📌 Ten at first, plus one in 2002. ❌ Ten was the original number; nine and twelve are incorrect.",
  },

  /* ─────────── 84 · QUESTION ─────────── */
  84: {
    questext: "The Fundamental Duty of a parent or guardian to provide opportunities for education to a child between 6 and 14 years was added by the —",
    options: ["42nd Amendment Act, 1976","61st Amendment Act, 1988","86th Amendment Act, 2002","73rd Amendment Act, 1992"],
    correct: "3",
    exptext: "✅ The 86th Amendment added clause (k) to Art. 51A. 📌 86th = Art. 21A, Art. 45 and this duty. ❌ The 42nd added the first ten duties, the 61st lowered the voting age and the 73rd added Panchayats.",
  },

  /* ─────────── 85 · QUESTION ─────────── */
  85: {
    questext: "Which of the following is NOT a Fundamental Duty mentioned in Article 51A?",
    options: ["To protect public property and abjure violence","To develop scientific temper, humanism and spirit of inquiry","To protect and improve the natural environment","To vote in every election"],
    correct: "4",
    exptext: "✅ Voting is a legal right and not a duty listed in Art. 51A. 📌 There is no duty to vote. ❌ The other three duties are in Art. 51A.",
  },

  /* ─────────── 86 · QUESTION ─────────── */
  86: {
    questext: "The idea of Fundamental Duties in the Indian Constitution was borrowed from the Constitution of the —",
    options: ["former USSR","United Kingdom","United States of America","Ireland"],
    correct: "1",
    exptext: "✅ The idea came from the former USSR. 📌 Duties = USSR, DPSP = Ireland. ❌ The UK gave the parliamentary system, the USA gave Fundamental Rights and Ireland gave DPSP.",
  },

  /* ─────────── 87 · QUESTION ─────────── */
  87: {
    questext: "The Committee whose recommendations led to the addition of Fundamental Duties was headed by —",
    options: ["Sardar Vallabhbhai Patel","Sardar Swaran Singh","Dr B. R. Ambedkar","K. Santhanam"],
    correct: "2",
    exptext: "✅ The Swaran Singh Committee (1976) recommended the duties. 📌 Swaran Singh = duties. ❌ The other three were important figures but did not head this committee.",
  },

  /* ─────────── 88 · CONCEPT PAGE — Part V — The Union (Art. 52–151) ─────────── */
  88: {
    type: "concept",
    icon: "🏢",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Part V — The Union (Art. 52–151)",
    html: `<p class="cp-lead"><b>Part V</b> explains how the <u>Central Government</u> is built: the head (President), the law-makers (Parliament), the law-explainers (Supreme Court) and the auditor (CAG). It has five chapters.</p><div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/3.png" alt="Five chapters of Part V: The Union" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div><div class="cp-stats"><div class="cp-stat"><b>Art. 52–151</b><span>Part V</span></div><div class="cp-stat"><b>5</b><span>Chapters</span></div></div><table><thead><tr><th>Chapter</th><th>Subject</th><th>Articles</th></tr></thead><tbody><tr><td>Chapter–I</td><td>The Executive</td><td>52 – 78</td></tr><tr><td>Chapter–II</td><td>Parliament</td><td>79 – 122</td></tr><tr><td>Chapter–III</td><td>Legislative Powers of the President</td><td>123</td></tr><tr><td>Chapter–IV</td><td>The Union Judiciary</td><td>124 – 147</td></tr><tr><td>Chapter–V</td><td>Comptroller and Auditor-General of India</td><td>148 – 151</td></tr></tbody></table><div class="cp-note trap"><b>Trap:</b> Art. 123 (ordinances) sits in a chapter of its own, not in the Parliament chapter.</div><div class="cp-note exam"><b>Exam note:</b> The Articles in the book’s list are the important ones. Do not try to memorise every number, but know each chapter’s range.</div><div class="cp-mnemonic"><b>E</b>very <b>P</b>erson <b>L</b>earns <b>J</b>udiciary <b>C</b>arefully — <b>E</b>xecutive, <b>P</b>arliament, <b>L</b>egislative powers, <b>J</b>udiciary, <b>C</b>AG.</div><div class="cp-chips"><span>Part V</span><span>Executive</span><span>Parliament</span><span>Judiciary</span><span>CAG</span></div>`
  },

  /* ─────────── 89 · QUESTION ─────────── */
  89: {
    questext: "Which Part of the Constitution deals with “The Union” (Art. 52–151)?",
    options: ["Part IV","Part VI","Part V","Part VIII"],
    correct: "3",
    exptext: "✅ Part V is “The Union”. 📌 V = Union, VI = States. ❌ Part IV is DPSP, Part VI is States and Part VIII is Union Territories.",
  },

  /* ─────────── 90 · QUESTION ─────────── */
  90: {
    questext: "The power of the President to promulgate Ordinances (Art. 123) is placed in which chapter of Part V?",
    options: ["Chapter–I","Chapter–II","Chapter–IV","Chapter–III"],
    correct: "4",
    exptext: "✅ Chapter III is “Legislative Powers of the President” and has only Art. 123. 📌 III = ordinance. ❌ Chapter I is Executive, Chapter II is Parliament and Chapter IV is the Judiciary.",
  },

  /* ─────────── 91 · CONCEPT PAGE — Chapter–I : The Executive (Art. 52–76) ─────────── */
  91: {
    type: "concept",
    icon: "👑",
    accent: "#fb7185",
    pauseTimer: true,
    title: "Chapter–I : The Executive (Art. 52–76)",
    html: `<p class="cp-lead">The <u>Executive</u> carries out the laws. At the top are the President, the Vice-President, the Council of Ministers and the Attorney General. Each has its own Article.</p><table><thead><tr><th>Article</th><th>Subject</th><th>Key idea</th></tr></thead><tbody><tr><td><b>52</b></td><td>The President of India</td><td>Head of the State</td></tr><tr><td><b>53</b></td><td>Executive power of the Union</td><td>Used directly or through officers; supreme command of armed forces</td></tr><tr><td><b>54</b></td><td>Election of President</td><td>By an <u>electoral college</u></td></tr><tr><td><b>61</b></td><td>Procedure for impeachment of the President</td><td>For violation of the Constitution</td></tr><tr><td><b>63</b></td><td>The Vice-President of India</td><td>—</td></tr><tr><td><b>64</b></td><td>Vice-President to be <i>ex-officio</i> Chairman of the Council of States</td><td>Presides over Rajya Sabha</td></tr><tr><td><b>65</b></td><td>Vice-President to act as President or to discharge his functions during casual vacancies or absence of President</td><td>—</td></tr><tr><td><b>66</b></td><td>Election of Vice-President</td><td>Electoral college of both Houses</td></tr><tr><td><b>72</b></td><td>Power of President to grant <u>pardons</u> etc. and to suspend, remit or commute sentences</td><td>Pardoning power</td></tr><tr><td><b>74</b></td><td>Council of Ministers to aid and advise President</td><td>Headed by Prime Minister</td></tr><tr><td><b>76</b></td><td>Attorney General for India</td><td>Chief legal adviser</td></tr></tbody></table><div class="cp-divider">Who votes for whom?</div><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">President’s electoral college</div><u>Elected</u> members of both Houses of Parliament and <u>elected</u> members of State Legislative Assemblies (including Delhi and Puducherry). <b>Nominated members and members of Legislative Councils do not vote</b>.</div><div class="cp-card green"><div class="cp-card-title">Vice-President’s electoral college</div><u>All</u> members of both Houses of Parliament (elected and nominated). State legislators do <b>not</b> vote.</div></div><div class="cp-note remember"><b>Impeachment (Art. 61):</b> a resolution moved in either House needs a notice signed by one-fourth of members, and a two-thirds majority of the <u>total membership</u> of that House. The other House then investigates and must also pass it by two-thirds of its total membership.</div><div class="cp-note trap"><b>Trap:</b> The President can send advice of the Council of Ministers back <u>once</u>, but must follow it when it is sent again (Art. 74, after the 42nd and 44th Amendments).</div><div class="cp-note exam"><b>Exam note:</b> The Attorney General must be a person qualified to be a Supreme Court judge, and holds office during the pleasure of the President.</div><div class="cp-mnemonic"><b>P</b>residents are <b>S</b>tate-elected too; <b>V</b>ice-Presidents <b>V</b>ote only in Parliament — “President = Parliament + States, VP = Parliament only”.</div><div class="cp-chips"><span>Art. 54</span><span>Art. 61</span><span>Art. 72</span><span>Art. 74</span><span>Art. 76</span></div>`
  },

  /* ─────────── 92 · QUESTION ─────────── */
  92: {
    questext: "The procedure for impeachment of the President is laid down in which Article?",
    options: ["Article 61","Article 54","Article 56","Article 72"],
    correct: "1",
    exptext: "✅ Art. 61 lays down the procedure. 📌 61 = impeachment. ❌ Art. 54 is election, Art. 56 is term of office and Art. 72 is pardoning power.",
  },

  /* ─────────── 93 · QUESTION ─────────── */
  93: {
    questext: "The power of the President to grant pardons, reprieves and to suspend, remit or commute sentences is given by —",
    options: ["Article 74","Article 72","Article 61","Article 123"],
    correct: "2",
    exptext: "✅ Art. 72 is the pardoning power. 📌 72 = pardon. ❌ Art. 74 is the Council of Ministers, Art. 61 is impeachment and Art. 123 is ordinances.",
  },

  /* ─────────── 94 · QUESTION ─────────── */
  94: {
    questext: "The Vice-President of India is the ex-officio Chairman of the —",
    options: ["House of the People (Lok Sabha)","Legislative Council of a State","Council of States (Rajya Sabha)","Inter-State Council"],
    correct: "3",
    exptext: "✅ Art. 64 makes the Vice-President the ex-officio Chairman of Rajya Sabha. 📌 VP = Rajya Sabha. ❌ The Speaker presides over Lok Sabha, and the other bodies have different heads.",
  },

  /* ─────────── 95 · QUESTION ─────────── */
  95: {
    questext: "Which of the following is NOT a part of the electoral college that elects the President of India?",
    options: ["Elected members of the Lok Sabha","Elected members of the Rajya Sabha","Elected members of State Legislative Assemblies","Elected members of State Legislative Councils"],
    correct: "4",
    exptext: "✅ Members of State Legislative Councils do not vote in the Presidential election. 📌 Only MPs and MLAs vote (elected ones). ❌ The other three groups are part of the electoral college.",
  },

  /* ─────────── 96 · QUESTION ─────────── */
  96: {
    questext: "The Council of Ministers headed by the Prime Minister to aid and advise the President is provided under —",
    options: ["Article 74","Article 75","Article 76","Article 78"],
    correct: "1",
    exptext: "✅ Art. 74 provides for the Council of Ministers to aid and advise the President. 📌 74 = aid and advise. ❌ Art. 75 deals with other provisions about ministers, Art. 76 with the Attorney General and Art. 78 with the Prime Minister’s duties.",
  },

  /* ─────────── 97 · QUESTION ─────────── */
  97: {
    questext: "Under which Article does the Vice-President act as President during casual vacancies in the office of President?",
    options: ["Article 63","Article 65","Article 64","Article 66"],
    correct: "2",
    exptext: "✅ Art. 65 allows the Vice-President to act as President. 📌 65 = acting President. ❌ Art. 63 creates the post, Art. 64 makes him Chairman of Rajya Sabha and Art. 66 is his election.",
  },

  /* ─────────── 98 · QUESTION ─────────── */
  98: {
    questext: "The Attorney General of India is appointed by the President and must be a person qualified to be a judge of the —",
    options: ["High Court","District Court","Supreme Court","Federal Court"],
    correct: "3",
    exptext: "✅ Art. 76 sets the qualification as that of a Supreme Court judge. 📌 AG = chief legal adviser. ❌ High Court qualification is lower and the Federal Court no longer exists.",
  },

  /* ─────────── 99 · CONCEPT PAGE — Chapter–II : Parliament (Art. 79–100) ─────────── */
  99: {
    type: "concept",
    icon: "🏛️",
    accent: "#2dd4bf",
    pauseTimer: true,
    title: "Chapter–II : Parliament (Art. 79–100)",
    html: `<p class="cp-lead"><b>Parliament</b> is the law-making body of the Union. This first half of the chapter explains <u>what Parliament is made of</u>, how long each House lives, who can join it, and who runs each House.</p><div class="cp-stats"><div class="cp-stat"><b>Art. 79</b><span>Parliament</span></div><div class="cp-stat"><b>250</b><span>Rajya Sabha max</span></div><div class="cp-stat"><b>550</b><span>Lok Sabha max</span></div><div class="cp-stat"><b>1/10</b><span>Quorum</span></div></div><table><thead><tr><th>Article</th><th>Subject</th><th>Key point</th></tr></thead><tbody><tr><td><b>79</b></td><td>Constitution of Parliament</td><td>President + Council of States + House of the People</td></tr><tr><td><b>80</b></td><td>Composition of the Council of States (Rajya Sabha)</td><td>Max <u>250</u>: 238 representatives of States and UTs + 12 nominated</td></tr><tr><td><b>81</b></td><td>Composition of the House of the People (Lok Sabha)</td><td>Max <u>550</u>: up to 530 from States + up to 20 from UTs</td></tr><tr><td><b>83</b></td><td>Duration of Houses</td><td>Rajya Sabha is <u>permanent</u>, with one-third retiring every 2 years; Lok Sabha lasts <u>5 years</u></td></tr><tr><td><b>84</b></td><td>Qualification for membership</td><td>Citizen; minimum age <u>30</u> (Rajya Sabha), <u>25</u> (Lok Sabha)</td></tr><tr><td><b>85</b></td><td>Sessions, prorogation and dissolution</td><td>Gap between two sessions not more than <u>six months</u></td></tr><tr><td><b>86</b></td><td>Right of President to address and send messages to Houses</td><td>—</td></tr><tr><td><b>87</b></td><td>Special address by the President</td><td>First session after a general election and first session of each year</td></tr><tr><td><b>88</b></td><td>Rights of Ministers and Attorney General as respects Houses</td><td>Can speak in both Houses</td></tr><tr><td><b>89–90</b></td><td>Chairman and Deputy Chairman of the Council of States</td><td>Vacation, resignation and removal of Deputy Chairman</td></tr><tr><td><b>93–95</b></td><td>Speaker and Deputy Speaker of the House of the People</td><td>Vacation, resignation, removal; powers of Deputy Speaker</td></tr><tr><td><b>98</b></td><td>Secretariat of Parliament</td><td>—</td></tr><tr><td><b>99</b></td><td>Oath or affirmation by members</td><td>—</td></tr><tr><td><b>100</b></td><td>Voting in Houses, power of Houses to act notwithstanding vacancies and quorum</td><td>Quorum = <u>one-tenth</u> of total members</td></tr></tbody></table><div class="cp-note remember"><b>Today’s numbers:</b> Rajya Sabha has 245 members (233 elected + 12 nominated), which is within the maximum of 250. Lok Sabha has 543 elected members, which is within the maximum of 550.</div><div class="cp-note trap"><b>Trap:</b> Art. 86 (address and messages) and Art. 87 (special address) look alike. In Art. 87, the President addresses both Houses together at the start of the first session after elections and at the first session of each year.</div><div class="cp-note exam"><b>Exam note:</b> The Speaker or Deputy Speaker can be removed by a resolution passed by a majority of all the then members of the House, with 14 days’ notice (Art. 94).</div><div class="cp-mnemonic"><b>250</b> = <b>2</b>-<b>5</b>-<b>0</b> Rajya Sabha; <b>550</b> = <b>5</b>-<b>5</b>-<b>0</b> Lok Sabha; ages <b>30</b> and <b>25</b> — “<b>R</b>aja is older (<b>30</b>), <b>L</b>ok is younger (<b>25</b>)”.</div><div class="cp-chips"><span>Art. 79</span><span>Art. 80</span><span>Art. 81</span><span>Art. 85</span><span>Art. 87</span><span>Art. 100</span></div>`
  },

  /* ─────────── 100 · QUESTION ─────────── */
  100: {
    questext: "According to Article 79, Parliament of India consists of —",
    options: ["the Lok Sabha and the Rajya Sabha only","the Prime Minister, the Lok Sabha and the Rajya Sabha","the President, the Vice-President and the two Houses","the President, the Council of States and the House of the People"],
    correct: "4",
    exptext: "✅ Art. 79 includes the President as part of Parliament. 📌 Parliament = President + two Houses. ❌ The other options leave out the President or add the Prime Minister or Vice-President.",
  },

  /* ─────────── 101 · QUESTION ─────────── */
  101: {
    questext: "The maximum strength of the Council of States (Rajya Sabha) fixed by Article 80 is —",
    options: ["250","238","245","275"],
    correct: "1",
    exptext: "✅ Art. 80 sets the maximum at 250 (238 + 12 nominated). 📌 The present strength is 245. ❌ 238 is only the elected part, 245 is the present strength and 275 is not in the Constitution.",
  },

  /* ─────────── 102 · QUESTION ─────────── */
  102: {
    questext: "The maximum strength of the House of the People (Lok Sabha) fixed by Article 81 is —",
    options: ["543","550","500","545"],
    correct: "2",
    exptext: "✅ Art. 81 sets the maximum at 550. 📌 543 is the present elected strength. ❌ 543 is a tempting trap, and 500 and 545 are old or wrong figures.",
  },

  /* ─────────── 103 · QUESTION ─────────── */
  103: {
    questext: "What is the minimum age required to become a member of the Rajya Sabha?",
    options: ["25 years","35 years","30 years","21 years"],
    correct: "3",
    exptext: "✅ Art. 84 sets 30 years for Rajya Sabha. 📌 Rajya Sabha 30, Lok Sabha 25. ❌ 25 is for Lok Sabha, and 35 is for the President, and 21 is not the correct age.",
  },

  /* ─────────── 104 · QUESTION ─────────── */
  104: {
    questext: "As per Article 85, the maximum gap between two sessions of Parliament can be —",
    options: ["three months","one year","nine months","six months"],
    correct: "4",
    exptext: "✅ Art. 85 says six months must not pass between the last sitting of one session and the first of the next. 📌 Two sessions a year at least. ❌ Three months, one year and nine months are not the constitutional gap.",
  },

  /* ─────────── 105 · QUESTION ─────────── */
  105: {
    questext: "The President’s special address to both Houses assembled together, at the first session after a general election and at the first session of every year, is covered by —",
    options: ["Article 87","Article 86","Article 85","Article 88"],
    correct: "1",
    exptext: "✅ Art. 87 covers this special address. 📌 86 = address or message to a House, 87 = special address. ❌ Art. 85 is about sessions and Art. 88 is about rights of Ministers.",
  },

  /* ─────────── 106 · QUESTION ─────────── */
  106: {
    questext: "The quorum to constitute a meeting of either House of Parliament is —",
    options: ["one-fifth of the total number of members","one-tenth of the total number of members","one-fourth of the total number of members","one-third of the total number of members"],
    correct: "2",
    exptext: "✅ Art. 100 fixes the quorum at one-tenth. 📌 1/10 of members (including the presiding officer). ❌ One-fifth, one-fourth and one-third are higher than the constitutional quorum.",
  },

  /* ─────────── 107 · CONCEPT PAGE — Chapter–II : Parliament (Art. 105–122) ─────────── */
  107: {
    type: "concept",
    icon: "💰",
    accent: "#fbbf24",
    pauseTimer: true,
    title: "Chapter–II : Parliament (Art. 105–122)",
    html: `<p class="cp-lead">This half of the chapter is about <u>how Parliament works</u>: its powers and privileges, how Bills become law, how the <b>Budget</b> is passed, and what the courts <u>cannot</u> do. Money Bills and the Budget are the high-scoring parts.</p><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>105</b></td><td>Powers, privileges etc. of the Houses of Parliament and of the members and committees</td></tr><tr><td><b>106</b></td><td>Salaries and allowances of members</td></tr><tr><td><b>107</b></td><td>Provisions as to introduction and passing of Bills</td></tr><tr><td><b>108</b></td><td><u>Joint sitting</u> of both Houses in certain cases</td></tr><tr><td><b>109</b></td><td>Special procedure in respect of <u>Money Bills</u></td></tr><tr><td><b>110</b></td><td>Definition of ‘Money Bills’</td></tr><tr><td><b>111</b></td><td>Assent to Bills</td></tr><tr><td><b>112</b></td><td>Annual financial statement (<u>Budget</u>)</td></tr><tr><td><b>113</b></td><td>Procedure in Parliament with respect to estimates</td></tr><tr><td><b>114</b></td><td>Appropriation Bills</td></tr><tr><td><b>115</b></td><td>Supplementary, additional or excess grants</td></tr><tr><td><b>116</b></td><td>Votes on account, votes of credit and exceptional grants</td></tr><tr><td><b>117</b></td><td>Special provisions as to financial Bills</td></tr><tr><td><b>118</b></td><td>Rules of procedure</td></tr><tr><td><b>119</b></td><td>Regulation by law of procedure in Parliament in relation to financial business</td></tr><tr><td><b>120</b></td><td>Language to be used in Parliament</td></tr><tr><td><b>121</b></td><td>Restriction on discussion in Parliament</td></tr><tr><td><b>122</b></td><td>Courts not to inquire into proceedings of Parliament</td></tr></tbody></table><div class="cp-divider">Money Bill and joint sitting</div><div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">Money Bill (Art. 109–110)</div>Can be introduced <u>only in Lok Sabha</u>. The <b>Speaker</b> decides whether a Bill is a Money Bill. Rajya Sabha has <u>14 days</u> to return it, and Lok Sabha may accept or reject its suggestions.</div><div class="cp-card blue"><div class="cp-card-title">Joint sitting (Art. 108)</div>Called by the <u>President</u> when the Houses disagree on an ordinary Bill. It is presided over by the <u>Speaker</u>. It cannot be called for Money Bills or Constitution Amendment Bills.</div></div><div class="cp-note remember"><b>Art. 120:</b> Business in Parliament is carried on in Hindi or English. The presiding officer may allow a member to speak in the mother tongue.</div><div class="cp-note trap"><b>Trap:</b> The joint sitting is chaired by the <u>Speaker</u> and not by the Vice-President (who chairs the Rajya Sabha).</div><div class="cp-note exam"><b>Exam note:</b> Art. 121 bars discussion of the conduct of a Supreme Court or High Court judge, except on a motion for his removal.</div><div class="cp-mnemonic"><b>108</b> = joint (<b>1</b>-<b>0</b>-<b>8</b>: “<b>T</b>wo houses <b>T</b>ogether”), <b>109</b> = money, <b>110</b> = money’s definition, <b>112</b> = Budget (“<b>1</b>-<b>1</b>-<b>2</b>: one-one-two — the Budget day”).</div><div class="cp-chips"><span>Art. 108</span><span>Art. 110</span><span>Art. 112</span><span>Art. 114</span><span>Art. 116</span><span>Art. 122</span></div>`
  },

  /* ─────────── 108 · QUESTION ─────────── */
  108: {
    questext: "Who decides whether a Bill is a Money Bill (Art. 110)?",
    options: ["The Chairman of the Rajya Sabha","The President of India","The Speaker of the Lok Sabha","The Finance Minister"],
    correct: "3",
    exptext: "✅ The Speaker’s decision is final. 📌 Money Bill = Lok Sabha only, and the Speaker certifies it. ❌ The Chairman presides over Rajya Sabha, the President gives assent, and the Finance Minister only introduces the Bill.",
  },

  /* ─────────── 109 · QUESTION ─────────── */
  109: {
    questext: "A joint sitting of both Houses of Parliament under Article 108 is presided over by —",
    options: ["the Vice-President","the Chairman of the Rajya Sabha","the President","the Speaker of the Lok Sabha"],
    correct: "4",
    exptext: "✅ The Speaker presides over the joint sitting. 📌 Joint sitting is called by the President, but run by the Speaker. ❌ The Vice-President and the Chairman are the same person who is not in charge here, and the President only summons it.",
  },

  /* ─────────── 110 · QUESTION ─────────── */
  110: {
    questext: "According to Article 109, the Rajya Sabha must return a Money Bill passed by the Lok Sabha within —",
    options: ["14 days","7 days","30 days","six weeks"],
    correct: "1",
    exptext: "✅ Art. 109 gives the Rajya Sabha 14 days. 📌 If it fails, the Bill is deemed passed. ❌ 7 days, 30 days and six weeks are not in Art. 109.",
  },

  /* ─────────── 111 · QUESTION ─────────── */
  111: {
    questext: "The “Annual Financial Statement” (Budget) to be laid before Parliament every year is provided under —",
    options: ["Article 110","Article 112","Article 113","Article 114"],
    correct: "2",
    exptext: "✅ Art. 112 requires the annual financial statement. 📌 112 = Budget. ❌ Art. 110 defines a Money Bill, Art. 113 is about estimates and Art. 114 is about Appropriation Bills.",
  },

  /* ─────────── 112 · QUESTION ─────────── */
  112: {
    questext: "No money can be withdrawn from the Consolidated Fund of India except by —",
    options: ["an order of the President alone","a resolution of the Rajya Sabha","a law made through an Appropriation Bill (Article 114)","an order of the Comptroller and Auditor-General"],
    correct: "3",
    exptext: "✅ Art. 114 requires an Appropriation Act. 📌 Appropriation Bill = permission to spend. ❌ The President, Rajya Sabha and CAG cannot, on their own, allow withdrawal.",
  },

  /* ─────────── 113 · QUESTION ─────────── */
  113: {
    questext: "Which Article deals with votes on account, votes of credit and exceptional grants?",
    options: ["Article 115","Article 117","Article 114","Article 116"],
    correct: "4",
    exptext: "✅ Art. 116 deals with these grants. 📌 115 = supplementary grants, 116 = votes on account. ❌ Art. 115 is supplementary or excess grants, Art. 117 is financial Bills and Art. 114 is Appropriation Bills.",
  },

  /* ─────────── 114 · QUESTION ─────────── */
  114: {
    questext: "Consider the following statements:\n1. Under Article 120, business in Parliament is transacted in Hindi or English.\n2. Under Article 121, the conduct of a Supreme Court or High Court judge cannot be discussed, except on a motion for his removal.\n3. Under Article 122, courts cannot inquire into the proceedings of Parliament.\nWhich of the statements are correct?",
    options: ["1 and 2 only","2 and 3 only","1 and 3 only","1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three statements are correct. 📌 120 = language, 121 = no discussion on judges, 122 = courts keep out. ❌ Each shorter option leaves out a correct statement.",
  },

  /* ─────────── 115 · CONCEPT PAGE — Chapter–III : Legislative Powers of the President (Art. 123) ─────────── */
  115: {
    type: "concept",
    icon: "📜",
    accent: "#60a5fa",
    pauseTimer: true,
    title: "Chapter–III : Legislative Powers of the President (Art. 123)",
    html: `<p class="cp-lead">Parliament is not always sitting. If something urgent comes up in between, <b>Art. 123</b> lets the President issue an <u>Ordinance</u> — a temporary law with the same force as an Act of Parliament.</p><div class="cp-stats"><div class="cp-stat"><b>Art. 123</b><span>Only Article</span></div><div class="cp-stat"><b>6 weeks</b><span>After Parliament reassembles</span></div></div><ol class="cp-steps"><li>Parliament is <u>not</u> in session (recess), or one House is not sitting.</li><li>The President is satisfied that <u>immediate action</u> is needed.</li><li>The President promulgates the Ordinance, which has the <u>same force as an Act</u>.</li><li>It is <u>laid before Parliament</u> when it reassembles.</li><li>It ends <u>six weeks</u> after Parliament reassembles, or earlier if both Houses reject it.</li></ol><div class="cp-note remember">An Ordinance can only deal with subjects on which Parliament itself can make laws.</div><div class="cp-note trap"><b>Trap:</b> The Governor’s Ordinance-making power is in <u>Art. 213</u>, not Art. 123.</div><div class="cp-note exam"><b>Exam note:</b> The maximum life of an Ordinance is six months plus six weeks, if Parliament does not approve it earlier.</div><div class="cp-mnemonic"><b>123</b> = “<b>1</b>-<b>2</b>-<b>3</b>: ordinance in a hurry, one, two, three!” — President = 123, Governor = 213.</div><div class="cp-chips"><span>Art. 123</span><span>Ordinance</span><span>Art. 213</span></div>`
  },

  /* ─────────── 116 · QUESTION ─────────── */
  116: {
    questext: "The President’s power to promulgate Ordinances during recess of Parliament is given by —",
    options: ["Article 123","Article 72","Article 213","Article 74"],
    correct: "1",
    exptext: "✅ Art. 123 gives this power. 📌 President = 123, Governor = 213. ❌ Art. 72 is pardoning power, Art. 213 is the Governor’s ordinance power and Art. 74 is the Council of Ministers.",
  },

  /* ─────────── 117 · QUESTION ─────────── */
  117: {
    questext: "An Ordinance promulgated under Article 123 ceases to operate at the expiry of how many weeks from the reassembly of Parliament?",
    options: ["Four weeks","Six weeks","Eight weeks","Two weeks"],
    correct: "2",
    exptext: "✅ The Ordinance ends six weeks after Parliament reassembles. 📌 Max life = 6 months + 6 weeks. ❌ Four, eight and two weeks are not in Art. 123.",
  },

  /* ─────────── 118 · QUESTION ─────────── */
  118: {
    questext: "The Governor’s power to promulgate Ordinances is given by which Article?",
    options: ["Article 123","Article 163","Article 213","Article 200"],
    correct: "3",
    exptext: "✅ Art. 213 gives this power to the Governor. 📌 123 for the President, 213 for the Governor. ❌ Art. 123 is the President’s, Art. 163 is the Council of Ministers in the State and Art. 200 is assent to Bills.",
  },

  /* ─────────── 119 · QUESTION ─────────── */
  119: {
    questext: "An Ordinance promulgated by the President under Article 123 has the same force as —",
    options: ["an Act of Parliament","an executive order of the Prime Minister","a resolution of the Lok Sabha","a rule made by the Cabinet Secretary"],
    correct: "1",
    exptext: "✅ Art. 123(2) says the Ordinance has the same force as an Act. 📌 Temporary but equal to a law. ❌ The other options are not law-making instruments of that level.",
  },

  /* ─────────── 120 · CONCEPT PAGE — Chapter–IV : The Union Judiciary (Art. 124–135) ─────────── */
  120: {
    type: "concept",
    icon: "⚖️",
    accent: "#c084fc",
    pauseTimer: true,
    title: "Chapter–IV : The Union Judiciary (Art. 124–135)",
    html: `<p class="cp-lead">The <u>Supreme Court</u> is the highest court. These Articles explain how it is set up, who sits on it, and what cases it can hear. Learn the <b>jurisdiction ladder</b>: original → appellate → special.</p><div class="cp-stats"><div class="cp-stat"><b>Art. 124</b><span>Supreme Court</span></div><div class="cp-stat"><b>34</b><span>Max judges (incl. CJI)</span></div><div class="cp-stat"><b>Art. 129</b><span>Court of record</span></div></div><table><thead><tr><th>Article</th><th>Subject</th><th>Key idea</th></tr></thead><tbody><tr><td><b>124</b></td><td>Establishment and Constitution of Supreme Court</td><td>CJI + other judges; strength fixed by Parliament</td></tr><tr><td><b>125</b></td><td>Salaries etc. of Judges</td><td>—</td></tr><tr><td><b>126</b></td><td>Appointment of <u>acting</u> Chief Justice</td><td>When the post of CJI is vacant</td></tr><tr><td><b>127</b></td><td>Appointment of <u>ad hoc</u> Judges</td><td>When there are too few judges for a quorum</td></tr><tr><td><b>128</b></td><td>Attendance of <u>retired</u> Judge at sittings</td><td>With the consent of the President</td></tr><tr><td><b>129</b></td><td>Supreme Court to be a <u>Court of record</u></td><td>Records are evidence; it can punish for contempt</td></tr><tr><td><b>130</b></td><td>Seat of Supreme Court</td><td>Delhi, or other places chosen by the CJI with the President’s approval</td></tr><tr><td><b>131</b></td><td><u>Original</u> jurisdiction</td><td>Disputes between the Centre and States, or between States</td></tr><tr><td><b>132</b></td><td>Appellate jurisdiction: appeals from High Court in certain cases</td><td>Constitutional matters</td></tr><tr><td><b>133</b></td><td>Appellate jurisdiction: appeals from High Court in regard to civil matters</td><td>Civil</td></tr><tr><td><b>134</b></td><td>Appellate jurisdiction in regard to criminal matters</td><td>Criminal</td></tr><tr><td><b>134A</b></td><td>Certificate for appeal to the Supreme Court</td><td>Given by the High Court</td></tr><tr><td><b>135</b></td><td>Jurisdiction and powers of the Federal Court under existing law exercisable by the Supreme Court</td><td>—</td></tr></tbody></table><div class="cp-note remember"><b>Strength:</b> The Supreme Court started with 8 judges (1 CJI + 7). Parliament has raised this several times, and it now stands at 34 including the CJI (2019).</div><div class="cp-note trap"><b>Trap:</b> Art. 126 (acting CJI) and Art. 127 (ad hoc judges) look alike. Art. 126 replaces the CJI, and Art. 127 adds judges to the bench.</div><div class="cp-note exam"><b>Exam note:</b> “Court of record” (Art. 129) also applies to High Courts, under Art. 215.</div><div class="cp-mnemonic"><b>132 C</b>onstitutional, <b>133 C</b>ivil, <b>134 C</b>riminal — “<b>3</b> steps: <b>2</b>-<b>3</b>-<b>4</b> → Cons, Civil, Crime”.</div><div class="cp-chips"><span>Art. 124</span><span>Art. 129</span><span>Art. 131</span><span>Art. 132</span><span>Art. 133</span><span>Art. 134</span></div>`
  },

  /* ─────────── 121 · QUESTION ─────────── */
  121: {
    questext: "The establishment and constitution of the Supreme Court is provided under —",
    options: ["Article 125","Article 124","Article 129","Article 130"],
    correct: "2",
    exptext: "✅ Art. 124 sets up the Supreme Court. 📌 124 = establishment. ❌ Art. 125 is salaries, Art. 129 is court of record and Art. 130 is the seat.",
  },

  /* ─────────── 122 · QUESTION ─────────── */
  122: {
    questext: "Which Article declares the Supreme Court to be a Court of record?",
    options: ["Article 124","Article 131","Article 129","Article 136"],
    correct: "3",
    exptext: "✅ Art. 129 makes the Supreme Court a court of record with the power to punish for contempt. 📌 129 = record. ❌ Art. 124 sets up the court, Art. 131 is original jurisdiction and Art. 136 is special leave.",
  },

  /* ─────────── 123 · QUESTION ─────────── */
  123: {
    questext: "The original jurisdiction of the Supreme Court in disputes between the Government of India and one or more States is provided under —",
    options: ["Article 132","Article 133","Article 136","Article 131"],
    correct: "4",
    exptext: "✅ Art. 131 gives the Supreme Court exclusive original jurisdiction in such disputes. 📌 131 = Centre-State disputes. ❌ Art. 132, 133 are appeals, and Art. 136 is special leave.",
  },

  /* ─────────── 124 · QUESTION ─────────── */
  124: {
    questext: "The appointment of an acting Chief Justice of India is provided under —",
    options: ["Article 126","Article 124","Article 127","Article 128"],
    correct: "1",
    exptext: "✅ Art. 126 covers the acting CJI. 📌 126 = acting CJI, 127 = ad hoc judge. ❌ Art. 124 is establishment, Art. 127 is ad hoc judges and Art. 128 is retired judges.",
  },

  /* ─────────── 125 · QUESTION ─────────── */
  125: {
    questext: "Which Article provides for appellate jurisdiction of the Supreme Court in regard to criminal matters?",
    options: ["Article 132","Article 134","Article 133","Article 134A"],
    correct: "2",
    exptext: "✅ Art. 134 deals with criminal appeals. 📌 132 = constitutional, 133 = civil, 134 = criminal. ❌ Art. 132 and 133 deal with constitutional and civil matters, and Art. 134A is only the certificate for appeal.",
  },

  /* ─────────── 126 · QUESTION ─────────── */
  126: {
    questext: "Under Article 128, a retired Judge of the Supreme Court may be requested to sit and act as a Judge of the Court with the previous consent of —",
    options: ["the Chief Justice of India","the Prime Minister","the President","the Law Minister"],
    correct: "3",
    exptext: "✅ Art. 128 needs the President’s consent. 📌 The CJI requests, with the President’s consent. ❌ The CJI makes the request but the consent that is needed is the President’s, and the Prime Minister or Law Minister has no such role.",
  },

  /* ─────────── 127 · QUESTION ─────────── */
  127: {
    questext: "The jurisdiction and powers of the Federal Court under existing law were made exercisable by the Supreme Court under —",
    options: ["Article 133","Article 134","Article 136","Article 135"],
    correct: "4",
    exptext: "✅ Art. 135 transfers the old Federal Court’s powers to the Supreme Court. 📌 135 = Federal Court’s powers. ❌ Art. 133 and 134 are civil and criminal appeals and Art. 136 is special leave.",
  },

  /* ─────────── 128 · CONCEPT PAGE — Chapter–IV : The Union Judiciary (Art. 136–144) ─────────── */
  128: {
    type: "concept",
    icon: "🔏",
    accent: "#34d399",
    pauseTimer: true,
    title: "Chapter–IV : The Union Judiciary (Art. 136–144)",
    html: `<p class="cp-lead">The second half of the judiciary chapter gives the Supreme Court its <u>special</u> powers: hearing any case by special leave, reviewing its own decisions, and giving advice. Its judgments become the <u>law of the land</u>.</p><table><thead><tr><th>Article</th><th>Subject</th><th>Key idea</th></tr></thead><tbody><tr><td><b>136</b></td><td>Special leave to appeal by the Supreme Court</td><td><u>Discretionary</u>; SLP</td></tr><tr><td><b>137</b></td><td>Review of judgements or orders by the Supreme Court</td><td>The Court can review its own decisions</td></tr><tr><td><b>138</b></td><td>Enlargement of the jurisdiction of the Supreme Court</td><td>By Parliament</td></tr><tr><td><b>141</b></td><td>Law declared by Supreme Court to be <u>binding on all Courts</u></td><td>Precedent</td></tr><tr><td><b>143</b></td><td>Power of President to consult Supreme Court</td><td><u>Advisory</u> jurisdiction</td></tr><tr><td><b>144</b></td><td>Civil and judicial authorities to act in aid of the Supreme Court</td><td>—</td></tr></tbody></table><div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">Art. 136 — SLP</div>The Supreme Court can <u>choose</u> to hear an appeal against almost any court or tribunal order, except those of military tribunals. It is not a right, but the Court’s own discretion.</div><div class="cp-card violet"><div class="cp-card-title">Art. 143 — Advice</div>The President can ask the Court for its opinion on a question of law or fact. The Court’s opinion is <u>advisory</u> and <u>not binding</u> on the President.</div></div><div class="cp-note trap"><b>Trap:</b> The Supreme Court’s <u>judgment</u> (Art. 141) binds all courts. Its <u>advice</u> (Art. 143) does not bind the President.</div><div class="cp-note exam"><b>Exam note:</b> Art. 141 is why a Supreme Court judgment is called “the law of the land”.</div><div class="cp-mnemonic"><b>136</b> = Special leave · <b>137</b> = Review · <b>141</b> = Binding · <b>143</b> = Advice — “<b>S</b>ome <b>R</b>ules <b>B</b>ind <b>A</b>ll”.</div><div class="cp-chips"><span>Art. 136</span><span>Art. 137</span><span>Art. 141</span><span>Art. 143</span><span>Art. 144</span></div>`
  },

  /* ─────────── 129 · QUESTION ─────────── */
  129: {
    questext: "Special leave to appeal by the Supreme Court is provided under —",
    options: ["Article 136","Article 132","Article 137","Article 143"],
    correct: "1",
    exptext: "✅ Art. 136 provides for special leave petitions (SLP). 📌 136 = SLP. ❌ Art. 132 is appeals in constitutional matters, Art. 137 is review and Art. 143 is advice.",
  },

  /* ─────────── 130 · QUESTION ─────────── */
  130: {
    questext: "Under which Article is the law declared by the Supreme Court binding on all courts within the territory of India?",
    options: ["Article 129","Article 141","Article 137","Article 144"],
    correct: "2",
    exptext: "✅ Art. 141 makes Supreme Court rulings binding. 📌 141 = binding law. ❌ Art. 129 is court of record, Art. 137 is review and Art. 144 asks authorities to help the Court.",
  },

  /* ─────────── 131 · QUESTION ─────────── */
  131: {
    questext: "The power of the President to consult the Supreme Court on a question of law or fact is given under —",
    options: ["Article 141","Article 142","Article 143","Article 144"],
    correct: "3",
    exptext: "✅ Art. 143 is the advisory jurisdiction. 📌 143 = advice. ❌ Art. 141 is binding judgments, Art. 142 is orders for complete justice and Art. 144 is authorities acting in aid.",
  },

  /* ─────────── 132 · QUESTION ─────────── */
  132: {
    questext: "The Supreme Court’s power to review its own judgements or orders is provided under —",
    options: ["Article 136","Article 138","Article 139","Article 137"],
    correct: "4",
    exptext: "✅ Art. 137 allows review. 📌 137 = review. ❌ Art. 136 is special leave, Art. 138 enlarges jurisdiction and Art. 139 is the power to issue writs.",
  },

  /* ─────────── 133 · QUESTION ─────────── */
  133: {
    questext: "Consider the following statements:\n1. The law declared by the Supreme Court is binding on all courts in India (Art. 141).\n2. The advice given by the Supreme Court under Art. 143 is binding on the President.\n3. Special leave to appeal (Art. 136) is a discretionary power of the Supreme Court.\nWhich of the statements are correct?",
    options: ["1 and 2 only","1 and 3 only","2 and 3 only","1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 1 and 3 are correct. 📌 Judgment binds, advice does not. ❌ Statement 2 is wrong because the President is not bound by the Court’s advisory opinion.",
  },

  /* ─────────── 134 · CONCEPT PAGE — Lokpal ─────────── */
  134: {
    type: "concept",
    icon: "🕵️",
    accent: "#fb923c",
    pauseTimer: true,
    title: "Lokpal",
    html: `<p class="cp-lead"><b>Lokpal</b> is India’s <u>anti-corruption ombudsman</u> at the Centre. It can inquire into corruption cases against high public servants and is <u>empowered to sanction prosecution</u>.</p><div class="cp-stats"><div class="cp-stat"><b>2013</b><span>Act passed</span></div><div class="cp-stat"><b>2019</b><span>First Lokpal</span></div><div class="cp-stat"><b>2024</b><span>Present chairperson</span></div></div><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Whose corruption?</div>Members of Parliament, the Prime Minister (with certain exceptions), ministers, and all civil servants.</div><div class="cp-card green"><div class="cp-card-title">Appointment</div>The President appoints, on the recommendation of a high-level <u>selection committee led by the Prime Minister</u>.</div></div><div class="cp-divider">Timeline</div><ul class="cp-timeline"><li><b>17 and 18 December 2013</b> — The Lokpal and Lokayukta Act was passed by Rajya Sabha and Lok Sabha respectively.</li><li><b>23 March 2019</b> — President Ram Nath Kovind administered the oath to Justice Pinaki Chandra Ghose as the <u>first Lokpal</u> chairperson.</li><li><b>27 March 2019</b> — The eight members took the oath, administered by Justice Ghose.</li><li><b>27 May 2022</b> — Justice Ghose’s term ended, and the post stayed vacant. Justice Pradip Kumar Mohanty acted as chairperson from 28 May 2022.</li><li><b>10 March 2024</b> — President Droupadi Murmu administered the oath to Justice Ajay Manikrao Khanwilkar as chairperson.</li></ul><table><thead><tr><th>Judicial members</th><th>Non-judicial members</th></tr></thead><tbody><tr><td>Justice Lingappa Narayana Swamy</td><td>Sushil Chandra</td></tr><tr><td>Justice Sanjay Yadav</td><td>Pankaj Kumar</td></tr><tr><td>Justice Ritu Raj Awasthi</td><td>Ajay Tirkey</td></tr></tbody></table><div class="cp-note remember">Justice Ghose was 66 when he took the oath. He retired from the Supreme Court in May 2017 and last served as a member of the National Human Rights Commission.</div><div class="cp-note trap"><b>Trap:</b> Lokpal is for the <u>Centre</u>, and Lokayukta is for the <u>States</u>.</div><div class="cp-note exam"><b>Exam note:</b> “First Lokpal” = Justice Pinaki Chandra Ghose, and “latest chairperson” = Justice A. M. Khanwilkar.</div><div class="cp-mnemonic"><b>L</b>okpal = <b>L</b>eader at the Centre; <b>G</b>hose = <b>G</b>enesis (first), <b>K</b>hanwilkar = <b>K</b>ey today.</div><div class="cp-chips"><span>Lokpal</span><span>Ombudsman</span><span>Justice Ghose</span><span>Justice Khanwilkar</span></div>`
  },

  /* ─────────── 135 · QUESTION ─────────── */
  135: {
    questext: "Who was the first Chairperson of the Lokpal of India?",
    options: ["Justice A. M. Khanwilkar","Justice Pradip Kumar Mohanty","Justice Pinaki Chandra Ghose","Justice Ritu Raj Awasthi"],
    correct: "3",
    exptext: "✅ Justice Pinaki Chandra Ghose took the oath on 23 March 2019. 📌 Ghose = first. ❌ Khanwilkar became chairperson in 2024, Mohanty acted as chairperson after Ghose, and Awasthi is a judicial member.",
  },

  /* ─────────── 136 · QUESTION ─────────── */
  136: {
    questext: "Who administered the oath of office to Justice Ajay Manikrao Khanwilkar as Lokpal chairperson in March 2024?",
    options: ["President Droupadi Murmu","President Ram Nath Kovind","Vice-President Jagdeep Dhankhar","Prime Minister Narendra Modi"],
    correct: "1",
    exptext: "✅ President Droupadi Murmu administered the oath on 10 March 2024. 📌 Ghose in 2019 = Kovind, Khanwilkar in 2024 = Murmu. ❌ Kovind administered the oath in 2019, and the VP and PM were present but did not administer it.",
  },

  /* ─────────── 137 · QUESTION ─────────── */
  137: {
    questext: "The Lokpal and Lokayukta Act was passed by both Houses of Parliament in —",
    options: ["December 2011","December 2013","March 2019","December 2010"],
    correct: "2",
    exptext: "✅ The Act was passed on 17 and 18 December 2013. 📌 2013 = Act, 2019 = first Lokpal. ❌ 2011 is when the Bill was introduced, 2019 is when the first Lokpal took the oath and 2010 is not the right year.",
  },

  /* ─────────── 138 · QUESTION ─────────── */
  138: {
    questext: "The selection committee that recommends the appointments of the Lokpal chairperson and members is led by —",
    options: ["the Chief Justice of India","the Speaker of the Lok Sabha","the Prime Minister","the President"],
    correct: "3",
    exptext: "✅ The Prime Minister leads the committee. 📌 PM = chair of the selection committee. ❌ The CJI or his nominee and the Speaker are members, and the President makes the final appointment.",
  },

  /* ─────────── 139 · CONCEPT PAGE — Lokayukta ─────────── */
  139: {
    type: "concept",
    icon: "🏙️",
    accent: "#38bdf8",
    pauseTimer: true,
    title: "Lokayukta",
    html: `<p class="cp-lead">The word <u>Ombudsman</u> is Scandinavian. It means an officer who looks into complaints against the Government. In India the State-level version is the <b>Lokayukta</b>.</p><table><thead><tr><th>Country</th><th>Year of Ombudsman</th></tr></thead><tbody><tr><td>Sweden</td><td>1809</td></tr><tr><td>Finland</td><td>1919</td></tr><tr><td>Denmark</td><td>1955</td></tr><tr><td>Norway and New Zealand</td><td>1962</td></tr></tbody></table><div class="cp-divider">Lokayukta in India</div><ul class="cp-timeline"><li>The <b>Administrative Reforms Commission (1966)</b>, headed by <u>Morarji Desai</u>, recommended Lokpal and Lokayukta.</li><li><b>Maharashtra</b> is the first state in India to introduce the concept through the Lokayukta and Upa-Lokayuktas Act, 1971.</li><li>The Maharashtra Lokayukta institution came into being on <b>25 October 1972</b>.</li></ul><div class="cp-note trap"><b>Trap:</b> Odisha passed a Lokayukta law earlier, but Maharashtra is credited as the first State because its institution actually began working.</div><div class="cp-note exam"><b>Exam note:</b> Lokayukta = State level, Lokpal = Central level.</div><div class="cp-mnemonic"><b>S</b>weden <b>S</b>tarted (1809); <b>M</b>aharashtra <b>M</b>oved first in India.</div><div class="cp-chips"><span>Ombudsman</span><span>Lokayukta</span><span>Maharashtra</span><span>Sweden 1809</span></div>`
  },

  /* ─────────── 140 · QUESTION ─────────── */
  140: {
    questext: "The institution of Ombudsman was first established in which country?",
    options: ["Denmark","Norway","New Zealand","Sweden"],
    correct: "4",
    exptext: "✅ Sweden created it in 1809. 📌 Sweden 1809, Finland 1919, Denmark 1955. ❌ Denmark came in 1955, and Norway and New Zealand in 1962.",
  },

  /* ─────────── 141 · QUESTION ─────────── */
  141: {
    questext: "Which State was the first in India to introduce the concept of Lokayukta through an Act (1971)?",
    options: ["Maharashtra","Odisha","Gujarat","Karnataka"],
    correct: "1",
    exptext: "✅ Maharashtra’s Act is from 1971 and its Lokayukta began on 25 October 1972. 📌 Maharashtra = first. ❌ Odisha, Gujarat and Karnataka followed or did not set up the institution first.",
  },

  /* ─────────── 142 · QUESTION ─────────── */
  142: {
    questext: "The Administrative Reforms Commission, which recommended the appointment of Lokpal and Lokayukta in 1966, was headed by —",
    options: ["Jawaharlal Nehru","Morarji Desai","Lal Bahadur Shastri","Gulzarilal Nanda"],
    correct: "2",
    exptext: "✅ Morarji Desai headed the first ARC. 📌 ARC 1966 = Morarji Desai. ❌ Nehru, Shastri and Nanda did not head the ARC.",
  },

  /* ─────────── 143 · CONCEPT PAGE — Chapter–V : Comptroller and Auditor-General of India (Art. 148–149) ─────────── */
  143: {
    type: "concept",
    icon: "🧮",
    accent: "#e879f9",
    pauseTimer: true,
    title: "Chapter–V : Comptroller and Auditor-General of India (Art. 148–149)",
    html: `<p class="cp-lead">The <b>CAG</b> is called the <u>guardian of the public purse</u>. He checks whether the Government spent money as Parliament allowed. This chapter has two key Articles: <b>148 and 149</b>.</p><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>148</b></td><td>Comptroller and Auditor-General of India: appointment, oath, salary, tenure</td></tr><tr><td><b>149</b></td><td>Duties and powers of the Comptroller and Auditor-General</td></tr></tbody></table><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">Appointment and term</div>Appointed by the <u>President</u>. Serves for <b>six years</b> or until the age of <b>65</b>, whichever is earlier.</div><div class="cp-card red"><div class="cp-card-title">Removal</div>Removed in the <u>same manner and on the same grounds as a Supreme Court judge</u>.</div></div><div class="cp-note remember">The CAG audits the accounts of the Union and the States, and submits reports to the President, who places them before Parliament. The Public Accounts Committee then examines them.</div><div class="cp-note trap"><b>Trap:</b> The CAG is not a Government servant who works under the Finance Ministry. He is independent of the Executive.</div><div class="cp-note exam"><b>Exam note:</b> “Guardian of the public purse” is the favourite description of the CAG.</div><div class="cp-mnemonic"><b>148</b> = <b>A</b>ppointment, <b>149</b> = <b>A</b>udit powers.</div><div class="cp-chips"><span>Art. 148</span><span>Art. 149</span><span>CAG</span><span>PAC</span></div>`
  },

  /* ─────────── 144 · QUESTION ─────────── */
  144: {
    questext: "The Comptroller and Auditor-General of India is provided for under —",
    options: ["Article 76","Article 149","Article 148","Article 324"],
    correct: "3",
    exptext: "✅ Art. 148 sets up the CAG. 📌 148 = CAG. ❌ Art. 76 is the Attorney General, Art. 149 is the CAG’s duties and Art. 324 is the Election Commission.",
  },

  /* ─────────── 145 · QUESTION ─────────── */
  145: {
    questext: "The duties and powers of the Comptroller and Auditor-General are laid down in —",
    options: ["Article 148","Article 150","Article 151","Article 149"],
    correct: "4",
    exptext: "✅ Art. 149 deals with duties and powers. 📌 149 = powers. ❌ Art. 148 deals with appointment and tenure, and Art. 150 and 151 deal with the form of accounts and audit reports.",
  },

  /* ─────────── 146 · QUESTION ─────────── */
  146: {
    questext: "The Comptroller and Auditor-General of India holds office for six years or until the age of —",
    options: ["65 years","60 years","62 years","67 years"],
    correct: "1",
    exptext: "✅ The CAG’s age limit is 65 years. 📌 6 years or 65 years, whichever is earlier. ❌ 60 and 62 are not his limits, and 67 is too high.",
  },

  /* ─────────── 147 · QUESTION ─────────── */
  147: {
    questext: "The Comptroller and Auditor-General can be removed from office in the same manner and on the same grounds as —",
    options: ["the Attorney General","a Judge of the Supreme Court","the Prime Minister","a Governor"],
    correct: "2",
    exptext: "✅ This gives the CAG the same security as a Supreme Court judge. 📌 Removal = like a Supreme Court judge. ❌ The Attorney General and a Governor hold office during the pleasure of the President, and the Prime Minister is not removed this way.",
  },

  /* ─────────── 148 · CONCEPT PAGE — Part VI to Part IX A — The States · Union Territories · Panchayats · Municipalities ─────────── */
  148: {
    type: "concept",
    icon: "🏘️",
    accent: "#a3e635",
    pauseTimer: true,
    title: "Part VI to Part IX A — The States · Union Territories · Panchayats · Municipalities",
    html: `<p class="cp-lead">After the Union (Part V) the Constitution moves down to <u>States and local government</u>. Part VI is the State Government, Part VIII is the Union Territories, and Parts IX and IX A are the <b>grassroots</b> bodies in villages and towns.</p><table><thead><tr><th>Part</th><th>Articles</th><th>Subject</th></tr></thead><tbody><tr><td><b>VI</b></td><td>152–237</td><td>The States — the Government at the State level: the Executive, the State Legislature, the High Courts and Subordinate Courts</td></tr><tr><td><b>VII</b></td><td>238</td><td>The States in Part B of the First Schedule (repealed)</td></tr><tr><td><b>VIII</b></td><td>239–241</td><td>The Union Territories</td></tr><tr><td><b>IX</b></td><td>243 to 243-O</td><td>The Panchayats</td></tr><tr><td><b>IX A</b></td><td>243-P to 243-ZG</td><td>The Municipalities</td></tr></tbody></table><div class="cp-grid c2"><div class="cp-card green"><div class="cp-card-title">Part IX — Panchayats</div>Added by the <u>73rd Amendment</u> (1992). The Eleventh Schedule lists <b>29 subjects</b> on which Panchayats work.</div><div class="cp-card blue"><div class="cp-card-title">Part IX A — Municipalities</div>Added by the <u>74th Amendment</u> (1992). The Twelfth Schedule lists <b>18 subjects</b> on which Municipalities work.</div></div><div class="cp-note remember">Under <b>Art. 243ZD</b>, a <u>District Planning Committee</u> is constituted in every district to prepare the draft development plan for the whole district.</div><div class="cp-note trap"><b>Trap:</b> Panchayat = Part <u>IX</u> (rural), Municipality = Part <u>IX A</u> (urban). Do not swap them.</div><div class="cp-note exam"><b>Exam note:</b> Part VI covers the State Executive, State Legislature and High Courts, so Governor, Chief Minister and High Court questions come from here.</div><div class="cp-mnemonic"><b>IX</b> = village (<b>9</b> people in a village), <b>IX A</b> = city A — “<b>A</b> for <b>A</b>rea of the town”.</div><div class="cp-chips"><span>Part VI</span><span>Part VIII</span><span>Part IX</span><span>Part IX A</span><span>Art. 243ZD</span></div>`
  },

  /* ─────────── 149 · QUESTION ─────────── */
  149: {
    questext: "Articles 152 to 237 of the Constitution form which Part, dealing with the Government at the State level?",
    options: ["Part V","Part VII","Part VI","Part VIII"],
    correct: "3",
    exptext: "✅ Part VI is “The States”. 📌 V = Union, VI = States. ❌ Part V is the Union, Part VII is repealed and Part VIII is Union Territories.",
  },

  /* ─────────── 150 · QUESTION ─────────── */
  150: {
    questext: "The Panchayats are dealt with in which Part of the Constitution?",
    options: ["Part IX A","Part IX B","Part X","Part IX"],
    correct: "4",
    exptext: "✅ Part IX (Art. 243 to 243-O) is about Panchayats. 📌 IX = villages. ❌ Part IX A is Municipalities, Part IX B is Co-operative Societies and Part X is Scheduled and Tribal Areas.",
  },

  /* ─────────── 151 · QUESTION ─────────── */
  151: {
    questext: "The Municipalities are covered by which Part of the Constitution?",
    options: ["Part IX A","Part IX","Part VIII","Part XI"],
    correct: "1",
    exptext: "✅ Part IX A (Art. 243-P to 243-ZG) deals with Municipalities. 📌 IX A = towns. ❌ Part IX is Panchayats, Part VIII is Union Territories and Part XI is Union-State relations.",
  },

  /* ─────────── 152 · QUESTION ─────────── */
  152: {
    questext: "Under which Article is the District Planning Committee constituted?",
    options: ["Article 243ZE","Article 243ZD","Article 243G","Article 243ZH"],
    correct: "2",
    exptext: "✅ Art. 243ZD is in Part IX A. 📌 ZD = District plan. ❌ Art. 243ZE is the Metropolitan Planning Committee, Art. 243G is the powers of Panchayats and Art. 243ZH starts Part IX B.",
  },

  /* ─────────── 153 · QUESTION ─────────── */
  153: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Part VI – The States","Part VIII – The Union Territories","Part IX A – The Municipalities","Part VIII – The Municipalities"],
    correct: "4",
    exptext: "✅ Part VIII deals with Union Territories, not Municipalities. 📌 Municipalities are in Part IX A. ❌ The first three pairs are correct.",
  },

  /* ─────────── 154 · QUESTION ─────────── */
  154: {
    questext: "Part IX of the Constitution (The Panchayats) was inserted by which Amendment?",
    options: ["73rd Amendment Act, 1992","74th Amendment Act, 1992","42nd Amendment Act, 1976","97th Amendment Act, 2011"],
    correct: "1",
    exptext: "✅ The 73rd Amendment added Part IX. 📌 73 = villages, 74 = towns. ❌ The 74th added Municipalities, the 42nd added Fundamental Duties and the 97th added Co-operative Societies.",
  },

  /* ─────────── 155 · CONCEPT PAGE — Part IX B — Art. 243-ZH to 243-ZT The Co-operative Societies ─────────── */
  155: {
    type: "concept",
    icon: "🤝",
    accent: "#f472b6",
    pauseTimer: true,
    title: "Part IX B — Art. 243-ZH to 243-ZT The Co-operative Societies",
    html: `<p class="cp-lead">Co-operative societies are groups of people who run a business together, such as dairy and credit societies. <b>Part IX B</b> gives them a constitutional base.</p><div class="cp-stats"><div class="cp-stat"><b>243-ZH to 243-ZT</b><span>Articles</span></div><div class="cp-stat"><b>97th</b><span>Amendment (2011)</span></div><div class="cp-stat"><b>21</b><span>Max directors</span></div></div><table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Inserted by</td><td><u>97th Constitution Amendment Act, 2011</u></td></tr><tr><td>Max directors</td><td>Under <b>Art. 243-ZJ</b>, a co-operative society can have at most <b>21</b> directors</td></tr><tr><td>Linked rights</td><td>Art. 19(1)(c) now includes the right to form co-operative societies, and Art. 43B is the DPSP</td></tr><tr><td>Supreme Court (2021)</td><td>Held that Part IX B applies to <u>multi-State</u> co-operative societies only</td></tr></tbody></table><div class="cp-note trap"><b>Trap:</b> The right to form co-operative societies is a Fundamental Right (Art. 19), while Art. 43B is only a Directive Principle.</div><div class="cp-note exam"><b>Exam note:</b> The 97th Amendment touched <u>three</u> places: Art. 19(1)(c), Art. 43B and Part IX B.</div><div class="cp-mnemonic"><b>97</b> → co-op <b>3</b>-way: <b>19</b>, <b>43B</b>, <b>IX B</b>.</div><div class="cp-chips"><span>Part IX B</span><span>97th Amendment</span><span>Art. 243-ZJ</span></div>`
  },

  /* ─────────── 156 · QUESTION ─────────── */
  156: {
    questext: "The maximum number of directors of a co-operative society, as per Article 243-ZJ, is —",
    options: ["15","25","21","31"],
    correct: "3",
    exptext: "✅ Art. 243-ZJ fixes the maximum at 21. 📌 21 directors. ❌ 15, 25 and 31 are not the limit.",
  },

  /* ─────────── 157 · QUESTION ─────────── */
  157: {
    questext: "Part IX B (The Co-operative Societies) was inserted in the Constitution by the —",
    options: ["73rd Amendment Act, 1992","74th Amendment Act, 1992","86th Amendment Act, 2002","97th Amendment Act, 2011"],
    correct: "4",
    exptext: "✅ The 97th Amendment inserted Part IX B. 📌 97th = co-operatives. ❌ The 73rd is Panchayats, the 74th is Municipalities and the 86th is education.",
  },

  /* ─────────── 158 · CONCEPT PAGE — Part X to Part XII — Scheduled and Tribal Areas · Union–State Relations · Finance, Property, Contracts and Suits ─────────── */
  158: {
    type: "concept",
    icon: "💼",
    accent: "#facc15",
    pauseTimer: true,
    title: "Part X to Part XII — Scheduled and Tribal Areas · Union–State Relations · Finance, Property, Contracts and Suits",
    html: `<p class="cp-lead">These three Parts decide <u>who rules the tribal areas</u>, <u>who has power between the Centre and States</u>, and <u>who controls the money</u>. They are important for both Polity and Economy questions.</p><table><thead><tr><th>Part</th><th>Articles</th><th>Subject</th></tr></thead><tbody><tr><td><b>X</b></td><td>244–244A</td><td>The Scheduled and Tribal Areas</td></tr><tr><td><b>XI</b></td><td>245–263</td><td>Relations between The Union and The States</td></tr><tr><td><b>XII</b></td><td>264–300 (300A)</td><td>Finance, property, contracts and suits; Distribution of revenue between Union and States; Finance Commission; Borrowing, Property, Contracts, Rights, Liabilities, Obligations and Suits</td></tr></tbody></table><div class="cp-divider">Key Articles</div><div class="cp-grid c2"><div class="cp-card amber"><div class="cp-card-title">Art. 244</div>Administration of <u>Scheduled Areas</u> (Fifth Schedule) and <u>tribal areas</u> in the North-East (Sixth Schedule).</div><div class="cp-card green"><div class="cp-card-title">Art. 268</div>Duties (such as stamp duties) are <u>levied by the Centre</u> but <u>collected and kept by the States</u>.</div><div class="cp-card blue"><div class="cp-card-title">Art. 270</div>Taxes levied and collected by the Centre are <u>shared</u> between the Centre and the States.</div><div class="cp-card violet"><div class="cp-card-title">Art. 280</div>The President sets up a <u>Finance Commission</u> every <b>five years</b> to recommend how tax money is shared.</div><div class="cp-card red"><div class="cp-card-title">Art. 300A</div><u>Right to Property</u> — a constitutional right, not a Fundamental Right.</div><div class="cp-card teal"><div class="cp-card-title">Art. 266 and 267</div>Art. 266 = Consolidated Fund of India; Art. 267 = Contingency Fund of India.</div></div><div class="cp-note trap"><b>Trap:</b> Art. 268 and Art. 270 sound alike. In Art. 268 States <u>keep</u> the money, and in Art. 270 the money is <u>shared</u>.</div><div class="cp-note exam"><b>Exam note:</b> “Contingency Fund = Art. 267” and “Finance Commission = Art. 280” are frequently asked.</div><div class="cp-mnemonic"><b>268</b> = States keep, <b>270</b> = shared, <b>280</b> = Finance Commission, <b>300A</b> = Property — “<b>K</b>eep, <b>S</b>hare, <b>F</b>inance, <b>P</b>roperty”.</div><div class="cp-chips"><span>Part X</span><span>Part XI</span><span>Part XII</span><span>Art. 280</span><span>Art. 300A</span></div>`
  },

  /* ─────────── 159 · QUESTION ─────────── */
  159: {
    questext: "Part X of the Constitution (Art. 244–244A) deals with —",
    options: ["the Scheduled and Tribal Areas","Relations between the Union and the States","Finance, property, contracts and suits","Trade, commerce and intercourse within India"],
    correct: "1",
    exptext: "✅ Part X is about Scheduled and Tribal Areas. 📌 X = tribal areas. ❌ The other options are Parts XI, XII and XIII.",
  },

  /* ─────────── 160 · QUESTION ─────────── */
  160: {
    questext: "Relations between the Union and the States are dealt with in which Part of the Constitution?",
    options: ["Part X","Part XI","Part XII","Part XIII"],
    correct: "2",
    exptext: "✅ Part XI (Art. 245–263) covers Centre–State relations. 📌 XI = relations. ❌ Part X is tribal areas, Part XII is finance and Part XIII is trade and commerce.",
  },

  /* ─────────── 161 · QUESTION ─────────── */
  161: {
    questext: "The Finance Commission is constituted by the President under which Article, and at what interval?",
    options: ["Article 270, every three years","Article 280, every ten years","Article 280, every five years","Article 268, every five years"],
    correct: "3",
    exptext: "✅ Art. 280 requires a Finance Commission every five years. 📌 280 = Finance Commission. ❌ Art. 270 and 268 are about taxes, and ten years is the wrong interval.",
  },

  /* ─────────── 162 · QUESTION ─────────── */
  162: {
    questext: "The Right to Property is now a constitutional right under —",
    options: ["Article 31","Article 19(1)(f)","Article 21","Article 300A"],
    correct: "4",
    exptext: "✅ Art. 300A in Part XII says no person shall be deprived of property save by authority of law. 📌 Property = legal/constitutional right. ❌ Art. 31 and 19(1)(f) were deleted and Art. 21 is life and liberty.",
  },

  /* ─────────── 163 · QUESTION ─────────── */
  163: {
    questext: "Stamp duties levied by the Government of India but collected and appropriated by the States are covered under —",
    options: ["Article 268","Article 266","Article 267","Article 270"],
    correct: "1",
    exptext: "✅ Art. 268 is the “levied by the Centre, kept by the States” Article. 📌 268 = States keep. ❌ Art. 266 is the Consolidated Fund, Art. 267 is the Contingency Fund and Art. 270 is shared taxes.",
  },

  /* ─────────── 164 · QUESTION ─────────── */
  164: {
    questext: "The Contingency Fund of India is established under —",
    options: ["Article 266","Article 267","Article 265","Article 268"],
    correct: "2",
    exptext: "✅ Art. 267 sets up the Contingency Fund. 📌 266 = Consolidated, 267 = Contingency. ❌ Art. 266 is the Consolidated Fund, Art. 265 says no tax without law and Art. 268 is about duties.",
  },

  /* ─────────── 165 · CONCEPT PAGE — Part XIII — Trade, Commerce and Intercourse within the Territory of India (Art. 301–307) ─────────── */
  165: {
    type: "concept",
    icon: "🚚",
    accent: "#4ade80",
    pauseTimer: true,
    title: "Part XIII — Trade, Commerce and Intercourse within the Territory of India (Art. 301–307)",
    html: `<p class="cp-lead"><b>Part XIII</b> makes India one common market: goods and people can move freely from one State to another, unless a law allows a reasonable restriction.</p><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>301</b></td><td>Freedom of trade, commerce and intercourse throughout the territory of India</td></tr><tr><td><b>302</b></td><td>Parliament may impose restrictions in the public interest</td></tr><tr><td><b>303–305</b></td><td>Limits and exceptions to the freedom</td></tr><tr><td><b>307</b></td><td>Appointment of authority to carry out the purposes of these Articles</td></tr></tbody></table><div class="cp-note trap"><b>Trap:</b> Art. 301 is not a Fundamental Right. It is a general constitutional freedom, found outside Part III.</div><div class="cp-note exam"><b>Exam note:</b> The words “trade, commerce and intercourse” in a question point to Art. 301 and Part XIII.</div><div class="cp-mnemonic"><b>301</b> = “<b>3</b>-<b>0</b>-<b>1</b>” — free movement for trade, start counting at <b>301</b>.</div><div class="cp-chips"><span>Part XIII</span><span>Art. 301</span><span>Free trade</span></div>`
  },

  /* ─────────── 166 · QUESTION ─────────── */
  166: {
    questext: "Freedom of trade, commerce and intercourse throughout the territory of India is guaranteed under —",
    options: ["Article 19(1)(g)","Article 300A","Article 301","Article 302"],
    correct: "3",
    exptext: "✅ Art. 301 in Part XIII guarantees the freedom. 📌 301 = free trade zone. ❌ Art. 19(1)(g) is the citizen’s freedom to do business, Art. 300A is property and Art. 302 allows restrictions.",
  },

  /* ─────────── 167 · QUESTION ─────────── */
  167: {
    questext: "Articles 301 to 307 form which Part of the Constitution?",
    options: ["Part XII","Part XIV","Part XV","Part XIII"],
    correct: "4",
    exptext: "✅ Part XIII deals with trade, commerce and intercourse. 📌 XIII = trade. ❌ Part XII is finance, Part XIV is services and Part XV is elections.",
  },

  /* ─────────── 168 · CONCEPT PAGE — Part XIV — Services Under The Union and The States (Art. 308–323) ─────────── */
  168: {
    type: "concept",
    icon: "🧑‍💼",
    accent: "#818cf8",
    pauseTimer: true,
    title: "Part XIV — Services Under The Union and The States (Art. 308–323)",
    html: `<p class="cp-lead">This Part is about <u>civil servants</u> and the <u>Public Service Commissions</u>: how they are recruited, what protection they have, and who runs the selection bodies.</p><table><thead><tr><th>Article</th><th>Subject</th><th>Key idea</th></tr></thead><tbody><tr><td><b>309</b></td><td>Recruitment and conditions of service of persons serving the Union or a State</td><td>Laws of Parliament or State legislature</td></tr><tr><td><b>310</b></td><td>Tenure of office of persons serving the Union or a State</td><td>Doctrine of <u>pleasure</u></td></tr><tr><td><b>311</b></td><td>Dismissal, removal or reduction in rank of persons employed in civil capacities</td><td><u>Safeguard</u>: reasonable opportunity to be heard</td></tr><tr><td><b>312</b></td><td>All-India Services</td><td>Creating another All-India Service needs a Rajya Sabha resolution</td></tr><tr><td><b>315</b></td><td>Public Service Commissions for the Union and for the States</td><td>UPSC, State PSC</td></tr><tr><td><b>316</b></td><td>Appointment and term of office of members</td><td>6 years or age limit</td></tr><tr><td><b>317</b></td><td>Removal and suspension of a member of a Public Service Commission</td><td>For misbehaviour</td></tr><tr><td><b>318</b></td><td>Power to make regulations as to conditions of service of members and staff of the Commission</td><td>—</td></tr><tr><td><b>320</b></td><td>Functions of Public Service Commissions</td><td>Advice, conduct of exams</td></tr><tr><td><b>321</b></td><td>Power to extend functions of Public Service Commissions</td><td>—</td></tr><tr><td><b>323</b></td><td>Reports of Public Service Commissions</td><td>Placed before the legislature</td></tr></tbody></table><div class="cp-grid c2"><div class="cp-card blue"><div class="cp-card-title">UPSC members</div>Appointed by the <u>President</u>. Hold office for <b>six years</b> or until age <b>65</b>, whichever is earlier.</div><div class="cp-card green"><div class="cp-card-title">State PSC members</div>Appointed by the <u>Governor</u>. Hold office for six years or until age <b>62</b>. <b>Removal is by the President</b>.</div></div><div class="cp-note remember">Art. 312: To create an additional All-India Service, the Rajya Sabha must pass a resolution supported by <u>two-thirds of members present and voting</u>, declaring it to be in the national interest.</div><div class="cp-note trap"><b>Trap:</b> The Governor appoints State PSC members, but only the <u>President</u> can remove them (Art. 317).</div><div class="cp-note exam"><b>Exam note:</b> Art. 311 protects civil servants from being dismissed by an authority lower than the one who appointed them.</div><div class="cp-mnemonic"><b>310</b> = pleasure, <b>311</b> = protection, <b>312</b> = All-India, <b>315</b> = Commissions — “<b>P</b>leasure, <b>P</b>rotection, <b>A</b>ll-India, <b>C</b>ommission”.</div><div class="cp-chips"><span>Art. 310</span><span>Art. 311</span><span>Art. 312</span><span>Art. 315</span><span>Art. 317</span></div>`
  },

  /* ─────────── 169 · QUESTION ─────────── */
  169: {
    questext: "Which Article provides for the creation of All-India Services?",
    options: ["Article 312","Article 309","Article 310","Article 315"],
    correct: "1",
    exptext: "✅ Art. 312 provides for All-India Services. 📌 312 = All-India. ❌ Art. 309 is recruitment, Art. 310 is tenure and Art. 315 is Public Service Commissions.",
  },

  /* ─────────── 170 · QUESTION ─────────── */
  170: {
    questext: "The creation of a new All-India Service under Article 312 requires a resolution of the Rajya Sabha supported by —",
    options: ["a simple majority of members present and voting","two-thirds of the members present and voting","two-thirds of the total membership of the House","three-fourths of the members present and voting"],
    correct: "2",
    exptext: "✅ Art. 312 needs two-thirds of members present and voting in Rajya Sabha. 📌 Rajya Sabha gets a special role here. ❌ A simple majority, two-thirds of total membership and three-fourths are not the rule.",
  },

  /* ─────────── 171 · QUESTION ─────────── */
  171: {
    questext: "Which Article provides safeguards to civil servants against dismissal, removal or reduction in rank without a reasonable opportunity of being heard?",
    options: ["Article 310","Article 309","Article 311","Article 312"],
    correct: "3",
    exptext: "✅ Art. 311 is the safeguard Article. 📌 311 = protection. ❌ Art. 310 is the doctrine of pleasure, Art. 309 is recruitment and Art. 312 is All-India Services.",
  },

  /* ─────────── 172 · QUESTION ─────────── */
  172: {
    questext: "The Union Public Service Commission is established under —",
    options: ["Article 312","Article 316","Article 320","Article 315"],
    correct: "4",
    exptext: "✅ Art. 315 provides PSCs for the Union and the States. 📌 315 = PSC. ❌ Art. 312 is All-India Services, Art. 316 is appointment and term of members and Art. 320 is functions.",
  },

  /* ─────────── 173 · QUESTION ─────────── */
  173: {
    questext: "The members of a State Public Service Commission are appointed by the Governor, but they can be removed only by —",
    options: ["the President","the Governor","the Chief Minister","the State Legislature"],
    correct: "1",
    exptext: "✅ Art. 317 gives the removal power to the President. 📌 Appoint = Governor, remove = President. ❌ The Governor, the Chief Minister and the legislature cannot remove a State PSC member.",
  },

  /* ─────────── 174 · QUESTION ─────────── */
  174: {
    questext: "The “doctrine of pleasure” — that civil servants hold office during the pleasure of the President or the Governor — is contained in —",
    options: ["Article 309","Article 310","Article 311","Article 317"],
    correct: "2",
    exptext: "✅ Art. 310 states the doctrine of pleasure. 📌 310 = pleasure, 311 = limits on pleasure. ❌ Art. 309 is recruitment, Art. 311 gives safeguards and Art. 317 is removal of a PSC member.",
  },

  /* ─────────── 175 · CONCEPT PAGE — Part XIV A — Art. 323A–323B Tribunals ─────────── */
  175: {
    type: "concept",
    icon: "🏷️",
    accent: "#f87171",
    pauseTimer: true,
    title: "Part XIV A — Art. 323A–323B Tribunals",
    html: `<p class="cp-lead"><b>Tribunals</b> are special bodies that decide specific kinds of disputes quickly, such as service matters and tax matters. Part XIV A gives them a constitutional place.</p><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>323A</b></td><td>Administrative Tribunals — for service matters of government employees</td></tr><tr><td><b>323B</b></td><td>Tribunals for other matters, such as taxation, land reforms and industrial disputes</td></tr></tbody></table><div class="cp-note remember">Part XIV A was added by the <u>42nd Amendment</u> (1976) on the recommendation of the <u>Swaran Singh Committee</u>.</div><div class="cp-note trap"><b>Trap:</b> Part XIV is about <u>Services</u> (Art. 308–323) and Part XIV A is about <u>Tribunals</u> (Art. 323A–323B).</div><div class="cp-mnemonic"><b>A</b>dministrative = <b>323A</b>; <b>B</b>roader topics = <b>323B</b>.</div><div class="cp-chips"><span>Part XIV A</span><span>Tribunals</span><span>42nd Amendment</span></div>`
  },

  /* ─────────── 176 · QUESTION ─────────── */
  176: {
    questext: "Articles 323A and 323B of the Constitution deal with —",
    options: ["Public Service Commissions","All-India Services","Tribunals","Election disputes"],
    correct: "3",
    exptext: "✅ Part XIV A (Art. 323A and 323B) is about tribunals. 📌 XIV A = Tribunals. ❌ Public Service Commissions are in Art. 315 onwards and All-India Services are in Art. 312.",
  },

  /* ─────────── 177 · QUESTION ─────────── */
  177: {
    questext: "Part XIV A (Tribunals) was inserted by the —",
    options: ["44th Amendment Act, 1978","52nd Amendment Act, 1985","73rd Amendment Act, 1992","42nd Amendment Act, 1976"],
    correct: "4",
    exptext: "✅ The 42nd Amendment added Part XIV A. 📌 42nd = Swaran Singh Committee changes. ❌ The 44th, 52nd and 73rd are linked to other subjects.",
  },

  /* ─────────── 178 · CONCEPT PAGE — Part XV — Elections (Art. 324–329) ─────────── */
  178: {
    type: "concept",
    icon: "🗳️",
    accent: "#5eead4",
    pauseTimer: true,
    title: "Part XV — Elections (Art. 324–329)",
    html: `<p class="cp-lead">A democracy is built on fair elections. <b>Part XV</b> sets up the <u>Election Commission</u>, bans discrimination in voter lists, and gives every adult the right to vote.</p><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>324</b></td><td>Superintendence, direction and control of elections vested in an <u>Election Commission</u></td></tr><tr><td><b>325</b></td><td>No person to be ineligible for inclusion in, or claim to be included in a special, electoral roll on grounds of <u>religion, race, caste or sex</u></td></tr><tr><td><b>326</b></td><td>Elections to the House of the People and Legislative Assemblies of States on the basis of <u>adult suffrage</u></td></tr><tr><td><b>327</b></td><td>Power of Parliament to make provision with respect to elections to legislatures</td></tr><tr><td><b>328</b></td><td>Power of Legislature of a State to make provision with respect to elections to such Legislature</td></tr><tr><td><b>329</b></td><td>Bar to interference by Courts in electoral matters</td></tr></tbody></table><div class="cp-note remember">The voting age was lowered from 21 to <b>18</b> years by the <u>61st Amendment</u> (1988).</div><div class="cp-note trap"><b>Trap:</b> Art. 326 covers elections to the Lok Sabha and State Assemblies only. Panchayat and Municipal elections are run by <u>State Election Commissions</u>.</div><div class="cp-note exam"><b>Exam note:</b> An election can be challenged only through an <u>election petition</u> before the proper authority, not by a normal court case (Art. 329).</div><div class="cp-mnemonic"><b>324</b> Commission · <b>325</b> one roll · <b>326</b> adult vote · <b>327</b> Parliament makes rules · <b>328</b> State makes rules · <b>329</b> courts stay out.</div><div class="cp-chips"><span>Art. 324</span><span>Art. 326</span><span>Art. 329</span><span>61st Amendment</span></div>`
  },

  /* ─────────── 179 · QUESTION ─────────── */
  179: {
    questext: "Superintendence, direction and control of elections is vested in the Election Commission by —",
    options: ["Article 324","Article 325","Article 326","Article 329"],
    correct: "1",
    exptext: "✅ Art. 324 creates the Election Commission’s powers. 📌 324 = Commission. ❌ Art. 325 is the electoral roll, Art. 326 is adult suffrage and Art. 329 bars courts.",
  },

  /* ─────────── 180 · QUESTION ─────────── */
  180: {
    questext: "The voting age in India was reduced from 21 to 18 years by which Constitutional Amendment?",
    options: ["42nd Amendment Act, 1976","61st Amendment Act, 1988","44th Amendment Act, 1978","73rd Amendment Act, 1992"],
    correct: "2",
    exptext: "✅ The 61st Amendment lowered the voting age, which operates through Art. 326. 📌 61st = 18 years. ❌ The 42nd, 44th and 73rd Amendments did not change the voting age.",
  },

  /* ─────────── 181 · QUESTION ─────────── */
  181: {
    questext: "The bar on interference by courts in electoral matters is laid down in —",
    options: ["Article 327","Article 328","Article 329","Article 324"],
    correct: "3",
    exptext: "✅ Art. 329 bars courts from interfering with electoral matters. 📌 329 = courts out. ❌ Art. 327 and 328 are about law-making on elections and Art. 324 is the Election Commission.",
  },

  /* ─────────── 182 · QUESTION ─────────── */
  182: {
    questext: "The Article under which no person can be left out of the electoral roll on grounds of religion, race, caste or sex is —",
    options: ["Article 324","Article 326","Article 327","Article 325"],
    correct: "4",
    exptext: "✅ Art. 325 provides one general electoral roll for all. 📌 325 = one roll. ❌ Art. 324 is the Election Commission, Art. 326 is adult suffrage and Art. 327 is Parliament’s law-making power.",
  },

  /* ─────────── 183 · QUESTION ─────────── */
  183: {
    questext: "Which Article empowers Parliament to make provisions with respect to elections to Parliament and State Legislatures (such as delimitation and electoral rolls)?",
    options: ["Article 327","Article 324","Article 326","Article 328"],
    correct: "1",
    exptext: "✅ Art. 327 gives this power to Parliament. 📌 327 = Parliament, 328 = State. ❌ Art. 324 is the Commission, Art. 326 is adult suffrage and Art. 328 is the State legislature’s power.",
  },

  /* ─────────── 184 · QUESTION ─────────── */
  184: {
    questext: "Match the following Articles with their subjects:\nA. Article 324   B. Article 325   C. Article 326   D. Article 329\nI. Adult suffrage\nII. Election Commission\nIII. Bar to interference by courts\nIV. No exclusion from the electoral roll on grounds of religion, race, caste or sex",
    options: ["A-II, B-IV, C-I, D-III","A-IV, B-II, C-I, D-III","A-II, B-IV, C-III, D-I","A-I, B-II, C-IV, D-III"],
    correct: "1",
    exptext: "✅ Correct match: 324–Election Commission, 325–no exclusion from roll, 326–adult suffrage, 329–bar on courts. 📌 324 = II, 325 = IV, 326 = I, 329 = III. ❌ The other options swap the subjects.",
  },

  /* ─────────── 185 · CONCEPT PAGE — Part XVI and Part XVII — Special Provisions for certain classes · Official Language ─────────── */
  185: {
    type: "concept",
    icon: "🗣️",
    accent: "#fcd34d",
    pauseTimer: true,
    title: "Part XVI and Part XVII — Special Provisions for certain classes · Official Language",
    html: `<p class="cp-lead">These two Parts show India’s care for <u>weaker sections</u> and <u>language</u>. Part XVI (Art. 330–342) protects SC, ST and other groups, and Part XVII (Art. 343–351) decides the official language.</p><div class="cp-divider">Part XVI · Art. 330–342</div><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>330, 332</b></td><td>Reservation of seats for SC and ST in Lok Sabha and State Assemblies</td></tr><tr><td><b>331, 333</b></td><td>Nomination of Anglo-Indian members (discontinued from 2020)</td></tr><tr><td><b>338</b></td><td>National Commission for Scheduled Castes</td></tr><tr><td><b>338A</b></td><td>National Commission for Scheduled Tribes</td></tr><tr><td><b>340</b></td><td>Commission to investigate conditions of backward classes</td></tr><tr><td><b>341</b></td><td>Scheduled Castes — the President specifies the list</td></tr><tr><td><b>342</b></td><td>Scheduled Tribes — the President specifies the list</td></tr></tbody></table><div class="cp-divider">Part XVII · Art. 343–351</div><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>343</b></td><td>Official language of the Union: <u>Hindi in Devanagari script</u></td></tr><tr><td><b>344</b></td><td>Commission and Parliamentary Committee on official language</td></tr><tr><td><b>345</b></td><td>Official language(s) of a State</td></tr><tr><td><b>348</b></td><td>Language of the Supreme Court, High Courts and Acts: <u>English</u> until Parliament decides otherwise</td></tr><tr><td><b>351</b></td><td>Directive for the <u>development of the Hindi language</u></td></tr></tbody></table><div class="cp-note remember">The nomination of Anglo-Indian members to the Lok Sabha and State Assemblies was ended by the 104th Amendment (effective 25 January 2020).</div><div class="cp-note trap"><b>Trap:</b> Art. 343 makes Hindi the Union’s official language, but it does not make Hindi the “national language”. India has no constitutionally declared national language.</div><div class="cp-note exam"><b>Exam note:</b> Art. 341 = SC list, Art. 342 = ST list — mix-ups are common.</div><div class="cp-mnemonic"><b>341</b> = <b>C</b>astes (<b>3</b>-<b>4</b>-<b>1</b>), <b>342</b> = <b>T</b>ribes (next number, next group).</div><div class="cp-chips"><span>Art. 338</span><span>Art. 341</span><span>Art. 342</span><span>Art. 343</span><span>Art. 351</span></div>`
  },

  /* ─────────── 186 · QUESTION ─────────── */
  186: {
    questext: "The official language of the Union under Article 343 is —",
    options: ["Hindi and English","Hindi in Devanagari script","Sanskrit","Hindustani"],
    correct: "2",
    exptext: "✅ Art. 343 says Hindi in Devanagari script, with international numerals for official use. 📌 English is an associate language by law. ❌ Hindi and English together is not the wording of Art. 343, and Sanskrit and Hindustani are not the Union’s official language.",
  },

  /* ─────────── 187 · QUESTION ─────────── */
  187: {
    questext: "Which Article provides for the National Commission for Scheduled Castes?",
    options: ["Article 330","Article 341","Article 338","Article 342"],
    correct: "3",
    exptext: "✅ Art. 338 gives constitutional status to the NCSC. 📌 338 = SC commission, 338A = ST commission. ❌ Art. 330 is reservation of seats, and Art. 341 and 342 specify SC and ST lists.",
  },

  /* ─────────── 188 · QUESTION ─────────── */
  188: {
    questext: "The President specifies the list of Scheduled Tribes under —",
    options: ["Article 341","Article 340","Article 338A","Article 342"],
    correct: "4",
    exptext: "✅ Art. 342 is the ST list. 📌 341 = Castes, 342 = Tribes. ❌ Art. 341 is for SCs, Art. 340 is the backward classes commission and Art. 338A is the ST commission.",
  },

  /* ─────────── 189 · QUESTION ─────────── */
  189: {
    questext: "The language of the proceedings in the Supreme Court and High Courts, until Parliament decides otherwise, is provided under Article 348 as —",
    options: ["Hindi","English","Hindi and English","The language of the State"],
    correct: "2",
    exptext: "✅ Art. 348 keeps English for the Supreme Court and High Courts. 📌 348 = court language. ❌ Hindi, or Hindi with English, may be used only as the law allows, and State language is not the Supreme Court’s language.",
  },

  /* ─────────── 190 · QUESTION ─────────── */
  190: {
    questext: "Which Article directs the Union to promote the spread and development of the Hindi language?",
    options: ["Article 343","Article 344","Article 351","Article 345"],
    correct: "3",
    exptext: "✅ Art. 351 is the directive for Hindi’s development. 📌 351 = Hindi directive. ❌ Art. 343 is official language, Art. 344 is the commission and Art. 345 is State languages.",
  },

  /* ─────────── 191 · QUESTION ─────────── */
  191: {
    questext: "The nomination of Anglo-Indian members to the Lok Sabha (Article 331) was discontinued by which Amendment?",
    options: ["61st Amendment Act, 1988","95th Amendment Act, 2009","101st Amendment Act, 2016","104th Amendment Act, 2019"],
    correct: "4",
    exptext: "✅ The 104th Amendment ended the nomination from 25 January 2020. 📌 104th = no Anglo-Indian seats. ❌ The 61st lowered the voting age, the 95th extended reservation and the 101st brought GST.",
  },

  /* ─────────── 192 · CONCEPT PAGE — Part XVIII — Emergency Provisions (Art. 352–360) ─────────── */
  192: {
    type: "concept",
    icon: "🚨",
    accent: "#93c5fd",
    pauseTimer: true,
    title: "Part XVIII — Emergency Provisions (Art. 352–360)",
    html: `<p class="cp-lead">Sometimes a country faces a crisis that normal rules cannot handle. <b>Part XVIII</b> gives the Centre <u>extra powers</u> in three kinds of emergency. These are some of the most exam-heavy Articles.</p><div class="cp-stats"><div class="cp-stat"><b>352</b><span>National Emergency</span></div><div class="cp-stat"><b>356</b><span>State Emergency</span></div><div class="cp-stat"><b>360</b><span>Financial Emergency</span></div></div><table><thead><tr><th>Article</th><th>Type</th><th>Ground</th></tr></thead><tbody><tr><td><b>352</b></td><td>Proclamation of Emergency (National)</td><td>War, external aggression or <u>armed rebellion</u></td></tr><tr><td><b>356</b></td><td>Failure of constitutional machinery in a State (President’s Rule)</td><td>State Government cannot work as per the Constitution</td></tr><tr><td><b>360</b></td><td>Proclamation of Financial Emergency</td><td>Threat to the financial stability or credit of India</td></tr></tbody></table><div class="cp-divider">Key rules</div><div class="cp-grid c2"><div class="cp-card red"><div class="cp-card-title">National Emergency</div>Must be approved by Parliament within <b>one month</b>. The ground “internal disturbance” was replaced by “armed rebellion” by the 44th Amendment.</div><div class="cp-card amber"><div class="cp-card-title">State Emergency</div>Must be approved by Parliament within <b>two months</b>. The maximum duration is <b>three years</b>.</div><div class="cp-card violet"><div class="cp-card-title">Financial Emergency</div>Must be approved by Parliament within <b>two months</b>. It has <u>never</u> been proclaimed in India.</div><div class="cp-card blue"><div class="cp-card-title">Fundamental Rights</div>During an emergency, the President can suspend the enforcement of Fundamental Rights, <u>except Art. 20 and 21</u>.</div></div><div class="cp-note remember">National Emergencies so far: <b>1962</b> (China war), <b>1971</b> (Pakistan war) and <b>1975</b> (internal disturbance). Financial Emergency: none.</div><div class="cp-note trap"><b>Trap:</b> Art. 352 is the National Emergency, not Art. 356. Art. 356 is for one State only.</div><div class="cp-note exam"><b>Exam note:</b> The 44th Amendment (1978) also made it clear that Art. 20 and 21 can never be suspended.</div><div class="cp-mnemonic"><b>352</b> = <b>N</b>ation, <b>356</b> = <b>S</b>tate, <b>360</b> = <b>F</b>inance — “<b>N</b>o <b>S</b>tate <b>F</b>ail”.</div><div class="cp-chips"><span>Art. 352</span><span>Art. 356</span><span>Art. 360</span><span>Part XVIII</span></div>`
  },

  /* ─────────── 193 · QUESTION ─────────── */
  193: {
    questext: "Proclamation of a National Emergency by the President is provided under which Article?",
    options: ["Article 352","Article 356","Article 360","Article 365"],
    correct: "1",
    exptext: "✅ Art. 352 deals with the National Emergency. 📌 352 = national. ❌ Art. 356 is for States, Art. 360 is financial and Art. 365 is about failure to comply with Union directions.",
  },

  /* ─────────── 194 · QUESTION ─────────── */
  194: {
    questext: "The proclamation of a Financial Emergency is provided under —",
    options: ["Article 352","Article 360","Article 356","Article 358"],
    correct: "2",
    exptext: "✅ Art. 360 deals with the Financial Emergency. 📌 360 = money. ❌ Art. 352 is National Emergency, Art. 356 is State emergency and Art. 358 is the suspension of Art. 19.",
  },

  /* ─────────── 195 · QUESTION ─────────── */
  195: {
    questext: "President’s Rule in a State on the ground of failure of constitutional machinery is imposed under —",
    options: ["Article 352","Article 355","Article 356","Article 360"],
    correct: "3",
    exptext: "✅ Art. 356 is President’s Rule. 📌 356 = State. ❌ Art. 352 is national, Art. 355 is the Union’s duty to protect States and Art. 360 is financial.",
  },

  /* ─────────── 196 · QUESTION ─────────── */
  196: {
    questext: "Which of the following is a ground for the proclamation of a National Emergency under Article 352 at present?",
    options: ["Internal disturbance","Failure of the State machinery","Financial instability","Armed rebellion"],
    correct: "4",
    exptext: "✅ The 44th Amendment replaced “internal disturbance” with “armed rebellion”. 📌 War, external aggression, armed rebellion. ❌ Internal disturbance is the old ground, and the other two are the grounds for Art. 356 and Art. 360.",
  },

  /* ─────────── 197 · QUESTION ─────────── */
  197: {
    questext: "Which Articles of the Constitution can NOT be suspended even during an Emergency?",
    options: ["Article 20 and Article 21","Article 14 and Article 19","Article 19 and Article 21","Article 22 and Article 32"],
    correct: "1",
    exptext: "✅ Art. 20 and Art. 21 are protected from suspension. 📌 Art. 20 + 21 = always safe. ❌ The other options include rights that can be suspended during an emergency.",
  },

  /* ─────────── 198 · QUESTION ─────────── */
  198: {
    questext: "The proclamation of National Emergency must be approved by both Houses of Parliament within —",
    options: ["two months","one month","six months","fourteen days"],
    correct: "2",
    exptext: "✅ Parliament must approve within one month. 📌 National = 1 month, State and Financial = 2 months. ❌ Two months applies to Art. 356 and 360, and six months and fourteen days are not the periods.",
  },

  /* ─────────── 199 · QUESTION ─────────── */
  199: {
    questext: "Which type of Emergency has never been proclaimed in India so far?",
    options: ["National Emergency","President’s Rule in a State","Financial Emergency","Emergency during war"],
    correct: "3",
    exptext: "✅ A Financial Emergency under Art. 360 has never been declared. 📌 National Emergency was declared three times. ❌ National Emergency was declared in 1962, 1971 and 1975, and President’s Rule has been imposed many times.",
  },

  /* ─────────── 200 · CONCEPT PAGE — Part XIX — Miscellaneous (Art. 361–367) ─────────── */
  200: {
    type: "concept",
    icon: "🧩",
    accent: "#d8b4fe",
    pauseTimer: true,
    title: "Part XIX — Miscellaneous (Art. 361–367)",
    html: `<p class="cp-lead"><b>Part XIX</b> collects a mix of Articles that do not fit elsewhere: protection for newspapers, rules about old treaties and princely states, and special rules for ports.</p><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>361A</b></td><td>Protection of publication of proceedings of Parliament and State Legislatures</td></tr><tr><td><b>363</b></td><td>Bar to interference by courts in disputes arising out of certain treaties, agreements etc.</td></tr><tr><td><b>363A</b></td><td>Recognition granted to Rulers of Indian States to cease and <u>privy purses to be abolished</u></td></tr><tr><td><b>364</b></td><td>Special provisions as to major ports and aerodromes</td></tr><tr><td><b>365</b></td><td>Effect of failure to comply with, or to give effect to, directions given by the Union</td></tr></tbody></table><div class="cp-note remember"><b>363A</b> was added by the <u>26th Amendment</u> (1971), which abolished the privy purses of the former princes.</div><div class="cp-note trap"><b>Trap:</b> Art. 361 protects the President and Governors from court cases, while Art. 361A protects the <u>publication of proceedings</u>.</div><div class="cp-note exam"><b>Exam note:</b> If a State fails to follow Union directions (Art. 365), the President can hold that its machinery has failed (leading to Art. 356).</div><div class="cp-mnemonic"><b>361A</b> = <b>A</b>rticles in newspapers, <b>363A</b> = <b>A</b>bolished princes’ purses.</div><div class="cp-chips"><span>Art. 361A</span><span>Art. 363A</span><span>Art. 365</span><span>26th Amendment</span></div>`
  },

  /* ─────────── 201 · QUESTION ─────────── */
  201: {
    questext: "Privy purses of the former Indian rulers were abolished by which Amendment (Art. 363A)?",
    options: ["25th Amendment Act, 1971","42nd Amendment Act, 1976","44th Amendment Act, 1978","26th Amendment Act, 1971"],
    correct: "4",
    exptext: "✅ The 26th Amendment abolished privy purses. 📌 26th = privy purses. ❌ The 25th Amendment added Art. 31C, the 42nd added Fundamental Duties and the 44th removed Property from Fundamental Rights.",
  },

  /* ─────────── 202 · QUESTION ─────────── */
  202: {
    questext: "Which Article protects the publication of proceedings of Parliament and State Legislatures?",
    options: ["Article 361A","Article 361","Article 363","Article 364"],
    correct: "1",
    exptext: "✅ Art. 361A gives this protection. 📌 361A = publication. ❌ Art. 361 protects the President and Governors, Art. 363 bars courts in treaty disputes and Art. 364 is about ports and aerodromes.",
  },

  /* ─────────── 203 · QUESTION ─────────── */
  203: {
    questext: "If a State fails to comply with the directions given by the Union, the President may hold that the constitutional machinery has failed, under —",
    options: ["Article 363","Article 365","Article 364","Article 366"],
    correct: "2",
    exptext: "✅ Art. 365 states the effect of non-compliance, which can lead to President’s Rule. 📌 365 = non-compliance. ❌ Art. 363 and 364 are about treaties and ports, and Art. 366 is definitions.",
  },

  /* ─────────── 204 · CONCEPT PAGE — Part XX — Art. 368 Amendment of the Constitution ─────────── */
  204: {
    type: "concept",
    icon: "✏️",
    accent: "#86efac",
    pauseTimer: true,
    title: "Part XX — Art. 368 Amendment of the Constitution",
    html: `<p class="cp-lead">A Constitution must be able to change with time. <b>Art. 368</b>, the only Article of Part XX, gives Parliament the power to <u>amend</u> the Constitution and lays down the procedure.</p><div class="cp-stats"><div class="cp-stat"><b>Art. 368</b><span>Only Article</span></div><div class="cp-stat"><b>3</b><span>Types of majority</span></div></div><table><thead><tr><th>Type</th><th>How</th><th>Example</th></tr></thead><tbody><tr><td>Simple majority</td><td>Like an ordinary law</td><td>Admission or formation of new States (Art. 2–4)</td></tr><tr><td>Special majority</td><td>Majority of total membership + <u>two-thirds</u> of members present and voting, in each House</td><td>Fundamental Rights, DPSP</td></tr><tr><td>Special majority + ratification</td><td>Special majority + approval by <u>at least half of the State legislatures</u></td><td>Federal features such as the representation of States, Supreme Court, High Courts</td></tr></tbody></table><div class="cp-note remember">In the <b>Kesavananda Bharati case (1973)</b>, the Supreme Court said that Parliament can amend the Constitution but cannot destroy its <u>basic structure</u>.</div><div class="cp-note trap"><b>Trap:</b> Amendment under Art. 368 is different from the changes made under Art. 2–4 or the Fifth and Sixth Schedules, which are not Art. 368 amendments.</div><div class="cp-mnemonic"><b>3</b> ways: <b>S</b>imple, <b>S</b>pecial, <b>S</b>pecial + <b>S</b>tates — “<b>SSS</b>”.</div><div class="cp-chips"><span>Art. 368</span><span>Basic structure</span><span>Kesavananda Bharati</span></div>`
  },

  /* ─────────── 205 · QUESTION ─────────── */
  205: {
    questext: "Which Article of the Constitution deals with the power of Parliament to amend the Constitution and its procedure?",
    options: ["Article 13","Article 356","Article 368","Article 395"],
    correct: "3",
    exptext: "✅ Art. 368 in Part XX lays down amendment. 📌 368 = amend. ❌ Art. 13 deals with laws against Fundamental Rights, Art. 356 is President’s Rule and Art. 395 is repeals.",
  },

  /* ─────────── 206 · QUESTION ─────────── */
  206: {
    questext: "The doctrine of the “basic structure” of the Constitution was laid down by the Supreme Court in —",
    options: ["Golaknath case, 1967","Maneka Gandhi case, 1978","Minerva Mills case, 1980","Kesavananda Bharati case, 1973"],
    correct: "4",
    exptext: "✅ Kesavananda Bharati (1973) gave the basic structure doctrine. 📌 Basic structure = 1973. ❌ Golaknath held that Fundamental Rights cannot be amended, Maneka Gandhi widened Art. 21 and Minerva Mills later applied the basic structure idea.",
  },

  /* ─────────── 207 · QUESTION ─────────── */
  207: {
    questext: "An amendment of the federal features of the Constitution requires a special majority in Parliament and also —",
    options: ["ratification by at least half of the State legislatures","approval by all the State legislatures","approval by a majority of the Governors","a referendum among the people"],
    correct: "1",
    exptext: "✅ Federal changes need approval of at least half of the States. 📌 Special majority + half the States. ❌ All the States, Governors and a referendum are not required.",
  },

  /* ─────────── 208 · CONCEPT PAGE — Part XXI — Art. 369–392 Temporary, Transitional and Special Provisions: Special status of States ─────────── */
  208: {
    type: "concept",
    icon: "⏳",
    accent: "#fda4af",
    pauseTimer: true,
    title: "Part XXI — Art. 369–392 Temporary, Transitional and Special Provisions: Special status of States",
    html: `<p class="cp-lead"><b>Part XXI</b> holds Articles that were meant for a <u>transition period</u> and also special rules for certain States. Art. 370 and the Articles 371 to 371J are the most important.</p><div class="cp-stats"><div class="cp-stat"><b>369–392</b><span>Articles</span></div><div class="cp-stat"><b>370</b><span>J&K</span></div><div class="cp-stat"><b>371–371J</b><span>Special States</span></div></div><div class="cp-divider">Art. 370 — the 2019 declaration</div><ul class="cp-timeline"><li>The President, on the recommendation of Parliament, made a declaration under <b>Art. 370(3)</b> with effect from <b>6 August 2019</b>.</li><li>After this, all clauses of Art. 370 ceased to operate except <u>clause (1)</u>, which now states that <b>all provisions of the Constitution apply to Jammu and Kashmir</b>.</li><li>On 11 December 2023 the Supreme Court upheld the 2019 decision.</li></ul><div class="cp-divider">Special provisions for some States (Art. 371 to 371J)</div><table><thead><tr><th>Article</th><th>State</th></tr></thead><tbody><tr><td><b>371A</b></td><td>Nagaland</td></tr><tr><td><b>371B</b></td><td>Assam</td></tr><tr><td><b>371C</b></td><td>Manipur</td></tr><tr><td><b>371D / 371E</b></td><td>Andhra Pradesh (and Telangana)</td></tr><tr><td><b>371F</b></td><td>Sikkim</td></tr><tr><td><b>371G</b></td><td>Mizoram</td></tr><tr><td><b>371H</b></td><td>Arunachal Pradesh</td></tr><tr><td><b>371I</b></td><td>Goa</td></tr><tr><td><b>371J</b></td><td>Karnataka (Hyderabad-Karnataka region)</td></tr></tbody></table><div class="cp-note trap"><b>Trap:</b> Art. 370 was a <u>temporary</u> provision (Part XXI heading says so), though it stayed for decades.</div><div class="cp-note exam"><b>Exam note:</b> Art. 371A (Nagaland) and 371G (Mizoram) protect religious and social practices and customary law, and Art. 371J is the most recent (98th Amendment, 2012).</div><div class="cp-mnemonic"><b>A</b>-<b>B</b>-<b>C</b>-<b>D</b>-<b>E</b>-<b>F</b>-<b>G</b>-<b>H</b>-<b>I</b>-<b>J</b> = Nagaland, Assam, Manipur, Andhra, Andhra, Sikkim, Mizoram, Arunachal, Goa, Karnataka — “<b>N</b>ice <b>A</b>pple <b>M</b>angoes <b>A</b>re <b>S</b>o <b>M</b>uch <b>A</b>mazing <b>G</b>ood <b>K</b>iwis”.</div><div class="cp-chips"><span>Art. 370</span><span>Art. 371A</span><span>Art. 371J</span><span>Part XXI</span></div>`
  },

  /* ─────────── 209 · QUESTION ─────────── */
  209: {
    questext: "Articles 369 to 392 form which Part of the Constitution?",
    options: ["Part XX","Part XXI","Part XXII","Part XIX"],
    correct: "2",
    exptext: "✅ Part XXI deals with Temporary, Transitional and Special Provisions. 📌 XXI = temporary and special. ❌ Part XX is Amendment, Part XXII is Short title and repeals and Part XIX is Miscellaneous.",
  },

  /* ─────────── 210 · QUESTION ─────────── */
  210: {
    questext: "By the Presidential declaration of August 2019, all clauses of which Article ceased to operate except clause (1)?",
    options: ["Article 371","Article 368","Article 370","Article 35A"],
    correct: "3",
    exptext: "✅ Art. 370 was the Article on Jammu and Kashmir. 📌 Only clause (1) remains, in a modified form. ❌ Art. 371 gives special provisions to other States, Art. 368 is amendment and Art. 35A was a separate provision on permanent residents.",
  },

  /* ─────────── 211 · QUESTION ─────────── */
  211: {
    questext: "Special provisions with respect to the State of Nagaland are made under —",
    options: ["Article 371B","Article 371F","Article 371G","Article 371A"],
    correct: "4",
    exptext: "✅ Art. 371A is for Nagaland. 📌 A = Nagaland. ❌ Art. 371B is Assam, Art. 371F is Sikkim and Art. 371G is Mizoram.",
  },

  /* ─────────── 212 · QUESTION ─────────── */
  212: {
    questext: "Article 371F makes special provisions for which State?",
    options: ["Sikkim","Mizoram","Goa","Arunachal Pradesh"],
    correct: "1",
    exptext: "✅ Art. 371F is for Sikkim. 📌 F = Sikkim. ❌ Art. 371G is Mizoram, Art. 371I is Goa and Art. 371H is Arunachal Pradesh.",
  },

  /* ─────────── 213 · QUESTION ─────────── */
  213: {
    questext: "On 11 December 2023 a Constitution Bench of the Supreme Court upheld the abrogation of —",
    options: ["Article 35A","Article 370","Article 356","Article 371"],
    correct: "2",
    exptext: "✅ The Court upheld the 2019 decision on Art. 370. 📌 Art. 370 = J&K. ❌ Art. 35A, Art. 356 and Art. 371 were not the subject of that verdict.",
  },

  /* ─────────── 214 · CONCEPT PAGE — Part XXII — Art. 393–395 Short Title, Commencement, Authoritative Text in Hindi and Repeals ─────────── */
  214: {
    type: "concept",
    icon: "🏁",
    accent: "#67e8f9",
    pauseTimer: true,
    title: "Part XXII — Art. 393–395 Short Title, Commencement, Authoritative Text in Hindi and Repeals",
    html: `<p class="cp-lead">The last Part of the Constitution contains the <u>finishing Articles</u>: the name of the Constitution, when it started, the official Hindi text and the old laws it cancelled.</p><table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td><b>393</b></td><td>Short title — “the Constitution of India”</td></tr><tr><td><b>394</b></td><td>Commencement</td></tr><tr><td><b>394A</b></td><td>Authoritative text in Hindi</td></tr><tr><td><b>395</b></td><td>Repeals — the <u>Indian Independence Act, 1947</u> and the <u>Government of India Act, 1935</u> were repealed</td></tr></tbody></table><div class="cp-note remember"><b>Art. 394:</b> some Articles (5–9, 60, 324, 366, 367, 379, 380, 388, 391, 392 and 393) came into force on <u>26 November 1949</u>, and the rest on <u>26 January 1950</u>.</div><div class="cp-note trap"><b>Trap:</b> The Constitution was <u>adopted</u> on 26 November 1949, but it came <u>fully into force</u> on 26 January 1950.</div><div class="cp-note exam"><b>Exam note:</b> Art. 394A (authoritative Hindi text) was inserted by the 58th Amendment (1987).</div><div class="cp-mnemonic"><b>393</b> name · <b>394</b> start · <b>394A</b> Hindi · <b>395</b> repeal — “<b>N</b>ame, <b>S</b>tart, <b>H</b>indi, <b>R</b>epeal”.</div><div class="cp-chips"><span>Art. 393</span><span>Art. 394</span><span>Art. 394A</span><span>Art. 395</span></div>`
  },

  /* ─────────── 215 · QUESTION ─────────── */
  215: {
    questext: "Which Article of the Constitution repealed the Government of India Act, 1935 and the Indian Independence Act, 1947?",
    options: ["Article 393","Article 394","Article 395","Article 394A"],
    correct: "3",
    exptext: "✅ Art. 395 repeals these old laws. 📌 395 = repeals. ❌ Art. 393 is the short title, Art. 394 is commencement and Art. 394A is the Hindi text.",
  },

  /* ─────────── 216 · QUESTION ─────────── */
  216: {
    questext: "Certain Articles of the Constitution (such as Articles 5–9, 60, 324, 366, 367, 379, 380, 388, 391, 392 and 393) came into force on —",
    options: ["26 January 1950","15 August 1947","9 December 1946","26 November 1949"],
    correct: "4",
    exptext: "✅ Art. 394 brought these Articles into force on 26 November 1949. 📌 The rest started on 26 January 1950. ❌ 26 January 1950 is the date for the rest of the Constitution, 15 August 1947 is Independence Day and 9 December 1946 is the first Constituent Assembly meeting.",
  },

  /* ─────────── 217 · QUESTION ─────────── */
  217: {
    questext: "The authoritative text of the Constitution in the Hindi language is provided for under —",
    options: ["Article 394A","Article 393","Article 394","Article 395"],
    correct: "1",
    exptext: "✅ Art. 394A, inserted by the 58th Amendment, deals with the Hindi text. 📌 394A = Hindi. ❌ Art. 393 is the short title, Art. 394 is commencement and Art. 395 is repeals.",
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/thumbnail.png → ENTRY 1 (class overview, "thumb" field) — not numbered
     images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/1.png → Part-III Fundamental Rights (roadmap page)
     images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/2.png → Right to Constitutional Remedies (Art. 32)
     images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/3.png → Part V — The Union (Art. 52–151)

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name)
   images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/thumbnail.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920x1080 px, ultra-sharp, vibrant cinematic 3D illustration in deep indigo, violet and electric-blue tones (accent #6366f1) with warm gold highlights. Dark edges and a bright soft glow behind the right-centre of the frame, where a teacher's photo will be placed later. Spread a few soft, glowing, slightly blurred decorative 3D elements around the frame, mostly behind the right side: a closed book with a golden emblem-like pillar, a balance scale of justice, a quill pen and scroll, and a stack of law books. Keep the LEFT 62% of the frame calm, darker and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image. Clean, most beautiful, colorful, professional, high-contrast composition.
   images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/1.png: Create a clean flat vector diagram on a dark navy background, no people, no logos, no watermarks, VERY LARGE bold white text, thick lines, simple rounded shapes, very few labels, 16:9, 1200x675 px. Title at top: "6 FUNDAMENTAL RIGHTS". Six large rounded cards in a 3 x 2 grid, each with a short label and a number range, in six different bright accent colours: "EQUALITY 14–18", "FREEDOM 19–22", "EXPLOITATION 23–24", "RELIGION 25–28", "CULTURE & EDUCATION 29–30", "REMEDIES 32". Use exactly these English labels and no other text.
   images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/2.png: Create a clean flat vector diagram on a dark navy background, no people, no logos, no watermarks, VERY LARGE bold white text, thick lines, simple rounded shapes, very few labels, 16:9, 1200x675 px. Title at top: "5 WRITS". Five large rounded boxes in a row (or 3 + 2 layout), each with the writ name in big text and a tiny 2-3 word meaning below: "HABEAS CORPUS – PRODUCE THE BODY", "MANDAMUS – WE COMMAND", "PROHIBITION – STOP", "CERTIORARI – CANCEL ORDER", "QUO WARRANTO – BY WHAT AUTHORITY". Use exactly these English labels and no other text.
   images/Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution/3.png: Create a clean flat vector diagram on a dark navy background, no people, no logos, no watermarks, VERY LARGE bold white text, thick lines, simple rounded shapes, very few labels, 16:9, 1200x675 px. Title at top: "PART V — THE UNION". Five large stacked or side-by-side blocks in different bright colours, each with a chapter number and a one-word label: "I EXECUTIVE", "II PARLIAMENT", "III ORDINANCES", "IV JUDICIARY", "V CAG". Use exactly these English labels and no other text.
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   CHANGE LOG (corrections and additions made to the book's content; none of these are marked inside the pages)
   SCOPE
     • Covered only "4. Important Parts, Articles of the Constitution" (book pages 207–210), including the Lokpal and Lokayukta boxes printed inside it.
     • Left out: "5. Schedules of Indian Constitution", "6. Special Features of Indian Constitution", and the lines about the Constitutions of France and the former USSR at the top of page 207 (they belong to the previous / next topics).
     • The "Parts of Indian Constitution" table is kept at the place where the book prints it (after Art. 40).
     • Part III and Part IV Articles printed on the right side of the book page are placed under their own Part, in the book's order.
   CORRECTIONS
     1. Part VII (Art. 238): shown as repealed (Seventh Amendment Act, 1956). The book lists it as an ordinary Part.
     2. Part VIII (Union Territories): the book table says "239 to 242"; the page says "239–241". Art. 242 was omitted by the Seventh Amendment Act, 1956.
     3. Part XV (Elections): the book table says "324 to 329 A"; written as 324–329. Art. 329A was omitted by the 44th Amendment.
     4. Co-operative societies: the book says "Article 243 (ZI)... maximum number of directors may be 21"; the correct Article is 243-ZJ.
     5. Art. 268: the book says "levied and collected by the centre but distributed between the centre and the states". Art. 268 covers duties levied by the Union but collected and appropriated by the States; sharing of taxes is Art. 270. Both are written correctly.
     6. Art. 370 declaration: the book says "from the 5th August, 2019"; the declaration under Art. 370(3) took effect from 6 August 2019 (C.O. 273).
     7. Lokpal: the book says the "amended Lokpal and Lokayukta Bill 2011" was passed on 17 and 18 December 2013; written as the Lokpal and Lokayukta Act, 2013, passed on those dates. The statement that "Samajwadi Party opposed the Bill" is left out as political detail with no exam value.
     8. Lokpal: the book says the chairperson was "administered the oath ... by President Draupadi Murmu on March 10, 2024"; this matches the official press communique of 10 March 2024 and is kept.
     9. Part IX B: the Supreme Court (Union of India v. Rajendra N. Shah, 2021) held Part IX B to be operative only for multi-State co-operative societies; added.
     10. Art. 352: the book gives only the title. The present grounds (war, external aggression, armed rebellion) are written, as "internal disturbance" was replaced by the 44th Amendment.
   ADDITIONS (not in the book, added for understanding and for exam coverage)
     • Explanations, tables, traps, exam notes and mnemonics on every concept page.
     • Part I–II: one-line descriptions of Art. 1–4 and Art. 5–11.
     • Part III: six rights, the Right to Property (Art. 300A), clause lists of Art. 19 and Art. 20, Art. 22 safeguards, 103rd Amendment (EWS), I. R. Coelho case, writs (Art. 32 and Art. 226).
     • Part IV and IV A: source of ideas (Ireland, USSR), amendments (42nd, 44th, 86th, 97th), the list of 11 Fundamental Duties, Swaran Singh Committee.
     • Part V: electoral colleges, impeachment procedure, Money Bill and joint sitting rules, ordinance life (Art. 123, Art. 213), Supreme Court strength (34 including the CJI), jurisdiction ladder, CAG term and removal.
     • Parts VI–IX B: 73rd and 74th Amendments, Eleventh and Twelfth Schedules, 97th Amendment.
     • Part XI–XII: Art. 266, 267, 270, 280.
     • Part XIV: tenure and removal rules of PSC members.
     • Part XVI–XVII: Art. 330–351 list; Anglo-Indian nomination ended by the 104th Amendment (2019).
     • Part XVIII: Art. 356 and the approval periods for emergencies.
     • Part XX–XXII: three types of amendment, Kesavananda Bharati case, Art. 371A–371J, Supreme Court verdict of 11 December 2023 on Art. 370, commencement dates under Art. 394.
   TO VERIFY
     • Present Lokpal membership and any later appointments.
     • Latest position on Part IX B and on the strength of the Supreme Court and Rajya Sabha.
   ════════════════════════════════════════════════════════════════ */
