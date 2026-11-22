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

/* Field: English_Comprehension · Subject: Vocabulary · Chapter: Set_2 · 80 concept pages (+ overview) · 160 questions */

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
      altTitles: ["80 Important English Vocabulary Words With Pictures", "Phobias, Personality, Sleep and Money Words for SSC CGL"],
      description: "Learn 80 important exam words the easy way. Every word comes with its meaning, Hindi meaning, synonyms, antonyms, three example sentences and one picture clue, followed by two exam-style questions.\n\n📌 IN THIS CLASS\n✅ Personality, phobia, speech, sleep and money words\n✅ Meaning and Hindi meaning of every word\n✅ Synonyms and antonyms\n✅ Two exam questions for every word\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Vocabulary #English",
      tags: ["vocabulary for SSC CGL", "English vocabulary", "vocabulary set 2", "word meaning in Hindi", "synonyms and antonyms", "phobia names", "triskaidekaphobia", "ephemeral meaning", "prodigal meaning", "mendacious meaning", "immigrant vs emigrant", "indelible meaning", "laconic meaning", "perspicacious vs perspicuous", "pseudonym patronym acronym", "one word substitution", "SSC CGL English", "banking exam vocabulary", "UPSC vocabulary", "railway exam vocabulary", "daily vocabulary", "English with pictures", "important words for exams", "full class"],
      hashtags: ["SSCCGL", "Vocabulary", "English"],
      thumbText: "VOCAB SET 2 | 80 WORDS",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📚 Vocabulary Set 2 is live: 80 exam words with Hindi meaning, synonyms, antonyms and pictures. Try the questions and tell me your score 🎯",
      chapters: "00:00 Class overview\n00:00 Cynic\n00:00 Censorious\n00:00 Fatalist\n00:00 Epicure\n00:00 Gourmet\n00:00 Misanthrope\n00:00 Misologist\n00:00 Enigma\n00:00 Enchant\n00:00 Incredible\n00:00 Indelible\n00:00 Inevitable\n00:00 Triskaidekaphobia\n00:00 Aichmophobia\n00:00 Pyrophobia\n00:00 Hexakosioihexekontahexaphobia\n00:00 Extravagant\n00:00 Thrifty\n00:00 Prodigal\n00:00 Spendthrift\n00:00 Ephemeral\n00:00 Nascent\n00:00 Incessant\n00:00 Intransient\n00:00 Mendacious\n00:00 Candid\n00:00 Immigrant\n00:00 Emigrant\n00:00 Cynosure\n00:00 Paradigm\n00:00 Prototype\n00:00 Prolixity\n00:00 Taciturnity\n00:00 Loquacious\n00:00 Garrulous\n00:00 Laconic\n00:00 Reticence\n00:00 Brevity\n00:00 Abbreviate\n00:00 Jubilant\n00:00 Lugubrious\n00:00 Maudlin\n00:00 Sardonic\n00:00 Aphonia\n00:00 Aphasia\n00:00 Insomnia\n00:00 Narcolepsy\n00:00 Somnolence\n00:00 Somnambulist\n00:00 Stolid\n00:00 Obtuse\n00:00 Perspicacious\n00:00 Perspicuous\n00:00 Proprietor\n00:00 Indefatigable\n00:00 Invincible\n00:00 Infallible\n00:00 Quixotic\n00:00 Dogmatic\n00:00 Pseudonym\n00:00 Patronym\n00:00 Acronym\n00:00 Homonym\n00:00 Mannequin\n00:00 Sculptor\n00:00 Chancery\n00:00 Peripatetic\n00:00 Wayfarer\n00:00 Sedentary\n00:00 Antipathy\n00:00 Schadenfreude\n00:00 Apathy\n00:00 Protégé\n00:00 Sycophant\n00:00 Altruist\n00:00 Samaritan\n00:00 Philanthropist\n00:00 Burglary\n00:00 Pilferage\n00:00 Window-shopping",
      playlist: "English Vocabulary for Competitive Exams"
    },
    html: `
      <p class="cp-lead">A <u>simple, picture-based vocabulary class</u> with 80 exam words on personality, fears, speech, sleep, money and helpful people. For every word you will see the meaning, the Hindi meaning, synonyms, antonyms, three example sentences and one picture that makes the word easy to remember.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>80</b><span>Words</span></div>
        <div class="cp-stat"><b>160</b><span>Questions</span></div>
        <div class="cp-stat"><b>~200 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Words 1 to 5</b><br>Cynic, Censorious, Fatalist, Epicure, Gourmet. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 6 to 10</b><br>Misanthrope, Misologist, Enigma, Enchant, Incredible. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 11 to 15</b><br>Indelible, Inevitable, Triskaidekaphobia, Aichmophobia, Pyrophobia. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 16 to 20</b><br>Hexakosioihexekontahexaphobia, Extravagant, Thrifty, Prodigal, Spendthrift. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 21 to 25</b><br>Ephemeral, Nascent, Incessant, Intransient, Mendacious. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 26 to 30</b><br>Candid, Immigrant, Emigrant, Cynosure, Paradigm. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 31 to 35</b><br>Prototype, Prolixity, Taciturnity, Loquacious, Garrulous. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 36 to 40</b><br>Laconic, Reticence, Brevity, Abbreviate, Jubilant. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 41 to 45</b><br>Lugubrious, Maudlin, Sardonic, Aphonia, Aphasia. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 46 to 50</b><br>Insomnia, Narcolepsy, Somnolence, Somnambulist, Stolid. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 51 to 55</b><br>Obtuse, Perspicacious, Perspicuous, Proprietor, Indefatigable. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 56 to 60</b><br>Invincible, Infallible, Quixotic, Dogmatic, Pseudonym. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 61 to 65</b><br>Patronym, Acronym, Homonym, Mannequin, Sculptor. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 66 to 70</b><br>Chancery, Peripatetic, Wayfarer, Sedentary, Antipathy. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 71 to 75</b><br>Schadenfreude, Apathy, Protégé, Sycophant, Altruist. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 76 to 80</b><br>Samaritan, Philanthropist, Burglary, Pilferage, Window-shopping. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> synonym, antonym and fill-in-the-blank questions carry a steady number of marks in every Staff Selection Commission Combined Graduate Level paper, so each word you learn well is a mark you can win.</div>
    `
  },
  2: {
    type: "concept", icon: "😒", accent: "#3162d8", pauseTimer: true,
    title: "Cynic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,98,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who believes people act only for selfish reasons and doubts their honesty.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">शंकालु, अविश्वासी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">skeptic</li><li class="vc-chip">doubter</li><li class="vc-chip">pessimist</li><li class="vc-chip">scoffer</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">optimist</li><li class="vc-chip">idealist</li><li class="vc-chip">believer</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The old <b>cynic</b> laughed and said every politician only wants votes, never real change. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Because she was a <b>cynic</b>, she doubted the company's promise of free bonuses for everyone.</p></li><li><span class="vc-n">3</span><p class="vc-s">In the novel, the <b>cynic</b> mocks every noble ideal he meets with bitter wit.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/1.png" alt="Illustration of the word cynic: An elderly man on a park bench rolling his eyes at a smiling politician's poster, folded newspaper in hand, " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The old <mark class="vc-hl">cynic</mark> laughed and said every politician only wants votes, never real change.</p></div></div>
      </div></div>
    `
  },
  3: {
    questext: "Select the most appropriate synonym of the given word.\nCynic",
    options: ["Optimist", "Skeptic", "Cynosure", "Dreamer"],
    correct: "2",
    exptext: "✅ A cynic doubts that people act honestly, so skeptic is the closest word. 📌 Think of a cynic as a sneering doubter. ❌ Optimist is wrong because an optimist hopes for the best and trusts people."
  },
  4: {
    questext: "Select the most appropriate option to fill in the blank.\nThe old shopkeeper was such a ______ that he believed even the kindest gift came with a hidden selfish motive.",
    options: ["admirer", "optimist", "believer", "cynic"],
    correct: "4",
    exptext: "✅ A person who sees selfish motives behind every kind act is a cynic. 📌 Cynic means a sneering doubter of human goodness. ❌ Optimist is wrong because an optimist expects good from people."
  },
  5: {
    type: "concept", icon: "😤", accent: "#a0dd4b", pauseTimer: true,
    title: "Censorious",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:160,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Quick to criticise others harshly and find fault with them.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">छिद्रान्वेषी, निंदक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">critical</li><li class="vc-chip">fault-finding</li><li class="vc-chip">disapproving</li><li class="vc-chip">carping</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">approving</li><li class="vc-chip">praising</li><li class="vc-chip">tolerant</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">My <b>censorious</b> aunt frowned at every dish and listed what was wrong with it. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The editor's <b>censorious</b> remarks left the young reporter afraid to submit another article.</p></li><li><span class="vc-n">3</span><p class="vc-s">His <b>censorious</b> sermon condemned the whole village for its lack of discipline.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/2.png" alt="Illustration of the word censorious: An aunt at a dinner table frowning and pointing a finger at a dish while the cook stands nervously besi" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">My <mark class="vc-hl">censorious</mark> aunt frowned at every dish and listed what was wrong with it.</p></div></div>
      </div></div>
    `
  },
  6: {
    questext: "Select the most appropriate antonym of the given word.\nCensorious",
    options: ["Appreciative", "Fault-finding", "Carping", "Disdainful"],
    correct: "1",
    exptext: "✅ Censorious means harshly critical, so appreciative, which shows approval, is the opposite. 📌 Censorious people hunt for faults; appreciative people notice good points. ❌ Fault-finding is wrong because it is a synonym, not an antonym."
  },
  7: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ judge criticised every small mistake of the young lawyer in front of the whole court.",
    options: ["admiring", "lenient", "censorious", "indifferent"],
    correct: "3",
    exptext: "✅ Censorious fits because the judge harshly criticised every small mistake. 📌 Censorious means quick to find fault. ❌ Lenient is wrong because a lenient judge would forgive small mistakes."
  },
  8: {
    type: "concept", icon: "🎲", accent: "#c526b1", pauseTimer: true,
    title: "Fatalist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,177;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who believes everything is decided by fate and cannot be changed.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">भाग्यवादी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">determinist</li><li class="vc-chip">predestinarian</li><li class="vc-chip">defeatist</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">optimist</li><li class="vc-chip">go-getter</li><li class="vc-chip">achiever</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Being a <b>fatalist</b>, he never hurried and said whatever was written would happen.</p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>fatalist</b> farmer did not insure his crops because he trusted destiny alone. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Greek tragedies often present the <b>fatalist</b> view that no hero can escape destiny.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/3.png" alt="Illustration of the word fatalist: A farmer sitting calmly at his hut door, shrugging and sipping tea while dark storm clouds gather over wh" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">fatalist</mark> farmer did not insure his crops because he trusted destiny alone.</p></div></div>
      </div></div>
    `
  },
  9: {
    questext: "Select the most appropriate synonym of the given word.\nFatalist",
    options: ["Go-getter", "Determinist", "Naturalist", "Reformer"],
    correct: "2",
    exptext: "✅ A fatalist believes events are fixed in advance, which is the idea of a determinist. 📌 Fatalist comes from fate. ❌ Go-getter is wrong because a go-getter works hard to change results."
  },
  10: {
    questext: "Select the most appropriate option to fill in the blank.\nMohan shrugged and said that whatever happens is already written in destiny, and he stopped trying; he is a ______.",
    options: ["pioneer", "rebel", "critic", "fatalist"],
    correct: "4",
    exptext: "✅ Fatalist fits because Mohan believes destiny decides everything. 📌 Fatalist = fate decides. ❌ Rebel is wrong because a rebel fights against rules instead of accepting fate."
  },
  11: {
    type: "concept", icon: "🍷", accent: "#31d8bc", pauseTimer: true,
    title: "Epicure",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,216,188;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who enjoys fine food and drink and has refined taste.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">भोजन-रसिक, शौकीन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">gourmet</li><li class="vc-chip">foodie</li><li class="vc-chip">connoisseur</li><li class="vc-chip">gastronome</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">ascetic</li><li class="vc-chip">abstainer</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>epicure</b> travelled across Italy only to taste the finest truffle pasta. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">As an <b>epicure</b>, she rejected the canteen lunch and cooked a delicate meal herself.</p></li><li><span class="vc-n">3</span><p class="vc-s">The magazine praised the retired judge as an <b>epicure</b> with perfect taste in wine.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/4.png" alt="Illustration of the word epicure: A well-dressed man in an Italian restaurant savouring a plate of truffle pasta with closed eyes, wine glas" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">epicure</mark> travelled across Italy only to taste the finest truffle pasta.</p></div></div>
      </div></div>
    `
  },
  12: {
    questext: "Select the most appropriate antonym of the given word.\nEpicure",
    options: ["Ascetic", "Gourmet", "Foodie", "Connoisseur"],
    correct: "1",
    exptext: "✅ An epicure enjoys fine food and drink, so an ascetic, who gives up such pleasures, is the opposite. 📌 Epicure enjoys luxury; ascetic gives it up. ❌ Gourmet is wrong because it is a synonym."
  },
  13: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who enjoys fine food and drink and has refined taste",
    options: ["Miser", "Ascetic", "Epicure", "Hermit"],
    correct: "3",
    exptext: "✅ Epicure describes a person who enjoys fine food and drink with refined taste. 📌 Epicure = fine eating. ❌ Ascetic is wrong because an ascetic avoids such pleasures."
  },
  14: {
    type: "concept", icon: "🍽️", accent: "#dd9a4b", pauseTimer: true,
    title: "Gourmet",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,154,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who knows a lot about good food and enjoys eating it.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">भोजन-पारखी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">epicure</li><li class="vc-chip">foodie</li><li class="vc-chip">connoisseur</li><li class="vc-chip">bon vivant</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">abstainer</li><li class="vc-chip">ascetic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>gourmet</b> tasted the soup once and named every spice hidden inside it. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A famous <b>gourmet</b> reviewed the new restaurant for the weekend newspaper.</p></li><li><span class="vc-n">3</span><p class="vc-s">Our guest, a true <b>gourmet</b>, praised the chef's sauce as perfectly balanced.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/5.png" alt="Illustration of the word gourmet: A food critic at a table lifting a spoon of soup with closed eyes while a chef watches nervously from the " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">gourmet</mark> tasted the soup once and named every spice hidden inside it.</p></div></div>
      </div></div>
    `
  },
  15: {
    questext: "Select the most appropriate synonym of the given word.\nGourmet",
    options: ["Abstainer", "Foodie", "Glutton", "Cook"],
    correct: "2",
    exptext: "✅ A gourmet loves and knows good food, so foodie is the closest word. 📌 Gourmet means good meals. ❌ Glutton is wrong because a glutton eats too much without taste."
  },
  16: {
    questext: "Select the most appropriate option to fill in the blank.\nThe famous chef invited a ______ to taste the new dish and judge its flavours.",
    options: ["sculptor", "ascetic", "cynic", "gourmet"],
    correct: "4",
    exptext: "✅ A gourmet is an expert in good food, so only a gourmet can judge flavours. 📌 Gourmet = food expert. ❌ Sculptor is wrong because a sculptor carves statues."
  },
  17: {
    type: "concept", icon: "🏔️", accent: "#4d26c5", pauseTimer: true,
    title: "Misanthrope",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:77,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who dislikes and avoids other people and society.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मानवद्वेषी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">hermit</li><li class="vc-chip">loner</li><li class="vc-chip">recluse</li><li class="vc-chip">man-hater</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">philanthropist</li><li class="vc-chip">humanitarian</li><li class="vc-chip">altruist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>misanthrope</b> lived alone on the hill and never answered the village's greetings. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">After years of betrayal, the once-friendly teacher turned into a <b>misanthrope</b>.</p></li><li><span class="vc-n">3</span><p class="vc-s">Molière's famous play shows a <b>misanthrope</b> who hates the hypocrisy of polite society.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/6.png" alt="Illustration of the word misanthrope: A lone man in a hilltop cabin turning his back on a waving village crowd below, closing the curtains, " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">misanthrope</mark> lived alone on the hill and never answered the village's greetings.</p></div></div>
      </div></div>
    `
  },
  18: {
    questext: "Select the most appropriate antonym of the given word.\nMisanthrope",
    options: ["Philanthropist", "Hermit", "Recluse", "Pessimist"],
    correct: "1",
    exptext: "✅ A misanthrope dislikes people, so a philanthropist, who loves and helps people, is the opposite. 📌 Mis- means hate and phil- means love. ❌ Hermit is wrong because a hermit also avoids people, so it is a synonym."
  },
  19: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who dislikes and avoids other people and society",
    options: ["Misogynist", "Philanthropist", "Misanthrope", "Miser"],
    correct: "3",
    exptext: "✅ Misanthrope means a person who dislikes and avoids people. 📌 Anthropos means human being. ❌ Misogynist is wrong because it means a person who hates women only."
  },
  20: {
    type: "concept", icon: "🙉", accent: "#38d831", pauseTimer: true,
    title: "Misologist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:56,216,49;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who hates reasoning, argument or debate.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">तर्क-द्वेषी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">obscurantist</li><li class="vc-chip">anti-intellectual</li><li class="vc-chip">irrationalist</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">rationalist</li><li class="vc-chip">logician</li><li class="vc-chip">debater</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>misologist</b> refused every debate and walked out whenever anyone asked for proof. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Only a <b>misologist</b> would dismiss clear evidence simply because it needed careful thinking.</p></li><li><span class="vc-n">3</span><p class="vc-s">The philosopher warned that failed arguments can turn a thinker into a <b>misologist</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/7.png" alt="Illustration of the word misologist: A man in a college hall angrily pushing away a stack of books and charts, covering his ears while a deb" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">misologist</mark> refused every debate and walked out whenever anyone asked for proof.</p></div></div>
      </div></div>
    `
  },
  21: {
    questext: "Select the most appropriate synonym of the given word.\nMisologist",
    options: ["Rationalist", "Anti-intellectual", "Mythologist", "Philologist"],
    correct: "2",
    exptext: "✅ A misologist hates reasoning, so anti-intellectual is the closest word. 📌 Miso means hate and logos means reason. ❌ Rationalist is wrong because a rationalist trusts reason."
  },
  22: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ walked out of the debate, saying that arguments and logic were a waste of time.",
    options: ["debater", "rationalist", "logician", "misologist"],
    correct: "4",
    exptext: "✅ Misologist fits because the person hates argument and logic. 📌 Misologist = hater of reason. ❌ Debater is wrong because a debater enjoys argument."
  },
  23: {
    type: "concept", icon: "🧩", accent: "#dd4b7c", pauseTimer: true,
    title: "Enigma",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,75,124;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person or thing that is mysterious and very difficult to understand.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पहेली, रहस्य</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">puzzle</li><li class="vc-chip">riddle</li><li class="vc-chip">mystery</li><li class="vc-chip">conundrum</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">clarity</li><li class="vc-chip">solution</li><li class="vc-chip">explanation</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The missing painting remained an <b>enigma</b> to the police for twenty years.</p></li><li><span class="vc-n">2</span><p class="vc-s">To his classmates, the quiet new boy was a complete <b>enigma</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Even today, the origin of the ancient script is an <b>enigma</b> to scholars.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/8.png" alt="Illustration of the word enigma: Classmates in a bright classroom looking curiously and puzzled at a quiet new boy sitting by the window wit" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">To his classmates, the quiet new boy was a complete <mark class="vc-hl">enigma</mark>.</p></div></div>
      </div></div>
    `
  },
  24: {
    questext: "Select the most appropriate antonym of the given word.\nEnigma",
    options: ["Clarity", "Riddle", "Mystery", "Conundrum"],
    correct: "1",
    exptext: "✅ An enigma is hard to understand, so clarity, which means clear understanding, is the opposite. 📌 Enigma = puzzle; clarity = clear. ❌ Riddle is wrong because it is a synonym."
  },
  25: {
    questext: "Select the most appropriate option to fill in the blank.\nThe sudden disappearance of the pilot remained an ______ for many years, and nobody could explain it.",
    options: ["answer", "explanation", "enigma", "announcement"],
    correct: "3",
    exptext: "✅ Enigma fits because nobody could explain the disappearance. 📌 Enigma = unsolved puzzle. ❌ Explanation is wrong because the sentence says nobody could explain it."
  },
  26: {
    type: "concept", icon: "✨", accent: "#2689c5", pauseTimer: true,
    title: "Enchant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,137,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">VERB</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">To fill someone with great delight or charm them completely.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मोहित करना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">charm</li><li class="vc-chip">captivate</li><li class="vc-chip">bewitch</li><li class="vc-chip">mesmerize</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">repel</li><li class="vc-chip">bore</li><li class="vc-chip">disillusion</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The street magician's tricks always <b>enchant</b> the children who gather around him.</p></li><li><span class="vc-n">2</span><p class="vc-s">Her sweet voice could <b>enchant</b> the whole audience within the first song.</p></li><li><span class="vc-n">3</span><p class="vc-s">In the fairy tale, the witch tried to <b>enchant</b> the prince with a magic spell. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/9.png" alt="Illustration of the word enchant: A fairy-tale witch in a forest waving a glowing wand over a prince who stares dreamily, golden sparkles in" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">In the fairy tale, the witch tried to <mark class="vc-hl">enchant</mark> the prince with a magic spell.</p></div></div>
      </div></div>
    `
  },
  27: {
    questext: "Select the most appropriate synonym of the given word.\nEnchant",
    options: ["Repel", "Charm", "Enact", "Bore"],
    correct: "2",
    exptext: "✅ To enchant is to delight someone completely, so charm is the closest word. 📌 Think of a spell that charms. ❌ Repel is wrong because it means to push away, the opposite idea."
  },
  28: {
    questext: "Select the most appropriate option to fill in the blank.\nThe magician's tricks will ______ the children, and they will not stop smiling.",
    options: ["annoy", "repel", "bore", "enchant"],
    correct: "4",
    exptext: "✅ Enchant fits because the children are delighted and keep smiling. 📌 Enchant = delight with charm. ❌ Bore is wrong because bored children would not keep smiling."
  },
  29: {
    type: "concept", icon: "🤯", accent: "#cad831", pauseTimer: true,
    title: "Incredible",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:202,216,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Too strange or amazing to be believed.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अविश्वसनीय, अद्भुत</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">unbelievable</li><li class="vc-chip">astonishing</li><li class="vc-chip">amazing</li><li class="vc-chip">unimaginable</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">ordinary</li><li class="vc-chip">credible</li><li class="vc-chip">believable</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">He told an <b>incredible</b> story about meeting a tiger on his way to school.</p></li><li><span class="vc-n">2</span><p class="vc-s">The team made an <b>incredible</b> comeback, scoring three goals in the final five minutes. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The scientist rejected the <b>incredible</b> claim that the machine could create energy from nothing.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/10.png" alt="Illustration of the word incredible: Cheering football fans leaping from the stands as their team scores a last-minute goal under floodlight" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The team made an <mark class="vc-hl">incredible</mark> comeback, scoring three goals in the final five minutes.</p></div></div>
      </div></div>
    `
  },
  30: {
    questext: "Select the most appropriate antonym of the given word.\nIncredible",
    options: ["Believable", "Unbelievable", "Astonishing", "Incredulous"],
    correct: "1",
    exptext: "✅ Incredible means too amazing to be believed, so believable is the opposite. 📌 In- means not, so incredible means not credible. ❌ Unbelievable is wrong because it is a synonym."
  },
  31: {
    questext: "Select the most appropriate option to fill in the blank.\nThe rescue was so ______ that newspapers called it a miracle.",
    options: ["credible", "ordinary", "incredible", "trivial"],
    correct: "3",
    exptext: "✅ Incredible fits because a miracle is too amazing to believe. 📌 Incredible = hard to believe. ❌ Ordinary is wrong because an ordinary rescue would not be called a miracle."
  },
  32: {
    type: "concept", icon: "🖋️", accent: "#be4bdd", pauseTimer: true,
    title: "Indelible",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:190,75,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Impossible to remove or erase; leaving a lasting mark.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अमिट</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">permanent</li><li class="vc-chip">lasting</li><li class="vc-chip">ineradicable</li><li class="vc-chip">enduring</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">erasable</li><li class="vc-chip">temporary</li><li class="vc-chip">fading</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The teacher's kind words left an <b>indelible</b> mark on the young student's heart.</p></li><li><span class="vc-n">2</span><p class="vc-s">Voters get <b>indelible</b> ink on a finger so that nobody can vote twice. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The tragedy left an <b>indelible</b> scar on the history of the city.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/11.png" alt="Illustration of the word indelible: A voter in a polling booth having a dark ink mark applied to a finger by an official, ballot box behind." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Voters get <mark class="vc-hl">indelible</mark> ink on a finger so that nobody can vote twice.</p></div></div>
      </div></div>
    `
  },
  33: {
    questext: "Select the most appropriate synonym of the given word.\nIndelible",
    options: ["Erasable", "Permanent", "Indelicate", "Fragile"],
    correct: "2",
    exptext: "✅ Indelible marks cannot be removed, so permanent is the closest word. 📌 In- means not and delible means able to be erased. ❌ Erasable is wrong because it is the opposite."
  },
  34: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ink was ______, so the stain stayed on his shirt even after many washes.",
    options: ["faint", "erasable", "temporary", "indelible"],
    correct: "4",
    exptext: "✅ Indelible fits because the stain could not be washed out. 📌 Indelible = cannot be erased. ❌ Erasable is wrong because an erasable stain would wash away."
  },
  35: {
    type: "concept", icon: "⏳", accent: "#26c575", pauseTimer: true,
    title: "Inevitable",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,117;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Certain to happen and impossible to avoid.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अपरिहार्य</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">unavoidable</li><li class="vc-chip">inescapable</li><li class="vc-chip">certain</li><li class="vc-chip">destined</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">avoidable</li><li class="vc-chip">uncertain</li><li class="vc-chip">doubtful</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">With the river nearly dry, a water crisis in the village seemed <b>inevitable</b>.</p></li><li><span class="vc-n">2</span><p class="vc-s">Change is <b>inevitable</b>, so wise people learn to adapt rather than complain.</p></li><li><span class="vc-n">3</span><p class="vc-s">After the third missed deadline, his dismissal from the job became <b>inevitable</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/12.png" alt="Illustration of the word inevitable: A man at an office desk beside a pile of unfinished files, a manager at the door holding an envelope, g" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">After the third missed deadline, his dismissal from the job became <mark class="vc-hl">inevitable</mark>.</p></div></div>
      </div></div>
    `
  },
  36: {
    questext: "Select the most appropriate antonym of the given word.\nInevitable",
    options: ["Avoidable", "Unavoidable", "Inescapable", "Certain"],
    correct: "1",
    exptext: "✅ Inevitable means certain to happen, so avoidable is the opposite. 📌 In- means not, so in-evitable means not avoidable. ❌ Unavoidable is wrong because it is a synonym."
  },
  37: {
    questext: "Select the most appropriate option to fill in the blank.\nWith no rain for months, a shortage of water in the town became ______.",
    options: ["unlikely", "avoidable", "inevitable", "doubtful"],
    correct: "3",
    exptext: "✅ Inevitable fits because the long drought made a shortage certain. 📌 Inevitable = cannot be avoided. ❌ Unlikely is wrong because a drought makes a shortage very likely."
  },
  38: {
    type: "concept", icon: "1️⃣", accent: "#d85431", pauseTimer: true,
    title: "Triskaidekaphobia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,84,49;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">An extreme fear of the number thirteen.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">तेरह अंक का भय</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dread</li><li class="vc-chip">superstition</li><li class="vc-chip">fear</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Because of his <b>triskaidekaphobia</b>, the hotel owner skipped the thirteenth floor completely. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Her <b>triskaidekaphobia</b> made her cancel the flight planned for Friday the thirteenth.</p></li><li><span class="vc-n">3</span><p class="vc-s">Many tall buildings leave out the number thirteen because of widespread <b>triskaidekaphobia</b> among buyers.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/13.png" alt="Illustration of the word triskaidekaphobia: A worried hotel owner pointing at a model of a skyscraper, telling a puzzled architect to leave " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Because of his <mark class="vc-hl">triskaidekaphobia</mark>, the hotel owner skipped the thirteenth floor completely.</p></div></div>
      </div></div>
    `
  },
  39: {
    questext: "Select the most appropriate synonym of the given word.\nTriskaidekaphobia",
    options: ["Dread of fire", "Dread of the number thirteen", "Dread of sharp needles", "Love for the number thirteen"],
    correct: "2",
    exptext: "✅ Triskaidekaphobia is an extreme fear of the number thirteen. 📌 Triskaideka means thirteen and phobia means fear. ❌ Dread of fire is wrong because that is called pyrophobia."
  },
  40: {
    questext: "Select the most appropriate option to fill in the blank.\nSome hotels have no thirteenth floor to avoid upsetting guests who suffer from ______.",
    options: ["hydrophobia", "pyrophobia", "aichmophobia", "triskaidekaphobia"],
    correct: "4",
    exptext: "✅ Triskaidekaphobia fits because it is the fear of the number thirteen. 📌 Thirteen floor, thirteen fear. ❌ Pyrophobia is wrong because it is the fear of fire."
  },
  41: {
    type: "concept", icon: "💉", accent: "#4b57dd", pauseTimer: true,
    title: "Aichmophobia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,87,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">An extreme fear of needles or sharp pointed objects.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">नुकीली चीज़ों का भय</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dread</li><li class="vc-chip">terror</li><li class="vc-chip">horror</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His <b>aichmophobia</b> made him faint whenever the nurse brought out an injection.</p></li><li><span class="vc-n">2</span><p class="vc-s">Because of <b>aichmophobia</b>, the little girl refused to hold even a sewing needle. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The dentist treated her <b>aichmophobia</b> with patience, explaining each tool before using it.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/14.png" alt="Illustration of the word aichmophobia: A small girl hiding behind her mother's saree in a bright room, staring wide-eyed at a sewing needle " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Because of <mark class="vc-hl">aichmophobia</mark>, the little girl refused to hold even a sewing needle.</p></div></div>
      </div></div>
    `
  },
  42: {
    questext: "Select the most appropriate synonym of the given word.\nAichmophobia",
    options: ["Dread of needles and sharp points", "Dread of fire", "Dread of the number thirteen", "Dread of water"],
    correct: "1",
    exptext: "✅ Aichmophobia is an extreme fear of needles and sharp points. 📌 Aichme means point in Greek. ❌ Dread of fire is wrong because that is pyrophobia."
  },
  43: {
    questext: "Select the most appropriate option to fill in the blank.\nThe boy trembled at the sight of the doctor's needle because he suffers from ______.",
    options: ["triskaidekaphobia", "pyrophobia", "aichmophobia", "hydrophobia"],
    correct: "3",
    exptext: "✅ Aichmophobia fits because the boy is afraid of needles. 📌 Aichmophobia = needle fear. ❌ Pyrophobia is wrong because it is the fear of fire."
  },
  44: {
    type: "concept", icon: "🔥", accent: "#62c526", pauseTimer: true,
    title: "Pyrophobia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:98,197,38;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">An extreme fear of fire.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">आग का भय</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">fear</li><li class="vc-chip">dread</li><li class="vc-chip">terror</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Since childhood, <b>pyrophobia</b> kept him away from candles, matches and every bonfire. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Her <b>pyrophobia</b> began after a kitchen fire, and now she avoids using the stove.</p></li><li><span class="vc-n">3</span><p class="vc-s">Therapists use slow exposure to treat patients whose <b>pyrophobia</b> controls their daily choices.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/15.png" alt="Illustration of the word pyrophobia: A boy standing far from a roaring bonfire at a village festival, eyes wide with fear, other children la" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Since childhood, <mark class="vc-hl">pyrophobia</mark> kept him away from candles, matches and every bonfire.</p></div></div>
      </div></div>
    `
  },
  45: {
    questext: "Select the most appropriate synonym of the given word.\nPyrophobia",
    options: ["Dread of needles", "Dread of fire", "Dread of heights", "Dread of darkness"],
    correct: "2",
    exptext: "✅ Pyrophobia is an extreme fear of fire. 📌 Pyro means fire. ❌ Dread of needles is wrong because that is aichmophobia."
  },
  46: {
    questext: "Select the most appropriate option to fill in the blank.\nA person with ______ refuses to light even a candle.",
    options: ["triskaidekaphobia", "hydrophobia", "aichmophobia", "pyrophobia"],
    correct: "4",
    exptext: "✅ Pyrophobia fits because the person fears fire and will not light a candle. 📌 Pyro = fire. ❌ Hydrophobia is wrong because it is the fear of water."
  },
  47: {
    type: "concept", icon: "6️⃣", accent: "#d831a1", pauseTimer: true,
    title: "Hexakosioihexekontahexaphobia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,161;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">An extreme fear of the number 666.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">666 अंक का भय</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">fear</li><li class="vc-chip">dread</li><li class="vc-chip">anxiety</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Many believe <b>hexakosioihexekontahexaphobia</b> comes from the old belief that 666 is an evil number.</p></li><li><span class="vc-n">2</span><p class="vc-s">His <b>hexakosioihexekontahexaphobia</b> made him change a house number that had three sixes.</p></li><li><span class="vc-n">3</span><p class="vc-s">The quiz asked students to spell <b>hexakosioihexekontahexaphobia</b>, one of the longest words in English. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/16.png" alt="Illustration of the word hexakosioihexekontahexaphobia: Students laughing and gasping as a teacher holds up a thick dictionary, one boy rest" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The quiz asked students to spell <mark class="vc-hl">hexakosioihexekontahexaphobia</mark>, one of the longest words in English.</p></div></div>
      </div></div>
    `
  },
  48: {
    questext: "Select the most appropriate synonym of the given word.\nHexakosioihexekontahexaphobia",
    options: ["Dread of the number six hundred and sixty-six", "Dread of the number thirteen", "Dread of the number seven", "Dread of the number nine hundred"],
    correct: "1",
    exptext: "✅ Hexakosioihexekontahexaphobia is the fear of the number 666. 📌 Hexakosioi means six hundred and hexekonta means sixty. ❌ Dread of the number thirteen is wrong because that is triskaidekaphobia."
  },
  49: {
    questext: "Select the most appropriate option to fill in the blank.\nSeeing the number 666 on a car plate made him tremble because he has ______.",
    options: ["pyrophobia", "triskaidekaphobia", "hexakosioihexekontahexaphobia", "aichmophobia"],
    correct: "3",
    exptext: "✅ The fear of the number 666 is hexakosioihexekontahexaphobia. 📌 Long number, long word. ❌ Triskaidekaphobia is wrong because it is the fear of thirteen."
  },
  50: {
    type: "concept", icon: "🛍️", accent: "#4bd7dd", pauseTimer: true,
    title: "Extravagant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,215,221;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Spending much more money than is necessary or sensible.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">फिजूलखर्च</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">lavish</li><li class="vc-chip">wasteful</li><li class="vc-chip">profligate</li><li class="vc-chip">excessive</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">thrifty</li><li class="vc-chip">frugal</li><li class="vc-chip">economical</li><li class="vc-chip">sparing</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His <b>extravagant</b> wedding, with fifty dishes and a hired band, emptied his savings.</p></li><li><span class="vc-n">2</span><p class="vc-s">She felt guilty after an <b>extravagant</b> shopping spree on clothes she never wore. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The critic called the film's <b>extravagant</b> sets a waste of the producer's money.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/17.png" alt="Illustration of the word extravagant: A woman leaving a luxury store with arms full of shopping bags, a worried expression, her wallet nearl" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">She felt guilty after an <mark class="vc-hl">extravagant</mark> shopping spree on clothes she never wore.</p></div></div>
      </div></div>
    `
  },
  51: {
    questext: "Select the most appropriate synonym of the given word.\nExtravagant",
    options: ["Frugal", "Lavish", "Extraordinary", "Humble"],
    correct: "2",
    exptext: "✅ Extravagant means spending too much, so lavish is the closest word. 📌 Extra plus vagant: going beyond the limit. ❌ Frugal is wrong because it means careful with money."
  },
  52: {
    questext: "Select the most appropriate option to fill in the blank.\nHer ______ wedding, with a thousand guests and golden gates, cost more than the village earns in a year.",
    options: ["simple", "thrifty", "modest", "extravagant"],
    correct: "4",
    exptext: "✅ Extravagant fits because the wedding was far too costly. 📌 Extravagant = beyond the limit. ❌ Modest is wrong because a modest wedding would not cost so much."
  },
  53: {
    type: "concept", icon: "🐿️", accent: "#c59d26", pauseTimer: true,
    title: "Thrifty",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,157,38;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Careful with money and avoiding waste.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मितव्ययी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">frugal</li><li class="vc-chip">economical</li><li class="vc-chip">sparing</li><li class="vc-chip">prudent</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">extravagant</li><li class="vc-chip">wasteful</li><li class="vc-chip">lavish</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">My <b>thrifty</b> grandmother reuses every jar and never throws food away. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Being <b>thrifty</b>, he saved a small part of his salary every month for emergencies.</p></li><li><span class="vc-n">3</span><p class="vc-s">The council praised the <b>thrifty</b> management of the school's limited funds.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/18.png" alt="Illustration of the word thrifty: An elderly woman in a small kitchen washing and reusing glass jars, neat shelves of jars behind her, gentl" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">My <mark class="vc-hl">thrifty</mark> grandmother reuses every jar and never throws food away.</p></div></div>
      </div></div>
    `
  },
  54: {
    questext: "Select the most appropriate antonym of the given word.\nThrifty",
    options: ["Wasteful", "Frugal", "Economical", "Careful"],
    correct: "1",
    exptext: "✅ Thrifty means careful with money, so wasteful is the opposite. 📌 Thrifty = thrive by saving. ❌ Frugal is wrong because it is a synonym."
  },
  55: {
    questext: "Select the most appropriate option to fill in the blank.\nA ______ housewife saves every spare coin and never buys what she does not need.",
    options: ["lavish", "wasteful", "thrifty", "careless"],
    correct: "3",
    exptext: "✅ Thrifty fits because she saves coins and avoids needless buying. 📌 Thrifty = saves well. ❌ Lavish is wrong because a lavish person spends freely."
  },
  56: {
    type: "concept", icon: "💸", accent: "#7d31d8", pauseTimer: true,
    title: "Prodigal",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:125,49,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Spending money in a careless and wasteful way.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अपव्ययी, उड़ाऊ</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">wasteful</li><li class="vc-chip">profligate</li><li class="vc-chip">lavish</li><li class="vc-chip">extravagant</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">frugal</li><li class="vc-chip">thrifty</li><li class="vc-chip">economical</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>prodigal</b> son wasted his father's inheritance within a year of leaving home. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The government was criticised for its <b>prodigal</b> use of public money on useless projects.</p></li><li><span class="vc-n">3</span><p class="vc-s">He was <b>prodigal</b> with his time, spending whole days on games instead of study.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/19.png" alt="Illustration of the word prodigal: A young man at a lavish party throwing coins and notes into the air among laughing guests, his empty trun" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">prodigal</mark> son wasted his father's inheritance within a year of leaving home.</p></div></div>
      </div></div>
    `
  },
  57: {
    questext: "Select the most appropriate synonym of the given word.\nProdigal",
    options: ["Frugal", "Wasteful", "Prodigious", "Miserly"],
    correct: "2",
    exptext: "✅ Prodigal means spending carelessly, so wasteful is the closest word. 📌 The prodigal son wasted his father's money. ❌ Frugal is wrong because it is the opposite."
  },
  58: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ heir spent the family's fortune on parties within two years.",
    options: ["prudent", "frugal", "thrifty", "prodigal"],
    correct: "4",
    exptext: "✅ Prodigal fits because the heir wasted the fortune on parties. 📌 Prodigal = wasteful spender. ❌ Frugal is wrong because a frugal heir would save money."
  },
  59: {
    type: "concept", icon: "🤑", accent: "#4bdd63", pauseTimer: true,
    title: "Spendthrift",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,99;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who spends money carelessly and wastefully.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">खर्चीला, उड़ाऊ</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">squanderer</li><li class="vc-chip">waster</li><li class="vc-chip">profligate</li><li class="vc-chip">prodigal</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">miser</li><li class="vc-chip">saver</li><li class="vc-chip">skinflint</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>spendthrift</b> bought a new phone every month and borrowed money to pay rent. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Her brother is a <b>spendthrift</b>, so his salary is gone within a week.</p></li><li><span class="vc-n">3</span><p class="vc-s">The poet's <b>spendthrift</b> habits left him poor despite his large income.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/20.png" alt="Illustration of the word spendthrift: A young man at a phone shop counter with a stack of boxed phones, an empty wallet open in his hand, a " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">spendthrift</mark> bought a new phone every month and borrowed money to pay rent.</p></div></div>
      </div></div>
    `
  },
  60: {
    questext: "Select the most appropriate antonym of the given word.\nSpendthrift",
    options: ["Miser", "Squanderer", "Profligate", "Waster"],
    correct: "1",
    exptext: "✅ A spendthrift wastes money, so a miser, who hoards it, is the opposite. 📌 Spend freely versus hold tightly. ❌ Squanderer is wrong because it is a synonym."
  },
  61: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who spends money carelessly and wastefully",
    options: ["Philanthropist", "Miser", "Spendthrift", "Proprietor"],
    correct: "3",
    exptext: "✅ Spendthrift describes a person who wastes money. 📌 Spend plus thrift gone wrong. ❌ Miser is wrong because a miser hoards money."
  },
  62: {
    type: "concept", icon: "🌸", accent: "#c5263a", pauseTimer: true,
    title: "Ephemeral",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,58;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Lasting for a very short time.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">क्षणभंगुर</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">short-lived</li><li class="vc-chip">fleeting</li><li class="vc-chip">transient</li><li class="vc-chip">momentary</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">permanent</li><li class="vc-chip">lasting</li><li class="vc-chip">eternal</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Morning dew is <b>ephemeral</b>, disappearing as soon as the sun rises. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Social media fame can be <b>ephemeral</b>, since people forget viral stars within weeks.</p></li><li><span class="vc-n">3</span><p class="vc-s">The poet described youth as an <b>ephemeral</b> flower that blooms and fades in a day.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/21.png" alt="Illustration of the word ephemeral: Close-up of dew drops on a green leaf at sunrise, sunlight turning them golden as they begin to evaporat" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Morning dew is <mark class="vc-hl">ephemeral</mark>, disappearing as soon as the sun rises.</p></div></div>
      </div></div>
    `
  },
  63: {
    questext: "Select the most appropriate synonym of the given word.\nEphemeral",
    options: ["Permanent", "Fleeting", "Ethereal", "Delicate"],
    correct: "2",
    exptext: "✅ Ephemeral means lasting a very short time, so fleeting is the closest word. 📌 Think of a mayfly that lives one day. ❌ Permanent is wrong because it is the opposite."
  },
  64: {
    questext: "Select the most appropriate option to fill in the blank.\nThe beauty of a rainbow is ______, because it fades within a few minutes.",
    options: ["lasting", "permanent", "eternal", "ephemeral"],
    correct: "4",
    exptext: "✅ Ephemeral fits because the rainbow disappears quickly. 📌 Ephemeral = lasts a day. ❌ Eternal is wrong because the rainbow does not last forever."
  },
  65: {
    type: "concept", icon: "🌱", accent: "#3177d8", pauseTimer: true,
    title: "Nascent",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,119,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Just beginning to exist and starting to develop.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">उदीयमान, नवजात</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">emerging</li><li class="vc-chip">budding</li><li class="vc-chip">developing</li><li class="vc-chip">embryonic</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">mature</li><li class="vc-chip">established</li><li class="vc-chip">declining</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>nascent</b> startup had only three employees and a small rented room. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Scientists say the <b>nascent</b> technology may change farming in the next decade.</p></li><li><span class="vc-n">3</span><p class="vc-s">A <b>nascent</b> friendship between the two rivals began at the charity match.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/22.png" alt="Illustration of the word nascent: Three young founders working around a small table in a tiny rented room with laptops and sketches on the w" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">nascent</mark> startup had only three employees and a small rented room.</p></div></div>
      </div></div>
    `
  },
  66: {
    questext: "Select the most appropriate antonym of the given word.\nNascent",
    options: ["Established", "Emerging", "Budding", "Newborn"],
    correct: "1",
    exptext: "✅ Nascent means just beginning, so established, which means long settled, is the opposite. 📌 Nascent is new; established is old and firm. ❌ Emerging is wrong because it is a synonym."
  },
  67: {
    questext: "Select the most appropriate option to fill in the blank.\nThe company is still ______, with only five workers and a single product.",
    options: ["mature", "established", "nascent", "ancient"],
    correct: "3",
    exptext: "✅ Nascent fits because the company is only just starting. 📌 Nascent means just born. ❌ Established is wrong because an established company would be large and settled."
  },
  68: {
    type: "concept", icon: "🌧️", accent: "#b3dd4b", pauseTimer: true,
    title: "Incessant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:179,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Continuing without a stop, often in an annoying way.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">लगातार, अनवरत</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">constant</li><li class="vc-chip">continual</li><li class="vc-chip">ceaseless</li><li class="vc-chip">unending</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">intermittent</li><li class="vc-chip">occasional</li><li class="vc-chip">sporadic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>incessant</b> rain flooded the streets and kept everyone indoors for a week.</p></li><li><span class="vc-n">2</span><p class="vc-s">His <b>incessant</b> talking in class annoyed the teacher and distracted his friends. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The novel opens with the <b>incessant</b> tolling of a bell across the foggy moors.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/23.png" alt="Illustration of the word incessant: A teacher turning from the board toward a chatty student who keeps whispering to his neighbour, other st" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">His <mark class="vc-hl">incessant</mark> talking in class annoyed the teacher and distracted his friends.</p></div></div>
      </div></div>
    `
  },
  69: {
    questext: "Select the most appropriate synonym of the given word.\nIncessant",
    options: ["Occasional", "Ceaseless", "Insistent", "Temporary"],
    correct: "2",
    exptext: "✅ Incessant means never stopping, so ceaseless is the closest word. 📌 In- means not and cess means stop. ❌ Occasional is wrong because it means happening only now and then."
  },
  70: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ barking of the dog kept the whole street awake all night.",
    options: ["rare", "occasional", "intermittent", "incessant"],
    correct: "4",
    exptext: "✅ Incessant fits because the barking went on all night without stopping. 📌 Incessant = no pause. ❌ Occasional is wrong because occasional barking would not keep everyone awake."
  },
  71: {
    type: "concept", icon: "🏛️", accent: "#c526c5", pauseTimer: true,
    title: "Intransient",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Not temporary; lasting for a very long time.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">स्थायी, अटल</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">permanent</li><li class="vc-chip">lasting</li><li class="vc-chip">enduring</li><li class="vc-chip">abiding</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">transient</li><li class="vc-chip">temporary</li><li class="vc-chip">fleeting</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The old temple's <b>intransient</b> stones have stood unchanged through centuries of storms. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Scientists look for <b>intransient</b> laws of nature that do not change with time.</p></li><li><span class="vc-n">3</span><p class="vc-s">His <b>intransient</b> loyalty to his friends survived every quarrel and every hardship.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/24.png" alt="Illustration of the word intransient: An ancient stone temple on a hill standing calm beneath a stormy sky, carved pillars, a lone traveller" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The old temple's <mark class="vc-hl">intransient</mark> stones have stood unchanged through centuries of storms.</p></div></div>
      </div></div>
    `
  },
  72: {
    questext: "Select the most appropriate antonym of the given word.\nIntransient",
    options: ["Transient", "Lasting", "Enduring", "Permanent"],
    correct: "1",
    exptext: "✅ Intransient means not temporary, so transient, which means short-lived, is the opposite. 📌 In- means not, so intransient means not transient. ❌ Lasting is wrong because it is a synonym."
  },
  73: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nNot temporary; lasting for a very long time",
    options: ["Intransigent", "Transient", "Intransient", "Nascent"],
    correct: "3",
    exptext: "✅ Intransient describes something that lasts for a very long time. 📌 In plus transient means not short-lived. ❌ Intransigent is wrong because it means stubborn and unwilling to change."
  },
  74: {
    type: "concept", icon: "🤥", accent: "#31d8a7", pauseTimer: true,
    title: "Mendacious",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,216,167;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Not telling the truth; tending to lie.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">झूठा, मिथ्यावादी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">lying</li><li class="vc-chip">dishonest</li><li class="vc-chip">untruthful</li><li class="vc-chip">deceitful</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">truthful</li><li class="vc-chip">honest</li><li class="vc-chip">sincere</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>mendacious</b> witness changed his story three times before the judge. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>mendacious</b> advertisement promised a free car to every customer who bought soap.</p></li><li><span class="vc-n">3</span><p class="vc-s">Readers lost trust in the <b>mendacious</b> newspaper after it printed false claims about the flood.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/25.png" alt="Illustration of the word mendacious: A nervous witness in a courtroom with fingers crossed behind his back while a stern judge looks down at" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">mendacious</mark> witness changed his story three times before the judge.</p></div></div>
      </div></div>
    `
  },
  75: {
    questext: "Select the most appropriate synonym of the given word.\nMendacious",
    options: ["Truthful", "Dishonest", "Mendicant", "Cautious"],
    correct: "2",
    exptext: "✅ Mendacious means lying, so dishonest is the closest word. 📌 Think of mendacious as a mad liar. ❌ Truthful is wrong because it is the opposite."
  },
  76: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ witness lied about where he was that night, and the police soon caught the lie.",
    options: ["honest", "truthful", "candid", "mendacious"],
    correct: "4",
    exptext: "✅ Mendacious fits because the witness told a lie. 📌 Mendacious = lying. ❌ Truthful is wrong because a truthful witness would not lie."
  },
  77: {
    type: "concept", icon: "🗣️", accent: "#dd874b", pauseTimer: true,
    title: "Candid",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,135,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Honest and direct in speech, even when the truth is unpleasant.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">स्पष्टवादी, खरा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">frank</li><li class="vc-chip">outspoken</li><li class="vc-chip">forthright</li><li class="vc-chip">blunt</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">evasive</li><li class="vc-chip">secretive</li><li class="vc-chip">deceitful</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Be <b>candid</b> with me: did you really finish the project yourself?</p></li><li><span class="vc-n">2</span><p class="vc-s">The coach gave a <b>candid</b> review of the team's poor fielding after the match. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">In her <b>candid</b> memoir, the actress admitted her early mistakes without hiding anything.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/26.png" alt="Illustration of the word candid: A cricket coach speaking directly to a team of players on the field at dusk, hands on hips, players listeni" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The coach gave a <mark class="vc-hl">candid</mark> review of the team's poor fielding after the match.</p></div></div>
      </div></div>
    `
  },
  78: {
    questext: "Select the most appropriate antonym of the given word.\nCandid",
    options: ["Evasive", "Frank", "Blunt", "Outspoken"],
    correct: "1",
    exptext: "✅ Candid means honest and direct, so evasive, which means avoiding a straight answer, is the opposite. 📌 Candid speaks plainly; evasive dodges. ❌ Frank is wrong because it is a synonym."
  },
  79: {
    questext: "Select the most appropriate option to fill in the blank.\nPlease give me your ______ opinion of my essay and do not hide its faults to be polite.",
    options: ["secretive", "evasive", "candid", "deceitful"],
    correct: "3",
    exptext: "✅ Candid fits because the writer wants an honest opinion. 📌 Candid = open and honest. ❌ Evasive is wrong because an evasive opinion would hide the truth."
  },
  80: {
    type: "concept", icon: "🛬", accent: "#3926c5", pauseTimer: true,
    title: "Immigrant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:57,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who comes to live permanently in a foreign country.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">आप्रवासी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">newcomer</li><li class="vc-chip">settler</li><li class="vc-chip">incomer</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">emigrant</li><li class="vc-chip">native</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">As an <b>immigrant</b>, she needed two years to feel at home in Canada.</p></li><li><span class="vc-n">2</span><p class="vc-s">The government announced new rules for every <b>immigrant</b> arriving at the airport.</p></li><li><span class="vc-n">3</span><p class="vc-s">The novel follows an <b>immigrant</b> who builds a new life in a strange city. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/27.png" alt="Illustration of the word immigrant: A young woman with a suitcase stepping out of an airport into a busy foreign city, looking up with hope " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The novel follows an <mark class="vc-hl">immigrant</mark> who builds a new life in a strange city.</p></div></div>
      </div></div>
    `
  },
  81: {
    questext: "Select the most appropriate synonym of the given word.\nImmigrant",
    options: ["Emigrant", "Newcomer", "Tourist", "Resident"],
    correct: "2",
    exptext: "✅ An immigrant is a person who has come to a new country, so newcomer is the closest word. 📌 Im- means into the country. ❌ Emigrant is wrong because an emigrant leaves a country."
  },
  82: {
    questext: "Select the most appropriate option to fill in the blank.\nA person who comes from Nepal to settle in India is an ______ for the people of India.",
    options: ["adventurer", "emigrant", "islander", "immigrant"],
    correct: "4",
    exptext: "✅ Immigrant fits because the person is coming into India to settle. 📌 Im = in, e = exit. ❌ Emigrant is wrong because it describes leaving a country."
  },
  83: {
    type: "concept", icon: "🛫", accent: "#4ed831", pauseTimer: true,
    title: "Emigrant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:78,216,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who leaves their own country to live in another.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">उत्प्रवासी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">migrant</li><li class="vc-chip">expatriate</li><li class="vc-chip">exile</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">immigrant</li><li class="vc-chip">native</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Every <b>emigrant</b> from the village sends money home to his family.</p></li><li><span class="vc-n">2</span><p class="vc-s">As an <b>emigrant</b>, he left India for Australia in search of better work.</p></li><li><span class="vc-n">3</span><p class="vc-s">The poem captures the homesick heart of an <b>emigrant</b> watching his native shore fade away. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/28.png" alt="Illustration of the word emigrant: A man on a ship's deck holding a bag, looking back at a fading green coastline at sunset, sad but hopeful" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The poem captures the homesick heart of an <mark class="vc-hl">emigrant</mark> watching his native shore fade away.</p></div></div>
      </div></div>
    `
  },
  84: {
    questext: "Select the most appropriate antonym of the given word.\nEmigrant",
    options: ["Immigrant", "Migrant", "Expatriate", "Exile"],
    correct: "1",
    exptext: "✅ An emigrant leaves a country, so an immigrant, who arrives in a country, is the opposite. 📌 E for exit, I for in. ❌ Expatriate is wrong because it is a synonym."
  },
  85: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who leaves their own country to live in another",
    options: ["Tourist", "Immigrant", "Emigrant", "Citizen"],
    correct: "3",
    exptext: "✅ Emigrant is the person who leaves the home country to settle elsewhere. 📌 E means out. ❌ Immigrant is wrong because an immigrant enters a new country."
  },
  86: {
    type: "concept", icon: "🌟", accent: "#dd4b8e", pauseTimer: true,
    title: "Cynosure",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,75,142;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person or thing that is the centre of everyone's attention and admiration.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">आकर्षण का केंद्र</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">focus</li><li class="vc-chip">attraction</li><li class="vc-chip">spotlight</li><li class="vc-chip">centrepiece</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The bride was the <b>cynosure</b> of all eyes when she entered the hall. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">At the science fair, the robot became the <b>cynosure</b> of every visiting student.</p></li><li><span class="vc-n">3</span><p class="vc-s">Poets once called the North Star the <b>cynosure</b> that guides lost sailors home.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/29.png" alt="Illustration of the word cynosure: A bride in red entering a decorated wedding hall, all guests turning toward her with admiring faces, warm" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The bride was the <mark class="vc-hl">cynosure</mark> of all eyes when she entered the hall.</p></div></div>
      </div></div>
    `
  },
  87: {
    questext: "Select the most appropriate synonym of the given word.\nCynosure",
    options: ["Outcast", "Centrepiece", "Cynic", "Rival"],
    correct: "2",
    exptext: "✅ A cynosure is the centre of attention, so centrepiece is the closest word. 📌 Cynosure was once a guiding star that everyone watched. ❌ Outcast is wrong because an outcast is ignored."
  },
  88: {
    questext: "Select the most appropriate option to fill in the blank.\nThe young singer became the ______ of the party, and every guest turned to look at her.",
    options: ["bystander", "outcast", "stranger", "cynosure"],
    correct: "4",
    exptext: "✅ Cynosure fits because every guest was looking at her. 📌 Cynosure = centre of eyes. ❌ Bystander is wrong because a bystander is not the centre of attention."
  },
  89: {
    type: "concept", icon: "🧭", accent: "#269ec5", pauseTimer: true,
    title: "Paradigm",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,158,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A clear example or model that shows how something works.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">प्रतिमान, आदर्श</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">model</li><li class="vc-chip">pattern</li><li class="vc-chip">example</li><li class="vc-chip">template</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">exception</li><li class="vc-chip">anomaly</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The teacher used a simple story as a <b>paradigm</b> of honest leadership.</p></li><li><span class="vc-n">2</span><p class="vc-s">Online classes created a new <b>paradigm</b> for how students learn at home. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The scientist's discovery caused a shift in the old <b>paradigm</b> of physics.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/30.png" alt="Illustration of the word paradigm: A girl studying at home on a laptop in a cosy room, a teacher smiling on the screen, notebooks around her" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Online classes created a new <mark class="vc-hl">paradigm</mark> for how students learn at home.</p></div></div>
      </div></div>
    `
  },
  90: {
    questext: "Select the most appropriate antonym of the given word.\nParadigm",
    options: ["Anomaly", "Model", "Pattern", "Template"],
    correct: "1",
    exptext: "✅ A paradigm is a clear model, so an anomaly, which is an odd exception, is the opposite. 📌 Paradigm follows the rule; anomaly breaks it. ❌ Model is wrong because it is a synonym."
  },
  91: {
    questext: "Select the most appropriate option to fill in the blank.\nHis careful method of research became the ______ that other scholars tried to follow.",
    options: ["mistake", "exception", "paradigm", "accident"],
    correct: "3",
    exptext: "✅ Paradigm fits because other scholars followed his method as a model. 📌 Paradigm = model to copy. ❌ Exception is wrong because an exception is not followed as a model."
  },
  92: {
    type: "concept", icon: "🛴", accent: "#d8d031", pauseTimer: true,
    title: "Prototype",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,208,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The first model of something, made to test it before making more.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">प्रारूप, नमूना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">model</li><li class="vc-chip">original</li><li class="vc-chip">sample</li><li class="vc-chip">trial model</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">copy</li><li class="vc-chip">replica</li><li class="vc-chip">duplicate</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Engineers tested the first <b>prototype</b> of the electric scooter on a quiet road. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The company showed a <b>prototype</b> of its new phone at the technology fair.</p></li><li><span class="vc-n">3</span><p class="vc-s">Leonardo's sketches of a flying machine were an early <b>prototype</b> of the modern helicopter.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/31.png" alt="Illustration of the word prototype: Engineers in a workshop watching a handmade electric scooter prototype roll along a test track, one smil" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Engineers tested the first <mark class="vc-hl">prototype</mark> of the electric scooter on a quiet road.</p></div></div>
      </div></div>
    `
  },
  93: {
    questext: "Select the most appropriate synonym of the given word.\nPrototype",
    options: ["Replica", "Original", "Protocol", "Souvenir"],
    correct: "2",
    exptext: "✅ A prototype is the first model, so original is the closest word. 📌 Proto means first. ❌ Replica is wrong because a replica is a later copy."
  },
  94: {
    questext: "Select the most appropriate option to fill in the blank.\nThe engineers built a working ______ before starting mass production.",
    options: ["sequel", "replica", "souvenir", "prototype"],
    correct: "4",
    exptext: "✅ Prototype fits because it is the first test model made before mass production. 📌 Proto = first. ❌ Replica is wrong because it is a copy made after the original."
  },
  95: {
    type: "concept", icon: "📜", accent: "#ac4bdd", pauseTimer: true,
    title: "Prolixity",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:172,75,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The fault of using too many words, which makes speech or writing tiresome.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">शब्दाधिक्य</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">wordiness</li><li class="vc-chip">verbosity</li><li class="vc-chip">long-windedness</li><li class="vc-chip">verbiage</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">brevity</li><li class="vc-chip">conciseness</li><li class="vc-chip">terseness</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The judge criticised the lawyer's <b>prolixity</b> and asked him to reach the point. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Students lost interest because of the speaker's <b>prolixity</b> and endless repeated examples.</p></li><li><span class="vc-n">3</span><p class="vc-s">Critics praised the poem but found the novel spoiled by its <b>prolixity</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/32.png" alt="Illustration of the word prolixity: A lawyer in a courtroom still talking while the stern judge checks a wristwatch and listeners yawn, pape" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The judge criticised the lawyer's <mark class="vc-hl">prolixity</mark> and asked him to reach the point.</p></div></div>
      </div></div>
    `
  },
  96: {
    questext: "Select the most appropriate antonym of the given word.\nProlixity",
    options: ["Conciseness", "Verbosity", "Wordiness", "Long-windedness"],
    correct: "1",
    exptext: "✅ Prolixity means using too many words, so conciseness is the opposite. 📌 Prolix is long; concise is short. ❌ Verbosity is wrong because it is a synonym."
  },
  97: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ of his speech made the audience yawn, because he took an hour to say what needed two minutes.",
    options: ["clarity", "brevity", "prolixity", "honesty"],
    correct: "3",
    exptext: "✅ Prolixity fits because the speaker used far too many words. 📌 Prolixity = too many words. ❌ Brevity is wrong because it means being short."
  },
  98: {
    type: "concept", icon: "🤐", accent: "#26c561", pauseTimer: true,
    title: "Taciturnity",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,97;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The habit of speaking very little and staying quiet.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मितभाषिता, मौन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">reticence</li><li class="vc-chip">silence</li><li class="vc-chip">quietness</li><li class="vc-chip">reserve</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">talkativeness</li><li class="vc-chip">loquacity</li><li class="vc-chip">garrulity</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His <b>taciturnity</b> puzzled the new neighbours, who never heard him say more than hello.</p></li><li><span class="vc-n">2</span><p class="vc-s">The detective found the witness's <b>taciturnity</b> more frustrating than any lie.</p></li><li><span class="vc-n">3</span><p class="vc-s">The old sailor's <b>taciturnity</b> hid a lifetime of stories he never chose to share. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/33.png" alt="Illustration of the word taciturnity: An old sailor sitting silently on a harbour bench with a pipe, gazing at the sea while a curious boy w" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The old sailor's <mark class="vc-hl">taciturnity</mark> hid a lifetime of stories he never chose to share.</p></div></div>
      </div></div>
    `
  },
  99: {
    questext: "Select the most appropriate synonym of the given word.\nTaciturnity",
    options: ["Talkativeness", "Quietness", "Tenacity", "Eloquence"],
    correct: "2",
    exptext: "✅ Taciturnity means speaking very little, so quietness is the closest word. 📌 Taciturn people keep their words tight. ❌ Talkativeness is wrong because it is the opposite."
  },
  100: {
    questext: "Select the most appropriate option to fill in the blank.\nHis ______ was well known; in a whole meeting he spoke only two words.",
    options: ["prolixity", "loquacity", "eloquence", "taciturnity"],
    correct: "4",
    exptext: "✅ Taciturnity fits because he spoke very little. 📌 Taciturnity = silent habit. ❌ Loquacity is wrong because it means talking a lot."
  },
  101: {
    type: "concept", icon: "💬", accent: "#d83f31", pauseTimer: true,
    title: "Loquacious",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,63,49;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Talking a lot, especially in a lively and friendly way.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">वाचाल, बातूनी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">talkative</li><li class="vc-chip">chatty</li><li class="vc-chip">garrulous</li><li class="vc-chip">voluble</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">taciturn</li><li class="vc-chip">reserved</li><li class="vc-chip">quiet</li><li class="vc-chip">laconic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">My <b>loquacious</b> uncle talked for two hours without letting anyone else speak. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>loquacious</b> guide described every statue in the museum with endless stories.</p></li><li><span class="vc-n">3</span><p class="vc-s">The <b>loquacious</b> parrot in the poem repeats every secret the household whispers.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/34.png" alt="Illustration of the word loquacious: An uncle at a family gathering talking cheerfully with waving hands while relatives politely nod and a " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">My <mark class="vc-hl">loquacious</mark> uncle talked for two hours without letting anyone else speak.</p></div></div>
      </div></div>
    `
  },
  102: {
    questext: "Select the most appropriate antonym of the given word.\nLoquacious",
    options: ["Taciturn", "Talkative", "Chatty", "Voluble"],
    correct: "1",
    exptext: "✅ Loquacious means talking a lot, so taciturn, which means saying very little, is the opposite. 📌 Loquacious people chat; taciturn people stay quiet. ❌ Talkative is wrong because it is a synonym."
  },
  103: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ hostess chatted happily with every guest for hours.",
    options: ["reserved", "taciturn", "loquacious", "laconic"],
    correct: "3",
    exptext: "✅ Loquacious fits because the hostess talked with everyone for hours. 📌 Loquacious = loves to talk. ❌ Taciturn is wrong because a taciturn hostess would speak little."
  },
  104: {
    type: "concept", icon: "🦜", accent: "#4b6add", pauseTimer: true,
    title: "Garrulous",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,106,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Talking too much, usually about unimportant things.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">बकवादी, वाचाल</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">chatty</li><li class="vc-chip">talkative</li><li class="vc-chip">verbose</li><li class="vc-chip">prattling</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">reticent</li><li class="vc-chip">quiet</li><li class="vc-chip">taciturn</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>garrulous</b> barber told me his family history while cutting my hair.</p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>garrulous</b> passenger on the train chatted about his village for the whole journey. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The playwright created a <b>garrulous</b> old servant who reveals every secret by accident.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/35.png" alt="Illustration of the word garrulous: A passenger on an Indian train chatting nonstop to a tired traveller by the window, a cup of tea in his " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A <mark class="vc-hl">garrulous</mark> passenger on the train chatted about his village for the whole journey.</p></div></div>
      </div></div>
    `
  },
  105: {
    questext: "Select the most appropriate synonym of the given word.\nGarrulous",
    options: ["Reticent", "Chatty", "Gorgeous", "Jealous"],
    correct: "2",
    exptext: "✅ Garrulous means talking too much, so chatty is the closest word. 📌 Garrulous people gush with words. ❌ Reticent is wrong because it means unwilling to speak."
  },
  106: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ passenger told his whole life story to a stranger during the short train ride.",
    options: ["shy", "reserved", "silent", "garrulous"],
    correct: "4",
    exptext: "✅ Garrulous fits because he talked far too much to a stranger. 📌 Garrulous = talks too much. ❌ Shy is wrong because a shy person would not tell a stranger so much."
  },
  107: {
    type: "concept", icon: "🤏", accent: "#76c526", pauseTimer: true,
    title: "Laconic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:118,197,38;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Using very few words; short and to the point.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मितभाषी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">terse</li><li class="vc-chip">concise</li><li class="vc-chip">brief</li><li class="vc-chip">pithy</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">verbose</li><li class="vc-chip">wordy</li><li class="vc-chip">garrulous</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His <b>laconic</b> reply to the long question was a simple "No."</p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>laconic</b> captain gave his orders in three short words and walked away. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The warriors of ancient Sparta were famous for their <b>laconic</b> speech.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/36.png" alt="Illustration of the word laconic: A ship captain on deck pointing ahead with one gesture while sailors rush to follow, calm confident face, " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">laconic</mark> captain gave his orders in three short words and walked away.</p></div></div>
      </div></div>
    `
  },
  108: {
    questext: "Select the most appropriate antonym of the given word.\nLaconic",
    options: ["Verbose", "Terse", "Concise", "Pithy"],
    correct: "1",
    exptext: "✅ Laconic means using very few words, so verbose, which means using too many, is the opposite. 📌 Laconic is short; verbose is long. ❌ Terse is wrong because it is a synonym."
  },
  109: {
    questext: "Select the most appropriate option to fill in the blank.\nAsked about his big victory, the champion gave a ______ answer of just two words.",
    options: ["garrulous", "verbose", "laconic", "loquacious"],
    correct: "3",
    exptext: "✅ Laconic fits because the answer used only two words. 📌 Laconic comes from Laconia, whose people spoke briefly. ❌ Verbose is wrong because a verbose answer would be long."
  },
  110: {
    type: "concept", icon: "🤫", accent: "#d831b6", pauseTimer: true,
    title: "Reticence",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,182;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The habit of not speaking freely about one's thoughts or feelings.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">संकोच, मौन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">reserve</li><li class="vc-chip">silence</li><li class="vc-chip">restraint</li><li class="vc-chip">taciturnity</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">openness</li><li class="vc-chip">frankness</li><li class="vc-chip">candour</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Her <b>reticence</b> about her past made her colleagues curious about her. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The minister's <b>reticence</b> at the press meeting suggested that he was hiding something.</p></li><li><span class="vc-n">3</span><p class="vc-s">Out of <b>reticence</b>, the shy boy never shared his poems with anyone.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/37.png" alt="Illustration of the word reticence: A woman at an office table smiling politely with lips closed while colleagues lean forward with curious " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Her <mark class="vc-hl">reticence</mark> about her past made her colleagues curious about her.</p></div></div>
      </div></div>
    `
  },
  111: {
    questext: "Select the most appropriate synonym of the given word.\nReticence",
    options: ["Openness", "Reserve", "Relevance", "Courage"],
    correct: "2",
    exptext: "✅ Reticence means not speaking freely, so reserve is the closest word. 📌 Reticent people hold back their thoughts. ❌ Openness is wrong because it is the opposite."
  },
  112: {
    questext: "Select the most appropriate option to fill in the blank.\nHer ______ about her past made it hard for the neighbours to learn anything about her.",
    options: ["frankness", "openness", "candour", "reticence"],
    correct: "4",
    exptext: "✅ Reticence fits because she did not speak freely about her past. 📌 Reticence = holding back. ❌ Openness is wrong because it would let neighbours learn about her."
  },
  113: {
    type: "concept", icon: "⏱️", accent: "#4bddd0", pauseTimer: true,
    title: "Brevity",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,208;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The quality of using few words or lasting a short time.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">संक्षिप्तता</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">conciseness</li><li class="vc-chip">shortness</li><li class="vc-chip">terseness</li><li class="vc-chip">succinctness</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">prolixity</li><li class="vc-chip">length</li><li class="vc-chip">wordiness</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Because of the time limit, the teacher asked for <b>brevity</b> in every answer.</p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>brevity</b> of the meeting surprised us; it ended in just ten minutes. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Shakespeare reminds us that <b>brevity</b> is the soul of wit.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/38.png" alt="Illustration of the word brevity: A short meeting in a modern office with people standing around a table, a manager smiling at a wall clock," loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">brevity</mark> of the meeting surprised us; it ended in just ten minutes.</p></div></div>
      </div></div>
    `
  },
  114: {
    questext: "Select the most appropriate antonym of the given word.\nBrevity",
    options: ["Wordiness", "Conciseness", "Shortness", "Terseness"],
    correct: "1",
    exptext: "✅ Brevity means using few words, so wordiness, which means using too many, is the opposite. 📌 Brief is short; wordy is long. ❌ Conciseness is wrong because it is a synonym."
  },
  115: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ of the minister's speech pleased the tired crowd, because he finished in two minutes.",
    options: ["wordiness", "prolixity", "brevity", "length"],
    correct: "3",
    exptext: "✅ Brevity fits because the speech was very short. 📌 Brevity = brief. ❌ Prolixity is wrong because it means using too many words."
  },
  116: {
    type: "concept", icon: "✂️", accent: "#c58826", pauseTimer: true,
    title: "Abbreviate",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,136,38;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">VERB</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">To make a word or a piece of text shorter.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">संक्षिप्त करना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">shorten</li><li class="vc-chip">condense</li><li class="vc-chip">curtail</li><li class="vc-chip">truncate</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">lengthen</li><li class="vc-chip">expand</li><li class="vc-chip">extend</li><li class="vc-chip">elongate</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">We <b>abbreviate</b> Doctor as Dr. in addresses and on name boards. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Please <b>abbreviate</b> your report to one page so the manager can read it quickly.</p></li><li><span class="vc-n">3</span><p class="vc-s">The editor chose to <b>abbreviate</b> the long speech without changing its message.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/39.png" alt="Illustration of the word abbreviate: A secretary at a desk cutting a long paper strip into a short one with scissors, neat office, a relieve" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">We <mark class="vc-hl">abbreviate</mark> Doctor as Dr. in addresses and on name boards.</p></div></div>
      </div></div>
    `
  },
  117: {
    questext: "Select the most appropriate synonym of the given word.\nAbbreviate",
    options: ["Expand", "Shorten", "Elevate", "Abandon"],
    correct: "2",
    exptext: "✅ To abbreviate is to make shorter, so shorten is the closest word. 📌 Abbreviate has the word brief inside it. ❌ Expand is wrong because it means to make longer."
  },
  118: {
    questext: "Select the most appropriate option to fill in the blank.\nPlease ______ the long title so that it fits on the small label.",
    options: ["extend", "expand", "lengthen", "abbreviate"],
    correct: "4",
    exptext: "✅ Abbreviate fits because the title must become shorter. 📌 Abbreviate = make brief. ❌ Expand is wrong because the label is small and cannot hold more."
  },
  119: {
    type: "concept", icon: "🎉", accent: "#6831d8", pauseTimer: true,
    title: "Jubilant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:104,49,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Feeling or showing great joy, especially because of success.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">उल्लसित, हर्षित</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">joyful</li><li class="vc-chip">triumphant</li><li class="vc-chip">elated</li><li class="vc-chip">overjoyed</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">gloomy</li><li class="vc-chip">sorrowful</li><li class="vc-chip">dejected</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>jubilant</b> fans danced in the streets after India won the final.</p></li><li><span class="vc-n">2</span><p class="vc-s">She was <b>jubilant</b> when she saw her name among the successful candidates. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The <b>jubilant</b> crowd welcomed the returning heroes with flowers and songs.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/40.png" alt="Illustration of the word jubilant: A girl holding up her phone and jumping with raised arms in a college corridor, friends hugging her, brig" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">She was <mark class="vc-hl">jubilant</mark> when she saw her name among the successful candidates.</p></div></div>
      </div></div>
    `
  },
  120: {
    questext: "Select the most appropriate antonym of the given word.\nJubilant",
    options: ["Gloomy", "Triumphant", "Elated", "Overjoyed"],
    correct: "1",
    exptext: "✅ Jubilant means full of joy, so gloomy, which means sad, is the opposite. 📌 Jubilant people jump with joy. ❌ Triumphant is wrong because it is a synonym."
  },
  121: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ team lifted the trophy and cheered loudly.",
    options: ["gloomy", "dejected", "jubilant", "sorrowful"],
    correct: "3",
    exptext: "✅ Jubilant fits because the team was full of joy after winning. 📌 Jubilant = joy of victory. ❌ Dejected is wrong because a dejected team would be sad."
  },
  122: {
    type: "concept", icon: "😢", accent: "#4bdd50", pauseTimer: true,
    title: "Lugubrious",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,80;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Looking or sounding very sad and gloomy, often in an exaggerated way.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">शोकपूर्ण, उदास</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">mournful</li><li class="vc-chip">gloomy</li><li class="vc-chip">doleful</li><li class="vc-chip">melancholy</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">cheerful</li><li class="vc-chip">jolly</li><li class="vc-chip">jubilant</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>lugubrious</b> clown walked slowly with a long face and drooping shoulders. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>lugubrious</b> song played on the radio as rain fell on the empty street.</p></li><li><span class="vc-n">3</span><p class="vc-s">His <b>lugubrious</b> voice at the funeral made even strangers feel sad.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/41.png" alt="Illustration of the word lugubrious: A clown with drooping shoulders and a long sad face walking alone in a circus ring under one spotlight," loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">lugubrious</mark> clown walked slowly with a long face and drooping shoulders.</p></div></div>
      </div></div>
    `
  },
  123: {
    questext: "Select the most appropriate synonym of the given word.\nLugubrious",
    options: ["Cheerful", "Mournful", "Luxurious", "Humorous"],
    correct: "2",
    exptext: "✅ Lugubrious means very sad and gloomy, so mournful is the closest word. 📌 Think of a long, sad face. ❌ Cheerful is wrong because it is the opposite."
  },
  124: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ look on his face showed that he had heard very sad news.",
    options: ["radiant", "cheerful", "jolly", "lugubrious"],
    correct: "4",
    exptext: "✅ Lugubrious fits because the look showed deep sadness. 📌 Lugubrious = gloomy. ❌ Jolly is wrong because a jolly look shows happiness."
  },
  125: {
    type: "concept", icon: "🥹", accent: "#c5264e", pauseTimer: true,
    title: "Maudlin",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,78;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Too emotional and sentimental, often in a silly or tearful way.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अतिभावुक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">sentimental</li><li class="vc-chip">tearful</li><li class="vc-chip">mawkish</li><li class="vc-chip">soppy</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">unsentimental</li><li class="vc-chip">stoic</li><li class="vc-chip">unemotional</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">After two drinks, the old friend became <b>maudlin</b> and cried about his school days. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The film was too <b>maudlin</b> for my taste, with endless tearful speeches.</p></li><li><span class="vc-n">3</span><p class="vc-s">He wrote a <b>maudlin</b> letter full of regret that embarrassed everyone who read it.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/42.png" alt="Illustration of the word maudlin: A middle-aged man at a party table, teary-eyed, holding an old photograph while friends look slightly emba" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">After two drinks, the old friend became <mark class="vc-hl">maudlin</mark> and cried about his school days.</p></div></div>
      </div></div>
    `
  },
  126: {
    questext: "Select the most appropriate antonym of the given word.\nMaudlin",
    options: ["Stoic", "Sentimental", "Tearful", "Soppy"],
    correct: "1",
    exptext: "✅ Maudlin means weepy and over-sentimental, so stoic, which means showing no emotion, is the opposite. 📌 Maudlin cries; stoic stays calm. ❌ Sentimental is wrong because it is a synonym."
  },
  127: {
    questext: "Select the most appropriate option to fill in the blank.\nAfter listening to sad songs all evening, he became ______ and began to weep over old photographs.",
    options: ["cheerful", "stoic", "maudlin", "angry"],
    correct: "3",
    exptext: "✅ Maudlin fits because he wept in a silly, over-emotional way. 📌 Maudlin = tearful and sentimental. ❌ Stoic is wrong because a stoic person would not weep."
  },
  128: {
    type: "concept", icon: "😏", accent: "#318cd8", pauseTimer: true,
    title: "Sardonic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,140,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Mocking in a bitter, scornful way.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">व्यंग्यात्मक, कटु</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">mocking</li><li class="vc-chip">sarcastic</li><li class="vc-chip">scornful</li><li class="vc-chip">cynical</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">sincere</li><li class="vc-chip">respectful</li><li class="vc-chip">kind</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">He gave a <b>sardonic</b> smile when the manager praised the useless new plan. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The comedian's <b>sardonic</b> jokes about politicians made the audience laugh and wince.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her <b>sardonic</b> reply, "How wonderful, another meeting," showed her boredom.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/43.png" alt="Illustration of the word sardonic: A man in an office meeting with a thin bitter half-smile and raised eyebrow while the manager presents pr" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">He gave a <mark class="vc-hl">sardonic</mark> smile when the manager praised the useless new plan.</p></div></div>
      </div></div>
    `
  },
  129: {
    questext: "Select the most appropriate synonym of the given word.\nSardonic",
    options: ["Sincere", "Mocking", "Sorrowful", "Soothing"],
    correct: "2",
    exptext: "✅ Sardonic means mocking in a bitter way, so mocking is the closest word. 📌 Sardonic = scornful smile. ❌ Sincere is wrong because it means honest and without mockery."
  },
  130: {
    questext: "Select the most appropriate option to fill in the blank.\nThe critic's ______ smile showed that he found the poor play more funny than good.",
    options: ["shy", "warm", "grateful", "sardonic"],
    correct: "4",
    exptext: "✅ Sardonic fits because the critic was mocking the play. 📌 Sardonic = bitter mockery. ❌ Warm is wrong because a warm smile would show kindness."
  },
  131: {
    type: "concept", icon: "🔇", accent: "#c5dd4b", pauseTimer: true,
    title: "Aphonia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Loss of voice; being unable to produce sound while speaking.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">स्वरलोप</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">voicelessness</li><li class="vc-chip">muteness</li><li class="vc-chip">speechlessness</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">After shouting at the match all day, he woke up with <b>aphonia</b> and could only whisper.</p></li><li><span class="vc-n">2</span><p class="vc-s">The singer's sudden <b>aphonia</b> forced the concert to be postponed.</p></li><li><span class="vc-n">3</span><p class="vc-s">Doctors say stress or a throat infection may cause temporary <b>aphonia</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/44.png" alt="Illustration of the word aphonia: A doctor in a clinic examining a man's throat with a small light while the man gently holds his throat, un" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Doctors say stress or a throat infection may cause temporary <mark class="vc-hl">aphonia</mark>.</p></div></div>
      </div></div>
    `
  },
  132: {
    questext: "Select the most appropriate synonym of the given word.\nAphonia",
    options: ["Muteness", "Deafness", "Blindness", "Sleeplessness"],
    correct: "1",
    exptext: "✅ Aphonia is the loss of voice, so muteness is the closest word. 📌 A means without and phone means sound. ❌ Deafness is wrong because it is a loss of hearing."
  },
  133: {
    questext: "Select the most appropriate option to fill in the blank.\nThe singer lost his voice completely after the illness, a condition doctors call ______.",
    options: ["insomnia", "aphasia", "aphonia", "narcolepsy"],
    correct: "3",
    exptext: "✅ Aphonia fits because it means loss of voice. 📌 Aphonia = no phone, no sound. ❌ Aphasia is wrong because it is a loss of language, not of voice."
  },
  134: {
    type: "concept", icon: "🧠", accent: "#b026c5", pauseTimer: true,
    title: "Aphasia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:176,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Loss of the ability to understand or use words, caused by brain damage.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">वाचाघात</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">speech loss</li><li class="vc-chip">dysphasia</li><li class="vc-chip">language disorder</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">After the stroke, the writer suffered <b>aphasia</b> and struggled to find simple words.</p></li><li><span class="vc-n">2</span><p class="vc-s">Speech therapy helped the patient recover slowly from <b>aphasia</b> over many months. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Doctors explained that <b>aphasia</b> damages language in the brain, not the voice itself.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/45.png" alt="Illustration of the word aphasia: A speech therapist in a bright clinic holding up a picture card of an apple to an elderly patient who trie" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Speech therapy helped the patient recover slowly from <mark class="vc-hl">aphasia</mark> over many months.</p></div></div>
      </div></div>
    `
  },
  135: {
    questext: "Select the most appropriate synonym of the given word.\nAphasia",
    options: ["Insomnia", "Dysphasia", "Amnesia", "Narcolepsy"],
    correct: "2",
    exptext: "✅ Aphasia is trouble with using language, so dysphasia is the closest word. 📌 Aphasia is about words, not voice. ❌ Amnesia is wrong because it is a loss of memory."
  },
  136: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nLoss of the ability to understand or use words because of brain damage",
    options: ["Insomnia", "Aphonia", "Amnesia", "Aphasia"],
    correct: "4",
    exptext: "✅ Aphasia is the loss of language ability caused by brain damage. 📌 Aphasia = no phrase. ❌ Aphonia is wrong because it is only a loss of voice."
  },
  137: {
    type: "concept", icon: "🌙", accent: "#31d891", pauseTimer: true,
    title: "Insomnia",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,216,145;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Long-term difficulty in falling asleep or staying asleep.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अनिद्रा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">sleeplessness</li><li class="vc-chip">wakefulness</li><li class="vc-chip">restlessness</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">sleep</li><li class="vc-chip">slumber</li><li class="vc-chip">drowsiness</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Worry about exams gave him <b>insomnia</b>, and he lay awake until sunrise. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Doctors advise less phone use at night to reduce <b>insomnia</b>.</p></li><li><span class="vc-n">3</span><p class="vc-s">The poet's <b>insomnia</b> filled his lonely nights with strange and restless thoughts.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/46.png" alt="Illustration of the word insomnia: A young man lying awake in bed at night with wide-open eyes, moonlight through the window, restless crump" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Worry about exams gave him <mark class="vc-hl">insomnia</mark>, and he lay awake until sunrise.</p></div></div>
      </div></div>
    `
  },
  138: {
    questext: "Select the most appropriate antonym of the given word.\nInsomnia",
    options: ["Slumber", "Sleeplessness", "Wakefulness", "Restlessness"],
    correct: "1",
    exptext: "✅ Insomnia means being unable to sleep, so slumber, which means deep sleep, is the opposite. 📌 In- means not and somnus means sleep. ❌ Sleeplessness is wrong because it is a synonym."
  },
  139: {
    questext: "Select the most appropriate option to fill in the blank.\nUnable to sleep for many nights, the clerk visited a doctor for his ______.",
    options: ["somnolence", "narcolepsy", "insomnia", "aphasia"],
    correct: "3",
    exptext: "✅ Insomnia fits because the clerk could not sleep. 📌 In-somnia = no sleep. ❌ Narcolepsy is wrong because it means falling asleep suddenly."
  },
  140: {
    type: "concept", icon: "😴", accent: "#dd754b", pauseTimer: true,
    title: "Narcolepsy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,117,75;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A condition in which a person suddenly falls asleep during the day.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">निद्रा-रोग</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">sleep disorder</li><li class="vc-chip">sleep attack</li><li class="vc-chip">sudden sleepiness</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">insomnia</li><li class="vc-chip">wakefulness</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Because of <b>narcolepsy</b>, he sometimes fell asleep in the middle of a conversation.</p></li><li><span class="vc-n">2</span><p class="vc-s"><b>Narcolepsy</b> is not laziness; it is a medical condition that affects sleep control in the brain. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The novel's hero suffers from <b>narcolepsy</b> and drifts into dreams at the strangest moments.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/47.png" alt="Illustration of the word narcolepsy: A man dozing off suddenly at a café table mid-conversation with a coffee cup in hand, his friend lookin" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q"><mark class="vc-hl">Narcolepsy</mark> is not laziness; it is a medical condition that affects sleep control in the brain.</p></div></div>
      </div></div>
    `
  },
  141: {
    questext: "Select the most appropriate synonym of the given word.\nNarcolepsy",
    options: ["Sleeplessness", "Sleep attack", "Sleepwalking", "Loss of voice"],
    correct: "2",
    exptext: "✅ Narcolepsy is a condition of sudden sleep, so sleep attack is the closest phrase. 📌 Narco means sleep and lepsy means seizure. ❌ Sleeplessness is wrong because that is insomnia."
  },
  142: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA condition in which a person suddenly falls asleep during the day",
    options: ["Aphonia", "Insomnia", "Aphasia", "Narcolepsy"],
    correct: "4",
    exptext: "✅ Narcolepsy is the condition of falling asleep suddenly in the daytime. 📌 Narcolepsy = sleep attack. ❌ Insomnia is wrong because it means being unable to sleep."
  },
  143: {
    type: "concept", icon: "🥱", accent: "#2627c5", pauseTimer: true,
    title: "Somnolence",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,39,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A strong feeling of sleepiness; drowsiness.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">तंद्रा, उनींदापन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">drowsiness</li><li class="vc-chip">sleepiness</li><li class="vc-chip">lethargy</li><li class="vc-chip">torpor</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">alertness</li><li class="vc-chip">wakefulness</li><li class="vc-chip">vigilance</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A heavy lunch brought on <b>somnolence</b>, and half the class began to nod. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The medicine causes <b>somnolence</b>, so patients should not drive after taking it.</p></li><li><span class="vc-n">3</span><p class="vc-s">A warm <b>somnolence</b> settled over the village in the quiet afternoon heat.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/48.png" alt="Illustration of the word somnolence: Students in a warm classroom after lunch with heavy eyelids and nodding heads, a ceiling fan turning, t" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A heavy lunch brought on <mark class="vc-hl">somnolence</mark>, and half the class began to nod.</p></div></div>
      </div></div>
    `
  },
  144: {
    questext: "Select the most appropriate antonym of the given word.\nSomnolence",
    options: ["Alertness", "Drowsiness", "Torpor", "Lethargy"],
    correct: "1",
    exptext: "✅ Somnolence means sleepiness, so alertness, which means being awake and watchful, is the opposite. 📌 Somnus means sleep. ❌ Drowsiness is wrong because it is a synonym."
  },
  145: {
    questext: "Select the most appropriate option to fill in the blank.\nAfter the heavy lunch, a pleasant ______ came over him and his eyes closed.",
    options: ["vigilance", "alertness", "somnolence", "energy"],
    correct: "3",
    exptext: "✅ Somnolence fits because he felt sleepy and his eyes closed. 📌 Somnolence = sleepy feeling. ❌ Alertness is wrong because it means being wide awake."
  },
  146: {
    type: "concept", icon: "🚶", accent: "#63d831", pauseTimer: true,
    title: "Somnambulist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:99,216,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who walks around while asleep.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">नींद में चलने वाला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">sleepwalker</li><li class="vc-chip">night walker</li><li class="vc-chip">noctambulist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>somnambulist</b> woke up in the garden and did not know how he got there. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Her father is a <b>somnambulist</b>, so the family locks the doors at night.</p></li><li><span class="vc-n">3</span><p class="vc-s">In Macbeth, Lady Macbeth appears as a <b>somnambulist</b> haunted by her guilty dreams.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/49.png" alt="Illustration of the word somnambulist: A man in pyjamas walking with arms stretched out and closed eyes through a moonlit garden, a startled" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">somnambulist</mark> woke up in the garden and did not know how he got there.</p></div></div>
      </div></div>
    `
  },
  147: {
    questext: "Select the most appropriate synonym of the given word.\nSomnambulist",
    options: ["Insomniac", "Sleepwalker", "Sleeper", "Dreamer"],
    correct: "2",
    exptext: "✅ A somnambulist walks while asleep, so sleepwalker is the closest word. 📌 Somnus means sleep and ambulare means walk. ❌ Insomniac is wrong because an insomniac cannot sleep."
  },
  148: {
    questext: "Select the most appropriate option to fill in the blank.\nThe doctor was shocked to find that the quiet patient was a ______ who walked about the ward at night, fast asleep.",
    options: ["protégé", "insomniac", "sculptor", "somnambulist"],
    correct: "4",
    exptext: "✅ Somnambulist fits because the patient walked while asleep. 📌 Somnus plus ambulare. ❌ Insomniac is wrong because an insomniac stays awake."
  },
  149: {
    type: "concept", icon: "🗿", accent: "#dd4ba1", pauseTimer: true,
    title: "Stolid",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,75,161;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Calm and showing little emotion; hard to excite or upset.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">निर्विकार, भावशून्य</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">impassive</li><li class="vc-chip">unemotional</li><li class="vc-chip">phlegmatic</li><li class="vc-chip">stoical</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">excitable</li><li class="vc-chip">emotional</li><li class="vc-chip">sensitive</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>stolid</b> guard stood without a smile, no matter how the tourists teased him. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Even after the shocking news, the <b>stolid</b> farmer simply nodded and went on working.</p></li><li><span class="vc-n">3</span><p class="vc-s">The author portrays his hero as a <b>stolid</b> man who never shows pain or joy.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/50.png" alt="Illustration of the word stolid: A palace guard standing perfectly still with a blank calm face while tourists try to make him laugh around " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">stolid</mark> guard stood without a smile, no matter how the tourists teased him.</p></div></div>
      </div></div>
    `
  },
  150: {
    questext: "Select the most appropriate antonym of the given word.\nStolid",
    options: ["Excitable", "Impassive", "Phlegmatic", "Unemotional"],
    correct: "1",
    exptext: "✅ Stolid means showing little emotion, so excitable, which means easily thrilled, is the opposite. 📌 Stolid stays still like stone. ❌ Impassive is wrong because it is a synonym."
  },
  151: {
    questext: "Select the most appropriate option to fill in the blank.\nEven on hearing the shocking news, the ______ guard showed no sign of surprise or fear.",
    options: ["nervous", "excitable", "stolid", "emotional"],
    correct: "3",
    exptext: "✅ Stolid fits because the guard showed no emotion. 📌 Stolid = stone-like. ❌ Nervous is wrong because the guard showed no fear."
  },
  152: {
    type: "concept", icon: "🧱", accent: "#26b2c5", pauseTimer: true,
    title: "Obtuse",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,178,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Slow to understand; not quick or sharp in thinking.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मंदबुद्धि, कुंद</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dull</li><li class="vc-chip">dense</li><li class="vc-chip">slow</li><li class="vc-chip">thick-headed</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">sharp</li><li class="vc-chip">intelligent</li><li class="vc-chip">perceptive</li><li class="vc-chip">astute</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">He was too <b>obtuse</b> to see that everyone wanted him to stop talking.</p></li><li><span class="vc-n">2</span><p class="vc-s">The teacher explained the sum five times, but the <b>obtuse</b> student still looked confused. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Do not be so <b>obtuse</b>; the hints in the letter clearly point to the thief.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/51.png" alt="Illustration of the word obtuse: A teacher explaining at a board to a puzzled student scratching his head while other students understand, p" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The teacher explained the sum five times, but the <mark class="vc-hl">obtuse</mark> student still looked confused.</p></div></div>
      </div></div>
    `
  },
  153: {
    questext: "Select the most appropriate synonym of the given word.\nObtuse",
    options: ["Sharp", "Dull", "Obscure", "Obstinate"],
    correct: "2",
    exptext: "✅ Obtuse means slow to understand, so dull is the closest word. 📌 An obtuse angle is blunt, not sharp. ❌ Sharp is wrong because it means quick to understand."
  },
  154: {
    questext: "Select the most appropriate option to fill in the blank.\nHe was so ______ that he failed to see the hint even after it was explained three times.",
    options: ["sharp", "astute", "perceptive", "obtuse"],
    correct: "4",
    exptext: "✅ Obtuse fits because he was slow to understand the hint. 📌 Obtuse = blunt mind. ❌ Astute is wrong because an astute person understands quickly."
  },
  155: {
    type: "concept", icon: "🔍", accent: "#d8bb31", pauseTimer: true,
    title: "Perspicacious",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,187,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Quick to notice and understand things; having keen insight.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कुशाग्र, तीक्ष्णबुद्धि</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">shrewd</li><li class="vc-chip">astute</li><li class="vc-chip">sharp</li><li class="vc-chip">discerning</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">obtuse</li><li class="vc-chip">dull</li><li class="vc-chip">naive</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>perspicacious</b> detective noticed the muddy shoe print that everyone else had ignored. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>perspicacious</b> investor saw the crisis coming and sold his shares early.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her <b>perspicacious</b> remarks showed that she understood the problem better than the experts.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/52.png" alt="Illustration of the word perspicacious: A detective crouching in a hallway pointing at a muddy shoe print near a door with a magnifying glas" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">perspicacious</mark> detective noticed the muddy shoe print that everyone else had ignored.</p></div></div>
      </div></div>
    `
  },
  156: {
    questext: "Select the most appropriate antonym of the given word.\nPerspicacious",
    options: ["Obtuse", "Shrewd", "Astute", "Discerning"],
    correct: "1",
    exptext: "✅ Perspicacious means quick to notice things, so obtuse, which means slow to understand, is the opposite. 📌 Perspicacious sees through things. ❌ Shrewd is wrong because it is a synonym."
  },
  157: {
    questext: "Select the most appropriate option to fill in the blank.\nOnly a ______ observer would notice such a small detail.",
    options: ["dull", "obtuse", "perspicacious", "naive"],
    correct: "3",
    exptext: "✅ Perspicacious fits because only a sharp observer notices small details. 📌 Perspicacious = keen insight. ❌ Obtuse is wrong because an obtuse person misses small details."
  },
  158: {
    type: "concept", icon: "🪟", accent: "#994bdd", pauseTimer: true,
    title: "Perspicuous",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:153,75,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Clearly expressed and easy to understand.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">स्पष्ट, सुबोध</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">clear</li><li class="vc-chip">lucid</li><li class="vc-chip">plain</li><li class="vc-chip">transparent</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">obscure</li><li class="vc-chip">vague</li><li class="vc-chip">ambiguous</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The teacher gave a <b>perspicuous</b> explanation that every student understood at once.</p></li><li><span class="vc-n">2</span><p class="vc-s">A good manual must be <b>perspicuous</b>, so that anyone can follow the steps. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The judge's <b>perspicuous</b> judgment left no doubt about the final decision.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/53.png" alt="Illustration of the word perspicuous: A teacher at a board with a simple diagram, students nodding with understanding smiles, bright classro" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A good manual must be <mark class="vc-hl">perspicuous</mark>, so that anyone can follow the steps.</p></div></div>
      </div></div>
    `
  },
  159: {
    questext: "Select the most appropriate synonym of the given word.\nPerspicuous",
    options: ["Obscure", "Clear", "Suspicious", "Hidden"],
    correct: "2",
    exptext: "✅ Perspicuous means clearly expressed, so clear is the closest word. 📌 Perspicuous is easy to see through. ❌ Obscure is wrong because it means unclear."
  },
  160: {
    questext: "Select the most appropriate option to fill in the blank.\nThe teacher's ______ explanation helped even the weakest student understand the lesson at once.",
    options: ["confusing", "obscure", "vague", "perspicuous"],
    correct: "4",
    exptext: "✅ Perspicuous fits because the explanation was clear and easy to follow. 📌 Perspicuous = see-through clear. ❌ Vague is wrong because a vague explanation would not help."
  },
  161: {
    type: "concept", icon: "🏪", accent: "#26c54c", pauseTimer: true,
    title: "Proprietor",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,76;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The owner of a business, shop or property.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मालिक, स्वामी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">owner</li><li class="vc-chip">holder</li><li class="vc-chip">possessor</li><li class="vc-chip">landlord</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">tenant</li><li class="vc-chip">employee</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>proprietor</b> of the corner shop knows every customer by name. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The hotel's <b>proprietor</b> greeted the guests and showed them to their rooms.</p></li><li><span class="vc-n">3</span><p class="vc-s">The newspaper's <b>proprietor</b> insisted that editors must never print rumours.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/54.png" alt="Illustration of the word proprietor: A friendly shopkeeper behind the counter of a small corner shop greeting a customer, shelves of goods b" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">proprietor</mark> of the corner shop knows every customer by name.</p></div></div>
      </div></div>
    `
  },
  162: {
    questext: "Select the most appropriate antonym of the given word.\nProprietor",
    options: ["Employee", "Owner", "Landlord", "Holder"],
    correct: "1",
    exptext: "✅ A proprietor owns a business, so an employee, who works for the owner, is the opposite. 📌 Owner versus worker. ❌ Owner is wrong because it is a synonym."
  },
  163: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nThe owner of a business, shop or property",
    options: ["Customer", "Tenant", "Proprietor", "Employee"],
    correct: "3",
    exptext: "✅ Proprietor means the owner of a business or property. 📌 Proprietor shares its root with property. ❌ Tenant is wrong because a tenant only rents the property."
  },
  164: {
    type: "concept", icon: "💪", accent: "#d83139", pauseTimer: true,
    title: "Indefatigable",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,57;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Never getting tired; working hard without rest.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अथक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">tireless</li><li class="vc-chip">untiring</li><li class="vc-chip">persistent</li><li class="vc-chip">energetic</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">lazy</li><li class="vc-chip">weary</li><li class="vc-chip">tired</li><li class="vc-chip">lethargic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>indefatigable</b> nurse worked double shifts for weeks during the flood. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Her <b>indefatigable</b> efforts helped the village build a school in one year.</p></li><li><span class="vc-n">3</span><p class="vc-s">The explorer's <b>indefatigable</b> spirit carried him across deserts and frozen seas.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/55.png" alt="Illustration of the word indefatigable: A nurse in a hospital ward walking briskly with a tray at night, smiling and energetic, tired collea" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">indefatigable</mark> nurse worked double shifts for weeks during the flood.</p></div></div>
      </div></div>
    `
  },
  165: {
    questext: "Select the most appropriate synonym of the given word.\nIndefatigable",
    options: ["Weary", "Tireless", "Indelible", "Lethargic"],
    correct: "2",
    exptext: "✅ Indefatigable means never getting tired, so tireless is the closest word. 📌 In- means not and fatigue means tiredness. ❌ Weary is wrong because it means tired."
  },
  166: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ nurse worked day and night for a week and never complained of tiredness.",
    options: ["lethargic", "lazy", "weary", "indefatigable"],
    correct: "4",
    exptext: "✅ Indefatigable fits because the nurse never got tired. 📌 Indefatigable = no fatigue. ❌ Weary is wrong because a weary nurse would be tired."
  },
  167: {
    type: "concept", icon: "🛡️", accent: "#4b7ddd", pauseTimer: true,
    title: "Invincible",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,125,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Too strong to be defeated or beaten.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अजेय</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">unbeatable</li><li class="vc-chip">unconquerable</li><li class="vc-chip">indomitable</li><li class="vc-chip">invulnerable</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">weak</li><li class="vc-chip">beatable</li><li class="vc-chip">vulnerable</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>invincible</b> champion had not lost a single match in ten years. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The villagers thought the fort was <b>invincible</b> until the enemy found a secret path.</p></li><li><span class="vc-n">3</span><p class="vc-s">Young heroes in myths often feel <b>invincible</b> before meeting their first great failure.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/56.png" alt="Illustration of the word invincible: A champion wrestler in a stadium raising a trophy with a confident smile, defeated opponents on the mat" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">invincible</mark> champion had not lost a single match in ten years.</p></div></div>
      </div></div>
    `
  },
  168: {
    questext: "Select the most appropriate antonym of the given word.\nInvincible",
    options: ["Vulnerable", "Unbeatable", "Indomitable", "Unconquerable"],
    correct: "1",
    exptext: "✅ Invincible means too strong to be defeated, so vulnerable, which means easy to hurt, is the opposite. 📌 Invincible cannot be beaten. ❌ Unbeatable is wrong because it is a synonym."
  },
  169: {
    questext: "Select the most appropriate option to fill in the blank.\nWith seven wins in a row, the champion looked ______ and no rival seemed able to defeat him.",
    options: ["weak", "vulnerable", "invincible", "beatable"],
    correct: "3",
    exptext: "✅ Invincible fits because no rival could defeat him. 📌 In plus vincere, to conquer. ❌ Vulnerable is wrong because it means easy to defeat."
  },
  170: {
    type: "concept", icon: "🎯", accent: "#8ac526", pauseTimer: true,
    title: "Infallible",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:138,197,38;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Never wrong; unable to make mistakes.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अचूक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">faultless</li><li class="vc-chip">unerring</li><li class="vc-chip">perfect</li><li class="vc-chip">foolproof</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">fallible</li><li class="vc-chip">flawed</li><li class="vc-chip">error-prone</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">No doctor is <b>infallible</b>, so a second opinion can sometimes save a life.</p></li><li><span class="vc-n">2</span><p class="vc-s">The coach trusted the captain's <b>infallible</b> sense of timing in every match. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The old priest was treated as <b>infallible</b>, and no villager dared question his word.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/57.png" alt="Illustration of the word infallible: A cricket captain on the field making a perfect catch while the coach nods approvingly from the boundar" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The coach trusted the captain's <mark class="vc-hl">infallible</mark> sense of timing in every match.</p></div></div>
      </div></div>
    `
  },
  171: {
    questext: "Select the most appropriate synonym of the given word.\nInfallible",
    options: ["Fallible", "Faultless", "Infantile", "Foolish"],
    correct: "2",
    exptext: "✅ Infallible means never wrong, so faultless is the closest word. 📌 In- means not and fallible means able to err. ❌ Fallible is wrong because it is the opposite."
  },
  172: {
    questext: "Select the most appropriate option to fill in the blank.\nNo machine is ______, because even the best computer can make an error.",
    options: ["flawed", "fallible", "faulty", "infallible"],
    correct: "4",
    exptext: "✅ Infallible fits because no machine is free from error. 📌 Infallible = cannot fail. ❌ Fallible is wrong because it means able to make mistakes, which would make the sentence false."
  },
  173: {
    type: "concept", icon: "🐴", accent: "#d831cb", pauseTimer: true,
    title: "Quixotic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,203;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Very idealistic and romantic but not practical.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अव्यावहारिक, स्वप्नदर्शी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">idealistic</li><li class="vc-chip">romantic</li><li class="vc-chip">impractical</li><li class="vc-chip">visionary</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">practical</li><li class="vc-chip">realistic</li><li class="vc-chip">pragmatic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His <b>quixotic</b> plan to end hunger with one small garden amused everyone.</p></li><li><span class="vc-n">2</span><p class="vc-s">She made a <b>quixotic</b> attempt to stop the bulldozers with only a placard.</p></li><li><span class="vc-n">3</span><p class="vc-s">Cervantes created a <b>quixotic</b> hero who fights windmills, believing them to be giants. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/58.png" alt="Illustration of the word quixotic: An old knight in rusty armour on a thin horse charging at a tall windmill, a plump companion on a donkey " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Cervantes created a <mark class="vc-hl">quixotic</mark> hero who fights windmills, believing them to be giants.</p></div></div>
      </div></div>
    `
  },
  174: {
    questext: "Select the most appropriate antonym of the given word.\nQuixotic",
    options: ["Pragmatic", "Idealistic", "Romantic", "Visionary"],
    correct: "1",
    exptext: "✅ Quixotic means idealistic but not practical, so pragmatic, which means practical, is the opposite. 📌 Don Quixote chased dreams. ❌ Idealistic is wrong because it is a synonym."
  },
  175: {
    questext: "Select the most appropriate option to fill in the blank.\nHis ______ plan to end all poverty in one year with no money was admired but never practical.",
    options: ["realistic", "practical", "quixotic", "pragmatic"],
    correct: "3",
    exptext: "✅ Quixotic fits because the plan was idealistic and impossible. 📌 Quixotic = Don Quixote. ❌ Practical is wrong because the plan was not practical."
  },
  176: {
    type: "concept", icon: "📢", accent: "#4bddbd", pauseTimer: true,
    title: "Dogmatic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,189;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Stating opinions as absolute truth and refusing to consider other views.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">हठधर्मी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">opinionated</li><li class="vc-chip">inflexible</li><li class="vc-chip">rigid</li><li class="vc-chip">doctrinaire</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">open-minded</li><li class="vc-chip">flexible</li><li class="vc-chip">tolerant</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>dogmatic</b> professor never listened to students who disagreed with his theory. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>dogmatic</b> leader often refuses advice, even when facts prove him wrong.</p></li><li><span class="vc-n">3</span><p class="vc-s">His <b>dogmatic</b> speeches allowed no doubt and no discussion.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/59.png" alt="Illustration of the word dogmatic: A professor in a lecture hall pointing sternly at his notes with folded arms while a student with a raise" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">dogmatic</mark> professor never listened to students who disagreed with his theory.</p></div></div>
      </div></div>
    `
  },
  177: {
    questext: "Select the most appropriate synonym of the given word.\nDogmatic",
    options: ["Flexible", "Opinionated", "Dramatic", "Open-minded"],
    correct: "2",
    exptext: "✅ Dogmatic means stating opinions as absolute truth, so opinionated is the closest word. 📌 A dogma is a belief never to be questioned. ❌ Flexible is wrong because it means willing to change."
  },
  178: {
    questext: "Select the most appropriate option to fill in the blank.\nHe is so ______ that he refuses to listen to any view other than his own.",
    options: ["open-minded", "flexible", "tolerant", "dogmatic"],
    correct: "4",
    exptext: "✅ Dogmatic fits because he accepts only his own view. 📌 Dogmatic = dogma. ❌ Tolerant is wrong because a tolerant person listens to others."
  },
  179: {
    type: "concept", icon: "🎭", accent: "#c57426", pauseTimer: true,
    title: "Pseudonym",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,116,38;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A false name used by a writer instead of the real name.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">छद्मनाम</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">pen name</li><li class="vc-chip">alias</li><li class="vc-chip">assumed name</li><li class="vc-chip">nom de plume</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">real name</li><li class="vc-chip">birth name</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The author wrote crime novels under a <b>pseudonym</b> so readers would not know her identity.</p></li><li><span class="vc-n">2</span><p class="vc-s">Samuel Clemens is better known by his <b>pseudonym</b>, Mark Twain.</p></li><li><span class="vc-n">3</span><p class="vc-s">Many online users hide behind a <b>pseudonym</b> instead of showing their real names. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/60.png" alt="Illustration of the word pseudonym: A person at a laptop in a dim room wearing a plain eye mask, typing, a lamp casting golden light, myster" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Many online users hide behind a <mark class="vc-hl">pseudonym</mark> instead of showing their real names.</p></div></div>
      </div></div>
    `
  },
  180: {
    questext: "Select the most appropriate antonym of the given word.\nPseudonym",
    options: ["Real name", "Pen name", "Alias", "Assumed name"],
    correct: "1",
    exptext: "✅ A pseudonym is a false name, so real name is the opposite. 📌 Pseudo means false. ❌ Pen name is wrong because it is a synonym."
  },
  181: {
    questext: "Select the most appropriate option to fill in the blank.\nMary Ann Evans wrote her novels under the ______ George Eliot.",
    options: ["homonym", "acronym", "pseudonym", "patronym"],
    correct: "3",
    exptext: "✅ Pseudonym fits because George Eliot was a false name used by the writer. 📌 Pseudo = false. ❌ Patronym is wrong because it is a name taken from the father."
  },
  182: {
    type: "concept", icon: "👨‍👦", accent: "#5331d8", pauseTimer: true,
    title: "Patronym",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:83,49,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A name taken from the name of one's father or ancestor.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पितृनाम</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">paternal name</li><li class="vc-chip">surname</li><li class="vc-chip">family name</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">matronym</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">In Iceland, a child's <b>patronym</b> comes from the father's first name.</p></li><li><span class="vc-n">2</span><p class="vc-s">The Russian name Ivanovich is a <b>patronym</b> meaning "son of Ivan." <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Genealogists use each <b>patronym</b> in old records to trace how families moved.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/61.png" alt="Illustration of the word patronym: A family around a table with an old family-tree scroll, an elder pointing to a figure for a young boy, wa" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The Russian name Ivanovich is a <mark class="vc-hl">patronym</mark> meaning "son of Ivan."</p></div></div>
      </div></div>
    `
  },
  183: {
    questext: "Select the most appropriate synonym of the given word.\nPatronym",
    options: ["Pseudonym", "Surname", "Nickname", "Title"],
    correct: "2",
    exptext: "✅ A patronym is a name taken from one's father or ancestor, so surname is the closest word. 📌 Pater means father. ❌ Pseudonym is wrong because it is a false name."
  },
  184: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA name formed from the name of one's father or ancestor",
    options: ["Homonym", "Pseudonym", "Acronym", "Patronym"],
    correct: "4",
    exptext: "✅ Patronym is a name taken from the father or an ancestor. 📌 Pater = father. ❌ Pseudonym is wrong because it is a made-up name."
  },
  185: {
    type: "concept", icon: "🚀", accent: "#58dd4b", pauseTimer: true,
    title: "Acronym",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:88,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A word made from the first letters of other words.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">संक्षिप्ताक्षर</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">initialism</li><li class="vc-chip">abbreviation</li><li class="vc-chip">contraction</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">NASA is an <b>acronym</b> for the National Aeronautics and Space Administration. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Our teacher asked us to make an <b>acronym</b> to remember the planets in order.</p></li><li><span class="vc-n">3</span><p class="vc-s">A good writer explains every <b>acronym</b> before using it in a formal report.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/62.png" alt="Illustration of the word acronym: A teacher showing excited students a space rocket model on a table, mission-control photos on the wall, br" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">NASA is an <mark class="vc-hl">acronym</mark> for the National Aeronautics and Space Administration.</p></div></div>
      </div></div>
    `
  },
  186: {
    questext: "Select the most appropriate synonym of the given word.\nAcronym",
    options: ["Initialism", "Antonym", "Homonym", "Pseudonym"],
    correct: "1",
    exptext: "✅ An acronym is a word made from first letters, so initialism is the closest word. 📌 Acro means tip, the first letter. ❌ Pseudonym is wrong because it is a false name."
  },
  187: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA word made from the first letters of other words",
    options: ["Pseudonym", "Homonym", "Acronym", "Patronym"],
    correct: "3",
    exptext: "✅ Acronym is a word formed from the first letters of other words. 📌 Acro = tip. ❌ Homonym is wrong because it is a word with two meanings."
  },
  188: {
    type: "concept", icon: "🔁", accent: "#c52663", pauseTimer: true,
    title: "Homonym",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,99;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A word with the same spelling or sound as another but a different meaning.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">समरूप शब्द</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">homophone</li><li class="vc-chip">homograph</li><li class="vc-chip">look-alike</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">synonym</li><li class="vc-chip">antonym</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">"Bank" is a <b>homonym</b>, because it means a river edge and a money place.</p></li><li><span class="vc-n">2</span><p class="vc-s">The word "bat" is a <b>homonym</b>; it can be an animal or a cricket tool. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Poets love a <b>homonym</b>, because one word can carry two different pictures.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/63.png" alt="Illustration of the word homonym: A cricketer holding a bat while a small flying bat swoops beside him in a park at dusk, playful mood." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The word "bat" is a <mark class="vc-hl">homonym</mark>; it can be an animal or a cricket tool.</p></div></div>
      </div></div>
    `
  },
  189: {
    questext: "Select the most appropriate synonym of the given word.\nHomonym",
    options: ["Antonym", "Homophone", "Pseudonym", "Acronym"],
    correct: "2",
    exptext: "✅ A homonym is a word that sounds or looks the same as another, so homophone is the closest word. 📌 Homo means same. ❌ Antonym is wrong because it means opposite."
  },
  190: {
    questext: "Select the most appropriate option to fill in the blank.\nBank for a river edge and bank for a place with money are words known as ______.",
    options: ["pseudonyms", "antonyms", "acronyms", "homonyms"],
    correct: "4",
    exptext: "✅ Homonyms are words with the same spelling but different meanings. 📌 Homo = same. ❌ Antonyms is wrong because antonyms are opposite words."
  },
  191: {
    type: "concept", icon: "👗", accent: "#31a2d8", pauseTimer: true,
    title: "Mannequin",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,162,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A model of a human body used in shops to show clothes.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पुतला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dummy</li><li class="vc-chip">figure</li><li class="vc-chip">effigy</li><li class="vc-chip">model</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The shop dressed a <b>mannequin</b> in a bright red saree for the festival sale. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">In the dark store, the <b>mannequin</b> looked so real that she almost greeted it.</p></li><li><span class="vc-n">3</span><p class="vc-s">The detective found a <b>mannequin</b> hidden behind the curtain, not the missing man.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/64.png" alt="Illustration of the word mannequin: A clothing store window with a mannequin in a bright red saree, a girl outside looking at it admiringly," loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The shop dressed a <mark class="vc-hl">mannequin</mark> in a bright red saree for the festival sale.</p></div></div>
      </div></div>
    `
  },
  192: {
    questext: "Select the most appropriate synonym of the given word.\nMannequin",
    options: ["Dummy", "Tailor", "Sculptor", "Customer"],
    correct: "1",
    exptext: "✅ A mannequin is a model of a human body, so dummy is the closest word. 📌 Think of a shop dummy. ❌ Tailor is wrong because a tailor is a person who sews clothes."
  },
  193: {
    questext: "Select the most appropriate option to fill in the blank.\nThe shop dressed the ______ in a bright red coat and placed it near the glass door.",
    options: ["proprietor", "sculptor", "mannequin", "wayfarer"],
    correct: "3",
    exptext: "✅ Mannequin fits because clothes are displayed on it. 📌 Mannequin shows clothes. ❌ Sculptor is wrong because a sculptor is a person who carves statues."
  },
  194: {
    type: "concept", icon: "🗽", accent: "#d8dd4b", pauseTimer: true,
    title: "Sculptor",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">An artist who makes figures by carving stone, wood or metal.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मूर्तिकार</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">carver</li><li class="vc-chip">modeller</li><li class="vc-chip">artisan</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>sculptor</b> spent six months carving the horse from a single block of marble. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A young <b>sculptor</b> won the prize for her statue of a dancing girl.</p></li><li><span class="vc-n">3</span><p class="vc-s">Michelangelo, the great <b>sculptor</b>, said the statue already lived inside the stone.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/65.png" alt="Illustration of the word sculptor: A sculptor in a studio carving a marble horse with a chisel and mallet, marble dust glowing in sunbeams." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">sculptor</mark> spent six months carving the horse from a single block of marble.</p></div></div>
      </div></div>
    `
  },
  195: {
    questext: "Select the most appropriate synonym of the given word.\nSculptor",
    options: ["Painter", "Carver", "Sculpture", "Weaver"],
    correct: "2",
    exptext: "✅ A sculptor carves figures, so carver is the closest word. 📌 Sculptor makes sculpture. ❌ Sculpture is wrong because it is the artwork, not the artist."
  },
  196: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ carved the king's statue out of a block of granite.",
    options: ["wayfarer", "mannequin", "proprietor", "sculptor"],
    correct: "4",
    exptext: "✅ Sculptor fits because a sculptor carves statues from stone. 📌 Sculptor = statue maker. ❌ Wayfarer is wrong because a wayfarer is a traveller."
  },
  197: {
    type: "concept", icon: "🏛️", accent: "#9c26c5", pauseTimer: true,
    title: "Chancery",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:156,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The office of an embassy, or an office that keeps official records.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दूतावास-कार्यालय, अभिलेखालय</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">registry</li><li class="vc-chip">archive</li><li class="vc-chip">record office</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The ambassador signed the visa papers in the <b>chancery</b> of the embassy. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">All old land records were kept safely in the town's <b>chancery</b>.</p></li><li><span class="vc-n">3</span><p class="vc-s">Dickens describes how a lawsuit could rot for years in the Court of <b>Chancery</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/66.png" alt="Illustration of the word chancery: A formal embassy office with an ambassador signing documents at a wooden desk, flags in the corner, a cle" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The ambassador signed the visa papers in the <mark class="vc-hl">chancery</mark> of the embassy.</p></div></div>
      </div></div>
    `
  },
  198: {
    questext: "Select the most appropriate synonym of the given word.\nChancery",
    options: ["Registry", "Cannery", "Orchard", "Stadium"],
    correct: "1",
    exptext: "✅ A chancery keeps official records, so registry is the closest word. 📌 Chancery for chief papers. ❌ Cannery is wrong because it is a factory where food is put into tins."
  },
  199: {
    questext: "Select the most appropriate option to fill in the blank.\nThe embassy's official papers are kept in its ______.",
    options: ["gallery", "orchard", "chancery", "stadium"],
    correct: "3",
    exptext: "✅ Chancery fits because it is the office that keeps official records. 📌 Chancery = records office. ❌ Gallery is wrong because it displays art."
  },
  200: {
    type: "concept", icon: "🧳", accent: "#31d87c", pauseTimer: true,
    title: "Peripatetic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,216,124;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Travelling from place to place, never staying long in one spot.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">घुमंतू</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">wandering</li><li class="vc-chip">itinerant</li><li class="vc-chip">nomadic</li><li class="vc-chip">roving</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">settled</li><li class="vc-chip">sedentary</li><li class="vc-chip">stationary</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>peripatetic</b> teacher visited a different village school every week.</p></li><li><span class="vc-n">2</span><p class="vc-s">His <b>peripatetic</b> life as a journalist took him to forty countries in ten years.</p></li><li><span class="vc-n">3</span><p class="vc-s">The <b>peripatetic</b> poet wandered through the hills with only a bag and a flute. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/67.png" alt="Illustration of the word peripatetic: A poet with a flute and a small bag walking along a hill path at sunrise, misty valley below, free spi" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">peripatetic</mark> poet wandered through the hills with only a bag and a flute.</p></div></div>
      </div></div>
    `
  },
  201: {
    questext: "Select the most appropriate synonym of the given word.\nPeripatetic",
    options: ["Sedentary", "Itinerant", "Pathetic", "Energetic"],
    correct: "2",
    exptext: "✅ Peripatetic means travelling from place to place, so itinerant is the closest word. 📌 Peri means around and patein means walk. ❌ Sedentary is wrong because it means staying seated and still."
  },
  202: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ poet gave up a steady job to wander from town to town, never staying long.",
    options: ["stationary", "sedentary", "settled", "peripatetic"],
    correct: "4",
    exptext: "✅ Peripatetic fits because the poet kept travelling. 📌 Peripatetic = walks around. ❌ Sedentary is wrong because a sedentary poet would stay in one place."
  },
  203: {
    type: "concept", icon: "🥾", accent: "#dd624b", pauseTimer: true,
    title: "Wayfarer",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,98,75;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who travels from place to place, especially on foot.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पथिक, राहगीर</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">traveller</li><li class="vc-chip">walker</li><li class="vc-chip">wanderer</li><li class="vc-chip">pilgrim</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">homebody</li><li class="vc-chip">resident</li><li class="vc-chip">settler</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The tired <b>wayfarer</b> rested under the banyan tree before walking on. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Every <b>wayfarer</b> on that old road was welcomed with water and a smile.</p></li><li><span class="vc-n">3</span><p class="vc-s">The poem describes a lonely <b>wayfarer</b> searching for a home beyond the hills.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/68.png" alt="Illustration of the word wayfarer: A weary traveller with a stick and bundle resting under a large banyan tree beside a dusty road, villager" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The tired <mark class="vc-hl">wayfarer</mark> rested under the banyan tree before walking on.</p></div></div>
      </div></div>
    `
  },
  204: {
    questext: "Select the most appropriate antonym of the given word.\nWayfarer",
    options: ["Homebody", "Traveller", "Wanderer", "Pilgrim"],
    correct: "1",
    exptext: "✅ A wayfarer travels from place to place, so a homebody, who stays at home, is the opposite. 📌 Way plus fare means travel the road. ❌ Traveller is wrong because it is a synonym."
  },
  205: {
    questext: "Select the most appropriate option to fill in the blank.\nThe tired ______ stopped at the roadside well to drink water before continuing his long walk.",
    options: ["resident", "homebody", "wayfarer", "settler"],
    correct: "3",
    exptext: "✅ Wayfarer fits because he was walking a long way. 📌 Wayfarer = way plus fare. ❌ Resident is wrong because a resident lives in one place and does not travel."
  },
  206: {
    type: "concept", icon: "💺", accent: "#263bc5", pauseTimer: true,
    title: "Sedentary",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,59,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Involving much sitting and very little exercise or movement.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">गतिहीन, आसीन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">inactive</li><li class="vc-chip">stationary</li><li class="vc-chip">desk-bound</li><li class="vc-chip">idle</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">active</li><li class="vc-chip">mobile</li><li class="vc-chip">energetic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A <b>sedentary</b> job at a desk can harm your back if you never stretch. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Doctors warn that a <b>sedentary</b> lifestyle increases the risk of heart disease.</p></li><li><span class="vc-n">3</span><p class="vc-s">The <b>sedentary</b> villagers rarely left their valley in all their lives.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/69.png" alt="Illustration of the word sedentary: A man sitting for long hours at an office desk in front of a computer with a hunched back, an exercise m" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A <mark class="vc-hl">sedentary</mark> job at a desk can harm your back if you never stretch.</p></div></div>
      </div></div>
    `
  },
  207: {
    questext: "Select the most appropriate synonym of the given word.\nSedentary",
    options: ["Energetic", "Inactive", "Sedimentary", "Careful"],
    correct: "2",
    exptext: "✅ Sedentary means involving much sitting, so inactive is the closest word. 📌 Sedere means to sit. ❌ Energetic is wrong because it is the opposite."
  },
  208: {
    questext: "Select the most appropriate option to fill in the blank.\nLeading a ______ life, with long hours of sitting, can harm your heart.",
    options: ["athletic", "active", "energetic", "sedentary"],
    correct: "4",
    exptext: "✅ Sedentary fits because the life involves long hours of sitting. 📌 Sedentary = sitting. ❌ Active is wrong because an active life would help the heart."
  },
  209: {
    type: "concept", icon: "😠", accent: "#78d831", pauseTimer: true,
    title: "Antipathy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:120,216,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A strong feeling of dislike toward someone or something.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">विद्वेष, घृणा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">hostility</li><li class="vc-chip">aversion</li><li class="vc-chip">dislike</li><li class="vc-chip">hatred</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">affection</li><li class="vc-chip">sympathy</li><li class="vc-chip">liking</li><li class="vc-chip">fondness</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">She felt a strong <b>antipathy</b> toward people who lie without shame.</p></li><li><span class="vc-n">2</span><p class="vc-s">The two neighbours' <b>antipathy</b> began over a small quarrel about a fence. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">His <b>antipathy</b> to violence made him a firm believer in peaceful protest.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/70.png" alt="Illustration of the word antipathy: Two neighbours standing on either side of a garden fence with folded arms, glaring at each other, flower" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The two neighbours' <mark class="vc-hl">antipathy</mark> began over a small quarrel about a fence.</p></div></div>
      </div></div>
    `
  },
  210: {
    questext: "Select the most appropriate antonym of the given word.\nAntipathy",
    options: ["Affection", "Hostility", "Aversion", "Dislike"],
    correct: "1",
    exptext: "✅ Antipathy means strong dislike, so affection, which means warm liking, is the opposite. 📌 Anti means against and pathos means feeling. ❌ Hostility is wrong because it is a synonym."
  },
  211: {
    questext: "Select the most appropriate option to fill in the blank.\nHe felt strong ______ toward the cruel landlord and avoided him.",
    options: ["affection", "sympathy", "antipathy", "fondness"],
    correct: "3",
    exptext: "✅ Antipathy fits because he disliked the landlord and avoided him. 📌 Antipathy = feeling against. ❌ Sympathy is wrong because it means feeling pity or support."
  },
  212: {
    type: "concept", icon: "😈", accent: "#dd4bb4", pauseTimer: true,
    title: "Schadenfreude",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,75,180;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Pleasure felt on seeing another person's bad luck or failure.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">परपीड़ा-सुख</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">gloating</li><li class="vc-chip">spite</li><li class="vc-chip">malicious joy</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">sympathy</li><li class="vc-chip">compassion</li><li class="vc-chip">empathy</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">He felt a guilty <b>schadenfreude</b> when his rival missed the final shot. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Online comments often drip with <b>schadenfreude</b> when a famous person fails in public.</p></li><li><span class="vc-n">3</span><p class="vc-s">The German word <b>schadenfreude</b> has no exact English match, so we borrow it.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/71.png" alt="Illustration of the word schadenfreude: A man in a sports crowd smirking quietly while his rival on the court holds his head after a missed " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">He felt a guilty <mark class="vc-hl">schadenfreude</mark> when his rival missed the final shot.</p></div></div>
      </div></div>
    `
  },
  213: {
    questext: "Select the most appropriate synonym of the given word.\nSchadenfreude",
    options: ["Sympathy", "Gloating", "Shame", "Friendship"],
    correct: "2",
    exptext: "✅ Schadenfreude is joy at another's misfortune, so gloating is the closest word. 📌 Schaden means harm and Freude means joy. ❌ Sympathy is wrong because it means sharing sorrow."
  },
  214: {
    questext: "Select the most appropriate option to fill in the blank.\nWatching his boastful rival fail, Ravi felt a secret ______.",
    options: ["regret", "sympathy", "compassion", "schadenfreude"],
    correct: "4",
    exptext: "✅ Schadenfreude fits because Ravi was glad to see his rival fail. 📌 Harm plus joy. ❌ Sympathy is wrong because Ravi was pleased, not sorry."
  },
  215: {
    type: "concept", icon: "😶", accent: "#26c5c4", pauseTimer: true,
    title: "Apathy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,196;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A lack of interest, enthusiasm or concern about anything.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">उदासीनता</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">indifference</li><li class="vc-chip">unconcern</li><li class="vc-chip">listlessness</li><li class="vc-chip">detachment</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">enthusiasm</li><li class="vc-chip">concern</li><li class="vc-chip">interest</li><li class="vc-chip">zeal</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Voter <b>apathy</b> was high, and fewer than half the people came to vote. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">His <b>apathy</b> toward studies worried his parents more than his low marks.</p></li><li><span class="vc-n">3</span><p class="vc-s">The poem blames the city's <b>apathy</b> for the suffering of its poorest children.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/72.png" alt="Illustration of the word apathy: A man on a sofa staring blankly at a wall, ignoring a ringing phone and scattered books, dull grey room." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Voter <mark class="vc-hl">apathy</mark> was high, and fewer than half the people came to vote.</p></div></div>
      </div></div>
    `
  },
  216: {
    questext: "Select the most appropriate antonym of the given word.\nApathy",
    options: ["Enthusiasm", "Indifference", "Unconcern", "Detachment"],
    correct: "1",
    exptext: "✅ Apathy means lack of interest, so enthusiasm, which means strong interest, is the opposite. 📌 Apathy has no feeling. ❌ Indifference is wrong because it is a synonym."
  },
  217: {
    questext: "Select the most appropriate option to fill in the blank.\nThe voters showed such ______ that fewer than one in five came to cast their votes.",
    options: ["interest", "enthusiasm", "apathy", "zeal"],
    correct: "3",
    exptext: "✅ Apathy fits because few voters cared enough to vote. 📌 Apathy = no pathos, no feeling. ❌ Enthusiasm is wrong because it would bring many voters."
  },
  218: {
    type: "concept", icon: "🎓", accent: "#d8a631", pauseTimer: true,
    title: "Protégé",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,166,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A young person who is guided and helped by an experienced person.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">शिष्य, संरक्षित</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">pupil</li><li class="vc-chip">disciple</li><li class="vc-chip">ward</li><li class="vc-chip">student</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">mentor</li><li class="vc-chip">patron</li><li class="vc-chip">guardian</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The famous singer taught his <b>protégé</b> how to breathe and perform on stage. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">As the professor's <b>protégé</b>, she received help with her first research paper.</p></li><li><span class="vc-n">3</span><p class="vc-s">The old painter's <b>protégé</b> went on to win the highest prize in the country.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/73.png" alt="Illustration of the word protégé: An old painter in a studio guiding a young woman's hand on a brush at an easel, soft window light, proud s" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The famous singer taught his <mark class="vc-hl">protégé</mark> how to breathe and perform on stage.</p></div></div>
      </div></div>
    `
  },
  219: {
    questext: "Select the most appropriate synonym of the given word.\nProtégé",
    options: ["Mentor", "Pupil", "Prodigy", "Rival"],
    correct: "2",
    exptext: "✅ A protégé is a young person guided by an expert, so pupil is the closest word. 📌 Protégé means protected. ❌ Mentor is wrong because a mentor is the guide, not the learner."
  },
  220: {
    questext: "Select the most appropriate option to fill in the blank.\nThe famous violinist took a poor village boy as his ______ and trained him for free.",
    options: ["patron", "mentor", "rival", "protégé"],
    correct: "4",
    exptext: "✅ Protégé fits because the boy is guided and trained by the violinist. 📌 Protégé = protected learner. ❌ Patron is wrong because a patron supports with money, not as a learner."
  },
  221: {
    type: "concept", icon: "🙇", accent: "#864bdd", pauseTimer: true,
    title: "Sycophant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:134,75,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who flatters powerful people to gain favour.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">चापलूस</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">flatterer</li><li class="vc-chip">toady</li><li class="vc-chip">yes-man</li><li class="vc-chip">bootlicker</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">critic</li><li class="vc-chip">rebel</li><li class="vc-chip">truth-teller</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The minister was surrounded by <b>sycophants</b> who praised every foolish idea. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>sycophant</b> laughs loudly at the boss's jokes, even when they are not funny.</p></li><li><span class="vc-n">3</span><p class="vc-s">In the play, a clever <b>sycophant</b> whispers sweet lies in the king's ear.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/74.png" alt="Illustration of the word sycophant: A man bowing and smiling excessively to a boss at a desk while holding a cup of tea, other staff rolling" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The minister was surrounded by <mark class="vc-hl">sycophants</mark> who praised every foolish idea.</p></div></div>
      </div></div>
    `
  },
  222: {
    questext: "Select the most appropriate antonym of the given word.\nSycophant",
    options: ["Critic", "Flatterer", "Toady", "Yes-man"],
    correct: "1",
    exptext: "✅ A sycophant flatters the powerful, so a critic, who points out faults, is the opposite. 📌 Sycophant says yes; critic says no. ❌ Flatterer is wrong because it is a synonym."
  },
  223: {
    questext: "Select the most appropriate option to fill in the blank.\nThe minister kept a ______ who praised every foolish idea to win his favour.",
    options: ["rival", "critic", "sycophant", "rebel"],
    correct: "3",
    exptext: "✅ Sycophant fits because the person flattered the minister to gain favour. 📌 Sycophant = flattering fawner. ❌ Critic is wrong because a critic would point out the foolish ideas."
  },
  224: {
    type: "concept", icon: "💝", accent: "#26c538", pauseTimer: true,
    title: "Altruist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,56;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who cares about others and helps them without expecting anything.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">निःस्वार्थ, परोपकारी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">humanitarian</li><li class="vc-chip">benefactor</li><li class="vc-chip">do-gooder</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">egoist</li><li class="vc-chip">miser</li><li class="vc-chip">narcissist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>altruist</b> gave his entire prize money to a school for poor children.</p></li><li><span class="vc-n">2</span><p class="vc-s">Being an <b>altruist</b>, she worked long nights in the hospital without asking for any reward. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The poem praises the <b>altruist</b> who lights lamps for strangers and asks for no thanks.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/75.png" alt="Illustration of the word altruist: A woman in a hospital corridor handing a warm blanket to a tired elderly patient, other patients resting," loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Being an <mark class="vc-hl">altruist</mark>, she worked long nights in the hospital without asking for any reward.</p></div></div>
      </div></div>
    `
  },
  225: {
    questext: "Select the most appropriate synonym of the given word.\nAltruist",
    options: ["Egoist", "Humanitarian", "Optimist", "Miser"],
    correct: "2",
    exptext: "✅ An altruist cares about others, so humanitarian is the closest word. 📌 Alter means other. ❌ Egoist is wrong because an egoist thinks only of self."
  },
  226: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ gave away his lunch to a hungry child without expecting a word of thanks.",
    options: ["critic", "egoist", "miser", "altruist"],
    correct: "4",
    exptext: "✅ Altruist fits because he helped a child without expecting anything. 📌 Altruist = other-first. ❌ Egoist is wrong because an egoist keeps things for himself."
  },
  227: {
    type: "concept", icon: "🤝", accent: "#d8314f", pauseTimer: true,
    title: "Samaritan",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,79;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A kind person who helps strangers in trouble.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सहायक, दयालु</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">helper</li><li class="vc-chip">good neighbour</li><li class="vc-chip">benefactor</li><li class="vc-chip">rescuer</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">bully</li><li class="vc-chip">tormentor</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A good <b>Samaritan</b> stopped his car and took the injured man to the hospital. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Strangers called her a <b>Samaritan</b> after she gave her umbrella to a soaked traveller.</p></li><li><span class="vc-n">3</span><p class="vc-s">The story of the Good <b>Samaritan</b> teaches us to help anyone in need.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/76.png" alt="Illustration of the word samaritan: A man stopping his car on a rainy road and helping an injured cyclist toward the back seat, hazard light" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A good <mark class="vc-hl">Samaritan</mark> stopped his car and took the injured man to the hospital.</p></div></div>
      </div></div>
    `
  },
  228: {
    questext: "Select the most appropriate antonym of the given word.\nSamaritan",
    options: ["Bully", "Helper", "Rescuer", "Benefactor"],
    correct: "1",
    exptext: "✅ A Samaritan helps strangers in trouble, so a bully, who harms others, is the opposite. 📌 Good Samaritan helps. ❌ Helper is wrong because it is a synonym."
  },
  229: {
    questext: "Select the most appropriate option to fill in the blank.\nA kind ______ stopped his car and drove the injured stranger to the hospital.",
    options: ["Thief", "Bully", "Samaritan", "Tormentor"],
    correct: "3",
    exptext: "✅ Samaritan fits because the person helped an injured stranger. 📌 Good Samaritan. ❌ Bully is wrong because a bully harms people."
  },
  230: {
    type: "concept", icon: "🎁", accent: "#4b8fdd", pauseTimer: true,
    title: "Philanthropist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,143,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A rich person who gives money and time to help others.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दानवीर, परोपकारी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">benefactor</li><li class="vc-chip">donor</li><li class="vc-chip">patron</li><li class="vc-chip">humanitarian</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">miser</li><li class="vc-chip">misanthrope</li><li class="vc-chip">skinflint</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>philanthropist</b> donated a hundred crore rupees to build a free hospital.</p></li><li><span class="vc-n">2</span><p class="vc-s">Every year, the <b>philanthropist</b> pays the school fees of fifty poor children.</p></li><li><span class="vc-n">3</span><p class="vc-s">The newspaper called the retired businessman a quiet <b>philanthropist</b> who never sought praise. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/77.png" alt="Illustration of the word philanthropist: A well-dressed elderly man at a ribbon-cutting outside a new hospital building, smiling, children a" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The newspaper called the retired businessman a quiet <mark class="vc-hl">philanthropist</mark> who never sought praise.</p></div></div>
      </div></div>
    `
  },
  231: {
    questext: "Select the most appropriate synonym of the given word.\nPhilanthropist",
    options: ["Miser", "Benefactor", "Philatelist", "Philosopher"],
    correct: "2",
    exptext: "✅ A philanthropist gives help and money, so benefactor is the closest word. 📌 Phil means love and anthropos means human. ❌ Philatelist is wrong because it means a stamp collector."
  },
  232: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ donated half of his wealth to build schools and hospitals for the poor.",
    options: ["spendthrift", "miser", "misanthrope", "philanthropist"],
    correct: "4",
    exptext: "✅ Philanthropist fits because the person gave wealth to help others. 📌 Phil = love of people. ❌ Miser is wrong because a miser hoards wealth."
  },
  233: {
    type: "concept", icon: "🦹", accent: "#9fc526", pauseTimer: true,
    title: "Burglary",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:159,197,38;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The crime of breaking into a house or building to steal things.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सेंधमारी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">housebreaking</li><li class="vc-chip">break-in</li><li class="vc-chip">theft</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Police are investigating a <b>burglary</b> at the jewellery shop that happened last night. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A strong lock and a loud alarm can reduce the risk of <b>burglary</b>.</p></li><li><span class="vc-n">3</span><p class="vc-s">The thief was sentenced to three years in jail for <b>burglary</b> of three houses.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/78.png" alt="Illustration of the word burglary: A shadowy masked thief climbing through the window of a dark house with a torch beam, moonlight, a sleepi" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Police are investigating a <mark class="vc-hl">burglary</mark> at the jewellery shop that happened last night.</p></div></div>
      </div></div>
    `
  },
  234: {
    questext: "Select the most appropriate synonym of the given word.\nBurglary",
    options: ["Housebreaking", "Forgery", "Bribery", "Kidnapping"],
    correct: "1",
    exptext: "✅ Burglary is breaking into a house to steal, so housebreaking is the closest word. 📌 Burglar breaks in. ❌ Forgery is wrong because it means making false documents."
  },
  235: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nThe crime of breaking into a house or building to steal things",
    options: ["Forgery", "Pilferage", "Burglary", "Embezzlement"],
    correct: "3",
    exptext: "✅ Burglary is breaking into a building to steal. 📌 Burgle means break in. ❌ Pilferage is wrong because it is stealing small things, usually without breaking in."
  },
  236: {
    type: "concept", icon: "🧺", accent: "#cf31d8", pauseTimer: true,
    title: "Pilferage",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:207,49,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The stealing of small amounts or small things, usually over time.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">छोटी चोरी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">petty theft</li><li class="vc-chip">thieving</li><li class="vc-chip">stealing</li><li class="vc-chip">larceny</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">honesty</li><li class="vc-chip">integrity</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The company lost lakhs of rupees to <b>pilferage</b> by workers in the godown.</p></li><li><span class="vc-n">2</span><p class="vc-s">Cameras were fitted in the warehouse to stop daily <b>pilferage</b> of goods. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Small acts of <b>pilferage</b>, like taking pens from the office, still count as dishonesty.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/79.png" alt="Illustration of the word pilferage: A warehouse worker quietly slipping a small packet into his bag between shelves while a ceiling camera w" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Cameras were fitted in the warehouse to stop daily <mark class="vc-hl">pilferage</mark> of goods.</p></div></div>
      </div></div>
    `
  },
  237: {
    questext: "Select the most appropriate synonym of the given word.\nPilferage",
    options: ["Honesty", "Petty theft", "Pilgrimage", "Bribery"],
    correct: "2",
    exptext: "✅ Pilferage is stealing small things, so petty theft is the closest phrase. 📌 Pilfer means steal bit by bit. ❌ Honesty is wrong because it is the opposite."
  },
  238: {
    questext: "Select the most appropriate option to fill in the blank.\nThe shop owner lost a lot of money through the ______ of small items by his staff over the year.",
    options: ["bribery", "burglary", "forgery", "pilferage"],
    correct: "4",
    exptext: "✅ Pilferage fits because small items were stolen bit by bit. 📌 Pilferage = petty stealing. ❌ Burglary is wrong because it means breaking in to steal."
  },
  239: {
    type: "concept", icon: "🛍️", accent: "#4bddab", pauseTimer: true,
    title: "Window-shopping",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,171;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Looking at goods in shop windows without any plan to buy them.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">बिना खरीदे देखना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">browsing</li><li class="vc-chip">perusing</li><li class="vc-chip">looking around</li><li class="vc-chip">shop-gazing</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">buying</li><li class="vc-chip">purchasing</li><li class="vc-chip">shopping spree</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">On Sunday evenings, we enjoy <b>window-shopping</b> along the lit-up market street. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">With only a hundred rupees in his pocket, Ravi settled for <b>window-shopping</b> at the mall.</p></li><li><span class="vc-n">3</span><p class="vc-s">The novel's heroine spends her lonely afternoons <b>window-shopping</b> along the grand old avenue.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_2/80.png" alt="Illustration of the word window-shopping: A young couple strolling past glowing shop windows on an evening market street, pointing at dresse" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">On Sunday evenings, we enjoy <mark class="vc-hl">window-shopping</mark> along the lit-up market street.</p></div></div>
      </div></div>
    `
  },
  240: {
    questext: "Select the most appropriate antonym of the given word.\nWindow-shopping",
    options: ["Buying", "Browsing", "Perusing", "Looking around"],
    correct: "1",
    exptext: "✅ Window-shopping means looking without buying, so buying is the opposite. 📌 Windows show, wallets stay shut. ❌ Browsing is wrong because it is a synonym."
  },
  241: {
    questext: "Select the most appropriate option to fill in the blank.\nWe spent the evening ______ along the busy market street, admiring the glowing displays but buying nothing.",
    options: ["selling", "purchasing", "window-shopping", "bargaining"],
    correct: "3",
    exptext: "✅ Window-shopping fits because we only looked at the displays. 📌 Look, do not buy. ❌ Purchasing is wrong because we bought nothing."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/English_Comprehension/Vocabulary/Set_2/thumbnail.png": { t: "thumb", accent: "#0ea5e9", objects: "a classic open dictionary, a fountain pen, a small magnifying glass and a few wooden letter tiles" },
  "images/English_Comprehension/Vocabulary/Set_2/1.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"cynic\" at a glance, without reading anything: An elderly man on a park bench rolling his eyes at a smiling politician's poster, folded newspaper in hand, grey mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/2.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"censorious\" at a glance, without reading anything: An aunt at a dinner table frowning and pointing a finger at a dish while the cook stands nervously beside her. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/3.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"fatalist\" at a glance, without reading anything: A farmer sitting calmly at his hut door, shrugging and sipping tea while dark storm clouds gather over wheat fields. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/4.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"epicure\" at a glance, without reading anything: A well-dressed man in an Italian restaurant savouring a plate of truffle pasta with closed eyes, wine glass nearby, warm candlelight. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/5.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"gourmet\" at a glance, without reading anything: A food critic at a table lifting a spoon of soup with closed eyes while a chef watches nervously from the kitchen door. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/6.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"misanthrope\" at a glance, without reading anything: A lone man in a hilltop cabin turning his back on a waving village crowd below, closing the curtains, gloomy mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/7.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"misologist\" at a glance, without reading anything: A man in a college hall angrily pushing away a stack of books and charts, covering his ears while a debate team argues. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/8.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"enigma\" at a glance, without reading anything: Classmates in a bright classroom looking curiously and puzzled at a quiet new boy sitting by the window with a closed notebook. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/9.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"enchant\" at a glance, without reading anything: A fairy-tale witch in a forest waving a glowing wand over a prince who stares dreamily, golden sparkles in the air. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/10.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"incredible\" at a glance, without reading anything: Cheering football fans leaping from the stands as their team scores a last-minute goal under floodlights, joy and disbelief on faces. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/11.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"indelible\" at a glance, without reading anything: A voter in a polling booth having a dark ink mark applied to a finger by an official, ballot box behind. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/12.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"inevitable\" at a glance, without reading anything: A man at an office desk beside a pile of unfinished files, a manager at the door holding an envelope, grim mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/13.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"triskaidekaphobia\" at a glance, without reading anything: A worried hotel owner pointing at a model of a skyscraper, telling a puzzled architect to leave one floor out; calm office light. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/14.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"aichmophobia\" at a glance, without reading anything: A small girl hiding behind her mother's saree in a bright room, staring wide-eyed at a sewing needle on a table. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/15.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"pyrophobia\" at a glance, without reading anything: A boy standing far from a roaring bonfire at a village festival, eyes wide with fear, other children laughing around the flames. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/16.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"hexakosioihexekontahexaphobia\" at a glance, without reading anything: Students laughing and gasping as a teacher holds up a thick dictionary, one boy resting his head on the desk in despair, warm classroom. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/17.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"extravagant\" at a glance, without reading anything: A woman leaving a luxury store with arms full of shopping bags, a worried expression, her wallet nearly empty in her hand. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/18.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"thrifty\" at a glance, without reading anything: An elderly woman in a small kitchen washing and reusing glass jars, neat shelves of jars behind her, gentle smile. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/19.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"prodigal\" at a glance, without reading anything: A young man at a lavish party throwing coins and notes into the air among laughing guests, his empty trunk in the corner. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/20.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"spendthrift\" at a glance, without reading anything: A young man at a phone shop counter with a stack of boxed phones, an empty wallet open in his hand, a cashier smiling. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/21.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"ephemeral\" at a glance, without reading anything: Close-up of dew drops on a green leaf at sunrise, sunlight turning them golden as they begin to evaporate, calm mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/22.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"nascent\" at a glance, without reading anything: Three young founders working around a small table in a tiny rented room with laptops and sketches on the wall, hopeful morning light. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/23.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"incessant\" at a glance, without reading anything: A teacher turning from the board toward a chatty student who keeps whispering to his neighbour, other students looking irritated. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/24.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"intransient\" at a glance, without reading anything: An ancient stone temple on a hill standing calm beneath a stormy sky, carved pillars, a lone traveller looking up at it. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/25.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"mendacious\" at a glance, without reading anything: A nervous witness in a courtroom with fingers crossed behind his back while a stern judge looks down at him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/26.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"candid\" at a glance, without reading anything: A cricket coach speaking directly to a team of players on the field at dusk, hands on hips, players listening with serious faces. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/27.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"immigrant\" at a glance, without reading anything: A young woman with a suitcase stepping out of an airport into a busy foreign city, looking up with hope and nervousness. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/28.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"emigrant\" at a glance, without reading anything: A man on a ship's deck holding a bag, looking back at a fading green coastline at sunset, sad but hopeful. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/29.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"cynosure\" at a glance, without reading anything: A bride in red entering a decorated wedding hall, all guests turning toward her with admiring faces, warm festive lights. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/30.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"paradigm\" at a glance, without reading anything: A girl studying at home on a laptop in a cosy room, a teacher smiling on the screen, notebooks around her, evening lamp. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/31.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"prototype\" at a glance, without reading anything: Engineers in a workshop watching a handmade electric scooter prototype roll along a test track, one smiling with a clipboard. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/32.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"prolixity\" at a glance, without reading anything: A lawyer in a courtroom still talking while the stern judge checks a wristwatch and listeners yawn, papers piled high on his desk. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/33.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"taciturnity\" at a glance, without reading anything: An old sailor sitting silently on a harbour bench with a pipe, gazing at the sea while a curious boy waits for a story. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/34.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"loquacious\" at a glance, without reading anything: An uncle at a family gathering talking cheerfully with waving hands while relatives politely nod and a child falls asleep. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/35.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"garrulous\" at a glance, without reading anything: A passenger on an Indian train chatting nonstop to a tired traveller by the window, a cup of tea in his hand. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/36.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"laconic\" at a glance, without reading anything: A ship captain on deck pointing ahead with one gesture while sailors rush to follow, calm confident face, stormy sky. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/37.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"reticence\" at a glance, without reading anything: A woman at an office table smiling politely with lips closed while colleagues lean forward with curious faces. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/38.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"brevity\" at a glance, without reading anything: A short meeting in a modern office with people standing around a table, a manager smiling at a wall clock, everyone leaving. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/39.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"abbreviate\" at a glance, without reading anything: A secretary at a desk cutting a long paper strip into a short one with scissors, neat office, a relieved manager smiling. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/40.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"jubilant\" at a glance, without reading anything: A girl holding up her phone and jumping with raised arms in a college corridor, friends hugging her, bright joyful mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/41.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"lugubrious\" at a glance, without reading anything: A clown with drooping shoulders and a long sad face walking alone in a circus ring under one spotlight, empty seats around. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/42.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"maudlin\" at a glance, without reading anything: A middle-aged man at a party table, teary-eyed, holding an old photograph while friends look slightly embarrassed, warm lights. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/43.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"sardonic\" at a glance, without reading anything: A man in an office meeting with a thin bitter half-smile and raised eyebrow while the manager presents proudly at a screen. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/44.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"aphonia\" at a glance, without reading anything: A doctor in a clinic examining a man's throat with a small light while the man gently holds his throat, unable to speak. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/45.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"aphasia\" at a glance, without reading anything: A speech therapist in a bright clinic holding up a picture card of an apple to an elderly patient who tries to speak, encouraging smile. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/46.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"insomnia\" at a glance, without reading anything: A young man lying awake in bed at night with wide-open eyes, moonlight through the window, restless crumpled pillow. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/47.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"narcolepsy\" at a glance, without reading anything: A man dozing off suddenly at a café table mid-conversation with a coffee cup in hand, his friend looking amused. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/48.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"somnolence\" at a glance, without reading anything: Students in a warm classroom after lunch with heavy eyelids and nodding heads, a ceiling fan turning, the teacher noticing. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/49.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"somnambulist\" at a glance, without reading anything: A man in pyjamas walking with arms stretched out and closed eyes through a moonlit garden, a startled cat nearby. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/50.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"stolid\" at a glance, without reading anything: A palace guard standing perfectly still with a blank calm face while tourists try to make him laugh around him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/51.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"obtuse\" at a glance, without reading anything: A teacher explaining at a board to a puzzled student scratching his head while other students understand, patient classroom mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/52.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"perspicacious\" at a glance, without reading anything: A detective crouching in a hallway pointing at a muddy shoe print near a door with a magnifying glass, others puzzled behind him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/53.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"perspicuous\" at a glance, without reading anything: A teacher at a board with a simple diagram, students nodding with understanding smiles, bright classroom. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/54.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"proprietor\" at a glance, without reading anything: A friendly shopkeeper behind the counter of a small corner shop greeting a customer, shelves of goods behind, morning light. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/55.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"indefatigable\" at a glance, without reading anything: A nurse in a hospital ward walking briskly with a tray at night, smiling and energetic, tired colleagues resting behind her. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/56.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"invincible\" at a glance, without reading anything: A champion wrestler in a stadium raising a trophy with a confident smile, defeated opponents on the mat, cheering crowd. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/57.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"infallible\" at a glance, without reading anything: A cricket captain on the field making a perfect catch while the coach nods approvingly from the boundary, bright afternoon. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/58.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"quixotic\" at a glance, without reading anything: An old knight in rusty armour on a thin horse charging at a tall windmill, a plump companion on a donkey watching worried. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/59.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"dogmatic\" at a glance, without reading anything: A professor in a lecture hall pointing sternly at his notes with folded arms while a student with a raised hand is ignored. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/60.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"pseudonym\" at a glance, without reading anything: A person at a laptop in a dim room wearing a plain eye mask, typing, a lamp casting golden light, mysterious mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/61.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"patronym\" at a glance, without reading anything: A family around a table with an old family-tree scroll, an elder pointing to a figure for a young boy, warm indoor light. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/62.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"acronym\" at a glance, without reading anything: A teacher showing excited students a space rocket model on a table, mission-control photos on the wall, bright classroom. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/63.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"homonym\" at a glance, without reading anything: A cricketer holding a bat while a small flying bat swoops beside him in a park at dusk, playful mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/64.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"mannequin\" at a glance, without reading anything: A clothing store window with a mannequin in a bright red saree, a girl outside looking at it admiringly, evening street lights. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/65.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"sculptor\" at a glance, without reading anything: A sculptor in a studio carving a marble horse with a chisel and mallet, marble dust glowing in sunbeams. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/66.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"chancery\" at a glance, without reading anything: A formal embassy office with an ambassador signing documents at a wooden desk, flags in the corner, a clerk waiting. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/67.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"peripatetic\" at a glance, without reading anything: A poet with a flute and a small bag walking along a hill path at sunrise, misty valley below, free spirit. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/68.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"wayfarer\" at a glance, without reading anything: A weary traveller with a stick and bundle resting under a large banyan tree beside a dusty road, villagers offering water. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/69.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"sedentary\" at a glance, without reading anything: A man sitting for long hours at an office desk in front of a computer with a hunched back, an exercise mat unused behind him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/70.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"antipathy\" at a glance, without reading anything: Two neighbours standing on either side of a garden fence with folded arms, glaring at each other, flowers and a half-broken fence. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/71.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"schadenfreude\" at a glance, without reading anything: A man in a sports crowd smirking quietly while his rival on the court holds his head after a missed basket, tense hall. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/72.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"apathy\" at a glance, without reading anything: A man on a sofa staring blankly at a wall, ignoring a ringing phone and scattered books, dull grey room. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/73.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"protégé\" at a glance, without reading anything: An old painter in a studio guiding a young woman's hand on a brush at an easel, soft window light, proud smile. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/74.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"sycophant\" at a glance, without reading anything: A man bowing and smiling excessively to a boss at a desk while holding a cup of tea, other staff rolling their eyes behind him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/75.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"altruist\" at a glance, without reading anything: A woman in a hospital corridor handing a warm blanket to a tired elderly patient, other patients resting, soft light. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/76.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"samaritan\" at a glance, without reading anything: A man stopping his car on a rainy road and helping an injured cyclist toward the back seat, hazard lights glowing. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/77.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"philanthropist\" at a glance, without reading anything: A well-dressed elderly man at a ribbon-cutting outside a new hospital building, smiling, children and nurses applauding. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/78.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"burglary\" at a glance, without reading anything: A shadowy masked thief climbing through the window of a dark house with a torch beam, moonlight, a sleeping dog nearby. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/79.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"pilferage\" at a glance, without reading anything: A warehouse worker quietly slipping a small packet into his bag between shelves while a ceiling camera watches, dim light. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_2/80.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"window-shopping\" at a glance, without reading anything: A young couple strolling past glowing shop windows on an evening market street, pointing at dresses and watches behind the glass, relaxed mood, no shopping bags. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly."
});

/* CHANGE LOG
   - 'Hexakosiohexekontahexaphobia' corrected to the standard spelling 'Hexakosioihexekontahexaphobia'.
   - Spelling fixes: Jubiliant to Jubilant, Proprieter to Proprietor; Taciturnity, Patronym and Protégé spelt correctly.
   - Duplicates merged: Perspicacious and the misspelt Perpicacious are one word; Perspicuous is kept as a separate word.
   - 'Intransient' kept as given (meaning not temporary). Please verify that Intransigent (stubborn) was not intended.
   - Window-shopping added as word 80 (bonus idiom).
   - Format update: every word now has exactly two questions (a synonym or antonym question and a second question of another type); the earlier single mixed-type questions were rewritten.
*/