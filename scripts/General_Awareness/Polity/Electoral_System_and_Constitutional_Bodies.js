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

/* Field: General_Awareness · Subject: Polity · Chapter: Electoral_System_and_Constitutional_Bodies · 9 concept pages (+ overview) · 25 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Polity/Electoral_System_and_Constitutional_Bodies/thumbnail.png",
      banner: "SSC • UPSC • RAILWAYS 2026",
      line1: "ELECTORAL SYSTEM",
      line2: "& CONSTITUTIONAL",
      line3: "BODIES",
      badge: "FULL CLASS",
      ribbon: "ELECTIONS • PARTIES • TENTH SCHEDULE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Electoral System, Party Recognition & Anti-Defection Law | Polity for All Exams",
      altTitles: ["National vs State Party Conditions Trick | Polity", "Anti-Defection Law Tenth Schedule in One Shot | Polity"],
      description: "Electoral System is a high-scoring Polity topic. In this class you learn election provisions, EVM-NOTA-VVPAT firsts, party recognition conditions and the Tenth Schedule with easy tricks and exam-level questions.\n\n📌 IN THIS CLASS\n✅ Articles 324 to 329 and electoral systems\n✅ Electoral reforms: EVM, NOTA, VVPAT\n✅ National and State Party conditions\n✅ Anti-Defection Law and Tenth Schedule\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Election provisions\n00:00 Electoral systems\n00:00 Reform committees\n00:00 EVM NOTA VVPAT\n00:00 National Party\n00:00 State Party\n00:00 Anti-Defection Law\n00:00 Exceptions\n00:00 Judicial review\n\n👍 Like, share, subscribe.\n\n#Polity #SSCCGL #UPSC",
      tags: ["electoral system india", "anti defection law", "tenth schedule", "national party conditions", "state party conditions", "evm nota vvpat", "article 324", "election commission", "polity for all exams", "indian polity", "polity tricks", "polity mcq", "kihoto hollohan case", "52nd amendment", "91st amendment", "electoral reforms", "fptp vs pr stv", "ssc cgl polity", "upsc polity", "railway polity", "static gk polity", "constitution of india", "polity previous year questions", "competitive exams polity", "SSC CGL", "UPSC", "Electoral System and Consti"],
      hashtags: ["Polity", "SSCCGL", "UPSC"],
      thumbText: "ELECTORAL SYSTEM & ANTI-DEFECTION",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🗳️ New Polity class is live: Electoral System, Party Recognition & Anti-Defection Law. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Election provisions\n00:00 Electoral systems\n00:00 Reform committees\n00:00 EVM NOTA VVPAT\n00:00 National Party\n00:00 State Party\n00:00 Anti-Defection Law\n00:00 Exceptions\n00:00 Judicial review",
      playlist: "Polity — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on India's electoral system</u> — election provisions, EVM-NOTA-VVPAT, party recognition and the anti-defection law.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>9</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>25</b><span>Questions</span></div>
        <div class="cp-stat"><b>~43 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Constitutional Provisions on Elections</b><br>Part XV, Articles 324 to 329.</li>
        <li><b>Electoral Systems Adopted in India</b><br>FPTP vs PR-STV.</li>
        <li><b>Committees on Electoral Reforms</b><br>Goswami 1990, Gupta 1998.</li>
        <li><b>Major Electoral Reforms (EVM, NOTA, VVPAT)</b><br>Years, places and first uses.</li>
        <li><b>Conditions to be Recognised as a NATIONAL Party</b><br>Three conditions, any one.</li>
        <li><b>Conditions to be Recognised as a STATE Party</b><br>Five conditions, any one.</li>
        <li><b>Anti-Defection Law (Tenth Schedule)</b><br>52nd Amendment and grounds of disqualification.</li>
        <li><b>Exceptions to Disqualification</b><br>Merger needs two-thirds.</li>
        <li><b>Determining Authority &amp; Judicial Review</b><br>Presiding Officer and Kihoto Hollohan.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> party-recognition numbers, NOTA/VVPAT firsts and the Tenth Schedule rules are repeated favourites in SSC, UPSC, Railways and State exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🗳️", accent: "#3b82f6", pauseTimer: true,
    title: "Constitutional Provisions on Elections",
    html: `
      <p class="cp-lead">Elections are dealt with in <b>Part XV</b> of the Constitution, under <b>Articles 324 to 329</b>.</p>
      <div class="cp-note info">India follows <b>Universal Adult Franchise</b> — every citizen aged <b>18 years</b> and above can vote.</div>
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>324</td><td>Establishes the <b>Election Commission</b> to conduct free and fair elections</td></tr><tr><td>325</td><td>No person can be disqualified from the electoral roll on grounds of <b>religion, race, caste or sex</b></td></tr><tr><td>327</td><td><b>Parliament</b> can make laws on all matters relating to elections to either House or a State Legislature</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>324</b> Commission · <b>325</b> No discrimination · <b>327</b> Parliament's election laws</div>
      <div class="cp-note exam">The voting age is <b>18</b> — reduced from 21 by the 61st Amendment.</div>
    `
  },
  3: {
    questext: "Elections are dealt with in which Part of the Constitution, under Articles 324 to 329?",
    options: ["Part XIV", "Part XV", "Part XVIII", "Part XX"],
    correct: "2",
    exptext: "✅ Part XV. 📌 Articles 324–329 = elections. ❌ Part XIV covers services; Part XVIII covers emergency provisions."
  },
  4: {
    questext: "Which Article says that no person is to be disqualified from the electoral roll on grounds of religion, race, caste or sex?",
    options: ["Article 324", "Article 326", "Article 327", "Article 325"],
    correct: "4",
    exptext: "✅ Article 325. 📌 It bars discrimination in the electoral roll. ❌ 324 creates the Election Commission; 327 is Parliament's law-making power."
  },
  5: {
    questext: "Which Article gives Parliament the power to make laws on all matters relating to elections?",
    options: ["Article 327", "Article 324", "Article 325", "Article 315"],
    correct: "1",
    exptext: "✅ Article 327. 📌 Parliament legislates on elections to either House and State Legislatures. ❌ Article 324 sets up the Election Commission."
  },
  6: {
    type: "concept", icon: "⚙️", accent: "#f59e0b", pauseTimer: true,
    title: "Electoral Systems Adopted in India",
    html: `
      <p class="cp-lead">India uses <b>two types</b> of electoral systems, depending on the office.</p>
      <table><thead><tr><th>System</th><th>Where it is used</th></tr></thead><tbody><tr><td>First-Past-The-Post (FPTP)</td><td>Elections to the <b>Lok Sabha</b> and State Legislative Assemblies; the candidate with the <u>most votes wins</u></td></tr><tr><td>Proportional Representation by Single Transferable Vote (PR-STV)</td><td>Election of the <b>President, Vice-President, Rajya Sabha</b> and State Legislative Councils</td></tr></tbody></table>
      <div class="cp-note trap">Lok Sabha = FPTP, but <b>Rajya Sabha</b> = PR-STV — a common swap.</div>
      <div class="cp-note exam">Under FPTP the most votes wins — a <u>majority</u> is not required.</div>
    `
  },
  7: {
    questext: "Which electoral system is used for the election of the Rajya Sabha?",
    options: ["First-Past-The-Post", "Two-round run-off system", "Proportional Representation by Single Transferable Vote", "Party list system"],
    correct: "3",
    exptext: "✅ PR-STV. 📌 PR-STV is used for President, Vice-President, Rajya Sabha and State Legislative Councils. ❌ FPTP is for Lok Sabha and Assemblies."
  },
  8: {
    questext: "Which of the following is NOT elected through Proportional Representation by Single Transferable Vote?",
    options: ["The President", "The Vice-President", "Members of the Rajya Sabha", "Members of the Lok Sabha"],
    correct: "4",
    exptext: "✅ Lok Sabha members. 📌 They are elected by First-Past-The-Post. ❌ President, Vice-President and Rajya Sabha use PR-STV."
  },
  9: {
    type: "concept", icon: "📚", accent: "#22c55e", pauseTimer: true,
    title: "Committees on Electoral Reforms",
    html: `
      <p class="cp-lead">Two committees studied India's electoral reforms.</p>
      <table><thead><tr><th>Committee</th><th>Year</th></tr></thead><tbody><tr><td>Dinesh Goswami Committee</td><td><b>1990</b></td></tr><tr><td>Indrajit Gupta Committee</td><td><b>1998</b></td></tr></tbody></table>
      <div class="cp-mnemonic"><b>G</b>oswami <b>G</b>oes first (1990) → <b>G</b>upta follows (1998)</div>
      <div class="cp-note trap">Do not swap the years — Goswami is <b>1990</b>, Gupta is <b>1998</b>.</div>
    `
  },
  10: {
    questext: "Which committee–year pair on electoral reforms is correct?",
    options: ["Dinesh Goswami Committee – 1990", "Dinesh Goswami Committee – 1998", "Indrajit Gupta Committee – 1990", "Indrajit Gupta Committee – 2013"],
    correct: "1",
    exptext: "✅ Dinesh Goswami Committee – 1990. 📌 Goswami 1990, then Gupta 1998. ❌ Swapping the years is the usual trap."
  },
  11: {
    type: "concept", icon: "🖥️", accent: "#8b5cf6", pauseTimer: true,
    title: "Major Electoral Reforms (EVM, NOTA, VVPAT)",
    html: `
      <p class="cp-lead">Three reforms made voting <u>modern and fairer</u>: EVM, NOTA and VVPAT.</p>
      <table><thead><tr><th>Reform</th><th>Key facts</th></tr></thead><tbody><tr><td>EVM</td><td>1998: used experimentally in <b>16</b> Assembly constituencies — Rajasthan (5), Madhya Pradesh (5), Delhi (6); 1999: <b>Goa</b>, the first time across an entire State</td></tr><tr><td>NOTA</td><td>Introduced in <b>2013</b> in the Assembly elections of Chhattisgarh, Madhya Pradesh, Mizoram, Delhi and Rajasthan; first national use in the <b>16th Lok Sabha election, 2014</b></td></tr><tr><td>VVPAT</td><td><b>2013</b>: Supreme Court allowed phased introduction, calling it an essential requirement for free and fair elections; first used in <b>Noksen</b> (Nagaland)</td></tr></tbody></table>
      <div class="cp-note trap">NOTA began in <b>2013</b> in five States; its national debut was only in <b>2014</b>.</div>
      <div class="cp-note exam">Firsts to remember — <b>Goa</b> (EVM across a State, 1999) and <b>Noksen, Nagaland</b> (VVPAT, 2013).</div>
    `
  },
  12: {
    questext: "In 1998, EVMs were used on an experimental basis in 16 Assembly constituencies of which States?",
    options: ["Goa, Kerala and Delhi", "Rajasthan, Maharashtra and Delhi", "Rajasthan, Madhya Pradesh and Delhi", "Madhya Pradesh, Maharashtra and Goa"],
    correct: "3",
    exptext: "✅ Rajasthan (5), Madhya Pradesh (5), Delhi (6). 📌 Total 16 constituencies. ❌ Goa came a year later as a whole State."
  },
  13: {
    questext: "EVMs were used across an entire State for the first time in:",
    options: ["Delhi Assembly elections, 1998", "Goa Assembly elections, 1999", "Rajasthan Assembly elections, 1998", "Madhya Pradesh Assembly elections, 1998"],
    correct: "2",
    exptext: "✅ Goa, 1999. 📌 The 1998 trials covered only 16 constituencies. ❌ Delhi, Rajasthan and Madhya Pradesh had partial use."
  },
  14: {
    questext: "NOTA was first used at the national level in:",
    options: ["2009 Lok Sabha election", "2013 Assembly elections", "2019 Lok Sabha election", "16th Lok Sabha election, 2014"],
    correct: "4",
    exptext: "✅ 16th Lok Sabha election, 2014. 📌 NOTA debuted in five States' Assembly elections in 2013. ❌ 2013 was State-level use only."
  },
  15: {
    questext: "VVPAT was first used in the Noksen Assembly constituency of which State?",
    options: ["Nagaland", "Manipur", "Mizoram", "Arunachal Pradesh"],
    correct: "1",
    exptext: "✅ Nagaland, 2013. 📌 The Supreme Court allowed phased VVPAT introduction that year. ❌ Mizoram was among NOTA's first States, not VVPAT's."
  },
  16: {
    type: "concept", icon: "🏛️", accent: "#14b8a6", pauseTimer: true,
    title: "Conditions to be Recognised as a NATIONAL Party",
    html: `
      <p class="cp-lead">A party is recognised as a <b>National Party</b> if it satisfies <u>any one</u> of three conditions.</p>
      <table><thead><tr><th>Condition</th><th>Requirement</th></tr></thead><tbody><tr><td>1</td><td><b>6%</b> of valid votes in <b>four or more</b> States in a Lok Sabha or Assembly general election <b>AND</b> <b>4</b> Lok Sabha seats from any State(s)</td></tr><tr><td>2</td><td><b>2%</b> of Lok Sabha seats, with members elected from <b>three different States</b></td></tr><tr><td>3</td><td>Recognised as a <b>State Party</b> in at least <b>four</b> States</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>6 · 4 · 4</b> = 6% votes, 4 States, 4 Lok Sabha seats; or <b>2% · 3</b> States; or State Party in <b>4</b> States</div>
      <div class="cp-note trap">Condition 1 needs 6% votes <u>and</u> 4 Lok Sabha seats — votes alone are not enough.</div>
    `
  },
  17: {
    questext: "To be a National Party under the first condition, a party needs 6% of valid votes in four or more States AND how many Lok Sabha seats?",
    options: ["2 seats", "4 seats", "6 seats", "11 seats"],
    correct: "2",
    exptext: "✅ 4 Lok Sabha seats. 📌 6 · 4 · 4 = votes, States, seats. ❌ 2% of seats from three States is a separate condition."
  },
  18: {
    questext: "Which of the following is NOT a condition for recognition as a National Party?",
    options: ["6% of valid votes in four or more States and 4 Lok Sabha seats", "2% of Lok Sabha seats from three different States", "Recognised as a State Party in at least four States", "8% of total valid votes in a State's Lok Sabha or Assembly election"],
    correct: "4",
    exptext: "✅ The 8% condition. 📌 It is a State Party condition, added in 2011. ❌ The other three are National Party conditions."
  },
  19: {
    questext: "A party secures 7% of valid votes in five States but wins only 2 Lok Sabha seats and meets no other condition. What is its status?",
    options: ["National Party, as 6% votes in four States is enough", "National Party, as 2 seats equal 2% of seats", "Not a National Party, as 4 Lok Sabha seats are also required", "Not a National Party, as 8% votes are needed"],
    correct: "3",
    exptext: "✅ Condition 1 needs 6% votes AND 4 Lok Sabha seats. 📌 Votes alone are not enough. ❌ 2 seats are far below 2% of Lok Sabha seats."
  },
  20: {
    type: "concept", icon: "🏠", accent: "#ec4899", pauseTimer: true,
    title: "Conditions to be Recognised as a STATE Party",
    html: `
      <p class="cp-lead">A party is recognised as a <b>State Party</b> if it satisfies <u>any one</u> of five conditions.</p>
      <table><thead><tr><th>Condition</th><th>Requirement</th></tr></thead><tbody><tr><td>1</td><td><b>6%</b> of valid votes in the State's Assembly general election <b>AND</b> <b>2</b> seats in that State</td></tr><tr><td>2</td><td><b>6%</b> of valid votes in the Lok Sabha general election from that State <b>AND</b> at least <b>1</b> Lok Sabha seat from it</td></tr><tr><td>3</td><td><b>3%</b> of total Assembly seats or <b>3</b> seats, whichever is higher</td></tr><tr><td>4</td><td>At least <b>1</b> Lok Sabha seat for every <b>25</b> seats allotted to the State</td></tr><tr><td>5</td><td><b>8%</b> of total valid votes in a Lok Sabha or Assembly election of the State (added in <b>2011</b>)</td></tr></tbody></table>
      <div class="cp-note trap">Conditions 1 and 2 need votes <u>and</u> seats; condition 5 (<b>8%</b>) needs <u>votes only</u>.</div>
      <div class="cp-note exam">The 8% condition was added in <b>2011</b>.</div>
    `
  },
  21: {
    questext: "To be a State Party, a party needs 6% of valid votes in the Assembly general election AND how many seats in that State?",
    options: ["2 seats", "1 seat", "3 seats", "4 seats"],
    correct: "1",
    exptext: "✅ 2 seats. 📌 6% votes + 2 seats in that State. ❌ One seat goes with 6% in the State's Lok Sabha election."
  },
  22: {
    questext: "The condition of 8% of total valid votes for recognition as a State Party was added in:",
    options: ["2005", "2011", "2014", "2019"],
    correct: "2",
    exptext: "✅ 2011. 📌 It is the fifth State Party condition and needs votes only. ❌ The other four were already in place."
  },
  23: {
    questext: "Which of the following is NOT a condition for recognition as a State Party?",
    options: ["3% of Assembly seats or 3 seats, whichever is higher", "1 Lok Sabha seat for every 25 seats allotted to the State", "2% of Lok Sabha seats from three different States", "8% of total valid votes in a Lok Sabha or Assembly election of the State"],
    correct: "3",
    exptext: "✅ 2% of Lok Sabha seats from three States. 📌 That is a National Party condition. ❌ The others are State Party conditions."
  },
  24: {
    type: "concept", icon: "⚖️", accent: "#f97316", pauseTimer: true,
    title: "Anti-Defection Law (Tenth Schedule)",
    html: `
      <p class="cp-lead">The <b>52nd Constitutional Amendment Act, 1985</b> allows MPs and MLAs to be <u>disqualified for defection</u> (changing parties), and the grounds are detailed in the <b>Tenth Schedule</b>.</p>
      <table><thead><tr><th>Type of member</th><th>When disqualified</th></tr></thead><tbody><tr><td>Member of a political party</td><td>Voluntarily gives up party membership; OR votes/abstains against the party's direction in the House and is <u>not pardoned within 15 days</u></td></tr><tr><td>Independent member</td><td>Joins any political party after the election</td></tr><tr><td>Nominated member</td><td>Joins any political party <u>after 6 months</u> of taking his seat in the House</td></tr></tbody></table>
      <div class="cp-note trap">A nominated member has a <b>6-month</b> window; an independent member has <u>none</u>.</div>
      <div class="cp-note exam">In all cases the <b>Presiding Officer</b> decides on disqualification.</div>
    `
  },
  25: {
    questext: "The anti-defection law was added to the Constitution by which Amendment?",
    options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "52nd Amendment"],
    correct: "4",
    exptext: "✅ 52nd Amendment, 1985. 📌 It added the Tenth Schedule. ❌ The 91st Amendment (2003) later changed the merger rule."
  },
  26: {
    questext: "A nominated member of a House is disqualified if he joins a political party:",
    options: ["after 6 months of taking his seat", "within 6 months of taking his seat", "before taking his seat", "only with the Presiding Officer's permission"],
    correct: "1",
    exptext: "✅ After 6 months of taking his seat. 📌 Joining within 6 months is allowed. ❌ The window is not extended by permission."
  },
  27: {
    questext: "Consider the Tenth Schedule: I. A party member who votes against the party's direction and is not pardoned within 15 days is disqualified. II. An independent member who joins a party after the election is disqualified. III. A nominated member who joins a party within 6 months of taking his seat is disqualified. Which are correct?",
    options: ["I only", "I and II only", "II and III only", "I, II and III"],
    correct: "2",
    exptext: "✅ I and II. 📌 Nominated members get a 6-month window. ❌ III is wrong: joining within 6 months does not disqualify."
  },
  28: {
    questext: "A member who defies his party's direction in the House escapes disqualification if the party pardons him within:",
    options: ["7 days", "30 days", "15 days", "60 days"],
    correct: "3",
    exptext: "✅ 15 days. 📌 This is the party's pardon window. ❌ 30 days is for laying the Presiding Officer's rules before the House."
  },
  29: {
    type: "concept", icon: "🔀", accent: "#84cc16", pauseTimer: true,
    title: "Exceptions to Disqualification",
    html: `
      <p class="cp-lead">Two exceptions protect members from disqualification under the Tenth Schedule.</p>
      <table><thead><tr><th>Exception</th><th>Details</th></tr></thead><tbody><tr><td>Merger</td><td><b>Two-thirds</b> of the members of a legislature party agree to merge with another party</td></tr><tr><td>Presiding Officer</td><td>A member elected as Presiding Officer <u>voluntarily gives up</u> his party membership, or rejoins the party after his term ends</td></tr></tbody></table>
      <div class="cp-note trap">The old <b>one-third</b> split no longer protects defectors — the <b>91st Amendment, 2003</b> requires <b>two-thirds</b> for a merger.</div>
    `
  },
  30: {
    questext: "A merger of a legislature party with another party is protected from disqualification if what share of its members agree?",
    options: ["One-third", "One-half", "Three-fourths", "Two-thirds"],
    correct: "4",
    exptext: "✅ Two-thirds. 📌 The 91st Amendment made two-thirds the rule. ❌ One-third was the older, discarded threshold."
  },
  31: {
    questext: "Which Amendment replaced the one-third split exception with the two-thirds merger rule?",
    options: ["52nd Amendment, 1985", "91st Amendment, 2003", "97th Amendment, 2011", "101st Amendment, 2016"],
    correct: "2",
    exptext: "✅ 91st Amendment, 2003. 📌 52nd (1985) introduced the law itself. ❌ 97th and 101st deal with other subjects."
  },
  32: {
    type: "concept", icon: "🏛️", accent: "#06b6d4", pauseTimer: true,
    title: "Determining Authority & Judicial Review",
    html: `
      <p class="cp-lead">Defection cases are decided by the <b>Presiding Officer</b> of the House, but courts can review that decision.</p>
      <table><thead><tr><th>Point</th><th>Provision</th></tr></thead><tbody><tr><td>Deciding authority</td><td>The <b>Presiding Officer</b> of the House</td></tr><tr><td>Kihoto Hollohan case (1992)</td><td>Supreme Court: the Presiding Officer's decision under the Tenth Schedule is <b>subject to judicial review</b></td></tr><tr><td>Rules</td><td>Rules made by the Presiding Officer must be laid before the House for <b>30 days</b>; the House may <b>approve, amend or reject</b> them</td></tr></tbody></table>
      <div class="cp-note trap"><b>15 days</b> = the party's pardon window; <b>30 days</b> = rules laid before the House.</div>
    `
  },
  33: {
    questext: "Who decides questions of disqualification on the ground of defection?",
    options: ["The Election Commission", "The Supreme Court", "The Presiding Officer of the House", "The President"],
    correct: "3",
    exptext: "✅ The Presiding Officer of the House. 📌 Courts may review the decision. ❌ The Election Commission does not decide defection cases."
  },
  34: {
    questext: "In which case did the Supreme Court hold that the Presiding Officer's decision under the Tenth Schedule is subject to judicial review?",
    options: ["Kihoto Hollohan case, 1992", "Kesavananda Bharati case, 1973", "Minerva Mills case, 1980", "S.R. Bommai case, 1994"],
    correct: "1",
    exptext: "✅ Kihoto Hollohan case, 1992. 📌 It concerns the Tenth Schedule. ❌ The others deal with basic structure and Article 356."
  },
  35: {
    questext: "For how many days must the rules made by the Presiding Officer to implement the Tenth Schedule be laid before the House?",
    options: ["7 days", "15 days", "60 days", "30 days"],
    correct: "4",
    exptext: "✅ 30 days. 📌 The House may approve, amend or reject them. ❌ 15 days is the party's pardon period for defiance."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Electoral_System_and_Constitutional_Bodies/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a brushed-metal ballot box with a gold-rimmed slot, a classic voting machine silhouette and a rolled scroll with a gold ribbon" }
});

/* CHANGE LOG
   - EVM: book calls 1998 the first experimental use; the very first use was in 1982 (North Paravur, Kerala), so the page lists 1998 only as the 16-constituency trial.
   - Exceptions to disqualification: book lists the one-third split rule; it was removed by the 91st Amendment, 2003, so only the two-thirds merger is shown.
*/