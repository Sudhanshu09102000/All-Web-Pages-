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

/* ── MISSING-IMAGE SNIPPET: when an image file is not uploaded yet, a small "Copy prompt" button appears in its place ── */
(function () {
  var T = function (a, o) {
    return "Create a 16:9 landscape background image for a YouTube thumbnail, 1920×1080 px, ultra-sharp, in a premium, classic, refined editorial style (NOT cartoonish: no cartoon, toy-like, clip-art, comic or glossy cartoon-3D look). Deep midnight-navy and near-black base with a smooth, subtle gradient in the accent colour " + a + " and restrained champagne-gold highlights; soft cinematic lighting with a gentle glow behind the right-centre of the frame, where a teacher's photo will be placed later; fine dark vignette, very subtle fine grain, realistic shallow depth of field. Place only these elegant, realistic, softly blurred objects, mostly on the right and in the back: " + o + ", rendered matte or brushed-metal with natural reflections. Do NOT add any star, starburst or explosion sticker. Add ONE blank premium emblem: a refined, classic round seal with a thin champagne-gold rim, fine engraved double border and a smooth, completely EMPTY dark centre with a faint glow, realistic brushed-metal / enamel finish, about 20% of the frame height, placed near the lower centre (about 60% from the left and 72% from the top) so I can write my own text inside it later. Keep the LEFT 62% of the frame calm, dark and uncluttered because a banner and big title lines will be overlaid there later. Absolutely no text, letters, numbers, logos, watermarks, channel names or human faces anywhere (the emblem stays blank). Sophisticated, balanced, high-contrast, professional composition.";
  };
  var F = function (d) {
    return "Create a 16:9 image, 1200×675 px: a clean flat vector diagram on a dark navy background. " + d + " Use very few labels in exact short English, VERY LARGE bold text, thick lines and simple shapes, so it stays readable when shown small (about 420 px wide). No people, no logos, no watermarks. If it is geography, draw a schematic, not a realistic map.";
  };
  function getPrompt(src) {
    var p = (window.IMG_PROMPTS || {})[src];
    if (!p) return "";
    return typeof p === "string" ? p : (p.t === "thumb" ? T(p.accent, p.objects) : F(p.about));
  }
  function copy(text, done) {
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  }
  function swap(img) {
    if (img.getAttribute("data-ph")) return;
    var src = img.getAttribute("src") || "";
    if (!getPrompt(src)) return;
    img.setAttribute("data-ph", "1");
    var hid = img.closest("[data-hidden]");
    if (hid) { hid.removeAttribute("data-hidden"); hid.style.removeProperty("display"); }
    var box = document.createElement("div");
    box.className = "cp-missing";
    box.setAttribute("translate", "no");
    box.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:9px;box-sizing:border-box;width:100%;max-width:420px;margin:10px auto;padding:14px 12px;border:1.5px dashed rgba(148,163,184,.75);border-radius:14px;background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(236,72,153,.09));text-align:center";
    var cap = document.createElement("div");
    cap.style.cssText = "font:600 11.5px/1.4 system-ui,sans-serif;opacity:.8;word-break:break-all";
    cap.textContent = "🖼️ Image missing · save as " + src;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-ph-src", src);
    btn.style.cssText = "cursor:pointer;border:0;border-radius:999px;padding:9px 20px;font:700 13px/1 system-ui,sans-serif;color:#fff;background:linear-gradient(135deg,#6366f1,#a855f7 55%,#ec4899);box-shadow:0 6px 16px rgba(99,102,241,.35)";
    btn.textContent = "📋 Copy prompt";
    box.appendChild(cap);
    box.appendChild(btn);
    if (img.parentNode) img.parentNode.replaceChild(box, img);
  }
  function sweep() {
    document.querySelectorAll("img").forEach(function (i) {
      if (i.complete && i.naturalWidth === 0 && i.getAttribute("src")) swap(i);
    });
  }
  document.addEventListener("error", function (e) {
    if (e.target && e.target.tagName === "IMG") swap(e.target);
  }, true);
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[data-ph-src]") : null;
    if (!b) return;
    e.preventDefault();
    e.stopPropagation();
    var label = "📋 Copy prompt";
    copy(getPrompt(b.getAttribute("data-ph-src")), function () {
      b.textContent = "✅ Copied!";
      setTimeout(function () { b.textContent = label; }, 1600);
    });
  });
  try { new MutationObserver(sweep).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  sweep();
})();

/* Subject: Polity · Chapter: Various_Sources_and_Salient_Features_of_the_Constitution
   17 concept pages (incl. overview) · 43 questions
   Source: RBE Polity class notes, pages 11-14 */

