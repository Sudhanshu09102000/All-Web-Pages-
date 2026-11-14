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

  /* ── find the big title of the word page that is ON SCREEN and place the button right after it ──
     Only the visible vocabulary page counts (never a question's answer options, never a hidden copy of the title). ── */
  function visible(el) {
    if (!el || !el.getClientRects || !el.getClientRects().length) return false;
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }
  function activePage() {
    var all = document.querySelectorAll(".cp-vocab"), i;
    for (i = 0; i < all.length; i++) if (visible(all[i])) return all[i];
    return null;
  }
  function wordOf(v, map) {
    var im = v.querySelector("img[alt]"), m = im && /^Picture for the word\s+(.+)$/i.exec(im.getAttribute("alt") || "");
    if (m) return m[1].trim();
    var bd = v.querySelector(".vp-t b"), t = bd && (bd.textContent || "").trim().toLowerCase();
    return t && map[t] ? map[t] : "";
  }
  var queued = false;
  function sweep() {
    if (!document.body) return;
    var map = titles(), v = activePage(), host = null, word = "";
    if (v) {
      word = wordOf(v, map);
      if (word) {
        var low = word.toLowerCase(), top = v.getBoundingClientRect().top;
        var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
        while ((n = w.nextNode())) {
          if ((n.nodeValue || "").trim().toLowerCase() !== low) continue;
          var el = n.parentElement;
          if (!el || el.closest(".cp-vocab,.cpm,[" + MARK + "],button,option,label,.cp-footer")) continue;
          if (!visible(el) || parseFloat(getComputedStyle(el).fontSize) < 22) continue;
          if (el.getBoundingClientRect().top > top) continue;          /* the title card sits above the word card */
          host = el; break;
        }
      }
    }
    var existing = document.querySelectorAll("[" + MARK + "]");
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
  try { new MutationObserver(queue).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class", "hidden"] }); } catch (e) {}
  window.addEventListener("resize", queue);
  if (typeof setInterval === "function") setInterval(queue, 700);   /* safety net: re-check where the title is */
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
    ".cp-vocab.vp .vp-frame{position:relative;align-self:stretch;aspect-ratio:16/9;width:100%;min-height:0;border-radius:1.6em;padding:0;background:none;border:0;box-shadow:none;overflow:hidden}",
    /* ── image column: picture pinned to the TOP (no empty space above it) + premium caption box below it ── */
    ".cp-vocab.vp .vp-right{display:flex;flex-direction:column;gap:.9em;align-self:start;min-width:0}",
    ".cp-vocab.vp .vp-cap{position:relative;overflow:hidden;border-radius:1.2em;padding:.95em 1.2em 1.05em 1.55em;background:linear-gradient(135deg,color-mix(in srgb,var(--a) 24%,transparent),color-mix(in srgb,var(--a) 6%,transparent) 70%);border:1px solid color-mix(in srgb,var(--a) 55%,transparent);box-shadow:inset .34em 0 0 var(--a),0 1.1em 2.2em -1.3em rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.18)}",
    ".cp-vocab.vp .vp-cap::after{content:'\\201D';position:absolute;right:.35em;bottom:-.38em;font-family:Georgia,'Times New Roman',serif;font-size:4.6em!important;line-height:1;color:var(--a);opacity:.16;pointer-events:none}",
    ".cp-vocab.vp .vp-cap-lbl{display:flex;align-items:center;gap:.55em;margin:0 0 .5em;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:var(--a)}",
    ".cp-vocab.vp .vp-cap-ico{display:inline-grid;place-items:center;width:1.9em;height:1.9em;border-radius:50%;background:linear-gradient(135deg,var(--a),color-mix(in srgb,var(--a) 65%,#000));box-shadow:0 .3em .7em -.3em var(--a)}",
    ".cp-vocab.vp .vp-cap-txt{position:relative;margin:0;font-weight:600;font-style:italic;line-height:1.5}",
    ".cp-vocab.vp .vp-cap-txt b{font-style:normal;font-weight:800;padding:0 .3em;border-radius:.4em;background:color-mix(in srgb,var(--a) 30%,transparent)}",
    ".cp-vocab.vp[data-tone=dark] .vp-cap-lbl{color:color-mix(in srgb,var(--a) 55%,#fff)}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-cap{background:color-mix(in srgb,var(--a) 14%,#fff)!important;border:1.5px solid #000!important;box-shadow:inset .34em 0 0 #000!important}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-cap-lbl{color:#000!important}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-cap-ico{background:var(--a)!important;border:1.5px solid #000;box-shadow:none}",
    /* ── FONT RULE: heading word = x px  →  every other text on the card = x/2 px (--hf is set by the script below) ── */
    ".cp-vocab.vp{font-size:var(--hf,calc(1em * var(--k)))!important}",
    ".cp-vocab.vp :not(.cpm):not(.cpm *):not(img):not(svg):not(svg *){font-size:1em!important}",
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
    "@media (max-width:900px){.cp-vocab.vp .vp-grid{grid-template-columns:1fr}.cp-vocab.vp .vp-right{order:-1}.cp-vocab.vp .vp-frame{min-height:0;aspect-ratio:16/9}.cp-vocab.vp .vp-two{grid-template-columns:1fr}.vp-titlecard{zoom:.8!important}}",
    "/* ═ PREMIUM MOBILE v3 (phones only): uses the full width — meaning+Hindi side by side, synonyms+antonyms side by side, IPA pinned to the right, refined cards, picture with soft ring ═ */",
    "@media (max-width:767px){",
    ".vp-titlecard{zoom:.66!important;margin-bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:14px!important}",
    "#conceptBox:has(.cp-vocab.vp) .cp-scroll{padding:6px 6px 14px!important}",
    ".cp-vocab.vp .vp-grid{gap:.7em}",
    ".cp-vocab.vp .vp-left{gap:.65em}",
    ".cp-vocab.vp .vp-frame{border-radius:1.25em;margin:0 0 .1em}",
    ".cp-vocab.vp .vp-frame img{border-radius:1.25em}",
    ".cp-vocab.vp .vp-frame::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.22),inset 0 -3.2em 2.6em -2.6em rgba(0,0,0,.38)}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-meta{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:.8em;padding:.38em .5em .38em .38em!important;border-radius:999px!important;background:linear-gradient(90deg,color-mix(in srgb,var(--a) 26%,transparent),color-mix(in srgb,var(--a) 5%,transparent))!important;border:1px solid color-mix(in srgb,var(--a) 50%,transparent)!important}",
    ".cp-vocab.vp .vp-pos{font-size:.7em;padding:.38em 1.1em}",
    ".cp-vocab.vp .vp-ipa{margin-left:auto;margin-right:.55em;font-size:1em;font-weight:600;opacity:.95;letter-spacing:.03em}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-meta{background:color-mix(in srgb,var(--a) 16%,#fff)!important;border:1.5px solid #000!important}",
    ".cp-vocab.vp .vp-two{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:.6em}",
    ".cp-vocab.vp .vp-meta + .vp-two{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr)}",
    ".cp-vocab.vp .vp-def,.cp-vocab.vp .vp-pane,.cp-vocab.vp .vp-use{border-radius:1.15em}",
    ".cp-vocab.vp .vp-def{padding:.7em .75em .75em 1.05em!important;display:flex;flex-direction:column;justify-content:center}",
    ".cp-vocab.vp .vp-pane{padding:.7em .7em .8em!important}",
    ".cp-vocab.vp .vp-lbl{margin:0 0 .45em;font-size:.62em;letter-spacing:.15em}",
    ".cp-vocab.vp .vp-en,.cp-vocab.vp .vp-hi{font-size:.9em;line-height:1.3}",
    ".cp-vocab.vp .vp-tags{gap:.4em .4em}",
    ".cp-vocab.vp .vp-tag{font-size:.8em;padding:.26em .7em;line-height:1.25}",
    ".cp-vocab.vp .vp-use{padding:.75em .85em .6em!important;justify-content:flex-start}",
    ".cp-vocab.vp .vp-s{font-size:.82em;line-height:1.45;gap:.65em;padding:.55em 0}",
    ".cp-vocab.vp .vp-n{width:1.6em;height:1.6em}",
    "#conceptBox:has(.cp-vocab.vp) .cp-footer{gap:8px!important}",
    "#conceptBox:has(.cp-vocab.vp) .cp-footer button{font-size:clamp(14px,4.1vw,17px)!important;padding-top:.6em!important;padding-bottom:.6em!important;border-radius:16px!important}",
    "}",
    "/* ═ PREMIUM MOBILE v4 (phones only, PC untouched): picture + caption fused into ONE hero card on top; meaning card; Hindi in a solid accent card; synonyms / antonyms side by side with green / red tops; usage list with the picture sentence highlighted ═ */",
    "@media (max-width:767px){",
    "html :is(#conceptBox,body) .cp-vocab.vp{padding:0!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-grid{gap:.85em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-left{gap:.65em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-right{gap:0!important;border-radius:1.3em;overflow:hidden;border:1px solid color-mix(in srgb,var(--a) 55%,transparent);background:color-mix(in srgb,var(--a) 8%,transparent);box-shadow:0 1.3em 2.4em -1.5em rgba(0,0,0,.65),0 0 0 .22em color-mix(in srgb,var(--a) 14%,transparent)}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-frame{border-radius:0!important;margin:0!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-frame img{border-radius:0!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-frame::after{border-radius:0!important;box-shadow:inset 0 -3.4em 2.6em -2.6em rgba(0,0,0,.45)!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-cap{border:0!important;border-top:.22em solid var(--a)!important;border-radius:0!important;box-shadow:none!important;padding:.8em 1em .9em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-cap-lbl{margin-bottom:.4em}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-meta + .vp-two{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:.55em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-def{display:block!important;padding:.8em 1em .85em 1.3em!important;border-radius:1.1em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-en{font-weight:700;line-height:1.45}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-two > .vp-def:last-child{background:linear-gradient(135deg,var(--a),color-mix(in srgb,var(--a) 68%,#000))!important;color:var(--on)!important;border-color:transparent!important;box-shadow:0 .9em 1.6em -1.1em var(--a)!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-two > .vp-def:last-child .vp-lbl{color:var(--on)!important;opacity:.8}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-two > .vp-def:last-child .vp-hi{color:var(--on)!important;font-weight:800;line-height:1.4}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-meta + .vp-two + .vp-two{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:.55em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-pane{padding:.7em .75em .8em!important;border-radius:1.1em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-pane:has(> .vp-lbl.syn){border-top:.24em solid #16a34a!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-pane:has(> .vp-lbl.ant){border-top:.24em solid #dc2626!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp[data-tone=dark] .vp-pane:has(> .vp-lbl.syn){border-top-color:#4ade80!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp[data-tone=dark] .vp-pane:has(> .vp-lbl.ant){border-top-color:#f87171!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-tag{padding:.22em .65em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-use{padding:.8em .75em .45em!important;border-radius:1.2em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-s{padding:.6em .55em!important;border-radius:.85em;border-top:1px dashed color-mix(in srgb,var(--a) 38%,transparent)!important;gap:.65em!important;line-height:1.5!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-lbl + .vp-s{border-top:0!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-s:has(.vp-mark){background:linear-gradient(90deg,color-mix(in srgb,var(--a) 24%,transparent),color-mix(in srgb,var(--a) 6%,transparent));border-top-color:transparent!important;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--a) 50%,transparent)}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-n{width:1.75em;height:1.75em}",
    "@keyframes vpRise{from{opacity:0;transform:translateY(.8em)}to{opacity:1;transform:none}}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-right{animation:vpRise .45s cubic-bezier(.2,.7,.2,1) both}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-left > *{animation:vpRise .45s cubic-bezier(.2,.7,.2,1) both}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-left > :nth-child(1){animation-delay:.05s}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-left > :nth-child(2){animation-delay:.1s}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-left > :nth-child(3){animation-delay:.15s}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-left > :nth-child(4){animation-delay:.2s}",
    "@media (prefers-reduced-motion:reduce){html :is(#conceptBox,body) .cp-vocab.vp .vp-right,html :is(#conceptBox,body) .cp-vocab.vp .vp-left > *{animation:none!important}}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-right{border:1.5px solid #000!important;box-shadow:none!important;background:none!important}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-cap{border-top:.22em solid #000!important;background:color-mix(in srgb,var(--a) 14%,#fff)!important}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-two > .vp-def:last-child{background:var(--a)!important;color:var(--on)!important;border:1.5px solid #000!important;box-shadow:none!important}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-pane:has(> .vp-lbl.syn){border-top:.24em solid #14532d!important}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-pane:has(> .vp-lbl.ant){border-top:.24em solid #7f1d1d!important}",
    "html.lite-mode :is(#conceptBox,body) .cp-vocab.vp .vp-s:has(.vp-mark){background:color-mix(in srgb,var(--a) 22%,#fff)!important;box-shadow:inset 0 0 0 1.5px #000!important}",
    "/* ═ MOBILE FIX v5: no empty white space beside / below synonyms-antonyms ═ */",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-meta + .vp-two + .vp-two{align-items:start!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-meta + .vp-two + .vp-two:has(.vp-none){grid-template-columns:minmax(0,1fr)!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-pane:has(.vp-none){display:flex!important;flex-direction:row!important;align-items:center!important;gap:.8em!important;padding:.55em .8em!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-pane:has(.vp-none) .vp-lbl{margin:0!important;white-space:nowrap}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-pane:has(.vp-none) .vp-tags{margin:0!important;min-height:0!important}",
    "}",
    "/* ═ DESKTOP BALANCE FIX v6: the picture column always stretches to the SAME height as the text column, so there is no empty vertical gap on the right under the caption. The picture grows a little (never beyond 4:3), the caption box takes up the rest and keeps its text centred ═ */",
    "@media (min-width:901px){",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-grid{align-items:stretch!important}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-right{align-self:stretch!important;display:flex!important;flex-direction:column!important;container-type:inline-size}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-frame{align-self:stretch!important;flex:3 1 auto!important;min-height:0!important;max-height:75cqw}",
    "html :is(#conceptBox,body) .cp-vocab.vp .vp-cap{flex:2 1 auto!important;display:flex!important;flex-direction:column!important;justify-content:center!important}",
    "}"
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

  /* heading word = x px  →  all other card text = x/2 px (zoom of the shrunk title card is taken into account) */
  function applyHalf(v) {
    var tc = document.querySelector(".vp-titlecard");
    if (!tc) return;
    var z = parseFloat(getComputedStyle(tc).zoom) || 1, best = 0, els = tc.querySelectorAll("*"), i, e, j, own;
    for (i = -1; i < els.length; i++) {
      e = i < 0 ? tc : els[i];
      if (e.closest && e.closest(".spk-btn")) continue;
      own = false;
      for (j = 0; j < e.childNodes.length; j++) { if (e.childNodes[j].nodeType === 3 && e.childNodes[j].nodeValue.trim()) { own = true; break; } }
      if (!own) continue;
      var fs = parseFloat(getComputedStyle(e).fontSize) || 0;
      if (fs > best) best = fs;
    }
    if (best > 0) {
      var val = (best * z / 2).toFixed(2) + "px";
      if (v.style.getPropertyValue("--hf") !== val) v.style.setProperty("--hf", val);
    }
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
    applyHalf(v);
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
    try { applyHalf(v); } catch (e) {}
  }, 300);
  queue();
})();

/* Field: English_Comprehension · Subject: Vocabulary · Chapter: Set_3 · 80 concept pages (+ overview) · 80 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📚", accent: "#6366f1", pauseTimer: true,
    title: "Vocabulary Set 3 — Words We Will Learn Today",
    thumb: {
      image: "images/English_Comprehension/Vocabulary/Set_3/thumbnail.png",
      banner: "VOCABULARY SET 3",
      line1: "80 POWER WORDS",
      line2: "Meaning + Hindi + Picture",
      line3: "Synonyms · Antonyms · MCQs",
      badge: "SSC · UPSC · BANKING",
      ribbon: "MUST LEARN",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "80 Important English Vocabulary Words for SSC CGL | Maverick, Oligarchy, Ennui | Hindi Meaning",
      altTitles: ["SSC CGL Vocabulary Set 3: 80 Words with Pictures, Hindi Meaning, Synonyms and Antonyms", "Learn 80 Exam Vocabulary Words Fast | Orthodox, Schism, Clemency, Plutocracy | Set 3"],
      description: "Learn 80 important English vocabulary words for SSC CGL, UPSC, Banking, Railways and Defence exams, each with a simple meaning, Hindi meaning, synonyms, antonyms, three sentences, a picture and a question. Words: semiotic, immaculate, obsolete, martinet, maverick, customary, orthodox, iconoclast, conformist, bohemian, conform, placebo, palliative, anodyne, desuetude, hiatus, oblivion, interregnum, elegy, encomium, soliloquy, schism, apostasy, heresy, bigot, heretic, analgesic, sedative, tranquilizer, ennui, torpor, tedium, weary, wary, remission, reprieve, amnesty, perfidy, polymath, prodigy, dissident, tale, antediluvian, maxim, pundit, meddler, interloper, epicure, sybarite, hedonist, reveler, glutton, aesthete, connoisseur, abyss, crevasse, gorge, censure, denunciation, indictment, abeyance, dormancy, renegade, anthropology, allegory, clemency, parole, oligarchy, theocracy, autocracy, cipher, epistle, diatribe, plutocracy, meritocracy, aristocracy, rhetoric, sycophant, obdurate, ephemeral.",
      tags: ["SSC CGL vocabulary", "English vocabulary", "vocabulary set 3", "Hindi meaning", "synonyms and antonyms", "maverick meaning", "iconoclast meaning", "ennui meaning", "palliative meaning", "schism meaning", "heresy meaning", "sedative meaning", "bohemian meaning", "orthodox meaning", "vocabulary for SSC", "vocabulary for UPSC", "vocabulary for banking", "important vocabulary", "word meaning in Hindi", "MCQ practice", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "Vocab Set 3 Vocabulary class"],
      hashtags: ["#SSCCGL", "#Vocabulary", "#EnglishVocabulary", "#Synonyms", "#Antonyms"],
      thumbText: "80 POWER WORDS",
      pinnedComment: "Which word was new to you today? Comment it and revise it tomorrow!",
      communityPost: "Vocabulary Set 3 is live: 80 exam words with pictures, Hindi meaning and MCQs. Which word do you find hardest?",
      chapters: "00:00 Introduction\n01:00 Words 1-20\n25:00 Words 21-40\n50:00 Words 41-60\n75:00 Words 61-80\n95:00 Revision",
      playlist: "SSC CGL English Vocabulary"
    },
    html: `
      <p class="cp-lead">Eighty powerful words for SSC, UPSC, Banking and Railways: rebels and traditionalists, painkillers and sedatives, rulers and systems of government, pleasure-lovers, judges and punishments. Each word comes with a picture, Hindi meaning, synonyms, antonyms and a question.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>80</b><span>Words</span></div>
        <div class="cp-stat"><b>80</b><span>Questions</span></div>
        <div class="cp-stat"><b>~240 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Words 1-5</b><br>semiotic, immaculate, obsolete, martinet, maverick</li>
        <li><b>Words 6-10</b><br>customary, orthodox, iconoclast, conformist, bohemian</li>
        <li><b>Words 11-15</b><br>conform, placebo, palliative, anodyne, desuetude</li>
        <li><b>Words 16-20</b><br>hiatus, oblivion, interregnum, elegy, encomium</li>
        <li><b>Words 21-25</b><br>soliloquy, schism, apostasy, heresy, bigot</li>
        <li><b>Words 26-30</b><br>heretic, analgesic, sedative, tranquilizer, ennui</li>
        <li><b>Words 31-35</b><br>torpor, tedium, weary, wary, remission</li>
        <li><b>Words 36-40</b><br>reprieve, amnesty, perfidy, polymath, prodigy</li>
        <li><b>Words 41-45</b><br>dissident, tale, antediluvian, maxim, pundit</li>
        <li><b>Words 46-50</b><br>meddler, interloper, epicure, sybarite, hedonist</li>
        <li><b>Words 51-55</b><br>reveler, glutton, aesthete, connoisseur, abyss</li>
        <li><b>Words 56-60</b><br>crevasse, gorge, censure, denunciation, indictment</li>
        <li><b>Words 61-65</b><br>abeyance, dormancy, renegade, anthropology, allegory</li>
        <li><b>Words 66-70</b><br>clemency, parole, oligarchy, theocracy, autocracy</li>
        <li><b>Words 71-75</b><br>cipher, epistle, diatribe, plutocracy, meritocracy</li>
        <li><b>Words 76-80</b><br>aristocracy, rhetoric, sycophant, obdurate, ephemeral</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Words like maverick, iconoclast, palliative, schism, ennui, oligarchy, obdurate and ephemeral appear again and again in synonym, antonym, fill-in-the-blank and one-word-substitution questions of SSC CGL, UPSC, Banking and Railways exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🔣", accent: "#3162d8", pauseTimer: true,
    title: "Semiotic",
    html: `
      <div class="cp-vocab vp" style="--a:#3162d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˌsiːmiˈɒtɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Relating to signs and symbols and what they mean.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">प्रतीकात्मक, संकेत-संबंधी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">symbolic</span><span class="vp-tag syn">emblematic</span><span class="vp-tag syn">representative</span><span class="vp-tag syn">figurative</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">literal</span><span class="vp-tag ant">plain</span><span class="vp-tag ant">explicit</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A <b>semiotic</b> study of road signs shows how colours quickly tell drivers what to do. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The professor explained the <b>semiotic</b> meaning of the dove in the painting.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Every flag carries a <b>semiotic</b> message about the history and pride of a nation.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/1.png" alt="Picture for the word semiotic"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">A <b>semiotic</b> study of road signs shows how colours quickly tell drivers what to do.</p></div></div></div></div>
    `
  },
  3: {
    questext: "'प्रतीकात्मक' का सही अंग्रेज़ी शब्द कौन-सा है?",
    options: ["Semiotic", "Obsolete", "Orthodox", "Customary"],
    correct: "1",
    exptext: "✅ Semiotic means relating to signs and symbols. 📌 Semiotic = sign + tic. ❌ Orthodox means strictly traditional, not symbolic."
  },
  4: {
    type: "concept", icon: "✨", accent: "#a0dd4b", pauseTimer: true,
    title: "Immaculate",
    html: `
      <div class="cp-vocab vp" style="--a:#a0dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪˈmækjʊlət/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Perfectly clean, neat and without any fault.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">बेदाग, निष्कलंक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">spotless</span><span class="vp-tag syn">pristine</span><span class="vp-tag syn">flawless</span><span class="vp-tag syn">pure</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">dirty</span><span class="vp-tag ant">stained</span><span class="vp-tag ant">flawed</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The hotel room was <b>immaculate</b>, with fresh sheets and not a speck of dust. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The minister has an <b>immaculate</b> record, with no charge of corruption against him.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">She wore an <b>immaculate</b> white gown that shone under the chandelier lights.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/2.png" alt="Picture for the word immaculate"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The hotel room was <b>immaculate</b>, with fresh sheets and not a speck of dust.</p></div></div></div></div>
    `
  },
  5: {
    questext: "Choose the word OPPOSITE in meaning to IMMACULATE.",
    options: ["Spotless", "Pristine", "Stained", "Flawless"],
    correct: "3",
    exptext: "✅ Immaculate means spotless, so stained is the opposite. 📌 Im-maculate = no mark. ❌ Pristine is a synonym, not an antonym."
  },
  6: {
    type: "concept", icon: "📼", accent: "#c526b1", pauseTimer: true,
    title: "Obsolete",
    html: `
      <div class="cp-vocab vp" style="--a:#c526b1;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈɒbsəliːt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">No longer used because something newer and better exists.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अप्रचलित, पुराना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">outdated</span><span class="vp-tag syn">antiquated</span><span class="vp-tag syn">archaic</span><span class="vp-tag syn">outmoded</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">modern</span><span class="vp-tag ant">current</span><span class="vp-tag ant">latest</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Floppy disks are now <b>obsolete</b>, as everyone saves files on pen drives or clouds. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The company shut down its <b>obsolete</b> machines and installed new computers.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Many words in old poetry have become <b>obsolete</b> and appear only in dictionaries.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/3.png" alt="Picture for the word obsolete"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Floppy disks are now <b>obsolete</b>, as everyone saves files on pen drives or clouds.</p></div></div></div></div>
    `
  },
  7: {
    questext: "The old typewriter has become ____ in modern offices, as everyone uses computers.",
    options: ["fashionable", "obsolete", "immaculate", "orthodox"],
    correct: "2",
    exptext: "✅ Obsolete = no longer in use because of newer tools. 📌 Obsolete = out of date. ❌ Fashionable means currently popular, the opposite."
  },
  8: {
    type: "concept", icon: "🪖", accent: "#31d8bc", pauseTimer: true,
    title: "Martinet",
    html: `
      <div class="cp-vocab vp" style="--a:#31d8bc;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌmɑːtɪˈnet/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who forces others to follow rules very strictly.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कठोर अनुशासक, सख्त अधिकारी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">disciplinarian</span><span class="vp-tag syn">taskmaster</span><span class="vp-tag syn">stickler</span><span class="vp-tag syn">authoritarian</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">pushover</span><span class="vp-tag ant">softie</span><span class="vp-tag ant">liberal</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The coach was a <b>martinet</b> who fined players for arriving even one minute late.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Our principal is no <b>martinet</b>; she listens before she punishes anyone.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The captain, a born <b>martinet</b>, inspected every button on the soldiers' uniforms. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/4.png" alt="Picture for the word martinet"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The captain, a born <b>martinet</b>, inspected every button on the soldiers' uniforms.</p></div></div></div></div>
    `
  },
  9: {
    questext: "Which word is NOT a synonym of MARTINET?",
    options: ["Disciplinarian", "Taskmaster", "Stickler", "Pushover"],
    correct: "4",
    exptext: "✅ A pushover is easily controlled, the opposite of a martinet. 📌 Martinet = marching strictness. ❌ Taskmaster is strict, so it is a synonym."
  },
  10: {
    type: "concept", icon: "🐎", accent: "#dd9a4b", pauseTimer: true,
    title: "Maverick",
    html: `
      <div class="cp-vocab vp" style="--a:#dd9a4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈmævərɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who thinks and acts in an independent, unusual way.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">स्वतंत्र विचारक, अपरंपरागत व्यक्ति</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">nonconformist</span><span class="vp-tag syn">individualist</span><span class="vp-tag syn">rebel</span><span class="vp-tag syn">loner</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">conformist</span><span class="vp-tag ant">follower</span><span class="vp-tag ant">traditionalist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>maverick</b> chef ignored every recipe and invented dishes nobody had imagined. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>maverick</b> scientist, he challenged the accepted theory and was laughed at first.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The party leaders were annoyed by the <b>maverick</b> who voted against his own party.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/5.png" alt="Picture for the word maverick"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>maverick</b> chef ignored every recipe and invented dishes nobody had imagined.</p></div></div></div></div>
    `
  },
  11: {
    questext: "Choose the word closest in meaning to MAVERICK.",
    options: ["Nonconformist", "Follower", "Bigot", "Martinet"],
    correct: "1",
    exptext: "✅ A maverick is independent, i.e. a nonconformist. 📌 Maverick = lone unbranded calf. ❌ Follower is the opposite."
  },
  12: {
    type: "concept", icon: "🤝", accent: "#4d26c5", pauseTimer: true,
    title: "Customary",
    html: `
      <div class="cp-vocab vp" style="--a:#4d26c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈkʌstəməri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Done usually, according to the habits or traditions of a place.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">रीति-रिवाज के अनुसार, प्रचलित</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">usual</span><span class="vp-tag syn">traditional</span><span class="vp-tag syn">habitual</span><span class="vp-tag syn">routine</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">unusual</span><span class="vp-tag ant">rare</span><span class="vp-tag ant">uncommon</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">It is <b>customary</b> in India to remove shoes before entering a home. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The manager gave the <b>customary</b> speech at the end of the annual meeting.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Offering tea to guests is <b>customary</b> in most families across the country.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/6.png" alt="Picture for the word customary"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">It is <b>customary</b> in India to remove shoes before entering a home.</p></div></div></div></div>
    `
  },
  13: {
    questext: "In which sentence is CUSTOMARY used correctly?",
    options: ["A customary earthquake destroyed the whole city yesterday.", "He customary arrived late.", "It is customary to greet elders with respect.", "She bought a customary of rice."],
    correct: "3",
    exptext: "✅ Customary is an adjective meaning usual by tradition. 📌 Custom → customary. ❌ Option 1 treats a rare disaster as usual."
  },
  14: {
    type: "concept", icon: "🕉️", accent: "#38d831", pauseTimer: true,
    title: "Orthodox",
    html: `
      <div class="cp-vocab vp" style="--a:#38d831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈɔːrθədɒks/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Following the old, accepted beliefs and traditions strictly.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">रूढ़िवादी, परंपरावादी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">conventional</span><span class="vp-tag syn">traditional</span><span class="vp-tag syn">conservative</span><span class="vp-tag syn">strict</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">unorthodox</span><span class="vp-tag ant">liberal</span><span class="vp-tag ant">progressive</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>orthodox</b> family does not allow any change in the old wedding rituals. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The doctor rejected <b>orthodox</b> methods and tried a new way to treat the disease.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Critics called the film unusual because it broke every <b>orthodox</b> rule of storytelling.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/7.png" alt="Picture for the word orthodox"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">His <b>orthodox</b> family does not allow any change in the old wedding rituals.</p></div></div></div></div>
    `
  },
  15: {
    questext: "Choose the word OPPOSITE in meaning to ORTHODOX.",
    options: ["Conventional", "Progressive", "Strict", "Traditional"],
    correct: "2",
    exptext: "✅ Orthodox means strictly traditional; progressive is its opposite. 📌 Ortho = right, dox = belief. ❌ Conventional is a synonym."
  },
  16: {
    type: "concept", icon: "🔨", accent: "#dd4b7c", pauseTimer: true,
    title: "Iconoclast",
    html: `
      <div class="cp-vocab vp" style="--a:#dd4b7c;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/aɪˈkɒnəklæst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who attacks and rejects popular beliefs and traditions.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मूर्तिभंजक, परंपरा-विरोधी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">rebel</span><span class="vp-tag syn">dissenter</span><span class="vp-tag syn">radical</span><span class="vp-tag syn">nonconformist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">conformist</span><span class="vp-tag ant">traditionalist</span><span class="vp-tag ant">loyalist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The young poet, an <b>iconoclast</b>, mocked every tradition that his teachers admired.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">As an <b>iconoclast</b>, the editor printed stories that challenged powerful beliefs.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Historians remember him as an <b>iconoclast</b> who shattered the old ideas of art. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/8.png" alt="Picture for the word iconoclast"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Historians remember him as an <b>iconoclast</b> who shattered the old ideas of art.</p></div></div></div></div>
    `
  },
  17: {
    questext: "'मूर्तिभंजक, परंपरा-विरोधी व्यक्ति' के लिए सही शब्द कौन-सा है?",
    options: ["Martinet", "Conformist", "Bohemian", "Iconoclast"],
    correct: "4",
    exptext: "✅ Iconoclast = one who attacks cherished beliefs. 📌 Icon + clast = icon breaker. ❌ Conformist follows beliefs, the opposite."
  },
  18: {
    type: "concept", icon: "🐑", accent: "#2689c5", pauseTimer: true,
    title: "Conformist",
    html: `
      <div class="cp-vocab vp" style="--a:#2689c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/kənˈfɔːrmɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who follows the accepted rules and habits of society.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अनुरूपतावादी, परंपरा का अनुयायी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">traditionalist</span><span class="vp-tag syn">follower</span><span class="vp-tag syn">conventionalist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">nonconformist</span><span class="vp-tag ant">rebel</span><span class="vp-tag ant">maverick</span><span class="vp-tag ant">iconoclast</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A <b>conformist</b> at school, he wore the same style and said what others said. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The company needs creative people, not <b>conformists</b> who never question anything.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Society often rewards the <b>conformist</b> and doubts the person who thinks differently.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/9.png" alt="Picture for the word conformist"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">A <b>conformist</b> at school, he wore the same style and said what others said.</p></div></div></div></div>
    `
  },
  19: {
    questext: "Find the odd one out.",
    options: ["Conformist", "Maverick", "Iconoclast", "Rebel"],
    correct: "1",
    exptext: "✅ Maverick, iconoclast and rebel all break norms; a conformist follows them. 📌 Conformist = conforms. ❌ Rebel fits the break-the-rules group."
  },
  20: {
    type: "concept", icon: "🎨", accent: "#cad831", pauseTimer: true,
    title: "Bohemian",
    html: `
      <div class="cp-vocab vp" style="--a:#cad831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/bəʊˈhiːmiən/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Living in a free, unusual style, often as an artist.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">स्वच्छंद, कलाकार-स्वभाव का</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">unconventional</span><span class="vp-tag syn">artistic</span><span class="vp-tag syn">free-spirited</span><span class="vp-tag syn">nonconformist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">conventional</span><span class="vp-tag ant">orthodox</span><span class="vp-tag ant">conservative</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">She lived a <b>bohemian</b> life, painting by day and singing in small cafes by night. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>bohemian</b> writer ignored fixed routines and slept whenever the story arrived.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The old quarter of the city is famous for its <b>bohemian</b> artists and poets.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/10.png" alt="Picture for the word bohemian"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">She lived a <b>bohemian</b> life, painting by day and singing in small cafes by night.</p></div></div></div></div>
    `
  },
  21: {
    questext: "The ____ poet gave up a steady job to wander and write in small towns.",
    options: ["orthodox", "customary", "bohemian", "obsolete"],
    correct: "3",
    exptext: "✅ Bohemian fits a free-spirited artist leaving a steady job. 📌 Bohemian = artist's free life. ❌ Customary means following usual habits."
  },
  22: {
    type: "concept", icon: "📏", accent: "#be4bdd", pauseTimer: true,
    title: "Conform",
    html: `
      <div class="cp-vocab vp" style="--a:#be4bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">verb</span><span translate="no" class="vp-ipa">/kənˈfɔːrm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">To follow the rules, customs or standards that others follow.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अनुसरण करना, मानना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">comply</span><span class="vp-tag syn">obey</span><span class="vp-tag syn">adhere</span><span class="vp-tag syn">follow</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">rebel</span><span class="vp-tag ant">deviate</span><span class="vp-tag ant">differ</span><span class="vp-tag ant">defy</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">All students must <b>conform</b> to the school rules about uniform and timing. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Many young people <b>conform</b> to trends just to feel accepted by friends.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The building does not <b>conform</b> to the safety standards set by the government.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/11.png" alt="Picture for the word conform"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">All students must <b>conform</b> to the school rules about uniform and timing.</p></div></div></div></div>
    `
  },
  23: {
    questext: "Choose the word closest in meaning to CONFORM.",
    options: ["Deviate", "Comply", "Defy", "Resist"],
    correct: "2",
    exptext: "✅ To conform is to comply with rules. 📌 Con + form = take the same form. ❌ Deviate means to move away from rules."
  },
  24: {
    type: "concept", icon: "💊", accent: "#26c575", pauseTimer: true,
    title: "Placebo",
    html: `
      <div class="cp-vocab vp" style="--a:#26c575;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/pləˈsiːboʊ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A harmless pill with no medicine, given to test or comfort.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दिखावटी दवा, नकली औषधि</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dummy pill</span><span class="vp-tag syn">sugar pill</span><span class="vp-tag syn">inert pill</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">active drug</span><span class="vp-tag ant">real medicine</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Half the patients got the real drug and half got a <b>placebo</b> without knowing. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The patient felt better after taking a <b>placebo</b>, as he believed it was medicine.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Researchers use a <b>placebo</b> to check whether a new medicine really works.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/12.png" alt="Picture for the word placebo"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Half the patients got the real drug and half got a <b>placebo</b> without knowing.</p></div></div></div></div>
    `
  },
  25: {
    questext: "Researchers give a placebo in a medicine trial mainly to:",
    options: ["cure the disease faster", "reduce the cost of medicine", "kill germs quickly", "compare the results with the real medicine"],
    correct: "4",
    exptext: "✅ A placebo is a dummy pill used as a comparison for the real medicine. 📌 Placebo = 'I shall please'. ❌ It has no healing drug, so it cannot cure."
  },
  26: {
    type: "concept", icon: "🩹", accent: "#d85431", pauseTimer: true,
    title: "Palliative",
    html: `
      <div class="cp-vocab vp" style="--a:#d85431;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈpæliətɪv/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Giving relief from pain without curing the cause.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कष्टहारी, राहत देने वाला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">soothing</span><span class="vp-tag syn">calming</span><span class="vp-tag syn">relieving</span><span class="vp-tag syn">easing</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">aggravating</span><span class="vp-tag ant">irritating</span><span class="vp-tag ant">worsening</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The nurse gave <b>palliative</b> care to ease the old man's pain at home. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>palliative</b> measure may calm the crisis, but it cannot solve the real problem.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Rain brought only <b>palliative</b> relief to the farmers during the long drought.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/13.png" alt="Picture for the word palliative"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The nurse gave <b>palliative</b> care to ease the old man's pain at home.</p></div></div></div></div>
    `
  },
  27: {
    questext: "The government's cash gift was only a ____ step; it did not end poverty.",
    options: ["palliative", "obsolete", "customary", "orthodox"],
    correct: "1",
    exptext: "✅ Palliative = eases a problem without curing it. 📌 Palliative = pain relief only. ❌ Obsolete means out of use, which does not fit."
  },
  28: {
    type: "concept", icon: "😌", accent: "#4b57dd", pauseTimer: true,
    title: "Anodyne",
    html: `
      <div class="cp-vocab vp" style="--a:#4b57dd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈænədaɪn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A medicine or thing that reduces pain or soothes.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पीड़ाहर, दर्दनिवारक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">painkiller</span><span class="vp-tag syn">analgesic</span><span class="vp-tag syn">soother</span><span class="vp-tag syn">balm</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">irritant</span><span class="vp-tag ant">stimulant</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The doctor gave him an <b>anodyne</b> to ease the pain of the broken arm.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Soft music was an <b>anodyne</b> for her tired mind after the exam. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">To the grieving poet, the quiet river was an <b>anodyne</b> for sorrow.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/14.png" alt="Picture for the word anodyne"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Soft music was an <b>anodyne</b> for her tired mind after the exam.</p></div></div></div></div>
    `
  },
  29: {
    questext: "'पीड़ा कम करने वाली चीज़ या दवा' के लिए सही शब्द कौन-सा है?",
    options: ["Stimulant", "Poison", "Anodyne", "Irritant"],
    correct: "3",
    exptext: "✅ Anodyne soothes pain. 📌 An-odyne = without pain. ❌ Stimulant excites the body instead of soothing it."
  },
  30: {
    type: "concept", icon: "🏚️", accent: "#62c526", pauseTimer: true,
    title: "Desuetude",
    html: `
      <div class="cp-vocab vp" style="--a:#62c526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈdɛswɪtjuːd/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A state of no longer being used or practised.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अप्रचलन, उपयोग का अभाव</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">disuse</span><span class="vp-tag syn">inactivity</span><span class="vp-tag syn">neglect</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">use</span><span class="vp-tag ant">usage</span><span class="vp-tag ant">practice</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The old well has fallen into <b>desuetude</b> since water pipes reached the village. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Many traditional crafts have sunk into <b>desuetude</b> as factories make cheaper goods.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">After years of <b>desuetude</b>, the grand library was reopened for the public.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/15.png" alt="Picture for the word desuetude"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The old well has fallen into <b>desuetude</b> since water pipes reached the village.</p></div></div></div></div>
    `
  },
  31: {
    questext: "Choose the word OPPOSITE in meaning to DESUETUDE.",
    options: ["Disuse", "Usage", "Neglect", "Inactivity"],
    correct: "2",
    exptext: "✅ Desuetude means disuse, so usage is the opposite. 📌 De-suetude = un-used. ❌ Neglect is close to disuse, a synonym."
  },
  32: {
    type: "concept", icon: "⏸️", accent: "#d831a1", pauseTimer: true,
    title: "Hiatus",
    html: `
      <div class="cp-vocab vp" style="--a:#d831a1;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/haɪˈeɪtəs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A short break or gap in a series of events.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अंतराल, विराम</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">pause</span><span class="vp-tag syn">gap</span><span class="vp-tag syn">interval</span><span class="vp-tag syn">break</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">continuity</span><span class="vp-tag ant">continuation</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">After a long <b>hiatus</b>, the singer came back with a new album.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">There was a <b>hiatus</b> in the talks when both sides left the room.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The teacher's illness caused a month-long <b>hiatus</b> in our classes. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/16.png" alt="Picture for the word hiatus"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The teacher's illness caused a month-long <b>hiatus</b> in our classes.</p></div></div></div></div>
    `
  },
  33: {
    questext: "After a three-year ____ from films, the actor returned to the screen.",
    options: ["conformity", "placebo", "martinet", "hiatus"],
    correct: "4",
    exptext: "✅ Hiatus = a gap or break in activity. 📌 Hiatus = 'hi, a gap'. ❌ Conformity means following rules, which does not fit."
  },
  34: {
    type: "concept", icon: "🌫️", accent: "#4bd7dd", pauseTimer: true,
    title: "Oblivion",
    html: `
      <div class="cp-vocab vp" style="--a:#4bd7dd;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/əˈblɪviən/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The state of being completely forgotten or unnoticed.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">विस्मृति, गुमनामी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">forgetfulness</span><span class="vp-tag syn">obscurity</span><span class="vp-tag syn">unawareness</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">remembrance</span><span class="vp-tag ant">memory</span><span class="vp-tag ant">fame</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Many great folk singers have faded into <b>oblivion</b> without leaving any record.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The old actor lived in <b>oblivion</b>, forgotten by the audience that once cheered him.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The ancient city sank into <b>oblivion</b> after its river dried up. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/17.png" alt="Picture for the word oblivion"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The ancient city sank into <b>oblivion</b> after its river dried up.</p></div></div></div></div>
    `
  },
  35: {
    questext: "Choose the word closest in meaning to OBLIVION.",
    options: ["Obscurity", "Remembrance", "Fame", "Glory"],
    correct: "1",
    exptext: "✅ Oblivion = being forgotten, close to obscurity. 📌 Oblivion = obliterated from memory. ❌ Fame is the opposite."
  },
  36: {
    type: "concept", icon: "👑", accent: "#c59d26", pauseTimer: true,
    title: "Interregnum",
    html: `
      <div class="cp-vocab vp" style="--a:#c59d26;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌɪntəˈrɛɡnəm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A period when a country has no ruler or government.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">राजशून्य काल, अंतरिम काल</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">interval</span><span class="vp-tag syn">gap</span><span class="vp-tag syn">break</span><span class="vp-tag syn">suspension</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">reign</span><span class="vp-tag ant">rule</span><span class="vp-tag ant">continuity</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The country faced an <b>interregnum</b> after the king died without naming a successor.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">During the <b>interregnum</b>, the council ran the government until the new leader arrived. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The long <b>interregnum</b> between the two prime ministers caused confusion in the state.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/18.png" alt="Picture for the word interregnum"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">During the <b>interregnum</b>, the council ran the government until the new leader arrived.</p></div></div></div></div>
    `
  },
  37: {
    questext: "The gap between the death of one king and the crowning of the next is called an:",
    options: ["Oblivion", "Desuetude", "Interregnum", "Placebo"],
    correct: "3",
    exptext: "✅ Interregnum = the period between two rulers. 📌 Inter + regnum = between reigns. ❌ Hiatus is a general gap, not specific to rulers."
  },
  38: {
    type: "concept", icon: "🕯️", accent: "#7d31d8", pauseTimer: true,
    title: "Elegy",
    html: `
      <div class="cp-vocab vp" style="--a:#7d31d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɛlədʒi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A sad poem or song written to mourn someone who has died.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">शोकगीत, विलाप-काव्य</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">lament</span><span class="vp-tag syn">dirge</span><span class="vp-tag syn">requiem</span><span class="vp-tag syn">threnody</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">paean</span><span class="vp-tag ant">celebration</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The poet wrote an <b>elegy</b> for his friend who had passed away in the war.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The school choir sang a soft <b>elegy</b> at the funeral of the old teacher. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Gray's famous poem is an <b>elegy</b> written in a quiet country churchyard.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/19.png" alt="Picture for the word elegy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The school choir sang a soft <b>elegy</b> at the funeral of the old teacher.</p></div></div></div></div>
    `
  },
  39: {
    questext: "'शोकगीत' के लिए सही अंग्रेज़ी शब्द कौन-सा है?",
    options: ["Encomium", "Elegy", "Soliloquy", "Epistle"],
    correct: "2",
    exptext: "✅ Elegy is a poem of mourning. 📌 Elegy = grief poem. ❌ Encomium praises someone, it does not mourn."
  },
  40: {
    type: "concept", icon: "🏅", accent: "#4bdd63", pauseTimer: true,
    title: "Encomium",
    html: `
      <div class="cp-vocab vp" style="--a:#4bdd63;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɛnˈkoʊmiəm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A speech or writing that praises someone very highly.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">प्रशंसा-पत्र, स्तुति</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">tribute</span><span class="vp-tag syn">eulogy</span><span class="vp-tag syn">praise</span><span class="vp-tag syn">panegyric</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">censure</span><span class="vp-tag ant">criticism</span><span class="vp-tag ant">condemnation</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The principal delivered an <b>encomium</b> praising the topper's hard work and honesty. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The newspaper printed an <b>encomium</b> to the late scientist on his birthday.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her speech was less a report than an <b>encomium</b> to the brave firefighters.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/20.png" alt="Picture for the word encomium"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The principal delivered an <b>encomium</b> praising the topper's hard work and honesty.</p></div></div></div></div>
    `
  },
  41: {
    questext: "Choose the word OPPOSITE in meaning to ENCOMIUM.",
    options: ["Tribute", "Eulogy", "Praise", "Censure"],
    correct: "4",
    exptext: "✅ Encomium is high praise; censure is strong criticism. 📌 En-comium = in celebration. ❌ Eulogy is praise, a synonym."
  },
  42: {
    type: "concept", icon: "🎭", accent: "#c5263a", pauseTimer: true,
    title: "Soliloquy",
    html: `
      <div class="cp-vocab vp" style="--a:#c5263a;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/səˈlɪləkwi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A speech by one person speaking alone, often a character in a play.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">स्वगत-कथन, एकालाप</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">monologue</span><span class="vp-tag syn">self-talk</span><span class="vp-tag syn">one-man speech</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">dialogue</span><span class="vp-tag ant">conversation</span><span class="vp-tag ant">discussion</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">In his famous <b>soliloquy</b>, Hamlet asks whether it is better to live or die.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Alone on the stage, the actor delivered a long <b>soliloquy</b> about lost love. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">She talked to the mirror in a quiet <b>soliloquy</b> before the big interview.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/21.png" alt="Picture for the word soliloquy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Alone on the stage, the actor delivered a long <b>soliloquy</b> about lost love.</p></div></div></div></div>
    `
  },
  43: {
    questext: "In which sentence is SOLILOQUY used correctly?",
    options: ["The actor spoke a soliloquy alone on stage, sharing his private thoughts.", "Two leaders held a soliloquy to sign the treaty.", "The soliloquy of ten students argued loudly.", "She wrote a soliloquy together with the whole class."],
    correct: "1",
    exptext: "✅ A soliloquy is one person speaking alone. 📌 Solo + loquy (speech). ❌ Options 2-4 involve several speakers, which is dialogue."
  },
  44: {
    type: "concept", icon: "💔", accent: "#3177d8", pauseTimer: true,
    title: "Schism",
    html: `
      <div class="cp-vocab vp" style="--a:#3177d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɪzəm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A split in a group because of strong differences of opinion.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">फूट, विभाजन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">split</span><span class="vp-tag syn">division</span><span class="vp-tag syn">rift</span><span class="vp-tag syn">breach</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">unity</span><span class="vp-tag ant">union</span><span class="vp-tag ant">harmony</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A bitter <b>schism</b> divided the party into two groups after the election. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>schism</b> in the church began over a small change in prayer.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Both families tried to heal the <b>schism</b> that ended their long friendship.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/22.png" alt="Picture for the word schism"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">A bitter <b>schism</b> divided the party into two groups after the election.</p></div></div></div></div>
    `
  },
  45: {
    questext: "The disagreement over leadership caused a ____ within the party.",
    options: ["union", "schism", "elegy", "reprieve"],
    correct: "2",
    exptext: "✅ Schism = a split within a group. 📌 Schism sounds like 'scissors', cutting apart. ❌ Union means joining, the opposite."
  },
  46: {
    type: "concept", icon: "🚪", accent: "#b3dd4b", pauseTimer: true,
    title: "Apostasy",
    html: `
      <div class="cp-vocab vp" style="--a:#b3dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/əˈpɒstəsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Giving up your religion, belief or political party completely.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">धर्म-त्याग, पक्ष-त्याग</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">renunciation</span><span class="vp-tag syn">defection</span><span class="vp-tag syn">desertion</span><span class="vp-tag syn">betrayal</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">loyalty</span><span class="vp-tag ant">faithfulness</span><span class="vp-tag ant">allegiance</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The leader's <b>apostasy</b> shocked his followers, as he left the party he founded. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">In some ages, <b>apostasy</b> from the state religion was punished harshly.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Switching sides at the last moment was seen as <b>apostasy</b> by his old friends.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/23.png" alt="Picture for the word apostasy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The leader's <b>apostasy</b> shocked his followers, as he left the party he founded.</p></div></div></div></div>
    `
  },
  47: {
    questext: "Which word is NOT a synonym of APOSTASY?",
    options: ["Defection", "Desertion", "Renunciation", "Allegiance"],
    correct: "4",
    exptext: "✅ Allegiance means loyalty, the opposite of apostasy. 📌 Apostate = one who stands away. ❌ Defection is leaving a side, a synonym."
  },
  48: {
    type: "concept", icon: "📜", accent: "#c526c5", pauseTimer: true,
    title: "Heresy",
    html: `
      <div class="cp-vocab vp" style="--a:#c526c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈhɛrəsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A belief or opinion that goes against official or accepted teaching.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पाखंड, धर्म-विरोधी मत</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dissent</span><span class="vp-tag syn">unorthodoxy</span><span class="vp-tag syn">blasphemy</span><span class="vp-tag syn">heterodoxy</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">orthodoxy</span><span class="vp-tag ant">conformity</span><span class="vp-tag ant">faith</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Saying the Earth moves around the Sun was once called <b>heresy</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">To the strict elders, questioning old customs was close to <b>heresy</b>.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The scientist's new theory was dismissed as <b>heresy</b> by the old guard.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/24.png" alt="Picture for the word heresy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Saying the Earth moves around the Sun was once called <b>heresy</b>.</p></div></div></div></div>
    `
  },
  49: {
    questext: "Choose the word closest in meaning to HERESY.",
    options: ["Dissent", "Loyalty", "Orthodoxy", "Conformity"],
    correct: "1",
    exptext: "✅ Heresy is opposition to accepted belief, i.e. dissent. 📌 Heresy = 'choosing' your own belief. ❌ Orthodoxy is the accepted belief itself."
  },
  50: {
    type: "concept", icon: "😡", accent: "#31d8a7", pauseTimer: true,
    title: "Bigot",
    html: `
      <div class="cp-vocab vp" style="--a:#31d8a7;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈbɪɡət/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who strongly and unfairly dislikes other beliefs or groups.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कट्टर व्यक्ति, असहिष्णु</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fanatic</span><span class="vp-tag syn">zealot</span><span class="vp-tag syn">extremist</span><span class="vp-tag syn">dogmatist</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">liberal</span><span class="vp-tag ant">humanist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A <b>bigot</b> refuses to listen to anyone who follows a different religion.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>bigot</b> shouted at his neighbour only because of the neighbour's language. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">She is no <b>bigot</b>; she respects people from every culture and faith.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/25.png" alt="Picture for the word bigot"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>bigot</b> shouted at his neighbour only because of the neighbour's language.</p></div></div></div></div>
    `
  },
  51: {
    questext: "'कट्टर, असहिष्णु व्यक्ति' के लिए सही शब्द कौन-सा है?",
    options: ["Maverick", "Conformist", "Bigot", "Elegy"],
    correct: "3",
    exptext: "✅ A bigot is intolerant of other views. 📌 Bigot = big hate. ❌ Maverick is an independent thinker, not intolerant."
  },
  52: {
    type: "concept", icon: "🔥", accent: "#dd874b", pauseTimer: true,
    title: "Heretic",
    html: `
      <div class="cp-vocab vp" style="--a:#dd874b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈhɛrətɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who holds beliefs against the accepted teaching of a group.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">विधर्मी, धर्म-विरोधी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dissenter</span><span class="vp-tag syn">nonconformist</span><span class="vp-tag syn">apostate</span><span class="vp-tag syn">renegade</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">believer</span><span class="vp-tag ant">loyalist</span><span class="vp-tag ant">conformist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The villagers called him a <b>heretic</b> for refusing to follow their old rituals. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Once a <b>heretic</b>, the thinker is now praised as a great reformer.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The king punished the <b>heretic</b> who spoke against the royal faith.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/26.png" alt="Picture for the word heretic"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The villagers called him a <b>heretic</b> for refusing to follow their old rituals.</p></div></div></div></div>
    `
  },
  53: {
    questext: "The church labelled the scientist a ____ because he rejected its teaching.",
    options: ["loyalist", "heretic", "conformist", "believer"],
    correct: "2",
    exptext: "✅ A heretic opposes accepted teaching. 📌 Heresy → heretic (the person). ❌ Loyalist and conformist accept the teaching."
  },
  54: {
    type: "concept", icon: "🤕", accent: "#3926c5", pauseTimer: true,
    title: "Analgesic",
    html: `
      <div class="cp-vocab vp" style="--a:#3926c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌænəlˈdʒiːzɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A medicine that reduces pain without making you sleep.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दर्द की दवा, पीड़ानाशक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">painkiller</span><span class="vp-tag syn">anodyne</span><span class="vp-tag syn">pain reliever</span><span class="vp-tag syn">palliative</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">irritant</span><span class="vp-tag ant">stimulant</span><span class="vp-tag ant">aggravator</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">He took an <b>analgesic</b> to ease his headache before the long meeting. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Aspirin is a common <b>analgesic</b> found in nearly every home medicine box.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The surgeon gave an <b>analgesic</b> so that the patient felt no pain after the operation.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/27.png" alt="Picture for the word analgesic"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">He took an <b>analgesic</b> to ease his headache before the long meeting.</p></div></div></div></div>
    `
  },
  55: {
    questext: "Which word is closest in meaning to ANALGESIC?",
    options: ["Stimulant", "Irritant", "Poison", "Painkiller"],
    correct: "4",
    exptext: "✅ Analgesic = a pain-relieving drug. 📌 An-algesic = no pain (algia). ❌ Stimulant energises; it does not relieve pain."
  },
  56: {
    type: "concept", icon: "😴", accent: "#4ed831", pauseTimer: true,
    title: "Sedative",
    html: `
      <div class="cp-vocab vp" style="--a:#4ed831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɛdətɪv/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A medicine that calms you or helps you sleep.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">शामक, नींद की दवा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">soporific</span><span class="vp-tag syn">calmative</span><span class="vp-tag syn">tranquilizer</span><span class="vp-tag syn">relaxant</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">stimulant</span><span class="vp-tag ant">energizer</span><span class="vp-tag ant">irritant</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The nurse gave him a <b>sedative</b> so that he could sleep through the night.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Warm milk is a mild <b>sedative</b> that helps many people relax at bedtime.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Under the <b>sedative</b>, the frightened patient slowly became calm and quiet. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/28.png" alt="Picture for the word sedative"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Under the <b>sedative</b>, the frightened patient slowly became calm and quiet.</p></div></div></div></div>
    `
  },
  57: {
    questext: "Choose the word OPPOSITE in meaning to SEDATIVE.",
    options: ["Stimulant", "Soporific", "Relaxant", "Calmative"],
    correct: "1",
    exptext: "✅ A sedative calms; a stimulant excites. 📌 Sedate = calm. ❌ Soporific makes you sleepy, a synonym."
  },
  58: {
    type: "concept", icon: "🐘", accent: "#dd4b8e", pauseTimer: true,
    title: "Tranquilizer",
    html: `
      <div class="cp-vocab vp" style="--a:#dd4b8e;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈtræŋkwəlaɪzər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A drug that makes a person calm, less anxious or sleepy.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">चिंता-नाशक दवा, शांतिकर</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">sedative</span><span class="vp-tag syn">calmative</span><span class="vp-tag syn">relaxant</span><span class="vp-tag syn">depressant</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">stimulant</span><span class="vp-tag ant">irritant</span><span class="vp-tag ant">energizer</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The vet used a <b>tranquilizer</b> to calm the frightened elephant before moving it. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Her doctor warned her not to depend on a <b>tranquilizer</b> every time she felt worried.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The patient, under a strong <b>tranquilizer</b>, stayed peaceful during the long journey.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/29.png" alt="Picture for the word tranquilizer"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The vet used a <b>tranquilizer</b> to calm the frightened elephant before moving it.</p></div></div></div></div>
    `
  },
  59: {
    questext: "Which word is NOT a synonym of TRANQUILIZER?",
    options: ["Sedative", "Relaxant", "Stimulant", "Calmative"],
    correct: "3",
    exptext: "✅ A stimulant excites, while a tranquilizer calms. 📌 Tranquil = peaceful. ❌ Sedative and calmative both calm, so they are synonyms."
  },
  60: {
    type: "concept", icon: "🥱", accent: "#269ec5", pauseTimer: true,
    title: "Ennui",
    html: `
      <div class="cp-vocab vp" style="--a:#269ec5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɒnˈwiː/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A feeling of being bored because nothing interests you.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">ऊब, उदासीनता</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">boredom</span><span class="vp-tag syn">tedium</span><span class="vp-tag syn">listlessness</span><span class="vp-tag syn">weariness</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">excitement</span><span class="vp-tag ant">enthusiasm</span><span class="vp-tag ant">zest</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Long, empty summer holidays filled the lazy teenager with <b>ennui</b>.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Despite his wealth, the prince suffered from <b>ennui</b> and wished for adventure. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">A sense of <b>ennui</b> crept over the clerk as he filed the same forms daily.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/30.png" alt="Picture for the word ennui"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Despite his wealth, the prince suffered from <b>ennui</b> and wished for adventure.</p></div></div></div></div>
    `
  },
  61: {
    questext: "The ____ of doing the same dull work every day made him quit.",
    options: ["enthusiasm", "ennui", "zeal", "amnesty"],
    correct: "2",
    exptext: "✅ Ennui = boredom from dull routine. 📌 Ennui sounds like 'on-we', on and on. ❌ Enthusiasm would make him keep working."
  },
  62: {
    type: "concept", icon: "🐻", accent: "#d8d031", pauseTimer: true,
    title: "Torpor",
    html: `
      <div class="cp-vocab vp" style="--a:#d8d031;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈtɔːrpər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A state of being slow, sleepy and without energy.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सुस्ती, निष्क्रियता</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">lethargy</span><span class="vp-tag syn">sluggishness</span><span class="vp-tag syn">inertia</span><span class="vp-tag syn">drowsiness</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">energy</span><span class="vp-tag ant">vigour</span><span class="vp-tag ant">activity</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The heavy meal put the whole family into a lazy <b>torpor</b> on the sofa.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Bears fall into a deep <b>torpor</b> during the cold winter months. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The minister's speech shook the officials out of their <b>torpor</b>.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/31.png" alt="Picture for the word torpor"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Bears fall into a deep <b>torpor</b> during the cold winter months.</p></div></div></div></div>
    `
  },
  63: {
    questext: "Choose the word closest in meaning to TORPOR.",
    options: ["Vigour", "Zeal", "Lethargy", "Alertness"],
    correct: "3",
    exptext: "✅ Torpor means sluggish inactivity, i.e. lethargy. 📌 Torpor = torpedoed energy. ❌ Vigour is strong energy, the opposite."
  },
  64: {
    type: "concept", icon: "🥱", accent: "#ac4bdd", pauseTimer: true,
    title: "Tedium",
    html: `
      <div class="cp-vocab vp" style="--a:#ac4bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈtiːdiəm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The quality of being long, dull and boring.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">ऊब, नीरसता</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">monotony</span><span class="vp-tag syn">boredom</span><span class="vp-tag syn">dullness</span><span class="vp-tag syn">drudgery</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">excitement</span><span class="vp-tag ant">interest</span><span class="vp-tag ant">thrill</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>tedium</b> of copying long lists made the clerk yawn all afternoon. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Travelling by bus for twelve hours was pure <b>tedium</b> for the children.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her lively stories broke the <b>tedium</b> of the long winter evenings.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/32.png" alt="Picture for the word tedium"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>tedium</b> of copying long lists made the clerk yawn all afternoon.</p></div></div></div></div>
    `
  },
  65: {
    questext: "Find the odd one out.",
    options: ["Monotony", "Drudgery", "Dullness", "Thrill"],
    correct: "4",
    exptext: "✅ Thrill means excitement; the other three mean dull, boring work. 📌 Tedium = tired + medium boring. ❌ Drudgery means dull labour, same group as tedium."
  },
  66: {
    type: "concept", icon: "😩", accent: "#26c561", pauseTimer: true,
    title: "Weary",
    html: `
      <div class="cp-vocab vp" style="--a:#26c561;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈwɪəri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Very tired, especially after long effort or boredom.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">थका हुआ, क्लांत</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">exhausted</span><span class="vp-tag syn">fatigued</span><span class="vp-tag syn">tired</span><span class="vp-tag syn">drained</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">fresh</span><span class="vp-tag ant">energetic</span><span class="vp-tag ant">lively</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>weary</b> travellers dropped their bags and slept as soon as they arrived.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">She was <b>weary</b> of hearing the same excuse every single morning.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">A <b>weary</b> smile crossed the doctor's face after the long night shift. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/33.png" alt="Picture for the word weary"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">A <b>weary</b> smile crossed the doctor's face after the long night shift.</p></div></div></div></div>
    `
  },
  67: {
    questext: "After walking twenty kilometres, the ____ soldiers rested under a tree.",
    options: ["energetic", "weary", "wary", "lively"],
    correct: "2",
    exptext: "✅ Weary = very tired after long effort. 📌 weARy = ARms tired. ❌ Wary means careful, a spelling-trap word."
  },
  68: {
    type: "concept", icon: "🐈", accent: "#d83f31", pauseTimer: true,
    title: "Wary",
    html: `
      <div class="cp-vocab vp" style="--a:#d83f31;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈwɛəri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Careful because you think something may be dangerous.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सतर्क, चौकन्ना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">cautious</span><span class="vp-tag syn">careful</span><span class="vp-tag syn">alert</span><span class="vp-tag syn">vigilant</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">careless</span><span class="vp-tag ant">reckless</span><span class="vp-tag ant">trusting</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Be <b>wary</b> of strangers who offer you free gifts on the road.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The cat was <b>wary</b> of the new dog and stayed near the door. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Investors grew <b>wary</b> of the bank after the sudden rise in its debts.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/34.png" alt="Picture for the word wary"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The cat was <b>wary</b> of the new dog and stayed near the door.</p></div></div></div></div>
    `
  },
  69: {
    questext: "Be ____ of online offers that seem too good to be true.",
    options: ["wary", "weary", "reckless", "careless"],
    correct: "1",
    exptext: "✅ Wary = careful about possible danger. 📌 WARy = WARning, be alert. ❌ Weary means tired and does not fit the meaning."
  },
  70: {
    type: "concept", icon: "📉", accent: "#4b6add", pauseTimer: true,
    title: "Remission",
    html: `
      <div class="cp-vocab vp" style="--a:#4b6add;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/rɪˈmɪʃn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A reduction in the strength of a disease or a punishment.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कमी, छूट</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">abatement</span><span class="vp-tag syn">easing</span><span class="vp-tag syn">relief</span><span class="vp-tag syn">reduction</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">relapse</span><span class="vp-tag ant">aggravation</span><span class="vp-tag ant">intensification</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The patient's cancer went into <b>remission</b> after months of careful treatment. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The prisoner earned a <b>remission</b> of six months for good behaviour.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">There was a short <b>remission</b> of the fever before it rose again.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/35.png" alt="Picture for the word remission"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The patient's cancer went into <b>remission</b> after months of careful treatment.</p></div></div></div></div>
    `
  },
  71: {
    questext: "Choose the word OPPOSITE in meaning to REMISSION.",
    options: ["Relief", "Easing", "Relapse", "Reduction"],
    correct: "3",
    exptext: "✅ Remission is a lessening of disease; relapse is its return. 📌 Re-mission = sent back. ❌ Relief and easing are synonyms."
  },
  72: {
    type: "concept", icon: "⏳", accent: "#76c526", pauseTimer: true,
    title: "Reprieve",
    html: `
      <div class="cp-vocab vp" style="--a:#76c526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/rɪˈpriːv/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A delay or cancellation of a punishment or trouble.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">राहत, दंड-स्थगन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">respite</span><span class="vp-tag syn">stay</span><span class="vp-tag syn">relief</span><span class="vp-tag syn">postponement</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">punishment</span><span class="vp-tag ant">penalty</span><span class="vp-tag ant">condemnation</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The judge gave the prisoner a last-minute <b>reprieve</b> from the death sentence.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The cool evening breeze was a welcome <b>reprieve</b> from the burning heat. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The tenants got a one-month <b>reprieve</b> before they had to leave the house.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/36.png" alt="Picture for the word reprieve"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The cool evening breeze was a welcome <b>reprieve</b> from the burning heat.</p></div></div></div></div>
    `
  },
  73: {
    questext: "'सज़ा या मुसीबत का स्थगन, राहत' के लिए सही शब्द कौन-सा है?",
    options: ["Perfidy", "Torpor", "Tedium", "Reprieve"],
    correct: "4",
    exptext: "✅ Reprieve = a delay or cancellation of punishment. 📌 Re-prieve = a pause before the blow. ❌ Perfidy means betrayal."
  },
  74: {
    type: "concept", icon: "🕊️", accent: "#d831b6", pauseTimer: true,
    title: "Amnesty",
    html: `
      <div class="cp-vocab vp" style="--a:#d831b6;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈæmnəsti/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">An official pardon given by a government to a group of offenders.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">आम माफ़ी, क्षमादान</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">pardon</span><span class="vp-tag syn">clemency</span><span class="vp-tag syn">forgiveness</span><span class="vp-tag syn">absolution</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">punishment</span><span class="vp-tag ant">condemnation</span><span class="vp-tag ant">conviction</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The government announced an <b>amnesty</b> for people who surrendered illegal firearms.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">After the war, the new ruler declared a general <b>amnesty</b> for rebel soldiers.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Citizens who declare hidden income under the <b>amnesty</b> scheme will not face jail. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/37.png" alt="Picture for the word amnesty"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Citizens who declare hidden income under the <b>amnesty</b> scheme will not face jail.</p></div></div></div></div>
    `
  },
  75: {
    questext: "Choose the word closest in meaning to AMNESTY.",
    options: ["Pardon", "Penalty", "Conviction", "Censure"],
    correct: "1",
    exptext: "✅ Amnesty is an official pardon. 📌 Amnesty shares a root with amnesia: forget the offence. ❌ Penalty is a punishment, the opposite."
  },
  76: {
    type: "concept", icon: "🗡️", accent: "#4bddd0", pauseTimer: true,
    title: "Perfidy",
    html: `
      <div class="cp-vocab vp" style="--a:#4bddd0;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈpɜːrfədi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The act of betraying someone who trusted you.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">विश्वासघात, धोखा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">treachery</span><span class="vp-tag syn">betrayal</span><span class="vp-tag syn">disloyalty</span><span class="vp-tag syn">deceit</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">loyalty</span><span class="vp-tag ant">faithfulness</span><span class="vp-tag ant">honesty</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>perfidy</b> shocked the team, as he sold their secret plans to rivals. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The king never forgave the <b>perfidy</b> of the minister he had trusted most.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In the epic, the general's <b>perfidy</b> led to the fall of the fort.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/38.png" alt="Picture for the word perfidy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">His <b>perfidy</b> shocked the team, as he sold their secret plans to rivals.</p></div></div></div></div>
    `
  },
  77: {
    questext: "Which word is NOT a synonym of PERFIDY?",
    options: ["Treachery", "Betrayal", "Loyalty", "Disloyalty"],
    correct: "3",
    exptext: "✅ Loyalty is the opposite of perfidy. 📌 Perfidy = per-fi-dy, 'perfect lie'. ❌ Treachery means betrayal, so it is a synonym."
  },
  78: {
    type: "concept", icon: "🧠", accent: "#c58826", pauseTimer: true,
    title: "Polymath",
    html: `
      <div class="cp-vocab vp" style="--a:#c58826;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈpɒlimæθ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who knows a great deal about many subjects.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">बहुज्ञ, बहुश्रुत विद्वान</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">savant</span><span class="vp-tag syn">scholar</span><span class="vp-tag syn">all-rounder</span><span class="vp-tag syn">sage</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">ignoramus</span><span class="vp-tag ant">novice</span><span class="vp-tag ant">layman</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Leonardo da Vinci was a <b>polymath</b>: a painter, an inventor and a scientist. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Our teacher is a <b>polymath</b>, equally at ease with poetry, physics and music.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">A true <b>polymath</b>, she solved maths problems and then composed songs at night.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/39.png" alt="Picture for the word polymath"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Leonardo da Vinci was a <b>polymath</b>: a painter, an inventor and a scientist.</p></div></div></div></div>
    `
  },
  79: {
    questext: "Which person is best described as a polymath?",
    options: ["A person who knows only one subject deeply", "A person with wide knowledge of many subjects", "A person who avoids all learning", "A person who talks too much"],
    correct: "2",
    exptext: "✅ Polymath = poly (many) + math (learning). 📌 Poly = many, as in polygon. ❌ Option 1 describes a specialist, the opposite."
  },
  80: {
    type: "concept", icon: "🎹", accent: "#6831d8", pauseTimer: true,
    title: "Prodigy",
    html: `
      <div class="cp-vocab vp" style="--a:#6831d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈprɒdədʒi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A young person with an amazing natural talent.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">चमत्कारी बालक, विलक्षण प्रतिभा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">genius</span><span class="vp-tag syn">wonder</span><span class="vp-tag syn">marvel</span><span class="vp-tag syn">whiz</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">dunce</span><span class="vp-tag ant">dullard</span><span class="vp-tag ant">mediocrity</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The child <b>prodigy</b> played the piano on stage when she was only six. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A chess <b>prodigy</b>, he defeated experienced masters while still in school.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The village was proud of its young <b>prodigy</b>, who solved problems nobody else could.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/40.png" alt="Picture for the word prodigy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The child <b>prodigy</b> played the piano on stage when she was only six.</p></div></div></div></div>
    `
  },
  81: {
    questext: "At just ten years old, the ____ composed a full symphony.",
    options: ["dunce", "novice", "bigot", "prodigy"],
    correct: "4",
    exptext: "✅ A prodigy is a child with amazing talent. 📌 Prodigy = prodigious talent. ❌ Novice means a beginner, which does not fit a symphony."
  },
  82: {
    type: "concept", icon: "✊", accent: "#4bdd50", pauseTimer: true,
    title: "Dissident",
    html: `
      <div class="cp-vocab vp" style="--a:#4bdd50;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈdɪsɪdənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who openly opposes the government or official ideas.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">असंतुष्ट व्यक्ति, विरोधी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dissenter</span><span class="vp-tag syn">protester</span><span class="vp-tag syn">rebel</span><span class="vp-tag syn">objector</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">supporter</span><span class="vp-tag ant">loyalist</span><span class="vp-tag ant">conformist</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>dissident</b> was jailed for criticising the ruler's policies in newspapers.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Writers and <b>dissidents</b> often face danger when they speak against power.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Millions admired the <b>dissident</b> who stood alone against the powerful regime. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/41.png" alt="Picture for the word dissident"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Millions admired the <b>dissident</b> who stood alone against the powerful regime.</p></div></div></div></div>
    `
  },
  83: {
    questext: "Choose the word closest in meaning to DISSIDENT.",
    options: ["Dissenter", "Loyalist", "Supporter", "Conformist"],
    correct: "1",
    exptext: "✅ A dissident disagrees openly, i.e. a dissenter. 📌 Dis + sident = sits apart. ❌ Loyalist supports the government, the opposite."
  },
  84: {
    type: "concept", icon: "📖", accent: "#c5264e", pauseTimer: true,
    title: "Tale",
    html: `
      <div class="cp-vocab vp" style="--a:#c5264e;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/teɪl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A story, usually about imaginary or past events.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कहानी, कथा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">story</span><span class="vp-tag syn">narrative</span><span class="vp-tag syn">legend</span><span class="vp-tag syn">fable</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Grandmother told us a <b>tale</b> of a clever fox every night. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The newspaper printed a sad <b>tale</b> of a family that lost its home in the flood.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Ancient <b>tales</b> of kings and heroes were passed on by village singers.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/42.png" alt="Picture for the word tale"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Grandmother told us a <b>tale</b> of a clever fox every night.</p></div></div></div></div>
    `
  },
  85: {
    questext: "Which word is NOT a synonym of TALE?",
    options: ["Narrative", "Legend", "Dispute", "Fable"],
    correct: "3",
    exptext: "✅ A dispute is an argument, not a story. 📌 Tale = tell. ❌ Narrative and fable are both kinds of stories."
  },
  86: {
    type: "concept", icon: "🦕", accent: "#318cd8", pauseTimer: true,
    title: "Antediluvian",
    html: `
      <div class="cp-vocab vp" style="--a:#318cd8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˌæntidɪˈluːviən/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Very old-fashioned, as if from before the great flood.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अति प्राचीन, पुराने ज़माने का</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">ancient</span><span class="vp-tag syn">primitive</span><span class="vp-tag syn">prehistoric</span><span class="vp-tag syn">archaic</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">modern</span><span class="vp-tag ant">new</span><span class="vp-tag ant">up-to-date</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">His <b>antediluvian</b> ideas about women's education surprised the modern audience.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The office still used <b>antediluvian</b> machines that were slow and noisy. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Critics called the law <b>antediluvian</b> and demanded a modern replacement.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/43.png" alt="Picture for the word antediluvian"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The office still used <b>antediluvian</b> machines that were slow and noisy.</p></div></div></div></div>
    `
  },
  87: {
    questext: "Choose the word OPPOSITE in meaning to ANTEDILUVIAN.",
    options: ["Ancient", "Archaic", "Primitive", "Modern"],
    correct: "4",
    exptext: "✅ Antediluvian = very old; modern is the opposite. 📌 Ante + diluvium = before the flood. ❌ Archaic means old, a synonym."
  },
  88: {
    type: "concept", icon: "💬", accent: "#c5dd4b", pauseTimer: true,
    title: "Maxim",
    html: `
      <div class="cp-vocab vp" style="--a:#c5dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈmæksɪm/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A short saying that gives a rule or a general truth.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सूक्ति, कहावत</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">proverb</span><span class="vp-tag syn">adage</span><span class="vp-tag syn">saying</span><span class="vp-tag syn">axiom</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">'Honesty is the best policy' is a <b>maxim</b> every child learns at school.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The old teacher lived by the <b>maxim</b> that hard work beats talent. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Writers often begin chapters with a wise <b>maxim</b> from a famous thinker.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/44.png" alt="Picture for the word maxim"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The old teacher lived by the <b>maxim</b> that hard work beats talent.</p></div></div></div></div>
    `
  },
  89: {
    questext: "Choose the word closest in meaning to MAXIM.",
    options: ["Adage", "Rumour", "Dispute", "Remedy"],
    correct: "1",
    exptext: "✅ A maxim is a short wise saying, i.e. an adage. 📌 Maxim = maximum wisdom in few words. ❌ Rumour is unproven talk."
  },
  90: {
    type: "concept", icon: "🎙️", accent: "#b026c5", pauseTimer: true,
    title: "Pundit",
    html: `
      <div class="cp-vocab vp" style="--a:#b026c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈpʌndɪt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who is an expert and often gives opinions in public.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">विद्वान, पंडित</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">expert</span><span class="vp-tag syn">authority</span><span class="vp-tag syn">scholar</span><span class="vp-tag syn">sage</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">novice</span><span class="vp-tag ant">layman</span><span class="vp-tag ant">amateur</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">A political <b>pundit</b> explained the election result on the television news. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The cricket <b>pundit</b> predicted a win for the home team.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Local <b>pundits</b> gathered in the temple to explain the ancient texts.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/45.png" alt="Picture for the word pundit"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">A political <b>pundit</b> explained the election result on the television news.</p></div></div></div></div>
    `
  },
  91: {
    questext: "Choose the word OPPOSITE in meaning to PUNDIT.",
    options: ["Expert", "Novice", "Scholar", "Authority"],
    correct: "2",
    exptext: "✅ A pundit is an expert; a novice is a beginner. 📌 Pundit = pandit, the learned one. ❌ Authority is a synonym."
  },
  92: {
    type: "concept", icon: "🕵️", accent: "#31d891", pauseTimer: true,
    title: "Meddler",
    html: `
      <div class="cp-vocab vp" style="--a:#31d891;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈmɛdlər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who interferes in other people's affairs without being asked.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दख़लंदाज़ी करने वाला, टांग अड़ाने वाला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">busybody</span><span class="vp-tag syn">interferer</span><span class="vp-tag syn">intruder</span><span class="vp-tag syn">snoop</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">bystander</span><span class="vp-tag ant">onlooker</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The neighbour was a <b>meddler</b> who gave advice about everyone's family matters. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">No one likes a <b>meddler</b> who pokes into private decisions.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">He called the officer a <b>meddler</b> for interfering in a settled dispute.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/46.png" alt="Picture for the word meddler"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The neighbour was a <b>meddler</b> who gave advice about everyone's family matters.</p></div></div></div></div>
    `
  },
  93: {
    questext: "Nobody invited the ____ to the meeting, yet he kept giving orders.",
    options: ["maverick", "pundit", "meddler", "prodigy"],
    correct: "3",
    exptext: "✅ A meddler interferes in matters that are not his own. 📌 Meddler = middle where he does not belong. ❌ Pundit is an expert, not an interferer."
  },
  94: {
    type: "concept", icon: "🚷", accent: "#dd754b", pauseTimer: true,
    title: "Interloper",
    html: `
      <div class="cp-vocab vp" style="--a:#dd754b;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɪntərləʊpər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who enters a place or group where he is not wanted.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">घुसपैठिया, अनधिकृत व्यक्ति</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">intruder</span><span class="vp-tag syn">trespasser</span><span class="vp-tag syn">outsider</span><span class="vp-tag syn">gatecrasher</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">insider</span><span class="vp-tag ant">member</span><span class="vp-tag ant">host</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The guard stopped the <b>interloper</b> who tried to join the private party. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">She felt like an <b>interloper</b> at the family function of strangers.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Wildlife officers removed the <b>interloper</b> from the protected forest.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/47.png" alt="Picture for the word interloper"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The guard stopped the <b>interloper</b> who tried to join the private party.</p></div></div></div></div>
    `
  },
  95: {
    questext: "Choose the word closest in meaning to INTERLOPER.",
    options: ["Host", "Member", "Insider", "Intruder"],
    correct: "4",
    exptext: "✅ An interloper enters uninvited, like an intruder. 📌 Inter + loper = runs in between. ❌ Host and member belong to the group."
  },
  96: {
    type: "concept", icon: "🧀", accent: "#2627c5", pauseTimer: true,
    title: "Epicure",
    html: `
      <div class="cp-vocab vp" style="--a:#2627c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɛpɪkjʊər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who enjoys fine food and drink and chooses carefully.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">खाने-पीने का शौकीन, रसिक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">gourmet</span><span class="vp-tag syn">foodie</span><span class="vp-tag syn">connoisseur</span><span class="vp-tag syn">gastronome</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">ascetic</span><span class="vp-tag ant">abstainer</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">As an <b>epicure</b>, he travelled the world to taste rare cheeses and fine wines.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>epicure</b> sent back the dish because the sauce lacked balance. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Only a true <b>epicure</b> can tell the difference between two types of tea.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/48.png" alt="Picture for the word epicure"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>epicure</b> sent back the dish because the sauce lacked balance.</p></div></div></div></div>
    `
  },
  97: {
    questext: "'खाने-पीने का शौकीन, रसिक' के लिए सही शब्द कौन-सा है?",
    options: ["Ascetic", "Epicure", "Pundit", "Meddler"],
    correct: "2",
    exptext: "✅ Epicure = a person who enjoys fine food and drink. 📌 Epicure = epic dinner. ❌ Ascetic avoids pleasure, the opposite."
  },
  98: {
    type: "concept", icon: "🛋️", accent: "#63d831", pauseTimer: true,
    title: "Sybarite",
    html: `
      <div class="cp-vocab vp" style="--a:#63d831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɪbəraɪt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who loves luxury and pleasure very much.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">विलासी, ऐश-पसंद</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">hedonist</span><span class="vp-tag syn">voluptuary</span><span class="vp-tag syn">pleasure-seeker</span><span class="vp-tag syn">epicure</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">ascetic</span><span class="vp-tag ant">puritan</span><span class="vp-tag ant">stoic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>sybarite</b> lived in a palace with silk beds and a personal chef. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A true <b>sybarite</b>, she spent holidays only in five-star resorts and spas.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The monk was no <b>sybarite</b>; he slept on the floor and ate simply.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/49.png" alt="Picture for the word sybarite"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>sybarite</b> lived in a palace with silk beds and a personal chef.</p></div></div></div></div>
    `
  },
  99: {
    questext: "Choose the word OPPOSITE in meaning to SYBARITE.",
    options: ["Ascetic", "Hedonist", "Voluptuary", "Epicure"],
    correct: "1",
    exptext: "✅ A sybarite loves luxury; an ascetic lives simply and denies pleasure. 📌 Sybaris was a luxury-loving ancient city. ❌ Hedonist is a synonym."
  },
  100: {
    type: "concept", icon: "🥂", accent: "#dd4ba1", pauseTimer: true,
    title: "Hedonist",
    html: `
      <div class="cp-vocab vp" style="--a:#dd4ba1;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈhiːdənɪst/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who thinks pleasure is the main goal of life.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">भोगवादी, सुखवादी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">sybarite</span><span class="vp-tag syn">pleasure-seeker</span><span class="vp-tag syn">libertine</span><span class="vp-tag syn">epicurean</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">ascetic</span><span class="vp-tag ant">puritan</span><span class="vp-tag ant">stoic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>hedonist</b> spent his whole salary on parties and holidays every month. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>hedonist</b> lives for the moment and avoids all pain and effort.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Poets often described the rich prince as a careless <b>hedonist</b>.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/50.png" alt="Picture for the word hedonist"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>hedonist</b> spent his whole salary on parties and holidays every month.</p></div></div></div></div>
    `
  },
  101: {
    questext: "A hedonist believes that:",
    options: ["work is the highest virtue", "poverty brings peace", "pleasure is the aim of life", "silence is the best answer"],
    correct: "3",
    exptext: "✅ Hedonist = one who values pleasure above all. 📌 Hedone is Greek for pleasure. ❌ Option 1 describes a workaholic."
  },
  102: {
    type: "concept", icon: "🎉", accent: "#26b2c5", pauseTimer: true,
    title: "Reveler",
    html: `
      <div class="cp-vocab vp" style="--a:#26b2c5;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈrɛvələr/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who enjoys lively parties and noisy celebrations.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मौज-मस्ती करने वाला, उत्सव मनाने वाला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">partygoer</span><span class="vp-tag syn">merrymaker</span><span class="vp-tag syn">celebrant</span><span class="vp-tag syn">carouser</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">killjoy</span><span class="vp-tag ant">spoilsport</span><span class="vp-tag ant">recluse</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Thousands of <b>revelers</b> filled the streets on the night of the festival. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>reveler</b> danced until sunrise at his friend's wedding.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The quiet town woke to the songs of happy <b>revelers</b> returning home.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/51.png" alt="Picture for the word reveler"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Thousands of <b>revelers</b> filled the streets on the night of the festival.</p></div></div></div></div>
    `
  },
  103: {
    questext: "Choose the word OPPOSITE in meaning to REVELER.",
    options: ["Merrymaker", "Killjoy", "Celebrant", "Partygoer"],
    correct: "2",
    exptext: "✅ A reveler enjoys parties; a killjoy spoils the fun. 📌 Reveler = revelry. ❌ Merrymaker is a synonym."
  },
  104: {
    type: "concept", icon: "🍗", accent: "#d8bb31", pauseTimer: true,
    title: "Glutton",
    html: `
      <div class="cp-vocab vp" style="--a:#d8bb31;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɡlʌtn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who eats far too much and is greedy for it.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पेटू, ख़ाऊ</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">gourmand</span><span class="vp-tag syn">overeater</span><span class="vp-tag syn">gormandizer</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">ascetic</span><span class="vp-tag ant">faster</span><span class="vp-tag ant">abstainer</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>glutton</b> ate five plates of rice and still asked for more.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>glutton</b> for sweets, the boy emptied the whole jar in one evening.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The king, a known <b>glutton</b>, ordered a feast of twenty dishes for himself. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/52.png" alt="Picture for the word glutton"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The king, a known <b>glutton</b>, ordered a feast of twenty dishes for himself.</p></div></div></div></div>
    `
  },
  105: {
    questext: "Which person is a glutton?",
    options: ["One who eats slowly and little", "One who cooks for others", "One who fasts daily", "One who eats too much out of greed"],
    correct: "4",
    exptext: "✅ A glutton eats too much greedily. 📌 Glutton = gulp-ton. ❌ Option 3 describes a person who fasts, the opposite."
  },
  106: {
    type: "concept", icon: "🖼️", accent: "#994bdd", pauseTimer: true,
    title: "Aesthete",
    html: `
      <div class="cp-vocab vp" style="--a:#994bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈiːsθiːt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who loves and values beauty, especially in art.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सौंदर्य-प्रेमी, कलाप्रेमी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">art lover</span><span class="vp-tag syn">connoisseur</span><span class="vp-tag syn">lover of beauty</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">philistine</span><span class="vp-tag ant">barbarian</span><span class="vp-tag ant">boor</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>aesthete</b> spent hours in the gallery admiring a single painting. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">As an <b>aesthete</b>, she chose every cup and curtain in her home with care.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Only an <b>aesthete</b> could notice the delicate curve in the old temple carving.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/53.png" alt="Picture for the word aesthete"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>aesthete</b> spent hours in the gallery admiring a single painting.</p></div></div></div></div>
    `
  },
  107: {
    questext: "Choose the word OPPOSITE in meaning to AESTHETE.",
    options: ["Philistine", "Connoisseur", "Art lover", "Devotee"],
    correct: "1",
    exptext: "✅ A philistine has no taste for art or beauty. 📌 Aesthete = aesthetic. ❌ Connoisseur appreciates fine things, a synonym."
  },
  108: {
    type: "concept", icon: "🍷", accent: "#26c54c", pauseTimer: true,
    title: "Connoisseur",
    html: `
      <div class="cp-vocab vp" style="--a:#26c54c;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌkɒnəˈsɜːr/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person with great knowledge and good taste in art, food or wine.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पारखी, जानकार</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">expert</span><span class="vp-tag syn">authority</span><span class="vp-tag syn">specialist</span><span class="vp-tag syn">aficionado</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">novice</span><span class="vp-tag ant">amateur</span><span class="vp-tag ant">layman</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The wine <b>connoisseur</b> could name the village by tasting one sip.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A true art <b>connoisseur</b>, he knew every painter in the museum by style. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Tea <b>connoisseurs</b> pay high prices for rare leaves from the mountain gardens.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/54.png" alt="Picture for the word connoisseur"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">A true art <b>connoisseur</b>, he knew every painter in the museum by style.</p></div></div></div></div>
    `
  },
  109: {
    questext: "A ____ of classical music, she could name each raga after the first few notes.",
    options: ["novice", "connoisseur", "glutton", "reveler"],
    correct: "2",
    exptext: "✅ Connoisseur = a person with expert taste and knowledge. 📌 Connoisseur comes from 'to know'. ❌ Novice is a beginner."
  },
  110: {
    type: "concept", icon: "🕳️", accent: "#d83139", pauseTimer: true,
    title: "Abyss",
    html: `
      <div class="cp-vocab vp" style="--a:#d83139;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/əˈbɪs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A very deep hole or space that seems to have no bottom.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अथाह खाई, रसातल</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">chasm</span><span class="vp-tag syn">gulf</span><span class="vp-tag syn">void</span><span class="vp-tag syn">pit</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">peak</span><span class="vp-tag ant">summit</span><span class="vp-tag ant">height</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">He looked down into the <b>abyss</b> below the narrow mountain bridge.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">After losing everything, the family felt they were falling into an <b>abyss</b> of despair.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Divers explored the dark ocean <b>abyss</b> where sunlight never reaches. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/55.png" alt="Picture for the word abyss"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Divers explored the dark ocean <b>abyss</b> where sunlight never reaches.</p></div></div></div></div>
    `
  },
  111: {
    questext: "Choose the word OPPOSITE in meaning to ABYSS.",
    options: ["Chasm", "Void", "Summit", "Gulf"],
    correct: "3",
    exptext: "✅ An abyss is a bottomless depth; a summit is the highest point. 📌 A-byss = without bottom. ❌ Chasm is a deep gap, a synonym."
  },
  112: {
    type: "concept", icon: "🧊", accent: "#4b7ddd", pauseTimer: true,
    title: "Crevasse",
    html: `
      <div class="cp-vocab vp" style="--a:#4b7ddd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/krɪˈvæs/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A deep crack in thick ice, especially on a glacier.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">हिमदरार, बर्फ़ की गहरी दरार</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">fissure</span><span class="vp-tag syn">crack</span><span class="vp-tag syn">cleft</span><span class="vp-tag syn">chasm</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The climbers tied a rope to cross the dangerous <b>crevasse</b> safely. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A hidden <b>crevasse</b> swallowed the snow bridge during the heavy storm.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The guide warned them of every <b>crevasse</b> along the glacier.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/56.png" alt="Picture for the word crevasse"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The climbers tied a rope to cross the dangerous <b>crevasse</b> safely.</p></div></div></div></div>
    `
  },
  113: {
    questext: "A crevasse is most commonly found in a:",
    options: ["glacier", "desert", "rainforest", "coral reef"],
    correct: "1",
    exptext: "✅ Crevasses are deep cracks in glacier ice. 📌 Crevasse = crack in ice. ❌ A desert has dry sand, not ice cracks."
  },
  114: {
    type: "concept", icon: "🏞️", accent: "#8ac526", pauseTimer: true,
    title: "Gorge",
    html: `
      <div class="cp-vocab vp" style="--a:#8ac526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɡɔːrdʒ/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A narrow valley with steep rocky sides, often with a river.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">तंग घाटी, दर्रा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">ravine</span><span class="vp-tag syn">canyon</span><span class="vp-tag syn">gully</span><span class="vp-tag syn">valley</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The river rushes through a deep <b>gorge</b> before reaching the plains.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Tourists took photos from the bridge over the narrow <b>gorge</b>. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The ancient fort stood at the edge of a rocky <b>gorge</b>.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/57.png" alt="Picture for the word gorge"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Tourists took photos from the bridge over the narrow <b>gorge</b>.</p></div></div></div></div>
    `
  },
  115: {
    questext: "Find the odd one out.",
    options: ["Gorge", "Ravine", "Canyon", "Plateau"],
    correct: "4",
    exptext: "✅ A plateau is high flat land; the others are deep, narrow valleys. 📌 Gorge = gap in the hills. ❌ Ravine is a small gorge."
  },
  116: {
    type: "concept", icon: "👎", accent: "#d831cb", pauseTimer: true,
    title: "Censure",
    html: `
      <div class="cp-vocab vp" style="--a:#d831cb;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɛnʃər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Strong and formal criticism or disapproval.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">निंदा, भर्त्सना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">criticism</span><span class="vp-tag syn">condemnation</span><span class="vp-tag syn">rebuke</span><span class="vp-tag syn">reproach</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">praise</span><span class="vp-tag ant">applause</span><span class="vp-tag ant">approval</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The committee passed a motion of <b>censure</b> against the careless official. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The press raised a storm of <b>censure</b> against the minister's remark.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The film received widespread <b>censure</b> for its careless treatment of history.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/58.png" alt="Picture for the word censure"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The committee passed a motion of <b>censure</b> against the careless official.</p></div></div></div></div>
    `
  },
  117: {
    questext: "Choose the word closest in meaning to CENSURE.",
    options: ["Applause", "Condemnation", "Approval", "Praise"],
    correct: "2",
    exptext: "✅ Censure is strong disapproval, i.e. condemnation. 📌 Censure ≠ censor, but both judge harshly. ❌ Applause is approval, the opposite."
  },
  118: {
    type: "concept", icon: "📢", accent: "#4bddbd", pauseTimer: true,
    title: "Denunciation",
    html: `
      <div class="cp-vocab vp" style="--a:#4bddbd;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/dɪˌnʌnsiˈeɪʃn/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Public criticism that strongly condemns someone or something.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">सार्वजनिक निंदा, आरोप</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">condemnation</span><span class="vp-tag syn">accusation</span><span class="vp-tag syn">censure</span><span class="vp-tag syn">criticism</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">praise</span><span class="vp-tag ant">endorsement</span><span class="vp-tag ant">approval</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The leader's <b>denunciation</b> of corruption won applause from the crowd. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A sharp <b>denunciation</b> of the cruel rule appeared on the front page.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her <b>denunciation</b> of the crime made the police act quickly.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/59.png" alt="Picture for the word denunciation"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The leader's <b>denunciation</b> of corruption won applause from the crowd.</p></div></div></div></div>
    `
  },
  119: {
    questext: "The public ____ of the scam forced the minister to resign.",
    options: ["endorsement", "praise", "denunciation", "applause"],
    correct: "3",
    exptext: "✅ Denunciation = strong public condemnation, which can force a resignation. 📌 De-nounce = declare bad. ❌ Endorsement would support him."
  },
  120: {
    type: "concept", icon: "⚖️", accent: "#c57426", pauseTimer: true,
    title: "Indictment",
    html: `
      <div class="cp-vocab vp" style="--a:#c57426;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɪnˈdaɪtmənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A formal written charge saying a person has committed a crime.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अभियोग, आरोप-पत्र</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">charge</span><span class="vp-tag syn">accusation</span><span class="vp-tag syn">allegation</span><span class="vp-tag syn">impeachment</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">acquittal</span><span class="vp-tag ant">exoneration</span><span class="vp-tag ant">vindication</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The court read out the <b>indictment</b> against the accused before the trial began. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The grand jury issued an <b>indictment</b> for fraud against the company head.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The report was a serious <b>indictment</b> of the failing school system.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/60.png" alt="Picture for the word indictment"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The court read out the <b>indictment</b> against the accused before the trial began.</p></div></div></div></div>
    `
  },
  121: {
    questext: "'अभियोग, औपचारिक आरोप-पत्र' के लिए सही शब्द कौन-सा है?",
    options: ["Reprieve", "Amnesty", "Remission", "Indictment"],
    correct: "4",
    exptext: "✅ Indictment = a formal charge of crime. 📌 Indict is pronounced 'indite' (in-dite). ❌ Amnesty is a pardon, the opposite."
  },
  122: {
    type: "concept", icon: "🗃️", accent: "#5331d8", pauseTimer: true,
    title: "Abeyance",
    html: `
      <div class="cp-vocab vp" style="--a:#5331d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/əˈbeɪəns/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A state of being put aside for some time and not active.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">निलंबन, स्थगन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">suspension</span><span class="vp-tag syn">dormancy</span><span class="vp-tag syn">postponement</span><span class="vp-tag syn">pause</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">activity</span><span class="vp-tag ant">continuation</span><span class="vp-tag ant">operation</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The project was held in <b>abeyance</b> until the funds were released.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The law remained in <b>abeyance</b> for years because no one enforced it.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">He kept his plans in <b>abeyance</b> while waiting for the exam result. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/61.png" alt="Picture for the word abeyance"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">He kept his plans in <b>abeyance</b> while waiting for the exam result.</p></div></div></div></div>
    `
  },
  123: {
    questext: "Choose the word closest in meaning to ABEYANCE.",
    options: ["Suspension", "Completion", "Rejection", "Launch"],
    correct: "1",
    exptext: "✅ Abeyance = temporary suspension. 📌 Abeyance = 'a-bay', put in the bay and wait. ❌ Rejection means refusing, not waiting."
  },
  124: {
    type: "concept", icon: "🌋", accent: "#58dd4b", pauseTimer: true,
    title: "Dormancy",
    html: `
      <div class="cp-vocab vp" style="--a:#58dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈdɔːrmənsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A time of being inactive, as if asleep, but able to wake later.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">निष्क्रियता, सुप्तावस्था</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">inactivity</span><span class="vp-tag syn">inertia</span><span class="vp-tag syn">hibernation</span><span class="vp-tag syn">abeyance</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">activity</span><span class="vp-tag ant">activeness</span><span class="vp-tag ant">growth</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The seeds stayed in <b>dormancy</b> until the first rains arrived.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">After years of <b>dormancy</b>, the volcano suddenly became active. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The club's <b>dormancy</b> ended when new members joined in the spring.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/62.png" alt="Picture for the word dormancy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">After years of <b>dormancy</b>, the volcano suddenly became active.</p></div></div></div></div>
    `
  },
  125: {
    questext: "The volcano's long ____ ended with a loud eruption last night.",
    options: ["activity", "dormancy", "growth", "progress"],
    correct: "2",
    exptext: "✅ Dormancy = a long inactive period before waking. 📌 Dorm = sleep, as in dormitory. ❌ Activity cannot end with an eruption."
  },
  126: {
    type: "concept", icon: "🚶", accent: "#c52663", pauseTimer: true,
    title: "Renegade",
    html: `
      <div class="cp-vocab vp" style="--a:#c52663;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈrɛnɪɡeɪd/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who leaves his group or side and joins the opposite one.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दल-बदलू, विद्रोही</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">traitor</span><span class="vp-tag syn">deserter</span><span class="vp-tag syn">turncoat</span><span class="vp-tag syn">apostate</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">loyalist</span><span class="vp-tag ant">patriot</span><span class="vp-tag ant">follower</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The general called the soldier a <b>renegade</b> after he joined the enemy.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The <b>renegade</b> leader broke away from his party and formed a rival group. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">In the film, a <b>renegade</b> detective ignores the rules to catch criminals.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/63.png" alt="Picture for the word renegade"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>renegade</b> leader broke away from his party and formed a rival group.</p></div></div></div></div>
    `
  },
  127: {
    questext: "Which word is closest in meaning to RENEGADE?",
    options: ["Patriot", "Loyalist", "Turncoat", "Follower"],
    correct: "3",
    exptext: "✅ A renegade abandons his side, like a turncoat. 📌 Re-negade: renounce his side. ❌ Loyalist stays faithful, the opposite."
  },
  128: {
    type: "concept", icon: "🏺", accent: "#31a2d8", pauseTimer: true,
    title: "Anthropology",
    html: `
      <div class="cp-vocab vp" style="--a:#31a2d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌænθrəˈpɒlədʒi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The study of human beings, their cultures and their past.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">मानव-विज्ञान, नृविज्ञान</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">ethnology</span><span class="vp-tag syn">ethnography</span><span class="vp-tag syn">human science</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">She chose <b>anthropology</b> to understand how tribes live and keep their customs.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The museum of <b>anthropology</b> displays tools used by early humans. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">His book on <b>anthropology</b> compares marriage customs in distant cultures.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/64.png" alt="Picture for the word anthropology"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The museum of <b>anthropology</b> displays tools used by early humans.</p></div></div></div></div>
    `
  },
  129: {
    questext: "ANTHROPOLOGY is the study of:",
    options: ["birds", "stars", "rocks and soil", "humans and their cultures"],
    correct: "4",
    exptext: "✅ Anthropos = human, logy = study. 📌 Anthro = man. ❌ Ornithology is the study of birds."
  },
  130: {
    type: "concept", icon: "🦊", accent: "#d8dd4b", pauseTimer: true,
    title: "Allegory",
    html: `
      <div class="cp-vocab vp" style="--a:#d8dd4b;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈælɪɡəri/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A story with a hidden meaning that teaches a moral or political idea.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">रूपक-कथा, प्रतीक-कथा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">parable</span><span class="vp-tag syn">fable</span><span class="vp-tag syn">symbolic tale</span><span class="vp-tag syn">analogy</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Orwell's Animal Farm is an <b>allegory</b> about power and greed.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The poem is an <b>allegory</b> in which the river stands for life. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Each character in the play is an <b>allegory</b> for a human weakness.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/65.png" alt="Picture for the word allegory"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The poem is an <b>allegory</b> in which the river stands for life.</p></div></div></div></div>
    `
  },
  131: {
    questext: "Which best describes an ALLEGORY?",
    options: ["A story with a hidden symbolic meaning", "A list of rules", "A news report", "A short speech"],
    correct: "1",
    exptext: "✅ An allegory carries a hidden moral or political meaning. 📌 Allo = other, agora = speak: speak otherwise. ❌ A news report states plain facts."
  },
  132: {
    type: "concept", icon: "🤲", accent: "#9c26c5", pauseTimer: true,
    title: "Clemency",
    html: `
      <div class="cp-vocab vp" style="--a:#9c26c5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈklɛmənsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Mercy shown by a person in power by giving a lighter punishment.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">दया, क्षमा</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">mercy</span><span class="vp-tag syn">leniency</span><span class="vp-tag syn">mildness</span><span class="vp-tag syn">forgiveness</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">cruelty</span><span class="vp-tag ant">harshness</span><span class="vp-tag ant">severity</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The judge showed <b>clemency</b> because the thief was a young first-time offender. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The prisoners begged the king for <b>clemency</b> before their sentence.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The new governor's <b>clemency</b> towards rebels earned him the people's love.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/66.png" alt="Picture for the word clemency"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The judge showed <b>clemency</b> because the thief was a young first-time offender.</p></div></div></div></div>
    `
  },
  133: {
    questext: "Choose the word OPPOSITE in meaning to CLEMENCY.",
    options: ["Mercy", "Harshness", "Leniency", "Forgiveness"],
    correct: "2",
    exptext: "✅ Clemency = mercy; harshness is its opposite. 📌 Clemency sounds like 'calm'. ❌ Leniency is a synonym."
  },
  134: {
    type: "concept", icon: "🔓", accent: "#31d87c", pauseTimer: true,
    title: "Parole",
    html: `
      <div class="cp-vocab vp" style="--a:#31d87c;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/pəˈroʊl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Early release of a prisoner on a promise of good behaviour.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पैरोल, सशर्त रिहाई</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">conditional release</span><span class="vp-tag syn">early release</span><span class="vp-tag syn">release on trust</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">imprisonment</span><span class="vp-tag ant">confinement</span><span class="vp-tag ant">detention</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The prisoner was freed on <b>parole</b> after serving seven years of his sentence. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">He must report to the police every week while he is on <b>parole</b>.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The board refused <b>parole</b> because he showed no change of heart.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/67.png" alt="Picture for the word parole"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The prisoner was freed on <b>parole</b> after serving seven years of his sentence.</p></div></div></div></div>
    `
  },
  135: {
    questext: "Parole allows a prisoner to be:",
    options: ["freed forever without any rule", "moved to a harsher jail", "given a death sentence", "released early under conditions"],
    correct: "4",
    exptext: "✅ Parole = conditional early release. 📌 Parole = French 'word', his word of honour. ❌ Option 1 ignores the conditions."
  },
  136: {
    type: "concept", icon: "🏛️", accent: "#dd624b", pauseTimer: true,
    title: "Oligarchy",
    html: `
      <div class="cp-vocab vp" style="--a:#dd624b;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈɒlɪɡɑːki/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A system where a small group of people holds all the power.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">अल्पतंत्र, गुटतंत्र</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">rule by few</span><span class="vp-tag syn">elite rule</span><span class="vp-tag syn">junta</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">democracy</span><span class="vp-tag ant">republic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">In an <b>oligarchy</b>, a handful of rich families decide what the country does. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Critics said the republic had turned into an <b>oligarchy</b> of powerful businessmen.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Ancient Sparta is often cited as an example of <b>oligarchy</b>.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/68.png" alt="Picture for the word oligarchy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">In an <b>oligarchy</b>, a handful of rich families decide what the country does.</p></div></div></div></div>
    `
  },
  137: {
    questext: "Oligarchy means rule by:",
    options: ["one king", "all citizens", "a few powerful people", "priests alone"],
    correct: "3",
    exptext: "✅ Oligarchy = rule by a few (oligos = few). 📌 Oligo = few. ❌ Rule by one king is monarchy or autocracy."
  },
  138: {
    type: "concept", icon: "🛐", accent: "#263bc5", pauseTimer: true,
    title: "Theocracy",
    html: `
      <div class="cp-vocab vp" style="--a:#263bc5;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/θiˈɒkrəsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A system of government ruled by religious leaders in God's name.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">धर्मतंत्र, धर्माधारित शासन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">religious rule</span><span class="vp-tag syn">clerical rule</span><span class="vp-tag syn">divine rule</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">secularism</span><span class="vp-tag ant">democracy</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">In a <b>theocracy</b>, priests make laws and claim to speak for God.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The old kingdom was a <b>theocracy</b> where the high priest was also the ruler. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Many nations today separate religion from the state and avoid <b>theocracy</b>.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/69.png" alt="Picture for the word theocracy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The old kingdom was a <b>theocracy</b> where the high priest was also the ruler.</p></div></div></div></div>
    `
  },
  139: {
    questext: "In a theocracy, the power is held by:",
    options: ["religious leaders", "the army", "the richest citizens", "the common people"],
    correct: "1",
    exptext: "✅ Theo = God, cracy = rule: rule by religious leaders. 📌 Theo = God. ❌ Rule by the army is a military regime."
  },
  140: {
    type: "concept", icon: "👤", accent: "#78d831", pauseTimer: true,
    title: "Autocracy",
    html: `
      <div class="cp-vocab vp" style="--a:#78d831;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɔːˈtɒkrəsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A system where one person has complete power over everyone.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">निरंकुशतंत्र, एकतंत्र</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">dictatorship</span><span class="vp-tag syn">despotism</span><span class="vp-tag syn">tyranny</span><span class="vp-tag syn">absolutism</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">democracy</span><span class="vp-tag ant">republic</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">Under <b>autocracy</b>, one ruler's word becomes the law and no one may object.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The people overthrew the <b>autocracy</b> and elected a government of their own. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Fear and silence are the tools of <b>autocracy</b> in every age.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/70.png" alt="Picture for the word autocracy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The people overthrew the <b>autocracy</b> and elected a government of their own.</p></div></div></div></div>
    `
  },
  141: {
    questext: "Which word is a synonym of AUTOCRACY?",
    options: ["Democracy", "Despotism", "Republic", "Meritocracy"],
    correct: "2",
    exptext: "✅ Autocracy = rule by one person, like despotism. 📌 Auto = self, cracy = rule. ❌ Democracy is rule by the people."
  },
  142: {
    type: "concept", icon: "🔐", accent: "#dd4bb4", pauseTimer: true,
    title: "Cipher",
    html: `
      <div class="cp-vocab vp" style="--a:#dd4bb4;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsaɪfər/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A secret way of writing, or a code used to hide a message.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">गुप्त लिपि, कूट-संकेत</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">code</span><span class="vp-tag syn">cryptogram</span><span class="vp-tag syn">secret writing</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">plain text</span><span class="vp-tag ant">open message</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The spy sent his message in a <b>cipher</b> that only his chief could read. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Students struggled to break the <b>cipher</b> and read the hidden note.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Without the key, the old <b>cipher</b> looked like a row of strange marks.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/71.png" alt="Picture for the word cipher"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The spy sent his message in a <b>cipher</b> that only his chief could read.</p></div></div></div></div>
    `
  },
  143: {
    questext: "'गुप्त लिपि, कूट-संकेत' के लिए सही शब्द कौन-सा है?",
    options: ["Epistle", "Maxim", "Allegory", "Cipher"],
    correct: "4",
    exptext: "✅ Cipher = a secret code. 📌 Cipher also means zero, a hidden value. ❌ Epistle is a letter."
  },
  144: {
    type: "concept", icon: "✉️", accent: "#26c5c4", pauseTimer: true,
    title: "Epistle",
    html: `
      <div class="cp-vocab vp" style="--a:#26c5c4;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ɪˈpɪsl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A long, formal letter, especially one that teaches or instructs.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">पत्र, औपचारिक चिट्ठी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">letter</span><span class="vp-tag syn">missive</span><span class="vp-tag syn">message</span><span class="vp-tag syn">communication</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-none">—</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The saint sent a long <b>epistle</b> to his followers across the sea. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">The king's <b>epistle</b> reached the governor after a month at sea.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her thoughtful <b>epistle</b> explained why she had left the city.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/72.png" alt="Picture for the word epistle"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The saint sent a long <b>epistle</b> to his followers across the sea.</p></div></div></div></div>
    `
  },
  145: {
    questext: "Which word is NOT a synonym of EPISTLE?",
    options: ["Letter", "Missive", "Soliloquy", "Message"],
    correct: "3",
    exptext: "✅ A soliloquy is a speech to oneself, not a letter. 📌 Epistle = letter sent. ❌ Missive is another word for a letter."
  },
  146: {
    type: "concept", icon: "🌋", accent: "#d8a631", pauseTimer: true,
    title: "Diatribe",
    html: `
      <div class="cp-vocab vp" style="--a:#d8a631;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈdaɪətraɪb/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A long, angry speech or writing that attacks someone or something.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">तीखा भाषण, कटु आलोचना</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">tirade</span><span class="vp-tag syn">harangue</span><span class="vp-tag syn">rant</span><span class="vp-tag syn">invective</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">praise</span><span class="vp-tag ant">eulogy</span><span class="vp-tag ant">compliment</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The coach launched into a <b>diatribe</b> against the careless players.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">His angry <b>diatribe</b> against the government lasted over an hour. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">She sat patiently through her neighbour's <b>diatribe</b> about loud music.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/73.png" alt="Picture for the word diatribe"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">His angry <b>diatribe</b> against the government lasted over an hour.</p></div></div></div></div>
    `
  },
  147: {
    questext: "Choose the word closest in meaning to DIATRIBE.",
    options: ["Tirade", "Eulogy", "Compliment", "Praise"],
    correct: "1",
    exptext: "✅ A diatribe is a bitter verbal attack, i.e. a tirade. 📌 Diatribe = dia + tribe, tribe-fighting talk. ❌ Eulogy is praise."
  },
  148: {
    type: "concept", icon: "💰", accent: "#864bdd", pauseTimer: true,
    title: "Plutocracy",
    html: `
      <div class="cp-vocab vp" style="--a:#864bdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/pluːˈtɒkrəsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A system where rich people hold the power in a country.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">धनिकतंत्र, धनिकों का शासन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">rule of the rich</span><span class="vp-tag syn">rule by wealth</span><span class="vp-tag syn">oligarchy</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">democracy</span><span class="vp-tag ant">meritocracy</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">In a <b>plutocracy</b>, money decides who makes the laws.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Critics feared the country was sliding into a <b>plutocracy</b> ruled by billionaires. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The old republic became a <b>plutocracy</b> when only the rich could hold office.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/74.png" alt="Picture for the word plutocracy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Critics feared the country was sliding into a <b>plutocracy</b> ruled by billionaires.</p></div></div></div></div>
    `
  },
  149: {
    questext: "In a plutocracy, the power belongs to the:",
    options: ["learned", "wealthy", "clergy", "army"],
    correct: "2",
    exptext: "✅ Pluto = wealth, cracy = rule: rule by the wealthy. 📌 Pluto, god of wealth. ❌ Clergy rule would be a theocracy."
  },
  150: {
    type: "concept", icon: "🏆", accent: "#26c538", pauseTimer: true,
    title: "Meritocracy",
    html: `
      <div class="cp-vocab vp" style="--a:#26c538;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌmɛrɪˈtɒkrəsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A system where people rise because of their ability and effort.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">योग्यतातंत्र, प्रतिभा-आधारित शासन</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">rule by merit</span><span class="vp-tag syn">talent-based system</span><span class="vp-tag syn">rule of the able</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">nepotism</span><span class="vp-tag ant">favouritism</span><span class="vp-tag ant">cronyism</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">In a <b>meritocracy</b>, the best candidate gets the job, not the boss's relative. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Competitive exams are meant to build a <b>meritocracy</b> in public service.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The firm's <b>meritocracy</b> rewarded hard-working juniors with fast promotions.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/75.png" alt="Picture for the word meritocracy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">In a <b>meritocracy</b>, the best candidate gets the job, not the boss's relative.</p></div></div></div></div>
    `
  },
  151: {
    questext: "Which is the opposite of a MERITOCRACY?",
    options: ["Talent", "Hard work", "Fairness", "Nepotism"],
    correct: "4",
    exptext: "✅ Nepotism gives jobs to relatives instead of the best, the opposite of merit. 📌 Merit + cracy = rule of merit. ❌ Talent and hard work support it."
  },
  152: {
    type: "concept", icon: "👑", accent: "#d8314f", pauseTimer: true,
    title: "Aristocracy",
    html: `
      <div class="cp-vocab vp" style="--a:#d8314f;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˌærɪˈstɒkrəsi/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A ruling class made up of people of noble birth and high rank.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">कुलीनतंत्र, अभिजात वर्ग</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">nobility</span><span class="vp-tag syn">gentry</span><span class="vp-tag syn">upper class</span><span class="vp-tag syn">elite</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">commoners</span><span class="vp-tag ant">proletariat</span><span class="vp-tag ant">working class</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>aristocracy</b> lived in grand palaces while peasants worked their lands. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Members of the <b>aristocracy</b> were once given titles such as duke and earl.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">The revolution stripped the <b>aristocracy</b> of its land and power.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/76.png" alt="Picture for the word aristocracy"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>aristocracy</b> lived in grand palaces while peasants worked their lands.</p></div></div></div></div>
    `
  },
  153: {
    questext: "Choose the word closest in meaning to ARISTOCRACY.",
    options: ["Nobility", "Peasantry", "Working class", "Commoners"],
    correct: "1",
    exptext: "✅ Aristocracy = the noble class. 📌 Aristos = best, cracy = rule. ❌ Peasantry and commoners are ordinary people."
  },
  154: {
    type: "concept", icon: "🗣️", accent: "#4b8fdd", pauseTimer: true,
    title: "Rhetoric",
    html: `
      <div class="cp-vocab vp" style="--a:#4b8fdd;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈrɛtərɪk/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">The art of speaking or writing in a way that persuades people.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">वाक्पटुता, भाषण-कला</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">oratory</span><span class="vp-tag syn">eloquence</span><span class="vp-tag syn">elocution</span><span class="vp-tag syn">persuasion</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">plain speech</span><span class="vp-tag ant">silence</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The leader's powerful <b>rhetoric</b> moved the crowd to tears and cheers. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">His speech was full of <b>rhetoric</b> but had no real plan for the city.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Students of law learn <b>rhetoric</b> to argue their cases with force.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/77.png" alt="Picture for the word rhetoric"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The leader's powerful <b>rhetoric</b> moved the crowd to tears and cheers.</p></div></div></div></div>
    `
  },
  155: {
    questext: "Rhetoric is the art of:",
    options: ["cooking food", "drawing maps", "persuasive speaking and writing", "counting numbers"],
    correct: "3",
    exptext: "✅ Rhetoric = the art of persuading with words. 📌 Rhetoric → orator. ❌ Cartography is drawing maps."
  },
  156: {
    type: "concept", icon: "🙇", accent: "#9fc526", pauseTimer: true,
    title: "Sycophant",
    html: `
      <div class="cp-vocab vp" style="--a:#9fc526;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">noun</span><span translate="no" class="vp-ipa">/ˈsɪkəfənt/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">A person who praises powerful people too much to gain favour.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">चापलूस, ख़ुशामदी</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">flatterer</span><span class="vp-tag syn">toady</span><span class="vp-tag syn">yes-man</span><span class="vp-tag syn">fawner</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">critic</span><span class="vp-tag ant">detractor</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The minister was surrounded by <b>sycophants</b> who agreed with every word he said.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">A <b>sycophant</b> laughs at the boss's jokes even when they are not funny. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">She refused to be a <b>sycophant</b> and gave her honest opinion to the director.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/78.png" alt="Picture for the word sycophant"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">A <b>sycophant</b> laughs at the boss's jokes even when they are not funny.</p></div></div></div></div>
    `
  },
  157: {
    questext: "Which word is NOT a synonym of SYCOPHANT?",
    options: ["Toady", "Critic", "Flatterer", "Yes-man"],
    correct: "2",
    exptext: "✅ A critic finds faults, while a sycophant only flatters. 📌 Sycophant = sugar-coated talk. ❌ Toady and yes-man both please the powerful."
  },
  158: {
    type: "concept", icon: "🧱", accent: "#cf31d8", pauseTimer: true,
    title: "Obdurate",
    html: `
      <div class="cp-vocab vp" style="--a:#cf31d8;--on:#fff"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ˈɒbdjʊrət/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Stubborn and refusing to change your mind or feelings.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">हठी, अड़ियल</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">stubborn</span><span class="vp-tag syn">obstinate</span><span class="vp-tag syn">adamant</span><span class="vp-tag syn">unyielding</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">flexible</span><span class="vp-tag ant">yielding</span><span class="vp-tag ant">compliant</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The <b>obdurate</b> manager refused to change his decision despite every request. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Neither side was ready to compromise, as both remained <b>obdurate</b> in the talks.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Her <b>obdurate</b> heart did not soften even at the child's tears.</span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/79.png" alt="Picture for the word obdurate"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">The <b>obdurate</b> manager refused to change his decision despite every request.</p></div></div></div></div>
    `
  },
  159: {
    questext: "Choose the word OPPOSITE in meaning to OBDURATE.",
    options: ["Obstinate", "Adamant", "Compliant", "Unyielding"],
    correct: "3",
    exptext: "✅ Obdurate means stubborn; compliant means ready to agree. 📌 Ob-DURATE = DURable like rock. ❌ Obstinate is a synonym."
  },
  160: {
    type: "concept", icon: "🌈", accent: "#4bddab", pauseTimer: true,
    title: "Ephemeral",
    html: `
      <div class="cp-vocab vp" style="--a:#4bddab;--on:#111"><div class="vp-grid"><div class="vp-left"><div class="vp-meta"><span class="cp-pos vp-pos">adjective</span><span translate="no" class="vp-ipa">/ɪˈfɛmərəl/</span></div><div class="vp-two"><div class="vp-def"><div class="vp-lbl">Meaning</div><p class="vp-en">Lasting for a very short time only.</p></div><div class="vp-def"><div class="vp-lbl">हिंदी अर्थ</div><p class="vp-hi" lang="hi">क्षणभंगुर, अल्पकालिक</p></div></div><div class="vp-two"><div class="vp-pane"><div class="vp-lbl syn">✅ Synonyms</div><div class="vp-tags"><span class="vp-tag syn">transient</span><span class="vp-tag syn">fleeting</span><span class="vp-tag syn">momentary</span><span class="vp-tag syn">short-lived</span></div></div><div class="vp-pane"><div class="vp-lbl ant">↔️ Antonyms</div><div class="vp-tags"><span class="vp-tag ant">eternal</span><span class="vp-tag ant">permanent</span><span class="vp-tag ant">lasting</span></div></div></div><div class="vp-use"><div class="vp-lbl">✍️ Usage — 3 sentences</div><div class="vp-s"><span class="vp-n">1</span><span class="vp-t">The beauty of a rainbow is <b>ephemeral</b>; it fades within minutes.</span></div><div class="vp-s"><span class="vp-n">2</span><span class="vp-t">Fame in films can be <b>ephemeral</b>, as audiences quickly move on.</span></div><div class="vp-s"><span class="vp-n">3</span><span class="vp-t">Morning dew is <b>ephemeral</b> and vanishes as soon as the sun rises. <span class="vp-mark" title="shown in the picture">🖼️</span></span></div></div></div><div class="vp-right"><div class="vp-frame"><img src="images/English_Comprehension/Vocabulary/Set_3/80.png" alt="Picture for the word ephemeral"></div><div class="vp-cap"><div class="vp-cap-lbl"><span class="vp-cap-ico">🖼️</span>Sentence shown in the picture</div><p class="vp-cap-txt">Morning dew is <b>ephemeral</b> and vanishes as soon as the sun rises.</p></div></div></div></div>
    `
  },
  161: {
    questext: "Social media fame is often ____; it vanishes as quickly as it arrives.",
    options: ["permanent", "eternal", "lasting", "ephemeral"],
    correct: "4",
    exptext: "✅ Ephemeral = lasting a very short time. 📌 Ephemera = a one-day fly. ❌ Permanent and eternal are opposites."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/English_Comprehension/Vocabulary/Set_3/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an open English dictionary, a fountain pen, and a few wooden letter tiles on a desk" },
  "images/English_Comprehension/Vocabulary/Set_3/1.png": { t: "fig", about: "Scene from the sentence: \"A semiotic study of road signs shows how colours quickly tell drivers what to do.\" — Show: a driver at a crossroads looking at colourful traffic signs with arrows and pictograms, thoughtful face, sunny street. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/2.png": { t: "fig", about: "Scene from the sentence: \"The hotel room was immaculate, with fresh sheets and not a speck of dust.\" — Show: a pleased guest entering a bright hotel room with a perfectly made bed, shining floor and fresh flowers. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/3.png": { t: "fig", about: "Scene from the sentence: \"Floppy disks are now obsolete, as everyone saves files on pen drives or clouds.\" — Show: a puzzled boy holding an old floppy disk beside a modern laptop and a small pen drive on a desk. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/4.png": { t: "fig", about: "Scene from the sentence: \"The captain, a born martinet, inspected every button on the soldiers' uniforms.\" — Show: a stern army captain closely inspecting the shining buttons of a stiff soldier on a parade ground. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/5.png": { t: "fig", about: "Scene from the sentence: \"The maverick chef ignored every recipe and invented dishes nobody had imagined.\" — Show: a chef in a busy kitchen tossing unusual ingredients into a pan while other chefs follow recipe books. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/6.png": { t: "fig", about: "Scene from the sentence: \"It is customary in India to remove shoes before entering a home.\" — Show: a family at a doorway with shoes lined up outside and a guest greeted with folded hands. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/7.png": { t: "fig", about: "Scene from the sentence: \"His orthodox family does not allow any change in the old wedding rituals.\" — Show: elderly grandparents in traditional clothes sternly watching a young couple, ritual items on a table. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/8.png": { t: "fig", about: "Scene from the sentence: \"Historians remember him as an iconoclast who shattered the old ideas of art.\" — Show: a bold painter smashing a cracked classical plaster bust with a hammer while old art critics gasp. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/9.png": { t: "fig", about: "Scene from the sentence: \"A conformist at school, he wore the same style and said what others said.\" — Show: rows of identical students in the same uniform and posture, one boy in the centre copying his neighbours. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/10.png": { t: "fig", about: "Scene from the sentence: \"She lived a bohemian life, painting by day and singing in small cafes by night.\" — Show: a woman painter in a cluttered attic studio with colourful scarves, an easel and a guitar at dusk. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/11.png": { t: "fig", about: "Scene from the sentence: \"All students must conform to the school rules about uniform and timing.\" — Show: school students in a line at the gate while a guard checks their ties and shoes. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/12.png": { t: "fig", about: "Scene from the sentence: \"Half the patients got the real drug and half got a placebo without knowing.\" — Show: a nurse handing small white pills to two groups of patients in a clinic while a researcher takes notes. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/13.png": { t: "fig", about: "Scene from the sentence: \"The nurse gave palliative care to ease the old man's pain at home.\" — Show: a nurse gently adjusting a pillow and holding the hand of an elderly man in a calm bedroom. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/14.png": { t: "fig", about: "Scene from the sentence: \"Soft music was an anodyne for her tired mind after the exam.\" — Show: a tired student lying with closed eyes listening to soft music through headphones in a calm evening room. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/15.png": { t: "fig", about: "Scene from the sentence: \"The old well has fallen into desuetude since water pipes reached the village.\" — Show: a dry old stone well covered with creepers and moss in a quiet village, a modern tap in the background. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/16.png": { t: "fig", about: "Scene from the sentence: \"The teacher's illness caused a month-long hiatus in our classes.\" — Show: a quiet empty classroom with chairs stacked, a wall calendar with crossed-out days and sunlight through the windows. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/17.png": { t: "fig", about: "Scene from the sentence: \"The ancient city sank into oblivion after its river dried up.\" — Show: a ruined ancient city half buried in sand beside a dry riverbed, a lone traveller looking at it. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/18.png": { t: "fig", about: "Scene from the sentence: \"During the interregnum, the council ran the government until the new leader arrived.\" — Show: an empty royal throne in a grand hall with council members arguing around it and a crown on a cushion. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/19.png": { t: "fig", about: "Scene from the sentence: \"The school choir sang a soft elegy at the funeral of the old teacher.\" — Show: a children's choir in black singing softly at a funeral with candles and a garlanded photo frame. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/20.png": { t: "fig", about: "Scene from the sentence: \"The principal delivered an encomium praising the topper's hard work and honesty.\" — Show: a principal on stage with a microphone and a medal applauding a proud girl topper, students clapping. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/21.png": { t: "fig", about: "Scene from the sentence: \"Alone on the stage, the actor delivered a long soliloquy about lost love.\" — Show: a lone actor on a dim stage under a single spotlight speaking with a hand on his chest, empty theatre seats. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/22.png": { t: "fig", about: "Scene from the sentence: \"A bitter schism divided the party into two groups after the election.\" — Show: a large group of people in a hall splitting into two angry sides facing each other with a wide gap between them. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/23.png": { t: "fig", about: "Scene from the sentence: \"The leader's apostasy shocked his followers, as he left the party he founded.\" — Show: a politician removing his party scarf and walking out of a rally while stunned supporters watch. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/24.png": { t: "fig", about: "Scene from the sentence: \"Saying the Earth moves around the Sun was once called heresy.\" — Show: a scientist in an old robe pointing to a model of the Sun with circling planets while stern elders frown. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/25.png": { t: "fig", about: "Scene from the sentence: \"The bigot shouted at his neighbour only because of the neighbour's language.\" — Show: an angry man shouting over a fence at a calm neighbour in traditional clothes, tense mood. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/26.png": { t: "fig", about: "Scene from the sentence: \"The villagers called him a heretic for refusing to follow their old rituals.\" — Show: a lone man standing before an angry village crowd that points at him near a festival fire. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/27.png": { t: "fig", about: "Scene from the sentence: \"He took an analgesic to ease his headache before the long meeting.\" — Show: a man at an office desk holding his forehead with a glass of water and a tablet strip, relieved expression. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/28.png": { t: "fig", about: "Scene from the sentence: \"Under the sedative, the frightened patient slowly became calm and quiet.\" — Show: a patient in a hospital bed growing calm with drooping eyes, a nurse adjusting a drip, soft night light. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/29.png": { t: "fig", about: "Scene from the sentence: \"The vet used a tranquilizer to calm the frightened elephant before moving it.\" — Show: a veterinarian giving an injection to a calm elephant in a forest clearing with rangers nearby. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/30.png": { t: "fig", about: "Scene from the sentence: \"Despite his wealth, the prince suffered from ennui and wished for adventure.\" — Show: a bored young prince slouching on a grand chair in a rich palace hall, chin on hand, yawning. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/31.png": { t: "fig", about: "Scene from the sentence: \"Bears fall into a deep torpor during the cold winter months.\" — Show: a brown bear curled up asleep inside a snowy cave while snow falls outside. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/32.png": { t: "fig", about: "Scene from the sentence: \"The tedium of copying long lists made the clerk yawn all afternoon.\" — Show: a clerk yawning while copying from a tall pile of papers at a desk with a wall clock showing late afternoon. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/33.png": { t: "fig", about: "Scene from the sentence: \"A weary smile crossed the doctor's face after the long night shift.\" — Show: a doctor in scrubs with a tired smile sitting in a hospital corridor at dawn holding a cup of tea. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/34.png": { t: "fig", about: "Scene from the sentence: \"The cat was wary of the new dog and stayed near the door.\" — Show: a cat crouched near a doorway watching a large dog enter a living room cautiously. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/35.png": { t: "fig", about: "Scene from the sentence: \"The patient's cancer went into remission after months of careful treatment.\" — Show: a smiling patient in a hospital room holding a report while the doctor and family smile with relief. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/36.png": { t: "fig", about: "Scene from the sentence: \"The cool evening breeze was a welcome reprieve from the burning heat.\" — Show: a sweating man resting under a tree as a cool evening breeze moves the leaves at sunset. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/37.png": { t: "fig", about: "Scene from the sentence: \"Citizens who declare hidden income under the amnesty scheme will not face jail.\" — Show: a relieved man handing documents to a tax officer who stamps them at an office counter. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/38.png": { t: "fig", about: "Scene from the sentence: \"His perfidy shocked the team, as he sold their secret plans to rivals.\" — Show: a man secretly handing a sealed envelope to a stranger in a dark alley while a colleague watches shocked from a window. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/39.png": { t: "fig", about: "Scene from the sentence: \"Leonardo da Vinci was a polymath: a painter, an inventor and a scientist.\" — Show: a Renaissance-style scholar at a desk surrounded by paintings, sketches of flying machines, a globe and a violin. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/40.png": { t: "fig", about: "Scene from the sentence: \"The child prodigy played the piano on stage when she was only six.\" — Show: a six-year-old girl playing a grand piano on a stage while an amazed adult audience watches. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/41.png": { t: "fig", about: "Scene from the sentence: \"Millions admired the dissident who stood alone against the powerful regime.\" — Show: a lone man holding a lantern standing bravely in a town square before a line of grim officials. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/42.png": { t: "fig", about: "Scene from the sentence: \"Grandmother told us a tale of a clever fox every night.\" — Show: a grandmother telling a story to wide-eyed children sitting around a lamp in a cosy room. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/43.png": { t: "fig", about: "Scene from the sentence: \"The office still used antediluvian machines that were slow and noisy.\" — Show: an old office full of huge noisy typewriters and machines with bored workers. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/44.png": { t: "fig", about: "Scene from the sentence: \"The old teacher lived by the maxim that hard work beats talent.\" — Show: an old teacher smiling at his desk while a few students listen to him in a sunny classroom. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/45.png": { t: "fig", about: "Scene from the sentence: \"A political pundit explained the election result on the television news.\" — Show: a well-dressed commentator speaking in a TV studio with unlabeled bar charts glowing behind him. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/46.png": { t: "fig", about: "Scene from the sentence: \"The neighbour was a meddler who gave advice about everyone's family matters.\" — Show: a nosy neighbour leaning over a garden fence listening to a family's conversation. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/47.png": { t: "fig", about: "Scene from the sentence: \"The guard stopped the interloper who tried to join the private party.\" — Show: a guard stopping a casually dressed man at the entrance of an elegant party. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/48.png": { t: "fig", about: "Scene from the sentence: \"The epicure sent back the dish because the sauce lacked balance.\" — Show: a refined gentleman in a restaurant tasting a spoonful from a dish with a thoughtful frown while a waiter waits. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/49.png": { t: "fig", about: "Scene from the sentence: \"The sybarite lived in a palace with silk beds and a personal chef.\" — Show: a man reclining on silk cushions in a luxurious palace room while a chef serves platters. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/50.png": { t: "fig", about: "Scene from the sentence: \"The hedonist spent his whole salary on parties and holidays every month.\" — Show: a happy young man at a lavish party with dancing friends and colourful drinks. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/51.png": { t: "fig", about: "Scene from the sentence: \"Thousands of revelers filled the streets on the night of the festival.\" — Show: crowds of people dancing in a festival street under hanging lanterns at night. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/52.png": { t: "fig", about: "Scene from the sentence: \"The king, a known glutton, ordered a feast of twenty dishes for himself.\" — Show: a plump king at a long banquet table piled with twenty dishes, reaching for more food. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/53.png": { t: "fig", about: "Scene from the sentence: \"The aesthete spent hours in the gallery admiring a single painting.\" — Show: a person standing before a large abstract painting in a quiet gallery, studying it closely in soft light. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/54.png": { t: "fig", about: "Scene from the sentence: \"A true art connoisseur, he knew every painter in the museum by style.\" — Show: a man in a suit holding a wine glass up to the light in a cellar, studying its colour. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/55.png": { t: "fig", about: "Scene from the sentence: \"Divers explored the dark ocean abyss where sunlight never reaches.\" — Show: scuba divers with torches descending into a dark deep ocean trench with faint blue light. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/56.png": { t: "fig", about: "Scene from the sentence: \"The climbers tied a rope to cross the dangerous crevasse safely.\" — Show: mountaineers roped together crossing a blue-ice crack on a glacier with snowy peaks behind. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/57.png": { t: "fig", about: "Scene from the sentence: \"Tourists took photos from the bridge over the narrow gorge.\" — Show: tourists on a bridge taking photos of a deep narrow rocky gorge with a river far below. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/58.png": { t: "fig", about: "Scene from the sentence: \"The committee passed a motion of censure against the careless official.\" — Show: committee members at a table raising hands to vote while an official bows his head, stern faces. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/59.png": { t: "fig", about: "Scene from the sentence: \"The leader's denunciation of corruption won applause from the crowd.\" — Show: a leader at a podium pointing firmly while a large crowd claps in an open ground with plain flags. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/60.png": { t: "fig", about: "Scene from the sentence: \"The court read out the indictment against the accused before the trial began.\" — Show: a courtroom where a judge reads papers aloud, an accused stands, lawyers sit around. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/61.png": { t: "fig", about: "Scene from the sentence: \"He kept his plans in abeyance while waiting for the exam result.\" — Show: an anxious young man at a desk with his plans papers put away in a drawer, waiting beside his phone. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/62.png": { t: "fig", about: "Scene from the sentence: \"After years of dormancy, the volcano suddenly became active.\" — Show: a green-sided volcano with a thin wisp of smoke, villagers farming peacefully below. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/63.png": { t: "fig", about: "Scene from the sentence: \"The renegade leader broke away from his party and formed a rival group.\" — Show: a man walking out of a group meeting at a table through a door while his colleagues stare angrily. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/64.png": { t: "fig", about: "Scene from the sentence: \"The museum of anthropology displays tools used by early humans.\" — Show: a museum hall with glass cases of ancient stone tools and pottery while a student sketches. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/65.png": { t: "fig", about: "Scene from the sentence: \"The poem is an allegory in which the river stands for life.\" — Show: a calm painterly landscape with a river and a small boat carrying a lone traveller, symbolic mood. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/66.png": { t: "fig", about: "Scene from the sentence: \"The judge showed clemency because the thief was a young first-time offender.\" — Show: a judge looking kindly down at a young man standing with folded hands in a courtroom. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/67.png": { t: "fig", about: "Scene from the sentence: \"The prisoner was freed on parole after serving seven years of his sentence.\" — Show: a man leaving prison gates carrying a small bag while his family waits with open arms. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/68.png": { t: "fig", about: "Scene from the sentence: \"In an oligarchy, a handful of rich families decide what the country does.\" — Show: a few well-dressed people deciding at a large table while ordinary people wait outside a window. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/69.png": { t: "fig", about: "Scene from the sentence: \"The old kingdom was a theocracy where the high priest was also the ruler.\" — Show: a high priest in robes seated on a throne in a temple hall giving orders to officials. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/70.png": { t: "fig", about: "Scene from the sentence: \"The people overthrew the autocracy and elected a government of their own.\" — Show: people celebrating in a city square as a large stern statue of a ruler is lowered by cranes. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/71.png": { t: "fig", about: "Scene from the sentence: \"The spy sent his message in a cipher that only his chief could read.\" — Show: a man at a candlelit desk studying a coded paper of strange marks with a magnifying glass, long shadows. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/72.png": { t: "fig", about: "Scene from the sentence: \"The saint sent a long epistle to his followers across the sea.\" — Show: a monk writing a long letter with a quill by candlelight in a simple stone cell. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/73.png": { t: "fig", about: "Scene from the sentence: \"His angry diatribe against the government lasted over an hour.\" — Show: an angry man on a platform ranting with a clenched fist at a hall of tired listeners. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/74.png": { t: "fig", about: "Scene from the sentence: \"Critics feared the country was sliding into a plutocracy ruled by billionaires.\" — Show: a few rich men in suits at a big table stacked with gold coins, ordinary citizens watching from outside. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/75.png": { t: "fig", about: "Scene from the sentence: \"In a meritocracy, the best candidate gets the job, not the boss's relative.\" — Show: an interview panel shaking hands with a confident young candidate who is selected, other candidates clapping. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/76.png": { t: "fig", about: "Scene from the sentence: \"The aristocracy lived in grand palaces while peasants worked their lands.\" — Show: richly dressed nobles at a palace ball while peasants watch from outside the gate. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/77.png": { t: "fig", about: "Scene from the sentence: \"The leader's powerful rhetoric moved the crowd to tears and cheers.\" — Show: a speaker with a raised hand at a podium moving a crowd at an outdoor rally. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/78.png": { t: "fig", about: "Scene from the sentence: \"A sycophant laughs at the boss's jokes even when they are not funny.\" — Show: a smiling man clapping at his boss's weak joke in an office meeting while the boss beams and colleagues roll their eyes. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/79.png": { t: "fig", about: "Scene from the sentence: \"The obdurate manager refused to change his decision despite every request.\" — Show: a stern manager with crossed arms shaking his head while employees plead at his desk. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." },
  "images/English_Comprehension/Vocabulary/Set_3/80.png": { t: "fig", about: "Scene from the sentence: \"Morning dew is ephemeral and vanishes as soon as the sun rises.\" — Show: glittering dewdrops on a green leaf in early morning light as the sun rises. One clean wide 16:9 illustration, modern editorial style, soft lighting. No text, letters, captions or speech bubbles in the image." }
});

/* CHANGE LOG
   - Handwritten spellings read as: Semiostic = semiotic, Grevasse = crevasse, Repriere = reprieve, Sybarik = sybarite.
   - Repeated words in your list (maverick, sybarite, apostasy) are taught only once.
   - Crossed-out words were skipped.
   - Three extra tough SSC-level words added by request: sycophant, obdurate, ephemeral.
*/