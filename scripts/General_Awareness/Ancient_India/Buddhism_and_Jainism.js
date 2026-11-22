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
    var D = /* ═══ SNIPPET 4 — put right after SNIPPET 3 ═══ */
/* ── IMAGE-ROW SNIPPET: pictures that come one after another sit side by side in ONE row (2, 3 or 4 per row) instead of a tall stack with empty space ── */
(function () {
  var CSS = [
    ".cp-figrow{display:grid!important;gap:14px;align-items:stretch;width:100%;max-width:100%;margin:16px auto!important;box-sizing:border-box;padding:0}",
    ".cp-figrow.n2{grid-template-columns:repeat(2,minmax(0,1fr));max-width:880px}",
    ".cp-figrow.n3{grid-template-columns:repeat(3,minmax(0,1fr))}",
    ".cp-figrow.n4{grid-template-columns:repeat(4,minmax(0,1fr))}",
    ".cp-figcell{display:flex!important;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:8px;min-width:0;margin:0!important;padding:0!important}",
    ".cp-figcell>.cp-fig{margin:0!important;width:100%!important;max-width:100%!important;min-width:0}",
    ".cp-figrow img{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;max-height:none!important;aspect-ratio:4/3;object-fit:contain!important;margin:0 auto!important}",
    ".cp-figrow .cpm{width:100%!important;max-width:none!important;margin:0!important}",
    "@media (max-width:980px){.cp-figrow.n4{grid-template-columns:repeat(2,minmax(0,1fr))}}",
    "@media (max-width:560px){.cp-figrow{gap:10px}.cp-figrow.n3{grid-template-columns:repeat(2,minmax(0,1fr))}.cp-figrow.n3>.cp-figcell:last-child{grid-column:1/-1}.cp-figrow.n3>.cp-figcell:last-child img{aspect-ratio:16/9}}"
  ].join("");
  function add() {
    if (document.getElementById("cpfr-style")) return;
    var st = document.createElement("style");
    st.id = "cpfr-style";
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }
  add();
})();

