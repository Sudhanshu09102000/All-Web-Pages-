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

/* Field: General_Awareness · Subject: Biology · Chapter: Classification_Microorganisms_and_Diseases · 22 concept pages (+ overview) · 57 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🔬", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Classification, Micro-organisms and Diseases",
    thumb: {
      image: "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "BIOLOGY MADE EASY",
      line2: "CLASSIFICATION + DISEASES",
      line3: "MICRO-ORGANISMS",
      badge: "FULL CLASS",
      ribbon: "TABLES • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Classification, Micro-organisms & Diseases | SSC CGL Biology",
      altTitles: ["All Animal Phyla with Examples in One Class", "Diseases Caused by Virus, Bacteria and Protozoa"],
      description: "Classification of living beings, animal phyla, micro-organisms and diseases give you sure marks in General Science. In this full class we learn the five kingdoms, plant groups, every animal phylum with examples, useful and harmful micro-organisms, food preservation, important body facts, common drugs, and disease tables.\n\n📌 IN THIS CLASS\n✅ Taxonomy and five kingdoms\n✅ Plant and animal groups\n✅ Micro-organisms and food preservation\n✅ Body facts and drugs\n✅ Diseases and their causes\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Classification\n00:00 Micro-organisms\n00:00 Diseases\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Biology #Diseases",
      tags: ["five kingdom classification", "animal kingdom phyla", "diseases and their causes", "biology for SSC CGL", "SSC CGL biology", "micro-organisms", "food preservation", "important body facts", "common drugs and uses", "viral bacterial diseases", "taxonomy and nomenclature", "general science tricks", "general awareness", "biology one shot", "biology MCQ", "railway biology questions", "competitive exam biology", "static science GK", "human diseases list", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "Biology for all exams"],
      hashtags: ["SSCCGL", "Biology", "Diseases", "GeneralScience"],
      thumbText: "CLASSIFICATION + MICRO-ORGANISMS + DISEASES",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🔬 New class is live: Classification, Micro-organisms and Diseases. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Classification\n00:00 Micro-organisms\n00:00 Diseases",
      playlist: "Competitive exams General Science — Biology"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how living beings are classified, on useful and harmful micro-organisms, and on important diseases</u>. These topics give you many sure marks in General Science, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>22</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>57</b><span>Questions</span></div>
        <div class="cp-stat"><b>~101 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Classification of Living Beings</b><br>How scientists name and group living beings, from kingdom down to species, and what the five kingdoms are.</li>
        <li><b>Plant Kingdom and Animal Kingdom</b><br>The four groups of plants and every animal phylum, with the examples that exams ask again and again.</li>
        <li><b>Micro-organisms</b><br>Which micro-organisms help us, which harm us, and how food is kept safe from them.</li>
        <li><b>Important Facts about the Human Body</b><br>The largest, smallest, longest and most repeated numbers of the human body, and the common drugs and their uses.</li>
        <li><b>Diseases</b><br>Diseases caused by viruses, bacteria, protozoa and worms, and which body part each common disease affects.</li>
        <li><b>Practice</b><br>Short questions after every topic, each with a plain explanation.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> disease causes, animal phyla with examples, and the largest and smallest facts of the body appear in almost every Staff Selection Commission Combined Graduate Level General Awareness paper, and they also help in Railways, Banking and Defence exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🏷️", accent: "#22c55e", pauseTimer: true,
    title: "Taxonomy and Binomial Nomenclature",
    html: `
      <p class="cp-lead">The earth has a huge variety of plants and animals. This variety is called <b>biodiversity</b>. <u>To study it, scientists group living beings by their features, and this science is called taxonomy.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/1.png" alt="tropical rainforest plants animals biodiversity photo" data-caption="A rainforest holds a huge variety of plants and animals, which is biodiversity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In the year 1753 the Swedish botanist Carolus Linnaeus gave every living being a two-part name in his book Species Plantarum. This system is called <b>binomial nomenclature</b>. The first part is the generic name and the second part is the specific name. For example, humans are Homo sapiens: Homo is the genus and sapiens is the species.</p>
      <p class="cp-lead">Linnaeus also introduced the ladder of groups, called the hierarchy. It goes from the biggest group to the smallest.</p>
      <div class="cp-formula" translate="no"><small>Order of groups</small>Kingdom → Phylum or Division → Class → Order → Family → Genus → Species</div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/2.png" alt="Staircase of seven steps going down from Kingdom to Species, each step labelled in order: " data-caption="The seven steps of classification, from the biggest group (kingdom) to the smallest (species)." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Group</th><th>Meaning</th></tr></thead><tbody><tr><td>Kingdom</td><td>The highest group</td></tr><tr><td>Phylum or Division</td><td>Phylum is used for animals and Division is used for plants</td></tr><tr><td>Class</td><td>Made of one or more related orders</td></tr><tr><td>Order</td><td>Made of related families</td></tr><tr><td>Family</td><td>Related genera with several common features</td></tr><tr><td>Genus</td><td>Closely related species that look alike in broad features</td></tr><tr><td>Species</td><td>The smallest real unit, which is reproductively isolated from other groups</td></tr></tbody></table>
      <div class="cp-mnemonic">King Philip Came Over For Good Soup: Kingdom, Phylum, Class, Order, Family, Genus, Species.</div>
      <div class="cp-note trap">Phylum is the word for animals and Division is the word for plants. Kingdom is the highest group and species is the lowest.</div>
    `
  },
  3: {
    questext: "Who gave the system of binomial nomenclature?",
    options: ["Aristotle", "Carolus Linnaeus", "Robert Whittaker", "Louis Pasteur"],
    correct: "2",
    exptext: "✅ Carolus Linnaeus gave every living being a two-part name. 📌 Binomial means two names, and Linnaeus gave them. ❌ Aristotle is tempting because he classified living beings first, but he did not give two-part names."
  },
  4: {
    questext: "What is the smallest unit of classification?",
    options: ["Genus", "Family", "Species", "Order"],
    correct: "3",
    exptext: "✅ Species is the smallest real unit of classification. 📌 The ladder ends with species. ❌ Genus is tempting, but a genus is a group of several related species."
  },
  5: {
    questext: "Consider the following statements about classification:\n1. The word phylum is used for plants.\n2. Kingdom is the highest group in classification.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Phylum is for animals and Division is for plants. ❌ Statement 1 is wrong because plants use the word Division."
  },
  6: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "Herbarium, Botanical Garden, Museum and Zoo",
    html: `
      <p class="cp-lead">Some places are made to study and to save living beings. <u>Each place keeps something different.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/3.png" alt="herbarium sheet pressed dried plant specimen photo" data-caption="A herbarium sheet holds a pressed and dried plant with its name label." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Place</th><th>What it keeps</th></tr></thead><tbody><tr><td>Herbarium</td><td>Pressed and dried plants kept on paper sheets</td></tr><tr><td>Botanical garden</td><td>Many groups of living plants grown for study, saving species, teaching and recreation</td></tr><tr><td>Museum</td><td>Non-living objects kept for saving and showing</td></tr><tr><td>Zoological park or zoo</td><td>Wild animals kept safe under human care for the public to see</td></tr></tbody></table>
      <p class="cp-lead">Three famous botanical gardens are the Kew Gardens in England, the Indian Botanical Garden at Howrah in India, and the National Botanical Research Institute at Lucknow in India.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/4.png" alt="Kew Gardens Palm House London photo" data-caption="The Palm House at Kew Gardens in England, one of the most famous botanical gardens." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A herbarium holds dead, dried plants, but a botanical garden holds living plants. A museum holds non-living objects, but a zoo holds living animals.</div>
    `
  },
  7: {
    questext: "A collection of pressed and dried plants kept on paper sheets is called a",
    options: ["Museum", "Herbarium", "Zoo", "Botanical garden"],
    correct: "2",
    exptext: "✅ A herbarium keeps pressed and dried plant specimens on sheets. 📌 Herbarium means dry plant record. ❌ A botanical garden is tempting, but it grows living plants."
  },
  8: {
    questext: "The Indian Botanical Garden is located at",
    options: ["Lucknow", "Pune", "Howrah", "Chennai"],
    correct: "3",
    exptext: "✅ The Indian Botanical Garden is at Howrah in West Bengal. 📌 Howrah for the Indian garden, Lucknow for the research institute. ❌ Lucknow is tempting because the National Botanical Research Institute is there."
  },
  9: {
    type: "concept", icon: "📜", accent: "#ef4444", pauseTimer: true,
    title: "History of Classification and the Five Kingdoms",
    html: `
      <p class="cp-lead">People classified living beings long ago. <u>Aristotle gave the first biological classification</u> by using simple body features to group plants and animals.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/5.png" alt="Timeline with three stops: Aristotle uses simple body features, Linnaeus makes two kingdom" data-caption="Classification grew from Aristotle's simple groups to Linnaeus's two kingdoms and then Whittaker's five kingdoms." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Linnaeus first put all living beings into two kingdoms, Plantae for plants and Animalia for animals. The most accepted system today is the five kingdom system of Robert Whittaker.</p>
      <table><thead><tr><th>Kingdom</th><th>Main idea</th></tr></thead><tbody><tr><td>Monera</td><td>Bacteria, with no true nucleus</td></tr><tr><td>Protista</td><td>Single-celled beings with a true nucleus</td></tr><tr><td>Fungi</td><td>Thread-like beings that feed on other matter</td></tr><tr><td>Plantae</td><td>Plants that have chloroplasts</td></tr><tr><td>Animalia</td><td>Many-celled animals</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/6.png" alt="Five rounded boxes in a row for Monera, Protista, Fungi, Plantae and Animalia, each with a" data-caption="The five kingdoms of Whittaker shown side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-mnemonic">Monera, Protista, Fungi, Plantae, Animalia: My Pet Fox Plays Alone.</div>
      <div class="cp-note exam">Aristotle is called the Father of Biology and of Zoology.</div>
    `
  },
  10: {
    questext: "The five kingdom system of classification was given by",
    options: ["Linnaeus", "Aristotle", "Whittaker", "Haeckel"],
    correct: "3",
    exptext: "✅ The most accepted five kingdom system was given by Robert Whittaker. 📌 Whittaker means five kingdoms. ❌ Linnaeus is tempting, but he gave only two kingdoms."
  },
  11: {
    questext: "Who gave the first biological classification using simple body features?",
    options: ["Aristotle", "Linnaeus", "Whittaker", "Darwin"],
    correct: "1",
    exptext: "✅ Aristotle first classified plants and animals by simple body features. 📌 Aristotle is the first, Whittaker is the latest. ❌ Linnaeus is tempting, but he came much later."
  },
  12: {
    questext: "Which of the following is NOT one of the five kingdoms of Whittaker?",
    options: ["Monera", "Fungi", "Protista", "Archaea"],
    correct: "4",
    exptext: "✅ Archaea is not one of the five kingdoms of Whittaker. 📌 The five are Monera, Protista, Fungi, Plantae and Animalia. ❌ Monera, Fungi and Protista are all part of the five."
  },
  13: {
    type: "concept", icon: "🦠", accent: "#8b5cf6", pauseTimer: true,
    title: "Kingdom Monera and Kingdom Protista",
    html: `
      <p class="cp-lead">Both kingdoms hold tiny, single-celled beings. <u>The difference is whether the cell has a true nucleus.</u> A cell without a true nucleus is called <b>prokaryotic</b>, and a cell with a true nucleus is called <b>eukaryotic</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/7.png" alt="bacteria colonies agar petri dish photo" data-caption="Bacteria grow as small round colonies on food jelly in a petri dish." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Monera</th><th>Protista</th></tr></thead><tbody><tr><td>Nucleus</td><td>No true nucleus (prokaryotic)</td><td>True nucleus (eukaryotic)</td></tr><tr><td>Body</td><td>Single cell</td><td>Single cell</td></tr><tr><td>Example</td><td>Bacteria</td><td>Amoeba and Paramecium</td></tr></tbody></table>
      <p class="cp-lead">Bacteria are found everywhere. They have a cell wall made of amino acids and polysaccharides. Some make their own food, either by photosynthesis or by chemical reactions. Others are heterotrophic, which means they take food from others, as parasites or as saprophytes that feed on dead matter.</p>
      <p class="cp-lead">Protists are single-celled and eukaryotic. Some have cilia (tiny hairs) or flagella (whip-like tails) to move. Their sexual reproduction happens by the fusion of cells and the formation of a zygote.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/8.png" alt="Two cells side by side: a small cell labelled Prokaryotic with loose DNA and no nucleus, a" data-caption="A prokaryotic cell has no true nucleus, but a eukaryotic cell has one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Bacteria and amoeba are both single-celled, but bacteria have no true nucleus and amoeba has one.</div>
    `
  },
  14: {
    questext: "Bacteria are placed in which kingdom?",
    options: ["Monera", "Protista", "Fungi", "Plantae"],
    correct: "1",
    exptext: "✅ Bacteria are prokaryotes and belong to Kingdom Monera. 📌 Monera means the simplest cells. ❌ Protista is tempting, but its members have a true nucleus."
  },
  15: {
    questext: "Which kingdom contains single-celled eukaryotes?",
    options: ["Monera", "Fungi", "Plantae", "Protista"],
    correct: "4",
    exptext: "✅ Protista holds single-celled beings with a true nucleus. 📌 Protists are the first eukaryotes. ❌ Monera is tempting, but it is single-celled and prokaryotic."
  },
  16: {
    type: "concept", icon: "🍄", accent: "#14b8a6", pauseTimer: true,
    title: "Kingdom Fungi",
    html: `
      <p class="cp-lead">Fungi are mostly thread-like beings. <u>Yeast is the one exception, because it is single-celled.</u> Fungi are eukaryotes and they take their food from other matter.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/9.png" alt="wild mushrooms growing forest floor photo" data-caption="Mushrooms are the fruiting bodies of fungi that grow on the forest floor." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Hyphae</td><td>The thin, long, thread-like parts of a fungus</td></tr><tr><td>Mycelium</td><td>The web that the hyphae make together</td></tr><tr><td>Coenocytic hyphae</td><td>Unbroken tubes packed with many nuclei</td></tr><tr><td>Septate hyphae</td><td>Hyphae that have cross-walls called septa</td></tr></tbody></table>
      <p class="cp-lead">The cell wall of a fungus is made of polysaccharides and <b>chitin</b>. Most fungi are saprophytes, which means they feed on dead matter. Some are parasites that live on other beings. Some are symbionts, which means they live together with another being and both gain.</p>
      <p class="cp-lead">A <b>lichen</b> is a fungus living together with an alga. <b>Mycorrhiza</b> is a fungus living together with the roots of higher plants.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/10.png" alt="lichen growing on tree bark photo" data-caption="A lichen is a fungus and an alga living together as one body." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/11.png" alt="Plant root with fine white fungal threads wrapped around it, labelled Mycorrhiza, with arr" data-caption="In mycorrhiza the fungus helps the root take in minerals and the plant gives sugar in return." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The cell wall of a fungus is made of chitin, but the cell wall of a plant is made of cellulose.</div>
    `
  },
  17: {
    questext: "The cell wall of fungi is made of",
    options: ["Cellulose", "Glycogen", "Chitin", "Lignin"],
    correct: "3",
    exptext: "✅ The cell wall of fungi contains chitin. 📌 Fungi have chitin, plants have cellulose. ❌ Cellulose is tempting, but it forms the plant cell wall."
  },
  18: {
    questext: "A lichen is a partnership between a fungus and",
    options: ["A moss", "An alga", "A bacterium", "A virus"],
    correct: "2",
    exptext: "✅ A lichen is a fungus living together with an alga. 📌 Lichen means fungus plus alga. ❌ A moss is tempting, but it is a separate plant and not part of a lichen."
  },
  19: {
    questext: "Which of the following is a single-celled fungus?",
    options: ["Yeast", "Mushroom", "Bread mould", "Lichen"],
    correct: "1",
    exptext: "✅ Yeast is a single-celled fungus. 📌 Yeast is the exception in the fungus world. ❌ Mushroom and bread mould are made of hyphae, so they are thread-like."
  },
  20: {
    type: "concept", icon: "🌳", accent: "#ec4899", pauseTimer: true,
    title: "Kingdom Plantae and Kingdom Animalia",
    html: `
      <p class="cp-lead">These two kingdoms hold the many-celled beings we see every day. <u>Plants make their own food, and animals depend on others for food.</u></p>
      <table><thead><tr><th>Feature</th><th>Kingdom Plantae</th><th>Kingdom Animalia</th></tr></thead><tbody><tr><td>Cells</td><td>Eukaryotic, with chloroplasts</td><td>Eukaryotic, many-celled</td></tr><tr><td>Cell wall</td><td>Present, made mainly of cellulose</td><td>Absent</td></tr><tr><td>Food</td><td>Mostly made by the plant itself</td><td>Taken directly or indirectly from plants</td></tr><tr><td>Special feature</td><td>Alternation of generations</td><td>Movement and development of an embryo</td></tr></tbody></table>
      <p class="cp-lead">Plants have two phases in their life: a diploid phase called the sporophyte and a haploid phase called the gametophyte. These two phases come one after the other. This is called <b>alternation of generations</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/12.png" alt="A circle of two boxes joined by arrows: Sporophyte (diploid) makes spores, Gametophyte (ha" data-caption="In alternation of generations the sporophyte and the gametophyte follow each other." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Animals are many-celled eukaryotes without a cell wall. Their way of feeding is <b>holozoic</b>, which means they take in food and digest it in an internal cavity. Many animals move, and they reproduce sexually by the meeting of a male and a female, followed by the growth of an embryo.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/13.png" alt="Side by side: a leaf with a sun labelled Plant makes its own food, and a deer eating grass" data-caption="Plants make food in their leaves, but animals have to eat food." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Plants have a cell wall of cellulose, but animals have no cell wall at all.</div>
    `
  },
  21: {
    questext: "The cell wall of plants is mainly made of",
    options: ["Chitin", "Cellulose", "Glycogen", "Protein"],
    correct: "2",
    exptext: "✅ The plant cell wall is made mainly of cellulose. 📌 Plants have cellulose. ❌ Chitin is tempting, but it is found in fungi."
  },
  22: {
    questext: "Holozoic nutrition is found in",
    options: ["Plants", "Fungi", "Bacteria", "Animals"],
    correct: "4",
    exptext: "✅ Animals take in food and digest it inside their body, which is holozoic nutrition. 📌 Holo means whole food is eaten. ❌ Fungi are tempting, but they absorb food from outside."
  },
  23: {
    questext: "Alternation of generations is seen in which kingdom?",
    options: ["Plantae", "Animalia", "Monera", "Fungi"],
    correct: "1",
    exptext: "✅ Plants have a diploid sporophyte phase and a haploid gametophyte phase that alternate. 📌 Two phases, one after the other. ❌ Animalia is tempting, but animals have only a diploid body."
  },
  24: {
    type: "concept", icon: "🧫", accent: "#3b82f6", pauseTimer: true,
    title: "Viruses",
    html: `
      <p class="cp-lead">The word <b>virus</b> comes from Latin and means poison or a slimy fluid. <u>A virus is not made of cells.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/14.png" alt="Simple labelled virus particle: a hexagonal protein coat with a core inside labelled RNA o" data-caption="A virus particle has a protein coat around a core of genetic material." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Meaning of the name</td><td>Poison or slimy fluid</td></tr><tr><td>Genetic material</td><td>Either ribonucleic acid (RNA) or deoxyribonucleic acid (DNA)</td></tr><tr><td>Way of life</td><td>Obligate parasite, which can live only inside a living host</td></tr><tr><td>Nature</td><td>Has features of both living and non-living things</td></tr></tbody></table>
      <p class="cp-lead">A virus is called an <b>obligate parasite</b> because it must enter a living host to grow. Inside a host it behaves like a living being and makes copies of itself. Outside a host it behaves like a non-living particle.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/15.png" alt="virus particles electron microscope image" data-caption="Virus particles seen under a powerful electron microscope are far smaller than bacteria." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A virus has either RNA or DNA, never both in the same particle.</div>
    `
  },
  25: {
    questext: "An obligate parasite such as a virus can grow",
    options: ["Only in soil", "Only inside a living host", "Only in water", "Anywhere"],
    correct: "2",
    exptext: "✅ An obligate parasite can live only inside a living host. 📌 Obligate means it must. ❌ Soil and water are tempting, but a virus cannot grow there on its own."
  },
  26: {
    questext: "Consider the following statements about viruses:\n1. A virus has either ribonucleic acid or deoxyribonucleic acid.\n2. A virus has both of them in the same particle.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 A virus carries one kind of genetic material. ❌ Statement 2 is wrong because no virus carries both kinds together."
  },
  27: {
    type: "concept", icon: "🌿", accent: "#f97316", pauseTimer: true,
    title: "Plant Kingdom: Bryophytes, Pteridophytes, Gymnosperms and Angiosperms",
    html: `
      <p class="cp-lead">The plant kingdom has four main groups. <u>They are arranged from the simplest to the most advanced.</u></p>
      <table><thead><tr><th>Group</th><th>Main features</th><th>Examples</th></tr></thead><tbody><tr><td>Bryophytes</td><td>Called the amphibians of the plant kingdom, because they live on soil but need water for sexual reproduction; they grow in damp, shady places</td><td>Sphagnum moss</td></tr><tr><td>Pteridophytes</td><td>The first land plants with vascular tissues, which are xylem and phloem; they have a true root, stem and leaves</td><td>Psilotum, Equisetum, Dryopteris, Marsilea</td></tr><tr><td>Gymnosperms</td><td>Plants with naked seeds, because the ovules and seeds are not enclosed in a fruit</td><td>Pinus, Cycas</td></tr><tr><td>Angiosperms</td><td>Flowering plants whose seeds are enclosed in fruits</td><td>Most crop plants and trees with flowers</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/16.png" alt="Four steps rising like a ladder: Bryophytes, Pteridophytes, Gymnosperms, Angiosperms, each" data-caption="The four groups of plants from the simplest bryophytes to the advanced angiosperms." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Sphagnum, a moss, gives peat. Peat has long been used as fuel. It also holds a lot of water, so it is used as packing material to carry living plants.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/17.png" alt="sphagnum moss peat bog green photo" data-caption="Sphagnum moss holds water, and its remains form peat that is used as fuel." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Some gymnosperms have roots that live together with other beings. The roots of Pinus have fungus partners (mycorrhiza). The roots of Cycas are called coralloid roots and they live with nitrogen-fixing cyanobacteria.</p>
      <div class="cp-note trap">Bryophytes do not have vascular tissue. Pteridophytes are the first plants that have it.</div>
    `
  },
  28: {
    questext: "Which group is called the amphibians of the plant kingdom?",
    options: ["Pteridophytes", "Gymnosperms", "Bryophytes", "Angiosperms"],
    correct: "3",
    exptext: "✅ Bryophytes live on land but need water for sexual reproduction. 📌 Like amphibians, they need water. ❌ Pteridophytes are tempting, but they have vascular tissue and are better adapted to land."
  },
  29: {
    questext: "Which group of plants is the first land plant with vascular tissues?",
    options: ["Algae", "Bryophytes", "Gymnosperms", "Pteridophytes"],
    correct: "4",
    exptext: "✅ Pteridophytes are the first land plants to have xylem and phloem. 📌 Ferns are pteridophytes with vessels. ❌ Bryophytes are tempting, but they have no vascular tissue."
  },
  30: {
    questext: "Peat, which is used as fuel, is obtained from which plant?",
    options: ["Sphagnum", "Cycas", "Pinus", "Marsilea"],
    correct: "1",
    exptext: "✅ Sphagnum moss gives peat. 📌 Sphagnum means peat moss. ❌ Cycas and Pinus are gymnosperms and do not give peat."
  },
  31: {
    type: "concept", icon: "🪼", accent: "#84cc16", pauseTimer: true,
    title: "Animal Kingdom: Porifera to Aschelminthes",
    html: `
      <p class="cp-lead">Animals are grouped into phyla by their body plan. <u>This page covers the first five phyla, which are all simple animals without a backbone.</u></p>
      <table><thead><tr><th>Phylum</th><th>Main features</th><th>Examples</th></tr></thead><tbody><tr><td>Porifera</td><td>Sponges; aquatic, mostly marine; live alone or in colonies; fixed in one place (sessile)</td><td>Sycon, Spongilla (freshwater sponge), Euspongia (bath sponge)</td></tr><tr><td>Coelenterata (Cnidaria)</td><td>Aquatic, mostly marine, but Hydra lives in fresh water; radially symmetrical</td><td>Physalia (Portuguese man of war), Adamsia (sea anemone), Pennatula (sea pen), Gorgonia (sea fan), Meandrina (brain coral)</td></tr><tr><td>Ctenophora</td><td>Two body layers, radial symmetry, tissue level of organisation</td><td>Hormiphora (sea walnut), Pleurobrachia (sea gooseberry)</td></tr><tr><td>Platyhelminthes</td><td>Flatworms; mostly endoparasites; bilaterally symmetrical; no body cavity (acoelomate)</td><td>Taenia (tapeworm), Fasciola (liver fluke)</td></tr><tr><td>Aschelminthes</td><td>Roundworms; free living or parasites of plants and animals</td><td>Ascaris (roundworm), Wuchereria (filarial worm), Ancylostoma (hookworm), Enterobius (pinworm)</td></tr></tbody></table>
      <p class="cp-lead">Some words are used again and again. <b>Radial symmetry</b> means the body can be cut into equal halves in many ways, like a wheel. <b>Bilateral symmetry</b> means the body can be cut into equal halves in only one way, like a human face. An <b>endoparasite</b> lives inside the body of another being.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/18.png" alt="marine sponge coral reef underwater photo" data-caption="A sponge is a simple animal fixed to one place on the sea floor." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/19.png" alt="Portuguese man of war Physalia floating photo" data-caption="The Portuguese man of war, called Physalia, is a coelenterate that floats on the sea." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/20.png" alt="Two circles: a round jellyfish-like body cut by many lines labelled Radial symmetry, and a" data-caption="Radial symmetry has many equal cuts, but bilateral symmetry has only one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Hydra is a coelenterate that lives in fresh water, although most coelenterates are marine.</div>
    `
  },
  32: {
    questext: "Tapeworm belongs to which phylum?",
    options: ["Aschelminthes", "Annelida", "Porifera", "Platyhelminthes"],
    correct: "4",
    exptext: "✅ Tapeworm is a flatworm, so it belongs to Platyhelminthes. 📌 Platy means flat. ❌ Aschelminthes is tempting, but those are round worms such as Ascaris."
  },
  33: {
    questext: "The filarial worm Wuchereria belongs to which phylum?",
    options: ["Platyhelminthes", "Aschelminthes", "Annelida", "Arthropoda"],
    correct: "2",
    exptext: "✅ Wuchereria is a roundworm, so it belongs to Aschelminthes. 📌 Roundworms are Ascaris, Wuchereria, Ancylostoma and Enterobius. ❌ Platyhelminthes is tempting, but those are flat worms."
  },
  34: {
    type: "concept", icon: "🐙", accent: "#06b6d4", pauseTimer: true,
    title: "Animal Kingdom: Annelida to Chordata",
    html: `
      <p class="cp-lead">These phyla have more complex bodies. <u>Annelids have ring-like segments, arthropods have jointed legs, and chordates have a notochord.</u></p>
      <table><thead><tr><th>Phylum</th><th>Main features</th><th>Examples</th></tr></thead><tbody><tr><td>Annelida</td><td>Body made of ring-like segments (metameric segmentation)</td><td>Nereis, Pheretima (earthworm), Hirudinaria (blood-sucking leech)</td></tr><tr><td>Arthropoda</td><td>Bilaterally symmetrical, three body layers, organ-system level</td><td>Apis (honey bee), Bombyx (silkworm), Laccifer (lac insect)</td></tr><tr><td>Mollusca</td><td>Aquatic (marine or fresh water) or land animals with a soft body</td><td>Pila (apple snail), Octopus (devil fish), Loligo (squid)</td></tr><tr><td>Echinodermata</td><td>All are marine and live on the sea bottom</td><td>Asterias (star fish), Cucumaria (sea cucumber), Antedon (feather star)</td></tr><tr><td>Hemichordata</td><td>Bilaterally symmetrical with three body layers</td><td>Balanoglossus (acorn worm)</td></tr><tr><td>Chordata</td><td>Has the four chordate characters</td><td>Herdmania (sea squirt), Branchiostoma</td></tr></tbody></table>
      <p class="cp-lead">Every chordate has four characters at some stage of life. They are a <b>notochord</b> (a stiff rod along the back), a hollow nerve cord on the back, paired slits in the throat for gills, and a tail that runs behind the anus.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/21.png" alt="earthworm on soil close up photo" data-caption="An earthworm has a body made of many ring-like segments." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/22.png" alt="octopus underwater swimming photo" data-caption="The octopus, also called devil fish, is a soft-bodied mollusc." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/23.png" alt="A simple animal side view marking four chordate characters: Notochord, Dorsal hollow nerve" data-caption="The four characters that every chordate has at some stage of its life." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">A sea cucumber is an echinoderm, not a plant. A devil fish is an octopus, not a fish.</div>
    `
  },
  35: {
    questext: "The earthworm belongs to which phylum?",
    options: ["Annelida", "Mollusca", "Arthropoda", "Echinodermata"],
    correct: "3",
    exptext: "✅ The earthworm has a body made of ring-like segments, so it is an annelid. 📌 Annelus means ring. ❌ Arthropoda is tempting, but arthropods have jointed legs."
  },
  36: {
    questext: "Which of the following is NOT a character of chordates?",
    options: ["Notochord", "Dorsal hollow nerve cord", "Post-anal tail", "Ventral solid nerve cord"],
    correct: "4",
    exptext: "✅ A chordate has a hollow nerve cord on its back, not a solid one on its belly. 📌 Chordates are hollow on the back. ❌ The other three are real chordate characters."
  },
  37: {
    type: "concept", icon: "🐟", accent: "#a855f7", pauseTimer: true,
    title: "Phylum Chordata: Agnatha and Pisces",
    html: `
      <p class="cp-lead">The backbone animals are called vertebrates, and they are divided into two sections. <u>Agnatha are the jawless fishes, and Gnathostomata are the animals with jaws.</u></p>
      <table><thead><tr><th>Group</th><th>Main features</th><th>Examples</th></tr></thead><tbody><tr><td>Class Cyclostomata (jawless)</td><td>Round, sucking mouth with no jaws; all are ectoparasites on some fishes</td><td>Petromyzon (lamprey), Myxine (hagfish)</td></tr><tr><td>Class Chondrichthyes</td><td>Skeleton made of cartilage; some have electric organs</td><td>Torpedo, Scoliodon (dog fish), Trygon (sting ray)</td></tr><tr><td>Class Osteichthyes</td><td>Skeleton made of bone</td><td>Marine: Exocoetus (flying fish), Hippocampus (sea horse), Lophius (angler fish); fresh water: Labeo (rohu), Catla</td></tr></tbody></table>
      <p class="cp-lead">Chondrichthyes and Osteichthyes are together called <b>Pisces</b>, which are animals with fins. An <b>ectoparasite</b> lives on the outside of another animal.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/24.png" alt="Tree diagram: Vertebrata splits into Agnatha (Cyclostomata) and Gnathostomata, and Gnathos" data-caption="A family tree of the vertebrates down to the fishes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/25.png" alt="sea lamprey jawless fish sucker mouth photo" data-caption="A lamprey has a round, sucking mouth and no jaws." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/26.png" alt="seahorse Hippocampus swimming photo" data-caption="The sea horse, called Hippocampus, is a bony fish." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Sharks and rays have a skeleton of cartilage, while rohu and catla have a skeleton of bone.</div>
    `
  },
  38: {
    questext: "Which of the following fishes has a skeleton made of cartilage?",
    options: ["Rohu", "Catla", "Torpedo", "Sea horse"],
    correct: "3",
    exptext: "✅ Torpedo is a cartilaginous fish of class Chondrichthyes. 📌 Chondro means cartilage. ❌ Rohu and catla are tempting, but they are bony fishes."
  },
  39: {
    questext: "Lamprey belongs to which class?",
    options: ["Cyclostomata", "Chondrichthyes", "Osteichthyes", "Amphibia"],
    correct: "1",
    exptext: "✅ The lamprey is a jawless fish and belongs to class Cyclostomata. 📌 Cyclo means round, and the mouth is round. ❌ Chondrichthyes is tempting, but those fishes have jaws."
  },
  40: {
    type: "concept", icon: "🐸", accent: "#e11d48", pauseTimer: true,
    title: "Tetrapoda: Amphibia, Reptilia, Aves and Mammalia",
    html: `
      <p class="cp-lead"><b>Tetrapoda</b> are animals with four limbs. <u>They are divided into four classes.</u></p>
      <table><thead><tr><th>Class</th><th>Main features</th><th>Examples</th></tr></thead><tbody><tr><td>Amphibia</td><td>Live in both water and land; lay eggs; development is indirect through a larval stage called a tadpole</td><td>Bufo (toad), Rana (frog), Hyla (tree frog), Salamandra (salamander), Ichthyophis (limbless amphibian)</td></tr><tr><td>Reptilia</td><td>Name means creeping or crawling; lay eggs; development is direct</td><td>Crocodilus (crocodile), Bangarus (krait)</td></tr><tr><td>Aves</td><td>Birds; two-legged with feathers; bones are bony and long bones are hollow with air cavities (pneumatic)</td><td>Corvus (crow), Pavo (peacock)</td></tr><tr><td>Mammalia</td><td>Warm-blooded with hair and mammary glands; mostly give birth to young (viviparous); development is direct</td><td>Tachyglossus (echidna, which lays eggs), Pteropus (flying fox), Camelus (camel), Macaca (monkey)</td></tr></tbody></table>
      <p class="cp-lead">In <b>direct development</b> the baby looks like a small adult. In <b>indirect development</b> a larva comes first and later changes into the adult, like a tadpole into a frog. <b>Oviparous</b> animals lay eggs, and <b>viviparous</b> animals give birth to young.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/27.png" alt="common frog on leaf close up photo" data-caption="A frog is an amphibian that begins life as a tadpole in water." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/28.png" alt="Indian peafowl peacock displaying feathers photo" data-caption="The peacock, called Pavo, is a bird with feathers and hollow bones." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/29.png" alt="echidna spiny anteater photo" data-caption="The echidna is a mammal that lays eggs instead of giving birth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Most mammals give birth to young, but the echidna lays eggs. The flying fox is a bat, and it is a mammal.</div>
    `
  },
  41: {
    questext: "Birds have long bones that are hollow with air cavities. This feature is called",
    options: ["Direct development", "Metamerism", "Notochord", "Pneumatic bones"],
    correct: "4",
    exptext: "✅ Hollow bones with air cavities are called pneumatic bones, and they make birds light. 📌 Pneumatic means filled with air. ❌ Metamerism is tempting, but it means ring-like segments in annelids."
  },
  42: {
    questext: "Consider the following statements:\n1. The long bones of birds are solid and have no air cavities.\n2. Reptiles show direct development.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Reptile babies look like small adults. ❌ Statement 1 is wrong because the long bones of birds are hollow with air cavities."
  },
  43: {
    questext: "Which of the following mammals lays eggs?",
    options: ["Camel", "Monkey", "Echidna", "Flying fox"],
    correct: "3",
    exptext: "✅ The echidna (Tachyglossus) is a mammal that lays eggs. 📌 Echidna is the egg-laying mammal. ❌ The other three mammals give birth to young."
  },
  44: {
    type: "concept", icon: "🍞", accent: "#10b981", pauseTimer: true,
    title: "Micro-organisms and Their Uses",
    html: `
      <p class="cp-lead">Micro-organisms are living beings too small to see with the eyes alone. They are classified into four major groups: <b>bacteria, fungi, protozoa and algae</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/30.png" alt="yeast cells microscope photo" data-caption="Yeast cells seen under a microscope, each budding to make a new cell." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Some micro-organisms are single-celled, like bacteria, some algae and protozoa. Others are many-celled, like some algae and fungi. Amoeba lives alone, while fungi and bacteria often live in groups called colonies.</p>
      <p class="cp-lead">Many micro-organisms are useful. The bacterium <b>Lactobacillus</b> turns milk into curd. Yeast grows fast and gives out carbon dioxide gas while it respires. The gas bubbles fill the dough and make it rise, so bread becomes soft. Yeast is also grown on the sugars in barley, wheat, rice and crushed fruit juice to make alcohol and wine.</p>
      <table><thead><tr><th>Micro-organism</th><th>Use</th></tr></thead><tbody><tr><td>Lactobacillus (bacterium)</td><td>Turns milk into curd</td></tr><tr><td>Yeast (fungus)</td><td>Makes bread dough rise</td></tr><tr><td>Yeast (fungus)</td><td>Makes alcohol and wine by fermentation</td></tr></tbody></table>
      <p class="cp-lead">The change of sugar into alcohol is called <b>fermentation</b>. Louis Pasteur discovered fermentation.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/31.png" alt="bowl of fresh curd yogurt photo" data-caption="Curd is made when the bacterium Lactobacillus turns milk sour." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/32.png" alt="Flow: Sugar goes into a yeast cell, and Alcohol and Carbon dioxide come out, with the labe" data-caption="In fermentation, yeast changes sugar into alcohol and carbon dioxide." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Fermentation is the change of sugar into alcohol and it is done by yeast. Curd is made by the bacterium Lactobacillus, not by yeast.</div>
    `
  },
  45: {
    questext: "Which bacterium helps to turn milk into curd?",
    options: ["Rhizobium", "Salmonella", "Vibrio", "Lactobacillus"],
    correct: "4",
    exptext: "✅ Lactobacillus turns milk into curd. 📌 Lacto means milk. ❌ Rhizobium is tempting, but it lives in the roots of pulses and fixes nitrogen."
  },
  46: {
    questext: "Bread dough rises because yeast gives out",
    options: ["Carbon dioxide", "Oxygen", "Alcohol only", "Nitrogen"],
    correct: "1",
    exptext: "✅ Yeast respires and gives out carbon dioxide, and the gas bubbles raise the dough. 📌 Gas bubbles make soft bread. ❌ Alcohol is also made, but it is the gas that fills the dough."
  },
  47: {
    type: "concept", icon: "💊", accent: "#eab308", pauseTimer: true,
    title: "Antibiotics, Vaccines and Harmful Micro-organisms",
    html: `
      <p class="cp-lead">A medicine that kills disease-causing micro-organisms or stops their growth is called an <b>antibiotic</b>. Some well-known antibiotics are streptomycin, tetracycline and erythromycin. They are made from fungi and bacteria.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/33.png" alt="Penicillium mould petri dish antibiotic photo" data-caption="A mould that makes penicillin stops the growth of bacteria around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Scientist</th><th>Discovery</th></tr></thead><tbody><tr><td>Alexander Fleming</td><td>Penicillin, the first antibiotic</td></tr><tr><td>Edward Jenner</td><td>The vaccine for smallpox</td></tr><tr><td>Louis Pasteur</td><td>Fermentation and pasteurisation</td></tr><tr><td>Robert Koch</td><td>The bacterium (bacillus) that causes anthrax</td></tr></tbody></table>
      <p class="cp-lead">Antibiotics do not work against the common cold and flu, because these diseases are caused by viruses and antibiotics act on bacteria.</p>
      <p class="cp-lead">Micro-organisms that cause disease are called <b>pathogens</b>. A disease that spreads from a sick person to a healthy person through air, water, food or touch is a <b>communicable disease</b>. Cholera, the common cold, chickenpox and tuberculosis are examples.</p>
      <p class="cp-lead">The female Anopheles mosquito carries the parasite of malaria. The female Aedes mosquito carries the dengue virus.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/34.png" alt="smallpox vaccination historical illustration Edward Jenner" data-caption="Edward Jenner made the first vaccine, which protects people from smallpox." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Antibiotics are useless against viral diseases such as cold and flu. Only the female mosquito carries malaria and dengue.</div>
    `
  },
  48: {
    questext: "Penicillin was discovered by",
    options: ["Edward Jenner", "Alexander Fleming", "Louis Pasteur", "Robert Koch"],
    correct: "2",
    exptext: "✅ Alexander Fleming discovered penicillin. 📌 F for Fleming, F for first antibiotic. ❌ Edward Jenner is tempting, but he made the smallpox vaccine."
  },
  49: {
    questext: "Who discovered the vaccine for smallpox?",
    options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Edward Jenner"],
    correct: "4",
    exptext: "✅ Edward Jenner discovered the smallpox vaccine. 📌 J for Jenner, J for jab. ❌ Louis Pasteur is tempting, but he is known for fermentation and pasteurisation."
  },
  50: {
    questext: "Consider the following statements:\n1. Penicillin was discovered by Alexander Fleming.\n2. Antibiotics are made from fungi and bacteria.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Antibiotics come from fungi and bacteria, and Fleming started with penicillin. ❌ Choosing only one statement misses that both are true."
  },
  51: {
    type: "concept", icon: "🥫", accent: "#0ea5e9", pauseTimer: true,
    title: "Food Preservation",
    html: `
      <p class="cp-lead">Micro-organisms spoil food. <u>Food is kept safe by stopping them from growing.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/35.png" alt="pickle jars glass assorted Indian pickles photo" data-caption="Pickles stay fresh for months because oil, vinegar and salt stop bacteria from growing." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Method</th><th>How it works</th></tr></thead><tbody><tr><td>Chemical method</td><td>Salt and edible oils are the common chemicals; sodium benzoate and sodium metabisulphite are common preservatives in jams and squashes</td></tr><tr><td>Sugar</td><td>Sugar reduces the moisture, so bacteria cannot grow</td></tr><tr><td>Oil and vinegar</td><td>Bacteria cannot live in them, so pickles do not spoil</td></tr><tr><td>Pasteurisation</td><td>Milk is heated to about 70 degrees Celsius for 15 to 30 seconds and then chilled suddenly</td></tr></tbody></table>
      <p class="cp-lead">Pasteurisation was discovered by Louis Pasteur. The heat kills most of the harmful bacteria in milk, and the sudden chill stops any new growth.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/36.png" alt="Two-step picture of a milk bottle: step 1 heat to about 70 degrees Celsius for 15 to 30 se" data-caption="Pasteurisation heats milk for a short time and then chills it quickly." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">In pasteurisation the milk is heated for only a few seconds. It is not boiled for a long time.</div>
    `
  },
  52: {
    questext: "Milk is pasteurised by heating it to about",
    options: ["40 degrees Celsius for 1 hour", "100 degrees Celsius for 30 minutes", "120 degrees Celsius for 5 minutes", "70 degrees Celsius for 15 to 30 seconds"],
    correct: "4",
    exptext: "✅ Milk is heated to about 70 degrees Celsius for 15 to 30 seconds and then chilled quickly. 📌 About seventy for a few seconds. ❌ Boiling for a long time is tempting, but that is not pasteurisation."
  },
  53: {
    questext: "Which of the following is a common preservative used in jams and squashes?",
    options: ["Sodium benzoate", "Sodium chloride only", "Baking soda", "Citric acid"],
    correct: "1",
    exptext: "✅ Sodium benzoate and sodium metabisulphite are common preservatives in jams and squashes. 📌 Benzoate preserves. ❌ Salt is tempting, but it is the common chemical used for pickles and fish."
  },
  54: {
    type: "concept", icon: "🩸", accent: "#d946ef", pauseTimer: true,
    title: "Important Facts: Blood and Heart Numbers",
    html: `
      <p class="cp-lead">These numbers are asked again and again. <u>Learn them as pairs of name and value.</u></p>
      <table><thead><tr><th>Fact</th><th>Value</th></tr></thead><tbody><tr><td>Volume of blood in a 70 kilogram body</td><td>About 6 litres</td></tr><tr><td>Red blood cell count</td><td>Male 5 to 6 million per cubic millimetre; female 4 to 5 million per cubic millimetre</td></tr><tr><td>Life span of red blood cells</td><td>100 to 120 days</td></tr><tr><td>Other name of red blood cells</td><td>Erythrocytes</td></tr><tr><td>Largest white blood cells</td><td>Monocytes</td></tr><tr><td>Smallest white blood cells</td><td>Lymphocytes</td></tr><tr><td>Platelet count</td><td>150,000 to 400,000 per microlitre</td></tr><tr><td>Haemoglobin</td><td>Male 14 to 15 grams and female 11 to 14 grams per 100 millilitres of blood</td></tr><tr><td>pH of blood</td><td>7.36 to 7.41</td></tr><tr><td>Blood clotting time</td><td>3 to 5 minutes</td></tr><tr><td>Time for one full circulation of blood</td><td>About 20 seconds</td></tr><tr><td>Normal blood pressure</td><td>120 over 80 millimetres of mercury</td></tr><tr><td>Normal heartbeat at rest</td><td>72 beats per minute</td></tr><tr><td>Normal body temperature</td><td>37 degrees Celsius</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/37.png" alt="A big blood drop in the centre with six small labelled facts around it: Red blood cell lif" data-caption="Six of the most repeated blood facts shown around a drop of blood." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/38.png" alt="sphygmomanometer blood pressure measuring doctor photo" data-caption="A sphygmomanometer measures blood pressure, which is normally 120 over 80." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Erythrocytes are the red blood cells, not the white ones. Monocytes are the largest white blood cells, and lymphocytes are the smallest.</div>
    `
  },
  55: {
    questext: "What is the normal blood pressure of a healthy adult?",
    options: ["80 over 40 millimetres of mercury", "140 over 100 millimetres of mercury", "120 over 80 millimetres of mercury", "160 over 120 millimetres of mercury"],
    correct: "3",
    exptext: "✅ The normal blood pressure is 120 over 80 millimetres of mercury. 📌 Think of 120 over 80 as the standard. ❌ 140 over 100 is tempting, but that is higher than normal."
  },
  56: {
    questext: "What is the normal platelet count in blood?",
    options: ["15,000 to 40,000 per microlitre", "150,000 to 400,000 per microlitre", "1,500,000 to 4,000,000 per microlitre", "500 to 1,000 per microlitre"],
    correct: "2",
    exptext: "✅ The normal platelet count is 150,000 to 400,000 per microlitre. 📌 One and a half lakh to four lakh. ❌ The other counts are ten times too small or too large."
  },
  57: {
    questext: "Which are the largest white blood cells?",
    options: ["Lymphocytes", "Neutrophils", "Erythrocytes", "Monocytes"],
    correct: "4",
    exptext: "✅ Monocytes are the largest white blood cells. 📌 Mono means one big nucleus. ❌ Lymphocytes are tempting, but they are the smallest, and erythrocytes are red blood cells."
  },
  58: {
    type: "concept", icon: "🏆", accent: "#64748b", pauseTimer: true,
    title: "Important Facts: Largest, Smallest and Longest",
    html: `
      <p class="cp-lead">Exams love questions on the biggest, smallest and longest parts of the body. <u>Learn this table once and revise it often.</u></p>
      <table><thead><tr><th>Fact</th><th>Answer</th></tr></thead><tbody><tr><td>Largest and strongest bone</td><td>Femur (thigh bone)</td></tr><tr><td>Smallest bone</td><td>Stapes, in the ear</td></tr><tr><td>Largest gland</td><td>Liver</td></tr><tr><td>Largest endocrine gland</td><td>Thyroid gland</td></tr><tr><td>Largest muscle</td><td>Gluteus maximus (buttock muscle)</td></tr><tr><td>Smallest muscle</td><td>Stapedius</td></tr><tr><td>Largest artery</td><td>Aorta</td></tr><tr><td>Largest vein</td><td>Inferior vena cava</td></tr><tr><td>Longest and largest nerve</td><td>Sciatic nerve</td></tr><tr><td>Longest cell</td><td>Neuron (nerve cell)</td></tr><tr><td>Thinnest skin</td><td>Eyelids</td></tr><tr><td>Number of spinal nerves</td><td>31 pairs</td></tr><tr><td>Weight of the brain</td><td>1300 to 1400 grams in an adult</td></tr><tr><td>Weight of the heart</td><td>200 to 300 grams</td></tr><tr><td>Breathing rate at rest</td><td>12 to 16 breaths per minute</td></tr><tr><td>Minimum distance for proper vision</td><td>25 centimetres</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/39.png" alt="Outline of a human body with arrows marking: Femur largest bone, Liver largest gland, Scia" data-caption="The largest and smallest parts of the human body marked on one picture." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/40.png" alt="human femur bone anatomical model photo" data-caption="The femur, or thigh bone, is the largest and strongest bone in the body." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The largest gland is the liver, but the largest endocrine gland is the thyroid gland. The smallest bone is the stapes, and the smallest muscle is the stapedius.</div>
    `
  },
  59: {
    questext: "Which is the smallest bone in the human body?",
    options: ["Femur", "Humerus", "Ulna", "Stapes"],
    correct: "4",
    exptext: "✅ The stapes in the middle ear is the smallest bone. 📌 Stapes is small and sits in the ear. ❌ Femur is tempting, but it is the largest bone."
  },
  60: {
    questext: "Which is the largest gland in the human body?",
    options: ["Liver", "Thyroid", "Pancreas", "Pituitary"],
    correct: "1",
    exptext: "✅ The liver is the largest gland of the body. 📌 The thyroid is only the largest endocrine gland. ❌ Thyroid is tempting, but only for endocrine glands."
  },
  61: {
    questext: "Which is the longest nerve of the human body?",
    options: ["Vagus nerve", "Sciatic nerve", "Optic nerve", "Radial nerve"],
    correct: "2",
    exptext: "✅ The sciatic nerve is the longest and largest nerve. 📌 Sciatic runs from the back down the leg. ❌ The vagus nerve is tempting, but it is shorter."
  },
  62: {
    type: "concept", icon: "💉", accent: "#fb7185", pauseTimer: true,
    title: "Common Drugs and Their Uses",
    html: `
      <p class="cp-lead">A drug is a substance used to treat or prevent a disease. <u>The name of a drug group often tells its use, because the first part of the name tells what it works against.</u></p>
      <table><thead><tr><th>Drug group</th><th>Use</th></tr></thead><tbody><tr><td>Anaesthetics</td><td>Cause loss of feeling, so no pain is felt</td></tr><tr><td>Antiflatulent</td><td>Reduces gas in the intestine</td></tr><tr><td>Antipyretics</td><td>Lower body temperature during fever</td></tr><tr><td>Analgesics</td><td>Prevent or relieve pain, for example aspirin</td></tr><tr><td>Antibiotics</td><td>Stop the growth of or kill micro-organisms, for example penicillin</td></tr><tr><td>Antihistamines</td><td>Relieve the symptoms of cold and allergies</td></tr><tr><td>Antispasmodic</td><td>Relieve spasm of involuntary muscles, usually in the stomach</td></tr><tr><td>Antacid</td><td>Prevent or correct acidity, especially in the stomach</td></tr><tr><td>Diuretics</td><td>Promote the making of urine</td></tr><tr><td>Laxative</td><td>Give relief from constipation</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/41.png" alt="assorted medicine tablets capsules pharmacy photo" data-caption="Tablets and capsules are the most common forms in which drugs are taken." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/42.png" alt="Match chart with arrows: Antipyretic to Fever, Analgesic to Pain, Antacid to Acidity, Diur" data-caption="Five common drug groups matched to the problem they treat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Antipyretics lower fever, but analgesics relieve pain. Aspirin is an analgesic.</div>
    `
  },
  63: {
    questext: "Which drug is used to lower body temperature?",
    options: ["Analgesic", "Antacid", "Antipyretic", "Laxative"],
    correct: "3",
    exptext: "✅ Antipyretics lower body temperature. 📌 Pyro means fire or fever. ❌ Analgesic is tempting, but it relieves pain."
  },
  64: {
    questext: "A drug that increases the making of urine is called a",
    options: ["Laxative", "Antacid", "Analgesic", "Diuretic"],
    correct: "4",
    exptext: "✅ A diuretic increases the making of urine. 📌 Diuretic means more urine. ❌ Laxative is tempting, but it relieves constipation."
  },
  65: {
    type: "concept", icon: "🧪", accent: "#2dd4bf", pauseTimer: true,
    title: "Diseases Caused by Viruses",
    html: `
      <p class="cp-lead">Viruses cause many common diseases. <u>Learn the name of the disease together with the name of its virus.</u></p>
      <table><thead><tr><th>Disease</th><th>Virus that causes it</th></tr></thead><tbody><tr><td>Chickenpox</td><td>Varicella-zoster virus</td></tr><tr><td>Smallpox</td><td>Variola virus</td></tr><tr><td>Common cold</td><td>Rhinovirus</td></tr><tr><td>Acquired Immunodeficiency Syndrome (AIDS)</td><td>Human Immunodeficiency Virus (HIV)</td></tr><tr><td>Measles</td><td>Measles virus</td></tr><tr><td>Mumps</td><td>Mumps virus</td></tr><tr><td>Rabies</td><td>Rabies virus, of the family Rhabdoviridae</td></tr><tr><td>Dengue fever</td><td>Dengue virus</td></tr><tr><td>Viral encephalitis</td><td>Inflammation of the brain caused by rabies, herpes simplex, polio, measles and JC viruses</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/43.png" alt="Aedes aegypti mosquito close up photo" data-caption="The Aedes mosquito carries the dengue virus from one person to another." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/44.png" alt="Matching chart with five rows: Chickenpox to Varicella-zoster virus, Common cold to Rhinov" data-caption="Five important viral diseases matched with the virus that causes each of them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Antibiotics do not cure viral diseases. Dengue is spread by the female Aedes mosquito.</div>
    `
  },
  66: {
    questext: "Chickenpox is caused by",
    options: ["Variola virus", "Varicella-zoster virus", "Rhinovirus", "Rabies virus"],
    correct: "2",
    exptext: "✅ Chickenpox is caused by the Varicella-zoster virus. 📌 Varicella is the other name for chickenpox. ❌ Variola virus is tempting, but it causes smallpox."
  },
  67: {
    questext: "Acquired Immunodeficiency Syndrome is caused by",
    options: ["Human Immunodeficiency Virus", "Dengue virus", "Mumps virus", "Measles virus"],
    correct: "1",
    exptext: "✅ Acquired Immunodeficiency Syndrome is caused by the Human Immunodeficiency Virus. 📌 The virus name is HIV, and the disease name is AIDS. ❌ The other viruses cause other diseases and attack other organs."
  },
  68: {
    questext: "The common cold is caused by",
    options: ["Rhinovirus", "Variola virus", "Mumps virus", "Dengue virus"],
    correct: "1",
    exptext: "✅ The common cold is caused by the rhinovirus. 📌 Rhino means nose. ❌ Variola virus is tempting, but it causes smallpox."
  },
  69: {
    type: "concept", icon: "🧬", accent: "#c026d3", pauseTimer: true,
    title: "Diseases Caused by Bacteria",
    html: `
      <p class="cp-lead">Bacteria cause many serious diseases, and antibiotics can cure most of them. <u>Learn each disease with its bacterium.</u></p>
      <table><thead><tr><th>Disease</th><th>Bacterium that causes it</th></tr></thead><tbody><tr><td>Whooping cough</td><td>Bordetella pertussis</td></tr><tr><td>Diphtheria</td><td>Corynebacterium diphtheriae</td></tr><tr><td>Cholera</td><td>Vibrio cholerae</td></tr><tr><td>Leprosy</td><td>Mycobacterium leprae</td></tr><tr><td>Pneumonia</td><td>Streptococcus pneumoniae</td></tr><tr><td>Tetanus</td><td>Clostridium tetani</td></tr><tr><td>Typhoid</td><td>Salmonella typhi</td></tr><tr><td>Tuberculosis</td><td>Mycobacterium tuberculosis</td></tr><tr><td>Plague</td><td>Yersinia pestis</td></tr><tr><td>Anthrax</td><td>Bacillus anthracis, found by Robert Koch</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/45.png" alt="tuberculosis bacteria Mycobacterium microscope photo" data-caption="Mycobacterium tuberculosis, the rod-shaped bacterium that causes tuberculosis." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/46.png" alt="Matching chart with five rows: Cholera to Vibrio cholerae, Typhoid to Salmonella typhi, Te" data-caption="Five important bacterial diseases matched with their bacteria." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Tuberculosis and leprosy are both caused by Mycobacterium, but the species are different.</div>
    `
  },
  70: {
    questext: "Cholera is caused by",
    options: ["Salmonella typhi", "Clostridium tetani", "Vibrio cholerae", "Yersinia pestis"],
    correct: "3",
    exptext: "✅ Cholera is caused by Vibrio cholerae. 📌 Cholera begins with V. ❌ Salmonella typhi is tempting, but it causes typhoid."
  },
  71: {
    questext: "Tetanus is caused by",
    options: ["Clostridium tetani", "Vibrio cholerae", "Salmonella typhi", "Yersinia pestis"],
    correct: "1",
    exptext: "✅ Tetanus is caused by Clostridium tetani. 📌 The word tetani is inside the word tetanus. ❌ Yersinia pestis is tempting, but it causes plague."
  },
  72: {
    questext: "Plague is caused by",
    options: ["Mycobacterium leprae", "Yersinia pestis", "Bordetella pertussis", "Corynebacterium diphtheriae"],
    correct: "2",
    exptext: "✅ Plague is caused by Yersinia pestis. 📌 Pestis means plague. ❌ Mycobacterium leprae is tempting, but it causes leprosy."
  },
  73: {
    type: "concept", icon: "🦟", accent: "#0d9488", pauseTimer: true,
    title: "Diseases Caused by Protozoa and Worms",
    html: `
      <p class="cp-lead">Protozoa are single-celled eukaryotes, and some of them cause serious diseases. Some worms are parasites that live inside the human body.</p>
      <table><thead><tr><th>Disease</th><th>Cause</th></tr></thead><tbody><tr><td>Malaria</td><td>A protozoan parasite called Plasmodium, spread by the female Anopheles mosquito; it multiplies inside the red blood cells</td></tr><tr><td>Amoebic dysentery</td><td>Entamoeba histolytica</td></tr><tr><td>Sleeping sickness</td><td>Trypanosoma brucei</td></tr><tr><td>Kala azar</td><td>Leishmania donovani</td></tr><tr><td>Tapeworm</td><td>An intestinal parasite that cannot live on its own and survives inside the intestine of an animal or a human</td></tr><tr><td>Filariasis</td><td>Thread-like filarial worms, most often Wuchereria bancrofti</td></tr><tr><td>Pinworm</td><td>A small, thin, white roundworm called Enterobius vermicularis</td></tr></tbody></table>
      <p class="cp-lead">The malaria parasite is neither a virus nor a bacterium. It is a single-celled parasite that lives and multiplies in the red blood cells of humans.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/47.png" alt="Anopheles mosquito feeding on skin close up photo" data-caption="The female Anopheles mosquito carries the malaria parasite." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/48.png" alt="Matching chart with five rows: Malaria to Plasmodium, Amoebic dysentery to Entamoeba histo" data-caption="Five important diseases matched with the protozoan or worm that causes each one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Malaria is not caused by a virus or a bacterium. It is caused by the protozoan Plasmodium.</div>
    `
  },
  74: {
    questext: "Malaria is caused by",
    options: ["A virus", "A bacterium", "A worm", "A protozoan parasite"],
    correct: "4",
    exptext: "✅ Malaria is caused by the protozoan parasite Plasmodium. 📌 Plasmodium is a protozoan, not a virus or a bacterium. ❌ A bacterium is tempting, but antibiotics for bacteria do not act on this parasite."
  },
  75: {
    questext: "Sleeping sickness is caused by",
    options: ["Trypanosoma brucei", "Leishmania donovani", "Entamoeba histolytica", "Plasmodium"],
    correct: "1",
    exptext: "✅ Sleeping sickness is caused by Trypanosoma brucei. 📌 Trypanosoma means sleeping sickness. ❌ Leishmania donovani is tempting, but it causes kala azar."
  },
  76: {
    questext: "Filariasis is caused by",
    options: ["Enterobius vermicularis", "Ascaris", "Wuchereria bancrofti", "Taenia"],
    correct: "3",
    exptext: "✅ Most cases of filariasis are caused by Wuchereria bancrofti. 📌 Wuchereria for filariasis. ❌ Enterobius vermicularis is tempting, but it is the pinworm."
  },
  77: {
    type: "concept", icon: "🫁", accent: "#b45309", pauseTimer: true,
    title: "Common Human Diseases and the Body Part They Affect",
    html: `
      <p class="cp-lead">Many disease names end in <b>-itis</b>, which means inflammation (swelling and redness). <u>The first part of the name often tells which body part is affected.</u></p>
      <table><thead><tr><th>Disease</th><th>Body part affected</th></tr></thead><tbody><tr><td>Acquired Immunodeficiency Syndrome</td><td>Immune system</td></tr><tr><td>Arthritis</td><td>Joints</td></tr><tr><td>Asthma</td><td>Airways of the lungs</td></tr><tr><td>Bronchitis</td><td>Lungs</td></tr><tr><td>Carditis</td><td>Heart</td></tr><tr><td>Cataract</td><td>Eye</td></tr><tr><td>Cystitis</td><td>Bladder</td></tr><tr><td>Colitis</td><td>Intestine</td></tr><tr><td>Conjunctivitis</td><td>Eye</td></tr><tr><td>Dermatitis</td><td>Skin</td></tr><tr><td>Diabetes</td><td>Pancreas</td></tr><tr><td>Diphtheria</td><td>Throat</td></tr><tr><td>Eczema</td><td>Skin</td></tr><tr><td>Goitre</td><td>Thyroid gland</td></tr><tr><td>Glossitis</td><td>Tongue</td></tr><tr><td>Glaucoma</td><td>Eye</td></tr><tr><td>Gastritis</td><td>Stomach</td></tr><tr><td>Hepatitis</td><td>Liver</td></tr><tr><td>Jaundice</td><td>Liver</td></tr><tr><td>Malaria</td><td>Red blood cells and spleen</td></tr><tr><td>Meningitis</td><td>Brain and spinal cord</td></tr><tr><td>Myelitis</td><td>Spinal cord</td></tr><tr><td>Neuritis</td><td>Nerves</td></tr><tr><td>Otitis</td><td>Ear</td></tr><tr><td>Osteomyelitis</td><td>Bones</td></tr><tr><td>Paralysis</td><td>Nerves and limbs</td></tr><tr><td>Pyorrhoea</td><td>Teeth and gums</td></tr><tr><td>Peritonitis</td><td>Abdomen</td></tr><tr><td>Pneumonia</td><td>Lungs</td></tr><tr><td>Rhinitis</td><td>Nose</td></tr><tr><td>Rheumatism</td><td>Joints</td></tr><tr><td>Tuberculosis</td><td>Lungs</td></tr><tr><td>Tonsillitis</td><td>Tonsils</td></tr><tr><td>Trachoma</td><td>Eye</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/49.png" alt="Human body outline with arrows to organs and one disease each: Cataract and Glaucoma to th" data-caption="Six common diseases marked on the organ that each one affects." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/50.png" alt="Word-breakdown cards: Gastr-itis means stomach inflammation, Hepat-itis means liver inflam" data-caption="The first part of the name shows the organ and the ending itis means inflammation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Cataract and glaucoma both affect the eye, but conjunctivitis and trachoma also affect the eye. Diabetes mainly involves the pancreas.</div>
    `
  },
  78: {
    questext: "Cataract affects which organ?",
    options: ["Ear", "Eye", "Lungs", "Skin"],
    correct: "2",
    exptext: "✅ Cataract affects the eye, where the lens becomes cloudy. 📌 Cataract, glaucoma and trachoma are all eye diseases. ❌ Ear is tempting, but ear problems are called otitis."
  },
  79: {
    questext: "Cystitis is an inflammation of the",
    options: ["Bladder", "Kidney", "Liver", "Stomach"],
    correct: "1",
    exptext: "✅ Cystitis is inflammation of the urinary bladder. 📌 Cyst means bladder. ❌ Kidney is tempting, but the kidney disease is nephritis."
  },
  80: {
    questext: "Pyorrhoea affects which part of the body?",
    options: ["Throat", "Tongue", "Teeth", "Nose"],
    correct: "3",
    exptext: "✅ Pyorrhoea affects the teeth and gums. 📌 Pyo means pus, so it is pus around the teeth. ❌ Tongue is tempting, but tongue inflammation is called glossitis."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a clean tree of life diagram, a glowing bacterium under a microscope and a stethoscope" },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tropical rainforest plants animals biodiversity photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/1.png. a thick forest full of different plants and animals",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/2.png": { t: "fig", about: "Staircase of seven steps going down from Kingdom to Species, each step labelled in order: Kingdom, Phylum or Division, Class, Order, Family, Genus, Species." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"herbarium sheet pressed dried plant specimen photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/3.png. a dried plant fixed on a paper sheet with a label",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kew Gardens Palm House London photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/4.png. the glass Palm House at Kew Gardens",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/5.png": { t: "fig", about: "Timeline with three stops: Aristotle uses simple body features, Linnaeus makes two kingdoms Plantae and Animalia, Whittaker makes five kingdoms." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/6.png": { t: "fig", about: "Five rounded boxes in a row for Monera, Protista, Fungi, Plantae and Animalia, each with a small simple icon." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"bacteria colonies agar petri dish photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/7.png. a petri dish with round bacteria colonies",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/8.png": { t: "fig", about: "Two cells side by side: a small cell labelled Prokaryotic with loose DNA and no nucleus, and a larger cell labelled Eukaryotic with a clear nucleus." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"wild mushrooms growing forest floor photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/9.png. mushrooms growing on a forest floor",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"lichen growing on tree bark photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/10.png. a grey-green lichen patch on tree bark",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/11.png": { t: "fig", about: "Plant root with fine white fungal threads wrapped around it, labelled Mycorrhiza, with arrows showing the root giving sugar and the fungus giving minerals." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/12.png": { t: "fig", about: "A circle of two boxes joined by arrows: Sporophyte (diploid) makes spores, Gametophyte (haploid) makes gametes, with the label Alternation of generations." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/13.png": { t: "fig", about: "Side by side: a leaf with a sun labelled Plant makes its own food, and a deer eating grass labelled Animal eats food." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/14.png": { t: "fig", about: "Simple labelled virus particle: a hexagonal protein coat with a core inside labelled RNA or DNA, and a few spikes on the outside." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"virus particles electron microscope image\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/15.png. virus particles seen under an electron microscope",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/16.png": { t: "fig", about: "Four steps rising like a ladder: Bryophytes, Pteridophytes, Gymnosperms, Angiosperms, each with a one-line feature written beside it." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sphagnum moss peat bog green photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/17.png. a thick green carpet of sphagnum moss",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"marine sponge coral reef underwater photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/18.png. a tube sponge growing on a reef",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Portuguese man of war Physalia floating photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/19.png. a blue Portuguese man of war floating at sea",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/20.png": { t: "fig", about: "Two circles: a round jellyfish-like body cut by many lines labelled Radial symmetry, and a worm-like body cut by one line labelled Bilateral symmetry." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"earthworm on soil close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/21.png. an earthworm showing its ring-like segments",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"octopus underwater swimming photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/22.png. an octopus swimming in the sea",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/23.png": { t: "fig", about: "A simple animal side view marking four chordate characters: Notochord, Dorsal hollow nerve cord, Pharyngeal gill slits, Post-anal tail." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/24.png": { t: "fig", about: "Tree diagram: Vertebrata splits into Agnatha (Cyclostomata) and Gnathostomata, and Gnathostomata splits into Pisces (Chondrichthyes and Osteichthyes) and Tetrapoda." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sea lamprey jawless fish sucker mouth photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/25.png. a lamprey with its round, jawless mouth",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"seahorse Hippocampus swimming photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/26.png. a sea horse holding on to a plant",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"common frog on leaf close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/27.png. a common frog sitting on a leaf",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian peafowl peacock displaying feathers photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/28.png. a peacock with open feathers",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"echidna spiny anteater photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/29.png. an echidna walking on the ground",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"yeast cells microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/30.png. yeast cells seen under a microscope",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"bowl of fresh curd yogurt photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/31.png. a bowl of set curd",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/32.png": { t: "fig", about: "Flow: Sugar goes into a yeast cell, and Alcohol and Carbon dioxide come out, with the label Fermentation and a small dough with bubbles." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Penicillium mould petri dish antibiotic photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/33.png. a petri dish where mould stops bacteria growing",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"smallpox vaccination historical illustration Edward Jenner\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/34.png. an old picture of Edward Jenner giving a vaccine",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"pickle jars glass assorted Indian pickles photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/35.png. jars of homemade pickles",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/36.png": { t: "fig", about: "Two-step picture of a milk bottle: step 1 heat to about 70 degrees Celsius for 15 to 30 seconds, step 2 chill suddenly, then store." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/37.png": { t: "fig", about: "A big blood drop in the centre with six small labelled facts around it: Red blood cell life 100 to 120 days, Platelets 150,000 to 400,000, Blood pH 7.36 to 7.41, Clotting 3 to 5 minutes, Circulation 20 seconds, Largest white cell Monocyte." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sphygmomanometer blood pressure measuring doctor photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/38.png. a doctor measuring blood pressure with a cuff",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/39.png": { t: "fig", about: "Outline of a human body with arrows marking: Femur largest bone, Liver largest gland, Sciatic nerve longest nerve, Aorta largest artery, Stapes smallest bone in the ear." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human femur bone anatomical model photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/40.png. a model of the human thigh bone",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"assorted medicine tablets capsules pharmacy photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/41.png. tablets and capsules of different colours",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/42.png": { t: "fig", about: "Match chart with arrows: Antipyretic to Fever, Analgesic to Pain, Antacid to Acidity, Diuretic to Urine, Laxative to Constipation." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Aedes aegypti mosquito close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/43.png. a female Aedes mosquito on skin",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/44.png": { t: "fig", about: "Matching chart with five rows: Chickenpox to Varicella-zoster virus, Common cold to Rhinovirus, Acquired Immunodeficiency Syndrome to Human Immunodeficiency Virus, Rabies to Rabies virus, Dengue to Dengue virus." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/45.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tuberculosis bacteria Mycobacterium microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/45.png. tuberculosis bacteria seen under a microscope",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/46.png": { t: "fig", about: "Matching chart with five rows: Cholera to Vibrio cholerae, Typhoid to Salmonella typhi, Tetanus to Clostridium tetani, Plague to Yersinia pestis, Leprosy to Mycobacterium leprae." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/47.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Anopheles mosquito feeding on skin close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/47.png. a female Anopheles mosquito biting skin",
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/48.png": { t: "fig", about: "Matching chart with five rows: Malaria to Plasmodium, Amoebic dysentery to Entamoeba histolytica, Sleeping sickness to Trypanosoma brucei, Kala azar to Leishmania donovani, Filariasis to Wuchereria bancrofti." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/49.png": { t: "fig", about: "Human body outline with arrows to organs and one disease each: Cataract and Glaucoma to the eye, Otitis to the ear, Hepatitis to the liver, Pneumonia to the lungs, Cystitis to the bladder." },
  "images/General_Awareness/Biology/Classification_Microorganisms_and_Diseases/50.png": { t: "fig", about: "Word-breakdown cards: Gastr-itis means stomach inflammation, Hepat-itis means liver inflammation, Rhin-itis means nose inflammation, Tonsill-itis means tonsil inflammation." }
});

/* CHANGE LOG
   - Linnaeus published Species Plantarum in 1753 (the source gave 1773).
   - The scientist who discovered fermentation and pasteurisation is written as Louis Pasteur (the source spelled Lewis).
   - The earthworm genus is spelled Nereis (the source spelled Neries).
   - Scientific names that ran together in the source are written correctly: Corynebacterium diphtheriae, Entamoeba histolytica, Trypanosoma brucei, Leishmania donovani, Wuchereria bancrofti, Enterobius vermicularis.
   - Phylum Coelenterata is also named Cnidaria.
   - Diabetes is placed under the pancreas only, and asthma under the airways of the lungs, because those are the organs that are affected.
   - Malaria is listed against the red blood cells and the spleen, because the parasite lives in red blood cells and the spleen swells.
   - Pteropus (the flying fox) is a fruit bat, and it is a mammal.
   - The life span of white blood cells is left out because it varies a lot between the types.
   - Deficiency diseases and the blood group table are not repeated here because they are covered in the other chapters.
*/
