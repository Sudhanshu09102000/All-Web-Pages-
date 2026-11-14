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

/* ═══ SNIPPET 4 — put right after SNIPPET 3 ═══ */
/* ── PREMIUM FIT-TO-SCREEN LAYOUT (v2): every vocabulary page is one balanced two-column card that fits a laptop screen
   without scrolling. Text size FOLLOWS the Control Panel font-size slider (all sizes are em-based and inherit it).
   Fonts, colours and light/dark themes from the panel are respected. The big title card above is shrunk automatically,
   and at the default font size the card is auto-fitted to the free height of the screen. ── */
(function () {
  var css = [
    ".cp-vocab.vp{--a:#6366f1;--on:#fff;--k:1;font-size:calc(1em * var(--k));line-height:1.4;margin:0;padding:.15em .1em .3em;display:block;color:inherit}",
    ".cp-vocab.vp *{box-sizing:border-box}",
    ".cp-vocab.vp .vp-grid{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);gap:1.5em;align-items:stretch}",
    ".cp-vocab.vp .vp-left{display:flex;flex-direction:column;gap:.85em;min-width:0}",
    ".cp-vocab.vp .vp-meta{display:flex;align-items:center;gap:.9em;padding:.05em 0}",
    ".cp-vocab.vp .vp-pos{display:inline-block;padding:.35em 1.25em;border-radius:999px;background:linear-gradient(135deg,var(--a),color-mix(in srgb,var(--a) 70%,#000));color:var(--on);font-size:.72em;font-weight:800;letter-spacing:.13em;text-transform:uppercase;box-shadow:0 .5em 1.1em -.5em var(--a),inset 0 1px 0 rgba(255,255,255,.4)}",
    ".cp-vocab.vp .vp-ipa{font-style:italic;font-size:.9375em;opacity:.85;letter-spacing:.02em}",
    ".cp-vocab.vp .vp-two{display:grid;grid-template-columns:1fr 1fr;gap:.85em}",
    ".cp-vocab.vp .vp-def,.cp-vocab.vp .vp-pane,.cp-vocab.vp .vp-use{position:relative;min-width:0;border-radius:1.1em;padding:.95em 1.15em}",
    ".cp-vocab.vp .vp-def{padding-left:1.5em;background:linear-gradient(135deg,color-mix(in srgb,var(--a) 20%,transparent),color-mix(in srgb,var(--a) 5%,transparent));border:1px solid color-mix(in srgb,var(--a) 45%,transparent);box-shadow:inset .32em 0 0 var(--a),0 .9em 1.8em -1.2em rgba(0,0,0,.55)}",
    ".cp-vocab.vp .vp-pane{padding:1.15em 1.4em 1.25em;background:rgba(127,127,127,.09);border:1px solid rgba(127,127,127,.42);box-shadow:0 .9em 1.8em -1.3em rgba(0,0,0,.5)}",
    ".cp-vocab.vp .vp-use{flex:1;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(180deg,color-mix(in srgb,var(--a) 10%,transparent),color-mix(in srgb,var(--a) 2%,transparent));border:1px solid color-mix(in srgb,var(--a) 45%,transparent);box-shadow:0 .9em 1.8em -1.3em rgba(0,0,0,.5)}",
    ".cp-vocab.vp .vp-lbl{margin:0 0 .6em;font-size:.66em;font-weight:800;letter-spacing:.17em;text-transform:uppercase;opacity:.8}",
    ".cp-vocab.vp .vp-lbl.syn{color:#15803d;opacity:1}",
    ".cp-vocab.vp .vp-lbl.ant{color:#b91c1c;opacity:1}",
    ".cp-vocab.vp[data-tone=dark] .vp-lbl.syn{color:#86efac}",
    ".cp-vocab.vp[data-tone=dark] .vp-lbl.ant{color:#fca5a5}",
    ".cp-vocab.vp .vp-en{margin:0;font-size:.9375em;font-weight:600;line-height:1.25}",
    ".cp-vocab.vp .vp-hi{margin:0;font-size:.9375em;font-weight:800;line-height:1.25}",
    ".cp-vocab.vp .vp-tags{display:flex;flex-wrap:wrap;gap:.6em .65em;padding:.15em 0 0;border:0;background:none;box-shadow:none;outline:0}",
    ".cp-vocab.vp .vp-tag{display:inline-block;padding:.3em .95em;border-radius:999px;font-size:.875em;font-weight:700;border:1px solid}",
    ".cp-vocab.vp .vp-tag.syn{background:rgba(22,163,74,.15);color:#15803d;border-color:rgba(22,163,74,.55)}",
    ".cp-vocab.vp .vp-tag.ant{background:rgba(220,38,38,.13);color:#b91c1c;border-color:rgba(220,38,38,.55)}",
    ".cp-vocab.vp[data-tone=dark] .vp-tag.syn{color:#86efac;background:rgba(74,222,128,.14);border-color:rgba(74,222,128,.5)}",
    ".cp-vocab.vp[data-tone=dark] .vp-tag.ant{color:#fca5a5;background:rgba(248,113,113,.14);border-color:rgba(248,113,113,.5)}",
    ".cp-vocab.vp .vp-none{opacity:.5;font-weight:700;font-size:.875em}",
    ".cp-vocab.vp .vp-s{display:flex;gap:.8em;align-items:flex-start;padding:.5em 0;border-top:1px solid color-mix(in srgb,var(--a) 30%,transparent);font-size:.8125em;line-height:1.4}",
    ".cp-vocab.vp .vp-lbl + .vp-s{border-top:0;padding-top:.15em}",
    ".cp-vocab.vp .vp-n{flex:none;display:grid;place-items:center;width:1.7em;height:1.7em;margin-top:.02em;border-radius:50%;background:linear-gradient(135deg,var(--a),color-mix(in srgb,var(--a) 70%,#000));color:var(--on);font-size:.82em;font-weight:800;line-height:1;box-shadow:0 .3em .7em -.3em var(--a)}",
    ".cp-vocab.vp .vp-mark{margin-left:.35em;font-size:.95em}",
    ".cp-vocab.vp .vp-frame{position:relative;align-self:center;aspect-ratio:16/9;width:100%;min-height:0;border-radius:1.6em;padding:0;background:none;border:0;box-shadow:none;overflow:hidden}",
    ".cp-vocab.vp .vp-frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:1.6em;border:0!important;box-shadow:none!important;display:block;background:color-mix(in srgb,var(--a) 10%,transparent)}",
    ".cp-vocab.vp .vp-frame .cpm{position:absolute!important;top:50%;left:50%;transform:translate(-50%,-50%);margin:0!important;width:min(430px,88%)!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-tags,html :is(#conceptBox,body) .cp-vocab.vp .vp-lbl,html :is(#conceptBox,body) .cp-vocab.vp .vp-grid,html :is(#conceptBox,body) .cp-vocab.vp .vp-left,html :is(#conceptBox,body) .cp-vocab.vp .vp-two,html :is(#conceptBox,body) .cp-vocab.vp .vp-meta{border:0!important;box-shadow:none!important;background:none!important;outline:0!important;border-radius:0!important}",
    ".vp-titlecard{zoom:.7!important}",
    "@media (max-height:700px){.vp-titlecard{zoom:.55!important}}",
    /* light mode: keep the portal's crisp black-outline look */
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-def,html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-pane,html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-use{border:1.5px solid #000!important;box-shadow:none}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-def{box-shadow:inset .34em 0 0 #000!important}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-frame{background:none!important;border:0!important;box-shadow:none!important}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-pos,html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-n{background:var(--a)!important;color:var(--on)!important;-webkit-text-fill-color:var(--on)!important;border:1.5px solid #000;box-shadow:none}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-tag.syn{color:#14532d!important;-webkit-text-fill-color:#14532d!important;border-color:#14532d}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-tag.ant{color:#7f1d1d!important;-webkit-text-fill-color:#7f1d1d!important;border-color:#7f1d1d}",
    /* narrow screens / phones: stack and allow normal scrolling */
    "@media (max-width:767px){",
    "#engineView:has(.cp-vocab.vp)>.container-fluid{padding-left:2px!important;padding-right:2px!important}",
    "#engineView:has(.cp-vocab.vp) .engine-shell>.col-12{padding-left:0!important;padding-right:0!important}",
    "#conceptBox:has(.cp-vocab.vp){border-radius:12px!important;padding:0!important}",
    "#conceptBox:has(.cp-vocab.vp) .cp-scroll{padding:8px 3px 12px!important}",
    "#conceptBox:has(.cp-vocab.vp) .cp-top{padding:8px 6px 4px!important}",
    "#conceptBox:has(.cp-vocab.vp) .cp-footer{padding:8px 6px!important}",
    ".cp-vocab.vp{padding:0!important}",
    ".cp-vocab.vp .vp-grid{gap:.8em}",
    ".cp-vocab.vp .vp-def,.cp-vocab.vp .vp-use{padding:.7em .8em!important}",
    ".cp-vocab.vp .vp-def{padding-left:1.1em!important}",
    ".cp-vocab.vp .vp-pane{padding:.75em .85em!important}",
    "}",
    "@media (max-width:900px){.cp-vocab.vp .vp-grid{grid-template-columns:1fr}.cp-vocab.vp .vp-frame{order:-1;min-height:0;aspect-ratio:16/9}.cp-vocab.vp .vp-two{grid-template-columns:1fr}.vp-titlecard{zoom:.8!important}}"
  ].join("\n");
  var st = document.createElement("style");
  st.id = "vp-style";
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function px(el) { return parseFloat(getComputedStyle(el).fontSize) || 17; }
  function lum(c) {
    var m = String(c).match(/[\d.]+/g);
    if (!m || m.length < 3) return 0;
    return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
  }
  function scroller(v) {
    var a = v.parentElement;
    while (a && a !== document.body && a !== document.documentElement) {
      var o = getComputedStyle(a).overflowY;
      if ((o === "auto" || o === "scroll") && a.clientHeight > 0) return a;
      a = a.parentElement;
    }
    return null;
  }

  /* the portal's big title card: a wide, rounded block just above the word card, 90–300px tall */
  function markTitle(v) {
    var cur = document.querySelector(".vp-titlecard");
    if (cur && cur.isConnected && !cur.contains(v)) return;
    var vr = v.getBoundingClientRect(), best = [], els = document.querySelectorAll("div,section,header,article"), i, j;
    for (i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.contains(v) || v.contains(e) || e.closest(".cpm,.cp-vocab")) continue;
      var r = e.getBoundingClientRect();
      if (r.width < window.innerWidth * 0.45 || r.height < 90 || r.height > 300 || r.bottom > vr.top + 6 || r.bottom < 0) continue;
      if (parseFloat(getComputedStyle(e).borderTopLeftRadius) < 10) continue;
      if ((e.textContent || "").trim().length > 90) continue;
      for (j = best.length - 1; j >= 0; j--) { if (e.contains(best[j])) best.splice(j, 1); }
      var inside = false;
      for (j = 0; j < best.length; j++) { if (best[j].contains(e)) { inside = true; break; } }
      if (!inside) best.push(e);
    }
    if (best.length) best[best.length - 1].classList.add("vp-titlecard");
  }

  var DEFAULT_PX = 17.6;
  function layout() {
    if (!document.body) return;
    var v = document.querySelector(".cp-vocab.vp");
    if (!v) {
      Array.prototype.forEach.call(document.querySelectorAll(".vp-titlecard"), function (e) { e.classList.remove("vp-titlecard"); });
      return;
    }
    var base = px(v.parentElement);              /* the Control Panel font size: the card text is exactly proportional to it */
    v.setAttribute("data-tone", lum(getComputedStyle(v).color) > 0.55 ? "dark" : "light");
    markTitle(v);
    var k = Math.max(0.6, Math.min(1.12, Math.min(window.innerHeight / 910, window.innerWidth / 1850)));
    v.style.setProperty("--k", k.toFixed(3));
  }
  var queued = false, lastBase = 0;
  function queue() {
    if (queued) return;
    queued = true;
    (window.requestAnimationFrame || setTimeout)(function () { queued = false; try { layout(); } catch (e) {} });
  }
  try { new MutationObserver(queue).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  window.addEventListener("resize", queue);
  window.addEventListener("load", queue);
  document.addEventListener("load", queue, true);   /* images finishing */
  /* follow the Control Panel font-size slider */
  setInterval(function () {
    var v = document.querySelector(".cp-vocab.vp");
    if (!v || !v.parentElement) return;
    var b = px(v.parentElement);
    if (b !== lastBase) { lastBase = b; queue(); }
  }, 300);
  queue();
})();

/* Field: English · Subject: Vocabulary · Chapter: Vocab_Set_1 · 80 concept pages (+ overview) · 80 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📚", accent: "#6366f1", pauseTimer: true,
    title: "Vocabulary Set 1 — One Word Substitution, Confusing Words & Word Power",
    thumb: {
      image: "images/English_Comprehension/Vocabulary/Set_1/thumbnail.png",
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
      <div class="cp-vocab vp" style="--a:#3162d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/kəˈlɪɡrəfər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who is skilled in beautiful, artistic handwriting</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सुलेखक, सुंदर लिखने वाला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">penman</span><span class="vp-tag syn">scribe</span><span class="vp-tag syn">letterer</span><span class="vp-tag syn">handwriting artist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>calligrapher</b> dipped her pen carefully and wrote the invitation in flowing letters. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The museum hired a <b>calligrapher</b> to copy the old poem onto a scroll.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">A gifted <b>calligrapher</b>, he turned every word into a small work of art.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/1.png" alt="Picture for the word calligrapher"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#a0dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/kəˈkɒɡrəfi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">bad handwriting or bad spelling</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">बुरी लिखावट, गलत वर्तनी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">bad handwriting</span><span class="vp-tag syn">scrawl</span><span class="vp-tag syn">illegible writing</span><span class="vp-tag syn">poor spelling</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">calligraphy</span><span class="vp-tag ant">neat writing</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The doctor's <b>cacography</b> made the prescription impossible for the chemist to read. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Teachers marked down his essay for constant <b>cacography</b> and spelling errors.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her early letters show a childish <b>cacography</b> that later became elegant.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/2.png" alt="Picture for the word cacography"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#c526b1;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/kɑːˈtɒɡrəfər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who draws or makes maps</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मानचित्रकार, नक्शा बनाने वाला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">mapmaker</span><span class="vp-tag syn">chart maker</span><span class="vp-tag syn">map designer</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>cartographer</b> carefully marked every river and mountain on the new district map.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Satellite images help a modern <b>cartographer</b> update city maps within days. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Old sailors trusted the <b>cartographer</b> whose charts had guided many ships across the ocean.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/3.png" alt="Picture for the word cartographer"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#31d8bc;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/fɪˈlætəlɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who collects or studies postage stamps</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">डाक टिकट संग्राहक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">stamp collector</span><span class="vp-tag syn">stamp hobbyist</span><span class="vp-tag syn">stamp enthusiast</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">My grandfather, a keen <b>philatelist</b>, kept thousands of stamps in neat albums.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>philatelist</b> paid a huge sum for a rare stamp at the auction. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Every <b>philatelist</b> knows that a tiny printing error can make a stamp priceless.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/4.png" alt="Picture for the word philatelist"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#dd9a4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɑːkɪvɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who looks after old records and important documents</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अभिलेखपाल, दस्तावेज़ संरक्षक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">record keeper</span><span class="vp-tag syn">curator</span><span class="vp-tag syn">custodian</span><span class="vp-tag syn">registrar</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>archivist</b> found a letter from 1857 hidden inside an old government file.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">As the city <b>archivist</b>, she protects thousands of records from damp and insects.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">No historian can work without the patient help of a good <b>archivist</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/5.png" alt="Picture for the word archivist"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4d26c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/njuːˈmɪzmətɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who collects or studies coins and medals</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सिक्का संग्राहक, मुद्राशास्त्री</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">coin collector</span><span class="vp-tag syn">coin expert</span><span class="vp-tag syn">coin hobbyist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>numismatist</b> examined the ancient silver coin under a bright lamp. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A museum invited the <b>numismatist</b> to date the coins found at the excavation site.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The young <b>numismatist</b> proudly showed his collection of coins from many nations.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/6.png" alt="Picture for the word numismatist"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#38d831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/mɪnt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a place where the government makes coins</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">टकसाल</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">coin factory</span><span class="vp-tag syn">coin works</span><span class="vp-tag syn">coining house</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Machines at the <b>mint</b> stamp thousands of shiny new coins every hour.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The finance minister visited the <b>mint</b> to see how new coins are made. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Visitors to the <b>mint</b> watched gleaming metal discs turn into currency before their eyes.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/7.png" alt="Picture for the word mint"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#dd4b7c;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌnɪktəˈfəʊbiə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an extreme fear of darkness or night</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अंधेरे का डर, रात का भय</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fear of darkness</span><span class="vp-tag syn">scotophobia</span><span class="vp-tag syn">fear of night</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Because of her <b>nyctophobia</b>, Riya always sleeps with a small lamp switched on. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The doctor said his <b>nyctophobia</b> began after a long power cut in childhood.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t"><b>Nyctophobia</b> gripped the traveller as the forest path faded into total blackness.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/8.png" alt="Picture for the word nyctophobia"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#2689c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌæɡərəˈfəʊbiə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an extreme fear of open or crowded public places</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">खुली जगह का डर, भीड़ का डर</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fear of open spaces</span><span class="vp-tag syn">fear of crowds</span><span class="vp-tag syn">fear of public places</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>agoraphobia</b> made even a short walk to the busy market feel terrifying.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The counsellor treated her <b>agoraphobia</b> by slowly increasing the time she spent outdoors.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Suffering from <b>agoraphobia</b>, the poet rarely left his small room for years. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/9.png" alt="Picture for the word agoraphobia"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#cad831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌzenəˈfəʊbiə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a strong dislike or fear of foreigners and strangers</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">विदेशियों से घृणा, विदेशी-भय</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fear of foreigners</span><span class="vp-tag syn">intolerance</span><span class="vp-tag syn">bigotry</span><span class="vp-tag syn">prejudice</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">tolerance</span><span class="vp-tag ant">acceptance</span><span class="vp-tag ant">friendliness</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Leaders must stand firmly against <b>xenophobia</b> whenever migrants are blamed for every problem.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The film shows how <b>xenophobia</b> slowly poisoned a once-friendly town. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her kindness towards new neighbours showed that she had no trace of <b>xenophobia</b>.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/10.png" alt="Picture for the word xenophobia"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#be4bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌɡaɪnəˈfəʊbiə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an extreme fear of women</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">महिलाओं का डर, स्त्री-भय</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fear of women</span><span class="vp-tag syn">dread of women</span><span class="vp-tag syn">fear of females</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>gynophobia</b> made him nervous even when a woman simply asked him for directions. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The psychologist explained that <b>gynophobia</b> is a real fear, not just shyness.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In the novel, the lonely hero's <b>gynophobia</b> keeps him away from every ball and dance.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/11.png" alt="Picture for the word gynophobia"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#26c575;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈdɪɡəmɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who marries for the second time</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दूसरा विवाह करने वाला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">remarried person</span><span class="vp-tag syn">twice-wed person</span><span class="vp-tag syn">second-time spouse</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">After his wife passed away, he became a <b>digamist</b> by marrying a kind neighbour.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The register listed him as a <b>digamist</b>, since this was his second marriage.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In the old story, the king, a <b>digamist</b>, brought a new queen to the palace. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/12.png" alt="Picture for the word digamist"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d85431;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌklɔːstrəˈfəʊbiə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an extreme fear of small or closed spaces</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">बंद जगह का डर</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fear of enclosed places</span><span class="vp-tag syn">fear of tight spaces</span><span class="vp-tag syn">dread of confinement</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t"><b>Claustrophobia</b> made her take the stairs instead of the crowded, narrow lift. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The diver's <b>claustrophobia</b> returned when he squeezed into the tiny underwater cave.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Patients with <b>claustrophobia</b> often panic inside the narrow tube of an MRI scanner.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/13.png" alt="Picture for the word claustrophobia"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4b57dd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌleksɪˈkɒɡrəfər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who writes or compiles dictionaries</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कोशकार, शब्दकोश निर्माता</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dictionary writer</span><span class="vp-tag syn">dictionary maker</span><span class="vp-tag syn">dictionary compiler</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>lexicographer</b> spent ten years collecting meanings for the new Hindi dictionary. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Every <b>lexicographer</b> tracks how everyday speech adds new words each year.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The old <b>lexicographer</b> weighed each definition as carefully as a jeweller weighs gold.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/14.png" alt="Picture for the word lexicographer"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#62c526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌetɪˈmɒlədʒi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">the study of where words come from and how they changed</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">व्युत्पत्ति, शब्द-उत्पत्ति</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">word origins</span><span class="vp-tag syn">word history</span><span class="vp-tag syn">derivation</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>etymology</b> of "salary" goes back to the Latin word for salt. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A short note on the <b>etymology</b> of each term made the glossary more interesting.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Scholars trace the <b>etymology</b> of the word across centuries and many languages.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/15.png" alt="Picture for the word etymology"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d831a1;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌentəˈmɒlədʒi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">the scientific study of insects</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कीट विज्ञान</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">insect study</span><span class="vp-tag syn">study of insects</span><span class="vp-tag syn">insect science</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">She chose <b>entomology</b> because she loved watching ants and butterflies.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The university's <b>entomology</b> department tracks insects that damage the wheat crop. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In <b>entomology</b> class, students pinned beetles and labelled them with Latin names.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/16.png" alt="Picture for the word entomology"></div></div></div>
    `
  },
  33: {
    questext: "What is the study of insects called?",
    options: ["etymology", "ecology", "entomology", "philology"],
    correct: "3",
    exptext: "✅ Entomology is the study of insects. 📌 Entomo = insect. ❌ Etymology is the study of word origins."
  },
  34: {
    type: "concept", icon: "🎓", accent: "#4bd7dd", pauseTimer: true,
    title: "Philologist",
    html: `
      <div class="cp-vocab vp" style="--a:#4bd7dd;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/fɪˈlɒlədʒɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a scholar who studies languages and how they changed over time</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">भाषाशास्त्री, भाषाविद्</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">linguist</span><span class="vp-tag syn">language scholar</span><span class="vp-tag syn">word scholar</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A <b>philologist</b> compared old Sanskrit and Greek words to show how languages are related.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>philologist</b> spent years decoding the grammar of a forgotten tribal language. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Though a famous <b>philologist</b>, he never lost his joy in a well-turned phrase.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/17.png" alt="Picture for the word philologist"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#c59d26;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/niːˈɒlədʒi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">the practice of inventing and using new words</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">नवशब्द-प्रयोग</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">word coining</span><span class="vp-tag syn">new wording</span><span class="vp-tag syn">language innovation</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">archaism</span><span class="vp-tag ant">obsolescence</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The poet's love of <b>neology</b> gave readers many fresh words to enjoy.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Text messaging has speeded up <b>neology</b>, creating new words almost every month. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Critics praised his <b>neology</b>, but older readers found the invented terms hard to follow.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/18.png" alt="Picture for the word neology"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#7d31d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌpæliˈɒɡrəfər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an expert who reads and studies ancient handwriting and old manuscripts</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">प्राचीन लिपि विशेषज्ञ</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">manuscript expert</span><span class="vp-tag syn">ancient-script reader</span><span class="vp-tag syn">handwriting historian</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>paleographer</b> slowly read the faded writing on the medieval parchment. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Historians asked a <b>paleographer</b> to date the manuscript by its style of handwriting.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Only a trained <b>paleographer</b> can decode the cramped letters of a centuries-old scroll.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/19.png" alt="Picture for the word paleographer"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4bdd63;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈkɔɪnɪdʒ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a new word or phrase that someone invents</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">नया गढ़ा शब्द</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">new word</span><span class="vp-tag syn">invented term</span><span class="vp-tag syn">neologism</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">archaism</span><span class="vp-tag ant">old word</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The newspaper's clever <b>coinage</b> 'staycation' soon appeared in many dictionaries. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Teenagers love slang, and every season brings some witty <b>coinage</b> to the playground.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The author's <b>coinage</b> for her strange machine delighted readers and reviewers alike.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/20.png" alt="Picture for the word coinage"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#c5263a;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɒrətər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who is skilled at giving public speeches</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">वक्ता, भाषणकर्ता</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">speaker</span><span class="vp-tag syn">lecturer</span><span class="vp-tag syn">rhetorician</span><span class="vp-tag syn">public speaker</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The young <b>orator</b> held the whole hall silent with his powerful opening line. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A great <b>orator</b> can move thousands of people without a single note.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In ancient Rome, a famous <b>orator</b> was admired as much as a general.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/21.png" alt="Picture for the word orator"></div></div></div>
    `
  },
  43: {
    questext: "What do you call a skilled speaker?",
    options: ["pedagogue", "demagogue", "archivist", "orator"],
    correct: "4",
    exptext: "✅ Orator is a skilled public speaker. 📌 Oral = spoken. ❌ A demagogue rouses crowds for power, not just speaks well."
  },
  44: {
    type: "concept", icon: "🔥", accent: "#3177d8", pauseTimer: true,
    title: "Demagogue",
    html: `
      <div class="cp-vocab vp" style="--a:#3177d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈdeməɡɒɡ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a leader who excites people's fears and feelings to win power</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">भीड़ भड़काने वाला नेता</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">agitator</span><span class="vp-tag syn">rabble-rouser</span><span class="vp-tag syn">firebrand</span><span class="vp-tag syn">instigator</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">statesman</span><span class="vp-tag ant">peacemaker</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>demagogue</b> promised free everything and blamed outsiders for every problem in town. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">History warns that a <b>demagogue</b> can rise quickly when people are angry and afraid.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Calling the minister a <b>demagogue</b>, the editorial said he cared only for applause.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/22.png" alt="Picture for the word demagogue"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#b3dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈpedəɡɒɡ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a teacher, especially a strict or old-fashioned one</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">शिक्षक, अध्यापक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">teacher</span><span class="vp-tag syn">educator</span><span class="vp-tag syn">instructor</span><span class="vp-tag syn">schoolmaster</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">student</span><span class="vp-tag ant">pupil</span><span class="vp-tag ant">learner</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The strict <b>pedagogue</b> never allowed students to speak without raising a hand.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A good <b>pedagogue</b> knows that curiosity teaches more than fear.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The village <b>pedagogue</b> taught three generations from one dusty classroom. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/23.png" alt="Picture for the word pedagogue"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#c526c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɪnəɡɒɡ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a Jewish place of worship</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">यहूदी उपासनागृह</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">Jewish temple</span><span class="vp-tag syn">Jewish house of worship</span><span class="vp-tag syn">place of worship</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Families gathered at the <b>synagogue</b> every Saturday morning to pray together.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The old <b>synagogue</b> in the city is known for its stained glass windows. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Visitors must cover their heads before entering the quiet <b>synagogue</b>.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/24.png" alt="Picture for the word synagogue"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#31d8a7;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈeləkwənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">able to speak or write in a clear, strong and persuasive way</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">वाक्पटु, प्रभावशाली</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">articulate</span><span class="vp-tag syn">fluent</span><span class="vp-tag syn">expressive</span><span class="vp-tag syn">persuasive</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">inarticulate</span><span class="vp-tag ant">tongue-tied</span><span class="vp-tag ant">hesitant</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Her <b>eloquent</b> speech about saving the lake moved even the strongest critics. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">An <b>eloquent</b> lawyer can explain a complex law in plain, powerful words.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The poet's <b>eloquent</b> silence said more than a thousand words ever could.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/25.png" alt="Picture for the word eloquent"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#dd874b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈhɑːbɪndʒər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a sign that shows something is about to come</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अग्रदूत, पूर्वसूचक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">forerunner</span><span class="vp-tag syn">precursor</span><span class="vp-tag syn">omen</span><span class="vp-tag syn">sign</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The first cuckoo's call is a <b>harbinger</b> of spring in the countryside. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Falling sales proved to be a <b>harbinger</b> of deeper trouble for the company.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Like a silent <b>harbinger</b>, the cold wind announced the coming winter.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/26.png" alt="Picture for the word harbinger"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#3926c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈherəld/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who announces important news or messages</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">संदेशवाहक, उद्घोषक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">messenger</span><span class="vp-tag syn">announcer</span><span class="vp-tag syn">crier</span><span class="vp-tag syn">forerunner</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The royal <b>herald</b> blew his trumpet and read the king's order aloud. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A bright dawn is the <b>herald</b> of a new day.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The paper acts as a <b>herald</b> of change by publishing fresh ideas every morning.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/27.png" alt="Picture for the word herald"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4ed831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈemɪsəri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person sent on a special mission to represent someone</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दूत, प्रतिनिधि</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">envoy</span><span class="vp-tag syn">ambassador</span><span class="vp-tag syn">messenger</span><span class="vp-tag syn">delegate</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The king sent an <b>emissary</b> with gifts to the rival court.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The president's <b>emissary</b> met local leaders to prepare for peace talks.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">As a trusted <b>emissary</b>, he carried secret letters across the mountain border. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/28.png" alt="Picture for the word emissary"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#dd4b8e;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɑːkeɪɪzəm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an old word or phrase that people no longer use</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पुराना शब्द, अप्रचलित प्रयोग</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">obsolete word</span><span class="vp-tag syn">old expression</span><span class="vp-tag syn">outdated term</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">neologism</span><span class="vp-tag ant">coinage</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The word "thee" is an <b>archaism</b> that now appears only in old poems.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Using an <b>archaism</b> in a business email makes the writer sound outdated.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Shakespeare's plays contain an <b>archaism</b> on almost every page, so students keep glossaries beside them. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/29.png" alt="Picture for the word archaism"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#269ec5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈdʒɑːɡən/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">special words of a profession that other people find hard to understand</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">तकनीकी शब्दावली, पेशेवर बोली</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">technical language</span><span class="vp-tag syn">lingo</span><span class="vp-tag syn">terminology</span><span class="vp-tag syn">cant</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">plain speech</span><span class="vp-tag ant">simple words</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The mechanic's <b>jargon</b> left me completely confused about what was wrong with my scooter. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Legal <b>jargon</b> in the contract made it hard for ordinary people to understand.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Scientists are urged to avoid <b>jargon</b> when they speak to the public.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/30.png" alt="Picture for the word jargon"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d8d031;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɑːɡəʊ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">the secret slang used by a group such as thieves</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">गुप्त बोली, समूह की गुप्त भाषा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">slang</span><span class="vp-tag syn">cant</span><span class="vp-tag syn">secret language</span><span class="vp-tag syn">lingo</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Pickpockets in the old city spoke a secret <b>argot</b> to hide their plans. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The film uses prison <b>argot</b> so well that viewers need subtitles.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Every gang had its own <b>argot</b>, and outsiders could not follow a single word.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/31.png" alt="Picture for the word argot"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#ac4bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/niːˈɒlədʒɪzəm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a newly invented word or phrase</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">नया शब्द, नवशब्द</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">coinage</span><span class="vp-tag syn">invented word</span><span class="vp-tag syn">new word</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">archaism</span><span class="vp-tag ant">obsolete word</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The word "selfie" was once a <b>neologism</b>, but now everyone uses it. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Critics called the term a mere <b>neologism</b> that would not last long.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The novelist's <b>neologism</b> for the strange machine entered the dictionary within ten years.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/32.png" alt="Picture for the word neologism"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#26c561;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/kəˈləʊkwiəlɪzəm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an informal word or phrase used in everyday talk</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">बोलचाल का शब्द, आम बोली</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">informal expression</span><span class="vp-tag syn">everyday phrase</span><span class="vp-tag syn">common speech</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">formal expression</span><span class="vp-tag ant">formal language</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Saying "gonna" instead of "going to" is a common <b>colloquialism</b>.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The editor removed every <b>colloquialism</b> from the formal research paper.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her speech was full of friendly <b>colloquialisms</b>, which made the crowd feel at home. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/33.png" alt="Picture for the word colloquialism"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d83f31;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈdaɪəlekt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a form of a language spoken in one region or group</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">बोली, उपभाषा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">regional speech</span><span class="vp-tag syn">vernacular</span><span class="vp-tag syn">patois</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">standard language</span><span class="vp-tag ant">official language</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The farmer spoke in a rural <b>dialect</b> that city visitors found hard to follow. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Each district of the state has its own <b>dialect</b>, with special words and accents.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The novelist wrote the villagers' conversations in their local <b>dialect</b> to sound real.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/34.png" alt="Picture for the word dialect"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4b6add;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌnɒn ˈsekwɪtə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a statement that does not logically follow from what came before</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">असंगत बात, बेतुका निष्कर्ष</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">illogical remark</span><span class="vp-tag syn">irrelevant statement</span><span class="vp-tag syn">illogical conclusion</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">logical inference</span><span class="vp-tag ant">relevant remark</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">When asked about the budget, his reply about cricket was a complete <b>non sequitur</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">"He is rich, so he must be honest" is a <b>non sequitur</b>.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The comedian's jokes worked because each new line was a surprising <b>non sequitur</b>.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/35.png" alt="Picture for the word non sequitur"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#76c526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɪˌkwɪvəˈkeɪʃn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">using unclear or double-meaning words to avoid telling the plain truth</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">टालमटोल, गोलमोल बात</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">evasion</span><span class="vp-tag syn">ambiguity</span><span class="vp-tag syn">hedging</span><span class="vp-tag syn">double talk</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">frankness</span><span class="vp-tag ant">candour</span><span class="vp-tag ant">directness</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The minister's <b>equivocation</b> on the tax question made reporters even more suspicious. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Stop your <b>equivocation</b> and give me a straight yes or no.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Politicians often use <b>equivocation</b> to avoid blame while sounding polite and helpful.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/36.png" alt="Picture for the word equivocation"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d831b6;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/tɔːˈtɒlədʒi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">saying the same thing twice in different words</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पुनरुक्ति, शब्द-दोहराव</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">repetition</span><span class="vp-tag syn">redundancy</span><span class="vp-tag syn">repeated wording</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">brevity</span><span class="vp-tag ant">conciseness</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">"Free gift" and "past history" are common examples of <b>tautology</b>.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The editor cut the <b>tautology</b> from the report to make it shorter. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Saying "a sad tragedy" is pure <b>tautology</b>, since tragedies are always sad.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/37.png" alt="Picture for the word tautology"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4bddd0;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɔːlmənæk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a yearly book with a calendar, weather notes and useful facts</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पंचांग, वार्षिक पत्रिका</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">yearbook</span><span class="vp-tag syn">annual calendar</span><span class="vp-tag syn">calendar book</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Farmers once planted crops by checking the weather notes in the village <b>almanac</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>almanac</b> lists sunrise times, tides and festival dates for every day.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">He kept an old <b>almanac</b> on his desk for quick facts about the year.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/38.png" alt="Picture for the word almanac"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#c58826;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈkrɒnɪkl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a written record of events in the order they happened</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">इतिवृत्त, वृत्तांत</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">record</span><span class="vp-tag syn">history</span><span class="vp-tag syn">annals</span><span class="vp-tag syn">account</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The monk kept a <b>chronicle</b> of every flood and famine in the kingdom. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">This <b>chronicle</b> of the freedom struggle lists events year by year.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her diary became a <b>chronicle</b> of a changing town.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/39.png" alt="Picture for the word chronicle"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#6831d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈledʒər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a book in which a business records its money accounts</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">बही-खाता, लेखा-बही</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">account book</span><span class="vp-tag syn">register</span><span class="vp-tag syn">record book</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The shopkeeper noted every sale in his big <b>ledger</b> before closing the shop. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The auditor found a mistake in the company's <b>ledger</b>.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Each evening the clerk balanced the <b>ledger</b> by the light of a lamp.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/40.png" alt="Picture for the word ledger"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4bdd50;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɪˈpɪɡrəfər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an expert who studies old writing carved on stone or metal</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">शिलालेख विशेषज्ञ, अभिलेखशास्त्री</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">inscription expert</span><span class="vp-tag syn">inscription reader</span><span class="vp-tag syn">stone-writing scholar</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>epigrapher</b> read the ancient king's orders carved on a rock pillar. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">An <b>epigrapher</b> can tell the age of a stone inscription from its letter style.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The <b>epigrapher</b> spent weeks cleaning moss from the temple wall to read its message.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/41.png" alt="Picture for the word epigrapher"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#c5264e;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈepɪtɑːf/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">words written on a tomb in memory of the dead</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">समाधि-लेख</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">tombstone inscription</span><span class="vp-tag syn">grave inscription</span><span class="vp-tag syn">memorial words</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>epitaph</b> on his grave said simply, "He loved the mountains." <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">She wrote a short <b>epitaph</b> for her grandmother's tombstone.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Time had worn the stone, but the <b>epitaph</b> was still faintly readable.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/42.png" alt="Picture for the word epitaph"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#318cd8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɪˈpɪtəmi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a perfect example of a quality or type</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">आदर्श उदाहरण, मूर्त रूप</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">embodiment</span><span class="vp-tag syn">essence</span><span class="vp-tag syn">perfect example</span><span class="vp-tag syn">model</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">antithesis</span><span class="vp-tag ant">contrast</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The village doctor was the <b>epitome</b> of kindness, treating the poor without any fee. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The new stadium is the <b>epitome</b> of modern design.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In the poem, the old oak stands as the <b>epitome</b> of patience.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/43.png" alt="Picture for the word epitome"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#c5dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈepɪlɒɡ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a short section at the end of a book or play</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">उपसंहार, उत्तरवाक्</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">afterword</span><span class="vp-tag syn">conclusion</span><span class="vp-tag syn">postscript</span><span class="vp-tag syn">closing section</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">prologue</span><span class="vp-tag ant">preface</span><span class="vp-tag ant">introduction</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">In the <b>epilogue</b>, the author tells us what happened to the hero years later.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The play ended with an <b>epilogue</b> spoken by the main actor. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Readers often skip the <b>epilogue</b>, but it ties up every loose thread.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/44.png" alt="Picture for the word epilogue"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#b026c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈstəʊɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">not showing feelings and calmly accepting pain or trouble</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">संयमी, सहनशील</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">unemotional</span><span class="vp-tag syn">impassive</span><span class="vp-tag syn">long-suffering</span><span class="vp-tag syn">calm</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">emotional</span><span class="vp-tag ant">excitable</span><span class="vp-tag ant">sensitive</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">He stayed <b>stoic</b> while the doctor stitched the deep cut on his arm.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>stoic</b> old farmer accepted the failed harvest without a single complaint. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her <b>stoic</b> face hid the grief she felt during the long ceremony.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/45.png" alt="Picture for the word stoic"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#31d891;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈsæŋɡwɪn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">cheerful and hopeful, especially in a difficult situation</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">आशावादी, आशान्वित</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">optimistic</span><span class="vp-tag syn">hopeful</span><span class="vp-tag syn">confident</span><span class="vp-tag syn">cheerful</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">pessimistic</span><span class="vp-tag ant">gloomy</span><span class="vp-tag ant">despondent</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Despite the poor results, the coach remained <b>sanguine</b> about the next match. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Investors were <b>sanguine</b> about the market after the bank cut interest rates.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">She felt <b>sanguine</b> that the long journey would end in good news.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/46.png" alt="Picture for the word sanguine"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#dd754b;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈæŋkəraɪt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who lives alone, away from society, for religious reasons</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">संन्यासी, एकांतवासी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">hermit</span><span class="vp-tag syn">recluse</span><span class="vp-tag syn">ascetic</span><span class="vp-tag syn">solitary</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">socialite</span><span class="vp-tag ant">extrovert</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>anchorite</b> lived in a mountain cave and prayed for most of the day. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Villagers brought food to the <b>anchorite</b> but never stayed to talk.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Like an <b>anchorite</b>, he gave up wealth, company and comfort for silent study.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/47.png" alt="Picture for the word anchorite"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#2627c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/rɪˈkluːs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who lives alone and avoids other people</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">एकांतप्रिय, एकांतवासी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">hermit</span><span class="vp-tag syn">loner</span><span class="vp-tag syn">solitary person</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">socialite</span><span class="vp-tag ant">extrovert</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>recluse</b> rarely opened his door, even for his own neighbours.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">After her loss, she became a <b>recluse</b> and stopped answering calls.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The famous writer lived as a <b>recluse</b> in a house hidden by tall trees. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/48.png" alt="Picture for the word recluse"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#63d831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/əˈsetɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who gives up comforts and lives very simply for spiritual reasons</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">तपस्वी, संयमी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">monk</span><span class="vp-tag syn">abstainer</span><span class="vp-tag syn">renunciant</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">hedonist</span><span class="vp-tag ant">epicure</span><span class="vp-tag ant">sensualist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>ascetic</b> slept on the bare floor and ate only one simple meal a day. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Though rich, he lived like an <b>ascetic</b>, owning almost nothing.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The village revered the <b>ascetic</b> who had given up all comforts for meditation.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/49.png" alt="Picture for the word ascetic"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#dd4ba1;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">verb</span><span translate="no" class="vp-ipa">/rɪˈklaɪn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">to lean or lie back in a relaxed position</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">लेटना, पीछे झुकना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">lie back</span><span class="vp-tag syn">lean back</span><span class="vp-tag syn">repose</span><span class="vp-tag syn">rest</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">sit up</span><span class="vp-tag ant">stand</span><span class="vp-tag ant">rise</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">After lunch, grandfather loved to <b>recline</b> on the cane chair and read. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Passengers may <b>recline</b> their seats once the plane has taken off.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The painter asked his model to <b>recline</b> gracefully on the velvet sofa.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/50.png" alt="Picture for the word recline"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#26b2c5;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈmɪstɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who seeks deep spiritual truth through prayer and meditation</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">रहस्यवादी, अध्यात्म-साधक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">seer</span><span class="vp-tag syn">visionary</span><span class="vp-tag syn">spiritualist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">sceptic</span><span class="vp-tag ant">materialist</span><span class="vp-tag ant">rationalist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>mystic</b> sat by the river for hours, lost in silent prayer. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Kabir, a famous poet and <b>mystic</b>, taught that God lives within every heart.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The <b>mystic</b> claimed to feel a peace that no words could explain.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/51.png" alt="Picture for the word mystic"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d8bb31;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈʃɑːlətən/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who falsely claims to have special skill or knowledge</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">ढोंगी, नीमहकीम</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fraud</span><span class="vp-tag syn">quack</span><span class="vp-tag syn">impostor</span><span class="vp-tag syn">fake</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">expert</span><span class="vp-tag ant">authority</span><span class="vp-tag ant">professional</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>charlatan</b> sold coloured water as a cure for every disease. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Experts warned that the self-styled guru was a <b>charlatan</b> who cheated simple villagers.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">No <b>charlatan</b> can fool a trained doctor for long.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/52.png" alt="Picture for the word charlatan"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#994bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">verb</span><span translate="no" class="vp-ipa">/ˌmæskəˈreɪd/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">to pretend to be someone or something you are not</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">ढोंग करना, भेष बदलना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">pose</span><span class="vp-tag syn">pretend</span><span class="vp-tag syn">impersonate</span><span class="vp-tag syn">disguise</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">reveal</span><span class="vp-tag ant">unmask</span><span class="vp-tag ant">expose</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The thief tried to <b>masquerade</b> as a postman to enter the building. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Fake news can <b>masquerade</b> as real news and mislead thousands of readers.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">At the ball, guests <b>masquerade</b> as kings, birds and pirates until midnight.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/53.png" alt="Picture for the word masquerade"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#26c54c;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɒmˈnɪsiənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">knowing everything</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सर्वज्ञ</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">all-knowing</span><span class="vp-tag syn">all-wise</span><span class="vp-tag syn">infinitely wise</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">ignorant</span><span class="vp-tag ant">unaware</span><span class="vp-tag ant">uninformed</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Many people believe God is <b>omniscient</b> and knows every thought.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">No teacher is <b>omniscient</b>, so it is fine to say "I will find out."</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The <b>omniscient</b> narrator of the novel knows what every character secretly thinks. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/54.png" alt="Picture for the word omniscient"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d83139;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/juːˈbɪkwɪtəs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">seeming to be present everywhere at the same time</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सर्वव्यापी, हर जगह मौजूद</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">omnipresent</span><span class="vp-tag syn">everywhere</span><span class="vp-tag syn">pervasive</span><span class="vp-tag syn">universal</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">rare</span><span class="vp-tag ant">scarce</span><span class="vp-tag ant">absent</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Mobile phones are <b>ubiquitous</b>; you see them in almost every hand. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>ubiquitous</b> smell of fresh tea filled every lane of the old market.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Fast food chains have become <b>ubiquitous</b> in cities and small towns alike.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/55.png" alt="Picture for the word ubiquitous"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4b7ddd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈɪmənənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">present inside something as a natural part of it</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अंतर्निहित, भीतर व्याप्त</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">inherent</span><span class="vp-tag syn">intrinsic</span><span class="vp-tag syn">indwelling</span><span class="vp-tag syn">innate</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">external</span><span class="vp-tag ant">extrinsic</span><span class="vp-tag ant">outer</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Some thinkers say God is <b>immanent</b> in nature, not far away from it.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A sense of fairness is <b>immanent</b> in every child.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The poet felt a quiet beauty <b>immanent</b> in even the smallest pebble. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/56.png" alt="Picture for the word immanent"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#8ac526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈɪmɪnənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">about to happen very soon</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">निकट, आसन्न</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">impending</span><span class="vp-tag syn">approaching</span><span class="vp-tag syn">looming</span><span class="vp-tag syn">forthcoming</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">distant</span><span class="vp-tag ant">remote</span><span class="vp-tag ant">far-off</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Black clouds warned that a heavy storm was <b>imminent</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The company announced that an <b>imminent</b> merger would change the way it works.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">With exams <b>imminent</b>, the library was full from morning till midnight.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/57.png" alt="Picture for the word imminent"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d831cb;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈemɪnənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">famous and respected, especially in a profession</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">प्रतिष्ठित, विख्यात</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">distinguished</span><span class="vp-tag syn">renowned</span><span class="vp-tag syn">illustrious</span><span class="vp-tag syn">prominent</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">unknown</span><span class="vp-tag ant">obscure</span><span class="vp-tag ant">insignificant</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The college invited an <b>eminent</b> scientist to open its new laboratory. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">She is an <b>eminent</b> surgeon admired across the country.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The <b>eminent</b> poet received the award with humble words.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/58.png" alt="Picture for the word eminent"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4bddbd;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɪmpɑːs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a situation in which no progress can be made</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">गतिरोध, अवरोध</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">deadlock</span><span class="vp-tag syn">stalemate</span><span class="vp-tag syn">standoff</span><span class="vp-tag syn">dead end</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">breakthrough</span><span class="vp-tag ant">agreement</span><span class="vp-tag ant">progress</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The talks ended in an <b>impasse</b> when neither side would change its demand. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The union and the management reached an <b>impasse</b> over wages.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Stuck at an <b>impasse</b>, the two neighbours finally asked an elder to help.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/59.png" alt="Picture for the word impasse"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#c57426;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈkwæɡmaɪər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a difficult situation that is hard to get out of</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दलदल, कठिन स्थिति</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">swamp</span><span class="vp-tag syn">morass</span><span class="vp-tag syn">predicament</span><span class="vp-tag syn">mess</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">dry land</span><span class="vp-tag ant">ease</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The heavy rain turned the village road into a <b>quagmire</b> of sticky mud. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The company slipped into a financial <b>quagmire</b> after three bad years.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Each new rule only pulled the project deeper into a bureaucratic <b>quagmire</b>.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/60.png" alt="Picture for the word quagmire"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#5331d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈpɪrɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a win gained at such a heavy cost that it feels like a loss</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">महँगी जीत</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">costly</span><span class="vp-tag syn">ruinous</span><span class="vp-tag syn">hollow</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">easy</span><span class="vp-tag ant">painless</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The team won the final, but with three injured stars it was a <b>Pyrrhic</b> victory. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Winning the case cost him his savings, so it felt like a <b>Pyrrhic</b> success.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The general knew the battle was a <b>Pyrrhic</b> triumph, for his army was nearly destroyed.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/61.png" alt="Picture for the word Pyrrhic"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#58dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪmˈprɒmptjuː/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">done without planning or preparation</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">तत्काल, बिना तैयारी का</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">unplanned</span><span class="vp-tag syn">spontaneous</span><span class="vp-tag syn">improvised</span><span class="vp-tag syn">off-the-cuff</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">planned</span><span class="vp-tag ant">rehearsed</span><span class="vp-tag ant">prepared</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Friends gave an <b>impromptu</b> concert on the beach when the evening turned cool. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">She made an <b>impromptu</b> speech when the chief guest did not arrive.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The <b>impromptu</b> picnic was the best part of the long trip.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/62.png" alt="Picture for the word impromptu"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#c52663;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪkˈstempəri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">spoken or done without any preparation</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">तुरंत, बिना तैयारी का</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">impromptu</span><span class="vp-tag syn">unrehearsed</span><span class="vp-tag syn">offhand</span><span class="vp-tag syn">spontaneous</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">prepared</span><span class="vp-tag ant">rehearsed</span><span class="vp-tag ant">planned</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The minister gave an <b>extempore</b> reply without looking at his notes.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Students enjoyed the <b>extempore</b> speaking contest, where topics were handed out on the spot. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">He was able to speak <b>extempore</b> for twenty minutes on any topic.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/63.png" alt="Picture for the word extempore"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#31a2d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈpedənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who cares too much about small details and rules</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">किताबी विद्वान, बारीकी पसंद</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">nitpicker</span><span class="vp-tag syn">stickler</span><span class="vp-tag syn">quibbler</span><span class="vp-tag syn">hair-splitter</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>pedant</b> corrected the speaker's grammar even in the middle of the party.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Our teacher is no <b>pedant</b>; she values ideas more than tiny details.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Only a <b>pedant</b> would argue about a comma while the building was on fire. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/64.png" alt="Picture for the word pedant"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d8dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/səˈriːəlɪzəm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an art style that shows dreams and strange, impossible images</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अतियथार्थवाद, स्वप्निल कला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fantasy art</span><span class="vp-tag syn">dream art</span><span class="vp-tag syn">fantastic art</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">realism</span><span class="vp-tag ant">naturalism</span><span class="vp-tag ant">verism</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A painting of melting clocks in a desert is a classic work of <b>surrealism</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The film's <b>surrealism</b> made viewers feel they were walking inside a dream.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Poets of <b>surrealism</b> wrote strange images straight from the dreaming mind.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/65.png" alt="Picture for the word surrealism"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#9c26c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈvɪərɪzəm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">the use of real, everyday life in art, even when it is ugly</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">यथार्थवाद, सत्यवाद</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">realism</span><span class="vp-tag syn">naturalism</span><span class="vp-tag syn">true-to-life style</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">idealism</span><span class="vp-tag ant">romanticism</span><span class="vp-tag ant">surrealism</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The writer's <b>verism</b> showed the poor workers' lives exactly as they were.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Critics admired the film's <b>verism</b>, from its dusty streets to its tired faces. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In an age of fantasy, her paintings stood out for their stern <b>verism</b>.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/66.png" alt="Picture for the word verism"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#31d87c;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/vəˈræsəti/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">the quality of being truthful and accurate</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सत्यता, सच्चाई</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">truthfulness</span><span class="vp-tag syn">honesty</span><span class="vp-tag syn">accuracy</span><span class="vp-tag syn">authenticity</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">falsehood</span><span class="vp-tag ant">dishonesty</span><span class="vp-tag ant">deceit</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The judge questioned the <b>veracity</b> of the witness's story. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Journalists must check the <b>veracity</b> of every claim before publishing it.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Nobody doubted the <b>veracity</b> of the old soldier's tales.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/67.png" alt="Picture for the word veracity"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#dd624b;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈmæsəkɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who enjoys suffering or being hurt</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">आत्मपीड़क, स्वपीड़न-प्रेमी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">self-tormentor</span><span class="vp-tag syn">self-punisher</span><span class="vp-tag syn">pain-lover</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">sadist</span><span class="vp-tag ant">tormentor</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Only a <b>masochist</b> would run a marathon barefoot on hot sand for fun. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The psychologist described the <b>masochist</b> as someone who finds pleasure in his own pain.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Accused of being a <b>masochist</b>, he kept returning to the cruel boss who shouted at him.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/68.png" alt="Picture for the word masochist"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#263bc5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈseɪdɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who enjoys hurting other people</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">परपीड़क</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">tormentor</span><span class="vp-tag syn">brute</span><span class="vp-tag syn">bully</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">masochist</span><span class="vp-tag ant">humanitarian</span><span class="vp-tag ant">benefactor</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The cruel guard, a true <b>sadist</b>, laughed while the prisoners suffered.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Nobody liked the <b>sadist</b> who teased smaller children until they cried. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In the novel, the <b>sadist</b> rules the village by fear and enjoys others' pain.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/69.png" alt="Picture for the word sadist"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#78d831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/səˈvɑːnt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person with great learning in a special field</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">विद्वान, महापंडित</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">scholar</span><span class="vp-tag syn">sage</span><span class="vp-tag syn">learned person</span><span class="vp-tag syn">genius</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">ignoramus</span><span class="vp-tag ant">dunce</span><span class="vp-tag ant">fool</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The village <b>savant</b> knew the history of every temple in the district. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>savant</b> in mathematics, she solved problems that puzzled professors.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The young <b>savant</b> amazed the guests by recalling every date of the king's rule.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/70.png" alt="Picture for the word savant"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#dd4bb4;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌvɜːtʃuˈəʊsəʊ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person with outstanding skill, especially in music</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कला-निपुण, उस्ताद</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">master</span><span class="vp-tag syn">maestro</span><span class="vp-tag syn">expert</span><span class="vp-tag syn">genius</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">amateur</span><span class="vp-tag ant">novice</span><span class="vp-tag ant">beginner</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The violin <b>virtuoso</b> played so fast that the audience held its breath. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>virtuoso</b> with the camera, he captured a hundred moods in one frame.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The young <b>virtuoso</b> drew applause with a flawless recital.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/71.png" alt="Picture for the word virtuoso"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#26c5c4;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/əˈluːʒn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">an indirect reference to something without saying it directly</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">संकेत, परोक्ष उल्लेख</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">hint</span><span class="vp-tag syn">reference</span><span class="vp-tag syn">mention</span><span class="vp-tag syn">suggestion</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His remark about "a modern Ravana" was an <b>allusion</b> to the greedy contractor. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The poem is full of <b>allusions</b> to Greek myths.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">She made a subtle <b>allusion</b> to the incident without naming anyone.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/72.png" alt="Picture for the word allusion"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d8a631;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɪˈluːʒn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">the act of escaping or avoiding something cleverly</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">चकमा, बचाव</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">evasion</span><span class="vp-tag syn">escape</span><span class="vp-tag syn">dodging</span><span class="vp-tag syn">avoidance</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">capture</span><span class="vp-tag ant">confrontation</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The thief's <b>elusion</b> of the police lasted three weeks. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The cat's skilful <b>elusion</b> of the dog amused the whole street.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">His <b>elusion</b> of the question showed he had no answer.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/73.png" alt="Picture for the word elusion"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#864bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɪˈluːʒn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a false idea or appearance that seems real</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">भ्रम, माया</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">delusion</span><span class="vp-tag syn">mirage</span><span class="vp-tag syn">fantasy</span><span class="vp-tag syn">misconception</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">reality</span><span class="vp-tag ant">truth</span><span class="vp-tag ant">fact</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The shimmering water on the hot road is only an <b>illusion</b> of the desert heat. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">He lived under the <b>illusion</b> that wealth brings lasting happiness.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The magician's <b>illusion</b> made the elephant vanish before everyone's eyes.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/74.png" alt="Picture for the word illusion"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#26c538;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">verb</span><span translate="no" class="vp-ipa">/ɪˈluːd/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">to escape or avoid someone or something cleverly</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">चकमा देना, बच निकलना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">evade</span><span class="vp-tag syn">dodge</span><span class="vp-tag syn">escape</span><span class="vp-tag syn">avoid</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">face</span><span class="vp-tag ant">confront</span><span class="vp-tag ant">catch</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The fox managed to <b>elude</b> the hunters by hiding in a hollow log. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The exact answer continued to <b>elude</b> the students despite hours of effort.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The thief hoped to <b>elude</b> capture by changing trains at midnight.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/75.png" alt="Picture for the word elude"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#d8314f;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈænəkɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who believes there should be no government or law</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अराजकतावादी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">rebel</span><span class="vp-tag syn">nihilist</span><span class="vp-tag syn">revolutionary</span><span class="vp-tag syn">insurgent</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">loyalist</span><span class="vp-tag ant">conformist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>anarchist</b> said that people could manage life without any ruler.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Police arrested the <b>anarchist</b> for urging the crowd to ignore every law. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Some novels show the <b>anarchist</b> as a dreamer, others as a threat.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/76.png" alt="Picture for the word anarchist"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4b8fdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈrɪəlɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a person who sees things as they really are</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">यथार्थवादी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">pragmatist</span><span class="vp-tag syn">practical person</span><span class="vp-tag syn">rationalist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">idealist</span><span class="vp-tag ant">dreamer</span><span class="vp-tag ant">romantic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">As a <b>realist</b>, she knew that passing without practice was impossible.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The coach, a <b>realist</b>, told the team they were not yet ready for the finals. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">A true <b>realist</b> neither hopes for miracles nor expects disasters.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/77.png" alt="Picture for the word realist"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#9fc526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˌdʒɪŋɡəʊˈɪstɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">showing aggressive and extreme pride in one's own country</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अंधराष्ट्रवादी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">chauvinistic</span><span class="vp-tag syn">warmongering</span><span class="vp-tag syn">ultranationalist</span><span class="vp-tag syn">belligerent</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">peace-loving</span><span class="vp-tag ant">pacifist</span><span class="vp-tag ant">moderate</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>jingoistic</b> speaker demanded war and shouted that no other country mattered. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Newspapers with a <b>jingoistic</b> tone often increase hatred between neighbouring nations.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her <b>jingoistic</b> views made her blind to the good in other cultures.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/78.png" alt="Picture for the word jingoistic"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#cf31d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈrevəri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a state of pleasant daydreaming</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दिवास्वप्न, खयाली दुनिया</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">daydream</span><span class="vp-tag syn">trance</span><span class="vp-tag syn">fantasy</span><span class="vp-tag syn">musing</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">alertness</span><span class="vp-tag ant">attention</span><span class="vp-tag ant">awareness</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A sudden knock at the door broke her <b>reverie</b> by the window. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The student sat lost in <b>reverie</b> while the lecture went on.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The old man sat on the porch in a happy <b>reverie</b> of his youth.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/79.png" alt="Picture for the word reverie"></div></div></div>
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
      <div class="cp-vocab vp" style="--a:#4bddab;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/juːˈfɔːriə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">a feeling of great happiness and excitement</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">उल्लास, अत्यंत हर्ष</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">elation</span><span class="vp-tag syn">bliss</span><span class="vp-tag syn">joy</span><span class="vp-tag syn">rapture</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">misery</span><span class="vp-tag ant">despair</span><span class="vp-tag ant">gloom</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The whole city was in <b>euphoria</b> after the team lifted the trophy.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A wave of <b>euphoria</b> swept over her when the results were announced.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The mountaineers felt pure <b>euphoria</b> on reaching the summit at dawn. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_1/80.png" alt="Picture for the word euphoria"></div></div></div>
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
  "images/English_Comprehension/Vocabulary/Set_1/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an open elegant dictionary, a gold fountain pen and a few floating letter tiles" },
  "images/English_Comprehension/Vocabulary/Set_1/1.png": { t: "fig", about: "Scene from the sentence: \"The calligrapher dipped her pen carefully and wrote the invitation in flowing letters.\" — Show: a calligrapher dipping a brush pen in ink and writing flowing letters on a wedding invitation, ink bottle and paper on a wooden desk. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/2.png": { t: "fig", about: "Scene from the sentence: \"The doctor's cacography made the prescription impossible for the chemist to read.\" — Show: a pharmacist squinting at a doctor's messy scribbled prescription with a confused face, pill bottles and counter in a small shop. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/3.png": { t: "fig", about: "Scene from the sentence: \"Satellite images help a modern cartographer update city maps within days.\" — Show: a cartographer at a drafting table with compass and satellite printouts, drawing a city map, focused mood. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/4.png": { t: "fig", about: "Scene from the sentence: \"The philatelist paid a huge sum for a rare stamp at the auction.\" — Show: an elderly man with a magnifying glass and tweezers examining a rare stamp at a desk with open stamp albums. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/5.png": { t: "fig", about: "Scene from the sentence: \"No historian can work without the patient help of a good archivist.\" — Show: an archivist in white gloves lifting a fragile old document from a box in a records room with tall shelves. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/6.png": { t: "fig", about: "Scene from the sentence: \"The numismatist examined the ancient silver coin under a bright lamp.\" — Show: a numismatist with a magnifying glass studying an ancient silver coin under a lamp, trays of old coins on velvet. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/7.png": { t: "fig", about: "Scene from the sentence: \"The finance minister visited the mint to see how new coins are made.\" — Show: a factory floor at a mint with machines stamping shiny coins that pour into a bin, a minister in a suit watching. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/8.png": { t: "fig", about: "Scene from the sentence: \"Because of her nyctophobia, Riya always sleeps with a small lamp switched on.\" — Show: a child sitting up in bed clutching a blanket, a glowing night lamp on the table, dark room with shadowy corners. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/9.png": { t: "fig", about: "Scene from the sentence: \"Suffering from agoraphobia, the poet rarely left his small room for years.\" — Show: a worried poet staring from a dim window at a bustling crowded square, one hand pressed on the glass. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/10.png": { t: "fig", about: "Scene from the sentence: \"The film shows how xenophobia slowly poisoned a once-friendly town.\" — Show: villagers turning their backs on a family of newcomers carrying suitcases at a village gate, sad mood. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/11.png": { t: "fig", about: "Scene from the sentence: \"His gynophobia made him nervous even when a woman simply asked him for directions.\" — Show: a nervous young man stepping back with raised hands as a woman politely asks him for directions on a street. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/12.png": { t: "fig", about: "Scene from the sentence: \"In the old story, the king, a digamist, brought a new queen to the palace.\" — Show: an older king standing beside a smiling new queen at a palace wedding with garlands and guests. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/13.png": { t: "fig", about: "Scene from the sentence: \"Claustrophobia made her take the stairs instead of the crowded, narrow lift.\" — Show: a pale woman hesitating at the door of a crowded narrow lift, choosing the staircase instead. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/14.png": { t: "fig", about: "Scene from the sentence: \"The lexicographer spent ten years collecting meanings for the new Hindi dictionary.\" — Show: an elderly lexicographer surrounded by stacks of dictionary pages and index cards, writing at a lamp-lit desk. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/15.png": { t: "fig", about: "Scene from the sentence: \"The etymology of \"salary\" goes back to the Latin word for salt.\" — Show: a student in a library looking at a dictionary beside a small pile of salt, arrows like a family tree floating in the air. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/16.png": { t: "fig", about: "Scene from the sentence: \"The university's entomology department tracks insects that damage the wheat crop.\" — Show: researchers in a wheat field examining insects with magnifying glasses and nets, notebooks in hand. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/17.png": { t: "fig", about: "Scene from the sentence: \"The philologist spent years decoding the grammar of a forgotten tribal language.\" — Show: a scholar at a desk comparing two ancient manuscripts side by side with books piled up, deep concentration. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/18.png": { t: "fig", about: "Scene from the sentence: \"Text messaging has speeded up neology, creating new words almost every month.\" — Show: teenagers laughing over their phones in a cafe, colourful abstract shapes floating above them like fresh ideas. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/19.png": { t: "fig", about: "Scene from the sentence: \"The paleographer slowly read the faded writing on the medieval parchment.\" — Show: a paleographer with a magnifier reading a faded medieval parchment under a lamp, quill and ink bottle nearby. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/20.png": { t: "fig", about: "Scene from the sentence: \"The newspaper's clever coinage 'staycation' soon appeared in many dictionaries.\" — Show: an editor in a busy newsroom proudly showing colleagues a dictionary with a bookmark, everyone smiling. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/21.png": { t: "fig", about: "Scene from the sentence: \"The young orator held the whole hall silent with his powerful opening line.\" — Show: a young speaker at a podium addressing a hushed crowded hall with one hand raised, audience listening intently. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/22.png": { t: "fig", about: "Scene from the sentence: \"The demagogue promised free everything and blamed outsiders for every problem in town.\" — Show: a loud politician on a platform pointing angrily at the sky while an excited crowd waves fists. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/23.png": { t: "fig", about: "Scene from the sentence: \"The village pedagogue taught three generations from one dusty classroom.\" — Show: an elderly village teacher with spectacles and a cane standing before a chalkboard in a dusty classroom of village children. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/24.png": { t: "fig", about: "Scene from the sentence: \"The old synagogue in the city is known for its stained glass windows.\" — Show: exterior of an old synagogue with a stained glass window in golden evening light, people walking in. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/25.png": { t: "fig", about: "Scene from the sentence: \"Her eloquent speech about saving the lake moved even the strongest critics.\" — Show: a confident woman addressing a village meeting beside a lake, listeners nodding and some wiping tears. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/26.png": { t: "fig", about: "Scene from the sentence: \"The first cuckoo's call is a harbinger of spring in the countryside.\" — Show: a cuckoo singing on a blooming branch at sunrise, a village in the distance, last patches of snow melting. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/27.png": { t: "fig", about: "Scene from the sentence: \"The royal herald blew his trumpet and read the king's order aloud.\" — Show: a medieval herald in a colourful tunic blowing a long trumpet and reading a scroll in a market square. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/28.png": { t: "fig", about: "Scene from the sentence: \"As a trusted emissary, he carried secret letters across the mountain border.\" — Show: a cloaked messenger on horseback crossing a mountain pass at dusk, sealed letters in a leather satchel. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/29.png": { t: "fig", about: "Scene from the sentence: \"Shakespeare's plays contain an archaism on almost every page, so students keep glossaries beside them.\" — Show: a puzzled student in a library reading an old book of plays with a thick glossary open beside it. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/30.png": { t: "fig", about: "Scene from the sentence: \"The mechanic's jargon left me completely confused about what was wrong with my scooter.\" — Show: a puzzled customer in a garage listening to a mechanic pointing at engine parts, tools hanging on the wall. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/31.png": { t: "fig", about: "Scene from the sentence: \"Pickpockets in the old city spoke a secret argot to hide their plans.\" — Show: two shady pickpockets whispering in a dim old city alley, glancing around, lantern light on wet stones. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/32.png": { t: "fig", about: "Scene from the sentence: \"The word \"selfie\" was once a neologism, but now everyone uses it.\" — Show: friends laughing on a sofa taking a selfie with a smartphone, an open dictionary lying beside them. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/33.png": { t: "fig", about: "Scene from the sentence: \"Her speech was full of friendly colloquialisms, which made the crowd feel at home.\" — Show: a cheerful speaker chatting casually with a village crowd at a tea stall, everyone laughing and relaxed. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/34.png": { t: "fig", about: "Scene from the sentence: \"The farmer spoke in a rural dialect that city visitors found hard to follow.\" — Show: a farmer chatting at a field gate with puzzled city visitors who lean in to listen. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/35.png": { t: "fig", about: "Scene from the sentence: \"When asked about the budget, his reply about cricket was a complete non sequitur.\" — Show: a meeting room where a man asked about the budget holds up a cricket bat while colleagues stare in confusion. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/36.png": { t: "fig", about: "Scene from the sentence: \"The minister's equivocation on the tax question made reporters even more suspicious.\" — Show: reporters crowding a minister who shrugs and waves his hands vaguely at a bunch of microphones. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/37.png": { t: "fig", about: "Scene from the sentence: \"The editor cut the tautology from the report to make it shorter.\" — Show: an editor with a red pen crossing out repeated lines on a long printed report, desk piled with paper. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/38.png": { t: "fig", about: "Scene from the sentence: \"Farmers once planted crops by checking the weather notes in the village almanac.\" — Show: a farmer in a field at sunrise holding an old almanac book while looking up at the sky. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/39.png": { t: "fig", about: "Scene from the sentence: \"The monk kept a chronicle of every flood and famine in the kingdom.\" — Show: a monk writing in a large book by candlelight in a stone cell with scrolls stacked around him. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/40.png": { t: "fig", about: "Scene from the sentence: \"The shopkeeper noted every sale in his big ledger before closing the shop.\" — Show: a shopkeeper writing in a thick ledger at a wooden counter, shelves of goods behind him. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/41.png": { t: "fig", about: "Scene from the sentence: \"The epigrapher read the ancient king's orders carved on a rock pillar.\" — Show: an epigrapher with a brush and notebook studying lines carved on an ancient stone pillar in sunlight. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/42.png": { t: "fig", about: "Scene from the sentence: \"The epitaph on his grave said simply, \"He loved the mountains.\"\" — Show: a visitor kneeling at a granite gravestone with carved lines at dawn, mountain flowers placed in front. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/43.png": { t: "fig", about: "Scene from the sentence: \"The village doctor was the epitome of kindness, treating the poor without any fee.\" — Show: a village doctor gently treating a poor child in a simple clinic while the family looks on gratefully. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/44.png": { t: "fig", about: "Scene from the sentence: \"The play ended with an epilogue spoken by the main actor.\" — Show: an actor stepping forward alone onto a softly lit stage as the curtain falls behind him. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/45.png": { t: "fig", about: "Scene from the sentence: \"The stoic old farmer accepted the failed harvest without a single complaint.\" — Show: an old farmer standing calmly at the edge of a dry, failed crop field, hands folded and face composed. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/46.png": { t: "fig", about: "Scene from the sentence: \"Despite the poor results, the coach remained sanguine about the next match.\" — Show: a smiling coach with a clipboard standing confidently before a team of players who look down after defeat. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/47.png": { t: "fig", about: "Scene from the sentence: \"The anchorite lived in a mountain cave and prayed for most of the day.\" — Show: a hermit sitting in prayer inside a mountain cave while villagers quietly leave a basket of food at the entrance. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/48.png": { t: "fig", about: "Scene from the sentence: \"The famous writer lived as a recluse in a house hidden by tall trees.\" — Show: a large old house almost hidden by tall trees with curtains drawn, a single lamp glowing in an upper window. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/49.png": { t: "fig", about: "Scene from the sentence: \"The ascetic slept on the bare floor and ate only one simple meal a day.\" — Show: a lean ascetic sitting on a bare floor with a small bowl of rice in a sparse hut. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/50.png": { t: "fig", about: "Scene from the sentence: \"After lunch, grandfather loved to recline on the cane chair and read.\" — Show: an elderly man reclining on a cane chair on a sunny veranda, reading a book in the afternoon light. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/51.png": { t: "fig", about: "Scene from the sentence: \"The mystic sat by the river for hours, lost in silent prayer.\" — Show: a mystic sitting cross-legged by a calm river at dawn, eyes closed, soft golden light on the water. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/52.png": { t: "fig", about: "Scene from the sentence: \"The charlatan sold coloured water as a cure for every disease.\" — Show: a street vendor in a tall hat selling colourful bottles to a crowd while one woman looks doubtful. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/53.png": { t: "fig", about: "Scene from the sentence: \"The thief tried to masquerade as a postman to enter the building.\" — Show: a man wearing a postman's cap and carrying a bag at an apartment door while a guard looks suspicious. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/54.png": { t: "fig", about: "Scene from the sentence: \"The omniscient narrator of the novel knows what every character secretly thinks.\" — Show: a novel open on a desk with tiny glowing figures of its characters rising from the pages, each wrapped in a soft glow. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/55.png": { t: "fig", about: "Scene from the sentence: \"Mobile phones are ubiquitous; you see them in almost every hand.\" — Show: a crowded railway platform where nearly everyone is looking at a mobile phone in hand. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/56.png": { t: "fig", about: "Scene from the sentence: \"The poet felt a quiet beauty immanent in even the smallest pebble.\" — Show: a poet kneeling beside a smooth pebble in a stream at dawn, a soft light glowing from within the stone. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/57.png": { t: "fig", about: "Scene from the sentence: \"Black clouds warned that a heavy storm was imminent.\" — Show: dark storm clouds gathering over a village field, farmers hurrying home with tools as the wind rises. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/58.png": { t: "fig", about: "Scene from the sentence: \"The college invited an eminent scientist to open its new laboratory.\" — Show: an elderly respected scientist cutting a ribbon at a new college laboratory while students clap. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/59.png": { t: "fig", about: "Scene from the sentence: \"The talks ended in an impasse when neither side would change its demand.\" — Show: two negotiators sitting on opposite sides of a long table with folded arms, facing away, papers untouched. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/60.png": { t: "fig", about: "Scene from the sentence: \"The heavy rain turned the village road into a quagmire of sticky mud.\" — Show: a tractor stuck in deep sticky mud on a village road after rain, farmers pushing from behind. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/61.png": { t: "fig", about: "Scene from the sentence: \"The team won the final, but with three injured stars it was a Pyrrhic victory.\" — Show: injured players with bandages holding a winning trophy sadly in an empty stadium. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/62.png": { t: "fig", about: "Scene from the sentence: \"Friends gave an impromptu concert on the beach when the evening turned cool.\" — Show: friends singing with a guitar on a beach at dusk, others clapping around a small campfire. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/63.png": { t: "fig", about: "Scene from the sentence: \"Students enjoyed the extempore speaking contest, where topics were handed out on the spot.\" — Show: students at a classroom contest, one boy drawing a slip from a bowl and starting to speak while others watch. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/64.png": { t: "fig", about: "Scene from the sentence: \"Only a pedant would argue about a comma while the building was on fire.\" — Show: a stern man at a desk with a magnifying glass pointing at a comma on a page while flames flicker outside the window. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/65.png": { t: "fig", about: "Scene from the sentence: \"A painting of melting clocks in a desert is a classic work of surrealism.\" — Show: a desert with soft melting clocks draped over a tree branch and a rock under a dreamlike sky. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/66.png": { t: "fig", about: "Scene from the sentence: \"Critics admired the film's verism, from its dusty streets to its tired faces.\" — Show: a film crew shooting a scene in a dusty narrow lane with tired faces, camera and microphone close by. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/67.png": { t: "fig", about: "Scene from the sentence: \"The judge questioned the veracity of the witness's story.\" — Show: a judge in a courtroom looking doubtfully at a witness on the stand while lawyers listen. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/68.png": { t: "fig", about: "Scene from the sentence: \"Only a masochist would run a marathon barefoot on hot sand for fun.\" — Show: a sweaty runner barefoot on hot sand dunes with a strained smile while baffled spectators watch. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/69.png": { t: "fig", about: "Scene from the sentence: \"Nobody liked the sadist who teased smaller children until they cried.\" — Show: a big boy teasing a smaller crying child in a playground while the little one's friends look frightened. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/70.png": { t: "fig", about: "Scene from the sentence: \"The village savant knew the history of every temple in the district.\" — Show: an elderly village scholar with a white beard sitting under a banyan tree, villagers listening to him about an old temple. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/71.png": { t: "fig", about: "Scene from the sentence: \"The violin virtuoso played so fast that the audience held its breath.\" — Show: a violinist on stage playing with a blur of fast bow movement while the audience leans forward. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/72.png": { t: "fig", about: "Scene from the sentence: \"His remark about \"a modern Ravana\" was an allusion to the greedy contractor.\" — Show: a speaker at a podium glancing slyly at a greedy contractor in the audience, who shifts nervously in his seat. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/73.png": { t: "fig", about: "Scene from the sentence: \"The thief's elusion of the police lasted three weeks.\" — Show: a thief slipping through a narrow alley while police run past in the opposite direction. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/74.png": { t: "fig", about: "Scene from the sentence: \"The shimmering water on the hot road is only an illusion of the desert heat.\" — Show: a hot empty highway with a shimmering water-like mirage on the road, a tired traveller squinting at it. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/75.png": { t: "fig", about: "Scene from the sentence: \"The fox managed to elude the hunters by hiding in a hollow log.\" — Show: a fox hiding inside a hollow log as hunters walk past in the forest. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/76.png": { t: "fig", about: "Scene from the sentence: \"Police arrested the anarchist for urging the crowd to ignore every law.\" — Show: a man standing on a wooden box urging a crowd in a square while police approach and torn posters flutter. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/77.png": { t: "fig", about: "Scene from the sentence: \"The coach, a realist, told the team they were not yet ready for the finals.\" — Show: a coach honestly talking to a quiet team on a training ground, a trophy cabinet visible behind them. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/78.png": { t: "fig", about: "Scene from the sentence: \"The jingoistic speaker demanded war and shouted that no other country mattered.\" — Show: an angry speaker shouting from a platform waving a large flag, a crowd below with raised fists. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/79.png": { t: "fig", about: "Scene from the sentence: \"A sudden knock at the door broke her reverie by the window.\" — Show: a woman gazing dreamily out of a window with a soft smile, startled by a knock at the door behind her. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_1/80.png": { t: "fig", about: "Scene from the sentence: \"The mountaineers felt pure euphoria on reaching the summit at dawn.\" — Show: mountaineers standing on a snowy summit at dawn with arms raised, golden light over the clouds below. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." }
});

/* CHANGE LOG
   - Duplicate words removed: Paleographer, Philologist, Herald, Recluse.
   - 'Henophobia' was hard to read in the handwriting; treated as Gynophobia (fear of women). Please verify.
*/