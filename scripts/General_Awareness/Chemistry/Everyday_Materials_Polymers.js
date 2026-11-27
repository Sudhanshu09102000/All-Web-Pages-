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

/* Field: General_Awareness · Subject: Chemistry · Chapter: Chemistry_Part3_Everyday_Materials_Polymers · 14 concept pages (+ overview) · 36 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🧪", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Chemistry in Everyday Life, Materials and Polymers",
    thumb: {
      image: "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "CHEMISTRY",
      line2: "EVERYDAY MATERIALS",
      line3: "GLASS • CEMENT • POLYMERS",
      badge: "FULL CLASS",
      ribbon: "FORMULAS • USES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Chemistry in Everyday Life: Soda, Cement, Glass, Polymers | Competitive exams",
      altTitles: ["Baking Soda, Washing Soda, Plaster of Paris in One Class", "Glass, Cement and Polymers Fast Revision for Exams"],
      description: "Chemistry questions on everyday materials come in every competitive exam. In this class we learn nitric acid, baking soda, washing soda, plaster of Paris, bleaching powder, cement, glass, fertilizers, medicines, polymers and rubber in simple words.\n\n📌 IN THIS CLASS\n✅ Formulas and uses of common chemicals\n✅ Cement, glass and their varieties\n✅ Polymers, nylon, Bakelite and rubber\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Nitric Acid\n00:00 Baking Soda\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Chemistry #GeneralScience",
      tags: ["general science chemistry", "ssc cgl chemistry", "baking soda uses", "washing soda formula", "plaster of paris", "bleaching powder", "cement composition", "glass types and uses", "fertilizers in agriculture", "urea nitrogen content", "polymers chemistry", "nylon and terylene", "bakelite uses", "vulcanisation of rubber", "synthetic materials", "chemistry in everyday life", "general awareness 2026", "ssc cgl general science", "railway exam chemistry", "banking exam general science", "defence exam chemistry", "chemistry mcq", "Chemistry Part"],
      hashtags: ["SSCCGL", "Chemistry", "GeneralScience"],
      thumbText: "CHEMISTRY IN EVERYDAY LIFE",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🧪 New class is live: Soda, Cement, Glass and Polymers. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Nitric Acid\n00:00 Baking Soda\n00:00 Washing Soda\n00:00 Plaster of Paris\n00:00 Bleaching Powder\n00:00 Cement\n00:00 Glass\n00:00 Fertilizers\n00:00 Medicines\n00:00 Polymers",
      playlist: "Competitive exams General Science — Chemistry"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the useful chemicals and materials around us</u>: acids, soda, plaster, cement, glass, fertilizers, medicines, plastics and rubber. We first learn what each thing is, then why it works, and then we practise.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>14</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>36</b><span>Questions</span></div>
        <div class="cp-stat"><b>~64 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Nitric Acid</b><br>How nitric acid is made by the Ostwald process and why it is a strong oxidising agent.</li>
        <li><b>Baking Soda</b><br>What baking soda is, why baking powder is different, and how it is used in food and medicine.</li>
        <li><b>Washing Soda</b><br>The formula of washing soda and how it removes hardness of water.</li>
        <li><b>Plaster of Paris</b><br>How gypsum is heated to make plaster of Paris and why it sets hard.</li>
        <li><b>Bleaching Powder</b><br>What bleaching means and where calcium oxychloride is used.</li>
        <li><b>Synthetic Materials and Cement</b><br>How Portland cement is made, what it contains and how mortar and concrete differ.</li>
        <li><b>Glass</b><br>The raw materials of glass, the steps of making it and the colours given by metal compounds.</li>
        <li><b>Varieties of Glass and Uses</b><br>Soft, hard, flint, Pyrex, safety, optical and other glasses, with their uses.</li>
        <li><b>Fertilizers</b><br>Why urea is the best fertilizer, and what nitrolim and NPK fertilizers are.</li>
        <li><b>Pesticides</b><br>Common pesticides and the antidote for rat poison.</li>
        <li><b>Chemicals in Medicines</b><br>Pain relievers and the difference between narcotic and non-narcotic ones.</li>
        <li><b>Polymerization</b><br>What polymers are, the four classes of polymers and the important addition polymers.</li>
        <li><b>Condensation Polymerisation</b><br>Nylon, polyesters, Bakelite and melamine, and what each one is made from.</li>
        <li><b>Copolymerisation: Rubber, Rayon and Nylon</b><br>Natural and synthetic rubber, vulcanisation, rayon and the strength of nylon.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> names, formulas, raw materials and uses from this class are asked again and again in the General Science section of competitive exams, so every page ends with a short exam tip.</div>
    `
  },
  2: {
    type: "concept", icon: "🧪", accent: "#f59e0b", pauseTimer: true,
    title: "Nitric Acid",
    html: `
      <p class="cp-lead"><b>Nitric acid</b> has the formula HNO<sub>3</sub>. <u>It is a strong acid, and in industry it is made by the Ostwald process.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/1.png" alt="nitric acid bottle laboratory fuming photo" data-caption="A laboratory bottle of nitric acid, a strong and corrosive acid." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/2.png" alt="Flow diagram in rounded boxes: Ammonia and air - hot platinum gauze (catalyst) - nitric ox" data-caption="The Ostwald process changes ammonia and air into nitric acid." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">In the Ostwald process, ammonia gas is mixed with air and passed over hot platinum gauze. Platinum is the <b>catalyst</b>, which means it speeds up the reaction without being used up. Step by step, the ammonia changes into nitric acid.</p>
      <table><thead><tr><th>Property</th><th>Fact</th></tr></thead><tbody><tr><td>Pure acid</td><td>Colourless</td></tr><tr><td>Commercial acid</td><td>Yellowish, because dissolved nitrogen dioxide gas is present</td></tr><tr><td>Strength</td><td>A strong acid that breaks up readily in water</td></tr><tr><td>Basicity</td><td>Monobasic, which means one molecule gives one hydrogen ion</td></tr><tr><td>Chemical power</td><td>A strong oxidising agent</td></tr></tbody></table>
      <p class="cp-lead">When nitric acid is heated and breaks down, it gives <b>nascent oxygen</b>, which is oxygen in a very active form. This is why the acid is such a strong oxidising agent.</p>
      <div class="cp-note trap">Pure nitric acid is colourless. The yellow colour of the acid sold in shops comes only from dissolved nitrogen dioxide.</div>
      <div class="cp-note exam">Remember the three industrial processes: Ostwald gives nitric acid, Haber gives ammonia, and Contact gives sulphuric acid.</div>
      <div class="cp-mnemonic">Ostwald = Nitric, Haber = Ammonia, Contact = Sulphuric.</div>
    `
  },
  3: {
    questext: "The Ostwald process is used for the industrial manufacture of which substance?",
    options: ["Sulphuric acid", "Nitric acid", "Ammonia", "Hydrochloric acid"],
    correct: "2",
    exptext: "✅ The Ostwald process makes nitric acid from ammonia and air. 📌 Ostwald goes with nitric acid. ❌ Sulphuric acid is wrong because it is made by the Contact process."
  },
  4: {
    questext: "Which catalyst is used in the Ostwald process for nitric acid?",
    options: ["Iron", "Vanadium pentoxide", "Platinum gauze", "Nickel"],
    correct: "3",
    exptext: "✅ Hot platinum gauze is the catalyst in the Ostwald process. 📌 Nitric acid needs platinum. ❌ Vanadium pentoxide is wrong because it is the catalyst of the Contact process for sulphuric acid."
  },
  5: {
    type: "concept", icon: "🍞", accent: "#14b8a6", pauseTimer: true,
    title: "Baking Soda",
    html: `
      <p class="cp-lead"><b>Baking soda</b> is sodium hydrogen carbonate, NaHCO<sub>3</sub>. <u>It is a mild base that does not corrode, and it is made by the Solvay process.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/3.png" alt="baking soda sodium bicarbonate white powder spoon photo" data-caption="White baking soda powder, found in many kitchens." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/4.png" alt="Dough rising: a ball of dough with baking powder, small bubbles labelled carbon dioxide, a" data-caption="Carbon dioxide bubbles make dough rise." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/5.png" alt="soda acid fire extinguisher cylinder photo" data-caption="A soda acid fire extinguisher uses baking soda." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Baking soda alone is not good for cakes. When it is heated, it gives off carbon dioxide, which raises the dough, but it also leaves sodium carbonate behind. Sodium carbonate tastes bitter.</p>
      <p class="cp-lead">That is why <b>baking powder</b> is used. It is a mixture of baking soda and tartaric acid. The tartaric acid neutralises the sodium carbonate, so the bitter taste is avoided.</p>
      <table><thead><tr><th>Use</th><th>How it works</th></tr></thead><tbody><tr><td>Cooking</td><td>Used to prepare certain foods</td></tr><tr><td>Baking powder</td><td>Makes the dough rise because of carbon dioxide</td></tr><tr><td>Medicine</td><td>A mild base that neutralises extra acid in the stomach and gives relief</td></tr><tr><td>Effervescent drinks</td><td>Mixed with a solid edible acid such as citric or tartaric acid, it fizzes and helps in indigestion</td></tr><tr><td>Fire extinguisher</td><td>Used in soda acid fire extinguishers</td></tr></tbody></table>
      <div class="cp-note trap">Baking soda and baking powder are not the same. Baking powder also contains tartaric acid, which removes the bitter taste.</div>
      <div class="cp-note exam">Baking soda is NaHCO<sub>3</sub>, while washing soda is Na<sub>2</sub>CO<sub>3</sub>.10H<sub>2</sub>O. Both are linked to the Solvay process.</div>
    `
  },
  6: {
    questext: "What is the chemical name of baking soda?",
    options: ["Sodium carbonate", "Sodium hydrogen carbonate", "Sodium hydroxide", "Sodium chloride"],
    correct: "2",
    exptext: "✅ Baking soda is sodium hydrogen carbonate, NaHCO3. 📌 Hydrogen carbonate means it has one extra hydrogen. ❌ Sodium carbonate is wrong because that is washing soda in its pure form."
  },
  7: {
    questext: "Baking powder is a mixture of baking soda and which substance?",
    options: ["Tartaric acid", "Washing soda", "Common salt", "Slaked lime"],
    correct: "1",
    exptext: "✅ Baking powder contains baking soda and tartaric acid. 📌 The acid cancels the bitter taste. ❌ Washing soda is wrong because it is a different, stronger base and would make food taste worse."
  },
  8: {
    questext: "Consider the following statements about baking soda:\n1. Baking soda is a mild and non-corrosive base.\n2. Baking soda alone, when heated, leaves sodium carbonate that gives a bitter taste.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Baking soda is a mild base, and heating it leaves bitter sodium carbonate. 📌 Mild base, bitter leftover. ❌ Choosing only one statement misses either the mild base or the bitter taste."
  },
  9: {
    type: "concept", icon: "🧼", accent: "#84cc16", pauseTimer: true,
    title: "Washing Soda",
    html: `
      <p class="cp-lead"><b>Washing soda</b> is sodium carbonate decahydrate, Na<sub>2</sub>CO<sub>3</sub>.10H<sub>2</sub>O. <u>The word decahydrate tells us that every unit holds ten molecules of water.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/6.png" alt="washing soda sodium carbonate crystals photo" data-caption="Washing soda forms clear crystals that feel slightly rough." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/7.png" alt="Side by side comparison cards: Baking soda with formula NaHCO3 and mild base; Washing soda" data-caption="Baking soda and washing soda are different substances." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Washing soda is obtained by crystallising the sodium carbonate that the Solvay process gives. It is a stronger base than baking soda, so it is a good cleaning chemical.</p>
      <table><thead><tr><th>Use</th><th>Why it is used</th></tr></thead><tbody><tr><td>Making caustic soda, glass, soap powders, borax and paper</td><td>It is a basic raw material for these industries</td></tr><tr><td>Removing permanent hardness of water</td><td>It removes the calcium and magnesium salts that boiling cannot remove</td></tr><tr><td>Cleaning at home</td><td>It is a cleansing agent for domestic use</td></tr></tbody></table>
      <p class="cp-lead">Hard water does not make lather easily with soap. Washing soda makes the hardness settle out, so the water becomes soft and the soap works well.</p>
      <div class="cp-note trap">Do not mix the two sodas. Baking soda is sodium hydrogen carbonate and is eaten in food; washing soda is sodium carbonate with ten water molecules and is used for cleaning.</div>
      <div class="cp-note exam">A common question asks which chemical removes permanent hardness of water. The answer is washing soda.</div>
    `
  },
  10: {
    questext: "What is the formula of washing soda?",
    options: ["NaHCO3", "NaOH", "CaCO3", "Na2CO3.10H2O"],
    correct: "4",
    exptext: "✅ Washing soda is Na2CO3.10H2O, which is sodium carbonate with ten water molecules. 📌 Deca means ten. ❌ NaHCO3 is wrong because that is baking soda."
  },
  11: {
    questext: "Which chemical is used to remove permanent hardness of water?",
    options: ["Washing soda", "Baking soda", "Gypsum", "Bleaching powder"],
    correct: "1",
    exptext: "✅ Washing soda removes the calcium and magnesium salts that cause permanent hardness. 📌 Washing soda, washing water. ❌ Baking soda is wrong because it is a milder base used in food and medicine."
  },
  12: {
    type: "concept", icon: "🩹", accent: "#e11d48", pauseTimer: true,
    title: "Plaster of Paris",
    html: `
      <p class="cp-lead"><b>Plaster of Paris</b> is also called POP. <u>Its chemical name is calcium sulphate hemihydrate, with the formula CaSO<sub>4</sub>.½H<sub>2</sub>O.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/8.png" alt="gypsum mineral rock specimen photo" data-caption="Gypsum is the natural rock from which plaster of Paris is made." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/9.png" alt="plaster cast on broken arm photo" data-caption="A plaster cast holds a broken bone in place while it heals." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/10.png" alt="Reaction picture: gypsum with two water molecules - heat to 120 degrees Celsius - plaster " data-caption="Heating gypsum drives off most of its water to give plaster of Paris." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The raw material is <b>gypsum</b>, CaSO<sub>4</sub>.2H<sub>2</sub>O. When gypsum is heated up to 120 degrees Celsius, it loses most of its water of crystallisation and becomes plaster of Paris. Plaster of Paris is a white powder.</p>
      <p class="cp-lead">When water is added, the powder sets into a hard mass. This is why it can be shaped first and then left to harden.</p>
      <table><thead><tr><th>Use</th><th>Example</th></tr></thead><tbody><tr><td>Casts and moulds</td><td>Toys and statues</td></tr><tr><td>Medicine</td><td>Plaster casts that hold fractured bones in place, and casts in dentistry</td></tr><tr><td>Building</td><td>Making the surface of walls and ceilings smooth</td></tr><tr><td>Writing</td><td>Making chalk for the blackboard</td></tr><tr><td>Safety</td><td>Making fire proof materials</td></tr></tbody></table>
      <div class="cp-note trap">Gypsum has two molecules of water, but plaster of Paris has only half a molecule. Do not mix up the two numbers.</div>
      <div class="cp-note exam">POP is made by heating gypsum to 120 degrees Celsius; it is used for bone casts, statues and smooth walls.</div>
    `
  },
  13: {
    questext: "Chemically, plaster of Paris is which substance?",
    options: ["Calcium sulphate dihydrate", "Calcium sulphate hemihydrate", "Calcium carbonate", "Calcium oxide"],
    correct: "2",
    exptext: "✅ Plaster of Paris is calcium sulphate hemihydrate, with half a water molecule. 📌 Hemi means half. ❌ Calcium sulphate dihydrate is wrong because that is gypsum with two water molecules."
  },
  14: {
    questext: "Plaster of Paris is prepared by heating which substance?",
    options: ["Limestone", "Quicklime", "Gypsum", "Marble"],
    correct: "3",
    exptext: "✅ Gypsum, when heated to about 120 degrees Celsius, becomes plaster of Paris. 📌 Gypsum gives plaster. ❌ Limestone is wrong because it is calcium carbonate and gives quicklime, not plaster."
  },
  15: {
    type: "concept", icon: "🧴", accent: "#0ea5e9", pauseTimer: true,
    title: "Bleaching Powder",
    html: `
      <p class="cp-lead"><b>Bleaching</b> means removing colour from a cloth to make it whiter. <u>The chemical used for this is bleaching powder, whose chemical name is calcium oxychloride, CaOCl<sub>2</sub>.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/11.png" alt="bleaching powder chlorine pack photo" data-caption="Bleaching powder is a white powder with a sharp smell of chlorine." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/12.png" alt="Four small icons with labels: cotton cloth, wood pulp, drinking water tank, wool yarn, eac" data-caption="Bleaching powder cleans cloth and pulp and makes water safe." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Bleaching powder is made by the Hasen-Clever method. It works as an <b>oxidising agent</b>, which means it destroys coloured substances and germs.</p>
      <table><thead><tr><th>Use</th><th>Why</th></tr></thead><tbody><tr><td>Bleaching cotton, linen and wood pulp</td><td>It removes colour and makes them whiter</td></tr><tr><td>Making wool unshrinkable</td><td>It treats the wool so that it keeps its size</td></tr><tr><td>Sterilising water</td><td>It is a disinfectant and germicide</td></tr><tr><td>Making chloroform</td><td>It is a raw chemical for chloroform</td></tr><tr><td>Chemical industry</td><td>It is used as an oxidising agent</td></tr></tbody></table>
      <div class="cp-note trap">Bleaching powder is used for bleaching and disinfecting. Baking soda is used for cooking and medicine, so do not mix up their uses.</div>
      <div class="cp-note exam">Bleaching powder is calcium oxychloride, CaOCl<sub>2</sub>, and it is made by the Hasen-Clever method.</div>
    `
  },
  16: {
    questext: "What is the chemical name of bleaching powder?",
    options: ["Calcium chloride", "Calcium carbonate", "Calcium sulphate", "Calcium oxychloride"],
    correct: "4",
    exptext: "✅ Bleaching powder is calcium oxychloride, CaOCl2. 📌 It has oxygen and chlorine, and that is why it bleaches. ❌ Calcium sulphate is wrong because that is gypsum."
  },
  17: {
    questext: "Which of the following is NOT a use of bleaching powder?",
    options: ["Making baking powder", "Bleaching cotton and linen", "Sterilising drinking water", "Making wool unshrinkable"],
    correct: "1",
    exptext: "✅ Baking powder is made from baking soda and tartaric acid, not bleaching powder. 📌 Bleaching powder cleans and kills germs. ❌ Sterilising water is wrong because it is a main use of bleaching powder."
  },
  18: {
    type: "concept", icon: "🏗️", accent: "#fb7185", pauseTimer: true,
    title: "Synthetic Materials and Cement",
    html: `
      <p class="cp-lead">Materials that people make from natural materials are called <b>synthetic materials</b>. <u>Cement is one of the most important of them.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/13.png" alt="Portland cement bag construction site photo" data-caption="A bag of Portland cement, the most common building binder." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/14.png" alt="Pie chart of Portland cement: Calcium oxide 60 to 70 percent, Silica 20 to 25 percent, Alu" data-caption="Calcium oxide is the largest part of Portland cement." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/15.png" alt="reinforced concrete steel bars construction beam photo" data-caption="Iron rods inside concrete make reinforced concrete." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Cement was discovered in 1824 by an English mason, Joseph Aspdin. He named it <b>Portland cement</b> because he thought it looked like the limestone found at Portland.</p>
      <table><thead><tr><th>Compound</th><th>Share in Portland cement</th></tr></thead><tbody><tr><td>Calcium oxide</td><td>60 to 70 percent</td></tr><tr><td>Silica</td><td>20 to 25 percent</td></tr><tr><td>Alumina</td><td>5 to 10 percent</td></tr><tr><td>Ferric oxide</td><td>2 to 3 percent</td></tr></tbody></table>
      <p class="cp-lead">The raw materials are limestone, which gives lime, clay, which gives alumina and silica, and gypsum, which slows down the setting so that workers have time to use the cement.</p>
      <p class="cp-lead">When water is mixed with cement and left alone, it turns into a hard mass. This is called the <b>setting</b> of cement. Setting gives out heat, so cement structures must be kept wet by sprinkling water for up to seven days.</p>
      <table><thead><tr><th>Mixture</th><th>Made of</th><th>Use</th></tr></thead><tbody><tr><td>Mortar</td><td>Cement, sand and water</td><td>Plastering walls and joining bricks and stones</td></tr><tr><td>Concrete</td><td>Cement, sand, gravel or small stones and water</td><td>Building floors</td></tr><tr><td>Reinforced concrete</td><td>Concrete with iron rods fixed in it while it is wet</td><td>Strong beams and pillars</td></tr></tbody></table>
      <div class="cp-note trap">Gypsum does not make cement set faster. It slows the setting down, and it is the clay that gives alumina and silica.</div>
      <div class="cp-note exam">Remember Joseph Aspdin, 1824, Portland cement, and the main part, calcium oxide, at 60 to 70 percent.</div>
    `
  },
  19: {
    questext: "Who discovered Portland cement, and in which year?",
    options: ["Joseph Priestley, 1774", "Joseph Aspdin, 1824", "John Dalton, 1803", "Antoine Lavoisier, 1744"],
    correct: "2",
    exptext: "✅ Joseph Aspdin, an English mason, discovered Portland cement in 1824. 📌 Aspdin and 1824 go together. ❌ Joseph Priestley is wrong because he is known for discovering oxygen, not cement."
  },
  20: {
    questext: "Why is gypsum added to cement?",
    options: ["To provide lime", "To provide silica", "To slow down the setting", "To give red colour"],
    correct: "3",
    exptext: "✅ Gypsum slows down the setting of cement, so there is time to use it. 📌 Gypsum gives time. ❌ Lime is wrong because lime comes from limestone."
  },
  21: {
    questext: "For how many days should cement structures be kept wet to cool them?",
    options: ["One day", "Two days", "Three days", "Seven days"],
    correct: "4",
    exptext: "✅ Setting gives out heat, so structures are sprinkled with water for up to seven days. 📌 One week of water. ❌ Three days is wrong because that is too short for cement to cool fully."
  },
  22: {
    type: "concept", icon: "🔮", accent: "#0891b2", pauseTimer: true,
    title: "Glass",
    html: `
      <p class="cp-lead">Common glass has the formula Na<sub>2</sub>O.CaO.6SiO<sub>2</sub>. <u>It is a hard, see-through material that is made of silicates, and it is often called a supercooled liquid.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/16.png" alt="molten glass glassblowing furnace photo" data-caption="Molten glass glows orange hot before it is shaped." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/17.png" alt="Flow diagram: sodium carbonate, calcium carbonate and sand - batch - mixed with cullet - f" data-caption="Raw materials are mixed, melted and then cooled slowly." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/18.png" alt="stained coloured glass window photo" data-caption="Metal compounds give glass bright colours." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The raw materials are sodium carbonate, calcium carbonate and sand. The finely powdered mixture is called the <b>batch</b>. It is mixed with <b>cullet</b>, which means broken pieces of glass, and fused in a tank furnace at 1673 kelvin. After a few hours molten glass is obtained.</p>
      <p class="cp-lead">Molten glass is cooled slowly and evenly. This slow and uniform cooling is called <b>annealing</b>. It removes stress, so the glass does not crack easily.</p>
      <table><thead><tr><th>Substance added</th><th>Colour of glass</th></tr></thead><tbody><tr><td>Cuprous oxide</td><td>Red</td></tr><tr><td>Cupric oxide</td><td>Peacock blue</td></tr><tr><td>Potassium dichromate</td><td>Green or greenish yellow</td></tr><tr><td>Ferrous oxide</td><td>Green</td></tr><tr><td>Ferric oxide</td><td>Brown</td></tr><tr><td>Manganese dioxide</td><td>Light pink, and black in excess</td></tr><tr><td>Cobalt oxide</td><td>Blue</td></tr><tr><td>Gold chloride</td><td>Ruby</td></tr><tr><td>Cadmium</td><td>Yellow</td></tr><tr><td>Carbon</td><td>Amber</td></tr></tbody></table>
      <div class="cp-note trap">Cuprous oxide gives red glass, but cupric oxide gives peacock blue. Cobalt oxide also gives blue, so do not choose it for red.</div>
      <div class="cp-note exam">Remember three words: batch, cullet and annealing. Remember also red for cuprous oxide and blue for cobalt oxide.</div>
    `
  },
  23: {
    questext: "What is the slow and uniform cooling of molten glass called?",
    options: ["Fusing", "Annealing", "Etching", "Vulcanisation"],
    correct: "2",
    exptext: "✅ Slow and uniform cooling of molten glass is called annealing. 📌 Anneal means to cool slowly. ❌ Fusing is wrong because it means melting the batch together."
  },
  24: {
    questext: "Which substance gives a red colour to glass?",
    options: ["Cobalt oxide", "Ferrous oxide", "Cuprous oxide", "Cupric oxide"],
    correct: "3",
    exptext: "✅ Cuprous oxide gives red glass. 📌 Cuprous means copper with one charge, and it gives red. ❌ Cupric oxide is wrong because it gives peacock blue glass."
  },
  25: {
    questext: "Consider the following statements about glass:\n1. Glass is made by melting a batch of sodium carbonate, calcium carbonate and sand, mixed with broken glass called cullet.\n2. Molten glass is cooled very quickly so that it becomes strong.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Glass needs slow cooling. ❌ Statement 2 is wrong because quick cooling leaves stress, and slow cooling called annealing makes the glass strong."
  },
  26: {
    type: "concept", icon: "🔬", accent: "#ec4899", pauseTimer: true,
    title: "Varieties of Glass and Uses",
    html: `
      <p class="cp-lead"><b>Different kinds of glass</b> are made by changing the raw materials. <u>Each kind is chosen for a special use.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/19.png" alt="Pyrex borosilicate glass laboratory beaker photo" data-caption="Pyrex laboratory glassware is made of borosilicate glass." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/20.png" alt="optical fibre cable glowing strands photo" data-caption="Optical fibres carry light signals for telecommunication." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/21.png" alt="Three layered sandwich: glass layer, plastic layer, glass layer, joined by heat and pressu" data-caption="Safety glass has three layers joined together." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Glass</th><th>Special feature</th><th>Use</th></tr></thead><tbody><tr><td>Soft glass</td><td>Mixture of sodium or calcium silicates</td><td>Window glass, mirrors and common glass ware</td></tr><tr><td>Hard glass</td><td>Mixture of potassium and calcium silicates, resists acids</td><td>Hard glass apparatus</td></tr><tr><td>Flint glass</td><td>Sodium, potassium and lead silicates</td><td>Bulbs and optical instruments</td></tr><tr><td>Pyrex glass</td><td>Borosilicate glass</td><td>Pharmaceutical containers, laboratory apparatus and oven ware</td></tr><tr><td>Quartz glass</td><td>Silica glass</td><td>Chemical apparatus and optical instruments</td></tr><tr><td>Crookes glass</td><td>Absorbs ultraviolet rays</td><td>Lenses for spectacles</td></tr><tr><td>Photochromatic glass</td><td>Darkens in bright light</td><td>Sun shield</td></tr><tr><td>Safety glass</td><td>Three layers joined by heat and pressure</td><td>Windshields of vehicles</td></tr><tr><td>Optical glass</td><td>Clear and smooth</td><td>Lenses of microscopes, telescopes and spectacles</td></tr><tr><td>Glass fibres</td><td>Do not conduct heat</td><td>Insulation in ovens and refrigerators</td></tr><tr><td>Optical fibres</td><td>Carry light, even round corners</td><td>Telecommunication and surgery</td></tr><tr><td>Lead crystal glass</td><td>High refractive index</td><td>Expensive glass ware</td></tr></tbody></table>
      <p class="cp-lead"><b>Etching of glass</b> means cutting designs on its surface. Glass is attacked by hydrofluoric acid, so this acid is used for etching.</p>
      <div class="cp-note trap">Pyrex is borosilicate glass, not flint glass. Flint glass contains lead silicates and is used in bulbs and optical instruments.</div>
      <div class="cp-note exam">Remember: photochromatic glass darkens in light, safety glass has three layers, and hydrofluoric acid etches glass.</div>
    `
  },
  27: {
    questext: "Which glass is also known as borosilicate glass and is used for laboratory apparatus and oven ware?",
    options: ["Pyrex glass", "Flint glass", "Soft glass", "Crookes glass"],
    correct: "1",
    exptext: "✅ Pyrex glass is borosilicate glass and resists heat. 📌 Pyrex means lab and kitchen glass. ❌ Flint glass is wrong because it contains lead silicates and is used for bulbs and optical instruments."
  },
  28: {
    questext: "Which acid is used for the etching of glass?",
    options: ["Hydrochloric acid", "Nitric acid", "Sulphuric acid", "Hydrofluoric acid"],
    correct: "4",
    exptext: "✅ Hydrofluoric acid attacks glass, so it is used for etching. 📌 Fluoric is the glass biter. ❌ Hydrochloric acid is wrong because glass does not react with it."
  },
  29: {
    type: "concept", icon: "🌾", accent: "#854d0e", pauseTimer: true,
    title: "Fertilizers",
    html: `
      <p class="cp-lead"><b>Fertilizers</b> are chemicals added to soil to give plants the food they need. <u>Urea is the best nitrogen fertilizer.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/22.png" alt="urea fertilizer white granules photo" data-caption="Urea fertilizer comes as small white granules." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/23.png" alt="NPK fertilizer bag granules photo" data-caption="A bag of fertilizer that mixes three plant nutrients." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/24.png" alt="Three jars labelled Nitrogen, Phosphorus and Potassium, with the words NPK fertilizer join" data-caption="NPK fertilizer mixes nitrogen, phosphorus and potassium." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Urea is the best fertilizer because it leaves only carbon dioxide behind after plants have used the ammonia from it. It has 46.6 percent nitrogen, and it does not change the acidity of the soil.</p>
      <table><thead><tr><th>Fertilizer</th><th>Fact</th></tr></thead><tbody><tr><td>Urea</td><td>Best fertilizer, with 46.6 percent nitrogen, and it does not change soil pH</td></tr><tr><td>Nitrolim</td><td>Mixture of calcium cyanamide and carbon</td></tr><tr><td>Calcium nitrate</td><td>Sold under the name Norwegian saltpetre</td></tr><tr><td>NPK fertilizers</td><td>Mixture of nitrogenous, phosphatic and potash fertilizers in suitable amounts</td></tr><tr><td>Ammonium salts</td><td>Used as fertilizers</td></tr></tbody></table>
      <div class="cp-note trap">Norwegian saltpetre is calcium nitrate. Chile saltpetre is sodium nitrate, so do not mix the two.</div>
      <div class="cp-note exam">Urea has the highest nitrogen content, 46.6 percent, among common fertilizers. NPK stands for nitrogen, phosphorus and potassium.</div>
    `
  },
  30: {
    questext: "What is the approximate nitrogen content of urea?",
    options: ["16.6 percent", "26.6 percent", "36.6 percent", "46.6 percent"],
    correct: "4",
    exptext: "✅ Urea has 46.6 percent nitrogen, which is the highest among common fertilizers. 📌 Say forty six point six. ❌ 26.6 percent is wrong because that value is too low for urea."
  },
  31: {
    questext: "Nitrolim is a mixture of which substances?",
    options: ["Calcium cyanamide and carbon", "Calcium nitrate and carbon", "Calcium carbonate and urea", "Ammonium nitrate and lime"],
    correct: "1",
    exptext: "✅ Nitrolim is a mixture of calcium cyanamide and carbon. 📌 Nitro plus lim for lime and carbon. ❌ Calcium nitrate is wrong because that is Norwegian saltpetre, not nitrolim."
  },
  32: {
    questext: "Calcium nitrate is commercially known by which name?",
    options: ["Chile saltpetre", "Norwegian saltpetre", "Indian saltpetre", "Nitrolim"],
    correct: "2",
    exptext: "✅ Calcium nitrate is sold as Norwegian saltpetre. 📌 Norway and calcium go together. ❌ Chile saltpetre is wrong because that is sodium nitrate."
  },
  33: {
    type: "concept", icon: "🐛", accent: "#10b981", pauseTimer: true,
    title: "Pesticides",
    html: `
      <p class="cp-lead"><b>Pesticides</b> are chemicals that are applied to crops to kill pests such as insects. <u>Common examples are Dichloro diphenyl trichloroethane (DDT) and malathion.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/25.png" alt="farmer spraying pesticide on crop field photo" data-caption="A farmer sprays pesticide to protect a crop from pests." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/26.png" alt="malathion insecticide bottle photo" data-caption="Malathion is a commonly used insecticide." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Some poisons are meant for rats, not insects. <b>Difethialone</b> is a rat poison that stops blood from clotting. A person or pet that eats it by mistake can bleed badly.</p>
      <p class="cp-lead">Vitamin K helps the blood to clot. It has been used successfully as an antidote for pets and humans who are exposed to such blood-thinning poisons, whether by accident or on purpose.</p>
      <div class="cp-note trap">Do not confuse pesticides with medicines. Aspirin and paracetamol are medicines, while malathion and Dichloro diphenyl trichloroethane are pesticides.</div>
      <div class="cp-note exam">The antidote for rat poisons that stop blood clotting is vitamin K.</div>
    `
  },
  34: {
    questext: "Which of the following is a pesticide?",
    options: ["Aspirin", "Paracetamol", "Malathion", "Urea"],
    correct: "3",
    exptext: "✅ Malathion is a pesticide used on crops. 📌 Mal-athion kills pests. ❌ Urea is wrong because it is a fertilizer that feeds plants."
  },
  35: {
    questext: "Which vitamin is used as an antidote for blood-thinning rat poisons such as difethialone?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    correct: "4",
    exptext: "✅ Vitamin K helps the blood to clot and works as the antidote. 📌 K stands for Koagulation, the German spelling of clotting. ❌ Vitamin C is wrong because it does not help the blood to clot."
  },
  36: {
    type: "concept", icon: "💊", accent: "#d946ef", pauseTimer: true,
    title: "Chemicals in Medicines",
    html: `
      <p class="cp-lead">Medicines that <b>reduce pain</b> are called <b>analgesics</b>, or pain relievers. <u>They are of two kinds: non-narcotic and narcotic.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/27.png" alt="aspirin tablets blister pack photo" data-caption="Aspirin tablets are a common non-narcotic pain reliever." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/28.png" alt="Simple tree: Analgesics split into Non-narcotic (aspirin, paracetamol) and Narcotic (stron" data-caption="Analgesics are divided into non-narcotic and narcotic kinds." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Kind</th><th>Examples and use</th></tr></thead><tbody><tr><td>Non-narcotic analgesics</td><td>Aspirin and paracetamol, which reduce ordinary pain</td></tr><tr><td>Aspirin</td><td>Also reduces fever and prevents platelets in blood from clumping</td></tr><tr><td>Narcotic analgesics</td><td>Used for pain after operations, heart pain, pain of terminal cancer and pain in childbirth</td></tr></tbody></table>
      <p class="cp-lead">Narcotic analgesics are strong medicines and they are given only for severe pain. Non-narcotic analgesics are milder and are used for common pain.</p>
      <div class="cp-note trap">Aspirin is a non-narcotic medicine, even though it also thins the blood by stopping platelets from clumping.</div>
      <div class="cp-note exam">Remember: aspirin and paracetamol are non-narcotic analgesics.</div>
    `
  },
  37: {
    questext: "Which pair consists of non-narcotic analgesics?",
    options: ["Aspirin and paracetamol", "Morphine and codeine", "Penicillin and aspirin", "Paracetamol and morphine"],
    correct: "1",
    exptext: "✅ Aspirin and paracetamol are non-narcotic pain relievers. 📌 Common pain pills are non-narcotic. ❌ Morphine and codeine are wrong because they are narcotic analgesics."
  },
  38: {
    questext: "Narcotic analgesics are chiefly used for which purpose?",
    options: ["Reducing fever", "Relief of severe pain after operations, in terminal cancer and in childbirth", "Preventing platelets from clumping", "Killing germs"],
    correct: "2",
    exptext: "✅ Narcotic analgesics relieve severe pain, such as after operations and in terminal cancer. 📌 Narcotic means strong pain relief. ❌ Preventing platelet clumping is wrong because that is a property of aspirin."
  },
  39: {
    type: "concept", icon: "🧬", accent: "#2dd4bf", pauseTimer: true,
    title: "Polymerization",
    html: `
      <p class="cp-lead"><b>Polymers</b> are very large molecules made of many small repeating units called <b>monomers</b>. <u>Polymerization is the process that joins the monomers together.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/29.png" alt="polythene plastic bags roll photo" data-caption="Polythene is a polymer made from ethene." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/30.png" alt="Teflon non stick frying pan photo" data-caption="Teflon coats non stick pans because little sticks to it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/31.png" alt="Tree diagram: Polymers split into Elastomers (rubber), Fibres (nylon, polyester), Thermopl" data-caption="Polymers are sorted into four classes by their intermolecular forces." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Polymers also occur in nature. Cotton is a natural polymer called cellulose, and cellulose is made of a very large number of glucose units.</p>
      <table><thead><tr><th>Class</th><th>Examples</th><th>Feature</th></tr></thead><tbody><tr><td>Elastomers</td><td>Rubber, buna-S, buna-N, neoprene</td><td>Stretch and return to shape</td></tr><tr><td>Fibres</td><td>Nylon 6,6, polyesters</td><td>Strong threads</td></tr><tr><td>Thermoplastic polymers</td><td>Polythene, polyvinyl chloride (PVC), polystyrene</td><td>Soften on heating and can be bent again</td></tr><tr><td>Thermosetting polymers</td><td>Bakelite, melamine</td><td>Once moulded, they cannot be softened by heating</td></tr></tbody></table>
      <table><thead><tr><th>Polymer</th><th>How it is made</th></tr></thead><tbody><tr><td>Low density polythene</td><td>Polymerization of ethene at high pressure with traces of oxygen or a peroxide as the starter</td></tr><tr><td>High density polythene</td><td>Polymerization of ethene with a Ziegler-Natta catalyst, which is triethylaluminium with titanium tetrachloride</td></tr><tr><td>Teflon</td><td>Heating tetrafluoroethene with a free radical or persulphate starter at high pressure</td></tr><tr><td>Polyacrylonitrile</td><td>Polymerization of acrylonitrile with a peroxide starter</td></tr></tbody></table>
      <div class="cp-note trap">Polythene is a thermoplastic, so it can be softened again. Bakelite and melamine are thermosetting, so they cannot.</div>
      <div class="cp-note exam">Remember: Teflon comes from tetrafluoroethene, and cotton is cellulose, which is made of glucose units.</div>
      <div class="cp-mnemonic">Thermo-PLASTIC bends again; thermo-SETTING stays set.</div>
    `
  },
  40: {
    questext: "Cellulose, the natural polymer in cotton, is made of many units of which substance?",
    options: ["Amino acids", "Glucose", "Fructose", "Ethene"],
    correct: "2",
    exptext: "✅ Cellulose is made of a large number of glucose units. 📌 Cotton is a chain of glucose. ❌ Amino acids are wrong because they make proteins, not cellulose."
  },
  41: {
    questext: "Which of the following is a thermosetting plastic?",
    options: ["Polythene", "Polyvinyl chloride", "Polystyrene", "Bakelite"],
    correct: "4",
    exptext: "✅ Bakelite is thermosetting, so it cannot be softened again once moulded. 📌 Bakelite stays set. ❌ Polythene is wrong because it is a thermoplastic that softens on heating."
  },
  42: {
    questext: "Teflon is a polymer of which substance?",
    options: ["Tetrafluoroethene", "Chloroprene", "Acrylonitrile", "Ethene"],
    correct: "1",
    exptext: "✅ Teflon is made by polymerizing tetrafluoroethene. 📌 Tetra fluoro means four fluorine atoms. ❌ Ethene is wrong because it makes polythene."
  },
  43: {
    type: "concept", icon: "🧵", accent: "#ef4444", pauseTimer: true,
    title: "Condensation Polymerisation",
    html: `
      <p class="cp-lead">In <b>condensation polymerisation</b>, small molecules join and give out a small molecule such as water. <u>Nylon, polyesters, Bakelite and melamine are made this way.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/32.png" alt="nylon rope climbing parachute photo" data-caption="Nylon is strong enough for ropes and parachutes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/33.png" alt="Bakelite vintage telephone photo" data-caption="Bakelite was used for telephones, switches and handles." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/34.png" alt="melamine crockery plates unbreakable photo" data-caption="Melamine is used for unbreakable crockery." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Polymer</th><th>Made from</th><th>Main use</th></tr></thead><tbody><tr><td>Nylon 6,6</td><td>Hexamethylenediamine and adipic acid, heated under high pressure</td><td>Fibres, ropes, parachutes</td></tr><tr><td>Nylon 6</td><td>Caprolactam heated with water at a high temperature</td><td>Fibres</td></tr><tr><td>Terylene, a polyester</td><td>Ethylene glycol and terephthalic acid</td><td>Dress material that does not wrinkle easily</td></tr><tr><td>Bakelite</td><td>Phenol and formaldehyde, with an acid or a base as catalyst</td><td>Combs, records, electrical switches, handles</td></tr><tr><td>Melamine</td><td>Melamine and formaldehyde</td><td>Floor tiles, kitchenware, fire resistant fabrics, unbreakable crockery</td></tr></tbody></table>
      <p class="cp-lead"><b>Polyamides</b> have amide links, and nylon is the best known polyamide. <b>Polyesters</b> are made from acids with two acid groups and from alcohols with two alcohol groups. Fabric made from polyester stays crisp and is easy to wash.</p>
      <p class="cp-lead">Phenol and formaldehyde first give a straight chain called <b>novolac</b>, which is used in paints. When novolac is heated with more formaldehyde, the chains cross link and form the hard, infusible solid called <b>Bakelite</b>.</p>
      <div class="cp-note trap">Nylon 6,6 and nylon 6 are not made from the same raw materials. Nylon 6 comes from caprolactam alone, while nylon 6,6 needs two chemicals.</div>
      <div class="cp-note exam">Terylene is the best known polyester; Bakelite comes from phenol and formaldehyde; melamine resists fire.</div>
    `
  },
  44: {
    questext: "Nylon 6,6 is prepared from which pair of substances?",
    options: ["Phenol and formaldehyde", "Ethylene glycol and terephthalic acid", "Hexamethylenediamine and adipic acid", "Isoprene and sulphur"],
    correct: "3",
    exptext: "✅ Nylon 6,6 is made from hexamethylenediamine and adipic acid. 📌 Two sixes mean two six carbon chemicals. ❌ Ethylene glycol and terephthalic acid are wrong because they make Terylene."
  },
  45: {
    questext: "Terylene is an example of which type of polymer?",
    options: ["Polyamide", "Phenol formaldehyde polymer", "Elastomer", "Polyester"],
    correct: "4",
    exptext: "✅ Terylene is the best known polyester. 📌 Terylene, Ter, Ester. ❌ Polyamide is wrong because that is the family of nylon."
  },
  46: {
    questext: "Bakelite is prepared by the condensation of which pair of substances?",
    options: ["Phenol and formaldehyde", "Hexamethylenediamine and adipic acid", "Ethene and oxygen", "Chloroprene and sulphur"],
    correct: "1",
    exptext: "✅ Bakelite is made from phenol and formaldehyde with an acid or a base as catalyst. 📌 Phenol with formaldehyde gives Bakelite. ❌ Hexamethylenediamine with adipic acid is wrong because it gives nylon 6,6."
  },
  47: {
    questext: "Consider the following statements about plastics:\n1. Polythene is a thermosetting plastic.\n2. Bakelite cannot be softened again once it has been moulded.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct because Bakelite is thermosetting. 📌 Setting means it stays set. ❌ Statement 1 is wrong because polythene is a thermoplastic that can be softened again."
  },
  48: {
    type: "concept", icon: "🛞", accent: "#f97316", pauseTimer: true,
    title: "Copolymerisation: Rubber, Rayon and Nylon",
    html: `
      <p class="cp-lead"><b>Natural rubber</b> is a long chain polymer of a small molecule called isoprene. <u>Its other name is cis-1,4-polyisoprene.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/35.png" alt="rubber tree latex tapping photo" data-caption="Latex is collected from rubber trees by tapping the bark." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/36.png" alt="Before and after: a soft sticky rubber chain, then sulphur bridges joining the chains, giv" data-caption="Sulphur bridges between chains make rubber tough and stretchy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/37.png" alt="rayon fabric artificial silk photo" data-caption="Rayon is a shiny man made fibre from wood pulp." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Raw rubber is soft and sticky. In <b>vulcanisation</b>, raw rubber is heated with sulphur and a suitable additive at 373 to 415 kelvin. The rubber then becomes stiffer, stronger and more elastic.</p>
      <table><thead><tr><th>Material</th><th>Fact</th></tr></thead><tbody><tr><td>Natural rubber</td><td>Polymer of isoprene, also called cis-1,4-polyisoprene</td></tr><tr><td>Vulcanisation</td><td>Heating raw rubber with sulphur at 373 to 415 kelvin</td></tr><tr><td>Neoprene</td><td>Synthetic rubber made by free radical polymerisation of chloroprene</td></tr><tr><td>Rayon</td><td>Artificial silk made from wood pulp, so it is a man made fibre</td></tr><tr><td>Nylon</td><td>Used for parachutes and rock climbing ropes, and a nylon thread is stronger than a steel wire of the same thickness</td></tr></tbody></table>
      <p class="cp-lead">Rayon starts from a natural source, wood pulp, but it is changed by people into a fibre. That is why it is called a man made fibre.</p>
      <div class="cp-note trap">Neoprene comes from chloroprene, while natural rubber comes from isoprene. The two names look alike, so read them carefully.</div>
      <div class="cp-note exam">Remember: vulcanisation uses sulphur, neoprene is made from chloroprene, and rayon is made from wood pulp.</div>
      <div class="cp-mnemonic">Vulcanise with Sulphur; Rayon from wood pulp.</div>
    `
  },
  49: {
    questext: "Natural rubber is a polymer of which substance?",
    options: ["Ethene", "Isoprene", "Chloroprene", "Glucose"],
    correct: "2",
    exptext: "✅ Natural rubber is a polymer of isoprene. 📌 Isoprene is the natural one. ❌ Chloroprene is wrong because it is the monomer of the synthetic rubber neoprene."
  },
  50: {
    questext: "Vulcanisation of rubber is the process of heating raw rubber with which substance?",
    options: ["Carbon", "Chlorine", "Sulphur", "Zinc"],
    correct: "3",
    exptext: "✅ Raw rubber is heated with sulphur at 373 to 415 kelvin, which makes it stiffer. 📌 Vulcan means sulphur here. ❌ Zinc is wrong because zinc is used to coat iron in galvanisation."
  },
  51: {
    questext: "Rayon, also called artificial silk, is obtained from which natural source?",
    options: ["Silkworm cocoons", "Petroleum", "Cotton seeds", "Wood pulp"],
    correct: "4",
    exptext: "✅ Rayon is made from wood pulp and is a man made fibre. 📌 Rayon grows from wood. ❌ Silkworm cocoons are wrong because they give real silk, not rayon."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a clear laboratory flask with coloured liquid, small lumps of white plaster and grey cement, and a delicate molecular chain model" },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"nitric acid bottle laboratory fuming photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/1.png. a labelled laboratory bottle of nitric acid",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/2.png": { t: "fig", about: "Flow diagram in rounded boxes: Ammonia and air -> hot platinum gauze (catalyst) -> nitric oxide -> nitrogen dioxide -> dissolved in water -> nitric acid." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"baking soda sodium bicarbonate white powder spoon photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/3.png. white baking soda powder in a spoon",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/4.png": { t: "fig", about: "Dough rising: a ball of dough with baking powder, small bubbles labelled carbon dioxide, and a risen loaf beside it." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"soda acid fire extinguisher cylinder photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/5.png. an old soda acid fire extinguisher",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"washing soda sodium carbonate crystals photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/6.png. clear washing soda crystals",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/7.png": { t: "fig", about: "Side by side comparison cards: Baking soda with formula NaHCO3 and mild base; Washing soda with formula Na2CO3.10H2O and stronger base." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"gypsum mineral rock specimen photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/8.png. a white crystalline gypsum rock",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"plaster cast on broken arm photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/9.png. an arm in a white plaster cast",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/10.png": { t: "fig", about: "Reaction picture: gypsum with two water molecules -> heat to 120 degrees Celsius -> plaster of Paris with half a water molecule + water vapour." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"bleaching powder chlorine pack photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/11.png. a pack of white bleaching powder",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/12.png": { t: "fig", about: "Four small icons with labels: cotton cloth, wood pulp, drinking water tank, wool yarn, each with a tick mark." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Portland cement bag construction site photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/13.png. a bag of Portland cement at a building site",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/14.png": { t: "fig", about: "Pie chart of Portland cement: Calcium oxide 60 to 70 percent, Silica 20 to 25 percent, Alumina 5 to 10 percent, Ferric oxide 2 to 3 percent." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"reinforced concrete steel bars construction beam photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/15.png. iron rods inside a concrete beam",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"molten glass glassblowing furnace photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/16.png. a glassblower shaping molten glass",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/17.png": { t: "fig", about: "Flow diagram: sodium carbonate, calcium carbonate and sand -> batch -> mixed with cullet -> furnace at 1673 kelvin -> molten glass -> annealing." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"stained coloured glass window photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/18.png. a colourful stained glass window",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pyrex borosilicate glass laboratory beaker photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/19.png. borosilicate glass beakers and flasks",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"optical fibre cable glowing strands photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/20.png. thin glowing glass optical fibres",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/21.png": { t: "fig", about: "Three layered sandwich: glass layer, plastic layer, glass layer, joined by heat and pressure, with a stone hitting it and the glass holding together." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"urea fertilizer white granules photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/22.png. white urea fertilizer granules",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"NPK fertilizer bag granules photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/23.png. a bag of mixed NPK fertilizer",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/24.png": { t: "fig", about: "Three jars labelled Nitrogen, Phosphorus and Potassium, with the words NPK fertilizer joining them." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"farmer spraying pesticide on crop field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/25.png. a farmer spraying a crop field",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"malathion insecticide bottle photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/26.png. a bottle of malathion insecticide",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"aspirin tablets blister pack photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/27.png. white aspirin tablets in a pack",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/28.png": { t: "fig", about: "Simple tree: Analgesics split into Non-narcotic (aspirin, paracetamol) and Narcotic (strong pain relief after surgery, cancer pain, childbirth)." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"polythene plastic bags roll photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/29.png. clear polythene bags",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Teflon non stick frying pan photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/30.png. a non stick pan with Teflon coating",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/31.png": { t: "fig", about: "Tree diagram: Polymers split into Elastomers (rubber), Fibres (nylon, polyester), Thermoplastics (polythene) and Thermosetting plastics (Bakelite)." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"nylon rope climbing parachute photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/32.png. a strong nylon climbing rope",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bakelite vintage telephone photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/33.png. an old black Bakelite telephone",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"melamine crockery plates unbreakable photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/34.png. colourful melamine plates",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rubber tree latex tapping photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/35.png. white latex flowing from a rubber tree",
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/36.png": { t: "fig", about: "Before and after: a soft sticky rubber chain, then sulphur bridges joining the chains, giving a tough stretchy rubber labelled vulcanised." },
  "images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rayon fabric artificial silk photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part3_Everyday_Materials_Polymers/37.png. shiny rayon cloth"
});

/* CHANGE LOG
   - Nitrolim is a mixture of calcium cyanamide (CaCN2) and carbon; the formula Ca(CN)2 was wrong.
   - Gypsum is added to cement to slow down its setting, not to reduce the setting time.
   - Glass is described as an amorphous solid that is often called a supercooled liquid.
   - Difethialone is a rat poison that stops blood from clotting; vitamin K is its antidote.
   - Washing soda is obtained by crystallising the sodium carbonate that the Solvay process gives.
   - Safety glass has three layers: glass, plastic and glass, joined by heat and pressure.
   - Crookes glass is described as the glass that absorbs ultraviolet rays and is used for spectacle lenses.
   - Natural rubber is described as an addition polymer of isoprene (cis-1,4-polyisoprene).
   - Spelling and formula corrections: caprolactam, hexamethylenediamine, terephthalic acid, Ziegler-Natta catalyst, Hasen-Clever method.
*/
