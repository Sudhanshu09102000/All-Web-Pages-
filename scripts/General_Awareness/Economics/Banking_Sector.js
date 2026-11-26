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

/* Field: General_Awareness · Subject: Economics · Chapter: Banking_Sector · 30 concept pages (+ overview) · 75 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏦", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Banking Sector of India",
    thumb: {
      image: "images/General_Awareness/Economics/Banking_Sector/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "BANKING SECTOR",
      line2: "RBI • NPA • BASEL",
      line3: "FULL CHAPTER",
      badge: "COMPLETE",
      ribbon: "NOTES • FACTS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Banking Sector Complete Chapter | RBI, NPA, Basel, NBFC, Mergers | General Awareness",
      altTitles: ["Banking Sector in One Video for All Government Exams", "RBI, Monetary Policy and Bank Mergers Made Easy"],
      description: "The Banking Sector is one of the most scoring chapters of Economics in General Awareness. In this class we learn it step by step in simple words.\n\n📌 IN THIS CLASS\n✅ What is a bank, NPA and bad banks\n✅ Reserve Bank of India, repo rate, CRR, SLR and MPC\n✅ Nationalisation and bank mergers\n✅ NBFC, PSL, RRB, Small Finance and Payments Banks\n✅ Basel norms, PCA, Sashakt and Indradhanush\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Banking #RBI #GeneralAwareness",
      tags: ["banking sector", "banking awareness", "rbi functions", "monetary policy", "repo rate", "reverse repo rate", "crr and slr", "npa and bad bank", "narcl idrcl", "bank nationalisation", "bank mergers 2020", "basel norms", "pca framework", "nbfc", "priority sector lending", "regional rural banks", "small finance banks", "payments banks", "mpc committee", "indradhanush plan", "project sashakt", "banks board bureau", "economics for ssc", "general awareness", "static gk banking", "government exam economics", "SSC CGL", "UPSC", "Banking Sector Economics class"],
      hashtags: ["Banking", "RBI", "GeneralAwareness"],
      thumbText: "BANKING SECTOR FULL CHAPTER",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏦 New class is live: Banking Sector complete chapter. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Economics — General Awareness Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Banking Sector</u>: what a bank is, how the Reserve Bank of India controls money, how banks were built, merged and reformed, and which special banks and institutions exist. This chapter gives many direct questions in every exam, so we will learn it slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>30</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>75</b><span>Questions</span></div>
        <div class="cp-stat"><b>~135 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Banks, Bad Loans and Bad Banks</b><br>How a bank earns profit, why unpaid loans hurt it, and how bad banks and the Insolvency Code clean up the system.</li>
        <li><b>Reserve Bank of India and Monetary Policy</b><br>The history and functions of the central bank, its rate tools, ratio tools, qualitative tools and the Monetary Policy Committee.</li>
        <li><b>History, Nationalisation and Mergers</b><br>From the first bank of 1770 to nationalisation in 1969 and 1980, and the big mergers of 2017, 2019 and 2020.</li>
        <li><b>Structure of Banking and Financial Institutions</b><br>Scheduled banks, major banks with their years, and the national development institutions.</li>
        <li><b>Basel Norms and Prompt Corrective Action</b><br>International safety rules for banks and how the Reserve Bank watches weak banks.</li>
        <li><b>Special Banks and Lenders</b><br>Non-banking financial companies, priority sector lending, Regional Rural Banks, Small Finance Banks and Payments Banks.</li>
        <li><b>Banking Reforms</b><br>Public Credit Registry, Project Sashakt, the Indradhanush Plan, the Banks Board Bureau and the Financial Services Institutions Bureau.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Banking is a favourite topic of General Awareness in every government exam. Dates, committee names, percentages and full forms are asked again and again, so a clear understanding saves marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🏦", accent: "#22c55e", pauseTimer: true,
    title: "What is a Bank?",
    html: `
      <p class="cp-lead">A bank is an institution that takes <b>deposits</b> from the public and gives <b>loans</b> to people, businesses and the government. <u>A bank earns its profit from the gap between the interest it charges and the interest it pays.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/1.png" alt="Three boxes in a row joined by arrows: Public, Bank, Borrowers. First arrow labelled Depos" data-caption="Money flows from the public to the bank and then to borrowers as loans." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/2.png" alt="Two-step profit chart: Bank Margin minus Operational Cost equals Gross Profit, then Gross " data-caption="A bank turns its interest margin into gross profit and then into net profit." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A bank is a middleman. It collects money from savers at a low interest rate and lends the same money at a higher interest rate. The difference is called the <b>bank margin</b> or <b>interest rate spread</b>, and it is the main income of a bank.</p>
      <table><thead><tr><th>Side</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Liabilities (borrowings)</td><td>Money the bank must give back to others</td><td>Money deposited by the public</td></tr><tr><td>Assets</td><td>Things that earn money for the bank</td><td>Loans, property, gold and cash in the vault</td></tr></tbody></table>
      <p class="cp-lead">A deposit is a liability because the bank owes that money back to the depositor. A loan is an asset because the borrower pays interest on it.</p>
      <div class="cp-formula" translate="no"><small>Gross profit</small>Gross profit = Bank margin − Operational cost</div>
      <div class="cp-formula" translate="no"><small>Net profit</small>Net profit = Gross profit − Corporate tax</div>
      <div class="cp-example"><b>Example:</b> A bank pays 5 rupees of interest on every 100 rupees of deposit and charges 9 rupees on a loan of the same size. The margin is 4 rupees on every 100 rupees. After the running costs and the tax are paid, what remains is the net profit, which is shared among the shareholders.</div>
      <div class="cp-note trap">Many learners think a deposit is an asset because it brings money in. It is a liability, because the bank has to return it.</div>
      <div class="cp-note exam">The banking sector is a key part of the monetary policy of India, so questions often link banks with the Reserve Bank of India.</div>
    `
  },
  3: {
    questext: "Which of the following is an asset of a bank?",
    options: ["Savings account money of customers", "Loans given to borrowers", "Fixed deposits of customers", "Money deposited by the public"],
    correct: "2",
    exptext: "✅ Loans are assets because borrowers pay interest on them. 📌 Money that comes back to the bank is an asset; money the bank must return is a liability. ❌ Deposits are wrong because the bank owes that money to depositors."
  },
  4: {
    questext: "The main source of income of a bank is the difference between the lending rate and the deposit rate. What is this difference called?",
    options: ["Interest rate spread", "Cash reserve", "Liquidity gap", "Statutory margin"],
    correct: "1",
    exptext: "✅ The gap is called the interest rate spread or bank margin. 📌 Buy money cheap from savers, sell it dear to borrowers. ❌ Cash reserve is wrong because it is the money kept with the Reserve Bank, not an income."
  },
  5: {
    type: "concept", icon: "📉", accent: "#ef4444", pauseTimer: true,
    title: "Assets of Banks and Non-Performing Assets",
    html: `
      <p class="cp-lead">Loans are the main <b>assets</b> of a bank because they earn interest. <u>When a borrower stops repaying, the loan becomes a Non-Performing Asset (NPA).</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/3.png" alt="Two rows. Top row: Performing Asset, principal plus interest paid on time, money received " data-caption="A performing loan returns money on time, while a non-performing loan stops paying." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/4.png" alt="Chain of boxes with arrows: NPAs rise, profit of bank falls, balance sheet turns negative," data-caption="Rising bad loans reduce bank profit and can lead to a banking crisis." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A loan that gives regular interest and is repaid on time is a performing asset. If the principal or the interest stays unpaid for more than <b>90 days</b>, the bank declares it a Non-Performing Asset. The bank then loses income, and the loan appears as a bad entry in its balance sheet.</p>
      <table><thead><tr><th>Point</th><th>Performing asset</th><th>Non-Performing Asset</th></tr></thead><tbody><tr><td>Repayment</td><td>Principal and interest come on time</td><td>Repayment has stopped</td></tr><tr><td>Income for the bank</td><td>Yes</td><td>No</td></tr><tr><td>Effect on profit</td><td>Profit rises</td><td>Profit falls</td></tr><tr><td>Time test</td><td>Paid by the due date</td><td>Overdue for more than 90 days</td></tr></tbody></table>
      <p class="cp-lead">If many loans turn into NPAs, the bank's profit falls and its balance sheet becomes weak. In the worst case the bank faces a liquidity crisis, which means it does not have enough cash to repay its depositors.</p>
      <div class="cp-example"><b>Example:</b> A bank gives a loan of 100 rupees. The borrower misses the payments for 91 days. The loan is now an NPA, and the bank can no longer count the interest on it as income.</div>
      <div class="cp-note trap">The test is "more than 90 days" overdue, not "exactly 90 days".</div>
      <div class="cp-note exam">NPA is a problem of the asset side of a bank, because the loans are the assets of the bank.</div>
    `
  },
  6: {
    questext: "A loan is declared a Non-Performing Asset when its principal or interest remains overdue for more than how many days?",
    options: ["30 days", "60 days", "90 days", "180 days"],
    correct: "3",
    exptext: "✅ The limit is more than 90 days. 📌 Think of three months. ❌ 180 days is wrong because that is the timeline of a later resolution plan, not the NPA test."
  },
  7: {
    questext: "Consider the following statements about Non-Performing Assets:\n1. A Non-Performing Asset is a loan on which the borrower has stopped paying the principal or the interest.\n2. A rise in Non-Performing Assets increases the profit of a bank.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Bad loans bring no income. ❌ Statement 2 is wrong because more bad loans reduce the profit of the bank."
  },
  8: {
    type: "concept", icon: "🏚️", accent: "#f59e0b", pauseTimer: true,
    title: "Bad Banks",
    html: `
      <p class="cp-lead">A bad bank is a special institution that buys the bad loans of other banks. <u>It takes the bad loans away so that the normal banks can clean their books and lend again.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/5.png" alt="Cycle diagram: Banks sell a 100 crore rupee NPA to the Bad Bank, Bad Bank pays 90 crore ru" data-caption="A bad bank buys bad loans at a discount and cleans the balance sheets of banks." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/6.png" alt="Mind map with centre label NPAs (Bad Loans, Bad Assets) linked to Bad Bank, NPA File, Reco" data-caption="A mind map of what a bad bank does with bad loans." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Suppose a bank has a bad loan of 100 crore rupees. The bad bank may buy it for about 90 crore rupees. The bank now has cash instead of a bad loan, so its balance sheet becomes clean and it can give new loans. The bad bank then tries to recover the money from the borrower by using recovery laws.</p>
      <table><thead><tr><th>Bank before the sale</th><th>Bank after the sale</th></tr></thead><tbody><tr><td>NPAs are high</td><td>NPAs are low</td></tr><tr><td>Profit is low</td><td>Profit rises</td></tr><tr><td>Balance sheet is weak</td><td>Balance sheet is strong</td></tr><tr><td>Very little new lending</td><td>More new loans</td></tr></tbody></table>
      <div class="cp-note trap">A bad bank is not a bank for the public. It does not take deposits or give loans; it only handles bad loans.</div>
      <div class="cp-note exam">In India, a bad bank works as an Asset Reconstruction Company, which means a company that buys and recovers bad loans.</div>
    `
  },
  9: {
    questext: "What is the main function of a bad bank?",
    options: ["To give loans to farmers", "To buy and recover the bad loans of other banks", "To print currency notes", "To fix the repo rate"],
    correct: "2",
    exptext: "✅ A bad bank takes over the bad loans of banks. 📌 Bad bank means a bank for bad loans, not a bank for bad people. ❌ Giving loans is wrong because a bad bank does not lend to the public."
  },
  10: {
    type: "concept", icon: "⚖️", accent: "#8b5cf6", pauseTimer: true,
    title: "Key Tribunals and the Insolvency and Bankruptcy Code",
    html: `
      <p class="cp-lead">India's latest recovery law is the <b>Insolvency and Bankruptcy Code (IBC), 2016</b>. <u>It gives a time-bound way to settle the debts of those who cannot repay.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/7.png" alt="Tree diagram: Insolvency and Bankruptcy Code 2016 at the top, branching to Insolvency and " data-caption="The Insolvency Code and the tribunals that decide company and individual cases." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/8.png" alt="National Company Law Tribunal bench building India photo" data-caption="The National Company Law Tribunal, which hears company insolvency cases in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Insolvency means a person or a company cannot pay its debts. Bankruptcy is the stage where a court or tribunal formally declares this and orders the debts to be settled. The Insolvency and Bankruptcy Board of India is the regulator set up in 2016 under the Code to run the process between lenders and borrowers.</p>
      <table><thead><tr><th>Tribunal</th><th>Full name</th><th>What it handles</th></tr></thead><tbody><tr><td>NCLT</td><td>National Company Law Tribunal</td><td>Insolvency cases of companies</td></tr><tr><td>NCLAT</td><td>National Company Law Appellate Tribunal</td><td>Appeals against NCLT orders</td></tr><tr><td>DRT</td><td>Debt Recovery Tribunal</td><td>Loan recovery cases of banks and insolvency of individuals</td></tr><tr><td>DRAT</td><td>Debt Recovery Appellate Tribunal</td><td>Appeals against DRT orders</td></tr></tbody></table>
      <p class="cp-lead">A tribunal is a special court-like body made for one kind of dispute. An appellate tribunal hears appeals, which means complaints against the decision of the lower tribunal.</p>
      <div class="cp-note trap">NCLT and NCLAT deal with companies, while DRT and DRAT deal with bank debts and individuals. Do not swap them.</div>
      <div class="cp-note exam">These four tribunals are important for settling banking and corporate disputes in India.</div>
    `
  },
  11: {
    questext: "Which tribunal hears appeals against the orders of the National Company Law Tribunal?",
    options: ["Debt Recovery Tribunal", "Debt Recovery Appellate Tribunal", "Securities Appellate Tribunal", "National Company Law Appellate Tribunal"],
    correct: "4",
    exptext: "✅ The appellate body of the National Company Law Tribunal is the National Company Law Appellate Tribunal. 📌 Same name with the word Appellate added. ❌ The Debt Recovery Appellate Tribunal is wrong because it hears appeals against the Debt Recovery Tribunal."
  },
  12: {
    questext: "The Insolvency and Bankruptcy Code was passed in which year?",
    options: ["2013", "2014", "2016", "2019"],
    correct: "3",
    exptext: "✅ The Code was passed in 2016 and is India's latest recovery law. 📌 Remember 16 for the Code and for the Board. ❌ 2013 is wrong because that is the year of the Companies Act."
  },
  13: {
    type: "concept", icon: "🏛️", accent: "#14b8a6", pauseTimer: true,
    title: "NARCL and IDRCL",
    html: `
      <p class="cp-lead">India has two bad bank companies. NARCL buys the large bad loans and IDRCL manages their recovery. <u>Public sector banks hold the majority of NARCL, while private sector banks hold the majority of IDRCL.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/9.png" alt="Two panels side by side. Left panel: NARCL share holding 51 percent Public Sector Banks (m" data-caption="The share holdings of the two bad bank companies are mirror images of each other." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/10.png" alt="Flow diagram: Banks sell large NPAs to NARCL, then IDRCL manages the resolution process, t" data-caption="NARCL buys the bad loans and IDRCL manages the process of recovering them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Feature</th><th>NARCL</th><th>IDRCL</th></tr></thead><tbody><tr><td>Full name</td><td>National Asset Reconstruction Company Limited</td><td>India Debt Resolution Company Limited</td></tr><tr><td>Role</td><td>Buys large NPAs from public sector banks</td><td>Manages and resolves the NPAs</td></tr><tr><td>Holds 51 percent</td><td>Public sector banks</td><td>Private sector banks</td></tr><tr><td>Holds 49 percent</td><td>Private sector banks</td><td>Public sector banks</td></tr><tr><td>Described as</td><td>India's first public sector bad bank</td><td>India's first private sector bad bank</td></tr></tbody></table>
      <p class="cp-lead">NARCL is owned mostly by public sector banks, so it is called the public sector bad bank. IDRCL is owned mostly by private sector banks. It supplies the skill and the process for resolving the bad loans that NARCL buys.</p>
      <div class="cp-note trap">The two holdings are exactly reversed. Do not mix up which group of banks owns 51 percent.</div>
      <div class="cp-note exam">Both companies started their work in 2022 and help clean the balance sheets of public sector banks.</div>
    `
  },
  14: {
    questext: "India's first public sector bad bank is:",
    options: ["IDRCL", "NARCL", "NABARD", "SIDBI"],
    correct: "2",
    exptext: "✅ The National Asset Reconstruction Company Limited is the first public sector bad bank. 📌 N for National, and N also starts the word Nationalised. ❌ IDRCL is wrong because it is the private sector company that manages the resolution."
  },
  15: {
    questext: "In the India Debt Resolution Company Limited, which group of banks holds the majority stake of 51 percent?",
    options: ["Public sector banks", "Foreign banks", "Private sector banks", "Regional Rural Banks"],
    correct: "3",
    exptext: "✅ Private sector banks hold 51 percent of IDRCL. 📌 IDRCL is the mirror of NARCL. ❌ Public sector banks are wrong because they hold 51 percent only in NARCL."
  },
  16: {
    type: "concept", icon: "🪙", accent: "#3b82f6", pauseTimer: true,
    title: "Reserve Bank of India (RBI)",
    html: `
      <p class="cp-lead">The Reserve Bank of India (RBI) is the <b>central bank</b> of India. <u>It controls money and credit in the country and also supervises the other banks.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/11.png" alt="Reserve Bank of India headquarters Mumbai building photo" data-caption="The Reserve Bank of India building in Mumbai, headquarters of the central bank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/12.png" alt="Diagram: RBI at the top, left branch Central Bank of India under the RBI Act 1934, right b" data-caption="The Reserve Bank works as the central bank and as the regulator of banks." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Established</td><td>1 April 1935</td></tr><tr><td>Based on</td><td>Recommendation of the Hilton Young Commission, 1926</td></tr><tr><td>Act</td><td>Reserve Bank of India Act, 1934</td></tr><tr><td>Nationalised</td><td>1 January 1949, after which it became fully government-owned</td></tr><tr><td>Headquarters</td><td>Mumbai, Maharashtra (it was in Kolkata at first and shifted in 1937)</td></tr><tr><td>Regional offices</td><td>Four: Delhi, Mumbai, Kolkata and Chennai</td></tr><tr><td>First Governor</td><td>Osborne Smith (British)</td></tr><tr><td>First Indian Governor</td><td>C. D. Deshmukh, in 1943</td></tr><tr><td>Banking law</td><td>Banking Regulation Act, 1949, passed by Parliament to regulate commercial banks</td></tr></tbody></table>
      <p class="cp-lead">The RBI was born from the Reserve Bank of India Act of 1934 and started work on 1 April 1935. The government took over its full ownership on 1 January 1949, so it is a government-owned bank today.</p>
      <p class="cp-lead">Before the two countries had their own central banks, the RBI also worked as the central bank of Burma (Myanmar) until 1947 and of Pakistan until 30 June 1948.</p>
      <div class="cp-note trap">The RBI was established in 1935 but nationalised in 1949. Do not give 1949 as the year of its birth.</div>
      <div class="cp-note exam">Questions often ask for the first Governor (Osborne Smith), the first Indian Governor (C. D. Deshmukh) and the Hilton Young Commission.</div>
    `
  },
  17: {
    questext: "The Reserve Bank of India was established on the recommendation of which body?",
    options: ["Narasimham Committee", "Hilton Young Commission", "Nachiket Mor Committee", "Sunil Mehta Committee"],
    correct: "2",
    exptext: "✅ The Hilton Young Commission of 1926 recommended a central bank. 📌 Young commission, young bank of 1935. ❌ The Narasimham Committee is wrong because it dealt with banking reform and rural banks later."
  },
  18: {
    questext: "Who was the first Indian Governor of the Reserve Bank of India?",
    options: ["Osborne Smith", "Raghuram Rajan", "Urjit Patel", "C. D. Deshmukh"],
    correct: "4",
    exptext: "✅ C. D. Deshmukh became the first Indian Governor in 1943. 📌 D for Deshmukh, D for Desi (Indian). ❌ Osborne Smith is wrong because he was the first Governor but he was British."
  },
  19: {
    questext: "Consider the following statements about the Reserve Bank of India:\n1. It was nationalised on 1 January 1949.\n2. Its headquarters has always been in Mumbai since 1935.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Born in Kolkata, moved to Mumbai in 1937. ❌ Statement 2 is wrong because the headquarters was first in Kolkata and shifted in 1937."
  },
  20: {
    type: "concept", icon: "🧰", accent: "#f97316", pauseTimer: true,
    title: "Functions of RBI as a Central Bank",
    html: `
      <p class="cp-lead">As the central bank, the RBI does eight main jobs. <u>It prints currency, serves the government, helps other banks and controls the flow of credit.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/13.png" alt="Mind map with RBI in the centre and eight spokes: Issue of Currency, Banker to Government," data-caption="The eight main functions of the Reserve Bank of India around one centre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/14.png" alt="Indian rupee banknotes different denominations photo" data-caption="Indian rupee notes, which are issued by the Reserve Bank of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Function</th><th>Meaning</th></tr></thead><tbody><tr><td>Issue of currency</td><td>Issues all currency notes of 2 rupees and above; the 1 rupee note is issued by the Ministry of Finance</td></tr><tr><td>Banker to the government</td><td>Acts as banker, agent and financial adviser to the Central and State Governments</td></tr><tr><td>Banker's bank</td><td>Gives banking services and financial help to commercial banks</td></tr><tr><td>Controller of credit</td><td>Controls credit and money supply through the Repo Rate, the Cash Reserve Ratio and the Statutory Liquidity Ratio</td></tr><tr><td>Custodian of foreign exchange reserves</td><td>Keeps and manages the foreign exchange reserves of the country</td></tr><tr><td>Lender of last resort</td><td>Gives emergency money to banks during a crisis</td></tr><tr><td>Regulator and supervisor</td><td>Regulates and supervises banks and other financial institutions</td></tr><tr><td>Clearing house</td><td>Helps banks settle payments between each other</td></tr></tbody></table>
      <p class="cp-lead">A "lender of last resort" is the final source of help. When a bank cannot get money from anywhere else, it can turn to the RBI.</p>
      <div class="cp-note trap">The 1 rupee note is issued by the Ministry of Finance, not the RBI. Notes of 2 rupees and above come from the RBI.</div>
      <div class="cp-note exam">A common question asks which function is NOT done by the RBI, such as accepting deposits from the public or giving loans to common people.</div>
    `
  },
  21: {
    questext: "Which of the following currency notes is NOT issued by the Reserve Bank of India?",
    options: ["1 rupee note", "10 rupee note", "100 rupee note", "500 rupee note"],
    correct: "1",
    exptext: "✅ The 1 rupee note is issued by the Ministry of Finance. 📌 The RBI issues notes of 2 rupees and above. ❌ The other notes are wrong choices because the RBI issues all of them."
  },
  22: {
    questext: "When a commercial bank cannot get funds from any other source during a crisis, the Reserve Bank acts as its:",
    options: ["Lender of last resort", "Custodian of reserves", "Clearing house", "Banker to the government"],
    correct: "1",
    exptext: "✅ Emergency help to banks is the lender of last resort function. 📌 Last option, last resort. ❌ Banker to the government is wrong because that role serves the Centre and the States, not banks."
  },
  23: {
    questext: "The Reserve Bank of India acts as a banker to which of the following?",
    options: ["Only the Central Government", "Only commercial banks", "The Central and State Governments, and commercial banks", "Only the public"],
    correct: "3",
    exptext: "✅ It is banker to the Central and State Governments and also banker's bank for commercial banks. 📌 Two bankers in one. ❌ Only the Central Government is wrong because State Governments are served too."
  },
  24: {
    type: "concept", icon: "📐", accent: "#84cc16", pauseTimer: true,
    title: "Monetary Policy and Quantitative Tools: Bank Rate, Repo Rate, Reverse Repo Rate",
    html: `
      <p class="cp-lead">Monetary policy is the way the RBI controls money supply, credit and interest rates to keep prices stable and help growth. <u>Quantitative tools change the total amount of credit in the economy.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/15.png" alt="Two-column flow chart. Left column: Rates up, loans become expensive, money supply falls, " data-caption="How a rise or fall in the rate tools changes inflation and growth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/16.png" alt="Three boxes: Bank Rate (banks borrow from RBI, long term, no collateral), Repo Rate (banks" data-caption="Who lends and who borrows in the Bank Rate, Repo Rate and Reverse Repo Rate." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>Bank Rate</b> is the rate at which the RBI lends to commercial banks for the long term without asking for securities. The <b>Repo Rate</b> is the rate at which the RBI lends to banks for a short time against government securities. "Repo" comes from Repurchase Agreement: the bank sells securities and promises to buy them back later. The <b>Reverse Repo Rate</b> is the rate at which the RBI borrows money from banks for a short time.</p>
      <table><thead><tr><th>Tool</th><th>Who borrows</th><th>Duration</th><th>Collateral</th></tr></thead><tbody><tr><td>Bank Rate</td><td>Banks from RBI</td><td>Long term</td><td>Not required</td></tr><tr><td>Repo Rate</td><td>Banks from RBI</td><td>Short term</td><td>Government securities required</td></tr><tr><td>Reverse Repo Rate</td><td>RBI from banks</td><td>Short term</td><td>Government securities required</td></tr></tbody></table>
      <p class="cp-lead">When these rates go up, loans become costly, people borrow less, money supply falls and inflation is controlled. When they go down, loans become cheap, borrowing rises, money supply grows and the economy is pushed up.</p>
      <div class="cp-example"><b>Example:</b> Prices are rising too fast. The RBI raises the Repo Rate. Banks now pay more to borrow, so they charge more on loans, fewer people borrow, spending slows down and the price rise cools.</div>
      <div class="cp-note trap">Reverse Repo Rate is always lower than the Repo Rate. In reverse repo the RBI is the borrower, not the lender.</div>
      <div class="cp-note exam">Remember the direction: raising rates fights inflation, and cutting rates fights recession.</div>
    `
  },
  25: {
    questext: "In a Repo transaction, who borrows money from whom?",
    options: ["The RBI from commercial banks", "Commercial banks from the RBI", "The public from banks", "The government from the public"],
    correct: "2",
    exptext: "✅ In repo, banks borrow from the RBI against securities. 📌 Repo means banks Receive money. ❌ The RBI borrowing from banks is wrong because that is the reverse repo."
  },
  26: {
    questext: "To control inflation, the Reserve Bank of India will generally:",
    options: ["Lower the Repo Rate", "Raise the Repo Rate", "Buy government securities", "Lower the Cash Reserve Ratio"],
    correct: "2",
    exptext: "✅ A higher Repo Rate makes loans costly and reduces money supply. 📌 High rate, cool prices. ❌ Lowering the rate is wrong because it makes loans cheap and raises spending."
  },
  27: {
    questext: "Which of the following statements about rate tools is correct?\n1. The Reverse Repo Rate is lower than the Repo Rate.\n2. In the Bank Rate, the RBI lends to banks for the short term against government securities.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Bank Rate is long term, Repo is short term. ❌ Statement 2 is wrong because the Bank Rate is for the long term and needs no securities."
  },
  28: {
    type: "concept", icon: "🧮", accent: "#06b6d4", pauseTimer: true,
    title: "Cash Reserve Ratio, Statutory Liquidity Ratio and Open Market Operations",
    html: `
      <p class="cp-lead">The Cash Reserve Ratio and the Statutory Liquidity Ratio force banks to keep a part of their money aside. <u>A bigger ratio leaves less money to lend, so money supply and inflation come down.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/17.png" alt="Side by side comparison cards. CRR card: cash only, kept with RBI, no interest earned, con" data-caption="The Cash Reserve Ratio and the Statutory Liquidity Ratio compared side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/18.png" alt="Two arrows. RBI buys government securities, money enters the market, money supply rises, u" data-caption="Open market operations: buying adds money to the economy, selling removes it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>Cash Reserve Ratio (CRR)</b> is the minimum share of a bank's Net Demand and Time Liabilities that must be kept as cash with the RBI. Banks earn no interest on it. The <b>Statutory Liquidity Ratio (SLR)</b> is the minimum share that banks must keep with themselves in cash, gold or government securities. "Statutory" means fixed by law. Banks earn interest on government securities held for SLR.</p>
      <table><thead><tr><th>Point</th><th>Cash Reserve Ratio</th><th>Statutory Liquidity Ratio</th></tr></thead><tbody><tr><td>Form of money</td><td>Cash only</td><td>Cash, gold and government securities</td></tr><tr><td>Where it is kept</td><td>With the RBI</td><td>With the bank itself</td></tr><tr><td>Interest</td><td>No interest earned</td><td>Interest earned on securities</td></tr><tr><td>Main effect</td><td>Controls money supply directly</td><td>Controls bank credit and liquidity</td></tr></tbody></table>
      <p class="cp-lead">In <b>Open Market Operations (OMO)</b> the RBI buys or sells government securities in the open market. When it buys, it puts money into the economy, which helps in a recession. When it sells, it pulls money out, which helps to control inflation.</p>
      <div class="cp-note trap">CRR is kept with the RBI and earns no interest. SLR is kept with the bank itself and can earn interest. Students often swap these.</div>
      <div class="cp-note exam">A raise in CRR or SLR reduces money supply; the RBI buying securities increases money supply.</div>
    `
  },
  29: {
    questext: "Which of the following is kept by commercial banks with the Reserve Bank of India and earns no interest?",
    options: ["Statutory Liquidity Ratio", "Cash Reserve Ratio", "Repo deposit", "Gold reserve"],
    correct: "2",
    exptext: "✅ The Cash Reserve Ratio is kept as cash with the RBI and earns nothing. 📌 CRR means Cash, Reserve with RBI. ❌ The Statutory Liquidity Ratio is wrong because it is kept with the bank itself."
  },
  30: {
    questext: "Which of the following assets can be counted by banks for the Statutory Liquidity Ratio?",
    options: ["Cash only", "Gold only", "Cash, gold and government securities", "Foreign currency only"],
    correct: "3",
    exptext: "✅ The Statutory Liquidity Ratio allows cash, gold and government securities. 📌 CGG for SLR. ❌ Cash only is wrong because that describes the Cash Reserve Ratio."
  },
  31: {
    questext: "When the Reserve Bank of India sells government securities in the open market, the money supply:",
    options: ["Increases", "Stays the same", "Falls", "Doubles"],
    correct: "3",
    exptext: "✅ Selling securities pulls money out of the economy. 📌 Sell means money goes in the RBI's pocket. ❌ Increase is wrong because that happens when the RBI buys securities."
  },
  32: {
    type: "concept", icon: "💧", accent: "#a855f7", pauseTimer: true,
    title: "LAF, MSS and MSF",
    html: `
      <p class="cp-lead">These three are tools of the RBI to manage short-term money in the banking system. <u>LAF handles daily money, MSF is for emergencies and MSS absorbs extra foreign money.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/19.png" alt="Vertical ladder: top Marginal Standing Facility Rate, middle Repo Rate, below Reverse Repo" data-caption="The interest rate ladder: the Marginal Standing Facility Rate sits above the Repo Rate." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/20.png" alt="Flow: Foreign money enters India, extra rupees in the market, RBI issues bonds under Marke" data-caption="How the Market Stabilisation Scheme absorbs the excess money of foreign inflows." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>Liquidity Adjustment Facility (LAF)</b> is the tool by which the RBI manages short-term money in the banking system every day. It works through the Repo Rate and the Reverse Repo Rate. Its aims are to manage short-term money, keep short-term interest rates steady and keep the financial system smooth. Since 2022 the Standing Deposit Facility also lets banks park extra money with the RBI without giving any securities.</p>
      <table><thead><tr><th>Tool</th><th>What it is</th><th>Key facts</th></tr></thead><tbody><tr><td>LAF</td><td>Daily control of liquidity through repo and reverse repo</td><td>Short-term money management</td></tr><tr><td>MSF</td><td>Emergency overnight borrowing by scheduled banks against government securities</td><td>Introduced 2011; rate is higher than the Repo Rate</td></tr><tr><td>MSS</td><td>RBI issues bonds to absorb excess liquidity</td><td>Adopted 2004 to handle foreign capital inflows; money is kept in a separate account, not used for government spending</td></tr></tbody></table>
      <p class="cp-lead">Under the <b>Marginal Standing Facility (MSF)</b>, a bank that faces a sudden shortage of funds can borrow overnight from the RBI by pledging government securities. It is costlier than a normal repo loan, so banks use it only in an emergency.</p>
      <div class="cp-note trap">MSS money is kept in a separate account with the RBI and is not used for government spending.</div>
      <div class="cp-note exam">MSF was introduced in 2011, MSS in 2004, and the MSF Rate is always above the Repo Rate.</div>
    `
  },
  33: {
    questext: "The Marginal Standing Facility was introduced in which year?",
    options: ["2004", "2008", "2011", "2016"],
    correct: "3",
    exptext: "✅ The Marginal Standing Facility started in 2011. 📌 MSF 2011, MSS 2004. ❌ 2004 is wrong because that is the year of the Market Stabilisation Scheme."
  },
  34: {
    questext: "Which of the following is true about the Marginal Standing Facility Rate?",
    options: ["It is lower than the Repo Rate", "It is higher than the Repo Rate", "It is equal to the Cash Reserve Ratio", "It is fixed by Parliament"],
    correct: "2",
    exptext: "✅ Emergency borrowing under the Marginal Standing Facility costs more than the Repo Rate. 📌 Emergency money is expensive. ❌ Lower than the Repo Rate is wrong because that would make emergency money cheaper than normal money."
  },
  35: {
    questext: "The Market Stabilisation Scheme was adopted mainly to:",
    options: ["Help farmers get loans", "Absorb excess liquidity caused by foreign capital inflows", "Print new notes", "Fix the exchange rate"],
    correct: "2",
    exptext: "✅ The scheme mops up extra money with bonds, mainly from foreign capital inflows. 📌 MSS means mop up surplus. ❌ Printing notes is wrong because the scheme removes money, it does not create it."
  },
  36: {
    type: "concept", icon: "🎯", accent: "#ec4899", pauseTimer: true,
    title: "Qualitative Tools of Credit Control",
    html: `
      <p class="cp-lead">Quantitative tools control the total amount of credit. <u>Qualitative tools control credit for a particular sector or purpose.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/21.png" alt="Five labelled boxes in a row: Margin Requirement, Consumer Credit Control, Rationing of Cr" data-caption="The five qualitative tools of credit control used by the Reserve Bank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/22.png" alt="Scale diagram: higher margin means smaller loan on the same collateral, lower margin means" data-caption="A higher margin requirement reduces the loan given against the same asset." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Tool</th><th>What the RBI does</th></tr></thead><tbody><tr><td>Margin Requirement</td><td>Fixes the gap between the value of the collateral and the loan amount; a higher margin gives less credit and a lower margin gives more credit</td></tr><tr><td>Consumer Credit Control</td><td>Sets the conditions for consumer loans, such as the down payment for buying consumer durable goods</td></tr><tr><td>Rationing of Credit</td><td>Fixes limits on the credit that banks can give and directs credit to priority sectors</td></tr><tr><td>Direct Action</td><td>Takes punishing steps against banks that break its rules, such as penalties and restrictions</td></tr><tr><td>Moral Suasion</td><td>Persuades banks through meetings, requests and appeals; it is not mandatory and not legal</td></tr></tbody></table>
      <p class="cp-lead">"Collateral" is something valuable, such as gold or property, that a borrower promises to the bank as security. If the value is 100 rupees and the margin is 20 percent, the bank lends only 80 rupees against it.</p>
      <div class="cp-note trap">Moral suasion is only a request. Banks are not forced by law to follow it, while direct action is a real punishment.</div>
      <div class="cp-note exam">Remember the list: Margin, Consumer credit, Rationing, Direct action, Moral suasion.</div>
    `
  },
  37: {
    questext: "Which qualitative tool of the Reserve Bank of India works by meetings, requests and appeals and has no legal force?",
    options: ["Direct action", "Rationing of credit", "Margin requirement", "Moral suasion"],
    correct: "4",
    exptext: "✅ Moral suasion is persuasion without legal force. 📌 Moral means a gentle request. ❌ Direct action is wrong because it includes penalties and restrictions."
  },
  38: {
    questext: "If the Reserve Bank raises the margin requirement on loans, then credit available to the borrower will:",
    options: ["Rise", "Remain unchanged", "Fall", "Become free of interest"],
    correct: "3",
    exptext: "✅ A higher margin means a smaller loan against the same collateral. 📌 Higher margin, smaller loan. ❌ Rise is wrong because that happens when the margin is lowered."
  },
  39: {
    type: "concept", icon: "🗳️", accent: "#e11d48", pauseTimer: true,
    title: "Monetary Policy Committee (MPC)",
    html: `
      <p class="cp-lead">Since 2016, the Monetary Policy Committee decides India's policy interest rate. <u>It has six members and decides by majority.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/23.png" alt="Two flows. Before 2016: Monetary policy decided by RBI Governor under RBI Act 1934. After " data-caption="How the authority to decide monetary policy moved from the Governor to a committee." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/24.png" alt="Group diagram of six members: three from RBI (Governor as chairperson, Deputy Governor, on" data-caption="The six members of the Monetary Policy Committee: three from RBI, three from the Government." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Urjit Patel Committee recommended a committee-based system, and the MPC was created in 2016 through an amendment of the RBI Act. It is a <b>statutory body</b>, which means it is formed by law. Before 2016 the Governor took the decision alone.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Total members</td><td>6</td></tr><tr><td>From the RBI</td><td>Governor (chairperson), Deputy Governor and one RBI officer</td></tr><tr><td>From the Central Government</td><td>3 members appointed by the Central Government</td></tr><tr><td>Decision</td><td>By majority; the Governor has a casting vote in case of a tie</td></tr><tr><td>Target</td><td>Flexible Inflation Targeting: 4 percent with a band of plus or minus 2 percent</td></tr><tr><td>Limits</td><td>Lower limit 2 percent, upper limit 6 percent</td></tr></tbody></table>
      <p class="cp-lead">Flexible Inflation Targeting (FIT) means the RBI aims at a target of 4 percent inflation but is allowed to stay anywhere between 2 percent and 6 percent.</p>
      <div class="cp-note trap">Do not say the Governor alone sets the Repo Rate today. Since 2016 the Committee decides.</div>
      <div class="cp-note exam">Remember 6 members: 3 plus 3, formed in 2016, target 4 percent with a band of 2 percent either way.</div>
    `
  },
  40: {
    questext: "The Monetary Policy Committee was formed in which year?",
    options: ["2014", "2016", "2018", "2020"],
    correct: "2",
    exptext: "✅ The Committee was formed in 2016 through an amendment of the RBI Act. 📌 Sixteen, six members. ❌ 2014 is wrong because that is the year the Urjit Patel Committee gave its report."
  },
  41: {
    questext: "How many members of the Monetary Policy Committee are appointed by the Central Government?",
    options: ["2", "4", "3", "5"],
    correct: "3",
    exptext: "✅ Three of the six members are appointed by the Central Government and three come from the RBI. 📌 Half and half. ❌ 4 is wrong because that is the majority needed, not the number of government members."
  },
  42: {
    questext: "The inflation target set for the Monetary Policy Committee is:",
    options: ["2 percent with a band of plus or minus 1 percent", "6 percent with a band of plus or minus 2 percent", "4 percent with a band of plus or minus 2 percent", "5 percent with a band of plus or minus 3 percent"],
    correct: "3",
    exptext: "✅ The target is 4 percent, with a band from 2 to 6 percent. 📌 Four in the middle, two on each side. ❌ 6 percent is wrong because it is only the upper limit of the band."
  },
  43: {
    questext: "Consider the following statements about the Monetary Policy Committee:\n1. It is a statutory body.\n2. Its chairperson is the Finance Minister of India.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because the Committee is created by law. 📌 The chair is the RBI Governor. ❌ Statement 2 is wrong because the Governor of the RBI chairs the Committee."
  },
  44: {
    type: "concept", icon: "📞", accent: "#10b981", pauseTimer: true,
    title: "Call Money Rate and Call Money Market",
    html: `
      <p class="cp-lead">Banks lend money to each other for a very short time. <u>The interest rate on this lending is the Call Money Rate, and the market where it happens is the Call Money Market.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/25.png" alt="Two banks facing each other: Bank A with extra cash lends overnight to Bank B with a short" data-caption="Two banks lending and borrowing money for a very short time." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/26.png" alt="Timeline bar from 1 day to 14 days labelled overnight to short period lending, with the la" data-caption="The call money market handles lending from one day up to fourteen days." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A bank may have extra cash on one day while another bank has a shortage. The first bank lends the cash for a day or a few days, and the second bank pays interest. This inter-bank interest rate is the <b>Call Money Rate</b>, and the market is the <b>Call Money Market</b>.</p>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Call Money Rate</td><td>Inter-bank lending rate for very short loans</td></tr><tr><td>Call Money Market</td><td>The place where banks lend and borrow among themselves</td></tr><tr><td>Period</td><td>Overnight up to 14 days</td></tr><tr><td>Benchmark</td><td>MIBOR, the Mumbai Interbank Offered Rate</td></tr></tbody></table>
      <div class="cp-note trap">Call money is lending between banks, not between a bank and the public.</div>
      <div class="cp-note exam">The old London Interbank Offered Rate (LIBOR) has been discontinued, and MIBOR is the Indian benchmark that exam questions mention.</div>
    `
  },
  45: {
    questext: "The interest rate charged on the overnight lending between banks is known as:",
    options: ["Bank Rate", "Call Money Rate", "Repo Rate", "Discount Rate"],
    correct: "2",
    exptext: "✅ The inter-bank short-term rate is the Call Money Rate. 📌 Banks call each other for cash. ❌ The Bank Rate is wrong because that is the long-term lending rate of the RBI to banks."
  },
  46: {
    type: "concept", icon: "🕰️", accent: "#eab308", pauseTimer: true,
    title: "History of Banking in India",
    html: `
      <p class="cp-lead">Modern banking in India began in the 1700s. <u>The first bank was the Bank of Hindustan, started in 1770 in Calcutta.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/27.png" alt="Timeline: 1770 Bank of Hindustan, 1806 Bank of Bengal, 1840 Bank of Bombay, 1843 Bank of M" data-caption="The path from the first Indian bank of 1770 to the State Bank of India in 1955." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/28.png" alt="Imperial Bank of India historic building photo" data-caption="A historic building of the Imperial Bank of India, the bank that became State Bank of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Bank of Hindustan was started in Kolkata (then Calcutta) under European management. Later, the British set up three Presidency Banks, which became the base of modern Indian banking. In 1921 these three banks were joined to form the Imperial Bank of India, which was nationalised on 1 July 1955 and renamed the State Bank of India (SBI).</p>
      <table><thead><tr><th>Presidency Bank</th><th>Year</th><th>Location</th></tr></thead><tbody><tr><td>Bank of Bengal</td><td>1806</td><td>Calcutta</td></tr><tr><td>Bank of Bombay</td><td>1840</td><td>Bombay (Mumbai)</td></tr><tr><td>Bank of Madras</td><td>1843</td><td>Madras (Chennai)</td></tr></tbody></table>
      <table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody><tr><td>First bank run by Indians</td><td>Avadh Commercial Bank, 1881</td></tr><tr><td>First fully Indian bank</td><td>Punjab National Bank, 1894</td></tr><tr><td>Bank formed in 1921</td><td>Imperial Bank of India, from the three Presidency Banks</td></tr><tr><td>State Bank of India</td><td>1 July 1955</td></tr></tbody></table>
      <div class="cp-note trap">The first bank run by Indians was Avadh Commercial Bank (1881), but the first fully Indian bank is Punjab National Bank (1894).</div>
      <div class="cp-note exam">Order to remember: Bengal 1806, Bombay 1840, Madras 1843, then Imperial Bank 1921, then SBI 1955.</div>
    `
  },
  47: {
    questext: "Which was the first bank established in India?",
    options: ["Bank of Bengal", "Punjab National Bank", "Bank of Hindustan", "Imperial Bank of India"],
    correct: "3",
    exptext: "✅ The Bank of Hindustan was started in 1770 in Calcutta. 📌 Hindustan means first of India. ❌ Bank of Bengal is wrong because it is a Presidency Bank formed in the early 1800s."
  },
  48: {
    questext: "The Imperial Bank of India was formed in 1921 by the merger of:",
    options: ["Bank of Hindustan, Punjab National Bank and Bank of Baroda", "Bank of Bengal, Bank of Bombay and Bank of Madras", "Avadh Commercial Bank and Punjab National Bank", "Union Bank, Indian Bank and UCO Bank"],
    correct: "2",
    exptext: "✅ The three Presidency Banks were merged in 1921. 📌 Three presidencies, one Imperial Bank. ❌ Hindustan, Punjab and Baroda is wrong because none of them was a Presidency Bank."
  },
  49: {
    questext: "Which was the first fully Indian bank?",
    options: ["Avadh Commercial Bank", "Bank of Baroda", "Indian Bank", "Punjab National Bank"],
    correct: "4",
    exptext: "✅ Punjab National Bank (1894) is the first fully Indian bank. 📌 Avadh was run by Indians first, but PNB was fully Indian. ❌ Avadh Commercial Bank is wrong because it is only the first bank run by Indians."
  },
  50: {
    type: "concept", icon: "🔑", accent: "#0ea5e9", pauseTimer: true,
    title: "Nationalisation of Banks",
    html: `
      <p class="cp-lead">Nationalisation means bringing privately owned banks under the ownership of the Government of India. <u>It happened in two rounds during the time of Prime Minister Indira Gandhi.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/29.png" alt="Indira Gandhi Prime Minister of India 1969 photo" data-caption="Indira Gandhi, the Prime Minister of India during the nationalisation of banks." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/30.png" alt="Timeline with two points: 19 July 1969 first round 14 big banks, 15 April 1980 second roun" data-caption="The two rounds of nationalisation, in 1969 and 1980." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Round</th><th>Date</th><th>Banks nationalised</th><th>Total after</th></tr></thead><tbody><tr><td>First</td><td>19 July 1969</td><td>14 big banks</td><td>14</td></tr><tr><td>Second</td><td>15 April 1980</td><td>6 more banks</td><td>20</td></tr></tbody></table>
      <p class="cp-lead">The aims were to take banking to rural and semi-urban areas, reduce the control of a few rich people on wealth, make credit available to priority sectors such as agriculture and small industries, and promote social and economic justice.</p>
      <table><thead><tr><th>Bharatiya Mahila Bank</th><th>Fact</th></tr></thead><tbody><tr><td>Established</td><td>19 November 2013</td></tr><tr><td>Headquarters</td><td>New Delhi</td></tr><tr><td>Special feature</td><td>India's first bank exclusively for women</td></tr><tr><td>Merger</td><td>Merged with State Bank of India on 1 April 2017</td></tr></tbody></table>
      <div class="cp-note trap">The first round was 14 banks (1969) and the second was 6 banks (1980). Do not swap the numbers.</div>
      <div class="cp-note exam">SBI was nationalised in 1955, which is different from the 1969 and 1980 rounds.</div>
    `
  },
  51: {
    questext: "How many banks were nationalised on 19 July 1969?",
    options: ["6", "14", "20", "27"],
    correct: "2",
    exptext: "✅ Fourteen big banks were nationalised in 1969. 📌 Fourteen in 1969, six in 1980. ❌ Six is wrong because that is the number nationalised in the second round of 1980."
  },
  52: {
    questext: "After the second round of nationalisation in 1980, how many public sector banks were there in the country?",
    options: ["14", "20", "6", "12"],
    correct: "2",
    exptext: "✅ Fourteen plus six makes twenty. 📌 14 plus 6 equals 20. ❌ Fourteen is wrong because it ignores the six banks added in 1980."
  },
  53: {
    questext: "India's first bank exclusively for women, the Bharatiya Mahila Bank, was merged with which bank in 2017?",
    options: ["Punjab National Bank", "Bank of Baroda", "Canara Bank", "State Bank of India"],
    correct: "4",
    exptext: "✅ It merged with State Bank of India on 1 April 2017 along with five associate banks. 📌 Mahila joined the SBI family. ❌ Punjab National Bank is wrong because it received other banks in 1993 and 2020."
  },
  54: {
    type: "concept", icon: "🔗", accent: "#d946ef", pauseTimer: true,
    title: "Merger of Banks",
    html: `
      <p class="cp-lead">Banks have been merged to make fewer but stronger banks. <u>The big merger rounds took place in 2017, 2019 and 2020.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/31.png" alt="Timeline: 1993 New Bank of India merged into Punjab National Bank, 1 April 2017 five assoc" data-caption="The main bank mergers, from 1993 to 2020." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/32.png" alt="Four arrow diagrams to four anchor banks. Punjab National Bank receives Oriental Bank of C" data-caption="The four anchor banks of 2020 and the banks that merged into them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Date</th><th>Merged banks</th><th>Anchor bank</th></tr></thead><tbody><tr><td>1993</td><td>New Bank of India</td><td>Punjab National Bank</td></tr><tr><td>1 April 2017</td><td>State Bank of Patiala, Bikaner and Jaipur, Mysore, Hyderabad, Travancore and Bharatiya Mahila Bank</td><td>State Bank of India</td></tr><tr><td>1 April 2019</td><td>Vijaya Bank and Dena Bank</td><td>Bank of Baroda</td></tr><tr><td>1 April 2020</td><td>Oriental Bank of Commerce and United Bank of India</td><td>Punjab National Bank</td></tr><tr><td>1 April 2020</td><td>Syndicate Bank</td><td>Canara Bank</td></tr><tr><td>1 April 2020</td><td>Allahabad Bank</td><td>Indian Bank</td></tr><tr><td>1 April 2020</td><td>Andhra Bank and Corporation Bank</td><td>Union Bank of India</td></tr></tbody></table>
      <p class="cp-lead">The mergers of 2019 and 2020 combined 10 banks into 4 anchor banks, and the number of public sector banks came down from 27 to 12. The aim is to create four or five large, global-sized banks that are strong like SBI. This idea was supported earlier by the Narasimham Committee (1998) and the P. J. Nayak Committee (2014).</p>
      <div class="cp-note trap">Five associate banks and Bharatiya Mahila Bank joined SBI in 2017. Dena and Vijaya joined Bank of Baroda in 2019.</div>
      <div class="cp-note exam">Remember the pairs: Canara gets Syndicate, Indian Bank gets Allahabad, Union Bank gets Andhra plus Corporation, PNB gets Oriental plus United.</div>
    `
  },
  55: {
    questext: "Which bank merged into Canara Bank on 1 April 2020?",
    options: ["Allahabad Bank", "Syndicate Bank", "Andhra Bank", "Dena Bank"],
    correct: "2",
    exptext: "✅ Syndicate Bank merged into Canara Bank. 📌 Both begin with a C sound: Canara and Syndicate (Cyndicate). ❌ Allahabad Bank is wrong because it merged into Indian Bank."
  },
  56: {
    questext: "Which two banks merged into the Bank of Baroda on 1 April 2019?",
    options: ["Vijaya Bank and Dena Bank", "Andhra Bank and Corporation Bank", "Oriental Bank of Commerce and United Bank of India", "State Bank of Patiala and State Bank of Mysore"],
    correct: "1",
    exptext: "✅ Vijaya Bank and Dena Bank merged into Bank of Baroda. 📌 Baroda took the V and D banks. ❌ Andhra and Corporation is wrong because they went to Union Bank of India in 2020."
  },
  57: {
    questext: "After the mergers of 2020, the total number of public sector banks in India became:",
    options: ["27", "21", "18", "12"],
    correct: "4",
    exptext: "✅ The number came down from 27 to 12. 📌 Ten banks joined four, so twelve stayed. ❌ 27 is wrong because that was the number before the mergers."
  },
  58: {
    type: "concept", icon: "🏗️", accent: "#64748b", pauseTimer: true,
    title: "Structure of Banking in India",
    html: `
      <p class="cp-lead">Indian banks are divided into <b>scheduled</b> and <b>non-scheduled</b> banks. <u>Scheduled banks are the banks listed in the Second Schedule of the RBI Act, 1934.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/33.png" alt="Tree diagram: Reserve Bank of India at the top, then Scheduled Banks and Non-Scheduled Ban" data-caption="The main kinds of banks in the Indian banking system." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/34.png" alt="Three nested boxes: Scheduled Commercial Banks, Scheduled Cooperative Banks, All India Fin" data-caption="The three groups that make up the scheduled banking structure." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Group</th><th>Types</th></tr></thead><tbody><tr><td>Scheduled Commercial Banks</td><td>Public sector banks, private sector banks, foreign banks, Regional Rural Banks, Small Finance Banks and Payments Banks</td></tr><tr><td>Scheduled Cooperative Banks</td><td>State Cooperative Banks, Central Cooperative Banks and Urban Cooperative Banks</td></tr><tr><td>All India Financial Institutions</td><td>NABARD, SIDBI, EXIM Bank, NHB and NaBFID</td></tr></tbody></table>
      <p class="cp-lead">A bank becomes "scheduled" when it is included in the Second Schedule of the RBI Act. Such banks can borrow from the RBI and get its support. Banks that are not in the Schedule are called non-scheduled banks.</p>
      <div class="cp-note trap">All India Financial Institutions are development institutions, not commercial banks. They do not take deposits from the public like a normal bank.</div>
      <div class="cp-note exam">Remember the source of the word: "scheduled" comes from the Second Schedule of the RBI Act, 1934.</div>
    `
  },
  59: {
    questext: "Scheduled banks are those included in which Schedule of the Reserve Bank of India Act, 1934?",
    options: ["First Schedule", "Second Schedule", "Third Schedule", "Fourth Schedule"],
    correct: "2",
    exptext: "✅ Scheduled banks are listed in the Second Schedule. 📌 Second Schedule, second class of safe banks. ❌ The First Schedule is wrong because it does not list scheduled banks."
  },
  60: {
    questext: "Which of the following is NOT a scheduled commercial bank?",
    options: ["Regional Rural Bank", "Small Finance Bank", "Payments Bank", "NABARD"],
    correct: "4",
    exptext: "✅ NABARD is an All India Financial Institution, not a commercial bank. 📌 Development institution, not a normal bank. ❌ The other three are wrong choices because they are scheduled commercial banks."
  },
  61: {
    type: "concept", icon: "📅", accent: "#fb7185", pauseTimer: true,
    title: "Major Indian Banks and Their Establishment Years",
    html: `
      <p class="cp-lead">Exams love dates. <u>Learn the years of the major banks as a list, in order.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/35.png" alt="Horizontal timeline with labels: 1894 Punjab National Bank, 1907 Indian Bank, 1908 Bank of" data-caption="The main Indian banks arranged by the year they were set up." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/36.png" alt="Highlight card with three facts: RBI set up on 1 April 1935, SBI formed on 1 July 1955, RR" data-caption="Three key dates: the Reserve Bank, State Bank of India and Regional Rural Banks." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Bank or institution</th><th>Date or year</th></tr></thead><tbody><tr><td>Reserve Bank of India</td><td>1 April 1935</td></tr><tr><td>State Bank of India</td><td>1 July 1955</td></tr><tr><td>Punjab National Bank</td><td>1894</td></tr><tr><td>Bank of Baroda</td><td>20 July 1908</td></tr><tr><td>Indian Bank</td><td>1907</td></tr><tr><td>UCO Bank</td><td>1943</td></tr><tr><td>Union Bank of India</td><td>1919</td></tr><tr><td>NABARD</td><td>12 July 1982</td></tr><tr><td>Regional Rural Banks</td><td>2 October 1975</td></tr></tbody></table>
      <p class="cp-lead">Regional Rural Banks started on 2 October 1975, which is the birthday of Mahatma Gandhi (Gandhi Jayanti). NABARD was set up on 12 July 1982 and supervises the Regional Rural Banks.</p>
      <div class="cp-note trap">Punjab National Bank (1894) is the first fully Indian bank, even though Bank of Baroda and Indian Bank were set up later.</div>
      <div class="cp-note exam">Easy memory: 1894 PNB, 1907 Indian, 1908 Baroda, 1919 Union, 1935 RBI, 1943 UCO, 1955 SBI.</div>
    `
  },
  62: {
    questext: "Regional Rural Banks were established on:",
    options: ["1 April 1935", "19 July 1969", "2 October 1975", "12 July 1982"],
    correct: "3",
    exptext: "✅ Regional Rural Banks began on 2 October 1975. 📌 Gandhi Jayanti, gandhi's day for villages. ❌ 12 July 1982 is wrong because that is the birth date of NABARD."
  },
  63: {
    questext: "Which of the following was set up in 1943?",
    options: ["UCO Bank", "Union Bank of India", "Indian Bank", "Bank of Baroda"],
    correct: "1",
    exptext: "✅ UCO Bank was set up in 1943. 📌 UCO started with the war year of 1943. ❌ Union Bank is wrong because it was established in 1919."
  },
  64: {
    type: "concept", icon: "🏢", accent: "#2dd4bf", pauseTimer: true,
    title: "All India Financial Institutions (AIFIs)",
    html: `
      <p class="cp-lead">AIFIs are apex-level financial bodies set up by the Government of India to give long-term money for development. <u>They are not commercial banks, but they play a key role in economic growth.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/37.png" alt="Five cards in a row: NABARD agriculture and rural, EXIM Bank exports and imports, NHB hous" data-caption="The five All India Financial Institutions and the sector each one supports." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/38.png" alt="NABARD headquarters Mumbai building photo" data-caption="The head office of the National Bank for Agriculture and Rural Development." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Institution</th><th>Year</th><th>Headquarters</th><th>Governing Act</th></tr></thead><tbody><tr><td>NABARD (National Bank for Agriculture and Rural Development)</td><td>1982</td><td>Mumbai</td><td>NABARD Act, 1981</td></tr><tr><td>EXIM Bank (Export-Import Bank of India)</td><td>1982</td><td>Mumbai</td><td>EXIM Bank of India Act, 1981</td></tr><tr><td>NHB (National Housing Bank)</td><td>1988</td><td>New Delhi</td><td>NHB Act, 1987</td></tr><tr><td>SIDBI (Small Industries Development Bank of India)</td><td>1990</td><td>Lucknow</td><td>SIDBI Act, 1989</td></tr><tr><td>NaBFID (National Bank for Financing Infrastructure and Development)</td><td>2021</td><td>Mumbai</td><td>NaBFID Act, 2021</td></tr></tbody></table>
      <p class="cp-lead">Each institution looks after one sector. NABARD supervises Rural Cooperative Banks and Regional Rural Banks and promotes rural finance. EXIM Bank finances exports and imports. NHB is the apex body for housing finance. SIDBI finances micro, small and medium enterprises. NaBFID, the newest, finances long-term infrastructure projects.</p>
      <div class="cp-note trap">SIDBI is headquartered in Lucknow and NHB in New Delhi. The other three are in Mumbai.</div>
      <div class="cp-note exam">Remember the years: NABARD and EXIM 1982, NHB 1988, SIDBI 1990, NaBFID 2021.</div>
    `
  },
  65: {
    questext: "Which All India Financial Institution has its headquarters in Lucknow?",
    options: ["NABARD", "EXIM Bank", "NHB", "SIDBI"],
    correct: "4",
    exptext: "✅ SIDBI is headquartered in Lucknow. 📌 S for Small, S for Sunny Lucknow (Lucknow is its home). ❌ NHB is wrong because it is in New Delhi."
  },
  66: {
    questext: "Which is the newest All India Financial Institution, set up in 2021?",
    options: ["NaBFID", "SIDBI", "NHB", "EXIM Bank"],
    correct: "1",
    exptext: "✅ The National Bank for Financing Infrastructure and Development was set up in 2021. 📌 New and infrastructure. ❌ SIDBI is wrong because it was set up in 1990."
  },
  67: {
    questext: "Which institution is the apex body for housing finance in India?",
    options: ["National Housing Bank", "SIDBI", "NABARD", "EXIM Bank"],
    correct: "1",
    exptext: "✅ The National Housing Bank is the apex institution for housing finance. 📌 Housing means NHB. ❌ NABARD is wrong because it works for agriculture and rural finance."
  },
  68: {
    type: "concept", icon: "🌐", accent: "#c026d3", pauseTimer: true,
    title: "Basel Norms (Basel Accords)",
    html: `
      <p class="cp-lead">Basel norms are international rules for banks. <u>They set the minimum standards for the capital banks must hold, for stress testing and for liquidity.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/39.png" alt="Timeline with three steps: Basel I 1988 (credit risk, minimum 8 percent), Basel II 2004 (t" data-caption="The three Basel frameworks in the order they were introduced." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/40.png" alt="Bank for International Settlements Basel Switzerland building photo" data-caption="The Bank for International Settlements in Basel, Switzerland, which hosts the Basel Committee." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The rules are issued by the <b>Basel Committee on Banking Supervision (BCBS)</b>. It was set up in 1974 by central bank governors of the G10 countries and works under the Bank for International Settlements in Basel, a city in Switzerland. Its aim is to keep banking stable and prevent bank failures.</p>
      <table><thead><tr><th>Framework</th><th>Year</th><th>Key features</th></tr></thead><tbody><tr><td>Basel I</td><td>1988</td><td>First international framework; looked at credit risk only; minimum Capital Adequacy Ratio of 8 percent</td></tr><tr><td>Basel II</td><td>2004</td><td>Three types of risk (credit, market, operational); three pillars: minimum capital, supervisory review, market discipline</td></tr><tr><td>Basel III</td><td>2010</td><td>Response to the 2008 global financial crisis; stronger capital; Leverage Ratio, Liquidity Coverage Ratio and Net Stable Funding Ratio; Counter-Cyclical Capital Buffer</td></tr></tbody></table>
      <p class="cp-lead">The Capital Adequacy Ratio shows how much of its own money a bank holds compared with the risky loans it has given. A higher ratio means a safer bank.</p>
      <div class="cp-note trap">Basel I covers only credit risk. Market and operational risks came with Basel II.</div>
      <div class="cp-note exam">Basel III is the post-2008 reform and brought the liquidity ratios.</div>
    `
  },
  69: {
    questext: "The Basel Committee on Banking Supervision was set up in which year?",
    options: ["1944", "1974", "1988", "2010"],
    correct: "2",
    exptext: "✅ The Basel Committee was set up in 1974 by the central bank governors of the G10 countries. 📌 Seventy-four, the first Basel. ❌ 1988 is wrong because that is the year of Basel I norms."
  },
  70: {
    questext: "Which Basel framework was introduced as a response to the global financial crisis of 2008?",
    options: ["Basel I", "Basel II", "Basel III", "Basel IV"],
    correct: "3",
    exptext: "✅ Basel III (2010) followed the 2008 crisis. 📌 Three for the third wave of safety. ❌ Basel II is wrong because it came in 2004, before the crisis."
  },
  71: {
    questext: "Consider the following statements about the Basel norms:\n1. Basel I set a minimum Capital Adequacy Ratio of 8 percent.\n2. Basel II introduced the Liquidity Coverage Ratio.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Liquidity ratios belong to Basel III. ❌ Statement 2 is wrong because the Liquidity Coverage Ratio came with Basel III."
  },
  72: {
    type: "concept", icon: "🚨", accent: "#059669", pauseTimer: true,
    title: "Prompt Corrective Action (PCA) Framework",
    html: `
      <p class="cp-lead">The PCA framework is a tool of the RBI to watch and correct weak banks. <u>When a bank's health falls below set levels, the RBI puts it under closer watch and limits its activities.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/41.png" alt="Warning dashboard with three gauges labelled Capital, NPA Level, Return on Assets, each wi" data-caption="When key health indicators fall into the red zone, the PCA is triggered." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/42.png" alt="Three locked doors labelled Dividend Payment, Branch Expansion, New Loan Approvals under a" data-caption="The Reserve Bank can restrict dividends, branch expansion and new loans under PCA." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">PCA stands for Prompt Corrective Action. The RBI adopted it in 2002. It is triggered when a bank's key indicators, namely capital, the level of NPAs and the Return on Assets, fall below the set limits.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Full name</td><td>Prompt Corrective Action</td></tr><tr><td>Used by</td><td>Reserve Bank of India</td></tr><tr><td>Year</td><td>2002</td></tr><tr><td>Triggers</td><td>Low capital, high NPAs, low Return on Assets</td></tr><tr><td>Possible restrictions</td><td>Dividend payment, branch expansion and new loan approvals</td></tr></tbody></table>
      <p class="cp-lead">Think of PCA as a doctor's warning. The weak bank is not closed, but it must follow strict rules until it becomes healthy again.</p>
      <div class="cp-note trap">PCA is a supervisory tool of the RBI. It is not a loan scheme and not a law passed by Parliament.</div>
      <div class="cp-note exam">Remember the three triggers: Capital, NPA level, Return on Assets.</div>
    `
  },
  73: {
    questext: "Under the Prompt Corrective Action framework, the Reserve Bank of India can restrict a weak bank from:",
    options: ["Collecting deposits only", "Paying dividends, expanding branches and giving new loans", "Printing currency", "Fixing the repo rate"],
    correct: "2",
    exptext: "✅ The RBI can restrict dividends, branch growth and new loans. 📌 PCA stops growth until health returns. ❌ Printing currency is wrong because only the RBI itself does that."
  },
  74: {
    questext: "The Prompt Corrective Action framework was introduced by the Reserve Bank of India in:",
    options: ["1991", "1998", "2002", "2016"],
    correct: "3",
    exptext: "✅ The RBI adopted it in 2002. 📌 PCA, 2002. ❌ 2016 is wrong because that is the year of the Monetary Policy Committee."
  },
  75: {
    type: "concept", icon: "🧾", accent: "#dc2626", pauseTimer: true,
    title: "Non-Banking Financial Companies (NBFCs)",
    html: `
      <p class="cp-lead">An NBFC gives loans and other money services like a bank, but it is <b>not</b> a bank. <u>It has no banking licence, so it cannot take demand deposits or issue cheques.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/43.png" alt="Split card comparing Bank and NBFC. Bank: accepts demand deposits, issues cheques, part of" data-caption="The main differences between a bank and a Non-Banking Financial Company." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/44.png" alt="Eight icon cards: Personal Loans, Home Loans, Vehicle Finance, Gold Loans, Microfinance, I" data-caption="The services that Non-Banking Financial Companies offer." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A Non-Banking Financial Company is a company registered under the Companies Act that offers loans, credit and investments. It is regulated by the RBI under a different framework from the one used for scheduled commercial banks.</p>
      <table><thead><tr><th>Feature</th><th>Bank</th><th>NBFC</th></tr></thead><tbody><tr><td>Demand deposits (savings or current)</td><td>Can accept</td><td>Cannot accept</td></tr><tr><td>Cheques drawn on itself</td><td>Can issue</td><td>Cannot issue</td></tr><tr><td>Payment and settlement system</td><td>Part of it</td><td>Not part of it</td></tr><tr><td>Deposit insurance (DICGC)</td><td>Covered</td><td>Not covered</td></tr><tr><td>Public deposits</td><td>Yes</td><td>Only for 12 to 60 months, with a good credit rating</td></tr></tbody></table>
      <p class="cp-lead">DICGC means Deposit Insurance and Credit Guarantee Corporation, which insures bank deposits. An NBFC that wants to take public deposits must first get an investment-grade credit rating.</p>
      <div class="cp-note trap">NBFC deposits are not insured by the DICGC, so they are riskier for the depositor than bank deposits.</div>
      <div class="cp-note exam">Remember the three NOTs of an NBFC: no demand deposits, no cheques, no payment system.</div>
    `
  },
  76: {
    questext: "Which of the following can a Non-Banking Financial Company NOT do?",
    options: ["Give loans", "Offer gold loans", "Accept demand deposits", "Offer vehicle finance"],
    correct: "3",
    exptext: "✅ An NBFC cannot accept demand deposits. 📌 No savings and no current accounts. ❌ Giving loans is wrong because NBFCs do that as their main work."
  },
  77: {
    questext: "Deposits in Non-Banking Financial Companies are NOT covered by which institution?",
    options: ["NABARD", "DICGC", "SIDBI", "EXIM Bank"],
    correct: "2",
    exptext: "✅ The Deposit Insurance and Credit Guarantee Corporation does not cover NBFC deposits. 📌 No insurance for NBFC. ❌ NABARD is wrong because it is a development bank and does not insure deposits."
  },
  78: {
    questext: "Consider the following statements about Non-Banking Financial Companies:\n1. They can issue cheques drawn on themselves.\n2. They are regulated by the Reserve Bank of India.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Regulated, but not a bank. ❌ Statement 1 is wrong because an NBFC cannot issue cheques drawn on itself."
  },
  79: {
    type: "concept", icon: "🌾", accent: "#d97706", pauseTimer: true,
    title: "Priority Sector Lending (PSL)",
    html: `
      <p class="cp-lead">The RBI orders banks to lend a fixed share of their money to certain priority sectors. <u>These are sectors that might not get enough credit from the formal banking system on their own.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/45.png" alt="Eight icon boxes in two rows: Agriculture, Micro Small and Medium Enterprises, Export Cred" data-caption="The eight priority sectors covered under Priority Sector Lending." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/46.png" alt="Bar chart with three bars: Scheduled Commercial Banks and Foreign Banks 40 percent, Region" data-caption="The Priority Sector Lending targets of different bank groups." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Bank category</th><th>PSL target (share of ANBC)</th></tr></thead><tbody><tr><td>Scheduled Commercial Banks and Foreign Banks</td><td>40 percent</td></tr><tr><td>Regional Rural Banks</td><td>75 percent</td></tr><tr><td>Small Finance Banks</td><td>75 percent</td></tr></tbody></table>
      <p class="cp-lead">The target is a share of <b>Adjusted Net Bank Credit (ANBC)</b>, or the credit equivalent of off-balance sheet exposure, whichever is higher. This simply means the target is worked out on the total net loans of the bank.</p>
      <div class="cp-note trap">The target for Regional Rural Banks and Small Finance Banks is 75 percent, which is much higher than the 40 percent of commercial banks.</div>
      <div class="cp-note exam">Priority sectors: Agriculture, MSMEs, Export credit, Education, Housing, Social infrastructure, Renewable energy and Weaker sections.</div>
    `
  },
  80: {
    questext: "What is the Priority Sector Lending target for scheduled commercial banks?",
    options: ["20 percent", "40 percent", "60 percent", "75 percent"],
    correct: "2",
    exptext: "✅ Commercial banks must lend 40 percent of ANBC to priority sectors. 📌 Forty for the big banks, seventy-five for the small ones. ❌ 75 percent is wrong because that target is for Regional Rural Banks and Small Finance Banks."
  },
  81: {
    questext: "Which of the following is NOT a priority sector under the RBI's guidelines?",
    options: ["Agriculture", "Education", "Renewable energy", "Luxury real estate"],
    correct: "4",
    exptext: "✅ Luxury real estate is not a priority sector. 📌 Priority means basic needs and development. ❌ The other three are wrong choices because they are all priority sectors."
  },
  82: {
    type: "concept", icon: "🌱", accent: "#7c3aed", pauseTimer: true,
    title: "Regional Rural Banks (RRBs)",
    html: `
      <p class="cp-lead">Regional Rural Banks give credit for agriculture and other rural work. <u>They combine the features of a commercial bank and a cooperative bank.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/47.png" alt="Prathama Grameen Bank Moradabad branch photo" data-caption="A branch of Prathama Grameen Bank, the first Regional Rural Bank in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/48.png" alt="Three-part ownership bar: Central Government 50 percent, Sponsoring Bank 35 percent, State" data-caption="The ownership of a Regional Rural Bank is shared between three partners." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Recommended by</td><td>Narasimham Committee on Rural Credit, 1975</td></tr><tr><td>Ordinance passed</td><td>26 September 1975</td></tr><tr><td>Governed by</td><td>Regional Rural Banks Act, 1976</td></tr><tr><td>First RRB</td><td>Prathama Grameen Bank, set up on 2 October 1975</td></tr><tr><td>Regulated by</td><td>Reserve Bank of India</td></tr><tr><td>Supervised by</td><td>NABARD</td></tr><tr><td>Ownership</td><td>Centre 50 percent, Sponsor Bank 35 percent, State Government 15 percent</td></tr><tr><td>PSL target</td><td>75 percent of ANBC</td></tr></tbody></table>
      <p class="cp-lead">A sponsor bank is a commercial bank that helps to set up and guide the Regional Rural Bank. Because RRBs serve small farmers and village workers, their priority sector target is higher than that of ordinary banks.</p>
      <div class="cp-note trap">The RBI regulates the Regional Rural Banks but NABARD supervises them. Do not swap the two.</div>
      <div class="cp-note exam">Remember the ownership as 50 : 35 : 15 for Centre, Sponsor Bank and State Government.</div>
    `
  },
  83: {
    questext: "What is the shareholding pattern of a Regional Rural Bank (Centre : Sponsor Bank : State)?",
    options: ["50 : 35 : 15", "35 : 50 : 15", "51 : 29 : 20", "60 : 20 : 20"],
    correct: "1",
    exptext: "✅ The Centre holds 50 percent, the Sponsor Bank 35 percent and the State Government 15 percent. 📌 Half to the Centre. ❌ 35 : 50 : 15 is wrong because it swaps the Centre and the Sponsor Bank."
  },
  84: {
    questext: "Which was the first Regional Rural Bank in India?",
    options: ["Prathama Grameen Bank", "Capital Local Area Bank", "Airtel Payments Bank", "Bharatiya Mahila Bank"],
    correct: "1",
    exptext: "✅ Prathama Grameen Bank was set up on 2 October 1975. 📌 Prathama means first. ❌ Bharatiya Mahila Bank is wrong because it was a bank for women set up in 2013."
  },
  85: {
    questext: "Regional Rural Banks are supervised by:",
    options: ["SIDBI", "NHB", "EXIM Bank", "NABARD"],
    correct: "4",
    exptext: "✅ NABARD supervises the Regional Rural Banks, while the RBI regulates them. 📌 NABARD, rural bank's guard. ❌ SIDBI is wrong because it works for small industries."
  },
  86: {
    type: "concept", icon: "🪴", accent: "#0d9488", pauseTimer: true,
    title: "Small Finance Banks (SFBs)",
    html: `
      <p class="cp-lead">Small Finance Banks give basic banking and credit to people who are left out by large banks. <u>This includes small business owners, small industries, farmers and the unorganised sector.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/49.png" alt="Card with three examples: Capital Small Finance Bank, Ujjivan Small Finance Bank, Utkarsh " data-caption="Examples of Small Finance Banks in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/50.png" alt="Four rule boxes: PSL target 75 percent, half of loans up to 25 lakh rupees, at least 25 pe" data-caption="The key rules for a Small Finance Bank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Parameter</th><th>Requirement</th></tr></thead><tbody><tr><td>Regulated by</td><td>Reserve Bank of India</td></tr><tr><td>Registered as</td><td>Public Limited Company under the Companies Act, 2013</td></tr><tr><td>First SFB</td><td>Capital Small Finance Bank (April 2016)</td></tr><tr><td>PSL target</td><td>75 percent of net credit</td></tr><tr><td>Loan portfolio condition</td><td>50 percent of loans of up to 25 lakh rupees</td></tr><tr><td>Rural branch mandate</td><td>At least 25 percent of branches in unbanked rural areas</td></tr><tr><td>Minimum paid-up capital</td><td>200 crore rupees</td></tr></tbody></table>
      <p class="cp-lead">Unbanked areas are places where there is no bank branch. The rules make sure that Small Finance Banks really serve small borrowers.</p>
      <div class="cp-note trap">SFB capital is 200 crore rupees, which is double the 100 crore rupees of a Payments Bank.</div>
      <div class="cp-note exam">Examples: Capital, Ujjivan and Utkarsh Small Finance Banks.</div>
    `
  },
  87: {
    questext: "What is the minimum paid-up capital requirement for a Small Finance Bank?",
    options: ["100 crore rupees", "200 crore rupees", "500 crore rupees", "1000 crore rupees"],
    correct: "2",
    exptext: "✅ A Small Finance Bank needs 200 crore rupees of paid-up capital. 📌 SFB is twice a Payments Bank. ❌ 100 crore rupees is wrong because that is the requirement for a Payments Bank."
  },
  88: {
    questext: "Which was the first Small Finance Bank to start operations in India?",
    options: ["Utkarsh Small Finance Bank", "Ujjivan Small Finance Bank", "Capital Small Finance Bank", "Airtel Payments Bank"],
    correct: "3",
    exptext: "✅ Capital Small Finance Bank started in April 2016. 📌 Capital comes first. ❌ Airtel Payments Bank is wrong because it is a Payments Bank, not a Small Finance Bank."
  },
  89: {
    type: "concept", icon: "📲", accent: "#db2777", pauseTimer: true,
    title: "Payments Banks",
    html: `
      <p class="cp-lead">A Payments Bank works like a bank but on a small scale and <b>without any credit risk</b>. <u>It cannot give loans, so it is designed only for payments and savings.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/51.png" alt="Two panels. Left green panel Payments Banks CAN: demand deposits up to 2 lakh rupees, debi" data-caption="What a Payments Bank can and cannot do." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/52.png" alt="Airtel Payments Bank app mobile photo" data-caption="A mobile payments banking app used by customers of a Payments Bank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The Nachiket Mor Committee recommended Payments Banks. Their aim is financial inclusion, which means bringing banking to people who have none, such as migrant workers, low-income households and small shopkeepers.</p>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Registered as</td><td>Public Limited Company under the Companies Act, 2013</td></tr><tr><td>Recommended by</td><td>Nachiket Mor Committee</td></tr><tr><td>Minimum capital</td><td>100 crore rupees</td></tr><tr><td>First Payments Bank</td><td>Airtel Payments Bank (January 2017)</td></tr><tr><td>Deposit limit</td><td>Up to 2 lakh rupees per individual customer</td></tr><tr><td>Type of bank</td><td>Differentiated bank, not a universal bank</td></tr></tbody></table>
      <p class="cp-lead">A Payments Bank must keep the Cash Reserve Ratio and may invest its deposits only in government securities. Because it cannot lend, it cannot take on credit risk.</p>
      <div class="cp-note trap">A Payments Bank can accept demand deposits but not time deposits (fixed deposits), and it cannot give loans or issue credit cards.</div>
      <div class="cp-note exam">Remember: Payments Bank equals savings plus payments, but no loans, no credit cards, no fixed deposits, no NRI deposits.</div>
    `
  },
  90: {
    questext: "Which of the following can a Payments Bank do?",
    options: ["Give loans", "Issue credit cards", "Accept demand deposits", "Accept fixed deposits"],
    correct: "3",
    exptext: "✅ A Payments Bank can accept demand deposits up to the limit. 📌 It takes savings, not loans. ❌ Giving loans is wrong because it cannot take credit risk."
  },
  91: {
    questext: "The Payments Banks in India were set up on the recommendation of which committee?",
    options: ["Narasimham Committee", "Nachiket Mor Committee", "Urjit Patel Committee", "Sunil Mehta Committee"],
    correct: "2",
    exptext: "✅ The Nachiket Mor Committee recommended Payments Banks. 📌 Mor for more payments. ❌ The Urjit Patel Committee is wrong because it recommended the Monetary Policy Committee."
  },
  92: {
    questext: "Consider the following statements about Payments Banks:\n1. They can accept NRI deposits.\n2. Their minimum capital requirement is 100 crore rupees.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Payments Bank needs 100 crore rupees. ❌ Statement 1 is wrong because Payments Banks cannot accept NRI deposits."
  },
  93: {
    type: "concept", icon: "🗂️", accent: "#2563eb", pauseTimer: true,
    title: "Public Credit Registry (PCR)",
    html: `
      <p class="cp-lead">The Public Credit Registry is a large database of the credit history of borrowers. <u>All lenders can use it to see a complete, up-to-date picture of a borrower.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/53.png" alt="Hub diagram: Public Credit Registry in the centre linked to Banks, Non-Banking Financial C" data-caption="All kinds of lenders share borrower information through one registry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/54.png" alt="Warning picture: one borrower using the same property as security for loans from three dif" data-caption="The registry helps stop one asset from being pledged to many banks." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Without such a registry, a borrower could take loans from many banks against the same property. A single database shows every loan a person has, which supports better lending decisions.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Recommended by</td><td>Y. M. Deosthalee Committee (2018), set up by the RBI</td></tr><tr><td>Purpose</td><td>To keep a full record of all credit dealings in India</td></tr><tr><td>Placed under</td><td>The RBI, as an independent unit</td></tr><tr><td>Benefit</td><td>Stops several loans on the same security from different banks</td></tr><tr><td>Impact</td><td>Better credit discipline and fewer NPAs</td></tr></tbody></table>
      <p class="cp-lead">The registry covers loans from banks, NBFCs and microfinance institutions, and is open to all lending institutions, not only banks. This lowers the risk of over-borrowing and builds a stronger credit culture.</p>
      <div class="cp-note trap">The PCR is a record system. It is not a lender and does not give loans.</div>
      <div class="cp-note exam">Remember the name Deosthalee for the PCR.</div>
    `
  },
  94: {
    questext: "The Public Credit Registry in India was recommended by which committee?",
    options: ["Deosthalee Committee", "P. J. Nayak Committee", "Nachiket Mor Committee", "Sunil Mehta Committee"],
    correct: "1",
    exptext: "✅ The Y. M. Deosthalee Committee (2018) recommended it. 📌 Deosthalee for data. ❌ The P. J. Nayak Committee is wrong because it studied the governance of banks."
  },
  95: {
    questext: "The main benefit of the Public Credit Registry is that it:",
    options: ["Prints money for banks", "Reduces multiple borrowing using the same collateral", "Raises the repo rate", "Gives free loans to farmers"],
    correct: "2",
    exptext: "✅ It stops borrowers from using the same security for loans from many banks. 📌 One registry, one record. ❌ Giving free loans is wrong because the registry is only a database."
  },
  96: {
    type: "concept", icon: "🛠️", accent: "#ea580c", pauseTimer: true,
    title: "Project Sashakt (Sunil Mehta Committee, 2018)",
    html: `
      <p class="cp-lead">Project Sashakt is a plan for clearing the bad loans of public sector banks. <u>The way a bad loan is handled depends on its size.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/55.png" alt="Three-step staircase: Tier 1 up to 50 crore rupees, bank-led within 90 days. Tier 2 from 5" data-caption="Project Sashakt uses a three-tier approach based on the size of the bad loan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/56.png" alt="Mind map with Project Sashakt in the centre and branches Sunil Mehta Committee 2018, Publi" data-caption="The main ideas of Project Sashakt in one picture." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Project Sashakt was proposed by the Sunil Mehta Committee in 2018. An NPA is a loan overdue for more than 90 days, and the plan gives a different path for small, medium and large NPAs.</p>
      <table><thead><tr><th>NPA amount</th><th>Resolution approach</th><th>Timeline</th></tr></thead><tbody><tr><td>Up to 50 crore rupees</td><td>The bank handles it at its own level</td><td>Within 90 days</td></tr><tr><td>50 to 500 crore rupees</td><td>Inter-Creditor Agreement; the lead bank carries out a plan, and the Insolvency Code is used if it fails</td><td>Within 180 days</td></tr><tr><td>More than 500 crore rupees</td><td>An independent Asset Management Company or bad bank set up by banks</td><td>As per plan</td></tr></tbody></table>
      <p class="cp-lead">An Inter-Creditor Agreement is a deal among all banks that gave money to the same borrower, so that they act together instead of separately. The lead bank is the bank that leads this group.</p>
      <div class="cp-note trap">Small NPAs are solved by the bank itself in 90 days. Large NPAs above 500 crore rupees need an Asset Management Company.</div>
      <div class="cp-note exam">Remember 50, 500 and the times 90 and 180 days.</div>
    `
  },
  97: {
    questext: "Project Sashakt was proposed by which committee?",
    options: ["Sunil Mehta Committee", "P. J. Nayak Committee", "Urjit Patel Committee", "Narasimham Committee"],
    correct: "1",
    exptext: "✅ The Sunil Mehta Committee proposed it in 2018. 📌 Mehta and Sashakt, both have strong sounds. ❌ The P. J. Nayak Committee is wrong because it led to the Indradhanush Plan."
  },
  98: {
    questext: "Under Project Sashakt, which approach is used for an NPA of more than 500 crore rupees?",
    options: ["The bank solves it within 90 days", "A lead bank uses an Inter-Creditor Agreement", "An independent Asset Management Company is set up", "The loan is written off at once"],
    correct: "3",
    exptext: "✅ Large NPAs go to an independent Asset Management Company. 📌 Biggest loans, biggest solution. ❌ Handling within 90 days is wrong because that is only for loans up to 50 crore rupees."
  },
  99: {
    type: "concept", icon: "🌈", accent: "#65a30d", pauseTimer: true,
    title: "Indradhanush Plan (2015) for Public Sector Banks",
    html: `
      <p class="cp-lead">The Indradhanush Plan is a seven-point plan to revive the Public Sector Banks. <u>The Government of India launched it in 2015, based on the P. J. Nayak Committee of 2014.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/57.png" alt="Rainbow arch with seven bands labelled A Appointments, B Bank Board Bureau, C Capitalisati" data-caption="The seven points of the Indradhanush Plan, one on each band of a rainbow." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/58.png" alt="Four connected boxes: Recognition of bad loans, Resolution and Recovery, Reforms, Re-capit" data-caption="The four R concept of the Indradhanush Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Letter</th><th>Component</th><th>Description</th></tr></thead><tbody><tr><td>A</td><td>Appointments</td><td>Open and merit-based appointment of chiefs of public sector banks</td></tr><tr><td>B</td><td>Bank Board Bureau</td><td>Autonomous body to recommend appointments and strategy</td></tr><tr><td>C</td><td>Capitalisation</td><td>Money put into banks to meet Basel III norms</td></tr><tr><td>D</td><td>De-stressing</td><td>Resolution of NPAs and stressed assets</td></tr><tr><td>E</td><td>Empowerment</td><td>Sharing power between Managing Director and Chairman</td></tr><tr><td>F</td><td>Framework of Accountability</td><td>Performance checks based on key indicators</td></tr><tr><td>G</td><td>Governance Reforms</td><td>Better customer service and governance</td></tr></tbody></table>
      <p class="cp-lead">Indradhanush means rainbow in Hindi, and the plan has seven colours, one for each point. The P. J. Nayak Committee, formally the Committee to Review Governance of Boards of Banks in India, suggested that the government should either merge or privatise state-owned banks and reform their governance.</p>
      <div class="cp-example"><b>Example:</b> The four R's: <b>Recognition</b> (admit the bad loans), <b>Resolution</b> (recover through laws like the Insolvency Code), <b>Reforms</b> (change the way banks are run) and <b>Re-capitalisation</b> (put in fresh capital).</div>
      <p class="cp-lead">The Ministry of Finance also releases the EASE Index (Enhanced Access and Service Excellence), which measures how well public sector banks perform in customer service and governance.</p>
      <div class="cp-note trap">The Indradhanush Plan was launched in 2015, but the P. J. Nayak Committee report is from 2014.</div>
      <div class="cp-note exam">Remember A-B-C-D-E-F-G, the four R's, and that the plan is for Public Sector Banks only.</div>
    `
  },
  100: {
    questext: "How many points does the Indradhanush Plan have?",
    options: ["4", "5", "6", "7"],
    correct: "4",
    exptext: "✅ The plan has seven points, from A to G. 📌 Seven colours of a rainbow. ❌ Four is wrong because that is the number of R's in the 4R concept."
  },
  101: {
    questext: "The Indradhanush Plan of 2015 was based on the recommendations of which committee?",
    options: ["Sunil Mehta Committee", "Y. M. Deosthalee Committee", "P. J. Nayak Committee", "Nachiket Mor Committee"],
    correct: "3",
    exptext: "✅ The P. J. Nayak Committee of 2014 led to the Indradhanush Plan. 📌 Nayak led the new way. ❌ The Sunil Mehta Committee is wrong because it proposed Project Sashakt."
  },
  102: {
    questext: "The EASE Index is released by the:",
    options: ["Reserve Bank of India", "NABARD", "Ministry of Finance", "Securities and Exchange Board of India"],
    correct: "3",
    exptext: "✅ The Ministry of Finance releases the EASE Index to measure the performance of public sector banks. 📌 EASE means easy service. ❌ The Reserve Bank of India is wrong because it is the regulator, not the publisher of this index."
  },
  103: {
    type: "concept", icon: "👔", accent: "#0891b2", pauseTimer: true,
    title: "Banks Board Bureau (BBB) and FSIB",
    html: `
      <p class="cp-lead">The Banks Board Bureau chose the heads of Public Sector Banks. <u>It was later replaced by the Financial Services Institutions Bureau (FSIB), which also covers insurance companies.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/59.png" alt="Side by side comparison cards. BBB card: established 2016, first chair Vinod Rai, covered " data-caption="The Banks Board Bureau and the Financial Services Institutions Bureau compared." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/60.png" alt="Timeline: May 2014 P. J. Nayak Committee recommends BBB, February 2016 BBB constituted, la" data-caption="From the recommendation to the replacement of the Banks Board Bureau." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Banks Board Bureau</th><th>Financial Services Institutions Bureau</th></tr></thead><tbody><tr><td>Status</td><td>Autonomous body set up in 2016</td><td>Replaced the Banks Board Bureau</td></tr><tr><td>First recommended by</td><td>P. J. Nayak Committee (May 2014)</td><td>Government resolution passed by the Cabinet Appointments Committee</td></tr><tr><td>First chairperson</td><td>Vinod Rai, former Comptroller and Auditor General of India</td><td>Bhanu Pratap Sharma, who also chaired the BBB</td></tr><tr><td>Covers</td><td>Only public sector banks</td><td>Public sector banks and insurance companies</td></tr><tr><td>Term</td><td>Not stated</td><td>Initial period of 2 years</td></tr></tbody></table>
      <p class="cp-lead">The BBB recommended whole-time directors and non-executive chairmen of Public Sector Banks, advised banks on raising capital and mergers, and worked as a headhunter for top bank posts. The FSIB does the same job with a wider mandate.</p>
      <div class="cp-note trap">Vinod Rai was the first chairperson of the BBB, while Bhanu Pratap Sharma was the first chairperson of the FSIB.</div>
      <div class="cp-note exam">Remember the word replaced: FSIB replaced BBB and now also covers insurance companies.</div>
    `
  },
  104: {
    questext: "Who was the first chairperson of the Banks Board Bureau?",
    options: ["Bhanu Pratap Sharma", "Vinod Rai", "P. J. Nayak", "Sunil Mehta"],
    correct: "2",
    exptext: "✅ Vinod Rai, a former Comptroller and Auditor General, was the first chairperson. 📌 Rai first, Sharma next. ❌ Bhanu Pratap Sharma is wrong because he is the first chairperson of the FSIB."
  },
  105: {
    questext: "Which body replaced the Banks Board Bureau?",
    options: ["Financial Services Institutions Bureau", "Banks Governance Council", "Public Credit Registry", "Bank Recovery Board"],
    correct: "1",
    exptext: "✅ The Financial Services Institutions Bureau replaced the BBB. 📌 FSIB equals BBB plus insurance. ❌ The Public Credit Registry is wrong because it is a database, not a selection body."
  },
  106: {
    questext: "Consider the following statements about the Financial Services Institutions Bureau:\n1. It selects the chiefs of public sector banks and insurance companies.\n2. It covers only public sector banks.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 FSIB has a wider reach than BBB. ❌ Statement 2 is wrong because that describes the old Banks Board Bureau."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Banking_Sector/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an elegant bank building with columns, a few real-looking gold coins and a subtle rising chart line" },
  "images/General_Awareness/Economics/Banking_Sector/1.png": { t: "fig", about: "Three boxes in a row joined by arrows: Public, Bank, Borrowers. First arrow labelled Deposit with lower interest, second arrow labelled Loan with higher interest." },
  "images/General_Awareness/Economics/Banking_Sector/2.png": { t: "fig", about: "Two-step profit chart: Bank Margin minus Operational Cost equals Gross Profit, then Gross Profit minus Corporate Tax equals Net Profit." },
  "images/General_Awareness/Economics/Banking_Sector/3.png": { t: "fig", about: "Two rows. Top row: Performing Asset, principal plus interest paid on time, money received by the bank. Bottom row: Non-Performing Asset, instalment not paid, bank waits 90 days, loan declared bad." },
  "images/General_Awareness/Economics/Banking_Sector/4.png": { t: "fig", about: "Chain of boxes with arrows: NPAs rise, profit of bank falls, balance sheet turns negative, liquidity crisis or bank run." },
  "images/General_Awareness/Economics/Banking_Sector/5.png": { t: "fig", about: "Cycle diagram: Banks sell a 100 crore rupee NPA to the Bad Bank, Bad Bank pays 90 crore rupees, Bad Bank recovers money using recovery laws. Right side box: NPAs fall, profit rises, balance sheet positive, new loans increase." },
  "images/General_Awareness/Economics/Banking_Sector/6.png": { t: "fig", about: "Mind map with centre label NPAs (Bad Loans, Bad Assets) linked to Bad Bank, NPA File, Recovery Laws, Cleaner Balance Sheet." },
  "images/General_Awareness/Economics/Banking_Sector/7.png": { t: "fig", about: "Tree diagram: Insolvency and Bankruptcy Code 2016 at the top, branching to Insolvency and Bankruptcy Board of India, then to two boxes: NCLT with NCLAT for company matters, and DRT with DRAT for individual and bank recovery matters." },
  "images/General_Awareness/Economics/Banking_Sector/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"National Company Law Tribunal bench building India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/8.png. a photo of the tribunal building",
  "images/General_Awareness/Economics/Banking_Sector/9.png": { t: "fig", about: "Two panels side by side. Left panel: NARCL share holding 51 percent Public Sector Banks (majority), 49 percent Private Sector Banks. Right panel: IDRCL share holding 51 percent Private Sector Banks (majority), 49 percent Public Sector Banks." },
  "images/General_Awareness/Economics/Banking_Sector/10.png": { t: "fig", about: "Flow diagram: Banks sell large NPAs to NARCL, then IDRCL manages the resolution process, then money is recovered." },
  "images/General_Awareness/Economics/Banking_Sector/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Reserve Bank of India headquarters Mumbai building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/11.png. the main building of the central bank",
  "images/General_Awareness/Economics/Banking_Sector/12.png": { t: "fig", about: "Diagram: RBI at the top, left branch Central Bank of India under the RBI Act 1934, right branch Regulator of the Banking Sector under the Banking Regulation Act 1949, with Private Banks and Public Sector Banks below." },
  "images/General_Awareness/Economics/Banking_Sector/13.png": { t: "fig", about: "Mind map with RBI in the centre and eight spokes: Issue of Currency, Banker to Government, Banker's Bank, Controller of Credit, Custodian of Foreign Exchange Reserves, Lender of Last Resort, Regulator of Banks, Clearing House." },
  "images/General_Awareness/Economics/Banking_Sector/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian rupee banknotes different denominations photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/14.png. a photo of Indian currency notes",
  "images/General_Awareness/Economics/Banking_Sector/15.png": { t: "fig", about: "Two-column flow chart. Left column: Rates up, loans become expensive, money supply falls, demand falls, prices fall, solves inflation. Right column: Rates down, loans become cheaper, money supply rises, demand rises, production and jobs rise, solves recession." },
  "images/General_Awareness/Economics/Banking_Sector/16.png": { t: "fig", about: "Three boxes: Bank Rate (banks borrow from RBI, long term, no collateral), Repo Rate (banks borrow from RBI, short term, government securities needed), Reverse Repo Rate (RBI borrows from banks, short term)." },
  "images/General_Awareness/Economics/Banking_Sector/17.png": { t: "fig", about: "Side by side comparison cards. CRR card: cash only, kept with RBI, no interest earned, controls money supply directly. SLR card: cash plus gold plus government securities, kept with the bank itself, interest earned on securities, controls bank credit." },
  "images/General_Awareness/Economics/Banking_Sector/18.png": { t: "fig", about: "Two arrows. RBI buys government securities, money enters the market, money supply rises, used in recession. RBI sells government securities, money leaves the market, money supply falls, used against inflation." },
  "images/General_Awareness/Economics/Banking_Sector/19.png": { t: "fig", about: "Vertical ladder: top Marginal Standing Facility Rate, middle Repo Rate, below Reverse Repo or deposit rate. An arrow note says MSF Rate is higher than Repo Rate." },
  "images/General_Awareness/Economics/Banking_Sector/20.png": { t: "fig", about: "Flow: Foreign money enters India, extra rupees in the market, RBI issues bonds under Market Stabilisation Scheme, extra money is collected and kept in a separate account." },
  "images/General_Awareness/Economics/Banking_Sector/21.png": { t: "fig", about: "Five labelled boxes in a row: Margin Requirement, Consumer Credit Control, Rationing of Credit, Direct Action, Moral Suasion, each with a one-word icon." },
  "images/General_Awareness/Economics/Banking_Sector/22.png": { t: "fig", about: "Scale diagram: higher margin means smaller loan on the same collateral, lower margin means larger loan." },
  "images/General_Awareness/Economics/Banking_Sector/23.png": { t: "fig", about: "Two flows. Before 2016: Monetary policy decided by RBI Governor under RBI Act 1934. After 2016: Monetary policy decided by the Monetary Policy Committee under the RBI Amendment Act 2016." },
  "images/General_Awareness/Economics/Banking_Sector/24.png": { t: "fig", about: "Group diagram of six members: three from RBI (Governor as chairperson, Deputy Governor, one RBI officer) and three appointed by the Central Government." },
  "images/General_Awareness/Economics/Banking_Sector/25.png": { t: "fig", about: "Two banks facing each other: Bank A with extra cash lends overnight to Bank B with a shortage; arrow labelled Call Money Rate; box labelled Call Money Market." },
  "images/General_Awareness/Economics/Banking_Sector/26.png": { t: "fig", about: "Timeline bar from 1 day to 14 days labelled overnight to short period lending, with the label Call Money Rate." },
  "images/General_Awareness/Economics/Banking_Sector/27.png": { t: "fig", about: "Timeline: 1770 Bank of Hindustan, 1806 Bank of Bengal, 1840 Bank of Bombay, 1843 Bank of Madras, 1921 Imperial Bank of India, 1955 State Bank of India." },
  "images/General_Awareness/Economics/Banking_Sector/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Imperial Bank of India historic building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/28.png. a photo of an old Imperial Bank branch",
  "images/General_Awareness/Economics/Banking_Sector/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indira Gandhi Prime Minister of India 1969 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/29.png. a photo of the Prime Minister who nationalised the banks",
  "images/General_Awareness/Economics/Banking_Sector/30.png": { t: "fig", about: "Timeline with two points: 19 July 1969 first round 14 big banks, 15 April 1980 second round 6 more banks, total 20 public sector banks." },
  "images/General_Awareness/Economics/Banking_Sector/31.png": { t: "fig", about: "Timeline: 1993 New Bank of India merged into Punjab National Bank, 1 April 2017 five associate banks and Bharatiya Mahila Bank merged into SBI, 1 April 2019 Vijaya and Dena into Bank of Baroda, 1 April 2020 four more mergers." },
  "images/General_Awareness/Economics/Banking_Sector/32.png": { t: "fig", about: "Four arrow diagrams to four anchor banks. Punjab National Bank receives Oriental Bank of Commerce and United Bank of India. Canara Bank receives Syndicate Bank. Union Bank of India receives Andhra Bank and Corporation Bank. Indian Bank receives Allahabad Bank." },
  "images/General_Awareness/Economics/Banking_Sector/33.png": { t: "fig", about: "Tree diagram: Reserve Bank of India at the top, then Scheduled Banks and Non-Scheduled Banks. Under Scheduled: Commercial Banks (Public Sector, Private Sector, Foreign, Regional Rural, Small Finance, Payments) and Cooperative Banks (State, Central, Urban)." },
  "images/General_Awareness/Economics/Banking_Sector/34.png": { t: "fig", about: "Three nested boxes: Scheduled Commercial Banks, Scheduled Cooperative Banks, All India Financial Institutions, each with two example names." },
  "images/General_Awareness/Economics/Banking_Sector/35.png": { t: "fig", about: "Horizontal timeline with labels: 1894 Punjab National Bank, 1907 Indian Bank, 1908 Bank of Baroda, 1919 Union Bank of India, 1935 Reserve Bank of India, 1943 UCO Bank, 1955 State Bank of India, 1975 Regional Rural Banks, 1982 NABARD." },
  "images/General_Awareness/Economics/Banking_Sector/36.png": { t: "fig", about: "Highlight card with three facts: RBI set up on 1 April 1935, SBI formed on 1 July 1955, RRBs began on 2 October 1975." },
  "images/General_Awareness/Economics/Banking_Sector/37.png": { t: "fig", about: "Five cards in a row: NABARD agriculture and rural, EXIM Bank exports and imports, NHB housing, SIDBI small industries, NaBFID infrastructure. Each card has a one-line label." },
  "images/General_Awareness/Economics/Banking_Sector/38.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"NABARD headquarters Mumbai building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/38.png. a photo of the National Bank for Agriculture and Rural Development building",
  "images/General_Awareness/Economics/Banking_Sector/39.png": { t: "fig", about: "Timeline with three steps: Basel I 1988 (credit risk, minimum 8 percent), Basel II 2004 (three pillars), Basel III 2010 (after the 2008 crisis, leverage ratio, liquidity ratios)." },
  "images/General_Awareness/Economics/Banking_Sector/40.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bank for International Settlements Basel Switzerland building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/40.png. a photo of the Bank for International Settlements building",
  "images/General_Awareness/Economics/Banking_Sector/41.png": { t: "fig", about: "Warning dashboard with three gauges labelled Capital, NPA Level, Return on Assets, each with a red zone, leading to a box saying PCA triggered." },
  "images/General_Awareness/Economics/Banking_Sector/42.png": { t: "fig", about: "Three locked doors labelled Dividend Payment, Branch Expansion, New Loan Approvals under a sign Restrictions under PCA." },
  "images/General_Awareness/Economics/Banking_Sector/43.png": { t: "fig", about: "Split card comparing Bank and NBFC. Bank: accepts demand deposits, issues cheques, part of the payment system, deposit insurance. NBFC: no demand deposits, no cheques, not part of the payment system, no deposit insurance." },
  "images/General_Awareness/Economics/Banking_Sector/44.png": { t: "fig", about: "Eight icon cards: Personal Loans, Home Loans, Vehicle Finance, Gold Loans, Microfinance, Infrastructure Finance, Insurance Services, Investment Management." },
  "images/General_Awareness/Economics/Banking_Sector/45.png": { t: "fig", about: "Eight icon boxes in two rows: Agriculture, Micro Small and Medium Enterprises, Export Credit, Education, Housing, Social Infrastructure, Renewable Energy, Weaker Sections." },
  "images/General_Awareness/Economics/Banking_Sector/46.png": { t: "fig", about: "Bar chart with three bars: Scheduled Commercial Banks and Foreign Banks 40 percent, Regional Rural Banks 75 percent, Small Finance Banks 75 percent, each labelled Target of ANBC." },
  "images/General_Awareness/Economics/Banking_Sector/47.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Prathama Grameen Bank Moradabad branch photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/47.png. a photo of the first Regional Rural Bank",
  "images/General_Awareness/Economics/Banking_Sector/48.png": { t: "fig", about: "Three-part ownership bar: Central Government 50 percent, Sponsoring Bank 35 percent, State Government 15 percent." },
  "images/General_Awareness/Economics/Banking_Sector/49.png": { t: "fig", about: "Card with three examples: Capital Small Finance Bank, Ujjivan Small Finance Bank, Utkarsh Small Finance Bank, each with a small bank icon." },
  "images/General_Awareness/Economics/Banking_Sector/50.png": { t: "fig", about: "Four rule boxes: PSL target 75 percent, half of loans up to 25 lakh rupees, at least 25 percent branches in unbanked rural areas, minimum paid-up capital 200 crore rupees." },
  "images/General_Awareness/Economics/Banking_Sector/51.png": { t: "fig", about: "Two panels. Left green panel Payments Banks CAN: demand deposits up to 2 lakh rupees, debit cards, remittances, mobile payments, net banking, invest only in government securities. Right red panel CANNOT: credit cards, loans, fixed deposits, NRI deposits." },
  "images/General_Awareness/Economics/Banking_Sector/52.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Airtel Payments Bank app mobile photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/52.png. a phone showing a payments banking app",
  "images/General_Awareness/Economics/Banking_Sector/53.png": { t: "fig", about: "Hub diagram: Public Credit Registry in the centre linked to Banks, Non-Banking Financial Companies, Microfinance Institutions, with arrows showing credit information flowing both ways." },
  "images/General_Awareness/Economics/Banking_Sector/54.png": { t: "fig", about: "Warning picture: one borrower using the same property as security for loans from three different banks, crossed out with a red mark." },
  "images/General_Awareness/Economics/Banking_Sector/55.png": { t: "fig", about: "Three-step staircase: Tier 1 up to 50 crore rupees, bank-led within 90 days. Tier 2 from 50 to 500 crore rupees, Inter-Creditor Agreement within 180 days. Tier 3 above 500 crore rupees, independent Asset Management Company." },
  "images/General_Awareness/Economics/Banking_Sector/56.png": { t: "fig", about: "Mind map with Project Sashakt in the centre and branches Sunil Mehta Committee 2018, Public Sector Bank NPAs, Three Tiers, Bad Bank." },
  "images/General_Awareness/Economics/Banking_Sector/57.png": { t: "fig", about: "Rainbow arch with seven bands labelled A Appointments, B Bank Board Bureau, C Capitalisation, D De-stressing, E Empowerment, F Framework of Accountability, G Governance Reforms." },
  "images/General_Awareness/Economics/Banking_Sector/58.png": { t: "fig", about: "Four connected boxes: Recognition of bad loans, Resolution and Recovery, Reforms, Re-capitalisation." },
  "images/General_Awareness/Economics/Banking_Sector/59.png": { t: "fig", about: "Side by side comparison cards. BBB card: established 2016, first chair Vinod Rai, covered only public sector banks. FSIB card: replaced BBB, first chair Bhanu Pratap Sharma, covers public sector banks and insurance companies, expanded mandate." },
  "images/General_Awareness/Economics/Banking_Sector/60.png": { t: "fig", about: "Timeline: May 2014 P. J. Nayak Committee recommends BBB, February 2016 BBB constituted, later FSIB replaces BBB." }
});

/* CHANGE LOG
   - Insolvency and Bankruptcy Board of India was set up in 2016. Insolvency and bankruptcy are now defined in the standard legal way.
   - India Debt Resolution Company Limited is written with its correct name.
   - Current figures of Bank Rate, Repo Rate, Reverse Repo Rate and Cash Reserve Ratio change often, so no fixed figure is printed; only the concept is taught.
   - Standing Deposit Facility (2022) added with the Liquidity Adjustment Facility. Cash Reserve Ratio and Statutory Liquidity Ratio are stated as percentages of Net Demand and Time Liabilities.
   - Call money market runs from overnight up to 14 days. London Interbank Offered Rate has been discontinued, so it is not taught as a current benchmark.
   - Monetary Policy Committee: the Governor has a casting vote in case of a tie; the Urjit Patel Committee is named as the 2014 recommender.
   - State Bank of Bikaner and Jaipur was formed in 1963, so it is not listed as a 1993 merger. Only the New Bank of India merger into Punjab National Bank (1993) is taught.
   - Housing finance companies are regulated by the Reserve Bank of India since 2019, not by the National Housing Bank. National Bank for Agriculture and Rural Development supervises (does not regulate) Regional Rural Banks.
   - Prompt Corrective Action was adopted in 2002; it is not tied to Basel II.
   - Priority sector lending target is based on Adjusted Net Bank Credit or credit equivalent of off-balance sheet exposure, whichever is higher.
   - Project Sashakt middle tier: Inter-Creditor Agreement within 180 days, with the Insolvency Code as the next step if it fails.
   - Headquarters of the Banks Board Bureau is not taught because it is not clearly established.
*/