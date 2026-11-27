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

/* ═══ SNIPPET 4 — put right after SNIPPET 3 ═══ */
/* ── IMAGE-ROW SNIPPET: pictures that come one after another sit side by side in ONE row (2, 3 or 4 per row) instead of a tall stack with empty space ── */
(function () {
  var CSS = [
    ".cp-figrow{display:grid!important;gap:14px;align-items:stretch;width:100%;max-width:100%;margin:16px auto!important;box-sizing:border-box;padding:0}",
    ".cp-figrow.n2{grid-template-columns:repeat(2,minmax(0,1fr));max-width:880px}",
    ".cp-figrow.n3{grid-template-columns:repeat(3,minmax(0,1fr))}",
    ".cp-figrow.n4{grid-template-columns:repeat(4,minmax(0,1fr))}",
    ".cp-figcell{display:flex!important;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:8px;min-width:0;margin:0!important;padding:0!important}",
    ".cp-figcell>.cp-fig{margin:0!important;width:100%!important;max-width:100%!important;min-width:0}",
    ".cp-figrow img{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;max-height:none!important;aspect-ratio:4/3;object-fit:contain!important;margin:0 auto!important}",
    ".cp-figrow .cpm{width:100%!important;max-width:none!important;margin:0!important}",
    "@media (max-width:980px){.cp-figrow.n4{grid-template-columns:repeat(2,minmax(0,1fr))}}",
    "@media (max-width:560px){.cp-figrow{gap:10px}.cp-figrow.n3{grid-template-columns:repeat(2,minmax(0,1fr))}.cp-figrow.n3>.cp-figcell:last-child{grid-column:1/-1}.cp-figrow.n3>.cp-figcell:last-child img{aspect-ratio:16/9}}"
  ].join("");
  function add() {
    if (document.getElementById("cpfr-style")) return;
    var st = document.createElement("style");
    st.id = "cpfr-style";
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }
  add();
})();

