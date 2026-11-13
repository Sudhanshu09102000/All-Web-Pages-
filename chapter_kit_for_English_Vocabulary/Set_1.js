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
    return "Create a 16:9 image, 1200×675 px: a clean flat vector diagram on a dark navy background. " + d + " Use very few labels in exact short English, VERY LARGE bold text, thick lines and simple shapes, so it stays readable when shown small (about 420 px wide). no logos, no watermarks. If it is geography, draw a schematic, not a realistic map.";
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

/* ═══ SNIPPET 3 — put right after SNIPPET 2 ═══ */
/* ── SPEAKER SNIPPET: a premium speaker button sits right beside the word on every vocabulary page; click it to hear the word pronounced ── */
(function () {
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
  var synth = window.speechSynthesis;
  var MARK = "data-speak-btn";

  var css = [
    ".spk-btn{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;",
    "width:46px;height:46px;margin-left:16px;border-radius:50%;cursor:pointer;position:relative;flex:none;",
    "background:radial-gradient(circle at 30% 24%,rgba(255,255,255,.55) 0,rgba(255,255,255,0) 46%),linear-gradient(145deg,var(--spk-a,#6366f1),var(--spk-b,#3730a3));",
    "box-shadow:0 10px 22px -8px var(--spk-a,#6366f1),0 2px 4px rgba(0,0,0,.22),inset 0 1px 1px rgba(255,255,255,.65),inset 0 -3px 6px rgba(0,0,0,.22);",
    "border:1px solid rgba(255,255,255,.35);transition:transform .18s ease,box-shadow .18s ease,filter .18s ease;-webkit-tap-highlight-color:transparent}",
    ".spk-btn:hover{transform:translateY(-2px) scale(1.06);filter:brightness(1.08)}",
    ".spk-btn:active{transform:scale(.94)}",
    ".spk-btn:focus-visible{outline:3px solid #2563eb;outline-offset:3px}",
    ".spk-btn svg{width:24px;height:24px;display:block;overflow:visible;filter:drop-shadow(0 1px 1px rgba(0,0,0,.35))}",
    ".spk-btn svg *{fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}",
    ".spk-btn svg .spk-body{fill:#fff}",
    ".spk-btn .spk-w2{opacity:.55}",
    ".spk-btn.spk-on{animation:spkPulse 1.3s ease-out infinite}",
    ".spk-btn.spk-on .spk-w1{animation:spkWave 0.9s ease-in-out infinite}",
    ".spk-btn.spk-on .spk-w2{animation:spkWave 0.9s ease-in-out .2s infinite}",
    "@keyframes spkWave{0%,100%{opacity:.25}50%{opacity:1}}",
    "@keyframes spkPulse{0%{box-shadow:0 10px 22px -8px var(--spk-a,#6366f1),0 0 0 0 var(--spk-a,#6366f1),inset 0 1px 1px rgba(255,255,255,.65),inset 0 -3px 6px rgba(0,0,0,.22)}",
    "100%{box-shadow:0 10px 22px -8px var(--spk-a,#6366f1),0 0 0 16px rgba(255,255,255,0),inset 0 1px 1px rgba(255,255,255,.65),inset 0 -3px 6px rgba(0,0,0,.22)}}",
    "html.lite-mode .spk-btn{background:#000!important;border:2px solid #000!important;box-shadow:none!important}",
    "html.lite-mode .spk-btn:hover{background:#262626!important}",
    "@media (max-width:520px){.spk-btn{width:40px;height:40px;margin-left:12px}.spk-btn svg{width:21px;height:21px}}"
  ].join("");
  var st = document.createElement("style");
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  var SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path class="spk-body" d="M4 9.5v5h3.4l4.6 3.8V5.7L7.4 9.5H4z"/>' +
    '<path class="spk-w1" d="M15.2 9.2a4 4 0 0 1 0 5.6"/>' +
    '<path class="spk-w2" d="M17.9 6.6a7.7 7.7 0 0 1 0 10.8"/></svg>';

  /* ── voice: prefer a natural-sounding English voice ── */
  var voice = null;
  function pickVoice() {
    var vs = synth.getVoices() || [], best = null, bestScore = -1;
    vs.forEach(function (v) {
      if (!/^en[-_]/i.test(v.lang)) return;
      var s = 1, n = v.name || "";
      if (/en[-_](US|GB|IN)/i.test(v.lang)) s += 2;
      if (/natural|neural|online/i.test(n)) s += 6;
      if (/google|samantha|daniel|karen|aria|jenny|guy|ryan|libby/i.test(n)) s += 4;
      if (/female|zira|david/i.test(n)) s += 1;
      if (s > bestScore) { bestScore = s; best = v; }
    });
    voice = best;
  }
  pickVoice();
  if (synth.addEventListener) synth.addEventListener("voiceschanged", pickVoice);

  /* ── which texts count as concept titles ── */
  function titles() {
    var map = {}, d = window.TEST_DATA, k, t;
    if (!d) return map;
    for (k in d) {
      if (d[k] && d[k].type === "concept" && d[k].title && d[k].title.length < 40 && /cp-vocab/.test(d[k].html || "")) {
        t = d[k].title.trim();
        map[t.toLowerCase()] = t;
      }
    }
    return map;
  }

  function accentOf(host) {
    var scope = host.closest("#conceptBox") || document.body, c = "";
    var pill = scope.querySelector(".cp-vocab .cp-pos") || scope.querySelector(".cp-vocab span");
    if (pill) c = getComputedStyle(pill).backgroundColor;
    if (!c || /rgba\(0, 0, 0, 0\)|transparent/.test(c)) c = "#6366f1";
    return c;
  }
  function darker(css) {
    var m = css.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
    if (!m) return "#3730a3";
    return "rgb(" + Math.round(m[1] * .62) + "," + Math.round(m[2] * .62) + "," + Math.round(m[3] * .62) + ")";
  }

  var current = null;
  function stop() {
    try { synth.cancel(); } catch (e) {}
    if (current) { current.classList.remove("spk-on"); current = null; }
  }
  function speak(btn) {
    var word = btn.getAttribute("data-word") || "";
    if (!word) return;
    if (current === btn) { stop(); return; }
    stop();
    var u = new SpeechSynthesisUtterance(word);
    u.lang = (voice && voice.lang) || "en-US";
    if (voice) u.voice = voice;
    u.rate = 0.85;
    u.pitch = 1;
    function done() { btn.classList.remove("spk-on"); if (current === btn) current = null; }
    u.onend = done;
    u.onerror = done;
    current = btn;
    btn.classList.add("spk-on");
    synth.speak(u);
  }

  /* ── find the big title text on the page and place the button right after it ── */
  var queued = false;
  function sweep() {
    var map = titles();
    if (!document.body) return;
    var existing = document.querySelectorAll("[" + MARK + "]");
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, host = null, word = "";
    while ((n = w.nextNode())) {
      var txt = (n.nodeValue || "").trim().toLowerCase();
      if (!txt || !map[txt]) continue;
      var el = n.parentElement;
      if (!el || el.closest(".cp-vocab,.cpm,[" + MARK + "],button,option,label")) continue;
      if (parseFloat(getComputedStyle(el).fontSize) < 22) continue;
      host = el; word = map[txt]; break;
    }
    Array.prototype.forEach.call(existing, function (b) {
      if (!host || b.parentElement !== host || b.getAttribute("data-word") !== word) {
        if (current === b) stop();
        b.remove();
      }
    });
    if (!host || host.querySelector("[" + MARK + "]")) return;
    var scopeAcc = accentOf(host);
    var b = document.createElement("button");
    b.type = "button";
    b.className = "spk-btn";
    b.setAttribute(MARK, "1");
    b.setAttribute("data-word", word);
    b.setAttribute("translate", "no");
    b.setAttribute("aria-label", "Listen to the pronunciation of " + word);
    b.title = "Listen";
    b.style.setProperty("--spk-a", scopeAcc);
    b.style.setProperty("--spk-b", darker(scopeAcc));
    b.innerHTML = SVG;
    host.appendChild(b);
  }
  function queue() {
    if (queued) return;
    queued = true;
    (window.requestAnimationFrame || setTimeout)(function () { queued = false; try { sweep(); } catch (e) {} });
  }

  /* window-level capture listener, so the page's own handlers can't swallow the click */
  window.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[" + MARK + "]") : null;
    if (!b) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    speak(b);
  }, true);
  try { new MutationObserver(queue).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  window.addEventListener("beforeunload", stop);
  queue();
})();

