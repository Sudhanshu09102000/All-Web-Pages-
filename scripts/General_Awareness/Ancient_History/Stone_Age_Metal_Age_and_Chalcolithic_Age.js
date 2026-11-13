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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Stone_Age_Metal_Age_and_Chalcolithic_Age · 6 concept pages (+ overview) · 25 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🪨", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Stone Age, Metal Age & Chalcolithic Age",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Stone_Age_Metal_Age_and_Chalcolithic_Age/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "ANCIENT INDIA",
      line2: "STONE AGE",
      line3: "CHALCOLITHIC",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Stone Age, Metal Age & Chalcolithic Age | Ancient India for SSC UPSC Railways",
      altTitles: ["Palaeolithic Mesolithic Neolithic Tricks | Ancient India", "Chalcolithic Cultures of India — Banas Malwa Jorwe Kayatha"],
      description: "Stone Age, Metal Age and Chalcolithic Age are high-scoring topics in every competitive exam. In this class we cover the three Stone Age periods, key sites, famous archaeologists and the four Chalcolithic cultures, with practice questions after every topic.\n\n📌 IN THIS CLASS\n✅ Palaeolithic sub-periods and tools\n✅ Mesolithic microliths and firsts\n✅ Neolithic sites: Mehrgarh, Burzahom, Koldihwa\n✅ Chalcolithic cultures: Banas, Kayatha, Malwa, Jorwe\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#AncientIndia #StoneAge #SSCCGL",
      tags: ["ancient india", "stone age", "stone age india", "palaeolithic age", "mesolithic age", "neolithic age", "chalcolithic age", "metal age", "ancient history for ssc", "ancient history upsc", "ancient history railways", "chalcolithic cultures", "banas culture", "malwa culture", "jorwe culture", "kayatha culture", "mehrgarh neolithic", "bhimbetka rock shelters", "microliths", "general awareness history", "history one shot", "ancient india mcq", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "Stone Age Metal Age and Ch"],
      hashtags: ["AncientIndia", "StoneAge", "Chalcolithic", "SSCCGL", "UPSC"],
      thumbText: "STONE AGE + CHALCOLITHIC",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🪨 New class is live: Stone Age, Metal Age & Chalcolithic Age. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 The Stone Age\n00:00 Palaeolithic Period\n00:00 Mesolithic Period\n00:00 Neolithic Period\n00:00 The Metal Age\n00:00 Chalcolithic Cultures",
      playlist: "Ancient India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on Ancient India's earliest ages</u> — from hunters with stone tools to farmers and copper users.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>6</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>25</b><span>Questions</span></div>
        <div class="cp-stat"><b>~37 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Stone Age</b><br>Division by tool type; Palaeo → Meso → Neo.</li>
        <li><b>Palaeolithic Period</b><br>Three sub-periods, tools, Foote and Bhimbetka.</li>
        <li><b>Mesolithic Period</b><br>Microliths, Carlyle and animal husbandry.</li>
        <li><b>Neolithic Period</b><br>Mehrgarh, farming and key sites.</li>
        <li><b>The Metal Age</b><br>Where Harappan and Vedic cultures begin.</li>
        <li><b>Chalcolithic Cultures</b><br>Banas, Kayatha, Malwa and Jorwe.</li>
        <li><b>Practice</b><br>Exam-level questions after every topic.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> names, places and 'firsts' from this chapter are asked almost every year in SSC, UPSC Prelims, Railways and Defence exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🪨", accent: "#0ea5e9", pauseTimer: true,
    title: "The Stone Age",
    html: `
      <p class="cp-lead">Prehistoric India is divided by one thing — the <b>type of stone tools</b> people used.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Stone_Age_Metal_Age_and_Chalcolithic_Age/1.png" alt="Timeline: Palaeolithic, Mesolithic, Neolithic, then Chalcolithic" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Period</th><th>Time span</th><th>Key feature</th></tr></thead><tbody><tr><td>Palaeolithic</td><td>early to 10,000 BC</td><td>Hunting, crude tools</td></tr><tr><td>Mesolithic</td><td>10,000–5500 BC</td><td>Tiny microliths</td></tr><tr><td>Neolithic</td><td>5500–3000 BC</td><td>Agriculture, animal husbandry</td></tr></tbody></table>
      <div class="cp-note exam">Palaeolithic has three sub-periods — <b>Lower</b> (early to 100,000 BC), <b>Middle</b> (100,000–40,000 BC), <b>Upper</b> (40,000–10,000 BC).</div>
      <div class="cp-note trap">Neolithic = farming begins. Chalcolithic = stone + copper. Do not mix the two.</div>
      <div class="cp-mnemonic"><b>Palaeo</b> = old, <b>Meso</b> = middle, <b>Neo</b> = new — the order never changes.</div>
    `
  },
  3: {
    questext: "The division of prehistoric India into Palaeolithic, Mesolithic and Neolithic is based mainly on —",
    options: ["Type of stone tools", "Type of pottery", "Type of burial", "Type of dwellings"],
    correct: "1",
    exptext: "✅ Stone-tool types decide the division. 📌 Palaeo, Meso, Neo = old, middle, new stone. ❌ Pottery starts only in the Neolithic."
  },
  4: {
    questext: "Which of the following is correctly matched?",
    options: ["Mesolithic — 5500–3000 BC", "Neolithic — 10,000–5500 BC", "Neolithic — 5500–3000 BC", "Palaeolithic — 10,000–5500 BC"],
    correct: "3",
    exptext: "✅ Neolithic = 5500–3000 BC. 📌 Neo is the youngest of the three Stone Age periods. ❌ 10,000–5500 BC is the Mesolithic span."
  },
  5: {
    questext: "Which of the following is NOT a sub-period of the Palaeolithic Age?",
    options: ["Lower Palaeolithic", "Middle Palaeolithic", "Upper Palaeolithic", "Mesolithic"],
    correct: "4",
    exptext: "✅ Mesolithic is a separate period. 📌 Palaeolithic splits only into Lower, Middle and Upper. ❌ Upper is the last sub-period, 40,000–10,000 BC."
  },
  6: {
    questext: "Which is the correct order from oldest to newest?",
    options: ["Neolithic → Mesolithic → Palaeolithic → Chalcolithic", "Palaeolithic → Mesolithic → Neolithic → Chalcolithic", "Palaeolithic → Neolithic → Mesolithic → Chalcolithic", "Mesolithic → Palaeolithic → Neolithic → Chalcolithic"],
    correct: "2",
    exptext: "✅ Palaeolithic → Mesolithic → Neolithic → Chalcolithic. 📌 Old, middle, new stone, then copper. ❌ Mesolithic comes before Neolithic, as farming begins later."
  },
  7: {
    type: "concept", icon: "🏹", accent: "#22c55e", pauseTimer: true,
    title: "Palaeolithic Period",
    html: `
      <p class="cp-lead">The earliest and longest phase — hunter-gatherers near the <b>Sohan, Belan and Narmada</b> valleys and in painted rock shelters called <b>‘Bhimbetka’</b> near Bhopal.</p>
      <table><thead><tr><th>Sub-period</th><th>Time span</th><th>Main tools (culture)</th><th>Key sites</th></tr></thead><tbody><tr><td>Lower</td><td>early to 100,000 BC</td><td>Pebbles, choppers, chopping tools (Sohan culture)</td><td>Sohan valley — a small tributary of the Indus</td></tr><tr><td>Middle</td><td>100,000–40,000 BC</td><td>Core, flake and blade tools of quartzite (Flake culture)</td><td>Nevasa, Chakia, Varanasi, Belan Valley, Bhimbetka</td></tr><tr><td>Upper</td><td>40,000–10,000 BC</td><td><b>Blade</b> — the main tool</td><td>Son Valley, Baghor, Inamgaon, Renigunta, Kurnool caves, Old Pushkar</td></tr></tbody></table>
      <div class="cp-note exam"><b>Robert Bruce Foote</b> — ‘Father of Indian Prehistory’ — found India's first Palaeolithic hand axe at <b>Pallavaram (Madras), 1863</b>. <b>V. S. Wakankar</b> discovered Bhimbetka, a UNESCO World Heritage Site since <b>2003</b>.</div>
      <div class="cp-note trap"><b>Sohan</b> = Lower · <b>Flake</b> = Middle · <b>Blade</b> = Upper. Microliths belong to the Mesolithic.</div>
    `
  },
  8: {
    questext: "Who is known as the ‘Father of Indian Prehistory’?",
    options: ["A. C. Carlyle", "V. S. Wakankar", "Robert Bruce Foote", "John Lubbock"],
    correct: "3",
    exptext: "✅ Foote found India's first Palaeolithic hand axe at Pallavaram (Madras), 1863. 📌 Foote = Father. ❌ Carlyle is linked with microliths."
  },
  9: {
    questext: "The Bhimbetka painted rock shelters near Bhopal were discovered by and declared a UNESCO World Heritage Site in —",
    options: ["V. S. Wakankar; 2003", "V. S. Wakankar; 1993", "Robert Bruce Foote; 2003", "A. C. Carlyle; 1993"],
    correct: "1",
    exptext: "✅ Wakankar discovered them; UNESCO status came in 2003. 📌 Bhimbetka = Wakankar = 2003. ❌ Foote is the hand-axe pioneer, not Bhimbetka."
  },
  10: {
    questext: "What was the main tool of the Upper Palaeolithic period?",
    options: ["Chopper", "Flake", "Microlith", "Blade"],
    correct: "4",
    exptext: "✅ Blade was the main Upper Palaeolithic tool. 📌 Blade = Upper; Flake = Middle. ❌ Microliths belong to the Mesolithic."
  },
  11: {
    questext: "‘Sohan culture’ and ‘Flake culture’ belong respectively to —",
    options: ["Lower and Upper Palaeolithic", "Lower and Middle Palaeolithic", "Middle and Upper Palaeolithic", "Middle and Lower Palaeolithic"],
    correct: "2",
    exptext: "✅ Sohan = Lower; Flake = Middle. 📌 Sohan valley tools gave the Lower stage its name. ❌ Reversing the pair swaps chopping tools and flakes."
  },
  12: {
    questext: "Which of the following statements is NOT correct?",
    options: ["Sohan valley tools gave the Lower Palaeolithic its culture name", "Quartzite was used for Middle Palaeolithic tools", "Microliths were the main tool of the Upper Palaeolithic", "Bhimbetka painted shelters are near Bhopal"],
    correct: "3",
    exptext: "✅ Microliths mark the Mesolithic. 📌 Upper Palaeolithic = blade. ❌ The Sohan, quartzite and Bhimbetka statements are all true."
  },
  13: {
    type: "concept", icon: "🔬", accent: "#f59e0b", pauseTimer: true,
    title: "Mesolithic Period",
    html: `
      <p class="cp-lead">A <b>transitional period</b> between the Palaeolithic and Neolithic ages — tools turned tiny and are called <b>‘microliths’</b>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Time span</td><td>10,000–5500 BC</td></tr><tr><td>Main centres</td><td>Betwa Valley, Son Valley (MP), Krishna Valley (Karnataka), Belan Valley (UP), Nevasa (Maharashtra)</td></tr></tbody></table>
      <table><thead><tr><th>Mesolithic firsts</th><th>Detail</th></tr></thead><tbody><tr><td>Microliths first discovered</td><td>A. C. Carlyle (1867, Vindhya region)</td></tr><tr><td>Evidence of animal husbandry</td><td>Adamgarh (MP) and Bagor (Rajasthan)</td></tr><tr><td>First animal domesticated</td><td>Dog</td></tr><tr><td>Earliest human skeleton remains</td><td>Sarai Nahar Rai and Mahadaha (Pratapgarh, UP)</td></tr></tbody></table>
      <div class="cp-note trap">Adamgarh and Bagor show <i>animal rearing</i>, not farming. Farming starts only in the Neolithic.</div>
      <div class="cp-mnemonic"><b>Micro</b>liths = <b>M</b>esolithic — tiny tools for the middle age.</div>
    `
  },
  14: {
    questext: "In 1867, microliths were first discovered in the Vindhya region of India by —",
    options: ["V. S. Wakankar", "A. C. Carlyle", "Robert Bruce Foote", "V. Gordon Childe"],
    correct: "2",
    exptext: "✅ Carlyle, 1867, Vindhya region. 📌 Carlyle = microliths; Foote = hand axe. ❌ Wakankar found Bhimbetka shelters, not microliths."
  },
  15: {
    questext: "Which was the first animal to be domesticated?",
    options: ["Dog", "Goat", "Cattle", "Sheep"],
    correct: "1",
    exptext: "✅ The dog was the first animal domesticated. 📌 Dog first, then wider animal husbandry. ❌ Goat, cattle and sheep came later."
  },
  16: {
    questext: "Evidence of animal husbandry in the Mesolithic period comes from —",
    options: ["Burzahom and Gufkral", "Koldihwa and Chirand", "Adamgarh and Bagor", "Ahar and Gilund"],
    correct: "3",
    exptext: "✅ Adamgarh (MP) and Bagor (Rajasthan) show Mesolithic animal husbandry. 📌 A and B = Animals. ❌ Burzahom and Gufkral are Neolithic pit-dwelling sites."
  },
  17: {
    questext: "The earliest human skeleton remains in India have been found at —",
    options: ["Bagor and Adamgarh", "Mehrgarh and Burzahom", "Chirand and Koldihwa", "Sarai Nahar Rai and Mahadaha"],
    correct: "4",
    exptext: "✅ Sarai Nahar Rai and Mahadaha, Pratapgarh (UP). 📌 Earliest skeletons = Pratapgarh. ❌ Chirand is famous for bone tools."
  },
  18: {
    type: "concept", icon: "🌾", accent: "#ef4444", pauseTimer: true,
    title: "Neolithic Period",
    html: `
      <p class="cp-lead"><b>Farming begins.</b> People shift from food-gatherers to food-producers, make <b>polished stone tools</b> such as the <b>celt</b>, and start <b>hand-made pottery</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Stone_Age_Metal_Age_and_Chalcolithic_Age/2.png" alt="Schematic of key Neolithic sites by region" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>‘Neolithic’ coined by</td><td>John Lubbock</td></tr><tr><td>‘Neolithic Revolution’</td><td>V. Gordon Childe — beginning of agriculture</td></tr><tr><td>Oldest settlement</td><td>Mehrgarh (Balochistan, Pakistan, near Bolan Pass) — excavated 1974 by Jean-François Jarrige and Catherine Jarrige</td></tr><tr><td>Main centres</td><td>Belan Valley (UP), Renigunta (AP), Son Valley (MP), Singhbhum (Jharkhand)</td></tr></tbody></table>
      <table><thead><tr><th>Site</th><th>Region</th><th>Known for</th></tr></thead><tbody><tr><td>Burzahom</td><td>Kashmir</td><td>Pit dwellings; human + dog buried together</td></tr><tr><td>Gufkral</td><td>Kashmir</td><td>Pit dwellings; human + goat burial</td></tr><tr><td>Koldihwa</td><td>Allahabad (UP)</td><td>Oldest evidence of rice (Lahuradewa, UP, also early)</td></tr><tr><td>Chirand</td><td>Bihar</td><td>Large number of bone tools</td></tr><tr><td>Daojali Hading</td><td>Assam</td><td>Green stone jadeite</td></tr><tr><td>Paiyampalli, Hallur, Sanganakallu</td><td>Tamil Nadu, Karnataka</td><td>Ash mounds; stone-tool workshop</td></tr></tbody></table>
      <div class="cp-note trap">Mehrgarh is in <b>Pakistan</b> (Balochistan), not India.</div>
    `
  },
  19: {
    questext: "The term ‘Neolithic’ was coined by ___, while the beginning of agriculture was called the ‘Neolithic Revolution’ by ___.",
    options: ["John Lubbock; V. Gordon Childe", "V. Gordon Childe; John Lubbock", "A. C. Carlyle; V. Gordon Childe", "Robert Bruce Foote; John Lubbock"],
    correct: "1",
    exptext: "✅ Lubbock named the age; Childe called farming's start a revolution. 📌 Lubbock names, Childe revolutionises. ❌ Reversing them swaps the two scholars."
  },
  20: {
    questext: "Mehrgarh, the oldest Neolithic settlement, lies near which pass and who excavated it in 1974?",
    options: ["Khyber Pass; R. B. Foote", "Bolan Pass; V. S. Wakankar", "Khyber Pass; Jean-François Jarrige", "Bolan Pass; Jean-François Jarrige"],
    correct: "4",
    exptext: "✅ Mehrgarh lies near the Bolan Pass; Jarrige excavated it in 1974. 📌 Bolan + Jarrige. ❌ Wakankar excavated Kayatha, not Mehrgarh."
  },
  21: {
    questext: "Which site is correctly matched with its Neolithic evidence?",
    options: ["Koldihwa — bone tools", "Chirand — oldest evidence of rice", "Daojali Hading — jadeite", "Burzahom — ash mounds"],
    correct: "3",
    exptext: "✅ Daojali Hading (Assam) gives green stone jadeite. 📌 Koldihwa = rice; Chirand = bone tools. ❌ Options 1 and 2 swap the two; Burzahom is known for dog burial."
  },
  22: {
    questext: "Which Neolithic site in Kashmir has a burial of a human and a dog together?",
    options: ["Gufkral", "Burzahom", "Chirand", "Paiyampalli"],
    correct: "2",
    exptext: "✅ Burzahom shows a human and dog buried together. 📌 Burzahom = dog; Gufkral = goat. ❌ Gufkral has a human and goat burial."
  },
  23: {
    questext: "Which of the following is NOT a feature of the Neolithic period?",
    options: ["Copper as the first metal", "Polished stone tools like the celt", "Hand-made pottery", "Agriculture and animal husbandry"],
    correct: "1",
    exptext: "✅ Copper use belongs to the Chalcolithic. 📌 Neolithic = farming, celt, pottery. ❌ Celts, hand-made pottery and farming are all Neolithic."
  },
  24: {
    type: "concept", icon: "⚒️", accent: "#8b5cf6", pauseTimer: true,
    title: "The Metal Age",
    html: `
      <p class="cp-lead">After the Stone Age ended, the <b>Age of Metals</b> began.</p>
      <table><thead><tr><th>Culture</th><th>Link to the Metal Age</th></tr></thead><tbody><tr><td>Harappan culture</td><td>Counted from this period</td></tr><tr><td>Vedic culture</td><td>Counted from this period</td></tr></tbody></table>
      <div class="cp-note remember">Metals first appear as <b>copper</b> (Chalcolithic); <b>iron</b> comes later.</div>
    `
  },
  25: {
    questext: "Which two cultures are counted from the Metal Age?",
    options: ["Mehrgarh and Burzahom", "Burzahom and Koldihwa", "Chirand and Daojali Hading", "Harappan and Vedic"],
    correct: "4",
    exptext: "✅ Harappan and Vedic cultures are counted from the Metal Age. 📌 Metals follow the Stone Age. ❌ Burzahom, Mehrgarh and Chirand are Neolithic sites."
  },
  26: {
    type: "concept", icon: "🪙", accent: "#14b8a6", pauseTimer: true,
    title: "Chalcolithic Cultures",
    html: `
      <p class="cp-lead">Man used <b>stone + copper</b> tools — hence ‘Chalcolithic’. Copper (around 5000 BC) was the first metal used, and these cultures were <b>agricultural and rural</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Stone_Age_Metal_Age_and_Chalcolithic_Age/3.png" alt="Schematic of four Chalcolithic cultures" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Culture</th><th>Region</th><th>Period</th><th>Major sites</th><th>Special points</th></tr></thead><tbody><tr><td>Banas / Ahar</td><td>Rajasthan</td><td>c. 2800–1500 BC</td><td>Ahar, Balathal, Gilund</td><td>Ahar is also called ‘Tambavati’ (Place of Copper)</td></tr><tr><td>Kayatha</td><td>Madhya Pradesh</td><td>c. 2000–1800 BC</td><td>Kayatha, Eran</td><td>Excavated by V. S. Wakankar (1964)</td></tr><tr><td>Malwa</td><td>Madhya Pradesh</td><td>c. 1700–1200 BC</td><td>Navdatoli, Eran</td><td>Excellent pottery; varied crops at Navdatoli</td></tr><tr><td>Jorwe</td><td>Maharashtra</td><td>c. 1400–700 BC</td><td>Jorwe, Nevasa, Daimabad, Inamgaon</td><td>Daimabad is the largest site; spread over Maharashtra except the Konkan coast</td></tr></tbody></table>
      <div class="cp-note trap">Burial — an adult was buried after <b>cutting off the lower part of the leg</b>, so he could not become a ghost. Extinction came from <b>very less rainfall / drought</b>.</div>
      <div class="cp-note remember">The Chalcolithic Age was followed by the <b>Iron Age</b>; iron is frequently mentioned in the Vedas.</div>
    `
  },
  27: {
    questext: "Why is the period called ‘Chalcolithic’?",
    options: ["Man used stone and bronze", "Man used stone and copper", "Man used copper and iron", "Man used stone and iron"],
    correct: "2",
    exptext: "✅ Chalco means copper; lithic means stone. 📌 Stone + copper = Chalcolithic. ❌ Iron came later, in the Iron Age."
  },
  28: {
    questext: "Ahar in Rajasthan is also called ‘Tambavati’, meaning —",
    options: ["Place of Pottery", "Place of Rivers", "Place of Gold", "Place of Copper"],
    correct: "4",
    exptext: "✅ Tamba means copper, so Ahar is the ‘Place of Copper’. 📌 Ahar belongs to the Banas culture. ❌ Gold and pottery are not its meaning."
  },
  29: {
    questext: "Which is the largest site of the Jorwe culture?",
    options: ["Inamgaon", "Daimabad", "Nevasa", "Jorwe"],
    correct: "2",
    exptext: "✅ Daimabad is the largest Jorwe site. 📌 Jorwe covered Maharashtra except the Konkan coast. ❌ Nevasa and Inamgaon are Jorwe sites, but not the largest."
  },
  30: {
    questext: "Which Chalcolithic culture is known for excellent pottery and for crop evidence at Navdatoli?",
    options: ["Malwa culture", "Jorwe culture", "Banas culture", "Kayatha culture"],
    correct: "1",
    exptext: "✅ Malwa pottery was excellent; Navdatoli shows many crops. 📌 Navdatoli = crops. ❌ Jorwe is known for Daimabad, not Navdatoli."
  },
  31: {
    questext: "The Kayatha culture was excavated in 1964 by —",
    options: ["Jean-François Jarrige", "A. C. Carlyle", "V. S. Wakankar", "Robert Bruce Foote"],
    correct: "3",
    exptext: "✅ Wakankar excavated Kayatha in 1964. 📌 Wakankar also discovered Bhimbetka. ❌ Jarrige excavated Mehrgarh."
  },
  32: {
    questext: "Which statement about the Chalcolithic Age is NOT correct?",
    options: ["Its cultures were agricultural and rural", "Copper was the first metal used", "Very less rainfall led to the extinction of its cultures", "The Iron Age came before it"],
    correct: "4",
    exptext: "✅ The Iron Age followed the Chalcolithic. 📌 Chalcolithic → Iron Age; the Vedas mention iron often. ❌ The other three statements are true."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Stone_Age_Metal_Age_and_Chalcolithic_Age/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a rough hand axe and flint blades, a small painted rock-shelter panel, and a copper-coloured axe head" },
  "images/General_Awareness/Ancient_India/Stone_Age_Metal_Age_and_Chalcolithic_Age/1.png": { t: "fig", about: "Horizontal timeline of three bars: Palaeolithic (up to 10,000 BC), Mesolithic (10,000–5500 BC, microliths), Neolithic (5500–3000 BC, agriculture), followed by an arrow labelled Chalcolithic (stone + copper)." },
  "images/General_Awareness/Ancient_India/Stone_Age_Metal_Age_and_Chalcolithic_Age/2.png": { t: "fig", about: "Schematic, not a map: four boxes — Kashmir (Burzahom: human + dog, Gufkral: human + goat), UP/Bihar (Koldihwa: rice, Chirand: bone tools), Assam (Daojali Hading: jadeite), South India (Hallur, Sanganakallu, Paiyampalli: ash mounds)." },
  "images/General_Awareness/Ancient_India/Stone_Age_Metal_Age_and_Chalcolithic_Age/3.png": { t: "fig", about: "Schematic, not a map: four boxes — Banas/Ahar (Rajasthan, Tambavati), Kayatha (MP, Wakankar 1964), Malwa (MP, Navdatoli, pottery), Jorwe (Maharashtra, Daimabad largest)." }
});

/* CHANGE LOG
   - Kayatha culture period written as c. 2000–1800 BC (the book's c. 1700–1200 BC overlaps Malwa culture).
   - Spelling corrected: Kayitha → Kayatha; Mahadha → Mahadaha (Pratapgarh).
   - Malwa culture sites listed as Navdatoli and Eran (Kayatha belongs to the separate Kayatha culture).
   - Lower Palaeolithic span written as 'early to 100,000 BC' for a clean sequence with Middle and Upper.
*/
