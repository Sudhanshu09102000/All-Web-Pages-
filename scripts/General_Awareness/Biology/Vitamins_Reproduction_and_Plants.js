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

/* Field: General_Awareness · Subject: Biology · Chapter: Vitamins_Reproduction_and_Plants · 14 concept pages (+ overview) · 40 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🧬", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Vitamins, Reproduction and Plants",
    thumb: {
      image: "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "BIOLOGY MADE EASY",
      line2: "VITAMINS + REPRODUCTION",
      line3: "PHOTOSYNTHESIS",
      badge: "FULL CLASS",
      ribbon: "NOTES • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Vitamins, Reproduction & Photosynthesis | SSC CGL Biology",
      altTitles: ["All Vitamins and Deficiency Diseases in One Class", "Double Fertilisation and Pollination Made Easy"],
      description: "Vitamins, human reproduction, plant reproduction and photosynthesis give you sure marks in General Science. In this full class we learn every vitamin with its source and deficiency disease, the minerals, asexual and sexual reproduction, sexually transmitted diseases, pollination, double fertilisation and photosynthesis.\n\n📌 IN THIS CLASS\n✅ Vitamins A, B group, C, D, E and K\n✅ Minerals and deficiency diseases\n✅ Human and plant reproduction\n✅ Photosynthesis and chlorophyll\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Vitamins\n00:00 Reproduction\n00:00 Plant reproduction\n00:00 Photosynthesis\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Biology #Vitamins",
      tags: ["vitamins tricks", "biology for SSC CGL", "SSC CGL biology", "human reproduction", "plant reproduction", "double fertilisation", "pollination types", "photosynthesis", "chlorophyll", "night blindness scurvy rickets", "fat soluble vitamins", "minerals and deficiency", "sexually transmitted diseases", "general science tricks", "general awareness", "biology one shot", "biology MCQ", "railway biology questions", "competitive exam biology", "static science GK", "angiosperm fertilisation", "SSC CGL", "UPSC", "Banking", "Vitamins Reproduction and Pla"],
      hashtags: ["SSCCGL", "Biology", "Vitamins", "GeneralScience"],
      thumbText: "VITAMINS + REPRODUCTION + PHOTOSYNTHESIS",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "🧬 New class is live: Vitamins, Reproduction and Plants. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Vitamins\n00:00 Reproduction\n00:00 Plant reproduction\n00:00 Photosynthesis",
      playlist: "Competitive exams General Science — Biology"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on Vitamins and Minerals, Human and Plant Reproduction, and Photosynthesis</u>. These topics give you many easy marks in General Science, so we will learn each idea slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>14</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>40</b><span>Questions</span></div>
        <div class="cp-stat"><b>~68 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Vitamins and Minerals</b><br>What each vitamin does, where we get it from, and which disease appears when it is missing. We also learn the minerals iron, iodine, calcium and sodium.</li>
        <li><b>Reproduction in Living Beings</b><br>How living beings make new life, the difference between asexual and sexual reproduction, and how the human body does it. We also learn the sexually transmitted diseases and the three stages that birth control blocks.</li>
        <li><b>Reproduction in Flowering Plants</b><br>The male and female parts of a flower, the types of pollination, double fertilisation, and how a flower becomes a fruit.</li>
        <li><b>Photosynthesis</b><br>How a green leaf makes food from water, carbon dioxide and sunlight, and why leaves look green.</li>
        <li><b>Practice</b><br>Short questions after every topic, each with a plain explanation, so that you can check your learning at once.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> vitamins with their deficiency diseases, pollination types and double fertilisation are asked again and again in the Staff Selection Commission Combined Graduate Level paper, and the same facts also help in Railways, Banking and Defence exams.</div>
    `
  },
  2: {
    type: "concept", icon: "🍊", accent: "#22c55e", pauseTimer: true,
    title: "Vitamins — The Basics",
    html: `
      <p class="cp-lead">Vitamins are <b>organic substances</b> that the body needs in very small amounts to run its chemical reactions. <u>The body usually cannot make them, so we must get them from food.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/1.png" alt="fresh fruits vegetables nuts milk healthy food" data-caption="A colourful spread of fruits, vegetables, nuts and milk products that supply vitamins." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Many vitamins work as helpers of enzymes. Enzymes are substances that speed up reactions in the body, and these helpers are called cofactors or coenzymes.</div>
      <p class="cp-lead">Vitamins are divided into two kinds by what they dissolve in. <b>Fat soluble</b> vitamins dissolve in fat and are stored in the body. <b>Water soluble</b> vitamins dissolve in water, so the body keeps very little of them and we need them every day.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/2.png" alt="Tree diagram: a box labelled VITAMINS splits into two ovals, Fat soluble with K, E, D, A b" data-caption="Vitamins are of two kinds: fat soluble (K, E, D, A) and water soluble (B and C)." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">Because fat soluble vitamins are stored in the body, taking far too much of them can cause harm.</p>
      <table><thead><tr><th>Kind</th><th>Vitamins</th><th>Does the body store it?</th></tr></thead><tbody><tr><td>Fat soluble</td><td>K, E, D, A</td><td>Yes, in body fat</td></tr><tr><td>Water soluble</td><td>B group and C</td><td>Very little, so needed daily</td></tr></tbody></table>
      <div class="cp-mnemonic">Fat soluble vitamins are K, E, D and A. Water soluble vitamins are B and C.</div>
      <div class="cp-note trap">Vitamin B is not one vitamin. It is a whole group of water soluble vitamins: B1, B2, B3, B5, B6 and B12.</div>
    `
  },
  3: {
    questext: "Which of the following groups contains only fat soluble vitamins?",
    options: ["A, B, C, D", "B, C, E, K", "A, D, E, K", "B, C, D, K"],
    correct: "3",
    exptext: "✅ Vitamins A, D, E and K are fat soluble. 📌 Remember them as K, E, D, A. ❌ Vitamins B and C dissolve in water, so any group that contains B or C is wrong."
  },
  4: {
    questext: "Consider the following statements about vitamins:\n1. The body needs vitamins in very small amounts.\n2. Vitamin B is a single vitamin that is fat soluble.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Vitamin B is a group of several vitamins, and all of them dissolve in water. ❌ Statement 2 is wrong because B is not one vitamin and it is not fat soluble."
  },
  5: {
    type: "concept", icon: "👁️", accent: "#f59e0b", pauseTimer: true,
    title: "Vitamin A (Retinol)",
    html: `
      <p class="cp-lead">Vitamin A is also called <b>retinol</b>. It keeps the eyes healthy and helps the body grow. <u>It is a fat soluble vitamin.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/3.png" alt="carrots milk cod liver oil green leafy vegetables" data-caption="Carrots, milk, cod liver oil and green leafy vegetables are good sources of vitamin A." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Chemical name</td><td>Retinol</td></tr><tr><td>Sources</td><td>Milk, eggs, fish, butter, cheese, liver, cod liver oil, dark green and yellow vegetables and fruits</td></tr><tr><td>Main work</td><td>Keeps eyes healthy, protects skin and the lining of the breathing and digestive tracts, builds healthy bones and teeth</td></tr><tr><td>Deficiency</td><td>Night blindness, dry eyes, dry skin</td></tr></tbody></table>
      <p class="cp-lead">The eye needs vitamin A to see in dim light. If the body lacks it, a person cannot see well at night. This problem is called <b>night blindness</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/4.png" alt="Two eyes side by side: the left eye labelled Enough vitamin A sees a clear road at night, " data-caption="Without enough vitamin A, the eye cannot see well in dim light, which is night blindness." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Too much vitamin A is also harmful. Because it is stored in the body, an excess can cause hair loss, headache, bone pain and liver injury.</div>
      <div class="cp-note exam">Remember the pair: vitamin A goes with night blindness and dry eyes.</div>
      <div class="cp-mnemonic">No A, no sight at night.</div>
    `
  },
  6: {
    questext: "Night blindness is caused by the deficiency of which vitamin?",
    options: ["Vitamin B1", "Vitamin A", "Vitamin C", "Vitamin K"],
    correct: "2",
    exptext: "✅ Lack of vitamin A causes night blindness. 📌 A is for sight at night: no A, no night sight. ❌ Vitamin C is tempting, but its lack causes scurvy, not eye problems."
  },
  7: {
    questext: "What is the chemical name of vitamin A?",
    options: ["Thiamine", "Calciferol", "Tocopherol", "Retinol"],
    correct: "4",
    exptext: "✅ Vitamin A is called retinol. 📌 Retinol and retina both start with the letters ret, and both are linked to the eye. ❌ Calciferol is vitamin D and tocopherol is vitamin E."
  },
  8: {
    type: "concept", icon: "🌾", accent: "#ef4444", pauseTimer: true,
    title: "Vitamin B Group",
    html: `
      <p class="cp-lead">Vitamin B is a <b>group</b> of water soluble vitamins. Each member has its own chemical name, food sources and deficiency disease.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/5.png" alt="whole grains pulses legumes sprouts yeast" data-caption="Whole grains, pulses, sprouts and yeast are rich sources of the vitamin B group." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Vitamin</th><th>Chemical name</th><th>Food sources</th><th>Deficiency disease</th></tr></thead><tbody><tr><td>B1</td><td>Thiamine</td><td>Legumes, whole grain, nuts, sprouts, yeast</td><td>Beriberi</td></tr><tr><td>B2</td><td>Riboflavin</td><td>Egg, milk, cheese, nuts, sprouts</td><td>Sores at the corners of the mouth and inflamed tongue (cheilosis)</td></tr><tr><td>B3</td><td>Niacin or nicotinic acid</td><td>Meat, fish, groundnuts, whole grain</td><td>Pellagra: skin disease, diarrhoea, depression, dementia</td></tr><tr><td>B5</td><td>Pantothenic acid</td><td>Eggs, liver, dairy products</td><td>Tiredness and muscle cramp</td></tr><tr><td>B6</td><td>Pyridoxine</td><td>Organ meats, cereals, corn</td><td>Anaemia, nervousness, depression</td></tr><tr><td>B12</td><td>Cyanocobalamin</td><td>Meat, fish</td><td>Pernicious anaemia: pale skin, constipation, tiredness</td></tr></tbody></table>
      <p class="cp-lead">Vitamin B6 has a special job in the brain. It helps the body make chemical messengers that carry signals from one nerve cell to the next. It also helps make serotonin, which affects mood, and melatonin, which helps control the body clock.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/6.png" alt="Matching chart with four rows: B1 to Beriberi, B2 to Mouth sores, B3 to Pellagra, B12 to P" data-caption="Four important pairs of vitamin B members and the diseases caused by their lack." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Pellagra belongs to vitamin B3 (niacin), not to B5. Beriberi belongs to vitamin B1, not to B2.</div>
      <div class="cp-mnemonic">B1 Beriberi, B2 mouth sores, B3 Pellagra, B12 pale blood.</div>
    `
  },
  9: {
    questext: "Beriberi is caused by the deficiency of which vitamin?",
    options: ["Vitamin B2", "Vitamin B6", "Vitamin B12", "Vitamin B1"],
    correct: "4",
    exptext: "✅ Lack of vitamin B1 (thiamine) causes beriberi. 📌 One bite of beriberi: B1 with beriberi. ❌ Vitamin B2 is tempting, but its lack causes sores at the corners of the mouth."
  },
  10: {
    questext: "Which pair of vitamin and chemical name is correctly matched?",
    options: ["Vitamin B2 and Thiamine", "Vitamin B1 and Riboflavin", "Vitamin B6 and Pyridoxine", "Vitamin B12 and Niacin"],
    correct: "3",
    exptext: "✅ Vitamin B6 is pyridoxine. 📌 Learn the order: B1 thiamine, B2 riboflavin, B3 niacin, B6 pyridoxine, B12 cyanocobalamin. ❌ Options 1 and 2 swap thiamine and riboflavin, and niacin belongs to B3."
  },
  11: {
    questext: "Pellagra is caused by the deficiency of which vitamin?",
    options: ["Vitamin B3", "Vitamin B5", "Vitamin B6", "Vitamin B2"],
    correct: "1",
    exptext: "✅ Lack of vitamin B3 (niacin) causes pellagra. 📌 Pellagra has three signs: skin disease, diarrhoea and dementia. ❌ Vitamin B5 is tempting because it sits next to B3, but its lack causes tiredness and muscle cramp."
  },
  12: {
    type: "concept", icon: "🍋", accent: "#8b5cf6", pauseTimer: true,
    title: "Vitamin C (Ascorbic Acid)",
    html: `
      <p class="cp-lead">Vitamin C, also called <b>ascorbic acid</b>, is a water soluble vitamin. It keeps gums, skin, blood vessels and bones strong.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/7.png" alt="citrus fruits orange lemon strawberry kiwi" data-caption="Oranges, lemons, strawberries and kiwi fruit are rich in vitamin C." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Chemical name</td><td>Ascorbic acid</td></tr><tr><td>Sources</td><td>Citrus fruits (orange, grapefruit, lemon), strawberry, black currant, kiwi, tomato, green pepper, green leafy vegetables</td></tr><tr><td>Main work</td><td>Builds collagen, heals wounds, helps the body take in iron, strengthens immunity</td></tr><tr><td>Deficiency</td><td>Scurvy</td></tr></tbody></table>
      <p class="cp-lead">Collagen is the protein that holds skin, gums and blood vessels together. Without vitamin C the body cannot make enough collagen. Then the gums swell and bleed, the teeth may fall, and tiny blood vessels burst. This disease is <b>scurvy</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/8.png" alt="Two mouths side by side: Healthy gums with vitamin C, and Swollen bleeding gums in scurvy," data-caption="Lack of vitamin C weakens collagen, so gums swell and bleed in scurvy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Too much vitamin C can cause stomach pain, diarrhoea and kidney stones, so more is not always better.</div>
      <div class="cp-mnemonic">C for Citrus, C for the Cure of Scurvy.</div>
    `
  },
  13: {
    questext: "Scurvy is caused by the deficiency of which vitamin?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    correct: "2",
    exptext: "✅ Lack of vitamin C causes scurvy. 📌 C for citrus: citrus fruits cure scurvy. ❌ Vitamin D is tempting, but its lack causes rickets in children."
  },
  14: {
    questext: "Which of the following foods is the richest source of vitamin C?",
    options: ["Cod liver oil", "Egg yolk", "Cheese", "Orange"],
    correct: "4",
    exptext: "✅ Orange and other citrus fruits are rich in vitamin C. 📌 Think of sour fruits for vitamin C. ❌ Cod liver oil and egg yolk are better sources of vitamins A and D."
  },
  15: {
    questext: "Consider the following statements about vitamin C:\n1. Vitamin C helps the body make collagen.\n2. Lack of vitamin C causes rickets.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because collagen needs vitamin C. 📌 Rickets is the vitamin D disease. ❌ Statement 2 is wrong because lack of vitamin C causes scurvy."
  },
  16: {
    type: "concept", icon: "☀️", accent: "#14b8a6", pauseTimer: true,
    title: "Vitamins D, E and K",
    html: `
      <p class="cp-lead">These three fat soluble vitamins protect the body in different ways. Vitamin D builds bones, vitamin E protects cells, and vitamin K helps blood to clot.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/9.png" alt="child playing outdoors in morning sunlight" data-caption="Sunlight on the skin helps the body make vitamin D, so it is called the sunshine vitamin." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Vitamin</th><th>Chemical name</th><th>Sources</th><th>Main work</th><th>Deficiency</th></tr></thead><tbody><tr><td>D</td><td>Calciferol</td><td>Sunlight, fish oil, egg yolk, liver</td><td>Helps the body take in calcium and phosphorus for strong bones and teeth</td><td>Rickets in children, osteomalacia in adults</td></tr><tr><td>E</td><td>Tocopherol</td><td>Vegetable oils, nuts, sprouts, green leafy vegetables, egg yolk</td><td>Protects red blood cells and body cells, keeps skin healthy</td><td>Weakness, problems of nerves and reproduction</td></tr><tr><td>K</td><td>Phylloquinone</td><td>Green leafy vegetables, soya beans, dairy products</td><td>Helps blood to clot</td><td>Heavy bleeding that does not stop</td></tr></tbody></table>
      <p class="cp-lead">The skin makes vitamin D when sunlight falls on it. That is why vitamin D is called the <b>sunshine vitamin</b>. Vitamin K is also made in our body by helpful bacteria that live in the large intestine.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/10.png" alt="Simple body diagram: sun rays fall on skin, an arrow shows vitamin D going to bones, and b" data-caption="Sunlight lets the skin make vitamin D, which helps bones take in calcium." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/11.png" alt="A small cut on a finger with a red blood clot forming and the label Vitamin K helps blood " data-caption="Vitamin K helps blood to clot, so a small cut stops bleeding." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Rickets is the vitamin D disease, not the vitamin C disease. Scurvy belongs to vitamin C.</div>
      <div class="cp-mnemonic">K for Koagulation: vitamin K helps blood to clot.</div>
    `
  },
  17: {
    questext: "Which vitamin is known as the sunshine vitamin?",
    options: ["Vitamin A", "Vitamin E", "Vitamin D", "Vitamin K"],
    correct: "3",
    exptext: "✅ The skin makes vitamin D in sunlight, so it is the sunshine vitamin. 📌 D for daylight. ❌ Vitamin A is tempting, but it is linked to the eyes, not to sunlight."
  },
  18: {
    questext: "Which vitamin is needed for the clotting of blood?",
    options: ["Vitamin E", "Vitamin K", "Vitamin A", "Vitamin C"],
    correct: "2",
    exptext: "✅ Vitamin K helps blood to clot. 📌 K stands for Koagulation, the German spelling of clotting. ❌ Vitamin C is tempting, but it helps gums and wounds, not clotting."
  },
  19: {
    questext: "Rickets in children is caused by the deficiency of which vitamin?",
    options: ["Vitamin D", "Vitamin C", "Vitamin A", "Vitamin B1"],
    correct: "1",
    exptext: "✅ Lack of vitamin D means the bones cannot take in enough calcium, so they become soft and bent, which is rickets. 📌 D for bones. ❌ Vitamin C is tempting, but its lack causes scurvy."
  },
  20: {
    questext: "What is the chemical name of vitamin E?",
    options: ["Retinol", "Calciferol", "Phylloquinone", "Tocopherol"],
    correct: "4",
    exptext: "✅ Vitamin E is tocopherol. 📌 Match the chemical names in order: A retinol, D calciferol, E tocopherol, K phylloquinone. ❌ Phylloquinone is vitamin K, and calciferol is vitamin D."
  },
  21: {
    questext: "Which of the following pairs is NOT correctly matched?",
    options: ["Vitamin K and blood clotting", "Vitamin D and rickets", "Vitamin C and night blindness", "Vitamin E and tocopherol"],
    correct: "3",
    exptext: "✅ Vitamin C does not cause night blindness; its lack causes scurvy. Night blindness is caused by lack of vitamin A. 📌 Eye problems go with A. ❌ The other three pairs are correct."
  },
  22: {
    type: "concept", icon: "🧂", accent: "#ec4899", pauseTimer: true,
    title: "Minerals and Deficiency Diseases",
    html: `
      <p class="cp-lead">Minerals are simple substances that the body needs in small amounts. <u>Each mineral has its own job, and a disease appears when it is missing.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/12.png" alt="iodised salt packet kitchen" data-caption="Iodised salt gives the body the iodine it needs to make thyroxine." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Mineral</th><th>Used for</th></tr></thead><tbody><tr><td>Iron</td><td>Making haemoglobin, the red substance in blood that carries oxygen</td></tr><tr><td>Iodine</td><td>Making thyroxine, the hormone of the thyroid gland</td></tr><tr><td>Calcium</td><td>Building strong bones and teeth</td></tr><tr><td>Sodium</td><td>Passing messages through the nerves</td></tr></tbody></table>
      <p class="cp-lead">Now put the vitamins and minerals together. The table below gives the most repeated deficiency diseases and the nutrient that causes each one.</p>
      <table><thead><tr><th>Disease</th><th>Nutrient that is lacking</th></tr></thead><tbody><tr><td>Anaemia</td><td>Iron</td></tr><tr><td>Ariboflavinosis</td><td>Vitamin B2</td></tr><tr><td>Beriberi</td><td>Vitamin B1</td></tr><tr><td>Goitre</td><td>Iodine</td></tr><tr><td>Impaired clotting of blood</td><td>Vitamin K</td></tr><tr><td>Kwashiorkor</td><td>Protein</td></tr><tr><td>Night blindness</td><td>Vitamin A</td></tr><tr><td>Osteoporosis</td><td>Calcium</td></tr><tr><td>Rickets</td><td>Vitamin D</td></tr><tr><td>Scurvy</td><td>Vitamin C</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/13.png" alt="The thyroid gland in the neck: a normal small gland labelled Enough iodine and a swollen g" data-caption="Lack of iodine makes the thyroid gland swell in the neck, a condition called goitre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/14.png" alt="Ten small cards, each pairing a disease with its missing nutrient, such as Goitre with Iod" data-caption="Revision cards that pair ten deficiency diseases with the nutrient that is missing." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Kwashiorkor is caused by lack of protein, not of a vitamin. Osteoporosis is caused by lack of calcium, while rickets is caused by lack of vitamin D.</div>
    `
  },
  23: {
    questext: "Goitre is caused by the deficiency of which mineral?",
    options: ["Iron", "Calcium", "Iodine", "Sodium"],
    correct: "3",
    exptext: "✅ Iodine is needed to make thyroxine, and lack of it swells the thyroid gland. 📌 Goitre goes with iodine and iodised salt. ❌ Iron is tempting, but its lack causes anaemia."
  },
  24: {
    questext: "Kwashiorkor is caused by the deficiency of",
    options: ["Vitamin A", "Protein", "Iron", "Iodine"],
    correct: "2",
    exptext: "✅ Kwashiorkor is a disease of protein deficiency in children. 📌 It is the protein disease, not a vitamin disease. ❌ Vitamin A is tempting, but its lack causes night blindness."
  },
  25: {
    questext: "Which mineral is needed to make haemoglobin?",
    options: ["Calcium", "Iodine", "Sodium", "Iron"],
    correct: "4",
    exptext: "✅ Iron is the mineral inside haemoglobin, and lack of it causes anaemia. 📌 Iron makes red blood strong. ❌ Calcium is tempting, but it builds bones and teeth."
  },
  26: {
    type: "concept", icon: "🌱", accent: "#3b82f6", pauseTimer: true,
    title: "Asexual and Sexual Reproduction",
    html: `
      <p class="cp-lead"><b>Reproduction</b> is the way living beings make new living beings of their own kind. It is of two types: asexual and sexual.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/15.png" alt="hydra budding freshwater polyp photo" data-caption="A hydra with a small bud that will break off and grow into a new hydra." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/16.png" alt="starfish on sea floor photo" data-caption="A starfish, which can regrow a whole body from a broken piece of its arm." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Feature</th><th>Asexual reproduction</th><th>Sexual reproduction</th></tr></thead><tbody><tr><td>Parents needed</td><td>One</td><td>Two, a male and a female</td></tr><tr><td>Special cells</td><td>Not needed</td><td>Sperm and ovum</td></tr><tr><td>Offspring</td><td>Many, made quickly</td><td>Different from each other</td></tr><tr><td>Examples</td><td>Hydra budding, starfish regrowing</td><td>Humans and most animals</td></tr></tbody></table>
      <p class="cp-lead">In asexual reproduction one living being makes many offspring quickly. It does not spend time and effort on courtship, finding a mate and mating. The hydra grows buds that break off, and a starfish can grow a whole body from a piece of the old body.</p>
      <p class="cp-lead">In sexual reproduction two special cells called <b>gametes</b> join. Sperm are the male gametes and ova (one is called an ovum) are the female gametes. Each gamete is haploid, which means it has half the usual number of chromosomes. The joining is called <b>fertilisation</b>, and it forms a diploid cell called a <b>zygote</b>, which has the full number.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/17.png" alt="Equation picture: a sperm labelled Haploid plus an ovum labelled Haploid joined by an arro" data-caption="A haploid sperm and a haploid ovum join to form a diploid zygote." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Meiosis makes gametes that are different from each other, so children of two parents are never exact copies.</div>
      <div class="cp-mnemonic">Sperm is male, ovum is female, zygote is the first cell of the new life.</div>
    `
  },
  27: {
    questext: "The hydra reproduces by which method?",
    options: ["Binary fission", "Budding", "Spore formation", "Pollination"],
    correct: "2",
    exptext: "✅ The hydra grows buds that break off and become new hydra, which is budding. 📌 Hydra means buds. ❌ Binary fission is tempting, but it is how bacteria and amoeba divide."
  },
  28: {
    questext: "The fusion of a haploid male gamete and a haploid female gamete forms",
    options: ["Zygote", "Embryo sac", "Gonad", "Pollen grain"],
    correct: "1",
    exptext: "✅ Two haploid gametes join to make one diploid cell called a zygote. 📌 Fertilisation gives the zygote. ❌ An embryo sac is a structure inside the ovule of a flower, not the result of fertilisation."
  },
  29: {
    type: "concept", icon: "👶", accent: "#f97316", pauseTimer: true,
    title: "Human Reproduction and Development",
    html: `
      <p class="cp-lead">Humans reproduce sexually. The organs that make gametes are called <b>gonads</b>. <u>In males the gonads are the testes, and in females they are the ovaries.</u></p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/18.png" alt="Labelled side view of the male reproductive system: testis, epididymis, sperm duct, urethr" data-caption="The main parts of the male reproductive system, where sperm are made, stored and carried." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Gonad</th><th>Gamete it makes</th><th>Hormones it makes</th></tr></thead><tbody><tr><td>Testes (male)</td><td>Sperm</td><td>Male sex hormones</td></tr><tr><td>Ovaries (female)</td><td>Eggs, also called ova</td><td>Female sex hormones</td></tr></tbody></table>
      <p class="cp-lead">Sperm production begins at puberty and continues throughout life. Several hundred million sperm are made every day. New sperm move into the <b>epididymis</b>, where they mature and are stored.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/19.png" alt="human sperm cells microscope photo" data-caption="Human sperm cells seen under a microscope, each with a head and a long tail." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The female external genital organs are together called the <b>vulva</b>. Inside the body, the ovaries make eggs and the oviducts carry them towards the uterus.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/20.png" alt="Labelled front view of the female reproductive system: ovary, oviduct, uterus, vulva." data-caption="The main parts of the female reproductive system, where eggs are made and a baby grows." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Fact</th><th>Value</th></tr></thead><tbody><tr><td>Normal menstrual cycle</td><td>About 28 days</td></tr><tr><td>Age of menopause</td><td>45 to 50 years</td></tr><tr><td>Volume of semen</td><td>2 to 5 millilitres each time</td></tr></tbody></table>
      <div class="cp-note exam">Menstrual cycle 28 days and menopause at 45 to 50 years are repeated facts in General Science papers.</div>
      <div class="cp-note trap">The ovaries and testes are gonads. The epididymis only stores sperm and does not make them.</div>
    `
  },
  30: {
    questext: "Which organs are the male gonads that produce sperm?",
    options: ["Ovaries", "Epididymis", "Testes", "Uterus"],
    correct: "3",
    exptext: "✅ The testes are the male gonads and they make sperm. 📌 Testes make sperm, ovaries make ova. ❌ The epididymis is tempting, but it only stores and matures sperm."
  },
  31: {
    questext: "What is the length of the normal human menstrual cycle?",
    options: ["14 days", "28 days", "35 days", "45 days"],
    correct: "2",
    exptext: "✅ The normal menstrual cycle is about 28 days. 📌 Think of one lunar month, about 28 days. ❌ Fourteen days is only the middle of the cycle, when the egg is released."
  },
  32: {
    questext: "In which organ are sperm matured and stored?",
    options: ["Testes", "Ovary", "Prostate", "Epididymis"],
    correct: "4",
    exptext: "✅ Sperm move to the epididymis, where they mature and are stored. 📌 Testes make, epididymis keeps. ❌ The testes are tempting, but they only produce the sperm."
  },
  33: {
    questext: "At about what age does menopause normally occur in women?",
    options: ["45 to 50 years", "25 to 30 years", "35 to 40 years", "60 to 65 years"],
    correct: "1",
    exptext: "✅ Menopause usually occurs between 45 and 50 years of age, when the menstrual cycle stops. 📌 Menopause means the end of periods in the late forties. ❌ Thirty-five to forty is too early for most women."
  },
  34: {
    type: "concept", icon: "🛡️", accent: "#84cc16", pauseTimer: true,
    title: "Sexually Transmitted Diseases and Birth Control",
    html: `
      <p class="cp-lead">Sexually transmitted diseases spread through sexual contact. They can harm the sexual partners, an unborn baby and a newborn child. They are grouped into three categories.</p>
      <table><thead><tr><th>Category</th><th>What the diseases do</th><th>Examples</th><th>Treatment</th></tr></thead><tbody><tr><td>One</td><td>Inflame the urethra, epididymis, cervix or oviducts</td><td>Gonorrhoea, chlamydia</td><td>Cured with antibiotics once diagnosed</td></tr><tr><td>Two</td><td>Cause sores on the outer sex organs</td><td>Genital herpes, syphilis</td><td>Herpes can be controlled with antiviral drugs but not cured; syphilis is caused by bacteria and is curable with antibiotics</td></tr><tr><td>Three</td><td>Viral diseases that harm organs other than the reproductive organs</td><td>Acquired Immunodeficiency Syndrome (AIDS), hepatitis B</td><td>They spread by sexual contact or by blood, and the person may look healthy for years</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/21.png" alt="Three boxes in a row: Category One inflammation with Gonorrhoea and Chlamydia, Category Tw" data-caption="The three categories of sexually transmitted diseases with their main examples." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead"><b>Birth control</b> keeps sexual intercourse separate from pregnancy. A pregnancy needs three stages: release and transport of gametes, fertilisation, and implantation of the embryo in the uterus. Every birth control method blocks one of these three stages.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/22.png" alt="Three boxes joined by arrows: Release and transport of gametes, Fertilisation, Implantatio" data-caption="Birth control methods work by blocking release of gametes, fertilisation or implantation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/23.png" alt="red ribbon World AIDS Day awareness photo" data-caption="The red ribbon is the world symbol of awareness about Acquired Immunodeficiency Syndrome." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Genital herpes cannot be cured, but syphilis can be cured because it is caused by bacteria. AIDS and hepatitis B can spread through blood as well.</div>
    `
  },
  35: {
    questext: "Which sexually transmitted disease is caused by bacteria and can be cured with antibiotics?",
    options: ["Syphilis", "Genital herpes", "Acquired Immunodeficiency Syndrome", "Hepatitis B"],
    correct: "1",
    exptext: "✅ Syphilis is caused by bacteria, so antibiotics can cure it. 📌 Bacteria means antibiotics work, viruses mean they do not. ❌ Genital herpes is tempting, but it is viral and cannot be cured."
  },
  36: {
    questext: "Consider the following statements:\n1. Genital herpes can be completely cured by antiviral drugs.\n2. Gonorrhoea and chlamydia can be cured with antibiotics once they are diagnosed.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Herpes drugs only control the symptoms. ❌ Statement 1 is wrong because the herpes infection cannot be cured."
  },
  37: {
    type: "concept", icon: "🌸", accent: "#06b6d4", pauseTimer: true,
    title: "The Flower and Pollen",
    html: `
      <p class="cp-lead">The flower is the reproductive part of a flowering plant. It has a male part and a female part.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/24.png" alt="Cut-open flower with labels: petal, stamen with anther and filament, pistil with stigma, s" data-caption="The inside of a flower, showing the stamen, the pistil and the ovule." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Part</th><th>Sex</th><th>Collective name</th></tr></thead><tbody><tr><td>Stamen</td><td>Male</td><td>Androecium</td></tr><tr><td>Carpel or pistil</td><td>Female</td><td>Gynoecium</td></tr></tbody></table>
      <p class="cp-lead">Each stamen has a thin <b>filament</b> with an <b>anther</b> at its tip. The anther makes pollen grains. Pollen grains carry the male gametophyte, which is a tiny plant body that makes male gametes. They are made by meiosis inside the anther sacs.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/25.png" alt="pollen grains electron microscope photo" data-caption="Pollen grains seen under a powerful microscope, each with its own pattern of ridges." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The female part is the <b>pistil</b> or carpel. Its ovary holds one or many <b>ovules</b>. Inside an ovule there is a very small female gametophyte called the <b>embryo sac</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/26.png" alt="hibiscus flower close up stamen pistil" data-caption="A hibiscus flower with its stamens and pistil clearly visible at the centre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">Androecium is the male group and gynoecium is the female group. A is for Anther and male, G is for Girl and female.</div>
    `
  },
  38: {
    questext: "Which is the male reproductive part of a flower?",
    options: ["Pistil", "Carpel", "Ovule", "Stamen"],
    correct: "4",
    exptext: "✅ The stamen, with its anther, makes pollen, so it is the male part. 📌 Stamen sounds like man. ❌ The pistil and carpel are the female parts, and the ovule sits inside the ovary."
  },
  39: {
    questext: "What is the collective name for the female parts of a flower?",
    options: ["Gynoecium", "Androecium", "Calyx", "Corolla"],
    correct: "1",
    exptext: "✅ The carpels or pistils together are called the gynoecium. 📌 G for Girl. ❌ Androecium is tempting, but it means the male stamens."
  },
  40: {
    type: "concept", icon: "🐝", accent: "#a855f7", pauseTimer: true,
    title: "Pollination",
    html: `
      <p class="cp-lead"><b>Pollination</b> is the transfer of pollen from the anther to the stigma of a flower. It must happen before a seed can form.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/27.png" alt="honey bee collecting pollen on flower photo" data-caption="A honey bee carries pollen from flower to flower while it collects nectar." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Name</th><th>Carried by</th></tr></thead><tbody><tr><td>Entomophily</td><td>Insects</td></tr><tr><td>Anemophily</td><td>Wind</td></tr><tr><td>Hydrophily</td><td>Water</td></tr><tr><td>Other pollinators</td><td>Birds, bats and humans</td></tr></tbody></table>
      <p class="cp-lead">Insect-pollinated flowers are usually bright and sweet-smelling, which attracts the insects. Wind-pollinated flowers make huge amounts of very light, dry pollen, because the wind scatters it far and wide.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/28.png" alt="maize tassels releasing pollen wind photo" data-caption="Maize tassels shed a cloud of light pollen that the wind carries away." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/29.png" alt="Three panels: an insect carrying pollen to a flower labelled Entomophily, wind blowing pol" data-caption="Pollen can be carried by insects, by wind or by water." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Pollination only moves the pollen. Fertilisation happens later, when the male and female gametes fuse.</div>
      <div class="cp-mnemonic">Entomo means insect, Anemo means wind.</div>
    `
  },
  41: {
    questext: "Pollination by wind is called",
    options: ["Entomophily", "Hydrophily", "Ornithophily", "Anemophily"],
    correct: "4",
    exptext: "✅ Pollination by wind is anemophily. 📌 Anemo means wind, like an anemometer. ❌ Entomophily is tempting, but it means pollination by insects."
  },
  42: {
    questext: "Entomophily means pollination by",
    options: ["Wind", "Water", "Insects", "Birds"],
    correct: "3",
    exptext: "✅ Entomophily is pollination by insects. 📌 Entomology is the study of insects. ❌ Wind is tempting, but wind pollination is anemophily."
  },
  43: {
    questext: "The transfer of pollen from the anther to the stigma is called",
    options: ["Fertilisation", "Pollination", "Germination", "Syngamy"],
    correct: "2",
    exptext: "✅ Moving pollen from anther to stigma is pollination. 📌 Pollination comes first and fertilisation comes after it. ❌ Fertilisation is tempting, but it is the fusion of male and female gametes."
  },
  44: {
    type: "concept", icon: "🍎", accent: "#e11d48", pauseTimer: true,
    title: "Double Fertilisation and Fruit",
    html: `
      <p class="cp-lead">After pollination, the pollen grain grows a thin <b>pollen tube</b>. The tube pushes through the stigma and the style towards the ovules in the ovary.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/30.png" alt="Embryo sac drawing with seven labelled cells: one egg cell and two synergids at one end, t" data-caption="The seven-celled embryo sac has an egg cell, two synergids, three antipodal cells and a central cell." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">The embryo sac has seven cells. At one end are the egg cell and two synergids, which together are the egg apparatus. At the other end are three antipodal cells. In the middle is a large cell with two polar nuclei, and these fuse to form a diploid secondary nucleus.</p>
      <p class="cp-lead">The pollen tube enters the embryo sac and releases two male gametes. Both get used, and that is why the event is called <b>double fertilisation</b>.</p>
      <table><thead><tr><th>Fusion</th><th>Result</th></tr></thead><tbody><tr><td>Male gamete with egg cell (syngamy)</td><td>Zygote, which grows into the embryo</td></tr><tr><td>Male gamete with diploid secondary nucleus</td><td>Primary endosperm nucleus, which is triploid and becomes the food store</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/31.png" alt="Pollen tube entering the embryo sac: one male gamete joins the egg cell labelled Zygote, t" data-caption="Two male gametes do two different jobs: one makes the zygote and the other makes the food store." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <p class="cp-lead">After fertilisation the ovary wall grows into a <b>fruit</b>. Fruits may be fleshy or hard, and single or multiple. The seed germinates, and its embryo grows into the next generation of the plant.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/32.png" alt="mango cut open fruit seed cross section" data-caption="A cut mango shows the fleshy fruit made from the ovary wall and the seed inside." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">Double fertilisation happens only in flowering plants, which are called angiosperms.</div>
      <div class="cp-note trap">The zygote is diploid, but the primary endosperm nucleus is triploid because three sets of chromosomes join in it.</div>
    `
  },
  45: {
    questext: "Consider the following statements about double fertilisation:\n1. Double fertilisation is seen only in flowering plants.\n2. One male gamete fuses with the egg cell and the other fuses with the diploid secondary nucleus.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Two male gametes make two fusions, so the event is called double. ❌ Choosing only one statement misses that both facts are true for flowering plants."
  },
  46: {
    questext: "The primary endosperm nucleus is",
    options: ["Haploid", "Diploid", "Triploid", "Tetraploid"],
    correct: "3",
    exptext: "✅ One haploid male gamete joins a diploid secondary nucleus, so the nucleus has three sets and is triploid. 📌 One plus two makes three. ❌ Diploid is tempting, but that is the zygote."
  },
  47: {
    questext: "After fertilisation, the ovary wall develops into",
    options: ["Fruit", "Seed", "Embryo", "Pollen tube"],
    correct: "1",
    exptext: "✅ The ovary wall grows into the fruit. 📌 Ovary becomes fruit, ovule becomes seed. ❌ The seed is tempting, but it forms from the ovule inside the ovary."
  },
  48: {
    questext: "How many cells are there in a typical embryo sac of a flowering plant?",
    options: ["Three", "Five", "Six", "Seven"],
    correct: "4",
    exptext: "✅ The embryo sac has seven cells: one egg, two synergids, three antipodal cells and one central cell. 📌 One plus two plus three plus one makes seven. ❌ The egg apparatus alone has only three cells."
  },
  49: {
    type: "concept", icon: "🌿", accent: "#10b981", pauseTimer: true,
    title: "Photosynthesis",
    html: `
      <p class="cp-lead"><b>Photosynthesis</b> is the process by which green plants make their own food from water and carbon dioxide, using the energy of sunlight. It takes place in the chloroplasts of the leaf cells.</p>
      <div class="cp-formula" translate="no"><small>Photosynthesis</small>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ <small>(in light, inside chloroplasts)</small></div>
      <p class="cp-lead">The raw materials are water and carbon dioxide. The products are sugar and oxygen. Water enters through the roots and climbs to the leaves through special cells called <b>xylem</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/33.png" alt="Cross section of a leaf with arrows: Water arrives by xylem, Carbon dioxide enters through" data-caption="A leaf takes in water, carbon dioxide and sunlight, and gives out sugar and oxygen." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Item</th><th>How it moves</th></tr></thead><tbody><tr><td>Water</td><td>Enters the root and goes up to the leaves through xylem</td></tr><tr><td>Carbon dioxide</td><td>Cannot cross the waxy cuticle, so it enters through the stomata</td></tr><tr><td>Oxygen</td><td>Leaves through the open stomata</td></tr><tr><td>Sugar</td><td>Made in the leaf and sent to other parts</td></tr></tbody></table>
      <p class="cp-lead">Each stomata opening is guarded by two <b>guard cells</b>, which open and close it. The waxy layer that covers the leaf is called the cuticle. It stops water loss, but it also blocks gases, so the gases use the stomata.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/34.png" alt="leaf stomata guard cells microscope photo" data-caption="Tiny stomata, each flanked by two guard cells, on the surface of a leaf." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/35.png" alt="Input and output diagram: Water and Carbon dioxide go into a green leaf with a sun above i" data-caption="Inputs and outputs of photosynthesis in one picture." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Oxygen leaves the leaf only through the open stomata, because the waxy cuticle does not let gases pass.</div>
    `
  },
  50: {
    questext: "Through which tissue does water travel from the root to the leaves?",
    options: ["Phloem", "Xylem", "Cuticle", "Stomata"],
    correct: "2",
    exptext: "✅ Xylem carries water up from the root to the leaves. 📌 Xylem for water, phloem for food. ❌ Phloem is tempting, but it carries food made in the leaves."
  },
  51: {
    questext: "Through which structures does carbon dioxide enter a leaf?",
    options: ["Cuticle", "Root hairs", "Stomata", "Xylem"],
    correct: "3",
    exptext: "✅ Carbon dioxide enters through the stomata. 📌 Stomata are the doors of the leaf. ❌ The cuticle is tempting, but it is waxy and blocks gases."
  },
  52: {
    questext: "What are the products of photosynthesis?",
    options: ["Sugar and oxygen", "Water and carbon dioxide", "Starch and carbon dioxide", "Protein and oxygen"],
    correct: "1",
    exptext: "✅ Photosynthesis makes sugar and gives out oxygen. 📌 Raw materials go in, sugar and oxygen come out. ❌ Water and carbon dioxide are the raw materials, not the products."
  },
  53: {
    type: "concept", icon: "🎨", accent: "#eab308", pauseTimer: true,
    title: "Chlorophyll and Accessory Pigments",
    html: `
      <p class="cp-lead"><b>Chlorophyll</b> is the green pigment found in all photosynthetic cells. It catches the light energy that photosynthesis needs.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/36.png" alt="A beam of white light hitting a leaf: red and blue arrows labelled Absorbed, a green arrow" data-caption="Chlorophyll absorbs mainly red and blue light and reflects green light." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Colour of light</th><th>What happens at a leaf</th></tr></thead><tbody><tr><td>Red</td><td>Absorbed by chlorophyll</td></tr><tr><td>Blue</td><td>Absorbed by chlorophyll</td></tr><tr><td>Green</td><td>Reflected, so the leaf looks green</td></tr></tbody></table>
      <p class="cp-lead">A leaf looks green because green light is reflected back to our eyes. Other pigments called accessory pigments, such as carotenoids, also catch light and pass the energy to chlorophyll.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/37.png" alt="green leaf in sunlight close up photo" data-caption="A green leaf in sunlight, whose colour comes from chlorophyll." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">A pigment shows the colour it reflects, not the colour it absorbs. A black object absorbs all colours of light.</div>
    `
  },
  54: {
    questext: "Leaves look green because chlorophyll",
    options: ["absorbs green light", "reflects green light", "absorbs all colours", "makes green light"],
    correct: "2",
    exptext: "✅ Chlorophyll reflects green light, and that light reaches our eyes. 📌 We see the colour a leaf reflects. ❌ Absorbing green light would make the leaf look dark, not green."
  },
  55: {
    questext: "A black object looks black because it",
    options: ["reflects all wavelengths", "reflects only green", "lets all light pass", "absorbs all wavelengths"],
    correct: "4",
    exptext: "✅ A black object absorbs all colours of light and reflects almost none. 📌 Black takes everything in. ❌ A white object, not a black one, reflects all the wavelengths."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a glowing DNA helix, a fresh orange slice with a green leaf, and a delicate flower with visible stamens" },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"fresh fruits vegetables nuts milk healthy food\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/1.png. a table full of fruits, vegetables, nuts and dairy foods",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/2.png": { t: "fig", about: "Tree diagram: a box labelled VITAMINS splits into two ovals, Fat soluble with K, E, D, A below it and Water soluble with B, C below it." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"carrots milk cod liver oil green leafy vegetables\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/3.png. foods rich in vitamin A placed together",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/4.png": { t: "fig", about: "Two eyes side by side: the left eye labelled Enough vitamin A sees a clear road at night, the right eye labelled Lack of vitamin A sees only a dark blur." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"whole grains pulses legumes sprouts yeast\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/5.png. a bowl of whole grains and pulses with sprouts",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/6.png": { t: "fig", about: "Matching chart with four rows: B1 to Beriberi, B2 to Mouth sores, B3 to Pellagra, B12 to Pernicious anaemia, each pair joined by a line." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"citrus fruits orange lemon strawberry kiwi\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/7.png. fresh citrus fruits cut open with strawberries and kiwi",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/8.png": { t: "fig", about: "Two mouths side by side: Healthy gums with vitamin C, and Swollen bleeding gums in scurvy, with a tooth loosening." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"child playing outdoors in morning sunlight\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/9.png. a child standing in warm morning sunlight",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/10.png": { t: "fig", about: "Simple body diagram: sun rays fall on skin, an arrow shows vitamin D going to bones, and bones are labelled Calcium in strong bone." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/11.png": { t: "fig", about: "A small cut on a finger with a red blood clot forming and the label Vitamin K helps blood to clot." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"iodised salt packet kitchen\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/12.png. a packet of iodised salt on a kitchen shelf",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/13.png": { t: "fig", about: "The thyroid gland in the neck: a normal small gland labelled Enough iodine and a swollen gland labelled Goitre, Lack of iodine." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/14.png": { t: "fig", about: "Ten small cards, each pairing a disease with its missing nutrient, such as Goitre with Iodine and Scurvy with Vitamin C." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hydra budding freshwater polyp photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/15.png. a hydra with a small bud growing on its body",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"starfish on sea floor photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/16.png. a starfish on the sea floor",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/17.png": { t: "fig", about: "Equation picture: a sperm labelled Haploid plus an ovum labelled Haploid joined by an arrow to a round cell labelled Zygote, Diploid." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/18.png": { t: "fig", about: "Labelled side view of the male reproductive system: testis, epididymis, sperm duct, urethra." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"human sperm cells microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/19.png. sperm cells seen under a microscope",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/20.png": { t: "fig", about: "Labelled front view of the female reproductive system: ovary, oviduct, uterus, vulva." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/21.png": { t: "fig", about: "Three boxes in a row: Category One inflammation with Gonorrhoea and Chlamydia, Category Two sores with Herpes and Syphilis, Category Three viral with AIDS and Hepatitis B." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/22.png": { t: "fig", about: "Three boxes joined by arrows: Release and transport of gametes, Fertilisation, Implantation, with a red stop sign over each box." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"red ribbon World AIDS Day awareness photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/23.png. a red ribbon worn for AIDS awareness",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/24.png": { t: "fig", about: "Cut-open flower with labels: petal, stamen with anther and filament, pistil with stigma, style and ovary, ovule inside the ovary." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"pollen grains electron microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/25.png. pollen grains seen under a microscope",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hibiscus flower close up stamen pistil\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/26.png. a hibiscus flower showing its long stamens and pistil",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"honey bee collecting pollen on flower photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/27.png. a honey bee on a flower covered in pollen",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"maize tassels releasing pollen wind photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/28.png. maize tassels shedding yellow pollen in the wind",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/29.png": { t: "fig", about: "Three panels: an insect carrying pollen to a flower labelled Entomophily, wind blowing pollen labelled Anemophily, water carrying pollen labelled Hydrophily." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/30.png": { t: "fig", about: "Embryo sac drawing with seven labelled cells: one egg cell and two synergids at one end, three antipodal cells at the other end, one large central cell with two polar nuclei." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/31.png": { t: "fig", about: "Pollen tube entering the embryo sac: one male gamete joins the egg cell labelled Zygote, the other joins the central cell labelled Primary endosperm nucleus." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"mango cut open fruit seed cross section\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/32.png. a mango cut open to show flesh and a seed",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/33.png": { t: "fig", about: "Cross section of a leaf with arrows: Water arrives by xylem, Carbon dioxide enters through the stomata, Sunlight falls from above, Sugar is made, Oxygen leaves through the stomata." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"leaf stomata guard cells microscope photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/34.png. stomata with guard cells under a microscope",
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/35.png": { t: "fig", about: "Input and output diagram: Water and Carbon dioxide go into a green leaf with a sun above it; Sugar and Oxygen come out." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/36.png": { t: "fig", about: "A beam of white light hitting a leaf: red and blue arrows labelled Absorbed, a green arrow labelled Reflected to our eyes." },
  "images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"green leaf in sunlight close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Biology/Vitamins_Reproduction_and_Plants/37.png. a green leaf with sunlight shining through it"
});

/* CHANGE LOG
   - Vitamin B1 is written with its chemical name Thiamine (the source spelled it Thymine).
   - Beriberi is linked to deficiency of Vitamin B1 (the source said only Vitamin B).
   - Pellagra is placed under Vitamin B3 (niacin); the source listed it against Vitamin B5.
   - Vitamin K is made by helpful bacteria in the large intestine (colon); the source called the colon part of the small intestine.
   - Vitamin B12 deficiency is named pernicious anaemia, with its pale skin and tiredness.
   - Chlorophyll absorbs mainly red and blue light and reflects green light (the source said it absorbs every colour except green).
   - The embryo sac is the seven-celled structure; the egg apparatus is only the egg cell plus the two synergids (the source called the egg apparatus seven-celled).
   - Hydrophily (pollination by water) is named, because the source only said that water can carry pollen.
   - Exact sperm count figures are left out because normal values vary widely; only the facts that stay fixed are kept.
   - Vitamin D deficiency in adults is given as osteomalacia; osteoporosis is kept as the calcium deficiency disease.
*/
