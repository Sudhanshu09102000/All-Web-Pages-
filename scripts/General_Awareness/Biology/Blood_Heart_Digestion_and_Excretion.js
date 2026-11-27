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

/* Field: General_Awareness · Subject: Biology · Chapter: Blood_Heart_Digestion_and_Excretion · 10 concept pages (+ overview) · 34 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🩸", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Blood, Heart, Digestion and Excretion",
    thumb: {
      image: "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/thumbnail.png",
      banner: "SSC CGL GENERAL SCIENCE",
      line1: "HUMAN BODY",
      line2: "BLOOD + HEART",
      line3: "DIGESTION + KIDNEY",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Blood, Heart, Digestion and Excretion | SSC CGL Biology",
      altTitles: ["Blood Groups, Heart and Kidney Important Facts", "Human Digestive and Excretory System Full Class"],
      description: "The human body gives sure marks in General Science. In this class we learn blood and blood groups, the heart and circulation, the digestive system and the excretory system in very simple language.\n\n📌 IN THIS CLASS\n✅ Blood and its cells\n✅ Blood groups and Rh factor\n✅ Heart and blood pressure\n✅ Digestive and excretory system\n✅ Practice questions\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Biology #HumanBody",
      tags: ["blood groups ssc cgl", "human heart ssc", "digestive system biology", "excretory system kidney", "blood and its components", "rbc wbc platelets", "digestive juices enzymes", "human body mcq", "ssc cgl biology", "general science", "nephron functions", "general awareness", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "important questions", "concept class", "one shot", "static GK", "Blood Heart Digestion and Excr", "Biology for all exams"],
      hashtags: ["SSCCGL", "Biology", "HumanBody"],
      thumbText: "BLOOD + HEART + DIGESTION",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🩸 New class is live: Blood, Heart, Digestion and Excretion. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Lymphatic system\n00:00 Blood\n00:00 Blood groups\n00:00 Heart\n00:00 Digestive system\n00:00 Excretory system",
      playlist: "SSC CGL General Science — Biology Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on blood, the heart, the digestive system and the kidneys</u>. These topics give you many sure marks in General Science, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>10</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>34</b><span>Questions</span></div>
        <div class="cp-stat"><b>~54 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Lymphatic system and Immunity</b><br>How the spleen and antibodies help the body fight infection.</li>
        <li><b>Blood</b><br>What blood is made of, and the jobs of plasma, red blood cells, white blood cells and platelets.</li>
        <li><b>Blood groups</b><br>Who discovered the blood groups, who can give blood to whom, and what the Rh factor means.</li>
        <li><b>The Heart and Circulation</b><br>The chambers and layers of the heart, the two circuits of blood, blood pressure and the main blood vessels.</li>
        <li><b>The Digestive System</b><br>The five stages of digestion, the work of the stomach, small intestine, liver and gall bladder, and the digestive juices.</li>
        <li><b>The Excretory System</b><br>How the kidney and the nephron clean the blood, and how two hormones control water and salt.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Facts on blood, blood groups, the heart and the kidney are repeated in Staff Selection Commission papers year after year, and they are the easiest marks in biology.</div>
    `
  },
  2: {
    type: "concept", icon: "🛡️", accent: "#22c55e", pauseTimer: true,
    title: "The Lymphatic System and Immunity",
    html: `
      <p class="cp-lead">The <b>lymphatic system</b> helps the body fight infection. <u>Its most important organ is the spleen.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/1.png" alt="Body outline with the spleen on the left side highlighted and a label SPLEEN: filters bloo" data-caption="The spleen and lymph vessels help to filter the blood and fight infection." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The spleen is a store of blood and it filters, or cleans, the blood and lymph that flow through it. If the spleen is damaged or removed, the person is more likely to catch infections.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Spleen</td><td>Stores blood, filters blood and lymph, destroys old red blood cells</td></tr><tr><td>Immunity</td><td>The power of the body to resist disease</td></tr><tr><td>Antibody</td><td>A protein molecule made by the body to fight germs</td></tr><tr><td>Immunoglobulin</td><td>The other name for an antibody</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/2.png" alt="human spleen anatomy diagram location abdomen" data-caption="A medical diagram showing the position of the spleen on the left side of the abdomen." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Antibodies are protein molecules known as <b>immunoglobulins</b>. They stick to germs and help the body to destroy them.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/3.png" alt="A germ shaped cell with Y-shaped antibodies attached to it, labelled ANTIBODY (IMMUNOGLOBU" data-caption="Y-shaped antibodies attach to a germ so that the body can destroy it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Antibodies are proteins. Do not call them carbohydrates or fats.</div>
      <div class="cp-note exam">Remember that antibodies are immunoglobulins and that the spleen filters blood and lymph.</div>
    `
  },
  3: {
    questext: "Antibodies are chemically",
    options: ["carbohydrates", "fats", "proteins", "vitamins"],
    correct: "3",
    exptext: "✅ Antibodies are protein molecules known as immunoglobulins. 📌 Antibody means protein shield. ❌ Fats are wrong because they only store energy."
  },
  4: {
    questext: "Which organ of the lymphatic system stores blood and filters blood and lymph?",
    options: ["Liver", "Spleen", "Pancreas", "Kidney"],
    correct: "2",
    exptext: "✅ The spleen is a reservoir of blood and filters the blood and lymph. 📌 The spleen is the blood filter. ❌ The liver is wrong because its main work is to make bile."
  },
  5: {
    type: "concept", icon: "🩸", accent: "#f59e0b", pauseTimer: true,
    title: "Blood and Plasma",
    html: `
      <p class="cp-lead"><b>Blood</b> is a fluid connective tissue. <u>It carries oxygen, food and waste, and it fights infection and controls body temperature.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/4.png" alt="Test tube of blood separated into layers: top yellow PLASMA (54 percent), thin white layer" data-caption="Blood separates into plasma, white cells with platelets, and red cells." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Share of body weight</td><td>About 7 percent</td></tr><tr><td>Amount in an adult</td><td>About 5 to 6 litres</td></tr><tr><td>Difference between sexes</td><td>A woman has about half a litre less than a man</td></tr><tr><td>pH of blood</td><td>About 7.4</td></tr><tr><td>Where blood cells are made</td><td>Bone marrow</td></tr><tr><td>Study of blood</td><td>Haematology</td></tr></tbody></table>
      <p class="cp-lead">Blood has four parts: plasma, red blood corpuscles, white blood corpuscles and platelets. <b>Plasma</b> is the liquid part of blood. It makes up about 54 percent of the blood, and 92 percent of plasma is water.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/5.png" alt="blood sample test tube plasma red cells photo" data-caption="A centrifuged blood sample showing the pale yellow plasma above the red cells." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Plasma keeps the blood pressure steady, brings the proteins needed for clotting and immunity, carries minerals like sodium and potassium, and helps to keep the acid and base balance of the body.</p>
      <div class="cp-note trap">Plasma is the liquid part and is mostly water. Blood cells are made in the bone marrow, not in the liver.</div>
      <div class="cp-note exam">7 percent of body weight, 5 to 6 litres, pH 7.4 and bone marrow are the numbers asked most often.</div>
    `
  },
  6: {
    questext: "Blood cells are produced in the",
    options: ["liver", "spleen", "kidney", "bone marrow"],
    correct: "4",
    exptext: "✅ Blood cells are made in the bone marrow. 📌 Marrow is the blood factory. ❌ The spleen is wrong because it only filters and stores blood."
  },
  7: {
    questext: "The liquid part of the blood is called",
    options: ["serum", "plasma", "lymph", "platelet"],
    correct: "2",
    exptext: "✅ Plasma is the liquid portion of blood and is mostly water. 📌 Plasma carries the cells. ❌ Platelets are wrong because they are cell pieces that help clotting."
  },
  8: {
    questext: "The pH of human blood is about",
    options: ["5.0", "6.4", "7.4", "9.0"],
    correct: "3",
    exptext: "✅ The pH of blood is about 7.4, which is slightly basic. 📌 Remember 7.4. ❌ 6.4 is wrong because it is acidic."
  },
  9: {
    type: "concept", icon: "🔴", accent: "#ef4444", pauseTimer: true,
    title: "Blood Cells — Red Cells, White Cells and Platelets",
    html: `
      <p class="cp-lead">Blood has three kinds of cells. <u>Each one has a different job: carrying oxygen, fighting germs and clotting blood.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/6.png" alt="Three coloured cell drawings: RED BLOOD CELL (disc, no nucleus), WHITE BLOOD CELL (with nu" data-caption="The three kinds of blood cells: red, white and platelets." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Cell</th><th>Job</th><th>Key facts</th></tr></thead><tbody><tr><td>Red blood cell (erythrocyte)</td><td>Carries oxygen</td><td>Disc shaped, has haemoglobin, no nucleus, made in bone marrow, lives about 120 days</td></tr><tr><td>White blood cell (leucocyte)</td><td>Fights infection</td><td>Has a nucleus, made in bone marrow, can leave blood to reach tissues</td></tr><tr><td>Platelet</td><td>Clotting of blood</td><td>Cell pieces that stick together at damaged blood vessels</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/7.png" alt="blood smear red white blood cells platelets microscope photo" data-caption="A blood smear under a microscope showing red cells, a white cell and platelets." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Haemoglobin</b> picks up oxygen and carries it to all parts of the body, then takes carbon dioxide back. Blood with plenty of oxygen has oxyhaemoglobin, and blood with little oxygen has deoxyhaemoglobin. Old red blood cells are destroyed in the liver and the spleen, so the spleen is called the graveyard of red blood cells.</p>
      <table><thead><tr><th>Count or level</th><th>Value</th></tr></thead><tbody><tr><td>Red blood cells in men</td><td>5 to 6 million per cubic millimetre</td></tr><tr><td>Red blood cells in women</td><td>4 to 5 million per cubic millimetre</td></tr><tr><td>Haemoglobin in men</td><td>14 to 15 grams per 100 millilitres</td></tr><tr><td>Haemoglobin in women</td><td>11 to 14 grams per 100 millilitres</td></tr><tr><td>Platelets</td><td>150000 to 400000 per microlitre</td></tr><tr><td>Largest white cell</td><td>Monocyte</td></tr><tr><td>Smallest white cell</td><td>Lymphocyte</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/8.png" alt="Bar picture comparing haemoglobin: man 14 to 15 and woman 11 to 14, with a red blood cell " data-caption="Men normally have a slightly higher haemoglobin level than women." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Red blood cells carry oxygen but have no nucleus. White blood cells have a nucleus. Platelets help in clotting but do not fight germs.</div>
      <div class="cp-note exam">Erythrocyte means red cell, leucocyte means white cell, and the monocyte is the largest white cell while the lymphocyte is the smallest.</div>
      <div class="cp-mnemonic">Red carries, White fights, Platelets plug.</div>
    `
  },
  10: {
    questext: "Which cells of the blood help in clotting?",
    options: ["Red blood cells", "White blood cells", "Platelets", "Plasma cells"],
    correct: "3",
    exptext: "✅ Platelets bind together at damaged blood vessels and help in clotting. 📌 Platelet plugs the cut. ❌ White blood cells are wrong because they fight infection."
  },
  11: {
    questext: "Red blood cells are also called",
    options: ["leucocytes", "thrombocytes", "monocytes", "erythrocytes"],
    correct: "4",
    exptext: "✅ Red blood cells are also called erythrocytes. 📌 Erythro means red. ❌ Leucocytes are white cells, so they are the tempting wrong option."
  },
  12: {
    questext: "Which one of the following is the largest white blood cell?",
    options: ["Monocyte", "Lymphocyte", "Neutrophil", "Platelet"],
    correct: "1",
    exptext: "✅ The monocyte is the largest white blood cell. 📌 Mono sounds like main big one. ❌ The lymphocyte is wrong because it is the smallest white cell."
  },
  13: {
    questext: "Consider the following statements:\n1. Red blood cells of mammals have no nucleus.\n2. Haemoglobin carries oxygen.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 No nucleus gives more room for haemoglobin. ❌ Neither is wrong because both facts are standard."
  },
  14: {
    type: "concept", icon: "🅰️", accent: "#8b5cf6", pauseTimer: true,
    title: "Blood Groups and the Rh Factor",
    html: `
      <p class="cp-lead">Blood groups were discovered by <b>Karl Landsteiner</b> in 1900, so he is called the Father of Blood Grouping. <u>He found the groups A, B and O.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/9.png" alt="Karl Landsteiner portrait Nobel Prize photo" data-caption="Karl Landsteiner, the scientist who discovered the A, B and O blood groups." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The fourth group, <b>AB</b>, was found later by Decastello and Sturli. Blood group O is the <b>universal donor</b>, because it has no antigen. Blood group AB is the <b>universal recipient</b>, because it has no antibody.</p>
      <table><thead><tr><th>Blood group</th><th>Antigen on red cells</th><th>Antibody in plasma</th><th>Can give blood to</th><th>Can receive blood from</th></tr></thead><tbody><tr><td>A</td><td>A</td><td>B</td><td>A, AB</td><td>A, O</td></tr><tr><td>B</td><td>B</td><td>A</td><td>B, AB</td><td>B, O</td></tr><tr><td>AB</td><td>A and B</td><td>None</td><td>Only AB</td><td>All groups (universal recipient)</td></tr><tr><td>O</td><td>None</td><td>A and B</td><td>All groups (universal donor)</td><td>Only O</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/10.png" alt="Four blood drop icons A, B, AB, O with arrows showing who gives to whom, and a star on O a" data-caption="Group O can give to everyone, and group AB can receive from everyone." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>Rh factor</b> is an antigen found on red blood cells. A person who has it is Rh positive and a person who does not have it is Rh negative. An Rh positive person can receive blood from both Rh positive and Rh negative people, but an Rh negative person can receive blood only from Rh negative people. The technique of blood transfusion was developed by Dr. James Blundell.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/11.png" alt="Two drop icons: Rh+ with the label can receive Rh+ and Rh-, and Rh- with the label can rec" data-caption="Rh negative blood can be given to everyone, but Rh negative people can receive only Rh negative blood." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">O is the universal donor and AB is the universal recipient. Students often reverse them.</div>
      <div class="cp-note exam">Landsteiner, Decastello and Sturli, universal donor O and universal recipient AB are asked again and again.</div>
      <div class="cp-mnemonic">O gives to all (O = Open hand). AB takes from all (AB = All Blood in).</div>
    `
  },
  15: {
    questext: "Who discovered the ABO blood groups?",
    options: ["Karl Landsteiner", "Edward Jenner", "William Harvey", "Robert Koch"],
    correct: "1",
    exptext: "✅ Karl Landsteiner discovered the A, B and O blood groups in 1900. 📌 Landsteiner is the father of blood grouping. ❌ Edward Jenner is wrong because he developed the smallpox vaccine."
  },
  16: {
    questext: "The universal blood donor group is",
    options: ["AB", "A", "B", "O"],
    correct: "4",
    exptext: "✅ Group O is the universal donor because it carries no antigen on its red cells. 📌 O means zero antigen. ❌ AB is wrong because it is the universal recipient."
  },
  17: {
    questext: "A person with blood group AB can receive blood from",
    options: ["only AB", "only O", "all groups", "only A and B"],
    correct: "3",
    exptext: "✅ Group AB has no antibodies in plasma, so it can receive from all groups. 📌 AB is the universal recipient. ❌ Only AB is wrong because other groups can also be given."
  },
  18: {
    questext: "Which one of the following is correct about the Rh factor?",
    options: ["It is an antigen found on red blood cells", "It is an antibody found in plasma", "It is a hormone", "It is a vitamin"],
    correct: "1",
    exptext: "✅ The Rh factor is an antigen on red blood cells. 📌 Rh positive means the antigen is present. ❌ An antibody in plasma is wrong because antibodies are not the Rh factor."
  },
  19: {
    type: "concept", icon: "❤️", accent: "#14b8a6", pauseTimer: true,
    title: "The Human Heart — Structure",
    html: `
      <p class="cp-lead">The heart pumps blood to the whole body through the circulatory system. <u>It brings oxygen and food to the tissues and takes away carbon dioxide and wastes.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/12.png" alt="Heart cross section with labelled chambers: Right atrium, Right ventricle, Left atrium, Le" data-caption="The four chambers of the heart, the septum and the valves." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The heart has <b>four chambers</b>. The right atrium and right ventricle make up the right heart. The left atrium and left ventricle make up the left heart. A wall of muscle called the <b>septum</b> separates the two sides, and <b>valves</b> stop blood flowing backwards.</p>
      <table><thead><tr><th>Part</th><th>Fact</th></tr></thead><tbody><tr><td>Pericardium</td><td>Double walled sac around the heart that protects it</td></tr><tr><td>Epicardium</td><td>Outermost layer of the heart wall</td></tr><tr><td>Myocardium</td><td>Middle layer that contains the muscle that contracts</td></tr><tr><td>Endocardium</td><td>Inner layer that touches the blood</td></tr><tr><td>Sinoatrial node</td><td>Makes the electrical pulses for each heartbeat (the pacemaker)</td></tr><tr><td>Weight of the heart</td><td>About 200 to 300 grams</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/13.png" alt="human heart anatomy model chambers photo" data-caption="An anatomical model of the human heart showing the chambers and large blood vessels." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Heart valves are four valves that control the flow of blood through the chambers. Atria are the chambers into which blood returns from the body. Ventricles are the lower chambers.</p>
      <div class="cp-note trap">The pericardium is outside the heart, but the endocardium is the innermost layer. Their names are alike, so read carefully.</div>
      <div class="cp-note exam">Four chambers, three layers (epicardium, myocardium, endocardium) and the sinoatrial node as pacemaker are standard questions.</div>
      <div class="cp-mnemonic">Epi = outer, Myo = muscle (middle), Endo = inner.</div>
    `
  },
  20: {
    questext: "How many chambers does the human heart have?",
    options: ["Two", "Three", "Four", "Five"],
    correct: "3",
    exptext: "✅ The human heart has four chambers: two atria and two ventricles. 📌 2 above and 2 below. ❌ Three is wrong because that belongs to the frog heart."
  },
  21: {
    questext: "The natural pacemaker of the heart is the",
    options: ["sinoatrial node", "septum", "pericardium", "endocardium"],
    correct: "1",
    exptext: "✅ The sinoatrial node makes the electrical pulses that drive the heartbeat. 📌 It sets the pace. ❌ The septum is wrong because it only separates the two sides of the heart."
  },
  22: {
    questext: "The middle layer of the heart wall that contains the contracting muscle is the",
    options: ["epicardium", "endocardium", "pericardium", "myocardium"],
    correct: "4",
    exptext: "✅ The myocardium is the middle muscular layer. 📌 Myo means muscle. ❌ The epicardium is wrong because it is the outer layer."
  },
  23: {
    type: "concept", icon: "🔄", accent: "#ec4899", pauseTimer: true,
    title: "Heart Function, Blood Vessels and Blood Pressure",
    html: `
      <p class="cp-lead">The heart sends blood through two paths, called circuits. <u>One goes to the lungs and the other goes to the whole body.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/14.png" alt="Figure of eight loop: LEFT loop heart to lungs (pulmonary circuit) with blue to red colour" data-caption="The pulmonary circuit goes to the lungs and the systemic circuit goes to the whole body." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Circuit</th><th>Path of blood</th></tr></thead><tbody><tr><td>Pulmonary</td><td>Poor-oxygen blood leaves the right ventricle by the pulmonary artery, goes to the lungs, and returns rich in oxygen to the left atrium by the pulmonary vein</td></tr><tr><td>Systemic</td><td>Rich-oxygen blood leaves the left ventricle by the aorta, reaches the body, and returns poor in oxygen by the vena cava to the right atrium</td></tr></tbody></table>
      <p class="cp-lead">The pulmonary artery is the only artery that carries oxygen-poor blood, and the pulmonary vein is the only vein that carries oxygen-rich blood. The aorta is the largest artery in the body.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/15.png" alt="aorta heart blood vessels anatomy diagram photo" data-caption="A labelled diagram of the aorta leaving the heart and the large blood vessels." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Vessel</th><th>Fact</th></tr></thead><tbody><tr><td>Artery</td><td>Carries blood away from the heart; the aorta is the largest</td></tr><tr><td>Vein</td><td>Carries blood to the heart; has thin walls, wide space and valves</td></tr><tr><td>Capillary</td><td>Smallest vessel; oxygen and food pass out and wastes pass in</td></tr><tr><td>Largest vein</td><td>Inferior vena cava</td></tr></tbody></table>
      <table><thead><tr><th>Measurement</th><th>Value</th></tr></thead><tbody><tr><td>Normal blood pressure</td><td>120 over 80 millimetres of mercury</td></tr><tr><td>Normal heart beat at rest</td><td>72 beats per minute</td></tr><tr><td>Instrument for blood pressure</td><td>Sphygmomanometer</td></tr><tr><td>Pulse</td><td>The alternate stretch and shrinking of an artery as blood passes</td></tr><tr><td>Time for blood to complete one circuit</td><td>About 20 seconds</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/16.png" alt="Blood pressure gauge with the needle at 120 over 80 and a label SPHYGMOMANOMETER: blood pr" data-caption="A normal blood pressure is 120 over 80 millimetres of mercury." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A heart attack is caused by a blocked artery, while cardiac arrest is a sudden loss of heart function. Atherosclerosis is hardening of artery walls from fatty deposits.</div>
      <div class="cp-note exam">Pulmonary artery carries oxygen-poor blood, and the sphygmomanometer measures blood pressure.</div>
      <div class="cp-mnemonic">Arteries Away, Veins Visit the heart.</div>
    `
  },
  24: {
    questext: "Which is the only artery that carries oxygen-poor blood?",
    options: ["Aorta", "Pulmonary artery", "Coronary artery", "Carotid artery"],
    correct: "2",
    exptext: "✅ The pulmonary artery carries oxygen-poor blood from the heart to the lungs. 📌 Only exception among arteries. ❌ The aorta is wrong because it carries oxygen-rich blood."
  },
  25: {
    questext: "The instrument used to measure blood pressure is the",
    options: ["stethoscope", "thermometer", "sphygmomanometer", "cardiograph"],
    correct: "3",
    exptext: "✅ A sphygmomanometer measures blood pressure, which is normally 120 over 80 millimetres of mercury. 📌 Blood pressure has its own meter. ❌ A stethoscope is wrong because it is used to hear sounds of the heart."
  },
  26: {
    questext: "Which is the largest artery in the human body?",
    options: ["Pulmonary artery", "Vena cava", "Capillary", "Aorta"],
    correct: "4",
    exptext: "✅ The aorta is the largest artery and carries oxygen-rich blood from the heart. 📌 Aorta is the main road. ❌ The vena cava is wrong because it is a vein."
  },
  27: {
    questext: "Which of the following is correct about the blood vessels?\n1. Veins have valves that stop the backflow of blood.\n2. Capillaries are the smallest blood vessels.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Valves in veins keep blood moving one way. ❌ Neither is wrong because both are standard facts."
  },
  28: {
    type: "concept", icon: "🍽️", accent: "#3b82f6", pauseTimer: true,
    title: "The Digestive System — Stages, Mouth and Stomach",
    html: `
      <p class="cp-lead">Digestion breaks big food molecules into small ones that the body can use. <u>It goes through five stages.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/17.png" alt="Five boxes in a row: MOVEMENT, SECRETION, DIGESTION, ABSORPTION, ELIMINATION, with a small" data-caption="The five stages of digestion in order, from movement to elimination." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Stage</th><th>What happens</th></tr></thead><tbody><tr><td>Movement</td><td>Food is pushed through the digestive tube</td></tr><tr><td>Secretion</td><td>Digestive juices are released</td></tr><tr><td>Digestion</td><td>Food is broken into very small parts</td></tr><tr><td>Absorption</td><td>The small parts pass into the body</td></tr><tr><td>Elimination</td><td>Undigested food and waste leave the body</td></tr></tbody></table>
      <p class="cp-lead">The human digestive tube is about 6 to 9 metres long, running from the mouth to the anus. In the mouth, the salivary glands make salivary amylase, which starts breaking starch into sugar (maltose). The food and saliva mix is then pushed into the pharynx and the food pipe.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/18.png" alt="human digestive system anatomy diagram labelled photo" data-caption="A labelled diagram of the human digestive system from mouth to anus." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Gastric juice in the stomach has three parts: <b>hydrochloric acid</b>, pepsinogen and mucus. Hydrochloric acid kills microorganisms, lowers the pH of the stomach to between 1.5 and 2.5, and switches on the enzyme pepsin. Pepsin starts the digestion of proteins. The thick mix of acid and food is called <b>chyme</b>.</p>
      <table><thead><tr><th>Part of gastric juice</th><th>Job</th></tr></thead><tbody><tr><td>Hydrochloric acid</td><td>Kills germs and activates pepsin</td></tr><tr><td>Pepsinogen</td><td>Becomes pepsin, which digests proteins</td></tr><tr><td>Mucus</td><td>Protects the stomach wall from the acid</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/19.png" alt="Stomach cut open with labels Acid, Pepsin, Mucus layer, and Chyme leaving to the small int" data-caption="The stomach mixes food with acid and pepsin to make chyme." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Peptic ulcers happen when the mucus protection fails. At least 90 percent of peptic ulcers are caused by the bacterium <b>Helicobacter pylori</b>. Stress and aspirin can also cause ulcers.</p>
      <div class="cp-note trap">Salivary amylase digests starch, while pepsin digests protein. The stomach starts protein digestion, not starch digestion.</div>
      <div class="cp-note exam">Remember that hydrochloric acid activates pepsin and that Helicobacter pylori causes peptic ulcers.</div>
    `
  },
  29: {
    questext: "Which acid is present in the human stomach?",
    options: ["Sulphuric acid", "Hydrochloric acid", "Nitric acid", "Acetic acid"],
    correct: "2",
    exptext: "✅ Hydrochloric acid in gastric juice kills germs and activates pepsin. 📌 Stomach acid is HCl. ❌ Sulphuric acid is wrong because it is not made in the body."
  },
  30: {
    questext: "Peptic ulcers are mainly caused by",
    options: ["a virus", "lack of vitamin C", "too much sugar", "Helicobacter pylori bacterium"],
    correct: "4",
    exptext: "✅ At least 90 percent of peptic ulcers are caused by Helicobacter pylori. 📌 H. pylori hurts the stomach. ❌ A virus is wrong because the cause is a bacterium."
  },
  31: {
    questext: "Digestion of starch starts in the",
    options: ["mouth", "stomach", "small intestine", "large intestine"],
    correct: "1",
    exptext: "✅ Salivary amylase in the mouth starts the digestion of starch. 📌 Chew rice and it tastes sweet. ❌ The stomach is wrong because it starts protein digestion."
  },
  32: {
    type: "concept", icon: "🌀", accent: "#f97316", pauseTimer: true,
    title: "Small Intestine, Liver, Gall Bladder and Large Intestine",
    html: `
      <p class="cp-lead">The <b>small intestine</b> is the main site of digestion and absorption of food. <u>It is about 22 feet, or 6.7 metres, long.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/20.png" alt="Small intestine coiled with three labelled sections: Duodenum, Jejunum, Ileum, and a close" data-caption="The small intestine has three parts: duodenum, jejunum and ileum." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Parts of small intestine</td><td>Duodenum, jejunum, ileum</td></tr><tr><td>Sugars and amino acids</td><td>Enter the blood by the capillaries in each villus</td></tr><tr><td>Glycerol and fatty acids</td><td>Enter the lymphatic system</td></tr><tr><td>Bile salts</td><td>Absorbed in the ileum</td></tr><tr><td>Large intestine</td><td>Colon, caecum, appendix and rectum</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/21.png" alt="villi small intestine electron microscope photo" data-caption="Finger-like villi lining the small intestine to increase the area for absorption." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>liver</b> is the largest gland in the body and lies in the upper right part of the abdomen. It makes bile, which goes to the small intestine through the hepatic duct. Bile has cholesterol, phospholipids, bilirubin and a mix of salts. The <b>gall bladder</b> stores the extra bile.</p>
      <table><thead><tr><th>Work of the liver</th><th>Detail</th></tr></thead><tbody><tr><td>Makes bile</td><td>Helps in the digestion of fat</td></tr><tr><td>Detoxifies blood</td><td>Removes harmful substances</td></tr><tr><td>Makes blood proteins</td><td>Including the proteins needed for clotting</td></tr><tr><td>Stores glucose</td><td>As glycogen, and releases it when blood sugar drops</td></tr><tr><td>Makes urea</td><td>From amino groups and ammonia</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/22.png" alt="Liver with a gall bladder below it, an arrow of bile to the small intestine and labels LIV" data-caption="The liver makes bile and the gall bladder stores it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Jaundice is the yellow colour of the skin when too much of the breakdown products of haemoglobin stay in the blood. It shows that the liver is not working well. Hepatitis A, B and C are viral diseases that damage the liver, and cirrhosis is common in people who drink much alcohol. In plants, extra sugar is stored as starch, while animals store it as glycogen.</p>
      <div class="cp-note trap">Bile is made in the liver but stored in the gall bladder. The gall bladder does not make bile.</div>
      <div class="cp-note exam">The liver is the largest gland, bile helps in fat digestion, and the small intestine is the main site of absorption.</div>
      <div class="cp-mnemonic">Liver Makes, Gall bladder Gathers (stores).</div>
    `
  },
  33: {
    questext: "The largest gland of the human body is the",
    options: ["pancreas", "thyroid", "pituitary", "liver"],
    correct: "4",
    exptext: "✅ The liver is the largest gland of the body. 📌 It is on the upper right side. ❌ The thyroid is wrong because it is the largest endocrine gland."
  },
  34: {
    questext: "Bile is stored in the",
    options: ["liver", "gall bladder", "pancreas", "stomach"],
    correct: "2",
    exptext: "✅ The gall bladder stores bile for release later. 📌 Gall bladder is the store. ❌ The liver is wrong because it makes the bile."
  },
  35: {
    questext: "The main site of digestion and absorption in the human body is the",
    options: ["stomach", "mouth", "small intestine", "large intestine"],
    correct: "3",
    exptext: "✅ The small intestine is the main site of digestion and absorption. 📌 It is long and has villi. ❌ The stomach is wrong because it mostly digests protein."
  },
  36: {
    questext: "Animals store extra glucose in the form of",
    options: ["starch", "glycogen", "cellulose", "fat only"],
    correct: "2",
    exptext: "✅ Animals store glucose as glycogen in the liver, while plants store it as starch. 📌 Glycogen is for animals. ❌ Starch is wrong because it is the plant store."
  },
  37: {
    type: "concept", icon: "🧫", accent: "#84cc16", pauseTimer: true,
    title: "Digestive Juices and Digestion Facts",
    html: `
      <p class="cp-lead">Each digestive juice has its own enzymes. <u>An enzyme is a protein that speeds up a chemical change in the body.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/23.png" alt="Four juice drops labelled SALIVA, GASTRIC JUICE, PANCREATIC JUICE, INTESTINAL JUICE, each " data-caption="Four digestive juices, each made in a different part of the digestive system." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Juice</th><th>Main enzymes</th></tr></thead><tbody><tr><td>Saliva</td><td>Salivary amylase (ptyalin)</td></tr><tr><td>Gastric juice</td><td>Pepsin and rennin</td></tr><tr><td>Pancreatic juice</td><td>Trypsin, amylase and lipase</td></tr><tr><td>Intestinal juice</td><td>Erepsin, maltase, lactase, sucrase and lipase</td></tr></tbody></table>
      <p class="cp-lead">In digestion, carbohydrates are broken into simple sugars such as glucose, fats into fatty acids and glycerol, and proteins into amino acids. The pancreatic juice acts on carbohydrates, proteins and fats, so it is the most complete digestive juice.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/24.png" alt="Three arrows: CARBOHYDRATES to GLUCOSE, FATS to FATTY ACIDS and GLYCEROL, PROTEINS to AMIN" data-caption="The end products of digestion: glucose, fatty acids with glycerol, and amino acids." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Humans cannot digest <b>cellulose</b>, which is found in grass. An amoeba puts out finger-like projections called pseudopodia around food, swallows it, and the food becomes trapped in a food vacuole. A starfish feeds on animals with half shells of calcium carbonate.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/25.png" alt="amoeba pseudopodia feeding microscope photo" data-caption="An amoeba surrounding food with its pseudopodia, which then forms a food vacuole." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Rennin and pepsin are in gastric juice, but trypsin and lipase are in pancreatic juice. Do not mix up the two juices.</div>
      <div class="cp-note exam">Trypsin is from the pancreas, pepsin is from the stomach and salivary amylase is from the mouth.</div>
    `
  },
  38: {
    questext: "Pepsin is found in",
    options: ["saliva", "gastric juice", "pancreatic juice", "bile"],
    correct: "2",
    exptext: "✅ Pepsin is an enzyme of the gastric juice that digests proteins. 📌 Pepsin works in the stomach. ❌ Trypsin is the pancreatic enzyme, so it is the tempting wrong option."
  },
  39: {
    questext: "Which of the following enzymes is found in pancreatic juice?",
    options: ["Pepsin", "Ptyalin", "Maltase", "Trypsin"],
    correct: "4",
    exptext: "✅ Trypsin, amylase and lipase are present in pancreatic juice. 📌 Trypsin is the pancreas enzyme. ❌ Pepsin is wrong because it is found in gastric juice."
  },
  40: {
    questext: "Which carbohydrate in grass can humans NOT digest?",
    options: ["Starch", "Cellulose", "Glucose", "Sucrose"],
    correct: "2",
    exptext: "✅ Humans cannot digest cellulose. 📌 Cattle can digest it with the help of bacteria. ❌ Starch is wrong because it is digested by amylase."
  },
  41: {
    type: "concept", icon: "🫘", accent: "#06b6d4", pauseTimer: true,
    title: "The Excretory System — Kidney and Nephron",
    html: `
      <p class="cp-lead">The excretory system removes waste from the body. <u>In vertebrates it includes the kidneys, liver, lungs and skin.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/26.png" alt="Human urinary system with labelled parts: Kidneys, Ureters, Bladder, Urethra, with arrows " data-caption="The human urinary system: kidneys, ureters, bladder and urethra." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The human urinary system is made up of the kidneys, ureters, bladder and urethra. The <b>nephron</b> is the functional unit of the kidney. It does three jobs: filtering water and dissolved substances from the blood, taking useful substances back into the blood, and adding ions and wastes into the tube.</p>
      <table><thead><tr><th>Nephron step</th><th>What happens</th></tr></thead><tbody><tr><td>Glomerular filtration</td><td>Water and small substances are filtered from the blood</td></tr><tr><td>Tubular reabsorption</td><td>Water and useful molecules are taken back into the blood</td></tr><tr><td>Tubular secretion</td><td>Ions and wastes pass into the tubule from nearby capillaries</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/27.png" alt="kidney nephron structure diagram photo" data-caption="A labelled diagram of a nephron, the filtering unit of the kidney." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The kidneys keep the volume and the ionic balance of body fluids, keep the pH steady, and remove toxic wastes such as urea, ammonia and uric acid. Extra wastes can crystallise as <b>kidney stones</b>. When the kidneys fail, dialysis (an artificial kidney) or a kidney transplant is the help.</p>
      <table><thead><tr><th>Hormone</th><th>Source</th><th>Job</th></tr></thead><tbody><tr><td>Antidiuretic hormone (ADH)</td><td>Pituitary gland</td><td>Increases water absorption in the kidneys</td></tr><tr><td>Aldosterone</td><td>Adrenal glands</td><td>Makes the kidney take back more sodium and so more water</td></tr><tr><td>Renin</td><td>Kidneys</td><td>Helps to control aldosterone</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/28.png" alt="Kidney diagram with two arrows: ADH from pituitary labelled WATER BACK and ALDOSTERONE fro" data-caption="Antidiuretic hormone and aldosterone control water and salt in the kidney." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Antidiuretic hormone comes from the pituitary gland, not from the kidney. Aldosterone comes from the adrenal glands.</div>
      <div class="cp-note exam">Nephron as the functional unit of the kidney, kidney stones and the pituitary hormone ADH are asked very often.</div>
      <div class="cp-mnemonic">ADH = Add water Death-of-thirst. Nephron = Filter.</div>
    `
  },
  42: {
    questext: "The functional unit of the kidney is the",
    options: ["neuron", "nephron", "alveolus", "villus"],
    correct: "2",
    exptext: "✅ The nephron is the filtering and functional unit of the kidney. 📌 Nephro means kidney. ❌ The neuron is wrong because it is the unit of the nervous system."
  },
  43: {
    questext: "Which hormone increases the absorption of water by the kidneys?",
    options: ["Insulin", "Thyroxine", "Antidiuretic hormone", "Adrenaline"],
    correct: "3",
    exptext: "✅ Antidiuretic hormone acts on the kidneys to increase water absorption. 📌 Anti-diuretic means against passing much urine. ❌ Insulin is wrong because it controls blood sugar."
  },
  44: {
    questext: "The excretory waste that is formed in the liver from ammonia is",
    options: ["urea", "bile", "glucose", "glycogen"],
    correct: "1",
    exptext: "✅ The liver makes urea from amino groups and ammonia, and the kidney removes it. 📌 Urea leaves in urine. ❌ Bile is wrong because it helps in digestion."
  },
  45: {
    questext: "Consider the following statements:\n1. Aldosterone is a hormone of the adrenal glands.\n2. The nephron is the functional unit of the kidney.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Adrenal means near the kidney. ❌ Neither is wrong because both are standard facts."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined human heart outline, a softly blurred glass test tube of blood and a subtle stethoscope" },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/1.png": { t: "fig", about: "Body outline with the spleen on the left side highlighted and a label SPLEEN: filters blood and lymph, plus a lymph vessel line." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human spleen anatomy diagram location abdomen\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/2.png. A medical diagram showing the spleen on the left side under the ribs",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/3.png": { t: "fig", about: "A germ shaped cell with Y-shaped antibodies attached to it, labelled ANTIBODY (IMMUNOGLOBULIN) and GERM." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/4.png": { t: "fig", about: "Test tube of blood separated into layers: top yellow PLASMA (54 percent), thin white layer WBC and PLATELETS, bottom red RBC." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"blood sample test tube plasma red cells photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/5.png. A clear photo of a blood sample separated into layers",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/6.png": { t: "fig", about: "Three coloured cell drawings: RED BLOOD CELL (disc, no nucleus), WHITE BLOOD CELL (with nucleus), PLATELET (small fragment)." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"blood smear red white blood cells platelets microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/7.png. A stained microscope photo of a blood smear",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/8.png": { t: "fig", about: "Bar picture comparing haemoglobin: man 14 to 15 and woman 11 to 14, with a red blood cell icon." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Karl Landsteiner portrait Nobel Prize photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/9.png. A portrait photo of Karl Landsteiner",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/10.png": { t: "fig", about: "Four blood drop icons A, B, AB, O with arrows showing who gives to whom, and a star on O as DONOR and on AB as RECEIVER." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/11.png": { t: "fig", about: "Two drop icons: Rh+ with the label can receive Rh+ and Rh-, and Rh- with the label can receive only Rh-." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/12.png": { t: "fig", about: "Heart cross section with labelled chambers: Right atrium, Right ventricle, Left atrium, Left ventricle, Septum, Valves, with red and blue colouring." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human heart anatomy model chambers photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/13.png. A clear photo of a human heart anatomical model",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/14.png": { t: "fig", about: "Figure of eight loop: LEFT loop heart to lungs (pulmonary circuit) with blue to red colour change; RIGHT loop heart to body (systemic circuit) with red to blue colour change." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"aorta heart blood vessels anatomy diagram photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/15.png. A labelled diagram of the aorta and the major blood vessels",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/16.png": { t: "fig", about: "Blood pressure gauge with the needle at 120 over 80 and a label SPHYGMOMANOMETER: blood pressure." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/17.png": { t: "fig", about: "Five boxes in a row: MOVEMENT, SECRETION, DIGESTION, ABSORPTION, ELIMINATION, with a small food icon above each." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human digestive system anatomy diagram labelled photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/18.png. A labelled diagram of the human digestive system",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/19.png": { t: "fig", about: "Stomach cut open with labels Acid, Pepsin, Mucus layer, and Chyme leaving to the small intestine." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/20.png": { t: "fig", about: "Small intestine coiled with three labelled sections: Duodenum, Jejunum, Ileum, and a close up of a villus." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"villi small intestine electron microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/21.png. A microscope image of the finger-like villi lining the small intestine",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/22.png": { t: "fig", about: "Liver with a gall bladder below it, an arrow of bile to the small intestine and labels LIVER: makes bile, GALL BLADDER: stores bile." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/23.png": { t: "fig", about: "Four juice drops labelled SALIVA, GASTRIC JUICE, PANCREATIC JUICE, INTESTINAL JUICE, each connected to its organ." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/24.png": { t: "fig", about: "Three arrows: CARBOHYDRATES to GLUCOSE, FATS to FATTY ACIDS and GLYCEROL, PROTEINS to AMINO ACIDS." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"amoeba pseudopodia feeding microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/25.png. A microscope photo of an amoeba surrounding food with pseudopodia",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/26.png": { t: "fig", about: "Human urinary system with labelled parts: Kidneys, Ureters, Bladder, Urethra, with arrows of urine flow." },
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"kidney nephron structure diagram photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/27.png. A labelled medical diagram of a nephron",
  "images/General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion/28.png": { t: "fig", about: "Kidney diagram with two arrows: ADH from pituitary labelled WATER BACK and ALDOSTERONE from adrenal labelled SODIUM BACK." }
});

/* CHANGE LOG
   - The red blood cells are written as destroyed in the liver and the spleen, with the spleen called the graveyard of red blood cells (the earlier line named only the liver).
   - Saliva is written as containing salivary amylase, which breaks starch into maltose (the earlier lines named the wrong enzymes and said glucose).
   - Aldosterone is written as made by the adrenal glands (the earlier line said the kidneys).
   - The life span of red blood cells is written as about 120 days; the number of white blood cell days is left out because the earlier figures did not agree.
*/
