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
  /* ── Premium "missing image" card ──
     Always a self-contained dark glass card with its own explicit colours, so it is perfectly readable
     in BOTH light and dark mode (nothing is inherited from the page theme). */
  var CSS = [
    ".cpm{position:relative!important;z-index:6;display:flex!important;flex-direction:column!important;align-items:center!important;gap:11px;box-sizing:border-box;width:calc(100% - 24px);max-width:430px;margin:12px auto!important;padding:16px 16px 15px;border-radius:20px;text-align:center;overflow:hidden;isolation:isolate;color:#f1f5f9!important;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif!important;font-size:13px;line-height:1.45;letter-spacing:0;text-transform:none;",
    "background:radial-gradient(120% 90% at 0% 0%,rgba(99,102,241,.30),transparent 55%),radial-gradient(110% 90% at 100% 100%,rgba(236,72,153,.22),transparent 58%),linear-gradient(160deg,#121a3c,#0a0f26 72%)!important;",
    "border:1px solid rgba(226,190,100,.42)!important;box-shadow:0 22px 44px -14px rgba(2,6,23,.75),0 0 38px -8px rgba(129,140,248,.45),inset 0 1px 0 rgba(255,255,255,.14)!important;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}",
    ".cpm::before{content:'';position:absolute;top:0;left:14%;right:14%;height:1px;background:linear-gradient(90deg,transparent,#f6dc95,transparent);opacity:.9;pointer-events:none}",
    ".cpm *{box-sizing:border-box;margin:0;font-family:inherit;letter-spacing:0;text-transform:none;text-shadow:none}",
    ".cpm-head{display:flex;align-items:center;gap:11px;max-width:100%;text-align:left}",
    ".cpm-ico{flex:none;width:38px;height:38px;border-radius:12px;display:grid;place-items:center;color:#fff!important;background:linear-gradient(135deg,#6366f1,#a855f7 60%,#ec4899);box-shadow:0 8px 18px -6px rgba(168,85,247,.7),inset 0 1px 0 rgba(255,255,255,.35)}",
    ".cpm-ico svg{width:19px;height:19px}",
    ".cpm-txt{min-width:0}",
    ".cpm-title{display:block;font-size:14.5px;font-weight:800;line-height:1.25;color:#fff!important}",
    ".cpm-sub{display:block;margin-top:2px;font-size:11.5px;font-weight:500;color:#a9b4d0!important}",
    ".cpm-path{display:block;max-width:100%;padding:8px 11px;border-radius:11px;background:rgba(2,6,23,.6);border:1px dashed rgba(148,163,184,.5);color:#d6deef!important;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace!important;font-size:11px;font-weight:500;line-height:1.5;overflow-wrap:anywhere;word-break:break-all;text-align:center;user-select:text;-webkit-user-select:text}",
    ".cpm-path b{color:#f6dc95!important;font-weight:700}",
    ".cpm-btn{position:relative;overflow:hidden;display:inline-flex!important;align-items:center;justify-content:center;gap:9px;min-height:44px;padding:0 24px;border:0!important;border-radius:999px;cursor:pointer;color:#fff!important;font-family:inherit!important;font-size:13.5px;font-weight:700;line-height:1;white-space:nowrap;background:linear-gradient(135deg,#6366f1,#a855f7 55%,#ec4899)!important;box-shadow:0 12px 26px -8px rgba(168,85,247,.8),inset 0 0 0 1px rgba(255,255,255,.2)!important;transition:transform .18s ease,box-shadow .18s ease,filter .18s ease;-webkit-tap-highlight-color:transparent;touch-action:manipulation;user-select:none;-webkit-user-select:none;outline:none}",
    ".cpm-btn::after{content:'';position:absolute;top:0;left:-70%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.5),transparent);transform:skewX(-20deg);animation:cpm-shine 3.8s ease-in-out infinite;pointer-events:none}",
    "@keyframes cpm-shine{0%,62%{left:-70%}100%{left:140%}}",
    ".cpm-btn:hover{transform:translateY(-1px);filter:brightness(1.08);box-shadow:0 16px 30px -8px rgba(168,85,247,.9),inset 0 0 0 1px rgba(255,255,255,.28)!important}",
    ".cpm-btn:active{transform:scale(.97)}",
    ".cpm-btn:focus-visible{box-shadow:0 0 0 3px rgba(246,220,149,.85),0 12px 26px -8px rgba(168,85,247,.8)!important}",
    ".cpm-btn svg{width:17px;height:17px;flex:none;pointer-events:none}",
    ".cpm-btn *{pointer-events:none}",
    ".cpm-btn.ok{background:linear-gradient(135deg,#059669,#34d399)!important;box-shadow:0 12px 26px -8px rgba(16,185,129,.8),inset 0 0 0 1px rgba(255,255,255,.25)!important}",
    ".cpm-btn.err{background:linear-gradient(135deg,#d97706,#ef4444)!important;box-shadow:0 12px 26px -8px rgba(239,68,68,.7),inset 0 0 0 1px rgba(255,255,255,.25)!important}",
    ".cpm-ta{display:block;width:100%;min-height:96px;resize:vertical;padding:10px 12px;border-radius:12px;border:1px solid rgba(129,140,248,.55);background:rgba(2,6,23,.75);color:#e2e8f0!important;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace!important;font-size:12px;line-height:1.5;text-align:left;user-select:text;-webkit-user-select:text}",
    ".cpm-abs{position:absolute!important;inset:0;margin:auto!important;height:fit-content}",
    ".cpm-tight{gap:8px;padding:11px 12px}",
    ".cpm-tight .cpm-sub,.cpm-tight .cpm-full{display:none}",
    ".cpm:not(.cpm-tight) .cpm-short{display:none}",
    ".cpm-tight .cpm-ico{width:30px;height:30px;border-radius:10px}.cpm-tight .cpm-ico svg{width:16px;height:16px}",
    ".cpm-tight .cpm-btn{min-height:38px;padding:0 20px}",
    "/* ── LIGHT MODE: the portal forces black text inside the studio / concept page, which made the dark card unreadable. In Light Mode the card becomes a plain white card with black text and a black button. ── */",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm{background:#fff!important;background-image:none!important;border:2px solid #000!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;color:#000!important;-webkit-text-fill-color:#000!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm::before{display:none!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm *{color:#000!important;-webkit-text-fill-color:#000!important;border-color:#000!important;background-image:none!important;text-shadow:none!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-title{color:#000!important;-webkit-text-fill-color:#000!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-sub{color:#374151!important;-webkit-text-fill-color:#374151!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-ico{background:#000!important;background-color:#000!important;border:1px solid #000!important;box-shadow:none!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-ico,html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-ico *{color:#fff!important;-webkit-text-fill-color:#fff!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-path{background:#f3f4f6!important;background-color:#f3f4f6!important;border:1px dashed #000!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-btn{background:#000!important;background-color:#000!important;border:2px solid #000!important;box-shadow:none!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-btn::after{display:none!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-btn,html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-btn *{color:#fff!important;-webkit-text-fill-color:#fff!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-btn:hover{background:#262626!important;background-color:#262626!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-btn.ok{background:#166534!important;background-color:#166534!important;border-color:#166534!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-btn.err{background:#b91c1c!important;background-color:#b91c1c!important;border-color:#b91c1c!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-btn:focus-visible{outline:3px solid #2563eb!important;outline-offset:2px}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-ta{background:#fff!important;background-color:#fff!important;border:1px solid #000!important}",
    "@media (max-width:480px){.cpm{width:calc(100% - 16px);padding:14px 12px 13px;border-radius:18px}.cpm-title{font-size:13.5px}.cpm-path{font-size:10.5px}}",
    "@media (prefers-reduced-motion:reduce){.cpm-btn::after{animation:none}.cpm-btn{transition:none}}"
  ].join("");
  function addCss() {
    if (document.getElementById("cpm-style")) return;
    var s = document.createElement("style");
    s.id = "cpm-style";
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }
  addCss();

  var SV = function (p) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>";
  };
  var ICON_IMG = SV('<rect x="3" y="3" width="18" height="18" rx="3.5"/><circle cx="9" cy="9" r="1.9"/><path d="m21 15-4.6-4.6L6 21"/>');
  var ICON_COPY = SV('<rect x="9" y="9" width="12" height="12" rx="2.6"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>');
  var ICON_OK = SV('<path d="m5 12.5 4.5 4.5L19 7.5"/>');
  var ICON_WARN = SV('<path d="M12 8v5M12 17h.01"/><path d="M10.3 3.9 2.4 17.5a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>');
  var STATES = {
    idle: ["Copy prompt", ICON_COPY, ""],
    ok: ["Copied!", ICON_OK, " ok"],
    err: ["Copy from the box below", ICON_WARN, " err"],
    none: ["No prompt found", ICON_WARN, " err"]
  };
  function setBtn(b, st) {
    var s = STATES[st];
    b.className = "cpm-btn" + s[2];
    b.innerHTML = s[1] + '<span class="cpm-lbl">' + s[0] + "</span>";
    clearTimeout(b._t);
    if (st !== "idle") b._t = setTimeout(function () { setBtn(b, "idle"); }, st === "ok" ? 1800 : 4500);
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
    var ta = box.querySelector(".cpm-ta");
    if (!ta) {
      ta = document.createElement("textarea");
      ta.className = "cpm-ta";
      ta.readOnly = true;
      ta.rows = 5;
      ta.addEventListener("focus", function () { ta.select(); });
      ta.addEventListener("click", function () { ta.select(); });
      box.appendChild(ta);
      fit(box);
    }
    ta.value = text;
    try { ta.focus(); ta.select(); ta.setSelectionRange(0, text.length); } catch (e) {}
  }

  /* Keeps the card inside its frame: centred when the frame is taller, compact when the frame is small (phones). */
  function fit(box) {
    if (!box || !box.parentElement) return;
    var p = box.parentElement;
    box.classList.remove("cpm-abs", "cpm-tight");
    if (box.querySelector(".cpm-ta")) return;
    var cs = window.getComputedStyle(p);
    if (cs.position === "static") return;
    var ph = p.clientHeight;
    if (ph > 0 && box.offsetHeight > ph - 14) box.classList.add("cpm-tight");
    if (ph > box.offsetHeight + 30) box.classList.add("cpm-abs");
  }
  function fitAll() {
    var all = document.querySelectorAll(".cpm");
    for (var i = 0; i < all.length; i++) fit(all[i]);
  }

  function swap(img) {
    if (img.getAttribute("data-ph")) return;
    var src = img.getAttribute("src") || "";
    if (!getPrompt(src)) return;
    img.setAttribute("data-ph", "1");
    var hid = img.closest("[data-hidden]");
    if (hid) { hid.removeAttribute("data-hidden"); hid.style.removeProperty("display"); }
    var parts = src.split("/");
    var short = parts.length > 2 ? "…/" + parts.slice(-2).join("/") : src;
    var box = document.createElement("div");
    box.className = "cpm cp-missing";
    box.setAttribute("translate", "no");
    box.innerHTML =
      '<div class="cpm-head"><span class="cpm-ico">' + ICON_IMG + '</span>' +
      '<span class="cpm-txt"><span class="cpm-title">Image not added yet</span>' +
      '<span class="cpm-sub">Generate it with the prompt, then save it as:</span></span></div>' +
      '<code class="cpm-path"><span class="cpm-full"></span><span class="cpm-short"></span></code>';
    box.querySelector(".cpm-full").textContent = src;
    box.querySelector(".cpm-short").textContent = short;
    box.querySelector(".cpm-path").title = src;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-ph-src", src);
    setBtn(btn, "idle");
    box.appendChild(btn);
    if (img.parentNode) img.parentNode.replaceChild(box, img);
    fit(box);
    setTimeout(function () { fit(box); }, 120);
  }

  /* The studio prints its own "image not found … put the file next to index.html" line (dark text in light
     mode, and it overlaps the card on phones). The card already says everything, so blank that line. */
  function tidyNotice() {
    var boxes = document.querySelectorAll(".cpm");
    if (!boxes.length || !document.body) return;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, hit = [];
    while ((n = w.nextNode())) {
      if (/image not found/i.test(n.nodeValue) && /index\.html|\.png|\.jpe?g|\.webp/i.test(n.nodeValue)) hit.push(n);
    }
    hit.forEach(function (t) {
      var el = t.parentElement, a = el, near = false, i;
      if (!el || el.closest(".cpm")) return;
      for (i = 0; i < 6 && a; i++, a = a.parentElement) { if (a.querySelector(".cpm")) { near = true; break; } }
      if (near) t.nodeValue = "";
    });
  }

  var queued = false;
  function sweep() {
    document.querySelectorAll("img").forEach(function (i) {
      if (i.complete && i.naturalWidth === 0 && i.getAttribute("src")) swap(i);
    });
    if (queued) return;
    queued = true;
    (window.requestAnimationFrame || setTimeout)(function () {
      queued = false;
      tidyNotice();
      fitAll();
    });
  }
  window.addEventListener("resize", fitAll);
  window.addEventListener("orientationchange", function () { setTimeout(fitAll, 250); });
  document.addEventListener("error", function (e) {
    if (e.target && e.target.tagName === "IMG") swap(e.target);
  }, true);

  function press(b) {
    var text = getPrompt(b.getAttribute("data-ph-src"));
    if (!text) { setBtn(b, "none"); return; }
    copy(text, function () {
      setBtn(b, "ok");
    }, function () {
      setBtn(b, "err");
      manual(b.parentNode, text);
    }, b.parentNode);
  }
  /* Listens on window (capture) so the page's own handlers can't swallow the click. If a transparent overlay
     of the studio sits on top of the button, the button is still found by the click position. */
  window.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[data-ph-src]") : null;
    if (!b && e.clientX > 0 && document.elementsFromPoint) {
      var els = document.elementsFromPoint(e.clientX, e.clientY);
      for (var i = 0; i < els.length; i++) {
        if (els[i].hasAttribute && els[i].hasAttribute("data-ph-src")) { b = els[i]; break; }
      }
    }
    if (!b) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    press(b);
  }, true);
  try { new MutationObserver(sweep).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  sweep();
})();

