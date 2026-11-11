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

/* Subject: General_Awareness/Polity · Chapter: Parliament · 13 concept pages (+ overview) · 34 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Parliament (Part 1: Basics, Rajya Sabha, Lok Sabha Composition)",
    thumb: {
      image: "images/General_Awareness/Polity/Parliament/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "PARLIAMENT",
      line2: "OF INDIA",
      line3: "FULL POLITY",
      badge: "FULL CLASS",
      ribbon: "RAJYA SABHA • LOK SABHA • ARTICLES",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Parliament of India | Rajya Sabha & Lok Sabha | Polity Full Class",
      altTitles: ["Parliament Article 79 to 123 Polity Class", "Rajya Sabha vs Lok Sabha Composition and Tenure"],
      description: "Parliament is the biggest scoring chapter in Polity. In this full class we cover every subtopic in the book's order.\n\n📌 IN THIS CLASS\n✅ Article 79 and key Articles 79 to 123\n✅ Rajya Sabha composition, tenure and officers\n✅ Rajya Sabha powers: Art. 249 and Art. 312\n✅ Lok Sabha composition, election and duration\n✅ Reservation of seats and dual membership rules\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #Parliament #SSCCGL",
      tags: ["parliament of india", "rajya sabha", "lok sabha", "article 79", "article 80", "article 81", "article 83", "article 84", "article 89", "article 249", "article 312", "rajya sabha chairman", "deputy chairman", "104th amendment", "dual membership", "sc st reservation", "polity for all exams", "indian polity", "polity mcq", "ssc cgl polity", "upsc polity", "general awareness", "static gk", "polity tricks", "competitive exams", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "full class", "tricks", "questions", "MCQ", "previous year questions", "important questions"],
      hashtags: ["Polity", "Parliament", "SSCCGL"],
      thumbText: "PARLIAMENT OF INDIA",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New Polity class is live: Parliament of India. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Polity — Full Chapter Classes"
    },
    html: `
      <p class="cp-lead">A <u>complete class on Parliament</u> — its structure, the Rajya Sabha and the composition of the Lok Sabha, a must-know for every Polity paper.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>34</b><span>Questions</span></div>
        <div class="cp-stat"><b>~60 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Legislature &amp; Parliament Basics (Art. 79)</b><br>Three parts, two Houses, the President's role.</li>
        <li><b>Key Articles of Parliament (Art. 79–123)</b><br>Article-to-subject table.</li>
        <li><b>Rajya Sabha – Composition (Art. 80)</b><br>250 maximum, 245 present.</li>
        <li><b>Rajya Sabha – Qualification &amp; Tenure</b><br>Age 30, permanent House, 6-year terms.</li>
        <li><b>Rajya Sabha – Chairman (Art. 89)</b><br>Vice-President as ex-officio Chairman.</li>
        <li><b>Rajya Sabha – Deputy Chairman</b><br>Elected from members.</li>
        <li><b>Panel of Vice-Chairpersons &amp; Secretariat</b><br>Who presides in absence.</li>
        <li><b>Powers &amp; Functions of the Rajya Sabha</b><br>Art. 249, Art. 312, Money Bills.</li>
        <li><b>Lok Sabha – Composition (Art. 81)</b><br>552 maximum, 543 present.</li>
        <li><b>Lok Sabha – Election &amp; Qualification</b><br>FPTP, age 25.</li>
        <li><b>Lok Sabha – Duration (Art. 83)</b><br>5 years, emergency extension.</li>
        <li><b>Lok Sabha – Reservation of Seats (SC/ST)</b><br>Extended up to 2030.</li>
        <li><b>Lok Sabha – Dual Membership Rules</b><br>RPA 1951 rules.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Parliament's structure, Articles 79-123, the Rajya Sabha and the Lok Sabha are repeated in SSC, UPSC, Banking, Railways and Defence exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#3b82f6", pauseTimer: true,
    title: "The Legislature & Parliament Basics (Art. 79)",
    html: `
      <p class="cp-lead">The law-making body is the <b>Legislature</b>. At the Centre it is <u>Parliament</u>; in the States it is the State Legislature.</p>
      <table><thead><tr><th>Level</th><th>Body</th><th>Structure</th></tr></thead><tbody><tr><td>Centre</td><td>Parliament — Part V (Arts. 79–122)</td><td>President + Rajya Sabha (Upper House) + Lok Sabha (Lower House)</td></tr><tr><td>State</td><td>State Legislature — Part VI (Arts. 168–212)</td><td>Governor + Legislative Assembly (Lower House) + Legislative Council (Upper House, only if bicameral)</td></tr></tbody></table>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Rajya Sabha</td><td>Upper / Second Chamber / House of Elders; represents the States &amp; UTs</td></tr><tr><td>Lok Sabha</td><td>Lower / First Chamber / Popular House; represents the people of India</td></tr><tr><td>The President</td><td>Not a member of either House, but an integral part of Parliament</td></tr><tr><td>Pattern</td><td>British (Crown + Lords + Commons), not the American one</td></tr><tr><td>Hindi names</td><td>'Rajya Sabha' and 'Lok Sabha' adopted in 1954</td></tr></tbody></table>
      <div class="cp-note trap">In the Rajya Sabha, States do <b>NOT</b> have equal representation — seats are based on population (unlike the US Senate, where every state has 2).</div>
      <div class="cp-note exam">A bill needs the <b>President's assent</b> to become law; he also issues ordinances (Art. 123).</div>
    `
  },
  3: {
    questext: "Parliament of India consists of:",
    options: ["Lok Sabha and Rajya Sabha only", "President, Rajya Sabha and Lok Sabha", "Prime Minister, Rajya Sabha and Lok Sabha", "President, Vice-President and Lok Sabha"],
    correct: "2",
    exptext: "✅ President + RS + LS. 📌 Three parts. ❌ The PM is not a part of Parliament."
  },
  4: {
    questext: "Which statement about the President in relation to Parliament is correct?",
    options: ["He is a member of the Lok Sabha", "He is a member of the Rajya Sabha", "He is not a part of Parliament", "He is not a member of either House but is an integral part of Parliament"],
    correct: "4",
    exptext: "✅ Not a member, but integral to Parliament. 📌 Bills need his assent. ❌ He sits in neither House."
  },
  5: {
    questext: "The Hindi names 'Rajya Sabha' and 'Lok Sabha' were adopted in:",
    options: ["1954", "1950", "1952", "1962"],
    correct: "1",
    exptext: "✅ Adopted in 1954. 📌 After the first sitting in 1952. ❌ 1950 was the Constitution's start."
  },
  6: {
    type: "concept", icon: "🔑", accent: "#ef4444", pauseTimer: true,
    title: "Key Articles of Parliament (Art. 79–123)",
    html: `
      <p class="cp-lead">Learn the <u>Article → subject</u> pairs; direct questions are common.</p>
      <table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td>79</td><td>Constitution of Parliament</td></tr><tr><td>80</td><td>Composition of the Rajya Sabha</td></tr><tr><td>81</td><td>Composition of the Lok Sabha</td></tr><tr><td>82</td><td>Readjustment after each census</td></tr><tr><td>83</td><td>Duration of Houses of Parliament</td></tr><tr><td>84</td><td>Qualification for membership</td></tr><tr><td>85</td><td>Sessions, prorogation &amp; dissolution</td></tr><tr><td>86</td><td>President's right to address &amp; send messages</td></tr><tr><td>87</td><td>Special address by the President</td></tr><tr><td>88</td><td>Rights of Ministers &amp; Attorney-General in Houses</td></tr><tr><td>89</td><td>Chairman &amp; Deputy Chairman of Rajya Sabha</td></tr><tr><td>93</td><td>Speaker &amp; Deputy Speaker of Lok Sabha</td></tr><tr><td>99</td><td>Oath / affirmation by members</td></tr><tr><td>100</td><td>Voting in Houses; quorum</td></tr><tr><td>101–104</td><td>Vacation of seats / disqualifications</td></tr><tr><td>105</td><td>Powers, privileges &amp; immunities</td></tr><tr><td>108</td><td>Joint sitting of both Houses</td></tr><tr><td>109–110</td><td>Money Bills – procedure &amp; definition</td></tr><tr><td>111</td><td>Assent to Bills</td></tr><tr><td>112</td><td>Annual financial statement (Budget)</td></tr><tr><td>114</td><td>Appropriation Bills</td></tr><tr><td>116</td><td>Votes on account, credit, exceptional grants</td></tr><tr><td>120</td><td>Language used in Parliament</td></tr><tr><td>122</td><td>Courts not to inquire into proceedings</td></tr><tr><td>123</td><td>President's power to promulgate Ordinances</td></tr></tbody></table>
      <div class="cp-note exam">Quick pairs: <b>80 = RS</b>, <b>81 = LS</b>, <b>89 = RS Chairman</b>, <b>93 = Speaker</b>, <b>108 = joint sitting</b>.</div>
    `
  },
  7: {
    questext: "Which Article deals with the composition of the Rajya Sabha?",
    options: ["Art. 79", "Art. 81", "Art. 80", "Art. 83"],
    correct: "3",
    exptext: "✅ Art. 80 is Rajya Sabha composition. 📌 80 = RS, 81 = LS. ❌ Art. 81 is the Lok Sabha."
  },
  8: {
    questext: "Which Article deals with the Chairman and Deputy Chairman of the Rajya Sabha?",
    options: ["Art. 93", "Art. 88", "Art. 89", "Art. 99"],
    correct: "3",
    exptext: "✅ Art. 89 covers both officers. 📌 89 = RS officers. ❌ Art. 93 is the Speaker."
  },
  9: {
    questext: "Which Article deals with the Annual Financial Statement (Budget)?",
    options: ["Art. 112", "Art. 110", "Art. 114", "Art. 116"],
    correct: "1",
    exptext: "✅ Art. 112 is the Budget. 📌 112 = Budget. ❌ Art. 114 is Appropriation Bills."
  },
  10: {
    type: "concept", icon: "🔢", accent: "#f59e0b", pauseTimer: true,
    title: "Rajya Sabha – Composition (Art. 80)",
    html: `
      <p class="cp-lead">The Rajya Sabha has a <b>maximum of 250 members</b>, almost all <u>indirectly elected</u>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Maximum strength</td><td>250 = 238 representatives of States &amp; UTs (indirectly elected) + 12 nominated by the President</td></tr><tr><td>Present strength</td><td>245 = 225 (States) + 8 (UTs) + 12 (nominated)</td></tr><tr><td>Fourth Schedule</td><td>Allocates Rajya Sabha seats to States &amp; UTs</td></tr><tr><td>Highest seats</td><td>Uttar Pradesh (31) > Maharashtra (19) > Tamil Nadu (18) > West Bengal (16) = Bihar (16)</td></tr><tr><td>Smallest States</td><td>Several small States (e.g. Tripura) have only 1 seat</td></tr><tr><td>Election</td><td>By elected members of State Legislative Assemblies (Art. 80(4)) through PR by STV (RPA, 1951)</td></tr></tbody></table>
      <div class="cp-note trap">Seats depend on <b>population</b>, so States are <b>not</b> equal (unlike the US Senate).</div>
      <div class="cp-note exam">Remember <b>250 = 238 + 12</b>; <b>245</b> is the present strength.</div>
    `
  },
  11: {
    questext: "The maximum strength of the Rajya Sabha is:",
    options: ["238", "245", "552", "250"],
    correct: "4",
    exptext: "✅ Maximum 250. 📌 238 + 12 nominated. ❌ 245 is the present strength."
  },
  12: {
    questext: "How many members does the President nominate to the Rajya Sabha?",
    options: ["2", "12", "10", "14"],
    correct: "2",
    exptext: "✅ 12 nominated members. 📌 250 = 238 + 12. ❌ Two was the Anglo-Indian figure in the Lok Sabha."
  },
  13: {
    questext: "Which State has the highest number of Rajya Sabha seats?",
    options: ["Uttar Pradesh", "Maharashtra", "Tamil Nadu", "Bihar"],
    correct: "1",
    exptext: "✅ Uttar Pradesh has 31 seats. 📌 UP > Maharashtra > TN. ❌ Maharashtra has 19."
  },
  14: {
    questext: "Which statement about the Rajya Sabha is NOT correct?",
    options: ["Seats are allocated by the Fourth Schedule", "Members are elected by STV", "Every State has equal representation", "Members are elected by elected members of State Legislative Assemblies"],
    correct: "3",
    exptext: "✅ Representation depends on population, not equality. 📌 US Senate has equal states. ❌ Others are true."
  },
  15: {
    type: "concept", icon: "🎓", accent: "#8b5cf6", pauseTimer: true,
    title: "Rajya Sabha – Qualification (Art. 84) & Tenure (Art. 83)",
    html: `
      <p class="cp-lead">The Rajya Sabha is a <b>permanent House</b> — it is <u>never dissolved</u>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Citizenship</td><td>Citizen of India</td></tr><tr><td>Minimum age</td><td>30 years</td></tr><tr><td>Other conditions</td><td>Sound mind; no office of profit (except a ministerial post)</td></tr><tr><td>Nature</td><td>Permanent House — never dissolved</td></tr><tr><td>Member's term</td><td>6 years; one-third retire every 2 years</td></tr><tr><td>Source of term</td><td>The Constitution did not fix it — RPA 1951 fixed it at 6 years</td></tr><tr><td>Beginning</td><td>First constituted in 1952; first sitting on 13 May 1952</td></tr></tbody></table>
      <div class="cp-note trap">The House is never dissolved, but <b>each member</b> serves 6 years.</div>
      <div class="cp-note exam">Age: <b>RS 30</b>, LS 25.</div>
    `
  },
  16: {
    questext: "What is the minimum age for membership of the Rajya Sabha?",
    options: ["25 years", "30 years", "35 years", "21 years"],
    correct: "2",
    exptext: "✅ 30 years. 📌 RS 30, LS 25. ❌ 35 is for President and VP."
  },
  17: {
    questext: "The Rajya Sabha is a permanent House. Each member serves ___ years, and ___ of the members retire every 2 years.",
    options: ["5; one-half", "5; one-third", "6; one-half", "6; one-third"],
    correct: "4",
    exptext: "✅ Six-year term; one-third retire every two years. 📌 6 and 1/3. ❌ Five years is the Lok Sabha term."
  },
  18: {
    questext: "The first sitting of the Rajya Sabha was held on:",
    options: ["26 January 1950", "15 August 1947", "3 April 1952", "13 May 1952"],
    correct: "4",
    exptext: "✅ 13 May 1952. 📌 Constituted in 1952. ❌ 3 April 1952 is not the sitting date."
  },
  19: {
    type: "concept", icon: "🪑", accent: "#14b8a6", pauseTimer: true,
    title: "Rajya Sabha – Chairman (Art. 89)",
    html: `
      <p class="cp-lead">The Vice-President of India is the <b>ex-officio Chairman</b> of the Rajya Sabha.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Who</td><td>Vice-President of India (ex-officio)</td></tr><tr><td>When VP acts as President</td><td>He does not perform the Chairman's duties</td></tr><tr><td>Removal</td><td>Only if removed from the office of Vice-President</td></tr><tr><td>Powers</td><td>Similar to the Speaker, but the Speaker has two special powers the Chairman lacks: (1) deciding if a Bill is a Money Bill, (2) presiding over a joint sitting</td></tr><tr><td>Voting</td><td>Not a member of the House; no vote in the first instance, only a casting vote in a tie</td></tr><tr><td>Salary</td><td>Charged on the Consolidated Fund of India (not subject to annual vote)</td></tr></tbody></table>
      <div class="cp-note trap">Unlike the Speaker, the Chairman is <b>not a member</b> of the House and gets <b>no first vote</b>.</div>
      <div class="cp-note exam">Two powers the Chairman <b>lacks</b>: Money Bill decision and joint-sitting chair.</div>
    `
  },
  20: {
    questext: "Which two special powers does the Speaker have that the Rajya Sabha Chairman lacks?",
    options: ["Casting vote and adjournment", "Deciding a Money Bill and presiding over a joint sitting", "Maintaining order and deciding points of order", "Summoning Parliament and dissolving the House"],
    correct: "2",
    exptext: "✅ Money Bill decision and joint-sitting chair. 📌 Two Speaker-only powers. ❌ Order and points of order are shared."
  },
  21: {
    questext: "The Chairman of the Rajya Sabha can be removed from the chair only if:",
    options: ["A resolution is passed by the Rajya Sabha alone", "The President orders it", "He is removed from the office of Vice-President", "The Supreme Court declares so"],
    correct: "3",
    exptext: "✅ Only on removal as Vice-President. 📌 The chair follows the VP office. ❌ No separate removal exists."
  },
  22: {
    questext: "The salary of the Chairman of the Rajya Sabha is:",
    options: ["Charged on the Consolidated Fund of India", "Voted annually by Parliament", "Paid from the Contingency Fund", "Fixed by the President"],
    correct: "1",
    exptext: "✅ Charged on the Consolidated Fund, not voted. 📌 Charged = no annual vote. ❌ Not paid from the Contingency Fund."
  },
  23: {
    type: "concept", icon: "🧑‍💼", accent: "#ec4899", pauseTimer: true,
    title: "Rajya Sabha – Deputy Chairman",
    html: `
      <p class="cp-lead">The Deputy Chairman is <b>elected from within</b> the Rajya Sabha and is <u>not under the Chairman</u>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Election</td><td>Elected by the Rajya Sabha from its own members</td></tr><tr><td>Removal</td><td>By a majority of all then-members (14 days' notice)</td></tr><tr><td>Role</td><td>Performs the Chairman's duties when that office is vacant, the VP is acting as President, or the Chairman is absent</td></tr><tr><td>Status</td><td>NOT subordinate to the Chairman — directly responsible to the Rajya Sabha</td></tr></tbody></table>
      <div class="cp-note trap">He is <b>elected by the House</b>, not appointed by the Chairman or President.</div>
      <div class="cp-note exam">Removal: <b>majority of all then-members + 14 days' notice</b>.</div>
    `
  },
  24: {
    questext: "The Deputy Chairman of the Rajya Sabha is:",
    options: ["Appointed by the President", "Nominated by the Chairman", "Elected by the Rajya Sabha from among its members", "Elected by both Houses jointly"],
    correct: "3",
    exptext: "✅ Elected by the RS from its members. 📌 House-elected. ❌ Not nominated by anyone."
  },
  25: {
    questext: "The Deputy Chairman of the Rajya Sabha can be removed by a majority of:",
    options: ["Members present and voting", "All the then members, with 14 days' notice", "Two-thirds of members present", "Both Houses jointly"],
    correct: "2",
    exptext: "✅ All then-members, 14 days' notice. 📌 Same pattern as the Speaker. ❌ Not simple majority of those voting."
  },
  26: {
    type: "concept", icon: "👥", accent: "#0ea5e9", pauseTimer: true,
    title: "Rajya Sabha – Panel of Vice-Chairpersons & Secretariat",
    html: `
      <p class="cp-lead">When both presiding officers are absent, <u>a panel member steps in</u>.</p>
      <table><thead><tr><th>Item</th><th>Provision</th></tr></thead><tbody><tr><td>Panel of Vice-Chairpersons</td><td>The Chairman nominates a panel; any one presides in the absence of both the Chairman and the Deputy Chairman</td></tr><tr><td>Both offices vacant</td><td>A member appointed by the President performs the duties</td></tr><tr><td>Secretariat (Art. 98)</td><td>Each House has its own staff, headed by a permanent Secretary-General</td></tr></tbody></table>
      <div class="cp-note trap">The panel acts only when <b>both</b> Chairman and Deputy Chairman are absent.</div>
      <div class="cp-note exam">Secretariat = <b>Art. 98</b>, head = <b>Secretary-General</b>.</div>
    `
  },
  27: {
    questext: "Under which Article does each House of Parliament have its own Secretariat?",
    options: ["Art. 89", "Art. 93", "Art. 105", "Art. 98"],
    correct: "4",
    exptext: "✅ Art. 98 gives each House its secretariat. 📌 98 = staff. ❌ Art. 105 is privileges."
  },
  28: {
    questext: "Who presides over the Rajya Sabha when both the Chairman and the Deputy Chairman are absent?",
    options: ["A member from the panel of Vice-Chairpersons", "The Prime Minister", "The senior-most member", "The Secretary-General"],
    correct: "1",
    exptext: "✅ A panel member nominated by the Chairman. 📌 Panel = backup. ❌ The Secretary-General is an official, not a presiding officer."
  },
  29: {
    type: "concept", icon: "⚡", accent: "#f97316", pauseTimer: true,
    title: "Powers & Functions of the Rajya Sabha",
    html: `
      <p class="cp-lead">The Rajya Sabha is <b>equal to the Lok Sabha</b> on ordinary bills but <u>weak on Money Bills</u>. It has special powers to protect the federal balance.</p>
      <table><thead><tr><th>Area</th><th>Power</th></tr></thead><tbody><tr><td>Ordinary bills &amp; Constitution Amendment Bills</td><td>Equal to the Lok Sabha</td></tr><tr><td>Money Bills</td><td>Limited — can only recommend within 14 days</td></tr><tr><td>Art. 249</td><td>By a 2/3 vote, can authorise Parliament to legislate on a State List subject of national importance</td></tr><tr><td>Art. 312</td><td>By a 2/3 vote, can create a new All-India Service</td></tr><tr><td>Elections</td><td>Its elected members join the electoral colleges for the President and the Vice-President</td></tr><tr><td>VP removal</td><td>A resolution to remove the VP can be introduced only in the Rajya Sabha</td></tr></tbody></table>
      <div class="cp-note trap">The RS cannot reject a Money Bill; it can only <b>recommend</b> amendments within <b>14 days</b>.</div>
      <div class="cp-note exam"><b>249 = State List</b>, <b>312 = All-India Service</b>.</div>
    `
  },
  30: {
    questext: "Under which Article can the Rajya Sabha, by a 2/3 vote, create a new All-India Service?",
    options: ["Art. 312", "Art. 249", "Art. 110", "Art. 123"],
    correct: "1",
    exptext: "✅ Art. 312 creates All-India Services. 📌 312 = Service. ❌ Art. 249 is State List legislation."
  },
  31: {
    questext: "The Rajya Sabha can detain a Money Bill for a maximum of:",
    options: ["6 months", "1 month", "30 days", "14 days"],
    correct: "4",
    exptext: "✅ Only 14 days. 📌 Money Bill = 14. ❌ Six months applies to ordinary bills."
  },
  32: {
    questext: "Under Art. 249, the Rajya Sabha by a 2/3 vote can authorise Parliament to legislate on:",
    options: ["A Concurrent List subject", "A State List subject of national importance", "A Union List subject", "A residuary subject"],
    correct: "2",
    exptext: "✅ State List subject of national importance. 📌 Protects the federal balance. ❌ Parliament already covers Union List."
  },
  33: {
    type: "concept", icon: "🔢", accent: "#84cc16", pauseTimer: true,
    title: "Lok Sabha – Composition (Art. 81)",
    html: `
      <p class="cp-lead">The Lok Sabha's size changed with the <u>104th Amendment, 2019</u>, which ended the nominated Anglo-Indian seats.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Maximum strength</td><td>552 = 530 (States) + 20 (UTs) + 2 Anglo-Indians (nominated)</td></tr><tr><td>Present strength</td><td>543 = 530 (States) + 13 (UTs)</td></tr><tr><td>104th Amendment, 2019</td><td>Abolished the 2 nominated Anglo-Indian seats (w.e.f. 25 Jan 2020)</td></tr><tr><td>Effective position</td><td>543, all directly elected; effective maximum = 550</td></tr></tbody></table>
      <div class="cp-note trap"><b>552</b> was the old maximum; the effective maximum now is <b>550</b>.</div>
      <div class="cp-note exam">Present strength = <b>543</b>, all directly elected.</div>
    `
  },
  34: {
    questext: "The 104th Amendment, 2019 abolished:",
    options: ["Reservation of SC/ST seats", "The 12 nominated Rajya Sabha seats", "The 2 nominated Anglo-Indian seats in the Lok Sabha", "The adult franchise age limit"],
    correct: "3",
    exptext: "✅ It ended the 2 nominated Anglo-Indian seats. 📌 Effective from 25 Jan 2020. ❌ SC/ST reservation was extended."
  },
  35: {
    questext: "The present effective strength of the Lok Sabha is:",
    options: ["545", "543", "552", "550"],
    correct: "2",
    exptext: "✅ 543, all directly elected. 📌 530 + 13. ❌ 552 was the old maximum."
  },
  36: {
    type: "concept", icon: "🗳️", accent: "#a855f7", pauseTimer: true,
    title: "Lok Sabha – Election & Qualification",
    html: `
      <p class="cp-lead">Lok Sabha members are <b>directly elected</b> by the people.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Election</td><td>Direct, from single-member constituencies, by secret ballot</td></tr><tr><td>Franchise</td><td>Universal adult suffrage (voting age 18 years)</td></tr><tr><td>System</td><td>First-Past-The-Post (FPTP)</td></tr><tr><td>Qualification (Art. 84)</td><td>Citizen of India; minimum age 25 years; sound mind; no office of profit</td></tr></tbody></table>
      <div class="cp-note trap">LS uses <b>FPTP</b>; the Rajya Sabha and President use <b>STV</b>.</div>
      <div class="cp-note exam">Age: <b>LS 25</b>, RS 30.</div>
    `
  },
  37: {
    questext: "Members of the Lok Sabha are elected by which system?",
    options: ["First-Past-The-Post", "PR by Single Transferable Vote", "PR by list system", "Second ballot system"],
    correct: "1",
    exptext: "✅ FPTP in single-member constituencies. 📌 LS = FPTP. ❌ STV is for RS and the President."
  },
  38: {
    questext: "What are the minimum age to contest the Lok Sabha and the voting age respectively?",
    options: ["21; 21", "30; 18", "25; 18", "25; 21"],
    correct: "3",
    exptext: "✅ 25 years to contest; 18 years to vote. 📌 25 and 18. ❌ 30 is the Rajya Sabha age."
  },
  39: {
    type: "concept", icon: "⏳", accent: "#06b6d4", pauseTimer: true,
    title: "Lok Sabha – Duration (Art. 83)",
    html: `
      <p class="cp-lead">The Lok Sabha's normal term is <b>5 years</b>, but it can be <u>cut short or extended</u>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Normal term</td><td>5 years from its first meeting; the President may dissolve it earlier on the CoM's advice</td></tr><tr><td>National Emergency</td><td>Term extended by law 1 year at a time, but not beyond 6 months after the emergency ends</td></tr><tr><td>42nd Amendment (1976)</td><td>Raised the term from 5 to 6 years</td></tr><tr><td>44th Amendment (1978)</td><td>Restored it to 5 years</td></tr><tr><td>Absence</td><td>A member absent for 60 days (without permission) may have the seat declared vacant</td></tr></tbody></table>
      <div class="cp-note trap">The term runs from the <b>first meeting</b>, not from the election result.</div>
      <div class="cp-note exam">Remember <b>42nd → 6 years</b>, <b>44th → back to 5</b>.</div>
    `
  },
  40: {
    questext: "During a National Emergency, the Lok Sabha's term can be extended by law by:",
    options: ["6 months at a time", "2 years at a time", "3 months at a time", "1 year at a time"],
    correct: "4",
    exptext: "✅ One year at a time. 📌 Max 6 months after emergency ends. ❌ Two years is not allowed."
  },
  41: {
    questext: "Which Amendment increased the Lok Sabha's term from 5 to 6 years?",
    options: ["44th Amendment", "52nd Amendment", "91st Amendment", "42nd Amendment"],
    correct: "4",
    exptext: "✅ The 42nd Amendment (1976). 📌 42nd raised, 44th restored. ❌ The 44th reverted it to 5."
  },
  42: {
    questext: "A member absent for how many days without permission may have the seat declared vacant?",
    options: ["30 days", "45 days", "60 days", "90 days"],
    correct: "3",
    exptext: "✅ 60 days. 📌 Two months. ❌ 90 days is not the limit."
  },
  43: {
    type: "concept", icon: "🏷️", accent: "#e11d48", pauseTimer: true,
    title: "Lok Sabha – Reservation of Seats (SC/ST)",
    html: `
      <p class="cp-lead">Communal representation was <b>abandoned</b>, but seats are reserved for SCs and STs in the Lok Sabha <u>on a population ratio</u>.</p>
      <table><thead><tr><th>Stage</th><th>Detail</th></tr></thead><tbody><tr><td>Original period</td><td>10 years (up to 1960); extended by 10 years each time</td></tr><tr><td>95th Amendment Act, 2009</td><td>Extended reservation up to 2020</td></tr><tr><td>104th Amendment Act, 2019</td><td>Extended SC/ST reservation up to 25 January 2030 (while ending the Anglo-Indian reserved seats)</td></tr></tbody></table>
      <div class="cp-note trap">The 104th Amendment <b>extended</b> SC/ST reservation but <b>ended</b> Anglo-Indian seats.</div>
      <div class="cp-note exam">Latest extension: <b>25 January 2030</b>.</div>
    `
  },
  44: {
    questext: "Up to which date did the 104th Amendment Act, 2019 extend SC/ST reservation in the Lok Sabha?",
    options: ["25 January 2030", "26 January 2030", "25 January 2020", "25 January 2040"],
    correct: "1",
    exptext: "✅ 25 January 2030. 📌 Ten more years. ❌ 2020 was the previous limit."
  },
  45: {
    questext: "The 95th Amendment Act, 2009 extended SC/ST reservation in the Lok Sabha up to:",
    options: ["2010", "2020", "2030", "2025"],
    correct: "2",
    exptext: "✅ Up to 2020. 📌 95th = 2020. ❌ 2030 came with the 104th."
  },
  46: {
    type: "concept", icon: "🔀", accent: "#22c55e", pauseTimer: true,
    title: "Lok Sabha – Dual Membership Rules (RPA 1951)",
    html: `
      <p class="cp-lead">A person <b>cannot be a member of both Houses</b>. The rules decide <u>which seat falls vacant</u>.</p>
      <table><thead><tr><th>Situation</th><th>Result</th></tr></thead><tbody><tr><td>Member of both Houses simultaneously</td><td>Not allowed</td></tr><tr><td>Elected to both Houses</td><td>Must intimate within 10 days which House; else the Rajya Sabha seat falls vacant</td></tr><tr><td>Sitting member of one House elected to the other</td><td>Seat in the first House becomes vacant</td></tr><tr><td>Elected to two seats in one House</td><td>Must choose one, else both seats become vacant</td></tr><tr><td>Member of both Parliament &amp; State legislature</td><td>Parliament seat vacant if he does not resign the State seat within 14 days</td></tr></tbody></table>
      <div class="cp-note trap">If he does not choose in time, the <b>Rajya Sabha</b> seat is the one that falls vacant.</div>
      <div class="cp-note exam">Numbers: <b>10 days</b> (two Houses), <b>14 days</b> (Parliament and State).</div>
    `
  },
  47: {
    questext: "If a person is elected to both Houses and does not intimate his choice within 10 days, which seat falls vacant?",
    options: ["The Lok Sabha seat", "Both seats", "The Rajya Sabha seat", "Neither seat"],
    correct: "3",
    exptext: "✅ The Rajya Sabha seat falls vacant. 📌 Choose in 10 days. ❌ Both fall vacant only for two seats in one House."
  },
  48: {
    questext: "A person who is a member of both Parliament and a State Legislature must resign the State seat within:",
    options: ["7 days", "10 days", "30 days", "14 days"],
    correct: "4",
    exptext: "✅ 14 days, else the Parliament seat falls vacant. 📌 Parliament vs State = 14. ❌ 10 days is for two Houses."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Parliament/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a softly blurred Parliament dome silhouette, a polished brass gavel and a bound copy of the Constitution on a desk" }
});

/* CHANGE LOG
   - Rajya Sabha present strength: corrected 229 (States) + 4 (UTs) to 225 (States) + 8 (UTs: Delhi 3, Puducherry 1, J&K 4); total stays 245 with 12 nominated.
   - Rajya Sabha seats: 'Tripura has only 1' is written as 'several small States (e.g. Tripura) have only 1 seat'.
   - Lok Sabha reservation: the '[Added] UPDATE' label removed; the 104th Amendment extension to 25 January 2030 is written as plain fact.
*/
