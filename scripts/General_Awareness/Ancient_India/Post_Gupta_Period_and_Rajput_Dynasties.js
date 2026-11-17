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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Post_Gupta_Period_and_Rajput_Dynasties · 20 concept pages (+ overview) · 51 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏰", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Post_Gupta_Period_and_Rajput_Dynasties/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "POST-GUPTA",
      line2: "HARSHA TO",
      line3: "RAJPUTS",
      badge: "FULL CLASS",
      ribbon: "RULERS • DATES • TRICKS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Post-Gupta Period & Rajput Dynasties | Harsha, Pala, Pratihara | Ancient India",
      altTitles: ["Harshavardhan to Prithviraj Chauhan in One Class", "Tripartite Struggle and Rajput Dynasties Made Easy"],
      description: "Post-Gupta Period and Rajput Dynasties are asked in almost every history paper. In this full class we learn the chapter slowly and clearly, from Harsha to the Rajputs, with easy tricks and practice questions.\n\n📌 IN THIS CLASS\n✅ Harshavardhan: sources, wars, religion, assemblies and administration\n✅ Nalanda University and Harsha-period literature\n✅ Gauda, Maitraka and the Tripartite Struggle\n✅ Pala, Sen and Kashmir dynasties\n✅ Rajput dynasties: Pratihara, Gahadwal, Chauhan, Chandela, Parmar, Solanki and more\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Post-Gupta Period\n00:00 Harshavardhan\n00:00 Tripartite Struggle\n00:00 Pala, Sen and Kashmir\n00:00 Rajput Dynasties\n\n👍 Like, share, subscribe.\n\n#SSCCGL #AncientIndia #History",
      tags: ["post gupta period", "rajput dynasties", "harshavardhan", "harsha vardhan history", "ancient india history", "ssc cgl history", "ancient history for ssc", "pala dynasty", "gurjara pratihara", "tripartite struggle", "nalanda university", "hiuen tsang", "chauhan dynasty", "prithviraj chauhan", "battle of tarain", "chandela dynasty", "parmar dynasty", "solanki dynasty", "sen dynasty bengal", "kashmir dynasties", "history tricks", "static gk", "general awareness", "competitive exams history", "railway exam history", "SSC CGL", "previous year questions"],
      hashtags: ["SSCCGL", "AncientIndia", "History"],
      thumbText: "POST-GUPTA + RAJPUTS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏰 New class is live: Post-Gupta Period and Rajput Dynasties. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Post-Gupta Period\n00:00 Harshavardhan\n00:00 Tripartite Struggle\n00:00 Pala, Sen and Kashmir\n00:00 Rajput Dynasties",
      playlist: "General Awareness — Ancient India Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Post-Gupta Period and the Rajput Dynasties</u> of ancient and early medieval India. Questions from this chapter come in almost every history paper, so we will learn the rulers, the places and the dates slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>20</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>51</b><span>Questions</span></div>
        <div class="cp-stat"><b>~91 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>The Post-Gupta Period</b><br>How the Gupta Empire broke up, and why small kingdoms and feudalism grew in its place.</li>
        <li><b>Pushyabhuti Dynasty and the Rise of Harsha</b><br>How the family of Thanesar became powerful, and how young Harsha became king.</li>
        <li><b>Harshavardhan</b><br>His sources, his wars, his religion, the two great assemblies and his government, explained one step at a time.</li>
        <li><b>Nalanda University and Harsha-Period Literature</b><br>The great university of ancient India and the writers of Harsha's age.</li>
        <li><b>Gauda, Maitraka and the Tripartite Struggle</b><br>Shashanka, Vallabhi and the long fight of three powers for Kannauj.</li>
        <li><b>Pala and Sen Dynasties of Bengal</b><br>The Buddhist Pala kings and the scholar kings of the Sen dynasty.</li>
        <li><b>Dynasties of Kashmir</b><br>The Karkota, Utpala and Lohar rulers, and the book Rajatarangini.</li>
        <li><b>Rajput Dynasties</b><br>Pratihara, Gahadwal, Chauhan, Chandela, Parmar, Solanki, Kalachuri, Eastern Ganga, Kakatiya and Hoysala.</li>
        <li><b>Practice</b><br>Questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Harsha, the Tripartite Struggle, the Pala kings and Prithviraj Chauhan are asked again and again in Staff Selection Commission, Railways and Union Public Service Commission papers, so these names and dates are worth learning well.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#22c55e", pauseTimer: true,
    title: "The Post-Gupta (Pre-Medieval) Period",
    html: `
      <p class="cp-lead">After the Gupta Empire broke up, India entered a new age. <u>Many small kingdoms rose where one great empire had stood.</u></p>
      <p class="cp-lead">The Gupta Empire disintegrated by the middle of the sixth century. Without a strong ruler at the centre, local governors and chiefs became free to rule on their own. Small republics and monarchical states also appeared in North India.</p>
      <table><thead><tr><th>Big change</th><th>What it means in simple words</th></tr></thead><tbody><tr><td>Decentralisation</td><td>Power moves away from one centre and is shared among many local rulers</td></tr><tr><td>Regionalism</td><td>People feel loyal to their own region more than to the whole country</td></tr><tr><td>Feudalism</td><td>Kings give land to chiefs, and the chiefs serve the king but also grow strong on their own</td></tr></tbody></table>
      <p class="cp-lead">In short, India was no longer ruled by one great power. Each region now had its own kings, and these kings often fought one another.</p>
      <div class="cp-note trap">This period is called the pre-medieval period. It is the bridge between ancient India and medieval India.</div>
      <div class="cp-note exam">Remember three keywords for this period: decentralisation, regionalism and feudalism.</div>
      <div class="cp-mnemonic">D, R, F — Decentralisation, Regionalism, Feudalism.</div>
    `
  },
  3: {
    questext: "Which one of the following was NOT a feature of the Post-Gupta period?",
    options: ["Decentralisation", "Regionalism", "Feudalism", "Strong rule of one empire over the whole of India"],
    correct: "4",
    exptext: "✅ The answer is strong rule of one empire, because the Post-Gupta period saw the empire break into many small states. 📌 Remember the three keywords: decentralisation, regionalism and feudalism. ❌ Feudalism is wrong because it was one of the main features of the period."
  },
  4: {
    questext: "By roughly which time had the Gupta Empire disintegrated?",
    options: ["The middle of the sixth century", "The end of the fourth century", "The start of the seventh century", "The middle of the eighth century"],
    correct: "1",
    exptext: "✅ The Gupta Empire had broken up by the middle of the sixth century. 📌 Think of the sixth century as the time when the empire ended. ❌ The start of the seventh century is wrong because by then Harsha was already rising in Thanesar."
  },
  5: {
    type: "concept", icon: "🌾", accent: "#f59e0b", pauseTimer: true,
    title: "Pushyabhuti (Vardhan) Dynasty of Thanesar",
    html: `
      <p class="cp-lead">The Pushyabhuti dynasty, also called the Vardhan dynasty, ruled from Thanesar. <u>It became the largest kingdom of North India in its time.</u></p>
      <p class="cp-lead">The founder was Pushyabhuti, and the family was related to the Vaishya caste. At first the rulers served the Guptas as feudatories, which means they ruled land on behalf of a higher king. After the Hun invasions they became independent.</p>
      <table><thead><tr><th>Ruler</th><th>Why he is important</th></tr></thead><tbody><tr><td>Pushyabhuti</td><td>Founder of the dynasty</td></tr><tr><td>Narvardhan and Adityavardhan</td><td>Early rulers of the family</td></tr><tr><td>Prabhakaravardhana</td><td>First important king, with Thanesar as his capital</td></tr><tr><td>Rajyavardhana</td><td>Elder son of Prabhakaravardhana, killed by Shashanka</td></tr><tr><td>Harshavardhana</td><td>Brother of Rajyavardhana and the greatest ruler of the dynasty</td></tr></tbody></table>
      <p class="cp-lead">Prabhakaravardhana took the titles Maharajadhiraja and Paramabhattaraka. His two sons were Rajyavardhana and Harshavardhana, and his daughter was Rajyashri.</p>
      <p class="cp-lead">Rajyashri married Grihavarman, the Maukhari ruler. Devagupta of Malwa joined Shashanka of Bengal, and together they killed Grihavarman. Rajyavardhana defeated the army of Devagupta but was then killed by treachery by Shashanka.</p>
      <p class="cp-lead">Rajyashri ran away to the forests, and Harsha rescued her just before she could burn herself to death. After that, Harsha ascended the throne in 606 at the age of 16.</p>
      <div class="cp-note trap">Devagupta and Shashanka were allies, but it was Shashanka who killed Rajyavardhana.</div>
      <div class="cp-note exam">Harsha became king in the year 606 at the age of 16.</div>
      <div class="cp-mnemonic">Pushyabhuti starts, Prabhakara builds, Rajya falls, Harsha rises.</div>
    `
  },
  6: {
    questext: "The Pushyabhuti dynasty is also known by which other name, and from which place did it rule?",
    options: ["Maukhari dynasty, from Kannauj", "Vardhan dynasty, from Thanesar", "Maitraka dynasty, from Vallabhi", "Pala dynasty, from Munger"],
    correct: "2",
    exptext: "✅ The Pushyabhuti dynasty is also called the Vardhan dynasty, and it ruled from Thanesar. 📌 Many king names end in vardhan, as in Prabhakaravardhana and Harshavardhana. ❌ Maukhari is wrong because the Maukharis ruled from Kannauj."
  },
  7: {
    questext: "Who killed Rajyavardhana by treachery?",
    options: ["Devagupta of Malwa", "Grihavarman of the Maukhari dynasty", "Shashanka of Bengal", "Pulakeshin II of the Chalukya dynasty"],
    correct: "3",
    exptext: "✅ Shashanka of Bengal killed Rajyavardhana by treachery, after Rajyavardhana had defeated the army of Devagupta. 📌 Link Shashanka with Bengal and treachery. ❌ Devagupta is wrong because he was the ally of Shashanka, and his army had already been defeated."
  },
  8: {
    type: "concept", icon: "📜", accent: "#ef4444", pauseTimer: true,
    title: "Harshavardhan (606–647) — Sources of Information",
    html: `
      <p class="cp-lead">We know about Harsha from books, plays, inscriptions and the diary of a Chinese traveller. <u>Learn which source gives which fact.</u></p>
      <table><thead><tr><th>Source</th><th>What it is</th></tr></thead><tbody><tr><td>Harshacharita</td><td>Life story of Harsha, written by his court poet Banabhatta</td></tr><tr><td>Travel account of Hiuen Tsang</td><td>Written by a Chinese pilgrim who visited in the seventh century</td></tr><tr><td>Ratnavali, Nagananda and Priyadarsika</td><td>Dramas written by Harsha himself</td></tr><tr><td>Madhuban Plate and Sonepat inscriptions</td><td>Help us fix the dates of his reign</td></tr><tr><td>Banskhera inscription</td><td>Carries the signature of Harsha himself</td></tr></tbody></table>
      <p class="cp-lead">Hiuen Tsang left China in 629 and came to India overland. He stayed for a long time and returned to China in 645. He came to study at Nalanda University and to collect Buddhist scriptures.</p>
      <p class="cp-lead">His book is called Si-yu-ki, and he is known by the titles 'Prince of Travellers' and 'Present Shakyamuni'.</p>
      <p class="cp-lead">He wrote that Indian society had four varnas, and that Brahmins were placed the highest. He also wrote that Shudras were farmers, that Indians put black marks on their teeth, and that they wore earrings.</p>
      <div class="cp-note trap">Do not mix the writers. Banabhatta wrote the Harshacharita, Harsha wrote the plays, and Hiuen Tsang wrote the Si-yu-ki.</div>
      <div class="cp-note exam">The Harshacharita is the first historical biography, called a charita, in Sanskrit.</div>
    `
  },
  9: {
    questext: "Which one of the following is NOT a source for the reign of Harsha?",
    options: ["Harshacharita", "Si-yu-ki", "Banskhera inscription", "Rajatarangini"],
    correct: "4",
    exptext: "✅ The Rajatarangini is not a source for Harsha, because it is a history of Kashmir written by Kalhana. 📌 Harsha's sources are the Harshacharita, the Si-yu-ki and his own inscriptions. ❌ Si-yu-ki is wrong because it is the travel account of Hiuen Tsang, who met Harsha."
  },
  10: {
    questext: "Consider the statements. Statement 1: Hiuen Tsang left China in 629 and returned to China in 645. Statement 2: The Banskhera inscription carries the signature of Harsha himself. Which is correct?",
    options: ["Only statement 1 is correct", "Only statement 2 is correct", "Both statements are correct", "Neither statement is correct"],
    correct: "3",
    exptext: "✅ Both are correct, as Hiuen Tsang left in 629 and returned in 645, and the Banskhera inscription has Harsha's own signature. 📌 Think of 629 for going and 645 for returning. ❌ Choosing only one statement is wrong because both match the facts."
  },
  11: {
    type: "concept", icon: "⚔️", accent: "#8b5cf6", pauseTimer: true,
    title: "Harshavardhan — Campaigns and Empire",
    html: `
      <p class="cp-lead">After becoming king, Harsha first drove Shashanka out of Kannauj. <u>He then made Kannauj his new capital in place of Thanesar.</u></p>
      <p class="cp-lead">Later Kannauj was also called Mahodaya Shri. Harsha went on to take Eastern Punjab (Haryana), Bengal, Bihar and Odisha. His empire stretched from Punjab to Bengal and Odisha, north of the Narmada river.</p>
      <table><thead><tr><th>Event</th><th>Details</th></tr></thead><tbody><tr><td>Capital shifted</td><td>From Thanesar to Kannauj</td></tr><tr><td>Defeat in the year 630</td><td>Harsha was defeated by the Chalukya king Pulakeshin II on the banks of the Narmada</td></tr><tr><td>Aihole inscription</td><td>Records this defeat, and Pulakeshin took the title Paramesvara</td></tr><tr><td>Southern boundary</td><td>The Narmada river became the limit of Harsha's empire</td></tr></tbody></table>
      <p class="cp-lead">Harsha made peace with Dhruvasena II, the ruler of Vallabhi, by marrying his daughter to him.</p>
      <p class="cp-lead">He took many grand titles, such as Parambhattaraka, Maharajadhiraja, Saklottapatheshwar, Chakravati, Sarvabhoum and Parameshwar.</p>
      <div class="cp-note trap">Harsha ruled almost all of North India, but he could not go south of the Narmada. The one who stopped him was Pulakeshin II.</div>
      <div class="cp-note exam">Remember the year 630, Pulakeshin II, the Narmada and the Aihole inscription together.</div>
      <div class="cp-mnemonic">Narmada was the wall, and the Aihole stone tells the tale.</div>
    `
  },
  12: {
    questext: "Which ruler defeated Harsha in the year 630 on the banks of the Narmada?",
    options: ["Dhruvasena II", "Pulakeshin II", "Dharmapala", "Nagabhatta I"],
    correct: "2",
    exptext: "✅ Pulakeshin II of the Chalukya dynasty defeated Harsha in 630 and took the title Paramesvara. 📌 Remember Narmada, 630 and Pulakeshin II together. ❌ Dhruvasena II is wrong because he made peace with Harsha, who married his daughter to him."
  },
  13: {
    questext: "Which inscription records the defeat of Harsha by Pulakeshin II?",
    options: ["Banskhera inscription", "Madhuban Plate", "Gwalior Prashasti", "Aihole inscription"],
    correct: "4",
    exptext: "✅ The Aihole inscription records this defeat. 📌 Aihole goes with Pulakeshin II. ❌ The Gwalior Prashasti is wrong because it praises the Pratihara king Nagabhatta I, not Pulakeshin II."
  },
  14: {
    questext: "Which statement about Harsha's capital is correct?",
    options: ["He shifted it from Kannauj to Thanesar", "He shifted it from Thanesar to Kannauj, which was later called Mahodaya Shri", "He shifted it from Vallabhi to Kannauj", "He kept Thanesar as the capital all his life"],
    correct: "2",
    exptext: "✅ Harsha shifted his capital from Thanesar to Kannauj, which was later called Mahodaya Shri. 📌 Thanesar was the first capital, and Kannauj was the second. ❌ The first option is wrong because it reverses the direction of the move."
  },
  15: {
    type: "concept", icon: "🪔", accent: "#14b8a6", pauseTimer: true,
    title: "Harshavardhan — Religion and the Two Great Assemblies",
    html: `
      <p class="cp-lead">Harsha respected many faiths. <u>His family followed Shiva, the Sun and Buddha, and Harsha himself was devoted to all three.</u></p>
      <p class="cp-lead">His ancestors were Shaivas, his father was a Sun devotee, and his brother was a Buddhist. Harsha began as a Shaivite, then became a Hinayana Buddhist, and at last became a Mahayana Buddhist after Hiuen Tsang convinced him.</p>
      <p class="cp-lead">He banned animal slaughter and built stupas and rest houses for travellers. He also held religious gatherings for all faiths every five years, and he is credited with starting the Kumbh Mela.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Post_Gupta_Period_and_Rajput_Dynasties/1.png" alt="Timeline of Harsha from 606 to 647" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Gathering</th><th>Year</th><th>Place</th><th>Length</th><th>Main details</th></tr></thead><tbody><tr><td>Kannauj Assembly</td><td>643</td><td>Kannauj, on the Ganga</td><td>23 continuous days</td><td>Held to highlight the teachings of Buddha and to honour Hiuen Tsang; 20 kings, 1000 Nalanda scholars, 3000 Hinayanists and Mahayanists and 3000 Brahmins and Jains came</td></tr><tr><td>Prayag Conference</td><td>645</td><td>Prayag, also called Allahabad, where the Ganga and the Yamuna meet</td><td>75 days</td><td>Kings of 20 countries came, and Harsha gave away his entire wealth, clothes and jewels</td></tr></tbody></table>
      <p class="cp-lead">Hiuen Tsang left for China in 645, and Harsha died in 647.</p>
      <div class="cp-note trap">Do not swap the numbers. The Kannauj Assembly lasted 23 days, and the Prayag Conference lasted 75 days.</div>
      <div class="cp-note exam">Remember the years 643, 645 and 647 for the Kannauj Assembly, the Prayag Conference and the death of Harsha.</div>
      <div class="cp-mnemonic">Kannauj is 23, Prayag is 75.</div>
    `
  },
  16: {
    questext: "For how many continuous days did the Kannauj Assembly last?",
    options: ["75 days", "12 days", "30 days", "23 days"],
    correct: "4",
    exptext: "✅ The Kannauj Assembly lasted 23 continuous days. 📌 Remember Kannauj 23 and Prayag 75. ❌ 75 days is wrong because that is the length of the Prayag Conference."
  },
  17: {
    questext: "Arrange the events in the correct order. A. Harsha ascended the throne. B. Kannauj Assembly. C. Prayag Conference. D. Death of Harsha.",
    options: ["A, C, B, D", "A, B, D, C", "A, B, C, D", "B, A, C, D"],
    correct: "3",
    exptext: "✅ The years are 606, 643, 645 and 647, so the order is A, B, C, D. 📌 The years go up in the same order as the events. ❌ Option 2 is wrong because Harsha died after the Prayag Conference, not before it."
  },
  18: {
    questext: "Which statement about the Prayag Conference is correct?",
    options: ["It was held at Kannauj and lasted 23 days", "It was held where the Ganga and the Yamuna meet, lasted 75 days, and Harsha gave away his wealth", "It was held in 647 at Nalanda", "It was held only for Buddhist monks"],
    correct: "2",
    exptext: "✅ The Prayag Conference was held where the Ganga and the Yamuna meet, it lasted 75 days, and Harsha gave away his entire wealth. 📌 Think of Prayag as the place of giving. ❌ The first option is wrong because it describes the Kannauj Assembly."
  },
  19: {
    questext: "Who convinced Harsha to become a Mahayana Buddhist?",
    options: ["Banabhatta", "Silabhadra", "Hiuen Tsang", "Dingnaga"],
    correct: "3",
    exptext: "✅ Hiuen Tsang converted Harsha to Mahayana Buddhism. 📌 The Chinese pilgrim brought the Mahayana path to the king. ❌ Silabhadra is wrong because he was a professor of Nalanda, not the person who converted Harsha."
  },
  20: {
    type: "concept", icon: "🏯", accent: "#ec4899", pauseTimer: true,
    title: "Harshavardhan — Administration",
    html: `
      <p class="cp-lead">Harsha ruled through a clear chain of units. <u>Each bigger unit was divided into smaller ones, all the way down to the village.</u></p>
      <table><thead><tr><th>Level</th><th>Name</th></tr></thead><tbody><tr><td>Province</td><td>Bhukti</td></tr><tr><td>District</td><td>Visaya</td></tr><tr><td>Tehsil</td><td>Pathaka</td></tr><tr><td>Village</td><td>Village</td></tr></tbody></table>
      <p class="cp-lead">The king took one sixth of the produce as revenue. There were different kinds of dues: Udranga was land revenue, Uparika was an additional tax, and Hiranya was a tax paid in gold.</p>
      <p class="cp-lead">The army was called Chaturangini because it had four parts, which were infantry, cavalry, chariots and elephants. Singhanad was the overall commander, Kuntal led the cavalry, and Skandagupta led the elephant corps.</p>
      <p class="cp-lead">The government records were called Nilopitu, and an irrigation device called Tulayanta was used in farming.</p>
      <p class="cp-lead">Harsha sent the first diplomatic mission to China, and this started diplomatic ties between India and China.</p>
      <p class="cp-lead">Women were not very free. The custom of swayamvara, in which a bride chose her own husband, had declined. Widows could not remarry, dowry was common, and sati was widely practised.</p>
      <div class="cp-note trap">Uparika has two meanings. It was a tax, and it was also the name of a provincial governor.</div>
      <div class="cp-note exam">Remember that revenue was one sixth, and that the first diplomatic mission to China was sent by Harsha.</div>
    `
  },
  21: {
    questext: "Which is the correct order of administrative units in Harsha's empire, from the biggest to the smallest?",
    options: ["Bhukti, Visaya, Pathaka, Village", "Visaya, Bhukti, Pathaka, Village", "Pathaka, Visaya, Bhukti, Village", "Bhukti, Pathaka, Visaya, Village"],
    correct: "1",
    exptext: "✅ The province was the Bhukti, then came the district called Visaya, then the tehsil called Pathaka, and then the village. 📌 Remember B, V, P, V. ❌ Option 4 is wrong because it puts the tehsil above the district."
  },
  22: {
    questext: "Which tax of Harsha's time was the land revenue?",
    options: ["Uparika", "Hiranya", "Udranga", "Bhukti"],
    correct: "3",
    exptext: "✅ Udranga was the land revenue. 📌 Uparika was an extra tax, and Hiranya was paid in gold. ❌ Uparika is wrong because it means an additional tax, and it was also the name of a governor."
  },
  23: {
    type: "concept", icon: "🧾", accent: "#3b82f6", pauseTimer: true,
    title: "Officials of Harsha's Administration",
    html: `
      <p class="cp-lead">Harsha had many officers, and each officer had a clear job. <u>Learn each pair of official and role.</u></p>
      <table><thead><tr><th>Official</th><th>Role</th></tr></thead><tbody><tr><td>Sachiv or Amartya</td><td>Council of Ministers</td></tr><tr><td>Bhandi</td><td>Chief Sachiv of Harsha</td></tr><tr><td>Avanti</td><td>Sandhi Vigrahika, the Foreign Minister</td></tr><tr><td>Mahasandhivigrahakrita</td><td>Minister of War and Peace</td></tr><tr><td>Uparika</td><td>Governor of a province</td></tr><tr><td>Visayapati</td><td>Head of a district, which was called Visaya</td></tr><tr><td>Gramika</td><td>Head of a village</td></tr><tr><td>Baladhikrita</td><td>Army commander, also called Senapati</td></tr><tr><td>Bhogika or Bhogapati</td><td>Revenue collector</td></tr><tr><td>Mahapratihara</td><td>Chief Warden</td></tr><tr><td>Mimansak</td><td>Chief Justice</td></tr><tr><td>Akshapatralika and Dukula</td><td>Keepers of records</td></tr></tbody></table>
      <p class="cp-lead">Notice that many names show the job. For example, Gramika comes from gram, which means village, and Visayapati means the lord of the Visaya.</p>
      <div class="cp-note trap">Do not mix up the Mahapratihara and the Mimansak. The Mahapratihara was the Chief Warden, and the Mimansak was the Chief Justice.</div>
      <div class="cp-note exam">Remember that Bhandi was the Chief Sachiv and Avanti was the Foreign Minister.</div>
    `
  },
  24: {
    questext: "Which official served as the Sandhi Vigrahika, that is, the Foreign Minister, under Harsha?",
    options: ["Bhandi", "Avanti", "Mahapratihara", "Mimansak"],
    correct: "2",
    exptext: "✅ Avanti was the Sandhi Vigrahika, the Foreign Minister. 📌 Sandhi means a peace treaty, so he handled matters with other kingdoms. ❌ Bhandi is wrong because he was the Chief Sachiv of Harsha."
  },
  25: {
    questext: "Which one of the following pairs is NOT correctly matched?",
    options: ["Bhandi and Chief Sachiv", "Mimansak and Chief Justice", "Visayapati and Head of a district", "Gramika and Chief Warden"],
    correct: "4",
    exptext: "✅ Gramika was the head of a village, while the Chief Warden was the Mahapratihara. 📌 Gram means village. ❌ Visayapati and Head of a district is a correct pair, so it cannot be the answer."
  },
  26: {
    type: "concept", icon: "🎓", accent: "#f97316", pauseTimer: true,
    title: "Nalanda University",
    html: `
      <p class="cp-lead">Nalanda was the most famous university of ancient India. <u>Its name means 'giver of knowledge'.</u></p>
      <p class="cp-lead">It was founded by Kumaragupta I in the Gupta period, and Harsha supported it later. It was a Mahayana Buddhist institution, but it also taught the Vedas, Hinayana, Sankhya and Yoga.</p>
      <table><thead><tr><th>Fact</th><th>Details</th></tr></thead><tbody><tr><td>Famous professors, called Panditas</td><td>Dingnaga, Dharmapala, Sthiramati and Silabhadra</td></tr><tr><td>Library</td><td>Dharmaganja</td></tr><tr><td>Students</td><td>Came from China, Mongolia, Korea and Tibet</td></tr><tr><td>Entry</td><td>There was a difficult entrance examination</td></tr><tr><td>Number of students</td><td>I-Tsing records about 3,000 enrolled students</td></tr><tr><td>End</td><td>Sacked by Bakhtiyar Khilji about the year 1200</td></tr><tr><td>Recognition</td><td>Became a World Heritage Site of the United Nations Educational, Scientific and Cultural Organization (UNESCO) in 2016</td></tr></tbody></table>
      <div class="cp-note trap">Nalanda was founded by Kumaragupta I, while Vikramshila was founded by the Pala king Dharmapala. The professor Dharmapala is a different person from the Pala king Dharmapala.</div>
      <div class="cp-note exam">Remember Kumaragupta I, the meaning 'giver of knowledge', Bakhtiyar Khilji and the year 2016.</div>
    `
  },
  27: {
    questext: "Which Gupta ruler founded Nalanda University?",
    options: ["Samudragupta", "Chandragupta II", "Kumaragupta I", "Skandagupta"],
    correct: "3",
    exptext: "✅ Kumaragupta I founded Nalanda, and Harsha supported it later. 📌 Link Kumaragupta with the 'giver of knowledge'. ❌ Chandragupta II is wrong because he is not linked with the founding of Nalanda."
  },
  28: {
    questext: "Which one of the following statements about Nalanda is NOT correct?",
    options: ["Its name means giver of knowledge", "It was a Mahayana institution", "It was sacked by Bakhtiyar Khilji about the year 1200", "It was founded by the Pala king Dharmapala"],
    correct: "4",
    exptext: "✅ Nalanda was founded by Kumaragupta I, not by Dharmapala. 📌 Dharmapala founded Vikramshila. ❌ Option 3 is wrong because Bakhtiyar Khilji really did sack Nalanda."
  },
  29: {
    questext: "Which Nalanda professor shares his name with a famous Pala king?",
    options: ["Dharmapala", "Silabhadra", "Dingnaga", "Sthiramati"],
    correct: "1",
    exptext: "✅ Dharmapala was a professor of Nalanda, and the Pala king of the same name was a different person. 📌 Same name, different people. ❌ Silabhadra is wrong because he was a professor, but no Pala king in this chapter has that name."
  },
  30: {
    type: "concept", icon: "✍️", accent: "#84cc16", pauseTimer: true,
    title: "Harsha-Period Literature",
    html: `
      <p class="cp-lead">Harsha's age was rich in Sanskrit writing. <u>Harsha himself was a writer, and his court had famous poets.</u></p>
      <table><thead><tr><th>Writer</th><th>Famous work</th></tr></thead><tbody><tr><td>Banabhatta</td><td>Harshacharita and Kadambari</td></tr><tr><td>Mayur</td><td>Suryashatak</td></tr><tr><td>Harsha</td><td>The plays Priyadarshika, Ratnavali and Nagananda (Nagananda is also credited to the poet Dhavaka)</td></tr><tr><td>Others</td><td>Jayasena, Matanga Divakara and Bhartrihari</td></tr></tbody></table>
      <p class="cp-lead">Bhartrihari was a poet, a philosopher and a grammarian, all in one person.</p>
      <div class="cp-note trap">Kadambari is a prose work by Banabhatta, not a play by Harsha.</div>
      <div class="cp-note exam">Remember Banabhatta with the Harshacharita, Mayur with the Suryashatak, and Harsha with three plays.</div>
      <div class="cp-mnemonic">Bana wrote the biography and the romance, Mayur praised the Sun, and Harsha wrote plays.</div>
    `
  },
  31: {
    questext: "Who wrote the Suryashatak?",
    options: ["Banabhatta", "Mayur", "Dhavaka", "Bhartrihari"],
    correct: "2",
    exptext: "✅ Mayur wrote the Suryashatak, a hundred verses in praise of the Sun. 📌 Mayur praised the Sun. ❌ Banabhatta is wrong because he wrote the Harshacharita and the Kadambari."
  },
  32: {
    questext: "Which one of these is NOT a play written by Harsha?",
    options: ["Ratnavali", "Priyadarshika", "Kadambari", "Nagananda"],
    correct: "3",
    exptext: "✅ Kadambari was written by Banabhatta, so it is not a play of Harsha. 📌 Harsha wrote three plays: Ratnavali, Priyadarshika and Nagananda. ❌ Nagananda is wrong because it is a play of Harsha, although some also credit it to Dhavaka."
  },
  33: {
    type: "concept", icon: "🌳", accent: "#06b6d4", pauseTimer: true,
    title: "Gauda, Maitraka and the Tripartite Struggle — The Rival Dynasties",
    html: `
      <p class="cp-lead">Besides the Pushyabhuti dynasty, several other dynasties ruled at the same time. <u>Each one had its own place, its own rulers and its own claim to fame.</u></p>
      <p class="cp-lead">Shashanka (about 602 to 620) was the most powerful Gauda king and a contemporary of Harsha. He wanted to rule all of India, and he killed Harsha's brother Rajyavardhana.</p>
      <p class="cp-lead">Shashanka was a Shaiva and an enemy of Buddhism. He cut down the Bodhi tree and set its roots on fire. Harsha defeated him, and the dynasty declined after him.</p>
      <p class="cp-lead">The Maitraka dynasty was founded by Bhattaraka, a former Gupta feudatory, who declared himself the ruler of Gujarat and Saurashtra. It was most influential under Shiladitya I, and it was defeated by the Deccan Chalukyas and Harsha.</p>
      <table><thead><tr><th>Dynasty</th><th>Place</th><th>Major rulers</th><th>Key achievement</th></tr></thead><tbody><tr><td>Maitraka</td><td>Vallabhi</td><td>Bhattaraka, Dharsen and Dhruvasen</td><td>Vallabhi was a famous Buddhist and educational centre</td></tr><tr><td>Maukhari</td><td>Kannauj</td><td>Harivarma and Ishanvarman</td><td>Defeated the Huns and saved Eastern India</td></tr><tr><td>Pushyabhuti (Vardhan)</td><td>Thanesar</td><td>Pushyabhuti, Prabhakaravardhana, Rajyavardhana and Harshavardhana</td><td>Largest North Indian kingdom</td></tr><tr><td>Later Guptas</td><td>Magadha</td><td>Mahasena Gupta and Devagupta</td><td>Ruled in Magadha</td></tr><tr><td>Chandra (Gauda)</td><td>Bengal</td><td>Shashanka</td><td>Infamous for cutting the Bodhi tree</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse the Later Guptas, who ruled Magadha, with the great Gupta emperors. Also, Vallabhi belongs to the Maitrakas and Kannauj belongs to the Maukharis.</div>
      <div class="cp-note exam">Remember that Shashanka cut the Bodhi tree, and that Vallabhi was a Buddhist and educational centre.</div>
    `
  },
  34: {
    questext: "Which ruler, a Shaiva and an enemy of Buddhism, cut down the Bodhi tree and set its roots on fire?",
    options: ["Harsha", "Shashanka", "Shiladitya I", "Dharmapala"],
    correct: "2",
    exptext: "✅ Shashanka of the Gauda dynasty cut the Bodhi tree and burned its roots. 📌 Shashanka is the Bodhi tree villain. ❌ Harsha is wrong because Harsha defeated Shashanka and supported Buddhism."
  },
  35: {
    questext: "Which dynasty ruled from Vallabhi, and under which ruler was it most influential?",
    options: ["Maitraka, under Shiladitya I", "Maukhari, under Harivarma", "Later Guptas, under Mahasena Gupta", "Gauda, under Shashanka"],
    correct: "1",
    exptext: "✅ The Maitrakas ruled from Vallabhi and were most influential under Shiladitya I. 📌 Maitraka goes with Vallabhi. ❌ Maukhari is wrong because the Maukharis ruled from Kannauj."
  },
  36: {
    type: "concept", icon: "🔱", accent: "#a855f7", pauseTimer: true,
    title: "The Tripartite Struggle",
    html: `
      <p class="cp-lead">'Tripartite' means 'three-sided'. <u>After Harsha, three powers fought for a long time to control Kannauj.</u></p>
      <p class="cp-lead">In the eighth century, the Pala, Pratihara and Rashtrakuta dynasties competed for Kannauj. Kannauj had been the capital of Harsha, so whoever ruled it was seen as the greatest power in North India. The struggle lasted about 200 years.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Post_Gupta_Period_and_Rajput_Dynasties/2.png" alt="Pala, Pratihara and Rashtrakuta around Kannauj" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Power</th><th>Direction</th><th>Early ruler in the struggle</th></tr></thead><tbody><tr><td>Pala</td><td>East, in Bengal and Bihar</td><td>Dharmapala</td></tr><tr><td>Pratihara</td><td>West</td><td>Vatsaraja</td></tr><tr><td>Rashtrakuta</td><td>South, in the Deccan</td><td>Dhruva</td></tr></tbody></table>
      <p class="cp-lead">The struggle was started by the Pala king Dharmapala. In the first phase, Dharmapala of the Pala dynasty fought Vatsaraja of the Pratihara dynasty and Dhruva of the Rashtrakuta dynasty. In the end, the Gurjar Pratiharas captured Kannauj.</p>
      <p class="cp-lead">Around the year 851, the Arab merchant Sulaiman named the three rivals. He called the Pratihara kingdom 'Juzr', the Pala kingdom 'Ruhmi', and the Rashtrakuta king 'Balhara'.</p>
      <div class="cp-note trap">The Palas and the Rashtrakutas did not win Kannauj in the end. The Gurjar Pratiharas won it.</div>
      <div class="cp-note exam">Remember the three powers, Pala, Pratihara and Rashtrakuta, and the final winner, the Pratiharas.</div>
    `
  },
  37: {
    questext: "Which three powers fought in the Tripartite Struggle?",
    options: ["Pala, Pratihara and Rashtrakuta", "Pala, Sen and Pratihara", "Chalukya, Pratihara and Rashtrakuta", "Pala, Maitraka and Rashtrakuta"],
    correct: "1",
    exptext: "✅ The Palas, the Pratiharas and the Rashtrakutas fought for Kannauj. 📌 Remember the order P, P, R. ❌ Option 3 is wrong because it leaves out the Palas."
  },
  38: {
    questext: "Who captured Kannauj at the end of the Tripartite Struggle?",
    options: ["Palas", "Rashtrakutas", "Gurjar Pratiharas", "Gahadwalas"],
    correct: "3",
    exptext: "✅ The Gurjar Pratiharas captured Kannauj. 📌 The Pratiharas won while the other two lost. ❌ The Gahadwalas are wrong because they took Kannauj much later, after the Pratiharas."
  },
  39: {
    questext: "Which name did the Arab merchant Sulaiman give to the Pala kingdom?",
    options: ["Juzr", "Ruhmi", "Balhara", "Kannauj"],
    correct: "2",
    exptext: "✅ Sulaiman called the Pala kingdom Ruhmi. 📌 Juzr is the Pratihara kingdom, and Balhara is the Rashtrakuta king. ❌ Juzr is wrong because it was the name for the Pratihara kingdom."
  },
  40: {
    type: "concept", icon: "🪷", accent: "#e11d48", pauseTimer: true,
    title: "Pala Dynasty of Bengal",
    html: `
      <p class="cp-lead">The Palas ruled Bengal and Bihar, and for a time Kannauj too. <u>They were Buddhist rulers who supported learning and art.</u></p>
      <p class="cp-lead">Their power spread from Bengal to Delhi, and from Jalandhar to the Vindhya hills.</p>
      <table><thead><tr><th>Ruler</th><th>Period</th><th>What to remember</th></tr></thead><tbody><tr><td>Gopal</td><td>750 to 770</td><td>Founded the dynasty in 750 and built the Odantapuri monastery</td></tr><tr><td>Dharmapala</td><td>770 to 810</td><td>Fought in the Kannauj struggle, defeated Indrayudha and made Chakrayudha a puppet king; took the titles Uttarpath Swami and Param Saugat; founded Vikramshila University at Bhagalpur and the Sompur Mahavihara in Bangladesh</td></tr><tr><td>Devapala</td><td>810 to 850</td><td>Son of Dharmapala, with Munger as his capital; the Arab traveller Suleiman visited in his reign</td></tr><tr><td>Mahipala I</td><td>978 to 1038</td><td>Called the second founder because he revived Pala power; Rajendra Chola invaded Bengal in his time, and he sent the monk Atisha to Tibet</td></tr><tr><td>Rampal</td><td>1075 to 1120</td><td>The last powerful ruler, and the Kaivarta rebellion happened in his reign</td></tr></tbody></table>
      <p class="cp-lead">The Kaivarta rebellion is recorded in the Ramcharit by Sandhyakar Nandi. After Rampal, Kumarpal, Gopal III and Madanpal ruled for about 30 more years.</p>
      <p class="cp-lead">The scholars Santarakshita, Kamalasheel and Dipankar visited Tibet. The Palas were experts in bronze sculpture, and their main centres of art were Nalanda, Bodhgaya and Kurkihar.</p>
      <div class="cp-note trap">Odantapuri was built by Gopal, while Vikramshila and Sompur were founded by Dharmapala.</div>
      <div class="cp-note exam">Remember 750 for Gopal, Mahipala I as the second founder, and Rampal for the Kaivarta rebellion.</div>
    `
  },
  41: {
    questext: "In which year did Gopal found the Pala dynasty?",
    options: ["750", "770", "810", "850"],
    correct: "1",
    exptext: "✅ Gopal founded the Pala dynasty in 750 and built the Odantapuri monastery. 📌 Gopal is 750, Dharmapala is 770, and Devapala is 810. ❌ 770 is wrong because that is the year when Dharmapala began his rule."
  },
  42: {
    questext: "Who founded Vikramshila University?",
    options: ["Gopal", "Devapala", "Mahipala I", "Dharmapala"],
    correct: "4",
    exptext: "✅ Dharmapala founded Vikramshila University at Bhagalpur and also the Sompur Mahavihara. 📌 Dharmapala built the big learning centres. ❌ Gopal is wrong because he built the Odantapuri monastery."
  },
  43: {
    questext: "In whose reign did the Kaivarta rebellion take place, as recorded in the Ramcharit?",
    options: ["Rampal", "Mahipala I", "Madanpal", "Devapala"],
    correct: "1",
    exptext: "✅ The Kaivarta rebellion took place in the reign of Rampal, and Sandhyakar Nandi recorded it in the Ramcharit. 📌 Ramcharit goes with Rampal. ❌ Mahipala I is wrong because he is known as the second founder who revived Pala power."
  },
  44: {
    questext: "Which Pala ruler is called the 'second founder' and sent the monk Atisha to Tibet?",
    options: ["Dharmapala", "Devapala", "Mahipala I", "Rampal"],
    correct: "3",
    exptext: "✅ Mahipala I revived Pala power and is called the second founder. 📌 Second founder means second beginning. ❌ Rampal is wrong because he was the last powerful ruler, not the reviver."
  },
  45: {
    type: "concept", icon: "📚", accent: "#10b981", pauseTimer: true,
    title: "Sen Dynasty of Bengal",
    html: `
      <p class="cp-lead">The Sen dynasty rose in Bengal after the Pala dynasty declined. <u>Its kings were great patrons of scholars and poets.</u></p>
      <table><thead><tr><th>Ruler</th><th>Period</th><th>What to remember</th></tr></thead><tbody><tr><td>Samantasena</td><td>Founder</td><td>Founded the dynasty at Radha after the Pala decline</td></tr><tr><td>Vijayasen</td><td>1095 to 1158</td><td>First great ruler, with capitals at Vijayapuri and Vikrampur; a Shaivite who took the titles Parameshwara, Parambhattaraka and Maharajadhiraja; the poet Sri Harsha wrote the Vijayaprasasti in his praise</td></tr><tr><td>Ballalasen</td><td>1158 to 1178</td><td>A scholar-king who wrote the Danasagar and began the Adbhutsagar, which was left incomplete</td></tr><tr><td>Lakshmansen</td><td>1179 to 1205</td><td>Defeated Jaichand, had Lakhnauti as his capital, completed the Adbhutsagar, and introduced the Lakshman Samvat</td></tr></tbody></table>
      <p class="cp-lead">The capital of Lakshmansen, Lakhnauti, was sacked by Bakhtiyar Khilji in 1202. His court had the poet Shridhar and also Jaydev, who wrote the Geet Govind.</p>
      <div class="cp-note trap">Sri Harsha, the poet of the court of Vijayasen, is a different person from Sriharsha, the poet of the court of Jaichand.</div>
      <div class="cp-note exam">Remember Ballalasen with the Danasagar, Lakshmansen with Jaydev, and the year 1202 for the fall of Lakhnauti.</div>
    `
  },
  46: {
    questext: "Who wrote the Danasagar?",
    options: ["Samantasena", "Ballalasen", "Vijayasen", "Lakshmansen"],
    correct: "2",
    exptext: "✅ Ballalasen, a scholar-king, wrote the Danasagar and began the Adbhutsagar. 📌 Dana means giving, and the Danasagar is the ocean of giving. ❌ Lakshmansen is wrong because he only completed the Adbhutsagar."
  },
  47: {
    questext: "Lakshmansen's capital, Lakhnauti, was sacked in 1202 by which ruler?",
    options: ["Muhammad Ghori", "Qutbuddin Aibak", "Iltutmish", "Bakhtiyar Khilji"],
    correct: "4",
    exptext: "✅ Bakhtiyar Khilji sacked Lakhnauti in 1202. 📌 Khilji also sacked Nalanda. ❌ Qutbuddin Aibak is wrong because he captured Anahilwad in 1195."
  },
  48: {
    type: "concept", icon: "🏔️", accent: "#eab308", pauseTimer: true,
    title: "Dynasties of Kashmir",
    html: `
      <p class="cp-lead">The history of Kashmir is known from the Rajatarangini, written by Kalhana. <u>Three dynasties ruled Kashmir in turn: Karkota, Utpala and Lohar.</u></p>
      <table><thead><tr><th>Dynasty</th><th>Founder</th><th>Important points</th></tr></thead><tbody><tr><td>Karkota</td><td>Durlabhvardhan in the seventh century</td><td>Hiuen Tsang visited in his reign; the greatest king Lalitaditya Muktapida (724 to 760) built the Martand temple; the last ruler Jayapida ended the dynasty with his death in 810</td></tr><tr><td>Utpala</td><td>Avantivarman (855 to 883)</td><td>He built the city of Avantipur; his engineer Suyya built irrigation canals; in 980 Queen Didda became an ambitious ruler</td></tr><tr><td>Lohar</td><td>Sangramraj (1003 to 1028)</td><td>Harsha, a scholar who knew many languages, is called the 'Nero of Kashmir'; his brothers Utsal and Sussal revolted, and Harsha and his son Bhoj were killed about 1101</td></tr></tbody></table>
      <p class="cp-lead">Kalhana wrote the Rajatarangini, which means 'River of Kings', in the reign of Jayasingh, the last Lohar ruler. It was composed between 1148 and 1150, and it is the first systematic history of a region in Sanskrit.</p>
      <p class="cp-lead">Kashmir came under Muslim rule in 1339, when Shah Mir founded the sultanate. The popular ruler Zain-ul-Abidin is known as the 'Akbar of Kashmir'.</p>
      <div class="cp-note trap">Harsha of Kashmir, the 'Nero of Kashmir', is a different person from Harsha of Thanesar and Kannauj, and also from the poet Sri Harsha.</div>
      <div class="cp-note exam">Remember the order Karkota, Utpala and Lohar, and Lalitaditya as the greatest king.</div>
      <div class="cp-mnemonic">K, U, L — Karkota, Utpala, Lohar.</div>
    `
  },
  49: {
    questext: "Who wrote the Rajatarangini?",
    options: ["Kalhana", "Jayasingh", "Sriharsha", "Bhartrihari"],
    correct: "1",
    exptext: "✅ Kalhana wrote the Rajatarangini, the River of Kings, between 1148 and 1150. 📌 It is the first systematic history of a region in Sanskrit. ❌ Jayasingh is wrong because he was the king in whose reign the book was written."
  },
  50: {
    questext: "Which dynasty's greatest king, Lalitaditya Muktapida, built the Martand temple?",
    options: ["Utpala", "Karkota", "Lohar", "Sen"],
    correct: "2",
    exptext: "✅ Lalitaditya Muktapida belonged to the Karkota dynasty and ruled from 724 to 760. 📌 Karkota is the first of the three dynasties. ❌ Utpala is wrong because it was founded by Avantivarman and came after the Karkotas."
  },
  51: {
    questext: "Who is called the 'Nero of Kashmir'?",
    options: ["Harsha of Kannauj", "The poet Sri Harsha", "Harsha of the Lohar dynasty", "Avantivarman"],
    correct: "3",
    exptext: "✅ Harsha of the Lohar dynasty is called the Nero of Kashmir. 📌 The Nero of Kashmir is the Harsha of Kashmir. ❌ Harsha of Kannauj is wrong because he ruled in the seventh century and was not a ruler of Kashmir."
  },
  52: {
    type: "concept", icon: "🛡️", accent: "#0ea5e9", pauseTimer: true,
    title: "Rajput Dynasties — Gurjar Pratihara",
    html: `
      <p class="cp-lead">The period from the seventh to the twelfth century is called the 'Rajput Period'. <u>The major dynasties were the Gurjar Pratihara, Chalukya, Chauhan, Parmar and Gahadwal.</u></p>
      <p class="cp-lead">The Gurjar Pratiharas came from Gujarat and southwest Rajasthan. Their founder was Harishchandra.</p>
      <table><thead><tr><th>Ruler</th><th>Period</th><th>What to remember</th></tr></thead><tbody><tr><td>Nagabhatta I</td><td>730 to 756</td><td>Repelled Arab invasions, and the Gwalior Prashasti calls him the 'destroyer of Arabs'</td></tr><tr><td>Vatsaraja</td><td>775 to 805</td><td>The real founder of the empire; he defeated the Pala king Dharmapala but was defeated by the Rashtrakuta king Dhruva</td></tr><tr><td>Mihirbhoja I</td><td>836 to 885</td><td>The most important ruler, with Kannauj as his capital; a Vishnu devotee with the titles Adivarah and Prabhas</td></tr><tr><td>Rajyapal and Yashpal</td><td>1018</td><td>Mahmud Ghaznavi defeated Rajyapal in 1018, and Yashpal was the last ruler</td></tr></tbody></table>
      <p class="cp-lead">After Yashpal, the Gahadwalas captured Kannauj and ended the Pratihara dynasty.</p>
      <div class="cp-note trap">Nagabhatta I is the one who fought the Arabs, but Vatsaraja is called the real founder of the empire.</div>
      <div class="cp-note exam">Remember Mihirbhoja I as the greatest Pratihara king, and 1018 as the year when Mahmud Ghaznavi defeated Rajyapal.</div>
    `
  },
  53: {
    questext: "Which ruler is called the 'destroyer of Arabs' in the Gwalior Prashasti?",
    options: ["Vatsaraja", "Mihirbhoja I", "Nagabhatta I", "Rajyapal"],
    correct: "3",
    exptext: "✅ Nagabhatta I repelled the Arab invasions and is called the destroyer of Arabs. 📌 Nagabhatta equals Arab fighter. ❌ Mihirbhoja I is wrong because he is known as the most important Pratihara ruler, with Kannauj as his capital."
  },
  54: {
    questext: "Which Pratihara ruler is considered the most important and had Kannauj as his capital?",
    options: ["Mihirbhoja I", "Nagabhatta I", "Vatsaraja", "Harishchandra"],
    correct: "1",
    exptext: "✅ Mihirbhoja I ruled from 836 to 885 and was the most important Pratihara king. 📌 Mihirbhoja is the mighty one. ❌ Vatsaraja is wrong because he is called the real founder of the empire."
  },
  55: {
    questext: "Which Pratihara ruler was defeated by Mahmud Ghaznavi in 1018?",
    options: ["Mihirbhoja I", "Yashpal", "Vatsaraja", "Rajyapal"],
    correct: "4",
    exptext: "✅ Mahmud Ghaznavi defeated Rajyapal in 1018. 📌 Rajyapal fell, and Yashpal was the last ruler. ❌ Yashpal is wrong because he was the last ruler, who came after Rajyapal."
  },
  56: {
    type: "concept", icon: "🗡️", accent: "#d946ef", pauseTimer: true,
    title: "Gahadwal of Kannauj",
    html: `
      <p class="cp-lead">The Gahadwal dynasty ruled from Kannauj after the Pratiharas. <u>Its last powerful ruler was Jaichand.</u></p>
      <table><thead><tr><th>Ruler</th><th>Period</th><th>What to remember</th></tr></thead><tbody><tr><td>Chandradeva</td><td>Founder</td><td>Founded the dynasty</td></tr><tr><td>Govindachandra</td><td>1114 to 1155</td><td>The most powerful ruler of the dynasty</td></tr><tr><td>Jaichand</td><td>1170 to 1194</td><td>The last powerful ruler; defeated and killed at the Battle of Chandawar in 1194 by Muhammad Ghori</td></tr></tbody></table>
      <p class="cp-lead">Jaichand patronised the Sanskrit poet Sriharsha. After his fall the Gahadwal power declined, and Iltutmish ended the dynasty.</p>
      <div class="cp-note trap">Do not mix up Jaichand and Prithviraj. Jaichand was killed at Chandawar in 1194, while Prithviraj was killed after the Second Battle of Tarain in 1192.</div>
      <div class="cp-note exam">Remember Chandradeva, Govindachandra and Jaichand, and the year 1194 for Chandawar.</div>
    `
  },
  57: {
    questext: "Who was defeated and killed by Muhammad Ghori at the Battle of Chandawar in 1194?",
    options: ["Jaichand", "Prithviraj III", "Govindachandra", "Bhima II"],
    correct: "1",
    exptext: "✅ The Gahadwal ruler Jaichand was killed at Chandawar in 1194. 📌 Chandawar means Jaichand. ❌ Prithviraj III is wrong because he was defeated and killed after the Second Battle of Tarain in 1192."
  },
  58: {
    type: "concept", icon: "🦁", accent: "#64748b", pauseTimer: true,
    title: "Chauhan of Shakambhari",
    html: `
      <p class="cp-lead">The Chauhans ruled near Sambhar and Ajmer. <u>Their most famous king was Prithviraj III, also called Rai Pithora.</u></p>
      <p class="cp-lead">The Chauhan dynasty was founded by Vasudev in the seventh century. At first the Chauhans were vassals of the Pratiharas, which means they served them. They became free in the tenth century under Vakpatiraj I.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Post_Gupta_Period_and_Rajput_Dynasties/3.png" alt="Tarain 1191, Tarain 1192 and Chandawar 1194" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1186</td><td>Prithviraj attacked Bhima II, the Chalukya ruler of Gujarat</td></tr><tr><td>1191</td><td>First Battle of Tarain, in which Prithviraj defeated Muhammad Ghori</td></tr><tr><td>1192</td><td>Second Battle of Tarain, in which Ghori defeated, captured and killed Prithviraj</td></tr><tr><td>1194</td><td>Battle of Chandawar, in which Jaichand was killed</td></tr></tbody></table>
      <p class="cp-lead">Prithviraj III ruled from 1178 to 1192, and his kingdom stretched from Delhi to Ajmer. His court poets were Chand Bardai, who wrote the Prithviraj Raso, and Jayanak, who wrote the Prithviraj Vijay. Qutbuddin Aibak ended Chauhan power.</p>
      <div class="cp-note trap">The year 1191 means Prithviraj won, and the year 1192 means Prithviraj lost. Do not swap them.</div>
      <div class="cp-note exam">Remember Tarain 1191 and 1192, and Chand Bardai with the Prithviraj Raso.</div>
      <div class="cp-mnemonic">One-nine-one is the win of Prithviraj, and one-nine-two is the win of Ghori.</div>
    `
  },
  59: {
    questext: "In which year did Ghori defeat Prithviraj III in the Second Battle of Tarain?",
    options: ["1191", "1192", "1194", "1195"],
    correct: "2",
    exptext: "✅ The Second Battle of Tarain was fought in 1192, and Ghori defeated, captured and killed Prithviraj. 📌 One-nine-two belongs to Ghori. ❌ 1191 is wrong because Prithviraj won the first battle in that year."
  },
  60: {
    questext: "Who wrote the Prithviraj Raso?",
    options: ["Jayanak", "Sandhyakar Nandi", "Chand Bardai", "Jai Singh Suri"],
    correct: "3",
    exptext: "✅ Chand Bardai, a court poet of Prithviraj, wrote the Prithviraj Raso. 📌 Raso goes with Bardai. ❌ Jayanak is wrong because he wrote the Prithviraj Vijay."
  },
  61: {
    questext: "Which statement about the two Battles of Tarain is correct?",
    options: ["Prithviraj won both", "Ghori won both", "Ghori won the first and Prithviraj won the second", "Prithviraj won the first and Ghori won the second"],
    correct: "4",
    exptext: "✅ Prithviraj won in 1191, and Ghori won in 1192. 📌 First Prithviraj, then Ghori. ❌ Option 3 is wrong because it reverses the result of the two battles."
  },
  62: {
    questext: "Which ruler freed the Chauhans from the Pratiharas in the tenth century?",
    options: ["Vasudev", "Prithviraj III", "Vakpatiraj I", "Jayanak"],
    correct: "3",
    exptext: "✅ Vakpatiraj I made the Chauhans independent of the Pratiharas in the tenth century. 📌 Vasudev founded the dynasty, and Vakpatiraj freed it. ❌ Vasudev is wrong because he was the founder in the seventh century."
  },
  63: {
    type: "concept", icon: "🛕", accent: "#fb7185", pauseTimer: true,
    title: "Chandela and Parmar Dynasties",
    html: `
      <p class="cp-lead">The Chandelas ruled the Jejakabhukti region, and the Parmars ruled Malwa. <u>One is known for Khajuraho, and the other for Raja Bhoja.</u></p>
      <table><thead><tr><th>Dynasty</th><th>Founder</th><th>Capital</th><th>What to remember</th></tr></thead><tbody><tr><td>Chandela</td><td>Nannuk in the ninth century</td><td>Khajuraho</td><td>Yashovarman (925 to 950) built the famous Chaturbhuj (Vishnu) Temple; Vidyadhara built the Kandariya Mahadeva temple about 1030; the Khajuraho group became a World Heritage Site of the United Nations Educational, Scientific and Cultural Organization (UNESCO) in 1986</td></tr><tr><td>Parmar of Malwa</td><td>Upendra or Krishnaraja in the early ninth century</td><td>Ujjain, later Dhar</td><td>Raja Bhoja (1000 to 1055) was the most famous ruler and had the title 'Kaviraj', which means king of poets</td></tr></tbody></table>
      <div class="cp-note trap">The Chandela capital was Khajuraho, while Raja Bhoja belonged to the Parmar dynasty of Malwa, not to the Chandelas.</div>
      <div class="cp-note exam">Remember Nannuk, Yashovarman and Vidyadhara for the Chandelas, and Raja Bhoja as 'Kaviraj'.</div>
    `
  },
  64: {
    questext: "Who built the Chaturbhuj (Vishnu) Temple at Khajuraho?",
    options: ["Nannuk", "Raja Bhoja", "Vidyadhara", "Yashovarman"],
    correct: "4",
    exptext: "✅ The Chandela king Yashovarman, who ruled from 925 to 950, built the Chaturbhuj Temple. 📌 Vidyadhara built the Kandariya Mahadeva about 1030. ❌ Vidyadhara is wrong because he is linked with the Kandariya Mahadeva temple."
  },
  65: {
    questext: "Raja Bhoja, who had the title 'Kaviraj', belonged to which dynasty?",
    options: ["Parmar", "Chandela", "Chauhan", "Kalachuri"],
    correct: "1",
    exptext: "✅ Raja Bhoja belonged to the Parmar dynasty of Malwa and ruled from 1000 to 1055. 📌 Bhoja and Dhar go with the Parmars. ❌ The Chandela dynasty is wrong because its capital was Khajuraho and its famous rulers include Yashovarman."
  },
  66: {
    type: "concept", icon: "🏞️", accent: "#c026d3", pauseTimer: true,
    title: "Chalukya (Solanki) of Gujarat",
    html: `
      <p class="cp-lead">The Solankis ruled Gujarat from Anahilwad. <u>They were patrons of the Jain religion and great temple builders.</u></p>
      <p class="cp-lead">The dynasty was founded by Mulraj I, and the Jain community supported it strongly.</p>
      <table><thead><tr><th>Ruler</th><th>What to remember</th></tr></thead><tbody><tr><td>Bhima I (1022 to 1064)</td><td>Mahmud Ghaznavi invaded in 1025 and looted and destroyed Somnath; Bhima rebuilt it in stone; his general Vimal Shah built the Dilwara Jain temple on Mount Abu</td></tr><tr><td>Kumarpal</td><td>Made the final reconstruction of Somnath, praised in the Kumarpal Charit by Jai Singh Suri</td></tr><tr><td>Mulraj II</td><td>Defeated Muhammad Ghori near Mount Abu in 1178</td></tr><tr><td>Bhima II</td><td>The last Solanki ruler, in whose reign Qutbuddin Aibak captured Anahilwad in 1195</td></tr></tbody></table>
      <p class="cp-lead">Rani ki Vav at Patan is a famous step-well, which is a deep well with steps. It was built by Queen Udayamati in memory of Bhima I, and it became a World Heritage Site in 2014.</p>
      <div class="cp-note trap">Bhima I faced Mahmud Ghaznavi in 1025, while Bhima II was the last Solanki ruler and belongs to the time of Muhammad Ghori.</div>
      <div class="cp-note exam">Remember Somnath and 1025 with Bhima I, Vimal Shah with Dilwara, and Aibak at Anahilwad in 1195.</div>
    `
  },
  67: {
    questext: "Who rebuilt the Somnath temple in stone after Mahmud Ghaznavi destroyed it in 1025?",
    options: ["Mulraj I", "Bhima I", "Kumarpal", "Bhima II"],
    correct: "2",
    exptext: "✅ Bhima I rebuilt Somnath in stone after the attack of 1025. 📌 Bhima I met Mahmud, and Kumarpal made the final reconstruction. ❌ Kumarpal is wrong because he made the final reconstruction later."
  },
  68: {
    questext: "Who built the Dilwara Jain temple on Mount Abu?",
    options: ["Vimal Shah", "Bhima I", "Udayamati", "Jai Singh Suri"],
    correct: "1",
    exptext: "✅ Vimal Shah, the general of Bhima I, built the Dilwara Jain temple. 📌 Dilwara goes with Vimal. ❌ Udayamati is wrong because she built the Rani ki Vav step-well."
  },
  69: {
    questext: "In which year did Qutbuddin Aibak capture Anahilwad?",
    options: ["1192", "1194", "1202", "1195"],
    correct: "4",
    exptext: "✅ Aibak captured Anahilwad in 1195, in the reign of Bhima II. 📌 Aibak took Anahilwad in 1195, and Bakhtiyar Khilji took Lakhnauti in 1202. ❌ 1202 is wrong because that is the year of the sack of Lakhnauti."
  },
  70: {
    type: "concept", icon: "🌊", accent: "#2dd4bf", pauseTimer: true,
    title: "Kalachuri, Eastern Ganga, Kakatiya and Hoysala",
    html: `
      <p class="cp-lead">These four dynasties ruled parts of central, eastern and southern India. <u>Each is remembered for one ruler, one capital and one temple or port.</u></p>
      <table><thead><tr><th>Dynasty</th><th>Founder or capital</th><th>What to remember</th></tr></thead><tbody><tr><td>Kalachuri (Chedi)</td><td>Founded by Kokalla I, with Tripuri as capital</td><td>Gangey Dev (1019 to 1040) was the most powerful and took the title 'Vikramaditya'; the dynasty used the Traikutak Samvat, an era that is a way of counting years, which began in 248 to 249</td></tr><tr><td>Eastern Ganga</td><td>Capital Kalinganagar, modern Srimukhalingam in Srikakulam, Andhra Pradesh</td><td>Anantavarma Chodaganga (about 1078 to 1150) was the greatest king and built the Jagannath Temple at Puri; the Sun Temple at Konark was built later by Narasimhadeva I of the same dynasty</td></tr><tr><td>Kakatiya</td><td>Vassals of the Chalukyas of Kalyani; Rudra I made Warangal the capital</td><td>The main port was Motupalli in Andhra Pradesh</td></tr><tr><td>Hoysala</td><td>A Yadava clan, with Dwarasamudra, which is Halebid, as capital</td><td>Vishnuvardhana freed the kingdom from the Chalukya king Someshwara III; Veer Ballal III was the last ruler; the famous Hoysaleswara temple is at Halebid</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse the Jagannath Temple at Puri with the Sun Temple at Konark. Both belong to the Eastern Ganga dynasty, but the Jagannath Temple was built by Chodaganga.</div>
      <div class="cp-note exam">Remember Gangey Dev, Chodaganga, Warangal and Halebid.</div>
    `
  },
  71: {
    questext: "Which temple was built by the Eastern Ganga king Anantavarma Chodaganga?",
    options: ["Kandariya Mahadeva Temple", "Hoysaleswara Temple", "Jagannath Temple at Puri", "Dilwara Temple"],
    correct: "3",
    exptext: "✅ Chodaganga built the Jagannath Temple at Puri. 📌 Eastern Ganga goes with the temples of Odisha. ❌ The Hoysaleswara Temple is wrong because it is at Halebid and belongs to the Hoysalas."
  },
  72: {
    questext: "Which dynasty had Warangal as its capital?",
    options: ["Kakatiya", "Hoysala", "Kalachuri", "Eastern Ganga"],
    correct: "1",
    exptext: "✅ Rudra I made Warangal the capital of the Kakatiyas. 📌 Remember Warangal and Kakatiya together. ❌ The Hoysalas are wrong because their capital was Dwarasamudra, also called Halebid."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Post_Gupta_Period_and_Rajput_Dynasties/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an ornately carved stone temple spire, a gold royal crown and an old palm-leaf manuscript" },
  "images/General_Awareness/Ancient_India/Post_Gupta_Period_and_Rajput_Dynasties/1.png": { t: "fig", about: "Horizontal timeline of Harsha with five markers: 606 Harsha crowned at age 16; 629 Hiuen Tsang leaves China; 643 Kannauj Assembly (23 days); 645 Prayag Conference (75 days); 647 Harsha dies." },
  "images/General_Awareness/Ancient_India/Post_Gupta_Period_and_Rajput_Dynasties/2.png": { t: "fig", about: "Schematic, not a map: three boxes around a centre box labelled Kannauj. Boxes: Pala (east), Pratihara (west), Rashtrakuta (south). Arrows point to Kannauj. Footer label: about 200 years; winner: Pratihara." },
  "images/General_Awareness/Ancient_India/Post_Gupta_Period_and_Rajput_Dynasties/3.png": { t: "fig", about: "Three markers on a line: 1191 First Tarain, Prithviraj wins (green); 1192 Second Tarain, Ghori wins (red); 1194 Chandawar, Jaichand killed (amber)." }
});

/* CHANGE LOG
   - Nalanda's library is written as Dharmaganja; the notes spell it differently.
   - Eastern Ganga: Anantavarma Chodaganga is given his correct reign of about 1078 to 1150 (the notes say 976 to 1048), and the Sun Temple at Konark is credited to Narasimhadeva I, not to Chodaganga.
   - Solanki: Mulraj II is credited with the 1178 victory over Muhammad Ghori near Mount Abu, and Bhima II is shown as the last ruler in whose reign Aibak took Anahilwad in 1195; the notes credited both to the 1178 battle.
   - Kashmir: the end of Lohar rule in 1339 is written as the start of Muslim rule under Shah Mir, instead of just 'Turks'.
   - Tarain: the notes' chart and text disagree on the first battle; kept as 1191 (Prithviraj wins) and 1192 (Ghori wins).
   - Pala empire extent: 'from the Gulf to Delhi' is written as 'from Bengal to Delhi', since the notes do not say which gulf is meant.
*/