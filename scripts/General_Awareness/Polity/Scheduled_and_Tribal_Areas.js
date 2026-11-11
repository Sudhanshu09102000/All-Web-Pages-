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

/* Field: General_Awareness · Subject: Polity · Chapter: Scheduled_and_Tribal_Areas · 10 concept pages (+ overview) · 29 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Polity/Scheduled_and_Tribal_Areas/thumbnail.png",
      banner: "SSC • UPSC • RAILWAYS 2026",
      line1: "SCHEDULED &",
      line2: "TRIBAL AREAS",
      line3: "ART. 244 • 370 • 371",
      badge: "FULL CLASS",
      ribbon: "5TH • 6TH SCHEDULE • TRICKS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Scheduled & Tribal Areas | Fifth vs Sixth Schedule, Art 370 & 371 | Polity",
      altTitles: ["Fifth Schedule vs Sixth Schedule Trick | Polity for All Exams", "Article 371 Series A to J in One Shot | Polity"],
      description: "Scheduled & Tribal Areas is one of the most repeated Polity topics. In this class you learn the Fifth and Sixth Schedules side by side, with easy tricks and exam-level questions.\n\n📌 IN THIS CLASS\n✅ Article 244 and Article 244A\n✅ Fifth Schedule and Tribes Advisory Council\n✅ Sixth Schedule and Autonomous District Councils\n✅ States and tribal areas lists\n✅ Article 370 and Article 371 series\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Article 244\n00:00 Article 244A\n00:00 Fifth Schedule\n00:00 Tribes Advisory Council\n00:00 Sixth Schedule\n00:00 Fifth vs Sixth\n00:00 Scheduled Areas list\n00:00 Tribal Areas list\n00:00 Article 370\n00:00 Article 371\n\n👍 Like, share, subscribe.\n\n#Polity #SSCCGL #UPSC",
      tags: ["scheduled and tribal areas", "fifth schedule", "sixth schedule", "article 244", "article 370", "article 371", "fifth vs sixth schedule", "tribes advisory council", "autonomous district council", "polity for all exams", "indian polity", "polity tricks", "polity mcq", "article 244A", "article 371 series", "scheduled areas in india", "tribal areas sixth schedule", "ssc cgl polity", "upsc polity", "railway polity", "static gk polity", "constitution of india", "polity previous year questions", "competitive exams polity", "Scheduled and Tribal Area"],
      hashtags: ["Polity", "SSCCGL", "UPSC"],
      thumbText: "SCHEDULED & TRIBAL AREAS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📜 New Polity class is live: Scheduled & Tribal Areas, Art. 370 and 371. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Article 244\n00:00 Article 244A\n00:00 Fifth Schedule\n00:00 Tribes Advisory Council\n00:00 Sixth Schedule\n00:00 Fifth vs Sixth\n00:00 Scheduled Areas list\n00:00 Tribal Areas list\n00:00 Article 370\n00:00 Article 371",
      playlist: "Polity — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on Scheduled &amp; Tribal Areas</u> — the Fifth and Sixth Schedules, plus Articles 370 and 371, in one class.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>10</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>29</b><span>Questions</span></div>
        <div class="cp-stat"><b>~49 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Scheduled &amp; Tribal Areas (Art. 244)</b><br>Two Schedules, two sets of States.</li>
        <li><b>Article 244A – Autonomous State within Assam</b><br>22nd Amendment, 1969.</li>
        <li><b>The Fifth Schedule – Scheduled Areas</b><br>President declares, Governor regulates.</li>
        <li><b>Tribes Advisory Council (TAC)</b><br>Maximum 20 members, 3/4 are ST.</li>
        <li><b>The Sixth Schedule – Tribal Areas</b><br>Autonomous District Councils: 30 members.</li>
        <li><b>Fifth Schedule vs Sixth Schedule</b><br>Side-by-side differences.</li>
        <li><b>States with Scheduled Areas (Fifth Schedule) – 10</b><br>The list of ten States.</li>
        <li><b>Tribal Areas under the Sixth Schedule (10)</b><br>3 + 3 + 1 + 3 areas.</li>
        <li><b>Article 370 – Special Status of J&amp;K</b><br>Instrument of Accession and key dates.</li>
        <li><b>Article 371 – Special Provisions for Other States</b><br>371 to 371J with amendments.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Fifth vs Sixth Schedule and the Article 371 list are repeated favourites in SSC, UPSC, Railways and State exams.</div>
    `
  },
  2: {
    type: "concept", icon: "📜", accent: "#3b82f6", pauseTimer: true,
    title: "The Scheduled & Tribal Areas (Art. 244)",
    html: `
      <p class="cp-lead"><b>Article 244 (Part X)</b> makes special provisions for the administration of <b>Scheduled Areas</b> and <b>Tribal Areas</b> — regions with large tribal populations that need <u>protection from ordinary laws</u>.</p>
      <table><thead><tr><th>Clause</th><th>Schedule</th><th>Applies to</th></tr></thead><tbody><tr><td>Art. 244(1)</td><td><b>Fifth Schedule</b></td><td>Scheduled Areas &amp; Scheduled Tribes in all States <u>except</u> Assam, Meghalaya, Tripura &amp; Mizoram</td></tr><tr><td>Art. 244(2)</td><td><b>Sixth Schedule</b></td><td>Tribal Areas of Assam, Meghalaya, Tripura &amp; Mizoram</td></tr></tbody></table>
      <div class="cp-note trap"><b>Fifth</b> Schedule = every State <u>except</u> the four NE States; <b>Sixth</b> Schedule = only those four.</div>
      <div class="cp-note exam">Expect "which Schedule for which area" questions — Part X (Art. 244) is the base.</div>
    `
  },
  3: {
    questext: "Special provisions for the administration of Scheduled Areas and Tribal Areas are made under which Article of Part X?",
    options: ["Article 243", "Article 244", "Article 275", "Article 371"],
    correct: "2",
    exptext: "✅ Article 244 (Part X). 📌 244 = administration of Scheduled and Tribal Areas. ❌ Art. 243 deals with Panchayats; Art. 275 gives grants-in-aid."
  },
  4: {
    questext: "The Fifth Schedule applies to the administration of Scheduled Areas in all States except:",
    options: ["Nagaland, Manipur, Arunachal Pradesh and Sikkim", "Assam, Nagaland, Manipur and Tripura", "Assam, Mizoram, Arunachal Pradesh and Tripura", "Assam, Meghalaya, Tripura and Mizoram"],
    correct: "4",
    exptext: "✅ Assam, Meghalaya, Tripura and Mizoram. 📌 Those four come under the Sixth Schedule instead. ❌ Other NE States are not in the exclusion list."
  },
  5: {
    questext: "Which of the following pairs is correctly matched?",
    options: ["Art. 244(1) – Fifth Schedule", "Art. 244(1) – Sixth Schedule", "Art. 244(2) – Fifth Schedule", "Art. 244(2) – Scheduled Areas of all States"],
    correct: "1",
    exptext: "✅ Art. 244(1) → Fifth Schedule. 📌 Clause (1) = Fifth, clause (2) = Sixth. ❌ Swapping the clauses is the common trap."
  },
  6: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "Article 244A – Autonomous State within Assam",
    html: `
      <p class="cp-lead">Article 244A lets Parliament form an <b>Autonomous State within Assam</b> by uniting certain tribal areas.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Inserted by</td><td><b>22nd Amendment, 1969</b></td></tr><tr><td>Power</td><td>Parliament forms an Autonomous State within Assam</td></tr><tr><td>Structure</td><td>Its own legislature and/or council of ministers</td></tr><tr><td>Example</td><td>Meghalaya (autonomous State in 1970, full State in 1972)</td></tr></tbody></table>
      <div class="cp-note trap">Art. 244A concerns <b>Assam only</b> — not any other State.</div>
      <div class="cp-note exam">Art. 244A and Art. 371B both came through the <b>22nd Amendment, 1969</b>.</div>
    `
  },
  7: {
    questext: "Article 244A was inserted into the Constitution by which Amendment?",
    options: ["7th Amendment", "13th Amendment", "22nd Amendment", "36th Amendment"],
    correct: "3",
    exptext: "✅ 22nd Amendment, 1969. 📌 Same amendment inserted Art. 371B for Assam. ❌ 7th is linked with Art. 371; 13th with Nagaland; 36th with Sikkim."
  },
  8: {
    questext: "Article 244A empowers Parliament to:",
    options: ["create a Union Territory for the tribal areas of Assam", "create an Autonomous State within Assam with its own legislature or council of ministers", "set up Autonomous District Councils in every State", "declare any area a Scheduled Area"],
    correct: "2",
    exptext: "✅ It lets Parliament form an Autonomous State within Assam, with its own legislature or council of ministers. ❌ ADCs belong to the Sixth Schedule."
  },
  9: {
    type: "concept", icon: "🌿", accent: "#22c55e", pauseTimer: true,
    title: "The Fifth Schedule – Scheduled Areas",
    html: `
      <p class="cp-lead">The Fifth Schedule governs <b>Scheduled Areas</b> and <b>Scheduled Tribes</b> in every State except the four NE States.</p>
      <table><thead><tr><th>Feature</th><th>Provision</th></tr></thead><tbody><tr><td>Declared by</td><td>The <b>President</b> may declare any area (except the 4 NE States) a <b>Scheduled Area</b></td></tr><tr><td>Governor's report</td><td>Submitted to the President <b>annually</b> or whenever required</td></tr><tr><td>Applicability of laws</td><td>Governor may direct that a law of Parliament/State <b>shall or shall not apply</b> to a Scheduled Area</td></tr><tr><td>Regulations</td><td>Governor <b>cannot</b> make one without consulting the TAC; the <b>President's assent</b> is needed</td></tr><tr><td>Amendment</td><td>Parliament can amend the Fifth Schedule — <u>not deemed</u> an Art. 368 amendment</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix up roles — the <b>President</b> declares the area; the <b>Governor</b> reports, directs and regulates.</div>
      <div class="cp-note exam">Governor's regulation = TAC consulted + President's assent (a frequent statement question).</div>
    `
  },
  10: {
    questext: "Who may declare an area as a Scheduled Area under the Fifth Schedule?",
    options: ["The President", "The Governor", "The Prime Minister", "The Chief Minister"],
    correct: "1",
    exptext: "✅ The President. 📌 President declares; Governor reports annually. ❌ The Governor reports and regulates but does not declare."
  },
  11: {
    questext: "Which condition must be met before the Governor's regulation for a Scheduled Area takes effect?",
    options: ["Prior approval of both Houses of Parliament", "Consent of the Chief Minister alone", "Consultation with the High Court", "Consultation with the TAC and the President's assent"],
    correct: "4",
    exptext: "✅ TAC consultation plus the President's assent. 📌 Governor proposes, TAC advises, President approves. ❌ Parliament's approval is not required."
  },
  12: {
    questext: "Consider the Fifth Schedule: I. The Governor submits an annual report on Scheduled Areas to the President. II. Parliament's amendment to the Fifth Schedule is a constitutional amendment under Art. 368. III. The Governor may direct that a law of Parliament shall not apply to a Scheduled Area. Which are correct?",
    options: ["I and II only", "II and III only", "I and III only", "I, II and III"],
    correct: "3",
    exptext: "✅ I and III. 📌 Annual report and law direction are the Governor's powers. ❌ II is wrong: such an amendment is not deemed an Art. 368 amendment."
  },
  13: {
    questext: "Which of the following is NOT true about the Fifth Schedule?",
    options: ["The President may declare Scheduled Areas", "It applies to Assam, Meghalaya, Tripura and Mizoram", "The Governor submits an annual report to the President", "Parliament's amendment is not deemed an Art. 368 amendment"],
    correct: "2",
    exptext: "✅ It excludes Assam, Meghalaya, Tripura and Mizoram; they follow the Sixth Schedule. 📌 Fifth = rest of India. ❌ The other statements are true."
  },
  14: {
    type: "concept", icon: "🤝", accent: "#8b5cf6", pauseTimer: true,
    title: "Tribes Advisory Council (TAC)",
    html: `
      <p class="cp-lead">The <b>Tribes Advisory Council (TAC)</b> advises on <u>ST welfare and advancement</u> in States with Scheduled Areas.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Strength</td><td>Maximum <b>20</b> members</td></tr><tr><td>Composition</td><td><b>3/4</b> must be ST representatives from the State Assembly</td></tr><tr><td>Role</td><td>Advises on ST welfare &amp; advancement, as referred by the Governor</td></tr><tr><td>Link</td><td>Governor must consult it before making a regulation for a Scheduled Area</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix up the numbers — the TAC has a maximum of <b>20</b>; an ADC has <b>30</b>.</div>
      <div class="cp-note exam">The TAC belongs to the <b>Fifth</b> Schedule; the ADC belongs to the <b>Sixth</b>.</div>
    `
  },
  15: {
    questext: "What is the maximum strength of a Tribes Advisory Council?",
    options: ["10 members", "26 members", "20 members", "30 members"],
    correct: "3",
    exptext: "✅ 20 members. 📌 20 is the maximum strength. ❌ 26 is the elected share of an ADC; 30 is the total ADC strength."
  },
  16: {
    questext: "What proportion of the Tribes Advisory Council must be ST representatives from the State Assembly?",
    options: ["Three-fourths", "One-half", "Two-thirds", "One-fourth"],
    correct: "1",
    exptext: "✅ Three-fourths. 📌 3/4 of the TAC are ST representatives from the State Assembly. ❌ One-fourth reverses the ratio."
  },
  17: {
    type: "concept", icon: "🏔️", accent: "#14b8a6", pauseTimer: true,
    title: "The Sixth Schedule – Tribal Areas",
    html: `
      <p class="cp-lead">The Sixth Schedule applies to the tribal areas of the four NE States through <b>Autonomous District Councils (ADC)</b> and Regional Councils.</p>
      <table><thead><tr><th>Feature</th><th>Provision</th></tr></thead><tbody><tr><td>ADC strength</td><td><b>30</b> members: <b>4</b> nominated by the Governor + <b>26</b> elected on adult franchise</td></tr><tr><td>Tenure</td><td><b>5</b> years</td></tr><tr><td>Law-making</td><td>Land, forests, canals, cultivation, village administration, inheritance, marriage &amp; social customs (with the Governor's assent)</td></tr><tr><td>Revenue</td><td>With the Governor's approval, assess &amp; collect land revenue and levy certain taxes</td></tr><tr><td>Justice</td><td>Can set up village councils/courts and exclude State-court jurisdiction</td></tr><tr><td>Amendment</td><td>Parliament's amendment is <u>not deemed</u> an Art. 368 amendment</td></tr></tbody></table>
      <div class="cp-note trap">ADC laws take effect only <b>after the Governor's assent</b>.</div>
      <div class="cp-note exam">ADC = 30 members (4 nominated + 26 elected) — the numbers are asked again and again.</div>
    `
  },
  18: {
    questext: "What is the composition of an Autonomous District Council under the Sixth Schedule?",
    options: ["30 members, all elected", "30 members: 26 nominated and 4 elected", "26 members: 4 nominated and 22 elected", "30 members: 4 nominated by the Governor and 26 elected"],
    correct: "4",
    exptext: "✅ 30 members: 4 nominated by the Governor + 26 elected. 📌 Tenure is 5 years. ❌ Reversing the numbers is a common trap."
  },
  19: {
    questext: "Which subject is NOT within the law-making power of an Autonomous District Council (with the Governor's assent)?",
    options: ["Forests", "Citizenship", "Marriage and social customs", "Village administration"],
    correct: "2",
    exptext: "✅ Citizenship. 📌 ADC laws cover land, forests, canals, cultivation, village administration, inheritance, marriage and customs. ❌ The others are listed ADC subjects."
  },
  20: {
    questext: "Consider the Sixth Schedule: I. ADC members are partly nominated and partly elected on adult franchise. II. Council laws take effect without the Governor's assent. III. Councils may set up village courts excluding State-court jurisdiction. Which are correct?",
    options: ["I and II only", "II and III only", "I, II and III", "I and III only"],
    correct: "4",
    exptext: "✅ I and III. 📌 ADC has nominated and elected members; village courts are allowed. ❌ II is wrong: Council laws need the Governor's assent."
  },
  21: {
    questext: "A Parliamentary amendment to the Sixth Schedule is:",
    options: ["deemed an amendment under Art. 368 requiring a special majority", "deemed an amendment under Art. 368 needing ratification by half the States", "not deemed an amendment under Art. 368", "valid only after approval of every ADC"],
    correct: "3",
    exptext: "✅ Not deemed an Art. 368 amendment. 📌 Same rule as the Fifth Schedule. ❌ Special majority and State ratification are not required."
  },
  22: {
    type: "concept", icon: "⚖️", accent: "#ec4899", pauseTimer: true,
    title: "Fifth Schedule vs Sixth Schedule",
    html: `
      <p class="cp-lead">Same Article 244, two different systems — learn them <u>side by side</u>.</p>
      <table><thead><tr><th>Point</th><th>Fifth Schedule (Scheduled Areas)</th><th>Sixth Schedule (Tribal Areas)</th></tr></thead><tbody><tr><td>Where</td><td>President declares any area (except Assam, Meghalaya, Tripura, Mizoram) a Scheduled Area</td><td>Tribal areas of Assam, Meghalaya, Tripura &amp; Mizoram</td></tr><tr><td>Key body</td><td>Tribes Advisory Council: max 20 members, 3/4 ST MLAs</td><td>Autonomous District Council: 30 members (4 nominated + 26 elected), 5-year tenure</td></tr><tr><td>Governor</td><td>Annual report to the President; directs whether laws apply; regulations need the President's assent (after TAC)</td><td>Council laws take effect only after the Governor's assent; revenue and taxes need his approval</td></tr><tr><td>Powers</td><td>TAC advises on ST welfare</td><td>Councils make laws on land, forests, cultivation, inheritance, marriage &amp; customs; set up village courts</td></tr><tr><td>Amendment</td><td>Not an Art. 368 amendment</td><td>Not an Art. 368 amendment</td></tr></tbody></table>
      <div class="cp-note trap"><b>TAC = Fifth</b>, <b>ADC = Sixth</b> — the most common swap in exams.</div>
      <div class="cp-note exam">Both Schedules can be amended by Parliament outside Art. 368.</div>
    `
  },
  23: {
    questext: "Which of the following pairs is correctly matched?",
    options: ["Fifth Schedule – Tribes Advisory Council", "Fifth Schedule – Autonomous District Council", "Sixth Schedule – Tribes Advisory Council", "Sixth Schedule – Governor's annual report on Scheduled Areas"],
    correct: "1",
    exptext: "✅ The Fifth Schedule has the Tribes Advisory Council. 📌 TAC = Fifth, ADC = Sixth. ❌ ADCs and village courts belong to the Sixth Schedule."
  },
  24: {
    questext: "Which feature is common to both the Fifth and the Sixth Schedule?",
    options: ["Both create Autonomous District Councils", "Both apply to Assam, Meghalaya, Tripura and Mizoram", "Parliament's amendment is not deemed an Art. 368 amendment", "Both require a Tribes Advisory Council"],
    correct: "3",
    exptext: "✅ Parliament's amendment is not deemed an Art. 368 amendment in both. 📌 Parliament can amend both by ordinary law. ❌ ADCs are Sixth only; TAC is Fifth only."
  },
  25: {
    type: "concept", icon: "🗺️", accent: "#f97316", pauseTimer: true,
    title: "States with Scheduled Areas (Fifth Schedule) – 10",
    html: `
      <p class="cp-lead"><b>Ten States</b> have Scheduled Areas under the Fifth Schedule.</p>
      <table><thead><tr><th>No.</th><th>State</th><th>No.</th><th>State</th></tr></thead><tbody><tr><td>1</td><td>Andhra Pradesh</td><td>2</td><td>Telangana</td></tr><tr><td>3</td><td>Odisha</td><td>4</td><td>Jharkhand</td></tr><tr><td>5</td><td>Chhattisgarh</td><td>6</td><td>Madhya Pradesh</td></tr><tr><td>7</td><td>Maharashtra</td><td>8</td><td>Gujarat</td></tr><tr><td>9</td><td>Rajasthan</td><td>10</td><td>Himachal Pradesh</td></tr></tbody></table>
      <div class="cp-note trap">Assam, Meghalaya, Tripura and Mizoram can <u>never</u> appear here — they follow the Sixth Schedule.</div>
      <div class="cp-note exam">Learn the list as Southern pair (AP, Telangana) + Eastern/Central + Western + Rajasthan + HP.</div>
    `
  },
  26: {
    questext: "Which of the following States has Scheduled Areas under the Fifth Schedule?",
    options: ["Assam", "Mizoram", "Tripura", "Himachal Pradesh"],
    correct: "4",
    exptext: "✅ Himachal Pradesh. 📌 It is among the 10 Fifth Schedule States. ❌ Assam, Mizoram and Tripura are Sixth Schedule States."
  },
  27: {
    questext: "Which of the following States does NOT have Scheduled Areas under the Fifth Schedule?",
    options: ["Karnataka", "Odisha", "Jharkhand", "Rajasthan"],
    correct: "1",
    exptext: "✅ Karnataka has none. 📌 Ten States: AP, Telangana, Odisha, Jharkhand, Chhattisgarh, MP, Maharashtra, Gujarat, Rajasthan, HP. ❌ The others are listed."
  },
  28: {
    type: "concept", icon: "🏞️", accent: "#84cc16", pauseTimer: true,
    title: "Tribal Areas under the Sixth Schedule (10)",
    html: `
      <p class="cp-lead">The Sixth Schedule covers <b>ten tribal areas</b> across four States.</p>
      <table><thead><tr><th>State</th><th>Tribal Areas / Districts</th></tr></thead><tbody><tr><td>Assam (3)</td><td>Dima Hasao (North Cachar Hills); Karbi Anglong; Bodoland Territorial Area District</td></tr><tr><td>Meghalaya (3)</td><td>Khasi Hills; Jaintia Hills; Garo Hills</td></tr><tr><td>Tripura (1)</td><td>Tripura Tribal Areas District</td></tr><tr><td>Mizoram (3)</td><td>Chakma District; Mara District; Lai District</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>3 + 3 + 1 + 3 = 10</b> — Assam, Meghalaya, Tripura, Mizoram</div>
      <div class="cp-note trap">Tripura has just <b>one</b> tribal area; the other three States have three each.</div>
    `
  },
  29: {
    questext: "Which State has only one tribal area under the Sixth Schedule?",
    options: ["Assam", "Tripura", "Meghalaya", "Mizoram"],
    correct: "2",
    exptext: "✅ Tripura (Tripura Tribal Areas District). 📌 3 + 3 + 1 + 3 = 10. ❌ Assam, Meghalaya and Mizoram have three each."
  },
  30: {
    questext: "Which of the following State – tribal area pairs is correctly matched?",
    options: ["Mizoram – Garo Hills", "Meghalaya – Mara District", "Assam – Karbi Anglong", "Tripura – Lai District"],
    correct: "3",
    exptext: "✅ Assam – Karbi Anglong. 📌 Assam: Dima Hasao, Karbi Anglong, BTAD. ❌ Garo Hills is in Meghalaya; Mara and Lai are in Mizoram."
  },
  31: {
    type: "concept", icon: "🕊️", accent: "#06b6d4", pauseTimer: true,
    title: "Article 370 – Special Status of J&K",
    html: `
      <p class="cp-lead">Article 370 (<b>Part XXI</b>) granted <b>special status</b> to Jammu &amp; Kashmir.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Basis</td><td>Under the Instrument of Accession, J&amp;K accepted Indian sovereignty over only <b>three subjects — Defence, External Affairs &amp; Communications</b></td></tr><tr><td>Promise</td><td>PM Nehru assured that J&amp;K would frame its own Constitution through its own <b>Constituent Assembly</b></td></tr><tr><td>Art. 370(3)</td><td>The President may declare it ceases to operate — originally only on the recommendation of the <b>J&amp;K Constituent Assembly</b></td></tr><tr><td>Present position</td><td>Ended in August 2019; J&amp;K and Ladakh became Union Territories</td></tr></tbody></table>
      <div class="cp-note info"><b>26 Oct 1947:</b> Maharaja Hari Singh signed the Instrument of Accession.<br><b>27 Oct 1947:</b> Lord Mountbatten accepted the accession.</div>
      <div class="cp-note exam">Three subjects = <b>D-E-C</b> (Defence, External Affairs, Communications); dates are one day apart.</div>
    `
  },
  32: {
    questext: "Under the Instrument of Accession, J&K accepted Indian sovereignty over which three subjects?",
    options: ["Defence, Finance and Communications", "External Affairs, Currency and Railways", "Defence, Foreign Trade and Posts", "Defence, External Affairs and Communications"],
    correct: "4",
    exptext: "✅ Defence, External Affairs and Communications. 📌 These three subjects were handed over at accession. ❌ Other options mix in finance, currency or trade."
  },
  33: {
    questext: "The Instrument of Accession was signed by Maharaja Hari Singh and accepted by Lord Mountbatten on:",
    options: ["26 Oct 1947 and 27 Oct 1947", "15 Aug 1947 and 26 Oct 1947", "27 Oct 1947 and 26 Oct 1947", "26 Jan 1950 and 27 Oct 1947"],
    correct: "1",
    exptext: "✅ Signed 26 Oct 1947, accepted 27 Oct 1947. 📌 Signed first, accepted the next day. ❌ Reversing the dates is a common trap."
  },
  34: {
    questext: "Article 370 is contained in which Part of the Constitution?",
    options: ["Part X", "Part XVIII", "Part XXII", "Part XXI"],
    correct: "4",
    exptext: "✅ Part XXI. 📌 Temporary, Transitional and Special Provisions. ❌ Part X is Scheduled and Tribal Areas."
  },
  35: {
    questext: "Originally, Article 370(3) allowed the President to declare it inoperative only on whose recommendation?",
    options: ["J&K Legislative Assembly", "J&K Constituent Assembly", "Parliament of India", "Governor of J&K"],
    correct: "2",
    exptext: "✅ J&K Constituent Assembly. 📌 It was to frame J&K's own Constitution. ❌ The Legislative Assembly or Governor was not the original authority."
  },
  36: {
    type: "concept", icon: "🧭", accent: "#e11d48", pauseTimer: true,
    title: "Article 371 – Special Provisions for Other States",
    html: `
      <p class="cp-lead">Article 371 and the series <b>371A–371J</b> give <u>special provisions to certain States</u>; Article 371 itself was added by the <b>7th Amendment, 1956</b>.</p>
      <table><thead><tr><th>Article</th><th>State / Region</th><th>Amendment</th></tr></thead><tbody><tr><td>371</td><td>Maharashtra &amp; Gujarat (Development Boards)</td><td>7th (1956)</td></tr><tr><td>371A</td><td>Nagaland</td><td>13th (1962)</td></tr><tr><td>371B</td><td>Assam</td><td>22nd (1969)</td></tr><tr><td>371C</td><td>Manipur (hill areas)</td><td>27th (1971)</td></tr><tr><td>371D &amp; 371E</td><td>Andhra Pradesh (extended to Telangana, 2014)</td><td>32nd (1973)</td></tr><tr><td>371F</td><td>Sikkim</td><td>36th (1975)</td></tr><tr><td>371G</td><td>Mizoram</td><td>53rd (1986)</td></tr><tr><td>371H</td><td>Arunachal Pradesh (former NEFA)</td><td>55th (1986)</td></tr><tr><td>371I</td><td>Goa</td><td>56th (1987)</td></tr><tr><td>371J</td><td>Karnataka (Hyderabad–Karnataka region)</td><td>98th (2012)</td></tr></tbody></table>
      <div class="cp-mnemonic">A to J in order — <b>N</b>agaland, <b>A</b>ssam, <b>M</b>anipur, <b>A</b>ndhra, <b>S</b>ikkim, <b>M</b>izoram, <b>A</b>runachal, <b>G</b>oa, <b>K</b>arnataka</div>
      <div class="cp-note exam"><b>371</b> gives Development Boards for Vidarbha, Marathwada, Saurashtra &amp; Kutch; <b>371A</b> gives Nagaland cultural autonomy and law and order.</div>
      <div class="cp-note trap">Arunachal Pradesh became a State in <b>1987</b>, a year after the 55th Amendment (1986).</div>
    `
  },
  37: {
    questext: "The Development Boards for Vidarbha, Marathwada, Saurashtra and Kutch are provided under Article 371 for which States?",
    options: ["Maharashtra and Madhya Pradesh", "Gujarat and Rajasthan", "Maharashtra and Gujarat", "Karnataka and Maharashtra"],
    correct: "3",
    exptext: "✅ Maharashtra and Gujarat. 📌 Boards for Vidarbha, Marathwada, Saurashtra and Kutch. ❌ Other pairings do not have these regions."
  },
  38: {
    questext: "Which sequence lists the Articles in the correct order of their insertion?",
    options: ["371A, 371C, 371G, 371J", "371C, 371A, 371G, 371J", "371A, 371G, 371C, 371J", "371J, 371G, 371C, 371A"],
    correct: "1",
    exptext: "✅ 371A (1962), 371C (1971), 371G (1986), 371J (2012). 📌 Amendments 13th, 27th, 53rd, 98th. ❌ Other orders break the year sequence."
  },
  39: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["371C – Manipur – 27th Amendment", "371G – Mizoram – 53rd Amendment", "371F – Sikkim – 36th Amendment", "371I – Goa – 55th Amendment"],
    correct: "4",
    exptext: "✅ Goa (371I) came by the 56th Amendment, 1987, not the 55th. 📌 The 55th (1986) gave Arunachal 371H. ❌ Others match."
  },
  40: {
    questext: "Articles 371D and 371E (32nd Amendment, 1973) were extended in 2014 to which State?",
    options: ["Karnataka", "Telangana", "Odisha", "Chhattisgarh"],
    correct: "2",
    exptext: "✅ Telangana. 📌 Extended by the AP Reorganisation Act, 2014. ❌ Karnataka has its own Article 371J."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Scheduled_and_Tribal_Areas/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a closed classic book with a gold bookmark ribbon, a brass compass and softly blurred green hill silhouettes" }
});

/* CHANGE LOG
   - Art. 244A example: replaced Karbi Anglong/Dima Hasao with Meghalaya (autonomous State within Assam in 1970, full State in 1972), the actual use of Art. 244A.
   - Tribes Advisory Council: removed 'Governor appoints the Chairperson and members'; the Fifth Schedule only lets the Governor make rules for their appointment.
   - Art. 370: added its current position (ended in August 2019; J&K and Ladakh became Union Territories) as the book describes only the original provision.
   - Art. 371: book says 11 States, but with Telangana the list covers 12 distinct States, so no count is stated.
*/