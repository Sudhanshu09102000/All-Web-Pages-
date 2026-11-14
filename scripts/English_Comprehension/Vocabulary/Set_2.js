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
  if (typeof setInterval === "function") setInterval(function () {
    var v = document.querySelector(".cp-vocab.vp");
    if (!v || !v.parentElement) return;
    var b = px(v.parentElement);
    if (b !== lastBase) { lastBase = b; queue(); }
  }, 300);
  queue();
})();

/* Field: English_Comprehension · Subject: Vocabulary · Chapter: Set_2 · 80 concept pages (+ overview) · 80 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📚", accent: "#0ea5e9", pauseTimer: true,
    title: "Vocabulary Set 2 — Personality, Phobias, Speech, Sleep & Money Words",
    thumb: {
      image: "images/English_Comprehension/Vocabulary/Set_2/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "VOCAB",
      line2: "SET 2",
      line3: "80 WORDS WITH PICTURES",
      badge: "FULL CLASS",
      ribbon: "MEANING • HINDI • SYNONYMS • ANTONYMS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Vocabulary Set 2 | 80 Words with Meaning, Hindi, Synonyms, Antonyms | Phobias, Personality & Sleep Words",
      altTitles: ["80 Important English Vocabulary Words With Pictures", "Phobias + Personality + Sleep + Money Words for SSC Banking UPSC"],
      description: "Learn exam vocabulary the smart way: 80 words, each with meaning, Hindi meaning, part of speech, synonyms, antonyms, 3 example sentences, a picture and a practice question.\n\n📌 IN THIS CLASS\n✅ cynic, misanthrope, epicure, enigma, triskaidekaphobia, aichmophobia, pyrophobia\n✅ extravagant, thrifty, prodigal, ephemeral, nascent, mendacious, candid\n✅ prolixity, taciturnity, loquacious, laconic, lugubrious, sardonic, aphasia, insomnia\n✅ stolid, obtuse, perspicacious, perspicuous, indefatigable, quixotic, dogmatic\n✅ pseudonym, patronym, acronym, homonym, peripatetic, sedentary, schadenfreude, sycophant, altruist, philanthropist, burglary, pilferage, window-shopping\n\nUseful for SSC CGL, CHSL, Banking, Railways, UPSC and Defence exams.",
      tags: ["vocabulary for SSC CGL", "English vocabulary", "vocabulary set 2", "word meaning in Hindi", "synonyms and antonyms", "phobia names", "triskaidekaphobia", "ephemeral meaning", "prodigal meaning", "mendacious meaning", "immigrant vs emigrant", "indelible meaning", "laconic meaning", "perspicacious vs perspicuous", "pseudonym patronym acronym", "one word substitution", "SSC CGL English", "banking exam vocabulary", "UPSC vocabulary", "railway exam vocabulary", "daily vocabulary", "English with pictures", "important words for exams", "full class"],
      hashtags: ["#Vocabulary", "#SSCCGL", "#EnglishVocabulary", "#SynonymsAntonyms", "#VocabSet2"],
      thumbText: "VOCAB SET 2 | 80 WORDS",
      pinnedComment: "Which word was new for you today? Comment it below and revise it with its picture! 👇",
      communityPost: "📚 Vocabulary Set 2 is live: 80 exam words with Hindi meaning, synonyms, antonyms and pictures. Which word was the hardest for you?",
      chapters: "00:00 Introduction\n02:00 Cynic to Enchant\n14:00 Incredible to Hexakosioihexekontahexaphobia\n24:00 Extravagant to Intransient\n34:00 Mendacious to Prototype\n44:00 Prolixity to Abbreviate\n54:00 Jubilant to Narcolepsy\n1:04:00 Somnolence to Indefatigable\n1:14:00 Invincible to Homonym\n1:24:00 Mannequin to Schadenfreude\n1:34:00 Apathy to Pilferage\n1:44:00 Revision",
      playlist: "English Vocabulary for Competitive Exams"
    },
    html: `
      <p class="cp-lead">Today we learn 80 powerful exam words: personality types, famous phobias, talkative and silent speakers, moods, sleep words, money habits, travellers, names and helpers. Each word comes with a meaning, Hindi meaning, synonyms, antonyms, three sentences, a picture and a practice question.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>80</b><span>Words</span></div>
        <div class="cp-stat"><b>80</b><span>Questions</span></div>
        <div class="cp-stat"><b>~240 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Words 1-9 · Attitudes &amp; Tastes</b><br>Cynic, Censorious, Fatalist, Epicure, Gourmet, Misanthrope, Misologist, Enigma, Enchant</li>
        <li><b>Words 10-16 · Certain &amp; Fearful</b><br>Incredible, Indelible, Inevitable, Triskaidekaphobia, Aichmophobia, Pyrophobia, Hexakosioihexekontahexaphobia</li>
        <li><b>Words 17-24 · Money &amp; Time</b><br>Extravagant, Thrifty, Prodigal, Spendthrift, Ephemeral, Nascent, Incessant, Intransient</li>
        <li><b>Words 25-31 · Truth, Movement &amp; Models</b><br>Mendacious, Candid, Immigrant, Emigrant, Cynosure, Paradigm, Prototype</li>
        <li><b>Words 32-39 · Talk &amp; Silence</b><br>Prolixity, Taciturnity, Loquacious, Garrulous, Laconic, Reticence, Brevity, Abbreviate</li>
        <li><b>Words 40-47 · Moods &amp; Voice</b><br>Jubilant, Lugubrious, Maudlin, Sardonic, Aphonia, Aphasia, Insomnia, Narcolepsy</li>
        <li><b>Words 48-55 · Sleep, Mind &amp; Strength</b><br>Somnolence, Somnambulist, Stolid, Obtuse, Perspicacious, Perspicuous, Proprietor, Indefatigable</li>
        <li><b>Words 56-63 · Strong Minds &amp; Names</b><br>Invincible, Infallible, Quixotic, Dogmatic, Pseudonym, Patronym, Acronym, Homonym</li>
        <li><b>Words 64-71 · Art, Travel &amp; Feelings</b><br>Mannequin, Sculptor, Chancery, Peripatetic, Wayfarer, Sedentary, Antipathy, Schadenfreude</li>
        <li><b>Words 72-79 · Helpers &amp; Thieves</b><br>Apathy, Protégé, Sycophant, Altruist, Samaritan, Philanthropist, Burglary, Pilferage</li>
        <li><b>Word 80 · Bonus</b><br>Window-shopping</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Words like Ephemeral, Prodigal, Indelible, Laconic, Perspicacious, Quixotic and Sycophant, and confusing pairs like Immigrant/Emigrant, Perspicacious/Perspicuous and Burglary/Pilferage, appear again and again in SSC, Banking, UPSC and Railways exams.</div>
    `
  },
  2: {
    type: "concept", icon: "😒", accent: "#3162d8", pauseTimer: true,
    title: "Cynic",
    html: `
      <div class="cp-vocab vp" style="--a:#3162d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɪnɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who believes people act only for selfish reasons and doubts their honesty.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">शंकालु, अविश्वासी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">skeptic</span><span class="vp-tag syn">doubter</span><span class="vp-tag syn">pessimist</span><span class="vp-tag syn">scoffer</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">optimist</span><span class="vp-tag ant">idealist</span><span class="vp-tag ant">believer</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The old <b>cynic</b> laughed and said every politician only wants votes, never real change. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Because she was a <b>cynic</b>, she doubted the company's promise of free bonuses for everyone.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In the novel, the <b>cynic</b> mocks every noble ideal he meets with bitter wit.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/1.png" alt="Picture for the word Cynic"></div></div></div>
    `
  },
  3: {
    questext: "Which word is closest in meaning to CYNIC?",
    options: ["Optimist", "Skeptic", "Admirer", "Dreamer"],
    correct: "2",
    exptext: "✅ A cynic doubts people's motives, like a skeptic. 📌 Cynic = sneering doubter. ❌ Optimist is the opposite."
  },
  4: {
    type: "concept", icon: "😤", accent: "#a0dd4b", pauseTimer: true,
    title: "Censorious",
    html: `
      <div class="cp-vocab vp" style="--a:#a0dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/sɛnˈsɔːriəs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Quick to criticise others harshly and find fault with them.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">छिद्रान्वेषी, निंदक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">critical</span><span class="vp-tag syn">fault-finding</span><span class="vp-tag syn">disapproving</span><span class="vp-tag syn">carping</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">approving</span><span class="vp-tag ant">praising</span><span class="vp-tag ant">tolerant</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">My <b>censorious</b> aunt frowned at every dish and listed what was wrong with it. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The editor's <b>censorious</b> remarks left the young reporter afraid to submit another article.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">His <b>censorious</b> sermon condemned the whole village for its lack of discipline.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/2.png" alt="Picture for the word Censorious"></div></div></div>
    `
  },
  5: {
    questext: "Choose the word opposite in meaning to CENSORIOUS.",
    options: ["Fault-finding", "Disdainful", "Carping", "Appreciative"],
    correct: "4",
    exptext: "✅ Censorious means harshly critical; appreciative is the opposite. 📌 Censor = criticise. ❌ Carping is a synonym."
  },
  6: {
    type: "concept", icon: "🎲", accent: "#c526b1", pauseTimer: true,
    title: "Fatalist",
    html: `
      <div class="cp-vocab vp" style="--a:#c526b1;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈfeɪtəlɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who believes everything is decided by fate and cannot be changed.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">भाग्यवादी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">determinist</span><span class="vp-tag syn">predestinarian</span><span class="vp-tag syn">defeatist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">optimist</span><span class="vp-tag ant">go-getter</span><span class="vp-tag ant">achiever</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Being a <b>fatalist</b>, he never hurried and said whatever was written would happen.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>fatalist</b> farmer did not insure his crops because he trusted destiny alone. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Greek tragedies often present the <b>fatalist</b> view that no hero can escape destiny.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/3.png" alt="Picture for the word Fatalist"></div></div></div>
    `
  },
  7: {
    questext: "He accepted the failure calmly, saying \"It was meant to be\"; he is clearly a ______.",
    options: ["fatalist", "rebel", "critic", "pioneer"],
    correct: "1",
    exptext: "✅ Fatalist trusts fate over effort. 📌 Fatalist = Fate-alist. ❌ Rebel fights against the situation instead of accepting it."
  },
  8: {
    type: "concept", icon: "🍷", accent: "#31d8bc", pauseTimer: true,
    title: "Epicure",
    html: `
      <div class="cp-vocab vp" style="--a:#31d8bc;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɛpɪkjʊə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who enjoys fine food and drink and has refined taste.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">भोजन-रसिक, शौकीन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">gourmet</span><span class="vp-tag syn">foodie</span><span class="vp-tag syn">connoisseur</span><span class="vp-tag syn">gastronome</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">ascetic</span><span class="vp-tag ant">abstainer</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>epicure</b> travelled across Italy only to taste the finest truffle pasta. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">As an <b>epicure</b>, she rejected the canteen lunch and cooked a delicate meal herself.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The magazine praised the retired judge as an <b>epicure</b> with perfect taste in wine.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/4.png" alt="Picture for the word Epicure"></div></div></div>
    `
  },
  9: {
    questext: "Find the odd one out.",
    options: ["Epicure", "Gourmet", "Ascetic", "Gastronome"],
    correct: "3",
    exptext: "✅ Ascetic avoids pleasures; the rest love fine food. 📌 Epicure = Eat + cure for hunger in style. ❌ Gastronome is a food lover."
  },
  10: {
    type: "concept", icon: "🍽️", accent: "#dd9a4b", pauseTimer: true,
    title: "Gourmet",
    html: `
      <div class="cp-vocab vp" style="--a:#dd9a4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɡʊəmeɪ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who knows a lot about good food and enjoys eating it.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">भोजन-पारखी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">epicure</span><span class="vp-tag syn">foodie</span><span class="vp-tag syn">connoisseur</span><span class="vp-tag syn">bon vivant</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">abstainer</span><span class="vp-tag ant">ascetic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>gourmet</b> tasted the soup once and named every spice hidden inside it. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A famous <b>gourmet</b> reviewed the new restaurant for the weekend newspaper.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Our guest, a true <b>gourmet</b>, praised the chef's sauce as perfectly balanced.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/5.png" alt="Picture for the word Gourmet"></div></div></div>
    `
  },
  11: {
    questext: "Which word means \"खाने का पारखी\"?",
    options: ["Ascetic", "Gourmet", "Cynic", "Miser"],
    correct: "2",
    exptext: "✅ Gourmet is a judge of fine food. 📌 Gourmet = Good + met (tasted). ❌ Ascetic avoids pleasure; miser hoards money."
  },
  12: {
    type: "concept", icon: "🏔️", accent: "#4d26c5", pauseTimer: true,
    title: "Misanthrope",
    html: `
      <div class="cp-vocab vp" style="--a:#4d26c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈmɪsənθrəʊp/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who dislikes and avoids other people and society.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मानवद्वेषी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">hermit</span><span class="vp-tag syn">loner</span><span class="vp-tag syn">recluse</span><span class="vp-tag syn">man-hater</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">philanthropist</span><span class="vp-tag ant">humanitarian</span><span class="vp-tag ant">altruist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>misanthrope</b> lived alone on the hill and never answered the village's greetings. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">After years of betrayal, the once-friendly teacher turned into a <b>misanthrope</b>.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Molière's famous play shows a <b>misanthrope</b> who hates the hypocrisy of polite society.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/6.png" alt="Picture for the word Misanthrope"></div></div></div>
    `
  },
  13: {
    questext: "Which sentence uses \"misanthrope\" correctly?",
    options: ["The misanthrope donated generously and loved every crowded festival.", "A misanthrope enjoys hosting big parties for neighbours every weekend.", "The misanthrope was famous for hugging every stranger he met.", "The misanthrope avoided gatherings and rarely spoke to anyone."],
    correct: "4",
    exptext: "✅ A misanthrope dislikes people, so he avoids gatherings. 📌 Mis = hate, anthropos = man. ❌ The others describe people-lovers."
  },
  14: {
    type: "concept", icon: "🙉", accent: "#38d831", pauseTimer: true,
    title: "Misologist",
    html: `
      <div class="cp-vocab vp" style="--a:#38d831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/mɪˈsɒlədʒɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who hates reasoning, argument or debate.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">तर्क-द्वेषी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">obscurantist</span><span class="vp-tag syn">anti-intellectual</span><span class="vp-tag syn">irrationalist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">rationalist</span><span class="vp-tag ant">logician</span><span class="vp-tag ant">debater</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>misologist</b> refused every debate and walked out whenever anyone asked for proof. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Only a <b>misologist</b> would dismiss clear evidence simply because it needed careful thinking.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The philosopher warned that failed arguments can turn a thinker into a <b>misologist</b>.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/7.png" alt="Picture for the word Misologist"></div></div></div>
    `
  },
  15: {
    questext: "Which is NOT a synonym of MISOLOGIST?",
    options: ["Rationalist", "Obscurantist", "Irrationalist", "Anti-intellectual"],
    correct: "1",
    exptext: "✅ A rationalist loves reason, the opposite of a misologist. 📌 Miso = hate, logos = reason. ❌ Irrationalist rejects reason, so it fits."
  },
  16: {
    type: "concept", icon: "🧩", accent: "#dd4b7c", pauseTimer: true,
    title: "Enigma",
    html: `
      <div class="cp-vocab vp" style="--a:#dd4b7c;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɪˈnɪɡmə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person or thing that is mysterious and very difficult to understand.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पहेली, रहस्य</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">puzzle</span><span class="vp-tag syn">riddle</span><span class="vp-tag syn">mystery</span><span class="vp-tag syn">conundrum</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">clarity</span><span class="vp-tag ant">solution</span><span class="vp-tag ant">explanation</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The missing painting remained an <b>enigma</b> to the police for twenty years.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">To his classmates, the quiet new boy was a complete <b>enigma</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Even today, the origin of the ancient script is an <b>enigma</b> to scholars.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/8.png" alt="Picture for the word Enigma"></div></div></div>
    `
  },
  17: {
    questext: "Choose the word closest in meaning to ENIGMA.",
    options: ["Clue", "Answer", "Conundrum", "Evidence"],
    correct: "3",
    exptext: "✅ Enigma and conundrum both mean a baffling puzzle. 📌 Enigma = mystery. ❌ Clue and answer help solve a puzzle, not mean it."
  },
  18: {
    type: "concept", icon: "✨", accent: "#2689c5", pauseTimer: true,
    title: "Enchant",
    html: `
      <div class="cp-vocab vp" style="--a:#2689c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">verb</span><span translate="no" class="vp-ipa">/ɪnˈtʃɑːnt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">To fill someone with great delight or charm them completely.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मोहित करना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">charm</span><span class="vp-tag syn">captivate</span><span class="vp-tag syn">bewitch</span><span class="vp-tag syn">mesmerize</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">repel</span><span class="vp-tag ant">bore</span><span class="vp-tag ant">disillusion</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The street magician's tricks always <b>enchant</b> the children who gather around him.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Her sweet voice could <b>enchant</b> the whole audience within the first song.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In the fairy tale, the witch tried to <b>enchant</b> the prince with a magic spell. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/9.png" alt="Picture for the word Enchant"></div></div></div>
    `
  },
  19: {
    questext: "Choose the word opposite in meaning to ENCHANT.",
    options: ["Charm", "Repel", "Bewitch", "Captivate"],
    correct: "2",
    exptext: "✅ Enchant means to attract and delight; repel pushes away. 📌 En + chant = put under a song's spell. ❌ Charm is a synonym."
  },
  20: {
    type: "concept", icon: "🤯", accent: "#cad831", pauseTimer: true,
    title: "Incredible",
    html: `
      <div class="cp-vocab vp" style="--a:#cad831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪnˈkrɛdɪbl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Too strange or amazing to be believed.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अविश्वसनीय, अद्भुत</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">unbelievable</span><span class="vp-tag syn">astonishing</span><span class="vp-tag syn">amazing</span><span class="vp-tag syn">unimaginable</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">ordinary</span><span class="vp-tag ant">credible</span><span class="vp-tag ant">believable</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">He told an <b>incredible</b> story about meeting a tiger on his way to school.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The team made an <b>incredible</b> comeback, scoring three goals in the final five minutes. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The scientist rejected the <b>incredible</b> claim that the machine could create energy from nothing.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/10.png" alt="Picture for the word Incredible"></div></div></div>
    `
  },
  21: {
    questext: "The rescue was so ______ that newspapers called it a miracle.",
    options: ["ordinary", "credible", "trivial", "incredible"],
    correct: "4",
    exptext: "✅ A miracle-like rescue is hard to believe, so incredible fits. 📌 In + credible = not believable. ❌ Credible means believable."
  },
  22: {
    type: "concept", icon: "🖋️", accent: "#be4bdd", pauseTimer: true,
    title: "Indelible",
    html: `
      <div class="cp-vocab vp" style="--a:#be4bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪnˈdɛlɪbl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Impossible to remove or erase; leaving a lasting mark.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अमिट</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">permanent</span><span class="vp-tag syn">lasting</span><span class="vp-tag syn">ineradicable</span><span class="vp-tag syn">enduring</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">erasable</span><span class="vp-tag ant">temporary</span><span class="vp-tag ant">fading</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The teacher's kind words left an <b>indelible</b> mark on the young student's heart.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Voters get <b>indelible</b> ink on a finger so that nobody can vote twice. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The tragedy left an <b>indelible</b> scar on the history of the city.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/11.png" alt="Picture for the word Indelible"></div></div></div>
    `
  },
  23: {
    questext: "Find the odd one out.",
    options: ["Erasable", "Permanent", "Lasting", "Enduring"],
    correct: "1",
    exptext: "✅ Erasable can be removed; the rest mean long-lasting like indelible. 📌 In + delete = cannot be deleted. ❌ Enduring means lasting."
  },
  24: {
    type: "concept", icon: "⏳", accent: "#26c575", pauseTimer: true,
    title: "Inevitable",
    html: `
      <div class="cp-vocab vp" style="--a:#26c575;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪnˈɛvɪtəbl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Certain to happen and impossible to avoid.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अपरिहार्य</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">unavoidable</span><span class="vp-tag syn">inescapable</span><span class="vp-tag syn">certain</span><span class="vp-tag syn">destined</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">avoidable</span><span class="vp-tag ant">uncertain</span><span class="vp-tag ant">doubtful</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">With the river nearly dry, a water crisis in the village seemed <b>inevitable</b>.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Change is <b>inevitable</b>, so wise people learn to adapt rather than complain.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">After the third missed deadline, his dismissal from the job became <b>inevitable</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/12.png" alt="Picture for the word Inevitable"></div></div></div>
    `
  },
  25: {
    questext: "Which word means \"अपरिहार्य\"?",
    options: ["Incredible", "Indelible", "Inevitable", "Insolent"],
    correct: "3",
    exptext: "✅ Inevitable means cannot be avoided. 📌 In + evit(e) = cannot evade. ❌ Indelible means cannot be erased; insolent means rude."
  },
  26: {
    type: "concept", icon: "1️⃣", accent: "#d85431", pauseTimer: true,
    title: "Triskaidekaphobia",
    html: `
      <div class="cp-vocab vp" style="--a:#d85431;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌtrɪskaɪˌdɛkəˈfəʊbiə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">An extreme fear of the number thirteen.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">तेरह अंक का भय</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dread</span><span class="vp-tag syn">superstition</span><span class="vp-tag syn">fear</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Because of his <b>triskaidekaphobia</b>, the hotel owner skipped the thirteenth floor completely. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Her <b>triskaidekaphobia</b> made her cancel the flight planned for Friday the thirteenth.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Many tall buildings leave out the number thirteen because of widespread <b>triskaidekaphobia</b> among buyers.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/13.png" alt="Picture for the word Triskaidekaphobia"></div></div></div>
    `
  },
  27: {
    questext: "Triskaidekaphobia is the fear of:",
    options: ["sharp objects", "the number 13", "fire", "the number 666"],
    correct: "2",
    exptext: "✅ Tris-kai-deka means three plus ten, so thirteen. 📌 Tris + kai + deka = 3 + 10. ❌ 666 is hexakosioihexekontahexaphobia."
  },
  28: {
    type: "concept", icon: "💉", accent: "#4b57dd", pauseTimer: true,
    title: "Aichmophobia",
    html: `
      <div class="cp-vocab vp" style="--a:#4b57dd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌeɪkməˈfəʊbiə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">An extreme fear of needles or sharp pointed objects.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">नुकीली चीज़ों का भय</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dread</span><span class="vp-tag syn">terror</span><span class="vp-tag syn">horror</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>aichmophobia</b> made him faint whenever the nurse brought out an injection.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Because of <b>aichmophobia</b>, the little girl refused to hold even a sewing needle. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The dentist treated her <b>aichmophobia</b> with patience, explaining each tool before using it.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/14.png" alt="Picture for the word Aichmophobia"></div></div></div>
    `
  },
  29: {
    questext: "The fear of needles and sharp objects is called:",
    options: ["Pyrophobia", "Acrophobia", "Triskaidekaphobia", "Aichmophobia"],
    correct: "4",
    exptext: "✅ Aichme is Greek for a sharp point. 📌 Aichmo = point. ❌ Pyrophobia is fear of fire; acrophobia is fear of heights."
  },
  30: {
    type: "concept", icon: "🔥", accent: "#62c526", pauseTimer: true,
    title: "Pyrophobia",
    html: `
      <div class="cp-vocab vp" style="--a:#62c526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌpaɪrəˈfəʊbiə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">An extreme fear of fire.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">आग का भय</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fear</span><span class="vp-tag syn">dread</span><span class="vp-tag syn">terror</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Since childhood, <b>pyrophobia</b> kept him away from candles, matches and every bonfire. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Her <b>pyrophobia</b> began after a kitchen fire, and now she avoids using the stove.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Therapists use slow exposure to treat patients whose <b>pyrophobia</b> controls their daily choices.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/15.png" alt="Picture for the word Pyrophobia"></div></div></div>
    `
  },
  31: {
    questext: "A person with ______ refuses to light even a candle.",
    options: ["pyrophobia", "hydrophobia", "aichmophobia", "triskaidekaphobia"],
    correct: "1",
    exptext: "✅ Pyro means fire, so pyrophobia is fear of fire. 📌 Pyro = fire (pyre). ❌ Hydrophobia is fear of water."
  },
  32: {
    type: "concept", icon: "6️⃣", accent: "#d831a1", pauseTimer: true,
    title: "Hexakosioihexekontahexaphobia",
    html: `
      <div class="cp-vocab vp" style="--a:#d831a1;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">An extreme fear of the number 666.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">666 अंक का भय</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fear</span><span class="vp-tag syn">dread</span><span class="vp-tag syn">anxiety</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Many believe <b>hexakosioihexekontahexaphobia</b> comes from the old belief that 666 is an evil number.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">His <b>hexakosioihexekontahexaphobia</b> made him change a house number that had three sixes.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The quiz asked students to spell <b>hexakosioihexekontahexaphobia</b>, one of the longest words in English. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/16.png" alt="Picture for the word Hexakosioihexekontahexaphobia"></div></div></div>
    `
  },
  33: {
    questext: "Hexakosioihexekontahexaphobia is the fear of the number:",
    options: ["13", "7", "666", "999"],
    correct: "3",
    exptext: "✅ Hexakosioi = 600, hexekonta = 60, hexa = 6, giving 666. 📌 600 + 60 + 6. ❌ 13 belongs to triskaidekaphobia."
  },
  34: {
    type: "concept", icon: "🛍️", accent: "#4bd7dd", pauseTimer: true,
    title: "Extravagant",
    html: `
      <div class="cp-vocab vp" style="--a:#4bd7dd;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪkˈstrævəɡənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Spending much more money than is necessary or sensible.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">फिजूलखर्च</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">lavish</span><span class="vp-tag syn">wasteful</span><span class="vp-tag syn">profligate</span><span class="vp-tag syn">excessive</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">thrifty</span><span class="vp-tag ant">frugal</span><span class="vp-tag ant">economical</span><span class="vp-tag ant">sparing</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>extravagant</b> wedding, with fifty dishes and a hired band, emptied his savings.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">She felt guilty after an <b>extravagant</b> shopping spree on clothes she never wore. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The critic called the film's <b>extravagant</b> sets a waste of the producer's money.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/17.png" alt="Picture for the word Extravagant"></div></div></div>
    `
  },
  35: {
    questext: "Choose the word closest in meaning to EXTRAVAGANT.",
    options: ["Frugal", "Lavish", "Sparing", "Economical"],
    correct: "2",
    exptext: "✅ Extravagant and lavish both mean spending too freely. 📌 Extra + vagant = wandering beyond limits. ❌ Frugal and sparing mean careful."
  },
  36: {
    type: "concept", icon: "🐿️", accent: "#c59d26", pauseTimer: true,
    title: "Thrifty",
    html: `
      <div class="cp-vocab vp" style="--a:#c59d26;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈθrɪfti/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Careful with money and avoiding waste.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मितव्ययी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">frugal</span><span class="vp-tag syn">economical</span><span class="vp-tag syn">sparing</span><span class="vp-tag syn">prudent</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">extravagant</span><span class="vp-tag ant">wasteful</span><span class="vp-tag ant">lavish</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">My <b>thrifty</b> grandmother reuses every jar and never throws food away. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Being <b>thrifty</b>, he saved a small part of his salary every month for emergencies.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The council praised the <b>thrifty</b> management of the school's limited funds.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/18.png" alt="Picture for the word Thrifty"></div></div></div>
    `
  },
  37: {
    questext: "Choose the word opposite in meaning to THRIFTY.",
    options: ["Frugal", "Economical", "Prudent", "Wasteful"],
    correct: "4",
    exptext: "✅ Thrifty saves money; wasteful throws it away. 📌 Thrifty = thrives by saving. ❌ Frugal and economical are synonyms."
  },
  38: {
    type: "concept", icon: "💸", accent: "#7d31d8", pauseTimer: true,
    title: "Prodigal",
    html: `
      <div class="cp-vocab vp" style="--a:#7d31d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈprɒdɪɡl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Spending money in a careless and wasteful way.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अपव्ययी, उड़ाऊ</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">wasteful</span><span class="vp-tag syn">profligate</span><span class="vp-tag syn">lavish</span><span class="vp-tag syn">extravagant</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">frugal</span><span class="vp-tag ant">thrifty</span><span class="vp-tag ant">economical</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>prodigal</b> son wasted his father's inheritance within a year of leaving home. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The government was criticised for its <b>prodigal</b> use of public money on useless projects.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">He was <b>prodigal</b> with his time, spending whole days on games instead of study.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/19.png" alt="Picture for the word Prodigal"></div></div></div>
    `
  },
  39: {
    questext: "The ______ heir spent the family's fortune on parties within two years.",
    options: ["prodigal", "frugal", "thrifty", "prudent"],
    correct: "1",
    exptext: "✅ Spending a fortune carelessly is prodigal. 📌 Prodigal = pro-DIG-all away money. ❌ Frugal, thrifty and prudent mean careful."
  },
  40: {
    type: "concept", icon: "🤑", accent: "#4bdd63", pauseTimer: true,
    title: "Spendthrift",
    html: `
      <div class="cp-vocab vp" style="--a:#4bdd63;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈspɛndθrɪft/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who spends money carelessly and wastefully.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">खर्चीला, उड़ाऊ</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">squanderer</span><span class="vp-tag syn">waster</span><span class="vp-tag syn">profligate</span><span class="vp-tag syn">prodigal</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">miser</span><span class="vp-tag ant">saver</span><span class="vp-tag ant">skinflint</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>spendthrift</b> bought a new phone every month and borrowed money to pay rent. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Her brother is a <b>spendthrift</b>, so his salary is gone within a week.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The poet's <b>spendthrift</b> habits left him poor despite his large income.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/20.png" alt="Picture for the word Spendthrift"></div></div></div>
    `
  },
  41: {
    questext: "Which is NOT a synonym of SPENDTHRIFT?",
    options: ["Squanderer", "Profligate", "Miser", "Waster"],
    correct: "3",
    exptext: "✅ A miser hoards money, the opposite of a spendthrift. 📌 Spend + thrift gone. ❌ Squanderer, profligate and waster all waste money."
  },
  42: {
    type: "concept", icon: "🌸", accent: "#c5263a", pauseTimer: true,
    title: "Ephemeral",
    html: `
      <div class="cp-vocab vp" style="--a:#c5263a;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪˈfɛmərəl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Lasting for a very short time.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">क्षणभंगुर</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">short-lived</span><span class="vp-tag syn">fleeting</span><span class="vp-tag syn">transient</span><span class="vp-tag syn">momentary</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">permanent</span><span class="vp-tag ant">lasting</span><span class="vp-tag ant">eternal</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Morning dew is <b>ephemeral</b>, disappearing as soon as the sun rises. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Social media fame can be <b>ephemeral</b>, since people forget viral stars within weeks.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The poet described youth as an <b>ephemeral</b> flower that blooms and fades in a day.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/21.png" alt="Picture for the word Ephemeral"></div></div></div>
    `
  },
  43: {
    questext: "Which word means \"क्षणभंगुर\"?",
    options: ["Indelible", "Ephemeral", "Incessant", "Nascent"],
    correct: "2",
    exptext: "✅ Ephemeral means lasting only a short time. 📌 Ephemeral = Ephemeral fly lives one day. ❌ Indelible means permanent."
  },
  44: {
    type: "concept", icon: "🌱", accent: "#3177d8", pauseTimer: true,
    title: "Nascent",
    html: `
      <div class="cp-vocab vp" style="--a:#3177d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈneɪsnt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Just beginning to exist and starting to develop.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">उदीयमान, नवजात</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">emerging</span><span class="vp-tag syn">budding</span><span class="vp-tag syn">developing</span><span class="vp-tag syn">embryonic</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">mature</span><span class="vp-tag ant">established</span><span class="vp-tag ant">declining</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>nascent</b> startup had only three employees and a small rented room. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Scientists say the <b>nascent</b> technology may change farming in the next decade.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">A <b>nascent</b> friendship between the two rivals began at the charity match.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/22.png" alt="Picture for the word Nascent"></div></div></div>
    `
  },
  45: {
    questext: "Choose the word opposite in meaning to NASCENT.",
    options: ["Emerging", "Budding", "Developing", "Established"],
    correct: "4",
    exptext: "✅ Nascent means just born; established means long set up. 📌 Nascent = natal (birth). ❌ Emerging and budding are synonyms."
  },
  46: {
    type: "concept", icon: "🌧️", accent: "#b3dd4b", pauseTimer: true,
    title: "Incessant",
    html: `
      <div class="cp-vocab vp" style="--a:#b3dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪnˈsɛsnt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Continuing without a stop, often in an annoying way.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">लगातार, अनवरत</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">constant</span><span class="vp-tag syn">continual</span><span class="vp-tag syn">ceaseless</span><span class="vp-tag syn">unending</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">intermittent</span><span class="vp-tag ant">occasional</span><span class="vp-tag ant">sporadic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>incessant</b> rain flooded the streets and kept everyone indoors for a week.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">His <b>incessant</b> talking in class annoyed the teacher and distracted his friends. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The novel opens with the <b>incessant</b> tolling of a bell across the foggy moors.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/23.png" alt="Picture for the word Incessant"></div></div></div>
    `
  },
  47: {
    questext: "The ______ barking of the dog kept the whole street awake all night.",
    options: ["incessant", "occasional", "intermittent", "rare"],
    correct: "1",
    exptext: "✅ Barking all night without stopping is incessant. 📌 In + cess(ate) = never ceasing. ❌ Occasional and intermittent mean now and then."
  },
  48: {
    type: "concept", icon: "🏛️", accent: "#c526c5", pauseTimer: true,
    title: "Intransient",
    html: `
      <div class="cp-vocab vp" style="--a:#c526c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Not temporary; lasting for a very long time.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">स्थायी, अटल</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">permanent</span><span class="vp-tag syn">lasting</span><span class="vp-tag syn">enduring</span><span class="vp-tag syn">abiding</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">transient</span><span class="vp-tag ant">temporary</span><span class="vp-tag ant">fleeting</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The old temple's <b>intransient</b> stones have stood unchanged through centuries of storms. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Scientists look for <b>intransient</b> laws of nature that do not change with time.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">His <b>intransient</b> loyalty to his friends survived every quarrel and every hardship.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/24.png" alt="Picture for the word Intransient"></div></div></div>
    `
  },
  49: {
    questext: "Choose the word closest in meaning to INTRANSIENT.",
    options: ["Fleeting", "Momentary", "Lasting", "Temporary"],
    correct: "3",
    exptext: "✅ Intransient means not passing away, so lasting. 📌 In + transient = not temporary. ❌ Fleeting, momentary and temporary are its opposites."
  },
  50: {
    type: "concept", icon: "🤥", accent: "#31d8a7", pauseTimer: true,
    title: "Mendacious",
    html: `
      <div class="cp-vocab vp" style="--a:#31d8a7;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/mɛnˈdeɪʃəs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Not telling the truth; tending to lie.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">झूठा, मिथ्यावादी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">lying</span><span class="vp-tag syn">dishonest</span><span class="vp-tag syn">untruthful</span><span class="vp-tag syn">deceitful</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">truthful</span><span class="vp-tag ant">honest</span><span class="vp-tag ant">sincere</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>mendacious</b> witness changed his story three times before the judge. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>mendacious</b> advertisement promised a free car to every customer who bought soap.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Readers lost trust in the <b>mendacious</b> newspaper after it printed false claims about the flood.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/25.png" alt="Picture for the word Mendacious"></div></div></div>
    `
  },
  51: {
    questext: "Which sentence uses \"mendacious\" correctly?",
    options: ["The mendacious boy always told the truth to his teachers.", "The mendacious clerk lied about the missing files to escape blame.", "The mendacious saint was loved for his honesty.", "A mendacious report is always checked and proven true."],
    correct: "2",
    exptext: "✅ Mendacious means given to lying, so the lying clerk fits. 📌 Mendac = lie (mend a story). ❌ The others describe honest people."
  },
  52: {
    type: "concept", icon: "🗣️", accent: "#dd874b", pauseTimer: true,
    title: "Candid",
    html: `
      <div class="cp-vocab vp" style="--a:#dd874b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈkændɪd/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Honest and direct in speech, even when the truth is unpleasant.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">स्पष्टवादी, खरा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">frank</span><span class="vp-tag syn">outspoken</span><span class="vp-tag syn">forthright</span><span class="vp-tag syn">blunt</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">evasive</span><span class="vp-tag ant">secretive</span><span class="vp-tag ant">deceitful</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Be <b>candid</b> with me: did you really finish the project yourself?</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The coach gave a <b>candid</b> review of the team's poor fielding after the match. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In her <b>candid</b> memoir, the actress admitted her early mistakes without hiding anything.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/26.png" alt="Picture for the word Candid"></div></div></div>
    `
  },
  53: {
    questext: "Choose the word opposite in meaning to CANDID.",
    options: ["Frank", "Outspoken", "Forthright", "Evasive"],
    correct: "4",
    exptext: "✅ Candid means open and honest; evasive avoids the truth. 📌 Candid = white, clean, open. ❌ Frank and outspoken are synonyms."
  },
  54: {
    type: "concept", icon: "🛬", accent: "#3926c5", pauseTimer: true,
    title: "Immigrant",
    html: `
      <div class="cp-vocab vp" style="--a:#3926c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɪmɪɡrənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who comes to live permanently in a foreign country.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">आप्रवासी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">newcomer</span><span class="vp-tag syn">settler</span><span class="vp-tag syn">incomer</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">emigrant</span><span class="vp-tag ant">native</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">As an <b>immigrant</b>, she needed two years to feel at home in Canada.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The government announced new rules for every <b>immigrant</b> arriving at the airport.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The novel follows an <b>immigrant</b> who builds a new life in a strange city. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/27.png" alt="Picture for the word Immigrant"></div></div></div>
    `
  },
  55: {
    questext: "A person who comes from Nepal to settle in India is an ______.",
    options: ["immigrant", "emigrant", "native", "traveller"],
    correct: "1",
    exptext: "✅ Immigrant comes INTO a country to settle. 📌 Im = in, E = exit. ❌ Emigrant leaves his own country."
  },
  56: {
    type: "concept", icon: "🛫", accent: "#4ed831", pauseTimer: true,
    title: "Emigrant",
    html: `
      <div class="cp-vocab vp" style="--a:#4ed831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɛmɪɡrənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who leaves their own country to live in another.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">उत्प्रवासी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">migrant</span><span class="vp-tag syn">expatriate</span><span class="vp-tag syn">exile</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">immigrant</span><span class="vp-tag ant">native</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Every <b>emigrant</b> from the village sends money home to his family.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">As an <b>emigrant</b>, he left India for Australia in search of better work.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The poem captures the homesick heart of an <b>emigrant</b> watching his native shore fade away. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/28.png" alt="Picture for the word Emigrant"></div></div></div>
    `
  },
  57: {
    questext: "Which word means \"उत्प्रवासी\"?",
    options: ["Immigrant", "Native", "Emigrant", "Resident"],
    correct: "3",
    exptext: "✅ Emigrant exits his own country. 📌 E = exit. ❌ Immigrant enters a new country; native and resident stay."
  },
  58: {
    type: "concept", icon: "🌟", accent: "#dd4b8e", pauseTimer: true,
    title: "Cynosure",
    html: `
      <div class="cp-vocab vp" style="--a:#dd4b8e;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɪnəʃʊə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person or thing that is the centre of everyone's attention and admiration.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">आकर्षण का केंद्र</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">focus</span><span class="vp-tag syn">attraction</span><span class="vp-tag syn">spotlight</span><span class="vp-tag syn">centrepiece</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The bride was the <b>cynosure</b> of all eyes when she entered the hall. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">At the science fair, the robot became the <b>cynosure</b> of every visiting student.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Poets once called the North Star the <b>cynosure</b> that guides lost sailors home.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/29.png" alt="Picture for the word Cynosure"></div></div></div>
    `
  },
  59: {
    questext: "Choose the word closest in meaning to CYNOSURE.",
    options: ["Outcast", "Centre of attraction", "Burden", "Rival"],
    correct: "2",
    exptext: "✅ Cynosure is what everyone looks at with admiration. 📌 Cynosure = the guiding North Star. ❌ Outcast is ignored by everyone."
  },
  60: {
    type: "concept", icon: "🧭", accent: "#269ec5", pauseTimer: true,
    title: "Paradigm",
    html: `
      <div class="cp-vocab vp" style="--a:#269ec5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈpærədaɪm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A clear example or model that shows how something works.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">प्रतिमान, आदर्श</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">model</span><span class="vp-tag syn">pattern</span><span class="vp-tag syn">example</span><span class="vp-tag syn">template</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">exception</span><span class="vp-tag ant">anomaly</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The teacher used a simple story as a <b>paradigm</b> of honest leadership.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Online classes created a new <b>paradigm</b> for how students learn at home. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The scientist's discovery caused a shift in the old <b>paradigm</b> of physics.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/30.png" alt="Picture for the word Paradigm"></div></div></div>
    `
  },
  61: {
    questext: "Find the odd one out.",
    options: ["Model", "Pattern", "Template", "Anomaly"],
    correct: "4",
    exptext: "✅ Anomaly is an exception; the rest mean a standard model like paradigm. 📌 Paradigm = pattern. ❌ Template is a model to copy."
  },
  62: {
    type: "concept", icon: "🛴", accent: "#d8d031", pauseTimer: true,
    title: "Prototype",
    html: `
      <div class="cp-vocab vp" style="--a:#d8d031;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈprəʊtətaɪp/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The first model of something, made to test it before making more.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">प्रारूप, नमूना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">model</span><span class="vp-tag syn">original</span><span class="vp-tag syn">sample</span><span class="vp-tag syn">trial model</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">copy</span><span class="vp-tag ant">replica</span><span class="vp-tag ant">duplicate</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Engineers tested the first <b>prototype</b> of the electric scooter on a quiet road. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The company showed a <b>prototype</b> of its new phone at the technology fair.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Leonardo's sketches of a flying machine were an early <b>prototype</b> of the modern helicopter.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/31.png" alt="Picture for the word Prototype"></div></div></div>
    `
  },
  63: {
    questext: "The engineers built a working ______ before starting mass production.",
    options: ["prototype", "replica", "souvenir", "sequel"],
    correct: "1",
    exptext: "✅ A prototype is the first test model. 📌 Proto = first, type = model. ❌ A replica is a later copy."
  },
  64: {
    type: "concept", icon: "📜", accent: "#ac4bdd", pauseTimer: true,
    title: "Prolixity",
    html: `
      <div class="cp-vocab vp" style="--a:#ac4bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/prɒˈlɪksɪti/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The fault of using too many words, which makes speech or writing tiresome.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">शब्दाधिक्य</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">wordiness</span><span class="vp-tag syn">verbosity</span><span class="vp-tag syn">long-windedness</span><span class="vp-tag syn">verbiage</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">brevity</span><span class="vp-tag ant">conciseness</span><span class="vp-tag ant">terseness</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The judge criticised the lawyer's <b>prolixity</b> and asked him to reach the point. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Students lost interest because of the speaker's <b>prolixity</b> and endless repeated examples.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Critics praised the poem but found the novel spoiled by its <b>prolixity</b>.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/32.png" alt="Picture for the word Prolixity"></div></div></div>
    `
  },
  65: {
    questext: "Choose the word opposite in meaning to PROLIXITY.",
    options: ["Verbosity", "Wordiness", "Conciseness", "Long-windedness"],
    correct: "3",
    exptext: "✅ Prolixity is too many words; conciseness is few well-chosen words. 📌 Prolix = pro-long talk. ❌ Verbosity is a synonym."
  },
  66: {
    type: "concept", icon: "🤐", accent: "#26c561", pauseTimer: true,
    title: "Taciturnity",
    html: `
      <div class="cp-vocab vp" style="--a:#26c561;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌtæsɪˈtɜːnɪti/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The habit of speaking very little and staying quiet.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मितभाषिता, मौन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">reticence</span><span class="vp-tag syn">silence</span><span class="vp-tag syn">quietness</span><span class="vp-tag syn">reserve</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">talkativeness</span><span class="vp-tag ant">loquacity</span><span class="vp-tag ant">garrulity</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>taciturnity</b> puzzled the new neighbours, who never heard him say more than hello.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The detective found the witness's <b>taciturnity</b> more frustrating than any lie.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The old sailor's <b>taciturnity</b> hid a lifetime of stories he never chose to share. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/33.png" alt="Picture for the word Taciturnity"></div></div></div>
    `
  },
  67: {
    questext: "Which word means \"मितभाषिता\"?",
    options: ["Prolixity", "Taciturnity", "Verbosity", "Eloquence"],
    correct: "2",
    exptext: "✅ Taciturnity means being habitually silent. 📌 Tacit = silent. ❌ Prolixity and verbosity mean too many words."
  },
  68: {
    type: "concept", icon: "💬", accent: "#d83f31", pauseTimer: true,
    title: "Loquacious",
    html: `
      <div class="cp-vocab vp" style="--a:#d83f31;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ləˈkweɪʃəs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Talking a lot, especially in a lively and friendly way.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">वाचाल, बातूनी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">talkative</span><span class="vp-tag syn">chatty</span><span class="vp-tag syn">garrulous</span><span class="vp-tag syn">voluble</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">taciturn</span><span class="vp-tag ant">reserved</span><span class="vp-tag ant">quiet</span><span class="vp-tag ant">laconic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">My <b>loquacious</b> uncle talked for two hours without letting anyone else speak. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>loquacious</b> guide described every statue in the museum with endless stories.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The <b>loquacious</b> parrot in the poem repeats every secret the household whispers.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/34.png" alt="Picture for the word Loquacious"></div></div></div>
    `
  },
  69: {
    questext: "Choose the word closest in meaning to LOQUACIOUS.",
    options: ["Reserved", "Silent", "Laconic", "Talkative"],
    correct: "4",
    exptext: "✅ Loquacious means very talkative. 📌 Loqu = speak (eloquent, colloquial). ❌ Reserved, silent and laconic mean the opposite."
  },
  70: {
    type: "concept", icon: "🦜", accent: "#4b6add", pauseTimer: true,
    title: "Garrulous",
    html: `
      <div class="cp-vocab vp" style="--a:#4b6add;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈɡærələs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Talking too much, usually about unimportant things.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">बकवादी, वाचाल</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">chatty</span><span class="vp-tag syn">talkative</span><span class="vp-tag syn">verbose</span><span class="vp-tag syn">prattling</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">reticent</span><span class="vp-tag ant">quiet</span><span class="vp-tag ant">taciturn</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>garrulous</b> barber told me his family history while cutting my hair.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>garrulous</b> passenger on the train chatted about his village for the whole journey. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The playwright created a <b>garrulous</b> old servant who reveals every secret by accident.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/35.png" alt="Picture for the word Garrulous"></div></div></div>
    `
  },
  71: {
    questext: "Find the odd one out.",
    options: ["Reticent", "Garrulous", "Talkative", "Chatty"],
    correct: "1",
    exptext: "✅ Reticent means not speaking freely; the others mean talking a lot. 📌 Garrulous = gabbing. ❌ Chatty is a synonym."
  },
  72: {
    type: "concept", icon: "🤏", accent: "#76c526", pauseTimer: true,
    title: "Laconic",
    html: `
      <div class="cp-vocab vp" style="--a:#76c526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ləˈkɒnɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Using very few words; short and to the point.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मितभाषी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">terse</span><span class="vp-tag syn">concise</span><span class="vp-tag syn">brief</span><span class="vp-tag syn">pithy</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">verbose</span><span class="vp-tag ant">wordy</span><span class="vp-tag ant">garrulous</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>laconic</b> reply to the long question was a simple "No."</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>laconic</b> captain gave his orders in three short words and walked away. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The warriors of ancient Sparta were famous for their <b>laconic</b> speech.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/36.png" alt="Picture for the word Laconic"></div></div></div>
    `
  },
  73: {
    questext: "Asked about his big victory, the champion gave a ______ answer: \"Hard work.\"",
    options: ["verbose", "garrulous", "laconic", "loquacious"],
    correct: "3",
    exptext: "✅ A two-word answer is laconic. 📌 Laconia (Sparta) = few words. ❌ Verbose, garrulous and loquacious mean talkative."
  },
  74: {
    type: "concept", icon: "🤫", accent: "#d831b6", pauseTimer: true,
    title: "Reticence",
    html: `
      <div class="cp-vocab vp" style="--a:#d831b6;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈrɛtɪsns/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The habit of not speaking freely about one's thoughts or feelings.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">संकोच, मौन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">reserve</span><span class="vp-tag syn">silence</span><span class="vp-tag syn">restraint</span><span class="vp-tag syn">taciturnity</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">openness</span><span class="vp-tag ant">frankness</span><span class="vp-tag ant">candour</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Her <b>reticence</b> about her past made her colleagues curious about her. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The minister's <b>reticence</b> at the press meeting suggested that he was hiding something.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Out of <b>reticence</b>, the shy boy never shared his poems with anyone.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/37.png" alt="Picture for the word Reticence"></div></div></div>
    `
  },
  75: {
    questext: "Which is NOT a synonym of RETICENCE?",
    options: ["Reserve", "Candour", "Restraint", "Silence"],
    correct: "2",
    exptext: "✅ Candour is open honesty, the opposite of reticence. 📌 Reticence = keeping things reticent (retained). ❌ Reserve and restraint fit."
  },
  76: {
    type: "concept", icon: "⏱️", accent: "#4bddd0", pauseTimer: true,
    title: "Brevity",
    html: `
      <div class="cp-vocab vp" style="--a:#4bddd0;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈbrɛvɪti/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The quality of using few words or lasting a short time.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">संक्षिप्तता</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">conciseness</span><span class="vp-tag syn">shortness</span><span class="vp-tag syn">terseness</span><span class="vp-tag syn">succinctness</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">prolixity</span><span class="vp-tag ant">length</span><span class="vp-tag ant">wordiness</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Because of the time limit, the teacher asked for <b>brevity</b> in every answer.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>brevity</b> of the meeting surprised us; it ended in just ten minutes. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Shakespeare reminds us that <b>brevity</b> is the soul of wit.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/38.png" alt="Picture for the word Brevity"></div></div></div>
    `
  },
  77: {
    questext: "Which sentence uses \"brevity\" correctly?",
    options: ["The speaker's brevity bored us with its endless length.", "She wrote a brevity essay of ten thousand words.", "His brevity made the speech three hours long.", "The brevity of his speech was appreciated by the tired audience."],
    correct: "4",
    exptext: "✅ Brevity means being short, which tired listeners like. 📌 Brev = short (brief). ❌ The others link brevity with great length."
  },
  78: {
    type: "concept", icon: "✂️", accent: "#c58826", pauseTimer: true,
    title: "Abbreviate",
    html: `
      <div class="cp-vocab vp" style="--a:#c58826;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">verb</span><span translate="no" class="vp-ipa">/əˈbriːvieɪt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">To make a word or a piece of text shorter.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">संक्षिप्त करना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">shorten</span><span class="vp-tag syn">condense</span><span class="vp-tag syn">curtail</span><span class="vp-tag syn">truncate</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">lengthen</span><span class="vp-tag ant">expand</span><span class="vp-tag ant">extend</span><span class="vp-tag ant">elongate</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">We <b>abbreviate</b> Doctor as Dr. in addresses and on name boards. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Please <b>abbreviate</b> your report to one page so the manager can read it quickly.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The editor chose to <b>abbreviate</b> the long speech without changing its message.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/39.png" alt="Picture for the word Abbreviate"></div></div></div>
    `
  },
  79: {
    questext: "Choose the word opposite in meaning to ABBREVIATE.",
    options: ["Expand", "Condense", "Curtail", "Shorten"],
    correct: "1",
    exptext: "✅ Abbreviate means shorten; expand means make longer. 📌 Brev = short. ❌ Condense, curtail and shorten are synonyms."
  },
  80: {
    type: "concept", icon: "🎉", accent: "#6831d8", pauseTimer: true,
    title: "Jubilant",
    html: `
      <div class="cp-vocab vp" style="--a:#6831d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈdʒuːbɪlənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Feeling or showing great joy, especially because of success.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">उल्लसित, हर्षित</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">joyful</span><span class="vp-tag syn">triumphant</span><span class="vp-tag syn">elated</span><span class="vp-tag syn">overjoyed</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">gloomy</span><span class="vp-tag ant">sorrowful</span><span class="vp-tag ant">dejected</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>jubilant</b> fans danced in the streets after India won the final.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">She was <b>jubilant</b> when she saw her name among the successful candidates. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The <b>jubilant</b> crowd welcomed the returning heroes with flowers and songs.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/40.png" alt="Picture for the word Jubilant"></div></div></div>
    `
  },
  81: {
    questext: "The ______ team lifted the trophy and cheered loudly.",
    options: ["dejected", "gloomy", "jubilant", "sorrowful"],
    correct: "3",
    exptext: "✅ Cheering after a win shows jubilant joy. 📌 Jubilant = jubilee joy. ❌ Dejected, gloomy and sorrowful are sad."
  },
  82: {
    type: "concept", icon: "😢", accent: "#4bdd50", pauseTimer: true,
    title: "Lugubrious",
    html: `
      <div class="cp-vocab vp" style="--a:#4bdd50;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/lʊˈɡuːbriəs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Looking or sounding very sad and gloomy, often in an exaggerated way.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">शोकपूर्ण, उदास</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">mournful</span><span class="vp-tag syn">gloomy</span><span class="vp-tag syn">doleful</span><span class="vp-tag syn">melancholy</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">cheerful</span><span class="vp-tag ant">jolly</span><span class="vp-tag ant">jubilant</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>lugubrious</b> clown walked slowly with a long face and drooping shoulders. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>lugubrious</b> song played on the radio as rain fell on the empty street.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">His <b>lugubrious</b> voice at the funeral made even strangers feel sad.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/41.png" alt="Picture for the word Lugubrious"></div></div></div>
    `
  },
  83: {
    questext: "Choose the word opposite in meaning to LUGUBRIOUS.",
    options: ["Mournful", "Cheerful", "Doleful", "Gloomy"],
    correct: "2",
    exptext: "✅ Lugubrious is sad and gloomy; cheerful is its opposite. 📌 Lugubrious = looks like a long, droopy face. ❌ Mournful and doleful are synonyms."
  },
  84: {
    type: "concept", icon: "🥹", accent: "#c5264e", pauseTimer: true,
    title: "Maudlin",
    html: `
      <div class="cp-vocab vp" style="--a:#c5264e;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈmɔːdlɪn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Too emotional and sentimental, often in a silly or tearful way.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अतिभावुक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">sentimental</span><span class="vp-tag syn">tearful</span><span class="vp-tag syn">mawkish</span><span class="vp-tag syn">soppy</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">unsentimental</span><span class="vp-tag ant">stoic</span><span class="vp-tag ant">unemotional</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">After two drinks, the old friend became <b>maudlin</b> and cried about his school days. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The film was too <b>maudlin</b> for my taste, with endless tearful speeches.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">He wrote a <b>maudlin</b> letter full of regret that embarrassed everyone who read it.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/42.png" alt="Picture for the word Maudlin"></div></div></div>
    `
  },
  85: {
    questext: "Choose the word closest in meaning to MAUDLIN.",
    options: ["Cheerful", "Stoic", "Practical", "Sentimental"],
    correct: "4",
    exptext: "✅ Maudlin means over-sentimental and tearful. 📌 Maudlin comes from Magdalene, shown weeping. ❌ Stoic hides emotion."
  },
  86: {
    type: "concept", icon: "😏", accent: "#318cd8", pauseTimer: true,
    title: "Sardonic",
    html: `
      <div class="cp-vocab vp" style="--a:#318cd8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/sɑːˈdɒnɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Mocking in a bitter, scornful way.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">व्यंग्यात्मक, कटु</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">mocking</span><span class="vp-tag syn">sarcastic</span><span class="vp-tag syn">scornful</span><span class="vp-tag syn">cynical</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">sincere</span><span class="vp-tag ant">respectful</span><span class="vp-tag ant">kind</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">He gave a <b>sardonic</b> smile when the manager praised the useless new plan. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The comedian's <b>sardonic</b> jokes about politicians made the audience laugh and wince.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her <b>sardonic</b> reply, "How wonderful, another meeting," showed her boredom.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/43.png" alt="Picture for the word Sardonic"></div></div></div>
    `
  },
  87: {
    questext: "Which is NOT a synonym of SARDONIC?",
    options: ["Sincere", "Mocking", "Sarcastic", "Scornful"],
    correct: "1",
    exptext: "✅ Sincere is honest and kind, the opposite of sardonic. 📌 Sardonic = sour sarcasm. ❌ Mocking, sarcastic and scornful fit."
  },
  88: {
    type: "concept", icon: "🔇", accent: "#c5dd4b", pauseTimer: true,
    title: "Aphonia",
    html: `
      <div class="cp-vocab vp" style="--a:#c5dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/eɪˈfəʊniə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Loss of voice; being unable to produce sound while speaking.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">स्वरलोप</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">voicelessness</span><span class="vp-tag syn">muteness</span><span class="vp-tag syn">speechlessness</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">After shouting at the match all day, he woke up with <b>aphonia</b> and could only whisper.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The singer's sudden <b>aphonia</b> forced the concert to be postponed.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Doctors say stress or a throat infection may cause temporary <b>aphonia</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/44.png" alt="Picture for the word Aphonia"></div></div></div>
    `
  },
  89: {
    questext: "Which word means \"स्वरलोप\" (loss of voice)?",
    options: ["Aphasia", "Insomnia", "Aphonia", "Narcolepsy"],
    correct: "3",
    exptext: "✅ Aphonia is loss of voice. 📌 A + phon (sound) = no sound. ❌ Aphasia is loss of language, not voice."
  },
  90: {
    type: "concept", icon: "🧠", accent: "#b026c5", pauseTimer: true,
    title: "Aphasia",
    html: `
      <div class="cp-vocab vp" style="--a:#b026c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/əˈfeɪziə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Loss of the ability to understand or use words, caused by brain damage.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">वाचाघात</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">speech loss</span><span class="vp-tag syn">dysphasia</span><span class="vp-tag syn">language disorder</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">After the stroke, the writer suffered <b>aphasia</b> and struggled to find simple words.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Speech therapy helped the patient recover slowly from <b>aphasia</b> over many months. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Doctors explained that <b>aphasia</b> damages language in the brain, not the voice itself.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/45.png" alt="Picture for the word Aphasia"></div></div></div>
    `
  },
  91: {
    questext: "Aphasia is a disorder of:",
    options: ["sleep", "language", "vision", "hearing"],
    correct: "2",
    exptext: "✅ Aphasia affects the brain's use of language. 📌 A + phasis (speech). ❌ Insomnia and narcolepsy affect sleep."
  },
  92: {
    type: "concept", icon: "🌙", accent: "#31d891", pauseTimer: true,
    title: "Insomnia",
    html: `
      <div class="cp-vocab vp" style="--a:#31d891;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɪnˈsɒmniə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Long-term difficulty in falling asleep or staying asleep.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अनिद्रा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">sleeplessness</span><span class="vp-tag syn">wakefulness</span><span class="vp-tag syn">restlessness</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">sleep</span><span class="vp-tag ant">slumber</span><span class="vp-tag ant">drowsiness</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Worry about exams gave him <b>insomnia</b>, and he lay awake until sunrise. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Doctors advise less phone use at night to reduce <b>insomnia</b>.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The poet's <b>insomnia</b> filled his lonely nights with strange and restless thoughts.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/46.png" alt="Picture for the word Insomnia"></div></div></div>
    `
  },
  93: {
    questext: "Unable to sleep for many nights, the clerk visited a doctor for his ______.",
    options: ["narcolepsy", "somnolence", "aphasia", "insomnia"],
    correct: "4",
    exptext: "✅ Many sleepless nights mean insomnia. 📌 In + somnia = no sleep. ❌ Narcolepsy is sudden sleep; somnolence is drowsiness."
  },
  94: {
    type: "concept", icon: "😴", accent: "#dd754b", pauseTimer: true,
    title: "Narcolepsy",
    html: `
      <div class="cp-vocab vp" style="--a:#dd754b;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈnɑːkəlɛpsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A condition in which a person suddenly falls asleep during the day.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">निद्रा-रोग</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">sleep disorder</span><span class="vp-tag syn">sleep attack</span><span class="vp-tag syn">sudden sleepiness</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">insomnia</span><span class="vp-tag ant">wakefulness</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Because of <b>narcolepsy</b>, he sometimes fell asleep in the middle of a conversation.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t"><b>Narcolepsy</b> is not laziness; it is a medical condition that affects sleep control in the brain. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The novel's hero suffers from <b>narcolepsy</b> and drifts into dreams at the strangest moments.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/47.png" alt="Picture for the word Narcolepsy"></div></div></div>
    `
  },
  95: {
    questext: "A person who suddenly falls asleep during the day may suffer from:",
    options: ["narcolepsy", "aphonia", "insomnia", "aphasia"],
    correct: "1",
    exptext: "✅ Sudden daytime sleep attacks are narcolepsy. 📌 Narco = sleep/numb, lepsy = seizure. ❌ Insomnia is lack of sleep."
  },
  96: {
    type: "concept", icon: "🥱", accent: "#2627c5", pauseTimer: true,
    title: "Somnolence",
    html: `
      <div class="cp-vocab vp" style="--a:#2627c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɒmnələns/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A strong feeling of sleepiness; drowsiness.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">तंद्रा, उनींदापन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">drowsiness</span><span class="vp-tag syn">sleepiness</span><span class="vp-tag syn">lethargy</span><span class="vp-tag syn">torpor</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">alertness</span><span class="vp-tag ant">wakefulness</span><span class="vp-tag ant">vigilance</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A heavy lunch brought on <b>somnolence</b>, and half the class began to nod. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The medicine causes <b>somnolence</b>, so patients should not drive after taking it.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">A warm <b>somnolence</b> settled over the village in the quiet afternoon heat.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/48.png" alt="Picture for the word Somnolence"></div></div></div>
    `
  },
  97: {
    questext: "Choose the word opposite in meaning to SOMNOLENCE.",
    options: ["Drowsiness", "Torpor", "Alertness", "Lethargy"],
    correct: "3",
    exptext: "✅ Somnolence is sleepiness; alertness is being wide awake. 📌 Somn = sleep. ❌ Drowsiness and torpor are synonyms."
  },
  98: {
    type: "concept", icon: "🚶", accent: "#63d831", pauseTimer: true,
    title: "Somnambulist",
    html: `
      <div class="cp-vocab vp" style="--a:#63d831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/sɒmˈnæmbjʊlɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who walks around while asleep.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">नींद में चलने वाला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">sleepwalker</span><span class="vp-tag syn">night walker</span><span class="vp-tag syn">noctambulist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>somnambulist</b> woke up in the garden and did not know how he got there. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Her father is a <b>somnambulist</b>, so the family locks the doors at night.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In Macbeth, Lady Macbeth appears as a <b>somnambulist</b> haunted by her guilty dreams.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/49.png" alt="Picture for the word Somnambulist"></div></div></div>
    `
  },
  99: {
    questext: "Which word means \"नींद में चलने वाला\"?",
    options: ["Insomniac", "Somnambulist", "Narcoleptic", "Hibernator"],
    correct: "2",
    exptext: "✅ A somnambulist walks in sleep. 📌 Somn = sleep, ambul = walk. ❌ An insomniac cannot sleep; a narcoleptic falls asleep suddenly."
  },
  100: {
    type: "concept", icon: "🗿", accent: "#dd4ba1", pauseTimer: true,
    title: "Stolid",
    html: `
      <div class="cp-vocab vp" style="--a:#dd4ba1;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈstɒlɪd/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Calm and showing little emotion; hard to excite or upset.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">निर्विकार, भावशून्य</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">impassive</span><span class="vp-tag syn">unemotional</span><span class="vp-tag syn">phlegmatic</span><span class="vp-tag syn">stoical</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">excitable</span><span class="vp-tag ant">emotional</span><span class="vp-tag ant">sensitive</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>stolid</b> guard stood without a smile, no matter how the tourists teased him. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Even after the shocking news, the <b>stolid</b> farmer simply nodded and went on working.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The author portrays his hero as a <b>stolid</b> man who never shows pain or joy.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/50.png" alt="Picture for the word Stolid"></div></div></div>
    `
  },
  101: {
    questext: "Choose the word closest in meaning to STOLID.",
    options: ["Excitable", "Emotional", "Sensitive", "Impassive"],
    correct: "4",
    exptext: "✅ Stolid and impassive both mean showing no emotion. 📌 Stolid = stone-like. ❌ Excitable and emotional are opposites."
  },
  102: {
    type: "concept", icon: "🧱", accent: "#26b2c5", pauseTimer: true,
    title: "Obtuse",
    html: `
      <div class="cp-vocab vp" style="--a:#26b2c5;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/əbˈtjuːs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Slow to understand; not quick or sharp in thinking.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मंदबुद्धि, कुंद</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dull</span><span class="vp-tag syn">dense</span><span class="vp-tag syn">slow</span><span class="vp-tag syn">thick-headed</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">sharp</span><span class="vp-tag ant">intelligent</span><span class="vp-tag ant">perceptive</span><span class="vp-tag ant">astute</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">He was too <b>obtuse</b> to see that everyone wanted him to stop talking.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The teacher explained the sum five times, but the <b>obtuse</b> student still looked confused. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Do not be so <b>obtuse</b>; the hints in the letter clearly point to the thief.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/51.png" alt="Picture for the word Obtuse"></div></div></div>
    `
  },
  103: {
    questext: "Choose the word opposite in meaning to OBTUSE.",
    options: ["Astute", "Dense", "Dull", "Slow"],
    correct: "1",
    exptext: "✅ Obtuse means slow-witted; astute means sharp and clever. 📌 Obtuse angle = blunt, not sharp. ❌ Dense and dull are synonyms."
  },
  104: {
    type: "concept", icon: "🔍", accent: "#d8bb31", pauseTimer: true,
    title: "Perspicacious",
    html: `
      <div class="cp-vocab vp" style="--a:#d8bb31;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˌpɜːspɪˈkeɪʃəs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Quick to notice and understand things; having keen insight.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कुशाग्र, तीक्ष्णबुद्धि</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">shrewd</span><span class="vp-tag syn">astute</span><span class="vp-tag syn">sharp</span><span class="vp-tag syn">discerning</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">obtuse</span><span class="vp-tag ant">dull</span><span class="vp-tag ant">naive</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>perspicacious</b> detective noticed the muddy shoe print that everyone else had ignored. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>perspicacious</b> investor saw the crisis coming and sold his shares early.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her <b>perspicacious</b> remarks showed that she understood the problem better than the experts.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/52.png" alt="Picture for the word Perspicacious"></div></div></div>
    `
  },
  105: {
    questext: "Only a ______ observer would notice such a small detail.",
    options: ["obtuse", "dull", "perspicacious", "naive"],
    correct: "3",
    exptext: "✅ Noticing tiny details shows keen insight: perspicacious. 📌 Perspicacious = Sharp mind (spy). ❌ Obtuse, dull and naive miss details."
  },
  106: {
    type: "concept", icon: "🪟", accent: "#994bdd", pauseTimer: true,
    title: "Perspicuous",
    html: `
      <div class="cp-vocab vp" style="--a:#994bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/pəˈspɪkjuəs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Clearly expressed and easy to understand.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">स्पष्ट, सुबोध</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">clear</span><span class="vp-tag syn">lucid</span><span class="vp-tag syn">plain</span><span class="vp-tag syn">transparent</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">obscure</span><span class="vp-tag ant">vague</span><span class="vp-tag ant">ambiguous</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The teacher gave a <b>perspicuous</b> explanation that every student understood at once.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A good manual must be <b>perspicuous</b>, so that anyone can follow the steps. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The judge's <b>perspicuous</b> judgment left no doubt about the final decision.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/53.png" alt="Picture for the word Perspicuous"></div></div></div>
    `
  },
  107: {
    questext: "Which word means \"clearly expressed and easy to understand\"?",
    options: ["Perspicacious", "Perspicuous", "Obtuse", "Obscure"],
    correct: "2",
    exptext: "✅ Perspicuous describes clear speech or writing. 📌 Perspicuous = see-through clear; perspicacious = sharp mind. ❌ Perspicacious describes a person's insight."
  },
  108: {
    type: "concept", icon: "🏪", accent: "#26c54c", pauseTimer: true,
    title: "Proprietor",
    html: `
      <div class="cp-vocab vp" style="--a:#26c54c;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/prəˈpraɪətə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The owner of a business, shop or property.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मालिक, स्वामी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">owner</span><span class="vp-tag syn">holder</span><span class="vp-tag syn">possessor</span><span class="vp-tag syn">landlord</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">tenant</span><span class="vp-tag ant">employee</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>proprietor</b> of the corner shop knows every customer by name. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The hotel's <b>proprietor</b> greeted the guests and showed them to their rooms.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The newspaper's <b>proprietor</b> insisted that editors must never print rumours.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/54.png" alt="Picture for the word Proprietor"></div></div></div>
    `
  },
  109: {
    questext: "Choose the word closest in meaning to PROPRIETOR.",
    options: ["Tenant", "Customer", "Employee", "Owner"],
    correct: "4",
    exptext: "✅ A proprietor owns a business. 📌 Proprietor = property owner. ❌ Tenant rents; employee works for the owner."
  },
  110: {
    type: "concept", icon: "💪", accent: "#d83139", pauseTimer: true,
    title: "Indefatigable",
    html: `
      <div class="cp-vocab vp" style="--a:#d83139;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˌɪndɪˈfætɪɡəbl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Never getting tired; working hard without rest.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अथक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">tireless</span><span class="vp-tag syn">untiring</span><span class="vp-tag syn">persistent</span><span class="vp-tag syn">energetic</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">lazy</span><span class="vp-tag ant">weary</span><span class="vp-tag ant">tired</span><span class="vp-tag ant">lethargic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>indefatigable</b> nurse worked double shifts for weeks during the flood. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Her <b>indefatigable</b> efforts helped the village build a school in one year.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The explorer's <b>indefatigable</b> spirit carried him across deserts and frozen seas.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/55.png" alt="Picture for the word Indefatigable"></div></div></div>
    `
  },
  111: {
    questext: "Which word means \"अथक\"?",
    options: ["Indefatigable", "Indelible", "Inevitable", "Incessant"],
    correct: "1",
    exptext: "✅ Indefatigable means never tiring. 📌 In + fatigue = no tiredness. ❌ Incessant means non-stop, not tireless."
  },
  112: {
    type: "concept", icon: "🛡️", accent: "#4b7ddd", pauseTimer: true,
    title: "Invincible",
    html: `
      <div class="cp-vocab vp" style="--a:#4b7ddd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪnˈvɪnsɪbl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Too strong to be defeated or beaten.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अजेय</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">unbeatable</span><span class="vp-tag syn">unconquerable</span><span class="vp-tag syn">indomitable</span><span class="vp-tag syn">invulnerable</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">weak</span><span class="vp-tag ant">beatable</span><span class="vp-tag ant">vulnerable</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>invincible</b> champion had not lost a single match in ten years. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The villagers thought the fort was <b>invincible</b> until the enemy found a secret path.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Young heroes in myths often feel <b>invincible</b> before meeting their first great failure.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/56.png" alt="Picture for the word Invincible"></div></div></div>
    `
  },
  113: {
    questext: "Choose the word opposite in meaning to INVINCIBLE.",
    options: ["Unbeatable", "Unconquerable", "Vulnerable", "Indomitable"],
    correct: "3",
    exptext: "✅ Invincible cannot be beaten; vulnerable can be hurt easily. 📌 In + vince = cannot conquer. ❌ The others are synonyms."
  },
  114: {
    type: "concept", icon: "🎯", accent: "#8ac526", pauseTimer: true,
    title: "Infallible",
    html: `
      <div class="cp-vocab vp" style="--a:#8ac526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪnˈfælɪbl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Never wrong; unable to make mistakes.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अचूक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">faultless</span><span class="vp-tag syn">unerring</span><span class="vp-tag syn">perfect</span><span class="vp-tag syn">foolproof</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">fallible</span><span class="vp-tag ant">flawed</span><span class="vp-tag ant">error-prone</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">No doctor is <b>infallible</b>, so a second opinion can sometimes save a life.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The coach trusted the captain's <b>infallible</b> sense of timing in every match. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The old priest was treated as <b>infallible</b>, and no villager dared question his word.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/57.png" alt="Picture for the word Infallible"></div></div></div>
    `
  },
  115: {
    questext: "Which is NOT a synonym of INFALLIBLE?",
    options: ["Unerring", "Fallible", "Faultless", "Foolproof"],
    correct: "2",
    exptext: "✅ Fallible means able to make mistakes, the opposite of infallible. 📌 In + fall = never falls into error. ❌ Unerring and faultless fit."
  },
  116: {
    type: "concept", icon: "🐴", accent: "#d831cb", pauseTimer: true,
    title: "Quixotic",
    html: `
      <div class="cp-vocab vp" style="--a:#d831cb;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/kwɪkˈsɒtɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Very idealistic and romantic but not practical.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अव्यावहारिक, स्वप्नदर्शी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">idealistic</span><span class="vp-tag syn">romantic</span><span class="vp-tag syn">impractical</span><span class="vp-tag syn">visionary</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">practical</span><span class="vp-tag ant">realistic</span><span class="vp-tag ant">pragmatic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>quixotic</b> plan to end hunger with one small garden amused everyone.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">She made a <b>quixotic</b> attempt to stop the bulldozers with only a placard.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Cervantes created a <b>quixotic</b> hero who fights windmills, believing them to be giants. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/58.png" alt="Picture for the word Quixotic"></div></div></div>
    `
  },
  117: {
    questext: "Choose the word opposite in meaning to QUIXOTIC.",
    options: ["Idealistic", "Romantic", "Visionary", "Pragmatic"],
    correct: "4",
    exptext: "✅ Quixotic means unrealistically idealistic; pragmatic means practical. 📌 Don Quixote fought windmills. ❌ The others are synonyms."
  },
  118: {
    type: "concept", icon: "📢", accent: "#4bddbd", pauseTimer: true,
    title: "Dogmatic",
    html: `
      <div class="cp-vocab vp" style="--a:#4bddbd;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/dɒɡˈmætɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Stating opinions as absolute truth and refusing to consider other views.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">हठधर्मी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">opinionated</span><span class="vp-tag syn">inflexible</span><span class="vp-tag syn">rigid</span><span class="vp-tag syn">doctrinaire</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">open-minded</span><span class="vp-tag ant">flexible</span><span class="vp-tag ant">tolerant</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>dogmatic</b> professor never listened to students who disagreed with his theory. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>dogmatic</b> leader often refuses advice, even when facts prove him wrong.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">His <b>dogmatic</b> speeches allowed no doubt and no discussion.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/59.png" alt="Picture for the word Dogmatic"></div></div></div>
    `
  },
  119: {
    questext: "Choose the word closest in meaning to DOGMATIC.",
    options: ["Opinionated", "Flexible", "Tolerant", "Open-minded"],
    correct: "1",
    exptext: "✅ Dogmatic people insist their opinion is the only truth. 📌 Dogma = fixed belief. ❌ Flexible, tolerant and open-minded are opposites."
  },
  120: {
    type: "concept", icon: "🎭", accent: "#c57426", pauseTimer: true,
    title: "Pseudonym",
    html: `
      <div class="cp-vocab vp" style="--a:#c57426;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsjuːdənɪm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A false name used by a writer instead of the real name.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">छद्मनाम</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">pen name</span><span class="vp-tag syn">alias</span><span class="vp-tag syn">assumed name</span><span class="vp-tag syn">nom de plume</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">real name</span><span class="vp-tag ant">birth name</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The author wrote crime novels under a <b>pseudonym</b> so readers would not know her identity.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Samuel Clemens is better known by his <b>pseudonym</b>, Mark Twain.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Many online users hide behind a <b>pseudonym</b> instead of showing their real names. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/60.png" alt="Picture for the word Pseudonym"></div></div></div>
    `
  },
  121: {
    questext: "Mary Ann Evans wrote her novels under the ______ George Eliot.",
    options: ["acronym", "homonym", "pseudonym", "patronym"],
    correct: "3",
    exptext: "✅ A false name used by a writer is a pseudonym. 📌 Pseudo = false. ❌ Patronym comes from the father's name."
  },
  122: {
    type: "concept", icon: "👨‍👦", accent: "#5331d8", pauseTimer: true,
    title: "Patronym",
    html: `
      <div class="cp-vocab vp" style="--a:#5331d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈpætrənɪm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A name taken from the name of one's father or ancestor.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पितृनाम</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">paternal name</span><span class="vp-tag syn">surname</span><span class="vp-tag syn">family name</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">matronym</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">In Iceland, a child's <b>patronym</b> comes from the father's first name.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The Russian name Ivanovich is a <b>patronym</b> meaning "son of Ivan." <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Genealogists use each <b>patronym</b> in old records to trace how families moved.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/61.png" alt="Picture for the word Patronym"></div></div></div>
    `
  },
  123: {
    questext: "Which word means \"a name formed from the father's name\"?",
    options: ["Pseudonym", "Patronym", "Acronym", "Homonym"],
    correct: "2",
    exptext: "✅ Patronym is a father-derived name. 📌 Patr = father (paternal). ❌ Pseudonym is a false name; acronym is a word from initials."
  },
  124: {
    type: "concept", icon: "🚀", accent: "#58dd4b", pauseTimer: true,
    title: "Acronym",
    html: `
      <div class="cp-vocab vp" style="--a:#58dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈækrənɪm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A word made from the first letters of other words.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">संक्षिप्ताक्षर</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">initialism</span><span class="vp-tag syn">abbreviation</span><span class="vp-tag syn">contraction</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">NASA is an <b>acronym</b> for the National Aeronautics and Space Administration. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Our teacher asked us to make an <b>acronym</b> to remember the planets in order.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">A good writer explains every <b>acronym</b> before using it in a formal report.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/62.png" alt="Picture for the word Acronym"></div></div></div>
    `
  },
  125: {
    questext: "Which of these is an acronym?",
    options: ["Mr.", "Dr.", "etc.", "UNESCO"],
    correct: "4",
    exptext: "✅ UNESCO is formed from initials and said as one word. 📌 Acro = tip (first letters). ❌ Mr., Dr. and etc. are simple abbreviations."
  },
  126: {
    type: "concept", icon: "🔁", accent: "#c52663", pauseTimer: true,
    title: "Homonym",
    html: `
      <div class="cp-vocab vp" style="--a:#c52663;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈhɒmənɪm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A word with the same spelling or sound as another but a different meaning.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">समरूप शब्द</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">homophone</span><span class="vp-tag syn">homograph</span><span class="vp-tag syn">look-alike</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">synonym</span><span class="vp-tag ant">antonym</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">"Bank" is a <b>homonym</b>, because it means a river edge and a money place.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The word "bat" is a <b>homonym</b>; it can be an animal or a cricket tool. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Poets love a <b>homonym</b>, because one word can carry two different pictures.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/63.png" alt="Picture for the word Homonym"></div></div></div>
    `
  },
  127: {
    questext: "Which pair is a homonym?",
    options: ["bat (animal) and bat (cricket)", "big and large", "hot and cold", "quick and fast"],
    correct: "1",
    exptext: "✅ Same word, two meanings: a homonym. 📌 Homo = same, onym = name. ❌ Big-large and quick-fast are synonyms; hot-cold are antonyms."
  },
  128: {
    type: "concept", icon: "👗", accent: "#31a2d8", pauseTimer: true,
    title: "Mannequin",
    html: `
      <div class="cp-vocab vp" style="--a:#31a2d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈmænɪkɪn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A model of a human body used in shops to show clothes.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पुतला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dummy</span><span class="vp-tag syn">figure</span><span class="vp-tag syn">effigy</span><span class="vp-tag syn">model</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The shop dressed a <b>mannequin</b> in a bright red saree for the festival sale. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">In the dark store, the <b>mannequin</b> looked so real that she almost greeted it.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The detective found a <b>mannequin</b> hidden behind the curtain, not the missing man.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/64.png" alt="Picture for the word Mannequin"></div></div></div>
    `
  },
  129: {
    questext: "Which word means \"कपड़े दिखाने वाला पुतला\"?",
    options: ["Sculptor", "Proprietor", "Mannequin", "Wayfarer"],
    correct: "3",
    exptext: "✅ A mannequin is the shop dummy that displays clothes. 📌 Manne-quin = little man. ❌ A sculptor carves statues; a proprietor owns the shop."
  },
  130: {
    type: "concept", icon: "🗽", accent: "#d8dd4b", pauseTimer: true,
    title: "Sculptor",
    html: `
      <div class="cp-vocab vp" style="--a:#d8dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈskʌlptə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">An artist who makes figures by carving stone, wood or metal.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मूर्तिकार</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">carver</span><span class="vp-tag syn">modeller</span><span class="vp-tag syn">artisan</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>sculptor</b> spent six months carving the horse from a single block of marble. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A young <b>sculptor</b> won the prize for her statue of a dancing girl.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Michelangelo, the great <b>sculptor</b>, said the statue already lived inside the stone.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/65.png" alt="Picture for the word Sculptor"></div></div></div>
    `
  },
  131: {
    questext: "The ______ carved the king's statue out of a block of granite.",
    options: ["mannequin", "sculptor", "proprietor", "wayfarer"],
    correct: "2",
    exptext: "✅ A sculptor carves statues from stone. 📌 Sculpt = carve. ❌ A mannequin is a shop dummy, not an artist."
  },
  132: {
    type: "concept", icon: "🏛️", accent: "#9c26c5", pauseTimer: true,
    title: "Chancery",
    html: `
      <div class="cp-vocab vp" style="--a:#9c26c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈtʃɑːnsəri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The office of an embassy, or an office that keeps official records.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दूतावास-कार्यालय, अभिलेखालय</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">registry</span><span class="vp-tag syn">archive</span><span class="vp-tag syn">record office</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The ambassador signed the visa papers in the <b>chancery</b> of the embassy. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">All old land records were kept safely in the town's <b>chancery</b>.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Dickens describes how a lawsuit could rot for years in the Court of <b>Chancery</b>.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/66.png" alt="Picture for the word Chancery"></div></div></div>
    `
  },
  133: {
    questext: "The embassy's official papers are kept in its ______.",
    options: ["orchard", "gallery", "stadium", "chancery"],
    correct: "4",
    exptext: "✅ A chancery is an embassy or records office. 📌 Chancery = chancellor's office. ❌ Orchard, gallery and stadium are unrelated places."
  },
  134: {
    type: "concept", icon: "🧳", accent: "#31d87c", pauseTimer: true,
    title: "Peripatetic",
    html: `
      <div class="cp-vocab vp" style="--a:#31d87c;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˌpɛrɪpəˈtɛtɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Travelling from place to place, never staying long in one spot.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">घुमंतू</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">wandering</span><span class="vp-tag syn">itinerant</span><span class="vp-tag syn">nomadic</span><span class="vp-tag syn">roving</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">settled</span><span class="vp-tag ant">sedentary</span><span class="vp-tag ant">stationary</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>peripatetic</b> teacher visited a different village school every week.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">His <b>peripatetic</b> life as a journalist took him to forty countries in ten years.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The <b>peripatetic</b> poet wandered through the hills with only a bag and a flute. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/67.png" alt="Picture for the word Peripatetic"></div></div></div>
    `
  },
  135: {
    questext: "Choose the word closest in meaning to PERIPATETIC.",
    options: ["Itinerant", "Settled", "Sedentary", "Stationary"],
    correct: "1",
    exptext: "✅ Peripatetic and itinerant both mean moving from place to place. 📌 Peri = around, pat = walk. ❌ Settled, sedentary and stationary mean staying put."
  },
  136: {
    type: "concept", icon: "🥾", accent: "#dd624b", pauseTimer: true,
    title: "Wayfarer",
    html: `
      <div class="cp-vocab vp" style="--a:#dd624b;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈweɪfeərə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who travels from place to place, especially on foot.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पथिक, राहगीर</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">traveller</span><span class="vp-tag syn">walker</span><span class="vp-tag syn">wanderer</span><span class="vp-tag syn">pilgrim</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">homebody</span><span class="vp-tag ant">resident</span><span class="vp-tag ant">settler</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The tired <b>wayfarer</b> rested under the banyan tree before walking on. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Every <b>wayfarer</b> on that old road was welcomed with water and a smile.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The poem describes a lonely <b>wayfarer</b> searching for a home beyond the hills.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/68.png" alt="Picture for the word Wayfarer"></div></div></div>
    `
  },
  137: {
    questext: "Which word means \"पथिक\"?",
    options: ["Proprietor", "Sculptor", "Wayfarer", "Mannequin"],
    correct: "3",
    exptext: "✅ Wayfarer is a traveller on the way. 📌 Way + fare (go) = goes on the way. ❌ The others are an owner, an artist and a dummy."
  },
  138: {
    type: "concept", icon: "💺", accent: "#263bc5", pauseTimer: true,
    title: "Sedentary",
    html: `
      <div class="cp-vocab vp" style="--a:#263bc5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈsɛdntri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Involving much sitting and very little exercise or movement.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">गतिहीन, आसीन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">inactive</span><span class="vp-tag syn">stationary</span><span class="vp-tag syn">desk-bound</span><span class="vp-tag syn">idle</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">active</span><span class="vp-tag ant">mobile</span><span class="vp-tag ant">energetic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A <b>sedentary</b> job at a desk can harm your back if you never stretch. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Doctors warn that a <b>sedentary</b> lifestyle increases the risk of heart disease.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The <b>sedentary</b> villagers rarely left their valley in all their lives.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/69.png" alt="Picture for the word Sedentary"></div></div></div>
    `
  },
  139: {
    questext: "Choose the word opposite in meaning to SEDENTARY.",
    options: ["Inactive", "Active", "Idle", "Stationary"],
    correct: "2",
    exptext: "✅ Sedentary means sitting a lot; active means moving a lot. 📌 Sedent = sit (sedate). ❌ Inactive, idle and stationary are synonyms."
  },
  140: {
    type: "concept", icon: "😠", accent: "#78d831", pauseTimer: true,
    title: "Antipathy",
    html: `
      <div class="cp-vocab vp" style="--a:#78d831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ænˈtɪpəθi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A strong feeling of dislike toward someone or something.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">विद्वेष, घृणा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">hostility</span><span class="vp-tag syn">aversion</span><span class="vp-tag syn">dislike</span><span class="vp-tag syn">hatred</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">affection</span><span class="vp-tag ant">sympathy</span><span class="vp-tag ant">liking</span><span class="vp-tag ant">fondness</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">She felt a strong <b>antipathy</b> toward people who lie without shame.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The two neighbours' <b>antipathy</b> began over a small quarrel about a fence. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">His <b>antipathy</b> to violence made him a firm believer in peaceful protest.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/70.png" alt="Picture for the word Antipathy"></div></div></div>
    `
  },
  141: {
    questext: "Choose the word closest in meaning to ANTIPATHY.",
    options: ["Affection", "Sympathy", "Fondness", "Aversion"],
    correct: "4",
    exptext: "✅ Antipathy and aversion both mean strong dislike. 📌 Anti = against, pathy = feeling. ❌ Affection, sympathy and fondness are positive."
  },
  142: {
    type: "concept", icon: "😈", accent: "#dd4bb4", pauseTimer: true,
    title: "Schadenfreude",
    html: `
      <div class="cp-vocab vp" style="--a:#dd4bb4;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈʃɑːdnfrɔɪdə/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Pleasure felt on seeing another person's bad luck or failure.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">परपीड़ा-सुख</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">gloating</span><span class="vp-tag syn">spite</span><span class="vp-tag syn">malicious joy</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">sympathy</span><span class="vp-tag ant">compassion</span><span class="vp-tag ant">empathy</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">He felt a guilty <b>schadenfreude</b> when his rival missed the final shot. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Online comments often drip with <b>schadenfreude</b> when a famous person fails in public.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The German word <b>schadenfreude</b> has no exact English match, so we borrow it.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/71.png" alt="Picture for the word Schadenfreude"></div></div></div>
    `
  },
  143: {
    questext: "Watching his boastful rival fail, Ravi felt a secret ______.",
    options: ["schadenfreude", "sympathy", "compassion", "regret"],
    correct: "1",
    exptext: "✅ Joy at another's failure is schadenfreude. 📌 Schaden = harm, freude = joy. ❌ Sympathy and compassion are kind feelings."
  },
  144: {
    type: "concept", icon: "😶", accent: "#26c5c4", pauseTimer: true,
    title: "Apathy",
    html: `
      <div class="cp-vocab vp" style="--a:#26c5c4;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈæpəθi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A lack of interest, enthusiasm or concern about anything.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">उदासीनता</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">indifference</span><span class="vp-tag syn">unconcern</span><span class="vp-tag syn">listlessness</span><span class="vp-tag syn">detachment</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">enthusiasm</span><span class="vp-tag ant">concern</span><span class="vp-tag ant">interest</span><span class="vp-tag ant">zeal</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Voter <b>apathy</b> was high, and fewer than half the people came to vote. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">His <b>apathy</b> toward studies worried his parents more than his low marks.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The poem blames the city's <b>apathy</b> for the suffering of its poorest children.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/72.png" alt="Picture for the word Apathy"></div></div></div>
    `
  },
  145: {
    questext: "Choose the word opposite in meaning to APATHY.",
    options: ["Indifference", "Unconcern", "Enthusiasm", "Detachment"],
    correct: "3",
    exptext: "✅ Apathy is no interest; enthusiasm is strong interest. 📌 A + pathy = no feeling. ❌ Indifference and unconcern are synonyms."
  },
  146: {
    type: "concept", icon: "🎓", accent: "#d8a631", pauseTimer: true,
    title: "Protégé",
    html: `
      <div class="cp-vocab vp" style="--a:#d8a631;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈprɒtəʒeɪ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A young person who is guided and helped by an experienced person.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">शिष्य, संरक्षित</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">pupil</span><span class="vp-tag syn">disciple</span><span class="vp-tag syn">ward</span><span class="vp-tag syn">student</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">mentor</span><span class="vp-tag ant">patron</span><span class="vp-tag ant">guardian</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The famous singer taught his <b>protégé</b> how to breathe and perform on stage. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">As the professor's <b>protégé</b>, she received help with her first research paper.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The old painter's <b>protégé</b> went on to win the highest prize in the country.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/73.png" alt="Picture for the word Protégé"></div></div></div>
    `
  },
  147: {
    questext: "A young person guided by a famous expert is called a:",
    options: ["mentor", "protégé", "patron", "rival"],
    correct: "2",
    exptext: "✅ The guided one is the protégé. 📌 Protégé = protected one. ❌ The mentor and patron are the guides, not the guided."
  },
  148: {
    type: "concept", icon: "🙇", accent: "#864bdd", pauseTimer: true,
    title: "Sycophant",
    html: `
      <div class="cp-vocab vp" style="--a:#864bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɪkəfænt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who flatters powerful people to gain favour.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">चापलूस</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">flatterer</span><span class="vp-tag syn">toady</span><span class="vp-tag syn">yes-man</span><span class="vp-tag syn">bootlicker</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">critic</span><span class="vp-tag ant">rebel</span><span class="vp-tag ant">truth-teller</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The minister was surrounded by <b>sycophants</b> who praised every foolish idea. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>sycophant</b> laughs loudly at the boss's jokes, even when they are not funny.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In the play, a clever <b>sycophant</b> whispers sweet lies in the king's ear.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/74.png" alt="Picture for the word Sycophant"></div></div></div>
    `
  },
  149: {
    questext: "Find the odd one out.",
    options: ["Flatterer", "Toady", "Bootlicker", "Critic"],
    correct: "4",
    exptext: "✅ A critic judges honestly; the rest flatter for favour like a sycophant. 📌 Syco = flattering fig-informer. ❌ Toady is a synonym."
  },
  150: {
    type: "concept", icon: "💝", accent: "#26c538", pauseTimer: true,
    title: "Altruist",
    html: `
      <div class="cp-vocab vp" style="--a:#26c538;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈæltruɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who cares about others and helps them without expecting anything.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">निःस्वार्थ, परोपकारी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">humanitarian</span><span class="vp-tag syn">benefactor</span><span class="vp-tag syn">do-gooder</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">egoist</span><span class="vp-tag ant">miser</span><span class="vp-tag ant">narcissist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>altruist</b> gave his entire prize money to a school for poor children.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Being an <b>altruist</b>, she worked long nights in the hospital without asking for any reward. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The poem praises the <b>altruist</b> who lights lamps for strangers and asks for no thanks.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/75.png" alt="Picture for the word Altruist"></div></div></div>
    `
  },
  151: {
    questext: "Choose the word opposite in meaning to ALTRUIST.",
    options: ["Egoist", "Humanitarian", "Benefactor", "Philanthropist"],
    correct: "1",
    exptext: "✅ An altruist thinks of others; an egoist thinks only of himself. 📌 Altru = other (alter). ❌ The rest are synonyms."
  },
  152: {
    type: "concept", icon: "🤝", accent: "#d8314f", pauseTimer: true,
    title: "Samaritan",
    html: `
      <div class="cp-vocab vp" style="--a:#d8314f;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/səˈmærɪtn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A kind person who helps strangers in trouble.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सहायक, दयालु</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">helper</span><span class="vp-tag syn">good neighbour</span><span class="vp-tag syn">benefactor</span><span class="vp-tag syn">rescuer</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">bully</span><span class="vp-tag ant">tormentor</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A good <b>Samaritan</b> stopped his car and took the injured man to the hospital. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Strangers called her a <b>Samaritan</b> after she gave her umbrella to a soaked traveller.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The story of the Good <b>Samaritan</b> teaches us to help anyone in need.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/76.png" alt="Picture for the word Samaritan"></div></div></div>
    `
  },
  153: {
    questext: "Which sentence uses \"Samaritan\" correctly?",
    options: ["The Samaritan ignored the child and walked away.", "A Samaritan robbed the passengers on the bus.", "The Samaritan carried the injured stranger to the hospital.", "The Samaritan refused to share his water with anyone."],
    correct: "3",
    exptext: "✅ A Samaritan helps strangers in need. 📌 Samaritan = Same-as-me helper. ❌ The others describe unkind acts."
  },
  154: {
    type: "concept", icon: "🎁", accent: "#4b8fdd", pauseTimer: true,
    title: "Philanthropist",
    html: `
      <div class="cp-vocab vp" style="--a:#4b8fdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/fɪˈlænθrəpɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A rich person who gives money and time to help others.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दानवीर, परोपकारी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">benefactor</span><span class="vp-tag syn">donor</span><span class="vp-tag syn">patron</span><span class="vp-tag syn">humanitarian</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">miser</span><span class="vp-tag ant">misanthrope</span><span class="vp-tag ant">skinflint</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>philanthropist</b> donated a hundred crore rupees to build a free hospital.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Every year, the <b>philanthropist</b> pays the school fees of fifty poor children.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The newspaper called the retired businessman a quiet <b>philanthropist</b> who never sought praise. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/77.png" alt="Picture for the word Philanthropist"></div></div></div>
    `
  },
  155: {
    questext: "Choose the word opposite in meaning to PHILANTHROPIST.",
    options: ["Benefactor", "Misanthrope", "Donor", "Patron"],
    correct: "2",
    exptext: "✅ A philanthropist loves mankind; a misanthrope hates people. 📌 Phil = love, anthropos = man. ❌ Benefactor, donor and patron are synonyms."
  },
  156: {
    type: "concept", icon: "🦹", accent: "#9fc526", pauseTimer: true,
    title: "Burglary",
    html: `
      <div class="cp-vocab vp" style="--a:#9fc526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈbɜːɡləri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The crime of breaking into a house or building to steal things.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सेंधमारी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">housebreaking</span><span class="vp-tag syn">break-in</span><span class="vp-tag syn">theft</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Police are investigating a <b>burglary</b> at the jewellery shop that happened last night. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A strong lock and a loud alarm can reduce the risk of <b>burglary</b>.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The thief was sentenced to three years in jail for <b>burglary</b> of three houses.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/78.png" alt="Picture for the word Burglary"></div></div></div>
    `
  },
  157: {
    questext: "Breaking into a house to steal is called:",
    options: ["pilferage", "embezzlement", "forgery", "burglary"],
    correct: "4",
    exptext: "✅ Burglary means breaking in to steal. 📌 Burg = building (borough). ❌ Pilferage is petty theft; embezzlement is misusing money entrusted to you."
  },
  158: {
    type: "concept", icon: "🧺", accent: "#cf31d8", pauseTimer: true,
    title: "Pilferage",
    html: `
      <div class="cp-vocab vp" style="--a:#cf31d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈpɪlfərɪdʒ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The stealing of small amounts or small things, usually over time.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">छोटी चोरी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">petty theft</span><span class="vp-tag syn">thieving</span><span class="vp-tag syn">stealing</span><span class="vp-tag syn">larceny</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">honesty</span><span class="vp-tag ant">integrity</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The company lost lakhs of rupees to <b>pilferage</b> by workers in the godown.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Cameras were fitted in the warehouse to stop daily <b>pilferage</b> of goods. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Small acts of <b>pilferage</b>, like taking pens from the office, still count as dishonesty.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/79.png" alt="Picture for the word Pilferage"></div></div></div>
    `
  },
  159: {
    questext: "Stealing small things regularly is called:",
    options: ["pilferage", "burglary", "forgery", "bribery"],
    correct: "1",
    exptext: "✅ Pilferage is small, repeated theft. 📌 Pilfer = pick little by little. ❌ Burglary is breaking in; bribery is paying for favours."
  },
  160: {
    type: "concept", icon: "🛍️", accent: "#4bddab", pauseTimer: true,
    title: "Window-shopping",
    html: `
      <div class="cp-vocab vp" style="--a:#4bddab;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈwɪndəʊ ˌʃɒpɪŋ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Looking at goods in shop windows without any plan to buy them.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">बिना खरीदे देखना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">browsing</span><span class="vp-tag syn">perusing</span><span class="vp-tag syn">looking around</span><span class="vp-tag syn">shop-gazing</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">buying</span><span class="vp-tag ant">purchasing</span><span class="vp-tag ant">shopping spree</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">On Sunday evenings, we enjoy <b>window-shopping</b> along the lit-up market street. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">With only a hundred rupees in his pocket, Ravi settled for <b>window-shopping</b> at the mall.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The novel's heroine spends her lonely afternoons <b>window-shopping</b> along the grand old avenue.</span></div></div></div><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_2/80.png" alt="Picture for the word Window-shopping"></div></div></div>
    `
  },
  161: {
    questext: "Which activity is window-shopping?",
    options: ["Buying clothes with a credit card", "Selling goods in a shop", "Looking at shop displays without buying anything", "Returning an unwanted gift to the store"],
    correct: "3",
    exptext: "✅ Window-shopping means looking at displays without buying. 📌 Only the eyes shop; the wallet stays shut. ❌ Buying, selling and returning goods are real transactions."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/English_Comprehension/Vocabulary/Set_2/thumbnail.png": { t: "thumb", accent: "#0ea5e9", objects: "a classic open dictionary, a fountain pen, a small magnifying glass and a few wooden letter tiles" },
  "images/English_Comprehension/Vocabulary/Set_2/1.png": { t: "fig", about: "Scene from the sentence: \"The old cynic laughed and said every politician only wants votes, never real change.\" — Show: An elderly man on a park bench rolling his eyes at a smiling politician's poster, folded newspaper in hand, grey mood.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/2.png": { t: "fig", about: "Scene from the sentence: \"My censorious aunt frowned at every dish and listed what was wrong with it.\" — Show: An aunt at a dinner table frowning and pointing a finger at a dish while the cook stands nervously beside her.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/3.png": { t: "fig", about: "Scene from the sentence: \"The fatalist farmer did not insure his crops because he trusted destiny alone.\" — Show: A farmer sitting calmly at his hut door, shrugging and sipping tea while dark storm clouds gather over wheat fields.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/4.png": { t: "fig", about: "Scene from the sentence: \"The epicure travelled across Italy only to taste the finest truffle pasta.\" — Show: A well-dressed man in an Italian restaurant savouring a plate of truffle pasta with closed eyes, wine glass nearby, warm candlelight.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/5.png": { t: "fig", about: "Scene from the sentence: \"The gourmet tasted the soup once and named every spice hidden inside it.\" — Show: A food critic at a table lifting a spoon of soup with closed eyes while a chef watches nervously from the kitchen door.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/6.png": { t: "fig", about: "Scene from the sentence: \"The misanthrope lived alone on the hill and never answered the village's greetings.\" — Show: A lone man in a hilltop cabin turning his back on a waving village crowd below, closing the curtains, gloomy mood.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/7.png": { t: "fig", about: "Scene from the sentence: \"The misologist refused every debate and walked out whenever anyone asked for proof.\" — Show: A man in a college hall angrily pushing away a stack of books and charts, covering his ears while a debate team argues.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/8.png": { t: "fig", about: "Scene from the sentence: \"To his classmates, the quiet new boy was a complete enigma.\" — Show: Classmates in a bright classroom looking curiously and puzzled at a quiet new boy sitting by the window with a closed notebook.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/9.png": { t: "fig", about: "Scene from the sentence: \"In the fairy tale, the witch tried to enchant the prince with a magic spell.\" — Show: A fairy-tale witch in a forest waving a glowing wand over a prince who stares dreamily, golden sparkles in the air.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/10.png": { t: "fig", about: "Scene from the sentence: \"The team made an incredible comeback, scoring three goals in the final five minutes.\" — Show: Cheering football fans leaping from the stands as their team scores a last-minute goal under floodlights, joy and disbelief on faces.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/11.png": { t: "fig", about: "Scene from the sentence: \"Voters get indelible ink on a finger so that nobody can vote twice.\" — Show: A voter in a polling booth having a dark ink mark applied to a finger by an official, ballot box behind.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/12.png": { t: "fig", about: "Scene from the sentence: \"After the third missed deadline, his dismissal from the job became inevitable.\" — Show: A man at an office desk beside a pile of unfinished files, a manager at the door holding an envelope, grim mood.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/13.png": { t: "fig", about: "Scene from the sentence: \"Because of his triskaidekaphobia, the hotel owner skipped the thirteenth floor completely.\" — Show: A worried hotel owner pointing at a model of a skyscraper, telling a puzzled architect to leave one floor out; calm office light.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/14.png": { t: "fig", about: "Scene from the sentence: \"Because of aichmophobia, the little girl refused to hold even a sewing needle.\" — Show: A small girl hiding behind her mother's saree in a bright room, staring wide-eyed at a sewing needle on a table.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/15.png": { t: "fig", about: "Scene from the sentence: \"Since childhood, pyrophobia kept him away from candles, matches and every bonfire.\" — Show: A boy standing far from a roaring bonfire at a village festival, eyes wide with fear, other children laughing around the flames.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/16.png": { t: "fig", about: "Scene from the sentence: \"The quiz asked students to spell hexakosioihexekontahexaphobia, one of the longest words in English.\" — Show: Students laughing and gasping as a teacher holds up a thick dictionary, one boy resting his head on the desk in despair, warm classroom.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/17.png": { t: "fig", about: "Scene from the sentence: \"She felt guilty after an extravagant shopping spree on clothes she never wore.\" — Show: A woman leaving a luxury store with arms full of shopping bags, a worried expression, her wallet nearly empty in her hand.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/18.png": { t: "fig", about: "Scene from the sentence: \"My thrifty grandmother reuses every jar and never throws food away.\" — Show: An elderly woman in a small kitchen washing and reusing glass jars, neat shelves of jars behind her, gentle smile.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/19.png": { t: "fig", about: "Scene from the sentence: \"The prodigal son wasted his father's inheritance within a year of leaving home.\" — Show: A young man at a lavish party throwing coins and notes into the air among laughing guests, his empty trunk in the corner.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/20.png": { t: "fig", about: "Scene from the sentence: \"The spendthrift bought a new phone every month and borrowed money to pay rent.\" — Show: A young man at a phone shop counter with a stack of boxed phones, an empty wallet open in his hand, a cashier smiling.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/21.png": { t: "fig", about: "Scene from the sentence: \"Morning dew is ephemeral, disappearing as soon as the sun rises.\" — Show: Close-up of dew drops on a green leaf at sunrise, sunlight turning them golden as they begin to evaporate, calm mood.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/22.png": { t: "fig", about: "Scene from the sentence: \"The nascent startup had only three employees and a small rented room.\" — Show: Three young founders working around a small table in a tiny rented room with laptops and sketches on the wall, hopeful morning light.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/23.png": { t: "fig", about: "Scene from the sentence: \"His incessant talking in class annoyed the teacher and distracted his friends.\" — Show: A teacher turning from the board toward a chatty student who keeps whispering to his neighbour, other students looking irritated.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/24.png": { t: "fig", about: "Scene from the sentence: \"The old temple's intransient stones have stood unchanged through centuries of storms.\" — Show: An ancient stone temple on a hill standing calm beneath a stormy sky, carved pillars, a lone traveller looking up at it.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/25.png": { t: "fig", about: "Scene from the sentence: \"The mendacious witness changed his story three times before the judge.\" — Show: A nervous witness in a courtroom with fingers crossed behind his back while a stern judge looks down at him.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/26.png": { t: "fig", about: "Scene from the sentence: \"The coach gave a candid review of the team's poor fielding after the match.\" — Show: A cricket coach speaking directly to a team of players on the field at dusk, hands on hips, players listening with serious faces.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/27.png": { t: "fig", about: "Scene from the sentence: \"The novel follows an immigrant who builds a new life in a strange city.\" — Show: A young woman with a suitcase stepping out of an airport into a busy foreign city, looking up with hope and nervousness.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/28.png": { t: "fig", about: "Scene from the sentence: \"The poem captures the homesick heart of an emigrant watching his native shore fade away.\" — Show: A man on a ship's deck holding a bag, looking back at a fading green coastline at sunset, sad but hopeful.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/29.png": { t: "fig", about: "Scene from the sentence: \"The bride was the cynosure of all eyes when she entered the hall.\" — Show: A bride in red entering a decorated wedding hall, all guests turning toward her with admiring faces, warm festive lights.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/30.png": { t: "fig", about: "Scene from the sentence: \"Online classes created a new paradigm for how students learn at home.\" — Show: A girl studying at home on a laptop in a cosy room, a teacher smiling on the screen, notebooks around her, evening lamp.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/31.png": { t: "fig", about: "Scene from the sentence: \"Engineers tested the first prototype of the electric scooter on a quiet road.\" — Show: Engineers in a workshop watching a handmade electric scooter prototype roll along a test track, one smiling with a clipboard.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/32.png": { t: "fig", about: "Scene from the sentence: \"The judge criticised the lawyer's prolixity and asked him to reach the point.\" — Show: A lawyer in a courtroom still talking while the stern judge checks a wristwatch and listeners yawn, papers piled high on his desk.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/33.png": { t: "fig", about: "Scene from the sentence: \"The old sailor's taciturnity hid a lifetime of stories he never chose to share.\" — Show: An old sailor sitting silently on a harbour bench with a pipe, gazing at the sea while a curious boy waits for a story.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/34.png": { t: "fig", about: "Scene from the sentence: \"My loquacious uncle talked for two hours without letting anyone else speak.\" — Show: An uncle at a family gathering talking cheerfully with waving hands while relatives politely nod and a child falls asleep.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/35.png": { t: "fig", about: "Scene from the sentence: \"A garrulous passenger on the train chatted about his village for the whole journey.\" — Show: A passenger on an Indian train chatting nonstop to a tired traveller by the window, a cup of tea in his hand.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/36.png": { t: "fig", about: "Scene from the sentence: \"The laconic captain gave his orders in three short words and walked away.\" — Show: A ship captain on deck pointing ahead with one gesture while sailors rush to follow, calm confident face, stormy sky.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/37.png": { t: "fig", about: "Scene from the sentence: \"Her reticence about her past made her colleagues curious about her.\" — Show: A woman at an office table smiling politely with lips closed while colleagues lean forward with curious faces.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/38.png": { t: "fig", about: "Scene from the sentence: \"The brevity of the meeting surprised us; it ended in just ten minutes.\" — Show: A short meeting in a modern office with people standing around a table, a manager smiling at a wall clock, everyone leaving.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/39.png": { t: "fig", about: "Scene from the sentence: \"We abbreviate Doctor as Dr. in addresses and on name boards.\" — Show: A secretary at a desk cutting a long paper strip into a short one with scissors, neat office, a relieved manager smiling.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/40.png": { t: "fig", about: "Scene from the sentence: \"She was jubilant when she saw her name among the successful candidates.\" — Show: A girl holding up her phone and jumping with raised arms in a college corridor, friends hugging her, bright joyful mood.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/41.png": { t: "fig", about: "Scene from the sentence: \"The lugubrious clown walked slowly with a long face and drooping shoulders.\" — Show: A clown with drooping shoulders and a long sad face walking alone in a circus ring under one spotlight, empty seats around.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/42.png": { t: "fig", about: "Scene from the sentence: \"After two drinks, the old friend became maudlin and cried about his school days.\" — Show: A middle-aged man at a party table, teary-eyed, holding an old photograph while friends look slightly embarrassed, warm lights.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/43.png": { t: "fig", about: "Scene from the sentence: \"He gave a sardonic smile when the manager praised the useless new plan.\" — Show: A man in an office meeting with a thin bitter half-smile and raised eyebrow while the manager presents proudly at a screen.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/44.png": { t: "fig", about: "Scene from the sentence: \"Doctors say stress or a throat infection may cause temporary aphonia.\" — Show: A doctor in a clinic examining a man's throat with a small light while the man gently holds his throat, unable to speak.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/45.png": { t: "fig", about: "Scene from the sentence: \"Speech therapy helped the patient recover slowly from aphasia over many months.\" — Show: A speech therapist in a bright clinic holding up a picture card of an apple to an elderly patient who tries to speak, encouraging smile.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/46.png": { t: "fig", about: "Scene from the sentence: \"Worry about exams gave him insomnia, and he lay awake until sunrise.\" — Show: A young man lying awake in bed at night with wide-open eyes, moonlight through the window, restless crumpled pillow.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/47.png": { t: "fig", about: "Scene from the sentence: \"Narcolepsy is not laziness; it is a medical condition that affects sleep control in the brain.\" — Show: A man dozing off suddenly at a café table mid-conversation with a coffee cup in hand, his friend looking amused.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/48.png": { t: "fig", about: "Scene from the sentence: \"A heavy lunch brought on somnolence, and half the class began to nod.\" — Show: Students in a warm classroom after lunch with heavy eyelids and nodding heads, a ceiling fan turning, the teacher noticing.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/49.png": { t: "fig", about: "Scene from the sentence: \"The somnambulist woke up in the garden and did not know how he got there.\" — Show: A man in pyjamas walking with arms stretched out and closed eyes through a moonlit garden, a startled cat nearby.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/50.png": { t: "fig", about: "Scene from the sentence: \"The stolid guard stood without a smile, no matter how the tourists teased him.\" — Show: A palace guard standing perfectly still with a blank calm face while tourists try to make him laugh around him.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/51.png": { t: "fig", about: "Scene from the sentence: \"The teacher explained the sum five times, but the obtuse student still looked confused.\" — Show: A teacher explaining at a board to a puzzled student scratching his head while other students understand, patient classroom mood.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/52.png": { t: "fig", about: "Scene from the sentence: \"The perspicacious detective noticed the muddy shoe print that everyone else had ignored.\" — Show: A detective crouching in a hallway pointing at a muddy shoe print near a door with a magnifying glass, others puzzled behind him.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/53.png": { t: "fig", about: "Scene from the sentence: \"A good manual must be perspicuous, so that anyone can follow the steps.\" — Show: A teacher at a board with a simple diagram, students nodding with understanding smiles, bright classroom.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/54.png": { t: "fig", about: "Scene from the sentence: \"The proprietor of the corner shop knows every customer by name.\" — Show: A friendly shopkeeper behind the counter of a small corner shop greeting a customer, shelves of goods behind, morning light.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/55.png": { t: "fig", about: "Scene from the sentence: \"The indefatigable nurse worked double shifts for weeks during the flood.\" — Show: A nurse in a hospital ward walking briskly with a tray at night, smiling and energetic, tired colleagues resting behind her.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/56.png": { t: "fig", about: "Scene from the sentence: \"The invincible champion had not lost a single match in ten years.\" — Show: A champion wrestler in a stadium raising a trophy with a confident smile, defeated opponents on the mat, cheering crowd.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/57.png": { t: "fig", about: "Scene from the sentence: \"The coach trusted the captain's infallible sense of timing in every match.\" — Show: A cricket captain on the field making a perfect catch while the coach nods approvingly from the boundary, bright afternoon.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/58.png": { t: "fig", about: "Scene from the sentence: \"Cervantes created a quixotic hero who fights windmills, believing them to be giants.\" — Show: An old knight in rusty armour on a thin horse charging at a tall windmill, a plump companion on a donkey watching worried.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/59.png": { t: "fig", about: "Scene from the sentence: \"The dogmatic professor never listened to students who disagreed with his theory.\" — Show: A professor in a lecture hall pointing sternly at his notes with folded arms while a student with a raised hand is ignored.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/60.png": { t: "fig", about: "Scene from the sentence: \"Many online users hide behind a pseudonym instead of showing their real names.\" — Show: A person at a laptop in a dim room wearing a plain eye mask, typing, a lamp casting golden light, mysterious mood.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/61.png": { t: "fig", about: "Scene from the sentence: \"The Russian name Ivanovich is a patronym meaning \"son of Ivan.\"\" — Show: A family around a table with an old family-tree scroll, an elder pointing to a figure for a young boy, warm indoor light.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/62.png": { t: "fig", about: "Scene from the sentence: \"NASA is an acronym for the National Aeronautics and Space Administration.\" — Show: A teacher showing excited students a space rocket model on a table, mission-control photos on the wall, bright classroom.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/63.png": { t: "fig", about: "Scene from the sentence: \"The word \"bat\" is a homonym; it can be an animal or a cricket tool.\" — Show: A cricketer holding a bat while a small flying bat swoops beside him in a park at dusk, playful mood.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/64.png": { t: "fig", about: "Scene from the sentence: \"The shop dressed a mannequin in a bright red saree for the festival sale.\" — Show: A clothing store window with a mannequin in a bright red saree, a girl outside looking at it admiringly, evening street lights.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/65.png": { t: "fig", about: "Scene from the sentence: \"The sculptor spent six months carving the horse from a single block of marble.\" — Show: A sculptor in a studio carving a marble horse with a chisel and mallet, marble dust glowing in sunbeams.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/66.png": { t: "fig", about: "Scene from the sentence: \"The ambassador signed the visa papers in the chancery of the embassy.\" — Show: A formal embassy office with an ambassador signing documents at a wooden desk, flags in the corner, a clerk waiting.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/67.png": { t: "fig", about: "Scene from the sentence: \"The peripatetic poet wandered through the hills with only a bag and a flute.\" — Show: A poet with a flute and a small bag walking along a hill path at sunrise, misty valley below, free spirit.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/68.png": { t: "fig", about: "Scene from the sentence: \"The tired wayfarer rested under the banyan tree before walking on.\" — Show: A weary traveller with a stick and bundle resting under a large banyan tree beside a dusty road, villagers offering water.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/69.png": { t: "fig", about: "Scene from the sentence: \"A sedentary job at a desk can harm your back if you never stretch.\" — Show: A man sitting for long hours at an office desk in front of a computer with a hunched back, an exercise mat unused behind him.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/70.png": { t: "fig", about: "Scene from the sentence: \"The two neighbours' antipathy began over a small quarrel about a fence.\" — Show: Two neighbours standing on either side of a garden fence with folded arms, glaring at each other, flowers and a half-broken fence.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/71.png": { t: "fig", about: "Scene from the sentence: \"He felt a guilty schadenfreude when his rival missed the final shot.\" — Show: A man in a sports crowd smirking quietly while his rival on the court holds his head after a missed basket, tense hall.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/72.png": { t: "fig", about: "Scene from the sentence: \"Voter apathy was high, and fewer than half the people came to vote.\" — Show: A man on a sofa staring blankly at a wall, ignoring a ringing phone and scattered books, dull grey room.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/73.png": { t: "fig", about: "Scene from the sentence: \"The famous singer taught his protégé how to breathe and perform on stage.\" — Show: An old painter in a studio guiding a young woman's hand on a brush at an easel, soft window light, proud smile.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/74.png": { t: "fig", about: "Scene from the sentence: \"The minister was surrounded by sycophants who praised every foolish idea.\" — Show: A man bowing and smiling excessively to a boss at a desk while holding a cup of tea, other staff rolling their eyes behind him.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/75.png": { t: "fig", about: "Scene from the sentence: \"Being an altruist, she worked long nights in the hospital without asking for any reward.\" — Show: A woman in a hospital corridor handing a warm blanket to a tired elderly patient, other patients resting, soft light.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/76.png": { t: "fig", about: "Scene from the sentence: \"A good Samaritan stopped his car and took the injured man to the hospital.\" — Show: A man stopping his car on a rainy road and helping an injured cyclist toward the back seat, hazard lights glowing.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/77.png": { t: "fig", about: "Scene from the sentence: \"The newspaper called the retired businessman a quiet philanthropist who never sought praise.\" — Show: A well-dressed elderly man at a ribbon-cutting outside a new hospital building, smiling, children and nurses applauding.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/78.png": { t: "fig", about: "Scene from the sentence: \"Police are investigating a burglary at the jewellery shop that happened last night.\" — Show: A shadowy masked thief climbing through the window of a dark house with a torch beam, moonlight, a sleeping dog nearby.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/79.png": { t: "fig", about: "Scene from the sentence: \"Cameras were fitted in the warehouse to stop daily pilferage of goods.\" — Show: A warehouse worker quietly slipping a small packet into his bag between shelves while a ceiling camera watches, dim light.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_2/80.png": { t: "fig", about: "Scene from the sentence: \"On Sunday evenings, we enjoy window-shopping along the lit-up market street.\" — Show: A young couple strolling past glowing shop windows on an evening market street, pointing at dresses and watches behind the glass, relaxed mood, no shopping bags.. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." }
});

/* CHANGE LOG
   - 'Hexakosiohexekontahexaphobia' corrected to the standard spelling 'Hexakosioihexekontahexaphobia'.
   - Spelling fixes: Jubiliant → Jubilant, Proprieter → Proprietor, Taciturnity, Patronym, Protégé.
   - Duplicates merged: 'Perspicacious' and the misspelt 'Perpicacious' are one word; 'Perspicuous' kept as a separate word. The crossed-out word 'Vera' was ignored.
   - 'Intransient' kept exactly as written (meaning 'not temporary'). Please verify you did not mean 'Intransigent' (stubborn, uncompromising).
   - Window-shopping added as word 80 (bonus idiom).
*/