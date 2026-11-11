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
  /* Copy strategy (most reliable first):
     1) synchronous execCommand inside the click gesture, with our own "copy" listener so pages that
        block copy events / user-select:none cannot interfere;
     2) async Clipboard API; 3) caller shows a visible, pre-selected text box for manual copy. */
  function copy(text, done, fail, host) {
    function onCopy(ev) {
      try {
        if (ev.clipboardData) ev.clipboardData.setData("text/plain", text);
        ev.preventDefault();
        ev.stopImmediatePropagation();
      } catch (e) {}
    }
    function legacy() {
      var ok = false, prev = document.activeElement, ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:0;width:2em;height:2em;opacity:0;pointer-events:none;font-size:16px;-webkit-user-select:text!important;user-select:text!important";
      (host || document.body).appendChild(ta);
      try { window.addEventListener("copy", onCopy, true); } catch (e) {}
      try { ta.focus(); ta.select(); ta.setSelectionRange(0, text.length); } catch (e) {}
      try { ok = document.execCommand("copy"); } catch (e) {}
      try { window.removeEventListener("copy", onCopy, true); } catch (e) {}
      if (ta.parentNode) ta.parentNode.removeChild(ta);
      try { if (prev && prev.focus) prev.focus(); } catch (e) {}
      return ok;
    }
    if (legacy()) { done(); return; }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fail);
        return;
      }
    } catch (e) {}
    fail();
  }
  function manual(box, text) {
    var ta = box.querySelector("textarea");
    if (!ta) {
      ta = document.createElement("textarea");
      ta.readOnly = true;
      ta.rows = 5;
      ta.style.cssText = "width:100%;box-sizing:border-box;font:12px/1.4 system-ui,sans-serif;padding:8px;border-radius:8px;border:1px solid rgba(148,163,184,.6);background:rgba(0,0,0,.35);color:inherit;-webkit-user-select:text!important;user-select:text!important";
      ta.addEventListener("focus", function () { ta.select(); });
      ta.addEventListener("click", function () { ta.select(); });
      box.appendChild(ta);
    }
    ta.value = text;
    try { ta.focus(); ta.select(); ta.setSelectionRange(0, text.length); } catch (e) {}
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
    if (!text) {
      b.textContent = "⚠️ No prompt found";
      setTimeout(function () { b.textContent = label; }, 2500);
      return;
    }
    copy(text, function () {
      b.textContent = "✅ Copied!";
      setTimeout(function () { b.textContent = label; }, 1600);
    }, function () {
      b.textContent = "⚠️ Select all & copy below";
      manual(b.parentNode, text);
      setTimeout(function () { b.textContent = label; }, 4000);
    }, b.parentNode);
  }, true);
  try { new MutationObserver(sweep).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  sweep();
})();