window.TEST_DATA || {};
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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Buddhism_and_Jainism · 17 concept pages (+ overview) · 50 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Buddhism & Jainism",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Buddhism_and_Jainism/thumbnail.png",
      banner: "ANCIENT INDIA • ALL EXAMS",
      line1: "BUDDHISM",
      line2: "& JAINISM",
      line3: "FULL CHAPTER",
      badge: "CRASH CLASS",
      ribbon: "COUNCILS • TIRTHANKARAS • BUDDHA",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Buddhism & Jainism Complete Chapter | Ancient India for SSC UPSC Railways",
      altTitles: ["Buddhist & Jain Councils in One Class", "Mahavir vs Buddha Crash Course for All Exams"],
      description: "Buddhism and Jainism are among the most asked chapters of Ancient India. This crash class covers why new religions arose, Mahavir and the Tirthankaras, Buddha's life, teachings, councils, literature, art and decline, with practice questions.\n\n📌 IN THIS CLASS\n✅ Jain Tirthankaras, vows and councils\n✅ Shwetambara vs Digambara\n✅ Buddha's life and first sermon\n✅ Eightfold Path and four councils\n✅ Mudras, stupa and literature\n✅ Practice MCQs\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Buddhism #Jainism #AncientIndia",
      tags: ["buddhism and jainism", "buddhism jainism for all exams", "ancient india", "mahavir swami", "gautam buddha", "jain tirthankaras", "buddhist councils", "jain councils", "eightfold path", "four noble truths", "hinayana mahayana", "shwetambara digambara", "buddhist literature", "bodhisattvas", "stupa architecture", "buddha mudras", "ancient india history", "indian history", "history mcq", "ssc cgl history", "upsc history", "static gk history", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "Buddhism and Jainism Anci"],
      hashtags: ["Buddhism", "Jainism", "AncientIndia"],
      thumbText: "BUDDHISM & JAINISM IN ONE CLASS",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "☸️ New class: Buddhism & Jainism complete chapter. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Ancient India — Crash Course"
    },
    html: `
      <p class="cp-lead">Why new religions arose in the 6th century BC, then <u>Jainism</u> (Tirthankaras, Mahavir, vows, councils, sects) and <u>Buddhism</u> (life, teachings, councils, literature, art, decline) — with a clean comparison.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>17</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>50</b><span>Questions</span></div>
        <div class="cp-stat"><b>~84 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Why New Religions Arose</b><br>Rituals, rigid caste, rising Vaishyas.</li>
        <li><b>Jainism</b><br>Tirthankaras, Mahavir, vows, literature, councils, sects.</li>
        <li><b>Buddha's Life</b><br>Biography, four sights, first sermon, Mahaparinirvana.</li>
        <li><b>Teachings &amp; Councils</b><br>Eightfold Path, Four Noble Truths, four Buddhist councils.</li>
        <li><b>Bodhisattvas, Texts, Art</b><br>Pitakas, mudras, stupa parts.</li>
        <li><b>Decline &amp; Comparison</b><br>Why both faded and how they differ.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> councils, chairmen, Tirthankara symbols and Hinayana–Mahayana differences are asked in almost every SSC, UPSC, Railways and State paper.</div>
    `
  },
  2: {
    type: "concept", icon: "🌱", accent: "#22c55e", pauseTimer: true,
    title: "7.1 Why New Religions Arose (6th century BC)",
    html: `
      <p class="cp-lead">The Later Vedic religion became <b>ritual-heavy</b> and the <b>caste system rigid</b>, while a new <u>agrarian economy</u> gave rise to new demands.</p>
      <table><thead><tr><th>Cause</th><th>Detail</th></tr></thead><tbody><tr><td>Religious</td><td>Rigvedic religion grew complex through rituals and <b>Yagyas</b></td></tr><tr><td>Social</td><td>Caste system rigid; Vedic literature stayed in difficult <b>Sanskrit</b></td></tr><tr><td>Economic</td><td>Expanding agrarian economy; <b>Vaishyas</b> strong, wanting higher social recognition</td></tr><tr><td>Political</td><td>Favourable political conditions</td></tr></tbody></table>
    `
  },
  3: {
    questext: "Which economically strong class wanted higher social recognition and favoured the new religions?",
    options: ["Vaishyas", "Brahmins", "Shudras", "Untouchables"],
    correct: "1",
    exptext: "✅ Vaishyas, strengthened by agriculture and trade. 📌 Vaishya = wealth without status. ❌ Brahmins already held top rank."
  },
  4: {
    questext: "Which of the following was NOT a reason for the rise of new religions in the 6th century BC?",
    options: ["Costly Vedic rituals and Yagyas", "Rigid caste system", "Decline of the agrarian economy", "Vedic literature in difficult Sanskrit"],
    correct: "3",
    exptext: "✅ The agrarian economy was expanding, not declining. 📌 Rituals + caste + Sanskrit + rising Vaishyas. ❌ The others were real causes."
  },
  5: {
    type: "concept", icon: "🦁", accent: "#f59e0b", pauseTimer: true,
    title: "7.2 Jainism — Basics & Tirthankaras",
    html: `
      <p class="cp-lead">‘Jain’ comes from Sanskrit <b>‘Jin’</b> — conqueror of <b>mind, speech and body</b>; <b>Jina</b> means enlightened and freed from rebirth.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Buddhism_and_Jainism/1.png" alt="Tirthankara symbols: bull, conch, serpent, lion" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Tirthankaras</td><td><b>24</b>; first <b>Rishabhdev/Adinath</b>; he and <b>Arishtanemi</b> (22nd) are named in the Rigveda</td></tr><tr><td>Parshvanath</td><td>23rd; son of King <b>Ashvasen of Kashi</b>; admitted <b>women</b> into Jainism</td></tr><tr><td>Mahavir Swami</td><td>24th and last; real <b>founder/organiser</b>; believed in karma and rebirth; war and agriculture discouraged; idol worship absent at first</td></tr></tbody></table>
      <table><thead><tr><th>Tirthankara</th><th>Symbol · Birthplace</th></tr></thead><tbody><tr><td>Rishabhdev / Adinath (1st)</td><td>Bull · Ayodhya</td></tr><tr><td>Arishtanemi (22nd)</td><td>Conch-shell (Shankh) · Sauripura/Shaurinpura</td></tr><tr><td>Parshvanath (23rd)</td><td>Serpent hood · Varanasi</td></tr><tr><td>Mahavir Swami (24th)</td><td>Lion · Kundagram</td></tr></tbody></table>
      <div class="cp-note remember"><b>Twenty</b> of the 24 Tirthankaras attained Nirvana at <b>Sammed Shikhar</b> (Parasnath hill, Jharkhand), where Parshvanath's Nirvana also took place.</div>
    `
  },
  6: {
    questext: "What are the symbol and birthplace of Parshvanath, the 23rd Tirthankara?",
    options: ["Bull · Ayodhya", "Serpent hood · Varanasi", "Lion · Kundagram", "Conch-shell · Sauripura"],
    correct: "2",
    exptext: "✅ Serpent hood and Varanasi. 📌 Parshva = Serpent. ❌ Lion and Kundagram belong to Mahavir."
  },
  7: {
    questext: "The first Tirthankara Rishabhdev has which symbol and birthplace?",
    options: ["Lion · Kundagram", "Serpent hood · Varanasi", "Conch-shell · Sauripura", "Bull · Ayodhya"],
    correct: "4",
    exptext: "✅ Bull and Ayodhya. 📌 Rishabh = Bull. ❌ Conch-shell belongs to Arishtanemi, the 22nd."
  },
  8: {
    questext: "Which two Tirthankaras are named in the Rigveda?",
    options: ["Parshvanath and Mahavir", "Rishabhdev and Arishtanemi", "Mahavir and Rishabhdev", "Parshvanath and Arishtanemi"],
    correct: "2",
    exptext: "✅ Rishabhdev (1st) and Arishtanemi (22nd). 📌 First + 22nd. ❌ Parshvanath and Mahavir are historical Tirthankaras."
  },
  9: {
    questext: "Which Tirthankara admitted women into Jainism?",
    options: ["Rishabhdev", "Mahavir", "Arishtanemi", "Parshvanath"],
    correct: "4",
    exptext: "✅ Parshvanath, the 23rd, son of Ashvasen of Kashi. 📌 Women entered under Parshvanath. ❌ Mahavir was the 24th and last."
  },
  10: {
    type: "concept", icon: "🧘", accent: "#ef4444", pauseTimer: true,
    title: "Mahavir Swami — biography",
    html: `
      <p class="cp-lead">Born at <b>Kundagram, Vaishali (Bihar)</b>; childhood name <b>Vardhamana</b>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Parents</td><td>Father <b>Siddhartha</b>, head of the <b>Jnatrika</b> clan of the Vajji Sangha; mother <b>Trishala</b>, sister of Lichchhavi ruler <b>Chetak</b></td></tr><tr><td>Family</td><td>Wife <b>Yashoda</b> (Kundiya gotra); daughter Priyadarshana/Anojja; son-in-law <b>Jamali</b></td></tr><tr><td>Renunciation</td><td>At <b>30</b>, with permission of elder brother Nandivardhan</td></tr><tr><td>Disciple</td><td><b>Makkhaliputra Goshal</b> founded the Ajivika sect</td></tr><tr><td>Kaivalya</td><td>After <b>12 years</b> of penance under a <b>Sal tree</b> at Jrambhik village on the <b>Rijupalika</b> river</td></tr><tr><td>Nirvana</td><td><b>Pavapuri</b> near Rajgir, at the place of Malla king Sustpal; commemorated on <b>Diwali</b></td></tr></tbody></table>
      <div class="cp-note info">Mahavir's dates are given as 599–527 BC or 540–468 BC in different traditions.</div>
    `
  },
  11: {
    questext: "What was the childhood name of Mahavir Swami?",
    options: ["Vardhamana", "Siddhartha", "Jamali", "Nandivardhan"],
    correct: "1",
    exptext: "✅ Vardhamana. 📌 Vardhaman = Mahavir. ❌ Siddhartha was his father; Nandivardhan his brother."
  },
  12: {
    questext: "Under which tree did Mahavir attain Kaivalya?",
    options: ["Bodhi tree", "Banyan tree", "Sal tree", "Neem tree"],
    correct: "3",
    exptext: "✅ A Sal tree at Jrambhik, on the Rijupalika river, after 12 years of penance. 📌 Mahavir = Sal; Buddha = Bodhi. ❌ Bodhi tree is Buddha's."
  },
  13: {
    questext: "Mahavir attained Nirvana at:",
    options: ["Pavapuri", "Kundagram", "Kushinagar", "Sammed Shikhar"],
    correct: "1",
    exptext: "✅ Pavapuri near Rajgir, remembered on Diwali. 📌 Pava = Mahavir. ❌ Kushinagar is Buddha's."
  },
  14: {
    questext: "Who, a disciple of Mahavir, founded the Ajivika sect?",
    options: ["Jamali", "Chetak", "Makkhaliputra Goshal", "Nandivardhan"],
    correct: "3",
    exptext: "✅ Makkhaliputra Goshal. 📌 Goshal = Ajivika. ❌ Jamali was Mahavir's son-in-law."
  },
  15: {
    type: "concept", icon: "💎", accent: "#8b5cf6", pauseTimer: true,
    title: "7.3 Vows, Three Jewels & Philosophy",
    html: `
      <p class="cp-lead">Five vows, three jewels and a <u>many-sided view of truth</u> — an eternal world with <b>no God as creator</b>.</p>
      <table><thead><tr><th>Concept</th><th>Detail</th></tr></thead><tbody><tr><td>Panch Mahavrata / Anuvrata</td><td><b>Ahimsa</b>, <b>Satya</b>, <b>Asteya</b>, <b>Aparigraha</b>, <b>Brahmacharya</b> — first four from Parshvanath, <b>Brahmacharya</b> added by Mahavir</td></tr><tr><td>Triratna</td><td><b>Samyak Darshan</b>, <b>Samyak Gyan</b>, <b>Samyak Charitra</b> — right faith, knowledge, conduct</td></tr><tr><td>Anekantavada</td><td>Plurality / many-sidedness; <b>Syadavada</b> or <b>Saptabhanginaya</b> — relativity</td></tr><tr><td>Kaivalya</td><td>Supreme knowledge; Mahavir's titles Kevalin, Jin, Arh, Nirgrantha</td></tr><tr><td>Terms</td><td><b>Basadis</b> — Jain monasteries; <b>Asrava</b> — inflow of karma; Moksha</td></tr><tr><td>Doctrine</td><td>Eternal world, no creator God; karma, rebirth, Nirvana, atheism, 18 sins</td></tr><tr><td>Sallekhana / Santhara</td><td>Giving up life by fasting; Rajasthan High Court banned it in August 2015; Supreme Court interim stay</td></tr></tbody></table>
    `
  },
  16: {
    questext: "Which vow was added by Mahavir to the four vows of Parshvanath?",
    options: ["Ahimsa", "Brahmacharya", "Satya", "Asteya"],
    correct: "2",
    exptext: "✅ Brahmacharya (chastity). 📌 4 + 1 = 5 vows. ❌ The other three came from Parshvanath."
  },
  17: {
    questext: "The Triratna of Jainism consists of:",
    options: ["Ahimsa, Satya, Asteya", "Dukha, Samudaya, Nirodha", "Medhi, Anda, Harmika", "Samyak Darshan, Samyak Gyan, Samyak Charitra"],
    correct: "4",
    exptext: "✅ Right faith, right knowledge and right conduct. 📌 Three ‘Samyak’ jewels. ❌ Buddhist Triratna is Buddha, Dhamma, Sangha."
  },
  18: {
    questext: "Anekantavada (Syadavada) in Jainism stands for:",
    options: ["existence of a creator God", "many-sidedness and relativity of truth", "supremacy of the Vedas", "non-possession"],
    correct: "2",
    exptext: "✅ Plurality of viewpoints; also called Saptabhanginaya. 📌 Anek = many. ❌ Jainism has no creator God."
  },
  19: {
    questext: "Sallekhana (Santhara) in Jainism refers to:",
    options: ["a Jain monastery", "inflow of karma", "supreme knowledge", "giving up life by fasting"],
    correct: "4",
    exptext: "✅ Voluntary fasting unto death. 📌 Rajasthan HC banned it in 2015. ❌ Basadi is the monastery; Asrava is karma inflow."
  },
  20: {
    type: "concept", icon: "📚", accent: "#14b8a6", pauseTimer: true,
    title: "7.4 Jain Literature & Architecture",
    html: `
      <p class="cp-lead">Jain literature is in <b>Prakrit and Sanskrit</b>; temples and caves spread from Odisha to Khajuraho.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Angas / Agam sutra</td><td>Sacred books</td></tr><tr><td>Kalpasutra</td><td>Lives of the Tirthankaras; by <b>Bhadrabahu</b>, in Sanskrit</td></tr><tr><td>Bhagwati Sutra</td><td>Mahavir's life; mentions the <b>16 Mahajanapadas</b></td></tr><tr><td>Odisha</td><td>Rock-cut cave temples; <b>Hathigumpha</b> (Kharavela), Udayagiri and Khandagiri caves</td></tr><tr><td>Dilwara</td><td>Mount Abu, Rajasthan</td></tr><tr><td>Gomateshwara / Bahubali</td><td>Shravanabelagola, Karnataka</td></tr><tr><td>Ellora and Khajuraho</td><td>Maharashtra and Madhya Pradesh</td></tr></tbody></table>
    `
  },
  21: {
    questext: "Which Jain text mentions the 16 Mahajanapadas?",
    options: ["Bhagwati Sutra", "Kalpasutra", "Parishishtaparvan", "Ratnamalika"],
    correct: "1",
    exptext: "✅ The Bhagwati Sutra, which also narrates Mahavir's life. 📌 Bhagwati = 16 Mahajanapadas. ❌ Kalpasutra gives Tirthankara biographies."
  },
  22: {
    questext: "The famous Dilwara Jain temples are located at:",
    options: ["Ellora", "Khajuraho", "Mount Abu", "Shravanabelagola"],
    correct: "3",
    exptext: "✅ Mount Abu, Rajasthan. 📌 Dilwara = Abu. ❌ Shravanabelagola has the Bahubali statue."
  },
  23: {
    type: "concept", icon: "🤝", accent: "#ec4899", pauseTimer: true,
    title: "7.5 Spread, Patrons & Jain Councils",
    html: `
      <p class="cp-lead">Jainism spread most in <b>Mahavir's own time</b>, backed by Magadhan kings and later dynasties.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Early patrons</td><td>Bimbisara, Chandrapradyot, Ajatashatru, Udayin, Dadhivahan, Chetak</td></tr><tr><td>Chandragupta Maurya</td><td>A follower; First Jain Council in his reign</td></tr><tr><td>Kharavela</td><td>Built caves for Jain monks at Udayagiri</td></tr><tr><td>Amoghavarsha</td><td>Rashtrakuta; wrote <b>Ratnamalika</b></td></tr><tr><td>Chamunda Rai</td><td>Built the Bahubali/Gommateshwara statue at Shravanabelagola, <b>974 AD</b>; Mahamastakabhishek every <b>12 years</b></td></tr></tbody></table>
      <table><thead><tr><th>Council</th><th>Place · Chairman</th><th>Result</th></tr></thead><tbody><tr><td>First, 322 BC</td><td>Pataliputra (Bihar) · Sthulabhadra</td><td>Compilation of 12 Angas; split into Shwetambara and Digambara</td></tr><tr><td>Second, 513/526 AD</td><td>Vallabhi (Gujarat) · Devardhi Kshamasramana</td><td>11 Angas written down</td></tr></tbody></table>
      <div class="cp-note remember">Jain councils were also held at <b>Mathura</b> (Skandila) and an earlier one at <b>Vallabhi</b> (Nagarjunasuri), c. 4th century AD; <b>Digambaras do not accept the Vallabhi canon</b>.</div>
    `
  },
  24: {
    questext: "The First Jain Council at Pataliputra was chaired by:",
    options: ["Sthulabhadra", "Bhadrabahu", "Devardhi Kshamasramana", "Jamali"],
    correct: "1",
    exptext: "✅ Sthulabhadra, c. 322 BC. 📌 Sthula stayed; Bhadrabahu went south. ❌ Devardhi chaired the Vallabhi council."
  },
  25: {
    questext: "The Second Jain Council was held at:",
    options: ["Pataliputra", "Mathura", "Vallabhi", "Rajgir"],
    correct: "3",
    exptext: "✅ Vallabhi in Gujarat under Devardhi Kshamasramana. 📌 Vallabhi = Second. ❌ Pataliputra hosted the First."
  },
  26: {
    questext: "The Bahubali (Gommateshwara) statue at Shravanabelagola was built by:",
    options: ["Amoghavarsha", "Chamunda Rai", "Kharavela", "Chandragupta Maurya"],
    correct: "2",
    exptext: "✅ Chamunda Rai, 974 AD, with Mahamastakabhishek every 12 years. 📌 Chamunda = Gommata. ❌ Amoghavarsha wrote Ratnamalika."
  },
  27: {
    type: "concept", icon: "⚖️", accent: "#3b82f6", pauseTimer: true,
    title: "7.6 Shwetambara vs Digambara · Hinayana vs Mahayana",
    html: `
      <p class="cp-lead">Both faiths split into two sects — <u>learn the contrast pairs.</u></p>
      <table><thead><tr><th>Shwetambara</th><th>Digambara</th></tr></thead><tbody><tr><td>White-robed; linked with <b>Sthulabhadra</b> (Magadha)</td><td>Sky-clad / naked; linked with <b>Bhadrabahu</b> (south)</td></tr><tr><td>Clothes <b>not</b> necessary for salvation</td><td>Clothes <b>must</b> be given up</td></tr><tr><td>Women <b>can</b> attain Nirvana</td><td>Women <b>cannot</b></td></tr><tr><td>Food needed after Kaivalya</td><td>Food <b>not</b> needed</td></tr><tr><td>More liberal</td><td>More strict</td></tr></tbody></table>
      <table><thead><tr><th>Hinayana</th><th>Mahayana</th></tr></thead><tbody><tr><td>Buddha = a <b>great man</b></td><td>Buddha = <b>divine / deity</b></td></tr><tr><td>Buddha shown through <b>symbols</b></td><td><b>Idol worship</b> began</td></tr><tr><td>Self-effort, discipline, meditation</td><td>Grace of Buddha and <b>Bodhisattvas</b></td></tr><tr><td><b>Original</b> teachings; language <b>Pali</b></td><td>Buddha's divinity; <b>Sanskrit</b></td></tr><tr><td><b>Southern</b> Buddhism — Sri Lanka, Myanmar, Thailand, Indonesia</td><td><b>Northern</b> Buddhism — China, Korea, Japan</td></tr></tbody></table>
      <div class="cp-note trap">The Jain split is traced to a <b>12-year famine in Magadha</b>: Bhadrabahu went south (Digambara), Sthulabhadra stayed (Shwetambara).</div>
    `
  },
  28: {
    questext: "Which Jain sect is linked with Bhadrabahu and the south?",
    options: ["Shwetambara", "Parshvanath's sect", "Devardhi's sect", "Digambara"],
    correct: "4",
    exptext: "✅ Digambara (sky-clad), linked with Bhadrabahu. 📌 Bhadra went south. ❌ Shwetambaras follow Sthulabhadra of Magadha."
  },
  29: {
    questext: "Which statement is correct about the Shwetambaras?",
    options: ["Women cannot attain Nirvana", "Women can attain Nirvana", "Clothes must be given up", "Food is not needed after Kaivalya"],
    correct: "2",
    exptext: "✅ Shwetambaras are more liberal. 📌 White-robed = liberal. ❌ The other three are Digambara beliefs."
  },
  30: {
    questext: "Which of these is NOT a feature of Hinayana Buddhism?",
    options: ["Buddha as a great man", "Pali language", "Self-effort and discipline", "Idol worship of the Buddha"],
    correct: "4",
    exptext: "✅ Idol worship began in Mahayana. 📌 Hinayana uses symbols. ❌ The other three are Hinayana traits."
  },
  31: {
    questext: "Northern Buddhism (Mahayana) spread mainly to:",
    options: ["China, Korea, Japan", "Sri Lanka, Myanmar", "Thailand, Indonesia", "Sri Lanka and Thailand"],
    correct: "1",
    exptext: "✅ Mahayana spread north to China, Korea, Japan. 📌 North = Mahayana, South = Hinayana. ❌ The rest are southern Hinayana lands."
  },
  32: {
    type: "concept", icon: "📉", accent: "#f97316", pauseTimer: true,
    title: "Decline of Jainism",
    html: `
      <p class="cp-lead">Jainism faded because it was <b>too hard</b> for ordinary people.</p>
      <table><thead><tr><th>Cause</th><th>Detail</th></tr></thead><tbody><tr><td>Austerities</td><td>Strict fasts and austerities</td></tr><tr><td>Non-violence</td><td>Extreme ahimsa ruled out farming and warfare</td></tr><tr><td>Division</td><td>Internal differences</td></tr></tbody></table>
    `
  },
  33: {
    questext: "Which of the following was NOT a cause of the decline of Jainism?",
    options: ["Strict fasts and austerities", "Extreme non-violence", "Introduction of Brahmanical rituals", "Internal differences"],
    correct: "3",
    exptext: "✅ Brahmanical rituals entering the faith is cited for Buddhism's decline. 📌 Jain decline = strictness. ❌ The others are Jain causes."
  },
  34: {
    type: "concept", icon: "☸️", accent: "#84cc16", pauseTimer: true,
    title: "7.7 Buddhism — Buddha's Biography",
    html: `
      <p class="cp-lead">Founded by <b>Mahatma Buddha</b>, born <b>Siddhartha</b> and also called <b>Shakyamuni</b>, sage of the Shakyas.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Birth and death</td><td>Born at <b>Lumbini</b>, Nepal; died at <b>Kushinagar</b>, capital of the Mallas</td></tr><tr><td>Father</td><td><b>Shuddhodhan</b>, chief of the Shakya clan of Kapilavastu</td></tr><tr><td>Mother</td><td><b>Mayadevi / Mahamaya</b> of the Koliya republic; died on the 7th day</td></tr><tr><td>Raised by</td><td>Aunt <b>Prajapati Gautama</b></td></tr><tr><td>Wife</td><td><b>Yashodhara</b> (also Gopa, Bimba, Bhadrakachcha), later joined the Sangha</td></tr><tr><td>Son and cousin</td><td>Son <b>Rahula</b>, later a monk; cousin <b>Devadatta</b></td></tr><tr><td>Sujata</td><td>Farmer's daughter who offered rice milk at Bodh Gaya</td></tr></tbody></table>
      <div class="cp-note trap">Mahavir's father was <b>Siddhartha</b>, a name that is also Buddha's childhood name — do not mix the two.</div>
    `
  },
  35: {
    questext: "Buddha's mother Mayadevi belonged to which republic?",
    options: ["Koliya", "Shakya", "Malla", "Lichchhavi"],
    correct: "1",
    exptext: "✅ Koliya; his father was Shakya. 📌 Mother Koliya, father Shakya. ❌ Malla was the clan of Kushinagar."
  },
  36: {
    questext: "Who raised Buddha after his mother's death?",
    options: ["Yashodhara", "Sujata", "Prajapati Gautama", "Trishala"],
    correct: "3",
    exptext: "✅ His aunt Prajapati Gautama. 📌 Aunt = foster-mother. ❌ Trishala was Mahavir's mother."
  },
  37: {
    questext: "What was the name of Buddha's son?",
    options: ["Devadatta", "Rahula", "Jamali", "Ananda"],
    correct: "2",
    exptext: "✅ Rahula, later a monk. 📌 Rahula = Son. ❌ Devadatta was his cousin."
  },
  38: {
    questext: "Buddha died at:",
    options: ["Lumbini", "Bodh Gaya", "Sarnath", "Kushinagar"],
    correct: "4",
    exptext: "✅ Kushinagar, capital of the Mallas, at age 80. 📌 Birth Lumbini; death Kushinagar. ❌ Sarnath was the first sermon."
  },
  39: {
    type: "concept", icon: "🐎", accent: "#06b6d4", pauseTimer: true,
    title: "7.8 Four Sights, Symbols & First Sermon",
    html: `
      <p class="cp-lead">Four sights stirred him: an <b>old man</b>, a <b>sick man</b>, a <b>dead man</b> and a <b>happy Sanyasi</b>.</p>
      <table><thead><tr><th>Event</th><th>Symbol</th></tr></thead><tbody><tr><td>Birth</td><td>Lotus and Bull</td></tr><tr><td>Renunciation (Mahabhinishkramana)</td><td><b>Horse</b></td></tr><tr><td>Enlightenment (Nirvana)</td><td><b>Bodhi tree</b></td></tr><tr><td>First sermon (Dharmachakra Pravartana)</td><td><b>Wheel</b></td></tr><tr><td>Death (Mahaparinirvana)</td><td><b>Stupa</b></td></tr></tbody></table>
      <div class="cp-note exam">He left home at <b>29</b> with charioteer Channa and horse Kanthaka; teachers <b>Alara Kalam</b> and <b>Udraka Ramputta</b>; enlightenment at <b>35</b> on <b>Vaishakh Purnima</b> under the Bodhi tree at <b>Uruvela / Bodh Gaya</b>, despite Mara; thereafter <b>Buddha</b> or <b>Tathagata</b>.</div>
      <div class="cp-note remember">First sermon at <b>Sarnath Deer Park</b> to five Brahmin ascetics, the <b>Panchavargiya</b> — Kaundinya (Kondanna), Vappa, Bhaddiya, Mahanama, Assaji; <b>Kaundinya</b> first understood. At Rajgriha Bimbisara welcomed him; Sariputra, Mahamoggallana, Upali, Abhay became disciples.</div>
    `
  },
  40: {
    questext: "Which symbol represents Buddha's Mahabhinishkramana (renunciation)?",
    options: ["Lotus", "Horse", "Wheel", "Stupa"],
    correct: "2",
    exptext: "✅ The horse. 📌 Horse = leaving home. ❌ Wheel = first sermon; Stupa = Mahaparinirvana."
  },
  41: {
    questext: "Buddha's first sermon at Sarnath is called:",
    options: ["Mahaparinirvana", "Mahabhinishkramana", "Nirvana", "Dharmachakra Pravartana"],
    correct: "4",
    exptext: "✅ Dharmachakra Pravartana, symbolised by the wheel. 📌 Wheel = first sermon. ❌ Mahaparinirvana is his death."
  },
  42: {
    questext: "Who was the first among the Panchavargiya to understand the Dhamma?",
    options: ["Kaundinya", "Assaji", "Mahanama", "Vappa"],
    correct: "1",
    exptext: "✅ Kaundinya (Kondanna). 📌 Kaundinya = First. ❌ The other three also joined the five ascetics."
  },
  43: {
    type: "concept", icon: "🔥", accent: "#a855f7", pauseTimer: true,
    title: "7.9 Key Events & Mahaparinirvana",
    html: `
      <p class="cp-lead">Buddha preached for decades; his last meal led to <b>Mahaparinirvana</b> at Kushinagar.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Udayin of Kaushambi</td><td>Became Buddhist under <b>Pindola Bharadwaj</b>; donated <b>Ghoshitaram Vihar</b></td></tr><tr><td>Sermons</td><td>Maximum at <b>Shravasti</b>, capital of Kosala; main preaching centre <b>Magadha</b></td></tr><tr><td>Angulimal</td><td>Converted at Shravasti, 20th year after enlightenment</td></tr><tr><td>Women in the Sangha</td><td>Admitted at <b>Vaishali</b> on <b>Anand's</b> request; first nun Prajapati Gautama</td></tr><tr><td>Last meal</td><td><b>Sukaramaddava</b> at Chunda's place; Hiranyavati river</td></tr><tr><td>Last sermon</td><td>To <b>Subhadda</b> at Kushinagar</td></tr></tbody></table>
      <div class="cp-note remember">Relics went to <b>eight stupas</b> — Magadha, Vaishali, Kapilavastu, Alakappa, Ramgram, Pava, Kushinara, Vethadipa. The Mahaparinibbana Sutta names four pilgrimage sites: <b>Lumbini, Bodh Gaya, Sarnath, Kushinagar</b>; Ashoka's <b>Rummindei pillar</b> (c. 249 BC) marks Lumbini.</div>
    `
  },
  44: {
    questext: "Where did Buddha deliver the maximum number of sermons?",
    options: ["Rajgriha", "Vaishali", "Shravasti", "Sarnath"],
    correct: "3",
    exptext: "✅ Shravasti, capital of Kosala. 📌 Most sermons = Shravasti. ❌ Magadha was the main preaching region."
  },
  45: {
    questext: "Ghoshitaram Vihar was donated to the Sangha by:",
    options: ["Udayin of Kaushambi", "Bimbisara", "Ajatashatru", "Prasenjit"],
    correct: "1",
    exptext: "✅ Udayin of Kaushambi, who turned Buddhist under Pindola Bharadwaj. 📌 Ghoshita = Kaushambi. ❌ Bimbisara welcomed Buddha at Rajgriha."
  },
  46: {
    questext: "At whose request were women admitted into the Buddhist Sangha at Vaishali?",
    options: ["Yashodhara", "Sujata", "Ananda", "Upali"],
    correct: "3",
    exptext: "✅ Anand requested Buddha, and Prajapati Gautama became the first nun. 📌 Anand = Women's advocate. ❌ Upali was an expert in discipline."
  },
  47: {
    type: "concept", icon: "🛤️", accent: "#e11d48", pauseTimer: true,
    title: "7.10 Teachings · Eightfold Path · The Four Buddhist Councils",
    html: `
      <p class="cp-lead"><b>Four Noble Truths</b>, the <b>Eightfold Path</b> and four councils — the heart of Buddhism.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Buddhism_and_Jainism/2.png" alt="Eightfold Path wheel with eight spokes" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Eightfold Path (Ashtangika Marga)</th><th>Meaning</th></tr></thead><tbody><tr><td>Samyak Drishti</td><td>Right view</td></tr><tr><td>Samyak Sankalp</td><td>Right determination</td></tr><tr><td>Samyak Vak</td><td>Right speech</td></tr><tr><td>Samyak Karmant</td><td>Right action</td></tr><tr><td>Samyak Ajiv</td><td>Right livelihood</td></tr><tr><td>Samyak Vyayam</td><td>Right effort</td></tr><tr><td>Samyak Smriti</td><td>Right mindfulness</td></tr><tr><td>Samyak Samadhi</td><td>Right meditation</td></tr></tbody></table>
      <table><thead><tr><th>Council</th><th>Place · Period · Reign · Chairman</th></tr></thead><tbody><tr><td>First</td><td>Rajagriha · 483 BC · Ajatashatru (Haryanka) · <b>Mahakassapa</b></td></tr><tr><td>Second</td><td>Vaishali · 383 BC · Kalashoka (Shishunaga) · <b>Sabakmir / Subukami</b></td></tr><tr><td>Third</td><td>Pataliputra · 250 BC · Ashoka (Maurya) · <b>Moggaliputta Tissa</b></td></tr><tr><td>Fourth</td><td>Kundalvan · 1st century AD · Kanishka (Kushan) · <b>Vasumitra</b></td></tr></tbody></table>
      <div class="cp-note exam"><b>Four Noble Truths</b> — Dukha, Dukha Samudaya, Dukha Nirodha, Dukha Nirodha Gamini Pratipada (= the Eightfold Path). <b>Three Jewels</b>: Buddha · Dhamma · Sangha. <b>Middle Path</b> (Madhyama Pratipada) lies between luxury and severe austerity. Nirvana = extinguishing of the lamp.</div>
      <div class="cp-note trap">Purposes — First: compilation after the Mahaparinirvana; Second: discipline issues; Third: purification of doctrine; <b>Fourth: split into Hinayana and Mahayana</b>. Pataliputra hosted both the <b>1st Jain</b> and <b>3rd Buddhist</b> council.</div>
    `
  },
  48: {
    questext: "Who presided over the First Buddhist Council at Rajagriha?",
    options: ["Ananda", "Mahakassapa", "Vasumitra", "Moggaliputta Tissa"],
    correct: "2",
    exptext: "✅ Mahakassapa, under Ajatashatru, 483 BC. 📌 First = Rajagriha = Mahakassapa. ❌ Moggaliputta Tissa chaired the Third."
  },
  49: {
    questext: "The Second Buddhist Council at Vaishali was held in the reign of:",
    options: ["Ajatashatru", "Ashoka", "Kanishka", "Kalashoka"],
    correct: "4",
    exptext: "✅ Kalashoka of the Shishunaga dynasty, 383 BC. 📌 Second = Kalashoka. ❌ Ashoka reigned at the Third."
  },
  50: {
    questext: "Who chaired the Third Buddhist Council at Pataliputra?",
    options: ["Mahakassapa", "Moggaliputta Tissa", "Vasumitra", "Subukami"],
    correct: "2",
    exptext: "✅ Moggaliputta Tissa, under Ashoka, 250 BC. 📌 Third = Ashoka = Tissa. ❌ Vasumitra chaired the Fourth."
  },
  51: {
    questext: "Which Buddhist council led to the split into Hinayana and Mahayana?",
    options: ["First", "Second", "Third", "Fourth"],
    correct: "4",
    exptext: "✅ The Fourth council at Kundalvan under Kanishka. 📌 Fourth = Split. ❌ Earlier councils compiled and cleaned doctrine."
  },
  52: {
    questext: "The fourth Noble Truth, ‘Dukha Nirodha Gamini Pratipada’, is the:",
    options: ["Eightfold Path", "Middle Path", "Three Jewels", "Nirvana"],
    correct: "1",
    exptext: "✅ It is the Eightfold Path leading to the end of sorrow. 📌 Fourth Truth = Path. ❌ Middle Path is a separate teaching."
  },
  53: {
    type: "concept", icon: "🪷", accent: "#10b981", pauseTimer: true,
    title: "7.11 Bodhisattvas",
    html: `
      <p class="cp-lead"><b>Bodhisattvas</b> are the compassionate beings of <b>Mahayana</b> Buddhism.</p>
      <table><thead><tr><th>Bodhisattva</th><th>Meaning</th></tr></thead><tbody><tr><td>Vajrapani</td><td>Thunderbolt like Indra; enemy of sin and evil</td></tr><tr><td>Avalokiteshvara / Padmapani</td><td>Lotus-bearer; compassionate lord who looks down</td></tr><tr><td>Manjushri / Manjunath</td><td>Stimulator of understanding</td></tr><tr><td>Maitreya</td><td>Future Buddha</td></tr><tr><td>Kshitigriha</td><td>Guardian of purgatories</td></tr><tr><td>Amitabha / Amitayusha</td><td>Buddha of heaven</td></tr></tbody></table>
    `
  },
  54: {
    questext: "Which Bodhisattva is known as the future Buddha?",
    options: ["Manjushri", "Vajrapani", "Maitreya", "Kshitigriha"],
    correct: "3",
    exptext: "✅ Maitreya. 📌 Maitreya = Maybe next. ❌ Manjushri stimulates understanding."
  },
  55: {
    questext: "Padmapani, the lotus-bearer, is another name of:",
    options: ["Avalokiteshvara", "Vajrapani", "Manjushri", "Amitabha"],
    correct: "1",
    exptext: "✅ Avalokiteshvara, the compassionate lord. 📌 Padma = Lotus. ❌ Vajrapani carries the thunderbolt."
  },
  56: {
    type: "concept", icon: "📜", accent: "#eab308", pauseTimer: true,
    title: "7.12 Buddhist Literature",
    html: `
      <p class="cp-lead">The <b>Tripitaka</b>, compiled in the councils after Mahaparinirvana, is among the <b>earliest Buddhist scriptures</b>.</p>
      <table><thead><tr><th>Text</th><th>Description</th></tr></thead><tbody><tr><td>Suttapitaka</td><td>Principles of Buddhism; <b>Anand</b></td></tr><tr><td>Vinayapitaka</td><td>Discipline for monks and nuns; Sangha functioning; <b>Upali</b></td></tr><tr><td>Abhidhammapitaka</td><td>Philosophy of the teachings; <b>Moggaliputta Tissa</b>, Third Council</td></tr><tr><td>Milindapanho</td><td>Dialogue between Menander and <b>Nagasena</b></td></tr><tr><td>Dipavamsa</td><td>4th century AD history of Sri Lanka</td></tr><tr><td>Mahavamsa</td><td>Systematic list of Magadha kings; <b>Madanta Mahanama</b>, 5th–6th century AD</td></tr><tr><td>Jataka Tales</td><td>Stories of Buddha's previous births; in <b>Pali</b></td></tr><tr><td>Mahavastu</td><td>Text related to the Vinayapitaka</td></tr></tbody></table>
    `
  },
  57: {
    questext: "The Vinayapitaka, on monastic discipline, is associated with:",
    options: ["Ananda", "Moggaliputta Tissa", "Upali", "Mahakassapa"],
    correct: "3",
    exptext: "✅ Upali. 📌 Upali = Rules. ❌ Anand is linked to the Suttapitaka."
  },
  58: {
    questext: "The Abhidhammapitaka is linked with which Third Council figure?",
    options: ["Ananda", "Moggaliputta Tissa", "Upali", "Vasumitra"],
    correct: "2",
    exptext: "✅ Moggaliputta Tissa, Third Council. 📌 Abhidhamma = Philosophy = Tissa. ❌ Vasumitra belonged to the Fourth."
  },
  59: {
    questext: "Which Buddhist text gives a systematic list of Magadha kings?",
    options: ["Dipavamsa", "Jataka Tales", "Mahavastu", "Mahavamsa"],
    correct: "4",
    exptext: "✅ The Mahavamsa, by Madanta Mahanama, 5th–6th century AD. 📌 Maha + vamsa = Magadha kings. ❌ Dipavamsa is an earlier Sri Lankan history."
  },
  60: {
    type: "concept", icon: "🙏", accent: "#0ea5e9", pauseTimer: true,
    title: "7.13 Mudras & Stupa Architecture",
    html: `
      <p class="cp-lead">Hand gestures (<b>mudras</b>) and stupa parts carry symbolic meaning.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Buddhism_and_Jainism/3.png" alt="Stupa cross-section with labelled parts" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Mudra</th><th>Meaning</th></tr></thead><tbody><tr><td>Dharmacchakra</td><td>First sermon at Sarnath</td></tr><tr><td>Bhumisparsha</td><td>Enlightenment at Bodh Gaya</td></tr><tr><td>Abhaya</td><td>Fearlessness</td></tr><tr><td>Gyan</td><td>Knowledge</td></tr><tr><td>Varada</td><td>Surrender, blessing</td></tr></tbody></table>
      <table><thead><tr><th>Stupa part</th><th>Meaning</th></tr></thead><tbody><tr><td>Medhi</td><td>Terraced base</td></tr><tr><td>Anda</td><td>Hemispherical dome, the universe</td></tr><tr><td>Harmika</td><td>Square railing on the dome, the Eightfold Path</td></tr><tr><td>Yashti &amp; Chattra</td><td>Pillar with tiered umbrellas; royalty and protection of the Dharma</td></tr><tr><td>Pradakshina Path</td><td>Walkway for circumambulation</td></tr></tbody></table>
    `
  },
  61: {
    questext: "The Bhumisparsha mudra represents:",
    options: ["the first sermon at Sarnath", "enlightenment at Bodh Gaya", "fearlessness", "blessing"],
    correct: "2",
    exptext: "✅ Touching the earth at Bodh Gaya. 📌 Bhumi = Earth = Enlightenment. ❌ Dharmacchakra is the first sermon."
  },
  62: {
    questext: "Which part of a stupa is the hemispherical dome symbolising the universe?",
    options: ["Medhi", "Harmika", "Chattra", "Anda"],
    correct: "4",
    exptext: "✅ The Anda. 📌 Anda = Egg-shaped dome. ❌ Medhi is the terraced base."
  },
  63: {
    type: "concept", icon: "🏚️", accent: "#d946ef", pauseTimer: true,
    title: "7.14 Decline of Buddhism",
    html: `
      <p class="cp-lead">Buddhism faded as it lost its <b>simplicity</b> and its <b>royal support</b>.</p>
      <table><thead><tr><th>Cause</th><th>Detail</th></tr></thead><tbody><tr><td>Rituals</td><td><b>Brahmanical rituals</b> entered Buddhism</td></tr><tr><td>Distance</td><td>Monks moved away from common people</td></tr><tr><td>Language</td><td><b>Pali abandoned for Sanskrit</b></td></tr><tr><td>Wealth</td><td>Wealthy monasteries drew invaders</td></tr><tr><td>Patronage</td><td>Royal support went to Brahmanism under Shunga, Kanva, Andhra-Satavahana and Gupta rulers; rivalry with Shaivism</td></tr><tr><td>Shashanka</td><td>Shaiva ruler of Bengal said to have cut the Bodhi tree at Bodh Gaya</td></tr></tbody></table>
      <div class="cp-note remember"><b>Vajrayana</b> (‘thunderbolt vehicle’, tantric) was the third vehicle; its monasteries were <b>Nalanda</b> (Kumaragupta I) and <b>Vikramashila</b> (Dharmapala, Pala).</div>
    `
  },
  64: {
    questext: "Which ruler of Bengal is said to have cut the Bodhi tree at Bodh Gaya?",
    options: ["Shashanka", "Pushyamitra", "Harsha", "Kharavela"],
    correct: "1",
    exptext: "✅ Shashanka, a Shaiva ruler. 📌 Shashanka = Shaiva axe. ❌ Pushyamitra is accused of persecution in Buddhist texts."
  },
  65: {
    questext: "The Vikramashila monastery was built by:",
    options: ["Kumaragupta I", "Ashoka", "Dharmapala", "Harsha"],
    correct: "3",
    exptext: "✅ Dharmapala of the Pala dynasty. 📌 Nalanda = Kumaragupta I; Vikramashila = Dharmapala. ❌ Kumaragupta I built Nalanda."
  },
  66: {
    type: "concept", icon: "⚔️", accent: "#64748b", pauseTimer: true,
    title: "7.15 Buddhism vs Jainism",
    html: `
      <p class="cp-lead">Both are <b>Kshatriya-born, anti-Vedic</b> faiths, but they part ways on the path.</p>
      <table><thead><tr><th>Point</th><th>Buddhism</th><th>Jainism</th></tr></thead><tbody><tr><td>Founders</td><td>Kshatriya clans</td><td>Kshatriya clans</td></tr><tr><td>Vedas</td><td>Rejected</td><td>Rejected</td></tr><tr><td>Karma and rebirth</td><td>Held</td><td>Held</td></tr><tr><td>Nirvana</td><td>In this life</td><td>Liberation from the body</td></tr><tr><td>Path</td><td>Middle Path</td><td>Rigorous penance</td></tr><tr><td>Caste</td><td>Criticised strongly</td><td>Criticised less</td></tr><tr><td>Ahimsa and Aparigraha</td><td>Less emphasis</td><td>More emphasis</td></tr><tr><td>Language</td><td>Pali</td><td>Prakrit</td></tr></tbody></table>
    `
  },
  67: {
    questext: "Which feature is common to both Buddhism and Jainism?",
    options: ["Rejection of the Vedas", "Belief in a creator God", "Idol worship from the beginning", "Sanskrit as the main language"],
    correct: "1",
    exptext: "✅ Both rejected the Vedas, both had Kshatriya founders and both held karma and rebirth. 📌 Same rejection. ❌ Neither believed in a creator God."
  },
  68: {
    questext: "The original languages of Buddhist and Jain literature respectively were:",
    options: ["Pali and Sanskrit", "Prakrit and Pali", "Pali and Prakrit", "Sanskrit and Tamil"],
    correct: "3",
    exptext: "✅ Pali for Buddhism, Prakrit for Jainism. 📌 B-P, J-P: Pali for Buddha. ❌ Sanskrit came later in Mahayana."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Buddhism_and_Jainism/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a golden Dharmachakra wheel with two deer, a carved Jain Tirthankara figure and a Buddhist stupa dome" },
  "images/General_Awareness/Ancient_India/Buddhism_and_Jainism/1.png": { t: "fig", about: "Four symbols with labels: Bull (Rishabhdev), Conch (Arishtanemi), Serpent hood (Parshvanath), Lion (Mahavir)." },
  "images/General_Awareness/Ancient_India/Buddhism_and_Jainism/2.png": { t: "fig", about: "Eight-spoke Dharmachakra wheel, each spoke labelled: Right view, determination, speech, action, livelihood, effort, mindfulness, meditation." },
  "images/General_Awareness/Ancient_India/Buddhism_and_Jainism/3.png": { t: "fig", about: "Stupa cross-section with labels: Medhi, Anda, Harmika, Yashti, Chattra, Pradakshina Path." }
});

/* CHANGE LOG
   - Mahavir's dates are printed in two traditions in the book (599–527 BC and 540–468 BC); both are kept.
   - Second Jain Council date kept as 513/526 AD, as printed in the book.
   - 'Sthulabahu' written as Sthulabhadra for consistency.
*/
