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

/* Field: General_Awareness · Subject: Chemistry · Chapter: Chemistry_Part4_Periodic_Table_Reactions_Metals · 18 concept pages (+ overview) · 37 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "⚗️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Periodic Table, Reactions, Electrochemistry and Metals",
    thumb: {
      image: "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "CHEMISTRY",
      line2: "PERIODIC TABLE • REACTIONS",
      line3: "METALS • CATALYSTS • CELLS",
      badge: "FULL CLASS",
      ribbon: "LAWS • ORES • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Periodic Table, Reactions, Batteries and Metals | Chemistry for competitive exams",
      altTitles: ["Redox, Electrolysis, Catalysts and Ores Fast Revision", "Metals and Their Uses in One Class"],
      description: "Chemistry questions on the periodic table, reactions, batteries, catalysts and metals come in every competitive exam. In this class we learn them in simple steps and practise questions after each topic.\n\n📌 IN THIS CLASS\n✅ Periodic table and periodic properties\n✅ Laws of chemical combination, redox, electrolysis, batteries\n✅ Catalysts, enzymes, corrosion\n✅ Metals, ores and their uses\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Periodic Table\n00:00 Reactions\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Chemistry #GeneralScience",
      tags: ["general science chemistry", "ssc cgl chemistry", "periodic table tricks", "modern periodic law", "periodic properties", "laws of chemical combination", "exothermic endothermic", "oxidation and reduction", "redox reaction", "electrolysis uses", "batteries and cells", "lead storage battery", "fuel cell", "rusting and corrosion", "catalyst in industry", "enzyme catalysis", "metals and non metals", "ores of metals", "important metals and uses", "iron and steel", "general awareness 2026", "ssc cgl general science", "railway exam chemistry", "MCQ"],
      hashtags: ["SSCCGL", "Chemistry", "GeneralScience"],
      thumbText: "CHEMISTRY: REACTIONS AND METALS",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "⚗️ New class is live: Periodic Table, Cells, Catalysts and Metals. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Periodic Table\n00:00 Laws of Chemical Combination\n00:00 Redox\n00:00 Electrolysis\n00:00 Batteries\n00:00 Catalysis\n00:00 Metals\n00:00 Ores",
      playlist: "Competitive exams General Science — Chemistry"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how elements are arranged, how chemical reactions work, and how metals are used</u>. We learn each idea slowly, with small examples, and then we practise.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>18</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>37</b><span>Questions</span></div>
        <div class="cp-stat"><b>~73 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Periodic Table</b><br>How Mendeleev arranged the elements, what the modern law says and how the long form table is built.</li>
        <li><b>Periodic Properties</b><br>Ionisation enthalpy, electron gain enthalpy, electronegativity and metallic character in plain words.</li>
        <li><b>Physical and Chemical Change</b><br>How to tell a change that only looks different from a change that makes a new substance.</li>
        <li><b>Laws of Chemical Combination</b><br>The three laws of Lavoisier, Proust and Dalton, with the simple water example.</li>
        <li><b>Exothermic and Endothermic Reactions</b><br>Reactions that give out heat and reactions that take in heat.</li>
        <li><b>Oxidation and Reduction</b><br>Gain and loss of electrons, oxidising and reducing agents and redox reactions.</li>
        <li><b>Electrolysis</b><br>How electric current splits or coats substances, and where this is used.</li>
        <li><b>Batteries and Fuel Cells</b><br>Primary and secondary cells, and the fuel cell used in space travel.</li>
        <li><b>Corrosion</b><br>Why iron rusts and how rusting can be stopped.</li>
        <li><b>Catalysis and Enzyme Catalysis</b><br>How catalysts speed up reactions, industrial catalysts and enzymes.</li>
        <li><b>Matter and Its Nature</b><br>Solid, liquid and gas, and how evaporation cools things.</li>
        <li><b>Metals and Non-metals</b><br>Properties that tell metals from non-metals, with special cases.</li>
        <li><b>Compounds of Sodium, Potassium and Calcium</b><br>Useful compounds of alkali and alkaline earth metals.</li>
        <li><b>Boron and Aluminium</b><br>Boron compounds, aluminium and its gemstones.</li>
        <li><b>Tin, Lead, Zirconium, Vanadium and Tungsten</b><br>Ores and uses of these important metals.</li>
        <li><b>Iron and Steel</b><br>Cast iron, wrought iron and the types of steel.</li>
        <li><b>Copper, Silver, Gold, Mercury and Zinc</b><br>Useful compounds and special names.</li>
        <li><b>Metallurgy: Minerals, Ores and Gangue</b><br>How minerals and ores differ, with a table of important ores.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> laws, names of cells, catalysts, ores and uses of metals appear in the General Science section of competitive exams every year, so every page ends with a short exam tip.</div>
    `
  },
  2: {
    type: "concept", icon: "📊", accent: "#ef4444", pauseTimer: true,
    title: "Periodic Table",
    html: `
      <p class="cp-lead">The <b>periodic table</b> arranges all the elements in an order. <u>Dmitri Mendeleev made the first useful table in 1869.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/1.png" alt="Dmitri Mendeleev portrait photograph" data-caption="Dmitri Mendeleev arranged the elements in a table in 1869." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/2.png" alt="modern periodic table wall chart photo" data-caption="The modern periodic table shows all known elements in rows and columns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/3.png" alt="Three cards: Mendeleev law uses atomic mass; Modern law uses atomic number; Long form has " data-caption="Three ideas: atomic mass, atomic number and the long form table." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Mendeleev placed elements by their atomic masses. Later it was found that the atomic number, which is the number of protons, is a more exact guide, and this gave the modern law.</p>
      <table><thead><tr><th>Law or table</th><th>Statement</th></tr></thead><tbody><tr><td>Mendeleev's periodic law</td><td>The physical and chemical properties of elements are a periodic function of their atomic masses</td></tr><tr><td>Modern periodic law</td><td>The physical and chemical properties of elements are a periodic function of their atomic numbers</td></tr><tr><td>Long form table</td><td>Based on the Bohr-Burry idea of electronic arrangement, with 7 periods (horizontal rows) and 18 groups (vertical columns)</td></tr></tbody></table>
      <div class="cp-note trap">Mendeleev used atomic mass, but the modern law uses atomic number. Do not swap the two.</div>
      <div class="cp-note exam">Remember the numbers: 7 periods and 18 groups in the long form table.</div>
    `
  },
  3: {
    questext: "The modern periodic law says that the properties of elements are a periodic function of their:",
    options: ["Atomic numbers", "Atomic masses", "Number of neutrons", "Mass numbers"],
    correct: "1",
    exptext: "✅ The modern law uses atomic numbers. 📌 Modern means number. ❌ Atomic masses is wrong because that was the basis of Mendeleev's law."
  },
  4: {
    questext: "How many periods and groups are there in the long form periodic table?",
    options: ["8 periods and 16 groups", "7 periods and 18 groups", "6 periods and 18 groups", "7 periods and 16 groups"],
    correct: "2",
    exptext: "✅ The long form table has 7 periods and 18 groups. 📌 Periods are rows, groups are columns. ❌ 7 periods and 16 groups is wrong because there are 18 groups."
  },
  5: {
    type: "concept", icon: "🔁", accent: "#f97316", pauseTimer: true,
    title: "Periodic Properties",
    html: `
      <p class="cp-lead">Properties that repeat at regular steps along a period and a group are called <b>periodic properties</b>. <u>Four of them are very important for exams.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/4.png" alt="Tug of war picture: two atoms pulling a shared pair of electrons, one pulling harder, labe" data-caption="A stronger pull on shared electrons means higher electronegativity." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/5.png" alt="An atom losing one electron and turning into a positive ion, labelled cation, with energy " data-caption="Removing an electron needs energy and gives a positive ion." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Property</th><th>Meaning</th></tr></thead><tbody><tr><td>Ionisation enthalpy</td><td>The minimum energy needed to remove an electron from an isolated gaseous atom, to form a positive ion</td></tr><tr><td>Electron gain enthalpy</td><td>The energy released when an extra electron is added to a neutral gaseous atom</td></tr><tr><td>Electronegativity</td><td>The ability of an atom to attract the shared pair of electrons towards itself</td></tr><tr><td>Metallic character</td><td>The tendency of an element to form a cation, which is a positive ion, by losing electrons</td></tr></tbody></table>
      <p class="cp-lead">Ionisation enthalpy is about taking an electron away, and electron gain enthalpy is about adding one. They are opposite ideas.</p>
      <div class="cp-note trap">Electron gain enthalpy is energy released when an electron is added, while ionisation enthalpy is energy needed when an electron is removed.</div>
      <div class="cp-note exam">Metallic character means losing electrons to form positive ions.</div>
    `
  },
  6: {
    questext: "Which property is the tendency of an element to form a positive ion by losing electrons?",
    options: ["Electronegativity", "Electron gain enthalpy", "Metallic character", "Ionisation enthalpy"],
    correct: "3",
    exptext: "✅ Metallic character is the tendency to lose electrons and form cations. 📌 Metals lose electrons. ❌ Ionisation enthalpy is wrong because it is the energy needed to remove an electron, not the tendency itself."
  },
  7: {
    questext: "The ability of an atom to attract the shared pair of electrons towards itself is called:",
    options: ["Electronegativity", "Electron gain enthalpy", "Metallic character", "Ionisation enthalpy"],
    correct: "1",
    exptext: "✅ Electronegativity is the pull on a shared pair of electrons. 📌 Negativity pulls electrons. ❌ Electron gain enthalpy is wrong because it is the energy released when one extra electron is added."
  },
  8: {
    type: "concept", icon: "🔥", accent: "#eab308", pauseTimer: true,
    title: "Physical and Chemical Change",
    html: `
      <p class="cp-lead">A <b>physical change</b> only changes how a substance looks, but a <b>chemical change</b> makes a new substance. <u>The test is simple: is a new substance formed?</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/6.png" alt="burning candle flame close up photo" data-caption="A burning candle shows a chemical change." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/7.png" alt="rusted iron chain photo" data-caption="Rust is a new substance, so rusting is a chemical change." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/8.png" alt="Two panels: ice melting into water, labelled physical change, same substance; iron turning" data-caption="Melting keeps the substance; rusting makes a new one." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Change</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Physical change</td><td>Affects only physical properties and the composition stays the same; it can be reversed by changing temperature or pressure</td><td>Boiling, cutting of trees, dissolving common salt in water, melting of wax</td></tr><tr><td>Chemical change</td><td>Changes the composition and gives a new substance; it is generally irreversible</td><td>Burning of a candle, photosynthesis, ripening of fruits, electrolysis of water, burning of coal and wood, rusting</td></tr></tbody></table>
      <p class="cp-lead">A chemical reaction involves breaking old bonds between atoms and forming new bonds, which produces new substances.</p>
      <div class="cp-note trap">Melting of wax is a physical change, but burning of wax is a chemical change.</div>
      <div class="cp-note exam">Ripening of fruits and rusting are chemical changes; boiling and dissolving salt are physical changes.</div>
    `
  },
  9: {
    questext: "Which of the following is a chemical change?",
    options: ["Ripening of fruits", "Boiling of water", "Dissolving salt in water", "Melting of wax"],
    correct: "1",
    exptext: "✅ Ripening of fruits makes new substances, so it is a chemical change. 📌 New substance, chemical change. ❌ Melting of wax is wrong because the wax stays wax."
  },
  10: {
    questext: "Which of the following is a physical change?",
    options: ["Rusting of iron", "Dissolving common salt in water", "Photosynthesis", "Burning of coal"],
    correct: "2",
    exptext: "✅ Dissolving salt in water gives no new substance, and the salt can be recovered. 📌 Can it be reversed? Then it is physical. ❌ Rusting of iron is wrong because it forms rust, a new substance."
  },
  11: {
    type: "concept", icon: "⚖️", accent: "#22c55e", pauseTimer: true,
    title: "Laws of Chemical Combination",
    html: `
      <p class="cp-lead">There are <b>three laws of chemical combination</b>. <u>Each law tells how masses behave when substances react.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/9.png" alt="Antoine Lavoisier portrait painting" data-caption="Antoine Lavoisier stated the law of conservation of mass." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/10.png" alt="John Dalton portrait painting" data-caption="John Dalton gave the law of multiple proportions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/11.png" alt="Water molecule picture: 1 part hydrogen and 8 parts oxygen by mass, labelled constant rati" data-caption="Water always has hydrogen and oxygen in the ratio one to eight by mass." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Law</th><th>Given by</th><th>Statement</th></tr></thead><tbody><tr><td>Law of conservation of mass</td><td>Lavoisier, 1789</td><td>In all physical and chemical changes, the total mass of the reactants equals the total mass of the products</td></tr><tr><td>Law of constant proportions</td><td>Proust, 1797</td><td>A compound always has the same elements combined in the same proportion by mass, for example hydrogen and oxygen in water are always in the ratio 1 to 8</td></tr><tr><td>Law of multiple proportions</td><td>John Dalton, 1803</td><td>When two elements form two or more compounds, the different masses of one element that combine with a fixed mass of the other are in a simple whole number ratio</td></tr></tbody></table>
      <p class="cp-lead">The law of constant proportions is also called the law of definite proportions.</p>
      <div class="cp-note trap">Water has hydrogen and oxygen in the ratio 1 to 8 by mass, but this is not the ratio of the numbers of atoms.</div>
      <div class="cp-note exam">Match the names: Lavoisier with mass, Proust with constant proportions, Dalton with multiple proportions.</div>
    `
  },
  12: {
    questext: "The law of constant proportions was stated by:",
    options: ["Lavoisier", "Dalton", "Proust", "Avogadro"],
    correct: "3",
    exptext: "✅ Proust stated the law of constant proportions in 1797. 📌 Proust is constant. ❌ Dalton is wrong because he gave the law of multiple proportions."
  },
  13: {
    questext: "In water, hydrogen and oxygen are always present in which ratio by mass?",
    options: ["1 to 8", "1 to 16", "1 to 2", "2 to 1"],
    correct: "1",
    exptext: "✅ Water always has hydrogen and oxygen in the ratio 1 to 8 by mass. 📌 One hydrogen, eight oxygen. ❌ 2 to 1 is wrong because that is the ratio of the number of atoms, not the mass."
  },
  14: {
    type: "concept", icon: "🌡️", accent: "#14b8a6", pauseTimer: true,
    title: "Exothermic and Endothermic Reactions",
    html: `
      <p class="cp-lead">Reactions are sorted by what happens to heat. <u>Exothermic reactions give out heat, and endothermic reactions take in heat.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/12.png" alt="campfire burning logs flames photo" data-caption="Burning fuel gives out heat, so it is an exothermic reaction." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/13.png" alt="Two simple energy bars: exothermic with reactants high and products lower and heat release" data-caption="Heat is released in exothermic and absorbed in endothermic reactions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>What happens to heat</th><th>Examples</th></tr></thead><tbody><tr><td>Exothermic reaction</td><td>Heat is released along with the products</td><td>Burning of fuel, setting of cement, dissolving an acid in water</td></tr><tr><td>Endothermic reaction</td><td>Heat is absorbed</td><td>Photosynthesis, breaking down of limestone by heat</td></tr></tbody></table>
      <div class="cp-note trap">Exo means out and endo means in. Do not mix the two words.</div>
      <div class="cp-note exam">Burning of fuel is the standard example of an exothermic reaction.</div>
    `
  },
  15: {
    questext: "Reactions in which heat is absorbed are called:",
    options: ["Exothermic reactions", "Endothermic reactions", "Redox reactions", "Neutralisation reactions"],
    correct: "2",
    exptext: "✅ Endothermic reactions take in heat. 📌 Endo means in. ❌ Exothermic reactions are wrong because they give out heat, as in burning fuel."
  },
  16: {
    type: "concept", icon: "⚡", accent: "#3b82f6", pauseTimer: true,
    title: "Oxidation and Reduction",
    html: `
      <p class="cp-lead"><b>Oxidation</b> and <b>reduction</b> are two halves of one idea. <u>Oxidation is loss of electrons, and reduction is gain of electrons.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/14.png" alt="Two atoms with an electron arrow from the first atom to the second; first labelled oxidise" data-caption="One substance loses electrons while the other gains them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/15.png" alt="corroded rusty car metal photo" data-caption="Corrosion of metals is a common redox reaction." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Idea</th><th>Oxidation</th><th>Reduction</th></tr></thead><tbody><tr><td>Electrons</td><td>Loss of electrons</td><td>Gain of electrons</td></tr><tr><td>Oxygen</td><td>Addition of oxygen</td><td>Removal of oxygen</td></tr><tr><td>Hydrogen</td><td>Removal of hydrogen</td><td>Addition of hydrogen</td></tr><tr><td>Agent</td><td>An oxidising agent accepts electrons and brings about oxidation</td><td>A reducing agent donates electrons and brings about reduction</td></tr></tbody></table>
      <p class="cp-lead">A <b>redox reaction</b> is a reaction in which oxidation and reduction happen together. Photosynthesis, digestion of food, dry and wet batteries and corrosion of metals are examples.</p>
      <div class="cp-note trap">The oxidising agent is the substance that gets reduced, because it takes electrons from the other substance.</div>
      <div class="cp-note exam">Oxidation is loss of electrons; reduction is gain of electrons; redox means both together.</div>
      <div class="cp-mnemonic">OIL RIG: Oxidation Is Loss, Reduction Is Gain.</div>
    `
  },
  17: {
    questext: "Oxidation means:",
    options: ["Gain of electrons", "Loss of electrons", "Removal of oxygen", "Addition of hydrogen"],
    correct: "2",
    exptext: "✅ Oxidation is the loss of electrons. 📌 OIL RIG. ❌ Gain of electrons is wrong because that is reduction."
  },
  18: {
    questext: "Consider the following statements:\n1. Oxidation can mean addition of oxygen or removal of hydrogen.\n2. Reduction means gain of electrons.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Oxygen in, hydrogen out for oxidation; electrons in for reduction. ❌ Choosing only one statement misses either the oxygen and hydrogen meaning or the electron meaning."
  },
  19: {
    type: "concept", icon: "🔌", accent: "#8b5cf6", pauseTimer: true,
    title: "Electrolysis",
    html: `
      <p class="cp-lead"><b>Electrolysis</b> means using electric current to bring about a chemical change. <u>It is carried out in an electrolytic cell.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/16.png" alt="Cell with two copper strips in blue copper sulphate solution joined to a battery; labels: " data-caption="In copper electrolysis, copper moves from the anode to the cathode." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/17.png" alt="copper refining electrolysis cathode plates industrial photo" data-caption="Electrolysis is used to refine impure copper into pure copper." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/18.png" alt="galvanised steel zinc coated surface photo" data-caption="Zinc coating on steel is called galvanisation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A simple electrolytic cell has two copper strips dipping in a water solution of copper sulphate. When direct current voltage is applied, copper is deposited on the cathode, and copper dissolves from the anode.</p>
      <table><thead><tr><th>Use of electrolysis</th><th>How</th></tr></thead><tbody><tr><td>Purifying impure metals</td><td>Pure metal gathers on the cathode</td></tr><tr><td>Extracting metals</td><td>Metals are separated from their compounds</td></tr><tr><td>Printing blocks</td><td>Blocks used in printing industries are prepared by electrolysis</td></tr><tr><td>Galvanisation</td><td>Steel is coated with zinc metal</td></tr></tbody></table>
      <div class="cp-note trap">Copper goes onto the cathode and dissolves from the anode. Do not swap the two electrodes.</div>
      <div class="cp-note exam">Remember: purification of metals and galvanisation are the two most asked uses of electrolysis.</div>
    `
  },
  20: {
    questext: "In the electrolysis of copper sulphate solution with copper electrodes, where is copper deposited?",
    options: ["Anode", "Both electrodes equally", "At the bottom as powder", "Cathode"],
    correct: "4",
    exptext: "✅ Copper is deposited on the cathode. 📌 Cathode collects copper. ❌ The anode is wrong because copper dissolves from the anode."
  },
  21: {
    questext: "Coating steel with zinc is called:",
    options: ["Annealing", "Galvanisation", "Vulcanisation", "Etching"],
    correct: "2",
    exptext: "✅ Coating steel with zinc is galvanisation, and it protects the steel from rust. 📌 Galvanise means zinc coating. ❌ Vulcanisation is wrong because it is heating rubber with sulphur."
  },
  22: {
    type: "concept", icon: "🔋", accent: "#d946ef", pauseTimer: true,
    title: "Batteries and Fuel Cells",
    html: `
      <p class="cp-lead"><b>Batteries</b> change chemical energy into electrical energy. <u>They are of two main kinds: primary and secondary.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/19.png" alt="dry cell Leclanche battery cutaway zinc carbon photo" data-caption="A dry cell has a zinc container and a carbon rod." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/20.png" alt="lead acid car battery photo" data-caption="The lead storage battery is a rechargeable battery for vehicles." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/21.png" alt="Apollo spacecraft fuel cell hydrogen oxygen photo" data-caption="A hydrogen oxygen fuel cell gave power in the Apollo programme." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">In a <b>primary battery</b>, the reaction occurs only once, and after some time the battery becomes dead. A <b>secondary battery</b> can be charged again, because charging reverses the reaction.</p>
      <table><thead><tr><th>Cell</th><th>Kind</th><th>Parts and use</th></tr></thead><tbody><tr><td>Dry cell (Leclanche cell)</td><td>Primary</td><td>Zinc container as anode; carbon rod as cathode with manganese dioxide and carbon; a paste of ammonium chloride and zinc chloride as electrolyte; used in transistors and clocks</td></tr><tr><td>Mercury cell</td><td>Primary</td><td>A paste of potassium hydroxide and zinc oxide as electrolyte; used in hearing aids and watches</td></tr><tr><td>Lead storage battery</td><td>Secondary</td><td>Lead anode and lead dioxide cathode; a 38 percent solution of sulphuric acid as electrolyte</td></tr><tr><td>Nickel cadmium cell</td><td>Secondary</td><td>Cadmium anode, nickel dioxide cathode and potassium hydroxide electrolyte; it lasts longer than the lead storage cell</td></tr><tr><td>Fuel cell</td><td>Converts the energy of fuels such as hydrogen, carbon monoxide and methane directly into electricity</td><td>A hydrogen and oxygen fuel cell was used in the Apollo Space Programme</td></tr></tbody></table>
      <div class="cp-note trap">Dry cell and mercury cell are primary, but lead storage and nickel cadmium cells are secondary, which means they can be recharged.</div>
      <div class="cp-note exam">Remember: lead storage uses sulphuric acid, a hydrogen oxygen fuel cell was used in Apollo, and mercury cells run hearing aids.</div>
    `
  },
  23: {
    questext: "Which of the following is a secondary battery?",
    options: ["Dry cell", "Lead storage battery", "Mercury cell", "Cell of a hearing aid"],
    correct: "2",
    exptext: "✅ The lead storage battery can be recharged, so it is secondary. 📌 Secondary means rechargeable. ❌ A dry cell is wrong because it works only once and is primary."
  },
  24: {
    questext: "Which cell was used to supply electric power in the Apollo Space Programme?",
    options: ["Dry cell", "Mercury cell", "Lead storage battery", "Hydrogen oxygen fuel cell"],
    correct: "4",
    exptext: "✅ A hydrogen and oxygen fuel cell gave power in the Apollo programme. 📌 Space needs fuel cells. ❌ Lead storage battery is wrong because it is heavy and used in vehicles."
  },
  25: {
    type: "concept", icon: "🧱", accent: "#ec4899", pauseTimer: true,
    title: "Corrosion",
    html: `
      <p class="cp-lead">When iron stays in moist air for a long time, it gets a brown flaky coating called <b>rust</b>. <u>The slow eating away of a metal like this is called corrosion.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/22.png" alt="rusted metal bridge iron corrosion photo" data-caption="Rust slowly weakens iron structures that are left unprotected." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/23.png" alt="Iron nail with arrows from air (oxygen) and water drops pointing to it, giving a brown rus" data-caption="Iron rusts only when both oxygen and water are present." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/24.png" alt="painted bridge steel structure photo" data-caption="Paint keeps air and water away from iron." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Rust is mainly hydrated iron(III) oxide, Fe<sub>2</sub>O<sub>3</sub>.xH<sub>2</sub>O. In corrosion, the metal is oxidised, which means it loses electrons to oxygen and forms an oxide.</p>
      <table><thead><tr><th>Way to stop rusting</th><th>How it works</th></tr></thead><tbody><tr><td>Painting</td><td>Keeps air and water away</td></tr><tr><td>Oiling and greasing</td><td>Forms a layer that keeps water away</td></tr><tr><td>Galvanising</td><td>Coats iron with zinc</td></tr><tr><td>Chrome plating</td><td>Coats iron with chromium</td></tr><tr><td>Stainless steel</td><td>Made with chromium, nickel and manganese, so it does not rust</td></tr></tbody></table>
      <div class="cp-note trap">Both oxygen and water are needed for rusting. Dry air alone does not cause rust.</div>
      <div class="cp-note exam">Rust is Fe<sub>2</sub>O<sub>3</sub>.xH<sub>2</sub>O, and galvanisation uses zinc.</div>
    `
  },
  26: {
    questext: "What is the chemical formula of rust?",
    options: ["FeCl3", "FeSO4", "Fe3O4", "Fe2O3.xH2O"],
    correct: "4",
    exptext: "✅ Rust is hydrated iron(III) oxide, Fe2O3.xH2O. 📌 Rust means iron oxide with water. ❌ FeSO4 is wrong because it is ferrous sulphate, not rust."
  },
  27: {
    questext: "Which of the following does NOT prevent rusting of iron?",
    options: ["Painting", "Galvanising", "Keeping iron in moist air", "Oiling and greasing"],
    correct: "3",
    exptext: "✅ Moist air makes iron rust faster. 📌 Rust needs oxygen and water. ❌ Galvanising is wrong because zinc coating protects iron."
  },
  28: {
    type: "concept", icon: "⚙️", accent: "#f43f5e", pauseTimer: true,
    title: "Catalysis and Enzyme Catalysis",
    html: `
      <p class="cp-lead">A <b>catalyst</b> is a substance that changes the rate of a reaction. <u>The catalyst itself is not changed during the reaction.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/25.png" alt="Energy hill graph: one tall hill labelled without catalyst, one lower hill labelled with c" data-caption="A catalyst lowers the activation energy needed for a reaction." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/26.png" alt="Haber process ammonia plant industrial photo" data-caption="Industrial plants use catalysts to make ammonia and other chemicals." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/27.png" alt="Lock and key picture: enzyme shape with a matching starch molecule, labelled enzyme and su" data-caption="An enzyme fits its own substance like a key fits a lock." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Catalysts are specific in their action. A catalyst does not change the equilibrium state of a reversible reaction, but it brings the reaction to equilibrium quickly. Its main job is to lower the activation energy, which is the energy hill the reaction must climb.</p>
      <table><thead><tr><th>Process</th><th>Product</th><th>Catalyst</th></tr></thead><tbody><tr><td>Haber process</td><td>Ammonia</td><td>Iron, with molybdenum as a promoter</td></tr><tr><td>Contact process</td><td>Sulphuric acid</td><td>Vanadium pentoxide</td></tr><tr><td>Ostwald process</td><td>Nitric acid</td><td>Platinum gauze</td></tr><tr><td>Deacon process</td><td>Chlorine</td><td>Cupric chloride</td></tr><tr><td>Synthesis of petrol</td><td>Petrol</td><td>Nickel, iron, cobalt and alumina</td></tr></tbody></table>
      <p class="cp-lead">Enzymes are biocatalysts, and all are proteins. Their rate of work is much affected by pH.</p>
      <table><thead><tr><th>Enzyme</th><th>Change it brings about</th></tr></thead><tbody><tr><td>Diastase</td><td>Starch to maltose</td></tr><tr><td>Maltase</td><td>Maltose to glucose</td></tr><tr><td>Zymase</td><td>Glucose to ethyl alcohol</td></tr><tr><td>Invertase</td><td>Sucrose to glucose and fructose</td></tr><tr><td>Urease</td><td>Urea to ammonia and carbon dioxide</td></tr></tbody></table>
      <div class="cp-note trap">A catalyst speeds up or slows down a reaction, but it never changes where the equilibrium lies.</div>
      <div class="cp-note exam">Remember: Haber with iron, Contact with vanadium pentoxide, Ostwald with platinum, Deacon with cupric chloride.</div>
    `
  },
  29: {
    questext: "Which catalyst is used in the Haber process for making ammonia?",
    options: ["Platinum", "Iron", "Cupric chloride", "Vanadium pentoxide"],
    correct: "2",
    exptext: "✅ The Haber process uses iron as the catalyst, with molybdenum as a promoter. 📌 Haber with Hammered iron. ❌ Vanadium pentoxide is wrong because it is used in the Contact process."
  },
  30: {
    questext: "Consider the following statements about catalysts:\n1. A catalyst is not itself changed by the reaction.\n2. A catalyst only brings a reversible reaction to equilibrium faster.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 A catalyst helps and is not changed. ❌ Choosing only one statement misses that it is unchanged or that equilibrium is only reached faster."
  },
  31: {
    questext: "The main function of a catalyst in a reaction is to:",
    options: ["Increase the activation energy", "Change the equilibrium state", "Be used up completely", "Decrease the activation energy"],
    correct: "4",
    exptext: "✅ A catalyst lowers the activation energy, so the reaction goes faster. 📌 Lower the hill. ❌ Changing the equilibrium state is wrong because a catalyst does not shift it."
  },
  32: {
    type: "concept", icon: "🧊", accent: "#84cc16", pauseTimer: true,
    title: "Matter and Its Nature",
    html: `
      <p class="cp-lead">Matter can exist in <b>three states</b>: solid, liquid and gas. <u>The states depend on how strongly the particles attract each other.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/28.png" alt="Three boxes: solid with tightly packed particles, liquid with loosely packed particles, ga" data-caption="Particles are packed tightly in solids and spread widely in gases." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/29.png" alt="wet clothes drying on a line sunny day photo" data-caption="Wet clothes dry by evaporation, which needs warmth and wind." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Property</th><th>Solid</th><th>Liquid</th><th>Gas</th></tr></thead><tbody><tr><td>Force of attraction between particles</td><td>Maximum</td><td>Intermediate</td><td>Minimum</td></tr><tr><td>Space between particles</td><td>Minimum</td><td>Intermediate</td><td>Maximum</td></tr><tr><td>Kinetic energy of particles</td><td>Minimum</td><td>Intermediate</td><td>Maximum</td></tr></tbody></table>
      <p class="cp-lead">The states of matter can be changed by changing temperature or pressure. The change of a solid into a liquid is called melting, or fusion.</p>
      <p class="cp-lead"><b>Evaporation</b> is a surface process. Particles at the surface gain enough energy to overcome the attraction and become vapour. It depends on the surface area, the temperature, the humidity and the wind speed, and it causes cooling.</p>
      <div class="cp-note trap">Evaporation takes place at the surface and at any temperature, but boiling takes place throughout the liquid.</div>
      <div class="cp-note exam">Remember: attraction is highest in solids and lowest in gases; evaporation causes cooling.</div>
    `
  },
  33: {
    questext: "In which state of matter are the forces of attraction between particles the least?",
    options: ["Solid", "Liquid", "Gas", "All are equal"],
    correct: "3",
    exptext: "✅ Gas particles attract each other the least. 📌 Gas particles are free. ❌ Solid is wrong because solids have the strongest attraction."
  },
  34: {
    questext: "Evaporation of a liquid causes:",
    options: ["Warming", "Fusion", "Freezing", "Cooling"],
    correct: "4",
    exptext: "✅ Evaporation causes cooling because the fastest particles leave the surface. 📌 Sweat dries and cools. ❌ Warming is wrong because the surface loses energy."
  },
  35: {
    type: "concept", icon: "🪙", accent: "#10b981", pauseTimer: true,
    title: "Metals and Non-metals",
    html: `
      <p class="cp-lead">Elements are divided into <b>metals</b> and <b>non-metals</b>. <u>Most metals are hard, shiny solids that conduct heat and electricity.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/30.png" alt="liquid mercury droplets metal photo" data-caption="Mercury is the only common metal that is liquid at room temperature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/31.png" alt="sodium metal stored under oil photo" data-caption="Sodium is so soft that it can be cut with a knife." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/32.png" alt="gold leaf thin sheet photo" data-caption="Gold is the most malleable metal and can be beaten into thin sheets." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Property</th><th>Metals</th><th>Non-metals</th></tr></thead><tbody><tr><td>State</td><td>Solids at room temperature, except mercury; caesium and gallium melt just above 28 degrees Celsius</td><td>May be solid, liquid or gas; bromine is the only liquid non-metal</td></tr><tr><td>Hardness</td><td>Generally hard, but sodium and potassium can be cut with a knife</td><td>Soft</td></tr><tr><td>Conduction</td><td>Good conductors of heat and electricity; silver is the best, followed by copper</td><td>Non-conductors</td></tr><tr><td>Shape</td><td>Malleable and ductile; gold and silver are the best</td><td>Brittle and not shiny</td></tr><tr><td>Oxides</td><td>Mostly basic; zinc oxide and aluminium oxide are amphoteric</td><td>Acidic</td></tr></tbody></table>
      <p class="cp-lead">Metals are electropositive, which means they lose electrons and form positive ions. Alkali metals, which are lithium, sodium, potassium, rubidium and caesium, are stored under kerosene or liquid paraffin to protect them from air.</p>
      <p class="cp-lead">Mercury offers a very high resistance to the flow of electric current. Examples of non-metals are the noble gases, chlorine, bromine and phosphorus.</p>
      <div class="cp-note trap">Mercury is a metal but it is a liquid. Bromine is a non-metal and it is also a liquid, so remember one liquid in each group.</div>
      <div class="cp-note exam">Silver is the best conductor of heat and electricity; gold and silver are the most malleable and ductile metals.</div>
    `
  },
  36: {
    questext: "Which metal is the best conductor of heat and electricity?",
    options: ["Copper", "Gold", "Silver", "Aluminium"],
    correct: "3",
    exptext: "✅ Silver is the best conductor, followed by copper. 📌 Silver first, copper second. ❌ Copper is wrong because it is second best."
  },
  37: {
    questext: "Which non-metal is a liquid at room temperature?",
    options: ["Chlorine", "Bromine", "Iodine", "Phosphorus"],
    correct: "2",
    exptext: "✅ Bromine is the only non-metal that is a liquid at room temperature. 📌 Bromine is the liquid one. ❌ Chlorine is wrong because it is a gas."
  },
  38: {
    type: "concept", icon: "🧂", accent: "#0ea5e9", pauseTimer: true,
    title: "Compounds of Sodium, Potassium and Calcium",
    html: `
      <p class="cp-lead">Many useful chemicals come from the <b>alkali metals</b> and the <b>alkaline earth metals</b>. <u>Learn each name, formula and use as a set.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/33.png" alt="quicklime calcium oxide lumps photo" data-caption="Quicklime is calcium oxide, a white solid that reacts with water." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/34.png" alt="milk of magnesia bottle antacid photo" data-caption="Milk of magnesia is a mild base used as an antacid." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/35.png" alt="Simple cell: a vessel with molten sodium chloride and calcium chloride mixture, with sodiu" data-caption="In a Downs cell, sodium metal is made by electrolysis of molten salt." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Compound</th><th>Formula</th><th>Fact and use</th></tr></thead><tbody><tr><td>Sodium sulphate decahydrate</td><td>Na<sub>2</sub>SO<sub>4</sub>.10H<sub>2</sub>O</td><td>Glauber's salt, used as a purgative</td></tr><tr><td>Sodium thiosulphate pentahydrate</td><td>Na<sub>2</sub>S<sub>2</sub>O<sub>3</sub>.5H<sub>2</sub>O</td><td>Hypo, used in photography as a fixing agent</td></tr><tr><td>Fusion mixture</td><td>Na<sub>2</sub>CO<sub>3</sub> and K<sub>2</sub>CO<sub>3</sub></td><td>A mixture of sodium carbonate and potassium carbonate</td></tr><tr><td>Potassium superoxide</td><td>KO<sub>2</sub></td><td>Gives oxygen and removes carbon dioxide in space capsules, submarines and breathing masks</td></tr><tr><td>Potassium cyanide</td><td>KCN</td><td>Used to extract silver and gold; more poisonous than sodium cyanide</td></tr><tr><td>Potassium hydroxide</td><td>KOH</td><td>Caustic potash, used for soft soap; its water solution is potash lye</td></tr><tr><td>Potassium carbonate</td><td>K<sub>2</sub>CO<sub>3</sub></td><td>Potash or pearl ash</td></tr><tr><td>Calcium oxide</td><td>CaO</td><td>Quick lime, used in glass, cement, bleaching powder, extraction of iron and as a drying agent for ammonia</td></tr><tr><td>Calcium hydroxide</td><td>Ca(OH)<sub>2</sub></td><td>Slaked lime, used for caustic soda, sodalime and softening hard water</td></tr><tr><td>Magnesium hydroxide</td><td>Mg(OH)<sub>2</sub></td><td>Milk of magnesia, used as an antacid</td></tr></tbody></table>
      <p class="cp-lead">Sodium metal is prepared by the electrolysis of a molten mixture of 40 percent sodium chloride and 60 percent calcium chloride in a Downs cell. Roads are de-iced after snowfall by spreading salts, and liquid calcium chloride and magnesium chloride are also used.</p>
      <div class="cp-note trap">Caustic soda is sodium hydroxide, but caustic potash is potassium hydroxide. The first metal in the name gives the answer.</div>
      <div class="cp-note exam">Hypo is sodium thiosulphate, Glauber's salt is sodium sulphate decahydrate, and quick lime is CaO.</div>
    `
  },
  39: {
    questext: "Which chemical is known as hypo and is used as a fixing agent in photography?",
    options: ["Sodium sulphate", "Sodium carbonate", "Sodium chloride", "Sodium thiosulphate"],
    correct: "4",
    exptext: "✅ Hypo is sodium thiosulphate pentahydrate. 📌 Hypo fixes photos. ❌ Sodium sulphate decahydrate is wrong because that is Glauber's salt, a purgative."
  },
  40: {
    questext: "Which compound is known as Glauber's salt?",
    options: ["Na2SO4.10H2O", "Na2S2O3.5H2O", "Na2CO3.10H2O", "NaHCO3"],
    correct: "1",
    exptext: "✅ Glauber's salt is Na2SO4.10H2O and it is used as a purgative. 📌 Glauber with sulphate. ❌ Na2S2O3.5H2O is wrong because that is hypo."
  },
  41: {
    questext: "Which of the following is quick lime?",
    options: ["Ca(OH)2", "CaCO3", "CaO", "CaSO4"],
    correct: "3",
    exptext: "✅ Quick lime is calcium oxide, CaO. 📌 Quick lime has oxide. ❌ Ca(OH)2 is wrong because that is slaked lime."
  },
  42: {
    type: "concept", icon: "💎", accent: "#a855f7", pauseTimer: true,
    title: "Boron and Aluminium",
    html: `
      <p class="cp-lead"><b>Boron</b> is a semimetal, also called a metalloid. <u>It occurs in nature in combined form as borax.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/36.png" alt="bauxite ore aluminium raw rock photo" data-caption="Bauxite is the main ore from which aluminium is extracted." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/37.png" alt="ruby sapphire emerald gemstones photo" data-caption="Ruby, sapphire and emerald are valued gemstones." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/38.png" alt="thermite welding railway track photo" data-caption="Aluminium powder is used in thermite welding." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Substance</th><th>Fact</th></tr></thead><tbody><tr><td>Boron and boron carbide rods</td><td>Used to control nuclear reactions</td></tr><tr><td>Boron carbide</td><td>Hardest artificial substance after diamond, known as Norbia</td></tr><tr><td>Orthoboric acid</td><td>Used as an antiseptic and eye wash under the name boric lotion</td></tr><tr><td>Aluminium</td><td>Third most abundant element in the Earth's crust; extracted from bauxite, Al<sub>2</sub>O<sub>3</sub>.2H<sub>2</sub>O</td></tr><tr><td>Aluminium powder</td><td>Used in fireworks, flash light powder and thermite welding</td></tr><tr><td>Ammonal</td><td>Mixture of aluminium powder and ammonium nitrate; an explosive</td></tr></tbody></table>
      <p class="cp-lead">Ruby and sapphire are mainly aluminium oxide, Al<sub>2</sub>O<sub>3</sub>. Ruby is red because of chromium, and sapphire is blue because of iron and titanium. Emerald is green and it is a silicate of beryllium and aluminium coloured by chromium.</p>
      <div class="cp-note trap">Boron is not a true metal. It is a semimetal, and its carbide is very hard.</div>
      <div class="cp-note exam">Remember: boron carbide is Norbia, ruby is red because of chromium, and bauxite is the ore of aluminium.</div>
    `
  },
  43: {
    questext: "The hardest artificial substance after diamond, boron carbide, is known as:",
    options: ["Ammonal", "Hypo", "Pyrex", "Norbia"],
    correct: "4",
    exptext: "✅ Boron carbide is called Norbia and it is the hardest artificial substance after diamond. 📌 Norbia is boron's hard carbide. ❌ Ammonal is wrong because it is an explosive of aluminium and ammonium nitrate."
  },
  44: {
    questext: "Ruby gets its red colour because of the presence of:",
    options: ["Iron", "Chromium", "Titanium", "Cobalt"],
    correct: "2",
    exptext: "✅ Ruby is red because of chromium. 📌 Ruby, red, chromium. ❌ Iron and titanium are wrong because they make sapphire blue."
  },
  45: {
    type: "concept", icon: "🔩", accent: "#b45309", pauseTimer: true,
    title: "Tin, Lead, Zirconium, Vanadium and Tungsten",
    html: `
      <p class="cp-lead">Each of these metals has its own special ore and use. <u>Learn the one famous fact for each metal.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/39.png" alt="tin plated food cans photo" data-caption="Tin plating protects iron cans from rusting." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/40.png" alt="galena lead sulphide mineral crystals photo" data-caption="Galena is the main ore of lead." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/41.png" alt="incandescent bulb tungsten filament close up photo" data-caption="Tungsten wire glows inside a bulb." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Metal</th><th>Key facts</th></tr></thead><tbody><tr><td>Tin</td><td>Ore is cassiterite, SnO<sub>2</sub>, also called tin stone; tin plating stops rusting of iron; tin amalgam is used in making mirrors; stannic chloride pentahydrate, called butter of tin, is used as a mordant in dyeing</td></tr><tr><td>Lead</td><td>Mainly found as galena, PbS; red lead, Pb<sub>3</sub>O<sub>4</sub>, also called minium or sindhur, is used for protective paint for iron and in the match industry</td></tr><tr><td>Zirconium</td><td>Used for the core of nuclear reactors and for pumps, valves and heat exchangers</td></tr><tr><td>Vanadium</td><td>Vanadium pentoxide, V<sub>2</sub>O<sub>5</sub>, is a very good catalyst for making sulphuric acid by the Contact process</td></tr><tr><td>Tungsten</td><td>Filaments in electric bulbs; calcium tungstate is used in the X-ray tube</td></tr></tbody></table>
      <p class="cp-lead">In cold countries, white tin changes into grey tin powder. This change is called <b>tin disease</b> or <b>tin plague</b>.</p>
      <div class="cp-note trap">The ore of tin is cassiterite, while the ore of lead is galena. Do not swap the two.</div>
      <div class="cp-note exam">Remember: tungsten for bulb filaments, vanadium pentoxide for the Contact process, and zirconium for nuclear reactors.</div>
    `
  },
  46: {
    questext: "In cold countries, white tin changes into grey tin powder. This is called:",
    options: ["Tin plating", "Amalgamation", "Tin plague", "Galvanisation"],
    correct: "3",
    exptext: "✅ The change of white tin into grey tin powder in the cold is called tin plague or tin disease. 📌 Plague spreads and crumbles the tin. ❌ Tin plating is wrong because it means coating iron with tin."
  },
  47: {
    questext: "Which metal is used for making filaments of electric bulbs?",
    options: ["Tungsten", "Vanadium", "Tin", "Zirconium"],
    correct: "1",
    exptext: "✅ Tungsten filaments are used in electric bulbs because tungsten has a very high melting point. 📌 Tungsten, bulb. ❌ Vanadium is wrong because its pentoxide is a catalyst for the Contact process."
  },
  48: {
    type: "concept", icon: "🏭", accent: "#64748b", pauseTimer: true,
    title: "Iron and Steel",
    html: `
      <p class="cp-lead"><b>Iron</b> is extracted from its haematite ore. <u>The kind of iron or steel you get depends on how much carbon it contains.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/42.png" alt="haematite iron ore specimen photo" data-caption="Haematite is a main ore of iron." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/43.png" alt="wrought iron decorative gate photo" data-caption="Wrought iron is the purest form of iron and is easy to shape." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/44.png" alt="stainless steel surgical instruments photo" data-caption="Stainless steel does not rust, so it is used for surgical tools." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Form</th><th>Carbon content</th><th>Fact</th></tr></thead><tbody><tr><td>Cast iron</td><td>2.5 to 4 percent</td><td>The most impure form of iron</td></tr><tr><td>Wrought or malleable iron</td><td>0.12 to 0.5 percent</td><td>The purest form of iron, with the least carbon</td></tr><tr><td>Mild steel</td><td>0.25 to 0.5 percent</td><td>Medium carbon steel</td></tr><tr><td>Hard steel</td><td>0.5 to 1.5 percent</td><td>High carbon steel</td></tr><tr><td>Soft steel</td><td>Up to 0.25 percent</td><td>Low carbon steel</td></tr><tr><td>Stainless steel</td><td>Low</td><td>An alloy of iron, chromium and nickel</td></tr></tbody></table>
      <p class="cp-lead">Iron(II) is present in haemoglobin, the red substance in blood. Ferric chloride is used as a styptic, which means a substance that stops bleeding from a cut. Ferrous sulphate is used for making blue black ink.</p>
      <div class="cp-note trap">Cast iron has the most carbon but it is the most impure. Wrought iron has the least carbon and is the purest.</div>
      <div class="cp-note exam">Cast iron has 2.5 to 4 percent carbon; wrought iron is the purest; ferric chloride is a styptic.</div>
    `
  },
  49: {
    questext: "Which form of iron is the purest?",
    options: ["Cast iron", "Mild steel", "Hard steel", "Wrought iron"],
    correct: "4",
    exptext: "✅ Wrought iron, also called malleable iron, has the least carbon and is the purest. 📌 Wrought means worked and pure. ❌ Cast iron is wrong because it has 2.5 to 4 percent carbon and is the most impure."
  },
  50: {
    questext: "Consider the following statements about iron:\n1. Cast iron is the most impure form of iron and contains 2.5 to 4 percent carbon.\n2. Stainless steel rusts easily because it has chromium and nickel.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Cast iron has the most carbon. ❌ Statement 2 is wrong because chromium and nickel make stainless steel resist rust."
  },
  51: {
    type: "concept", icon: "🥇", accent: "#06b6d4", pauseTimer: true,
    title: "Copper, Silver, Gold, Mercury and Zinc",
    html: `
      <p class="cp-lead">Copper, silver and gold are called <b>coinage metals</b>. <u>Their compounds have special names that exams like to ask.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/45.png" alt="gold silver copper coins photo" data-caption="Copper, silver and gold are the coinage metals." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/46.png" alt="blue copper sulphate crystals photo" data-caption="Blue vitriol is hydrated copper sulphate." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/47.png" alt="Two crystal jars labelled: blue vitriol, copper sulphate pentahydrate; white vitriol, zinc" data-caption="Blue vitriol is copper sulphate and white vitriol is zinc sulphate." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Metal</th><th>Compound or fact</th><th>Special name or use</th></tr></thead><tbody><tr><td>Silver</td><td>Silver amalgam</td><td>Filling teeth; silvering mirrors</td></tr><tr><td>Silver</td><td>Silver bromide, AgBr</td><td>Used in photography</td></tr><tr><td>Silver</td><td>Silver nitrate, AgNO<sub>3</sub></td><td>Lunar caustic, used in marking inks and hair dyes</td></tr><tr><td>Copper</td><td>CuSO<sub>4</sub>.5H<sub>2</sub>O</td><td>Blue vitriol or nila thotha</td></tr><tr><td>Copper</td><td>Copper iron sulphide, CuFeS<sub>2</sub></td><td>Fool's gold</td></tr><tr><td>Mercury</td><td>Mercuric sulphide, HgS</td><td>Used as a cosmetic in Ayurvedic medicine, called Makardhwaja</td></tr><tr><td>Zinc</td><td>Metal</td><td>Used in galvanisation to prevent rusting of iron</td></tr><tr><td>Zinc</td><td>Zinc sulphide</td><td>Used to prepare X-ray screens</td></tr><tr><td>Zinc</td><td>Zinc oxide</td><td>Philosopher's wool</td></tr><tr><td>Zinc</td><td>ZnSO<sub>4</sub>.7H<sub>2</sub>O</td><td>White vitriol</td></tr></tbody></table>
      <div class="cp-note trap">Blue vitriol is copper sulphate, but white vitriol is zinc sulphate. The colour does not always match the metal, so learn the pair.</div>
      <div class="cp-note exam">Lunar caustic is silver nitrate, blue vitriol is copper sulphate, and philosopher's wool is zinc oxide.</div>
    `
  },
  52: {
    questext: "Which compound is known as blue vitriol or nila thotha?",
    options: ["ZnSO4.7H2O", "FeSO4", "CuFeS2", "CuSO4.5H2O"],
    correct: "4",
    exptext: "✅ Blue vitriol is copper sulphate pentahydrate, CuSO4.5H2O. 📌 Blue goes with copper. ❌ ZnSO4.7H2O is wrong because that is white vitriol."
  },
  53: {
    questext: "Philosopher's wool is the name of which compound?",
    options: ["Zinc oxide", "Zinc sulphide", "Zinc sulphate", "Zinc chloride"],
    correct: "1",
    exptext: "✅ Zinc oxide is called philosopher's wool. 📌 Oxide wool. ❌ Zinc sulphide is wrong because it is used for X-ray screens."
  },
  54: {
    type: "concept", icon: "🌋", accent: "#78350f", pauseTimer: true,
    title: "Metallurgy: Minerals, Ores and Gangue",
    html: `
      <p class="cp-lead"><b>Metallurgy</b> is the process of extracting metals from their ores. <u>First we need three terms: mineral, ore and gangue.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/48.png" alt="cinnabar mercury ore red mineral photo" data-caption="Cinnabar is the red ore of mercury." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/49.png" alt="malachite azurite copper ore specimens photo" data-caption="Malachite and azurite are copper ores." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/50.png" alt="Flow: Ore from mine - crushing - separating gangue - metal extraction - pure metal, with t" data-caption="An ore is crushed, the gangue is removed and metal is extracted." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Natural substances in which metals and impurities are found in a combined state are called <b>minerals</b>. The minerals from which a metal can be extracted conveniently and profitably are called <b>ores</b>. The impurities that stay with an ore are called <b>gangue</b> or <b>matrix</b>.</p>
      <table><thead><tr><th>Metal</th><th>Important ores and their composition</th></tr></thead><tbody><tr><td>Sodium</td><td>Rock salt NaCl, Chile saltpetre NaNO<sub>3</sub>, borax Na<sub>2</sub>B<sub>4</sub>O<sub>7</sub>.10H<sub>2</sub>O</td></tr><tr><td>Potassium</td><td>Carnallite KCl.MgCl<sub>2</sub>.6H<sub>2</sub>O, sylvine KCl</td></tr><tr><td>Magnesium</td><td>Carnallite, magnesite MgCO<sub>3</sub>, asbestos CaSiO<sub>3</sub>.3MgSiO<sub>3</sub></td></tr><tr><td>Calcium</td><td>Limestone CaCO<sub>3</sub>, gypsum CaSO<sub>4</sub>.2H<sub>2</sub>O, fluorspar CaF<sub>2</sub></td></tr><tr><td>Aluminium</td><td>Bauxite Al<sub>2</sub>O<sub>3</sub>.2H<sub>2</sub>O, cryolite Na<sub>3</sub>AlF<sub>6</sub>, feldspar KAlSi<sub>3</sub>O<sub>8</sub></td></tr><tr><td>Manganese</td><td>Pyrolusite MnO<sub>2</sub>, manganite Mn<sub>2</sub>O<sub>3</sub>.H<sub>2</sub>O, manganese blende MnS</td></tr><tr><td>Iron</td><td>Haematite Fe<sub>2</sub>O<sub>3</sub>, magnetite Fe<sub>3</sub>O<sub>4</sub>, iron pyrites FeS<sub>2</sub>, siderite FeCO<sub>3</sub></td></tr><tr><td>Copper</td><td>Copper glance Cu<sub>2</sub>S, copper pyrites CuFeS<sub>2</sub>, malachite Cu(OH)<sub>2</sub>.CuCO<sub>3</sub>, azurite 2CuCO<sub>3</sub>.Cu(OH)<sub>2</sub></td></tr><tr><td>Silver</td><td>Silver glance Ag<sub>2</sub>S, horn silver AgCl, ruby silver Ag<sub>2</sub>S.Sb<sub>2</sub>S<sub>3</sub></td></tr><tr><td>Gold</td><td>Calverite AuTe<sub>2</sub>, sylvanite AuAgTe<sub>4</sub></td></tr><tr><td>Zinc</td><td>Zinc blende ZnS, calamine ZnCO<sub>3</sub>, zincite ZnO, franklinite ZnO.Fe<sub>2</sub>O<sub>3</sub></td></tr><tr><td>Mercury</td><td>Cinnabar HgS</td></tr><tr><td>Tin</td><td>Cassiterite SnO<sub>2</sub></td></tr><tr><td>Lead</td><td>Galena PbS, cerrusite PbCO<sub>3</sub>, anglesite PbSO<sub>4</sub></td></tr></tbody></table>
      <div class="cp-note trap">Every ore is a mineral, but not every mineral is an ore. An ore must be worth extracting the metal from.</div>
      <div class="cp-note exam">Remember: haematite for iron, bauxite for aluminium, cinnabar for mercury, galena for lead and cassiterite for tin.</div>
    `
  },
  55: {
    questext: "The impurities that are found along with an ore are called:",
    options: ["Mineral", "Ore", "Slag", "Gangue"],
    correct: "4",
    exptext: "✅ Gangue, or matrix, is the impurity found with an ore. 📌 Gangue is the gang of waste. ❌ Slag is wrong because it is formed when gangue is removed in a furnace."
  },
  56: {
    questext: "Which is the chief ore of mercury?",
    options: ["Cinnabar", "Galena", "Haematite", "Bauxite"],
    correct: "1",
    exptext: "✅ Cinnabar, HgS, is the ore of mercury. 📌 Cinnabar is red like mercury sulphide. ❌ Galena is wrong because it is lead sulphide."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a refined periodic table tile with a gold element symbol, a small copper battery cell, and a polished metal ingot" },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dmitri Mendeleev portrait photograph\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/1.png. a portrait of Mendeleev",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"modern periodic table wall chart photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/2.png. a coloured periodic table chart",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/3.png": { t: "fig", about: "Three cards: Mendeleev law uses atomic mass; Modern law uses atomic number; Long form has 7 periods as rows and 18 groups as columns." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/4.png": { t: "fig", about: "Tug of war picture: two atoms pulling a shared pair of electrons, one pulling harder, labelled electronegativity." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/5.png": { t: "fig", about: "An atom losing one electron and turning into a positive ion, labelled cation, with energy arrow labelled ionisation enthalpy." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"burning candle flame close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/6.png. a burning candle",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rusted iron chain photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/7.png. an old rusted iron chain",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/8.png": { t: "fig", about: "Two panels: ice melting into water, labelled physical change, same substance; iron turning into rust, labelled chemical change, new substance." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Antoine Lavoisier portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/9.png. a portrait of Lavoisier",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"John Dalton portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/10.png. a portrait of John Dalton",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/11.png": { t: "fig", about: "Water molecule picture: 1 part hydrogen and 8 parts oxygen by mass, labelled constant ratio." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"campfire burning logs flames photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/12.png. a campfire with glowing logs",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/13.png": { t: "fig", about: "Two simple energy bars: exothermic with reactants high and products lower and heat released; endothermic with reactants low and products higher and heat absorbed." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/14.png": { t: "fig", about: "Two atoms with an electron arrow from the first atom to the second; first labelled oxidised, loses electrons, reducing agent; second labelled reduced, gains electrons, oxidising agent." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"corroded rusty car metal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/15.png. rust on an old car",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/16.png": { t: "fig", about: "Cell with two copper strips in blue copper sulphate solution joined to a battery; labels: anode loses copper, cathode gains copper." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"copper refining electrolysis cathode plates industrial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/17.png. thick copper plates in a refining tank",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"galvanised steel zinc coated surface photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/18.png. a zinc coated steel surface",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"dry cell Leclanche battery cutaway zinc carbon photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/19.png. a cut open dry cell battery",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"lead acid car battery photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/20.png. a lead storage battery for a vehicle",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Apollo spacecraft fuel cell hydrogen oxygen photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/21.png. a fuel cell of the Apollo spacecraft",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/22.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"rusted metal bridge iron corrosion photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/22.png. a rusted iron bridge",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/23.png": { t: "fig", about: "Iron nail with arrows from air (oxygen) and water drops pointing to it, giving a brown rust layer; labelled Both oxygen and water are needed." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"painted bridge steel structure photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/24.png. a painted steel bridge",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/25.png": { t: "fig", about: "Energy hill graph: one tall hill labelled without catalyst, one lower hill labelled with catalyst, with labels activation energy." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Haber process ammonia plant industrial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/26.png. an ammonia plant",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/27.png": { t: "fig", about: "Lock and key picture: enzyme shape with a matching starch molecule, labelled enzyme and substrate." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/28.png": { t: "fig", about: "Three boxes: solid with tightly packed particles, liquid with loosely packed particles, gas with widely spaced moving particles, with labelled attraction strong, medium and weak." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"wet clothes drying on a line sunny day photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/29.png. wet clothes drying outdoors",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"liquid mercury droplets metal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/30.png. shiny drops of liquid mercury",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"sodium metal stored under oil photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/31.png. a piece of sodium stored in oil",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/32.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"gold leaf thin sheet photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/32.png. very thin gold leaf",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"quicklime calcium oxide lumps photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/33.png. white lumps of quicklime",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"milk of magnesia bottle antacid photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/34.png. a bottle of milk of magnesia",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/35.png": { t: "fig", about: "Simple cell: a vessel with molten sodium chloride and calcium chloride mixture, with sodium metal collecting at one electrode, labelled Downs cell." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"bauxite ore aluminium raw rock photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/36.png. reddish bauxite rock",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"ruby sapphire emerald gemstones photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/37.png. a red, a blue and a green gemstone",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"thermite welding railway track photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/38.png. sparks from thermite welding of a rail",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"tin plated food cans photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/39.png. tin plated cans",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"galena lead sulphide mineral crystals photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/40.png. shiny grey galena crystals",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"incandescent bulb tungsten filament close up photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/41.png. a glowing bulb filament",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/42.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"haematite iron ore specimen photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/42.png. a shiny grey haematite iron ore",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"wrought iron decorative gate photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/43.png. a wrought iron gate",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"stainless steel surgical instruments photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/44.png. stainless steel surgical tools",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/45.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"gold silver copper coins photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/45.png. gold, silver and copper coins",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"blue copper sulphate crystals photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/46.png. bright blue copper sulphate crystals",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/47.png": { t: "fig", about: "Two crystal jars labelled: blue vitriol, copper sulphate pentahydrate; white vitriol, zinc sulphate heptahydrate." },
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/48.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"cinnabar mercury ore red mineral photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/48.png. red cinnabar mineral",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/49.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"malachite azurite copper ore specimens photo\". Download a clear, suitable photo and save it as images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/49.png. green and blue copper ore",
  "images/General_Awareness/Chemistry/Chemistry_Part4_Periodic_Table_Reactions_Metals/50.png": { t: "fig", about: "Flow: Ore from mine -> crushing -> separating gangue -> metal extraction -> pure metal, with the word gangue on the waste." }
});

/* CHANGE LOG
   - The law of conservation of mass was stated by Lavoisier in 1789, not 1744.
   - Mercury melts at minus 39 degrees Celsius, so it is liquid at room temperature; the value 39 degrees was wrong.
   - Melting of wax is the physical change; burning of wax is a chemical change.
   - Emerald is beryllium aluminium silicate coloured by chromium, not calcium and aluminium silicate.
   - Printing blocks, not typing blocks, are made by electrolysis.
   - Down's cell spelling corrected to Downs cell; caprolactam, Leclanche and similar names corrected.
   - Oxidising agent and reducing agent definitions rewritten in clear electron terms.
*/
