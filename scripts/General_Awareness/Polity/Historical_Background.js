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

/* Field: General_Awareness · Subject: Polity · Chapter: Historical_Background · 14 concept pages (+ overview) · 42 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Historical Background of Indian Polity",
    thumb: {
      image: "images/General_Awareness/Polity/Historical_Background/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "POLITY",
      line2: "HISTORICAL",
      line3: "BACKGROUND",
      badge: "FULL CLASS",
      ribbon: "ACTS • FEATURES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Historical Background of Indian Polity | All Acts 1773-1947 | SSC CGL, UPSC",
      altTitles: ["Regulating Act 1773 to Independence Act 1947 in One Class", "Polity Historical Background Tricks for All Exams"],
      description: "Historical Background is the most scoring starting point of Polity. In this class we cover every Act from 1773 to 1947 with the key features examiners love to ask.\n\n📌 IN THIS CLASS\n✅ Company Rule vs Crown Rule\n✅ Regulating Act, Pitt's India Act and Charter Acts\n✅ GOI Act 1858, Indian Councils Acts 1861, 1892, 1909\n✅ GOI Act 1919 and 1935, Independence Act 1947\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Historical Background\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Polity #IndianPolity",
      tags: ["historical background polity", "indian polity", "polity for all exams", "regulating act 1773", "pitts india act 1784", "charter acts", "government of india act 1858", "indian councils act 1909", "government of india act 1919", "government of india act 1935", "morley minto reforms", "montagu chelmsford reforms", "company rule and crown rule", "polity tricks", "SSC CGL polity", "UPSC polity", "general awareness", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "Historical Background MCQ"],
      hashtags: ["SSCCGL", "Polity", "IndianPolity"],
      thumbText: "POLITY: HISTORICAL BACKGROUND",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New class is live: Historical Background of Polity (1773–1947). Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Historical Background",
      playlist: "Polity — Full Classes"
    },
    html: `
      <p class="cp-lead">From the <u>Regulating Act, 1773 to the Indian Independence Act, 1947</u> — the Acts that built our constitutional system, in exam order.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>14</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>42</b><span>Questions</span></div>
        <div class="cp-stat"><b>~70 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Historical Background</b><br>Company Rule (1773–1858) vs Crown Rule (1858–1947).</li>
        <li><b>Regulating Act, 1773</b><br>First step to control the EIC; Warren Hastings.</li>
        <li><b>Pitt's India Act, 1784</b><br>Double Government; Board of Control.</li>
        <li><b>Charter Act, 1793</b><br>Monopoly extended by 20 years.</li>
        <li><b>Charter Act, 1813</b><br>Monopoly ended except tea and China trade.</li>
        <li><b>Charter Act, 1833</b><br>First G-G of India; centralisation.</li>
        <li><b>Charter Act, 1853</b><br>Last Charter Act; open competition.</li>
        <li><b>Government of India Act, 1858</b><br>EIC abolished; Viceroy and Secretary of State.</li>
        <li><b>Indian Councils Act, 1861</b><br>Representative institutions; ordinance power.</li>
        <li><b>Indian Councils Act, 1892</b><br>Budget discussion; indirect elections.</li>
        <li><b>Indian Councils Act, 1909</b><br>Morley-Minto; communal electorate.</li>
        <li><b>Government of India Act, 1919</b><br>Dyarchy; bicameralism; direct elections.</li>
        <li><b>Government of India Act, 1935</b><br>Provincial autonomy; RBI; Federal Court.</li>
        <li><b>Indian Independence Act, 1947</b><br>Two dominions; end of British rule.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Polity questions in SSC, UPSC, Railways and Banking exams ask 'which Act introduced what' — firsts, lasts and years.</div>
    `
  },
  2: {
    type: "concept", icon: "📊", accent: "#22c55e", pauseTimer: true,
    title: "Historical Background",
    html: `
      <p class="cp-lead">The British came to India in <b>1600</b> as traders through the <b>East India Company</b> under Queen Elizabeth I's charter.</p>
      <table><thead><tr><th>Company Rule (1773–1858)</th><th>Crown Rule (1858–1947)</th></tr></thead><tbody><tr><td>Regulating Act, 1773</td><td>Government of India Act, 1858</td></tr><tr><td>Pitt's India Act, 1784</td><td>Indian Councils Act, 1861</td></tr><tr><td>Charter Act, 1793</td><td>Indian Councils Act, 1892</td></tr><tr><td>Charter Act, 1813</td><td>Indian Councils Act, 1909</td></tr><tr><td>Charter Act, 1833</td><td>GOI Act, 1919</td></tr><tr><td>Charter Act, 1853</td><td>GOI Act, 1935</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Historical_Background/1.png" alt="Timeline: Company Rule 1773 to 1858, Crown Rule 1858 to 1947" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The <b>1858 Act</b> is the dividing line — it ends Company Rule and starts Crown Rule.</div>
      <div class="cp-note exam">Questions often ask which Act belongs to which phase.</div>
      <div class="cp-mnemonic">73 – 84 – 93 – 13 – 33 – 53 : the six Company Rule Acts</div>
    `
  },
  3: {
    questext: "Which of the following Acts belongs to the Crown Rule period?",
    options: ["Pitt's India Act, 1784", "Charter Act, 1833", "Indian Councils Act, 1861", "Regulating Act, 1773"],
    correct: "3",
    exptext: "✅ Indian Councils Act 1861 came after 1858. 📌 Crown Rule starts with the 1858 Act. ❌ The others are Company Rule Acts."
  },
  4: {
    questext: "Arrange chronologically: A) Charter Act 1813 B) Pitt's India Act C) Regulating Act D) Charter Act 1793",
    options: ["C, B, D, A", "B, C, D, A", "C, B, A, D", "C, D, B, A"],
    correct: "1",
    exptext: "✅ 1773, 1784, 1793, 1813 gives C, B, D, A. 📌 73-84-93-13. ❌ Pitt's Act (1784) came after the Regulating Act."
  },
  5: {
    type: "concept", icon: "⚖️", accent: "#f59e0b", pauseTimer: true,
    title: "Regulating Act, 1773",
    html: `
      <p class="cp-lead">The <b>FIRST step</b> by the British Govt to control the East India Company (EIC).</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Governor-General of Bengal</td><td>Governor of Bengal made G-G of Bengal, with a 4-member Executive Council</td></tr><tr><td>1st G-G</td><td>Lord Warren Hastings</td></tr><tr><td>Bombay and Madras</td><td>Made subordinate to the G-G of Bengal (earlier independent)</td></tr><tr><td>Supreme Court, Calcutta (1774)</td><td>1 Chief Justice + 3 Judges</td></tr><tr><td>Corruption</td><td>Company servants prohibited from taking bribes or presents from Indians</td></tr></tbody></table>
      <div class="cp-note trap">Don't confuse the <b>G-G of Bengal</b> (1773) with the <b>G-G of India</b> (1833).</div>
      <div class="cp-note exam">First control over EIC, first G-G and the Calcutta Supreme Court all come from this one Act.</div>
    `
  },
  6: {
    questext: "Who was the first Governor-General of Bengal under the Regulating Act, 1773?",
    options: ["Lord Cornwallis", "Warren Hastings", "Lord Canning", "William Bentinck"],
    correct: "2",
    exptext: "✅ Warren Hastings. 📌 Regulating Act = Hastings. ❌ Bentinck was the first G-G of India (1833)."
  },
  7: {
    questext: "The Supreme Court at Calcutta (1774) consisted of:",
    options: ["1 Chief Justice and 2 Judges", "2 Chief Justices and 3 Judges", "1 Chief Justice and 4 Judges", "1 Chief Justice and 3 Judges"],
    correct: "4",
    exptext: "✅ One Chief Justice plus three Judges. 📌 1 + 3 = 4 members. ❌ Other combinations do not match the Act."
  },
  8: {
    questext: "Which of the following is NOT a feature of the Regulating Act, 1773?",
    options: ["Bombay and Madras made subordinate to Bengal", "Company servants barred from taking bribes", "Legislative and executive functions separated", "Governor of Bengal became G-G of Bengal"],
    correct: "3",
    exptext: "✅ Separation of legislative and executive came with the Charter Act 1853. ❌ The other three are 1773 features."
  },
  9: {
    questext: "The Governor-General of Bengal under the Regulating Act was assisted by an Executive Council of how many members?",
    options: ["4 members", "6 members", "3 members", "15 members"],
    correct: "1",
    exptext: "✅ A 4-member Executive Council. ❌ 15 members was the Council of India (1858)."
  },
  10: {
    type: "concept", icon: "🏛️", accent: "#ef4444", pauseTimer: true,
    title: "Pitt's India Act, 1784",
    html: `
      <p class="cp-lead">Created a <u>Double Government</u> — the Company ran trade, the Crown controlled politics.</p>
      <table><thead><tr><th>Body</th><th>Function</th></tr></thead><tbody><tr><td>Board of Control</td><td>Political function</td></tr><tr><td>Court of Directors</td><td>Commercial function</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Historical_Background/2.png" alt="Double Government: Board of Control and Court of Directors" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">First time EIC territories were called <b>"British possessions"</b>.</div>
      <div class="cp-note exam">British Govt gained <b>supreme control</b> over the Company's administration; Double Government ended only in 1858.</div>
    `
  },
  11: {
    questext: "Double Government was introduced in India by:",
    options: ["Regulating Act, 1773", "Pitt's India Act, 1784", "Charter Act, 1813", "Government of India Act, 1858"],
    correct: "2",
    exptext: "✅ Pitt's India Act 1784. 📌 Board of Control + Court of Directors. ❌ The 1858 Act ended Double Government."
  },
  12: {
    questext: "Under Pitt's India Act, 1784, which pairing is correct?",
    options: ["Board of Control – commercial function", "Court of Directors – political function", "Board of Control – judicial function", "Court of Directors – commercial function"],
    correct: "4",
    exptext: "✅ Court of Directors handled commercial matters. 📌 Board = political. ❌ Options 1 and 2 swap the functions."
  },
  13: {
    questext: "The territories of the EIC were first called \"British possessions\" in:",
    options: ["Regulating Act, 1773", "Charter Act, 1793", "Pitt's India Act, 1784", "Charter Act, 1833"],
    correct: "3",
    exptext: "✅ Pitt's India Act, 1784. 📌 Crown tightens grip. ❌ The 1773 Act only began control."
  },
  14: {
    type: "concept", icon: "⏳", accent: "#8b5cf6", pauseTimer: true,
    title: "Charter Act, 1793",
    html: `
      <p class="cp-lead">The EIC's trade monopoly in India was extended for <b>20 more years</b>.</p>
      <div class="cp-note exam">A one-fact Act: <b>1793 = monopoly + 20 years</b>.</div>
      <div class="cp-note trap">Monopoly was extended in 1793 but <b>abolished</b> in 1813.</div>
    `
  },
  15: {
    questext: "The Charter Act of 1793 extended the EIC's trade monopoly in India by:",
    options: ["20 years", "10 years", "30 years", "5 years"],
    correct: "1",
    exptext: "✅ 20 years. 📌 93 = 20-year extension. ❌ 1813 ended the monopoly instead."
  },
  16: {
    type: "concept", icon: "📜", accent: "#14b8a6", pauseTimer: true,
    title: "Charter Act, 1813",
    html: `
      <p class="cp-lead">The Company's trade monopoly <u>ended</u> — only <b>tea and China trade</b> stayed with it.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Monopoly</td><td>Abolished (except tea + China trade)</td></tr><tr><td>Missionaries</td><td>Allowed to come to India for education</td></tr><tr><td>Education</td><td>Western education promoted in British territories</td></tr></tbody></table>
      <div class="cp-note trap">1793 extended the monopoly; <b>1813</b> abolished it.</div>
      <div class="cp-note exam">Remember the exception: tea and China trade.</div>
    `
  },
  17: {
    questext: "The Charter Act of 1813 abolished the EIC's trade monopoly except in:",
    options: ["opium and salt", "tea and China trade", "spices and cotton", "indigo and silk"],
    correct: "2",
    exptext: "✅ Tea and China trade. 📌 TC stays. ❌ Other commodities lost the monopoly."
  },
  18: {
    questext: "Which of the following was a feature of the Charter Act of 1813?",
    options: ["Open competition for civil servants", "EIC became purely administrative body", "Trade monopoly extended by 20 years", "Missionaries allowed to come to India for education"],
    correct: "4",
    exptext: "✅ Missionaries were allowed. ❌ Open competition came in 1853, admin-only EIC in 1833, extension in 1793."
  },
  19: {
    type: "concept", icon: "🗺️", accent: "#ec4899", pauseTimer: true,
    title: "Charter Act, 1833 (Saint Helena Act)",
    html: `
      <p class="cp-lead">The <b>final step toward centralisation</b> in British India.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>1st G-G of India</td><td>Lord William Bentinck (earlier only G-G of Bengal)</td></tr><tr><td>Legislative powers</td><td>Bombay and Madras governors lost them</td></tr><tr><td>Laws</td><td>Old laws = Regulations; new laws = Acts</td></tr><tr><td>EIC</td><td>Became an administrative body only; commercial activities ended</td></tr><tr><td>Civil services</td><td>Open competition attempted but rejected by Court of Directors</td></tr><tr><td>Indians</td><td>Not to be debarred from Company offices</td></tr></tbody></table>
      <div class="cp-note trap">Open competition was <b>rejected</b> in 1833; it was actually introduced in 1853.</div>
      <div class="cp-note exam">Bentinck = 1st G-G of India; Hastings = 1st G-G of Bengal.</div>
    `
  },
  20: {
    questext: "The first Governor-General of India was:",
    options: ["Warren Hastings", "Lord Canning", "Lord William Bentinck", "Lord Dalhousie"],
    correct: "3",
    exptext: "✅ Bentinck, under the Charter Act 1833. ❌ Canning was the first Viceroy (1858)."
  },
  21: {
    questext: "The Charter Act of 1833 is also known as:",
    options: ["Saint Helena Act", "Morley-Minto Reforms", "Montagu-Chelmsford Reforms", "Pitt's India Act"],
    correct: "1",
    exptext: "✅ Saint Helena Act. ❌ Morley-Minto is 1909 and Montagu-Chelmsford is 1919."
  },
  22: {
    questext: "Consider the Charter Act, 1833: (i) EIC became an administrative body only (ii) Bombay and Madras governors lost legislative powers (iii) Open competition for civil servants was introduced. Which are correct?",
    options: ["(i) only", "(i) and (ii) only", "(ii) and (iii) only", "(i), (ii) and (iii)"],
    correct: "2",
    exptext: "✅ (i) and (ii). ❌ Open competition was attempted but rejected in 1833; introduced in 1853."
  },
  23: {
    questext: "Under the Charter Act of 1833, new laws made by the Governor-General in Council were called:",
    options: ["Ordinances", "Regulations", "Orders", "Acts"],
    correct: "4",
    exptext: "✅ Acts. 📌 Old = Regulations, new = Acts. ❌ Regulations was the pre-1833 name."
  },
  24: {
    type: "concept", icon: "🏁", accent: "#3b82f6", pauseTimer: true,
    title: "Charter Act, 1853",
    html: `
      <p class="cp-lead">The <b>LAST Charter Act</b> passed by the British Parliament.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Legislative and Executive</td><td>Separated for the first time in the G-G's council</td></tr><tr><td>Legislative Councillors</td><td>6 added; Indian (Central) Legislative Council = mini-Parliament</td></tr><tr><td>Civil services</td><td>Open competition actually introduced this time</td></tr></tbody></table>
      <div class="cp-note trap">1833 = attempted but rejected; <b>1853 = actually introduced</b>.</div>
      <div class="cp-note exam">Last Charter Act; first separation of legislative and executive.</div>
    `
  },
  25: {
    questext: "Which was the LAST Charter Act passed by the British Parliament?",
    options: ["Charter Act 1793", "Charter Act 1813", "Charter Act 1853", "Charter Act 1833"],
    correct: "3",
    exptext: "✅ 1853. 📌 After it, Crown Rule began in 1858. ❌ Others are earlier Charter Acts."
  },
  26: {
    questext: "Legislative and executive functions of the Governor-General's council were first separated by:",
    options: ["Charter Act, 1853", "Regulating Act, 1773", "Charter Act, 1833", "Indian Councils Act, 1861"],
    correct: "1",
    exptext: "✅ Charter Act 1853. ❌ 1833 centralised power instead."
  },
  27: {
    questext: "The Charter Act of 1853 added how many Legislative Councillors, creating the Indian (Central) Legislative Council?",
    options: ["4", "6", "8", "12"],
    correct: "2",
    exptext: "✅ Six Legislative Councillors. 📌 Mini-Parliament. ❌ Other numbers are not in the Act."
  },
  28: {
    type: "concept", icon: "👑", accent: "#f97316", pauseTimer: true,
    title: "Government of India Act, 1858",
    html: `
      <p class="cp-lead">The "Act for the Better Government of India" — it <b>abolished the EIC</b> and transferred power to the British Crown.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Viceroy</td><td>Lord Canning = 1st Viceroy of India</td></tr><tr><td>Double Government</td><td>Board of Control + Court of Directors both abolished</td></tr><tr><td>Secretary of State for India</td><td>New post; member of the British Cabinet</td></tr><tr><td>Council of India</td><td>15 members, advisory to the Secretary of State</td></tr></tbody></table>
      <div class="cp-note trap"><b>Governor-General</b> (1833) and <b>Viceroy</b> (1858) are different firsts — Bentinck vs Canning.</div>
      <div class="cp-note exam">Start of Crown Rule.</div>
    `
  },
  29: {
    questext: "The Government of India Act, 1858 is called:",
    options: ["Montagu-Chelmsford Reforms", "Saint Helena Act", "Morley-Minto Reforms", "Act for the Better Government of India"],
    correct: "4",
    exptext: "✅ Act for the Better Government of India. ❌ Others are the 1919, 1833 and 1909 names."
  },
  30: {
    questext: "Which of the following was NOT done by the Government of India Act, 1858?",
    options: ["Abolished the East India Company", "Created a 15-member Council of India", "Introduced dyarchy in provinces", "Created the post of Viceroy"],
    correct: "3",
    exptext: "✅ Dyarchy came with the 1919 Act. ❌ The others were 1858 changes."
  },
  31: {
    questext: "Who was the first Viceroy of India?",
    options: ["Lord Canning", "Lord Dalhousie", "Lord Mayo", "Lord Minto"],
    correct: "1",
    exptext: "✅ Lord Canning. 📌 Canning = Crown. ❌ Lord Minto is linked with 1909."
  },
  32: {
    type: "concept", icon: "🗳️", accent: "#84cc16", pauseTimer: true,
    title: "Indian Councils Act, 1861",
    html: `
      <p class="cp-lead">The beginning of <u>representative institutions</u> — Indians were first associated with law-making.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Indians in law-making</td><td>1862: Lord Canning nominated Raja of Benares, Maharaja of Patiala, Sir Dinkar Rao</td></tr><tr><td>Decentralisation</td><td>Legislative powers restored to Bombay and Madras</td></tr><tr><td>New Legislative Councils</td><td>Bengal (1862), NW Provinces (1886), Punjab (1897)</td></tr><tr><td>Portfolio system</td><td>Recognised (introduced by Lord Canning in 1859)</td></tr><tr><td>Ordinance power</td><td>Viceroy can issue ordinances in emergency, valid for 6 months</td></tr></tbody></table>
      <div class="cp-note exam">Representative institutions, portfolio system and ordinance power are the favourite points.</div>
      <div class="cp-note trap">Ordinance validity is <b>6 months</b>.</div>
    `
  },
  33: {
    questext: "Which Act marked the beginning of representative institutions in India?",
    options: ["Charter Act, 1853", "Indian Councils Act, 1861", "Indian Councils Act, 1892", "Indian Councils Act, 1909"],
    correct: "2",
    exptext: "✅ Indian Councils Act 1861. 📌 Indians began to join law-making. ❌ Later Acts expanded this."
  },
  34: {
    questext: "In 1862, which of the following was nominated to the Legislative Council by Lord Canning?",
    options: ["Satyendra Prasad Sinha", "Dadabhai Naoroji", "Gopal Krishna Gokhale", "Raja of Benares"],
    correct: "4",
    exptext: "✅ Raja of Benares, with Maharaja of Patiala and Sir Dinkar Rao. ❌ Sinha joined the Executive Council in 1909."
  },
  35: {
    questext: "An ordinance issued by the Viceroy under the Indian Councils Act, 1861 was valid for:",
    options: ["3 months", "1 year", "6 months", "9 months"],
    correct: "3",
    exptext: "✅ 6 months. 📌 Emergency power. ❌ Other durations are not in the Act."
  },
  36: {
    type: "concept", icon: "🔍", accent: "#06b6d4", pauseTimer: true,
    title: "Indian Councils Act, 1892",
    html: `
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Increased powers</td><td>Councils could discuss the budget and ask questions to the executive</td></tr><tr><td>Limited indirect elections</td><td>For non-official seats, but the word "election" was NOT used — called "nomination on recommendation"</td></tr></tbody></table>
      <div class="cp-note trap">Elections existed in practice, but the Act never used the word <b>"election"</b>.</div>
      <div class="cp-note exam">Budget discussion and questions are the key powers.</div>
    `
  },
  37: {
    questext: "In the Indian Councils Act, 1892, non-official seats were filled by:",
    options: ["nomination on recommendation", "direct election", "communal electorate", "universal franchise"],
    correct: "1",
    exptext: "✅ Nomination on recommendation. 📌 No \"election\" word. ❌ Direct elections came in 1919."
  },
  38: {
    questext: "Which power was given to legislative councils by the Indian Councils Act, 1892?",
    options: ["Pass the budget", "Discuss the budget and ask questions", "Elect the Viceroy", "Control the executive"],
    correct: "2",
    exptext: "✅ Discuss the budget and ask questions. ❌ They could not pass or control the budget."
  },
  39: {
    type: "concept", icon: "🕌", accent: "#a855f7", pauseTimer: true,
    title: "Indian Councils Act, 1909 (Morley-Minto Reforms)",
    html: `
      <p class="cp-lead">Introduced the <u>separate (communal) electorate</u> for Muslims.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Indian in Exec Council</td><td>Satyendra Prasad Sinha = 1st Indian in the Viceroy's Executive Council (Law Member)</td></tr><tr><td>Separate electorate</td><td>For Muslims — Muslims elected only by Muslims</td></tr><tr><td>Lord Minto</td><td>Father of Communal Electorate</td></tr><tr><td>Other representation</td><td>Separate representation for presidency corporations, chambers of commerce, universities, zamindars</td></tr></tbody></table>
      <div class="cp-note trap">Separate electorate in 1909 was only for <b>Muslims</b>; others were added in 1919.</div>
      <div class="cp-note exam">Morley-Minto = Sinha + communal electorate.</div>
    `
  },
  40: {
    questext: "Who is known as the Father of the Communal Electorate?",
    options: ["Lord Morley", "Lord Curzon", "Lord Canning", "Lord Minto"],
    correct: "4",
    exptext: "✅ Lord Minto. 📌 Morley-Minto Reforms 1909. ❌ Lord Morley was Secretary of State."
  },
  41: {
    questext: "Who was the first Indian member of the Viceroy's Executive Council?",
    options: ["Raja of Benares", "Dinkar Rao", "Satyendra Prasad Sinha", "Gopal Krishna Gokhale"],
    correct: "3",
    exptext: "✅ Satyendra Prasad Sinha, as Law Member. ❌ Others were nominated to legislative councils or not in the Executive Council."
  },
  42: {
    questext: "The Indian Councils Act, 1909 granted a separate electorate to:",
    options: ["Muslims", "Sikhs", "Anglo-Indians", "Indian Christians"],
    correct: "1",
    exptext: "✅ Muslims. ❌ Sikhs, Indian Christians and Anglo-Indians got it in 1919."
  },
  43: {
    questext: "Which of the following is NOT a feature of the Indian Councils Act, 1909?",
    options: ["Separate electorate for Muslims", "Dyarchy in provinces", "Separate representation for zamindars and chambers of commerce", "First Indian in Viceroy's Executive Council"],
    correct: "2",
    exptext: "✅ Dyarchy came in 1919. ❌ The others are 1909 features."
  },
  44: {
    type: "concept", icon: "🧩", accent: "#e11d48", pauseTimer: true,
    title: "Government of India Act, 1919 (Montagu-Chelmsford Reforms)",
    html: `
      <p class="cp-lead">Came into force in <b>1921</b> and introduced <u>Dyarchy</u> in the provinces.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Dyarchy in provinces</td><td>Transferred subjects (ministers, responsible to council) + Reserved subjects (Governor, no responsibility)</td></tr><tr><td>Bicameralism FIRST TIME</td><td>Upper House (Council of State) + Lower House (Legislative Assembly)</td></tr><tr><td>Direct elections FIRST TIME</td><td>Introduced in India</td></tr><tr><td>Executive Council</td><td>3 of 6 Viceroy Executive Council members to be Indian</td></tr><tr><td>Communal electorate extended</td><td>Sikhs, Indian Christians, Anglo-Indians, Europeans</td></tr><tr><td>High Commissioner for India</td><td>New office in London</td></tr><tr><td>CPSC</td><td>Established 1926 for recruiting civil servants</td></tr><tr><td>Budgets</td><td>Provincial and Central budgets separated for the first time</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Historical_Background/3.png" alt="Dyarchy: Transferred and Reserved subjects" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">1919 = dyarchy in <b>provinces</b>; 1935 = dyarchy at the <b>Centre</b>.</div>
      <div class="cp-note exam">Many "firsts": bicameralism, direct elections and separate budgets.</div>
    `
  },
  45: {
    questext: "Dyarchy at the provincial level was introduced by:",
    options: ["Indian Councils Act, 1909", "Charter Act, 1853", "Government of India Act, 1935", "Government of India Act, 1919"],
    correct: "4",
    exptext: "✅ GOI Act 1919. 📌 Transferred + Reserved. ❌ 1935 abolished provincial dyarchy and brought it to the Centre."
  },
  46: {
    questext: "Which was introduced for the FIRST time by the Government of India Act, 1919?",
    options: ["Separate electorate for Muslims", "Open competition for civil services", "Direct elections and bicameralism at the Centre", "Federal Court"],
    correct: "3",
    exptext: "✅ Direct elections and a bicameral legislature. ❌ Muslims 1909, open competition 1853, Federal Court 1937."
  },
  47: {
    questext: "Under dyarchy, transferred subjects were administered by:",
    options: ["Ministers responsible to the Legislative Council", "Governor-General alone", "Secretary of State", "Court of Directors"],
    correct: "1",
    exptext: "✅ Ministers responsible to the council. 📌 Reserved subjects stayed with the Governor. ❌ Court of Directors was abolished in 1858."
  },
  48: {
    questext: "The Central Public Service Commission was established in:",
    options: ["1921", "1926", "1935", "1937"],
    correct: "2",
    exptext: "✅ 1926, for recruiting civil servants. ❌ 1935 and 1937 are linked with the later Act and Federal Court."
  },
  49: {
    type: "concept", icon: "🌐", accent: "#10b981", pauseTimer: true,
    title: "Government of India Act, 1935",
    html: `
      <p class="cp-lead">Dyarchy was removed from the provinces and introduced at the <b>Centre</b>.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Provincial autonomy</td><td>Dyarchy in provinces abolished; responsible govt effective 1937, stopped 1939</td></tr><tr><td>Dyarchy at Centre</td><td>Introduced</td></tr><tr><td>Bicameralism in 6 provinces</td><td>Bengal, Bombay, Madras, Bihar, Assam, UP</td></tr><tr><td>Communal electorate extended</td><td>Scheduled Castes, women, labour/workers</td></tr><tr><td>Franchise</td><td>About 10% of the population got the vote</td></tr><tr><td>RBI</td><td>Reserve Bank of India established</td></tr><tr><td>Public Service Commissions</td><td>Federal + Provincial + Joint PSC provided</td></tr><tr><td>Federal Court</td><td>Established 1937</td></tr></tbody></table>
      <div class="cp-note trap">Provincial autonomy took effect in <b>1937</b>, not 1935.</div>
      <div class="cp-note exam">RBI, Federal Court and Federal PSC all trace back to this Act.</div>
    `
  },
  50: {
    questext: "The Federal Court of India was established in:",
    options: ["1935", "1936", "1947", "1937"],
    correct: "4",
    exptext: "✅ 1937. 📌 Provided by the 1935 Act. ❌ 1935 is the year of the Act, not the court."
  },
  51: {
    questext: "Which institution was established under the Government of India Act, 1935?",
    options: ["Central Public Service Commission", "Supreme Court", "Reserve Bank of India", "Planning Commission"],
    correct: "3",
    exptext: "✅ Reserve Bank of India. ❌ CPSC came in 1926; Supreme Court and Planning Commission came much later."
  },
  52: {
    questext: "Provincial autonomy under the Government of India Act, 1935 became effective in:",
    options: ["1937", "1935", "1939", "1947"],
    correct: "1",
    exptext: "✅ 1937; it stopped in 1939. ❌ 1939 is when it ended."
  },
  53: {
    questext: "Which provinces got bicameral legislatures under the Government of India Act, 1935?",
    options: ["Bengal, Punjab, Madras, Bihar, Assam, UP", "Bengal, Bombay, Madras, Bihar, Assam, UP", "Bengal, Bombay, Madras, Punjab, Assam, UP", "Bengal, Bombay, Madras, Bihar, Orissa, UP"],
    correct: "2",
    exptext: "✅ Bengal, Bombay, Madras, Bihar, Assam, UP. ❌ Punjab and Orissa were not bicameral."
  },
  54: {
    type: "concept", icon: "🇮🇳", accent: "#eab308", pauseTimer: true,
    title: "Indian Independence Act, 1947",
    html: `
      <p class="cp-lead">On <b>20 Feb 1947</b> PM Clement Attlee declared that British rule would end by 30 June 1948.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Independence</td><td>India declared independent and sovereign from 15 August 1947</td></tr><tr><td>Two Dominions</td><td>India and Pakistan</td></tr><tr><td>Viceroy</td><td>Abolished; each dominion got a Governor-General appointed by the British King</td></tr><tr><td>Constituent Assemblies</td><td>Empowered to frame the constitution</td></tr><tr><td>Secretary of State</td><td>Abolished</td></tr><tr><td>Princely states</td><td>Free to join India or Pakistan or remain independent; British Paramountcy lapses</td></tr><tr><td>Governance</td><td>By GOI Act 1935 till a new constitution was framed</td></tr><tr><td>King's title</td><td>"Emperor of India" dropped</td></tr></tbody></table>
      <div class="cp-note trap">The <b>Viceroy</b> post was abolished, but the <b>Governor-General</b> post continued.</div>
      <div class="cp-note exam">Attlee's declaration, two dominions and lapse of paramountcy are commonly asked.</div>
    `
  },
  55: {
    questext: "Who declared on 20 Feb 1947 that British rule would end by 30 June 1948?",
    options: ["Mountbatten", "Cripps", "Wavell", "Attlee"],
    correct: "4",
    exptext: "✅ PM Clement Attlee. ❌ Mountbatten later advanced the date to 15 August 1947."
  },
  56: {
    questext: "Which of the following was abolished by the Indian Independence Act, 1947?",
    options: ["Governor-General", "Constituent Assembly", "Secretary of State for India", "Federal Court"],
    correct: "3",
    exptext: "✅ Secretary of State for India. 📌 Viceroy abolished too. ❌ Each dominion still got a Governor-General."
  },
  57: {
    questext: "What happened to British paramountcy over princely states under the Act of 1947?",
    options: ["It lapsed", "It passed to India", "It passed to Pakistan", "It passed to the Governor-General"],
    correct: "1",
    exptext: "✅ It lapsed. 📌 States were free to join India, Pakistan or stay independent. ❌ It was not transferred to any authority."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Historical_Background/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an old East India Company sailing ship, a rolled parchment scroll with a wax seal and a vintage brass compass" },
  "images/General_Awareness/Polity/Historical_Background/1.png": { t: "fig", about: "Simple horizontal timeline with two coloured bands: Company Rule 1773–1858 and Crown Rule 1858–1947, divider marked 1858. Small tick labels: 1773, 1784, 1793, 1813, 1833, 1853 | 1858, 1861, 1892, 1909, 1919, 1935, 1947." },
  "images/General_Awareness/Polity/Historical_Background/2.png": { t: "fig", about: "Two boxes joined to a central box: Board of Control labelled Political, Court of Directors labelled Commercial, centre labelled Double Government 1784." },
  "images/General_Awareness/Polity/Historical_Background/3.png": { t: "fig", about: "One province box splitting into two: Transferred (Ministers, responsible to Council) and Reserved (Governor, no responsibility); title Dyarchy 1919." }
});

/* CHANGE LOG
   - Reserved subjects under Dyarchy (GOI Act 1919) are administered by the Governor, not the Governor-General.
*/