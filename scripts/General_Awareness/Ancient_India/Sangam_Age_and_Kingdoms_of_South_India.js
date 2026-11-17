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

/* Field: General_Awareness · Subject: Ancient_India · Chapter: Sangam_Age_and_Kingdoms_of_South_India · 12 concept pages (+ overview) · 42 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Sangam Age and Kingdoms of South India",
    thumb: {
      image: "images/General_Awareness/Ancient_India/Sangam_Age_and_Kingdoms_of_South_India/thumbnail.png",
      banner: "ANCIENT INDIA 2026",
      line1: "SOUTH INDIA",
      line2: "SANGAM TO CHOLAS",
      line3: "FULL CHAPTER",
      badge: "FULL CLASS",
      ribbon: "KINGS • TEMPLES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Sangam Age & Kingdoms of South India | Ancient India for all exams",
      altTitles: ["Sangam Age, Pallavas, Chalukyas and Cholas in One Class", "South Indian Kingdoms Made Simple for SSC, UPSC and Railways"],
      description: "Sangam Age and the Kingdoms of South India is one of the most asked chapters of Ancient India. In this class we learn it step by step, like a story.\n\n📌 IN THIS CLASS\n✅ Sangams, Tamil literature and the three Sangam kingdoms\n✅ Pallavas, Chalukyas and Rashtrakutas\n✅ Imperial Cholas, their rulers and administration\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#AncientIndia #SangamAge #Cholas",
      tags: ["sangam age", "sangam age for all exams", "kingdoms of south india", "chola dynasty", "pallava dynasty", "chalukya dynasty", "rashtrakuta dynasty", "ancient india history", "ancient india tricks", "sangam literature", "three sangams", "chera chola pandya", "imperial cholas", "chola administration", "rajaraja chola", "rajendra chola", "pulakeshin ii", "mahabalipuram temples", "india gk for competitive exams", "history for SSC CGL", "history for UPSC", "history for railways exam", "history mcq for all exams", "south india history notes", "tricks"],
      hashtags: ["AncientIndia", "SangamAge", "Cholas"],
      thumbText: "SANGAM AGE TO IMPERIAL CHOLAS",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🏯 New class is live: Sangam Age and Kingdoms of South India. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Ancient India — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>step-by-step class on the Sangam Age and the great kingdoms of South India</u>: the Cheras, Cholas and Pandyas, then the Pallavas, Chalukyas, Rashtrakutas and the Imperial Cholas. Every exam asks questions from this chapter, so we will go slowly and learn the names, dates and places in a clear order.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>12</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>42</b><span>Questions</span></div>
        <div class="cp-stat"><b>~66 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Sangam Period — Sangams &amp; Literature</b><br>What the Sangams were, who led them, and which books were written. We learn the great Tamil epics and the only book that survived.</li>
        <li><b>The Three Sangam Kingdoms</b><br>The Chola, Chera and Pandya kingdoms, their symbols, capitals and most important kings.</li>
        <li><b>Administration, Cities &amp; Society</b><br>How the Sangam kingdoms were ruled, which officials worked for the king, and how taxes were collected.</li>
        <li><b>Major Sangam Cities</b><br>The capitals and the ports where Indian goods were sold to the Roman world.</li>
        <li><b>Social &amp; Religious System</b><br>The social classes, the position of women, the chief god Murugan, and the trade with the Yavanas.</li>
        <li><b>Samvats, Pallava Lines &amp; Temple Stages</b><br>The old calendars of India and the four stages of early South Indian temple building.</li>
        <li><b>Pallavas of Kanchi</b><br>The Pallava kings, their wars with the Chalukyas, their temples and the Bhakti movement.</li>
        <li><b>Chalukyas</b><br>The three branches of the Chalukyas, the mighty Pulakeshin II and the art style called Vesara.</li>
        <li><b>Rashtrakutas</b><br>The kings who built the Kailash temple at Ellora, and the scholars of their court.</li>
        <li><b>Chola Empire (Imperial Cholas)</b><br>From Vijayalaya to Rajendra III: the wars, the ships and the grand temples.</li>
        <li><b>Chola administration &amp; society</b><br>How the Cholas ruled their villages, how their army worked, and the books written in their time.</li>
        <li><b>High-Yield Extras and Exam Traps</b><br>The facts that are asked again and again, and the pairs of names that students often mix up.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on Sangam literature, Chola administration, temples and famous battles come in almost every history paper, and the names are easy to mix up, so learning them in order saves marks.</div>
    `
  },
  2: {
    type: "concept", icon: "📜", accent: "#f59e0b", pauseTimer: true,
    title: "Sangam Period — Sangams & Literature",
    html: `
      <p class="cp-lead"><b>Tamilakam</b> (also called Tamilaham) was the southernmost part of India, with the sea on <b>three sides</b>. The word <b>Sangam</b> means a union of Tamil poets, and what they wrote is called <u>Sangam Literature</u>.</p>
      <table><thead><tr><th>Sangam</th><th>Chairman</th><th>Pandya kings who gave support</th><th>Venue</th><th>Members</th></tr></thead><tbody><tr><td>First</td><td>Agastya Rishi</td><td>89 kings</td><td>Madurai</td><td>549</td></tr><tr><td>Second</td><td>Agastya</td><td>59 kings</td><td>Kapatapuram (Alavai)</td><td>59</td></tr><tr><td>Third</td><td>Nakkirar</td><td>49 kings</td><td>Madurai</td><td>49</td></tr></tbody></table>
      <p class="cp-lead">Tradition says the first Sangam lasted <b>4,440 years</b>. Of all the books of the Second Sangam, only one survived. It is the <b>Tolkappiyam</b>, a book of Tamil grammar written by Tolkappiyar, a disciple of Agastya. It also divides the Tamil land into <b>five tinais</b>, which are five types of region.</p>
      <table><thead><tr><th>Book</th><th>Writer</th><th>Remember</th></tr></thead><tbody><tr><td>Thirukkural</td><td>Thiruvalluvar</td><td>A book of wise sayings</td></tr><tr><td>Shilappadikaram</td><td>Ilangoadigal, brother of the Chera king Shenguttuvan</td><td>Hero Kovalan, heroine Kannagi</td></tr><tr><td>Manimekhalai</td><td>Seethalaisattanar, a Buddhist merchant of Madurai</td><td>Named after the daughter of Kovalan and Madhavi</td></tr><tr><td>Jivakachintamani</td><td>Tiruttakkadevar, a Jain</td><td>Hero Jeevak</td></tr></tbody></table>
      <p class="cp-lead">The <b>five great epics</b> are Shilappadikaram, Manimekhalai, Jivakachintamani, Valayapati and Kundalakeshi. The two great collections of poems are <b>Ettutogai</b> (the Eight Anthologies) and <b>Pattupattu</b> (the Ten Idylls).</p>
      <div class="cp-note trap">Thirukkural is a very famous book, but it is not one of the five great epics.</div>
      <div class="cp-note exam">Examiners often ask who wrote Shilappadikaram, and which book survived from the Second Sangam.</div>
    `
  },
  3: {
    questext: "Which book is the only one that survived from the Second Sangam?",
    options: ["Shilappadikaram", "Tolkappiyam", "Thirukkural", "Manimekhalai"],
    correct: "2",
    exptext: "✅ The answer is Tolkappiyam, a Tamil grammar book. 📌 Think of \"Tolkappiyar, the grammar teacher, saved the grammar\". ❌ Shilappadikaram is wrong because it is an epic written later and not the survivor of the Second Sangam."
  },
  4: {
    questext: "The epic Shilappadikaram was written by Ilangoadigal. He was the brother of which Chera king?",
    options: ["Shenguttuvan", "Udiyanjeral", "Nedujeliyan", "Karikala"],
    correct: "1",
    exptext: "✅ The answer is Shenguttuvan, the most famous Chera king. 📌 The poet and the king were brothers, and the epic tells of Kannagi, whom Shenguttuvan honoured. ❌ Nedujeliyan is wrong because he was a Pandya king, and Karikala was a Chola."
  },
  5: {
    questext: "Which of the following is NOT one of the five great Tamil epics?",
    options: ["Valayapati", "Kundalakeshi", "Thirukkural", "Jivakachintamani"],
    correct: "3",
    exptext: "✅ Thirukkural is the answer because it is a book of wise sayings, not an epic. 📌 The five epics end with Shilappadikaram, Manimekhalai, Jivakachintamani, Valayapati and Kundalakeshi. ❌ Jivakachintamani is wrong because it is a real epic written by a Jain poet."
  },
  6: {
    type: "concept", icon: "🐯", accent: "#22c55e", pauseTimer: true,
    title: "The Three Sangam Kingdoms",
    html: `
      <p class="cp-lead">Three kingdoms ruled the far south in the Sangam Age: the <b>Chola</b>, the <b>Chera</b> and the <b>Pandya</b>. Each had its own royal symbol, which is a favourite exam point.</p>
      <table><thead><tr><th>Kingdom</th><th>Symbol</th><th>Capital</th><th>Area or fame</th></tr></thead><tbody><tr><td>Chola</td><td>Tiger</td><td>Uraiyur, later Puhar (Kaveripattinam)</td><td>Between the rivers Pennar and Vellaru; also called Cholamandalam (Coromandel)</td></tr><tr><td>Chera</td><td>Bow</td><td>Vanji (also written Vaji or Karaiyur)</td><td>Konkan, Malabar, north Travancore and Kochi</td></tr><tr><td>Pandya</td><td>Carp fish</td><td>Madurai</td><td>Famous for pearls</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Sangam_Age_and_Kingdoms_of_South_India/1.png" alt="Three kingdoms with their symbols" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Kingdom</th><th>Important rulers</th></tr></thead><tbody><tr><td>Chola</td><td>Elara conquered Sri Lanka in the second century before the Common Era. Karikala (about the year 190) was the greatest Sangam Chola. He founded the coastal capital Puhar and knew the 7 musical notes.</td></tr><tr><td>Chera</td><td>Udiyanjeral (about 130) was the first king and built a large cookhouse. Shenguttuvan (about 180), the "Red Chera", began Pattini Puja, the worship of Kannagi. Saiyye (about 210) was the last ruler and was beaten by the Pandya king Nedujeliyan.</td></tr><tr><td>Pandya</td><td>Nediyon was the first ruler and Nallivakodan the last of the Sangam era. Nedujeliyan (about 210) was the first powerful ruler and sent an envoy to the Roman emperor Augustus.</td></tr></tbody></table>
      <p class="cp-lead">The Chera kingdom was called <b>Keralaputra</b> in the inscriptions of Ashoka. The Greek writer Megasthenes first mentioned the Pandya land and called it <b>Mabar</b>. After Karikala, the Chola power became weak until the third and fourth centuries, and it rose again in the middle of the ninth century under Vijayalaya.</p>
      <div class="cp-note trap">Karikala is a Chola and Shenguttuvan is a Chera. Students often swap the two because both are very famous.</div>
      <div class="cp-note exam">Remember the symbols as Chola Tiger, Chera Bow, Pandya Carp fish.</div>
    `
  },
  7: {
    questext: "Which Sangam Chola king founded the coastal capital Puhar and was an expert in seven musical notes?",
    options: ["Nedujeliyan", "Shenguttuvan", "Udiyanjeral", "Karikala"],
    correct: "4",
    exptext: "✅ The answer is Karikala, the greatest Sangam Chola. 📌 Karikala and Kaveripattinam both go with the Chola tiger. ❌ Shenguttuvan is wrong because he was a Chera, famous for starting the worship of Kannagi."
  },
  8: {
    questext: "Statement 1: The carp fish was the Pandya symbol. Statement 2: Megasthenes called the Pandya land Mabar. Statement 3: The Chera king Saiyye defeated the Pandya king Nedujeliyan. Which statements are correct?",
    options: ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"],
    correct: "1",
    exptext: "✅ Statements 1 and 2 are correct. 📌 Saiyye was the last Chera ruler, so he was the one who lost. ❌ Statement 3 is wrong because Nedujeliyan beat Saiyye and not the other way round."
  },
  9: {
    questext: "Which Pandya ruler sent an envoy to the Roman emperor Augustus?",
    options: ["Nediyon", "Nallivakodan", "Nedujeliyan", "Saiyye"],
    correct: "3",
    exptext: "✅ The answer is Nedujeliyan, the first powerful Pandya ruler. 📌 Nedujeliyan reached all the way to Rome. ❌ Saiyye is wrong because he was a Chera king who was beaten by Nedujeliyan."
  },
  10: {
    questext: "Which Chola king of the second century before the Common Era is known for conquering Sri Lanka?",
    options: ["Karikala", "Elara", "Vijayalaya", "Rajaraja I"],
    correct: "2",
    exptext: "✅ The answer is Elara, an early Chola king. 📌 Elara came long before the Imperial Cholas. ❌ Rajaraja I is wrong because he lived about twelve hundred years later and ruled the Imperial Chola empire."
  },
  11: {
    type: "concept", icon: "🏛️", accent: "#3b82f6", pauseTimer: true,
    title: "Administration, Cities & Society",
    html: `
      <p class="cp-lead">Sangam rulers followed the Brahmins, who held the highest rights in the kingdom. A death in battle was thought to be a noble death, and this is called <b>martyrdom</b>.</p>
      <p class="cp-lead">The land was divided into units from large to small: <b>Mandalam</b> (state), <b>Nadu</b> (province), <b>Ur</b> or <b>Perur</b> (town), <b>Sirur</b> (small village) and <b>Mudur</b> (old village).</p>
      <table><thead><tr><th>Word</th><th>Meaning</th></tr></thead><tbody><tr><td>Avai</td><td>Village assembly</td></tr><tr><td>Pattinam</td><td>Coastal town</td></tr><tr><td>Salai</td><td>Road</td></tr><tr><td>Teru</td><td>Street</td></tr><tr><td>Mannaram</td><td>A hall that was important in administration</td></tr></tbody></table>
      <table><thead><tr><th>Officials</th><th>Work</th></tr></thead><tbody><tr><td>Amaichaar</td><td>Minister</td></tr><tr><td>Purohitar</td><td>Priest of the king</td></tr><tr><td>Senapatiyar</td><td>Army commander</td></tr><tr><td>Dutaar</td><td>Ambassador</td></tr><tr><td>Orrar</td><td>Spy</td></tr></tbody></table>
      <p class="cp-lead">The king earned money from several taxes. <b>Iray</b> was the land tax, <b>Ulgu</b> or <b>Shungam</b> was the tax on goods at the border, <b>Kudmai</b> or <b>Padu</b> was another tax, and <b>Eradu</b> was money taken by force.</p>
      <div class="cp-note tip">Learn the settlement ladder Mandalam, Nadu, Ur, Sirur, Mudur in order, because exams may ask you to arrange it.</div>
    `
  },
  12: {
    questext: "Which is the correct order of units in Sangam administration, from the largest to the smallest?",
    options: ["Nadu, Mandalam, Ur, Sirur", "Mandalam, Ur, Nadu, Mudur", "Ur, Nadu, Mandalam, Mudur", "Mandalam, Nadu, Ur, Mudur"],
    correct: "4",
    exptext: "✅ The correct order is Mandalam, Nadu, Ur, Mudur. 📌 It goes state, province, town, old village. ❌ Nadu first is wrong because a Mandalam, which means a state, is larger than a Nadu, which is a province."
  },
  13: {
    questext: "Which Tamil word means the village assembly?",
    options: ["Pattinam", "Salai", "Teru", "Avai"],
    correct: "4",
    exptext: "✅ Avai means the village assembly. 📌 Avai is the place where people meet and talk. ❌ Pattinam is the tempting wrong option, but it means a coastal town."
  },
  14: {
    questext: "In Sangam administration, which official was called an Orrar?",
    options: ["A spy", "An ambassador", "A commander", "A minister"],
    correct: "1",
    exptext: "✅ An Orrar was a spy of the king. 📌 Think of \"Orrar, the one who watches over\". ❌ Dutaar is the tempting wrong choice, but a Dutaar was an ambassador."
  },
  15: {
    type: "concept", icon: "🏙️", accent: "#ec4899", pauseTimer: true,
    title: "Major Sangam Cities",
    html: `
      <p class="cp-lead">The Sangam kingdoms had busy capitals and ports. The table below shows the main cities and the kingdoms that owned them.</p>
      <table><thead><tr><th>City</th><th>Kingdom</th><th>Importance</th></tr></thead><tbody><tr><td>Uraiyur</td><td>Chola</td><td>Capital and a centre of cotton cloth</td></tr><tr><td>Puhar (Kaveripattinam)</td><td>Chola</td><td>Coastal capital and port</td></tr><tr><td>Madurai</td><td>Pandya</td><td>Capital</td></tr><tr><td>Korkai</td><td>Pandya</td><td>Coastal capital</td></tr><tr><td>Vanji (Karaiyur)</td><td>Chera</td><td>Capital</td></tr><tr><td>Mushiri (Muziris)</td><td>Chera</td><td>Famous port</td></tr><tr><td>Tirukkamuliyar</td><td>All three</td><td>Meeting point of the three kingdoms</td></tr></tbody></table>
      <p class="cp-lead">The Chera kingdom was on the west coast, so its ports opened to the Roman world. The west coast ports named in the notes are <b>Naura, Tondi, Mushiri and Nelcynda</b>.</p>
      <div class="cp-note trap">Puhar is a Chola city, while Korkai is a Pandya city. Both are on the coast, so students often mix them up.</div>
      <div class="cp-note remember">Chola has Uraiyur and Puhar, Pandya has Madurai and Korkai, and Chera has Vanji and Mushiri.</div>
    `
  },
  16: {
    questext: "Which Sangam city was the capital of the Cholas and also a centre of cotton cloth?",
    options: ["Korkai", "Madurai", "Uraiyur", "Mushiri"],
    correct: "3",
    exptext: "✅ The answer is Uraiyur. 📌 Chola goes with Uraiyur and Puhar. ❌ Madurai is wrong because it was the capital of the Pandyas."
  },
  17: {
    questext: "Which place was the meeting point of the three Sangam kingdoms?",
    options: ["Tirukkamuliyar", "Karaiyur", "Puhar", "Korkai"],
    correct: "1",
    exptext: "✅ The answer is Tirukkamuliyar, where all three kingdoms met. 📌 The long name for the place where all three came together is easy to remember. ❌ Karaiyur is wrong because it belongs only to the Chera kingdom."
  },
  18: {
    questext: "Which pair of city and description is correct?",
    options: ["Puhar, a Pandya port", "Korkai, a Pandya coastal capital", "Mushiri, a Chola capital", "Madurai, a Chera capital"],
    correct: "2",
    exptext: "✅ Korkai was a coastal capital of the Pandyas. 📌 Pandya has two cities: Madurai inland and Korkai on the coast. ❌ Puhar is wrong because it was a Chola port."
  },
  19: {
    type: "concept", icon: "🛕", accent: "#8b5cf6", pauseTimer: true,
    title: "Social & Religious System",
    html: `
      <p class="cp-lead">Sangam society had several groups, and women were treated well. People worshipped many gods, and the sea trade with foreign lands made the south rich.</p>
      <table><thead><tr><th>Group</th><th>Meaning</th></tr></thead><tbody><tr><td>Arasar</td><td>Rulers</td></tr><tr><td>Shuddu</td><td>Brahmins, as given in the notes</td></tr><tr><td>Vellalar</td><td>Farmers</td></tr><tr><td>Venigar</td><td>Traders</td></tr><tr><td>Pulaiyan</td><td>Craftsmen</td></tr></tbody></table>
      <p class="cp-lead">Brahmins held the highest rank after the king. Women had a good condition. Court dancers and singers were called <b>Panar</b> and <b>Vidalier</b>. However, <b>Sati</b> was common and widows led a sad life.</p>
      <p class="cp-lead">The chief god was <b>Murugan</b>, who is also called Subrahmanyam. His symbol was the <b>Rooster</b>, and his dance was the <b>Velnadal</b>.</p>
      <p class="cp-lead"><b>Yavana</b> was the name for the Greeks and the Romans. Two foreign books, the <b>Periplus of the Erythraean Sea</b> (first century) and the writings of <b>Ptolemy</b>, describe the ports Muziris, Tondi, Korkai and Puhar. <b>Pepper</b> was the star export and was called <b>Yavanapriya</b>, meaning "dear to the Yavanas". The Romans paid in <b>gold coins</b> and had a trading station at <b>Arikamedu</b> (Puducherry).</p>
      <div class="cp-note exam">Yavana means Greeks and Romans, and pepper was the star export.</div>
    `
  },
  20: {
    questext: "Who was the chief god of the Sangam people, and what was his symbol?",
    options: ["Murugan and the Peacock", "Murugan and the Bull", "Murugan and the Rooster", "Vishnu and the Elephant"],
    correct: "3",
    exptext: "✅ The chief god was Murugan, and the symbol was the Rooster. 📌 Murugan is also called Subrahmanyam and his dance is Velnadal. ❌ The Peacock sounds right because it is often linked to Murugan, but the Sangam notes name the Rooster as his symbol."
  },
  21: {
    questext: "In Sangam texts, what does the word Yavana stand for?",
    options: ["The Greeks and the Romans", "The Arabs only", "The Chinese traders", "The Persians only"],
    correct: "1",
    exptext: "✅ Yavana means the Greeks and the Romans. 📌 The Yavanas bought pepper, so pepper was called Yavanapriya. ❌ The Arabs only is wrong because Arab traders are not what the word names in these texts."
  },
  22: {
    questext: "Which place in Puducherry was a Roman trading station in the Sangam Age?",
    options: ["Muziris", "Korkai", "Tondi", "Arikamedu"],
    correct: "4",
    exptext: "✅ Arikamedu in Puducherry was a Roman trading station. 📌 Arikamedu is the Roman name to remember for Puducherry. ❌ Muziris is wrong because it was a Chera port on the west coast."
  },
  23: {
    type: "concept", icon: "🗓️", accent: "#14b8a6", pauseTimer: true,
    title: "Samvats, Pallava Lines & Temple Stages",
    html: `
      <p class="cp-lead">A <b>Samvat</b> is an old Indian calendar that starts from a famous event. The Pallava kings also built temples in four steps, and each step has its own style name.</p>
      <table><thead><tr><th>Samvat</th><th>Start (year, Common Era unless stated)</th><th>Founded by</th><th>Note</th></tr></thead><tbody><tr><td>Vikram Samvat</td><td>57 before the Common Era</td><td>Vikramaditya of Ujjain (or the Malwa Republic)</td><td>Renamed by Chandragupta II</td></tr><tr><td>Shaka Samvat</td><td>78</td><td>Kanishka, after defeating the Shakas</td><td>National calendar; begins on 22 March</td></tr><tr><td>Kalachuri-Chedi Samvat</td><td>248 to 249</td><td>Ishwarsen of Western India</td><td>Used by the Kalachuri rulers</td></tr><tr><td>Gupta Samvat</td><td>319</td><td>Chandragupta I</td><td>Same as the Vallabhi Samvat</td></tr><tr><td>Harsha Samvat</td><td>606</td><td>Harshavardhan</td><td>Starts with his coming to the throne</td></tr></tbody></table>
      <table><thead><tr><th>Pallava line (years, Common Era)</th><th>Charters</th><th>Key rulers</th><th>Temple stage</th><th>Features</th></tr></thead><tbody><tr><td>First Line (250 to 350)</td><td>Prakrit</td><td>Sivaskandavarman, Vijayaskandavarman</td><td>Stage 1 — Mahendra Style</td><td>Rock-cut cave temples</td></tr><tr><td>Second Line (350 to 550)</td><td>Sanskrit</td><td>Vishnugopa, defeated by Samudragupta</td><td>Stage 2 — Mamalla Style</td><td>Monolithic rathas and mandapas; Five Rathas (Pancha Pandava)</td></tr><tr><td>Third Line (575 to the 9th century)</td><td>Sanskrit and Tamil</td><td>Simhavishnu, who destroyed the Kalabhras</td><td>Stage 3 — Rajasimha Style</td><td>Structural sandstone temples: Kailasanatha (Kanchi) and the Shore temple</td></tr><tr><td>Last stage</td><td>—</td><td>Imperial Cholas took Tondaimandalam in the early 10th century</td><td>Stage 4 — Aparajita Style</td><td>Final Dravidian stage</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Sangam_Age_and_Kingdoms_of_South_India/2.png" alt="Four steps of Pallava temple building" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The temples grew from simple caves cut into rock, to carved rathas, to temples built stone by stone, and finally to the Aparajita style.</p>
      <div class="cp-note trap">A cave temple is the first stage, not the last. The Shore temple and Kailasanatha belong to the third stage, the Rajasimha style.</div>
      <div class="cp-mnemonic">Mahendra cuts caves, Mamalla carves rathas, Rajasimha builds stone, Aparajita ends.</div>
    `
  },
  24: {
    questext: "The Shaka Samvat, which is India's national calendar and began in the year 78, is linked to which ruler?",
    options: ["Chandragupta I", "Harshavardhan", "Vikramaditya of Ujjain", "Kanishka"],
    correct: "4",
    exptext: "✅ The Shaka Samvat is linked to Kanishka. 📌 Shaka goes with Kanishka, and it starts on 22 March. ❌ Vikramaditya is wrong because his name goes with the Vikram Samvat of 57 before the Common Era."
  },
  25: {
    questext: "Which stage of Pallava temple building produced the monolithic Five Rathas at Mamallapuram?",
    options: ["Mahendra Style", "Mamalla Style", "Rajasimha Style", "Aparajita Style"],
    correct: "2",
    exptext: "✅ The Five Rathas belong to the Mamalla Style, which is the second stage. 📌 Mamalla is another name of Narasimhavarman I. ❌ Rajasimha is wrong because that stage used built stone temples such as the Shore temple."
  },
  26: {
    questext: "The Gupta Samvat, which began in the year 319, is also known as which era?",
    options: ["Harsha Samvat", "Kalachuri-Chedi Samvat", "Vallabhi Samvat", "Shaka Samvat"],
    correct: "3",
    exptext: "✅ The Gupta Samvat is the same as the Vallabhi Samvat. 📌 Two names, one calendar. ❌ Harsha Samvat is wrong because it began later, in the year 606."
  },
  27: {
    type: "concept", icon: "🏯", accent: "#ef4444", pauseTimer: true,
    title: "Pallavas of Kanchi",
    html: `
      <p class="cp-lead">After the Sangam Age, the <b>Kalabhra</b> dynasty ruled South India for about 250 years. Then the <b>Pallavas</b>, who were earlier feudatories, which means smaller rulers, of the Satavahanas, rose in <b>Tondaimandalam</b>. Their capital was <b>Kanchipuram</b>, and they supported Brahminism.</p>
      <table><thead><tr><th>Ruler</th><th>Years</th><th>Key facts</th></tr></thead><tbody><tr><td>Simhavishnu</td><td>about 565 to 600</td><td>Real founder of the line. The poet Bharavi (Kiratarjuniyam) was in his court.</td></tr><tr><td>Mahendravarman I</td><td>600 to 630</td><td>Started the Chalukya–Pallava rivalry. Pulakeshin II took his northern lands, but not Kanchi. He changed from Jainism to Shaivism through Thirunavukkarasar (Appar), and wrote the play Mattavilasa Prahasanam.</td></tr><tr><td>Narasimhavarman I</td><td>630 to 668</td><td>The greatest Pallava, called Mamalla, meaning the great wrestler. He beat Pulakeshin II at Manimangalam and Vatapikonda, sent a naval expedition to Sri Lanka, and founded the port Mamallapuram. Hiuen Tsang visited Kanchipuram.</td></tr><tr><td>Mahendravarman II</td><td>668 to 670</td><td>Killed by the Chalukya king Vikramaditya I.</td></tr><tr><td>Parameshvaravarman I</td><td>670 to 700</td><td>Lost Kanchi to Vikramaditya I, but finally beat him.</td></tr><tr><td>Narasimhavarman II (Rajasimha)</td><td>700 to 728</td><td>Built the Shore temple and the Kailasanatha temple. The scholar Dandin was in his court.</td></tr><tr><td>Aparajita</td><td>Last Pallava</td><td>Defeated by the Chola king Aditya I.</td></tr></tbody></table>
      <p class="cp-lead">The kingdom was divided into <b>Mandalam</b> (ruled by the Yuvaraja, the crown prince), then <b>Kottam</b> or <b>Vishaya</b>, then <b>Nadu</b> (looked after by the Nattar), and finally <b>Ur</b>. Land gifts were called <b>Devadhana</b> (to temples) and <b>Brahmadeya</b> (to Brahmins). The courts were <b>Dharmasena</b> (the highest), <b>Adikarnas</b> (towns) and <b>Karnas</b> (villages).</p>
      <p class="cp-lead">There were four varnas, and Brahmin villages were called <b>Agraharam</b>. Shudras also included the groups called Pulayar and Chandala. The <b>Bhakti movement</b> grew strong: the Shaivite saints were the <b>Nayanars</b> (their hymns are the <b>Devaram</b>), and the Vaishnavite saints were the <b>Alvars</b> (their hymns are the <b>Nalayiradivyaprabandam</b>). Buddhism and Jainism became weaker.</p>
      <div class="cp-note trap">The Shore temple and the Kailasanatha temple of Kanchi were built by Narasimhavarman II, not by Narasimhavarman I.</div>
    `
  },
  28: {
    questext: "Which Pallava king, known as Mamalla, defeated Pulakeshin II and founded the port of Mamallapuram?",
    options: ["Narasimhavarman I", "Mahendravarman I", "Narasimhavarman II", "Simhavishnu"],
    correct: "1",
    exptext: "✅ The answer is Narasimhavarman I, the greatest Pallava king. 📌 Mamalla means great wrestler, and Mamallapuram is named after him. ❌ Mahendravarman I is wrong because he lost his northern lands to Pulakeshin II."
  },
  29: {
    questext: "Which one of the following pairs is NOT correct?",
    options: ["Mahendravarman I and the play Mattavilasa Prahasanam", "Simhavishnu and the poet Bharavi", "Narasimhavarman I and the Kailasanatha temple at Kanchi", "Narasimhavarman II and the Shore temple"],
    correct: "3",
    exptext: "✅ Pair 3 is wrong because the Kailasanatha temple was built by Narasimhavarman II. 📌 Rajasimha is Narasimhavarman II and the stone temples are his work. ❌ Pair 4 is the tempting choice, but it is correct."
  },
  30: {
    questext: "Which pair about the Bhakti movement in the Pallava period is correct?",
    options: ["Nayanars worshipped Vishnu", "Alvars worshipped Shiva", "Alvars sang the Devaram", "Nayanars sang the Devaram and worshipped Shiva"],
    correct: "4",
    exptext: "✅ The Nayanars were Shaivite saints who sang the Devaram. 📌 Nayanars go with Shiva and the Alvars go with Vishnu. ❌ The Alvars are wrong in options 2 and 3 because they were Vaishnavite saints."
  },
  31: {
    questext: "Which Chola king defeated the last Pallava king Aparajita?",
    options: ["Vijayalaya", "Parantaka I", "Aditya I", "Rajaraja I"],
    correct: "3",
    exptext: "✅ The answer is Aditya I, who took Tondaimandalam. 📌 The Pallava line ended and the Cholas rose in the same time. ❌ Parantaka I is wrong because he was the son of Aditya I and ruled after him."
  },
  32: {
    type: "concept", icon: "🏔️", accent: "#0ea5e9", pauseTimer: true,
    title: "Chalukyas",
    html: `
      <p class="cp-lead">The Chalukyas came from <b>Karnataka</b> and had three branches: the <b>Badami</b> (Early), the <b>Eastern</b> (Vengi) and the <b>Kalyani</b> (Later) Chalukyas.</p>
      <table><thead><tr><th>Ruler</th><th>Years</th><th>Key facts</th></tr></thead><tbody><tr><td>Pulakeshin I</td><td>540 to 567</td><td>Founder. Capital Vatapi (Badami). Title Vallabheshwara. He performed the Ashvamedha.</td></tr><tr><td>Kirtivarman I</td><td>566 to 597</td><td>Called the first builder of Vatapi.</td></tr><tr><td>Pulakeshin II</td><td>610 to 642</td><td>Title Satyashraya. He beat Harshavardhan on the Narmada and Mahendravarman I. He was beaten by Narasimhavarman I, who sacked Vatapi.</td></tr><tr><td>Kirtivarman II</td><td>to 757</td><td>Last of the Badami line, beaten by Dantidurga.</td></tr><tr><td>Tailapa II</td><td>Later</td><td>Won independence for the Chalukyas of Kalyani.</td></tr><tr><td>Someshwara I</td><td>1043</td><td>Moved the capital from Manyakheta to Kalyani and drowned in the Tungabhadra.</td></tr><tr><td>Vikramaditya VI</td><td>Later</td><td>His court had Vilhan (Vikramankadevacharita) and Vigyaneshwar (Mitakshara).</td></tr><tr><td>Someshwara IV</td><td>1181 to 1189</td><td>Last ruler.</td></tr></tbody></table>
      <p class="cp-lead">The <b>Aihole inscription</b> was written by the court poet <b>Ravikirti</b>, who was a Jain. A painting at <b>Ajanta</b> shows a Persian embassy. The Chalukya art style is called <b>Vesara</b>, which the Rashtrakutas and Hoysalas later perfected. Famous temples are at <b>Aihole, Badami and Pattadakal</b>, and caves are at Ajanta, Ellora and Nasik.</p>
      <div class="cp-note trap">Pulakeshin II was beaten by the Pallava king Narasimhavarman I, but he is better known for defeating Harshavardhan.</div>
    `
  },
  33: {
    questext: "The Aihole inscription was composed by whom?",
    options: ["Bilhana", "Ravikirti", "Dandin", "Pampa"],
    correct: "2",
    exptext: "✅ Ravikirti, the court poet of Pulakeshin II, composed the Aihole inscription. 📌 Aihole goes with Ravikirti. ❌ Dandin is wrong because he lived at the Pallava court."
  },
  34: {
    questext: "Which Chalukya king of Kalyani moved the capital from Manyakheta to Kalyani in 1043?",
    options: ["Tailapa II", "Vikramaditya VI", "Someshwara IV", "Someshwara I"],
    correct: "4",
    exptext: "✅ The answer is Someshwara I. 📌 Remember 1043 with the first Someshwara. ❌ Tailapa II is wrong because he won independence earlier, but did not make the move."
  },
  35: {
    questext: "Pulakeshin II defeated Harshavardhan on the banks of which river?",
    options: ["Narmada", "Tungabhadra", "Krishna", "Kaveri"],
    correct: "1",
    exptext: "✅ The battle was on the Narmada. 📌 The Narmada is the natural border between North and South India. ❌ Tungabhadra is wrong because it is linked with Someshwara I, who drowned there."
  },
  36: {
    type: "concept", icon: "⛰️", accent: "#f97316", pauseTimer: true,
    title: "Rashtrakutas",
    html: `
      <p class="cp-lead">The Rashtrakutas were of <b>Kannada</b> origin and ruled from <b>Manyakheta</b>. They were the great rivals of the Pala and the Pratihara kings in North India.</p>
      <table><thead><tr><th>Ruler</th><th>Years</th><th>Key facts</th></tr></thead><tbody><tr><td>Dantidurga</td><td>735 to 756</td><td>Founder. He performed the Hiranya-garbha ritual, a symbolic birth as a Kshatriya, beat the Gurjaras (taking Malwa) and beat Kirtivarman II.</td></tr><tr><td>Krishna I</td><td>Later</td><td>Beat the Gangas and the Eastern Chalukyas, and built the monolithic Kailash temple at Ellora.</td></tr><tr><td>Amoghavarsha</td><td>814 to 878</td><td>Ruled for 64 years. A Jain, with Jinasena as his teacher. He wrote Kavirajamarga, the first Kannada poetic work.</td></tr><tr><td>Krishna III</td><td>Later</td><td>A later great king who fought the Cholas.</td></tr></tbody></table>
      <table><thead><tr><th>Scholar</th><th>Famous work</th></tr></thead><tbody><tr><td>Trivikrama</td><td>Nalachampu</td></tr><tr><td>Halayudha</td><td>Kavirahasya</td></tr><tr><td>Jinasena</td><td>Parsvabhudaya</td></tr><tr><td>Gunabhadra</td><td>Adipurana</td></tr><tr><td>Sakatayana</td><td>Amogavritti (grammar)</td></tr><tr><td>Viracharya</td><td>Ganitasaram (mathematics)</td></tr><tr><td>Pampa (greatest Kannada poet)</td><td>Vikramasenavijaya</td></tr><tr><td>Ponna</td><td>Santipurana</td></tr></tbody></table>
      <p class="cp-lead">The Rashtrakuta art is seen at Ellora, in the Kailasa temple of Krishna I, and at Elephanta near Mumbai. The Elephanta sculptures are <b>Trimurti, Nataraja, Gangadhara, Ardhanareshwara and Somaskanda</b>.</p>
      <div class="cp-note trap">Do not mix up the Kailash temple of Ellora, built by the Rashtrakutas, with the Kailasanatha temple of Kanchi, built by the Pallavas.</div>
    `
  },
  37: {
    questext: "Which Rashtrakuta king built the monolithic Kailash temple at Ellora?",
    options: ["Dantidurga", "Amoghavarsha", "Krishna I", "Krishna III"],
    correct: "3",
    exptext: "✅ The Kailash temple was built by Krishna I. 📌 Krishna built a temple for Shiva's mountain, Kailash. ❌ Amoghavarsha is wrong because he is famous for the book Kavirajamarga and not for this temple."
  },
  38: {
    questext: "Which Rashtrakuta king ruled for 64 years and is linked to the Kannada work Kavirajamarga?",
    options: ["Amoghavarsha", "Dantidurga", "Krishna I", "Krishna III"],
    correct: "1",
    exptext: "✅ The answer is Amoghavarsha, who ruled from 814 to 878. 📌 He was a Jain and his teacher was Jinasena. ❌ Dantidurga is wrong because he was the founder and ruled only for about twenty years."
  },
  39: {
    questext: "Which ritual did Dantidurga perform to show a symbolic rebirth as a Kshatriya?",
    options: ["Ashvamedha", "Hiranya-garbha", "Rajasuya", "Vajapeya"],
    correct: "2",
    exptext: "✅ Dantidurga performed the Hiranya-garbha ritual. 📌 Hiranya means gold, and the king is reborn from a golden pot. ❌ Ashvamedha is wrong because it was performed by the Chalukya king Pulakeshin I."
  },
  40: {
    type: "concept", icon: "👑", accent: "#a855f7", pauseTimer: true,
    title: "Chola Empire (Imperial Cholas)",
    html: `
      <p class="cp-lead">The <b>Imperial Cholas</b> rose in the <b>ninth century</b> with their capital at <b>Thanjavur</b>. Their power reached <b>Sri Lanka, the Maldives and the Malay Peninsula</b>, and their home region <b>Cholamandalam</b> lay between the Pennar and the Kaveri.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Ancient_India/Sangam_Age_and_Kingdoms_of_South_India/3.png" alt="Chola timeline" style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Ruler</th><th>Years</th><th>Key facts</th></tr></thead><tbody><tr><td>Vijayalaya</td><td>815</td><td>Founder. He took Tanjore from the Muttaraiyars. He built the Durga temple.</td></tr><tr><td>Aditya I</td><td>Later</td><td>Beat the last Pallava king Aparajita and took Tondaimandalam.</td></tr><tr><td>Parantaka I</td><td>Later</td><td>Took Madurai from the Pandya king Rajasimha II, so he was called Maduraikonda. He was beaten by the Rashtrakuta king Krishna III at Tokkolam in 949. His Uttaramerur inscriptions of 919 and 921 describe the Kudavolai election.</td></tr><tr><td>Rajaraja I</td><td>985 to 1014</td><td>Titles Mummudi Chola, Jayankonda and Sivapadasekara. He beat the Chera king Bhaskara Ravivarman, conquered north Sri Lanka and the Maldives, and was the first Chola to measure land for tax. He built the Brihadeshwara temple at Thanjavur in 1010.</td></tr><tr><td>Rajendra I</td><td>1014 onwards</td><td>Titles Mudikondan, Gangaikondan and Kadaram Kondan. He conquered all of Sri Lanka, beat the Pala king Mahipala I, built the city Gangaikondacholapuram, invaded Srivijaya (Sumatra, Java), and built the Nataraja temple at Chidambaram.</td></tr><tr><td>Rajadhiraja I</td><td>Later</td><td>Sacked Kalyani and took the title Vijayarajendra. He was killed at Koppam.</td></tr><tr><td>Rajendra II</td><td>Later</td><td>Beat Someshwara I at Kudal Sangamam.</td></tr><tr><td>Virarajendra I</td><td>Later</td><td>Beat the Chalukyas, and raised the Tungabhadra victory pillar. He died in 1070.</td></tr><tr><td>Adhirajendra</td><td>Last of the original Chola line</td><td>Overthrown.</td></tr><tr><td>Kulottunga I</td><td>1070 to 1120</td><td>Grandson of Rajendra I who began the Chola-Chalukya line. He sent a 72-person embassy to China, and was called Sungam Tavirtta because he ended tolls.</td></tr><tr><td>Kulottunga II</td><td>Later</td><td>Renovated the Nataraja temple.</td></tr><tr><td>Rajendra III</td><td>Last</td><td>Beaten by the Pandya king Jatavarman Sundarapandya II, and the empire passed to the Pandyas.</td></tr></tbody></table>
      <div class="cp-note trap">Rajaraja I built the Brihadeshwara temple at Thanjavur, while his son Rajendra I built Gangaikondacholapuram. The two names are often swapped.</div>
      <div class="cp-note exam">Tokkolam in 949 is the Rashtrakuta victory over Parantaka I, and Koppam is where Rajadhiraja I was killed.</div>
    `
  },
  41: {
    questext: "Vijayalaya, the founder of the Imperial Chola line, took Tanjore from whom?",
    options: ["Muttaraiyars", "Pallavas", "Pandyas", "Cheras"],
    correct: "1",
    exptext: "✅ Vijayalaya took Tanjore from the Muttaraiyars. 📌 Muttaraiyars lost the city and the Cholas rose. ❌ Pallavas is the tempting wrong option, but the last Pallava king was beaten later by Aditya I."
  },
  42: {
    questext: "Who beat the Chola king Parantaka I in the battle of Tokkolam in 949?",
    options: ["Dantidurga", "Amoghavarsha", "Krishna I", "Krishna III"],
    correct: "4",
    exptext: "✅ The Rashtrakuta king Krishna III won at Tokkolam. 📌 Tokkolam is the Cholas' sad defeat, and Krishna III is the winner. ❌ Krishna I is wrong because he lived earlier and built the Kailash temple."
  },
  43: {
    questext: "Which Chola king built the Brihadeshwara temple at Thanjavur in 1010?",
    options: ["Rajendra I", "Rajaraja I", "Kulottunga I", "Parantaka I"],
    correct: "2",
    exptext: "✅ Rajaraja I built the Brihadeshwara temple. 📌 Rajaraja the great, and the big temple of 1010. ❌ Rajendra I is wrong because his famous work is the city Gangaikondacholapuram."
  },
  44: {
    questext: "Which Chola king took the title Gangaikondan and built the city of Gangaikondacholapuram?",
    options: ["Rajendra I", "Rajendra II", "Rajadhiraja I", "Rajendra III"],
    correct: "1",
    exptext: "✅ The answer is Rajendra I, who beat the Pala king Mahipala I. 📌 Gangai means the Ganga, and he brought its water south. ❌ Rajendra III is wrong because he was the last Chola king and lost to the Pandyas."
  },
  45: {
    questext: "Which Chola king sent a 72-person embassy to China and was called Sungam Tavirtta?",
    options: ["Kulottunga II", "Virarajendra I", "Adhirajendra", "Kulottunga I"],
    correct: "4",
    exptext: "✅ The answer is Kulottunga I, who ruled from 1070 to 1120. 📌 Sungam Tavirtta means the one who ended tolls. ❌ Kulottunga II is wrong because he is known for renovating the Nataraja temple."
  },
  46: {
    type: "concept", icon: "🌾", accent: "#10b981", pauseTimer: true,
    title: "Chola administration & society",
    html: `
      <p class="cp-lead">The Chola king ruled by birth, in a <b>hereditary monarchy</b>. The empire was divided into <b>Mandalam</b> (ruled by a royal prince), then <b>Kottam</b> or <b>Valanadu</b> (under the Periyanattar), then <b>Nadu</b> (under the Nattar), and then <b>Kurram</b>. A town was called a <b>Nagaram</b> and was run by the <b>Nagarattar</b> council.</p>
      <table><thead><tr><th>Subject</th><th>Facts</th></tr></thead><tbody><tr><td>Revenue</td><td>The revenue department was <b>Puravuvarithinaikkalam</b>. <b>Ur nattam</b> was the village land. <b>Kadamai</b> (Kudimai) was about <b>one third</b> of the produce. The land unit was <b>Veli</b>. Rajaraja I was the first Chola to measure land for tax.</td></tr><tr><td>Army</td><td>Elephants, cavalry, infantry and a navy. Troops were called Kaikkolaperumpadai and the guards Velaikkarar. The Bay of Bengal was called a "Chola lake". Land given for bravery was <b>Rakta Kodangya</b>. Arabian horses were imported.</td></tr><tr><td>Village rule</td><td>Two bodies ran villages: the <b>Ur</b> (all villagers) and the <b>Sabha or Mahasabha</b> in Agrahara villages. Members were chosen by lottery, which is the <b>Kudavolai</b> (pot-ticket) system. Committees were the <b>Variyams</b>: Thottavariyam, Arivariyam, Ponvariyam, Samvatsar Variyam, Pancha Variyam and Puravuvari Variyam.</td></tr><tr><td>Society</td><td><b>Valangai</b> were the agricultural groups and <b>Idangai</b> were labourers and craftsmen. Slavery was limited, Sati and many wives were common, there was no purdah, and the Devadasi system came up.</td></tr></tbody></table>
      <table><thead><tr><th>Art or book</th><th>Writer or builder</th></tr></thead><tbody><tr><td>Brihadeshwara temple</td><td>Rajaraja I</td></tr><tr><td>Gangaikondacholapuram</td><td>Rajendra I</td></tr><tr><td>Sivakasintamani</td><td>Thiruthakkadevar</td></tr><tr><td>Ramayana in Tamil</td><td>Kamban</td></tr><tr><td>Periyapuranam</td><td>Sekkilar</td></tr><tr><td>Nalavenba</td><td>Pugalendi</td></tr><tr><td>Kalingattupparani</td><td>Jayankondar</td></tr><tr><td>Moovarula</td><td>Ottakuthar</td></tr></tbody></table>
      <div class="cp-note tip">The Dravidian style of temple building was perfected under the Cholas, and the Brihadeshwara temple is the best example.</div>
    `
  },
  47: {
    questext: "Which inscriptions of Parantaka I describe the Kudavolai, the pot-ticket election of village committees?",
    options: ["Aihole", "Hathigumpha", "Uttaramerur", "Junagadh"],
    correct: "3",
    exptext: "✅ The Uttaramerur inscriptions, dated 919 and 921, describe the Kudavolai. 📌 Uttaramerur is where the pot-ticket vote was done. ❌ Aihole is wrong because it is the inscription of the Chalukya king Pulakeshin II."
  },
  48: {
    questext: "About how much of the produce was usually taken as the Chola land revenue called Kadamai?",
    options: ["One fourth", "One third", "One half", "One sixth"],
    correct: "2",
    exptext: "✅ The Cholas usually took about one third of the produce. 📌 Remember \"Kadamai means one third\". ❌ One half is wrong because it is too heavy for a normal tax in the Chola records."
  },
  49: {
    questext: "In Chola society, which people mainly formed the Valangai group?",
    options: ["Agricultural groups", "Labourers and craftsmen", "Brahmin priests", "Foreign traders"],
    correct: "1",
    exptext: "✅ Valangai mainly means the agricultural groups. 📌 Valangai is the farmers' side. ❌ Labourers and craftsmen is the tempting wrong option, but these formed the opposite group called Idangai."
  },
  50: {
    type: "concept", icon: "📌", accent: "#e11d48", pauseTimer: true,
    title: "High-Yield Extras and Exam Traps",
    html: `
      <p class="cp-lead">This page collects facts that examiners love and the pairs of names that students often mix up.</p>
      <table><thead><tr><th>Subject</th><th>Fact</th></tr></thead><tbody><tr><td>UNESCO World Heritage sites</td><td>Mahabalipuram (1984), Pattadakal (1987), Ellora and Ajanta (1983), Elephanta (1987), Brihadeshwara (1987), and Gangaikondacholapuram and Darasuram Airavatesvara (2004).</td></tr><tr><td>Kailasa temple, Ellora</td><td>Cave 16, the largest monolithic rock-cut structure in the world, carved from the top down.</td></tr><tr><td>Virupaksha temple, Pattadakal</td><td>Built by Lokamahadevi, the queen of Vikramaditya II, for his win over the Pallavas.</td></tr><tr><td>Arab writers</td><td>Sulaiman (851) and Al-Masudi called the Rashtrakuta king "Balhara", one of the four greatest kings of the world.</td></tr></tbody></table>
      <table><thead><tr><th>Do not confuse</th><th>Correct pair</th></tr></thead><tbody><tr><td>Three Cholas</td><td>Sangam (Uraiyur or Puhar, Karikala); Imperial (Thanjavur, Vijayalaya); Chola-Chalukya (Kulottunga I to Rajendra III)</td></tr><tr><td>Chairmen of the Sangams</td><td>Agastya for the first and second, Nakkirar for the third</td></tr><tr><td>Keralaputra and Mabar</td><td>Keralaputra is the Chera land and Mabar is the Pandya land</td></tr><tr><td>Manimangalam</td><td>Narasimhavarman I beat Pulakeshin II</td></tr><tr><td>Tokkolam 949</td><td>Krishna III beat Parantaka I</td></tr><tr><td>Koppam</td><td>Rajadhiraja I was killed</td></tr><tr><td>Kudal Sangamam</td><td>Rajendra II beat Someshwara I</td></tr><tr><td>Shore and Kailasanatha temples</td><td>Built by Rajasimha, which is Narasimhavarman II</td></tr></tbody></table>
      <div class="cp-note trap">Kailasa at Ellora is Rashtrakuta and Kailasanatha at Kanchi is Pallava. They sound the same but belong to different dynasties.</div>
      <div class="cp-note remember">UNESCO sites in this chapter are Mahabalipuram, Pattadakal, Ellora, Ajanta, Elephanta, and the Great Living Chola Temples.</div>
    `
  },
  51: {
    questext: "The Kailasa temple at Ellora is which cave, and how was it carved?",
    options: ["Cave 10, carved from the bottom up", "Cave 12, carved from the side", "Cave 32, carved from the top down", "Cave 16, carved from the top down"],
    correct: "4",
    exptext: "✅ The Kailasa temple is Cave 16, carved from the top down. 📌 Sixteen and top to bottom. ❌ Cave 32 is wrong because it is a different cave number and not the great monolithic temple."
  },
  52: {
    questext: "The Virupaksha temple at Pattadakal was built by which queen?",
    options: ["Kannagi", "Madhavi", "Lokamahadevi", "Kundavai"],
    correct: "3",
    exptext: "✅ Queen Lokamahadevi built it, for the win of her husband Vikramaditya II over the Pallavas. 📌 Lokamahadevi and Virupaksha both start with L and V, which is a big name for a big temple. ❌ Kannagi is wrong because she is the heroine of Shilappadikaram, not a queen who built temples."
  },
  53: {
    questext: "Which of these temples is NOT part of the Great Living Chola Temples?",
    options: ["Brihadeshwara at Thanjavur", "Gangaikondacholapuram", "Airavatesvara at Darasuram", "Kailasa temple at Ellora"],
    correct: "4",
    exptext: "✅ The Kailasa temple at Ellora is Rashtrakuta, not Chola. 📌 Great Living Chola Temples are all in Tamil Nadu. ❌ Airavatesvara is the tempting wrong option, but it is a Chola temple at Darasuram."
  },
  54: {
    questext: "Arab writers Sulaiman and Al-Masudi called the Rashtrakuta king by which name?",
    options: ["Mabar", "Yavana", "Balhara", "Vallabheshwara"],
    correct: "3",
    exptext: "✅ The Arab writers called the Rashtrakuta king Balhara. 📌 Balhara goes with Rashtrakuta, and Mabar goes with the Pandya land. ❌ Mabar is wrong because Megasthenes used it for the Pandya land."
  },
  55: {
    questext: "Which Chola king was killed at the battle of Koppam?",
    options: ["Parantaka I", "Rajadhiraja I", "Rajendra II", "Virarajendra I"],
    correct: "2",
    exptext: "✅ Rajadhiraja I was killed at Koppam. 📌 Koppam is the place where this Chola king fell, and his brother Rajendra II won at Kudal Sangamam. ❌ Parantaka I is wrong because he lost at Tokkolam, but did not die in that battle."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Ancient_India/Sangam_Age_and_Kingdoms_of_South_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gold-lined Dravidian temple tower, a few real-looking old gold coins and a subtle palm-leaf manuscript" },
  "images/General_Awareness/Ancient_India/Sangam_Age_and_Kingdoms_of_South_India/1.png": { t: "fig", about: "Schematic, not a map: three columns with symbols. Chola — Tiger — Uraiyur and Puhar; Chera — Bow — Vanji; Pandya — Carp fish — Madurai." },
  "images/General_Awareness/Ancient_India/Sangam_Age_and_Kingdoms_of_South_India/2.png": { t: "fig", about: "Four steps going up like stairs: Stage 1 Mahendra Style — cave temples; Stage 2 Mamalla Style — rathas; Stage 3 Rajasimha Style — built temples; Stage 4 Aparajita Style — final stage." },
  "images/General_Awareness/Ancient_India/Sangam_Age_and_Kingdoms_of_South_India/3.png": { t: "fig", about: "A timeline line with five dots: Vijayalaya 815; Parantaka I 949 Tokkolam; Rajaraja I 1010 Brihadeshwara; Rajendra I Gangaikondacholapuram; Rajendra III last." }
});

/* CHANGE LOG
   - The first Sangam is written as lasting 4,440 years (the notes say 4,400), which is the number given in the traditional account.
   - The source spells the Chera capital as Vanji and as Vaji; both are shown as Vanji (also called Vaji or Karaiyur). The battle of 949 is spelled Tokkolam everywhere, although the map in the notes says Takkolam.
   - Vijayalaya's date of 815 is kept as printed in the notes; many other books give about 850, so please verify.
   - The 2-Minute Revision table of the notes is not built as a separate page; its facts are covered in the concept pages and questions.
*/