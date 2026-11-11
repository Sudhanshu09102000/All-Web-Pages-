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

/* Subject: General_Awareness/Polity · Chapter: President_of_India · 22 concept pages (+ overview) · 67 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — President of India",
    thumb: {
      image: "images/General_Awareness/Polity/President_of_India/thumbnail.png",
      banner: "SSC CGL • UPSC • ALL EXAMS",
      line1: "PRESIDENT",
      line2: "OF INDIA",
      line3: "ARTICLES 52–62",
      badge: "FULL CLASS",
      ribbon: "POLITY • POWERS • VETO",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "President of India | Election, Powers, Veto, Ordinance, Pardon | Polity SSC CGL UPSC",
      altTitles: ["President of India Full Polity Class", "Veto Power and Ordinance Article 123 Explained"],
      description: "The President of India is a high-scoring polity topic. In this full class we cover the election (Article 54-55), vote values, qualifications, impeachment (Article 61), vacancy, executive, legislative, financial, judicial and emergency powers, types of veto, ordinance-making power (Article 123) and pardoning power (Article 72).\n\n📌 IN THIS CLASS\n✅ Election and vote value\n✅ Impeachment procedure\n✅ Types of veto\n✅ Ordinance and pardons\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #PresidentOfIndia #SSCCGL",
      tags: ["President of India", "Article 52 to 62", "election of President", "electoral college", "vote value MLA MP", "impeachment of President", "Article 61", "powers of President", "veto power", "pocket veto", "ordinance Article 123", "pardoning power Article 72", "Article 111", "polity for SSC CGL", "polity for all exams", "Indian polity", "Union executive", "emergency powers", "polity MCQ", "polity tricks", "General Awareness", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "President of India MCQ"],
      hashtags: ["Polity", "PresidentOfIndia", "SSCCGL", "IndianPolity"],
      thumbText: "PRESIDENT OF INDIA",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New polity class is live: President of India. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Polity — Full Classes for All Exams"
    },
    html: `
      <p class="cp-lead">A <u>complete fast-track on the President — election, qualifications, impeachment, powers, veto, ordinances and pardons</u> (Articles 52–62, 72, 111, 123).</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>22</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>67</b><span>Questions</span></div>
        <div class="cp-stat"><b>~111 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Election of the President</b><br>Electoral college, STV method, vote values and disputes.</li>
        <li><b>Term, Qualifications &amp; Oath</b><br>Articles 56–60 in one place.</li>
        <li><b>Impeachment &amp; Vacancy</b><br>Article 61 procedure and Article 62 rules.</li>
        <li><b>Powers &amp; Functions</b><br>Executive, legislative, financial, judicial, diplomatic, military, emergency.</li>
        <li><b>Veto Power</b><br>Absolute, suspensive, pocket veto and state bills.</li>
        <li><b>Ordinances &amp; Pardons</b><br>Article 123, Article 72 and President vs Governor.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> election method, vote values, impeachment numbers and veto types are asked directly in SSC, UPSC, Railways and State exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#22c55e", pauseTimer: true,
    title: "President of India — Position (Articles 52–53)",
    html: `
      <p class="cp-lead">The President is the <b>first citizen</b> and <b>Head of State</b>, a symbol of national unity, integrity and solidarity.</p>
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>Art. 52</td><td>Provides for the office of the President</td></tr><tr><td>Art. 53</td><td>President exercises executive powers directly or through subordinate officers</td></tr></tbody></table>
      <div class="cp-note trap">Executive powers are vested in the President but <b>actually exercised by the PM and Council of Ministers</b>.</div>
    `
  },
  3: {
    questext: "The office of the President of India is provided for in:",
    options: ["Article 52", "Article 62", "Article 74", "Article 79"],
    correct: "1",
    exptext: "✅ Article 52. 📌 52 = office. ❌ Article 74 is the Council of Ministers."
  },
  4: {
    questext: "The executive power of the Union is actually exercised by:",
    options: ["The President personally", "The PM and Council of Ministers", "The Chief Justice", "The Vice-President"],
    correct: "2",
    exptext: "✅ PM and Council of Ministers. 📌 President is nominal. ❌ Others hold no executive power."
  },
  5: {
    type: "concept", icon: "🗳️", accent: "#f59e0b", pauseTimer: true,
    title: "Election of the President (Article 54)",
    html: `
      <p class="cp-lead">Elected by an <b>Electoral College</b> — <u>indirect election</u>, not directly by the people.</p>
      <table><thead><tr><th>Electoral college consists of</th></tr></thead><tbody><tr><td>Elected members of both Houses of Parliament (Lok Sabha + Rajya Sabha)</td></tr><tr><td>Elected members of State Legislative Assemblies (Vidhan Sabhas)</td></tr><tr><td>Elected members of Legislative Assemblies of <b>Delhi and Puducherry</b> (added later)</td></tr></tbody></table>
      <div class="cp-note trap"><b>Nominated</b> members of Parliament and State Assemblies do <b>NOT</b> participate. Legislative Councils do not take part either.</div>
    `
  },
  6: {
    questext: "The President of India is elected by:",
    options: ["Direct vote of people", "An electoral college", "Lok Sabha only", "Parliament only"],
    correct: "2",
    exptext: "✅ Electoral college. 📌 Indirect election. ❌ Parliament alone is not the college."
  },
  7: {
    questext: "Which of the following does NOT participate in the election of the President?",
    options: ["Elected MPs", "Elected MLAs of states", "Nominated members of Parliament", "Elected MLAs of Delhi"],
    correct: "3",
    exptext: "✅ Nominated members are excluded. 📌 Only elected members vote. ❌ Delhi and Puducherry MLAs were added later."
  },
  8: {
    questext: "Elected members of the Legislative Assemblies of which UTs are included in the electoral college?",
    options: ["Delhi and Andaman", "Delhi and Chandigarh", "Puducherry and Lakshadweep", "Delhi and Puducherry"],
    correct: "4",
    exptext: "✅ Delhi and Puducherry. 📌 Only UTs with assemblies then. ❌ Others have no assembly."
  },
  9: {
    type: "concept", icon: "🧮", accent: "#ef4444", pauseTimer: true,
    title: "Method of Election (Article 55)",
    html: `
      <p class="cp-lead"><b>Proportional Representation</b> with the <b>Single Transferable Vote (STV)</b>; voting by <b>secret ballot</b>.</p>
      <table><thead><tr><th>Vote value</th><th>Formula</th></tr></thead><tbody><tr><td>MLA’s vote value</td><td>State population (1971 census) ÷ (Total elected MLAs × 1000)</td></tr><tr><td>MP’s vote value</td><td>Total value of all MLA votes ÷ Total elected MPs in Parliament</td></tr></tbody></table>
      <div class="cp-note trap">MLA vote value <b>differs from state to state</b>; MP vote value is the <b>same for all MPs</b>.</div>
    `
  },
  10: {
    questext: "The President is elected through:",
    options: ["Proportional Representation by STV", "First Past the Post", "List system", "Open ballot"],
    correct: "1",
    exptext: "✅ PR with Single Transferable Vote. 📌 Secret ballot. ❌ FPTP is for Lok Sabha."
  },
  11: {
    questext: "The vote value of all MPs is:",
    options: ["Different for each MP", "Based on constituency size", "The same for all MPs", "Based on party strength"],
    correct: "3",
    exptext: "✅ Same for all MPs. 📌 MLA value varies by state. ❌ Others are not used."
  },
  12: {
    questext: "An MLA's vote value is calculated as:",
    options: ["Population × MLAs ÷ 100", "Elected MLAs ÷ population", "Total MP votes ÷ MLAs", "Population ÷ (elected MLAs × 1000)"],
    correct: "4",
    exptext: "✅ State population ÷ (total elected MLAs × 1000). 📌 1971 census. ❌ Option 3 is the MP formula inverted."
  },
  13: {
    type: "concept", icon: "⚖️", accent: "#8b5cf6", pauseTimer: true,
    title: "Election Disputes",
    html: `
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Authority</td><td>All disputes are decided by the <b>Supreme Court</b> — decision is <b>final</b></td></tr><tr><td>Vacancy in Electoral College</td><td>Election <b>cannot be challenged</b> on this ground</td></tr><tr><td>Acts of the President</td><td>Acts done by a President whose election is later declared invalid <b>remain valid</b></td></tr></tbody></table>
    `
  },
  14: {
    questext: "Disputes regarding the election of the President are decided by the:",
    options: ["Supreme Court", "Election Commission", "High Court", "Parliament"],
    correct: "1",
    exptext: "✅ Supreme Court, final. 📌 Highest court. ❌ ECI conducts, not adjudicates."
  },
  15: {
    questext: "If the President's election is later declared invalid, the acts done by the President are:",
    options: ["Void", "Valid", "Reviewed by Parliament", "Reviewed by the CJI"],
    correct: "2",
    exptext: "✅ Remain valid. 📌 Protects governance. ❌ No reversal is required."
  },
  16: {
    type: "concept", icon: "⏳", accent: "#14b8a6", pauseTimer: true,
    title: "Term of Office & Re-election (Articles 56–57)",
    html: `
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Term (Art. 56)</td><td><b>5 years</b> from the date of assuming office</td></tr><tr><td>Resignation</td><td>Submitted to the <b>Vice-President</b></td></tr><tr><td>Removal</td><td>Before term by <b>impeachment</b></td></tr><tr><td>Re-election (Art. 57)</td><td>Can be elected <b>more than once</b> — no constitutional restriction</td></tr><tr><td>Notification</td><td>Issued by the <b>Election Commission</b></td></tr></tbody></table>
      <div class="cp-note trap">In the USA a President can be elected <b>maximum twice</b>.</div>
    `
  },
  17: {
    questext: "The President’s term of office is:",
    options: ["4 years", "6 years", "5 years", "Till 65 years"],
    correct: "3",
    exptext: "✅ 5 years from assuming office. 📌 Article 56. ❌ Tenure is not age-linked."
  },
  18: {
    questext: "The President submits resignation to the:",
    options: ["Prime Minister", "Chief Justice", "Speaker", "Vice-President"],
    correct: "4",
    exptext: "✅ Vice-President. 📌 Article 56. ❌ Others do not receive it."
  },
  19: {
    questext: "Regarding re-election of the President, the Constitution:",
    options: ["Permits only two terms", "Places no restriction", "Permits only one term", "Requires a break"],
    correct: "2",
    exptext: "✅ No restriction (Article 57). 📌 USA limits to two. ❌ Rajendra Prasad served twice."
  },
  20: {
    type: "concept", icon: "📝", accent: "#ec4899", pauseTimer: true,
    title: "Qualifications of the President (Article 58)",
    html: `
      <table><thead><tr><th>Condition</th><th>Rule</th></tr></thead><tbody><tr><td>Citizenship</td><td>Citizen of India</td></tr><tr><td>Age</td><td>Minimum <b>35 years</b></td></tr><tr><td>Eligibility</td><td>Qualified to be a member of the Lok Sabha</td></tr><tr><td>Office of profit</td><td>Must not hold any office of profit under the government</td></tr><tr><td>Nomination</td><td>Min. <b>50 proposers + 50 seconders</b></td></tr><tr><td>Security deposit</td><td><b>₹15,000</b> in RBI or Government Treasury</td></tr><tr><td>Forfeiture</td><td>If candidate gets less than <b>1/6</b> of total valid votes cast</td></tr></tbody></table>
      <div class="cp-note trap">President, VP, Governor or Minister is <b>NOT</b> regarded as holding an office of profit.</div>
    `
  },
  21: {
    questext: "The minimum age to become the President of India is:",
    options: ["35 years", "30 years", "25 years", "40 years"],
    correct: "1",
    exptext: "✅ 35 years. 📌 Same as Vice-President. ❌ 25 is Lok Sabha age."
  },
  22: {
    questext: "A candidate for President needs how many proposers and seconders?",
    options: ["10 and 10", "20 and 20", "50 and 50", "100 and 100"],
    correct: "3",
    exptext: "✅ 50 proposers and 50 seconders. 📌 5-0 and 5-0. ❌ Others are invented."
  },
  23: {
    questext: "The security deposit for a Presidential candidate is forfeited if the candidate gets less than:",
    options: ["1/3 of valid votes", "1/4 of valid votes", "1/10 of valid votes", "1/6 of valid votes"],
    correct: "4",
    exptext: "✅ 1/6 of total valid votes. 📌 Deposit ₹15,000. ❌ Others are not the limit."
  },
  24: {
    questext: "Which of the following is NOT regarded as holding an office of profit for Presidential eligibility?",
    options: ["A government clerk", "A Union Minister", "The Vice-President", "A Governor"],
    correct: "1",
    exptext: "✅ A clerk holds an office of profit. 📌 Exempted: President, VP, Governor, Minister. ❌ Others are exempted."
  },
  25: {
    type: "concept", icon: "🔏", accent: "#3b82f6", pauseTimer: true,
    title: "Conditions of Office & Oath (Articles 59–60)",
    html: `
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Legislative membership</td><td>Must <b>resign</b> from Parliament / State Legislature on election</td></tr><tr><td>Other office</td><td>Cannot hold any other office of profit</td></tr><tr><td>Residence</td><td><b>Rashtrapati Bhavan</b></td></tr><tr><td>Emoluments</td><td>Determined by Parliament — <b>cannot be reduced</b> during term</td></tr><tr><td>Oath (Art. 60)</td><td>Administered by the <b>Chief Justice of India</b>; if unavailable, the <b>senior-most Judge</b> of the Supreme Court</td></tr></tbody></table>
    `
  },
  26: {
    questext: "The oath of office to the President is administered by the:",
    options: ["Vice-President", "Chief Justice of India", "Prime Minister", "Speaker"],
    correct: "2",
    exptext: "✅ CJI (or senior-most SC judge). 📌 Article 60. ❌ VP does not administer it."
  },
  27: {
    questext: "The salary and allowances of the President:",
    options: ["Can be reduced during term", "Are fixed by the President", "Cannot be reduced during term", "Are fixed by the PM"],
    correct: "3",
    exptext: "✅ Cannot be reduced. 📌 Determined by Parliament. ❌ Not self-determined."
  },
  28: {
    type: "concept", icon: "🚫", accent: "#f97316", pauseTimer: true,
    title: "Impeachment of the President (Article 61)",
    html: `
      <p class="cp-lead"><b>Ground:</b> violation of the Constitution. It can be initiated in <u>either House</u> of Parliament.</p>
      <table><thead><tr><th>Step</th><th>Procedure</th></tr></thead><tbody><tr><td>a</td><td><b>14-day</b> prior notice to the President, signed by at least <b>1/4 of total members</b> of that House</td></tr><tr><td>b</td><td>Resolution passed by <b>2/3 majority of total membership</b> of that House</td></tr><tr><td>c</td><td>Bill sent to the other House for investigation of charges</td></tr><tr><td>d</td><td>President has the right to appear and present defence in the other House</td></tr><tr><td>e</td><td>If the other House also passes it by <b>2/3 of total membership</b>, President is removed from the date of resolution</td></tr></tbody></table>
      <div class="cp-note trap">Both <b>elected AND nominated</b> members of Parliament participate in impeachment. No President has ever been impeached. It is a <b>quasi-judicial</b> process.</div>
    `
  },
  29: {
    questext: "The ground for impeachment of the President is:",
    options: ["Incapacity", "Loss of majority", "Proved misbehaviour", "Violation of the Constitution"],
    correct: "4",
    exptext: "✅ Violation of the Constitution. 📌 Article 61. ❌ Misbehaviour is for judges."
  },
  30: {
    questext: "A notice of impeachment must be signed by at least ___ of the total members of the House and given ___ days earlier.",
    options: ["1/4; 14", "1/3; 14", "1/4; 30", "1/2; 7"],
    correct: "1",
    exptext: "✅ 1/4 of members, 14 days. 📌 Fourteen and a quarter. ❌ Others are incorrect."
  },
  31: {
    questext: "Which members of Parliament participate in the impeachment of the President?",
    options: ["Only elected", "Only nominated", "Both elected and nominated", "Only Lok Sabha members"],
    correct: "3",
    exptext: "✅ Both elected and nominated. 📌 Unlike election. ❌ Nominated members are excluded only from election."
  },
  32: {
    questext: "A resolution to impeach the President must be passed in each House by:",
    options: ["Simple majority", "2/3 of total membership", "2/3 of members present and voting", "3/4 of total membership"],
    correct: "2",
    exptext: "✅ 2/3 of total membership. 📌 Stricter than special majority. ❌ Others are weaker or stronger."
  },
  33: {
    type: "concept", icon: "🪑", accent: "#84cc16", pauseTimer: true,
    title: "Filling of Vacancy (Article 62)",
    html: `
      <p class="cp-lead">A new election must be held <u>before the expiry</u> of the President’s term; the <b>outgoing President continues</b> until the successor takes office.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Vacancy occurs on</td><td>End of 5-year term, resignation, death, removal by impeachment, disqualification, or election declared invalid</td></tr><tr><td>Election deadline</td><td>Within <b>6 months</b> if vacancy is due to death / resignation / removal</td></tr><tr><td>Acting President</td><td><b>Vice-President</b>; if VP also vacant — <b>CJI</b>; if CJI unavailable — <b>senior-most SC Judge</b></td></tr></tbody></table>
      <div class="cp-note tip"><b>Example (1969):</b> After Zakir Hussain died, VP <b>V. V. Giri</b> acted as President; when Giri resigned to contest, CJI <b>M. Hidayatullah</b> acted from 20 July to 24 Aug 1969.</div>
    `
  },
  34: {
    questext: "If the President dies in office, the election for the new President must be held within:",
    options: ["1 month", "3 months", "1 year", "6 months"],
    correct: "4",
    exptext: "✅ 6 months. 📌 Vice-President acts meanwhile. ❌ Others are not in Article 62."
  },
  35: {
    questext: "Who acts as President if both the President and the Vice-President offices are vacant?",
    options: ["Chief Justice of India", "Speaker", "Prime Minister", "Attorney General"],
    correct: "1",
    exptext: "✅ CJI (or senior-most SC judge). 📌 1969 Hidayatullah. ❌ Others cannot act."
  },
  36: {
    questext: "Who was the officiating President from 20 July to 24 August 1969?",
    options: ["V. V. Giri", "M. Hidayatullah", "Zakir Hussain", "Neelam Sanjiva Reddy"],
    correct: "2",
    exptext: "✅ Justice M. Hidayatullah, then CJI. 📌 Only CJI to act. ❌ Giri resigned to contest."
  },
  37: {
    type: "concept", icon: "🛠️", accent: "#06b6d4", pauseTimer: true,
    title: "Executive Powers of the President",
    html: `
      <table><thead><tr><th>Power</th><th>Detail</th></tr></thead><tbody><tr><td>Executive actions</td><td>All executive actions of the Government of India are formally taken in the <b>President’s name</b></td></tr><tr><td>Appoints</td><td>PM and other Ministers (hold office during the President’s pleasure)</td></tr><tr><td>Also appoints</td><td>Attorney General, CAG, Chief Election Commissioner and other ECs, Chairman and Members of UPSC, Governors, Chairman and Members of Finance Commission</td></tr><tr><td>Information</td><td>Can seek information from PM on Union administration and proposed legislation</td></tr><tr><td>Cabinet</td><td>Can require PM to submit for Cabinet consideration any matter decided by a minister alone</td></tr><tr><td>Commission</td><td>Can appoint a commission to investigate conditions of SCs, STs and OBCs</td></tr><tr><td>Inter-State Council</td><td>Can appoint for Centre–State and inter-State cooperation</td></tr><tr><td>UTs</td><td>Directly administers Union Territories through administrators</td></tr><tr><td>Scheduled Area</td><td>Can declare any area as a Scheduled Area (Art. 244(1))</td></tr></tbody></table>
    `
  },
  38: {
    questext: "Who appoints the Governors of states?",
    options: ["Prime Minister", "Chief Justice", "President", "Chief Minister"],
    correct: "3",
    exptext: "✅ President. 📌 Governor = Centre's agent. ❌ CM does not appoint."
  },
  39: {
    questext: "The President can declare any area as a:",
    options: ["Metropolitan Area", "Union Territory", "Special Economic Zone", "Scheduled Area"],
    correct: "4",
    exptext: "✅ Scheduled Area, Article 244(1). 📌 Fifth Schedule. ❌ Other terms are different."
  },
  40: {
    questext: "Which of the following is appointed by the President?",
    options: ["Chief Election Commissioner", "Speaker of Lok Sabha", "Chief Minister", "Mayor"],
    correct: "1",
    exptext: "✅ Chief Election Commissioner. 📌 Also CAG, UPSC. ❌ Speaker is elected by Lok Sabha."
  },
  41: {
    type: "concept", icon: "📜", accent: "#a855f7", pauseTimer: true,
    title: "Legislative Powers of the President",
    html: `
      <table><thead><tr><th>Power</th><th>Detail</th></tr></thead><tbody><tr><td>Part of Parliament</td><td>President is an <b>integral part of Parliament</b></td></tr><tr><td>Sessions</td><td>Can <b>summon / prorogue</b> Parliament and <b>dissolve Lok Sabha</b></td></tr><tr><td>Joint sitting</td><td>Can summon a joint sitting of both Houses (presided by the Lok Sabha Speaker)</td></tr><tr><td>Address</td><td>Addresses Parliament at the start of the first session after each general election and the first session of each year</td></tr><tr><td>Messages</td><td>Can send messages to either House</td></tr><tr><td>Rajya Sabha</td><td>Nominates <b>12 members</b> (literature, science, art, social service)</td></tr><tr><td>Disqualification</td><td>Decides disqualification of MPs in consultation with the <b>Election Commission</b></td></tr><tr><td>Prior recommendation</td><td>Needed for bills involving Consolidated Fund expenditure or altering state boundaries</td></tr><tr><td>Ordinances</td><td>Can promulgate when Parliament is not in session (Art. 123)</td></tr><tr><td>Reports</td><td>Lays reports of CAG, UPSC, Finance Commission before Parliament</td></tr><tr><td>Regulations</td><td>Can make regulations for A&amp;N Islands, Lakshadweep, Dadra &amp; Nagar Haveli and Daman &amp; Diu, Ladakh and Puducherry (when assembly suspended / dissolved)</td></tr></tbody></table>
      <div class="cp-note trap">The earlier nomination of 2 Anglo-Indians to the Lok Sabha ended with the <b>104th Amendment, 2019</b>.</div>
    `
  },
  42: {
    questext: "The President nominates how many members to the Rajya Sabha?",
    options: ["2", "12", "10", "14"],
    correct: "2",
    exptext: "✅ 12 members. 📌 Literature, science, art, social service. ❌ 238 are elected."
  },
  43: {
    questext: "A joint sitting of Parliament is presided over by the:",
    options: ["President", "Vice-President", "Speaker of the Lok Sabha", "Chairman of the Rajya Sabha"],
    correct: "3",
    exptext: "✅ Lok Sabha Speaker. 📌 Not the Chairman. ❌ President summons but does not preside."
  },
  44: {
    questext: "The President decides on the disqualification of MPs in consultation with the:",
    options: ["Supreme Court", "Law Commission", "Speaker", "Election Commission"],
    correct: "4",
    exptext: "✅ Election Commission. 📌 Article 103. ❌ Others do not advise on it."
  },
  45: {
    questext: "A bill that alters the boundaries of a state needs the prior recommendation of the:",
    options: ["President", "Governor", "Speaker", "Chief Justice"],
    correct: "1",
    exptext: "✅ President. 📌 Article 3. ❌ Governor only gives views."
  },
  46: {
    type: "concept", icon: "💰", accent: "#e11d48", pauseTimer: true,
    title: "Financial Powers of the President",
    html: `
      <table><thead><tr><th>Power</th><th>Detail</th></tr></thead><tbody><tr><td>Money Bills</td><td>Introduced only on the President’s <b>prior recommendation</b></td></tr><tr><td>Union Budget</td><td>Causes the Annual Financial Statement to be laid before Parliament</td></tr><tr><td>Demands for grants</td><td>No demand without the President’s recommendation</td></tr><tr><td>Contingency Fund</td><td>Can make advances for unforeseen expenses</td></tr><tr><td>Finance Commission</td><td>Constituted <b>every 5 years</b> for Centre–State revenue distribution</td></tr></tbody></table>
    `
  },
  47: {
    questext: "The Finance Commission is constituted by the President every:",
    options: ["3 years", "5 years", "4 years", "10 years"],
    correct: "2",
    exptext: "✅ Every 5 years. 📌 Article 280. ❌ Others are not the period."
  },
  48: {
    questext: "Money Bills can be introduced only on the prior recommendation of the:",
    options: ["Speaker", "Finance Minister", "President", "Governor"],
    correct: "3",
    exptext: "✅ President. 📌 Also for demands for grants. ❌ Others do not recommend."
  },
  49: {
    questext: "Advances for unforeseen expenses are made by the President from the:",
    options: ["Consolidated Fund", "Public Account", "Reserve Fund", "Contingency Fund"],
    correct: "4",
    exptext: "✅ Contingency Fund. 📌 Later approved by Parliament. ❌ Others are different funds."
  },
  50: {
    type: "concept", icon: "👨‍⚖️", accent: "#10b981", pauseTimer: true,
    title: "Judicial Powers of the President",
    html: `
      <table><thead><tr><th>Power</th><th>Detail</th></tr></thead><tbody><tr><td>Appointments</td><td>Appoints CJI and judges of the Supreme Court and High Courts</td></tr><tr><td>Advisory opinion</td><td>Can seek an <b>advisory opinion</b> from the SC on any legal or factual question (Art. 143) — <b>NOT binding</b> on the President</td></tr><tr><td>Pardoning</td><td>In cases of (i) <b>Court Martial</b>, (ii) offences against <b>Union law</b>, (iii) <b>Death sentence</b></td></tr></tbody></table>
    `
  },
  51: {
    questext: "The President can seek an advisory opinion from the Supreme Court under:",
    options: ["Article 143", "Article 131", "Article 124", "Article 145"],
    correct: "1",
    exptext: "✅ Article 143. 📌 143 = advice. ❌ Article 131 is original jurisdiction."
  },
  52: {
    questext: "The advisory opinion of the Supreme Court under Article 143 is:",
    options: ["Binding on the President", "Not binding on the President", "Binding on Parliament", "Binding on states"],
    correct: "2",
    exptext: "✅ Not binding. 📌 Only advisory. ❌ Others are incorrect."
  },
  53: {
    type: "concept", icon: "⚔️", accent: "#d97706", pauseTimer: true,
    title: "Diplomatic, Military & Emergency Powers",
    html: `
      <table><thead><tr><th>Domain</th><th>Power</th></tr></thead><tbody><tr><td>Diplomatic</td><td>International treaties and agreements are negotiated and concluded in the <b>President’s name</b></td></tr><tr><td>Military</td><td><b>Supreme Commander</b> of the Defence Forces; appoints Chiefs of Army, Navy and Air Force; can declare war or conclude peace — subject to <b>Parliamentary approval</b></td></tr><tr><td>National Emergency</td><td>Article <b>352</b></td></tr><tr><td>President’s Rule</td><td>Article <b>356 and 365</b></td></tr><tr><td>Financial Emergency</td><td>Article <b>360</b></td></tr></tbody></table>
    `
  },
  54: {
    questext: "The Supreme Commander of the Defence Forces is the:",
    options: ["Prime Minister", "Defence Minister", "President", "Chief of Defence Staff"],
    correct: "3",
    exptext: "✅ President. 📌 Appoints the three Chiefs. ❌ PM is not the commander."
  },
  55: {
    questext: "Financial Emergency is provided in which Article?",
    options: ["352", "356", "365", "360"],
    correct: "4",
    exptext: "✅ Article 360. 📌 352 = National, 356 = State. ❌ 365 supports 356."
  },
  56: {
    questext: "The President can declare war or conclude peace:",
    options: ["Subject to Parliamentary approval", "At sole discretion", "On the Supreme Court's advice", "With state consent"],
    correct: "1",
    exptext: "✅ Subject to Parliamentary approval. 📌 Executive acts on the Cabinet's advice. ❌ Not discretionary."
  },
  57: {
    type: "concept", icon: "🛑", accent: "#dc2626", pauseTimer: true,
    title: "Veto Power of the President (Article 111)",
    html: `
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Becomes an Act</td><td>A bill passed by Parliament becomes an Act only after the President’s assent</td></tr><tr><td>Three options</td><td>(i) give assent, (ii) withhold assent, (iii) return for reconsideration (<b>not Money Bills</b>)</td></tr><tr><td>Re-passed bill</td><td>If Parliament <b>re-passes</b> it (with / without amendments), the President <b>MUST give assent</b></td></tr><tr><td>Purpose</td><td>Prevent hasty / ill-considered legislation; prevent unconstitutional legislation</td></tr></tbody></table>
    `
  },
  58: {
    questext: "The veto power of the President is given in:",
    options: ["Article 123", "Article 111", "Article 72", "Article 143"],
    correct: "2",
    exptext: "✅ Article 111. 📌 111 = Bills. ❌ 123 is ordinance."
  },
  59: {
    questext: "If Parliament re-passes a bill returned by the President, the President:",
    options: ["May withhold assent again", "May return it again", "Must give assent", "Must refer it to the Supreme Court"],
    correct: "3",
    exptext: "✅ Must give assent. 📌 Suspensive veto. ❌ No second return."
  },
  60: {
    questext: "The President cannot return which type of bill for reconsideration?",
    options: ["Ordinary Bill", "Financial Bill", "Private member's Bill", "Money Bill"],
    correct: "4",
    exptext: "✅ Money Bill. 📌 Cannot be returned. ❌ Others can be returned."
  },
  61: {
    type: "concept", icon: "📚", accent: "#7c3aed", pauseTimer: true,
    title: "Types of Veto Power",
    html: `
      <table><thead><tr><th>Veto type</th><th>Meaning and key points</th></tr></thead><tbody><tr><td><b>Absolute</b></td><td>President withholds assent — bill ends. Used for private members’ bills and govt. bills when a new cabinet advises against assent. E.g. 1954 — Dr. Rajendra Prasad (PEPSU Appropriation Bill); 1991 — R. Venkataraman (MP Salary Amendment Bill)</td></tr><tr><td><b>Qualified</b></td><td>Overridden by the legislature with an extraordinary majority. Used by the US President — <b>NOT available</b> to the Indian President</td></tr><tr><td><b>Suspensive</b></td><td>President returns the bill; Parliament can override by re-passing. Not applicable to Money Bills</td></tr><tr><td><b>Pocket</b></td><td>President neither approves, rejects nor returns — keeps the bill pending indefinitely (no time limit in the Constitution). USA: must return within 10 days. E.g. 1986 — Zail Singh, Indian Post Office (Amendment) Bill</td></tr></tbody></table>
      <div class="cp-note trap">President has <b>NO veto over Constitutional Amendment Bills</b> — the <b>24th Amendment (1971)</b> made assent mandatory.</div>
    `
  },
  62: {
    questext: "Which veto is NOT available to the Indian President?",
    options: ["Qualified veto", "Suspensive veto", "Absolute veto", "Pocket veto"],
    correct: "1",
    exptext: "✅ Qualified veto. 📌 Used by the US President. ❌ Others are available."
  },
  63: {
    questext: "In 1986 President Zail Singh used which veto on the Indian Post Office (Amendment) Bill?",
    options: ["Absolute", "Pocket", "Suspensive", "Qualified"],
    correct: "2",
    exptext: "✅ Pocket veto. 📌 Left the bill pending. ❌ Absolute veto was 1954 and 1991."
  },
  64: {
    questext: "The President has no veto over Constitutional Amendment Bills because of the:",
    options: ["44th Amendment, 1978", "42nd Amendment, 1976", "24th Amendment, 1971", "1st Amendment, 1951"],
    correct: "3",
    exptext: "✅ 24th Amendment, 1971. 📌 Assent made mandatory. ❌ Others are unrelated to this."
  },
  65: {
    questext: "The Absolute veto was used by Dr. Rajendra Prasad in 1954 on the:",
    options: ["Indian Post Office Bill", "Hindu Code Bill", "MP Salary Amendment Bill", "PEPSU Appropriation Bill"],
    correct: "4",
    exptext: "✅ PEPSU Appropriation Bill. 📌 1954 = PEPSU. ❌ 1991 was MP Salary Bill by Venkataraman."
  },
  66: {
    type: "concept", icon: "🏘️", accent: "#0d9488", pauseTimer: true,
    title: "Presidential Veto Over State Legislation",
    html: `
      <table><thead><tr><th>Authority</th><th>Options</th></tr></thead><tbody><tr><td>Governor (Art. 200)</td><td><b>4 options</b>: assent, withhold, return (non-Money Bills), or <b>reserve for President</b></td></tr><tr><td>President (Art. 201)</td><td><b>3 options</b> when reserved: assent, withhold, or direct Governor to return (non-Money Bills)</td></tr></tbody></table>
      <div class="cp-note trap">Even if the state re-passes the bill, the President is <b>NOT bound to assent</b>. The State Legislature <b>cannot override</b> the President’s veto.</div>
    `
  },
  67: {
    questext: "The Governor has how many options on a state bill under Article 200?",
    options: ["4", "3", "2", "5"],
    correct: "1",
    exptext: "✅ 4 options. 📌 Assent, withhold, return, reserve. ❌ President has 3 options."
  },
  68: {
    questext: "If a state legislature re-passes a bill returned by the President, the President:",
    options: ["Must give assent", "Is not bound to give assent", "Must refer to Supreme Court", "Must dissolve the House"],
    correct: "2",
    exptext: "✅ Not bound. 📌 Unlike Parliament bills. ❌ Assent is mandatory only for re-passed Parliament bills."
  },
  69: {
    type: "concept", icon: "📣", accent: "#db2777", pauseTimer: true,
    title: "Ordinance-Making Power (Article 123)",
    html: `
      <p class="cp-lead">The most important <u>legislative power</u> of the President — ordinances have the same force as an Act but are <b>temporary laws</b>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Source</td><td>Borrowed from the <b>Government of India Act, 1935</b></td></tr><tr><td>Subjects</td><td><b>Union and Concurrent List</b>; also State List if President’s Rule / National Emergency is in force</td></tr><tr><td>Uniqueness</td><td>Not found in most democratic constitutions (incl. USA and UK) — <b>unique to India</b></td></tr><tr><td>Conditions</td><td>Both Houses (or at least one) must <b>not be in session</b>; President satisfied that <b>immediate action</b> is necessary</td></tr><tr><td>Invalid if</td><td>Issued when both Houses are in session — <b>VOID</b></td></tr><tr><td>Advice</td><td>Not discretionary — on advice of the <b>Council of Ministers</b></td></tr><tr><td>Limit</td><td><b>CANNOT</b> be issued to amend the Constitution</td></tr></tbody></table>
    `
  },
  70: {
    questext: "The ordinance-making power of the President is under:",
    options: ["Article 72", "Article 111", "Article 123", "Article 143"],
    correct: "3",
    exptext: "✅ Article 123. 📌 Parallel for Governors: 213. ❌ 72 is pardon."
  },
  71: {
    questext: "An ordinance can be promulgated by the President:",
    options: ["When both Houses are in session", "Only with Supreme Court approval", "Only during Emergency", "When Parliament is not in session"],
    correct: "4",
    exptext: "✅ When Parliament is not in session. 📌 Immediate action needed. ❌ In session it is void."
  },
  72: {
    questext: "An ordinance CANNOT be issued to:",
    options: ["Amend the Constitution", "Amend an ordinary law", "Repeal another ordinance", "Deal with Concurrent List"],
    correct: "1",
    exptext: "✅ Amend the Constitution. 📌 Only ordinary law-making. ❌ Others are allowed."
  },
  73: {
    questext: "The ordinance-making provision in India was borrowed from the:",
    options: ["USA Constitution", "Government of India Act, 1935", "UK Constitution", "Irish Constitution"],
    correct: "2",
    exptext: "✅ GoI Act, 1935. 📌 Unique to India among democracies. ❌ USA and UK have none."
  },
  74: {
    type: "concept", icon: "⏱️", accent: "#2563eb", pauseTimer: true,
    title: "Life of an Ordinance & Key Judicial Rulings",
    html: `
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Placed before</td><td>Both Houses when Parliament reassembles</td></tr><tr><td>Ceases</td><td><b>6 weeks after Parliament reassembles</b> — if not approved</td></tr><tr><td>Earlier end</td><td>Both Houses pass disapproving resolutions</td></tr><tr><td>Maximum life</td><td><b>6 months + 6 weeks</b> (6 months = max gap between two sessions)</td></tr><tr><td>Withdrawal</td><td>Can be withdrawn anytime; can be <b>retrospective</b>; can modify / repeal any Act or another Ordinance</td></tr><tr><td><b>Cooper Case (1970)</b></td><td>President’s satisfaction can be questioned on grounds of <b>malafide</b></td></tr><tr><td><b>D. C. Wadhwa Case (1987)</b></td><td>Bihar Governor promulgated <b>256 ordinances</b> (1967–1981); SC ruled successive <b>re-promulgation</b> without passing bills = constitutional violation</td></tr></tbody></table>
    `
  },
  75: {
    questext: "An ordinance ceases to operate ___ after Parliament reassembles if not approved.",
    options: ["2 weeks", "4 weeks", "6 weeks", "6 months"],
    correct: "3",
    exptext: "✅ 6 weeks. 📌 Maximum life 6 months + 6 weeks. ❌ 6 months is the gap between sessions."
  },
  76: {
    questext: "The D. C. Wadhwa case (1987) dealt with:",
    options: ["Pocket veto", "Presidential election", "Pardoning power", "Re-promulgation of ordinances by the Bihar Governor"],
    correct: "4",
    exptext: "✅ Re-promulgation of 256 ordinances. 📌 Bihar 1967–81. ❌ Others are different topics."
  },
  77: {
    questext: "In which case was it held that the President’s satisfaction for an ordinance can be questioned on grounds of malafide?",
    options: ["Cooper case, 1970", "Wadhwa case, 1987", "Kesavananda, 1973", "Minerva Mills, 1980"],
    correct: "1",
    exptext: "✅ Cooper case, 1970. 📌 Malafide check. ❌ Wadhwa concerns re-promulgation."
  },
  78: {
    type: "concept", icon: "🕊️", accent: "#9333ea", pauseTimer: true,
    title: "Pardoning Power of the President (Article 72)",
    html: `
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Nature</td><td>An <b>executive power</b> — independent of the Judiciary</td></tr><tr><td>Role</td><td>President does <b>NOT</b> sit as a court of appeal</td></tr><tr><td>Advice</td><td>Exercised on the advice of the <b>Union Cabinet</b></td></tr><tr><td>Applicable in</td><td>(a) Court Martial sentences; (b) offences against Union Law; (c) Death sentences</td></tr><tr><td>Purpose</td><td>Correct judicial errors; relief from an unduly harsh sentence</td></tr><tr><td>Judicial review</td><td>Limited — not bound to give reasons; SC need not lay down guidelines; reviewable only if <b>arbitrary, irrational, malafide or discriminatory</b>; a stay cannot be obtained by filing another petition after rejection</td></tr></tbody></table>
    `
  },
  79: {
    questext: "The pardoning power of the President is provided under:",
    options: ["Article 161", "Article 72", "Article 123", "Article 143"],
    correct: "2",
    exptext: "✅ Article 72. 📌 Governor: Article 161. ❌ Others are different powers."
  },
  80: {
    questext: "The President exercises the pardoning power on the advice of the:",
    options: ["Supreme Court", "Law Commission", "Union Cabinet", "Attorney General"],
    correct: "3",
    exptext: "✅ Union Cabinet. 📌 Executive power. ❌ Not a court of appeal."
  },
  81: {
    questext: "The President's pardoning power applies to all EXCEPT:",
    options: ["Court Martial sentences", "Union law offences", "Death sentences", "Municipal fines"],
    correct: "4",
    exptext: "✅ Municipal fines are outside Article 72. 📌 Three categories only. ❌ Others are covered."
  },
  82: {
    type: "concept", icon: "📋", accent: "#be123c", pauseTimer: true,
    title: "Types of Pardoning Power (Article 72)",
    html: `
      <table><thead><tr><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td><b>Pardon</b></td><td>Completely removes both the sentence and the conviction — total absolution</td></tr><tr><td><b>Commutation</b></td><td>Substitutes a heavier punishment with a lighter one (e.g. Death → Rigorous imprisonment → Simple imprisonment)</td></tr><tr><td><b>Remission</b></td><td>Reduces the period of a sentence without changing its character (e.g. 2 years RI → 1 year RI)</td></tr><tr><td><b>Respite</b></td><td>Awards a lesser sentence due to special circumstances (physical disability, pregnancy)</td></tr><tr><td><b>Reprieve</b></td><td>Temporary stay of execution (especially death sentence) to allow the convict to seek pardon or commutation</td></tr></tbody></table>
    `
  },
  83: {
    questext: "Which pardoning power removes both the sentence and the conviction?",
    options: ["Pardon", "Remission", "Commutation", "Respite"],
    correct: "1",
    exptext: "✅ Pardon, total absolution. 📌 Wipes conviction too. ❌ Others only soften the sentence."
  },
  84: {
    questext: "Reducing a sentence of 2 years RI to 1 year RI is an example of:",
    options: ["Commutation", "Remission", "Reprieve", "Respite"],
    correct: "2",
    exptext: "✅ Remission. 📌 Same character, shorter period. ❌ Commutation changes the nature."
  },
  85: {
    questext: "A temporary stay of execution of a death sentence is called:",
    options: ["Pardon", "Commutation", "Reprieve", "Remission"],
    correct: "3",
    exptext: "✅ Reprieve. 📌 Time to seek relief. ❌ Others change or remove the sentence."
  },
  86: {
    questext: "Awarding a lesser sentence due to pregnancy or physical disability is:",
    options: ["Pardon", "Reprieve", "Remission", "Respite"],
    correct: "4",
    exptext: "✅ Respite. 📌 Special circumstances. ❌ Reprieve is a temporary stay."
  },
  87: {
    type: "concept", icon: "🆚", accent: "#4f46e5", pauseTimer: true,
    title: "President vs Governor: Pardoning Power",
    html: `
      <p class="cp-lead">Governor’s pardoning power is under <b>Article 161</b>.</p>
      <table><thead><tr><th>Aspect</th><th>President</th><th>Governor</th></tr></thead><tbody><tr><td>Court Martial sentences</td><td><b>Can pardon</b></td><td>Cannot</td></tr><tr><td>Death sentence</td><td><b>Can pardon</b></td><td>Cannot pardon (may suspend, remit or commute)</td></tr><tr><td>State law offences</td><td>Has power even for state laws prescribing death</td><td>Can pardon for offences against state law</td></tr></tbody></table>
    `
  },
  88: {
    questext: "The pardoning power of the Governor is given in:",
    options: ["Article 161", "Article 72", "Article 200", "Article 213"],
    correct: "1",
    exptext: "✅ Article 161. 📌 Governor = 161. ❌ 72 is the President."
  },
  89: {
    questext: "Which of the following can the President pardon but the Governor cannot?",
    options: ["Fines", "Death sentence", "Imprisonment under state law", "Minor offences"],
    correct: "2",
    exptext: "✅ Death sentence (and court martial). 📌 Governor can only commute it. ❌ Others are within the Governor's power."
  },
  90: {
    questext: "The power of the Governor to pardon extends to sentences by:",
    options: ["Court martial", "Union law offences", "State law offences", "Presidential order"],
    correct: "3",
    exptext: "✅ State law offences. 📌 Governor's domain. ❌ Court martial is excluded."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/President_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a softly blurred ceremonial desk with a brass pen stand, a bound book and a plain flag pole" }
});

/* CHANGE LOG
   - Nomination of 2 Anglo-Indians to the Lok Sabha ended with the 104th Amendment (2019); page now states the current position.
   - MLA vote value: added that it uses the 1971 census population.
   - Union Territory regulations list: Dadra & Nagar Haveli and Daman & Diu are now one UT.
   - President vs Governor pardoning table: added the Governor's column (cannot pardon court martial or death sentence).
*/
