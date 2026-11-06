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
   FEATURES, PARTS, ARTICLES AND SCHEDULES — concept pages mixed in between questions
   Subject: Indian Polity and Constitution
   Register it in portalData.js like any other test.
   Entry 1 is always the CLASS OVERVIEW page (what we will learn in this class).

   Write entries in the order you want them shown:
       1: concept page   2: question   3: question   4: concept page …

   CONCEPT PAGE fields
     type       : "concept"                 (required)
     title      : "Part III — Fundamental Rights (Articles 12–35)"
     icon       : "⚖️"                       (emoji, optional)
     accent     : "#22c55e"                 (colour of this page, optional)
     pauseTimer : true                      (optional – stops the exam clock while reading)
     html       : `...any HTML, text, <img>, tables...`

   🎬 YOUTUBE STUDIO (optional – put these two fields on ENTRY 1 only)
     The chapter ICON on that page becomes tappable (pulsing red ▶ badge).
     Tapping it opens a studio with 2 tabs:
       🎬 Thumbnail  – composes a 1920×1080 YouTube thumbnail from YOUR image
       📋 Kit        – best title, A/B titles, description, tags, hashtags,
                       pinned comment, thumbnail text, community post, chapters,
                       playlist … each with a one-tap COPY button + "Copy everything".
     thumb : "images/<Subject>/<Chapter_Name>/thumbnail.png" or { image, banner, line1, line2, line3, person, logo, badge, ribbon, burst:"", mode:"creator"|"pro"|"image" }
     yt    : { title, altTitles:[], description, tags:[] (join(", ") length = exactly 500), hashtags:[], pinnedComment,
               thumbText, communityPost, chapters, playlist, extra:[{icon,label,text}] }
     NOTE: export needs the site opened over http(s)://, not file:// (browser canvas rule).

   QUESTION fields: questext, options[4], correct:"1".."4", quesimage, exptext, expimage

   Toolkit classes: cp-lead, cp-card (blue green amber red violet teal pink), cp-grid (c2 c3 c4),
     cp-formula, cp-frac, cp-note (tip trap trick remember info exam good), cp-steps (ol),
     cp-example (cp-q / cp-a), cp-mnemonic, cp-vs (good / bad), cp-stats / cp-stat, cp-chips,
     cp-timeline (ul), details.cp-collapse, cp-divider, cp-fig, cp-key, plain <table>, <img>, h2/h3/h4
     EMPHASIS RULE: never use the brown cp-hl highlight. Emphasise with <u>underline</u> and <b>bold</b> only.

   🌐 TRANSLATION: write all text as real HTML text, one sentence inside ONE element,
     use translate="no" for anything that must stay untranslated. thumb / yt fields stay English.
════════════════════════════════════════════════════════════════ */