/* Field: General_Awareness · Subject: Polity · Chapter: Centre_State_Relations_and_Emergency_Provisions · 21 concept pages (+ overview) · 57 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Polity/Centre_State_Relations_and_Emergency_Provisions/thumbnail.png",
      banner: "SSC • UPSC • RAILWAYS 2026",
      line1: "CENTRE–STATE",
      line2: "RELATIONS +",
      line3: "EMERGENCY",
      badge: "FULL CLASS",
      ribbon: "ARTICLES • LISTS • MCQs",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Centre-State Relations & Emergency Provisions | Polity for all exams",
      altTitles: ["Article 352, 356, 360 Emergency Provisions One Shot", "Seventh Schedule Lists, GST & Languages Polity Class"],
      description: "Centre–State relations and Emergency provisions give some of the most repeated questions in Polity. In this class you learn the Three Lists, when Parliament can legislate on the State List, financial relations and GST, the Sarkaria and Punchhi Commissions, river water tribunals, language provisions, Articles 352, 356 and 360, and Union Territories with Delhi.\n\n📌 IN THIS CLASS\n✅ Three Lists and Art. 249–253\n✅ GST, surcharge vs cess\n✅ National, President’s Rule, Financial Emergency\n✅ Languages and 8th Schedule\n✅ Union Territories and Delhi\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Federal structure and Three Lists\n00:00 Emergency provisions\n00:00 Union Territories and Delhi\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Polity #EmergencyProvisions",
      tags: ["centre state relations", "emergency provisions", "indian polity", "polity for ssc cgl", "article 352", "article 356", "president rule", "national emergency", "financial emergency", "seventh schedule", "union list state list", "concurrent list", "8th schedule languages", "classical languages", "official language articles", "sarkaria commission", "punchhi commission", "inter state council", "river water disputes tribunal", "zonal councils", "gst 101st amendment", "union territories polity", "delhi special provisions", "polity one shot", "tricks"],
      hashtags: ["SSCCGL", "Polity", "EmergencyProvisions"],
      thumbText: "CENTRE–STATE + EMERGENCY",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New Polity class is live: Centre–State Relations + Emergency Provisions. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Federal structure and Three Lists\n00:00 Emergency provisions\n00:00 Union Territories and Delhi",
      playlist: "General Awareness — Polity Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on Centre–State Relations and Emergency Provisions</u> — the Polity chapter that gives you Article numbers, lists and timelines in every exam.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>21</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>57</b><span>Questions</span></div>
        <div class="cp-stat"><b>~99 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Federal Structure &amp; Three Lists</b><br>Parts XI–XII, Seventh Schedule, 42nd Amendment, residuary powers.</li>
        <li><b>Interpretation &amp; State List Powers</b><br>Four principles, Art. 254 and the five times Parliament can enter the State List.</li>
        <li><b>Administrative &amp; Financial Relations</b><br>Art. 365, All India Services, GST (101st Amendment), surcharge vs cess.</li>
        <li><b>Commissions &amp; Coordination Bodies</b><br>Sarkaria, Punchhi, Inter-State Council, river tribunals, Zonal Councils, NEC.</li>
        <li><b>Language Provisions</b><br>Arts. 343–351, 8th Schedule (22 languages), classical languages.</li>
        <li><b>Emergency Provisions</b><br>National Emergency, President’s Rule, Financial Emergency, Arts. 355, 358, 359, 365.</li>
        <li><b>Union Territories &amp; Delhi</b><br>Arts. 239–241, 69th Amendment, Delhi’s special powers.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Article numbers, time limits and majorities from this chapter are asked almost every year in SSC, UPSC and Railways.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#22c55e", pauseTimer: true,
    title: "Introduction – A Federal Structure",
    html: `
      <p class="cp-lead">India’s Constitution is <b>federal</b> — it divides <u>legislative, administrative and financial</u> powers between the Centre and the States.</p>
      <table><thead><tr><th>Type of relation</th><th>Part</th><th>Articles</th></tr></thead><tbody><tr><td>Legislative</td><td>Part XI, Ch. I</td><td>245–255</td></tr><tr><td>Administrative</td><td>Part XI, Ch. II</td><td>256–263</td></tr><tr><td>Financial</td><td>Part XII, Ch. I</td><td>268–293</td></tr></tbody></table>
      <div class="cp-note trap">Legislative and administrative relations are both in <b>Part XI</b>; only financial relations are in <b>Part XII</b>.</div>
      <div class="cp-note exam">Emergency provisions (<b>Part XVIII</b>) also change how the Centre and States work together.</div>
    `
  },
  3: {
    questext: "Financial relations between the Centre and the States are covered in which Part of the Constitution?",
    options: ["Part XI", "Part XII", "Part XVIII", "Part V"],
    correct: "2",
    exptext: "✅ Part XII, Chapter I (Arts. 268–293). 📌 Part XI covers legislative and administrative relations. ❌ Part XVIII is Emergency."
  },
  4: {
    questext: "Administrative relations between the Centre and the States are dealt with in:",
    options: ["Articles 245–255", "Articles 268–293", "Articles 352–360", "Articles 256–263"],
    correct: "4",
    exptext: "✅ Arts. 256–263 (Part XI, Ch. II). 📌 245–255 is legislative; 268–293 is financial. ❌ 352–360 is Emergency."
  },
  5: {
    type: "concept", icon: "📜", accent: "#f59e0b", pauseTimer: true,
    title: "Legislative Relations – The Three Lists (Art. 246)",
    html: `
      <p class="cp-lead">Article 246 divides law-making subjects into <b>three Lists</b> of the <u>Seventh Schedule</u>.</p>
      <table><thead><tr><th>List</th><th>Who legislates</th><th>Examples</th><th>Original → Present</th></tr></thead><tbody><tr><td>Union</td><td>Only Parliament</td><td>Defence, foreign affairs, railways, banking, currency, atomic energy, citizenship</td><td>97 → 100</td></tr><tr><td>State</td><td>Only State Legislatures</td><td>Public order, police, local government, agriculture, public health, prisons</td><td>66 → 61</td></tr><tr><td>Concurrent</td><td>Both Parliament &amp; States</td><td>Education, criminal law, CrPC, CPC, price control, population control</td><td>47 → 52</td></tr></tbody></table>
      <div class="cp-note remember">The <b>42nd Amendment (1976)</b> moved 5 subjects from the State List to the Concurrent List: Forests, Education, Weights &amp; Measures, Protection of Wild Animals &amp; Birds, Administration of Justice.</div>
      <div class="cp-mnemonic"><b>FEWWA</b> — Forests, Education, Weights &amp; measures, Wild animals, Administration of justice</div>
      <div class="cp-note exam"><b>Residuary powers (Art. 248):</b> subjects in no List rest with <b>Parliament</b> — e.g. Service Tax (1994).</div>
    `
  },
  6: {
    questext: "How many subjects does the Union List have at present?",
    options: ["100", "97", "66", "52"],
    correct: "1",
    exptext: "✅ 100 (originally 97). 📌 State List 66 to 61; Concurrent 47 to 52. ❌ 97 is the original figure."
  },
  7: {
    questext: "Which of these was NOT moved from the State List to the Concurrent List by the 42nd Amendment (1976)?",
    options: ["Forests", "Education", "Public order", "Weights and Measures"],
    correct: "3",
    exptext: "✅ Public order stays in the State List. 📌 Moved: Forests, Education, Weights and Measures, Wild Animals, Justice. ❌ The others were moved."
  },
  8: {
    questext: "Under Article 248, subjects not mentioned in any List rest with:",
    options: ["State Legislatures", "Both equally", "Parliament", "Supreme Court"],
    correct: "3",
    exptext: "✅ Parliament holds residuary powers. 📌 Service Tax (1994) was assigned to the Union this way. ❌ States get only State List subjects."
  },
  9: {
    questext: "Which of the following is in the Concurrent List?",
    options: ["Criminal law", "Police", "Railways", "Prisons"],
    correct: "1",
    exptext: "✅ Criminal law (with CrPC and CPC) is Concurrent. 📌 Police and prisons are State; railways Union."
  },
  10: {
    type: "concept", icon: "⚖️", accent: "#ef4444", pauseTimer: true,
    title: "Principles of Interpretation of the Lists",
    html: `
      <p class="cp-lead">When Union and State laws overlap, the <b>Supreme Court</b> uses four principles to settle the dispute.</p>
      <table><thead><tr><th>Principle</th><th>Meaning</th></tr></thead><tbody><tr><td>Federal Supremacy</td><td>If a Union and a State law clash, the Parliamentary law prevails</td></tr><tr><td>Pith &amp; Substance</td><td>A law substantially within its own field but slightly touching another’s is valid</td></tr><tr><td>Colourable Legislation</td><td>What a legislature cannot do directly, it cannot do indirectly — the law is void</td></tr><tr><td>Repugnancy</td><td>If Parliament has made a complete law on a Concurrent subject, a State law on it is void</td></tr></tbody></table>
      <div class="cp-note exam"><b>Article 254:</b> on a Concurrent subject a clashing State law is void to the extent of inconsistency. <u>Exception:</u> a State law reserved for the President and given his assent prevails in that State.</div>
      <div class="cp-note trap"><b>Pith &amp; Substance</b> saves a law with a small encroachment; <b>Colourable Legislation</b> strikes down an indirect attempt.</div>
    `
  },
  11: {
    questext: "A law that is substantially within the State’s own field but slightly touches a Union subject is held valid under the doctrine of:",
    options: ["Federal Supremacy", "Repugnancy", "Colourable Legislation", "Pith and Substance"],
    correct: "4",
    exptext: "✅ Pith and Substance. 📌 Look at the true nature of the law. ❌ Colourable Legislation is the opposite: it voids indirect attempts."
  },
  12: {
    questext: "A law that indirectly does what the legislature cannot do directly is void under the doctrine of:",
    options: ["Pith and Substance", "Colourable Legislation", "Federal Supremacy", "Repugnancy"],
    correct: "2",
    exptext: "✅ Colourable Legislation. 📌 Cannot do directly, cannot do indirectly. ❌ Pith and Substance saves laws with only incidental encroachment."
  },
  13: {
    questext: "Under Article 254, a State law that clashes with a Union law on a Concurrent subject can still prevail if:",
    options: ["The Governor signs it", "The Supreme Court approves it", "Rajya Sabha passes a resolution", "It was reserved for the President and received his assent"],
    correct: "4",
    exptext: "✅ Presidential assent to a reserved State law lets it prevail in that State. 📌 Otherwise the Union law wins."
  },
  14: {
    type: "concept", icon: "🔓", accent: "#8b5cf6", pauseTimer: true,
    title: "When Parliament Can Legislate on the State List",
    html: `
      <p class="cp-lead">Normally only States legislate on the State List, but Parliament may do so in <b>five situations</b>.</p>
      <table><thead><tr><th>Article</th><th>Situation</th><th>Key point</th></tr></thead><tbody><tr><td>249</td><td>Rajya Sabha resolution (national interest)</td><td>Valid up to 1 year, renewable 1 year at a time</td></tr><tr><td>250</td><td>National Emergency</td><td>Laws cease 6 months after the Emergency ends</td></tr><tr><td>252</td><td>Consent of 2 or more States</td><td>Applies only to those States; only Parliament can amend</td></tr><tr><td>253</td><td>International agreements</td><td>To implement any treaty or convention</td></tr><tr><td>356</td><td>President’s Rule</td><td>State powers vest in the Union; laws continue until repealed</td></tr></tbody></table>
      <div class="cp-note remember"><b>Art. 252</b> examples: Wildlife (Protection) Act 1972, Water Act 1974, Human Organs Act 1994.</div>
      <div class="cp-mnemonic"><b>249 · 250 · 252 · 253 · 356</b> — RS, Emergency, Consent, Treaty, President’s Rule</div>
    `
  },
  15: {
    questext: "A Rajya Sabha resolution under Article 249 lets Parliament legislate on a State List subject for at most:",
    options: ["6 months", "1 year", "2 years", "3 years"],
    correct: "2",
    exptext: "✅ 1 year at a time, renewable. 📌 Art. 249 = Rajya Sabha, national interest. ❌ 6 months is the Art. 250 limit after Emergency."
  },
  16: {
    questext: "Laws made by Parliament on the State List during a National Emergency (Art. 250) cease after the Emergency ends within:",
    options: ["1 month", "3 months", "6 months", "1 year"],
    correct: "3",
    exptext: "✅ 6 months after the Emergency ceases. 📌 Art. 250 = Emergency. ❌ 1 year is the Art. 249 period."
  },
  17: {
    questext: "Which Act was passed by Parliament under Article 252 (consent of States)?",
    options: ["Water (Prevention and Control of Pollution) Act, 1974", "Environment (Protection) Act, 1986", "Information Technology Act, 2000", "Right to Education Act, 2009"],
    correct: "1",
    exptext: "✅ The Water Act 1974 (also Wildlife Act 1972, Human Organs Act 1994). ❌ The Environment Act 1986 rests on Art. 253 (treaty)."
  },
  18: {
    questext: "Parliament can legislate on a State List subject in all of these cases EXCEPT:",
    options: ["A request by the Governor alone", "A Rajya Sabha resolution", "Consent of two or more States", "Implementing an international treaty"],
    correct: "1",
    exptext: "✅ A Governor’s request alone gives no power. 📌 Valid routes: Arts. 249, 250, 252, 253, 356."
  },
  19: {
    type: "concept", icon: "🛡️", accent: "#14b8a6", pauseTimer: true,
    title: "Administrative Relations (Art. 256–263)",
    html: `
      <p class="cp-lead">The Union can <b>direct the States</b>, and persistent non-compliance can end in <u>President’s Rule</u>.</p>
      <div class="cp-note exam"><b>Article 365:</b> if a State fails to comply with Union directions, the President may hold that its government cannot be carried on as per the Constitution → the Union may invoke <b>Art. 356</b>.</div>
      <table><thead><tr><th>Office</th><th>Appointed by</th><th>Removed / controlled by</th></tr></thead><tbody><tr><td>Governor</td><td>President</td><td>Holds office during the President’s pleasure</td></tr><tr><td>Chief Minister</td><td>Governor</td><td>Holds office during the Governor’s pleasure</td></tr><tr><td>State PSC – Chairman &amp; Members</td><td>Governor</td><td>President</td></tr><tr><td>Joint State PSC – Chairman &amp; Members</td><td>President</td><td>President</td></tr></tbody></table>
      <div class="cp-note tip"><b>All India Services</b> are recruited and trained by the Union but serve under both Union and States — immediate control with the State, <u>ultimate control with the Union</u>. The <b>Indian Forest Service</b> (1966) is the third AIS; under <b>Art. 312</b> Parliament can create a new AIS on a <b>Rajya Sabha resolution</b>.</div>
    `
  },
  20: {
    questext: "The Indian Forest Service was created as the third All India Service in:",
    options: ["1947", "1951", "1966", "1976"],
    correct: "3",
    exptext: "✅ 1966. 📌 IAS and IPS came first, IFS third. ❌ Art. 312 lets Parliament create new AIS on a Rajya Sabha resolution."
  },
  21: {
    questext: "If a State fails to comply with Union directions (Art. 365), the President may:",
    options: ["Declare Financial Emergency", "Impose President’s Rule under Art. 356", "Declare National Emergency", "Dissolve Parliament"],
    correct: "2",
    exptext: "✅ Art. 365 can lead to President’s Rule under Art. 356. 📌 Non-compliance means State government cannot be carried on."
  },
  22: {
    questext: "The Chairman and Members of a State Public Service Commission are appointed and removed respectively by:",
    options: ["President; President", "Governor; Governor", "Chief Minister; Governor", "Governor; President"],
    correct: "4",
    exptext: "✅ Appointed by the Governor, removed by the President. ❌ Joint State PSC: both appointment and removal by the President."
  },
  23: {
    type: "concept", icon: "💰", accent: "#ec4899", pauseTimer: true,
    title: "Financial Relations (Art. 268–293)",
    html: `
      <p class="cp-lead">Financial relations follow the <b>Government of India Act, 1935</b>, and revenue sharing is recommended by the <u>Finance Commission</u>.</p>
      <table><thead><tr><th>Article</th><th>Provision (GST – 101st Amendment, 2016)</th></tr></thead><tbody><tr><td>246A</td><td>Centre levies CGST &amp; IGST; States levy SGST</td></tr><tr><td>268A</td><td>Service Tax — omitted after GST</td></tr><tr><td>269A</td><td>IGST on inter-State trade &amp; commerce (newly inserted)</td></tr><tr><td>271</td><td>Surcharge and Cess</td></tr></tbody></table>
      <div class="cp-note info"><b>IGST (Art. 269A)</b> is levied on <b>inter-State</b> transactions; on imports it is charged in addition to customs duty.</div>
      <div class="cp-note remember">After <b>1 July 2017</b> IGST on imports accrues to the <b>consuming State</b> — <u>States get a share from imports for the first time</u>; also on SEZs.</div>
    `
  },
  24: {
    questext: "The Goods and Services Tax (GST) was introduced by which Constitutional Amendment?",
    options: ["99th", "101st", "102nd", "100th"],
    correct: "2",
    exptext: "✅ The 101st Amendment Act, 2016. 📌 It inserted Arts. 246A and 269A. ❌ 99th relates to NJAC; 102nd to NCBC."
  },
  25: {
    questext: "Which statement about GST is correct?",
    options: ["The Centre levies SGST", "States levy IGST", "Service Tax continues under Art. 268A", "IGST on imports accrues to the consuming State"],
    correct: "4",
    exptext: "✅ After 1 July 2017 imports give States a share for the first time. ❌ States levy SGST; Art. 268A is omitted."
  },
  26: {
    questext: "Which Article, providing for Service Tax, was omitted after GST?",
    options: ["268A", "269A", "246A", "271"],
    correct: "1",
    exptext: "✅ Art. 268A (Service Tax) was omitted. 📌 269A is new and deals with IGST. ❌ 246A is the new GST power."
  },
  27: {
    type: "concept", icon: "📊", accent: "#3b82f6", pauseTimer: true,
    title: "Surcharge vs Cess (Art. 271)",
    html: `
      <p class="cp-lead">Both are extra levies imposed by Parliament, but <b>neither is shared with the States</b>.</p>
      <table><thead><tr><th>Basis</th><th>Surcharge</th><th>Cess</th></tr></thead><tbody><tr><td>Purpose</td><td>No specific purpose required</td><td>Levied for a specific purpose</td></tr><tr><td>Credited to</td><td>Consolidated Fund of India</td><td>Earmarked for a specific fund / purpose</td></tr><tr><td>Imposed by</td><td>Parliament (by law)</td><td>Parliament (by law)</td></tr><tr><td>States’ share</td><td>None</td><td>None</td></tr></tbody></table>
      <div class="cp-note tip">During <b>President’s Rule</b>, the State Budget is passed by <b>Parliament</b> (or by the President under its authority).</div>
      <div class="cp-note trap">Cess = <b>specific purpose</b>, earmarked; Surcharge = no specific purpose, goes to the Consolidated Fund of India.</div>
    `
  },
  28: {
    questext: "Which levy is earmarked for a specific purpose and not shared with the States?",
    options: ["Corporation tax", "Surcharge", "Cess", "Income tax"],
    correct: "3",
    exptext: "✅ Cess is for a specific purpose and not shared. 📌 Surcharge has no specific purpose but is also unshared."
  },
  29: {
    questext: "During President’s Rule in a State, the State Budget is passed by:",
    options: ["Parliament", "The Governor", "The State Legislature", "The Finance Commission"],
    correct: "1",
    exptext: "✅ Parliament (or the President under its authority). 📌 The State Legislature is suspended or dissolved."
  },
  30: {
    type: "concept", icon: "🔍", accent: "#f97316", pauseTimer: true,
    title: "Commissions on Centre–State Relations",
    html: `
      <p class="cp-lead">Two commissions reviewed Centre–State relations: <b>Sarkaria (1983)</b> and <b>Punchhi (2007)</b>.</p>
      <table><thead><tr><th>Basis</th><th>Sarkaria Commission</th><th>Punchhi Commission</th></tr></thead><tbody><tr><td>Year</td><td>1983</td><td>2007</td></tr><tr><td>Chairman</td><td>Justice R. S. Sarkaria (3-member)</td><td>Justice M. M. Punchhi (5-member)</td></tr><tr><td>Key points</td><td>No structural change needed; strong Union; consult the CM before appointing a Governor (amend Art. 155); Governor not removed before 5 years; permanent Inter-State Council (Art. 263)</td><td>Fixed 5-year Governor tenure; Governor limited to constitutional duties (not University Chancellor); President’s Rule (Art. 356) only as a last resort; review cesses &amp; surcharges</td></tr><tr><td>Report</td><td>1988</td><td>2010 (7 volumes)</td></tr></tbody></table>
      <div class="cp-note trap"><b>Sarkaria = 3 members, 1983. Punchhi = 5 members, 2007.</b></div>
    `
  },
  31: {
    questext: "The commission that recommended a permanent Inter-State Council (Art. 263) was chaired by:",
    options: ["M. M. Punchhi", "B. G. Kher", "R. S. Sarkaria", "S. Balakrishnan"],
    correct: "3",
    exptext: "✅ Justice R. S. Sarkaria (1983). 📌 The Council was set up in 1990. ❌ Punchhi’s commission was set up in 2007."
  },
  32: {
    questext: "The Punchhi Commission submitted its report in 2010 in how many volumes?",
    options: ["3", "5", "9", "7"],
    correct: "4",
    exptext: "✅ Seven volumes. 📌 The Commission had 5 members and began in 2007."
  },
  33: {
    type: "concept", icon: "🤝", accent: "#84cc16", pauseTimer: true,
    title: "Coordination Bodies & River Water Disputes",
    html: `
      <p class="cp-lead">The Constitution provides bodies to settle <b>Union–State</b> and <b>inter-State</b> disputes.</p>
      <table><thead><tr><th>Body</th><th>Article</th><th>Key facts</th></tr></thead><tbody><tr><td>Inter-State Council</td><td>263</td><td>President may establish it to resolve Union–State disputes; set up May 1990 on Sarkaria’s recommendation</td></tr><tr><td>River Water Tribunal</td><td>262</td><td>Parliament may set up a Tribunal; decision becomes binding after Gazette publication (force of a Supreme Court decree)</td></tr></tbody></table>
      <table><thead><tr><th>Tribunal</th><th>Year</th><th>States involved</th></tr></thead><tbody><tr><td>Krishna</td><td>1969</td><td>Karnataka, Andhra Pradesh, Maharashtra</td></tr><tr><td>Godavari</td><td>1969</td><td>Karnataka, AP, Maharashtra, Odisha, Madhya Pradesh</td></tr><tr><td>Narmada</td><td>1969</td><td>Rajasthan, Gujarat, Madhya Pradesh, Maharashtra</td></tr><tr><td>Ravi &amp; Beas</td><td>1986</td><td>Punjab, Haryana, Rajasthan</td></tr><tr><td>Cauvery</td><td>1990</td><td>Karnataka, Kerala, Tamil Nadu, Puducherry</td></tr><tr><td>Mahadayi (Mandovi)</td><td>2010</td><td>Goa, Karnataka, Maharashtra</td></tr></tbody></table>
      <div class="cp-note remember">Two Acts of 1956: <b>River Boards Act</b> and <b>Inter-State River Water Disputes Act</b>. <b>2002 Amendment:</b> Tribunal within <b>1 year</b> of a complaint; decision within <b>3 years</b> (extendable by 2 more).</div>
    `
  },
  34: {
    questext: "Under the 2002 amendment, a river water Tribunal must give its decision within:",
    options: ["1 year", "3 years, extendable by 2 more", "5 years", "10 years"],
    correct: "2",
    exptext: "✅ 3 years, extendable by 2 more. 📌 1 year is the limit to constitute the Tribunal after a complaint."
  },
  35: {
    questext: "Which State was NOT a party to the Cauvery Water Disputes Tribunal (1990)?",
    options: ["Andhra Pradesh", "Karnataka", "Kerala", "Puducherry"],
    correct: "1",
    exptext: "✅ Andhra Pradesh. 📌 Cauvery: Karnataka, Kerala, Tamil Nadu, Puducherry. ❌ AP is in Krishna and Godavari."
  },
  36: {
    questext: "Which Article empowers Parliament to provide for adjudication of inter-State river water disputes?",
    options: ["263", "280", "262", "356"],
    correct: "3",
    exptext: "✅ Art. 262. 📌 Art. 263 is the Inter-State Council. ❌ Art. 280 is the Finance Commission."
  },
  37: {
    type: "concept", icon: "🧭", accent: "#06b6d4", pauseTimer: true,
    title: "Extra-Constitutional Bodies",
    html: `
      <p class="cp-lead">Zonal Councils and the North-Eastern Council are <b>statutory</b> bodies, not created by the Constitution.</p>
      <table><thead><tr><th>Body</th><th>Law</th><th>Key facts</th></tr></thead><tbody><tr><td>Zonal Councils</td><td>States Reorganisation Act, 1956</td><td>Five zones; Lakshadweep &amp; Andaman-Nicobar are in no zone; Chairperson: Union Home Minister</td></tr><tr><td>North-Eastern Council</td><td>NE Council Act, 1971 (came into being 1972)</td><td>HQ Shillong; initially 7 States; Sikkim added as the 8th (2002)</td></tr></tbody></table>
      <div class="cp-note trap">The Inter-State Council (Art. 263) is <b>constitutional</b>; Zonal Councils and the NEC are <b>statutory</b>.</div>
    `
  },
  38: {
    questext: "Who is the Chairperson of the Zonal Councils?",
    options: ["Prime Minister", "President", "Vice-President", "Union Home Minister"],
    correct: "4",
    exptext: "✅ The Union Home Minister. 📌 Zonal Councils come from the States Reorganisation Act, 1956, with five zones."
  },
  39: {
    questext: "Which State was added as the 8th member of the North-Eastern Council in 2002?",
    options: ["West Bengal", "Sikkim", "Bihar", "Odisha"],
    correct: "2",
    exptext: "✅ Sikkim (2002). 📌 NEC: Act of 1971, HQ Shillong, initially 7 States."
  },
  40: {
    type: "concept", icon: "🗣️", accent: "#a855f7", pauseTimer: true,
    title: "Provisions Related to Languages",
    html: `
      <p class="cp-lead"><b>Part XVII</b> (Articles <b>343–351</b>) deals with the <u>Official Language</u>.</p>
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>343</td><td>Official language of the Union: Hindi in Devanagari script; English allowed for 15 years (1950–1965)</td></tr><tr><td>344</td><td>President sets up a Commission and a Parliamentary Committee on official language</td></tr><tr><td>345</td><td>Language of a State</td></tr></tbody></table>
      <div class="cp-note remember"><b>Kher Commission (1955)</b>, head B. G. Kher; <b>G. B. Pant Committee (1957)</b>. The <b>Official Languages Act, 1963</b> allowed continued use of English even after 1965.</div>
      <div class="cp-note trap">The 15-year period of Art. 343(2) ended in 1965, yet English continues because of the 1963 Act.</div>
    `
  },
  41: {
    questext: "The official language of the Union under Article 343 is:",
    options: ["Hindi in Devanagari script", "English", "Sanskrit", "Hindustani in Urdu script"],
    correct: "1",
    exptext: "✅ Hindi in Devanagari script. 📌 English was allowed for 15 years (1950–1965). ❌ Sanskrit is a classical language, not the Union language."
  },
  42: {
    questext: "The Official Language Commission (1955) was headed by:",
    options: ["G. B. Pant", "R. S. Sarkaria", "B. G. Kher", "M. M. Punchhi"],
    correct: "3",
    exptext: "✅ B. G. Kher. 📌 Pant headed the Parliamentary Committee (1957). ❌ Sarkaria and Punchhi dealt with Centre–State relations."
  },
  43: {
    questext: "Which of the following pairs is correct?",
    options: ["Art. 343 – Language of a State", "Art. 344 – Language of the High Courts", "Art. 345 – Official language of the Union", "Art. 344 – Commission and Committee on official language"],
    correct: "4",
    exptext: "✅ Art. 344 provides a Commission and a Parliamentary Committee. 📌 Art. 343 Union language; Art. 345 State language."
  },
  44: {
    type: "concept", icon: "🧑‍⚖️", accent: "#e11d48", pauseTimer: true,
    title: "Language of Courts & Linguistic Minorities",
    html: `
      <p class="cp-lead">Two Articles decide the <b>language of the courts</b> and protect <b>linguistic minorities</b>.</p>
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>348</td><td>Language of the Supreme Court and High Courts: English until Parliament by law provides otherwise</td></tr><tr><td>350B</td><td>Special Officer for linguistic minorities</td></tr></tbody></table>
      <div class="cp-note exam"><b>Art. 348</b> = courts and laws in <b>English</b>; <b>Art. 350B</b> = Special Officer, appointed by the President.</div>
    `
  },
  45: {
    questext: "Until Parliament provides otherwise by law, the language of the Supreme Court and High Courts is:",
    options: ["Hindi", "English", "The language of the State concerned", "Sanskrit"],
    correct: "2",
    exptext: "✅ English (Art. 348). 📌 Parliament can change it by law."
  },
  46: {
    questext: "The Special Officer for linguistic minorities is provided in:",
    options: ["Article 350B", "Article 345", "Article 348", "Article 343"],
    correct: "1",
    exptext: "✅ Art. 350B. 📌 Art. 345 is State language; Art. 348 is court language."
  },
  47: {
    type: "concept", icon: "📚", accent: "#10b981", pauseTimer: true,
    title: "8th Schedule",
    html: `
      <p class="cp-lead">The <b>Eighth Schedule</b> lists the recognised languages: originally <b>14</b>, now <b>22</b>.</p>
      <table><thead><tr><th>Amendment</th><th>Language(s) added</th></tr></thead><tbody><tr><td>21st Amendment, 1967</td><td>Sindhi</td></tr><tr><td>71st Amendment, 1992</td><td>Konkani, Manipuri, Nepali</td></tr><tr><td>92nd Amendment, 2003</td><td>Maithili, Dogri, Bodo, Santhali</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>21 → S</b>indhi · <b>71 → K-M-N</b> · <b>92 → M-D-B-S</b></div>
      <div class="cp-note trap">The Eighth Schedule (22 languages) is a different list from <b>classical languages</b>.</div>
    `
  },
  48: {
    questext: "How many languages are in the Eighth Schedule at present?",
    options: ["14", "18", "22", "24"],
    correct: "3",
    exptext: "✅ 22 (originally 14). 📌 Sindhi, three in 1992, four in 2003 were added."
  },
  49: {
    questext: "Sindhi was added to the Eighth Schedule by the:",
    options: ["42nd Amendment", "71st Amendment", "92nd Amendment", "21st Amendment"],
    correct: "4",
    exptext: "✅ 21st Amendment, 1967. ❌ 71st added Konkani, Manipuri, Nepali; 92nd added four others."
  },
  50: {
    questext: "Which language was added to the Eighth Schedule by the 71st Amendment (1992)?",
    options: ["Bodo", "Nepali", "Santhali", "Dogri"],
    correct: "2",
    exptext: "✅ Nepali (with Konkani, Manipuri). ❌ Bodo, Santhali and Dogri came in 2003 (92nd)."
  },
  51: {
    type: "concept", icon: "🏺", accent: "#eab308", pauseTimer: true,
    title: "Classical Languages",
    html: `
      <p class="cp-lead">The <b>Ministry of Culture</b> grants the status of a <u>Classical Language</u>.</p>
      <table><thead><tr><th>Language</th><th>Year</th></tr></thead><tbody><tr><td>Tamil</td><td>2004</td></tr><tr><td>Sanskrit</td><td>2005</td></tr><tr><td>Telugu</td><td>2008</td></tr><tr><td>Kannada</td><td>2008</td></tr><tr><td>Malayalam</td><td>2013</td></tr><tr><td>Odia</td><td>2014</td></tr><tr><td>Assamese, Marathi, Pali, Prakrit, Bengali</td><td>2024</td></tr></tbody></table>
      <div class="cp-note exam"><b>Tamil</b> was the <u>first</u> classical language (2004). Five more joined together in <b>2024</b>.</div>
    `
  },
  52: {
    questext: "Which was the first language to be declared a Classical Language?",
    options: ["Sanskrit", "Telugu", "Tamil", "Kannada"],
    correct: "3",
    exptext: "✅ Tamil (2004). 📌 Sanskrit 2005; Telugu and Kannada 2008."
  },
  53: {
    questext: "Which of the following received Classical Language status in 2024?",
    options: ["Marathi", "Telugu", "Odia", "Malayalam"],
    correct: "1",
    exptext: "✅ Marathi (with Assamese, Pali, Prakrit, Bengali). ❌ Telugu 2008, Malayalam 2013, Odia 2014."
  },
  54: {
    type: "concept", icon: "🚨", accent: "#0ea5e9", pauseTimer: true,
    title: "Emergency Provisions",
    html: `
      <p class="cp-lead">Emergency provisions are in <b>Part XVIII</b> (Articles <b>352–360</b>), borrowed from the <u>Weimar Constitution of Germany</u>.</p>
      <table><thead><tr><th>Type</th><th>Article</th><th>Proclaimed by</th></tr></thead><tbody><tr><td>National Emergency</td><td>352</td><td>President</td></tr><tr><td>President’s Rule (State Emergency)</td><td>356</td><td>President</td></tr><tr><td>Financial Emergency</td><td>360</td><td>President</td></tr></tbody></table>
      <div class="cp-note trap">Part XVII is Languages; Emergency is <b>Part XVIII</b> — do not mix them.</div>
    `
  },
  55: {
    questext: "Emergency provisions are contained in which Part of the Constitution?",
    options: ["Part XI", "Part XVIII", "Part XVII", "Part XII"],
    correct: "2",
    exptext: "✅ Part XVIII (Arts. 352–360). ❌ Part XVII is Languages; Part XI is Centre–State legislative and administrative relations."
  },
  56: {
    questext: "Financial Emergency is provided in Article:",
    options: ["352", "356", "365", "360"],
    correct: "4",
    exptext: "✅ Art. 360. 📌 352 National Emergency; 356 President’s Rule. ❌ 365 is failure to comply with directions."
  },
  57: {
    type: "concept", icon: "🔥", accent: "#d946ef", pauseTimer: true,
    title: "National Emergency",
    html: `
      <p class="cp-lead">A <b>National Emergency</b> (Art. 352) is proclaimed by the President and needs Parliament’s approval by a <u>special majority</u> within <b>1 month</b>.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Proclaimed by</td><td>President (Art. 352)</td></tr><tr><td>Parliament approval</td><td>Special majority, within 1 month (44th Amendment)</td></tr><tr><td>Duration</td><td>6 months at a time; Parliament can renew it again and again</td></tr><tr><td>Revoked by</td><td>President; Lok Sabha can force revocation by a simple-majority resolution</td></tr><tr><td>Fundamental Rights</td><td>Art. 358: Art. 19 suspended automatically (war / external aggression); Art. 359: President suspends other rights except Arts. 20 &amp; 21</td></tr><tr><td>Imposed so far</td><td>1962–1968; 1971–1977; 1975–March 1977</td></tr></tbody></table>
      <div class="cp-note trap"><b>Arts. 20 and 21</b> can never be suspended, even during a National Emergency.</div>
    `
  },
  58: {
    questext: "Parliament must approve a proclamation of National Emergency within:",
    options: ["2 months", "6 months", "1 month", "1 year"],
    correct: "3",
    exptext: "✅ 1 month (44th Amendment). 📌 President’s Rule and Financial Emergency need 2 months. ❌ 6 months is the validity period."
  },
  59: {
    questext: "Which Fundamental Rights can NEVER be suspended during a National Emergency?",
    options: ["Articles 20 and 21", "Articles 14 and 19", "Articles 19 and 21", "Articles 15 and 16"],
    correct: "1",
    exptext: "✅ Arts. 20 and 21. 📌 Art. 19 falls automatically under Art. 358 in war or external aggression."
  },
  60: {
    questext: "In which year was a National Emergency declared on the ground of internal disturbance?",
    options: ["1962", "1965", "1971", "1975"],
    correct: "4",
    exptext: "✅ 1975 (till March 1977). 📌 1962 and 1971 were wars with China and Pakistan."
  },
  61: {
    questext: "Once approved by Parliament, a National Emergency continues for:",
    options: ["6 months in total", "6 months at a time, renewable any number of times", "1 year", "3 years"],
    correct: "2",
    exptext: "✅ Each approval lasts 6 months and can be renewed repeatedly. 📌 The 3-year maximum belongs to President’s Rule."
  },
  62: {
    type: "concept", icon: "🏴", accent: "#64748b", pauseTimer: true,
    title: "President Rule",
    html: `
      <p class="cp-lead"><b>President’s Rule</b> (Art. 356) is imposed when the constitutional machinery of a State fails.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Imposed by</td><td>President, on the report of the Governor</td></tr><tr><td>Parliament approval</td><td>Within 2 months; simple majority</td></tr><tr><td>Duration</td><td>6 months; can be extended to 1 year; maximum 3 years</td></tr></tbody></table>
      <div class="cp-note exam">One ground is <b>Art. 365</b> — failure to comply with Union directions.</div>
      <div class="cp-note trap">National Emergency needs a <b>special majority</b> in 1 month; President’s Rule needs a <b>simple majority</b> in 2 months.</div>
    `
  },
  63: {
    questext: "The maximum duration of President’s Rule in a State is:",
    options: ["1 year", "2 years", "3 years", "5 years"],
    correct: "3",
    exptext: "✅ 3 years. 📌 First 6 months, then extensions up to 1 year at a time within this limit."
  },
  64: {
    questext: "Which statement about President’s Rule is correct?",
    options: ["It needs a special majority within 1 month", "It needs a simple majority within 1 month", "It needs a special majority within 2 months", "It needs a simple majority within 2 months"],
    correct: "4",
    exptext: "✅ Simple majority within 2 months. 📌 Special majority and 1 month apply to National Emergency."
  },
  65: {
    questext: "Parliamentary approval within 2 months by simple majority is required for:",
    options: ["National Emergency only", "President’s Rule and Financial Emergency", "National Emergency and Financial Emergency", "All three Emergencies"],
    correct: "2",
    exptext: "✅ President’s Rule and Financial Emergency. ❌ National Emergency needs a special majority within 1 month."
  },
  66: {
    type: "concept", icon: "💼", accent: "#fb7185", pauseTimer: true,
    title: "Financial Emergency",
    html: `
      <p class="cp-lead">A <b>Financial Emergency</b> (Art. 360) is proclaimed by the President if India’s financial stability is threatened.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Article</td><td>360, by the President</td></tr><tr><td>Parliament approval</td><td>Consent within 2 months; simple majority</td></tr><tr><td>Revocation</td><td>President can revoke at any time</td></tr></tbody></table>
      <div class="cp-note trap">Same 2-month, simple-majority rule as President’s Rule — unlike National Emergency (1 month, special majority).</div>
    `
  },
  67: {
    questext: "A proclamation of Financial Emergency must be approved by Parliament within 2 months by:",
    options: ["A simple majority", "A special majority", "Lok Sabha alone", "Two-thirds of the States"],
    correct: "1",
    exptext: "✅ Simple majority within 2 months. 📌 The President can revoke it at any time."
  },
  68: {
    type: "concept", icon: "📌", accent: "#2dd4bf", pauseTimer: true,
    title: "Other Important Articles",
    html: `
      <p class="cp-lead">Four Articles are the <b>backbone</b> of Emergency questions: <u>355, 358, 359 and 365</u>.</p>
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>355</td><td>Union’s duty to protect States against external aggression and internal disturbance</td></tr><tr><td>358</td><td>Automatic suspension of Art. 19 during a National Emergency on war / external aggression</td></tr><tr><td>359</td><td>President orders suspension of enforcement of Fundamental Rights (except Arts. 20 &amp; 21)</td></tr><tr><td>365</td><td>Failure to comply with Union directions → State government cannot be carried on</td></tr></tbody></table>
      <div class="cp-note trap"><b>Art. 358 is automatic</b> (only Art. 19); <b>Art. 359 needs a Presidential order</b>.</div>
    `
  },
  69: {
    questext: "Which Article puts a duty on the Union to protect States against external aggression and internal disturbance?",
    options: ["352", "356", "365", "355"],
    correct: "4",
    exptext: "✅ Art. 355. 📌 It is the base for using Arts. 352 and 356."
  },
  70: {
    questext: "Which Article provides for automatic suspension of Fundamental Rights during a National Emergency on the ground of war or external aggression?",
    options: ["359", "355", "358", "360"],
    correct: "3",
    exptext: "✅ Art. 358 suspends Art. 19 automatically. ❌ Art. 359 needs a Presidential order."
  },
  71: {
    questext: "Which statement is correct?",
    options: ["Art. 358 operates automatically, Art. 359 needs a Presidential order", "Art. 359 operates automatically", "Both operate automatically", "Both need a resolution of Parliament"],
    correct: "1",
    exptext: "✅ Art. 358 is automatic; Art. 359 is by order of the President."
  },
  72: {
    type: "concept", icon: "🏙️", accent: "#c026d3", pauseTimer: true,
    title: "Governance of Union Territories (Art. 239–241)",
    html: `
      <p class="cp-lead"><b>Part VIII</b> (Articles <b>239–241</b>) covers UT administration — by the <u>President</u> through an appointed <b>Administrator</b>.</p>
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>239</td><td>Administration of Union Territories</td></tr><tr><td>239(2)</td><td>President may appoint a State Governor as Administrator of an adjoining UT</td></tr><tr><td>239A</td><td>Local legislature / Council of Ministers for certain UTs (14th Amendment, 1962)</td></tr><tr><td>239AA</td><td>Special provisions for NCT of Delhi (69th Amendment, 1991)</td></tr><tr><td>239AB</td><td>When constitutional machinery fails in NCT Delhi</td></tr><tr><td>239B</td><td>Administrator’s power to promulgate Ordinances (27th Amendment, 1971)</td></tr><tr><td>240</td><td>President’s power to make regulations for certain UTs</td></tr><tr><td>241</td><td>High Courts for UTs (e.g. Delhi HC, 1966)</td></tr></tbody></table>
      <div class="cp-note info">After the 14th Amendment, Parliament passed the <b>Government of UTs Act, 1963</b>, giving legislatures to UTs like Puducherry.</div>
    `
  },
  73: {
    questext: "Article 239A, providing for local legislatures in certain UTs, was added by the:",
    options: ["7th Amendment", "14th Amendment", "27th Amendment", "69th Amendment"],
    correct: "2",
    exptext: "✅ 14th Amendment, 1962. 📌 Then the Government of UTs Act, 1963. ❌ 69th added Arts. 239AA and 239AB."
  },
  74: {
    questext: "The Administrator’s power to promulgate Ordinances (Art. 239B) was added by the:",
    options: ["14th Amendment", "42nd Amendment", "27th Amendment", "69th Amendment"],
    correct: "3",
    exptext: "✅ 27th Amendment, 1971. ❌ 14th gave legislatures; 69th dealt with Delhi."
  },
  75: {
    questext: "Under Article 239(2), the President may appoint ___ as the Administrator of an adjoining Union Territory.",
    options: ["A retired High Court judge", "The Prime Minister", "The Lok Sabha Speaker", "A State Governor"],
    correct: "4",
    exptext: "✅ A State Governor. 📌 UTs are administered by the President through an Administrator."
  },
  76: {
    type: "concept", icon: "🌆", accent: "#b45309", pauseTimer: true,
    title: "Special Provisions for Delhi",
    html: `
      <p class="cp-lead">Delhi got an Assembly in <b>1952</b>, abolished in <b>1956</b>; the <b>Balakrishnan Committee (1987)</b> led to the <b>69th Amendment, 1991</b> and the <b>GNCTD Act, 1991</b>.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Articles</td><td>239AA &amp; 239AB (69th Amendment, 1991)</td></tr><tr><td>Legislative competence</td><td>State &amp; Concurrent subjects EXCEPT Public Order (Entry 1), Police (Entry 2), Land (Entry 18)</td></tr><tr><td>CM &amp; ministers</td><td>CM appointed by the President; other ministers by the President on the CM’s advice; all hold office during the President’s pleasure</td></tr><tr><td>Reservation</td><td>SCs yes; STs none (Delhi has no notified ST population)</td></tr></tbody></table>
      <div class="cp-note trap">Puducherry’s Assembly <b>has</b> all three powers (public order, police, land) that Delhi’s Assembly lacks.</div>
    `
  },
  77: {
    questext: "The Balakrishnan Committee (1987) led to which Constitutional Amendment?",
    options: ["69th Amendment, 1991", "42nd Amendment", "73rd Amendment", "101st Amendment"],
    correct: "1",
    exptext: "✅ 69th Amendment, 1991 (Arts. 239AA and 239AB) and the GNCTD Act, 1991."
  },
  78: {
    questext: "The Delhi Assembly CANNOT legislate on which of the following State List subjects?",
    options: ["Education", "Health", "Police", "Agriculture"],
    correct: "3",
    exptext: "✅ Police (Entry 2). 📌 The excluded three: Public Order, Police, Land."
  },
  79: {
    questext: "Which statement about the Delhi Assembly is correct?",
    options: ["The CM is appointed by the Lieutenant Governor", "It has reservation for SCs but none for STs", "Ministers hold office during the LG’s pleasure", "It has existed continuously since 1952"],
    correct: "2",
    exptext: "✅ SC reservation only; no notified ST population. ❌ The CM is appointed by the President; the Assembly was abolished in 1956."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Centre_State_Relations_and_Emergency_Provisions/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a brushed-metal scales of justice, a closed leather-bound book and a gold fountain pen" }
});

/* CHANGE LOG
   - GST table: Parliament’s power to levy CGST/IGST is under Art. 246A (book printed Art. 246).
   - National Emergency: Parliament must approve within 1 month (44th Amendment); the book also listed the old 2 months.
   - National Emergency duration: each approval lasts 6 months and can be renewed any number of times; there is no 6-month maximum.
   - Art. 358 suspends only Art. 19 automatically (war/external aggression); other rights except Arts. 20 and 21 are suspended by Presidential order under Art. 359.
   - Emergency provisions are borrowed from the Weimar Constitution of Germany (book said GoI Act 1935).
   - Parliament can legislate on the State List in five situations (book listed a sixth, institutions of national importance, which is not a State List situation).
   - Punchhi Commission: Art. 356 as a last resort (book printed Arts. 352 and 356).
   - Languages: Part XVII covers Arts. 343–351 (book printed 343–35); Telgu corrected to Telugu.
   - Chief Minister holds office during the Governor’s pleasure (book said removed by the Governor).
   - Removed the unclear note on USA powers and the garbled Art. 365 lines (President can revoke anytime / Parliament consent X).
*/