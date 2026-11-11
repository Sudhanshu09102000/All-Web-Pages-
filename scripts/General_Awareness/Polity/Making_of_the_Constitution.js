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
    ".cpm-path{display:block;max-width:100%;padding:8px 11px;border-radius:11px;background:rgba(2,6,23,.6);border:1px dashed rgba(148,163,184,.5);color:#d6deef!important;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace!important;font-size:11px;font-weight:500;line-height:1.5;overflow-wrap:break-word;word-break:normal;text-align:center;user-select:text;-webkit-user-select:text}",
    ".cpm-path b{color:#f6dc95!important;font-weight:700}",
    ".cpm-file{display:inline-block;max-width:100%;white-space:nowrap}",
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

  /* Shows a path so it only wraps AFTER a "/" and the file name (e.g. thumbnail.png) never splits in the middle. */
  function fillPath(el, text) {
    var segs = String(text).split("/"), i, last;
    for (i = 0; i < segs.length; i++) {
      last = i === segs.length - 1;
      if (last) {
        var f = document.createElement("span");
        f.className = "cpm-file";
        f.textContent = segs[i];
        el.appendChild(f);
      } else {
        el.appendChild(document.createTextNode(segs[i] + "/"));
        el.appendChild(document.createElement("wbr"));
      }
    }
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
    fillPath(box.querySelector(".cpm-full"), src);
    fillPath(box.querySelector(".cpm-short"), short);
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

/* Field: General_Awareness · Subject: Polity · Chapter: Making_of_the_Constitution · 22 concept pages (+ overview) · 56 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📜", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Making of the Constitution",
    thumb: {
      image: "images/General_Awareness/Polity/Making_of_the_Constitution/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "MAKING OF THE",
      line2: "CONSTITUTION",
      line3: "CONSTITUENT ASSEMBLY",
      badge: "FULL CLASS",
      ribbon: "TIMELINE • COMMITTEES • FACTS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Making of the Constitution | Constituent Assembly Full Class | Polity for all exams",
      altTitles: ["Constituent Assembly of India in One Class — Committees & Chairmen", "Drafting Committee, Objectives Resolution & Cabinet Mission Explained"],
      description: "Making of the Constitution is one of the most scoring Polity chapters. In this full class you learn the demand for a Constituent Assembly, the Cabinet Mission Plan, composition, elections, Objectives Resolution, all committees with chairmen, the Drafting Committee, adoption on 26 November 1949 and enforcement on 26 January 1950.\n\n📌 IN THIS CLASS\n✅ Timeline of the demand\n✅ 389 members and 15 women\n✅ Committees and chairmen\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #ConstituentAssembly #SSCCGL #UPSC",
      tags: ["making of the constitution", "constituent assembly", "constituent assembly of india", "polity for all exams", "indian polity", "cabinet mission plan 1946", "objectives resolution", "drafting committee", "drafting committee members", "constituent assembly chairmen", "dr br ambedkar", "interim government 1946", "women in constituent assembly", "26 january 1950", "polity tricks", "polity mcq", "polity previous year questions", "ssc cgl polity", "upsc polity", "static gk polity", "constitution of india", "SSC CGL", "ing of the Constitution Po"],
      hashtags: ["Polity", "ConstituentAssembly", "SSCCGL", "UPSC"],
      thumbText: "CONSTITUENT ASSEMBLY — FULL CLASS",
      pinnedComment: "📌 Solve all questions and write your score below 👇",
      communityPost: "📜 New class is live: Making of the Constitution — committees, dates and chairmen in one go. Try the questions and share your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Polity — Full Classes for all exams"
    },
    html: `
      <p class="cp-lead">How India's Constitution was born: the <u>demand, the Constituent Assembly, its committees and the final adoption</u> — a high-yield Polity chapter for every exam.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>22</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>56</b><span>Questions</span></div>
        <div class="cp-stat"><b>~100 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Demand for a Constituent Assembly</b><br>Roy 1934 → INC 1935 → August Offer 1940.</li>
        <li><b>Cabinet Mission, Composition &amp; Elections</b><br>389 members, 296 + 93, INC 208 seats.</li>
        <li><b>Women &amp; Interim Government</b><br>15 women members; Nehru as Vice-President.</li>
        <li><b>Objectives Resolution &amp; Independence Act</b><br>13 Dec 1946 resolution; strength falls to 299.</li>
        <li><b>Functions &amp; Quick Facts</b><br>Flag, anthem, President, sessions, expenditure.</li>
        <li><b>Committees</b><br>Who chaired what — Nehru, Patel, Prasad, Ambedkar.</li>
        <li><b>Drafting Committee</b><br>29 Aug 1947, seven members, 141 days.</li>
        <li><b>Enactment, Adoption &amp; Enforcement</b><br>Three readings, 26 Nov 1949, 26 Jan 1950.</li>
        <li><b>Experts Committee, Criticism &amp; Key Facts</b><br>Austin, Simon, Churchill; calligraphers and artists.</li>
        <li><b>First Cabinet of Free India</b><br>Portfolios of 1947.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> committee chairmen, dates and numbers from this chapter are asked in almost every SSC, UPSC, Banking and Railways Polity paper.</div>
    `
  },
  2: {
    type: "concept", icon: "📜", accent: "#22c55e", pauseTimer: true,
    title: "Demand for a Constituent Assembly",
    html: `
      <p class="cp-lead">The idea that Indians must write their own Constitution grew step by step between <b>1934 and 1946</b>.</p>
      <table><thead><tr><th>Year</th><th>Who</th><th>What happened</th></tr></thead><tbody><tr><td>1934</td><td>M. N. Roy</td><td>First to put forward the idea</td></tr><tr><td>1935</td><td>INC</td><td>First official demand</td></tr><tr><td>1938</td><td>Nehru</td><td>Assembly elected on adult franchise, no outside interference</td></tr><tr><td>1940</td><td>British</td><td>Accepted in principle in the August Offer</td></tr><tr><td>1942</td><td>Cripps Mission</td><td>Draft proposal; Muslim League wanted two assemblies</td></tr><tr><td>1946</td><td>Cabinet Mission</td><td>Sent after Cripps failed</td></tr></tbody></table>
      <div class="cp-note trap">Roy gave the <i>idea</i> (1934); the Congress made the <i>official demand</i> (1935). Do not mix them.</div>
      <div class="cp-note exam">Remember the chain: Roy 1934 → INC 1935 → Nehru 1938 → August Offer 1940.</div>
      <div class="cp-mnemonic">“<b>R</b>oy Ideas, <b>C</b>ongress Demands, <b>B</b>ritain Accepts”</div>
    `
  },
  3: {
    questext: "Who was the first to put forward the idea of a Constituent Assembly for India?",
    options: ["M. N. Roy", "Jawaharlal Nehru", "Mahatma Gandhi", "Motilal Nehru"],
    correct: "1",
    exptext: "✅ M. N. Roy, in 1934. 📌 Roy = idea, INC = demand. ❌ Nehru spoke of adult franchise in 1938."
  },
  4: {
    questext: "The British Government accepted the demand for a Constituent Assembly in principle through which proposal?",
    options: ["Cripps Mission, 1942", "August Offer, 1940", "Cabinet Mission, 1946", "Wavell Plan, 1945"],
    correct: "2",
    exptext: "✅ August Offer, 1940. 📌 Accepted in principle, not yet formed. ❌ Cabinet Mission actually created the Assembly."
  },
  5: {
    questext: "Which one of the following statements is NOT correct?",
    options: ["The INC officially demanded a Constituent Assembly in 1935", "Nehru said in 1938 it must be elected on adult franchise", "The Muslim League accepted the Cripps proposals of 1942", "M. N. Roy first proposed the idea in 1934"],
    correct: "3",
    exptext: "✅ The League did not accept; it demanded two separate Constituent Assemblies. 📌 Cripps 1942 = League objection."
  },
  6: {
    questext: "Arrange in chronological order: A. August Offer B. Congress's official demand C. Cripps Mission D. M. N. Roy's proposal",
    options: ["B, D, A, C", "D, A, B, C", "D, B, C, A", "D, B, A, C"],
    correct: "4",
    exptext: "✅ Roy 1934, INC 1935, August Offer 1940, Cripps 1942. 📌 Idea → demand → acceptance → proposal."
  },
  7: {
    type: "concept", icon: "🇬🇧", accent: "#f59e0b", pauseTimer: true,
    title: "The Cabinet Mission Plan, 1946",
    html: `
      <p class="cp-lead">After Cripps failed, Britain sent a <b>three-member Cabinet Mission</b> in 1946. Its plan finally created the Constituent Assembly.</p>
      <div class="cp-grid c3"><div class="cp-card blue"><b>Lord Pethick Lawrence</b></div><div class="cp-card green"><b>Sir Stafford Cripps</b></div><div class="cp-card amber"><b>A. V. Alexander</b></div></div>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Year</td><td>1946</td></tr><tr><td>Outcome</td><td>Framework for forming the Constituent Assembly</td></tr><tr><td>Assembly constituted</td><td>November 1946</td></tr></tbody></table>
      <div class="cp-note trap">Only <i>one</i> proposal of the Mission was accepted — the one that formed the Assembly.</div>
      <div class="cp-note exam">Cripps came twice: alone in 1942 and as a Cabinet Mission member in 1946.</div>
    `
  },
  8: {
    questext: "Who among the following was NOT a member of the 1946 Cabinet Mission?",
    options: ["Lord Wavell", "Sir Stafford Cripps", "A. V. Alexander", "Lord Pethick Lawrence"],
    correct: "1",
    exptext: "✅ Wavell was the Viceroy, not a Mission member. 📌 Three members: Pethick Lawrence, Cripps, Alexander."
  },
  9: {
    questext: "The Constituent Assembly was constituted in November 1946 under which plan?",
    options: ["Cripps Proposals", "Cabinet Mission Plan", "Mountbatten Plan", "August Offer"],
    correct: "2",
    exptext: "✅ Cabinet Mission Plan, 1946. 📌 Mission 1946, Assembly 1946. ❌ Mountbatten Plan (1947) only brought states in."
  },
  10: {
    type: "concept", icon: "🏛️", accent: "#ef4444", pauseTimer: true,
    title: "Composition of the Assembly",
    html: `
      <p class="cp-lead">The Assembly had <b>389 members</b>, allotted at roughly <u>one seat per 10 lakh people</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Making_of_the_Constitution/1.png" alt="Split bar: 389 into 296 and 93" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Group</th><th>Seats</th></tr></thead><tbody><tr><td>British India</td><td>296</td></tr><tr><td>Princely States</td><td>93</td></tr><tr><td>Total</td><td>389</td></tr></tbody></table>
      <div class="cp-note tip">Of the 296 British India seats, 292 came from 11 Governors' provinces and 4 from Chief Commissioners' provinces (one each).</div>
      <div class="cp-note exam">The Assembly was partly elected, partly nominated, and members were indirectly elected on a limited franchise.</div>
    `
  },
  11: {
    questext: "What was the original total strength of the Constituent Assembly?",
    options: ["299", "296", "389", "229"],
    correct: "3",
    exptext: "✅ 389 = 296 British India + 93 Princely States. ❌ 299 was the strength after the Muslim League withdrew."
  },
  12: {
    questext: "How many of the 296 British India seats were allotted to Chief Commissioners' provinces?",
    options: ["One", "Four", "Eleven", "Two"],
    correct: "2",
    exptext: "✅ Four, one each; the other 292 came from 11 Governors' provinces. ❌ Eleven is the number of Governors' provinces."
  },
  13: {
    questext: "Seats in the Constituent Assembly were allotted to provinces and states roughly in the ratio of:",
    options: ["One per 10 lakh population", "One per 1 lakh population", "One per 5 lakh population", "One per 50 lakh population"],
    correct: "1",
    exptext: "✅ About one seat per million (10 lakh) population. 📌 Million = 10 lakh."
  },
  14: {
    type: "concept", icon: "⚖️", accent: "#8b5cf6", pauseTimer: true,
    title: "Features of the Scheme",
    html: `
      <p class="cp-lead">Seats were divided among three communities, and each community elected its own members.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Communities</td><td>Muslims, Sikhs and General (all except Muslims and Sikhs)</td></tr><tr><td>Division basis</td><td>In proportion to population</td></tr><tr><td>Election method</td><td>Proportional representation by single transferable vote (STV)</td></tr><tr><td>Electors</td><td>Members of that community in the Provincial Legislative Assembly</td></tr><tr><td>Princely States</td><td>Nominated by the heads of the states</td></tr></tbody></table>
      <div class="cp-note trap">Not directly elected on adult franchise — members were <b>indirectly</b> elected.</div>
      <div class="cp-note tip">STV is also the method used today for Rajya Sabha elections.</div>
    `
  },
  15: {
    questext: "Members from British provinces were elected to the Constituent Assembly by:",
    options: ["Direct adult franchise", "Provincial Legislative Assemblies through single transferable vote", "District boards", "Nomination by the Viceroy"],
    correct: "2",
    exptext: "✅ Provincial Legislative Assemblies, via STV. ❌ Adult franchise was demanded but not used."
  },
  16: {
    questext: "Consider: (a) Princely States' representatives were nominated by their heads. (b) Seats were divided among Muslims, Sikhs and General communities. Which is correct?",
    options: ["Only (a)", "Only (b)", "Both (a) and (b)", "Neither (a) nor (b)"],
    correct: "3",
    exptext: "✅ Both are correct. 📌 Provinces elected, States nominated."
  },
  17: {
    type: "concept", icon: "🗳️", accent: "#14b8a6", pauseTimer: true,
    title: "Elections (July–August 1946)",
    html: `
      <p class="cp-lead">Elections to the 296 British India seats were held in <b>July–August 1946</b>, and the Congress won most of them.</p>
      <table><thead><tr><th>Party / Group</th><th>Seats</th></tr></thead><tbody><tr><td>INC</td><td>208</td></tr><tr><td>Muslim League</td><td>73</td></tr><tr><td>Small groups &amp; independents</td><td>15</td></tr><tr><td>Princely States</td><td>93 left vacant</td></tr></tbody></table>
      <div class="cp-note trap">208 + 73 + 15 = 296. The 93 State seats stayed vacant because the States stayed away.</div>
      <div class="cp-note exam">All sections were represented — Hindus, Muslims, Sikhs, Parsis, Anglo-Indians, Indian Christians, SCs, STs and women — but <u>Mahatma Gandhi was not a member</u>.</div>
    `
  },
  18: {
    questext: "In the July–August 1946 elections to the Assembly, how many seats did the INC win?",
    options: ["292", "73", "296", "208"],
    correct: "4",
    exptext: "✅ INC won 208. 📌 208 + 73 + 15 = 296. ❌ 296 is the total British India seats."
  },
  19: {
    questext: "Which of the following is NOT true about the Constituent Assembly of 1946?",
    options: ["Mahatma Gandhi was a member", "The Muslim League won 73 seats", "Princely State seats were initially vacant", "Women were represented"],
    correct: "1",
    exptext: "✅ Gandhi was not a member, though most other leaders were."
  },
  20: {
    type: "concept", icon: "👩", accent: "#ec4899", pauseTimer: true,
    title: "Women in the Constituent Assembly",
    html: `
      <p class="cp-lead"><b>Fifteen women</b> shaped debates on women's rights, social welfare and fundamental rights.</p>
      <p>Ammu Swaminathan · Dakshayani Velayudhan · Begum Aizaz Rasul · Durgabai Deshmukh · Hansa Jivraj Mehta · Kamla Chaudhry · Leela Roy · Malati Choudhury · Purnima Banerjee · Rajkumari Amrit Kaur · Renuka Ray · Sarojini Naidu · Sucheta Kriplani · Vijaya Lakshmi Pandit · Annie Mascarene</p>
      <div class="cp-note exam">Learn the count: <b>15 women</b>. Rajkumari Amrit Kaur later became Health Minister in the First Cabinet of 1947.</div>
    `
  },
  21: {
    questext: "How many women were members of the Constituent Assembly?",
    options: ["9", "15", "12", "20"],
    correct: "2",
    exptext: "✅ Fifteen women members. 📌 15 women of 389 seats."
  },
  22: {
    questext: "Which one of the following was NOT a woman member of the Constituent Assembly?",
    options: ["Durgabai Deshmukh", "Hansa Jivraj Mehta", "Aruna Asaf Ali", "Sucheta Kriplani"],
    correct: "3",
    exptext: "✅ Aruna Asaf Ali is not among the 15 women members. 📌 Remember Durgabai, Hansa, Sucheta, Sarojini."
  },
  23: {
    type: "concept", icon: "🏢", accent: "#3b82f6", pauseTimer: true,
    title: "Interim Government, 1946",
    html: `
      <p class="cp-lead">Formed on <b>2 September 1946</b>; its members sat in the Viceroy's Executive Council and <u>Nehru was Vice-President</u>. The Muslim League nominees joined on 26 October 1946.</p>
      <table><thead><tr><th>Member</th><th>Portfolio</th></tr></thead><tbody><tr><td>Jawaharlal Nehru</td><td>Vice-President of Council; External Affairs &amp; Commonwealth Relations</td></tr><tr><td>Sardar Vallabhbhai Patel</td><td>Home, Information &amp; Broadcasting</td></tr><tr><td>Dr. Rajendra Prasad</td><td>Food &amp; Agriculture</td></tr><tr><td>Dr. John Mathai</td><td>Industries &amp; Supplies</td></tr><tr><td>Sardar Baldev Singh</td><td>Defence</td></tr><tr><td>C. H. Bhabha</td><td>Works, Mines &amp; Power</td></tr><tr><td>Liaquat Ali Khan</td><td>Finance</td></tr><tr><td>Abdur Rab Nishtar</td><td>Posts &amp; Air</td></tr><tr><td>Asaf Ali</td><td>Railways &amp; Transport</td></tr><tr><td>C. Rajagopalachari</td><td>Education &amp; Arts</td></tr><tr><td>Jagjivan Ram</td><td>Labour</td></tr><tr><td>Ghazanfar Ali Khan</td><td>Health</td></tr><tr><td>Jogindar Nath Mandal</td><td>Law</td></tr></tbody></table>
      <div class="cp-note trap">The Viceroy remained the head. Nehru was <i>Vice-President</i> of the Council, not Prime Minister.</div>
    `
  },
  24: {
    questext: "Who was the Vice-President of the Viceroy's Executive Council in the Interim Government of 1946?",
    options: ["Sardar Patel", "Dr. Rajendra Prasad", "Liaquat Ali Khan", "Jawaharlal Nehru"],
    correct: "4",
    exptext: "✅ Nehru. 📌 Viceroy = head, Nehru = Vice-President. ❌ Patel held Home."
  },
  25: {
    questext: "Who held the Finance portfolio in the Interim Government of 1946?",
    options: ["Liaquat Ali Khan", "Dr. John Mathai", "R. K. Shanmugham Chetty", "C. Rajagopalachari"],
    correct: "1",
    exptext: "✅ Liaquat Ali Khan. ❌ Chetty was Finance Minister later, in the First Cabinet of 1947."
  },
  26: {
    type: "concept", icon: "🎯", accent: "#f97316", pauseTimer: true,
    title: "Objectives Resolution",
    html: `
      <p class="cp-lead">On <b>13 December 1946</b> Nehru moved the historic Objectives Resolution, laying down the philosophy of the Constitution.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Moved by</td><td>Jawaharlal Nehru</td></tr><tr><td>Moved on</td><td>13 December 1946</td></tr><tr><td>Adopted</td><td>22 January 1947, unanimously</td></tr><tr><td>Declared</td><td>India an Independent Sovereign Republic</td></tr><tr><td>Legacy</td><td>Modified version forms the Preamble</td></tr></tbody></table>
      <div class="cp-grid c3"><div class="cp-card blue"><b>Sovereignty</b><br>All power derived from the people</div><div class="cp-card green"><b>Guarantees</b><br>Justice, equality and freedoms</div><div class="cp-card amber"><b>Safeguards</b><br>Minorities, backward, tribal and depressed classes</div></div>
      <div class="cp-note trap"><b>Moved</b> on 13 Dec 1946 but <b>adopted</b> on 22 Jan 1947 — two different dates.</div>
    `
  },
  27: {
    questext: "The Objectives Resolution was adopted by the Constituent Assembly on:",
    options: ["13 December 1946", "22 January 1947", "9 December 1946", "26 November 1949"],
    correct: "2",
    exptext: "✅ 22 January 1947, unanimously. ❌ 13 December 1946 is the date it was moved."
  },
  28: {
    questext: "A modified version of the Objectives Resolution forms which part of the Constitution?",
    options: ["Seventh Schedule", "Fundamental Duties", "The Preamble", "Emergency provisions"],
    correct: "3",
    exptext: "✅ The Preamble. 📌 Resolution = philosophy = Preamble."
  },
  29: {
    questext: "Which of the following was NOT a provision of the Objectives Resolution?",
    options: ["All power derived from the people", "Justice — social, economic and political", "Safeguards for minorities, backward and tribal classes", "Sovereignty vested in Parliament rather than the people"],
    correct: "4",
    exptext: "✅ The Resolution placed sovereignty in the people, not in Parliament."
  },
  30: {
    type: "concept", icon: "🇮🇳", accent: "#84cc16", pauseTimer: true,
    title: "Changes by the Independence Act, 1947",
    html: `
      <p class="cp-lead">Princely states gradually joined: six on 28 April 1947, and most others after the Mountbatten Plan (3 June 1947). The Act then changed the Assembly's position.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Making_of_the_Constitution/2.png" alt="Bars: 389 falls to 299" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Change</th><th>Effect</th></tr></thead><tbody><tr><td>Fully sovereign</td><td>Free to frame any Constitution</td></tr><tr><td>Also a legislature</td><td>First Parliament (Dominion Legislature)</td></tr><tr><td>Chair as constitution-maker</td><td>Dr. Rajendra Prasad</td></tr><tr><td>Chair as legislature</td><td>G. V. Mavlankar</td></tr><tr><td>Muslim League withdrew</td><td>389 → 299 (British provinces 296 → 229; States 93 → 70)</td></tr></tbody></table>
      <div class="cp-note trap">The chairman depends on the role: Prasad = <i>constitution-maker</i>, Mavlankar = <i>legislature</i>.</div>
    `
  },
  31: {
    questext: "When the Constituent Assembly met as the legislative body, who chaired it?",
    options: ["G. V. Mavlankar", "Dr. Rajendra Prasad", "Dr. Sachchidananda Sinha", "H. C. Mukherjee"],
    correct: "1",
    exptext: "✅ G. V. Mavlankar. 📌 Prasad chaired only as constitution-maker."
  },
  32: {
    questext: "After the Muslim League withdrew, the strength of the Assembly fell to:",
    options: ["229", "299", "389", "296"],
    correct: "2",
    exptext: "✅ 299: British provinces 229 + States 70. ❌ 389 was the original strength."
  },
  33: {
    questext: "Which change did the Indian Independence Act, 1947 make in the Assembly's position?",
    options: ["It became subordinate to the British Parliament", "It could frame only a federal structure", "It became a fully sovereign body, free to frame any Constitution", "It was dissolved until the States joined"],
    correct: "3",
    exptext: "✅ It became fully sovereign and also acted as the first Parliament."
  },
  34: {
    type: "concept", icon: "🚩", accent: "#06b6d4", pauseTimer: true,
    title: "Other Functions Performed",
    html: `
      <p class="cp-lead">Besides framing the Constitution and making ordinary laws, the Assembly took several national decisions.</p>
      <table><thead><tr><th>Function</th><th>Date</th></tr></thead><tbody><tr><td>Ratified Commonwealth membership</td><td>May 1949</td></tr><tr><td>Adopted the National Flag</td><td>22 July 1947</td></tr><tr><td>Adopted National Anthem &amp; National Song</td><td>24 January 1950</td></tr><tr><td>Elected Dr. Rajendra Prasad first President</td><td>24 January 1950</td></tr></tbody></table>
      <div class="cp-note exam">Office-bearers: Temporary President — Dr. Sachchidananda Sinha; Vice-Presidents — V. T. Krishnamachari and H. C. Mukherjee.</div>
      <div class="cp-note trap">The flag was adopted in <b>1947</b>; the anthem and song in <b>1950</b>.</div>
    `
  },
  35: {
    questext: "The Constituent Assembly adopted the National Flag on:",
    options: ["26 January 1950", "15 August 1947", "24 January 1950", "22 July 1947"],
    correct: "4",
    exptext: "✅ 22 July 1947. ❌ 24 January 1950 is for the anthem and song."
  },
  36: {
    questext: "Who was the Temporary President of the Constituent Assembly?",
    options: ["Dr. Sachchidananda Sinha", "Dr. Rajendra Prasad", "Dr. B. R. Ambedkar", "G. V. Mavlankar"],
    correct: "1",
    exptext: "✅ Dr. Sachchidananda Sinha. 📌 Temporary = Sinha, permanent = Prasad."
  },
  37: {
    type: "concept", icon: "⏱️", accent: "#a855f7", pauseTimer: true,
    title: "Quick Facts – Constitution Making",
    html: `
      <table><thead><tr><th>Fact</th><th>Figure</th></tr></thead><tbody><tr><td>Sessions</td><td>11 sessions over 2 years, 11 months, 18 days</td></tr><tr><td>Constitutions studied</td><td>About 60 countries</td></tr><tr><td>Draft considered for</td><td>114 days</td></tr><tr><td>Total expenditure</td><td>₹64 lakh</td></tr><tr><td>First session</td><td>9–23 December 1946</td></tr><tr><td>Final session</td><td>24 January 1950</td></tr></tbody></table>
      <div class="cp-note exam">After its final session it continued as the Provisional Parliament from 26 Jan 1950 until the 1951–52 elections.</div>
    `
  },
  38: {
    questext: "The first session of the Constituent Assembly was held in:",
    options: ["November 1946", "December 1946", "January 1947", "August 1947"],
    correct: "2",
    exptext: "✅ 9–23 December 1946. ❌ The Assembly was constituted in November, but first met in December."
  },
  39: {
    questext: "How long did the Constituent Assembly take to frame the Constitution?",
    options: ["3 years 2 months", "4 years 1 month", "2 years 11 months 18 days", "2 years 3 months 12 days"],
    correct: "3",
    exptext: "✅ 2 years, 11 months, 18 days, over 11 sessions."
  },
  40: {
    type: "concept", icon: "🗂️", accent: "#e11d48", pauseTimer: true,
    title: "Committees of the Constituent Assembly",
    html: `
      <p class="cp-lead">Eight major committees did the main work (seven below plus the Advisory Committee under Patel); <b>Nehru, Patel and Prasad</b> chaired most.</p>
      <table><thead><tr><th>Committee</th><th>Chairman</th></tr></thead><tbody><tr><td>Union Constitution</td><td>J. L. Nehru</td></tr><tr><td>Union Powers</td><td>Jawaharlal Nehru</td></tr><tr><td>Provincial Constitution</td><td>Sardar Patel</td></tr><tr><td>Drafting</td><td>Dr. B. R. Ambedkar</td></tr><tr><td>Rules of Procedure</td><td>Dr. Rajendra Prasad</td></tr><tr><td>States (negotiating with states)</td><td>Jawaharlal Nehru</td></tr><tr><td>Steering</td><td>Dr. Rajendra Prasad</td></tr></tbody></table>
      <div class="cp-note trap">Ambedkar chaired only the <b>Drafting Committee</b>; Patel chaired the Provincial Constitution and Advisory committees.</div>
      <div class="cp-mnemonic"><b>N</b>ehru: Union, Union Powers, States · <b>P</b>atel: Provincial · <b>P</b>rasad: Rules, Steering</div>
    `
  },
  41: {
    questext: "Who chaired the Provincial Constitution Committee?",
    options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Dr. B. R. Ambedkar", "Sardar Patel"],
    correct: "4",
    exptext: "✅ Sardar Patel. ❌ Nehru chaired Union Constitution, Union Powers and States committees."
  },
  42: {
    questext: "Which committee was NOT chaired by Jawaharlal Nehru?",
    options: ["Steering Committee", "Union Powers Committee", "Union Constitution Committee", "States Committee"],
    correct: "1",
    exptext: "✅ Steering Committee was chaired by Dr. Rajendra Prasad."
  },
  43: {
    questext: "Consider: (a) Ambedkar chaired the Drafting Committee. (b) Patel chaired the Union Powers Committee. (c) Prasad chaired the Steering Committee. Which are correct?",
    options: ["(a) only", "(a) and (c) only", "(b) and (c) only", "(a), (b) and (c)"],
    correct: "2",
    exptext: "✅ (a) and (c). ❌ (b) is wrong: Nehru chaired the Union Powers Committee."
  },
  44: {
    type: "concept", icon: "🧭", accent: "#10b981", pauseTimer: true,
    title: "Advisory Committee (Fundamental Rights, Minorities, Tribal & Excluded Areas)",
    html: `
      <p class="cp-lead">Chaired by <b>Sardar Patel</b>, it worked through sub-committees on rights, minorities and tribal areas.</p>
      <table><thead><tr><th>Sub-committee</th><th>Chairman</th></tr></thead><tbody><tr><td>Fundamental Rights</td><td>J. B. Kripalani</td></tr><tr><td>Minorities</td><td>H. C. Mookerjee</td></tr><tr><td>NE Frontier Tribal Areas &amp; Assam Excluded/Partially Excluded Areas</td><td>Gopinath Bardoloi</td></tr><tr><td>Excluded &amp; Partially Excluded Areas (other than Assam)</td><td>A. V. Thakkar</td></tr></tbody></table>
      <div class="cp-note trap">Kripalani = Fundamental Rights; Bardoloi = North-East and Assam; Thakkar = other excluded areas.</div>
    `
  },
  45: {
    questext: "Who chaired the Fundamental Rights Sub-Committee of the Advisory Committee?",
    options: ["Sardar Patel", "H. C. Mookerjee", "J. B. Kripalani", "A. V. Thakkar"],
    correct: "3",
    exptext: "✅ J. B. Kripalani. ❌ Patel chaired the main Advisory Committee."
  },
  46: {
    questext: "Gopinath Bardoloi chaired the sub-committee on:",
    options: ["Fundamental Rights", "Minorities", "Excluded Areas other than Assam", "NE Frontier Tribal Areas and Assam Excluded Areas"],
    correct: "4",
    exptext: "✅ NE Frontier Tribal Areas and Assam. ❌ Thakkar headed the other excluded areas."
  },
  47: {
    type: "concept", icon: "📁", accent: "#eab308", pauseTimer: true,
    title: "Minor Committees & Chairmen",
    html: `
      <table><thead><tr><th>Committee</th><th>Chairman</th></tr></thead><tbody><tr><td>Finance &amp; Staff</td><td>Dr. Rajendra Prasad</td></tr><tr><td>House</td><td>B. Pattabhi Sitaramayya</td></tr><tr><td>Order of Business</td><td>Dr. K. M. Munshi</td></tr><tr><td>Ad-hoc on National Flag</td><td>Dr. Rajendra Prasad</td></tr><tr><td>Functions of the Assembly</td><td>G. V. Mavlankar</td></tr><tr><td>Linguistic Provinces Commission</td><td>S. K. Dar</td></tr><tr><td>Special Committee to Examine Draft Constitution</td><td>Jawaharlal Nehru</td></tr><tr><td>Press Gallery</td><td>Usha Nath Sen</td></tr></tbody></table>
      <div class="cp-note trap">S. K. Dar headed the Linguistic Provinces Commission but was <b>not</b> an Assembly member.</div>
      <div class="cp-note exam">Mavlankar — Functions of the Assembly; Pattabhi — House Committee.</div>
    `
  },
  48: {
    questext: "The Linguistic Provinces Commission was headed by:",
    options: ["S. K. Dar", "Fazl Ali", "K. M. Panikkar", "H. N. Kunzru"],
    correct: "1",
    exptext: "✅ S. K. Dar, who was not a member of the Assembly. 📌 Dar = Linguistic."
  },
  49: {
    questext: "Who chaired the House Committee of the Constituent Assembly?",
    options: ["Dr. K. M. Munshi", "B. Pattabhi Sitaramayya", "G. V. Mavlankar", "Usha Nath Sen"],
    correct: "2",
    exptext: "✅ B. Pattabhi Sitaramayya. ❌ Munshi chaired the Order of Business Committee."
  },
  50: {
    type: "concept", icon: "✍️", accent: "#0ea5e9", pauseTimer: true,
    title: "Drafting Committee – Most Important",
    html: `
      <p class="cp-lead">Set up on <b>29 August 1947</b> with seven members, chaired by <u>Dr. B. R. Ambedkar</u>.</p>
      <table><thead><tr><th>Member</th><th>Note</th></tr></thead><tbody><tr><td>Dr. B. R. Ambedkar</td><td>Chairman</td></tr><tr><td>N. Gopalaswamy Ayyangar</td><td>Member</td></tr><tr><td>Alladi Krishnaswamy Ayyar</td><td>Member</td></tr><tr><td>Dr. K. M. Munshi</td><td>Member</td></tr><tr><td>Syed Mohammad Saadullah</td><td>Member</td></tr><tr><td>N. Madhava Rau</td><td>Replaced B. L. Mitter, who resigned</td></tr><tr><td>T. T. Krishnamachari</td><td>Replaced D. P. Khaitan, who died in 1948</td></tr></tbody></table>
      <div class="cp-note exam">It sat for only <b>141 days</b>; first meeting 30 Aug 1947. <b>B. N. Rau</b> (Constitutional Advisor) prepared the first draft: 243 Articles and 13 Schedules.</div>
      <div class="cp-note trap">B. N. Rau drafted the first text but was not the Committee's chairman.</div>
    `
  },
  51: {
    questext: "The Drafting Committee of the Constituent Assembly was set up on:",
    options: ["9 December 1946", "15 August 1947", "29 August 1947", "26 November 1949"],
    correct: "3",
    exptext: "✅ 29 August 1947, with seven members. ❌ 15 August is Independence Day."
  },
  52: {
    questext: "Who prepared the first draft of the Constitution?",
    options: ["Dr. B. R. Ambedkar", "Dr. K. M. Munshi", "N. Gopalaswamy Ayyangar", "B. N. Rau"],
    correct: "4",
    exptext: "✅ B. N. Rau, the Constitutional Advisor. 📌 Rau drafts, Ambedkar chairs."
  },
  53: {
    questext: "Which statement about the Drafting Committee is NOT correct?",
    options: ["Sardar Patel was its chairman", "It had seven members", "T. T. Krishnamachari replaced D. P. Khaitan", "N. Madhava Rau replaced B. L. Mitter"],
    correct: "1",
    exptext: "✅ Dr. B. R. Ambedkar was the chairman, not Patel."
  },
  54: {
    questext: "The first draft prepared by B. N. Rau contained:",
    options: ["395 Articles and 8 Schedules", "243 Articles and 13 Schedules", "243 Articles and 8 Schedules", "395 Articles and 13 Schedules"],
    correct: "2",
    exptext: "✅ 243 Articles and 13 Schedules. ❌ 395 Articles and 8 Schedules is the final adopted Constitution."
  },
  55: {
    type: "concept", icon: "📖", accent: "#d946ef", pauseTimer: true,
    title: "Enactment of the Constitution",
    html: `
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Making_of_the_Constitution/3.png" alt="Timeline of three readings and adoption" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Reading</th><th>Dates</th><th>Key detail</th></tr></thead><tbody><tr><td>First</td><td>4 Nov 1948 – 9 Nov 1948</td><td>Ambedkar introduced the final draft; general discussion for 5 days</td></tr><tr><td>Second</td><td>15 Nov 1948 – 17 Oct 1949</td><td>7,653 amendments proposed, 2,473 discussed</td></tr><tr><td>Third</td><td>From 14 Nov 1949</td><td>Ambedkar moved that the Constitution as settled be passed</td></tr></tbody></table>
      <div class="cp-note trap">7,653 amendments were <i>proposed</i>, but only 2,473 were <i>discussed</i>.</div>
    `
  },
  56: {
    questext: "Dr. Ambedkar introduced the final draft of the Constitution in the Assembly on:",
    options: ["9 November 1948", "15 November 1948", "4 November 1948", "14 November 1949"],
    correct: "3",
    exptext: "✅ 4 November 1948, the first reading. ❌ 14 November 1949 is the start of the third reading."
  },
  57: {
    questext: "During the second reading, how many amendments were actually discussed?",
    options: ["7,653", "395", "114", "2,473"],
    correct: "4",
    exptext: "✅ 2,473 were discussed. ❌ 7,653 is the number proposed."
  },
  58: {
    questext: "Who moved the motion that 'the Constitution as settled be passed' in the third reading?",
    options: ["Dr. B. R. Ambedkar", "Jawaharlal Nehru", "Dr. Rajendra Prasad", "Sardar Patel"],
    correct: "1",
    exptext: "✅ Dr. B. R. Ambedkar, as Drafting Committee chairman."
  },
  59: {
    type: "concept", icon: "✅", accent: "#64748b", pauseTimer: true,
    title: "Adoption – 26 November 1949",
    html: `
      <p class="cp-lead">The motion was passed and signed on <b>26 November 1949</b>.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Members present and signed</td><td>284 out of 299</td></tr><tr><td>As adopted</td><td>Preamble, 395 Articles, 8 Schedules, 22 Parts</td></tr><tr><td>Dr. B. R. Ambedkar</td><td>Father of the Indian Constitution, Chief Architect, 'Modern Manu'</td></tr></tbody></table>
      <div class="cp-note trap">299 members in total, but only <b>284</b> were present and signed.</div>
    `
  },
  60: {
    questext: "How many Articles, Schedules and Parts did the Constitution have when adopted?",
    options: ["395 Articles, 12 Schedules, 22 Parts", "395 Articles, 8 Schedules, 22 Parts", "448 Articles, 8 Schedules, 25 Parts", "395 Articles, 8 Schedules, 25 Parts"],
    correct: "2",
    exptext: "✅ 395 Articles, 8 Schedules and 22 Parts. 📌 395-8-22."
  },
  61: {
    questext: "How many members present signed the Constitution on 26 November 1949?",
    options: ["299", "389", "284", "229"],
    correct: "3",
    exptext: "✅ 284 of 299 members. ❌ 299 was the total strength, not those present."
  },
  62: {
    questext: "Who is called the 'Modern Manu' of India?",
    options: ["Jawaharlal Nehru", "Sardar Patel", "B. N. Rau", "Dr. B. R. Ambedkar"],
    correct: "4",
    exptext: "✅ Dr. B. R. Ambedkar, also the Father and Chief Architect of the Constitution."
  },
  63: {
    type: "concept", icon: "📅", accent: "#fb7185", pauseTimer: true,
    title: "Enforcement of the Constitution",
    html: `
      <table><thead><tr><th>Date</th><th>What came into force</th></tr></thead><tbody><tr><td>26 Nov 1949</td><td>Articles 5, 6, 7, 8, 9, 60, 324, 366, 367, 379, 380, 388, 391, 392, 393 (citizenship, elections, provisional parliament etc.)</td></tr><tr><td>26 Jan 1950</td><td>The remaining major part — the date of commencement, celebrated as Republic Day</td></tr></tbody></table>
      <div class="cp-note exam"><b>Why 26 January?</b> On this day in 1930 Purna Swaraj Day was celebrated, after the INC's Lahore Session (Dec 1929).</div>
      <div class="cp-note trap">On commencement, the Independence Act 1947 and the Government of India Act 1935 were repealed.</div>
    `
  },
  64: {
    questext: "The Articles on citizenship (Articles 5 to 9) came into force on:",
    options: ["26 November 1949", "26 January 1950", "15 August 1947", "24 January 1950"],
    correct: "1",
    exptext: "✅ 26 November 1949. ❌ The rest of the Constitution started on 26 January 1950."
  },
  65: {
    questext: "Why was 26 January chosen as the date of commencement?",
    options: ["It was the date of Independence", "Purna Swaraj Day was celebrated on 26 January 1930", "The Objectives Resolution was adopted that day", "It was Ambedkar's birthday"],
    correct: "2",
    exptext: "✅ It honours Purna Swaraj Day, 1930, after the Lahore Session. 📌 Lahore 1929 → 26 Jan 1930."
  },
  66: {
    questext: "Which Acts were repealed on the commencement of the Constitution?",
    options: ["Government of India Act 1919 and Cabinet Mission Plan", "August Offer and Cripps Proposals", "Indian Independence Act 1947 and Government of India Act 1935", "Mountbatten Plan and Government of India Act 1919"],
    correct: "3",
    exptext: "✅ The Independence Act 1947 and the Government of India Act 1935."
  },
  67: {
    type: "concept", icon: "🧪", accent: "#2dd4bf", pauseTimer: true,
    title: "Experts Committee, 1946",
    html: `
      <p class="cp-lead">On <b>8 July 1946</b>, while elections were on, the Congress appointed it to prepare material for the Assembly.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Chairman</td><td>Jawaharlal Nehru</td></tr><tr><td>Members</td><td>M. Asaf Ali, K. M. Munshi, N. Gopalaswami Ayyangar, K. T. Shah, D. R. Gadgil, Humayun Kabir, K. Santhanam</td></tr><tr><td>Co-opted</td><td>Krishna Kripalani (member and convener)</td></tr><tr><td>Sittings</td><td>New Delhi (20–22 July 1946) and Bombay (15–17 Aug 1946)</td></tr></tbody></table>
    `
  },
  68: {
    questext: "Who chaired the Experts Committee appointed by the Congress in 1946?",
    options: ["Dr. B. R. Ambedkar", "Sardar Patel", "Dr. Rajendra Prasad", "Jawaharlal Nehru"],
    correct: "4",
    exptext: "✅ Jawaharlal Nehru. 📌 Experts Committee = Nehru."
  },
  69: {
    questext: "Which one of the following was NOT a member of the Experts Committee, 1946?",
    options: ["Alladi Krishnaswami Ayyar", "K. T. Shah", "D. R. Gadgil", "Humayun Kabir"],
    correct: "1",
    exptext: "✅ Alladi Krishnaswami Ayyar was on the Drafting Committee, not the Experts Committee."
  },
  70: {
    type: "concept", icon: "🗣️", accent: "#c026d3", pauseTimer: true,
    title: "Criticism of the Constituent Assembly",
    html: `
      <table><thead><tr><th>Critic</th><th>Criticism</th></tr></thead><tbody><tr><td>Granville Austin (US expert)</td><td>A one-party body in a one-party country: the Assembly was the Congress and the Congress was India</td></tr><tr><td>Lord Viscount Simon</td><td>Called it a body of Hindus</td></tr><tr><td>Winston Churchill</td><td>Said it represented only one major community in India</td></tr></tbody></table>
      <div class="cp-note trap">In fact the Assembly included all sections of society, though it was not elected on adult franchise.</div>
    `
  },
  71: {
    questext: "'The Assembly was the Congress and the Congress was India' — who made this remark?",
    options: ["Winston Churchill", "Granville Austin", "Lord Viscount Simon", "Jawaharlal Nehru"],
    correct: "2",
    exptext: "✅ Granville Austin, a US expert. 📌 Austin = one-party body."
  },
  72: {
    questext: "Which critic called the Constituent Assembly 'a body of Hindus'?",
    options: ["Granville Austin", "Winston Churchill", "Lord Viscount Simon", "Sir Stafford Cripps"],
    correct: "3",
    exptext: "✅ Lord Viscount Simon. ❌ Churchill said it represented only one major community."
  },
  73: {
    type: "concept", icon: "⭐", accent: "#7c3aed", pauseTimer: true,
    title: "Important Facts to Remember",
    html: `
      <table><thead><tr><th>Role</th><th>Person</th></tr></thead><tbody><tr><td>Secretary to the Assembly</td><td>H. V. R. Iyengar</td></tr><tr><td>Chief Draftsman</td><td>S. N. Mukerjee</td></tr><tr><td>Calligrapher (original English text)</td><td>Prem Behari Narain Raizada</td></tr><tr><td>Artwork and decoration</td><td>Nandalal Bose and Beohar Rammanohar Sinha (Shantiniketan artists)</td></tr><tr><td>Hindi calligraphy</td><td>Vasant Krishan Vaidya, decorated by Nandalal Bose</td></tr><tr><td>Language of the original</td><td>English</td></tr><tr><td>Emblem of the Assembly</td><td>Elephant</td></tr></tbody></table>
      <div class="cp-note exam">Ambedkar warned that on 26 Jan 1950 India would enter a <b>life of contradictions</b>: equality in politics, inequality in social and economic life.</div>
    `
  },
  74: {
    questext: "Who handwrote the original Constitution in a flowing italic style?",
    options: ["Nandalal Bose", "Vasant Krishan Vaidya", "S. N. Mukerjee", "Prem Behari Narain Raizada"],
    correct: "4",
    exptext: "✅ Prem Behari Narain Raizada. ❌ Vaidya did the Hindi calligraphy."
  },
  75: {
    questext: "The original Constitution was decorated by which Shantiniketan artists?",
    options: ["Nandalal Bose and Beohar Rammanohar Sinha", "Prem Behari Narain Raizada and S. N. Mukerjee", "H. V. R. Iyengar and V. T. Krishnamachari", "Vasant Krishan Vaidya and S. N. Mukerjee"],
    correct: "1",
    exptext: "✅ Nandalal Bose and Beohar Rammanohar Sinha."
  },
  76: {
    questext: "Who was the Secretary to the Constituent Assembly?",
    options: ["S. N. Mukerjee", "H. V. R. Iyengar", "B. N. Rau", "V. T. Krishnamachari"],
    correct: "2",
    exptext: "✅ H. V. R. Iyengar. ❌ S. N. Mukerjee was the Chief Draftsman."
  },
  77: {
    type: "concept", icon: "👥", accent: "#b45309", pauseTimer: true,
    title: "First Cabinet of Free India, 1947",
    html: `
      <table><thead><tr><th>Member</th><th>Portfolio</th></tr></thead><tbody><tr><td>Jawaharlal Nehru</td><td>Prime Minister; External Affairs &amp; Commonwealth; Scientific Research</td></tr><tr><td>Sardar Vallabhbhai Patel</td><td>Home, Information &amp; Broadcasting; States</td></tr><tr><td>Dr. Rajendra Prasad</td><td>Food &amp; Agriculture</td></tr><tr><td>Maulana Abul Kalam Azad</td><td>Education</td></tr><tr><td>Dr. John Mathai</td><td>Railways &amp; Transport</td></tr><tr><td>R. K. Shanmugham Chetty</td><td>Finance</td></tr><tr><td>Dr. B. R. Ambedkar</td><td>Law</td></tr><tr><td>Jagjivan Ram</td><td>Labour</td></tr><tr><td>Sardar Baldev Singh</td><td>Defence</td></tr><tr><td>Rajkumari Amrit Kaur</td><td>Health</td></tr><tr><td>C. H. Bhabha</td><td>Commerce</td></tr><tr><td>Rafi Ahmed Kidwai</td><td>Communication</td></tr><tr><td>Dr. Shyama Prasad Mukherji</td><td>Industries &amp; Supplies</td></tr><tr><td>V. N. Gadgil</td><td>Works, Mines &amp; Power</td></tr></tbody></table>
      <div class="cp-note trap">Finance: Liaquat Ali Khan in the 1946 Interim Government, but R. K. Shanmugham Chetty in the 1947 Cabinet.</div>
    `
  },
  78: {
    questext: "Who was the Finance Minister in the First Cabinet of Free India, 1947?",
    options: ["Liaquat Ali Khan", "Dr. John Mathai", "R. K. Shanmugham Chetty", "C. Rajagopalachari"],
    correct: "3",
    exptext: "✅ R. K. Shanmugham Chetty. ❌ Liaquat Ali Khan held Finance in the 1946 Interim Government."
  },
  79: {
    questext: "Who held the Health portfolio in the First Cabinet of Free India?",
    options: ["Maulana Abul Kalam Azad", "Dr. John Mathai", "Jagjivan Ram", "Rajkumari Amrit Kaur"],
    correct: "4",
    exptext: "✅ Rajkumari Amrit Kaur. ❌ Azad held Education."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Making_of_the_Constitution/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an elegant open book of the Constitution, a quill pen with an inkwell and a subtle Ashoka Chakra" },
  "images/General_Awareness/Polity/Making_of_the_Constitution/1.png": { t: "fig", about: "One split bar: Total 389 → British India 296 (292 Governors' provinces + 4 Chief Commissioners' provinces) and Princely States 93." },
  "images/General_Awareness/Polity/Making_of_the_Constitution/2.png": { t: "fig", about: "Two bars: before 389 (British India 296, States 93) and after Muslim League withdrew 299 (British India 229, States 70); label Independence Act 1947." },
  "images/General_Awareness/Polity/Making_of_the_Constitution/3.png": { t: "fig", about: "Horizontal timeline with 5 dots: 4 Nov 1948 First reading; 15 Nov 1948–17 Oct 1949 Second reading; 14 Nov 1949 Third reading; 26 Nov 1949 Adopted; 26 Jan 1950 Enforced." }
});

/* CHANGE LOG
   - Objectives Resolution: the notes say residuary powers were with the Union; the Resolution itself left them with the autonomous units, so this point was left out.
   - Interim Government: formed 2 Sept 1946; the Muslim League nominees joined on 26 Oct 1946, so the table shows the later cabinet. Syed Ali Zaheer (Commerce) is left out as the portfolio could not be confirmed.
   - Advisory Committee: the notes say five sub-committees but list a duplicate 'Tribal Areas' entry; only the four named sub-committees are shown.
   - Major Committees: the notes say eight; seven are listed with the Advisory Committee (Sardar Patel) counted as the eighth.
   - Minor Committees: the 'Ad-hoc Committee on Citizenship and Supreme Court' row is left out because its title is unclear in the notes.
   - Important Facts: 'Symbol – Elephant' is shown as the emblem of the Constituent Assembly.
*/