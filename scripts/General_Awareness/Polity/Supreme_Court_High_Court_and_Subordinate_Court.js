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

/* Subject: Polity · Chapter: Supreme_Court_High_Court_and_Subordinate_Court · 24 concept pages (+ overview) · 53 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "⚖️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Supreme Court, High Court and Subordinate Court",
    thumb: {
      image: "images/Polity/Supreme_Court_High_Court_and_Subordinate_Court/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "SC + HC + LOWER COURTS",
      line2: "INDIAN JUDICIARY",
      line3: "COLLEGIUM • WRITS",
      badge: "FULL CLASS",
      ribbon: "POLITY • NOTES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Supreme Court, High Court and Subordinate Courts | Complete Polity",
      altTitles: ["Collegium and Four Judges Cases Made Easy", "Article 32 vs Article 226 in One Class"],
      description: "Judiciary is a must-do Polity chapter. In this class we cover the Supreme Court, the Collegium and the Four Judges Cases, removal of judges, High Courts, subordinate courts, NALSA, Lok Adalats and Tribunals.\n\n📌 IN THIS CLASS\n✅ Supreme Court: appointment, removal, jurisdiction\n✅ High Courts and Art. 226\n✅ Lok Adalats, NALSA and Tribunals\n✅ Article tables and practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #SupremeCourt #SSCCGL",
      tags: ["supreme court of india", "high court", "subordinate courts", "indian judiciary", "collegium system", "four judges cases", "njac", "article 32", "article 226", "writ jurisdiction", "lok adalat", "nalsa", "tribunals article 323a", "removal of judges", "indian polity", "polity for ssc", "polity for upsc", "polity for railways", "polity for banking", "judiciary mcq", "polity one shot", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "Supreme Court H"],
      hashtags: ["Polity", "SupremeCourt", "Judiciary", "SSCCGL", "UPSC"],
      thumbText: "SUPREME COURT + HIGH COURT",
      pinnedComment: "📌 Solve all the questions and write your score below 👇",
      communityPost: "⚖️ New Polity class is live: Supreme Court, High Court and Subordinate Courts. Attempt the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Integrated judiciary\n00:00 Supreme Court and Collegium\n00:00 Removal of judges\n00:00 SC jurisdiction\n00:00 High Courts\n00:00 Subordinate courts and NALSA\n00:00 Lok Adalats and Tribunals\n00:00 Article tables",
      playlist: "Polity — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on India's judiciary</u> — from the Supreme Court and Collegium to High Courts, Lok Adalats and Tribunals.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>24</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>53</b><span>Questions</span></div>
        <div class="cp-stat"><b>~101 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Integrated Judicial System</b><br>One hierarchy, from the SC down to district courts.</li>
        <li><b>Supreme Court — Establishment and Strength</b><br>Art. 124: 28 Jan 1950, now 38 judges.</li>
        <li><b>Appointment and the Collegium</b><br>CJI + 4 senior judges; NJAC struck down.</li>
        <li><b>CJI Appointment and Four Judges Cases</b><br>1982, 1993, 1998, 2015.</li>
        <li><b>Qualifications, Oath and Salary</b><br>5 years, 10 years or jurist; no minimum age.</li>
        <li><b>Tenure and Removal</b><br>Age 65; 100 LS or 50 RS members.</li>
        <li><b>Acting, Ad hoc and Retired Judges; Seat</b><br>Arts. 126, 127, 128 and 130.</li>
        <li><b>Original and Writ Jurisdiction</b><br>Art. 131 and Art. 32.</li>
        <li><b>Appellate and Advisory Jurisdiction</b><br>Arts. 132–136 and 143.</li>
        <li><b>Court of Record and Other Powers</b><br>Contempt, judicial review, Art. 142.</li>
        <li><b>Supreme Court Advocates</b><br>Senior, Advocates-on-Record, others.</li>
        <li><b>High Courts — Basics</b><br>25 High Courts and the common ones.</li>
        <li><b>HC — Appointment and Qualifications</b><br>Arts. 216, 217, 219.</li>
        <li><b>HC — Tenure, Removal and Transfer</b><br>Age 62; Art. 222.</li>
        <li><b>HC — Jurisdiction and Powers</b><br>Art. 226 is wider than Art. 32.</li>
        <li><b>Subordinate Courts</b><br>District and Sessions Judge; Arts. 233–237.</li>
        <li><b>NALSA and Free Legal Aid</b><br>Art. 39A and the 1987 Act.</li>
        <li><b>Lok Adalats</b><br>People's Court; no appeal.</li>
        <li><b>Special Courts</b><br>Family, Gram Nyayalaya, Mobile, Court Martial.</li>
        <li><b>Tribunals</b><br>Part XIV-A; Art. 323A vs 323B; NGT.</li>
        <li><b>Growth in the Number of SC Judges</b><br>8 in 1950 to 38 now.</li>
        <li><b>Indian vs American Supreme Court</b><br>Eight key differences.</li>
        <li><b>Supreme Court — Articles 124–147</b><br>Article-to-subject match table.</li>
        <li><b>High Courts — Articles 214–231</b><br>Article-to-subject match table.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Collegium, writs, removal procedure and article numbers appear in almost every SSC, UPSC, Railway and Banking Polity paper.</div>
    `
  },
  2: {
    type: "concept", icon: "⚖️", accent: "#22c55e", pauseTimer: true,
    title: "The Integrated Judicial System",
    html: `
      <p class="cp-lead">India has a <b>single, integrated judicial system</b> — one hierarchy that enforces <u>both Central and State laws</u>.</p>
      <div class="cp-fig"><img src="images/Polity/Supreme_Court_High_Court_and_Subordinate_Court/1.png" alt="Pyramid of Indian courts" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Structure</td><td><b>Supreme Court</b> at the top → <b>High Courts</b> → subordinate (district) courts</td></tr><tr><td>Source</td><td>Adopted from the <b>Government of India Act, 1935</b></td></tr><tr><td>USA</td><td>Double system: federal laws → federal judiciary, state laws → state judiciary</td></tr><tr><td>Higher judiciary</td><td>Supreme Court + High Courts</td></tr><tr><td>Lower judiciary</td><td>All courts below the High Courts</td></tr></tbody></table>
      <div class="cp-note trap">HCs are <b>judicially subordinate</b> to the SC (it can reverse their decisions) but <b>administratively</b> the SC cannot interfere in them.</div>
    `
  },
  3: {
    questext: "India's single integrated judicial system was adopted from:",
    options: ["The US Constitution", "The Government of India Act, 1935", "The Government of India Act, 1919", "The Irish Constitution"],
    correct: "2",
    exptext: "✅ Government of India Act, 1935. 📌 One hierarchy for Central and State laws. ❌ The USA has a double system."
  },
  4: {
    questext: "Which statement about High Courts and the Supreme Court is correct?",
    options: ["HCs are administratively controlled by the SC", "HCs are judicially independent of the SC", "The SC cannot reverse HC decisions", "HCs are judicially subordinate to the SC but not administratively under it"],
    correct: "4",
    exptext: "✅ SC can reverse HC decisions but cannot interfere in HC administration. 📌 Judicial yes, administrative no. ❌ Options 1–3 misstate this."
  },
  5: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "Supreme Court — Establishment and Strength (Art. 124)",
    html: `
      <p class="cp-lead">Articles <b>124–147</b> (Part V) deal with the SC — successor of the <b>Federal Court</b> (GoI Act, 1935) and the <u>final court of appeal</u>.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Inaugurated</td><td><b>28 January 1950</b> — replaced the Federal Court and the British <b>Privy Council</b></td></tr><tr><td>Original strength</td><td>Chief Justice + <b>7</b> judges</td></tr><tr><td>Change of strength</td><td>Parliament can <b>increase</b> it but not reduce below the original</td></tr><tr><td>2019</td><td>Raised from 31 to 34 by the SC (Number of Judges) Amendment Act, 2019</td></tr><tr><td>Present strength</td><td><b>38</b> (CJI + 37 judges), raised from 34 by the 2026 Amendment Act</td></tr></tbody></table>
      <div class="cp-note exam">1950 → 8 judges; 2019 → 34; present → 38.</div>
    `
  },
  6: {
    questext: "On which date was the Supreme Court inaugurated?",
    options: ["26 January 1950", "15 August 1947", "28 January 1950", "26 November 1949"],
    correct: "3",
    exptext: "✅ 28 January 1950. 📌 Two days after the Republic Day. ❌ 26 January 1950 is when the Constitution took effect."
  },
  7: {
    questext: "What is the present sanctioned strength of the Supreme Court, including the CJI?",
    options: ["31", "34", "38", "40"],
    correct: "3",
    exptext: "✅ 38 (CJI + 37), raised from 34 in 2026. 📌 2019: 34. ❌ 34 was the earlier strength."
  },
  8: {
    type: "concept", icon: "👥", accent: "#ef4444", pauseTimer: true,
    title: "Appointment of Judges and the Collegium",
    html: `
      <p class="cp-lead">The President appoints all SC judges (<b>Art. 124(2)</b>) — but in practice the <u>Collegium</u> decides.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Appointing authority</td><td><b>President</b> (Art. 124(2))</td></tr><tr><td>CJI</td><td>Appointed after consulting such SC/HC judges as needed</td></tr><tr><td>Other judges</td><td>Consultation with the <b>CJI is obligatory</b></td></tr><tr><td>Collegium</td><td><b>CJI + 4 senior-most SC judges</b></td></tr><tr><td>Working</td><td>Needs the general consensus; if <b>2 members disagree</b>, the recommendation is not sent; the CJI's opinion is always included</td></tr><tr><td>NJAC</td><td>99th Amendment + NJAC Act, 2014: 6-member commission (CJI + 2 judges + Law Minister + 2 eminent persons)</td></tr><tr><td>Fate</td><td>Declared <b>unconstitutional</b> in the Fourth Judges Case (2015)</td></tr></tbody></table>
      <div class="cp-note trap">NJAC was struck down — the old Collegium was <b>restored</b>.</div>
    `
  },
  9: {
    questext: "The Collegium that recommends SC judges consists of:",
    options: ["CJI and 2 judges", "CJI and 4 senior-most SC judges", "CJI, Law Minister and 2 eminent persons", "President and CJI"],
    correct: "2",
    exptext: "✅ CJI + 4 senior-most SC judges. 📌 Two dissents block a name. ❌ Option 3 is the NJAC design."
  },
  10: {
    questext: "The National Judicial Appointments Commission was to have which members?",
    options: ["CJI, 2 judges, Law Minister and 2 eminent persons", "CJI and 4 senior judges", "President, PM and CJI", "CJI, Attorney General and 3 judges"],
    correct: "1",
    exptext: "✅ Six members: CJI, 2 judges, Law Minister, 2 eminent persons. 📌 99th Amendment, 2014. ❌ Option 2 is the Collegium."
  },
  11: {
    questext: "The NJAC (99th Amendment) was:",
    options: ["Upheld by the SC in 2015", "Struck down by the SC in 1993", "Never passed by Parliament", "Struck down in the Fourth Judges Case, 2015"],
    correct: "4",
    exptext: "✅ Declared unconstitutional in 2015; Collegium restored. 📌 Fourth Judges Case. ❌ It did pass Parliament."
  },
  12: {
    type: "concept", icon: "📅", accent: "#8b5cf6", pauseTimer: true,
    title: "CJI Appointment and the Four Judges Cases",
    html: `
      <p class="cp-lead">The CJI is the <u>senior-most SC judge</u> by convention — a rule broken twice and restored in 1993.</p>
      <table><thead><tr><th>Period</th><th>Position</th></tr></thead><tbody><tr><td>1950–1973</td><td>Senior-most SC judge made CJI (convention)</td></tr><tr><td>1973</td><td>Violated — <b>A. N. Ray</b> appointed over seniors</td></tr><tr><td>1977</td><td>Violated — <b>M. U. Beg</b> appointed</td></tr><tr><td>1993</td><td><b>Second Judges Case</b> restored the seniority rule</td></tr></tbody></table>
      <table><thead><tr><th>Case</th><th>Year</th><th>Ruling</th></tr></thead><tbody><tr><td>First Judges Case</td><td>1982</td><td>Consultation = exchange of views; <b>not binding</b> on the President</td></tr><tr><td>Second Judges Case</td><td>1993</td><td>Consultation → <b>concurrence</b>; CJI's advice binding; CJI consults 2 senior judges</td></tr><tr><td>Third Judges Case</td><td>1998</td><td>Introduced the <b>Collegium</b>: CJI + 4 senior judges</td></tr><tr><td>Fourth Judges Case</td><td>2015</td><td>NJAC Act + 99th Amendment struck down; old Collegium restored</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>82 → 93 → 98 → 15</b>: Exchange, Concurrence, Collegium, Collapse of NJAC</div>
    `
  },
  13: {
    questext: "Which Judges Case introduced the Collegium of CJI and 4 senior judges?",
    options: ["First Judges Case", "Second Judges Case", "Third Judges Case", "Fourth Judges Case"],
    correct: "3",
    exptext: "✅ Third Judges Case, 1998. 📌 Second (1993) had CJI + 2 seniors. ❌ Fourth (2015) struck down the NJAC."
  },
  14: {
    questext: "Which pair is correctly matched?",
    options: ["First Judges Case — NJAC struck down", "Second Judges Case — seniority rule for CJI restored", "Third Judges Case — consultation means exchange of views", "Fourth Judges Case — Collegium of CJI and 2 judges"],
    correct: "2",
    exptext: "✅ 1993 restored seniority for the CJI. 📌 1982 = exchange of views. ❌ NJAC fell in 2015."
  },
  15: {
    questext: "The seniority convention for appointing the CJI was first violated in 1973 by appointing:",
    options: ["A. N. Ray", "M. U. Beg", "H. R. Khanna", "M. Hidayatullah"],
    correct: "1",
    exptext: "✅ A. N. Ray in 1973. 📌 Second violation: M. U. Beg, 1977. ❌ Beg came four years later."
  },
  16: {
    type: "concept", icon: "📜", accent: "#14b8a6", pauseTimer: true,
    title: "Qualifications, Oath and Salary of SC Judges",
    html: `
      <p class="cp-lead"><u>No minimum age</u> is prescribed — the qualifications are about experience.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Citizenship</td><td>Must be a citizen of India (Art. 124(3))</td></tr><tr><td>Experience (any one)</td><td>HC judge for <b>5 years</b>; <b>or</b> HC advocate for <b>10 years</b>; <b>or</b> a <b>distinguished jurist</b> (in the President's opinion)</td></tr><tr><td>Oath (Art. 124(6))</td><td>Before the <b>President</b></td></tr><tr><td>Salary (Art. 125)</td><td>Fixed by <b>Parliament</b>; reducible only during a <b>Financial Emergency</b></td></tr><tr><td>Tax</td><td>Judges are not exempt from income tax</td></tr></tbody></table>
      <div class="cp-note trap">The distinguished-jurist route exists for the <b>SC</b> but not for the High Court.</div>
    `
  },
  17: {
    questext: "Which of the following is NOT a qualification for appointment as an SC judge?",
    options: ["HC judge for 5 years", "HC advocate for 10 years", "Distinguished jurist in the President's opinion", "A minimum age of 45 years"],
    correct: "4",
    exptext: "✅ No minimum age is prescribed. 📌 5 years, 10 years or jurist. ❌ The other three are valid routes."
  },
  18: {
    questext: "The salary of an SC judge can be reduced only during:",
    options: ["A National Emergency", "A Financial Emergency", "President's Rule", "A war"],
    correct: "2",
    exptext: "✅ Only during a Financial Emergency (Art. 125). 📌 Fixed by Parliament. ❌ National Emergency does not allow it."
  },
  19: {
    type: "concept", icon: "🚪", accent: "#ec4899", pauseTimer: true,
    title: "Tenure and Removal of SC Judges (Art. 124(4))",
    html: `
      <p class="cp-lead">A judge holds office until <b>65</b> — and the word <u>'impeachment' is not used</u> in the Constitution.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Tenure</td><td>Until <b>65 years</b>; may resign to the President</td></tr><tr><td>Removal</td><td>By the President on Parliament's recommendation</td></tr><tr><td>Grounds</td><td>Only <b>proved misbehaviour</b> or <b>incapacity</b></td></tr><tr><td>Law</td><td>Judges Enquiry Act, <b>1968</b></td></tr><tr><td>Motion</td><td>Signed by <b>100 LS</b> or <b>50 RS</b> members; Speaker/Chairman may admit or refuse</td></tr><tr><td>Committee</td><td><b>3 members</b>: an SC judge (CJI or other), an HC Chief Justice, a distinguished jurist</td></tr><tr><td>If guilty</td><td>Both Houses pass it by <b>special majority</b> (majority of total membership + 2/3 present and voting); President passes the order</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/Polity/Supreme_Court_High_Court_and_Subordinate_Court/2.png" alt="Flow of the removal procedure of a judge" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note info"><b>No SC judge has ever been removed.</b> First case: Justice <b>V. Ramaswami</b> (1991–93) — the committee found him guilty, but the motion failed in the Lok Sabha (Congress abstained).</div>
    `
  },
  20: {
    questext: "A motion to remove an SC judge must be signed by at least:",
    options: ["100 Lok Sabha or 50 Rajya Sabha members", "50 Lok Sabha or 100 Rajya Sabha members", "100 members in either House only", "25 Lok Sabha or 50 Rajya Sabha members"],
    correct: "1",
    exptext: "✅ 100 LS or 50 RS members. 📌 Judges Enquiry Act, 1968. ❌ Option 2 reverses the numbers."
  },
  21: {
    questext: "Which statement on removal of an SC judge is correct?",
    options: ["The Constitution uses the word impeachment", "Grounds are proved misbehaviour or incapacity", "The CJI removes the judge", "A simple majority in both Houses is enough"],
    correct: "2",
    exptext: "✅ Only proved misbehaviour or incapacity. 📌 Special majority in both Houses. ❌ \"Impeachment\" is not used for judges."
  },
  22: {
    questext: "The removal motion against Justice V. Ramaswami failed because:",
    options: ["The committee found him innocent", "The Rajya Sabha rejected it", "It failed in the Lok Sabha as Congress abstained", "The President refused to act"],
    correct: "3",
    exptext: "✅ It failed in the Lok Sabha, Congress abstaining. 📌 Committee found him guilty. ❌ He was not cleared by the committee."
  },
  23: {
    type: "concept", icon: "🧑‍⚖️", accent: "#3b82f6", pauseTimer: true,
    title: "Acting, Ad hoc and Retired Judges; Seat of the SC",
    html: `
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>Acting CJI (Art. 126)</td><td>Appointed by the <b>President</b> when the CJI's office is vacant or the CJI is absent</td></tr><tr><td>Ad hoc judge (Art. 127)</td><td>On lack of quorum, the <b>CJI</b> appoints a qualified HC judge (with the President's consent) — no consent of the judge needed</td></tr><tr><td>Retired judge (Art. 128)</td><td>CJI can request a retired SC/HC judge to sit temporarily — consent of the <b>President AND the judge</b></td></tr><tr><td>Seat (Art. 130)</td><td><b>Delhi</b>; the CJI may fix other places only with the President's approval</td></tr><tr><td>Jurisdiction</td><td>Parliament can <b>extend</b> but not curtail the SC's jurisdiction</td></tr></tbody></table>
    `
  },
  24: {
    questext: "Who appoints an ad hoc judge of the Supreme Court?",
    options: ["The President", "The CJI, with the President's consent", "The Collegium", "The Law Minister"],
    correct: "2",
    exptext: "✅ The CJI, with the President's consent (Art. 127). 📌 Used when quorum is lacking. ❌ The President alone does not appoint."
  },
  25: {
    questext: "A retired judge can be asked to sit in the SC temporarily with the consent of:",
    options: ["The CJI only", "The President only", "The President and the retired judge", "The Collegium"],
    correct: "3",
    exptext: "✅ Both the President and the judge must consent (Art. 128). 📌 Ad hoc needs no judge consent. ❌ The CJI alone cannot decide."
  },
  26: {
    type: "concept", icon: "🎯", accent: "#f97316", pauseTimer: true,
    title: "Original and Writ Jurisdiction (Art. 131, 32)",
    html: `
      <p class="cp-lead">The SC has <b>seven heads</b> of jurisdiction — it is the <u>guardian of the Constitution and of Fundamental Rights</u>.</p>
      <table><thead><tr><th>Head</th><th>Key facts</th></tr></thead><tbody><tr><td>Original (Art. 131)</td><td>Federal disputes (Centre vs States, State vs State); <b>exclusive and original</b></td></tr><tr><td>Not covered</td><td>Pre-Constitution treaties, inter-State water disputes, Finance Commission matters, ordinary commercial disputes, recovery of damages by a State</td></tr><tr><td>Writ (Art. 32)</td><td>Can issue <b>5 writs</b>: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari</td></tr><tr><td>Writ nature</td><td><b>Not exclusive</b> — HCs also issue writs (Art. 226)</td></tr></tbody></table>
    `
  },
  27: {
    questext: "Which Article gives the SC original jurisdiction in federal disputes?",
    options: ["Article 32", "Article 136", "Article 143", "Article 131"],
    correct: "4",
    exptext: "✅ Article 131 — exclusive and original. 📌 Art. 32 = writs. ❌ Art. 136 is the special leave power."
  },
  28: {
    questext: "Which of the following falls outside the SC's original jurisdiction under Art. 131?",
    options: ["A dispute between the Centre and a State", "A dispute between two States", "An inter-State water dispute", "A dispute between the Centre and two or more States"],
    correct: "3",
    exptext: "✅ Inter-State water disputes are excluded. 📌 Also excluded: commercial and Finance Commission matters. ❌ The others are federal disputes."
  },
  29: {
    questext: "Which statement about writs under Article 32 is correct?",
    options: ["Only the SC can issue writs", "The SC can issue five writs and HCs can also issue writs under Art. 226", "Only Habeas Corpus can be issued", "Writs are issued only for non-fundamental rights"],
    correct: "2",
    exptext: "✅ Five writs; the power is not exclusive. 📌 HCs use Art. 226. ❌ Art. 32 is for Fundamental Rights."
  },
  30: {
    type: "concept", icon: "🔁", accent: "#84cc16", pauseTimer: true,
    title: "Appellate and Advisory Jurisdiction (Art. 132–136, 143)",
    html: `
      <table><thead><tr><th>Type</th><th>Provision</th></tr></thead><tbody><tr><td>Constitutional (Art. 132)</td><td>Appeals in constitutional matters</td></tr><tr><td>Civil (Art. 133)</td><td>Civil appeals</td></tr><tr><td>Criminal (Art. 134)</td><td>Criminal appeals</td></tr><tr><td>Special Leave Petition (Art. 136)</td><td><b>Discretionary</b> power against any court or tribunal (except military); not claimable as a right</td></tr><tr><td>Advisory (Art. 143)</td><td>President may seek the SC's opinion on a question of law or fact of public importance, or on a pre-Constitution treaty; opinion is <b>advisory, NOT binding</b></td></tr></tbody></table>
      <div class="cp-note trap">Court-martial: the SC and HCs have <b>no appellate jurisdiction</b> over military tribunals.</div>
    `
  },
  31: {
    questext: "Special Leave Petition under Art. 136 is:",
    options: ["A discretionary power against any court or tribunal except military", "A matter of right", "Available only against High Court judgments", "Available against military tribunals"],
    correct: "1",
    exptext: "✅ Discretionary; any court or tribunal except military. 📌 Not claimable as a right. ❌ It is not limited to HCs."
  },
  32: {
    questext: "An opinion given by the SC under Art. 143 is:",
    options: ["Binding on the President", "Binding on all courts", "Advisory and not binding", "A final decree"],
    correct: "3",
    exptext: "✅ Advisory, not binding. 📌 President seeks it. ❌ Binding force belongs to judgments, not opinions."
  },
  33: {
    type: "concept", icon: "📖", accent: "#06b6d4", pauseTimer: true,
    title: "Court of Record, Judicial Review and Other Powers",
    html: `
      <p class="cp-lead">The SC is a <b>court of record</b>: its records are permanent evidence and it can <u>punish for contempt</u>.</p>
      <table><thead><tr><th>Power</th><th>Detail</th></tr></thead><tbody><tr><td>Court of Record (Art. 129)</td><td>Records are permanent evidence and precedents; punishes contempt (simple imprisonment up to <b>6 months</b> / fine up to <b>₹2,000</b>)</td></tr><tr><td>Civil contempt</td><td><b>Wilful disobedience</b> of an order</td></tr><tr><td>Criminal contempt</td><td><b>Scandalising</b> or obstructing the court</td></tr><tr><td>Judicial review</td><td>Examines constitutionality of laws and orders; <b>ultra vires</b> ones are declared void</td></tr><tr><td>Art. 137</td><td>Review of its own judgements</td></tr><tr><td>Art. 139A</td><td>Transfer of similar cases from HCs</td></tr><tr><td>Art. 142</td><td>Any order for <b>complete justice</b></td></tr><tr><td>Art. 145</td><td>Makes rules of court</td></tr><tr><td>Elections</td><td>Decides disputes on the President's and VP's election</td></tr></tbody></table>
    `
  },
  34: {
    questext: "Under which Article is the Supreme Court a Court of Record?",
    options: ["Article 129", "Article 130", "Article 131", "Article 142"],
    correct: "1",
    exptext: "✅ Article 129. 📌 130 = seat, 131 = original jurisdiction. ❌ Art. 142 is complete justice."
  },
  35: {
    questext: "What does criminal contempt of court mean?",
    options: ["Wilful disobedience of a court order", "Scandalising or obstructing the court", "Disobeying a tribunal", "Delay in filing an appeal"],
    correct: "2",
    exptext: "✅ Scandalising or obstructing the court. 📌 Civil = wilful disobedience. ❌ Option 1 is civil contempt."
  },
  36: {
    type: "concept", icon: "🧑‍💼", accent: "#a855f7", pauseTimer: true,
    title: "Supreme Court Advocates",
    html: `
      <table><thead><tr><th>Type</th><th>Role</th></tr></thead><tbody><tr><td>Senior Advocates</td><td>Designated by the SC/HC; cannot appear without an <b>Advocate-on-Record</b></td></tr><tr><td>Advocates-on-Record</td><td>Only they can <b>file</b> matters before the SC</td></tr><tr><td>Other Advocates</td><td>Can appear and argue but <b>cannot file</b> documents</td></tr></tbody></table>
    `
  },
  37: {
    questext: "Who alone can file matters before the Supreme Court?",
    options: ["Senior Advocates", "Other Advocates", "Law Officers", "Advocates-on-Record"],
    correct: "4",
    exptext: "✅ Only Advocates-on-Record can file. 📌 Seniors need an AoR to appear. ❌ Other advocates can argue, not file."
  },
  38: {
    type: "concept", icon: "🏢", accent: "#e11d48", pauseTimer: true,
    title: "High Courts — Basics and Common High Courts (Art. 214–231)",
    html: `
      <p class="cp-lead">Articles <b>214–231</b> (Part VI) deal with High Courts — the <u>apex court within a State</u>.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Beginning</td><td><b>1862</b> — Calcutta, Bombay, Madras; Allahabad in 1866</td></tr><tr><td>7th Amendment (1956)</td><td>Common HC for <b>two or more</b> States/UTs</td></tr><tr><td>Number</td><td><b>25</b> High Courts (as of 2019); only <b>3</b> cover more than one State</td></tr><tr><td>UTs</td><td><b>Delhi</b> has its own HC; Jammu and Kashmir and Ladakh share one</td></tr></tbody></table>
      <table><thead><tr><th>Common High Court</th><th>Jurisdiction over</th></tr></thead><tbody><tr><td>Gauhati</td><td>Assam, Nagaland, Mizoram, Arunachal Pradesh</td></tr><tr><td>Punjab and Haryana</td><td>Punjab, Haryana, Chandigarh</td></tr><tr><td>Bombay</td><td>Maharashtra, Goa, Dadra and Nagar Haveli and Daman and Diu</td></tr><tr><td>Kerala</td><td>Kerala + Lakshadweep (UT)</td></tr><tr><td>Madras</td><td>Tamil Nadu + Puducherry (UT)</td></tr><tr><td>Calcutta</td><td>West Bengal + Andaman and Nicobar Islands (UT)</td></tr></tbody></table>
    `
  },
  39: {
    questext: "Which High Courts began in 1862?",
    options: ["Calcutta, Bombay, Madras", "Allahabad, Bombay, Madras", "Calcutta, Delhi, Madras", "Calcutta, Bombay, Allahabad"],
    correct: "1",
    exptext: "✅ Calcutta, Bombay and Madras. 📌 Allahabad followed in 1866. ❌ Delhi and Allahabad came later."
  },
  40: {
    questext: "The Madras High Court has jurisdiction over Tamil Nadu and which Union Territory?",
    options: ["Lakshadweep", "Puducherry", "Andaman and Nicobar Islands", "Chandigarh"],
    correct: "2",
    exptext: "✅ Puducherry. 📌 Kerala HC covers Lakshadweep; Calcutta covers Andaman. ❌ Chandigarh is under Punjab and Haryana HC."
  },
  41: {
    type: "concept", icon: "🧾", accent: "#10b981", pauseTimer: true,
    title: "HC — Constitution, Appointment, Qualifications, Oath (Art. 216, 217, 219)",
    html: `
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Constitution (Art. 216)</td><td>Chief Justice + such judges as the President deems necessary (<b>no fixed number</b>; based on workload)</td></tr><tr><td>Appointment (Art. 217)</td><td>By the <b>President</b>; the Chief Justice after consulting the <b>CJI and the Governor</b>; for other judges, the HC Chief Justice is also consulted</td></tr><tr><td>Qualification</td><td>Citizen of India + <b>10 years</b> in judicial office <i>or</i> <b>10 years</b> as an HC advocate; <b>no minimum age</b></td></tr><tr><td>Oath (Art. 219)</td><td>Before the <b>Governor</b></td></tr><tr><td>Salary</td><td>Fixed by Parliament</td></tr></tbody></table>
      <div class="cp-note trap">The jurist route is only for SC; HC needs <b>judicial office or advocacy</b>.</div>
    `
  },
  42: {
    questext: "Before whom does a High Court judge take the oath?",
    options: ["The President", "The Chief Justice of India", "The HC Chief Justice", "The Governor"],
    correct: "4",
    exptext: "✅ The Governor (Art. 219). 📌 SC judges swear before the President. ❌ The President only appoints."
  },
  43: {
    questext: "The Chief Justice of a High Court is appointed after consulting:",
    options: ["The CJI and the Governor", "The CJI and the Chief Minister", "The Governor only", "The Law Minister"],
    correct: "1",
    exptext: "✅ The CJI and the Governor. 📌 For other judges, HC Chief Justice too. ❌ The CM is not consulted."
  },
  44: {
    questext: "Which qualification route exists for SC judges but NOT for HC judges?",
    options: ["10 years in judicial office", "10 years as an HC advocate", "Distinguished jurist", "Citizenship of India"],
    correct: "3",
    exptext: "✅ Distinguished jurist is only for the SC. 📌 Judicial office 10 years is HC-only. ❌ Advocacy of 10 years suits both."
  },
  45: {
    type: "concept", icon: "🔄", accent: "#eab308", pauseTimer: true,
    title: "HC — Tenure, Removal and Transfer",
    html: `
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Tenure</td><td>Until <b>62 years</b> (SC judge = 65)</td></tr><tr><td>Removal</td><td>Same manner as an SC judge</td></tr><tr><td>Proceedings</td><td>Removal proceedings started against <b>Soumitra Sen</b> and <b>P. D. Dinakaran</b> — both resigned before completion</td></tr><tr><td>Transfer (Art. 222)</td><td>President transfers a judge after consulting the CJI (+ collegium of 4 + both HC Chief Justices)</td></tr><tr><td>Other judges</td><td>Acting CJ (Art. 223), Additional and Acting judges (Art. 224, max <b>2 years</b>), Retired judges (Art. 224A); none may stay beyond 62</td></tr></tbody></table>
    `
  },
  46: {
    questext: "A High Court judge retires at the age of:",
    options: ["60 years", "62 years", "65 years", "68 years"],
    correct: "2",
    exptext: "✅ 62 years. 📌 SC judges retire at 65. ❌ 65 is the SC age."
  },
  47: {
    questext: "Under Art. 224, an additional judge of a High Court can be appointed for a maximum of:",
    options: ["6 months", "1 year", "2 years", "5 years"],
    correct: "3",
    exptext: "✅ Two years. 📌 None may continue beyond age 62. ❌ Longer terms are not allowed."
  },
  48: {
    type: "concept", icon: "🔍", accent: "#0ea5e9", pauseTimer: true,
    title: "HC — Jurisdiction and Powers",
    html: `
      <p class="cp-lead">An HC has <b>seven heads</b> of jurisdiction, similar to the SC.</p>
      <table><thead><tr><th>Head</th><th>Detail</th></tr></thead><tbody><tr><td>Original</td><td>Admiralty, contempt, election disputes of MPs/MLAs, revenue, enforcement of FR; Calcutta, Bombay, Madras and Delhi have original <b>civil</b> jurisdiction in high-value cases</td></tr><tr><td>Writ (Art. 226)</td><td>Can issue all <b>5 writs</b> for FR <b>and any other purpose</b> — wider than the SC's Art. 32 (part of Basic Structure — Chandra Kumar, 1997)</td></tr><tr><td>Appellate</td><td>Civil and criminal appeals from subordinate courts</td></tr><tr><td>Supervisory (Art. 227)</td><td>Superintendence over all courts and tribunals in its territory (except military) — administrative and judicial</td></tr><tr><td>Control (Art. 235)</td><td>Over subordinate courts (posting, promotion, discipline of judicial service)</td></tr><tr><td>Court of Record (Art. 215)</td><td>And judicial review (Art. 13, 226); contempt defined by the Contempt of Courts Act, 1971</td></tr></tbody></table>
    `
  },
  49: {
    questext: "Which Article lets an HC issue writs for Fundamental Rights and for any other purpose?",
    options: ["Article 32", "Article 226", "Article 227", "Article 235"],
    correct: "2",
    exptext: "✅ Article 226 — wider than Art. 32. 📌 SC's Art. 32 is only for FR. ❌ Art. 227 is superintendence."
  },
  50: {
    questext: "Article 227 gives the High Court:",
    options: ["Writ jurisdiction", "The status of a court of record", "Superintendence over all courts and tribunals in its territory except military", "Power to transfer judges"],
    correct: "3",
    exptext: "✅ Superintendence, administrative and judicial, except military. 📌 Art. 215 = court of record. ❌ Writs come under Art. 226."
  },
  51: {
    type: "concept", icon: "🏘️", accent: "#d946ef", pauseTimer: true,
    title: "Subordinate Courts (Art. 233–237)",
    html: `
      <p class="cp-lead">Below the HC is a hierarchy of courts under its supervision; the <b>District and Sessions Judge</b> is the <u>highest judicial authority in a district</u>.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Civil cases</td><td><b>District Judge</b></td></tr><tr><td>Criminal cases</td><td><b>Sessions Judge</b></td></tr><tr><td>Appointment (Art. 233)</td><td>District Judges appointed by the <b>Governor in consultation with the HC</b></td></tr><tr><td>Qualification</td><td>Not in Central/State service; advocate or pleader for <b>7 years</b>; HC recommendation</td></tr><tr><td>Below District Judge</td><td>Governor, on the advice of the <b>State PSC</b> and the HC</td></tr></tbody></table>
      <table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td>233</td><td>Appointment of District Judges</td></tr><tr><td>233A</td><td>Validation of certain appointments and judgements</td></tr><tr><td>234</td><td>Recruitment to the judicial service (other than District Judges)</td></tr><tr><td>235</td><td>Control over subordinate courts</td></tr><tr><td>236</td><td>Interpretation</td></tr><tr><td>237</td><td>Application to certain classes of Magistrates</td></tr></tbody></table>
    `
  },
  52: {
    questext: "District Judges are appointed by:",
    options: ["The Governor, in consultation with the High Court", "The President", "The Chief Minister", "The State PSC"],
    correct: "1",
    exptext: "✅ Governor, in consultation with the HC (Art. 233). 📌 Below District Judge: Governor + State PSC + HC. ❌ The President does not appoint them."
  },
  53: {
    questext: "A person can be appointed District Judge if he:",
    options: ["Is serving in the Central Government", "Has been an advocate for 10 years", "Has been an advocate or pleader for 7 years and is recommended by the HC", "Is a member of the State PSC"],
    correct: "3",
    exptext: "✅ 7 years as advocate or pleader, plus HC recommendation. 📌 Must not be in government service. ❌ Service holders are ineligible."
  },
  54: {
    type: "concept", icon: "⚖️", accent: "#64748b", pauseTimer: true,
    title: "NALSA and Free Legal Aid",
    html: `
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Constitutional basis</td><td><b>Art. 39A</b> — free legal aid to the poor</td></tr><tr><td>Law</td><td>Legal Services Authorities Act, <b>1987</b> (in force <b>9 Nov 1995</b>) set up <b>NALSA</b></td></tr><tr><td>Structure</td><td>State Legal Services Authority → HC Legal Services Committee → District and Taluk committees</td></tr><tr><td>Patron-in-Chief</td><td>The <b>Chief Justice of India</b></td></tr><tr><td>Executive Chairman</td><td>A sitting <b>SC judge</b></td></tr><tr><td>HQ</td><td>New Delhi</td></tr><tr><td>Eligible</td><td>Women and children, SC/ST, industrial workmen, disaster victims, disabled, persons in custody, trafficking and begar victims, low-income persons</td></tr></tbody></table>
    `
  },
  55: {
    questext: "Free legal aid for the poor is provided under which Article?",
    options: ["Article 39A", "Article 21", "Article 14", "Article 51A"],
    correct: "1",
    exptext: "✅ Article 39A (Directive Principle). 📌 Enforced by the 1987 Legal Services Act. ❌ Art. 21 is the right to life."
  },
  56: {
    questext: "Which pair about NALSA is correct?",
    options: ["Patron-in-Chief — Law Minister", "Executive Chairman — CJI", "Patron-in-Chief — CJI", "Headquarters — Mumbai"],
    correct: "3",
    exptext: "✅ CJI is Patron-in-Chief. 📌 Executive Chairman = a sitting SC judge; HQ New Delhi. ❌ Option 2 swaps the two posts."
  },
  57: {
    type: "concept", icon: "🤲", accent: "#fb7185", pauseTimer: true,
    title: "Lok Adalats",
    html: `
      <p class="cp-lead">The 'People's Court' — <u>quick, free and based on Gandhian principles</u>.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Nature</td><td>Based on <b>Gandhian principles</b>; part of the <b>ADR</b> system</td></tr><tr><td>Status</td><td>Statutory under the Legal Services Authorities Act, <b>1987</b></td></tr><tr><td>First</td><td><b>Gujarat, 1982</b> (post-independence)</td></tr><tr><td>Bench</td><td>A judge (usually retired) + <b>2 members</b></td></tr><tr><td>Powers</td><td>Powers of a <b>Civil Court</b></td></tr><tr><td>Award</td><td>A settlement is a <b>decree</b> with <b>no appeal</b> (mutual consent)</td></tr><tr><td>Excluded</td><td>Non-compoundable offences</td></tr></tbody></table>
    `
  },
  58: {
    questext: "The award of a Lok Adalat is:",
    options: ["Appealable to the High Court", "Only advisory", "Subject to review by the Supreme Court", "A decree with no appeal"],
    correct: "4",
    exptext: "✅ A decree, with no appeal. 📌 Mutual consent settlement. ❌ No higher court hears an appeal."
  },
  59: {
    questext: "The first post-independence Lok Adalat was held in:",
    options: ["Gujarat", "Haryana", "Delhi", "Maharashtra"],
    correct: "1",
    exptext: "✅ Gujarat, 1982. 📌 Statutory status came in 1987. ❌ Haryana is linked to the Mobile Court."
  },
  60: {
    type: "concept", icon: "🚌", accent: "#2dd4bf", pauseTimer: true,
    title: "Special Courts",
    html: `
      <table><thead><tr><th>Court</th><th>Key facts</th></tr></thead><tbody><tr><td>Family Courts</td><td><b>Family Courts Act, 1984</b>; set up by the State with the HC in cities over <b>10 lakh</b> population; divorce, custody, alimony; appeal to HC</td></tr><tr><td>Gram Nyayalaya</td><td><b>Gram Nyayalaya Act, 2008</b> (from 2 Oct 2009); headed by a <b>Nyayadhikari</b>; criminal cases up to a 2-year sentence (Plea Bargaining)</td></tr><tr><td>Mobile Court ('Justice on Wheels')</td><td>Credited to <b>Dr. A. P. J. Abdul Kalam</b>; first in <b>Mewat, Haryana (2007)</b>; runs inside a bus</td></tr><tr><td>Court Martial</td><td>Tries military personnel; SC and HCs have <b>no appellate jurisdiction</b> (Art. 136(2), 227(4)); appeals go to the <b>Armed Forces Tribunal</b></td></tr></tbody></table>
    `
  },
  61: {
    questext: "The Gram Nyayalaya Act was passed in:",
    options: ["1987", "2008", "1984", "2010"],
    correct: "2",
    exptext: "✅ 2008 (in effect from 2 Oct 2009). 📌 Family Courts Act is 1984. ❌ 1987 is the Legal Services Act."
  },
  62: {
    questext: "Appeals against court-martial decisions go to the:",
    options: ["High Court", "Supreme Court", "Armed Forces Tribunal", "Central Administrative Tribunal"],
    correct: "3",
    exptext: "✅ Armed Forces Tribunal. 📌 SC and HCs have no appellate role. ❌ CAT handles civil service disputes."
  },
  63: {
    type: "concept", icon: "🏷️", accent: "#c026d3", pauseTimer: true,
    title: "Tribunals (Part XIV-A, Art. 323A and 323B)",
    html: `
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Origin</td><td>Original Constitution had no tribunals; the <b>42nd Amendment, 1976</b> added Part XIV-A</td></tr><tr><td>Art. 323A</td><td>Administrative tribunals for <b>service disputes</b>; Administrative Tribunals Act, <b>1985</b> allows a CAT (principal bench at Delhi) and State tribunals</td></tr><tr><td>Art. 323B</td><td>Tribunals for taxation, foreign exchange, industrial/labour, land reforms, elections, rent etc.</td></tr><tr><td>323A vs 323B</td><td>323A tribunals — set up by <b>Parliament only</b>; 323B tribunals — by <b>Parliament and State legislatures</b></td></tr><tr><td>NGT</td><td><b>NGT Act, 2010</b>; HQ New Delhi; zonal benches at Bhopal, Pune, Kolkata, Chennai; disposes cases within about 6 months</td></tr></tbody></table>
    `
  },
  64: {
    questext: "Tribunals were added to the Constitution by which Amendment?",
    options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "86th Amendment"],
    correct: "1",
    exptext: "✅ 42nd Amendment, 1976 (Part XIV-A). 📌 Arts. 323A and 323B. ❌ The original text had no tribunals."
  },
  65: {
    questext: "Tribunals under Article 323B can be set up by:",
    options: ["Parliament only", "State legislatures only", "Parliament and State legislatures", "The President"],
    correct: "3",
    exptext: "✅ Parliament and State legislatures. 📌 323A = Parliament only. ❌ Option 1 is the 323A rule."
  },
  66: {
    questext: "Which is NOT a zonal bench of the National Green Tribunal?",
    options: ["Bhopal", "Pune", "Kolkata", "Hyderabad"],
    correct: "4",
    exptext: "✅ Hyderabad is not a zonal bench. 📌 Bhopal, Pune, Kolkata, Chennai plus Delhi HQ. ❌ The other three are zonal benches."
  },
  67: {
    type: "concept", icon: "📈", accent: "#b45309", pauseTimer: true,
    title: "Growth in the Number of SC Judges",
    html: `
      <table><thead><tr><th>Year</th><th>Other judges</th><th>Total (incl. CJI)</th></tr></thead><tbody><tr><td>Original (1950)</td><td>7</td><td>8</td></tr><tr><td>1956</td><td>10</td><td>11</td></tr><tr><td>1960</td><td>13</td><td>14</td></tr><tr><td>1977</td><td>17</td><td>18</td></tr><tr><td>1986</td><td>25</td><td>26</td></tr><tr><td>2008</td><td>30</td><td>31</td></tr><tr><td>2019</td><td>33</td><td>34</td></tr><tr><td>2026</td><td>37</td><td>38</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>8 → 11 → 14 → 18 → 26 → 31 → 34 → 38</b></div>
    `
  },
  68: {
    questext: "In which year was the SC strength raised from 18 to 26 (including the CJI)?",
    options: ["1977", "1986", "2008", "2019"],
    correct: "2",
    exptext: "✅ 1986. 📌 1977: 18, 1986: 26. ❌ 2008 raised it to 31."
  },
  69: {
    questext: "What was the total strength of the SC (including the CJI) after the 2019 increase?",
    options: ["31", "33", "34", "38"],
    correct: "3",
    exptext: "✅ 34 (CJI + 33), up from 31. 📌 Now 38 after 2026. ❌ 31 was the earlier strength."
  },
  70: {
    type: "concept", icon: "🇺🇸", accent: "#7c3aed", pauseTimer: true,
    title: "Indian vs American Supreme Court",
    html: `
      <table><thead><tr><th>Indian Supreme Court</th><th>American Supreme Court</th></tr></thead><tbody><tr><td>Original jurisdiction confined to <b>federal cases</b></td><td>Federal cases + naval, maritime, ambassadors etc.</td></tr><tr><td>Appellate — constitutional, civil and criminal</td><td>Appellate — <b>constitutional cases only</b></td></tr><tr><td>Wide discretion (special leave) over any court/tribunal</td><td>No such plenary power</td></tr><tr><td>Has <b>advisory</b> jurisdiction</td><td>No advisory jurisdiction</td></tr><tr><td>Judicial review is <b>limited</b></td><td>Judicial review is very wide</td></tr><tr><td>Rights protected by <b>'procedure established by law'</b></td><td>Rights protected by <b>'due process of law'</b></td></tr><tr><td>Jurisdiction can be enlarged by Parliament</td><td>Powers limited to those in the Constitution</td></tr><tr><td>Superintendence over State HCs (integrated system)</td><td>No such power (double system)</td></tr></tbody></table>
    `
  },
  71: {
    questext: "Which is a feature of the Indian SC but NOT of the American SC?",
    options: ["Judicial review", "Original jurisdiction", "Appellate jurisdiction", "Advisory jurisdiction"],
    correct: "4",
    exptext: "✅ Advisory jurisdiction exists only in India. 📌 Art. 143. ❌ The others exist in both."
  },
  72: {
    questext: "'Due process of law' protects rights in which country?",
    options: ["India", "The USA", "Both", "Neither"],
    correct: "2",
    exptext: "✅ The USA. 📌 India: 'procedure established by law'. ❌ India does not use due process."
  },
  73: {
    type: "concept", icon: "🔢", accent: "#0d9488", pauseTimer: true,
    title: "Supreme Court — Articles 124–147 at a Glance",
    html: `
      <p class="cp-lead">Match each Article to its subject — <u>126, 127, 128 are Acting, Ad hoc and Retired judges in order</u>.</p>
      <table><thead><tr><th>Article</th><th>Subject-Matter</th></tr></thead><tbody><tr><td>124</td><td>Establishment and Constitution of the SC</td></tr><tr><td>124A–124C</td><td>NJAC and related (struck down)</td></tr><tr><td>125</td><td>Salaries of Judges</td></tr><tr><td>126</td><td>Acting Chief Justice</td></tr><tr><td>127</td><td>Ad hoc Judges</td></tr><tr><td>128</td><td>Attendance of retired Judges</td></tr><tr><td>129</td><td>SC as a Court of Record</td></tr><tr><td>130</td><td>Seat of the SC</td></tr><tr><td>131</td><td>Original jurisdiction</td></tr><tr><td>132–134</td><td>Appellate jurisdiction (constitutional/civil/criminal)</td></tr><tr><td>134A</td><td>Certificate for appeal</td></tr><tr><td>136</td><td>Special Leave to appeal</td></tr><tr><td>137</td><td>Review of judgments</td></tr><tr><td>138</td><td>Enlargement of jurisdiction</td></tr><tr><td>139</td><td>Power to issue writs</td></tr><tr><td>139A</td><td>Transfer of cases</td></tr><tr><td>141</td><td>Law declared by the SC binding on all courts</td></tr><tr><td>142</td><td>Enforcement of decrees (complete justice)</td></tr><tr><td>143</td><td>President's power to consult the SC</td></tr><tr><td>145</td><td>Rules of court</td></tr><tr><td>146</td><td>Officers and expenses</td></tr><tr><td>147</td><td>Interpretation</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>126</b> Acting → <b>127</b> Ad hoc → <b>128</b> Retired → <b>129</b> Record → <b>130</b> Seat</div>
    `
  },
  74: {
    questext: "Which pair is correctly matched?",
    options: ["Art. 125 — Salaries of Judges", "Art. 130 — Court of Record", "Art. 131 — Advisory jurisdiction", "Art. 143 — Original jurisdiction"],
    correct: "1",
    exptext: "✅ Art. 125 deals with salaries. 📌 129 = Record, 130 = Seat. ❌ 131 is original, 143 advisory."
  },
  75: {
    questext: "Transfer of cases to the Supreme Court from High Courts is covered by:",
    options: ["Article 137", "Article 138", "Article 139", "Article 139A"],
    correct: "4",
    exptext: "✅ Article 139A. 📌 137 = review, 139 = writs. ❌ Art. 138 is enlargement of jurisdiction."
  },
  76: {
    type: "concept", icon: "🏯", accent: "#be123c", pauseTimer: true,
    title: "High Courts — Articles 214–231 at a Glance",
    html: `
      <p class="cp-lead">Match each Article to its subject — <u>217 appoints, 219 oath, 221 salary</u>.</p>
      <table><thead><tr><th>Article</th><th>Subject-Matter</th></tr></thead><tbody><tr><td>214</td><td>High Courts for States</td></tr><tr><td>215</td><td>HCs to be Courts of Record</td></tr><tr><td>216</td><td>Constitution of High Courts</td></tr><tr><td>217</td><td>Appointment and conditions of a HC Judge</td></tr><tr><td>218</td><td>Application of certain SC provisions</td></tr><tr><td>219</td><td>Oath by HC judges</td></tr><tr><td>220</td><td>Restriction on practice after being a judge</td></tr><tr><td>221</td><td>Salaries of judges</td></tr><tr><td>222</td><td>Transfer of a judge between HCs</td></tr><tr><td>223</td><td>Acting Chief Justice</td></tr><tr><td>224</td><td>Additional and acting judges</td></tr><tr><td>224A</td><td>Retired judges at HC sittings</td></tr><tr><td>225</td><td>Jurisdiction of existing HCs</td></tr><tr><td>226</td><td>Power to issue writs</td></tr><tr><td>227</td><td>Superintendence over all courts</td></tr><tr><td>228</td><td>Transfer of certain cases to the HC</td></tr><tr><td>229</td><td>Officers and expenses</td></tr><tr><td>230</td><td>Extension of HC jurisdiction to UTs</td></tr><tr><td>231</td><td>Common HC for 2+ States</td></tr></tbody></table>
    `
  },
  77: {
    questext: "High Courts are declared Courts of Record by which Article?",
    options: ["Article 214", "Article 215", "Article 216", "Article 217"],
    correct: "2",
    exptext: "✅ Article 215. 📌 SC's Art. 129. ❌ Art. 214 only establishes HCs for States."
  },
  78: {
    questext: "Which pair is correctly matched?",
    options: ["Art. 219 — Salaries of judges", "Art. 221 — Oath by HC judges", "Art. 231 — Transfer of a judge between HCs", "Art. 220 — Restriction on practice after being a judge"],
    correct: "4",
    exptext: "✅ Art. 220 restricts practice after being a judge. 📌 219 = oath, 221 = salary, 222 = transfer. ❌ Options 1–3 swap subjects."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/Polity/Supreme_Court_High_Court_and_Subordinate_Court/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a brushed-gold scales of justice, a dark wooden gavel on a stand and a neat stack of blank leather-bound law books" },
  "images/Polity/Supreme_Court_High_Court_and_Subordinate_Court/1.png": { t: "fig", about: "Schematic pyramid, top to bottom: SUPREME COURT, HIGH COURTS, DISTRICT AND SESSIONS COURTS, SUBORDINATE COURTS. Side label: ONE INTEGRATED SYSTEM." },
  "images/Polity/Supreme_Court_High_Court_and_Subordinate_Court/2.png": { t: "fig", about: "Five boxes joined by arrows: MOTION 100 LS / 50 RS, SPEAKER OR CHAIRMAN ADMITS, 3-MEMBER COMMITTEE, SPECIAL MAJORITY IN BOTH HOUSES, PRESIDENT ORDERS REMOVAL." }
});

/* CHANGE LOG
   - Supreme Court strength: the book's present strength of 38 (CJI + 37) is correct after the Supreme Court (Number of Judges) Amendment Act, 2026; a 2026 row was added to the growth table.
   - High Courts of UTs: the book says only Delhi has a separate HC; corrected to add that Jammu and Kashmir and Ladakh share a High Court.
   - Removal of HC judges: 'removal started twice' was reworded to simply name Soumitra Sen and P. D. Dinakaran (both resigned).
   - Contempt law: the book's 'Contempt of Court Act, 1971' is written correctly as the Contempt of Courts Act, 1971.
   - Free legal aid income limit: the book's fixed figure was dropped because the limit is fixed by each State.
*/
