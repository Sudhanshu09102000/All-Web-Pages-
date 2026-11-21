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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Post_Mauryan_Empire · 9 concept pages (+ overview) · 33 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Post-Mauryan Empire",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Post_Mauryan_Empire/thumbnail.png",
      banner: "ANCIENT INDIA • ALL EXAMS",
      line1: "POST-MAURYAN",
      line2: "EMPIRE",
      line3: "FULL CHAPTER",
      badge: "CRASH CLASS",
      ribbon: "KANISHKA • SATAVAHANAS • ART",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Post-Mauryan Empire Complete Chapter | Ancient India for SSC UPSC Railways",
      altTitles: ["Shunga to Kushan in One Class", "Kanishka, Satavahana & Indo-Greeks Crash Course"],
      description: "Post-Mauryan Empire is a high-yield chapter of Ancient India. This crash class covers Shungas, Kanvas, Satavahanas, Chedis, Indo-Greeks, Shakas, Parthians and Kushanas, with art, literature and practice questions.\n\n📌 IN THIS CLASS\n✅ Shunga and Kanva dynasties\n✅ Satavahanas and Kharavela\n✅ Indo-Greeks, Shakas, Parthians\n✅ Kushanas and Kanishka\n✅ Gandhara, Mathura, Amaravati art\n✅ Practice MCQs\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#PostMauryan #AncientIndia #Kanishka",
      tags: ["post mauryan empire", "ancient india", "shunga dynasty", "satavahana dynasty", "kanva dynasty", "kushan dynasty", "kanishka", "indo greeks", "menander milinda", "shakas rudradaman", "parthians gondophernes", "kharavela hathigumpha", "gandhara art", "mathura art", "amaravati art", "ancient india history", "indian history", "history mcq", "ssc cgl history", "upsc history", "static gk history", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "Post Mauryan Empire MCQ"],
      hashtags: ["PostMauryan", "AncientIndia", "Kanishka"],
      thumbText: "POST-MAURYAN EMPIRE IN ONE CLASS",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏛️ New class: Post-Mauryan Empire complete chapter. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Ancient India — Crash Course"
    },
    html: `
      <p class="cp-lead">After the Mauryas: <u>Shungas, Kanvas, Satavahanas, Chedis, Indo-Greeks, Shakas, Parthians and Kushanas</u> — plus Gandhara, Mathura and Amaravati art and the literature of the age.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>9</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>33</b><span>Questions</span></div>
        <div class="cp-stat"><b>~51 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Shunga, Kanva, Satavahana</b><br>Dynasties born from murders; Gautamiputra and Pulumavi.</li>
        <li><b>Chedi &amp; Kharavela</b><br>Hathigumpha inscription and the Jain patron.</li>
        <li><b>Indo-Greeks, Shakas, Parthians</b><br>Menander, Rudradaman, Gondophernes.</li>
        <li><b>Kushan Dynasty</b><br>Kanishka, 78 CE, Fourth Buddhist Council.</li>
        <li><b>Art &amp; Literature</b><br>Gandhara vs Mathura vs Amaravati; famous authors.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> rulers-to-inscriptions and art-school comparisons from this chapter repeat in SSC, UPSC, Railways and State exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🪔", accent: "#22c55e", pauseTimer: true,
    title: "6.1 Shunga Dynasty (185 BCE – 73 BCE)",
    html: `
      <p class="cp-lead"><b>Pushyamitra Shunga</b> killed the last Maurya, Brihadratha, in <b>185 BC</b> and founded the Shunga line.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Founder</td><td>Pushyamitra Shunga; staunch Brahminist; his priest was <b>Patanjali</b></td></tr><tr><td>Banabhatta</td><td>Called him <b>‘Anary’</b> in Harshacharita</td></tr><tr><td>Divyavadana</td><td>Destroyer of 84,000 stupas of Ashoka; yet <b>Bharhut</b> and <b>Sanchi</b> were renovated in his reign</td></tr><tr><td>Vidarbha</td><td>Ruler <b>Yajnasen</b> declared independence; <b>Agnimitra</b> defeated him (Kalidas's <i>Malavikagnimitram</i>)</td></tr><tr><td>Kalinga</td><td><b>Kharavela</b> attacked Magadha, defeated Pushyamitra (Hathigumpha)</td></tr><tr><td>Yavana invasion</td><td>By Demetrius, also fell in his reign</td></tr><tr><td>Successor</td><td>Agnimitra; last ruler <b>Devbhooti</b>, killed by minister <b>Vasudev</b></td></tr><tr><td>Era</td><td>Manusmriti took its present form; <b>Garuda Pillar of Vidisha</b> built</td></tr></tbody></table>
      <div class="cp-note trap">Buddhist texts call Pushyamitra a persecutor, yet he is credited with the <b>Bharhut Stupa</b> and patronised Buddhist art.</div>
      <div class="cp-note remember"><b>Heliodorus (Garuda) pillar</b>, Besnagar/Vidisha, c. 113 BCE — Greek envoy Heliodorus of Indo-Greek king <b>Antialcidas</b> to the Shunga court of <b>Bhagabhadra</b>; he calls himself a <b>Bhagavata</b>, the <b>earliest epigraphic record of Vaishnavism</b>.</div>
    `
  },
  3: {
    questext: "Which text calls Pushyamitra Shunga ‘Anary’?",
    options: ["Harshacharita", "Malavikagnimitram", "Divyavadana", "Manusmriti"],
    correct: "1",
    exptext: "✅ Banabhatta's Harshacharita uses ‘Anary’. 📌 Bana → Anary. ❌ Divyavadana calls him a stupa-destroyer."
  },
  4: {
    questext: "In Kalidas's Malavikagnimitram, Agnimitra defeats which Vidarbha ruler?",
    options: ["Demetrius", "Kharavela", "Yajnasen", "Vasudev"],
    correct: "3",
    exptext: "✅ Yajnasen declared independence and was defeated. 📌 Malavika is Yajnasen's cousin. ❌ Kharavela belonged to Kalinga."
  },
  5: {
    questext: "The Heliodorus pillar at Besnagar is the earliest epigraphic record of which faith?",
    options: ["Shaivism", "Buddhism", "Jainism", "Vaishnavism"],
    correct: "4",
    exptext: "✅ Heliodorus calls himself a Bhagavata, so it marks early Vaishnavism. 📌 Garuda pillar = Vishnu. ❌ Not a Buddhist record."
  },
  6: {
    questext: "Who killed the last Shunga ruler Devbhooti?",
    options: ["Agnimitra", "Brihadratha", "Simuka", "His minister Vasudev"],
    correct: "4",
    exptext: "✅ Minister Vasudev killed him and founded the Kanva dynasty. 📌 Each house began with a murder. ❌ Simuka killed Susarman."
  },
  7: {
    type: "concept", icon: "📖", accent: "#f59e0b", pauseTimer: true,
    title: "6.2 Kanva Dynasty (73 BC – 30 BC)",
    html: `
      <p class="cp-lead">A short Brahmin dynasty founded by <b>Vasudev</b>; only <b>four rulers</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Post_Mauryan_Empire/1.png" alt="Murder chain: Maurya, Shunga, Kanva, Satavahana" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Founder</td><td>Vasudev, of the Brahmin line</td></tr><tr><td>Four rulers</td><td>Vasudev → Bhumimitra → Narayana → Susarman</td></tr><tr><td>End</td><td>Susarman was murdered by <b>Simuka</b> in 30 BC</td></tr><tr><td>Next</td><td>The Andhra-Satavahana dynasty</td></tr></tbody></table>
      <div class="cp-note exam"><b>Every new house began with a murder:</b> Pushyamitra killed Brihadratha, Vasudev killed Devbhooti, Simuka killed Susarman.</div>
    `
  },
  8: {
    questext: "Who was the founder of the Kanva dynasty?",
    options: ["Vasudev", "Susarman", "Narayana", "Bhumimitra"],
    correct: "1",
    exptext: "✅ Vasudev, a Brahmin, founded it. 📌 Four rulers, the last Susarman. ❌ Susarman was the last Kanva ruler."
  },
  9: {
    questext: "The last Kanva ruler Susarman was murdered by:",
    options: ["Kanha", "Simuka", "Hala", "Satakarni I"],
    correct: "2",
    exptext: "✅ Simuka killed him in 30 BC and founded the Satavahanas. 📌 Murder chain. ❌ Kanha was Simuka's brother."
  },
  10: {
    type: "concept", icon: "🏹", accent: "#ef4444", pauseTimer: true,
    title: "6.3 Andhra-Satavahana Dynasty (30 BC – 250 AD)",
    html: `
      <p class="cp-lead">Founded by <b>Simuka</b>; ruled Maharashtra, Andhra and Karnataka; called <b>‘Andhrabhrtya’</b> in the Puranas and <b>‘Satavana’</b> in inscriptions.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Post_Mauryan_Empire/2.png" alt="Satavahana rulers in order" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Key facts</th></tr></thead><tbody><tr><td>Simuka</td><td>Founder; killed the last Kanva ruler; succeeded by brother <b>Kanha</b></td></tr><tr><td>Satakarni I</td><td>Great early ruler; <b>‘Dakshina-pathpati’</b>; Satakarni II was the longest-ruling</td></tr><tr><td>Hala</td><td>Poet-ruler; wrote <b>Gathasaptasati</b> (Sattasai), 700 Prakrit verses on love</td></tr><tr><td>Gautamiputra Satakarni (106–130 AD)</td><td>Greatest ruler; <b>‘Advitiya Brahmin’</b>; defeated Shaka ruler Nahapana; destroyer of Shakas, Pahalavas, Yavanas</td></tr><tr><td>Vasisthiputr Pulumavi (130–154 AD)</td><td>Called the first Andhra emperor; <b>‘Dakshinapatheshwar’</b>; struggled with Rudradaman</td></tr></tbody></table>
      <div class="cp-note exam">Capital <b>Pratishthan (Paithan)</b>; language <b>Prakrit</b>, script <b>Brahmi</b>. First to introduce <b>lead coins</b>; architecture — <b>Karle Chaitya</b> and <b>Amaravati Stupa</b> art.</div>
      <div class="cp-note remember"><b>Nasik</b> inscription — by Gautami Balashri for her son Gautamiputra; <b>Naneghat</b> (Pune) — queen <b>Naganika</b>, wife of Satakarni I, records two <b>Ashvamedha</b> sacrifices.</div>
    `
  },
  11: {
    questext: "The Gathasaptasati, a collection of 700 Prakrit verses, is attributed to which ruler?",
    options: ["Simuka", "Kanha", "Hala", "Satakarni II"],
    correct: "3",
    exptext: "✅ Hala composed or compiled it. 📌 Hala = Prakrit poet-king. ❌ Satakarni II was the longest-ruling."
  },
  12: {
    questext: "Which Satavahana ruler is called ‘Advitiya Brahmin’ and defeated the Shaka ruler Nahapana?",
    options: ["Hala", "Pulumavi", "Satakarni I", "Gautamiputra Satakarni"],
    correct: "4",
    exptext: "✅ His mother's Nasik inscription says so. 📌 Gautami → Gautamiputra. ❌ Pulumavi was his son."
  },
  13: {
    questext: "The official language and script of the Satavahanas were:",
    options: ["Prakrit and Brahmi", "Sanskrit and Kharosthi", "Pali and Brahmi", "Tamil and Brahmi"],
    correct: "1",
    exptext: "✅ Prakrit in the Brahmi script. 📌 Capital Pratishthan/Paithan. ❌ Kharosthi was northwestern."
  },
  14: {
    questext: "The Satavahanas were the first Indian rulers to introduce which type of coin?",
    options: ["Gold coins", "Lead coins", "Silver punch-marked coins", "Copper coins with king's portrait"],
    correct: "2",
    exptext: "✅ Lead coins are credited to the Satavahanas. 📌 Satavahana = Lead. ❌ Gold coins came from the Indo-Greeks and Kushanas."
  },
  15: {
    questext: "The Naneghat inscription of queen Naganika records:",
    options: ["two Ashvamedha sacrifices", "the Kalinga War", "famine relief", "a Buddhist council"],
    correct: "1",
    exptext: "✅ Naganika, wife of Satakarni I, records two Ashvamedha sacrifices. 📌 Nane = Naganika. ❌ Nasik is by Gautami Balashri."
  },
  16: {
    type: "concept", icon: "🛕", accent: "#8b5cf6", pauseTimer: true,
    title: "6.4 Chedi / Mahameghaavahana Dynasty",
    html: `
      <p class="cp-lead">The source is the <b>Hathigumpha inscription</b>; the founder was <b>Mahameghavahan</b> and the greatest ruler <b>Kharavela</b>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Inscription</td><td>Hathigumpha (‘elephant cave’), <b>Udayagiri hills</b> near Bhubaneswar, Odisha</td></tr><tr><td>Language and script</td><td>Prakrit and Brahmi</td></tr><tr><td>Content</td><td>Year-by-year record of Kharavela's reign</td></tr><tr><td>Faith</td><td><b>Jain patron</b>; opens with the Jain Namokar salutation</td></tr><tr><td>Achievement</td><td>Brought back the <b>Kalinga Jina</b> image carried off by a Nanda king</td></tr></tbody></table>
    `
  },
  17: {
    questext: "The Hathigumpha inscription of Kharavela is cut in the Udayagiri hills near:",
    options: ["Pataliputra", "Nasik", "Bhubaneswar", "Sanchi"],
    correct: "3",
    exptext: "✅ Udayagiri, near Bhubaneswar in Odisha. 📌 Elephant cave = Odisha. ❌ Nasik holds Gautami Balashri's record."
  },
  18: {
    questext: "Which faith did Kharavela patronise, as the Hathigumpha inscription's opening shows?",
    options: ["Buddhism", "Shaivism", "Ajivikism", "Jainism"],
    correct: "4",
    exptext: "✅ It opens with the Jain Namokar salutation. 📌 Kharavela = Jain. ❌ Ashoka patronised Buddhism."
  },
  19: {
    type: "concept", icon: "🏛️", accent: "#14b8a6", pauseTimer: true,
    title: "6.5 Indo-Greeks (2nd c. BCE – 1st c. CE)",
    html: `
      <p class="cp-lead">Greeks of <b>Bactria</b> invaded the north-west from about <b>200 BCE</b> — the <b>first to cross the Hindukush</b>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Firsts</td><td>First to introduce <b>gold coins</b> and first to put the <b>king's picture</b> on coins</td></tr><tr><td>Art</td><td>Brought Hellenistic art (seen in Gandhara Art)</td></tr><tr><td>Demetrius</td><td>First foreign king after Alexander; conquered Afghanistan, Punjab, Sindh</td></tr><tr><td>Menander / Milinda (165–145 BCE)</td><td>Most famous; capital <b>Sakal</b>; stopped near Pataliputra by Vasumitra, grandson of Pushyamitra</td></tr><tr><td>Milindapanho</td><td>Dialogues with monk <b>Nagasena</b> (Pali); Menander embraced Buddhism</td></tr><tr><td>Last ruler</td><td><b>Hermaeus</b></td></tr></tbody></table>
      <div class="cp-note trap">Hellenistic art and king's picture on coins are Indo-Greek; <b>lead coins</b> belong to the Satavahanas.</div>
    `
  },
  20: {
    questext: "Menander (Milinda) discussed Buddhism in the Milindapanho with which monk?",
    options: ["Nagasena", "Ashvaghosha", "Nagarjuna", "Vasumitra"],
    correct: "1",
    exptext: "✅ Nagasena's dialogues form the Pali Milindapanho. 📌 Milinda + Nagasena. ❌ Vasumitra stopped Menander's army."
  },
  21: {
    questext: "What was the capital of the Indo-Greek ruler Menander?",
    options: ["Peshawar", "Sakal", "Mathura", "Pataliputra"],
    correct: "2",
    exptext: "✅ Sakal was also a main education centre. 📌 Menander tried but failed to take Pataliputra. ❌ Peshawar was Kanishka's."
  },
  22: {
    questext: "Who were the first to cross the Hindukush and invade India after the Mauryas?",
    options: ["Shakas", "Parthians", "Bactrian Greeks", "Kushanas"],
    correct: "3",
    exptext: "✅ Greeks of Bactria, the Indo-Greeks, began c. 200 BCE. 📌 Greeks first, Kushanas last. ❌ Shakas came afterwards."
  },
  23: {
    questext: "Which of the following is NOT associated with the Indo-Greeks?",
    options: ["Gold coins", "King's picture on coins", "Hellenistic art in Gandhara", "First introduction of lead coins"],
    correct: "4",
    exptext: "✅ Lead coins were first introduced by the Satavahanas. 📌 Greeks = gold + portrait. ❌ The other three are Indo-Greek."
  },
  24: {
    type: "concept", icon: "🐎", accent: "#ec4899", pauseTimer: true,
    title: "6.6 Shakas (Scythians)",
    html: `
      <p class="cp-lead">Titles <b>Rajadhiraja</b> and <b>‘Kshatrap’</b>; the <b>first Shaka ruler</b> in India was <b>Maues / Moga</b>.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Origin</td><td>North of Syria / Central Asia</td></tr><tr><td>Founder</td><td>Maues / Moga; Gandhara; prominent among rulers of Takshila</td></tr><tr><td>Five branches</td><td>Afghanistan, Punjab (capital Takshila), Mathura, West India, Upper Deccan</td></tr><tr><td>Western Satraps</td><td><b>Nahapana</b> (Kshaharata dynasty, Nashik), defeated by Gautamiputra Satakarni; <b>Kshaharata</b> and <b>Kardamaka</b> (Ujjain) dynasties</td></tr><tr><td>Rudradaman I (130–150 AD)</td><td>Most famous Shaka; Sindh, Konkan, Narmada Valley, Malwa, Kathiawar, Gujarat</td></tr><tr><td>Achievements</td><td>Renovated the <b>Sudarshan Lake</b>; Sanskrit lover; <b>Junagadh inscription</b> is the first in pure Sanskrit</td></tr><tr><td>Last ruler</td><td><b>Rudrasingh III</b>, defeated by Gupta ruler Chandragupta II ‘Vikramaditya’, who annexed the Western Satraps</td></tr></tbody></table>
    `
  },
  25: {
    questext: "Who was the first Shaka ruler to establish Shaka power in India?",
    options: ["Nahapana", "Maues (Moga)", "Rudradaman", "Rudrasingh III"],
    correct: "2",
    exptext: "✅ Maues, who held Gandhara. 📌 Moga = first. ❌ Rudradaman was the most famous Shaka."
  },
  26: {
    questext: "Rudradaman I of the Shakas renovated which Maurya-period lake?",
    options: ["Chilika", "Dal", "Sudarshan", "Wular"],
    correct: "3",
    exptext: "✅ Sudarshan Lake in Gujarat, recorded at Junagadh. 📌 Sudarshan = Girnar lake. ❌ Others are unrelated lakes."
  },
  27: {
    questext: "The last Western Satrap, Rudrasingh III, was defeated by:",
    options: ["Samudragupta", "Chandragupta I", "Skandagupta", "Chandragupta II Vikramaditya"],
    correct: "4",
    exptext: "✅ Chandragupta II annexed the Western Satraps. 📌 Vikramaditya = Chandragupta II. ❌ Chandragupta I founded the Gupta line."
  },
  28: {
    questext: "Rudradaman I belonged to which line of Western Satraps?",
    options: ["Kardamaka", "Kshaharata", "Kushan", "Shunga"],
    correct: "1",
    exptext: "✅ Rudradaman was Kardamaka, ruling from Ujjain. 📌 Nahapana = Kshaharata, Nashik. ❌ Shunga and Kushan are not Shaka lines."
  },
  29: {
    type: "concept", icon: "🔥", accent: "#3b82f6", pauseTimer: true,
    title: "6.7 Parthians (Pahlavas, 1st c. CE)",
    html: `
      <p class="cp-lead">Of <b>Iranian</b> origin; Shakas and Parthians ruled <b>simultaneously</b> in different pockets of the north-west.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Real founder in India</td><td>Mithradates I (171–130 BC)</td></tr><tr><td>Most powerful</td><td><b>Gondophernes</b> (20–41 AD)</td></tr><tr><td>End</td><td>Ended by the Kushans</td></tr></tbody></table>
      <div class="cp-note remember">The <b>Takht-i-Bahi</b> inscription belongs to Gondophernes; Christian tradition links his court with <b>St. Thomas</b>.</div>
    `
  },
  30: {
    questext: "Who was the most powerful Parthian ruler in India?",
    options: ["Mithradates I", "Maues", "Gondophernes", "Menander"],
    correct: "3",
    exptext: "✅ Gondophernes (20–41 AD). 📌 Gondo = greatest. ❌ Mithradates I was the real founder."
  },
  31: {
    questext: "The Takht-i-Bahi inscription belongs to which ruler?",
    options: ["Kanishka", "Gondophernes", "Rudradaman", "Kharavela"],
    correct: "2",
    exptext: "✅ It is a Gondophernes record, linked to St. Thomas by Christian tradition. 📌 Parthian = Takht-i-Bahi. ❌ Hathigumpha is Kharavela's."
  },
  32: {
    type: "concept", icon: "👑", accent: "#f97316", pauseTimer: true,
    title: "6.8 Kushan Dynasty (1st – 3rd c. CE)",
    html: `
      <p class="cp-lead">Kushans were <b>Yuehchis / Tocharians</b>, one of five clans of the Yuehchi tribe from North Central Asia near China; <b>Mathura</b> was their trade and culture centre.</p>
      <table><thead><tr><th>Ruler</th><th>Key facts</th></tr></thead><tbody><tr><td>Kujula Kadphises (Kadphises I)</td><td>Founder</td></tr><tr><td>Vima Kadphises</td><td><b>Real founder</b> of Kushan power in India; a Shaiva; <b>first to issue gold coins</b> in India; titles ‘Lord of the Whole World’, ‘Maharaj’, ‘Maheshwar’</td></tr><tr><td>Kanishka</td><td>Most famous; accession c. <b>78 CE</b>; empire at its maximum; title <b>‘Kaiser’ / ‘Caesar’</b>; capitals <b>Peshawar (Purushapur)</b> and <b>Mathura</b>; founded <b>Kanishkapur</b> in Kashmir; the <b>‘Second Ashoka’</b></td></tr><tr><td>Fourth Buddhist Council</td><td>Held at <b>Kundalavana</b> (Harwan, J&amp;K) under <b>Vasumitra</b></td></tr><tr><td>Court</td><td>Parshva, Ashvaghosh, Vasumitra, Nagarjuna, physician <b>Charak</b>; controlled the Silk Route; fought Chinese ruler Pan Chao</td></tr><tr><td>Vasudeva</td><td>Last great emperor; ports Barbaricum (Indus), Arikamedu (east), Barygaza/Bharuch (west)</td></tr></tbody></table>
      <div class="cp-note exam"><b>Who issued gold coins first?</b> Indo-Greeks (Menander) were first in India; the Kushanas (Vima Kadphises) issued them on a <b>large scale and in the purest gold</b>.</div>
      <div class="cp-note remember">Kanishka's 78 CE begins the <b>Shaka era</b> — India's national calendar since 1957; his headless statue was found at <b>Mat (Mathura)</b>; the <b>Rabatak</b> inscription (Afghanistan) is in Bactrian.</div>
      <div class="cp-note trap">Two <b>Vasudevs</b> — founder of Kanva vs last great Kushan. Two <b>Vasumitras</b> — Pushyamitra's grandson vs president of the Fourth Council.</div>
    `
  },
  33: {
    questext: "The Fourth Buddhist Council under Kanishka was held at:",
    options: ["Rajgir", "Vaishali", "Pataliputra", "Kundalavana"],
    correct: "4",
    exptext: "✅ Kundalavana (Harwan, Kashmir) under Vasumitra. 📌 Fourth = Kashmir. ❌ Pataliputra hosted the Third."
  },
  34: {
    questext: "Who was the real founder of Kushan power in India and the first Kushan to issue gold coins?",
    options: ["Vima Kadphises", "Kujula Kadphises", "Kanishka", "Vasudeva"],
    correct: "1",
    exptext: "✅ Vima Kadphises. 📌 Kujula = founder; Vima = real founder. ❌ Kanishka was the most famous."
  },
  35: {
    questext: "Kanishka's accession of 78 CE began which era?",
    options: ["Vikram Samvat", "Gupta era", "Shaka era", "Harsha era"],
    correct: "3",
    exptext: "✅ The Shaka era, India's national calendar since 1957. 📌 78 CE = Shaka. ❌ Vikram Samvat starts 57 BC."
  },
  36: {
    questext: "Which was the first capital of Kanishka?",
    options: ["Mathura", "Peshawar (Purushapur)", "Takshila", "Kanishkapur"],
    correct: "2",
    exptext: "✅ Peshawar first, Mathura second. 📌 Purushapur = Peshawar. ❌ Kanishkapur was founded in Kashmir."
  },
  37: {
    questext: "Which of these was NOT a scholar of Kanishka's court?",
    options: ["Kalidas", "Ashvaghosha", "Nagarjuna", "Charak"],
    correct: "1",
    exptext: "✅ Kalidas belongs to the Gupta age. 📌 Kanishka's court had Ashvaghosha, Nagarjuna, Charak. ❌ The others were at his court."
  },
  38: {
    type: "concept", icon: "🎨", accent: "#84cc16", pauseTimer: true,
    title: "6.9 Art & Literature",
    html: `
      <p class="cp-lead">Three art schools — <b>Gandhara</b>, <b>Mathura</b> and <b>Amaravati</b> — plus great Sanskrit works of the age.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Post_Mauryan_Empire/3.png" alt="Gandhara versus Mathura art" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Gandhara</th><th>Mathura</th></tr></thead><tbody><tr><td>Stone</td><td>Deep blue-black</td><td>Red</td></tr><tr><td>Patrons</td><td>Shaka and Kushan</td><td>Kushan</td></tr><tr><td>Style</td><td>Realistic</td><td>Idealistic</td></tr><tr><td>Subjects</td><td>Mainly Buddha statues</td><td>Buddhist, Jain and Brahmin statues</td></tr></tbody></table>
      <div class="cp-note exam"><b>Amaravati Art</b> grew under Satavahana and Ikshvaku patronage in the lower Krishna–Godavari valley; centres <b>Nagarjunakonda, Amaravati, Jaggayyapeta</b>.</div>
      <table><thead><tr><th>Work</th><th>Author</th></tr></thead><tbody><tr><td>Charaka Samhita</td><td>Charaka</td></tr><tr><td>Natyashastra</td><td>Bharat Muni</td></tr><tr><td>Kama Sutra</td><td>Vatsyayana</td></tr><tr><td>Saundarananda, Buddhacharita</td><td>Ashvaghosha</td></tr></tbody></table>
      <div class="cp-note remember">Ashvaghosha also wrote <b>Vajrasuchi</b> and the drama <b>Sariputraprakarana</b>; <b>Nagarjuna</b> founded the <b>Madhyamika (Shunyavada)</b> school and is called the ‘<b>Einstein of India</b>’.</div>
    `
  },
  39: {
    questext: "Mathura School of Art used which stone?",
    options: ["Deep blue-black stone", "Red stone", "White marble", "Granite"],
    correct: "2",
    exptext: "✅ Mathura art used red stone. 📌 Gandhara = grey-blue, Mathura = red. ❌ Blue-black is Gandhara's."
  },
  40: {
    questext: "Which art school showed Hellenistic influence, a realistic style and mainly Buddha statues?",
    options: ["Mathura", "Amaravati", "Gandhara", "Sarnath"],
    correct: "3",
    exptext: "✅ Gandhara, patronised by Shakas and Kushanas. 📌 Greek touch = Gandhara. ❌ Mathura was idealistic."
  },
  41: {
    questext: "Amaravati art flourished in the lower Krishna–Godavari valley under:",
    options: ["Kushanas", "Shungas", "Guptas", "Satavahanas and Ikshvakus"],
    correct: "4",
    exptext: "✅ Satavahana and Ikshvaku patronage. 📌 Amaravati = Andhra. ❌ Kushanas patronised Gandhara and Mathura."
  },
  42: {
    questext: "Which work–author pair is correctly matched?",
    options: ["Natyashastra – Bharat Muni", "Kama Sutra – Ashvaghosha", "Buddhacharita – Vatsyayana", "Charaka Samhita – Nagarjuna"],
    correct: "1",
    exptext: "✅ Bharat Muni wrote the Natyashastra. 📌 Kama Sutra = Vatsyayana; Buddhacharita = Ashvaghosha. ❌ Charaka Samhita is by Charaka."
  },
  43: {
    questext: "Nagarjuna, called the ‘Einstein of India’, founded which school?",
    options: ["Yogachara", "Madhyamika (Shunyavada)", "Vaibhashika", "Digambara"],
    correct: "2",
    exptext: "✅ Nagarjuna founded Madhyamika, also called Shunyavada. 📌 Nagarjuna = Shunya. ❌ Yogachara was founded by others."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Post_Mauryan_Empire/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a Kushan gold dinar, a carved Gandhara Buddha head and a weathered Satavahana stone pillar" },
  "images/General_Awareness/Ancient_India/Post_Mauryan_Empire/1.png": { t: "fig", about: "Chain of three arrows: Pushyamitra kills Brihadratha, Vasudev kills Devbhooti, Simuka kills Susarman; labels Maurya, Shunga, Kanva, Satavahana." },
  "images/General_Awareness/Ancient_India/Post_Mauryan_Empire/2.png": { t: "fig", about: "Ladder of Satavahana rulers: Simuka, Satakarni I, Hala, Gautamiputra Satakarni (106–130 AD), Vasisthiputra Pulumavi (130–154 AD)." },
  "images/General_Awareness/Ancient_India/Post_Mauryan_Empire/3.png": { t: "fig", about: "Two columns: Gandhara (blue-black stone, realistic, Buddha) versus Mathura (red stone, idealistic, Buddhist Jain Brahmin)." }
});

/* CHANGE LOG
   - 6.2: dates written as 73 BC – 30 BC (book heading says 75 BC, which overlaps the Shunga end of 73 BCE).
   - 6.3: end date written as 250 AD (book heading says 250 BC).
   - 6.3: Pulumavi–Rudradaman conflict written neutrally (book says Pulumavi defeated Rudradaman twice; the Junagadh inscription says Rudradaman defeated a Satakarni twice and spared him).
   - 6.6: Rudradaman I dates kept as 130–150 AD (the book gives 130–152 AD in one line).
*/
