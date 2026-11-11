/* ═══ SNIPPET 1 — put first in every file ═══ */
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

/* ═══ SNIPPET 2 — put right after SNIPPET 1 ═══ */
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
  function copy(text, done, fail, host) {
    function fallback() {
      var ok = false, ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0";
      (host || document.body).appendChild(ta);
      ta.focus();
      ta.select();
      try { ta.setSelectionRange(0, text.length); } catch (e) {}
      try { ok = document.execCommand("copy"); } catch (e) {}
      if (ta.parentNode) ta.parentNode.removeChild(ta);
      if (ok) done(); else fail();
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    } catch (e) { fallback(); }
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
    var label = "📋 Copy prompt", text = getPrompt(b.getAttribute("data-ph-src"));
    copy(text, function () {
      b.textContent = "✅ Copied!";
      setTimeout(function () { b.textContent = label; }, 1600);
    }, function () {
      b.textContent = "⚠️ Copy manually";
      setTimeout(function () { b.textContent = label; }, 2500);
      try { window.prompt("Press Ctrl+C to copy this prompt:", text); } catch (e2) {}
    }, b.parentNode);
  }, true);
  try { new MutationObserver(sweep).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  sweep();
})();

/* Subject: General_Awareness/Polity · Chapter: Fundamental_Rights · 32 concept pages (+ overview) · 88 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "⚖️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Fundamental Rights",
    thumb: {
      image: "images/General_Awareness/Polity/Fundamental_Rights/thumbnail.png",
      banner: "SSC CGL • UPSC • ALL EXAMS",
      line1: "FUNDAMENTAL",
      line2: "RIGHTS",
      line3: "ARTICLES 12–35",
      badge: "FULL CLASS",
      ribbon: "POLITY • WRITS • CASES",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Fundamental Rights Articles 12-35 | Polity Full Class | SSC CGL UPSC",
      altTitles: ["Fundamental Rights Polity in One Class", "Five Writs and Article 21 Explained"],
      description: "Fundamental Rights (Part III) is the most scoring polity chapter. In this full class we cover Articles 12 to 35: definition of State, Article 13, amendability cases, equality and reservation, six freedoms, Articles 20-22, exploitation, religion, cultural rights, writs and Articles 33-35.\n\n📌 IN THIS CLASS\n✅ Articles 12-13 and Kesavananda\n✅ Equality, Freedom, Exploitation, Religion\n✅ Five writs and SC vs HC\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #FundamentalRights #SSCCGL",
      tags: ["fundamental rights", "Articles 12 to 35", "polity for SSC CGL", "polity for all exams", "Indian polity", "Article 14 to 18", "Article 19 freedoms", "Article 21 right to life", "Article 32 writs", "five writs", "habeas corpus", "Kesavananda Bharati", "basic structure", "Article 13", "right to equality", "reservation Article 16", "Mandal Commission", "preventive detention", "freedom of religion", "polity MCQ", "polity tricks", "General Awareness", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "important questions"],
      hashtags: ["Polity", "FundamentalRights", "SSCCGL", "IndianPolity"],
      thumbText: "FUNDAMENTAL RIGHTS",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "⚖️ New polity class is live: Fundamental Rights (Articles 12–35). Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Polity — Full Classes for All Exams"
    },
    html: `
      <p class="cp-lead">A <u>complete fast-track on Part III (Articles 12–35)</u> — the most question-heavy block of Indian Polity.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>32</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>88</b><span>Questions</span></div>
        <div class="cp-stat"><b>~152 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Introduction &amp; Features</b><br>Magna Carta of India, six rights and how they work.</li>
        <li><b>Articles 12–13 &amp; Amendability</b><br>Definition of State, judicial review and the Kesavananda case line.</li>
        <li><b>Right to Equality (14–18)</b><br>Equality, reservation clauses, commissions, PIL, untouchability, titles.</li>
        <li><b>Right to Freedom (19–22)</b><br>Six freedoms, restrictions, Articles 20, 21, 21A and 22.</li>
        <li><b>Exploitation, Religion, Culture (23–30)</b><br>Forced labour, child labour, religious freedom and minority rights.</li>
        <li><b>Remedies &amp; Writs (32–35)</b><br>Five writs, SC vs HC and special provisions.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Article numbers, amendments, case names and writs are asked directly in SSC, UPSC, Railways and State exams.</div>
    `
  },
  2: {
    type: "concept", icon: "📜", accent: "#22c55e", pauseTimer: true,
    title: "Introduction to Fundamental Rights",
    html: `
      <p class="cp-lead">Part III (Articles 12–35) is the <b>Magna Carta of India</b> — a long list of <u>justiciable</u> rights.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Location</td><td>Part III, Articles 12–35</td></tr><tr><td>Inspired by</td><td><b>Bill of Rights</b> of the USA</td></tr><tr><td>Guaranteed to</td><td><b>All persons</b>, without discrimination</td></tr><tr><td>Aim</td><td>Promote political democracy</td></tr><tr><td>Rights</td><td>Originally 7; now <b>6</b></td></tr></tbody></table>
      <div class="cp-note trap">Right to Property (Art. 31) was removed by the <b>44th Amendment, 1978</b>; it is now a legal right under <b>Article 300-A</b> (Part XII).</div>
    `
  },
  3: {
    questext: "Part III of the Constitution is rightly described as the:",
    options: ["Magna Carta of India", "Soul of the Constitution", "Conscience of the Constitution", "Directive of State Policy"],
    correct: "1",
    exptext: "✅ Magna Carta of India. 📌 Part III = rights. ❌ Article 32 is the 'heart and soul', not Part III."
  },
  4: {
    questext: "Fundamental Rights in India were inspired by the:",
    options: ["Bill of Rights of the USA", "French Declaration of Rights", "Weimar Constitution", "Irish Constitution"],
    correct: "1",
    exptext: "✅ US Bill of Rights. 📌 USA = rights. ❌ DPSPs came from Ireland."
  },
  5: {
    questext: "The Right to Property was removed from Fundamental Rights by the 44th Amendment and is now under:",
    options: ["Article 19(1)(f)", "Article 31", "Article 300-A", "Article 32"],
    correct: "3",
    exptext: "✅ Article 300-A, a legal right. 📌 Part XII. ❌ Article 31 was repealed."
  },
  6: {
    questext: "The number of Fundamental Rights at present is:",
    options: ["7", "5", "8", "6"],
    correct: "4",
    exptext: "✅ Six. 📌 7 minus property. ❌ Seven was the original number."
  },
  7: {
    type: "concept", icon: "🔍", accent: "#f59e0b", pauseTimer: true,
    title: "Features of Fundamental Rights",
    html: `
      <p class="cp-lead">Fundamental Rights are <u>qualified, justiciable and amendable</u> — not absolute.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Who</td><td>Some for <b>citizens only</b>; others for <b>all persons</b></td></tr><tr><td>Limits</td><td>Not absolute — <b>reasonable restrictions</b></td></tr><tr><td>Against</td><td>Mostly arbitrary State action; some also against private individuals</td></tr><tr><td>Enforcement</td><td>Justiciable; defended by the <b>Supreme Court</b></td></tr><tr><td>Amendment</td><td>Only by a constitutional amendment, not affecting the <b>basic structure</b></td></tr><tr><td>Emergency</td><td>Suspended in National Emergency — <b>except Articles 20 and 21</b></td></tr><tr><td>Art. 19</td><td>Suspended only on <b>war / external aggression</b>, not armed rebellion</td></tr></tbody></table>
    `
  },
  8: {
    questext: "Which Fundamental Rights cannot be suspended during a National Emergency?",
    options: ["Articles 19 and 20", "Articles 14 and 15", "Articles 20 and 21", "Articles 21 and 22"],
    correct: "3",
    exptext: "✅ Articles 20 and 21. 📌 Life and conviction safeguards stay. ❌ Article 22 can be suspended."
  },
  9: {
    questext: "Article 19 rights are suspended during a National Emergency only on the ground of:",
    options: ["War or external aggression", "Armed rebellion", "Financial crisis", "Internal disturbance"],
    correct: "1",
    exptext: "✅ War or external aggression. 📌 44th Amendment removed armed rebellion. ❌ Others never suspend Article 19."
  },
  10: {
    questext: "Which statement about Fundamental Rights is NOT correct?",
    options: ["They are justiciable", "Some are available only to citizens", "They are absolute and cannot be restricted", "They can be amended without affecting basic structure"],
    correct: "3",
    exptext: "✅ They are not absolute. 📌 Reasonable restrictions apply. ❌ Others are valid features."
  },
  11: {
    type: "concept", icon: "📋", accent: "#ef4444", pauseTimer: true,
    title: "The Six Fundamental Rights",
    html: `
      <p class="cp-lead">Memorise the <u>starting Article</u> of each right.</p>
      <table><thead><tr><th>Right</th><th>Articles</th></tr></thead><tbody><tr><td>Right to Equality</td><td>14–18</td></tr><tr><td>Right to Freedom</td><td>19–22</td></tr><tr><td>Right against Exploitation</td><td>23–24</td></tr><tr><td>Right to Freedom of Religion</td><td>25–28</td></tr><tr><td>Cultural &amp; Educational Rights</td><td>29–30</td></tr><tr><td>Right to Constitutional Remedies</td><td>32</td></tr></tbody></table>
      <div class="cp-mnemonic">Start points: <b>14 – 19 – 23 – 25 – 29 – 32</b></div>
    `
  },
  12: {
    questext: "The Right to Freedom of Religion is covered in Articles:",
    options: ["25–28", "23–24", "29–30", "19–22"],
    correct: "1",
    exptext: "✅ Articles 25–28. 📌 Starts at 25. ❌ 23–24 is exploitation."
  },
  13: {
    questext: "Articles 29–30 deal with:",
    options: ["Right to Equality", "Right to Freedom", "Cultural and Educational Rights", "Right against Exploitation"],
    correct: "3",
    exptext: "✅ Cultural and Educational Rights. 📌 Minorities. ❌ Equality is 14–18."
  },
  14: {
    questext: "The Right to Constitutional Remedies is contained in:",
    options: ["Article 30", "Article 31", "Article 33", "Article 32"],
    correct: "4",
    exptext: "✅ Article 32. 📌 Single article. ❌ Article 31 was repealed in 1978."
  },
  15: {
    type: "concept", icon: "🏛️", accent: "#8b5cf6", pauseTimer: true,
    title: "Article 12 – Definition of ‘State’",
    html: `
      <p class="cp-lead">For Part III, ‘State’ has a <u>wide meaning</u>.</p>
      <table><thead><tr><th>‘State’ includes</th></tr></thead><tbody><tr><td>Government &amp; Parliament of India (Union executive + legislature)</td></tr><tr><td>Government &amp; legislature of states</td></tr><tr><td>All <b>local authorities</b> — municipalities, panchayats, district boards</td></tr><tr><td>All <b>other authorities</b> — statutory / non-statutory like <b>LIC, ONGC, SAIL</b></td></tr><tr><td>A private body or agency working as an <b>instrument of the State</b> (Supreme Court)</td></tr></tbody></table>
      <div class="cp-note trap"><b>BCCI and NCERT</b> do not fall under the definition of State.</div>
    `
  },
  16: {
    questext: "Which of the following is NOT ‘State’ under Article 12?",
    options: ["Panchayats", "LIC", "BCCI", "ONGC"],
    correct: "3",
    exptext: "✅ BCCI is not State. 📌 NCERT also excluded. ❌ Others are authorities."
  },
  17: {
    questext: "Under Article 12, ‘State’ includes: 1. Government of states 2. Local authorities 3. Bodies like SAIL",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "4",
    exptext: "✅ All three. 📌 Wide definition. ❌ Others omit some."
  },
  18: {
    type: "concept", icon: "⚖️", accent: "#14b8a6", pauseTimer: true,
    title: "Article 13 – Laws Inconsistent with Fundamental Rights",
    html: `
      <p class="cp-lead">Laws inconsistent with FR are <b>void</b> — the basis of <u>judicial review</u> (Supreme Court – Art. 32; High Courts – Art. 226).</p>
      <table><thead><tr><th>Clause</th><th>Provision</th></tr></thead><tbody><tr><td>13(1)</td><td>Pre-Constitution laws are void to the extent of inconsistency with Part III</td></tr><tr><td>13(2)</td><td>State shall not make laws taking away FR; such laws are void</td></tr><tr><td>13(3)</td><td>Defines ‘law’ widely (excludes personal law)</td></tr><tr><td>13(4)</td><td>Added by <b>24th Amendment, 1971</b>: Art. 13 does not apply to amendments under Art. 368</td></tr></tbody></table>
      <div class="cp-note remember">‘Law’ includes <b>permanent laws</b>, <b>ordinances</b>, <b>delegated legislation</b> (order, bye-law, rule, regulation, notification) and <b>custom or usage</b> having the force of law.</div>
    `
  },
  19: {
    questext: "Article 13 declares laws inconsistent with Fundamental Rights to be:",
    options: ["Valid", "Suspended", "Void", "Voidable"],
    correct: "3",
    exptext: "✅ Void. 📌 Basis of judicial review. ❌ Voidable and suspended are wrong."
  },
  20: {
    questext: "Article 13(4) was added by which Amendment?",
    options: ["24th Amendment, 1971", "42nd Amendment", "44th Amendment", "1st Amendment"],
    correct: "1",
    exptext: "✅ 24th Amendment, 1971. 📌 Amendments are not ‘law’. ❌ 1st Amendment added 15(4)."
  },
  21: {
    questext: "Which of the following is NOT included in ‘law’ under Article 13?",
    options: ["Ordinances", "Bye-laws", "Custom having force of law", "Personal law"],
    correct: "4",
    exptext: "✅ Personal law is excluded (per Article 13(3) reading). 📌 Others are wide ‘law’. ❌ Ordinances are temporary laws."
  },
  22: {
    type: "concept", icon: "🕰️", accent: "#ec4899", pauseTimer: true,
    title: "Amendability of Fundamental Rights — Case Timeline",
    html: `
      <p class="cp-lead">Courts swung from <u>FR can be amended</u> to <u>basic structure limits</u>.</p>
      <table><thead><tr><th>Case</th><th>Year</th><th>Held</th></tr></thead><tbody><tr><td>Shankari Prasad v. Union of India</td><td>1951</td><td>Amendment under Art. 368 is not ‘law’ under 13(2); FR can be amended</td></tr><tr><td>Sajjan Singh v. State of Rajasthan</td><td>1965</td><td>Upheld Shankari Prasad</td></tr><tr><td>Golaknath v. State of Punjab</td><td>1967</td><td>‘Law’ includes amendments; FR cannot be amended</td></tr><tr><td>24th Amendment Act</td><td>1971</td><td>Added 13(4); amendments are not ‘law’</td></tr><tr><td>Kesavananda Bharati v. State of Kerala</td><td>1973</td><td>Upheld 24th Amendment; established <b>Basic Structure</b> doctrine</td></tr><tr><td>Minerva Mills v. Union of India</td><td>1980</td><td>Judiciary can review amendments to protect basic structure</td></tr></tbody></table>
    `
  },
  23: {
    questext: "The Basic Structure doctrine was established in:",
    options: ["Kesavananda Bharati case", "Golaknath case", "Minerva Mills case", "Shankari Prasad case"],
    correct: "1",
    exptext: "✅ Kesavananda Bharati, 1973. 📌 Kerala 1973. ❌ Minerva Mills later protected it."
  },
  24: {
    questext: "Which case held that Fundamental Rights cannot be amended?",
    options: ["Golaknath v. State of Punjab", "Shankari Prasad", "Sajjan Singh", "Kesavananda Bharati"],
    correct: "1",
    exptext: "✅ Golaknath, 1967. 📌 ‘Law’ includes amendments. ❌ Shankari Prasad allowed amendments."
  },
  25: {
    questext: "The Shankari Prasad case was decided in:",
    options: ["1965", "1967", "1973", "1951"],
    correct: "4",
    exptext: "✅ 1951. 📌 First amendment-case. ❌ 1965 is Sajjan Singh."
  },
  26: {
    questext: "Which is the correct chronological order?",
    options: ["Golaknath – Shankari Prasad – Kesavananda – Sajjan Singh", "Shankari Prasad – Golaknath – Sajjan Singh – Kesavananda", "Shankari Prasad – Sajjan Singh – Golaknath – Kesavananda", "Sajjan Singh – Shankari Prasad – Golaknath – Kesavananda"],
    correct: "3",
    exptext: "✅ 1951, 1965, 1967, 1973. 📌 S-S-G-K. ❌ Others break the sequence."
  },
  27: {
    type: "concept", icon: "🟰", accent: "#3b82f6", pauseTimer: true,
    title: "Article 14 – Equality Before Law",
    html: `
      <p class="cp-lead">The State shall not deny any person <b>equality before the law</b> or the <b>equal protection of the laws</b>.</p>
      <table><thead><tr><th>Concept</th><th>Origin</th><th>Nature</th></tr></thead><tbody><tr><td>Equality before law</td><td>British</td><td><b>Negative</b>: no special privileges; no one is above the law</td></tr><tr><td>Equal protection of laws</td><td>American</td><td><b>Positive</b>: equal treatment in equal circumstances</td></tr></tbody></table>
      <div class="cp-note trap">Article 14 applies to <b>all persons</b>, not only citizens.</div>
    `
  },
  28: {
    questext: "The concept of ‘equal protection of the laws’ is borrowed from:",
    options: ["British Constitution", "Irish Constitution", "American Constitution", "French Constitution"],
    correct: "3",
    exptext: "✅ American. 📌 Equal protection = USA. ❌ Equality before law is British."
  },
  29: {
    questext: "‘Equality before law’ is a:",
    options: ["Negative concept of British origin", "Positive concept of American origin", "Positive concept of Irish origin", "Negative concept of French origin"],
    correct: "1",
    exptext: "✅ Negative, British. 📌 No privileges. ❌ Equal protection is the positive one."
  },
  30: {
    questext: "Article 14 is available to:",
    options: ["Citizens only", "Only residents", "Only adult citizens", "All persons including foreigners"],
    correct: "4",
    exptext: "✅ All persons. 📌 'Any person'. ❌ Article 15 covers citizens only."
  },
  31: {
    type: "concept", icon: "🛡️", accent: "#f97316", pauseTimer: true,
    title: "Exceptions to Equality",
    html: `
      <p class="cp-lead">Some office-holders enjoy <u>special immunity</u>.</p>
      <table><thead><tr><th>Provision</th><th>Exception</th></tr></thead><tbody><tr><td>Art. 361</td><td><b>President and Governors</b>: not answerable to courts; immune from criminal proceedings during term; protected from arrest and civil suits</td></tr><tr><td>Art. 361-A</td><td>No liability for true reports of Parliament / State Legislature proceedings</td></tr><tr><td>Art. 105 / 194</td><td>MPs / MLAs not liable for anything said or voted in the House</td></tr><tr><td>Others</td><td>Foreign sovereigns, ambassadors, diplomats and the <b>UNO &amp; its agencies</b></td></tr></tbody></table>
    `
  },
  32: {
    questext: "Article 361 grants immunity from court proceedings to:",
    options: ["President and Governors", "Prime Minister and Chief Ministers", "Judges and Advocates", "MPs and MLAs"],
    correct: "1",
    exptext: "✅ President and Governors. 📌 361 = heads. ❌ MPs/MLAs are under Articles 105/194."
  },
  33: {
    questext: "Articles 105 and 194 protect:",
    options: ["MPs and MLAs for statements and votes in the House", "Governors from arrest", "Newspapers for any report", "Judges for judgments"],
    correct: "1",
    exptext: "✅ MPs and MLAs. 📌 House freedom. ❌ Newspapers are covered by Article 361-A (true reports)."
  },
  34: {
    type: "concept", icon: "🚫", accent: "#84cc16", pauseTimer: true,
    title: "Article 15 – Prohibition of Discrimination",
    html: `
      <p class="cp-lead">The State shall not discriminate against any <b>citizen</b> on grounds <u>only of religion, race, caste, sex or place of birth</u>.</p>
      <table><thead><tr><th>Clause</th><th>Provision</th></tr></thead><tbody><tr><td>15(2)</td><td>No discrimination in access to shops, hotels, public places, wells, tanks, ghats</td></tr><tr><td>15(3)</td><td>Special provisions for <b>women and children</b></td></tr><tr><td>15(4)</td><td>Special provisions for SEBCs, SCs and STs — <b>1st Amendment, 1951</b> (after Champakam Dorairajan case)</td></tr><tr><td>15(5)</td><td>Reservation in admissions (govt and private) for SEBCs — <b>93rd Amendment, 2005</b></td></tr><tr><td>15(6)</td><td><b>103rd CA, 2019</b>: up to <b>10%</b> reservation for EWS</td></tr></tbody></table>
      <div class="cp-note trap">‘Residence’ and ‘descent’ are grounds in Article 16, <b>not</b> Article 15.</div>
    `
  },
  35: {
    questext: "Article 15(4) was inserted by the 1st Amendment following which case?",
    options: ["State of Madras v. Champakam Dorairajan", "Kesavananda Bharati", "Golaknath", "Indra Sawhney"],
    correct: "1",
    exptext: "✅ Champakam Dorairajan. 📌 1951 reaction. ❌ Others concern other issues."
  },
  36: {
    questext: "Reservation in admission to private educational institutions for SEBCs was enabled by:",
    options: ["93rd Amendment", "1st Amendment", "103rd Amendment", "24th Amendment"],
    correct: "1",
    exptext: "✅ 93rd Amendment, 2005 (Art. 15(5)). 📌 93 = admissions. ❌ 103rd is EWS."
  },
  37: {
    questext: "The 103rd Constitutional Amendment, 2019 provides up to ___ reservation for EWS.",
    options: ["5%", "15%", "27%", "10%"],
    correct: "4",
    exptext: "✅ 10%. 📌 EWS = 10. ❌ 27% is OBC."
  },
  38: {
    questext: "Which of the following is NOT a ground in Article 15?",
    options: ["Religion", "Caste", "Place of birth", "Residence"],
    correct: "4",
    exptext: "✅ Residence is in Article 16. 📌 Article 15 has five grounds. ❌ Others are listed."
  },
  39: {
    type: "concept", icon: "💼", accent: "#06b6d4", pauseTimer: true,
    title: "Article 16 – Equality of Opportunity in Public Employment",
    html: `
      <table><thead><tr><th>Clause</th><th>Provision</th></tr></thead><tbody><tr><td>16(1)</td><td>Equality of opportunity for all citizens in public employment</td></tr><tr><td>16(2)</td><td>No discrimination only on grounds of religion, race, caste, sex, <b>descent</b>, place of birth or <b>residence</b></td></tr><tr><td>16(3)</td><td><b>Parliament</b> may prescribe residence requirement for local employment</td></tr><tr><td>16(4)</td><td>State may reserve posts for under-represented <b>backward classes</b></td></tr><tr><td>16(4A)</td><td>Reservation in promotion for SCs &amp; STs (<b>77th CA, 1995</b>; consequential seniority by 85th CA, 2001)</td></tr><tr><td>16(4B)</td><td><b>81st CA, 2000</b>: carry forward unfilled reserved vacancies (breaks the 50% cap for backlog)</td></tr><tr><td>16(5)</td><td>Religious institutions may require employees of the same religion</td></tr><tr><td>16(6)</td><td><b>103rd CA, 2019</b>: up to 10% reservation for EWS</td></tr></tbody></table>
      <div class="cp-note trap">Only <b>Parliament</b> (not states) can make residence-based rules under 16(3).</div>
    `
  },
  40: {
    questext: "Carry forward of unfilled reserved vacancies is provided by Article 16(4B), inserted by:",
    options: ["81st Amendment", "77th Amendment", "93rd Amendment", "103rd Amendment"],
    correct: "1",
    exptext: "✅ 81st Amendment, 2000. 📌 81 = backlog. ❌ 77th is promotion."
  },
  41: {
    questext: "Who can prescribe residence as a requirement for certain state employment under Article 16(3)?",
    options: ["State Legislature", "Supreme Court", "President alone", "Parliament"],
    correct: "4",
    exptext: "✅ Parliament. 📌 16(3) = Parliament. ❌ States have no such power."
  },
  42: {
    questext: "Which ground is mentioned in Article 16(2) but NOT in Article 15?",
    options: ["Religion", "Sex", "Descent", "Caste"],
    correct: "3",
    exptext: "✅ Descent (and residence). 📌 16 adds two grounds. ❌ Others are in both."
  },
  43: {
    questext: "Reservation in promotion for SCs and STs under Article 16(4A) came through the:",
    options: ["77th Amendment, 1995", "81st Amendment, 2000", "93rd Amendment, 2005", "103rd Amendment, 2019"],
    correct: "1",
    exptext: "✅ 77th Amendment, 1995. 📌 4A = promotion. ❌ 81st is carry-forward."
  },
  44: {
    type: "concept", icon: "🧾", accent: "#a855f7", pauseTimer: true,
    title: "Cases / Commissions related to Article 16(4)",
    html: `
      <table><thead><tr><th>Case / Commission</th><th>Key points</th></tr></thead><tbody><tr><td>Kalelkar Commission (1953)</td><td>1st Backward Class Commission; Chairman <b>Kaka Kalelkar</b></td></tr><tr><td>Mandal Commission (1979)</td><td>2nd Backward Class Commission; Chairman <b>B. P. Mandal</b>; recommended <b>27%</b> reservation to OBCs; implemented by PM <b>V. P. Singh</b> in 1990</td></tr><tr><td>Indra Sawhney Case (1992)</td><td>Also the <b>Mandal Case</b>; SC upheld 27% for OBCs but set a <b>50% cap</b>; creamy layer to be excluded</td></tr></tbody></table>
    `
  },
  45: {
    questext: "Who chaired the First Backward Classes Commission (1953)?",
    options: ["B. P. Mandal", "H. N. Kunzru", "Fazl Ali", "Kaka Kalelkar"],
    correct: "4",
    exptext: "✅ Kaka Kalelkar. 📌 K for first. ❌ Mandal chaired the second."
  },
  46: {
    questext: "The Indra Sawhney case (1992) set an overall ceiling on reservations of:",
    options: ["27%", "40%", "60%", "50%"],
    correct: "4",
    exptext: "✅ 50% cap. 📌 Mandal Case. ❌ 27% is OBC quota."
  },
  47: {
    questext: "The Mandal Commission recommendations were implemented in 1990 by:",
    options: ["Rajiv Gandhi", "P. V. Narasimha Rao", "Chandra Shekhar", "V. P. Singh"],
    correct: "4",
    exptext: "✅ V. P. Singh. 📌 1990 = VP Singh. ❌ Others were not PM then."
  },
  48: {
    questext: "The Mandal Commission recommended ___ reservation for OBCs.",
    options: ["15%", "22.5%", "27%", "10%"],
    correct: "3",
    exptext: "✅ 27%. 📌 SC upheld it in 1992. ❌ 22.5% is the SC/ST quota."
  },
  49: {
    type: "concept", icon: "📢", accent: "#e11d48", pauseTimer: true,
    title: "Public Interest Litigation",
    html: `
      <p class="cp-lead"><b>PIL</b> lets anyone approach court for <u>public wrongs</u>.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Concept</td><td>Taken from the <b>USA</b></td></tr><tr><td>Father of PIL in India</td><td>Justice <b>P. N. Bhagwati</b></td></tr><tr><td>First reported PIL</td><td><b>Hussainara Khatoon v. State of Bihar (1979)</b></td></tr></tbody></table>
    `
  },
  50: {
    questext: "The concept of Public Interest Litigation in India was taken from:",
    options: ["UK", "Australia", "Canada", "USA"],
    correct: "4",
    exptext: "✅ USA. 📌 PIL = US. ❌ Writs come from English law."
  },
  51: {
    questext: "The first reported case of PIL in India was:",
    options: ["Kesavananda Bharati", "Golaknath", "Hussainara Khatoon v. State of Bihar", "Maneka Gandhi"],
    correct: "3",
    exptext: "✅ Hussainara Khatoon, 1979. 📌 Undertrial prisoners. ❌ Others are not PILs."
  },
  52: {
    type: "concept", icon: "✋", accent: "#10b981", pauseTimer: true,
    title: "Article 17 – Abolition of Untouchability",
    html: `
      <p class="cp-lead">Article 17 <b>abolishes ‘untouchability’</b> and forbids its practice; with Art. 35, Parliament prescribes punishment.</p>
      <table><thead><tr><th>Law</th><th>Detail</th></tr></thead><tbody><tr><td>Untouchability (Offences) Act, 1955</td><td>Renamed <b>Protection of Civil Rights Act, 1955</b> (amended 1976)</td></tr><tr><td>SC &amp; ST (Prevention of Atrocities) Act, 1989</td><td>In force from <b>30 January 1990</b></td></tr></tbody></table>
    `
  },
  53: {
    questext: "The Untouchability (Offences) Act, 1955 was renamed in 1976 as:",
    options: ["SC/ST Atrocities Act", "Equal Remuneration Act", "Immoral Traffic Act", "Protection of Civil Rights Act"],
    correct: "4",
    exptext: "✅ Protection of Civil Rights Act, 1955. 📌 Same year, new name. ❌ Atrocities Act is 1989."
  },
  54: {
    questext: "The SC and ST (Prevention of Atrocities) Act came into force on:",
    options: ["26 January 1989", "15 August 1989", "2 October 1990", "30 January 1990"],
    correct: "4",
    exptext: "✅ 30 January 1990. 📌 Passed 1989, effective 1990. ❌ Others are invented."
  },
  55: {
    type: "concept", icon: "🎖️", accent: "#eab308", pauseTimer: true,
    title: "Article 18 – Abolition of Titles",
    html: `
      <table><thead><tr><th>Clause</th><th>Provision</th></tr></thead><tbody><tr><td>18(1)</td><td>State cannot confer titles (except <b>military or academic</b>)</td></tr><tr><td>18(2)</td><td>A citizen cannot accept a title from a foreign state</td></tr><tr><td>18(3)</td><td>A foreigner holding State office needs <b>President’s consent</b> for a foreign title</td></tr><tr><td>18(4)</td><td>No present / emolument / office from a foreign state without President’s consent</td></tr></tbody></table>
      <div class="cp-note tip">Hereditary titles like Maharaja and Rai Bahadur are banned. In <b>1996</b> the SC upheld <b>Bharat Ratna and Padma awards</b> — they are not ‘titles’.</div>
    `
  },
  56: {
    questext: "Under Article 18(1), the State may confer which titles?",
    options: ["Hereditary titles", "Military and academic distinctions", "Titles like Rai Bahadur", "Titles to foreigners only"],
    correct: "2",
    exptext: "✅ Military and academic. 📌 Only two exceptions. ❌ Hereditary titles are banned."
  },
  57: {
    questext: "In 1996 the Supreme Court held that Bharat Ratna and Padma awards:",
    options: ["Violate Article 18", "Are titles", "Are not titles under Article 18", "Must be hereditary"],
    correct: "3",
    exptext: "✅ Not titles. 📌 Awards, not titles. ❌ Option 1 is the challenge that failed."
  },
  58: {
    questext: "Under Article 18, a citizen of India:",
    options: ["May accept a title from any foreign state", "May accept with President’s consent only", "Cannot accept any title from a foreign state", "May accept from the UN only"],
    correct: "3",
    exptext: "✅ Cannot accept a foreign title. 📌 18(2). ❌ Consent applies to foreigners holding office."
  },
  59: {
    type: "concept", icon: "🗣️", accent: "#0ea5e9", pauseTimer: true,
    title: "Article 19 – Six Freedoms",
    html: `
      <p class="cp-lead">Article 19 guarantees <b>six freedoms</b> to <u>citizens</u>.</p>
      <table><thead><tr><th>Clause</th><th>Freedom</th></tr></thead><tbody><tr><td>19(1)(a)</td><td>Speech and expression</td></tr><tr><td>19(1)(b)</td><td>Assembly (<b>peaceful, unarmed</b>)</td></tr><tr><td>19(1)(c)</td><td>Association, unions, co-operative societies</td></tr><tr><td>19(1)(d)</td><td>Movement</td></tr><tr><td>19(1)(e)</td><td>Residence</td></tr><tr><td>19(1)(g)</td><td>Profession, occupation, trade, business</td></tr></tbody></table>
      <div class="cp-note trap">19(1)(f) <b>property</b> was removed by the <b>44th Amendment, 1978</b>. Press freedom and <b>Right to Information</b> are implicit in 19(1)(a).</div>
    `
  },
  60: {
    questext: "Which freedom was removed from Article 19(1) by the 44th Amendment?",
    options: ["Freedom of speech", "Freedom of residence", "Right to acquire property", "Freedom of movement"],
    correct: "3",
    exptext: "✅ Right to acquire property, 19(1)(f). 📌 Seven became six. ❌ Others remain."
  },
  61: {
    questext: "Freedom of the press and the Right to Information are implicit in:",
    options: ["Article 19(1)(a)", "Article 19(1)(b)", "Article 19(1)(c)", "Article 19(1)(g)"],
    correct: "1",
    exptext: "✅ Article 19(1)(a). 📌 Speech and expression. ❌ Others are different freedoms."
  },
  62: {
    questext: "Under Article 19(1)(b), the right to assemble must be:",
    options: ["Armed and peaceful", "Without any restriction", "Unarmed but violent", "Peaceful and unarmed"],
    correct: "4",
    exptext: "✅ Peaceful and unarmed. 📌 No weapons. ❌ Restrictions under 19(3) apply."
  },
  63: {
    type: "concept", icon: "🚧", accent: "#d946ef", pauseTimer: true,
    title: "Six Freedoms & Grounds of Restriction",
    html: `
      <table><thead><tr><th>Freedom (Article)</th><th>Grounds of restriction</th></tr></thead><tbody><tr><td>Speech &amp; expression 19(1)(a)</td><td>Security/sovereignty of India, friendly relations, public order, decency/morality, contempt of court, defamation, incitement to offence <b>[19(2)]</b></td></tr><tr><td>Assembly 19(1)(b)</td><td>Sovereignty/integrity, public order <b>[19(3)]</b></td></tr><tr><td>Association 19(1)(c)</td><td>Sovereignty/integrity, public order, morality <b>[19(4)]</b></td></tr><tr><td>Movement &amp; Residence 19(1)(d),(e)</td><td>Interest of general public; protection of Scheduled Tribes <b>[19(5)]</b></td></tr><tr><td>Profession / Trade 19(1)(g)</td><td>Interest of general public; professional/technical qualifications; State monopoly <b>[19(6)]</b></td></tr></tbody></table>
    `
  },
  64: {
    questext: "Restrictions on freedom of speech and expression are laid down in:",
    options: ["Article 19(2)", "Article 19(3)", "Article 19(4)", "Article 19(5)"],
    correct: "1",
    exptext: "✅ Article 19(2). 📌 2 for speech. ❌ 19(3) is assembly."
  },
  65: {
    questext: "Protection of Scheduled Tribes is a ground to restrict:",
    options: ["Speech", "Assembly", "Movement and residence", "Association"],
    correct: "3",
    exptext: "✅ Movement and residence, 19(5). 📌 ST protection. ❌ Others lack this ground."
  },
  66: {
    questext: "‘State monopoly’ is a ground of restriction on the freedom of:",
    options: ["Assembly", "Association", "Speech", "Profession, occupation, trade or business"],
    correct: "4",
    exptext: "✅ 19(1)(g) via 19(6). 📌 Trade monopolies. ❌ Others have no such ground."
  },
  67: {
    type: "concept", icon: "⛓️", accent: "#64748b", pauseTimer: true,
    title: "Article 20 – Protection in Conviction for Offences",
    html: `
      <p class="cp-lead">Three safeguards that <u>cannot be suspended even in a National Emergency</u>.</p>
      <table><thead><tr><th>Clause</th><th>Safeguard</th></tr></thead><tbody><tr><td>20(1)</td><td>No <b>ex-post-facto law</b> (no retrospective punishment)</td></tr><tr><td>20(2)</td><td>No <b>double jeopardy</b> (not punished twice for the same offence)</td></tr><tr><td>20(3)</td><td>No <b>self-incrimination</b> (not compelled to be a witness against oneself)</td></tr></tbody></table>
    `
  },
  68: {
    questext: "Protection against double jeopardy is provided under:",
    options: ["Article 20(1)", "Article 20(2)", "Article 20(3)", "Article 21"],
    correct: "2",
    exptext: "✅ Article 20(2). 📌 2 = twice. ❌ 20(1) is retrospective law."
  },
  69: {
    questext: "Article 20(3) protects a person against:",
    options: ["Retrospective punishment", "Double punishment", "Self-incrimination", "Arbitrary arrest"],
    correct: "3",
    exptext: "✅ Self-incrimination. 📌 Not a witness against oneself. ❌ Arrest is Article 22."
  },
  70: {
    questext: "Protection against ex-post-facto laws is in:",
    options: ["Article 20(1)", "Article 20(2)", "Article 20(3)", "Article 22"],
    correct: "1",
    exptext: "✅ Article 20(1). 📌 1 = first law. ❌ 20(2) is double jeopardy."
  },
  71: {
    type: "concept", icon: "❤️", accent: "#fb7185", pauseTimer: true,
    title: "Article 21 – Protection of Life & Personal Liberty",
    html: `
      <p class="cp-lead">No person shall be deprived of life or personal liberty except by <b>procedure established by law</b> — available to <u>citizens and non-citizens</u>.</p>
      <table><thead><tr><th>Case</th><th>View</th></tr></thead><tbody><tr><td>Gopalan case (1950)</td><td><b>Narrow</b> view: protection only against arbitrary executive action</td></tr><tr><td>Menaka (Maneka Gandhi) case (1978)</td><td><b>Wider</b> view: procedure must be <b>reasonable, fair and just</b> (‘due process of law’); covers life with human dignity</td></tr></tbody></table>
      <div class="cp-note remember">Rights declared under Article 21 include clean environment, livelihood, privacy, shelter, health, free legal aid, speedy and fair trial, travel abroad, reputation, family pension, information, sleep, and protection against noise/pollution, bonded labour, custodial harassment, solitary confinement and handcuffing.</div>
    `
  },
  72: {
    questext: "The ‘due process of law’ was introduced into Article 21 by the:",
    options: ["Gopalan case", "Menaka case", "Golaknath case", "Kesavananda case"],
    correct: "2",
    exptext: "✅ Menaka, 1978. 📌 Maneka widened it. ❌ Gopalan took a narrow view."
  },
  73: {
    questext: "Article 21 is available to:",
    options: ["Citizens only", "Non-citizens only", "Both citizens and non-citizens", "Only adults"],
    correct: "3",
    exptext: "✅ Citizens and non-citizens. 📌 'No person'. ❌ Article 19 is citizens only."
  },
  74: {
    questext: "In the Gopalan case (1950), the Supreme Court held that Article 21 protects against:",
    options: ["Arbitrary legislative action", "Arbitrary executive action only", "All private acts", "Judicial action"],
    correct: "2",
    exptext: "✅ Arbitrary executive action only. 📌 Narrow view. ❌ Wider view came in 1978."
  },
  75: {
    questext: "Which of the following is NOT a right declared under Article 21?",
    options: ["Right to privacy", "Right to livelihood", "Right to free legal aid", "Right to vote in elections"],
    correct: "4",
    exptext: "✅ Right to vote is a statutory right. 📌 Others are Article 21 rights. ❌ Privacy and livelihood are declared by courts."
  },
  76: {
    type: "concept", icon: "🎓", accent: "#2dd4bf", pauseTimer: true,
    title: "Article 21A – Right to Education",
    html: `
      <p class="cp-lead">Free and compulsory education to children aged <b>6–14 years</b>; added by the <b>86th Amendment, 2002</b>.</p>
    `
  },
  77: {
    questext: "Article 21A provides free and compulsory education to children aged:",
    options: ["3–6 years", "6–14 years", "6–18 years", "14–18 years"],
    correct: "2",
    exptext: "✅ 6–14 years. 📌 Elementary education. ❌ Other ranges are wrong."
  },
  78: {
    questext: "Article 21A was inserted by which Amendment?",
    options: ["42nd", "44th", "73rd", "86th"],
    correct: "4",
    exptext: "✅ 86th Amendment, 2002. 📌 86 for school. ❌ 73rd is Panchayati Raj."
  },
  79: {
    type: "concept", icon: "🔒", accent: "#c026d3", pauseTimer: true,
    title: "Article 22 – Protection Against Arrest & Detention",
    html: `
      <p class="cp-lead">Two types of detention: <b>Punitive</b> (after trial / conviction) and <b>Preventive</b> (without trial, on suspicion).</p>
      <table><thead><tr><th>Detention</th><th>Safeguards</th></tr></thead><tbody><tr><td>Ordinary arrest 22(1)</td><td>Informed of grounds; consult and be defended by a lawyer; produced before a magistrate within <b>24 hours</b>; released after 24 hours unless magistrate authorises</td></tr><tr><td>Preventive detention</td><td>Cannot exceed <b>3 months</b> without Advisory Board (HC judges); grounds communicated; detenu may make a representation</td></tr></tbody></table>
      <div class="cp-note trap">Ordinary arrest rights are <b>not</b> available to enemy aliens or in preventive detention. The 44th Amendment reduced 3 → 2 months but is <b>not yet in force</b>.</div>
    `
  },
  80: {
    questext: "A person arrested must be produced before the nearest magistrate within:",
    options: ["12 hours", "24 hours", "48 hours", "72 hours"],
    correct: "2",
    exptext: "✅ 24 hours. 📌 Excludes travel time. ❌ Others are not the limit."
  },
  81: {
    questext: "Preventive detention cannot exceed ___ without the opinion of an Advisory Board.",
    options: ["1 month", "2 months", "6 months", "3 months"],
    correct: "4",
    exptext: "✅ 3 months. 📌 44th Amendment's 2 months not in force. ❌ Option 2 is not yet effective."
  },
  82: {
    questext: "Ordinary arrest safeguards of Article 22(1) are NOT available to:",
    options: ["Foreigners in general", "Enemy aliens and persons under preventive detention", "Women", "Minors"],
    correct: "2",
    exptext: "✅ Enemy aliens and preventive detainees. 📌 Exception to 22(1). ❌ Others are covered."
  },
  83: {
    questext: "The Advisory Board for preventive detention consists of:",
    options: ["Supreme Court judges", "High Court judges", "District judges", "Law Commission members"],
    correct: "2",
    exptext: "✅ High Court judges. 📌 HC = Board. ❌ Others do not form it."
  },
  84: {
    type: "concept", icon: "🚨", accent: "#16a34a", pauseTimer: true,
    title: "Preventive Detention Laws",
    html: `
      <p class="cp-lead">Laws made under Article 22 for <u>preventive detention</u>.</p>
      <table><thead><tr><th>Law</th><th>Year</th></tr></thead><tbody><tr><td>Preventive Detention Act</td><td>1950</td></tr><tr><td>UAPA (amended 2004, 2008, 2012, 2019)</td><td>1967</td></tr><tr><td>MISA</td><td>1971</td></tr><tr><td>COFEPOSA</td><td>1974</td></tr><tr><td>NSA</td><td>1980</td></tr><tr><td>TADA</td><td>1985</td></tr><tr><td>POTA</td><td>2002</td></tr></tbody></table>
      <div class="cp-note trap"><b>TADA and POTA</b> are no longer in force; <b>NSA 1980</b> and <b>UAPA</b> continue.</div>
    `
  },
  85: {
    questext: "Which was the first preventive detention law of independent India?",
    options: ["MISA, 1971", "NSA, 1980", "Preventive Detention Act, 1950", "TADA, 1985"],
    correct: "3",
    exptext: "✅ Preventive Detention Act, 1950. 📌 Same year as the Constitution. ❌ Others are later."
  },
  86: {
    questext: "Which of these is a preventive detention law enacted in 1980?",
    options: ["NSA", "MISA", "COFEPOSA", "POTA"],
    correct: "1",
    exptext: "✅ National Security Act, 1980. 📌 NSA 80. ❌ MISA is 1971; COFEPOSA 1974."
  },
  87: {
    type: "concept", icon: "⛏️", accent: "#d97706", pauseTimer: true,
    title: "Article 23 – Traffic in Humans & Forced Labour",
    html: `
      <p class="cp-lead">Prohibits <b>traffic in human beings</b>, <b>begar</b> (forced labour without pay) and similar forced labour.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Includes</td><td>Buying/selling of persons, immoral traffic/prostitution, devadasis, slavery</td></tr><tr><td>Law</td><td><b>Immoral Traffic (Prevention) Act, 1956</b></td></tr><tr><td>Exception</td><td>State may impose <b>compulsory service</b> for public purposes (e.g. military service)</td></tr></tbody></table>
    `
  },
  88: {
    questext: "Article 23 prohibits:",
    options: ["Employment of children", "Traffic in human beings and begar", "Untouchability", "Titles"],
    correct: "2",
    exptext: "✅ Trafficking and begar. 📌 23 = trafficking. ❌ Children are in Article 24."
  },
  89: {
    questext: "The Immoral Traffic (Prevention) Act was enacted in:",
    options: ["1950", "1986", "1956", "1976"],
    correct: "3",
    exptext: "✅ 1956. 📌 Article 23 law. ❌ 1986 is Child Labour Act."
  },
  90: {
    type: "concept", icon: "👧", accent: "#dc2626", pauseTimer: true,
    title: "Article 24 – Employment of Children",
    html: `
      <p class="cp-lead">Prohibits employment of children <b>below 14 years</b> in factories, mines or hazardous work.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Age</td><td>Below <b>14 years</b></td></tr><tr><td>Where</td><td>Factories, mines, hazardous work</td></tr><tr><td>Key law</td><td><b>Child Labour (Prohibition &amp; Regulation) Act, 1986</b> (amended 2016)</td></tr></tbody></table>
    `
  },
  91: {
    questext: "Article 24 prohibits employment of children below the age of:",
    options: ["12 years", "14 years", "16 years", "18 years"],
    correct: "2",
    exptext: "✅ 14 years. 📌 24 = 14. ❌ Others are wrong."
  },
  92: {
    questext: "The Child Labour (Prohibition and Regulation) Act was passed in:",
    options: ["1976", "1996", "2006", "1986"],
    correct: "4",
    exptext: "✅ 1986, amended 2016. 📌 Article 24 law. ❌ Others are invented."
  },
  93: {
    type: "concept", icon: "🕉️", accent: "#7c3aed", pauseTimer: true,
    title: "Article 25 – Freedom of Conscience & Religion",
    html: `
      <p class="cp-lead">Freedom of <b>conscience</b> and the right to <b>profess, practise and propagate</b> religion.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Key distinction</td><td>Right to <b>propagate ≠ right to convert</b></td></tr><tr><td>Sikhs</td><td>Wearing and carrying <b>kirpans</b> is included</td></tr><tr><td>‘Hindus’</td><td>Include <b>Sikhs, Jains and Buddhists</b></td></tr></tbody></table>
    `
  },
  94: {
    questext: "Article 25 gives the right to:",
    options: ["Convert others forcibly", "Freely profess, practise and propagate religion", "Manage religious property", "Run religious schools"],
    correct: "2",
    exptext: "✅ Profess, practise and propagate. 📌 Propagate ≠ convert. ❌ Property is Article 26."
  },
  95: {
    questext: "Under Article 25, the term ‘Hindus’ includes:",
    options: ["Sikhs, Jains and Buddhists", "Christians and Parsis", "Muslims", "Only Vedic followers"],
    correct: "1",
    exptext: "✅ Sikhs, Jains and Buddhists. 📌 Explanation II. ❌ Others are separate religions."
  },
  96: {
    type: "concept", icon: "🛕", accent: "#0d9488", pauseTimer: true,
    title: "Article 26 – Religious Denominations",
    html: `
      <p class="cp-lead">Freedom of <b>religious denominations</b> to manage their own religious affairs and property — a <u>collective</u> freedom.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Right</td><td>Manage religious affairs, own property</td></tr><tr><td>Nature</td><td><b>Collective</b> freedom</td></tr><tr><td>Limits</td><td>Public order, morality, health</td></tr></tbody></table>
    `
  },
  97: {
    questext: "Article 26 protects the freedom of:",
    options: ["Individuals to convert", "Religious denominations to manage their affairs", "States to tax religions", "Minorities to run schools"],
    correct: "2",
    exptext: "✅ Denominations. 📌 26 = collective. ❌ Minority schools are Article 30."
  },
  98: {
    type: "concept", icon: "💰", accent: "#db2777", pauseTimer: true,
    title: "Article 27 – No Tax for Promotion of Religion",
    html: `
      <p class="cp-lead">No person can be compelled to pay <b>taxes</b> for the promotion of any religion.</p>
      <div class="cp-note trap">Article 27 prohibits a <b>tax</b>, not a <b>fee</b>.</div>
    `
  },
  99: {
    questext: "Article 27 prohibits compulsion to pay:",
    options: ["Any fee for religious services", "Taxes for the promotion of any religion", "Donations to temples", "Income tax"],
    correct: "2",
    exptext: "✅ Taxes for religion. 📌 Tax, not fee. ❌ Fees are allowed."
  },
  100: {
    type: "concept", icon: "🏫", accent: "#2563eb", pauseTimer: true,
    title: "Article 28 – Religious Instruction in Educational Institutions",
    html: `
      <p class="cp-lead">No religious instruction in institutions <b>wholly maintained by State funds</b>.</p>
      <table><thead><tr><th>Institution</th><th>Religious instruction</th></tr></thead><tbody><tr><td>Wholly State-maintained</td><td><b>Prohibited</b></td></tr><tr><td>State-administered but trust-established</td><td><b>Permitted</b></td></tr><tr><td>State-recognised</td><td>Permitted on <b>voluntary</b> basis</td></tr><tr><td>State-aided</td><td>Permitted on <b>voluntary</b> basis</td></tr></tbody></table>
    `
  },
  101: {
    questext: "Religious instruction is completely prohibited in institutions that are:",
    options: ["State-aided", "State-recognised", "Wholly maintained by State funds", "Trust-established but State-administered"],
    correct: "3",
    exptext: "✅ Wholly State-maintained. 📌 Fully government = none. ❌ Others are permitted."
  },
  102: {
    questext: "In State-aided institutions, religious instruction is permitted on a:",
    options: ["Compulsory basis", "Voluntary basis", "Prohibited basis", "State order basis"],
    correct: "2",
    exptext: "✅ Voluntary basis. 📌 Aided = voluntary. ❌ Compulsion is not allowed."
  },
  103: {
    type: "concept", icon: "📚", accent: "#ea580c", pauseTimer: true,
    title: "Cultural & Educational Rights (Articles 29–30)",
    html: `
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>Art. 29</td><td>Any section with a distinct language, script or culture has the right to <b>conserve</b> it (protects religious and linguistic minorities)</td></tr><tr><td>Art. 30(1)</td><td>Minorities may <b>establish and administer</b> educational institutions of their choice</td></tr><tr><td>Art. 30(2)</td><td>State shall not discriminate against minority institutions in granting aid</td></tr></tbody></table>
    `
  },
  104: {
    questext: "Minorities' right to establish and administer educational institutions is under:",
    options: ["Article 29", "Article 30(1)", "Article 28", "Article 31"],
    correct: "2",
    exptext: "✅ Article 30(1). 📌 30 = minority schools. ❌ Article 29 is conserving culture."
  },
  105: {
    questext: "Article 29 protects the right of any section to conserve its distinct:",
    options: ["Language, script or culture", "Property", "Religion only", "Political party"],
    correct: "1",
    exptext: "✅ Language, script or culture. 📌 Minorities of both kinds. ❌ Property is not covered."
  },
  106: {
    type: "concept", icon: "🔱", accent: "#65a30d", pauseTimer: true,
    title: "Right to Constitutional Remedies (Article 32)",
    html: `
      <p class="cp-lead">Article 32 confers the <b>right to move the Supreme Court</b> for enforcement of Fundamental Rights.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Dr. Ambedkar</td><td>Called it the <b>‘heart and soul of the Constitution’</b></td></tr><tr><td>Status</td><td>Held a <b>basic feature</b> by the SC</td></tr><tr><td>Writs</td><td>SC (Art. 32) and High Courts (Art. 226) can issue <b>five writs</b></td></tr><tr><td>Origin of writs</td><td>English law (‘prerogative writs’)</td></tr></tbody></table>
    `
  },
  107: {
    questext: "Dr. Ambedkar described which Article as the ‘heart and soul’ of the Constitution?",
    options: ["Article 14", "Article 21", "Article 32", "Article 19"],
    correct: "3",
    exptext: "✅ Article 32. 📌 Remedy for rights. ❌ Others are rights, not remedies."
  },
  108: {
    questext: "The writs in the Indian Constitution have been borrowed from:",
    options: ["USA", "English law", "Ireland", "Canada"],
    correct: "2",
    exptext: "✅ English law. 📌 Prerogative writs. ❌ PIL is from USA."
  },
  109: {
    type: "concept", icon: "✍️", accent: "#0891b2", pauseTimer: true,
    title: "The Five Writs",
    html: `
      <table><thead><tr><th>Writ</th><th>Literal meaning</th><th>Purpose / against whom</th></tr></thead><tbody><tr><td>Habeas Corpus</td><td>To have the body</td><td>Produce a detained person; tests legality of detention; against <b>public and private</b></td></tr><tr><td>Mandamus</td><td>We command</td><td>Compel a public official / body to do its duty; <b>not against private</b> individuals</td></tr><tr><td>Prohibition</td><td>To forbid</td><td>Stop a lower court / tribunal exceeding jurisdiction (<b>preventive</b>); judicial / quasi-judicial only</td></tr><tr><td>Certiorari</td><td>To be certified</td><td>Transfer / quash a lower court's order (<b>preventive + curative</b>); also against administrative bodies (since 1991)</td></tr><tr><td>Quo-Warranto</td><td>By what authority</td><td>Enquire into legality of a claim to a <b>public office</b>; any interested person may seek it</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>H-M-P-C-Q</b> — “Her Mother Pays Cash Quickly”</div>
    `
  },
  110: {
    questext: "Which writ literally means ‘to have the body’?",
    options: ["Mandamus", "Habeas Corpus", "Certiorari", "Quo-Warranto"],
    correct: "2",
    exptext: "✅ Habeas Corpus. 📌 Produce the person. ❌ Mandamus means 'we command'."
  },
  111: {
    questext: "Which writ cannot be issued against a private individual?",
    options: ["Habeas Corpus", "Mandamus", "Both of these", "Neither"],
    correct: "2",
    exptext: "✅ Mandamus is only against public officials/bodies. 📌 Habeas Corpus works against private detention. ❌ Option 3 wrongly includes habeas corpus."
  },
  112: {
    questext: "The writ used to enquire into the legality of a person's claim to a public office is:",
    options: ["Prohibition", "Certiorari", "Mandamus", "Quo-Warranto"],
    correct: "4",
    exptext: "✅ Quo-Warranto, 'by what authority'. 📌 Any interested person can seek it. ❌ Others address orders or duties."
  },
  113: {
    questext: "Which writ is both preventive and curative?",
    options: ["Prohibition", "Certiorari", "Mandamus", "Habeas Corpus"],
    correct: "2",
    exptext: "✅ Certiorari. 📌 Prohibition is only preventive. ❌ Others are different in nature."
  },
  114: {
    questext: "Which writ is issued to stop a lower court from exceeding its jurisdiction?",
    options: ["Prohibition", "Quo-Warranto", "Mandamus", "Certiorari"],
    correct: "1",
    exptext: "✅ Prohibition, 'to forbid'. 📌 Preventive, judicial bodies only. ❌ Certiorari quashes an order already passed."
  },
  115: {
    type: "concept", icon: "🏛️", accent: "#9333ea", pauseTimer: true,
    title: "Supreme Court vs High Court — Writ Powers",
    html: `
      <table><thead><tr><th>Supreme Court (Art. 32)</th><th>High Court (Art. 226)</th></tr></thead><tbody><tr><td>Issues all 5 writs</td><td>Issues all 5 writs</td></tr><tr><td>Only for enforcement of Fundamental Rights</td><td>For FR as well as other (ordinary legal) matters</td></tr><tr><td><b>Bound</b> to provide remedy (Art. 32 itself is a FR)</td><td><b>Not bound</b>; may suggest other remedies</td></tr><tr><td>Can issue prohibition against a High Court</td><td>Cannot issue writ against the Supreme Court</td></tr></tbody></table>
    `
  },
  116: {
    questext: "Which statement is correct about writ jurisdiction?",
    options: ["High Court can issue writs only for Fundamental Rights", "Supreme Court can issue writs only for Fundamental Rights", "Supreme Court is not bound to provide a remedy", "High Court is bound to provide a remedy"],
    correct: "2",
    exptext: "✅ SC: only for FR. 📌 HC: FR and ordinary matters. ❌ SC is bound; HC is not."
  },
  117: {
    questext: "Writ jurisdiction under Article 226 belongs to:",
    options: ["Supreme Court", "High Courts", "District Courts", "Tribunals"],
    correct: "2",
    exptext: "✅ High Courts. 📌 226 = HC. ❌ Article 32 is the SC."
  },
  118: {
    type: "concept", icon: "🪖", accent: "#be123c", pauseTimer: true,
    title: "Other Provisions (Articles 33–35)",
    html: `
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>Art. 33</td><td><b>Parliament</b> may restrict / abrogate FR of armed forces, paramilitary, police and intelligence to ensure discipline</td></tr><tr><td>Art. 34</td><td>Restriction on FR while <b>martial law</b> is in force; Parliament may indemnify acts done to restore order</td></tr><tr><td>Art. 35</td><td>Power to make laws to give effect to certain FR vests only in <b>Parliament</b> (not state legislatures)</td></tr></tbody></table>
    `
  },
  119: {
    questext: "Parliament can restrict Fundamental Rights of armed forces under:",
    options: ["Article 33", "Article 34", "Article 35", "Article 32"],
    correct: "1",
    exptext: "✅ Article 33. 📌 33 = forces. ❌ Article 34 is martial law."
  },
  120: {
    questext: "Restrictions on Fundamental Rights while martial law is in force are covered by:",
    options: ["Article 33", "Article 35", "Article 34", "Article 32"],
    correct: "3",
    exptext: "✅ Article 34. 📌 Martial law = 34. ❌ Article 35 gives Parliament law-making power."
  },
  121: {
    questext: "Under Article 35, laws to give effect to certain Fundamental Rights can be made only by:",
    options: ["State legislatures", "Parliament", "President", "Supreme Court"],
    correct: "2",
    exptext: "✅ Parliament alone. 📌 Uniform FR laws. ❌ States have no such power."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Fundamental_Rights/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a softly blurred bronze scale of justice, a gavel and a plain-cover bound book" }
});

/* CHANGE LOG
   - Article 16(4A): added that consequential seniority was added by the 85th Amendment, 2001.
   - Preventive detention laws: TADA and POTA are no longer in force (repealed or lapsed).
   - Art. 15(2) and 16(2) grounds kept separate: 'descent' and 'residence' appear only in Art. 16(2).
*/