/* Subject: Polity · Chapter: State_Executive_and_State_Legislature · 21 concept pages (+ overview) · 51 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — State Executive and State Legislature",
    thumb: {
      image: "images/General_Awareness/Polity/State_Executive_and_State_Legislature/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "GOVERNOR + CM",
      line2: "STATE EXECUTIVE",
      line3: "STATE LEGISLATURE",
      badge: "FULL CLASS",
      ribbon: "POLITY • NOTES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Governor, CM and State Legislature | Complete Polity for all exams",
      altTitles: ["Governor Powers, Veto and Pardon in One Class", "Legislative Council vs Assembly Made Easy"],
      description: "State Executive and State Legislature is a must-do Polity chapter. In this class we cover the Governor from appointment to powers, the Chief Minister and Council of Ministers, the Advocate General, and the State Legislature.\n\n📌 IN THIS CLASS\n✅ Governor: Art. 155 to 161, veto and pardon\n✅ Legislative Council vs Assembly\n✅ Articles 152 to 167 and state-wise strength\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #Governor #SSCCGL",
      tags: ["governor of state", "state executive", "state legislature", "legislative council", "legislative assembly", "vidhan sabha", "vidhan parishad", "indian polity", "polity for ssc", "polity for upsc", "polity for railways", "polity for banking", "governor powers", "governor vs president", "chief minister", "council of ministers", "advocate general", "article 153 to 167", "article 161 pardon", "article 213 ordinance", "bicameral states india", "polity mcq", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "State Executive and State"],
      hashtags: ["Polity", "Governor", "StateLegislature", "SSCCGL", "UPSC"],
      thumbText: "GOVERNOR + STATE LEGISLATURE",
      pinnedComment: "📌 Solve all the questions and write your score below 👇",
      communityPost: "🏛️ New Polity class is live: Governor, CM and State Legislature. Attempt the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 The Governor\n00:00 Governor's powers and bills\n00:00 President vs Governor\n00:00 Chief Minister and Council of Ministers\n00:00 Advocate General\n00:00 State Legislature\n00:00 Council vs Assembly\n00:00 Articles and strength tables",
      playlist: "Polity — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on the Governor, the Chief Minister and the State Legislature</u> — high-yield Polity for every competitive exam.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>21</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>51</b><span>Questions</span></div>
        <div class="cp-stat"><b>~93 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Governor — Basics</b><br>Nominal head, dual role, no Vice-Governor.</li>
        <li><b>Appointment and Qualifications</b><br>Art. 155 and 157: President appoints, age 35.</li>
        <li><b>Conditions of Office and Immunities</b><br>Art. 158: Raj Bhavan, emoluments, immunity.</li>
        <li><b>Oath and Term</b><br>Art. 159 and 156: 5 years at the President's pleasure.</li>
        <li><b>Executive Powers</b><br>CM, ministers, PSC, SEC, Chancellor.</li>
        <li><b>Legislative Powers</b><br>Ordinances (Art. 213), nomination, disqualification.</li>
        <li><b>Governor and Bills</b><br>Four options and compulsory reservation.</li>
        <li><b>Financial and Judicial Powers</b><br>Money bills, Contingency Fund, district judges.</li>
        <li><b>President vs Governor</b><br>Pardoning and veto compared.</li>
        <li><b>Chief Minister and Council of Ministers</b><br>De facto head, Cabinet, committees.</li>
        <li><b>Responsibility of Ministers</b><br>Art. 164: collective and individual.</li>
        <li><b>Advocate General</b><br>Art. 165: highest law officer of the state.</li>
        <li><b>State Legislature — Organisation</b><br>Unicameral, bicameral and the 6 Council states.</li>
        <li><b>Legislative Council</b><br>Permanent House, strength, powers.</li>
        <li><b>Council — Manner of Election</b><br>The five shares that make 1.</li>
        <li><b>Legislative Assembly</b><br>Strength, SC/ST reservation, term.</li>
        <li><b>Presiding Officers</b><br>Speaker, Chairman, removal, money-bill power.</li>
        <li><b>Sessions and Funds</b><br>Quorum, prorogation, three funds.</li>
        <li><b>Council vs Assembly</b><br>Where the Council is equal and where it is weaker.</li>
        <li><b>Articles 152–167 at a Glance</b><br>Article-to-subject match table.</li>
        <li><b>Strength of Assemblies and Councils</b><br>State-wise numbers to remember.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Governor's powers, Council vs Assembly and article numbers are asked in almost every SSC, UPSC, Railway and Banking Polity paper.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#22c55e", pauseTimer: true,
    title: "The Governor — Basics",
    html: `
      <p class="cp-lead">The Governor is the <b>nominal (de jure) head</b> of the state — <u>real power lies with the Chief Minister</u>.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>State executive</td><td>Arts. <b>153–167</b> (Part VI): Governor, CM, Council of Ministers, Advocate General</td></tr><tr><td>Vice-Governor</td><td><b>No such office</b> in the states</td></tr><tr><td>Role</td><td>Nominal head + agent of the Centre (<b>dual role</b>)</td></tr><tr><td>7th Amendment, 1956</td><td>One person can be Governor of <b>two or more states</b></td></tr><tr><td>Election</td><td>Neither directly nor indirectly elected (unlike the President)</td></tr></tbody></table>
      <div class="cp-note trap">The Centre has a Vice-President, but the states have <b>no Vice-Governor</b>.</div>
      <div class="cp-note exam">Governor = nominal head; CM = real head. Dual role = state head <i>and</i> Centre's agent.</div>
    `
  },
  3: {
    questext: "Which constitutional amendment allowed the same person to be Governor of two or more states?",
    options: ["7th Amendment, 1956", "42nd Amendment, 1976", "44th Amendment, 1978", "104th Amendment, 2019"],
    correct: "1",
    exptext: "✅ The 7th Amendment (1956). 📌 7th = reorganisation of states. ❌ 42nd and 44th changed legislature terms."
  },
  4: {
    questext: "Which of the following does NOT exist in the state executive?",
    options: ["Governor", "Chief Minister", "Advocate General", "Vice-Governor"],
    correct: "4",
    exptext: "✅ There is no Vice-Governor. 📌 Executive = Governor, CM, Council of Ministers, Advocate General. ❌ The Vice-President exists only at the Centre."
  },
  5: {
    type: "concept", icon: "📜", accent: "#f59e0b", pauseTimer: true,
    title: "Appointment and Qualifications (Art. 155, 157)",
    html: `
      <p class="cp-lead">The Governor is appointed by the <b>President</b> by warrant under his hand and seal — an <u>independent constitutional office</u>, not an employment under the Centre.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Appointment (Art. 155)</td><td>By the <b>President</b></td></tr><tr><td>Nature of office</td><td>Independent constitutional office (SC, <b>1979</b>)</td></tr><tr><td>Qualification (Art. 157)</td><td>Citizen of India; completed <b>35 years</b></td></tr><tr><td>Convention 1</td><td>Should be an <b>outsider</b> (free from local politics)</td></tr><tr><td>Convention 2</td><td>President should <b>consult the CM</b> — both conventions often violated</td></tr></tbody></table>
      <div class="cp-mnemonic">Minimum age steps down by 5: <b>Governor 35 → Council 30 → Assembly 25</b></div>
      <div class="cp-note exam">Governor must be <b>35</b>; the two conventions (outsider, CM consulted) are <i>not</i> written in the Constitution.</div>
    `
  },
  6: {
    questext: "What is the minimum age required to be appointed Governor of a state?",
    options: ["25 years", "30 years", "35 years", "40 years"],
    correct: "3",
    exptext: "✅ 35 years (Art. 157). 📌 Governor 35, MLC 30, MLA 25. ❌ 30 is for Legislative Council members."
  },
  7: {
    questext: "In 1979 the Supreme Court held that the office of the Governor is:",
    options: ["an employment under the Central Government", "an independent constitutional office", "subordinate to the Chief Minister", "elected by the state legislature"],
    correct: "2",
    exptext: "✅ Independent constitutional office, not employment under the Centre. 📌 Appointed by the President, yet not his employee. ❌ The \"employment\" view was rejected."
  },
  8: {
    questext: "Which of the following are conventions about appointing a Governor? I. He should be an outsider. II. The President should consult the Chief Minister. III. He must be a member of the state legislature.",
    options: ["I and II only", "II and III only", "I and III only", "I, II and III"],
    correct: "1",
    exptext: "✅ Outsider and CM consultation are conventions. 📌 Both are often violated. ❌ Governor must not be a legislature member."
  },
  9: {
    type: "concept", icon: "🏠", accent: "#ef4444", pauseTimer: true,
    title: "Conditions of Office and Immunities (Art. 158)",
    html: `
      <p class="cp-lead">These rules keep the Governor <u>independent of the legislature and shielded from legal action</u> during his term.</p>
      <table><thead><tr><th>Condition</th><th>Rule</th></tr></thead><tbody><tr><td>Membership</td><td>Not a member of Parliament or a state legislature; if appointed, he <b>vacates his seat</b> on assuming office</td></tr><tr><td>Other office</td><td>Must not hold any <b>office of profit</b></td></tr><tr><td>Residence</td><td>Official residence (<b>Raj Bhavan</b>) without rent</td></tr><tr><td>Emoluments</td><td>Determined by <b>Parliament</b>; cannot be diminished during his term</td></tr><tr><td>Two states</td><td>Emoluments <b>shared</b> in a proportion fixed by the <b>President</b></td></tr></tbody></table>
      <div class="cp-note tip"><b>Immunity:</b> no criminal proceedings during his term and he <b>cannot be arrested or imprisoned</b>; civil proceedings for personal acts only after <b>2 months' notice</b>.</div>
    `
  },
  10: {
    questext: "Which statement about the Governor's immunities is correct?",
    options: ["He can be arrested for personal acts", "Criminal proceedings can start after 2 months' notice", "Civil proceedings for personal acts need 2 months' notice", "He has no immunity from civil suits"],
    correct: "3",
    exptext: "✅ Civil proceedings for personal acts need 2 months' notice. 📌 Criminal proceedings are barred during his term. ❌ Arrest is not allowed."
  },
  11: {
    questext: "When one person is Governor of two or more states, the emoluments are shared in a proportion fixed by:",
    options: ["Parliament", "the Chief Justice of India", "the Chief Ministers of the states", "the President"],
    correct: "4",
    exptext: "✅ The President fixes the proportion. 📌 Parliament fixes the Governor's emoluments themselves. ❌ States do not decide it among themselves."
  },
  12: {
    type: "concept", icon: "📅", accent: "#8b5cf6", pauseTimer: true,
    title: "Oath and Term of the Governor (Art. 159, 156)",
    html: `
      <p class="cp-lead">The Governor's term is <b>5 years</b> — but <u>at the pleasure of the President</u>, so he has no security of tenure.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Oath (Art. 159)</td><td>By the <b>Chief Justice of the High Court</b> (senior-most judge if he is absent)</td></tr><tr><td>Term (Art. 156)</td><td><b>5 years</b> from the date he enters office</td></tr><tr><td>Removal</td><td>President can remove him any time; the Constitution lays down <b>no grounds</b></td></tr><tr><td>Resignation</td><td>By writing to the President</td></tr><tr><td>Beyond 5 years</td><td>Stays until his successor takes charge; can be <b>reappointed</b></td></tr></tbody></table>
      <div class="cp-note trap">The 5-year term is <i>subject to</i> the President's pleasure — there is <b>no fixed tenure</b>.</div>
      <div class="cp-note info"><b>Mass changes:</b> 1989 — the National Front (V.P. Singh) government asked Governors appointed by Congress to resign; 1991 — the Narasimha Rao government changed <b>14 Governors</b> appointed by the V.P. Singh and Chandra Shekhar governments.</div>
    `
  },
  13: {
    questext: "Who administers the oath of office to a Governor?",
    options: ["Chief Justice of the concerned High Court", "The President", "The Chief Minister", "The Speaker of the Assembly"],
    correct: "1",
    exptext: "✅ Chief Justice of the High Court (senior-most judge in his absence). 📌 Art. 159 = oath. ❌ The President only appoints him."
  },
  14: {
    questext: "Which statement about the Governor's tenure is correct?",
    options: ["A fixed 5-year term, removable only by impeachment", "Holds office at the pleasure of the Chief Minister", "Removable only by the High Court", "A 5-year term, subject to the pleasure of the President"],
    correct: "4",
    exptext: "✅ Term is 5 years but at the President's pleasure. 📌 No grounds of removal are laid down. ❌ Impeachment applies to the President."
  },
  15: {
    type: "concept", icon: "⚙️", accent: "#14b8a6", pauseTimer: true,
    title: "Governor's Executive Powers",
    html: `
      <p class="cp-lead">All executive action of the state is <b>formally taken in the Governor's name</b>.</p>
      <table><thead><tr><th>Power</th><th>Detail</th></tr></thead><tbody><tr><td>Ministers</td><td>Appoints the <b>CM</b> and other ministers (they hold office during his pleasure)</td></tr><tr><td>Tribal Welfare Minister</td><td>Compulsory in <b>Chhattisgarh, Jharkhand, Madhya Pradesh, Odisha</b></td></tr><tr><td>Advocate General, SEC</td><td>Appoints both; the State Election Commissioner is removed only like a <b>High Court judge</b></td></tr><tr><td>State PSC</td><td>Appoints Chairman and members — only the <b>President</b> can remove them</td></tr><tr><td>Information</td><td>Can seek information from the CM on administration and legislative proposals</td></tr><tr><td>President's Rule</td><td>Can recommend it; then acts as the Centre's agent with <b>extensive powers</b></td></tr><tr><td>Universities</td><td>Is <b>Chancellor</b>; appoints Vice-Chancellors</td></tr><tr><td>Finance Commission</td><td>Appoints the State Finance Commission</td></tr></tbody></table>
      <div class="cp-note trap">State PSC members are <b>appointed by the Governor</b> but <b>removed only by the President</b>.</div>
      <div class="cp-note exam">Governor has executive, legislative, financial and judicial powers — but <b>no diplomatic, military or emergency powers</b>.</div>
    `
  },
  16: {
    questext: "Which of the following powers does the Governor NOT have?",
    options: ["Military power", "Executive power", "Judicial power", "Financial power"],
    correct: "1",
    exptext: "✅ Governor has no diplomatic, military or emergency powers. 📌 He has four: executive, legislative, financial, judicial. ❌ The others he does have."
  },
  17: {
    questext: "Who can remove the Chairman of a State Public Service Commission?",
    options: ["The Governor", "The President", "The Chief Minister", "The State High Court"],
    correct: "2",
    exptext: "✅ Only the President can remove him. 📌 Governor appoints, President removes. ❌ The Governor cannot remove him."
  },
  18: {
    questext: "A separate Tribal Welfare Minister is compulsory in which set of states?",
    options: ["Bihar, Jharkhand, Madhya Pradesh", "Assam, Odisha, Jharkhand", "Chhattisgarh, Jharkhand, Madhya Pradesh, Odisha", "Gujarat, Rajasthan, Odisha"],
    correct: "3",
    exptext: "✅ Chhattisgarh, Jharkhand, Madhya Pradesh and Odisha. 📌 Four states, all tribal-heavy. ❌ Bihar is no longer on the list."
  },
  19: {
    type: "concept", icon: "🗳️", accent: "#ec4899", pauseTimer: true,
    title: "Governor's Legislative Powers",
    html: `
      <p class="cp-lead">The Governor is an <u>integral part of the state legislature</u> — no bill becomes law without his assent.</p>
      <table><thead><tr><th>Power</th><th>Detail</th></tr></thead><tbody><tr><td>Sessions</td><td><b>Summons</b> and <b>prorogues</b> the legislature; <b>dissolves</b> the Assembly</td></tr><tr><td>Address</td><td>At the first session after each general election and the first session of each year</td></tr><tr><td>Messages</td><td>Can send messages to the House(s) on a pending bill or otherwise</td></tr><tr><td>Presiding officer</td><td>Appoints a member to preside when both Speaker and Deputy Speaker (or Chairman and Deputy Chairman) are vacant</td></tr><tr><td>Nomination</td><td>Nominates <b>1/6</b> of the Council members (literature, science, art, cooperative movement, social service)</td></tr><tr><td>Disqualification</td><td>Decides it in consultation with the <b>Election Commission</b></td></tr><tr><td>Ordinances</td><td>Promulgates under <b>Art. 213</b> when the legislature is not in session</td></tr><tr><td>Reports</td><td>Lays State Finance Commission, State PSC and CAG reports before the legislature</td></tr></tbody></table>
      <div class="cp-note trap">President's ordinance power = <b>Art. 123</b>; Governor's = <b>Art. 213</b>.</div>
    `
  },
  20: {
    questext: "Under which Article can the Governor promulgate ordinances?",
    options: ["Article 123", "Article 200", "Article 356", "Article 213"],
    correct: "4",
    exptext: "✅ Article 213, when the legislature is not in session. 📌 123 = President, 213 = Governor. ❌ Article 123 is the President's power."
  },
  21: {
    questext: "The Governor decides on the disqualification of state legislators after consulting:",
    options: ["The Speaker", "The Election Commission", "The High Court", "The Advocate General"],
    correct: "2",
    exptext: "✅ He consults the Election Commission. 📌 Governor decides, Commission advises. ❌ The Speaker does not advise him here."
  },
  22: {
    type: "concept", icon: "🖊️", accent: "#3b82f6", pauseTimer: true,
    title: "Governor and Bills — Four Options",
    html: `
      <p class="cp-lead">Every bill passed by the legislature goes to the Governor, who has <b>four options</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/State_Executive_and_State_Legislature/1.png" alt="Flow: a bill and the four options of the Governor" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Option</th><th>Result</th></tr></thead><tbody><tr><td>Assent</td><td>Bill becomes an <b>Act</b></td></tr><tr><td>Withhold</td><td>Bill is not enacted</td></tr><tr><td>Return</td><td>If passed again, he <b>must assent</b> (suspensive veto)</td></tr><tr><td>Reserve</td><td>Sent for the <b>President's</b> consideration</td></tr></tbody></table>
      <div class="cp-note trap">Reservation is <b>obligatory</b> when the bill endangers the position of the <b>State High Court</b>.</div>
      <div class="cp-note tip"><b>He may also reserve a bill that is:</b> ultra vires, against the Directive Principles, against the larger interest of the country, of grave national importance, or about compulsory acquisition of property (Art. 31A).</div>
      <div class="cp-note exam">Once reserved, the Governor has no further role. The President may assent, withhold or return it (within <b>6 months</b>); even if passed again, the President is <b>not bound</b> to assent.</div>
    `
  },
  23: {
    questext: "Which option is available to the Governor but NOT to the President for an ordinary bill?",
    options: ["Give assent", "Withhold assent", "Reserve the bill for the President", "Return the bill for reconsideration"],
    correct: "3",
    exptext: "✅ Only the Governor can reserve a bill. 📌 Governor 4 options, President 3. ❌ The other three are common to both."
  },
  24: {
    questext: "The Governor MUST reserve a bill for the President when it:",
    options: ["Deals with a State List subject", "Endangers the position of the State High Court", "Is a money bill", "Is passed twice by the legislature"],
    correct: "2",
    exptext: "✅ Reservation is obligatory if the High Court's position is endangered. 📌 Other grounds are optional. ❌ Money bills are not reserved on this ground."
  },
  25: {
    questext: "If a bill returned by the Governor is passed again by the legislature, the Governor:",
    options: ["Must give assent", "May withhold assent", "Must reserve it for the President", "Must dissolve the Assembly"],
    correct: "1",
    exptext: "✅ He must assent — a suspensive veto. 📌 Returned once, then bound. ❌ Only the President is not bound after a reserved bill returns."
  },
  26: {
    type: "concept", icon: "💰", accent: "#f97316", pauseTimer: true,
    title: "Financial and Judicial Powers of the Governor",
    html: `
      <p class="cp-lead">No money moves without the Governor — <u>no money bill and no demand for a grant without his recommendation</u>.</p>
      <table><thead><tr><th>Financial power</th><th>Detail</th></tr></thead><tbody><tr><td>Budget</td><td>Ensures the <b>Annual Financial Statement</b> is laid before the legislature</td></tr><tr><td>Money bills</td><td>Introduced only with his <b>prior recommendation</b></td></tr><tr><td>Demand for grant</td><td>None can be made except on his recommendation</td></tr><tr><td>Contingency Fund</td><td>Makes advances from it for unforeseen expenditure</td></tr><tr><td>Finance Commission</td><td>Constitutes it <b>every 5 years</b> to review panchayats and municipalities</td></tr></tbody></table>
      <table><thead><tr><th>Judicial power</th><th>Detail</th></tr></thead><tbody><tr><td>Pardons</td><td>Pardons, reprieves, respites and remissions for offences against <b>state law</b></td></tr><tr><td>High Court judges</td><td>Consulted by the President while appointing them</td></tr><tr><td>District judges</td><td>Appoints, posts and promotes them in consultation with the <b>High Court</b></td></tr><tr><td>State judicial service</td><td>Appoints persons (with the High Court and State PSC)</td></tr></tbody></table>
      <div class="cp-note exam">Money bill = Governor's recommendation; district judges = Governor + High Court.</div>
    `
  },
  27: {
    questext: "A money bill can be introduced in the state Assembly only on the prior recommendation of:",
    options: ["The Speaker", "The Chief Minister", "The President", "The Governor"],
    correct: "4",
    exptext: "✅ The Governor's prior recommendation is needed. 📌 Same for demands for grants. ❌ The Speaker only certifies a money bill."
  },
  28: {
    questext: "Who appoints district judges in a state?",
    options: ["The Governor, in consultation with the High Court", "The President", "The Chief Minister alone", "The Chief Justice of the High Court alone"],
    correct: "1",
    exptext: "✅ Governor appoints, posts and promotes them after consulting the High Court. 📌 Governor + High Court. ❌ The CM has no independent role."
  },
  29: {
    type: "concept", icon: "⚔️", accent: "#84cc16", pauseTimer: true,
    title: "President vs Governor — Pardon and Veto",
    html: `
      <p class="cp-lead">Similar-looking powers, but the Governor is <u>narrower in pardons</u> and <u>wider in veto options</u>.</p>
      <table><thead><tr><th>Pardoning</th><th>President</th><th>Governor</th></tr></thead><tbody><tr><td>Offences</td><td>Central law offences; also court-martial sentences</td><td>State law offences only; <b>no power</b> over court-martial</td></tr><tr><td>Death sentence</td><td><b>Can pardon</b> it (only authority)</td><td><b>Cannot pardon</b>; can suspend, remit or commute</td></tr></tbody></table>
      <table><thead><tr><th>Veto on ordinary bills</th><th>President</th><th>Governor</th></tr></thead><tbody><tr><td>Options</td><td><b>Three:</b> assent, withhold, return (must assent if re-passed)</td><td><b>Four:</b> assent, withhold, return (must assent if re-passed), <b>reserve</b></td></tr></tbody></table>
      <div class="cp-note trap">Only the President can pardon a death sentence; the Governor may merely suspend, remit or commute it.</div>
    `
  },
  30: {
    questext: "For a death sentence under a state law, the Governor can:",
    options: ["Pardon it", "Suspend, remit or commute it", "Do nothing at all", "Only grant a reprieve"],
    correct: "2",
    exptext: "✅ He can suspend, remit or commute, not pardon. 📌 Death-sentence pardon = President only. ❌ He is not powerless."
  },
  31: {
    questext: "Which statement is NOT correct?",
    options: ["The President can pardon a court-martial sentence", "The Governor has no power over court-martial sentences", "The Governor can pardon a death sentence", "Only the President can pardon a death sentence"],
    correct: "3",
    exptext: "✅ The Governor cannot pardon a death sentence. 📌 Death-sentence pardon = President only. ❌ The other statements are accurate."
  },
  32: {
    type: "concept", icon: "👔", accent: "#06b6d4", pauseTimer: true,
    title: "Chief Minister and Council of Ministers",
    html: `
      <p class="cp-lead">The Governor reigns, the CM rules: <u>nominal head versus real head</u>.</p>
      <table><thead><tr><th>Office</th><th>Role</th></tr></thead><tbody><tr><td>Governor</td><td>Nominal executive (<b>de jure</b>) — head of the <b>state</b></td></tr><tr><td>Chief Minister</td><td>Real executive (<b>de facto</b>) — head of the <b>government</b>; analogous to the Prime Minister</td></tr><tr><td>Council of Ministers</td><td><b>Cabinet Ministers, Ministers of State, Deputy Ministers</b> (sometimes a Deputy CM)</td></tr><tr><td>Tenure</td><td>Generally 5 years; dissolved under President's Rule (<b>Art. 356/365</b>)</td></tr><tr><td>Cabinet</td><td>Smaller body of Cabinet Ministers — the <b>real centre of authority</b> and chief policy-making body; advises the Governor</td></tr><tr><td>Cabinet Committees</td><td><b>Standing</b> (permanent) and <b>Ad hoc</b>, set up by the CM</td></tr></tbody></table>
      <div class="cp-note exam">CM at the state = PM at the Centre; the Cabinet is the real centre of authority.</div>
    `
  },
  33: {
    questext: "The state Council of Ministers consists of which categories?",
    options: ["Cabinet Ministers only", "Cabinet Ministers and Ministers of State only", "Cabinet Ministers and Deputy Ministers only", "Cabinet Ministers, Ministers of State and Deputy Ministers"],
    correct: "4",
    exptext: "✅ Three categories: Cabinet, Ministers of State, Deputy Ministers. 📌 Cabinet is the smaller inner body. ❌ Two-category lists miss one tier."
  },
  34: {
    questext: "Which statement about the executive in a state is correct?",
    options: ["The Governor is the de facto head and the CM is the de jure head", "The Governor is the de jure head and the CM is the de facto head of the government", "Both are de facto heads", "The CM is only a nominal executive"],
    correct: "2",
    exptext: "✅ Governor = nominal (de jure); CM = real (de facto). 📌 Same as President and PM. ❌ The reverse is a common trap."
  },
  35: {
    type: "concept", icon: "🤝", accent: "#a855f7", pauseTimer: true,
    title: "Responsibility of Ministers (Art. 164)",
    html: `
      <p class="cp-lead">Ministers answer <b>collectively</b> to the Assembly, but serve <b>individually</b> at the Governor's pleasure.</p>
      <table><thead><tr><th>Type</th><th>Rule</th></tr></thead><tbody><tr><td>Collective</td><td>CoM is responsible to the <b>Legislative Assembly</b> — 'all swim or sink together'; a no-confidence motion forces <b>all to resign</b></td></tr><tr><td>Individual</td><td>Ministers hold office during the Governor's pleasure; he removes a minister only <b>on the CM's advice</b></td></tr><tr><td>Legal</td><td>No countersignature needed; courts <b>cannot inquire</b> into ministers' advice</td></tr></tbody></table>
      <div class="cp-note trap">The Council of Ministers answers to the <b>Assembly</b> — never to the Legislative Council.</div>
    `
  },
  36: {
    questext: "The state Council of Ministers is collectively responsible to:",
    options: ["The Legislative Assembly", "The Governor", "The Legislative Council", "The High Court"],
    correct: "1",
    exptext: "✅ Art. 164: collectively responsible to the Assembly. 📌 No-confidence vote = all resign. ❌ The Council cannot remove ministers."
  },
  37: {
    questext: "The Governor removes an individual minister:",
    options: ["At his own discretion", "On the Speaker's advice", "On the Chief Minister's advice", "After a High Court order"],
    correct: "3",
    exptext: "✅ Only on the CM's advice. 📌 Ministers serve during pleasure, but advice decides. ❌ He has no independent removal power."
  },
  38: {
    type: "concept", icon: "📖", accent: "#e11d48", pauseTimer: true,
    title: "Advocate General of the State (Art. 165)",
    html: `
      <p class="cp-lead">The <b>highest law officer of the state</b> — the counterpart of the Attorney General of India.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Appointment</td><td>By the <b>Governor</b></td></tr><tr><td>Qualification</td><td>Qualified to be a High Court judge (<b>10 years</b> in judicial office <i>or</i> 10 years as a High Court advocate)</td></tr><tr><td>Tenure</td><td>No fixed term or removal grounds; holds office during the <b>Governor's pleasure</b>; remuneration decided by the Governor</td></tr><tr><td>Functions</td><td>Advises the state government on legal matters; can appear before any court in the state</td></tr><tr><td>In legislature</td><td>Speaks in both Houses and committees but <b>cannot vote</b>; enjoys a member's privileges</td></tr><tr><td>Related</td><td>Arts. 165, 177, 194</td></tr></tbody></table>
      <div class="cp-note trap">Appointed by the <b>Governor</b> (not the President) and holds office at his pleasure.</div>
    `
  },
  39: {
    questext: "Which statement about the Advocate General of a state is correct?",
    options: ["He is appointed by the President", "He can vote in the legislature", "He has a fixed 5-year term", "He holds office during the Governor's pleasure"],
    correct: "4",
    exptext: "✅ Holds office at the Governor's pleasure. 📌 Speaks but cannot vote. ❌ No fixed term is laid down."
  },
  40: {
    questext: "The Advocate General of a state corresponds to which office at the Centre?",
    options: ["Solicitor General", "Attorney General of India", "Comptroller and Auditor General", "Union Law Minister"],
    correct: "2",
    exptext: "✅ Attorney General of India. 📌 Highest law officer: state = AG, Centre = Attorney General. ❌ Solicitor General is only his assistant."
  },
  41: {
    type: "concept", icon: "🗂️", accent: "#10b981", pauseTimer: true,
    title: "State Legislature — Organisation (Art. 168)",
    html: `
      <p class="cp-lead">Articles <b>168–212</b> (Part VI) deal with the state legislature — <u>similar to Parliament, with some differences</u>.</p>
      <table><thead><tr><th>Type</th><th>Composition</th></tr></thead><tbody><tr><td>Unicameral</td><td>Governor + Legislative Assembly</td></tr><tr><td>Bicameral</td><td>Governor + Legislative Council + Legislative Assembly</td></tr><tr><td>Bicameral states (6)</td><td><b>Andhra Pradesh, Telangana, Uttar Pradesh, Bihar, Maharashtra, Karnataka</b></td></tr><tr><td>Unicameral states</td><td>The remaining <b>22</b> states</td></tr></tbody></table>
      <div class="cp-note tip">Councils abolished: <b>Tamil Nadu (1986)</b>, <b>Punjab and West Bengal (1969)</b>. The Tamil Nadu Legislative Council Act, 2010 never came into force.</div>
    `
  },
  42: {
    questext: "How many states currently have a bicameral legislature?",
    options: ["4", "5", "6", "7"],
    correct: "3",
    exptext: "✅ Six: AP, Telangana, UP, Bihar, Maharashtra, Karnataka. 📌 The other 22 are unicameral. ❌ Fewer counts miss Telangana or Karnataka."
  },
  43: {
    questext: "Which of these states has a Legislative Council?",
    options: ["Tamil Nadu", "Punjab", "West Bengal", "Karnataka"],
    correct: "4",
    exptext: "✅ Karnataka has a Council. 📌 TN (1986), Punjab and WB (1969) abolished theirs. ❌ The other three have none now."
  },
  44: {
    type: "concept", icon: "🔝", accent: "#eab308", pauseTimer: true,
    title: "Legislative Council (Vidhan Parishad)",
    html: `
      <p class="cp-lead">The Council is a <u>permanent House — never dissolved</u>; one-third of its members retire every 2 years.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Creation or abolition (Art. 169)</td><td>Assembly resolution by <b>special majority</b>; then Parliament passes a law by <b>simple majority</b></td></tr><tr><td>Strength (Art. 171)</td><td>Not more than <b>1/3</b> of the Assembly's strength, but not less than <b>40</b></td></tr><tr><td>Election</td><td><b>5/6</b> indirectly elected (STV); <b>1/6</b> nominated by the Governor — the nomination cannot be challenged in court</td></tr><tr><td>Term (Art. 172)</td><td><b>6 years</b>; <b>1/3 retire every 2 years</b></td></tr><tr><td>Qualification (Art. 173)</td><td>Citizen of India, <b>30 years</b>, sound mind</td></tr><tr><td>Powers</td><td>Can delay an ordinary bill max <b>4 months</b> (3 + 1) and a money bill only <b>14 days</b></td></tr></tbody></table>
      <div class="cp-note exam">Parliament has the final authority to create or abolish a Council.</div>
    `
  },
  45: {
    questext: "What is the minimum strength of a state Legislative Council?",
    options: ["30", "40", "50", "60"],
    correct: "2",
    exptext: "✅ Not more than 1/3 of the Assembly, but not less than 40. 📌 Council: min 40. ❌ 60 is the Assembly's usual minimum."
  },
  46: {
    questext: "A Legislative Council can delay an ordinary bill for a maximum of:",
    options: ["14 days", "3 months", "4 months", "6 months"],
    correct: "3",
    exptext: "✅ 4 months in total (3 + 1). 📌 Money bill: only 14 days. ❌ 14 days applies to money bills."
  },
  47: {
    questext: "How is a Legislative Council created in a state?",
    options: ["Assembly passes a special-majority resolution, then Parliament passes a law by simple majority", "Parliament alone by special majority", "Governor on the CM's advice", "By a constitutional amendment ratified by half the states"],
    correct: "1",
    exptext: "✅ Assembly resolution (special majority) + Parliament law (simple majority). 📌 Parliament has final authority. ❌ No state ratification is needed."
  },
  48: {
    type: "concept", icon: "🥧", accent: "#0ea5e9", pauseTimer: true,
    title: "Council — Manner of Election (Art. 171(3))",
    html: `
      <p class="cp-lead">Five groups fill the Council: <u>1/3 + 1/12 + 1/12 + 1/3 + 1/6 = 1</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/State_Executive_and_State_Legislature/2.png" alt="Ring chart: shares of the Legislative Council" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Share</th><th>Elected / Nominated by</th></tr></thead><tbody><tr><td>1/3</td><td>Members of <b>local bodies</b> (municipalities, district boards etc.)</td></tr><tr><td>1/12</td><td><b>Graduates</b> of 3 years' standing residing in the state</td></tr><tr><td>1/12</td><td><b>Teachers</b> of 3 years' standing (not below secondary school)</td></tr><tr><td>1/3</td><td>Members of the <b>Legislative Assembly</b> (from non-members)</td></tr><tr><td>1/6</td><td>Nominated by the <b>Governor</b> (literature, science, art, social service, cooperation)</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>Thirds</b> for local bodies and MLAs, <b>twelfths</b> for graduates and teachers, a <b>sixth</b> for the Governor.</div>
    `
  },
  49: {
    questext: "What share of the Legislative Council is elected by the members of the Legislative Assembly?",
    options: ["1/6", "1/12", "1/3", "1/2"],
    correct: "3",
    exptext: "✅ One-third, from non-members of the Assembly. 📌 Local bodies also get 1/3. ❌ 1/6 is the Governor's nominated share."
  },
  50: {
    questext: "Which pair is correctly matched for election to the Legislative Council?",
    options: ["1/3 — Graduates", "1/12 — Teachers of 3 years' standing", "1/6 — Local bodies", "1/3 — Nominated by the Governor"],
    correct: "2",
    exptext: "✅ Teachers elect 1/12. 📌 Graduates 1/12, Governor 1/6. ❌ Graduates do not elect 1/3."
  },
  51: {
    type: "concept", icon: "🏢", accent: "#d946ef", pauseTimer: true,
    title: "Legislative Assembly (Vidhan Sabha)",
    html: `
      <p class="cp-lead">The Assembly is the <u>directly elected House</u> — the real power centre of the state legislature.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Strength (Art. 170)</td><td>Maximum <b>500</b>, minimum <b>60</b>; directly elected on universal adult franchise</td></tr><tr><td>Smaller Assemblies</td><td>By special provision: <b>Sikkim 32, Goa 40, Mizoram 40</b></td></tr><tr><td>SC/ST (Art. 332)</td><td>Seats reserved on population ratio; extended up to <b>2030</b> by the 104th Amendment</td></tr><tr><td>Anglo-Indian (Art. 333)</td><td>Governor's nomination of one member <b>discontinued</b> by the 104th Amendment, 2019</td></tr><tr><td>Term (Art. 172)</td><td>5 years; Governor may dissolve earlier on the CoM's advice; 42nd Amendment made it 6, 44th Amendment restored <b>5</b></td></tr><tr><td>Qualification (Art. 173)</td><td>Citizen of India, <b>25 years</b>, not of unsound mind or insolvent</td></tr></tbody></table>
      <div class="cp-note trap">Only the <b>Assembly</b> can be dissolved; the Council is permanent.</div>
    `
  },
  52: {
    questext: "What are the maximum and minimum strengths of a state Legislative Assembly (as per Art. 170)?",
    options: ["400 and 40", "500 and 60", "600 and 50", "500 and 50"],
    correct: "2",
    exptext: "✅ Maximum 500, minimum 60. 📌 Sikkim, Goa and Mizoram are special exceptions. ❌ 40 is the Council's minimum."
  },
  53: {
    questext: "Which amendment discontinued the Governor's nomination of an Anglo-Indian member to the Assembly?",
    options: ["95th Amendment", "61st Amendment", "104th Amendment", "42nd Amendment"],
    correct: "3",
    exptext: "✅ The 104th Amendment, 2019. 📌 It also extended SC/ST seats to 2030. ❌ 42nd changed the Assembly's term."
  },
  54: {
    questext: "The Assembly's term was raised to 6 years and later restored to 5 years by which amendments, respectively?",
    options: ["42nd and 44th", "44th and 42nd", "7th and 42nd", "52nd and 73rd"],
    correct: "1",
    exptext: "✅ 42nd (1976) raised it; 44th (1978) restored it. 📌 42 up, 44 back. ❌ The reverse order is wrong."
  },
  55: {
    type: "concept", icon: "🔨", accent: "#64748b", pauseTimer: true,
    title: "Presiding Officers of the State Legislature",
    html: `
      <p class="cp-lead">Each House elects its presiding officers <u>from among its own members</u>.</p>
      <table><thead><tr><th>House</th><th>Presiding officers</th></tr></thead><tbody><tr><td>Assembly (Art. 178)</td><td><b>Speaker</b>, <b>Deputy Speaker</b> + a panel of chairmen</td></tr><tr><td>Council (Art. 182)</td><td><b>Chairman</b>, <b>Deputy Chairman</b> + a panel of vice-chairmen</td></tr><tr><td>Removal</td><td>Majority of <b>all then-members</b>, after <b>14 days' notice</b></td></tr><tr><td>Powers</td><td>Speaker's powers = Lok Sabha Speaker's; Chairman's powers are similar</td></tr><tr><td>Salary</td><td>Charged on the <b>Consolidated Fund of the State</b> (not subject to annual vote)</td></tr></tbody></table>
      <div class="cp-note trap">Only the <b>Speaker</b> decides whether a bill is a <b>money bill</b> — not the Chairman.</div>
    `
  },
  56: {
    questext: "In a bicameral state, who decides whether a bill is a Money Bill?",
    options: ["The Chairman of the Council", "The Speaker of the Assembly", "The Governor", "The Advocate General"],
    correct: "2",
    exptext: "✅ Only the Speaker decides. 📌 Chairman's powers are similar except this one. ❌ The Governor only gives assent."
  },
  57: {
    questext: "A presiding officer of a state House can be removed by:",
    options: ["The Governor on his own", "Two-thirds of members present and voting", "The High Court", "A majority of all then-members after 14 days' notice"],
    correct: "4",
    exptext: "✅ Majority of all then-members, 14 days' notice. 📌 Same rule as in Parliament. ❌ A two-thirds vote is not required."
  },
  58: {
    type: "concept", icon: "📆", accent: "#fb7185", pauseTimer: true,
    title: "Sessions and Funds of the State",
    html: `
      <p class="cp-lead">Sessions follow the Governor's calendar; money follows <u>three separate funds</u>.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>Summoning</td><td>Governor summons each House; gap between two sessions <b>≤ 6 months</b></td></tr><tr><td>Prorogation</td><td>Presiding officer adjourns sine die; then the <b>Governor</b> issues the prorogation notification</td></tr><tr><td>Dissolution</td><td>Only the <b>Assembly</b> (Council is permanent)</td></tr><tr><td>Quorum</td><td><b>10 members or 1/10th</b> of the total, whichever is greater</td></tr></tbody></table>
      <table><thead><tr><th>Fund</th><th>Rule</th></tr></thead><tbody><tr><td>Consolidated Fund (Art. 266)</td><td>All revenues and loans; withdrawal only through an <b>Appropriation law</b></td></tr><tr><td>Public Account (Art. 266)</td><td>All other public money; no legislature approval needed</td></tr><tr><td>Contingency Fund (Art. 267)</td><td>At the <b>Governor's</b> disposal for unforeseen expenditure</td></tr></tbody></table>
    `
  },
  59: {
    questext: "What is the maximum gap allowed between two sessions of a state legislature?",
    options: ["3 months", "4 months", "6 months", "12 months"],
    correct: "3",
    exptext: "✅ Six months. 📌 Same as Parliament. ❌ 4 months is the Council's maximum delay of a bill."
  },
  60: {
    questext: "The quorum for a House of a state legislature is:",
    options: ["1/10th of members only", "10 members or 1/10th of the total, whichever is greater", "1/3rd of members", "10 members or 1/10th, whichever is smaller"],
    correct: "2",
    exptext: "✅ 10 members or 1/10th, whichever is greater. 📌 Greater wins. ❌ \"Smaller\" would permit tiny quorums."
  },
  61: {
    questext: "Money can be withdrawn from the Consolidated Fund of a State only by:",
    options: ["An Appropriation law", "The Governor's order alone", "The CAG's approval", "The Finance Commission"],
    correct: "1",
    exptext: "✅ An Appropriation law. 📌 Contingency Fund (Art. 267) is the Governor's exception. ❌ The Governor cannot withdraw directly."
  },
  62: {
    type: "concept", icon: "⚖️", accent: "#2dd4bf", pauseTimer: true,
    title: "Legislative Council vs Legislative Assembly",
    html: `
      <p class="cp-lead">The Council is a <u>dilatory, advisory chamber</u> — much weaker than the Rajya Sabha.</p>
      <table><thead><tr><th>Equal with the Assembly</th><th>Unequal / weaker than the Assembly</th></tr></thead><tbody><tr><td>Introduction and passage of ordinary bills (Assembly prevails on disagreement)</td><td>Money bill introduced only in the Assembly; Council cannot amend or reject it (returns it in <b>14 days</b>)</td></tr><tr><td>Approval of ordinances issued by the Governor</td><td>Speaker decides if a bill is a money bill; Assembly has final power over ordinary bills</td></tr><tr><td>Selection of ministers (both Houses participate)</td><td>Council can only <b>delay</b> an ordinary bill for max 4 months</td></tr><tr><td>Consideration of reports of constitutional bodies (SFC, State PSC, CAG)</td><td>Can discuss but <b>cannot vote</b> on demands for grants</td></tr><tr><td>Enlargement of the State PSC's jurisdiction</td><td>Cannot remove the Council of Ministers by a <b>no-confidence motion</b></td></tr></tbody></table>
      <div class="cp-note exam">A Council bill rejected by the Assembly simply <b>dies</b>. The Council does not take part in the President's election or the Rajya Sabha election.</div>
    `
  },
  63: {
    questext: "Which statement about the Legislative Council is correct?",
    options: ["It can reject a money bill", "It can remove the Council of Ministers by a no-confidence motion", "It takes part in the election of the President", "It can only delay an ordinary bill for a maximum of four months"],
    correct: "4",
    exptext: "✅ Delay of at most 4 months. 📌 Council is a dilatory chamber. ❌ It has no say over the Council of Ministers."
  },
  64: {
    questext: "A money bill passed by the Assembly must be returned by the Council within:",
    options: ["7 days", "14 days", "1 month", "3 months"],
    correct: "2",
    exptext: "✅ 14 days. 📌 Council cannot amend or reject it. ❌ 3 months is for the first delay of an ordinary bill."
  },
  65: {
    questext: "In which matter is the Council NOT equal to the Assembly?",
    options: ["Approval of ordinances issued by the Governor", "Selection of ministers", "Voting on demands for grants", "Consideration of State PSC reports"],
    correct: "3",
    exptext: "✅ Council can discuss but not vote on demands for grants. 📌 Budget voting = Assembly only. ❌ The others are shared powers."
  },
  66: {
    type: "concept", icon: "🔢", accent: "#b45309", pauseTimer: true,
    title: "State Executive — Articles 152–167 at a Glance",
    html: `
      <p class="cp-lead">Match every Article to its subject — <u>155 to 159 run in the order of a Governor's career</u>.</p>
      <table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td>152</td><td>Definition of State</td></tr><tr><td>153</td><td>Governors of States</td></tr><tr><td>154</td><td>Executive power of the State</td></tr><tr><td>155</td><td>Appointment of Governor</td></tr><tr><td>156</td><td>Term of office of Governor</td></tr><tr><td>157</td><td>Qualifications for Governor</td></tr><tr><td>158</td><td>Conditions of Governor's office</td></tr><tr><td>159</td><td>Oath or affirmation by the Governor</td></tr><tr><td>160</td><td>Discharge of functions in certain contingencies</td></tr><tr><td>161</td><td>Power to grant pardons, etc.</td></tr><tr><td>162</td><td>Extent of executive power of the State</td></tr><tr><td>163</td><td>Council of Ministers to aid and advise the Governor</td></tr><tr><td>164</td><td>Other provisions as to ministers</td></tr><tr><td>165</td><td>Advocate General for the State</td></tr><tr><td>166</td><td>Conduct of business of the State Government</td></tr><tr><td>167</td><td>Duties of the Chief Minister</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>155</b> appointed → <b>156</b> term → <b>157</b> qualified → <b>158</b> conditions → <b>159</b> oath</div>
    `
  },
  67: {
    questext: "Article 161 deals with which power of the Governor?",
    options: ["Oath of office", "Pardoning power", "Appointment", "Appointing the Advocate General"],
    correct: "2",
    exptext: "✅ Art. 161 = power to grant pardons, etc. 📌 Governor's pardon = 161; President's = 72. ❌ Oath is Art. 159."
  },
  68: {
    questext: "Which Article deals with the oath or affirmation by the Governor?",
    options: ["Article 156", "Article 157", "Article 158", "Article 159"],
    correct: "4",
    exptext: "✅ Article 159. 📌 155 appoint, 156 term, 157 qualify, 158 conditions, 159 oath. ❌ 156 is the term of office."
  },
  69: {
    questext: "Which pair is correctly matched?",
    options: ["Art. 163 — Council of Ministers to aid and advise the Governor", "Art. 154 — Appointment of Governor", "Art. 166 — Duties of the Chief Minister", "Art. 167 — Conduct of business of the State Government"],
    correct: "1",
    exptext: "✅ Art. 163 is the aid-and-advise provision. 📌 166 = business, 167 = CM's duties. ❌ Options 3 and 4 are swapped."
  },
  70: {
    type: "concept", icon: "📊", accent: "#7c3aed", pauseTimer: true,
    title: "Strength of State Assemblies and Councils",
    html: `
      <p class="cp-lead"><b>31</b> Assemblies (28 states + 3 UTs) but only <b>6</b> Councils — know the extremes.</p>
      <table><thead><tr><th>State / UT</th><th>Assembly</th><th>State / UT</th><th>Assembly</th></tr></thead><tbody><tr><td>Andhra Pradesh</td><td>175</td><td>Arunachal Pradesh</td><td>60</td></tr><tr><td>Assam</td><td>126</td><td>Bihar</td><td>243</td></tr><tr><td>Chhattisgarh</td><td>90</td><td>Goa</td><td>40</td></tr><tr><td>Gujarat</td><td>182</td><td>Haryana</td><td>90</td></tr><tr><td>Himachal Pradesh</td><td>68</td><td>Jharkhand</td><td>81</td></tr><tr><td>Karnataka</td><td>224</td><td>Kerala</td><td>140</td></tr><tr><td>Madhya Pradesh</td><td>230</td><td>Maharashtra</td><td>288</td></tr><tr><td>Manipur</td><td>60</td><td>Meghalaya</td><td>60</td></tr><tr><td>Mizoram</td><td>40</td><td>Nagaland</td><td>60</td></tr><tr><td>Odisha</td><td>147</td><td>Punjab</td><td>117</td></tr><tr><td>Rajasthan</td><td>200</td><td>Sikkim</td><td>32</td></tr><tr><td>Tamil Nadu</td><td>234</td><td>Telangana</td><td>119</td></tr><tr><td>Tripura</td><td>60</td><td>Uttarakhand</td><td>70</td></tr><tr><td>Uttar Pradesh</td><td>403</td><td>West Bengal</td><td>294</td></tr><tr><td>Delhi (UT)</td><td>70</td><td>Puducherry (UT)</td><td>30</td></tr><tr><td>Jammu and Kashmir (UT)</td><td>90</td><td>—</td><td>—</td></tr></tbody></table>
      <div class="cp-note tip"><b>Councils (6):</b> Uttar Pradesh 100, Maharashtra 78, Bihar 75, Karnataka 75, Andhra Pradesh 58, Telangana 40.</div>
      <div class="cp-note exam">Largest Assembly: <b>Uttar Pradesh (403)</b>; smallest state Assembly: <b>Sikkim (32)</b>; largest Council: <b>Uttar Pradesh (100)</b>.</div>
    `
  },
  71: {
    questext: "Which state has the largest Legislative Assembly?",
    options: ["Maharashtra", "West Bengal", "Uttar Pradesh", "Madhya Pradesh"],
    correct: "3",
    exptext: "✅ Uttar Pradesh has 403 seats. 📌 UP 403, WB 294, Maharashtra 288. ❌ Maharashtra has 288."
  },
  72: {
    questext: "Among the states, which has the smallest Legislative Assembly?",
    options: ["Sikkim", "Goa", "Mizoram", "Manipur"],
    correct: "1",
    exptext: "✅ Sikkim has 32 members. 📌 Goa and Mizoram have 40. ❌ Goa has 40 and Manipur 60."
  },
  73: {
    questext: "Which state's Legislative Council has 78 members?",
    options: ["Karnataka", "Maharashtra", "Bihar", "Uttar Pradesh"],
    correct: "2",
    exptext: "✅ Maharashtra has 78. 📌 Karnataka and Bihar 75, UP 100. ❌ Karnataka has 75."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/State_Executive_and_State_Legislature/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a refined miniature government house with a dome, a brass gavel on a stand and a rolled blank parchment scroll" },
  "images/General_Awareness/Polity/State_Executive_and_State_Legislature/1.png": { t: "fig", about: "A box BILL on the left with four arrows to four boxes: ASSENT = ACT, WITHHOLD = NO ACT, RETURN = PASSED AGAIN: MUST ASSENT, RESERVE = PRESIDENT DECIDES." },
  "images/General_Awareness/Polity/State_Executive_and_State_Legislature/2.png": { t: "fig", about: "A ring chart split into five labelled slices: 1/3 LOCAL BODIES, 1/12 GRADUATES, 1/12 TEACHERS, 1/3 MLAs, 1/6 GOVERNOR." }
});

/* CHANGE LOG
   - Legislative Assembly minimum strength: the book lists Arunachal/Sikkim/Goa at 30 and Nagaland at 46; corrected to the current position (Sikkim 32, Goa 40, Mizoram 40; Arunachal and Nagaland are 60, as in the book's own strength table).
   - Governor's removal: the book calls the President's pleasure 'not justiciable'; the pages now say only that the term is at the President's pleasure with no grounds laid down (the SC in B.P. Singhal, 2010, held removal cannot be arbitrary).
   - Pages 44-47 of the PDF (Parliament) were left out as they are outside this chapter.
*/