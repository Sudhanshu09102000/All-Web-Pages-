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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Mahajanapadas_and_the_Rise_of_Magadha · 7 concept pages (+ overview) · 38 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏰", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Mahajanapadas & the Rise of Magadha",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Mahajanapadas_and_the_Rise_of_Magadha/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "ANCIENT INDIA",
      line2: "MAHAJANAPADAS",
      line3: "RISE OF MAGADHA",
      badge: "FULL CLASS",
      ribbon: "DYNASTIES • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "16 Mahajanapadas & Rise of Magadha One Shot | Haryanka Shishunaga Nanda | SSC UPSC",
      altTitles: ["Mahajanapadas Capitals and Locations Trick | Ancient India", "Haryanka, Shishunaga and Nanda Dynasty Trick | Magadha"],
      description: "Mahajanapadas and the rise of Magadha are high-scoring topics in SSC, UPSC, Railways, Banking and Defence exams. In this class we cover the sixteen Mahajanapadas with capitals and modern locations, why Magadha rose, and the Haryanka, Shishunaga and Nanda dynasties with practice questions after every topic.\n\n📌 IN THIS CLASS\n✅ Sixteen Mahajanapadas table\n✅ Bimbisara and Ajatashatru\n✅ Buddhist councils and capital shifts\n✅ Nanda dynasty and Chanakya\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Mahajanapadas #Magadha #SSCCGL",
      tags: ["mahajanapadas", "16 mahajanapadas", "mahajanapadas capitals", "rise of magadha", "magadha empire", "haryanka dynasty", "shishunaga dynasty", "nanda dynasty", "bimbisara", "ajatashatru", "ancient india", "ancient history for ssc", "ancient history upsc", "ancient history railways", "buddhist councils", "general awareness history", "history one shot", "ancient india mcq", "vajji republic", "dhananand chanakya", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "Mahajanapadas and the Rise o"],
      hashtags: ["Mahajanapadas", "Magadha", "AncientIndia", "SSCCGL", "UPSC"],
      thumbText: "MAHAJANAPADAS + MAGADHA",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏰 New class is live: Mahajanapadas & the Rise of Magadha. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Background\n00:00 Sixteen Mahajanapadas\n00:00 Capitals and Locations\n00:00 Rise of Magadha\n00:00 Haryanka Dynasty\n00:00 Shishunaga Dynasty\n00:00 Nanda Dynasty",
      playlist: "Ancient India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>fast-track on the sixteen Mahajanapadas and the rise of Magadha</u> — from iron-age states to the Haryanka, Shishunaga and Nanda dynasties.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>7</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>38</b><span>Questions</span></div>
        <div class="cp-stat"><b>~52 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Background — Rise of Territorial States</b><br>Iron, surplus grain and the warrior class.</li>
        <li><b>The Sixteen Mahajanapadas</b><br>Sources, republics and the four powerful states.</li>
        <li><b>The Sixteen Mahajanapadas — Capitals &amp; Locations</b><br>Capital and modern location of each.</li>
        <li><b>Rise of Magadha</b><br>Brihadratha, five hills and why Magadha won.</li>
        <li><b>Haryanka Dynasty (544–412 BCE)</b><br>Bimbisara, Ajatashatru and Udayin.</li>
        <li><b>Shishunaga Dynasty (413–345 BCE)</b><br>Capital shifts and the Second Buddhist Council.</li>
        <li><b>Nanda Dynasty (345–321 BCE)</b><br>Mahapadma Nanda, Dhananand and the Maurya end.</li>
        <li><b>Practice</b><br>Exam-level questions after every topic.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> capitals, dynasty founders, Buddhist councils and who killed whom are asked in almost every SSC, Railways and UPSC Prelims paper.</div>
    `
  },
  2: {
    type: "concept", icon: "⚒️", accent: "#0ea5e9", pauseTimer: true,
    title: "Background — Rise of Territorial States",
    html: `
      <p class="cp-lead">In the <b>6th century BCE</b> the increasing use of <b>iron</b> created the conditions for territorial states.</p>
      <div class="cp-note remember">Iron agricultural tools → peasants produced <b>surplus grains</b>. Iron weapons → the <b>warrior class</b> became more significant.</div>
      <div class="cp-mnemonic"><b>Iron</b> → <b>surplus grain</b> → <b>territorial states</b>.</div>
    `
  },
  3: {
    questext: "The rise of territorial states in the 6th century BCE was mainly driven by the increasing use of —",
    options: ["Iron", "Copper", "Bronze", "Silver"],
    correct: "1",
    exptext: "✅ Iron. 📌 Iron → surplus → states. ❌ Copper and bronze belong to earlier ages."
  },
  4: {
    questext: "In the 6th century BCE, iron weapons made which class more significant?",
    options: ["Peasant class", "Priestly class", "Warrior class", "Merchant class"],
    correct: "3",
    exptext: "✅ The warrior class. 📌 Iron tools fed the peasants; iron weapons armed the warriors. ❌ Peasants gained from tools, not weapons."
  },
  5: {
    type: "concept", icon: "🗺️", accent: "#22c55e", pauseTimer: true,
    title: "The Sixteen Mahajanapadas",
    html: `
      <p class="cp-lead">The Buddhist text <b>Anguttara Nikaya</b> mentions ‘<b>Solasa Mahajanapadas</b>’ in <b>Jambudipa</b> (Bharatvarsha); the Jain text <b>Bhagavati Sutra</b> also lists sixteen.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Mahajanapadas_and_the_Rise_of_Magadha/1.png" alt="Schematic of the sixteen Mahajanapadas" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Political organization</td><td>Monarchical or republican — <b>Vajji</b> and <b>Malla</b> were republics, the other 14 monarchies</td></tr><tr><td>Ashmaka</td><td>The <b>only</b> Mahajanapada in South India, on the banks of the Godavari</td></tr><tr><td>Mahaparinirvanasutta</td><td>Six metropolises — Champa, Rajgir, Shravasti, Kashi, Kosambi, Saket</td></tr><tr><td>Lichchhavi Republic of Vaishali</td><td><b>First republic of the world</b>; capital of the Vajji Sangha, formed <b>500 BC</b></td></tr><tr><td>Four powerful</td><td><b>Magadha, Koshal, Vatsa, Avanti</b> — Magadha conquered the rest and formed the Magadha Empire</td></tr></tbody></table>
      <div class="cp-note trap"><b>Anguttara Nikaya</b> = Buddhist list of 16; <b>Bhagavati Sutra</b> = Jain list; <b>Mahaparinirvanasutta</b> = the six metropolises.</div>
    `
  },
  6: {
    questext: "The Buddhist text that mentions the ‘Solasa Mahajanapadas’ is the —",
    options: ["Bhagavati Sutra", "Mahaparinirvanasutta", "Anguttara Nikaya", "Arthashastra"],
    correct: "3",
    exptext: "✅ Anguttara Nikaya. 📌 Anguttara = Buddhist; Bhagavati = Jain. ❌ Mahaparinirvanasutta lists six metropolises."
  },
  7: {
    questext: "Which two Mahajanapadas were republics?",
    options: ["Magadha and Kosala", "Vajji and Malla", "Avanti and Vatsa", "Kuru and Panchala"],
    correct: "2",
    exptext: "✅ Vajji and Malla. 📌 All other 14 were monarchies. ❌ Magadha, Kosala, Avanti and Vatsa were monarchies."
  },
  8: {
    questext: "The only Mahajanapada in South India, on the banks of the Godavari, was —",
    options: ["Avanti", "Chedi", "Matsya", "Ashmaka"],
    correct: "4",
    exptext: "✅ Ashmaka. 📌 Ashmaka = Godavari = south. ❌ Avanti lay in Malwa, central India."
  },
  9: {
    questext: "Which of the following is NOT one of the six metropolises of the Mahaparinirvanasutta?",
    options: ["Taxila", "Champa", "Saket", "Kashi"],
    correct: "1",
    exptext: "✅ Taxila is not in the list. 📌 Champa, Rajgir, Shravasti, Kashi, Kosambi, Saket. ❌ Champa, Saket and Kashi are all listed."
  },
  10: {
    questext: "The Lichchhavi Republic of Vaishali, capital of the Vajji Sangha, was formed in —",
    options: ["600 BC", "500 BC", "400 BC", "322 BC"],
    correct: "2",
    exptext: "✅ 500 BC. 📌 First republic of the world. ❌ 322 BC is the founding of the Maurya dynasty."
  },
  11: {
    questext: "Which set contains the four powerful Mahajanapadas?",
    options: ["Magadha, Koshal, Vatsa, Avanti", "Magadha, Kasi, Anga, Avanti", "Magadha, Koshal, Vajji, Avanti", "Koshal, Vatsa, Avanti, Gandhara"],
    correct: "1",
    exptext: "✅ Magadha, Koshal, Vatsa, Avanti. 📌 Magadha conquered the rest. ❌ Vajji was a republic, not one of the four."
  },
  12: {
    type: "concept", icon: "📍", accent: "#f59e0b", pauseTimer: true,
    title: "The Sixteen Mahajanapadas — Capitals & Locations",
    html: `
      <table><thead><tr><th>Mahajanapada</th><th>Capital</th><th>Modern location</th></tr></thead><tbody><tr><td>Anga</td><td>Champa</td><td>Munger and Bhagalpur</td></tr><tr><td>Magadh</td><td>Girivraja / Rajagir</td><td>Gaya and Patna</td></tr><tr><td>Kasi</td><td>Kasi</td><td>Banaras</td></tr><tr><td>Vatsa</td><td>Kausambi</td><td>Allahabad</td></tr><tr><td>Kosala</td><td>Sravasti</td><td>Eastern Uttar Pradesh</td></tr><tr><td>Saurasena</td><td>Mathura</td><td>Mathura</td></tr><tr><td>Panchala</td><td>Ahichchatra and Kampilya</td><td>Western Uttar Pradesh</td></tr><tr><td>Kuru</td><td>Indraprastha</td><td>Meerut and south-east Haryana</td></tr><tr><td>Matsya</td><td>Viratnagar</td><td>Jaipur</td></tr><tr><td>Chedi</td><td>Sothivati</td><td>Bundelkhand</td></tr><tr><td>Avanti</td><td>Ujjain / Mahismati</td><td>Madhya Pradesh and Malwa</td></tr><tr><td>Gandhara</td><td>Taxila</td><td>Rawalpindi</td></tr><tr><td>Kamboj</td><td>Poonch / Rajpura</td><td>Rajori and Hajra (Kashmir)</td></tr><tr><td>Asmaka</td><td>Pratisthan / Paithan</td><td>Bank of the Godavari</td></tr><tr><td>Vajji</td><td>Vaishali</td><td>Vaishali</td></tr><tr><td>Malla</td><td>Kusinara</td><td>Deoria and Uttar Pradesh</td></tr></tbody></table>
      <div class="cp-note trap"><b>Avanti</b> had two capitals — Ujjain and Mahismati. Ashmaka, not Avanti, was in the south.</div>
    `
  },
  13: {
    questext: "Which Mahajanapada is correctly matched with its capital?",
    options: ["Vatsa — Taxila", "Gandhara — Kausambi", "Kosala — Sravasti", "Anga — Mathura"],
    correct: "3",
    exptext: "✅ Kosala — Sravasti. 📌 Vatsa = Kausambi; Gandhara = Taxila. ❌ Options 1 and 2 swap Vatsa and Gandhara."
  },
  14: {
    questext: "Kuru, with capital Indraprastha, corresponds to modern —",
    options: ["Jaipur", "Bundelkhand", "Rawalpindi", "Meerut and south-east Haryana"],
    correct: "4",
    exptext: "✅ Meerut and south-east Haryana. 📌 Kuru = Indraprastha = Delhi region. ❌ Jaipur is the modern location of Matsya."
  },
  15: {
    questext: "Matsya, with capital Viratnagar, corresponds to modern —",
    options: ["Bundelkhand", "Jaipur", "Rawalpindi", "Deoria"],
    correct: "2",
    exptext: "✅ Jaipur. 📌 Matsya = Viratnagar = Jaipur. ❌ Bundelkhand is the modern location of Chedi."
  },
  16: {
    questext: "Taxila, the capital of Gandhara, lies near modern —",
    options: ["Jaipur", "Allahabad", "Rawalpindi", "Banaras"],
    correct: "3",
    exptext: "✅ Rawalpindi. 📌 Gandhara = Taxila = Rawalpindi. ❌ Allahabad is near Kausambi, the Vatsa capital."
  },
  17: {
    questext: "Which Mahajanapada had Ujjain and Mahismati as its capitals?",
    options: ["Chedi", "Matsya", "Kamboj", "Avanti"],
    correct: "4",
    exptext: "✅ Avanti, in Madhya Pradesh and Malwa. 📌 Avanti had two capitals. ❌ Chedi's capital was Sothivati."
  },
  18: {
    questext: "The Malla Mahajanapada, with capital Kusinara, corresponds to modern —",
    options: ["Deoria and Uttar Pradesh", "Bundelkhand", "Meerut", "Rajori and Hajra"],
    correct: "1",
    exptext: "✅ Deoria and Uttar Pradesh. 📌 Malla = Kusinara = Deoria. ❌ Rajori and Hajra are the modern location of Kamboj."
  },
  19: {
    type: "concept", icon: "📈", accent: "#ef4444", pauseTimer: true,
    title: "Rise of Magadha",
    html: `
      <p class="cp-lead">The earliest dynasty was founded by <b>Brihadratha</b> — named in the <b>Rig Veda</b> and the <b>Puranas</b>; his son <b>Jarasandha</b> was killed by <b>Bhima</b> in the Mahabharata war.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Succession</td><td>Brihadratha → Pradyotas (notorious for patricide) → Haryanka; Magadha rose to prominence under Bimbisara</td></tr><tr><td>Region</td><td>South Bihar (modern Patna district)</td></tr><tr><td>Capital</td><td>Giribraj, later Rajgir, surrounded by <b>five hills</b>; later shifted to Pataliputra</td></tr><tr><td>Boundary</td><td>Ganga (north), Vindhyas (south), Champa (east), Son (west)</td></tr></tbody></table>
      <div class="cp-note exam"><b>Why Magadha rose</b> — fertile plains and iron in agriculture; forest area and elephants; mineral resources; trade and natural security (Rajgir's five hills); it annexed the powerful Kosala, Vatsa and Avanti.</div>
    `
  },
  20: {
    questext: "The earliest dynasty of Magadha was founded by —",
    options: ["Bimbisara", "Shishunaga", "Pradyota", "Brihadratha"],
    correct: "4",
    exptext: "✅ Brihadratha. 📌 Brihadratha → Pradyotas → Haryanka. ❌ Bimbisara founded the Haryanka dynasty."
  },
  21: {
    questext: "Brihadratha's son Jarasandha was killed in the Mahabharata war by —",
    options: ["Arjuna", "Krishna", "Bhima", "Yudhishthira"],
    correct: "3",
    exptext: "✅ Bhima. 📌 Bhima killed Jarasandha. ❌ Krishna advised but did not kill him."
  },
  22: {
    questext: "The original capital of Magadha, Giribraj (later Rajgir), was surrounded by —",
    options: ["Seven rivers", "Five hills", "Three lakes", "Dense deserts"],
    correct: "2",
    exptext: "✅ Five hills. 📌 Hills gave natural security. ❌ Rivers, lakes and deserts do not describe Rajgir."
  },
  23: {
    questext: "Which of the following was NOT a reason for the rise of Magadha?",
    options: ["Fertile plains and iron in agriculture", "Forest area and elephants", "Natural security of Rajgir's five hills", "Absence of powerful neighbouring kingdoms"],
    correct: "4",
    exptext: "✅ Magadha had powerful neighbours — Kosala, Vatsa, Avanti. 📌 It annexed them. ❌ The other three were real advantages."
  },
  24: {
    type: "concept", icon: "👑", accent: "#8b5cf6", pauseTimer: true,
    title: "Haryanka Dynasty (544–412 BCE)",
    html: `
      <p class="cp-lead">Founder — <b>Bimbisara</b>; capital — <b>Rajgriha / Girivraj</b>. Three rulers matter: Bimbisara, Ajatashatru, Udayin.</p>
      <table><thead><tr><th>Ruler</th><th>Key facts</th></tr></thead><tbody><tr><td><b>Bimbisara</b> (544–492 BCE)</td><td>Contemporary of Buddha and Mahavira; Jain texts call him ‘Seniya / Shrenika’; had a large standing army; used matrimonial alliances; conquered Anga and made son Ajatashatru its ruler; friend of Chandpradyot of Avanti, to whom he sent the physician <b>Jeevak</b>; Gandhara ruler <b>Pukkusati</b> sent an embassy; murdered by his son Ajatashatru</td></tr><tr><td><b>Ajatashatru</b> (492–460 BCE)</td><td>Killing his father brought enmity with Prasenjit of Kosala; won and absorbed Kashi; new weapons <b>Rathamusala</b> (chariot with maces) and <b>Mahashilakantaka</b> (catapult); built the fort <b>Pataligrama</b>; friend of Jainas and Buddhists, patron of Devadutta; <b>First Buddhist Council</b>, Rajagriha, <b>483 BC</b>, chaired by <b>Mahakassapa</b>; killed by his son Udayin</td></tr><tr><td><b>Udayin</b> (460–444 BCE)</td><td>Developed <b>Pataliputra</b> and shifted the capital there from Rajagriha, at the confluence of the Son and the Ganges; last Haryanka king — his son <b>Nagadashaka</b>, dethroned by Amatya Shishunaga</td></tr></tbody></table>
      <table><thead><tr><th>Bimbisara's wife</th><th>Details</th></tr></thead><tbody><tr><td>Kosaladevi (Mahakoshala Devi)</td><td>Daughter of Koshalraj, sister of Prasenjit — brought the <b>Kashi</b> province, income of one lakh a year</td></tr><tr><td>Chelna (Chhalna)</td><td>Lichchhavi princess of Vaishali — mother of Ajatashatru</td></tr><tr><td>Kshema</td><td>Princess of the Madra clan of Punjab</td></tr></tbody></table>
      <div class="cp-note trap">Both Bimbisara and Ajatashatru were killed by their own sons — the Haryanka dynasty was a dynasty of <b>patricide</b>.</div>
    `
  },
  25: {
    questext: "The founder of the Haryanka dynasty was —",
    options: ["Bimbisara", "Ajatashatru", "Udayin", "Shishunaga"],
    correct: "1",
    exptext: "✅ Bimbisara, capital Rajgriha. 📌 Bimbisara = Haryanka founder. ❌ Shishunaga founded the next dynasty."
  },
  26: {
    questext: "Bimbisara is called ‘Seniya’ or ‘Shrenika’ in the —",
    options: ["Buddhist texts", "Jain texts", "Puranas", "Arthashastra"],
    correct: "2",
    exptext: "✅ Jain texts. 📌 Seniya = Jain name for Bimbisara. ❌ Buddhist texts call him a follower of Buddha."
  },
  27: {
    questext: "Which province came to Magadha through Bimbisara's marriage with Mahakoshala Devi?",
    options: ["Anga", "Avanti", "Vaishali", "Kashi"],
    correct: "4",
    exptext: "✅ Kashi. 📌 Kosala princess = Kashi dowry. ❌ Anga was conquered by Bimbisara in war."
  },
  28: {
    questext: "Ajatashatru's mother was —",
    options: ["Kosaladevi", "Chelna, a Lichchhavi princess", "Kshema, a Madra princess", "Mahakoshala Devi"],
    correct: "2",
    exptext: "✅ Chelna of Vaishali. 📌 Chelna = Lichchhavi = Ajatashatru's mother. ❌ Kosaladevi and Mahakoshala Devi is one Kosala princess; Kshema was a Madra princess."
  },
  29: {
    questext: "Which Gandhara ruler sent an embassy to Bimbisara?",
    options: ["Chandpradyot", "Prasenjit", "Pukkusati", "Dhananand"],
    correct: "3",
    exptext: "✅ Pukkusati. 📌 Gandhara = Pukkusati; Avanti = Chandpradyot. ❌ Chandpradyot ruled Avanti and received Jeevak."
  },
  30: {
    questext: "Ajatashatru's two new weapons were —",
    options: ["Rathamusala and Mahashilakantaka", "Gandiva and Pinaka", "Chakra and Trishul", "Vajra and Kunta"],
    correct: "1",
    exptext: "✅ Rathamusala (chariot with maces) and Mahashilakantaka (catapult). 📌 Rath = chariot; Shila = stone. ❌ The others are mythical weapons."
  },
  31: {
    questext: "The First Buddhist Council was held at Rajagriha in 483 BC under the chairmanship of —",
    options: ["Sabbakami", "Devadutta", "Upali", "Mahakassapa"],
    correct: "4",
    exptext: "✅ Mahakassapa, under Ajatashatru. 📌 First = Rajagriha = Mahakassapa. ❌ Sabbakami chaired the Second Council."
  },
  32: {
    questext: "The capital of Magadha was shifted from Rajagriha to Pataliputra by —",
    options: ["Bimbisara", "Ajatashatru", "Udayin", "Shishunaga"],
    correct: "3",
    exptext: "✅ Udayin, at the Son–Ganges confluence. 📌 Udayin = Pataliputra. ❌ Ajatashatru only built the Pataligrama fort."
  },
  33: {
    questext: "Ajatashatru was killed by —",
    options: ["Nagadashaka", "Udayin", "Shishunaga", "Kalashoka"],
    correct: "2",
    exptext: "✅ His son Udayin. 📌 Both Haryanka kings died by patricide. ❌ Nagadashaka was Udayin's son, dethroned by Shishunaga."
  },
  34: {
    type: "concept", icon: "🛕", accent: "#14b8a6", pauseTimer: true,
    title: "Shishunaga Dynasty (413–345 BCE)",
    html: `
      <p class="cp-lead"><b>Shishunaga</b> was the <b>viceroy of Varanasi</b> before becoming ruler; he shifted the capital to <b>Vaishali</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Mahajanapadas_and_the_Rise_of_Magadha/2.png" alt="Capital chain Rajgriha, Pataliputra, Vaishali, Pataliputra" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Key facts</th></tr></thead><tbody><tr><td>Shishunaga</td><td>Viceroy of Varanasi; dethroned Nagadashaka; capital shifted to Vaishali</td></tr><tr><td>Kalashoka / Kakavarna (394–345 BCE)</td><td>Succeeded Shishunaga; shifted the capital <b>back to Pataliputra</b>; <b>Second Buddhist Council</b>, Vaishali, <b>383 BC</b>, chaired by <b>Sabbakami</b></td></tr><tr><td>Nandivardhan</td><td>Son of Kalashoka; followed by Mahanandin, the last Shishunaga king</td></tr></tbody></table>
      <div class="cp-mnemonic">Capital chain: Rajgriha → <b>Pataliputra</b> (Udayin) → <b>Vaishali</b> (Shishunaga) → <b>Pataliputra</b> (Kalashoka).</div>
    `
  },
  35: {
    questext: "Shishunaga was the viceroy of which city before becoming ruler?",
    options: ["Varanasi", "Taxila", "Anga", "Vaishali"],
    correct: "1",
    exptext: "✅ Varanasi. 📌 Shishunaga = Varanasi viceroy. ❌ Vaishali was the capital he shifted to."
  },
  36: {
    questext: "Which ruler shifted the capital of Magadha to Vaishali?",
    options: ["Shishunaga", "Udayin", "Bimbisara", "Kalashoka"],
    correct: "1",
    exptext: "✅ Shishunaga. 📌 Vaishali = Shishunaga; Pataliputra = Udayin and Kalashoka. ❌ Kalashoka shifted the capital back to Pataliputra."
  },
  37: {
    questext: "The Second Buddhist Council at Vaishali (383 BC) was chaired by —",
    options: ["Mahakassapa", "Ananda", "Sabbakami", "Upali"],
    correct: "3",
    exptext: "✅ Sabbakami, under Kalashoka. 📌 Second = Vaishali = Sabbakami. ❌ Mahakassapa chaired the First Council."
  },
  38: {
    questext: "‘Kakavarna’ was another name of —",
    options: ["Shishunaga", "Nandivardhan", "Udayin", "Kalashoka"],
    correct: "4",
    exptext: "✅ Kalashoka. 📌 Kakavarna = Kalashoka. ❌ Nandivardhan was his son."
  },
  39: {
    type: "concept", icon: "🪙", accent: "#ec4899", pauseTimer: true,
    title: "Nanda Dynasty (345–321 BCE)",
    html: `
      <p class="cp-lead">Founder <b>Mahapadma Nanda</b>, who took the title ‘<b>ekrat</b>’ — the <b>first non-Kshatriya ruling dynasty</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Mahajanapadas_and_the_Rise_of_Magadha/3.png" alt="Succession from Brihadratha to Maurya" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Puranas</td><td>Destroyer of all the Kshatriyas, a second <b>Parsurama / Bhargava</b>; son of Mahanandin, the last Shishunaga king, by a <b>Shudra</b> woman</td></tr><tr><td>Jaina writers</td><td>Son of a courtesan by a barber</td></tr><tr><td>Dhananand</td><td>Contemporary of <b>Alexander</b>, who invaded North-western India in <b>326 BC</b> — the Nanda armies <b>never faced</b> him; <b>Chanakya</b>, a teacher of Takshila, was insulted at his court</td></tr><tr><td>End</td><td><b>322 BC</b> — Chandragupta Maurya, with Chanakya's help, killed Dhananand and founded the <b>Maurya</b> dynasty</td></tr></tbody></table>
      <div class="cp-note trap">Alexander's invasion (<b>326 BC</b>) fell in Dhananand's reign; the Maurya foundation (<b>322 BC</b>) followed — the Nandas never fought Alexander.</div>
    `
  },
  40: {
    questext: "Mahapadma Nanda took the title —",
    options: ["Chakravartin", "Ekrat", "Samrat", "Devanampiya"],
    correct: "2",
    exptext: "✅ ‘Ekrat’, the sole ruler. 📌 Ekrat = Mahapadma Nanda. ❌ Devanampiya is associated with Ashoka."
  },
  41: {
    questext: "The Nandas were the first —",
    options: ["Non-Kshatriya ruling dynasty", "Buddhist dynasty", "Dynasty to use iron", "Dynasty to rule Magadha"],
    correct: "1",
    exptext: "✅ The first non-Kshatriya ruling dynasty. 📌 Nanda = non-Kshatriya. ❌ Magadha was ruled by earlier dynasties."
  },
  42: {
    questext: "According to the Puranas, Mahapadma Nanda was the son of Mahanandin by a —",
    options: ["Brahmin woman", "Kshatriya woman", "Courtesan", "Shudra woman"],
    correct: "4",
    exptext: "✅ A Shudra woman. 📌 Puranas = Shudra mother; Jain = courtesan and barber. ❌ Courtesan is the Jaina account."
  },
  43: {
    questext: "Alexander invaded North-western India in 326 BC during the reign of —",
    options: ["Mahapadma Nanda", "Dhananand", "Chandragupta Maurya", "Bindusara"],
    correct: "2",
    exptext: "✅ Dhananand. 📌 326 BC = Dhananand; 322 BC = Maurya. ❌ Chandragupta Maurya founded his dynasty after Alexander."
  },
  44: {
    questext: "Chanakya, a teacher of Takshila, was insulted at the court of —",
    options: ["Bimbisara", "Ajatashatru", "Shishunaga", "Dhananand"],
    correct: "4",
    exptext: "✅ Dhananand. 📌 Insult → Chanakya's revenge. ❌ The Haryanka and Shishunaga kings ruled long before."
  },
  45: {
    questext: "Dhananand was killed in 322 BC by —",
    options: ["Alexander", "Ajatashatru", "Chandragupta Maurya", "Bindusara"],
    correct: "3",
    exptext: "✅ Chandragupta Maurya, with Chanakya's help. 📌 322 BC = Maurya dynasty founded. ❌ Alexander never faced the Nanda armies."
  },
  46: {
    questext: "Which statement about Alexander's invasion is correct?",
    options: ["Alexander defeated Dhananand", "Alexander invaded in 326 BC but the Nanda armies never faced him", "Alexander invaded in 322 BC", "Alexander fought Chandragupta Maurya"],
    correct: "2",
    exptext: "✅ Invasion in 326 BC; the Nanda armies never faced him. 📌 326 BC Alexander; 322 BC Maurya. ❌ 322 BC is the Maurya foundation date."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Mahajanapadas_and_the_Rise_of_Magadha/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a silver punch-marked karshapana coin, a hill fort with five peaks, and a rolled palm-leaf scroll" },
  "images/General_Awareness/Ancient_India/Mahajanapadas_and_the_Rise_of_Magadha/1.png": { t: "fig", about: "Schematic, not a map: sixteen small circles labelled with Mahajanapada names; Vajji and Malla marked as republics, the other fourteen as monarchies; Magadha, Koshal, Vatsa and Avanti highlighted as the four powerful." },
  "images/General_Awareness/Ancient_India/Mahajanapadas_and_the_Rise_of_Magadha/2.png": { t: "fig", about: "Four boxes joined by arrows: Rajgriha (Bimbisara) → Pataliputra (Udayin) → Vaishali (Shishunaga) → Pataliputra (Kalashoka)." },
  "images/General_Awareness/Ancient_India/Mahajanapadas_and_the_Rise_of_Magadha/3.png": { t: "fig", about: "Horizontal succession chain: Brihadratha → Pradyotas → Haryanka (544–412 BCE, Bimbisara) → Shishunaga (413–345 BCE) → Nanda (345–321 BCE, Mahapadma Nanda) → Maurya (Chandragupta, 322 BC)." }
});

/* CHANGE LOG
   - Mahanandin is written as the last Shishunaga king, after Nandivardhan (the book calls both the last ruler).
   - Mahakoshala Devi's dowry written as 'income of one lakh a year' without the word rupees (no rupee in that age).
   - Spelling unified: Dhanananda/Dhananand → Dhananand; Kosambi and Kausambi kept as in the book for the metropolis list and the Vatsa capital.
*/