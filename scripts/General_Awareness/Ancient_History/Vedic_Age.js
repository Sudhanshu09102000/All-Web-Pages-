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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Vedic_Age · 11 concept pages (+ overview) · 41 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🔥", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Vedic Age",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Vedic_Age/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "ANCIENT INDIA",
      line2: "VEDIC AGE",
      line3: "RIG & LATER VEDIC",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Vedic Age One Shot | Rigvedic & Later Vedic Period Tricks | SSC UPSC Railways",
      altTitles: ["Rigvedic Rivers, Officers and Assemblies Trick | Ancient India", "Six Indian Philosophies and Founders Trick | Vedic Age"],
      description: "The Vedic Age is a regular scorer in SSC, UPSC, Railways, Banking and Defence exams. In this class we cover the Aryan homeland theories, ancient and modern river names, political and social life, the eight types of marriage, the six philosophies and the major yagnas, with practice questions after every topic.\n\n📌 IN THIS CLASS\n✅ Aryan homeland theories\n✅ Rigvedic vs Later Vedic changes\n✅ Sabha, Samiti and the administrative ladder\n✅ Philosophies and yagnas\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#VedicAge #AncientIndia #SSCCGL",
      tags: ["vedic age", "vedic period", "rigvedic period", "later vedic period", "ancient india", "ancient history for ssc", "ancient history upsc", "ancient history railways", "aryan homeland theories", "rigvedic rivers", "sabha and samiti", "eight types of marriage", "indian philosophies founders", "vedic yagnas", "ashvamedha rajasuya", "vedic vs harappan", "general awareness history", "history one shot", "ancient india mcq", "rigveda", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "Vedic Age Ancient_India Ve"],
      hashtags: ["VedicAge", "AncientIndia", "Rigveda", "SSCCGL", "UPSC"],
      thumbText: "VEDIC AGE COMPLETE",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🔥 New class is live: Vedic Age. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Arrival of the Aryans\n00:00 Rig Vedic Age\n00:00 Political Organization\n00:00 Social Life\n00:00 Economic Conditions\n00:00 Religious Life\n00:00 Later Vedic Period\n00:00 Eight Types of Marriage\n00:00 Vedic Aryans vs Indus Valley\n00:00 Major Philosophies\n00:00 Major Yagnas",
      playlist: "Ancient India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on the Vedic Age</u> — the Aryans' arrival, Rigvedic and Later Vedic life, marriages, philosophies and yagnas.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>11</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>41</b><span>Questions</span></div>
        <div class="cp-stat"><b>~63 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Arrival of the Aryans</b><br>Homeland theories and ancient river names.</li>
        <li><b>Rig Vedic Age (Early Vedic Period)</b><br>Saptasindhu, geography and the Bogazkoi inscription.</li>
        <li><b>Political Organization &amp; Administration</b><br>Rajan, Sabha, Samiti and the Kula-to-Janapada ladder.</li>
        <li><b>Social Life (Rigvedic)</b><br>Varnas, women, food and education.</li>
        <li><b>Economic Conditions</b><br>Cattle, barter and Aghanya.</li>
        <li><b>Religious Life (Rigvedic)</b><br>Indra, Agni and Soma.</li>
        <li><b>Later Vedic Period (1000–600 BCE)</b><br>Iron, Varna, Ashramas and new gods.</li>
        <li><b>Eight Types of Marriage (Manu Smriti)</b><br>Four approved, four condemned.</li>
        <li><b>Vedic Aryans vs. Indus Valley Civilization</b><br>Point-by-point contrast.</li>
        <li><b>Major Philosophies &amp; Their Promoters</b><br>Six schools and their founders.</li>
        <li><b>Major Yagnas</b><br>Ashvamedha, Rajasuya, Vajpeya and more.</li>
        <li><b>Practice</b><br>Exam-level questions after every topic.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> river names, officers, assemblies, philosophers and yagnas from this chapter are repeated in SSC, Railways, UPSC Prelims and Defence papers.</div>
    `
  },
  2: {
    type: "concept", icon: "🧭", accent: "#0ea5e9", pauseTimer: true,
    title: "Arrival of the Aryans",
    html: `
      <p class="cp-lead">Harappan cities declined by <b>1500 BCE</b>; around then the <b>Aryans</b> entered north-west India, probably from the <b>Indo-Iran region</b>.</p>
      <table><thead><tr><th>Scholar</th><th>Original homeland</th></tr></thead><tbody><tr><td>Max Muller</td><td>Central Asia (Bactria)</td></tr><tr><td>Bal Gangadhar Tilak</td><td>North Pole</td></tr><tr><td>Abinash Chandra Das</td><td>Sapta Saindhava Pradesh</td></tr><tr><td>Dayanand Saraswati</td><td>Tibet</td></tr><tr><td>Nehring and Gordon Childe</td><td>South Russia</td></tr><tr><td>Ganganath Jha</td><td>Brahmarshi Desh</td></tr><tr><td>Giles</td><td>Hungary or Danube River Valley</td></tr><tr><td>Prof. Penka</td><td>Plains of Germany</td></tr></tbody></table>
      <table><thead><tr><th>Ancient name</th><th>Modern name</th></tr></thead><tbody><tr><td>Parushni</td><td>Ravi</td></tr><tr><td>Askini</td><td>Chenab</td></tr><tr><td>Vipasa</td><td>Beas</td></tr><tr><td>Shutudri</td><td>Sutlej</td></tr><tr><td>Vitasta</td><td>Jhelum</td></tr><tr><td>Sindhu</td><td>Indus</td></tr><tr><td>Gomti</td><td>Gomal</td></tr><tr><td>Kumbha</td><td>Kabul</td></tr><tr><td>Sadanira</td><td>Gandak</td></tr><tr><td>Kumu</td><td>Kurram</td></tr></tbody></table>
      <div class="cp-note remember"><b>1500–600 BCE</b> = Early (Rig) Vedic <b>1500–1000 BCE</b> + Later Vedic <b>1000–600 BCE</b>. Most scholars agree with Max Muller — <b>Central Asia</b>.</div>
      <div class="cp-mnemonic"><b>M</b>ax Muller = <b>M</b>iddle of Asia; <b>T</b>ilak = <b>T</b>op of the world (North Pole).</div>
    `
  },
  3: {
    questext: "The Early (Rig) Vedic Period is dated —",
    options: ["1500–1000 BCE", "1000–600 BCE", "2500–1750 BCE", "600–300 BCE"],
    correct: "1",
    exptext: "✅ 1500–1000 BCE. 📌 Rig = 1500–1000; Later = 1000–600. ❌ 1000–600 BCE is the Later Vedic Period."
  },
  4: {
    questext: "Who proposed the North Pole as the original home of the Aryans?",
    options: ["Max Muller", "Dayanand Saraswati", "Bal Gangadhar Tilak", "Prof. Penka"],
    correct: "3",
    exptext: "✅ Bal Gangadhar Tilak. 📌 Tilak = Top of the world. ❌ Max Muller proposed Central Asia."
  },
  5: {
    questext: "Which scholar is correctly matched with the Aryan homeland he proposed?",
    options: ["Max Muller — Tibet", "Dayanand Saraswati — Plains of Germany", "Bal Gangadhar Tilak — Central Asia", "Prof. Penka — Plains of Germany"],
    correct: "4",
    exptext: "✅ Penka proposed the Plains of Germany. 📌 Dayanand = Tibet; Muller = Central Asia. ❌ Options 1 to 3 swap scholars and homelands."
  },
  6: {
    questext: "The Rigvedic river ‘Parushni’ is the modern —",
    options: ["Jhelum", "Ravi", "Beas", "Chenab"],
    correct: "2",
    exptext: "✅ Parushni = Ravi. 📌 Vitasta = Jhelum; Askini = Chenab; Vipasa = Beas. ❌ Jhelum is the ancient Vitasta."
  },
  7: {
    questext: "Which ancient river name is correctly matched with its modern name?",
    options: ["Vitasta — Jhelum", "Askini — Beas", "Vipasa — Sutlej", "Shutudri — Chenab"],
    correct: "1",
    exptext: "✅ Vitasta = Jhelum. 📌 Askini = Chenab; Vipasa = Beas; Shutudri = Sutlej. ❌ Options 2 to 4 swap the rivers."
  },
  8: {
    type: "concept", icon: "📜", accent: "#22c55e", pauseTimer: true,
    title: "Rig Vedic Age (Early Vedic Period)",
    html: `
      <p class="cp-lead">‘<b>Saptasindhu</b>’ = the <b>land of seven rivers</b> — five Punjab rivers (Vitasta, Askini, Parushni, Vipasa, Shutudri) plus the <b>Sindhu</b> and the <b>Saraswati</b>. The <b>Rigveda Samhita</b> is the only literary source; society was rural, animal husbandry primary.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Vedic_Age/1.png" alt="Schematic of the seven rivers" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Region</th><th>Meaning</th></tr></thead><tbody><tr><td>Brahmavarta</td><td>Between the Saraswati and Drishadvati — the centre of Rigvedic civilization</td></tr><tr><td>Brahmarshi Desh</td><td>The Ganga–Yamuna Doab</td></tr><tr><td>Aryavarta</td><td>Entire North India</td></tr></tbody></table>
      <div class="cp-note exam"><b>Bogazkoi inscription (1400 BC)</b> names Indra, Varun, Mitra and Nasatya — so the Aryans are held to have come through <b>Iran</b>. Much of the Rigveda resembles the oldest Iranian text, the <b>Avesta</b>.</div>
      <div class="cp-note remember">Most <b>important</b> river <b>Sindhu</b>; most <b>sacred</b> <b>Saraswati</b> (‘Devitama’, ‘Matetama’, ‘Nadeetama’). The Himalaya and its peak ‘Mujvant’ appear in the Rigveda.</div>
    `
  },
  9: {
    questext: "‘Saptasindhu’ means —",
    options: ["Land of seven hills", "Land of seven rivers", "Land of seven seas", "Land of seven sages"],
    correct: "2",
    exptext: "✅ Land of seven rivers. 📌 Sapta = seven; Sindhu = river. ❌ Hills, seas and sages are not meant."
  },
  10: {
    questext: "The Bogazkoi inscription (1400 BC) suggests that the Vedic Aryans came to India through —",
    options: ["Tibet", "Southern Russia", "Iran", "Arabia"],
    correct: "3",
    exptext: "✅ Iran, as it names Indra, Varun, Mitra and Nasatya. 📌 Bogazkoi → Iran, like the Avesta. ❌ Tibet is Dayanand's homeland, not a route."
  },
  11: {
    questext: "Which river was the most sacred in the Rigveda?",
    options: ["Sindhu", "Ganga", "Yamuna", "Saraswati"],
    correct: "4",
    exptext: "✅ Saraswati, called ‘Nadeetama’. 📌 Sindhu = most important; Saraswati = most sacred. ❌ Sindhu is the most important, not the most sacred."
  },
  12: {
    questext: "The only literary source for the Rigvedic period is the —",
    options: ["Rigveda Samhita", "Shatapatha Brahmana", "Aitareya Brahmana", "Avesta"],
    correct: "1",
    exptext: "✅ Rigveda Samhita. 📌 Brahmanas belong to the Later Vedic period. ❌ The Avesta is an Iranian text."
  },
  13: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "Political Organization & Administration",
    html: `
      <p class="cp-lead">A <b>clan (kabila)</b> society: the whole village joined the wars and kingship was <b>hereditary</b>; the king was to be ‘<b>Indra</b>’ in valour, ‘<b>Mitra</b>’ in kindness, ‘<b>Varuna</b>’ in virtues.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Vedic_Age/2.png" alt="Administrative ladder from Kula to Janapada" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Officer</th><th>Role</th></tr></thead><tbody><tr><td>Rajan</td><td>Tribal chief at the centre</td></tr><tr><td>Purohita</td><td>Priest — the <b>most important</b> officer</td></tr><tr><td>Senani</td><td>General</td></tr><tr><td>Gramani</td><td>Village headman</td></tr><tr><td>Spash</td><td>Spies</td></tr><tr><td>Vrajapati</td><td>Officer of a large land or pasture</td></tr></tbody></table>
      <table><thead><tr><th>Unit</th><th>Meaning</th><th>Head</th></tr></thead><tbody><tr><td>Kula</td><td>Patriarchal family — lowest unit</td><td>Grihapati</td></tr><tr><td>Grama</td><td>Several families</td><td>Gramani</td></tr><tr><td>Vis</td><td>Several villages</td><td>Visapati (military leader)</td></tr><tr><td>Jana</td><td>Group of Vishes (tribe)</td><td>Gopa</td></tr><tr><td>Janapada</td><td>Several janas — the kingdom</td><td>Rajan</td></tr></tbody></table>
      <div class="cp-note exam"><b>Sabha</b> — elders, advisory, also a court of law (head Sabhapati). <b>Samiti</b> — the most popular assembly, political business, <b>elected the king</b> (head Pati).</div>
      <div class="cp-note remember">Army — Patti (infantry), Rathins (chariot warriors); units Sardha, Vrata, Gana. Tribal kingdoms — <b>Bharatas, Matsyas, Yadus, Purus</b>.</div>
    `
  },
  14: {
    questext: "The most important officer of the Rigvedic king was the —",
    options: ["Senani", "Gramani", "Spash", "Purohita"],
    correct: "4",
    exptext: "✅ The Purohita, the priest. 📌 Purohita = chief adviser. ❌ Senani was only the general."
  },
  15: {
    questext: "Which Rigvedic assembly was the most popular and elected the king?",
    options: ["Sabha", "Samiti", "Gana", "Sardha"],
    correct: "2",
    exptext: "✅ Samiti, headed by the Pati. 📌 Samiti = Selects the king. ❌ Sabha was the elders' advisory body and court."
  },
  16: {
    questext: "Which is the correct order of the administrative ladder, from lowest to highest?",
    options: ["Kula → Grama → Vis → Jana → Janapada", "Grama → Kula → Vis → Jana → Janapada", "Kula → Vis → Grama → Jana → Janapada", "Kula → Grama → Jana → Vis → Janapada"],
    correct: "1",
    exptext: "✅ Kula, Grama, Vis, Jana, Janapada. 📌 Family, village, villages, tribe, kingdom. ❌ Vis is larger than Grama and smaller than Jana."
  },
  17: {
    questext: "Which head is correctly matched with the unit?",
    options: ["Grama — Visapati", "Vis — Gramani", "Jana — Gopa", "Janapada — Gopa"],
    correct: "3",
    exptext: "✅ The head of a Jana was the Gopa. 📌 Gramani = Grama; Visapati = Vis. ❌ Janapada was headed by the Rajan."
  },
  18: {
    questext: "Which of the following was NOT a tribal kingdom of the Rigvedic period?",
    options: ["Bharatas", "Matsyas", "Purus", "Shakyas"],
    correct: "4",
    exptext: "✅ Shakyas are not listed among the Rigvedic kingdoms. 📌 Bharatas, Matsyas, Yadus, Purus. ❌ The other three are all Rigvedic tribes."
  },
  19: {
    type: "concept", icon: "👨‍👩‍👧", accent: "#ef4444", pauseTimer: true,
    title: "Social Life (Rigvedic)",
    html: `
      <p class="cp-lead">Society had <b>three parts — warriors, priests and the people</b>; <b>classes, not caste</b>. The family was <b>patriarchal</b>, headed by the <b>Grihapati</b>.</p>
      <table><thead><tr><th>Aspect</th><th>Detail</th></tr></thead><tbody><tr><td>Varna origin</td><td><b>Purushasukta</b>, 10th Mandal of the Rigveda</td></tr><tr><td>Marriage</td><td>Hardly any restriction on inter-marriage or change of occupation; monogamy general, polygamy among royal and noble families; no child marriage, no sati, widow remarriage; age 16 to 17</td></tr><tr><td>Women</td><td>Equal opportunities for spiritual and intellectual development; poets Apala, Viswavara, Ghosa, Lopamudra, Gargi; attended popular assemblies</td></tr><tr><td>Food</td><td>Wheat, barley, milk, curd, ghee, vegetables, fruits; fish, birds, goats, rams, bulls, horses slaughtered; <b>cow slaughter prohibited</b>; intoxicating ‘Sura’</td></tr><tr><td>Education</td><td>Gurukulas, after the sacred thread ceremony</td></tr></tbody></table>
    `
  },
  20: {
    questext: "The origin of the four Varnas is described in the —",
    options: ["Purushasukta, 1st Mandal", "Purushasukta, 10th Mandal", "Nasadiya Sukta", "Gayatri Mantra"],
    correct: "2",
    exptext: "✅ Purushasukta, 10th Mandal of the Rigveda. 📌 Four Varnas from one hymn. ❌ Nasadiya Sukta is about creation."
  },
  21: {
    questext: "Which of the following is NOT true of Rigvedic society?",
    options: ["Women poets like Apala, Ghosa and Lopamudra existed", "Women attended popular assemblies", "Child marriage and sati were common", "Widow remarriage was allowed"],
    correct: "3",
    exptext: "✅ Child marriage and sati were absent. 📌 Women lost status only in the Later Vedic period. ❌ The other statements are true."
  },
  22: {
    questext: "Slaughter of which animal was prohibited in Rigvedic society?",
    options: ["Cow", "Horse", "Bull", "Goat"],
    correct: "1",
    exptext: "✅ The cow. 📌 Cow = Aghanya, not to be killed. ❌ Horses, bulls and goats were slaughtered."
  },
  23: {
    type: "concept", icon: "🐄", accent: "#8b5cf6", pauseTimer: true,
    title: "Economic Conditions",
    html: `
      <p class="cp-lead">Not cities but <b>fortified mud settlements</b>. Crops — <b>barley and wheat</b>, also cotton and oilseeds.</p>
      <div class="cp-note remember">Wealth was measured in <b>cattle</b>; cows were worshipped as symbols of wealth and wars were fought for cows — the cow was ‘<b>Aghanya</b>’, not to be killed. Exchange by <b>barter</b>; rivers were the means of transport. The <b>horse</b> was a very useful animal of Aryan society; others — cow, bull, buffalo, goat, camel.</div>
    `
  },
  24: {
    questext: "In Rigvedic times the cow was called ‘Aghanya’, meaning —",
    options: ["Giver of wealth", "Sacred mother", "Not to be killed", "Divine bull"],
    correct: "3",
    exptext: "✅ Aghanya means not to be killed. 📌 A-ghanya = not to be slain. ❌ Wealth was measured in cows, but that is not the meaning."
  },
  25: {
    questext: "Wealth in Rigvedic society was measured mainly in —",
    options: ["Land", "Cattle", "Gold", "Coins"],
    correct: "2",
    exptext: "✅ Cattle. 📌 Exchange was by barter. ❌ Coins were not used."
  },
  26: {
    type: "concept", icon: "🔥", accent: "#14b8a6", pauseTimer: true,
    title: "Religious Life (Rigvedic)",
    html: `
      <p class="cp-lead">Natural forces were personified — <b>Prithvi</b> (Earth), <b>Agni</b> (Fire), <b>Vayu</b> (Wind), <b>Varuna</b>, <b>Indra</b> (Thunder).</p>
      <table><thead><tr><th>God</th><th>Role</th></tr></thead><tbody><tr><td>Indra</td><td>The most important — ‘Purandara’, destroyer of forts, god of rain</td></tr><tr><td>Agni</td><td>Second; the intermediary between gods and the worshipper</td></tr><tr><td>Soma</td><td>God of plants</td></tr></tbody></table>
      <div class="cp-note remember"><b>No temples and no idol worship</b> in the Rigvedic age.</div>
    `
  },
  27: {
    questext: "The most important Rigvedic god, called ‘Purandara’ (destroyer of forts), was —",
    options: ["Agni", "Varuna", "Soma", "Indra"],
    correct: "4",
    exptext: "✅ Indra. 📌 Indra = Purandara, thunder, rain. ❌ Agni was second in importance."
  },
  28: {
    questext: "Soma was the god of —",
    options: ["Rain", "Fire", "Plants", "Wind"],
    correct: "3",
    exptext: "✅ Plants. 📌 Agni = fire; Vayu = wind; Soma = plants. ❌ Indra is linked with rain."
  },
  29: {
    questext: "Which statement about Rigvedic religion is correct?",
    options: ["Idol worship was common in temples", "There were no temples and no idol worship", "Linga worship was central", "Elaborate temple rituals existed"],
    correct: "2",
    exptext: "✅ No temples and no idol worship. 📌 Open-air yajnas, no idols. ❌ Linga and idol worship belong to the Harappans."
  },
  30: {
    type: "concept", icon: "⚔️", accent: "#ec4899", pauseTimer: true,
    title: "Later Vedic Period (1000–600 BCE)",
    html: `
      <p class="cp-lead">The <b>Iron Age</b> begins. Main centre <b>Madhya Desh</b> — Saraswati to the Gangetic Doab; spread from Punjab to <b>Kurukshetra</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Vedic_Age/3.png" alt="Schematic of Aryavarta, Madhyadesh and Dakshinapath" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Change</th><th>Detail</th></tr></thead><tbody><tr><td>Region</td><td>Shatapatha Brahman names <b>Reva</b> (Narmada) and <b>Sadanira</b> (Gandak); three parts of India — <b>Aryavarta</b> (north), <b>Madhyadesh</b> (central), <b>Dakshinapath</b> (south)</td></tr><tr><td>Economy</td><td>Iron cleared the forests of the Ganga Doab; <b>agriculture replaced animal husbandry</b>; barley continued, rice (‘vrihi’) and wheat became chief crops</td></tr><tr><td>Society</td><td>Varna system thoroughly established; four Ashramas — Brahmachari, Grihasta, Vanaprastha, Sanyasin — for Dharma, Artha, Kama, Moksha</td></tr><tr><td>Women</td><td>Lost their Rigvedic position — barred from political assemblies; polygamy, child marriage, dowry; Aitareya Brahmana calls a daughter a source of misery</td></tr><tr><td>Religion</td><td>Indra, Agni, Varun lost importance; Prajapati (creator), Vishnu (protector), Rudra (destroyer) rose; worship of Vasudeva (Krishna Vasudev) began</td></tr><tr><td>Rituals</td><td>‘Rajasuya’, ‘Ashvamedha’, ‘Vajpeya’ strengthened the king</td></tr></tbody></table>
      <table><thead><tr><th>‘Ratna’ (jewel)</th><th>Role</th></tr></thead><tbody><tr><td>Bhagadugha</td><td>Collector of taxes</td></tr><tr><td>Suta</td><td>Charioteer</td></tr><tr><td>Akshavapa</td><td>Accountant</td></tr><tr><td>Purohita</td><td>Chief priest</td></tr><tr><td>Senani</td><td>Commander of the army</td></tr><tr><td>Gramani</td><td>Leader of the village</td></tr></tbody></table>
      <div class="cp-note trap"><b>Iron</b> belongs to the Later Vedic period only.</div>
    `
  },
  31: {
    questext: "The main centre of the Later Vedic period was —",
    options: ["Madhya Desh", "Sapta-Sindhu", "Dakshinapath", "Afghanistan"],
    correct: "1",
    exptext: "✅ Madhya Desh, Saraswati to the Gangetic Doab. 📌 Rig = Sapta-Sindhu; Later = Madhya Desh. ❌ Sapta-Sindhu was the Rigvedic centre."
  },
  32: {
    questext: "The Shatapatha Brahman names the rivers Reva and Sadanira, which are —",
    options: ["Tapti and Gandak", "Godavari and Gandak", "Narmada and Kosi", "Narmada and Gandak"],
    correct: "4",
    exptext: "✅ Reva = Narmada; Sadanira = Gandak. 📌 R–N, S–G. ❌ Godavari and Tapti are not named here."
  },
  33: {
    questext: "In the Later Vedic period, the northern part of India was called —",
    options: ["Madhyadesh", "Dakshinapath", "Aryavarta", "Brahmarshi Desh"],
    correct: "3",
    exptext: "✅ Aryavarta. 📌 North, central, south = Aryavarta, Madhyadesh, Dakshinapath. ❌ Madhyadesh was the central part."
  },
  34: {
    questext: "Which change took place in the Later Vedic period?",
    options: ["Women gained a larger political role", "Agriculture replaced animal husbandry as the primary occupation", "Indra regained the chief position", "Caste distinctions disappeared"],
    correct: "2",
    exptext: "✅ Iron tools made agriculture primary. 📌 Rig = cattle; Later = plough. ❌ Women lost assembly rights and the Varna system hardened."
  },
  35: {
    questext: "In the Later Vedic ‘Ratna’ list, who was the collector of taxes?",
    options: ["Bhagadugha", "Suta", "Akshavapa", "Senani"],
    correct: "1",
    exptext: "✅ Bhagadugha. 📌 Akshavapa = accountant; Suta = charioteer. ❌ Senani commanded the army."
  },
  36: {
    questext: "Which Rigvedic god lost importance in the Later Vedic period?",
    options: ["Prajapati", "Vishnu", "Indra", "Rudra"],
    correct: "3",
    exptext: "✅ Indra, along with Agni and Varun. 📌 Prajapati, Vishnu, Rudra rose. ❌ Prajapati, Vishnu and Rudra gained importance."
  },
  37: {
    type: "concept", icon: "💍", accent: "#3b82f6", pauseTimer: true,
    title: "Eight Types of Marriage (Manu Smriti)",
    html: `
      <p class="cp-lead"><b>Manu Smriti</b> lists eight forms — the first four praiseworthy, the other four condemned.</p>
      <table><thead><tr><th>Approved</th><th>Condemned</th></tr></thead><tbody><tr><td><b>Brahma</b> — parents find a suitable groom when the girl attains adulthood</td><td><b>Asura</b> — the father sells the girl in exchange for money</td></tr><tr><td><b>Daiva</b> — the girl marries the priest who performs the yagya</td><td><b>Gandharva</b> — girl and man marry under the influence of love or lust</td></tr><tr><td><b>Arsha</b> — the father marries his daughter in exchange for one or two cows for the yagya</td><td><b>Paishacha</b> — intercourse with a sleeping or insane girl and marrying her</td></tr><tr><td><b>Prajapatya</b> — the groom himself asks for the girl from her father</td><td><b>Rakshasa</b> — abducting the girl forcibly and marrying her</td></tr></tbody></table>
      <div class="cp-mnemonic">Approved forms carry <b>divine</b> names (Brahma, Daiva, Arsha, Prajapatya); condemned forms carry <b>demon</b> names (Asura, Gandharva, Paishacha, Rakshasa).</div>
    `
  },
  38: {
    questext: "Which of the following is a condemned form of marriage in the Manu Smriti?",
    options: ["Brahma", "Daiva", "Arsha", "Asura"],
    correct: "4",
    exptext: "✅ Asura, where the father sells the girl for money. 📌 Demon names = condemned. ❌ Brahma, Daiva and Arsha are approved."
  },
  39: {
    questext: "The marriage in which the girl is abducted forcibly is called —",
    options: ["Gandharva", "Rakshasa", "Paishacha", "Asura"],
    correct: "2",
    exptext: "✅ Rakshasa. 📌 Rakshasa = forceful abduction. ❌ Gandharva is a love marriage; Paishacha involves a sleeping or insane girl."
  },
  40: {
    questext: "‘Brahma’ marriage refers to a marriage in which —",
    options: ["Parents find a suitable groom for the adult girl", "The girl marries the priest of the yagya", "The father sells the girl for money", "The girl and boy marry for love"],
    correct: "1",
    exptext: "✅ Parents choose a suitable groom for the adult girl. 📌 Brahma = parent-arranged. ❌ Marriage to the yagya priest is Daiva."
  },
  41: {
    type: "concept", icon: "⚖️", accent: "#f97316", pauseTimer: true,
    title: "Vedic Aryans vs. Indus Valley Civilization",
    html: `
      <table><thead><tr><th>Point</th><th>Vedic Aryans</th><th>Indus Valley people</th></tr></thead><tbody><tr><td>Civilization</td><td>Rural</td><td>Urban</td></tr><tr><td>Metals</td><td>Gold, silver, copper and iron</td><td>Stone and bronze, not yet iron</td></tr><tr><td>Worship</td><td>Against linga and idol worship</td><td>Supporters of linga and idol worship</td></tr><tr><td>Animals</td><td>Pet animal the horse; not familiar with elephant and tiger</td><td>Horse not a pet animal; familiar with elephants and tigers</td></tr><tr><td>Education</td><td>Oral</td><td>Their own pictographic script</td></tr><tr><td>Family</td><td>Patriarchal</td><td>Probably matriarchal</td></tr></tbody></table>
    `
  },
  42: {
    questext: "Which metal was known to the Vedic Aryans but not to the Harappans?",
    options: ["Copper", "Gold", "Silver", "Iron"],
    correct: "4",
    exptext: "✅ Iron. 📌 Harappans = stone and bronze. ❌ Copper, gold and silver were known to both."
  },
  43: {
    questext: "Which statement correctly contrasts the Vedic Aryans and the Harappans?",
    options: ["Vedic Aryans were urban, Harappans rural", "Vedic society was matriarchal, Harappan patriarchal", "Vedic Aryans opposed idol worship, Harappans supported linga and idol worship", "Vedic education was written, Harappan oral"],
    correct: "3",
    exptext: "✅ Vedic Aryans were against linga and idol worship. 📌 Vedic = rural, oral, patriarchal. ❌ Options 1, 2 and 4 reverse the contrast."
  },
  44: {
    questext: "Which is NOT true of the Vedic Aryans as compared with the Harappans?",
    options: ["Rural civilization", "Oral education", "Patriarchal family", "Familiar with elephants and tigers"],
    correct: "4",
    exptext: "✅ Vedic Aryans were not familiar with elephants and tigers. 📌 The Harappans knew them. ❌ Rural, oral and patriarchal all describe Vedic Aryans."
  },
  45: {
    type: "concept", icon: "🧠", accent: "#84cc16", pauseTimer: true,
    title: "Major Philosophies & Their Promoters",
    html: `
      <table><thead><tr><th>School</th><th>Promoter</th></tr></thead><tbody><tr><td>Charvaka</td><td>Charvaka</td></tr><tr><td>Yoga</td><td>Patanjali (Yoga Sutras)</td></tr><tr><td>Sankhya</td><td>Kapil</td></tr><tr><td>Nyaya</td><td>Gautam</td></tr><tr><td>Purva Mimamsa</td><td>Jaimini</td></tr><tr><td>Uttara Mimamsa</td><td>Badarayana</td></tr><tr><td>Vaisheshika</td><td>Kanad (Uluk)</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>K</b>apil–<b>S</b>ankhya · <b>G</b>autam–<b>N</b>yaya · <b>J</b>aimini–<b>P</b>urva Mimamsa · <b>B</b>adarayana–<b>U</b>ttara Mimamsa.</div>
    `
  },
  46: {
    questext: "The founder of the Sankhya philosophy was —",
    options: ["Kapil", "Gautam", "Jaimini", "Patanjali"],
    correct: "1",
    exptext: "✅ Kapil. 📌 Kapil = Sankhya. ❌ Patanjali is linked with Yoga."
  },
  47: {
    questext: "The Nyaya philosophy was propounded by —",
    options: ["Kanad", "Gautam", "Jaimini", "Badarayana"],
    correct: "2",
    exptext: "✅ Gautam. 📌 Gautam = Nyaya. ❌ Kanad is linked with Vaisheshika."
  },
  48: {
    questext: "Which philosophy is correctly matched with its promoter?",
    options: ["Vaisheshika — Kanad", "Purva Mimamsa — Badarayana", "Uttara Mimamsa — Jaimini", "Sankhya — Patanjali"],
    correct: "1",
    exptext: "✅ Vaisheshika — Kanad (Uluk). 📌 Purva = Jaimini; Uttara = Badarayana. ❌ Options 2 and 3 swap the two Mimamsa founders."
  },
  49: {
    questext: "The Yoga Sutras were composed by —",
    options: ["Kapil", "Jaimini", "Kanad", "Patanjali"],
    correct: "4",
    exptext: "✅ Patanjali. 📌 Yoga = Patanjali. ❌ Kapil founded Sankhya."
  },
  50: {
    type: "concept", icon: "🐎", accent: "#a855f7", pauseTimer: true,
    title: "Major Yagnas",
    html: `
      <table><thead><tr><th>Yagna</th><th>Purpose</th></tr></thead><tbody><tr><td>Ashvamedha</td><td>The <b>most important</b>; a horse set free to extend the empire — the king took the area it ran through</td></tr><tr><td>Rajasuya</td><td>Coronation; supreme power</td></tr><tr><td>Vajpeya</td><td>Chariot race, to display power</td></tr><tr><td>Agnishtoma</td><td>Destroyer of sins; a boat to heaven</td></tr><tr><td>Sautramani</td><td>Animals and liquor</td></tr><tr><td>Purushamedha</td><td>A healthy and learned man, for political supremacy</td></tr></tbody></table>
    `
  },
  51: {
    questext: "In which yagna was a horse set free to extend the king's empire?",
    options: ["Rajasuya", "Ashvamedha", "Vajpeya", "Agnishtoma"],
    correct: "2",
    exptext: "✅ Ashvamedha, the most important yagna. 📌 Horse = Ashva. ❌ Rajasuya was the coronation."
  },
  52: {
    questext: "The yagna involving a chariot race to display power was —",
    options: ["Rajasuya", "Agnishtoma", "Vajpeya", "Purushamedha"],
    correct: "3",
    exptext: "✅ Vajpeya. 📌 Vajpeya = chariot race. ❌ Rajasuya is the coronation."
  },
  53: {
    questext: "Agnishtoma was believed to be a —",
    options: ["Destroyer of sins and boat to heaven", "Coronation ceremony", "Chariot race", "Rite with animals and liquor"],
    correct: "1",
    exptext: "✅ Destroyer of sins and a boat to heaven. 📌 Agni = fire cleans sin. ❌ Animals and liquor belong to Sautramani."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Vedic_Age/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a stepped fire altar (vedi) with a flame, a ladle and clay pot, and a horse figure beside a palm-leaf manuscript" },
  "images/General_Awareness/Ancient_India/Vedic_Age/1.png": { t: "fig", about: "Schematic, not a map: seven flowing lines labelled Sindhu, Vitasta (Jhelum), Askini (Chenab), Parushni (Ravi), Vipasa (Beas), Shutudri (Sutlej) and Saraswati, under the title Saptasindhu." },
  "images/General_Awareness/Ancient_India/Vedic_Age/2.png": { t: "fig", about: "Five stacked steps from bottom to top: Kula (Grihapati), Grama (Gramani), Vis (Visapati), Jana (Gopa), Janapada (Rajan)." },
  "images/General_Awareness/Ancient_India/Vedic_Age/3.png": { t: "fig", about: "Schematic, not a map: three horizontal bands — Aryavarta (north, with Kurukshetra), Madhyadesh (centre, main centre), Dakshinapath (south) — with Reva (Narmada) and Sadanira (Gandak) marked." }
});

/* CHANGE LOG
   - Spelling corrected: Aminach → Abinash Chandra Das; Brahmavrat → Brahmavarta; Drishdvati → Drishadvati; Purushni → Parushni; Asikni/Askini written Askini.
   - 'Arya Samaj' in the horse line written as 'Aryan society' (the source wording meant the Aryans, not the 19th-century Arya Samaj).
   - Dropped 'monotheism prevailed' (Rigvedic religion honoured many gods), Durga and Ganesh from the Later Vedic gods list, and 'Adhikarita' from the ratna list (not standard).
   - Harappan horse line written as 'horse not a pet animal' instead of 'unfamiliar with horses', since horse remains are reported from Surkotada.
*/
