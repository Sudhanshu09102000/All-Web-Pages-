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
    return "Create a 16:9 image, 1200×675 px: a clean flat vector diagram on a dark navy background. " + d + " Use very few labels in exact short English, VERY LARGE bold text, thick lines and simple shapes, so it stays readable when shown small (about 420 px wide).";
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
    ".cpm-cmd{display:flex;align-items:center;gap:8px;width:100%;max-width:100%;padding:6px 6px 6px 12px;border-radius:12px;background:linear-gradient(180deg,rgba(2,6,23,.88),rgba(10,16,40,.88));border:1px solid rgba(246,220,149,.38);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 8px 18px -10px rgba(2,6,23,.9)}",
    ".cpm-cmd-p{flex:none;color:#34d399!important;font-weight:800;font-size:12px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace!important;user-select:none;-webkit-user-select:none}",
    ".cpm-cmd-t{flex:1;min-width:0;text-align:left;color:#e6edf8!important;font-size:10.5px;line-height:1.45;word-break:break-all;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace!important;background:transparent!important;border:0!important;padding:0!important}",
    ".cpm-cmd-t b{color:#f6dc95!important;font-weight:700}",
    ".cpm-cmd-b{flex:none;display:grid!important;place-items:center;width:32px;height:32px;padding:0!important;border-radius:9px;cursor:pointer;color:#f6dc95!important;background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.03))!important;border:1px solid rgba(246,220,149,.45)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.12);transition:transform .15s,filter .15s,background .15s}",
    ".cpm-cmd-b svg{width:16px;height:16px;pointer-events:none}",
    ".cpm-cmd-b *{pointer-events:none}",
    ".cpm-cmd-b:hover{transform:translateY(-1px);filter:brightness(1.25)}",
    ".cpm-cmd-b:active{transform:scale(.92)}",
    ".cpm-cmd-b:focus-visible{outline:2px solid #f6dc95;outline-offset:2px}",
    ".cpm-cmd-b.ok{color:#fff!important;background:linear-gradient(135deg,#059669,#34d399)!important;border-color:rgba(255,255,255,.35)!important}",
    ".cpm-cmd-b.err{color:#fff!important;background:linear-gradient(135deg,#d97706,#ef4444)!important;border-color:rgba(255,255,255,.35)!important}",
    ".cpm-tight .cpm-cmd{padding:4px 4px 4px 10px}.cpm-tight .cpm-cmd-b{width:28px;height:28px}",
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
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-cmd{background:#f3f4f6!important;background-color:#f3f4f6!important;border:1px solid #000!important;box-shadow:none!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-cmd-p{color:#166534!important;-webkit-text-fill-color:#166534!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-cmd-b{background:#000!important;background-color:#000!important;border:1px solid #000!important;box-shadow:none!important;color:#fff!important;-webkit-text-fill-color:#fff!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-cmd-b *{color:#fff!important;-webkit-text-fill-color:#fff!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-cmd-b.ok{background:#166534!important;background-color:#166534!important;border-color:#166534!important}",
    "html.lite-mode :is(#conceptBox,#ytStudio,body) .cpm .cpm-cmd-b.err{background:#b91c1c!important;background-color:#b91c1c!important;border-color:#b91c1c!important}",
    "@media (max-width:480px){.cpm{width:calc(100% - 16px);padding:14px 12px 13px;border-radius:18px}.cpm-title{font-size:13.5px}.cpm-path{font-size:10.5px}.cpm-cmd-t{font-size:10px}}",
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

  var CMD_ST = { idle: [ICON_COPY, ""], ok: [ICON_OK, " ok"], err: [ICON_WARN, " err"] };
  function setCmdBtn(b, st) {
    var x = CMD_ST[st];
    b.className = "cpm-cmd-b" + x[1];
    b.innerHTML = x[0];
    b.title = st === "ok" ? "Copied!" : "Copy command";
    b.setAttribute("aria-label", b.title);
    clearTimeout(b._t);
    if (st !== "idle") b._t = setTimeout(function () { setCmdBtn(b, "idle"); }, st === "ok" ? 1800 : 3500);
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
    var dir = parts.length > 1 ? parts.slice(0, -1).join("/") : "";
    if (dir) {
      var cmd = "mkdir -p " + dir;
      var cb = document.createElement("div");
      cb.className = "cpm-cmd";
      cb.innerHTML = '<span class="cpm-cmd-p">$</span><code class="cpm-cmd-t"></code>';
      cb.querySelector(".cpm-cmd-t").textContent = cmd;
      var cbtn = document.createElement("button");
      cbtn.type = "button";
      cbtn.setAttribute("data-cmd", cmd);
      setCmdBtn(cbtn, "idle");
      cb.appendChild(cbtn);
      box.appendChild(cb);
    }
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
    var SEL = "[data-ph-src],[data-cmd]";
    var b = e.target && e.target.closest ? e.target.closest(SEL) : null;
    if (!b && e.clientX > 0 && document.elementsFromPoint) {
      var els = document.elementsFromPoint(e.clientX, e.clientY);
      for (var i = 0; i < els.length; i++) {
        if (els[i].hasAttribute && (els[i].hasAttribute("data-ph-src") || els[i].hasAttribute("data-cmd"))) { b = els[i]; break; }
      }
    }
    if (!b) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (b.hasAttribute("data-cmd")) {
      var c = b.getAttribute("data-cmd");
      copy(c, function () { setCmdBtn(b, "ok"); }, function () { setCmdBtn(b, "err"); }, b.parentNode);
      return;
    }
    press(b);
  }, true);
  try { new MutationObserver(sweep).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  sweep();
})();

/* ═══ SNIPPET 3 — put right after SNIPPET 2 ═══ */
/* ── STATEMENT-LINES SNIPPET: in statement-based questions, every numbered statement (and the closing line) is shown on its own line ── */
(function () {
  var map = null, busy = false;
  var norm = function (s) { return String(s || "").replace(/\s+/g, " ").trim(); };
  function build() {
    map = {};
    var D = window.TEST_DATA || {};
    Object.keys(D).forEach(function (k) {
      var q = D[k] && D[k].questext;
      if (typeof q === "string" && q.indexOf("\n") > -1) map[norm(q)] = q;
    });
  }
  function fix() {
    if (busy) return;
    busy = true;
    setTimeout(function () {
      busy = false;
      try {
        if (!map) build();
        var all = document.querySelectorAll("*");
        for (var i = 0; i < all.length; i++) {
          var el = all[i];
          if (!el.childNodes || (el.getAttribute && el.getAttribute("data-sq"))) continue;
          for (var j = 0; j < el.childNodes.length; j++) {
            var n = el.childNodes[j];
            if (n.nodeType !== 3 || n.nodeValue.length < 25) continue;
            var full = map[norm(n.nodeValue)];
            if (!full) continue;
            var sp = document.createElement("span");
            sp.setAttribute("data-sq", "1");
            sp.style.setProperty("white-space", "pre-line", "important");
            sp.textContent = full;
            el.replaceChild(sp, n);
          }
        }
      } catch (e) {}
    }, 30);
  }
  try { new MutationObserver(fix).observe(document.documentElement, { childList: true, subtree: true, characterData: true }); } catch (e) {}
  fix();
})();

/* ═══ SNIPPET 4 — put right after SNIPPET 3 (vocabulary files only; build.py adds it automatically) ═══ */
/* ── VOCABULARY-PAGE STYLE SNIPPET: premium, responsive word cards (meaning, Hindi meaning, synonyms, antonyms, usage, picture).
   Every size is in "em", so the whole page grows and shrinks with the portal's font-size control, and the layout reacts to the
   WIDTH OF THE PAGE BOX (container query), not only to the screen. Works in every portal theme and in Light Mode. ── */
(function () {
  var WIDE = ".vc{grid-template-columns:minmax(0,1.18fr) minmax(0,1fr);align-items:start;gap:1.2em 1.6em}" +
    ".vc-main{display:flex;flex-direction:column;gap:1em;min-width:0}" +
    ".vc-side{position:sticky;top:.4em;max-width:none;margin:0;justify-self:stretch}";
  var CSS = [
    ".vc-wrap{container-name:vc;container-type:inline-size;width:100%;max-width:110em;margin:0 auto;font-size:1em;line-height:1.5;-webkit-text-size-adjust:100%;text-size-adjust:100%}",
    ".vc,.vc *{box-sizing:border-box}",
    ".vc{--ar:99,102,241;--a:rgb(var(--ar));--ink:#fff;display:grid;grid-template-columns:minmax(0,1fr);gap:1em;padding:.15em 0 1.2em;color:inherit;font-family:inherit}",
    ".vc :where(p,ol,ul,figure){margin:0;padding:0}",
    ".vc-main{display:contents}",
    ".vc-top{order:0}.vc-p1{order:1}.vc-side{order:2}.vc-p2{order:3}.vc-use{order:4}.vc-mem{order:5}",
    ".vc-top{display:flex;align-items:center;flex-wrap:wrap;gap:.7em}",
    ".vc-pos{display:inline-flex;align-items:center;padding:.4em 1.2em;border-radius:999px;font-size:.95em;font-weight:800;letter-spacing:.17em;text-transform:uppercase;line-height:1.2;color:var(--ink);background:linear-gradient(135deg,var(--a),rgba(var(--ar),.72));box-shadow:0 .55em 1.1em -.55em rgba(var(--ar),.95),inset 0 1px 0 rgba(255,255,255,.45)}",
    ".vc-pron{font-style:italic;font-weight:600;opacity:.8;font-size:1.02em}",
    ".vc-pair{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,15em),1fr));gap:1em}",
    ".vc-card{position:relative;min-width:0;overflow:hidden;border-radius:1.1em;padding:1em 1.15em 1.1em 1.4em;border:1px solid rgba(127,127,127,.32);background:linear-gradient(155deg,rgba(var(--ar),.12),rgba(127,127,127,.06) 62%);box-shadow:0 .8em 1.6em -1.2em rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.16)}",
    ".vc-card::before,.vc-cap::before{content:'';position:absolute;left:0;top:0;bottom:0;width:.32em;background:linear-gradient(180deg,var(--a),rgba(var(--ar),.35))}",
    ".vc-syn::before{background:linear-gradient(180deg,#22c55e,rgba(34,197,94,.35))}",
    ".vc-ant::before{background:linear-gradient(180deg,#ef4444,rgba(239,68,68,.35))}",
    ".vc-lab{display:flex;align-items:center;gap:.55em;margin:0 0 .65em;font-size:.76em;font-weight:800;letter-spacing:.17em;text-transform:uppercase;line-height:1.3;opacity:.85}",
    ".vc-lab i{font-style:normal;font-size:1.3em;letter-spacing:0;line-height:1}",
    ".vc-t{margin:0;font-size:1.14em;font-weight:700;line-height:1.45;overflow-wrap:anywhere}",
    ".vc-hi .vc-t{font-size:1.18em;line-height:1.55}",
    ".vc-chips{display:flex;flex-wrap:wrap;gap:.55em;margin:0;padding:0;list-style:none}",
    ".vc-chip{display:inline-block;max-width:100%;padding:.3em .95em;border-radius:999px;border:1px solid;font-size:1em;font-weight:600;line-height:1.35;color:inherit;overflow-wrap:anywhere}",
    ".vc-syn .vc-chip{border-color:rgba(34,197,94,.75);background:linear-gradient(180deg,rgba(34,197,94,.22),rgba(34,197,94,.09))}",
    ".vc-ant .vc-chip{border-color:rgba(239,68,68,.7);background:linear-gradient(180deg,rgba(239,68,68,.2),rgba(239,68,68,.08))}",
    ".vc-use ol{list-style:none;margin:0;padding:0}",
    ".vc-use li{display:flex;align-items:flex-start;gap:.85em;padding:.7em 0;border-top:1px solid rgba(127,127,127,.3)}",
    ".vc-use li:first-child{border-top:0;padding-top:.1em}.vc-use li:last-child{padding-bottom:0}",
    ".vc-n{flex:none;display:grid;place-items:center;width:1.9em;height:1.9em;margin-top:.05em;border-radius:50%;font-size:.9em;font-weight:800;line-height:1;color:var(--ink);background:linear-gradient(145deg,var(--a),rgba(var(--ar),.7));box-shadow:0 .35em .8em -.35em rgba(var(--ar),.9),inset 0 1px 0 rgba(255,255,255,.4)}",
    ".vc-s{margin:0;min-width:0;font-size:1.07em;line-height:1.55;overflow-wrap:anywhere}",
    ".vc-s b{font-weight:800}",
    ".vc-pic{margin-left:.35em;font-size:.95em;white-space:nowrap}",
    ".vc-mem .vc-t{font-size:1.03em;font-weight:600}",
    ".vc-side{display:flex;flex-direction:column;gap:1em;min-width:0;width:100%;max-width:44em;margin:0 auto;justify-self:center}",
    ".vc-fig{position:relative;margin:0;padding:.28em;border-radius:1.55em;background:linear-gradient(135deg,var(--a),#f6dc95 52%,rgba(var(--ar),.55));box-shadow:0 1.5em 2.8em -1.5em rgba(var(--ar),.8),0 .6em 1.3em -.7em rgba(0,0,0,.55)}",
    ".vc-fig img.vc-img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:1.3em;background:rgba(127,127,127,.16)}",
    ".vc-fig .cpm{max-width:none;width:100%;margin:0 auto!important;border-radius:1.3em;min-height:12em}",
    ".vc-cap{position:relative;overflow:hidden;border-radius:1.1em;padding:1em 1.3em 1.15em 1.5em;border:1px solid rgba(var(--ar),.55);background:linear-gradient(150deg,rgba(var(--ar),.18),rgba(var(--ar),.05));box-shadow:0 .8em 1.6em -1.2em rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.16)}",
    ".vc-cap::after{content:'\\201D';position:absolute;right:.45em;bottom:-.3em;font:700 4.2em/1 Georgia,'Times New Roman',serif;opacity:.16;pointer-events:none}",
    ".vc-q{position:relative;margin:0;padding-right:1.4em;font-size:1.1em;font-style:italic;font-weight:600;line-height:1.55;overflow-wrap:anywhere}",
    ".vc-hl{padding:.03em .4em;border-radius:.45em;font-style:normal;font-weight:800;color:inherit;background:rgba(var(--ar),.34)}",
    "@keyframes vc-in{from{opacity:0;transform:translateY(.7em)}to{opacity:1;transform:none}}",
    ".vc-top,.vc-card,.vc-fig,.vc-cap{animation:vc-in .55s cubic-bezier(.2,.7,.2,1) both}",
    ".vc-fig{animation-delay:.08s}.vc-p2 .vc-card{animation-delay:.1s}.vc-cap{animation-delay:.16s}.vc-use{animation-delay:.18s}",
    "@media (prefers-reduced-motion:reduce){.vc *{animation:none!important}}",
    "@container vc (min-width:58em){" + WIDE + "}",
    "@container vc (max-width:28em){.vc{gap:.85em}.vc-card,.vc-cap{padding:.85em .9em .95em 1.15em}.vc-t{font-size:1.06em}.vc-s{font-size:1.03em}}",
    "@supports not (container-type:inline-size){@media (min-width:58em){" + WIDE + "}}",
    /* Light Mode of the portal: white cards, black text and borders (like the plain portal pages), accent colour kept on the side bar, pill and numbers */
    "html.lite-mode .vc,html.lite-mode .vc *{color:#000!important;-webkit-text-fill-color:#000!important;text-shadow:none!important}",
    "html.lite-mode .vc-card,html.lite-mode .vc-cap{background:#fff!important;background-image:none!important;border:2px solid #000!important;box-shadow:none!important}",
    "html.lite-mode .vc-fig{background:#000!important;box-shadow:none!important}",
    "html.lite-mode .vc .vc-pos,html.lite-mode .vc .vc-n{color:var(--ink)!important;-webkit-text-fill-color:var(--ink)!important;background:var(--a)!important;background-image:none!important;border:2px solid #000!important;box-shadow:none!important}",
    "html.lite-mode .vc .vc-hl{background:rgba(var(--ar),.4)!important}",
    "html.lite-mode .vc-syn .vc-chip{background:#dcfce7!important;border-color:#166534!important}",
    "html.lite-mode .vc-ant .vc-chip{background:#fee2e2!important;border-color:#991b1b!important}",
    "html.lite-mode .vc-syn .vc-chip,html.lite-mode .vc-syn .vc-chip *{color:#14532d!important;-webkit-text-fill-color:#14532d!important}",
    "html.lite-mode .vc-ant .vc-chip,html.lite-mode .vc-ant .vc-chip *{color:#7f1d1d!important;-webkit-text-fill-color:#7f1d1d!important}"
  ].join("\n");
  if (document.getElementById("vc-style")) return;
  var s = document.createElement("style");
  s.id = "vc-style";
  s.textContent = CSS;
  (document.head || document.documentElement).appendChild(s);
})();

