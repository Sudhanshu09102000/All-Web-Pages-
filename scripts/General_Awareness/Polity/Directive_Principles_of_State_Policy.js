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

/* Subject: General_Awareness/Polity · Chapter: Directive_Principles_of_State_Policy · 13 concept pages (+ overview) · 42 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🧭", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Directive Principles of State Policy",
    thumb: {
      image: "images/General_Awareness/Polity/Directive_Principles_of_State_Policy/thumbnail.png",
      banner: "SSC CGL • UPSC • ALL EXAMS",
      line1: "DIRECTIVE PRINCIPLES",
      line2: "OF STATE POLICY",
      line3: "ARTICLES 36–51",
      badge: "FULL CLASS",
      ribbon: "POLITY • ARTICLES • CASES",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Directive Principles of State Policy (DPSP) | Polity Full Class | SSC CGL UPSC",
      altTitles: ["DPSP Articles 36-51 in One Class", "FR vs DPSP Conflict and Article 31C Explained"],
      description: "DPSP is a scoring polity chapter. In this full class we cover Part IV (Articles 36-51): sources, Articles 38 to 51, amendments, classification into Socialist, Gandhian and Liberal principles, the FR vs DPSP conflict (Champakam to Minerva Mills), Article 31C and the comparison table.\n\n📌 IN THIS CLASS\n✅ Articles 36-51\n✅ 42nd, 86th, 97th Amendments\n✅ FR vs DPSP cases\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #DPSP #SSCCGL",
      tags: ["DPSP", "directive principles", "Part IV Articles 36 to 51", "polity for SSC CGL", "polity for all exams", "Indian polity", "Article 39A", "Article 44 UCC", "Article 45", "Article 31C", "Minerva Mills case", "FR vs DPSP", "42nd Amendment", "Gandhian principles", "socialist principles", "liberal principles", "Irish constitution", "welfare state", "polity MCQ", "polity tricks", "General Awareness", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "important questions"],
      hashtags: ["Polity", "DPSP", "SSCCGL", "IndianPolity"],
      thumbText: "DPSP ARTICLES 36–51",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🧭 New polity class is live: Directive Principles of State Policy. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Polity — Full Classes for All Exams"
    },
    html: `
      <p class="cp-lead">A <u>complete fast-track on Part IV (Articles 36–51)</u> — the goals of a welfare state and their clash with Fundamental Rights.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>42</b><span>Questions</span></div>
        <div class="cp-stat"><b>~68 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Introduction &amp; Nature</b><br>Sources, key quotes and why DPSP are non-justiciable.</li>
        <li><b>Articles 36–51</b><br>Every directive, with the amendments that added them.</li>
        <li><b>Classification</b><br>Socialist, Gandhian and Liberal–Intellectual principles.</li>
        <li><b>FR vs DPSP Conflict</b><br>Champakam to Minerva Mills and Article 31C.</li>
        <li><b>Comparison Table</b><br>Fundamental Rights vs Directive Principles side by side.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Article numbers, amendment numbers and the FR–DPSP case line are asked directly in SSC, UPSC, Railways and State exams.</div>
    `
  },
  2: {
    type: "concept", icon: "📜", accent: "#22c55e", pauseTimer: true,
    title: "Introduction to Directive Principles of State Policy",
    html: `
      <p class="cp-lead">The DPSP in <b>Part IV (Articles 36–51)</b> are <u>guidelines for the State</u> to achieve social and economic justice, aiming at a <b>welfare state</b>.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Borrowed from</td><td><b>Irish Constitution of 1937</b> (which copied it from the Spanish Constitution)</td></tr><tr><td>Dr. B. R. Ambedkar</td><td>Called them <b>‘novel features’</b></td></tr><tr><td>Granville Austin</td><td>DPSP + Fundamental Rights = <b>‘Conscience of the Constitution’</b></td></tr><tr><td>Resemble</td><td>The <b>‘Instrument of Instructions’</b> in the Government of India Act, 1935</td></tr></tbody></table>
      <div class="cp-note trap">Ireland is the <u>direct</u> source; Spain is the source of the Irish idea.</div>
    `
  },
  3: {
    questext: "The DPSP in India have been borrowed from the Constitution of:",
    options: ["Ireland", "USA", "Canada", "Australia"],
    correct: "1",
    exptext: "✅ Ireland (1937). 📌 Irish copied from Spain. ❌ USA gave Fundamental Rights."
  },
  4: {
    questext: "Who called the DPSP and Fundamental Rights together the ‘Conscience of the Constitution’?",
    options: ["B. R. Ambedkar", "Granville Austin", "K. M. Munshi", "Jawaharlal Nehru"],
    correct: "2",
    exptext: "✅ Granville Austin. 📌 Austin = Conscience. ❌ Ambedkar called DPSP 'novel features'."
  },
  5: {
    questext: "The DPSP resemble which document of the Government of India Act, 1935?",
    options: ["Preamble", "Federal list", "Instrument of Instructions", "Schedule of Rights"],
    correct: "3",
    exptext: "✅ Instrument of Instructions. 📌 Instructions to Governors. ❌ Others are not in the 1935 Act."
  },
  6: {
    questext: "The DPSP are contained in which Part of the Constitution?",
    options: ["Part III", "Part V", "Part IV-A", "Part IV"],
    correct: "4",
    exptext: "✅ Part IV, Articles 36–51. 📌 IV = directives. ❌ Part III is Fundamental Rights."
  },
  7: {
    type: "concept", icon: "🔑", accent: "#f59e0b", pauseTimer: true,
    title: "Key Nature of the DPSP",
    html: `
      <p class="cp-lead">DPSP are <b>non-justiciable</b> — <u>not legally enforceable</u> by courts.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Enforceability</td><td>Non-justiciable</td></tr><tr><td>Basis</td><td>Ideals of <b>justice, liberty, equality and fraternity</b> in the Preamble</td></tr><tr><td>Ambedkar’s view</td><td>They set the goals of <b>economic democracy</b></td></tr></tbody></table>
    `
  },
  8: {
    questext: "Directive Principles of State Policy are:",
    options: ["Non-justiciable", "Justiciable", "Enforceable by High Courts", "Enforceable by President"],
    correct: "1",
    exptext: "✅ Non-justiciable. 📌 Not enforceable in courts. ❌ Fundamental Rights are justiciable."
  },
  9: {
    questext: "According to Dr. Ambedkar, the DPSP aim at establishing:",
    options: ["Political democracy", "Economic democracy", "Religious freedom", "Federal balance"],
    correct: "2",
    exptext: "✅ Economic democracy. 📌 FR = political, DPSP = economic. ❌ Political democracy is the FR aim."
  },
  10: {
    type: "concept", icon: "🏷️", accent: "#ef4444", pauseTimer: true,
    title: "Articles 36 – 37",
    html: `
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>Art. 36</td><td>Defines ‘State’ — same meaning as in Part III (Fundamental Rights)</td></tr><tr><td>Art. 37</td><td>DPSP are <b>not enforceable</b> by courts, but are <b>‘fundamental in the governance of the country’</b>; the State has a duty to apply them in law-making</td></tr></tbody></table>
    `
  },
  11: {
    questext: "Article 36 defines:",
    options: ["Directive Principles", "Fundamental Duties", "The term ‘State’ for Part IV", "Panchayats"],
    correct: "3",
    exptext: "✅ 'State', same as Part III. 📌 Art. 12 meaning. ❌ Others are elsewhere."
  },
  12: {
    questext: "Article 37 states that the Directive Principles are:",
    options: ["Enforceable by courts", "Subordinate to Parliament", "Optional for the State", "Not enforceable but fundamental in the governance of the country"],
    correct: "4",
    exptext: "✅ Not enforceable, yet fundamental in governance. 📌 Duty to apply in law-making. ❌ They are not optional."
  },
  13: {
    questext: "Under Article 37, the State has a duty to apply the DPSP in:",
    options: ["Making laws", "Judicial decisions only", "Election campaigns", "Army orders"],
    correct: "1",
    exptext: "✅ Law-making. 📌 Moral duty. ❌ Courts cannot enforce them."
  },
  14: {
    type: "concept", icon: "🌐", accent: "#8b5cf6", pauseTimer: true,
    title: "The Directives — Articles 38 to 40",
    html: `
      <table><thead><tr><th>Article</th><th>Directive</th></tr></thead><tbody><tr><td>Art. 38</td><td>Promote welfare by a social order of justice; minimise inequalities in income, status, facilities and opportunities</td></tr><tr><td>Art. 39</td><td>Adequate livelihood; equitable distribution of resources; prevent concentration of wealth; <b>equal pay for equal work</b>; protect health of workers and children; healthy development of children <b>(39(f) — 42nd Amend.)</b></td></tr><tr><td>Art. 39A</td><td>Equal justice and <b>free legal aid</b> to the poor <b>(42nd Amend., 1976)</b></td></tr><tr><td>Art. 40</td><td>Organise <b>village panchayats</b> as units of self-government</td></tr></tbody></table>
    `
  },
  15: {
    questext: "Free legal aid to the poor is directed by:",
    options: ["Article 39", "Article 39A", "Article 40", "Article 41"],
    correct: "2",
    exptext: "✅ Article 39A, 42nd Amendment, 1976. 📌 39A = Aid. ❌ Article 39 is livelihood and wealth."
  },
  16: {
    questext: "Which Article directs the State to organise village panchayats?",
    options: ["Article 38", "Article 39", "Article 40", "Article 43"],
    correct: "3",
    exptext: "✅ Article 40. 📌 40 = Panchayats. ❌ Others are economic directives."
  },
  17: {
    questext: "‘Equal pay for equal work’ is found in:",
    options: ["Article 43", "Article 41", "Article 42", "Article 39(d)"],
    correct: "4",
    exptext: "✅ Article 39(d). 📌 39 = livelihood and pay. ❌ Article 42 is maternity relief."
  },
  18: {
    questext: "The directive to minimise inequalities in income, status and opportunities is in:",
    options: ["Article 38", "Article 40", "Article 44", "Article 46"],
    correct: "1",
    exptext: "✅ Article 38. 📌 Social order of justice. ❌ Others relate to panchayats, UCC and weaker sections."
  },
  19: {
    type: "concept", icon: "🛠️", accent: "#14b8a6", pauseTimer: true,
    title: "The Directives — Articles 41 to 44",
    html: `
      <table><thead><tr><th>Article</th><th>Directive</th></tr></thead><tbody><tr><td>Art. 41</td><td>Right to work, education and public assistance (unemployment, old age, sickness, disablement)</td></tr><tr><td>Art. 42</td><td>Just and humane conditions of work; <b>maternity relief</b></td></tr><tr><td>Art. 43</td><td>Living wage, decent life and cultural opportunities; promote <b>cottage industries</b></td></tr><tr><td>Art. 43A</td><td>Participation of <b>workers in management</b> (<b>42nd Amend., 1976</b>)</td></tr><tr><td>Art. 43B</td><td>Promote <b>co-operative societies</b> (<b>97th Amend., 2011</b>)</td></tr><tr><td>Art. 44</td><td>Secure a <b>Uniform Civil Code</b> throughout India</td></tr></tbody></table>
    `
  },
  20: {
    questext: "The Uniform Civil Code is directed by:",
    options: ["Article 43", "Article 44", "Article 45", "Article 47"],
    correct: "2",
    exptext: "✅ Article 44. 📌 44 = UCC. ❌ Article 45 is early childhood care."
  },
  21: {
    questext: "Participation of workers in the management of industries (Article 43A) was added by the:",
    options: ["86th Amendment", "44th Amendment", "42nd Amendment, 1976", "97th Amendment"],
    correct: "3",
    exptext: "✅ 42nd Amendment, 1976. 📌 Workers = 42. ❌ 97th added 43B."
  },
  22: {
    questext: "Promotion of co-operative societies (Article 43B) was added by the:",
    options: ["42nd Amendment", "73rd Amendment", "86th Amendment", "97th Amendment"],
    correct: "4",
    exptext: "✅ 97th Amendment, 2011. 📌 B for co-operative bank era. ❌ 73rd is Panchayati Raj."
  },
  23: {
    questext: "Maternity relief is directed by which Article?",
    options: ["Article 42", "Article 41", "Article 43", "Article 47"],
    correct: "1",
    exptext: "✅ Article 42. 📌 Just and humane work. ❌ Article 41 is right to work."
  },
  24: {
    type: "concept", icon: "🍎", accent: "#ec4899", pauseTimer: true,
    title: "The Directives — Articles 45 to 47",
    html: `
      <table><thead><tr><th>Article</th><th>Directive</th></tr></thead><tbody><tr><td>Art. 45</td><td>Early childhood care and education for children <b>below 6 years</b> (<b>86th Amend., 2002</b>)</td></tr><tr><td>Art. 46</td><td>Promote educational and economic interests of <b>SCs, STs and weaker sections</b></td></tr><tr><td>Art. 47</td><td>Raise nutrition and standard of living; improve public health; <b>prohibit intoxicating drinks and drugs</b></td></tr></tbody></table>
      <div class="cp-note trap">The 86th Amendment <b>changed</b> Art. 45 and added Art. 21A.</div>
    `
  },
  25: {
    questext: "Article 45, as changed by the 86th Amendment, deals with:",
    options: ["Free education for 6–14 years", "Early childhood care for children below 6 years", "Adult literacy", "Technical education"],
    correct: "2",
    exptext: "✅ Early childhood care, below 6 years. 📌 6–14 moved to Article 21A. ❌ Others are not Article 45."
  },
  26: {
    questext: "The directive to prohibit intoxicating drinks and drugs is in:",
    options: ["Article 46", "Article 48", "Article 47", "Article 49"],
    correct: "3",
    exptext: "✅ Article 47. 📌 Nutrition and health. ❌ Article 48 relates to cattle."
  },
  27: {
    questext: "Educational and economic interests of SCs and STs are promoted under:",
    options: ["Article 44", "Article 45", "Article 47", "Article 46"],
    correct: "4",
    exptext: "✅ Article 46. 📌 Weaker sections. ❌ Article 44 is UCC."
  },
  28: {
    type: "concept", icon: "🌳", accent: "#3b82f6", pauseTimer: true,
    title: "The Directives — Articles 48 to 51",
    html: `
      <table><thead><tr><th>Article</th><th>Directive</th></tr></thead><tbody><tr><td>Art. 48</td><td>Organise agriculture and animal husbandry on modern lines; <b>prohibit slaughter of cows</b> and draught cattle</td></tr><tr><td>Art. 48A</td><td>Protect and improve the <b>environment, forests and wildlife</b> (<b>42nd Amend., 1976</b>)</td></tr><tr><td>Art. 49</td><td>Protect <b>monuments and places</b> of national importance</td></tr><tr><td>Art. 50</td><td><b>Separate the judiciary from the executive</b></td></tr><tr><td>Art. 51</td><td>Promote <b>international peace and security</b>; respect international law and treaties; settle disputes by <b>arbitration</b></td></tr></tbody></table>
    `
  },
  29: {
    questext: "Protection of the environment, forests and wildlife is directed by:",
    options: ["Article 48A", "Article 48", "Article 47", "Article 49"],
    correct: "1",
    exptext: "✅ Article 48A, 42nd Amendment. 📌 A for added. ❌ Article 48 is agriculture and cattle."
  },
  30: {
    questext: "Separation of the judiciary from the executive is directed by:",
    options: ["Article 48", "Article 50", "Article 49", "Article 51"],
    correct: "2",
    exptext: "✅ Article 50. 📌 50 = separate. ❌ Article 49 protects monuments."
  },
  31: {
    questext: "Promotion of international peace and security is in:",
    options: ["Article 49", "Article 50", "Article 51", "Article 48A"],
    correct: "3",
    exptext: "✅ Article 51. 📌 Last directive. ❌ Others are domestic."
  },
  32: {
    questext: "The directive to prohibit slaughter of cows and draught cattle is in:",
    options: ["Article 46", "Article 47", "Article 49", "Article 48"],
    correct: "4",
    exptext: "✅ Article 48. 📌 Agriculture and animal husbandry. ❌ Article 47 is intoxicants."
  },
  33: {
    type: "concept", icon: "🔖", accent: "#f97316", pauseTimer: true,
    title: "Amendments to Remember",
    html: `
      <table><thead><tr><th>Amendment</th><th>Change</th></tr></thead><tbody><tr><td><b>42nd (1976)</b></td><td>Added Art. 39A, 43A, 48A (and Art. 39(f))</td></tr><tr><td><b>86th (2002)</b></td><td>Changed Art. 45 (early childhood care)</td></tr><tr><td><b>97th (2011)</b></td><td>Added Art. 43B (co-operatives)</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>42</b> = Legal aid, Workers, Environment (39A, 43A, 48A)</div>
    `
  },
  34: {
    questext: "Which Amendment added Articles 39A, 43A and 48A?",
    options: ["42nd", "24th", "86th", "97th"],
    correct: "1",
    exptext: "✅ 42nd Amendment, 1976. 📌 Three added. ❌ 97th added only 43B."
  },
  35: {
    questext: "Which Amendment changed Article 45 to early childhood care?",
    options: ["42nd", "86th", "44th", "97th"],
    correct: "2",
    exptext: "✅ 86th Amendment, 2002. 📌 86 = Article 21A also. ❌ 42nd added other Articles."
  },
  36: {
    questext: "Article 43B on co-operative societies was added by the:",
    options: ["86th Amendment, 2002", "42nd Amendment, 1976", "97th Amendment, 2011", "101st Amendment"],
    correct: "3",
    exptext: "✅ 97th Amendment, 2011. 📌 B = co-operatives. ❌ 101st is GST."
  },
  37: {
    type: "concept", icon: "🗂️", accent: "#84cc16", pauseTimer: true,
    title: "Classification of the DPSP",
    html: `
      <p class="cp-lead">Not classified in the Constitution, the DPSP are grouped by <u>ideology</u> into three categories.</p>
      <table><thead><tr><th>Category</th><th>Aim</th><th>Examples</th></tr></thead><tbody><tr><td><b>Socialist</b></td><td>Social and economic justice</td><td>Art. 38, 39, 39A, 47</td></tr><tr><td><b>Gandhian</b></td><td>Based on Gandhian ideology</td><td>Art. 40, 43, 43B, 46, 47</td></tr><tr><td><b>Liberal–Intellectual</b></td><td>Liberal ideology</td><td>Art. 44, 45, 48, 48A, 49, 50, 51</td></tr></tbody></table>
    `
  },
  38: {
    questext: "Article 40 (village panchayats) is a:",
    options: ["Socialist principle", "Constitutional duty", "Liberal principle", "Gandhian principle"],
    correct: "4",
    exptext: "✅ Gandhian. 📌 Panchayat = Gandhi. ❌ Socialist ones deal with justice and welfare."
  },
  39: {
    questext: "Article 44 (Uniform Civil Code) is classified as:",
    options: ["Liberal–Intellectual", "Gandhian", "Socialist", "Fundamental duty"],
    correct: "1",
    exptext: "✅ Liberal–Intellectual. 📌 44, 45, 48–51. ❌ Gandhian principles are 40, 43, 43B, 46."
  },
  40: {
    questext: "Article 39A (free legal aid) is a:",
    options: ["Gandhian principle", "Socialist principle", "Liberal principle", "Judicial directive"],
    correct: "2",
    exptext: "✅ Socialist. 📌 Justice for the poor. ❌ Gandhian focuses on villages and cottage industries."
  },
  41: {
    type: "concept", icon: "⚔️", accent: "#06b6d4", pauseTimer: true,
    title: "Conflict: FR vs DPSP — Early Milestones",
    html: `
      <p class="cp-lead">Because FR are <b>justiciable</b> and DPSP <b>non-justiciable</b>, a conflict arose.</p>
      <table><thead><tr><th>Case</th><th>Held</th></tr></thead><tbody><tr><td><b>Champakam Dorairajan (1951)</b></td><td>In conflict, <b>Fundamental Rights prevail</b>; DPSP are subsidiary; but FR can be amended by Parliament</td></tr><tr><td><b>Golaknath (1967)</b></td><td>Parliament <b>cannot abridge FR</b> (FR are ‘sacrosanct’)</td></tr></tbody></table>
    `
  },
  42: {
    questext: "In which case did the Supreme Court hold that Fundamental Rights prevail over DPSP in case of conflict?",
    options: ["Minerva Mills, 1980", "Kesavananda, 1973", "Champakam Dorairajan, 1951", "Maneka Gandhi, 1978"],
    correct: "3",
    exptext: "✅ Champakam Dorairajan, 1951. 📌 First conflict case. ❌ Others came later."
  },
  43: {
    questext: "The Supreme Court held that Parliament cannot abridge Fundamental Rights in:",
    options: ["Shankari Prasad", "Champakam Dorairajan", "Minerva Mills", "Golaknath"],
    correct: "4",
    exptext: "✅ Golaknath, 1967. 📌 FR 'sacrosanct'. ❌ Shankari Prasad allowed amendments."
  },
  44: {
    type: "concept", icon: "🔐", accent: "#a855f7", pauseTimer: true,
    title: "Article 31C and the 24th & 25th Amendments",
    html: `
      <p class="cp-lead">The <b>24th and 25th Amendments (1971)</b> restored Parliament’s power to amend FR and inserted <b>Article 31C</b>.</p>
      <table><thead><tr><th>Event</th><th>Detail</th></tr></thead><tbody><tr><td><b>Article 31C (25th Amend.)</b></td><td>Laws implementing Art. 39(b) and (c) cannot be void for violating Art. 14, 19 or 31; such a law cannot be questioned in court for not giving effect to the policy</td></tr><tr><td><b>Kesavananda Bharati (1973)</b></td><td>Struck down the <b>second</b> provision of 31C (judicial review is basic feature); first provision upheld</td></tr><tr><td><b>42nd Amend. (1976)</b></td><td>Gave <b>all DPSP primacy</b> over Art. 14, 19 and 31</td></tr><tr><td><b>Minerva Mills (1980)</b></td><td>Struck that down — DPSP again subordinate to FR; but FR under <b>Art. 14 and 19 remain subordinate</b> to Art. 39(b) and (c)</td></tr></tbody></table>
    `
  },
  45: {
    questext: "Article 31C was inserted by the:",
    options: ["25th Amendment", "24th Amendment", "42nd Amendment", "44th Amendment"],
    correct: "1",
    exptext: "✅ 25th Amendment, 1971. 📌 25 = 31C. ❌ 24th restored amendment power."
  },
  46: {
    questext: "Which Amendment gave primacy to all DPSP over Articles 14, 19 and 31?",
    options: ["25th", "42nd", "44th", "86th"],
    correct: "2",
    exptext: "✅ 42nd Amendment, 1976. 📌 Extended 31C to all DPSP. ❌ 25th covered only 39(b) and (c)."
  },
  47: {
    questext: "The 42nd Amendment's primacy for all DPSP was struck down in:",
    options: ["Kesavananda Bharati", "Golaknath", "Minerva Mills", "Champakam Dorairajan"],
    correct: "3",
    exptext: "✅ Minerva Mills, 1980. 📌 Balance restored. ❌ Kesavananda struck only the second part of 31C."
  },
  48: {
    questext: "In Kesavananda Bharati (1973), the Supreme Court struck down:",
    options: ["The first provision of Article 31C", "Article 39(b)", "The entire 24th Amendment", "The second provision of Article 31C"],
    correct: "4",
    exptext: "✅ Second provision (no judicial review). 📌 Judicial review is basic feature. ❌ First provision was upheld."
  },
  49: {
    type: "concept", icon: "🏁", accent: "#e11d48", pauseTimer: true,
    title: "Present Position of FR and DPSP",
    html: `
      <p class="cp-lead">The Constitution rests on a <u>balance</u> between FR and DPSP (Minerva Mills).</p>
      <table><thead><tr><th>Point</th><th>Position</th></tr></thead><tbody><tr><td>Supremacy</td><td><b>FR enjoy supremacy</b> over DPSP</td></tr><tr><td>Parliament’s power</td><td>May amend FR to implement DPSP <b>if it does not damage the ‘basic structure’</b></td></tr></tbody></table>
    `
  },
  50: {
    questext: "As per the present position, which enjoys supremacy?",
    options: ["DPSP over FR", "FR over DPSP", "Both are equal", "Neither"],
    correct: "2",
    exptext: "✅ FR. 📌 Balanced, with FR ahead. ❌ DPSP primacy was struck down."
  },
  51: {
    questext: "Parliament may amend FR to implement DPSP provided it:",
    options: ["Takes President's assent only", "Does not damage the basic structure", "Holds a referendum", "Gets 100% state consent"],
    correct: "2",
    exptext: "✅ Basic structure intact. 📌 Kesavananda limit. ❌ Others are not required."
  },
  52: {
    type: "concept", icon: "📊", accent: "#10b981", pauseTimer: true,
    title: "Fundamental Rights vs Directive Principles",
    html: `
      <table><thead><tr><th>Fundamental Rights</th><th>Directive Principles</th></tr></thead><tbody><tr><td><b>Negative</b> — prohibit the State from certain acts</td><td><b>Positive</b> — require the State to do certain things</td></tr><tr><td>Justiciable (legally enforceable)</td><td>Non-justiciable</td></tr><tr><td>Aim at <b>political democracy</b></td><td>Aim at <b>social and economic democracy</b></td></tr><tr><td>Legal sanctions</td><td>Moral and political sanctions</td></tr><tr><td>Personal and individualistic</td><td>Societarian and socialistic</td></tr><tr><td>Automatically enforced</td><td>Require legislation to be implemented</td></tr><tr><td>A law violating FR is unconstitutional and void</td><td>A law violating DPSP cannot be struck down</td></tr></tbody></table>
    `
  },
  53: {
    questext: "Which of the following is a feature of Fundamental Rights, not DPSP?",
    options: ["Have legal sanctions", "Aim at social and economic democracy", "Non-justiciable", "Require legislation to implement"],
    correct: "1",
    exptext: "✅ Legal sanctions. 📌 FR = legal, DPSP = moral. ❌ Others describe DPSP."
  },
  54: {
    questext: "Directive Principles are described as ‘positive’ because they:",
    options: ["Prohibit the State from acts", "Require the State to do certain things", "Are enforceable in courts", "Apply only to citizens"],
    correct: "2",
    exptext: "✅ Require the State to act. 📌 FR are negative. ❌ DPSP are non-justiciable."
  },
  55: {
    questext: "A law violating a Directive Principle:",
    options: ["Is unconstitutional and void", "Is automatically suspended", "Cannot be struck down by courts", "Requires presidential assent"],
    correct: "3",
    exptext: "✅ Cannot be struck down. 📌 Non-justiciable. ❌ Voidness applies to laws violating FR."
  },
  56: {
    questext: "Fundamental Rights aim at establishing:",
    options: ["Social democracy", "Economic democracy", "Religious democracy", "Political democracy"],
    correct: "4",
    exptext: "✅ Political democracy. 📌 DPSP aim at economic democracy. ❌ Other options are not the aim."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Directive_Principles_of_State_Policy/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a softly blurred brass compass, a feather quill and a plain-cover bound book" }
});

/* CHANGE LOG
   - No corrections to the book's content.
*/
