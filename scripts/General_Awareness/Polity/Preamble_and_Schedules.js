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

/* Subject: Polity · Chapter: Preamble_and_Schedules · 25 concept pages (+ overview) · 67 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📜", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Preamble & Schedules",
    thumb: {
      image: "images/General_Awareness/Polity/Preamble_and_Schedules/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "POLITY",
      line2: "PREAMBLE",
      line3: "12 SCHEDULES",
      badge: "FULL CLASS",
      ribbon: "CONCEPTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Preamble & 12 Schedules of the Constitution | Polity for all exams",
      altTitles: ["Preamble and Schedules One Shot | Indian Polity", "All 12 Schedules of Indian Constitution Tricks"],
      description: "The Preamble and the Schedules are guaranteed questions in every competitive exam. In this class we cover them in the simplest way.\n\n📌 IN THIS CLASS\n✅ Sources, comments and elements of the Preamble\n✅ Berubari and Kesavananda Bharati cases, 42nd Amendment\n✅ All 12 Schedules with numbers and amendments\n✅ Union, State and Concurrent Lists\n✅ Eighth Schedule languages and classical languages\n✅ Parts of the Constitution (Part I–XXII)\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #Preamble #Schedules",
      tags: ["12 schedules polity", "indian polity", "polity for ssc cgl", "polity for upsc", "preamble tricks", "kesavananda bharati case", "berubari union case", "42nd amendment preamble", "seventh schedule lists", "union state concurrent list", "eighth schedule languages", "classical languages of india", "fifth and sixth schedule", "tenth schedule anti defection", "ninth schedule land reforms", "eleventh twelfth schedule", "polity one shot", "static gk polity", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "Preamble and Sched"],
      hashtags: ["Polity", "Preamble", "Schedules"],
      thumbText: "PREAMBLE + 12 SCHEDULES",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📜 New Polity class is live: Preamble + 12 Schedules. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Indian Polity — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on the Preamble and the 12 Schedules</u> of the Constitution — a sure-shot scoring area in Polity.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>25</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>67</b><span>Questions</span></div>
        <div class="cp-stat"><b>~117 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Preamble — Sources &amp; Comments</b><br>What was borrowed from where, and who said what.</li>
        <li><b>Preamble — Elements &amp; Ideals</b><br>Source of power, nature of State, objectives, revolutions.</li>
        <li><b>Preamble — Cases &amp; Amendment</b><br>Berubari, Kesavananda Bharati and the 42nd Amendment.</li>
        <li><b>Schedules 1 to 4</b><br>States, emoluments, oaths, Rajya Sabha seats.</li>
        <li><b>Schedules 5 and 6</b><br>Scheduled Areas and Tribal Areas.</li>
        <li><b>Schedule 7 — Three Lists</b><br>Union, State, Concurrent, residuary and Parliament’s special powers.</li>
        <li><b>Schedule 8 and Classical Languages</b><br>22 languages, amendments and classical status.</li>
        <li><b>Schedules 9 to 12</b><br>Land reforms, anti-defection, Panchayats, Municipalities.</li>
        <li><b>Parts of the Constitution</b><br>Part I to XXII with subjects and Articles.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> numbers, amendments and one-word matches from the Schedules appear in almost every SSC, Railway and UPSC Prelims paper.</div>
    `
  },
  2: {
    type: "concept", icon: "📜", accent: "#22c55e", pauseTimer: true,
    title: "Sources of the Preamble",
    html: `
      <p class="cp-lead">The Preamble is the <b>introduction</b> to the Constitution, and three different sources shaped it.</p>
      <table><thead><tr><th>What was taken</th><th>From where</th></tr></thead><tbody><tr><td>Idea of having a Preamble</td><td>American Constitution</td></tr><tr><td>Language of the Preamble</td><td>Australian Constitution</td></tr><tr><td>Content (philosophy)</td><td>Objective Resolution (Nehru)</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix them up — the <u>idea</u> is American, the <u>language</u> is Australian, the <u>content</u> comes from the Objective Resolution.</div>
      <div class="cp-note exam">“Language of the Preamble is borrowed from?” is a favourite one-liner — answer: Australia.</div>
    `
  },
  3: {
    questext: "The idea of having a Preamble in the Indian Constitution was adopted from the",
    options: ["British Constitution", "American Constitution", "Australian Constitution", "Irish Constitution"],
    correct: "2",
    exptext: "✅ American Constitution. 📌 Idea = America. ❌ Australia gave only the language of the Preamble."
  },
  4: {
    questext: "Which of the following is correctly matched?",
    options: ["Idea of Preamble – Australian Constitution", "Language of Preamble – Objective Resolution", "Content of Preamble – Objective Resolution", "Content of Preamble – American Constitution"],
    correct: "3",
    exptext: "✅ Content comes from the Objective Resolution. 📌 Idea America, language Australia. ❌ Option 2 swaps language and content."
  },
  5: {
    type: "concept", icon: "💬", accent: "#f59e0b", pauseTimer: true,
    title: "Comments on the Preamble",
    html: `
      <p class="cp-lead">Three famous personalities described the Preamble in memorable one-liners.</p>
      <table><thead><tr><th>Personality</th><th>Comment</th></tr></thead><tbody><tr><td>N. A. Palkhivala</td><td>“Identity Card of the Constitution”</td></tr><tr><td>K. M. Munshi</td><td>“Political Horoscope of the Indian Constitution”</td></tr><tr><td>Sir Alladi Krishnaswami Iyer</td><td>“Preamble expresses what we had thought or dreamt so long”</td></tr></tbody></table>
      <div class="cp-note trap">Palkhivala = <u>Identity Card</u>; Munshi = <u>Political Horoscope</u> — examiners swap them.</div>
      <div class="cp-mnemonic">Identity card has a <b>P</b>hoto — <b>P</b>alkhivala; Horoscope is read by a <b>M</b>unshi — <b>M</b>unshi</div>
    `
  },
  6: {
    questext: "Who described the Preamble as the “Identity Card of the Constitution”?",
    options: ["K. M. Munshi", "Alladi Krishnaswami Iyer", "B. R. Ambedkar", "N. A. Palkhivala"],
    correct: "4",
    exptext: "✅ N. A. Palkhivala. 📌 Identity Card = Palkhivala. ❌ Munshi called it the Political Horoscope."
  },
  7: {
    questext: "The Preamble is called the “Political Horoscope of the Indian Constitution” by",
    options: ["K. M. Munshi", "N. A. Palkhivala", "Alladi Krishnaswami Iyer", "Jawaharlal Nehru"],
    correct: "1",
    exptext: "✅ K. M. Munshi. 📌 Horoscope = Munshi. ❌ Palkhivala’s phrase was Identity Card."
  },
  8: {
    type: "concept", icon: "🧩", accent: "#ef4444", pauseTimer: true,
    title: "Major Elements of the Preamble",
    html: `
      <p class="cp-lead">The Preamble answers three questions: <b>whose power</b>, <b>what kind of State</b>, and <b>what goals</b>.</p>
      <table><thead><tr><th>Element</th><th>Details</th></tr></thead><tbody><tr><td>Source of the Constitution / power</td><td>Indian citizens (“We, the People of India”)</td></tr><tr><td>Nature of State</td><td>Sovereign, Socialist, Secular, Democratic, Republic</td></tr><tr><td>Objectives</td><td>Justice, Liberty, Equality, Fraternity</td></tr><tr><td>Aims of Fraternity</td><td>Dignity of the individual, unity and integrity of the Nation</td></tr></tbody></table>
      <div class="cp-note trap">“Federal” is <u>not</u> a word in the Preamble, and Justice-Liberty-Equality-Fraternity are objectives, not the nature of the State.</div>
      <div class="cp-note exam">Five words describe the State — count them: Sovereign, Socialist, Secular, Democratic, Republic.</div>
    `
  },
  9: {
    questext: "According to the Preamble, the source of authority of the Constitution is",
    options: ["The Parliament", "The President", "The people of India", "The Constituent Assembly"],
    correct: "3",
    exptext: "✅ The people of India (“We, the People”). 📌 Power flows from citizens. ❌ The Constituent Assembly only drafted the text."
  },
  10: {
    questext: "Which of the following is NOT used in the Preamble to describe the nature of the State?",
    options: ["Sovereign", "Federal", "Secular", "Republic"],
    correct: "2",
    exptext: "✅ Federal is not in the Preamble. 📌 Five words: Sovereign, Socialist, Secular, Democratic, Republic. ❌ The others are all included."
  },
  11: {
    questext: "Which of the following is an objective of the Constitution and NOT a word describing the nature of the State?",
    options: ["Socialist", "Democratic", "Fraternity", "Sovereign"],
    correct: "3",
    exptext: "✅ Fraternity is an objective. 📌 Objectives: Justice, Liberty, Equality, Fraternity. ❌ The other three describe the State."
  },
  12: {
    type: "concept", icon: "🔥", accent: "#8b5cf6", pauseTimer: true,
    title: "Preamble — Ideals from Revolutions",
    html: `
      <p class="cp-lead">Two great revolutions gave the Preamble its core ideals.</p>
      <table><thead><tr><th>Ideal in the Preamble</th><th>Inspired by</th></tr></thead><tbody><tr><td>Social, Economic and Political Justice</td><td>Russian Revolution (1917)</td></tr><tr><td>Liberty, Equality, Fraternity</td><td>French Revolution (1789–1799)</td></tr></tbody></table>
      <div class="cp-note trap">Justice comes from <u>Russia</u>, while Liberty-Equality-Fraternity come from <u>France</u>.</div>
    `
  },
  13: {
    questext: "The ideal of Social, Economic and Political Justice in the Preamble is inspired by the",
    options: ["Russian Revolution (1917)", "French Revolution", "American Revolution", "Glorious Revolution"],
    correct: "1",
    exptext: "✅ Russian Revolution (1917). 📌 Justice = Russia. ❌ France gave Liberty, Equality and Fraternity."
  },
  14: {
    questext: "The ideals of Liberty, Equality and Fraternity in the Preamble were taken from the",
    options: ["Russian Revolution (1917)", "American Revolution (1776)", "Glorious Revolution (1688)", "French Revolution (1789–1799)"],
    correct: "4",
    exptext: "✅ French Revolution (1789–1799). 📌 LEF = France. ❌ Russia inspired only the ideal of Justice."
  },
  15: {
    type: "concept", icon: "⚖️", accent: "#14b8a6", pauseTimer: true,
    title: "Cases Related to the Preamble",
    html: `
      <p class="cp-lead">Whether the Preamble is part of the Constitution was settled by two landmark cases.</p>
      <table><thead><tr><th>Case</th><th>Year</th><th>Held</th></tr></thead><tbody><tr><td>Berubari Union Case</td><td>1960</td><td>Preamble is not an integral part of the Constitution</td></tr><tr><td>Kesavananda Bharati vs State of Kerala</td><td>1973</td><td>Preamble is an integral part of the Constitution</td></tr></tbody></table>
      <div class="cp-note trap">The 1960 view was reversed in 1973 — the <u>latest</u> view (integral part) is the correct one.</div>
      <div class="cp-note exam">Remember the order: Berubari (1960) said NO, Kesavananda Bharati (1973) said YES.</div>
    `
  },
  16: {
    questext: "In which case did the Supreme Court hold that the Preamble is NOT an integral part of the Constitution?",
    options: ["Berubari Union case", "Kesavananda Bharati case", "Golaknath case", "Minerva Mills case"],
    correct: "1",
    exptext: "✅ Berubari Union case (1960). 📌 1960 = not part. ❌ Kesavananda Bharati (1973) held the opposite."
  },
  17: {
    questext: "The Supreme Court held the Preamble to be an integral part of the Constitution in",
    options: ["Berubari Union case, 1960", "Golaknath case", "Maneka Gandhi case", "Kesavananda Bharati case, 1973"],
    correct: "4",
    exptext: "✅ Kesavananda Bharati vs State of Kerala (1973). 📌 1973 = integral part. ❌ Berubari took the opposite view."
  },
  18: {
    questext: "Consider: (i) Berubari Union case held that the Preamble is not part of the Constitution. (ii) Kesavananda Bharati case held that the Preamble is part of the Constitution. Which is correct?",
    options: ["Only (i)", "Both (i) and (ii)", "Only (ii)", "Neither (i) nor (ii)"],
    correct: "2",
    exptext: "✅ Both statements are correct. 📌 Berubari NO, Kesavananda YES. ❌ Option 3 forgets the earlier Berubari view."
  },
  19: {
    type: "concept", icon: "✍️", accent: "#ec4899", pauseTimer: true,
    title: "Amendment in the Preamble",
    html: `
      <p class="cp-lead">The Preamble has been amended only <b>once</b> — by the <u>42nd Constitutional Amendment, 1976</u>.</p>
      <table><thead><tr><th>Words added by the 42nd Amendment (1976)</th></tr></thead><tbody><tr><td>Socialist</td></tr><tr><td>Secular</td></tr><tr><td>Integrity</td></tr></tbody></table>
      <div class="cp-note trap">Sovereign, Democratic and Republic were in the original Preamble; only Socialist, Secular and Integrity were added later.</div>
      <div class="cp-note exam">42nd Amendment is called the “Mini Constitution” — a common exam link.</div>
    `
  },
  20: {
    questext: "Which Constitutional Amendment made a change in the Preamble?",
    options: ["24th Amendment", "42nd Amendment", "44th Amendment", "52nd Amendment"],
    correct: "2",
    exptext: "✅ 42nd Amendment (1976). 📌 Only one amendment so far. ❌ The 44th Amendment did not alter the Preamble."
  },
  21: {
    questext: "Which words were added to the Preamble by the 42nd Amendment?",
    options: ["Socialist, Secular, Integrity", "Sovereign, Democratic, Republic", "Justice, Liberty, Equality", "Socialist, Democratic, Fraternity"],
    correct: "1",
    exptext: "✅ Socialist, Secular and Integrity. 📌 S-S-I. ❌ Sovereign, Democratic, Republic were original words."
  },
  22: {
    questext: "Which of the following words was part of the original Preamble of 1950?",
    options: ["Socialist", "Secular", "Integrity", "Sovereign"],
    correct: "4",
    exptext: "✅ Sovereign was original. 📌 Added later: Socialist, Secular, Integrity. ❌ The other three came in 1976."
  },
  23: {
    type: "concept", icon: "🗺️", accent: "#3b82f6", pauseTimer: true,
    title: "Schedule 1: States, UTs & Territorial Jurisdiction",
    html: `
      <p class="cp-lead">The <b>First Schedule</b> gives the names of all States and Union Territories and their territorial jurisdiction.</p>
      <div class="cp-note exam">Whenever a State or UT is created or renamed, this Schedule is the one that changes.</div>
    `
  },
  24: {
    questext: "The names of the States and Union Territories and their territorial jurisdiction are listed in the",
    options: ["Second Schedule", "Fourth Schedule", "First Schedule", "Seventh Schedule"],
    correct: "3",
    exptext: "✅ First Schedule. 📌 First = map of India. ❌ The Fourth Schedule only allots Rajya Sabha seats."
  },
  25: {
    type: "concept", icon: "💰", accent: "#f97316", pauseTimer: true,
    title: "Schedule 2: Emoluments & Allowances",
    html: `
      <p class="cp-lead">The <b>Second Schedule</b> fixes the emoluments and allowances of top constitutional office-holders.</p>
      <table><thead><tr><th>Union level</th><th>State level</th></tr></thead><tbody><tr><td>President</td><td>Governor</td></tr><tr><td>Speaker &amp; Deputy Speaker (Lok Sabha)</td><td>Speaker &amp; Deputy Speaker (Legislative Assembly)</td></tr><tr><td>Chairman &amp; Deputy Chairman (Rajya Sabha)</td><td>Chairman &amp; Deputy Chairman (Legislative Council)</td></tr><tr><td>Judges of the Supreme Court</td><td>Judges of the High Courts</td></tr><tr><td>Comptroller and Auditor General (CAG)</td><td>—</td></tr></tbody></table>
      <div class="cp-note trap">The <u>Prime Minister</u> and other Ministers are not in this Schedule — their pay is set by Parliament through a law.</div>
    `
  },
  26: {
    questext: "Which of the following is NOT covered by the Second Schedule?",
    options: ["Governor", "Prime Minister", "Comptroller and Auditor General", "Speaker of the Lok Sabha"],
    correct: "2",
    exptext: "✅ Ministers’ pay is fixed by a law of Parliament. 📌 Second Schedule = constitutional heads and judges. ❌ The others are listed in it."
  },
  27: {
    questext: "The Second Schedule of the Constitution deals with",
    options: ["Oaths and affirmations", "Allocation of Rajya Sabha seats", "Official languages", "Emoluments and allowances"],
    correct: "4",
    exptext: "✅ Emoluments and allowances. 📌 Second = salary. ❌ Oaths belong to the Third Schedule."
  },
  28: {
    type: "concept", icon: "🙏", accent: "#84cc16", pauseTimer: true,
    title: "Schedule 3: Oaths and Affirmations",
    html: `
      <p class="cp-lead">The <b>Third Schedule</b> gives the forms of oaths and affirmations for the Union and the States.</p>
      <table><thead><tr><th>Forms of oath / affirmation for</th></tr></thead><tbody><tr><td>Ministers</td></tr><tr><td>Members of Parliament (MPs)</td></tr><tr><td>Members of State Legislatures (MLAs)</td></tr><tr><td>Judges</td></tr><tr><td>CAG</td></tr></tbody></table>
      <div class="cp-note tip">Take office, then <u>swear</u> the oath — Third Schedule = oath.</div>
    `
  },
  29: {
    questext: "The forms of oaths and affirmations for Ministers, MPs, MLAs, Judges and CAG are given in the",
    options: ["Third Schedule", "Second Schedule", "Fifth Schedule", "Eighth Schedule"],
    correct: "1",
    exptext: "✅ Third Schedule. 📌 Third = oath. ❌ The Second Schedule covers pay, not oaths."
  },
  30: {
    questext: "The Third Schedule prescribes forms of oath for all of the following EXCEPT",
    options: ["Union Ministers", "Members of Parliament", "Panchayat members", "Comptroller and Auditor General"],
    correct: "3",
    exptext: "✅ Panchayat members are not covered. 📌 Third Schedule = Union and State office-holders. ❌ The others take oaths under it."
  },
  31: {
    type: "concept", icon: "🏛️", accent: "#06b6d4", pauseTimer: true,
    title: "Schedule 4: Allocation of Seats in Rajya Sabha",
    html: `
      <p class="cp-lead">The <b>Fourth Schedule</b> allocates seats in the Rajya Sabha to the States and Union Territories.</p>
      <div class="cp-note exam">Do not mix First (names of States/UTs) with Fourth (seats of States/UTs in Rajya Sabha).</div>
    `
  },
  32: {
    questext: "The allocation of seats in the Rajya Sabha to States and Union Territories is given in the",
    options: ["Second Schedule", "Third Schedule", "Fifth Schedule", "Fourth Schedule"],
    correct: "4",
    exptext: "✅ Fourth Schedule. 📌 Fourth = Rajya Sabha seats. ❌ The First Schedule only lists States and UTs."
  },
  33: {
    questext: "Match the Schedule with its subject. A. First  B. Second  C. Third  D. Fourth — (1) Oaths  (2) Rajya Sabha seats  (3) States and UTs  (4) Emoluments",
    options: ["A-3, B-1, C-4, D-2", "A-3, B-4, C-1, D-2", "A-4, B-3, C-1, D-2", "A-3, B-4, C-2, D-1"],
    correct: "2",
    exptext: "✅ First–States/UTs, Second–Emoluments, Third–Oaths, Fourth–RS seats. 📌 Learn 1 to 4 in order. ❌ Others swap Second and Third."
  },
  34: {
    type: "concept", icon: "🌿", accent: "#a855f7", pauseTimer: true,
    title: "Schedule 5: Administration of Scheduled Areas & Tribes",
    html: `
      <p class="cp-lead">The <b>Fifth Schedule</b> governs Scheduled Areas and Scheduled Tribes in <u>ten States</u> (not the four North-East States).</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Tribal Advisory Council</td><td>Only advises the Governor of the State</td></tr><tr><td>Scheduled Areas</td><td>Declared by the President (Fifth Schedule, applied by Art. 244(1))</td></tr><tr><td>Number of States</td><td>10</td></tr><tr><td>States</td><td>Andhra Pradesh, Chhattisgarh, Gujarat, Himachal Pradesh, Jharkhand, Madhya Pradesh, Maharashtra, Odisha, Rajasthan, Telangana</td></tr></tbody></table>
      <div class="cp-note trap">The Tribal Advisory Council advises the <u>Governor</u>, not the President or the Chief Minister.</div>
      <div class="cp-note exam">Assam, Tripura, Meghalaya and Mizoram are under the Sixth — not the Fifth — Schedule.</div>
    `
  },
  35: {
    questext: "The Tribal Advisory Council advises the",
    options: ["President", "Prime Minister", "Chief Minister", "Governor"],
    correct: "4",
    exptext: "✅ Governor of the State. 📌 Fifth Schedule = Governor + Tribal Advisory Council. ❌ The President only declares Scheduled Areas."
  },
  36: {
    questext: "Administration and control of Scheduled Areas and Scheduled Tribes is dealt with in the",
    options: ["Fifth Schedule", "Fourth Schedule", "Seventh Schedule", "Ninth Schedule"],
    correct: "1",
    exptext: "✅ Fifth Schedule. 📌 Fifth = Scheduled Areas in ten States. ❌ The Fourth Schedule is about Rajya Sabha seats."
  },
  37: {
    questext: "Which of the following States is NOT among the ten States under the Fifth Schedule?",
    options: ["Telangana", "Assam", "Jharkhand", "Himachal Pradesh"],
    correct: "2",
    exptext: "✅ Assam is under the Sixth Schedule. 📌 Fifth = ten States, Sixth = four NE States. ❌ The others are Fifth Schedule States."
  },
  38: {
    questext: "How many States have Scheduled Areas under the Fifth Schedule?",
    options: ["4", "6", "8", "10"],
    correct: "4",
    exptext: "✅ Ten States. 📌 Remember 10 for Fifth, 4 for Sixth. ❌ Four is the number of Sixth Schedule States."
  },
  39: {
    type: "concept", icon: "🏔️", accent: "#e11d48", pauseTimer: true,
    title: "Schedule 6: Administration of Tribal Areas (NE States)",
    html: `
      <p class="cp-lead">The <b>Sixth Schedule</b> gives self-rule to tribal areas of <u>four North-East States</u> through councils.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>States</td><td>Assam, Tripura, Meghalaya, Mizoram</td></tr><tr><td>Bodies</td><td>Autonomous District Councils (ADCs)</td></tr><tr><td>Powers of ADCs</td><td>Legislative, judicial and executive</td></tr><tr><td>Subjects</td><td>Land, forest and village administration</td></tr></tbody></table>
      <div class="cp-note trap">Fifth Schedule = Governor-led Tribal Advisory Council; Sixth Schedule = powerful ADCs with legislative, judicial and executive powers.</div>
      <div class="cp-note exam">Fifth = 10 States; Sixth = 4 NE States.</div>
    `
  },
  40: {
    questext: "Administration of tribal areas in Assam, Tripura, Meghalaya and Mizoram is provided in the",
    options: ["Fifth Schedule", "Fourth Schedule", "Ninth Schedule", "Sixth Schedule"],
    correct: "4",
    exptext: "✅ Sixth Schedule. 📌 Sixth = NE tribal areas. ❌ The Fifth Schedule covers ten other States."
  },
  41: {
    questext: "Autonomous District Councils under the Sixth Schedule hold which powers?",
    options: ["Legislative, judicial and executive", "Only advisory", "Only judicial", "Only executive"],
    correct: "1",
    exptext: "✅ All three powers — they manage land, forest and village administration. 📌 ADCs are mini self-governments. ❌ Only advising is the Fifth Schedule council."
  },
  42: {
    questext: "Which of the following States is covered by the Sixth Schedule?",
    options: ["Odisha", "Rajasthan", "Mizoram", "Jharkhand"],
    correct: "3",
    exptext: "✅ Mizoram. 📌 Sixth = Assam, Tripura, Meghalaya, Mizoram. ❌ The others are Fifth Schedule States."
  },
  43: {
    type: "concept", icon: "🧭", accent: "#10b981", pauseTimer: true,
    title: "Schedule 7: Division of Powers — Three Lists",
    html: `
      <p class="cp-lead">The <b>Seventh Schedule</b> divides law-making power between the Union and the States through <u>three lists</u>.</p>
      <table><thead><tr><th>List</th><th>Initially</th><th>Presently</th><th>Examples</th></tr></thead><tbody><tr><td>Union List</td><td>97</td><td>100</td><td>Defence, atomic energy, citizenship, banking, foreign affairs</td></tr><tr><td>State List</td><td>66</td><td>61</td><td>Public order, local government, health, agriculture, fisheries</td></tr><tr><td>Concurrent List</td><td>47</td><td>52</td><td>Marriage and divorce, criminal law, electricity, education</td></tr></tbody></table>
      <div class="cp-note trap">Union rises 97 → 100 and Concurrent rises 47 → 52, but the State List <u>falls</u> 66 → 61.</div>
      <div class="cp-note exam">Numbers to remember — Union 100, State 61, Concurrent 52.</div>
    `
  },
  44: {
    questext: "How many subjects are presently in the Union List?",
    options: ["97", "99", "66", "100"],
    correct: "4",
    exptext: "✅ 100 subjects. 📌 Initially 97, now 100. ❌ 97 was the original number."
  },
  45: {
    questext: "The State List presently contains how many subjects?",
    options: ["66", "52", "61", "47"],
    correct: "3",
    exptext: "✅ 61 subjects. 📌 State List shrank from 66. ❌ 66 was the original figure."
  },
  46: {
    questext: "Which of the following is a subject of the Union List?",
    options: ["Atomic energy", "Public order", "Health", "Fisheries"],
    correct: "1",
    exptext: "✅ Atomic energy. 📌 Defence, atomic energy, citizenship are Union. ❌ The rest are State List subjects."
  },
  47: {
    questext: "Which of the following is a subject of the State List?",
    options: ["Citizenship", "Banking", "Defence", "Local government"],
    correct: "4",
    exptext: "✅ Local government. 📌 State = local matters. ❌ The others are Union List subjects."
  },
  48: {
    type: "concept", icon: "🚨", accent: "#eab308", pauseTimer: true,
    title: "Five Cases Where Parliament Can Legislate on the State List",
    html: `
      <p class="cp-lead">Normally only States make laws on the State List, but in <b>five cases</b> Parliament can step in.</p>
      <table><thead><tr><th>Case</th><th>Article</th><th>Effect</th></tr></thead><tbody><tr><td>National Emergency</td><td>Art. 250</td><td>Law valid up to 6 months after the emergency ends</td></tr><tr><td>President’s Rule</td><td>Art. 356</td><td>Law continues until repealed or altered by the State Legislature</td></tr><tr><td>Two or more States request</td><td>Art. 252</td><td>Permanent until Parliament repeals it; States cannot amend it</td></tr><tr><td>International treaty</td><td>Art. 253</td><td>Parliament can make law to enforce it</td></tr><tr><td>Rajya Sabha resolution (two-thirds present and voting)</td><td>Art. 249</td><td>Resolution valid 1 year, renewable; law lapses 6 months after expiry</td></tr></tbody></table>
      <div class="cp-note trap">Only the <u>Rajya Sabha</u> (not the Lok Sabha) can authorise Parliament under Art. 249.</div>
      <div class="cp-mnemonic"><b>249</b> Rajya Sabha, <b>250</b> Emergency, <b>252</b> States request, <b>253</b> Treaty</div>
    `
  },
  49: {
    questext: "Which Article lets Parliament legislate on a State List subject during a National Emergency?",
    options: ["Article 249", "Article 252", "Article 250", "Article 253"],
    correct: "3",
    exptext: "✅ Article 250. 📌 250 = Emergency. ❌ Article 249 needs a Rajya Sabha resolution."
  },
  50: {
    questext: "Parliament can legislate on a State List subject if the Rajya Sabha passes a special resolution under",
    options: ["Article 250", "Article 249", "Article 252", "Article 253"],
    correct: "2",
    exptext: "✅ Article 249. 📌 249 = Rajya Sabha. ❌ Article 250 is for National Emergency."
  },
  51: {
    questext: "Which of the following is NOT a case where Parliament can legislate on the State List?",
    options: ["Two or more States request", "To enforce an international treaty", "National Emergency", "Resolution passed by the Lok Sabha in national interest"],
    correct: "4",
    exptext: "✅ Only a Rajya Sabha resolution counts. 📌 Art. 249 = Rajya Sabha. ❌ The other three are valid cases."
  },
  52: {
    questext: "A law made by Parliament under Article 252 at the request of two or more States can be amended",
    options: ["Only by Parliament", "By each State on its own", "Only within 6 months", "Only within 1 year"],
    correct: "1",
    exptext: "✅ Only Parliament can amend or repeal it. 📌 Art. 252 = permanent. ❌ States cannot amend such a law themselves."
  },
  53: {
    type: "concept", icon: "🤝", accent: "#0ea5e9", pauseTimer: true,
    title: "Concurrent List",
    html: `
      <p class="cp-lead">On the <b>Concurrent List</b> both the Centre and the States can make laws — initially 47 subjects, presently <u>52</u>.</p>
      <table><thead><tr><th>Point</th><th>Rule</th></tr></thead><tbody><tr><td>If both laws clash</td><td>Centre’s law prevails</td></tr><tr><td>Exception</td><td>State law prevails only if reserved for the President and given his assent</td></tr><tr><td>Later</td><td>Parliament can nullify such a State law</td></tr><tr><td>Examples</td><td>Marriage and divorce, criminal law, criminal procedure, insolvency and bankruptcy, trade and labour disputes, electricity, education, weights and measures</td></tr></tbody></table>
      <div class="cp-note trap">A State law wins over the Centre’s law only with the <u>President’s assent</u> — and Parliament can still override it later.</div>
    `
  },
  54: {
    questext: "If a Union law and a State law clash on a Concurrent List subject, which one prevails?",
    options: ["Union law", "State law", "The one passed earlier", "The one decided by the Governor"],
    correct: "1",
    exptext: "✅ Union law prevails. 📌 Concurrent = Centre wins. ❌ State law wins only with President’s assent."
  },
  55: {
    questext: "How many subjects are presently in the Concurrent List?",
    options: ["47", "52", "61", "100"],
    correct: "2",
    exptext: "✅ 52 subjects. 📌 Initially 47, now 52. ❌ 47 was the original number."
  },
  56: {
    questext: "A State law on a Concurrent List subject can prevail over a Union law only if it is",
    options: ["Signed by the Governor", "Passed by two-thirds majority", "Approved by the Rajya Sabha", "Reserved for the President and given his assent"],
    correct: "4",
    exptext: "✅ Reserved for the President and assented to. 📌 President’s assent is the key. ❌ Governor’s signature alone is not enough."
  },
  57: {
    questext: "Which of the following is a subject of the Concurrent List?",
    options: ["Defence", "Public order", "Electricity", "Foreign affairs"],
    correct: "3",
    exptext: "✅ Electricity. 📌 Marriage, criminal law, education, electricity are Concurrent. ❌ Defence and foreign affairs are Union; public order is State."
  },
  58: {
    type: "concept", icon: "🔍", accent: "#d946ef", pauseTimer: true,
    title: "Residuary List & Subjects Moved by the 42nd Amendment",
    html: `
      <p class="cp-lead">Subjects that are in <u>none</u> of the three lists are called <b>residuary</b> — and only <b>Parliament</b> can make laws on them.</p>
      <table><thead><tr><th>42nd Amendment (1976): State List → Concurrent List</th></tr></thead><tbody><tr><td>Education</td></tr><tr><td>Forests</td></tr><tr><td>Weights and Measures</td></tr><tr><td>Protection of wild animals and birds</td></tr><tr><td>Administration of justice</td></tr></tbody></table>
      <div class="cp-note trap">Residuary power in India lies with the <u>Union</u> (Parliament), unlike the USA where it lies with the States.</div>
    `
  },
  59: {
    questext: "The power to legislate on residuary subjects, which are not in any of the three lists, belongs to",
    options: ["State Legislatures", "The President", "Parliament", "The Supreme Court"],
    correct: "3",
    exptext: "✅ Parliament. 📌 Residuary = Union. ❌ States have no residuary power in India."
  },
  60: {
    questext: "Which of the following was NOT transferred from the State List to the Concurrent List by the 42nd Amendment?",
    options: ["Education", "Forests", "Administration of justice", "Public order"],
    correct: "4",
    exptext: "✅ Public order stayed in the State List. 📌 Five subjects moved. ❌ The other three were transferred."
  },
  61: {
    type: "concept", icon: "🗣️", accent: "#64748b", pauseTimer: true,
    title: "Schedule 8: Official Languages",
    html: `
      <p class="cp-lead">The <b>Eighth Schedule</b> lists the languages recognised by the Constitution — <u>14 originally, 22 presently</u>.</p>
      <table><thead><tr><th>Amendment</th><th>Year</th><th>Languages added</th></tr></thead><tbody><tr><td>21st</td><td>1967</td><td>Sindhi</td></tr><tr><td>71st</td><td>1992</td><td>Konkani, Manipuri, Nepali</td></tr><tr><td>92nd</td><td>2003</td><td>Bodo, Dogri, Maithili, Santhali</td></tr><tr><td>96th</td><td>2011</td><td>‘Oriya’ renamed ‘Odia’</td></tr></tbody></table>
      <div class="cp-note trap">The 96th Amendment <u>added no language</u> — it only changed the spelling of Oriya to Odia.</div>
      <div class="cp-note exam">Count: 14 + 1 (Sindhi) + 3 + 4 = 22.</div>
    `
  },
  62: {
    questext: "How many languages are presently included in the Eighth Schedule?",
    options: ["14", "18", "22", "24"],
    correct: "3",
    exptext: "✅ 22 languages. 📌 14 originally, now 22. ❌ 14 was the original count."
  },
  63: {
    questext: "Which language was added to the Eighth Schedule by the 21st Amendment (1967)?",
    options: ["Sindhi", "Konkani", "Bodo", "Nepali"],
    correct: "1",
    exptext: "✅ Sindhi. 📌 21st = Sindhi. ❌ Konkani and Nepali came with the 71st Amendment."
  },
  64: {
    questext: "Which languages were added to the Eighth Schedule by the 92nd Amendment (2003)?",
    options: ["Konkani, Manipuri, Nepali", "Bodo, Dogri, Maithili, Santhali", "Sindhi, Konkani", "Odia, Nepali"],
    correct: "2",
    exptext: "✅ Bodo, Dogri, Maithili, Santhali. 📌 92nd = four languages. ❌ Konkani, Manipuri, Nepali came in 1992."
  },
  65: {
    questext: "The 96th Amendment (2011) changed the name of which language in the Eighth Schedule?",
    options: ["Oriya to Odia", "Assamese to Asomiya", "Bangla to Bengali", "Kashmiri to Koshur"],
    correct: "1",
    exptext: "✅ Oriya was renamed Odia. 📌 96th = spelling change. ❌ No other language was renamed."
  },
  66: {
    type: "concept", icon: "🏺", accent: "#fb7185", pauseTimer: true,
    title: "Classical Languages of India",
    html: `
      <p class="cp-lead">Eleven languages now hold <b>Classical</b> status — six originally and five added in <u>2024</u>.</p>
      <table><thead><tr><th>Group</th><th>Languages</th></tr></thead><tbody><tr><td>Original six</td><td>Tamil, Sanskrit, Telugu, Kannada, Malayalam, Odia</td></tr><tr><td>Added in 2024 (+5)</td><td>Marathi, Pali, Prakrit, Assamese, Bengali</td></tr></tbody></table>
      <div class="cp-note exam">6 + 5 = <b>11</b> Classical languages; Tamil was the first to get the status.</div>
    `
  },
  67: {
    questext: "Which of the following was granted Classical language status in 2024?",
    options: ["Gujarati", "Marathi", "Punjabi", "Hindi"],
    correct: "2",
    exptext: "✅ Marathi. 📌 2024 added Marathi, Pali, Prakrit, Assamese, Bengali. ❌ The other three are not Classical languages."
  },
  68: {
    questext: "Which of the following was NOT among the original six Classical Languages?",
    options: ["Sanskrit", "Odia", "Bengali", "Telugu"],
    correct: "3",
    exptext: "✅ Bengali was added in 2024. 📌 Original six: Tamil, Sanskrit, Telugu, Kannada, Malayalam, Odia. ❌ The others were original."
  },
  69: {
    questext: "How many languages are now recognised as Classical Languages of India?",
    options: ["6", "9", "11", "13"],
    correct: "3",
    exptext: "✅ Eleven. 📌 Six original plus five added in 2024. ❌ Six was the count before 2024."
  },
  70: {
    type: "concept", icon: "🌾", accent: "#2dd4bf", pauseTimer: true,
    title: "Schedule 9: Land Reforms & Zamindari Abolition",
    html: `
      <p class="cp-lead">The <b>Ninth Schedule</b> protects <u>land reform laws</u> and was added by the <b>1st Amendment, 1951</b>.</p>
      <div class="cp-note exam">Ninth = land reforms = 1st Amendment (1951).</div>
    `
  },
  71: {
    questext: "Laws on land reforms and abolition of the Zamindari system are placed in the",
    options: ["Eighth Schedule", "Ninth Schedule", "Tenth Schedule", "Eleventh Schedule"],
    correct: "2",
    exptext: "✅ Ninth Schedule. 📌 Ninth = land reforms. ❌ The Tenth Schedule is about anti-defection."
  },
  72: {
    questext: "The Ninth Schedule was added to the Constitution by the",
    options: ["1st Amendment, 1951", "24th Amendment", "42nd Amendment", "52nd Amendment"],
    correct: "1",
    exptext: "✅ 1st Amendment (1951). 📌 First amendment, ninth schedule. ❌ The 52nd Amendment added the Tenth Schedule."
  },
  73: {
    type: "concept", icon: "🔀", accent: "#c026d3", pauseTimer: true,
    title: "Schedule 10: Anti-Defection",
    html: `
      <p class="cp-lead">The <b>Tenth Schedule</b> lays down <u>disqualification of MPs and MLAs on defection</u>; added by the <b>52nd Amendment, 1985</b>.</p>
      <div class="cp-note exam">Tenth = anti-defection = 52nd Amendment (1985).</div>
    `
  },
  74: {
    questext: "The Tenth Schedule was added by the",
    options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "61st Amendment"],
    correct: "3",
    exptext: "✅ 52nd Amendment (1985). 📌 52nd = anti-defection. ❌ The 42nd Amendment changed the Preamble."
  },
  75: {
    questext: "Disqualification of MPs and MLAs on the ground of defection is provided in the",
    options: ["Seventh Schedule", "Eighth Schedule", "Ninth Schedule", "Tenth Schedule"],
    correct: "4",
    exptext: "✅ Tenth Schedule. 📌 Tenth = defection. ❌ The Ninth Schedule protects land reform laws."
  },
  76: {
    type: "concept", icon: "🏘️", accent: "#0d9488", pauseTimer: true,
    title: "Schedule 11: Panchayats",
    html: `
      <p class="cp-lead">The <b>Eleventh Schedule</b> lists the powers of <u>Panchayats</u> — <b>29</b> functional matters; added by the <b>73rd Amendment, 1992</b>.</p>
      <div class="cp-note exam">Eleventh = Panchayats = 29 matters = 73rd Amendment.</div>
    `
  },
  77: {
    questext: "How many functional matters of Panchayats are listed in the Eleventh Schedule?",
    options: ["29", "18", "27", "12"],
    correct: "1",
    exptext: "✅ 29 matters. 📌 Panchayats = 29. ❌ 18 is the number for Municipalities."
  },
  78: {
    questext: "The Eleventh Schedule was added by the",
    options: ["74th Amendment", "42nd Amendment", "73rd Amendment", "52nd Amendment"],
    correct: "3",
    exptext: "✅ 73rd Amendment (1992). 📌 73 = Panchayats. ❌ The 74th Amendment is for Municipalities."
  },
  79: {
    type: "concept", icon: "🏙️", accent: "#7c3aed", pauseTimer: true,
    title: "Schedule 12: Municipalities",
    html: `
      <p class="cp-lead">The <b>Twelfth Schedule</b> lists the powers of <u>Municipalities</u> — <b>18</b> functional matters; added by the <b>74th Amendment, 1992</b>.</p>
      <div class="cp-note exam">Twelfth = Municipalities = 18 matters = 74th Amendment.</div>
    `
  },
  80: {
    questext: "How many functional matters of Municipalities are listed in the Twelfth Schedule?",
    options: ["29", "22", "14", "18"],
    correct: "4",
    exptext: "✅ 18 matters. 📌 Municipalities = 18. ❌ 29 matters belong to Panchayats."
  },
  81: {
    questext: "Which of the following pairs is correctly matched?",
    options: ["Ninth Schedule – 52nd Amendment", "Tenth Schedule – 1st Amendment", "Eleventh Schedule – 74th Amendment", "Twelfth Schedule – 74th Amendment"],
    correct: "4",
    exptext: "✅ Twelfth Schedule came with the 74th Amendment. 📌 Eleventh = 73rd. ❌ Ninth is 1st and Tenth is 52nd."
  },
  82: {
    type: "concept", icon: "🏷️", accent: "#b45309", pauseTimer: true,
    title: "Parts of the Constitution — Part I to VIII",
    html: `
      <p class="cp-lead">The Constitution is divided into <b>Parts</b>, each dealing with one subject; learn the <u>Part → subject → Articles</u> link.</p>
      <table><thead><tr><th>Part</th><th>Subject Matter</th><th>Articles</th></tr></thead><tbody><tr><td>I</td><td>The Union and its Territory</td><td>1 – 4</td></tr><tr><td>II</td><td>Citizenship</td><td>5 – 11</td></tr><tr><td>III</td><td>Fundamental Rights</td><td>12 – 35</td></tr><tr><td>IV</td><td>Directive Principles of State Policy</td><td>36 – 51</td></tr><tr><td>IV-A</td><td>Fundamental Duties</td><td>51-A</td></tr><tr><td>V</td><td>The Union Government</td><td>52 – 151</td></tr><tr><td>VI</td><td>The State Governments</td><td>152 – 237</td></tr><tr><td>VII</td><td>Part-B States (deleted, 7th Amendment 1956)</td><td>238 (deleted)</td></tr><tr><td>VIII</td><td>The Union Territories</td><td>239 – 242</td></tr></tbody></table>
      <div class="cp-note trap">Part III = Fundamental <u>Rights</u>, Part IV = <u>Directive</u> Principles, Part IV-A = Fundamental <u>Duties</u>.</div>
      <div class="cp-note exam">Part VII was deleted by the 7th Amendment (1956); Part IV-A was added by the 42nd Amendment (1976).</div>
    `
  },
  83: {
    questext: "Fundamental Rights are contained in which Part of the Constitution?",
    options: ["Part II", "Part IV", "Part III", "Part IV-A"],
    correct: "3",
    exptext: "✅ Part III (Articles 12–35). 📌 Rights = III. ❌ Part IV holds the Directive Principles."
  },
  84: {
    questext: "Fundamental Duties are placed in Part IV-A, which was added by the",
    options: ["42nd Amendment", "44th Amendment", "86th Amendment", "73rd Amendment"],
    correct: "1",
    exptext: "✅ 42nd Amendment (1976). 📌 Part IV-A, Article 51-A. ❌ The 44th Amendment did not add this Part."
  },
  85: {
    questext: "Which Part of the Constitution was deleted by the 7th Amendment (1956)?",
    options: ["Part VI", "Part VII", "Part VIII", "Part IX"],
    correct: "2",
    exptext: "✅ Part VII (Part-B States). 📌 Deleted after States reorganisation. ❌ Part VIII on Union Territories still exists."
  },
  86: {
    type: "concept", icon: "🏷️", accent: "#0369a1", pauseTimer: true,
    title: "Parts of the Constitution — Part IX to XIV-A",
    html: `
      <p class="cp-lead">These Parts cover local government, Union–State relations, finance, trade, services and tribunals.</p>
      <table><thead><tr><th>Part</th><th>Subject Matter</th><th>Articles</th></tr></thead><tbody><tr><td>IX</td><td>The Panchayats</td><td>243 – 243-O</td></tr><tr><td>IX-A</td><td>The Municipalities</td><td>243-P – 243-ZG</td></tr><tr><td>IX-B</td><td>The Co-operative Societies</td><td>243-ZH – 243-ZT</td></tr><tr><td>X</td><td>The Scheduled and Tribal Areas</td><td>244 – 244-A</td></tr><tr><td>XI</td><td>Union–State Relations</td><td>245 – 263</td></tr><tr><td>XII</td><td>Finance, Property, Contracts &amp; Suits</td><td>264 – 300-A</td></tr><tr><td>XIII</td><td>Trade, Commerce &amp; Intercourse</td><td>301 – 307</td></tr><tr><td>XIV</td><td>Services under Union &amp; States</td><td>308 – 323</td></tr><tr><td>XIV-A</td><td>Tribunals</td><td>323-A – 323-B</td></tr></tbody></table>
      <div class="cp-note trap">IX = Panchayats, IX-A = Municipalities, IX-B = Co-operative Societies — do not shuffle the letters.</div>
      <div class="cp-note exam">Added later — IX-A by 74th (1992), IX-B by 97th (2011), XIV-A by 42nd (1976).</div>
    `
  },
  87: {
    questext: "Municipalities are dealt with in which Part of the Constitution?",
    options: ["Part IX", "Part IX-A", "Part IX-B", "Part X"],
    correct: "2",
    exptext: "✅ Part IX-A (added by the 74th Amendment, 1992). 📌 IX Panchayats, IX-A Municipalities. ❌ Part IX is for Panchayats."
  },
  88: {
    questext: "The Part on Co-operative Societies, added by the 97th Amendment (2011), is",
    options: ["Part IX", "Part IX-A", "Part XIV-A", "Part IX-B"],
    correct: "4",
    exptext: "✅ Part IX-B. 📌 97th Amendment = Co-operative Societies. ❌ Part IX-A was added by the 74th Amendment."
  },
  89: {
    questext: "Which of the following pairs is correctly matched?",
    options: ["Part XI – Union–State Relations", "Part X – Tribunals", "Part XII – Elections", "Part XIII – Services under Union and States"],
    correct: "1",
    exptext: "✅ Part XI deals with Union–State relations. 📌 Tribunals are Part XIV-A. ❌ Elections are Part XV."
  },
  90: {
    type: "concept", icon: "🏷️", accent: "#be185d", pauseTimer: true,
    title: "Parts of the Constitution — Part XV to XXII",
    html: `
      <p class="cp-lead">The last Parts cover elections, languages, emergencies, amendment and transitional provisions.</p>
      <table><thead><tr><th>Part</th><th>Subject Matter</th><th>Articles</th></tr></thead><tbody><tr><td>XV</td><td>Elections</td><td>324 – 329-A</td></tr><tr><td>XVI</td><td>Special Provisions for Certain Classes</td><td>330 – 342-A</td></tr><tr><td>XVII</td><td>Official Language</td><td>343 – 351-A</td></tr><tr><td>XVIII</td><td>Emergency Provisions</td><td>352 – 360</td></tr><tr><td>XIX</td><td>Miscellaneous</td><td>361 – 367</td></tr><tr><td>XX</td><td>Amendment of the Constitution</td><td>368</td></tr><tr><td>XXI</td><td>Temporary, Transitional &amp; Special Provisions</td><td>369 – 392</td></tr><tr><td>XXII</td><td>Short Title, Commencement, Hindi Text &amp; Repeals</td><td>393 – 395</td></tr></tbody></table>
      <div class="cp-note trap">Part XX has only <u>one</u> Article — Article 368 on amendment.</div>
      <div class="cp-note exam">Emergency = Part XVIII (352–360); Elections = Part XV; Official Language = Part XVII.</div>
    `
  },
  91: {
    questext: "Emergency Provisions (Articles 352–360) are contained in",
    options: ["Part XVII", "Part XVIII", "Part XIX", "Part XX"],
    correct: "2",
    exptext: "✅ Part XVIII. 📌 Emergency = XVIII. ❌ Part XVII is about Official Language."
  },
  92: {
    questext: "Which Part consists of the single Article 368 on amendment of the Constitution?",
    options: ["Part XX", "Part XIX", "Part XXI", "Part XXII"],
    correct: "1",
    exptext: "✅ Part XX. 📌 Amendment = Article 368. ❌ Part XXI has transitional provisions."
  },
  93: {
    questext: "Articles 324 to 329-A, dealing with elections, fall in",
    options: ["Part XIV", "Part XVI", "Part XV", "Part XVII"],
    correct: "3",
    exptext: "✅ Part XV. 📌 Elections = Part XV. ❌ Part XVI is about special provisions for certain classes."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Preamble_and_Schedules/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a leather-bound book resembling a constitution, a brass scales of justice and a wooden gavel" }
});

/* CHANGE LOG
   - Preamble objectives written as Liberty (not Freedom); dignity of the individual and unity and integrity of the Nation are the aims of Fraternity.
   - Second Schedule: Vice-President removed from the list; Speakers/Chairmen of State Legislatures and Judges added as per the Schedule.
   - Fifth Schedule: Scheduled Areas are declared by the President under the Fifth Schedule, which Art. 244(1) applies.
   - Art. 356 row: laws made by Parliament continue until repealed or altered by the State Legislature (the Lok Sabha simple-majority resolution is not required).
   - Art. 249: resolution needs two-thirds of Rajya Sabha members present and voting.
   - Concurrent List: CrPC written as criminal procedure (CrPC replaced by BNSS, 2023).
   - Union List examples: labour and mines removed (labour disputes are Concurrent).
*/