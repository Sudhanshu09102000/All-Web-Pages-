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

/* Subject: General_Awareness/Polity · Chapter: India_and_Its_Territory_and_Citizenship · 37 concept pages (+ overview) · 104 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🗺️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — India & Its Territory + Citizenship",
    thumb: {
      image: "images/General_Awareness/Polity/India_and_Its_Territory_and_Citizenship/thumbnail.png",
      banner: "SSC CGL • UPSC • ALL EXAMS",
      line1: "INDIA & ITS TERRITORY",
      line2: "CITIZENSHIP",
      line3: "ARTICLES 1–11",
      badge: "FULL CLASS",
      ribbon: "POLITY • MCQs • TRICKS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "India & Its Territory + Citizenship | Polity Full Class | SSC CGL UPSC",
      altTitles: ["Articles 1 to 4 and Formation of States Polity", "Citizenship Act 1955, CAA 2019 and OCI Explained"],
      description: "Territory of India and Citizenship are scoring polity topics. In this full class we cover Articles 1 to 4, the evolution of states from 1950 to Telangana, and Citizenship (Articles 5-11) with the Citizenship Act 1955, NRI, PIO, OCI, CAA 2019 and the Assam Accord.\n\n📌 IN THIS CLASS\n✅ Articles 1-4 and the Bangladesh land deal\n✅ Dhar, JVP and Fazl Ali Commission\n✅ States formed after 1956\n✅ Acquisition and loss of citizenship\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #SSCCGL #Citizenship",
      tags: ["India and its territory", "Article 1 to 4", "Union of States", "Indian polity", "polity for SSC CGL", "polity for all exams", "Article 3 reorganisation", "Fazl Ali Commission", "States Reorganisation Act 1956", "Formation of states", "Indian citizenship", "Citizenship Act 1955", "Articles 5 to 11", "Citizenship Amendment Act", "CAA 2019", "OCI PIO NRI", "Assam Accord 1985", "Telangana 29th state", "Sikkim 22nd state", "Dhar Commission", "JVP Committee", "polity MCQ", "polity tricks", "General Awareness", "SSC CGL", "General_Awareness/Polity MCQ"],
      hashtags: ["Polity", "SSCCGL", "Citizenship", "IndianPolity"],
      thumbText: "TERRITORY + CITIZENSHIP",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🗺️ New polity class is live: India & Its Territory + Citizenship. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Polity — Full Classes for All Exams"
    },
    html: `
      <p class="cp-lead">A <u>complete fast-track on Articles 1–4, the making of Indian states, and Citizenship (Articles 5–11)</u> — a favourite polity block in every competitive exam.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>37</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>104</b><span>Questions</span></div>
        <div class="cp-stat"><b>~178 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Articles 1–4</b><br>Union of States, new states, reorganisation powers and the Bangladesh land deal.</li>
        <li><b>Evolution of States &amp; UTs</b><br>1950 four-fold classification, Dhar, JVP and the Fazl Ali Commission.</li>
        <li><b>States After 1956</b><br>Every state from Gujarat (1960) to Telangana (2014), plus J&amp;K and Ladakh.</li>
        <li><b>Citizenship — Articles 5–11</b><br>Single citizenship and the Citizenship Act, 1955.</li>
        <li><b>Acquisition &amp; Loss</b><br>Five ways to acquire, three ways to lose citizenship.</li>
        <li><b>NRI, PIO, OCI &amp; CAA 2019</b><br>Overseas Indians, CAA 2019 and the Assam Accord.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> number-of-state, Act-name and Article-number questions are asked directly in SSC, UPSC, Railways and State exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🇮🇳", accent: "#22c55e", pauseTimer: true,
    title: "Article 1 – Name and Territory of the Union",
    html: `
      <p class="cp-lead">Article 1 describes India, that is <b>Bharat</b>, as a <b>Union of States</b> — <u>not a Federation of States</u>.</p>
      <table><thead><tr><th>Territory of India (Art. 1)</th><th>What it covers</th></tr></thead><tbody><tr><td>Territories of the States</td><td>All the states</td></tr><tr><td>Union Territories</td><td>All the UTs</td></tr><tr><td>Territories that may be acquired</td><td>Acquired by the Government of India at any time</td></tr></tbody></table>
      <div class="cp-note remember">Dr. B. R. Ambedkar preferred “Union” because the Indian Federation is <b>not the result of an agreement</b> among states and states have <b>no right to secede</b> — the Union is <b>indestructible</b>.</div>
      <div class="cp-note exam">Names and territorial extent of the States and UTs are listed in the <b>First Schedule</b>.</div>
    `
  },
  3: {
    questext: "Article 1 of the Constitution describes India, that is Bharat, as a:",
    options: ["Federation of States", "Confederation of States", "Union of States", "Unitary State"],
    correct: "3",
    exptext: "✅ Union of States. 📌 Union = indestructible, no secession. ❌ \"Federation\" implies an agreement among states, which India lacks."
  },
  4: {
    questext: "Which of the following is NOT a reason given by Dr. B. R. Ambedkar for preferring 'Union of States'?",
    options: ["The Union can be dissolved by a majority of the states", "The Indian Federation is not the result of an agreement", "The states have no right to secede", "The Union is indestructible"],
    correct: "1",
    exptext: "✅ Dissolution by states is false. 📌 Union cannot be broken. ❌ Options 2, 3 and 4 are Ambedkar's actual points."
  },
  5: {
    questext: "The names and territorial extent of the States and Union Territories are given in which Schedule?",
    options: ["Second Schedule", "Fourth Schedule", "Seventh Schedule", "First Schedule"],
    correct: "4",
    exptext: "✅ First Schedule. 📌 First list = territories. ❌ Fourth Schedule allocates Rajya Sabha seats."
  },
  6: {
    questext: "Under Article 1, the territory of India includes: 1. Territories of the States 2. Union Territories 3. Territories that may be acquired by the Government of India.",
    options: ["1 and 2 only", "1, 2 and 3", "2 and 3 only", "1 and 3 only"],
    correct: "2",
    exptext: "✅ All three are included. 📌 States + UTs + acquired territory. ❌ Leaving out any one makes the option incomplete."
  },
  7: {
    type: "concept", icon: "🆕", accent: "#f59e0b", pauseTimer: true,
    title: "Article 2 – Admission / Establishment of New States",
    html: `
      <p class="cp-lead">Article 2 gives Parliament <b>two powers</b> over new states — those <u>not yet part</u> of the Union.</p>
      <table><thead><tr><th>Power</th><th>Meaning</th></tr></thead><tbody><tr><td>Admit</td><td>Bring a new state <b>into</b> the Union of India</td></tr><tr><td>Establish</td><td>Create a new state</td></tr></tbody></table>
      <table><thead><tr><th>Article</th><th>Relates to</th></tr></thead><tbody><tr><td>Article 2</td><td>New states <b>not yet part</b> of the Union (outside)</td></tr><tr><td>Article 3</td><td>Formation of / changes in <b>existing states</b> (internal)</td></tr></tbody></table>
      <div class="cp-note trap">Article 2 = <b>outside</b> territory coming in; Article 3 = <b>internal</b> rearrangement.</div>
      <div class="cp-note exam">Direct Article 2 vs Article 3 pairing questions are asked very often.</div>
    `
  },
  8: {
    questext: "Article 2 empowers Parliament to:",
    options: ["Alter the name of an existing state", "Diminish the area of a state", "Admit or establish new states not yet part of the Union", "Alter the boundaries of a state"],
    correct: "3",
    exptext: "✅ Admit or establish new states. 📌 Article 2 = outside. ❌ Name, area and boundary changes belong to Article 3."
  },
  9: {
    questext: "Which pairing is correct?",
    options: ["Article 2 — States not yet part of the Union", "Article 3 — Admission of a foreign territory as a state", "Article 2 — Change in name of a state", "Article 3 — Citizenship at commencement"],
    correct: "1",
    exptext: "✅ Article 2 deals with outside territory. 📌 Outside = 2, inside = 3. ❌ Article 3 covers existing states only."
  },
  10: {
    type: "concept", icon: "✂️", accent: "#ef4444", pauseTimer: true,
    title: "Article 3 – Reorganisation of Existing States",
    html: `
      <p class="cp-lead">Article 3 lets <b>Parliament</b> reshape <u>existing states</u> by ordinary law.</p>
      <table><thead><tr><th>No.</th><th>Power under Article 3</th></tr></thead><tbody><tr><td>1</td><td>Form a new state by separating territory or by uniting two or more states / parts of states</td></tr><tr><td>2</td><td>Increase the area of any state</td></tr><tr><td>3</td><td>Diminish the area of any state</td></tr><tr><td>4</td><td>Alter the boundaries of any state</td></tr><tr><td>5</td><td>Alter the name of any state</td></tr></tbody></table>
      <table><thead><tr><th>Condition for the Bill</th><th>Rule</th></tr></thead><tbody><tr><td>Introduction</td><td>Only with the <b>prior recommendation of the President</b></td></tr><tr><td>Reference</td><td>President refers the Bill to the <b>state legislature</b> for its views within a time limit</td></tr><tr><td>Views</td><td>President / Parliament is <b>not bound</b> — may accept or reject</td></tr></tbody></table>
      <div class="cp-note trap">The state legislature is only <b>consulted</b>; its views are never binding.</div>
      <div class="cp-note exam">"Prior recommendation of the President" is the favourite one-line answer.</div>
    `
  },
  11: {
    questext: "Which of the following is NOT a power of Parliament under Article 3?",
    options: ["Alter the name of a state", "Diminish the area of a state", "Form a new state by uniting two or more states", "Cede Indian territory to a foreign country by a simple law"],
    correct: "4",
    exptext: "✅ Ceding territory abroad needs a constitutional amendment (Berubari case). 📌 Article 3 = internal changes only. ❌ Others are listed powers."
  },
  12: {
    questext: "A Bill for the reorganisation of states under Article 3 can be introduced in Parliament only:",
    options: ["After the consent of the concerned state", "On the prior recommendation of the President", "By a two-thirds majority", "After Supreme Court approval"],
    correct: "2",
    exptext: "✅ Prior recommendation of the President. 📌 No state consent needed. ❌ Special majority is not required for Article 3 laws."
  },
  13: {
    questext: "When the President refers a reorganisation Bill to the state legislature, the Parliament is:",
    options: ["Bound to accept the views", "Bound to reject the views", "Not bound by the views of the state legislature", "Bound only if the views are unanimous"],
    correct: "3",
    exptext: "✅ Not bound. 📌 Consulted, not controlled. ❌ If views were binding, a state could veto its own division."
  },
  14: {
    type: "concept", icon: "⚖️", accent: "#8b5cf6", pauseTimer: true,
    title: "Article 4 – Such Laws are Not Constitutional Amendments",
    html: `
      <p class="cp-lead">Laws made under <b>Article 2</b> and <b>Article 3</b> are <u>not deemed amendments</u> of the Constitution under Article 368.</p>
      <table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td>Article 2</td><td>Admission / establishment of new states</td></tr><tr><td>Article 3</td><td>Formation / alteration of states</td></tr><tr><td>Article 4</td><td>Such laws are <b>not</b> Article 368 amendments</td></tr></tbody></table>
      <div class="cp-note tip">Such laws are passed by a <b>simple majority</b> through the <b>ordinary legislative process</b> — no special majority needed.</div>
      <div class="cp-note trap">Do not confuse with Article 368 — no ratification by half of the states here.</div>
    `
  },
  15: {
    questext: "A law reorganising a state under Article 3 is passed by:",
    options: ["Special majority with ratification by half the states", "Special majority under Article 368", "Simple majority through the ordinary legislative process", "Two-thirds of the state legislatures"],
    correct: "3",
    exptext: "✅ Simple majority, ordinary process. 📌 Article 4 removes Article 368 hurdles. ❌ Other options describe amendments."
  },
  16: {
    questext: "Article 4 declares that laws made under Articles 2 and 3:",
    options: ["Are not deemed to be amendments of the Constitution under Article 368", "Are amendments needing special majority", "Need ratification by the states", "Need a national referendum"],
    correct: "1",
    exptext: "✅ Not deemed Article 368 amendments. 📌 Article 4 = shield. ❌ No referendum exists in the Indian constitutional scheme."
  },
  17: {
    type: "concept", icon: "🤝", accent: "#14b8a6", pauseTimer: true,
    title: "Exchange of Territories with Bangladesh",
    html: `
      <p class="cp-lead">The <b>100th Constitutional Amendment Act, 2015</b> gave effect to the <u>land boundary agreement</u> between India and Bangladesh.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Law</td><td>100th Constitutional Amendment Act, 2015</td></tr><tr><td>India transferred</td><td><b>111</b> enclaves to Bangladesh</td></tr><tr><td>Bangladesh transferred</td><td><b>51</b> enclaves to India</td></tr></tbody></table>
      <div class="cp-note trap">India gave <b>more</b> (111) and received <b>fewer</b> (51) — do not swap the numbers.</div>
      <div class="cp-note exam">100th Amendment = land swap with Bangladesh.</div>
    `
  },
  18: {
    questext: "The 100th Constitutional Amendment Act, 2015 deals with:",
    options: ["GST", "National Judicial Appointments Commission", "Creation of Telangana", "Exchange of territories with Bangladesh"],
    correct: "4",
    exptext: "✅ It implemented the India–Bangladesh land boundary agreement. 📌 GST = 101st, NJAC = 99th. ❌ Telangana came by an ordinary Act."
  },
  19: {
    questext: "Under the 2015 land deal, India transferred ___ enclaves to Bangladesh and received ___ in return.",
    options: ["51; 111", "111; 51", "100; 61", "111; 111"],
    correct: "2",
    exptext: "✅ 111 given, 51 received. 📌 India gave more. ❌ Option 1 swaps the numbers."
  },
  20: {
    type: "concept", icon: "🧭", accent: "#ec4899", pauseTimer: true,
    title: "Evolution of States and Union Territories",
    html: `
      <p class="cp-lead">In <b>1950</b> the Constitution had a <b>four-fold classification</b> of states and territories — Parts A, B, C and D — <u>29 units</u> in all.</p>
      <table><thead><tr><th>Part</th><th>No.</th><th>Origin</th><th>Units</th></tr></thead><tbody><tr><td>A</td><td>9</td><td>Former Governor’s provinces of British India</td><td>Assam, Bihar, Bombay, Madhya Pradesh, Madras, Orissa, Punjab, United Provinces, West Bengal</td></tr><tr><td>B</td><td>9</td><td>Former princely states with legislatures</td><td>Hyderabad, J&amp;K, Madhya Bharat, Mysore, Patiala &amp; East Punjab, Rajasthan, Saurashtra, Travancore-Cochin, Vindhya Pradesh</td></tr><tr><td>C</td><td>10</td><td>Former Chief Commissioner’s provinces and some princely states</td><td>Ajmer, Bhopal, Bilaspur, Cooch-Behar, Coorg, Delhi, Himachal Pradesh, Kutch, Manipur, Tripura</td></tr><tr><td>D</td><td>1</td><td>Only the Andaman and Nicobar Islands</td><td>Andaman &amp; Nicobar Islands</td></tr></tbody></table>
      <div class="cp-note trap">Part D had <b>only one</b> territory — the Andaman and Nicobar Islands.</div>
      <div class="cp-note remember">9 + 9 + 10 + 1 = <b>29</b>.</div>
    `
  },
  21: {
    questext: "The total number of states and territories under the four-fold classification of 1950 was:",
    options: ["27", "28", "30", "29"],
    correct: "4",
    exptext: "✅ 9 + 9 + 10 + 1 = 29. 📌 A9 B9 C10 D1. ❌ 28 is today's number of states."
  },
  22: {
    questext: "Which was the only Part D territory in 1950?",
    options: ["Delhi", "Coorg", "Andaman and Nicobar Islands", "Manipur"],
    correct: "3",
    exptext: "✅ Andaman and Nicobar Islands. 📌 Part D = one unit. ❌ Delhi, Coorg and Manipur were Part C."
  },
  23: {
    questext: "Which of the following was NOT a Part B state in 1950?",
    options: ["Madras", "Mysore", "Hyderabad", "Saurashtra"],
    correct: "1",
    exptext: "✅ Madras was Part A. 📌 Part B = former princely states. ❌ The others were princely states."
  },
  24: {
    type: "concept", icon: "📜", accent: "#3b82f6", pauseTimer: true,
    title: "Dhar Commission and JVP Committee",
    html: `
      <p class="cp-lead">Two early bodies <u>rejected language</u> as the basis for reorganisation — until the Andhra agitation changed the mood.</p>
      <table><thead><tr><th>Body</th><th>Time</th><th>Members</th><th>Verdict</th></tr></thead><tbody><tr><td>Dhar Commission (Linguistic Provinces Commission)</td><td>Appointed June 1948, reported Dec 1948</td><td>S. K. Dhar</td><td>Reorganise on <b>administrative convenience, not language</b></td></tr><tr><td>JVP Committee</td><td>1948–49 (report April 1949)</td><td><b>J</b>awaharlal Nehru, <b>V</b>allabhbhai Patel, <b>P</b>attabhi Sitaramayya</td><td><b>Rejected</b> language as the basis</td></tr></tbody></table>
      <div class="cp-note tip">First linguistic state: <b>Andhra State</b>, Oct 1953 (Telugu areas separated from Madras), after the death of <b>Potti Sriramulu</b> following a long hunger strike.</div>
      <div class="cp-mnemonic">JVP = <b>J</b>awaharlal + <b>V</b>allabhbhai + <b>P</b>attabhi</div>
    `
  },
  25: {
    questext: "The Dhar Commission (1948) recommended reorganisation of states primarily on the basis of:",
    options: ["Language", "Administrative convenience", "Religion", "Population"],
    correct: "2",
    exptext: "✅ Administrative convenience, not language. 📌 Dhar said no to language. ❌ Language was accepted only later, partly."
  },
  26: {
    questext: "The JVP Committee consisted of:",
    options: ["Nehru, Patel and Pattabhi Sitaramayya", "Nehru, Patel and Ambedkar", "Fazl Ali, Panikkar and Kunzru", "Dhar, Nehru and Patel"],
    correct: "1",
    exptext: "✅ J = Jawaharlal, V = Vallabhbhai, P = Pattabhi. 📌 Initials spell JVP. ❌ Option 3 is the SRC."
  },
  27: {
    questext: "Which was the first state created on a linguistic basis after Independence?",
    options: ["Gujarat", "Kerala", "Maharashtra", "Andhra State"],
    correct: "4",
    exptext: "✅ Andhra State, October 1953, from Madras. 📌 Potti Sriramulu's death triggered it. ❌ Gujarat and Maharashtra came in 1960."
  },
  28: {
    questext: "Which is the correct chronological order?",
    options: ["JVP – Dhar – Andhra State – SRC report", "Dhar – JVP – SRC report – Andhra State", "Dhar – JVP – Andhra State – SRC report", "Dhar – Andhra State – JVP – SRC report"],
    correct: "3",
    exptext: "✅ Dhar 1948, JVP 1949, Andhra 1953, SRC report 1955. 📌 D-J-A-S. ❌ SRC was set up after Andhra State."
  },
  29: {
    type: "concept", icon: "🧑‍⚖️", accent: "#f97316", pauseTimer: true,
    title: "Fazl Ali Commission (SRC)",
    html: `
      <p class="cp-lead">The <b>States Reorganisation Commission</b> finally <u>accepted language — but with limits</u>.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Set up</td><td>December 1953</td></tr><tr><td>Chairman</td><td><b>Fazl Ali</b></td></tr><tr><td>Other members</td><td>K. M. Panikkar, H. N. Kunzru</td></tr><tr><td>Report</td><td>September 1955</td></tr><tr><td>Language</td><td>Accepted broadly, but <b>rejected</b> ‘one language – one state’</td></tr><tr><td>Primary consideration</td><td><b>Unity of India</b></td></tr><tr><td>Suggestion</td><td>Abolish four-fold classification; <b>16 states &amp; 3 centrally-administered territories</b></td></tr></tbody></table>
      <div class="cp-note trap">16 + 3 was the <b>suggestion</b>; the Act actually created 14 states + 6 UTs.</div>
    `
  },
  30: {
    questext: "The States Reorganisation Commission (1953) was headed by:",
    options: ["K. M. Panikkar", "H. N. Kunzru", "Fazl Ali", "S. K. Dhar"],
    correct: "3",
    exptext: "✅ Fazl Ali was chairman. 📌 Also called Fazl Ali Commission. ❌ Panikkar and Kunzru were members; Dhar led the 1948 body."
  },
  31: {
    questext: "Which of the following was NOT a member of the States Reorganisation Commission?",
    options: ["Pattabhi Sitaramayya", "Fazl Ali", "K. M. Panikkar", "H. N. Kunzru"],
    correct: "1",
    exptext: "✅ Pattabhi was in the JVP Committee. 📌 SRC = Fazl Ali, Panikkar, Kunzru. ❌ Other three were SRC members."
  },
  32: {
    questext: "The SRC's stand on language as the basis of reorganisation was:",
    options: ["Rejected language completely", "Accepted it broadly but rejected ‘one language – one state’", "Accepted ‘one language – one state’ fully", "Accepted language only for southern states"],
    correct: "2",
    exptext: "✅ Language accepted with limits. 📌 Unity of India came first. ❌ Complete rejection was the Dhar/JVP stand."
  },
  33: {
    questext: "The SRC suggested the abolition of the four-fold classification and the creation of:",
    options: ["14 states and 6 UTs", "15 states and 4 UTs", "18 states and 3 UTs", "16 states and 3 centrally-administered territories"],
    correct: "4",
    exptext: "✅ 16 states and 3 centrally-administered territories. 📌 14 + 6 came in the Act. ❌ Option 1 is the final outcome."
  },
  34: {
    type: "concept", icon: "🏛️", accent: "#84cc16", pauseTimer: true,
    title: "States Reorganisation Act, 1956",
    html: `
      <p class="cp-lead">The <b>States Reorganisation Act (1956)</b> and the <b>7th Amendment Act (1956)</b> redrew the map on <u>1 November 1956</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/India_and_Its_Territory_and_Citizenship/1.png" alt="Diagram: 29 units in 1950 to 14 states and 6 UTs in 1956" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Change</th><th>Result</th></tr></thead><tbody><tr><td>Part A and Part B</td><td>Distinction removed</td></tr><tr><td>Part C states</td><td>Abolished</td></tr><tr><td>Outcome</td><td><b>14 States and 6 Union Territories</b></td></tr><tr><td>Date</td><td>1 November 1956</td></tr></tbody></table>
      <table><thead><tr><th>14 States</th><th>6 Union Territories</th></tr></thead><tbody><tr><td>Andhra Pradesh, Assam, Bihar, Bombay, Jammu &amp; Kashmir, Kerala, Madhya Pradesh, Madras, Mysore, Orissa, Punjab, Rajasthan, Uttar Pradesh, West Bengal</td><td>Andaman &amp; Nicobar Islands, Delhi, Himachal Pradesh, Laccadive–Minicoy–Amindivi Islands, Manipur, Tripura</td></tr></tbody></table>
    `
  },
  35: {
    questext: "The States Reorganisation Act came into effect on:",
    options: ["1 November 1956", "26 January 1956", "15 August 1956", "1 April 1957"],
    correct: "1",
    exptext: "✅ 1 November 1956. 📌 Many states celebrate their foundation day on 1 Nov. ❌ 26 January is Republic Day, 1950."
  },
  36: {
    questext: "Consider: 1. The distinction between Part A and Part B states was removed. 2. Part C states were abolished. 3. Part D was converted into a state.",
    options: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: "2",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Part D territory became a UT. ❌ Statement 3 is false."
  },
  37: {
    questext: "After the reorganisation of 1956, India had:",
    options: ["16 states and 3 UTs", "15 states and 5 UTs", "14 states and 5 UTs", "14 states and 6 UTs"],
    correct: "4",
    exptext: "✅ 14 states and 6 Union Territories. 📌 14 + 6. ❌ 16 + 3 was only the SRC suggestion."
  },
  38: {
    questext: "Which of the following was a Union Territory on 1 November 1956?",
    options: ["Orissa", "Mysore", "Laccadive, Minicoy and Amindivi Islands", "Madras"],
    correct: "3",
    exptext: "✅ Laccadive–Minicoy–Amindivi Islands was a UT. 📌 Six UTs in 1956. ❌ Orissa, Mysore and Madras were states."
  },
  39: {
    type: "concept", icon: "🔗", accent: "#06b6d4", pauseTimer: true,
    title: "Key Mergers under the 1956 Act",
    html: `
      <p class="cp-lead">The Act <u>merged many old units</u> into bigger states.</p>
      <table><thead><tr><th>Unit</th><th>Merged into / formed from</th></tr></thead><tbody><tr><td>Kerala</td><td>Travancore–Cochin + Malabar (Madras) + Kasargode</td></tr><tr><td>Andhra Pradesh</td><td>Andhra + Telugu areas of Hyderabad</td></tr><tr><td>Madhya Pradesh</td><td>Madhya Bharat + Vindhya Pradesh + Bhopal</td></tr><tr><td>Saurashtra &amp; Kutch</td><td>Merged into Bombay</td></tr><tr><td>Coorg</td><td>Merged into Mysore</td></tr><tr><td>PEPSU</td><td>Merged into Punjab</td></tr><tr><td>Ajmer</td><td>Merged into Rajasthan</td></tr></tbody></table>
      <div class="cp-note trap">Ajmer went to <b>Rajasthan</b>, not Bombay.</div>
    `
  },
  40: {
    questext: "Kerala was formed in 1956 by merging:",
    options: ["Travancore–Cochin, Coorg and Kasargode", "Travancore–Cochin, Malabar (Madras) and Kasargode", "Cochin, Mysore and Malabar", "Travancore, Hyderabad and Kasargode"],
    correct: "2",
    exptext: "✅ Travancore–Cochin + Malabar + Kasargode. 📌 Malabar came from Madras. ❌ Coorg went to Mysore."
  },
  41: {
    questext: "Which of the following is NOT correctly matched?",
    options: ["Coorg – Mysore", "PEPSU – Punjab", "Ajmer – Bombay", "Saurashtra and Kutch – Bombay"],
    correct: "3",
    exptext: "✅ Ajmer merged with Rajasthan. 📌 A for Ajmer, A for Aravalli land (Rajasthan). ❌ Other pairs are correct."
  },
  42: {
    questext: "Madhya Pradesh in 1956 was formed by merging:",
    options: ["Madhya Bharat, Vindhya Pradesh and Bhopal", "Madhya Bharat, Saurashtra and Bhopal", "Vindhya Pradesh, Kutch and Bhopal", "Madhya Bharat, Ajmer and Vindhya Pradesh"],
    correct: "1",
    exptext: "✅ Madhya Bharat + Vindhya Pradesh + Bhopal. 📌 All three had \"central\" roots. ❌ Saurashtra and Kutch went to Bombay."
  },
  43: {
    type: "concept", icon: "🌊", accent: "#a855f7", pauseTimer: true,
    title: "Maharashtra & Gujarat (1960)",
    html: `
      <p class="cp-lead">Bilingual <b>Bombay</b> state was split on language in <u>1960</u>.</p>
      <table><thead><tr><th>New state</th><th>Language</th><th>Note</th></tr></thead><tbody><tr><td>Maharashtra</td><td>Marathi</td><td>Successor of Bombay state</td></tr><tr><td>Gujarat</td><td>Gujarati</td><td>Became the <b>15th state</b></td></tr></tbody></table>
      <div class="cp-note exam">Gujarat = <b>15th</b> state, 1960.</div>
    `
  },
  44: {
    questext: "Gujarat became which numbered state of India in 1960?",
    options: ["14th", "15th", "16th", "17th"],
    correct: "2",
    exptext: "✅ 15th state. 📌 15 for 1960. ❌ Nagaland is 16th."
  },
  45: {
    questext: "In 1960 the bilingual state of Bombay was divided into:",
    options: ["Maharashtra and Karnataka", "Maharashtra and Goa", "Maharashtra and Gujarat", "Gujarat and Goa"],
    correct: "3",
    exptext: "✅ Maharashtra (Marathi) and Gujarat (Gujarati). 📌 Language-based split. ❌ Goa was Portuguese until 1961."
  },
  46: {
    type: "concept", icon: "🏞️", accent: "#e11d48", pauseTimer: true,
    title: "Dadra & Nagar Haveli (1961)",
    html: `
      <p class="cp-lead">Under <b>Portuguese rule till 1954</b>; made a <u>Union Territory</u> by the <b>10th Amendment Act, 1961</b>.</p>
      <div class="cp-note tip">In 2020, Dadra &amp; Nagar Haveli and Daman &amp; Diu were merged into a single UT.</div>
    `
  },
  47: {
    questext: "Dadra and Nagar Haveli became a Union Territory through which Amendment Act?",
    options: ["7th Amendment", "12th Amendment", "10th Amendment", "14th Amendment"],
    correct: "3",
    exptext: "✅ 10th Amendment, 1961. 📌 10 for 1961 Dadra. ❌ 12th is Goa, Daman & Diu; 14th is Puducherry."
  },
  48: {
    questext: "Dadra and Nagar Haveli was under which colonial power until 1954?",
    options: ["Portuguese", "French", "British", "Dutch"],
    correct: "1",
    exptext: "✅ Portuguese. 📌 Goa, Daman, Diu and Dadra were Portuguese. ❌ French held Puducherry."
  },
  49: {
    type: "concept", icon: "🏖️", accent: "#10b981", pauseTimer: true,
    title: "Goa, Daman & Diu (1962) and Puducherry (1962)",
    html: `
      <p class="cp-lead">Two colonial pockets joined India as <b>Union Territories</b> in 1962.</p>
      <table><thead><tr><th>Territory</th><th>From</th><th>Became UT by</th></tr></thead><tbody><tr><td>Goa, Daman &amp; Diu</td><td>Portugal (1961 police action)</td><td><b>12th Amendment, 1962</b></td></tr><tr><td>Puducherry</td><td>France (handed over 1954)</td><td><b>14th Amendment, 1962</b></td></tr><tr><td>Goa statehood</td><td>1987</td><td><b>25th</b> state</td></tr></tbody></table>
      <div class="cp-note trap">Goa became a UT in 1962 but a full <b>state only in 1987</b>.</div>
    `
  },
  50: {
    questext: "Puducherry became a Union Territory through which Amendment Act?",
    options: ["12th", "14th", "10th", "13th"],
    correct: "2",
    exptext: "✅ 14th Amendment, 1962. 📌 French → 14. ❌ 12th Amendment relates to Goa, Daman and Diu."
  },
  51: {
    questext: "Goa, Daman and Diu was made a Union Territory by which Amendment?",
    options: ["7th", "10th", "12th", "14th"],
    correct: "3",
    exptext: "✅ 12th Amendment, 1962. 📌 Portuguese → 12. ❌ 10th Amendment was for Dadra and Nagar Haveli."
  },
  52: {
    questext: "Goa got statehood in 1987 as the:",
    options: ["25th state", "24th state", "26th state", "23rd state"],
    correct: "1",
    exptext: "✅ 25th state. 📌 Mizoram 23, Arunachal 24, Goa 25. ❌ 26th is Chhattisgarh."
  },
  53: {
    type: "concept", icon: "⛰️", accent: "#eab308", pauseTimer: true,
    title: "Nagaland (1963)",
    html: `
      <p class="cp-lead">Formed from <b>Naga Hills &amp; Tuensang</b>, carved out of Assam.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Number</td><td><b>16th</b> state</td></tr><tr><td>Law</td><td>State of Nagaland Act, 1962</td></tr><tr><td>Carved from</td><td>Assam</td></tr></tbody></table>
    `
  },
  54: {
    questext: "Nagaland became which numbered state of India?",
    options: ["17th", "15th", "16th", "18th"],
    correct: "3",
    exptext: "✅ 16th state, 1963. 📌 After Gujarat (15th). ❌ Haryana is 17th."
  },
  55: {
    questext: "Nagaland was carved out of which state?",
    options: ["Manipur", "West Bengal", "Tripura", "Assam"],
    correct: "4",
    exptext: "✅ Assam (Naga Hills and Tuensang). 📌 Many NE states came from Assam. ❌ The others did not give territory."
  },
  56: {
    type: "concept", icon: "🌾", accent: "#0ea5e9", pauseTimer: true,
    title: "Haryana, Chandigarh & Himachal Pradesh",
    html: `
      <p class="cp-lead">Punjab was divided in <b>1966</b>; Himachal followed in <b>1971</b>.</p>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1966</td><td>Punjab Reorganisation Act: <b>Haryana = 17th state</b>; <b>Chandigarh = UT</b> (after Shah Commission)</td></tr><tr><td>1971</td><td>Himachal Pradesh elevated from UT to <b>18th state</b> (State of HP Act, 1970)</td></tr></tbody></table>
      <div class="cp-note trap">Chandigarh is a UT, not a state.</div>
    `
  },
  57: {
    questext: "Which commission's report led to the creation of Haryana and the UT of Chandigarh in 1966?",
    options: ["Dhar Commission", "Shah Commission", "Fazl Ali Commission", "JVP Committee"],
    correct: "2",
    exptext: "✅ Shah Commission. 📌 Shah → Haryana. ❌ Fazl Ali was for 1956."
  },
  58: {
    questext: "Himachal Pradesh became a full state under which Act?",
    options: ["Punjab Reorganisation Act, 1966", "North-Eastern Areas Act, 1971", "States Reorganisation Act, 1956", "State of Himachal Pradesh Act, 1970"],
    correct: "4",
    exptext: "✅ State of Himachal Pradesh Act, 1970, effective 1971. 📌 Act 1970, statehood 1971. ❌ Others are unrelated."
  },
  59: {
    questext: "Which pair is correctly matched?",
    options: ["Himachal Pradesh — 18th state in 1971", "Haryana — 16th state", "Chandigarh — a full state", "Haryana — formed in 1971"],
    correct: "1",
    exptext: "✅ Himachal Pradesh 18th, 1971. 📌 HP 18 and 1971. ❌ Haryana is 17th, 1966."
  },
  60: {
    type: "concept", icon: "🌄", accent: "#d946ef", pauseTimer: true,
    title: "North-East Reorganisation (1972)",
    html: `
      <p class="cp-lead">The <b>North-Eastern Areas (Reorganisation) Act, 1971</b> reshaped the North-East in <u>1972</u>.</p>
      <table><thead><tr><th>Territory</th><th>Outcome</th></tr></thead><tbody><tr><td>Manipur</td><td><b>19th</b> state</td></tr><tr><td>Tripura</td><td><b>20th</b> state</td></tr><tr><td>Meghalaya</td><td><b>21st</b> state</td></tr><tr><td>Mizoram and Arunachal Pradesh (NEFA)</td><td>Became Union Territories</td></tr></tbody></table>
      <div class="cp-note trap">Mizoram and Arunachal got statehood only in <b>1987</b>.</div>
    `
  },
  61: {
    questext: "The North-Eastern Areas (Reorganisation) Act, 1971 created which states?",
    options: ["Manipur, Tripura and Meghalaya", "Manipur, Mizoram and Meghalaya", "Tripura, Nagaland and Meghalaya", "Arunachal Pradesh, Manipur and Tripura"],
    correct: "1",
    exptext: "✅ Manipur, Tripura, Meghalaya. 📌 19, 20, 21. ❌ Mizoram and Arunachal became UTs."
  },
  62: {
    questext: "Which of the following was NOT granted statehood in 1972?",
    options: ["Manipur", "Tripura", "Meghalaya", "Mizoram"],
    correct: "4",
    exptext: "✅ Mizoram became a UT in 1972. 📌 Statehood came in 1987. ❌ Others became states in 1972."
  },
  63: {
    type: "concept", icon: "🏔️", accent: "#64748b", pauseTimer: true,
    title: "Sikkim (1975) – 22nd State",
    html: `
      <p class="cp-lead">A princely state that became a <b>full state</b> through two amendments.</p>
      <table><thead><tr><th>Year</th><th>Step</th></tr></thead><tbody><tr><td>1947</td><td>Princely state ruled by the <b>Chogyal</b> became a <b>protectorate</b> of India</td></tr><tr><td>1974</td><td><b>35th Amendment</b>: ‘associate state’ (Art. 2-A and 10th Schedule added)</td></tr><tr><td>1975</td><td>After referendum, <b>36th Amendment</b>: <b>22nd full state</b> (Art. 371-F added; Art. 2-A and 10th Schedule repealed)</td></tr></tbody></table>
      <div class="cp-note trap">35th = <b>associate</b>; 36th = <b>full state</b>.</div>
    `
  },
  64: {
    questext: "Sikkim became an ‘associate state’ of India through which Amendment?",
    options: ["34th", "36th", "35th", "38th"],
    correct: "3",
    exptext: "✅ 35th Amendment, 1974. 📌 35 = associate, 36 = full. ❌ 36th made it a full state."
  },
  65: {
    questext: "Special provisions for Sikkim after statehood are in which Article?",
    options: ["Article 371-A", "Article 371-E", "Article 371-G", "Article 371-F"],
    correct: "4",
    exptext: "✅ Article 371-F. 📌 F for Full state of Sikkim. ❌ 371-A is Nagaland; 371-G is Mizoram."
  },
  66: {
    questext: "Which Amendment made Sikkim the 22nd state of India?",
    options: ["35th", "36th", "37th", "38th"],
    correct: "2",
    exptext: "✅ 36th Amendment, 1975. 📌 After the 1975 referendum. ❌ 35th gave only associate status."
  },
  67: {
    questext: "Which provisions were repealed by the 36th Amendment?",
    options: ["Article 2-A and the Tenth Schedule", "Article 371-F and the Eighth Schedule", "Article 3 and the Fourth Schedule", "Article 368 and the Ninth Schedule"],
    correct: "1",
    exptext: "✅ Article 2-A and Tenth Schedule. 📌 Associate-state tools removed. ❌ Article 371-F was added, not repealed."
  },
  68: {
    type: "concept", icon: "🌿", accent: "#fb7185", pauseTimer: true,
    title: "Mizoram, Arunachal Pradesh & Goa (1987)",
    html: `
      <p class="cp-lead">Three more states in <b>1987</b>.</p>
      <table><thead><tr><th>State</th><th>No.</th><th>Note</th></tr></thead><tbody><tr><td>Mizoram</td><td><b>23rd</b></td><td>Statehood followed the <b>Mizoram Peace Accord, 1986</b></td></tr><tr><td>Arunachal Pradesh</td><td><b>24th</b></td><td>Former NEFA</td></tr><tr><td>Goa</td><td><b>25th</b></td><td>Earlier UT with Daman &amp; Diu</td></tr></tbody></table>
      <div class="cp-note tip">Order: <b>Mizoram → Arunachal → Goa</b> = 23, 24, 25.</div>
    `
  },
  69: {
    questext: "Mizoram's statehood followed which agreement?",
    options: ["Rajiv–Longowal Accord", "Assam Accord", "Shillong Accord", "Mizoram Peace Accord, 1986"],
    correct: "4",
    exptext: "✅ Mizoram Peace Accord, 1986. 📌 Peace first, statehood next. ❌ Assam Accord concerns Assam."
  },
  70: {
    questext: "Arunachal Pradesh became which numbered state?",
    options: ["24th", "23rd", "25th", "22nd"],
    correct: "1",
    exptext: "✅ 24th state. 📌 Between Mizoram (23) and Goa (25). ❌ Sikkim is 22nd."
  },
  71: {
    questext: "The correct order of becoming states by state number is:",
    options: ["Goa → Mizoram → Arunachal Pradesh", "Mizoram → Arunachal Pradesh → Goa", "Arunachal Pradesh → Mizoram → Goa", "Goa → Arunachal Pradesh → Mizoram"],
    correct: "2",
    exptext: "✅ Mizoram 23, Arunachal 24, Goa 25. 📌 M-A-G. ❌ Goa is the last of the three."
  },
  72: {
    type: "concept", icon: "🌳", accent: "#2dd4bf", pauseTimer: true,
    title: "Chhattisgarh, Uttarakhand & Jharkhand (2000)",
    html: `
      <p class="cp-lead">Carved from <b>MP, UP and Bihar</b> — the <b>26th, 27th and 28th</b> states.</p>
      <table><thead><tr><th>State</th><th>No.</th><th>Carved from</th></tr></thead><tbody><tr><td>Chhattisgarh</td><td>26th</td><td>Madhya Pradesh</td></tr><tr><td>Uttarakhand</td><td>27th</td><td>Uttar Pradesh</td></tr><tr><td>Jharkhand</td><td>28th</td><td>Bihar</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>C-U-J</b> = 26-27-28 → MP, UP, Bihar</div>
    `
  },
  73: {
    questext: "Jharkhand was carved out of which state in 2000?",
    options: ["Madhya Pradesh", "Uttar Pradesh", "Bihar", "Odisha"],
    correct: "3",
    exptext: "✅ Bihar. 📌 Jharkhand = Bihar. ❌ MP gave Chhattisgarh; UP gave Uttarakhand."
  },
  74: {
    questext: "Which numbering is correct?",
    options: ["Uttarakhand — 26th", "Chhattisgarh — 26th", "Jharkhand — 27th", "Chhattisgarh — 28th"],
    correct: "2",
    exptext: "✅ Chhattisgarh 26th, Uttarakhand 27th, Jharkhand 28th. 📌 C-U-J. ❌ Others mix the order."
  },
  75: {
    type: "concept", icon: "🌆", accent: "#c026d3", pauseTimer: true,
    title: "Telangana (2014) – 29th State",
    html: `
      <p class="cp-lead">The <b>Andhra Pradesh Reorganisation Act, 2014</b> bifurcated AP into <b>Andhra Pradesh</b> and <b>Telangana</b>.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Number</td><td><b>29th state</b></td></tr><tr><td>Law</td><td>Andhra Pradesh Reorganisation Act, 2014</td></tr><tr><td>Parent</td><td>Andhra Pradesh</td></tr></tbody></table>
    `
  },
  76: {
    questext: "Which was the 29th state formed in India?",
    options: ["Telangana", "Jharkhand", "Uttarakhand", "Chhattisgarh"],
    correct: "1",
    exptext: "✅ Telangana, 2014. 📌 Last state created so far. ❌ Jharkhand is 28th."
  },
  77: {
    questext: "Telangana was formed under which Act?",
    options: ["Andhra State Act, 1953", "Andhra Pradesh Reorganisation Act, 2014", "States Reorganisation Act, 1956", "Bombay Reorganisation Act, 1960"],
    correct: "2",
    exptext: "✅ AP Reorganisation Act, 2014. 📌 Article 3 law. ❌ Other Acts relate to earlier reorganisations."
  },
  78: {
    type: "concept", icon: "🧊", accent: "#16a34a", pauseTimer: true,
    title: "Jammu & Kashmir and Ladakh (2019)",
    html: `
      <p class="cp-lead">The <b>J&amp;K Reorganisation Act, 2019</b> split the former state into <b>two Union Territories</b>.</p>
      <table><thead><tr><th>Detail</th><th>Fact</th></tr></thead><tbody><tr><td>Law</td><td>J&amp;K Reorganisation Act, 2019</td></tr><tr><td>Result</td><td>Two UTs: <b>Jammu &amp; Kashmir</b> and <b>Ladakh</b></td></tr><tr><td>Present count</td><td><b>28 states and 8 UTs</b></td></tr></tbody></table>
      <div class="cp-note trap">Telangana is the 29th state created, but India has <b>28 states</b> today because J&amp;K became a UT.</div>
    `
  },
  79: {
    questext: "The J&K Reorganisation Act, 2019 divided the former state into:",
    options: ["Two states", "A state and a UT", "Two Union Territories", "Three Union Territories"],
    correct: "3",
    exptext: "✅ Jammu & Kashmir and Ladakh, both UTs. 📌 State → two UTs. ❌ No new state was created."
  },
  80: {
    questext: "After the 2019 reorganisation, India has:",
    options: ["29 states and 7 UTs", "29 states and 9 UTs", "28 states and 9 UTs", "28 states and 8 UTs"],
    correct: "4",
    exptext: "✅ 28 states and 8 UTs. 📌 J&K left the state list. ❌ 29 counts J&K as a state."
  },
  81: {
    questext: "Telangana is the 29th state created, yet India has 28 states because:",
    options: ["Goa became a UT", "J&K was converted into a UT in 2019", "Two states merged in 2020", "Sikkim lost statehood"],
    correct: "2",
    exptext: "✅ J&K became a UT in 2019. 📌 29 − 1 = 28. ❌ No state merger or loss happened otherwise."
  },
  82: {
    type: "concept", icon: "✏️", accent: "#d97706", pauseTimer: true,
    title: "Name-Change Acts",
    html: `
      <p class="cp-lead">Three states and UTs <u>changed their spelling or name</u> in the 2000s.</p>
      <table><thead><tr><th>Old name</th><th>New name</th><th>Year</th></tr></thead><tbody><tr><td>Uttaranchal</td><td><b>Uttarakhand</b></td><td>2006</td></tr><tr><td>Pondicherry</td><td><b>Puducherry</b></td><td>2006</td></tr><tr><td>Orissa</td><td><b>Odisha</b></td><td>2011</td></tr></tbody></table>
    `
  },
  83: {
    questext: "Orissa was officially renamed Odisha in:",
    options: ["2006", "2009", "2011", "2014"],
    correct: "3",
    exptext: "✅ 2011. 📌 Orissa → Odisha, 2011. ❌ 2006 relates to Uttaranchal and Pondicherry."
  },
  84: {
    questext: "Which pair is correctly matched?",
    options: ["Orissa → Odisha — 2006", "Uttaranchal → Uttarakhand — 2011", "Pondicherry → Puducherry — 2011", "Pondicherry → Puducherry — 2006"],
    correct: "4",
    exptext: "✅ Puducherry, 2006. 📌 Two names in 2006, one in 2011. ❌ Odisha is 2011; Uttarakhand is 2006."
  },
  85: {
    type: "concept", icon: "⏳", accent: "#dc2626", pauseTimer: true,
    title: "States Formed After 1956 (Revision Timeline)",
    html: `
      <p class="cp-lead">One table to <u>revise every state</u> formed after 1956.</p>
      <table><thead><tr><th>State</th><th>Year</th><th>No.</th><th>Created from / Act</th></tr></thead><tbody><tr><td>Gujarat</td><td>1960</td><td>15th</td><td>Split of bilingual Bombay</td></tr><tr><td>Nagaland</td><td>1963</td><td>16th</td><td>From Assam (Nagaland Act 1962)</td></tr><tr><td>Haryana</td><td>1966</td><td>17th</td><td>Punjab Reorganisation Act 1966</td></tr><tr><td>Himachal Pradesh</td><td>1971</td><td>18th</td><td>UT elevated (HP Act 1970)</td></tr><tr><td>Manipur</td><td>1972</td><td>19th</td><td>NE Areas (Reorg.) Act 1971</td></tr><tr><td>Tripura</td><td>1972</td><td>20th</td><td>NE Areas (Reorg.) Act 1971</td></tr><tr><td>Meghalaya</td><td>1972</td><td>21st</td><td>NE Areas (Reorg.) Act 1971</td></tr><tr><td>Sikkim</td><td>1975</td><td>22nd</td><td>36th Amendment Act 1975</td></tr><tr><td>Mizoram</td><td>1987</td><td>23rd</td><td>State of Mizoram Act 1986</td></tr><tr><td>Arunachal Pradesh</td><td>1987</td><td>24th</td><td>State of Arunachal Act 1986</td></tr><tr><td>Goa</td><td>1987</td><td>25th</td><td>Goa, Daman &amp; Diu Reorg. Act 1987</td></tr><tr><td>Chhattisgarh</td><td>2000</td><td>26th</td><td>From Madhya Pradesh</td></tr><tr><td>Uttarakhand</td><td>2000</td><td>27th</td><td>From Uttar Pradesh</td></tr><tr><td>Jharkhand</td><td>2000</td><td>28th</td><td>From Bihar</td></tr><tr><td>Telangana</td><td>2014</td><td>29th</td><td>AP Reorganisation Act 2014</td></tr></tbody></table>
      <div class="cp-note exam">Learn it as <b>15 → 29</b>, one state per number.</div>
    `
  },
  86: {
    questext: "Which is the correct chronological order of formation?",
    options: ["Haryana → Nagaland → Himachal Pradesh → Sikkim", "Nagaland → Haryana → Sikkim → Himachal Pradesh", "Nagaland → Haryana → Himachal Pradesh → Sikkim", "Sikkim → Himachal Pradesh → Haryana → Nagaland"],
    correct: "3",
    exptext: "✅ Nagaland 1963, Haryana 1966, HP 1971, Sikkim 1975. 📌 16, 17, 18, 22. ❌ Others break the order."
  },
  87: {
    questext: "Which pair is correctly matched?",
    options: ["Tripura — 20th", "Meghalaya — 19th", "Manipur — 21st", "Sikkim — 23rd"],
    correct: "1",
    exptext: "✅ Tripura 20th. 📌 Manipur 19, Tripura 20, Meghalaya 21. ❌ Sikkim is 22nd."
  },
  88: {
    questext: "Which three states got statehood in 1987?",
    options: ["Mizoram, Sikkim and Goa", "Arunachal Pradesh, Goa and Nagaland", "Goa, Sikkim and Mizoram", "Mizoram, Arunachal Pradesh and Goa"],
    correct: "4",
    exptext: "✅ Mizoram, Arunachal Pradesh and Goa. 📌 23, 24, 25. ❌ Sikkim joined in 1975; Nagaland in 1963."
  },
  89: {
    type: "concept", icon: "🛂", accent: "#7c3aed", pauseTimer: true,
    title: "Citizenship — An Overview (Articles 5–11)",
    html: `
      <p class="cp-lead">India follows <b>single citizenship</b>, taken from the <b>British</b> system; the USA follows <b>dual citizenship</b>. It is governed by <u>Articles 5–11</u> and the <b>Citizenship Act, 1955</b>.</p>
      <table><thead><tr><th>Art.</th><th>Subject matter</th></tr></thead><tbody><tr><td>5</td><td>Citizenship at the commencement of the Constitution</td></tr><tr><td>6</td><td>Rights of persons who <b>migrated to India from Pakistan</b></td></tr><tr><td>7</td><td>Rights of certain migrants <b>to Pakistan</b></td></tr><tr><td>8</td><td>Rights of persons of Indian origin residing <b>outside India</b></td></tr><tr><td>9</td><td>Persons <b>voluntarily acquiring foreign citizenship</b> are not citizens</td></tr><tr><td>10</td><td>Continuance of the rights of citizenship</td></tr><tr><td>11</td><td><b>Parliament can regulate</b> citizenship by law</td></tr></tbody></table>
      <div class="cp-note trap">Article 6 = <b>to India</b>; Article 7 = <b>to Pakistan</b>.</div>
    `
  },
  90: {
    questext: "India's concept of single citizenship has been borrowed from:",
    options: ["USA", "France", "Britain", "Canada"],
    correct: "3",
    exptext: "✅ Britain. 📌 UK = single, USA = dual. ❌ The USA has dual citizenship."
  },
  91: {
    questext: "Citizenship rights of persons who migrated to India from Pakistan are dealt with under:",
    options: ["Article 5", "Article 6", "Article 7", "Article 8"],
    correct: "2",
    exptext: "✅ Article 6. 📌 6 = into India, 7 = out to Pakistan. ❌ Article 7 covers migrants to Pakistan."
  },
  92: {
    questext: "Which Article empowers Parliament to regulate the right of citizenship by law?",
    options: ["Article 8", "Article 9", "Article 10", "Article 11"],
    correct: "4",
    exptext: "✅ Article 11. 📌 11 = Parliament's power. ❌ Article 10 only continues rights."
  },
  93: {
    questext: "Which of the following is NOT correctly matched?",
    options: ["Article 7 — Persons who migrated from Pakistan to India", "Article 5 — Citizenship at commencement", "Article 8 — Persons of Indian origin outside India", "Article 9 — Voluntary acquisition of foreign citizenship"],
    correct: "1",
    exptext: "✅ Article 7 covers migrants to Pakistan. 📌 Article 6 is Pakistan to India. ❌ Other pairs are correct."
  },
  94: {
    type: "concept", icon: "📘", accent: "#0d9488", pauseTimer: true,
    title: "Citizenship Act, 1955",
    html: `
      <p class="cp-lead">Enacted by <b>Parliament</b> to govern citizenship and <u>amended from time to time</u>.</p>
      <table><thead><tr><th>Acquisition (5 ways)</th><th>Loss (3 ways)</th></tr></thead><tbody><tr><td>Birth</td><td>Renunciation</td></tr><tr><td>Descent</td><td>Termination</td></tr><tr><td>Registration</td><td>Deprivation</td></tr><tr><td>Naturalisation</td><td>—</td></tr><tr><td>Incorporation of territory</td><td>—</td></tr></tbody></table>
      <div class="cp-note tip">Key amendments: <b>1986, 1992, 2003, 2005, 2015, 2019</b>.</div>
    `
  },
  95: {
    questext: "The Citizenship Act, 1955 prescribes how many ways of acquiring citizenship?",
    options: ["3", "4", "5", "6"],
    correct: "3",
    exptext: "✅ Five: birth, descent, registration, naturalisation, incorporation of territory. 📌 5 in, 3 out. ❌ Three is the number of ways of loss."
  },
  96: {
    questext: "Which of the following is NOT a way of acquiring citizenship under the Act?",
    options: ["Nomination", "Descent", "Naturalisation", "Registration"],
    correct: "1",
    exptext: "✅ Nomination does not exist. 📌 B-D-R-N-I. ❌ Others are valid ways."
  },
  97: {
    questext: "Which of the following is NOT a way of losing citizenship under the Act?",
    options: ["Renunciation", "Termination", "Deprivation", "Registration"],
    correct: "4",
    exptext: "✅ Registration is a way of acquiring. 📌 Loss = R-T-D. ❌ Others are modes of loss."
  },
  98: {
    type: "concept", icon: "👶", accent: "#db2777", pauseTimer: true,
    title: "Acquisition 1: By Birth",
    html: `
      <p class="cp-lead">Rule depends on <u>when</u> the child was born.</p>
      <table><thead><tr><th>Period</th><th>Rule</th></tr></thead><tbody><tr><td>26 Jan 1950 – before 1 Jul 1987</td><td>Citizen by birth <b>irrespective of parents’ nationality</b></td></tr><tr><td>On/after 1 Jul 1987</td><td>Citizen only if <b>either parent</b> is an Indian citizen at birth</td></tr><tr><td>On/after 3 Dec 2004</td><td>Only if <b>both parents</b> are Indian, <b>or</b> one is Indian and the other is <b>not an illegal migrant</b></td></tr></tbody></table>
      <div class="cp-note trap">Children of <b>foreign diplomats</b> and <b>enemy aliens</b> cannot acquire citizenship by birth.</div>
    `
  },
  99: {
    questext: "A child born in India on 5 March 1985 to foreign parents is:",
    options: ["Not a citizen", "A citizen by birth irrespective of parents' nationality", "A citizen only after registration", "A citizen only if a parent lived 5 years"],
    correct: "2",
    exptext: "✅ 1950 to 1987 births are citizens regardless of parents. 📌 Before 1 July 1987. ❌ Later rules do not apply."
  },
  100: {
    questext: "For a child born in India on 1 August 1995, citizenship by birth requires:",
    options: ["Both parents Indian", "Father Indian only", "Either parent an Indian citizen at birth", "No condition"],
    correct: "3",
    exptext: "✅ Either parent Indian (rule from 1 July 1987). 📌 1987 to 2004 = either parent. ❌ Both parents is the post-2004 rule."
  },
  101: {
    questext: "For a child born on or after 3 December 2004, citizenship by birth requires:",
    options: ["Either parent Indian", "Father Indian only", "Birth in India with no other condition", "Both parents Indian, or one Indian and the other not an illegal migrant"],
    correct: "4",
    exptext: "✅ Both Indian, or one Indian and the other not an illegal migrant. 📌 2003 amendment effect. ❌ Others are earlier rules."
  },
  102: {
    questext: "Who cannot acquire Indian citizenship by birth even if born in India?",
    options: ["Children of foreign diplomats and enemy aliens", "Children of NRIs", "Children of refugees", "Children of OCI holders"],
    correct: "1",
    exptext: "✅ Diplomats' and enemy aliens' children. 📌 Exception to birth rule. ❌ Others are not barred by this exception."
  },
  103: {
    type: "concept", icon: "🧬", accent: "#2563eb", pauseTimer: true,
    title: "Acquisition 2: By Descent (born outside India)",
    html: `
      <p class="cp-lead">Citizenship passes to children <u>born abroad</u> from Indian parents.</p>
      <table><thead><tr><th>Period</th><th>Rule</th></tr></thead><tbody><tr><td>26 Jan 1950 – before 10 Dec 1992</td><td>Citizen if the <b>father</b> was an Indian citizen at birth</td></tr><tr><td>On/after 10 Dec 1992</td><td>Citizen if <b>either parent</b> was an Indian citizen at birth</td></tr></tbody></table>
      <div class="cp-note trap">Before 1992 only the <b>father</b> counted.</div>
    `
  },
  104: {
    questext: "A child born outside India on 1 January 1980 is a citizen by descent if:",
    options: ["The father was an Indian citizen at birth", "Only the mother was an Indian citizen", "Either grandparent was Indian", "Both parents lived in India"],
    correct: "1",
    exptext: "✅ Father was Indian citizen. 📌 Before 1992 = father. ❌ Mother alone did not count then."
  },
  105: {
    questext: "From 10 December 1992, a child born abroad is a citizen by descent if:",
    options: ["Only the father is Indian", "Only the mother is Indian", "Both parents are Indian", "Either parent is an Indian citizen"],
    correct: "4",
    exptext: "✅ Either parent. 📌 1992 widened the rule. ❌ Option 1 is the old rule."
  },
  106: {
    type: "concept", icon: "📝", accent: "#ea580c", pauseTimer: true,
    title: "Acquisition 3: By Registration",
    html: `
      <p class="cp-lead">The <b>Central Government</b> may register a person (<i>not an illegal migrant</i>) who falls in these categories.</p>
      <table><thead><tr><th>Category</th><th>Condition</th></tr></thead><tbody><tr><td>Person of Indian Origin</td><td>Ordinarily resident in India for <b>7 years</b> before applying</td></tr><tr><td>Married to an Indian citizen</td><td>Ordinarily resident in India for <b>7 years</b> before applying</td></tr></tbody></table>
      <div class="cp-note exam">Registration = <b>7 years</b>; naturalisation = <b>11 years</b>.</div>
    `
  },
  107: {
    questext: "For registration, a person of Indian origin must be ordinarily resident in India for:",
    options: ["12 months", "5 years", "11 years", "7 years"],
    correct: "4",
    exptext: "✅ 7 years. 📌 Registration 7, naturalisation 11. ❌ 11 years is for naturalisation."
  },
  108: {
    questext: "A person of Indian origin ordinarily resident in India for 7 years can acquire citizenship by:",
    options: ["Birth", "Descent", "Registration", "Naturalisation"],
    correct: "3",
    exptext: "✅ Registration. 📌 Indian origin or married = registration. ❌ Naturalisation is for foreigners with 11 years."
  },
  109: {
    type: "concept", icon: "🎓", accent: "#65a30d", pauseTimer: true,
    title: "Acquisition 4: By Naturalisation",
    html: `
      <p class="cp-lead">The Central Government may grant a <b>certificate of naturalisation</b> (not to an illegal migrant) if the person meets <u>five conditions</u>.</p>
      <table><thead><tr><th>Condition</th><th>Requirement</th></tr></thead><tbody><tr><td>Renunciation</td><td>Undertakes to <b>renounce</b> the citizenship of their country if accepted</td></tr><tr><td>Residence (immediately before)</td><td><b>12 months</b> in India / in Govt service</td></tr><tr><td>Residence (14 years before that)</td><td>At least <b>11 years</b> in total</td></tr><tr><td>Character</td><td>Of <b>good character</b></td></tr><tr><td>Language</td><td>Adequate knowledge of a language in the <b>Eighth Schedule</b></td></tr></tbody></table>
      <div class="cp-note trap">12 months immediately before + <b>11 of the earlier 14 years</b>.</div>
    `
  },
  110: {
    questext: "Naturalisation requires adequate knowledge of a language listed in the:",
    options: ["Seventh Schedule", "Sixth Schedule", "Eighth Schedule", "Fifth Schedule"],
    correct: "3",
    exptext: "✅ Eighth Schedule (22 languages). 📌 Eight = languages. ❌ Sixth Schedule is tribal areas."
  },
  111: {
    questext: "In the 14 years before the last 12 months, a naturalisation applicant must have resided in India for at least:",
    options: ["7 years", "11 years", "12 years", "14 years"],
    correct: "2",
    exptext: "✅ 11 years in total. 📌 11 of 14. ❌ 7 years is for registration."
  },
  112: {
    questext: "A certificate of naturalisation is granted by:",
    options: ["Parliament", "State Government", "President of India", "Central Government"],
    correct: "4",
    exptext: "✅ Central Government. 📌 Same authority as registration. ❌ State governments have no role."
  },
  113: {
    type: "concept", icon: "🗺️", accent: "#0891b2", pauseTimer: true,
    title: "Acquisition 5: By Incorporation of Territory",
    html: `
      <p class="cp-lead">If a foreign territory becomes part of India, the <b>Government specifies</b> who among its people become citizens.</p>
      <div class="cp-note exam"><b>Example:</b> When Pondicherry joined India, the Government issued the <b>Citizenship (Pondicherry) Order, 1962</b>.</div>
    `
  },
  114: {
    questext: "The Citizenship (Pondicherry) Order, 1962 is an example of acquisition of citizenship by:",
    options: ["Registration", "Naturalisation", "Incorporation of territory", "Descent"],
    correct: "3",
    exptext: "✅ Incorporation of territory. 📌 New territory, new citizens by order. ❌ Registration is individual-based."
  },
  115: {
    type: "concept", icon: "🚪", accent: "#9333ea", pauseTimer: true,
    title: "Loss of Citizenship: Renunciation and Termination",
    html: `
      <p class="cp-lead">The Act prescribes <b>three ways</b> of losing citizenship; the first two are <u>voluntary</u>.</p>
      <table><thead><tr><th>Mode</th><th>Rule</th></tr></thead><tbody><tr><td>Renunciation</td><td>A citizen of <b>full age and capacity</b> may declare renunciation; on registration they cease to be a citizen. If declared during a <b>war</b> involving India, registration is withheld. Every <b>minor child</b> also loses citizenship but may <b>resume at age 18</b></td></tr><tr><td>Termination</td><td>If a citizen <b>voluntarily acquires</b> another country's citizenship, Indian citizenship <b>ends automatically</b>. Does not apply during a <b>war</b> involving India</td></tr></tbody></table>
      <div class="cp-note trap">Termination is <b>automatic</b>; renunciation needs a <b>declaration</b>.</div>
    `
  },
  116: {
    questext: "Which mode of losing citizenship happens automatically?",
    options: ["Renunciation", "Termination", "Deprivation", "Registration"],
    correct: "2",
    exptext: "✅ Termination on voluntarily acquiring foreign citizenship. 📌 Acquire foreign = terminate. ❌ Renunciation needs a declaration."
  },
  117: {
    questext: "When an Indian citizen renounces citizenship, the minor child:",
    options: ["Loses it permanently", "Keeps it permanently", "Loses it but may resume at age 18", "Loses it only by a court order"],
    correct: "3",
    exptext: "✅ Minor also loses it but may resume at 18. 📌 Child gets a second chance. ❌ Permanent loss is not the rule."
  },
  118: {
    questext: "Consider: 1. Registration of renunciation is withheld if declared during a war involving India. 2. Termination does not apply during a war involving India.",
    options: ["Both 1 and 2", "1 only", "2 only", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Both are correct. 📌 War = protection against loss. ❌ Each applies during war."
  },
  119: {
    type: "concept", icon: "⚠️", accent: "#be123c", pauseTimer: true,
    title: "Loss of Citizenship: Deprivation",
    html: `
      <p class="cp-lead"><b>Compulsory termination</b> by the Central Government on these grounds.</p>
      <table><thead><tr><th>Ground for deprivation</th></tr></thead><tbody><tr><td>Obtained citizenship by <b>fraud</b></td></tr><tr><td>Showed <b>disloyalty</b> to the Constitution</td></tr><tr><td>Unlawfully traded or communicated with the <b>enemy</b> during war</td></tr><tr><td>Imprisoned <b>2 years</b> in any country within <b>5 years</b> of registration/naturalisation</td></tr><tr><td>Ordinarily resident outside India for <b>7 continuous years</b></td></tr></tbody></table>
      <div class="cp-note trap">A citizen <b>by birth</b> can NEVER be deprived of citizenship.</div>
    `
  },
  120: {
    questext: "Who can NEVER be deprived of Indian citizenship?",
    options: ["A person who is a citizen by registration", "A person who is a citizen by naturalisation", "A person who is a citizen by birth", "A person who obtained citizenship by fraud"],
    correct: "3",
    exptext: "✅ Citizen by birth. 📌 Deprivation applies only to acquired citizenship. ❌ Option 4 is a ground for deprivation."
  },
  121: {
    questext: "A registered or naturalised citizen can be deprived if imprisoned in any country for:",
    options: ["3 years within 7 years", "2 years within 10 years", "1 year within 5 years", "2 years within 5 years"],
    correct: "4",
    exptext: "✅ 2 years within 5 years of registration or naturalisation. 📌 2 and 5. ❌ Other combinations are invented."
  },
  122: {
    questext: "Deprivation of citizenship applies if a person is ordinarily resident outside India for:",
    options: ["10 years", "7 continuous years", "12 years", "5 years"],
    correct: "2",
    exptext: "✅ 7 continuous years. 📌 Seven again. ❌ Others are not in the Act."
  },
  123: {
    type: "concept", icon: "🌍", accent: "#059669", pauseTimer: true,
    title: "NRI, PIO and OCI",
    html: `
      <p class="cp-lead">Three terms for <u>Indians living abroad</u> — learn each definition.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>NRI</td><td>An <b>Indian citizen</b> holding an Indian passport but living abroad for job/business or staying outside India indefinitely</td></tr><tr><td>PIO</td><td>A person (or whose ancestors) was an Indian citizen but is now a <b>citizen of another country</b>; cannot include citizens (now/ever) of Pakistan, Sri Lanka, Bangladesh, Nepal, Bhutan, Afghanistan or China</td></tr><tr><td>OCI</td><td>A person of full age and capacity (not now/ever a citizen of <b>Bangladesh or Pakistan</b>), currently a foreign citizen, who was an Indian citizen at/after commencement, was eligible at commencement, belonged to a territory that joined India after 15 Aug 1947, or is a child/grandchild/great-grandchild of any of these</td></tr></tbody></table>
      <div class="cp-note trap">An NRI is still an <b>Indian citizen</b>; PIO and OCI are <b>foreign citizens</b>.</div>
    `
  },
  124: {
    questext: "An NRI is:",
    options: ["A citizen of another country", "An Indian citizen holding an Indian passport but living abroad", "A person whose ancestors were Indian", "A foreign citizen with an Indian spouse"],
    correct: "2",
    exptext: "✅ Indian citizen living abroad. 📌 NRI = still Indian. ❌ Options 1 and 3 describe PIO."
  },
  125: {
    questext: "Which of the following countries is NOT among those excluded from the PIO definition?",
    options: ["Myanmar", "Bhutan", "Afghanistan", "China"],
    correct: "1",
    exptext: "✅ Myanmar is not excluded. 📌 Excluded: Pakistan, Sri Lanka, Bangladesh, Nepal, Bhutan, Afghanistan, China. ❌ Others are excluded."
  },
  126: {
    questext: "A person who is (or ever was) a citizen of which country is NOT eligible for OCI status?",
    options: ["USA", "Canada", "Nepal", "Pakistan"],
    correct: "4",
    exptext: "✅ Pakistan (and Bangladesh). 📌 OCI bars two countries. ❌ Nepal is excluded from PIO, not from OCI."
  },
  127: {
    type: "concept", icon: "🎉", accent: "#ca8a04", pauseTimer: true,
    title: "PIO Cards and Pravasi Bharatiya Divas",
    html: `
      <p class="cp-lead">Key facts on <u>overseas Indians</u>.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>PIO cards</td><td>Scheme <b>discontinued</b> → all PIO cards now hold <b>OCI</b> status</td></tr><tr><td>Recommended by</td><td><b>Dr. L. M. Singhvi</b> committee</td></tr><tr><td>Date</td><td><b>9 January</b> — Gandhi returned from South Africa on 9 Jan 1915</td></tr><tr><td>First PBD</td><td><b>9–11 Jan 2003</b>, under PM <b>Atal Bihari Vajpayee</b></td></tr></tbody></table>
    `
  },
  128: {
    questext: "After the discontinuation of the PIO card scheme, all PIO cards now:",
    options: ["Are invalid", "Hold OCI status", "Convert to citizenship", "Need re-registration as NRI"],
    correct: "2",
    exptext: "✅ PIO cards hold OCI status. 📌 PIO merged into OCI. ❌ They were not cancelled."
  },
  129: {
    questext: "Pravasi Bharatiya Divas is observed on:",
    options: ["9 January", "15 January", "30 January", "2 October"],
    correct: "1",
    exptext: "✅ 9 January, Gandhi's 1915 return from South Africa. 📌 9/1. ❌ 30 January is Martyrs' Day."
  },
  130: {
    questext: "Which committee recommended observing Pravasi Bharatiya Divas?",
    options: ["Sarkaria Committee", "Punchhi Committee", "L. M. Singhvi Committee", "Shah Committee"],
    correct: "3",
    exptext: "✅ L. M. Singhvi committee. 📌 Singhvi = diaspora. ❌ Sarkaria and Punchhi are Centre–State bodies."
  },
  131: {
    type: "concept", icon: "📑", accent: "#0284c7", pauseTimer: true,
    title: "Citizenship Amendment Act (CAA), 2019",
    html: `
      <p class="cp-lead">Amends the <b>Citizenship Act, 1955</b> to give <u>a path to citizenship</u> to undocumented non-Muslim communities from three countries.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Communities (6)</td><td><b>Hindus, Sikhs, Buddhists, Jains, Parsis, Christians</b></td></tr><tr><td>Countries (3)</td><td><b>Pakistan, Afghanistan, Bangladesh</b></td></tr><tr><td>Cut-off entry</td><td>On or before <b>31 December 2014</b></td></tr></tbody></table>
      <div class="cp-note trap"><b>Sri Lanka, Nepal and Myanmar</b> are not covered.</div>
    `
  },
  132: {
    questext: "The cut-off date of entry for the CAA 2019 is:",
    options: ["31 December 2019", "31 December 2011", "31 December 2014", "1 January 2015"],
    correct: "3",
    exptext: "✅ On or before 31 December 2014. 📌 Cut-off 2014, Act 2019. ❌ 2019 is the year of the Act."
  },
  133: {
    questext: "Which of the following is NOT among the six communities covered by the CAA 2019?",
    options: ["Parsis", "Jews", "Jains", "Christians"],
    correct: "2",
    exptext: "✅ Jews are not listed. 📌 HSB-JPC: Hindu, Sikh, Buddhist, Jain, Parsi, Christian. ❌ The others are covered."
  },
  134: {
    questext: "The CAA 2019 covers migrants from:",
    options: ["Pakistan, Sri Lanka and Bangladesh", "Pakistan, Afghanistan and Nepal", "Bangladesh, Bhutan and Pakistan", "Pakistan, Afghanistan and Bangladesh"],
    correct: "4",
    exptext: "✅ Pakistan, Afghanistan, Bangladesh. 📌 PAB. ❌ Sri Lanka, Nepal and Bhutan are not included."
  },
  135: {
    type: "concept", icon: "🔓", accent: "#4f46e5", pauseTimer: true,
    title: "CAA 2019 — Relaxations and Exceptions",
    html: `
      <p class="cp-lead">The Act <u>relaxes</u> normal rules for covered applicants but <b>exempts</b> some areas.</p>
      <table><thead><tr><th>Relaxation</th><th>Detail</th></tr></thead><tbody><tr><td>Naturalisation residency</td><td>Reduced from <b>11 years to 5 years</b></td></tr><tr><td>Prosecution</td><td>Exempt under the <b>Foreigners Act, 1946</b> and <b>Passport Act, 1920</b></td></tr><tr><td>Status</td><td>Applicants not treated as <b>illegal immigrants</b></td></tr></tbody></table>
      <table><thead><tr><th>Exceptions (not applicable)</th><th>Where</th></tr></thead><tbody><tr><td>Sixth Schedule areas</td><td>Tribal areas of Assam, Meghalaya, Mizoram, Tripura</td></tr><tr><td>Inner Line Permit</td><td>States under the Bengal Eastern Frontier Regulation, 1873</td></tr></tbody></table>
    `
  },
  136: {
    questext: "For the six covered communities, the residency required for naturalisation was reduced from 11 years to:",
    options: ["3 years", "7 years", "5 years", "9 years"],
    correct: "3",
    exptext: "✅ 5 years. 📌 11 → 5. ❌ 7 years is for registration."
  },
  137: {
    questext: "The CAA 2019 provisions do NOT apply to:",
    options: ["Delhi and Mumbai", "Sixth Schedule areas and Inner Line Permit states", "All border states", "All North-East UTs"],
    correct: "2",
    exptext: "✅ Sixth Schedule tribal areas and Inner Line Permit states. 📌 Tribal and ILP shield. ❌ Other options are invented."
  },
  138: {
    questext: "The Inner Line Permit system is governed by:",
    options: ["Foreigners Act, 1946", "Passport Act, 1920", "Citizenship Act, 1955", "Bengal Eastern Frontier Regulation, 1873"],
    correct: "4",
    exptext: "✅ Bengal Eastern Frontier Regulation, 1873. 📌 1873 = ILP. ❌ Other Acts concern foreigners and passports."
  },
  139: {
    type: "concept", icon: "✍️", accent: "#b45309", pauseTimer: true,
    title: "Assam Accord, 1985",
    html: `
      <p class="cp-lead">An agreement between the <b>Government of India</b>, <b>Government of Assam</b>, <b>AASU</b> and <b>AAGSP</b> that ended the Assam Movement.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Background</td><td><b>6-year</b> movement (<b>1979–1985</b>) by AASU against illegal immigrants from Bangladesh</td></tr><tr><td>Signatories</td><td>Govt of India, Govt of Assam, AASU, AAGSP</td></tr><tr><td>Cut-off date</td><td><b>24 March 1971</b> — entrants after this are foreigners</td></tr><tr><td>Section 6A</td><td>Citizenship Act, 1955: those who entered between <b>1 Jan 1966 – 25 Mar 1971</b> were granted citizenship after the prescribed process</td></tr><tr><td>Aim</td><td>Protect the cultural, social, economic and political identity of Assamese people</td></tr></tbody></table>
    `
  },
  140: {
    questext: "The Assam Movement led by AASU against illegal immigrants lasted during:",
    options: ["1979–1985", "1971–1977", "1985–1991", "1966–1971"],
    correct: "1",
    exptext: "✅ 1979–1985, six years. 📌 It ended with the Accord. ❌ 1966–1971 is Section 6A's entry period."
  },
  141: {
    questext: "The cut-off date under the Assam Accord, after which entrants are treated as foreigners, is:",
    options: ["1 January 1966", "25 March 1975", "24 March 1971", "15 August 1947"],
    correct: "3",
    exptext: "✅ 24 March 1971. 📌 Bangladesh Liberation war timeline. ❌ 1 January 1966 is the start of the Section 6A window."
  },
  142: {
    questext: "Which of the following was NOT a signatory to the Assam Accord, 1985?",
    options: ["Government of India", "Government of Assam", "AASU", "ULFA"],
    correct: "4",
    exptext: "✅ ULFA was not a signatory. 📌 AASU and AAGSP signed. ❌ Others were signatories."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/India_and_Its_Territory_and_Citizenship/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a softly blurred antique brass globe, a fountain pen and a plain-cover bound book" },
  "images/General_Awareness/Polity/India_and_Its_Territory_and_Citizenship/1.png": { t: "fig", about: "Left box '1950: 29 units' with four small boxes A = 9, B = 9, C = 10, D = 1; a big arrow labelled 1956; right box '14 States + 6 UTs'." }
});

/* CHANGE LOG
   - Potti Sriramulu's fast: the book gives a figure of 56 days; pages say only 'long hunger strike' because sources differ (56–58 days).
   - Added that Dadra & Nagar Haveli and Daman & Diu were merged into one UT in 2020.
   - Added that after J&K became a UT in 2019, India has 28 states and 8 UTs (Telangana is still the 29th state created).
   - Added the 2019 amendment to the list of Citizenship Act amendments.
*/
