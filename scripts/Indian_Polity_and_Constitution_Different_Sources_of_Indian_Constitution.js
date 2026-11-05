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

  /* ─────────── 1 · CONCEPT PAGE — CLASS OVERVIEW ─────────── */
  1: {
    type: "concept",
    icon: "🎯",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",

    /* 🎬 tap the 🎯 icon on this page → thumbnail studio + YouTube kit */
    thumb: {
      "image": "images/f4a7a7b9-3b24-4a37-8137-eec1788c1d63.png",
      "banner": "INDIAN POLITY • ALL EXAMS",
      "line1": "BORROWED FEATURES",
      "line2": "CONSTITUTION",
      "line3": "WHO GAVE WHAT?",
      "badge": "FULL CLASS",
      "ribbon": "TABLE • TRICKS • PRACTICE",
      "burst": "All exams",
      "mode": "creator"
    },
    yt: {
      "title": "Sources of Indian Constitution | Borrowed Features Trick | All Competitive Exams",
      "altTitles": [
            "Which Country Gave What to Indian Constitution? Full Table & Trick | UPSC SSC Banking",
            "Government of India Act 1935 + 9 Countries: Borrowed Features Made Easy",
            "Indian Polity: Sources of the Constitution in One Class with Practice Questions",
            "Never Forget Borrowed Features of the Constitution | Polity Memory Tricks"
      ],
      "description": "Which country gave which idea to the Indian Constitution? In this class you learn the sources of the Constitution with simple explanations, memory tricks and practice questions for all competitive exams.\n\n📌 IN THIS CLASS\n✅ Government of India Act, 1935: the skeleton or blueprint (F-E-G)\n✅ Britain: Parliament package\n✅ USA: judicial review, rights and independent judiciary\n✅ Canada: strong Centre and residuary powers\n✅ Ireland: Directive Principles\n✅ Weimar Germany, Australia, South Africa, France and USSR\n✅ Common traps and 41 practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 3. Different Sources of Indian Constitution\n00:00 Government of India Act, 1935\n00:00 Constitution of Britain\n00:00 Constitution of USA\n00:00 Constitution of Canada\n00:00 Constitution of Ireland\n00:00 Weimar Constitution of Germany\n00:00 Constitution of Australia\n00:00 Constitution of South Africa\n00:00 Constitution of France\n00:00 Constitution of former USSR\n\n👍 Like, share and subscribe, and comment “DONE” after you finish the practice questions.\n\n#IndianPolity #Constitution #UPSC #SSC",
      "tags": [
            "sources of indian constitution",
            "borrowed features of indian constitution",
            "indian polity",
            "polity for competitive exams",
            "government of india act 1935",
            "features borrowed from other countries",
            "indian constitution features",
            "constitution sources trick",
            "polity tricks",
            "directive principles source ireland",
            "concurrent list australia",
            "fundamental duties ussr",
            "polity for upsc",
            "polity for ssc",
            "static gk polity",
            "indian polity questions",
            "polity memory tricks",
            "constitution of india"
      ],
      "hashtags": [
            "IndianPolity",
            "Constitution",
            "UPSC",
            "SSC"
      ],
      "thumbText": "SOURCES OF INDIAN CONSTITUTION",
      "pinnedComment": "📌 Practice what you learned: solve the 41 questions in the class and write your score below. Which country's features do you find hardest to remember? 👇",
      "communityPost": "🏛️ New class is live: Different Sources of the Indian Constitution. One table, simple hooks and 41 practice questions. Watch it and tell me your score! 🎯",
      "chapters": "00:00 Class overview\n00:00 3. Different Sources of Indian Constitution\n00:00 Government of India Act, 1935\n00:00 Constitution of Britain\n00:00 Constitution of USA\n00:00 Constitution of Canada\n00:00 Constitution of Ireland\n00:00 Weimar Constitution of Germany\n00:00 Constitution of Australia\n00:00 Constitution of South Africa\n00:00 Constitution of France\n00:00 Constitution of former USSR",
      "playlist": "Indian Polity and Constitution — Full Course"
    },

    html: `
      <p class="cp-lead">This class covers <u>“Different Sources of the Indian Constitution”</u>: which ideas came from the <b>Government of India Act, 1935</b> and from <b>nine other constitutions</b>. By the end you will answer any “<u>borrowed from which country?</u>” question in a few seconds.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>11</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>41</b><span>Practice questions</span></div>
        <div class="cp-stat"><b>30+</b><span>Key facts</span></div>
        <div class="cp-stat"><b>~30 min</b><span>Time needed</span></div>
      </div>

      <div class="cp-divider">Your roadmap</div>

      <ul class="cp-timeline">
        <li><b>3. Different Sources of Indian Constitution</b><br>The big picture and a master table. 3 questions.</li>
        <li><b>Government of India Act, 1935</b><br>The skeleton of the Constitution. 5 questions.</li>
        <li><b>Constitution of Britain</b><br>Parliament package. 5 questions.</li>
        <li><b>Constitution of USA</b><br>Judiciary and rights. 5 questions.</li>
        <li><b>Constitution of Canada</b><br>Strong Centre. 4 questions.</li>
        <li><b>Constitution of Ireland</b><br>Directive Principles. 4 questions.</li>
        <li><b>Weimar Constitution of Germany</b><br>Emergency and rights. 3 questions.</li>
        <li><b>Constitution of Australia</b><br>Concurrent List. 3 questions.</li>
        <li><b>Constitution of South Africa</b><br>Amendment procedure. 3 questions.</li>
        <li><b>Constitution of France</b><br>Liberty, Equality, Fraternity. 3 questions.</li>
        <li><b>Constitution of former USSR</b><br>Fundamental Duties. 3 questions.</li>
      </ul>

      <div class="cp-divider">What you will be able to do</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🧭 Match feature and source</div>Tell instantly which country gave which idea to India.</div>
        <div class="cp-card green"><div class="cp-card-title">🦴 Skeleton vs ideas</div>Separate the 1935 Act (structure) from foreign ideas (rights, directives, duties).</div>
        <div class="cp-card red"><div class="cp-card-title">⚠️ Avoid traps</div>Spot look-alike pairs such as Concurrent List vs residuary powers, and nominated vs elected Rajya Sabha members.</div>
        <div class="cp-card amber"><div class="cp-card-title">🧠 Memory hooks</div>Use short hooks like F-E-G, USA = Judges and Rights and Ireland = Directives.</div>
      </div>

      <div class="cp-note exam"><b>Why it matters:</b> “<u>borrowed from</u>” and “<u>which is NOT borrowed</u>” questions are asked almost every year in SSC, UPSC, Banking, Railways and Defence exams.</div>

      <div class="cp-note tip">Read each concept page fully, then attempt the questions right after it. The exam clock pauses on concept pages, so take your time.</div>

      <div class="cp-chips"><span>Indian Polity</span><span>Sources of Constitution</span><span>All competitive exams</span><span>High-yield</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE — 3. Different Sources of Indian Constitution ─────────── */
  2: {
    type: "concept",
    icon: "🗺️",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "3. Different Sources of Indian Constitution",
    html: `
      <p class="cp-lead">The Indian Constitution was not written from zero. Its framers took the <u>working skeleton</u> from the <b>Government of India Act, 1935</b> and then picked the <u>best ideas from other countries</u>, fitting them to Indian needs. Knowing <b>“which idea came from where”</b> is a favourite one-line question in every exam.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>≈250</b><span>Articles from the 1935 Act</span></div>
        <div class="cp-stat"><b>395</b><span>Articles in the original Constitution</span></div>
        <div class="cp-stat"><b>9</b><span>Foreign sources to learn</span></div>
        <div class="cp-stat"><b>1935</b><span>Act = the blueprint</span></div>
      </div>

      <div class="cp-fig"><img src="images/8721dc8d-7e95-4e31-84f3-6ec6f3585c59.png" alt="Hub diagram: Government of India Act 1935 and other countries feeding the Indian Constitution" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>

      <div class="cp-divider">Your roadmap</div>

      <ul class="cp-timeline">
        <li><b>Government of India Act, 1935</b><br>The skeleton: federal scheme, office of Governor, emergency powers.</li>
        <li><b>Constitution of Britain</b><br>Parliament package: procedures, rule of law, single citizenship, two Houses, CAG.</li>
        <li><b>Constitution of USA</b><br>Judiciary and rights: judicial review, fundamental rights, removal of judges.</li>
        <li><b>Constitution of Canada</b><br>Strong Centre, residuary powers, advisory jurisdiction.</li>
        <li><b>Constitution of Ireland</b><br>Directive Principles, presidential election method, nominated Rajya Sabha members.</li>
        <li><b>Weimar Constitution of Germany</b><br>Suspension of fundamental rights in an emergency.</li>
        <li><b>Constitution of Australia</b><br>Concurrent List and trade and commerce provisions.</li>
        <li><b>Constitution of South Africa</b><br>Amendment procedure and election of Rajya Sabha members.</li>
        <li><b>Constitution of France</b><br>Republic and the ideals of liberty, equality and fraternity.</li>
        <li><b>Constitution of former USSR</b><br>Fundamental Duties and the ideal of justice.</li>
      </ul>

      <div class="cp-divider">The big picture in one table</div>

      <table>
        <thead><tr><th>Source</th><th>Main idea taken by India</th></tr></thead>
        <tbody>
          <tr><td>Government of India Act, 1935</td><td>Federal scheme, office of Governor, emergency powers</td></tr>
          <tr><td>Britain</td><td>Law-making procedure, rule of law, single citizenship, bi-cameral Parliamentary system, office of CAG</td></tr>
          <tr><td>USA</td><td>Independence of judiciary, judicial review, fundamental rights, removal of judges, Preamble, functions of President and Vice-President</td></tr>
          <tr><td>Canada</td><td>Federation with strong Centre, residuary powers with Centre, advisory jurisdiction of Supreme Court</td></tr>
          <tr><td>Ireland</td><td>Directive Principles, method of presidential election, nomination of Rajya Sabha members</td></tr>
          <tr><td>Weimar Germany</td><td>Suspension of fundamental rights during emergency</td></tr>
          <tr><td>Australia</td><td>Concurrent List, trade and commerce provisions</td></tr>
          <tr><td>South Africa</td><td>Amendment procedure, election of Rajya Sabha members by proportional representation</td></tr>
          <tr><td>France</td><td>Republican system, liberty, equality, fraternity</td></tr>
          <tr><td>Former USSR</td><td>Fundamental Duties, ideals of justice in the Preamble</td></tr>
        </tbody>
      </table>

      <div class="cp-note exam"><b>Exam importance:</b> very high. Questions are usually of the type “<u>X is borrowed from which country?</u>” or “<u>which is NOT borrowed from …?</u>”. This one table decides most of them.</div>

      <div class="cp-note remember">The 1935 Act gave the <b>skeleton</b> (the working machinery of government). Foreign constitutions gave <b>individual ideas</b> such as rights, directive principles and duties.</div>

      <div class="cp-mnemonic">Britain = <b>Parliament</b> · USA = <b>Judges and Rights</b> · Canada = <b>Centre</b> · Ireland = <b>Directives</b> · Weimar = <b>Warning (emergency)</b> · Australia = <b>Concurrent</b> · South Africa = <b>Amendment</b> · France = <b>Freedom trio</b> · USSR = <b>Duties</b></div>

      <details class="cp-collapse">
        <summary>Years of some key sources (useful for sequence questions)</summary>
        <p>USA Constitution: 1789 · Weimar Constitution of Germany: 1919 · Government of India Act: 1935 · Constitution of Ireland: 1937. So the order is USA, Weimar, 1935 Act, Ireland.</p>
      </details>

      <div class="cp-chips"><span>Indian Polity</span><span>Sources of the Constitution</span><span>High-yield</span><span>All competitive exams</span></div>
    `
  },

  /* ─────────── 3 · QUESTION (3. Different Sources of Indian Constitution, Q1) ─────────── */
  3: {
    questext: "The 'skeleton' (basic framework) of the Indian Constitution was mainly derived from which of the following?",
    options: ["Government of India Act, 1935","Government of India Act, 1919","Indian Independence Act, 1947","Cabinet Mission Plan, 1946"],
    correct: "1",
    exptext: "✅ Government of India Act, 1935 gave the working machinery of government. 📌 Act of 1935 = skeleton or blueprint; foreign constitutions = individual ideas. ❌ The 1919 Act, the 1947 Act and the Cabinet Mission Plan are important in history but are not the main source of the structure."
  },

  /* ─────────── 4 · QUESTION (3. Different Sources of Indian Constitution, Q2) ─────────── */
  4: {
    questext: "Consider the following statements about the sources of the Indian Constitution: 1. Almost 250 of the original 395 Articles were taken from the Government of India Act, 1935, directly or with some modifications. 2. All provisions of the Constitution were borrowed from foreign constitutions. 3. The Government of India Act, 1935 is regarded as the basic premise or blueprint of the Constitution. Which of the statements given above is/are correct?",
    options: ["1 and 2 only","1 and 3 only","2 and 3 only","1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 1 and 3 are correct. 📌 About 250 of 395 Articles come from the 1935 Act. ❌ Statement 2 is wrong: much of the text comes from the 1935 Act and the framers' own work, not only from foreign constitutions."
  },

  /* ─────────── 5 · QUESTION (3. Different Sources of Indian Constitution, Q3) ─────────── */
  5: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Directive Principles of State Policy – Ireland","Concurrent List – Australia","Fundamental Duties – Canada","Rule of law – Britain"],
    correct: "3",
    exptext: "✅ Fundamental Duties come from the former USSR, not Canada. 📌 Rights = USA, DPSP = Ireland, Duties = USSR. ❌ DPSP – Ireland, Concurrent List – Australia and Rule of law – Britain are all correct pairs."
  },

  /* ─────────── 6 · CONCEPT PAGE — Government of India Act, 1935 ─────────── */
  6: {
    type: "concept",
    icon: "📜",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "Government of India Act, 1935",
    html: `
      <p class="cp-lead">This Act was the law that ran British India before independence. Our leaders had worked with it for years, so they kept its <u>machinery of government</u> and built the Constitution on top of it. That is why it is called the <b>basic premise</b> or <b>“blueprint”</b> of the Indian Constitution.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>≈250</b><span>Articles taken (of 395)</span></div>
        <div class="cp-stat"><b>3</b><span>Key features to remember</span></div>
        <div class="cp-stat"><b>1935</b><span>Year of the Act</span></div>
      </div>

      <div class="cp-divider">What India took from it</div>

      <div class="cp-grid c3">
        <div class="cp-card blue"><div class="cp-card-title">🏛️ Federal scheme</div>Power is shared between the Centre and the provinces (now states), each with its own field of work.</div>
        <div class="cp-card green"><div class="cp-card-title">👤 Office of Governor</div>Each state has a Governor as the constitutional head, linked to the Centre.</div>
        <div class="cp-card red"><div class="cp-card-title">🚨 Emergency powers</div>The Centre gets special powers to act in a serious crisis.</div>
      </div>

      <div class="cp-note info">Other administrative ideas also came from this Act, such as the <b>Public Service Commissions</b> and the idea of a <b>Federal Court</b>, which later became the Supreme Court.</div>

      <div class="cp-divider">Why it matters</div>

      <p>Out of the <u>395 Articles</u> of the original Constitution, almost <b>250 Articles</b> are taken from this Act, either directly or with some modifications. So the day-to-day structure of our government feels familiar to the one before 1947.</p>

      <div class="cp-vs">
        <div class="good"><h4>✅ Correct</h4>Skeleton / blueprint = <b>Government of India Act, 1935</b></div>
        <div class="bad"><h4>❌ Trap</h4>Skeleton = Constitution of the USA <b>(wrong)</b>. The USA gave ideas like rights and judicial review, not the skeleton.</div>
      </div>

      <div class="cp-example">
        <div class="cp-q">Every state has a Governor appointed by the Centre. Which Act gave this idea?</div>
        <div class="cp-a">The <b class="cp-green">Government of India Act, 1935</b>, which created the office of Governor with its federal scheme.</div>
      </div>

      <div class="cp-note trap">Exam lists credit the <b>Concurrent List</b> to <u>Australia</u>. Do not link it to the 1935 Act in a “borrowed from” question.</div>

      <div class="cp-note exam">Asked as: “<u>The basic framework of the Constitution is taken from …</u>” or “<u>how many articles are from the 1935 Act?</u>” (about 250).</div>

      <div class="cp-mnemonic"><b>F-E-G</b>: <b>F</b>ederal scheme, <b>E</b>mergency powers, <b>G</b>overnor.</div>

      <details class="cp-collapse">
        <summary>Why not just use the 1935 Act completely?</summary>
        <p>Because the Act was made by the British for a ruled country. Free India needed rights, directive principles and a fully elected government, so the framers added ideas from other constitutions on top of the 1935 skeleton.</p>
      </details>

      <div class="cp-chips"><span>Skeleton</span><span>Blueprint</span><span>Federal scheme</span><span>Governor</span><span>Emergency</span></div>
    `
  },

  /* ─────────── 7 · QUESTION (Government of India Act, 1935, Q1) ─────────── */
  7: {
    questext: "Which of the following features of the Indian Constitution was taken from the Government of India Act, 1935?",
    options: ["Office of Governor","Fundamental Duties","Judicial review","Nomination of Rajya Sabha members by the President"],
    correct: "1",
    exptext: "✅ The office of Governor comes from the 1935 Act. 📌 Remember F-E-G: Federal scheme, Emergency powers, Governor. ❌ Duties come from the USSR, judicial review from the USA and nominated members from Ireland."
  },

  /* ─────────── 8 · QUESTION (Government of India Act, 1935, Q2) ─────────── */
  8: {
    questext: "Which of the following is NOT a feature drawn from the Government of India Act, 1935?",
    options: ["Federal scheme","Office of Governor","Emergency powers","Directive Principles of State Policy"],
    correct: "4",
    exptext: "✅ DPSP come from Ireland. 📌 The 1935 Act gave the structure, not the welfare goals. ❌ Federal scheme, office of Governor and emergency powers are all from the 1935 Act."
  },

  /* ─────────── 9 · QUESTION (Government of India Act, 1935, Q3) ─────────── */
  9: {
    questext: "Out of the 395 Articles of the original Constitution, about how many were taken from the Government of India Act, 1935, directly or with modifications?",
    options: ["Almost 250","Almost 150","Almost 100","Almost 350"],
    correct: "1",
    exptext: "✅ Almost 250 Articles. 📌 About two-thirds of the original Constitution traces back to the 1935 Act. ❌ 150 and 100 are too low, and 350 would leave almost nothing for the framers' own work."
  },

  /* ─────────── 10 · QUESTION (Government of India Act, 1935, Q4) ─────────── */
  10: {
    questext: "Consider the following statements: 1. The Government of India Act, 1935 supplied the federal scheme to the Indian Constitution. 2. The Constitution copied the 1935 Act word for word without any change. 3. Some provisions of the 1935 Act were taken with modifications. Which of the statements given above is/are correct?",
    options: ["1 and 3 only","1 and 2 only","2 and 3 only","1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 3 are correct. 📌 The 1935 Act is the blueprint, but provisions were adapted. ❌ Statement 2 is wrong: the framers modified many provisions and added ideas from other countries."
  },

  /* ─────────── 11 · QUESTION (Government of India Act, 1935, Q5) ─────────── */
  11: {
    questext: "Arrange the following sources of the Indian Constitution in chronological order of their enactment (earliest first): 1. Government of India Act, 1935 2. Constitution of the USA 3. Weimar Constitution of Germany 4. Constitution of Ireland",
    options: ["2-1-3-4","2-4-3-1","2-3-1-4","3-2-1-4"],
    correct: "3",
    exptext: "✅ USA (1789), Weimar (1919), Government of India Act (1935), Ireland (1937), so the order is 2-3-1-4. 📌 Think: oldest is the USA; Ireland came just after the 1935 Act. ❌ The other options place Weimar before the USA or Ireland before the 1935 Act."
  },

  /* ─────────── 12 · CONCEPT PAGE — Constitution of Britain ─────────── */
  12: {
    type: "concept",
    icon: "👑",
    accent: "#ef4444",
    pauseTimer: true,
    title: "Constitution of Britain",
    html: `
      <p class="cp-lead">Britain is known as the home of <u>parliamentary democracy</u>. India chose the same way of running its government, so the <b>whole working of Parliament</b> follows the British model.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>5</b><span>Features taken</span></div>
        <div class="cp-stat"><b>2</b><span>Houses of Parliament</span></div>
        <div class="cp-stat"><b>1</b><span>Citizenship for all</span></div>
      </div>

      <div class="cp-divider">What India took</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">📑 Law-making procedures</div>How a Bill becomes a law: introduction, debate in both Houses, passing and then the President's assent.</div>
        <div class="cp-card green"><div class="cp-card-title">⚖️ Rule of law</div>Nobody is above the law and the same law applies to everyone, rich or poor, official or citizen (see Art. 14).</div>
        <div class="cp-card amber"><div class="cp-card-title">🪪 Single citizenship</div>A person is a citizen of India only, whichever state he or she lives in.</div>
        <div class="cp-card violet"><div class="cp-card-title">🏛️ Bi-cameral Parliamentary system</div>Parliament has two Houses, Lok Sabha and Rajya Sabha, and the government is answerable to the Lok Sabha.</div>
        <div class="cp-card teal"><div class="cp-card-title">🧮 Office of CAG</div>The Comptroller and Auditor General checks how the government spends public money (Art. 148).</div>
      </div>

      <table>
        <thead><tr><th>Feature</th><th>Where you see it in India</th></tr></thead>
        <tbody>
          <tr><td>Law-making procedure</td><td>How Parliament passes Bills</td></tr>
          <tr><td>Rule of law</td><td>Equality before law</td></tr>
          <tr><td>Single citizenship</td><td>Part II (one Indian citizenship)</td></tr>
          <tr><td>Bi-cameral Parliament</td><td>Lok Sabha + Rajya Sabha</td></tr>
          <tr><td>CAG</td><td>Audit of government accounts</td></tr>
        </tbody>
      </table>

      <div class="cp-vs">
        <div class="good"><h4>✅ Correct</h4>India is federal but has <b>single citizenship</b> (from Britain).</div>
        <div class="bad"><h4>❌ Trap</h4>The USA is federal and has <b>dual citizenship</b> (national and state). India did <b>not</b> copy this.</div>
      </div>

      <div class="cp-note trap"><u>Judicial review</u> is <b>not</b> from Britain. In Britain Parliament is supreme, so courts cannot cancel its laws. Judicial review comes from the <u>USA</u>.</div>

      <div class="cp-note exam">Very frequent: <b>“single citizenship”, “rule of law”, “Parliamentary system”</b> all point to <u>Britain</u>.</div>

      <div class="cp-mnemonic">Britain = the <b>Parliament package</b>: procedure, two Houses, rule of law, one citizenship, CAG.</div>

      <details class="cp-collapse">
        <summary>Why did India choose the British parliamentary model?</summary>
        <p>Indians had seen it work in the Legislative Councils and Provincial governments for decades. It makes the government answerable to the elected House, which suited a young democracy.</p>
      </details>

      <div class="cp-chips"><span>Parliamentary system</span><span>Rule of law</span><span>Single citizenship</span><span>CAG</span></div>
    `
  },

  /* ─────────── 13 · QUESTION (Constitution of Britain, Q1) ─────────── */
  13: {
    questext: "The principle of 'Rule of law' in the Indian Constitution has been borrowed from the Constitution of",
    options: ["USA","France","Ireland","Britain"],
    correct: "4",
    exptext: "✅ Britain. 📌 Britain = Parliament package: procedure, two Houses, rule of law, single citizenship, CAG. ❌ The USA is linked with rights and judiciary, France with the republic, Ireland with DPSP."
  },

  /* ─────────── 14 · QUESTION (Constitution of Britain, Q2) ─────────── */
  14: {
    questext: "Which of the following is NOT borrowed from the British Constitution?",
    options: ["Law-making procedures","Judicial review","Bi-cameral Parliamentary system","Single citizenship"],
    correct: "2",
    exptext: "✅ Judicial review is from the USA. 📌 In Britain Parliament is supreme, so courts cannot cancel its laws. ❌ Law-making procedures, bi-cameral Parliament and single citizenship all come from Britain."
  },

  /* ─────────── 15 · QUESTION (Constitution of Britain, Q3) ─────────── */
  15: {
    questext: "Consider the following statements: 1. The bi-cameral Parliamentary system is borrowed from Britain. 2. The office of the CAG is borrowed from Britain. 3. Residuary powers with the Centre are borrowed from Britain. Which of the statements given above is/are correct?",
    options: ["1 only","2 only","2 and 3 only","1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Residuary powers come from Canada (strong Centre, residuary powers, advisory opinion). ❌ Statement 3 is wrong because residuary powers come from Canada."
  },

  /* ─────────── 16 · QUESTION (Constitution of Britain, Q4) ─────────── */
  16: {
    questext: "Although India is a federal country like the USA, it follows single citizenship instead of dual citizenship. This feature has been borrowed from",
    options: ["Canada","Australia","Britain","Ireland"],
    correct: "3",
    exptext: "✅ Britain. 📌 In India everyone is only an Indian citizen, whichever state they live in. ❌ Canada gave the strong Centre, Australia the Concurrent List and Ireland the DPSP."
  },

  /* ─────────── 17 · QUESTION (Constitution of Britain, Q5) ─────────── */
  17: {
    questext: "Match List-I (Feature) with List-II (Source). List-I: A. Rule of law, B. Residuary powers with the Centre, C. Directive Principles, D. Judicial review. List-II: 1. Ireland, 2. Canada, 3. USA, 4. Britain.",
    options: ["A-1, B-2, C-3, D-4","A-4, B-2, C-1, D-3","A-4, B-3, C-2, D-1","A-2, B-4, C-1, D-3"],
    correct: "2",
    exptext: "✅ A-4 (Britain), B-2 (Canada), C-1 (Ireland), D-3 (USA). 📌 Britain = Parliament, Canada = Centre, Ireland = Directives, USA = Judges. ❌ The other codes swap Canada with the USA or Britain with Canada."
  },

  /* ─────────── 18 · CONCEPT PAGE — Constitution of USA ─────────── */
  18: {
    type: "concept",
    icon: "🗽",
    accent: "#3b82f6",
    pauseTimer: true,
    title: "Constitution of USA",
    html: `
      <p class="cp-lead">The USA gave India most of its ideas about <u>protecting people from the government</u>: a free judiciary, rights that courts can enforce, and a safe way to remove judges.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>6</b><span>Features taken</span></div>
        <div class="cp-stat"><b>Part III</b><span>Fundamental Rights</span></div>
        <div class="cp-stat"><b>1</b><span>Judicial review</span></div>
      </div>

      <div class="cp-divider">What India took</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🧑‍⚖️ Independence of judiciary</div>Judges work free from pressure of the government and the legislature.</div>
        <div class="cp-card green"><div class="cp-card-title">🔍 Judicial review</div>Courts can declare a law invalid if it goes against the Constitution (see Art. 13).</div>
        <div class="cp-card amber"><div class="cp-card-title">✊ Fundamental rights</div>Basic rights of citizens are written in the Constitution itself (Part III), like the American Bill of Rights.</div>
        <div class="cp-card red"><div class="cp-card-title">📝 Removal of Supreme Court and High Court judges</div>A judge can be removed only by a special process, not by the whim of the government.</div>
        <div class="cp-card violet"><div class="cp-card-title">📖 Preamble</div>The idea of starting the Constitution with a Preamble that states its aims.</div>
        <div class="cp-card teal"><div class="cp-card-title">🎖️ Functions of President and Vice-President</div>The Vice-President acts as the chairman of the upper House (Rajya Sabha), as in the USA.</div>
      </div>

      <div class="cp-note remember">USA = <b>rights and courts</b>. If the question is about <u>judges, rights or review</u>, think USA.</div>

      <div class="cp-vs">
        <div class="good"><h4>✅ Correct</h4>Judicial review → <b>USA</b></div>
        <div class="bad"><h4>❌ Trap</h4>Judicial review → Britain <b>(wrong)</b>. British courts cannot strike down Acts of Parliament.</div>
      </div>

      <div class="cp-note trap"><b>Residuary powers</b> with the Centre are <u>not</u> from the USA. In the USA these powers belong to the states. India took this from <b>Canada</b>.</div>

      <div class="cp-note exam">Typical: <b>“fundamental rights”, “independence of judiciary”, “judicial review”, “removal of judges”</b> → USA.</div>

      <div class="cp-mnemonic"><b>USA</b> = <b>U</b>nshakable judiciary, <b>S</b>upreme review, <b>A</b>ssured rights.</div>

      <details class="cp-collapse">
        <summary>Why do rights need courts?</summary>
        <p>A right written in the book is useless unless someone can enforce it. By giving independent courts the power of judicial review, the Constitution makes rights real.</p>
      </details>

      <div class="cp-chips"><span>Fundamental rights</span><span>Judicial review</span><span>Independent judiciary</span><span>Preamble</span></div>
    `
  },

  /* ─────────── 19 · QUESTION (Constitution of USA, Q1) ─────────── */
  19: {
    questext: "Judicial review in India has been borrowed from the Constitution of",
    options: ["USA","Britain","Canada","Ireland"],
    correct: "1",
    exptext: "✅ USA. 📌 Courts can strike down laws that violate the Constitution. ❌ In Britain Parliament is supreme, Canada gave the strong Centre and Ireland gave DPSP."
  },

  /* ─────────── 20 · QUESTION (Constitution of USA, Q2) ─────────── */
  20: {
    questext: "Which of the following is NOT borrowed from the Constitution of the USA?",
    options: ["Fundamental rights","Residuary powers with the Centre","Removal of Supreme Court and High Court judges","Preamble"],
    correct: "2",
    exptext: "✅ Residuary powers with the Centre come from Canada. 📌 In the USA these powers are with the states. ❌ Fundamental rights, removal of judges and the Preamble are all from the USA."
  },

  /* ─────────── 21 · QUESTION (Constitution of USA, Q3) ─────────── */
  21: {
    questext: "Which of the following features are borrowed from the Constitution of the USA? 1. Independence of the judiciary 2. Fundamental rights 3. Single citizenship",
    options: ["1 only","1 and 3 only","1 and 2 only","2 and 3 only"],
    correct: "3",
    exptext: "✅ Independence of the judiciary and fundamental rights come from the USA. 📌 USA = Judges and Rights. ❌ Single citizenship comes from Britain; the USA has dual citizenship."
  },

  /* ─────────── 22 · QUESTION (Constitution of USA, Q4) ─────────── */
  22: {
    questext: "Which of the following pairs of features is borrowed from the Constitution of the USA?",
    options: ["Concurrent List and Fundamental rights","Directive Principles and Judicial review","Judicial review and Fundamental rights","Rule of law and Fundamental rights"],
    correct: "3",
    exptext: "✅ Judicial review and fundamental rights are both from the USA. 📌 Learn USA as courts plus rights. ❌ The Concurrent List is from Australia, DPSP from Ireland and rule of law from Britain."
  },

  /* ─────────── 23 · QUESTION (Constitution of USA, Q5) ─────────── */
  23: {
    questext: "Which one of the following executive-related features has its origin in the Constitution of the USA?",
    options: ["Method of presidential election","Nomination of Rajya Sabha members","Office of the CAG","Functions of the President and the Vice-President"],
    correct: "4",
    exptext: "✅ Functions of the President and Vice-President come from the USA. 📌 For example, the Vice-President chairs the upper House. ❌ The method of presidential election and nominated members are from Ireland; the CAG is linked with Britain."
  },

  /* ─────────── 24 · CONCEPT PAGE — Constitution of Canada ─────────── */
  24: {
    type: "concept",
    icon: "🍁",
    accent: "#ec4899",
    pauseTimer: true,
    title: "Constitution of Canada",
    html: `
      <p class="cp-lead">After Partition, India's framers feared that weak central power could break the country. Canada's federation, which leans towards a <u>strong Centre</u>, was the right model.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>3</b><span>Features taken</span></div>
        <div class="cp-stat"><b>Art. 248</b><span>Residuary powers</span></div>
        <div class="cp-stat"><b>Art. 143</b><span>Advisory jurisdiction</span></div>
      </div>

      <div class="cp-divider">What India took</div>

      <div class="cp-grid c3">
        <div class="cp-card blue"><div class="cp-card-title">🏛️ Federation with strong Centre</div>Union and states share power, but the Centre is stronger, to keep the country united.</div>
        <div class="cp-card green"><div class="cp-card-title">🧩 Residuary powers with Centre</div>A subject not listed anywhere belongs to Parliament, not to the states.</div>
        <div class="cp-card amber"><div class="cp-card-title">💬 Advisory jurisdiction of Supreme Court</div>The President can ask the Supreme Court for its opinion on an important question (Art. 143).</div>
      </div>

      <div class="cp-note info">Canada's idea also explains why <b>Governors of states are appointed by the Centre</b> in India.</div>

      <table>
        <thead><tr><th>Country</th><th>Federal tilt</th><th>Residuary powers</th></tr></thead>
        <tbody>
          <tr><td>Canada → India</td><td>Strong Centre</td><td>With the Centre</td></tr>
          <tr><td>USA</td><td>Strong states</td><td>With the states</td></tr>
          <tr><td>Australia</td><td>Strong states</td><td>With the states</td></tr>
        </tbody>
      </table>

      <div class="cp-vs">
        <div class="good"><h4>✅ Correct</h4>Residuary powers with the Centre → <b>Canada</b> (and India).</div>
        <div class="bad"><h4>❌ Trap</h4>USA gave residuary powers to the states, so do <b>not</b> link this with the USA.</div>
      </div>

      <div class="cp-note trap">Do not mix <u>Concurrent List</u> (Australia) with <u>residuary powers</u> (Canada).</div>

      <div class="cp-note exam">Asked as: “<u>strong Centre</u>, <u>residuary powers</u>, <u>advisory jurisdiction of SC</u>” → <b>Canada</b>.</div>

      <div class="cp-mnemonic"><b>CAN</b>ada = <b>C</b>entre <b>A</b>dvises <b>N</b>ation: Strong Centre, residuary powers, Advisory opinion.</div>

      <details class="cp-collapse">
        <summary>What is advisory jurisdiction?</summary>
        <p>It is the power of the Supreme Court to give its opinion when the President asks for it. The President is not bound to accept the opinion, and the Court is not deciding a dispute.</p>
      </details>

      <div class="cp-chips"><span>Strong Centre</span><span>Residuary powers</span><span>Advisory jurisdiction</span></div>
    `
  },

  /* ─────────── 25 · QUESTION (Constitution of Canada, Q1) ─────────── */
  25: {
    questext: "The idea of a federation with a strong Centre in India has been borrowed from",
    options: ["Canada","USA","Australia","Ireland"],
    correct: "1",
    exptext: "✅ Canada. 📌 Canada leans towards the Centre; the USA and Australia lean towards the states. ❌ Ireland gave DPSP, not the federal tilt."
  },

  /* ─────────── 26 · QUESTION (Constitution of Canada, Q2) ─────────── */
  26: {
    questext: "Which Constitution inspired the provision of residuary powers being given to the Centre in India?",
    options: ["USA","Australia","Canada","South Africa"],
    correct: "3",
    exptext: "✅ Canada. 📌 Subjects not in any list go to Parliament. ❌ In the USA and Australia the residuary powers belong to the states; South Africa gave the amendment procedure."
  },

  /* ─────────── 27 · QUESTION (Constitution of Canada, Q3) ─────────── */
  27: {
    questext: "Which of the following are borrowed from Canada? 1. Advisory jurisdiction of the Supreme Court 2. Concurrent List 3. Residuary powers with the Centre",
    options: ["1 and 3 only","1 and 2 only","2 and 3 only","1, 2 and 3"],
    correct: "1",
    exptext: "✅ Advisory jurisdiction and residuary powers come from Canada. 📌 Canada = Centre, residuary, advisory. ❌ The Concurrent List is from Australia, so statement 2 is wrong."
  },

  /* ─────────── 28 · QUESTION (Constitution of Canada, Q4) ─────────── */
  28: {
    questext: "Under Article 143, the President can seek the opinion of the Supreme Court on a question of law or fact of public importance. This advisory jurisdiction is borrowed from",
    options: ["USA","Canada","Britain","Ireland"],
    correct: "2",
    exptext: "✅ Canada. 📌 The President is not bound to accept the opinion. ❌ The USA courts do not give advisory opinions; Britain and Ireland are linked with other features."
  },

  /* ─────────── 29 · CONCEPT PAGE — Constitution of Ireland ─────────── */
  29: {
    type: "concept",
    icon: "☘️",
    accent: "#22c55e",
    pauseTimer: true,
    title: "Constitution of Ireland",
    html: `
      <p class="cp-lead">Ireland's Constitution of 1937 gave India three ideas: a list of <u>goals for the state</u>, a <u>method to elect the President</u> and a way to put <u>experts into the Rajya Sabha</u>.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>3</b><span>Features taken</span></div>
        <div class="cp-stat"><b>Part IV</b><span>Directive Principles</span></div>
        <div class="cp-stat"><b>12</b><span>Nominated Rajya Sabha members</span></div>
      </div>

      <div class="cp-divider">What India took</div>

      <div class="cp-grid c3">
        <div class="cp-card blue"><div class="cp-card-title">🧭 Directive Principles of State Policy</div>Guidelines for the government to build a welfare state (Part IV). Courts cannot force the state to follow them.</div>
        <div class="cp-card green"><div class="cp-card-title">🗳️ Method of presidential election</div>The President is elected indirectly by an electoral college of elected MPs and MLAs (Art. 54).</div>
        <div class="cp-card amber"><div class="cp-card-title">🖋️ Nomination of Rajya Sabha members</div>The President nominates 12 persons with special knowledge in literature, science, art or social service (Art. 80).</div>
      </div>

      <div class="cp-vs">
        <div class="good"><h4>✅ Correct</h4>DPSP in Part IV → <b>Ireland</b>.</div>
        <div class="bad"><h4>❌ Trap</h4>Fundamental <u>Duties</u> are in Part IV-A and come from the <b>former USSR</b>.</div>
      </div>

      <div class="cp-note trap"><b>Nominated</b> Rajya Sabha members → <u>Ireland</u>. <b>Elected</b> Rajya Sabha members by proportional representation → <u>South Africa</u>.</div>

      <div class="cp-note exam">Asked as: “<u>DPSP</u> is borrowed from …” → <b>Ireland</b>. Also “method of presidential election”.</div>

      <div class="cp-mnemonic"><b>I</b>reland = <b>I</b> give <b>D</b>irections: DPSP, President election, nominated members.</div>

      <details class="cp-collapse">
        <summary>Why were DPSP not made enforceable?</summary>
        <p>The country was poor and the state could not promise everything at once. So these goals guide the state but cannot be enforced in court like fundamental rights.</p>
      </details>

      <div class="cp-chips"><span>DPSP</span><span>Presidential election</span><span>Rajya Sabha nomination</span></div>
    `
  },

  /* ─────────── 30 · QUESTION (Constitution of Ireland, Q1) ─────────── */
  30: {
    questext: "Directive Principles of State Policy in the Indian Constitution have been borrowed from the Constitution of",
    options: ["USA","Canada","Weimar Germany","Ireland"],
    correct: "4",
    exptext: "✅ Ireland. 📌 DPSP are in Part IV and are guidelines, not enforceable in court. ❌ The USA gave rights, Canada the strong Centre and Weimar the emergency idea."
  },

  /* ─────────── 31 · QUESTION (Constitution of Ireland, Q2) ─────────── */
  31: {
    questext: "The method of election of the President of India has been taken from the Constitution of",
    options: ["Ireland","USA","France","Canada"],
    correct: "1",
    exptext: "✅ Ireland. 📌 Ireland = Directives, presidential election and nominated members. ❌ France gave the republican idea; Canada and the USA are linked with other features."
  },

  /* ─────────── 32 · QUESTION (Constitution of Ireland, Q3) ─────────── */
  32: {
    questext: "Which of the following is NOT borrowed from the Constitution of Ireland?",
    options: ["Directive Principles of State Policy","Method of presidential election","Nomination of members to the Rajya Sabha by the President","Suspension of Fundamental Rights during an emergency"],
    correct: "4",
    exptext: "✅ Suspension of rights in an emergency is from the Weimar Constitution. 📌 Ireland has three features: DPSP, presidential election, nominated members. ❌ The other three are all from Ireland."
  },

  /* ─────────── 33 · QUESTION (Constitution of Ireland, Q4) ─────────── */
  33: {
    questext: "The nomination of members to the Rajya Sabha by the President and the election of Rajya Sabha members by proportional representation are borrowed from which constitutions, respectively?",
    options: ["South Africa and Ireland","Canada and Ireland","Ireland and Australia","Ireland and South Africa"],
    correct: "4",
    exptext: "✅ Nomination from Ireland; election by proportional representation from South Africa. 📌 Nominated = Ireland, elected = South Africa. ❌ The other options reverse the order or bring in Canada and Australia, which gave other features."
  },

  /* ─────────── 34 · CONCEPT PAGE — Weimar Constitution of Germany ─────────── */
  34: {
    type: "concept",
    icon: "🚨",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "Weimar Constitution of Germany",
    html: `
      <p class="cp-lead">Germany's Weimar Constitution (1919) allowed rights to be <u>suspended in an emergency</u>. India borrowed this idea so that the government can protect the country in a crisis.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>1</b><span>Feature taken</span></div>
        <div class="cp-stat"><b>1919</b><span>Year of Weimar Constitution</span></div>
        <div class="cp-stat"><b>Art. 359</b><span>Suspension of enforcement of rights</span></div>
      </div>

      <div class="cp-divider">What India took</div>

      <div class="cp-grid c2">
        <div class="cp-card red"><div class="cp-card-title">⛔ Suspension of fundamental rights during emergency</div>In a national emergency, the right to go to court for certain fundamental rights can be suspended.</div>
        <div class="cp-card blue"><div class="cp-card-title">🛡️ Safety valve</div>The idea is that during war or serious danger the state needs extra power, but only for a limited time.</div>
      </div>

      <table>
        <thead><tr><th>Part</th><th>Idea</th></tr></thead>
        <tbody>
          <tr><td>Fundamental rights (grant)</td><td>USA</td></tr>
          <tr><td>Suspension in emergency</td><td>Weimar Germany</td></tr>
        </tbody>
      </table>

      <div class="cp-vs">
        <div class="good"><h4>✅ Correct</h4>Grant of rights → <b>USA</b>. Suspension of rights in emergency → <b>Weimar Germany</b>.</div>
        <div class="bad"><h4>❌ Trap</h4>Both from the USA <b>(wrong)</b>.</div>
      </div>

      <div class="cp-note trap">Emergency powers in general come from the <u>1935 Act</u>. Only the <u>suspension of fundamental rights</u> in an emergency is linked to <b>Weimar</b>.</div>

      <div class="cp-note exam">One-line question: “<u>suspension of fundamental rights during emergency</u>” → <b>Weimar Constitution of Germany</b>.</div>

      <div class="cp-mnemonic"><b>W</b>eimar = <b>W</b>arning time: rights go on hold.</div>

      <details class="cp-collapse">
        <summary>Which rights are never suspended?</summary>
        <p>The right to life and personal liberty (Art. 21) and protection in respect of conviction for offences (Art. 20) cannot be suspended even in an emergency.</p>
      </details>

      <div class="cp-chips"><span>Emergency</span><span>Fundamental rights</span><span>Weimar</span></div>
    `
  },

  /* ─────────── 35 · QUESTION (Weimar Constitution of Germany, Q1) ─────────── */
  35: {
    questext: "Provision for the suspension of Fundamental Rights during an emergency was borrowed from",
    options: ["Constitution of USA","Weimar Constitution of Germany","Constitution of Canada","Constitution of Ireland"],
    correct: "2",
    exptext: "✅ Weimar Constitution of Germany. 📌 Weimar = Warning time: rights go on hold. ❌ The USA gave the rights themselves, Canada the strong Centre, Ireland the DPSP."
  },

  /* ─────────── 36 · QUESTION (Weimar Constitution of Germany, Q2) ─────────── */
  36: {
    questext: "Which of the following statements about Fundamental Rights is correct?",
    options: ["Both the grant and the suspension of Fundamental Rights are from the USA","The grant of Fundamental Rights is from the USA; their suspension during an emergency is from the Weimar Constitution","The grant of Fundamental Rights is from Ireland; their suspension is from the Weimar Constitution","The grant of Fundamental Rights is from the Weimar Constitution; their suspension is from the USA"],
    correct: "2",
    exptext: "✅ Grant from the USA, suspension in an emergency from Weimar. 📌 Learn them as a pair: USA gives, Weimar suspends. ❌ Ireland gave DPSP, not rights, and the other options reverse the roles."
  },

  /* ─────────── 37 · QUESTION (Weimar Constitution of Germany, Q3) ─────────── */
  37: {
    questext: "The Weimar Constitution of Germany was adopted in the year",
    options: ["1925","1933","1919","1945"],
    correct: "3",
    exptext: "✅ 1919. 📌 The Weimar Republic lasted from 1919 to 1933. ❌ 1933 is when the Weimar Republic ended and 1945 is the end of the Second World War."
  },

  /* ─────────── 38 · CONCEPT PAGE — Constitution of Australia ─────────── */
  38: {
    type: "concept",
    icon: "🦘",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "Constitution of Australia",
    html: `
      <p class="cp-lead">Australia gave India the idea of a <u>shared list of subjects</u> and of <u>free movement of trade</u> across the country, which help a big federation work smoothly.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>3</b><span>Features taken</span></div>
        <div class="cp-stat"><b>Art. 254</b><span>Centre prevails in conflict</span></div>
        <div class="cp-stat"><b>Part XIII</b><span>Trade and commerce</span></div>
      </div>

      <div class="cp-divider">What India took</div>

      <div class="cp-grid c3">
        <div class="cp-card blue"><div class="cp-card-title">🤝 Concurrent List</div>Subjects on which both Centre and states can make laws, such as education and forests.</div>
        <div class="cp-card green"><div class="cp-card-title">🚚 Trade and commerce provisions</div>Goods and people can move freely across states, based on Part XIII (Art. 301 to 307).</div>
        <div class="cp-card amber"><div class="cp-card-title">🪑 Joint sitting</div>If the two Houses disagree on an ordinary Bill, a joint sitting is held (Art. 108).</div>
      </div>

      <div class="cp-vs">
        <div class="good"><h4>✅ Correct</h4>Concurrent List → <b>Australia</b>.</div>
        <div class="bad"><h4>❌ Trap</h4>Residuary powers → Australia <b>(wrong)</b>. In Australia these belong to the states. India took them from Canada.</div>
      </div>

      <div class="cp-note tip">If both Centre and state make a law on a Concurrent subject and they clash, the <b>Centre's law</b> prevails (Art. 254).</div>

      <div class="cp-note exam">Asked as: “<u>Concurrent List</u> is borrowed from …” → <b>Australia</b>.</div>

      <div class="cp-mnemonic"><b>A</b>ustralia = <b>A</b>ll-share list: Concurrent, trade, joint sitting.</div>

      <details class="cp-collapse">
        <summary>Why is a Concurrent List useful?</summary>
        <p>Some subjects need laws both from the Centre (for national uniformity) and from the states (for local needs). A shared list lets both act.</p>
      </details>

      <div class="cp-chips"><span>Concurrent List</span><span>Trade and commerce</span><span>Joint sitting</span></div>
    `
  },

  /* ─────────── 39 · QUESTION (Constitution of Australia, Q1) ─────────── */
  39: {
    questext: "The idea of the Concurrent List in the Indian Constitution is borrowed from the Constitution of",
    options: ["Australia","Canada","USA","Britain"],
    correct: "1",
    exptext: "✅ Australia. 📌 Australia = All-share list: Concurrent List, trade, joint sitting. ❌ Canada gave residuary powers to the Centre; the USA and Britain gave other ideas."
  },

  /* ─────────── 40 · QUESTION (Constitution of Australia, Q2) ─────────── */
  40: {
    questext: "The provisions on freedom of trade, commerce and intercourse (Part XIII) are inspired by the Constitution of",
    options: ["Canada","Australia","Ireland","former USSR"],
    correct: "2",
    exptext: "✅ Australia. 📌 Part XIII covers Articles 301 to 307. ❌ Canada gave the strong Centre, Ireland the DPSP and the USSR gave Fundamental Duties."
  },

  /* ─────────── 41 · QUESTION (Constitution of Australia, Q3) ─────────── */
  41: {
    questext: "Consider the following statements: 1. The Concurrent List is borrowed from Australia. 2. The joint sitting of the two Houses of Parliament is borrowed from Australia. 3. Residuary powers with the Centre are borrowed from Australia. Which of the statements given above is/are correct?",
    options: ["1 only","2 and 3 only","1, 2 and 3","1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Australia = Concurrent, trade, joint sitting. ❌ Statement 3 is wrong: in Australia the residuary powers belong to the states; India took them from Canada."
  },

  /* ─────────── 42 · CONCEPT PAGE — Constitution of South Africa ─────────── */
  42: {
    type: "concept",
    icon: "🌍",
    accent: "#f97316",
    pauseTimer: true,
    title: "Constitution of South Africa",
    html: `
      <p class="cp-lead">South Africa's Constitution is linked in exam lists with two things in India: <u>how the Constitution is amended</u> and <u>how Rajya Sabha members are elected</u>.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>2</b><span>Features taken</span></div>
        <div class="cp-stat"><b>Art. 368</b><span>Amendment procedure</span></div>
        <div class="cp-stat"><b>PR</b><span>Proportional representation</span></div>
      </div>

      <div class="cp-divider">What India took</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">✏️ Amendment procedure (Art. 368)</div>A Constitution Amendment Bill must be passed by a special majority in Parliament.</div>
        <div class="cp-card green"><div class="cp-card-title">🗳️ Election of Rajya Sabha members</div>They are elected by the elected members of the State Legislative Assemblies using proportional representation by single transferable vote.</div>
      </div>

      <div class="cp-note remember"><b>Special majority</b> = a majority of the <u>total membership</u> of the House <b>and</b> <u>two-thirds</u> of the members present and voting.</div>

      <div class="cp-vs">
        <div class="good"><h4>✅ Correct</h4>Amendment needs <b>special majority</b> in each House.</div>
        <div class="bad"><h4>❌ Trap</h4>A simple majority is enough <b>(wrong)</b> for a Constitution Amendment Bill.</div>
      </div>

      <div class="cp-note trap"><b>Nominated</b> Rajya Sabha members → <u>Ireland</u>. <b>Elected by proportional representation</b> → <u>South Africa</u>.</div>

      <div class="cp-note exam">Asked as: “<u>amendment procedure</u> is borrowed from …” → <b>South Africa</b>.</div>

      <div class="cp-mnemonic"><b>S</b>outh Africa = <b>S</b>pecial majority + <b>S</b>TV election.</div>

      <details class="cp-collapse">
        <summary>Do all amendments need state approval?</summary>
        <p>No. Only certain amendments, such as those affecting the federal structure, also need approval of at least half of the state legislatures. Most amendments need only the special majority in Parliament.</p>
      </details>

      <div class="cp-chips"><span>Amendment Art. 368</span><span>Special majority</span><span>Proportional representation</span></div>
    `
  },

  /* ─────────── 43 · QUESTION (Constitution of South Africa, Q1) ─────────── */
  43: {
    questext: "The procedure for amendment of the Constitution (Article 368) has been borrowed from the Constitution of",
    options: ["USA","Canada","South Africa","Ireland"],
    correct: "3",
    exptext: "✅ South Africa. 📌 South Africa = Special majority + proportional representation. ❌ The USA, Canada and Ireland gave other features such as rights, strong Centre and DPSP."
  },

  /* ─────────── 44 · QUESTION (Constitution of South Africa, Q2) ─────────── */
  44: {
    questext: "The election of Rajya Sabha members by the elected members of State Legislative Assemblies on the basis of proportional representation is borrowed from",
    options: ["Ireland","Australia","Weimar Germany","South Africa"],
    correct: "4",
    exptext: "✅ South Africa. 📌 Elected by proportional representation = South Africa; nominated = Ireland. ❌ Ireland gave nomination, Australia the Concurrent List and Weimar the emergency idea."
  },

  /* ─────────── 45 · QUESTION (Constitution of South Africa, Q3) ─────────── */
  45: {
    questext: "A Constitution Amendment Bill under Article 368 must be passed in each House of Parliament by",
    options: ["A simple majority of members present and voting","A majority of the total membership of the House and two-thirds of the members present and voting","Two-thirds of the total membership of the House only","Three-fourths of the total membership of the Lok Sabha only"],
    correct: "2",
    exptext: "✅ A majority of the total membership plus two-thirds of the members present and voting, called a special majority. 📌 Both conditions must be met. ❌ A simple majority is too low, and the other options state conditions the Constitution does not use."
  },

  /* ─────────── 46 · CONCEPT PAGE — Constitution of France ─────────── */
  46: {
    type: "concept",
    icon: "🗼",
    accent: "#84cc16",
    pauseTimer: true,
    title: "Constitution of France",
    html: `
      <p class="cp-lead">France gave India the idea of a <u>republic</u>, where the head of state is elected and not a king, and the famous trio of <b>Liberty, Equality and Fraternity</b>.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>1</b><span>Republican system</span></div>
        <div class="cp-stat"><b>3</b><span>Ideals in the Preamble</span></div>
      </div>

      <div class="cp-divider">What India took</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🏛️ Republican system</div>The head of state (the President) is elected and not hereditary.</div>
        <div class="cp-card green"><div class="cp-card-title">🌟 Liberty, Equality, Fraternity</div>These three ideals appear in the Preamble of the Indian Constitution.</div>
      </div>

      <table>
        <thead><tr><th>Preamble ideal</th><th>Source</th></tr></thead>
        <tbody>
          <tr><td>Liberty, Equality, Fraternity</td><td>France</td></tr>
          <tr><td>Justice (social, economic and political)</td><td>Former USSR</td></tr>
        </tbody>
      </table>

      <div class="cp-vs">
        <div class="good"><h4>✅ Correct</h4>Liberty, Equality, Fraternity → <b>France</b>.</div>
        <div class="bad"><h4>❌ Trap</h4>Justice → France <b>(wrong)</b>. The ideal of justice is linked with the former USSR.</div>
      </div>

      <div class="cp-note trap">The USA is also a republic, but in exam lists the <u>Republican system</u> is credited to <b>France</b>.</div>

      <div class="cp-note exam">Asked as: “<u>liberty, equality and fraternity</u>” → <b>France</b>.</div>

      <div class="cp-mnemonic"><b>F</b>rance = <b>F</b>reedom trio: <b>L</b>-<b>E</b>-<b>F</b>.</div>

      <details class="cp-collapse">
        <summary>Where did the French ideals come from?</summary>
        <p>They come from the French Revolution of 1789, which fought against kings and old privileges.</p>
      </details>

      <div class="cp-chips"><span>Republic</span><span>Liberty</span><span>Equality</span><span>Fraternity</span></div>
    `
  },

  /* ─────────── 47 · QUESTION (Constitution of France, Q1) ─────────── */
  47: {
    questext: "The Republican system of government in India has been taken from the Constitution of",
    options: ["France","Britain","Canada","Australia"],
    correct: "1",
    exptext: "✅ France. 📌 In a republic the head of state is elected, not a king or queen. ❌ Britain, Canada and Australia have a monarch as head of state."
  },

  /* ─────────── 48 · QUESTION (Constitution of France, Q2) ─────────── */
  48: {
    questext: "The ideals of Liberty, Equality and Fraternity in the Preamble are inspired by the Constitution of",
    options: ["USA","former USSR","France","Ireland"],
    correct: "3",
    exptext: "✅ France. 📌 France = Freedom trio: Liberty, Equality, Fraternity. ❌ The USSR is linked with the ideal of justice and Ireland with DPSP."
  },

  /* ─────────── 49 · QUESTION (Constitution of France, Q3) ─────────── */
  49: {
    questext: "Which of the following statements about the ideals in the Preamble is correct?",
    options: ["Liberty, Equality and Fraternity are from the former USSR and Justice is from France","Liberty, Equality and Fraternity are from the USA and Justice is from France","Liberty, Equality and Fraternity are from France and Justice is from the former USSR","Liberty, Equality and Fraternity are from France and Justice is from Ireland"],
    correct: "3",
    exptext: "✅ The trio is from France and Justice is from the former USSR. 📌 Learn them as a pair: France = trio, USSR = justice. ❌ The other options swap the sources or bring in the USA or Ireland."
  },

  /* ─────────── 50 · CONCEPT PAGE — Constitution of former USSR ─────────── */
  50: {
    type: "concept",
    icon: "⚒️",
    accent: "#475569",
    pauseTimer: true,
    title: "Constitution of former USSR",
    html: `
      <p class="cp-lead">The former USSR gave India two ideas: the <u>duties of every citizen</u> and the <u>ideal of justice</u> in the Preamble.</p>

      <div class="cp-stats">
        <div class="cp-stat"><b>2</b><span>Features taken</span></div>
        <div class="cp-stat"><b>Part IV-A</b><span>Fundamental Duties</span></div>
        <div class="cp-stat"><b>Art. 51A</b><span>Article on duties</span></div>
      </div>

      <div class="cp-divider">What India took</div>

      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">📌 Fundamental Duties</div>Duties of citizens towards the nation. Added by the 42nd Amendment in 1976 as Part IV-A (Art. 51A).</div>
        <div class="cp-card green"><div class="cp-card-title">⚖️ Ideals of justice in Preamble</div>Social, economic and political justice.</div>
      </div>

      <table>
        <thead><tr><th>Idea</th><th>Source</th></tr></thead>
        <tbody>
          <tr><td>Fundamental Duties</td><td>Former USSR</td></tr>
          <tr><td>Justice (Preamble)</td><td>Former USSR</td></tr>
          <tr><td>DPSP</td><td>Ireland</td></tr>
          <tr><td>Fundamental Rights</td><td>USA</td></tr>
        </tbody>
      </table>

      <div class="cp-note info">The original 1976 list had 10 duties. A later amendment (86th, 2002) added the duty of parents to provide education to children aged 6 to 14, so there are now <b>11</b>.</div>

      <div class="cp-note trap">Rights = <u>USA</u>, Directive Principles = <u>Ireland</u>, Duties = <b>former USSR</b>. Learn them as a trio.</div>

      <div class="cp-note exam">Asked as: “<u>Fundamental Duties</u> are taken from …” → <b>former USSR</b> (and the Amendment asked is the <b>42nd</b>).</div>

      <div class="cp-mnemonic"><b>U</b>SSR = <b>U</b>s, the citizens, have <b>D</b>uties.</div>

      <details class="cp-collapse">
        <summary>Why were duties added later?</summary>
        <p>The framers focused on rights first. In 1976 duties were added so that citizens also remember their responsibility to the nation. They are not enforceable in court.</p>
      </details>

      <div class="cp-chips"><span>Fundamental Duties</span><span>Preamble</span><span>42nd Amendment</span></div>
    `
  },

  /* ─────────── 51 · QUESTION (Constitution of former USSR, Q1) ─────────── */
  51: {
    questext: "Fundamental Duties in the Indian Constitution have been borrowed from the Constitution of",
    options: ["France","former USSR","Ireland","South Africa"],
    correct: "2",
    exptext: "✅ Former USSR. 📌 Rights = USA, DPSP = Ireland, Duties = USSR. ❌ France gave the republic, Ireland the DPSP and South Africa the amendment procedure."
  },

  /* ─────────── 52 · QUESTION (Constitution of former USSR, Q2) ─────────── */
  52: {
    questext: "Fundamental Duties were added to the Constitution by which Amendment?",
    options: ["44th Amendment, 1978","86th Amendment, 2002","61st Amendment, 1988","42nd Amendment, 1976"],
    correct: "4",
    exptext: "✅ 42nd Amendment, 1976, which added Part IV-A (Article 51A). 📌 Learn 42nd = Duties. ❌ The 86th Amendment added one more duty later; the 44th and 61st deal with other matters."
  },

  /* ─────────── 53 · QUESTION (Constitution of former USSR, Q3) ─────────── */
  53: {
    questext: "The ideal of Justice (social, economic and political) in the Preamble has been taken from the",
    options: ["Constitution of former USSR","Constitution of France","Constitution of USA","Constitution of Ireland"],
    correct: "1",
    exptext: "✅ Constitution of former USSR. 📌 France = Liberty, Equality, Fraternity; USSR = Justice. ❌ France gave the other three ideals, and the USA and Ireland gave other features."
  }
};

/* ════════════════════════════════════════════════════════════════
   IMAGE LIST (which image belongs to which entry)
     images/f4a7a7b9-3b24-4a37-8137-eec1788c1d63.png → ENTRY 1 (class overview, "thumb" field) — not numbered
     images/8721dc8d-7e95-4e31-84f3-6ec6f3585c59.png         → ENTRY 2 (3. Different Sources of Indian Constitution) — hub diagram

   FIGURE PROMPTS  (copy each line into ChatGPT, save the result under the given name)
   images/f4a7a7b9-3b24-4a37-8137-eec1788c1d63.png: Create a 16:9 landscape background image for a YouTube thumbnail, 1920x1080 px, ultra-sharp, vibrant cinematic 3D illustration in deep indigo, violet and electric-blue tones (accent #6366f1) with warm gold highlights. Dark edges and a bright soft glow behind the right-centre of the frame, where a teacher's photo will be placed later. Spread a few soft, glowing, slightly blurred decorative 3D elements around the frame, mostly behind the right side: an open book of law with a golden scale of justice, a glowing parchment scroll, a pillar of a parliament building and a gold seal. Keep the LEFT 62% of the frame calm, darker and uncluttered because the red banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere in the image. Clean, most beautiful, colorful, professional, high-contrast composition.
   images/8721dc8d-7e95-4e31-84f3-6ec6f3585c59.png: Create a clean, flat vector hub-and-spoke diagram on a dark navy background (#0f172a), 16:9 landscape, 1200x675 px. In the centre a large rounded box with the exact text "INDIAN CONSTITUTION". Around it five rounded boxes connected by thick arrows pointing INTO the centre box, with these exact short English labels: "GoI ACT 1935" (largest and golden, with the small word "SKELETON"), "BRITAIN", "USA", "CANADA", "IRELAND". Use VERY LARGE bold white sans-serif text, thick lines, simple shapes, bright distinct colours for each box, lots of empty space, so it stays readable when shown small. No people, no logos, no watermarks, no flags, no other text.
   ════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   CHANGE LOG (corrections / additions made to the book's content)
   1. Book: "Out of 395 Articles ..." — 395 was the count in the ORIGINAL Constitution (1950); the Constitution now has more Articles. Pages say "original 395 Articles".
   2. South Africa: the book says "Amendment with 2/3rd majority in Parliament". Written as the correct SPECIAL MAJORITY of Art. 368 (majority of total membership AND two-thirds of members present and voting). Rajya Sabha election written as "proportional representation by single transferable vote".
   3. South Africa: its current Constitution is from 1996, after India's. Exam lists still credit South Africa, so it is kept as given in the book. (VERIFY if your exam wants this note.)
   4. Weimar: added year 1919 and Art. 359 / Arts. 20 and 21 (rights not suspended) for context.
   5. Added Article numbers for clarity: Art. 13, 14, 51A, 54, 64 (Vice-President as Rajya Sabha chairman), 80, 108, 124/217 (judge removal, not numbered in text), 143, 148, 248, 254, 301-307, 358/359, 368.
   6. Added beyond the book: Canada - Governors appointed by the Centre; Australia - joint sitting of the two Houses (Art. 108); GoI Act 1935 - Public Service Commissions and Federal Court; USSR - 42nd Amendment (1976), Art. 51A, 11 duties (86th Amendment, 2002).
   7. Added years for the sequence question: USA 1789, Weimar 1919, Government of India Act 1935, Ireland 1937.
   8. Added exam-convention note: the Concurrent List is credited to Australia (the 1935 Act also had a Concurrent List). Residuary powers: Canada (USA and Australia keep them with the states).
   9. CAG is credited to Britain as in the book; some sources link the office with the 1935 Act. (VERIFY against your exam's standard source.)
   10. "Constitution of former USSR" keeps the word "former" because the USSR ended in 1991.
   11. Out of scope and ignored: Constituent Assembly details and committees (page 206, previous topic) and "4. Important Parts, Articles of the Constitution" (page 207, next topic).
   ════════════════════════════════════════════════════════════════ */
