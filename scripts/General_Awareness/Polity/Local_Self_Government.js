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

/* Field: General_Awareness · Subject: Polity · Chapter: Local_Self_Government · 15 concept pages (+ overview) · 36 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Polity/Local_Self_Government/thumbnail.png",
      banner: "SSC • UPSC • RAILWAYS 2026",
      line1: "LOCAL SELF",
      line2: "GOVERNMENT",
      line3: "73RD + 74TH",
      badge: "FULL CLASS",
      ribbon: "PANCHAYATS • MUNICIPALITIES • MCQs",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Local Self-Government 73rd & 74th Amendment | Polity for all exams",
      altTitles: ["Panchayati Raj Committees One Shot Polity", "73rd vs 74th Amendment Mandatory Discretionary Trick"],
      description: "Local Self-Government is a high-scoring Polity chapter. In this class you learn Lord Ripon and the history, the Balwant Rai Mehta, Ashok Mehta, G. V. K. Rao and L. M. Singhvi committees, the 73rd Amendment and Panchayati Raj, the Gram Sabha, reservation, SFC and SEC, the PESA Act 1996, the 74th Amendment and municipalities, planning committees, and mandatory versus discretionary provisions.\n\n📌 IN THIS CLASS\n✅ History and committees\n✅ 73rd Amendment, 11th Schedule\n✅ 74th Amendment, 12th Schedule\n✅ PESA Act, planning committees\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 History and committees\n00:00 73rd Amendment\n00:00 74th Amendment\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Polity #PanchayatiRaj",
      tags: ["local self government", "panchayati raj", "73rd amendment", "74th amendment", "polity for ssc cgl", "indian polity", "balwant rai mehta committee", "ashok mehta committee", "gram sabha", "11th schedule", "12th schedule", "pesa act 1996", "municipalities polity", "lord ripon", "state finance commission", "state election commission", "district planning committee", "urban local bodies", "three tier panchayat", "polity one shot", "general awareness polity", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "al Self Government Po"],
      hashtags: ["SSCCGL", "Polity", "PanchayatiRaj"],
      thumbText: "LOCAL SELF-GOVERNMENT 73RD + 74TH",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏘️ New Polity class is live: Local Self-Government (73rd + 74th Amendment). Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 History and committees\n00:00 73rd Amendment\n00:00 74th Amendment",
      playlist: "General Awareness — Polity Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on Local Self-Government</u> — Panchayati Raj, the 73rd and 74th Amendments and urban bodies, a favourite Polity topic in every exam.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>15</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>36</b><span>Questions</span></div>
        <div class="cp-stat"><b>~66 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Historical Roots &amp; Thinkers</b><br>Lord Ripon, Gandhi, Article 40 and the 1952 Community Development Programme.</li>
        <li><b>Committees on Panchayati Raj</b><br>Balwant Rai Mehta, Ashok Mehta, G. V. K. Rao, L. M. Singhvi.</li>
        <li><b>73rd Amendment &amp; Panchayats</b><br>Part IX, 11th Schedule, Gram Sabha, three tiers, reservation, SFC, SEC.</li>
        <li><b>PESA Act, 1996</b><br>Bhuria Committee and Scheduled Areas.</li>
        <li><b>Urban Local Self-Government</b><br>History, 74th Amendment, 12th Schedule, types of urban bodies.</li>
        <li><b>Planning Committees</b><br>DPC (4/5 elected) and MPC (2/3 elected).</li>
        <li><b>Mandatory vs Discretionary</b><br>What States must do and what they may choose.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> dates, Article numbers, Schedules and committee names from this chapter are asked every year in SSC, UPSC and State exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🏘️", accent: "#22c55e", pauseTimer: true,
    title: "Introduction & Historical Roots",
    html: `
      <p class="cp-lead">Local Self-Government is a <b>decentralised, participatory</b> system — people manage local affairs through their own <u>elected institutions</u>.</p>
      <table><thead><tr><th>Milestone</th><th>Fact</th></tr></thead><tbody><tr><td>Ancient roots</td><td>Ayyangar system of the Chola and Vijayanagara empires</td></tr><tr><td>1882</td><td>Lord Ripon’s Resolution — the ‘Magna Carta of Local Self-Government’</td></tr><tr><td>GoI Act 1919 (Diarchy)</td><td>Local self-government put in the Transferred Subjects List</td></tr></tbody></table>
      <div class="cp-note remember"><b>Lord Ripon</b> is the <u>‘Father of Local Self-Government’</u> in India.</div>
      <div class="cp-note trap">Gandhi was the chief <i>advocate</i> of Panchayati Raj; the ‘Father of Local Self-Government’ is <b>Ripon</b>.</div>
    `
  },
  3: {
    questext: "Who is known as the ‘Father of Local Self-Government’ in India?",
    options: ["Mahatma Gandhi", "Lord Ripon", "Lord Curzon", "Lord Cornwallis"],
    correct: "2",
    exptext: "✅ Lord Ripon. 📌 His 1882 Resolution is the ‘Magna Carta’ of local self-government. ❌ Gandhi was the chief advocate of Panchayati Raj."
  },
  4: {
    questext: "Lord Ripon’s Resolution on Local Self-Government was introduced in:",
    options: ["1861", "1909", "1919", "1882"],
    correct: "4",
    exptext: "✅ 1882. 📌 GoI Act 1919 later made local self-government a Transferred subject. ❌ 1909 is the Morley-Minto Act."
  },
  5: {
    type: "concept", icon: "🧠", accent: "#f59e0b", pauseTimer: true,
    title: "Thinkers",
    html: `
      <p class="cp-lead">Thinkers differed on the idea of village self-rule, and the Constitution finally placed it under the <b>Directive Principles</b>.</p>
      <table><thead><tr><th>Role</th><th>Person</th></tr></thead><tbody><tr><td>Chief advocate</td><td>Mahatma Gandhi</td></tr><tr><td>Supporters</td><td>Dadabhai Naoroji, Rajendra Prasad, Lala Lajpat Rai</td></tr><tr><td>Strong opponent</td><td>B. R. Ambedkar</td></tr></tbody></table>
      <div class="cp-note exam">Placed under <b>Article 40</b> (DPSP). On <b>2 Oct 1952</b> the <b>Community Development Programme</b> was launched in <b>55 blocks</b> — the foundation of Panchayati Raj.</div>
    `
  },
  6: {
    questext: "Among the thinkers on village self-rule, who was the strong opponent of Panchayati Raj?",
    options: ["B. R. Ambedkar", "Mahatma Gandhi", "Lala Lajpat Rai", "Rajendra Prasad"],
    correct: "1",
    exptext: "✅ B. R. Ambedkar. 📌 Gandhi was the chief advocate. ❌ Naoroji, Rajendra Prasad and Lajpat Rai supported it."
  },
  7: {
    type: "concept", icon: "📉", accent: "#ef4444", pauseTimer: true,
    title: "Balwant Rai Mehta Committee (1957)",
    html: `
      <p class="cp-lead">Set up under the Planning Commission’s Committee on Plan Projects to examine the <b>Community Development Programme</b>; it recommended a <u>three-tier structure</u>.</p>
      <table><thead><tr><th>Tier</th><th>Body</th></tr></thead><tbody><tr><td>Village</td><td>Gram Panchayat</td></tr><tr><td>Block</td><td>Panchayat Samiti</td></tr><tr><td>District</td><td>Zila Parishad (chairman = District Collector)</td></tr></tbody></table>
      <div class="cp-note remember">India’s first three-tier Panchayati Raj was inaugurated on <b>2 October 1959</b> at <b>Nagaur (Rajasthan)</b> by PM Nehru.</div>
    `
  },
  8: {
    questext: "The Balwant Rai Mehta Committee (1957) recommended:",
    options: ["A two-tier system", "A single-tier system", "A three-tier system", "A four-tier system"],
    correct: "3",
    exptext: "✅ Three tiers: Gram Panchayat, Panchayat Samiti, Zila Parishad. ❌ Two-tier was Ashok Mehta’s model."
  },
  9: {
    questext: "India’s first three-tier Panchayati Raj was inaugurated on 2 October 1959 at:",
    options: ["Wardha", "Jaipur", "Nagaur", "Ajmer"],
    correct: "3",
    exptext: "✅ Nagaur, Rajasthan, by PM Nehru. 📌 Date is Gandhi Jayanti, 1959."
  },
  10: {
    questext: "According to the Balwant Rai Mehta Committee, the chairman of the Zila Parishad was to be the:",
    options: ["District Collector", "District Judge", "Elected MLA", "Block Development Officer"],
    correct: "1",
    exptext: "✅ The District Collector. 📌 Under this model the three tiers were Gram Panchayat, Samiti, Parishad."
  },
  11: {
    type: "concept", icon: "📈", accent: "#8b5cf6", pauseTimer: true,
    title: "Ashok Mehta Committee (1977)",
    html: `
      <p class="cp-lead">The Ashok Mehta Committee replaced the three-tier model with a <b>two-tier</b> one.</p>
      <table><thead><tr><th>Point</th><th>Recommendation</th></tr></thead><tbody><tr><td>Model</td><td>Two-tier: Mandal Panchayat + Zila Parishad</td></tr><tr><td>Justice</td><td>Separate Nyaya Panchayats</td></tr><tr><td>Politics</td><td>SC/ST representation; party-based elections</td></tr><tr><td>Status</td><td>First to recommend constitutional status for PRIs</td></tr></tbody></table>
      <div class="cp-note trap">Balwant Rai Mehta = <b>three-tier</b> (1957); Ashok Mehta = <b>two-tier</b> (1977).</div>
    `
  },
  12: {
    questext: "Which committee first recommended constitutional status for PRIs and a two-tier system?",
    options: ["Balwant Rai Mehta", "G. V. K. Rao", "L. M. Singhvi", "Ashok Mehta"],
    correct: "4",
    exptext: "✅ Ashok Mehta Committee (1977). 📌 Two-tier: Mandal Panchayat plus Zila Parishad. ❌ Balwant Rai Mehta suggested three tiers."
  },
  13: {
    questext: "Which of the following was recommended by the Ashok Mehta Committee?",
    options: ["A three-tier system", "Mandal Panchayat and Zila Parishad", "A District Development Commissioner", "Non-party elections"],
    correct: "2",
    exptext: "✅ Mandal Panchayat and Zila Parishad. ❌ It recommended party-based elections; non-party elections came from Singhvi."
  },
  14: {
    type: "concept", icon: "🧩", accent: "#14b8a6", pauseTimer: true,
    title: "G. V. K. Rao (1985) & L. M. Singhvi (1986)",
    html: `
      <p class="cp-lead">Two later committees pushed Panchayati Raj closer to a <u>constitutional footing</u>.</p>
      <table><thead><tr><th>Committee</th><th>Key recommendations</th></tr></thead><tbody><tr><td>G. V. K. Rao (1985)</td><td>‘District Development Commissioner’ (above the Collector); representation for SC/ST, women and backward classes</td></tr><tr><td>L. M. Singhvi (1986)</td><td>Constitutional status; three-tier system; non-party elections; Panchayati Raj Tribunal; State Finance Commission and taxation power</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>Rao → Commissioner</b> · <b>Singhvi → Status + Finance Commission</b></div>
    `
  },
  15: {
    questext: "The post of ‘District Development Commissioner’ was recommended by:",
    options: ["Ashok Mehta", "L. M. Singhvi", "Balwant Rai Mehta", "G. V. K. Rao"],
    correct: "4",
    exptext: "✅ G. V. K. Rao (1985). 📌 The post sits above the Collector."
  },
  16: {
    questext: "Non-party elections and a Panchayati Raj Tribunal were recommended by:",
    options: ["G. V. K. Rao", "L. M. Singhvi", "Ashok Mehta", "Sarkaria"],
    correct: "2",
    exptext: "✅ L. M. Singhvi (1986). 📌 He also suggested a State Finance Commission. ❌ Ashok Mehta wanted party-based elections."
  },
  17: {
    type: "concept", icon: "🏛️", accent: "#ec4899", pauseTimer: true,
    title: "73rd Constitutional Amendment Act, 1992",
    html: `
      <p class="cp-lead">The <b>73rd Amendment</b> gave <u>constitutional status</u> to Panchayati Raj (during PM P. V. Narasimha Rao’s tenure).</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Presidential assent</td><td>20 April 1993</td></tr><tr><td>In force</td><td>24 April 1993 → National Panchayati Raj Day</td></tr><tr><td>Added</td><td>Part IX (‘The Panchayats’), Articles 243 – 243-O</td></tr><tr><td>Eleventh Schedule (Art. 243-G)</td><td>29 subjects</td></tr></tbody></table>
      <div class="cp-note trap">73rd = Panchayats, <b>29</b> subjects, <b>24 April</b>; 74th = Municipalities, <b>18</b> subjects, <b>1 June</b>.</div>
    `
  },
  18: {
    questext: "The 73rd Constitutional Amendment came into force on:",
    options: ["20 April 1993", "1 June 1993", "24 April 1993", "2 October 1992"],
    correct: "3",
    exptext: "✅ 24 April 1993, celebrated as National Panchayati Raj Day. ❌ 20 April is assent; 1 June 1993 is the 74th Amendment."
  },
  19: {
    questext: "How many subjects are listed in the Eleventh Schedule?",
    options: ["29", "18", "20", "24"],
    correct: "1",
    exptext: "✅ 29 (added via Art. 243-G). 📌 The Twelfth Schedule has 18, for municipalities."
  },
  20: {
    questext: "Part IX of the Constitution, ‘The Panchayats’, contains Articles:",
    options: ["243 to 243-O", "243-P to 243-ZG", "244 to 244A", "245 to 255"],
    correct: "1",
    exptext: "✅ Arts. 243 to 243-O. 📌 Part IX-A (Municipalities) has Arts. 243-P to 243-ZG."
  },
  21: {
    questext: "The 73rd Amendment was passed during the tenure of Prime Minister:",
    options: ["Rajiv Gandhi", "V. P. Singh", "P. V. Narasimha Rao", "Indira Gandhi"],
    correct: "3",
    exptext: "✅ P. V. Narasimha Rao. 📌 The 74th Amendment (municipalities) came in the same year, 1992."
  },
  22: {
    type: "concept", icon: "👥", accent: "#3b82f6", pauseTimer: true,
    title: "Gram Sabha & Three-Tier System",
    html: `
      <p class="cp-lead">The <b>Gram Sabha</b> is <u>not an elected body</u> — it consists of all registered voters of a village or group of villages, with powers set by State law.</p>
      <div class="cp-note info"><b>Art. 243-B:</b> population <b>above 20 lakh</b> → all three tiers; <b>below 20 lakh</b> → the intermediate tier is optional.</div>
      <table><thead><tr><th>Level</th><th>Structure (Art. 243-C)</th><th>Official head</th><th>How the head is chosen</th></tr></thead><tbody><tr><td>Village</td><td>Gram Panchayat</td><td>Pradhan / Mukhiya / Sarpanch</td><td>As State law provides (usually direct)</td></tr><tr><td>Block (Intermediate)</td><td>Kshetra Panchayat</td><td>Pramukh</td><td>Indirect</td></tr><tr><td>District</td><td>Zila Panchayat</td><td>Chairman / Chairperson</td><td>Indirect</td></tr></tbody></table>
    `
  },
  23: {
    questext: "Under Article 243-B, the intermediate tier is optional for States with population below:",
    options: ["10 lakh", "20 lakh", "30 lakh", "50 lakh"],
    correct: "2",
    exptext: "✅ 20 lakh. 📌 Above 20 lakh all three tiers are mandatory."
  },
  24: {
    questext: "Which statement about the Gram Sabha is correct?",
    options: ["It is an elected body of 15 members", "It is made up of ward members only", "Its members are nominated by the Governor", "It consists of all registered voters of the village or group of villages"],
    correct: "4",
    exptext: "✅ All registered voters. 📌 It is not an elected body; State law fixes its powers."
  },
  25: {
    questext: "The structure of Panchayats is provided in Article:",
    options: ["243-B", "243-C", "243-D", "243-G"],
    correct: "2",
    exptext: "✅ Art. 243-C (Gram, Kshetra, Zila). 📌 243-B is the three-tier system; 243-D reservation; 243-G powers."
  },
  26: {
    type: "concept", icon: "🎯", accent: "#f97316", pauseTimer: true,
    title: "Reservation & the Two Commissions",
    html: `
      <p class="cp-lead">Seats are reserved by <b>rotation</b>, and two commissions support Panchayats: the <u>State Finance Commission</u> and the <u>State Election Commission</u>.</p>
      <table><thead><tr><th>Provision</th><th>Rule</th></tr></thead><tbody><tr><td>SC/ST (Art. 243-D)</td><td>In proportion to population, by rotation (mandatory)</td></tr><tr><td>Women</td><td>Not less than 1/3 (33%); States may increase but not reduce; within SC/ST seats, 1/3 for their women</td></tr><tr><td>Backward Classes</td><td>Left to the State Legislature (discretionary)</td></tr><tr><td>State Finance Commission (Art. 243-I)</td><td>Constituted by the Governor every 5 years; report laid before the legislature</td></tr><tr><td>State Election Commission (Art. 243-K)</td><td>Headed by a State Election Commissioner appointed by the Governor; removed like a High Court judge</td></tr></tbody></table>
      <div class="cp-note remember">States like Bihar, Uttarakhand, MP and Himachal Pradesh give <b>50% reservation to women</b> in PRIs.</div>
    `
  },
  27: {
    questext: "The minimum reservation for women in Panchayats under Article 243-D is:",
    options: ["10%", "25%", "50%", "One-third"],
    correct: "4",
    exptext: "✅ Not less than one-third (33%). 📌 States may increase it; some give 50%. ❌ They cannot reduce it."
  },
  28: {
    questext: "The State Finance Commission (Art. 243-I) is constituted by the Governor every:",
    options: ["5 years", "3 years", "10 years", "2 years"],
    correct: "1",
    exptext: "✅ Every 5 years, to review Panchayat finances. 📌 Its report is laid before the legislature."
  },
  29: {
    questext: "The State Election Commissioner can be removed in the same manner as:",
    options: ["A Minister", "The Governor", "A High Court judge", "The Chief Secretary"],
    correct: "3",
    exptext: "✅ A High Court judge. 📌 Appointed by the Governor; conducts all Panchayat elections (Art. 243-K)."
  },
  30: {
    type: "concept", icon: "🌳", accent: "#84cc16", pauseTimer: true,
    title: "The Three Tiers in Detail",
    html: `
      <p class="cp-lead">Every tier has a <b>5-year term</b>, and every candidate must be at least <u>21 years</u> old.</p>
      <table><thead><tr><th>Tier</th><th>Key facts</th></tr></thead><tbody><tr><td>Gram Panchayat (Village)</td><td>Elections every 5 years on adult suffrage, conducted by the SEC; minimum age to contest = 21 years</td></tr><tr><td>Kshetra / Panchayat Samiti (Block)</td><td>Members directly elected; they elect the Chairperson; tenure 5 years (re-election within 6 months of dissolution)</td></tr><tr><td>Zila Panchayat / Parishad (District)</td><td>Members directly elected, Chairperson indirectly; ex-officio members: chairpersons of Panchayat Samitis, MPs and MLAs of the district</td></tr></tbody></table>
      <div class="cp-note trap">The minimum age to contest is <b>21</b> — not 18 or 25.</div>
    `
  },
  31: {
    questext: "The minimum age to contest Panchayat elections is:",
    options: ["18 years", "25 years", "21 years", "30 years"],
    correct: "3",
    exptext: "✅ 21 years. 📌 Same age applies to municipal elections."
  },
  32: {
    questext: "If a Panchayat is dissolved before its term ends, fresh elections must be held within:",
    options: ["6 months", "3 months", "1 year", "2 months"],
    correct: "1",
    exptext: "✅ 6 months of dissolution. 📌 The normal term is 5 years."
  },
  33: {
    type: "concept", icon: "🌿", accent: "#06b6d4", pauseTimer: true,
    title: "PESA Act, 1996 & Bhuria Committee",
    html: `
      <p class="cp-lead">The <b>PESA Act</b> extends Panchayats to <u>Scheduled (tribal) Areas</u>, based on the Bhuria Committee.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Bhuria Committee</td><td>June 1994; 22 members; headed by Dilip Singh Bhuria; studied Scheduled Areas</td></tr><tr><td>PESA Act, 1996</td><td>Panchayats (Extension to Scheduled Areas) Act; assent on 24 December 1996</td></tr><tr><td>Coverage</td><td>Fifth Schedule areas; originally 8 States, now 10 States</td></tr></tbody></table>
      <div class="cp-note trap">PESA = <b>1996</b>, Fifth Schedule; the 73rd Amendment = <b>1992</b>.</div>
    `
  },
  34: {
    questext: "The PESA Act (Panchayats Extension to Scheduled Areas) was enacted in:",
    options: ["1992", "1994", "1993", "1996"],
    correct: "4",
    exptext: "✅ 1996 (assent 24 December). 📌 Based on the Bhuria Committee (1994). ❌ 1992 is the 73rd Amendment."
  },
  35: {
    questext: "The Bhuria Committee (1994) studied:",
    options: ["Urban bodies", "Scheduled Areas", "Municipal finance", "Gram Sabha funds"],
    correct: "2",
    exptext: "✅ Scheduled Areas. 📌 Headed by Dilip Singh Bhuria; led to the PESA Act, 1996."
  },
  36: {
    questext: "PESA applies to the Scheduled Areas listed under which Schedule?",
    options: ["Sixth", "Fourth", "Eighth", "Fifth"],
    correct: "4",
    exptext: "✅ Fifth Schedule. 📌 Originally 8 States, now 10. ❌ The Sixth Schedule covers tribal areas of the North-East."
  },
  37: {
    type: "concept", icon: "🏙️", accent: "#a855f7", pauseTimer: true,
    title: "Urban Local Self-Government – History",
    html: `
      <p class="cp-lead">Ancient urban administration was described by <b>Megasthenes</b>; the modern story begins with the British.</p>
      <table><thead><tr><th>Year</th><th>Milestone</th></tr></thead><tbody><tr><td>1687–88</td><td>Madras Municipal Corporation — first modern urban body</td></tr><tr><td>1726</td><td>Corporations in Bombay &amp; Calcutta</td></tr><tr><td>1882</td><td>Ripon’s Resolution</td></tr><tr><td>1907</td><td>Hobhouse Royal Commission</td></tr><tr><td>1919</td><td>GoI Act — Transferred subject</td></tr><tr><td>1935</td><td>GoI Act — State List</td></tr></tbody></table>
      <div class="cp-note info">Lord Ripon is the ‘Father of Local Self-Government’ for <b>both rural and urban</b> systems.</div>
    `
  },
  38: {
    questext: "The first modern urban body in India (1687–88) was the:",
    options: ["Bombay Municipal Corporation", "Madras Municipal Corporation", "Calcutta Corporation", "Delhi Municipality"],
    correct: "2",
    exptext: "✅ Madras Municipal Corporation (British). 📌 Bombay and Calcutta Corporations came in 1726."
  },
  39: {
    type: "concept", icon: "🌇", accent: "#e11d48", pauseTimer: true,
    title: "74th Amendment & Municipalities",
    html: `
      <p class="cp-lead">The <b>74th Amendment Act, 1992</b> gave <u>constitutional status to Municipalities</u> and added Part IX-A.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>In force</td><td>1 June 1993</td></tr><tr><td>Part IX-A</td><td>‘The Municipalities’, Articles 243-P to 243-ZG</td></tr><tr><td>Twelfth Schedule</td><td>18 subjects</td></tr><tr><td>Nagar Panchayat (Art. 243-Q)</td><td>Transitional (rural → urban) area</td></tr><tr><td>Municipal Council</td><td>Smaller urban area</td></tr><tr><td>Municipal Corporation</td><td>Larger urban area</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>Nagar Panchayat → Council → Corporation</b> = small to big</div>
    `
  },
  40: {
    questext: "How many subjects are listed in the Twelfth Schedule?",
    options: ["29", "14", "18", "12"],
    correct: "3",
    exptext: "✅ 18, for Municipalities. 📌 The Eleventh Schedule has 29 for Panchayats."
  },
  41: {
    questext: "The 74th Amendment added which Part to the Constitution?",
    options: ["Part IX-A", "Part IX", "Part X", "Part XI"],
    correct: "1",
    exptext: "✅ Part IX-A (Arts. 243-P to 243-ZG). ❌ Part IX is for Panchayats."
  },
  42: {
    questext: "A transitional area (rural to urban) is governed by a:",
    options: ["Nagar Panchayat", "Municipal Council", "Municipal Corporation", "Cantonment Board"],
    correct: "1",
    exptext: "✅ Nagar Panchayat (Art. 243-Q). 📌 Council = smaller urban area; Corporation = larger."
  },
  43: {
    type: "concept", icon: "🗳️", accent: "#10b981", pauseTimer: true,
    title: "Composition & Reservation",
    html: `
      <p class="cp-lead">Municipalities follow the same principles as Panchayats: <b>direct elections</b>, <u>reservation</u> and a <b>5-year term</b>.</p>
      <table><thead><tr><th>Article</th><th>Provision</th></tr></thead><tbody><tr><td>243-R</td><td>Direct elections for all seats; Chairperson directly or indirectly (State decides); term 5 years; SEC conducts elections</td></tr><tr><td>243-S</td><td>Ward Committees for areas with population 3 lakh or more</td></tr><tr><td>243-T</td><td>SC/ST in proportion to population; women 1/3 (33%)</td></tr><tr><td>243-ZA</td><td>State Election Commission supervises municipal elections</td></tr><tr><td>243-ZG</td><td>Courts barred from interfering in electoral matters</td></tr></tbody></table>
    `
  },
  44: {
    questext: "Ward Committees (Art. 243-S) are formed in municipalities with population of:",
    options: ["1 lakh or more", "2 lakh or more", "3 lakh or more", "10 lakh or more"],
    correct: "3",
    exptext: "✅ 3 lakh or more. 📌 Art. 243-T gives women one-third reservation."
  },
  45: {
    questext: "Courts are barred from interfering in municipal electoral matters by Article:",
    options: ["243-ZD", "243-ZG", "243-T", "243-R"],
    correct: "2",
    exptext: "✅ Art. 243-ZG. 📌 243-ZD is the District Planning Committee. ❌ 243-T is reservation."
  },
  46: {
    type: "concept", icon: "🗺️", accent: "#eab308", pauseTimer: true,
    title: "Planning Committees",
    html: `
      <p class="cp-lead">Two committees bring Panchayat and Municipal plans together.</p>
      <table><thead><tr><th>Committee</th><th>Article</th><th>Rule</th></tr></thead><tbody><tr><td>District Planning Committee</td><td>243-ZD</td><td>For each district; consolidates the plans of Panchayats and Municipalities; at least 4/5 members elected</td></tr><tr><td>Metropolitan Planning Committee</td><td>243-ZE</td><td>For each metropolitan area; at least 2/3 members elected</td></tr></tbody></table>
      <div class="cp-mnemonic"><b>D = 4/5 · M = 2/3</b> — District 4/5, Metro 2/3</div>
    `
  },
  47: {
    questext: "At least what fraction of members of a District Planning Committee must be elected?",
    options: ["1/3", "1/2", "2/3", "4/5"],
    correct: "4",
    exptext: "✅ 4/5 (Art. 243-ZD). 📌 It consolidates Panchayat and Municipal plans. ❌ 2/3 is for the Metropolitan Committee."
  },
  48: {
    questext: "A Metropolitan Planning Committee (Art. 243-ZE) must have at least ___ of its members elected.",
    options: ["4/5", "2/3", "1/2", "1/3"],
    correct: "2",
    exptext: "✅ 2/3. 📌 One committee for each metropolitan area."
  },
  49: {
    type: "concept", icon: "⚙️", accent: "#0ea5e9", pauseTimer: true,
    title: "73rd & 74th Amendments – Mandatory vs Discretionary",
    html: `
      <p class="cp-lead">Some provisions are <b>compulsory</b> for every State; others are left to the <u>State Legislature</u>.</p>
      <table><thead><tr><th>Mandatory (both Amendments)</th><th>Discretionary (State decides)</th></tr></thead><tbody><tr><td>Fixed 5-year term; re-election within 6 months</td><td>Which 11th / 12th Schedule subjects to devolve</td></tr><tr><td>Minimum age to contest = 21 years</td><td>Taxation powers and grants</td></tr><tr><td>SC/ST reservation in proportion to population</td><td>OBC reservation and its extent</td></tr><tr><td>Minimum 1/3 reservation for women</td><td>Women’s reservation beyond one-third</td></tr><tr><td>State Election Commission and State Finance Commission</td><td>MPs and MLAs in intermediate / district Panchayats (73rd); persons experienced in administration (74th)</td></tr></tbody></table>
      <div class="cp-note trap"><b>Taxation powers, OBC reservation and devolution of subjects</b> are discretionary — not compulsory.</div>
    `
  },
  50: {
    questext: "Which of the following is a DISCRETIONARY provision of the 73rd Amendment?",
    options: ["Constitution of the Gram Sabha", "The three-tier system", "A fixed 5-year term", "Reservation for OBCs"],
    correct: "4",
    exptext: "✅ OBC reservation (and its extent) is left to the State. 📌 5-year term, three tiers, SC/ST and women reservation are mandatory."
  },
  51: {
    questext: "Which provision is MANDATORY under both the 73rd and 74th Amendments?",
    options: ["A fixed 5-year term with re-election within 6 months", "Taxation powers for local bodies", "OBC reservation", "Devolution of all Schedule subjects"],
    correct: "1",
    exptext: "✅ Fixed term; fresh election within 6 months of dissolution. ❌ Taxation, OBC reservation, devolution are discretionary."
  },
  52: {
    questext: "Which of the following is left to the discretion of the State Legislature?",
    options: ["Reservation for SCs", "Minimum age of 21", "Which 11th Schedule subjects to devolve", "Setting up a State Election Commission"],
    correct: "3",
    exptext: "✅ Which subjects to devolve. 📌 SC reservation, age 21 and SEC are mandatory."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Polity/Local_Self_Government/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a softly blurred village panchayat building, a brushed-metal ballot box and a rolled parchment scroll" }
});

/* CHANGE LOG
   - Gram Sabha: it consists of all registered voters of a village or group of villages, with powers set by State law (book said it is notified by the Governor).
   - Panchayat Samiti members are directly elected, the Chairperson indirectly (book said elected by the Gram Sabha); removed the unclear ‘largest body / 50–75 members’ figures for the Zila Parishad.
   - Village Panchayat head: the mode of election is decided by State law (usually direct); block and district heads are elected indirectly.
   - Art. 243-ZA: the State Election Commission supervises municipal elections (book said ‘State makes election laws’).
   - Balwant Rai Mehta Committee was set up under the Committee on Plan Projects of the Planning Commission.
*/