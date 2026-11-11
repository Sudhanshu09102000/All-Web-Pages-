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

/* Subject: General_Awareness/Polity · Chapter: Fundamental_Duties_and_Doctrine_of_Basic_Structure · 13 concept pages (+ overview) · 47 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Fundamental Duties & Doctrine of Basic Structure",
    thumb: {
      image: "images/General_Awareness/Polity/Fundamental_Duties_and_Doctrine_of_Basic_Structure/thumbnail.png",
      banner: "SSC CGL • UPSC • ALL EXAMS",
      line1: "FUNDAMENTAL DUTIES",
      line2: "BASIC STRUCTURE",
      line3: "ARTICLE 51A • 368",
      badge: "FULL CLASS",
      ribbon: "POLITY • CASES • AMENDMENTS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Fundamental Duties & Basic Structure Doctrine | Article 368 | Polity SSC CGL UPSC",
      altTitles: ["Article 51A and Article 368 in One Class", "Kesavananda Bharati and Basic Structure Explained"],
      description: "Fundamental Duties and the Basic Structure doctrine are scoring polity topics. In this full class we cover Article 51A and the eleven duties, Article 368 amendment methods, Basic Structure cases from Shankari Prasad to Waman Rao, the parliamentary system and the federal vs unitary features of the Constitution.\n\n📌 IN THIS CLASS\n✅ Eleven Fundamental Duties\n✅ Three methods of amendment\n✅ Basic Structure cases\n✅ Parliamentary and federal system\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #BasicStructure #SSCCGL",
      tags: ["fundamental duties", "Article 51A", "Article 368", "basic structure doctrine", "Kesavananda Bharati", "constitutional amendment", "polity for SSC CGL", "polity for all exams", "Indian polity", "Swaran Singh Committee", "Verma Committee", "parliamentary system", "presidential vs parliamentary", "federal vs unitary", "unitary features", "special majority", "42nd Amendment", "86th Amendment", "polity MCQ", "polity tricks", "General Awareness", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "Fundamental Duties and"],
      hashtags: ["Polity", "BasicStructure", "SSCCGL", "IndianPolity"],
      thumbText: "FUNDAMENTAL DUTIES + BASIC STRUCTURE",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New polity class is live: Fundamental Duties & Basic Structure. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Polity — Full Classes for All Exams"
    },
    html: `
      <p class="cp-lead">A <u>complete fast-track on Fundamental Duties, Article 368, the Basic Structure doctrine, and the parliamentary and federal features of the Constitution</u>.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>47</b><span>Questions</span></div>
        <div class="cp-stat"><b>~73 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Fundamental Duties</b><br>Part IV-A, Article 51A, the eleven duties and supporting laws.</li>
        <li><b>Amendment (Article 368)</b><br>Procedure and the three methods of amendment.</li>
        <li><b>Basic Structure</b><br>From Shankari Prasad to Waman Rao, and the elements of basic structure.</li>
        <li><b>Parliamentary System</b><br>Features and comparison with the Presidential system.</li>
        <li><b>Federal System</b><br>Federal vs unitary government and India's unitary features.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> number of duties, amendment majorities and the Kesavananda case line are asked directly in SSC, UPSC, Railways and State exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🙏", accent: "#22c55e", pauseTimer: true,
    title: "Fundamental Duties (Part IV-A, Art. 51A)",
    html: `
      <p class="cp-lead">The original Constitution had only rights. Duties were added in <b>1976 (42nd Amendment)</b>, inserting <b>Part IV-A</b> with a single article — <b>Article 51A</b>.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Inspired by</td><td>Constitution of the erstwhile <b>USSR</b></td></tr><tr><td>Japan</td><td>Perhaps the only major democratic constitution listing duties of citizens</td></tr><tr><td>Recommended by</td><td><b>Swaran Singh Committee</b> (suggested 8; <b>10</b> were added)</td></tr><tr><td>Nature</td><td>Non-justiciable (not directly enforceable by courts)</td></tr><tr><td>Applicable to</td><td><b>Only Indian citizens</b>, not foreigners</td></tr><tr><td>11th duty</td><td>Added by the <b>86th Amendment, 2002</b></td></tr></tbody></table>
    `
  },
  3: {
    questext: "Fundamental Duties were added to the Constitution by the:",
    options: ["42nd Amendment", "24th Amendment", "44th Amendment", "86th Amendment"],
    correct: "1",
    exptext: "✅ 42nd Amendment, 1976. 📌 Duties = 42. ❌ 86th added the eleventh duty."
  },
  4: {
    questext: "Fundamental Duties are contained in:",
    options: ["Part IV", "Part IV-A, Article 51A", "Part III", "Part V"],
    correct: "2",
    exptext: "✅ Part IV-A, Article 51A. 📌 One article only. ❌ Part IV is DPSP."
  },
  5: {
    questext: "The idea of Fundamental Duties was inspired by the Constitution of:",
    options: ["USA", "Ireland", "USSR", "France"],
    correct: "3",
    exptext: "✅ USSR. 📌 Duties = Soviet. ❌ Ireland gave DPSP."
  },
  6: {
    questext: "The Swaran Singh Committee suggested ___ duties, but ___ were added in 1976.",
    options: ["10; 8", "11; 10", "8; 11", "8; 10"],
    correct: "4",
    exptext: "✅ Suggested 8, added 10. 📌 11th came in 2002. ❌ Others reverse or inflate."
  },
  7: {
    questext: "Fundamental Duties are applicable to:",
    options: ["All persons", "Citizens and foreigners", "Only Indian citizens", "Only government employees"],
    correct: "3",
    exptext: "✅ Only Indian citizens. 📌 'Every citizen'. ❌ Foreigners are not bound."
  },
  8: {
    type: "concept", icon: "🔢", accent: "#f59e0b", pauseTimer: true,
    title: "The Eleven Fundamental Duties",
    html: `
      <p class="cp-lead">It shall be the duty of <u>every citizen of India</u> to:</p>
      <table><thead><tr><th>Clause</th><th>Duty</th></tr></thead><tbody><tr><td>(a)</td><td>Abide by the Constitution; respect its ideals, institutions, National Flag and Anthem</td></tr><tr><td>(b)</td><td>Cherish the noble ideals of the freedom struggle</td></tr><tr><td>(c)</td><td>Uphold and protect sovereignty, unity and integrity of India</td></tr><tr><td>(d)</td><td>Defend the country and render national service when called</td></tr><tr><td>(e)</td><td>Promote harmony and brotherhood; renounce practices derogatory to the dignity of women</td></tr><tr><td>(f)</td><td>Value and preserve the rich composite culture</td></tr><tr><td>(g)</td><td>Protect and improve the natural environment; have compassion for living creatures</td></tr><tr><td>(h)</td><td>Develop scientific temper, humanism and spirit of inquiry</td></tr><tr><td>(i)</td><td>Safeguard public property and abjure violence</td></tr><tr><td>(j)</td><td>Strive towards excellence in all spheres</td></tr><tr><td>(k)</td><td>Provide education to one’s child / ward aged <b>6–14 years</b> (<b>86th Amendment, 2002</b>)</td></tr></tbody></table>
    `
  },
  9: {
    questext: "The duty to develop scientific temper, humanism and spirit of inquiry is in clause:",
    options: ["(f)", "(g)", "(h)", "(i)"],
    correct: "3",
    exptext: "✅ Clause (h). 📌 h = humanism. ❌ (g) is environment."
  },
  10: {
    questext: "The duty of parents to provide education to children aged 6–14 was added by the:",
    options: ["86th Amendment", "42nd Amendment", "97th Amendment", "44th Amendment"],
    correct: "1",
    exptext: "✅ 86th Amendment, 2002, clause (k). 📌 Same Amendment gave Article 21A. ❌ 42nd added the original 10."
  },
  11: {
    questext: "Which duty is NOT among the Fundamental Duties?",
    options: ["Safeguard public property and abjure violence", "Pay taxes honestly", "Strive towards excellence", "Protect and improve the natural environment"],
    correct: "2",
    exptext: "✅ Paying taxes is not listed. 📌 Eleven duties only. ❌ Others are in Article 51A."
  },
  12: {
    questext: "Renouncing practices derogatory to the dignity of women is a duty under clause:",
    options: ["(c)", "(d)", "(e)", "(f)"],
    correct: "3",
    exptext: "✅ Clause (e). 📌 Harmony and brotherhood. ❌ (f) is composite culture."
  },
  13: {
    questext: "Which clause requires citizens to defend the country and render national service when called?",
    options: ["(c)", "(d)", "(e)", "(j)"],
    correct: "2",
    exptext: "✅ Clause (d). 📌 d = defend. ❌ (c) is sovereignty and integrity."
  },
  14: {
    type: "concept", icon: "📚", accent: "#ef4444", pauseTimer: true,
    title: "Laws that Indirectly Enforce Fundamental Duties",
    html: `
      <p class="cp-lead"><b>Justice Verma Committee (1999)</b> identified <u>legal provisions</u> for implementing duties and stressed <b>teaching duties in schools</b>.</p>
      <table><thead><tr><th>Law</th><th>Fundamental duty reflected</th></tr></thead><tbody><tr><td>Prevention of Insults to National Honour Act, 1971</td><td>Respect the Constitution, National Flag and Anthem</td></tr><tr><td>Environment Protection Act 1986; Wildlife Protection Act 1972; Forest Conservation Act 1980</td><td>Protect the environment, forests, rivers and wildlife</td></tr><tr><td>Right to Education Act, 2009</td><td>Provide education to children aged 6–14 years</td></tr><tr><td>Penal provisions against hate speech and communal violence (now in the Bharatiya Nyaya Sanhita)</td><td>Promote harmony and brotherhood</td></tr><tr><td>Prevention of Damage to Public Property Act, 1984</td><td>Safeguard public property and abjure violence</td></tr></tbody></table>
      <div class="cp-note trap">FDs are not directly enforceable, but many <b>existing laws indirectly enforce</b> them.</div>
    `
  },
  15: {
    questext: "The Justice Verma Committee (1999) stressed:",
    options: ["Abolishing Fundamental Duties", "Adding new rights", "Making duties justiciable", "Teaching duties in schools"],
    correct: "4",
    exptext: "✅ Teaching duties in schools. 📌 Verma = schools. ❌ It did not make duties justiciable."
  },
  16: {
    questext: "The Prevention of Insults to National Honour Act, 1971 reflects the duty to:",
    options: ["Respect the Constitution, National Flag and Anthem", "Protect the environment", "Educate children", "Safeguard public property"],
    correct: "1",
    exptext: "✅ Respect Constitution, Flag and Anthem. 📌 National honour. ❌ Others are linked to different Acts."
  },
  17: {
    questext: "The Prevention of Damage to Public Property Act, 1984 reflects which duty?",
    options: ["Promote harmony", "Defend the country", "Scientific temper", "Safeguard public property and abjure violence"],
    correct: "4",
    exptext: "✅ Safeguard public property. 📌 1984 Act. ❌ Others are unrelated."
  },
  18: {
    type: "concept", icon: "✏️", accent: "#8b5cf6", pauseTimer: true,
    title: "Amendment of the Constitution (Article 368)",
    html: `
      <p class="cp-lead">Article 368 (<b>Part XX</b>) deals with <u>Parliament’s power to amend</u>.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Nature</td><td>Neither wholly flexible nor rigid — a <b>synthesis of both</b> (easier than USA, harder than Britain)</td></tr><tr><td>Power</td><td>Amend by <b>addition, variation or repeal</b></td></tr><tr><td>Limit</td><td>Cannot alter the <b>‘basic structure’</b> (Kesavananda Bharati, 1973)</td></tr></tbody></table>
    `
  },
  19: {
    questext: "The procedure for amending the Constitution is given in:",
    options: ["Article 368", "Article 356", "Article 370", "Article 360"],
    correct: "1",
    exptext: "✅ Article 368, Part XX. 📌 368 = amend. ❌ 356 is President's Rule."
  },
  20: {
    questext: "The Indian Constitution is:",
    options: ["Wholly rigid", "Wholly flexible", "Neither wholly flexible nor wholly rigid", "Wholly unwritten"],
    correct: "3",
    exptext: "✅ A synthesis of both. 📌 Easier than USA, harder than Britain. ❌ Extremes do not fit."
  },
  21: {
    questext: "Parliament’s amending power under Article 368 cannot alter:",
    options: ["Fundamental Rights", "The basic structure", "Directive Principles", "Schedules"],
    correct: "2",
    exptext: "✅ The basic structure. 📌 Kesavananda, 1973. ❌ FR can be amended within limits."
  },
  22: {
    type: "concept", icon: "🧾", accent: "#14b8a6", pauseTimer: true,
    title: "Amendment Procedure",
    html: `
      <table><thead><tr><th>Step</th><th>Rule</th></tr></thead><tbody><tr><td>Introduction</td><td>Bill introduced only in <b>either House of Parliament</b> (not state legislatures); by a minister or private member; <b>no prior Presidential permission</b></td></tr><tr><td>Passage</td><td>In each House <b>separately</b> by a <b>special majority</b> (majority of total membership + 2/3 of members present and voting); <b>no joint sitting</b></td></tr><tr><td>Federal provisions</td><td>Also ratified by <b>half the state legislatures</b> (simple majority; no time limit)</td></tr><tr><td>Assent</td><td>President <b>must give assent</b> — cannot withhold or return</td></tr></tbody></table>
    `
  },
  23: {
    questext: "An Amendment Bill under Article 368 can be introduced:",
    options: ["Only in the Lok Sabha", "Only in the Rajya Sabha", "In a state legislature", "In either House of Parliament"],
    correct: "4",
    exptext: "✅ Either House. 📌 Not state legislatures. ❌ Money bills are Lok Sabha-only."
  },
  24: {
    questext: "For a constitutional amendment, a joint sitting in case of deadlock is:",
    options: ["Not permitted", "Permitted", "Permitted by President", "Permitted by Speaker"],
    correct: "1",
    exptext: "✅ No joint sitting. 📌 Each House separately. ❌ Joint sitting applies to ordinary bills."
  },
  25: {
    questext: "The President, on an Amendment Bill passed under Article 368:",
    options: ["May withhold assent", "Must give assent", "May return it for reconsideration", "May refer it to the Supreme Court"],
    correct: "2",
    exptext: "✅ Must give assent. 📌 24th Amendment. ❌ Withholding or returning is not allowed."
  },
  26: {
    questext: "The special majority for an amendment is:",
    options: ["Simple majority of members present", "Three-fourths of members present", "Two-thirds of total membership", "Majority of total membership plus two-thirds of members present and voting"],
    correct: "4",
    exptext: "✅ Total-membership majority + two-thirds present and voting. 📌 Both conditions. ❌ Others are incomplete."
  },
  27: {
    type: "concept", icon: "🗳️", accent: "#3b82f6", pauseTimer: true,
    title: "Three Methods of Constitutional Amendment",
    html: `
      <table><thead><tr><th>Method</th><th>Majority required</th><th>Examples</th></tr></thead><tbody><tr><td><b>1. Simple majority</b> (outside Art. 368)</td><td>Simple majority of members present and voting</td><td>New states admission / formation; Legislative Councils; 2nd, 5th and 6th Schedules; citizenship; quorum, salaries and privileges of Parliament; official language; UT; delimitation; number of judges in the Supreme Court</td></tr><tr><td><b>2. Special majority</b> (Art. 368)</td><td>Majority of total membership of each House + 2/3 of members present and voting</td><td>Fundamental Rights; Directive Principles; all other provisions not in category 1 or 3</td></tr><tr><td><b>3. Special majority + state ratification</b></td><td>Special majority + ratification by at least half the states (simple majority)</td><td>Election of President; executive power of Union and states; Supreme Court and High Courts; distribution of legislative powers (7th Schedule); GST Council; representation of states in Parliament; Article 368 itself</td></tr></tbody></table>
    `
  },
  28: {
    questext: "Citizenship provisions can be amended by:",
    options: ["Simple majority", "Special majority", "Special majority with state ratification", "Unanimous vote"],
    correct: "1",
    exptext: "✅ Simple majority, outside Article 368. 📌 Same for states, schedules. ❌ FR need special majority."
  },
  29: {
    questext: "Which provision needs special majority plus ratification by half the states?",
    options: ["Fundamental Rights", "Election of the President", "Directive Principles", "Official language"],
    correct: "2",
    exptext: "✅ Election of the President. 📌 Federal provisions. ❌ FR and DPSP need only special majority."
  },
  30: {
    questext: "Fundamental Rights can be amended by:",
    options: ["Simple majority", "Special majority plus state ratification", "Special majority", "Referendum"],
    correct: "3",
    exptext: "✅ Special majority. 📌 FR and DPSP. ❌ No ratification needed."
  },
  31: {
    questext: "Which of the following needs state ratification?",
    options: ["Delimitation", "Quorum of Parliament", "Salaries of MPs", "Distribution of legislative powers between Centre and states"],
    correct: "4",
    exptext: "✅ 7th Schedule distribution. 📌 Federal. ❌ Others use simple majority."
  },
  32: {
    type: "concept", icon: "🏗️", accent: "#f97316", pauseTimer: true,
    title: "Basic Structure of the Constitution",
    html: `
      <p class="cp-lead">Whether Parliament can amend Fundamental Rights led to <u>landmark cases</u>.</p>
      <table><thead><tr><th>Case / Amendment</th><th>Held</th></tr></thead><tbody><tr><td><b>Shankari Prasad (1951)</b></td><td>Art. 368 power includes amending FR</td></tr><tr><td><b>Golak Nath (1967)</b></td><td>FR are ‘transcendental and immutable’; Parliament cannot abridge FR</td></tr><tr><td><b>24th Amendment (1971)</b></td><td>Parliament can amend FR; such an Act is not ‘law’ under Art. 13</td></tr><tr><td><b>Kesavananda Bharati (1973)</b></td><td>Upheld 24th Amendment but laid down the <b>‘Basic Structure’ doctrine</b></td></tr><tr><td><b>42nd Amendment (1976)</b></td><td>Declared no limit on amending power</td></tr><tr><td><b>Minerva Mills (1980)</b></td><td>Struck that down — <b>judicial review</b> is a basic feature</td></tr><tr><td><b>Waman Rao (1981)</b></td><td>Basic structure applies to amendments after <b>24 April 1973</b></td></tr></tbody></table>
    `
  },
  33: {
    questext: "The doctrine of Basic Structure was laid down in:",
    options: ["Kesavananda Bharati", "Shankari Prasad", "Golak Nath", "Waman Rao"],
    correct: "1",
    exptext: "✅ Kesavananda Bharati, 1973. 📌 Kerala 1973. ❌ Waman Rao applied it from 24 April 1973."
  },
  34: {
    questext: "Which Amendment declared that there is no limit on Parliament’s amending power?",
    options: ["24th", "42nd", "25th", "44th"],
    correct: "2",
    exptext: "✅ 42nd Amendment, 1976. 📌 Struck down in Minerva Mills. ❌ 24th restored FR amendability."
  },
  35: {
    questext: "The Basic Structure doctrine applies to amendments made after:",
    options: ["26 January 1950", "26 June 1975", "24 April 1973", "1 November 1980"],
    correct: "3",
    exptext: "✅ 24 April 1973 (Waman Rao, 1981). 📌 Kesavananda date. ❌ Others are unrelated."
  },
  36: {
    questext: "In which case did the Supreme Court hold that judicial review is a basic feature after the 42nd Amendment?",
    options: ["Champakam Dorairajan", "Golak Nath", "Shankari Prasad", "Minerva Mills"],
    correct: "4",
    exptext: "✅ Minerva Mills, 1980. 📌 Struck 42nd's no-limit clause. ❌ Others are earlier."
  },
  37: {
    type: "concept", icon: "🧱", accent: "#84cc16", pauseTimer: true,
    title: "Elements of the ‘Basic Structure’",
    html: `
      <p class="cp-lead">Judicially recognised elements — <u>Parliament can amend any part, including FR, without damaging the basic structure</u>.</p>
      <table><thead><tr><th>Element</th></tr></thead><tbody><tr><td>Supremacy of the Constitution</td></tr><tr><td>Sovereign, democratic and republican polity</td></tr><tr><td><b>Secularism</b></td></tr><tr><td>Separation of powers; federal character</td></tr><tr><td>Unity and integrity</td></tr><tr><td><b>Welfare state</b></td></tr><tr><td><b>Judicial review</b></td></tr><tr><td>Freedom and dignity of the individual</td></tr><tr><td>Parliamentary system</td></tr><tr><td><b>Rule of law</b></td></tr><tr><td>Harmony between FR and DPSP</td></tr><tr><td>Principle of equality</td></tr><tr><td>Free and fair elections</td></tr><tr><td><b>Independence of judiciary</b></td></tr><tr><td>Limited amending power</td></tr><tr><td>Access to justice</td></tr><tr><td>Powers of SC (Art. 32, 136, 141, 142) and HCs (Art. 226, 227)</td></tr></tbody></table>
    `
  },
  38: {
    questext: "Which of the following is part of the basic structure of the Constitution?",
    options: ["Rule of law", "Number of Rajya Sabha seats", "Language of the Union", "Salaries of MPs"],
    correct: "1",
    exptext: "✅ Rule of law. 📌 Core values only. ❌ Others are ordinary provisions."
  },
  39: {
    questext: "The basic structure includes the powers of the Supreme Court under Articles:",
    options: ["124, 125, 126", "32, 136, 141, 142", "72, 73, 74", "352, 356, 360"],
    correct: "2",
    exptext: "✅ Articles 32, 136, 141, 142. 📌 High Courts: 226, 227. ❌ Others concern different topics."
  },
  40: {
    questext: "Which of these is NOT listed as an element of basic structure?",
    options: ["Secularism", "Welfare state", "Uniform Civil Code", "Independence of judiciary"],
    correct: "3",
    exptext: "✅ UCC is a directive, not a basic feature. 📌 Others are listed. ❌ Secularism is a core element."
  },
  41: {
    type: "concept", icon: "🏛️", accent: "#06b6d4", pauseTimer: true,
    title: "Parliamentary System",
    html: `
      <p class="cp-lead">India has a <b>parliamentary form</b> at the Centre (<b>Art. 74, 75</b>) and states (<b>Art. 163, 164</b>); also called the <b>Cabinet / Responsible / Westminster model</b> (Britain, Japan, Canada, India).</p>
    `
  },
  42: {
    questext: "The parliamentary system for the Centre is provided in Articles:",
    options: ["52 and 53", "124 and 125", "163 and 164", "74 and 75"],
    correct: "4",
    exptext: "✅ Articles 74 and 75. 📌 States: 163, 164. ❌ 52–53 deal with the President."
  },
  43: {
    questext: "The parliamentary system is also known as the:",
    options: ["Westminster model", "Presidential model", "Federal model", "Dual model"],
    correct: "1",
    exptext: "✅ Westminster, Cabinet or Responsible model. 📌 Britain origin. ❌ Presidential is the US model."
  },
  44: {
    type: "concept", icon: "⚙️", accent: "#a855f7", pauseTimer: true,
    title: "Features of Parliamentary Government",
    html: `
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td><b>Nominal &amp; real executives</b></td><td>President = nominal (head of State); PM = real (head of government)</td></tr><tr><td><b>Majority party rule</b></td><td>Majority party in Lok Sabha forms government; its leader becomes PM</td></tr><tr><td><b>Collective responsibility</b></td><td>Bedrock principle — ministers collectively responsible to the <b>Lok Sabha (Art. 75)</b>; no-confidence vote removes the ministry</td></tr><tr><td><b>Double membership</b></td><td>Ministers belong to both legislature and executive</td></tr><tr><td><b>Leadership of the PM</b></td><td>Leader of the council of ministers, the House and the party</td></tr><tr><td><b>Dissolution of lower house</b></td><td>PM can advise the President to dissolve the Lok Sabha</td></tr><tr><td><b>Secrecy</b></td><td>Ministers work on the principle of secrecy of procedure</td></tr></tbody></table>
    `
  },
  45: {
    questext: "The bedrock principle of parliamentary government is:",
    options: ["Separation of powers", "Collective responsibility", "Judicial review", "Federalism"],
    correct: "2",
    exptext: "✅ Collective responsibility to the Lok Sabha (Art. 75). 📌 Ministers sink or swim together. ❌ Separation of powers is presidential."
  },
  46: {
    questext: "In India, the real executive is the:",
    options: ["President", "Vice-President", "Prime Minister", "Chief Justice"],
    correct: "3",
    exptext: "✅ Prime Minister. 📌 President = nominal. ❌ Others are not executives."
  },
  47: {
    questext: "Ministers in a parliamentary system are collectively responsible to the:",
    options: ["President", "Rajya Sabha", "Supreme Court", "Lok Sabha"],
    correct: "4",
    exptext: "✅ Lok Sabha. 📌 Art. 75. ❌ Rajya Sabha cannot remove the ministry."
  },
  48: {
    questext: "Double membership means ministers:",
    options: ["Belong to both legislature and executive", "Hold two portfolios", "Serve two terms", "Sit in both Houses"],
    correct: "1",
    exptext: "✅ Belong to legislature and executive. 📌 Ministers are MPs. ❌ Not about portfolios."
  },
  49: {
    type: "concept", icon: "🆚", accent: "#e11d48", pauseTimer: true,
    title: "Parliamentary vs Presidential Government",
    html: `
      <table><thead><tr><th>Parliamentary (India)</th><th>Presidential (USA)</th></tr></thead><tbody><tr><td>Nominal (President) + real (PM) executive</td><td>President is both head of State and government</td></tr><tr><td>Executive is part of and responsible to the legislature</td><td>Executive not responsible to the legislature</td></tr><tr><td>Collective responsibility to the Lok Sabha</td><td>Responsible only to the President</td></tr><tr><td>Double membership (ministers are MPs)</td><td>Secretaries are not members of the legislature</td></tr><tr><td>PM can advise dissolution of Lok Sabha</td><td>President cannot dissolve the lower house</td></tr><tr><td>Based on <b>co-operation</b> of organs</td><td>Based on <b>separation</b> of powers</td></tr><tr><td>Britain, Japan, Canada, India</td><td>USA, Brazil, Russia, Sri Lanka</td></tr></tbody></table>
    `
  },
  50: {
    questext: "Which of the following is a feature of the Presidential system?",
    options: ["Collective responsibility", "Separation of powers", "Double membership", "Dissolution of lower house by the head"],
    correct: "2",
    exptext: "✅ Separation of powers. 📌 Parliamentary = co-operation. ❌ Others are parliamentary."
  },
  51: {
    questext: "In the Presidential system, secretaries:",
    options: ["Are members of the legislature", "Are elected by people", "Are not members of the legislature", "Dissolve the legislature"],
    correct: "3",
    exptext: "✅ Not members of the legislature. 📌 No double membership. ❌ Ministers are MPs in India."
  },
  52: {
    questext: "Which country follows the Presidential system?",
    options: ["Britain", "Japan", "Canada", "USA"],
    correct: "4",
    exptext: "✅ USA. 📌 Also Brazil, Russia, Sri Lanka in the notes. ❌ Others are parliamentary."
  },
  53: {
    type: "concept", icon: "🗺️", accent: "#10b981", pauseTimer: true,
    title: "Federal System",
    html: `
      <p class="cp-lead">India is <b>federal in form but unitary in spirit</b>. Governments are <b>unitary</b> (all powers with national government) or <b>federal</b> (powers divided by the Constitution).</p>
      <table><thead><tr><th>Federal government</th><th>Unitary government</th></tr></thead><tbody><tr><td>Dual government (national + regional)</td><td>Single national government (may create regions)</td></tr><tr><td>Written Constitution</td><td>Written (France) or unwritten (Britain)</td></tr><tr><td>Division of powers between levels</td><td>No division; all powers with national government</td></tr><tr><td>Supremacy of the Constitution</td><td>May be supreme (Japan) or not (Britain)</td></tr><tr><td>Rigid Constitution</td><td>Rigid (France) or flexible (Britain)</td></tr><tr><td>Independent judiciary</td><td>May or may not be independent</td></tr><tr><td>Bicameral legislature</td><td>Bicameral (Britain) or unicameral (China)</td></tr></tbody></table>
      <div class="cp-note exam">US, Canada and Australia are federal.</div>
    `
  },
  54: {
    questext: "India is described as:",
    options: ["Federal in form but unitary in spirit", "Purely unitary", "Purely federal", "Confederal"],
    correct: "1",
    exptext: "✅ Federal in form, unitary in spirit. 📌 Strong Centre. ❌ Not purely either."
  },
  55: {
    questext: "Which is a feature of a federal government?",
    options: ["Single national government", "Division of powers between levels", "Flexible constitution always", "No written constitution"],
    correct: "2",
    exptext: "✅ Division of powers. 📌 Dual government. ❌ Others are unitary traits."
  },
  56: {
    questext: "Which of the following is a unitary state?",
    options: ["USA", "Canada", "Britain", "Australia"],
    correct: "3",
    exptext: "✅ Britain. 📌 US, Canada, Australia are federal. ❌ Others are federal."
  },
  57: {
    type: "concept", icon: "🏰", accent: "#d946ef", pauseTimer: true,
    title: "Unitary Features of the Indian Constitution",
    html: `
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td><b>Strong Centre</b></td><td>Union List longer and weightier; Centre overrides Concurrent List; residuary powers with Centre</td></tr><tr><td><b>States not indestructible</b></td><td>Parliament can change area, boundary or name by simple majority — ‘an indestructible Union of destructible states’</td></tr><tr><td><b>Single Constitution</b></td><td>States cannot frame their own Constitution</td></tr><tr><td><b>Flexibility</b></td><td>Bulk of the Constitution amended by Parliament alone; only the Centre can initiate amendment</td></tr><tr><td><b>Emergency provisions</b></td><td>During emergency the federal structure becomes unitary</td></tr><tr><td><b>All-India Services</b></td><td>IAS, IPS, IFS common to Centre and states</td></tr><tr><td><b>Integrated audit</b></td><td>CAG audits both; appointed and removed by the President</td></tr><tr><td><b>Governor</b></td><td>Appointed by the President; acts as an agent of the Centre</td></tr><tr><td><b>Integrated election machinery</b></td><td>Election Commission conducts Central and state elections</td></tr><tr><td><b>Veto over state bills</b></td><td>Governor may reserve bills for the President, who has absolute veto</td></tr></tbody></table>
    `
  },
  58: {
    questext: "Residuary powers in India are with the:",
    options: ["States", "Supreme Court", "Local bodies", "Centre"],
    correct: "4",
    exptext: "✅ Centre. 📌 Strong Centre. ❌ In the USA residuary powers are with states."
  },
  59: {
    questext: "Which of the following is a unitary feature of the Indian Constitution?",
    options: ["All-India Services", "Independent judiciary", "Written Constitution", "Bicameral Parliament"],
    correct: "1",
    exptext: "✅ All-India Services. 📌 Common to Centre and states. ❌ Others are federal features."
  },
  60: {
    questext: "‘An indestructible Union of destructible states’ means:",
    options: ["States cannot be changed", "Parliament can change states' area, boundary or name", "States can secede", "Union can be dissolved"],
    correct: "2",
    exptext: "✅ Parliament can alter states by simple majority. 📌 Union is permanent. ❌ States have no right to secede."
  },
  61: {
    questext: "Which authority is common for Central and state elections in India?",
    options: ["State Election Commission", "Finance Commission", "Election Commission of India", "NITI Aayog"],
    correct: "3",
    exptext: "✅ Election Commission of India. 📌 Integrated machinery. ❌ Others do not conduct elections."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Fundamental_Duties_and_Doctrine_of_Basic_Structure/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a softly blurred brass scale of justice, an open plain-cover book and a pair of reading glasses" }
});

/* CHANGE LOG
   - Table of simple-majority provisions: corrected the typo to 'number of judges in the Supreme Court'.
   - Laws indirectly enforcing duties: 'IPC provisions' are now in the Bharatiya Nyaya Sanhita (effective 1 July 2024).
*/