window.TEST_DATA = {

  /* ─────────── 1 · CLASS OVERVIEW (opening summary page) ─────────── */
  1: {
    type: "concept",
    icon: "🎯",
    accent: "#3b82f6",
    pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",

    /* 🎬 tap the 🎯 icon on this page → thumbnail studio + YouTube kit */
    thumb: {
      image: "images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/thumbnail.png",
      banner: "ALL COMPETITIVE EXAMS",
      line1: "FULL CLASS",
      line2: "CONSTITUTION",
      line3: "PARTS • SCHEDULES",
      badge: "POLITY",
      ribbon: "ARTICLES • PARTS • SCHEDULES",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Parts, Articles & Schedules of Indian Constitution | Polity for All Competitive Exams",
      altTitles: [
        "Indian Constitution Parts I to XXII in One Class | All Competitive Exams Polity",
        "Important Articles of Indian Constitution: Rights, DPSP, Parliament, Judiciary | Polity",
        "12 Schedules of the Constitution + Special Features | Polity Full Class",
        "Stop Mugging Article Numbers! Polity Trick for SSC, UPSC, Banking, Railways"
      ],
      description:
"Indian Polity questions on Parts, Articles and Schedules of the Constitution are asked in almost every competitive exam. In this class you stop guessing article numbers and start placing them on a mental map.\n" +
"\n" +
"📌 IN THIS CLASS\n" +
"✅ All Parts of the Constitution (Part I to Part XXII) with Article ranges\n" +
"✅ Fundamental Rights (Articles 12–35), Directive Principles (36–51) and Fundamental Duties (51A)\n" +
"✅ Part V: Executive, Parliament, Ordinances, Union Judiciary and CAG\n" +
"✅ Lokpal and Lokayukta\n" +
"✅ Parts VI to XXII including Emergency, Amendment and Article 370\n" +
"✅ The 12 Schedules of the Constitution\n" +
"✅ Special Features of the Indian Constitution\n" +
"✅ 77 practice questions right after the concepts\n" +
"\n" +
"⏱️ CHAPTERS\n" +
"00:00 Class Overview — What We Will Learn Today\n" +
"00:00 Important Parts, Articles of the Constitution\n" +
"00:00 Parts of the Indian Constitution (Part I to Part XXII)\n" +
"00:00 Part III — Fundamental Rights (Articles 12–35)\n" +
"00:00 Part IV — Directive Principles of State Policy (Articles 36–51)\n" +
"00:00 Part IVA — Fundamental Duties (Article 51A)\n" +
"00:00 Part V — The Union: Chapter I, The Executive\n" +
"00:00 Part V — The Union: Chapter II, Parliament (Articles 79–122)\n" +
"00:00 Part V — The Union: Chapters III to V (Ordinances, Union Judiciary, CAG)\n" +
"00:00 Lokpal\n" +
"00:00 Lokayukta\n" +
"00:00 Parts VI to XI — States, Territories, Local Government and Union–State Relations\n" +
"00:00 Parts XII to XIVA — Finance, Trade, Services and Tribunals\n" +
"00:00 Parts XV to XVIII — Elections, Special Provisions, Language and Emergency\n" +
"00:00 Parts XIX to XXII — Miscellaneous, Amendment and Special Provisions\n" +
"00:00 Schedules of Indian Constitution (First to Sixth Schedule)\n" +
"00:00 Schedules of Indian Constitution (Seventh to Twelfth Schedule)\n" +
"00:00 Special Features of Indian Constitution — Structure and Government\n" +
"00:00 Special Features of Indian Constitution — Rights, Society and Local Government\n" +
"\n" +
"👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n" +
"\n" +
"#IndianPolity #Constitution #Articles #Schedules",
      tags: [
        "indian polity",
        "indian constitution",
        "constitution of india",
        "parts of indian constitution",
        "articles of constitution",
        "schedules of constitution",
        "features of constitution",
        "polity for ssc cgl",
        "polity for upsc",
        "polity for banking",
        "polity for railways",
        "polity for defence exams",
        "important articles polity",
        "fundamental rights articles",
        "dpsp articles",
        "fundamental duties article 51a",
        "lokpal and lokayukta",
        "12 schedules of constitution",
        "polity tricks",
        "polity one shot",
        "polity full class",
        "static gk",
        "article 370"
      ],
      hashtags: ["IndianPolity","Constitution","Articles","Schedules"],
      thumbText: "CONSTITUTION: PARTS, ARTICLES & SCHEDULES",
      pinnedComment: "📌 Practice what you learned: solve the 77 questions in the class, then write your score below. Which topic felt hardest — Parts, Articles or Schedules? 👇",
      communityPost: "🏛️ New Polity class is live: Parts, Articles and Schedules of the Indian Constitution — all in one class with practice questions for SSC, UPSC, Banking, Railways and Defence. Start with the class overview, then tell me your score! 🎯",
      chapters: "00:00 Class Overview — What We Will Learn Today\n00:00 Important Parts, Articles of the Constitution\n00:00 Parts of the Indian Constitution (Part I to Part XXII)\n00:00 Part III — Fundamental Rights (Articles 12–35)\n00:00 Part IV — Directive Principles of State Policy (Articles 36–51)\n00:00 Part IVA — Fundamental Duties (Article 51A)\n00:00 Part V — The Union: Chapter I, The Executive\n00:00 Part V — The Union: Chapter II, Parliament (Articles 79–122)\n00:00 Part V — The Union: Chapters III to V (Ordinances, Union Judiciary, CAG)\n00:00 Lokpal\n00:00 Lokayukta\n00:00 Parts VI to XI — States, Territories, Local Government and Union–State Relations\n00:00 Parts XII to XIVA — Finance, Trade, Services and Tribunals\n00:00 Parts XV to XVIII — Elections, Special Provisions, Language and Emergency\n00:00 Parts XIX to XXII — Miscellaneous, Amendment and Special Provisions\n00:00 Schedules of Indian Constitution (First to Sixth Schedule)\n00:00 Schedules of Indian Constitution (Seventh to Twelfth Schedule)\n00:00 Special Features of Indian Constitution — Structure and Government\n00:00 Special Features of Indian Constitution — Rights, Society and Local Government",
      playlist: "Indian Polity and Constitution — Full Classes"
    },

    html: `
      <p class="cp-lead">Today’s class is a <u>complete map of the Indian Constitution</u> — its <b>Parts</b>, its important <b>Articles</b>, its <b>Schedules</b> and its <b>special features</b>. By the end you will <b>stop memorising random numbers and start recognising patterns</b>.</p>
      <div class="cp-stats"><div class="cp-stat"><b>19</b><span>Concept pages</span></div><div class="cp-stat"><b>77</b><span>Practice questions</span></div><div class="cp-stat"><b>12</b><span>Schedules</span></div><div class="cp-stat"><b>~75 min</b><span>Time needed</span></div></div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>4. Important Parts, Articles of the Constitution</b><br>Parts I–XXII, Fundamental Rights, Directive Principles, Fundamental Duties, Part V (Executive, Parliament, Judiciary, CAG), and the later Parts.</li>
        <li><b>Lokpal and Lokayukta</b><br>The ombudsman institutions at the Centre and in the States.</li>
        <li><b>5. Schedules of Indian Constitution</b><br>The 12 Schedules, with the 7th, 8th, 10th, 11th and 12th in focus.</li>
        <li><b>6. Special Features of Indian Constitution</b><br>What makes our Constitution unique.</li>
        <li><b>Practice</b> — questions after every concept page.</li>
      </ul>
      <div class="cp-divider">What you will be able to do</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">📚 Place any Article</div>Tell instantly which Part and which group an Article belongs to.</div>
        <div class="cp-card green"><div class="cp-card-title">⚖️ Rights and duties</div>Recall Articles 12–35, 36–51 and 51A without confusion.</div>
        <div class="cp-card amber"><div class="cp-card-title">🏛️ Union machinery</div>Link the President, Parliament, Supreme Court and CAG to their Articles.</div>
        <div class="cp-card red"><div class="cp-card-title">⚠️ Avoid traps</div>Spot confusions like 109 vs 110, Part XV vs XVII, 5th vs 6th Schedule.</div>
      </div>
      <div class="cp-note exam"><b>Why it matters:</b> Questions on Articles, Parts and Schedules come in SSC, UPSC, Banking, Railways and Defence exams. This one class feeds every Polity topic that follows.</div>
      <div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages, so take your time.</div>
      <div class="cp-chips"><span>Indian Polity</span><span>Constitution</span><span>Parts</span><span>Articles</span><span>Schedules</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE ─────────── */
  2: {
    type: "concept",
    icon: "🗺️",
    accent: "#22c55e",
    pauseTimer: true,
    title: "4. Important Parts, Articles of the Constitution",
    html: `
      <p class="cp-lead">This section is the <u>address book of the Constitution</u>. The Constitution is divided into <b>Parts</b>, Parts contain <b>Articles</b>, and Articles carry the actual rules. Exams keep asking one thing: <b>“Which Article deals with ___?”</b></p>
      <div class="cp-divider">What this section covers</div>
      <ul class="cp-timeline">
        <li><b>Parts I to XXII at a glance</b><br>Which Part holds which subject, with the Article range of each.</li>
        <li><b>Part III — Fundamental Rights</b> (Articles 12–35)</li>
        <li><b>Part IV and Part IVA</b> — Directive Principles (36–51) and Fundamental Duties (51A)</li>
        <li><b>Part V — The Union</b> — Executive, Parliament, ordinance power, Union Judiciary, CAG</li>
        <li><b>Lokpal and Lokayukta</b> — the ombudsman institutions</li>
        <li><b>Parts VI to XXII</b> — States, Territories, local government, finance, services, elections, languages, emergency, amendment and special provisions</li>
      </ul>
      <div class="cp-note exam"><b>Exam focus:</b> Article numbers of Part III, Part IV, Part V (President, Parliament, Supreme Court) and the Emergency articles are asked almost every year.</div>
      <div class="cp-note tip">Do not try to memorise every number. Learn the <u>landmark article of each group</u> first, then the neighbours around it.</div>
    `
  },

  /* ─────────── 3 · CONCEPT PAGE ─────────── */
  3: {
    type: "concept",
    icon: "📚",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "Parts of the Indian Constitution (Part I to Part XXII)",
    html: `
      <p class="cp-lead">Think of the Constitution as a book with <b>Parts</b> as chapters. Knowing <u>which Part holds which subject</u> lets you place any Article in seconds.</p>
      <div class="cp-stats"><div class="cp-stat"><b>395</b><span>Original Articles</span></div><div class="cp-stat"><b>22</b><span>Original Parts</span></div><div class="cp-stat"><b>8</b><span>Original Schedules</span></div><div class="cp-stat"><b>25</b><span>Parts today</span></div></div>
      <div class="cp-divider">The Parts at a glance</div>
      <table>
        <thead><tr><th>Part</th><th>Articles</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>I</td><td>1–4</td><td>The Union and its Territory</td></tr>
          <tr><td>II</td><td>5–11</td><td>Citizenship</td></tr>
          <tr><td>III</td><td>12–35</td><td>Fundamental Rights</td></tr>
          <tr><td>IV</td><td>36–51</td><td>Directive Principles of State Policy</td></tr>
          <tr><td>IVA</td><td>51A</td><td>Fundamental Duties</td></tr>
          <tr><td>V</td><td>52–151</td><td>The Union</td></tr>
          <tr><td>VI</td><td>152–237</td><td>The States</td></tr>
          <tr><td>VII</td><td>238</td><td>States in Part B of the First Schedule (repealed)</td></tr>
          <tr><td>VIII</td><td>239–242</td><td>The Union Territories</td></tr>
          <tr><td>IX</td><td>243–243O</td><td>The Panchayats</td></tr>
          <tr><td>IXA</td><td>243P–243ZG</td><td>The Municipalities</td></tr>
          <tr><td>IXB</td><td>243ZH–243ZT</td><td>The Co-operative Societies</td></tr>
          <tr><td>X</td><td>244–244A</td><td>The Scheduled and Tribal Areas</td></tr>
          <tr><td>XI</td><td>245–263</td><td>Relations between the Union and the States</td></tr>
          <tr><td>XII</td><td>264–300A</td><td>Finance, Property, Contracts and Suits</td></tr>
          <tr><td>XIII</td><td>301–307</td><td>Trade, Commerce and Intercourse within the Territory of India</td></tr>
          <tr><td>XIV</td><td>308–323</td><td>Services under the Union and the States</td></tr>
          <tr><td>XIVA</td><td>323A–323B</td><td>Tribunals</td></tr>
          <tr><td>XV</td><td>324–329A</td><td>Elections</td></tr>
          <tr><td>XVI</td><td>330–342A</td><td>Special Provisions relating to certain classes</td></tr>
          <tr><td>XVII</td><td>343–351</td><td>Official Language</td></tr>
          <tr><td>XVIII</td><td>352–360</td><td>Emergency Provisions</td></tr>
          <tr><td>XIX</td><td>361–367</td><td>Miscellaneous</td></tr>
          <tr><td>XX</td><td>368</td><td>Amendment of the Constitution</td></tr>
          <tr><td>XXI</td><td>369–392</td><td>Temporary, Transitional and Special Provisions</td></tr>
          <tr><td>XXII</td><td>393–395</td><td>Short title, Commencement, Authoritative Text in Hindi and Repeals</td></tr>
        </tbody>
      </table>
      <div class="cp-note remember">The Constitution began with <b>395 Articles in 22 Parts and 8 Schedules</b>. Later Amendments added lettered Parts (IVA, IXA, IXB, XIVA) and lettered Articles such as 21A and 51A, so today it has about <b>448 Articles in 25 Parts and 12 Schedules</b>.</div>
      <div class="cp-note trap"><b>Trap:</b> Part <u>XV</u> is Elections, Part <u>XVII</u> is Official Language. Part <u>XX</u> is Amendment (only Article 368), Part <u>XXI</u> is Temporary, Transitional and Special Provisions.</div>
      <div class="cp-mnemonic">Parts I–IV: <b>U</b>nion, <b>C</b>itizens, <b>R</b>ights, <b>D</b>irectives — “<b>U C R D</b>”.</div>
      <div class="cp-chips"><span>Parts</span><span>Article ranges</span><span>High-yield</span></div>
    `
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "Which Part of the Constitution deals with Citizenship?",
    options: ["Part I","Part II","Part III","Part IV"],
    correct: "2",
    exptext: "✅ Part II (Articles 5–11) deals with citizenship. 📌 Part I is the Union and its Territory (Articles 1–4). ❌ Part III is Fundamental Rights and Part IV is Directive Principles."
  },

  /* ─────────── 5 · QUESTION ─────────── */
  5: {
    questext: "Part IXA of the Constitution (Articles 243P to 243ZG) deals with —",
    options: ["The Panchayats","The Co-operative Societies","Tribunals","The Municipalities"],
    correct: "4",
    exptext: "✅ Part IXA = Municipalities. 📌 Part IX = Panchayats, Part IXB = Co-operative Societies, Part XIVA = Tribunals. ❌ Each wrong option is a neighbouring lettered Part, so match the letter carefully."
  },

  /* ─────────── 6 · QUESTION ─────────── */
  6: {
    questext: "Which one of the following Part–subject pairs is INCORRECT?",
    options: ["Part XII – Finance, Property, Contracts and Suits","Part XIV – Services under the Union and the States","Part XV – Official Language","Part XVIII – Emergency Provisions"],
    correct: "3",
    exptext: "✅ Part XV deals with Elections, so the pair is incorrect. 📌 Official Language is Part XVII (Articles 343–351). ❌ The other three pairs are correct."
  },

  /* ─────────── 7 · QUESTION ─────────── */
  7: {
    questext: "Consider the following statements: 1. Part XX of the Constitution consists of only one Article, Article 368. 2. Part XXII (Articles 393–395) deals with Short Title, Commencement, Authoritative Text in Hindi and Repeals. 3. Part XXI deals with Elections. Which of the statements given above are correct?",
    options: ["1 only","2 and 3 only","1 and 2 only","1, 2 and 3"],
    correct: "3",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Part XX = Amendment (Art. 368); Part XXII = Arts. 393–395. ❌ Elections are in Part XV; Part XXI covers Temporary, Transitional and Special Provisions."
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "The Constitution of India, at the time of its adoption, consisted of —",
    options: ["395 Articles, 20 Parts and 10 Schedules","448 Articles, 25 Parts and 12 Schedules","370 Articles, 22 Parts and 8 Schedules","395 Articles, 22 Parts and 8 Schedules"],
    correct: "4",
    exptext: "✅ Original: 395 Articles, 22 Parts, 8 Schedules. 📌 Today: about 448 Articles, 25 Parts and 12 Schedules. ❌ The 448/25/12 figures are the present count, not the original."
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "Articles 244 and 244A, dealing with Scheduled and Tribal Areas, are placed in which Part?",
    options: ["Part IX","Part X","Part XI","Part VIII"],
    correct: "2",
    exptext: "✅ Part X = Scheduled and Tribal Areas (Arts. 244–244A). 📌 Part XI is Union–State relations (245–263). ❌ Part IX is Panchayats and Part VIII is Union Territories."
  },

  /* ─────────── 10 · CONCEPT PAGE ─────────── */
  10: {
    type: "concept",
    icon: "⚖️",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Part III — Fundamental Rights (Articles 12–35)",
    html: `
      <p class="cp-lead"><b>Part III</b> lists the Fundamental Rights, the basic freedoms guaranteed against the State. Picture it as a <u>rulebook with six rights</u> plus a few supporting articles.</p>
      <div class="cp-divider">Part III at a glance</div>
      <table>
        <thead><tr><th>Right / group</th><th>Articles</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>Definition</td><td>12</td><td>Definition of ‘State’</td></tr>
          <tr><td>Safeguard</td><td>13</td><td>Laws inconsistent with or in derogation of the Fundamental Rights</td></tr>
          <tr><td>Right to Equality</td><td>14–18</td><td>Equality, no discrimination, equal public employment, no untouchability, no titles</td></tr>
          <tr><td>Right to Freedom</td><td>19–22</td><td>Speech etc., conviction, life and liberty, education, arrest and detention</td></tr>
          <tr><td>Right against Exploitation</td><td>23–24</td><td>Human trafficking, forced labour, child labour in factories</td></tr>
          <tr><td>Right to Freedom of Religion</td><td>25–28</td><td>Conscience, religious affairs, taxes for religion, religious instruction</td></tr>
          <tr><td>Cultural and Educational Rights</td><td>29–30</td><td>Minorities and their educational institutions</td></tr>
          <tr><td>Saving of certain Laws</td><td>31A–31C</td><td>Estates, validation of Acts, laws giving effect to Directive Principles</td></tr>
          <tr><td>Right to Constitutional Remedies</td><td>32</td><td>Remedies for enforcement of the rights in this Part</td></tr>
          <tr><td>Supporting articles</td><td>33–35</td><td>Forces, martial law, legislation to give effect to this Part</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Article by article</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">⚖️ Equality (14–18)</div><b>14</b> Equality before law · <b>15</b> No discrimination on grounds of religion, race, caste, sex or place of birth · <b>16</b> Equal opportunity in public employment · <b>17</b> Abolition of untouchability · <b>18</b> Abolition of titles</div>
        <div class="cp-card green"><div class="cp-card-title">🕊️ Freedom (19–22)</div><b>19</b> Protection of certain rights regarding freedom of speech etc. · <b>20</b> Protection in respect of conviction for offences · <b>21</b> Protection of life and personal liberty · <b>21A</b> Right to education · <b>22</b> Protection against arrest and detention</div>
        <div class="cp-card amber"><div class="cp-card-title">⛓️ Against Exploitation (23–24)</div><b>23</b> Prohibition of traffic in human beings and forced labour · <b>24</b> Prohibition of employment of children in factories etc.</div>
        <div class="cp-card violet"><div class="cp-card-title">🙏 Religion (25–28)</div><b>25</b> Freedom of conscience and free profession, practice and propagation of religion · <b>26</b> Freedom to manage religious affairs · <b>27</b> No taxes for promotion of any particular religion · <b>28</b> Freedom as to attendance at religious instruction or worship in certain educational institutions</div>
        <div class="cp-card teal"><div class="cp-card-title">🎓 Cultural & Educational (29–30)</div><b>29</b> Protection of interests of minorities · <b>30</b> Right of minorities to establish and administer educational institutions</div>
        <div class="cp-card pink"><div class="cp-card-title">🛡️ Remedies (32)</div><b>32</b> Remedies for enforcement of the rights conferred by Part III: the right to move the Supreme Court. Articles <b>33</b> (Forces), <b>34</b> (martial law) and <b>35</b> (legislation) support it.</div>
      </div>
      <div class="cp-note exam"><b>Article 19</b> protects six freedoms: speech and expression, assembling peaceably, forming associations, moving freely, residing and settling, and practising any profession or occupation.</div>
      <div class="cp-note remember"><b>Article 21A</b> makes education a Fundamental Right for children aged <u>6 to 14 years</u> (86th Amendment, 2002).</div>
      <div class="cp-note trap"><b>Trap:</b> The right to property is <u>no longer</u> a Fundamental Right. Article 31 was deleted by the 44th Amendment (1978); property is now a legal right under <b>Article 300A</b> in Part XII.</div>
      <div class="cp-mnemonic"><b>E</b>very <b>F</b>ree <b>E</b>lephant <b>R</b>eads <b>C</b>ute <b>R</b>hymes — Equality, Freedom, Exploitation, Religion, Cultural, Remedies.</div>
      <div class="cp-chips"><span>Part III</span><span>Articles 12–35</span><span>Very high-yield</span></div>
    `
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "Article 17 of the Constitution provides for —",
    options: ["Abolition of titles","Abolition of untouchability","Prohibition of traffic in human beings and forced labour","Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth"],
    correct: "2",
    exptext: "✅ Article 17 abolishes untouchability. 📌 Equality group: 14 law, 15 discrimination, 16 jobs, 17 untouchability, 18 titles. ❌ Titles is Art. 18, trafficking is Art. 23, discrimination is Art. 15."
  },

  /* ─────────── 12 · QUESTION ─────────── */
  12: {
    questext: "The Right to Education is a Fundamental Right under which Article?",
    options: ["Article 21","Article 45","Article 21A","Article 24"],
    correct: "3",
    exptext: "✅ Article 21A (children 6–14 years). 📌 Article 45 in Part IV is the Directive Principle on early childhood care. ❌ Art. 21 is life and personal liberty; Art. 24 bans child labour in factories."
  },

  /* ─────────── 13 · QUESTION ─────────── */
  13: {
    questext: "Which of the following is NOT covered under the Right to Freedom of Religion (Articles 25–28)?",
    options: ["Freedom of conscience and free profession, practice and propagation of religion","Freedom to manage religious affairs","Freedom as to payment of taxes for promotion of any particular religion","Protection of interests of minorities"],
    correct: "4",
    exptext: "✅ Protection of interests of minorities is Article 29, under Cultural and Educational Rights. 📌 Articles 25–28 are the religion group. ❌ The other three are Articles 25, 26 and 27."
  },

  /* ─────────── 14 · QUESTION ─────────── */
  14: {
    questext: "Consider the following statements: 1. Article 14 provides for equality before law. 2. Article 16 provides for equality of opportunity in matters of public employment. 3. Article 18 provides for abolition of untouchability. Which of the statements given above are correct?",
    options: ["1 and 2 only","2 and 3 only","1 and 3 only","1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Article 18 abolishes titles. ❌ Untouchability is abolished by Article 17."
  },

  /* ─────────── 15 · QUESTION ─────────── */
  15: {
    questext: "Article 32 of the Constitution deals with —",
    options: ["Power of Parliament to modify the rights in their application to the Forces","Remedies for enforcement of the rights conferred by Part III","Restriction on rights while martial law is in force in any area","Protection against arrest and detention in certain cases"],
    correct: "2",
    exptext: "✅ Article 32 is the right to Constitutional Remedies. 📌 Supporting articles: 33 Forces, 34 martial law, 35 legislation. ❌ Those, and Art. 22 (arrest and detention), are different articles."
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "Articles 31A, 31B and 31C are placed in Part III under the heading —",
    options: ["Right to Property","Right to Constitutional Remedies","Saving of certain Laws","Right to Equality"],
    correct: "3",
    exptext: "✅ They fall under “Saving of certain Laws”. 📌 Right to property was removed by the 44th Amendment and is now Art. 300A. ❌ Art. 32 is Remedies; Arts. 14–18 are Equality."
  },

  /* ─────────── 17 · QUESTION ─────────── */
  17: {
    questext: "Protection against arrest and detention in certain cases is provided under which Article?",
    options: ["Article 20","Article 21","Article 23","Article 22"],
    correct: "4",
    exptext: "✅ Article 22. 📌 Freedom group 19–22 ends with arrest and detention. ❌ Art. 20 is protection in respect of conviction; Art. 21 is life and personal liberty; Art. 23 is trafficking and forced labour."
  },

  /* ─────────── 18 · CONCEPT PAGE ─────────── */
  18: {
    type: "concept",
    icon: "🧭",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Part IV — Directive Principles of State Policy (Articles 36–51)",
    html: `
      <p class="cp-lead"><b>Part IV</b> gives the State a <u>to-do list for building a welfare society</u>. Courts cannot enforce these principles (Article 37), yet they guide every law and policy.</p>
      <div class="cp-stats"><div class="cp-stat"><b>36–51</b><span>Articles</span></div><div class="cp-stat"><b>39A</b><span>Free legal aid</span></div><div class="cp-stat"><b>43B</b><span>Co-operatives</span></div><div class="cp-stat"><b>44</b><span>Uniform civil code</span></div></div>
      <div class="cp-divider">Article by article</div>
      <table>
        <thead><tr><th>Article</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>36</td><td>Definition</td></tr>
          <tr><td>37</td><td>Application of the principles contained in this Part</td></tr>
          <tr><td>38</td><td>State to secure a social order for the promotion of welfare of the people</td></tr>
          <tr><td>39</td><td>Certain principles of policy to be followed by the State</td></tr>
          <tr><td>39A</td><td>Equal justice and free legal aid</td></tr>
          <tr><td>40</td><td>Organisation of village panchayats</td></tr>
          <tr><td>41</td><td>Right to work, to education and to public assistance in certain cases</td></tr>
          <tr><td>42</td><td>Just and humane conditions of work and maternity relief</td></tr>
          <tr><td>43</td><td>Living wage etc. for workers</td></tr>
          <tr><td>43A</td><td>Participation of workers in management of industries</td></tr>
          <tr><td>43B</td><td>Voluntary formation, autonomous functioning, democratic control and professional management of co-operative societies</td></tr>
          <tr><td>44</td><td>Uniform civil code for the citizens</td></tr>
          <tr><td>45</td><td>Early childhood care and education for children below the age of six years</td></tr>
          <tr><td>46</td><td>Promotion of educational and economic interests of Scheduled Castes, Scheduled Tribes and other weaker sections</td></tr>
          <tr><td>47</td><td>Duty of the State to raise the level of nutrition and the standard of living and to improve public health</td></tr>
          <tr><td>48</td><td>Organisation of agriculture and animal husbandry</td></tr>
          <tr><td>48A</td><td>Protection and improvement of environment and safeguarding of forests and wild life</td></tr>
          <tr><td>49</td><td>Protection of monuments and places and objects of national importance</td></tr>
          <tr><td>50</td><td>Separation of judiciary from executive</td></tr>
          <tr><td>51</td><td>Promotion of international peace and security</td></tr>
        </tbody>
      </table>
      <div class="cp-note exam">Articles <b>39A, 43A and 48A</b> were added by the 42nd Amendment (1976); Article <b>43B</b> by the 97th Amendment (2011). Article 45 now covers children below six years.</div>
      <div class="cp-note trap"><b>Trap:</b> Fundamental Rights are in <u>Part III</u> (enforceable by courts); Directive Principles are in <u>Part IV</u> (guidelines, not enforceable).</div>
      <div class="cp-mnemonic"><b>40</b> = panchayat village, <b>44</b> = one civil code for all, <b>50</b> = judges apart from the executive.</div>
      <div class="cp-chips"><span>Part IV</span><span>Articles 36–51</span><span>Welfare State</span></div>
    `
  },

  /* ─────────── 19 · QUESTION ─────────── */
  19: {
    questext: "Directive Principles of State Policy are contained in which Part and Articles of the Constitution?",
    options: ["Part III, Articles 12–35","Part IVA, Article 51A","Part V, Articles 52–151","Part IV, Articles 36–51"],
    correct: "4",
    exptext: "✅ Part IV, Articles 36–51. 📌 Part III is Fundamental Rights; Part IVA is Fundamental Duties. ❌ Part V is the Union (Articles 52–151)."
  },

  /* ─────────── 20 · QUESTION ─────────── */
  20: {
    questext: "The organisation of village panchayats is a Directive Principle under —",
    options: ["Article 40","Article 39","Article 41","Article 243"],
    correct: "1",
    exptext: "✅ Article 40. 📌 Constitutional status to panchayats came later through the 73rd Amendment (Part IX). ❌ Art. 39 sets policy principles; Art. 41 is right to work."
  },

  /* ─────────── 21 · QUESTION ─────────── */
  21: {
    questext: "Article 44 of the Constitution directs the State to secure —",
    options: ["Separation of judiciary from executive","A uniform civil code for the citizens","Equal justice and free legal aid","Organisation of agriculture and animal husbandry"],
    correct: "2",
    exptext: "✅ Article 44 = uniform civil code. 📌 Art. 50 = judiciary separate from executive. ❌ Free legal aid is Art. 39A; agriculture and animal husbandry is Art. 48."
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "Article 45 directs the State to provide early childhood care and education to children below the age of —",
    options: ["5 years","8 years","6 years","14 years"],
    correct: "3",
    exptext: "✅ Below six years. 📌 Compulsory education for 6–14 years is the Fundamental Right in Art. 21A. ❌ 14 years is the upper limit in Art. 21A, not in Art. 45."
  },

  /* ─────────── 23 · QUESTION ─────────── */
  23: {
    questext: "Participation of workers in the management of industries is provided under which Article?",
    options: ["Article 43","Article 43B","Article 41","Article 43A"],
    correct: "4",
    exptext: "✅ Article 43A (added by the 42nd Amendment). 📌 43 = living wage; 43B = co-operative societies. ❌ Art. 41 is right to work, education and public assistance."
  },

  /* ─────────── 24 · CONCEPT PAGE ─────────── */
  24: {
    type: "concept",
    icon: "📜",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Part IVA — Fundamental Duties (Article 51A)",
    html: `
      <p class="cp-lead">Rights come with responsibilities. <b>Part IVA</b> contains a single Article, <b>51A</b>, which lists the Fundamental Duties of every citizen. It makes <u>citizens’ duties a part of the basic law</u> of the land.</p>
      <div class="cp-stats"><div class="cp-stat"><b>IVA</b><span>Part</span></div><div class="cp-stat"><b>51A</b><span>Article</span></div><div class="cp-stat"><b>42nd</b><span>Amendment, 1976</span></div><div class="cp-stat"><b>11</b><span>Duties today</span></div></div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🏛️ Respect</div>Abide by the Constitution and respect its ideals, institutions, the National Flag and the National Anthem.</div>
        <div class="cp-card green"><div class="cp-card-title">🇮🇳 Unity</div>Uphold and protect the sovereignty, unity and integrity of India, and defend the country when called upon.</div>
        <div class="cp-card amber"><div class="cp-card-title">🤝 Harmony</div>Promote harmony and brotherhood, and value the rich heritage of our composite culture.</div>
        <div class="cp-card teal"><div class="cp-card-title">🌿 Environment</div>Protect and improve the natural environment, and have compassion for living creatures.</div>
        <div class="cp-card violet"><div class="cp-card-title">🔬 Temper</div>Develop scientific temper, humanism and the spirit of inquiry and reform.</div>
        <div class="cp-card pink"><div class="cp-card-title">👪 Education</div>A parent or guardian must provide opportunities for education to a child aged 6 to 14 years (the 11th duty, 86th Amendment, 2002).</div>
      </div>
      <div class="cp-note exam">Fundamental Duties were added by the <b>42nd Amendment (1976)</b> on the recommendation of the <b>Swaran Singh Committee</b>. They are <u>not directly enforceable</u> by courts.</div>
      <div class="cp-note trap"><b>Trap:</b> Part IV = Directive Principles (Articles 36–51). Part <u>IVA</u> = Fundamental Duties (Article 51A only).</div>
      <div class="cp-mnemonic"><b>51A</b> — “Fifty-One-<b>A</b>ction”: the duty to act for the nation.</div>
    `
  },

  /* ─────────── 25 · QUESTION ─────────── */
  25: {
    questext: "Fundamental Duties are placed in which Part and Article of the Constitution?",
    options: ["Part IVA, Article 51A","Part IV, Article 51","Part III, Article 51A","Part IVA, Article 51"],
    correct: "1",
    exptext: "✅ Part IVA, Article 51A. 📌 Part IV ends with Article 51 (international peace and security). ❌ Part III is Fundamental Rights; Article 51 belongs to Part IV, not IVA."
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "Fundamental Duties were incorporated in the Constitution by the 42nd Amendment on the recommendation of the —",
    options: ["Sarkaria Commission","Swaran Singh Committee","Balwant Rai Mehta Committee","Ashok Mehta Committee"],
    correct: "2",
    exptext: "✅ Swaran Singh Committee; the 42nd Amendment was passed in 1976. 📌 Fundamental Duties are in Article 51A. ❌ Sarkaria studied Centre–State relations; Balwant Rai Mehta and Ashok Mehta studied Panchayati Raj."
  },

  /* ─────────── 27 · CONCEPT PAGE ─────────── */
  27: {
    type: "concept",
    icon: "🏢",
    accent: "#ec4899",
    pauseTimer: true,
    title: "Part V — The Union: Chapter I, The Executive",
    html: `
      <p class="cp-lead"><b>Part V</b> (Articles 52–151) describes the Union Government. It has <u>five chapters</u>: Executive, Parliament, the President’s ordinance power, the Union Judiciary and the CAG. Chapter I, the <b>Executive</b>, covers the President, the Vice-President, the Council of Ministers and the Attorney General.</p>
      <div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/1.png" alt="Five chapters of Part V: Executive, Parliament, Ordinances, Judiciary, CAG" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table>
        <thead><tr><th>Article</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>52</td><td>The President of India</td></tr>
          <tr><td>53</td><td>Executive power of the Union</td></tr>
          <tr><td>54</td><td>Election of President</td></tr>
          <tr><td>61</td><td>Procedure for impeachment of the President</td></tr>
          <tr><td>63</td><td>The Vice-President of India</td></tr>
          <tr><td>64</td><td>The Vice-President to be ex-officio Chairman of the Council of States</td></tr>
          <tr><td>65</td><td>The Vice-President to act as President or discharge his functions during casual vacancies or absence of the President</td></tr>
          <tr><td>66</td><td>Election of Vice-President</td></tr>
          <tr><td>72</td><td>Power of President to grant pardons etc. and to suspend, remit or commute sentences in certain cases</td></tr>
          <tr><td>74</td><td>Council of Ministers to aid and advise the President</td></tr>
          <tr><td>76</td><td>Attorney General for India</td></tr>
        </tbody>
      </table>
      <div class="cp-note exam">Chapter I covers Articles <b>52–78</b>. Chapter II Parliament <b>79–122</b>, Chapter III <b>123</b>, Chapter IV Union Judiciary <b>124–147</b>, Chapter V CAG <b>148–151</b>.</div>
      <div class="cp-note trap"><b>Trap:</b> The Vice-President is the ex-officio Chairman of the <u>Council of States (Rajya Sabha)</u> under Article 64, not of the Lok Sabha.</div>
      <div class="cp-mnemonic"><b>52</b> President, <b>63</b> VP (the digits swap: 5-2 and 6-3 both add up to 7 and 9 — President first, VP next).</div>
    `
  },

  /* ─────────── 28 · QUESTION ─────────── */
  28: {
    questext: "The procedure for impeachment of the President is laid down in which Article?",
    options: ["Article 54","Article 63","Article 61","Article 72"],
    correct: "3",
    exptext: "✅ Article 61. 📌 Article 54 is the election of the President. ❌ Art. 63 is the Vice-President; Art. 72 is the pardoning power."
  },

  /* ─────────── 29 · QUESTION ─────────── */
  29: {
    questext: "Which one of the following Article–subject pairs is INCORRECT?",
    options: ["Article 54 – Election of President","Article 66 – Election of Vice-President","Article 72 – Power to grant pardons","Article 74 – Attorney General for India"],
    correct: "4",
    exptext: "✅ Article 74 is the Council of Ministers to aid and advise the President; the Attorney General is Art. 76. 📌 Remember 74 = ministers, 76 = AG. ❌ The other three pairs are correct."
  },

  /* ─────────── 30 · QUESTION ─────────── */
  30: {
    questext: "Consider the following statements: 1. Article 74 provides for a Council of Ministers to aid and advise the President. 2. Article 53 vests the executive power of the Union. 3. Article 76 provides for the Comptroller and Auditor-General. Which of the statements given above are correct?",
    options: ["1 and 2 only","2 and 3 only","1 and 3 only","1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Article 76 is the Attorney General for India. ❌ The CAG is covered by Articles 148–149."
  },

  /* ─────────── 31 · QUESTION ─────────── */
  31: {
    questext: "The Vice-President of India is the ex-officio Chairman of the Council of States under which Article?",
    options: ["Article 64","Article 63","Article 65","Article 89"],
    correct: "1",
    exptext: "✅ Article 64. 📌 Art. 63 creates the office of Vice-President. ❌ Art. 65 is acting as President; Art. 89 is the Chairman and Deputy Chairman of the Council of States."
  },

  /* ─────────── 32 · CONCEPT PAGE ─────────── */
  32: {
    type: "concept",
    icon: "🏛️",
    accent: "#06b6d4",
    pauseTimer: true,
    title: "Part V — The Union: Chapter II, Parliament (Articles 79–122)",
    html: `
      <p class="cp-lead"><b>Parliament</b> is where laws are made and the Government is held accountable. Chapter II is the <u>longest chapter of Part V</u>: it covers the two Houses, their presiding officers, privileges, Bills and money matters.</p>
      <div class="cp-divider">The two Houses and their officers</div>
      <table>
        <thead><tr><th>Article</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>79</td><td>Constitution of Parliament</td></tr>
          <tr><td>80</td><td>Composition of the Council of States (Rajya Sabha)</td></tr>
          <tr><td>81</td><td>Composition of the House of the People (Lok Sabha)</td></tr>
          <tr><td>83</td><td>Duration of Houses of Parliament</td></tr>
          <tr><td>84</td><td>Qualification for membership of Parliament</td></tr>
          <tr><td>85</td><td>Sessions of Parliament, prorogation and dissolution</td></tr>
          <tr><td>86</td><td>Right of President to address and send messages to Houses</td></tr>
          <tr><td>87</td><td>Special address by the President</td></tr>
          <tr><td>88</td><td>Rights of Ministers and Attorney General as respects Houses</td></tr>
          <tr><td>89</td><td>The Chairman and Deputy Chairman of the Council of States</td></tr>
          <tr><td>90</td><td>Vacation and resignation of, and removal from, the office of Deputy Chairman</td></tr>
          <tr><td>93</td><td>The Speaker and Deputy Speaker of the House of the People</td></tr>
          <tr><td>94</td><td>Vacation and resignation of, and removal from, the offices of Speaker and Deputy Speaker</td></tr>
          <tr><td>95</td><td>Power of the Deputy Speaker or other person to perform the duties of the office of, or to act as, Speaker</td></tr>
        </tbody>
      </table>
      <details class="cp-collapse">
        <summary>Members, privileges and procedure (Articles 98–106)</summary>
        <table>
        <thead><tr><th>Article</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>98</td><td>Secretariat of Parliament</td></tr>
          <tr><td>99</td><td>Oath or affirmation by members</td></tr>
          <tr><td>100</td><td>Voting in Houses, power of Houses to act notwithstanding vacancies, and quorum</td></tr>
          <tr><td>105</td><td>Powers, privileges etc. of the Houses of Parliament and of the members and committees thereof</td></tr>
          <tr><td>106</td><td>Salaries and allowances of members</td></tr>
        </tbody>
      </table>
      </details>
      <details class="cp-collapse">
        <summary>Bills and money matters (Articles 107–122)</summary>
        <table>
        <thead><tr><th>Article</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>107</td><td>Provisions as to introduction and passing of Bills</td></tr>
          <tr><td>108</td><td>Joint sitting of both Houses in certain cases</td></tr>
          <tr><td>109</td><td>Special procedure in respect of Money Bills</td></tr>
          <tr><td>110</td><td>Definition of ‘Money Bills’</td></tr>
          <tr><td>111</td><td>Assent to Bills</td></tr>
          <tr><td>112</td><td>Annual financial statement (Budget)</td></tr>
          <tr><td>113</td><td>Procedure in Parliament with respect to estimates</td></tr>
          <tr><td>114</td><td>Appropriation Bills</td></tr>
          <tr><td>115</td><td>Supplementary, additional or excess grants</td></tr>
          <tr><td>116</td><td>Votes on account, votes of credit and exceptional grants</td></tr>
          <tr><td>117</td><td>Special provisions as to financial Bills</td></tr>
          <tr><td>118</td><td>Rules of procedure</td></tr>
          <tr><td>119</td><td>Regulation by law of procedure in Parliament in relation to financial business</td></tr>
          <tr><td>120</td><td>Language to be used in Parliament</td></tr>
          <tr><td>121</td><td>Restriction on discussion in Parliament</td></tr>
          <tr><td>122</td><td>Courts not to inquire into proceedings of Parliament</td></tr>
        </tbody>
      </table>
      </details>
      <div class="cp-note trap"><b>Trap:</b> Article <u>109</u> is the <i>procedure</i> for Money Bills; Article <u>110</u> is the <i>definition</i>. Article <u>112</u> is the Budget, <u>114</u> Appropriation Bills and <u>116</u> votes on account.</div>
      <div class="cp-note exam">A <b>joint sitting</b> (Article 108) is used to resolve a deadlock on ordinary Bills.</div>
      <div class="cp-mnemonic"><b>79-80-81</b>: Parliament, Rajya Sabha, Lok Sabha — in that order.</div>
      <div class="cp-chips"><span>Articles 79–122</span><span>Money Bills</span><span>Joint sitting</span></div>
    `
  },

  /* ─────────── 33 · QUESTION ─────────── */
  33: {
    questext: "The composition of the House of the People (Lok Sabha) is provided in which Article?",
    options: ["Article 80","Article 81","Article 79","Article 83"],
    correct: "2",
    exptext: "✅ Article 81. 📌 79 Parliament, 80 Rajya Sabha, 81 Lok Sabha. ❌ Art. 80 is the Council of States; Art. 83 is the duration of Houses."
  },

  /* ─────────── 34 · QUESTION ─────────── */
  34: {
    questext: "Joint sitting of both Houses of Parliament in certain cases is provided in which Article?",
    options: ["Article 107","Article 109","Article 108","Article 110"],
    correct: "3",
    exptext: "✅ Article 108. 📌 Arts. 107–111 deal with Bills. ❌ Art. 107 is introduction and passing of Bills; 109 is the procedure for Money Bills; 110 defines Money Bills."
  },

  /* ─────────── 35 · QUESTION ─────────── */
  35: {
    questext: "The Annual Financial Statement (Budget) is provided in which Article?",
    options: ["Article 110","Article 114","Article 116","Article 112"],
    correct: "4",
    exptext: "✅ Article 112. 📌 Budget, estimates (113), Appropriation Bills (114). ❌ Art. 110 defines Money Bills; Art. 114 is Appropriation Bills; Art. 116 is votes on account."
  },

  /* ─────────── 36 · QUESTION ─────────── */
  36: {
    questext: "Arrange the following subjects in the increasing order of their Article numbers: 1. Appropriation Bills 2. Annual financial statement (Budget) 3. Definition of ‘Money Bills’ 4. Votes on account, votes of credit and exceptional grants",
    options: ["3, 2, 1, 4","2, 3, 1, 4","3, 1, 2, 4","2, 1, 3, 4"],
    correct: "1",
    exptext: "✅ 3 (Art. 110), 2 (Art. 112), 1 (Art. 114), 4 (Art. 116). 📌 Money Bills, Budget, Appropriation Bills, then votes on account. ❌ The other sequences swap the Budget with Money Bills or Appropriation Bills."
  },

  /* ─────────── 37 · QUESTION ─────────── */
  37: {
    questext: "The Speaker and Deputy Speaker of the House of the People are covered under which Article?",
    options: ["Article 93","Article 89","Article 94","Article 95"],
    correct: "1",
    exptext: "✅ Article 93. 📌 Art. 89 is the Chairman and Deputy Chairman of the Council of States. ❌ Arts. 94 and 95 deal with vacation, resignation, removal and acting duties."
  },

  /* ─────────── 38 · QUESTION ─────────── */
  38: {
    questext: "Which of the following does NOT fall under Chapter II (Parliament, Articles 79–122)?",
    options: ["Oath or affirmation by members","Power of the President to promulgate Ordinances","Joint sitting of both Houses","Definition of Money Bills"],
    correct: "2",
    exptext: "✅ The ordinance power is Article 123, Chapter III. 📌 Chapter II ends at Article 122. ❌ Oath (Art. 99), joint sitting (Art. 108) and Money Bills (Art. 110) are all in Chapter II."
  },

  /* ─────────── 39 · CONCEPT PAGE ─────────── */
  39: {
    type: "concept",
    icon: "⚖️",
    accent: "#f97316",
    pauseTimer: true,
    title: "Part V — The Union: Chapters III to V (Ordinances, Union Judiciary, CAG)",
    html: `
      <p class="cp-lead">The last three chapters of Part V are short but heavily tested: the <b>ordinance power</b> (Article 123), the <b>Supreme Court</b> (Articles 124–147) and the <b>Comptroller and Auditor-General</b> (Articles 148–151).</p>
      <div class="cp-divider">Chapter III — Legislative Powers of the President</div>
      <div class="cp-note info"><b>Article 123:</b> Power of the President to promulgate Ordinances during the recess of Parliament.</div>
      <div class="cp-divider">Chapter IV — The Union Judiciary</div>
      <table>
        <thead><tr><th>Article</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>124</td><td>Establishment and Constitution of the Supreme Court</td></tr>
          <tr><td>125</td><td>Salaries etc. of Judges</td></tr>
          <tr><td>126</td><td>Appointment of acting Chief Justice</td></tr>
          <tr><td>127</td><td>Appointment of ad hoc Judges</td></tr>
          <tr><td>128</td><td>Attendance of retired Judges at sittings of the Supreme Court</td></tr>
          <tr><td>129</td><td>Supreme Court to be a Court of record</td></tr>
          <tr><td>130</td><td>Seat of the Supreme Court</td></tr>
          <tr><td>131</td><td>Original jurisdiction of the Supreme Court</td></tr>
          <tr><td>132</td><td>Appellate jurisdiction in appeals from High Courts in certain cases</td></tr>
          <tr><td>133</td><td>Appellate jurisdiction in appeals from High Courts in civil matters</td></tr>
          <tr><td>134</td><td>Appellate jurisdiction in criminal matters</td></tr>
          <tr><td>134A</td><td>Certificate for appeal to the Supreme Court</td></tr>
          <tr><td>135</td><td>Jurisdiction and powers of the Federal Court under existing law exercisable by the Supreme Court</td></tr>
          <tr><td>136</td><td>Special leave to appeal by the Supreme Court</td></tr>
          <tr><td>137</td><td>Review of judgements or orders by the Supreme Court</td></tr>
          <tr><td>138</td><td>Enlargement of the jurisdiction of the Supreme Court</td></tr>
          <tr><td>141</td><td>Law declared by the Supreme Court to be binding on all Courts</td></tr>
          <tr><td>143</td><td>Power of the President to consult the Supreme Court</td></tr>
          <tr><td>144</td><td>Civil and judicial authorities to act in aid of the Supreme Court</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Chapter V — Comptroller and Auditor-General of India</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">Article 148</div>Comptroller and Auditor-General of India</div>
        <div class="cp-card green"><div class="cp-card-title">Article 149</div>Duties and powers of the Comptroller and Auditor-General</div>
      </div>
      <div class="cp-note trap"><b>Trap:</b> The <u>Attorney General</u> is in Chapter I (Article 76); the <u>CAG</u> is in Chapter V (Articles 148–149).</div>
      <div class="cp-mnemonic"><b>131</b> = original, <b>136</b> = special leave, <b>137</b> = review, <b>141</b> = binding law, <b>143</b> = advice to the President.</div>
    `
  },

  /* ─────────── 40 · QUESTION ─────────── */
  40: {
    questext: "The power of the President to promulgate Ordinances during the recess of Parliament is given in —",
    options: ["Article 124","Article 72","Article 123","Article 143"],
    correct: "3",
    exptext: "✅ Article 123 (Chapter III of Part V). 📌 It applies only when Parliament is not in session. ❌ Art. 124 establishes the Supreme Court; Art. 72 is pardon; Art. 143 is advice from the Supreme Court."
  },

  /* ─────────── 41 · QUESTION ─────────── */
  41: {
    questext: "Which Article declares the Supreme Court to be a Court of record?",
    options: ["Article 130","Article 131","Article 136","Article 129"],
    correct: "4",
    exptext: "✅ Article 129. 📌 Art. 130 is the seat of the Supreme Court. ❌ Art. 131 is original jurisdiction; Art. 136 is special leave to appeal."
  },

  /* ─────────── 42 · QUESTION ─────────── */
  42: {
    questext: "Special leave to appeal by the Supreme Court is provided in which Article?",
    options: ["Article 136","Article 132","Article 137","Article 141"],
    correct: "1",
    exptext: "✅ Article 136. 📌 Art. 137 is review of judgements. ❌ Art. 132 is appellate jurisdiction in certain High Court cases; Art. 141 makes Supreme Court law binding on all courts."
  },

  /* ─────────── 43 · QUESTION ─────────── */
  43: {
    questext: "Consider the following statements: 1. Article 124 provides for the establishment and constitution of the Supreme Court. 2. Article 143 provides for the power of the President to consult the Supreme Court. 3. Article 148 provides for the Attorney General of India. Which of the statements given above are correct?",
    options: ["1 and 2 only","2 and 3 only","1 and 3 only","1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Article 148 is the Comptroller and Auditor-General. ❌ The Attorney General is Article 76."
  },

  /* ─────────── 44 · QUESTION ─────────── */
  44: {
    questext: "Article 148 of the Constitution deals with —",
    options: ["Attorney General for India","Comptroller and Auditor-General of India","Election Commission","Public Service Commissions"],
    correct: "2",
    exptext: "✅ Article 148 = CAG (Chapter V of Part V). 📌 Article 149 gives his duties and powers. ❌ AG is Art. 76; Election Commission is Art. 324; Public Service Commissions are Art. 315."
  },

  /* ─────────── 45 · CONCEPT PAGE ─────────── */
  45: {
    type: "concept",
    icon: "🛡️",
    accent: "#84cc16",
    pauseTimer: true,
    title: "Lokpal",
    html: `
      <p class="cp-lead">The <b>Lokpal</b> is India’s <u>anti-corruption ombudsman</u> at the Centre. It can inquire into corruption cases against MPs, the Prime Minister (with certain exceptions), ministers and civil servants, and it is empowered to sanction prosecution.</p>
      <div class="cp-stats"><div class="cp-stat"><b>2013</b><span>Act passed</span></div><div class="cp-stat"><b>2019</b><span>First Lokpal</span></div><div class="cp-stat"><b>2024</b><span>New chairperson</span></div><div class="cp-stat"><b>8</b><span>Members sworn in 2019</span></div></div>
      <div class="cp-divider">Timeline</div>
      <ul class="cp-timeline">
        <li><b>17 and 18 December 2013</b> — the Lokpal and Lokayuktas Bill was passed by the Rajya Sabha (17th) and the Lok Sabha (18th); the Act received assent on 1 January 2014.</li>
        <li><b>23 March 2019</b> — President Ram Nath Kovind administered the oath to <b>Justice Pinaki Chandra Ghose</b> as the country’s <u>first Lokpal</u>. A selection committee led by the Prime Minister had recommended the names.</li>
        <li><b>27 March 2019</b> — all eight newly appointed members took the oath, administered by Justice Ghose.</li>
        <li><b>27 May 2022</b> — Justice Ghose’s tenure ended; judicial member Justice Pradip Kumar Mohanty acted as chairperson from 28 May 2022.</li>
        <li><b>10 March 2024</b> — President Draupadi Murmu administered the oath to <b>Justice Ajay Manikrao Khanwilkar</b>, a former Supreme Court judge, as chairperson.</li>
      </ul>
      <div class="cp-divider">Members appointed in 2024</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">⚖️ Judicial members</div>Justice Lingappa Narayana Swamy, Justice Sanjay Yadav, Justice Ritu Raj Awasthi</div>
        <div class="cp-card green"><div class="cp-card-title">🧑‍💼 Non-judicial members</div>Sushil Chandra, Pankaj Kumar, Ajay Tirkey</div>
      </div>
      <div class="cp-note info">Justice Ghose, aged 66, was a former Supreme Court judge (retired May 2017) and had served as a member of the National Human Rights Commission.</div>
      <div class="cp-note trap"><b>Trap:</b> Justice Ghose was the <u>first</u> Lokpal; Justice Khanwilkar took over in 2024. Do not mix the two names.</div>
      <div class="cp-mnemonic"><b>G</b>hose = <b>G</b>enesis (first, 2019); <b>K</b>hanwilkar = <b>K</b>ey successor (2024).</div>
    `
  },

  /* ─────────── 46 · QUESTION ─────────── */
  46: {
    questext: "Who was the first Lokpal of India?",
    options: ["Justice Ajay Manikrao Khanwilkar","Justice Pradip Kumar Mohanty","Justice Pinaki Chandra Ghose","Justice Ritu Raj Awasthi"],
    correct: "3",
    exptext: "✅ Justice Pinaki Chandra Ghose, sworn in on 23 March 2019 by President Ram Nath Kovind. 📌 He was a former Supreme Court judge and NHRC member. ❌ Khanwilkar became chairperson in 2024; Mohanty acted as chairperson in 2022; Awasthi is a judicial member."
  },

  /* ─────────── 47 · QUESTION ─────────── */
  47: {
    questext: "Who was administered the oath as chairperson of the Lokpal by President Draupadi Murmu on 10 March 2024?",
    options: ["Justice Pinaki Chandra Ghose","Justice Sanjay Yadav","Justice Pradip Kumar Mohanty","Justice Ajay Manikrao Khanwilkar"],
    correct: "4",
    exptext: "✅ Justice Ajay Manikrao Khanwilkar. 📌 He is a former Supreme Court judge. ❌ Ghose was the first chairperson (2019); Yadav is a judicial member; Mohanty was acting chairperson in 2022."
  },

  /* ─────────── 48 · QUESTION ─────────── */
  48: {
    questext: "The Lokpal and Lokayuktas Bill was passed by the Rajya Sabha and the Lok Sabha respectively on —",
    options: ["17 and 18 December 2013","18 and 17 December 2013","17 and 18 December 2011","17 and 18 December 2014"],
    correct: "1",
    exptext: "✅ Rajya Sabha on 17 December 2013 and Lok Sabha on 18 December 2013. 📌 The Rajya Sabha went first. ❌ The sequence is not reversed, and the years 2011 and 2014 are wrong."
  },

  /* ─────────── 49 · QUESTION ─────────── */
  49: {
    questext: "Which of the following was appointed as a Non-Judicial member of the Lokpal in 2024?",
    options: ["Sanjay Yadav","Sushil Chandra","Lingappa Narayana Swamy","Ritu Raj Awasthi"],
    correct: "2",
    exptext: "✅ Sushil Chandra. 📌 Non-judicial members: Sushil Chandra, Pankaj Kumar, Ajay Tirkey. ❌ Sanjay Yadav, Lingappa Narayana Swamy and Ritu Raj Awasthi are judicial members."
  },

  /* ─────────── 50 · CONCEPT PAGE ─────────── */
  50: {
    type: "concept",
    icon: "🌍",
    accent: "#a855f7",
    pauseTimer: true,
    title: "Lokayukta",
    html: `
      <p class="cp-lead">The idea of an <b>Ombudsman</b>, an independent officer who hears citizens’ complaints against officials, is <u>typically Scandinavian</u>. India’s state-level version is the <b>Lokayukta</b>.</p>
      <div class="cp-divider">Where did the Ombudsman begin?</div>
      <table>
        <thead><tr><th>Country</th><th>Year</th></tr></thead>
        <tbody>
          <tr><td>Sweden</td><td>1809 (the first)</td></tr>
          <tr><td>Finland</td><td>1919</td></tr>
          <tr><td>Denmark</td><td>1955</td></tr>
          <tr><td>Norway</td><td>1962</td></tr>
          <tr><td>New Zealand</td><td>1962</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Lokayukta in India</div>
      <div class="cp-grid c2">
        <div class="cp-card amber"><div class="cp-card-title">📜 The law</div><b>Maharashtra</b> was the first state to introduce the Lokayukta and Upa-Lokayuktas through the Act of <b>1971</b>.</div>
        <div class="cp-card blue"><div class="cp-card-title">🏛️ The origin</div>It followed the recommendations of the <b>Administrative Reforms Commission</b> headed by <b>Morarji Desai</b> in <b>1966</b>.</div>
      </div>
      <div class="cp-note remember">The Maharashtra Lokayukta institution came into being on <b>25 October 1972</b>.</div>
      <div class="cp-note trap"><b>Trap:</b> The Lokpal is at the <u>Centre</u>; the Lokayukta is for the <u>States</u>.</div>
      <div class="cp-mnemonic"><b>1809</b> Sweden → <b>1966</b> ARC → <b>1971</b> Act → <b>1972</b> Maharashtra starts.</div>
    `
  },

  /* ─────────── 51 · QUESTION ─────────── */
  51: {
    questext: "The institution of Ombudsman has been in existence since 1809 in —",
    options: ["Finland","Denmark","Sweden","Norway"],
    correct: "3",
    exptext: "✅ Sweden (1809). 📌 Finland 1919, Denmark 1955, Norway and New Zealand 1962. ❌ All the other options adopted it much later."
  },

  /* ─────────── 52 · QUESTION ─────────── */
  52: {
    questext: "Which state was the first to introduce the Lokayukta and Upa-Lokayuktas through an Act in 1971?",
    options: ["Karnataka","Rajasthan","Gujarat","Maharashtra"],
    correct: "4",
    exptext: "✅ Maharashtra (Act of 1971; institution functional from 25 October 1972). 📌 It followed the Administrative Reforms Commission recommendations. ❌ Karnataka, Rajasthan and Gujarat set up their Lokayuktas later."
  },

  /* ─────────── 53 · QUESTION ─────────── */
  53: {
    questext: "The Administrative Reforms Commission (1966), whose recommendations led to the concept of the Lokayukta, was headed by —",
    options: ["Morarji Desai","Ashok Mehta","Balwant Rai Mehta","Sardar Swaran Singh"],
    correct: "1",
    exptext: "✅ Morarji Desai. 📌 The Commission’s report led to the Lokayukta idea in the states. ❌ Ashok Mehta and Balwant Rai Mehta are linked to Panchayati Raj committees; Swaran Singh to Fundamental Duties."
  },

  /* ─────────── 54 · CONCEPT PAGE ─────────── */
  54: {
    type: "concept",
    icon: "🏘️",
    accent: "#eab308",
    pauseTimer: true,
    title: "Parts VI to XI — States, Territories, Local Government and Union–State Relations",
    html: `
      <p class="cp-lead">After the Union, the Constitution turns to the <b>States</b>, the <b>Union Territories</b> and <b>local self-government</b>. Part IX, IXA and IXB are the three “<u>local-level</u>” Parts added by Amendments.</p>
      <table>
        <thead><tr><th>Part</th><th>Articles</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>VI</td><td>152–237</td><td>The States: the Executive, the State Legislature, the High Courts and Subordinate Courts</td></tr>
          <tr><td>VII</td><td>238</td><td>States in Part B of the First Schedule (repealed)</td></tr>
          <tr><td>VIII</td><td>239–242</td><td>The Union Territories</td></tr>
          <tr><td>IX</td><td>243–243O</td><td>The Panchayats</td></tr>
          <tr><td>IXA</td><td>243P–243ZG</td><td>The Municipalities</td></tr>
          <tr><td>IXB</td><td>243ZH–243ZT</td><td>The Co-operative Societies</td></tr>
          <tr><td>X</td><td>244–244A</td><td>The Scheduled and Tribal Areas</td></tr>
          <tr><td>XI</td><td>245–263</td><td>Relations between the Union and the States</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Quick facts to remember</div>
      <div class="cp-grid c2">
        <div class="cp-card green"><div class="cp-card-title">🏘️ Panchayats and Municipalities</div>Parts IX and IXA came through the <b>73rd and 74th Amendments</b>. Under <b>Article 243ZD</b> the <u>District Planning Committee</u> is constituted.</div>
        <div class="cp-card amber"><div class="cp-card-title">🤝 Co-operative Societies</div>Part IXB, under <b>Article 243ZJ</b>: the maximum number of directors of a co-operative society may be <b>21</b>.</div>
      </div>
      <div class="cp-note exam">Part VI covers the whole state-level government: Governor and Council of Ministers, the Legislature, High Courts (Articles 214–231) and Subordinate Courts (233–237).</div>
      <div class="cp-note trap"><b>Trap:</b> Part VII is <u>repealed</u>, so Part VIII (Union Territories) follows Part VI. Do not look for a living Part VII.</div>
      <div class="cp-mnemonic"><b>IX-IXA-IXB</b> = Panchayat, Municipality, Co-operative — rural, urban, economic.</div>
    `
  },

  /* ─────────── 55 · QUESTION ─────────── */
  55: {
    questext: "Articles 152–237 of Part VI deal with —",
    options: ["The Union Territories","The Government at the State level: Executive, Legislature, High Courts and Subordinate Courts","The Panchayats and Municipalities","Relations between the Union and the States"],
    correct: "2",
    exptext: "✅ Part VI = The States. 📌 It covers Governor, State Legislature, High Courts and Subordinate Courts. ❌ Union Territories are Part VIII; local bodies are Parts IX, IXA; Union–State relations are Part XI."
  },

  /* ─────────── 56 · QUESTION ─────────── */
  56: {
    questext: "The District Planning Committee is constituted under which Article?",
    options: ["Article 243P","Article 243ZH","Article 243ZD","Article 243ZJ"],
    correct: "3",
    exptext: "✅ Article 243ZD, in Part IXA. 📌 Part IXA covers Municipalities (243P–243ZG). ❌ Art. 243P is the definitions article of Part IXA; 243ZH begins Part IXB; 243ZJ limits co-operative directors."
  },

  /* ─────────── 57 · QUESTION ─────────── */
  57: {
    questext: "According to Article 243ZJ, the maximum number of directors of a co-operative society may be —",
    options: ["11","15","25","21"],
    correct: "4",
    exptext: "✅ 21 directors. 📌 Part IXB deals with Co-operative Societies (Arts. 243ZH–243ZT). ❌ 11, 15 and 25 are not the constitutional limit."
  },

  /* ─────────── 58 · QUESTION ─────────── */
  58: {
    questext: "Relations between the Union and the States are dealt with in which Part of the Constitution?",
    options: ["Part XI","Part X","Part XII","Part XIII"],
    correct: "1",
    exptext: "✅ Part XI (Articles 245–263). 📌 Part XII is Finance, Property, Contracts and Suits. ❌ Part X is Scheduled and Tribal Areas; Part XIII is Trade and Commerce."
  },

  /* ─────────── 59 · CONCEPT PAGE ─────────── */
  59: {
    type: "concept",
    icon: "💰",
    accent: "#10b981",
    pauseTimer: true,
    title: "Parts XII to XIVA — Finance, Trade, Services and Tribunals",
    html: `
      <p class="cp-lead">These Parts explain <u>how money, trade and government jobs are organised</u> across the Union and the States, and where Tribunals fit in.</p>
      <table>
        <thead><tr><th>Part</th><th>Articles</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>XII</td><td>264–300A</td><td>Finance, Property, Contracts and Suits: distribution of revenue between the Union and States, Finance Commission, borrowing, property, contracts, rights, liabilities, obligations and suits</td></tr>
          <tr><td>XIII</td><td>301–307</td><td>Trade, Commerce and Intercourse within the Territory of India</td></tr>
          <tr><td>XIV</td><td>308–323</td><td>Services under the Union and the States</td></tr>
          <tr><td>XIVA</td><td>323A–323B</td><td>Tribunals</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Part XII — two Articles to know</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🧾 Taxes (268 and 270)</div><b>Art. 268:</b> duties levied by the Union but collected and appropriated by the States. <b>Art. 270:</b> taxes levied and collected by the Union and distributed between the Union and the States.</div>
        <div class="cp-card red"><div class="cp-card-title">🏠 Property (300A)</div><b>Article 300A</b>: Right to Property, a <u>legal right</u>, not a Fundamental Right.</div>
      </div>
      <div class="cp-divider">Part XIV — Services under the Union and the States</div>
      <table>
        <thead><tr><th>Article</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>309</td><td>Recruitment and conditions of service of persons serving the Union or a State</td></tr>
          <tr><td>310</td><td>Tenure of office of persons serving the Union or a State</td></tr>
          <tr><td>311</td><td>Dismissal, removal or reduction in rank of persons employed in civil capacities under the Union or a State</td></tr>
          <tr><td>312</td><td>All-India Services</td></tr>
          <tr><td>315</td><td>Public Service Commissions for the Union and for the States</td></tr>
          <tr><td>316</td><td>Appointment and term of office of members</td></tr>
          <tr><td>317</td><td>Removal and suspension of a member of a Public Service Commission</td></tr>
          <tr><td>318</td><td>Power to make regulations as to conditions of service of members and staff of the Commission</td></tr>
          <tr><td>320</td><td>Functions of Public Service Commissions</td></tr>
          <tr><td>321</td><td>Power to extend functions of Public Service Commissions</td></tr>
          <tr><td>323</td><td>Reports of Public Service Commissions</td></tr>
        </tbody>
      </table>
      <div class="cp-note trap"><b>Trap:</b> Tribunals (323A–323B) sit in their own Part <u>XIVA</u>, not in Part XIV.</div>
      <div class="cp-mnemonic"><b>309</b> hire, <b>310</b> tenure, <b>311</b> sack-protection, <b>312</b> All-India, <b>315</b> Commissions.</div>
    `
  },

  /* ─────────── 60 · QUESTION ─────────── */
  60: {
    questext: "The Right to Property is today a legal right under which Article?",
    options: ["Article 31","Article 300A","Article 19(1)(f)","Article 21"],
    correct: "2",
    exptext: "✅ Article 300A (Part XII). 📌 Article 31 was deleted by the 44th Amendment. ❌ Art. 31 and Art. 19(1)(f) no longer give a Fundamental Right to property; Art. 21 is life and personal liberty."
  },

  /* ─────────── 61 · QUESTION ─────────── */
  61: {
    questext: "Dismissal, removal or reduction in rank of persons employed in civil capacities under the Union or a State is dealt with in —",
    options: ["Article 309","Article 310","Article 311","Article 312"],
    correct: "3",
    exptext: "✅ Article 311. 📌 It protects civil servants from arbitrary dismissal. ❌ Art. 309 is recruitment and service conditions; Art. 310 is tenure; Art. 312 is All-India Services."
  },

  /* ─────────── 62 · QUESTION ─────────── */
  62: {
    questext: "Public Service Commissions for the Union and for the States are provided for in —",
    options: ["Article 312","Article 320","Article 323","Article 315"],
    correct: "4",
    exptext: "✅ Article 315. 📌 Art. 320 lists their functions. ❌ Art. 312 is All-India Services; Art. 323 is reports of the Commissions."
  },

  /* ─────────── 63 · QUESTION ─────────── */
  63: {
    questext: "Tribunals (Articles 323A and 323B) form which Part of the Constitution?",
    options: ["Part XIVA","Part XIV","Part XV","Part XIII"],
    correct: "1",
    exptext: "✅ Part XIVA. 📌 Part XIV is Services, directly before it. ❌ Part XV is Elections; Part XIII is Trade and Commerce."
  },

  /* ─────────── 64 · CONCEPT PAGE ─────────── */
  64: {
    type: "concept",
    icon: "🗳️",
    accent: "#f43f5e",
    pauseTimer: true,
    title: "Parts XV to XVIII — Elections, Special Provisions, Language and Emergency",
    html: `
      <p class="cp-lead">This group covers <b>who runs elections</b>, <b>special provisions for certain classes</b>, <b>official languages</b> and the <u>emergency powers</u> of the Union.</p>
      <table>
        <thead><tr><th>Part</th><th>Articles</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>XV</td><td>324–329A</td><td>Elections</td></tr>
          <tr><td>XVI</td><td>330–342A</td><td>Special Provisions relating to certain classes</td></tr>
          <tr><td>XVII</td><td>343–351</td><td>Official Language</td></tr>
          <tr><td>XVIII</td><td>352–360</td><td>Emergency Provisions</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Part XV — Elections</div>
      <table>
        <thead><tr><th>Article</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>324</td><td>Superintendence, direction and control of elections to be vested in an Election Commission</td></tr>
          <tr><td>325</td><td>No person to be ineligible for inclusion in, or to claim to be included in, a special electoral roll on grounds of religion, race, caste or sex</td></tr>
          <tr><td>326</td><td>Elections to the House of the People and the State Legislative Assemblies on the basis of adult suffrage</td></tr>
          <tr><td>327</td><td>Power of Parliament to make provision with respect to elections to legislatures</td></tr>
          <tr><td>328</td><td>Power of the Legislature of a State to make provision with respect to elections to such Legislature</td></tr>
          <tr><td>329</td><td>Bar to interference by Courts in electoral matters</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Part XVIII — Emergency Provisions</div>
      <div class="cp-grid c3">
        <div class="cp-card red"><div class="cp-card-title">🚨 Article 352</div>Proclamation of Emergency</div>
        <div class="cp-card amber"><div class="cp-card-title">🏛️ Article 356</div>Failure of constitutional machinery in a State (President’s Rule)</div>
        <div class="cp-card violet"><div class="cp-card-title">💰 Article 360</div>Proclamation of Financial Emergency</div>
      </div>
      <div class="cp-note exam">Election Commission = <b>Article 324</b>; adult suffrage = <b>Article 326</b>; Emergency = <b>352</b>; Financial Emergency = <b>360</b>.</div>
      <div class="cp-note trap"><b>Trap:</b> Part XVII (343–351) is the Official <u>Language</u> Part, while Part XVIII (352–360) is Emergency.</div>
      <div class="cp-mnemonic"><b>324</b> = Commission calls the shots; <b>352</b> national, <b>356</b> state, <b>360</b> money.</div>
    `
  },

  /* ─────────── 65 · QUESTION ─────────── */
  65: {
    questext: "Superintendence, direction and control of elections is vested in the Election Commission under which Article?",
    options: ["Article 326","Article 324","Article 325","Article 329"],
    correct: "2",
    exptext: "✅ Article 324. 📌 Part XV covers Articles 324–329A. ❌ Art. 325 is no ineligibility on electoral roll; Art. 326 is adult suffrage; Art. 329 is bar to court interference."
  },

  /* ─────────── 66 · QUESTION ─────────── */
  66: {
    questext: "Article 329 of the Constitution is concerned with —",
    options: ["Power of Parliament to make provision with respect to elections to legislatures","Elections on the basis of adult suffrage","Bar to interference by Courts in electoral matters","Superintendence, direction and control of elections"],
    correct: "3",
    exptext: "✅ Article 329 bars courts from interfering in electoral matters. 📌 Arts. 327 and 328 are the powers of Parliament and State Legislatures. ❌ Adult suffrage is Art. 326; control of elections is Art. 324."
  },

  /* ─────────── 67 · QUESTION ─────────── */
  67: {
    questext: "Proclamation of Financial Emergency is provided in which Article?",
    options: ["Article 352","Article 356","Article 359","Article 360"],
    correct: "4",
    exptext: "✅ Article 360. 📌 Part XVIII covers Articles 352–360. ❌ Art. 352 is Proclamation of Emergency; Art. 356 is failure of constitutional machinery in a State; Art. 359 is suspension of enforcement of rights during emergencies."
  },

  /* ─────────── 68 · QUESTION ─────────── */
  68: {
    questext: "Articles 343 to 351 of the Constitution deal with —",
    options: ["Official Language","Elections","Emergency Provisions","Special provisions relating to certain classes"],
    correct: "1",
    exptext: "✅ Official Language (Part XVII). 📌 Part XVIII is Emergency (352–360). ❌ Elections are Part XV; special provisions for classes are Part XVI."
  },

  /* ─────────── 69 · CONCEPT PAGE ─────────── */
  69: {
    type: "concept",
    icon: "🔚",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Parts XIX to XXII — Miscellaneous, Amendment and Special Provisions",
    html: `
      <p class="cp-lead">The last four Parts hold the <u>odds and ends</u>, the <b>amendment rule</b> (Article 368) and the <b>temporary and special provisions</b>, including Article 370.</p>
      <table>
        <thead><tr><th>Part</th><th>Articles</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>XIX</td><td>361–367</td><td>Miscellaneous</td></tr>
          <tr><td>XX</td><td>368</td><td>Amendment of the Constitution</td></tr>
          <tr><td>XXI</td><td>369–392</td><td>Temporary, Transitional and Special Provisions</td></tr>
          <tr><td>XXII</td><td>393–395</td><td>Short title, Commencement, Authoritative Text in Hindi and Repeals</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Part XIX — Miscellaneous</div>
      <table>
        <thead><tr><th>Article</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>361A</td><td>Protection of publication of proceedings of Parliament and State Legislatures</td></tr>
          <tr><td>363</td><td>Bar to interference by courts in disputes arising out of certain treaties, agreements etc.</td></tr>
          <tr><td>363A</td><td>Recognition granted to Rulers of Indian States to cease and privy purses to be abolished</td></tr>
          <tr><td>364</td><td>Special provisions as to major ports and aerodromes</td></tr>
          <tr><td>365</td><td>Effect of failure to comply with, or to give effect to, directions given by the Union</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Article 370 — Jammu and Kashmir</div>
      <div class="cp-grid c2">
        <div class="cp-card red"><div class="cp-card-title">🗓️ 5 August 2019</div>Using Clause (3) of Article 370, the President, on the recommendation of Parliament, declared that all clauses of Article 370 cease to operate except Clause (1), which now makes <u>all provisions of the Constitution apply to Jammu and Kashmir</u> without modification.</div>
        <div class="cp-card blue"><div class="cp-card-title">🗺️ 31 October 2019</div>The Jammu and Kashmir Reorganisation Act, 2019 came into force, creating the Union Territories of Jammu and Kashmir and Ladakh. In December 2023 the Supreme Court upheld the 2019 move.</div>
      </div>
      <div class="cp-note trap"><b>Trap:</b> Part XX has <u>only one Article</u> (368). Article 363A abolished <u>privy purses</u>; it is easy to confuse with 363.</div>
      <div class="cp-mnemonic"><b>368</b> = change (Amend); <b>370</b> = the old special status; <b>393–395</b> = title and finish.</div>
    `
  },

  /* ─────────── 70 · QUESTION ─────────── */
  70: {
    questext: "Article 368, dealing with the Amendment of the Constitution, is placed in which Part?",
    options: ["Part XXI","Part XX","Part XIX","Part XVIII"],
    correct: "2",
    exptext: "✅ Part XX, which has only Article 368. 📌 Part XXI covers temporary and special provisions. ❌ Part XIX is Miscellaneous; Part XVIII is Emergency."
  },

  /* ─────────── 71 · QUESTION ─────────── */
  71: {
    questext: "Part XXI of the Constitution (Articles 369–392) deals with —",
    options: ["Short title, Commencement, Authoritative Text in Hindi and Repeals","Miscellaneous matters","Temporary, Transitional and Special Provisions","Amendment of the Constitution"],
    correct: "3",
    exptext: "✅ Part XXI = Temporary, Transitional and Special Provisions. 📌 Article 370 is in this Part. ❌ Part XXII is short title and repeals; Part XIX is Miscellaneous; Part XX is Amendment."
  },

  /* ─────────── 72 · QUESTION ─────────── */
  72: {
    questext: "Recognition granted to Rulers of Indian States to cease, and privy purses to be abolished, is in which Article?",
    options: ["Article 363","Article 364","Article 365","Article 363A"],
    correct: "4",
    exptext: "✅ Article 363A (Part XIX). 📌 Art. 363 is bar to court interference in treaty disputes. ❌ Art. 364 is major ports and aerodromes; Art. 365 is failure to comply with Union directions."
  },

  /* ─────────── 73 · QUESTION ─────────── */
  73: {
    questext: "In exercise of the powers under Clause (3) of Article 370, the President declared that Article 370 would cease to operate (except as restated) from —",
    options: ["5 August 2019","31 October 2019","5 August 2020","26 January 2020"],
    correct: "1",
    exptext: "✅ 5 August 2019. 📌 The Reorganisation Act followed on 31 October 2019. ❌ 31 October 2019 is the date of reorganisation, not the declaration; the other dates are wrong."
  },

  /* ─────────── 74 · CONCEPT PAGE ─────────── */
  74: {
    type: "concept",
    icon: "📋",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "5. Schedules of Indian Constitution (First to Sixth Schedule)",
    html: `
      <p class="cp-lead">A <b>Schedule</b> is a list or table attached at the end of the Constitution. The Constitution began with <b>eight</b> Schedules; four more were added later, so there are <u>twelve</u> today.</p>
      <table>
        <thead><tr><th>Schedule</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>1st</td><td>28 States and 8 Union Territories with territorial demarcations</td></tr>
          <tr><td>2nd</td><td>Salaries and emoluments (see below)</td></tr>
          <tr><td>3rd</td><td>Forms of oaths and affirmations of members of legislatures, ministers and judges</td></tr>
          <tr><td>4th</td><td>Allocation of seats to States and Union Territories in the Rajya Sabha</td></tr>
          <tr><td>5th</td><td>Administration and control of Scheduled Areas and Scheduled Tribes</td></tr>
          <tr><td>6th</td><td>Administration of tribal areas of Assam, Meghalaya, Tripura and Mizoram</td></tr>
        </tbody>
      </table>
      <details class="cp-collapse">
        <summary>Inside the Second Schedule</summary>
        <table>
        <thead><tr><th>Part</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>A</td><td>Salary and emoluments of the President and the Governors of the States</td></tr>
          <tr><td>B</td><td>Omitted</td></tr>
          <tr><td>C</td><td>Salary and emoluments of the Speaker and Deputy Speaker, or Chairman and Vice-Chairman, of the Lok Sabha, Rajya Sabha and State Legislative Assemblies or Councils</td></tr>
          <tr><td>D</td><td>Salary and emoluments of the Judges of the Supreme Court and High Courts</td></tr>
          <tr><td>E</td><td>Salary and emoluments of the Comptroller and Auditor-General of India</td></tr>
        </tbody>
      </table>
      </details>
      <div class="cp-note trap"><b>Trap:</b> The <u>Fifth</u> Schedule covers Scheduled Areas and Scheduled Tribes in general; the <u>Sixth</u> Schedule covers tribal areas of four North-Eastern states.</div>
      <div class="cp-mnemonic"><b>1</b> States, <b>2</b> Salaries, <b>3</b> Oaths, <b>4</b> Rajya Sabha seats, <b>5</b> Scheduled Areas, <b>6</b> North-East tribes.</div>
      <div class="cp-chips"><span>Schedules</span><span>1st to 6th</span><span>Static GK</span></div>
    `
  },

  /* ─────────── 75 · QUESTION ─────────── */
  75: {
    questext: "The First Schedule of the Constitution lists —",
    options: ["Salaries and emoluments of high constitutional officers","The States and Union Territories with their territorial demarcations","Forms of oaths and affirmations","Allocation of seats in the Rajya Sabha"],
    correct: "2",
    exptext: "✅ First Schedule = States and Union Territories. 📌 Today it lists 28 States and 8 Union Territories. ❌ Salaries are the 2nd Schedule; oaths the 3rd; Rajya Sabha seats the 4th."
  },

  /* ─────────── 76 · QUESTION ─────────── */
  76: {
    questext: "Forms of oaths and affirmations for members of legislatures, ministers and judges are given in the —",
    options: ["Second Schedule","Fourth Schedule","Third Schedule","Fifth Schedule"],
    correct: "3",
    exptext: "✅ Third Schedule. 📌 Second Schedule is salaries. ❌ Fourth is Rajya Sabha seats; Fifth is Scheduled Areas and Scheduled Tribes."
  },

  /* ─────────── 77 · QUESTION ─────────── */
  77: {
    questext: "The allocation of seats to States and Union Territories in the Rajya Sabha is provided in the —",
    options: ["Second Schedule","Sixth Schedule","Seventh Schedule","Fourth Schedule"],
    correct: "4",
    exptext: "✅ Fourth Schedule. 📌 It fixes each State’s Rajya Sabha seats. ❌ Second is salaries; Sixth is tribal areas; Seventh is the distribution of powers."
  },

  /* ─────────── 78 · QUESTION ─────────── */
  78: {
    questext: "The administration of tribal areas in Assam, Meghalaya, Tripura and Mizoram is provided in the —",
    options: ["Sixth Schedule","Fifth Schedule","Second Schedule","Seventh Schedule"],
    correct: "1",
    exptext: "✅ Sixth Schedule. 📌 The Fifth Schedule deals with Scheduled Areas and Scheduled Tribes in general. ❌ Second is salaries; Seventh is the Union, State and Concurrent Lists."
  },

  /* ─────────── 79 · QUESTION ─────────── */
  79: {
    questext: "Which of the following is NOT covered by the Second Schedule?",
    options: ["Salary and emoluments of the President and Governors","Salary and emoluments of the Chief Election Commissioner","Salary and emoluments of the Speaker and Deputy Speaker","Salary and emoluments of the Judges of the Supreme Court and High Courts"],
    correct: "2",
    exptext: "✅ The Second Schedule has no part for the Chief Election Commissioner. 📌 Parts: A President and Governors, C presiding officers, D judges, E CAG (B omitted). ❌ The other three are covered."
  },

  /* ─────────── 80 · CONCEPT PAGE ─────────── */
  80: {
    type: "concept",
    icon: "📋",
    accent: "#d946ef",
    pauseTimer: true,
    title: "5. Schedules of Indian Constitution (Seventh to Twelfth Schedule)",
    html: `
      <p class="cp-lead">The second half of the Schedules deals with <u>power-sharing, languages, defection and local government</u>. The <b>Ninth to Twelfth</b> Schedules were added after the Constitution came into force.</p>
      <table>
        <thead><tr><th>Schedule</th><th>Subject</th></tr></thead>
        <tbody>
          <tr><td>7th</td><td>Distribution of power between the Union and the State Governments (Union List, State List and Concurrent List)</td></tr>
          <tr><td>8th</td><td>Description of 22 languages recognised by the Constitution</td></tr>
          <tr><td>9th</td><td>Validation of certain Acts and Regulations</td></tr>
          <tr><td>10th</td><td>Provisions as to disqualification on ground of defection (Anti-defection Law, introduced by the 52nd Amendment Act and strengthened by the 91st Amendment in 2003)</td></tr>
          <tr><td>11th</td><td>Powers, authority and responsibilities of Panchayats: 29 subjects (73rd Amendment)</td></tr>
          <tr><td>12th</td><td>Powers, authority and responsibilities of Municipalities: 18 subjects (74th Amendment)</td></tr>
        </tbody>
      </table>
      <div class="cp-divider">Added after adoption</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🆕 Four additions</div>The original Constitution had 8 Schedules. The <b>9th, 10th, 11th and 12th</b> were added in the following decades.</div>
        <div class="cp-card green"><div class="cp-card-title">🗣️ 22 languages</div>The 8th Schedule originally had 14 languages. Four more (Bodo, Dogri, Maithili, Santhali) were added by the 92nd Amendment, making 22.</div>
      </div>
      <div class="cp-note exam">Panchayats: <b>29</b> subjects (11th Schedule). Municipalities: <b>18</b> subjects (12th Schedule). The numbers are asked often.</div>
      <div class="cp-note trap"><b>Trap:</b> The 52nd Amendment <u>introduced</u> the Anti-defection law (1985); the 91st Amendment (2003) later made it stricter.</div>
      <div class="cp-mnemonic"><b>7</b> lists, <b>8</b> languages, <b>9</b> validation, <b>10</b> defection, <b>11</b> villages (29), <b>12</b> cities (18).</div>
    `
  },

  /* ─────────── 81 · QUESTION ─────────── */
  81: {
    questext: "The distribution of power between the Union and the States (Union List, State List and Concurrent List) is given in the —",
    options: ["Eighth Schedule","Ninth Schedule","Seventh Schedule","Twelfth Schedule"],
    correct: "3",
    exptext: "✅ Seventh Schedule. 📌 It has three lists: Union, State and Concurrent. ❌ Eighth is languages; Ninth is validation of Acts; Twelfth is Municipalities."
  },

  /* ─────────── 82 · QUESTION ─────────── */
  82: {
    questext: "How many languages are recognised in the Eighth Schedule of the Constitution?",
    options: ["18","14","24","22"],
    correct: "4",
    exptext: "✅ 22 languages. 📌 The Schedule originally had 14; four more were added by the 92nd Amendment. ❌ 14 was the original count; 18 and 24 are not correct."
  },

  /* ─────────── 83 · QUESTION ─────────── */
  83: {
    questext: "The Anti-defection Law was introduced in the Tenth Schedule by which Constitutional Amendment Act?",
    options: ["52nd Amendment","42nd Amendment","44th Amendment","91st Amendment"],
    correct: "1",
    exptext: "✅ 52nd Amendment (1985). 📌 The 91st Amendment (2003) later strengthened it. ❌ The 42nd and 44th Amendments are unrelated; the 91st only refined the law."
  },

  /* ─────────── 84 · QUESTION ─────────── */
  84: {
    questext: "The Eleventh and Twelfth Schedules list how many subjects for Panchayats and Municipalities respectively?",
    options: ["18 and 29","29 and 18","28 and 18","29 and 12"],
    correct: "2",
    exptext: "✅ 29 subjects for Panchayats and 18 for Municipalities. 📌 They came through the 73rd and 74th Amendments. ❌ The reversed order, 28 and 12 are not correct."
  },

  /* ─────────── 85 · QUESTION ─────────── */
  85: {
    questext: "Which of the following Schedules was part of the original Constitution, and not added later?",
    options: ["Ninth Schedule","Tenth Schedule","Seventh Schedule","Eleventh Schedule"],
    correct: "3",
    exptext: "✅ Seventh Schedule. 📌 The original Constitution had eight Schedules; the 9th–12th were added later. ❌ Ninth, Tenth and Eleventh are all later additions."
  },

  /* ─────────── 86 · CONCEPT PAGE ─────────── */
  86: {
    type: "concept",
    icon: "🏛️",
    accent: "#fb923c",
    pauseTimer: true,
    title: "6. Special Features of Indian Constitution — Structure and Government",
    html: `
      <p class="cp-lead">The Indian Constitution is the <u>lengthiest and most comprehensive written constitution</u> in the world. These features explain <b>why it looks different</b> from other constitutions.</p>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">📚 Size</div>It began with 395 Articles divided into 22 Parts and 8 Schedules, and it includes matters of administrative detail.</div>
        <div class="cp-card green"><div class="cp-card-title">🏢 Centre and States</div>Unlike the federal Constitutions of the USA and Australia, it lays down the governmental machinery <u>both at the Centre and in the States</u>.</div>
        <div class="cp-card amber"><div class="cp-card-title">🤝 Centre–State relations</div>Detailed provisions cover Centre–State relations, including the emergency provisions.</div>
        <div class="cp-card violet"><div class="cp-card-title">🗽 Sovereignty</div>Under the Constitution, the people of India are the ultimate sovereign.</div>
      </div>
      <div class="cp-divider">Government and judiciary</div>
      <div class="cp-grid c2">
        <div class="cp-card teal"><div class="cp-card-title">🏛️ Parliamentary form</div>A Parliamentary form of Government at both the Centre and the States.</div>
        <div class="cp-card pink"><div class="cp-card-title">📏 Flexible yet written</div>Though written, the Constitution is sufficiently flexible.</div>
        <div class="cp-card blue"><div class="cp-card-title">📜 Three Lists</div>Legislative subjects are distributed under the <b>Union List, State List and Concurrent List</b>.</div>
        <div class="cp-card red"><div class="cp-card-title">⚡ Unitary in emergency</div>Though federal, the Constitution acquires a <u>unitary character during an emergency</u>.</div>
      </div>
      <div class="cp-fig"><img src="images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/2.png" alt="Single unified judiciary: Supreme Court, High Courts, Subordinate Courts" style="display:block;width:100%;max-width:320px;max-height:200px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">India has a <b>single unified judiciary</b>: the <b>Supreme Court</b> at the apex, <b>High Courts</b> in the middle and <b>Subordinate Courts</b> at the bottom. There are provisions to ensure its independence.</div>
      <div class="cp-note remember">The Constitution balances the American system of <b>judicial supremacy</b> with the British principle of <b>parliamentary supremacy</b>.</div>
      <div class="cp-note trap"><b>Trap:</b> India is not a “dual court” system like the USA. State courts and Union courts sit in one integrated hierarchy.</div>
      <div class="cp-mnemonic"><b>PUS</b>: <b>P</b>arliamentary, <b>U</b>nified judiciary, <b>S</b>upremacy balance.</div>
    `
  },

  /* ─────────── 87 · QUESTION ─────────── */
  87: {
    questext: "Which feature distinguishes the Indian Constitution from the federal Constitutions of the USA and Australia?",
    options: ["It contains provisions only for the Centre","It has separate State Constitutions","It has no provision on Centre–State relations","It lays down governmental machinery both at the Centre and in the States"],
    correct: "4",
    exptext: "✅ The Indian Constitution covers the Centre and the States in one document. 📌 It also gives detailed Centre–State relations. ❌ Separate State constitutions are not a feature of India."
  },

  /* ─────────── 88 · QUESTION ─────────── */
  88: {
    questext: "Unlike other federal Constitutions, the Indian Constitution provides for —",
    options: ["A single unified judiciary","Separate Supreme Courts for each State","Dual citizenship","A separate State Constitution for each State"],
    correct: "1",
    exptext: "✅ A single unified judiciary with the Supreme Court at the apex. 📌 The structure is Supreme Court, High Courts and Subordinate Courts. ❌ India has no separate State Supreme Courts, dual citizenship or State Constitutions."
  },

  /* ─────────── 89 · QUESTION ─────────── */
  89: {
    questext: "The most remarkable feature of the Indian federal Constitution is that it acquires a unitary character during —",
    options: ["Budget presentation","An emergency","A joint sitting of Parliament","General elections"],
    correct: "2",
    exptext: "✅ An emergency. 📌 Powers shift to the Union during an emergency. ❌ Budget, joint sittings and elections do not change the federal balance."
  },

  /* ─────────── 90 · QUESTION ─────────── */
  90: {
    questext: "The Indian Constitution has adopted a balance between —",
    options: ["The American parliamentary system and the British judicial system","The Swiss referendum and the Irish directive principles","The American system of judicial supremacy and the British principle of parliamentary supremacy","The Canadian federation and the Australian concurrent list"],
    correct: "3",
    exptext: "✅ American judicial supremacy balanced with British parliamentary supremacy. 📌 This is the middle path of the Constitution. ❌ The other options swap or invent systems."
  },

  /* ─────────── 91 · CONCEPT PAGE ─────────── */
  91: {
    type: "concept",
    icon: "🗳️",
    accent: "#2dd4bf",
    pauseTimer: true,
    title: "6. Special Features of Indian Constitution — Rights, Society and Local Government",
    html: `
      <p class="cp-lead">These features show <b>who the Constitution protects</b> and how it builds a <u>fair, secular and participatory</u> society.</p>
      <div class="cp-grid c2">
        <div class="cp-card green"><div class="cp-card-title">🗳️ Adult franchise</div>Every adult citizen above <b>18 years</b> can vote, with no qualification based on sex, property, education or the like (Article 326).</div>
        <div class="cp-card blue"><div class="cp-card-title">☮️ Secular State</div>It provides for a <u>Secular State</u>. All citizens enjoy equal rights regardless of religion; the State cannot discriminate on grounds of religion or caste, nor compel anybody to pay taxes for any particular religion (Article 27).</div>
        <div class="cp-card amber"><div class="cp-card-title">📜 Reservation</div>Special reservation of seats for the Scheduled Castes and Scheduled Tribes in public appointments, educational institutions and the Union and State Legislatures.</div>
        <div class="cp-card violet"><div class="cp-card-title">⚖️ Rights and duties</div>It declares Fundamental Rights, makes citizens’ duties part of the basic law, and gives Directive Principles for a welfare State.</div>
      </div>
      <div class="cp-divider">Panchayati Raj and special provisions</div>
      <div class="cp-grid c2">
        <div class="cp-card teal"><div class="cp-card-title">🏘️ Panchayati Raj</div>The idea of village panchayats is in <b>Article 40</b> (Part IV) and received constitutional status through the <b>73rd Amendment</b>.</div>
        <div class="cp-card pink"><div class="cp-card-title">🧭 Special provisions for States</div>Special provisions for certain States, such as Maharashtra, Gujarat, Nagaland, Assam, Manipur, Andhra Pradesh, Telangana, Sikkim, Mizoram, Arunachal Pradesh, Goa and Karnataka, are made in <b>Articles 371 to 371J</b>.</div>
      </div>
      <div class="cp-note exam">The voting age was lowered from 21 to <b>18 years</b> by the 61st Amendment (1988).</div>
      <div class="cp-note trap"><b>Trap:</b> Special provisions for States such as Nagaland and Mizoram are in the <u>Article 371 series</u>, not in Article 370.</div>
      <div class="cp-mnemonic"><b>18</b> to vote, <b>27</b> no religious tax, <b>40</b> village panchayats, <b>371</b> special States.</div>
      <div class="cp-chips"><span>Special Features</span><span>Secular</span><span>Panchayati Raj</span></div>
    `
  },

  /* ─────────── 92 · QUESTION ─────────── */
  92: {
    questext: "The minimum age for the right to vote in elections to the Lok Sabha and State Assemblies in India is —",
    options: ["21 years","25 years","16 years","18 years"],
    correct: "4",
    exptext: "✅ 18 years, with no qualification based on sex, property or education. 📌 Adult franchise is in Article 326. ❌ 21 was the earlier age; 25 is the age for contesting Lok Sabha; 16 is not allowed."
  },

  /* ─────────── 93 · QUESTION ─────────── */
  93: {
    questext: "The idea of village panchayats, found in Article 40, received constitutional legitimacy through the —",
    options: ["73rd Amendment","74th Amendment","42nd Amendment","44th Amendment"],
    correct: "1",
    exptext: "✅ 73rd Amendment (Part IX). 📌 The 74th Amendment did the same for Municipalities. ❌ The 42nd added Fundamental Duties; the 44th deleted the Fundamental Right to property."
  },

  /* ─────────── 94 · QUESTION ─────────── */
  94: {
    questext: "No person can be compelled to pay any taxes for the promotion of any particular religion. This is provided in —",
    options: ["Article 25","Article 27","Article 26","Article 28"],
    correct: "2",
    exptext: "✅ Article 27. 📌 It supports the secular character of the State. ❌ Art. 25 is freedom of conscience; Art. 26 is managing religious affairs; Art. 28 is religious instruction in educational institutions."
  },

  /* ─────────── 95 · QUESTION ─────────── */
  95: {
    questext: "The Indian Constitution distributes legislative subjects between Parliament and State Legislatures under which three lists?",
    options: ["Union List, State List and Local List","Union List, State List and Residuary List","Union List, State List and Concurrent List","Central List, Provincial List and Concurrent List"],
    correct: "3",
    exptext: "✅ Union, State and Concurrent Lists (Seventh Schedule). 📌 These are the three lists. ❌ Local List and Provincial List do not exist; the Residuary power is not a list."
  },

  /* ─────────── 96 · QUESTION ─────────── */
  96: {
    questext: "Special provisions relating to States such as Nagaland, Mizoram and Assam are made in —",
    options: ["Article 370","Article 368","Article 356","Articles 371 to 371J"],
    correct: "4",
    exptext: "✅ The Article 371 series. 📌 Each State has its own lettered Article, e.g. 371A Nagaland. ❌ Art. 370 was for Jammu and Kashmir; Art. 368 is Amendment; Art. 356 is President’s Rule."
  }

};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/thumbnail.png → ENTRY 1 (class overview, "thumb" field) — not numbered
     images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/1.png → ENTRY 27 (Part V — The Union: Chapter I, The Executive): five chapters of Part V
     images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/2.png → ENTRY 86 (6. Special Features — Structure and Government): single unified judiciary

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name inside the images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/ folder)
   images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/thumbnail.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920×1080 px, ultra-sharp, in a premium, classic, refined editorial style (NOT cartoonish: no cartoon, toy-like, clip-art, comic or glossy cartoon-3D look). Deep midnight-navy and near-black base with a smooth, subtle blue gradient (accent #3b82f6) and restrained champagne-gold highlights; soft cinematic lighting with a gentle warm glow behind the right-centre of the frame, where a teacher's photo will be placed later; fine dark vignette on the edges, very subtle fine grain texture, realistic shallow depth of field. Place only 3 elegant, realistic, softly blurred objects mostly on the right and in the back: a closed antique leather-bound book with a completely blank cover and fine gold edging, a brushed-brass scales of justice, and a fountain pen with a gold nib, rendered matte or brushed-metal with natural reflections. Do NOT add any star, starburst or explosion sticker. Add ONE blank premium emblem: a refined, classic round seal with a thin champagne-gold rim, fine engraved double border and a smooth, completely EMPTY dark-navy centre with a faint glow, realistic brushed-metal / enamel finish, about 20% of the frame height, placed near the lower centre of the frame (about 60% from the left and 72% from the top) so I can write my own text inside it later. Keep the LEFT 62% of the frame calm, dark and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image (the emblem stays blank). Sophisticated, balanced, high-contrast, professional composition.
   images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/1.png: Clean flat vector diagram on a dark navy background, 16:9 landscape, 1200x675 px. Title at the top in VERY LARGE bold white text: "PART V: THE UNION". Below it, five thick rounded boxes in one tidy row (or two rows), each with VERY LARGE bold text and a different muted accent colour: "EXECUTIVE 52-78", "PARLIAMENT 79-122", "ORDINANCES 123", "JUDICIARY 124-147", "CAG 148-151". Thick lines, simple shapes, very few labels, exact English spelling, no people, no logos, no watermarks, nothing else on the image.
   images/Indian_Polity_and_Constitution/Features_Parts_Articles_and_Schedules/2.png: Clean flat vector diagram on a dark navy background, 16:9 landscape, 1200x675 px. A three-level pyramid, each level a thick coloured band with VERY LARGE bold white text: top "SUPREME COURT", middle "HIGH COURTS", bottom "SUBORDINATE COURTS". A short title above the pyramid in VERY LARGE bold text: "ONE UNIFIED JUDICIARY". Thick lines, simple shapes, very few labels, exact English spelling, no people, no logos, no watermarks, nothing else on the image.

   CHANGE LOG (corrections and additions made to the book's content; none of these words appear inside the pages)
   1. Part II: the notes read "Art. 3-11"; written as Articles 5–11 (Part I is Articles 1–4).
   2. Part IV: "Art. 33 State to secure a social order" is Article 38; corrected.
   3. Part VIII: OCR range "239-221" corrected to Articles 239–242. Part VII shown as repealed (Article 238).
   4. Part IX: OCR garble resolved to Articles 243–243O; Part IXA 243P–243ZG; Part IXB 243ZH–243ZT. District Planning Committee given as Article 243ZD and co-operative directors limit (21) as Article 243ZJ.
   5. Part XIV: "Art. 313 Public Service Commissions" corrected to Article 315.
   6. Part XV: "Art. 321" corrected to Article 324 (Election Commission) and "Art. 323" to Article 325 (electoral roll).
   7. Part XII: the notes say Article 268 taxes are "levied and collected by the centre but distributed". Article 268 is "duties levied by the Union but collected and appropriated by the States"; the levied-collected-distributed description is Article 270. Both are written correctly.
   8. Part XVI range written as Articles 330–342A (the notes give 330–342).
   9. Part VI / Part XXI wording: OCR noise in the table of Parts cleaned up (Part IVA, Part IX heading, Part XIV, Part XXII).
   10. Article count: the notes say "technically there are only 395 Articles". Written as: 395 Articles, 22 Parts and 8 Schedules at adoption; about 448 Articles in 25 Parts and 12 Schedules today. VERIFY the present count.
   11. Article 370: the notes list the 5 August 2019 declaration only. Added: Jammu and Kashmir Reorganisation Act 2019 (in force 31 October 2019) and the Supreme Court verdict of December 2023. VERIFY.
   12. Special features: "special status to Jammu & Kashmir and some other states such as Nagaland, Mizoram, Assam, Gujarat etc." is written as the Article 371 to 371J provisions for the listed States (J&K no longer has special status).
   13. First Schedule: stated as 28 States and 8 Union Territories (current).
   14. Sixth Schedule: "tribal areas of North-Eastern states" written as Assam, Meghalaya, Tripura and Mizoram.
   15. Eighth Schedule: added the original count (14) and the 92nd Amendment additions (Bodo, Dogri, Maithili, Santhali).
   16. Added for completeness: Article 21A age band (6–14, 86th Amendment); Article 31 deleted and Article 300A (44th Amendment); 42nd Amendment additions 39A, 43A, 48A, Part IVA; 97th Amendment addition 43B and Part IXB; Article 45 wording; Article 51A source (Swaran Singh Committee, 42nd Amendment, 11th duty by 86th Amendment); voting age 18 by the 61st Amendment (1988); Article 356 mentioned beside 352 and 360.
   17. Lokpal: the notes' OCR line "Lokpal and Lokayukta Bill 2011 ... Samajwadi Party opposed" was cleaned to the 2013 passage dates; the opposition remark was dropped as not exam-relevant. Added: assent on 1 January 2014.
   18. Lokpal: the notes' phrase "country's first Lokpal" for Justice Ghose and the 2022/2024 events are kept exactly as given; OCR spellings of names corrected (Ajay Manikrao Khanwilkar, Pradip Kumar Mohanty, Lingappa Narayana Swamy, Ritu Raj Awasthi).
   19. Lokayukta: Maharashtra is kept as the first state to establish the institution (Act of 1971, started 25 October 1972) as in the notes.
   20. Fundamental Rights table: "Right to Freedom of Religion" and "Cultural and Educational Rights" headings aligned to standard names.
   ════════════════════════════════════════════════════════════════ */