window.TEST_DATA = {

  /* ─────────── 1 · CLASS OVERVIEW ─────────── */
  1: {
    type: "concept",
    icon: "🎯",
    accent: "#6366f1",
    pauseTimer: true,
    title: "Class Overview — Various Sources & Salient Features of the Constitution",
    thumb: {
      image: "images/General_Awareness/Polity/Various_Sources_and_Salient_Features_of_the_Constitution/thumbnail.png",
      banner: "ALL COMPETITIVE EXAMS",
      line1: "SALIENT FEATURES",
      line2: "OF THE CONSTITUTION",
      line3: "SOURCES TABLE",
      badge: "FULL CLASS",
      ribbon: "POLITY • SOURCES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Salient Features & Sources of Indian Constitution | Polity for SSC, UPSC, Banking",
      altTitles: [
        "Sources of Indian Constitution Table — Borrowed Features Trick | Polity",
        "Salient Features of Indian Constitution in One Class | Polity",
        "Federal vs Unitary Features + Emergency + FR, DPSP, FD | Polity Class"
      ],
      description:
"The Indian Constitution is the most-asked Polity topic in every exam, and its salient features and borrowed sources decide many easy marks. In this full class you will learn all 16 features and the complete source table without confusion.\n\n" +
"📌 IN THIS CLASS\n✅ Lengthiest written Constitution — 395 Articles to today's size\n✅ Sources: GoI Act 1935, British, US, Irish, Canadian, Australian and more\n✅ Rigid + flexible, federal with unitary bias, parliamentary form\n✅ Fundamental Rights, DPSP and Fundamental Duties\n✅ Emergency provisions, three-tier government and co-operative societies\n✅ 43 practice questions with explanations\n\n" +
"⏱️ CHAPTERS\n00:00 Class overview\n00:00 Lengthiest Written Constitution\n00:00 Drawn From Various Sources\n00:00 Salient features 3 to 16\n00:00 Practice\n\n" +
"🎯 Best for SSC CGL, UPSC Prelims, Banking, Railways and Defence exams.\n\n👍 Like, share, subscribe and comment “DONE” after the practice questions.\n\n#Polity #IndianConstitution #SSCCGL #UPSC",
      tags: ["indian polity", "salient features constitution", "sources of indian constitution", "borrowed features constitution", "indian constitution", "polity full class", "ssc cgl polity", "upsc polity", "polity for all exams", "constitution features", "polity questions", "polity tricks", "fundamental rights", "dpsp", "fundamental duties", "emergency provisions", "parliamentary system", "federal and unitary", "government of india act 1935", "polity class", "polity mcq", "ssc polity", "upsc prelims polity", "banking polity", "railways polity", "full class"],
      hashtags: ["Polity", "IndianConstitution", "SSCCGL", "UPSC"],
      thumbText: "SALIENT FEATURES OF THE CONSTITUTION",
      pinnedComment: "📌 Attempt all 43 questions in the class and write your score below. Which source-country pair confused you most? 👇",
      communityPost: "🏛️ Polity class is live: Salient Features and Sources of the Indian Constitution — full source table, tricks and 43 practice questions. Tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Lengthiest Written Constitution\n00:00 Drawn From Various Sources\n00:00 Salient features 3 to 16\n00:00 Practice",
      playlist: "Polity — Full Classes for Competitive Exams"
    },
    html: `
      <p class="cp-lead">Today's class covers the <u>16 salient features of the Indian Constitution</u> and the <u>countries it borrowed from</u> — a topic that returns in almost every Polity paper.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>17</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>43</b><span>Practice questions</span></div>
        <div class="cp-stat"><b>16</b><span>Key features</span></div>
        <div class="cp-stat"><b>~40 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>1. Lengthiest Written Constitution</b> — size then and now.</li>
        <li><b>2. Drawn From Various Sources</b> — who gave what.</li>
        <li><b>3–4.</b> Rigidity + flexibility; federal with unitary bias.</li>
        <li><b>5–6.</b> Parliamentary form; sovereignty + judicial supremacy.</li>
        <li><b>7.</b> Integrated and independent judiciary.</li>
        <li><b>8–10.</b> Fundamental Rights, DPSP, Fundamental Duties.</li>
        <li><b>11–13.</b> Secular state, adult franchise, independent bodies.</li>
        <li><b>14–16.</b> Emergency, three-tier government, co-operatives.</li>
      </ul>
      <div class="cp-divider">What you will be able to do</div>
      <div class="cp-grid c2">
        <div class="cp-card blue"><div class="cp-card-title">🌍 Match sources</div>Link each feature to its source country.</div>
        <div class="cp-card green"><div class="cp-card-title">⚖️ Federal or unitary</div>Sort features into the right group.</div>
        <div class="cp-card amber"><div class="cp-card-title">📜 Rights and duties</div>Recall articles, amendments and counts.</div>
        <div class="cp-card red"><div class="cp-card-title">🚨 Emergencies</div>Tell Articles 352, 356, 360 apart.</div>
      </div>
      <div class="cp-note exam"><b>Why it matters:</b> source-country matching and amendment numbers are repeated favourites in SSC, UPSC, Banking, Railways and Defence papers.</div>
      <div class="cp-note tip">The exam clock pauses on concept pages, so read each page calmly before the questions.</div>
      <div class="cp-chips"><span>Polity</span><span>Constitution</span><span>Sources</span><span>Salient Features</span></div>
    `
  },

  /* ─────────── 2 · CONCEPT PAGE ─────────── */
  2: {
    type: "concept",
    icon: "📜",
    accent: "#f59e0b",
    pauseTimer: true,
    title: "1. Lengthiest Written Constitution",
    html: `
<p class="cp-lead">India has the <u>lengthiest written Constitution in the world</u> — no other country has so many Articles and Schedules.</p>
<p>A <b>written</b> Constitution is one document (USA); an <b>unwritten</b> one rests on customs (Britain). India's is long because it also lays down administrative details, not only basic principles.</p>
<table><tr><th></th><th>Articles</th><th>Parts</th><th>Schedules</th></tr>
<tr><td><b>1949 (original)</b></td><td>395</td><td>22</td><td>8</td></tr>
<tr><td><b>Presently (2019)</b></td><td>about 470</td><td>25</td><td>12</td></tr></table>
<div class="cp-grid c2">
<div class="cp-card red"><div class="cp-card-title">➖ Removed since 1951</div>About 20 Articles and <b>Part VII</b>.</div>
<div class="cp-card green"><div class="cp-card-title">➕ Added since 1951</div>About 95 Articles, 4 Parts (<b>IVA, IXA, IXB, XIVA</b>) and 4 Schedules (<b>9, 10, 11, 12</b>).</div>
</div>
<div class="cp-note trap"><b>Trap:</b> Books count lettered Articles (like 21A) differently, so you may see 448 or about 470 for today. The <b>original 395 / 22 / 8</b> is fixed — do not mix it with today's 25 Parts and 12 Schedules.</div>
<div class="cp-note exam"><b>Exam note:</b> "Lengthiest written Constitution" is a favourite one-line fact.</div>
<div class="cp-mnemonic">Born <b>395-22-8</b>, grown to <b>470-25-12</b> — the four new Parts are <b>IVA, IXA, IXB, XIVA</b>.</div>
    `
  },

  /* ─────────── 3 · QUESTION ─────────── */
  3: {
    questext: "The original Constitution of India (1949) had how many Articles, Parts and Schedules?",
    options: ["395 Articles, 25 Parts, 12 Schedules", "395 Articles, 22 Parts, 8 Schedules", "470 Articles, 22 Parts, 8 Schedules", "465 Articles, 25 Parts, 12 Schedules"],
    correct: "2",
    exptext: "✅ 395 Articles, 22 Parts and 8 Schedules were in the original text. 📌 Today: 25 Parts and 12 Schedules. ❌ Options with 25 Parts or 12 Schedules describe the present size."
  },

  /* ─────────── 4 · QUESTION ─────────── */
  4: {
    questext: "Which Part of the Constitution has been deleted since 1951?",
    options: ["Part IVA", "Part IXA", "Part XIVA", "Part VII"],
    correct: "4",
    exptext: "✅ Part VII was deleted. 📌 Added Parts are IVA, IXA, IXB and XIVA. ❌ IVA, IXA and XIVA were added, not removed."
  },

  /* ─────────── 5 · CONCEPT PAGE ─────────── */
  5: {
    type: "concept",
    icon: "🌍",
    accent: "#3b82f6",
    pauseTimer: true,
    title: "2. Drawn From Various Sources",
    html: `
<p class="cp-lead">The framers did not copy blindly — they <u>picked the best ideas from many countries</u> and fitted them to India, like a <b>patchwork quilt on one strong base</b>.</p>
<div class="cp-grid c3">
<div class="cp-card blue"><div class="cp-card-title">🏗️ Structural</div>From the <b>GoI Act, 1935</b>.</div>
<div class="cp-card green"><div class="cp-card-title">💡 Philosophical</div>FR from <b>USA</b>; DPSP from <b>Ireland</b>.</div>
<div class="cp-card amber"><div class="cp-card-title">🏛️ Political</div>Mostly from <b>Britain</b>.</div>
</div>
<div class="cp-note info"><b>Most profound source:</b> the <b>Government of India Act, 1935</b> — federal scheme, judiciary, governors, emergency powers, Public Service Commissions. More than half of our Constitution resembles it.</div>
<div class="cp-fig"><img src="images/General_Awareness/Polity/Various_Sources_and_Salient_Features_of_the_Constitution/1.png" alt="Sources of the Constitution" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
<table><tr><th>Source</th><th>Features borrowed</th></tr>
<tr><td><b>GoI Act, 1935</b></td><td>Federal scheme, office of governor, judiciary, Public Service Commissions, emergency provisions, administrative details</td></tr>
<tr><td><b>British</b></td><td>Parliamentary government, rule of law, legislative procedure, single citizenship, cabinet system, prerogative writs, parliamentary privileges, bicameralism</td></tr>
<tr><td><b>US</b></td><td>Fundamental Rights, independent judiciary, judicial review, impeachment of President, removal of SC and HC judges, post of Vice-President</td></tr>
<tr><td><b>Irish</b></td><td>DPSP, nomination of Rajya Sabha members, method of electing the President</td></tr>
<tr><td><b>Canadian</b></td><td>Federation with strong Centre, residuary powers with Centre, governors appointed by Centre, advisory jurisdiction of SC</td></tr>
<tr><td><b>Australian</b></td><td>Concurrent List, freedom of trade, commerce and intercourse, joint sitting of the two Houses</td></tr>
<tr><td><b>Weimar (Germany)</b></td><td>Suspension of Fundamental Rights during Emergency</td></tr>
<tr><td><b>Soviet (USSR)</b></td><td>Fundamental Duties; ideal of justice (social, economic, political) in Preamble</td></tr>
<tr><td><b>French</b></td><td>Republic; liberty, equality, fraternity in Preamble</td></tr>
<tr><td><b>South African</b></td><td>Amendment procedure; election of Rajya Sabha members</td></tr>
<tr><td><b>Japanese</b></td><td>Procedure established by law</td></tr></table>
<div class="cp-note trap"><b>Trap:</b> Rajya Sabha appears <u>twice</u> — <b>nomination</b> from Ireland, <b>election</b> method from South Africa. Joint sitting is <b>Australian</b>, not British.</div>
<div class="cp-note exam"><b>Exam note:</b> "Feature → country" matching is asked almost every year.</div>
<div class="cp-mnemonic"><b>I</b>reland = <b>I</b>deals (DPSP) · <b>A</b>merica = <b>R</b>ights · <b>C</b>anada = strong <b>C</b>entre · <b>A</b>ustralia = <b>C</b>oncurrent · <b>S</b>oviet = <b>D</b>uties · <b>F</b>rance = <b>F</b>raternity</div>
    `
  },

  /* ─────────── 6 · QUESTION ─────────── */
  6: {
    questext: "Which feature of the Indian Constitution is borrowed from the Irish Constitution?",
    options: ["Directive Principles of State Policy", "Fundamental Rights", "Concurrent List", "Fundamental Duties"],
    correct: "1",
    exptext: "✅ DPSP come from Ireland. 📌 Ireland also gave Rajya Sabha nomination and the method of electing the President. ❌ Fundamental Rights are US, Concurrent List is Australia, Fundamental Duties are USSR."
  },

  /* ─────────── 7 · QUESTION ─────────── */
  7: {
    questext: "Which of the following is NOT correctly matched?",
    options: ["Residuary powers with the Centre – Canada", "Concurrent List – Australia", "Impeachment of the President – Britain", "Fundamental Duties – USSR"],
    correct: "3",
    exptext: "✅ Impeachment of the President is borrowed from the US, not Britain. 📌 Britain gave parliamentary government and the rule of law. ❌ The other three pairs are correct."
  },

  /* ─────────── 8 · QUESTION ─────────── */
  8: {
    questext: "Consider: 1. Procedure established by law – Japan. 2. Suspension of Fundamental Rights during Emergency – Weimar Germany. 3. Joint sitting of the two Houses – Canada. Which are correct?",
    options: ["1, 2 and 3", "2 and 3 only", "1 and 3 only", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Joint sitting of Parliament is from Australia. ❌ Statement 3 gives the wrong country, so options with 3 fail."
  },

  /* ─────────── 9 · QUESTION ─────────── */
  9: {
    questext: "Which source is described as the most profound influence on the Constitution?",
    options: ["Government of India Act, 1935", "British Constitution", "US Constitution", "Irish Constitution"],
    correct: "1",
    exptext: "✅ The Government of India Act, 1935 is the most profound material source. 📌 Federal scheme, governors, judiciary and emergency powers come from it. ❌ Britain gave the political system, but the 1935 Act shaped the structure."
  },

  /* ─────────── 10 · QUESTION ─────────── */
  10: {
    questext: "Which pair of features is borrowed from the South African Constitution?",
    options: ["Cabinet system and rule of law", "Republic and liberty–equality–fraternity", "Amendment procedure and election of Rajya Sabha members", "Advisory jurisdiction and residuary powers"],
    correct: "3",
    exptext: "✅ South Africa gave the amendment procedure and the method of electing Rajya Sabha members. 📌 Rajya Sabha nomination is Irish. ❌ Option 1 is British, 2 is French, 4 is Canadian."
  },

  /* ─────────── 11 · QUESTION ─────────── */
  11: {
    questext: "Which of these are borrowed from the US Constitution? 1. Judicial review. 2. Post of Vice-President. 3. Single citizenship. 4. Removal of High Court judges.",
    options: ["1, 2 and 3 only", "1, 2 and 4 only", "2, 3 and 4 only", "1, 2, 3 and 4"],
    correct: "2",
    exptext: "✅ Judicial review, Vice-President and removal of HC judges are American. 📌 Single citizenship is British. ❌ Options including 3 wrongly add a British feature."
  },

  /* ─────────── 12 · CONCEPT PAGE ─────────── */
  12: {
    type: "concept",
    icon: "⚖️",
    accent: "#8b5cf6",
    pauseTimer: true,
    title: "3. Blend of Rigidity and Flexibility",
    html: `
<p class="cp-lead">The Constitution is <u>neither fully rigid nor fully flexible</u> — a <b>synthesis of both</b>, so it can grow without being changed carelessly.</p>
<p>Article 368 gives two ways to amend, and some changes need no Article 368 at all.</p>
<div class="cp-grid c3">
<div class="cp-card green"><div class="cp-card-title">1️⃣ Special majority</div>Parliament alone amends these provisions (Article 368).</div>
<div class="cp-card amber"><div class="cp-card-title">2️⃣ Special majority + states</div>Also needs ratification by <b>half of the states</b> (Article 368).</div>
<div class="cp-card blue"><div class="cp-card-title">3️⃣ Simple majority</div>Ordinary law-style change; <b>outside</b> Article 368.</div>
</div>
<div class="cp-note trap"><b>Trap:</b> Article 368 lists only <u>two</u> types. The simple-majority route is <b>not</b> an Article 368 amendment.</div>
<div class="cp-note exam"><b>Exam note:</b> "How many types of amendment under Article 368?" → <b>two</b>.</div>
<div class="cp-mnemonic">Core rules are <b>hard</b> to change, routine rules are <b>easy</b> — <b>2 types + 1 easy route</b>.</div>
    `
  },

  /* ─────────── 13 · QUESTION ─────────── */
  13: {
    questext: "Which type of amendment falls outside Article 368?",
    options: ["Special majority of Parliament", "Special majority plus ratification by half of the states", "Simple majority of Parliament", "Unanimous vote of all states"],
    correct: "3",
    exptext: "✅ Simple-majority changes are not made under Article 368. 📌 Article 368 covers only the two special-majority types. ❌ Options 1 and 2 are exactly the Article 368 types."
  },

  /* ─────────── 14 · QUESTION ─────────── */
  14: {
    questext: "Consider: 1. The Constitution is purely rigid. 2. Article 368 provides for two types of amendments. 3. Some provisions can be amended by a simple majority. Which are correct?",
    options: ["2 and 3 only", "1 and 2 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 2 and 3 are correct. 📌 The Constitution is a blend of rigid and flexible. ❌ Statement 1 is wrong because it is not purely rigid."
  },

  /* ─────────── 15 · CONCEPT PAGE ─────────── */
  15: {
    type: "concept",
    icon: "🏢",
    accent: "#14b8a6",
    pauseTimer: true,
    title: "4. Federal System with Unitary Bias",
    html: `
<p class="cp-lead">India is a <u>federation with a strong unitary tilt</u> — the Centre is deliberately stronger so the country stays united.</p>
<div class="cp-grid c2">
<div class="cp-card blue"><div class="cp-card-title">🟦 Federal features</div>Two governments · division of powers · written Constitution · supremacy and rigidity · independent judiciary · bicameralism</div>
<div class="cp-card red"><div class="cp-card-title">🟥 Unitary features</div>Strong Centre · single Constitution · single citizenship · flexibility · integrated judiciary · governors appointed by Centre · all-India services · emergency provisions</div>
</div>
<table><tr><th>Scholar</th><th>Description</th></tr>
<tr><td>K.C. Wheare</td><td><b>quasi-federal</b></td></tr>
<tr><td>Morris Jones</td><td><b>bargaining federalism</b></td></tr>
<tr><td>Granville Austin</td><td><b>co-operative federalism</b></td></tr>
<tr><td>Ivor Jennings</td><td>federation with a <b>centralising tendency</b></td></tr></table>
<div class="cp-note trap"><b>Trap:</b> <u>Bicameralism is federal</u>; <u>single citizenship and integrated judiciary are unitary</u>. Do not swap them.</div>
<div class="cp-note exam"><b>Exam note:</b> Scholar → term matching is frequent; remember "Wheare = quasi".</div>
<div class="cp-mnemonic">Wheare = <b>W</b>eak federation (quasi) · Morris = <b>M</b>arket (bargaining) · Austin = <b>A</b>ssist (co-operative) · Jennings = <b>J</b>oins to Centre (centralising)</div>
    `
  },

  /* ─────────── 16 · QUESTION ─────────── */
  16: {
    questext: "Which of the following is NOT a federal feature of the Indian Constitution?",
    options: ["Division of powers", "Independent judiciary", "Written Constitution", "Single citizenship"],
    correct: "4",
    exptext: "✅ Single citizenship is a unitary feature. 📌 Federal: two governments, division of powers, written and supreme Constitution, independent judiciary, bicameralism. ❌ Options 1–3 are all federal."
  },

  /* ─────────── 17 · QUESTION ─────────── */
  17: {
    questext: "Who described the Indian system as \"bargaining federalism\"?",
    options: ["K.C. Wheare", "Morris Jones", "Granville Austin", "Ivor Jennings"],
    correct: "2",
    exptext: "✅ Morris Jones used \"bargaining federalism\". 📌 Wheare said \"quasi-federal\". ❌ Austin said co-operative federalism; Jennings said a federation with a centralising tendency."
  },

  /* ─────────── 18 · QUESTION ─────────── */
  18: {
    questext: "Granville Austin described Indian federalism as",
    options: ["co-operative federalism", "quasi-federal", "bargaining federalism", "a federation with a centralising tendency"],
    correct: "1",
    exptext: "✅ Granville Austin: co-operative federalism. 📌 Wheare = quasi-federal, Jones = bargaining. ❌ Option 4 is Ivor Jennings's description."
  },

  /* ─────────── 19 · QUESTION ─────────── */
  19: {
    questext: "Which of the following are unitary features? 1. Governors appointed by the Centre. 2. Bicameralism. 3. All-India services. 4. Integrated judiciary.",
    options: ["1, 2 and 3 only", "2, 3 and 4 only", "1, 3 and 4 only", "1, 2, 3 and 4"],
    correct: "3",
    exptext: "✅ Features 1, 3 and 4 are unitary. 📌 Bicameralism is a federal feature. ❌ Options with 2 wrongly include a federal feature."
  },

  /* ─────────── 20 · CONCEPT PAGE ─────────── */
  20: {
    type: "concept",
    icon: "🏛️",
    accent: "#ef4444",
    pauseTimer: true,
    title: "5. Parliamentary Form of Government",
    html: `
<p class="cp-lead">India chose the British <u>parliamentary (Westminster) system</u> over the American presidential one — at the <b>Centre and in the states</b>.</p>
<p>Other names: <b>responsible government</b> and <b>Cabinet government</b>. The idea: the executive stays in power only while the legislature supports it.</p>
<div class="cp-grid c2">
<div class="cp-card green"><div class="cp-card-title">✔ Key features</div>Nominal and real executives · majority party rule · collective responsibility · ministers are legislators</div>
<div class="cp-card amber"><div class="cp-card-title">✔ Leadership</div>PM / CM leads · lower house (Lok Sabha / Assembly) can be dissolved</div>
</div>
<div class="cp-note info">Because the Prime Minister is so central, it is often called <b>Prime Ministerial Government</b>.</div>
<div class="cp-note trap"><b>Trap:</b> Ministers <u>must be members of the legislature</u> — unlike the US system, where the executive sits outside the legislature.</div>
<div class="cp-mnemonic"><b>N</b>ominal + <b>R</b>eal, <b>M</b>ajority, <b>C</b>ollective, <b>M</b>inisters-in-House, <b>L</b>eader, <b>D</b>issolution</div>
    `
  },

  /* ─────────── 21 · QUESTION ─────────── */
  21: {
    questext: "Which of the following is NOT a feature of the parliamentary system?",
    options: ["Collective responsibility to the legislature", "Ministers who sit outside the legislature", "Majority party rule", "Dissolution of the lower house"],
    correct: "2",
    exptext: "✅ In the parliamentary system ministers must be legislators. 📌 Other features: nominal and real executives, PM leadership. ❌ Options 1, 3 and 4 are all genuine features."
  },

  /* ─────────── 22 · QUESTION ─────────── */
  22: {
    questext: "Why is the parliamentary system also called \"Prime Ministerial Government\"?",
    options: ["The PM is directly elected by the people", "The PM serves a fixed term", "The PM is the nominal head of the state", "The PM plays the central role in government"],
    correct: "4",
    exptext: "✅ The PM's central role gives it this name. 📌 Also called Westminster model, responsible and Cabinet government. ❌ The nominal head is the President, and the PM has no fixed term."
  },

  /* ─────────── 23 · CONCEPT PAGE ─────────── */
  23: {
    type: "concept",
    icon: "🔁",
    accent: "#06b6d4",
    pauseTimer: true,
    title: "6. Synthesis of Parliamentary Sovereignty & Judicial Supremacy",
    html: `
<p class="cp-lead">India blends two rival ideas — <u>Parliament's power</u> and <u>the court's power</u> — and keeps a balance between them.</p>
<div class="cp-grid c3">
<div class="cp-card amber"><div class="cp-card-title">🇬🇧 Britain</div>Parliamentary sovereignty.</div>
<div class="cp-card blue"><div class="cp-card-title">🇺🇸 USA</div>Judicial supremacy.</div>
<div class="cp-card green"><div class="cp-card-title">🇮🇳 India</div>A <b>synthesis</b> of both.</div>
</div>
<ul><li>The <b>Supreme Court</b> can declare laws unconstitutional through <b>judicial review</b>.</li><li><b>Parliament</b> can amend the major portion of the Constitution through its <b>constituent power</b>.</li></ul>
<div class="cp-note exam"><b>Exam note:</b> Do not confuse this with the "rigidity + flexibility" blend (feature 3).</div>
<div class="cp-mnemonic">Court <b>checks</b> laws, Parliament <b>amends</b> the Constitution — <b>checks and balance</b>.</div>
    `
  },

  /* ─────────── 24 · QUESTION ─────────── */
  24: {
    questext: "Judicial review together with Parliament's constituent power shows India's synthesis of",
    options: ["rigidity and flexibility", "parliamentary sovereignty and judicial supremacy", "federalism and unitarism", "rule of law and prerogative writs"],
    correct: "2",
    exptext: "✅ Judicial review (court) plus amending power (Parliament) balance both principles. 📌 Sovereignty is British; supremacy is American. ❌ Rigidity/flexibility is a different feature (Article 368)."
  },

  /* ─────────── 25 · CONCEPT PAGE ─────────── */
  25: {
    type: "concept",
    icon: "👨‍⚖️",
    accent: "#6366f1",
    pauseTimer: true,
    title: "7. Integrated and Independent Judiciary",
    html: `
<p class="cp-lead">India has <u>one single chain of courts</u> that is also <u>free from pressure</u> by the government.</p>
<ul class="cp-timeline">
<li><b>Supreme Court</b> — top</li>
<li><b>High Courts</b> — state level</li>
<li><b>Subordinate courts</b> — district and lower</li>
</ul>
<p>The same courts enforce <b>both central and state laws</b> (unlike the USA's dual system). The Supreme Court is a <b>federal court</b>, the <b>highest court of appeal</b>, <b>guarantor of Fundamental Rights</b> and <b>guardian of the Constitution</b>.</p>
<div class="cp-grid c2">
<div class="cp-card green"><div class="cp-card-title">🛡️ Independence checks</div>Security of tenure · fixed service conditions · expenses on Consolidated Fund of India</div>
<div class="cp-card teal"><div class="cp-card-title">🛡️ More checks</div>No legislative discussion on judges' conduct · ban on practice after retirement · power to punish contempt · separation from executive</div>
</div>
<div class="cp-note trap"><b>Trap:</b> The USA has a <u>dual</u> court system; India has an <u>integrated</u> one.</div>
<div class="cp-mnemonic"><b>T</b>enure, <b>S</b>ervice terms, <b>F</b>und, <b>N</b>o discussion, <b>B</b>an on practice, <b>C</b>ontempt, <b>S</b>eparation — "<b>TSF NBCS</b>"</div>
    `
  },

  /* ─────────── 26 · QUESTION ─────────── */
  26: {
    questext: "Which of the following is NOT a provision ensuring judicial independence?",
    options: ["Security of tenure", "Expenses charged on the Consolidated Fund of India", "Free discussion of judges' conduct in the legislature", "Ban on practice after retirement"],
    correct: "3",
    exptext: "✅ The legislature cannot discuss judges' conduct, so free discussion is not a safeguard. 📌 Tenure, fixed service terms and Consolidated Fund charges protect judges. ❌ Options 1, 2 and 4 are genuine safeguards."
  },

  /* ─────────── 27 · QUESTION ─────────── */
  27: {
    questext: "How does India's court system differ from that of the USA?",
    options: ["A single integrated system enforces both central and state laws", "Separate courts enforce central and state laws", "State Supreme Courts decide all state laws", "Courts cannot review laws"],
    correct: "1",
    exptext: "✅ India has one integrated hierarchy for all laws. 📌 The USA has a dual system. ❌ Options 2 and 3 describe the US model; option 4 contradicts judicial review."
  },

  /* ─────────── 28 · QUESTION ─────────── */
  28: {
    questext: "Which of these describe the Supreme Court of India? 1. Federal court. 2. Highest court of appeal. 3. Guarantor of Fundamental Rights. 4. Guardian of the Constitution.",
    options: ["1 and 2 only", "2 and 3 only", "1, 3 and 4 only", "1, 2, 3 and 4"],
    correct: "4",
    exptext: "✅ All four descriptions apply. 📌 It sits at the top of the integrated hierarchy. ❌ Options 1–3 leave out valid roles."
  },

  /* ─────────── 29 · CONCEPT PAGE ─────────── */
  29: {
    type: "concept",
    icon: "✊",
    accent: "#22c55e",
    pauseTimer: true,
    title: "8. Fundamental Rights",
    html: `
<p class="cp-lead">Part III guarantees <u>six Fundamental Rights</u> that courts can enforce — the backbone of <b>political democracy</b>.</p>
<table><tr><th>Right</th><th>Articles</th></tr>
<tr><td>Right to Equality</td><td>14–18</td></tr>
<tr><td>Right to Freedom</td><td>19–22</td></tr>
<tr><td>Right against Exploitation</td><td>23–24</td></tr>
<tr><td>Right to Freedom of Religion</td><td>25–28</td></tr>
<tr><td>Cultural and Educational Rights</td><td>29–30</td></tr>
<tr><td>Right to Constitutional Remedies</td><td>32</td></tr></table>
<p>They are <b>justiciable</b> (enforceable by courts). Some apply to citizens only and some to all persons.</p>
<div class="cp-note trap"><b>Trap:</b> Right to Property is no longer a Fundamental Right; it is now a legal right under Article 300A.</div>
<div class="cp-note exam"><b>Exam note:</b> Article ranges are asked directly — learn <b>14-19-23-25-29-32</b>.</div>
<div class="cp-mnemonic"><b>E</b>qual, <b>F</b>ree, <b>N</b>o exploitation, <b>R</b>eligion, <b>C</b>ulture, <b>R</b>emedy — "<b>E F N R C R</b>"</div>
    `
  },

  /* ─────────── 30 · QUESTION ─────────── */
  30: {
    questext: "Articles 19 to 22 deal with",
    options: ["Right to Equality", "Right against Exploitation", "Right to Freedom", "Right to Constitutional Remedies"],
    correct: "3",
    exptext: "✅ Articles 19–22 form the Right to Freedom. 📌 Equality is 14–18. ❌ Exploitation is 23–24 and Constitutional Remedies is Article 32."
  },

  /* ─────────── 31 · QUESTION ─────────── */
  31: {
    questext: "Which pair is correct?",
    options: ["Right to Equality – Articles 19–22", "Cultural and Educational Rights – Articles 29–30", "Right against Exploitation – Articles 25–28", "Freedom of Religion – Articles 23–24"],
    correct: "2",
    exptext: "✅ Cultural and Educational Rights are Articles 29–30. 📌 Religion is 25–28 and exploitation is 23–24. ❌ Options 1, 3 and 4 use wrong article ranges."
  },

  /* ─────────── 32 · QUESTION ─────────── */
  32: {
    questext: "Fundamental Rights are",
    options: ["non-justiciable and borrowed from Ireland", "justiciable and borrowed from Canada", "non-justiciable and promote social democracy", "justiciable and promote political democracy"],
    correct: "4",
    exptext: "✅ They are justiciable and promote political democracy; the idea is American. 📌 DPSP are the non-justiciable ones. ❌ Options 1 and 3 describe DPSP; option 2 names the wrong source."
  },

  /* ─────────── 33 · CONCEPT PAGE ─────────── */
  33: {
    type: "concept",
    icon: "🧭",
    accent: "#f97316",
    pauseTimer: true,
    title: "9. Directive Principles of State Policy (DPSP)",
    html: `
<p class="cp-lead">Part IV sets <u>goals for the government</u> to build a <b>welfare state</b> — social and economic democracy.</p>
<p>Dr. B.R. Ambedkar called DPSP a <b>"novel feature"</b> of the Constitution. They are <b>non-justiciable</b> (courts cannot enforce them) but <b>fundamental in governance</b>.</p>
<div class="cp-grid c3">
<div class="cp-card red"><div class="cp-card-title">🟥 Socialistic</div>Economic justice and equality.</div>
<div class="cp-card amber"><div class="cp-card-title">🟨 Gandhian</div>Ideas based on Gandhian principles.</div>
<div class="cp-card blue"><div class="cp-card-title">🟦 Liberal-Intellectual</div>Liberal, modern-state ideas.</div>
</div>
<div class="cp-vs"><div class="good"><b>Fundamental Rights</b><br>Part III · justiciable · political democracy</div><div class="bad"><b>DPSP</b><br>Part IV · non-justiciable · social and economic democracy</div></div>
<div class="cp-note exam"><b>Exam note:</b> Three categories, and the Irish source — both are frequent questions.</div>
<div class="cp-mnemonic"><b>S</b>ocialist + <b>G</b>andhian + <b>L</b>iberal = "<b>SGL</b>"; Rights = <b>III</b>, DPSP = <b>IV</b>.</div>
    `
  },

  /* ─────────── 34 · QUESTION ─────────── */
  34: {
    questext: "Who called the DPSP a \"novel feature\" of the Constitution?",
    options: ["Dr. B.R. Ambedkar", "Granville Austin", "Ivor Jennings", "K.C. Wheare"],
    correct: "1",
    exptext: "✅ Dr. B.R. Ambedkar used the phrase \"novel feature\". 📌 DPSP are in Part IV. ❌ The other three are scholars quoted for federalism and the 1935 Act."
  },

  /* ─────────── 35 · QUESTION ─────────── */
  35: {
    questext: "Which is NOT a category of DPSP?",
    options: ["Socialistic", "Gandhian", "Liberal-Intellectual", "Judicial"],
    correct: "4",
    exptext: "✅ There is no \"Judicial\" category. 📌 The three groups are Socialistic, Gandhian and Liberal-Intellectual. ❌ Options 1–3 are real categories."
  },

  /* ─────────── 36 · QUESTION ─────────── */
  36: {
    questext: "DPSP are enumerated in",
    options: ["Part III and are justiciable", "Part IV and are non-justiciable", "Part IV and are justiciable", "Part III and are non-justiciable"],
    correct: "2",
    exptext: "✅ DPSP are in Part IV and cannot be enforced by courts. 📌 Part III holds the justiciable Fundamental Rights. ❌ The other options mix up part number or enforceability."
  },

  /* ─────────── 37 · CONCEPT PAGE ─────────── */
  37: {
    type: "concept",
    icon: "📋",
    accent: "#ec4899",
    pauseTimer: true,
    title: "10. Fundamental Duties",
    html: `
<p class="cp-lead">Rights come with responsibilities — but the <u>original Constitution had no Fundamental Duties</u>.</p>
<ul class="cp-timeline">
<li><b>42nd Amendment Act, 1976</b> added them, on the <b>Swaran Singh Committee</b>'s recommendation.</li>
<li><b>86th Amendment Act, 2002</b> added one more duty.</li>
<li><b>Total now: eleven</b> duties.</li>
</ul>
<div class="cp-note info">Idea borrowed from the <b>USSR</b> Constitution.</div>
<div class="cp-note trap"><b>Trap:</b> The 42nd Amendment gave <u>ten</u> duties; the 86th made it <u>eleven</u>.</div>
<div class="cp-mnemonic"><b>42</b> gave ten, <b>86</b> gave the eleventh — "<b>42 → 10, 86 → 11</b>".</div>
    `
  },

  /* ─────────── 38 · QUESTION ─────────── */
  38: {
    questext: "Fundamental Duties were added on the recommendation of the",
    options: ["Swaran Singh Committee", "Sarkaria Commission", "Balwant Rai Mehta Committee", "Ashok Mehta Committee"],
    correct: "1",
    exptext: "✅ The Swaran Singh Committee recommended them, enacted by the 42nd Amendment, 1976. 📌 Source: USSR Constitution. ❌ The others relate to Centre-state relations and Panchayati Raj."
  },

  /* ─────────── 39 · QUESTION ─────────── */
  39: {
    questext: "The eleventh Fundamental Duty was added by the",
    options: ["42nd Amendment, 1976", "73rd Amendment, 1992", "86th Amendment, 2002", "97th Amendment, 2011"],
    correct: "3",
    exptext: "✅ The 86th Amendment Act, 2002 added the eleventh duty. 📌 The 42nd Amendment inserted the original duties. ❌ 73rd concerns Panchayats and 97th concerns co-operatives."
  },

  /* ─────────── 40 · CONCEPT PAGE ─────────── */
  40: {
    type: "concept",
    icon: "🕊️",
    accent: "#10b981",
    pauseTimer: true,
    title: "11. A Secular State",
    html: `
<p class="cp-lead">A secular state has <u>no official religion</u> — the state treats every faith equally.</p>
<ul><li>The word <b>"secular"</b> was added to the Preamble by the <b>42nd Amendment Act, 1976</b>.</li><li>The Constitution already stood for secularism through Fundamental Rights before the word was added.</li></ul>
<div class="cp-note trap"><b>Trap:</b> Secular does <u>not</u> mean anti-religion — it means <b>no state religion</b>.</div>
<div class="cp-mnemonic">The same amendment (<b>42nd, 1976</b>) gave Fundamental Duties and the word "secular".</div>
    `
  },

  /* ─────────── 41 · QUESTION ─────────── */
  41: {
    questext: "The word \"secular\" was added to the Preamble by the",
    options: ["44th Amendment, 1978", "61st Amendment, 1988", "86th Amendment, 2002", "42nd Amendment, 1976"],
    correct: "4",
    exptext: "✅ The 42nd Amendment Act, 1976 inserted \"secular\". 📌 The same amendment added Fundamental Duties. ❌ The 61st lowered the voting age and the 86th added a duty."
  },

  /* ─────────── 42 · QUESTION ─────────── */
  42: {
    questext: "A secular state in India means",
    options: ["the state has no official religion", "Hinduism is the state religion", "the state opposes all religions", "only minority religions are protected"],
    correct: "1",
    exptext: "✅ A secular state has no official religion. 📌 It treats all faiths equally. ❌ Options 2–4 describe a state religion, hostility to religion or selective protection."
  },

  /* ─────────── 43 · CONCEPT PAGE ─────────── */
  43: {
    type: "concept",
    icon: "🗳️",
    accent: "#a855f7",
    pauseTimer: true,
    title: "12. Universal Adult Franchise",
    html: `
<p class="cp-lead">Every citizen <u>not less than 18 years</u> old can vote — rich or poor, literate or not.</p>
<ul><li>No discrimination on <b>caste, race, religion, sex, literacy or wealth</b>.</li><li>Voting age cut from <b>21 to 18</b> by the <b>61st Amendment Act, 1988</b> (effective 1989).</li></ul>
<div class="cp-note trap"><b>Trap:</b> The age is <b>18</b> now; the old age was <b>21</b>.</div>
<div class="cp-mnemonic"><b>61</b>st → <b>18</b> years: "<b>21 → 18</b>, effective <b>1989</b>."</div>
    `
  },

  /* ─────────── 44 · QUESTION ─────────── */
  44: {
    questext: "The voting age was reduced from 21 to 18 years by the",
    options: ["42nd Amendment", "61st Amendment", "73rd Amendment", "86th Amendment"],
    correct: "2",
    exptext: "✅ The 61st Amendment Act, 1988 lowered it, effective 1989. 📌 Every citizen of 18 years or more can vote. ❌ The 42nd added duties, the 73rd concerns Panchayats, the 86th added a duty."
  },

  /* ─────────── 45 · QUESTION ─────────── */
  45: {
    questext: "Universal adult franchise forbids discrimination in voting on the basis of",
    options: ["caste and race only", "religion and sex only", "caste, race, religion, sex, literacy or wealth", "literacy and wealth only"],
    correct: "3",
    exptext: "✅ All of caste, race, religion, sex, literacy and wealth are barred as grounds. 📌 Only the minimum age of 18 applies. ❌ Options 1, 2 and 4 list only some of the grounds."
  },

  /* ─────────── 46 · CONCEPT PAGE ─────────── */
  46: {
    type: "concept",
    icon: "🏦",
    accent: "#0ea5e9",
    pauseTimer: true,
    title: "13. Independent Bodies",
    html: `
<p class="cp-lead">Some bodies must work <u>without government pressure</u>, so the Constitution created them independently.</p>
<div class="cp-grid c2">
<div class="cp-card blue"><div class="cp-card-title">🗳️ Election Commission</div>Ensures <b>free and fair elections</b>.</div>
<div class="cp-card green"><div class="cp-card-title">💰 CAG</div>Audits <b>Central and state accounts</b>; guardian of the public purse.</div>
<div class="cp-card amber"><div class="cp-card-title">🧑‍💼 UPSC</div>Union Public Service Commission.</div>
<div class="cp-card violet"><div class="cp-card-title">🏢 SPSC</div>State Public Service Commissions.</div>
</div>
<div class="cp-note exam"><b>Exam note:</b> "Guardian of the public purse" → <b>CAG</b>.</div>
<div class="cp-mnemonic"><b>E</b>lections, <b>C</b>AG, <b>U</b>PSC, <b>S</b>PSC — "<b>ECUS</b>".</div>
    `
  },

  /* ─────────── 47 · QUESTION ─────────── */
  47: {
    questext: "Which body audits Central and State accounts and is called the guardian of the public purse?",
    options: ["Election Commission", "CAG", "UPSC", "State Public Service Commission"],
    correct: "2",
    exptext: "✅ The Comptroller and Auditor-General audits Central and state accounts. 📌 The Election Commission conducts free and fair elections. ❌ UPSC and SPSC recruit civil servants."
  },

  /* ─────────── 48 · QUESTION ─────────── */
  48: {
    questext: "Which of the following is NOT listed as an independent constitutional body?",
    options: ["Election Commission", "UPSC", "State Public Service Commissions", "Ministry of Finance"],
    correct: "4",
    exptext: "✅ A ministry is part of the executive, not an independent body. 📌 Independent bodies: Election Commission, CAG, UPSC, SPSC. ❌ Options 1–3 are independent bodies."
  },

  /* ─────────── 49 · CONCEPT PAGE ─────────── */
  49: {
    type: "concept",
    icon: "🚨",
    accent: "#dc2626",
    pauseTimer: true,
    title: "14. Emergency Provisions",
    html: `
<p class="cp-lead">The Constitution lets the Centre take <u>special powers in a crisis</u> — three kinds of emergency.</p>
<table><tr><th>Emergency</th><th>Article</th></tr>
<tr><td><b>National Emergency</b></td><td>352</td></tr>
<tr><td><b>State Emergency / President's Rule</b></td><td>356 (failure of constitutional machinery) or 365 (non-compliance with Centre's directions)</td></tr>
<tr><td><b>Financial Emergency</b></td><td>360</td></tr></table>
<div class="cp-note info">Source: <b>GoI Act, 1935</b>; suspension of Fundamental Rights in an Emergency is from the <b>Weimar</b> Constitution.</div>
<div class="cp-note trap"><b>Trap:</b> <b>Article 356</b> is President's Rule, not the National Emergency (352).</div>
<div class="cp-mnemonic"><b>3-5-2</b> national, <b>3-5-6</b> state, <b>3-6-0</b> financial — all start with 3.</div>
    `
  },

  /* ─────────── 50 · QUESTION ─────────── */
  50: {
    questext: "Financial Emergency is provided under",
    options: ["Article 360", "Article 352", "Article 356", "Article 365"],
    correct: "1",
    exptext: "✅ Article 360 deals with Financial Emergency. 📌 National is 352 and State is 356 or 365. ❌ Options 2–4 relate to other emergencies."
  },

  /* ─────────── 51 · QUESTION ─────────── */
  51: {
    questext: "President's Rule can be imposed under",
    options: ["Article 352 only", "Article 360 only", "Article 356 or 365", "Article 352 or 360"],
    correct: "3",
    exptext: "✅ Article 356 (failure of machinery) or 365 (non-compliance with Centre's directions). 📌 Article 352 is the National Emergency. ❌ Articles 352 and 360 are other emergencies."
  },

  /* ─────────── 52 · QUESTION ─────────── */
  52: {
    questext: "Consider: 1. National Emergency – Article 352. 2. Article 365 – non-compliance with the Centre's directions. 3. Article 360 – State Emergency. Which are correct?",
    options: ["1 and 3 only", "2 and 3 only", "3 only", "1 and 2 only"],
    correct: "4",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Article 360 is Financial Emergency. ❌ Statement 3 mislabels Article 360."
  },

  /* ─────────── 53 · CONCEPT PAGE ─────────── */
  53: {
    type: "concept",
    icon: "🏘️",
    accent: "#84cc16",
    pauseTimer: true,
    title: "15. Three-Tier Government",
    html: `
<p class="cp-lead">The 73rd and 74th Amendment Acts (1992) added a <u>local third tier</u> — found in <b>no other Constitution</b>.</p>
<table><tr><th>Amendment</th><th>Gave status to</th><th>Part</th><th>Schedule</th></tr>
<tr><td><b>73rd</b></td><td>Panchayats (rural)</td><td>IX</td><td>11</td></tr>
<tr><td><b>74th</b></td><td>Municipalities (urban)</td><td>IX-A</td><td>12</td></tr></table>
<div class="cp-note trap"><b>Trap:</b> Panchayats → <b>Part IX + Schedule 11</b>; Municipalities → <b>Part IX-A + Schedule 12</b>. Do not swap.</div>
<div class="cp-mnemonic"><b>73 → 9 → 11</b> (rural), <b>74 → 9A → 12</b> (urban) — the numbers move up together.</div>
    `
  },

  /* ─────────── 54 · QUESTION ─────────── */
  54: {
    questext: "The 73rd Amendment gave constitutional status to Panchayats through",
    options: ["Part IX and Schedule 11", "Part IX-A and Schedule 12", "Part IX-B and Schedule 11", "Part IX and Schedule 12"],
    correct: "1",
    exptext: "✅ Part IX and the 11th Schedule cover Panchayats. 📌 Rural local government is the 73rd. ❌ Part IX-A with Schedule 12 belongs to Municipalities."
  },

  /* ─────────── 55 · QUESTION ─────────── */
  55: {
    questext: "Municipalities received constitutional status through",
    options: ["Part IX and Schedule 11", "Part IX-A and Schedule 12", "Part IX-B and Schedule 12", "Part IV-A and Schedule 11"],
    correct: "2",
    exptext: "✅ The 74th Amendment inserted Part IX-A and the 12th Schedule. 📌 Urban bodies = 74th. ❌ Part IX-B concerns co-operative societies; Part IV-A holds Fundamental Duties."
  },

  /* ─────────── 56 · QUESTION ─────────── */
  56: {
    questext: "The local (third) tier was added to the Constitution in",
    options: ["1976", "1988", "1992", "2002"],
    correct: "3",
    exptext: "✅ The 73rd and 74th Amendment Acts were passed in 1992. 📌 No other Constitution has this third tier. ❌ 1976 is the 42nd, 1988 the 61st and 2002 the 86th Amendment."
  },

  /* ─────────── 57 · CONCEPT PAGE ─────────── */
  57: {
    type: "concept",
    icon: "🤝",
    accent: "#f43f5e",
    pauseTimer: true,
    title: "16. Co-operative Societies",
    html: `
<p class="cp-lead">The <b>97th Amendment Act, 2011</b> gave constitutional protection to <u>co-operative societies</u>.</p>
<div class="cp-grid c3">
<div class="cp-card green"><div class="cp-card-title">⚖️ Fundamental Right</div>Right to form co-operative societies in <b>Article 19</b>.</div>
<div class="cp-card blue"><div class="cp-card-title">🧭 DPSP</div>Promotion of co-operatives in <b>Article 43-B</b>.</div>
<div class="cp-card amber"><div class="cp-card-title">📘 Part IX-B</div>"The Co-operative Societies", <b>Articles 243-ZH to 243-ZT</b>.</div>
</div>
<div class="cp-note info">The Supreme Court held in 2021 that Part IX-B operates only for <b>multi-state co-operative societies</b>, as the states had not ratified the amendment.</div>
<div class="cp-note trap"><b>Trap:</b> Part IX = Panchayats, IX-A = Municipalities, <b>IX-B = Co-operatives</b>.</div>
<div class="cp-mnemonic"><b>97</b>th = <b>3 things</b>: Right (19), DPSP (43-B), Part IX-B.</div>
    `
  },

  /* ─────────── 58 · QUESTION ─────────── */
  58: {
    questext: "Constitutional status to co-operative societies was given by the",
    options: ["97th Amendment Act, 2011", "86th Amendment Act, 2002", "73rd Amendment Act, 1992", "61st Amendment Act, 1988"],
    correct: "1",
    exptext: "✅ The 97th Amendment Act, 2011. 📌 It touched Article 19, Article 43-B and added Part IX-B. ❌ The other amendments deal with duties, Panchayats and voting age."
  },

  /* ─────────── 59 · QUESTION ─────────── */
  59: {
    questext: "The 97th Amendment made the right to form co-operative societies part of which Article?",
    options: ["Article 21", "Article 32", "Article 43-B", "Article 19"],
    correct: "4",
    exptext: "✅ Article 19 (Right to Freedom) now covers co-operative societies. 📌 Article 43-B is the DPSP on their promotion. ❌ Article 21 is life and liberty; Article 32 is constitutional remedies."
  },

  /* ─────────── 60 · QUESTION ─────────── */
  60: {
    questext: "Part IX-B, \"The Co-operative Societies\", consists of Articles",
    options: ["243-A to 243-O", "243-ZH to 243-ZT", "243-P to 243-ZG", "43-B to 43-C"],
    correct: "2",
    exptext: "✅ Articles 243-ZH to 243-ZT form Part IX-B. 📌 Article 43-B is separate (DPSP). ❌ 243-A to 243-O belongs to Panchayats; 243-P to 243-ZG to Municipalities."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Various_Sources_and_Salient_Features_of_the_Constitution/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a closed leather-bound law book with gold edges, a brushed-brass balance scale and a rolled parchment scroll" },
  "images/General_Awareness/Polity/Various_Sources_and_Salient_Features_of_the_Constitution/1.png": { t: "fig", about: "Schematic, not a map: a centre box GoI Act 1935 (blue) with arrows from five boxes: UK = Parliament, USA = Rights, Ireland = DPSP, Canada = Strong Centre, Australia = Concurrent List." }
});

/* CHANGE LOG
   - Fundamental Rights: book says rights for all citizens; written as citizens and, where stated, all persons.
   - Size of the Constitution: book's figure (about 470 Articles) kept; trap note says some books quote 448. Please verify.
   - Co-operative Societies: added the Supreme Court 2021 ruling (Part IX-B operative for multi-state co-operative societies only).
   - Fundamental Rights: added that Right to Property is now a legal right under Article 300A.
   - Added: why-explanations, traps, exam notes, mnemonics and all practice questions (not in the book).
*/