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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Gupta_Period · 20 concept pages (+ overview) · 59 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Gupta Period: The Golden Age",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Gupta_Period/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "GUPTA PERIOD",
      line2: "GOLDEN AGE",
      line3: "ANCIENT INDIA",
      badge: "FULL CLASS",
      ribbon: "RULERS • ADMINISTRATION • ART",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Gupta Period Full Chapter | Ancient India for SSC, UPSC, Railways",
      altTitles: ["Gupta Empire in One Class | Samudragupta to Skandagupta", "Golden Age of India — Gupta Period Important Questions"],
      description: "The Gupta Period is one of the most asked chapters of Ancient India. In this full class you learn the rulers, the Prayag Prashasti, the Navratnas, Fa-Hien, administration, society, art and science in simple words, with practice questions after every topic.\n\n📌 IN THIS CLASS\n✅ Sri Gupta to Skandagupta\n✅ Navratnas and Fa-Hien\n✅ Administration, taxes and economy\n✅ Art, literature and science\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Introduction\n\n👍 Like, share, subscribe.\n\n#GuptaPeriod #AncientIndia #SSCCGL #UPSC",
      tags: ["gupta period", "gupta empire", "gupta dynasty", "ancient india history", "samudragupta", "chandragupta II", "chandragupta I", "prayag prashasti", "allahabad pillar inscription", "navratnas of chandragupta II", "fa-hien", "gupta administration", "gupta art and architecture", "gupta period full chapter", "ancient history for ssc", "ancient history for upsc", "ssc cgl history", "railway ntpc history", "indian history crash course", "golden age of india", "kalidasa", "aryabhata", "skandagupta", "kumaragupta", "history mcq", "static gk history", "UPSC"],
      hashtags: ["GuptaPeriod", "AncientIndia", "SSCCGL", "UPSC"],
      thumbText: "GUPTA PERIOD — GOLDEN AGE",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New class is live: the complete Gupta Period. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Introduction",
      playlist: "Ancient India — Full Chapter Classes"
    },
    html: `
      <p class="cp-lead">A full class on the <u>Gupta Period</u> — the age of great kings, clear administration, fine art and early science.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>20</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>59</b><span>Questions</span></div>
        <div class="cp-stat"><b>~99 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Introduction and Sources</b><br>How the Guptas rose, and how we know about them.</li>
        <li><b>The Gupta Rulers</b><br>From Sri Gupta to Chandragupta II, with the Prayag Prashasti.</li>
        <li><b>Navratnas and Fa-Hien</b><br>The nine scholars and the Chinese traveller.</li>
        <li><b>Kumaragupta I, Skandagupta and the End</b><br>Nalanda, the Hun invasion and the fall.</li>
        <li><b>Administration and Revenue</b><br>Officers, provinces, courts, army and taxes.</li>
        <li><b>Society, Religion and Economy</b><br>Varnas, philosophy schools, land and ports.</li>
        <li><b>Art, Literature and Science</b><br>Temples, caves, authors and scientists.</li>
        <li><b>High-Yield Extras</b><br>Iron Pillar, coins and later inscriptions.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> the Gupta Period gives many direct questions every year in SSC, UPSC, Railways and Banking exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#22c55e", pauseTimer: true,
    title: "Introduction",
    html: `
      <p class="cp-lead">The Guptas rose in North India around <b>320 CE</b>, after the Kushanas lost power. Their age is called the <u>Golden Age</u> because science, art and literature grew fast.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Rise</td><td>About 320 CE, after the decline of the Kushanas</td></tr><tr><td>Origin</td><td>They may have served the Kushanas as local chiefs; many historians think they were Vaishyas</td></tr><tr><td>Other names</td><td>Classical Age and Golden Age</td></tr><tr><td>Capital</td><td>Pataliputra, modern Patna</td></tr><tr><td>Grand titles</td><td>Paramabhattaraka, Maharajadhiraja, Parameshwara, Samrat, Chakravartin</td></tr></tbody></table>
      <div class="cp-note exam">Remember Pataliputra as the capital. Ujjain became only a second capital later.</div>
    `
  },
  3: {
    questext: "What was the capital of the Gupta empire?",
    options: ["Ujjain", "Pataliputra", "Kannauj", "Vallabhi"],
    correct: "2",
    exptext: "✅ Pataliputra, modern Patna. 📌 Ujjain was only an alternative capital later. ❌ Kannauj rose under successor dynasties."
  },
  4: {
    questext: "Which of these is NOT a title used by Gupta kings?",
    options: ["Paramabhattaraka", "Maharajadhiraja", "Chakravartin", "Devaputra"],
    correct: "4",
    exptext: "✅ Devaputra was a Kushana title. 📌 The Guptas followed it with their own grand titles. ❌ Chakravartin was used by Gupta kings."
  },
  5: {
    type: "concept", icon: "📚", accent: "#f59e0b", pauseTimer: true,
    title: "Sources",
    html: `
      <p class="cp-lead">We know about the Guptas from <b>books</b>, a <b>travel diary</b>, <b>coins</b> and <b>inscriptions</b> (writings carved on stone or metal).</p>
      <table><thead><tr><th>Source</th><th>What it tells us</th></tr></thead><tbody><tr><td>Devichandraguptam and Mudrarakshasa</td><td>Plays by Vishakhadatta</td></tr><tr><td>Works of Kalidasa</td><td>Poems and plays by the court poet</td></tr><tr><td>Mrichchhakatikam</td><td>Play by Shudraka</td></tr><tr><td>Kamasutra</td><td>Book by Vatsyayana</td></tr><tr><td>Fa-Hien</td><td>Chinese traveller who visited in the reign of Chandragupta II</td></tr><tr><td>I-Tsing</td><td>Mentioned Maharaja Sri Gupta and a shrine near Mrigasikhava for Chinese pilgrims</td></tr><tr><td>Coins</td><td>Gold Dinar, silver Rupak (Rupyak), copper Mashak</td></tr></tbody></table>
      <table><thead><tr><th>Inscription</th><th>Ruler or content</th></tr></thead><tbody><tr><td>Mehrauli Iron Pillar</td><td>Chandragupta</td></tr><tr><td>Allahabad Pillar (Prayag Prashasti)</td><td>Conquests of Samudragupta</td></tr><tr><td>Bhitari Pillar</td><td>Skandagupta</td></tr><tr><td>Junagadh</td><td>Skandagupta: rebuilding of Sudarshan Lake</td></tr></tbody></table>
      <div class="cp-note trap">Fa-Hien lived in the time of Chandragupta II. I-Tsing was a much later writer.</div>
    `
  },
  6: {
    questext: "Who wrote the play Mudrarakshasa?",
    options: ["Vishakhadatta", "Shudraka", "Vatsyayana", "Kalidasa"],
    correct: "1",
    exptext: "✅ Vishakhadatta wrote it, and also Devichandraguptam. 📌 Shudraka wrote Mrichchhakatikam. ❌ Vatsyayana wrote the Kamasutra."
  },
  7: {
    questext: "The Allahabad Pillar inscription mainly describes the achievements of",
    options: ["Chandragupta I", "Skandagupta", "Samudragupta", "Kumaragupta I"],
    correct: "3",
    exptext: "✅ It is the Prayag Prashasti of Samudragupta. 📌 Skandagupta's records are at Bhitari and Junagadh. ❌ Chandragupta I has no such long record."
  },
  8: {
    questext: "Which pair is correctly matched?",
    options: ["Bhitari Pillar – Samudragupta", "Mrichchhakatikam – Vatsyayana", "Junagadh inscription – Chandragupta I", "Kamasutra – Vatsyayana"],
    correct: "4",
    exptext: "✅ Vatsyayana wrote the Kamasutra. 📌 Bhitari and Junagadh are Skandagupta. ❌ Mrichchhakatikam is by Shudraka."
  },
  9: {
    type: "concept", icon: "👑", accent: "#ef4444", pauseTimer: true,
    title: "Sri Gupta, Ghatotkacha and Chandragupta I",
    html: `
      <p class="cp-lead">Sri Gupta started the family, but <b>Chandragupta I</b> built the real empire.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Gupta_Period/1.png" alt="Chain of Gupta kings with years" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Key facts</th></tr></thead><tbody><tr><td>Sri Gupta</td><td>Founder of the dynasty, probably of the Vaishya caste; title Maharaja</td></tr><tr><td>Ghatotkacha</td><td>Son of Sri Gupta; title Maharaja</td></tr><tr><td>Chandragupta I (319–350 CE)</td><td>Real founder of the empire; title Maharajadhiraja</td></tr><tr><td>Marriage</td><td>Married Kumaradevi, a Lichchhavi princess, which raised Gupta prestige</td></tr><tr><td>Area ruled</td><td>Magadha, Saket and Prayag</td></tr><tr><td>Gupta Samvat</td><td>Began in 319 CE at his coronation (Gupta Samvat minus Shaka Samvat equals 241 years)</td></tr></tbody></table>
      <div class="cp-note trap">Sri Gupta founded the <i>dynasty</i>. Chandragupta I is the <i>real founder</i> of the empire.</div>
      <div class="cp-mnemonic">78 + 241 = <b>319</b> — the Shaka era starts in 78 CE, and adding 241 gives the Gupta era</div>
    `
  },
  10: {
    questext: "The Gupta Samvat began in",
    options: ["78 CE", "319 CE", "240 CE", "380 CE"],
    correct: "2",
    exptext: "✅ 319 CE, at the coronation of Chandragupta I. 📌 Shaka era (78 CE) plus 241 years. ❌ 78 CE is the Shaka era."
  },
  11: {
    questext: "Chandragupta I raised Gupta prestige by marrying Kumaradevi of which family?",
    options: ["Naga", "Vakataka", "Kadamba", "Lichchhavi"],
    correct: "4",
    exptext: "✅ Kumaradevi was a Lichchhavi princess. 📌 Naga princess Kubernaga was married by Chandragupta II. ❌ Vakataka was linked through Prabhavati."
  },
  12: {
    questext: "I. Sri Gupta was the founder of the dynasty. II. Chandragupta I is called the real founder of the empire. III. Ghatotkacha was Sri Gupta's brother. Which are correct?",
    options: ["I only", "I and II only", "II and III only", "I, II and III"],
    correct: "2",
    exptext: "✅ I and II are correct. 📌 Ghatotkacha was the son of Sri Gupta. ❌ III makes him a brother, which is wrong."
  },
  13: {
    type: "concept", icon: "⚔️", accent: "#8b5cf6", pauseTimer: true,
    title: "Samudragupta (350–375 CE)",
    html: `
      <p class="cp-lead">Samudragupta won so many wars that Vincent Smith called him the <b>'Napoleon of India'</b>.</p>
      <table><thead><tr><th>Topic</th><th>Detail</th></tr></thead><tbody><tr><td>Father</td><td>Chandragupta I</td></tr><tr><td>Court poet</td><td>Harisena, who called him a hero of a hundred battles</td></tr><tr><td>Record of his wars</td><td>Prayag Prashasti, also called the Allahabad Pillar inscription</td></tr><tr><td>North India</td><td>Defeated many rulers of Aryavarta; in the Second Aryavarta War nine rulers were defeated</td></tr><tr><td>South India</td><td>Dakshinapatha rulers were captured, released and favoured</td></tr><tr><td>Religious act</td><td>Performed the Ashvamedha Yajna (horse sacrifice)</td></tr><tr><td>Titles</td><td>Kaviraja (called so in the Allahabad inscription) and Parambhagavat</td></tr><tr><td>Patrons</td><td>Harisena, Vasubandhu and Asanga</td></tr><tr><td>Kind act</td><td>Allowed the Sri Lankan king Meghavarman to build a monastery at Bodh Gaya</td></tr></tbody></table>
      <div class="cp-note trap">Samudragupta was a Vaishnavite, but he was tolerant of other faiths.</div>
    `
  },
  14: {
    questext: "Which Gupta king is called the 'Napoleon of India' by Vincent Smith?",
    options: ["Chandragupta I", "Chandragupta II", "Samudragupta", "Skandagupta"],
    correct: "3",
    exptext: "✅ Samudragupta, because of his many conquests. 📌 Harisena called him hero of a hundred battles. ❌ Chandragupta II is known as Vikramaditya."
  },
  15: {
    questext: "Harisena, who wrote the Prayag Prashasti, was the court poet of",
    options: ["Samudragupta", "Chandragupta II", "Kumaragupta I", "Skandagupta"],
    correct: "1",
    exptext: "✅ Harisena served Samudragupta. 📌 The Prayag Prashasti praises his conquests. ❌ Kalidasa was linked to Chandragupta II."
  },
  16: {
    questext: "Which statement about Samudragupta is NOT correct?",
    options: ["He performed the Ashvamedha Yajna.", "The Allahabad inscription calls him Kaviraja.", "He permitted Meghavarman to build a monastery at Bodh Gaya.", "He defeated the last Shaka ruler Rudrasimha III."],
    correct: "4",
    exptext: "✅ Rudrasimha III was defeated by Chandragupta II. 📌 Samudragupta fought Aryavarta and southern kings. ❌ The other three are true."
  },
  17: {
    questext: "Which king took permission from Samudragupta to build a monastery at Bodh Gaya?",
    options: ["Kakustavarman of Kadamba", "Rudrasena II of Vakataka", "Rudrasimha III of Ujjain", "Meghavarman of Sri Lanka"],
    correct: "4",
    exptext: "✅ Meghavarman of Sri Lanka. 📌 Bodh Gaya was holy for Buddhists. ❌ The other kings are linked to Chandragupta II's period."
  },
  18: {
    type: "concept", icon: "📜", accent: "#14b8a6", pauseTimer: true,
    title: "The Five Policies of the Prayag Prashasti",
    html: `
      <p class="cp-lead">Harisena's Sanskrit praise poem lists how Samudragupta treated each kind of ruler.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Gupta_Period/2.png" alt="Five policies of Samudragupta" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Policy</th><th>Meaning and who it was used on</th></tr></thead><tbody><tr><td>Prasabhoddharana</td><td>Violent uprooting of the Aryavarta kings</td></tr><tr><td>Sarva-kara-dana-ajna-karana</td><td>Frontier states paid all taxes and obeyed orders</td></tr><tr><td>Paricharakikrita</td><td>Rulers reduced to servants</td></tr><tr><td>Grahana-moksha-anugraha</td><td>Capture, release and favour for the Dakshinapatha (southern) kings</td></tr><tr><td>Kanyopayana-dana</td><td>Offering daughters in marriage by the foreign rulers</td></tr></tbody></table>
      <div class="cp-note trap">Southern kings were captured, released and favoured. They were not uprooted.</div>
      <div class="cp-note exam">The inscription is carved on an Ashokan pillar at Allahabad, in Brahmi script and Sanskrit. It carries no date.</div>
    `
  },
  19: {
    questext: "Which policy of Samudragupta was used for the Dakshinapatha kings?",
    options: ["Prasabhoddharana", "Grahana-moksha-anugraha", "Kanyopayana-dana", "Paricharakikrita"],
    correct: "2",
    exptext: "✅ Capture, release and favour. 📌 South was too far to rule directly. ❌ Prasabhoddharana was for Aryavarta kings."
  },
  20: {
    questext: "Kanyopayana-dana, offering daughters in marriage, was a policy towards",
    options: ["Foreign rulers", "Frontier states", "Southern kings", "Aryavarta kings"],
    correct: "1",
    exptext: "✅ Foreign rulers offered their daughters. 📌 Marriage showed respect and friendship. ❌ Frontier states paid taxes and obeyed orders."
  },
  21: {
    questext: "Which statement about the Prayag Prashasti is true?",
    options: ["It is written in Pali on a copper plate.", "It is engraved in Brahmi script and Sanskrit on an Ashokan pillar.", "It gives the exact date of Samudragupta's coronation.", "It was composed by Kalidasa."],
    correct: "2",
    exptext: "✅ It is in Brahmi and Sanskrit on the Ashokan pillar at Allahabad. 📌 It has no date. ❌ Harisena, not Kalidasa, composed it."
  },
  22: {
    type: "concept", icon: "🌟", accent: "#ec4899", pauseTimer: true,
    title: "Ramagupta and Chandragupta II (380–412 CE)",
    html: `
      <p class="cp-lead">Chandragupta II took the empire to its <b>peak</b>. He is identified with the legendary Vikramaditya.</p>
      <table><thead><tr><th>Topic</th><th>Detail</th></tr></thead><tbody><tr><td>Ramagupta</td><td>Succeeded Samudragupta. By tradition he agreed to give his wife Dhruvadevi to a Shaka ruler</td></tr><tr><td>The rescue</td><td>Chandragupta II entered the Shaka camp in disguise and killed the Shaka king; he then killed Ramagupta, became king and married Dhruvadevi</td></tr><tr><td>Marriage alliances</td><td>Married Kubernaga, a Naga princess; daughter Prabhavati married Rudrasena II of the Vakataka dynasty; son Kumaragupta I married the daughter of the Kadamba king Kakustavarman</td></tr><tr><td>Victory</td><td>Defeated the last Shaka ruler, Rudrasimha III of Ujjain</td></tr><tr><td>Titles</td><td>Vikramaditya and Shakari</td></tr><tr><td>Ujjain</td><td>Became a great trading city and an alternative capital</td></tr><tr><td>Court</td><td>Famous for the Navratnas, including Kalidasa; Fa-Hien visited in his reign</td></tr></tbody></table>
      <div class="cp-note trap">Vikramaditya and Shakari belong to Chandragupta II. Mahendraditya belongs to Kumaragupta I.</div>
    `
  },
  23: {
    questext: "The last Shaka ruler Rudrasimha III of Ujjain was defeated by",
    options: ["Samudragupta", "Skandagupta", "Chandragupta II", "Kumaragupta I"],
    correct: "3",
    exptext: "✅ Chandragupta II ended Shaka rule in the west. 📌 Hence the title Shakari. ❌ Samudragupta fought Aryavarta and southern kings."
  },
  24: {
    questext: "Prabhavati, the daughter of Chandragupta II, married the ruler of which dynasty?",
    options: ["Kadamba", "Vakataka", "Naga", "Pushyabhuti"],
    correct: "2",
    exptext: "✅ She married Rudrasena II of the Vakataka dynasty. 📌 Kadamba link came through her brother. ❌ Naga was her mother Kubernaga's family."
  },
  25: {
    questext: "Which title did Chandragupta II take after defeating the Shakas?",
    options: ["Shakari", "Mahendraditya", "Kaviraja", "Ashvamedhaparakrama"],
    correct: "1",
    exptext: "✅ Shakari means enemy of the Shakas. 📌 He was also Vikramaditya. ❌ Mahendraditya was Kumaragupta I."
  },
  26: {
    questext: "Which city became an alternative capital under Chandragupta II?",
    options: ["Kannauj", "Mathura", "Vallabhi", "Ujjain"],
    correct: "4",
    exptext: "✅ Ujjain, after the Shaka defeat. 📌 It became a great trading city. ❌ Kannauj and Vallabhi rose later."
  },
  27: {
    type: "concept", icon: "💎", accent: "#3b82f6", pauseTimer: true,
    title: "The Navratnas of Chandragupta II",
    html: `
      <p class="cp-lead">The <b>nine jewels</b> were great scholars in the court of Chandragupta II.</p>
      <table><thead><tr><th>Navratna</th><th>Field</th><th>Works</th></tr></thead><tbody><tr><td>Kalidasa</td><td>'Shakespeare of India', Vaidarbhi style</td><td>Plays: Abhijnanasakuntalam, Vikramorvashiyam, Malavikagnimitram. Epics: Raghuvamsam, Kumarasambhavam. Poems: Meghadutam, Ritusamhara</td></tr><tr><td>Dhanvantari</td><td>Medicine</td><td>—</td></tr><tr><td>Kshapanaka</td><td>Astrology</td><td>—</td></tr><tr><td>Amarasimha</td><td>Maker of a Sanskrit dictionary</td><td>Amarakosha</td></tr><tr><td>Shanku</td><td>Scholar and astrologer</td><td>—</td></tr><tr><td>Vetalabhatta</td><td>Magician and Sanskrit scholar</td><td>Niti-Pradipa, Vetala-Panchavimshatika</td></tr><tr><td>Ghatakarpara</td><td>Scholar and diplomat</td><td>Ghatakarpara Kavya</td></tr><tr><td>Varahamihira</td><td>Astronomy</td><td>Brihajjataka, Brihatsamhita, Panchasiddhantika</td></tr><tr><td>Vararuchi Katyayana</td><td>Grammar</td><td>Commentary on Panini's Sutras</td></tr></tbody></table>
      <div class="cp-note trap">Kalidasa wrote poems and plays. Mudrarakshasa was written by Vishakhadatta.</div>
    `
  },
  28: {
    questext: "Who is known as the 'Shakespeare of India'?",
    options: ["Shudraka", "Vishakhadatta", "Kalidasa", "Amarasimha"],
    correct: "3",
    exptext: "✅ Kalidasa, for his poems and plays. 📌 He wrote in the Vaidarbhi style. ❌ Vishakhadatta wrote Mudrarakshasa."
  },
  29: {
    questext: "Amarakosha, a Sanskrit dictionary, was written by",
    options: ["Amarasimha", "Varahamihira", "Dhanvantari", "Vararuchi Katyayana"],
    correct: "1",
    exptext: "✅ Amarasimha, the lexicographer. 📌 Amara plus kosha means a treasury of words. ❌ Varahamihira worked on astronomy."
  },
  30: {
    questext: "Which of these is NOT a work of Kalidasa?",
    options: ["Meghadutam", "Ritusamhara", "Raghuvamsam", "Mudrarakshasa"],
    correct: "4",
    exptext: "✅ Mudrarakshasa is by Vishakhadatta. 📌 Kalidasa wrote poems and plays. ❌ The other three are his poems."
  },
  31: {
    type: "concept", icon: "🧳", accent: "#f97316", pauseTimer: true,
    title: "Fa-Hien's Account",
    html: `
      <p class="cp-lead">Fa-Hien came as a <b>pilgrim</b>, not as a politician. He wrote what he saw in the Gupta empire.</p>
      <table><thead><tr><th>Topic</th><th>Detail</th></tr></thead><tbody><tr><td>Stay</td><td>Came in 399 CE and returned in 414 CE; spent six years in the Gupta empire</td></tr><tr><td>Pataliputra</td><td>Spent three years here studying Sanskrit</td></tr><tr><td>Aim</td><td>To visit Buddhist holy places and collect Buddhist texts</td></tr><tr><td>Places visited</td><td>Nalanda, Rajgriha, Bodh Gaya, Vaishali, Shravasti, Kapilavastu</td></tr><tr><td>Gangetic valley</td><td>He called it the land of Brahmanism</td></tr><tr><td>People</td><td>Prosperous, with mild punishments</td></tr><tr><td>Name for India</td><td>Yin-Tu in Chinese texts</td></tr></tbody></table>
      <div class="cp-note exam">Fa-Hien came in the reign of Chandragupta II (399–414 CE).</div>
    `
  },
  32: {
    questext: "Which Chinese traveller visited the Gupta empire between 399 and 414 CE?",
    options: ["Hiuen Tsang", "Fa-Hien", "I-Tsing", "Sung Yun"],
    correct: "2",
    exptext: "✅ Fa-Hien came in the reign of Chandragupta II. 📌 I-Tsing came much later. ❌ Hiuen Tsang visited in Harsha's time."
  },
  33: {
    questext: "What was the main aim of Fa-Hien's visit to India?",
    options: ["Trade in spices", "Study of Gupta politics", "To visit Buddhist holy places and collect Buddhist texts", "To get military help for China"],
    correct: "3",
    exptext: "✅ He was interested in religion, not politics. 📌 He visited Bodh Gaya and Kapilavastu. ❌ Trade was not his aim."
  },
  34: {
    questext: "Fa-Hien described the Gangetic valley as the land of",
    options: ["Brahmanism", "Buddhism", "Jainism", "Sun worship"],
    correct: "1",
    exptext: "✅ He called it the land of Brahmanism. 📌 Buddhism had begun to decline. ❌ Buddhist places were what he came to see."
  },
  35: {
    type: "concept", icon: "🛡️", accent: "#84cc16", pauseTimer: true,
    title: "Kumaragupta I, Skandagupta and the End",
    html: `
      <p class="cp-lead">After Chandragupta II, two strong kings held the empire. Then it slowly broke up.</p>
      <table><thead><tr><th>Ruler</th><th>Key facts</th></tr></thead><tbody><tr><td>Kumaragupta I (415–455 CE)</td><td>Titles Mahendraditya, Shrimahendra and Mahendra Ashvamedha; performed the Ashvamedha Yajna; founded Nalanda University, the 'Oxford of Mahayana'</td></tr><tr><td>Skandagupta (455–467 CE)</td><td>First Hun invasion; defeated the Hunas, called Mlechchhas in the Junagadh inscription</td></tr><tr><td>Sudarshan Lake</td><td>Restored under Skandagupta; work done by Chakrapalita, son of Parnadatta, governor of Saurashtra</td></tr><tr><td>China</td><td>Skandagupta sent an ambassador to the Chinese emperor Song in 466 CE</td></tr><tr><td>Vishnugupta III</td><td>Last ruler; Gupta rule lasted until about 550 CE</td></tr><tr><td>Successor dynasties</td><td>Maitrakas of Vallabhi, Maukharis of Kannauj and Pushyabhutis of Thaneshwar</td></tr></tbody></table>
      <div class="cp-note trap">Nalanda University was founded by Kumaragupta I. Sudarshan Lake was restored under Skandagupta.</div>
    `
  },
  36: {
    questext: "Nalanda University was founded by",
    options: ["Kumaragupta I", "Skandagupta", "Chandragupta II", "Samudragupta"],
    correct: "1",
    exptext: "✅ Kumaragupta I, who took the title Mahendraditya. 📌 It was called the Oxford of Mahayana. ❌ Skandagupta fought the Hunas."
  },
  37: {
    questext: "The first Hun invasion took place during the reign of",
    options: ["Kumaragupta I", "Chandragupta II", "Skandagupta", "Vishnugupta III"],
    correct: "3",
    exptext: "✅ Skandagupta defeated the Hunas. 📌 The Junagadh inscription calls them Mlechchhas. ❌ Vishnugupta III was the last ruler."
  },
  38: {
    questext: "Who was the last Gupta ruler?",
    options: ["Skandagupta", "Kumaragupta III", "Narasimhagupta", "Vishnugupta III"],
    correct: "4",
    exptext: "✅ Vishnugupta III ruled until about 550 CE. 📌 Power was already declining. ❌ Skandagupta ruled in 455–467 CE."
  },
  39: {
    questext: "Who completed the restoration of Sudarshan Lake under Skandagupta?",
    options: ["Parnadatta", "Harisena", "Chakrapalita", "Virasena"],
    correct: "3",
    exptext: "✅ Chakrapalita, son of Parnadatta. 📌 Parnadatta was the governor of Saurashtra. ❌ Harisena wrote the Prayag Prashasti."
  },
  40: {
    type: "concept", icon: "🗂️", accent: "#06b6d4", pauseTimer: true,
    title: "Administration: Central, Provincial and Judicial",
    html: `
      <p class="cp-lead">The Guptas ruled through a clear chain: king, ministers, provinces, districts and villages.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Gupta_Period/3.png" alt="Province, district and village chain" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Level</th><th>Name and head</th></tr></thead><tbody><tr><td>Centre</td><td>Council of ministers (mentioned by Kamandaka and Kalidasa); highest official Kumaramatya; chief minister Mantri Mukhya</td></tr><tr><td>Province</td><td>Desa or Bhukti, headed by Uparika, Bhogika or Bhogapati</td></tr><tr><td>District</td><td>Vishaya, headed by Vishayapati</td></tr><tr><td>Village</td><td>Led by Gramika, helped by elders called Kutumbikas and Mahamataras</td></tr><tr><td>Courts</td><td>Courts of the King, Puga, Shreni and Kul; judges Dandanayaka, Mahadandanayaka, Sarvadandanayaka; the city court in Mrichchhakatikam is the Adhikaran Mandap</td></tr></tbody></table>
      <div class="cp-note trap">Uparika is the provincial governor. Uparikara is a tax on temporary farmers.</div>
    `
  },
  41: {
    questext: "Which pair of Gupta administrative unit and its head is correct?",
    options: ["Bhukti – Gramika", "Vishaya – Vishayapati", "Gram – Uparika", "Desa – Mahadandanayaka"],
    correct: "2",
    exptext: "✅ A Vishaya (district) was headed by a Vishayapati. 📌 Province → district → village. ❌ Uparika headed the province."
  },
  42: {
    questext: "The highest official of the Gupta central government was the",
    options: ["Kumaramatya", "Mantri Mukhya", "Mahabaladhikrita", "Dandapashika"],
    correct: "1",
    exptext: "✅ Kumaramatya was the highest official. 📌 Mantri Mukhya was the chief minister. ❌ Mahabaladhikrita led the army."
  },
  43: {
    questext: "The city court mentioned in the play Mrichchhakatikam was called",
    options: ["Puga", "Shreni", "Kul", "Adhikaran Mandap"],
    correct: "4",
    exptext: "✅ The city court was the Adhikaran Mandap. 📌 Puga, Shreni and Kul were other courts. ❌ Those three were group courts, not city courts."
  },
  44: {
    type: "concept", icon: "🪖", accent: "#a855f7", pauseTimer: true,
    title: "Administration: Military, Police and Officials",
    html: `
      <p class="cp-lead">The army had four parts, and every important job had its own officer.</p>
      <table><thead><tr><th>Area</th><th>Officer or detail</th></tr></thead><tbody><tr><td>Army</td><td>Four parts: infantry, cavalry, elephant force and navy</td></tr><tr><td>Commander-in-chief</td><td>Mahabaladhikrita</td></tr><tr><td>Chief justice</td><td>Mahadandanayaka</td></tr><tr><td>Foreign affairs and treaties</td><td>Mahasandhivigrahaka</td></tr><tr><td>Palace administration</td><td>Mahapratihara</td></tr><tr><td>Head of police</td><td>Dandapashika</td></tr><tr><td>Head of treasury</td><td>Bhandagaradhikrita</td></tr><tr><td>Controller of cavalry</td><td>Mahashvapati</td></tr><tr><td>Police ranks</td><td>Dashaparadhika, Chauradharanika, Dandaposhika and Aggarakshaka; Duta was the intelligence officer and Bhat a police employee</td></tr><tr><td>City and village</td><td>Nagar Shreshthi for the city and Gram-Vriddha for the village</td></tr></tbody></table>
      <div class="cp-note trap">Mahabaladhikrita is the army chief. Mahadandanayaka is the chief justice. Mahasandhivigrahaka handles treaties.</div>
    `
  },
  45: {
    questext: "Who was the commander-in-chief in the Gupta administration?",
    options: ["Mahadandanayaka", "Mahasandhivigrahaka", "Mahabaladhikrita", "Bhandagaradhikrita"],
    correct: "3",
    exptext: "✅ Mahabaladhikrita led the army. 📌 Bala means force. ❌ Mahadandanayaka was the chief justice."
  },
  46: {
    questext: "Which is NOT one of the four divisions of the Gupta army?",
    options: ["Infantry", "Cavalry", "Elephant force", "Chariot force"],
    correct: "4",
    exptext: "✅ The four parts were infantry, cavalry, elephants and navy. 📌 Chariots were not listed. ❌ The other three were army divisions."
  },
  47: {
    questext: "Which officer handled treaties and foreign affairs?",
    options: ["Mahapratihara", "Mahasandhivigrahaka", "Dandapashika", "Mahashvapati"],
    correct: "2",
    exptext: "✅ Mahasandhivigrahaka handled treaties after war. 📌 Sandhi means peace treaty. ❌ Dandapashika headed the police."
  },
  48: {
    type: "concept", icon: "💰", accent: "#e11d48", pauseTimer: true,
    title: "Administration: Revenue and Taxes",
    html: `
      <p class="cp-lead">Land revenue was the main income of the state.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Bhaga</td><td>King's share, about one-sixth of the produce; Kalidasa called it Shashtamsha Vritti</td></tr><tr><td>Hiranya</td><td>Tax paid in cash</td></tr><tr><td>Meya</td><td>Tax paid in grain</td></tr><tr><td>Udranga</td><td>Land tax on permanent farmers</td></tr><tr><td>Uparikara</td><td>Tax on temporary farmers</td></tr><tr><td>Bhutavata Pratyaya</td><td>Tax on imported foreign goods</td></tr><tr><td>Dhruvadhikarana</td><td>Revenue collection officer</td></tr><tr><td>Nyayadhikarana</td><td>Land dispute officer</td></tr><tr><td>Agrahara</td><td>Tax-free land donated to temples and Brahmins</td></tr></tbody></table>
      <div class="cp-note trap">Udranga is for <i>permanent</i> farmers. Uparikara is for <i>temporary</i> farmers.</div>
    `
  },
  49: {
    questext: "What share of the produce did the Gupta king usually take as Bhaga?",
    options: ["One-fourth", "One-sixth", "One-third", "One-tenth"],
    correct: "2",
    exptext: "✅ About one-sixth. 📌 Kalidasa called it Shashtamsha Vritti, the sixth-part tax. ❌ One-fourth is too high."
  },
  50: {
    questext: "Which was the tax on imported foreign goods?",
    options: ["Bhutavata Pratyaya", "Udranga", "Uparikara", "Hiranya"],
    correct: "1",
    exptext: "✅ Bhutavata Pratyaya was the tax on foreign goods. 📌 Bhuta means outside things. ❌ Hiranya was tax paid in cash."
  },
  51: {
    questext: "Agrahara meant",
    options: ["A tax on temporary farmland", "A cash payment of tax", "A revenue collection officer", "Tax-free land donated to temples and Brahmins"],
    correct: "4",
    exptext: "✅ Agrahara was tax-free donated land. 📌 It reduced state income. ❌ Dhruvadhikarana was the collection officer."
  },
  52: {
    type: "concept", icon: "👥", accent: "#10b981", pauseTimer: true,
    title: "Society",
    html: `
      <p class="cp-lead">Gupta society was based on four varnas, and women and lower groups faced limits.</p>
      <table><thead><tr><th>Group</th><th>Condition</th></tr></thead><tbody><tr><td>Varnas</td><td>Brahmin, Kshatriya, Vaishya and Shudra; Brahmins held the highest place</td></tr><tr><td>Untouchables</td><td>Fa-Hien mentions Antyaja and Chandala; Chandalas did fishing, hunting and meat-selling</td></tr><tr><td>Widows</td><td>Widow remarriage was sometimes allowed</td></tr><tr><td>Sati</td><td>Rare but present</td></tr><tr><td>Other customs</td><td>Purdah and Devadasi systems existed</td></tr><tr><td>Women teachers</td><td>Called Upadhyaya and Acharya</td></tr><tr><td>Slavery</td><td>It existed</td></tr></tbody></table>
      <div class="cp-note trap">It is Fa-Hien, not a Gupta king, who mentions the Antyaja and Chandala groups.</div>
    `
  },
  53: {
    questext: "Which untouchable groups does Fa-Hien mention in Gupta society?",
    options: ["Antyaja and Chandala", "Shreshthi and Sarthavaha", "Kutumbika and Gramika", "Upadhyaya and Acharya"],
    correct: "1",
    exptext: "✅ Antyaja and Chandala. 📌 Chandalas did fishing, hunting and meat-selling. ❌ Upadhyaya and Acharya were women teachers."
  },
  54: {
    questext: "Which statement about women in Gupta society is correct?",
    options: ["Widow remarriage was never allowed", "Sati was practised in every family", "Sati was rare but present", "Purdah and Devadasi systems did not exist"],
    correct: "3",
    exptext: "✅ Sati was rare but present. 📌 Widow remarriage was sometimes allowed. ❌ Purdah and Devadasi systems did exist."
  },
  55: {
    type: "concept", icon: "🙏", accent: "#eab308", pauseTimer: true,
    title: "Religion and Philosophy",
    html: `
      <p class="cp-lead">Most Gupta rulers followed <b>Vaishnavism</b>, but other faiths survived.</p>
      <table><thead><tr><th>Topic</th><th>Detail</th></tr></thead><tbody><tr><td>Rulers' faith</td><td>Mostly Vaishnavite, with the title Parambhagavat</td></tr><tr><td>Royal symbol</td><td>Garuda</td></tr><tr><td>Buddhism and Jainism</td><td>Declined, but scholars like Vasubandhu were patronised</td></tr><tr><td>Epics</td><td>Ramayana and Mahabharata took their final form</td></tr></tbody></table>
      <table><thead><tr><th>School</th><th>Founder</th></tr></thead><tbody><tr><td>Sankhya</td><td>Kapila</td></tr><tr><td>Nyaya</td><td>Akshapada Gautama</td></tr><tr><td>Yoga</td><td>Patanjali</td></tr><tr><td>Vaisheshika</td><td>Kanada (Uluka)</td></tr><tr><td>Purva Mimamsa</td><td>Jaimini</td></tr><tr><td>Uttara Mimamsa (Vedanta)</td><td>Badarayana</td></tr></tbody></table>
      <div class="cp-note trap">Keep the pairs right: Sankhya with Kapila, Yoga with Patanjali.</div>
    `
  },
  56: {
    questext: "Which philosophy school is matched with its founder correctly?",
    options: ["Yoga – Jaimini", "Nyaya – Kapila", "Vaisheshika – Kanada", "Sankhya – Patanjali"],
    correct: "3",
    exptext: "✅ Vaisheshika was founded by Kanada. 📌 Kanada is also called Uluka. ❌ Yoga belongs to Patanjali, Sankhya to Kapila."
  },
  57: {
    questext: "What was the royal symbol of the Guptas?",
    options: ["Bull", "Lion", "Elephant", "Garuda"],
    correct: "4",
    exptext: "✅ Garuda, the bird of Vishnu. 📌 Rulers were Vaishnavite. ❌ The lion was the Mauryan Ashokan symbol."
  },
  58: {
    questext: "Which Buddhist scholar was patronised under the Guptas?",
    options: ["Vasubandhu", "Ashvaghosha", "Charaka", "Vishakhadatta"],
    correct: "1",
    exptext: "✅ Vasubandhu, patronised by Samudragupta. 📌 Buddhism declined but was not banned. ❌ Ashvaghosha was a Kushana-age poet."
  },
  59: {
    type: "concept", icon: "⚓", accent: "#0ea5e9", pauseTimer: true,
    title: "Economy and Trade",
    html: `
      <p class="cp-lead">Farming gave most of the income, and ports on both coasts carried trade with foreign lands.</p>
      <table><thead><tr><th>Land type</th><th>Meaning</th></tr></thead><tbody><tr><td>Kshetra</td><td>Cultivated land</td></tr><tr><td>Khila</td><td>Uncultivable land</td></tr><tr><td>Aprahata</td><td>Forest land</td></tr><tr><td>Gopata Sara</td><td>Pasture land</td></tr><tr><td>Vasti</td><td>Land for living</td></tr></tbody></table>
      <table><thead><tr><th>Trade</th><th>Detail</th></tr></thead><tbody><tr><td>Main port of western India</td><td>Bhrigukachchha (Bharuch)</td></tr><tr><td>Other ports</td><td>Kalyana, Sind, Tamralipti, Arikamedu, Kaveripattnam, Muziris, Sopara</td></tr><tr><td>Traders' committee</td><td>Nigam, headed by the Shreshthi</td></tr></tbody></table>
      <div class="cp-note trap">Khila is land that cannot be farmed. Aprahata is forest land.</div>
    `
  },
  60: {
    questext: "Which was the main port of western India in Gupta times?",
    options: ["Tamralipti", "Arikamedu", "Bhrigukachchha", "Kaveripattnam"],
    correct: "3",
    exptext: "✅ Bhrigukachchha, today's Bharuch. 📌 Tamralipti was an eastern port. ❌ Arikamedu and Kaveripattnam were on the southeast coast."
  },
  61: {
    questext: "Khila land means",
    options: ["Cultivated land", "Pasture land", "Forest land", "Uncultivable land"],
    correct: "4",
    exptext: "✅ Khila is land that cannot be farmed. 📌 Kshetra is the cultivated one. ❌ Gopata Sara is pasture land."
  },
  62: {
    type: "concept", icon: "🏯", accent: "#d946ef", pauseTimer: true,
    title: "Art and Architecture",
    html: `
      <p class="cp-lead">Temple building began in this period. Two styles, <b>Nagara</b> and <b>Dravidian</b>, started to develop.</p>
      <table><thead><tr><th>Temple</th><th>Place</th></tr></thead><tbody><tr><td>Vishnu Temple, Tigwa</td><td>Jabalpur, Madhya Pradesh</td></tr><tr><td>Shiva Temple, Bhumara</td><td>Satna, Madhya Pradesh</td></tr><tr><td>Parvati Temple, Nachna Kuthara</td><td>Panna, Madhya Pradesh</td></tr><tr><td>Dashavatara Temple, Deogarh</td><td>Lalitpur, Uttar Pradesh</td></tr><tr><td>Bhitargaon Temple</td><td>Kanpur, Uttar Pradesh</td></tr></tbody></table>
      <table><thead><tr><th>Topic</th><th>Detail</th></tr></thead><tbody><tr><td>Buddhist caves</td><td>Ajanta, Ellora and Bagh; Ajanta caves 16, 17 and 19 are of the Gupta age</td></tr><tr><td>Famous painting</td><td>Bodhisattva Padmapani at Ajanta</td></tr><tr><td>Education centres</td><td>Pataliputra, Vallabhi, Ujjaini, Kashi and Mathura; Nalanda became world-famous later</td></tr></tbody></table>
      <div class="cp-note trap">The Dashavatara Temple is at Deogarh in Uttar Pradesh, not in Madhya Pradesh.</div>
    `
  },
  63: {
    questext: "The Dashavatara Temple of the Gupta period is located at",
    options: ["Tigwa", "Bhumara", "Deogarh", "Nachna Kuthara"],
    correct: "3",
    exptext: "✅ Deogarh in Lalitpur, Uttar Pradesh. 📌 Dashavatara means ten forms of Vishnu. ❌ Tigwa has a Vishnu temple in Madhya Pradesh."
  },
  64: {
    questext: "Which Ajanta caves belong to the Gupta period?",
    options: ["9, 10 and 12", "16, 17 and 19", "3, 5 and 8", "20, 21 and 24"],
    correct: "2",
    exptext: "✅ Caves 16, 17 and 19. 📌 Remember the numbers 16, 17, 19. ❌ Caves 9 and 10 are much older."
  },
  65: {
    questext: "The Shiva Temple at Bhumara is in which district?",
    options: ["Satna", "Jabalpur", "Panna", "Lalitpur"],
    correct: "1",
    exptext: "✅ Satna in Madhya Pradesh. 📌 Parvati temple is in Panna. ❌ Jabalpur has the Tigwa Vishnu temple."
  },
  66: {
    type: "concept", icon: "✍️", accent: "#64748b", pauseTimer: true,
    title: "Literature",
    html: `
      <p class="cp-lead">Sanskrit literature reached a high point. Here are the authors and their famous works.</p>
      <table><thead><tr><th>Author</th><th>Famous works</th></tr></thead><tbody><tr><td>Kalidasa</td><td>Ritusamhara, Meghaduta, Kumarasambhavam, Raghuvamsa, Malavikagnimitram, Abhijnanashakuntalam, Vikramorvashiyam</td></tr><tr><td>Vishakhadatta</td><td>Mudrarakshasa, Devichandraguptam</td></tr><tr><td>Varahamihira</td><td>Brihatsamhita, Panchasiddhantika</td></tr><tr><td>Aryabhata</td><td>Aryabhatiya</td></tr><tr><td>Vishnu Sharma</td><td>Panchatantra</td></tr><tr><td>Kamandaka</td><td>Nitisara</td></tr><tr><td>Shudraka</td><td>Mrichchhakatikam</td></tr></tbody></table>
      <div class="cp-note trap">Mrichchhakatikam is by Shudraka. Mudrarakshasa is by Vishakhadatta.</div>
    `
  },
  67: {
    questext: "Who wrote the Panchatantra?",
    options: ["Kamandaka", "Vishnu Sharma", "Shudraka", "Vatsyayana"],
    correct: "2",
    exptext: "✅ Vishnu Sharma. 📌 It is a book of animal stories. ❌ Kamandaka wrote the Nitisara on politics."
  },
  68: {
    questext: "Which work is correctly matched with its author?",
    options: ["Nitisara – Shudraka", "Mrichchhakatikam – Kamandaka", "Devichandraguptam – Vishakhadatta", "Brihatsamhita – Kalidasa"],
    correct: "3",
    exptext: "✅ Vishakhadatta wrote Devichandraguptam. 📌 It tells of Ramagupta and Chandragupta II. ❌ Brihatsamhita is by Varahamihira."
  },
  69: {
    type: "concept", icon: "🔬", accent: "#fb7185", pauseTimer: true,
    title: "Science and Medicine",
    html: `
      <p class="cp-lead">Gupta scholars studied the stars, numbers and the human body.</p>
      <table><thead><tr><th>Scholar</th><th>Contribution</th></tr></thead><tbody><tr><td>Aryabhata</td><td>Wrote Aryabhatiya in 499 CE; said the Earth is round and spins on its axis; gave pi as about 3.1416; used the place-value system; explained eclipses scientifically</td></tr><tr><td>Varahamihira</td><td>Brihatsamhita covers astronomy, astrology, geography, architecture, weather, animals and marriage</td></tr><tr><td>Sushruta</td><td>Father of surgery; Sushruta Samhita lists 121 surgical instruments</td></tr><tr><td>Nagarjuna</td><td>Chemistry</td></tr><tr><td>Vagbhata</td><td>Wrote Ashtangasangraha on Ayurveda</td></tr></tbody></table>
      <div class="cp-note trap">Aryabhatiya was written in 499 CE. The spinning Earth was Aryabhata's idea.</div>
    `
  },
  70: {
    questext: "Aryabhatiya was written in",
    options: ["399 CE", "415 CE", "455 CE", "499 CE"],
    correct: "4",
    exptext: "✅ 499 CE. 📌 Almost 500 CE. ❌ 399 CE is the year Fa-Hien came to India."
  },
  71: {
    questext: "Who is called the father of surgery and listed 121 surgical instruments?",
    options: ["Sushruta", "Charaka", "Vagbhata", "Dhanvantari"],
    correct: "1",
    exptext: "✅ Sushruta, in the Sushruta Samhita. 📌 Surgery, so S for Sushruta. ❌ Vagbhata wrote on Ayurveda in Ashtangasangraha."
  },
  72: {
    questext: "Which scholar said the Earth is round and spins on its axis?",
    options: ["Varahamihira", "Aryabhata", "Vagbhata", "Nagarjuna"],
    correct: "2",
    exptext: "✅ Aryabhata, who also explained eclipses. 📌 He gave pi as about 3.1416. ❌ Varahamihira wrote the Brihatsamhita."
  },
  73: {
    type: "concept", icon: "🪙", accent: "#2dd4bf", pauseTimer: true,
    title: "Iron Pillar and Coins",
    html: `
      <p class="cp-lead">Two well-known Gupta remains are the Mehrauli Iron Pillar and the gold coins.</p>
      <table><thead><tr><th>Topic</th><th>Detail</th></tr></thead><tbody><tr><td>Mehrauli Iron Pillar</td><td>In the Qutub complex, Delhi; about 7 metres tall; almost rust-free; the inscription of 'King Chandra' says he set up a Vishnu-dhvaja on Vishnupada hill; it once carried a Garuda image on top</td></tr><tr><td>Early gold coins</td><td>Followed the Kushana weight of 124 grains (Dinar)</td></tr><tr><td>Skandagupta's coins</td><td>Raised the weight to 144 grains (Suvarna)</td></tr><tr><td>Samudragupta's coin types</td><td>Standard, Archer, Battle-axe, Ashvamedha, Tiger-slayer and Lyrist (Veena)</td></tr><tr><td>Chandragupta II's silver coins</td><td>First Gupta silver coins, copying the Western Kshatrapas</td></tr><tr><td>Chandragupta's coins</td><td>Show Garuda attacking a snake</td></tr></tbody></table>
      <div class="cp-note trap">Chandragupta II, not Chandragupta I, issued the first Gupta silver coins.</div>
    `
  },
  74: {
    questext: "The Mehrauli Iron Pillar, famous for being almost rust-free, stands in",
    options: ["Sanchi", "The Qutub complex, Delhi", "Ajanta", "Allahabad Fort"],
    correct: "2",
    exptext: "✅ It stands in the Qutub complex, Delhi. 📌 It is about 7 metres tall. ❌ Allahabad Fort has the Ashokan pillar."
  },
  75: {
    questext: "Which is NOT a coin type of Samudragupta?",
    options: ["Archer", "Lyrist", "Tiger-slayer", "Elephant-rider"],
    correct: "4",
    exptext: "✅ Elephant-rider belongs to later Gupta coins. 📌 Samudragupta played the veena on one type. ❌ Archer, lyrist and tiger-slayer are his types."
  },
  76: {
    questext: "Early Gupta gold coins first followed the weight standard of which dynasty?",
    options: ["Mauryas", "Kushanas", "Shakas", "Satavahanas"],
    correct: "2",
    exptext: "✅ Kushanas, with 124 grains. 📌 Skandagupta later raised it to 144 grains. ❌ Mauryas used silver punch-marked coins."
  },
  77: {
    type: "concept", icon: "✒️", accent: "#c026d3", pauseTimer: true,
    title: "Important Inscriptions of Later Gupta Kings",
    html: `
      <p class="cp-lead">These records tell us about kings, governors and guilds.</p>
      <table><thead><tr><th>Ruler</th><th>Inscription</th><th>What it tells</th></tr></thead><tbody><tr><td>Chandragupta II</td><td>Udayagiri cave (Vidisha)</td><td>Varaha panel; minister Virasena Saba</td></tr><tr><td>Chandragupta II</td><td>Sanchi</td><td>Record of Amrakardava</td></tr><tr><td>Kumaragupta I</td><td>Bilsad</td><td>Dated 415 CE, earliest of his reign</td></tr><tr><td>Kumaragupta I</td><td>Damodarpur copper plates</td><td>Bengal administration</td></tr><tr><td>Kumaragupta I</td><td>Mandsaur (Dashapura)</td><td>Silk-weavers' guild (Vatsabhatti)</td></tr><tr><td>Skandagupta</td><td>Bhitari pillar</td><td>Victories over Pushyamitras and Hunas</td></tr><tr><td>Skandagupta</td><td>Junagadh (455–458 CE)</td><td>Governor Parnadatta; city chief Chakrapalita</td></tr></tbody></table>
      <div class="cp-note trap">Bhitari and Junagadh belong to Skandagupta, not Samudragupta.</div>
    `
  },
  78: {
    questext: "The Damodarpur copper plates give information about the administration of",
    options: ["Gujarat", "Bengal", "Punjab", "Kerala"],
    correct: "2",
    exptext: "✅ Bengal, in the reign of Kumaragupta I. 📌 Damodarpur lies in Bengal. ❌ Gujarat is linked to the Junagadh inscription."
  },
  79: {
    questext: "The Mandsaur inscription of Kumaragupta I records the work of which guild?",
    options: ["Silk-weavers", "Goldsmiths", "Potters", "Oil-pressers"],
    correct: "1",
    exptext: "✅ The silk-weavers' guild, Vatsabhatti. 📌 Mandsaur is also called Dashapura. ❌ The others are not named in it."
  },
  80: {
    questext: "Which inscription names Parnadatta as governor and Chakrapalita as city chief?",
    options: ["Bhitari pillar", "Udayagiri cave", "Junagadh inscription", "Bilsad inscription"],
    correct: "3",
    exptext: "✅ The Junagadh inscription of Skandagupta. 📌 It dates to 455–458 CE. ❌ Bhitari records victories over the Hunas."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Gupta_Period/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gold Gupta dinar coin, a carved stone temple pillar and a subtle palm-leaf manuscript" },
  "images/General_Awareness/Ancient_India/Gupta_Period/1.png": { t: "fig", about: "Horizontal chain of seven boxes: Sri Gupta, Ghatotkacha, Chandragupta I (319 CE), Samudragupta (350 CE), Chandragupta II (380 CE), Kumaragupta I (415 CE), Skandagupta (455 CE)." },
  "images/General_Awareness/Ancient_India/Gupta_Period/2.png": { t: "fig", about: "Centre box 'Samudragupta' with five arrows to labels: Prasabhoddharana = Aryavarta kings; Sarva-kara-dana-ajna-karana = frontier states; Paricharakikrita = servants; Grahana-moksha-anugraha = southern kings; Kanyopayana-dana = foreign rulers." },
  "images/General_Awareness/Ancient_India/Gupta_Period/3.png": { t: "fig", about: "Three-level pyramid: top 'Province (Desa / Bhukti) - Uparika', middle 'District (Vishaya) - Vishayapati', bottom 'Village (Gram) - Gramika'." }
});

/* CHANGE LOG
   - Chandragupta I is no longer shown as the first to issue silver coins; the first Gupta silver coins were issued by Chandragupta II.
   - Kumaragupta I's reign is given as 415-455 CE and Skandagupta's as 455-467 CE (the summary strip showed one merged range).
   - Samudragupta's five policies are written in one standard form, not two different spellings.
   - Suryasiddhanta removed from Aryabhata's works, and Brahmagupta (Brahmasiddhanta) removed because he lived in a later age.
   - Uparika removed from the police list; Uparika is the provincial governor.
*/