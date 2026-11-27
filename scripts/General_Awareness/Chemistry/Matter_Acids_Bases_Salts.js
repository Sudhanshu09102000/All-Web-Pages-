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

/* Field: General_Awareness · Subject: General_Science · Chapter: Chemistry_Part1_Matter_Acids_Bases_Salts · 11 concept pages (+ overview) · 32 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🧪", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Matter, Mixtures, Acids, Bases and Salts",
    thumb: {
      image: "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/thumbnail.png",
      banner: "GENERAL SCIENCE 2026",
      line1: "CHEMISTRY PART 1",
      line2: "ACIDS BASES SALTS",
      line3: "MIXTURES & pH",
      badge: "FULL CLASS",
      ribbon: "CONCEPTS • TABLES • MCQs",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Matter, Acids, Bases, Salts and pH | Chemistry for SSC CGL General Science",
      altTitles: ["Acids Bases Salts and pH Scale in One Class", "Mixtures, Solutions and Colloids Made Easy"],
      description: "Chemistry is one of the most scoring parts of General Science. In this class we start from the very beginning and build up slowly.\n\n📌 IN THIS CLASS\n✅ Elements, compounds and mixtures\n✅ Solutions, suspensions, colloids and emulsions\n✅ Methods of separating mixtures\n✅ Acids, bases, indicators and salts\n✅ The pH scale with everyday examples\n✅ Exam style questions with explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Substances, elements and compounds\n00:00 Mixtures and solutions\n00:00 Acids, bases and salts\n00:00 The pH scale\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Chemistry #GeneralScience",
      tags: ["chemistry for ssc cgl", "acids bases and salts", "ph scale", "general science chemistry", "elements and compounds", "mixtures and solutions", "colloids and emulsions", "separation of mixtures", "indicators litmus", "natural acids", "ssc cgl general awareness", "ssc cgl general science", "chemistry mcq", "competitive exam chemistry", "railway general science", "banking general awareness", "defence exam chemistry", "static gk science", "chemistry one shot", "chemistry basics", "salts and their uses", "strong and weak acids", "Chemistry Part"],
      hashtags: ["SSCCGL", "Chemistry", "GeneralScience"],
      thumbText: "ACIDS BASES SALTS + pH",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🧪 New class is live: Matter, Acids, Bases, Salts and pH. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Substances, elements and compounds\n00:00 Mixtures and solutions\n00:00 Separating mixtures\n00:00 Acids, bases and salts\n00:00 The pH scale",
      playlist: "General Science Chemistry — Full Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the first part of Chemistry</u>: what matter is made of, how mixtures behave, and how acids, bases and salts work. These are the most repeated General Science questions in competitive exams.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>11</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>32</b><span>Questions</span></div>
        <div class="cp-stat"><b>~54 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Substances, Elements and Compounds</b><br>What a pure substance is, how an element differs from a compound, and why metals and non-metals matter.</li>
        <li><b>Mixtures, Solutions, Suspensions and Colloids</b><br>How mixtures are classified, the language of solutions, and how colloids and emulsions differ from true solutions.</li>
        <li><b>Separating Mixtures</b><br>Which method separates which kind of mixture, such as filtration, distillation and chromatography.</li>
        <li><b>Acids, Indicators and Natural Acids</b><br>What an acid is, how litmus and other indicators work, and which fruit or food holds which acid.</li>
        <li><b>Bases, Alkalis and Salts</b><br>How bases differ from alkalis, and the industrial uses of common salts.</li>
        <li><b>The pH Scale</b><br>How the strength of an acid or a base is measured, with the pH of everyday things.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on indicators, natural acids, the pH of common liquids and the separation of mixtures appear again and again in General Science papers, and they are easy marks once the pattern is clear.</div>
    `
  },
  2: {
    type: "concept", icon: "🧪", accent: "#22c55e", pauseTimer: true,
    title: "Substances, Elements and Compounds",
    html: `
      <p class="cp-lead">A <b>substance</b> is a kind of matter that cannot be separated into other kinds of matter by any physical process. <u>Gold, silver, iron, sodium chloride and calcium carbonate</u> are all substances.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/1.png" alt="gold bar silver bar iron nail samples photo" data-caption="Gold, silver and iron are elements, each made of one kind of atom." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/2.png" alt="Two panels. Left panel Element: identical circles all labelled Hydrogen. Right panel Compo" data-caption="An element has one kind of atom; a compound has joined atoms." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A <b>pure substance</b> is a single substance with a uniform composition. It always has the same texture and taste, for example water, salt and sugar. Pure substances are of two types: elements and compounds.</p>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Element</td><td>Cannot be split into simpler substances by heat, light or electric energy</td><td>Hydrogen, oxygen, sodium, chlorine</td></tr><tr><td>Compound</td><td>Two or more elements chemically combined in a fixed ratio by weight</td><td>Water (H<sub>2</sub>O), sodium chloride (NaCl)</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Water is a compound</small>Hydrogen : Oxygen = 1 : 8 (by weight)</div>
      <p class="cp-lead">Elements are divided into <b>metals</b> and <b>non-metals</b>. All metals are solids at room temperature except mercury, which is a liquid. All non-metals are solids or gases, except bromine, which is a liquid.</p>
      <div class="cp-note trap">Mercury is the only liquid metal and bromine is the only liquid non-metal. Questions often swap the two, so remember them as a pair.</div>
      <div class="cp-note exam">A compound always has its elements in a fixed ratio by weight. This is the key point that separates a compound from a mixture.</div>
    `
  },
  3: {
    questext: "Which of the following is the only metal that is liquid at room temperature?",
    options: ["Bromine", "Mercury", "Sodium", "Potassium"],
    correct: "2",
    exptext: "✅ Mercury is the only liquid metal at room temperature. 📌 Pair it with bromine, the only liquid non-metal. ❌ Bromine is tempting, but it is a non-metal."
  },
  4: {
    questext: "In water, hydrogen and oxygen are combined in which fixed ratio by weight?",
    options: ["2 : 1", "8 : 1", "1 : 2", "1 : 8"],
    correct: "4",
    exptext: "✅ Hydrogen and oxygen combine in the ratio 1 : 8 by weight. 📌 Think of one part hydrogen for eight parts oxygen. ❌ The ratio 2 : 1 is the ratio of atoms, not of weight."
  },
  5: {
    questext: "Which of the following is a compound?",
    options: ["Chlorine", "Silver", "Sodium chloride", "Hydrogen"],
    correct: "3",
    exptext: "✅ Sodium chloride is made of sodium and chlorine joined together, so it is a compound. 📌 A compound has two or more different elements. ❌ Chlorine, silver and hydrogen are single elements."
  },
  6: {
    type: "concept", icon: "🥣", accent: "#f59e0b", pauseTimer: true,
    title: "Mixtures",
    html: `
      <p class="cp-lead">A <b>mixture</b> is a substance made of two or more elements or compounds that are <u>not chemically combined</u>. Air is a mixture of nitrogen, oxygen, inert gases, water vapour and carbon dioxide.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/3.png" alt="salt and pepper mixed on white plate photo" data-caption="Salt and pepper mixed together form a heterogeneous mixture." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/4.png" alt="brass utensils polished photo" data-caption="Brass is an alloy of copper and zinc used for utensils and pipes." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Mixtures are impure substances. They are of two types, depending on how evenly the parts are spread.</p>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Example</th></tr></thead><tbody><tr><td>Homogeneous mixture</td><td>Same composition throughout; parts cannot be told apart by eye</td><td>A well mixed sample of vinegar, brass</td></tr><tr><td>Heterogeneous mixture</td><td>Not uniform throughout; different samples may differ</td><td>Salt and pepper mixed together</td></tr></tbody></table>
      <p class="cp-lead"><b>Alloys</b> are homogeneous mixtures of metals. Brass is a mixture of copper and zinc. Because it is only a mixture, an alloy keeps the properties of its parts.</p>
      <div class="cp-note trap">A compound has a fixed ratio of elements, but a mixture can have any ratio. Air and brass are mixtures, whereas water and salt are not.</div>
      <div class="cp-note exam">Remember that air is a homogeneous mixture and that an alloy is a solid homogeneous mixture of metals.</div>
    `
  },
  7: {
    questext: "Which of the following is a heterogeneous mixture?",
    options: ["Brass", "Air", "Salt mixed with pepper", "Vinegar"],
    correct: "3",
    exptext: "✅ Salt and pepper are not spread evenly, so the mixture is heterogeneous. 📌 If you can see different parts, it is heterogeneous. ❌ Brass, air and vinegar look uniform throughout."
  },
  8: {
    questext: "Brass is a mixture of which two metals?",
    options: ["Copper and zinc", "Copper and tin", "Zinc and lead", "Iron and carbon"],
    correct: "1",
    exptext: "✅ Brass is a mixture of copper and zinc. 📌 Brass has zinc, bronze has tin. ❌ Copper and tin make bronze, not brass."
  },
  9: {
    type: "concept", icon: "🫗", accent: "#ef4444", pauseTimer: true,
    title: "Solutions",
    html: `
      <p class="cp-lead">A <b>solution</b> is a homogeneous mixture of two or more substances whose composition can be varied. Common salt in water and ammonia in water are common examples.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/5.png" alt="A beaker of water labelled Solvent (larger amount) with salt crystals labelled Solute (sma" data-caption="Solute dissolves in solvent to make a uniform solution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/6.png" alt="Three beakers side by side labelled Unsaturated (more solute can dissolve), Saturated (no " data-caption="Unsaturated, saturated and super-saturated solutions compared." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Solute</td><td>The component that is dissolved and present in the smaller quantity, such as common salt in salt water</td></tr><tr><td>Solvent</td><td>The component in which the solute dissolves, always present in the larger amount, such as water</td></tr><tr><td>Saturated solution</td><td>No more solute can dissolve at the same temperature</td></tr><tr><td>Unsaturated solution</td><td>More solute can still be dissolved at the same temperature</td></tr><tr><td>Super-saturated solution</td><td>Contains more dissolved solute than the saturated solution at the same temperature and pressure</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Concentration of a solution</small>Concentration = <span class="cp-frac"><i>Amount of solute</i><i>Amount of solvent</i></span></div>
      <p class="cp-lead"><b>Solubility</b> is the amount of solute that dissolves in 100 grams of solvent to form a saturated solution.</p>
      <div class="cp-note trap">The solvent is the part present in the larger amount. Water is the solvent in salt water, and the salt is the solute.</div>
      <div class="cp-note exam">Alloys are solid solutions and air is a gaseous solution, so solutions are not only liquids.</div>
    `
  },
  10: {
    questext: "The component of a solution that is present in the larger amount is called the",
    options: ["solute", "solvent", "alloy", "colloid"],
    correct: "2",
    exptext: "✅ The solvent is the larger part and dissolves the solute. 📌 Solvent is the bigger partner, as water is in salt water. ❌ The solute is the smaller part that gets dissolved."
  },
  11: {
    questext: "Which solution holds more dissolved solute than a saturated solution at the same temperature and pressure?",
    options: ["Unsaturated solution", "Dilute solution", "Super-saturated solution", "Neutral solution"],
    correct: "3",
    exptext: "✅ A super-saturated solution contains extra dissolved solute beyond the saturation limit. 📌 Super means more than saturated. ❌ An unsaturated solution can still take in more solute."
  },
  12: {
    questext: "Consider the following statements about solutions:\n1. Solubility is the amount of solute that dissolves in 100 grams of solvent to form a saturated solution.\n2. An alloy is an example of a solid solution.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Solutions can be solid, liquid or gas, and solubility is always counted per 100 grams of solvent. ❌ Saying that only liquids can be solutions is the common mistake."
  },
  13: {
    type: "concept", icon: "🥛", accent: "#8b5cf6", pauseTimer: true,
    title: "Suspensions, Colloids and Emulsions",
    html: `
      <p class="cp-lead">In a <b>suspension</b> the solid particles do not dissolve. They stay spread through the liquid and settle down if it is left alone. A <b>colloid</b> lies in between: its particles are too small to see with the naked eye, but big enough to scatter light.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/7.png" alt="milk pouring into glass photo" data-caption="Milk is an emulsion of tiny fat droplets spread in water." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/8.png" alt="torch light beam through colloid water scattering photo" data-caption="A colloid scatters a beam of light, so the path becomes visible." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/9.png" alt="Three jars labelled Solution (clear, particles smaller than 1 nanometre), Colloid (particl" data-caption="Solution, colloid and suspension compared by particle size." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Property</th><th>Solution</th><th>Colloid</th><th>Suspension</th></tr></thead><tbody><tr><td>Type of mixture</td><td>Homogeneous</td><td>Heterogeneous</td><td>Heterogeneous</td></tr><tr><td>Particle size</td><td>Smaller than 1 nanometre</td><td>1 to 100 nanometres</td><td>Larger than 100 nanometres</td></tr><tr><td>Settles on standing</td><td>No</td><td>No</td><td>Yes</td></tr></tbody></table>
      <p class="cp-lead">Every colloid has two phases: the <b>dispersed phase</b> (the colloidal particles) and the <b>dispersion medium</b> (the medium in which the particles are spread).</p>
      <p class="cp-lead"><b>Emulsions</b> are liquid-liquid colloids. They are of two types: water in oil and oil in water. <b>Emulsifiers</b> help to form stable emulsions of oil and water. Milk, cod-liver oil, cold cream, vanishing cream, moisturising cream and paints are examples.</p>
      <div class="cp-note trap">A colloid is a heterogeneous mixture, even though it looks uniform. Its particles cannot be seen with the naked eye, but they do scatter light.</div>
      <div class="cp-note exam">Remember the particle size of a colloid as 1 to 100 nanometres, between a true solution and a suspension.</div>
    `
  },
  14: {
    questext: "The size of the particles in a colloid lies between",
    options: ["1 and 100 nanometres", "100 and 1000 nanometres", "0.1 and 1 nanometre", "1000 and 10000 nanometres"],
    correct: "1",
    exptext: "✅ Colloidal particles measure 1 to 100 nanometres. 📌 They sit between a solution and a suspension. ❌ Larger particles above 100 nanometres belong to a suspension."
  },
  15: {
    questext: "Emulsions are colloids in which",
    options: ["a gas is spread in a liquid", "a solid is spread in a gas", "a solid is spread in a liquid", "a liquid is spread in another liquid"],
    correct: "4",
    exptext: "✅ An emulsion is a liquid-liquid colloid, such as milk. 📌 Emulsion means liquid in liquid. ❌ A solid spread in a liquid describes a sol or a suspension, not an emulsion."
  },
  16: {
    questext: "Consider the following statements about colloids:\n1. The particles of a colloid can be seen with the naked eye.\n2. A colloid is a heterogeneous mixture.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Both 1 and 2", "Only 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Only statement 2 is correct, because a colloid is heterogeneous. 📌 Colloidal particles are too small to see. ❌ Statement 1 is wrong, since the naked eye cannot see them."
  },
  17: {
    type: "concept", icon: "🔬", accent: "#14b8a6", pauseTimer: true,
    title: "Separating the Components of a Mixture",
    html: `
      <p class="cp-lead">Different methods are used to separate the parts of a mixture. <u>The right method depends on what kind of mixture it is</u>, so the question always becomes: which method for which mixture?</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/10.png" alt="laboratory filtration funnel filter paper photo" data-caption="Filtration holds back insoluble solid on filter paper." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/11.png" alt="separating funnel oil and water layers photo" data-caption="A separating funnel splits two liquids that do not mix." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/12.png" alt="paper chromatography coloured ink strips photo" data-caption="Chromatography separates coloured substances on paper." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Kind of mixture</th><th>Method of separation</th></tr></thead><tbody><tr><td>Insoluble solid in a liquid</td><td>Sedimentation followed by filtration; centrifugation is used if the solid is very fine</td></tr><tr><td>Solid dissolved in a liquid</td><td>Evaporation, crystallisation or distillation</td></tr><tr><td>Miscible mixture of liquids</td><td>Fractional distillation</td></tr><tr><td>Immiscible mixture of liquids</td><td>Separating funnel</td></tr><tr><td>Mixture of two solids, one of which sublimes</td><td>Sublimation</td></tr><tr><td>Mixture of substances in a solution</td><td>Chromatography</td></tr></tbody></table>
      <p class="cp-lead"><b>Miscible</b> liquids mix completely, for example alcohol and water. <b>Immiscible</b> liquids form separate layers, for example oil and water.</p>
      <div class="cp-note trap">Do not mix up the two liquid methods. Liquids that mix need fractional distillation, but liquids that form layers need a separating funnel.</div>
      <div class="cp-note exam">A fine solid that does not settle easily is separated by centrifugation instead of filtration.</div>
    `
  },
  18: {
    questext: "Which method is used to separate two immiscible liquids such as oil and water?",
    options: ["Fractional distillation", "Sublimation", "Separating funnel", "Crystallisation"],
    correct: "3",
    exptext: "✅ Immiscible liquids form layers, so a separating funnel drains them one by one. 📌 No mixing means a funnel. ❌ Fractional distillation is for liquids that mix completely."
  },
  19: {
    questext: "A mixture of two solids, one of which changes straight from solid to gas on heating, is separated by",
    options: ["filtration", "sublimation", "chromatography", "centrifugation"],
    correct: "2",
    exptext: "✅ Sublimation separates a solid that turns directly into vapour from another solid. 📌 Sublime means solid to gas. ❌ Chromatography is meant for dissolved coloured substances."
  },
  20: {
    questext: "Fractional distillation is used to separate",
    options: ["an insoluble solid from a liquid", "a miscible mixture of liquids", "two solids", "dyes in a solution"],
    correct: "2",
    exptext: "✅ Fractional distillation separates liquids that mix, using their different boiling points. 📌 Crude oil is separated this way. ❌ Dyes in a solution are separated by chromatography."
  },
  21: {
    type: "concept", icon: "🍋", accent: "#ec4899", pauseTimer: true,
    title: "Acids",
    html: `
      <p class="cp-lead">An <b>acid</b> is a compound that produces hydrogen ions (H<sup>+</sup>) in a solution, and these ions are responsible for its acidic properties. Acids are generally sour in taste and corrosive.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/13.png" alt="A drop of acid entering water: HCl splits into H+ and Cl-, then H+ joins a water molecule " data-caption="An acid gives hydrogen ions, which join water to form hydronium ions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/14.png" alt="hydrochloric acid laboratory reagent bottle photo" data-caption="Hydrochloric acid is a common strong acid kept in laboratories." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">According to the Bronsted-Lowry theory, an acid is any species that can <u>donate a proton</u> to another species. Hydrogen ions cannot exist alone, so they join water molecules and form <b>hydronium ions</b> (H<sub>3</sub>O<sup>+</sup>), the only positive ions in the solution.</p>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Strong acid</td><td>Fully ionises in water, a good electrolyte</td><td>Hydrochloric acid, sulphuric acid, nitric acid</td></tr><tr><td>Weak acid</td><td>Ionises only slightly</td><td>Acetic acid, formic acid, carbonic acid</td></tr></tbody></table>
      <div class="cp-note tip">Dissolving an acid or a base in water gives out a lot of heat. So the acid must always be added slowly to water, with constant stirring.</div>
      <div class="cp-note trap">Never add water to a concentrated acid. The heat can make the liquid splash out and burn. Remember: acid goes into water.</div>
    `
  },
  22: {
    questext: "According to the Bronsted-Lowry theory, an acid is a substance that can",
    options: ["accept a proton", "donate a proton", "donate an electron", "accept an electron"],
    correct: "2",
    exptext: "✅ A Bronsted-Lowry acid donates a proton. 📌 Acid donates, base accepts. ❌ Accepting a proton is the job of a base."
  },
  23: {
    questext: "Which of the following is a weak acid?",
    options: ["Acetic acid", "Nitric acid", "Sulphuric acid", "Hydrochloric acid"],
    correct: "1",
    exptext: "✅ Acetic acid ionises only slightly, so it is a weak acid. 📌 The three common strong acids are hydrochloric, sulphuric and nitric. ❌ The other three options are all strong acids."
  },
  24: {
    questext: "When an acid is dissolved in water, the only positive ions present in the solution are",
    options: ["hydroxide ions", "sodium ions", "hydronium ions", "chloride ions"],
    correct: "3",
    exptext: "✅ Hydrogen ions join water molecules and form hydronium ions. 📌 Positive means hydronium for acids. ❌ Hydroxide and chloride ions are negative ions."
  },
  25: {
    type: "concept", icon: "🎨", accent: "#3b82f6", pauseTimer: true,
    title: "Indicators",
    html: `
      <p class="cp-lead">An <b>indicator</b> is a substance that tells us whether another substance is acidic or basic by changing colour. <u>Turmeric, litmus and china rose (gudhal) petals</u> are natural indicators.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/15.png" alt="red and blue litmus paper strips photo" data-caption="Litmus paper turns red in acid and blue in base." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/16.png" alt="lichen growing on tree bark close up photo" data-caption="Litmus is extracted from lichens, which belong to Thallophyta." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/17.png" alt="china rose hibiscus red flower photo" data-caption="China rose petals act as a natural indicator." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Substance</th><th>Effect on litmus</th></tr></thead><tbody><tr><td>Acidic solution</td><td>Blue litmus turns red</td></tr><tr><td>Basic solution</td><td>Red litmus turns blue</td></tr><tr><td>Neutral solution</td><td>No change in the colour of either red or blue litmus</td></tr></tbody></table>
      <p class="cp-lead">Litmus is extracted from <b>lichens</b>, which belong to the plant division Thallophyta. It has a purple colour in distilled water. Solutions that change neither red nor blue litmus are <b>neutral</b>: they are neither acidic nor basic.</p>
      <p class="cp-lead"><b>Olfactory indicators</b> are substances whose smell changes in an acidic or basic medium. Onion is a common example.</p>
      <div class="cp-note trap">Acids turn blue litmus red, and bases turn red litmus blue. The colour that appears is the opposite of the colour of the paper you started with.</div>
      <div class="cp-note exam">Remember the plant division of lichens, Thallophyta, because it comes up in factual questions.</div>
    `
  },
  26: {
    questext: "Litmus is a natural indicator obtained from",
    options: ["lichens", "algae", "ferns", "mosses"],
    correct: "1",
    exptext: "✅ Litmus is extracted from lichens, which belong to Thallophyta. 📌 Lichens give litmus. ❌ Algae and mosses are not the source of litmus."
  },
  27: {
    questext: "Which change shows that a solution is acidic?",
    options: ["Red litmus turns blue", "Blue litmus stays blue", "Red litmus stays red", "Blue litmus turns red"],
    correct: "4",
    exptext: "✅ An acid turns blue litmus red. 📌 Acid makes blue go red. ❌ Red litmus turning blue shows a base, not an acid."
  },
  28: {
    questext: "A solution does not change the colour of either red or blue litmus. The solution is",
    options: ["strongly acidic", "strongly basic", "an alkali", "neutral"],
    correct: "4",
    exptext: "✅ Neutral solutions leave both litmus papers unchanged. 📌 No change means neutral. ❌ Acids and bases would change the colour of one of the papers."
  },
  29: {
    type: "concept", icon: "🍎", accent: "#f97316", pauseTimer: true,
    title: "Natural Sources of Acids",
    html: `
      <p class="cp-lead">Acids come from two kinds of sources, organic and mineral. The sour taste of many foods is caused by <u>a particular natural acid</u>, and each pairing is a favourite exam fact.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/18.png" alt="citrus fruits lemon orange cut photo" data-caption="Lemon and orange are sour because they contain citric acid." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/19.png" alt="red ant close up on leaf photo" data-caption="Red ants inject formic acid when they sting." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/20.png" alt="bowl of curd yoghurt photo" data-caption="Curd and sour milk contain lactic acid." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Source</th><th>Acid present</th></tr></thead><tbody><tr><td>Vinegar</td><td>Acetic acid</td></tr><tr><td>Lemon and other citrus fruits</td><td>Citric acid</td></tr><tr><td>Grapes, tamarind and gooseberries</td><td>Tartaric acid</td></tr><tr><td>Sour milk and curd</td><td>Lactic acid</td></tr><tr><td>Apples</td><td>Malic acid</td></tr><tr><td>Rancid butter</td><td>Butyric acid</td></tr><tr><td>Tomatoes</td><td>Oxalic acid</td></tr><tr><td>Tea</td><td>Tannic acid</td></tr><tr><td>Sting of red ants and bees</td><td>Formic acid</td></tr><tr><td>Proteins</td><td>Amino acids</td></tr><tr><td>Guava and oranges</td><td>Ascorbic acid (vitamin C)</td></tr></tbody></table>
      <div class="cp-note trap">Butyric acid is not in curd. It is found in rancid butter, whereas curd and sour milk contain lactic acid.</div>
      <div class="cp-note exam">Match the pairs: apple with malic, vinegar with acetic, ant sting with formic, and grapes with tartaric acid.</div>
    `
  },
  30: {
    questext: "The sting of red ants contains",
    options: ["lactic acid", "citric acid", "oxalic acid", "formic acid"],
    correct: "4",
    exptext: "✅ Red ants and bees sting with formic acid. 📌 Formic comes from the Latin word for ant. ❌ Citric acid is the acid of citrus fruits, not ants."
  },
  31: {
    questext: "Which acid is found in apples?",
    options: ["Malic acid", "Tartaric acid", "Acetic acid", "Lactic acid"],
    correct: "1",
    exptext: "✅ Apples contain malic acid. 📌 Apple and malic both start with a vowel sound. ❌ Tartaric acid belongs to grapes and tamarind."
  },
  32: {
    questext: "Match the following sources with their acids and choose the correct pair.",
    options: ["Vinegar and tartaric acid", "Grapes and acetic acid", "Sour milk and lactic acid", "Tomato and citric acid"],
    correct: "3",
    exptext: "✅ Sour milk contains lactic acid. 📌 Vinegar is acetic, grapes are tartaric and tomatoes are oxalic. ❌ The other three pairs swap the acids."
  },
  33: {
    type: "concept", icon: "🧼", accent: "#84cc16", pauseTimer: true,
    title: "Bases and Alkalis",
    html: `
      <p class="cp-lead">A <b>base</b> is a substance that gives hydroxide ions (OH<sup>-</sup>) when dissolved in water. Bases are usually metal hydroxides. According to the Bronsted-Lowry theory, a base is a <u>proton acceptor</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/21.png" alt="sodium hydroxide pellets caustic soda photo" data-caption="Sodium hydroxide, or caustic soda, is a strong base." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/22.png" alt="bar of soap photo" data-caption="Bases feel soapy and taste bitter." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Bases are soapy to touch and bitter in taste. The strength of a base depends on the concentration of hydroxide ions when it is dissolved in water.</p>
      <p class="cp-lead">Bases that dissolve in water are called <b>alkalis</b>. All alkalis are bases, but not all bases are alkalis.</p>
      <table><thead><tr><th>Type</th><th>Examples</th></tr></thead><tbody><tr><td>Strong base</td><td>Sodium hydroxide (caustic soda), potassium hydroxide (caustic potash), calcium hydroxide</td></tr><tr><td>Weak base</td><td>Magnesium hydroxide, ammonium hydroxide</td></tr></tbody></table>
      <div class="cp-note trap">Do not treat the two words as the same. An alkali is a base that dissolves in water, so every alkali is a base but not the other way round.</div>
      <div class="cp-note exam">Sodium hydroxide is caustic soda, and potassium hydroxide is caustic potash. Questions often ask for these common names.</div>
    `
  },
  34: {
    questext: "A base that dissolves in water is called a(n)",
    options: ["acid", "salt", "alkali", "indicator"],
    correct: "3",
    exptext: "✅ A water-soluble base is called an alkali. 📌 All alkalis are bases, but not all bases are alkalis. ❌ An indicator only shows acidity, it is not a base."
  },
  35: {
    questext: "Which of the following is a weak base?",
    options: ["Sodium hydroxide", "Ammonium hydroxide", "Potassium hydroxide", "Calcium hydroxide"],
    correct: "2",
    exptext: "✅ Ammonium hydroxide is a weak base, as is magnesium hydroxide. 📌 Strong bases are sodium and potassium hydroxide. ❌ Calcium hydroxide is grouped with the strong bases."
  },
  36: {
    questext: "Consider the following statements about bases:\n1. All bases are alkalis.\n2. A base gives hydroxide ions in water.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Both 1 and 2", "Neither 1 nor 2", "Only 2"],
    correct: "4",
    exptext: "✅ Only statement 2 is correct. 📌 Alkalis are only the water-soluble bases. ❌ Statement 1 is wrong because many bases do not dissolve in water."
  },
  37: {
    type: "concept", icon: "🧂", accent: "#06b6d4", pauseTimer: true,
    title: "Salts and Their Uses",
    html: `
      <p class="cp-lead">A <b>salt</b> is an ionic compound that can be formed by the <u>neutralisation reaction</u> of an acid and a base. Many salts are used in industries and in daily life.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/23.png" alt="common salt sodium chloride crystals close up photo" data-caption="Sodium chloride is used to make caustic soda and baking soda." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/24.png" alt="potash alum crystal photo" data-caption="Aluminium sulphate is used to prepare alums." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/25.png" alt="safety matches heads box photo" data-caption="Potassium chlorate is used in the match industry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Salt</th><th>Use in industry</th></tr></thead><tbody><tr><td>Sodium chloride</td><td>Manufacture of chlorine, caustic soda, washing soda and baking soda</td></tr><tr><td>Ammonium salts</td><td>Fertilisers</td></tr><tr><td>Potassium nitrate</td><td>Gunpowder and fireworks</td></tr><tr><td>Silver bromide</td><td>Photography</td></tr><tr><td>Potassium chlorate</td><td>Match industry</td></tr><tr><td>Aluminium sulphate</td><td>Preparing alums</td></tr></tbody></table>
      <div class="cp-note trap">Silver bromide is used in photography, and potassium chlorate in matches. The two are often swapped in matching questions.</div>
      <div class="cp-note exam">Sodium chloride is the parent chemical for caustic soda, washing soda, baking soda and chlorine.</div>
    `
  },
  38: {
    questext: "Which salt is used in the photography industry?",
    options: ["Potassium chlorate", "Silver bromide", "Potassium nitrate", "Aluminium sulphate"],
    correct: "2",
    exptext: "✅ Silver bromide is sensitive to light and is used in photography. 📌 Silver goes with photos. ❌ Potassium chlorate is used in matches."
  },
  39: {
    questext: "Potassium nitrate is used in the manufacture of",
    options: ["fertilisers only", "glass", "soap", "gunpowder and fireworks"],
    correct: "4",
    exptext: "✅ Potassium nitrate is used in gunpowder and fireworks. 📌 Nitrate burns well and gives oxygen. ❌ Ammonium salts are the ones used as fertilisers."
  },
  40: {
    type: "concept", icon: "🌡️", accent: "#a855f7", pauseTimer: true,
    title: "The pH Scale",
    html: `
      <p class="cp-lead">The <b>pH scale</b> measures how strong an acid or a base is. The letter p stands for the German word potenz, meaning power. The value lies between <u>0 and 14</u>.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/26.png" alt="A horizontal scale from 0 to 14 coloured red to green to blue, 0 to 6 labelled Acidic, 7 l" data-caption="The pH scale runs from 0 (acidic) to 14 (basic)." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/27.png" alt="universal indicator pH colour test tubes photo" data-caption="Universal indicator shows different colours at different pH values." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/28.png" alt="Venus planet thick clouds photo" data-caption="The atmosphere of Venus has thick clouds of sulphuric acid." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Liquid</th><th>pH value</th></tr></thead><tbody><tr><td>Gastric juice</td><td>1.2</td></tr><tr><td>Lemon juice</td><td>2.2</td></tr><tr><td>Pure water</td><td>7</td></tr><tr><td>Blood</td><td>7.35 to 7.45</td></tr><tr><td>Milk of magnesia</td><td>10</td></tr><tr><td>Sodium hydroxide solution</td><td>14</td></tr></tbody></table>
      <p class="cp-lead">The higher the hydronium ion concentration, the lower the pH. A neutral solution has a pH of 7. Values below 7 are acidic, and as the value increases from 7 to 14 the hydroxide ion concentration and the strength of the alkali increase.</p>
      <p class="cp-lead">Most food crops grow best at a pH of 7 to 7.8. Acidic soil is treated with lime or slaked lime, and alkaline soil is treated with gypsum. The stomach has a pH of around 1.2 because it makes hydrochloric acid, and milk of magnesia, a mild base, is an antacid that neutralises the excess acid.</p>
      <p class="cp-lead">Tooth decay starts when the pH of the mouth falls below 5.5. Rain water is called acid rain when its pH is below 5.6. Blood must stay between 7.35 and 7.45, and values above 7.8 or below 6.8 often cause death.</p>
      <div class="cp-note trap">Lower pH means stronger acid. Many learners think a higher number means a stronger acid, but pH 1 is far more acidic than pH 6.</div>
      <div class="cp-note exam">Remember three numbers: 5.5 for tooth decay, 5.6 for acid rain and 7.35 to 7.45 for blood.</div>
    `
  },
  41: {
    questext: "The pH of pure water is",
    options: ["0", "14", "5.6", "7"],
    correct: "4",
    exptext: "✅ Pure water is neutral, with a pH of 7. 📌 Seven is the middle of the scale. ❌ A pH of 5.6 is the limit of acid rain."
  },
  42: {
    questext: "Rain water is called acid rain when its pH is less than",
    options: ["5.6", "7", "6.8", "4.2"],
    correct: "1",
    exptext: "✅ Rain with a pH below 5.6 is acid rain. 📌 Remember 5.6 for rain and 5.5 for teeth. ❌ A pH of 7 is neutral, not acidic."
  },
  43: {
    questext: "Which of the following has the lowest pH?",
    options: ["Lemon juice", "Gastric juice", "Milk of magnesia", "Pure water"],
    correct: "2",
    exptext: "✅ Gastric juice has a pH of about 1.2, the lowest here. 📌 Lower pH means stronger acid. ❌ Lemon juice has a pH of 2.2, which is higher."
  },
  44: {
    questext: "Consider the following statements about pH:\n1. Blood must keep a pH between 7.35 and 7.45.\n2. A higher hydronium ion concentration means a higher pH.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 More hydronium ions means a lower pH. ❌ Statement 2 is wrong, since more hydronium ions lower the pH value."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a glass laboratory flask with colourful liquid, a few litmus paper strips (red and blue) and a subtle pH colour scale" },
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"gold bar silver bar iron nail samples photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/1.png. gold, silver and iron shown together",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/2.png": { t: "fig", about: "Two panels. Left panel \"Element\": identical circles all labelled Hydrogen. Right panel \"Compound\": two colours of circles joined in pairs, labelled Hydrogen and Oxygen, title Water H2O." },
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"salt and pepper mixed on white plate photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/3.png. a heap of salt and pepper grains",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"brass utensils polished photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/4.png. brass pots or musical instruments",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/5.png": { t: "fig", about: "A beaker of water labelled Solvent (larger amount) with salt crystals labelled Solute (smaller amount) dissolving, an arrow to a clear beaker labelled Solution." },
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/6.png": { t: "fig", about: "Three beakers side by side labelled Unsaturated (more solute can dissolve), Saturated (no more can dissolve), Super-saturated (holds extra dissolved solute)." },
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"milk pouring into glass photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/7.png. a glass of milk",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"torch light beam through colloid water scattering photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/8.png. a beam of light passing through a cloudy liquid",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/9.png": { t: "fig", about: "Three jars labelled Solution (clear, particles smaller than 1 nanometre), Colloid (particles 1 to 100 nanometres), Suspension (particles settle at the bottom)." },
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"laboratory filtration funnel filter paper photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/10.png. a funnel with filter paper over a beaker",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"separating funnel oil and water layers photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/11.png. a separating funnel with two liquid layers",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"paper chromatography coloured ink strips photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/12.png. paper strips with coloured bands",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/13.png": { t: "fig", about: "A drop of acid entering water: HCl splits into H+ and Cl-, then H+ joins a water molecule to make H3O+ (hydronium ion)." },
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"hydrochloric acid laboratory reagent bottle photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/14.png. a labelled bottle of acid in a laboratory",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"red and blue litmus paper strips photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/15.png. red and blue litmus paper",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"lichen growing on tree bark close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/16.png. lichen on a tree",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"china rose hibiscus red flower photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/17.png. a red hibiscus flower",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"citrus fruits lemon orange cut photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/18.png. halved lemons and oranges",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"red ant close up on leaf photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/19.png. a red ant",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"bowl of curd yoghurt photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/20.png. a bowl of curd",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sodium hydroxide pellets caustic soda photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/21.png. white pellets of sodium hydroxide",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"bar of soap photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/22.png. a bar of soap",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"common salt sodium chloride crystals close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/23.png. common salt crystals",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"potash alum crystal photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/24.png. a clear alum crystal",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"safety matches heads box photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/25.png. matchsticks and a matchbox",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/26.png": { t: "fig", about: "A horizontal scale from 0 to 14 coloured red to green to blue, 0 to 6 labelled Acidic, 7 labelled Neutral, 8 to 14 labelled Basic." },
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"universal indicator pH colour test tubes photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/27.png. test tubes in rainbow colours",
  "images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Venus planet thick clouds photo\". Download a clear, suitable photo and save it as images/General_Awareness/General_Science/Chemistry_Part1_Matter_Acids_Bases_Salts/28.png. the planet Venus"
});

/* CHANGE LOG
   - The pH of pure water is 7 (the source gave 7.4); written as 7.
   - Curd and sour milk contain lactic acid; butyric acid belongs to rancid butter (the source listed curd under butyric acid).
   - Tea contains tannic acid (the source listed it with oxalic acid); tomatoes keep oxalic acid.
   - Chlorine, sulphur and similar spelling slips were corrected silently; chemical names are written in full.
*/
