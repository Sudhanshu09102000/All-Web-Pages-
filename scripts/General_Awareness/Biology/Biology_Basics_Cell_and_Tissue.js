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

/* Field: General_Awareness · Subject: Biology · Chapter: Biology_Basics_Cell_and_Tissue · 16 concept pages (+ overview) · 57 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🧬", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Biology Basics, Cell and Tissue",
    thumb: {
      image: "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/thumbnail.png",
      banner: "SSC CGL GENERAL SCIENCE",
      line1: "BIOLOGY BASICS",
      line2: "CELL + TISSUE",
      line3: "IMPORTANT TERMS",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Biology Basics, Cell and Tissue | SSC CGL General Science",
      altTitles: ["Cell and Tissue Important Facts for SSC CGL", "Biology Terms and Cell Organelles Full Class"],
      description: "Biology gives you quick marks in General Science. In this class we learn the important terms of biology, the cell and its parts, cell division and the four animal tissues in very simple language.\n\n📌 IN THIS CLASS\n✅ Important terms of biology\n✅ Cell, organelles, osmosis and diffusion\n✅ Mitosis and meiosis\n✅ Epithelial, connective, muscular and nervous tissue\n✅ Practice questions\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Biology #GeneralScience",
      tags: ["biology for ssc cgl", "cell biology tricks", "cell organelles", "animal tissue", "important terms of biology", "general science ssc cgl", "mitosis and meiosis", "osmosis and diffusion", "biology mcq", "father of botany", "ssc cgl biology", "general awareness", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "important questions", "concept class", "one shot", "static GK", "Biology Basics Cell and Tissue", "Biology Basics Cell and Tissu", "B"],
      hashtags: ["SSCCGL", "Biology", "GeneralScience"],
      thumbText: "BIOLOGY: CELL + TISSUE",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🧬 New class is live: Biology Basics, Cell and Tissue. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Biology and branches\n00:00 Important terms\n00:00 The cell\n00:00 Cell division\n00:00 Tissues",
      playlist: "SSC CGL General Science — Biology Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the basics of Biology, the Cell and the Tissues of the body</u>. These topics give you many easy marks in General Science, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>16</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>57</b><span>Questions</span></div>
        <div class="cp-stat"><b>~89 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Biology and its branches</b><br>What biology is, why it has two main branches, and who the Father of Botany and the Father of Biology are.</li>
        <li><b>Important terms of Biology</b><br>The names of the sciences and the words that exam questions ask again and again, learned in three small groups.</li>
        <li><b>The Cell</b><br>What a cell is, who discovered it, the smallest and the largest cells, and the difference between prokaryotes and eukaryotes.</li>
        <li><b>Diffusion and Osmosis</b><br>How substances and water move in and out of a cell, and what happens when a plant cell loses water.</li>
        <li><b>Parts of the Cell</b><br>The jobs of the cell parts: ribosomes, endoplasmic reticulum, Golgi apparatus, lysosomes, mitochondria, plastids, vacuoles and the nucleus.</li>
        <li><b>Cell Division</b><br>How a cell divides by mitosis and by meiosis, and how to remember the stages.</li>
        <li><b>Tissues</b><br>The four kinds of animal tissue: epithelial, connective, muscular and nervous, with where each one is found.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Staff Selection Commission questions on the cell, its parts and the tissues come almost every year, and the same facts help you in the chapters on the human body.</div>
    `
  },
  2: {
    type: "concept", icon: "🧬", accent: "#22c55e", pauseTimer: true,
    title: "Biology and Its Two Main Branches",
    html: `
      <p class="cp-lead"><b>Biology</b> is the branch of science in which living beings are studied. <u>It has two main branches: Botany and Zoology.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/1.png" alt="Tree diagram: BIOLOGY at the top splits into two boxes, BOTANY (plants) and ZOOLOGY (anima" data-caption="Biology splits into two branches: Botany for plants and Zoology for animals." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Botany</b> is the study of the different parts and features of plants. <b>Zoology</b> is the study of the different parts and features of animals.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/2.png" alt="Theophrastus bust Father of Botany photo" data-caption="A bust of Theophrastus, the Greek thinker known as the Father of Botany." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Branch</th><th>What it studies</th><th>Father of the branch</th></tr></thead><tbody><tr><td>Botany</td><td>Plants</td><td>Theophrastus</td></tr><tr><td>Zoology</td><td>Animals</td><td>Aristotle</td></tr><tr><td>Biology (whole subject)</td><td>All living beings</td><td>Aristotle</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/3.png" alt="Aristotle marble bust museum photo" data-caption="A marble bust of Aristotle, who is called the Father of Biology and of Zoology." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Aristotle is the Father of Biology and also the Father of Zoology. The Father of Botany is Theophrastus, so do not mix the two names.</div>
      <div class="cp-note exam">Questions often ask only for the name of the father of a branch, so learn the two names well: Theophrastus for plants, Aristotle for animals and for all of biology.</div>
      <div class="cp-mnemonic">Theo for plants, Aristotle for animals and all of biology.</div>
    `
  },
  3: {
    questext: "Who is known as the Father of Botany?",
    options: ["Aristotle", "Theophrastus", "Linnaeus", "Robert Hooke"],
    correct: "2",
    exptext: "✅ Theophrastus is the Father of Botany. 📌 Remember Theo for plants. ❌ Aristotle is wrong because he is called the Father of Biology and of Zoology."
  },
  4: {
    questext: "Aristotle is called the Father of which of the following?\n1. Biology\n2. Zoology\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Aristotle is called the Father of Biology as well as the Father of Zoology. 📌 He is the father of all things alive and of animals. ❌ Only 1 or only 2 is wrong because both titles belong to him."
  },
  5: {
    type: "concept", icon: "🔤", accent: "#f59e0b", pauseTimer: true,
    title: "Important Terms of Biology — Part 1 (A to D)",
    html: `
      <p class="cp-lead">Many sciences in biology are named for the thing they study. <u>If you know what the name means, you can answer most questions at once.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/4.png" alt="Mind-map with a centre circle STUDY NAMES and four branches: Anatomy, Cytology, Cardiology" data-caption="Four common study names and the body part or topic each one covers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Study of</th></tr></thead><tbody><tr><td>Anatomy</td><td>Internal structure of an organism</td></tr><tr><td>Agrology</td><td>Soil science, mainly for crop production</td></tr><tr><td>Agronomy</td><td>Soil management and crop production</td></tr><tr><td>Agrostology</td><td>Grasses</td></tr><tr><td>Arthrology</td><td>Joints</td></tr><tr><td>Apiculture</td><td>Rearing of honey bees for honey</td></tr><tr><td>Anthropology</td><td>Origin, development and culture of human beings, past and present</td></tr><tr><td>Angiology</td><td>Blood vessels (the vascular system)</td></tr><tr><td>Andrology</td><td>Male reproductive organs</td></tr><tr><td>Bryology</td><td>Bryophytes such as mosses</td></tr></tbody></table>
      <p class="cp-lead">Biometrics is the statistical study of biological problems. Biomedical engineering makes spare parts for people, such as artificial limbs, the iron lung and the pacemaker.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/5.png" alt="honey bee hive apiculture beekeeper photo" data-caption="A beekeeper inspects a frame of honey bees, which is the practice called apiculture." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Study of</th></tr></thead><tbody><tr><td>Bacteriology</td><td>Bacteria</td></tr><tr><td>Biotechnology</td><td>Use of living things in industry by working at the level of molecules</td></tr><tr><td>Cytology</td><td>The cell</td></tr><tr><td>Cryobiology</td><td>Effect of low temperature on living things and keeping them safe by cold</td></tr><tr><td>Cardiology</td><td>The heart</td></tr><tr><td>Demography</td><td>Human population</td></tr><tr><td>Dermatology</td><td>The skin</td></tr><tr><td>Diffusion</td><td>Random movement of molecules from higher to lower concentration</td></tr><tr><td>Dendrochronology</td><td>Counting annual rings of a tree to know its age</td></tr></tbody></table>
      <p class="cp-lead">A clone is a group of living things that are genetically exactly alike. Dendrochronology is the study of tree rings: each ring is one year of growth.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/6.png" alt="tree trunk cross section annual growth rings photo" data-caption="A cut tree trunk whose rings are counted in dendrochronology to find its age." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Agrology, Agronomy and Agrostology look alike. Agrostology is only about grasses, while Agrology and Agronomy are about soil and crops.</div>
      <div class="cp-note exam">Anthropology, Apiculture, Dendrochronology and Cryobiology are the terms most often asked, so learn these first.</div>
    `
  },
  6: {
    questext: "The study of tree rings to find the age of a tree is called",
    options: ["Dendrochronology", "Agrostology", "Anthropology", "Cryobiology"],
    correct: "1",
    exptext: "✅ Dendrochronology means counting yearly growth rings. 📌 Dendron means tree. ❌ Agrostology is wrong because it deals with grasses."
  },
  7: {
    questext: "Which of the following pairs of a term and its meaning is NOT correct?",
    options: ["Apiculture – rearing of honey bees", "Angiology – study of blood vessels", "Arthrology – study of joints", "Agrostology – study of insects"],
    correct: "4",
    exptext: "✅ Agrostology is the study of grasses, not insects. 📌 Insects are studied in entomology. ❌ The other three pairs are correct."
  },
  8: {
    questext: "Cryobiology is the study of",
    options: ["the effect of heat on plants", "the effect of low temperature on living things", "the study of cells", "the study of skin"],
    correct: "2",
    exptext: "✅ Cryobiology studies the effect of low temperature on living things and how to keep them safe by cold. 📌 Cryo means cold. ❌ Cytology is the study of cells, so it is the tempting wrong option."
  },
  9: {
    type: "concept", icon: "🧪", accent: "#ef4444", pauseTimer: true,
    title: "Important Terms of Biology — Part 2 (E to H)",
    html: `
      <p class="cp-lead">This group has the terms that start with the letters E to H. <u>Learn the study name together with its meaning, and the easy ones will become automatic.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/7.png" alt="Four-picture strip with labels: Ecology (tree and animal), Embryology (tiny embryo), Entom" data-caption="Four sciences from this group, each shown with its main subject of study." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Study of</th></tr></thead><tbody><tr><td>Ecology</td><td>How living things relate to each other and to their surroundings</td></tr><tr><td>Evolution</td><td>Origin of life, variation and formation of new species</td></tr><tr><td>Embryology</td><td>Fertilisation and development of the zygote</td></tr><tr><td>Eugenics</td><td>Factors connected with the improvement of the human race</td></tr><tr><td>Euthenics</td><td>Improvement of human life through a better environment</td></tr><tr><td>Ethnology</td><td>Different races of human beings</td></tr><tr><td>Ethology</td><td>Animal behaviour</td></tr><tr><td>Etiology</td><td>Causes of disease</td></tr><tr><td>Entomology</td><td>Insects</td></tr><tr><td>Exobiology</td><td>Possibility of life in space</td></tr></tbody></table>
      <p class="cp-lead">Floriculture is the growing of plants for their flowers. Food technology is the scientific processing, preservation, storage and transport of food.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/8.png" alt="floriculture flower farm greenhouse photo" data-caption="Rows of flowers grown in a greenhouse, which is the work of floriculture." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Floriculture</td><td>Cultivation of plants for flowers</td></tr><tr><td>Forensic science</td><td>Use of science to identify facts in legal cases</td></tr><tr><td>Fishery</td><td>Catching, breeding, rearing and marketing of fish</td></tr><tr><td>Forestry</td><td>Development and management of forests</td></tr><tr><td>Fermentation</td><td>Incomplete breaking down of sugar without oxygen, forming ethyl alcohol</td></tr><tr><td>Genetics</td><td>Variation and passing of characters from parents to young ones</td></tr><tr><td>Growth</td><td>Permanent increase in weight, volume or size</td></tr><tr><td>Gynaecology</td><td>Female reproductive organs</td></tr><tr><td>Gerontology</td><td>Ageing</td></tr><tr><td>Gastroenterology</td><td>Stomach and intestine and their diseases</td></tr></tbody></table>
      <p class="cp-lead">Haematology is the study of blood, Histology is the study of tissues with a microscope, and Hydroponics is growing plants in water with nutrients and without soil.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/9.png" alt="Three jars labelled SOIL (plant in earth), HYDROPONICS (plant roots in water with nutrient" data-caption="A plant grown in nutrient water without soil shows hydroponics." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Eugenics improves the human race by selecting parents, while Euthenics improves life by a better environment. The two names differ by only one letter.</div>
      <div class="cp-note exam">Etiology (causes of disease), Embryology, Ethology and Exobiology are repeated often in exam papers.</div>
    `
  },
  10: {
    questext: "Which of the following is the study of animal behaviour?",
    options: ["Ecology", "Ethology", "Ethnology", "Etiology"],
    correct: "2",
    exptext: "✅ Ethology is the study of animal behaviour. 📌 Ethos means character or habit. ❌ Ethnology is the study of human races, so it is the tempting wrong option."
  },
  11: {
    questext: "Etiology is the study of",
    options: ["insects", "human races", "causes of disease", "improvement of the race"],
    correct: "3",
    exptext: "✅ Etiology is the study of the causes of disease. 📌 Think of the cause or reason behind a disease. ❌ Eugenics is the improvement of the race, so it is wrong here."
  },
  12: {
    questext: "Consider the following statements:\n1. Entomology is the study of insects.\n2. Exobiology is the study of the possibility of life in space.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Ento means insect and exo means outside. ❌ Neither is wrong, because both meanings are exactly as defined."
  },
  13: {
    questext: "Growing plants in water that holds nutrients, without using soil, is called",
    options: ["Floriculture", "Forestry", "Fermentation", "Hydroponics"],
    correct: "4",
    exptext: "✅ Hydroponics is growing plants in water with nutrients and no soil. 📌 Hydro means water. ❌ Floriculture is growing plants for flowers, so it is wrong."
  },
  14: {
    type: "concept", icon: "🩺", accent: "#8b5cf6", pauseTimer: true,
    title: "Important Terms of Biology — Part 3 (I to P)",
    html: `
      <p class="cp-lead">The last group of terms contains many names of medical sciences. <u>Most of them are made from a body part plus the ending logy, which means study.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/10.png" alt="Body outline with four pointers: Liver - Hepatology, Kidney - Nephrology, Eye - Ophthalmol" data-caption="A body outline showing the study name for the liver, kidney, eye and bones." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Study of</th></tr></thead><tbody><tr><td>Hepatology</td><td>Liver</td></tr><tr><td>Ichthyology</td><td>Fishes</td></tr><tr><td>Immunology</td><td>Immunity, the resistance of the body to disease</td></tr><tr><td>Morphology</td><td>External structure</td></tr><tr><td>Microbiology</td><td>Microorganisms such as viruses, bacteria, algae, fungi and protozoa</td></tr><tr><td>Molecular biology</td><td>Molecules found in the body of living organisms</td></tr><tr><td>Mycology</td><td>Fungi</td></tr><tr><td>Neurology</td><td>The nervous system</td></tr><tr><td>Neonatology</td><td>Newborn babies</td></tr><tr><td>Nephrology</td><td>Kidneys</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/11.png" alt="ornithology bird watching binoculars photo" data-caption="A bird watcher studying birds, which is the work of an ornithologist." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Study of</th></tr></thead><tbody><tr><td>Odontology</td><td>Teeth and gums</td></tr><tr><td>Osteology</td><td>Bones</td></tr><tr><td>Oncology</td><td>Cancer and tumours</td></tr><tr><td>Obstetrics</td><td>Care of a pregnant woman before, during and after child birth</td></tr><tr><td>Ornithology</td><td>Birds</td></tr><tr><td>Ophthalmology</td><td>Eyes</td></tr><tr><td>Orthopaedics</td><td>Diagnosis and repair of disorders of the bones and movement system</td></tr><tr><td>Mammography</td><td>Test to find breast cancer</td></tr></tbody></table>
      <table><thead><tr><th>Word</th><th>Meaning</th></tr></thead><tbody><tr><td>Metazoans</td><td>All multicellular animals</td></tr><tr><td>Monoecious</td><td>A plant that has both male and female flowers</td></tr><tr><td>Phytoplankton</td><td>Tiny organisms that float on the surface of water</td></tr><tr><td>Parasite</td><td>An organism that depends on another living thing for food and shelter</td></tr><tr><td>Poikilothermic</td><td>Cold blooded: body temperature changes with the surroundings</td></tr><tr><td>Homeothermic</td><td>Warm blooded: body temperature stays constant</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/12.png" alt="Two thermometer pictures: a lizard with a body temperature that goes up and down labelled " data-caption="Cold blooded animals change body temperature with surroundings; warm blooded animals keep it steady." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not confuse Neurology (nervous system) with Nephrology (kidneys), and do not confuse Oncology (cancer) with Ornithology (birds).</div>
      <div class="cp-note exam">Poikilothermic and Homeothermic animals are asked often, with fish, frogs and reptiles as cold blooded and birds and mammals as warm blooded.</div>
    `
  },
  15: {
    questext: "Nephrology is the study of",
    options: ["the nervous system", "kidneys", "the liver", "the lungs"],
    correct: "2",
    exptext: "✅ Nephrology is the study of the kidneys. 📌 Nephron is the unit of the kidney. ❌ Neurology is the nervous system, which is the tempting wrong option."
  },
  16: {
    questext: "Which of the following studies birds?",
    options: ["Ichthyology", "Mycology", "Ornithology", "Oncology"],
    correct: "3",
    exptext: "✅ Ornithology is the study of birds. 📌 Ornis means bird in Greek. ❌ Ichthyology is wrong because it deals with fishes."
  },
  17: {
    questext: "Poikilothermic animals are those that",
    options: ["keep a constant body temperature", "live only in water", "are always warm blooded", "change body temperature with their surroundings"],
    correct: "4",
    exptext: "✅ Poikilothermic animals are cold blooded, so their body temperature changes with the surroundings. 📌 Poikilo means varying. ❌ Constant temperature belongs to homeothermic animals."
  },
  18: {
    questext: "Consider the following statements:\n1. Mycology is the study of fungi.\n2. Osteology is the study of teeth.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct because mycology is the study of fungi. 📌 Teeth belong to odontology. ❌ Statement 2 is wrong because osteology is the study of bones."
  },
  19: {
    type: "concept", icon: "🔬", accent: "#14b8a6", pauseTimer: true,
    title: "The Cell — Basic Unit of Life",
    html: `
      <p class="cp-lead">A <b>cell</b> is the basic structural unit of life. <u>Every living thing is made of one or more cells.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/13.png" alt="onion peel cells under microscope photo" data-caption="Onion peel cells under a microscope, showing the cells that make up a plant." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The cell was first discovered by <b>Robert Hooke</b>. The smallest cell is found in bacteria and measures only 0.1 to 0.5 micrometre. The largest cell is the egg of an ostrich, which measures about 170 millimetres by 130 millimetres.</p>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Discovered by</td><td>Robert Hooke</td></tr><tr><td>Smallest cells</td><td>Mycoplasma, a kind of bacteria</td></tr><tr><td>Largest single cell</td><td>Egg of an ostrich</td></tr><tr><td>Eats food by endocytosis</td><td>Amoeba</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/14.png" alt="Robert Hooke Micrographia cork cells drawing" data-caption="Robert Hooke's drawing of cork cells, the first time cells were seen under a microscope." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Cells are of two main types. <b>Prokaryotes</b> have no defined nucleus, for example bacteria and blue-green algae. <b>Eukaryotes</b> have a definite nucleus, and all other living things such as plants, animals and fungi are eukaryotes.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/15.png" alt="Two cells side by side: left cell labelled PROKARYOTE with floating DNA and NO NUCLEUS, ri" data-caption="Left: a prokaryotic cell with no defined nucleus. Right: a eukaryotic cell with a nucleus." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Type</th><th>Nucleus</th><th>Examples</th></tr></thead><tbody><tr><td>Prokaryote</td><td>No defined nucleus</td><td>Bacteria, blue-green algae</td></tr><tr><td>Eukaryote</td><td>Definite nucleus</td><td>Plants, animals, fungi</td></tr></tbody></table>
      <div class="cp-note tip">The cell membrane is mostly made of two kinds of compounds: proteins and phospholipids. The word pro means before and karyon means nucleus, so prokaryote means before the nucleus.</div>
      <div class="cp-note trap">The ostrich egg is the largest single cell, but the largest human cell is the female ovum, so read the question carefully.</div>
      <div class="cp-mnemonic">Pro = No nucleus. Eu = True nucleus.</div>
    `
  },
  20: {
    questext: "Who discovered the cell?",
    options: ["Robert Brown", "Robert Hooke", "Anton van Leeuwenhoek", "Louis Pasteur"],
    correct: "2",
    exptext: "✅ Robert Hooke first discovered the cell. 📌 Hooke saw cork cells in 1665. ❌ Robert Brown is wrong because he is linked with the nucleus."
  },
  21: {
    questext: "Which of the following is the largest single cell in the world?",
    options: ["Human ovum", "Nerve cell", "Egg of an ostrich", "Red blood cell"],
    correct: "3",
    exptext: "✅ The egg of an ostrich is the largest single cell. 📌 Think of the biggest bird of all. ❌ The human ovum is the largest human cell, so it is the tempting wrong option."
  },
  22: {
    questext: "Which of the following is a prokaryote?",
    options: ["Yeast", "Amoeba", "Blue-green algae", "Mushroom"],
    correct: "3",
    exptext: "✅ Blue-green algae have no defined nucleus, so they are prokaryotes. 📌 Bacteria and blue-green algae are the two prokaryotes to remember. ❌ Yeast is wrong because it is a fungus with a nucleus."
  },
  23: {
    questext: "Consider the following statements about cells:\n1. Prokaryotic cells have a definite nucleus.\n2. The cell membrane is made mostly of proteins and phospholipids.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Pro means no nucleus. ❌ Statement 1 is wrong because prokaryotes have no defined nucleus."
  },
  24: {
    type: "concept", icon: "💧", accent: "#ec4899", pauseTimer: true,
    title: "Diffusion and Osmosis",
    html: `
      <p class="cp-lead">Cells take in and send out substances all the time. <u>Diffusion and osmosis are the two ways this happens.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/16.png" alt="Beaker with dots all in the left half, arrows spreading to the right half, labels: HIGH co" data-caption="Particles move from the crowded side to the less crowded side in diffusion." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Diffusion</b> is the movement of a substance from a region where it is more concentrated to a region where it is less concentrated. Gases such as carbon dioxide and oxygen move across cell membranes by diffusion.</p>
      <p class="cp-lead"><b>Osmosis</b> is the movement of water molecules through a selectively permeable membrane. It is a special case of diffusion for water.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/17.png" alt="Cell membrane diagram with water molecules passing through a thin wall from a watery side " data-caption="Water crosses a selectively permeable membrane from the weaker solution to the stronger solution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Solution outside the cell</th><th>Water movement</th><th>Effect on the cell</th></tr></thead><tbody><tr><td>Hypotonic (weaker solution)</td><td>More water enters than leaves</td><td>The cell swells</td></tr><tr><td>Isotonic (equal strength)</td><td>Same amount enters and leaves</td><td>The cell stays the same size</td></tr><tr><td>Hypertonic (stronger solution)</td><td>More water leaves than enters</td><td>The cell shrinks</td></tr></tbody></table>
      <p class="cp-lead">When a plant cell loses water by osmosis, the contents shrink away from the cell wall. This is called <b>plasmolysis</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/18.png" alt="plasmolysis onion cells microscope photo" data-caption="Plasmolysis in plant cells: the contents shrink away from the cell wall." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Hypotonic means the solution outside is weaker, so the cell swells. Hypertonic means the solution outside is stronger, so the cell shrinks.</div>
      <div class="cp-note exam">Plasmolysis, the shrinking of a plant cell in a strong solution, is the most repeated term from this topic.</div>
    `
  },
  25: {
    questext: "The movement of water molecules through a selectively permeable membrane is called",
    options: ["Diffusion", "Osmosis", "Plasmolysis", "Fermentation"],
    correct: "2",
    exptext: "✅ Osmosis is the movement of water through a selectively permeable membrane. 📌 Osmosis is diffusion of water only. ❌ Diffusion is wrong because it is the general movement of any substance."
  },
  26: {
    questext: "What happens to a plant cell placed in a hypertonic solution?",
    options: ["It swells and bursts", "It stays the same", "It shows plasmolysis", "It divides"],
    correct: "3",
    exptext: "✅ Water leaves the cell, so the contents shrink away from the wall, which is plasmolysis. 📌 Hyper means more strength outside. ❌ Swelling happens in a hypotonic solution, so it is the tempting wrong option."
  },
  27: {
    questext: "In which of the following solutions will an animal cell stay at the same size?",
    options: ["Hypotonic solution", "Hypertonic solution", "Pure water", "Isotonic solution"],
    correct: "4",
    exptext: "✅ In an isotonic solution the same amount of water enters and leaves, so the size stays the same. 📌 Iso means equal. ❌ Hypotonic is wrong because the cell would swell."
  },
  28: {
    type: "concept", icon: "🏭", accent: "#3b82f6", pauseTimer: true,
    title: "Cytoplasm, Ribosomes, Endoplasmic Reticulum, Golgi Apparatus and Lysosomes",
    html: `
      <p class="cp-lead"><b>Cytoplasm</b> is the fluid that fills a cell. <u>Many small parts called organelles float in it, and each part has its own job.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/19.png" alt="Simple animal cell cross section with labelled parts: Cell membrane, Cytoplasm, Nucleus, R" data-caption="A simple cell with its main parts labelled in the cytoplasm." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Part</th><th>Job</th></tr></thead><tbody><tr><td>Cytoplasm</td><td>Fluid filling the cell; scientists once called it protoplasm</td></tr><tr><td>Ribosomes</td><td>Make protein; made up of ribonucleic acid</td></tr><tr><td>Rough endoplasmic reticulum</td><td>Sends the protein made by ribosomes to different parts of the cell</td></tr><tr><td>Smooth endoplasmic reticulum</td><td>Helps make fats and removes the harm of many poisons and drugs</td></tr><tr><td>Golgi apparatus</td><td>A packaging part like the endoplasmic reticulum; it builds lysosomes</td></tr><tr><td>Lysosomes</td><td>Waste disposal system of the cell</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/20.png" alt="Pipeline diagram: Ribosome makes protein - Rough ER carries it - Golgi apparatus packs it " data-caption="Protein is made by ribosomes, carried by the endoplasmic reticulum and packed by the Golgi apparatus." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Proteins and fats help build the cell membrane, and this process is called <b>membrane biogenesis</b>. Lysosomes are called the <b>suicide bags</b> of the cell because they can digest the cell itself when it is damaged.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/21.png" alt="Golgi apparatus electron microscope photo" data-caption="The Golgi apparatus under an electron microscope appears as a stack of flat sacs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Rough endoplasmic reticulum works with proteins because ribosomes sit on it. Smooth endoplasmic reticulum has no ribosomes and works with fats.</div>
      <div class="cp-note exam">The lysosome is called the suicide bag, and the Golgi apparatus builds lysosomes, so both are asked often.</div>
      <div class="cp-mnemonic">Ribosome = protein factory. Lysosome = suicide bag.</div>
    `
  },
  29: {
    questext: "Which part of the cell is called the suicide bag?",
    options: ["Ribosome", "Lysosome", "Golgi apparatus", "Mitochondria"],
    correct: "2",
    exptext: "✅ Lysosomes digest the cell when it is damaged, so they are called suicide bags. 📌 Lysosome means breaking body. ❌ Mitochondria are wrong because they release energy."
  },
  30: {
    questext: "Ribosomes are the sites of the making of",
    options: ["Fat", "Starch", "Protein", "Vitamins"],
    correct: "3",
    exptext: "✅ Ribosomes make protein. 📌 Ribosome is the protein factory. ❌ Fat is made with the help of the smooth endoplasmic reticulum, so it is the tempting wrong option."
  },
  31: {
    questext: "Which cell part helps in removing the harm of many poisons and drugs?",
    options: ["Smooth endoplasmic reticulum", "Rough endoplasmic reticulum", "Centriole", "Vacuole"],
    correct: "1",
    exptext: "✅ The smooth endoplasmic reticulum plays a key role in making fats and in detoxifying poisons and drugs. 📌 Smooth means no ribosomes. ❌ The rough type works with proteins, so it is wrong."
  },
  32: {
    questext: "The cell part that builds lysosomes is the",
    options: ["Nucleus", "Plastid", "Ribosome", "Golgi apparatus"],
    correct: "4",
    exptext: "✅ The Golgi apparatus builds lysosomes and also packs substances. 📌 Golgi is the post office of the cell. ❌ Ribosome is wrong because it only makes protein."
  },
  33: {
    type: "concept", icon: "⚡", accent: "#f97316", pauseTimer: true,
    title: "Mitochondria and Centrioles",
    html: `
      <p class="cp-lead"><b>Mitochondria</b> release the energy a cell needs. <u>They are called the powerhouse of the cell.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/22.png" alt="mitochondria electron microscope photo cristae" data-caption="A mitochondrion under an electron microscope with its folded inner membrane." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The energy needed for the chemical work of life is released by mitochondria in the form of <b>adenosine triphosphate</b> (ATP) molecules. So ATP is known as the energy currency of the cell.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Nickname</td><td>Powerhouse of the cell</td></tr><tr><td>Energy form made</td><td>Adenosine triphosphate (ATP)</td></tr><tr><td>Special feature</td><td>Have their own DNA and ribosomes, so they make their own protein</td></tr><tr><td>Where absent</td><td>Bacteria and red blood cells of mammals</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/23.png" alt="Mitochondrion drawn as an oval with a folded inside, arrow labelled FOOD then arrow out la" data-caption="A mitochondrion turns food into usable energy in the form of ATP." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Mitochondria are strange parts of the cell because they have their own deoxyribonucleic acid (DNA). This is why they can copy themselves. <b>Centrioles</b> are concerned with cell division and start it.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/24.png" alt="Pair of small cylinders at right angles near a nucleus, labelled CENTRIOLES start cell div" data-caption="Centrioles lie near the nucleus and start the process of cell division." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Mitochondria are missing in bacteria and in the red blood cells of mammals. Do not say that all cells have mitochondria.</div>
      <div class="cp-note exam">The three repeated facts are powerhouse of the cell, ATP as energy currency, and the presence of their own DNA.</div>
      <div class="cp-mnemonic">Mito = Might: the power of the cell.</div>
    `
  },
  34: {
    questext: "ATP is known as the",
    options: ["energy currency of the cell", "brain of the cell", "suicide bag of the cell", "packaging unit of the cell"],
    correct: "1",
    exptext: "✅ Adenosine triphosphate stores and gives energy, so it is the energy currency. 📌 Currency is what you spend, and ATP is spent for work. ❌ Brain of the cell is the nucleus."
  },
  35: {
    questext: "Which cell part has its own DNA and ribosomes?",
    options: ["Golgi apparatus", "Lysosome", "Mitochondria", "Vacuole"],
    correct: "3",
    exptext: "✅ Mitochondria carry their own DNA and ribosomes, so they can make their own protein. 📌 They behave like small cells inside the cell. ❌ The Golgi apparatus is wrong because it has no DNA."
  },
  36: {
    questext: "Mitochondria are absent in",
    options: ["liver cells", "muscle cells", "nerve cells", "red blood cells of mammals"],
    correct: "4",
    exptext: "✅ Mature mammalian red blood cells have no mitochondria and no nucleus. 📌 They save space to carry oxygen. ❌ Muscle cells are wrong because they have many mitochondria."
  },
  37: {
    questext: "Which part of the cell starts cell division?",
    options: ["Centriole", "Lysosome", "Ribosome", "Vacuole"],
    correct: "1",
    exptext: "✅ Centrioles are concerned with cell division and start it. 📌 Centre of division. ❌ Lysosomes are wrong because they only break down waste."
  },
  38: {
    type: "concept", icon: "🌿", accent: "#84cc16", pauseTimer: true,
    title: "Plastids, Vacuoles and Granules",
    html: `
      <p class="cp-lead"><b>Plastids</b> are found only in plant cells. <u>Their colour and their job decide which kind of plastid they are.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/25.png" alt="Three small coloured cells labelled CHLOROPLAST (green), CHROMOPLAST (orange) and LEUCOPLA" data-caption="The three kinds of plastids: green chloroplast, coloured chromoplast and white leucoplast." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Plastid</th><th>Colour</th><th>Job</th></tr></thead><tbody><tr><td>Chromoplast</td><td>Coloured</td><td>Gives colour to flowers and fruits</td></tr><tr><td>Leucoplast</td><td>White or colourless</td><td>Stores starch, oils and protein</td></tr><tr><td>Chloroplast</td><td>Green (chlorophyll)</td><td>Site of photosynthesis</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/26.png" alt="chloroplast cells elodea microscope photo" data-caption="Green chloroplasts inside plant cells, where food is made by photosynthesis." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Plastids can copy themselves because they have their own DNA, RNA and ribosomes. The green pigment <b>chlorophyll</b> is inside the chloroplast.</p>
      <p class="cp-lead">A <b>vacuole</b> is a fluid filled space enclosed by a membrane. It is small in animal cells and big in plant cells. Amino acids and sugars are stored in vacuoles. <b>Granules</b> have no membrane around them and store fats, proteins and carbohydrates.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/27.png" alt="Comparison of two cells: animal cell with small vacuoles and plant cell with one big centr" data-caption="A plant cell has one large vacuole while an animal cell has only small ones." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Vacuoles have a membrane, but granules do not. Also, plastids are found only in plants and never in animal cells.</div>
      <div class="cp-note exam">Chromoplast gives colour, leucoplast stores food and chloroplast carries out photosynthesis.</div>
      <div class="cp-mnemonic">Chromo = Colour. Leuco = Light (white). Chloro = Green.</div>
    `
  },
  39: {
    questext: "Plastids are found in",
    options: ["animal cells only", "plant cells only", "bacteria only", "all living cells"],
    correct: "2",
    exptext: "✅ Plastids are present only in plant cells. 📌 Plants make food, so they need plastids. ❌ Animal cells are wrong because they have no plastids."
  },
  40: {
    questext: "Which plastids give colour to flowers and fruits?",
    options: ["Leucoplasts", "Chromoplasts", "Chloroplasts", "Lysosomes"],
    correct: "2",
    exptext: "✅ Chromoplasts are coloured plastids that give colour to flowers and fruits. 📌 Chromo means colour. ❌ Leucoplasts are white and store food."
  },
  41: {
    questext: "Which one of the following stores starch, oils and protein?",
    options: ["Chloroplast", "Chromoplast", "Centriole", "Leucoplast"],
    correct: "4",
    exptext: "✅ Leucoplasts are white plastids that store starch, oils and protein. 📌 Leuco means white. ❌ The chloroplast is wrong because it makes food and does not store it."
  },
  42: {
    questext: "Which of the following is NOT bounded by a membrane?",
    options: ["Granules", "Vacuole", "Nucleus", "Mitochondria"],
    correct: "1",
    exptext: "✅ Granules have no membrane and store fats, proteins and carbohydrates. 📌 Granules are loose grains in the cytoplasm. ❌ A vacuole is wrong because it is a membrane bound space."
  },
  43: {
    type: "concept", icon: "🧠", accent: "#06b6d4", pauseTimer: true,
    title: "Cell Nucleus and Chromosomes",
    html: `
      <p class="cp-lead">The <b>nucleus</b> acts like the brain of the cell. <u>It controls eating, movement and reproduction, and not all cells have a nucleus.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/28.png" alt="Cutaway of a nucleus with four labelled parts: Nuclear envelope, Chromatin, Chromosomes, N" data-caption="The four parts inside a nucleus: envelope, chromatin, chromosomes and nucleolus." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Part of the nucleus</th><th>What it is</th></tr></thead><tbody><tr><td>Nuclear envelope</td><td>The membrane that covers the nucleus</td></tr><tr><td>Chromatin</td><td>Thread-like material of deoxyribonucleic acid (DNA), ribonucleic acid (RNA) and protein, seen when the cell is resting</td></tr><tr><td>Chromosomes</td><td>Chromatin coiled tightly when the cell is about to divide</td></tr><tr><td>Nucleolus</td><td>A dense round granule that makes ribosomes</td></tr></tbody></table>
      <p class="cp-lead"><b>Chromosomes</b> carry the information that helps a cell grow and reproduce. They are made up of DNA, and segments of DNA in specific patterns are called <b>genes</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/29.png" alt="human karyotype 46 chromosomes photo" data-caption="A human karyotype showing 46 chromosomes arranged in 23 pairs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Human beings have 46 chromosomes, which is 23 pairs. A dog has 78 chromosomes. The number of chromosomes has nothing to do with how clever or complex a living thing is. In bacteria and other prokaryotes, the DNA floats in an area of the cytoplasm called the <b>nucleoid</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/30.png" alt="Zoom picture: a cell, then its nucleus, then a chromosome, then a coiled DNA thread with a" data-caption="From cell to nucleus to chromosome to DNA, with a gene shown as one segment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The nucleolus makes ribosomes. Do not choose it as the part that holds the genes, because genes are on the chromosomes.</div>
      <div class="cp-note exam">Humans have 46 chromosomes (23 pairs), and a gene is a segment of deoxyribonucleic acid.</div>
    `
  },
  44: {
    questext: "How many chromosomes does a normal human cell have?",
    options: ["23", "44", "46", "48"],
    correct: "3",
    exptext: "✅ A human body cell has 46 chromosomes, which is 23 pairs. 📌 Remember 23 pairs. ❌ 23 is wrong because that is the number in a sperm or an egg cell."
  },
  45: {
    questext: "A segment of DNA in a specific pattern is called a",
    options: ["nucleolus", "gene", "centriole", "vacuole"],
    correct: "2",
    exptext: "✅ Segments of DNA in specific patterns are called genes. 📌 Genes sit on chromosomes. ❌ The nucleolus is wrong because it is a part that makes ribosomes."
  },
  46: {
    questext: "In prokaryotes, the DNA floats in an area of the cytoplasm called the",
    options: ["nucleus", "nucleolus", "nucleoid", "nuclear envelope"],
    correct: "3",
    exptext: "✅ The area where DNA floats in a prokaryote is the nucleoid. 📌 Nucleoid means nucleus-like. ❌ Nucleus is wrong because prokaryotes have no defined nucleus."
  },
  47: {
    type: "concept", icon: "➗", accent: "#a855f7", pauseTimer: true,
    title: "Cell Division — Mitosis and Meiosis",
    html: `
      <p class="cp-lead">Living things grow and repair themselves by <b>cell division</b>. <u>There are two kinds: mitosis and meiosis.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/31.png" alt="Flow: one parent cell, arrow labelled MITOSIS, two identical daughter cells; second flow: " data-caption="Mitosis gives two identical cells, while meiosis gives four cells with half the chromosomes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In <b>mitosis</b> the cell copies its deoxyribonucleic acid (DNA) and divides once. The two new daughter cells have the same pieces and the same genetic code as the parent cell. In <b>meiosis</b> there are two divisions one after the other, and the cells formed have half the number of chromosomes.</p>
      <table><thead><tr><th>Point</th><th>Mitosis</th><th>Meiosis</th></tr></thead><tbody><tr><td>Number of divisions</td><td>One</td><td>Two</td></tr><tr><td>Cells formed</td><td>Two</td><td>Four</td></tr><tr><td>Chromosomes in new cells</td><td>Same as parent</td><td>Half of parent</td></tr><tr><td>Where it happens</td><td>Body cells, for growth and repair</td><td>Cells that make gametes (sperm and egg)</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/32.png" alt="Horizontal strip of four small cell drawings labelled PROPHASE, METAPHASE, ANAPHASE, TELOP" data-caption="The four stages of mitosis in order: prophase, metaphase, anaphase and telophase." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Before division, the cell is in a resting stage called <b>interphase</b>. The stages of mitosis then run in this order: prophase, metaphase, anaphase and telophase.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/33.png" alt="mitosis stages onion root tip microscope photo" data-caption="Onion root tip cells in different stages of mitosis seen under a microscope." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Interphase is the resting stage before division starts, not a stage of the division itself.</div>
      <div class="cp-note exam">Mitosis keeps the same chromosome number, while meiosis halves it, and this difference is asked most often.</div>
      <div class="cp-mnemonic">PMAT after the rest: Prophase, Metaphase, Anaphase, Telophase.</div>
    `
  },
  48: {
    questext: "Which one of the following gives four cells with half the chromosomes?",
    options: ["Mitosis", "Meiosis", "Fertilisation", "Interphase"],
    correct: "2",
    exptext: "✅ Meiosis has two divisions and makes four cells with half the number of chromosomes. 📌 Mei means less. ❌ Mitosis is wrong because it makes two identical cells."
  },
  49: {
    questext: "What is the correct order of the stages of mitosis?",
    options: ["Prophase, Anaphase, Metaphase, Telophase", "Metaphase, Prophase, Anaphase, Telophase", "Prophase, Metaphase, Anaphase, Telophase", "Telophase, Anaphase, Metaphase, Prophase"],
    correct: "3",
    exptext: "✅ The order is prophase, metaphase, anaphase and telophase. 📌 Use the word PMAT. ❌ Option 1 is wrong because anaphase comes after metaphase."
  },
  50: {
    questext: "Consider the following statements:\n1. Mitosis makes two daughter cells with the same genetic code as the parent.\n2. Meiosis has only one division.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Mitosis is a copy, meiosis is a halving. ❌ Statement 2 is wrong because meiosis has two divisions."
  },
  51: {
    questext: "Cell division in the body cells for growth and repair is",
    options: ["Meiosis", "Fertilisation", "Mitosis", "Osmosis"],
    correct: "3",
    exptext: "✅ Mitosis is used for growth and repair of body cells. 📌 Mitosis is the same-copy division. ❌ Meiosis is wrong because it is used for making sperm and egg cells."
  },
  52: {
    type: "concept", icon: "📌", accent: "#e11d48", pauseTimer: true,
    title: "Important Facts About Cells",
    html: `
      <p class="cp-lead">The facts below are short and easy to learn, and <u>Staff Selection Commission papers ask them again and again.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/34.png" alt="Size ladder with five labelled cells from largest to smallest: Ostrich egg, Human ovum, Ne" data-caption="A size ladder from the largest cell to the smallest cell." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody><tr><td>Longest cell in the body</td><td>Nerve cell (neuron)</td></tr><tr><td>Smallest human cell</td><td>Red blood cell</td></tr><tr><td>Largest human cell</td><td>Female ovum</td></tr><tr><td>Largest single cell</td><td>Ostrich egg</td></tr><tr><td>Smallest cells</td><td>Mycoplasma</td></tr><tr><td>Cells with no nucleus</td><td>Sieve tube cells of plants and mature mammalian red blood cells</td></tr><tr><td>Carries respiratory gases</td><td>Red blood cell</td></tr><tr><td>Transports food in plants</td><td>Sieve tube cells</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/35.png" alt="human sperm ovum fertilisation microscope photo" data-caption="Sperm cells around a human egg, where lysosomal enzymes help the sperm enter." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The lysosomal enzymes of the sperm cell digest the outer membrane of the egg, so the sperm is able to enter. In the change of a tadpole into a frog, the tissues of the gills and the tail are digested by lysosomes.</p>
      <p class="cp-lead">Mitochondria contain DNA, so they are able to copy themselves. The matrix is a clear, even, semi-fluid substance that stays full of water when the cell is active.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/36.png" alt="Tadpole turning into a frog in three steps with the tail shrinking and a small label LYSOS" data-caption="During the change from tadpole to frog, lysosomes digest the tail and gills." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The ostrich egg is the largest single cell, but the largest human cell is the female ovum. The smallest human cell is the red blood cell, not the sperm.</div>
      <div class="cp-note exam">Nerve cell as the longest cell, ovum as the largest human cell and red blood cell as the smallest human cell are the three most asked facts.</div>
    `
  },
  53: {
    questext: "Which is the longest cell in the human body?",
    options: ["Nerve cell", "Muscle cell", "Red blood cell", "Ovum"],
    correct: "1",
    exptext: "✅ The nerve cell, or neuron, is the longest cell. 📌 A nerve can run from the spine to the toe. ❌ Ovum is wrong because it is the largest, not the longest, human cell."
  },
  54: {
    questext: "The largest cell in the human body is",
    options: ["Red blood cell", "Sperm", "Nerve cell", "Female ovum"],
    correct: "4",
    exptext: "✅ The female ovum is the largest human cell. 📌 Ovum means egg. ❌ The red blood cell is the smallest human cell, so it is the tempting wrong option."
  },
  55: {
    questext: "Which of the following cells has no nucleus?",
    options: ["Mature red blood cell of a mammal", "Nerve cell", "Liver cell", "Muscle cell"],
    correct: "1",
    exptext: "✅ Mature red blood cells of mammals have no nucleus, which gives space for oxygen carriage. 📌 Sieve tube cells in plants also have none. ❌ Liver cells are wrong because they have a nucleus."
  },
  56: {
    questext: "Consider the following statements:\n1. Sieve tubes in plants carry food and have no nucleus.\n2. The smallest cells are those of mycoplasma.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Sieve tubes move food and mycoplasma are the smallest cells. ❌ Neither is wrong because both facts are standard."
  },
  57: {
    type: "concept", icon: "🧱", accent: "#10b981", pauseTimer: true,
    title: "Epithelial Tissue",
    html: `
      <p class="cp-lead">A <b>tissue</b> is a group of similar cells that do one job together. <u>Epithelial tissue covers the body and lines its organs, so it mainly protects.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/37.png" alt="Two panels: SIMPLE epithelium shown as one layer of cells, STRATIFIED epithelium shown as " data-caption="Simple epithelium has one layer of cells; stratified epithelium has many layers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">On the basis of layers, an epithelium with a single layer of cells is called <b>simple</b>, and one with many layers is called <b>stratified</b>. On the basis of shape, there are three kinds: cuboidal, columnar and squamous.</p>
      <table><thead><tr><th>Shape</th><th>Where it is found</th><th>Main job</th></tr></thead><tbody><tr><td>Cuboidal</td><td>Kidney tubules and glands such as salivary glands</td><td>Gives mechanical strength</td></tr><tr><td>Columnar</td><td>Lining of the stomach and intestine</td><td>Helps in secretion and absorption</td></tr><tr><td>Squamous</td><td>Lining of blood vessels (endothelium), skin</td><td>Protects the parts below from injury and germs</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/38.png" alt="Three small cell drawings: Cuboidal (cube shape), Columnar (tall pillar shape), Squamous (" data-caption="The three shapes of epithelial cells: cube, pillar and flat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">When squamous epithelium forms the lining of blood vessels, it is called <b>endothelium</b>. The skin, the lining of the mouth, blood vessels and kidney tubules are all made of epithelial tissue.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/39.png" alt="epithelial tissue histology microscope photo" data-caption="A microscope slide of epithelial tissue showing closely packed cells." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Cuboidal cells are cube shaped and found in kidney tubules. Squamous cells are flat and form the blood vessel lining, so do not swap them.</div>
      <div class="cp-note exam">Remember that endothelium is squamous epithelium that lines blood vessels.</div>
      <div class="cp-mnemonic">Cube – Kidney, Column – Canal (stomach), Squamous – Skin and vessel.</div>
    `
  },
  58: {
    questext: "The lining of blood vessels is made of",
    options: ["cuboidal epithelium", "columnar epithelium", "squamous epithelium", "connective tissue"],
    correct: "3",
    exptext: "✅ Squamous epithelium forming the lining of blood vessels is called endothelium. 📌 Thin flat cells suit smooth blood flow. ❌ Cuboidal is wrong because it is found in kidney tubules."
  },
  59: {
    questext: "An epithelium with many layers of cells is called",
    options: ["simple", "stratified", "squamous", "columnar"],
    correct: "2",
    exptext: "✅ A stratified epithelium has many layers. 📌 Strata means layers. ❌ Simple is wrong because it has one layer."
  },
  60: {
    questext: "The main job of epithelial tissue is to",
    options: ["carry messages", "store fat", "protect the underlying parts", "pull bones"],
    correct: "3",
    exptext: "✅ Epithelial tissue protects the parts below it from injury and the entry of germs. 📌 It is the covering layer. ❌ Carrying messages is done by nervous tissue."
  },
  61: {
    type: "concept", icon: "🔗", accent: "#eab308", pauseTimer: true,
    title: "Connective Tissue",
    html: `
      <p class="cp-lead"><b>Connective tissue</b> binds and supports other tissues. <u>It has four main kinds: areolar, adipose, skeletal and fluid.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/40.png" alt="Four boxes labelled AREOLAR (fills spaces), ADIPOSE (fat), SKELETAL (bone and cartilage), " data-caption="The four kinds of connective tissue and one example of each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Kind</th><th>Where it is found</th><th>Main job</th></tr></thead><tbody><tr><td>Areolar</td><td>Fills spaces around muscles, blood vessels and nerves</td><td>Joins skin to muscles, supports organs and helps repair</td></tr><tr><td>Adipose</td><td>Below the skin, around internal organs and in yellow bone marrow</td><td>Stores fat and keeps the body warm</td></tr><tr><td>Skeletal (bone and cartilage)</td><td>Nose, epiglottis, discs between the backbone bones</td><td>Gives support and shape</td></tr><tr><td>Fluid (blood and lymph)</td><td>Blood vessels and lymph vessels</td><td>Carries oxygen, food, hormones and fights disease</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/41.png" alt="human skeleton cartilage bone anatomy photo" data-caption="A human skeleton model: bone gives support and protects the delicate organs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">A <b>tendon</b> joins muscle to bone. A <b>ligament</b> joins bone to bone and is very elastic. Bone protects delicate organs, and bone marrow makes blood cells.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/42.png" alt="Simple leg diagram with labels: MUSCLE, TENDON (muscle to bone), BONE, LIGAMENT (bone to b" data-caption="A tendon joins muscle to bone, while a ligament joins one bone to another bone." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In fluid connective tissue, the leucocytes (white blood cells) fight disease and the platelets help in clotting of blood. Lymph carries nutrients and forms part of the defence system of the body.</p>
      <div class="cp-note trap">Tendon joins muscle to bone, but ligament joins bone to bone. Many students reverse them.</div>
      <div class="cp-note exam">Remember that blood is a fluid connective tissue and that fat is stored in adipose tissue.</div>
      <div class="cp-mnemonic">Tendon = muscle to bone (T for Tie). Ligament = bone to bone (L for Link).</div>
    `
  },
  62: {
    questext: "A ligament connects",
    options: ["muscle to muscle", "bone to bone", "muscle to bone", "skin to bone"],
    correct: "2",
    exptext: "✅ A ligament connects one bone to another bone. 📌 Ligaments link joints. ❌ Muscle to bone is the job of a tendon, so it is the tempting wrong option."
  },
  63: {
    questext: "Fat is stored in which tissue?",
    options: ["Adipose tissue", "Epithelial tissue", "Nervous tissue", "Smooth muscle"],
    correct: "1",
    exptext: "✅ Adipose tissue stores fat and conserves heat. 📌 Adipose means fat. ❌ Epithelial tissue is wrong because it covers and lines the body."
  },
  64: {
    questext: "Blood is an example of",
    options: ["epithelial tissue", "muscular tissue", "nervous tissue", "fluid connective tissue"],
    correct: "4",
    exptext: "✅ Blood is a fluid connective tissue, with plasma and cells. 📌 It connects all body parts by carrying substances. ❌ Muscular tissue is wrong because it contracts."
  },
  65: {
    questext: "Consider the following statements:\n1. Tendons connect muscles to bones.\n2. Ligaments connect muscles to bones.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct because tendons join muscles to bones. 📌 Ligaments are bone to bone. ❌ Statement 2 is wrong because ligaments join bones to bones."
  },
  66: {
    type: "concept", icon: "💪", accent: "#0ea5e9", pauseTimer: true,
    title: "Muscular Tissue",
    html: `
      <p class="cp-lead"><b>Muscular tissue</b> is specialised for the ability to contract. <u>Muscles contain a special protein called contractile protein.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/43.png" alt="Three panels labelled SKELETAL (long stripes, attached to bone), CARDIAC (branching stripe" data-caption="The three kinds of muscles: skeletal, cardiac and smooth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Muscle</th><th>Where it is found</th><th>Control</th><th>Main job</th></tr></thead><tbody><tr><td>Skeletal</td><td>Attached to bones</td><td>Voluntary</td><td>Movement of the body</td></tr><tr><td>Cardiac</td><td>Only in the heart</td><td>Involuntary</td><td>Pumps blood</td></tr><tr><td>Smooth</td><td>Stomach, intestines, blood vessels</td><td>Involuntary</td><td>Slow, long contractions</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/44.png" alt="human heart anatomy model cardiac muscle photo" data-caption="The heart is made of cardiac muscle, which works without a break all life long." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Voluntary muscles work when we want them to, while involuntary muscles work on their own without our will. Voluntary and cardiac muscles are richly supplied with blood, whereas involuntary smooth muscles have a poor blood supply.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/45.png" alt="Simple icons: a hand lifting a cup labelled VOLUNTARY, and a stomach with arrows labelled " data-caption="Lifting a cup is voluntary, while the movement of the stomach is involuntary." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The heart muscle is cardiac muscle, which is involuntary. Only skeletal muscle is voluntary.</div>
      <div class="cp-note exam">Remember which muscle is found only in the heart (cardiac) and which is attached to bones (skeletal).</div>
    `
  },
  67: {
    questext: "The muscle found only in the heart is called",
    options: ["smooth muscle", "cardiac muscle", "skeletal muscle", "voluntary muscle"],
    correct: "2",
    exptext: "✅ Cardiac muscle occurs only in the heart. 📌 Cardiac means heart. ❌ Smooth muscle is wrong because it is found in the stomach, intestines and blood vessels."
  },
  68: {
    questext: "Which of the following muscles is voluntary?",
    options: ["Cardiac muscle", "Smooth muscle of the stomach", "Muscle of the blood vessels", "Skeletal muscle"],
    correct: "4",
    exptext: "✅ Skeletal muscle is voluntary and attached to bones. 📌 You choose to move your arm. ❌ Cardiac muscle is wrong because it works without our will."
  },
  69: {
    questext: "Smooth muscles are found in the",
    options: ["walls of the stomach and intestines", "arm and leg", "heart only", "brain"],
    correct: "1",
    exptext: "✅ Smooth muscles are found in the stomach, intestines and blood vessels, and they cause slow long contractions. 📌 Smooth means involuntary and slow. ❌ Arm and leg have skeletal muscle."
  },
  70: {
    type: "concept", icon: "⚡", accent: "#d946ef", pauseTimer: true,
    title: "Nervous Tissue and Important Facts About Animal Tissue",
    html: `
      <p class="cp-lead"><b>Nervous tissue</b> is specialised to carry electrical signals and pass information from one part of the body to another. <u>Most of it is in the brain and the spinal cord.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/46.png" alt="A neuron drawn with labelled parts: Dendrites, Cell body, Axon, with an arrow showing the " data-caption="A neuron has dendrites, a cell body and an axon that carries the signal." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Nervous tissue has two types of cells: <b>neurons</b> and <b>neuroglia</b>. About 98 percent of nervous tissue is in the central nervous system, which is the brain and the spinal cord.</p>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Types of nervous tissue</td><td>Neurons and neuroglia</td></tr><tr><td>Where most nervous tissue lies</td><td>Brain and spinal cord</td></tr><tr><td>Tissue that joins two bones</td><td>Ligament</td></tr><tr><td>Tissue that stores fat</td><td>Adipose tissue</td></tr><tr><td>Tissue that makes skin, mouth lining and blood vessel lining</td><td>Epithelial tissue</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/47.png" alt="human brain neurons microscope photo" data-caption="Nerve cells, called neurons, under a microscope, joined by long thin branches." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Fat-storing adipose tissue is found below the skin and between internal organs. Two bones are joined by a very elastic tissue called a ligament. Muscles contain a special protein called contractile protein.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/48.png" alt="Mind map with centre ANIMAL TISSUES and four branches: Epithelial (covers), Connective (jo" data-caption="The four animal tissues and the main job of each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Do not mix neurons and neuroglia. Neurons carry signals, while neuroglia support the neurons.</div>
      <div class="cp-note exam">Learn the four tissues with their jobs: epithelial covers, connective joins, muscular moves and nervous carries signals.</div>
      <div class="cp-mnemonic">Cover, Connect, Contract, Communicate.</div>
    `
  },
  71: {
    questext: "Nervous tissue is made of",
    options: ["neurons and neuroglia", "tendons and ligaments", "cardiac and smooth cells", "platelets and plasma"],
    correct: "1",
    exptext: "✅ The two types of nervous tissue are neurons and neuroglia. 📌 Neurons send the signal and neuroglia support them. ❌ Tendons and ligaments are connective tissues."
  },
  72: {
    questext: "Which of the following tissues covers the body and lines the organs?",
    options: ["Nervous tissue", "Muscular tissue", "Epithelial tissue", "Fluid tissue"],
    correct: "3",
    exptext: "✅ Epithelial tissue covers the body and lines the organs. 📌 Epi means upon. ❌ Muscular tissue is wrong because it contracts."
  },
  73: {
    questext: "Most of the nervous tissue is found in the",
    options: ["skin", "heart", "stomach", "brain and spinal cord"],
    correct: "4",
    exptext: "✅ About 98 percent of nervous tissue is in the central nervous system, which is the brain and the spinal cord. 📌 Brain and spinal cord form the control room. ❌ Skin is wrong because it is mostly epithelial."
  },
  74: {
    questext: "Consider the following statements:\n1. Voluntary muscles and cardiac muscles are richly supplied with blood.\n2. Fat storing adipose tissue is found below the skin.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Active muscles need much blood, and fat sits under the skin. ❌ Neither is wrong because both are standard facts."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined microscope, a softly blurred glass petri dish and a subtle outline of a dividing cell" },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/1.png": { t: "fig", about: "Tree diagram: BIOLOGY at the top splits into two boxes, BOTANY (plants) and ZOOLOGY (animals)." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Theophrastus bust Father of Botany photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/2.png. A clear photo or bust of the Greek thinker Theophrastus",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aristotle marble bust museum photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/3.png. A clear photo of a marble bust of Aristotle",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/4.png": { t: "fig", about: "Mind-map with a centre circle STUDY NAMES and four branches: Anatomy, Cytology, Cardiology, Dermatology, each with a tiny icon for body, cell, heart and skin." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"honey bee hive apiculture beekeeper photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/5.png. Beekeeper holding a frame full of honey bees",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tree trunk cross section annual growth rings photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/6.png. Cut tree trunk showing clear rings",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/7.png": { t: "fig", about: "Four-picture strip with labels: Ecology (tree and animal), Embryology (tiny embryo), Entomology (insect), Ethology (animal behaviour)." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"floriculture flower farm greenhouse photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/8.png. Rows of cut flowers growing in a greenhouse",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/9.png": { t: "fig", about: "Three jars labelled SOIL (plant in earth), HYDROPONICS (plant roots in water with nutrients), and a label saying No soil needed." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/10.png": { t: "fig", about: "Body outline with four pointers: Liver - Hepatology, Kidney - Nephrology, Eye - Ophthalmology, Bones - Osteology." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ornithology bird watching binoculars photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/11.png. A person watching a bird with binoculars",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/12.png": { t: "fig", about: "Two thermometer pictures: a lizard with a body temperature that goes up and down labelled Cold blooded, and a bird with a steady temperature labelled Warm blooded." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"onion peel cells under microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/13.png. A clear microscope photo of onion peel cells with visible walls",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Robert Hooke Micrographia cork cells drawing\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/14.png. A copy of Hooke's drawing of cork cells",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/15.png": { t: "fig", about: "Two cells side by side: left cell labelled PROKARYOTE with floating DNA and NO NUCLEUS, right cell labelled EUKARYOTE with a clear NUCLEUS inside a membrane." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/16.png": { t: "fig", about: "Beaker with dots all in the left half, arrows spreading to the right half, labels: HIGH concentration, LOW concentration." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/17.png": { t: "fig", about: "Cell membrane diagram with water molecules passing through a thin wall from a watery side to a salty side, arrow labelled OSMOSIS." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"plasmolysis onion cells microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/18.png. Onion cells in salt solution with the cell contents pulled away from the wall",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/19.png": { t: "fig", about: "Simple animal cell cross section with labelled parts: Cell membrane, Cytoplasm, Nucleus, Ribosomes, Endoplasmic reticulum, Golgi apparatus, Lysosome." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/20.png": { t: "fig", about: "Pipeline diagram: Ribosome makes protein -> Rough ER carries it -> Golgi apparatus packs it -> Lysosome or outside the cell, with each step in a rounded box." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Golgi apparatus electron microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/21.png. An electron microscope image of the stacked Golgi apparatus",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"mitochondria electron microscope photo cristae\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/22.png. An electron microscope image of a mitochondrion showing folded inner membrane",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/23.png": { t: "fig", about: "Mitochondrion drawn as an oval with a folded inside, arrow labelled FOOD then arrow out labelled ATP ENERGY, and small labels own DNA and own ribosomes." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/24.png": { t: "fig", about: "Pair of small cylinders at right angles near a nucleus, labelled CENTRIOLES start cell division, with spindle fibres drawn out." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/25.png": { t: "fig", about: "Three small coloured cells labelled CHLOROPLAST (green), CHROMOPLAST (orange) and LEUCOPLAST (white)." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"chloroplast cells elodea microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/26.png. A clear microscope photo of green chloroplasts inside plant cells",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/27.png": { t: "fig", about: "Comparison of two cells: animal cell with small vacuoles and plant cell with one big central vacuole, both labelled." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/28.png": { t: "fig", about: "Cutaway of a nucleus with four labelled parts: Nuclear envelope, Chromatin, Chromosomes, Nucleolus." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human karyotype 46 chromosomes photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/29.png. A karyotype picture showing the 23 pairs of human chromosomes",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/30.png": { t: "fig", about: "Zoom picture: a cell, then its nucleus, then a chromosome, then a coiled DNA thread with a small segment highlighted and labelled GENE." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/31.png": { t: "fig", about: "Flow: one parent cell, arrow labelled MITOSIS, two identical daughter cells; second flow: parent cell, arrow labelled MEIOSIS, four different smaller cells." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/32.png": { t: "fig", about: "Horizontal strip of four small cell drawings labelled PROPHASE, METAPHASE, ANAPHASE, TELOPHASE, with chromosomes shown in each." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"mitosis stages onion root tip microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/33.png. A microscope photo of onion root tip cells in different stages of mitosis",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/34.png": { t: "fig", about: "Size ladder with five labelled cells from largest to smallest: Ostrich egg, Human ovum, Nerve cell (longest), Red blood cell, Mycoplasma." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human sperm ovum fertilisation microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/35.png. A microscope image of sperm cells around a human egg",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/36.png": { t: "fig", about: "Tadpole turning into a frog in three steps with the tail shrinking and a small label LYSOSOMES DIGEST TAIL." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/37.png": { t: "fig", about: "Two panels: SIMPLE epithelium shown as one layer of cells, STRATIFIED epithelium shown as many layers of cells." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/38.png": { t: "fig", about: "Three small cell drawings: Cuboidal (cube shape), Columnar (tall pillar shape), Squamous (thin flat shape), each labelled." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"epithelial tissue histology microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/39.png. A stained microscope slide of simple squamous epithelium",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/40.png": { t: "fig", about: "Four boxes labelled AREOLAR (fills spaces), ADIPOSE (fat), SKELETAL (bone and cartilage), FLUID (blood and lymph), each with a tiny icon." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human skeleton cartilage bone anatomy photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/41.png. A clear photo of a model of the human skeleton",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/42.png": { t: "fig", about: "Simple leg diagram with labels: MUSCLE, TENDON (muscle to bone), BONE, LIGAMENT (bone to bone)." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/43.png": { t: "fig", about: "Three panels labelled SKELETAL (long stripes, attached to bone), CARDIAC (branching stripes, heart), SMOOTH (spindle cells, no stripes)." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human heart anatomy model cardiac muscle photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/44.png. A clear photo of a heart anatomical model",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/45.png": { t: "fig", about: "Simple icons: a hand lifting a cup labelled VOLUNTARY, and a stomach with arrows labelled INVOLUNTARY." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/46.png": { t: "fig", about: "A neuron drawn with labelled parts: Dendrites, Cell body, Axon, with an arrow showing the signal direction." },
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/47.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human brain neurons microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/47.png. A stained microscope photo of nerve cells",
  "images/General_Awareness/Biology/Biology_Basics_Cell_and_Tissue/48.png": { t: "fig", about: "Mind map with centre ANIMAL TISSUES and four branches: Epithelial (covers), Connective (joins), Muscular (moves), Nervous (signals)." }
});

/* CHANGE LOG
   - Euthenics is written as improvement of human life through a better environment (the earlier line wrongly linked it to genetic engineering).
   - Etiology is written as the study of the causes of disease (the earlier line said life cycle of a pathogen).
   - Types of osmosis are written as the condition of the surrounding solution (hypotonic, isotonic, hypertonic), with the effect on the cell stated correctly.
   - The nucleolus is written as the part that makes ribosomes (the earlier line said it stores proteins).
   - Mitosis is written with four stages in order (prophase, metaphase, anaphase, telophase) after the resting stage called interphase; the number of chromosomes in a pea plant is left out because the earlier figure was wrong.
   - Columnar epithelium is written as lining the stomach and intestine; cuboidal epithelium as found in kidney tubules and glands.
*/