/* Field: General_Awareness · Subject: Chemistry · Chapter: Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels · 23 concept pages (+ overview) · 62 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Alloys, Bonding, Pollution, Gases, Organic Chemistry and Fuels",
    thumb: {
      image: "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "CHEMISTRY",
      line2: "ALLOYS • BONDING",
      line3: "GASES • FUELS",
      badge: "PART 5",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Chemistry Part 5: Alloys, Bonding, Pollution, Gases, Organic and Fuels | General Science",
      altTitles: ["Alloys and Chemical Bonding Fast Revision for SSC CGL", "Pollution, Gas Laws and Fuels Chemistry in One Class"],
      description: "Chemistry decides a big part of your General Science score. In this class we finish the subject with alloys, chemical bonding, air and water pollution, the gas laws, organic chemistry and fuels. Each idea is explained in simple words, then fixed in memory with a short trick and practice questions.\n\n📌 IN THIS CLASS\n✅ Alloys and their uses\n✅ Ionic, covalent and coordinate bonds\n✅ Pollution, ozone and acid rain\n✅ Gas laws and ideal gas equation\n✅ Organic compounds and fuels\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Chemistry #GeneralScience",
      tags: ["chemistry for ssc cgl", "alloys and their uses", "chemical bonding", "ionic and covalent bond", "coordinate bond", "hydrogen bond", "air pollution", "greenhouse effect", "acid rain", "ozone layer depletion", "BOD and COD", "gas laws", "Boyle's law Charles law", "Avogadro number", "organic chemistry basics", "alkanes alkenes alkynes", "important hydrocarbons", "alcohols and phenol", "coal and petroleum", "octane number knocking", "LPG CNG gasohol", "rocket fuel", "general science tricks", "ssc general awareness", "Chemistry Part5 Alloys Bondin"],
      hashtags: ["SSCCGL", "Chemistry", "GeneralScience"],
      thumbText: "ALLOYS + BONDING + GASES + FUELS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "⚗️ New class is live: Chemistry Part 5 — alloys, bonding, pollution, gases and fuels. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Alloys\n00:00 Chemical Bonding\n00:00 Atmospheric Pollution\n00:00 Properties of Gases\n00:00 Organic Chemistry\n00:00 Fuels",
      playlist: "General Science — Chemistry Classes"
    },
    html: `
      <p class="cp-lead">A <u>step-by-step class on the last part of Chemistry</u>: alloys, chemical bonding, air and water pollution, gases, organic chemistry and fuels. These topics bring many direct questions in Staff Selection Commission papers, so we will learn each one slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>23</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>62</b><span>Questions</span></div>
        <div class="cp-stat"><b>~108 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Alloys</b><br>What an alloy is, why it is stronger than a pure metal, and the metals and uses of brass, bronze, steel and other important alloys.</li>
        <li><b>Chemical Bonding</b><br>How atoms complete their outer shell by transferring, sharing or donating electrons, and how hydrogen bonds and Van der Waals forces work between molecules.</li>
        <li><b>Atmospheric Pollution</b><br>Primary and secondary pollutants, harmful gases, the greenhouse effect, acid rain, smog and lung diseases caused by dust.</li>
        <li><b>Ozone Layer and Water Pollution</b><br>How chlorofluorocarbons destroy ozone, and how dissolved oxygen, Biochemical Oxygen Demand and Chemical Oxygen Demand show the quality of water.</li>
        <li><b>Properties of Gases</b><br>Why gases spread, press and compress, and the gas laws of Boyle, Charles, Avogadro and Gay-Lussac with the ideal gas equation.</li>
        <li><b>Organic Chemistry</b><br>Isomers, functional groups, alkanes, alkenes, alkynes, benzene, and the useful halogen derivatives, alcohols and phenol.</li>
        <li><b>Fuels</b><br>Coal, petroleum, knocking and octane number, gaseous fuels, the parts of a flame and rocket propellants.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> alloys, pollution, gas laws, organic compounds and fuels are among the most repeated Chemistry topics in General Awareness, and the facts are short and easy to score once you know them.</div>
    `
  },
  2: {
    type: "concept", icon: "🔩", accent: "#f59e0b", pauseTimer: true,
    title: "Alloys",
    html: `
      <p class="cp-lead">An alloy is a <u>uniform mixture of a metal with one or more other elements</u>. Pure metals are usually too soft or weak for daily use, so people improve them by mixing.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/1.png" alt="brass utensils and bronze statues photo" data-caption="Brass and bronze objects, both made mainly from copper." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/2.png" alt="Two panels side by side. Left: one metal drawn as neat rows of identical circles, label Pu" data-caption="Atoms of a second metal lock the layers, so the alloy is harder." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>When another element is added, its atoms sit between the atoms of the main metal and stop the layers from sliding over each other. This makes the alloy harder and stronger. An alloy is a mixture, not a compound, because its composition can change and its parts keep their own properties.</p>
      <table><thead><tr><th>Property</th><th>Alloy compared with the pure metal</th></tr></thead><tbody><tr><td>Hardness and strength</td><td>Greater</td></tr><tr><td>Resistance to corrosion</td><td>Better</td></tr><tr><td>Composition</td><td>Can be changed</td></tr><tr><td>Separation of parts</td><td>Not possible by physical methods</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> An alloy of mercury with another metal is called an <b>amalgam</b>. Sodium, potassium, gold and zinc all form amalgams. Mercury is kept in iron containers because iron does not form an amalgam with it.</div>
      <div class="cp-note trap">An alloy is a homogeneous mixture, not a compound. If a question asks what an alloy is, do not choose "compound".</div>
      <div class="cp-note exam">Questions often ask which metal forms an amalgam. The answer is always mercury.</div>
    `
  },
  3: {
    questext: "Which of the following is an alloy of mercury with another metal?",
    options: ["Brass", "Amalgam", "Bronze", "Solder"],
    correct: "2",
    exptext: "✅ An alloy of mercury with another metal is called an amalgam. 📌 Amalgam always means a mercury mixture. ❌ Brass is made of copper and zinc, so it has no mercury."
  },
  4: {
    questext: "Alloys are treated as mixtures and not as compounds mainly because",
    options: ["their parts are joined in a fixed ratio", "they always contain a non-metal", "they cannot be made by melting metals", "their composition can vary and the parts keep their properties"],
    correct: "4",
    exptext: "✅ The composition of an alloy can be changed and its parts keep their own properties, which is true of a mixture. 📌 Alloy means mixture. ❌ A fixed ratio is the sign of a compound."
  },
  5: {
    type: "concept", icon: "🏺", accent: "#0ea5e9", pauseTimer: true,
    title: "Important Alloys and Their Uses",
    html: `
      <p class="cp-lead">Alloys are named after their main metals. <u>Learn the metals in each alloy and its main use</u>, because examination questions ask exactly this.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/3.png" alt="bronze temple bell hanging photo" data-caption="A temple bell cast from bell metal, which is copper with tin." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/4.png" alt="stainless steel surgical instruments tray photo" data-caption="Surgical instruments made of stainless steel." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/5.png" alt="A simple tree with copper at the top. Branch 1: copper + zinc = Brass. Branch 2: copper + " data-caption="Copper joins zinc to give brass and tin to give bronze." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Alloy</th><th>Composition</th><th>Main use</th></tr></thead><tbody><tr><td>Brass</td><td>Copper 70 percent, zinc 30 percent</td><td>Utensils, pipes, statues</td></tr><tr><td>Yellow brass</td><td>Copper 67 percent, zinc 33 percent</td><td>Hardware items</td></tr><tr><td>Bronze</td><td>Copper 90 percent, tin 10 percent</td><td>Coins, ornaments, utensils, statues</td></tr><tr><td>Bell metal</td><td>Copper 77 percent, tin 23 percent</td><td>Casting of bells</td></tr><tr><td>Gun metal</td><td>Copper 88 percent, tin 10 percent, zinc 2 percent</td><td>Guns and machine parts</td></tr><tr><td>German silver</td><td>Copper 60 percent, zinc 20 percent, nickel 20 percent</td><td>Electroplating and utensils</td></tr><tr><td>Monel</td><td>Nickel 67 percent with copper, a little iron, manganese, carbon and silicon</td><td>Valves, pumps and heat exchangers</td></tr><tr><td>Coin metal</td><td>Copper 75 percent, nickel 25 percent</td><td>Coins</td></tr><tr><td>Stainless steel</td><td>Iron about 82 percent, chromium and nickel about 18 percent</td><td>Surgical instruments, watches, utensils</td></tr><tr><td>Magnalium</td><td>Aluminium 95 percent, magnesium 5 percent</td><td>Light articles and physical balances</td></tr><tr><td>Duralumin</td><td>Aluminium 95 percent, copper 4 percent, manganese and magnesium about 0.5 percent each</td><td>Parts of aeroplanes and ships</td></tr><tr><td>Alnico</td><td>Aluminium, nickel, cobalt, copper and iron</td><td>Making magnets</td></tr><tr><td>Sterling silver</td><td>Silver 92.5 percent, copper 7.5 percent</td><td>Jewellery and art objects</td></tr><tr><td>Solder</td><td>Lead 50 percent, tin 50 percent</td><td>Joining electric wires</td></tr><tr><td>Plumber's solder</td><td>Lead 67 percent, tin 33 percent</td><td>Soldering joints</td></tr><tr><td>Wood's metal</td><td>Bismuth 50 percent, lead 25 percent, tin 12.5 percent, cadmium 12.5 percent</td><td>Fuse plugs and automatic sprinklers</td></tr></tbody></table>
      <div class="cp-mnemonic">Brass = copper and zinc. Bronze = copper and tin. Magnalium = magnesium and aluminium.</div>
      <div class="cp-note trap">German silver contains no silver at all. It is made of copper, zinc and nickel.</div>
    `
  },
  6: {
    questext: "Which alloy contains no silver even though silver is part of its name?",
    options: ["German silver", "Sterling silver", "Solder", "Wood's metal"],
    correct: "1",
    exptext: "✅ German silver is made of copper, zinc and nickel, so it has no silver. 📌 The name only tells that it looks like silver. ❌ Sterling silver is 92.5 percent silver."
  },
  7: {
    questext: "Which pair of metals makes bronze?",
    options: ["Copper and zinc", "Lead and tin", "Copper and tin", "Aluminium and magnesium"],
    correct: "3",
    exptext: "✅ Bronze is copper with about 10 percent tin. 📌 Bronze has \"n\" for tin, brass has \"z\" for zinc. ❌ Copper and zinc make brass, not bronze."
  },
  8: {
    questext: "Consider the following statements about alloys:\n1. Duralumin is an alloy of aluminium and is used in making aeroplane parts.\n2. Wood's metal is used in making fuse plugs and automatic sprinklers.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Duralumin is light and strong, and Wood's metal melts easily, so it works in fuse plugs. 📌 Duralumin means air machines, Wood's metal means safety plugs. ❌ Choosing only one statement ignores that both facts are true."
  },
  9: {
    type: "concept", icon: "⚛️", accent: "#8b5cf6", pauseTimer: true,
    title: "Chemical Bonding",
    html: `
      <p class="cp-lead">Atoms of most elements do not have a complete outer shell of eight electrons. <u>They join with other atoms to complete it</u>, and this joining is called chemical bonding.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/6.png" alt="An atom of sodium with 1 outer electron and an atom of neon with 8 outer electrons drawn a" data-caption="Atoms bond to reach a complete, stable outer shell like neon." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/7.png" alt="A simple tree: Chemical bonding splits into Ionic (transfer), Covalent (sharing), Coordina" data-caption="The main kinds of chemical bonds and attractions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Noble gases already have a complete outer shell, so they hardly bond at all. Other atoms lose, gain or share electrons to reach eight electrons, which is called an octet. The number of electrons an atom gains, loses or shares is its valency, so bonding depends on valency.</p>
      <table><thead><tr><th>Kind of bond</th><th>How it forms</th></tr></thead><tbody><tr><td>Ionic (electrovalent)</td><td>Electrons are transferred from one atom to another</td></tr><tr><td>Covalent</td><td>Electrons are shared between two atoms</td></tr><tr><td>Coordinate (dative)</td><td>One atom provides both electrons of the shared pair</td></tr><tr><td>Hydrogen bond</td><td>Attraction between hydrogen and a very electronegative atom</td></tr><tr><td>Van der Waals forces</td><td>Weak attractions between molecules</td></tr></tbody></table>
      <div class="cp-note trap">Noble gases are unreactive because their outer shell is already complete. They do not need to gain, lose or share electrons.</div>
      <div class="cp-note exam">Remember the three words: transfer for ionic, sharing for covalent and donation for coordinate.</div>
    `
  },
  10: {
    questext: "Atoms form chemical bonds mainly to",
    options: ["achieve a complete outer shell of electrons", "increase their number of protons", "reduce their atomic mass", "change their nucleus"],
    correct: "1",
    exptext: "✅ Atoms bond to reach a stable octet in the outer shell. 📌 Bonding means completing eight. ❌ Protons and the nucleus never change in a chemical bond."
  },
  11: {
    questext: "Which group of elements does not need to form bonds because its outer shell is already complete?",
    options: ["Alkali metals", "Halogens", "Alkaline earth metals", "Noble gases"],
    correct: "4",
    exptext: "✅ Noble gases have a completely filled outer shell, so they are stable. 📌 Noble means they stay apart from others. ❌ Halogens are one electron short, so they react easily."
  },
  12: {
    type: "concept", icon: "🧂", accent: "#22c55e", pauseTimer: true,
    title: "Ionic and Covalent Bonds",
    html: `
      <p class="cp-lead">In an <b>ionic bond</b> electrons are <u>transferred</u>, and in a <b>covalent bond</b> they are <u>shared</u>. This one difference explains most of their properties.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/8.png" alt="Sodium atom giving one electron to a chlorine atom, shown as an arrow, giving Na+ and Cl- " data-caption="Sodium gives an electron to chlorine, forming an ionic bond." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/9.png" alt="Two hydrogen atoms sharing one pair of electrons in the overlap of their circles; labels H" data-caption="Two hydrogen atoms share one pair of electrons." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/10.png" alt="sodium chloride table salt crystals macro photo" data-caption="Table salt crystals, a common ionic compound." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>A covalent bond can be single, double or triple, depending on how many pairs of electrons are shared. Ionic bonds form between metals and non-metals, while covalent bonds usually join non-metal atoms.</p>
      <table><thead><tr><th>Feature</th><th>Ionic compounds</th><th>Covalent compounds</th></tr></thead><tbody><tr><td>How formed</td><td>Transfer of electrons</td><td>Sharing of electrons</td></tr><tr><td>Usually formed between</td><td>A metal and a non-metal</td><td>Non-metal atoms</td></tr><tr><td>Common state</td><td>Solids</td><td>Usually liquids or gases with low melting and boiling points</td></tr><tr><td>Electricity</td><td>Conduct when dissolved in water</td><td>Do not conduct</td></tr><tr><td>Solubility</td><td>Dissolve in water, not in organic solvents such as alcohol</td><td>Dissolve in organic solvents, not in water</td></tr><tr><td>Examples</td><td>Calcium chloride, aluminium oxide</td><td>Ethanol, ammonia, acetylene</td></tr></tbody></table>
      <div class="cp-note trap">Ionic compounds conduct electricity when dissolved in water, but covalent compounds do not conduct at all. Do not mix these two up.</div>
    `
  },
  13: {
    questext: "Consider the following statements:\n1. Covalent compounds conduct electricity well when dissolved in water.\n2. Ionic compounds are formed between metals and non-metals.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct, because ionic bonds join metals and non-metals. 📌 Ionic conducts, covalent does not. ❌ Statement 1 is wrong because covalent compounds do not conduct electricity."
  },
  14: {
    questext: "Which of the following is a covalent compound?",
    options: ["Calcium chloride", "Ethanol", "Aluminium oxide", "Sodium chloride"],
    correct: "2",
    exptext: "✅ Ethanol is formed by sharing of electrons between non-metal atoms of carbon, hydrogen and oxygen. 📌 Metal plus non-metal means ionic, so look for no metal. ❌ The other three contain a metal."
  },
  15: {
    questext: "Which pair of elements most likely forms an ionic bond?",
    options: ["Hydrogen and oxygen", "Carbon and hydrogen", "Nitrogen and hydrogen", "Sodium and chlorine"],
    correct: "4",
    exptext: "✅ Sodium is a metal and chlorine is a non-metal, so electrons are transferred. 📌 Metal plus non-metal gives ionic. ❌ The other pairs are all non-metals, so they share electrons."
  },
  16: {
    type: "concept", icon: "🤝", accent: "#ef4444", pauseTimer: true,
    title: "Coordinate (Dative) Bond",
    html: `
      <p class="cp-lead">In a coordinate bond, <u>one atom gives both electrons of the shared pair</u>. The atom that gives the pair is the <b>donor</b> and the atom that receives it is the <b>acceptor</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/11.png" alt="Ammonia molecule with a lone pair on nitrogen and an arrow going to a hydrogen ion, giving" data-caption="The nitrogen of ammonia donates a lone pair to a hydrogen ion." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/12.png" alt="Carbon monoxide drawn as C and O joined by a double line and an arrow from O to C; labels " data-caption="Carbon monoxide has covalent bonds and one coordinate bond." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The donor must already have a complete octet with at least one lone pair of electrons, and the acceptor must be short of at least one pair. A bond between two atoms is mainly ionic when their electronegativity differs a lot, and mainly covalent when it is almost the same. It is coordinate when a lone pair from one atom goes to an electron-deficient atom.</p>
      <table><thead><tr><th>Bonds present</th><th>Examples</th></tr></thead><tbody><tr><td>Ionic and covalent</td><td>Potassium cyanide (KCN), sodium hydroxide (NaOH), calcium carbonate (CaCO₃)</td></tr><tr><td>Covalent and coordinate</td><td>Carbon monoxide (CO), ozone (O₃), dinitrogen oxide (N₂O), dinitrogen trioxide (N₂O₃), nitric acid (HNO₃)</td></tr><tr><td>Ionic, covalent and coordinate</td><td>Ammonium chloride (NH₄Cl), ammonium bromide (NH₄Br)</td></tr></tbody></table>
      <div class="cp-note trap">Ammonium chloride has all three bonds. Ammonium and chloride ions are joined by an ionic bond, and inside the ammonium ion there are covalent bonds and one coordinate bond.</div>
    `
  },
  17: {
    questext: "Which compound contains ionic, covalent and coordinate bonds?",
    options: ["Ammonium chloride", "Sodium hydroxide", "Carbon monoxide", "Calcium chloride"],
    correct: "1",
    exptext: "✅ Ammonium chloride has an ionic bond between ions and covalent and coordinate bonds inside the ammonium ion. 📌 Ammonium compounds hold all three. ❌ Sodium hydroxide has only ionic and covalent bonds."
  },
  18: {
    questext: "In a coordinate bond, the atom that provides the shared pair of electrons is called the",
    options: ["acceptor", "catalyst", "donor", "anion"],
    correct: "3",
    exptext: "✅ The atom that gives the electron pair is the donor. 📌 Donor gives, acceptor accepts. ❌ The acceptor is the atom that receives the pair."
  },
  19: {
    type: "concept", icon: "💧", accent: "#14b8a6", pauseTimer: true,
    title: "Hydrogen Bond and Van der Waals Forces",
    html: `
      <p class="cp-lead">A hydrogen bond is an attraction between a hydrogen atom joined to a very electronegative atom, which is an atom that pulls electrons strongly, and another electronegative atom nearby.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/13.png" alt="Several water molecules in a zigzag line with dotted lines between the hydrogen of one mol" data-caption="Dotted lines show hydrogen bonds between water molecules." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/14.png" alt="gecko climbing glass wall toe pads photo" data-caption="A gecko clings to glass using Van der Waals forces." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Hydrogen bonds are strongest in the solid state and weakest in the gaseous state. They can form between different molecules or inside one molecule. Van der Waals forces are weak attractions between molecules, and they let a gecko hang on glass with a single toe.</p>
      <table><thead><tr><th>Feature</th><th>Between different molecules</th><th>Within one molecule</th></tr></thead><tbody><tr><td>Examples</td><td>Hydrogen fluoride, water</td><td>Ortho-nitrophenol</td></tr><tr><td>Boiling point</td><td>High</td><td>Low</td></tr><tr><td>Solubility in water</td><td>Increases</td><td>Decreases</td></tr></tbody></table>
      <div class="cp-note trap">Hydrogen bonding between molecules raises the boiling point, while hydrogen bonding inside one molecule lowers it.</div>
    `
  },
  20: {
    questext: "Hydrogen bonding between different molecules of a compound results in",
    options: ["a low boiling point and low solubility", "no change in properties", "a high boiling point and greater solubility in water", "a lower density only"],
    correct: "3",
    exptext: "✅ Bonds between molecules hold them together, so the boiling point rises and solubility in water increases. 📌 Between means high. ❌ Bonding inside one molecule gives a low boiling point."
  },
  21: {
    questext: "The ability of a gecko to climb a glass wall is attributed to",
    options: ["Van der Waals forces", "ionic bonds", "coordinate bonds", "metallic bonds"],
    correct: "1",
    exptext: "✅ Weak Van der Waals forces act between the gecko's foot pads and the surface. 📌 Gecko means weak forces everywhere. ❌ Ionic and coordinate bonds do not form between a foot and glass."
  },
  22: {
    type: "concept", icon: "🏭", accent: "#ec4899", pauseTimer: true,
    title: "Atmospheric Pollution",
    html: `
      <p class="cp-lead">Any substance that causes pollution is called a <b>pollutant</b>. Pollutants are divided into <u>primary</u> and <u>secondary</u> kinds.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/15.png" alt="factory chimney smoke air pollution photo" data-caption="Smoke from a factory chimney adds primary pollutants to the air." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/16.png" alt="A flow of three boxes: Primary pollutants: sulphur dioxide, nitrogen dioxide then an arrow" data-caption="Primary pollutants react to form secondary pollutants." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>A primary pollutant stays in the same form in which it was released, for example sulphur dioxide from burning coal. A secondary pollutant is not released directly. It forms when primary pollutants react with each other or with sunlight. The major gaseous pollutants are oxides of sulphur, nitrogen and carbon, and hydrocarbons.</p>
      <table><thead><tr><th>Kind</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Primary pollutant</td><td>Stays in the form in which it is produced</td><td>Sulphur dioxide (SO₂), nitrogen dioxide (NO₂)</td></tr><tr><td>Secondary pollutant</td><td>Formed by reactions of primary pollutants</td><td>Peroxyacetyl nitrate, ozone (O₃), aldehydes</td></tr></tbody></table>
      <div class="cp-note trap">Ozone near the ground is a harmful secondary pollutant, but ozone high in the stratosphere protects life.</div>
      <div class="cp-note exam">Peroxyacetyl nitrate is the secondary pollutant that most often appears in questions.</div>
    `
  },
  23: {
    questext: "Which of the following is a secondary pollutant?",
    options: ["Sulphur dioxide", "Nitrogen dioxide", "Carbon monoxide", "Peroxyacetyl nitrate"],
    correct: "4",
    exptext: "✅ Peroxyacetyl nitrate forms from reactions of primary pollutants, so it is secondary. 📌 Secondary means made later. ❌ Sulphur dioxide is released directly, so it is a primary pollutant."
  },
  24: {
    questext: "Primary pollutants are those that",
    options: ["form only from reactions in sunlight", "stay in the environment in the form in which they are produced", "occur only in water", "exist only in the stratosphere"],
    correct: "2",
    exptext: "✅ Primary pollutants persist in the form in which they are released. 📌 Primary means first and unchanged. ❌ Pollutants formed by reactions in sunlight are secondary."
  },
  25: {
    type: "concept", icon: "☁️", accent: "#3b82f6", pauseTimer: true,
    title: "Major Gaseous Air Pollutants",
    html: `
      <p class="cp-lead">Four groups of gases cause most air pollution: <u>sulphur dioxide, oxides of nitrogen, carbon monoxide and hydrocarbons</u>. Each harms living things in its own way.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/17.png" alt="Taj Mahal marble yellowing air pollution photo" data-caption="Marble monuments such as the Taj Mahal are damaged by acidic gases." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/18.png" alt="A red blood cell showing haemoglobin with carbon monoxide attached; labels Haemoglobin, CO" data-caption="Carbon monoxide blocks haemoglobin from carrying oxygen." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Sulphur dioxide turns into sulphur trioxide in air, which reacts with water to give sulphuric acid. Nitric oxide is a colourless, odourless gas, while nitrogen dioxide is a brown gas with a pungent smell. Carbon monoxide forms a very stable compound with haemoglobin, so the blood cannot deliver oxygen to the tissues.</p>
      <table><thead><tr><th>Pollutant</th><th>Main harm</th></tr></thead><tbody><tr><td>Sulphur dioxide (SO₂)</td><td>Causes bronchitis, asthma and chlorosis in plants, damages buildings and marble, and forms acid rain</td></tr><tr><td>Nitrogen dioxide (NO₂)</td><td>Brown pungent gas that causes leaf fall and helps form smog and nitric acid</td></tr><tr><td>Carbon monoxide (CO)</td><td>Forms carboxyhaemoglobin and blocks the delivery of oxygen</td></tr><tr><td>Methane (CH₄)</td><td>The most abundant hydrocarbon pollutant; higher amounts can cause cancer</td></tr></tbody></table>
      <div class="cp-note trap">Chlorosis means yellowing of leaves because less chlorophyll forms. Sulphur dioxide causes it.</div>
    `
  },
  26: {
    questext: "Carbon monoxide is poisonous because it",
    options: ["dissolves in blood plasma and makes it acidic", "combines with haemoglobin and blocks the delivery of oxygen", "destroys white blood cells", "reacts with nitrogen in the lungs"],
    correct: "2",
    exptext: "✅ Carbon monoxide forms a stable complex with haemoglobin, so oxygen cannot reach the tissues. 📌 Carbon monoxide steals the oxygen seat. ❌ It does not affect plasma or white blood cells."
  },
  27: {
    questext: "Which gas is mainly responsible for damage to marble monuments such as the Taj Mahal?",
    options: ["Carbon monoxide", "Methane", "Nitrogen", "Sulphur dioxide"],
    correct: "4",
    exptext: "✅ Sulphur dioxide forms sulphuric acid, which corrodes marble. 📌 Marble melts in sulphur acid rain. ❌ Methane and nitrogen do not form acids that attack marble."
  },
  28: {
    type: "concept", icon: "🌍", accent: "#f97316", pauseTimer: true,
    title: "Greenhouse Effect, Global Warming and Acid Rain",
    html: `
      <p class="cp-lead">Some gases in the air trap heat from the Earth, like the glass of a greenhouse. <u>This keeps Earth warm enough for life, but too much of it causes global warming.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/19.png" alt="Sun rays hitting the Earth, infrared heat rising and some bouncing back from a layer label" data-caption="Greenhouse gases trap heat radiated from the Earth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/20.png" alt="A chimney and a vehicle releasing sulphur and nitrogen oxides, rising into a cloud and fal" data-caption="Oxides of sulphur and nitrogen turn into acids and fall as acid rain." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/21.png" alt="forest trees damaged by acid rain photo" data-caption="Trees damaged by acid rain lose their leaves." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The heating of the Earth because greenhouse gases trap infrared radiation is called the greenhouse effect. Without it, the Earth would be extremely cold. When the amount of these gases rises, the effect becomes stronger, and this is global warming. Acid rain forms when oxides of nitrogen and sulphur dissolve in rain water to make nitric acid and sulphuric acid.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Greenhouse gases</td><td>Carbon dioxide, methane and water vapour</td></tr><tr><td>Greenhouse effect</td><td>Heating of the Earth because gases trap infrared radiation</td></tr><tr><td>Global warming</td><td>Increase in the greenhouse effect as these gases increase</td></tr><tr><td>Acid rain</td><td>Rain carrying nitric and sulphuric acids, with pH below 5.6</td></tr></tbody></table>
      <div class="cp-note trap">The greenhouse effect itself is not harmful. It is essential for life, and only its increase is called global warming.</div>
    `
  },
  29: {
    questext: "Which of the following is a greenhouse gas?",
    options: ["Methane", "Argon", "Helium", "Neon"],
    correct: "1",
    exptext: "✅ Methane traps heat radiated from the Earth. 📌 The main three are carbon dioxide, methane and water vapour. ❌ Argon, helium and neon are noble gases and do not trap heat in this way."
  },
  30: {
    questext: "Consider the following statements:\n1. The greenhouse effect is essential for the existence of life on Earth.\n2. Acid rain is caused by oxides of nitrogen and sulphur.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. Without the greenhouse effect Earth would be extremely cold, and acid rain comes from nitrogen and sulphur oxides. 📌 Heat trapping is good, extra heat is bad. ❌ Choosing only one misses a true fact."
  },
  31: {
    questext: "Rain is called acid rain when its pH is",
    options: ["between 6 and 7", "exactly 7", "less than 5.6", "greater than 8"],
    correct: "3",
    exptext: "✅ Rain with pH below 5.6 is called acid rain. 📌 Pure rain is slightly acidic at 5.6. ❌ A pH of 7 is neutral, and above 7 is basic."
  },
  32: {
    type: "concept", icon: "😷", accent: "#84cc16", pauseTimer: true,
    title: "Particulates and Smog",
    html: `
      <p class="cp-lead">Tiny solid dust particles in the air are called <b>particulates</b>. Breathing different dusts causes different lung diseases, and smoke mixed with fog forms <b>smog</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/22.png" alt="heavy smog covering Delhi city morning photo" data-caption="Heavy smog covering the city of Delhi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/23.png" alt="Two panels. Left: Classical smog with labels Cool, humid weather and Sulphur dioxide and p" data-caption="Classical smog and photochemical smog form in different weather." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Photochemical smog forms when sunlight acts on nitrogen oxides and hydrocarbons. It contains secondary pollutants such as ozone, formaldehyde and peroxyacetyl nitrate. These irritate the eyes, and peroxyacetyl nitrate attacks young leaves of plants.</p>
      <table><thead><tr><th>Item</th><th>Cause or condition</th></tr></thead><tbody><tr><td>Pneumoconiosis</td><td>Breathing coal dust</td></tr><tr><td>Silicosis</td><td>Breathing free silica (SiO₂) dust</td></tr><tr><td>Black lung disease</td><td>Found in coal mine workers</td></tr><tr><td>Byssinosis</td><td>Breathing cotton fibre dust</td></tr><tr><td>Asbestosis</td><td>Breathing asbestos fibres</td></tr><tr><td>Classical smog</td><td>Cool, humid weather; sulphur dioxide and particles from fuel burning</td></tr><tr><td>Photochemical smog</td><td>Warm, dry, sunny weather; nitrogen oxides, ozone, formaldehyde</td></tr></tbody></table>
      <div class="cp-note trap">Classical smog has sulphur dioxide and forms in cool weather. Photochemical smog needs sunlight.</div>
    `
  },
  33: {
    questext: "Silicosis is caused by inhaling",
    options: ["free silica dust", "cotton fibre dust", "lead fumes", "asbestos fibres"],
    correct: "1",
    exptext: "✅ Silicosis comes from breathing free silica dust. 📌 Silicosis has silica in its name. ❌ Cotton dust causes byssinosis and asbestos fibres cause asbestosis."
  },
  34: {
    questext: "Photochemical smog is formed in",
    options: ["cool, humid weather with sulphur dioxide", "cold and dark winter nights", "rainy weather with acid rain", "warm, dry and sunny weather"],
    correct: "4",
    exptext: "✅ Photochemical smog needs sunlight and forms in warm, dry, sunny weather. 📌 Photo means light. ❌ Cool humid smog with sulphur dioxide is classical smog."
  },
  35: {
    type: "concept", icon: "🛡️", accent: "#06b6d4", pauseTimer: true,
    title: "Ozone Layer Depletion",
    html: `
      <p class="cp-lead">The ozone layer in the stratosphere <u>absorbs the harmful ultraviolet radiation of the Sun</u>. When chemicals destroy it, living things get more ultraviolet rays.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/24.png" alt="NASA Antarctic ozone hole satellite image" data-caption="Satellite image showing the ozone hole over Antarctica." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/25.png" alt="Layers of the atmosphere with a band labelled Ozone layer in the stratosphere absorbing ar" data-caption="The ozone layer absorbs ultraviolet rays." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/26.png" alt="A molecule labelled Chlorofluorocarbon releasing a Chlorine atom that breaks an Ozone mole" data-caption="Chlorine from chlorofluorocarbons breaks down ozone." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The main cause of ozone depletion is chlorofluorocarbons, which are used in refrigeration, fire extinguishers and aerosol sprays. The ozone hole has mainly been seen over Antarctica, where special clouds called Polar Stratospheric Clouds help chlorofluorocarbons destroy ozone. Depletion causes skin cancer and cataract in humans and reduces plankton in the ocean.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Layer protects against</td><td>Ultraviolet radiation of the Sun</td></tr><tr><td>Main destroying chemicals</td><td>Chlorofluorocarbons</td></tr><tr><td>Where the hole is seen</td><td>Stratosphere above Antarctica</td></tr><tr><td>Special clouds involved</td><td>Polar Stratospheric Clouds</td></tr><tr><td>Harm to humans</td><td>Skin cancer and cataract</td></tr></tbody></table>
      <div class="cp-note trap">The ozone layer is in the stratosphere, not in the troposphere where we live and where weather happens.</div>
    `
  },
  36: {
    questext: "Depletion of the ozone layer is mainly caused by",
    options: ["carbon monoxide", "chlorofluorocarbons", "methane", "sulphur dioxide"],
    correct: "2",
    exptext: "✅ Chlorofluorocarbons release chlorine, which breaks down ozone. 📌 Chlorine eats ozone. ❌ Carbon monoxide and sulphur dioxide cause poisoning and acid rain, not ozone loss."
  },
  37: {
    questext: "Consider the following statements:\n1. The ozone hole has mainly been observed in the troposphere above the Arctic.\n2. Depletion of the ozone layer can cause skin cancer and cataract.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct, because more ultraviolet rays harm the skin and eyes. 📌 The hole is in the stratosphere over Antarctica. ❌ Statement 1 is wrong about both the layer and the place."
  },
  38: {
    questext: "The ozone layer lies in which layer of the atmosphere?",
    options: ["Troposphere", "Mesosphere", "Thermosphere", "Stratosphere"],
    correct: "4",
    exptext: "✅ The ozone layer is in the stratosphere. 📌 Ozone is stratosphere, weather is troposphere. ❌ The troposphere is the lowest layer, where weather happens."
  },
  39: {
    type: "concept", icon: "🚰", accent: "#a855f7", pauseTimer: true,
    title: "Water Pollution: Dissolved Oxygen and Oxygen Demand",
    html: `
      <p class="cp-lead">Healthy water needs enough dissolved oxygen for fishes. <u>Biochemical Oxygen Demand and Chemical Oxygen Demand show how polluted water is.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/27.png" alt="A lake scene with a scale: Dissolved oxygen 5 to 6 parts per million: healthy fishes and B" data-caption="Fishes need five to six parts per million of dissolved oxygen." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/28.png" alt="sewage waste flowing into river pollution photo" data-caption="Waste flowing into a river lowers its oxygen level." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-formula" translate="no"><small>Biochemical Oxygen Demand (BOD)</small>BOD = Oxygen required (in mg) ÷ Volume of water sample (in litre)</div>
      <p>Microbes use oxygen to break down organic waste. The more waste there is, the more oxygen they need, so the demand rises. In some parts of India, drinking water is also polluted by arsenic, fluoride and uranium.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th><th>Important value</th></tr></thead><tbody><tr><td>Dissolved oxygen</td><td>Oxygen dissolved in water</td><td>5 to 6 parts per million is best; below 5 stops fish growth</td></tr><tr><td>Biochemical Oxygen Demand</td><td>Oxygen that microbes need to break down organic matter in water</td><td>Clean water below 5 parts per million; highly polluted water 17 or more</td></tr><tr><td>Chemical Oxygen Demand</td><td>Total oxygen used by all pollutants in the water</td><td>Measured in parts per million</td></tr></tbody></table>
      <div class="cp-note trap">A higher Biochemical Oxygen Demand means more pollution and less oxygen left for fishes.</div>
    `
  },
  40: {
    questext: "A higher Biochemical Oxygen Demand in a water sample indicates",
    options: ["greater pollution by organic matter", "cleaner water", "more dissolved oxygen", "harder water"],
    correct: "1",
    exptext: "✅ A high demand means a lot of organic waste is being broken down by microbes. 📌 High demand means high pollution. ❌ Clean water has low demand and more dissolved oxygen."
  },
  41: {
    questext: "For healthy aquatic life, the best value of dissolved oxygen in water is",
    options: ["1 to 2 parts per million", "10 to 12 parts per million", "5 to 6 parts per million", "15 to 20 parts per million"],
    correct: "3",
    exptext: "✅ Five to six parts per million is best for fishes. 📌 Below five, fish growth stops. ❌ One to two is far too low for fishes."
  },
  42: {
    questext: "The Biochemical Oxygen Demand of highly polluted water is",
    options: ["less than 5 parts per million", "zero", "17 parts per million or more", "1 part per million"],
    correct: "3",
    exptext: "✅ Highly polluted water has a demand of 17 parts per million or more. 📌 Clean is below 5, dirty is 17 plus. ❌ Less than 5 is the value for clean water."
  },
  43: {
    type: "concept", icon: "🎈", accent: "#e11d48", pauseTimer: true,
    title: "Properties of Gases",
    html: `
      <p class="cp-lead">A gas has <u>no fixed shape and no fixed volume</u>. It spreads to fill any container because its particles move freely with large spaces between them.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/29.png" alt="Three boxes: a solid with tightly packed particles, a liquid with close but loose particle" data-caption="Gas particles are far apart and move quickly." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/30.png" alt="A container with gas particles hitting the walls with small arrows; label Pressure: partic" data-caption="Gas pressure comes from particles striking the container walls." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Gases have very low densities compared with solids and liquids, and all gases expand equally for an equal rise in temperature. Because there is so much empty space between the particles, a gas can be compressed by pressure.</p>
      <table><thead><tr><th>Property</th><th>Meaning</th></tr></thead><tbody><tr><td>Diffusion</td><td>Mixing of one gas with another because of the motion of molecules</td></tr><tr><td>Pressure</td><td>Caused by gas molecules striking the walls of the container</td></tr><tr><td>Compressibility</td><td>The volume can be reduced greatly because of the large spaces between particles</td></tr><tr><td>Temperature</td><td>A measure of the average kinetic energy of the particles</td></tr></tbody></table>
      <div class="cp-note trap">Temperature does not depend on the number of particles or on the size or shape of the object.</div>
    `
  },
  44: {
    questext: "The pressure of a gas is caused by",
    options: ["molecules striking the walls of the container", "the weight of the container", "molecules sticking to one another", "the colour of the gas"],
    correct: "1",
    exptext: "✅ Gas molecules move constantly and strike the walls, which creates pressure. 📌 Pressure means hits on the wall. ❌ Sticking together is not what makes pressure."
  },
  45: {
    questext: "The mixing of one gas with another because of molecular motion is called",
    options: ["condensation", "sublimation", "compression", "diffusion"],
    correct: "4",
    exptext: "✅ Diffusion is the mixing of gases because molecules keep moving. 📌 Diffusion means spreading. ❌ Compression only squeezes a gas into a smaller volume."
  },
  46: {
    type: "concept", icon: "📐", accent: "#10b981", pauseTimer: true,
    title: "Gas Laws and the Ideal Gas Equation",
    html: `
      <p class="cp-lead">Gas laws tell how the <u>volume, pressure and temperature</u> of a gas are related. Each law keeps one of them constant.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/31.png" alt="Two cylinders with a piston. Left: low pressure, large volume. Right: high pressure, small" data-caption="Boyle's law: more pressure gives less volume at the same temperature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/32.png" alt="A small balloon labelled Cold: small volume and a bigger balloon labelled Hot: large volum" data-caption="Charles's law: a heated gas expands at constant pressure." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-formula" translate="no"><small>Ideal gas equation</small>PV = nRT</div>
      <table><thead><tr><th>Law</th><th>Statement</th><th>Kept constant</th></tr></thead><tbody><tr><td>Boyle's law</td><td>Pressure × volume is constant for a given mass of gas</td><td>Temperature</td></tr><tr><td>Charles's law</td><td>Volume increases by 1/273 of its volume at 0 °C for each degree Celsius rise</td><td>Pressure</td></tr><tr><td>Pressure law</td><td>Pressure increases by 1/273 of its pressure at 0 °C for each degree Celsius rise</td><td>Volume</td></tr><tr><td>Avogadro's law</td><td>Equal volumes of gases contain equal numbers of molecules</td><td>Temperature and pressure</td></tr><tr><td>Gay-Lussac's law</td><td>Gases react in volumes that have a simple ratio</td><td>Temperature and pressure</td></tr></tbody></table>
      <p>Avogadro number is 6.022 × 10²³. In PV = nRT, P is pressure, V is volume, n is the number of moles and T is temperature. An ideal gas is an imaginary gas that follows the gas laws perfectly, and no real gas is ideal.</p>
      <div class="cp-note trap">Boyle's law is at constant temperature and Charles's law is at constant pressure. Exchanging them is a common mistake.</div>
    `
  },
  47: {
    questext: "Boyle's law states that at constant temperature",
    options: ["the volume of a gas is directly proportional to its pressure", "the product of pressure and volume of a given mass of gas is constant", "the pressure of a gas is always zero", "the volume depends only on the kind of gas"],
    correct: "2",
    exptext: "✅ Pressure multiplied by volume stays constant, so more pressure means less volume. 📌 Boyle means opposite change. ❌ Volume is not directly proportional to pressure in this law."
  },
  48: {
    questext: "The value of Avogadro number is approximately",
    options: ["6.022 × 10²²", "6.022 × 10²³", "6.022 × 10²⁴", "3.011 × 10²³"],
    correct: "2",
    exptext: "✅ Avogadro number is 6.022 × 10²³, the number of molecules in one mole. 📌 Remember 6.022 and power 23. ❌ The other values have wrong powers or digits."
  },
  49: {
    questext: "In the ideal gas equation PV = nRT, the letter n stands for",
    options: ["the number of atoms", "the number of electrons", "the nuclear charge", "the number of moles"],
    correct: "4",
    exptext: "✅ The letter n is the number of moles of the gas. 📌 n for number of moles. ❌ It does not count atoms or electrons."
  },
  50: {
    questext: "Consider the following statements:\n1. Equal volumes of all gases at the same temperature and pressure contain equal numbers of molecules.\n2. Charles's law is stated at constant temperature.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, and it is Avogadro's law. 📌 Charles keeps pressure constant. ❌ Statement 2 is wrong because Charles's law is at constant pressure, not temperature."
  },
  51: {
    type: "concept", icon: "🧪", accent: "#eab308", pauseTimer: true,
    title: "Organic Chemistry",
    html: `
      <p class="cp-lead">Organic chemistry is the study of <u>hydrocarbons and their derivatives</u>. Carbon atoms can join in long chains, so they form a huge number of compounds.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/33.png" alt="Friedrich Wöhler portrait chemist" data-caption="Friedrich Wöhler, who made urea in a laboratory in 1828." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/34.png" alt="Two molecule sketches: Ethanol C2H5OH and Dimethyl ether CH3OCH3, both under the label Sam" data-caption="Ethanol and dimethyl ether are isomers with the same formula." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Urea was the first organic compound prepared in a laboratory. Friedrich Wöhler made it in 1828 from an inorganic compound, ammonium cyanate. Acetic acid was the first organic compound made from its elements, by Hermann Kolbe.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Functional group</td><td>An atom or group of atoms that decides the chemical properties of a molecule, for example OH in alcohols</td></tr><tr><td>Isomers</td><td>Compounds with the same molecular formula but different structures</td></tr><tr><td>Example of isomers</td><td>Ethanol (C₂H₅OH) and dimethyl ether (CH₃OCH₃)</td></tr><tr><td>First organic compound made in a laboratory</td><td>Urea, by Wöhler in 1828</td></tr></tbody></table>
      <div class="cp-note trap">Wöhler made urea and Kolbe made acetic acid. Do not swap the two names.</div>
    `
  },
  52: {
    questext: "Who prepared urea from ammonium cyanate in a laboratory?",
    options: ["Kolbe", "Faraday", "Wöhler", "Lavoisier"],
    correct: "3",
    exptext: "✅ Friedrich Wöhler prepared urea in 1828. 📌 Wöhler made urea, the first organic compound. ❌ Kolbe made acetic acid from its elements."
  },
  53: {
    questext: "Compounds that have the same molecular formula but different structures are called",
    options: ["isotopes", "isobars", "isomers", "isotones"],
    correct: "3",
    exptext: "✅ Isomers share the molecular formula but differ in structure, like ethanol and dimethyl ether. 📌 Isomers means same formula. ❌ Isotopes and isobars are about atoms, not molecules."
  },
  54: {
    questext: "Acetic acid was first made from its elements by",
    options: ["Kolbe", "Dalton", "Proust", "Rutherford"],
    correct: "1",
    exptext: "✅ Hermann Kolbe made acetic acid from its elements. 📌 Kolbe means acetic acid. ❌ Dalton, Proust and Rutherford worked on atoms and laws of combination."
  },
  55: {
    type: "concept", icon: "⛓️", accent: "#d946ef", pauseTimer: true,
    title: "Hydrocarbons",
    html: `
      <p class="cp-lead">Hydrocarbons are compounds made of <u>only carbon and hydrogen</u>. They are grouped by the kind of bonds between carbon atoms.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/35.png" alt="Three stick models: methane CH4 with single bonds, ethene C2H4 with a double bond, ethyne " data-caption="Alkanes, alkenes and alkynes differ in the carbon bond." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/36.png" alt="A hexagon ring with alternate double bonds; labels Benzene C6H6, Ring with alternate doubl" data-caption="Benzene is the simplest aromatic hydrocarbon, with a six-carbon ring." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Saturated hydrocarbons have only single bonds. Unsaturated hydrocarbons have at least one double or triple bond. The first member of the alkane family is methane.</p>
      <table><thead><tr><th>Type</th><th>Bonds</th><th>General formula</th><th>Example</th></tr></thead><tbody><tr><td>Alkanes (paraffins)</td><td>Only single bonds</td><td>CₙH₂ₙ₊₂</td><td>Methane</td></tr><tr><td>Alkenes</td><td>At least one double bond</td><td>CₙH₂ₙ</td><td>Ethene</td></tr><tr><td>Alkynes</td><td>At least one triple bond</td><td>CₙH₂ₙ₋₂</td><td>Ethyne (acetylene)</td></tr><tr><td>Aromatic</td><td>Ring with alternate double bonds</td><td>(4n + 2) π electrons (Hückel's rule)</td><td>Benzene</td></tr></tbody></table>
      <div class="cp-mnemonic">Single bond is "ane", double bond is "ene", triple bond is "yne".</div>
      <div class="cp-note trap">Saturated means only single bonds. Alkenes and alkynes are unsaturated.</div>
    `
  },
  56: {
    questext: "The general formula of alkynes is",
    options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙHₙ", "CₙH₂ₙ₋₂"],
    correct: "4",
    exptext: "✅ Alkynes have a triple bond and the formula CₙH₂ₙ₋₂. 📌 Alkane plus two, alkene plain, alkyne minus two. ❌ CₙH₂ₙ₊₂ is the formula of alkanes."
  },
  57: {
    questext: "Saturated hydrocarbons are also called",
    options: ["alkenes", "alkanes", "alkynes", "aromatic compounds"],
    correct: "2",
    exptext: "✅ Saturated hydrocarbons have only single bonds and are called alkanes or paraffins. 📌 Alkane means all single. ❌ Alkenes and alkynes have double or triple bonds."
  },
  58: {
    questext: "Which of the following is the simplest aromatic hydrocarbon?",
    options: ["Methane", "Benzene", "Ethene", "Ethyne"],
    correct: "2",
    exptext: "✅ Benzene, with a ring of six carbon atoms, is the simplest aromatic hydrocarbon. 📌 Aromatic means ring. ❌ Methane, ethene and ethyne have no ring."
  },
  59: {
    type: "concept", icon: "🔥", accent: "#64748b", pauseTimer: true,
    title: "Important Hydrocarbons and Their Uses",
    html: `
      <p class="cp-lead">Some simple hydrocarbons are useful fuels and raw materials. <u>Remember one key fact about each.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/37.png" alt="LPG cylinder gas stove blue flame photo" data-caption="A kitchen gas cylinder, which mainly contains butane." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/38.png" alt="naphthalene balls mothballs photo" data-caption="Naphthalene balls keep moths away from clothes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/39.png" alt="A simple biogas plant: a tank of waste, a dome labelled Methane gas and a pipe to a stove;" data-caption="Methane forms when waste decays without oxygen." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Methane forms when plant and animal matter decays without oxygen. Natural gas contains about 90 percent methane along with ethane, propane and butane. Rice fields are also a large source of methane.</p>
      <table><thead><tr><th>Name</th><th>Formula</th><th>Key fact</th></tr></thead><tbody><tr><td>Methane</td><td>CH₄</td><td>Marsh gas; causes explosions in mines; main part of natural gas and biogas</td></tr><tr><td>Ethane</td><td>C₂H₆</td><td>About 10 percent of natural gas; its derivative hexachloroethane (C₂Cl₆) is artificial camphor</td></tr><tr><td>Butane</td><td>C₄H₁₀</td><td>Main part of liquefied petroleum gas</td></tr><tr><td>Ethylene</td><td>C₂H₄</td><td>Ripens green fruits artificially; used to make mustard gas in World War I</td></tr><tr><td>Acetylene</td><td>C₂H₂</td><td>Also called ethyne, the simplest alkyne</td></tr><tr><td>Benzene</td><td>C₆H₆</td><td>Simplest aromatic hydrocarbon; discovered by Faraday in 1825; motor fuel called benzol</td></tr><tr><td>Toluene</td><td>C₆H₅CH₃</td><td>Solvent; used to make the explosive trinitrotoluene, saccharin and printing inks</td></tr><tr><td>Naphthalene</td><td>C₁₀H₈</td><td>Keeps moths away from clothes</td></tr></tbody></table>
      <div class="cp-note trap">Butane is the main part of liquefied petroleum gas, and methane is the main part of natural gas and biogas. Do not swap them.</div>
    `
  },
  60: {
    questext: "Which hydrocarbon is the main constituent of liquefied petroleum gas?",
    options: ["Methane", "Ethane", "Ethylene", "Butane"],
    correct: "4",
    exptext: "✅ Butane is the main part of the gas in kitchen cylinders. 📌 Butane in the cylinder. ❌ Methane is the main part of natural gas."
  },
  61: {
    questext: "Marsh gas is",
    options: ["methane", "ethane", "acetylene", "benzene"],
    correct: "1",
    exptext: "✅ Methane forms in marshes when plants decay, so it is called marsh gas. 📌 Marsh means methane. ❌ Acetylene is ethyne, not marsh gas."
  },
  62: {
    questext: "Which gas is used for the artificial ripening of green fruits?",
    options: ["Methane", "Butane", "Ethylene", "Benzene"],
    correct: "3",
    exptext: "✅ Ethylene is used for the artificial ripening of green fruits. 📌 Ethylene means ripening. ❌ Methane is a fuel gas and benzene is a liquid solvent."
  },
  63: {
    type: "concept", icon: "🧴", accent: "#fb7185", pauseTimer: true,
    title: "Halogen Derivatives of Hydrocarbons",
    html: `
      <p class="cp-lead">When hydrogen atoms in a hydrocarbon are replaced by halogen atoms such as chlorine or iodine, we get halogen derivatives. <u>Several are famous for their uses and dangers.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/40.png" alt="chloroform dark brown glass bottle photo" data-caption="Chloroform is stored in dark bottles filled completely." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/41.png" alt="Three boxes: Chloroform CHCl3: anaesthetic, Iodoform CHI3: antiseptic, Carbon tetrachlorid" data-caption="Three halogen derivatives and their main uses." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/42.png" alt="DDT insecticide spraying old photograph" data-caption="DDT was once widely sprayed as an insecticide." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>In air and sunlight, chloroform slowly turns into a very poisonous gas called phosgene, so it is kept in closed, dark coloured bottles filled to the top. Sir James Young Simpson was the first to use it as an anaesthetic. Iodoform is an antiseptic because it releases free iodine.</p>
      <table><thead><tr><th>Name</th><th>Formula</th><th>Key fact</th></tr></thead><tbody><tr><td>Chloroform</td><td>CHCl₃</td><td>Forms phosgene in air and light; main use now is to make the refrigerant Freon R-22</td></tr><tr><td>Chloropicrin</td><td>CCl₃NO₂</td><td>Made from chloroform and concentrated nitric acid; an insecticide and a war gas</td></tr><tr><td>Iodoform</td><td>CHI₃</td><td>Antiseptic because it liberates free iodine</td></tr><tr><td>Carbon tetrachloride</td><td>CCl₄</td><td>Used in fire extinguishers under the name pyrene</td></tr><tr><td>DDT</td><td>Dichlorodiphenyltrichloroethane</td><td>First chlorinated organic insecticide, prepared in 1873</td></tr></tbody></table>
      <div class="cp-note trap">Phosgene is the poisonous gas formed from chloroform, and chloropicrin is formed when chloroform reacts with nitric acid.</div>
    `
  },
  64: {
    questext: "Why is chloroform kept in closed, dark coloured bottles filled completely?",
    options: ["It evaporates in the dark", "It freezes in sunlight", "In air and sunlight it forms the poisonous gas phosgene", "It reacts with glass to form salts"],
    correct: "3",
    exptext: "✅ Air and sunlight oxidise chloroform into poisonous phosgene. 📌 Dark and full means no air or light. ❌ Chloroform does not freeze in sunlight."
  },
  65: {
    questext: "Which compound is used as an antiseptic because it liberates free iodine?",
    options: ["Iodoform", "Chloroform", "Carbon tetrachloride", "DDT"],
    correct: "1",
    exptext: "✅ Iodoform releases free iodine, which kills germs. 📌 Iodoform has iodine in its name. ❌ Carbon tetrachloride is used in fire extinguishers."
  },
  66: {
    questext: "The first chlorinated organic insecticide was",
    options: ["Malathion", "Pyrene", "Freon", "DDT"],
    correct: "4",
    exptext: "✅ DDT was the first chlorinated organic insecticide and was prepared in 1873. 📌 DDT is the oldest chlorine insecticide. ❌ Pyrene is carbon tetrachloride, and Freon is a refrigerant."
  },
  67: {
    type: "concept", icon: "🍶", accent: "#2dd4bf", pauseTimer: true,
    title: "Alcohols, Phenol and Methyl Isocyanate",
    html: `
      <p class="cp-lead">Alcohols contain the <u>OH group</u>. Methyl alcohol is poisonous, ethyl alcohol is the alcohol of drinks, and glycerol has three OH groups.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/43.png" alt="Three structural sketches: Methanol CH3OH, Ethanol C2H5OH, Glycerol CH2OH-CHOH-CH2OH with " data-caption="Methanol and ethanol have one OH group, glycerol has three." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/44.png" alt="Bhopal gas tragedy memorial statue photo" data-caption="Memorial in Bhopal for the victims of the 1984 gas leak." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Methyl alcohol, also called wood spirit, is poisonous and can cause blindness or even death if taken internally. It is used to make denatured alcohol, which is ethyl alcohol made undrinkable. Ethyl alcohol is called spirit of wine or grain alcohol.</p>
      <table><thead><tr><th>Name</th><th>Formula</th><th>Key fact</th></tr></thead><tbody><tr><td>Methyl alcohol</td><td>CH₃OH</td><td>Wood spirit; poisonous; used for denaturing ethyl alcohol</td></tr><tr><td>Ethyl alcohol</td><td>C₂H₅OH</td><td>Spirit of wine and grain alcohol</td></tr><tr><td>Glycerol</td><td>CH₂OH·CHOH·CH₂OH</td><td>Trihydric alcohol; sweet and absorbs moisture from air; used in cosmetics and transparent soaps</td></tr><tr><td>Phenol</td><td>C₆H₅OH</td><td>Carbolic acid; a monohydric benzene derivative</td></tr><tr><td>Methyl isocyanate</td><td>CH₃NCO</td><td>Its leak caused the Bhopal gas tragedy of 1984</td></tr></tbody></table>
      <div class="cp-note trap">Methyl alcohol and ethyl alcohol look alike but only methyl alcohol causes blindness.</div>
    `
  },
  68: {
    questext: "Methyl alcohol is also known as",
    options: ["spirit of wine", "wood spirit", "grain alcohol", "carbolic acid"],
    correct: "2",
    exptext: "✅ Methyl alcohol is also called wood spirit. 📌 Wood means methyl. ❌ Spirit of wine and grain alcohol are names of ethyl alcohol."
  },
  69: {
    questext: "The gas responsible for the Bhopal gas tragedy was",
    options: ["phosgene", "methyl isocyanate", "chlorine", "methane"],
    correct: "2",
    exptext: "✅ Leakage of methyl isocyanate caused the Bhopal gas tragedy. 📌 Bhopal means methyl isocyanate. ❌ Phosgene is formed from chloroform, not the Bhopal gas."
  },
  70: {
    questext: "Phenol is commonly known as",
    options: ["wood spirit", "glycerine", "spirit of wine", "carbolic acid"],
    correct: "4",
    exptext: "✅ Phenol is commonly called carbolic acid. 📌 Phenol means carbolic. ❌ Glycerine is a different alcohol with three OH groups."
  },
  71: {
    type: "concept", icon: "⛏️", accent: "#65a30d", pauseTimer: true,
    title: "Coal",
    html: `
      <p class="cp-lead">Coal formed from buried plants by a very slow process called carbonisation. <u>The more carbon it has, the better the coal.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/45.png" alt="anthracite bituminous lignite peat coal types comparison photo" data-caption="Peat, lignite, bituminous coal and anthracite show rising carbon content." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/46.png" alt="A bar chart of carbon content: Peat 10 to 15, Lignite 40, Bituminous 70, Anthracite 90 per" data-caption="Carbon content rises from peat to anthracite." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/47.png" alt="A closed flask of coal heated with a burner; three outputs labelled Coke, Coal tar, Coal g" data-caption="Heating coal without air gives coke, coal tar and coal gas." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>When coal is heated strongly between 1270 and 1675 kelvin in the absence of air, it breaks down into useful products. Coke is the solid residue. Coal tar is a mixture of about 700 substances. Bitumen, a petroleum product, now replaces coal tar for metalling roads. Indian coal has high ash content and low sulphur content.</p>
      <table><thead><tr><th>Type of coal</th><th>Carbon content</th></tr></thead><tbody><tr><td>Anthracite</td><td>About 90 percent (best)</td></tr><tr><td>Bituminous</td><td>About 70 percent</td></tr><tr><td>Lignite</td><td>About 40 percent</td></tr><tr><td>Peat</td><td>10 to 15 percent (lowest)</td></tr></tbody></table>
      <div class="cp-note trap">Peat is the first stage and has the least carbon. Anthracite has the most carbon.</div>
    `
  },
  72: {
    questext: "Which variety of coal has the highest carbon content?",
    options: ["Anthracite", "Bituminous", "Lignite", "Peat"],
    correct: "1",
    exptext: "✅ Anthracite has about 90 percent carbon. 📌 Anthracite is the top grade. ❌ Peat has only 10 to 15 percent carbon."
  },
  73: {
    questext: "The solid residue left after the destructive distillation of coal is",
    options: ["coal tar", "bitumen", "coke", "producer gas"],
    correct: "3",
    exptext: "✅ Coke is the solid residue left after coal is heated in the absence of air. 📌 Coke is what stays behind. ❌ Coal tar is a liquid mixture."
  },
  74: {
    questext: "Consider the following statements:\n1. Peat has the lowest carbon content among the varieties of coal.\n2. Indian coal has high ash content and low sulphur content.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. Peat has 10 to 15 percent carbon, and Indian coal is high in ash but low in sulphur. 📌 Peat is the youngest and lowest. ❌ Choosing only one misses a true fact."
  },
  75: {
    type: "concept", icon: "🛢️", accent: "#0891b2", pauseTimer: true,
    title: "Petroleum, Knocking and Octane Number",
    html: `
      <p class="cp-lead">Crude petroleum is separated into useful parts by a process called <b>refining</b>. <u>Good petrol burns smoothly in an engine and does not knock.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/48.png" alt="oil refinery distillation towers at dusk photo" data-caption="Distillation towers in an oil refinery separate petroleum fractions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/49.png" alt="Two engine cylinders with a piston and spark plug. Left: Smooth burning after the spark. R" data-caption="Knocking happens when fuel ignites before the spark." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>In a petrol engine, petrol vapour and air are squeezed into a small volume and then ignited by a spark. If the petrol is of poor quality, it ignites too early, and this gives a metallic sound called knocking. Antiknock compounds such as tetraethyl lead, benzene, toluene and xylene reduce knocking.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Refining</td><td>Separation of the fractions of petroleum</td></tr><tr><td>Knocking</td><td>Metallic sound from early ignition of fuel in the cylinder</td></tr><tr><td>Antiknock compounds</td><td>Tetraethyl lead; benzene, toluene and xylene</td></tr><tr><td>Octane number</td><td>Measure of the antiknock property of petrol; higher is better</td></tr><tr><td>Typical octane numbers</td><td>Automobile petrol 80 or more; aeroplane fuel 100 or more</td></tr></tbody></table>
      <div class="cp-note trap">A higher octane number means better fuel, not worse.</div>
    `
  },
  76: {
    questext: "Knocking in petrol engines is reduced by adding",
    options: ["tetraethyl lead", "sodium chloride", "calcium carbonate", "ethylene glycol"],
    correct: "1",
    exptext: "✅ Tetraethyl lead is an antiknock compound. 📌 Lead stops the knock. ❌ Sodium chloride and calcium carbonate have no effect on burning."
  },
  77: {
    questext: "A fuel with a higher octane number is",
    options: ["of poor quality", "more likely to knock", "always a gas", "of better quality"],
    correct: "4",
    exptext: "✅ A higher octane number shows a better antiknock property and a better fuel. 📌 Higher octane, higher quality. ❌ Poor fuel knocks more and has a lower number."
  },
  78: {
    questext: "The process of separating the various fractions of petroleum is called",
    options: ["cracking", "refining", "knocking", "carbonisation"],
    correct: "2",
    exptext: "✅ Refining separates petroleum into its fractions. 📌 Refining means separating. ❌ Cracking breaks large molecules into small ones."
  },
  79: {
    type: "concept", icon: "⛽", accent: "#7c3aed", pauseTimer: true,
    title: "Gaseous and Mixed Fuels",
    html: `
      <p class="cp-lead">Many fuels are mixtures of gases. <u>Learn what each fuel mainly contains.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/50.png" alt="compressed natural gas bus Delhi photo" data-caption="A bus running on compressed natural gas." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/51.png" alt="Two boxes: Producer gas = carbon monoxide + nitrogen and Water gas = carbon monoxide + hyd" data-caption="Producer gas and water gas differ in their second gas." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Liquefied petroleum gas (LPG) is a mixture of hydrocarbons, and compressed natural gas (CNG) is natural gas stored under very high pressure. Gasohol is a blend of ethyl alcohol and petrol.</p>
      <table><thead><tr><th>Fuel</th><th>Composition</th><th>Key fact</th></tr></thead><tbody><tr><td>Producer gas</td><td>Carbon monoxide and nitrogen</td><td>A mixture of gases used as fuel</td></tr><tr><td>Water gas</td><td>Carbon monoxide and hydrogen</td><td>A mixture of gases used as fuel</td></tr><tr><td>Coal gas</td><td>Hydrogen, methane, carbon monoxide, ethane, acetylene, carbon dioxide, nitrogen and oxygen</td><td>Mixture of many gases</td></tr><tr><td>Oil gas</td><td>Methane, ethylene and acetylene</td><td>Obtained by cracking kerosene</td></tr><tr><td>Liquefied petroleum gas</td><td>Propane, propene, butane and isobutane with a little ethane</td><td>Main source is natural gas</td></tr><tr><td>Compressed natural gas</td><td>Natural gas under high pressure</td><td>Octane rating of 130</td></tr><tr><td>Gasohol</td><td>10 percent ethyl alcohol and 90 percent petrol</td><td>A blend fuel</td></tr></tbody></table>
      <div class="cp-note trap">Producer gas has nitrogen, and water gas has hydrogen. Both contain carbon monoxide.</div>
    `
  },
  80: {
    questext: "Water gas is a mixture of",
    options: ["carbon dioxide and nitrogen", "carbon monoxide and hydrogen", "methane and ethane", "carbon monoxide and nitrogen"],
    correct: "2",
    exptext: "✅ Water gas contains carbon monoxide and hydrogen. 📌 Water has hydrogen. ❌ Carbon monoxide and nitrogen make producer gas."
  },
  81: {
    questext: "Gasohol is a mixture of",
    options: ["methyl alcohol and kerosene", "ethyl alcohol 50 percent and petrol 50 percent", "petrol and diesel", "ethyl alcohol 10 percent and petrol 90 percent"],
    correct: "4",
    exptext: "✅ Gasohol contains 10 percent ethyl alcohol and 90 percent petrol. 📌 Ten alcohol, ninety petrol. ❌ Methyl alcohol is not used in gasohol."
  },
  82: {
    questext: "The octane rating of compressed natural gas is",
    options: ["130", "80", "100", "50"],
    correct: "1",
    exptext: "✅ Compressed natural gas has an octane rating of 130. 📌 Compressed natural gas is very high at 130. ❌ Ordinary petrol is 80 or above, and aeroplane fuel is 100 or more."
  },
  83: {
    type: "concept", icon: "🚀", accent: "#c026d3", pauseTimer: true,
    title: "Flame and Rocket Fuel",
    html: `
      <p class="cp-lead">A flame has three regions. <u>The colour of each region tells how fully the fuel is burning.</u> Rockets use special fuels called propellants.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/52.png" alt="A candle flame cut in half showing three zones labelled Innermost: black, unburnt carbon, " data-caption="The three regions of a flame." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/53.png" alt="goldsmith heating gold with blowpipe flame photo" data-caption="A goldsmith uses the hottest outer part of a flame." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/54.png" alt="rocket launch solid booster liquid hydrogen photo" data-caption="A rocket lifting off using propellant fuels." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Region</th><th>Colour</th><th>Reason</th></tr></thead><tbody><tr><td>Innermost</td><td>Black</td><td>Unburnt carbon particles</td></tr><tr><td>Middle</td><td>Yellow and luminous</td><td>Partial combustion of fuel</td></tr><tr><td>Outermost</td><td>Blue and non-luminous</td><td>Complete combustion; hottest part</td></tr></tbody></table>
      <p>The fuel used in rockets is called rocket propellant. Liquid propellants include alcohol, liquid hydrogen, liquid ammonia and kerosene oil. Solid propellants are polybutadiene and acrylic acid, used along with an oxidiser such as ammonium perchlorate.</p>
      <div class="cp-note trap">The yellow middle region glows because of partial burning, and the blue outer region is hottest. Do not mix up the two.</div>
    `
  },
  84: {
    questext: "Which part of a flame is the hottest?",
    options: ["Innermost region", "Middle region", "Outermost region", "All parts are equally hot"],
    correct: "3",
    exptext: "✅ The outermost blue region has complete combustion and is the hottest. 📌 Blue is hot. ❌ The yellow middle region burns only partly."
  },
  85: {
    questext: "The innermost region of a flame is black because of",
    options: ["complete combustion of fuel", "excess oxygen", "unburnt carbon particles", "burning hydrogen"],
    correct: "3",
    exptext: "✅ Unburnt carbon particles make the innermost region black. 📌 Black means unburnt. ❌ Complete combustion happens in the outer blue region."
  },
  86: {
    questext: "Which of the following is a liquid propellant used in rockets?",
    options: ["Liquid hydrogen", "Polybutadiene", "Acrylic acid", "Ammonium perchlorate"],
    correct: "1",
    exptext: "✅ Liquid hydrogen is a liquid propellant. 📌 Liquid means liquid hydrogen. ❌ Polybutadiene and acrylic acid are solid propellants, and ammonium perchlorate is the oxidiser."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gleaming bronze and steel alloy ingot, a glass flask with a faint blue flame, and a delicate molecular bond model in gold lines" },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"brass utensils and bronze statues photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/1.png. brass and bronze objects, both made mainly from copper",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/2.png": { t: "fig", about: "Two panels side by side. Left: one metal drawn as neat rows of identical circles, label \"Pure metal: layers slide easily\". Right: the same rows with a few bigger circles of another colour, label \"Alloy: layers are locked\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"bronze temple bell hanging photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/3.png. a bell cast from bell metal",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"stainless steel surgical instruments tray photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/4.png. surgical instruments made of stainless steel",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/5.png": { t: "fig", about: "A simple tree with copper at the top. Branch 1: copper + zinc = Brass. Branch 2: copper + tin = Bronze. Branch 3: copper + zinc + nickel = German silver." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/6.png": { t: "fig", about: "An atom of sodium with 1 outer electron and an atom of neon with 8 outer electrons drawn as shell diagrams, labels \"Incomplete outer shell: reactive\" and \"Complete outer shell: stable\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/7.png": { t: "fig", about: "A simple tree: \"Chemical bonding\" splits into \"Ionic (transfer)\", \"Covalent (sharing)\", \"Coordinate (one atom gives the pair)\", \"Hydrogen bond\", \"Van der Waals forces\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/8.png": { t: "fig", about: "Sodium atom giving one electron to a chlorine atom, shown as an arrow, giving Na+ and Cl- ions; labels \"Na loses 1 electron\", \"Cl gains 1 electron\", \"Ionic bond\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/9.png": { t: "fig", about: "Two hydrogen atoms sharing one pair of electrons in the overlap of their circles; labels \"H\", \"H\", \"Shared pair\", \"Covalent bond\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sodium chloride table salt crystals macro photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/10.png. cubic crystals of common salt",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/11.png": { t: "fig", about: "Ammonia molecule with a lone pair on nitrogen and an arrow going to a hydrogen ion, giving ammonium; labels \"Donor: nitrogen lone pair\", \"Acceptor: H+\", \"NH4+\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/12.png": { t: "fig", about: "Carbon monoxide drawn as C and O joined by a double line and an arrow from O to C; labels \"Covalent bonds\" and \"Coordinate bond\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/13.png": { t: "fig", about: "Several water molecules in a zigzag line with dotted lines between the hydrogen of one molecule and the oxygen of the next; labels \"O\", \"H\", \"Hydrogen bond (dotted)\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"gecko climbing glass wall toe pads photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/14.png. a gecko clinging to a glass surface",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"factory chimney smoke air pollution photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/15.png. smoke rising from industrial chimneys",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/16.png": { t: "fig", about: "A flow of three boxes: \"Primary pollutants: sulphur dioxide, nitrogen dioxide\" then an arrow labelled \"React in sunlight and air\" then \"Secondary pollutants: ozone, peroxyacetyl nitrate, aldehydes\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Taj Mahal marble yellowing air pollution photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/17.png. marble monument damaged by polluted air",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/18.png": { t: "fig", about: "A red blood cell showing haemoglobin with carbon monoxide attached; labels \"Haemoglobin\", \"CO attached\", \"Oxygen cannot attach\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/19.png": { t: "fig", about: "Sun rays hitting the Earth, infrared heat rising and some bouncing back from a layer labelled \"Greenhouse gases: carbon dioxide, methane, water vapour\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/20.png": { t: "fig", about: "A chimney and a vehicle releasing sulphur and nitrogen oxides, rising into a cloud and falling as rain on a forest; labels \"Oxides of sulphur and nitrogen\", \"Sulphuric and nitric acid\", \"Acid rain\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"forest trees damaged by acid rain photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/21.png. dead conifer trees from acid rain",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"heavy smog covering Delhi city morning photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/22.png. thick smog over a city",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/23.png": { t: "fig", about: "Two panels. Left: \"Classical smog\" with labels \"Cool, humid weather\" and \"Sulphur dioxide and particles\". Right: \"Photochemical smog\" with labels \"Warm, dry, sunny weather\" and \"Nitrogen oxides, ozone, formaldehyde\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"NASA Antarctic ozone hole satellite image\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/24.png. the ozone hole over Antarctica",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/25.png": { t: "fig", about: "Layers of the atmosphere with a band labelled \"Ozone layer\" in the stratosphere absorbing arrows labelled \"Ultraviolet rays\" from the Sun; Earth below labelled \"Life on Earth\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/26.png": { t: "fig", about: "A molecule labelled \"Chlorofluorocarbon\" releasing a \"Chlorine atom\" that breaks an \"Ozone molecule\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/27.png": { t: "fig", about: "A lake scene with a scale: \"Dissolved oxygen 5 to 6 parts per million: healthy fishes\" and \"Below 5 parts per million: fish growth is inhibited\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sewage waste flowing into river pollution photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/28.png. waste water entering a river",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/29.png": { t: "fig", about: "Three boxes: a solid with tightly packed particles, a liquid with close but loose particles, a gas with widely spaced fast particles; labels \"Solid\", \"Liquid\", \"Gas\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/30.png": { t: "fig", about: "A container with gas particles hitting the walls with small arrows; label \"Pressure: particles strike the walls\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/31.png": { t: "fig", about: "Two cylinders with a piston. Left: low pressure, large volume. Right: high pressure, small volume; labels \"Boyle's law: more pressure, less volume\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/32.png": { t: "fig", about: "A small balloon labelled \"Cold: small volume\" and a bigger balloon labelled \"Hot: large volume\"; title \"Charles's law\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Friedrich Wöhler portrait chemist\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/33.png. German chemist who made urea in a laboratory",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/34.png": { t: "fig", about: "Two molecule sketches: \"Ethanol C2H5OH\" and \"Dimethyl ether CH3OCH3\", both under the label \"Same formula C2H6O, different structures: isomers\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/35.png": { t: "fig", about: "Three stick models: methane CH4 with single bonds, ethene C2H4 with a double bond, ethyne C2H2 with a triple bond; labels \"Single bond: alkane\", \"Double bond: alkene\", \"Triple bond: alkyne\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/36.png": { t: "fig", about: "A hexagon ring with alternate double bonds; labels \"Benzene C6H6\", \"Ring with alternate double bonds\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"LPG cylinder gas stove blue flame photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/37.png. gas cylinder used in kitchens",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"naphthalene balls mothballs photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/38.png. white mothballs",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/39.png": { t: "fig", about: "A simple biogas plant: a tank of waste, a dome labelled \"Methane gas\" and a pipe to a stove; label \"Decay without oxygen\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"chloroform dark brown glass bottle photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/40.png. a closed dark bottle of chloroform",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/41.png": { t: "fig", about: "Three boxes: \"Chloroform CHCl3: anaesthetic\", \"Iodoform CHI3: antiseptic\", \"Carbon tetrachloride CCl4: fire extinguisher\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"DDT insecticide spraying old photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/42.png. DDT being sprayed for mosquito control",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/43.png": { t: "fig", about: "Three structural sketches: \"Methanol CH3OH\", \"Ethanol C2H5OH\", \"Glycerol CH2OH-CHOH-CH2OH with three OH groups circled\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhopal gas tragedy memorial statue photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/44.png. memorial for the 1984 gas leak victims",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/45.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"anthracite bituminous lignite peat coal types comparison photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/45.png. four coal samples side by side",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/46.png": { t: "fig", about: "A bar chart of carbon content: Peat 10 to 15, Lignite 40, Bituminous 70, Anthracite 90 percent." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/47.png": { t: "fig", about: "A closed flask of coal heated with a burner; three outputs labelled \"Coke\", \"Coal tar\", \"Coal gas\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/48.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"oil refinery distillation towers at dusk photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/48.png. tall towers of an oil refinery",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/49.png": { t: "fig", about: "Two engine cylinders with a piston and spark plug. Left: \"Smooth burning after the spark\". Right: \"Knocking: fuel ignites too early\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/50.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"compressed natural gas bus Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/50.png. a bus running on compressed natural gas",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/51.png": { t: "fig", about: "Two boxes: \"Producer gas = carbon monoxide + nitrogen\" and \"Water gas = carbon monoxide + hydrogen\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/52.png": { t: "fig", about: "A candle flame cut in half showing three zones labelled \"Innermost: black, unburnt carbon\", \"Middle: yellow, partial combustion\", \"Outermost: blue, complete combustion, hottest\"." },
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/53.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"goldsmith heating gold with blowpipe flame photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/53.png. a goldsmith using a flame",
  "images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/54.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rocket launch solid booster liquid hydrogen photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part5_Alloys_Bonding_Gases_Organic_Fuels/54.png. a rocket lifting off"
});

/* CHANGE LOG
   - Charles's law and the pressure law use 1/273 of the volume or pressure at 0 degrees Celsius (the source gave 32 degrees Fahrenheit for Charles's law).
   - Avogadro number is 6.022 × 10²³ (the source gave 6.06 × 10²³).
   - Temperature is the measure of the average kinetic energy of particles, not average heat.
   - Alnico contains iron as the remaining metal (the source printed Tl by mistake).
   - Duralumin also contains about 0.5 percent magnesium along with manganese.
   - Sulphur dioxide reduces the formation of chlorophyll, which causes chlorosis (the source said chloroplast).
   - The doubtful white lung disease entry was left out and asbestosis (asbestos fibres) was added.
   - Chloroform was not discovered by James Young Simpson; he was the first to use it as an anaesthetic.
   - Chloropicrin has the formula CCl₃NO₂ (the source printed CI3C-NO2).
   - Ethylene is used for artificial ripening of fruits; the claim that it preserves fruits was dropped.
   - Toluene is not used as an antifreeze; that line was dropped.
   - Liquefied petroleum gas contains propane, propene, butane and isobutane (the source said isobutene).
   - The oxidiser in solid rocket propellants is ammonium perchlorate (the source said aluminium perchlorate).
   - Mercury is kept in iron containers because iron does not form an amalgam with it (wording corrected).
   - The Bhopal gas tragedy year (1984) was added; stainless steel composition is given as an approximate split.
*/
