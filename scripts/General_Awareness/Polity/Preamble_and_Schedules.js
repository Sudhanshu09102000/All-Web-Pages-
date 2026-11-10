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

/* Subject: General_Awareness · Chapter: Preamble_and_Schedules · 21 concept pages · 21 questions */

window.TEST_DATA = {
  1: {
    type: "concept",
    icon: "🏛️",
    accent: "#d97706",
    pauseTimer: true,
    title: "Class Overview — Preamble & Schedules",
    thumb: {
      image: "images/General_Awareness/Preamble_and_Schedules/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "INDIAN POLITY",
      line2: "PREAMBLE",
      line3: "& SCHEDULES",
      badge: "FULL CLASS",
      ribbon: "CONCEPTS • ARTICLES • EXAM TRAPS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Preamble & Schedules of Indian Constitution | SSC CGL Polity",
      altTitles: ["Preamble and 12 Schedules Explained for Competitive Exams", "Indian Constitution Preamble, Lists and Schedules MCQs"],
      description: "Understand the Preamble, its sources, ideals, landmark cases, amendment and all 12 Schedules. This class also covers legislative lists, residuary powers and Parts I–XXII.\n\n📌 IN THIS CLASS\n✅ Preamble: sources, ideals, comments, cases and amendment\n✅ Schedules 1–12 and key provisions\n✅ Union, State, Concurrent and Residuary Lists\n✅ Parts of the Constitution and article ranges\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Preamble\n00:00 Schedules 1–12\n00:00 Legislative lists\n00:00 Parts of the Constitution\n\n#IndianPolity #Preamble #Constitution",
      tags: ["preamble of india", "indian constitution", "12 schedules", "schedules of constitution", "preamble sources", "preamble cases", "berubari case", "kesavananda bharati", "42nd amendment", "union list", "state list", "concurrent list", "residuary powers", "schedule 8 languages", "schedule 9", "schedule 10", "schedule 11", "schedule 12", "parts of constitution", "articles of constitution", "indian polity", "polity for ssc", "ssc cgl polity", "upsc polity", "railway exam polity", "banking exam gk", "defence exam gk", "constitution mcq", "polity full class", ""],
      hashtags: ["IndianPolity", "Preamble", "Constitution"],
      thumbText: "PREAMBLE + 12 SCHEDULES",
      pinnedComment: "📌 Which Schedule do you find most confusing? Attempt the questions and share your score below.",
      communityPost: "🏛️ New Polity class: Preamble & Schedules. Revise the key facts and test yourself!",
      chapters: "00:00 Class overview\n00:00 Preamble: sources and ideals\n00:00 Cases and amendment\n00:00 Schedules 1–12\n00:00 Legislative lists\n00:00 Parts of the Constitution",
      playlist: "General Awareness — Indian Polity"
    },
    html: `<p class="cp-lead">Study the <u>Preamble, constitutional ideals, Schedules, legislative powers and Parts of the Constitution</u>.</p><div class="cp-stats"><div class="cp-stat"><b>12</b><span>Schedules</span></div><div class="cp-stat"><b>3</b><span>Legislative lists</span></div><div class="cp-stat"><b>22</b><span>Parts shown</span></div></div><div class="cp-divider">Roadmap</div><ul class="cp-timeline"><li><b>Preamble</b> — sources, ideals, cases and amendment.</li><li><b>Schedules 1–12</b> — subjects and provisions.</li><li><b>Legislative lists</b> — Union, State, Concurrent and residuary powers.</li><li><b>Parts I–XXII</b> — subjects and article ranges.</li></ul><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Focus on amendment numbers, Schedule numbers, Articles and exceptions.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Focus on amendment numbers, Schedule numbers, Articles and exceptions.</div>`
  },
  2: {
    type: "concept",
    icon: "📜",
    accent: "#2563eb",
    pauseTimer: true,
    title: "Sources of Preamble",
    html: `<p class="cp-lead">The idea was adopted from the American Constitution; language from the Australian Constitution; content from the Objective Resolution.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card green"><b>Idea</b><br>American Constitution</div><div class="cp-card amber"><b>Language</b><br>Australian Constitution</div><div class="cp-card violet"><b>Content</b><br>Objective Resolution</div></div><div class="cp-divider">AT-A-GLANCE REFERENCE TABLE</div><div style="overflow-x:auto;border:1px solid rgba(148,163,184,.32);border-radius:12px;margin:10px 0 14px;"><table style="width:100%;border-collapse:collapse;font-size:0.94em;line-height:1.45;"><thead><tr><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">KEY</th><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">DETAIL</th></tr></thead><tbody><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Idea</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">American Constitution</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Language</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Australian Constitution</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Content</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Objective Resolution</td></tr></tbody></table></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Do not interchange the sources.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Memorise the three separate pairings.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Memorise the three separate pairings.</div>`
  },
  3: {
    questext: "Which source is matched with the language of the Preamble?",
    options: ["American Constitution", "Australian Constitution", "Objective Resolution", "Government of India Act, 1935"],
    correct: "2",
    exptext: "✅ Australian Constitution: it is the source of the Preamble’s language. 📌 Idea—American; content—Objective Resolution. ❌ American Constitution is linked with the idea."
  },
  4: {
    type: "concept",
    icon: "💬",
    accent: "#0d9488",
    pauseTimer: true,
    title: "Comments on Preamble",
    html: `<p class="cp-lead">N. A. Palkhivala: “Identity Card of the Constitution”; K. M. Munshi: “Political Horoscope of Indian Constitution”; Sir Alladi Krishnaswami Iyer: “Preamble expresses what we had thought or dreamt so long”.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card amber"><b>Palkhivala</b><br>Identity Card of the Constitution</div><div class="cp-card violet"><b>K. M. Munshi</b><br>Political Horoscope of Indian Constitution</div><div class="cp-card teal"><b>Alladi Krishnaswami Iyer</b><br>What we had thought or dreamt so long</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Identity Card = Palkhivala; Political Horoscope = Munshi.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Match the exact quotation to its speaker.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Match the exact quotation to its speaker.</div>`
  },
  5: {
    questext: "Who called the Preamble the “Political Horoscope of Indian Constitution”?",
    options: ["N. A. Palkhivala", "K. M. Munshi", "Sir Alladi Krishnaswami Iyer", "B. R. Ambedkar"],
    correct: "2",
    exptext: "✅ K. M. Munshi: this is his phrase. 📌 Palkhivala = Identity Card. ❌ Alladi’s comment refers to long-held thoughts and dreams."
  },
  6: {
    type: "concept",
    icon: "⚖️",
    accent: "#7c3aed",
    pauseTimer: true,
    title: "Major Elements of Preamble",
    html: `<p class="cp-lead">The source of Constitution/power is Indian Citizens. Nature of State: Sovereign, Socialist, Secular, Democratic, Republic. Objectives: Justice, Freedom, Equality, Dignity of Individual, Fraternity, Unity and Integrity of the Nation.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card violet"><b>Source</b><br>Indian Citizens</div><div class="cp-card teal"><b>Nature</b><br>Sovereign • Socialist • Secular • Democratic • Republic</div><div class="cp-card pink"><b>Objectives</b><br>Justice • Freedom • Equality • Dignity • Fraternity • Unity and Integrity</div></div><div class="cp-divider">AT-A-GLANCE REFERENCE TABLE</div><div style="overflow-x:auto;border:1px solid rgba(148,163,184,.32);border-radius:12px;margin:10px 0 14px;"><table style="width:100%;border-collapse:collapse;font-size:0.94em;line-height:1.45;"><thead><tr><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">KEY</th><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">DETAIL</th></tr></thead><tbody><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Source</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Indian Citizens</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Nature</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Sovereign • Socialist • Secular • Democratic • Republic</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Objectives</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Justice • Freedom • Equality • Dignity • Fraternity • Unity and Integrity</td></tr></tbody></table></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Indian Citizens is the source of power, not one of the State characteristics.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Learn all five State terms and six objectives.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Learn all five State terms and six objectives.</div>`
  },
  7: {
    questext: "Which is the source of constitutional power identified in the notes?",
    options: ["Parliament", "The President", "Indian Citizens", "The Supreme Court"],
    correct: "3",
    exptext: "✅ Indian Citizens: they are identified as the source of power. 📌 The State’s nature is described separately by five terms. ❌ Other institutions are not the listed source."
  },
  8: {
    type: "concept",
    icon: "🕊️",
    accent: "#16a34a",
    pauseTimer: true,
    title: "Preamble — Social, Economic and Political Justice",
    html: `<p class="cp-lead">The notes associate Social, Economic and Political Justice with the Russian Revolution (1917).</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card teal"><b>Ideal</b><br>Social, Economic and Political Justice</div><div class="cp-card pink"><b>Association</b><br>Russian Revolution (1917)</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Do not confuse this with the French Revolution association.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Remember the year 1917.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Remember the year 1917.</div>`
  },
  9: {
    questext: "Liberty, Equality and Fraternity are associated with which event?",
    options: ["Russian Revolution (1917)", "French Revolution (1789–1799)", "American Revolution (1776)", "Industrial Revolution"],
    correct: "2",
    exptext: "✅ French Revolution (1789–1799): the notes link this trio to it. 📌 Russian Revolution = Social, Economic and Political Justice. ❌ Other events are not the listed association."
  },
  10: {
    type: "concept",
    icon: "🗽",
    accent: "#ea580c",
    pauseTimer: true,
    title: "Preamble — Liberty, Equality, Fraternity",
    html: `<p class="cp-lead">Liberty, Equality and Fraternity are associated with the French Revolution (1789–1799).</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card pink"><b>Ideals</b><br>Liberty • Equality • Fraternity</div><div class="cp-card red"><b>Association</b><br>French Revolution (1789–1799)</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Justice is separately associated with the Russian Revolution.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Remember the exact trio and date range.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Remember the exact trio and date range.</div>`
  },
  11: {
    questext: "According to the notes, what was the Berubari Union Case (1960) view?",
    options: ["Preamble is supreme law", "Preamble is not integral part of Constitution", "Preamble cannot be amended", "Preamble overrides Fundamental Rights"],
    correct: "2",
    exptext: "✅ Preamble was not integral part of the Constitution: this is the Berubari conclusion recorded. 📌 Berubari = 1960. ❌ Other statements are not that conclusion."
  },
  12: {
    type: "concept",
    icon: "⚖️",
    accent: "#dc2626",
    pauseTimer: true,
    title: "Cases Related to Preamble",
    html: `<p class="cp-lead">Berubari Union Case (1960): Preamble is not integral part of the Constitution. Kesavananda Bharati vs State of Kerala (1973) is the other case listed.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card red"><b>Berubari (1960)</b><br>Preamble is not integral part of the Constitution.</div><div class="cp-card blue"><b>Kesavananda Bharati (1973)</b><br>Case listed in the notes.</div></div><div class="cp-divider">AT-A-GLANCE REFERENCE TABLE</div><div style="overflow-x:auto;border:1px solid rgba(148,163,184,.32);border-radius:12px;margin:10px 0 14px;"><table style="width:100%;border-collapse:collapse;font-size:0.94em;line-height:1.45;"><thead><tr><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">KEY</th><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">DETAIL</th></tr></thead><tbody><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Berubari (1960)</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Preamble is not integral part of the Constitution.</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Kesavananda Bharati (1973)</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Case listed in the notes.</td></tr></tbody></table></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> The stated Berubari conclusion belongs to the 1960 case.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Memorise both case names and years.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Memorise both case names and years.</div>`
  },
  13: {
    questext: "Which amendment added Socialist, Secular and Integrity?",
    options: ["24th, 1971", "42nd, 1976", "44th, 1978", "52nd, 1985"],
    correct: "2",
    exptext: "✅ 42nd Constitutional Amendment, 1976: it added the three words. 📌 Recall 42–1976. ❌ Other amendments concern different changes."
  },
  14: {
    type: "concept",
    icon: "🛠️",
    accent: "#9333ea",
    pauseTimer: true,
    title: "Amendment in Preamble",
    html: `<p class="cp-lead">The 42nd Constitutional Amendment, 1976 added Socialist, Secular and Integrity to the Preamble.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card blue"><b>Amendment</b><br>42nd Constitutional Amendment, 1976</div><div class="cp-card green"><b>Words added</b><br>Socialist • Secular • Integrity</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> The notes list the word Integrity.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> 42nd Amendment and 1976 form a key pair.</div><div class="cp-mnemonic">✦ QUICK REVISION —  42nd Amendment and 1976 form a key pair.</div>`
  },
  15: {
    questext: "What does the First Schedule cover?",
    options: ["Oaths", "Rajya Sabha seats", "Names of States and UTs and territorial jurisdiction", "Official languages"],
    correct: "3",
    exptext: "✅ Names of States and UTs and territorial jurisdiction. 📌 Schedule 1 = territory. ❌ Oaths, seats and languages belong elsewhere."
  },
  16: {
    type: "concept",
    icon: "🗺️",
    accent: "#0891b2",
    pauseTimer: true,
    title: "Schedule 1: States, UTs & territorial jurisdiction",
    html: `<p class="cp-lead">Schedule 1 contains the names of States and Union Territories and their territorial jurisdiction.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card green"><b>Schedule 1</b><br>States and Union Territories</div><div class="cp-card amber"><b>Coverage</b><br>Names and territorial jurisdiction</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Schedule 1 is not about salaries or oaths.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Schedule 1 = territory.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Schedule 1 = territory.</div>`
  },
  17: {
    questext: "Which authorities are included in Schedule 2?",
    options: ["CEC only", "Judges of SC and HC, and CAG", "Chief Ministers only", "Panchayat members"],
    correct: "2",
    exptext: "✅ Judges (SC + HC) and CAG: both are listed. 📌 Schedule 2 = emoluments and allowances. ❌ Other groups are not listed."
  },
  18: {
    type: "concept",
    icon: "💰",
    accent: "#ca8a04",
    pauseTimer: true,
    title: "Schedule 2: Emoluments and allowances",
    html: `<p class="cp-lead">Schedule 2 covers emoluments and allowances of President, VP, Governor; Speaker and Deputy Speaker (LS + LA); Chairman and Deputy Chairman (RS + LC); Judges (SC + HC), and CAG.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card amber"><b>Executive</b><br>President, VP, Governor</div><div class="cp-card violet"><b>Presiding officers</b><br>Speaker + Deputy Speaker (LS + LA); Chairman + Deputy Chairman (RS + LC)</div><div class="cp-card teal"><b>Others</b><br>Judges (SC + HC) and CAG</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Schedule 2 concerns emoluments and allowances, not oaths.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Judges and CAG are included.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Judges and CAG are included.</div>`
  },
  19: {
    questext: "Which Schedule contains forms of oaths and affirmations?",
    options: ["Second", "Third", "Fourth", "Fifth"],
    correct: "2",
    exptext: "✅ Third Schedule: forms for Ministers, MPs, MLAs, Judges and CAG. 📌 Schedule 2 = emoluments; 3 = oaths. ❌ Other Schedules differ."
  },
  20: {
    type: "concept",
    icon: "📝",
    accent: "#4f46e5",
    pauseTimer: true,
    title: "Schedule 3: Oaths and affirmations (Union + State)",
    html: `<p class="cp-lead">Schedule 3 contains forms of oaths and affirmations for Ministers, MPs, MLAs, Judges and CAG.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card violet"><b>Coverage</b><br>Union + State</div><div class="cp-card teal"><b>Persons</b><br>Ministers • MPs • MLAs • Judges • CAG</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Schedule 3 concerns oaths, not emoluments.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Remember the five listed groups.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Remember the five listed groups.</div>`
  },
  21: {
    questext: "The Fourth Schedule allocates seats in which House?",
    options: ["Lok Sabha", "Rajya Sabha", "State Assembly", "Legislative Council"],
    correct: "2",
    exptext: "✅ Rajya Sabha: seats are allocated to States and UTs. 📌 Fourth = Rajya Sabha. ❌ Other Houses are not the subject."
  },
  22: {
    type: "concept",
    icon: "🏛️",
    accent: "#0f766e",
    pauseTimer: true,
    title: "Schedule 4: Allocation of seats in Rajya Sabha",
    html: `<p class="cp-lead">Schedule 4 allocates seats in the Rajya Sabha to States and Union Territories.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card teal"><b>Schedule 4</b><br>Allocation of Rajya Sabha seats</div><div class="cp-card pink"><b>Allocation to</b><br>States and UTs</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Do not confuse this with Schedule 1 territory.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Fourth = Rajya Sabha allocation.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Fourth = Rajya Sabha allocation.</div>`
  },
  23: {
    questext: "The Tribal Advisory Council under Schedule 5 advises whom?",
    options: ["President", "Governor of respective State", "Prime Minister", "Chief Justice"],
    correct: "2",
    exptext: "✅ Governor of the respective State: the Council only advises the Governor. 📌 President declares Scheduled Areas under Art. 244(1). ❌ Other authorities are not named."
  },
  24: {
    type: "concept",
    icon: "🌳",
    accent: "#65a30d",
    pauseTimer: true,
    title: "Schedule 5: Administration of Scheduled Areas & Tribes",
    html: `<p class="cp-lead">The Tribal Advisory Council only advises the Governor of the respective State. The President can declare areas as “Scheduled Areas” under Art. 244(1). Ten States: Andhra Pradesh, Chhattisgarh, Maharashtra, Jharkhand, Madhya Pradesh, Gujarat, Himachal Pradesh, Odisha, Rajasthan and Telangana.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card pink"><b>Tribal Advisory Council</b><br>Only advises the Governor of the respective State.</div><div class="cp-card red"><b>President</b><br>Can declare Scheduled Areas under Art. 244(1).</div><div class="cp-card blue"><b>10 States</b><br>Andhra Pradesh, Chhattisgarh, Maharashtra, Jharkhand, Madhya Pradesh, Gujarat, Himachal Pradesh, Odisha, Rajasthan, Telangana.</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> The Council advises the Governor; the President declares Scheduled Areas.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Article 244(1) and the ten-State list are key facts.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Article 244(1) and the ten-State list are key facts.</div>`
  },
  25: {
    questext: "Which States are named under the Sixth Schedule?",
    options: ["Assam, Tripura, Meghalaya, Mizoram", "Gujarat, Rajasthan, Odisha, Telangana", "Punjab, Haryana, Bihar, Sikkim", "Maharashtra, Jharkhand, Kerala, Goa"],
    correct: "1",
    exptext: "✅ Assam, Tripura, Meghalaya and Mizoram. 📌 Sixth = four North-Eastern States. ❌ Other groups are not the listed States."
  },
  26: {
    type: "concept",
    icon: "🧭",
    accent: "#0284c7",
    pauseTimer: true,
    title: "Schedule 6: Administration of Tribal Areas (NE States)",
    html: `<p class="cp-lead">Sixth Schedule tribal areas: Assam, Tripura, Meghalaya and Mizoram. Autonomous District Councils have Legislative, Judicial and Executive powers and manage land, forest and village administration.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card red"><b>States</b><br>Assam • Tripura • Meghalaya • Mizoram</div><div class="cp-card blue"><b>ADCs</b><br>Legislative • Judicial • Executive powers</div><div class="cp-card green"><b>Administration</b><br>Land, forest and village administration</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Do not mix the four Sixth Schedule States with the ten Fifth Schedule States.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> ADCs and their three powers are important.</div><div class="cp-mnemonic">✦ QUICK REVISION —  ADCs and their three powers are important.</div>`
  },
  27: {
    questext: "Which list presently contains 100 subjects in the notes?",
    options: ["State List", "Concurrent List", "Union List", "Residuary List"],
    correct: "3",
    exptext: "✅ Union List: initially 97, presently 100. 📌 State 66→61; Concurrent 47→52. ❌ Other lists have different counts."
  },
  28: {
    type: "concept",
    icon: "📚",
    accent: "#7c3aed",
    pauseTimer: true,
    title: "Schedule 7: Division of powers — 3 Lists (Federal)",
    html: `<p class="cp-lead">Union List: initially 97, presently 100 subjects; examples Defence, arms & ammunition, atomic energy, citizenship, airways, inter-state trade & commerce, banking, foreign affairs, labour & mines, census. State List: initially 66, presently 61; examples Public order, local government, health, pilgrimage, liquor, agriculture, fisheries, betting & gambling, co-operative societies, land, lotteries. Concurrent List: initially 47, presently 52; both Centre and State can make laws. In a clash, Centre’s law prevails. Examples: marriage & divorce, criminal law, CrPC, insolvency & bankruptcy, trade & labour disputes, electricity, education, weights & measures.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card blue"><b>Union List</b><br>Initially 97 → presently 100 subjects.</div><div class="cp-card green"><b>State List</b><br>Initially 66 → presently 61 subjects.</div><div class="cp-card amber"><b>Concurrent List</b><br>Initially 47 → presently 52; both Centre and States can make laws.</div></div><div class="cp-divider">AT-A-GLANCE REFERENCE TABLE</div><div style="overflow-x:auto;border:1px solid rgba(148,163,184,.32);border-radius:12px;margin:10px 0 14px;"><table style="width:100%;border-collapse:collapse;font-size:0.94em;line-height:1.45;"><thead><tr><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">KEY</th><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">DETAIL</th></tr></thead><tbody><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Union List</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Initially 97 → presently 100 subjects.</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">State List</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Initially 66 → presently 61 subjects.</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Concurrent List</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Initially 47 → presently 52; both Centre and States can make laws.</td></tr></tbody></table></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Concurrent List clash: Centre’s law prevails; State law prevails only if reserved and given President’s assent, and Parliament can later nullify it.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Learn initial/present counts and examples.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Learn initial/present counts and examples.</div>`
  },
  29: {
    questext: "Under which Article can Parliament legislate on a State List matter on request of two or more States?",
    options: ["250", "252", "253", "249"],
    correct: "2",
    exptext: "✅ Article 252: two or more States may request Parliament. 📌 250 = National Emergency; 253 = treaty. ❌ Those Articles cover other situations."
  },
  30: {
    type: "concept",
    icon: "⚖️",
    accent: "#ea580c",
    pauseTimer: true,
    title: "Schedule 7 — State List: When Parliament can legislate",
    html: `<p class="cp-lead">Five cases: National Emergency (Art. 250)—law valid 6 months after emergency ends; President’s Rule (Art. 356)—continues until repealed/amended, or LS passes resolution by simple majority; two or more States request (Art. 252)—continues until repealed by Parliament, States cannot amend; international treaty (Art. 253); Rajya Sabha gives power (Art. 249)—resolution valid 1 year + 6 months after expiry.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card green"><b>Art. 250</b><br>National Emergency; law valid 6 months after emergency ends.</div><div class="cp-card amber"><b>Art. 356</b><br>President’s Rule; law continues until repealed/amended or LS resolution by simple majority.</div><div class="cp-card violet"><b>Art. 252 / 253 / 249</b><br>States’ request / international treaty / Rajya Sabha resolution (1 year + 6 months after expiry).</div></div><div class="cp-divider">AT-A-GLANCE REFERENCE TABLE</div><div style="overflow-x:auto;border:1px solid rgba(148,163,184,.32);border-radius:12px;margin:10px 0 14px;"><table style="width:100%;border-collapse:collapse;font-size:0.94em;line-height:1.45;"><thead><tr><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">KEY</th><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">DETAIL</th></tr></thead><tbody><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Art. 250</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">National Emergency; law valid 6 months after emergency ends.</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Art. 356</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">President’s Rule; law continues until repealed/amended or LS resolution by simple majority.</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Art. 252 / 253 / 249</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">States’ request / international treaty / Rajya Sabha resolution (1 year + 6 months after expiry).</td></tr></tbody></table></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Article 252 requires two or more States; they cannot amend the law themselves.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Match all five situations with Articles.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Match all five situations with Articles.</div>`
  },
  31: {
    questext: "Which subject was transferred from State to Concurrent List by the 42nd Amendment?",
    options: ["Police", "Public order", "Education", "Agriculture"],
    correct: "3",
    exptext: "✅ Education: it is among the listed transfers. 📌 Also forests, weights/measures, wildlife protection and administration of justice. ❌ Other options are not in this transfer list."
  },
  32: {
    type: "concept",
    icon: "🧩",
    accent: "#0891b2",
    pauseTimer: true,
    title: "Concurrent List and Residuary List",
    html: `<p class="cp-lead">Residuary subjects are not in Union, State or Concurrent Lists; Parliament legislates on them. 42nd Amendment transferred Education, Forests, Weights & Measures, Protection of wild animals & birds, and Administration of justice from State to Concurrent List.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card amber"><b>Residuary List</b><br>Subjects not in Union / State / Concurrent List; Parliament has power to legislate.</div><div class="cp-card violet"><b>42nd Amendment transfer</b><br>Education • Forests • Weights & Measures • Protection of wild animals & birds • Administration of justice</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Residuary subjects are absent from all three lists.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Memorise the five transferred subjects.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Memorise the five transferred subjects.</div>`
  },
  33: {
    questext: "Which amendment added Konkani, Manipuri and Nepali to the Eighth Schedule?",
    options: ["21st (1967)", "71st (1992)", "92nd (2003)", "96th (2011)"],
    correct: "2",
    exptext: "✅ 71st Amendment (1992): it added these three languages. 📌 21st = Sindhi; 92nd = four languages; 96th = Oriya renamed Odia. ❌ Others differ."
  },
  34: {
    type: "concept",
    icon: "🗣️",
    accent: "#2563eb",
    pauseTimer: true,
    title: "Schedule 8 — Official Languages",
    html: `<p class="cp-lead">Originally 14 languages; presently 22. 21st Amendment (1967): Sindhi. 71st (1992): Konkani, Manipuri, Nepali. 92nd (2003): Bodo, Dogri, Maithili, Santhali. 96th (2011): ‘Oriya’ → ‘Odia’ (renamed).</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card violet"><b>Count</b><br>Originally 14 → presently 22</div><div class="cp-card teal"><b>21st / 71st</b><br>Sindhi (1967); Konkani, Manipuri, Nepali (1992)</div><div class="cp-card pink"><b>92nd / 96th</b><br>Bodo, Dogri, Maithili, Santhali (2003); Oriya renamed Odia (2011)</div></div><div class="cp-divider">AT-A-GLANCE REFERENCE TABLE</div><div style="overflow-x:auto;border:1px solid rgba(148,163,184,.32);border-radius:12px;margin:10px 0 14px;"><table style="width:100%;border-collapse:collapse;font-size:0.94em;line-height:1.45;"><thead><tr><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">KEY</th><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">DETAIL</th></tr></thead><tbody><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Count</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Originally 14 → presently 22</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">21st / 71st</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Sindhi (1967); Konkani, Manipuri, Nepali (1992)</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">92nd / 96th</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Bodo, Dogri, Maithili, Santhali (2003); Oriya renamed Odia (2011)</td></tr></tbody></table></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> 96th Amendment is a renaming, not an addition.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Remember the amendment-year pairs.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Remember the amendment-year pairs.</div>`
  },
  35: {
    questext: "Which language is listed among the five classical languages added in 2024?",
    options: ["Kannada", "Malayalam", "Bengali", "Tamil"],
    correct: "3",
    exptext: "✅ Bengali: it appears in the “Added in 2024 (+5)” column. 📌 Other additions: Marathi, Pali, Prakrit and Assamese. ❌ Tamil, Kannada and Malayalam are in the original six."
  },
  36: {
    type: "concept",
    icon: "🎼",
    accent: "#a21caf",
    pauseTimer: true,
    title: "Classical Languages of India",
    html: `<p class="cp-lead">Classical (original 6): Tamil, Sanskrit, Telugu, Kannada, Malayalam, Odia. Added in 2024 (+5): Marathi, Pali, Prakrit, Assamese, Bengali.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card teal"><b>Original six</b><br>Tamil • Sanskrit • Telugu • Kannada • Malayalam • Odia</div><div class="cp-card pink"><b>Added in 2024 (+5)</b><br>Marathi • Pali • Prakrit • Assamese • Bengali</div></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Keep the original six separate from the five additions.</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Classical-language status is distinct from Eighth Schedule inclusion.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Classical-language status is distinct from Eighth Schedule inclusion.</div>`
  },
  37: {
    questext: "Which Schedule deals with anti-defection?",
    options: ["Ninth", "Tenth", "Eleventh", "Twelfth"],
    correct: "2",
    exptext: "✅ Tenth Schedule: anti-defection/disqualification of MPs and MLAs; added by 52nd CA, 1985. 📌 10 = defection. ❌ Ninth = land reforms; 11/12 = local bodies."
  },
  38: {
    type: "concept",
    icon: "📜",
    accent: "#b91c1c",
    pauseTimer: true,
    title: "Schedules 9 to 12 (Added later)",
    html: `<p class="cp-lead">Schedule 9: Land reforms & Zamindari abolition; protects land reform laws; added by 1st CA, 1951. Schedule 10: Anti-Defection (disqualification) of MPs/MLAs; 52nd CA, 1985. Schedule 11: Panchayats, 29 functional matters; 73rd CA, 1992. Schedule 12: Municipalities, 18 functional matters; 74th CA, 1992.</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card pink"><b>Schedule 9</b><br>Land reforms and Zamindari abolition; 1st CA, 1951.</div><div class="cp-card red"><b>Schedule 10</b><br>Anti-Defection; 52nd CA, 1985.</div><div class="cp-card blue"><b>Schedule 11 / 12</b><br>Panchayats: 29 matters, 73rd CA, 1992. Municipalities: 18 matters, 74th CA, 1992.</div></div><div class="cp-divider">AT-A-GLANCE REFERENCE TABLE</div><div style="overflow-x:auto;border:1px solid rgba(148,163,184,.32);border-radius:12px;margin:10px 0 14px;"><table style="width:100%;border-collapse:collapse;font-size:0.94em;line-height:1.45;"><thead><tr><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">KEY</th><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">DETAIL</th></tr></thead><tbody><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Schedule 9</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Land reforms and Zamindari abolition; 1st CA, 1951.</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Schedule 10</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Anti-Defection; 52nd CA, 1985.</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Schedule 11 / 12</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Panchayats: 29 matters, 73rd CA, 1992. Municipalities: 18 matters, 74th CA, 1992.</td></tr></tbody></table></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Schedule 11 = Panchayats (29); Schedule 12 = Municipalities (18).</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Match Schedule, subject, amendment and year.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Match Schedule, subject, amendment and year.</div>`
  },
  39: {
    questext: "Which Schedule has 29 functional matters for Panchayats?",
    options: ["Ninth", "Tenth", "Eleventh", "Twelfth"],
    correct: "3",
    exptext: "✅ Eleventh Schedule: Panchayats, 29 functional matters; 73rd CA, 1992. 📌 Twelfth = Municipalities, 18 matters. ❌ Other Schedules have different subjects."
  },
  40: {
    type: "concept",
    icon: "📋",
    accent: "#475569",
    pauseTimer: true,
    title: "Parts of the Constitution (Part I–XXII)",
    html: `<p class="cp-lead">I Union and its Territory (1–4); II Citizenship (5–11); III Fundamental Rights (12–35); IV DPSP (36–51); IV-A Fundamental Duties (51-A); V Union Government (52–151); VI State Governments (152–237); VII Part-B States deleted (238); VIII Union Territories (239–242); IX Panchayats (243–243-O); IX-A Municipalities (243-P–243-ZG); IX-B Co-operative Societies (243-ZH–243-ZT); X Scheduled and Tribal Areas (244–244-A); XI Union-State Relations (245–263); XII Finance, Property, Contracts & Suits (264–300-A); XIII Trade, Commerce & Intercourse (301–307); XIV Services under Union & States (308–323); XIV-A Tribunals (323-A–323-B); XV Elections (324–329-A); XVI Special Provisions for Certain Classes (330–342-A); XVII Official Language (343–351-A); XVIII Emergency Provisions (352–360); XIX Miscellaneous (361–367); XX Amendment (368); XXI Temporary, Transitional & Special Provisions (369–392); XXII Short Title, Commencement, Hindi Text & Repeals (393–395). Note: Part VII deleted by 7th Amendment (1956); IV-A and XIV-A added by 42nd Amendment (1976); IX-A by 74th (1992); IX-B by 97th (2011).</p><div class="cp-divider">CORE CONCEPTS &amp; QUICK RECALL</div><div class="cp-grid c2"><div class="cp-card red"><b>I–IV-A</b><br>Union/Territory 1–4; Citizenship 5–11; Fundamental Rights 12–35; DPSP 36–51; Duties 51-A.</div><div class="cp-card blue"><b>V–XIV-A</b><br>Union 52–151; State 152–237; UT 239–242; Panchayats; Municipalities; Co-operatives; Scheduled Areas; Union-State relations; finance; trade; services; tribunals.</div><div class="cp-card green"><b>XV–XXII</b><br>Elections 324–329-A; Special Classes 330–342-A; Official Language 343–351-A; Emergency 352–360; Misc. 361–367; Amendment 368; Temporary 369–392; Short Title etc. 393–395.</div></div><div class="cp-divider">AT-A-GLANCE REFERENCE TABLE</div><div style="overflow-x:auto;border:1px solid rgba(148,163,184,.32);border-radius:12px;margin:10px 0 14px;"><table style="width:100%;border-collapse:collapse;font-size:0.94em;line-height:1.45;"><thead><tr><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">KEY</th><th style="text-align:left;padding:10px 11px;background:rgba(59,130,246,.12);">DETAIL</th></tr></thead><tbody><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">I–IV-A</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Union/Territory 1–4; Citizenship 5–11; Fundamental Rights 12–35; DPSP 36–51; Duties 51-A.</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">V–XIV-A</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Union 52–151; State 152–237; UT 239–242; Panchayats; Municipalities; Co-operatives; Scheduled Areas; Union-State relations; finance; trade; services; tribunals.</td></tr><tr><th style="text-align:left;padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">XV–XXII</th><td style="padding:9px 11px;border-bottom:1px solid rgba(148,163,184,.28);">Elections 324–329-A; Special Classes 330–342-A; Official Language 343–351-A; Emergency 352–360; Misc. 361–367; Amendment 368; Temporary 369–392; Short Title etc. 393–395.</td></tr></tbody></table></div><div class="cp-note trap">⚠️ <b>EXAM TRAP</b><br> Part VII deleted by 7th Amendment (1956); IV-A and XIV-A added by 42nd (1976); IX-A by 74th (1992); IX-B by 97th (2011).</div><div class="cp-note exam">🎯 <b>EXAM FOCUS</b><br> Use the Part–subject–article mapping; Part VII is deleted.</div><div class="cp-mnemonic">✦ QUICK REVISION —  Use the Part–subject–article mapping; Part VII is deleted.</div>`
  },
  41: {
    questext: "Which Part deals with Fundamental Duties?",
    options: ["Part III", "Part IV", "Part IV-A", "Part V"],
    correct: "3",
    exptext: "✅ Part IV-A: Fundamental Duties, Article 51-A. 📌 Part III = Fundamental Rights; Part IV = DPSP. ❌ Other Parts differ."
  },
  42: {
    questext: "Which Part and article range cover Emergency Provisions?",
    options: ["Part XVIII, 352–360", "Part XIX, 361–367", "Part XX, 368", "Part XVII, 343–351-A"],
    correct: "1",
    exptext: "✅ Part XVIII, Articles 352–360. 📌 XVIII = Emergency. ❌ XIX = Miscellaneous; XX = Amendment; XVII = Official Language."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Preamble_and_Schedules/thumbnail.png": {
    t: "thumb",
    accent: "#d97706",
    objects: "an elegant gold-edged constitutional document, a refined parchment scroll and a small brass balance scale"
  }
});

/* CHANGE LOG
   - Followed the supplied notes; no external corrections applied.
   - The 96th Amendment entry is represented as a renaming of Oriya to Odia, as stated in the notes.
   - Premium visual pass: varied card accents, section dividers, exam-focus labels and quick-revision strips.
   - Verify time-sensitive/current constitutional figures before publication.
*/