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

/* Field: English_Comprehension · Subject: Vocabulary · Chapter: Set_3 · 80 concept pages (+ overview) · 160 questions */

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
      altTitles: ["SSC CGL Vocabulary Set 3: 80 Words with Pictures, Hindi Meaning, Synonyms and Antonyms", "Learn 80 Exam Vocabulary Words Fast | Orthodox, Schism, Clemency, Plutocracy"],
      description: "Learn 80 important English words for SSC CGL, Banking, Railways and Defence exams. Every word comes with its meaning, Hindi meaning, synonyms, antonyms, three example sentences and one picture clue, followed by two exam-style questions.\n\n📌 IN THIS CLASS\n✅ Words on tradition, medicines, boredom, government and speech\n✅ Meaning and Hindi meaning of every word\n✅ Synonyms and antonyms\n✅ Two exam questions for every word\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Vocabulary #English",
      tags: ["SSC CGL vocabulary", "English vocabulary", "vocabulary set 3", "Hindi meaning", "synonyms and antonyms", "maverick meaning", "iconoclast meaning", "ennui meaning", "palliative meaning", "schism meaning", "heresy meaning", "sedative meaning", "bohemian meaning", "orthodox meaning", "vocabulary for SSC", "vocabulary for UPSC", "vocabulary for banking", "important vocabulary", "word meaning in Hindi", "MCQ practice", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "Vocab Set 3 Vocabulary class"],
      hashtags: ["SSCCGL", "Vocabulary", "English"],
      thumbText: "80 POWER WORDS",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📚 Vocabulary Set 3 is live: 80 exam words with pictures, Hindi meaning and two questions for every word. Tell me your score 🎯",
      chapters: "00:00 Class overview\n00:00 Semiotic\n00:00 Immaculate\n00:00 Obsolete\n00:00 Martinet\n00:00 Maverick\n00:00 Customary\n00:00 Orthodox\n00:00 Iconoclast\n00:00 Conformist\n00:00 Bohemian\n00:00 Conform\n00:00 Placebo\n00:00 Palliative\n00:00 Anodyne\n00:00 Desuetude\n00:00 Hiatus\n00:00 Oblivion\n00:00 Interregnum\n00:00 Elegy\n00:00 Encomium\n00:00 Soliloquy\n00:00 Schism\n00:00 Apostasy\n00:00 Heresy\n00:00 Bigot\n00:00 Heretic\n00:00 Analgesic\n00:00 Sedative\n00:00 Tranquilizer\n00:00 Ennui\n00:00 Torpor\n00:00 Tedium\n00:00 Weary\n00:00 Wary\n00:00 Remission\n00:00 Reprieve\n00:00 Amnesty\n00:00 Perfidy\n00:00 Polymath\n00:00 Prodigy\n00:00 Dissident\n00:00 Tale\n00:00 Antediluvian\n00:00 Maxim\n00:00 Pundit\n00:00 Meddler\n00:00 Interloper\n00:00 Epicure\n00:00 Sybarite\n00:00 Hedonist\n00:00 Reveler\n00:00 Glutton\n00:00 Aesthete\n00:00 Connoisseur\n00:00 Abyss\n00:00 Crevasse\n00:00 Gorge\n00:00 Censure\n00:00 Denunciation\n00:00 Indictment\n00:00 Abeyance\n00:00 Dormancy\n00:00 Renegade\n00:00 Anthropology\n00:00 Allegory\n00:00 Clemency\n00:00 Parole\n00:00 Oligarchy\n00:00 Theocracy\n00:00 Autocracy\n00:00 Cipher\n00:00 Epistle\n00:00 Diatribe\n00:00 Plutocracy\n00:00 Meritocracy\n00:00 Aristocracy\n00:00 Rhetoric\n00:00 Sycophant\n00:00 Obdurate\n00:00 Ephemeral",
      playlist: "SSC CGL English Vocabulary"
    },
    html: `
      <p class="cp-lead">A <u>simple, picture-based vocabulary class</u> with 80 exam words on symbols, tradition, medicines, boredom, punishment, governments and speech. For every word you will see the meaning, the Hindi meaning, synonyms, antonyms, three example sentences and one picture that makes the word easy to remember.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>80</b><span>Words</span></div>
        <div class="cp-stat"><b>160</b><span>Questions</span></div>
        <div class="cp-stat"><b>~200 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Words 1 to 5</b><br>Semiotic, Immaculate, Obsolete, Martinet, Maverick. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 6 to 10</b><br>Customary, Orthodox, Iconoclast, Conformist, Bohemian. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 11 to 15</b><br>Conform, Placebo, Palliative, Anodyne, Desuetude. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 16 to 20</b><br>Hiatus, Oblivion, Interregnum, Elegy, Encomium. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 21 to 25</b><br>Soliloquy, Schism, Apostasy, Heresy, Bigot. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 26 to 30</b><br>Heretic, Analgesic, Sedative, Tranquilizer, Ennui. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 31 to 35</b><br>Torpor, Tedium, Weary, Wary, Remission. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 36 to 40</b><br>Reprieve, Amnesty, Perfidy, Polymath, Prodigy. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 41 to 45</b><br>Dissident, Tale, Antediluvian, Maxim, Pundit. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 46 to 50</b><br>Meddler, Interloper, Epicure, Sybarite, Hedonist. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 51 to 55</b><br>Reveler, Glutton, Aesthete, Connoisseur, Abyss. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 56 to 60</b><br>Crevasse, Gorge, Censure, Denunciation, Indictment. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 61 to 65</b><br>Abeyance, Dormancy, Renegade, Anthropology, Allegory. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 66 to 70</b><br>Clemency, Parole, Oligarchy, Theocracy, Autocracy. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 71 to 75</b><br>Cipher, Epistle, Diatribe, Plutocracy, Meritocracy. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
        <li><b>Words 76 to 80</b><br>Aristocracy, Rhetoric, Sycophant, Obdurate, Ephemeral. For every word you learn the meaning, the Hindi meaning, synonyms, antonyms and three example sentences with a picture, and then you solve two exam questions.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> synonym, antonym and fill-in-the-blank questions carry a steady number of marks in every Staff Selection Commission Combined Graduate Level paper, so each word you learn well is a mark you can win.</div>
    `
  },
  2: {
    type: "concept", icon: "🔣", accent: "#3162d8", pauseTimer: true,
    title: "Semiotic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,98,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Relating to signs and symbols and what they mean.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">प्रतीकात्मक, संकेत-संबंधी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">symbolic</li><li class="vc-chip">emblematic</li><li class="vc-chip">representative</li><li class="vc-chip">figurative</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">literal</li><li class="vc-chip">plain</li><li class="vc-chip">explicit</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A <b>semiotic</b> study of road signs shows how colours quickly tell drivers what to do. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The professor explained the <b>semiotic</b> meaning of the dove in the painting.</p></li><li><span class="vc-n">3</span><p class="vc-s">Every flag carries a <b>semiotic</b> message about the history and pride of a nation.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/1.png" alt="Illustration of the word semiotic: a driver at a crossroads looking at colourful traffic signs with arrows and pictograms, thoughtful face, " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A <mark class="vc-hl">semiotic</mark> study of road signs shows how colours quickly tell drivers what to do.</p></div></div>
      </div></div>
    `
  },
  3: {
    questext: "Select the most appropriate synonym of the given word.\nSemiotic",
    options: ["Literal", "Symbolic", "Seismic", "Systematic"],
    correct: "2",
    exptext: "✅ Semiotic relates to signs and symbols, so symbolic is the closest word. 📌 Semiotic = sign language of ideas. ❌ Literal is wrong because it means exactly what the words say, with no symbol."
  },
  4: {
    questext: "Select the most appropriate option to fill in the blank.\nThe dove in the painting is ______ because it stands for the idea of peace and not just a bird.",
    options: ["explicit", "literal", "plain", "semiotic"],
    correct: "4",
    exptext: "✅ Semiotic fits because the dove works as a symbol of peace. 📌 Semiotic = about signs. ❌ Literal is wrong because a literal dove would be only a bird."
  },
  5: {
    type: "concept", icon: "✨", accent: "#a0dd4b", pauseTimer: true,
    title: "Immaculate",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:160,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Perfectly clean, neat and without any fault.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">बेदाग, निष्कलंक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">spotless</li><li class="vc-chip">pristine</li><li class="vc-chip">flawless</li><li class="vc-chip">pure</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">dirty</li><li class="vc-chip">stained</li><li class="vc-chip">flawed</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The hotel room was <b>immaculate</b>, with fresh sheets and not a speck of dust. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The minister has an <b>immaculate</b> record, with no charge of corruption against him.</p></li><li><span class="vc-n">3</span><p class="vc-s">She wore an <b>immaculate</b> white gown that shone under the chandelier lights.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/2.png" alt="Illustration of the word immaculate: a pleased guest entering a bright hotel room with a perfectly made bed, shining floor and fresh flowers" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The hotel room was <mark class="vc-hl">immaculate</mark>, with fresh sheets and not a speck of dust.</p></div></div>
      </div></div>
    `
  },
  6: {
    questext: "Select the most appropriate antonym of the given word.\nImmaculate",
    options: ["Stained", "Spotless", "Pristine", "Flawless"],
    correct: "1",
    exptext: "✅ Immaculate means perfectly clean, so stained, which means marked with dirt, is the opposite. 📌 Im- means not and macula means spot. ❌ Spotless is wrong because it is a synonym."
  },
  7: {
    questext: "Select the most appropriate option to fill in the blank.\nThe maid kept the hotel room ______, and not even a speck of dust could be found.",
    options: ["messy", "stained", "immaculate", "shabby"],
    correct: "3",
    exptext: "✅ Immaculate fits because the room had no speck of dust. 📌 Immaculate = no spot. ❌ Messy is wrong because a messy room would not be free of dust."
  },
  8: {
    type: "concept", icon: "📼", accent: "#c526b1", pauseTimer: true,
    title: "Obsolete",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,177;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">No longer used because something newer and better exists.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अप्रचलित, पुराना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">outdated</li><li class="vc-chip">antiquated</li><li class="vc-chip">archaic</li><li class="vc-chip">outmoded</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">modern</li><li class="vc-chip">current</li><li class="vc-chip">latest</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Floppy disks are now <b>obsolete</b>, as everyone saves files on pen drives or clouds. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The company shut down its <b>obsolete</b> machines and installed new computers.</p></li><li><span class="vc-n">3</span><p class="vc-s">Many words in old poetry have become <b>obsolete</b> and appear only in dictionaries.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/3.png" alt="Illustration of the word obsolete: a puzzled boy holding an old floppy disk beside a modern laptop and a small pen drive on a desk." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Floppy disks are now <mark class="vc-hl">obsolete</mark>, as everyone saves files on pen drives or clouds.</p></div></div>
      </div></div>
    `
  },
  9: {
    questext: "Select the most appropriate synonym of the given word.\nObsolete",
    options: ["Modern", "Outdated", "Absolute", "Necessary"],
    correct: "2",
    exptext: "✅ Obsolete means no longer used, so outdated is the closest word. 📌 Think of old things replaced by new ones. ❌ Modern is wrong because it means up to date."
  },
  10: {
    questext: "Select the most appropriate option to fill in the blank.\nThe old typewriter has become ______ in modern offices, because everyone uses computers.",
    options: ["orthodox", "fashionable", "immaculate", "obsolete"],
    correct: "4",
    exptext: "✅ Obsolete fits because computers have replaced the typewriter. 📌 Obsolete = out of use. ❌ Fashionable is wrong because a replaced machine is not in fashion."
  },
  11: {
    type: "concept", icon: "🪖", accent: "#31d8bc", pauseTimer: true,
    title: "Martinet",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,216,188;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who forces others to follow rules very strictly.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कठोर अनुशासक, सख्त अधिकारी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">disciplinarian</li><li class="vc-chip">taskmaster</li><li class="vc-chip">stickler</li><li class="vc-chip">authoritarian</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">pushover</li><li class="vc-chip">softie</li><li class="vc-chip">liberal</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The coach was a <b>martinet</b> who fined players for arriving even one minute late.</p></li><li><span class="vc-n">2</span><p class="vc-s">Our principal is no <b>martinet</b>; she listens before she punishes anyone.</p></li><li><span class="vc-n">3</span><p class="vc-s">The captain, a born <b>martinet</b>, inspected every button on the soldiers' uniforms. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/4.png" alt="Illustration of the word martinet: a stern army captain closely inspecting the shining buttons of a stiff soldier on a parade ground." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The captain, a born <mark class="vc-hl">martinet</mark>, inspected every button on the soldiers' uniforms.</p></div></div>
      </div></div>
    `
  },
  12: {
    questext: "Select the most appropriate antonym of the given word.\nMartinet",
    options: ["Pushover", "Disciplinarian", "Taskmaster", "Stickler"],
    correct: "1",
    exptext: "✅ A martinet enforces strict rules, so a pushover, who gives in easily, is the opposite. 📌 Martinet is strict; pushover is soft. ❌ Disciplinarian is wrong because it is a synonym."
  },
  13: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who forces others to follow rules very strictly",
    options: ["Pushover", "Maverick", "Martinet", "Pundit"],
    correct: "3",
    exptext: "✅ Martinet means a person who enforces strict rules. 📌 Martinet was a strict French army officer. ❌ Pushover is wrong because a pushover is easily persuaded."
  },
  14: {
    type: "concept", icon: "🐎", accent: "#dd9a4b", pauseTimer: true,
    title: "Maverick",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,154,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who thinks and acts in an independent, unusual way.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">स्वतंत्र विचारक, अपरंपरागत व्यक्ति</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">nonconformist</li><li class="vc-chip">individualist</li><li class="vc-chip">rebel</li><li class="vc-chip">loner</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">conformist</li><li class="vc-chip">follower</li><li class="vc-chip">traditionalist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>maverick</b> chef ignored every recipe and invented dishes nobody had imagined. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>maverick</b> scientist, he challenged the accepted theory and was laughed at first.</p></li><li><span class="vc-n">3</span><p class="vc-s">The party leaders were annoyed by the <b>maverick</b> who voted against his own party.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/5.png" alt="Illustration of the word maverick: a chef in a busy kitchen tossing unusual ingredients into a pan while other chefs follow recipe books." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">maverick</mark> chef ignored every recipe and invented dishes nobody had imagined.</p></div></div>
      </div></div>
    `
  },
  15: {
    questext: "Select the most appropriate synonym of the given word.\nMaverick",
    options: ["Follower", "Nonconformist", "Bigot", "Martinet"],
    correct: "2",
    exptext: "✅ A maverick acts in an independent way, so nonconformist is the closest word. 📌 A maverick refuses to join the herd. ❌ Follower is wrong because a follower copies others."
  },
  16: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ scientist ignored the rules of his department and followed his own unusual methods.",
    options: ["loyalist", "conformist", "follower", "maverick"],
    correct: "4",
    exptext: "✅ Maverick fits because the scientist acted in an independent and unusual way. 📌 Maverick = unbranded calf, goes its own way. ❌ Conformist is wrong because a conformist obeys the usual rules."
  },
  17: {
    type: "concept", icon: "🤝", accent: "#4d26c5", pauseTimer: true,
    title: "Customary",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:77,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Done usually, according to the habits or traditions of a place.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">रीति-रिवाज के अनुसार, प्रचलित</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">usual</li><li class="vc-chip">traditional</li><li class="vc-chip">habitual</li><li class="vc-chip">routine</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">unusual</li><li class="vc-chip">rare</li><li class="vc-chip">uncommon</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">It is <b>customary</b> in India to remove shoes before entering a home. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The manager gave the <b>customary</b> speech at the end of the annual meeting.</p></li><li><span class="vc-n">3</span><p class="vc-s">Offering tea to guests is <b>customary</b> in most families across the country.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/6.png" alt="Illustration of the word customary: a family at a doorway with shoes lined up outside and a guest greeted with folded hands." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">It is <mark class="vc-hl">customary</mark> in India to remove shoes before entering a home.</p></div></div>
      </div></div>
    `
  },
  18: {
    questext: "Select the most appropriate antonym of the given word.\nCustomary",
    options: ["Unusual", "Traditional", "Habitual", "Routine"],
    correct: "1",
    exptext: "✅ Customary means done by habit or tradition, so unusual is the opposite. 📌 Custom means usual way. ❌ Traditional is wrong because it is a synonym."
  },
  19: {
    questext: "Select the most appropriate option to fill in the blank.\nIt is ______ in our village to touch the feet of elders when we meet them.",
    options: ["rare", "unusual", "customary", "forbidden"],
    correct: "3",
    exptext: "✅ Customary fits because it is the usual tradition of the village. 📌 Customary comes from custom. ❌ Rare is wrong because a tradition followed by everyone is not rare."
  },
  20: {
    type: "concept", icon: "🕉️", accent: "#38d831", pauseTimer: true,
    title: "Orthodox",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:56,216,49;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Following the old, accepted beliefs and traditions strictly.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">रूढ़िवादी, परंपरावादी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">conventional</li><li class="vc-chip">traditional</li><li class="vc-chip">conservative</li><li class="vc-chip">strict</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">unorthodox</li><li class="vc-chip">liberal</li><li class="vc-chip">progressive</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His <b>orthodox</b> family does not allow any change in the old wedding rituals. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The doctor rejected <b>orthodox</b> methods and tried a new way to treat the disease.</p></li><li><span class="vc-n">3</span><p class="vc-s">Critics called the film unusual because it broke every <b>orthodox</b> rule of storytelling.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/7.png" alt="Illustration of the word orthodox: elderly grandparents in traditional clothes sternly watching a young couple, ritual items on a table." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">His <mark class="vc-hl">orthodox</mark> family does not allow any change in the old wedding rituals.</p></div></div>
      </div></div>
    `
  },
  21: {
    questext: "Select the most appropriate synonym of the given word.\nOrthodox",
    options: ["Progressive", "Conventional", "Orthopaedic", "Generous"],
    correct: "2",
    exptext: "✅ Orthodox means following accepted traditions, so conventional is the closest word. 📌 Ortho means right or straight. ❌ Progressive is wrong because it means in favour of change."
  },
  22: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ priest refused to change even one old ritual of the temple.",
    options: ["modern", "liberal", "progressive", "orthodox"],
    correct: "4",
    exptext: "✅ Orthodox fits because the priest held on to old traditions. 📌 Orthodox = old and strict. ❌ Liberal is wrong because a liberal person welcomes change."
  },
  23: {
    type: "concept", icon: "🔨", accent: "#dd4b7c", pauseTimer: true,
    title: "Iconoclast",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,75,124;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who attacks and rejects popular beliefs and traditions.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मूर्तिभंजक, परंपरा-विरोधी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">rebel</li><li class="vc-chip">dissenter</li><li class="vc-chip">radical</li><li class="vc-chip">nonconformist</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">conformist</li><li class="vc-chip">traditionalist</li><li class="vc-chip">loyalist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The young poet, an <b>iconoclast</b>, mocked every tradition that his teachers admired.</p></li><li><span class="vc-n">2</span><p class="vc-s">As an <b>iconoclast</b>, the editor printed stories that challenged powerful beliefs.</p></li><li><span class="vc-n">3</span><p class="vc-s">Historians remember him as an <b>iconoclast</b> who shattered the old ideas of art. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/8.png" alt="Illustration of the word iconoclast: a bold painter smashing a cracked classical plaster bust with a hammer while old art critics gasp." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Historians remember him as an <mark class="vc-hl">iconoclast</mark> who shattered the old ideas of art.</p></div></div>
      </div></div>
    `
  },
  24: {
    questext: "Select the most appropriate antonym of the given word.\nIconoclast",
    options: ["Traditionalist", "Rebel", "Radical", "Dissenter"],
    correct: "1",
    exptext: "✅ An iconoclast attacks traditional beliefs, so a traditionalist, who defends them, is the opposite. 📌 Icon plus break. ❌ Rebel is wrong because it is a synonym."
  },
  25: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who attacks and rejects popular beliefs and traditions",
    options: ["Bohemian", "Conformist", "Iconoclast", "Martinet"],
    correct: "3",
    exptext: "✅ Iconoclast means a person who attacks popular beliefs. 📌 Icon plus klastes, breaker. ❌ Conformist is wrong because a conformist accepts popular beliefs."
  },
  26: {
    type: "concept", icon: "🐑", accent: "#2689c5", pauseTimer: true,
    title: "Conformist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,137,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who follows the accepted rules and habits of society.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अनुरूपतावादी, परंपरा का अनुयायी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">traditionalist</li><li class="vc-chip">follower</li><li class="vc-chip">conventionalist</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">nonconformist</li><li class="vc-chip">rebel</li><li class="vc-chip">maverick</li><li class="vc-chip">iconoclast</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A <b>conformist</b> at school, he wore the same style and said what others said. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The company needs creative people, not <b>conformists</b> who never question anything.</p></li><li><span class="vc-n">3</span><p class="vc-s">Society often rewards the <b>conformist</b> and doubts the person who thinks differently.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/9.png" alt="Illustration of the word conformist: rows of identical students in the same uniform and posture, one boy in the centre copying his neighbour" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A <mark class="vc-hl">conformist</mark> at school, he wore the same style and said what others said.</p></div></div>
      </div></div>
    `
  },
  27: {
    questext: "Select the most appropriate synonym of the given word.\nConformist",
    options: ["Rebel", "Follower", "Informer", "Reformer"],
    correct: "2",
    exptext: "✅ A conformist follows accepted rules, so follower is the closest word. 📌 Conform with the crowd. ❌ Rebel is wrong because a rebel breaks the rules."
  },
  28: {
    questext: "Select the most appropriate option to fill in the blank.\nAlways doing what everybody else does, Rakesh is a perfect ______.",
    options: ["rebel", "maverick", "iconoclast", "conformist"],
    correct: "4",
    exptext: "✅ Conformist fits because Rakesh does what everybody else does. 📌 Conformist = copies the crowd. ❌ Rebel is wrong because a rebel would not copy others."
  },
  29: {
    type: "concept", icon: "🎨", accent: "#cad831", pauseTimer: true,
    title: "Bohemian",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:202,216,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Living in a free, unusual style, often as an artist.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">स्वच्छंद, कलाकार-स्वभाव का</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">unconventional</li><li class="vc-chip">artistic</li><li class="vc-chip">free-spirited</li><li class="vc-chip">nonconformist</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">conventional</li><li class="vc-chip">orthodox</li><li class="vc-chip">conservative</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">She lived a <b>bohemian</b> life, painting by day and singing in small cafes by night. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>bohemian</b> writer ignored fixed routines and slept whenever the story arrived.</p></li><li><span class="vc-n">3</span><p class="vc-s">The old quarter of the city is famous for its <b>bohemian</b> artists and poets.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/10.png" alt="Illustration of the word bohemian: a woman painter in a cluttered attic studio with colourful scarves, an easel and a guitar at dusk." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">She lived a <mark class="vc-hl">bohemian</mark> life, painting by day and singing in small cafes by night.</p></div></div>
      </div></div>
    `
  },
  30: {
    questext: "Select the most appropriate antonym of the given word.\nBohemian",
    options: ["Conventional", "Free-spirited", "Artistic", "Unconventional"],
    correct: "1",
    exptext: "✅ Bohemian means living in a free and unusual style, so conventional is the opposite. 📌 Bohemian artists ignore rules. ❌ Free-spirited is wrong because it is a synonym."
  },
  31: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ poet gave up a steady job to wander and write in small towns.",
    options: ["customary", "orthodox", "bohemian", "obsolete"],
    correct: "3",
    exptext: "✅ Bohemian fits because the poet chose a free and unusual life. 📌 Bohemian = free artist. ❌ Orthodox is wrong because an orthodox person would keep a steady job."
  },
  32: {
    type: "concept", icon: "📏", accent: "#be4bdd", pauseTimer: true,
    title: "Conform",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:190,75,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">VERB</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">To follow the rules, customs or standards that others follow.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अनुसरण करना, मानना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">comply</li><li class="vc-chip">obey</li><li class="vc-chip">adhere</li><li class="vc-chip">follow</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">rebel</li><li class="vc-chip">deviate</li><li class="vc-chip">differ</li><li class="vc-chip">defy</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">All students must <b>conform</b> to the school rules about uniform and timing. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Many young people <b>conform</b> to trends just to feel accepted by friends.</p></li><li><span class="vc-n">3</span><p class="vc-s">The building does not <b>conform</b> to the safety standards set by the government.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/11.png" alt="Illustration of the word conform: school students in a line at the gate while a guard checks their ties and shoes." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">All students must <mark class="vc-hl">conform</mark> to the school rules about uniform and timing.</p></div></div>
      </div></div>
    `
  },
  33: {
    questext: "Select the most appropriate synonym of the given word.\nConform",
    options: ["Defy", "Comply", "Confirm", "Convince"],
    correct: "2",
    exptext: "✅ To conform is to follow the rules, so comply is the closest word. 📌 Con plus form: take the same form. ❌ Defy is wrong because it means to refuse to obey."
  },
  34: {
    questext: "Select the most appropriate option to fill in the blank.\nEveryone in the army must ______ to strict discipline, so no soldier may do as he pleases.",
    options: ["belong", "object", "refer", "conform"],
    correct: "4",
    exptext: "✅ Conform fits because soldiers must follow the discipline. 📌 Conform = same form as others. ❌ Object is wrong because it means to disagree."
  },
  35: {
    type: "concept", icon: "💊", accent: "#26c575", pauseTimer: true,
    title: "Placebo",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,117;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A harmless pill with no medicine, given to test or comfort.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दिखावटी दवा, नकली औषधि</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dummy pill</li><li class="vc-chip">sugar pill</li><li class="vc-chip">inert pill</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">active drug</li><li class="vc-chip">real medicine</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Half the patients got the real drug and half got a <b>placebo</b> without knowing. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The patient felt better after taking a <b>placebo</b>, as he believed it was medicine.</p></li><li><span class="vc-n">3</span><p class="vc-s">Researchers use a <b>placebo</b> to check whether a new medicine really works.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/12.png" alt="Illustration of the word placebo: a nurse handing small white pills to two groups of patients in a clinic while a researcher takes notes." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Half the patients got the real drug and half got a <mark class="vc-hl">placebo</mark> without knowing.</p></div></div>
      </div></div>
    `
  },
  36: {
    questext: "Select the most appropriate antonym of the given word.\nPlacebo",
    options: ["Real medicine", "Dummy pill", "Sugar pill", "Harmless tablet"],
    correct: "1",
    exptext: "✅ A placebo has no medicine in it, so real medicine is the opposite. 📌 Placebo means I will please. ❌ Dummy pill is wrong because it is a synonym."
  },
  37: {
    questext: "Select the most appropriate option to fill in the blank.\nIn the trial, half the patients got the new drug and the rest received a ______ with no medicine in it.",
    options: ["painkiller", "vaccine", "placebo", "tonic"],
    correct: "3",
    exptext: "✅ Placebo fits because it is a harmless pill with no medicine. 📌 Placebo = pleasing pill. ❌ Painkiller is wrong because a painkiller does contain medicine."
  },
  38: {
    type: "concept", icon: "🩹", accent: "#d85431", pauseTimer: true,
    title: "Palliative",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,84,49;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Giving relief from pain without curing the cause.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कष्टहारी, राहत देने वाला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">soothing</li><li class="vc-chip">calming</li><li class="vc-chip">relieving</li><li class="vc-chip">easing</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">aggravating</li><li class="vc-chip">irritating</li><li class="vc-chip">worsening</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The nurse gave <b>palliative</b> care to ease the old man's pain at home. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>palliative</b> measure may calm the crisis, but it cannot solve the real problem.</p></li><li><span class="vc-n">3</span><p class="vc-s">Rain brought only <b>palliative</b> relief to the farmers during the long drought.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/13.png" alt="Illustration of the word palliative: a nurse gently adjusting a pillow and holding the hand of an elderly man in a calm bedroom." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The nurse gave <mark class="vc-hl">palliative</mark> care to ease the old man's pain at home.</p></div></div>
      </div></div>
    `
  },
  39: {
    questext: "Select the most appropriate synonym of the given word.\nPalliative",
    options: ["Worsening", "Soothing", "Palatial", "Poisonous"],
    correct: "2",
    exptext: "✅ Palliative means giving relief from pain, so soothing is the closest word. 📌 Palliative comes from a Latin word for cloak: it covers the pain. ❌ Worsening is wrong because it is the opposite."
  },
  40: {
    questext: "Select the most appropriate option to fill in the blank.\nThe government's cash gift was only ______ relief; it did not end poverty.",
    options: ["orthodox", "obsolete", "customary", "palliative"],
    correct: "4",
    exptext: "✅ Palliative fits because the gift eased the problem without curing it. 📌 Palliative = eases, does not cure. ❌ Customary is wrong because it means usual, which does not describe the relief."
  },
  41: {
    type: "concept", icon: "😌", accent: "#4b57dd", pauseTimer: true,
    title: "Anodyne",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,87,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A medicine or thing that reduces pain or soothes.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पीड़ाहर, दर्दनिवारक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">painkiller</li><li class="vc-chip">analgesic</li><li class="vc-chip">soother</li><li class="vc-chip">balm</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">irritant</li><li class="vc-chip">stimulant</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The doctor gave him an <b>anodyne</b> to ease the pain of the broken arm.</p></li><li><span class="vc-n">2</span><p class="vc-s">Soft music was an <b>anodyne</b> for her tired mind after the exam. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">To the grieving poet, the quiet river was an <b>anodyne</b> for sorrow.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/14.png" alt="Illustration of the word anodyne: a tired student lying with closed eyes listening to soft music through headphones in a calm evening room." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Soft music was an <mark class="vc-hl">anodyne</mark> for her tired mind after the exam.</p></div></div>
      </div></div>
    `
  },
  42: {
    questext: "Select the most appropriate antonym of the given word.\nAnodyne",
    options: ["Irritant", "Painkiller", "Soother", "Balm"],
    correct: "1",
    exptext: "✅ An anodyne reduces pain, so an irritant, which causes pain or annoyance, is the opposite. 📌 An-odyne means no pain. ❌ Painkiller is wrong because it is a synonym."
  },
  43: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA medicine or thing that reduces pain or soothes",
    options: ["Poison", "Stimulant", "Anodyne", "Irritant"],
    correct: "3",
    exptext: "✅ Anodyne is a medicine or thing that reduces pain. 📌 An means without and odyne means pain. ❌ Stimulant is wrong because it wakes up the body."
  },
  44: {
    type: "concept", icon: "🏚️", accent: "#62c526", pauseTimer: true,
    title: "Desuetude",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:98,197,38;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A state of no longer being used or practised.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अप्रचलन, उपयोग का अभाव</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">disuse</li><li class="vc-chip">inactivity</li><li class="vc-chip">neglect</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">use</li><li class="vc-chip">usage</li><li class="vc-chip">practice</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The old well has fallen into <b>desuetude</b> since water pipes reached the village. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Many traditional crafts have sunk into <b>desuetude</b> as factories make cheaper goods.</p></li><li><span class="vc-n">3</span><p class="vc-s">After years of <b>desuetude</b>, the grand library was reopened for the public.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/15.png" alt="Illustration of the word desuetude: a dry old stone well covered with creepers and moss in a quiet village, a modern tap in the background." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The old well has fallen into <mark class="vc-hl">desuetude</mark> since water pipes reached the village.</p></div></div>
      </div></div>
    `
  },
  45: {
    questext: "Select the most appropriate synonym of the given word.\nDesuetude",
    options: ["Usage", "Disuse", "Dessert", "Attitude"],
    correct: "2",
    exptext: "✅ Desuetude means a state of not being used, so disuse is the closest word. 📌 De means away from use. ❌ Usage is wrong because it is the opposite."
  },
  46: {
    questext: "Select the most appropriate option to fill in the blank.\nThe old custom fell into ______ when young people stopped following it.",
    options: ["fashion", "usage", "practice", "desuetude"],
    correct: "4",
    exptext: "✅ Desuetude fits because the custom stopped being followed. 📌 Desuetude = no use. ❌ Usage is wrong because a custom no longer followed is not in usage."
  },
  47: {
    type: "concept", icon: "⏸️", accent: "#d831a1", pauseTimer: true,
    title: "Hiatus",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,161;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A short break or gap in a series of events.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अंतराल, विराम</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">pause</li><li class="vc-chip">gap</li><li class="vc-chip">interval</li><li class="vc-chip">break</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">continuity</li><li class="vc-chip">continuation</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">After a long <b>hiatus</b>, the singer came back with a new album.</p></li><li><span class="vc-n">2</span><p class="vc-s">There was a <b>hiatus</b> in the talks when both sides left the room.</p></li><li><span class="vc-n">3</span><p class="vc-s">The teacher's illness caused a month-long <b>hiatus</b> in our classes. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/16.png" alt="Illustration of the word hiatus: a quiet empty classroom with chairs stacked, a wall calendar with crossed-out days and sunlight through the" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The teacher's illness caused a month-long <mark class="vc-hl">hiatus</mark> in our classes.</p></div></div>
      </div></div>
    `
  },
  48: {
    questext: "Select the most appropriate antonym of the given word.\nHiatus",
    options: ["Continuity", "Pause", "Gap", "Interval"],
    correct: "1",
    exptext: "✅ A hiatus is a break in a series, so continuity, which means going on without a break, is the opposite. 📌 Hiatus has a gap. ❌ Pause is wrong because it is a synonym."
  },
  49: {
    questext: "Select the most appropriate option to fill in the blank.\nAfter a three-year ______ from films, the actor returned to the screen.",
    options: ["conformity", "continuity", "hiatus", "martinet"],
    correct: "3",
    exptext: "✅ Hiatus fits because the actor took a break from films. 📌 Hiatus = gap. ❌ Continuity is wrong because it means going on without a break."
  },
  50: {
    type: "concept", icon: "🌫️", accent: "#4bd7dd", pauseTimer: true,
    title: "Oblivion",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,215,221;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The state of being completely forgotten or unnoticed.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">विस्मृति, गुमनामी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">forgetfulness</li><li class="vc-chip">obscurity</li><li class="vc-chip">unawareness</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">remembrance</li><li class="vc-chip">memory</li><li class="vc-chip">fame</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Many great folk singers have faded into <b>oblivion</b> without leaving any record.</p></li><li><span class="vc-n">2</span><p class="vc-s">The old actor lived in <b>oblivion</b>, forgotten by the audience that once cheered him.</p></li><li><span class="vc-n">3</span><p class="vc-s">The ancient city sank into <b>oblivion</b> after its river dried up. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/17.png" alt="Illustration of the word oblivion: a ruined ancient city half buried in sand beside a dry riverbed, a lone traveller looking at it." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The ancient city sank into <mark class="vc-hl">oblivion</mark> after its river dried up.</p></div></div>
      </div></div>
    `
  },
  51: {
    questext: "Select the most appropriate synonym of the given word.\nOblivion",
    options: ["Remembrance", "Obscurity", "Obligation", "Fame"],
    correct: "2",
    exptext: "✅ Oblivion means being completely forgotten, so obscurity is the closest word. 📌 Oblivion = forgotten. ❌ Remembrance is wrong because it means keeping in memory."
  },
  52: {
    questext: "Select the most appropriate option to fill in the blank.\nThe once-famous singer faded into ______, and nobody remembered her songs.",
    options: ["remembrance", "fame", "glory", "oblivion"],
    correct: "4",
    exptext: "✅ Oblivion fits because nobody remembered the singer. 📌 Oblivion = forgotten. ❌ Fame is wrong because fame is being well known."
  },
  53: {
    type: "concept", icon: "👑", accent: "#c59d26", pauseTimer: true,
    title: "Interregnum",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,157,38;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A period when a country has no ruler or government.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">राजशून्य काल, अंतरिम काल</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">interval</li><li class="vc-chip">gap</li><li class="vc-chip">break</li><li class="vc-chip">suspension</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">reign</li><li class="vc-chip">rule</li><li class="vc-chip">continuity</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The country faced an <b>interregnum</b> after the king died without naming a successor.</p></li><li><span class="vc-n">2</span><p class="vc-s">During the <b>interregnum</b>, the council ran the government until the new leader arrived. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The long <b>interregnum</b> between the two prime ministers caused confusion in the state.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/18.png" alt="Illustration of the word interregnum: an empty royal throne in a grand hall with council members arguing around it and a crown on a cushion." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">During the <mark class="vc-hl">interregnum</mark>, the council ran the government until the new leader arrived.</p></div></div>
      </div></div>
    `
  },
  54: {
    questext: "Select the most appropriate antonym of the given word.\nInterregnum",
    options: ["Reign", "Gap", "Interval", "Break"],
    correct: "1",
    exptext: "✅ An interregnum is a gap with no ruler, so reign, which is the time of a ruler, is the opposite. 📌 Inter means between and regnum means rule. ❌ Gap is wrong because it is a synonym."
  },
  55: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA period when a country has no ruler or government",
    options: ["Desuetude", "Oblivion", "Interregnum", "Placebo"],
    correct: "3",
    exptext: "✅ Interregnum is the period between two rulers when there is no ruler. 📌 Inter plus reign. ❌ Oblivion is wrong because it means being forgotten."
  },
  56: {
    type: "concept", icon: "🕯️", accent: "#7d31d8", pauseTimer: true,
    title: "Elegy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:125,49,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A sad poem or song written to mourn someone who has died.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">शोकगीत, विलाप-काव्य</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">lament</li><li class="vc-chip">dirge</li><li class="vc-chip">requiem</li><li class="vc-chip">threnody</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">paean</li><li class="vc-chip">celebration</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The poet wrote an <b>elegy</b> for his friend who had passed away in the war.</p></li><li><span class="vc-n">2</span><p class="vc-s">The school choir sang a soft <b>elegy</b> at the funeral of the old teacher. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Gray's famous poem is an <b>elegy</b> written in a quiet country churchyard.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/19.png" alt="Illustration of the word elegy: a children's choir in black singing softly at a funeral with candles and a garlanded photo frame." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The school choir sang a soft <mark class="vc-hl">elegy</mark> at the funeral of the old teacher.</p></div></div>
      </div></div>
    `
  },
  57: {
    questext: "Select the most appropriate synonym of the given word.\nElegy",
    options: ["Celebration", "Lament", "Allergy", "Encomium"],
    correct: "2",
    exptext: "✅ An elegy is a sad poem for the dead, so lament is the closest word. 📌 Elegy = sad song. ❌ Celebration is wrong because it is joyful."
  },
  58: {
    questext: "Select the most appropriate option to fill in the blank.\nThe poet wrote a poem of sorrow for the dead king, a mournful ______ that made the whole court weep.",
    options: ["soliloquy", "encomium", "epistle", "elegy"],
    correct: "4",
    exptext: "✅ Elegy fits because it is a sad poem written to mourn a dead person. 📌 Elegy = mourning poem. ❌ Encomium is wrong because it is high praise, not a mourning poem."
  },
  59: {
    type: "concept", icon: "🏅", accent: "#4bdd63", pauseTimer: true,
    title: "Encomium",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,99;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A speech or writing that praises someone very highly.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">प्रशंसा-पत्र, स्तुति</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">tribute</li><li class="vc-chip">eulogy</li><li class="vc-chip">praise</li><li class="vc-chip">panegyric</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">censure</li><li class="vc-chip">criticism</li><li class="vc-chip">condemnation</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The principal delivered an <b>encomium</b> praising the topper's hard work and honesty. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The newspaper printed an <b>encomium</b> to the late scientist on his birthday.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her speech was less a report than an <b>encomium</b> to the brave firefighters.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/20.png" alt="Illustration of the word encomium: a principal on stage with a microphone and a medal applauding a proud girl topper, students clapping." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The principal delivered an <mark class="vc-hl">encomium</mark> praising the topper's hard work and honesty.</p></div></div>
      </div></div>
    `
  },
  60: {
    questext: "Select the most appropriate antonym of the given word.\nEncomium",
    options: ["Censure", "Tribute", "Eulogy", "Praise"],
    correct: "1",
    exptext: "✅ An encomium is high praise, so censure, which means strong criticism, is the opposite. 📌 Encomium compliments; censure condemns. ❌ Tribute is wrong because it is a synonym."
  },
  61: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA speech or writing that praises someone very highly",
    options: ["Diatribe", "Elegy", "Encomium", "Epistle"],
    correct: "3",
    exptext: "✅ Encomium means high praise in speech or writing. 📌 Encomium = high praise. ❌ Diatribe is wrong because it is an angry attack."
  },
  62: {
    type: "concept", icon: "🎭", accent: "#c5263a", pauseTimer: true,
    title: "Soliloquy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,58;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A speech by one person speaking alone, often a character in a play.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">स्वगत-कथन, एकालाप</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">monologue</li><li class="vc-chip">self-talk</li><li class="vc-chip">one-man speech</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">dialogue</li><li class="vc-chip">conversation</li><li class="vc-chip">discussion</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">In his famous <b>soliloquy</b>, Hamlet asks whether it is better to live or die.</p></li><li><span class="vc-n">2</span><p class="vc-s">Alone on the stage, the actor delivered a long <b>soliloquy</b> about lost love. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">She talked to the mirror in a quiet <b>soliloquy</b> before the big interview.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/21.png" alt="Illustration of the word soliloquy: a lone actor on a dim stage under a single spotlight speaking with a hand on his chest, empty theatre se" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Alone on the stage, the actor delivered a long <mark class="vc-hl">soliloquy</mark> about lost love.</p></div></div>
      </div></div>
    `
  },
  63: {
    questext: "Select the most appropriate synonym of the given word.\nSoliloquy",
    options: ["Dialogue", "Monologue", "Solitude", "Prologue"],
    correct: "2",
    exptext: "✅ A soliloquy is a speech by one person alone, so monologue is the closest word. 📌 Solo plus speech. ❌ Dialogue is wrong because it is a talk between two people."
  },
  64: {
    questext: "Select the most appropriate option to fill in the blank.\nAlone on the stage, Hamlet shared his secret doubts in a long ______.",
    options: ["conversation", "dialogue", "debate", "soliloquy"],
    correct: "4",
    exptext: "✅ Soliloquy fits because the character is alone and speaks his private thoughts. 📌 Solo speech. ❌ Dialogue is wrong because a dialogue needs two speakers."
  },
  65: {
    type: "concept", icon: "💔", accent: "#3177d8", pauseTimer: true,
    title: "Schism",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,119,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A split in a group because of strong differences of opinion.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">फूट, विभाजन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">split</li><li class="vc-chip">division</li><li class="vc-chip">rift</li><li class="vc-chip">breach</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">unity</li><li class="vc-chip">union</li><li class="vc-chip">harmony</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A bitter <b>schism</b> divided the party into two groups after the election. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>schism</b> in the church began over a small change in prayer.</p></li><li><span class="vc-n">3</span><p class="vc-s">Both families tried to heal the <b>schism</b> that ended their long friendship.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/22.png" alt="Illustration of the word schism: a large group of people in a hall splitting into two angry sides facing each other with a wide gap between " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A bitter <mark class="vc-hl">schism</mark> divided the party into two groups after the election.</p></div></div>
      </div></div>
    `
  },
  66: {
    questext: "Select the most appropriate antonym of the given word.\nSchism",
    options: ["Unity", "Split", "Rift", "Division"],
    correct: "1",
    exptext: "✅ A schism is a split in a group, so unity, which means being together, is the opposite. 📌 Schism splits; unity joins. ❌ Split is wrong because it is a synonym."
  },
  67: {
    questext: "Select the most appropriate option to fill in the blank.\nThe disagreement over leadership caused a ______ within the party.",
    options: ["merger", "union", "schism", "pact"],
    correct: "3",
    exptext: "✅ Schism fits because the disagreement split the party. 📌 Schism = split. ❌ Union is wrong because a union would bring the party together."
  },
  68: {
    type: "concept", icon: "🚪", accent: "#b3dd4b", pauseTimer: true,
    title: "Apostasy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:179,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Giving up your religion, belief or political party completely.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">धर्म-त्याग, पक्ष-त्याग</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">renunciation</li><li class="vc-chip">defection</li><li class="vc-chip">desertion</li><li class="vc-chip">betrayal</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">loyalty</li><li class="vc-chip">faithfulness</li><li class="vc-chip">allegiance</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The leader's <b>apostasy</b> shocked his followers, as he left the party he founded. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">In some ages, <b>apostasy</b> from the state religion was punished harshly.</p></li><li><span class="vc-n">3</span><p class="vc-s">Switching sides at the last moment was seen as <b>apostasy</b> by his old friends.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/23.png" alt="Illustration of the word apostasy: a politician removing his party scarf and walking out of a rally while stunned supporters watch." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The leader's <mark class="vc-hl">apostasy</mark> shocked his followers, as he left the party he founded.</p></div></div>
      </div></div>
    `
  },
  69: {
    questext: "Select the most appropriate synonym of the given word.\nApostasy",
    options: ["Loyalty", "Defection", "Apostle", "Prayer"],
    correct: "2",
    exptext: "✅ Apostasy is giving up a belief or side, so defection is the closest word. 📌 Apo means away and stasis means stand. ❌ Loyalty is wrong because it means staying faithful."
  },
  70: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nGiving up your religion, belief or political party completely",
    options: ["Schism", "Heresy", "Loyalty", "Apostasy"],
    correct: "4",
    exptext: "✅ Apostasy means completely giving up a religion or belief. 📌 Apo = away. ❌ Heresy is wrong because it means holding a belief against the accepted teaching."
  },
  71: {
    type: "concept", icon: "📜", accent: "#c526c5", pauseTimer: true,
    title: "Heresy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A belief or opinion that goes against official or accepted teaching.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पाखंड, धर्म-विरोधी मत</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dissent</li><li class="vc-chip">unorthodoxy</li><li class="vc-chip">blasphemy</li><li class="vc-chip">heterodoxy</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">orthodoxy</li><li class="vc-chip">conformity</li><li class="vc-chip">faith</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Saying the Earth moves around the Sun was once called <b>heresy</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">To the strict elders, questioning old customs was close to <b>heresy</b>.</p></li><li><span class="vc-n">3</span><p class="vc-s">The scientist's new theory was dismissed as <b>heresy</b> by the old guard.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/24.png" alt="Illustration of the word heresy: a scientist in an old robe pointing to a model of the Sun with circling planets while stern elders frown." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Saying the Earth moves around the Sun was once called <mark class="vc-hl">heresy</mark>.</p></div></div>
      </div></div>
    `
  },
  72: {
    questext: "Select the most appropriate antonym of the given word.\nHeresy",
    options: ["Orthodoxy", "Dissent", "Unorthodoxy", "Blasphemy"],
    correct: "1",
    exptext: "✅ Heresy is a belief against accepted teaching, so orthodoxy, which means accepted belief, is the opposite. 📌 Heresy is different; orthodoxy is the same. ❌ Dissent is wrong because it is a synonym."
  },
  73: {
    questext: "Select the most appropriate option to fill in the blank.\nThe priests branded the new theory ______ because it went against the church's teaching.",
    options: ["faith", "orthodoxy", "heresy", "conformity"],
    correct: "3",
    exptext: "✅ Heresy fits because the theory went against official teaching. 📌 Heresy = against the teaching. ❌ Orthodoxy is wrong because orthodoxy means following accepted belief."
  },
  74: {
    type: "concept", icon: "😡", accent: "#31d8a7", pauseTimer: true,
    title: "Bigot",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,216,167;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who strongly and unfairly dislikes other beliefs or groups.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कट्टर व्यक्ति, असहिष्णु</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">fanatic</li><li class="vc-chip">zealot</li><li class="vc-chip">extremist</li><li class="vc-chip">dogmatist</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">liberal</li><li class="vc-chip">humanist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A <b>bigot</b> refuses to listen to anyone who follows a different religion.</p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>bigot</b> shouted at his neighbour only because of the neighbour's language. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">She is no <b>bigot</b>; she respects people from every culture and faith.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/25.png" alt="Illustration of the word bigot: an angry man shouting over a fence at a calm neighbour in traditional clothes, tense mood." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">bigot</mark> shouted at his neighbour only because of the neighbour's language.</p></div></div>
      </div></div>
    `
  },
  75: {
    questext: "Select the most appropriate synonym of the given word.\nBigot",
    options: ["Liberal", "Fanatic", "Bigamist", "Humanist"],
    correct: "2",
    exptext: "✅ A bigot strongly dislikes other beliefs, so fanatic is the closest word. 📌 Think of a big closed mind. ❌ Liberal is wrong because a liberal respects other views."
  },
  76: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ refused to hear any view that differed from his own and insulted people of other faiths.",
    options: ["sage", "liberal", "humanist", "bigot"],
    correct: "4",
    exptext: "✅ Bigot fits because he refused other views and insulted other faiths. 📌 Bigot = closed mind. ❌ Humanist is wrong because a humanist respects all people."
  },
  77: {
    type: "concept", icon: "🔥", accent: "#dd874b", pauseTimer: true,
    title: "Heretic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,135,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who holds beliefs against the accepted teaching of a group.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">विधर्मी, धर्म-विरोधी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dissenter</li><li class="vc-chip">nonconformist</li><li class="vc-chip">apostate</li><li class="vc-chip">renegade</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">believer</li><li class="vc-chip">loyalist</li><li class="vc-chip">conformist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The villagers called him a <b>heretic</b> for refusing to follow their old rituals. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Once a <b>heretic</b>, the thinker is now praised as a great reformer.</p></li><li><span class="vc-n">3</span><p class="vc-s">The king punished the <b>heretic</b> who spoke against the royal faith.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/26.png" alt="Illustration of the word heretic: a lone man standing before an angry village crowd that points at him near a festival fire." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The villagers called him a <mark class="vc-hl">heretic</mark> for refusing to follow their old rituals.</p></div></div>
      </div></div>
    `
  },
  78: {
    questext: "Select the most appropriate antonym of the given word.\nHeretic",
    options: ["Loyalist", "Dissenter", "Apostate", "Renegade"],
    correct: "1",
    exptext: "✅ A heretic goes against accepted teaching, so a loyalist, who stays faithful, is the opposite. 📌 Heretic leaves; loyalist stays. ❌ Dissenter is wrong because it is a synonym."
  },
  79: {
    questext: "Select the most appropriate option to fill in the blank.\nThe church labelled the scientist a ______ because he rejected its teaching.",
    options: ["conformist", "loyalist", "heretic", "believer"],
    correct: "3",
    exptext: "✅ Heretic fits because the scientist rejected the church's teaching. 📌 Heretic = chooses a different belief. ❌ Believer is wrong because a believer accepts the teaching."
  },
  80: {
    type: "concept", icon: "🤕", accent: "#3926c5", pauseTimer: true,
    title: "Analgesic",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:57,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A medicine that reduces pain without making you sleep.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दर्द की दवा, पीड़ानाशक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">painkiller</li><li class="vc-chip">anodyne</li><li class="vc-chip">pain reliever</li><li class="vc-chip">palliative</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">irritant</li><li class="vc-chip">stimulant</li><li class="vc-chip">aggravator</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">He took an <b>analgesic</b> to ease his headache before the long meeting. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Aspirin is a common <b>analgesic</b> found in nearly every home medicine box.</p></li><li><span class="vc-n">3</span><p class="vc-s">The surgeon gave an <b>analgesic</b> so that the patient felt no pain after the operation.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/27.png" alt="Illustration of the word analgesic: a man at an office desk holding his forehead with a glass of water and a tablet strip, relieved expressi" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">He took an <mark class="vc-hl">analgesic</mark> to ease his headache before the long meeting.</p></div></div>
      </div></div>
    `
  },
  81: {
    questext: "Select the most appropriate synonym of the given word.\nAnalgesic",
    options: ["Stimulant", "Painkiller", "Antiseptic", "Irritant"],
    correct: "2",
    exptext: "✅ An analgesic reduces pain, so painkiller is the closest word. 📌 An means without and algos means pain. ❌ Stimulant is wrong because it excites the body."
  },
  82: {
    questext: "Select the most appropriate option to fill in the blank.\nFor his severe headache, the doctor gave him an ______ that eased the pain within minutes.",
    options: ["emetic", "irritant", "antiseptic", "analgesic"],
    correct: "4",
    exptext: "✅ Analgesic fits because it reduces pain. 📌 An-algesic = no pain. ❌ Antiseptic is wrong because it kills germs, not pain."
  },
  83: {
    type: "concept", icon: "😴", accent: "#4ed831", pauseTimer: true,
    title: "Sedative",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:78,216,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A medicine that calms you or helps you sleep.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">शामक, नींद की दवा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">soporific</li><li class="vc-chip">calmative</li><li class="vc-chip">tranquilizer</li><li class="vc-chip">relaxant</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">stimulant</li><li class="vc-chip">energizer</li><li class="vc-chip">irritant</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The nurse gave him a <b>sedative</b> so that he could sleep through the night.</p></li><li><span class="vc-n">2</span><p class="vc-s">Warm milk is a mild <b>sedative</b> that helps many people relax at bedtime.</p></li><li><span class="vc-n">3</span><p class="vc-s">Under the <b>sedative</b>, the frightened patient slowly became calm and quiet. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/28.png" alt="Illustration of the word sedative: a patient in a hospital bed growing calm with drooping eyes, a nurse adjusting a drip, soft night light." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Under the <mark class="vc-hl">sedative</mark>, the frightened patient slowly became calm and quiet.</p></div></div>
      </div></div>
    `
  },
  84: {
    questext: "Select the most appropriate antonym of the given word.\nSedative",
    options: ["Stimulant", "Soporific", "Relaxant", "Calmative"],
    correct: "1",
    exptext: "✅ A sedative calms or makes a person sleepy, so a stimulant, which wakes up the body, is the opposite. 📌 Sedative sits you down; stimulant lifts you up. ❌ Relaxant is wrong because it is a synonym."
  },
  85: {
    questext: "Select the most appropriate option to fill in the blank.\nThe doctor gave the anxious patient a mild ______ so that he could sleep peacefully.",
    options: ["irritant", "stimulant", "sedative", "energizer"],
    correct: "3",
    exptext: "✅ Sedative fits because it calms a person and helps sleep. 📌 Sedative = settles you down. ❌ Stimulant is wrong because it would keep him awake."
  },
  86: {
    type: "concept", icon: "🐘", accent: "#dd4b8e", pauseTimer: true,
    title: "Tranquilizer",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,75,142;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A drug that makes a person calm, less anxious or sleepy.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">चिंता-नाशक दवा, शांतिकर</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">sedative</li><li class="vc-chip">calmative</li><li class="vc-chip">relaxant</li><li class="vc-chip">depressant</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">stimulant</li><li class="vc-chip">irritant</li><li class="vc-chip">energizer</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The vet used a <b>tranquilizer</b> to calm the frightened elephant before moving it. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Her doctor warned her not to depend on a <b>tranquilizer</b> every time she felt worried.</p></li><li><span class="vc-n">3</span><p class="vc-s">The patient, under a strong <b>tranquilizer</b>, stayed peaceful during the long journey.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/29.png" alt="Illustration of the word tranquilizer: a veterinarian giving an injection to a calm elephant in a forest clearing with rangers nearby." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The vet used a <mark class="vc-hl">tranquilizer</mark> to calm the frightened elephant before moving it.</p></div></div>
      </div></div>
    `
  },
  87: {
    questext: "Select the most appropriate synonym of the given word.\nTranquilizer",
    options: ["Stimulant", "Sedative", "Transformer", "Irritant"],
    correct: "2",
    exptext: "✅ A tranquilizer calms a person, so sedative is the closest word. 📌 Tranquil means calm. ❌ Stimulant is wrong because it excites the body."
  },
  88: {
    questext: "Select the most appropriate option to fill in the blank.\nTo calm the wild elephant before moving it, the vet gave it a strong dose of ______.",
    options: ["energizer", "stimulant", "irritant", "tranquilizer"],
    correct: "4",
    exptext: "✅ Tranquilizer fits because the elephant needed to become calm. 📌 Tranquil = calm. ❌ Stimulant is wrong because it would make the elephant more excited."
  },
  89: {
    type: "concept", icon: "🥱", accent: "#269ec5", pauseTimer: true,
    title: "Ennui",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,158,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A feeling of being bored because nothing interests you.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">ऊब, उदासीनता</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">boredom</li><li class="vc-chip">tedium</li><li class="vc-chip">listlessness</li><li class="vc-chip">weariness</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">excitement</li><li class="vc-chip">enthusiasm</li><li class="vc-chip">zest</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Long, empty summer holidays filled the lazy teenager with <b>ennui</b>.</p></li><li><span class="vc-n">2</span><p class="vc-s">Despite his wealth, the prince suffered from <b>ennui</b> and wished for adventure. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">A sense of <b>ennui</b> crept over the clerk as he filed the same forms daily.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/30.png" alt="Illustration of the word ennui: a bored young prince slouching on a grand chair in a rich palace hall, chin on hand, yawning." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Despite his wealth, the prince suffered from <mark class="vc-hl">ennui</mark> and wished for adventure.</p></div></div>
      </div></div>
    `
  },
  90: {
    questext: "Select the most appropriate antonym of the given word.\nEnnui",
    options: ["Excitement", "Boredom", "Tedium", "Weariness"],
    correct: "1",
    exptext: "✅ Ennui is a feeling of boredom, so excitement is the opposite. 📌 Ennui sounds like annoyed. ❌ Boredom is wrong because it is a synonym."
  },
  91: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ of doing the same dull work every day made him quit.",
    options: ["zeal", "enthusiasm", "ennui", "thrill"],
    correct: "3",
    exptext: "✅ Ennui fits because dull, repeated work causes boredom. 📌 Ennui = deep boredom. ❌ Enthusiasm is wrong because it would make him keep working."
  },
  92: {
    type: "concept", icon: "🐻", accent: "#d8d031", pauseTimer: true,
    title: "Torpor",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,208,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A state of being slow, sleepy and without energy.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सुस्ती, निष्क्रियता</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">lethargy</li><li class="vc-chip">sluggishness</li><li class="vc-chip">inertia</li><li class="vc-chip">drowsiness</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">energy</li><li class="vc-chip">vigour</li><li class="vc-chip">activity</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The heavy meal put the whole family into a lazy <b>torpor</b> on the sofa.</p></li><li><span class="vc-n">2</span><p class="vc-s">Bears fall into a deep <b>torpor</b> during the cold winter months. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The minister's speech shook the officials out of their <b>torpor</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/31.png" alt="Illustration of the word torpor: a brown bear curled up asleep inside a snowy cave while snow falls outside." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Bears fall into a deep <mark class="vc-hl">torpor</mark> during the cold winter months.</p></div></div>
      </div></div>
    `
  },
  93: {
    questext: "Select the most appropriate synonym of the given word.\nTorpor",
    options: ["Vigour", "Lethargy", "Torment", "Alertness"],
    correct: "2",
    exptext: "✅ Torpor means being slow and sleepy, so lethargy is the closest word. 📌 Torpor makes you torpid, like a log. ❌ Vigour is wrong because it means strong energy."
  },
  94: {
    questext: "Select the most appropriate option to fill in the blank.\nIn the hot afternoon a heavy ______ settled over the village, and everyone lay still and slept.",
    options: ["activity", "vigour", "energy", "torpor"],
    correct: "4",
    exptext: "✅ Torpor fits because everyone became slow and sleepy. 📌 Torpor = sluggish sleepiness. ❌ Energy is wrong because people lying still have no energy."
  },
  95: {
    type: "concept", icon: "🥱", accent: "#ac4bdd", pauseTimer: true,
    title: "Tedium",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:172,75,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The quality of being long, dull and boring.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">ऊब, नीरसता</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">monotony</li><li class="vc-chip">boredom</li><li class="vc-chip">dullness</li><li class="vc-chip">drudgery</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">excitement</li><li class="vc-chip">interest</li><li class="vc-chip">thrill</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>tedium</b> of copying long lists made the clerk yawn all afternoon. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Travelling by bus for twelve hours was pure <b>tedium</b> for the children.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her lively stories broke the <b>tedium</b> of the long winter evenings.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/32.png" alt="Illustration of the word tedium: a clerk yawning while copying from a tall pile of papers at a desk with a wall clock showing late afternoon" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">tedium</mark> of copying long lists made the clerk yawn all afternoon.</p></div></div>
      </div></div>
    `
  },
  96: {
    questext: "Select the most appropriate antonym of the given word.\nTedium",
    options: ["Excitement", "Monotony", "Boredom", "Drudgery"],
    correct: "1",
    exptext: "✅ Tedium means dull and boring, so excitement is the opposite. 📌 Tedious tasks tire. ❌ Monotony is wrong because it is a synonym."
  },
  97: {
    questext: "Select the most appropriate option to fill in the blank.\nThe long wait at the station was full of ______, and he checked his watch every minute.",
    options: ["excitement", "thrill", "tedium", "delight"],
    correct: "3",
    exptext: "✅ Tedium fits because the long wait was boring. 📌 Tedium = tedious. ❌ Thrill is wrong because a thrilling wait would not make him check his watch."
  },
  98: {
    type: "concept", icon: "😩", accent: "#26c561", pauseTimer: true,
    title: "Weary",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,97;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Very tired, especially after long effort or boredom.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">थका हुआ, क्लांत</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">exhausted</li><li class="vc-chip">fatigued</li><li class="vc-chip">tired</li><li class="vc-chip">drained</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">fresh</li><li class="vc-chip">energetic</li><li class="vc-chip">lively</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>weary</b> travellers dropped their bags and slept as soon as they arrived.</p></li><li><span class="vc-n">2</span><p class="vc-s">She was <b>weary</b> of hearing the same excuse every single morning.</p></li><li><span class="vc-n">3</span><p class="vc-s">A <b>weary</b> smile crossed the doctor's face after the long night shift. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/33.png" alt="Illustration of the word weary: a doctor in scrubs with a tired smile sitting in a hospital corridor at dawn holding a cup of tea." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A <mark class="vc-hl">weary</mark> smile crossed the doctor's face after the long night shift.</p></div></div>
      </div></div>
    `
  },
  99: {
    questext: "Select the most appropriate synonym of the given word.\nWeary",
    options: ["Energetic", "Exhausted", "Wary", "Merry"],
    correct: "2",
    exptext: "✅ Weary means very tired, so exhausted is the closest word. 📌 Think of a weary traveller after a long journey. ❌ Energetic is wrong because it means full of energy."
  },
  100: {
    questext: "Select the most appropriate option to fill in the blank.\nAfter walking twenty kilometres, the ______ soldiers rested under a tree.",
    options: ["lively", "energetic", "wary", "weary"],
    correct: "4",
    exptext: "✅ Weary fits because the soldiers were tired after a long walk. 📌 Weary = worn out. ❌ Wary is wrong because it means careful, not tired."
  },
  101: {
    type: "concept", icon: "🐈", accent: "#d83f31", pauseTimer: true,
    title: "Wary",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,63,49;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Careful because you think something may be dangerous.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सतर्क, चौकन्ना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">cautious</li><li class="vc-chip">careful</li><li class="vc-chip">alert</li><li class="vc-chip">vigilant</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">careless</li><li class="vc-chip">reckless</li><li class="vc-chip">trusting</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Be <b>wary</b> of strangers who offer you free gifts on the road.</p></li><li><span class="vc-n">2</span><p class="vc-s">The cat was <b>wary</b> of the new dog and stayed near the door. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Investors grew <b>wary</b> of the bank after the sudden rise in its debts.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/34.png" alt="Illustration of the word wary: a cat crouched near a doorway watching a large dog enter a living room cautiously." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The cat was <mark class="vc-hl">wary</mark> of the new dog and stayed near the door.</p></div></div>
      </div></div>
    `
  },
  102: {
    questext: "Select the most appropriate antonym of the given word.\nWary",
    options: ["Careless", "Cautious", "Careful", "Alert"],
    correct: "1",
    exptext: "✅ Wary means careful about danger, so careless is the opposite. 📌 Wary people watch out. ❌ Cautious is wrong because it is a synonym."
  },
  103: {
    questext: "Select the most appropriate option to fill in the blank.\nBe ______ of online offers that seem too good to be true.",
    options: ["reckless", "weary", "wary", "careless"],
    correct: "3",
    exptext: "✅ Wary fits because one should be careful about suspicious offers. 📌 Wary = aware. ❌ Weary is wrong because it means tired, not careful."
  },
  104: {
    type: "concept", icon: "📉", accent: "#4b6add", pauseTimer: true,
    title: "Remission",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,106,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A reduction in the strength of a disease or a punishment.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कमी, छूट</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">abatement</li><li class="vc-chip">easing</li><li class="vc-chip">relief</li><li class="vc-chip">reduction</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">relapse</li><li class="vc-chip">aggravation</li><li class="vc-chip">intensification</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The patient's cancer went into <b>remission</b> after months of careful treatment. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The prisoner earned a <b>remission</b> of six months for good behaviour.</p></li><li><span class="vc-n">3</span><p class="vc-s">There was a short <b>remission</b> of the fever before it rose again.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/35.png" alt="Illustration of the word remission: a smiling patient in a hospital room holding a report while the doctor and family smile with relief." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The patient's cancer went into <mark class="vc-hl">remission</mark> after months of careful treatment.</p></div></div>
      </div></div>
    `
  },
  105: {
    questext: "Select the most appropriate synonym of the given word.\nRemission",
    options: ["Relapse", "Easing", "Permission", "Omission"],
    correct: "2",
    exptext: "✅ Remission means a reduction in a disease, so easing is the closest word. 📌 Re plus mittere, to send back. ❌ Relapse is wrong because it means the disease returns."
  },
  106: {
    questext: "Select the most appropriate option to fill in the blank.\nAfter months of treatment, the cancer went into ______, and the doctors were hopeful.",
    options: ["intensification", "relapse", "aggravation", "remission"],
    correct: "4",
    exptext: "✅ Remission fits because the disease became weaker. 📌 Remission = disease sent back. ❌ Relapse is wrong because it means the disease returns."
  },
  107: {
    type: "concept", icon: "⏳", accent: "#76c526", pauseTimer: true,
    title: "Reprieve",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:118,197,38;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A delay or cancellation of a punishment or trouble.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">राहत, दंड-स्थगन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">respite</li><li class="vc-chip">stay</li><li class="vc-chip">relief</li><li class="vc-chip">postponement</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">punishment</li><li class="vc-chip">penalty</li><li class="vc-chip">condemnation</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The judge gave the prisoner a last-minute <b>reprieve</b> from the death sentence.</p></li><li><span class="vc-n">2</span><p class="vc-s">The cool evening breeze was a welcome <b>reprieve</b> from the burning heat. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The tenants got a one-month <b>reprieve</b> before they had to leave the house.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/36.png" alt="Illustration of the word reprieve: a sweating man resting under a tree as a cool evening breeze moves the leaves at sunset." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The cool evening breeze was a welcome <mark class="vc-hl">reprieve</mark> from the burning heat.</p></div></div>
      </div></div>
    `
  },
  108: {
    questext: "Select the most appropriate antonym of the given word.\nReprieve",
    options: ["Punishment", "Respite", "Relief", "Postponement"],
    correct: "1",
    exptext: "✅ A reprieve cancels or delays a punishment, so punishment is the opposite. 📌 Reprieve spares; punishment strikes. ❌ Respite is wrong because it is a synonym."
  },
  109: {
    questext: "Select the most appropriate option to fill in the blank.\nJust before the execution, the governor granted the prisoner a ______ for one month.",
    options: ["penalty", "punishment", "reprieve", "sentence"],
    correct: "3",
    exptext: "✅ Reprieve fits because the governor delayed the execution. 📌 Reprieve = delay of punishment. ❌ Penalty is wrong because a penalty is the punishment itself."
  },
  110: {
    type: "concept", icon: "🕊️", accent: "#d831b6", pauseTimer: true,
    title: "Amnesty",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,182;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">An official pardon given by a government to a group of offenders.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">आम माफ़ी, क्षमादान</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">pardon</li><li class="vc-chip">clemency</li><li class="vc-chip">forgiveness</li><li class="vc-chip">absolution</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">punishment</li><li class="vc-chip">condemnation</li><li class="vc-chip">conviction</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The government announced an <b>amnesty</b> for people who surrendered illegal firearms.</p></li><li><span class="vc-n">2</span><p class="vc-s">After the war, the new ruler declared a general <b>amnesty</b> for rebel soldiers.</p></li><li><span class="vc-n">3</span><p class="vc-s">Citizens who declare hidden income under the <b>amnesty</b> scheme will not face jail. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/37.png" alt="Illustration of the word amnesty: a relieved man handing documents to a tax officer who stamps them at an office counter." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Citizens who declare hidden income under the <mark class="vc-hl">amnesty</mark> scheme will not face jail.</p></div></div>
      </div></div>
    `
  },
  111: {
    questext: "Select the most appropriate synonym of the given word.\nAmnesty",
    options: ["Penalty", "Pardon", "Amnesia", "Conviction"],
    correct: "2",
    exptext: "✅ Amnesty is an official pardon, so pardon is the closest word. 📌 Amnesty and amnesia both come from forgetting. ❌ Penalty is wrong because it is a punishment."
  },
  112: {
    questext: "Select the most appropriate option to fill in the blank.\nThe government announced a general ______ for all prisoners who had taken part in the protest.",
    options: ["censure", "penalty", "conviction", "amnesty"],
    correct: "4",
    exptext: "✅ Amnesty fits because the government forgave the prisoners. 📌 Amnesty = forget the offence. ❌ Penalty is wrong because a penalty is a punishment, not a pardon."
  },
  113: {
    type: "concept", icon: "🗡️", accent: "#4bddd0", pauseTimer: true,
    title: "Perfidy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,208;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The act of betraying someone who trusted you.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">विश्वासघात, धोखा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">treachery</li><li class="vc-chip">betrayal</li><li class="vc-chip">disloyalty</li><li class="vc-chip">deceit</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">loyalty</li><li class="vc-chip">faithfulness</li><li class="vc-chip">honesty</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His <b>perfidy</b> shocked the team, as he sold their secret plans to rivals. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The king never forgave the <b>perfidy</b> of the minister he had trusted most.</p></li><li><span class="vc-n">3</span><p class="vc-s">In the epic, the general's <b>perfidy</b> led to the fall of the fort.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/38.png" alt="Illustration of the word perfidy: a man secretly handing a sealed envelope to a stranger in a dark alley while a colleague watches shocked f" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">His <mark class="vc-hl">perfidy</mark> shocked the team, as he sold their secret plans to rivals.</p></div></div>
      </div></div>
    `
  },
  114: {
    questext: "Select the most appropriate antonym of the given word.\nPerfidy",
    options: ["Loyalty", "Treachery", "Betrayal", "Deceit"],
    correct: "1",
    exptext: "✅ Perfidy means betraying trust, so loyalty is the opposite. 📌 Perfidy breaks faith. ❌ Treachery is wrong because it is a synonym."
  },
  115: {
    questext: "Select the most appropriate option to fill in the blank.\nThe general's ______ in selling secret plans to the enemy shocked the whole nation.",
    options: ["honesty", "loyalty", "perfidy", "courage"],
    correct: "3",
    exptext: "✅ Perfidy fits because the general betrayed his country. 📌 Perfidy = broken faith. ❌ Loyalty is wrong because selling secrets is the opposite of loyalty."
  },
  116: {
    type: "concept", icon: "🧠", accent: "#c58826", pauseTimer: true,
    title: "Polymath",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,136,38;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who knows a great deal about many subjects.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">बहुज्ञ, बहुश्रुत विद्वान</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">savant</li><li class="vc-chip">scholar</li><li class="vc-chip">all-rounder</li><li class="vc-chip">sage</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">ignoramus</li><li class="vc-chip">novice</li><li class="vc-chip">layman</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Leonardo da Vinci was a <b>polymath</b>: a painter, an inventor and a scientist. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Our teacher is a <b>polymath</b>, equally at ease with poetry, physics and music.</p></li><li><span class="vc-n">3</span><p class="vc-s">A true <b>polymath</b>, she solved maths problems and then composed songs at night.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/39.png" alt="Illustration of the word polymath: a Renaissance-style scholar at a desk surrounded by paintings, sketches of flying machines, a globe and a" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Leonardo da Vinci was a <mark class="vc-hl">polymath</mark>: a painter, an inventor and a scientist.</p></div></div>
      </div></div>
    `
  },
  117: {
    questext: "Select the most appropriate synonym of the given word.\nPolymath",
    options: ["Ignoramus", "Scholar", "Polygraph", "Novice"],
    correct: "2",
    exptext: "✅ A polymath knows many subjects, so scholar is the closest word. 📌 Poly means many and math means learning. ❌ Ignoramus is wrong because it means an ignorant person."
  },
  118: {
    questext: "Select the most appropriate option to fill in the blank.\nLeonardo da Vinci was a true ______ who excelled in painting, science, engineering and music.",
    options: ["amateur", "novice", "layman", "polymath"],
    correct: "4",
    exptext: "✅ Polymath fits because he mastered many fields. 📌 Poly = many. ❌ Novice is wrong because a novice is a beginner."
  },
  119: {
    type: "concept", icon: "🎹", accent: "#6831d8", pauseTimer: true,
    title: "Prodigy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:104,49,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A young person with an amazing natural talent.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">चमत्कारी बालक, विलक्षण प्रतिभा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">genius</li><li class="vc-chip">wonder</li><li class="vc-chip">marvel</li><li class="vc-chip">whiz</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">dunce</li><li class="vc-chip">dullard</li><li class="vc-chip">mediocrity</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The child <b>prodigy</b> played the piano on stage when she was only six. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A chess <b>prodigy</b>, he defeated experienced masters while still in school.</p></li><li><span class="vc-n">3</span><p class="vc-s">The village was proud of its young <b>prodigy</b>, who solved problems nobody else could.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/40.png" alt="Illustration of the word prodigy: a six-year-old girl playing a grand piano on a stage while an amazed adult audience watches." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The child <mark class="vc-hl">prodigy</mark> played the piano on stage when she was only six.</p></div></div>
      </div></div>
    `
  },
  120: {
    questext: "Select the most appropriate antonym of the given word.\nProdigy",
    options: ["Dunce", "Genius", "Marvel", "Wonder"],
    correct: "1",
    exptext: "✅ A prodigy has amazing talent, so a dunce, who is slow to learn, is the opposite. 📌 Prodigy dazzles; dunce lags. ❌ Genius is wrong because it is a synonym."
  },
  121: {
    questext: "Select the most appropriate option to fill in the blank.\nAt just ten years old, the ______ composed a full symphony.",
    options: ["novice", "dunce", "prodigy", "bigot"],
    correct: "3",
    exptext: "✅ Prodigy fits because a ten-year-old composing a symphony shows amazing talent. 📌 Prodigy = wonder child. ❌ Novice is wrong because a novice is a beginner."
  },
  122: {
    type: "concept", icon: "✊", accent: "#4bdd50", pauseTimer: true,
    title: "Dissident",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,80;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who openly opposes the government or official ideas.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">असंतुष्ट व्यक्ति, विरोधी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dissenter</li><li class="vc-chip">protester</li><li class="vc-chip">rebel</li><li class="vc-chip">objector</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">supporter</li><li class="vc-chip">loyalist</li><li class="vc-chip">conformist</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>dissident</b> was jailed for criticising the ruler's policies in newspapers.</p></li><li><span class="vc-n">2</span><p class="vc-s">Writers and <b>dissidents</b> often face danger when they speak against power.</p></li><li><span class="vc-n">3</span><p class="vc-s">Millions admired the <b>dissident</b> who stood alone against the powerful regime. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/41.png" alt="Illustration of the word dissident: a lone man holding a lantern standing bravely in a town square before a line of grim officials." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Millions admired the <mark class="vc-hl">dissident</mark> who stood alone against the powerful regime.</p></div></div>
      </div></div>
    `
  },
  123: {
    questext: "Select the most appropriate synonym of the given word.\nDissident",
    options: ["Loyalist", "Dissenter", "Resident", "President"],
    correct: "2",
    exptext: "✅ A dissident openly opposes official ideas, so dissenter is the closest word. 📌 Dis plus sidere, to sit apart. ❌ Loyalist is wrong because a loyalist supports those in power."
  },
  124: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ was jailed for openly criticising the government's policies in newspapers.",
    options: ["admirer", "loyalist", "supporter", "dissident"],
    correct: "4",
    exptext: "✅ Dissident fits because the person openly opposed the government. 📌 Dissident = sits apart. ❌ Supporter is wrong because a supporter would not criticise the government."
  },
  125: {
    type: "concept", icon: "📖", accent: "#c5264e", pauseTimer: true,
    title: "Tale",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,78;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A story, usually about imaginary or past events.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कहानी, कथा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">story</li><li class="vc-chip">narrative</li><li class="vc-chip">legend</li><li class="vc-chip">fable</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Grandmother told us a <b>tale</b> of a clever fox every night. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The newspaper printed a sad <b>tale</b> of a family that lost its home in the flood.</p></li><li><span class="vc-n">3</span><p class="vc-s">Ancient <b>tales</b> of kings and heroes were passed on by village singers.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/42.png" alt="Illustration of the word tale: a grandmother telling a story to wide-eyed children sitting around a lamp in a cosy room." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Grandmother told us a <mark class="vc-hl">tale</mark> of a clever fox every night.</p></div></div>
      </div></div>
    `
  },
  126: {
    questext: "Select the most appropriate synonym of the given word.\nTale",
    options: ["Story", "Dispute", "Tail", "Debt"],
    correct: "1",
    exptext: "✅ A tale is a story, so story is the closest word. 📌 Tale and tail sound the same, but only tale means story. ❌ Dispute is wrong because it means an argument."
  },
  127: {
    questext: "Select the most appropriate option to fill in the blank.\nGrandmother told us an old ______ about a clever fox and a crow before bedtime.",
    options: ["remedy", "dispute", "tale", "verdict"],
    correct: "3",
    exptext: "✅ Tale fits because the fox and crow make a bedtime story. 📌 Tale = story. ❌ Verdict is wrong because it means a decision in court."
  },
  128: {
    type: "concept", icon: "🦕", accent: "#318cd8", pauseTimer: true,
    title: "Antediluvian",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,140,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Very old-fashioned, as if from before the great flood.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अति प्राचीन, पुराने ज़माने का</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">ancient</li><li class="vc-chip">primitive</li><li class="vc-chip">prehistoric</li><li class="vc-chip">archaic</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">modern</li><li class="vc-chip">new</li><li class="vc-chip">up-to-date</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">His <b>antediluvian</b> ideas about women's education surprised the modern audience.</p></li><li><span class="vc-n">2</span><p class="vc-s">The office still used <b>antediluvian</b> machines that were slow and noisy. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Critics called the law <b>antediluvian</b> and demanded a modern replacement.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/43.png" alt="Illustration of the word antediluvian: an old office full of huge noisy typewriters and machines with bored workers." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The office still used <mark class="vc-hl">antediluvian</mark> machines that were slow and noisy.</p></div></div>
      </div></div>
    `
  },
  129: {
    questext: "Select the most appropriate synonym of the given word.\nAntediluvian",
    options: ["Modern", "Ancient", "Antiseptic", "Useful"],
    correct: "2",
    exptext: "✅ Antediluvian means extremely old, so ancient is the closest word. 📌 Ante means before and diluvium means flood. ❌ Modern is wrong because it means new."
  },
  130: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ computer in the office, built before most people were born, still ran on cassette tapes.",
    options: ["advanced", "modern", "latest", "antediluvian"],
    correct: "4",
    exptext: "✅ Antediluvian fits because the computer was extremely old. 📌 Ante = before the flood. ❌ Modern is wrong because a modern computer would not use cassette tapes."
  },
  131: {
    type: "concept", icon: "💬", accent: "#c5dd4b", pauseTimer: true,
    title: "Maxim",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A short saying that gives a rule or a general truth.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सूक्ति, कहावत</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">proverb</li><li class="vc-chip">adage</li><li class="vc-chip">saying</li><li class="vc-chip">axiom</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">'Honesty is the best policy' is a <b>maxim</b> every child learns at school.</p></li><li><span class="vc-n">2</span><p class="vc-s">The old teacher lived by the <b>maxim</b> that hard work beats talent. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Writers often begin chapters with a wise <b>maxim</b> from a famous thinker.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/44.png" alt="Illustration of the word maxim: an old teacher smiling at his desk while a few students listen to him in a sunny classroom." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The old teacher lived by the <mark class="vc-hl">maxim</mark> that hard work beats talent.</p></div></div>
      </div></div>
    `
  },
  132: {
    questext: "Select the most appropriate synonym of the given word.\nMaxim",
    options: ["Adage", "Rumour", "Maximum", "Remedy"],
    correct: "1",
    exptext: "✅ A maxim is a short saying that gives a rule of life, so adage is the closest word. 📌 Maxim is a max of wisdom in a few words. ❌ Rumour is wrong because it is unproved talk."
  },
  133: {
    questext: "Select the most appropriate option to fill in the blank.\nThe saying that honesty is the best policy is a well-known ______ that teaches a rule for life.",
    options: ["dispute", "rumour", "maxim", "remedy"],
    correct: "3",
    exptext: "✅ Maxim fits because it is a short saying that gives a rule. 📌 Maxim = short rule. ❌ Rumour is wrong because a rumour is unproved news."
  },
  134: {
    type: "concept", icon: "🎙️", accent: "#b026c5", pauseTimer: true,
    title: "Pundit",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:176,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who is an expert and often gives opinions in public.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">विद्वान, पंडित</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">expert</li><li class="vc-chip">authority</li><li class="vc-chip">scholar</li><li class="vc-chip">sage</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">novice</li><li class="vc-chip">layman</li><li class="vc-chip">amateur</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">A political <b>pundit</b> explained the election result on the television news. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The cricket <b>pundit</b> predicted a win for the home team.</p></li><li><span class="vc-n">3</span><p class="vc-s">Local <b>pundits</b> gathered in the temple to explain the ancient texts.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/45.png" alt="Illustration of the word pundit: a well-dressed commentator speaking in a TV studio with unlabeled bar charts glowing behind him." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A political <mark class="vc-hl">pundit</mark> explained the election result on the television news.</p></div></div>
      </div></div>
    `
  },
  135: {
    questext: "Select the most appropriate synonym of the given word.\nPundit",
    options: ["Novice", "Expert", "Pedant", "Amateur"],
    correct: "2",
    exptext: "✅ A pundit is an expert, so expert is the closest word. 📌 Pundit comes from a Hindi word for a learned person. ❌ Novice is wrong because it means a beginner."
  },
  136: {
    questext: "Select the most appropriate option to fill in the blank.\nThe television channel invited a political ______ to explain the budget to viewers.",
    options: ["beginner", "novice", "amateur", "pundit"],
    correct: "4",
    exptext: "✅ Pundit fits because an expert was needed to explain the budget. 📌 Pundit = learned expert. ❌ Novice is wrong because a novice has little knowledge."
  },
  137: {
    type: "concept", icon: "🕵️", accent: "#31d891", pauseTimer: true,
    title: "Meddler",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,216,145;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who interferes in other people's affairs without being asked.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दख़लंदाज़ी करने वाला, टांग अड़ाने वाला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">busybody</li><li class="vc-chip">interferer</li><li class="vc-chip">intruder</li><li class="vc-chip">snoop</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">bystander</li><li class="vc-chip">onlooker</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The neighbour was a <b>meddler</b> who gave advice about everyone's family matters. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">No one likes a <b>meddler</b> who pokes into private decisions.</p></li><li><span class="vc-n">3</span><p class="vc-s">He called the officer a <b>meddler</b> for interfering in a settled dispute.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/46.png" alt="Illustration of the word meddler: a nosy neighbour leaning over a garden fence listening to a family's conversation." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The neighbour was a <mark class="vc-hl">meddler</mark> who gave advice about everyone's family matters.</p></div></div>
      </div></div>
    `
  },
  138: {
    questext: "Select the most appropriate antonym of the given word.\nMeddler",
    options: ["Bystander", "Busybody", "Intruder", "Snoop"],
    correct: "1",
    exptext: "✅ A meddler interferes in others' affairs, so a bystander, who only watches, is the opposite. 📌 Meddler jumps in; bystander stands by. ❌ Busybody is wrong because it is a synonym."
  },
  139: {
    questext: "Select the most appropriate option to fill in the blank.\nNobody invited the ______ to the meeting, yet he kept giving orders.",
    options: ["guest", "bystander", "meddler", "onlooker"],
    correct: "3",
    exptext: "✅ Meddler fits because he interfered without being asked. 📌 Meddler = mixes in. ❌ Guest is wrong because a guest is invited."
  },
  140: {
    type: "concept", icon: "🚷", accent: "#dd754b", pauseTimer: true,
    title: "Interloper",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,117,75;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who enters a place or group where he is not wanted.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">घुसपैठिया, अनधिकृत व्यक्ति</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">intruder</li><li class="vc-chip">trespasser</li><li class="vc-chip">outsider</li><li class="vc-chip">gatecrasher</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">insider</li><li class="vc-chip">member</li><li class="vc-chip">host</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The guard stopped the <b>interloper</b> who tried to join the private party. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">She felt like an <b>interloper</b> at the family function of strangers.</p></li><li><span class="vc-n">3</span><p class="vc-s">Wildlife officers removed the <b>interloper</b> from the protected forest.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/47.png" alt="Illustration of the word interloper: a guard stopping a casually dressed man at the entrance of an elegant party." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The guard stopped the <mark class="vc-hl">interloper</mark> who tried to join the private party.</p></div></div>
      </div></div>
    `
  },
  141: {
    questext: "Select the most appropriate synonym of the given word.\nInterloper",
    options: ["Host", "Intruder", "Interviewer", "Insider"],
    correct: "2",
    exptext: "✅ An interloper enters where he is not wanted, so intruder is the closest word. 📌 Inter means between and loper means runner. ❌ Host is wrong because a host welcomes people."
  },
  142: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who enters a place or group where he is not wanted",
    options: ["Guest", "Insider", "Host", "Interloper"],
    correct: "4",
    exptext: "✅ Interloper means a person who enters where he is not wanted. 📌 Interloper = runs in between. ❌ Guest is wrong because a guest is invited."
  },
  143: {
    type: "concept", icon: "🧀", accent: "#2627c5", pauseTimer: true,
    title: "Epicure",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,39,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who enjoys fine food and drink and chooses carefully.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">खाने-पीने का शौकीन, रसिक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">gourmet</li><li class="vc-chip">foodie</li><li class="vc-chip">connoisseur</li><li class="vc-chip">gastronome</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">ascetic</li><li class="vc-chip">abstainer</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">As an <b>epicure</b>, he travelled the world to taste rare cheeses and fine wines.</p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>epicure</b> sent back the dish because the sauce lacked balance. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Only a true <b>epicure</b> can tell the difference between two types of tea.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/48.png" alt="Illustration of the word epicure: a refined gentleman in a restaurant tasting a spoonful from a dish with a thoughtful frown while a waiter " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">epicure</mark> sent back the dish because the sauce lacked balance.</p></div></div>
      </div></div>
    `
  },
  144: {
    questext: "Select the most appropriate antonym of the given word.\nEpicure",
    options: ["Ascetic", "Gourmet", "Gastronome", "Foodie"],
    correct: "1",
    exptext: "✅ An epicure enjoys fine food and drink, so an ascetic, who avoids pleasures, is the opposite. 📌 Epicure eats well; ascetic gives up. ❌ Gourmet is wrong because it is a synonym."
  },
  145: {
    questext: "Select the most appropriate option to fill in the blank.\nThe rich ______ travelled across the world only to taste the finest dishes and wines.",
    options: ["hermit", "ascetic", "epicure", "miser"],
    correct: "3",
    exptext: "✅ Epicure fits because he travelled for fine food and wine. 📌 Epicure = fine taste. ❌ Ascetic is wrong because an ascetic avoids luxury."
  },
  146: {
    type: "concept", icon: "🛋️", accent: "#63d831", pauseTimer: true,
    title: "Sybarite",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:99,216,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who loves luxury and pleasure very much.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">विलासी, ऐश-पसंद</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">hedonist</li><li class="vc-chip">voluptuary</li><li class="vc-chip">pleasure-seeker</li><li class="vc-chip">epicure</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">ascetic</li><li class="vc-chip">puritan</li><li class="vc-chip">stoic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>sybarite</b> lived in a palace with silk beds and a personal chef. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A true <b>sybarite</b>, she spent holidays only in five-star resorts and spas.</p></li><li><span class="vc-n">3</span><p class="vc-s">The monk was no <b>sybarite</b>; he slept on the floor and ate simply.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/49.png" alt="Illustration of the word sybarite: a man reclining on silk cushions in a luxurious palace room while a chef serves platters." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">sybarite</mark> lived in a palace with silk beds and a personal chef.</p></div></div>
      </div></div>
    `
  },
  147: {
    questext: "Select the most appropriate synonym of the given word.\nSybarite",
    options: ["Ascetic", "Hedonist", "Satirist", "Soldier"],
    correct: "2",
    exptext: "✅ A sybarite loves luxury and pleasure, so hedonist is the closest word. 📌 Sybaris was an ancient city famous for luxury. ❌ Ascetic is wrong because an ascetic avoids pleasure."
  },
  148: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ lay on silk cushions every day, enjoying costly perfumes and rich meals.",
    options: ["stoic", "ascetic", "puritan", "sybarite"],
    correct: "4",
    exptext: "✅ Sybarite fits because the person loved luxury and pleasure. 📌 Sybarite = luxury lover. ❌ Ascetic is wrong because an ascetic gives up luxury."
  },
  149: {
    type: "concept", icon: "🥂", accent: "#dd4ba1", pauseTimer: true,
    title: "Hedonist",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,75,161;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who thinks pleasure is the main goal of life.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">भोगवादी, सुखवादी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">sybarite</li><li class="vc-chip">pleasure-seeker</li><li class="vc-chip">libertine</li><li class="vc-chip">epicurean</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">ascetic</li><li class="vc-chip">puritan</li><li class="vc-chip">stoic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>hedonist</b> spent his whole salary on parties and holidays every month. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>hedonist</b> lives for the moment and avoids all pain and effort.</p></li><li><span class="vc-n">3</span><p class="vc-s">Poets often described the rich prince as a careless <b>hedonist</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/50.png" alt="Illustration of the word hedonist: a happy young man at a lavish party with dancing friends and colourful drinks." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">hedonist</mark> spent his whole salary on parties and holidays every month.</p></div></div>
      </div></div>
    `
  },
  150: {
    questext: "Select the most appropriate antonym of the given word.\nHedonist",
    options: ["Ascetic", "Sybarite", "Libertine", "Epicurean"],
    correct: "1",
    exptext: "✅ A hedonist seeks pleasure, so an ascetic, who gives up pleasure, is the opposite. 📌 Hedonist indulges; ascetic denies. ❌ Sybarite is wrong because it is a synonym."
  },
  151: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who thinks pleasure is the main goal of life",
    options: ["Stoic", "Ascetic", "Hedonist", "Pessimist"],
    correct: "3",
    exptext: "✅ Hedonist means a person who believes pleasure is the main goal of life. 📌 Hedone is Greek for pleasure. ❌ Ascetic is wrong because an ascetic avoids pleasure."
  },
  152: {
    type: "concept", icon: "🎉", accent: "#26b2c5", pauseTimer: true,
    title: "Reveler",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,178,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who enjoys lively parties and noisy celebrations.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मौज-मस्ती करने वाला, उत्सव मनाने वाला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">partygoer</li><li class="vc-chip">merrymaker</li><li class="vc-chip">celebrant</li><li class="vc-chip">carouser</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">killjoy</li><li class="vc-chip">spoilsport</li><li class="vc-chip">recluse</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Thousands of <b>revelers</b> filled the streets on the night of the festival. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>reveler</b> danced until sunrise at his friend's wedding.</p></li><li><span class="vc-n">3</span><p class="vc-s">The quiet town woke to the songs of happy <b>revelers</b> returning home.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/51.png" alt="Illustration of the word reveler: crowds of people dancing in a festival street under hanging lanterns at night." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Thousands of <mark class="vc-hl">revelers</mark> filled the streets on the night of the festival.</p></div></div>
      </div></div>
    `
  },
  153: {
    questext: "Select the most appropriate synonym of the given word.\nReveler",
    options: ["Killjoy", "Merrymaker", "Reviewer", "Referee"],
    correct: "2",
    exptext: "✅ A reveler enjoys lively celebrations, so merrymaker is the closest word. 📌 Reveler and revel go together. ❌ Killjoy is wrong because a killjoy spoils the fun."
  },
  154: {
    questext: "Select the most appropriate option to fill in the blank.\nAt the festival, every ______ danced and sang in the streets till midnight.",
    options: ["recluse", "killjoy", "spoilsport", "reveler"],
    correct: "4",
    exptext: "✅ Reveler fits because the person enjoyed the festival. 📌 Reveler = joins the revel. ❌ Recluse is wrong because a recluse avoids crowds."
  },
  155: {
    type: "concept", icon: "🍗", accent: "#d8bb31", pauseTimer: true,
    title: "Glutton",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,187,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who eats far too much and is greedy for it.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पेटू, ख़ाऊ</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">gourmand</li><li class="vc-chip">overeater</li><li class="vc-chip">gormandizer</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">ascetic</li><li class="vc-chip">faster</li><li class="vc-chip">abstainer</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>glutton</b> ate five plates of rice and still asked for more.</p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>glutton</b> for sweets, the boy emptied the whole jar in one evening.</p></li><li><span class="vc-n">3</span><p class="vc-s">The king, a known <b>glutton</b>, ordered a feast of twenty dishes for himself. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/52.png" alt="Illustration of the word glutton: a plump king at a long banquet table piled with twenty dishes, reaching for more food." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The king, a known <mark class="vc-hl">glutton</mark>, ordered a feast of twenty dishes for himself.</p></div></div>
      </div></div>
    `
  },
  156: {
    questext: "Select the most appropriate antonym of the given word.\nGlutton",
    options: ["Faster", "Gourmand", "Overeater", "Gormandizer"],
    correct: "1",
    exptext: "✅ A glutton eats far too much, so a faster, who goes without food, is the opposite. 📌 Glutton gulps; faster goes without. ❌ Overeater is wrong because it is a synonym."
  },
  157: {
    questext: "Select the most appropriate option to fill in the blank.\nThe ______ ate five plates of rice and three desserts and still asked for more.",
    options: ["abstainer", "faster", "glutton", "ascetic"],
    correct: "3",
    exptext: "✅ Glutton fits because the person ate far too much and wanted more. 📌 Glutton = gulps. ❌ Faster is wrong because a faster eats little or nothing."
  },
  158: {
    type: "concept", icon: "🖼️", accent: "#994bdd", pauseTimer: true,
    title: "Aesthete",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:153,75,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who loves and values beauty, especially in art.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सौंदर्य-प्रेमी, कलाप्रेमी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">art lover</li><li class="vc-chip">connoisseur</li><li class="vc-chip">lover of beauty</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">philistine</li><li class="vc-chip">barbarian</li><li class="vc-chip">boor</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>aesthete</b> spent hours in the gallery admiring a single painting. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">As an <b>aesthete</b>, she chose every cup and curtain in her home with care.</p></li><li><span class="vc-n">3</span><p class="vc-s">Only an <b>aesthete</b> could notice the delicate curve in the old temple carving.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/53.png" alt="Illustration of the word aesthete: a person standing before a large abstract painting in a quiet gallery, studying it closely in soft light." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">aesthete</mark> spent hours in the gallery admiring a single painting.</p></div></div>
      </div></div>
    `
  },
  159: {
    questext: "Select the most appropriate synonym of the given word.\nAesthete",
    options: ["Philistine", "Art lover", "Athlete", "Architect"],
    correct: "2",
    exptext: "✅ An aesthete values beauty, so art lover is the closest phrase. 📌 Aesthetic means about beauty. ❌ Philistine is wrong because a philistine has no taste for art."
  },
  160: {
    questext: "Select the most appropriate option to fill in the blank.\nA true ______, she spent hours in the museum admiring the beauty of each painting.",
    options: ["boor", "philistine", "barbarian", "aesthete"],
    correct: "4",
    exptext: "✅ Aesthete fits because she loves and values beauty. 📌 Aesthete = beauty lover. ❌ Philistine is wrong because a philistine does not care for art."
  },
  161: {
    type: "concept", icon: "🍷", accent: "#26c54c", pauseTimer: true,
    title: "Connoisseur",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,76;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person with great knowledge and good taste in art, food or wine.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पारखी, जानकार</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">expert</li><li class="vc-chip">authority</li><li class="vc-chip">specialist</li><li class="vc-chip">aficionado</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">novice</li><li class="vc-chip">amateur</li><li class="vc-chip">layman</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The wine <b>connoisseur</b> could name the village by tasting one sip.</p></li><li><span class="vc-n">2</span><p class="vc-s">A true art <b>connoisseur</b>, he knew every painter in the museum by style. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Tea <b>connoisseurs</b> pay high prices for rare leaves from the mountain gardens.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/54.png" alt="Illustration of the word connoisseur: a man in a suit holding a wine glass up to the light in a cellar, studying its colour." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A true art <mark class="vc-hl">connoisseur</mark>, he knew every painter in the museum by style.</p></div></div>
      </div></div>
    `
  },
  162: {
    questext: "Select the most appropriate antonym of the given word.\nConnoisseur",
    options: ["Novice", "Expert", "Authority", "Specialist"],
    correct: "1",
    exptext: "✅ A connoisseur is a skilled judge, so a novice, who is a beginner, is the opposite. 📌 Connoisseur knows; novice learns. ❌ Expert is wrong because it is a synonym."
  },
  163: {
    questext: "Select the most appropriate option to fill in the blank.\nA ______ of classical music, she could name each raga after the first few notes.",
    options: ["glutton", "novice", "connoisseur", "reveler"],
    correct: "3",
    exptext: "✅ Connoisseur fits because she is an expert who could name each raga. 📌 Connoisseur = knows well. ❌ Novice is wrong because a beginner could not name them."
  },
  164: {
    type: "concept", icon: "🕳️", accent: "#d83139", pauseTimer: true,
    title: "Abyss",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,57;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A very deep hole or space that seems to have no bottom.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अथाह खाई, रसातल</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">chasm</li><li class="vc-chip">gulf</li><li class="vc-chip">void</li><li class="vc-chip">pit</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">peak</li><li class="vc-chip">summit</li><li class="vc-chip">height</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">He looked down into the <b>abyss</b> below the narrow mountain bridge.</p></li><li><span class="vc-n">2</span><p class="vc-s">After losing everything, the family felt they were falling into an <b>abyss</b> of despair.</p></li><li><span class="vc-n">3</span><p class="vc-s">Divers explored the dark ocean <b>abyss</b> where sunlight never reaches. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/55.png" alt="Illustration of the word abyss: scuba divers with torches descending into a dark deep ocean trench with faint blue light." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Divers explored the dark ocean <mark class="vc-hl">abyss</mark> where sunlight never reaches.</p></div></div>
      </div></div>
    `
  },
  165: {
    questext: "Select the most appropriate synonym of the given word.\nAbyss",
    options: ["Summit", "Chasm", "Abbey", "Plateau"],
    correct: "2",
    exptext: "✅ An abyss is a very deep hole, so chasm is the closest word. 📌 A means without and byssos means bottom. ❌ Summit is wrong because it is the top of a mountain."
  },
  166: {
    questext: "Select the most appropriate option to fill in the blank.\nThe climber looked down into the dark ______ below the cliff and could not see the bottom.",
    options: ["ridge", "summit", "peak", "abyss"],
    correct: "4",
    exptext: "✅ Abyss fits because it is a deep space with no visible bottom. 📌 Abyss = no bottom. ❌ Summit is wrong because it is the top, not a deep hole."
  },
  167: {
    type: "concept", icon: "🧊", accent: "#4b7ddd", pauseTimer: true,
    title: "Crevasse",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,125,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A deep crack in thick ice, especially on a glacier.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">हिमदरार, बर्फ़ की गहरी दरार</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">fissure</li><li class="vc-chip">crack</li><li class="vc-chip">cleft</li><li class="vc-chip">chasm</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The climbers tied a rope to cross the dangerous <b>crevasse</b> safely. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A hidden <b>crevasse</b> swallowed the snow bridge during the heavy storm.</p></li><li><span class="vc-n">3</span><p class="vc-s">The guide warned them of every <b>crevasse</b> along the glacier.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/56.png" alt="Illustration of the word crevasse: mountaineers roped together crossing a blue-ice crack on a glacier with snowy peaks behind." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The climbers tied a rope to cross the dangerous <mark class="vc-hl">crevasse</mark> safely.</p></div></div>
      </div></div>
    `
  },
  168: {
    questext: "Select the most appropriate synonym of the given word.\nCrevasse",
    options: ["Fissure", "Summit", "Crescent", "Dome"],
    correct: "1",
    exptext: "✅ A crevasse is a deep crack in ice, so fissure is the closest word. 📌 Crevasse comes from the same root as crevice. ❌ Summit is wrong because it is a mountain top."
  },
  169: {
    questext: "Select the most appropriate option to fill in the blank.\nThe mountaineer fell into a deep ______ hidden under fresh snow on the glacier.",
    options: ["dune", "summit", "crevasse", "meadow"],
    correct: "3",
    exptext: "✅ Crevasse fits because it is a deep crack in a glacier. 📌 Crevasse = ice crack. ❌ Summit is wrong because it is a high point and one cannot fall into it."
  },
  170: {
    type: "concept", icon: "🏞️", accent: "#8ac526", pauseTimer: true,
    title: "Gorge",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:138,197,38;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A narrow valley with steep rocky sides, often with a river.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">तंग घाटी, दर्रा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">ravine</li><li class="vc-chip">canyon</li><li class="vc-chip">gully</li><li class="vc-chip">valley</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The river rushes through a deep <b>gorge</b> before reaching the plains.</p></li><li><span class="vc-n">2</span><p class="vc-s">Tourists took photos from the bridge over the narrow <b>gorge</b>. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The ancient fort stood at the edge of a rocky <b>gorge</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/57.png" alt="Illustration of the word gorge: tourists on a bridge taking photos of a deep narrow rocky gorge with a river far below." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Tourists took photos from the bridge over the narrow <mark class="vc-hl">gorge</mark>.</p></div></div>
      </div></div>
    `
  },
  171: {
    questext: "Select the most appropriate synonym of the given word.\nGorge",
    options: ["Plateau", "Ravine", "Gauge", "Meadow"],
    correct: "2",
    exptext: "✅ A gorge is a narrow valley with steep sides, so ravine is the closest word. 📌 Gorge means throat, narrow and deep. ❌ Plateau is wrong because it is a flat high land."
  },
  172: {
    questext: "Select the most appropriate option to fill in the blank.\nThe river flows through a narrow ______ with steep rocky walls on both sides.",
    options: ["delta", "plateau", "meadow", "gorge"],
    correct: "4",
    exptext: "✅ Gorge fits because it is a narrow valley between steep walls. 📌 Gorge = narrow throat of rock. ❌ Plateau is wrong because it is flat."
  },
  173: {
    type: "concept", icon: "👎", accent: "#d831cb", pauseTimer: true,
    title: "Censure",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,203;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Strong and formal criticism or disapproval.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">निंदा, भर्त्सना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">criticism</li><li class="vc-chip">condemnation</li><li class="vc-chip">rebuke</li><li class="vc-chip">reproach</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">praise</li><li class="vc-chip">applause</li><li class="vc-chip">approval</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The committee passed a motion of <b>censure</b> against the careless official. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The press raised a storm of <b>censure</b> against the minister's remark.</p></li><li><span class="vc-n">3</span><p class="vc-s">The film received widespread <b>censure</b> for its careless treatment of history.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/58.png" alt="Illustration of the word censure: committee members at a table raising hands to vote while an official bows his head, stern faces." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The committee passed a motion of <mark class="vc-hl">censure</mark> against the careless official.</p></div></div>
      </div></div>
    `
  },
  174: {
    questext: "Select the most appropriate antonym of the given word.\nCensure",
    options: ["Praise", "Condemnation", "Rebuke", "Reproach"],
    correct: "1",
    exptext: "✅ Censure means strong criticism, so praise is the opposite. 📌 Censure blames; praise lifts. ❌ Condemnation is wrong because it is a synonym."
  },
  175: {
    questext: "Select the most appropriate option to fill in the blank.\nThe committee passed a motion of ______ against the officer for misusing public funds.",
    options: ["applause", "praise", "censure", "approval"],
    correct: "3",
    exptext: "✅ Censure fits because the committee formally criticised the officer. 📌 Censure = formal blame. ❌ Approval is wrong because misuse of funds does not earn approval."
  },
  176: {
    type: "concept", icon: "📢", accent: "#4bddbd", pauseTimer: true,
    title: "Denunciation",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,189;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Public criticism that strongly condemns someone or something.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">सार्वजनिक निंदा, आरोप</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">condemnation</li><li class="vc-chip">accusation</li><li class="vc-chip">censure</li><li class="vc-chip">criticism</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">praise</li><li class="vc-chip">endorsement</li><li class="vc-chip">approval</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The leader's <b>denunciation</b> of corruption won applause from the crowd. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">A sharp <b>denunciation</b> of the cruel rule appeared on the front page.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her <b>denunciation</b> of the crime made the police act quickly.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/59.png" alt="Illustration of the word denunciation: a leader at a podium pointing firmly while a large crowd claps in an open ground with plain flags." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The leader's <mark class="vc-hl">denunciation</mark> of corruption won applause from the crowd.</p></div></div>
      </div></div>
    `
  },
  177: {
    questext: "Select the most appropriate synonym of the given word.\nDenunciation",
    options: ["Praise", "Condemnation", "Announcement", "Explanation"],
    correct: "2",
    exptext: "✅ Denunciation is strong public criticism, so condemnation is the closest word. 📌 Denounce means to speak out against. ❌ Praise is wrong because it is the opposite."
  },
  178: {
    questext: "Select the most appropriate option to fill in the blank.\nThe public ______ of the scam forced the minister to resign.",
    options: ["applause", "endorsement", "praise", "denunciation"],
    correct: "4",
    exptext: "✅ Denunciation fits because strong public criticism forced the resignation. 📌 Denunciation = speak out against. ❌ Praise is wrong because praise would not force a resignation."
  },
  179: {
    type: "concept", icon: "⚖️", accent: "#c57426", pauseTimer: true,
    title: "Indictment",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,116,38;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A formal written charge saying a person has committed a crime.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अभियोग, आरोप-पत्र</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">charge</li><li class="vc-chip">accusation</li><li class="vc-chip">allegation</li><li class="vc-chip">impeachment</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">acquittal</li><li class="vc-chip">exoneration</li><li class="vc-chip">vindication</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The court read out the <b>indictment</b> against the accused before the trial began. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The grand jury issued an <b>indictment</b> for fraud against the company head.</p></li><li><span class="vc-n">3</span><p class="vc-s">The report was a serious <b>indictment</b> of the failing school system.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/60.png" alt="Illustration of the word indictment: a courtroom where a judge reads papers aloud, an accused stands, lawyers sit around." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The court read out the <mark class="vc-hl">indictment</mark> against the accused before the trial began.</p></div></div>
      </div></div>
    `
  },
  180: {
    questext: "Select the most appropriate antonym of the given word.\nIndictment",
    options: ["Acquittal", "Charge", "Allegation", "Accusation"],
    correct: "1",
    exptext: "✅ An indictment is a formal charge, so an acquittal, which declares a person not guilty, is the opposite. 📌 Indictment accuses; acquittal clears. ❌ Charge is wrong because it is a synonym."
  },
  181: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA formal written charge saying that a person has committed a crime",
    options: ["Amnesty", "Verdict", "Indictment", "Acquittal"],
    correct: "3",
    exptext: "✅ Indictment is a formal written charge of a crime. 📌 Indict means to charge. ❌ Verdict is wrong because it is the court's final decision."
  },
  182: {
    type: "concept", icon: "🗃️", accent: "#5331d8", pauseTimer: true,
    title: "Abeyance",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:83,49,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A state of being put aside for some time and not active.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">निलंबन, स्थगन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">suspension</li><li class="vc-chip">dormancy</li><li class="vc-chip">postponement</li><li class="vc-chip">pause</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">activity</li><li class="vc-chip">continuation</li><li class="vc-chip">operation</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The project was held in <b>abeyance</b> until the funds were released.</p></li><li><span class="vc-n">2</span><p class="vc-s">The law remained in <b>abeyance</b> for years because no one enforced it.</p></li><li><span class="vc-n">3</span><p class="vc-s">He kept his plans in <b>abeyance</b> while waiting for the exam result. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/61.png" alt="Illustration of the word abeyance: an anxious young man at a desk with his plans papers put away in a drawer, waiting beside his phone." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">He kept his plans in <mark class="vc-hl">abeyance</mark> while waiting for the exam result.</p></div></div>
      </div></div>
    `
  },
  183: {
    questext: "Select the most appropriate synonym of the given word.\nAbeyance",
    options: ["Activity", "Suspension", "Obedience", "Completion"],
    correct: "2",
    exptext: "✅ Abeyance means being put aside for some time, so suspension is the closest word. 📌 Abeyance = on hold. ❌ Activity is wrong because it means being in action."
  },
  184: {
    questext: "Select the most appropriate option to fill in the blank.\nThe plan to build the new road is in ______ until the court gives its decision.",
    options: ["action", "operation", "progress", "abeyance"],
    correct: "4",
    exptext: "✅ Abeyance fits because the plan is on hold. 📌 Abeyance = on hold. ❌ Progress is wrong because a plan in progress is moving forward."
  },
  185: {
    type: "concept", icon: "🌋", accent: "#58dd4b", pauseTimer: true,
    title: "Dormancy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:88,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A time of being inactive, as if asleep, but able to wake later.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">निष्क्रियता, सुप्तावस्था</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">inactivity</li><li class="vc-chip">inertia</li><li class="vc-chip">hibernation</li><li class="vc-chip">abeyance</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">activity</li><li class="vc-chip">activeness</li><li class="vc-chip">growth</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The seeds stayed in <b>dormancy</b> until the first rains arrived.</p></li><li><span class="vc-n">2</span><p class="vc-s">After years of <b>dormancy</b>, the volcano suddenly became active. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The club's <b>dormancy</b> ended when new members joined in the spring.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/62.png" alt="Illustration of the word dormancy: a green-sided volcano with a thin wisp of smoke, villagers farming peacefully below." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">After years of <mark class="vc-hl">dormancy</mark>, the volcano suddenly became active.</p></div></div>
      </div></div>
    `
  },
  186: {
    questext: "Select the most appropriate antonym of the given word.\nDormancy",
    options: ["Activity", "Inactivity", "Hibernation", "Inertia"],
    correct: "1",
    exptext: "✅ Dormancy is a time of being inactive, so activity is the opposite. 📌 Dormant means sleeping. ❌ Inactivity is wrong because it is a synonym."
  },
  187: {
    questext: "Select the most appropriate option to fill in the blank.\nThe volcano's long ______ ended with a loud eruption last night.",
    options: ["growth", "activity", "dormancy", "progress"],
    correct: "3",
    exptext: "✅ Dormancy fits because the volcano was quiet for a long time before erupting. 📌 Dormancy = sleeping time. ❌ Activity is wrong because an eruption ends quiet, not activity."
  },
  188: {
    type: "concept", icon: "🚶", accent: "#c52663", pauseTimer: true,
    title: "Renegade",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:197,38,99;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who leaves his group or side and joins the opposite one.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दल-बदलू, विद्रोही</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">traitor</li><li class="vc-chip">deserter</li><li class="vc-chip">turncoat</li><li class="vc-chip">apostate</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">loyalist</li><li class="vc-chip">patriot</li><li class="vc-chip">follower</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The general called the soldier a <b>renegade</b> after he joined the enemy.</p></li><li><span class="vc-n">2</span><p class="vc-s">The <b>renegade</b> leader broke away from his party and formed a rival group. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">In the film, a <b>renegade</b> detective ignores the rules to catch criminals.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/63.png" alt="Illustration of the word renegade: a man walking out of a group meeting at a table through a door while his colleagues stare angrily." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">renegade</mark> leader broke away from his party and formed a rival group.</p></div></div>
      </div></div>
    `
  },
  189: {
    questext: "Select the most appropriate synonym of the given word.\nRenegade",
    options: ["Loyalist", "Turncoat", "Renovator", "Pioneer"],
    correct: "2",
    exptext: "✅ A renegade leaves his side to join the other, so turncoat is the closest word. 📌 Think of a coat turned inside out. ❌ Loyalist is wrong because a loyalist stays faithful."
  },
  190: {
    questext: "Select the most appropriate option to fill in the blank.\nThe soldier became a ______ and joined the enemy army, turning against his own comrades.",
    options: ["hero", "loyalist", "patriot", "renegade"],
    correct: "4",
    exptext: "✅ Renegade fits because the soldier left his side and joined the enemy. 📌 Renegade = denies his side. ❌ Patriot is wrong because a patriot stays loyal to his country."
  },
  191: {
    type: "concept", icon: "🏺", accent: "#31a2d8", pauseTimer: true,
    title: "Anthropology",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,162,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The study of human beings, their cultures and their past.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">मानव-विज्ञान, नृविज्ञान</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">ethnology</li><li class="vc-chip">ethnography</li><li class="vc-chip">human science</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">She chose <b>anthropology</b> to understand how tribes live and keep their customs.</p></li><li><span class="vc-n">2</span><p class="vc-s">The museum of <b>anthropology</b> displays tools used by early humans. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">His book on <b>anthropology</b> compares marriage customs in distant cultures.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/64.png" alt="Illustration of the word anthropology: a museum hall with glass cases of ancient stone tools and pottery while a student sketches." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The museum of <mark class="vc-hl">anthropology</mark> displays tools used by early humans.</p></div></div>
      </div></div>
    `
  },
  192: {
    questext: "Select the most appropriate synonym of the given word.\nAnthropology",
    options: ["Ethnology", "Astronomy", "Anthology", "Geology"],
    correct: "1",
    exptext: "✅ Anthropology is the study of humans and cultures, so ethnology is the closest word. 📌 Anthropos means human being. ❌ Astronomy is wrong because it is the study of stars."
  },
  193: {
    questext: "Select the most appropriate option to fill in the blank.\nShe studies the customs, languages and past of tribes around the world, so her subject is ______.",
    options: ["geology", "astronomy", "anthropology", "zoology"],
    correct: "3",
    exptext: "✅ Anthropology fits because it is the study of human cultures. 📌 Anthropos = human. ❌ Geology is wrong because it is the study of rocks."
  },
  194: {
    type: "concept", icon: "🦊", accent: "#d8dd4b", pauseTimer: true,
    title: "Allegory",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,221,75;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A story with a hidden meaning that teaches a moral or political idea.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">रूपक-कथा, प्रतीक-कथा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">parable</li><li class="vc-chip">fable</li><li class="vc-chip">symbolic tale</li><li class="vc-chip">analogy</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Orwell's Animal Farm is an <b>allegory</b> about power and greed.</p></li><li><span class="vc-n">2</span><p class="vc-s">The poem is an <b>allegory</b> in which the river stands for life. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Each character in the play is an <b>allegory</b> for a human weakness.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/65.png" alt="Illustration of the word allegory: a calm painterly landscape with a river and a small boat carrying a lone traveller, symbolic mood." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The poem is an <mark class="vc-hl">allegory</mark> in which the river stands for life.</p></div></div>
      </div></div>
    `
  },
  195: {
    questext: "Select the most appropriate synonym of the given word.\nAllegory",
    options: ["Biography", "Parable", "Allergy", "Report"],
    correct: "2",
    exptext: "✅ An allegory is a story with a hidden meaning, so parable is the closest word. 📌 Allegory means speaking in a different way. ❌ Biography is wrong because it is a true life story."
  },
  196: {
    questext: "Select the most appropriate option to fill in the blank.\nIn the novel Animal Farm, the farm animals stand for political leaders, so the book is an ______.",
    options: ["atlas", "autobiography", "encyclopedia", "allegory"],
    correct: "4",
    exptext: "✅ Allegory fits because the story has a hidden political meaning. 📌 Allegory = hidden message. ❌ Atlas is wrong because it is a book of maps."
  },
  197: {
    type: "concept", icon: "🤲", accent: "#9c26c5", pauseTimer: true,
    title: "Clemency",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:156,38,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Mercy shown by a person in power by giving a lighter punishment.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">दया, क्षमा</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">mercy</li><li class="vc-chip">leniency</li><li class="vc-chip">mildness</li><li class="vc-chip">forgiveness</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">cruelty</li><li class="vc-chip">harshness</li><li class="vc-chip">severity</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The judge showed <b>clemency</b> because the thief was a young first-time offender. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The prisoners begged the king for <b>clemency</b> before their sentence.</p></li><li><span class="vc-n">3</span><p class="vc-s">The new governor's <b>clemency</b> towards rebels earned him the people's love.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/66.png" alt="Illustration of the word clemency: a judge looking kindly down at a young man standing with folded hands in a courtroom." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The judge showed <mark class="vc-hl">clemency</mark> because the thief was a young first-time offender.</p></div></div>
      </div></div>
    `
  },
  198: {
    questext: "Select the most appropriate antonym of the given word.\nClemency",
    options: ["Harshness", "Mercy", "Leniency", "Forgiveness"],
    correct: "1",
    exptext: "✅ Clemency means mercy in punishment, so harshness is the opposite. 📌 Clement weather is mild; clemency is mild. ❌ Mercy is wrong because it is a synonym."
  },
  199: {
    questext: "Select the most appropriate option to fill in the blank.\nMoved by his sincere regret, the judge showed ______ and gave him a light punishment.",
    options: ["cruelty", "harshness", "clemency", "severity"],
    correct: "3",
    exptext: "✅ Clemency fits because the judge was merciful. 📌 Clemency = mild justice. ❌ Severity is wrong because a severe judge would give a heavy punishment."
  },
  200: {
    type: "concept", icon: "🔓", accent: "#31d87c", pauseTimer: true,
    title: "Parole",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:49,216,124;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Early release of a prisoner on a promise of good behaviour.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पैरोल, सशर्त रिहाई</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">conditional release</li><li class="vc-chip">early release</li><li class="vc-chip">release on trust</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">imprisonment</li><li class="vc-chip">confinement</li><li class="vc-chip">detention</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The prisoner was freed on <b>parole</b> after serving seven years of his sentence. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">He must report to the police every week while he is on <b>parole</b>.</p></li><li><span class="vc-n">3</span><p class="vc-s">The board refused <b>parole</b> because he showed no change of heart.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/67.png" alt="Illustration of the word parole: a man leaving prison gates carrying a small bag while his family waits with open arms." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The prisoner was freed on <mark class="vc-hl">parole</mark> after serving seven years of his sentence.</p></div></div>
      </div></div>
    `
  },
  201: {
    questext: "Select the most appropriate synonym of the given word.\nParole",
    options: ["Confinement", "Early release", "Parcel", "Promotion"],
    correct: "2",
    exptext: "✅ Parole is early release on good behaviour, so early release is the closest phrase. 📌 Parole is a promise. ❌ Confinement is wrong because it means being kept in prison."
  },
  202: {
    questext: "Select the most appropriate option to fill in the blank.\nThe prisoner was granted ______ after ten years, on the condition that he report to the police every month.",
    options: ["confinement", "imprisonment", "detention", "parole"],
    correct: "4",
    exptext: "✅ Parole fits because he was released early with conditions. 📌 Parole = promise of good behaviour. ❌ Imprisonment is wrong because it means staying in prison."
  },
  203: {
    type: "concept", icon: "🏛️", accent: "#dd624b", pauseTimer: true,
    title: "Oligarchy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,98,75;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A system where a small group of people holds all the power.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">अल्पतंत्र, गुटतंत्र</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">rule by few</li><li class="vc-chip">elite rule</li><li class="vc-chip">junta</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">democracy</li><li class="vc-chip">republic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">In an <b>oligarchy</b>, a handful of rich families decide what the country does. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Critics said the republic had turned into an <b>oligarchy</b> of powerful businessmen.</p></li><li><span class="vc-n">3</span><p class="vc-s">Ancient Sparta is often cited as an example of <b>oligarchy</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/68.png" alt="Illustration of the word oligarchy: a few well-dressed people deciding at a large table while ordinary people wait outside a window." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">In an <mark class="vc-hl">oligarchy</mark>, a handful of rich families decide what the country does.</p></div></div>
      </div></div>
    `
  },
  204: {
    questext: "Select the most appropriate antonym of the given word.\nOligarchy",
    options: ["Democracy", "Junta", "Monopoly", "Bureaucracy"],
    correct: "1",
    exptext: "✅ Oligarchy is rule by a few, so democracy, which is rule by all, is the opposite. 📌 Oligo means few. ❌ Junta is wrong because it is a small group ruling, like an oligarchy."
  },
  205: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA system where a small group of people holds all the power",
    options: ["Monarchy", "Democracy", "Oligarchy", "Anarchy"],
    correct: "3",
    exptext: "✅ Oligarchy means rule by a small group. 📌 Oligos means few. ❌ Monarchy is wrong because it means rule by one person."
  },
  206: {
    type: "concept", icon: "🛐", accent: "#263bc5", pauseTimer: true,
    title: "Theocracy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,59,197;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A system of government ruled by religious leaders in God's name.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">धर्मतंत्र, धर्माधारित शासन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">religious rule</li><li class="vc-chip">clerical rule</li><li class="vc-chip">divine rule</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">secularism</li><li class="vc-chip">democracy</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">In a <b>theocracy</b>, priests make laws and claim to speak for God.</p></li><li><span class="vc-n">2</span><p class="vc-s">The old kingdom was a <b>theocracy</b> where the high priest was also the ruler. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Many nations today separate religion from the state and avoid <b>theocracy</b>.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/69.png" alt="Illustration of the word theocracy: a high priest in robes seated on a throne in a temple hall giving orders to officials." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The old kingdom was a <mark class="vc-hl">theocracy</mark> where the high priest was also the ruler.</p></div></div>
      </div></div>
    `
  },
  207: {
    questext: "Select the most appropriate synonym of the given word.\nTheocracy",
    options: ["Secularism", "Clerical rule", "Technocracy", "Democracy"],
    correct: "2",
    exptext: "✅ Theocracy is rule by religious leaders, so clerical rule is the closest phrase. 📌 Theos means God. ❌ Secularism is wrong because it keeps religion separate from government."
  },
  208: {
    questext: "Select the most appropriate option to fill in the blank.\nIn a ______, the laws of the country are made and enforced by religious leaders in the name of God.",
    options: ["meritocracy", "democracy", "plutocracy", "theocracy"],
    correct: "4",
    exptext: "✅ Theocracy fits because religious leaders rule in God's name. 📌 Theos = God. ❌ Democracy is wrong because in a democracy the people rule."
  },
  209: {
    type: "concept", icon: "👤", accent: "#78d831", pauseTimer: true,
    title: "Autocracy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:120,216,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A system where one person has complete power over everyone.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">निरंकुशतंत्र, एकतंत्र</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">dictatorship</li><li class="vc-chip">despotism</li><li class="vc-chip">tyranny</li><li class="vc-chip">absolutism</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">democracy</li><li class="vc-chip">republic</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">Under <b>autocracy</b>, one ruler's word becomes the law and no one may object.</p></li><li><span class="vc-n">2</span><p class="vc-s">The people overthrew the <b>autocracy</b> and elected a government of their own. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">Fear and silence are the tools of <b>autocracy</b> in every age.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/70.png" alt="Illustration of the word autocracy: people celebrating in a city square as a large stern statue of a ruler is lowered by cranes." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The people overthrew the <mark class="vc-hl">autocracy</mark> and elected a government of their own.</p></div></div>
      </div></div>
    `
  },
  210: {
    questext: "Select the most appropriate antonym of the given word.\nAutocracy",
    options: ["Democracy", "Despotism", "Tyranny", "Absolutism"],
    correct: "1",
    exptext: "✅ Autocracy is rule by one person, so democracy, which is rule by the people, is the opposite. 📌 Auto means self. ❌ Despotism is wrong because it is a synonym."
  },
  211: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA system where one person has complete power over everyone",
    options: ["Democracy", "Oligarchy", "Autocracy", "Theocracy"],
    correct: "3",
    exptext: "✅ Autocracy is rule by one person with complete power. 📌 Auto = self. ❌ Oligarchy is wrong because it is rule by a few."
  },
  212: {
    type: "concept", icon: "🔐", accent: "#dd4bb4", pauseTimer: true,
    title: "Cipher",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:221,75,180;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A secret way of writing, or a code used to hide a message.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">गुप्त लिपि, कूट-संकेत</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">code</li><li class="vc-chip">cryptogram</li><li class="vc-chip">secret writing</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">plain text</li><li class="vc-chip">open message</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The spy sent his message in a <b>cipher</b> that only his chief could read. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Students struggled to break the <b>cipher</b> and read the hidden note.</p></li><li><span class="vc-n">3</span><p class="vc-s">Without the key, the old <b>cipher</b> looked like a row of strange marks.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/71.png" alt="Illustration of the word cipher: a man at a candlelit desk studying a coded paper of strange marks with a magnifying glass, long shadows." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The spy sent his message in a <mark class="vc-hl">cipher</mark> that only his chief could read.</p></div></div>
      </div></div>
    `
  },
  213: {
    questext: "Select the most appropriate synonym of the given word.\nCipher",
    options: ["Plain text", "Code", "Cider", "Signature"],
    correct: "2",
    exptext: "✅ A cipher is a secret way of writing, so code is the closest word. 📌 Cipher hides the message. ❌ Plain text is wrong because it is an open message."
  },
  214: {
    questext: "Select the most appropriate option to fill in the blank.\nThe spy wrote the secret message in a ______ that only his chief could read.",
    options: ["diary", "maxim", "poster", "cipher"],
    correct: "4",
    exptext: "✅ Cipher fits because it is a secret way of writing. 📌 Cipher = secret code. ❌ Poster is wrong because a poster is meant for everyone to see."
  },
  215: {
    type: "concept", icon: "✉️", accent: "#26c5c4", pauseTimer: true,
    title: "Epistle",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,196;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A long, formal letter, especially one that teaches or instructs.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">पत्र, औपचारिक चिट्ठी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">letter</li><li class="vc-chip">missive</li><li class="vc-chip">message</li><li class="vc-chip">communication</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The saint sent a long <b>epistle</b> to his followers across the sea. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">The king's <b>epistle</b> reached the governor after a month at sea.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her thoughtful <b>epistle</b> explained why she had left the city.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/72.png" alt="Illustration of the word epistle: a monk writing a long letter with a quill by candlelight in a simple stone cell." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The saint sent a long <mark class="vc-hl">epistle</mark> to his followers across the sea.</p></div></div>
      </div></div>
    `
  },
  216: {
    questext: "Select the most appropriate synonym of the given word.\nEpistle",
    options: ["Letter", "Speech", "Episode", "Diary"],
    correct: "1",
    exptext: "✅ An epistle is a long formal letter, so letter is the closest word. 📌 Epistle comes from a Greek word for a message sent. ❌ Speech is wrong because it is spoken and not written."
  },
  217: {
    questext: "Select the most appropriate option to fill in the blank.\nThe saint wrote a long ______ to his followers, giving them advice on how to live.",
    options: ["elegy", "soliloquy", "epistle", "diatribe"],
    correct: "3",
    exptext: "✅ Epistle fits because the saint wrote a letter of advice. 📌 Epistle = letter. ❌ Soliloquy is wrong because it is a speech to oneself."
  },
  218: {
    type: "concept", icon: "🌋", accent: "#d8a631", pauseTimer: true,
    title: "Diatribe",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,166,49;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A long, angry speech or writing that attacks someone or something.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">तीखा भाषण, कटु आलोचना</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">tirade</li><li class="vc-chip">harangue</li><li class="vc-chip">rant</li><li class="vc-chip">invective</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">praise</li><li class="vc-chip">eulogy</li><li class="vc-chip">compliment</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The coach launched into a <b>diatribe</b> against the careless players.</p></li><li><span class="vc-n">2</span><p class="vc-s">His angry <b>diatribe</b> against the government lasted over an hour. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">She sat patiently through her neighbour's <b>diatribe</b> about loud music.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/73.png" alt="Illustration of the word diatribe: an angry man on a platform ranting with a clenched fist at a hall of tired listeners." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">His angry <mark class="vc-hl">diatribe</mark> against the government lasted over an hour.</p></div></div>
      </div></div>
    `
  },
  219: {
    questext: "Select the most appropriate synonym of the given word.\nDiatribe",
    options: ["Eulogy", "Tirade", "Diagram", "Diary"],
    correct: "2",
    exptext: "✅ A diatribe is a long angry speech, so tirade is the closest word. 📌 Diatribe attacks with words. ❌ Eulogy is wrong because it is praise."
  },
  220: {
    questext: "Select the most appropriate option to fill in the blank.\nThe angry manager launched into a long ______ against the workers for being late.",
    options: ["tribute", "eulogy", "compliment", "diatribe"],
    correct: "4",
    exptext: "✅ Diatribe fits because the manager gave an angry speech. 📌 Diatribe = angry attack in words. ❌ Compliment is wrong because the manager was angry, not kind."
  },
  221: {
    type: "concept", icon: "💰", accent: "#864bdd", pauseTimer: true,
    title: "Plutocracy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:134,75,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A system where rich people hold the power in a country.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">धनिकतंत्र, धनिकों का शासन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">rule of the rich</li><li class="vc-chip">rule by wealth</li><li class="vc-chip">oligarchy</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">democracy</li><li class="vc-chip">meritocracy</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">In a <b>plutocracy</b>, money decides who makes the laws.</p></li><li><span class="vc-n">2</span><p class="vc-s">Critics feared the country was sliding into a <b>plutocracy</b> ruled by billionaires. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">The old republic became a <b>plutocracy</b> when only the rich could hold office.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/74.png" alt="Illustration of the word plutocracy: a few rich men in suits at a big table stacked with gold coins, ordinary citizens watching from outside" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Critics feared the country was sliding into a <mark class="vc-hl">plutocracy</mark> ruled by billionaires.</p></div></div>
      </div></div>
    `
  },
  222: {
    questext: "Select the most appropriate antonym of the given word.\nPlutocracy",
    options: ["Democracy", "Oligarchy", "Plutonium", "Aristocracy"],
    correct: "1",
    exptext: "✅ Plutocracy is rule by the wealthy, so democracy, which is rule by all the people, is the opposite. 📌 Ploutos means wealth. ❌ Oligarchy is wrong because it is rule by a few, like plutocracy."
  },
  223: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA system where rich people hold the power in a country",
    options: ["Autocracy", "Theocracy", "Plutocracy", "Aristocracy"],
    correct: "3",
    exptext: "✅ Plutocracy means rule by the rich. 📌 Ploutos is Greek for wealth. ❌ Aristocracy is wrong because it is rule by people of noble birth."
  },
  224: {
    type: "concept", icon: "🏆", accent: "#26c538", pauseTimer: true,
    title: "Meritocracy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:38,197,56;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A system where people rise because of their ability and effort.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">योग्यतातंत्र, प्रतिभा-आधारित शासन</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">rule by merit</li><li class="vc-chip">talent-based system</li><li class="vc-chip">rule of the able</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">nepotism</li><li class="vc-chip">favouritism</li><li class="vc-chip">cronyism</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">In a <b>meritocracy</b>, the best candidate gets the job, not the boss's relative. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Competitive exams are meant to build a <b>meritocracy</b> in public service.</p></li><li><span class="vc-n">3</span><p class="vc-s">The firm's <b>meritocracy</b> rewarded hard-working juniors with fast promotions.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/75.png" alt="Illustration of the word meritocracy: an interview panel shaking hands with a confident young candidate who is selected, other candidates cl" loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">In a <mark class="vc-hl">meritocracy</mark>, the best candidate gets the job, not the boss's relative.</p></div></div>
      </div></div>
    `
  },
  225: {
    questext: "Select the most appropriate synonym of the given word.\nMeritocracy",
    options: ["Nepotism", "Rule by merit", "Mediocrity", "Favouritism"],
    correct: "2",
    exptext: "✅ Meritocracy is a system where ability decides success, so rule by merit is the closest phrase. 📌 Merit means worth. ❌ Nepotism is wrong because it means favouring relatives."
  },
  226: {
    questext: "Select the most appropriate option to fill in the blank.\nIn a true ______, a poor student with great talent can rise to the top post through hard work.",
    options: ["oligarchy", "plutocracy", "autocracy", "meritocracy"],
    correct: "4",
    exptext: "✅ Meritocracy fits because talent and effort decide who rises. 📌 Merit decides. ❌ Plutocracy is wrong because it gives power to the rich."
  },
  227: {
    type: "concept", icon: "👑", accent: "#d8314f", pauseTimer: true,
    title: "Aristocracy",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:216,49,79;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A ruling class made up of people of noble birth and high rank.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">कुलीनतंत्र, अभिजात वर्ग</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">nobility</li><li class="vc-chip">gentry</li><li class="vc-chip">upper class</li><li class="vc-chip">elite</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">commoners</li><li class="vc-chip">proletariat</li><li class="vc-chip">working class</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>aristocracy</b> lived in grand palaces while peasants worked their lands. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Members of the <b>aristocracy</b> were once given titles such as duke and earl.</p></li><li><span class="vc-n">3</span><p class="vc-s">The revolution stripped the <b>aristocracy</b> of its land and power.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/76.png" alt="Illustration of the word aristocracy: richly dressed nobles at a palace ball while peasants watch from outside the gate." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">aristocracy</mark> lived in grand palaces while peasants worked their lands.</p></div></div>
      </div></div>
    `
  },
  228: {
    questext: "Select the most appropriate antonym of the given word.\nAristocracy",
    options: ["Commoners", "Nobility", "Gentry", "Elite"],
    correct: "1",
    exptext: "✅ Aristocracy is a ruling class of noble birth, so commoners, who are ordinary people, are the opposite. 📌 Aristos means best. ❌ Nobility is wrong because it is a synonym."
  },
  229: {
    questext: "Select the most appropriate option to fill in the blank.\nOnly people of the ______ were allowed to sit in the royal court, because it was a class of noble birth.",
    options: ["commoners", "peasantry", "aristocracy", "labourers"],
    correct: "3",
    exptext: "✅ Aristocracy fits because it is the class of noble birth. 📌 Aristos = best. ❌ Peasantry is wrong because it means farmers of low rank."
  },
  230: {
    type: "concept", icon: "🗣️", accent: "#4b8fdd", pauseTimer: true,
    title: "Rhetoric",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,143,221;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">The art of speaking or writing in a way that persuades people.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">वाक्पटुता, भाषण-कला</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">oratory</li><li class="vc-chip">eloquence</li><li class="vc-chip">elocution</li><li class="vc-chip">persuasion</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">plain speech</li><li class="vc-chip">silence</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The leader's powerful <b>rhetoric</b> moved the crowd to tears and cheers. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">His speech was full of <b>rhetoric</b> but had no real plan for the city.</p></li><li><span class="vc-n">3</span><p class="vc-s">Students of law learn <b>rhetoric</b> to argue their cases with force.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/77.png" alt="Illustration of the word rhetoric: a speaker with a raised hand at a podium moving a crowd at an outdoor rally." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The leader's powerful <mark class="vc-hl">rhetoric</mark> moved the crowd to tears and cheers.</p></div></div>
      </div></div>
    `
  },
  231: {
    questext: "Select the most appropriate synonym of the given word.\nRhetoric",
    options: ["Silence", "Oratory", "Rhythm", "Rumour"],
    correct: "2",
    exptext: "✅ Rhetoric is the art of persuasive speaking, so oratory is the closest word. 📌 Rhetor means speaker. ❌ Silence is wrong because it means not speaking."
  },
  232: {
    questext: "Select the most appropriate option to fill in the blank.\nThe leader's powerful ______ moved the crowd, though his speech had very few real facts.",
    options: ["arithmetic", "silence", "whisper", "rhetoric"],
    correct: "4",
    exptext: "✅ Rhetoric fits because his persuasive speaking moved the crowd. 📌 Rhetoric = persuasive words. ❌ Arithmetic is wrong because it means working with numbers."
  },
  233: {
    type: "concept", icon: "🙇", accent: "#9fc526", pauseTimer: true,
    title: "Sycophant",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:159,197,38;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">NOUN</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">A person who praises powerful people too much to gain favour.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">चापलूस, ख़ुशामदी</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">flatterer</li><li class="vc-chip">toady</li><li class="vc-chip">yes-man</li><li class="vc-chip">fawner</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">critic</li><li class="vc-chip">detractor</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The minister was surrounded by <b>sycophants</b> who agreed with every word he said.</p></li><li><span class="vc-n">2</span><p class="vc-s">A <b>sycophant</b> laughs at the boss's jokes even when they are not funny. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">3</span><p class="vc-s">She refused to be a <b>sycophant</b> and gave her honest opinion to the director.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/78.png" alt="Illustration of the word sycophant: a smiling man clapping at his boss's weak joke in an office meeting while the boss beams and colleagues " loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">A <mark class="vc-hl">sycophant</mark> laughs at the boss's jokes even when they are not funny.</p></div></div>
      </div></div>
    `
  },
  234: {
    questext: "Select the most appropriate antonym of the given word.\nSycophant",
    options: ["Critic", "Flatterer", "Toady", "Yes-man"],
    correct: "1",
    exptext: "✅ A sycophant flatters the powerful, so a critic, who points out faults, is the opposite. 📌 Sycophant says yes; critic says no. ❌ Flatterer is wrong because it is a synonym."
  },
  235: {
    questext: "Select the most appropriate one-word substitute for the given group of words.\nA person who praises powerful people too much to gain favour",
    options: ["Pundit", "Critic", "Sycophant", "Meddler"],
    correct: "3",
    exptext: "✅ Sycophant means a person who flatters the powerful to gain favour. 📌 Sycophant = flatterer. ❌ Critic is wrong because a critic points out faults."
  },
  236: {
    type: "concept", icon: "🧱", accent: "#cf31d8", pauseTimer: true,
    title: "Obdurate",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:207,49,216;--ink:#fff">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Stubborn and refusing to change your mind or feelings.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">हठी, अड़ियल</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">stubborn</li><li class="vc-chip">obstinate</li><li class="vc-chip">adamant</li><li class="vc-chip">unyielding</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">flexible</li><li class="vc-chip">yielding</li><li class="vc-chip">compliant</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The <b>obdurate</b> manager refused to change his decision despite every request. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li><li><span class="vc-n">2</span><p class="vc-s">Neither side was ready to compromise, as both remained <b>obdurate</b> in the talks.</p></li><li><span class="vc-n">3</span><p class="vc-s">Her <b>obdurate</b> heart did not soften even at the child's tears.</p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/79.png" alt="Illustration of the word obdurate: a stern manager with crossed arms shaking his head while employees plead at his desk." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">The <mark class="vc-hl">obdurate</mark> manager refused to change his decision despite every request.</p></div></div>
      </div></div>
    `
  },
  237: {
    questext: "Select the most appropriate synonym of the given word.\nObdurate",
    options: ["Flexible", "Stubborn", "Obedient", "Obscure"],
    correct: "2",
    exptext: "✅ Obdurate means stubborn, so stubborn is the closest word. 📌 Obdurate is hard like a rock. ❌ Flexible is wrong because it means willing to bend."
  },
  238: {
    questext: "Select the most appropriate option to fill in the blank.\nDespite all our requests, the ______ officer refused to change his decision.",
    options: ["yielding", "flexible", "compliant", "obdurate"],
    correct: "4",
    exptext: "✅ Obdurate fits because the officer would not change his mind. 📌 Obdurate = hard-hearted. ❌ Flexible is wrong because a flexible officer would change his decision."
  },
  239: {
    type: "concept", icon: "🌈", accent: "#4bddab", pauseTimer: true,
    title: "Ephemeral",
    html: `
      <div class="vc-wrap"><div class="vc" style="--ar:75,221,171;--ink:#111">
      <div class="vc-main">
      <div class="vc-top"><span class="vc-pos">ADJECTIVE</span></div>
      <div class="vc-pair vc-p1"><div class="vc-card vc-mean"><div class="vc-lab">Meaning</div><p class="vc-t">Lasting for a very short time only.</p></div><div class="vc-card vc-hi"><div class="vc-lab">हिंदी अर्थ</div><p class="vc-t" lang="hi">क्षणभंगुर, अल्पकालिक</p></div></div>
      <div class="vc-pair vc-p2"><div class="vc-card vc-syn"><div class="vc-lab"><i>✅</i>Synonyms</div><ul class="vc-chips"><li class="vc-chip">transient</li><li class="vc-chip">fleeting</li><li class="vc-chip">momentary</li><li class="vc-chip">short-lived</li></ul></div><div class="vc-card vc-ant"><div class="vc-lab"><i>↔️</i>Antonyms</div><ul class="vc-chips"><li class="vc-chip">eternal</li><li class="vc-chip">permanent</li><li class="vc-chip">lasting</li></ul></div></div>
      <div class="vc-card vc-use"><div class="vc-lab"><i>✍️</i>Usage — 3 sentences</div><ol><li><span class="vc-n">1</span><p class="vc-s">The beauty of a rainbow is <b>ephemeral</b>; it fades within minutes.</p></li><li><span class="vc-n">2</span><p class="vc-s">Fame in films can be <b>ephemeral</b>, as audiences quickly move on.</p></li><li><span class="vc-n">3</span><p class="vc-s">Morning dew is <b>ephemeral</b> and vanishes as soon as the sun rises. <span class="vc-pic" title="Shown in the picture">🖼️</span></p></li></ol></div>
      </div>
      <div class="vc-side"><figure class="vc-fig"><img class="vc-img" src="images/English_Comprehension/Vocabulary/Set_3/80.png" alt="Illustration of the word ephemeral: glittering dewdrops on a green leaf in early morning light as the sun rises." loading="lazy"></figure>
      <div class="vc-cap"><div class="vc-lab"><i>🖼️</i>Sentence shown in the picture</div><p class="vc-q">Morning dew is <mark class="vc-hl">ephemeral</mark> and vanishes as soon as the sun rises.</p></div></div>
      </div></div>
    `
  },
  240: {
    questext: "Select the most appropriate antonym of the given word.\nEphemeral",
    options: ["Permanent", "Transient", "Fleeting", "Momentary"],
    correct: "1",
    exptext: "✅ Ephemeral means lasting a very short time, so permanent is the opposite. 📌 Ephemeral lasts a day. ❌ Fleeting is wrong because it is a synonym."
  },
  241: {
    questext: "Select the most appropriate option to fill in the blank.\nSocial media fame is often ______; it vanishes as quickly as it arrives.",
    options: ["eternal", "permanent", "ephemeral", "lasting"],
    correct: "3",
    exptext: "✅ Ephemeral fits because the fame vanishes quickly. 📌 Ephemeral = lasts a day. ❌ Eternal is wrong because the fame does not last forever."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/English_Comprehension/Vocabulary/Set_3/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an open English dictionary, a fountain pen, and a few wooden letter tiles on a desk" },
  "images/English_Comprehension/Vocabulary/Set_3/1.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"semiotic\" at a glance, without reading anything: a driver at a crossroads looking at colourful traffic signs with arrows and pictograms, thoughtful face, sunny street. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/2.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"immaculate\" at a glance, without reading anything: a pleased guest entering a bright hotel room with a perfectly made bed, shining floor and fresh flowers. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/3.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"obsolete\" at a glance, without reading anything: a puzzled boy holding an old floppy disk beside a modern laptop and a small pen drive on a desk. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/4.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"martinet\" at a glance, without reading anything: a stern army captain closely inspecting the shining buttons of a stiff soldier on a parade ground. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/5.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"maverick\" at a glance, without reading anything: a chef in a busy kitchen tossing unusual ingredients into a pan while other chefs follow recipe books. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/6.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"customary\" at a glance, without reading anything: a family at a doorway with shoes lined up outside and a guest greeted with folded hands. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/7.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"orthodox\" at a glance, without reading anything: elderly grandparents in traditional clothes sternly watching a young couple, ritual items on a table. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/8.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"iconoclast\" at a glance, without reading anything: a bold painter smashing a cracked classical plaster bust with a hammer while old art critics gasp. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/9.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"conformist\" at a glance, without reading anything: rows of identical students in the same uniform and posture, one boy in the centre copying his neighbours. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/10.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"bohemian\" at a glance, without reading anything: a woman painter in a cluttered attic studio with colourful scarves, an easel and a guitar at dusk. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/11.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"conform\" at a glance, without reading anything: school students in a line at the gate while a guard checks their ties and shoes. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/12.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"placebo\" at a glance, without reading anything: a nurse handing small white pills to two groups of patients in a clinic while a researcher takes notes. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/13.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"palliative\" at a glance, without reading anything: a nurse gently adjusting a pillow and holding the hand of an elderly man in a calm bedroom. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/14.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"anodyne\" at a glance, without reading anything: a tired student lying with closed eyes listening to soft music through headphones in a calm evening room. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/15.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"desuetude\" at a glance, without reading anything: a dry old stone well covered with creepers and moss in a quiet village, a modern tap in the background. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/16.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"hiatus\" at a glance, without reading anything: a quiet empty classroom with chairs stacked, a wall calendar with crossed-out days and sunlight through the windows. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/17.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"oblivion\" at a glance, without reading anything: a ruined ancient city half buried in sand beside a dry riverbed, a lone traveller looking at it. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/18.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"interregnum\" at a glance, without reading anything: an empty royal throne in a grand hall with council members arguing around it and a crown on a cushion. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/19.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"elegy\" at a glance, without reading anything: a children's choir in black singing softly at a funeral with candles and a garlanded photo frame. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/20.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"encomium\" at a glance, without reading anything: a principal on stage with a microphone and a medal applauding a proud girl topper, students clapping. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/21.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"soliloquy\" at a glance, without reading anything: a lone actor on a dim stage under a single spotlight speaking with a hand on his chest, empty theatre seats. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/22.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"schism\" at a glance, without reading anything: a large group of people in a hall splitting into two angry sides facing each other with a wide gap between them. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/23.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"apostasy\" at a glance, without reading anything: a politician removing his party scarf and walking out of a rally while stunned supporters watch. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/24.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"heresy\" at a glance, without reading anything: a scientist in an old robe pointing to a model of the Sun with circling planets while stern elders frown. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/25.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"bigot\" at a glance, without reading anything: an angry man shouting over a fence at a calm neighbour in traditional clothes, tense mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/26.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"heretic\" at a glance, without reading anything: a lone man standing before an angry village crowd that points at him near a festival fire. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/27.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"analgesic\" at a glance, without reading anything: a man at an office desk holding his forehead with a glass of water and a tablet strip, relieved expression. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/28.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"sedative\" at a glance, without reading anything: a patient in a hospital bed growing calm with drooping eyes, a nurse adjusting a drip, soft night light. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/29.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"tranquilizer\" at a glance, without reading anything: a veterinarian giving an injection to a calm elephant in a forest clearing with rangers nearby. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/30.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"ennui\" at a glance, without reading anything: a bored young prince slouching on a grand chair in a rich palace hall, chin on hand, yawning. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/31.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"torpor\" at a glance, without reading anything: a brown bear curled up asleep inside a snowy cave while snow falls outside. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/32.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"tedium\" at a glance, without reading anything: a clerk yawning while copying from a tall pile of papers at a desk with a wall clock showing late afternoon. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/33.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"weary\" at a glance, without reading anything: a doctor in scrubs with a tired smile sitting in a hospital corridor at dawn holding a cup of tea. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/34.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"wary\" at a glance, without reading anything: a cat crouched near a doorway watching a large dog enter a living room cautiously. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/35.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"remission\" at a glance, without reading anything: a smiling patient in a hospital room holding a report while the doctor and family smile with relief. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/36.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"reprieve\" at a glance, without reading anything: a sweating man resting under a tree as a cool evening breeze moves the leaves at sunset. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/37.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"amnesty\" at a glance, without reading anything: a relieved man handing documents to a tax officer who stamps them at an office counter. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/38.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"perfidy\" at a glance, without reading anything: a man secretly handing a sealed envelope to a stranger in a dark alley while a colleague watches shocked from a window. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/39.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"polymath\" at a glance, without reading anything: a Renaissance-style scholar at a desk surrounded by paintings, sketches of flying machines, a globe and a violin. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/40.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"prodigy\" at a glance, without reading anything: a six-year-old girl playing a grand piano on a stage while an amazed adult audience watches. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/41.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"dissident\" at a glance, without reading anything: a lone man holding a lantern standing bravely in a town square before a line of grim officials. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/42.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"tale\" at a glance, without reading anything: a grandmother telling a story to wide-eyed children sitting around a lamp in a cosy room. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/43.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"antediluvian\" at a glance, without reading anything: an old office full of huge noisy typewriters and machines with bored workers. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/44.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"maxim\" at a glance, without reading anything: an old teacher smiling at his desk while a few students listen to him in a sunny classroom. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/45.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"pundit\" at a glance, without reading anything: a well-dressed commentator speaking in a TV studio with unlabeled bar charts glowing behind him. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/46.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"meddler\" at a glance, without reading anything: a nosy neighbour leaning over a garden fence listening to a family's conversation. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/47.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"interloper\" at a glance, without reading anything: a guard stopping a casually dressed man at the entrance of an elegant party. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/48.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"epicure\" at a glance, without reading anything: a refined gentleman in a restaurant tasting a spoonful from a dish with a thoughtful frown while a waiter waits. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/49.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"sybarite\" at a glance, without reading anything: a man reclining on silk cushions in a luxurious palace room while a chef serves platters. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/50.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"hedonist\" at a glance, without reading anything: a happy young man at a lavish party with dancing friends and colourful drinks. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/51.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"reveler\" at a glance, without reading anything: crowds of people dancing in a festival street under hanging lanterns at night. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/52.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"glutton\" at a glance, without reading anything: a plump king at a long banquet table piled with twenty dishes, reaching for more food. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/53.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"aesthete\" at a glance, without reading anything: a person standing before a large abstract painting in a quiet gallery, studying it closely in soft light. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/54.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"connoisseur\" at a glance, without reading anything: a man in a suit holding a wine glass up to the light in a cellar, studying its colour. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/55.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"abyss\" at a glance, without reading anything: scuba divers with torches descending into a dark deep ocean trench with faint blue light. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/56.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"crevasse\" at a glance, without reading anything: mountaineers roped together crossing a blue-ice crack on a glacier with snowy peaks behind. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/57.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"gorge\" at a glance, without reading anything: tourists on a bridge taking photos of a deep narrow rocky gorge with a river far below. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/58.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"censure\" at a glance, without reading anything: committee members at a table raising hands to vote while an official bows his head, stern faces. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/59.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"denunciation\" at a glance, without reading anything: a leader at a podium pointing firmly while a large crowd claps in an open ground with plain flags. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/60.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"indictment\" at a glance, without reading anything: a courtroom where a judge reads papers aloud, an accused stands, lawyers sit around. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/61.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"abeyance\" at a glance, without reading anything: an anxious young man at a desk with his plans papers put away in a drawer, waiting beside his phone. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/62.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"dormancy\" at a glance, without reading anything: a green-sided volcano with a thin wisp of smoke, villagers farming peacefully below. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/63.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"renegade\" at a glance, without reading anything: a man walking out of a group meeting at a table through a door while his colleagues stare angrily. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/64.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"anthropology\" at a glance, without reading anything: a museum hall with glass cases of ancient stone tools and pottery while a student sketches. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/65.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"allegory\" at a glance, without reading anything: a calm painterly landscape with a river and a small boat carrying a lone traveller, symbolic mood. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/66.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"clemency\" at a glance, without reading anything: a judge looking kindly down at a young man standing with folded hands in a courtroom. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/67.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"parole\" at a glance, without reading anything: a man leaving prison gates carrying a small bag while his family waits with open arms. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/68.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"oligarchy\" at a glance, without reading anything: a few well-dressed people deciding at a large table while ordinary people wait outside a window. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/69.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"theocracy\" at a glance, without reading anything: a high priest in robes seated on a throne in a temple hall giving orders to officials. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/70.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"autocracy\" at a glance, without reading anything: people celebrating in a city square as a large stern statue of a ruler is lowered by cranes. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/71.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"cipher\" at a glance, without reading anything: a man at a candlelit desk studying a coded paper of strange marks with a magnifying glass, long shadows. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/72.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"epistle\" at a glance, without reading anything: a monk writing a long letter with a quill by candlelight in a simple stone cell. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/73.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"diatribe\" at a glance, without reading anything: an angry man on a platform ranting with a clenched fist at a hall of tired listeners. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/74.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"plutocracy\" at a glance, without reading anything: a few rich men in suits at a big table stacked with gold coins, ordinary citizens watching from outside. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/75.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"meritocracy\" at a glance, without reading anything: an interview panel shaking hands with a confident young candidate who is selected, other candidates clapping. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/76.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"aristocracy\" at a glance, without reading anything: richly dressed nobles at a palace ball while peasants watch from outside the gate. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/77.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"rhetoric\" at a glance, without reading anything: a speaker with a raised hand at a podium moving a crowd at an outdoor rally. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/78.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"sycophant\" at a glance, without reading anything: a smiling man clapping at his boss's weak joke in an office meeting while the boss beams and colleagues roll their eyes. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/79.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"obdurate\" at a glance, without reading anything: a stern manager with crossed arms shaking his head while employees plead at his desk. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly.",
  "images/English_Comprehension/Vocabulary/Set_3/80.png": "Create a 16:9 landscape illustration, 1600×900 px, in a premium, polished digital-illustration style: rich natural colours, soft cinematic lighting, clean confident shapes, gentle depth of field, expressive semi-realistic characters (not a cartoon sticker, not a photograph). It must show this single scene so clearly that a learner understands the word \"ephemeral\" at a glance, without reading anything: glittering dewdrops on a green leaf in early morning light as the sun rises. Keep the main subject large and near the centre, and keep the outer edges simple so the picture can be cropped a little on phones. Do not add any caption, title, sentence, watermark, logo or channel name. Use text inside the picture only where the scene itself needs it, exactly as written in the scene description, and spelled correctly."
});

/* CHANGE LOG
   - Spellings corrected to the standard form: semiotic, crevasse, reprieve, sybarite.
   - Repeated words (maverick, sybarite, apostasy) are taught only once.
   - Three extra exam-level words included: sycophant, obdurate, ephemeral.
   - Format update: every word now has exactly two questions (a synonym or antonym question and a second question of another type); the earlier single mixed-type questions were rewritten.
*/