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

/* Field: General_Awareness · Subject: General_Science · Chapter: Chemistry_Part2_Atom_and_Common_Elements · 12 concept pages (+ overview) · 28 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "⚛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Atom, Isotopes and Common Elements",
    thumb: {
      image: "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/thumbnail.png",
      banner: "GENERAL SCIENCE 2026",
      line1: "CHEMISTRY PART 2",
      line2: "ATOM & ISOTOPES",
      line3: "COMMON ELEMENTS",
      badge: "FULL CLASS",
      ribbon: "FACTS • TABLES • MCQs",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Structure of Atom, Isotopes and Common Elements | Chemistry for SSC CGL",
      altTitles: ["Atom, Isotopes, Isobars, Isotones in One Class", "Carbon, Nitrogen, Oxygen, Noble Gases Quick Facts"],
      description: "Atomic structure and common elements give many easy marks in General Science. In this class we learn every fact with its reason so it stays in memory.\n\n📌 IN THIS CLASS\n✅ Proton, electron, neutron and nucleus\n✅ Valency, atomic number, mass number\n✅ Isotopes, isobars, isotones\n✅ Carbon, nitrogen, oxygen, phosphorus, sulphur\n✅ Halogens and noble gases\n✅ Hard water, heavy water and aqua regia\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Structure of the atom\n00:00 Isotopes\n00:00 Common elements\n00:00 Water\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Chemistry #GeneralScience",
      tags: ["structure of atom", "isotopes isobars isotones", "atomic number mass number", "valency and octet", "allotropes of carbon", "carbon monoxide poisoning", "ozone layer", "noble gases uses", "heavy water", "hardness of water", "aqua regia", "chemistry for ssc cgl", "ssc cgl general science", "ssc cgl general awareness", "chemistry mcq", "competitive exam chemistry", "railway general science", "banking general awareness", "defence exam chemistry", "static gk science", "chemistry one shot", "radioactive isotopes uses", "halogens and chlorine", "C"],
      hashtags: ["SSCCGL", "Chemistry", "GeneralScience"],
      thumbText: "ATOM + ISOTOPES + ELEMENTS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "⚛️ New class is live: Atom, Isotopes and Common Elements. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Structure of the atom\n00:00 Isotopes\n00:00 Common elements\n00:00 Water and hydrochloric acid",
      playlist: "General Science Chemistry — Full Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the structure of the atom and on the most common elements and compounds</u>. These topics are full of one-line facts that competitive exams love to ask.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>12</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>28</b><span>Questions</span></div>
        <div class="cp-stat"><b>~52 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Structure of the Atom</b><br>Who discovered the proton, electron, neutron and nucleus, and what charge each particle carries.</li>
        <li><b>Valency, Atomic Number and Mass Number</b><br>Why atoms combine, what the octet is, and how atomic number differs from mass number.</li>
        <li><b>Isotopes and Their Relatives</b><br>Isotopes, isobars, isotones and isoelectronic species, with the medical uses of radioactive isotopes.</li>
        <li><b>Carbon, Nitrogen and Oxygen</b><br>Allotropes of carbon, the dangers of carbon monoxide, ammonia, nitrogen fixation and the ozone layer.</li>
        <li><b>Phosphorus, Sulphur, Halogens and Noble Gases</b><br>Where each is found and what it is used for.</li>
        <li><b>Water and Hydrochloric Acid</b><br>Hard and heavy water, and why aqua regia can dissolve gold.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> names of discoverers, allotropes, gas percentages and uses of noble gases are direct one-mark facts in General Science papers.</div>
    `
  },
  2: {
    type: "concept", icon: "⚛️", accent: "#22c55e", pauseTimer: true,
    title: "Structure of the Atom",
    html: `
      <p class="cp-lead">The atomic theory of matter was first proposed by <b>John Dalton</b>. An atom is made of three basic particles: the <u>proton, the electron and the neutron</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/1.png" alt="A simple atom: small dense nucleus in the centre containing red protons (+) and grey neutr" data-caption="An atom has a nucleus of protons and neutrons with electrons around it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/2.png" alt="Rutherford gold foil experiment apparatus diagram photo" data-caption="Alpha particles were fired at a thin gold foil in this experiment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Particle</th><th>Discovered by</th><th>Charge</th></tr></thead><tbody><tr><td>Proton</td><td>E. Goldstein</td><td>Positive (+1.6 x 10<sup>-19</sup> coulomb)</td></tr><tr><td>Electron</td><td>J. J. Thomson, while studying cathode rays</td><td>Negative (-1.6 x 10<sup>-19</sup> coulomb)</td></tr><tr><td>Neutron</td><td>J. Chadwick</td><td>No charge</td></tr><tr><td>Nucleus</td><td>Ernest Rutherford</td><td>Positive</td></tr></tbody></table>
      <p class="cp-lead">The Irish physicist <b>George Johnstone Stoney</b> named the charge "electron" in 1891. The charge of an electron was measured by <b>R. Millikan</b> in the oil drop experiment.</p>
      <p class="cp-lead">Rutherford made fast moving alpha particles (doubly charged helium ions) fall on a thin gold foil, and this led to the discovery of the nucleus. A neutron has a mass nearly equal to that of a proton, and the mass of an atom is the sum of the masses of the protons and neutrons in its nucleus.</p>
      <div class="cp-note trap">Do not mix up the discoverers. Goldstein found the proton, Thomson the electron, Chadwick the neutron and Rutherford the nucleus.</div>
      <div class="cp-note exam">The electron was discovered during work on cathode rays, and its charge was measured in the oil drop experiment by Millikan.</div>
    `
  },
  3: {
    questext: "Who discovered the neutron?",
    options: ["J. Chadwick", "E. Goldstein", "J. J. Thomson", "Ernest Rutherford"],
    correct: "1",
    exptext: "✅ James Chadwick discovered the neutron. 📌 Chadwick has the sound of \"chargeless\". ❌ Rutherford discovered the nucleus, not the neutron."
  },
  4: {
    questext: "The charge of an electron was measured by",
    options: ["Dalton", "Chadwick", "Goldstein", "Millikan"],
    correct: "4",
    exptext: "✅ Robert Millikan measured the electron charge using his oil drop experiment. 📌 Millikan means oil drop. ❌ Dalton proposed the atomic theory but did not measure charge."
  },
  5: {
    questext: "Consider the following statements about the atom:\n1. The electron was discovered by J. J. Thomson while he studied cathode rays.\n2. The nucleus was discovered by E. Goldstein.\nWhich of the statements given above is correct?",
    options: ["Neither 1 nor 2", "Only 1", "Both 1 and 2", "Only 2"],
    correct: "2",
    exptext: "✅ Only statement 1 is correct. 📌 Thomson gave the electron and Rutherford gave the nucleus. ❌ Goldstein discovered the proton, so statement 2 is wrong."
  },
  6: {
    type: "concept", icon: "🔋", accent: "#f59e0b", pauseTimer: true,
    title: "Valency, Atomic Number and Mass Number",
    html: `
      <p class="cp-lead"><b>Valency</b> is the number of electrons gained, lost or shared by an atom to complete the octet of electrons in its outermost shell. Atoms react in order to reach an <u>octet</u> in the outermost shell.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/3.png" alt="An atom with a full outer shell of eight electrons labelled Octet = stable, valency zero, " data-caption="A full outer shell of eight electrons makes an atom stable." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/4.png" alt="Two boxes: Atomic number Z = number of protons; Mass number A = protons + neutrons, with a" data-caption="Atomic number counts protons; mass number counts protons plus neutrons." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Atoms with a completely filled outermost shell show little chemical activity, so their valency is zero. The chemical behaviour of an atom depends upon the number of electrons orbiting around the nucleus.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Atomic number (Z)</td><td>Total number of protons present in the nucleus of an atom</td></tr><tr><td>Mass number</td><td>Sum of the total number of protons and neutrons in the nucleus of an atom</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Mass number</small>Mass number = Protons + Neutrons</div>
      <div class="cp-note trap">Electrons are not counted in the mass number, because their mass is very small. Only protons and neutrons are counted.</div>
      <div class="cp-note exam">Atomic number is denoted by the letter Z and is the number of protons.</div>
    `
  },
  7: {
    questext: "The atomic number of an atom is the total number of",
    options: ["neutrons", "electrons in all shells", "protons plus neutrons", "protons in its nucleus"],
    correct: "4",
    exptext: "✅ Atomic number is the number of protons in the nucleus. 📌 Z stands for protons. ❌ Protons plus neutrons give the mass number."
  },
  8: {
    questext: "Atoms with a completely filled outermost shell have a valency of",
    options: ["zero", "one", "two", "eight"],
    correct: "1",
    exptext: "✅ A full outer shell makes the atom stable, so its valency is zero. 📌 Noble gases are the example. ❌ Eight is the number of electrons, not the valency."
  },
  9: {
    type: "concept", icon: "🧬", accent: "#ef4444", pauseTimer: true,
    title: "Isotopes and Their Relatives",
    html: `
      <p class="cp-lead"><b>Isotopes</b> are atoms that have the same atomic number but different mass numbers. Their chemical properties are similar, but their physical properties are different.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/5.png" alt="Three atoms of the same element in a row, each with the same number of protons but 6, 7 an" data-caption="Isotopes have the same protons but different neutrons." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/6.png" alt="cobalt-60 radiotherapy machine hospital cancer treatment photo" data-caption="Cobalt-60 is used in the treatment of cancer." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Isotopes</td><td>Same atomic number, different mass numbers</td></tr><tr><td>Isobars</td><td>Atoms of different elements with different atomic numbers but the same mass number</td></tr><tr><td>Isotones</td><td>Atoms having the same number of neutrons</td></tr><tr><td>Isoelectronic</td><td>Atoms, ions or molecules with the same electronic structure and the same number of valence electrons</td></tr><tr><td>Mass defect</td><td>Difference between the rest mass of a nucleus and the sum of the rest masses of its constituent nucleons</td></tr></tbody></table>
      <table><thead><tr><th>Radioactive isotope</th><th>Use</th></tr></thead><tbody><tr><td>Arsenic-74</td><td>Detecting tumours</td></tr><tr><td>Sodium-24</td><td>Detecting blood clots</td></tr><tr><td>Iodine-131</td><td>Studying the activity of the thyroid gland</td></tr><tr><td>Cobalt-60</td><td>Treatment of cancer</td></tr></tbody></table>
      <p class="cp-lead">An isotope of uranium is used as a fuel in nuclear reactors, an isotope of cobalt in the treatment of cancer and an isotope of iodine in the treatment of goitre.</p>
      <div class="cp-note trap">Isotopes share the atomic number, isobars share the mass number and isotones share the neutron number. Keep the three apart.</div>
      <div class="cp-note exam">Match the isotope to its use: cobalt for cancer, iodine for thyroid and goitre, sodium for blood clots and arsenic for tumours.</div>
    `
  },
  10: {
    questext: "Atoms of different elements that have the same mass number are called",
    options: ["isotopes", "isotones", "isobars", "isomers"],
    correct: "3",
    exptext: "✅ Isobars have the same mass number but different atomic numbers. 📌 Isobars share the mass. ❌ Isotopes share the atomic number instead."
  },
  11: {
    questext: "Which radioactive isotope is used in the treatment of cancer?",
    options: ["Cobalt-60", "Sodium-24", "Iodine-131", "Arsenic-74"],
    correct: "1",
    exptext: "✅ Cobalt-60 is used in cancer treatment. 📌 Cobalt means cancer. ❌ Iodine-131 is used for the thyroid gland."
  },
  12: {
    questext: "Atoms having the same number of neutrons are called",
    options: ["isobars", "isotopes", "isoelectronic", "isotones"],
    correct: "4",
    exptext: "✅ Isotones have the same number of neutrons. 📌 The \"n\" in isotone stands for neutron. ❌ Isotopes share atomic number, not neutrons."
  },
  13: {
    type: "concept", icon: "💎", accent: "#8b5cf6", pauseTimer: true,
    title: "Carbon and Its Allotropes",
    html: `
      <p class="cp-lead">Carbon shows <b>allotropy</b>, which means it exists in different physical forms, and it shows maximum <b>catenation</b>, which means its atoms can join to form long chains. Carbon occurs in the free state as diamond and coal, and in the combined form as carbon dioxide.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/7.png" alt="rough diamond crystal photo" data-caption="Diamond is the hardest natural substance." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/8.png" alt="graphite pencil lead close up photo" data-caption="Graphite is soft and slippery and is used in pencils." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/9.png" alt="A football-like cage of carbon atoms labelled Fullerene C60 (20 six-membered rings and 12 " data-caption="Fullerene is a cage of carbon; graphene is a flat sheet." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Allotrope</th><th>Key fact</th></tr></thead><tbody><tr><td>Diamond</td><td>The purest form of natural carbon and the hardest natural substance</td></tr><tr><td>Graphite</td><td>Very soft and slippery; prepared artificially by the Acheson process</td></tr><tr><td>Fullerene (C<sub>60</sub>)</td><td>Looks like a soccer ball and has 20 six-membered and 12 five-membered rings of carbon atoms</td></tr><tr><td>Graphene</td><td>A strong allotrope used as a conducting material for touch screens, liquid crystal displays and light emitting diodes</td></tr></tbody></table>
      <div class="cp-note trap">Diamond is the hardest, but graphite is soft. They are both carbon, which is why they are called allotropes.</div>
      <div class="cp-note exam">Fullerene has 20 six-membered and 12 five-membered rings. Graphite is made artificially by the Acheson process.</div>
    `
  },
  14: {
    questext: "Which allotrope of carbon is the hardest natural substance?",
    options: ["Graphite", "Diamond", "Fullerene", "Graphene"],
    correct: "2",
    exptext: "✅ Diamond is the hardest natural substance. 📌 Diamond is hard, graphite is slippery. ❌ Graphite is soft and slippery."
  },
  15: {
    questext: "Graphite is prepared artificially by the",
    options: ["Haber process", "Contact process", "Ostwald process", "Acheson process"],
    correct: "4",
    exptext: "✅ The Acheson process makes graphite artificially. 📌 Acheson goes with graphite. ❌ Haber is for ammonia and Ostwald is for nitric acid."
  },
  16: {
    type: "concept", icon: "☠️", accent: "#14b8a6", pauseTimer: true,
    title: "Compounds of Carbon",
    html: `
      <p class="cp-lead">The important compounds of carbon are carbon monoxide and carbon dioxide. <u>Carbon monoxide is poisonous, but carbon dioxide is harmless in small amounts.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/10.png" alt="A red blood cell with haemoglobin bound to carbon monoxide forming carboxyhaemoglobin, wit" data-caption="Carbon monoxide blocks haemoglobin so oxygen cannot be carried." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/11.png" alt="dry ice smoking in a bowl photo" data-caption="Solid carbon dioxide is known as dry ice." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Compound</th><th>Key facts</th></tr></thead><tbody><tr><td>Carbon monoxide (CO)</td><td>Combines with haemoglobin to form carboxyhaemoglobin, which cannot absorb oxygen, so suffocation (asphyxia) takes place; deaths in closed rooms with coal, wood or coke fires and in closed bathrooms with gas geysers are due to it</td></tr><tr><td>Carbon dioxide (CO<sub>2</sub>)</td><td>About 0.03 to 0.05 percent of the atmosphere; solid CO<sub>2</sub> is dry ice, called Drikold, used in refrigerators to carry perishable food</td></tr><tr><td>Carbides</td><td>Compounds of carbon with metals or electronegative elements</td></tr><tr><td>Destructive distillation of coal</td><td>Gives coal gas, gas carbon, coal tar and ammoniacal liquor; lamp black is also known as soot</td></tr></tbody></table>
      <div class="cp-note trap">Dry ice is solid carbon dioxide, not frozen water. It gives cold as well as an inert atmosphere, which is why it keeps food fresh.</div>
      <div class="cp-note exam">Carbon monoxide forms carboxyhaemoglobin with haemoglobin. It is the gas behind deaths in closed rooms with burning fuel.</div>
    `
  },
  17: {
    questext: "Which gas combines with haemoglobin to form carboxyhaemoglobin?",
    options: ["Carbon monoxide", "Carbon dioxide", "Nitrogen", "Ammonia"],
    correct: "1",
    exptext: "✅ Carbon monoxide forms carboxyhaemoglobin and blocks oxygen transport. 📌 Monoxide means one oxygen and one danger. ❌ Carbon dioxide does not bind haemoglobin so strongly."
  },
  18: {
    questext: "Dry ice is",
    options: ["frozen water", "solid carbon dioxide", "solid nitrogen", "frozen ammonia"],
    correct: "2",
    exptext: "✅ Dry ice is solid carbon dioxide, also called Drikold. 📌 It turns straight to gas, so it stays dry. ❌ Frozen water is ordinary ice."
  },
  19: {
    type: "concept", icon: "🌱", accent: "#ec4899", pauseTimer: true,
    title: "Nitrogen and Its Compounds",
    html: `
      <p class="cp-lead">Nitrogen is a neutral gas. It is neither combustible nor a supporter of combustion. About <b>78 percent</b> of air by volume is nitrogen.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/12.png" alt="A cycle showing atmospheric nitrogen, lightning and Rhizobia bacteria in root nodules conv" data-caption="Nitrogen fixation turns air nitrogen into nitrates by lightning and bacteria." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/13.png" alt="root nodules of legume plant Rhizobium photo" data-caption="Rhizobia bacteria live in root nodules of pulse plants." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Item</th><th>Fact</th></tr></thead><tbody><tr><td>Chile saltpetre</td><td>Sodium nitrate (NaNO<sub>3</sub>)</td></tr><tr><td>Indian saltpetre</td><td>Potassium nitrate (KNO<sub>3</sub>)</td></tr><tr><td>Ammonia</td><td>Prepared from nitrogen and hydrogen by Haber's process; has a pungent odour; used in making fertilisers and explosives</td></tr><tr><td>Nitrogen fixation</td><td>Fixation of atmospheric nitrogen into nitrate by lightning and by nitrogen fixing bacteria called Rhizobia</td></tr></tbody></table>
      <div class="cp-note trap">Chile saltpetre is sodium nitrate, and Indian saltpetre is potassium nitrate. The country name is only a label.</div>
      <div class="cp-note exam">Ammonia is made by the Haber process, and Rhizobia are the bacteria that fix nitrogen.</div>
    `
  },
  20: {
    questext: "Which process is used to prepare ammonia from nitrogen and hydrogen?",
    options: ["Contact process", "Ostwald process", "Haber's process", "Acheson process"],
    correct: "3",
    exptext: "✅ Haber's process combines nitrogen and hydrogen to make ammonia. 📌 Haber means ammonia. ❌ The contact process makes sulphuric acid."
  },
  21: {
    questext: "Indian saltpetre is chemically",
    options: ["sodium nitrate", "potassium nitrate", "calcium nitrate", "ammonium nitrate"],
    correct: "2",
    exptext: "✅ Indian saltpetre is potassium nitrate. 📌 Chile is sodium, India is potassium. ❌ Sodium nitrate is Chile saltpetre."
  },
  22: {
    questext: "Nitrogen fixing bacteria that live in the roots of pulse plants are called",
    options: ["Rhizobia", "Lactobacilli", "Yeast", "Algae"],
    correct: "1",
    exptext: "✅ Rhizobia fix atmospheric nitrogen in root nodules. 📌 Root and Rhizobia both start with R. ❌ Lactobacilli make curd."
  },
  23: {
    type: "concept", icon: "🌬️", accent: "#3b82f6", pauseTimer: true,
    title: "Oxygen and Ozone",
    html: `
      <p class="cp-lead">Oxygen is an important constituent of the atmosphere (<b>21 percent</b> by volume) and supports combustion. Liquid oxygen mixed with freshly divided carbon is used in place of dynamite in coal mining.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/14.png" alt="ozone layer earth atmosphere satellite image photo" data-caption="The ozone layer shields life from ultraviolet rays." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/15.png" alt="Sunlight with ultraviolet rays hitting a layer labelled Ozone layer (O3), with chlorofluor" data-caption="Chlorofluorocarbons break down the ozone layer." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Ozone</b> (O<sub>3</sub>) protects life on Earth by not allowing ultraviolet rays to reach it. Common refrigerants, the chlorofluorocarbons, deplete this ozone layer. Its bleaching action is due to its oxidising action, and it is also used as a germicide and disinfectant for sterilising water.</p>
      <div class="cp-note trap">Ozone protects us high up in the stratosphere, but it is harmful as a pollutant near the ground.</div>
      <div class="cp-note exam">Oxygen makes 21 percent of air, and ozone is a form of oxygen with three atoms.</div>
    `
  },
  24: {
    questext: "The percentage of oxygen in air by volume is about",
    options: ["78", "21", "0.04", "1"],
    correct: "2",
    exptext: "✅ Oxygen makes up about 21 percent of air. 📌 Nitrogen 78, oxygen 21. ❌ 78 is the figure for nitrogen."
  },
  25: {
    questext: "The ozone layer is depleted mainly by",
    options: ["carbon dioxide", "methane", "chlorofluorocarbons", "nitrogen"],
    correct: "3",
    exptext: "✅ Chlorofluorocarbons from refrigerants break down ozone. 📌 Refrigerators harm the ozone. ❌ Carbon dioxide is a greenhouse gas, not the main ozone destroyer."
  },
  26: {
    type: "concept", icon: "🌋", accent: "#f97316", pauseTimer: true,
    title: "Phosphorus and Sulphur",
    html: `
      <p class="cp-lead"><b>Phosphorus</b> is a highly reactive non-metal, so it occurs only in the combined state. It is an essential constituent of bones, teeth, blood and nerve tissues. <b>Sulphur</b> occurs in the free state in volcanic regions.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/16.png" alt="yellow sulphur crystals volcano crater photo" data-caption="Sulphur is found free in volcanic regions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/17.png" alt="animal bones bone ash photo" data-caption="Bone ash contains about 80 percent phosphorus compounds." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Item</th><th>Key fact</th></tr></thead><tbody><tr><td>Phosphorus</td><td>Occurs only in combined form; bone ash contains about 80 percent of phosphorus compounds</td></tr><tr><td>Rhombic sulphur</td><td>The most stable form at ordinary temperature; all other forms slowly change into it</td></tr><tr><td>Sulphuric acid</td><td>Also called oil of vitriol or king of chemicals; a powerful dehydrating agent because it has a great affinity for water</td></tr><tr><td>Hypo (sodium thiosulphate)</td><td>Used in photography as a fixing agent to remove undecomposed silver halide from photographic paper or film</td></tr></tbody></table>
      <div class="cp-note trap">Sulphuric acid burns things because it removes water from them, so its corrosive action is due to dehydration.</div>
      <div class="cp-note exam">King of chemicals and oil of vitriol are both names for sulphuric acid, and hypo is the photographic fixer.</div>
    `
  },
  27: {
    questext: "Which chemical is known as the \"king of chemicals\"?",
    options: ["Nitric acid", "Hydrochloric acid", "Sulphuric acid", "Acetic acid"],
    correct: "3",
    exptext: "✅ Sulphuric acid is called the king of chemicals and oil of vitriol. 📌 Vitriol means sulphuric acid. ❌ Nitric acid is made by Ostwald's process."
  },
  28: {
    questext: "Hypo, used as a fixing agent in photography, is chemically",
    options: ["sodium thiosulphate", "sodium sulphate", "silver bromide", "sodium chloride"],
    correct: "1",
    exptext: "✅ Hypo is sodium thiosulphate. 📌 Hypo fixes, silver bromide forms the picture. ❌ Silver bromide is the light sensitive salt, not the fixer."
  },
  29: {
    type: "concept", icon: "🟢", accent: "#84cc16", pauseTimer: true,
    title: "Halogens",
    html: `
      <p class="cp-lead"><b>Halogens</b> are highly reactive elements, so they do not exist in the free state but only in combined form. They have a very high electron affinity, so they act as strong oxidising agents. Their oxidising power decreases from fluorine to iodine.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/18.png" alt="chlorine gas pale green glass flask photo" data-caption="Chlorine is a pale green gas used to kill germs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/19.png" alt="iodine crystals dark purple photo" data-caption="Iodine turns starch solution blue." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/20.png" alt="Row of four halogens from top to bottom: Fluorine, Chlorine, Bromine, Iodine, with an arro" data-caption="Oxidising power falls from fluorine to iodine." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Halogen</th><th>Key facts</th></tr></thead><tbody><tr><td>Chlorine</td><td>First discovered by Scheele in 1774; used as a germicide, disinfectant, oxidising agent and bleaching agent in paper and textile industries; being an acidic gas, it turns moist blue litmus paper red and then bleaches it</td></tr><tr><td>Iodine (I<sub>2</sub>)</td><td>Turns starch solution blue; a solution of potassium iodide and iodine is used for the treatment of goitre; tincture of iodine is an antiseptic</td></tr></tbody></table>
      <div class="cp-note trap">Chlorine first turns moist blue litmus red, and then bleaches it white. The bleaching comes second.</div>
      <div class="cp-note exam">Chlorine was discovered by Scheele in 1774, and iodine gives a blue colour with starch.</div>
    `
  },
  30: {
    questext: "Chlorine was first discovered by",
    options: ["Priestley", "Lavoisier", "Dalton", "Scheele"],
    correct: "4",
    exptext: "✅ Carl Scheele discovered chlorine in 1774. 📌 Scheele and chlorine both start with S and C sounds. ❌ Priestley is linked to oxygen."
  },
  31: {
    questext: "Iodine gives which colour with starch solution?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correct: "2",
    exptext: "✅ Iodine turns starch solution blue. 📌 Starch iodine test gives blue. ❌ Red is the colour of acid with blue litmus."
  },
  32: {
    type: "concept", icon: "🎈", accent: "#06b6d4", pauseTimer: true,
    title: "Noble Gases",
    html: `
      <p class="cp-lead">Helium, neon, argon, krypton, xenon and radon are the <b>noble gases</b>, also called inert or rare gases. These elements have a completely filled valence shell, so they are unreactive.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/21.png" alt="neon sign glowing tubes photo" data-caption="Neon gas glows brightly in advertising signs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/22.png" alt="helium balloons floating photo" data-caption="Helium is light and safe, so it fills balloons." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Gas</th><th>Key facts</th></tr></thead><tbody><tr><td>Argon</td><td>The most abundant noble gas in the atmosphere</td></tr><tr><td>Helium</td><td>The most abundant noble gas in the universe; natural gas is its most important source; a mixture of helium and oxygen is used for the artificial breathing of asthma patients and by sea divers; used as a pressurising agent in rockets</td></tr><tr><td>Xenon</td><td>Also called the stranger gas; xenon-krypton mixture is used in high intensity photographic flash tubes</td></tr><tr><td>Radon</td><td>Used in the preparation of an ointment for the treatment of cancer</td></tr></tbody></table>
      <div class="cp-note trap">Argon is the most abundant noble gas in air, while helium is the most abundant in the universe. The two are often swapped.</div>
      <div class="cp-note exam">Helium and oxygen are mixed for sea divers and asthma patients.</div>
    `
  },
  33: {
    questext: "Which noble gas is the most abundant in the atmosphere?",
    options: ["Helium", "Argon", "Neon", "Xenon"],
    correct: "2",
    exptext: "✅ Argon is the most abundant noble gas in the atmosphere. 📌 Argon in air, helium in space. ❌ Helium is the most abundant in the universe."
  },
  34: {
    questext: "A mixture of helium and oxygen is used for",
    options: ["welding metals", "lighting streets", "refrigerating food", "breathing by sea divers"],
    correct: "4",
    exptext: "✅ Helium and oxygen help sea divers to breathe. 📌 Helium is not absorbed in blood like nitrogen. ❌ Welding uses other gases."
  },
  35: {
    type: "concept", icon: "💧", accent: "#a855f7", pauseTimer: true,
    title: "Water and Hardness",
    html: `
      <p class="cp-lead">Water (H<sub>2</sub>O) is called the <b>universal solvent</b>. Hardness of water is of two types: temporary and permanent.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/23.png" alt="Two glasses of water: Temporary hardness (calcium and magnesium bicarbonates) removed by b" data-caption="Temporary hardness goes on boiling; permanent hardness does not." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/24.png" alt="limescale kettle hard water deposit photo" data-caption="Hard water leaves white scale when boiled." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Cause</th><th>Removal</th></tr></thead><tbody><tr><td>Temporary hardness</td><td>Bicarbonates (hydrogen carbonates) of calcium and magnesium</td><td>Easily removed by boiling</td></tr><tr><td>Permanent hardness</td><td>Sulphates and chlorides of calcium and magnesium</td><td>Cannot be removed by boiling</td></tr></tbody></table>
      <p class="cp-lead">The <b>degree of hardness</b> is the number of parts of calcium carbonate, or its equivalent of calcium or magnesium salts, present in 10<sup>6</sup> parts of water by mass.</p>
      <p class="cp-lead"><b>Heavy water</b> (D<sub>2</sub>O) is prepared by prolonged electrolysis or fractional distillation of ordinary water. It is a colourless, tasteless and odourless liquid, and it is used as a moderator in nuclear reactors to slow down neutrons.</p>
      <div class="cp-note trap">Boiling removes only temporary hardness. Chlorides and sulphates stay behind, which is why they are called permanent.</div>
      <div class="cp-note exam">Heavy water is D2O, and it acts as a moderator in nuclear reactors.</div>
    `
  },
  36: {
    questext: "Temporary hardness of water is caused by the presence of",
    options: ["chlorides of calcium", "bicarbonates of calcium and magnesium", "sulphates of magnesium", "sodium chloride"],
    correct: "2",
    exptext: "✅ Bicarbonates of calcium and magnesium cause temporary hardness. 📌 Boiling removes bicarbonate. ❌ Chlorides and sulphates cause permanent hardness."
  },
  37: {
    questext: "Heavy water is used in nuclear reactors as a",
    options: ["fuel", "moderator", "coolant only", "control rod"],
    correct: "2",
    exptext: "✅ Heavy water slows down fast neutrons, so it is a moderator. 📌 Moderator means slow-down. ❌ Fuel in reactors is uranium."
  },
  38: {
    type: "concept", icon: "🧪", accent: "#e11d48", pauseTimer: true,
    title: "Hydrochloric Acid and Aqua Regia",
    html: `
      <p class="cp-lead"><b>Hydrochloric acid</b> is prepared by dissolving hydrogen chloride gas in water. It reacts with metals to form their chlorides and liberates hydrogen.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/25.png" alt="gold nugget and platinum metal samples photo" data-caption="Aqua regia can dissolve noble metals such as gold and platinum." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/26.png" alt="Two bottles labelled Nitric acid 1 part and Hydrochloric acid 3 parts pouring into one fla" data-caption="Aqua regia is made from one part nitric acid and three parts hydrochloric acid." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Hydrochloric acid is used in the production of dyes, drugs, paints and photographic chemicals, and in preparing <b>aqua regia</b>. Aqua regia is a mixture of nitric acid and hydrochloric acid, in a molar ratio of 1 : 3. It is a yellow-orange fuming liquid and can dissolve the noble metals gold and platinum.</p>
      <div class="cp-formula" translate="no"><small>Aqua regia</small>Nitric acid : Hydrochloric acid = 1 : 3</div>
      <div class="cp-note trap">The larger part of aqua regia is hydrochloric acid, not nitric acid. The ratio is 1 : 3 in the order nitric to hydrochloric.</div>
      <div class="cp-note exam">Aqua regia dissolves gold and platinum, which ordinary acids cannot dissolve.</div>
    `
  },
  39: {
    questext: "Aqua regia is a mixture of nitric acid and hydrochloric acid in the molar ratio",
    options: ["1 : 3", "3 : 1", "1 : 1", "2 : 3"],
    correct: "1",
    exptext: "✅ The ratio is one part nitric acid to three parts hydrochloric acid. 📌 Nitric is the smaller part. ❌ 3 : 1 reverses the acids."
  },
  40: {
    questext: "Which metals can be dissolved in aqua regia?",
    options: ["Iron and zinc", "Copper and tin", "Gold and platinum", "Sodium and potassium"],
    correct: "3",
    exptext: "✅ Aqua regia dissolves gold and platinum. 📌 Royal water dissolves the royal metals. ❌ Other metals dissolve in simple acids."
  },
  41: {
    questext: "Consider the following statements about halogens and noble gases:\n1. Halogens exist in the free state in nature.\n2. Noble gases have a completely filled valence shell.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Both 1 and 2", "Neither 1 nor 2", "Only 2"],
    correct: "4",
    exptext: "✅ Only statement 2 is correct. 📌 Halogens are too reactive to stay free. ❌ Statement 1 is wrong, because halogens occur only in combined form."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined atom model with orbiting electrons, a glass flask and a subtle periodic table grid" },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/1.png": { t: "fig", about: "A simple atom: small dense nucleus in the centre containing red protons (+) and grey neutrons (0), blue electrons (-) orbiting around it, each particle labelled." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rutherford gold foil experiment apparatus diagram photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/2.png. the gold foil experiment set-up",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/3.png": { t: "fig", about: "An atom with a full outer shell of eight electrons labelled Octet = stable, valency zero, next to an atom with one electron labelled reactive." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/4.png": { t: "fig", about: "Two boxes: Atomic number Z = number of protons; Mass number A = protons + neutrons, with a sample atom labelled Z and A." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/5.png": { t: "fig", about: "Three atoms of the same element in a row, each with the same number of protons but 6, 7 and 8 neutrons, labelled Isotopes." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"cobalt-60 radiotherapy machine hospital cancer treatment photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/6.png. a hospital cancer treatment machine",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rough diamond crystal photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/7.png. a raw diamond",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"graphite pencil lead close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/8.png. graphite in a pencil",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/9.png": { t: "fig", about: "A football-like cage of carbon atoms labelled Fullerene C60 (20 six-membered rings and 12 five-membered rings) next to a flat honeycomb sheet labelled Graphene." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/10.png": { t: "fig", about: "A red blood cell with haemoglobin bound to carbon monoxide forming carboxyhaemoglobin, with oxygen blocked from entering." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"dry ice smoking in a bowl photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/11.png. a bowl of dry ice with white fumes",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/12.png": { t: "fig", about: "A cycle showing atmospheric nitrogen, lightning and Rhizobia bacteria in root nodules converting it to nitrates in soil, then plants." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"root nodules of legume plant Rhizobium photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/13.png. pea roots with small nodules",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ozone layer earth atmosphere satellite image photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/14.png. Earth with its thin atmosphere",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/15.png": { t: "fig", about: "Sunlight with ultraviolet rays hitting a layer labelled Ozone layer (O3), with chlorofluorocarbons from refrigerators rising and breaking it." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"yellow sulphur crystals volcano crater photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/16.png. yellow sulphur around a volcanic vent",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"animal bones bone ash photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/17.png. white bones",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"chlorine gas pale green glass flask photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/18.png. pale green chlorine gas",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"iodine crystals dark purple photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/19.png. dark purple iodine crystals",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/20.png": { t: "fig", about: "Row of four halogens from top to bottom: Fluorine, Chlorine, Bromine, Iodine, with an arrow marked Oxidising power decreases." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"neon sign glowing tubes photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/21.png. glowing neon signs",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"helium balloons floating photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/22.png. colourful balloons",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/23.png": { t: "fig", about: "Two glasses of water: Temporary hardness (calcium and magnesium bicarbonates) removed by boiling; Permanent hardness (calcium and magnesium sulphates and chlorides) not removed by boiling." },
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"limescale kettle hard water deposit photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/24.png. white scale inside a kettle",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"gold nugget and platinum metal samples photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/25.png. a gold nugget",
  "images/General_Awareness/General_Science/Chemistry_Part2_Atom_and_Common_Elements/26.png": { t: "fig", about: "Two bottles labelled Nitric acid 1 part and Hydrochloric acid 3 parts pouring into one flask labelled Aqua regia, yellow-orange fuming liquid." }
});

/* CHANGE LOG
   - The charge of +1.6 x 10^-19 coulomb is written for the proton (the source placed it under the electron line).
   - Nitrogen makes up about 78 percent of air by volume (the source gave 79).
   - The unclear line about balloons filled with helium and hydrogen was left out; helium is the gas used in balloons.
   - Argon is the most abundant noble gas in the atmosphere; helium is the most abundant in the universe (spelling slips corrected).
*/
