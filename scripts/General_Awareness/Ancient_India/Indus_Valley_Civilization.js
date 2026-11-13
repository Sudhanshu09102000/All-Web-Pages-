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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Indus_Valley_Civilization · 13 concept pages (+ overview) · 40 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏺", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Indus Valley Civilization",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Indus_Valley_Civilization/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "ANCIENT INDIA",
      line2: "INDUS VALLEY",
      line3: "CIVILIZATION",
      badge: "FULL CLASS",
      ribbon: "SITES • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Indus Valley Civilization One Shot | Harappan Sites Tricks | SSC UPSC Railways",
      altTitles: ["IVC Major Sites and Excavators Trick | Ancient India", "Harappan Civilization Complete Chapter | General Awareness"],
      description: "Indus Valley Civilization is one of the most repeated topics in SSC, UPSC, Railways, Banking and Defence exams. In this class we cover its extent, discovery, town planning, economy, religion, famous sites with excavators and rivers, and the scholars' views on its decline, with practice questions after every topic.\n\n📌 IN THIS CLASS\n✅ Boundary sites and phases\n✅ Great Bath, Great Granary, brick ratio\n✅ Trade partners and metal sources\n✅ Harappa, Mohenjodaro, Lothal, Dholavira and more\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#IndusValley #AncientIndia #SSCCGL",
      tags: ["indus valley civilization", "harappan civilization", "ivc one shot", "indus valley sites", "ancient india", "ancient history for ssc", "ancient history upsc", "ancient history railways", "harappa mohenjodaro", "great bath mohenjodaro", "lothal dockyard", "dholavira unesco", "rakhigarhi largest site", "kalibangan ploughed field", "ivc excavators", "ivc decline theories", "general awareness history", "history one shot", "ancient india mcq", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "Ancient_India tricks"],
      hashtags: ["IndusValley", "AncientIndia", "Harappa", "SSCCGL", "UPSC"],
      thumbText: "INDUS VALLEY CIVILIZATION",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏺 New class is live: Indus Valley Civilization. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Geographical Extent\n00:00 Naming\n00:00 Discovery\n00:00 City Planning\n00:00 Houses & Roads\n00:00 Script\n00:00 Social Life\n00:00 Political Life\n00:00 Economic Life\n00:00 Food & Animals\n00:00 Religious Life\n00:00 Major Sites\n00:00 Opinions of Scholars Regarding the Fall",
      playlist: "Ancient India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on the Indus Valley Civilization</u> — extent, discovery, town planning, trade, religion, famous sites and the debate on its decline.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>13</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>40</b><span>Questions</span></div>
        <div class="cp-stat"><b>~66 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Geographical Extent</b><br>13 lakh sq. km and four boundary sites.</li>
        <li><b>Naming</b><br>Indus, Harappan and Meluha.</li>
        <li><b>Discovery</b><br>Mason to Marshall, and three phases.</li>
        <li><b>City Planning</b><br>Grid roads, Great Bath, Great Granary.</li>
        <li><b>Houses &amp; Roads</b><br>Doors on streets; Lothal the exception.</li>
        <li><b>Script</b><br>Pictographic, right to left.</li>
        <li><b>Social Life</b><br>Food, games and people.</li>
        <li><b>Political Life</b><br>Hunter and Wheeler's views.</li>
        <li><b>Economic Life</b><br>Ports, crops, trade and metals.</li>
        <li><b>Food &amp; Animals</b><br>Grains and animals.</li>
        <li><b>Religious Life</b><br>Mother Goddess and the Pashupati seal.</li>
        <li><b>Major Sites</b><br>Who excavated what, and where.</li>
        <li><b>Opinions of Scholars Regarding the Fall</b><br>Six causes, six scholars.</li>
        <li><b>Practice</b><br>Exam-level questions after every topic.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> sites, excavators and 'firsts' from this chapter appear in almost every SSC, Railways, UPSC Prelims and Defence paper.</div>
    `
  },
  2: {
    type: "concept", icon: "🗺️", accent: "#0ea5e9", pauseTimer: true,
    title: "Geographical Extent",
    html: `
      <p class="cp-lead">An <b>urban, Bronze Age</b> culture (c. <b>2500–1750 BCE</b>) of the north-western subcontinent — about <b>13 lakh sq. km</b>, triangular; no contemporary civilization was as large.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Indus_Valley_Civilization/1.png" alt="Schematic of the four boundary sites" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Boundary</th><th>Site</th></tr></thead><tbody><tr><td>Northern</td><td>Manda (Jammu-Kashmir)</td></tr><tr><td>Western</td><td>Sutkagendor (Balochistan)</td></tr><tr><td>Eastern</td><td>Alamgirpur (Uttar Pradesh)</td></tr><tr><td>Southern</td><td>Daimabad (Maharashtra)</td></tr></tbody></table>
      <div class="cp-note exam">N–S about <b>1100 km</b>, E–W about <b>1600 km</b>. Earliest excavations: <b>Harappa</b> (West Punjab) and <b>Mohenjodaro</b> (Sindh), both now in Pakistan.</div>
      <div class="cp-mnemonic"><b>M</b>anda – <b>S</b>utkagendor – <b>A</b>lamgirpur – <b>D</b>aimabad = North – West – East – South.</div>
    `
  },
  3: {
    questext: "The northern boundary site of the Indus Valley Civilization is —",
    options: ["Sutkagendor", "Manda", "Alamgirpur", "Daimabad"],
    correct: "2",
    exptext: "✅ Manda, in Jammu-Kashmir. 📌 M-S-A-D = N-W-E-S. ❌ Sutkagendor is the western boundary."
  },
  4: {
    questext: "Which boundary site is correctly matched with its direction?",
    options: ["Eastern — Daimabad", "Western — Alamgirpur", "Southern — Manda", "Eastern — Alamgirpur"],
    correct: "4",
    exptext: "✅ Alamgirpur (UP) is the eastern boundary. 📌 Daimabad is the southernmost site. ❌ Daimabad is in Maharashtra, in the south, not the east."
  },
  5: {
    questext: "Approximately how large was the Indus Valley Civilization?",
    options: ["About 13 lakh sq. km, triangular", "About 5 lakh sq. km, rectangular", "About 13 lakh sq. km, circular", "About 3 lakh sq. km, triangular"],
    correct: "1",
    exptext: "✅ About 13 lakh sq. km and triangular in shape. 📌 Larger than any contemporary civilization. ❌ Smaller areas understate its huge spread."
  },
  6: {
    type: "concept", icon: "🏷️", accent: "#22c55e", pauseTimer: true,
    title: "Naming",
    html: `
      <p class="cp-lead">Named after the <b>Indus and its tributaries</b> — also called the <b>Harappan Civilization</b>, as Harappa was excavated first.</p>
      <table><thead><tr><th>Name</th><th>Why</th></tr></thead><tbody><tr><td>Indus Valley Civilization</td><td>After the Indus and its tributaries</td></tr><tr><td>Harappan Civilization</td><td>Harappa was excavated first</td></tr><tr><td>Meluha</td><td>Mesopotamian name for the Indus region</td></tr></tbody></table>
      <div class="cp-note trap">Ropar, Lothal, Dholavira, Kalibangan, Banawali and Rangpur lie <b>outside</b> the Indus region.</div>
    `
  },
  7: {
    questext: "The Mesopotamians called the Indus region —",
    options: ["Dilmun", "Magan", "Meluha", "Sumer"],
    correct: "3",
    exptext: "✅ Meluha was the Mesopotamian name. 📌 Meluha = Indus land. ❌ Dilmun and Magan were trading partners, not the Indus region."
  },
  8: {
    questext: "The civilization is also called the ‘Harappan Civilization’ because —",
    options: ["Harappa was the largest site", "Harappa was excavated first", "Harappa lies on the Indus", "Harappa was its capital"],
    correct: "2",
    exptext: "✅ Harappa was the first site excavated. 📌 First dug = name given. ❌ Harappa lies on the Ravi, and Rakhigarhi is the largest site."
  },
  9: {
    type: "concept", icon: "🔍", accent: "#f59e0b", pauseTimer: true,
    title: "Discovery",
    html: `
      <p class="cp-lead">From Mason's first notice in <b>1826</b> to Marshall's announcement in <b>1924</b> — a chain of five names.</p>
      <table><thead><tr><th>Year</th><th>Person</th><th>Event</th></tr></thead><tbody><tr><td>1826</td><td>Charles Mason</td><td>First to discover the civilization</td></tr><tr><td>1861</td><td>Alexander Cunningham</td><td>‘Father of Indian Archaeology’; founds the Archaeological Survey of India (ASI)</td></tr><tr><td>1921</td><td>Daya Ram Sahni</td><td>Excavates Harappa, under ASI chief Sir John Marshall</td></tr><tr><td>1922</td><td>Rakhaldas Banerjee (R. D. Banerjee)</td><td>Discovers Mohenjodaro</td></tr><tr><td>1924</td><td>John Marshall</td><td>Formally announces the civilization</td></tr></tbody></table>
      <table><thead><tr><th>Phase</th><th>Period</th><th>Sites</th></tr></thead><tbody><tr><td>Early Harappan</td><td>c. 6000–2600 BCE</td><td>Mehrgarh, Amri, Kot Diji; Sothi–Siswal culture</td></tr><tr><td>Mature Harappan</td><td>c. 2600–1900 BCE</td><td>Harappa, Mohenjodaro, Rakhigarhi, Lothal, Dholavira, Kalibangan</td></tr><tr><td>Late Harappan</td><td>c. 1900–1300 BCE</td><td>Jhukar, Rangpur, Cemetery-H cultures; Daimabad</td></tr></tbody></table>
      <div class="cp-note remember"><b>Mohenjodaro</b> has the largest number of skeletons. Four species: <b>Mediterranean</b> (largest), Proto-Australoid, Alpine, Mongoloid.</div>
    `
  },
  10: {
    questext: "Who was the first to discover the Indus Valley Civilization, in 1826?",
    options: ["Alexander Cunningham", "Daya Ram Sahni", "Charles Mason", "John Marshall"],
    correct: "3",
    exptext: "✅ Charles Mason, 1826. 📌 Mason first, Marshall announces. ❌ Cunningham founded the ASI in 1861."
  },
  11: {
    questext: "Which is the correct chronological order of events?",
    options: ["Cunningham founds ASI → Sahni at Harappa → Banerjee at Mohenjodaro → Marshall announces", "Sahni at Harappa → Cunningham founds ASI → Banerjee at Mohenjodaro → Marshall announces", "Cunningham founds ASI → Banerjee at Mohenjodaro → Sahni at Harappa → Marshall announces", "Sahni at Harappa → Banerjee at Mohenjodaro → Cunningham founds ASI → Marshall announces"],
    correct: "1",
    exptext: "✅ 1861 ASI, 1921 Harappa, 1922 Mohenjodaro, 1924 announcement. 📌 61, 21, 22, 24. ❌ Harappa (1921) came before Mohenjodaro (1922)."
  },
  12: {
    questext: "Which of the following is correctly matched?",
    options: ["Harappa — R. D. Banerjee, 1922", "Mohenjodaro — Daya Ram Sahni, 1921", "Mohenjodaro — R. D. Banerjee, 1922", "Harappa — John Marshall, 1921"],
    correct: "3",
    exptext: "✅ Banerjee discovered Mohenjodaro in 1922. 📌 Sahni = Harappa 1921. ❌ Options 1 and 2 swap the two excavators."
  },
  13: {
    questext: "The Mature Harappan phase is dated approximately —",
    options: ["6000–2600 BCE", "2600–1900 BCE", "1900–1300 BCE", "3300–2600 BCE"],
    correct: "2",
    exptext: "✅ Mature Harappan = c. 2600–1900 BCE. 📌 Early, Mature, Late = 6000, 2600, 1900. ❌ 1900–1300 BCE is the Late Harappan phase."
  },
  14: {
    questext: "Which of the four racial species found at Mohenjodaro formed the largest number?",
    options: ["Alpine", "Mongoloid", "Proto-Australoid", "Mediterranean"],
    correct: "4",
    exptext: "✅ The Mediterranean type was the largest group. 📌 Mohenjodaro has the most skeletons. ❌ Mongoloid and Alpine were smaller groups."
  },
  15: {
    type: "concept", icon: "🏙️", accent: "#ef4444", pauseTimer: true,
    title: "City Planning",
    html: `
      <p class="cp-lead">Planned cities: roads crossed at <b>right angles</b>; most cities had a high <b>citadel</b> for the ruling class and a larger <b>lower town</b> for citizens, traders, craftsmen and workers.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Indus_Valley_Civilization/2.png" alt="Schematic of citadel and lower town" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Drains</td><td>Covered from above</td></tr><tr><td>Fortification</td><td>Ramparts around cities</td></tr><tr><td>Bricks</td><td>Baked bricks everywhere except Kalibangan and Rangpur; ratio 4 : 2 : 1</td></tr><tr><td>Great Bath (Mohenjodaro)</td><td>11.88 m long, 7.01 m wide, 2.43 m deep; watertight with gypsum and bitumen</td></tr><tr><td>Great Granary (Harappa)</td><td>Largest building of the civilization; about 45.71 m × 15.23 m</td></tr></tbody></table>
      <div class="cp-note trap">Plans of Harappa, Mohenjodaro and Kalibangan were almost similar.</div>
    `
  },
  16: {
    questext: "The Great Bath of Mohenjodaro was made watertight using —",
    options: ["Lime and mud", "Clay and sand", "Cement and stone", "Gypsum and bitumen"],
    correct: "4",
    exptext: "✅ Gypsum and bitumen. 📌 Great Bath = 11.88 m long. ❌ Lime and mud would not keep the tank watertight."
  },
  17: {
    questext: "The standard brick ratio in Harappan cities was —",
    options: ["4 : 2 : 1", "2 : 1 : 1", "1 : 2 : 3", "3 : 2 : 1"],
    correct: "1",
    exptext: "✅ 4 : 2 : 1. 📌 Length, width, height. ❌ 3 : 2 : 1 is a close but wrong ratio."
  },
  18: {
    questext: "The largest building of the Indus Valley Civilization was the —",
    options: ["Great Bath", "Citadel of Kalibangan", "Stadium of Dholavira", "Great Granary"],
    correct: "4",
    exptext: "✅ The Great Granary of Harappa, about 45.71 m × 15.23 m. 📌 Granary = largest. ❌ The Great Bath is famous but much smaller."
  },
  19: {
    questext: "Baked bricks were used everywhere EXCEPT at —",
    options: ["Lothal and Dholavira", "Kalibangan and Rangpur", "Harappa and Mohenjodaro", "Banawali and Ropar"],
    correct: "2",
    exptext: "✅ Kalibangan and Rangpur did not use baked bricks. 📌 K and R = no baking. ❌ Harappa and Mohenjodaro used baked bricks widely."
  },
  20: {
    type: "concept", icon: "🏠", accent: "#8b5cf6", pauseTimer: true,
    title: "Houses & Roads",
    html: `
      <p class="cp-lead">Doors and windows opened into the <b>streets</b>, not the main road — <b>Lothal</b> was the exception. Roads were mostly <b>unpaved</b>; <b>Mohenjodaro</b> had paved roads.</p>
      <div class="cp-note trap">Houses faced side streets. Only Lothal's doors opened onto the main road.</div>
    `
  },
  21: {
    questext: "Doors of most Harappan houses opened onto side streets; which site was the exception?",
    options: ["Lothal", "Mohenjodaro", "Harappa", "Banawali"],
    correct: "1",
    exptext: "✅ Lothal's doors opened onto the main road. 📌 Lothal = exception. ❌ Mohenjodaro is known for paved roads, not for door position."
  },
  22: {
    type: "concept", icon: "✍️", accent: "#14b8a6", pauseTimer: true,
    title: "Script",
    html: `
      <p class="cp-lead">Mainly <b>pictographic</b>, <b>not alphabetical</b>, <b>yet to be deciphered</b>.</p>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Type</td><td>Pictographic, undeciphered</td></tr><tr><td>Direction</td><td>Mostly right to left</td></tr><tr><td>Method</td><td>Boustrophedon — alternate lines run in opposite directions</td></tr></tbody></table>
    `
  },
  23: {
    questext: "The Harappan script is mostly —",
    options: ["Alphabetical, written left to right", "Pictographic, written right to left", "Alphabetical, written top to bottom", "Pictographic, written left to right"],
    correct: "2",
    exptext: "✅ Pictographic and mostly right to left, still undeciphered. 📌 Pictures, not letters. ❌ It is not alphabetical."
  },
  24: {
    questext: "The writing method in which alternate lines run in opposite directions is called —",
    options: ["Cuneiform", "Palindrome", "Ideogram", "Boustrophedon"],
    correct: "4",
    exptext: "✅ Boustrophedon. 📌 Like a ploughing ox turning at the field's end. ❌ Cuneiform is Mesopotamian wedge writing."
  },
  25: {
    type: "concept", icon: "👥", accent: "#ec4899", pauseTimer: true,
    title: "Social Life",
    html: `
      <p class="cp-lead">People ate <b>both vegetarian and non-vegetarian</b> food, enjoyed <b>Chaupar and dice</b>, and were <b>less warlike and more peace-loving</b>.</p>
      <div class="cp-note remember"><b>Wheeler</b> accepted the practice of <b>slavery</b>.</div>
    `
  },
  26: {
    questext: "Which statement about Harappan social life is correct?",
    options: ["They were more warlike than peace-loving", "They ate only vegetarian food", "Chaupar and dice were used for entertainment", "Slavery was entirely unknown"],
    correct: "3",
    exptext: "✅ Chaupar and dice were entertainment. 📌 Peace-loving people at play. ❌ Wheeler accepted that slavery was practised."
  },
  27: {
    type: "concept", icon: "🏛️", accent: "#3b82f6", pauseTimer: true,
    title: "Political Life",
    html: `
      <p class="cp-lead">Scholars saw the rule of Mohenjodaro as <b>not monarchical but democratic</b>.</p>
      <table><thead><tr><th>Scholar</th><th>View</th></tr></thead><tbody><tr><td>H. H. Hunter</td><td>Not monarchical but democratic</td></tr><tr><td>Sir Mortimer Wheeler</td><td>Middle-class democratic rule in which religion had importance</td></tr></tbody></table>
    `
  },
  28: {
    questext: "H. H. Hunter described the rule of Mohenjodaro as —",
    options: ["Democratic, not monarchical", "Monarchical", "Theocratic", "Military"],
    correct: "1",
    exptext: "✅ Not monarchical but democratic. 📌 Hunter and Wheeler both say democratic. ❌ Wheeler said religion mattered, but called it middle-class democratic rule."
  },
  29: {
    type: "concept", icon: "💰", accent: "#f97316", pauseTimer: true,
    title: "Economic Life",
    html: `
      <p class="cp-lead">Ports — <b>Lothal, Rangpur, Surkotada, Prabhaspattan</b>. Crops — wheat, barley, rye, peas, sesame, mustard and <b>cotton</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Indus_Valley_Civilization/3.png" alt="Schematic of trade sources" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Item</th><th>Source</th></tr></thead><tbody><tr><td>Copper</td><td>Khetri (Rajasthan), Balochistan, Oman</td></tr><tr><td>Gold</td><td>South India (Karnataka)</td></tr><tr><td>Silver</td><td>Jawar and Ajmer mines (Rajasthan), Afghanistan, Iran</td></tr><tr><td>Tin</td><td>Iran, Afghanistan</td></tr><tr><td>Lapis lazuli</td><td>Shortughai, Badakhshan (Afghanistan)</td></tr></tbody></table>
      <div class="cp-note remember">Credit for producing <b>cotton first</b> goes to the Indus people; the Greeks named it <b>‘Sindon’</b>. Maximum trade was with Mesopotamia — <b>Sumer, Dilmun (Bahrain), Magan (Oman)</b>. Exchange by <b>barter</b>, no coins; cubical weights in multiples of <b>16</b>.</div>
    `
  },
  30: {
    questext: "Cotton was first produced by the Indus people; the Greeks named it —",
    options: ["Meluha", "Sindon", "Dilmun", "Magan"],
    correct: "2",
    exptext: "✅ ‘Sindon’ (Sidon). 📌 Sindon from Sindhu. ❌ Meluha was the Mesopotamian name for the Indus region."
  },
  31: {
    questext: "Which source is correctly matched with its material?",
    options: ["Copper — Khetri (Rajasthan)", "Gold — Khetri", "Lapis lazuli — Karnataka", "Tin — Oman"],
    correct: "1",
    exptext: "✅ Copper came from Khetri in Rajasthan. 📌 Gold = Karnataka; lapis lazuli = Badakhshan. ❌ Tin came from Iran and Afghanistan."
  },
  32: {
    questext: "Dilmun, a trading partner of the Harappans, is identified with modern —",
    options: ["Oman", "Iran", "Bahrain", "Afghanistan"],
    correct: "3",
    exptext: "✅ Dilmun = Bahrain. 📌 Dilmun = Bahrain; Magan = Oman. ❌ Oman is the ancient Magan."
  },
  33: {
    questext: "The Harappan cubical weights were in multiples of —",
    options: ["10", "12", "8", "16"],
    correct: "4",
    exptext: "✅ Multiples of 16. 📌 Barter plus cubical weights; no coins. ❌ Decimal 10 is not the Harappan system."
  },
  34: {
    type: "concept", icon: "🌾", accent: "#84cc16", pauseTimer: true,
    title: "Food & Animals",
    html: `
      <p class="cp-lead">Main food grains were <b>wheat and barley</b>.</p>
      <div class="cp-note remember">Animals — humped bulls, sheep, goats, elephants, buffaloes, cows, donkeys, pigs, dogs; residents of <b>Gujarat</b> reared <b>elephants</b>.</div>
    `
  },
  35: {
    questext: "The main food grains of the Harappans were —",
    options: ["Rice and millets", "Wheat and barley", "Maize and wheat", "Barley and rice"],
    correct: "2",
    exptext: "✅ Wheat and barley. 📌 W and B. ❌ Rice evidence is limited; maize is a New World crop."
  },
  36: {
    type: "concept", icon: "🙏", accent: "#a855f7", pauseTimer: true,
    title: "Religious Life",
    html: `
      <p class="cp-lead">Worship of the <b>Mother Goddess</b>, <b>Rudra Devta (Pashupati Nath)</b> and the <b>Linga–Yoni</b>; <b>idol worship</b> probably began here.</p>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>Pashupatinath seal</td><td>Mohenjodaro — ‘Proto-Shiva Seal’, most famous; around it elephant, tiger, rhino, buffalo; ‘Chief Male Deity’</td></tr><tr><td>Mother Goddess</td><td>Chief female deity; shown in terracotta figurines</td></tr><tr><td>Seals</td><td>Mainly steatite; <b>unicorn</b> the commonest animal</td></tr><tr><td>Belief</td><td>Rebirth; three methods of cremation — full, partial, urn</td></tr></tbody></table>
    `
  },
  37: {
    questext: "Which animal is NOT among those around the figure on the Pashupati seal?",
    options: ["Horse", "Elephant", "Tiger", "Buffalo"],
    correct: "1",
    exptext: "✅ The horse is not shown. 📌 Four animals: elephant, tiger, rhino, buffalo. ❌ Elephant, tiger and buffalo all appear on the seal."
  },
  38: {
    questext: "Which animal is shown most commonly on Harappan seals?",
    options: ["Bull", "Unicorn", "Elephant", "Tiger"],
    correct: "2",
    exptext: "✅ The unicorn is the commonest. 📌 Unicorn = most seals. ❌ The elephant and tiger appear on the Pashupati seal, not most often."
  },
  39: {
    questext: "Harappan seals were mainly made of —",
    options: ["Terracotta", "Copper", "Steatite", "Ivory"],
    correct: "3",
    exptext: "✅ Steatite, a soft stone. 📌 Seals = steatite. ❌ Terracotta was used for figurines."
  },
  40: {
    questext: "The Mother Goddess is mainly seen in —",
    options: ["Stone idols", "Gold plaques", "Bronze statues", "Terracotta figurines"],
    correct: "4",
    exptext: "✅ Terracotta figurines. 📌 Mother Goddess = terracotta. ❌ Bronze is known for the Dancing Girl, not the Mother Goddess."
  },
  41: {
    type: "concept", icon: "📍", accent: "#e11d48", pauseTimer: true,
    title: "Major Sites of the Indus Valley Civilization",
    html: `
      <p class="cp-lead">Site, excavator, river and key finding — the <u>most tested table</u> of the chapter.</p>
      <table><thead><tr><th>Site (Location)</th><th>Excavator (Year)</th><th>River</th><th>Key findings</th></tr></thead><tbody><tr><td>Harappa (Sahiwal, Pakistan)</td><td>Daya Ram Sahni (1921)</td><td>Ravi</td><td>‘Huriyupia’ of the Rig Veda; six granaries; Lingam and Yoni stones; ‘twin capital’ with Mohenjodaro; Mound A-B; cemetery R-37</td></tr><tr><td>Mohenjodaro (Sindh, Pakistan)</td><td>R. D. Banerjee (1922)</td><td>Indus</td><td>‘Mound of the dead’; Great Bath, Great Granary; Priest-King (17.5 cm); Pashupati seal; bronze Dancing Girl</td></tr><tr><td>Kalibangan (Hanumangarh, Rajasthan)</td><td>Amlanand Ghosh (1953)</td><td>Ghaggar</td><td>‘Black bangles’; fire altars, camel bones, ploughed fields; three burials; also excavated by B. B. Lal</td></tr><tr><td>Banawali (Fatehabad, Haryana)</td><td>R. S. Bisht (1974)</td><td>Saraswati</td><td>Pre-Harappan and Harappan phases; no drainage system; clay plough</td></tr><tr><td>Kot Diji (Sindh)</td><td>Fazl Ahmed Khan (1955)</td><td>Indus</td><td>Destroyed by fire; stone houses</td></tr><tr><td>Chanhudaro (Sindh)</td><td>N. G. Majumdar (1931)</td><td>Indus</td><td>No citadel; bead factory; terracotta bullock cart; lipstick</td></tr><tr><td>Ropar (Punjab)</td><td>Y. D. Sharma (1953)</td><td>Sutlej</td><td>First Harappan site excavated in independent India</td></tr><tr><td>Sutkagendor (Balochistan)</td><td>R. L. Stein (1927)</td><td>Dasht</td><td>Westernmost site on the Makran Coast; probably a trading port; evidence of horse</td></tr><tr><td>Lothal (Ahmedabad, Gujarat)</td><td>S. R. Rao (1957)</td><td>Bhogava</td><td>‘Mini-Harappa’; artificial brick dockyard; fire altars; Gulf of Cambay</td></tr><tr><td>Surkotada (Gujarat)</td><td>J. P. Joshi (1964)</td><td>—</td><td>Coastal site at the head of the Rann of Kutch; horse bones</td></tr><tr><td>Rakhigarhi (Hisar, Haryana)</td><td>Suraj Bhan (1969)</td><td>Ghaggar-Hakra</td><td>The <b>largest</b> site</td></tr><tr><td>Dholavira (Gujarat)</td><td>R. S. Bisht (1990)</td><td>Rann of Kutch</td><td>Stadium — the only playground; city in three parts; 16 rock-cut reservoirs; first Indian IVC site on the UNESCO World Heritage list (2021)</td></tr></tbody></table>
    `
  },
  42: {
    questext: "Which was the first Harappan site excavated in independent India?",
    options: ["Ropar", "Lothal", "Kalibangan", "Banawali"],
    correct: "1",
    exptext: "✅ Ropar (Punjab), on the Sutlej, by Y. D. Sharma (1953). 📌 Ropar = first after Independence. ❌ Lothal was excavated later, in 1957."
  },
  43: {
    questext: "Dholavira became the first Indian site of the Indus Valley Civilization on the UNESCO World Heritage list in —",
    options: ["2014", "2019", "2021", "2023"],
    correct: "3",
    exptext: "✅ 2021. 📌 Dholavira = stadium, 16 reservoirs, UNESCO 2021. ❌ 2019 and 2023 do not match its inscription."
  },
  44: {
    questext: "Which is the largest site of the Indus Valley Civilization, according to these notes?",
    options: ["Mohenjodaro", "Harappa", "Dholavira", "Rakhigarhi"],
    correct: "4",
    exptext: "✅ Rakhigarhi (Hisar, Haryana). 📌 Largest = Rakhigarhi. ❌ Mohenjodaro is famous for its monuments, not for being the largest."
  },
  45: {
    questext: "The artificial brick dockyard on the Bhogava river was found at —",
    options: ["Surkotada", "Lothal", "Rangpur", "Dholavira"],
    correct: "2",
    exptext: "✅ Lothal, near the Gulf of Cambay. 📌 Lothal = dockyard. ❌ Surkotada is known for horse bones."
  },
  46: {
    questext: "Kalibangan, whose name means ‘black bangles’, is famous for —",
    options: ["Ploughed fields and fire altars", "A stadium", "A bead factory", "A dockyard"],
    correct: "1",
    exptext: "✅ Ploughed fields and fire altars. 📌 Kalibangan = plough. ❌ The bead factory is at Chanhudaro."
  },
  47: {
    questext: "Chanhudaro is known for —",
    options: ["A dockyard", "A bead factory and no citadel", "A stadium", "The Great Granary"],
    correct: "2",
    exptext: "✅ A bead factory, and it had no citadel. 📌 Chanhudaro = beads and lipstick. ❌ The Great Granary is at Harappa."
  },
  48: {
    questext: "Which site is correctly matched with its excavator?",
    options: ["Lothal — S. R. Rao", "Kalibangan — R. S. Bisht", "Banawali — S. R. Rao", "Rakhigarhi — Daya Ram Sahni"],
    correct: "1",
    exptext: "✅ S. R. Rao excavated Lothal in 1957. 📌 Lothal = Rao. ❌ Bisht excavated Banawali and Dholavira, not Kalibangan."
  },
  49: {
    questext: "The westernmost site, on the Makran Coast and probably a trading port, is —",
    options: ["Surkotada", "Kot Diji", "Sutkagendor", "Lothal"],
    correct: "3",
    exptext: "✅ Sutkagendor, excavated by R. L. Stein (1927). 📌 Western boundary = Sutkagendor. ❌ Surkotada is in Gujarat, to the east."
  },
  50: {
    questext: "The Priest-King statue, bronze Dancing Girl and Great Bath were all found at —",
    options: ["Harappa", "Mohenjodaro", "Lothal", "Kalibangan"],
    correct: "2",
    exptext: "✅ Mohenjodaro, ‘mound of the dead’. 📌 Mohenjodaro = Bath, Priest-King, Dancing Girl. ❌ Harappa is known for the Great Granary and six granaries."
  },
  51: {
    type: "concept", icon: "📉", accent: "#64748b", pauseTimer: true,
    title: "Opinions of Scholars Regarding the Fall",
    html: `
      <table><thead><tr><th>Scholar</th><th>Cause of decline</th></tr></thead><tbody><tr><td>Gordon Childe and Wheeler</td><td>External and Aryan invasions</td></tr><tr><td>John Marshall, Ernest Mackay, S. R. Rao</td><td>Flood</td></tr><tr><td>Aurel Stein, Amalananda Ghosh</td><td>Climate change</td></tr><tr><td>John Marshall</td><td>Administrative laxity</td></tr><tr><td>K. U. R. Kennedy</td><td>Natural disaster (malaria, epidemic)</td></tr></tbody></table>
      <div class="cp-note remember">Mature Harappan cities were abandoned one by one; urban life gave way to the rural <b>Late Harappan</b> cultures.</div>
      <div class="cp-note trap"><b>Marshall</b> appears under <b>two</b> causes — flood and administrative laxity.</div>
    `
  },
  52: {
    questext: "Aurel Stein attributed the decline of the civilization mainly to —",
    options: ["Floods", "Aryan invasion", "Epidemic", "Climate change"],
    correct: "4",
    exptext: "✅ Climate change, also held by Amalananda Ghosh. 📌 Stein and Ghosh = climate. ❌ Floods are linked to Marshall, Mackay and Rao."
  },
  53: {
    questext: "Who attributed the decline to a natural disaster such as malaria or an epidemic?",
    options: ["Mortimer Wheeler", "John Marshall", "K. U. R. Kennedy", "Aurel Stein"],
    correct: "3",
    exptext: "✅ K. U. R. Kennedy. 📌 Kennedy = epidemic. ❌ Wheeler blamed external invasions."
  },
  54: {
    questext: "Which scholar is linked with TWO causes of decline — flood and administrative laxity?",
    options: ["Ernest Mackay", "Mortimer Wheeler", "S. R. Rao", "John Marshall"],
    correct: "4",
    exptext: "✅ John Marshall. 📌 Marshall = flood + laxity. ❌ Mackay and Rao are linked with floods only."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Indus_Valley_Civilization/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a steatite unicorn seal, a bronze dancing girl figurine, and a few baked bricks with a faint grid-plan outline" },
  "images/General_Awareness/Ancient_India/Indus_Valley_Civilization/1.png": { t: "fig", about: "Schematic, not a map: a triangle with four labelled corner points — Manda (North), Sutkagendor (West), Alamgirpur (East), Daimabad (South) — and the label 13 lakh sq. km." },
  "images/General_Awareness/Ancient_India/Indus_Valley_Civilization/2.png": { t: "fig", about: "Schematic top view of a Harappan city: a raised Citadel block on the west and a larger Lower Town block with a grid of roads crossing at right angles; labels Citadel, Lower Town, Covered drains." },
  "images/General_Awareness/Ancient_India/Indus_Valley_Civilization/3.png": { t: "fig", about: "Schematic, not a map: Indus cities in the centre with arrows to sources — Copper: Khetri, Oman; Gold: Karnataka; Silver: Afghanistan, Iran; Tin: Iran, Afghanistan; Lapis lazuli: Badakhshan; Mesopotamia: Sumer, Dilmun, Magan." }
});

/* CHANGE LOG
   - Eastern boundary site written as Alamgirpur (the book's boundary table says Alamgir).
   - Spelling corrected: Banauli → Banawali; R. S. Bist → R. S. Bisht (same person for Banawali and Dholavira); Mazumdar → Majumdar; Rakhaldas Banerjee also written R. D. Banerjee.
   - Source-check flag in the book's trap box removed from the pages.
*/