/* Field: English · Subject: Vocabulary · Chapter: Vocab_Set_1 · 80 concept pages (+ overview) · 80 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📚", accent: "#6366f1", pauseTimer: true,
    title: "Vocabulary Set 1 — One Word Substitution, Confusing Words & Word Power",
    thumb: {
      image: "images/English/Vocabulary/Vocab_Set_1/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "VOCAB",
      line2: "SET 1",
      line3: "80 WORDS WITH PICTURES",
      badge: "FULL CLASS",
      ribbon: "MEANING • HINDI • SYNONYMS • ANTONYMS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Vocabulary Set 1 | 80 Words with Meaning, Hindi, Synonyms, Antonyms | One Word Substitution",
      altTitles: ["80 Important English Vocabulary Words With Pictures", "One Word Substitution + Confusing Words for SSC Banking UPSC"],
      description: "Learn exam vocabulary the smart way: 80 words, each with meaning, Hindi meaning, part of speech, synonyms, antonyms, 3 example sentences and a picture to remember it.\n\n📌 IN THIS CLASS\n✅ calligrapher, philatelist, numismatist, phobias, lexicographer, etymology\n✅ orator, demagogue, pedagogue, eloquent, harbinger, herald\n✅ jargon, argot, dialect, tautology, epitaph, epitome\n✅ stoic, sanguine, recluse, ascetic, mystic, charlatan\n✅ imminent, eminent, allusion, illusion, elude, reverie, euphoria\n✅ 1 practice question per word\n\n#Vocabulary #SSCCGL #English",
      tags: ["english vocabulary", "vocabulary for all exams", "one word substitution", "synonyms and antonyms", "hindi meaning", "vocab with pictures", "confusing words", "SSC CGL vocabulary", "banking vocabulary", "UPSC vocabulary", "phobias list", "imminent eminent", "allusion illusion", "word meaning in hindi", "daily vocabulary", "vocabulary tricks", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "vocabulary", "word meaning", "synonyms antonyms", "important questions"],
      hashtags: ["Vocabulary", "SSCCGL", "English"],
      thumbText: "VOCAB SET 1",
      pinnedComment: "📌 Which word was new for you? Comment below 👇",
      communityPost: "📚 New vocab class is live: 80 words with pictures. Try the questions! 🎯",
      chapters: "00:00 Class overview\n00:00 Words 1-16\n00:00 Words 17-32\n00:00 Words 33-48\n00:00 Words 49-64\n00:00 Words 65-80",
      playlist: "Daily Vocabulary — Competitive Exams"
    },
    html: `
      <p class="cp-lead">A <u>picture-based vocabulary class</u> of 80 exam favourites — each word comes with meaning, Hindi meaning, synonyms, antonyms and 3 sentences.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>80</b><span>Words</span></div>
        <div class="cp-stat"><b>80</b><span>Questions</span></div>
        <div class="cp-stat"><b>~240 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Words 1–8</b><br>calligrapher, cacography, cartographer, philatelist, archivist, numismatist, mint, nyctophobia</li>
        <li><b>Words 9–16</b><br>agoraphobia, xenophobia, gynophobia, digamist, claustrophobia, lexicographer, etymology, entomology</li>
        <li><b>Words 17–24</b><br>philologist, neology, paleographer, coinage, orator, demagogue, pedagogue, synagogue</li>
        <li><b>Words 25–32</b><br>eloquent, harbinger, herald, emissary, archaism, jargon, argot, neologism</li>
        <li><b>Words 33–40</b><br>colloquialism, dialect, non sequitur, equivocation, tautology, almanac, chronicle, ledger</li>
        <li><b>Words 41–48</b><br>epigrapher, epitaph, epitome, epilogue, stoic, sanguine, anchorite, recluse</li>
        <li><b>Words 49–56</b><br>ascetic, recline, mystic, charlatan, masquerade, omniscient, ubiquitous, immanent</li>
        <li><b>Words 57–64</b><br>imminent, eminent, impasse, quagmire, pyrrhic, impromptu, extempore, pedant</li>
        <li><b>Words 65–72</b><br>surrealism, verism, veracity, masochist, sadist, savant, virtuoso, allusion</li>
        <li><b>Words 73–80</b><br>elusion, illusion, elude, anarchist, realist, jingoistic, reverie, euphoria</li>
        <li><b>Practice</b><br>1 question after every word.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> one-word substitution, synonym, antonym and confusing-word questions (imminent/eminent, allusion/illusion) appear in every English paper.</div>
    `
  },
  2: {
    type: "concept", icon: "✒️", accent: "#3162d8", pauseTimer: true,
    title: "Calligrapher",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#3162d8,#3162d877,#f6dc9577);box-shadow:0 14px 30px -14px #3162d899,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/1.png" alt="Picture for the word calligrapher" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#3162d814"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#3162d8;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/kəˈlɪɡrəfər/</span></div>
      <div style="border-left:4px solid #3162d8;background:#3162d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#3162d8;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who is skilled in beautiful, artistic handwriting</p></div>
      <div style="border-left:4px solid #3162d8;background:#3162d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#3162d8;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">सुलेखक, सुंदर लिखने वाला</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">penman</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">scribe</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">letterer</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">handwriting artist</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#3162d8;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3162d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>calligrapher</b> dipped her pen carefully and wrote the invitation in flowing letters. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #3162d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3162d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The museum hired a <b>calligrapher</b> to copy the old poem onto a scroll.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #3162d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3162d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>A gifted <b>calligrapher</b>, he turned every word into a small work of art.</span></div></div>
      </div>
    `
  },
  3: {
    questext: "A person famous for beautiful handwriting is called a ______.",
    options: ["cartographer", "calligrapher", "archivist", "lexicographer"],
    correct: "2",
    exptext: "✅ Calligrapher means an artist of beautiful handwriting. 📌 Calli = beauty, graph = write. ❌ A cartographer draws maps."
  },
  4: {
    type: "concept", icon: "📝", accent: "#a0dd4b", pauseTimer: true,
    title: "Cacography",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#a0dd4b,#a0dd4b77,#f6dc9577);box-shadow:0 14px 30px -14px #a0dd4b99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/2.png" alt="Picture for the word cacography" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#a0dd4b14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#a0dd4b;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/kəˈkɒɡrəfi/</span></div>
      <div style="border-left:4px solid #a0dd4b;background:#a0dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#a0dd4b;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">bad handwriting or bad spelling</p></div>
      <div style="border-left:4px solid #a0dd4b;background:#a0dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#a0dd4b;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">बुरी लिखावट, गलत वर्तनी</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">bad handwriting</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">scrawl</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">illegible writing</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">poor spelling</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">calligraphy</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">neat writing</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#a0dd4b;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#a0dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The doctor's <b>cacography</b> made the prescription impossible for the chemist to read. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #a0dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#a0dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Teachers marked down his essay for constant <b>cacography</b> and spelling errors.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #a0dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#a0dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Her early letters show a childish <b>cacography</b> that later became elegant.</span></div></div>
      </div>
    `
  },
  5: {
    questext: "Choose the OPPOSITE of \"cacography\".",
    options: ["scrawl", "scribble", "cartography", "calligraphy"],
    correct: "4",
    exptext: "✅ Calligraphy is beautiful writing, the opposite of bad writing. 📌 Caco = bad. ❌ Scrawl is a synonym."
  },
  6: {
    type: "concept", icon: "🗺️", accent: "#c526b1", pauseTimer: true,
    title: "Cartographer",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#c526b1,#c526b177,#f6dc9577);box-shadow:0 14px 30px -14px #c526b199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/3.png" alt="Picture for the word cartographer" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#c526b114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#c526b1;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/kɑːˈtɒɡrəfər/</span></div>
      <div style="border-left:4px solid #c526b1;background:#c526b114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c526b1;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who draws or makes maps</p></div>
      <div style="border-left:4px solid #c526b1;background:#c526b114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c526b1;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">मानचित्रकार, नक्शा बनाने वाला</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">mapmaker</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">chart maker</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">map designer</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c526b1;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c526b1;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>cartographer</b> carefully marked every river and mountain on the new district map.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c526b133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c526b1;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Satellite images help a modern <b>cartographer</b> update city maps within days. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c526b133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c526b1;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Old sailors trusted the <b>cartographer</b> whose charts had guided many ships across the ocean.</span></div></div>
      </div>
    `
  },
  7: {
    questext: "The ______ spent months drawing an accurate map of the new coastline.",
    options: ["cartographer", "philatelist", "numismatist", "archivist"],
    correct: "1",
    exptext: "✅ A cartographer makes maps. 📌 Carto = map. ❌ A philatelist collects stamps, not maps."
  },
  8: {
    type: "concept", icon: "📮", accent: "#31d8bc", pauseTimer: true,
    title: "Philatelist",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#31d8bc,#31d8bc77,#f6dc9577);box-shadow:0 14px 30px -14px #31d8bc99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/4.png" alt="Picture for the word philatelist" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#31d8bc14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#31d8bc;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/fɪˈlætəlɪst/</span></div>
      <div style="border-left:4px solid #31d8bc;background:#31d8bc14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d8bc;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who collects or studies postage stamps</p></div>
      <div style="border-left:4px solid #31d8bc;background:#31d8bc14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d8bc;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">डाक टिकट संग्राहक</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">stamp collector</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">stamp hobbyist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">stamp enthusiast</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d8bc;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d8bc;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>My grandfather, a keen <b>philatelist</b>, kept thousands of stamps in neat albums.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31d8bc33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d8bc;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The <b>philatelist</b> paid a huge sum for a rare stamp at the auction. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31d8bc33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d8bc;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Every <b>philatelist</b> knows that a tiny printing error can make a stamp priceless.</span></div></div>
      </div>
    `
  },
  9: {
    questext: "What do you call someone who collects postage stamps?",
    options: ["numismatist", "archivist", "philatelist", "calligrapher"],
    correct: "3",
    exptext: "✅ Philatelist collects stamps. 📌 Phila-TELL-ist: tell the post. ❌ A numismatist collects coins."
  },
  10: {
    type: "concept", icon: "🗄️", accent: "#dd9a4b", pauseTimer: true,
    title: "Archivist",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#dd9a4b,#dd9a4b77,#f6dc9577);box-shadow:0 14px 30px -14px #dd9a4b99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/5.png" alt="Picture for the word archivist" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#dd9a4b14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#dd9a4b;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈɑːkɪvɪst/</span></div>
      <div style="border-left:4px solid #dd9a4b;background:#dd9a4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd9a4b;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who looks after old records and important documents</p></div>
      <div style="border-left:4px solid #dd9a4b;background:#dd9a4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd9a4b;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">अभिलेखपाल, दस्तावेज़ संरक्षक</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">record keeper</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">curator</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">custodian</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">registrar</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd9a4b;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd9a4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>archivist</b> found a letter from 1857 hidden inside an old government file.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd9a4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd9a4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>As the city <b>archivist</b>, she protects thousands of records from damp and insects.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd9a4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd9a4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>No historian can work without the patient help of a good <b>archivist</b>. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  11: {
    questext: "Which sentence uses \"archivist\" correctly?",
    options: ["The archivist painted a map of the sea.", "The archivist drew new stamps for the post office.", "The archivist wrote wedding cards in fancy letters.", "The archivist stored old records safely in the library."],
    correct: "4",
    exptext: "✅ An archivist keeps old records safe. 📌 Archive = record room. ❌ Writing fancy letters is a calligrapher's work."
  },
  12: {
    type: "concept", icon: "🪙", accent: "#4d26c5", pauseTimer: true,
    title: "Numismatist",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4d26c5,#4d26c577,#f6dc9577);box-shadow:0 14px 30px -14px #4d26c599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/6.png" alt="Picture for the word numismatist" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4d26c514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4d26c5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/njuːˈmɪzmətɪst/</span></div>
      <div style="border-left:4px solid #4d26c5;background:#4d26c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4d26c5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who collects or studies coins and medals</p></div>
      <div style="border-left:4px solid #4d26c5;background:#4d26c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4d26c5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">सिक्का संग्राहक, मुद्राशास्त्री</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">coin collector</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">coin expert</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">coin hobbyist</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4d26c5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4d26c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>numismatist</b> examined the ancient silver coin under a bright lamp. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4d26c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4d26c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>A museum invited the <b>numismatist</b> to date the coins found at the excavation site.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4d26c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4d26c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The young <b>numismatist</b> proudly showed his collection of coins from many nations.</span></div></div>
      </div>
    `
  },
  13: {
    questext: "Which word means a person who collects coins?",
    options: ["philatelist", "numismatist", "archivist", "cartographer"],
    correct: "2",
    exptext: "✅ Numismatist collects coins. 📌 Numis = coin (like \"numismatic\"). ❌ Philatelist collects stamps."
  },
  14: {
    type: "concept", icon: "🏭", accent: "#38d831", pauseTimer: true,
    title: "Mint",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#38d831,#38d83177,#f6dc9577);box-shadow:0 14px 30px -14px #38d83199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/7.png" alt="Picture for the word mint" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#38d83114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#38d831;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/mɪnt/</span></div>
      <div style="border-left:4px solid #38d831;background:#38d83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#38d831;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a place where the government makes coins</p></div>
      <div style="border-left:4px solid #38d831;background:#38d83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#38d831;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">टकसाल</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">coin factory</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">coin works</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">coining house</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#38d831;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#38d831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Machines at the <b>mint</b> stamp thousands of shiny new coins every hour.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #38d83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#38d831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The finance minister visited the <b>mint</b> to see how new coins are made. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #38d83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#38d831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Visitors to the <b>mint</b> watched gleaming metal discs turn into currency before their eyes.</span></div></div>
      </div>
    `
  },
  15: {
    questext: "Coins are produced at the government ______.",
    options: ["mint", "ledger", "almanac", "chronicle"],
    correct: "1",
    exptext: "✅ A mint is where coins are made. 📌 Mint = money factory. ❌ A ledger is a book of accounts."
  },
  16: {
    type: "concept", icon: "🌑", accent: "#dd4b7c", pauseTimer: true,
    title: "Nyctophobia",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#dd4b7c,#dd4b7c77,#f6dc9577);box-shadow:0 14px 30px -14px #dd4b7c99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/8.png" alt="Picture for the word nyctophobia" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#dd4b7c14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#dd4b7c;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌnɪktəˈfəʊbiə/</span></div>
      <div style="border-left:4px solid #dd4b7c;background:#dd4b7c14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4b7c;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an extreme fear of darkness or night</p></div>
      <div style="border-left:4px solid #dd4b7c;background:#dd4b7c14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4b7c;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">अंधेरे का डर, रात का भय</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of darkness</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">scotophobia</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of night</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4b7c;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4b7c;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Because of her <b>nyctophobia</b>, Riya always sleeps with a small lamp switched on. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd4b7c33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4b7c;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The doctor said his <b>nyctophobia</b> began after a long power cut in childhood.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd4b7c33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4b7c;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span><b>Nyctophobia</b> gripped the traveller as the forest path faded into total blackness.</span></div></div>
      </div>
    `
  },
  17: {
    questext: "Fear of darkness is called ______.",
    options: ["agoraphobia", "claustrophobia", "nyctophobia", "xenophobia"],
    correct: "3",
    exptext: "✅ Nyctophobia is fear of the dark. 📌 Nyct = night. ❌ Claustrophobia is fear of closed spaces."
  },
  18: {
    type: "concept", icon: "🏙️", accent: "#2689c5", pauseTimer: true,
    title: "Agoraphobia",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#2689c5,#2689c577,#f6dc9577);box-shadow:0 14px 30px -14px #2689c599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/9.png" alt="Picture for the word agoraphobia" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#2689c514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#2689c5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌæɡərəˈfəʊbiə/</span></div>
      <div style="border-left:4px solid #2689c5;background:#2689c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#2689c5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an extreme fear of open or crowded public places</p></div>
      <div style="border-left:4px solid #2689c5;background:#2689c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#2689c5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">खुली जगह का डर, भीड़ का डर</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of open spaces</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of crowds</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of public places</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#2689c5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#2689c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>His <b>agoraphobia</b> made even a short walk to the busy market feel terrifying.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #2689c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#2689c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The counsellor treated her <b>agoraphobia</b> by slowly increasing the time she spent outdoors.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #2689c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#2689c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Suffering from <b>agoraphobia</b>, the poet rarely left his small room for years. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  19: {
    questext: "He avoided markets and crowded streets because of his ______.",
    options: ["nyctophobia", "agoraphobia", "claustrophobia", "gynophobia"],
    correct: "2",
    exptext: "✅ Agoraphobia is fear of open, crowded places. 📌 Agora = marketplace. ❌ Claustrophobia is fear of closed spaces."
  },
  20: {
    type: "concept", icon: "🌍", accent: "#cad831", pauseTimer: true,
    title: "Xenophobia",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#cad831,#cad83177,#f6dc9577);box-shadow:0 14px 30px -14px #cad83199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/10.png" alt="Picture for the word xenophobia" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#cad83114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#cad831;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌzenəˈfəʊbiə/</span></div>
      <div style="border-left:4px solid #cad831;background:#cad83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#cad831;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a strong dislike or fear of foreigners and strangers</p></div>
      <div style="border-left:4px solid #cad831;background:#cad83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#cad831;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">विदेशियों से घृणा, विदेशी-भय</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of foreigners</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">intolerance</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">bigotry</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">prejudice</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">tolerance</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">acceptance</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">friendliness</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#cad831;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#cad831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Leaders must stand firmly against <b>xenophobia</b> whenever migrants are blamed for every problem.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #cad83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#cad831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The film shows how <b>xenophobia</b> slowly poisoned a once-friendly town. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #cad83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#cad831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Her kindness towards new neighbours showed that she had no trace of <b>xenophobia</b>.</span></div></div>
      </div>
    `
  },
  21: {
    questext: "Choose the OPPOSITE of \"xenophobia\".",
    options: ["tolerance", "prejudice", "bigotry", "hostility"],
    correct: "1",
    exptext: "✅ Tolerance means accepting others. 📌 Xeno = stranger. ❌ Prejudice and bigotry are close to xenophobia, not opposite."
  },
  22: {
    type: "concept", icon: "👩", accent: "#be4bdd", pauseTimer: true,
    title: "Gynophobia",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#be4bdd,#be4bdd77,#f6dc9577);box-shadow:0 14px 30px -14px #be4bdd99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/11.png" alt="Picture for the word gynophobia" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#be4bdd14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#be4bdd;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌɡaɪnəˈfəʊbiə/</span></div>
      <div style="border-left:4px solid #be4bdd;background:#be4bdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#be4bdd;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an extreme fear of women</p></div>
      <div style="border-left:4px solid #be4bdd;background:#be4bdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#be4bdd;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">महिलाओं का डर, स्त्री-भय</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of women</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">dread of women</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of females</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#be4bdd;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#be4bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>His <b>gynophobia</b> made him nervous even when a woman simply asked him for directions. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #be4bdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#be4bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The psychologist explained that <b>gynophobia</b> is a real fear, not just shyness.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #be4bdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#be4bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>In the novel, the lonely hero's <b>gynophobia</b> keeps him away from every ball and dance.</span></div></div>
      </div>
    `
  },
  23: {
    questext: "The fear of women is called ______.",
    options: ["agoraphobia", "nyctophobia", "xenophobia", "gynophobia"],
    correct: "4",
    exptext: "✅ Gynophobia is fear of women. 📌 Gyno = woman. ❌ Xenophobia is fear of foreigners."
  },
  24: {
    type: "concept", icon: "💍", accent: "#26c575", pauseTimer: true,
    title: "Digamist",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#26c575,#26c57577,#f6dc9577);box-shadow:0 14px 30px -14px #26c57599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/12.png" alt="Picture for the word digamist" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#26c57514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#26c575;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈdɪɡəmɪst/</span></div>
      <div style="border-left:4px solid #26c575;background:#26c57514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c575;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who marries for the second time</p></div>
      <div style="border-left:4px solid #26c575;background:#26c57514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c575;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">दूसरा विवाह करने वाला</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">remarried person</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">twice-wed person</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">second-time spouse</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c575;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c575;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>After his wife passed away, he became a <b>digamist</b> by marrying a kind neighbour.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c57533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c575;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The register listed him as a <b>digamist</b>, since this was his second marriage.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c57533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c575;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>In the old story, the king, a <b>digamist</b>, brought a new queen to the palace. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  25: {
    questext: "One who marries for the second time is called a ______.",
    options: ["numismatist", "orator", "digamist", "calligrapher"],
    correct: "3",
    exptext: "✅ A digamist marries a second time. 📌 Di = two, gamy = marriage. ❌ A numismatist collects coins."
  },
  26: {
    type: "concept", icon: "🚪", accent: "#d85431", pauseTimer: true,
    title: "Claustrophobia",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d85431,#d8543177,#f6dc9577);box-shadow:0 14px 30px -14px #d8543199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/13.png" alt="Picture for the word claustrophobia" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d8543114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d85431;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌklɔːstrəˈfəʊbiə/</span></div>
      <div style="border-left:4px solid #d85431;background:#d8543114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d85431;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an extreme fear of small or closed spaces</p></div>
      <div style="border-left:4px solid #d85431;background:#d8543114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d85431;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">बंद जगह का डर</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of enclosed places</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fear of tight spaces</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">dread of confinement</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d85431;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d85431;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span><b>Claustrophobia</b> made her take the stairs instead of the crowded, narrow lift. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8543133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d85431;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The diver's <b>claustrophobia</b> returned when he squeezed into the tiny underwater cave.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8543133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d85431;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Patients with <b>claustrophobia</b> often panic inside the narrow tube of an MRI scanner.</span></div></div>
      </div>
    `
  },
  27: {
    questext: "Her fear of lifts and small locked rooms is a sign of ______.",
    options: ["claustrophobia", "agoraphobia", "nyctophobia", "xenophobia"],
    correct: "1",
    exptext: "✅ Claustrophobia is fear of closed spaces. 📌 Claustro = closed room. ❌ Agoraphobia is fear of open places."
  },
  28: {
    type: "concept", icon: "📖", accent: "#4b57dd", pauseTimer: true,
    title: "Lexicographer",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4b57dd,#4b57dd77,#f6dc9577);box-shadow:0 14px 30px -14px #4b57dd99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/14.png" alt="Picture for the word lexicographer" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4b57dd14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4b57dd;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌleksɪˈkɒɡrəfər/</span></div>
      <div style="border-left:4px solid #4b57dd;background:#4b57dd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b57dd;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who writes or compiles dictionaries</p></div>
      <div style="border-left:4px solid #4b57dd;background:#4b57dd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b57dd;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">कोशकार, शब्दकोश निर्माता</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">dictionary writer</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">dictionary maker</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">dictionary compiler</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b57dd;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b57dd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>lexicographer</b> spent ten years collecting meanings for the new Hindi dictionary. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4b57dd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b57dd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Every <b>lexicographer</b> tracks how everyday speech adds new words each year.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4b57dd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b57dd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The old <b>lexicographer</b> weighed each definition as carefully as a jeweller weighs gold.</span></div></div>
      </div>
    `
  },
  29: {
    questext: "Which word means a writer of dictionaries?",
    options: ["calligrapher", "cartographer", "philologist", "lexicographer"],
    correct: "4",
    exptext: "✅ Lexicographer compiles dictionaries. 📌 Lexicon = dictionary. ❌ A philologist studies language history, not dictionary-making."
  },
  30: {
    type: "concept", icon: "🌱", accent: "#62c526", pauseTimer: true,
    title: "Etymology",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#62c526,#62c52677,#f6dc9577);box-shadow:0 14px 30px -14px #62c52699,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/15.png" alt="Picture for the word etymology" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#62c52614"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#62c526;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌetɪˈmɒlədʒi/</span></div>
      <div style="border-left:4px solid #62c526;background:#62c52614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#62c526;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">the study of where words come from and how they changed</p></div>
      <div style="border-left:4px solid #62c526;background:#62c52614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#62c526;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">व्युत्पत्ति, शब्द-उत्पत्ति</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">word origins</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">word history</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">derivation</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#62c526;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#62c526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>etymology</b> of "salary" goes back to the Latin word for salt. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #62c52633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#62c526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>A short note on the <b>etymology</b> of each term made the glossary more interesting.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #62c52633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#62c526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Scholars trace the <b>etymology</b> of the word across centuries and many languages.</span></div></div>
      </div>
    `
  },
  31: {
    questext: "Etymology is the study of ______.",
    options: ["insects", "word origins", "old handwriting", "coins"],
    correct: "2",
    exptext: "✅ Etymology traces word origins. 📌 Etymology = words; entomology = insects. ❌ Insect study is entomology."
  },
  32: {
    type: "concept", icon: "🦋", accent: "#d831a1", pauseTimer: true,
    title: "Entomology",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d831a1,#d831a177,#f6dc9577);box-shadow:0 14px 30px -14px #d831a199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/16.png" alt="Picture for the word entomology" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d831a114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d831a1;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌentəˈmɒlədʒi/</span></div>
      <div style="border-left:4px solid #d831a1;background:#d831a114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d831a1;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">the scientific study of insects</p></div>
      <div style="border-left:4px solid #d831a1;background:#d831a114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d831a1;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">कीट विज्ञान</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">insect study</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">study of insects</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">insect science</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d831a1;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d831a1;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>She chose <b>entomology</b> because she loved watching ants and butterflies.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d831a133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d831a1;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The university's <b>entomology</b> department tracks insects that damage the wheat crop. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d831a133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d831a1;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>In <b>entomology</b> class, students pinned beetles and labelled them with Latin names.</span></div></div>
      </div>
    `
  },
  33: {
    questext: "कीटों के अध्ययन को क्या कहते हैं?",
    options: ["etymology", "ecology", "entomology", "philology"],
    correct: "3",
    exptext: "✅ Entomology is the study of insects. 📌 Entomo = insect. ❌ Etymology is the study of word origins."
  },
  34: {
    type: "concept", icon: "🎓", accent: "#4bd7dd", pauseTimer: true,
    title: "Philologist",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4bd7dd,#4bd7dd77,#f6dc9577);box-shadow:0 14px 30px -14px #4bd7dd99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/17.png" alt="Picture for the word philologist" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4bd7dd14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4bd7dd;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/fɪˈlɒlədʒɪst/</span></div>
      <div style="border-left:4px solid #4bd7dd;background:#4bd7dd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bd7dd;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a scholar who studies languages and how they changed over time</p></div>
      <div style="border-left:4px solid #4bd7dd;background:#4bd7dd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bd7dd;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">भाषाशास्त्री, भाषाविद्</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">linguist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">language scholar</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">word scholar</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bd7dd;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bd7dd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>A <b>philologist</b> compared old Sanskrit and Greek words to show how languages are related.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bd7dd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bd7dd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The <b>philologist</b> spent years decoding the grammar of a forgotten tribal language. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bd7dd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bd7dd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Though a famous <b>philologist</b>, he never lost his joy in a well-turned phrase.</span></div></div>
      </div>
    `
  },
  35: {
    questext: "The ______ compared ancient Sanskrit and Greek to show how the languages were related.",
    options: ["philologist", "cartographer", "philatelist", "numismatist"],
    correct: "1",
    exptext: "✅ A philologist studies the history and links of languages. 📌 Philo = love, logos = word. ❌ A philatelist collects stamps."
  },
  36: {
    type: "concept", icon: "🆕", accent: "#c59d26", pauseTimer: true,
    title: "Neology",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#c59d26,#c59d2677,#f6dc9577);box-shadow:0 14px 30px -14px #c59d2699,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/18.png" alt="Picture for the word neology" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#c59d2614"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#c59d26;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/niːˈɒlədʒi/</span></div>
      <div style="border-left:4px solid #c59d26;background:#c59d2614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c59d26;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">the practice of inventing and using new words</p></div>
      <div style="border-left:4px solid #c59d26;background:#c59d2614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c59d26;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">नवशब्द-प्रयोग</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">word coining</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">new wording</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">language innovation</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">archaism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">obsolescence</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c59d26;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c59d26;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The poet's love of <b>neology</b> gave readers many fresh words to enjoy.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c59d2633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c59d26;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Text messaging has speeded up <b>neology</b>, creating new words almost every month. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c59d2633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c59d26;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Critics praised his <b>neology</b>, but older readers found the invented terms hard to follow.</span></div></div>
      </div>
    `
  },
  37: {
    questext: "Choose the OPPOSITE of \"neology\".",
    options: ["coinage", "invention", "novelty", "archaism"],
    correct: "4",
    exptext: "✅ Archaism is the use of old, outdated words. 📌 Neo = new, archaic = old. ❌ Coinage means newly made words."
  },
  38: {
    type: "concept", icon: "📜", accent: "#7d31d8", pauseTimer: true,
    title: "Paleographer",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#7d31d8,#7d31d877,#f6dc9577);box-shadow:0 14px 30px -14px #7d31d899,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/19.png" alt="Picture for the word paleographer" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#7d31d814"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#7d31d8;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌpæliˈɒɡrəfər/</span></div>
      <div style="border-left:4px solid #7d31d8;background:#7d31d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#7d31d8;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an expert who reads and studies ancient handwriting and old manuscripts</p></div>
      <div style="border-left:4px solid #7d31d8;background:#7d31d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#7d31d8;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">प्राचीन लिपि विशेषज्ञ</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">manuscript expert</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">ancient-script reader</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">handwriting historian</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#7d31d8;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#7d31d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>paleographer</b> slowly read the faded writing on the medieval parchment. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #7d31d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#7d31d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Historians asked a <b>paleographer</b> to date the manuscript by its style of handwriting.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #7d31d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#7d31d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Only a trained <b>paleographer</b> can decode the cramped letters of a centuries-old scroll.</span></div></div>
      </div>
    `
  },
  39: {
    questext: "A person who studies ancient handwriting and old manuscripts is a ______.",
    options: ["calligrapher", "paleographer", "lexicographer", "cartographer"],
    correct: "2",
    exptext: "✅ A paleographer reads old scripts. 📌 Paleo = ancient. ❌ A calligrapher writes beautifully, not reads ancient scripts."
  },
  40: {
    type: "concept", icon: "💡", accent: "#4bdd63", pauseTimer: true,
    title: "Coinage",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4bdd63,#4bdd6377,#f6dc9577);box-shadow:0 14px 30px -14px #4bdd6399,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/20.png" alt="Picture for the word coinage" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4bdd6314"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4bdd63;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈkɔɪnɪdʒ/</span></div>
      <div style="border-left:4px solid #4bdd63;background:#4bdd6314;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bdd63;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a new word or phrase that someone invents</p></div>
      <div style="border-left:4px solid #4bdd63;background:#4bdd6314;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bdd63;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">नया गढ़ा शब्द</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">new word</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">invented term</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">neologism</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">archaism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">old word</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bdd63;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bdd63;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The newspaper's clever <b>coinage</b> 'staycation' soon appeared in many dictionaries. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bdd6333;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bdd63;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Teenagers love slang, and every season brings some witty <b>coinage</b> to the playground.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bdd6333;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bdd63;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The author's <b>coinage</b> for her strange machine delighted readers and reviewers alike.</span></div></div>
      </div>
    `
  },
  41: {
    questext: "The word \"podcast\" is a clever ______ of recent years.",
    options: ["archaism", "epitaph", "coinage", "ledger"],
    correct: "3",
    exptext: "✅ A coinage is a newly invented word. 📌 Coin a word = make it new. ❌ An archaism is an old word."
  },
  42: {
    type: "concept", icon: "🎤", accent: "#c5263a", pauseTimer: true,
    title: "Orator",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#c5263a,#c5263a77,#f6dc9577);box-shadow:0 14px 30px -14px #c5263a99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/21.png" alt="Picture for the word orator" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#c5263a14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#c5263a;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈɒrətər/</span></div>
      <div style="border-left:4px solid #c5263a;background:#c5263a14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c5263a;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who is skilled at giving public speeches</p></div>
      <div style="border-left:4px solid #c5263a;background:#c5263a14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c5263a;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">वक्ता, भाषणकर्ता</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">speaker</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">lecturer</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">rhetorician</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">public speaker</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c5263a;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c5263a;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The young <b>orator</b> held the whole hall silent with his powerful opening line. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5263a33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c5263a;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>A great <b>orator</b> can move thousands of people without a single note.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5263a33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c5263a;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>In ancient Rome, a famous <b>orator</b> was admired as much as a general.</span></div></div>
      </div>
    `
  },
  43: {
    questext: "कुशल वक्ता को क्या कहते हैं?",
    options: ["pedagogue", "demagogue", "archivist", "orator"],
    correct: "4",
    exptext: "✅ Orator is a skilled public speaker. 📌 Oral = spoken. ❌ A demagogue rouses crowds for power, not just speaks well."
  },
  44: {
    type: "concept", icon: "🔥", accent: "#3177d8", pauseTimer: true,
    title: "Demagogue",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#3177d8,#3177d877,#f6dc9577);box-shadow:0 14px 30px -14px #3177d899,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/22.png" alt="Picture for the word demagogue" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#3177d814"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#3177d8;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈdeməɡɒɡ/</span></div>
      <div style="border-left:4px solid #3177d8;background:#3177d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#3177d8;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a leader who excites people's fears and feelings to win power</p></div>
      <div style="border-left:4px solid #3177d8;background:#3177d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#3177d8;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">भीड़ भड़काने वाला नेता</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">agitator</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">rabble-rouser</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">firebrand</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">instigator</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">statesman</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">peacemaker</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#3177d8;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3177d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>demagogue</b> promised free everything and blamed outsiders for every problem in town. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #3177d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3177d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>History warns that a <b>demagogue</b> can rise quickly when people are angry and afraid.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #3177d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3177d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Calling the minister a <b>demagogue</b>, the editorial said he cared only for applause.</span></div></div>
      </div>
    `
  },
  45: {
    questext: "Which word is closest in meaning to \"demagogue\"?",
    options: ["rabble-rouser", "teacher", "messenger", "scholar"],
    correct: "1",
    exptext: "✅ A rabble-rouser stirs crowds with emotion. 📌 Demos = people, agogos = leader of the mob. ❌ A teacher is a pedagogue."
  },
  46: {
    type: "concept", icon: "🧑‍🏫", accent: "#b3dd4b", pauseTimer: true,
    title: "Pedagogue",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#b3dd4b,#b3dd4b77,#f6dc9577);box-shadow:0 14px 30px -14px #b3dd4b99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/23.png" alt="Picture for the word pedagogue" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#b3dd4b14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#b3dd4b;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈpedəɡɒɡ/</span></div>
      <div style="border-left:4px solid #b3dd4b;background:#b3dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#b3dd4b;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a teacher, especially a strict or old-fashioned one</p></div>
      <div style="border-left:4px solid #b3dd4b;background:#b3dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#b3dd4b;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">शिक्षक, अध्यापक</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">teacher</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">educator</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">instructor</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">schoolmaster</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">student</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">pupil</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">learner</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#b3dd4b;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#b3dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The strict <b>pedagogue</b> never allowed students to speak without raising a hand.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #b3dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#b3dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>A good <b>pedagogue</b> knows that curiosity teaches more than fear.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #b3dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#b3dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The village <b>pedagogue</b> taught three generations from one dusty classroom. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  47: {
    questext: "Choose the OPPOSITE of \"pedagogue\".",
    options: ["instructor", "pupil", "educator", "tutor"],
    correct: "2",
    exptext: "✅ A pupil learns; a pedagogue teaches. 📌 Pedagogue = teacher. ❌ Instructor, educator and tutor are synonyms."
  },
  48: {
    type: "concept", icon: "🕍", accent: "#c526c5", pauseTimer: true,
    title: "Synagogue",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#c526c5,#c526c577,#f6dc9577);box-shadow:0 14px 30px -14px #c526c599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/24.png" alt="Picture for the word synagogue" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#c526c514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#c526c5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈsɪnəɡɒɡ/</span></div>
      <div style="border-left:4px solid #c526c5;background:#c526c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c526c5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a Jewish place of worship</p></div>
      <div style="border-left:4px solid #c526c5;background:#c526c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c526c5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">यहूदी उपासनागृह</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">Jewish temple</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">Jewish house of worship</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">place of worship</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c526c5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c526c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Families gathered at the <b>synagogue</b> every Saturday morning to pray together.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c526c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c526c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The old <b>synagogue</b> in the city is known for its stained glass windows. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c526c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c526c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Visitors must cover their heads before entering the quiet <b>synagogue</b>.</span></div></div>
      </div>
    `
  },
  49: {
    questext: "A Jewish place of worship is called a ______.",
    options: ["mosque", "monastery", "synagogue", "cathedral"],
    correct: "3",
    exptext: "✅ A synagogue is a Jewish place of worship. 📌 Syn-agogue = gathering together. ❌ A mosque is a Muslim place of worship."
  },
  50: {
    type: "concept", icon: "🗣️", accent: "#31d8a7", pauseTimer: true,
    title: "Eloquent",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#31d8a7,#31d8a777,#f6dc9577);box-shadow:0 14px 30px -14px #31d8a799,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/25.png" alt="Picture for the word eloquent" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#31d8a714"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#31d8a7;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ˈeləkwənt/</span></div>
      <div style="border-left:4px solid #31d8a7;background:#31d8a714;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d8a7;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">able to speak or write in a clear, strong and persuasive way</p></div>
      <div style="border-left:4px solid #31d8a7;background:#31d8a714;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d8a7;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">वाक्पटु, प्रभावशाली</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">articulate</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fluent</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">expressive</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">persuasive</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">inarticulate</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">tongue-tied</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">hesitant</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d8a7;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d8a7;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Her <b>eloquent</b> speech about saving the lake moved even the strongest critics. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31d8a733;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d8a7;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>An <b>eloquent</b> lawyer can explain a complex law in plain, powerful words.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31d8a733;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d8a7;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The poet's <b>eloquent</b> silence said more than a thousand words ever could.</span></div></div>
      </div>
    `
  },
  51: {
    questext: "Choose the word closest in meaning to \"eloquent\".",
    options: ["articulate", "timid", "clumsy", "tongue-tied"],
    correct: "1",
    exptext: "✅ Articulate means clear and fluent in speech. 📌 E-loqu = speak out. ❌ Tongue-tied is the opposite."
  },
  52: {
    type: "concept", icon: "🌸", accent: "#dd874b", pauseTimer: true,
    title: "Harbinger",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#dd874b,#dd874b77,#f6dc9577);box-shadow:0 14px 30px -14px #dd874b99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/26.png" alt="Picture for the word harbinger" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#dd874b14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#dd874b;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈhɑːbɪndʒər/</span></div>
      <div style="border-left:4px solid #dd874b;background:#dd874b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd874b;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a sign that shows something is about to come</p></div>
      <div style="border-left:4px solid #dd874b;background:#dd874b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd874b;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">अग्रदूत, पूर्वसूचक</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">forerunner</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">precursor</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">omen</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">sign</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd874b;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd874b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The first cuckoo's call is a <b>harbinger</b> of spring in the countryside. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd874b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd874b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Falling sales proved to be a <b>harbinger</b> of deeper trouble for the company.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd874b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd874b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Like a silent <b>harbinger</b>, the cold wind announced the coming winter.</span></div></div>
      </div>
    `
  },
  53: {
    questext: "Dark clouds are often a ______ of rain.",
    options: ["ledger", "epitaph", "almanac", "harbinger"],
    correct: "4",
    exptext: "✅ A harbinger is an early sign of what is coming. 📌 Harbinger = early warning. ❌ An almanac is a yearly calendar book."
  },
  54: {
    type: "concept", icon: "📯", accent: "#3926c5", pauseTimer: true,
    title: "Herald",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#3926c5,#3926c577,#f6dc9577);box-shadow:0 14px 30px -14px #3926c599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/27.png" alt="Picture for the word herald" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#3926c514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#3926c5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈherəld/</span></div>
      <div style="border-left:4px solid #3926c5;background:#3926c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#3926c5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who announces important news or messages</p></div>
      <div style="border-left:4px solid #3926c5;background:#3926c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#3926c5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">संदेशवाहक, उद्घोषक</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">messenger</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">announcer</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">crier</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">forerunner</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#3926c5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3926c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The royal <b>herald</b> blew his trumpet and read the king's order aloud. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #3926c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3926c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>A bright dawn is the <b>herald</b> of a new day.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #3926c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3926c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The paper acts as a <b>herald</b> of change by publishing fresh ideas every morning.</span></div></div>
      </div>
    `
  },
  55: {
    questext: "Which is NOT a synonym of \"herald\"?",
    options: ["announcer", "listener", "messenger", "crier"],
    correct: "2",
    exptext: "✅ A listener receives news; a herald announces it. 📌 Herald = loud announcer. ❌ Announcer, messenger and crier all carry news."
  },
  56: {
    type: "concept", icon: "🕊️", accent: "#4ed831", pauseTimer: true,
    title: "Emissary",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4ed831,#4ed83177,#f6dc9577);box-shadow:0 14px 30px -14px #4ed83199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/28.png" alt="Picture for the word emissary" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4ed83114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4ed831;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈemɪsəri/</span></div>
      <div style="border-left:4px solid #4ed831;background:#4ed83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4ed831;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person sent on a special mission to represent someone</p></div>
      <div style="border-left:4px solid #4ed831;background:#4ed83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4ed831;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">दूत, प्रतिनिधि</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">envoy</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">ambassador</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">messenger</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">delegate</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4ed831;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4ed831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The king sent an <b>emissary</b> with gifts to the rival court.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4ed83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4ed831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The president's <b>emissary</b> met local leaders to prepare for peace talks.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4ed83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4ed831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>As a trusted <b>emissary</b>, he carried secret letters across the mountain border. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  57: {
    questext: "The president sent a special ______ to carry a peace message to the neighbouring country.",
    options: ["pedagogue", "demagogue", "emissary", "archivist"],
    correct: "3",
    exptext: "✅ An emissary is sent on a mission as a representative. 📌 Emit = send out. ❌ A demagogue stirs crowds."
  },
  58: {
    type: "concept", icon: "🏺", accent: "#dd4b8e", pauseTimer: true,
    title: "Archaism",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#dd4b8e,#dd4b8e77,#f6dc9577);box-shadow:0 14px 30px -14px #dd4b8e99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/29.png" alt="Picture for the word archaism" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#dd4b8e14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#dd4b8e;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈɑːkeɪɪzəm/</span></div>
      <div style="border-left:4px solid #dd4b8e;background:#dd4b8e14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4b8e;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an old word or phrase that people no longer use</p></div>
      <div style="border-left:4px solid #dd4b8e;background:#dd4b8e14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4b8e;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">पुराना शब्द, अप्रचलित प्रयोग</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">obsolete word</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">old expression</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">outdated term</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">neologism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">coinage</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4b8e;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4b8e;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The word "thee" is an <b>archaism</b> that now appears only in old poems.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd4b8e33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4b8e;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Using an <b>archaism</b> in a business email makes the writer sound outdated.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd4b8e33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4b8e;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Shakespeare's plays contain an <b>archaism</b> on almost every page, so students keep glossaries beside them. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  59: {
    questext: "Which of these is an archaism in modern English?",
    options: ["thou", "you", "we", "they"],
    correct: "1",
    exptext: "✅ Thou is an old form of you. 📌 Archaic = ancient. ❌ You, we and they are used every day."
  },
  60: {
    type: "concept", icon: "🔧", accent: "#269ec5", pauseTimer: true,
    title: "Jargon",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#269ec5,#269ec577,#f6dc9577);box-shadow:0 14px 30px -14px #269ec599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/30.png" alt="Picture for the word jargon" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#269ec514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#269ec5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈdʒɑːɡən/</span></div>
      <div style="border-left:4px solid #269ec5;background:#269ec514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#269ec5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">special words of a profession that other people find hard to understand</p></div>
      <div style="border-left:4px solid #269ec5;background:#269ec514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#269ec5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">तकनीकी शब्दावली, पेशेवर बोली</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">technical language</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">lingo</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">terminology</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">cant</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">plain speech</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">simple words</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#269ec5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#269ec5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The mechanic's <b>jargon</b> left me completely confused about what was wrong with my scooter. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #269ec533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#269ec5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Legal <b>jargon</b> in the contract made it hard for ordinary people to understand.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #269ec533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#269ec5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Scientists are urged to avoid <b>jargon</b> when they speak to the public.</span></div></div>
      </div>
    `
  },
  61: {
    questext: "The doctor's report was full of medical ______ that patients could not follow.",
    options: ["epitaph", "chronicle", "almanac", "jargon"],
    correct: "4",
    exptext: "✅ Jargon is special technical language of a profession. 📌 Jargon = job talk. ❌ A chronicle is a record of events."
  },
  62: {
    type: "concept", icon: "🤫", accent: "#d8d031", pauseTimer: true,
    title: "Argot",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d8d031,#d8d03177,#f6dc9577);box-shadow:0 14px 30px -14px #d8d03199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/31.png" alt="Picture for the word argot" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d8d03114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d8d031;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈɑːɡəʊ/</span></div>
      <div style="border-left:4px solid #d8d031;background:#d8d03114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8d031;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">the secret slang used by a group such as thieves</p></div>
      <div style="border-left:4px solid #d8d031;background:#d8d03114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8d031;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">गुप्त बोली, समूह की गुप्त भाषा</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">slang</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">cant</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">secret language</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">lingo</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8d031;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8d031;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Pickpockets in the old city spoke a secret <b>argot</b> to hide their plans. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8d03133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8d031;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The film uses prison <b>argot</b> so well that viewers need subtitles.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8d03133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8d031;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Every gang had its own <b>argot</b>, and outsiders could not follow a single word.</span></div></div>
      </div>
    `
  },
  63: {
    questext: "Which word means the secret slang of thieves and criminals?",
    options: ["dialect", "argot", "jargon", "archaism"],
    correct: "2",
    exptext: "✅ Argot is secret slang of a hidden group. 📌 Argot = gang talk. ❌ Jargon is a profession's technical language."
  },
  64: {
    type: "concept", icon: "✨", accent: "#ac4bdd", pauseTimer: true,
    title: "Neologism",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#ac4bdd,#ac4bdd77,#f6dc9577);box-shadow:0 14px 30px -14px #ac4bdd99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/32.png" alt="Picture for the word neologism" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#ac4bdd14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#ac4bdd;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/niːˈɒlədʒɪzəm/</span></div>
      <div style="border-left:4px solid #ac4bdd;background:#ac4bdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#ac4bdd;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a newly invented word or phrase</p></div>
      <div style="border-left:4px solid #ac4bdd;background:#ac4bdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#ac4bdd;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">नया शब्द, नवशब्द</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">coinage</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">invented word</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">new word</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">archaism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">obsolete word</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#ac4bdd;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#ac4bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The word "selfie" was once a <b>neologism</b>, but now everyone uses it. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #ac4bdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#ac4bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Critics called the term a mere <b>neologism</b> that would not last long.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #ac4bdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#ac4bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The novelist's <b>neologism</b> for the strange machine entered the dictionary within ten years.</span></div></div>
      </div>
    `
  },
  65: {
    questext: "Odd one out among these words:",
    options: ["coinage", "new word", "archaism", "invented term"],
    correct: "3",
    exptext: "✅ Archaism is an old word; the others mean newly made words. 📌 Neo = new. ❌ Coinage means a newly invented word."
  },
  66: {
    type: "concept", icon: "💬", accent: "#26c561", pauseTimer: true,
    title: "Colloquialism",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#26c561,#26c56177,#f6dc9577);box-shadow:0 14px 30px -14px #26c56199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/33.png" alt="Picture for the word colloquialism" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#26c56114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#26c561;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/kəˈləʊkwiəlɪzəm/</span></div>
      <div style="border-left:4px solid #26c561;background:#26c56114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c561;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an informal word or phrase used in everyday talk</p></div>
      <div style="border-left:4px solid #26c561;background:#26c56114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c561;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">बोलचाल का शब्द, आम बोली</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">informal expression</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">everyday phrase</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">common speech</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">formal expression</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">formal language</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c561;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c561;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Saying "gonna" instead of "going to" is a common <b>colloquialism</b>.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c56133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c561;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The editor removed every <b>colloquialism</b> from the formal research paper.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c56133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c561;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Her speech was full of friendly <b>colloquialisms</b>, which made the crowd feel at home. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  67: {
    questext: "In a formal essay, avoid everyday ______ like \"gonna\" and \"wanna\".",
    options: ["archaisms", "tautologies", "colloquialisms", "epitaphs"],
    correct: "3",
    exptext: "✅ Colloquialisms are informal everyday words. 📌 Colloquial = casual chat. ❌ Archaisms are old, outdated words."
  },
  68: {
    type: "concept", icon: "🗨️", accent: "#d83f31", pauseTimer: true,
    title: "Dialect",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d83f31,#d83f3177,#f6dc9577);box-shadow:0 14px 30px -14px #d83f3199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/34.png" alt="Picture for the word dialect" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d83f3114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d83f31;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈdaɪəlekt/</span></div>
      <div style="border-left:4px solid #d83f31;background:#d83f3114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d83f31;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a form of a language spoken in one region or group</p></div>
      <div style="border-left:4px solid #d83f31;background:#d83f3114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d83f31;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">बोली, उपभाषा</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">regional speech</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">vernacular</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">patois</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">standard language</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">official language</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d83f31;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d83f31;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The farmer spoke in a rural <b>dialect</b> that city visitors found hard to follow. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d83f3133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d83f31;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Each district of the state has its own <b>dialect</b>, with special words and accents.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d83f3133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d83f31;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The novelist wrote the villagers' conversations in their local <b>dialect</b> to sound real.</span></div></div>
      </div>
    `
  },
  69: {
    questext: "Which word means the form of a language spoken in a particular region?",
    options: ["dialect", "jargon", "argot", "archaism"],
    correct: "1",
    exptext: "✅ Dialect is a regional form of a language. 📌 Dialect = local style of speech. ❌ Jargon is a profession's technical language."
  },
  70: {
    type: "concept", icon: "🤷", accent: "#4b6add", pauseTimer: true,
    title: "Non sequitur",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4b6add,#4b6add77,#f6dc9577);box-shadow:0 14px 30px -14px #4b6add99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/35.png" alt="Picture for the word non sequitur" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4b6add14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4b6add;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌnɒn ˈsekwɪtə/</span></div>
      <div style="border-left:4px solid #4b6add;background:#4b6add14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b6add;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a statement that does not logically follow from what came before</p></div>
      <div style="border-left:4px solid #4b6add;background:#4b6add14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b6add;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">असंगत बात, बेतुका निष्कर्ष</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">illogical remark</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">irrelevant statement</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">illogical conclusion</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">logical inference</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">relevant remark</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b6add;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b6add;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>When asked about the budget, his reply about cricket was a complete <b>non sequitur</b>. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4b6add33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b6add;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>"He is rich, so he must be honest" is a <b>non sequitur</b>.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4b6add33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b6add;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The comedian's jokes worked because each new line was a surprising <b>non sequitur</b>.</span></div></div>
      </div>
    `
  },
  71: {
    questext: "जो निष्कर्ष पिछली बात से तर्कसंगत रूप से न निकले, उसे क्या कहते हैं?",
    options: ["tautology", "epitome", "equivocation", "non sequitur"],
    correct: "4",
    exptext: "✅ Non sequitur means \"it does not follow\". 📌 Non = not, sequitur = follows. ❌ Tautology repeats the same idea."
  },
  72: {
    type: "concept", icon: "🌀", accent: "#76c526", pauseTimer: true,
    title: "Equivocation",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#76c526,#76c52677,#f6dc9577);box-shadow:0 14px 30px -14px #76c52699,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/36.png" alt="Picture for the word equivocation" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#76c52614"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#76c526;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ɪˌkwɪvəˈkeɪʃn/</span></div>
      <div style="border-left:4px solid #76c526;background:#76c52614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#76c526;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">using unclear or double-meaning words to avoid telling the plain truth</p></div>
      <div style="border-left:4px solid #76c526;background:#76c52614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#76c526;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">टालमटोल, गोलमोल बात</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">evasion</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">ambiguity</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">hedging</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">double talk</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">frankness</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">candour</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">directness</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#76c526;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#76c526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The minister's <b>equivocation</b> on the tax question made reporters even more suspicious. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #76c52633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#76c526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Stop your <b>equivocation</b> and give me a straight yes or no.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #76c52633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#76c526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Politicians often use <b>equivocation</b> to avoid blame while sounding polite and helpful.</span></div></div>
      </div>
    `
  },
  73: {
    questext: "Choose the OPPOSITE of \"equivocation\".",
    options: ["evasion", "frankness", "hedging", "ambiguity"],
    correct: "2",
    exptext: "✅ Frankness means speaking plainly and openly. 📌 Equi-vocal = two voices. ❌ Evasion and hedging are similar to equivocation."
  },
  74: {
    type: "concept", icon: "🔁", accent: "#d831b6", pauseTimer: true,
    title: "Tautology",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d831b6,#d831b677,#f6dc9577);box-shadow:0 14px 30px -14px #d831b699,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/37.png" alt="Picture for the word tautology" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d831b614"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d831b6;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/tɔːˈtɒlədʒi/</span></div>
      <div style="border-left:4px solid #d831b6;background:#d831b614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d831b6;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">saying the same thing twice in different words</p></div>
      <div style="border-left:4px solid #d831b6;background:#d831b614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d831b6;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">पुनरुक्ति, शब्द-दोहराव</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">repetition</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">redundancy</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">repeated wording</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">brevity</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">conciseness</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d831b6;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d831b6;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>"Free gift" and "past history" are common examples of <b>tautology</b>.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d831b633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d831b6;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The editor cut the <b>tautology</b> from the report to make it shorter. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d831b633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d831b6;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Saying "a sad tragedy" is pure <b>tautology</b>, since tragedies are always sad.</span></div></div>
      </div>
    `
  },
  75: {
    questext: "Which phrase is an example of tautology?",
    options: ["return back", "quick walk", "tall tower", "fresh bread"],
    correct: "1",
    exptext: "✅ \"Return back\" says \"back\" twice. 📌 Tauto = same. ❌ The other phrases add new information."
  },
  76: {
    type: "concept", icon: "📅", accent: "#4bddd0", pauseTimer: true,
    title: "Almanac",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4bddd0,#4bddd077,#f6dc9577);box-shadow:0 14px 30px -14px #4bddd099,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/38.png" alt="Picture for the word almanac" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4bddd014"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4bddd0;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈɔːlmənæk/</span></div>
      <div style="border-left:4px solid #4bddd0;background:#4bddd014;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bddd0;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a yearly book with a calendar, weather notes and useful facts</p></div>
      <div style="border-left:4px solid #4bddd0;background:#4bddd014;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bddd0;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">पंचांग, वार्षिक पत्रिका</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">yearbook</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">annual calendar</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">calendar book</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bddd0;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bddd0;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Farmers once planted crops by checking the weather notes in the village <b>almanac</b>. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bddd033;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bddd0;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The <b>almanac</b> lists sunrise times, tides and festival dates for every day.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bddd033;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bddd0;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>He kept an old <b>almanac</b> on his desk for quick facts about the year.</span></div></div>
      </div>
    `
  },
  77: {
    questext: "A yearly book giving the calendar, weather and astronomical facts is an ______.",
    options: ["ledger", "chronicle", "almanac", "epitaph"],
    correct: "3",
    exptext: "✅ An almanac is a yearly book of calendar facts. 📌 Almanac = annual guide. ❌ A ledger records money accounts."
  },
  78: {
    type: "concept", icon: "🏛️", accent: "#c58826", pauseTimer: true,
    title: "Chronicle",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#c58826,#c5882677,#f6dc9577);box-shadow:0 14px 30px -14px #c5882699,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/39.png" alt="Picture for the word chronicle" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#c5882614"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#c58826;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈkrɒnɪkl/</span></div>
      <div style="border-left:4px solid #c58826;background:#c5882614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c58826;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a written record of events in the order they happened</p></div>
      <div style="border-left:4px solid #c58826;background:#c5882614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c58826;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">इतिवृत्त, वृत्तांत</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">record</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">history</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">annals</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">account</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c58826;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c58826;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The monk kept a <b>chronicle</b> of every flood and famine in the kingdom. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5882633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c58826;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>This <b>chronicle</b> of the freedom struggle lists events year by year.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5882633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c58826;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Her diary became a <b>chronicle</b> of a changing town.</span></div></div>
      </div>
    `
  },
  79: {
    questext: "Which word means a record of events in the order of time?",
    options: ["almanac", "chronicle", "ledger", "epilogue"],
    correct: "2",
    exptext: "✅ Chronicle records events in time order. 📌 Chrono = time. ❌ A ledger records money accounts."
  },
  80: {
    type: "concept", icon: "📒", accent: "#6831d8", pauseTimer: true,
    title: "Ledger",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#6831d8,#6831d877,#f6dc9577);box-shadow:0 14px 30px -14px #6831d899,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/40.png" alt="Picture for the word ledger" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#6831d814"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#6831d8;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈledʒər/</span></div>
      <div style="border-left:4px solid #6831d8;background:#6831d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#6831d8;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a book in which a business records its money accounts</p></div>
      <div style="border-left:4px solid #6831d8;background:#6831d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#6831d8;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">बही-खाता, लेखा-बही</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">account book</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">register</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">record book</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#6831d8;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#6831d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The shopkeeper noted every sale in his big <b>ledger</b> before closing the shop. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #6831d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#6831d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The auditor found a mistake in the company's <b>ledger</b>.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #6831d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#6831d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Each evening the clerk balanced the <b>ledger</b> by the light of a lamp.</span></div></div>
      </div>
    `
  },
  81: {
    questext: "The accountant checked each entry in the ______ to find the missing amount.",
    options: ["almanac", "chronicle", "epitaph", "ledger"],
    correct: "4",
    exptext: "✅ A ledger is an account book. 📌 Ledger = money diary. ❌ An epitaph is words on a tomb."
  },
  82: {
    type: "concept", icon: "🪨", accent: "#4bdd50", pauseTimer: true,
    title: "Epigrapher",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4bdd50,#4bdd5077,#f6dc9577);box-shadow:0 14px 30px -14px #4bdd5099,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/41.png" alt="Picture for the word epigrapher" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4bdd5014"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4bdd50;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ɪˈpɪɡrəfər/</span></div>
      <div style="border-left:4px solid #4bdd50;background:#4bdd5014;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bdd50;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an expert who studies old writing carved on stone or metal</p></div>
      <div style="border-left:4px solid #4bdd50;background:#4bdd5014;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bdd50;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">शिलालेख विशेषज्ञ, अभिलेखशास्त्री</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">inscription expert</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">inscription reader</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">stone-writing scholar</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bdd50;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bdd50;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>epigrapher</b> read the ancient king's orders carved on a rock pillar. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bdd5033;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bdd50;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>An <b>epigrapher</b> can tell the age of a stone inscription from its letter style.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bdd5033;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bdd50;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The <b>epigrapher</b> spent weeks cleaning moss from the temple wall to read its message.</span></div></div>
      </div>
    `
  },
  83: {
    questext: "One who studies inscriptions carved on stone is a ______.",
    options: ["paleographer", "calligrapher", "lexicographer", "epigrapher"],
    correct: "4",
    exptext: "✅ An epigrapher studies carved inscriptions. 📌 Epi-graph = writing upon stone. ❌ A paleographer studies old handwriting on parchment."
  },
  84: {
    type: "concept", icon: "⚰️", accent: "#c5264e", pauseTimer: true,
    title: "Epitaph",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#c5264e,#c5264e77,#f6dc9577);box-shadow:0 14px 30px -14px #c5264e99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/42.png" alt="Picture for the word epitaph" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#c5264e14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#c5264e;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈepɪtɑːf/</span></div>
      <div style="border-left:4px solid #c5264e;background:#c5264e14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c5264e;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">words written on a tomb in memory of the dead</p></div>
      <div style="border-left:4px solid #c5264e;background:#c5264e14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c5264e;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">समाधि-लेख</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">tombstone inscription</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">grave inscription</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">memorial words</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c5264e;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c5264e;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>epitaph</b> on his grave said simply, "He loved the mountains." <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5264e33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c5264e;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>She wrote a short <b>epitaph</b> for her grandmother's tombstone.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5264e33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c5264e;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Time had worn the stone, but the <b>epitaph</b> was still faintly readable.</span></div></div>
      </div>
    `
  },
  85: {
    questext: "समाधि पर लिखे शब्दों को क्या कहते हैं?",
    options: ["epilogue", "epitaph", "epitome", "chronicle"],
    correct: "2",
    exptext: "✅ Epitaph is the inscription on a tomb. 📌 Epi-taph = on the tomb. ❌ Epilogue is the end section of a book."
  },
  86: {
    type: "concept", icon: "🏅", accent: "#318cd8", pauseTimer: true,
    title: "Epitome",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#318cd8,#318cd877,#f6dc9577);box-shadow:0 14px 30px -14px #318cd899,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/43.png" alt="Picture for the word epitome" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#318cd814"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#318cd8;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ɪˈpɪtəmi/</span></div>
      <div style="border-left:4px solid #318cd8;background:#318cd814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#318cd8;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a perfect example of a quality or type</p></div>
      <div style="border-left:4px solid #318cd8;background:#318cd814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#318cd8;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">आदर्श उदाहरण, मूर्त रूप</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">embodiment</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">essence</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">perfect example</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">model</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">antithesis</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">contrast</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#318cd8;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#318cd8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The village doctor was the <b>epitome</b> of kindness, treating the poor without any fee. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #318cd833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#318cd8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The new stadium is the <b>epitome</b> of modern design.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #318cd833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#318cd8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>In the poem, the old oak stands as the <b>epitome</b> of patience.</span></div></div>
      </div>
    `
  },
  87: {
    questext: "He is the ______ of honesty; no one has ever doubted his word.",
    options: ["epilogue", "epitaph", "epitome", "ledger"],
    correct: "3",
    exptext: "✅ Epitome means a perfect example. 📌 Epitome = the best sample. ❌ Epitaph is a tomb inscription."
  },
  88: {
    type: "concept", icon: "🎬", accent: "#c5dd4b", pauseTimer: true,
    title: "Epilogue",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#c5dd4b,#c5dd4b77,#f6dc9577);box-shadow:0 14px 30px -14px #c5dd4b99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/44.png" alt="Picture for the word epilogue" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#c5dd4b14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#c5dd4b;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈepɪlɒɡ/</span></div>
      <div style="border-left:4px solid #c5dd4b;background:#c5dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c5dd4b;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a short section at the end of a book or play</p></div>
      <div style="border-left:4px solid #c5dd4b;background:#c5dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c5dd4b;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">उपसंहार, उत्तरवाक्</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">afterword</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">conclusion</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">postscript</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">closing section</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">prologue</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">preface</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">introduction</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c5dd4b;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c5dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>In the <b>epilogue</b>, the author tells us what happened to the hero years later.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c5dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The play ended with an <b>epilogue</b> spoken by the main actor. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c5dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Readers often skip the <b>epilogue</b>, but it ties up every loose thread.</span></div></div>
      </div>
    `
  },
  89: {
    questext: "Choose the OPPOSITE of \"epilogue\".",
    options: ["prologue", "afterword", "conclusion", "postscript"],
    correct: "1",
    exptext: "✅ A prologue opens a work; an epilogue closes it. 📌 Epi = after, pro = before. ❌ Afterword and postscript are synonyms."
  },
  90: {
    type: "concept", icon: "🧘", accent: "#b026c5", pauseTimer: true,
    title: "Stoic",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#b026c5,#b026c577,#f6dc9577);box-shadow:0 14px 30px -14px #b026c599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/45.png" alt="Picture for the word stoic" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#b026c514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#b026c5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ˈstəʊɪk/</span></div>
      <div style="border-left:4px solid #b026c5;background:#b026c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#b026c5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">not showing feelings and calmly accepting pain or trouble</p></div>
      <div style="border-left:4px solid #b026c5;background:#b026c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#b026c5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">संयमी, सहनशील</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">unemotional</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">impassive</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">long-suffering</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">calm</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">emotional</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">excitable</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">sensitive</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#b026c5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#b026c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>He stayed <b>stoic</b> while the doctor stitched the deep cut on his arm.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #b026c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#b026c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The <b>stoic</b> old farmer accepted the failed harvest without a single complaint. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #b026c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#b026c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Her <b>stoic</b> face hid the grief she felt during the long ceremony.</span></div></div>
      </div>
    `
  },
  91: {
    questext: "Which word is closest in meaning to \"stoic\"?",
    options: ["emotional", "impassive", "excitable", "tearful"],
    correct: "2",
    exptext: "✅ Impassive means showing no emotion. 📌 Stoic = stone-faced. ❌ Emotional is the opposite."
  },
  92: {
    type: "concept", icon: "😊", accent: "#31d891", pauseTimer: true,
    title: "Sanguine",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#31d891,#31d89177,#f6dc9577);box-shadow:0 14px 30px -14px #31d89199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/46.png" alt="Picture for the word sanguine" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#31d89114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#31d891;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ˈsæŋɡwɪn/</span></div>
      <div style="border-left:4px solid #31d891;background:#31d89114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d891;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">cheerful and hopeful, especially in a difficult situation</p></div>
      <div style="border-left:4px solid #31d891;background:#31d89114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d891;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">आशावादी, आशान्वित</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">optimistic</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">hopeful</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">confident</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">cheerful</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">pessimistic</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">gloomy</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">despondent</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d891;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d891;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Despite the poor results, the coach remained <b>sanguine</b> about the next match. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31d89133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d891;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Investors were <b>sanguine</b> about the market after the bank cut interest rates.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31d89133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d891;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>She felt <b>sanguine</b> that the long journey would end in good news.</span></div></div>
      </div>
    `
  },
  93: {
    questext: "Choose the OPPOSITE of \"sanguine\".",
    options: ["hopeful", "cheerful", "confident", "despondent"],
    correct: "4",
    exptext: "✅ Despondent means hopeless and sad. 📌 Sanguine = rosy-cheeked and hopeful. ❌ Hopeful is a synonym."
  },
  94: {
    type: "concept", icon: "🏔️", accent: "#dd754b", pauseTimer: true,
    title: "Anchorite",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#dd754b,#dd754b77,#f6dc9577);box-shadow:0 14px 30px -14px #dd754b99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/47.png" alt="Picture for the word anchorite" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#dd754b14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#dd754b;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈæŋkəraɪt/</span></div>
      <div style="border-left:4px solid #dd754b;background:#dd754b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd754b;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who lives alone, away from society, for religious reasons</p></div>
      <div style="border-left:4px solid #dd754b;background:#dd754b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd754b;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">संन्यासी, एकांतवासी</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">hermit</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">recluse</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">ascetic</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">solitary</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">socialite</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">extrovert</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd754b;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd754b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>anchorite</b> lived in a mountain cave and prayed for most of the day. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd754b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd754b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Villagers brought food to the <b>anchorite</b> but never stayed to talk.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd754b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd754b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Like an <b>anchorite</b>, he gave up wealth, company and comfort for silent study.</span></div></div>
      </div>
    `
  },
  95: {
    questext: "Which word means a person who withdraws from society for a religious life?",
    options: ["anchorite", "orator", "emissary", "herald"],
    correct: "1",
    exptext: "✅ An anchorite lives apart for religion. 📌 Anchorite = anchored alone. ❌ An orator gives speeches."
  },
  96: {
    type: "concept", icon: "🏚️", accent: "#2627c5", pauseTimer: true,
    title: "Recluse",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#2627c5,#2627c577,#f6dc9577);box-shadow:0 14px 30px -14px #2627c599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/48.png" alt="Picture for the word recluse" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#2627c514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#2627c5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/rɪˈkluːs/</span></div>
      <div style="border-left:4px solid #2627c5;background:#2627c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#2627c5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who lives alone and avoids other people</p></div>
      <div style="border-left:4px solid #2627c5;background:#2627c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#2627c5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">एकांतप्रिय, एकांतवासी</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">hermit</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">loner</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">solitary person</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">socialite</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">extrovert</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#2627c5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#2627c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>recluse</b> rarely opened his door, even for his own neighbours.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #2627c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#2627c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>After her loss, she became a <b>recluse</b> and stopped answering calls.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #2627c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#2627c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The famous writer lived as a <b>recluse</b> in a house hidden by tall trees. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  97: {
    questext: "Odd one out among these words:",
    options: ["hermit", "loner", "socialite", "solitary"],
    correct: "3",
    exptext: "✅ A socialite loves company; the rest live alone. 📌 Recluse = locked away. ❌ Hermit, loner and solitary mean alone."
  },
  98: {
    type: "concept", icon: "🕉️", accent: "#63d831", pauseTimer: true,
    title: "Ascetic",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#63d831,#63d83177,#f6dc9577);box-shadow:0 14px 30px -14px #63d83199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/49.png" alt="Picture for the word ascetic" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#63d83114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#63d831;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/əˈsetɪk/</span></div>
      <div style="border-left:4px solid #63d831;background:#63d83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#63d831;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who gives up comforts and lives very simply for spiritual reasons</p></div>
      <div style="border-left:4px solid #63d831;background:#63d83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#63d831;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">तपस्वी, संयमी</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">monk</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">abstainer</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">renunciant</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">hedonist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">epicure</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">sensualist</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#63d831;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#63d831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>ascetic</b> slept on the bare floor and ate only one simple meal a day. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #63d83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#63d831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Though rich, he lived like an <b>ascetic</b>, owning almost nothing.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #63d83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#63d831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The village revered the <b>ascetic</b> who had given up all comforts for meditation.</span></div></div>
      </div>
    `
  },
  99: {
    questext: "Choose the OPPOSITE of \"ascetic\".",
    options: ["hedonist", "monk", "hermit", "abstainer"],
    correct: "1",
    exptext: "✅ A hedonist lives for pleasure; an ascetic denies it. 📌 Ascetic = austere. ❌ Monk, hermit and abstainer are similar to ascetic."
  },
  100: {
    type: "concept", icon: "🛋️", accent: "#dd4ba1", pauseTimer: true,
    title: "Recline",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#dd4ba1,#dd4ba177,#f6dc9577);box-shadow:0 14px 30px -14px #dd4ba199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/50.png" alt="Picture for the word recline" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#dd4ba114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#dd4ba1;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">verb</span><span translate="no" style="opacity:.75;font-style:italic">/rɪˈklaɪn/</span></div>
      <div style="border-left:4px solid #dd4ba1;background:#dd4ba114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4ba1;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">to lean or lie back in a relaxed position</p></div>
      <div style="border-left:4px solid #dd4ba1;background:#dd4ba114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4ba1;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">लेटना, पीछे झुकना</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">lie back</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">lean back</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">repose</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">rest</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">sit up</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">stand</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">rise</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4ba1;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4ba1;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>After lunch, grandfather loved to <b>recline</b> on the cane chair and read. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd4ba133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4ba1;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Passengers may <b>recline</b> their seats once the plane has taken off.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd4ba133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4ba1;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The painter asked his model to <b>recline</b> gracefully on the velvet sofa.</span></div></div>
      </div>
    `
  },
  101: {
    questext: "The tired traveller wished to ______ on the soft sofa and rest.",
    options: ["elude", "conceal", "recline", "hasten"],
    correct: "3",
    exptext: "✅ Recline means to lean or lie back. 📌 Re-cline = lean back. ❌ Elude means to escape cleverly."
  },
  102: {
    type: "concept", icon: "🔮", accent: "#26b2c5", pauseTimer: true,
    title: "Mystic",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#26b2c5,#26b2c577,#f6dc9577);box-shadow:0 14px 30px -14px #26b2c599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/51.png" alt="Picture for the word mystic" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#26b2c514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#26b2c5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈmɪstɪk/</span></div>
      <div style="border-left:4px solid #26b2c5;background:#26b2c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26b2c5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who seeks deep spiritual truth through prayer and meditation</p></div>
      <div style="border-left:4px solid #26b2c5;background:#26b2c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26b2c5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">रहस्यवादी, अध्यात्म-साधक</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">seer</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">visionary</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">spiritualist</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">sceptic</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">materialist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">rationalist</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26b2c5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26b2c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>mystic</b> sat by the river for hours, lost in silent prayer. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26b2c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26b2c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Kabir, a famous poet and <b>mystic</b>, taught that God lives within every heart.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26b2c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26b2c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The <b>mystic</b> claimed to feel a peace that no words could explain.</span></div></div>
      </div>
    `
  },
  103: {
    questext: "Which word means a person who seeks spiritual truth through meditation?",
    options: ["charlatan", "mystic", "pedant", "sceptic"],
    correct: "2",
    exptext: "✅ A mystic seeks spiritual truth. 📌 Mystic = mystery seeker. ❌ A sceptic doubts everything."
  },
  104: {
    type: "concept", icon: "🎭", accent: "#d8bb31", pauseTimer: true,
    title: "Charlatan",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d8bb31,#d8bb3177,#f6dc9577);box-shadow:0 14px 30px -14px #d8bb3199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/52.png" alt="Picture for the word charlatan" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d8bb3114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d8bb31;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈʃɑːlətən/</span></div>
      <div style="border-left:4px solid #d8bb31;background:#d8bb3114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8bb31;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who falsely claims to have special skill or knowledge</p></div>
      <div style="border-left:4px solid #d8bb31;background:#d8bb3114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8bb31;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">ढोंगी, नीमहकीम</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fraud</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">quack</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">impostor</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fake</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">expert</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">authority</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">professional</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8bb31;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8bb31;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>charlatan</b> sold coloured water as a cure for every disease. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8bb3133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8bb31;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Experts warned that the self-styled guru was a <b>charlatan</b> who cheated simple villagers.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8bb3133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8bb31;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>No <b>charlatan</b> can fool a trained doctor for long.</span></div></div>
      </div>
    `
  },
  105: {
    questext: "Which word is closest in meaning to \"charlatan\"?",
    options: ["expert", "scholar", "authority", "quack"],
    correct: "4",
    exptext: "✅ A quack falsely claims skill. 📌 Charlatan = fake expert. ❌ Expert is the opposite."
  },
  106: {
    type: "concept", icon: "🎪", accent: "#994bdd", pauseTimer: true,
    title: "Masquerade",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#994bdd,#994bdd77,#f6dc9577);box-shadow:0 14px 30px -14px #994bdd99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/53.png" alt="Picture for the word masquerade" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#994bdd14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#994bdd;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">verb</span><span translate="no" style="opacity:.75;font-style:italic">/ˌmæskəˈreɪd/</span></div>
      <div style="border-left:4px solid #994bdd;background:#994bdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#994bdd;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">to pretend to be someone or something you are not</p></div>
      <div style="border-left:4px solid #994bdd;background:#994bdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#994bdd;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">ढोंग करना, भेष बदलना</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">pose</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">pretend</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">impersonate</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">disguise</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">reveal</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">unmask</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">expose</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#994bdd;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#994bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The thief tried to <b>masquerade</b> as a postman to enter the building. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #994bdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#994bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Fake news can <b>masquerade</b> as real news and mislead thousands of readers.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #994bdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#994bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>At the ball, guests <b>masquerade</b> as kings, birds and pirates until midnight.</span></div></div>
      </div>
    `
  },
  107: {
    questext: "Choose the OPPOSITE of \"masquerade\".",
    options: ["pose", "pretend", "unmask", "disguise"],
    correct: "3",
    exptext: "✅ Unmask means to reveal the truth. 📌 Mask-erade = wear a mask. ❌ Pose, pretend and disguise are similar."
  },
  108: {
    type: "concept", icon: "🧠", accent: "#26c54c", pauseTimer: true,
    title: "Omniscient",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#26c54c,#26c54c77,#f6dc9577);box-shadow:0 14px 30px -14px #26c54c99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/54.png" alt="Picture for the word omniscient" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#26c54c14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#26c54c;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ɒmˈnɪsiənt/</span></div>
      <div style="border-left:4px solid #26c54c;background:#26c54c14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c54c;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">knowing everything</p></div>
      <div style="border-left:4px solid #26c54c;background:#26c54c14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c54c;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">सर्वज्ञ</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">all-knowing</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">all-wise</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">infinitely wise</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">ignorant</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">unaware</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">uninformed</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c54c;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c54c;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Many people believe God is <b>omniscient</b> and knows every thought.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c54c33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c54c;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>No teacher is <b>omniscient</b>, so it is fine to say "I will find out."</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c54c33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c54c;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The <b>omniscient</b> narrator of the novel knows what every character secretly thinks. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  109: {
    questext: "Which word describes someone who knows everything?",
    options: ["omniscient", "eloquent", "sanguine", "stoic"],
    correct: "1",
    exptext: "✅ Omniscient means all-knowing. 📌 Omni = all, sci = know. ❌ Eloquent means fluent in speech."
  },
  110: {
    type: "concept", icon: "🌐", accent: "#d83139", pauseTimer: true,
    title: "Ubiquitous",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d83139,#d8313977,#f6dc9577);box-shadow:0 14px 30px -14px #d8313999,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/55.png" alt="Picture for the word ubiquitous" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d8313914"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d83139;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/juːˈbɪkwɪtəs/</span></div>
      <div style="border-left:4px solid #d83139;background:#d8313914;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d83139;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">seeming to be present everywhere at the same time</p></div>
      <div style="border-left:4px solid #d83139;background:#d8313914;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d83139;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">सर्वव्यापी, हर जगह मौजूद</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">omnipresent</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">everywhere</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">pervasive</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">universal</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">rare</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">scarce</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">absent</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d83139;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d83139;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Mobile phones are <b>ubiquitous</b>; you see them in almost every hand. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8313933;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d83139;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The <b>ubiquitous</b> smell of fresh tea filled every lane of the old market.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8313933;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d83139;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Fast food chains have become <b>ubiquitous</b> in cities and small towns alike.</span></div></div>
      </div>
    `
  },
  111: {
    questext: "Choose the OPPOSITE of \"ubiquitous\".",
    options: ["universal", "pervasive", "omnipresent", "scarce"],
    correct: "4",
    exptext: "✅ Scarce means hard to find. 📌 Ubi = where; found everywhere. ❌ Universal, pervasive and omnipresent are synonyms."
  },
  112: {
    type: "concept", icon: "🌿", accent: "#4b7ddd", pauseTimer: true,
    title: "Immanent",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4b7ddd,#4b7ddd77,#f6dc9577);box-shadow:0 14px 30px -14px #4b7ddd99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/56.png" alt="Picture for the word immanent" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4b7ddd14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4b7ddd;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ˈɪmənənt/</span></div>
      <div style="border-left:4px solid #4b7ddd;background:#4b7ddd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b7ddd;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">present inside something as a natural part of it</p></div>
      <div style="border-left:4px solid #4b7ddd;background:#4b7ddd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b7ddd;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">अंतर्निहित, भीतर व्याप्त</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">inherent</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">intrinsic</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">indwelling</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">innate</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">external</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">extrinsic</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">outer</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b7ddd;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b7ddd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Some thinkers say God is <b>immanent</b> in nature, not far away from it.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4b7ddd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b7ddd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>A sense of fairness is <b>immanent</b> in every child.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4b7ddd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b7ddd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The poet felt a quiet beauty <b>immanent</b> in even the smallest pebble. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  113: {
    questext: "Which word means \"existing within; inherent\"?",
    options: ["imminent", "immanent", "eminent", "impromptu"],
    correct: "2",
    exptext: "✅ Immanent means existing within. 📌 im-MAN-ent: the man is within. ❌ Imminent means about to happen."
  },
  114: {
    type: "concept", icon: "⏳", accent: "#8ac526", pauseTimer: true,
    title: "Imminent",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#8ac526,#8ac52677,#f6dc9577);box-shadow:0 14px 30px -14px #8ac52699,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/57.png" alt="Picture for the word imminent" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#8ac52614"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#8ac526;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ˈɪmɪnənt/</span></div>
      <div style="border-left:4px solid #8ac526;background:#8ac52614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#8ac526;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">about to happen very soon</p></div>
      <div style="border-left:4px solid #8ac526;background:#8ac52614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#8ac526;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">निकट, आसन्न</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">impending</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">approaching</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">looming</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">forthcoming</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">distant</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">remote</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">far-off</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#8ac526;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#8ac526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Black clouds warned that a heavy storm was <b>imminent</b>. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #8ac52633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#8ac526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The company announced that an <b>imminent</b> merger would change the way it works.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #8ac52633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#8ac526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>With exams <b>imminent</b>, the library was full from morning till midnight.</span></div></div>
      </div>
    `
  },
  115: {
    questext: "Dark clouds show that rain is ______.",
    options: ["eminent", "imminent", "immanent", "impromptu"],
    correct: "2",
    exptext: "✅ Imminent means about to happen. 📌 imMINent = coming in a MINute. ❌ Eminent means famous."
  },
  116: {
    type: "concept", icon: "🌟", accent: "#d831cb", pauseTimer: true,
    title: "Eminent",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d831cb,#d831cb77,#f6dc9577);box-shadow:0 14px 30px -14px #d831cb99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/58.png" alt="Picture for the word eminent" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d831cb14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d831cb;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ˈemɪnənt/</span></div>
      <div style="border-left:4px solid #d831cb;background:#d831cb14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d831cb;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">famous and respected, especially in a profession</p></div>
      <div style="border-left:4px solid #d831cb;background:#d831cb14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d831cb;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">प्रतिष्ठित, विख्यात</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">distinguished</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">renowned</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">illustrious</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">prominent</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">unknown</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">obscure</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">insignificant</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d831cb;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d831cb;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The college invited an <b>eminent</b> scientist to open its new laboratory. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d831cb33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d831cb;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>She is an <b>eminent</b> surgeon admired across the country.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d831cb33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d831cb;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The <b>eminent</b> poet received the award with humble words.</span></div></div>
      </div>
    `
  },
  117: {
    questext: "Choose the OPPOSITE of \"eminent\".",
    options: ["renowned", "distinguished", "prominent", "obscure"],
    correct: "4",
    exptext: "✅ Obscure means unknown. 📌 Eminent = on top, famous. ❌ Renowned and distinguished are synonyms."
  },
  118: {
    type: "concept", icon: "🚧", accent: "#4bddbd", pauseTimer: true,
    title: "Impasse",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4bddbd,#4bddbd77,#f6dc9577);box-shadow:0 14px 30px -14px #4bddbd99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/59.png" alt="Picture for the word impasse" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4bddbd14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4bddbd;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈɪmpɑːs/</span></div>
      <div style="border-left:4px solid #4bddbd;background:#4bddbd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bddbd;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a situation in which no progress can be made</p></div>
      <div style="border-left:4px solid #4bddbd;background:#4bddbd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bddbd;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">गतिरोध, अवरोध</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">deadlock</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">stalemate</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">standoff</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">dead end</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">breakthrough</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">agreement</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">progress</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bddbd;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bddbd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The talks ended in an <b>impasse</b> when neither side would change its demand. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bddbd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bddbd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The union and the management reached an <b>impasse</b> over wages.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bddbd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bddbd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Stuck at an <b>impasse</b>, the two neighbours finally asked an elder to help.</span></div></div>
      </div>
    `
  },
  119: {
    questext: "Which word is closest in meaning to \"impasse\"?",
    options: ["deadlock", "agreement", "progress", "breakthrough"],
    correct: "1",
    exptext: "✅ Deadlock means no way forward. 📌 Im-passe = no pass. ❌ Breakthrough is the opposite."
  },
  120: {
    type: "concept", icon: "🐊", accent: "#c57426", pauseTimer: true,
    title: "Quagmire",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#c57426,#c5742677,#f6dc9577);box-shadow:0 14px 30px -14px #c5742699,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/60.png" alt="Picture for the word quagmire" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#c5742614"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#c57426;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈkwæɡmaɪər/</span></div>
      <div style="border-left:4px solid #c57426;background:#c5742614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c57426;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a difficult situation that is hard to get out of</p></div>
      <div style="border-left:4px solid #c57426;background:#c5742614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c57426;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">दलदल, कठिन स्थिति</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">swamp</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">morass</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">predicament</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">mess</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">dry land</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">ease</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c57426;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c57426;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The heavy rain turned the village road into a <b>quagmire</b> of sticky mud. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5742633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c57426;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The company slipped into a financial <b>quagmire</b> after three bad years.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5742633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c57426;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Each new rule only pulled the project deeper into a bureaucratic <b>quagmire</b>.</span></div></div>
      </div>
    `
  },
  121: {
    questext: "The war became a ______ from which the army could not escape.",
    options: ["epilogue", "epitome", "quagmire", "almanac"],
    correct: "3",
    exptext: "✅ A quagmire is a swamp-like hard situation. 📌 Quag = bog, mire = mud. ❌ An epilogue is the end of a book."
  },
  122: {
    type: "concept", icon: "🏆", accent: "#5331d8", pauseTimer: true,
    title: "Pyrrhic",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#5331d8,#5331d877,#f6dc9577);box-shadow:0 14px 30px -14px #5331d899,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/61.png" alt="Picture for the word Pyrrhic" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#5331d814"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#5331d8;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ˈpɪrɪk/</span></div>
      <div style="border-left:4px solid #5331d8;background:#5331d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#5331d8;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a win gained at such a heavy cost that it feels like a loss</p></div>
      <div style="border-left:4px solid #5331d8;background:#5331d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#5331d8;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">महँगी जीत</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">costly</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">ruinous</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">hollow</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">easy</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">painless</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#5331d8;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#5331d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The team won the final, but with three injured stars it was a <b>Pyrrhic</b> victory. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #5331d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#5331d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Winning the case cost him his savings, so it felt like a <b>Pyrrhic</b> success.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #5331d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#5331d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The general knew the battle was a <b>Pyrrhic</b> triumph, for his army was nearly destroyed.</span></div></div>
      </div>
    `
  },
  123: {
    questext: "Which is a Pyrrhic victory?",
    options: ["A team wins easily without any injury.", "A student passes with joy and a gift.", "A farmer harvests a bumper crop at low cost.", "A company wins a case but loses all its money."],
    correct: "4",
    exptext: "✅ Winning at a ruinous cost is a Pyrrhic victory. 📌 King Pyrrhus won but lost most of his army. ❌ Easy wins cost nothing."
  },
  124: {
    type: "concept", icon: "🎸", accent: "#58dd4b", pauseTimer: true,
    title: "Impromptu",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#58dd4b,#58dd4b77,#f6dc9577);box-shadow:0 14px 30px -14px #58dd4b99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/62.png" alt="Picture for the word impromptu" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#58dd4b14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#58dd4b;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ɪmˈprɒmptjuː/</span></div>
      <div style="border-left:4px solid #58dd4b;background:#58dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#58dd4b;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">done without planning or preparation</p></div>
      <div style="border-left:4px solid #58dd4b;background:#58dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#58dd4b;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">तत्काल, बिना तैयारी का</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">unplanned</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">spontaneous</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">improvised</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">off-the-cuff</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">planned</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">rehearsed</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">prepared</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#58dd4b;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#58dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Friends gave an <b>impromptu</b> concert on the beach when the evening turned cool. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #58dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#58dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>She made an <b>impromptu</b> speech when the chief guest did not arrive.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #58dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#58dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The <b>impromptu</b> picnic was the best part of the long trip.</span></div></div>
      </div>
    `
  },
  125: {
    questext: "Choose the word closest in meaning to \"impromptu\".",
    options: ["spontaneous", "rehearsed", "formal", "prepared"],
    correct: "1",
    exptext: "✅ Spontaneous means done without planning. 📌 Impromptu = on the spot. ❌ Rehearsed is the opposite."
  },
  126: {
    type: "concept", icon: "⏱️", accent: "#c52663", pauseTimer: true,
    title: "Extempore",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#c52663,#c5266377,#f6dc9577);box-shadow:0 14px 30px -14px #c5266399,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/63.png" alt="Picture for the word extempore" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#c5266314"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#c52663;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ɪkˈstempəri/</span></div>
      <div style="border-left:4px solid #c52663;background:#c5266314;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c52663;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">spoken or done without any preparation</p></div>
      <div style="border-left:4px solid #c52663;background:#c5266314;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c52663;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">तुरंत, बिना तैयारी का</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">impromptu</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">unrehearsed</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">offhand</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">spontaneous</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">prepared</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">rehearsed</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">planned</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#c52663;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c52663;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The minister gave an <b>extempore</b> reply without looking at his notes.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5266333;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c52663;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Students enjoyed the <b>extempore</b> speaking contest, where topics were handed out on the spot. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #c5266333;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#c52663;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>He was able to speak <b>extempore</b> for twenty minutes on any topic.</span></div></div>
      </div>
    `
  },
  127: {
    questext: "Odd one out among these words:",
    options: ["impromptu", "unrehearsed", "prepared", "spontaneous"],
    correct: "3",
    exptext: "✅ Prepared means planned beforehand; the rest mean unplanned. 📌 Ex-tempore = out of the moment. ❌ Impromptu is a synonym."
  },
  128: {
    type: "concept", icon: "🔎", accent: "#31a2d8", pauseTimer: true,
    title: "Pedant",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#31a2d8,#31a2d877,#f6dc9577);box-shadow:0 14px 30px -14px #31a2d899,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/64.png" alt="Picture for the word pedant" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#31a2d814"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#31a2d8;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈpedənt/</span></div>
      <div style="border-left:4px solid #31a2d8;background:#31a2d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31a2d8;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who cares too much about small details and rules</p></div>
      <div style="border-left:4px solid #31a2d8;background:#31a2d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31a2d8;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">किताबी विद्वान, बारीकी पसंद</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">nitpicker</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">stickler</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">quibbler</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">hair-splitter</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31a2d8;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31a2d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>pedant</b> corrected the speaker's grammar even in the middle of the party.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31a2d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31a2d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Our teacher is no <b>pedant</b>; she values ideas more than tiny details.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31a2d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31a2d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Only a <b>pedant</b> would argue about a comma while the building was on fire. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  129: {
    questext: "A person who fusses over minor details and rules is a ______.",
    options: ["savant", "pedant", "pedagogue", "orator"],
    correct: "2",
    exptext: "✅ A pedant fusses over small details. 📌 Pedant = petty details. ❌ A pedagogue is a teacher."
  },
  130: {
    type: "concept", icon: "🎨", accent: "#d8dd4b", pauseTimer: true,
    title: "Surrealism",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d8dd4b,#d8dd4b77,#f6dc9577);box-shadow:0 14px 30px -14px #d8dd4b99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/65.png" alt="Picture for the word surrealism" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d8dd4b14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d8dd4b;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/səˈriːəlɪzəm/</span></div>
      <div style="border-left:4px solid #d8dd4b;background:#d8dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8dd4b;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an art style that shows dreams and strange, impossible images</p></div>
      <div style="border-left:4px solid #d8dd4b;background:#d8dd4b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8dd4b;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">अतियथार्थवाद, स्वप्निल कला</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fantasy art</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">dream art</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fantastic art</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">realism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">naturalism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">verism</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8dd4b;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>A painting of melting clocks in a desert is a classic work of <b>surrealism</b>. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The film's <b>surrealism</b> made viewers feel they were walking inside a dream.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8dd4b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8dd4b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Poets of <b>surrealism</b> wrote strange images straight from the dreaming mind.</span></div></div>
      </div>
    `
  },
  131: {
    questext: "Which art style shows dreams and impossible scenes?",
    options: ["realism", "verism", "surrealism", "classicism"],
    correct: "3",
    exptext: "✅ Surrealism paints dream-like scenes. 📌 Sur-real = beyond real. ❌ Realism shows life as it is."
  },
  132: {
    type: "concept", icon: "📷", accent: "#9c26c5", pauseTimer: true,
    title: "Verism",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#9c26c5,#9c26c577,#f6dc9577);box-shadow:0 14px 30px -14px #9c26c599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/66.png" alt="Picture for the word verism" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#9c26c514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#9c26c5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈvɪərɪzəm/</span></div>
      <div style="border-left:4px solid #9c26c5;background:#9c26c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#9c26c5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">the use of real, everyday life in art, even when it is ugly</p></div>
      <div style="border-left:4px solid #9c26c5;background:#9c26c514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#9c26c5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">यथार्थवाद, सत्यवाद</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">realism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">naturalism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">true-to-life style</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">idealism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">romanticism</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">surrealism</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#9c26c5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#9c26c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The writer's <b>verism</b> showed the poor workers' lives exactly as they were.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #9c26c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#9c26c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Critics admired the film's <b>verism</b>, from its dusty streets to its tired faces. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #9c26c533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#9c26c5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>In an age of fantasy, her paintings stood out for their stern <b>verism</b>.</span></div></div>
      </div>
    `
  },
  133: {
    questext: "Choose the OPPOSITE of \"verism\".",
    options: ["realism", "idealism", "naturalism", "truthfulness"],
    correct: "2",
    exptext: "✅ Idealism shows life as perfect, the opposite of verism. 📌 Ver = true. ❌ Realism and naturalism are close synonyms."
  },
  134: {
    type: "concept", icon: "✅", accent: "#31d87c", pauseTimer: true,
    title: "Veracity",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#31d87c,#31d87c77,#f6dc9577);box-shadow:0 14px 30px -14px #31d87c99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/67.png" alt="Picture for the word veracity" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#31d87c14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#31d87c;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/vəˈræsəti/</span></div>
      <div style="border-left:4px solid #31d87c;background:#31d87c14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d87c;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">the quality of being truthful and accurate</p></div>
      <div style="border-left:4px solid #31d87c;background:#31d87c14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d87c;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">सत्यता, सच्चाई</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">truthfulness</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">honesty</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">accuracy</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">authenticity</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">falsehood</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">dishonesty</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">deceit</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#31d87c;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d87c;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The judge questioned the <b>veracity</b> of the witness's story. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31d87c33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d87c;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Journalists must check the <b>veracity</b> of every claim before publishing it.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #31d87c33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#31d87c;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Nobody doubted the <b>veracity</b> of the old soldier's tales.</span></div></div>
      </div>
    `
  },
  135: {
    questext: "Which word is closest in meaning to \"veracity\"?",
    options: ["truthfulness", "falsehood", "cunning", "pride"],
    correct: "1",
    exptext: "✅ Truthfulness is being honest and accurate. 📌 Ver = true, as in verify. ❌ Falsehood is the opposite."
  },
  136: {
    type: "concept", icon: "😣", accent: "#dd624b", pauseTimer: true,
    title: "Masochist",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#dd624b,#dd624b77,#f6dc9577);box-shadow:0 14px 30px -14px #dd624b99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/68.png" alt="Picture for the word masochist" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#dd624b14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#dd624b;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈmæsəkɪst/</span></div>
      <div style="border-left:4px solid #dd624b;background:#dd624b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd624b;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who enjoys suffering or being hurt</p></div>
      <div style="border-left:4px solid #dd624b;background:#dd624b14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd624b;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">आत्मपीड़क, स्वपीड़न-प्रेमी</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">self-tormentor</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">self-punisher</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">pain-lover</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">sadist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">tormentor</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd624b;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd624b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>Only a <b>masochist</b> would run a marathon barefoot on hot sand for fun. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd624b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd624b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The psychologist described the <b>masochist</b> as someone who finds pleasure in his own pain.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd624b33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd624b;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Accused of being a <b>masochist</b>, he kept returning to the cruel boss who shouted at him.</span></div></div>
      </div>
    `
  },
  137: {
    questext: "जो स्वयं कष्ट सहकर आनंद पाता है, उसे क्या कहते हैं?",
    options: ["sadist", "savant", "pedant", "masochist"],
    correct: "4",
    exptext: "✅ A masochist enjoys his own suffering. 📌 Masochist = hurts himself. ❌ A sadist enjoys hurting others."
  },
  138: {
    type: "concept", icon: "😈", accent: "#263bc5", pauseTimer: true,
    title: "Sadist",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#263bc5,#263bc577,#f6dc9577);box-shadow:0 14px 30px -14px #263bc599,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/69.png" alt="Picture for the word sadist" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#263bc514"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#263bc5;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈseɪdɪst/</span></div>
      <div style="border-left:4px solid #263bc5;background:#263bc514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#263bc5;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who enjoys hurting other people</p></div>
      <div style="border-left:4px solid #263bc5;background:#263bc514;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#263bc5;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">परपीड़क</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">tormentor</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">brute</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">bully</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">masochist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">humanitarian</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">benefactor</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#263bc5;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#263bc5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The cruel guard, a true <b>sadist</b>, laughed while the prisoners suffered.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #263bc533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#263bc5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Nobody liked the <b>sadist</b> who teased smaller children until they cried. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #263bc533;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#263bc5;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>In the novel, the <b>sadist</b> rules the village by fear and enjoys others' pain.</span></div></div>
      </div>
    `
  },
  139: {
    questext: "Choose the OPPOSITE of \"sadist\".",
    options: ["bully", "humanitarian", "tormentor", "brute"],
    correct: "2",
    exptext: "✅ A humanitarian helps and cares for others. 📌 Sadist = enjoys others' pain. ❌ Bully, tormentor and brute are synonyms."
  },
  140: {
    type: "concept", icon: "🧑‍🔬", accent: "#78d831", pauseTimer: true,
    title: "Savant",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#78d831,#78d83177,#f6dc9577);box-shadow:0 14px 30px -14px #78d83199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/70.png" alt="Picture for the word savant" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#78d83114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#78d831;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/səˈvɑːnt/</span></div>
      <div style="border-left:4px solid #78d831;background:#78d83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#78d831;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person with great learning in a special field</p></div>
      <div style="border-left:4px solid #78d831;background:#78d83114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#78d831;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">विद्वान, महापंडित</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">scholar</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">sage</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">learned person</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">genius</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">ignoramus</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">dunce</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">fool</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#78d831;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#78d831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The village <b>savant</b> knew the history of every temple in the district. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #78d83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#78d831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>A <b>savant</b> in mathematics, she solved problems that puzzled professors.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #78d83133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#78d831;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The young <b>savant</b> amazed the guests by recalling every date of the king's rule.</span></div></div>
      </div>
    `
  },
  141: {
    questext: "Choose the OPPOSITE of \"savant\".",
    options: ["scholar", "sage", "genius", "ignoramus"],
    correct: "4",
    exptext: "✅ An ignoramus is an ignorant person. 📌 Savant = knowing much. ❌ Scholar and sage are synonyms."
  },
  142: {
    type: "concept", icon: "🎻", accent: "#dd4bb4", pauseTimer: true,
    title: "Virtuoso",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#dd4bb4,#dd4bb477,#f6dc9577);box-shadow:0 14px 30px -14px #dd4bb499,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/71.png" alt="Picture for the word virtuoso" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#dd4bb414"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#dd4bb4;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˌvɜːtʃuˈəʊsəʊ/</span></div>
      <div style="border-left:4px solid #dd4bb4;background:#dd4bb414;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4bb4;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person with outstanding skill, especially in music</p></div>
      <div style="border-left:4px solid #dd4bb4;background:#dd4bb414;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4bb4;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">कला-निपुण, उस्ताद</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">master</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">maestro</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">expert</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">genius</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">amateur</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">novice</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">beginner</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dd4bb4;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4bb4;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The violin <b>virtuoso</b> played so fast that the audience held its breath. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd4bb433;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4bb4;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>A <b>virtuoso</b> with the camera, he captured a hundred moods in one frame.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #dd4bb433;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#dd4bb4;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The young <b>virtuoso</b> drew applause with a flawless recital.</span></div></div>
      </div>
    `
  },
  143: {
    questext: "Choose the OPPOSITE of \"virtuoso\".",
    options: ["amateur", "maestro", "master", "expert"],
    correct: "1",
    exptext: "✅ An amateur lacks great skill. 📌 Virtuoso = virtue of skill. ❌ Maestro, master and expert are synonyms."
  },
  144: {
    type: "concept", icon: "💭", accent: "#26c5c4", pauseTimer: true,
    title: "Allusion",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#26c5c4,#26c5c477,#f6dc9577);box-shadow:0 14px 30px -14px #26c5c499,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/72.png" alt="Picture for the word allusion" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#26c5c414"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#26c5c4;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/əˈluːʒn/</span></div>
      <div style="border-left:4px solid #26c5c4;background:#26c5c414;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c5c4;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">an indirect reference to something without saying it directly</p></div>
      <div style="border-left:4px solid #26c5c4;background:#26c5c414;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c5c4;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">संकेत, परोक्ष उल्लेख</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">hint</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">reference</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">mention</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">suggestion</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="opacity:.6">—</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c5c4;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c5c4;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>His remark about "a modern Ravana" was an <b>allusion</b> to the greedy contractor. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c5c433;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c5c4;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The poem is full of <b>allusions</b> to Greek myths.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c5c433;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c5c4;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>She made a subtle <b>allusion</b> to the incident without naming anyone.</span></div></div>
      </div>
    `
  },
  145: {
    questext: "The speaker made an ______ to the Mahabharata in his talk.",
    options: ["illusion", "elusion", "allusion", "delusion"],
    correct: "3",
    exptext: "✅ Allusion is an indirect reference. 📌 ALLusion = ALLude, hint. ❌ Illusion is a false appearance."
  },
  146: {
    type: "concept", icon: "🏃", accent: "#d8a631", pauseTimer: true,
    title: "Elusion",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d8a631,#d8a63177,#f6dc9577);box-shadow:0 14px 30px -14px #d8a63199,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/73.png" alt="Picture for the word elusion" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d8a63114"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d8a631;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ɪˈluːʒn/</span></div>
      <div style="border-left:4px solid #d8a631;background:#d8a63114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8a631;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">the act of escaping or avoiding something cleverly</p></div>
      <div style="border-left:4px solid #d8a631;background:#d8a63114;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8a631;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">चकमा, बचाव</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">evasion</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">escape</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">dodging</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">avoidance</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">capture</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">confrontation</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8a631;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8a631;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The thief's <b>elusion</b> of the police lasted three weeks. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8a63133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8a631;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The cat's skilful <b>elusion</b> of the dog amused the whole street.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8a63133;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8a631;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>His <b>elusion</b> of the question showed he had no answer.</span></div></div>
      </div>
    `
  },
  147: {
    questext: "Which word means the act of escaping or avoiding cleverly?",
    options: ["elusion", "allusion", "illusion", "collusion"],
    correct: "1",
    exptext: "✅ Elusion means clever escape. 📌 Elusion = ESCAPE. ❌ Allusion is an indirect reference."
  },
  148: {
    type: "concept", icon: "🌊", accent: "#864bdd", pauseTimer: true,
    title: "Illusion",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#864bdd,#864bdd77,#f6dc9577);box-shadow:0 14px 30px -14px #864bdd99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/74.png" alt="Picture for the word illusion" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#864bdd14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#864bdd;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ɪˈluːʒn/</span></div>
      <div style="border-left:4px solid #864bdd;background:#864bdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#864bdd;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a false idea or appearance that seems real</p></div>
      <div style="border-left:4px solid #864bdd;background:#864bdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#864bdd;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">भ्रम, माया</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">delusion</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">mirage</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fantasy</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">misconception</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">reality</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">truth</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">fact</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#864bdd;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#864bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The shimmering water on the hot road is only an <b>illusion</b> of the desert heat. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #864bdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#864bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>He lived under the <b>illusion</b> that wealth brings lasting happiness.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #864bdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#864bdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The magician's <b>illusion</b> made the elephant vanish before everyone's eyes.</span></div></div>
      </div>
    `
  },
  149: {
    questext: "A false picture that seems real, like a mirage, is an ______.",
    options: ["allusion", "elusion", "illusion", "evasion"],
    correct: "3",
    exptext: "✅ An illusion is a false appearance. 📌 ILLusion = ILL sight. ❌ Allusion is an indirect reference."
  },
  150: {
    type: "concept", icon: "🦊", accent: "#26c538", pauseTimer: true,
    title: "Elude",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#26c538,#26c53877,#f6dc9577);box-shadow:0 14px 30px -14px #26c53899,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/75.png" alt="Picture for the word elude" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#26c53814"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#26c538;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">verb</span><span translate="no" style="opacity:.75;font-style:italic">/ɪˈluːd/</span></div>
      <div style="border-left:4px solid #26c538;background:#26c53814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c538;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">to escape or avoid someone or something cleverly</p></div>
      <div style="border-left:4px solid #26c538;background:#26c53814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c538;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">चकमा देना, बच निकलना</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">evade</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">dodge</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">escape</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">avoid</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">face</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">confront</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">catch</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#26c538;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c538;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The fox managed to <b>elude</b> the hunters by hiding in a hollow log. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c53833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c538;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The exact answer continued to <b>elude</b> the students despite hours of effort.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #26c53833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#26c538;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The thief hoped to <b>elude</b> capture by changing trains at midnight.</span></div></div>
      </div>
    `
  },
  151: {
    questext: "Which word is closest in meaning to \"elude\"?",
    options: ["confront", "catch", "face", "evade"],
    correct: "4",
    exptext: "✅ Evade means to escape cleverly. 📌 E-lude = slip out. ❌ Confront is the opposite."
  },
  152: {
    type: "concept", icon: "🏴", accent: "#d8314f", pauseTimer: true,
    title: "Anarchist",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#d8314f,#d8314f77,#f6dc9577);box-shadow:0 14px 30px -14px #d8314f99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/76.png" alt="Picture for the word anarchist" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#d8314f14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#d8314f;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈænəkɪst/</span></div>
      <div style="border-left:4px solid #d8314f;background:#d8314f14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8314f;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who believes there should be no government or law</p></div>
      <div style="border-left:4px solid #d8314f;background:#d8314f14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8314f;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">अराजकतावादी</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">rebel</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">nihilist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">revolutionary</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">insurgent</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">loyalist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">conformist</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#d8314f;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8314f;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>anarchist</b> said that people could manage life without any ruler.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8314f33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8314f;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Police arrested the <b>anarchist</b> for urging the crowd to ignore every law. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #d8314f33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#d8314f;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Some novels show the <b>anarchist</b> as a dreamer, others as a threat.</span></div></div>
      </div>
    `
  },
  153: {
    questext: "A person who wants no government at all is an ______.",
    options: ["realist", "anarchist", "savant", "pedant"],
    correct: "2",
    exptext: "✅ An anarchist rejects all government. 📌 An-archy = no ruler. ❌ A realist sees things as they are."
  },
  154: {
    type: "concept", icon: "🧭", accent: "#4b8fdd", pauseTimer: true,
    title: "Realist",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4b8fdd,#4b8fdd77,#f6dc9577);box-shadow:0 14px 30px -14px #4b8fdd99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/77.png" alt="Picture for the word realist" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4b8fdd14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4b8fdd;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈrɪəlɪst/</span></div>
      <div style="border-left:4px solid #4b8fdd;background:#4b8fdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b8fdd;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a person who sees things as they really are</p></div>
      <div style="border-left:4px solid #4b8fdd;background:#4b8fdd14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b8fdd;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">यथार्थवादी</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">pragmatist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">practical person</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">rationalist</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">idealist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">dreamer</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">romantic</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4b8fdd;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b8fdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>As a <b>realist</b>, she knew that passing without practice was impossible.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4b8fdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b8fdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The coach, a <b>realist</b>, told the team they were not yet ready for the finals. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4b8fdd33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4b8fdd;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>A true <b>realist</b> neither hopes for miracles nor expects disasters.</span></div></div>
      </div>
    `
  },
  155: {
    questext: "Choose the OPPOSITE of \"realist\".",
    options: ["pragmatist", "materialist", "rationalist", "dreamer"],
    correct: "4",
    exptext: "✅ A dreamer lives in imagination, not reality. 📌 Real-ist = sees real. ❌ Pragmatist and rationalist are similar to realist."
  },
  156: {
    type: "concept", icon: "🚩", accent: "#9fc526", pauseTimer: true,
    title: "Jingoistic",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#9fc526,#9fc52677,#f6dc9577);box-shadow:0 14px 30px -14px #9fc52699,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/78.png" alt="Picture for the word jingoistic" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#9fc52614"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#9fc526;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">adjective</span><span translate="no" style="opacity:.75;font-style:italic">/ˌdʒɪŋɡəʊˈɪstɪk/</span></div>
      <div style="border-left:4px solid #9fc526;background:#9fc52614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#9fc526;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">showing aggressive and extreme pride in one's own country</p></div>
      <div style="border-left:4px solid #9fc526;background:#9fc52614;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#9fc526;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">अंधराष्ट्रवादी</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">chauvinistic</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">warmongering</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">ultranationalist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">belligerent</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">peace-loving</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">pacifist</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">moderate</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#9fc526;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#9fc526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The <b>jingoistic</b> speaker demanded war and shouted that no other country mattered. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #9fc52633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#9fc526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>Newspapers with a <b>jingoistic</b> tone often increase hatred between neighbouring nations.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #9fc52633;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#9fc526;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>Her <b>jingoistic</b> views made her blind to the good in other cultures.</span></div></div>
      </div>
    `
  },
  157: {
    questext: "Which word best describes extreme, aggressive patriotism?",
    options: ["tolerant", "jingoistic", "neutral", "peaceful"],
    correct: "2",
    exptext: "✅ Jingoistic means aggressively nationalistic. 📌 Jingo = war cry. ❌ Peaceful is the opposite."
  },
  158: {
    type: "concept", icon: "🌤️", accent: "#cf31d8", pauseTimer: true,
    title: "Reverie",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#cf31d8,#cf31d877,#f6dc9577);box-shadow:0 14px 30px -14px #cf31d899,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/79.png" alt="Picture for the word reverie" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#cf31d814"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#cf31d8;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/ˈrevəri/</span></div>
      <div style="border-left:4px solid #cf31d8;background:#cf31d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#cf31d8;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a state of pleasant daydreaming</p></div>
      <div style="border-left:4px solid #cf31d8;background:#cf31d814;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#cf31d8;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">दिवास्वप्न, खयाली दुनिया</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">daydream</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">trance</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">fantasy</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">musing</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">alertness</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">attention</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">awareness</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#cf31d8;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#cf31d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>A sudden knock at the door broke her <b>reverie</b> by the window. <span title="shown in the picture">🖼️</span></span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #cf31d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#cf31d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>The student sat lost in <b>reverie</b> while the lecture went on.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #cf31d833;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#cf31d8;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The old man sat on the porch in a happy <b>reverie</b> of his youth.</span></div></div>
      </div>
    `
  },
  159: {
    questext: "He was so lost in ______ that he did not hear the bell.",
    options: ["jargon", "ledger", "reverie", "quagmire"],
    correct: "3",
    exptext: "✅ Reverie is pleasant daydreaming. 📌 Reverie = rave in thought. ❌ A quagmire is a hard situation."
  },
  160: {
    type: "concept", icon: "🎉", accent: "#4bddab", pauseTimer: true,
    title: "Euphoria",
    html: `
      <div class="cp-vocab">
      <div class="cp-vtop" style="display:flex;flex-direction:row-reverse;flex-wrap:wrap;align-items:flex-start;gap:6px 18px;margin:0">
      <div class="cp-fig" style="flex:0 1 360px;max-width:100%;margin:0 auto;padding:4px;border-radius:20px;background:linear-gradient(135deg,#4bddab,#4bddab77,#f6dc9577);box-shadow:0 14px 30px -14px #4bddab99,0 2px 6px rgba(0,0,0,.12)"><img src="images/English/Vocabulary/Vocab_Set_1/80.png" alt="Picture for the word euphoria" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;background:#4bddab14"></div>
      <div style="flex:1 1 300px;min-width:0">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:2px 0 10px"><span class="cp-pos" style="padding:4px 14px;border-radius:999px;background:#4bddab;color:#fff;font-size:.8em;font-weight:800;letter-spacing:.08em;text-transform:uppercase">noun</span><span translate="no" style="opacity:.75;font-style:italic">/juːˈfɔːriə/</span></div>
      <div style="border-left:4px solid #4bddab;background:#4bddab14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bddab;margin-bottom:6px">Meaning</div><p class="cp-lead" style="margin:0">a feeling of great happiness and excitement</p></div>
      <div style="border-left:4px solid #4bddab;background:#4bddab14;border-radius:12px;padding:12px 14px;margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bddab;margin-bottom:6px">हिंदी अर्थ</div><p lang="hi" style="margin:0;font-size:1.18em;font-weight:700">उल्लास, अत्यंत हर्ष</p></div>
      </div></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin:8px 0"><div style="flex:1 1 210px;border:1px solid #16a34a55;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#16a34a;margin-bottom:6px">✅ Synonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">elation</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">bliss</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">joy</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#16a34a22;color:#16a34a;border:1px solid #16a34a55">rapture</span></div><div style="flex:1 1 210px;border:1px solid #dc262655;border-radius:12px;padding:10px 12px"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#dc2626;margin-bottom:6px">↔️ Antonyms</div><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">misery</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">despair</span><span style="display:inline-block;padding:4px 12px;margin:3px 6px 3px 0;border-radius:999px;font-size:.92em;font-weight:600;background:#dc262622;color:#dc2626;border:1px solid #dc262655">gloom</span></div></div>
      <div style="margin:8px 0"><div style="font-size:.72em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#4bddab;margin-bottom:6px">✍️ Usage — 3 sentences</div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bddab;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">1</span><span>The whole city was in <b>euphoria</b> after the team lifted the trophy.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bddab33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bddab;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">2</span><span>A wave of <b>euphoria</b> swept over her when the results were announced.</span></div><div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px solid #4bddab33;"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#4bddab;color:#fff;text-align:center;line-height:24px;font-size:.8em;font-weight:700">3</span><span>The mountaineers felt pure <b>euphoria</b> on reaching the summit at dawn. <span title="shown in the picture">🖼️</span></span></div></div>
      </div>
    `
  },
  161: {
    questext: "Which word is closest in meaning to \"euphoria\"?",
    options: ["elation", "despair", "gloom", "misery"],
    correct: "1",
    exptext: "✅ Elation means great joy. 📌 Eu = good, phoria = feeling. ❌ Despair is the opposite."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/English/Vocabulary/Vocab_Set_1/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an open elegant dictionary, a gold fountain pen and a few floating letter tiles" },
  "images/English/Vocabulary/Vocab_Set_1/1.png": { t: "fig", about: "Scene from the sentence: \"The calligrapher dipped her pen carefully and wrote the invitation in flowing letters.\" — Show: a calligrapher dipping a brush pen in ink and writing flowing letters on a wedding invitation, ink bottle and paper on a wooden desk. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/2.png": { t: "fig", about: "Scene from the sentence: \"The doctor's cacography made the prescription impossible for the chemist to read.\" — Show: a pharmacist squinting at a doctor's messy scribbled prescription with a confused face, pill bottles and counter in a small shop. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/3.png": { t: "fig", about: "Scene from the sentence: \"Satellite images help a modern cartographer update city maps within days.\" — Show: a cartographer at a drafting table with compass and satellite printouts, drawing a city map, focused mood. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/4.png": { t: "fig", about: "Scene from the sentence: \"The philatelist paid a huge sum for a rare stamp at the auction.\" — Show: an elderly man with a magnifying glass and tweezers examining a rare stamp at a desk with open stamp albums. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/5.png": { t: "fig", about: "Scene from the sentence: \"No historian can work without the patient help of a good archivist.\" — Show: an archivist in white gloves lifting a fragile old document from a box in a records room with tall shelves. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/6.png": { t: "fig", about: "Scene from the sentence: \"The numismatist examined the ancient silver coin under a bright lamp.\" — Show: a numismatist with a magnifying glass studying an ancient silver coin under a lamp, trays of old coins on velvet. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/7.png": { t: "fig", about: "Scene from the sentence: \"The finance minister visited the mint to see how new coins are made.\" — Show: a factory floor at a mint with machines stamping shiny coins that pour into a bin, a minister in a suit watching. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/8.png": { t: "fig", about: "Scene from the sentence: \"Because of her nyctophobia, Riya always sleeps with a small lamp switched on.\" — Show: a child sitting up in bed clutching a blanket, a glowing night lamp on the table, dark room with shadowy corners. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/9.png": { t: "fig", about: "Scene from the sentence: \"Suffering from agoraphobia, the poet rarely left his small room for years.\" — Show: a worried poet staring from a dim window at a bustling crowded square, one hand pressed on the glass. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/10.png": { t: "fig", about: "Scene from the sentence: \"The film shows how xenophobia slowly poisoned a once-friendly town.\" — Show: villagers turning their backs on a family of newcomers carrying suitcases at a village gate, sad mood. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/11.png": { t: "fig", about: "Scene from the sentence: \"His gynophobia made him nervous even when a woman simply asked him for directions.\" — Show: a nervous young man stepping back with raised hands as a woman politely asks him for directions on a street. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/12.png": { t: "fig", about: "Scene from the sentence: \"In the old story, the king, a digamist, brought a new queen to the palace.\" — Show: an older king standing beside a smiling new queen at a palace wedding with garlands and guests. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/13.png": { t: "fig", about: "Scene from the sentence: \"Claustrophobia made her take the stairs instead of the crowded, narrow lift.\" — Show: a pale woman hesitating at the door of a crowded narrow lift, choosing the staircase instead. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/14.png": { t: "fig", about: "Scene from the sentence: \"The lexicographer spent ten years collecting meanings for the new Hindi dictionary.\" — Show: an elderly lexicographer surrounded by stacks of dictionary pages and index cards, writing at a lamp-lit desk. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/15.png": { t: "fig", about: "Scene from the sentence: \"The etymology of \"salary\" goes back to the Latin word for salt.\" — Show: a student in a library looking at a dictionary beside a small pile of salt, arrows like a family tree floating in the air. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/16.png": { t: "fig", about: "Scene from the sentence: \"The university's entomology department tracks insects that damage the wheat crop.\" — Show: researchers in a wheat field examining insects with magnifying glasses and nets, notebooks in hand. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/17.png": { t: "fig", about: "Scene from the sentence: \"The philologist spent years decoding the grammar of a forgotten tribal language.\" — Show: a scholar at a desk comparing two ancient manuscripts side by side with books piled up, deep concentration. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/18.png": { t: "fig", about: "Scene from the sentence: \"Text messaging has speeded up neology, creating new words almost every month.\" — Show: teenagers laughing over their phones in a cafe, colourful abstract shapes floating above them like fresh ideas. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/19.png": { t: "fig", about: "Scene from the sentence: \"The paleographer slowly read the faded writing on the medieval parchment.\" — Show: a paleographer with a magnifier reading a faded medieval parchment under a lamp, quill and ink bottle nearby. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/20.png": { t: "fig", about: "Scene from the sentence: \"The newspaper's clever coinage 'staycation' soon appeared in many dictionaries.\" — Show: an editor in a busy newsroom proudly showing colleagues a dictionary with a bookmark, everyone smiling. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/21.png": { t: "fig", about: "Scene from the sentence: \"The young orator held the whole hall silent with his powerful opening line.\" — Show: a young speaker at a podium addressing a hushed crowded hall with one hand raised, audience listening intently. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/22.png": { t: "fig", about: "Scene from the sentence: \"The demagogue promised free everything and blamed outsiders for every problem in town.\" — Show: a loud politician on a platform pointing angrily at the sky while an excited crowd waves fists. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/23.png": { t: "fig", about: "Scene from the sentence: \"The village pedagogue taught three generations from one dusty classroom.\" — Show: an elderly village teacher with spectacles and a cane standing before a chalkboard in a dusty classroom of village children. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/24.png": { t: "fig", about: "Scene from the sentence: \"The old synagogue in the city is known for its stained glass windows.\" — Show: exterior of an old synagogue with a stained glass window in golden evening light, people walking in. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/25.png": { t: "fig", about: "Scene from the sentence: \"Her eloquent speech about saving the lake moved even the strongest critics.\" — Show: a confident woman addressing a village meeting beside a lake, listeners nodding and some wiping tears. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/26.png": { t: "fig", about: "Scene from the sentence: \"The first cuckoo's call is a harbinger of spring in the countryside.\" — Show: a cuckoo singing on a blooming branch at sunrise, a village in the distance, last patches of snow melting. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/27.png": { t: "fig", about: "Scene from the sentence: \"The royal herald blew his trumpet and read the king's order aloud.\" — Show: a medieval herald in a colourful tunic blowing a long trumpet and reading a scroll in a market square. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/28.png": { t: "fig", about: "Scene from the sentence: \"As a trusted emissary, he carried secret letters across the mountain border.\" — Show: a cloaked messenger on horseback crossing a mountain pass at dusk, sealed letters in a leather satchel. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/29.png": { t: "fig", about: "Scene from the sentence: \"Shakespeare's plays contain an archaism on almost every page, so students keep glossaries beside them.\" — Show: a puzzled student in a library reading an old book of plays with a thick glossary open beside it. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/30.png": { t: "fig", about: "Scene from the sentence: \"The mechanic's jargon left me completely confused about what was wrong with my scooter.\" — Show: a puzzled customer in a garage listening to a mechanic pointing at engine parts, tools hanging on the wall. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/31.png": { t: "fig", about: "Scene from the sentence: \"Pickpockets in the old city spoke a secret argot to hide their plans.\" — Show: two shady pickpockets whispering in a dim old city alley, glancing around, lantern light on wet stones. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/32.png": { t: "fig", about: "Scene from the sentence: \"The word \"selfie\" was once a neologism, but now everyone uses it.\" — Show: friends laughing on a sofa taking a selfie with a smartphone, an open dictionary lying beside them. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/33.png": { t: "fig", about: "Scene from the sentence: \"Her speech was full of friendly colloquialisms, which made the crowd feel at home.\" — Show: a cheerful speaker chatting casually with a village crowd at a tea stall, everyone laughing and relaxed. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/34.png": { t: "fig", about: "Scene from the sentence: \"The farmer spoke in a rural dialect that city visitors found hard to follow.\" — Show: a farmer chatting at a field gate with puzzled city visitors who lean in to listen. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/35.png": { t: "fig", about: "Scene from the sentence: \"When asked about the budget, his reply about cricket was a complete non sequitur.\" — Show: a meeting room where a man asked about the budget holds up a cricket bat while colleagues stare in confusion. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/36.png": { t: "fig", about: "Scene from the sentence: \"The minister's equivocation on the tax question made reporters even more suspicious.\" — Show: reporters crowding a minister who shrugs and waves his hands vaguely at a bunch of microphones. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/37.png": { t: "fig", about: "Scene from the sentence: \"The editor cut the tautology from the report to make it shorter.\" — Show: an editor with a red pen crossing out repeated lines on a long printed report, desk piled with paper. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/38.png": { t: "fig", about: "Scene from the sentence: \"Farmers once planted crops by checking the weather notes in the village almanac.\" — Show: a farmer in a field at sunrise holding an old almanac book while looking up at the sky. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/39.png": { t: "fig", about: "Scene from the sentence: \"The monk kept a chronicle of every flood and famine in the kingdom.\" — Show: a monk writing in a large book by candlelight in a stone cell with scrolls stacked around him. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/40.png": { t: "fig", about: "Scene from the sentence: \"The shopkeeper noted every sale in his big ledger before closing the shop.\" — Show: a shopkeeper writing in a thick ledger at a wooden counter, shelves of goods behind him. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/41.png": { t: "fig", about: "Scene from the sentence: \"The epigrapher read the ancient king's orders carved on a rock pillar.\" — Show: an epigrapher with a brush and notebook studying lines carved on an ancient stone pillar in sunlight. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/42.png": { t: "fig", about: "Scene from the sentence: \"The epitaph on his grave said simply, \"He loved the mountains.\"\" — Show: a visitor kneeling at a granite gravestone with carved lines at dawn, mountain flowers placed in front. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/43.png": { t: "fig", about: "Scene from the sentence: \"The village doctor was the epitome of kindness, treating the poor without any fee.\" — Show: a village doctor gently treating a poor child in a simple clinic while the family looks on gratefully. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/44.png": { t: "fig", about: "Scene from the sentence: \"The play ended with an epilogue spoken by the main actor.\" — Show: an actor stepping forward alone onto a softly lit stage as the curtain falls behind him. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/45.png": { t: "fig", about: "Scene from the sentence: \"The stoic old farmer accepted the failed harvest without a single complaint.\" — Show: an old farmer standing calmly at the edge of a dry, failed crop field, hands folded and face composed. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/46.png": { t: "fig", about: "Scene from the sentence: \"Despite the poor results, the coach remained sanguine about the next match.\" — Show: a smiling coach with a clipboard standing confidently before a team of players who look down after defeat. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/47.png": { t: "fig", about: "Scene from the sentence: \"The anchorite lived in a mountain cave and prayed for most of the day.\" — Show: a hermit sitting in prayer inside a mountain cave while villagers quietly leave a basket of food at the entrance. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/48.png": { t: "fig", about: "Scene from the sentence: \"The famous writer lived as a recluse in a house hidden by tall trees.\" — Show: a large old house almost hidden by tall trees with curtains drawn, a single lamp glowing in an upper window. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/49.png": { t: "fig", about: "Scene from the sentence: \"The ascetic slept on the bare floor and ate only one simple meal a day.\" — Show: a lean ascetic sitting on a bare floor with a small bowl of rice in a sparse hut. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/50.png": { t: "fig", about: "Scene from the sentence: \"After lunch, grandfather loved to recline on the cane chair and read.\" — Show: an elderly man reclining on a cane chair on a sunny veranda, reading a book in the afternoon light. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/51.png": { t: "fig", about: "Scene from the sentence: \"The mystic sat by the river for hours, lost in silent prayer.\" — Show: a mystic sitting cross-legged by a calm river at dawn, eyes closed, soft golden light on the water. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/52.png": { t: "fig", about: "Scene from the sentence: \"The charlatan sold coloured water as a cure for every disease.\" — Show: a street vendor in a tall hat selling colourful bottles to a crowd while one woman looks doubtful. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/53.png": { t: "fig", about: "Scene from the sentence: \"The thief tried to masquerade as a postman to enter the building.\" — Show: a man wearing a postman's cap and carrying a bag at an apartment door while a guard looks suspicious. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/54.png": { t: "fig", about: "Scene from the sentence: \"The omniscient narrator of the novel knows what every character secretly thinks.\" — Show: a novel open on a desk with tiny glowing figures of its characters rising from the pages, each wrapped in a soft glow. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/55.png": { t: "fig", about: "Scene from the sentence: \"Mobile phones are ubiquitous; you see them in almost every hand.\" — Show: a crowded railway platform where nearly everyone is looking at a mobile phone in hand. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/56.png": { t: "fig", about: "Scene from the sentence: \"The poet felt a quiet beauty immanent in even the smallest pebble.\" — Show: a poet kneeling beside a smooth pebble in a stream at dawn, a soft light glowing from within the stone. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/57.png": { t: "fig", about: "Scene from the sentence: \"Black clouds warned that a heavy storm was imminent.\" — Show: dark storm clouds gathering over a village field, farmers hurrying home with tools as the wind rises. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/58.png": { t: "fig", about: "Scene from the sentence: \"The college invited an eminent scientist to open its new laboratory.\" — Show: an elderly respected scientist cutting a ribbon at a new college laboratory while students clap. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/59.png": { t: "fig", about: "Scene from the sentence: \"The talks ended in an impasse when neither side would change its demand.\" — Show: two negotiators sitting on opposite sides of a long table with folded arms, facing away, papers untouched. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/60.png": { t: "fig", about: "Scene from the sentence: \"The heavy rain turned the village road into a quagmire of sticky mud.\" — Show: a tractor stuck in deep sticky mud on a village road after rain, farmers pushing from behind. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/61.png": { t: "fig", about: "Scene from the sentence: \"The team won the final, but with three injured stars it was a Pyrrhic victory.\" — Show: injured players with bandages holding a winning trophy sadly in an empty stadium. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/62.png": { t: "fig", about: "Scene from the sentence: \"Friends gave an impromptu concert on the beach when the evening turned cool.\" — Show: friends singing with a guitar on a beach at dusk, others clapping around a small campfire. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/63.png": { t: "fig", about: "Scene from the sentence: \"Students enjoyed the extempore speaking contest, where topics were handed out on the spot.\" — Show: students at a classroom contest, one boy drawing a slip from a bowl and starting to speak while others watch. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/64.png": { t: "fig", about: "Scene from the sentence: \"Only a pedant would argue about a comma while the building was on fire.\" — Show: a stern man at a desk with a magnifying glass pointing at a comma on a page while flames flicker outside the window. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/65.png": { t: "fig", about: "Scene from the sentence: \"A painting of melting clocks in a desert is a classic work of surrealism.\" — Show: a desert with soft melting clocks draped over a tree branch and a rock under a dreamlike sky. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/66.png": { t: "fig", about: "Scene from the sentence: \"Critics admired the film's verism, from its dusty streets to its tired faces.\" — Show: a film crew shooting a scene in a dusty narrow lane with tired faces, camera and microphone close by. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/67.png": { t: "fig", about: "Scene from the sentence: \"The judge questioned the veracity of the witness's story.\" — Show: a judge in a courtroom looking doubtfully at a witness on the stand while lawyers listen. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/68.png": { t: "fig", about: "Scene from the sentence: \"Only a masochist would run a marathon barefoot on hot sand for fun.\" — Show: a sweaty runner barefoot on hot sand dunes with a strained smile while baffled spectators watch. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/69.png": { t: "fig", about: "Scene from the sentence: \"Nobody liked the sadist who teased smaller children until they cried.\" — Show: a big boy teasing a smaller crying child in a playground while the little one's friends look frightened. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/70.png": { t: "fig", about: "Scene from the sentence: \"The village savant knew the history of every temple in the district.\" — Show: an elderly village scholar with a white beard sitting under a banyan tree, villagers listening to him about an old temple. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/71.png": { t: "fig", about: "Scene from the sentence: \"The violin virtuoso played so fast that the audience held its breath.\" — Show: a violinist on stage playing with a blur of fast bow movement while the audience leans forward. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/72.png": { t: "fig", about: "Scene from the sentence: \"His remark about \"a modern Ravana\" was an allusion to the greedy contractor.\" — Show: a speaker at a podium glancing slyly at a greedy contractor in the audience, who shifts nervously in his seat. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/73.png": { t: "fig", about: "Scene from the sentence: \"The thief's elusion of the police lasted three weeks.\" — Show: a thief slipping through a narrow alley while police run past in the opposite direction. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/74.png": { t: "fig", about: "Scene from the sentence: \"The shimmering water on the hot road is only an illusion of the desert heat.\" — Show: a hot empty highway with a shimmering water-like mirage on the road, a tired traveller squinting at it. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/75.png": { t: "fig", about: "Scene from the sentence: \"The fox managed to elude the hunters by hiding in a hollow log.\" — Show: a fox hiding inside a hollow log as hunters walk past in the forest. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/76.png": { t: "fig", about: "Scene from the sentence: \"Police arrested the anarchist for urging the crowd to ignore every law.\" — Show: a man standing on a wooden box urging a crowd in a square while police approach and torn posters flutter. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/77.png": { t: "fig", about: "Scene from the sentence: \"The coach, a realist, told the team they were not yet ready for the finals.\" — Show: a coach honestly talking to a quiet team on a training ground, a trophy cabinet visible behind them. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/78.png": { t: "fig", about: "Scene from the sentence: \"The jingoistic speaker demanded war and shouted that no other country mattered.\" — Show: an angry speaker shouting from a platform waving a large flag, a crowd below with raised fists. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/79.png": { t: "fig", about: "Scene from the sentence: \"A sudden knock at the door broke her reverie by the window.\" — Show: a woman gazing dreamily out of a window with a soft smile, startled by a knock at the door behind her. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English/Vocabulary/Vocab_Set_1/80.png": { t: "fig", about: "Scene from the sentence: \"The mountaineers felt pure euphoria on reaching the summit at dawn.\" — Show: mountaineers standing on a snowy summit at dawn with arms raised, golden light over the clouds below. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." }
});

/* CHANGE LOG
   - Duplicate words removed: Paleographer, Philologist, Herald, Recluse.
   - 'Henophobia' was hard to read in the handwriting; treated as Gynophobia (fear of women). Please verify.
*/