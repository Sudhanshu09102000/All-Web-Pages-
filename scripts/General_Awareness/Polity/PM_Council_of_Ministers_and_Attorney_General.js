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

/* Subject: General_Awareness/Polity · Chapter: PM_Council_of_Ministers_and_Attorney_General · 13 concept pages (+ overview) · 33 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — PM, Council of Ministers & Attorney General",
    thumb: {
      image: "images/General_Awareness/Polity/PM_Council_of_Ministers_and_Attorney_General/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "PM & COUNCIL",
      line2: "OF MINISTERS",
      line3: "ATTORNEY GENERAL",
      badge: "FULL CLASS",
      ribbon: "ARTICLES • POWERS • PMs LIST",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "PM, Council of Ministers & Attorney General | Polity Full Class | SSC, UPSC",
      altTitles: ["Article 74 to 78 Polity Class: PM and Council of Ministers", "Attorney General vs Solicitor General vs Advocate General"],
      description: "The Prime Minister, Council of Ministers and law officers are scoring topics in Polity. In this full class we cover every subtopic in the book's order.\n\n📌 IN THIS CLASS\n✅ Articles 74, 75, 77 and 78\n✅ 42nd, 44th and 91st Amendments\n✅ Types of ministers and dissolution of the Council\n✅ Attorney General, Solicitor General, Advocate General\n✅ Powers of the PM, notable tenures and the list of PMs\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #PrimeMinister #SSCCGL",
      tags: ["prime minister of india", "council of ministers", "attorney general of india", "article 74", "article 75", "article 76", "article 77", "article 78", "article 165", "advocate general", "solicitor general", "91st amendment", "42nd amendment", "44th amendment", "types of ministers", "list of prime ministers", "polity for all exams", "indian polity", "polity mcq", "ssc cgl polity", "upsc polity", "general awareness", "static gk", "polity tricks", "competitive exams", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "full class", "PM Council of Ministers an"],
      hashtags: ["Polity", "PrimeMinister", "SSCCGL"],
      thumbText: "PM, COUNCIL OF MINISTERS & AG",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New Polity class is live: PM, Council of Ministers & Attorney General. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Polity — Full Chapter Classes"
    },
    html: `
      <p class="cp-lead">A <u>complete class on the Prime Minister, Council of Ministers and the law officers</u> — Articles 74 to 78, 76 and 165, a Polity favourite in every exam.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>33</b><span>Questions</span></div>
        <div class="cp-stat"><b>~59 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Article 74 – Council of Ministers</b><br>Aid and advise the President; 42nd and 44th Amendments.</li>
        <li><b>Article 75 – Ministers</b><br>Appointment, 15% limit, collective responsibility.</li>
        <li><b>Types of Ministers</b><br>Cabinet, Ministers of State, Deputy Ministers.</li>
        <li><b>Article 76 – Attorney General</b><br>Highest law officer of India.</li>
        <li><b>Solicitor General of India</b><br>Second-highest law officer.</li>
        <li><b>Advocate General (Art. 165)</b><br>Highest law officer of the State.</li>
        <li><b>Dissolution of the Council</b><br>What happens when the PM resigns.</li>
        <li><b>Article 77 – Conduct of Business</b><br>Actions in the President's name.</li>
        <li><b>Article 78 – Duties of the PM</b><br>Link between Council and President.</li>
        <li><b>The Post of the Prime Minister</b><br>Powers and functions.</li>
        <li><b>PMs from Rajya Sabha</b><br>Who and how.</li>
        <li><b>Notable Tenures</b><br>Longest and shortest.</li>
        <li><b>List of Prime Ministers</b><br>1947 to present.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Articles 74-78, the 91st Amendment limits and the law officers are repeated in SSC, UPSC, Banking, Railways and Defence exams.</div>
    `
  },
  2: {
    type: "concept", icon: "📜", accent: "#3b82f6", pauseTimer: true,
    title: "Article 74 – Council of Ministers to Aid & Advise the President",
    html: `
      <p class="cp-lead">The President is only the <b>nominal / de jure head</b>; the <b>Prime Minister is the real / de facto head</b>. The Council of Ministers (CoM) headed by the PM actually takes the decisions.</p>
      <table><thead><tr><th>Clause</th><th>Provision</th></tr></thead><tbody><tr><td>74(1)</td><td>CoM with the PM as head to aid and advise the President; the President shall act in accordance with that advice</td></tr><tr><td>42nd Amendment (1976)</td><td>Made the ministers' advice binding on the President</td></tr><tr><td>44th Amendment (1978)</td><td>President may ask the CoM to reconsider once; after reconsideration he must act as per the advice</td></tr><tr><td>74(2)</td><td>Whether any advice was given (and what it was) cannot be inquired into by any court</td></tr></tbody></table>
      <div class="cp-note trap">The 42nd Amendment made advice <b>binding</b>; the 44th allows only <b>one</b> reconsideration.</div>
      <div class="cp-note tip">The PM is Chairman of the <b>NITI Aayog</b>, <b>Inter-State Council</b> and <b>NDMA</b>.</div>
    `
  },
  3: {
    questext: "Which Article provides for a Council of Ministers headed by the Prime Minister to aid and advise the President?",
    options: ["Art. 72", "Art. 73", "Art. 74", "Art. 75"],
    correct: "3",
    exptext: "✅ Art. 74(1) creates the Council of Ministers. 📌 74 = aid and advise. ❌ Art. 75 covers other provisions on ministers."
  },
  4: {
    questext: "Which Amendment made the advice of the Council of Ministers binding on the President?",
    options: ["42nd Amendment (1976)", "44th Amendment (1978)", "91st Amendment (2003)", "52nd Amendment (1985)"],
    correct: "1",
    exptext: "✅ The 42nd Amendment made advice binding. 📌 42nd binds. ❌ The 44th only allows one reconsideration."
  },
  5: {
    questext: "Under the 44th Amendment, the President may ask the Council of Ministers to reconsider its advice:",
    options: ["Any number of times", "Twice", "Never", "Only once"],
    correct: "4",
    exptext: "✅ Only once; then he must act on the advice. 📌 44th = one chance. ❌ Unlimited reconsideration is not allowed."
  },
  6: {
    questext: "Which clause bars courts from inquiring whether any advice was given by ministers to the President?",
    options: ["Art. 74(1)", "Art. 74(2)", "Art. 75(1)", "Art. 75(3)"],
    correct: "2",
    exptext: "✅ Art. 74(2) bars any court inquiry. 📌 Clause (2) = courts barred. ❌ 74(1) is the advice clause itself."
  },
  7: {
    type: "concept", icon: "🧾", accent: "#ef4444", pauseTimer: true,
    title: "Article 75 – Other Provisions as to Ministers",
    html: `
      <p class="cp-lead">Article 75 covers <u>how ministers are appointed, how many there can be and whom they answer to</u>.</p>
      <table><thead><tr><th>Clause</th><th>Provision</th></tr></thead><tbody><tr><td>75(1)</td><td>PM appointed by the President; other ministers appointed by the President on the PM's advice</td></tr><tr><td>75(1)(A) – 91st Amendment, 2003</td><td>Total ministers (including PM) not more than 15% of the Lok Sabha</td></tr><tr><td>Art. 164(1A) – 91st Amendment</td><td>Minimum number of ministers in a State = 12</td></tr><tr><td>75(1)(B) – 91st Amendment</td><td>A member disqualified on grounds of defection cannot become a minister</td></tr><tr><td>75(2)</td><td>Ministers hold office during the pleasure of the President</td></tr><tr><td>75(3)</td><td>CoM is collectively responsible to the Lok Sabha</td></tr><tr><td>75(4)</td><td>Oaths of office and secrecy administered by the President</td></tr><tr><td>75(5)</td><td>A minister not a member of either House ceases to be minister after 6 consecutive months</td></tr><tr><td>75(6)</td><td>Salaries/allowances fixed by Parliament; until then as per the 2nd Schedule</td></tr></tbody></table>
      <div class="cp-note trap">The 15% limit is of the <b>Lok Sabha</b>; the minimum of <b>12</b> is for a <b>State</b>.</div>
      <div class="cp-note exam">Collective responsibility is to the <b>Lok Sabha</b>, not the Rajya Sabha.</div>
    `
  },
  8: {
    questext: "The total number of ministers, including the PM, cannot exceed what percent of the Lok Sabha's strength?",
    options: ["10%", "15%", "20%", "25%"],
    correct: "2",
    exptext: "✅ 15% under Art. 75(1)(A). 📌 91st Amendment, 2003. ❌ 10% and 20% are not the limits."
  },
  9: {
    questext: "As per the 91st Amendment, the minimum number of ministers in a State is:",
    options: ["8", "10", "15", "12"],
    correct: "4",
    exptext: "✅ Minimum 12 under Art. 164(1A). 📌 15% for Centre cap, 12 for State floor. ❌ 15 is not the State minimum."
  },
  10: {
    questext: "A person who is not a member of either House can continue as a minister for a maximum of:",
    options: ["6 consecutive months", "3 months", "1 year", "2 months"],
    correct: "1",
    exptext: "✅ Six consecutive months under 75(5). 📌 He must win a seat in time. ❌ No one-year grace exists."
  },
  11: {
    questext: "Consider: 1. The CoM is collectively responsible to the Lok Sabha. 2. Ministers hold office during the pleasure of the Prime Minister. Which is/are correct?",
    options: ["Only 2", "Both 1 and 2", "Only 1", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Only statement 1 is correct. 📌 Pleasure of the President. ❌ Statement 2 wrongly names the PM."
  },
  12: {
    type: "concept", icon: "🗂️", accent: "#f59e0b", pauseTimer: true,
    title: "Types of Ministers",
    html: `
      <p class="cp-lead">The Constitution does <b>not classify</b> ministers. In practice there are <u>three ranks</u>.</p>
      <table><thead><tr><th>Rank</th><th>Role</th></tr></thead><tbody><tr><td>Cabinet Ministers</td><td>Hold key portfolios (Defence, Home, Finance, Education, Health) and attend Cabinet meetings</td></tr><tr><td>Ministers of State (MoS)</td><td>Hold independent charge of smaller ministries or are attached to a Cabinet Minister; do NOT attend Cabinet meetings</td></tr><tr><td>Deputy Ministers</td><td>Assist Cabinet Ministers and Ministers of State</td></tr></tbody></table>
      <div class="cp-note trap">Ministers of State <b>do not attend Cabinet meetings</b>, even when they hold independent charge.</div>
      <div class="cp-note exam">The three-rank structure comes from <b>practice</b>, not from the Constitution.</div>
    `
  },
  13: {
    questext: "Which of the following ministers do NOT attend Cabinet meetings?",
    options: ["Ministers of State", "Home Minister", "Finance Minister", "The Prime Minister"],
    correct: "1",
    exptext: "✅ Ministers of State do not attend Cabinet meetings. 📌 Cabinet rank attends. ❌ The others are Cabinet members."
  },
  14: {
    questext: "The classification of ministers into Cabinet Ministers, Ministers of State and Deputy Ministers is:",
    options: ["Given in Article 74", "Given in Article 75", "Not in the Constitution; it is based on practice", "Given in the 91st Amendment"],
    correct: "3",
    exptext: "✅ It arises from practice. 📌 Constitution is silent. ❌ Article 75 covers appointment, not ranks."
  },
  15: {
    type: "concept", icon: "⚖️", accent: "#8b5cf6", pauseTimer: true,
    title: "Article 76 – Attorney General of India (AG)",
    html: `
      <p class="cp-lead">The AG is the <b>highest law officer</b> of the country and the government's chief legal adviser.</p>
      <table><thead><tr><th>Point</th><th>Provision</th></tr></thead><tbody><tr><td>76(1)</td><td>Appointed by the President; must be qualified to be a Judge of the Supreme Court</td></tr><tr><td>76(2)</td><td>Duty: advise the Government of India on legal matters</td></tr><tr><td>76(3)</td><td>Right of audience in all courts within India</td></tr><tr><td>76(4)</td><td>Holds office during the pleasure of the President; remuneration decided by the President</td></tr><tr><td>First AG</td><td>M. C. Setalvad (also the longest serving)</td></tr><tr><td>Current AG</td><td>R. Venkataramani</td></tr><tr><td>Parliament</td><td>Can speak/take part in Parliament and its committees but cannot vote</td></tr></tbody></table>
      <div class="cp-note remember">The AG is <b>not a full-time counsel</b> and is <b>not debarred from private practice</b> after leaving office.</div>
      <div class="cp-note trap">The AG may take part in Parliament but <b>cannot vote</b>.</div>
    `
  },
  16: {
    questext: "The Attorney General of India is appointed by:",
    options: ["Prime Minister", "President", "Chief Justice of India", "Parliament"],
    correct: "2",
    exptext: "✅ Art. 76(1): appointed by the President. 📌 AG = President; Advocate General = Governor. ❌ The PM only advises."
  },
  17: {
    questext: "To be appointed Attorney General, a person must be qualified to be a Judge of:",
    options: ["A High Court", "Any subordinate court", "The Delhi High Court", "The Supreme Court"],
    correct: "4",
    exptext: "✅ Qualified for the Supreme Court. 📌 AG = SC; Advocate General = HC. ❌ High Court is for the State's Advocate General."
  },
  18: {
    questext: "Who was the first Attorney General of India?",
    options: ["C. K. Daphtary", "K. K. Venugopal", "Soli Sorabjee", "M. C. Setalvad"],
    correct: "4",
    exptext: "✅ M. C. Setalvad, also the longest serving. 📌 First and longest. ❌ Daphtary came after him."
  },
  19: {
    questext: "Which statement about the Attorney General is correct?",
    options: ["He can vote in Parliament", "He can speak in Parliament and its committees but cannot vote", "He is debarred from private practice", "He has a fixed five-year term"],
    correct: "2",
    exptext: "✅ He may speak but not vote. 📌 Participates, no vote. ❌ He holds office at the President's pleasure."
  },
  20: {
    type: "concept", icon: "🧑‍⚖️", accent: "#14b8a6", pauseTimer: true,
    title: "Solicitor General of India (SG)",
    html: `
      <p class="cp-lead">The SG is the <b>second-highest law officer</b> of the country and <u>assists the Attorney General</u>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Rank</td><td>Second-highest law officer; assists the AG</td></tr><tr><td>Appointment</td><td>3-year term, by the ACC (Appointments Committee of the Cabinet), chaired by the PM</td></tr><tr><td>Status</td><td>NOT a constitutional post</td></tr><tr><td>Current SG</td><td>Tushar Mehta</td></tr></tbody></table>
      <div class="cp-note trap">Only the <b>Attorney General</b> is a constitutional office (Art. 76). The SG is <b>not</b>.</div>
      <div class="cp-note exam">SG term = <b>3 years</b>, appointed through the <b>ACC</b>.</div>
    `
  },
  21: {
    questext: "The Solicitor General of India is appointed for a term of:",
    options: ["1 year", "5 years", "3 years", "6 years"],
    correct: "3",
    exptext: "✅ Three-year term, by the ACC. 📌 SG = 3. ❌ Five years is the term of many constitutional posts, not the SG's."
  },
  22: {
    questext: "Which statement about the Solicitor General is correct?",
    options: ["He is not a constitutional post and assists the AG", "He is appointed under Art. 76", "He is the highest law officer", "He is appointed by the Governor"],
    correct: "1",
    exptext: "✅ Not constitutional; assists the AG. 📌 SG = second-highest. ❌ Art. 76 is only for the AG."
  },
  23: {
    type: "concept", icon: "🏙️", accent: "#ec4899", pauseTimer: true,
    title: "Advocate General of the State (Article 165)",
    html: `
      <p class="cp-lead">Every State has an <b>Advocate General</b> — the State's counterpart of the Attorney General.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Rank</td><td>Highest law officer of the State</td></tr><tr><td>Appointed by</td><td>The Governor</td></tr><tr><td>Qualification</td><td>Qualified to be a High Court Judge</td></tr><tr><td>Duty</td><td>Advise the State Government on legal matters</td></tr><tr><td>Tenure</td><td>During the pleasure of the Governor</td></tr></tbody></table>
      <div class="cp-note trap">AG of India is qualified for the <b>Supreme Court</b>; Advocate General for the <b>High Court</b>.</div>
      <div class="cp-note exam">Article <b>165</b> = Advocate General; appointed by the <b>Governor</b>.</div>
    `
  },
  24: {
    questext: "The Advocate General of a State is appointed by:",
    options: ["President", "Chief Minister", "Governor", "Chief Justice of the High Court"],
    correct: "3",
    exptext: "✅ The Governor appoints him. 📌 Art. 165. ❌ The President appoints the Attorney General of India."
  },
  25: {
    questext: "Which pair is correctly matched?",
    options: ["AG of India – appointed by the Governor", "Advocate General – Art. 165, qualified to be a High Court Judge", "Solicitor General – Art. 76", "AG of India – qualified to be a High Court Judge"],
    correct: "2",
    exptext: "✅ Advocate General: Art. 165, High Court qualification. 📌 State = High Court. ❌ The AG of India needs Supreme Court qualification."
  },
  26: {
    type: "concept", icon: "🔻", accent: "#0ea5e9", pauseTimer: true,
    title: "Dissolution of the Council of Ministers",
    html: `
      <p class="cp-lead">What happens to the Council depends on <u>who leaves</u>: an ordinary minister or the PM.</p>
      <table><thead><tr><th>Event</th><th>Result</th></tr></thead><tbody><tr><td>A member resigns / dies / is removed</td><td>Only a vacancy is created</td></tr><tr><td>PM dies or resigns</td><td>The entire CoM is dissolved (the whole Council must resign)</td></tr><tr><td>Afterwards</td><td>The President invites the leader with a majority in the Lok Sabha to be the new PM</td></tr></tbody></table>
      <div class="cp-note trap">A minister's exit creates only a <b>vacancy</b>; the <b>PM's exit</b> ends the whole Council.</div>
      <div class="cp-note exam">First Indian PM to resign — <b>Morarji Desai</b>.</div>
    `
  },
  27: {
    questext: "When the Prime Minister resigns or dies, what happens to the Council of Ministers?",
    options: ["The entire Council is dissolved", "Only the Cabinet ministers go", "The Deputy PM takes over", "Only a vacancy is created"],
    correct: "1",
    exptext: "✅ The whole Council is dissolved. 📌 PM out, all out. ❌ 'Only a vacancy' applies to ordinary ministers."
  },
  28: {
    questext: "Who was the first Indian Prime Minister to resign from office?",
    options: ["Lal Bahadur Shastri", "Charan Singh", "V. P. Singh", "Morarji Desai"],
    correct: "4",
    exptext: "✅ Morarji Desai was the first PM to resign. 📌 Desai, 1979. ❌ Shastri died in office."
  },
  29: {
    type: "concept", icon: "🛠️", accent: "#f97316", pauseTimer: true,
    title: "Article 77 – Conduct of Business of the Government",
    html: `
      <p class="cp-lead">Although the PM runs the government, every executive action is formally taken in <b>the President's name</b>.</p>
      <table><thead><tr><th>Clause</th><th>Provision</th></tr></thead><tbody><tr><td>77(1)</td><td>All executive actions are taken in the name of the President</td></tr><tr><td>77(2)</td><td>Orders and instruments are authenticated as per rules made by the President</td></tr><tr><td>77(3)</td><td>The President makes rules for the convenient transaction of business and allocation of work among ministers</td></tr></tbody></table>
      <div class="cp-note trap">Allocation-of-business rules are made by the <b>President</b>, not by the PM or Parliament.</div>
      <div class="cp-note exam"><b>77(1)</b> = name of the President.</div>
    `
  },
  30: {
    questext: "Under which clause are executive actions of the Government of India taken in the name of the President?",
    options: ["Art. 77(1)", "Art. 77(2)", "Art. 77(3)", "Art. 78(a)"],
    correct: "1",
    exptext: "✅ Art. 77(1). 📌 First clause = name. ❌ 77(2) is about authentication."
  },
  31: {
    questext: "Who makes the rules for the allocation of business among ministers?",
    options: ["Prime Minister", "Cabinet Secretary", "Parliament", "President"],
    correct: "4",
    exptext: "✅ Art. 77(3) gives this to the President. 📌 He frames the rules. ❌ The PM only advises."
  },
  32: {
    type: "concept", icon: "🔗", accent: "#84cc16", pauseTimer: true,
    title: "Article 78 – Duties of the Prime Minister",
    html: `
      <p class="cp-lead">Article 78 makes the PM the <b>link between the CoM and the President</b>.</p>
      <table><thead><tr><th>Clause</th><th>Duty</th></tr></thead><tbody><tr><td>78(a)</td><td>Communicate to the President all decisions of the CoM on administration and legislation</td></tr><tr><td>78(b)</td><td>Furnish any information the President may call for</td></tr><tr><td>78(c)</td><td>If the President requires, submit for the CoM's consideration any matter decided by a Minister but not considered by the Council</td></tr></tbody></table>
      <div class="cp-note trap">Article <b>78</b> is the PM's duties; Article <b>75</b> is about ministers.</div>
      <div class="cp-note exam"><b>78 = link</b> between CoM and President.</div>
    `
  },
  33: {
    questext: "Which Article makes the Prime Minister the link between the Council of Ministers and the President?",
    options: ["Art. 74", "Art. 75", "Art. 78", "Art. 77"],
    correct: "3",
    exptext: "✅ Art. 78 lists the PM's duties. 📌 78 = link. ❌ Art. 74 is aid and advise."
  },
  34: {
    questext: "Under Art. 78(c), the PM must, if the President requires, submit for the Council's consideration:",
    options: ["Any bill pending in Rajya Sabha", "A matter decided by a Minister but not considered by the Council", "A decision of the Supreme Court", "A resolution of Parliament"],
    correct: "2",
    exptext: "✅ A minister-decided matter not yet seen by the Council. 📌 78(c). ❌ Parliament's resolutions are not covered."
  },
  35: {
    type: "concept", icon: "👤", accent: "#a855f7", pauseTimer: true,
    title: "The Post of the Prime Minister",
    html: `
      <p class="cp-lead">The PM is the <b>real head of the government</b>. Two famous comments describe the post, followed by the PM's key powers.</p>
      <table><thead><tr><th>Said by</th><th>Comment</th></tr></thead><tbody><tr><td>Dr. B. R. Ambedkar</td><td>Collective responsibility can be achieved only through the instrumentality of the PM</td></tr><tr><td>J. L. Nehru</td><td>The Linchpin of the Government</td></tr></tbody></table>
      <table><thead><tr><th>Area</th><th>Power / Function</th></tr></thead><tbody><tr><td>Parliament</td><td>Advises the President on summoning and proroguing; can recommend dissolution of the Lok Sabha anytime</td></tr><tr><td>Policy</td><td>Announces government policies on the floor of the House</td></tr><tr><td>Ministers</td><td>Recommends names for appointment; allocates and reshuffles portfolios; can ask a Minister to resign or recommend dismissal</td></tr><tr><td>Council</td><td>Presides over CoM meetings; guides, directs, controls and coordinates ministers</td></tr><tr><td>Resignation</td><td>Can cause the collapse of the CoM by resigning</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix the two quotes: <b>Ambedkar</b> = collective responsibility; <b>Nehru</b> = linchpin.</div>
      <div class="cp-note exam">The PM can recommend dissolution of the <b>Lok Sabha</b> at any time.</div>
    `
  },
  36: {
    questext: "Who described the Prime Minister as the 'Linchpin of the Government'?",
    options: ["Dr. B. R. Ambedkar", "J. L. Nehru", "Sardar Patel", "Dr. Rajendra Prasad"],
    correct: "2",
    exptext: "✅ J. L. Nehru used this phrase. 📌 Nehru = linchpin. ❌ Ambedkar spoke on collective responsibility."
  },
  37: {
    questext: "Which of the following is NOT a power of the Prime Minister?",
    options: ["Recommend dissolution of the Lok Sabha", "Allocate and reshuffle portfolios", "Appoint Supreme Court judges on his own", "Preside over CoM meetings"],
    correct: "3",
    exptext: "✅ Judges are appointed by the President, not by the PM alone. 📌 PM guides ministers. ❌ The other three are his powers."
  },
  38: {
    questext: "Who said that collective responsibility can be achieved only through the instrumentality of the PM?",
    options: ["J. L. Nehru", "Sardar Patel", "Dr. Rajendra Prasad", "Dr. B. R. Ambedkar"],
    correct: "4",
    exptext: "✅ Dr. B. R. Ambedkar. 📌 Ambedkar = collective responsibility. ❌ Nehru is linked to 'linchpin'."
  },
  39: {
    type: "concept", icon: "🏠", accent: "#06b6d4", pauseTimer: true,
    title: "PMs Who Were Rajya Sabha Members",
    html: `
      <p class="cp-lead">Most PMs sat in the Lok Sabha, but <u>three were Rajya Sabha members</u>.</p>
      <table><thead><tr><th>Prime Minister</th><th>Note</th></tr></thead><tbody><tr><td>Indira Gandhi</td><td>Rajya Sabha member</td></tr><tr><td>Manmohan Singh</td><td>Rajya Sabha member</td></tr><tr><td>H. D. Deve Gowda</td><td>Rajya Sabha member; became PM without first being a Union Cabinet Minister</td></tr></tbody></table>
      <div class="cp-note trap">Deve Gowda is the PM who became PM <b>without first being a Union Cabinet Minister</b>.</div>
      <div class="cp-note exam">Remember the trio: <b>Indira, Manmohan, Deve Gowda</b>.</div>
    `
  },
  40: {
    questext: "Which PM was a Rajya Sabha member and became PM without first being a Union Cabinet Minister?",
    options: ["H. D. Deve Gowda", "Rajiv Gandhi", "P. V. Narasimha Rao", "Lal Bahadur Shastri"],
    correct: "1",
    exptext: "✅ H. D. Deve Gowda. 📌 Gowda = RS, no Union Cabinet post. ❌ Others held Union Cabinet posts first."
  },
  41: {
    type: "concept", icon: "⏱️", accent: "#e11d48", pauseTimer: true,
    title: "Notable Tenures",
    html: `
      <p class="cp-lead">Exam setters love the <u>longest and shortest</u> tenures. Learn these four.</p>
      <table><thead><tr><th>Prime Minister</th><th>Tenure</th></tr></thead><tbody><tr><td>Jawaharlal Nehru</td><td>Longest serving — 16 years, 286 days</td></tr><tr><td>Atal Bihari Vajpayee</td><td>Initial term of just 13 days</td></tr><tr><td>Chaudhary Charan Singh</td><td>170 days</td></tr><tr><td>Chandra Shekhar</td><td>7 months</td></tr></tbody></table>
      <div class="cp-note trap">Vajpayee served <b>twice</b>: first 13 days (1996), then 1998–2004.</div>
      <div class="cp-note exam">Longest = <b>Nehru</b>; shortest = <b>Vajpayee (13 days)</b>.</div>
    `
  },
  42: {
    questext: "Which Prime Minister had the longest tenure?",
    options: ["Indira Gandhi", "Manmohan Singh", "Narendra Modi", "Jawaharlal Nehru"],
    correct: "4",
    exptext: "✅ Nehru served 16 years, 286 days. 📌 Longest = Nehru. ❌ Others served shorter periods."
  },
  43: {
    questext: "Atal Bihari Vajpayee's initial term as Prime Minister in May 1996 lasted:",
    options: ["13 days", "170 days", "7 months", "1 year"],
    correct: "1",
    exptext: "✅ Just 13 days. 📌 Shortest PM tenure. ❌ 170 days was Charan Singh's."
  },
  44: {
    type: "concept", icon: "📋", accent: "#22c55e", pauseTimer: true,
    title: "List of Prime Ministers of India",
    html: `
      <p class="cp-lead">Learn the <u>order of PMs</u> and the acting PM interludes of Gulzari Lal Nanda.</p>
      <table><thead><tr><th>S.No.</th><th>Prime Minister</th><th>Term</th></tr></thead><tbody><tr><td>1</td><td>Jawaharlal Nehru</td><td>1947–1964 (16 yrs 286 days – longest serving)</td></tr><tr><td>—</td><td>Gulzari Lal Nanda (Acting)</td><td>May 1964</td></tr><tr><td>2</td><td>Lal Bahadur Shastri</td><td>1964–1966</td></tr><tr><td>—</td><td>Gulzari Lal Nanda (Acting)</td><td>Jan 1966</td></tr><tr><td>3</td><td>Indira Gandhi</td><td>1966–1977</td></tr><tr><td>4</td><td>Morarji Desai</td><td>1977–1979</td></tr><tr><td>5</td><td>Charan Singh</td><td>1979–1980</td></tr><tr><td>—</td><td>Indira Gandhi</td><td>1980–1984</td></tr><tr><td>6</td><td>Rajiv Gandhi</td><td>1984–1989</td></tr><tr><td>7</td><td>Vishwanath Pratap Singh</td><td>1989–1990</td></tr><tr><td>8</td><td>Chandra Shekhar</td><td>1990–1991</td></tr><tr><td>9</td><td>P. V. Narasimha Rao</td><td>1991–1996</td></tr><tr><td>10</td><td>Atal Bihari Vajpayee</td><td>May 1996 (13 days)</td></tr><tr><td>11</td><td>H. D. Deve Gowda</td><td>1996–1997</td></tr><tr><td>12</td><td>Inder Kumar Gujral</td><td>1997–1998</td></tr><tr><td>—</td><td>Atal Bihari Vajpayee</td><td>1998–2004</td></tr><tr><td>13</td><td>Manmohan Singh</td><td>2004–2014</td></tr><tr><td>14</td><td>Narendra Modi</td><td>2014–present</td></tr></tbody></table>
      <div class="cp-note trap">Nanda was <b>acting PM twice</b> (May 1964 and Jan 1966), both after the death of the PM.</div>
      <div class="cp-note exam">Indira Gandhi and Vajpayee appear <b>twice</b> in the list.</div>
    `
  },
  45: {
    questext: "Who became Prime Minister immediately after Morarji Desai?",
    options: ["Indira Gandhi", "Charan Singh", "Rajiv Gandhi", "V. P. Singh"],
    correct: "2",
    exptext: "✅ Charan Singh (1979–1980). 📌 Desai, Charan Singh, then Indira. ❌ Indira returned only in 1980."
  },
  46: {
    questext: "Who was Prime Minister between Chandra Shekhar and Vajpayee's 13-day term?",
    options: ["V. P. Singh", "H. D. Deve Gowda", "P. V. Narasimha Rao", "Rajiv Gandhi"],
    correct: "3",
    exptext: "✅ P. V. Narasimha Rao (1991–1996). 📌 Chandra Shekhar, Rao, Vajpayee. ❌ Gowda came after Vajpayee's 13 days."
  },
  47: {
    questext: "Consider: 1. Gulzari Lal Nanda served as acting PM twice. 2. H. D. Deve Gowda was PM before I. K. Gujral. Which is/are correct?",
    options: ["Only 1", "Both 1 and 2", "Only 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Both are correct. 📌 Nanda: 1964 and 1966. Gowda 1996–97, Gujral 1997–98."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/PM_Council_of_Ministers_and_Attorney_General/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a polished brass gavel, a bound copy of the Constitution on a desk and a softly blurred Parliament dome silhouette" }
});

/* CHANGE LOG
   - Notable Tenures: removed the claim that Chandra Shekhar's 7 months were 'shortest among all full-term PMs' (Charan Singh's 170 days and Vajpayee's 13 days were shorter); only the 7-month figure is kept.
*/
