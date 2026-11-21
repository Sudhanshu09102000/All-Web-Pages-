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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Mauryan_Empire · 17 concept pages (+ overview) · 52 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Mauryan Empire",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Mauryan_Empire/thumbnail.png",
      banner: "ANCIENT INDIA • ALL EXAMS",
      line1: "MAURYAN",
      line2: "EMPIRE",
      line3: "FULL CHAPTER",
      badge: "CRASH CLASS",
      ribbon: "ASHOKA • EDICTS • ADMINISTRATION",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Mauryan Empire Complete Chapter | Ancient India for SSC UPSC Railways",
      altTitles: ["Ashoka Edicts & Inscriptions in One Class", "Mauryan Administration & Art Crash Course"],
      description: "Mauryan Empire is a high-yield chapter of Ancient India. In this crash class we cover every subtopic from Chandragupta Maurya to the fall of the dynasty, with tricks and practice questions.\n\n📌 IN THIS CLASS\n✅ Sources of Mauryan history\n✅ Chandragupta, Bindusara and Ashoka\n✅ Kalinga War, Dhamma and Edicts\n✅ Administration, Society, Economy, Art\n✅ Inscriptions and places of discovery\n✅ Practice MCQs\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#MauryanEmpire #AncientIndia #Ashoka",
      tags: ["mauryan empire", "mauryan empire for all exams", "ancient india", "ashoka edicts", "ashoka inscriptions", "chandragupta maurya", "bindusara", "kalinga war", "ashoka dhamma", "mauryan administration", "arthashastra", "megasthenes indica", "ancient india history", "indian history", "history mcq", "ssc cgl history", "upsc history", "railway ntpc history", "static gk history", "mauryan empire mcq", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "Mauryan Empire Anc"],
      hashtags: ["MauryanEmpire", "AncientIndia", "Ashoka"],
      thumbText: "MAURYAN EMPIRE IN ONE CLASS",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New class: Mauryan Empire complete chapter. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Ancient India — Crash Course"
    },
    html: `
      <p class="cp-lead">From <u>Chandragupta to Brihadratha</u>: sources, rulers, Ashoka's Dhamma, edicts, administration, economy, art and the fall — the full Mauryan chapter in one crash class.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>17</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>52</b><span>Questions</span></div>
        <div class="cp-stat"><b>~86 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Sources &amp; Establishment</b><br>Literary, foreign and archaeological sources; Chandragupta's rise.</li>
        <li><b>Chandragupta, Bindusara, Ashoka</b><br>Three great rulers, Kalinga War and Dhamma.</li>
        <li><b>Preachers, Edicts &amp; Inscriptions</b><br>Missionaries, edict subjects, places of discovery.</li>
        <li><b>Successors &amp; Administration</b><br>Saptanga theory, provinces, Tirthas, Adhyakshas.</li>
        <li><b>Society, Economy &amp; Art</b><br>Seven castes, taxes, trade, pillars and sculpture.</li>
        <li><b>Fall of the Empire</b><br>Four scholars, four views.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Mauryan history is asked every year in SSC, UPSC, Railways and State exams — mostly as edicts, inscriptions and administrative terms.</div>
    `
  },
  2: {
    type: "concept", icon: "📚", accent: "#22c55e", pauseTimer: true,
    title: "5.1 Sources of Mauryan History",
    html: `
      <p class="cp-lead">Evidence comes in <b>three streams</b> — literary, foreign accounts and archaeological. <u>Know one key name in each.</u></p>
      <table><thead><tr><th>Stream</th><th>Key sources</th></tr></thead><tbody><tr><td>Literary</td><td>Arthashastra (Kautilya), Mudrarakshasa (Vishakhadatta), Kathasaritsagara (Somdev), Brihatkathamanjari (Kshemendra), Mahabhashya (Patanjali)</td></tr><tr><td>Literary (Jain)</td><td>Kalpasutra (Bhadrabahu), Parishishtaparvan (Hemchandra)</td></tr><tr><td>Literary (Buddhist)</td><td>Dipvansh, Mahavansh, Mahabodhivansh, Divyavadana</td></tr><tr><td>Foreign</td><td><b>Indika of Megasthenes</b> (main source), Justin, Strabo, Curtius</td></tr><tr><td>Archaeological</td><td>40+ inscriptions of Ashoka, Junagadh (Girnar) inscription, Northern Black Polished Ware, stupas, caves, punch-marked coins</td></tr></tbody></table>
      <div class="cp-note trap">Megasthenes was the ambassador of <b>Seleucus Nicator</b> at Pataliputra. Justin and the Greeks called Chandragupta <b>‘Sandrocottus’</b>.</div>
      <div class="cp-note remember">Ashoka's Brahmi edicts were first deciphered by <b>James Prinsep</b> in <b>1837</b>; the Arthashastra was rediscovered by <b>R. Shamasastry</b> in <b>1905</b>.</div>
    `
  },
  3: {
    questext: "Which work is the main foreign source for Mauryan history?",
    options: ["Indika of Megasthenes", "Mudrarakshasa", "Divyavadana", "Mahavansh"],
    correct: "1",
    exptext: "✅ Megasthenes, Seleucus' ambassador at Pataliputra, wrote Indika. 📌 Foreign = Megasthenes. ❌ Mudrarakshasa is an Indian drama."
  },
  4: {
    questext: "Which of the following is NOT a literary source of Mauryan history?",
    options: ["Mudrarakshasa", "Arthashastra", "Kathasaritsagara", "Harshacharita"],
    correct: "4",
    exptext: "✅ Harshacharita (Banabhatta) concerns Harsha, not the Mauryas. 📌 Mudrarakshasa is the Chandragupta–Chanakya play."
  },
  5: {
    questext: "Greek writer Justin called Chandragupta Maurya by which name?",
    options: ["Amitrochates", "Palibrothra", "Sandrocottus", "Agronomoi"],
    correct: "3",
    exptext: "✅ Sandrocottus is Chandragupta. 📌 Amitrochates = Bindusara. ❌ Palibrothra is Pataliputra, not a person."
  },
  6: {
    questext: "Ashoka's inscriptions in Brahmi were first deciphered by whom?",
    options: ["Alexander Cunningham", "James Prinsep", "John Marshall", "R. Shamasastry"],
    correct: "2",
    exptext: "✅ James Prinsep deciphered them in 1837. 📌 Prinsep = Ashoka's script. ❌ Shamasastry found the Arthashastra."
  },
  7: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "5.2 Establishment of the Maurya Empire",
    html: `
      <p class="cp-lead">Chandragupta Maurya founded the empire with <b>Pataliputra</b> as capital. His mother was <b>Moor</b>, hence ‘Maurya’.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Founder</td><td>Chandragupta Maurya</td></tr><tr><td>Capital</td><td>Pataliputra</td></tr><tr><td>Mother</td><td>Moor (= Maurya in Sanskrit)</td></tr><tr><td>Buddhist and Jain texts</td><td>‘Moriya Kshatriya’</td></tr><tr><td>Mudrarakshasa</td><td>‘Vrishala’, ‘Kula-hina (Shudra)’</td></tr></tbody></table>
      <div class="cp-note trap">The same dynasty is called <b>Kshatriya</b> in Buddhist and Jain texts but <b>low-born</b> in the Brahmanical drama Mudrarakshasa.</div>
    `
  },
  8: {
    questext: "Which text calls Chandragupta ‘Vrishala’ and ‘Kula-hina’?",
    options: ["Dipvansh", "Divyavadana", "Mudrarakshasa", "Mahavansh"],
    correct: "3",
    exptext: "✅ Mudrarakshasa by Vishakhadatta uses these low-caste terms. 📌 Buddhist texts say Kshatriya. ❌ Dipvansh is Buddhist."
  },
  9: {
    questext: "Buddhist and Jain texts describe the Mauryas as which clan?",
    options: ["Brahmin", "Vaishya", "Shudra", "Moriya Kshatriya"],
    correct: "4",
    exptext: "✅ They call them ‘Moriya Kshatriya’. 📌 Moor → Maurya. ❌ Shudra comes from Mudrarakshasa."
  },
  10: {
    type: "concept", icon: "⚔️", accent: "#ef4444", pauseTimer: true,
    title: "5.3 Chandragupta Maurya (322–298 BCE)",
    html: `
      <p class="cp-lead">Chandragupta <b>defeated Seleucus Nicator</b>, then gave up the throne to follow <b>Jainism</b>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Rule</td><td>322–298 BCE</td></tr><tr><td>Seleucus Nicator</td><td>Defeated; daughter <b>Helena</b> married Chandragupta</td></tr><tr><td>Greek name of Pataliputra</td><td>Palibrotha</td></tr><tr><td>Religion</td><td>Jain follower; abdicated for his son, took initiation from Jain Muni <b>Bhadrabahu</b></td></tr><tr><td>Death</td><td><b>Sallekhana</b> (fast unto death) at <b>Shravanabelagola</b>, Karnataka, 298 BC</td></tr></tbody></table>
      <div class="cp-note exam"><b>Girnar — one rock, three dynasties.</b> The Junagadh rock carries Ashoka's major rock edicts and the Shaka ruler <b>Rudradaman</b>'s inscription (c. 130–150 CE), the <b>first long inscription in chaste Sanskrit</b>.</div>
      <div class="cp-note trap"><b>Sudarshana Lake</b> was built by <b>Pushyagupta</b> (Chandragupta's governor); its conduits were added by <b>Tushaspa</b> (Ashoka's governor).</div>
    `
  },
  11: {
    questext: "Which Greek ruler's daughter Helena married Chandragupta Maurya?",
    options: ["Antiochus I", "Seleucus Nicator", "Alexander", "Diodotus"],
    correct: "2",
    exptext: "✅ Seleucus Nicator was defeated and gave his daughter. 📌 Seleucus = Helena. ❌ Antiochus I was his son, who sent Diamachus."
  },
  12: {
    questext: "The Sudarshana Lake at Girnar was built by which governor of Chandragupta?",
    options: ["Pushyagupta", "Tushaspa", "Rudradaman", "Kautilya"],
    correct: "1",
    exptext: "✅ Pushyagupta built it. 📌 Pushya = Pehla (first). ❌ Tushaspa added conduits under Ashoka."
  },
  13: {
    questext: "Which statement about Chandragupta Maurya is NOT correct?",
    options: ["He defeated Seleucus Nicator", "He died by Sallekhana at Shravanabelagola", "He became a Buddhist monk under Upgupta", "He followed the Jain Muni Bhadrabahu"],
    correct: "3",
    exptext: "✅ Upgupta initiated Ashoka, not Chandragupta. 📌 Chandragupta = Jain; Ashoka = Buddhist. ❌ Others are true."
  },
  14: {
    questext: "The Junagadh inscription of Rudradaman is important because it is:",
    options: ["the first Prakrit edict", "written in Kharosthi", "a record of the Kalinga War", "the first long inscription in chaste Sanskrit"],
    correct: "4",
    exptext: "✅ Rudradaman's inscription (c. 130–150 CE) is the first long chaste Sanskrit record. 📌 Girnar holds Ashoka and Rudradaman. ❌ Edicts are Prakrit."
  },
  15: {
    type: "concept", icon: "🦅", accent: "#8b5cf6", pauseTimer: true,
    title: "5.4 Bindusara (298–272 BCE)",
    html: `
      <p class="cp-lead">Bindusara, Chandragupta's son, was known to the Greeks as <b>‘Amitrochates’</b> — Sanskrit <b>Amitraghata</b>, destroyer of foes.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Greek name</td><td>Amitrochates (Amitraghata)</td></tr><tr><td>Ambassador</td><td><b>Diamachus</b>, sent by Antiochus I of Syria</td></tr><tr><td>His request</td><td>Dried figs, grape wine and a philosopher</td></tr><tr><td>Ajivika astrologer</td><td>Pingalvatsa</td></tr><tr><td>Prime Minister</td><td>Chanakya continued</td></tr><tr><td>Succession</td><td>Four-year struggle; Ashoka crowned 269–268 BCE</td></tr></tbody></table>
      <div class="cp-note trap">Antiochus sent figs and wine, but refused the philosopher — <b>Greek law did not allow a philosopher to be sold</b>.</div>
    `
  },
  16: {
    questext: "‘Amitrochates’ of Greek accounts is identified with:",
    options: ["Chandragupta", "Ashoka", "Dasharatha", "Bindusara"],
    correct: "4",
    exptext: "✅ Amitrochates = Amitraghata = Bindusara. 📌 Sandrocottus is Chandragupta. ❌ Ashoka was his son."
  },
  17: {
    questext: "Which of Bindusara's requests did the Syrian king refuse?",
    options: ["Dried figs", "Grape wine", "A philosopher", "An ambassador"],
    correct: "3",
    exptext: "✅ Greek law forbade selling a philosopher. 📌 Figs and wine were sent. ❌ Diamachus was sent as ambassador."
  },
  18: {
    type: "concept", icon: "🕉️", accent: "#14b8a6", pauseTimer: true,
    title: "5.5 Ashoka (268 BC – 232 BC)",
    html: `
      <p class="cp-lead">Ashoka, son of Bindusara, was <b>governor of Ujjain</b> before coronation in <b>269 BC</b>; his empire ran from Afghanistan to Karnataka.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Mother</td><td><b>Subhadrangi</b>, Brahmin's daughter of Champa</td></tr><tr><td>Tradition</td><td>Killed his 99 brothers (<b>Ashokavandana</b>)</td></tr><tr><td>Titles</td><td><b>Devanampriya Piyadasi</b> in inscriptions</td></tr><tr><td>Puranas</td><td>Ashokvardhan</td></tr><tr><td>Deepvansh</td><td>Karmoli</td></tr><tr><td>Maski</td><td>Buddha Shakya</td></tr><tr><td>Taranatha</td><td>Kamashoka → Chandashoka → Dhammashoka</td></tr><tr><td>Ports</td><td>Tamralipti (Bengal) and Broach (mouth of Narmada)</td></tr></tbody></table>
      <div class="cp-note exam"><b>Extent</b> — North-Western Frontier Province (Afghanistan) to Karnataka, Kathiawar (Gujarat) to the Bay of Bengal; <b>Kandahar</b> was the westernmost limit and Kalinga was brought under control.</div>
    `
  },
  19: {
    questext: "Who was the mother of Ashoka?",
    options: ["Moor", "Helena", "Karuvaki", "Subhadrangi"],
    correct: "4",
    exptext: "✅ Subhadrangi, a Brahmin's daughter of Champa. 📌 Moor = Chandragupta's mother. ❌ Karuvaki was his queen."
  },
  20: {
    questext: "Which text mentions that Ashoka killed his ninety-nine brothers?",
    options: ["Ashokavandana", "Arthashastra", "Mudrarakshasa", "Indika"],
    correct: "1",
    exptext: "✅ The Buddhist Ashokavandana records it. 📌 Ashoka-vandana = Ashoka legends. ❌ Indika is by Megasthenes."
  },
  21: {
    questext: "Before becoming emperor, Ashoka was governor of:",
    options: ["Tosali", "Ujjain", "Suvarnagiri", "Pataliputra"],
    correct: "2",
    exptext: "✅ He was governor of Ujjain. 📌 Ujjain → throne. ❌ Tosali was Kalinga's capital and Suvarnagiri the southern province's."
  },
  22: {
    questext: "Which pair is correctly matched?",
    options: ["Karmoli – Puranas", "Buddha Shakya – Maski", "Kamashoka – Kalhana", "Ashokvardhan – Deepvansh"],
    correct: "2",
    exptext: "✅ The Maski inscription calls him Buddha Shakya. 📌 Karmoli = Deepvansh; Ashokvardhan = Puranas. ❌ Kamashoka is Taranatha's."
  },
  23: {
    type: "concept", icon: "🔥", accent: "#ec4899", pauseTimer: true,
    title: "Kalinga War",
    html: `
      <p class="cp-lead">The war that changed Ashoka: in his <b>8th regnal year</b> (c. <b>261 BC</b>) he captured <b>Tosali</b>, and the massacre made him renounce war forever.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Mauryan_Empire/2.png" alt="Timeline: 269 BC to 232 BC" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Year</td><td>8th year of coronation, c. 261 BC</td></tr><tr><td>Kalinga capital</td><td>Tosali</td></tr><tr><td>Described in</td><td>Thirteenth edict</td></tr><tr><td>Faith</td><td>Brahminism → Buddhism, initiated by monk <b>Upgupta</b></td></tr><tr><td>Bodhgaya visit</td><td>10th year</td></tr><tr><td>Lumbini visit</td><td>20th year; declared Lumbini tax free</td></tr><tr><td>Missionaries</td><td>Son Mahindra, daughter Sanghamitra to Sri Lanka</td></tr></tbody></table>
      <div class="cp-note trap">Kalhana's <i>Rajatarangini</i> instead calls Ashoka a <b>Shaiva</b> with authority over Kashmir, the temple <b>‘Ashokeshwar’</b>, the Dharmarni Vihar and the founding of Srinagar and Devpattan (Nepal).</div>
    `
  },
  24: {
    questext: "In which regnal year of Ashoka did the Kalinga War take place?",
    options: ["8th year", "10th year", "13th year", "20th year"],
    correct: "1",
    exptext: "✅ 8th year, c. 261 BC. 📌 8 → Kalinga; 10 → Bodhgaya; 20 → Lumbini. ❌ 10th is the Bodhgaya visit."
  },
  25: {
    questext: "The Kalinga War is described in which major rock edict?",
    options: ["Twelfth", "Thirteenth", "Fifth", "Second"],
    correct: "2",
    exptext: "✅ The Thirteenth edict describes the war and Ashoka's remorse. 📌 13 = Kalinga War. ❌ Twelfth is about all religions."
  },
  26: {
    questext: "Who initiated Ashoka into Buddhism after the Kalinga War?",
    options: ["Moggaliputta Tissa", "Bhadrabahu", "Upgupta", "Pingalvatsa"],
    correct: "3",
    exptext: "✅ The monk Upgupta initiated him. 📌 Upgupta = Ashoka's guru. ❌ Bhadrabahu was Chandragupta's Jain guru."
  },
  27: {
    questext: "Ashoka visited Lumbini and declared it tax free in which year of his reign?",
    options: ["8th", "10th", "13th", "20th"],
    correct: "4",
    exptext: "✅ He visited Lumbini in the 20th year. 📌 Bodhgaya came earlier, in the 10th year. ❌ 8th is the Kalinga War."
  },
  28: {
    type: "concept", icon: "🌏", accent: "#3b82f6", pauseTimer: true,
    title: "5.6 Religious Preachers Sent by Ashoka",
    html: `
      <p class="cp-lead">After the <b>Third Buddhist Council</b>, preachers were sent to spread the Dhamma in many regions.</p>
      <table><thead><tr><th>Preacher</th><th>Location</th></tr></thead><tbody><tr><td>Mahendra and Sanghamitra</td><td>Sri Lanka</td></tr><tr><td>Maharakshit</td><td>Yavan country</td></tr><tr><td>Manjhim</td><td>Himalayan countries</td></tr><tr><td>Mahadharmarakshit</td><td>Maharashtra</td></tr><tr><td>Sona and Uttara</td><td>Golden land</td></tr><tr><td>Mazzantic</td><td>Kashmir and Gandhara</td></tr><tr><td>Mahadev</td><td>Mahishamandal (Mysore)</td></tr></tbody></table>
      <div class="cp-note remember">The <b>Third Buddhist Council</b> met at <b>Pataliputra</b> c. <b>250 BC</b> under Ashoka, presided by <b>Moggaliputta Tissa</b>.</div>
    `
  },
  29: {
    questext: "Ashoka sent his son Mahendra and daughter Sanghamitra to preach in:",
    options: ["Nepal", "Sri Lanka", "Golden land", "Kashmir"],
    correct: "2",
    exptext: "✅ They went to Sri Lanka. 📌 Siblings → island. ❌ Sona and Uttara went to the Golden land."
  },
  30: {
    questext: "The Third Buddhist Council at Pataliputra was presided over by:",
    options: ["Moggaliputta Tissa", "Upgupta", "Mahakassapa", "Vasumitra"],
    correct: "1",
    exptext: "✅ Moggaliputta Tissa presided, c. 250 BC under Ashoka. 📌 Third council = Ashoka + Tissa. ❌ Vasumitra presided in Kanishka's council."
  },
  31: {
    type: "concept", icon: "📿", accent: "#f97316", pauseTimer: true,
    title: "5.7 Ashoka's Dhamma",
    html: `
      <p class="cp-lead">Ashoka's Dhamma was a <u>moral code</u>, not a new religion; its definition is drawn from the <b>‘Rahulovadasutta’</b>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Source of definition</td><td>Rahulovadasutta</td></tr><tr><td>Envoys sent to</td><td>Syria, Egypt, Greece and Sri Lanka</td></tr><tr><td>Officers</td><td>Dhamma Mahamattas (Fifth edict)</td></tr></tbody></table>
      <div class="cp-note trap">Dhamma envoys went to the <b>West and Sri Lanka</b>; do not add China or Rome to the list.</div>
    `
  },
  32: {
    questext: "Ashoka's definition of Dhamma is drawn from which text?",
    options: ["Arthashastra", "Mudrarakshasa", "Divyavadana", "Rahulovadasutta"],
    correct: "4",
    exptext: "✅ Dhamma is defined from the Rahulovadasutta. 📌 Rahul = Dhamma. ❌ Arthashastra is Kautilya's statecraft."
  },
  33: {
    questext: "Ashoka sent Dhamma envoys to all of the following EXCEPT:",
    options: ["Egypt", "Syria", "China", "Sri Lanka"],
    correct: "3",
    exptext: "✅ China is not listed among the envoy destinations. 📌 Syria, Egypt, Greece, Sri Lanka. ❌ The other three received envoys."
  },
  34: {
    type: "concept", icon: "📜", accent: "#84cc16", pauseTimer: true,
    title: "5.8 Edicts of Ashoka",
    html: `
      <p class="cp-lead">Ashoka was the <b>first Indian ruler to address the public</b> through inscriptions; they were <u>royal orders</u>, the major edicts numbering <b>fourteen</b>.</p>
      <table><thead><tr><th>Edict</th><th>Subject</th></tr></thead><tbody><tr><td>Second</td><td>Chola, Pandya, Satiyaputra, Keralaputra (Chera)</td></tr><tr><td>Fifth</td><td>Appointment of Dhamma Mahamattas</td></tr><tr><td>Eighth</td><td>Emperor's pilgrimages; visit to Bodh Gaya</td></tr><tr><td>Twelfth</td><td>Respect for all religions; female Mahamattas</td></tr><tr><td>Thirteenth</td><td>Description of the Kalinga War</td></tr></tbody></table>
      <div class="cp-note trap">Only <b>Shahbazgarhi</b> and <b>Mansehra</b> are in <b>Kharosthi</b>; the rest are Brahmi. All are administrative in subject except <b>Rummindei</b>, the smallest, which is economic.</div>
      <div class="cp-note exam">Pillar inscriptions of <b>Kaushambi</b> and <b>Prayag</b> record donations of queen <b>Karuvaki</b> — the <b>‘Queen's inscription’</b>.</div>
      <div class="cp-note remember">The <b>Bhabru (Bairat)</b> edict shows faith in Buddha, Dhamma and Sangha; the <b>Rummindei</b> pillar cut Lumbini's tax to <b>1/8</b> (athabhagiya) and exempted bali.</div>
    `
  },
  35: {
    questext: "Which major rock edict mentions the Chola, Pandya, Satiyaputra and Keralaputra kingdoms?",
    options: ["Second", "Fifth", "Eighth", "Thirteenth"],
    correct: "1",
    exptext: "✅ The Second edict names the southern kingdoms. 📌 2 = South. ❌ 13 deals with Kalinga."
  },
  36: {
    questext: "Appointment of Dhamma Mahamattas is mentioned in which major rock edict?",
    options: ["Second", "Fifth", "Twelfth", "Thirteenth"],
    correct: "2",
    exptext: "✅ The Fifth edict records Dhamma Mahamattas. 📌 5 = Mahamattas. ❌ Twelfth is respect for all religions."
  },
  37: {
    questext: "Which Ashoka inscriptions are written in the Kharosthi script?",
    options: ["Kalsi and Sopara", "Girnar and Dhauli", "Shahbazgarhi and Mansehra", "Maski and Brahmagiri"],
    correct: "3",
    exptext: "✅ Only Shahbazgarhi and Mansehra, both in Pakistan, use Kharosthi. 📌 North-west = Kharosthi. ❌ The rest are Brahmi."
  },
  38: {
    questext: "Which is the smallest and the only economic inscription of Ashoka?",
    options: ["Maski", "Bhabru", "Sarnath", "Rummindei"],
    correct: "4",
    exptext: "✅ Rummindei records Lumbini's tax relief. 📌 Rummindei = Economic. ❌ Bhabru shows Ashoka's faith in Buddhism."
  },
  39: {
    questext: "The ‘Queen's inscription’ on the Kaushambi and Prayag pillars records donations of whom?",
    options: ["Karuvaki", "Subhadrangi", "Moor", "Helena"],
    correct: "1",
    exptext: "✅ Queen Karuvaki's donations. 📌 Karuvaki = Queen. ❌ Subhadrangi was Ashoka's mother."
  },
  40: {
    type: "concept", icon: "🏁", accent: "#06b6d4", pauseTimer: true,
    title: "5.9 Successors of Ashoka & End of the Dynasty",
    html: `
      <p class="cp-lead">Ashoka died c. <b>232 BC</b>; the dynasty ended when <b>Brihadratha</b> was killed by his own commander.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Ashoka's death</td><td>c. 232 BC</td></tr><tr><td>Son named in a pillar inscription</td><td>Teevar</td></tr><tr><td>Dasharatha</td><td>Named in the Puranas; confirmed archaeologically; ruled 8 years; title ‘Devanampriya’</td></tr><tr><td>Last Maurya ruler</td><td>Brihadratha (all Puranas)</td></tr><tr><td>Killer</td><td>Commander <b>Pushyamitra Shunga</b> at an army inspection, c. 185 BC</td></tr></tbody></table>
      <div class="cp-note trap"><b>Devanampriya</b> was not only Ashoka's title — Dasharatha also used it.</div>
    `
  },
  41: {
    questext: "Who was the last ruler of the Mauryan dynasty?",
    options: ["Brihadratha", "Dasharatha", "Teevar", "Bindusara"],
    correct: "1",
    exptext: "✅ All Puranas name Brihadratha as the last Maurya. 📌 Last = Brihad (big end). ❌ Dasharatha ruled eight years."
  },
  42: {
    questext: "Brihadratha was killed at an army inspection by:",
    options: ["Agnimitra", "Pushyamitra Shunga", "Kharavela", "Menander"],
    correct: "2",
    exptext: "✅ His commander Pushyamitra Shunga killed him, c. 185 BC. 📌 End of Mauryas = start of Shungas. ❌ Agnimitra was Pushyamitra's son."
  },
  43: {
    type: "concept", icon: "🏰", accent: "#a855f7", pauseTimer: true,
    title: "5.10 Administrative System",
    html: `
      <p class="cp-lead">Kautilya's <b>Saptang</b> theory treats the state like a <u>body of seven parts</u>; Chandragupta's rule followed it.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Mauryan_Empire/1.png" alt="Saptang: seven parts of the state as a body" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Part of state</th><th>Body organ</th></tr></thead><tbody><tr><td>Raja/King</td><td>Head</td></tr><tr><td>Amatya/Minister</td><td>Eye</td></tr><tr><td>Janapada</td><td>Thigh</td></tr><tr><td>Durg/Fort</td><td>Arm</td></tr><tr><td>Kosh/Treasury</td><td>Mouth</td></tr><tr><td>Danda/Army</td><td>Brain</td></tr><tr><td>Mitra/Friend</td><td>Ear</td></tr></tbody></table>
      <table><thead><tr><th>Province (Ashoka)</th><th>Capital</th></tr></thead><tbody><tr><td>Uttarapatha</td><td>Taxila</td></tr><tr><td>Avanti Rashtra</td><td>Ujjayini</td></tr><tr><td>Kalinga</td><td>Tosali</td></tr><tr><td>Dakshinapatha</td><td>Suvarnagiri</td></tr><tr><td>Prachi (Country)</td><td>Pataliputra</td></tr></tbody></table>
      <div class="cp-note trap"><b>Four</b> provinces under Chandragupta, <b>five</b> under Ashoka (the fifth was Kalinga, capital Tosali); governed by a Kumar or Aryaputra; <b>Gram</b> was the smallest unit.</div>
      <div class="cp-note exam">Chanakya's <b>Chaturbal</b> = infantry, cavalry, elephants, war chariots. Courts: the <b>Emperor</b> was the highest court, <b>Gram Sabha</b> the smallest; Dharmasthiti and Kantakshodhan; spies <b>Gunpurush</b> under <b>Sarpamahamatya</b>.</div>
    `
  },
  44: {
    questext: "In Kautilya's Saptang theory, the Janapada is compared to which part of the body?",
    options: ["Head", "Eye", "Thigh", "Ear"],
    correct: "3",
    exptext: "✅ Janapada is the thigh. 📌 King head, Amatya eye, Mitra ear. ❌ Eye is the Amatya (minister)."
  },
  45: {
    questext: "In the Saptang theory, Danda (army) is compared to the:",
    options: ["Mouth", "Arm", "Ear", "Brain"],
    correct: "4",
    exptext: "✅ Danda is the brain. 📌 Kosh is the mouth and Durg the arm. ❌ Ear is Mitra (friend)."
  },
  46: {
    questext: "Which was the capital of the Kalinga province in Ashoka's empire?",
    options: ["Tosali", "Ujjayini", "Suvarnagiri", "Taxila"],
    correct: "1",
    exptext: "✅ Tosali was Kalinga's capital, the fifth province. 📌 Four provinces earlier, five under Ashoka. ❌ Ujjayini served Avanti Rashtra."
  },
  47: {
    questext: "Which province–capital pair is correctly matched?",
    options: ["Uttarapatha – Ujjayini", "Dakshinapatha – Suvarnagiri", "Prachi – Taxila", "Avanti Rashtra – Tosali"],
    correct: "2",
    exptext: "✅ Dakshinapatha had Suvarnagiri. 📌 North Taxila, west Ujjayini, east Pataliputra. ❌ Taxila is Uttarapatha's capital."
  },
  48: {
    type: "concept", icon: "🧾", accent: "#e11d48", pauseTimer: true,
    title: "5.10a Tirthas (Mahamatras) & Departmental Heads",
    html: `
      <p class="cp-lead">High officials were <b>Tirthas</b> (Mahamatras); heads of departments were <b>Adhyakshas</b>.</p>
      <table><thead><tr><th>Tirtha</th><th>Concerned department</th></tr></thead><tbody><tr><td>Purohit</td><td>Chief religious authority</td></tr><tr><td>Samaharta</td><td>Head of Revenue Department</td></tr><tr><td>Sannidhata</td><td>Government Treasurer</td></tr><tr><td>Nayak</td><td>Chief officer of the army and city defence</td></tr><tr><td>Vyvharik</td><td>Chief judge of civil court</td></tr><tr><td>Nagrak</td><td>Chief officer of the city, city police chief</td></tr><tr><td>Aatvic</td><td>Head forest officer</td></tr></tbody></table>
      <table><thead><tr><th>Adhyaksha</th><th>Role</th></tr></thead><tbody><tr><td>Panvadhyaksha</td><td>President of Commerce</td></tr><tr><td>Suradhyaksha</td><td>Wine and liquor chairman</td></tr><tr><td>Lohadhyaksha</td><td>Head of Metals Department</td></tr><tr><td>Mudradhyaksha</td><td>Head of passport department</td></tr><tr><td>Pattanadhyaksha</td><td>Port Chief</td></tr><tr><td>Devatadhyaksha</td><td>President of a religious institution</td></tr></tbody></table>
      <div class="cp-note trap">Tirtha ends in a post of <b>state</b>; Adhyaksha ends in a <b>department</b> head — do not mix the two lists.</div>
    `
  },
  49: {
    questext: "Which Adhyaksha was in charge of wine and liquor?",
    options: ["Lohadhyaksha", "Panvadhyaksha", "Suradhyaksha", "Pattanadhyaksha"],
    correct: "3",
    exptext: "✅ Suradhyaksha headed liquor. 📌 Sura = wine. ❌ Lohadhyaksha headed metals."
  },
  50: {
    questext: "The chief judge of the civil court was known as:",
    options: ["Samaharta", "Sannidhata", "Nayak", "Vyvharik"],
    correct: "4",
    exptext: "✅ Vyvharik was the civil chief judge. 📌 Vyavahar = civil dealing. ❌ Samaharta handled revenue."
  },
  51: {
    type: "concept", icon: "👥", accent: "#10b981", pauseTimer: true,
    title: "5.11 Society & Religion",
    html: `
      <p class="cp-lead">Megasthenes described <b>seven castes</b>, with <b>farmers</b> the largest group.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Seven castes (Megasthenes)</td><td>Philosophers, farmers, herdsmen (Ahirs), artisans and craftsmen, soldiers, inspectors, council members</td></tr><tr><td>Widows</td><td>Remarriage allowed; independent widows called <b>Chhadvasini</b></td></tr><tr><td>Prostitutes</td><td><b>Rupajiva</b> under the Ganikaadhyaksha</td></tr><tr><td>Sati</td><td>No evidence in the Arthashastra</td></tr><tr><td>Religion</td><td>Vedic religion, Jainism, Ajivika prominent</td></tr><tr><td>Rulers' faiths</td><td>Chandragupta Jain, Bindusara Ajivika, Ashoka Buddhist</td></tr><tr><td>Worship</td><td>Snake and idol worship; idol-makers ‘Devatakaru’</td></tr></tbody></table>
      <div class="cp-note trap">Megasthenes' seven castes are <b>occupational classes</b>, not the four Varnas.</div>
    `
  },
  52: {
    questext: "How many castes did Megasthenes describe in Mauryan society?",
    options: ["Seven", "Five", "Four", "Nine"],
    correct: "1",
    exptext: "✅ Seven, with farmers the largest. 📌 Seven classes = Megasthenes. ❌ Four is the Varna system."
  },
  53: {
    questext: "Independent widows in Mauryan society were called:",
    options: ["Rupajiva", "Chhadvasini", "Agronomoi", "Devatakaru"],
    correct: "2",
    exptext: "✅ Independent widows were Chhadvasini. 📌 Rupajiva were prostitutes. ❌ Devatakaru were idol-makers."
  },
  54: {
    type: "concept", icon: "🌾", accent: "#eab308", pauseTimer: true,
    title: "5.12 Economy — Agriculture, Taxes & Trade",
    html: `
      <p class="cp-lead">An <b>agriculture-oriented</b> economy; the main income was <b>land tax</b>, mainly <b>1/6th</b> of the produce; currency was <b>‘Parn’</b>.</p>
      <table><thead><tr><th>Tax</th><th>Related topic</th></tr></thead><tbody><tr><td>Sita</td><td>Income from government land</td></tr><tr><td>Bhag</td><td>Share of produce</td></tr><tr><td>Preshy</td><td>Import tax (20%)</td></tr><tr><td>Nishkramy</td><td>Export tax</td></tr><tr><td>Prnay</td><td>Emergency tax</td></tr><tr><td>Bali</td><td>A type of revenue tax</td></tr><tr><td>Hirany</td><td>Taken in cash, not in grains</td></tr></tbody></table>
      <div class="cp-note exam">State land was under <b>Sitaadhyaksha</b>; <b>‘Adevamatrika’</b> was land giving good farming even without rain.</div>
      <div class="cp-note remember">External trade with Rome, Syria, Persia, Egypt; ports <b>Bhrigukachchh</b> (west) and <b>Tamralipt</b> (east); <b>Agronomoi</b> were road-construction officers.</div>
    `
  },
  55: {
    questext: "The main income of the Mauryan state was land tax, mainly what share of produce?",
    options: ["1/8th", "1/6th", "1/4th", "1/3rd"],
    correct: "2",
    exptext: "✅ Land tax was mainly 1/6th. 📌 Six = Sixth. ❌ 1/8th was Lumbini's reduced tax."
  },
  56: {
    questext: "Which Mauryan tax was levied on exports?",
    options: ["Preshy", "Prnay", "Bali", "Nishkramy"],
    correct: "4",
    exptext: "✅ Nishkramy was export tax. 📌 Nishkramy = exit. ❌ Preshy was import tax of 20%."
  },
  57: {
    questext: "‘Adevamatrika’ in the Mauryan economy referred to:",
    options: ["land giving good farming without rain", "royal forest land", "pasture land", "land used for ports"],
    correct: "1",
    exptext: "✅ It was land that yielded good crops without rain. 📌 A-deva = no rain-god. ❌ State land was under Sitaadhyaksha."
  },
  58: {
    type: "concept", icon: "🗿", accent: "#0ea5e9", pauseTimer: true,
    title: "5.13 Mauryan & Ashokan Art",
    html: `
      <p class="cp-lead">Sculpture was made by <b>pasting</b> (fingers or pinches) or <b>casting in a mould</b>; the <b>Sarnath lion capital</b> is the best Ashokan sculpture.</p>
      <table><thead><tr><th>Piece</th><th>Place</th></tr></thead><tbody><tr><td>7-foot Yaksha</td><td>Parkham (UP)</td></tr><tr><td>Digambar statue</td><td>Lohanipur, Patna</td></tr><tr><td>Elephant</td><td>Dhauli (Odisha)</td></tr><tr><td>Yakshini</td><td>Didarganj (Patna)</td></tr><tr><td>Lion capital over a creeper figure</td><td>Sarnath — our national symbol</td></tr></tbody></table>
      <div class="cp-note exam">Chandragupta's palace at Pataliputra was mostly <b>wood</b>; <b>Fa-Hien</b> saw it at the end of the 4th century CE.</div>
      <div class="cp-note remember"><b>Barabar Hills</b> — Ashoka's four caves for the <b>Ajivikas</b>: Lomesh Rishi, Karna Chopar, Sudama, Vishwa Jhopri.</div>
    `
  },
  59: {
    questext: "The Yakshini statue of Mauryan art was found at:",
    options: ["Parkham", "Lohanipur", "Dhauli", "Didarganj"],
    correct: "4",
    exptext: "✅ Didarganj, Patna. 📌 Parkham gave the Yaksha. ❌ Lohanipur gave a Digambar statue."
  },
  60: {
    questext: "The capital of which Ashokan pillar is India's national symbol?",
    options: ["Sarnath", "Dhauli", "Barabar", "Parkham"],
    correct: "1",
    exptext: "✅ The Sarnath lion capital with creeper figure below. 📌 Best Ashokan sculpture. ❌ Dhauli has an elephant, Parkham a Yaksha."
  },
  61: {
    questext: "The four Barabar Hills caves were donated by Ashoka to the:",
    options: ["Buddhist monks", "Jain munis", "Ajivika sect", "Shaiva sages"],
    correct: "3",
    exptext: "✅ They were for the Ajivikas: Lomesh Rishi, Karna Chopar, Sudama, Vishwa Jhopri. 📌 Barabar = Ajivika. ❌ Not Buddhist."
  },
  62: {
    type: "concept", icon: "📉", accent: "#d946ef", pauseTimer: true,
    title: "5.14 Fall of the Mauryan Empire",
    html: `
      <p class="cp-lead">Four scholars gave four different causes — <u>match each name to its view.</u></p>
      <table><thead><tr><th>Scholar</th><th>Cause of decline</th></tr></thead><tbody><tr><td>Hari Prasad Shastri</td><td>Religious — anti-Brahmin policy</td></tr><tr><td>Hemchandra Rai Chaudhury</td><td>Ashoka's non-violent, peace-loving policy</td></tr><tr><td>D. D. Kosambi</td><td>Economic crisis in the system</td></tr></tbody></table>
      <div class="cp-note exam">Dates — coronation <b>269 BC</b>, Kalinga War <b>261 BC</b>, Bodhgaya <b>10th year</b>, Lumbini <b>20th year</b>, death <b>232 BC</b>. Edicts: <b>2</b> south, <b>5</b> Mahamattas, <b>8</b> pilgrimages, <b>12</b> all religions, <b>13</b> Kalinga.</div>
    `
  },
  63: {
    questext: "Which scholar attributed the fall of the Mauryas to an anti-Brahmin policy?",
    options: ["D. D. Kosambi", "Hemchandra Rai Chaudhury", "Hari Prasad Shastri", "James Prinsep"],
    correct: "3",
    exptext: "✅ Hari Prasad Shastri held a religious, anti-Brahmin reaction. 📌 Shastri = Shastra/Brahmin. ❌ Kosambi stresses economy."
  },
  64: {
    questext: "Which historian blamed an economic crisis for the Mauryan decline?",
    options: ["Hari Prasad Shastri", "D. D. Kosambi", "Hemchandra Rai Chaudhury", "R. Shamasastry"],
    correct: "2",
    exptext: "✅ D. D. Kosambi emphasised economic crisis. 📌 Kosambi = Coins/Cash. ❌ Chaudhury blamed Ashoka's non-violence."
  },
  65: {
    questext: "Which view–scholar pair is correctly matched?",
    options: ["Kosambi – anti-Brahmin policy", "Shastri – economic crisis", "Chaudhury – religious revolt", "Chaudhury – peace-loving policy"],
    correct: "4",
    exptext: "✅ Chaudhury blamed Ashoka's non-violent, peace-loving policy. 📌 Three scholars, three causes. ❌ Shastri alone says anti-Brahmin."
  },
  66: {
    type: "concept", icon: "🗺️", accent: "#64748b", pauseTimer: true,
    title: "5.15 Ashoka's Inscriptions & Places of Discovery",
    html: `
      <p class="cp-lead">Learn the <b>site → place</b> pairs; examiners love <u>state-wise</u> questions.</p>
      <table><thead><tr><th>Major rock edict</th><th>Place of discovery</th></tr></thead><tbody><tr><td>Shahbazgarhi</td><td>Peshawar (Pakistan)</td></tr><tr><td>Mansehra</td><td>Hazara (Pakistan)</td></tr><tr><td>Kalsi</td><td>Dehradun (Uttarakhand)</td></tr><tr><td>Girnar</td><td>Junagadh (Gujarat)</td></tr><tr><td>Dhauli</td><td>Puri (Odisha)</td></tr><tr><td>Jaugarh</td><td>Ganjam (Odisha)</td></tr><tr><td>Sopara</td><td>Thane (Maharashtra)</td></tr><tr><td>Erragudi</td><td>Kurnool (Andhra Pradesh)</td></tr><tr><td>Maskey</td><td>Raichur (Karnataka)</td></tr><tr><td>Gurjara</td><td>Datia (Madhya Pradesh)</td></tr><tr><td>Sannatti</td><td>Karnataka</td></tr></tbody></table>
      <table><thead><tr><th>Minor edict</th><th>Location</th></tr></thead><tbody><tr><td>Brahmagiri</td><td>Mysore (Karnataka)</td></tr><tr><td>Bhabru</td><td>Barayat (Rajasthan)</td></tr><tr><td>Ahraura</td><td>Mirzapur (Uttar Pradesh)</td></tr><tr><td>Jatting Rameshwar</td><td>Karnataka</td></tr><tr><td>Sasaram</td><td>Bihar</td></tr><tr><td>Rajulmandgiri</td><td>Kurnool (Andhra Pradesh)</td></tr><tr><td>Govimath</td><td>Mysore (Karnataka)</td></tr><tr><td>Saromaro</td><td>Madhya Pradesh</td></tr><tr><td>Nittoor</td><td>Karnataka</td></tr><tr><td>Udegolam</td><td>Bellary (Karnataka)</td></tr></tbody></table>
      <div class="cp-note remember"><b>Sohgaura</b> copper plate (Gorakhpur) and <b>Mahasthan</b> (Bogra) inscription — Mauryan records on famine relief.</div>
    `
  },
  67: {
    questext: "Dhauli and Jaugarh Ashokan edicts are found in which state?",
    options: ["West Bengal", "Andhra Pradesh", "Odisha", "Karnataka"],
    correct: "3",
    exptext: "✅ Dhauli (Puri) and Jaugarh (Ganjam) are in Odisha. 📌 Odisha = Kalinga. ❌ Erragudi is in Andhra Pradesh."
  },
  68: {
    questext: "Which Ashokan rock edict was found in present-day Pakistan?",
    options: ["Shahbazgarhi", "Kalsi", "Girnar", "Sopara"],
    correct: "1",
    exptext: "✅ Shahbazgarhi (Peshawar) and Mansehra (Hazara) lie in Pakistan. 📌 Both are Kharosthi. ❌ Kalsi is in Uttarakhand."
  },
  69: {
    questext: "The Maski edict, naming Ashoka as Buddha Shakya, was found in which district?",
    options: ["Datia", "Kurnool", "Thane", "Raichur"],
    correct: "4",
    exptext: "✅ Maski lies in Raichur, Karnataka. 📌 Maskey = Raichur. ❌ Datia holds Gurjara; Kurnool holds Erragudi."
  },
  70: {
    questext: "The Sohgaura copper plate and Mahasthan inscription refer to:",
    options: ["the Kalinga War", "famine relief", "Dhamma Mahamattas", "temple donations"],
    correct: "2",
    exptext: "✅ Both are Mauryan records on famine relief. 📌 Sohgaura = Gorakhpur; Mahasthan = Bogra. ❌ Not about Kalinga."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Mauryan_Empire/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a carved stone Sarnath lion capital, a Dharma chakra wheel and a weathered rock edict slab" },
  "images/General_Awareness/Ancient_India/Mauryan_Empire/1.png": { t: "fig", about: "Schematic of the state as a body (Saptanga): Raja/King head, Amatya/Minister eye, Janapada thigh, Durg/Fort arm, Kosh/Treasury mouth, Danda/Army brain, Mitra/Friend ear." },
  "images/General_Awareness/Ancient_India/Mauryan_Empire/2.png": { t: "fig", about: "Timeline strip: 269 BC coronation, 261 BC Kalinga War, 10th year Bodhgaya, 20th year Lumbini, 232 BC death." }
});

/* CHANGE LOG
   - 5.10a: Purohit listed as chief religious authority and Samaharta as head of the revenue department (book calls both 'Prime Minister').
   - 5.14: 'D. D. Kaushambi' spelled D. D. Kosambi.
*/
