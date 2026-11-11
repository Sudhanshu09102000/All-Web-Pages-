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

/* Subject: General_Awareness/Polity · Chapter: Vice_President_of_India · 13 concept pages (+ overview) · 36 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Vice-President of India",
    thumb: {
      image: "images/General_Awareness/Polity/Vice_President_of_India/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "VICE-PRESIDENT",
      line2: "OF INDIA",
      line3: "FULL POLITY",
      badge: "FULL CLASS",
      ribbon: "ARTICLES • ELECTION • REMOVAL",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Vice-President of India | Polity Full Class | SSC, UPSC, Banking, Railways",
      altTitles: ["Vice-President of India in One Class: Election, Removal, Powers", "VP of India Articles 63-71 Polity Tricks"],
      description: "The Vice-President is the 2nd highest constitutional office in India, and exam setters love it. In this full class we cover every subtopic in the book's order.\n\n📌 IN THIS CLASS\n✅ Articles 63 to 71 and election under Art. 66\n✅ Qualifications, oath, term and removal\n✅ Vacancy, disputes and Rajya Sabha Chairman\n✅ Acting as President, salary, President vs VP\n✅ List of Vice-Presidents with practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Polity #VicePresident #SSCCGL",
      tags: ["vice president of india", "vice president polity", "polity for all exams", "article 66", "article 67", "article 64", "article 65", "article 68", "article 71", "vice president election", "removal of vice president", "rajya sabha chairman", "president vs vice president", "list of vice presidents", "indian polity", "polity mcq", "ssc cgl polity", "upsc polity", "general awareness", "static gk", "polity tricks", "constitutional bodies", "competitive exams", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "full class", "tricks", "e President of India Gen"],
      hashtags: ["Polity", "VicePresident", "SSCCGL"],
      thumbText: "VICE-PRESIDENT OF INDIA",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New Polity class is live: Vice-President of India (Art. 63-71). Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Polity — Full Chapter Classes"
    },
    html: `
      <p class="cp-lead">A <u>complete class on the Vice-President of India</u> — the 2nd highest constitutional office, and a favourite of every Polity paper.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>36</b><span>Questions</span></div>
        <div class="cp-stat"><b>~62 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Articles Related to the Vice-President</b><br>Art. 63 to 71 at a glance.</li>
        <li><b>Election (Article 66)</b><br>Electoral college, STV, nomination rules.</li>
        <li><b>Qualifications</b><br>Citizenship, age 35, no office of profit.</li>
        <li><b>Oath / Affirmation (Article 69)</b><br>Who administers the oath.</li>
        <li><b>Term of Office (Article 67)</b><br>5 years, resignation, re-election.</li>
        <li><b>Removal from Office {Art. 67(b)}</b><br>Resolution in Rajya Sabha, then Lok Sabha.</li>
        <li><b>Filling of Vacancy (Article 68)</b><br>When the election must be held.</li>
        <li><b>Election Disputes (Article 71)</b><br>Supreme Court decides.</li>
        <li><b>Ex-officio Chairman of Rajya Sabha (Art. 64)</b><br>Powers, casting vote.</li>
        <li><b>Acting as President (Article 65)</b><br>Maximum 6 months.</li>
        <li><b>Salary / Emoluments</b><br>Paid as Chairman of Rajya Sabha.</li>
        <li><b>President vs Vice-President</b><br>Seven-point comparison.</li>
        <li><b>List of Vice-Presidents of India</b><br>1952 to present.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> the Vice-President's election, removal and Art. 64-71 are repeated in SSC, UPSC, Banking, Railways and Defence exams.</div>
    `
  },
  2: {
    type: "concept", icon: "📜", accent: "#3b82f6", pauseTimer: true,
    title: "Articles Related to the Vice-President",
    html: `
      <p class="cp-lead">The Vice-President is the <b>2nd highest constitutional office</b> in India (after the President). <u>Articles 63 to 71</u> cover everything about the office.</p>
      <table><thead><tr><th>Article</th><th>Subject</th></tr></thead><tbody><tr><td>Art. 63</td><td>Vice-President of India</td></tr><tr><td>Art. 64</td><td>VP = Ex-officio Chairman of Rajya Sabha</td></tr><tr><td>Art. 65</td><td>VP acts as President during vacancy/inability</td></tr><tr><td>Art. 66</td><td>Election of VP</td></tr><tr><td>Art. 67</td><td>Term of office of VP</td></tr><tr><td>Art. 68</td><td>Time of election to fill VP vacancy</td></tr><tr><td>Art. 69</td><td>Oath / Affirmation by VP</td></tr><tr><td>Art. 70</td><td>Discharge of President's functions in contingencies</td></tr><tr><td>Art. 71</td><td>Matters related to election of President / VP</td></tr></tbody></table>
      <div class="cp-note trap">Art. 65 (VP acts as President) and Art. 70 (contingencies) look alike. Remember: <b>65 = VP as President</b>, 70 = other contingencies.</div>
      <div class="cp-note exam">Most-asked pairs: <b>64 = Chairman</b>, <b>66 = Election</b>, <b>67 = Term</b>, <b>71 = Disputes</b>.</div>
    `
  },
  3: {
    questext: "Which Article of the Constitution deals with the election of the Vice-President?",
    options: ["Art. 63", "Art. 66", "Art. 67", "Art. 68"],
    correct: "2",
    exptext: "✅ Art. 66 covers the election. 📌 Art. 63 only creates the office. ❌ Art. 67 is term of office."
  },
  4: {
    questext: "Under which Article is the Vice-President the ex-officio Chairman of the Rajya Sabha?",
    options: ["Art. 63", "Art. 65", "Art. 66", "Art. 64"],
    correct: "4",
    exptext: "✅ Art. 64 makes the VP Chairman of the Rajya Sabha. 📌 64 = Chairman. ❌ Art. 65 is acting as President."
  },
  5: {
    questext: "The Vice-President acts as President during vacancy or inability under which Article?",
    options: ["Art. 65", "Art. 68", "Art. 70", "Art. 71"],
    correct: "1",
    exptext: "✅ Art. 65 gives this power. 📌 65 = VP as President. ❌ Art. 70 only covers other contingencies."
  },
  6: {
    type: "concept", icon: "🗳️", accent: "#ef4444", pauseTimer: true,
    title: "Election (Article 66)",
    html: `
      <p class="cp-lead">The Vice-President is chosen by <b>indirect election</b> — the people do not vote directly. The electoral college has a special make-up, so <u>compare it with the President's</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Polity/Vice_President_of_India/1.png" alt="Comparison of the electoral colleges of President and Vice-President" style="display:block;width:100%;max-width:320px;max-height:200px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Electoral college</td><td>Members of BOTH Houses of Parliament (Lok Sabha + Rajya Sabha), elected AND nominated</td></tr><tr><td>Not included</td><td>Members of State Legislative Assemblies</td></tr><tr><td>Method of voting</td><td>Proportional Representation by Single Transferable Vote (STV)</td></tr><tr><td>Ballot</td><td>Secret ballot</td></tr><tr><td>Nomination</td><td>Minimum 20 proposers + 20 seconders</td></tr><tr><td>Security deposit</td><td>₹15,000 in RBI</td></tr></tbody></table>
      <div class="cp-note trap">The President's college has only <b>elected</b> members (MPs + MLAs). The VP's college has <b>elected + nominated</b> MPs and <b>no MLAs</b>.</div>
      <div class="cp-note exam">Remember the numbers <b>20 + 20</b> and <b>₹15,000</b>.</div>
    `
  },
  7: {
    questext: "Who form the electoral college for the election of the Vice-President?",
    options: ["Elected members of both Houses and State Assemblies", "Elected members of Lok Sabha only", "All members of Lok Sabha and Rajya Sabha, including nominated ones", "Members of Rajya Sabha and State Legislative Councils"],
    correct: "3",
    exptext: "✅ Both Houses, elected and nominated. 📌 No MLAs. ❌ State Assemblies vote only in the President's election."
  },
  8: {
    questext: "Which of the following is NOT part of the Vice-President's electoral college?",
    options: ["Nominated members of Rajya Sabha", "Elected members of Lok Sabha", "Members of State Legislative Assemblies", "Elected members of Rajya Sabha"],
    correct: "3",
    exptext: "✅ State Assemblies are excluded. 📌 VP college = Parliament only. ❌ Nominated MPs are included, unlike in the President's college."
  },
  9: {
    questext: "The Vice-President is elected by which method of voting?",
    options: ["Proportional representation by single transferable vote, secret ballot", "Open ballot with first-past-the-post", "Proportional representation by list system, open ballot", "Direct election by adult franchise"],
    correct: "1",
    exptext: "✅ STV with secret ballot. 📌 Same system as the President. ❌ Direct election is never used for VP."
  },
  10: {
    questext: "A candidate for Vice-President needs how many proposers and seconders, and what security deposit?",
    options: ["10 proposers, 10 seconders, ₹10,000", "50 proposers, 50 seconders, ₹15,000", "20 proposers, 20 seconders, ₹25,000", "20 proposers, 20 seconders, ₹15,000"],
    correct: "4",
    exptext: "✅ 20 + 20 and ₹15,000 deposit in RBI. 📌 Both 20s, deposit 15 thousand. ❌ ₹25,000 is not the figure."
  },
  11: {
    type: "concept", icon: "🎓", accent: "#22c55e", pauseTimer: true,
    title: "Qualifications",
    html: `
      <p class="cp-lead">To become Vice-President, a person must satisfy <u>four simple conditions</u>. Think of it as the Rajya Sabha membership test, plus a few extra rules.</p>
      <table><thead><tr><th>Condition</th><th>Requirement</th></tr></thead><tbody><tr><td>Citizenship</td><td>Must be a citizen of India</td></tr><tr><td>Age</td><td>35 years or above</td></tr><tr><td>Eligibility</td><td>Qualified to be elected as a member of the Rajya Sabha</td></tr><tr><td>Membership</td><td>Must NOT be a member of any House of Parliament or State Legislature</td></tr><tr><td>Office of profit</td><td>Must NOT hold any office of profit under Union/State Govt, local or public authority</td></tr></tbody></table>
      <div class="cp-note trap">The VP must <b>not</b> be an MP or MLA — a sitting member has to resign first. The age is <b>35</b>, not 30 or 25.</div>
      <div class="cp-note exam">The age limit (35) is the same as for the President.</div>
    `
  },
  12: {
    questext: "What is the minimum age required to be elected Vice-President of India?",
    options: ["30 years", "35 years", "25 years", "40 years"],
    correct: "2",
    exptext: "✅ 35 years or above. 📌 Same as the President. ❌ 25 years is the Lok Sabha age."
  },
  13: {
    questext: "Which statement about the qualifications of the Vice-President is NOT correct?",
    options: ["Must be a citizen of India", "Must be qualified to be a Rajya Sabha member", "Must not hold any office of profit", "Must be a member of the Rajya Sabha at the time of election"],
    correct: "4",
    exptext: "✅ He must NOT be a member of any House of Parliament. 📌 Qualified, not a member. ❌ The other three are required."
  },
  14: {
    questext: "Consider: 1. The VP must not be a member of Parliament or State Legislature. 2. The VP can hold an office of profit under the Union Government. Which is/are correct?",
    options: ["Only 2", "Only 1", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 1 is correct. 📌 No membership, no profit office. ❌ Statement 2 is wrong because an office of profit is barred."
  },
  15: {
    type: "concept", icon: "🤝", accent: "#f59e0b", pauseTimer: true,
    title: "Oath / Affirmation (Article 69)",
    html: `
      <p class="cp-lead">Before starting work, the Vice-President takes an <b>oath or affirmation</b> of loyalty to the Constitution.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Administered by</td><td>The President (or a person appointed by the President)</td></tr><tr><td>Oath content</td><td>To bear true faith and allegiance to the Constitution and to discharge duties faithfully</td></tr></tbody></table>
      <div class="cp-note trap">The President's oath is administered by the Chief Justice of India, but the <b>VP's oath is administered by the President</b>.</div>
      <div class="cp-note exam">Oath = <b>Article 69</b>.</div>
    `
  },
  16: {
    questext: "Who administers the oath of office to the Vice-President?",
    options: ["Chief Justice of India", "Speaker of Lok Sabha", "The President or a person appointed by the President", "Chairman of Rajya Sabha"],
    correct: "3",
    exptext: "✅ The President or his appointee. 📌 VP takes oath before the President. ❌ The CJI swears in the President."
  },
  17: {
    questext: "Under which Article does the Vice-President take oath or affirmation?",
    options: ["Art. 69", "Art. 67", "Art. 64", "Art. 71"],
    correct: "1",
    exptext: "✅ Art. 69 is oath or affirmation. 📌 69 = oath. ❌ Art. 67 deals with term of office."
  },
  18: {
    type: "concept", icon: "⏳", accent: "#8b5cf6", pauseTimer: true,
    title: "Term of Office (Article 67)",
    html: `
      <p class="cp-lead">The Vice-President's term is <b>5 years</b>, counted from the date he <u>assumes office</u>.</p>
      <table><thead><tr><th>Rule</th><th>Provision</th></tr></thead><tbody><tr><td>Term</td><td>5 years from the date of assuming office</td></tr><tr><td>Resignation</td><td>Anytime, by writing to the President</td></tr><tr><td>Continuation</td><td>Can hold office beyond 5 years until the successor assumes charge</td></tr><tr><td>Re-election</td><td>Eligible; no limit on number of terms</td></tr></tbody></table>
      <div class="cp-note trap">The term does not end automatically at 5 years — he stays until his <b>successor takes charge</b>.</div>
      <div class="cp-note exam">Resignation letter goes to the <b>President</b>, not to the Rajya Sabha.</div>
    `
  },
  19: {
    questext: "The Vice-President can resign by writing to whom?",
    options: ["The President", "The Speaker of Lok Sabha", "The Chief Justice of India", "The Prime Minister"],
    correct: "1",
    exptext: "✅ Resignation is addressed to the President. 📌 VP resigns to the President. ❌ The Speaker has no role here."
  },
  20: {
    questext: "Which statement about the Vice-President's term is correct?",
    options: ["He cannot be re-elected", "He leaves office exactly on completing 5 years", "He continues in office after 5 years until his successor takes charge", "The term is fixed by Parliament by law"],
    correct: "3",
    exptext: "✅ He continues until the successor assumes charge. 📌 Term is 5 years, but no gap. ❌ Re-election has no limit."
  },
  21: {
    type: "concept", icon: "⚖️", accent: "#e11d48", pauseTimer: true,
    title: "Removal from Office {Art. 67(b)}",
    html: `
      <p class="cp-lead">The Vice-President needs <b>no formal impeachment</b> (unlike the President). A simple <u>resolution</u> removes him.</p>
      <table><thead><tr><th>Point</th><th>Requirement</th></tr></thead><tbody><tr><td>Where introduced</td><td>ONLY in Rajya Sabha, NOT Lok Sabha</td></tr><tr><td>Rajya Sabha</td><td>Effective majority (majority of total membership)</td></tr><tr><td>Lok Sabha</td><td>Simple majority agrees with the RS resolution</td></tr><tr><td>Advance notice</td><td>Minimum 14 days</td></tr><tr><td>Grounds</td><td>None mentioned in the Constitution</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>R</b>ajya Sabha = <b>R</b>eal (effective) majority, <b>L</b>ok Sabha = <b>L</b>ight (simple) majority</div>
      <div class="cp-note trap">Do not call it impeachment. The resolution <b>starts only in the Rajya Sabha</b>.</div>
      <div class="cp-note exam"><b>14 days</b> notice and <b>no grounds</b> given are favourite facts.</div>
    `
  },
  22: {
    questext: "How can the Vice-President be removed from office?",
    options: ["By impeachment by both Houses", "By a Rajya Sabha resolution agreed to by Lok Sabha", "By an order of the Supreme Court", "By the President on the advice of the Prime Minister"],
    correct: "2",
    exptext: "✅ RS resolution plus Lok Sabha agreement. 📌 No impeachment for VP. ❌ Impeachment is only for the President."
  },
  23: {
    questext: "The resolution for removal of the Vice-President can be introduced in:",
    options: ["Lok Sabha only", "Either House", "A joint sitting", "Rajya Sabha only"],
    correct: "4",
    exptext: "✅ Only Rajya Sabha can start it. 📌 RS starts, LS agrees. ❌ Lok Sabha cannot introduce it."
  },
  24: {
    questext: "The Rajya Sabha passes the resolution to remove the Vice-President by which majority?",
    options: ["Two-thirds of members present and voting", "Simple majority of members present and voting", "Effective majority (majority of total membership)", "Special majority with half the States"],
    correct: "3",
    exptext: "✅ Effective majority of total membership. 📌 RS effective, LS simple. ❌ Simple majority is for Lok Sabha."
  },
  25: {
    questext: "What is the minimum advance notice required for moving the resolution to remove the Vice-President?",
    options: ["14 days", "7 days", "30 days", "21 days"],
    correct: "1",
    exptext: "✅ At least 14 days' notice. 📌 Two weeks. ❌ 30 days is not required."
  },
  26: {
    type: "concept", icon: "🔄", accent: "#14b8a6", pauseTimer: true,
    title: "Filling of Vacancy (Article 68)",
    html: `
      <p class="cp-lead">A vacancy arises from <b>expiry of term, resignation, removal, death, or disqualification / election declared void</b>. The timing of the new election depends on the cause.</p>
      <table><thead><tr><th>Cause of vacancy</th><th>Election timing</th></tr></thead><tbody><tr><td>Expiry of term</td><td>Held BEFORE the term expires</td></tr><tr><td>Resignation / removal / death</td><td>Held as soon as possible</td></tr><tr><td>New VP's term</td><td>Full new term of 5 years</td></tr></tbody></table>
      <div class="cp-note trap">The new VP does <b>not</b> serve only the remainder of his predecessor's term — he gets a <b>full 5 years</b>.</div>
      <div class="cp-note exam">Expiry = election <b>before</b>; other causes = <b>as soon as possible</b>.</div>
    `
  },
  27: {
    questext: "If the Vice-President's term is about to expire, when must the election for the new Vice-President be held?",
    options: ["After the term ends, within 6 months", "Before the term expires", "Within 3 months of the vacancy", "As soon as possible after the vacancy"],
    correct: "2",
    exptext: "✅ Held before the term expires. 📌 Expiry = advance election. ❌ 'As soon as possible' applies to death or resignation."
  },
  28: {
    questext: "A Vice-President elected to fill a vacancy caused by death holds office for:",
    options: ["The remainder of his predecessor's term", "One year", "Until the next general election", "A full new term of 5 years"],
    correct: "4",
    exptext: "✅ A full new term of 5 years. 📌 Fresh 5-year term. ❌ He does not just finish the old term."
  },
  29: {
    type: "concept", icon: "🏛️", accent: "#ec4899", pauseTimer: true,
    title: "Election Disputes (Article 71)",
    html: `
      <p class="cp-lead">Any doubt or dispute about the Vice-President's election goes to the <b>Supreme Court</b>, whose decision is <u>final</u>.</p>
      <table><thead><tr><th>Situation</th><th>Rule</th></tr></thead><tbody><tr><td>Who decides</td><td>Supreme Court (final)</td></tr><tr><td>Incomplete electoral college</td><td>Election cannot be challenged on the ground that the college was incomplete</td></tr><tr><td>Election declared void</td><td>Acts done before the SC declaration remain valid</td></tr></tbody></table>
      <div class="cp-note trap">A <b>vacancy among electors</b> cannot be used to challenge the election. Acts done before the declaration are <b>not cancelled</b>.</div>
      <div class="cp-note exam">Disputes = <b>Article 71</b>, Supreme Court only.</div>
    `
  },
  30: {
    questext: "Who decides doubts and disputes regarding the election of the Vice-President?",
    options: ["Election Commission", "Supreme Court", "Parliament", "High Court"],
    correct: "2",
    exptext: "✅ The Supreme Court decides, and its decision is final. 📌 Art. 71 = SC. ❌ The Election Commission only conducts the election."
  },
  31: {
    questext: "If the Supreme Court declares the Vice-President's election void, his acts done before the declaration are:",
    options: ["Declared invalid", "Subject to review by Parliament", "Valid only if the President ratifies them", "Not affected and remain valid"],
    correct: "4",
    exptext: "✅ Acts done earlier remain valid. 📌 No cancelling of past acts. ❌ No ratification is needed."
  },
  32: {
    type: "concept", icon: "🪑", accent: "#0ea5e9", pauseTimer: true,
    title: "Ex-officio Chairman of Rajya Sabha (Art. 64)",
    html: `
      <p class="cp-lead">By virtue of his office, the Vice-President is the <b>Chairman of the Rajya Sabha</b>. His powers are similar to those of the <u>Speaker of Lok Sabha</u>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Position</td><td>Ex-officio Chairman of Rajya Sabha</td></tr><tr><td>Powers</td><td>Similar to the Speaker of Lok Sabha</td></tr><tr><td>Role</td><td>Presides over sessions, maintains order, decides points of order</td></tr><tr><td>Voting</td><td>No regular vote; casting vote only in case of a tie</td></tr><tr><td>Foreign parallel</td><td>American VP who chairs the Senate</td></tr></tbody></table>
      <div class="cp-note trap">He is <b>not a member</b> of the Rajya Sabha, yet he presides over it. He votes only to break a tie.</div>
      <div class="cp-note tip">In the Chairman's absence, the <b>Deputy Chairman</b> presides.</div>
    `
  },
  33: {
    questext: "The powers of the Vice-President as Chairman of Rajya Sabha are similar to those of:",
    options: ["The Prime Minister", "The Chief Justice of India", "The Speaker of Lok Sabha", "The Governor"],
    correct: "3",
    exptext: "✅ Same role as the Lok Sabha Speaker. 📌 Presiding officer of the House. ❌ The PM leads the government, not the House."
  },
  34: {
    questext: "The Vice-President, as Chairman of Rajya Sabha, can vote only:",
    options: ["In case of a tie", "On money bills", "On constitutional amendments", "On every bill"],
    correct: "1",
    exptext: "✅ Casting vote only in a tie. 📌 No regular vote. ❌ He does not vote on bills routinely."
  },
  35: {
    questext: "The role of the Indian Vice-President as presiding officer of the upper house resembles which foreign office?",
    options: ["Speaker of the British House of Commons", "Prime Minister of Australia", "President of Switzerland", "Vice-President of the USA"],
    correct: "4",
    exptext: "✅ The American VP chairs the Senate. 📌 Both preside over the upper house. ❌ The Commons Speaker leads a lower house."
  },
  36: {
    type: "concept", icon: "👑", accent: "#f97316", pauseTimer: true,
    title: "Acting as President (Article 65)",
    html: `
      <p class="cp-lead">When the President's chair is empty or the President cannot work, the Vice-President steps in. <u>Never more than 6 months</u> for a vacancy.</p>
      <table><thead><tr><th>Situation</th><th>What the VP does</th></tr></thead><tbody><tr><td>Vacancy (resignation, impeachment, death, any cause)</td><td>Acts as President</td></tr><tr><td>Maximum period</td><td>6 months — a new President must be elected within this time</td></tr><tr><td>President temporarily unable (absence, illness)</td><td>Discharges the President's functions until the President resumes</td></tr></tbody></table>
      <div class="cp-note trap">Acting as President does <b>not</b> end his VP office, and the 6-month limit applies to a <b>vacancy</b>, not to temporary absence.</div>
      <div class="cp-note exam">Art. 65 = VP as President. Maximum period = <b>6 months</b>.</div>
    `
  },
  37: {
    questext: "What is the maximum period for which the Vice-President can act as President due to a vacancy?",
    options: ["3 months", "1 year", "6 months", "Until the next general election"],
    correct: "3",
    exptext: "✅ Maximum 6 months. 📌 A new President must be elected within it. ❌ There is no one-year limit."
  },
  38: {
    questext: "Which of the following is NOT a situation where the Vice-President acts as President?",
    options: ["Lok Sabha is dissolved", "President's death", "President's resignation", "President's temporary illness"],
    correct: "1",
    exptext: "✅ Dissolution of Lok Sabha is unrelated. 📌 VP steps in for vacancy or inability. ❌ Death, resignation and illness all qualify."
  },
  39: {
    questext: "During the President's temporary absence or illness, the Vice-President:",
    options: ["Becomes President permanently", "Discharges the President's functions until he resumes", "Presides over a joint sitting", "Calls a fresh election within 6 months"],
    correct: "2",
    exptext: "✅ He discharges the functions until the President resumes. 📌 Temporary cover. ❌ No election is needed."
  },
  40: {
    type: "concept", icon: "💰", accent: "#84cc16", pauseTimer: true,
    title: "Salary / Emoluments",
    html: `
      <p class="cp-lead">The Constitution does <b>not fix a separate salary</b> for the Vice-President. He is paid for the work he does as <u>Chairman of Rajya Sabha</u>.</p>
      <table><thead><tr><th>Situation</th><th>Salary</th></tr></thead><tbody><tr><td>In his own capacity as VP</td><td>No separate salary fixed by the Constitution</td></tr><tr><td>As Chairman of Rajya Sabha</td><td>₹4 lakh/month (revised 2018; earlier ₹1.25 lakh/month)</td></tr><tr><td>When acting as President</td><td>President's salary and allowances (not the Chairman's)</td></tr></tbody></table>
      <div class="cp-note trap">The VP gets <b>no salary as VP</b> — only as Rajya Sabha Chairman. While acting as President, he switches to the <b>President's</b> pay.</div>
      <div class="cp-note exam">Remember the revision: <b>₹1.25 lakh → ₹4 lakh</b> (2018).</div>
    `
  },
  41: {
    questext: "The Vice-President draws his regular salary as:",
    options: ["Chairman of the Rajya Sabha", "Vice-President, fixed by the Constitution", "Member of the Rajya Sabha", "Head of Parliament's Secretariat"],
    correct: "1",
    exptext: "✅ Salary is paid as Rajya Sabha Chairman. 📌 No separate VP salary. ❌ The Constitution fixes none."
  },
  42: {
    questext: "The monthly salary of the Chairman of Rajya Sabha, revised in 2018, is:",
    options: ["₹1.25 lakh", "₹4 lakh", "₹3.5 lakh", "₹5 lakh"],
    correct: "2",
    exptext: "✅ ₹4 lakh per month. 📌 Up from ₹1.25 lakh. ❌ ₹1.25 lakh was the earlier figure."
  },
  43: {
    type: "concept", icon: "⚔️", accent: "#a855f7", pauseTimer: true,
    title: "President vs Vice-President",
    html: `
      <p class="cp-lead">Many questions are built on this table. <u>Learn where they match and where they differ.</u></p>
      <table><thead><tr><th>Point</th><th>President</th><th>Vice-President</th></tr></thead><tbody><tr><td>Election</td><td>Indirect (elected MPs + MLAs)</td><td>Indirect (elected + nominated MPs only)</td></tr><tr><td>Age</td><td>35 years</td><td>35 years</td></tr><tr><td>Term</td><td>5 years</td><td>5 years</td></tr><tr><td>Removal</td><td>Impeachment (both Houses)</td><td>Resolution by RS (effective majority) + LS (simple majority)</td></tr><tr><td>Oath by</td><td>CJI (or senior SC Judge)</td><td>President</td></tr><tr><td>Salary</td><td>Fixed by Parliament</td><td>Salary as Chairman, RS</td></tr><tr><td>Election dispute</td><td>Supreme Court (final)</td><td>Supreme Court (final)</td></tr></tbody></table>
      <div class="cp-note trap"><b>Age, term and dispute authority are the same</b>. Election college, removal, oath and salary differ.</div>
      <div class="cp-note exam">Same = <b>35, 5 years, Supreme Court</b>.</div>
    `
  },
  44: {
    questext: "Which of the following is the same for both the President and the Vice-President?",
    options: ["Method of removal", "Authority administering the oath", "Electoral college", "Minimum age"],
    correct: "4",
    exptext: "✅ Both need 35 years. 📌 Same: age, term, dispute. ❌ Removal, oath and college differ."
  },
  45: {
    questext: "Who administers the oath to the President and to the Vice-President, respectively?",
    options: ["The President; the CJI", "The CJI; the CJI", "The CJI (or senior SC Judge); the President", "The Speaker; the President"],
    correct: "3",
    exptext: "✅ CJI swears in the President; the President swears in the VP. 📌 Order matters. ❌ The Speaker has no role."
  },
  46: {
    questext: "Consider: 1. The VP's electoral college includes nominated members. 2. The President's electoral college includes State Legislative Assemblies. Which is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 VP: nominated MPs, no MLAs. President: MPs plus MLAs, elected only."
  },
  47: {
    type: "concept", icon: "📋", accent: "#06b6d4", pauseTimer: true,
    title: "List of Vice-Presidents of India",
    html: `
      <p class="cp-lead">From <b>Dr. S. Radhakrishnan (1952)</b> to the present — <u>learn the order</u> and the term years.</p>
      <table><thead><tr><th>S.No.</th><th>Name</th><th>Term</th></tr></thead><tbody><tr><td>1</td><td>Dr. S. Radhakrishnan</td><td>1952–1962</td></tr><tr><td>2</td><td>Dr. Zakir Husain</td><td>1962–1967</td></tr><tr><td>3</td><td>V. V. Giri</td><td>1967–1969</td></tr><tr><td>4</td><td>G. S. Pathak</td><td>1969–1974</td></tr><tr><td>5</td><td>B. D. Jatti</td><td>1974–1979</td></tr><tr><td>6</td><td>M. Hidayatullah</td><td>1979–1984</td></tr><tr><td>7</td><td>R. Venkataraman</td><td>1984–1987</td></tr><tr><td>8</td><td>Dr. Shankar Dayal Sharma</td><td>1987–1992</td></tr><tr><td>9</td><td>K. R. Narayanan</td><td>1992–1997</td></tr><tr><td>10</td><td>Krishan Kant</td><td>1997–2002</td></tr><tr><td>11</td><td>Bhairon Singh Shekhawat</td><td>2002–2007</td></tr><tr><td>12</td><td>M. Hamid Ansari</td><td>2007–2017</td></tr><tr><td>13</td><td>M. Venkaiah Naidu</td><td>2017–2022</td></tr><tr><td>14</td><td>Jagdeep Dhankhar</td><td>2022–2025</td></tr><tr><td>15</td><td>C. P. Radhakrishnan</td><td>2025–present</td></tr></tbody></table>
      <div class="cp-note exam">Longest tenures: <b>Radhakrishnan</b> and <b>Hamid Ansari</b> served two full terms (10 years each).</div>
    `
  },
  48: {
    questext: "Who was the first Vice-President of India?",
    options: ["Dr. Zakir Husain", "V. V. Giri", "Dr. Rajendra Prasad", "Dr. S. Radhakrishnan"],
    correct: "4",
    exptext: "✅ Dr. S. Radhakrishnan served 1952–1962. 📌 First VP, two terms. ❌ Rajendra Prasad was the first President."
  },
  49: {
    questext: "Who was the Vice-President immediately before M. Venkaiah Naidu?",
    options: ["Bhairon Singh Shekhawat", "M. Hamid Ansari", "Krishan Kant", "K. R. Narayanan"],
    correct: "2",
    exptext: "✅ M. Hamid Ansari served 2007–2017. 📌 Ansari then Naidu. ❌ Shekhawat served 2002–2007."
  },
  50: {
    questext: "Who succeeded Jagdeep Dhankhar as the Vice-President of India in 2025?",
    options: ["C. P. Radhakrishnan", "M. Venkaiah Naidu", "M. Hamid Ansari", "Bhairon Singh Shekhawat"],
    correct: "1",
    exptext: "✅ C. P. Radhakrishnan took office in 2025. 📌 15th Vice-President. ❌ The others served earlier."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Vice_President_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a polished brass gavel, a bound copy of the Constitution on a desk and a softly blurred Parliament dome silhouette" },
  "images/General_Awareness/Polity/Vice_President_of_India/1.png": { t: "fig", about: "Two overlapping circles. Left circle PRESIDENT: Elected MPs + Elected MLAs. Right circle VICE-PRESIDENT: Elected + Nominated MPs only. Small label under the right circle: No MLAs." }
});

/* CHANGE LOG
   - List of Vice-Presidents: Jagdeep Dhankhar's term corrected to 2022–2025 (he resigned) and C. P. Radhakrishnan (2025–present) added as the 15th Vice-President.
   - Absence of the Chairman: the note 'President appoints a Rajya Sabha member as Acting Chairman' replaced with the correct provision — the Deputy Chairman presides (Art. 91).
*/