/* Field: English_Comprehension · Subject: Vocabulary · Chapter: Set_1 · 80 concept pages (+ overview) · 160 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📚", accent: "#6366f1", pauseTimer: true,
    title: "Vocabulary Class — Word Power for Competitive Exams",
    thumb: {
      image: "images/English_Comprehension/Vocabulary/Set_1/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "WORD POWER",
      line2: "VOCABULARY",
      line3: "SET 1 WITH PICTURES",
      badge: "FULL CLASS",
      ribbon: "MEANING • SYNONYMS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Vocabulary Set 1 with Pictures | One Word Substitution, Synonyms, Antonyms | SSC CGL English",
      altTitles: ["Important Vocabulary with Pictures and Hindi Meaning for SSC CGL", "Phobias, Professions and Language Words for SSC CGL English"],
      description: "Build your English vocabulary the easy way. Every word comes with its meaning, Hindi meaning, synonyms, antonyms, three example sentences and a picture clue, followed by two exam-style questions.\n\n📌 IN THIS CLASS\n✅ Meaning and Hindi meaning of every word\n✅ Synonyms and antonyms\n✅ Example sentences with a picture\n✅ Two exam questions for every word\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Calligrapher\n00:00 Cacography\n00:00 Cartographer\n00:00 Philatelist\n00:00 Archivist\n00:00 Numismatist\n00:00 Mint\n00:00 Nyctophobia\n00:00 Agoraphobia\n00:00 Xenophobia\n00:00 Gynophobia\n00:00 Digamist\n00:00 Claustrophobia\n00:00 Lexicographer\n00:00 Etymology\n00:00 Entomology\n00:00 Philologist\n00:00 Neology\n00:00 Paleographer\n00:00 Coinage\n00:00 Orator\n00:00 Demagogue\n00:00 Pedagogue\n00:00 Synagogue\n00:00 Eloquent\n00:00 Harbinger\n00:00 Herald\n00:00 Emissary\n00:00 Archaism\n00:00 Jargon\n00:00 Argot\n00:00 Neologism\n00:00 Colloquialism\n00:00 Dialect\n00:00 Non sequitur\n00:00 Equivocation\n00:00 Tautology\n00:00 Almanac\n00:00 Chronicle\n00:00 Ledger\n00:00 Epigrapher\n00:00 Epitaph\n00:00 Epitome\n00:00 Epilogue\n00:00 Stoic\n00:00 Sanguine\n00:00 Anchorite\n00:00 Recluse\n00:00 Ascetic\n00:00 Recline\n00:00 Mystic\n00:00 Charlatan\n00:00 Masquerade\n00:00 Omniscient\n00:00 Ubiquitous\n00:00 Immanent\n00:00 Imminent\n00:00 Eminent\n00:00 Impasse\n00:00 Quagmire\n00:00 Pyrrhic\n00:00 Impromptu\n00:00 Extempore\n00:00 Pedant\n00:00 Surrealism\n00:00 Verism\n00:00 Veracity\n00:00 Masochist\n00:00 Sadist\n00:00 Savant\n00:00 Virtuoso\n00:00 Allusion\n00:00 Elusion\n00:00 Illusion\n00:00 Elude\n00:00 Anarchist\n00:00 Realist\n00:00 Jingoistic\n00:00 Reverie\n00:00 Euphoria\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Vocabulary #English",
      tags: ["english vocabulary", "vocabulary for ssc cgl", "one word substitution", "synonyms and antonyms", "vocabulary with hindi meaning", "word power", "ssc cgl english", "vocabulary with pictures", "phobia words", "important vocabulary", "english for competitive exams", "ssc english vocabulary", "vocabulary tricks", "fill in the blanks", "spoken english words", "english word meaning", "learn english words", "vocabulary set 1", "ssc chsl english", "banking english vocabulary", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "Set 1 Vocabulary class"],
      hashtags: ["SSCCGL", "Vocabulary", "English"],
      thumbText: "VOCABULARY SET 1",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📚 New vocabulary class is live: learn every word with a picture! Try the questions and tell me your score 🎯",
      chapters: "00:00 Class overview\n00:00 Calligrapher\n00:00 Cacography\n00:00 Cartographer\n00:00 Philatelist\n00:00 Archivist\n00:00 Numismatist\n00:00 Mint\n00:00 Nyctophobia\n00:00 Agoraphobia\n00:00 Xenophobia\n00:00 Gynophobia\n00:00 Digamist\n00:00 Claustrophobia\n00:00 Lexicographer\n00:00 Etymology\n00:00 Entomology\n00:00 Philologist\n00:00 Neology\n00:00 Paleographer\n00:00 Coinage\n00:00 Orator\n00:00 Demagogue\n00:00 Pedagogue\n00:00 Synagogue\n00:00 Eloquent\n00:00 Harbinger\n00:00 Herald\n00:00 Emissary\n00:00 Archaism\n00:00 Jargon\n00:00 Argot\n00:00 Neologism\n00:00 Colloquialism\n00:00 Dialect\n00:00 Non sequitur\n00:00 Equivocation\n00:00 Tautology\n00:00 Almanac\n00:00 Chronicle\n00:00 Ledger\n00:00 Epigrapher\n00:00 Epitaph\n00:00 Epitome\n00:00 Epilogue\n00:00 Stoic\n00:00 Sanguine\n00:00 Anchorite\n00:00 Recluse\n00:00 Ascetic\n00:00 Recline\n00:00 Mystic\n00:00 Charlatan\n00:00 Masquerade\n00:00 Omniscient\n00:00 Ubiquitous\n00:00 Immanent\n00:00 Imminent\n00:00 Eminent\n00:00 Impasse\n00:00 Quagmire\n00:00 Pyrrhic\n00:00 Impromptu\n00:00 Extempore\n00:00 Pedant\n00:00 Surrealism\n00:00 Verism\n00:00 Veracity\n00:00 Masochist\n00:00 Sadist\n00:00 Savant\n00:00 Virtuoso\n00:00 Allusion\n00:00 Elusion\n00:00 Illusion\n00:00 Elude\n00:00 Anarchist\n00:00 Realist\n00:00 Jingoistic\n00:00 Reverie\n00:00 Euphoria",
      playlist: "English Vocabulary — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, picture-based vocabulary class</u>. For every word you will see the meaning, the Hindi meaning, synonyms, antonyms, three example sentences and one picture that makes the word easy to remember.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>80</b><span>Words</span></div>
        <div class="cp-stat"><b>160</b><span>Questions</span></div>
        <div class="cp-stat"><b>~200 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Words 1 to 5</b><br>Calligrapher, Cacography, Cartographer, Philatelist, Archivist. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 6 to 10</b><br>Numismatist, Mint, Nyctophobia, Agoraphobia, Xenophobia. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 11 to 15</b><br>Gynophobia, Digamist, Claustrophobia, Lexicographer, Etymology. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 16 to 20</b><br>Entomology, Philologist, Neology, Paleographer, Coinage. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 21 to 25</b><br>Orator, Demagogue, Pedagogue, Synagogue, Eloquent. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 26 to 30</b><br>Harbinger, Herald, Emissary, Archaism, Jargon. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 31 to 35</b><br>Argot, Neologism, Colloquialism, Dialect, Non sequitur. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 36 to 40</b><br>Equivocation, Tautology, Almanac, Chronicle, Ledger. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 41 to 45</b><br>Epigrapher, Epitaph, Epitome, Epilogue, Stoic. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 46 to 50</b><br>Sanguine, Anchorite, Recluse, Ascetic, Recline. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 51 to 55</b><br>Mystic, Charlatan, Masquerade, Omniscient, Ubiquitous. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 56 to 60</b><br>Immanent, Imminent, Eminent, Impasse, Quagmire. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 61 to 65</b><br>Pyrrhic, Impromptu, Extempore, Pedant, Surrealism. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 66 to 70</b><br>Verism, Veracity, Masochist, Sadist, Savant. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 71 to 75</b><br>Virtuoso, Allusion, Elusion, Illusion, Elude. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 76 to 80</b><br>Anarchist, Realist, Jingoistic, Reverie, Euphoria. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> synonym, antonym, one-word substitution and fill-in-the-blank questions carry a steady number of marks in every Staff Selection Commission Combined Graduate Level paper, so each word you learn well is a mark you can win.</div>
    `
  },
  2: {
    type: "concept", icon: "🖋️", accent: "#2353c7", pauseTimer: true,
    title: "Calligrapher",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,83,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/kəˈlɪɡrəfə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person skilled in beautiful, artistic handwriting</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सुलेखक, सुंदर लिखने वाला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">penman</li><li class="vc-chip">handwriting artist</li><li class="vc-chip">scribe</li><li class="vc-chip">letterer</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>calligrapher</b> dipped her pen carefully and wrote the invitation in flowing letters. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Our school hired a <b>calligrapher</b> to write every name on the certificates.</p></li><li><span class="vc-n">3</span><p class="vc-s">The museum displays a letter written by a famous <b>calligrapher</b> of the royal court.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Calli" comes from the Greek word for beauty, so a calligrapher is a writer of beautiful letters.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/1.png" alt="Illustration of the word calligrapher: A calm young woman in a simple kurta sits at a wooden desk, dipping a long pen into an ink pot and wr" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">calligrapher</mark> dipped her pen carefully and wrote the invitation in flowing letters.</p></div></div>
      </div></div>
    `
  },
  3: {
    questext: "Select the most appropriate synonym of the given word.\nCalligrapher",
    options: ["Scribbler", "Penman", "Mapmaker", "Coin collector"],
    correct: "2",
    exptext: "✅ A calligrapher is a person who writes in beautiful handwriting, so penman is the closest word. 📌 \"Calli\" means beauty. ❌ Scribbler is wrong because it means someone who writes in a careless, messy way."
  },
  4: {
    questext: "Select the most appropriate option to fill in the blank.\nThe wedding card looked like a work of art because it was written by a skilled ______.",
    options: ["cartographer", "archivist", "philatelist", "calligrapher"],
    correct: "4",
    exptext: "✅ Calligrapher fits because a beautifully written card needs an expert in artistic handwriting. 📌 Beautiful letters point to a calligrapher. ❌ Cartographer is wrong because a cartographer draws maps, not cards."
  },
  5: {
    type: "concept", icon: "📝", accent: "#23c7ac", pauseTimer: true,
    title: "Cacography",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,172;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/kəˈkɒɡrəfi/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">bad handwriting or bad spelling</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">बुरी लिखावट, गलत वर्तनी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">bad handwriting</li><li class="vc-chip">scrawl</li><li class="vc-chip">illegible writing</li><li class="vc-chip">poor spelling</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">calligraphy</li><li class="vc-chip">neat writing</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The doctor's <b>cacography</b> made the prescription impossible for the chemist to read. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Teachers marked down his essay for constant <b>cacography</b> and spelling errors.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her early letters show a childish <b>cacography</b> that later became elegant.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Think "caco" = bad (like a cacophony is a bad sound) and "graphy" = writing, so cacography is bad writing.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/2.png" alt="Illustration of the word cacography: A worried chemist in a white coat holds a doctor's prescription full of messy, unreadable scribbles, sc" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The doctor's <mark class="vc-hl">cacography</mark> made the prescription impossible for the chemist to read.</p></div></div>
      </div></div>
    `
  },
  6: {
    questext: "Select the most appropriate antonym of the given word.\nCacography",
    options: ["Calligraphy", "Scrawl", "Shorthand", "Dictation"],
    correct: "1",
    exptext: "✅ Cacography means bad handwriting, so calligraphy, which means beautiful handwriting, is the opposite. 📌 \"Caco\" is bad and \"calli\" is beautiful. ❌ Scrawl is wrong because it is a synonym, not an antonym."
  },
  7: {
    questext: "Select the most appropriate option to fill in the blank.\nThe student's ______ was so poor that the examiner could not read a single answer.",
    options: ["calligraphy", "autograph", "cacography", "biography"],
    correct: "3",
    exptext: "✅ Cacography fits because the examiner could not read the answers, which points to very bad handwriting. 📌 Unreadable writing means cacography. ❌ Calligraphy is wrong because it means beautiful writing and would not cause that problem."
  },
  8: {
    type: "concept", icon: "🗺️", accent: "#2ac723", pauseTimer: true,
    title: "Cartographer",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:42,199,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/kɑːˈtɒɡrəfə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who draws or makes maps</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मानचित्रकार, नक्शा बनाने वाला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">mapmaker</li><li class="vc-chip">map drawer</li><li class="vc-chip">chart maker</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Satellite images help a modern <b>cartographer</b> update city maps within days. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The young <b>cartographer</b> marked every river and hill on the new district map.</p></li><li><span class="vc-n">3</span><p class="vc-s">Early <b>cartographers</b> sailed with explorers to draw the coastlines they discovered.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Think "carto" = map and "grapher" = one who draws, so a cartographer draws maps.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/3.png" alt="Illustration of the word cartographer: A focused man sits at a big table covered with a half-drawn map, holding a ruler and fine pen; a sate" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Satellite images help a modern <mark class="vc-hl">cartographer</mark> update city maps within days.</p></div></div>
      </div></div>
    `
  },
  9: {
    questext: "Select the most appropriate synonym of the given word.\nCartographer",
    options: ["Navigator", "Mapmaker", "Calligrapher", "Archivist"],
    correct: "2",
    exptext: "✅ A cartographer makes maps, so mapmaker is the closest word. 📌 \"Carto\" is map. ❌ Navigator is wrong because a navigator uses maps to find the way and does not draw them."
  },
  10: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who draws or makes maps",
    options: ["Lexicographer", "Epigrapher", "Stenographer", "Cartographer"],
    correct: "4",
    exptext: "✅ Cartographer means a person who makes maps. 📌 \"Carto\" is map. ❌ Lexicographer is wrong because that person compiles dictionaries, not maps."
  },
  11: {
    type: "concept", icon: "💌", accent: "#bac723", pauseTimer: true,
    title: "Philatelist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:186,199,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/fɪˈlætəlɪst/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who collects or studies postage stamps</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">डाक टिकट संग्राहक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">stamp collector</li><li class="vc-chip">stamp hobbyist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>philatelist</b> paid a huge sum for a rare stamp at the auction. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">As a young <b>philatelist</b>, he kept every stamp from his pen friends in an album.</p></li><li><span class="vc-n">3</span><p class="vc-s">The <b>philatelist</b> checked the tiny edges of the stamp with a magnifying glass.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/4.png" alt="Illustration of the word philatelist: A delighted collector in an auction hall raises a numbered paddle to bid for a tiny rare postage stamp" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">philatelist</mark> paid a huge sum for a rare stamp at the auction.</p></div></div>
      </div></div>
    `
  },
  12: {
    questext: "Select the most appropriate synonym of the given word.\nPhilatelist",
    options: ["Stamp collector", "Coin collector", "Map maker", "Book seller"],
    correct: "1",
    exptext: "✅ A philatelist collects postage stamps, so stamp collector is the closest meaning. 📌 Philately is the hobby of stamps. ❌ Coin collector is wrong because that person is a numismatist."
  },
  13: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who collects postage stamps",
    options: ["Philanthropist", "Philologist", "Philatelist", "Numismatist"],
    correct: "3",
    exptext: "✅ Philatelist means a collector of postage stamps. 📌 Think of \"stamp\" and \"philately\" together. ❌ Philanthropist is wrong because it looks similar but means a person who gives money to help others."
  },
  14: {
    type: "concept", icon: "🗄️", accent: "#c74523", pauseTimer: true,
    title: "Archivist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,69,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈɑːkɪvɪst/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who looks after old records and important documents</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अभिलेखपाल, दस्तावेज़ संरक्षक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">record keeper</li><li class="vc-chip">custodian of records</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">No historian can work without the patient help of a good <b>archivist</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>archivist</b> wore white gloves to handle the fragile papers from the old court.</p></li><li><span class="vc-n">3</span><p class="vc-s">An <b>archivist</b> must keep old files safe from damp, insects and fire.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/5.png" alt="Illustration of the word archivist: A careful woman in white cotton gloves lifts a fragile old document from a labelled box in a quiet archi" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">No historian can work without the patient help of a good <mark class="vc-hl">archivist</mark>.</p></div></div>
      </div></div>
    `
  },
  15: {
    questext: "Select the most appropriate synonym of the given word.\nArchivist",
    options: ["Historian", "Record keeper", "Translator", "Auditor"],
    correct: "2",
    exptext: "✅ An archivist looks after old records, so record keeper is the closest word. 📌 Archive means a store of old records. ❌ Historian is wrong because a historian studies the past and does not necessarily guard the documents."
  },
  16: {
    questext: "Select the most appropriate option to fill in the blank.\nTo trace the history of the old mill, the researcher asked the ______ to bring the century-old files from the vault.",
    options: ["numismatist", "cartographer", "philatelist", "archivist"],
    correct: "4",
    exptext: "✅ Archivist fits because the person who looks after old files can bring them from the vault. 📌 Old records mean archivist. ❌ Numismatist is wrong because that person studies coins, not files."
  },
  17: {
    type: "concept", icon: "🪙", accent: "#c72391", pauseTimer: true,
    title: "Numismatist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,145;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/njuːˈmɪzmətɪst/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who collects or studies coins and medals</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सिक्का संग्राहक, मुद्राशास्त्री</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">coin collector</li><li class="vc-chip">coin expert</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>numismatist</b> examined the ancient silver coin under a bright lamp. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A rare gold coin of the Gupta age made the <b>numismatist</b> shout with joy.</p></li><li><span class="vc-n">3</span><p class="vc-s">The <b>numismatist</b> explained how old coins tell the story of lost kingdoms.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Numisma" is the Latin word for coin, so a numismatist is a coin person.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/6.png" alt="Illustration of the word numismatist: An elderly collector with round glasses studies a shiny ancient silver coin with a magnifying glass un" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">numismatist</mark> examined the ancient silver coin under a bright lamp.</p></div></div>
      </div></div>
    `
  },
  18: {
    questext: "Select the most appropriate synonym of the given word.\nNumismatist",
    options: ["Coin collector", "Money lender", "Banker", "Stamp collector"],
    correct: "1",
    exptext: "✅ A numismatist collects and studies coins, so coin collector is the closest meaning. 📌 \"Numisma\" means coin. ❌ Stamp collector is wrong because that person is a philatelist."
  },
  19: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who collects or studies coins and medals",
    options: ["Archivist", "Epigrapher", "Numismatist", "Philatelist"],
    correct: "3",
    exptext: "✅ Numismatist means a collector or student of coins and medals. 📌 \"Numisma\" is coin. ❌ Philatelist is wrong because that person collects stamps."
  },
  20: {
    type: "concept", icon: "🏭", accent: "#6e23c7", pauseTimer: true,
    title: "Mint",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:110,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/mɪnt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a place where the government makes coins</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">टकसाल</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">coin factory</li><li class="vc-chip">coin-making house</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The finance minister visited the <b>mint</b> to see how new coins are made. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Workers at the <b>mint</b> stamp the design on each shiny metal disc.</p></li><li><span class="vc-n">3</span><p class="vc-s">Old coins were once struck by hand at the royal <b>mint</b> in the fort.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/7.png" alt="Illustration of the word mint: Inside a government coin factory, workers in safety gear watch a machine stamping shiny round metal discs int" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The finance minister visited the <mark class="vc-hl">mint</mark> to see how new coins are made.</p></div></div>
      </div></div>
    `
  },
  21: {
    questext: "Select the most appropriate synonym of the given word.\nMint",
    options: ["Stamp office", "Coin factory", "Grain store", "Money lender"],
    correct: "2",
    exptext: "✅ A mint is the place where coins are made, so coin factory is the closest meaning. 📌 Mint means money made here. ❌ Stamp office is wrong because it deals with postage stamps, not coins."
  },
  22: {
    questext: "Select the most appropriate option to fill in the blank.\nNotes are printed at a press, but all new coins are struck at the government ______.",
    options: ["chronicle", "ledger", "almanac", "mint"],
    correct: "4",
    exptext: "✅ Mint fits because coins are made at a mint. 📌 Coins come from the mint. ❌ Ledger is wrong because it is a book of accounts, not a factory."
  },
  23: {
    type: "concept", icon: "🌙", accent: "#2368c7", pauseTimer: true,
    title: "Nyctophobia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,104,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌnɪktəˈfəʊbiə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an extreme fear of darkness or night</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अंधेरे का डर, रात का भय</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">fear of darkness</li><li class="vc-chip">fear of night</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Because of her <b>nyctophobia</b>, Riya always sleeps with a small lamp switched on. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Doctors helped the child overcome <b>nyctophobia</b> with gentle talks and a night light.</p></li><li><span class="vc-n">3</span><p class="vc-s">Many children outgrow <b>nyctophobia</b> once they learn there is nothing to fear in the dark.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Nykt" is the Greek word for night and "phobia" means fear.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/8.png" alt="Illustration of the word nyctophobia: A young girl sits up in bed at night with a blanket pulled to her chin and wide frightened eyes, while" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Because of her <mark class="vc-hl">nyctophobia</mark>, Riya always sleeps with a small lamp switched on.</p></div></div>
      </div></div>
    `
  },
  24: {
    questext: "Select the most appropriate synonym of the given word.\nNyctophobia",
    options: ["Fear of darkness", "Fear of heights", "Fear of water", "Fear of crowds"],
    correct: "1",
    exptext: "✅ Nyctophobia is an extreme fear of darkness. 📌 \"Nykt\" means night. ❌ Fear of crowds is wrong because that is linked to agoraphobia."
  },
  25: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nAn extreme fear of darkness",
    options: ["Xenophobia", "Claustrophobia", "Nyctophobia", "Agoraphobia"],
    correct: "3",
    exptext: "✅ Nyctophobia means an extreme fear of darkness or night. 📌 Night and fear together make nyctophobia. ❌ Claustrophobia is wrong because it is the fear of small, closed spaces."
  },
  26: {
    type: "concept", icon: "🏙️", accent: "#23c797", pauseTimer: true,
    title: "Agoraphobia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,151;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌæɡərəˈfəʊbiə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an extreme fear of open or crowded public places</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">खुली जगह का डर, भीड़ का डर</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">fear of open spaces</li><li class="vc-chip">fear of crowds</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Suffering from <b>agoraphobia</b>, the poet rarely left his small room for years. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">His <b>agoraphobia</b> made even a short walk to the market feel frightening.</p></li><li><span class="vc-n">3</span><p class="vc-s">With patient treatment, she slowly overcame her <b>agoraphobia</b> and returned to work.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Agora" is the Greek word for a market place, which is a wide, busy, open space.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/9.png" alt="Illustration of the word agoraphobia: A nervous man stands in a doorway looking out at a wide, busy town square full of people; he grips the" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Suffering from <mark class="vc-hl">agoraphobia</mark>, the poet rarely left his small room for years.</p></div></div>
      </div></div>
    `
  },
  27: {
    questext: "Select the most appropriate synonym of the given word.\nAgoraphobia",
    options: ["Fear of closed rooms", "Fear of open spaces", "Fear of darkness", "Fear of strangers"],
    correct: "2",
    exptext: "✅ Agoraphobia is the fear of open or crowded public places, so fear of open spaces fits. 📌 \"Agora\" is a market place. ❌ Fear of closed rooms is wrong because that is claustrophobia."
  },
  28: {
    questext: "Select the most appropriate option to fill in the blank.\nThe sight of a wide, open marketplace filled him with panic, a sign of his ______.",
    options: ["claustrophobia", "nyctophobia", "xenophobia", "agoraphobia"],
    correct: "4",
    exptext: "✅ Agoraphobia fits because the fear comes from a wide, open public place. 📌 Market place means agora. ❌ Claustrophobia is wrong because it is the fear of small, closed spaces."
  },
  29: {
    type: "concept", icon: "🛂", accent: "#3fc723", pauseTimer: true,
    title: "Xenophobia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:63,199,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌzenəˈfəʊbiə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a strong dislike or fear of foreigners and strangers</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">विदेशियों से घृणा, विदेशी-भय</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dislike of foreigners</li><li class="vc-chip">prejudice</li><li class="vc-chip">intolerance</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">hospitality</li><li class="vc-chip">tolerance</li><li class="vc-chip">friendliness</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The film shows how <b>xenophobia</b> slowly poisoned a once-friendly town. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Leaders must speak against <b>xenophobia</b> when people turn hostile towards newcomers.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her book argues that <b>xenophobia</b> grows when people fear what they do not know.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Xeno" is the Greek word for stranger, and "phobia" means fear.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/10.png" alt="Illustration of the word xenophobia: In a town street, a group of worried locals stand with crossed arms and angry faces, glaring at a famil" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The film shows how <mark class="vc-hl">xenophobia</mark> slowly poisoned a once-friendly town.</p></div></div>
      </div></div>
    `
  },
  30: {
    questext: "Select the most appropriate antonym of the given word.\nXenophobia",
    options: ["Hospitality", "Intolerance", "Prejudice", "Suspicion"],
    correct: "1",
    exptext: "✅ Xenophobia is dislike of strangers, so hospitality, which means a warm welcome, is the opposite. 📌 \"Xeno\" is stranger. ❌ Prejudice is wrong because it is close in meaning, not opposite."
  },
  31: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA strong dislike or fear of foreigners",
    options: ["Gynophobia", "Agoraphobia", "Xenophobia", "Nyctophobia"],
    correct: "3",
    exptext: "✅ Xenophobia means a strong dislike or fear of foreigners. 📌 \"Xeno\" is stranger. ❌ Gynophobia is wrong because it is the fear of women."
  },
  32: {
    type: "concept", icon: "😰", accent: "#c7c023", pauseTimer: true,
    title: "Gynophobia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,192,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌɡaɪnəˈfəʊbiə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an extreme fear of women</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">महिलाओं का डर, स्त्री-भय</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">fear of women</li><li class="vc-chip">fear of females</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His <b>gynophobia</b> made him nervous even when a woman simply asked him for directions. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Therapy helped the shy young man understand that his <b>gynophobia</b> was only a fear, not a fact.</p></li><li><span class="vc-n">3</span><p class="vc-s"><b>Gynophobia</b> is a rare condition and is very different from ordinary shyness.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Gyne" is the Greek word for woman, and "phobia" means fear.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/11.png" alt="Illustration of the word gynophobia: On a street corner a nervous young man steps back with wide eyes and raised hands, sweating, while a po" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">His <mark class="vc-hl">gynophobia</mark> made him nervous even when a woman simply asked him for directions.</p></div></div>
      </div></div>
    `
  },
  33: {
    questext: "Select the most appropriate synonym of the given word.\nGynophobia",
    options: ["Fear of men", "Fear of women", "Fear of heights", "Fear of insects"],
    correct: "2",
    exptext: "✅ Gynophobia is an extreme fear of women. 📌 \"Gyne\" means woman. ❌ Fear of men is wrong because it reverses the meaning of the word."
  },
  34: {
    questext: "Select the most appropriate option to fill in the blank.\nA man who trembles every time a woman speaks to him may be suffering from ______.",
    options: ["claustrophobia", "agoraphobia", "nyctophobia", "gynophobia"],
    correct: "4",
    exptext: "✅ Gynophobia fits because the fear is linked to women. 📌 Woman means gyne. ❌ Nyctophobia is wrong because it is the fear of darkness."
  },
  35: {
    type: "concept", icon: "💍", accent: "#c73023", pauseTimer: true,
    title: "Digamist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,48,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈdɪɡəmɪst/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who marries for the second time</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दूसरा विवाह करने वाला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">remarried person</li><li class="vc-chip">second-time spouse</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">In the old story, the king, a <b>digamist</b>, brought a new queen to the palace. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The widower became a <b>digamist</b> when he wed a kind teacher ten years later.</p></li><li><span class="vc-n">3</span><p class="vc-s">A <b>digamist</b> is not the same as a bigamist, who has two spouses at the same time.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Di" means two and "gamos" means marriage, so a digamist has married twice.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/12.png" alt="Illustration of the word digamist: A smiling middle-aged king in royal robes stands with a gentle new queen at the palace gate while courtie" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">In the old story, the king, a <mark class="vc-hl">digamist</mark>, brought a new queen to the palace.</p></div></div>
      </div></div>
    `
  },
  36: {
    questext: "Select the most appropriate synonym of the given word.\nDigamist",
    options: ["Remarried person", "Divorcee", "Bachelor", "Monk"],
    correct: "1",
    exptext: "✅ A digamist marries for the second time, so remarried person is the closest meaning. 📌 \"Di\" means two. ❌ Divorcee is wrong because it names someone whose marriage has ended, not someone who has married again."
  },
  37: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who marries for the second time",
    options: ["Bigamist", "Misogamist", "Digamist", "Monogamist"],
    correct: "3",
    exptext: "✅ Digamist means a person who marries a second time. 📌 \"Di\" is two marriages one after the other. ❌ Bigamist is wrong because it means a person with two spouses at the same time, which is against the law."
  },
  38: {
    type: "concept", icon: "🛗", accent: "#c723a6", pauseTimer: true,
    title: "Claustrophobia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,166;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌklɔːstrəˈfəʊbiə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an extreme fear of small or closed spaces</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">बंद जगह का डर</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">fear of closed spaces</li><li class="vc-chip">fear of confinement</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s"><b>Claustrophobia</b> made her take the stairs instead of the crowded, narrow lift. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">He gets <b>claustrophobia</b> inside tiny, windowless rooms.</p></li><li><span class="vc-n">3</span><p class="vc-s">The patient with <b>claustrophobia</b> felt panic inside the narrow scanning machine.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Claustrum" is the Latin word for a closed place.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/13.png" alt="Illustration of the word claustrophobia: A frightened woman stands at the door of a small, crowded lift with her hand on her chest and a wor" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q"><mark class="vc-hl">Claustrophobia</mark> made her take the stairs instead of the crowded, narrow lift.</p></div></div>
      </div></div>
    `
  },
  39: {
    questext: "Select the most appropriate synonym of the given word.\nClaustrophobia",
    options: ["Fear of open fields", "Fear of confined spaces", "Fear of strangers", "Fear of darkness"],
    correct: "2",
    exptext: "✅ Claustrophobia is the extreme fear of small, closed spaces. 📌 \"Claustrum\" means a closed place. ❌ Fear of open fields is wrong because that belongs to agoraphobia."
  },
  40: {
    questext: "Select the most appropriate option to fill in the blank.\nStuck in the tiny lift, Meera felt trapped, and her ______ made her gasp for air.",
    options: ["agoraphobia", "xenophobia", "gynophobia", "claustrophobia"],
    correct: "4",
    exptext: "✅ Claustrophobia fits because Meera was trapped in a tiny space. 📌 Closed space means claustrum. ❌ Agoraphobia is wrong because it is the fear of wide, open places."
  },
  41: {
    type: "concept", icon: "📖", accent: "#5923c7", pauseTimer: true,
    title: "Lexicographer",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:89,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌleksɪˈkɒɡrəfə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who writes or compiles dictionaries</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कोशकार, शब्दकोश निर्माता</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dictionary writer</li><li class="vc-chip">dictionary compiler</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>lexicographer</b> spent ten years collecting meanings for the new Hindi dictionary. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>lexicographer</b> checks how people really use a word before writing its meaning.</p></li><li><span class="vc-n">3</span><p class="vc-s">The famous <b>lexicographer</b> added thousands of new words to the latest dictionary.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Lexicon" means a dictionary or the words of a language.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/14.png" alt="Illustration of the word lexicographer: A patient scholar sits at a desk piled with open dictionaries and index cards, writing a word meanin" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">lexicographer</mark> spent ten years collecting meanings for the new Hindi dictionary.</p></div></div>
      </div></div>
    `
  },
  42: {
    questext: "Select the most appropriate synonym of the given word.\nLexicographer",
    options: ["Dictionary compiler", "Coin expert", "Map drawer", "Stamp seller"],
    correct: "1",
    exptext: "✅ A lexicographer compiles dictionaries, so dictionary compiler is the closest meaning. 📌 \"Lexicon\" is a word-book. ❌ Map drawer is wrong because that is a cartographer."
  },
  43: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who writes or compiles dictionaries",
    options: ["Philologist", "Epigrapher", "Lexicographer", "Cartographer"],
    correct: "3",
    exptext: "✅ Lexicographer means a person who writes dictionaries. 📌 \"Lexicon\" is dictionary. ❌ Philologist is wrong because that scholar studies how languages grow and change, not dictionaries alone."
  },
  44: {
    type: "concept", icon: "🔎", accent: "#237dc7", pauseTimer: true,
    title: "Etymology",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,125,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌetɪˈmɒlədʒi/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">the study of where words come from and how they changed</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">व्युत्पत्ति, शब्द-उत्पत्ति</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">word origin</li><li class="vc-chip">word history</li><li class="vc-chip">derivation</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>etymology</b> of "salary" goes back to the Latin word for salt. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A good dictionary gives the <b>etymology</b> of each word, from its first use to today.</p></li><li><span class="vc-n">3</span><p class="vc-s">Studying <b>etymology</b> helps students guess the meaning of new words.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Etymon" is the Greek word for the true meaning of a word.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/15.png" alt="Illustration of the word etymology: A teacher points to a chalkboard where a word is drawn as a tree, its roots labelled with old languages " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">etymology</mark> of "salary" goes back to the Latin word for salt.</p></div></div>
      </div></div>
    `
  },
  45: {
    questext: "Select the most appropriate synonym of the given word.\nEtymology",
    options: ["Word meaning", "Word origin", "Word spelling", "Word sound"],
    correct: "2",
    exptext: "✅ Etymology is the study of the origin of words, so word origin is the closest meaning. 📌 Etymology is a word's family history. ❌ Word meaning is wrong because the study traces origin, not only meaning."
  },
  46: {
    questext: "Select the most appropriate option to fill in the blank.\nThe teacher explained the ______ of the word \"sandwich\", which comes from the name of an English noble.",
    options: ["entomology", "epilogue", "epitaph", "etymology"],
    correct: "4",
    exptext: "✅ Etymology fits because the teacher explains where the word came from. 📌 Origin of words means etymology. ❌ Entomology is wrong because it looks similar but means the study of insects."
  },
  47: {
    type: "concept", icon: "🐞", accent: "#23c782", pauseTimer: true,
    title: "Entomology",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,130;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌentəˈmɒlədʒi/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">the scientific study of insects</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कीट विज्ञान</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">study of insects</li><li class="vc-chip">insect science</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The university's <b>entomology</b> department tracks insects that damage the wheat crop. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">She chose <b>entomology</b> for her degree because she loved bees and butterflies.</p></li><li><span class="vc-n">3</span><p class="vc-s">The farmer asked an expert in <b>entomology</b> how to stop the locusts.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Entomon" is the Greek word for insect, so entomology is the study of insects.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/16.png" alt="Illustration of the word entomology: A scientist in a lab coat studies a beetle through a large microscope; pinned butterflies in glass case" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The university's <mark class="vc-hl">entomology</mark> department tracks insects that damage the wheat crop.</p></div></div>
      </div></div>
    `
  },
  48: {
    questext: "Select the most appropriate synonym of the given word.\nEntomology",
    options: ["Study of insects", "Study of birds", "Study of words", "Study of stones"],
    correct: "1",
    exptext: "✅ Entomology is the scientific study of insects. 📌 \"Entomon\" means insect. ❌ Study of words is wrong because that is etymology, a look-alike term."
  },
  49: {
    questext: "Select the most appropriate option to fill in the blank.\nHer love for beetles and butterflies led her to study ______ at university.",
    options: ["etymology", "epigraphy", "entomology", "neology"],
    correct: "3",
    exptext: "✅ Entomology fits because the student loves beetles and butterflies, which are insects. 📌 Insects mean entomology. ❌ Etymology is wrong because it is the study of word origins."
  },
  50: {
    type: "concept", icon: "🈂️", accent: "#54c723", pauseTimer: true,
    title: "Philologist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:84,199,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/fɪˈlɒlədʒɪst/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a scholar who studies languages and how they changed over time</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">भाषाशास्त्री, भाषाविद्</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">language scholar</li><li class="vc-chip">linguist</li><li class="vc-chip">language expert</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>philologist</b> spent years decoding the grammar of a forgotten tribal language. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">As a <b>philologist</b>, she compared old Sanskrit writings with later languages.</p></li><li><span class="vc-n">3</span><p class="vc-s">The <b>philologist</b> showed how the English word "father" is linked to the Sanskrit word "pitar".</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Philo" means love and "logos" means word, so a philologist is a lover of words.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/17.png" alt="Illustration of the word philologist: A scholar with a grey beard studies two old manuscripts in different scripts at a lamp-lit table, writ" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">philologist</mark> spent years decoding the grammar of a forgotten tribal language.</p></div></div>
      </div></div>
    `
  },
  51: {
    questext: "Select the most appropriate synonym of the given word.\nPhilologist",
    options: ["Stamp collector", "Language scholar", "Map maker", "Insect expert"],
    correct: "2",
    exptext: "✅ A philologist studies languages, so language scholar is the closest meaning. 📌 \"Philo\" is love and \"logos\" is word. ❌ Stamp collector is wrong because that is a philatelist, a look-alike word."
  },
  52: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA scholar who studies languages and how they changed",
    options: ["Philatelist", "Philanthropist", "Numismatist", "Philologist"],
    correct: "4",
    exptext: "✅ Philologist is a scholar of languages and their history. 📌 Words are logos. ❌ Philanthropist is wrong because it means a person who gives money to help others."
  },
  53: {
    type: "concept", icon: "🆕", accent: "#c7ab23", pauseTimer: true,
    title: "Neology",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,171,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/niˈɒlədʒi/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">the practice of inventing and using new words</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">नवशब्द-प्रयोग</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">coining of words</li><li class="vc-chip">word invention</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">archaism</li><li class="vc-chip">old-fashioned usage</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Text messaging has speeded up <b>neology</b>, creating new words almost every month. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The poet loved <b>neology</b> and often made up playful words.</p></li><li><span class="vc-n">3</span><p class="vc-s">Online chat has made <b>neology</b> a daily habit for young people.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Neo" means new and "logos" means word, so neology is the use of new words.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/18.png" alt="Illustration of the word neology: A group of cheerful teenagers sit in a cafe looking at their phones, and glowing new made-up words float a" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Text messaging has speeded up <mark class="vc-hl">neology</mark>, creating new words almost every month.</p></div></div>
      </div></div>
    `
  },
  54: {
    questext: "Select the most appropriate antonym of the given word.\nNeology",
    options: ["Archaism", "Invention", "Coinage", "Novelty"],
    correct: "1",
    exptext: "✅ Neology is using new words, so archaism, which is using old words, is the opposite. 📌 \"Neo\" means new. ❌ Coinage is wrong because it is close in meaning to neology."
  },
  55: {
    questext: "Select the most appropriate option to fill in the blank.\nThe author's love of ______ gave the book many fresh, invented words.",
    options: ["etymology", "entomology", "neology", "epilogue"],
    correct: "3",
    exptext: "✅ Neology fits because the book is full of invented words. 📌 New words mean neology. ❌ Etymology is wrong because it studies where old words came from."
  },
  56: {
    type: "concept", icon: "📜", accent: "#c7232b", pauseTimer: true,
    title: "Paleographer",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,43;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌpæliˈɒɡrəfə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an expert who reads and studies ancient handwriting and old manuscripts</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">प्राचीन लिपि विशेषज्ञ</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">expert in ancient writing</li><li class="vc-chip">manuscript expert</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>paleographer</b> slowly read the faded writing on the medieval parchment. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>paleographer</b> worked out the age of the manuscript from the style of its letters.</p></li><li><span class="vc-n">3</span><p class="vc-s">Only a trained <b>paleographer</b> can read the faded script on old palm leaves.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Palaios" is the Greek word for old, so a paleographer studies old writing.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/19.png" alt="Illustration of the word paleographer: A scholar with a magnifying glass bends over a fragile old parchment with faded writing under a brigh" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">paleographer</mark> slowly read the faded writing on the medieval parchment.</p></div></div>
      </div></div>
    `
  },
  57: {
    questext: "Select the most appropriate synonym of the given word.\nPaleographer",
    options: ["Expert in stones", "Expert in ancient writing", "Expert in coins", "Expert in maps"],
    correct: "2",
    exptext: "✅ A paleographer reads and studies ancient handwriting. 📌 \"Palaios\" means old. ❌ Expert in coins is wrong because that is a numismatist."
  },
  58: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nAn expert who reads and studies ancient handwriting",
    options: ["Epigrapher", "Calligrapher", "Cartographer", "Paleographer"],
    correct: "4",
    exptext: "✅ Paleographer means an expert in old handwriting and manuscripts. 📌 \"Palaios\" is old. ❌ Epigrapher is wrong because that expert studies writing carved on stone or metal, not handwriting."
  },
  59: {
    type: "concept", icon: "💡", accent: "#c723bb", pauseTimer: true,
    title: "Coinage",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,187;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈkɔɪnɪdʒ/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a new word or phrase that someone invents</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">नया गढ़ा शब्द</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">invented word</li><li class="vc-chip">new word</li><li class="vc-chip">newly made term</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The newspaper's clever <b>coinage</b> "staycation" soon appeared in many dictionaries. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">"Brunch" is a clever <b>coinage</b> made from the words "breakfast" and "lunch".</p></li><li><span class="vc-n">3</span><p class="vc-s">The writer's latest <b>coinage</b> spread quickly across social media.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/20.png" alt="Illustration of the word coinage: A smiling journalist in a newsroom holds up a poster with a funny new made-up word written in big letters," loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The newspaper's clever <mark class="vc-hl">coinage</mark> "staycation" soon appeared in many dictionaries.</p></div></div>
      </div></div>
    `
  },
  60: {
    questext: "Select the most appropriate synonym of the given word.\nCoinage",
    options: ["Invented word", "Old word", "Foreign word", "Borrowed phrase"],
    correct: "1",
    exptext: "✅ A coinage is a new word that someone invents. 📌 To coin a word is to make a word. ❌ Old word is wrong because a coinage is new."
  },
  61: {
    questext: "Select the most appropriate option to fill in the blank.\nThe advertiser's catchy ______ for the new drink was soon repeated by everyone.",
    options: ["tautology", "epitaph", "coinage", "almanac"],
    correct: "3",
    exptext: "✅ Coinage fits because a catchy invented word spreads quickly. 📌 New word means coinage. ❌ Tautology is wrong because it means saying the same thing twice."
  },
  62: {
    type: "concept", icon: "🎤", accent: "#4423c7", pauseTimer: true,
    title: "Orator",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:68,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈɒrətə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who is skilled at giving public speeches</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">वक्ता, भाषणकर्ता</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">public speaker</li><li class="vc-chip">speaker</li><li class="vc-chip">rhetorician</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The young <b>orator</b> held the whole hall silent with his powerful opening line. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">People travelled for miles to hear the famous <b>orator</b> speak at the town fair.</p></li><li><span class="vc-n">3</span><p class="vc-s">A fine <b>orator</b> knows when to pause and when to raise his voice.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Orator comes from the Latin word for speaking, so an orator is a speaker.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/21.png" alt="Illustration of the word orator: A confident young man stands at a podium on a stage, one hand raised in a strong gesture, while a packed ha" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The young <mark class="vc-hl">orator</mark> held the whole hall silent with his powerful opening line.</p></div></div>
      </div></div>
    `
  },
  63: {
    questext: "Select the most appropriate synonym of the given word.\nOrator",
    options: ["Silent listener", "Public speaker", "Writer", "Singer"],
    correct: "2",
    exptext: "✅ An orator is a skilled public speaker. 📌 Orator and oration both come from speaking. ❌ Silent listener is wrong because it describes the audience, not the speaker."
  },
  64: {
    questext: "Select the most appropriate option to fill in the blank.\nThe crowd cheered because the ______ spoke with great power and passion about the rights of farmers.",
    options: ["recluse", "philatelist", "lexicographer", "orator"],
    correct: "4",
    exptext: "✅ Orator fits because a person who speaks powerfully to a crowd is an orator. 📌 Speech means orator. ❌ Recluse is wrong because a recluse avoids people and does not give speeches."
  },
  65: {
    type: "concept", icon: "📢", accent: "#2392c7", pauseTimer: true,
    title: "Demagogue",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,146,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈdeməɡɒɡ/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a leader who excites people's fears and feelings to win power</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">भीड़ भड़काने वाला नेता</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">rabble-rouser</li><li class="vc-chip">agitator</li><li class="vc-chip">firebrand</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">statesman</li><li class="vc-chip">honest leader</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>demagogue</b> promised free everything and blamed outsiders for every problem in town. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A true leader solves problems, but a <b>demagogue</b> only stirs up anger.</p></li><li><span class="vc-n">3</span><p class="vc-s">History warns us about every <b>demagogue</b> who wins votes by spreading fear.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Demos" means people and "agogos" means leader, but a demagogue leads people by stirring their feelings, not by honest plans.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/22.png" alt="Illustration of the word demagogue: A loud man in a fancy jacket stands on a wooden box in a town square, waving his fist and shouting, whil" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">demagogue</mark> promised free everything and blamed outsiders for every problem in town.</p></div></div>
      </div></div>
    `
  },
  66: {
    questext: "Select the most appropriate antonym of the given word.\nDemagogue",
    options: ["Statesman", "Rabble-rouser", "Firebrand", "Agitator"],
    correct: "1",
    exptext: "✅ A demagogue wins power by stirring fear, so statesman, a wise and honest leader, is the opposite. 📌 Demagogue misleads the crowd; statesman guides it. ❌ Agitator is wrong because it is a synonym."
  },
  67: {
    questext: "Select the most appropriate option to fill in the blank.\nInstead of offering real plans, the ______ shouted angry slogans to win over the crowd.",
    options: ["pedagogue", "synagogue", "demagogue", "orator"],
    correct: "3",
    exptext: "✅ Demagogue fits because the leader used angry slogans and no real plans. 📌 Crowd-pleasing without plans means demagogue. ❌ Pedagogue is wrong because it means a teacher."
  },
  68: {
    type: "concept", icon: "🧑‍🏫", accent: "#23c76d", pauseTimer: true,
    title: "Pedagogue",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,109;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈpedəɡɒɡ/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a teacher, especially a strict or old-fashioned one</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">शिक्षक, अध्यापक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">teacher</li><li class="vc-chip">educator</li><li class="vc-chip">schoolmaster</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The village <b>pedagogue</b> taught three generations from one dusty classroom. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The strict <b>pedagogue</b> made students copy each lesson three times.</p></li><li><span class="vc-n">3</span><p class="vc-s">A modern <b>pedagogue</b> uses pictures and games to make lessons fun.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Think "ped" for child and "agogue" for leader, so a pedagogue leads children in learning.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/23.png" alt="Illustration of the word pedagogue: An elderly teacher with round glasses and a long wooden pointer stands beside a blackboard in a small du" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The village <mark class="vc-hl">pedagogue</mark> taught three generations from one dusty classroom.</p></div></div>
      </div></div>
    `
  },
  69: {
    questext: "Select the most appropriate synonym of the given word.\nPedagogue",
    options: ["Mob leader", "Teacher", "Priest", "Judge"],
    correct: "2",
    exptext: "✅ A pedagogue is a teacher. 📌 \"Ped\" is child. ❌ Mob leader is wrong because that is a demagogue, a look-alike word."
  },
  70: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA teacher, especially a strict one",
    options: ["Demagogue", "Epilogue", "Synagogue", "Pedagogue"],
    correct: "4",
    exptext: "✅ Pedagogue means a teacher, often a strict one. 📌 \"Ped\" is child. ❌ Demagogue is wrong because it means a leader who stirs up a crowd."
  },
  71: {
    type: "concept", icon: "🕍", accent: "#69c723", pauseTimer: true,
    title: "Synagogue",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:105,199,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈsɪnəɡɒɡ/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a Jewish place of worship</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">यहूदी उपासनागृह</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">Jewish place of worship</li><li class="vc-chip">Jewish house of prayer</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The old <b>synagogue</b> in the city is known for its stained glass windows. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Worshippers gathered at the <b>synagogue</b> every Saturday morning.</p></li><li><span class="vc-n">3</span><p class="vc-s">Tourists admired the carved wooden doors of the ancient <b>synagogue</b>.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Synagogue comes from a Greek word meaning "a gathering together".</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/24.png" alt="Illustration of the word synagogue: A peaceful old stone building with tall arched windows of coloured stained glass stands on a quiet city " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The old <mark class="vc-hl">synagogue</mark> in the city is known for its stained glass windows.</p></div></div>
      </div></div>
    `
  },
  72: {
    questext: "Select the most appropriate synonym of the given word.\nSynagogue",
    options: ["Jewish house of prayer", "Buddhist monastery", "Christian church", "Muslim place of worship"],
    correct: "1",
    exptext: "✅ A synagogue is a Jewish place of worship. 📌 A gathering place for prayer. ❌ Christian church is wrong because a church belongs to Christians."
  },
  73: {
    questext: "Select the most appropriate option to fill in the blank.\nJust as Muslims pray in a mosque, Jewish people pray in a ______.",
    options: ["monologue", "demagogue", "synagogue", "pedagogue"],
    correct: "3",
    exptext: "✅ Synagogue fits because it is the Jewish place of worship. 📌 Mosque for Muslims, synagogue for Jews. ❌ Pedagogue is wrong because it ends in a similar sound but means a teacher."
  },
  74: {
    type: "concept", icon: "🗣️", accent: "#c79623", pauseTimer: true,
    title: "Eloquent",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,150,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ˈeləkwənt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">able to speak or write in a clear, strong and persuasive way</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">वाक्पटु, प्रभावशाली</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">articulate</li><li class="vc-chip">fluent</li><li class="vc-chip">persuasive</li><li class="vc-chip">expressive</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">inarticulate</li><li class="vc-chip">tongue-tied</li><li class="vc-chip">hesitant</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Her <b>eloquent</b> speech about saving the lake moved even the strongest critics. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The lawyer gave an <b>eloquent</b> defence that left the jury in tears.</p></li><li><span class="vc-n">3</span><p class="vc-s">Even without words, her <b>eloquent</b> smile said everything.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Eloquent comes from Latin words meaning "to speak out".</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/25.png" alt="Illustration of the word eloquent: A passionate young woman stands at a lakeside meeting and speaks with an open hand, while a crowd of vill" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Her <mark class="vc-hl">eloquent</mark> speech about saving the lake moved even the strongest critics.</p></div></div>
      </div></div>
    `
  },
  75: {
    questext: "Select the most appropriate synonym of the given word.\nEloquent",
    options: ["Hesitant", "Articulate", "Silent", "Clumsy"],
    correct: "2",
    exptext: "✅ Eloquent means speaking clearly and strongly, so articulate is the closest word. 📌 Eloquent people speak out well. ❌ Hesitant is wrong because it means unsure and slow, the opposite idea."
  },
  76: {
    questext: "Select the most appropriate option to fill in the blank.\nThe president's ______ address, full of clear and moving words, won praise from everyone.",
    options: ["imminent", "stoic", "sanguine", "eloquent"],
    correct: "4",
    exptext: "✅ Eloquent fits because the address used clear, moving words. 📌 Speaking well means eloquent. ❌ Stoic is wrong because it describes a person who shows no feelings."
  },
  77: {
    type: "concept", icon: "🌦️", accent: "#c72340", pauseTimer: true,
    title: "Harbinger",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,64;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈhɑːbɪndʒə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a sign that shows something is about to come</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अग्रदूत, पूर्वसूचक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">forerunner</li><li class="vc-chip">sign</li><li class="vc-chip">omen</li><li class="vc-chip">herald</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The first cuckoo's call is a <b>harbinger</b> of spring in the countryside. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Dark clouds on the horizon are often the <b>harbinger</b> of the monsoon.</p></li><li><span class="vc-n">3</span><p class="vc-s">Experts see rising prices as a <b>harbinger</b> of tougher times.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/26.png" alt="Illustration of the word harbinger: A farmer stands in a green field and looks up with a smile at a cuckoo bird sitting on a branch of a blo" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The first cuckoo's call is a <mark class="vc-hl">harbinger</mark> of spring in the countryside.</p></div></div>
      </div></div>
    `
  },
  78: {
    questext: "Select the most appropriate synonym of the given word.\nHarbinger",
    options: ["Forerunner", "Aftermath", "Memory", "Ending"],
    correct: "1",
    exptext: "✅ A harbinger comes before something and warns of it, so forerunner is the closest word. 📌 Harbinger comes first. ❌ Aftermath is wrong because it means what follows an event."
  },
  79: {
    questext: "Select the most appropriate option to fill in the blank.\nThe early blossoms on the mango trees are a ______ of the coming summer.",
    options: ["epitaph", "ledger", "harbinger", "chronicle"],
    correct: "3",
    exptext: "✅ Harbinger fits because blossoms give a sign that summer is coming. 📌 A sign before an event is a harbinger. ❌ Epitaph is wrong because it is a line written in memory of the dead."
  },
  80: {
    type: "concept", icon: "🎺", accent: "#bf23c7", pauseTimer: true,
    title: "Herald",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:191,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈherəld/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who announces important news or messages</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">संदेशवाहक, उद्घोषक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">messenger</li><li class="vc-chip">announcer</li><li class="vc-chip">crier</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The royal <b>herald</b> blew his trumpet and read the king's order aloud. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The town <b>herald</b> shouted the news of the festival through the market.</p></li><li><span class="vc-n">3</span><p class="vc-s">The <b>herald</b> rode ahead to announce the coming of the prince.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/27.png" alt="Illustration of the word herald: A royal messenger in a bright coat stands in a busy market blowing a long trumpet and holding an unrolled s" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The royal <mark class="vc-hl">herald</mark> blew his trumpet and read the king's order aloud.</p></div></div>
      </div></div>
    `
  },
  81: {
    questext: "Select the most appropriate synonym of the given word.\nHerald",
    options: ["Soldier", "Messenger", "Beggar", "Judge"],
    correct: "2",
    exptext: "✅ A herald announces important news, so messenger is the closest word. 📌 Herald brings the news. ❌ Soldier is wrong because a soldier fights and does not carry announcements."
  },
  82: {
    questext: "Select the most appropriate option to fill in the blank.\nBefore the prince arrived, the royal ______ rode through the town to announce the news.",
    options: ["anchorite", "archivist", "recluse", "herald"],
    correct: "4",
    exptext: "✅ Herald fits because a herald rides ahead to announce news. 📌 Announces means herald. ❌ Recluse is wrong because a recluse avoids people and would not announce anything."
  },
  83: {
    type: "concept", icon: "🕊️", accent: "#2f23c7", pauseTimer: true,
    title: "Emissary",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:47,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈemɪsəri/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person sent on a special mission to represent someone</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दूत, प्रतिनिधि</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">envoy</li><li class="vc-chip">messenger</li><li class="vc-chip">delegate</li><li class="vc-chip">ambassador</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">As a trusted <b>emissary</b>, he carried secret letters across the mountain border. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The president sent a special <b>emissary</b> to settle the border dispute.</p></li><li><span class="vc-n">3</span><p class="vc-s">As the king's <b>emissary</b>, he spoke with the neighbouring ruler about peace.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Emissary comes from the Latin word "to send out".</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/28.png" alt="Illustration of the word emissary: A tired traveller in a long coat rides a horse along a mountain road holding a sealed letter, with a guar" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">As a trusted <mark class="vc-hl">emissary</mark>, he carried secret letters across the mountain border.</p></div></div>
      </div></div>
    `
  },
  84: {
    questext: "Select the most appropriate synonym of the given word.\nEmissary",
    options: ["Envoy", "Prisoner", "Merchant", "Rival"],
    correct: "1",
    exptext: "✅ An emissary is sent to represent someone, so envoy is the closest word. 📌 Emissary is someone sent out. ❌ Rival is wrong because a rival competes against someone instead of representing them."
  },
  85: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person sent on a special mission to represent someone",
    options: ["Recluse", "Savant", "Emissary", "Pedant"],
    correct: "3",
    exptext: "✅ Emissary means a person sent to represent someone on a special mission. 📌 Sent out means emissary. ❌ Recluse is wrong because a recluse lives alone and avoids others."
  },
  86: {
    type: "concept", icon: "🏺", accent: "#23a7c7", pauseTimer: true,
    title: "Archaism",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,167,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈɑːkeɪɪzəm/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an old word or phrase that people no longer use</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पुराना शब्द, अप्रचलित प्रयोग</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">obsolete word</li><li class="vc-chip">old word</li><li class="vc-chip">outdated expression</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">neologism</li><li class="vc-chip">modern word</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Shakespeare's plays contain an <b>archaism</b> on almost every page, so students keep glossaries beside them. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The word "thou" is an <b>archaism</b> that people no longer use in daily speech.</p></li><li><span class="vc-n">3</span><p class="vc-s">Using an <b>archaism</b> in an essay can make modern writing sound strange.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Archaios" is the Greek word for ancient.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/29.png" alt="Illustration of the word archaism: A student sits at a desk with an old open play book, looking puzzled at a faded old-fashioned word on the" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Shakespeare's plays contain an <mark class="vc-hl">archaism</mark> on almost every page, so students keep glossaries beside them.</p></div></div>
      </div></div>
    `
  },
  87: {
    questext: "Select the most appropriate synonym of the given word.\nArchaism",
    options: ["Modern word", "Outdated word", "Slang word", "New phrase"],
    correct: "2",
    exptext: "✅ An archaism is an old word no longer in use, so outdated word is the closest meaning. 📌 \"Archaios\" means ancient. ❌ Modern word is wrong because it is the opposite idea."
  },
  88: {
    questext: "Select the most appropriate option to fill in the blank.\nThe word \"whence\" sounds like an ______ today because very few people still use it.",
    options: ["coinage", "dialect", "jargon", "archaism"],
    correct: "4",
    exptext: "✅ Archaism fits because the word is old and rarely used now. 📌 Old word means archaism. ❌ Coinage is wrong because it is a new word that someone invents."
  },
  89: {
    type: "concept", icon: "🧩", accent: "#23c758", pauseTimer: true,
    title: "Jargon",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,88;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈdʒɑːɡən/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">special words of a profession that other people find hard to understand</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">तकनीकी शब्दावली, पेशेवर बोली</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">technical language</li><li class="vc-chip">cant</li><li class="vc-chip">lingo</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">plain language</li><li class="vc-chip">simple speech</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The mechanic's <b>jargon</b> left me completely confused about what was wrong with my scooter. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The legal <b>jargon</b> in the contract was too hard for ordinary readers.</p></li><li><span class="vc-n">3</span><p class="vc-s">Good teachers avoid <b>jargon</b> and explain ideas in simple words.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/30.png" alt="Illustration of the word jargon: A confused young man stands at a repair shop counter scratching his head, while a mechanic in overalls spea" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The mechanic's <mark class="vc-hl">jargon</mark> left me completely confused about what was wrong with my scooter.</p></div></div>
      </div></div>
    `
  },
  90: {
    questext: "Select the most appropriate antonym of the given word.\nJargon",
    options: ["Plain language", "Lingo", "Technical terms", "Cant"],
    correct: "1",
    exptext: "✅ Jargon is hard professional language, so plain language is the opposite. 📌 Jargon confuses; plain talk clears. ❌ Technical terms is wrong because it is a synonym."
  },
  91: {
    questext: "Select the most appropriate option to fill in the blank.\nThe doctor's talk was full of medical ______, so the patient understood almost nothing.",
    options: ["epilogue", "ledger", "jargon", "harbinger"],
    correct: "3",
    exptext: "✅ Jargon fits because hard professional words left the patient confused. 📌 Hard trade words mean jargon. ❌ Epilogue is wrong because it is a closing section of a book or play."
  },
  92: {
    type: "concept", icon: "🕵️", accent: "#7ec723", pauseTimer: true,
    title: "Argot",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:126,199,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈɑːɡəʊ/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">the secret slang used by a group such as thieves</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">गुप्त बोली, समूह की गुप्त भाषा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">secret slang</li><li class="vc-chip">cant</li><li class="vc-chip">thieves' slang</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Pickpockets in the old city spoke a secret <b>argot</b> to hide their plans. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Prisoners in the old jail developed their own <b>argot</b> so the guards could not follow.</p></li><li><span class="vc-n">3</span><p class="vc-s">The detective learned the gang's <b>argot</b> to understand their secret messages.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/31.png" alt="Illustration of the word argot: In a dim alley at night, three men in caps whisper close together, one making a quiet hand signal, while a s" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Pickpockets in the old city spoke a secret <mark class="vc-hl">argot</mark> to hide their plans.</p></div></div>
      </div></div>
    `
  },
  93: {
    questext: "Select the most appropriate synonym of the given word.\nArgot",
    options: ["Formal speech", "Secret slang", "Poetry", "Plain talk"],
    correct: "2",
    exptext: "✅ Argot is the secret slang of a group, so secret slang is the closest meaning. 📌 Argot hides meaning from outsiders. ❌ Plain talk is wrong because it is open and easy to understand."
  },
  94: {
    questext: "Select the most appropriate option to fill in the blank.\nThe gang members spoke in a secret ______ that outsiders could not follow.",
    options: ["epilogue", "ledger", "almanac", "argot"],
    correct: "4",
    exptext: "✅ Argot fits because it is the secret slang of a group. 📌 Secret group talk means argot. ❌ Ledger is wrong because it is a book of money accounts."
  },
  95: {
    type: "concept", icon: "🆕", accent: "#c78123", pauseTimer: true,
    title: "Neologism",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,129,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/niˈɒlədʒɪzəm/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a newly invented word or phrase</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">नया शब्द, नवशब्द</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">new word</li><li class="vc-chip">coinage</li><li class="vc-chip">newly coined term</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">archaism</li><li class="vc-chip">old word</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The word "selfie" was once a <b>neologism</b>, but now everyone uses it. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">"Podcast" began as a <b>neologism</b> and is now an everyday word.</p></li><li><span class="vc-n">3</span><p class="vc-s">Every new gadget brings a fresh <b>neologism</b> into our language.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Neo" means new, so a neologism is a new word.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/32.png" alt="Illustration of the word neologism: A cheerful teenager takes a picture of herself with a phone held at arm's length, smiling, while a glowi" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The word "selfie" was once a <mark class="vc-hl">neologism</mark>, but now everyone uses it.</p></div></div>
      </div></div>
    `
  },
  96: {
    questext: "Select the most appropriate antonym of the given word.\nNeologism",
    options: ["Archaism", "Slang", "Coinage", "Jargon"],
    correct: "1",
    exptext: "✅ A neologism is a new word, so archaism, an old word no longer used, is the opposite. 📌 \"Neo\" is new; \"archaios\" is old. ❌ Coinage is wrong because it is a synonym."
  },
  97: {
    questext: "Select the most appropriate option to fill in the blank.\n\"Hashtag\" was once a ______ but is now listed in standard dictionaries.",
    options: ["quagmire", "epitaph", "neologism", "tautology"],
    correct: "3",
    exptext: "✅ Neologism fits because \"hashtag\" was a new word before it became common. 📌 New word means neologism. ❌ Tautology is wrong because it means saying the same thing twice."
  },
  98: {
    type: "concept", icon: "💬", accent: "#c72355", pauseTimer: true,
    title: "Colloquialism",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,85;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/kəˈləʊkwiəlɪzəm/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an informal word or phrase used in everyday talk</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">बोलचाल का शब्द, आम बोली</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">informal expression</li><li class="vc-chip">casual phrase</li><li class="vc-chip">everyday phrase</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">formal language</li><li class="vc-chip">formal expression</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Her speech was full of friendly <b>colloquialisms</b>, which made the crowd feel at home. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">"Piece of cake" is a <b>colloquialism</b> meaning that something is very easy.</p></li><li><span class="vc-n">3</span><p class="vc-s">A <b>colloquialism</b> suits friendly talk, but not a formal letter.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">A "colloquy" is a talk, so a colloquialism is a word of casual talk.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/33.png" alt="Illustration of the word colloquialism: Two friends sit on a park bench laughing and chatting casually with relaxed hands; a speech bubble a" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Her speech was full of friendly <mark class="vc-hl">colloquialisms</mark>, which made the crowd feel at home.</p></div></div>
      </div></div>
    `
  },
  99: {
    questext: "Select the most appropriate synonym of the given word.\nColloquialism",
    options: ["Formal phrase", "Informal expression", "Ancient word", "Legal term"],
    correct: "2",
    exptext: "✅ A colloquialism is an informal expression used in daily talk. 📌 Colloquy means a chat. ❌ Formal phrase is wrong because it is the opposite idea."
  },
  100: {
    questext: "Select the most appropriate option to fill in the blank.\nSaying \"hang on\" instead of \"please wait\" is a ______ common in everyday talk.",
    options: ["archaism", "jargon", "epitaph", "colloquialism"],
    correct: "4",
    exptext: "✅ Colloquialism fits because \"hang on\" is an informal phrase of everyday speech. 📌 Chat words mean colloquialism. ❌ Archaism is wrong because it is an old word no longer used."
  },
  101: {
    type: "concept", icon: "🏘️", accent: "#aa23c7", pauseTimer: true,
    title: "Dialect",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:170,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈdaɪəlekt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a form of a language spoken in one region or group</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">बोली, उपभाषा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">regional speech</li><li class="vc-chip">local tongue</li><li class="vc-chip">vernacular</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">standard language</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The farmer spoke in a rural <b>dialect</b> that city visitors found hard to follow. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">People in the hills speak a <b>dialect</b> that sounds very different from city speech.</p></li><li><span class="vc-n">3</span><p class="vc-s">The novel uses a rural <b>dialect</b> to show how its characters really talk.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/34.png" alt="Illustration of the word dialect: A smiling farmer in a turban speaks with a village woman in a green field while a puzzled city visitor wit" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The farmer spoke in a rural <mark class="vc-hl">dialect</mark> that city visitors found hard to follow.</p></div></div>
      </div></div>
    `
  },
  102: {
    questext: "Select the most appropriate antonym of the given word.\nDialect",
    options: ["Standard language", "Local tongue", "Regional speech", "Village talk"],
    correct: "1",
    exptext: "✅ A dialect is a regional form of speech, so standard language, which is the same everywhere, is the opposite. 📌 Dialect is local; standard is national. ❌ Regional speech is wrong because it is a synonym."
  },
  103: {
    questext: "Select the most appropriate option to fill in the blank.\nThough both villages speak the same language, each has its own ______ with different local words.",
    options: ["epilogue", "coinage", "dialect", "impasse"],
    correct: "3",
    exptext: "✅ Dialect fits because it is a local form of one language. 📌 Same language, local style means dialect. ❌ Coinage is wrong because it is a newly invented word."
  },
  104: {
    type: "concept", icon: "❓", accent: "#232cc7", pauseTimer: true,
    title: "Non sequitur",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,44,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌnɒn ˈsekwɪtə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a statement that does not logically follow from what came before</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">असंगत बात, बेतुका निष्कर्ष</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">illogical remark</li><li class="vc-chip">irrelevant statement</li><li class="vc-chip">false conclusion</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">logical conclusion</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">When asked about the budget, his reply about cricket was a complete <b>non sequitur</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Saying "It is raining, so the exam was hard" is a <b>non sequitur</b>.</p></li><li><span class="vc-n">3</span><p class="vc-s">The speaker's last point was a <b>non sequitur</b> that left the audience puzzled.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">It is Latin for "it does not follow".</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/35.png" alt="Illustration of the word non sequitur: At a press conference, a reporter asks a serious question with a budget chart behind the stage, while" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">When asked about the budget, his reply about cricket was a complete <mark class="vc-hl">non sequitur</mark>.</p></div></div>
      </div></div>
    `
  },
  105: {
    questext: "Select the most appropriate synonym of the given word.\nNon sequitur",
    options: ["Sound argument", "Illogical remark", "Clear proof", "Wise saying"],
    correct: "2",
    exptext: "✅ A non sequitur does not follow from what came before, so illogical remark is the closest meaning. 📌 Latin for \"it does not follow\". ❌ Sound argument is wrong because it is the opposite idea."
  },
  106: {
    questext: "Select the option that best expresses the meaning of the given idiom/phrase.\nNon sequitur",
    options: ["A very polite request", "A clever joke", "A repeated question", "A statement that does not follow from what came before"],
    correct: "4",
    exptext: "✅ A non sequitur is a statement that has no logical link to what came before. 📌 Latin for \"it does not follow\". ❌ A repeated question is wrong because the phrase is about a missing link in logic, not repetition."
  },
  107: {
    type: "concept", icon: "🌫️", accent: "#23bcc7", pauseTimer: true,
    title: "Equivocation",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,188,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ɪˌkwɪvəˈkeɪʃən/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">using unclear or double-meaning words to avoid telling the plain truth</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">टालमटोल, गोलमोल बात</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">evasion</li><li class="vc-chip">ambiguity</li><li class="vc-chip">hedging</li><li class="vc-chip">double talk</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">frankness</li><li class="vc-chip">plain speaking</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The minister's <b>equivocation</b> on the tax question made reporters even more suspicious. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Stop your <b>equivocation</b> and tell the court exactly what you saw.</p></li><li><span class="vc-n">3</span><p class="vc-s">Voters grew tired of the leader's <b>equivocation</b> on every serious question.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Equi" means equal and "vocare" means to call, so a word with two equal meanings.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/36.png" alt="Illustration of the word equivocation: A nervous official stands at a podium with a slippery smile and a raised hand, while thin foggy swirl" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The minister's <mark class="vc-hl">equivocation</mark> on the tax question made reporters even more suspicious.</p></div></div>
      </div></div>
    `
  },
  108: {
    questext: "Select the most appropriate antonym of the given word.\nEquivocation",
    options: ["Frankness", "Evasion", "Hedging", "Ambiguity"],
    correct: "1",
    exptext: "✅ Equivocation is vague, evasive talk, so frankness, which is open and honest speech, is the opposite. 📌 Equivocation hides; frankness shows. ❌ Evasion is wrong because it is a synonym."
  },
  109: {
    questext: "Select the most appropriate option to fill in the blank.\nInstead of a direct yes or no, the official offered only ______ about the new rule.",
    options: ["almanac", "epilogue", "equivocation", "ledger"],
    correct: "3",
    exptext: "✅ Equivocation fits because the official avoided a plain answer with vague words. 📌 No straight answer means equivocation. ❌ Epilogue is wrong because it is the closing section of a book or play."
  },
  110: {
    type: "concept", icon: "🔁", accent: "#23c743", pauseTimer: true,
    title: "Tautology",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,67;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/tɔːˈtɒlədʒi/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">saying the same thing twice in different words</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पुनरुक्ति, शब्द-दोहराव</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">repetition</li><li class="vc-chip">redundancy</li><li class="vc-chip">needless repetition</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">conciseness</li><li class="vc-chip">brevity</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The editor cut the <b>tautology</b> from the report to make it shorter. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">"A free gift" is a <b>tautology</b> because every gift is already free.</p></li><li><span class="vc-n">3</span><p class="vc-s">Avoid <b>tautology</b> in your essay and say each point only once.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Tauto" is the Greek word for same, so a tautology says the same thing again.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/37.png" alt="Illustration of the word tautology: An editor with a red pen sits at a desk and crosses out a repeated phrase on a printed page, where the s" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The editor cut the <mark class="vc-hl">tautology</mark> from the report to make it shorter.</p></div></div>
      </div></div>
    `
  },
  111: {
    questext: "Select the most appropriate synonym of the given word.\nTautology",
    options: ["Brief summary", "Needless repetition", "Clear proof", "Hidden meaning"],
    correct: "2",
    exptext: "✅ A tautology says the same thing twice, so needless repetition is the closest meaning. 📌 \"Tauto\" means same. ❌ Brief summary is wrong because a summary is short and not repetitive."
  },
  112: {
    questext: "Select the most appropriate option to fill in the blank.\n\"Return back\" is a ______ because \"return\" already means to come back.",
    options: ["jargon", "dialect", "argot", "tautology"],
    correct: "4",
    exptext: "✅ Tautology fits because \"back\" repeats the idea already in \"return\". 📌 Same idea twice means tautology. ❌ Jargon is wrong because it means hard professional words."
  },
  113: {
    type: "concept", icon: "📅", accent: "#93c723", pauseTimer: true,
    title: "Almanac",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:147,199,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈɔːlmənæk/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a yearly book with a calendar, weather notes and useful facts</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पंचांग, वार्षिक पत्रिका</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">yearbook</li><li class="vc-chip">yearly calendar</li><li class="vc-chip">calendar book</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Farmers once planted crops by checking the weather notes in the village <b>almanac</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The old <b>almanac</b> listed the days of the festivals and the best time for sowing.</p></li><li><span class="vc-n">3</span><p class="vc-s">Dad bought a new <b>almanac</b> every January to check the holidays and tides.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/38.png" alt="Illustration of the word almanac: A farmer in a field holds up a thick yearly book open to a page with a calendar and a small sun and rain s" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Farmers once planted crops by checking the weather notes in the village <mark class="vc-hl">almanac</mark>.</p></div></div>
      </div></div>
    `
  },
  114: {
    questext: "Select the most appropriate synonym of the given word.\nAlmanac",
    options: ["Yearbook", "Novel", "Dictionary", "Diary"],
    correct: "1",
    exptext: "✅ An almanac is a yearly book with a calendar and facts, so yearbook is the closest word. 📌 Almanac is a book for the whole year. ❌ Diary is wrong because it is a private daily record kept by one person."
  },
  115: {
    questext: "Select the most appropriate option to fill in the blank.\nThe farmer checked the ______ for the days of the festivals and the weather notes for the season.",
    options: ["ledger", "epitaph", "almanac", "chronicle"],
    correct: "3",
    exptext: "✅ Almanac fits because it lists festival days and weather notes for the year. 📌 Yearly facts mean almanac. ❌ Ledger is wrong because it records money accounts."
  },
  116: {
    type: "concept", icon: "📜", accent: "#c76c23", pauseTimer: true,
    title: "Chronicle",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,108,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈkrɒnɪkl/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a written record of events in the order they happened</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">इतिवृत्त, वृत्तांत</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">historical record</li><li class="vc-chip">account</li><li class="vc-chip">annals</li><li class="vc-chip">history</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The monk kept a <b>chronicle</b> of every flood and famine in the kingdom. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The court poet wrote a <b>chronicle</b> of the king's victories year by year.</p></li><li><span class="vc-n">3</span><p class="vc-s">The writer's <b>chronicle</b> of the war years is read in many schools.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Chronos" is the Greek word for time, so a chronicle lists events in time order.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/39.png" alt="Illustration of the word chronicle: A monk in a simple robe sits in a stone room writing in a large old book with a quill by candlelight; be" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The monk kept a <mark class="vc-hl">chronicle</mark> of every flood and famine in the kingdom.</p></div></div>
      </div></div>
    `
  },
  117: {
    questext: "Select the most appropriate synonym of the given word.\nChronicle",
    options: ["Weather forecast", "Historical record", "Shop bill", "Short poem"],
    correct: "2",
    exptext: "✅ A chronicle is a record of events in time order, so historical record is the closest meaning. 📌 \"Chronos\" means time. ❌ Weather forecast is wrong because it predicts the future and does not record the past."
  },
  118: {
    questext: "Select the most appropriate option to fill in the blank.\nThe scholar studied a medieval ______ that listed the main events of each year in order.",
    options: ["ledger", "epilogue", "jargon", "chronicle"],
    correct: "4",
    exptext: "✅ Chronicle fits because it lists events in the order they happened. 📌 Time-ordered events mean chronicle. ❌ Ledger is wrong because it records money accounts, not events."
  },
  119: {
    type: "concept", icon: "📒", accent: "#c7236a", pauseTimer: true,
    title: "Ledger",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,106;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈledʒə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a book in which a business records its money accounts</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">बही-खाता, लेखा-बही</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">account book</li><li class="vc-chip">register</li><li class="vc-chip">record of accounts</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The shopkeeper noted every sale in his big <b>ledger</b> before closing the shop. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The accountant checked every line of the <b>ledger</b> to find the missing money.</p></li><li><span class="vc-n">3</span><p class="vc-s">An old <b>ledger</b> showed that the shop once sold milk for two coins.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/40.png" alt="Illustration of the word ledger: A shopkeeper with a pen sits at a wooden counter in the evening writing sales in a big thick account book w" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The shopkeeper noted every sale in his big <mark class="vc-hl">ledger</mark> before closing the shop.</p></div></div>
      </div></div>
    `
  },
  120: {
    questext: "Select the most appropriate synonym of the given word.\nLedger",
    options: ["Account book", "Prayer book", "Story book", "Map book"],
    correct: "1",
    exptext: "✅ A ledger is a book of money accounts, so account book is the closest meaning. 📌 Ledger holds the numbers. ❌ Story book is wrong because it holds tales, not accounts."
  },
  121: {
    questext: "Select the most appropriate option to fill in the blank.\nThe clerk wrote every payment in the shop's ______ at the end of the day.",
    options: ["epilogue", "almanac", "ledger", "epitaph"],
    correct: "3",
    exptext: "✅ Ledger fits because payments are recorded in a book of accounts. 📌 Money entries mean ledger. ❌ Almanac is wrong because it is a yearly book of calendar facts."
  },
  122: {
    type: "concept", icon: "🪨", accent: "#9523c7", pauseTimer: true,
    title: "Epigrapher",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:149,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ɪˈpɪɡrəfə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an expert who studies old writing carved on stone or metal</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">शिलालेख विशेषज्ञ, अभिलेखशास्त्री</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">inscription expert</li><li class="vc-chip">stone-writing expert</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>epigrapher</b> read the ancient king's orders carved on a rock pillar. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>epigrapher</b> copied every letter of the cave inscription onto paper.</p></li><li><span class="vc-n">3</span><p class="vc-s">An <b>epigrapher</b> helps historians read the orders of ancient emperors such as Ashoka.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Epi" means upon and "graphein" means to write, so epigraphy is the study of writing upon stone.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/41.png" alt="Illustration of the word epigrapher: An expert kneels beside a tall stone pillar covered in carved ancient letters, pressing a sheet of pape" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">epigrapher</mark> read the ancient king's orders carved on a rock pillar.</p></div></div>
      </div></div>
    `
  },
  123: {
    questext: "Select the most appropriate synonym of the given word.\nEpigrapher",
    options: ["Manuscript expert", "Inscription expert", "Map expert", "Coin expert"],
    correct: "2",
    exptext: "✅ An epigrapher studies writing carved on stone or metal, so inscription expert is the closest meaning. 📌 \"Epi\" is upon. ❌ Manuscript expert is wrong because that is a paleographer, who studies handwriting on paper or parchment."
  },
  124: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nAn expert who studies old writing carved on stone or metal",
    options: ["Paleographer", "Archivist", "Lexicographer", "Epigrapher"],
    correct: "4",
    exptext: "✅ Epigrapher means an expert in writing carved on stone or metal. 📌 Writing upon stone. ❌ Paleographer is wrong because it means an expert in ancient handwriting."
  },
  125: {
    type: "concept", icon: "⚰️", accent: "#2341c7", pauseTimer: true,
    title: "Epitaph",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,65,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈepɪtɑːf/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">words written on a tomb in memory of the dead</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">समाधि-लेख</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">grave inscription</li><li class="vc-chip">tomb inscription</li><li class="vc-chip">memorial words</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>epitaph</b> on his grave said simply, "He loved the mountains." <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The family chose a short, loving <b>epitaph</b> to carve on the stone.</p></li><li><span class="vc-n">3</span><p class="vc-s">Visitors paused to read the moving <b>epitaph</b> on the soldier's grave.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Epi" means upon and "taphos" means tomb, so an epitaph is writing upon a tomb.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/42.png" alt="Illustration of the word epitaph: A quiet old graveyard at sunset where a visitor with folded hands stands before a simple stone grave carve" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">epitaph</mark> on his grave said simply, "He loved the mountains."</p></div></div>
      </div></div>
    `
  },
  126: {
    questext: "Select the most appropriate synonym of the given word.\nEpitaph",
    options: ["Grave inscription", "Birthday wish", "Wedding vow", "Opening line"],
    correct: "1",
    exptext: "✅ An epitaph is the writing on a grave, so grave inscription is the closest meaning. 📌 \"Taphos\" means tomb. ❌ Opening line is wrong because an epitaph comes at the end of life, not at the start of a text."
  },
  127: {
    questext: "Select the most appropriate option to fill in the blank.\nA line of poetry was carved as an ______ on the poet's grave.",
    options: ["epitome", "epilogue", "epitaph", "ledger"],
    correct: "3",
    exptext: "✅ Epitaph fits because the line was carved on a grave. 📌 Grave words mean epitaph. ❌ Epilogue is wrong because it is the closing part of a book or play."
  },
  128: {
    type: "concept", icon: "🏅", accent: "#23c7be", pauseTimer: true,
    title: "Epitome",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,190;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ɪˈpɪtəmi/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a perfect example of a quality or type</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">आदर्श उदाहरण, मूर्त रूप</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">perfect example</li><li class="vc-chip">embodiment</li><li class="vc-chip">essence</li><li class="vc-chip">model</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The village doctor was the <b>epitome</b> of kindness, treating the poor without any fee. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">With her honesty and courage, she is the <b>epitome</b> of a true leader.</p></li><li><span class="vc-n">3</span><p class="vc-s">That old palace is the <b>epitome</b> of royal grandeur.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/43.png" alt="Illustration of the word epitome: A kind village doctor with a stethoscope sits in a small clinic and gently treats a poor old man, with a h" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The village doctor was the <mark class="vc-hl">epitome</mark> of kindness, treating the poor without any fee.</p></div></div>
      </div></div>
    `
  },
  129: {
    questext: "Select the most appropriate synonym of the given word.\nEpitome",
    options: ["Poor imitation", "Perfect example", "Hidden flaw", "Minor detail"],
    correct: "2",
    exptext: "✅ An epitome is a perfect example of something. 📌 Epitome means \"the best sample\". ❌ Poor imitation is wrong because it is the opposite idea."
  },
  130: {
    questext: "Select the most appropriate option to fill in the blank.\nThe simple, honest shopkeeper was the ______ of kindness in the whole village.",
    options: ["epilogue", "tautology", "epitaph", "epitome"],
    correct: "4",
    exptext: "✅ Epitome fits because the shopkeeper is a perfect example of kindness. 📌 Perfect example means epitome. ❌ Epitaph is wrong because it is the writing on a grave."
  },
  131: {
    type: "concept", icon: "🎬", accent: "#23c72e", pauseTimer: true,
    title: "Epilogue",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,46;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈepɪlɒɡ/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a short section at the end of a book or play</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">उपसंहार, उत्तरवाक्</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">afterword</li><li class="vc-chip">conclusion</li><li class="vc-chip">closing section</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">prologue</li><li class="vc-chip">preface</li><li class="vc-chip">introduction</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The play ended with an <b>epilogue</b> spoken by the main actor. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The book's <b>epilogue</b> told us what happened to every character years later.</p></li><li><span class="vc-n">3</span><p class="vc-s">In the <b>epilogue</b>, the narrator thanks all the people who helped him.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Epi" means upon and "logos" means word, so an epilogue is words added at the end.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/44.png" alt="Illustration of the word epilogue: On a theatre stage, the main actor in costume stands alone in a single spotlight speaking to the audience" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The play ended with an <mark class="vc-hl">epilogue</mark> spoken by the main actor.</p></div></div>
      </div></div>
    `
  },
  132: {
    questext: "Select the most appropriate antonym of the given word.\nEpilogue",
    options: ["Prologue", "Conclusion", "Ending", "Afterword"],
    correct: "1",
    exptext: "✅ An epilogue comes at the end, so prologue, which comes at the start, is the opposite. 📌 Pro means before; epi means after. ❌ Afterword is wrong because it is a synonym."
  },
  133: {
    questext: "Select the most appropriate option to fill in the blank.\nThe novel began with a short prologue and closed with a thoughtful ______.",
    options: ["epitaph", "epitome", "epilogue", "ledger"],
    correct: "3",
    exptext: "✅ Epilogue fits because it is the closing section that matches a prologue at the start. 📌 Prologue first, epilogue last. ❌ Epitaph is wrong because it is the writing on a grave."
  },
  134: {
    type: "concept", icon: "🧊", accent: "#a8c723", pauseTimer: true,
    title: "Stoic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:168,199,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ˈstəʊɪk/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">not showing feelings and calmly accepting pain or trouble</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">संयमी, सहनशील</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">calm</li><li class="vc-chip">unemotional</li><li class="vc-chip">patient</li><li class="vc-chip">uncomplaining</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">emotional</li><li class="vc-chip">excitable</li><li class="vc-chip">complaining</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>stoic</b> old farmer accepted the failed harvest without a single complaint. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">She stayed <b>stoic</b> while the doctor treated the deep cut.</p></li><li><span class="vc-n">3</span><p class="vc-s">The soldiers remained <b>stoic</b> through the long, cold night.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">The Stoics were ancient Greek thinkers who taught calm acceptance of pain and trouble.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/45.png" alt="Illustration of the word stoic: A weathered old farmer stands calmly in a dry, cracked field with his arms folded, looking at withered crops" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">stoic</mark> old farmer accepted the failed harvest without a single complaint.</p></div></div>
      </div></div>
    `
  },
  135: {
    questext: "Select the most appropriate synonym of the given word.\nStoic",
    options: ["Excitable", "Unemotional", "Fearful", "Talkative"],
    correct: "2",
    exptext: "✅ A stoic person stays calm and shows no feelings, so unemotional is the closest word. 📌 Stoic means \"steady in trouble\". ❌ Excitable is wrong because it is the opposite idea."
  },
  136: {
    questext: "Select the most appropriate option to fill in the blank.\nThough he lost everything in the flood, he remained ______ and made no complaint.",
    options: ["imminent", "eloquent", "ubiquitous", "stoic"],
    correct: "4",
    exptext: "✅ Stoic fits because he stayed calm and did not complain. 📌 Calm in pain means stoic. ❌ Eloquent is wrong because it means speaking clearly and powerfully."
  },
  137: {
    type: "concept", icon: "🌤️", accent: "#c75723", pauseTimer: true,
    title: "Sanguine",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,87,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ˈsæŋɡwɪn/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">cheerful and hopeful, especially in a difficult situation</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">आशावादी, आशान्वित</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">optimistic</li><li class="vc-chip">hopeful</li><li class="vc-chip">confident</li><li class="vc-chip">cheerful</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">pessimistic</li><li class="vc-chip">gloomy</li><li class="vc-chip">hopeless</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Despite the poor results, the coach remained <b>sanguine</b> about the next match. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The farmers were <b>sanguine</b> about a good harvest after the early rains.</p></li><li><span class="vc-n">3</span><p class="vc-s">She stayed <b>sanguine</b> even when the first three interviews failed.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Sanguis" is the Latin word for blood; people with a warm, rosy face were thought to be cheerful.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/46.png" alt="Illustration of the word sanguine: A coach in a tracksuit smiles confidently on a training ground, giving a thumbs-up to his team while a sc" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Despite the poor results, the coach remained <mark class="vc-hl">sanguine</mark> about the next match.</p></div></div>
      </div></div>
    `
  },
  138: {
    questext: "Select the most appropriate antonym of the given word.\nSanguine",
    options: ["Pessimistic", "Cheerful", "Hopeful", "Confident"],
    correct: "1",
    exptext: "✅ Sanguine means hopeful, so pessimistic, which means expecting the worst, is the opposite. 📌 Sanguine sees sunshine. ❌ Hopeful is wrong because it is a synonym."
  },
  139: {
    questext: "Select the most appropriate option to fill in the blank.\nDespite two failed attempts, the athlete stayed ______ about winning a medal.",
    options: ["eminent", "omniscient", "sanguine", "imminent"],
    correct: "3",
    exptext: "✅ Sanguine fits because the athlete stayed hopeful after failure. 📌 Hope in trouble means sanguine. ❌ Eminent is wrong because it means famous and respected."
  },
  140: {
    type: "concept", icon: "🏔️", accent: "#c7237f", pauseTimer: true,
    title: "Anchorite",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,127;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈæŋkəraɪt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who lives alone, away from society, for religious reasons</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">संन्यासी, एकांतवासी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">hermit</li><li class="vc-chip">recluse</li><li class="vc-chip">solitary monk</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>anchorite</b> lived in a mountain cave and prayed for most of the day. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>anchorite</b> left the busy city to live alone in a forest hut.</p></li><li><span class="vc-n">3</span><p class="vc-s">Villagers sometimes left food at the cave of the <b>anchorite</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/47.png" alt="Illustration of the word anchorite: A thin old man with a long beard sits cross-legged inside a mountain cave with folded hands in prayer, a" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">anchorite</mark> lived in a mountain cave and prayed for most of the day.</p></div></div>
      </div></div>
    `
  },
  141: {
    questext: "Select the most appropriate synonym of the given word.\nAnchorite",
    options: ["Merchant", "Hermit", "Soldier", "Ruler"],
    correct: "2",
    exptext: "✅ An anchorite lives alone for religious reasons, so hermit is the closest word. 📌 Anchorite means one who withdraws. ❌ Merchant is wrong because a merchant lives among people to trade."
  },
  142: {
    questext: "Select the most appropriate option to fill in the blank.\nAway from all towns, the ______ spent his life in a cave in silent prayer.",
    options: ["orator", "herald", "emissary", "anchorite"],
    correct: "4",
    exptext: "✅ Anchorite fits because he lived alone in a cave for prayer. 📌 Alone and praying means anchorite. ❌ Orator is wrong because an orator gives speeches to people."
  },
  143: {
    type: "concept", icon: "🚪", accent: "#8023c7", pauseTimer: true,
    title: "Recluse",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:128,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈrekluːs/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who lives alone and avoids other people</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">एकांतप्रिय, एकांतवासी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">hermit</li><li class="vc-chip">loner</li><li class="vc-chip">solitary person</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">socialite</li><li class="vc-chip">extrovert</li><li class="vc-chip">mixer</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The famous writer lived as a <b>recluse</b> in a house hidden by tall trees. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">After his retirement he became a <b>recluse</b> and rarely opened the door.</p></li><li><span class="vc-n">3</span><p class="vc-s">The neighbours knew little about the <b>recluse</b> who lived at the end of the lane.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Re" means back and "claudere" means to close, so a recluse has closed himself away.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/48.png" alt="Illustration of the word recluse: A lonely man peeks out through a slightly open door of a quiet house hidden among tall dense trees, with a" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The famous writer lived as a <mark class="vc-hl">recluse</mark> in a house hidden by tall trees.</p></div></div>
      </div></div>
    `
  },
  144: {
    questext: "Select the most appropriate antonym of the given word.\nRecluse",
    options: ["Socialite", "Hermit", "Loner", "Anchorite"],
    correct: "1",
    exptext: "✅ A recluse avoids people, so socialite, who loves company, is the opposite. 📌 Recluse hides; socialite mixes. ❌ Hermit is wrong because it is a synonym."
  },
  145: {
    questext: "Select the most appropriate option to fill in the blank.\nA famous painter, she lived as a ______ and refused every invitation.",
    options: ["harbinger", "herald", "recluse", "orator"],
    correct: "3",
    exptext: "✅ Recluse fits because she lived alone and refused every invitation. 📌 Alone by choice means recluse. ❌ Orator is wrong because an orator loves speaking in public."
  },
  146: {
    type: "concept", icon: "🧘", accent: "#2356c7", pauseTimer: true,
    title: "Ascetic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,86,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/əˈsetɪk/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who gives up comforts and lives very simply for spiritual reasons</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">तपस्वी, संयमी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">self-denying person</li><li class="vc-chip">austere person</li><li class="vc-chip">hermit</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">hedonist</li><li class="vc-chip">pleasure-seeker</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>ascetic</b> slept on the bare floor and ate only one simple meal a day. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>ascetic</b> gave up his rich home to live on simple food and prayer.</p></li><li><span class="vc-n">3</span><p class="vc-s">Though wealthy, he lived like an <b>ascetic</b>, using almost nothing.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Askesis" is the Greek word for training, so an ascetic trains himself to live with very little.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/49.png" alt="Illustration of the word ascetic: A calm thin man in plain cloth sleeps on a bare floor mat in a tiny empty hut, with only a water pot and a" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">ascetic</mark> slept on the bare floor and ate only one simple meal a day.</p></div></div>
      </div></div>
    `
  },
  147: {
    questext: "Select the most appropriate synonym of the given word.\nAscetic",
    options: ["Luxury lover", "Self-denying person", "Money lender", "Famous singer"],
    correct: "2",
    exptext: "✅ An ascetic gives up comforts for spiritual reasons, so self-denying person is the closest meaning. 📌 Ascetic trains in simple living. ❌ Luxury lover is wrong because it is the opposite idea."
  },
  148: {
    questext: "Select the most appropriate option to fill in the blank.\nHe gave up all comforts and lived as an ______ in a bare hut.",
    options: ["orator", "charlatan", "pedant", "ascetic"],
    correct: "4",
    exptext: "✅ Ascetic fits because he gave up comforts and lived simply for spiritual reasons. 📌 Simple living means ascetic. ❌ Charlatan is wrong because it means a fake who pretends to have skills."
  },
  149: {
    type: "concept", icon: "🛋️", accent: "#23c7a9", pauseTimer: true,
    title: "Recline",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,169;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">VERB</span><span class="vc-pron" translate="no">/rɪˈklaɪn/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">to lean or lie back in a relaxed position</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">लेटना, पीछे झुकना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">lean back</li><li class="vc-chip">lie back</li><li class="vc-chip">lounge</li><li class="vc-chip">rest</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">stand up</li><li class="vc-chip">sit upright</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">After lunch, grandfather loved to <b>recline</b> on the cane chair and read. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Passengers may <b>recline</b> their seats once the plane is in the air.</p></li><li><span class="vc-n">3</span><p class="vc-s">She loves to <b>recline</b> on the sofa with a good book.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Re" means back and "clinare" means to lean, so to recline is to lean back.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/50.png" alt="Illustration of the word recline: A relaxed grandfather leans far back in a cane chair on a sunny veranda with his feet on a stool and a boo" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">After lunch, grandfather loved to <mark class="vc-hl">recline</mark> on the cane chair and read.</p></div></div>
      </div></div>
    `
  },
  150: {
    questext: "Select the most appropriate antonym of the given word.\nRecline",
    options: ["Stand up", "Lie back", "Lounge", "Rest"],
    correct: "1",
    exptext: "✅ Recline means to lean back and relax, so stand up is the opposite. 📌 \"Re\" is back. ❌ Lounge is wrong because it is a synonym."
  },
  151: {
    questext: "Select the most appropriate option to fill in the blank.\nAfter the long walk, he decided to ______ on the grass and look at the clouds.",
    options: ["elude", "masquerade", "recline", "withdraw"],
    correct: "3",
    exptext: "✅ Recline fits because he lay back on the grass after a walk. 📌 Lean back means recline. ❌ Elude is wrong because it means to escape cleverly."
  },
  152: {
    type: "concept", icon: "🔮", accent: "#2dc723", pauseTimer: true,
    title: "Mystic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:45,199,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈmɪstɪk/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who seeks deep spiritual truth through prayer and meditation</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">रहस्यवादी, अध्यात्म-साधक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">spiritual seeker</li><li class="vc-chip">seer</li><li class="vc-chip">visionary</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>mystic</b> sat by the river for hours, lost in silent prayer. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>mystic</b> believed that silence leads a person closer to the divine.</p></li><li><span class="vc-n">3</span><p class="vc-s">The poet and <b>mystic</b> taught the love of God through simple songs.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/51.png" alt="Illustration of the word mystic: A peaceful man with closed eyes sits cross-legged on a rock at the edge of a quiet river at dawn in deep me" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">mystic</mark> sat by the river for hours, lost in silent prayer.</p></div></div>
      </div></div>
    `
  },
  153: {
    questext: "Select the most appropriate synonym of the given word.\nMystic",
    options: ["Tax collector", "Spiritual seeker", "Sports coach", "Stage actor"],
    correct: "2",
    exptext: "✅ A mystic seeks spiritual truth through prayer and meditation, so spiritual seeker is the closest meaning. 📌 Mystic means one who seeks the unseen truth. ❌ Stage actor is wrong because an actor performs for an audience."
  },
  154: {
    questext: "Select the most appropriate option to fill in the blank.\nSitting beside the river in silence, the ______ spent hours in deep meditation.",
    options: ["charlatan", "savant", "pedant", "mystic"],
    correct: "4",
    exptext: "✅ Mystic fits because a person in silent meditation by a river seeks spiritual truth. 📌 Meditation means mystic. ❌ Charlatan is wrong because a charlatan is a fake who pretends to have skill."
  },
  155: {
    type: "concept", icon: "🎭", accent: "#bdc723", pauseTimer: true,
    title: "Charlatan",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:189,199,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈʃɑːlətən/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who falsely claims to have special skill or knowledge</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">ढोंगी, नीमहकीम</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">fraud</li><li class="vc-chip">quack</li><li class="vc-chip">impostor</li><li class="vc-chip">fake</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">genuine expert</li><li class="vc-chip">true professional</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>charlatan</b> sold coloured water as a cure for every disease. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>charlatan</b> in a bright coat promised to make people rich in a week.</p></li><li><span class="vc-n">3</span><p class="vc-s">The villagers realised too late that the so-called doctor was a <b>charlatan</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/52.png" alt="Illustration of the word charlatan: A smooth-talking man in a bright coat stands on a cart at a village fair holding up a bottle of coloured" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">charlatan</mark> sold coloured water as a cure for every disease.</p></div></div>
      </div></div>
    `
  },
  156: {
    questext: "Select the most appropriate antonym of the given word.\nCharlatan",
    options: ["Genuine expert", "Quack", "Fraud", "Impostor"],
    correct: "1",
    exptext: "✅ A charlatan falsely claims skill, so genuine expert, who truly has it, is the opposite. 📌 Charlatan fakes; the expert is real. ❌ Quack is wrong because it is a synonym."
  },
  157: {
    questext: "Select the most appropriate option to fill in the blank.\nHe claimed to cure every illness with a single herb, but he was only a ______.",
    options: ["orator", "ascetic", "charlatan", "savant"],
    correct: "3",
    exptext: "✅ Charlatan fits because he made false claims of curing everything. 📌 False claims of skill mean charlatan. ❌ Savant is wrong because a savant is a person with real, deep learning."
  },
  158: {
    type: "concept", icon: "🎭", accent: "#c74223", pauseTimer: true,
    title: "Masquerade",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,66,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">VERB</span><span class="vc-pron" translate="no">/ˌmæskəˈreɪd/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">to pretend to be someone or something you are not</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">ढोंग करना, भेष बदलना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">pretend</li><li class="vc-chip">pose</li><li class="vc-chip">impersonate</li><li class="vc-chip">disguise oneself</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">reveal oneself</li><li class="vc-chip">be genuine</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The thief tried to <b>masquerade</b> as a postman to enter the building. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">She chose to <b>masquerade</b> as a tourist while she studied the market.</p></li><li><span class="vc-n">3</span><p class="vc-s">Fake sellers often <b>masquerade</b> as official dealers on the internet.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">A masquerade is a party where guests wear masks, so to masquerade is to wear a false face.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/53.png" alt="Illustration of the word masquerade: A suspicious man in a postman's cap and a bag walks up to a building gate and presses the bell with a f" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The thief tried to <mark class="vc-hl">masquerade</mark> as a postman to enter the building.</p></div></div>
      </div></div>
    `
  },
  159: {
    questext: "Select the most appropriate synonym of the given word.\nMasquerade",
    options: ["Reveal", "Pose", "Honour", "Escape"],
    correct: "2",
    exptext: "✅ To masquerade is to pretend to be someone else, so pose is the closest word. 📌 Masks mean pretending. ❌ Reveal is wrong because it means to show the truth."
  },
  160: {
    questext: "Select the most appropriate option to fill in the blank.\nThe spy tried to ______ as a waiter to enter the crowded hall.",
    options: ["recline", "withdraw", "elude", "masquerade"],
    correct: "4",
    exptext: "✅ Masquerade fits because the spy pretended to be a waiter. 📌 Pretending to be someone means masquerade. ❌ Elude is wrong because it means to escape from someone."
  },
  161: {
    type: "concept", icon: "🧠", accent: "#c72394", pauseTimer: true,
    title: "Omniscient",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,148;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ɒmˈnɪsiənt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">knowing everything</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सर्वज्ञ</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">all-knowing</li><li class="vc-chip">all-wise</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">ignorant</li><li class="vc-chip">unaware</li><li class="vc-chip">uninformed</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>omniscient</b> narrator of the novel knows what every character secretly thinks. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">In the story, the <b>omniscient</b> wizard knew every secret of the kingdom.</p></li><li><span class="vc-n">3</span><p class="vc-s">No human being is <b>omniscient</b>; everyone must keep learning.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Omni" means all and "scientia" means knowledge, so omniscient means all-knowing.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/54.png" alt="Illustration of the word omniscient: A glowing wise wizard in a star-covered robe sits on a tall tower and looks down over a whole kingdom, " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">omniscient</mark> narrator of the novel knows what every character secretly thinks.</p></div></div>
      </div></div>
    `
  },
  162: {
    questext: "Select the most appropriate antonym of the given word.\nOmniscient",
    options: ["Ignorant", "All-knowing", "Wise", "Informed"],
    correct: "1",
    exptext: "✅ Omniscient means knowing everything, so ignorant, which means knowing little, is the opposite. 📌 \"Omni\" is all. ❌ All-knowing is wrong because it is a synonym."
  },
  163: {
    questext: "Select the most appropriate option to fill in the blank.\nThe student acted as if he were ______ and refused to listen to anyone's advice.",
    options: ["ubiquitous", "eminent", "omniscient", "imminent"],
    correct: "3",
    exptext: "✅ Omniscient fits because he acted as if he knew everything. 📌 Knows all means omniscient. ❌ Ubiquitous is wrong because it means present everywhere."
  },
  164: {
    type: "concept", icon: "📱", accent: "#6b23c7", pauseTimer: true,
    title: "Ubiquitous",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:107,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/juːˈbɪkwɪtəs/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">seeming to be present everywhere at the same time</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सर्वव्यापी, हर जगह मौजूद</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">omnipresent</li><li class="vc-chip">everywhere</li><li class="vc-chip">widespread</li><li class="vc-chip">universal</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">rare</li><li class="vc-chip">scarce</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Mobile phones are <b>ubiquitous</b>; you see them in almost every hand. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Plastic bags became <b>ubiquitous</b> in markets across the country.</p></li><li><span class="vc-n">3</span><p class="vc-s">Smartphones are now so <b>ubiquitous</b> that even toddlers can use them.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Ubique" is the Latin word for everywhere.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/55.png" alt="Illustration of the word ubiquitous: A busy street crossing seen from above where almost every walking person, rider and shopkeeper is holdi" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Mobile phones are <mark class="vc-hl">ubiquitous</mark>; you see them in almost every hand.</p></div></div>
      </div></div>
    `
  },
  165: {
    questext: "Select the most appropriate synonym of the given word.\nUbiquitous",
    options: ["Rare", "Omnipresent", "Hidden", "Ancient"],
    correct: "2",
    exptext: "✅ Ubiquitous means present everywhere, so omnipresent is the closest word. 📌 \"Ubique\" means everywhere. ❌ Rare is wrong because it is the opposite idea."
  },
  166: {
    questext: "Select the most appropriate option to fill in the blank.\nStreet dogs are ______ in the old city; you meet them at every corner.",
    options: ["immanent", "omniscient", "eminent", "ubiquitous"],
    correct: "4",
    exptext: "✅ Ubiquitous fits because you find the dogs at every corner. 📌 Everywhere means ubiquitous. ❌ Omniscient is wrong because it means knowing everything."
  },
  167: {
    type: "concept", icon: "🌿", accent: "#236bc7", pauseTimer: true,
    title: "Immanent",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,107,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ˈɪmənənt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">present inside something as a natural part of it</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अंतर्निहित, भीतर व्याप्त</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">inherent</li><li class="vc-chip">intrinsic</li><li class="vc-chip">innate</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">external</li><li class="vc-chip">extrinsic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The poet felt a quiet beauty <b>immanent</b> in even the smallest pebble. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Many thinkers believe that a spark of goodness is <b>immanent</b> in every person.</p></li><li><span class="vc-n">3</span><p class="vc-s">The sweetness is <b>immanent</b> in the fruit and not added from outside.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Immanent" has "in" in its start: it stays inside.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/56.png" alt="Illustration of the word immanent: A poet sits on a river bank holding a small smooth pebble in his open palm and looking at it with wonder," loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The poet felt a quiet beauty <mark class="vc-hl">immanent</mark> in even the smallest pebble.</p></div></div>
      </div></div>
    `
  },
  168: {
    questext: "Select the most appropriate antonym of the given word.\nImmanent",
    options: ["External", "Inherent", "Intrinsic", "Innate"],
    correct: "1",
    exptext: "✅ Immanent means existing inside, so external, which means coming from outside, is the opposite. 📌 Immanent stays in. ❌ Inherent is wrong because it is a synonym."
  },
  169: {
    questext: "Select the most appropriate option to fill in the blank.\nHonesty was ______ in his nature; nobody had to teach him to tell the truth.",
    options: ["imminent", "eminent", "immanent", "ubiquitous"],
    correct: "3",
    exptext: "✅ Immanent fits because honesty was a natural part of his character. 📌 Inside means immanent. ❌ Imminent is wrong because it looks similar but means about to happen."
  },
  170: {
    type: "concept", icon: "⛈️", accent: "#23c794", pauseTimer: true,
    title: "Imminent",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,148;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ˈɪmɪnənt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">about to happen very soon</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">निकट, आसन्न</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">impending</li><li class="vc-chip">approaching</li><li class="vc-chip">coming soon</li><li class="vc-chip">near</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">distant</li><li class="vc-chip">remote</li><li class="vc-chip">far off</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Black clouds warned that a heavy storm was <b>imminent</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">With the exams <b>imminent</b>, the library was full from early morning.</p></li><li><span class="vc-n">3</span><p class="vc-s">The captain warned the sailors that a cyclone was <b>imminent</b>.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Imminent" rhymes with "in a minute": something that comes in a minute.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/57.png" alt="Illustration of the word imminent: A fishing village seen from the shore where dark storm clouds fill the sky and strong wind bends the palm" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Black clouds warned that a heavy storm was <mark class="vc-hl">imminent</mark>.</p></div></div>
      </div></div>
    `
  },
  171: {
    questext: "Select the most appropriate synonym of the given word.\nImminent",
    options: ["Distant", "Impending", "Past", "Doubtful"],
    correct: "2",
    exptext: "✅ Imminent means about to happen, so impending is the closest word. 📌 Think \"in a minute\". ❌ Distant is wrong because it means far away in time or place."
  },
  172: {
    questext: "Select the most appropriate option to fill in the blank.\nThe final bell was ______, so the students packed their bags in a hurry.",
    options: ["eminent", "immanent", "ubiquitous", "imminent"],
    correct: "4",
    exptext: "✅ Imminent fits because the bell was about to ring. 📌 Very soon means imminent. ❌ Eminent is wrong because it means famous and respected."
  },
  173: {
    type: "concept", icon: "🏆", accent: "#42c723", pauseTimer: true,
    title: "Eminent",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:66,199,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ˈemɪnənt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">famous and respected, especially in a profession</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">प्रतिष्ठित, विख्यात</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">famous</li><li class="vc-chip">renowned</li><li class="vc-chip">distinguished</li><li class="vc-chip">respected</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">obscure</li><li class="vc-chip">unknown</li><li class="vc-chip">undistinguished</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The college invited an <b>eminent</b> scientist to open its new laboratory. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">An <b>eminent</b> judge was invited to chair the committee.</p></li><li><span class="vc-n">3</span><p class="vc-s">She became an <b>eminent</b> surgeon, known across the country.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Eminent comes from a Latin word meaning to stand out, so an eminent person stands out above others.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/58.png" alt="Illustration of the word eminent: A respected elderly scientist in a white coat cuts a ribbon at the door of a new science laboratory, with " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The college invited an <mark class="vc-hl">eminent</mark> scientist to open its new laboratory.</p></div></div>
      </div></div>
    `
  },
  174: {
    questext: "Select the most appropriate antonym of the given word.\nEminent",
    options: ["Obscure", "Respected", "Famous", "Renowned"],
    correct: "1",
    exptext: "✅ Eminent means famous and respected, so obscure, which means unknown, is the opposite. 📌 Eminent stands out; obscure hides. ❌ Renowned is wrong because it is a synonym."
  },
  175: {
    questext: "Select the most appropriate option to fill in the blank.\nThe university honoured the ______ poet with its highest award for a lifetime of work.",
    options: ["imminent", "immanent", "eminent", "omniscient"],
    correct: "3",
    exptext: "✅ Eminent fits because a famous and respected poet would receive the highest award. 📌 Stands out means eminent. ❌ Imminent is wrong because it means about to happen."
  },
  176: {
    type: "concept", icon: "🚧", accent: "#c7bd23", pauseTimer: true,
    title: "Impasse",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,189,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈɪmpɑːs/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a situation in which no progress can be made</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">गतिरोध, अवरोध</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">deadlock</li><li class="vc-chip">stalemate</li><li class="vc-chip">standstill</li><li class="vc-chip">dead end</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">breakthrough</li><li class="vc-chip">progress</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The talks ended in an <b>impasse</b> when neither side would change its demand. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The union and the company reached an <b>impasse</b> over wages.</p></li><li><span class="vc-n">3</span><p class="vc-s">Only a fresh offer could break the <b>impasse</b> between the two countries.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Im" means not and "passe" means pass, so an impasse is a road you cannot pass.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/59.png" alt="Illustration of the word impasse: Two groups of negotiators in suits sit on opposite sides of a long table with folded arms and stubborn fac" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The talks ended in an <mark class="vc-hl">impasse</mark> when neither side would change its demand.</p></div></div>
      </div></div>
    `
  },
  177: {
    questext: "Select the most appropriate synonym of the given word.\nImpasse",
    options: ["Agreement", "Deadlock", "Victory", "Progress"],
    correct: "2",
    exptext: "✅ An impasse is a point where no progress is possible, so deadlock is the closest word. 📌 Not a pass, a blocked road. ❌ Progress is wrong because it is the opposite."
  },
  178: {
    questext: "Select the most appropriate option to fill in the blank.\nNeither party would give way, so the peace talks reached a ______.",
    options: ["reverie", "epilogue", "euphoria", "impasse"],
    correct: "4",
    exptext: "✅ Impasse fits because neither side would move, so no progress was possible. 📌 Stuck talks mean impasse. ❌ Reverie is wrong because it means pleasant daydreaming."
  },
  179: {
    type: "concept", icon: "🌧️", accent: "#c72d23", pauseTimer: true,
    title: "Quagmire",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,45,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈkwɒɡmaɪə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a difficult situation that is hard to get out of</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दलदल, कठिन स्थिति</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">swamp</li><li class="vc-chip">bog</li><li class="vc-chip">predicament</li><li class="vc-chip">mess</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The heavy rain turned the village road into a <b>quagmire</b> of sticky mud. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The company sank into a <b>quagmire</b> of debts and court cases.</p></li><li><span class="vc-n">3</span><p class="vc-s">Our cart wheels stuck in a <b>quagmire</b> after the night's rain.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/60.png" alt="Illustration of the word quagmire: A bullock cart with its wheels stuck deep in thick sticky mud on a village road after heavy rain, while t" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The heavy rain turned the village road into a <mark class="vc-hl">quagmire</mark> of sticky mud.</p></div></div>
      </div></div>
    `
  },
  180: {
    questext: "Select the most appropriate synonym of the given word.\nQuagmire",
    options: ["Predicament", "Success", "Celebration", "Advantage"],
    correct: "1",
    exptext: "✅ A quagmire is a hard-to-escape difficult situation, so predicament is the closest word. 📌 Stuck in mud, stuck in trouble. ❌ Success is wrong because it is a good outcome."
  },
  181: {
    questext: "Select the most appropriate option to fill in the blank.\nAfter weeks of rain, the playground turned into a muddy ______ where no child could run.",
    options: ["reverie", "epitaph", "quagmire", "impasse"],
    correct: "3",
    exptext: "✅ Quagmire fits because it means soft, sticky, muddy ground. 📌 Mud trap means quagmire. ❌ Impasse is wrong because it means a deadlock in talks, not a muddy place."
  },
  182: {
    type: "concept", icon: "🛡️", accent: "#c723a9", pauseTimer: true,
    title: "Pyrrhic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,169;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ˈpɪrɪk/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">describing a win gained at such heavy cost that it feels like a loss</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">महँगी जीत</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">costly</li><li class="vc-chip">ruinous</li><li class="vc-chip">self-defeating</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The team won the final, but with three injured stars it was a <b>Pyrrhic</b> victory. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">After years of legal fights, the family's <b>Pyrrhic</b> victory left them without a home.</p></li><li><span class="vc-n">3</span><p class="vc-s">The party won the election, but losing its best leaders made it a <b>Pyrrhic</b> win.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">King Pyrrhus of ancient Greece won battles against Rome but lost so many soldiers that another such win would have ruined him.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/61.png" alt="Illustration of the word Pyrrhic: A football team celebrates holding a trophy on a pitch, but three players sit or lie on the ground wearing" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The team won the final, but with three injured stars it was a <mark class="vc-hl">Pyrrhic</mark> victory.</p></div></div>
      </div></div>
    `
  },
  183: {
    questext: "Select the most appropriate synonym of the given word.\nPyrrhic",
    options: ["Effortless", "Costly", "Joyful", "Complete"],
    correct: "2",
    exptext: "✅ A Pyrrhic victory is won at a terrible cost, so costly is the closest word. 📌 Win a battle, lose the war. ❌ Effortless is wrong because a Pyrrhic win needs heavy effort and loss."
  },
  184: {
    questext: "Select the most appropriate option to fill in the blank.\nThe side won the match, but five players were injured, so it was only a ______ victory.",
    options: ["imminent", "eloquent", "sanguine", "Pyrrhic"],
    correct: "4",
    exptext: "✅ Pyrrhic fits because the win came with heavy losses. 📌 Heavy cost means Pyrrhic. ❌ Sanguine is wrong because it means hopeful and cheerful."
  },
  185: {
    type: "concept", icon: "🎸", accent: "#5623c7", pauseTimer: true,
    title: "Impromptu",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:86,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ɪmˈprɒmptjuː/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">done without planning or preparation</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">तत्काल, बिना तैयारी का</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">unplanned</li><li class="vc-chip">spontaneous</li><li class="vc-chip">improvised</li><li class="vc-chip">off the cuff</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">planned</li><li class="vc-chip">prepared</li><li class="vc-chip">rehearsed</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Friends gave an <b>impromptu</b> concert on the beach when the evening turned cool. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">He gave an <b>impromptu</b> speech when the chief guest arrived late.</p></li><li><span class="vc-n">3</span><p class="vc-s">The students put on an <b>impromptu</b> play during the power cut.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">It comes from the Latin words "in promptu", meaning "in readiness", but now it means done on the spot.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/62.png" alt="Illustration of the word impromptu: At sunset, a group of friends sit around a bonfire on a beach, one strumming a guitar and another tappin" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Friends gave an <mark class="vc-hl">impromptu</mark> concert on the beach when the evening turned cool.</p></div></div>
      </div></div>
    `
  },
  186: {
    questext: "Select the most appropriate antonym of the given word.\nImpromptu",
    options: ["Rehearsed", "Spontaneous", "Unplanned", "Sudden"],
    correct: "1",
    exptext: "✅ Impromptu means done without preparation, so rehearsed, which means practised in advance, is the opposite. 📌 Impromptu is on the spot. ❌ Spontaneous is wrong because it is a synonym."
  },
  187: {
    questext: "Select the most appropriate option to fill in the blank.\nWhen the guest of honour did not turn up, the host gave a short, ______ speech.",
    options: ["eminent", "imminent", "impromptu", "sanguine"],
    correct: "3",
    exptext: "✅ Impromptu fits because the host spoke without planning. 📌 No planning means impromptu. ❌ Eminent is wrong because it means famous and respected."
  },
  188: {
    type: "concept", icon: "⏱️", accent: "#2380c7", pauseTimer: true,
    title: "Extempore",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,128,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ɪkˈstempəri/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">spoken or done without any preparation</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">तुरंत, बिना तैयारी का</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">unprepared</li><li class="vc-chip">off the cuff</li><li class="vc-chip">improvised</li><li class="vc-chip">impromptu</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">prepared</li><li class="vc-chip">rehearsed</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Students enjoyed the <b>extempore</b> speaking contest, where topics were handed out on the spot. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The teacher asked each student to give an <b>extempore</b> talk on a rainy day.</p></li><li><span class="vc-n">3</span><p class="vc-s">The singer's <b>extempore</b> verse made the whole audience laugh.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Ex tempore" is Latin for "out of the time", meaning spoken at that moment.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/63.png" alt="Illustration of the word extempore: A smiling student stands on a stage with a small slip of paper handed to him moments ago, starting to sp" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Students enjoyed the <mark class="vc-hl">extempore</mark> speaking contest, where topics were handed out on the spot.</p></div></div>
      </div></div>
    `
  },
  189: {
    questext: "Select the most appropriate synonym of the given word.\nExtempore",
    options: ["Rehearsed", "Unprepared", "Written", "Planned"],
    correct: "2",
    exptext: "✅ Extempore means done without preparation, so unprepared is the closest word. 📌 Spoken out of the moment. ❌ Rehearsed is wrong because it means practised in advance."
  },
  190: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nSpoken or done without any preparation",
    options: ["Elaborate", "Reluctant", "Premature", "Extempore"],
    correct: "4",
    exptext: "✅ Extempore means spoken or done without preparation. 📌 \"Ex tempore\" is out of the moment. ❌ Premature is wrong because it means happening too early."
  },
  191: {
    type: "concept", icon: "🧐", accent: "#23c77f", pauseTimer: true,
    title: "Pedant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,127;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈpedənt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who cares too much about small details and rules</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">किताबी विद्वान, बारीकी पसंद</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">nitpicker</li><li class="vc-chip">hair-splitter</li><li class="vc-chip">stickler</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Only a <b>pedant</b> would argue about a comma while the building was on fire. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>pedant</b> corrected the speaker's grammar in the middle of a wedding toast.</p></li><li><span class="vc-n">3</span><p class="vc-s">A <b>pedant</b> often misses the main idea because he is busy with small rules.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/64.png" alt="Illustration of the word pedant: At a wedding feast, an uptight man in glasses raises a finger to correct the speaker's grammar with a stiff" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Only a <mark class="vc-hl">pedant</mark> would argue about a comma while the building was on fire.</p></div></div>
      </div></div>
    `
  },
  192: {
    questext: "Select the most appropriate synonym of the given word.\nPedant",
    options: ["Nitpicker", "Leader", "Dreamer", "Beginner"],
    correct: "1",
    exptext: "✅ A pedant fusses over tiny details and rules, so nitpicker is the closest word. 📌 Pedant picks at small points. ❌ Dreamer is wrong because a dreamer does not care about details."
  },
  193: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ kept pointing out tiny spelling errors while ignoring the brilliant main idea.",
    options: ["savant", "orator", "pedant", "pedagogue"],
    correct: "3",
    exptext: "✅ Pedant fits because he cared only about tiny errors. 📌 Small details mean pedant. ❌ Pedagogue is wrong because it means a teacher."
  },
  194: {
    type: "concept", icon: "🕰️", accent: "#57c723", pauseTimer: true,
    title: "Surrealism",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:87,199,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/səˈrɪəlɪzəm/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an art style that shows dreams and strange, impossible images</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अतियथार्थवाद, स्वप्निल कला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dreamlike art</li><li class="vc-chip">fantasy art</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">realism</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A painting of melting clocks in a desert is a classic work of <b>surrealism</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The painter turned to <b>surrealism</b> to show the strange world of dreams.</p></li><li><span class="vc-n">3</span><p class="vc-s">Flying fish above a city street is a typical scene in <b>surrealism</b>.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Sur" means above, so surrealism goes above reality into dreams.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/65.png" alt="Illustration of the word surrealism: A dreamlike painting on an easel showing soft melting clocks draped over a tree branch and a desert tab" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A painting of melting clocks in a desert is a classic work of <mark class="vc-hl">surrealism</mark>.</p></div></div>
      </div></div>
    `
  },
  195: {
    questext: "Select the most appropriate synonym of the given word.\nSurrealism",
    options: ["Realistic art", "Dreamlike art", "Plain drawing", "Portrait art"],
    correct: "2",
    exptext: "✅ Surrealism shows dreams and strange images, so dreamlike art is the closest meaning. 📌 Sur means above reality. ❌ Realistic art is wrong because it is the opposite idea."
  },
  196: {
    questext: "Select the most appropriate option to fill in the blank.\nA clock melting on a tree branch is a classic image of ______.",
    options: ["verism", "jargon", "veracity", "surrealism"],
    correct: "4",
    exptext: "✅ Surrealism fits because melting clocks are strange, dreamlike images. 📌 Dream art means surrealism. ❌ Verism is wrong because it shows everyday life exactly as it is."
  },
  197: {
    type: "concept", icon: "🎞️", accent: "#c7a823", pauseTimer: true,
    title: "Verism",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,168,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈvɪərɪzəm/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">the use of real, everyday life in art, even when it is ugly</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">यथार्थवाद, सत्यवाद</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">realism</li><li class="vc-chip">naturalism</li><li class="vc-chip">truthful art</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">idealism</li><li class="vc-chip">surrealism</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Critics admired the film's <b>verism</b>, from its dusty streets to its tired faces. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Her paintings of poor workers are famous for their honest <b>verism</b>.</p></li><li><span class="vc-n">3</span><p class="vc-s">The novelist's <b>verism</b> showed life in the slums without any decoration.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Verus" is the Latin word for true, so verism shows life as it truly is.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/66.png" alt="Illustration of the word verism: A film crew shoots a scene on a narrow dusty street with real tired workers, peeling walls and a plain bull" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Critics admired the film's <mark class="vc-hl">verism</mark>, from its dusty streets to its tired faces.</p></div></div>
      </div></div>
    `
  },
  198: {
    questext: "Select the most appropriate antonym of the given word.\nVerism",
    options: ["Idealism", "Realism", "Naturalism", "Truthfulness"],
    correct: "1",
    exptext: "✅ Verism shows life as it truly is, so idealism, which shows life as perfect, is the opposite. 📌 \"Verus\" means true. ❌ Naturalism is wrong because it is a synonym."
  },
  199: {
    questext: "Select the most appropriate option to fill in the blank.\nThe writer chose ______ and showed the village with its dust, hunger and joy exactly as it was.",
    options: ["surrealism", "tautology", "verism", "archaism"],
    correct: "3",
    exptext: "✅ Verism fits because the writer showed real life exactly as it was. 📌 True to life means verism. ❌ Surrealism is wrong because it shows dreams and impossible images."
  },
  200: {
    type: "concept", icon: "✅", accent: "#c7232e", pauseTimer: true,
    title: "Veracity",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,46;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/vəˈræsəti/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">the quality of being truthful and accurate</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सत्यता, सच्चाई</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">truthfulness</li><li class="vc-chip">honesty</li><li class="vc-chip">accuracy</li><li class="vc-chip">truth</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">falsehood</li><li class="vc-chip">dishonesty</li><li class="vc-chip">lie</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The judge questioned the <b>veracity</b> of the witness's story. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Nobody doubted the <b>veracity</b> of the old teacher's words.</p></li><li><span class="vc-n">3</span><p class="vc-s">Reporters must check the <b>veracity</b> of every claim before printing it.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Verus" is the Latin word for true, so veracity is the quality of being true.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/67.png" alt="Illustration of the word veracity: In a courtroom, a judge leans forward with a thoughtful frown and looks closely at a nervous witness stan" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The judge questioned the <mark class="vc-hl">veracity</mark> of the witness's story.</p></div></div>
      </div></div>
    `
  },
  201: {
    questext: "Select the most appropriate synonym of the given word.\nVeracity",
    options: ["Falsehood", "Truthfulness", "Speed", "Courage"],
    correct: "2",
    exptext: "✅ Veracity means being truthful, so truthfulness is the closest word. 📌 \"Verus\" is true. ❌ Falsehood is wrong because it is the opposite idea."
  },
  202: {
    questext: "Select the most appropriate option to fill in the blank.\nThe lawyer questioned the ______ of the statement because it changed three times.",
    options: ["euphoria", "reverie", "impasse", "veracity"],
    correct: "4",
    exptext: "✅ Veracity fits because a changing statement makes people doubt its truth. 📌 Truth means veracity. ❌ Reverie is wrong because it means pleasant daydreaming."
  },
  203: {
    type: "concept", icon: "🌵", accent: "#c723be", pauseTimer: true,
    title: "Masochist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,190;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈmæsəkɪst/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who enjoys suffering or being hurt</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">आत्मपीड़क, स्वपीड़न-प्रेमी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">self-tormentor</li><li class="vc-chip">lover of suffering</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">sadist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Only a <b>masochist</b> would run a marathon barefoot on hot sand for fun. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>masochist</b> smiled when the dentist said the treatment would hurt.</p></li><li><span class="vc-n">3</span><p class="vc-s">Calling someone a <b>masochist</b> means he seems to enjoy hardship and pain.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">The word comes from the name of the writer Leopold von Sacher-Masoch.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/68.png" alt="Illustration of the word masochist: A cheerful man with bare feet steps along a hot sandy road in a desert under a bright sun carrying a hea" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Only a <mark class="vc-hl">masochist</mark> would run a marathon barefoot on hot sand for fun.</p></div></div>
      </div></div>
    `
  },
  204: {
    questext: "Select the most appropriate antonym of the given word.\nMasochist",
    options: ["Sadist", "Victim", "Martyr", "Ascetic"],
    correct: "1",
    exptext: "✅ A masochist enjoys receiving pain, while a sadist enjoys giving it, so sadist is the opposite. 📌 Masochist takes pain; sadist gives pain. ❌ Martyr is wrong because a martyr suffers for a cause, not for pleasure."
  },
  205: {
    questext: "Select the most appropriate option to fill in the blank.\nHe chose to sleep on a bed of thorns and called it fun, so people called him a ______.",
    options: ["savant", "sadist", "masochist", "mystic"],
    correct: "3",
    exptext: "✅ Masochist fits because he enjoyed his own pain. 📌 Enjoys own pain means masochist. ❌ Sadist is wrong because a sadist enjoys hurting others."
  },
  206: {
    type: "concept", icon: "😈", accent: "#4123c7", pauseTimer: true,
    title: "Sadist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:65,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈseɪdɪst/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who enjoys hurting other people</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">परपीड़क</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">tormentor</li><li class="vc-chip">cruel person</li><li class="vc-chip">bully</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">benefactor</li><li class="vc-chip">kind person</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Nobody liked the <b>sadist</b> who teased smaller children until they cried. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The villain in the film is a <b>sadist</b> who enjoys frightening others.</p></li><li><span class="vc-n">3</span><p class="vc-s">Nobody trusts a <b>sadist</b> who takes pleasure in the pain of weaker people.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">The word comes from the name of the French writer the Marquis de Sade.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/69.png" alt="Illustration of the word sadist: A cruel older boy in a school playground grins unkindly while a group of small crying children back away fr" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Nobody liked the <mark class="vc-hl">sadist</mark> who teased smaller children until they cried.</p></div></div>
      </div></div>
    `
  },
  207: {
    questext: "Select the most appropriate synonym of the given word.\nSadist",
    options: ["Benefactor", "Tormentor", "Helper", "Healer"],
    correct: "2",
    exptext: "✅ A sadist enjoys hurting others, so tormentor is the closest word. 📌 Sadist gives pain. ❌ Benefactor is wrong because that person helps others."
  },
  208: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who enjoys hurting other people",
    options: ["Masochist", "Savant", "Pedant", "Sadist"],
    correct: "4",
    exptext: "✅ Sadist means a person who enjoys hurting others. 📌 Sadist gives pain. ❌ Masochist is wrong because that person enjoys suffering pain himself."
  },
  209: {
    type: "concept", icon: "🎓", accent: "#2395c7", pauseTimer: true,
    title: "Savant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,149,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈsævənt/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person with great learning in a special field</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">विद्वान, महापंडित</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">scholar</li><li class="vc-chip">sage</li><li class="vc-chip">learned person</li><li class="vc-chip">expert</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">ignoramus</li><li class="vc-chip">dunce</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The village <b>savant</b> knew the history of every temple in the district. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The young <b>savant</b> solved the hardest puzzle in her class within minutes.</p></li><li><span class="vc-n">3</span><p class="vc-s">The king asked the court <b>savant</b> to explain the movement of the stars.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/70.png" alt="Illustration of the word savant: A wise old scholar sits among a ring of attentive villagers in front of an old temple, pointing to carved w" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The village <mark class="vc-hl">savant</mark> knew the history of every temple in the district.</p></div></div>
      </div></div>
    `
  },
  210: {
    questext: "Select the most appropriate antonym of the given word.\nSavant",
    options: ["Ignoramus", "Scholar", "Expert", "Sage"],
    correct: "1",
    exptext: "✅ A savant has great learning, so ignoramus, a person who knows very little, is the opposite. 📌 Savant knows; ignoramus does not. ❌ Scholar is wrong because it is a synonym."
  },
  211: {
    questext: "Select the most appropriate option to fill in the blank.\nStudents came from distant towns to learn from the ______ who knew everything about the old temples.",
    options: ["pedant", "charlatan", "savant", "recluse"],
    correct: "3",
    exptext: "✅ Savant fits because a person with deep learning teaches others. 📌 Great learning means savant. ❌ Pedant is wrong because a pedant only fusses over small rules."
  },
  212: {
    type: "concept", icon: "🎻", accent: "#23c76a", pauseTimer: true,
    title: "Virtuoso",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,106;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˌvɜːtʃuˈəʊsəʊ/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person with outstanding skill, especially in music</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कला-निपुण, उस्ताद</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">master</li><li class="vc-chip">maestro</li><li class="vc-chip">expert</li><li class="vc-chip">ace</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">amateur</li><li class="vc-chip">novice</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The violin <b>virtuoso</b> played so fast that the audience held its breath. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>virtuoso</b> pianist played the hardest piece without a single mistake.</p></li><li><span class="vc-n">3</span><p class="vc-s">Crowds gathered to watch the sitar <b>virtuoso</b> at the festival.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Virtuoso comes from an Italian word for skill and excellence.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/71.png" alt="Illustration of the word virtuoso: A violinist in a black suit plays on a concert stage with fast, flowing bow movements and closed eyes, wh" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The violin <mark class="vc-hl">virtuoso</mark> played so fast that the audience held its breath.</p></div></div>
      </div></div>
    `
  },
  213: {
    questext: "Select the most appropriate synonym of the given word.\nVirtuoso",
    options: ["Beginner", "Maestro", "Critic", "Listener"],
    correct: "2",
    exptext: "✅ A virtuoso is a person of outstanding skill, so maestro is the closest word. 📌 Virtuoso comes from skill. ❌ Beginner is wrong because it is the opposite idea."
  },
  214: {
    questext: "Select the most appropriate option to fill in the blank.\nThe young violinist was a ______ who could play the hardest piece from memory.",
    options: ["savant", "mystic", "pedant", "virtuoso"],
    correct: "4",
    exptext: "✅ Virtuoso fits because the violinist played with outstanding skill. 📌 Musical genius means virtuoso. ❌ Savant is wrong because it means a person with great learning, not performing skill."
  },
  215: {
    type: "concept", icon: "💭", accent: "#6cc723", pauseTimer: true,
    title: "Allusion",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:108,199,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/əˈluːʒən/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">an indirect reference to something without saying it directly</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">संकेत, परोक्ष उल्लेख</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">indirect reference</li><li class="vc-chip">hint</li><li class="vc-chip">mention</li><li class="vc-chip">reference</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">direct statement</li><li class="vc-chip">explicit mention</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His remark about "a modern Ravana" was an <b>allusion</b> to the greedy contractor. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The poem contains an <b>allusion</b> to the epic Mahabharata.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her joke about a clock striking midnight was an <b>allusion</b> to the story of Cinderella.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Ad" means towards and "ludere" means to play, so an allusion is a playful touch towards something.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/72.png" alt="Illustration of the word allusion: At a dinner table, a man smiles slyly and lifts a finger while telling a joke, a faint outline of a ten-h" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">His remark about "a modern Ravana" was an <mark class="vc-hl">allusion</mark> to the greedy contractor.</p></div></div>
      </div></div>
    `
  },
  216: {
    questext: "Select the most appropriate antonym of the given word.\nAllusion",
    options: ["Direct statement", "Reference", "Mention", "Hint"],
    correct: "1",
    exptext: "✅ An allusion is an indirect reference, so direct statement is the opposite. 📌 Allusion hints; direct statement says. ❌ Hint is wrong because it is a synonym."
  },
  217: {
    questext: "Select the most appropriate option to fill in the blank.\nIn his speech, a casual ______ to the old story made everyone smile.",
    options: ["illusion", "elusion", "allusion", "reverie"],
    correct: "3",
    exptext: "✅ Allusion fits because a casual indirect reference to a story is an allusion. 📌 Allude means hint. ❌ Illusion is wrong because it means a false impression."
  },
  218: {
    type: "concept", icon: "💨", accent: "#c79323", pauseTimer: true,
    title: "Elusion",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,147,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ɪˈluːʒən/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">the act of escaping or avoiding something cleverly</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">चकमा, बचाव</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">escape</li><li class="vc-chip">evasion</li><li class="vc-chip">dodge</li><li class="vc-chip">avoidance</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">capture</li><li class="vc-chip">confrontation</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The thief's <b>elusion</b> of the police lasted three weeks. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The prisoner's clever <b>elusion</b> of the guards made him a legend.</p></li><li><span class="vc-n">3</span><p class="vc-s">His skill in <b>elusion</b> helped him dodge every difficult question.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Elusion" comes from "elude"; both carry the idea of slipping away.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/73.png" alt="Illustration of the word elusion: A thief in a dark cap slips through a narrow gap between two market stalls at night while two police offic" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The thief's <mark class="vc-hl">elusion</mark> of the police lasted three weeks.</p></div></div>
      </div></div>
    `
  },
  219: {
    questext: "Select the most appropriate synonym of the given word.\nElusion",
    options: ["Capture", "Evasion", "Arrival", "Welcome"],
    correct: "2",
    exptext: "✅ Elusion is the act of cleverly escaping, so evasion is the closest word. 📌 Elusion comes from elude. ❌ Capture is wrong because it is the opposite idea."
  },
  220: {
    questext: "Select the most appropriate option to fill in the blank.\nThe spy's quick ______ of the police left them searching empty streets all night.",
    options: ["allusion", "reverie", "illusion", "elusion"],
    correct: "4",
    exptext: "✅ Elusion fits because the spy cleverly escaped the police. 📌 Escape means elusion. ❌ Illusion is wrong because it means a false picture, not an escape."
  },
  221: {
    type: "concept", icon: "🪄", accent: "#c72343", pauseTimer: true,
    title: "Illusion",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,35,67;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ɪˈluːʒən/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a false idea or appearance that seems real</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">भ्रम, माया</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">mirage</li><li class="vc-chip">false impression</li><li class="vc-chip">delusion</li><li class="vc-chip">fantasy</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">reality</li><li class="vc-chip">truth</li><li class="vc-chip">fact</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The shimmering water on the hot road is only an <b>illusion</b> of the desert heat. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A magician creates the <b>illusion</b> of a floating person with mirrors.</p></li><li><span class="vc-n">3</span><p class="vc-s">The belief that money alone brings happiness is an <b>illusion</b>.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Illusion" comes from a Latin word meaning to mock or trick the eye.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/74.png" alt="Illustration of the word illusion: A tired traveller walks on a hot straight road in a desert and sees a shimmering blue pool of water far a" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The shimmering water on the hot road is only an <mark class="vc-hl">illusion</mark> of the desert heat.</p></div></div>
      </div></div>
    `
  },
  222: {
    questext: "Select the most appropriate antonym of the given word.\nIllusion",
    options: ["Reality", "Delusion", "Mirage", "Fantasy"],
    correct: "1",
    exptext: "✅ An illusion is a false appearance, so reality is the opposite. 📌 Illusion looks real but is not. ❌ Mirage is wrong because it is a synonym."
  },
  223: {
    questext: "Select the most appropriate option to fill in the blank.\nThe magician made the girl seem to float in the air, an ______ created with hidden wires.",
    options: ["allusion", "elusion", "illusion", "epilogue"],
    correct: "3",
    exptext: "✅ Illusion fits because the floating was only a false appearance. 📌 Trick of the eye means illusion. ❌ Allusion is wrong because it means an indirect reference."
  },
  224: {
    type: "concept", icon: "🦊", accent: "#bc23c7", pauseTimer: true,
    title: "Elude",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:188,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">VERB</span><span class="vc-pron" translate="no">/ɪˈluːd/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">to escape or avoid someone or something cleverly</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">चकमा देना, बच निकलना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">escape</li><li class="vc-chip">dodge</li><li class="vc-chip">evade</li><li class="vc-chip">avoid</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">capture</li><li class="vc-chip">face</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The fox managed to <b>elude</b> the hunters by hiding in a hollow log. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Thieves often <b>elude</b> the police by changing their clothes.</p></li><li><span class="vc-n">3</span><p class="vc-s">Despite a long search, the answer continued to <b>elude</b> the scientists.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Elude" comes from a Latin word meaning to play a trick on someone and get away.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/75.png" alt="Illustration of the word elude: A clever fox hides inside a hollow log in a forest while two hunters with rifles and a hunting dog walk past" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The fox managed to <mark class="vc-hl">elude</mark> the hunters by hiding in a hollow log.</p></div></div>
      </div></div>
    `
  },
  225: {
    questext: "Select the most appropriate synonym of the given word.\nElude",
    options: ["Capture", "Evade", "Chase", "Welcome"],
    correct: "2",
    exptext: "✅ To elude is to escape cleverly, so evade is the closest word. 📌 Slip away. ❌ Capture is wrong because it is the opposite idea."
  },
  226: {
    questext: "Select the most appropriate option to fill in the blank.\nDespite a long search, the answer continued to ______ the scientists.",
    options: ["recline", "masquerade", "withdraw", "elude"],
    correct: "4",
    exptext: "✅ Elude fits because the answer kept slipping away from them. 📌 Escapes cleverly means elude. ❌ Recline is wrong because it means to lean back."
  },
  227: {
    type: "concept", icon: "🚫", accent: "#2c23c7", pauseTimer: true,
    title: "Anarchist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:44,35,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈænəkɪst/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who believes there should be no government or law</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अराजकतावादी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">rebel</li><li class="vc-chip">revolutionary</li><li class="vc-chip">lawbreaker</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">law-abiding citizen</li><li class="vc-chip">loyalist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Police arrested the <b>anarchist</b> for urging the crowd to ignore every law. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>anarchist</b> believed that people could live in peace without any rulers.</p></li><li><span class="vc-n">3</span><p class="vc-s">The old thinker was called an <b>anarchist</b> because he opposed every government.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"An" means without and "archos" means ruler, so an anarchist wants to live without a ruler.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/76.png" alt="Illustration of the word anarchist: A bold young man stands on a platform in a busy street holding a flag with a crossed-out crown symbol an" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Police arrested the <mark class="vc-hl">anarchist</mark> for urging the crowd to ignore every law.</p></div></div>
      </div></div>
    `
  },
  228: {
    questext: "Select the most appropriate antonym of the given word.\nAnarchist",
    options: ["Law-abiding citizen", "Revolutionary", "Rebel", "Agitator"],
    correct: "1",
    exptext: "✅ An anarchist opposes all government and law, so law-abiding citizen is the opposite. 📌 \"An\" means without. ❌ Rebel is wrong because it is close in meaning."
  },
  229: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who believes there should be no government or law",
    options: ["Atheist", "Pacifist", "Anarchist", "Fatalist"],
    correct: "3",
    exptext: "✅ Anarchist means a person who wants no government or law. 📌 \"An\" is without and \"archos\" is ruler. ❌ Pacifist is wrong because it means a person who opposes war."
  },
  230: {
    type: "concept", icon: "🎯", accent: "#23aac7", pauseTimer: true,
    title: "Realist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,170,199;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈrɪəlɪst/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a person who sees things as they really are</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">यथार्थवादी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">pragmatist</li><li class="vc-chip">practical person</li><li class="vc-chip">down-to-earth person</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">dreamer</li><li class="vc-chip">idealist</li><li class="vc-chip">romantic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The coach, a <b>realist</b>, told the team they were not yet ready for the finals. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>realist</b> plans for problems instead of hoping they will not come.</p></li><li><span class="vc-n">3</span><p class="vc-s">As a <b>realist</b>, she counted the cost before buying the house.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/77.png" alt="Illustration of the word realist: A thoughtful coach with a clipboard stands in front of a seated sports team in a changing room, talking ho" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The coach, a <mark class="vc-hl">realist</mark>, told the team they were not yet ready for the finals.</p></div></div>
      </div></div>
    `
  },
  231: {
    questext: "Select the most appropriate synonym of the given word.\nRealist",
    options: ["Dreamer", "Pragmatist", "Poet", "Gambler"],
    correct: "2",
    exptext: "✅ A realist sees things as they are, so pragmatist is the closest word. 📌 Realist sees real life. ❌ Dreamer is wrong because it is the opposite idea."
  },
  232: {
    questext: "Select the most appropriate option to fill in the blank.\nBeing a ______, he checked the facts and the cost before starting the business.",
    options: ["mystic", "anarchist", "sadist", "realist"],
    correct: "4",
    exptext: "✅ Realist fits because he looked at facts and costs before acting. 📌 Facts first means realist. ❌ Mystic is wrong because it means a person who seeks spiritual truth."
  },
  233: {
    type: "concept", icon: "🚩", accent: "#23c755", pauseTimer: true,
    title: "Jingoistic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:35,199,85;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span><span class="vc-pron" translate="no">/ˌdʒɪŋɡəʊˈɪstɪk/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">showing aggressive and extreme pride in one's own country</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अंधराष्ट्रवादी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">chauvinistic</li><li class="vc-chip">warlike</li><li class="vc-chip">ultra-patriotic</li><li class="vc-chip">aggressive</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">peace-loving</li><li class="vc-chip">moderate</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>jingoistic</b> speaker demanded war and shouted that no other country mattered. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The newspaper's <b>jingoistic</b> articles pushed readers to hate neighbouring countries.</p></li><li><span class="vc-n">3</span><p class="vc-s">True love for the country is different from <b>jingoistic</b> pride that despises others.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">The word comes from an old English song that urged war with the phrase "by jingo".</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/78.png" alt="Illustration of the word jingoistic: An angry speaker in a loud suit stands on a stage waving a large national flag and shouting into a micr" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">jingoistic</mark> speaker demanded war and shouted that no other country mattered.</p></div></div>
      </div></div>
    `
  },
  234: {
    questext: "Select the most appropriate antonym of the given word.\nJingoistic",
    options: ["Peace-loving", "Aggressive", "Chauvinistic", "Warlike"],
    correct: "1",
    exptext: "✅ Jingoistic means aggressively proud of one's country, so peace-loving is the opposite. 📌 Jingo wants war. ❌ Warlike is wrong because it is a synonym."
  },
  235: {
    questext: "Select the most appropriate option to fill in the blank.\nSensible citizens disliked the ______ speech that called for war over a small quarrel.",
    options: ["eloquent", "sanguine", "jingoistic", "stoic"],
    correct: "3",
    exptext: "✅ Jingoistic fits because the speech called for war out of extreme national pride. 📌 Proud of country and wants war means jingoistic. ❌ Eloquent is wrong because it only means speaking clearly and powerfully."
  },
  236: {
    type: "concept", icon: "☁️", accent: "#81c723", pauseTimer: true,
    title: "Reverie",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:129,199,35;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/ˈrevəri/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a state of pleasant daydreaming</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दिवास्वप्न, खयाली दुनिया</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">daydream</li><li class="vc-chip">dream</li><li class="vc-chip">musing</li><li class="vc-chip">trance</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">alertness</li><li class="vc-chip">attention</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A sudden knock at the door broke her <b>reverie</b> by the window. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Lost in a happy <b>reverie</b>, he forgot to get off the bus at his stop.</p></li><li><span class="vc-n">3</span><p class="vc-s">She sat by the fire in a quiet <b>reverie</b> about her childhood home.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">Reverie comes from an old French word meaning to dream or wander in thought.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/79.png" alt="Illustration of the word reverie: A young woman sits by a window with her chin on her hand, gazing at soft clouds in the sky with a dreamy s" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A sudden knock at the door broke her <mark class="vc-hl">reverie</mark> by the window.</p></div></div>
      </div></div>
    `
  },
  237: {
    questext: "Select the most appropriate synonym of the given word.\nReverie",
    options: ["Nightmare", "Daydream", "Argument", "Alarm"],
    correct: "2",
    exptext: "✅ A reverie is a pleasant daydream, so daydream is the closest word. 📌 Awake but dreaming. ❌ Nightmare is wrong because it is a frightening dream during sleep."
  },
  238: {
    questext: "Select the most appropriate option to fill in the blank.\nStaring out of the train window, he fell into a pleasant ______ about his village.",
    options: ["impasse", "quagmire", "euphoria", "reverie"],
    correct: "4",
    exptext: "✅ Reverie fits because he drifted into a pleasant daydream. 📌 Dreamy thoughts mean reverie. ❌ Euphoria is wrong because it means great excitement and joy, not quiet dreaming."
  },
  239: {
    type: "concept", icon: "🎉", accent: "#c77e23", pauseTimer: true,
    title: "Euphoria",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:199,126,35;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span><span class="vc-pron" translate="no">/juːˈfɔːriə/</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">a feeling of great happiness and excitement</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">उल्लास, अत्यंत हर्ष</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">elation</li><li class="vc-chip">joy</li><li class="vc-chip">bliss</li><li class="vc-chip">high spirits</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">despair</li><li class="vc-chip">misery</li><li class="vc-chip">gloom</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The mountaineers felt pure <b>euphoria</b> on reaching the summit at dawn. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The whole city was in <b>euphoria</b> after the team won the world cup.</p></li><li><span class="vc-n">3</span><p class="vc-s">A wave of <b>euphoria</b> swept the hall when the results were announced.</p></li></ol></div>
      <div class="vc-card vc-mem"><div class="vc-lab"><i>💡</i>Memory hook</div><p class="vc-t">"Eu" is the Greek prefix for good, so euphoria is a good feeling.</p></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_1/80.png" alt="Illustration of the word euphoria: A group of mountaineers in bright jackets stand on a snowy summit at sunrise with their arms raised and b" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The mountaineers felt pure <mark class="vc-hl">euphoria</mark> on reaching the summit at dawn.</p></div></div>
      </div></div>
    `
  },
  240: {
    questext: "Select the most appropriate antonym of the given word.\nEuphoria",
    options: ["Despair", "Happiness", "Joy", "Elation"],
    correct: "1",
    exptext: "✅ Euphoria is great happiness, so despair, which means loss of all hope, is the opposite. 📌 \"Eu\" is good. ❌ Elation is wrong because it is a synonym."
  },
  241: {
    questext: "Select the most appropriate option to fill in the blank.\nThe students were filled with ______ when they learned that every one of them had passed.",
    options: ["quagmire", "reverie", "euphoria", "impasse"],
    correct: "3",
    exptext: "✅ Euphoria fits because great happiness follows good news. 📌 Great joy means euphoria. ❌ Impasse is wrong because it means a situation with no progress."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/English_Comprehension/Vocabulary/Set_1/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an open vintage dictionary, a brass quill pen in an inkwell and a few softly glowing golden letters" },
  "images/English_Comprehension/Vocabulary/Set_1/1.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"calligrapher\" at a glance, without reading anything: A calm young woman in a simple kurta sits at a wooden desk, dipping a long pen into an ink pot and writing an elegant wedding invitation in flowing curved letters; ink bottles, brushes and a lamp are beside her. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/2.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"cacography\" at a glance, without reading anything: A worried chemist in a white coat holds a doctor's prescription full of messy, unreadable scribbles, scratching his head with a puzzled face; shelves of medicine bottles behind him; a large question mark above his head. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/3.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"cartographer\" at a glance, without reading anything: A focused man sits at a big table covered with a half-drawn map, holding a ruler and fine pen; a satellite photo of a city lies beside him, a globe and compass stand nearby, and a computer screen shows a digital map. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/4.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"philatelist\" at a glance, without reading anything: A delighted collector in an auction hall raises a numbered paddle to bid for a tiny rare postage stamp shown on a screen; an open stamp album, tweezers and a magnifying glass lie on the desk beside him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/5.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"archivist\" at a glance, without reading anything: A careful woman in white cotton gloves lifts a fragile old document from a labelled box in a quiet archive room; tall shelves of files and boxes stand behind her, and a historian watches from a desk with a notebook. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/6.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"numismatist\" at a glance, without reading anything: An elderly collector with round glasses studies a shiny ancient silver coin with a magnifying glass under a bright desk lamp; open trays of old coins and medals, a small scale and white gloves lie on the table. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/7.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"mint\" at a glance, without reading anything: Inside a government coin factory, workers in safety gear watch a machine stamping shiny round metal discs into new coins; trays of freshly made coins glitter on a conveyor, and a smiling minister in a formal shirt looks on. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/8.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"nyctophobia\" at a glance, without reading anything: A young girl sits up in bed at night with a blanket pulled to her chin and wide frightened eyes, while a small glowing lamp on the bedside table lights the room and dark shadows gather in the far corners. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/9.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"agoraphobia\" at a glance, without reading anything: A nervous man stands in a doorway looking out at a wide, busy town square full of people; he grips the door frame tightly with a scared face, while his small quiet room is visible behind him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/10.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"xenophobia\" at a glance, without reading anything: In a town street, a group of worried locals stand with crossed arms and angry faces, glaring at a family of newcomers with suitcases who look anxious and hold each other close; a faded welcome sign hangs crooked behind them. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/11.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"gynophobia\" at a glance, without reading anything: On a street corner a nervous young man steps back with wide eyes and raised hands, sweating, while a polite woman holding a city map asks him for directions with a friendly, puzzled smile. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/12.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"digamist\" at a glance, without reading anything: A smiling middle-aged king in royal robes stands with a gentle new queen at the palace gate while courtiers cheer with flowers; a framed portrait of his first queen hangs quietly on the wall behind them. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/13.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"claustrophobia\" at a glance, without reading anything: A frightened woman stands at the door of a small, crowded lift with her hand on her chest and a worried face, then turns towards a wide, bright staircase on the other side, which looks open and safe. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/14.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"lexicographer\" at a glance, without reading anything: A patient scholar sits at a desk piled with open dictionaries and index cards, writing a word meaning with a pen; tall shelves of thick dictionaries rise behind him and a small card box stands beside his lamp. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/15.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"etymology\" at a glance, without reading anything: A teacher points to a chalkboard where a word is drawn as a tree, its roots labelled with old languages and its branches showing modern words; a bag of salt sits on the desk, and curious students lean forward. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/16.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"entomology\" at a glance, without reading anything: A scientist in a lab coat studies a beetle through a large microscope; pinned butterflies in glass cases, a net, jars of insects and a wheat plant with a small insect on its leaf are visible around the table. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/17.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"philologist\" at a glance, without reading anything: A scholar with a grey beard studies two old manuscripts in different scripts at a lamp-lit table, writing comparison notes; a language family tree chart hangs on the wall and several ancient books lie open beside him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/18.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"neology\" at a glance, without reading anything: A group of cheerful teenagers sit in a cafe looking at their phones, and glowing new made-up words float above their heads as playful speech bubbles; a thick old dictionary sits unopened on a nearby shelf. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/19.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"paleographer\" at a glance, without reading anything: A scholar with a magnifying glass bends over a fragile old parchment with faded writing under a bright lamp, copying the letters carefully into a notebook; old palm-leaf manuscripts and an inkwell lie beside him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/20.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"coinage\" at a glance, without reading anything: A smiling journalist in a newsroom holds up a poster with a funny new made-up word written in big letters, while colleagues clap; a lightbulb glows above her head and a coffee cup sits on the desk. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/21.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"orator\" at a glance, without reading anything: A confident young man stands at a podium on a stage, one hand raised in a strong gesture, while a packed hall of listeners sits silent and spellbound, their eyes fixed on him; a microphone stands in front of him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/22.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"demagogue\" at a glance, without reading anything: A loud man in a fancy jacket stands on a wooden box in a town square, waving his fist and shouting, while an angry crowd waves banners below him; a few worried citizens at the edge of the crowd watch him doubtfully. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/23.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"pedagogue\" at a glance, without reading anything: An elderly teacher with round glasses and a long wooden pointer stands beside a blackboard in a small dusty village classroom, while rows of children sit on the floor with slates and listen carefully. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/24.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"synagogue\" at a glance, without reading anything: A peaceful old stone building with tall arched windows of coloured stained glass stands on a quiet city street, while families in neat clothes walk up its stone steps towards the carved wooden doors. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/25.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"eloquent\" at a glance, without reading anything: A passionate young woman stands at a lakeside meeting and speaks with an open hand, while a crowd of villagers and a few stern officials listen closely, some wiping their eyes; a blue lake shines in the background. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/26.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"harbinger\" at a glance, without reading anything: A farmer stands in a green field and looks up with a smile at a cuckoo bird sitting on a branch of a blossoming tree, while fresh flowers open around him and the last bit of snow melts on the ground. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/27.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"herald\" at a glance, without reading anything: A royal messenger in a bright coat stands in a busy market blowing a long trumpet and holding an unrolled scroll, while townspeople stop and look up; a king's flag flutters on a pole behind him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/28.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"emissary\" at a glance, without reading anything: A tired traveller in a long coat rides a horse along a mountain road holding a sealed letter, with a guard beside him; snowy peaks rise behind and a distant border gate with two flags is visible ahead. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/29.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"archaism\" at a glance, without reading anything: A student sits at a desk with an old open play book, looking puzzled at a faded old-fashioned word on the page, while a small glossary booklet and a pen lie beside her and a quill pen stands in an ink pot. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/30.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"jargon\" at a glance, without reading anything: A confused young man stands at a repair shop counter scratching his head, while a mechanic in overalls speaks with many strange floating technical words in speech bubbles around him and points at a scooter engine. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/31.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"argot\" at a glance, without reading anything: In a dim alley at night, three men in caps whisper close together, one making a quiet hand signal, while a stranger in the street looks on and cannot understand; a street lamp glows and a market crowd walks by. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/32.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"neologism\" at a glance, without reading anything: A cheerful teenager takes a picture of herself with a phone held at arm's length, smiling, while a glowing new word floats above her like a bright label and an old dictionary on a shelf has no page for it. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/33.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"colloquialism\" at a glance, without reading anything: Two friends sit on a park bench laughing and chatting casually with relaxed hands; a speech bubble above one of them shows a small slice of cake to show the phrase \"piece of cake\", while a stiff man in a suit walks past. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/34.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"dialect\" at a glance, without reading anything: A smiling farmer in a turban speaks with a village woman in a green field while a puzzled city visitor with a suitcase listens nearby, scratching his head; colourful speech bubbles with different shapes float over each speaker. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/35.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"non sequitur\" at a glance, without reading anything: At a press conference, a reporter asks a serious question with a budget chart behind the stage, while the official answers by holding up a cricket bat with a cheerful face; the audience looks confused with raised eyebrows. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/36.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"equivocation\" at a glance, without reading anything: A nervous official stands at a podium with a slippery smile and a raised hand, while thin foggy swirls of unclear words float around him; a row of reporters holds notebooks and microphones and looks doubtful. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/37.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"tautology\" at a glance, without reading anything: An editor with a red pen sits at a desk and crosses out a repeated phrase on a printed page, where the same short sentence is written twice in different words; stacks of paper and a cup of tea rest beside her. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/38.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"almanac\" at a glance, without reading anything: A farmer in a field holds up a thick yearly book open to a page with a calendar and a small sun and rain symbols, looking at the sky, while rows of young crops stand behind him; a hut and a bullock cart are visible. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/39.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"chronicle\" at a glance, without reading anything: A monk in a simple robe sits in a stone room writing in a large old book with a quill by candlelight; behind him, a window shows distant floodwaters, and stacked old volumes and a hourglass sit on his desk. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/40.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"ledger\" at a glance, without reading anything: A shopkeeper with a pen sits at a wooden counter in the evening writing sales in a big thick account book with columns of numbers, while a small brass scale, a few coins and a lantern lie beside him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/41.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"epigrapher\" at a glance, without reading anything: An expert kneels beside a tall stone pillar covered in carved ancient letters, pressing a sheet of paper on it and rubbing it with charcoal to copy the writing; a notebook, a brush and a water bottle lie on the ground. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/42.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"epitaph\" at a glance, without reading anything: A quiet old graveyard at sunset where a visitor with folded hands stands before a simple stone grave carved with a short line of words, while a small mountain outline is carved above it and fresh flowers lie at its base. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/43.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"epitome\" at a glance, without reading anything: A kind village doctor with a stethoscope sits in a small clinic and gently treats a poor old man, with a hand-painted sign saying \"No fee\" on the wall; a queue of grateful villagers waits at the door. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/44.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"epilogue\" at a glance, without reading anything: On a theatre stage, the main actor in costume stands alone in a single spotlight speaking to the audience as the final words of a play, while the other actors wait in the shadows and the red curtain begins to close. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/45.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"stoic\" at a glance, without reading anything: A weathered old farmer stands calmly in a dry, cracked field with his arms folded, looking at withered crops without any tears or anger, while his neighbours around him look upset and talk loudly. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/46.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"sanguine\" at a glance, without reading anything: A coach in a tracksuit smiles confidently on a training ground, giving a thumbs-up to his team while a scoreboard behind shows a losing result; the players look tired but cheerful and the sun shines through light clouds. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/47.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"anchorite\" at a glance, without reading anything: A thin old man with a long beard sits cross-legged inside a mountain cave with folded hands in prayer, a small oil lamp beside him; far below the cave mouth, a quiet village is visible in the valley. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/48.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"recluse\" at a glance, without reading anything: A lonely man peeks out through a slightly open door of a quiet house hidden among tall dense trees, with a high fence and a closed gate, while a neighbour on the lane glances over and wonders about him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/49.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"ascetic\" at a glance, without reading anything: A calm thin man in plain cloth sleeps on a bare floor mat in a tiny empty hut, with only a water pot and a small bowl of rice beside him; a rich house is visible far away through a small window. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/50.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"recline\" at a glance, without reading anything: A relaxed grandfather leans far back in a cane chair on a sunny veranda with his feet on a stool and a book in his hands, while a cup of tea sits on a small table beside him and a garden is visible behind. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/51.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"mystic\" at a glance, without reading anything: A peaceful man with closed eyes sits cross-legged on a rock at the edge of a quiet river at dawn in deep meditation, with golden sunlight on the water and a soft glow around his head; trees and mist surround him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/52.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"charlatan\" at a glance, without reading anything: A smooth-talking man in a bright coat stands on a cart at a village fair holding up a bottle of coloured water, while a crowd gathers; a small boy at the front looks doubtful and a hand-painted sign says \"Cure for everything\". Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/53.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"masquerade\" at a glance, without reading anything: A suspicious man in a postman's cap and a bag walks up to a building gate and presses the bell with a false smile, while a hidden pair of burglar tools peeks out from the bottom of the bag; a security guard watches closely. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/54.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"omniscient\" at a glance, without reading anything: A glowing wise wizard in a star-covered robe sits on a tall tower and looks down over a whole kingdom, with small bright thought bubbles floating over the houses below showing what each person is thinking; the night sky is full of stars. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/55.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"ubiquitous\" at a glance, without reading anything: A busy street crossing seen from above where almost every walking person, rider and shopkeeper is holding a mobile phone to their ear or looking at its screen, with phones shown glowing in many hands of different ages. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/56.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"immanent\" at a glance, without reading anything: A poet sits on a river bank holding a small smooth pebble in his open palm and looking at it with wonder, while soft golden light seems to glow from inside the pebble; a notebook and a pen rest on the grass beside him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/57.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"imminent\" at a glance, without reading anything: A fishing village seen from the shore where dark storm clouds fill the sky and strong wind bends the palm trees; fishermen quickly pull their boats onto the sand and a villager points at the sky with worried eyes. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/58.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"eminent\" at a glance, without reading anything: A respected elderly scientist in a white coat cuts a ribbon at the door of a new science laboratory, with applauding students and teachers around him and a garland of flowers on his neck; cameras flash in the background. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/59.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"impasse\" at a glance, without reading anything: Two groups of negotiators in suits sit on opposite sides of a long table with folded arms and stubborn faces, a stack of unsigned papers lying untouched in the middle; a wall clock shows a late hour and cups of tea stand cold. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/60.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"quagmire\" at a glance, without reading anything: A bullock cart with its wheels stuck deep in thick sticky mud on a village road after heavy rain, while the farmer pulls the bullock and two villagers push from behind; grey clouds hang above and puddles shine around. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/61.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"Pyrrhic\" at a glance, without reading anything: A football team celebrates holding a trophy on a pitch, but three players sit or lie on the ground wearing bandages and holding their legs, while the coach looks tired and worried; a stretcher is being carried in. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/62.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"impromptu\" at a glance, without reading anything: At sunset, a group of friends sit around a bonfire on a beach, one strumming a guitar and another tapping a drum while the others clap and sing; a few strangers walk up to listen and the waves glow orange. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/63.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"extempore\" at a glance, without reading anything: A smiling student stands on a stage with a small slip of paper handed to him moments ago, starting to speak without notes, while a judge with a stopwatch and clipboard watches and the audience listens. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/64.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"pedant\" at a glance, without reading anything: At a wedding feast, an uptight man in glasses raises a finger to correct the speaker's grammar with a stiff expression, holding a small notebook, while the happy couple and guests stare at him in surprise. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/65.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"surrealism\" at a glance, without reading anything: A dreamlike painting on an easel showing soft melting clocks draped over a tree branch and a desert table under a pale orange sky; the artist stands beside it with a brush and a palette, smiling. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/66.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"verism\" at a glance, without reading anything: A film crew shoots a scene on a narrow dusty street with real tired workers, peeling walls and a plain bullock cart; a director watches a monitor, a camera operator stands close, and no decorations or fancy lights are used. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/67.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"veracity\" at a glance, without reading anything: In a courtroom, a judge leans forward with a thoughtful frown and looks closely at a nervous witness standing in the box with his hand on a book; a lawyer takes notes and scales of justice stand on the bench. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/68.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"masochist\" at a glance, without reading anything: A cheerful man with bare feet steps along a hot sandy road in a desert under a bright sun carrying a heavy bag, grinning happily, while a friend nearby stares at him in disbelief holding a water bottle. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/69.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"sadist\" at a glance, without reading anything: A cruel older boy in a school playground grins unkindly while a group of small crying children back away from him, one holding a broken toy; a teacher is seen running towards them from the school door. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/70.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"savant\" at a glance, without reading anything: A wise old scholar sits among a ring of attentive villagers in front of an old temple, pointing to carved walls while explaining its history; a stack of old books lies at his feet and children listen wide-eyed. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/71.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"virtuoso\" at a glance, without reading anything: A violinist in a black suit plays on a concert stage with fast, flowing bow movements and closed eyes, while a large audience sits motionless with open mouths and held breath; stage lights shine on him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/72.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"allusion\" at a glance, without reading anything: At a dinner table, a man smiles slyly and lifts a finger while telling a joke, a faint outline of a ten-headed demon king floats in a thought bubble above him; a nervous man in a suit sits opposite him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/73.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"elusion\" at a glance, without reading anything: A thief in a dark cap slips through a narrow gap between two market stalls at night while two police officers run past him in the opposite direction, looking the wrong way and holding torches. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/74.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"illusion\" at a glance, without reading anything: A tired traveller walks on a hot straight road in a desert and sees a shimmering blue pool of water far ahead that is only a trick of the heat, while the dry sand and a few cactus plants show the truth. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/75.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"elude\" at a glance, without reading anything: A clever fox hides inside a hollow log in a forest while two hunters with rifles and a hunting dog walk past on a path, looking in the other direction; the fox peeks out with bright eyes. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/76.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"anarchist\" at a glance, without reading anything: A bold young man stands on a platform in a busy street holding a flag with a crossed-out crown symbol and shouting to a crowd, while two police officers push through the crowd to reach him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/77.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"realist\" at a glance, without reading anything: A thoughtful coach with a clipboard stands in front of a seated sports team in a changing room, talking honestly with a calm face, while the tired players listen and a whiteboard shows a plan. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/78.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"jingoistic\" at a glance, without reading anything: An angry speaker in a loud suit stands on a stage waving a large national flag and shouting into a microphone, while part of the crowd cheers and a few quiet citizens at the back shake their heads in worry. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/79.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"reverie\" at a glance, without reading anything: A young woman sits by a window with her chin on her hand, gazing at soft clouds in the sky with a dreamy smile, while a floating bubble above her shows a small house and a green field; a half-finished cup of tea sits beside her. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_1/80.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"euphoria\" at a glance, without reading anything: A group of mountaineers in bright jackets stand on a snowy summit at sunrise with their arms raised and big smiles, hugging each other; a flag stands in the snow and golden light spreads over the clouds below. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly."
});

/* CHANGE LOG
   - Pyrrhic: meaning rewritten in plain words as an adjective describing a victory.
   - Existing word list meanings and Hindi meanings were kept; synonyms, antonyms, extra sentences and questions were added.
*/