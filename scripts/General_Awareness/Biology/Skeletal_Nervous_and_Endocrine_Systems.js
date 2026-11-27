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

/* Field: General_Awareness · Subject: Biology · Chapter: Skeletal_Nervous_and_Endocrine_Systems · 8 concept pages (+ overview) · 31 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🦴", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Skeleton, Nervous System and Hormones",
    thumb: {
      image: "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/thumbnail.png",
      banner: "SSC CGL GENERAL SCIENCE",
      line1: "HUMAN BODY",
      line2: "BONES + BRAIN",
      line3: "EYE + HORMONES",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Skeletal, Nervous and Endocrine System | SSC CGL Biology",
      altTitles: ["Human Eye, Brain and Hormones Important Facts", "Joints, Neuron and Endocrine Glands Full Class"],
      description: "The human body gives sure marks in General Science. In this class we learn bones and joints, the nervous system, the human eye, the brain and the endocrine glands in very simple language.\n\n📌 IN THIS CLASS\n✅ Skeleton, bones and joints\n✅ Neuron and synapse\n✅ Parts of the eye and brain\n✅ Hormones and glands\n✅ Practice questions\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Biology #HumanBody",
      tags: ["human eye ssc cgl", "human brain parts", "endocrine glands", "hormones and glands", "types of joints", "nervous system biology", "human body mcq", "ssc cgl biology", "general science", "pituitary gland", "thyroid and goitre", "general awareness", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "important questions", "concept class", "one shot", "static GK", "Skeletal Nervous and Endocrine", "letal Nervous and Endocrine Sy", "Biology tricks"],
      hashtags: ["SSCCGL", "Biology", "HumanBody"],
      thumbText: "BONES + BRAIN + HORMONES",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🧠 New class is live: Skeleton, Nervous System and Hormones. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Skeleton and joints\n00:00 Nervous system\n00:00 Human eye\n00:00 Human brain\n00:00 Endocrine system",
      playlist: "SSC CGL General Science — Biology Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the skeleton, joints, nerves, the eye, the brain and the hormone glands</u>. These topics are asked in almost every General Science paper, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>8</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>31</b><span>Questions</span></div>
        <div class="cp-stat"><b>~47 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Skeletal system and joints</b><br>How animals support their bodies, what bones are made of, and the five kinds of movable joints with an example each.</li>
        <li><b>Disorders of muscles and bones</b><br>The common diseases of muscles, bones and joints and what causes each one.</li>
        <li><b>The nervous system</b><br>How the brain and spinal cord work with the nerves, and what the neuron and the synapse are.</li>
        <li><b>The human eye</b><br>The parts of the eye, how an image forms, and how the iris controls the light.</li>
        <li><b>The human brain</b><br>The parts of the brain and the work of each: cerebrum, cerebellum, hypothalamus, thalamus and medulla.</li>
        <li><b>The endocrine system</b><br>What hormones are, which glands make them, and what happens when a hormone is too little or too much.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Questions on joints, the parts of the eye and brain, and hormones with their glands come in Staff Selection Commission papers almost every year.</div>
    `
  },
  2: {
    type: "concept", icon: "🦴", accent: "#22c55e", pauseTimer: true,
    title: "Skeletal Systems of Animals and Human Bones",
    html: `
      <p class="cp-lead">A skeleton gives a body its shape, protects soft organs and helps in movement. <u>Animals have three kinds of skeletons: a fluid filled body cavity, an outer skeleton and an inner skeleton.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/1.png" alt="Three boxes labelled FLUID CAVITY (earthworm), EXOSKELETON (crab or spider), ENDOSKELETON " data-caption="The three kinds of skeletons: fluid filled, outside the body and inside the body." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Spiders use an outer skeleton for protection and fluid pressure for movement. Sharks and rays have skeletons made fully of <b>cartilage</b>, while other backboned animals start with a cartilage skeleton that is slowly replaced by bone as they grow.</p>
      <table><thead><tr><th>Part</th><th>Fact</th></tr></thead><tbody><tr><td>Cartilage left in an adult</td><td>Joints, ribs, windpipe (trachea), nose and ears</td></tr><tr><td>Upper arm bone</td><td>Humerus</td></tr><tr><td>Thigh bone</td><td>Femur</td></tr><tr><td>Bones below the elbow</td><td>Radius and ulna</td></tr><tr><td>Bones below the knee</td><td>Tibia and fibula</td></tr><tr><td>Wrist bones</td><td>Carpals</td></tr><tr><td>Ankle bones</td><td>Tarsals</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/2.png" alt="human skeleton labelled bones anatomy chart photo" data-caption="A labelled human skeleton chart showing the major bones of the arm and leg." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Bone</b> has cells embedded in a hard matrix of calcium and collagen fibres. The spongy bones, such as the thigh bone, upper arm bone and breastbone, contain red marrow, where stem cells make blood cells. Yellow marrow at the centre of long bones stores fat. The outer layer of bone is the <b>periosteum</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/3.png" alt="Cross section of a long bone with labels: Periosteum (outer layer), Compact bone, Spongy b" data-caption="A long bone cut open to show the periosteum, spongy bone and both types of marrow." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Red marrow makes blood cells, but yellow marrow only stores fat. Also, the largest and strongest bone is the femur, and the smallest bone is the stapes in the ear.</div>
      <div class="cp-note exam">Learn the pairs: wrist is carpals, ankle is tarsals, below the elbow is radius and ulna, and below the knee is tibia and fibula.</div>
      <div class="cp-mnemonic">Carpals are at the Cuff (wrist). Tarsals are at the Toes side (ankle).</div>
    `
  },
  3: {
    questext: "The wrist is made up of which bones?",
    options: ["Tarsals", "Carpals", "Femur", "Humerus"],
    correct: "2",
    exptext: "✅ The carpals make up the wrist joint. 📌 Carpals are at the cuff. ❌ Tarsals are wrong because they make up the ankle."
  },
  4: {
    questext: "Which of the following is the largest and strongest bone in the human body?",
    options: ["Humerus", "Tibia", "Femur", "Stapes"],
    correct: "3",
    exptext: "✅ The femur, or thigh bone, is the largest and strongest bone. 📌 The longest bone is in the longest limb part. ❌ The stapes is the smallest bone, so it is the tempting wrong option."
  },
  5: {
    questext: "Sharks and rays have a skeleton made of",
    options: ["bone", "cartilage", "chitin", "calcium carbonate"],
    correct: "2",
    exptext: "✅ Sharks and rays have skeletons made entirely of cartilage. 📌 They are called cartilaginous fish. ❌ Bone is wrong because it is found in bony fish."
  },
  6: {
    questext: "Red marrow in spongy bones is the site of",
    options: ["storage of fat", "formation of blood cells", "making of bile", "making of hormones"],
    correct: "2",
    exptext: "✅ Stem cells in red marrow form the cells of blood and the immune system. 📌 Red marrow means red blood cells. ❌ Storage of fat is the job of yellow marrow."
  },
  7: {
    type: "concept", icon: "🔩", accent: "#f59e0b", pauseTimer: true,
    title: "Joints — Types of Movable Joints",
    html: `
      <p class="cp-lead">A <b>joint</b> is a place where two bones meet. <u>Joints are needed for all kinds of movement of the bony parts of the body.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/4.png" alt="Five small joint drawings in a row labelled PLANE, HINGE, PIVOT, SADDLE, BALL AND SOCKET w" data-caption="The five kinds of synovial joints and the type of movement each allows." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Synovial joints</b> are movable joints. They have a closed space, or cavity, between the bones. They are placed in five groups that you must remember with one example for each.</p>
      <table><thead><tr><th>Joint</th><th>Example</th><th>Movement</th></tr></thead><tbody><tr><td>Plane (gliding)</td><td>Between the carpals (wrist bones)</td><td>Only sliding</td></tr><tr><td>Hinge</td><td>Knee</td><td>Back and forth like a door</td></tr><tr><td>Pivot</td><td>Between the first two neck bones, atlas and axis</td><td>Rotation (turning the head)</td></tr><tr><td>Saddle</td><td>Between a carpal and the metacarpal at the base of the thumb</td><td>Movement in two directions</td></tr><tr><td>Ball and socket</td><td>Between the upper arm bone (humerus) and the shoulder girdle</td><td>Movement in all directions</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/5.png" alt="ball and socket joint shoulder hip anatomy photo" data-caption="A shoulder joint model showing the ball at the top of the arm bone in a round socket." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The ball and socket joint gives the widest range of movement. The hinge joint moves only in one line, like the hinge of a door.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/6.png" alt="Head turning left and right with a label PIVOT: ATLAS and AXIS, and a knee bending with a " data-caption="Turning the head uses a pivot joint, and bending the knee uses a hinge joint." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The pivot joint is between the atlas and the axis, but the hinge joint is the knee. Do not swap them.</div>
      <div class="cp-note exam">Questions ask for the example of each joint, so learn the table row by row.</div>
      <div class="cp-mnemonic">Plane = Palm, Hinge = Knee, Pivot = Neck, Saddle = Thumb, Ball = Shoulder.</div>
    `
  },
  8: {
    questext: "Which joint is present in the knee?",
    options: ["Ball and socket", "Pivot", "Hinge", "Saddle"],
    correct: "3",
    exptext: "✅ The knee has a hinge joint that moves back and forth. 📌 Knee is like a door hinge. ❌ Ball and socket is wrong because it is found at the shoulder and hip."
  },
  9: {
    questext: "The pivot joint is found between",
    options: ["the humerus and the shoulder", "the atlas and the axis", "the carpals", "the knee bones"],
    correct: "2",
    exptext: "✅ The pivot joint is between the atlas and axis bones of the neck, and it lets us turn the head. 📌 Pivot means to turn. ❌ The shoulder has a ball and socket joint."
  },
  10: {
    questext: "Which of the following joints allows movement in all directions?",
    options: ["Hinge joint", "Plane joint", "Ball and socket joint", "Pivot joint"],
    correct: "3",
    exptext: "✅ A ball and socket joint allows movement in all directions. 📌 A ball can turn any way in a socket. ❌ A hinge joint is wrong because it moves in one line only."
  },
  11: {
    questext: "Consider the following statements:\n1. A plane joint allows only sliding movement.\n2. The saddle joint is found at the base of the thumb.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Plane means flat sliding and the thumb base is the saddle. ❌ Neither is wrong because both match the standard facts."
  },
  12: {
    type: "concept", icon: "🩹", accent: "#ef4444", pauseTimer: true,
    title: "Disorders of the Muscular and Skeletal System",
    html: `
      <p class="cp-lead">Muscles, bones and joints can be harmed by disease. <u>Each disease has a clear cause that you can learn in one line.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/7.png" alt="Body outline with four labelled spots: Muscle (Myasthenia gravis, muscular dystrophy), Joi" data-caption="Where each common disorder of the muscles, joints and bones affects the body." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Disorder</th><th>What happens</th></tr></thead><tbody><tr><td>Myasthenia gravis</td><td>Autoimmune disorder that affects the signal passing from nerves to muscles</td></tr><tr><td>Muscular dystrophy</td><td>Slow loss of muscle strength, with faults in muscle proteins and death of muscle cells</td></tr><tr><td>Rheumatoid arthritis</td><td>Swelling of the synovial membrane of a joint</td></tr><tr><td>Osteoarthritis</td><td>Wearing away of the cartilage at the end of bones</td></tr><tr><td>Gout</td><td>Too much uric acid collecting in the joints</td></tr><tr><td>Osteoporosis</td><td>Low bone mass, weak bones that break easily</td></tr></tbody></table>
      <p class="cp-lead">An autoimmune disorder is one in which the body attacks its own healthy parts. Osteoporosis is common in older people, especially women, and a lack of calcium and vitamin D can make it worse.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/8.png" alt="osteoporosis normal bone vs osteoporotic bone photo" data-caption="A healthy bone beside an osteoporotic bone, which is thin and full of holes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Gout is caused by uric acid, but osteoarthritis is the wearing of cartilage. Both affect the joints, so read the cause in the question.</div>
      <div class="cp-note exam">Questions give the cause and ask for the disease, for example uric acid in the joints means gout.</div>
    `
  },
  13: {
    questext: "Gout is caused by the collection of which substance in the joints?",
    options: ["Calcium", "Uric acid", "Glucose", "Cholesterol"],
    correct: "2",
    exptext: "✅ Gout is caused by too much formation of uric acid and its deposit in the joints. 📌 Think of gout and uric acid. ❌ Calcium is wrong because lack of it affects bone strength."
  },
  14: {
    questext: "Low bone mass with weak bones that break easily is called",
    options: ["Osteoporosis", "Gout", "Myasthenia gravis", "Rheumatoid arthritis"],
    correct: "1",
    exptext: "✅ Osteoporosis means low bone mass and increased chance of a break. 📌 Porous bone means full of holes. ❌ Gout is wrong because it comes from uric acid."
  },
  15: {
    questext: "Rheumatoid arthritis is the swelling of the",
    options: ["heart", "bone marrow", "muscle cells", "synovial membrane"],
    correct: "4",
    exptext: "✅ Rheumatoid arthritis is the swelling of the synovial membrane of a joint. 📌 Arthr means joint. ❌ Muscle cells are wrong because muscle weakness is shown by muscular dystrophy."
  },
  16: {
    type: "concept", icon: "🔌", accent: "#8b5cf6", pauseTimer: true,
    title: "The Nervous System and the Neuron",
    html: `
      <p class="cp-lead">The nervous system controls and joins all parts of the body. <u>It has two parts: the central nervous system and the peripheral nervous system.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/9.png" alt="Body outline with the brain and spinal cord in red labelled CNS, and nerves spreading to t" data-caption="The central nervous system is the brain and spinal cord; nerves make the peripheral system." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Part</th><th>What it includes</th></tr></thead><tbody><tr><td>Central nervous system (CNS)</td><td>Brain and spinal cord</td></tr><tr><td>Peripheral nervous system (PNS)</td><td>Nerves (bundles of neurons) joining the central nervous system to the rest of the body</td></tr><tr><td>Neuron</td><td>The functional unit of the nervous system</td></tr><tr><td>Number of neurons in the human brain</td><td>About 100 billion</td></tr><tr><td>Spinal nerves</td><td>31 pairs</td></tr></tbody></table>
      <p class="cp-lead">Nervous tissue has two main types of cells: <b>neurons</b> and <b>glial cells</b>. Neurons carry nerve messages, and glial cells lie close to neurons and often surround and support them.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/10.png" alt="Labelled neuron: Dendrite, Cell body with nucleus, Axon, Axon end, with arrows showing the" data-caption="A neuron has dendrites that receive signals, a cell body, and an axon that sends them on." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Part of the neuron</th><th>Job</th></tr></thead><tbody><tr><td>Axon</td><td>Carries messages away from the cell body</td></tr><tr><td>Dendrite</td><td>Receives information from the axon of another cell and carries it towards the cell body</td></tr><tr><td>Cell body</td><td>Holds the nucleus and mitochondria, and looks after growth and maintenance</td></tr></tbody></table>
      <p class="cp-lead">The junction between a nerve cell and another cell is called a <b>synapse</b>, and the gap between the two cells is the synaptic cleft. A ganglion is a cluster of nerve cell bodies.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/11.png" alt="neuron synapse electron microscope photo" data-caption="A neuron with its branching dendrites, as seen under a microscope." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The junction between two neurons is called a synapse, not a ganglion. Also, dendrites receive signals while the axon sends them away.</div>
      <div class="cp-note exam">The neuron as the functional unit, the synapse as the junction and the 31 pairs of spinal nerves are repeated facts.</div>
    `
  },
  17: {
    questext: "The functional unit of the nervous system is the",
    options: ["nephron", "neuron", "neuroglia", "synapse"],
    correct: "2",
    exptext: "✅ The neuron is the functional unit of the nervous system. 📌 Neuron sounds like nerve. ❌ Nephron is wrong because it is the unit of the kidney."
  },
  18: {
    questext: "The junction between a nerve cell and another cell is called a",
    options: ["ganglion", "axon", "synapse", "dendrite"],
    correct: "3",
    exptext: "✅ The junction between two nerve cells is a synapse, and the gap is the synaptic cleft. 📌 Synapse means a link. ❌ A ganglion is a cluster of nerve cell bodies, so it is the tempting wrong option."
  },
  19: {
    questext: "Which part of a neuron carries messages away from the cell body?",
    options: ["Dendrite", "Nucleus", "Cell body", "Axon"],
    correct: "4",
    exptext: "✅ The axon conducts messages away from the cell body. 📌 Axon means away. ❌ A dendrite is wrong because it carries signals towards the cell body."
  },
  20: {
    questext: "Consider the following statements:\n1. The central nervous system includes the brain and spinal cord.\n2. The peripheral nervous system is made of nerves.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Central is the centre, and peripheral is the nerves outside. ❌ Neither is wrong because both are standard facts."
  },
  21: {
    type: "concept", icon: "👁️", accent: "#14b8a6", pauseTimer: true,
    title: "The Human Eye",
    html: `
      <p class="cp-lead">The human eye works like a camera. <u>Its lens forms an image on a light-sensitive screen called the retina.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/12.png" alt="Side view of the eye with labelled parts: Cornea, Pupil, Iris, Lens, Ciliary muscle, Retin" data-caption="A side view of the human eye with its main parts labelled." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The eyeball is nearly round and about 2.3 centimetres across. The eye lens forms a real and inverted image of the object on the retina, and the brain turns it the right way up.</p>
      <table><thead><tr><th>Part</th><th>What it does</th></tr></thead><tbody><tr><td>Cornea</td><td>Clear dome-shaped outermost layer; light enters here and it helps in focusing</td></tr><tr><td>Pupil</td><td>Hole in the centre of the iris; lets light reach the retina and controls how much enters</td></tr><tr><td>Iris</td><td>Dark muscular diaphragm that controls the size of the pupil</td></tr><tr><td>Ciliary muscle</td><td>Ring of smooth muscle that changes the shape of the lens to focus on near or far objects</td></tr><tr><td>Retina</td><td>Delicate membrane with many light-sensitive cells; signals go to the brain through the optic nerve</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/13.png" alt="human eye close up iris pupil photo" data-caption="A close up of a human eye showing the dark pupil in the middle of the coloured iris." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">In bright light the iris closes and makes the pupil smaller, so less light enters. In dim light the iris opens and makes the pupil larger, so more light enters. The pupil looks black because light entering it is absorbed inside the eye.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/14.png" alt="Two eyes side by side: bright light with a small pupil, dim light with a large pupil, each" data-caption="The pupil becomes small in bright light and large in dim light." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The ciliary muscle changes the shape of the lens, not the size of the pupil. The size of the pupil is changed by the iris.</div>
      <div class="cp-note exam">Remember that a human has a field of view of about 150 degrees with one eye and about 180 degrees with both eyes, and that the minimum distance for clear vision is about 25 centimetres.</div>
      <div class="cp-mnemonic">Iris = Window curtain, Pupil = Window, Retina = Screen.</div>
    `
  },
  22: {
    questext: "Which part of the eye controls the amount of light entering it?",
    options: ["Cornea", "Retina", "Iris", "Lens"],
    correct: "3",
    exptext: "✅ The iris controls the size of the pupil and so the amount of light entering the eye. 📌 Iris is the curtain of the eye. ❌ The retina is wrong because it is the screen that receives the image."
  },
  23: {
    questext: "The image formed on the retina is",
    options: ["real and inverted", "virtual and erect", "real and erect", "virtual and inverted"],
    correct: "1",
    exptext: "✅ The eye lens forms a real and inverted image on the retina. 📌 The brain turns the image upright. ❌ A virtual image is wrong because it cannot be formed on a screen."
  },
  24: {
    questext: "In dim light, the pupil of the eye",
    options: ["becomes smaller", "stays the same", "disappears", "becomes larger"],
    correct: "4",
    exptext: "✅ In dim light the iris expands the pupil to let in more light. 📌 Dim light, wide pupil. ❌ Becoming smaller happens in bright light."
  },
  25: {
    questext: "Which of the following changes the shape of the lens of the eye?",
    options: ["Ciliary muscle", "Iris", "Cornea", "Optic nerve"],
    correct: "1",
    exptext: "✅ The ciliary muscle changes the shape of the lens for viewing objects at different distances. 📌 Cilia means a ring around the lens. ❌ The iris is wrong because it changes the size of the pupil."
  },
  26: {
    type: "concept", icon: "🧠", accent: "#ec4899", pauseTimer: true,
    title: "The Human Brain",
    html: `
      <p class="cp-lead">The brain is the most complex organ of the body. It weighs about 1300 to 1400 grams in an adult. <u>It is the seat of intelligence, the controller of movement and the reader of the senses.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/15.png" alt="Side view of the brain with labelled regions: Cerebrum, Cerebellum, Medulla, Thalamus, Hyp" data-caption="A side view of the brain showing its five important parts." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The brain is divided into three basic units: the <b>forebrain</b>, the <b>midbrain</b> and the <b>hindbrain</b>. The forebrain is the largest and main thinking part. The midbrain connects the forebrain to the hindbrain. The hindbrain controls vital functions such as breathing and heart rate.</p>
      <table><thead><tr><th>Part</th><th>Main job</th></tr></thead><tbody><tr><td>Cerebrum</td><td>Largest part; thinking, memory, learning, voluntary actions and sensing touch and sound</td></tr><tr><td>Thalamus</td><td>Relay centre for information going to and from the spinal cord and the cerebrum</td></tr><tr><td>Hypothalamus</td><td>Controls sleep and wake cycle, hunger and thirst; links the nervous system to the pituitary gland</td></tr><tr><td>Cerebellum</td><td>Keeps the balance and posture and makes voluntary actions exact</td></tr><tr><td>Medulla</td><td>Controls involuntary actions such as heartbeat, breathing, blood pressure, vomiting and salivation</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/16.png" alt="human brain model cerebrum cerebellum photo" data-caption="A human brain model showing the large cerebrum and the smaller cerebellum below it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">When you ride a bicycle, the perfect coordination between pedalling and steering is achieved by the cerebellum. The medulla lies at the base of the brain and joins the spinal cord.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/17.png" alt="Simple bicycle rider with a label CEREBELLUM = balance and a heart with a label MEDULLA = " data-caption="The cerebellum keeps the balance when riding a bicycle, while the medulla controls the heartbeat." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The cerebrum is the largest part and does the thinking. The cerebellum is small and only keeps the balance, so do not swap them.</div>
      <div class="cp-note exam">Cerebrum is for thinking and memory, cerebellum is for balance, medulla is for involuntary actions and hypothalamus is for hunger, thirst and sleep.</div>
      <div class="cp-mnemonic">Cerebrum = Think, Cerebellum = Balance, Medulla = Automatic, Hypothalamus = Hunger.</div>
    `
  },
  27: {
    questext: "Which part of the human brain keeps the balance of the body?",
    options: ["Cerebrum", "Cerebellum", "Medulla", "Thalamus"],
    correct: "2",
    exptext: "✅ The cerebellum keeps the posture and balance of the body. 📌 Think of balancing on a bicycle. ❌ The cerebrum is wrong because it handles thinking and memory."
  },
  28: {
    questext: "Which part of the brain controls the heartbeat and breathing?",
    options: ["Cerebellum", "Cerebrum", "Medulla", "Hypothalamus"],
    correct: "3",
    exptext: "✅ The medulla controls involuntary actions such as heartbeat, breathing and blood pressure. 📌 Medulla means automatic control. ❌ The cerebellum is wrong because it handles balance."
  },
  29: {
    questext: "The largest part of the human brain is the",
    options: ["medulla", "cerebellum", "thalamus", "cerebrum"],
    correct: "4",
    exptext: "✅ The cerebrum is the largest part of the brain. 📌 The big thinking part. ❌ The cerebellum is wrong because it is the smaller part below the cerebrum."
  },
  30: {
    questext: "Hunger, thirst and the sleep and wake cycle are controlled by the",
    options: ["hypothalamus", "thalamus", "cerebrum", "medulla"],
    correct: "1",
    exptext: "✅ The hypothalamus controls hunger, thirst and the sleep and wake cycle. 📌 Hypo means below the thalamus. ❌ The thalamus is wrong because it only relays information."
  },
  31: {
    type: "concept", icon: "🧪", accent: "#3b82f6", pauseTimer: true,
    title: "The Endocrine System and the Pituitary Gland",
    html: `
      <p class="cp-lead"><b>Hormones</b> are chemical substances made by glands that control the work of cells and organs. <u>They control growth, body processes and the development of sex organs.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/18.png" alt="Body outline with dots and labels on each endocrine gland: Pituitary, Thyroid, Adrenal, Pa" data-caption="The main endocrine glands of the body and the hormones they send into the blood." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Gland type</th><th>Ducts</th><th>Examples</th></tr></thead><tbody><tr><td>Endocrine</td><td>No ducts, so hormones go straight into the blood</td><td>Pituitary, thyroid, adrenal</td></tr><tr><td>Exocrine</td><td>Have ducts that carry the product outside</td><td>Sweat glands, salivary glands, digestive glands</td></tr></tbody></table>
      <p class="cp-lead">Hormones are grouped into three classes by their structure: steroids, peptides and amines. Endocrine glands are also called <b>ductless glands</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/19.png" alt="Two panels: ENDOCRINE gland with arrow into a blood vessel labelled HORMONE, EXOCRINE glan" data-caption="Endocrine glands release hormones into blood; exocrine glands send their product out through a duct." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>pituitary gland</b> is about the size of a pea and weighs about 0.5 grams. It lies in a small bone cavity at the base of the brain and is joined to the hypothalamus by a stalk. It is called the <b>master gland</b> of the body because it controls many other glands.</p>
      <table><thead><tr><th>Hormone</th><th>Job</th></tr></thead><tbody><tr><td>Growth hormone</td><td>Too little causes dwarfism; too much causes gigantism</td></tr><tr><td>Prolactin</td><td>Prepares the breasts for milk production near the end of pregnancy</td></tr><tr><td>Antidiuretic hormone (ADH)</td><td>Controls water balance and blood pressure</td></tr><tr><td>Oxytocin</td><td>Causes the womb to contract during childbirth</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/20.png" alt="pituitary gland location brain diagram photo" data-caption="A diagram of the pea-sized pituitary gland at the base of the brain." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">The pituitary gland is the master gland, but the thyroid gland is the largest endocrine gland. Do not mix them up.</div>
      <div class="cp-note exam">Remember growth hormone, prolactin for milk, antidiuretic hormone for water balance and oxytocin for childbirth.</div>
      <div class="cp-mnemonic">GH Grows, Prolactin = Pours milk, ADH = Adjusts water, Oxytocin = Order for birth.</div>
    `
  },
  32: {
    questext: "Which gland is called the master gland of the human body?",
    options: ["Thyroid", "Adrenal", "Pituitary", "Pancreas"],
    correct: "3",
    exptext: "✅ The pituitary gland is the master gland because it controls many other glands. 📌 A small master of the body. ❌ The thyroid is wrong because it is the largest endocrine gland."
  },
  33: {
    questext: "Too much growth hormone in childhood can cause",
    options: ["dwarfism", "goitre", "diabetes", "gigantism"],
    correct: "4",
    exptext: "✅ Too much growth hormone causes gigantism, while too little causes dwarfism. 📌 Giant means much. ❌ Dwarfism is wrong because it is caused by too little."
  },
  34: {
    questext: "Which hormone causes the womb to contract during childbirth?",
    options: ["Oxytocin", "Prolactin", "Insulin", "Adrenaline"],
    correct: "1",
    exptext: "✅ Oxytocin stimulates the contractions of the womb during childbirth. 📌 Oxy means quick birth. ❌ Prolactin is wrong because it prepares the breasts for milk."
  },
  35: {
    questext: "Consider the following statements:\n1. Endocrine glands have no ducts.\n2. The pituitary gland is also called the master gland.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Endocrine means no duct and pituitary means master. ❌ Neither is wrong because both are standard facts."
  },
  36: {
    type: "concept", icon: "🦋", accent: "#f97316", pauseTimer: true,
    title: "Thyroid, Adrenal and Pancreas",
    html: `
      <p class="cp-lead">The <b>thyroid gland</b> is one of the largest endocrine glands in the body. <u>It lies in the neck, below the Adam's apple.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/21.png" alt="thyroid gland location neck anatomy photo" data-caption="A diagram of the butterfly-shaped thyroid gland in the front of the neck." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The thyroid makes two hormones, <b>triiodothyronine</b> and <b>thyroxine</b>, and both contain iodine. They control the rate at which the body uses energy and how it makes protein.</p>
      <table><thead><tr><th>Condition</th><th>Cause</th><th>Result</th></tr></thead><tbody><tr><td>Hypothyroidism</td><td>Low thyroid activity</td><td>In childhood, a disease called cretinism</td></tr><tr><td>Goitre</td><td>Lack of iodine, swelling of the thyroid</td><td>Swelling in the neck</td></tr><tr><td>Diabetes mellitus</td><td>Low quantity of insulin</td><td>High blood sugar</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/22.png" alt="Neck diagram: normal thyroid on the left and swollen goitre on the right, with a bowl of i" data-caption="Lack of iodine swells the thyroid in the neck, which is called goitre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The <b>adrenal glands</b> are found above the kidneys and make adrenaline, which prepares the body for danger. The <b>pancreas</b> lies behind the stomach and makes insulin and glucagon, and the pancreas is also a digestive organ because it makes pancreatic juice.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/23.png" alt="Kidney with a small gland on top labelled ADRENAL: adrenaline, and a gland behind the stom" data-caption="The adrenal gland sits on top of the kidney, and the pancreas lies behind the stomach." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Insulin lowers the blood sugar, while glucagon raises it. Lack of insulin causes diabetes mellitus.</div>
      <div class="cp-note exam">Remember adrenal glands above the kidneys for adrenaline, thyroid for iodine and goitre, and pancreas for insulin.</div>
      <div class="cp-mnemonic">Adrenal = Alarm, Thyroid = Throat, Pancreas = Sugar.</div>
    `
  },
  37: {
    questext: "Which element is needed to make thyroid hormones?",
    options: ["Iron", "Calcium", "Iodine", "Sodium"],
    correct: "3",
    exptext: "✅ Both thyroid hormones contain iodine. 📌 Lack of iodine causes goitre. ❌ Iron is wrong because it is needed to make haemoglobin."
  },
  38: {
    questext: "Lack of insulin causes",
    options: ["goitre", "diabetes mellitus", "cretinism", "gigantism"],
    correct: "2",
    exptext: "✅ A low quantity of insulin causes diabetes mellitus. 📌 Insulin controls blood sugar. ❌ Goitre is wrong because it is caused by lack of iodine."
  },
  39: {
    questext: "The adrenal glands are located",
    options: ["above the kidneys", "in the neck", "behind the stomach", "at the base of the brain"],
    correct: "1",
    exptext: "✅ The adrenal glands are found above the kidneys. 📌 Adrenal means near the kidney. ❌ In the neck lies the thyroid gland, so it is the tempting wrong option."
  },
  40: {
    questext: "Which of the following is the largest endocrine gland in the human body?",
    options: ["Pituitary", "Adrenal", "Pancreas", "Thyroid"],
    correct: "4",
    exptext: "✅ The thyroid gland is the largest endocrine gland. 📌 Thyroid is the big gland in the neck. ❌ The pituitary is wrong because it is the master gland and very small."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined human skull outline, a softly blurred anatomical eye model and a subtle neuron network" },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/1.png": { t: "fig", about: "Three boxes labelled FLUID CAVITY (earthworm), EXOSKELETON (crab or spider), ENDOSKELETON (human), each with a small drawing." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human skeleton labelled bones anatomy chart photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/2.png. A labelled human skeleton chart showing humerus, femur, radius, ulna, tibia and fibula",
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/3.png": { t: "fig", about: "Cross section of a long bone with labels: Periosteum (outer layer), Compact bone, Spongy bone with Red marrow, Yellow marrow in the centre." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/4.png": { t: "fig", about: "Five small joint drawings in a row labelled PLANE, HINGE, PIVOT, SADDLE, BALL AND SOCKET with an arrow showing the movement of each." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ball and socket joint shoulder hip anatomy photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/5.png. A clear model of a shoulder joint",
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/6.png": { t: "fig", about: "Head turning left and right with a label PIVOT: ATLAS and AXIS, and a knee bending with a label HINGE: KNEE." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/7.png": { t: "fig", about: "Body outline with four labelled spots: Muscle (Myasthenia gravis, muscular dystrophy), Joint lining (Rheumatoid arthritis), Cartilage (Osteoarthritis), Bone (Osteoporosis)." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"osteoporosis normal bone vs osteoporotic bone photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/8.png. A comparison of a healthy bone and a thin porous bone",
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/9.png": { t: "fig", about: "Body outline with the brain and spinal cord in red labelled CNS, and nerves spreading to the arms and legs in blue labelled PNS." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/10.png": { t: "fig", about: "Labelled neuron: Dendrite, Cell body with nucleus, Axon, Axon end, with arrows showing the direction of the signal." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"neuron synapse electron microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/11.png. A microscope image of a neuron with its branches",
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/12.png": { t: "fig", about: "Side view of the eye with labelled parts: Cornea, Pupil, Iris, Lens, Ciliary muscle, Retina, Optic nerve." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human eye close up iris pupil photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/13.png. A clear close up of a human eye showing the pupil and iris",
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/14.png": { t: "fig", about: "Two eyes side by side: bright light with a small pupil, dim light with a large pupil, each labelled." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/15.png": { t: "fig", about: "Side view of the brain with labelled regions: Cerebrum, Cerebellum, Medulla, Thalamus, Hypothalamus." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human brain model cerebrum cerebellum photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/16.png. A clear photo of a human brain model with its parts",
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/17.png": { t: "fig", about: "Simple bicycle rider with a label CEREBELLUM = balance and a heart with a label MEDULLA = heartbeat and breathing." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/18.png": { t: "fig", about: "Body outline with dots and labels on each endocrine gland: Pituitary, Thyroid, Adrenal, Pancreas, with arrows into the blood." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/19.png": { t: "fig", about: "Two panels: ENDOCRINE gland with arrow into a blood vessel labelled HORMONE, EXOCRINE gland with a small tube labelled DUCT." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"pituitary gland location brain diagram photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/20.png. A medical diagram of the pituitary gland below the brain",
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"thyroid gland location neck anatomy photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/21.png. A medical diagram of the thyroid gland in the neck",
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/22.png": { t: "fig", about: "Neck diagram: normal thyroid on the left and swollen goitre on the right, with a bowl of iodised salt and the label IODINE PREVENTS GOITRE." },
  "images/General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems/23.png": { t: "fig", about: "Kidney with a small gland on top labelled ADRENAL: adrenaline, and a gland behind the stomach labelled PANCREAS: insulin and glucagon." }
});

/* CHANGE LOG
   - The junction between two neurons is written as a synapse (the earlier line called it a ganglion; a ganglion is a cluster of nerve cell bodies).
   - The thyroid hormones are written as triiodothyronine and thyroxine (the earlier line called them tyrosine).
   - The pituitary gland is written as the master gland of the body and the hormone growth statements are kept to growth hormone, prolactin, antidiuretic hormone and oxytocin.
   - Mixed joint examples are written with the standard examples: gliding in the wrist bones, hinge in the knee, pivot between the first two neck bones, saddle at the thumb base, and ball and socket at the shoulder.
*/
