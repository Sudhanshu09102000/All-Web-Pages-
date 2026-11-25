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

/* Field: General_Awareness · Subject: Economics · Chapter: Banking_Sector · 10 concept pages (+ overview) · 28 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Economics/Banking_Sector/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "BANKING SECTOR",
      line2: "RBI + NPA + BAD BANKS",
      line3: "REPO • CRR • SLR",
      badge: "FULL CLASS",
      ribbon: "FACTS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Banking Sector in One Class | RBI, NPA, Repo, CRR, SLR | Economics for competitive exams",
      altTitles: ["Banking Sector Full Revision for SSC CGL", "RBI Monetary Policy Tools Made Easy"],
      description: "Banking is one of the most repeated topics in General Awareness. In this class we learn how banks earn profit, what a Non-Performing Asset is, how bad banks work, and how the Reserve Bank of India controls money with Repo Rate, Cash Reserve Ratio and Statutory Liquidity Ratio.\n\n📌 IN THIS CLASS\n✅ Bank basics and profit\n✅ NPA, bad banks, NARCL and IDRCL\n✅ RBI facts and functions\n✅ Monetary policy tools\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 What is a Bank\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Banking #Economics",
      tags: ["banking sector", "banking sector for ssc cgl", "rbi functions", "reserve bank of india", "monetary policy tools", "repo rate", "reverse repo rate", "bank rate", "cash reserve ratio", "statutory liquidity ratio", "crr and slr", "open market operations", "npa meaning", "non performing assets", "bad bank india", "narcl idrcl", "ibc 2016", "insolvency and bankruptcy code", "economics for ssc", "general awareness economy", "economy class notes", "banking awareness", "ssc cgl economics", "railway economics", "defence exam economy", "static gk banking"],
      hashtags: ["SSCCGL", "Banking", "Economics"],
      thumbText: "BANKING SECTOR + RBI",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🏦 New class is live: Banking Sector — RBI, NPA, Repo, CRR and SLR. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 What is a Bank",
      playlist: "Economics — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Banking Sector of India</u>: how banks earn, what bad loans are, and how the Reserve Bank of India controls money in the country. This chapter gives sure marks in General Awareness, so we will learn it slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>10</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>28</b><span>Questions</span></div>
        <div class="cp-stat"><b>~48 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>What is a Bank?</b><br>How a bank takes deposits, gives loans and earns profit, and the difference between its liabilities and its assets.</li>
        <li><b>Non-Performing Assets and Bad Banks</b><br>What happens when a loan is not repaid, and which tribunals help recover the money.</li>
        <li><b>Insolvency and Bankruptcy Code, 2016</b><br>India's latest recovery law and the two words insolvency and bankruptcy.</li>
        <li><b>India's Bad Banks — NARCL and IDRCL</b><br>The two special companies that buy and recover bad loans, and who owns them.</li>
        <li><b>Reserve Bank of India (RBI)</b><br>The central bank of India: its dates, its first governors and its headquarters.</li>
        <li><b>Functions of RBI as a Central Bank</b><br>The eight jobs that the Reserve Bank of India performs for the country.</li>
        <li><b>Monetary Policy and Its Tools</b><br>How the Reserve Bank controls money supply, credit and interest rates, and the two groups of tools.</li>
        <li><b>Bank Rate, Repo Rate and Reverse Repo Rate</b><br>Three interest rates, who borrows at each one, and how each rate fights inflation or slowdown.</li>
        <li><b>Cash Reserve Ratio and Statutory Liquidity Ratio</b><br>The two reserves that every bank must keep, and how they differ.</li>
        <li><b>Open Market Operations and Market Stabilisation Scheme</b><br>How buying and selling government securities adds or removes money from the market.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Banking questions come in almost every General Awareness paper, and the same ideas are used again in Economy, Current Affairs and Banking exams, so learning them well saves you time later.</div>
    `
  },
  2: {
    type: "concept", icon: "🏦", accent: "#3b82f6", pauseTimer: true,
    title: "What is a Bank?",
    html: `
      <p class="cp-lead">A <b>bank</b> is a financial institution that accepts <u>deposits</u> from the public and gives <u>loans</u> to individuals, businesses and the government.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/1.png" alt="Three boxes in a row: Public, Bank, Borrowers, joined by arrows labelled Deposit and Loan." data-caption="Money flows from the public into a bank and out to borrowers as loans." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/2.png" alt="busy bank branch counter customer India photo" data-caption="A customer being served at the counter of a bank branch in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">A bank works as a middleman. It takes deposits from people at a low interest rate and lends the same money at a higher interest rate. The difference between the two rates is called the <b>interest rate spread</b>, and this spread is how a bank earns its income.</p>
      <div class="cp-note tip">For example, if a bank pays 5 percent on a deposit and charges 9 percent on a loan, its margin on that money is 4 percent.</div>
      <table><thead><tr><th>Item</th><th>Meaning</th><th>Example</th></tr></thead><tbody><tr><td>Liability</td><td>Money that the bank owes to others</td><td>Money deposited by the public</td></tr><tr><td>Asset</td><td>Money that the bank holds or is owed, which earns income</td><td>Loans given to borrowers, property, gold and cash in the vault</td></tr></tbody></table>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/3.png" alt="Profit chain: Bank Margin minus Operational Cost equals Gross Profit, then Gross Profit mi" data-caption="The steps that turn a bank's margin into its final profit." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-formula" translate="no"><small>Bank profit</small>Gross Profit = Bank Margin − Operational Cost<br>Net Profit = Gross Profit − Corporate Tax</div>
      <p class="cp-lead">The net profit is finally shared with the shareholders of the bank according to the shares that each one holds.</p>
      <div class="cp-note trap">A deposit is a liability, not an asset, because the bank must pay it back. A loan is an asset because the borrower pays interest on it.</div>
      <div class="cp-note exam">Banking is a key part of the monetary policy of India, so questions often ask which items are liabilities and which are assets.</div>
    `
  },
  3: {
    questext: "Which of the following is an asset of a bank?",
    options: ["Savings deposits of the public", "Loans given to borrowers", "Money owed to depositors", "Fixed deposits kept by customers"],
    correct: "2",
    exptext: "✅ Loans given to borrowers are assets because they bring interest income to the bank. 📌 Money coming in to earn is an asset; money the bank must return is a liability. ❌ Deposits look like money in the bank, but they must be paid back, so they are liabilities."
  },
  4: {
    questext: "The main source of income of a bank is the difference between its lending rate and its deposit rate. This difference is known as",
    options: ["Interest rate spread", "Corporate tax", "Operational cost", "Dividend"],
    correct: "1",
    exptext: "✅ The difference between the lending rate and the deposit rate is called the interest rate spread. 📌 A bank buys money cheap and sells it dear, and the gap is its earning. ❌ Operational cost is an expense, not an income."
  },
  5: {
    questext: "Consider the following statements about banks:\n1. The money deposited by the public is a liability of a bank.\n2. Net profit is equal to gross profit minus corporate tax.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. Deposits must be returned to the public, so they are liabilities, and tax is subtracted from gross profit to reach net profit. 📌 Gross comes first, net comes last. ❌ Calling deposits an asset is the common mistake."
  },
  6: {
    type: "concept", icon: "⚠️", accent: "#ef4444", pauseTimer: true,
    title: "Non-Performing Assets and Bad Banks",
    html: `
      <p class="cp-lead">A loan is a <b>performing asset</b> while the borrower pays the instalments on time. When the repayment stops, the same loan becomes a <b>Non-Performing Asset (NPA)</b> and begins to hurt the bank.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/4.png" alt="Two rows. Top row: Performing Asset, borrower pays principal plus interest on time, bank r" data-caption="A loan is performing when instalments arrive and non-performing when they stop." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/5.png" alt="Chain of four boxes: NPAs rise, Profit falls, Balance sheet turns negative, Liquidity cris" data-caption="Rising bad loans reduce profit and can push a bank into a crisis." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Every loan has two parts: the <b>principal</b>, which is the amount borrowed, and the <b>interest</b>, which is the price of borrowing. If the principal or the interest stays unpaid for more than <u>90 days</u>, the bank must declare the loan an NPA.</p>
      <table><thead><tr><th>Performing Asset</th><th>Non-Performing Asset</th></tr></thead><tbody><tr><td>Instalments arrive on time</td><td>Repayment has stopped for more than 90 days</td></tr><tr><td>Earns income for the bank</td><td>Becomes a bad entry in the balance sheet</td></tr><tr><td>Helps profit</td><td>Reduces profit</td></tr></tbody></table>
      <p class="cp-lead">A <b>bad bank</b> is a special institution that buys the bad loans of other banks and then recovers the money using recovery laws. For example, if a bank sells an NPA of 100 crore rupees for 90 crore rupees, it gets cash to lend again and its balance sheet becomes cleaner.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/6.png" alt="National Company Law Tribunal building bench photo" data-caption="A tribunal where company and loan recovery cases are heard in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Tribunal</th><th>Main work</th></tr></thead><tbody><tr><td>National Company Law Tribunal (NCLT)</td><td>Hears company insolvency cases</td></tr><tr><td>National Company Law Appellate Tribunal (NCLAT)</td><td>Hears appeals against orders of the National Company Law Tribunal</td></tr><tr><td>Debt Recovery Tribunal (DRT)</td><td>Helps banks recover their loans</td></tr><tr><td>Debt Recovery Appellate Tribunal (DRAT)</td><td>Hears appeals against orders of the Debt Recovery Tribunal</td></tr></tbody></table>
      <div class="cp-note trap">A loan does not become an NPA after one missed instalment. It must stay overdue for more than 90 days.</div>
      <div class="cp-note exam">Questions ask the 90 day rule and the full names of the four tribunals.</div>
    `
  },
  7: {
    questext: "A loan is declared a Non-Performing Asset when its principal or interest remains overdue for more than",
    options: ["30 days", "60 days", "90 days", "180 days"],
    correct: "3",
    exptext: "✅ The limit is more than 90 days. 📌 Think of three months: one season of waiting. ❌ Thirty days is wrong because the bank gives the borrower a longer time before the loan is called bad."
  },
  8: {
    questext: "Which body hears the appeals against the orders of the Debt Recovery Tribunal?",
    options: ["National Company Law Tribunal", "National Company Law Appellate Tribunal", "Insolvency and Bankruptcy Board of India", "Debt Recovery Appellate Tribunal"],
    correct: "4",
    exptext: "✅ The Debt Recovery Appellate Tribunal hears such appeals. 📌 The word Appellate always means the higher body for appeals. ❌ The company tribunals deal with company cases, not loan recovery cases."
  },
  9: {
    questext: "Consider the following statements:\n1. When the Non-Performing Assets of banks rise, the profit of banks falls.\n2. A bad bank gives fresh loans to the public.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because unpaid loans bring no income. 📌 A bad bank buys bad loans; it does not lend. ❌ Statement 2 is wrong because the work of a bad bank is to buy and recover bad loans."
  },
  10: {
    type: "concept", icon: "⚖️", accent: "#8b5cf6", pauseTimer: true,
    title: "Insolvency and Bankruptcy Code, 2016",
    html: `
      <p class="cp-lead">The <b>Insolvency and Bankruptcy Code (IBC), 2016</b> is India's latest recovery law. It gives lenders a time-bound way to get back their money from borrowers who cannot pay.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/7.png" alt="Tree: Insolvency and Bankruptcy Code 2016 at the left, linked to Insolvency, Bankruptcy an" data-caption="The Code, its regulator and the tribunals that hear the cases." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/8.png" alt="Two column comparison. Insolvency: unable to pay debts, a financial condition. Bankruptcy:" data-caption="Insolvency is a condition, and bankruptcy is a legal order." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead"><b>Insolvency</b> means that a person or a company is unable to pay its debts. <b>Bankruptcy</b> means that a court or a tribunal has formally declared this and the case is settled by law.</p>
      <p class="cp-lead">The process is supervised by the <b>Insolvency and Bankruptcy Board of India (IBBI)</b>, which was set up in 2016 under the Code. It is the regulator that guides the experts who manage the dealings between lenders and the borrower.</p>
      <table><thead><tr><th>Case</th><th>Hears the case</th></tr></thead><tbody><tr><td>Companies</td><td>National Company Law Tribunal, with appeals to the National Company Law Appellate Tribunal</td></tr><tr><td>Individuals</td><td>Debt Recovery Tribunal, with appeals to the Debt Recovery Appellate Tribunal</td></tr></tbody></table>
      <div class="cp-note trap">Do not mix the two words. Insolvency is the problem of not being able to pay, and bankruptcy is the legal declaration of that problem.</div>
      <div class="cp-note exam">The year 2016, the Board and the tribunals for companies and individuals are favourite exam points.</div>
    `
  },
  11: {
    questext: "The regulator of the insolvency process under the Insolvency and Bankruptcy Code, 2016 is",
    options: ["Reserve Bank of India", "Securities and Exchange Board of India", "National Company Law Appellate Tribunal", "Insolvency and Bankruptcy Board of India"],
    correct: "4",
    exptext: "✅ The Insolvency and Bankruptcy Board of India is the regulator. 📌 The name of the law and the name of the Board are the same. ❌ The Reserve Bank regulates banks, not this process."
  },
  12: {
    questext: "Which tribunal deals with the insolvency of companies under the Code?",
    options: ["Debt Recovery Tribunal", "National Company Law Tribunal", "Debt Recovery Appellate Tribunal", "Banks Board Bureau"],
    correct: "2",
    exptext: "✅ The National Company Law Tribunal handles company cases. 📌 Company means Company Law Tribunal. ❌ The Debt Recovery Tribunal is linked with individual cases and loan recovery."
  },
  13: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "India's Bad Banks — NARCL and IDRCL",
    html: `
      <p class="cp-lead">India set up two bad banks to clean the balance sheets of public sector banks: the <b>National Asset Reconstruction Company Limited (NARCL)</b> and the <b>Indian Debt Resolution Company Limited (IDRCL)</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/9.png" alt="Two boxes joined by a double arrow labelled works together. Left box: NARCL buys the bad l" data-caption="NARCL buys the bad loans and IDRCL works to recover the money." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/10.png" alt="Two pie charts side by side. NARCL: 51 percent public sector banks, 49 percent private sec" data-caption="The majority owners of the two bad banks are different." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">NARCL is the first public sector bad bank of India. Its main work is to buy large bad loans from public sector banks, so that their balance sheets become clean again. IDRCL is the first private sector bad bank. It works together with NARCL: NARCL buys the bad loans and IDRCL manages the process of recovering the money.</p>
      <table><thead><tr><th>Feature</th><th>NARCL</th><th>IDRCL</th></tr></thead><tbody><tr><td>Full name</td><td>National Asset Reconstruction Company Limited</td><td>Indian Debt Resolution Company Limited</td></tr><tr><td>Type</td><td>First public sector bad bank</td><td>First private sector bad bank</td></tr><tr><td>Main work</td><td>Buys large bad loans</td><td>Manages the recovery process</td></tr><tr><td>Majority stake of 51 percent</td><td>Public sector banks</td><td>Private sector banks</td></tr></tbody></table>
      <div class="cp-mnemonic">NARCL buys the loan, IDRCL runs the recovery.</div>
      <div class="cp-note trap">The shareholding is reversed. Public sector banks hold 51 percent of NARCL, but private sector banks hold 51 percent of IDRCL.</div>
      <div class="cp-note exam">Questions ask which bad bank is public, which is private, and who holds the majority.</div>
    `
  },
  14: {
    questext: "Which of the following is India's first public sector bad bank?",
    options: ["Indian Debt Resolution Company Limited", "Banks Board Bureau", "National Asset Reconstruction Company Limited", "Public Credit Registry"],
    correct: "3",
    exptext: "✅ The National Asset Reconstruction Company Limited is the public sector bad bank. 📌 N for National and for buying NPAs. ❌ The Indian Debt Resolution Company Limited is the private sector one, and it manages recovery."
  },
  15: {
    questext: "Consider the following statements:\n1. Public sector banks hold the majority stake of 51 percent in the National Asset Reconstruction Company Limited.\n2. Public sector banks hold the majority stake of 51 percent in the Indian Debt Resolution Company Limited.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. Private sector banks hold the 51 percent stake in the Indian Debt Resolution Company Limited. 📌 The two stakes are mirror images. ❌ Statement 2 repeats the public sector share by mistake."
  },
  16: {
    questext: "The Indian Debt Resolution Company Limited mainly",
    options: ["buys large bad loans from public sector banks", "manages and resolves the recovery of bad loans", "issues currency notes", "regulates all commercial banks"],
    correct: "2",
    exptext: "✅ It manages the resolution process after the bad loans are bought. 📌 Buying belongs to the National company, running belongs to the Indian company. ❌ Buying the loans is the work of the other bad bank."
  },
  17: {
    type: "concept", icon: "🏛️", accent: "#0ea5e9", pauseTimer: true,
    title: "Reserve Bank of India (RBI)",
    html: `
      <p class="cp-lead">The <b>Reserve Bank of India (RBI)</b> is the central bank of India. It controls money and credit in the country and also regulates the banks.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/11.png" alt="Reserve Bank of India headquarters Mumbai building photo" data-caption="The head office of the Reserve Bank of India in Mumbai." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/12.png" alt="C. D. Deshmukh first Indian governor Reserve Bank of India portrait" data-caption="Chintaman Dwarkanath Deshmukh, the first Indian Governor of the Reserve Bank of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/13.png" alt="Central box: Reserve Bank of India. Left branch: Central Bank of India, formed by the Rese" data-caption="The two main roles of the Reserve Bank and the laws behind them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Established</td><td>1 April 1935, under the Reserve Bank of India Act, 1934</td></tr><tr><td>Based on</td><td>Recommendation of the Hilton Young Commission, 1926</td></tr><tr><td>Nationalised</td><td>1 January 1949, and it is fully government owned since then</td></tr><tr><td>Headquarters</td><td>Mumbai, Maharashtra; it was first in Kolkata and shifted in 1937</td></tr><tr><td>First Governor</td><td>Osborne Smith, a British officer</td></tr><tr><td>First Indian Governor</td><td>Chintaman Dwarkanath Deshmukh, in 1943</td></tr><tr><td>Regional offices</td><td>Four: Delhi, Mumbai, Kolkata and Chennai</td></tr><tr><td>Law to regulate banks</td><td>Banking Regulation Act, 1949</td></tr></tbody></table>
      <p class="cp-lead">In the past the Reserve Bank also worked as the central bank of Burma (Myanmar) until March 1947, and as the central bank of Pakistan until 30 June 1948.</p>
      <div class="cp-note trap">The Act was passed in 1934, the Bank started work in 1935, and it was nationalised in 1949. Do not mix these three years.</div>
      <div class="cp-note exam">First Governor, first Indian Governor, headquarters and the foundation dates are asked again and again.</div>
    `
  },
  18: {
    questext: "The Reserve Bank of India was established on",
    options: ["1 April 1934", "1 January 1949", "1 July 1955", "1 April 1935"],
    correct: "4",
    exptext: "✅ It started work on 1 April 1935. 📌 The Act is 1934, the working Bank is 1935. ❌ The year 1949 is the year of nationalisation, and 1 July 1955 is the date of the State Bank of India."
  },
  19: {
    questext: "Who was the first Indian Governor of the Reserve Bank of India?",
    options: ["Osborne Smith", "Chintaman Dwarkanath Deshmukh", "Urjit Patel", "Vinod Rai"],
    correct: "2",
    exptext: "✅ Chintaman Dwarkanath Deshmukh became the first Indian Governor in 1943. 📌 Smith was first of all, Deshmukh first among Indians. ❌ Osborne Smith was British."
  },
  20: {
    questext: "Consider the following statements about the Reserve Bank of India:\n1. It was established on the recommendation of the Hilton Young Commission.\n2. Its headquarters has always been in Mumbai since 1935.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 The bank first sat in Kolkata. ❌ Statement 2 is wrong because the head office moved from Kolkata to Mumbai in 1937."
  },
  21: {
    questext: "The Reserve Bank of India was nationalised on",
    options: ["1 January 1949", "1 April 1935", "19 July 1969", "15 April 1980"],
    correct: "1",
    exptext: "✅ The nationalisation date is 1 January 1949. 📌 New year, new owner: the government. ❌ The dates 1969 and 1980 belong to the nationalisation of commercial banks."
  },
  22: {
    type: "concept", icon: "🖨️", accent: "#14b8a6", pauseTimer: true,
    title: "Functions of RBI as a Central Bank",
    html: `
      <p class="cp-lead">The Reserve Bank of India performs eight main jobs as the central bank. Each one helps the government, the banks or the public.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/14.png" alt="Mind map with Reserve Bank of India at the centre and eight branches: Issue of Currency, B" data-caption="The eight functions of the Reserve Bank of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/15.png" alt="Indian rupee currency notes assorted denominations photo" data-caption="Indian currency notes, which are issued by the Reserve Bank of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Function</th><th>What it means</th></tr></thead><tbody><tr><td>Issue of currency</td><td>Issues all currency notes of two rupees and above</td></tr><tr><td>Banker to the government</td><td>Acts as banker, agent and financial adviser to the Central and State Governments</td></tr><tr><td>Banker's bank</td><td>Provides banking services and financial help to commercial banks</td></tr><tr><td>Controller of credit</td><td>Controls credit and money supply with tools such as the Repo Rate, the Cash Reserve Ratio and the Statutory Liquidity Ratio</td></tr><tr><td>Custodian of foreign exchange reserves</td><td>Keeps and manages the foreign exchange reserves of the country</td></tr><tr><td>Lender of last resort</td><td>Gives emergency money to banks in a crisis</td></tr><tr><td>Regulator and supervisor</td><td>Regulates and watches banks and other financial institutions</td></tr><tr><td>Clearing house</td><td>Helps banks settle payments between each other</td></tr></tbody></table>
      <p class="cp-lead">The one rupee note is not issued by the Reserve Bank. It is issued by the Government of India through the Ministry of Finance.</p>
      <div class="cp-note trap">The Reserve Bank is the lender of last resort, which means it lends only when a bank cannot get money anywhere else.</div>
      <div class="cp-note exam">Match-type questions often pair each function with its meaning.</div>
    `
  },
  23: {
    questext: "Which of the following functions is performed by the Reserve Bank of India as a lender of last resort?",
    options: ["Issuing coins of one rupee", "Giving emergency financial help to banks in a crisis", "Collecting income tax", "Fixing the price of gold"],
    correct: "2",
    exptext: "✅ The Reserve Bank gives emergency money to banks in a crisis. 📌 Last resort means the last place a bank can turn to. ❌ Issuing one rupee notes and coins is done by the government, not by this function."
  },
  24: {
    questext: "Consider the following statements:\n1. The Reserve Bank of India issues the one rupee note.\n2. The Reserve Bank of India issues currency notes of two rupees and above.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 One rupee is the government's, two and above are the Bank's. ❌ Statement 1 is wrong because the Ministry of Finance issues the one rupee note."
  },
  25: {
    questext: "When the Reserve Bank gives banking services and financial help to commercial banks, it is acting as the",
    options: ["banker to the government", "controller of credit", "banker's bank", "custodian of foreign exchange reserves"],
    correct: "3",
    exptext: "✅ It is the banker's bank, because commercial banks use it just as the public uses commercial banks. 📌 Banks bank with the Bank. ❌ Banker to the government means serving the Central and State Governments."
  },
  26: {
    type: "concept", icon: "🎛️", accent: "#ec4899", pauseTimer: true,
    title: "Monetary Policy and Its Tools",
    html: `
      <p class="cp-lead"><b>Monetary policy</b> is the plan used by the Reserve Bank of India to control the money supply, credit and interest rates, so that prices stay stable and the economy grows.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/16.png" alt="Two boxes under the heading Monetary Policy Tools. Left box: Quantitative Tools, affect th" data-caption="The two groups of monetary policy tools and what each group affects." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/17.png" alt="Two chains. Left: Interest rate rises, loans become costly, money supply falls, demand fal" data-caption="How a higher or a lower interest rate changes the economy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The tools are of two kinds. <b>Quantitative tools</b>, also called general credit control, change the overall volume of credit in the economy. <b>Qualitative tools</b> are selective: they direct credit to, or away from, specific sectors instead of changing the whole money supply.</p>
      <table><thead><tr><th>Group</th><th>What it affects</th><th>Examples</th></tr></thead><tbody><tr><td>Quantitative tools</td><td>Overall volume of credit</td><td>Bank Rate, Repo Rate, Reverse Repo Rate, Cash Reserve Ratio, Statutory Liquidity Ratio, Open Market Operations</td></tr><tr><td>Qualitative tools</td><td>Specific sectors</td><td>Margin requirement, rationing of credit, direct action, moral suasion</td></tr></tbody></table>
      <p class="cp-lead">When prices rise too fast, the Reserve Bank raises rates so that loans become costly and demand falls. When the economy is weak, it lowers rates so that loans become cheap and demand rises.</p>
      <div class="cp-note trap">Quantitative tools control how much credit exists, while qualitative tools control where the credit goes.</div>
      <div class="cp-note exam">Questions ask you to sort the tools into the two groups and to say what happens when rates go up or down.</div>
    `
  },
  27: {
    questext: "Which of the following is a qualitative tool of monetary policy?",
    options: ["Repo Rate", "Cash Reserve Ratio", "Open Market Operations", "Moral suasion"],
    correct: "4",
    exptext: "✅ Moral suasion is a selective, qualitative tool, in which the Reserve Bank persuades banks. 📌 Persuading is about quality and direction, not volume. ❌ The other three change the overall volume of credit."
  },
  28: {
    questext: "Monetary policy of India is best described as a plan that",
    options: ["is made by the Ministry of Finance only", "controls money supply, credit and interest rates", "fixes the rates of income tax", "decides the budget of the government"],
    correct: "2",
    exptext: "✅ Monetary policy is used to control money supply, credit and interest rates. 📌 Money and interest belong to the Reserve Bank, tax and budget belong to the government. ❌ Tax and budget are part of fiscal policy."
  },
  29: {
    type: "concept", icon: "💹", accent: "#84cc16", pauseTimer: true,
    title: "Bank Rate, Repo Rate and Reverse Repo Rate",
    html: `
      <p class="cp-lead">These are three interest rates of the Reserve Bank. They tell us who borrows from whom, for how long and against what.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/18.png" alt="Three boxes side by side. Bank Rate: Reserve Bank lends to banks, long term, no securities" data-caption="Who borrows from whom at each of the three rates." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/19.png" alt="Two arrows. Top: rate goes up, borrowing becomes costly, money supply falls, inflation is " data-caption="A higher rate controls inflation and a lower rate encourages growth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>Bank Rate</b> is the rate at which the Reserve Bank lends money to commercial banks for the long term. The <b>Repo Rate</b> is the rate for short term loans, where banks sell government securities and promise to buy them back later; the word repo means repurchase agreement. The <b>Reverse Repo Rate</b> is the rate at which the Reserve Bank borrows money from banks for a short term.</p>
      <table><thead><tr><th>Rate</th><th>Who borrows</th><th>Duration</th><th>Collateral</th></tr></thead><tbody><tr><td>Bank Rate</td><td>Banks from the Reserve Bank</td><td>Long term</td><td>Not required</td></tr><tr><td>Repo Rate</td><td>Banks from the Reserve Bank</td><td>Short term</td><td>Government securities required</td></tr><tr><td>Reverse Repo Rate</td><td>Reserve Bank from banks</td><td>Short term</td><td>Government securities</td></tr></tbody></table>
      <p class="cp-lead">If the Reverse Repo Rate rises, banks prefer to keep more money with the Reserve Bank, so less money reaches the public and the money supply falls. If it falls, banks lend more to the public and the money supply rises.</p>
      <div class="cp-note tip">The Reverse Repo Rate is always lower than the Repo Rate.</div>
      <div class="cp-note trap">In a repo the Reserve Bank gives money to banks. In a reverse repo the Reserve Bank takes money from banks. Do not swap them.</div>
      <div class="cp-note exam">Questions ask who borrows, the short or long term, and the effect of a rise or fall on inflation.</div>
    `
  },
  30: {
    questext: "The rate at which the Reserve Bank of India lends money to commercial banks for the short term, against government securities, is called the",
    options: ["Bank Rate", "Reverse Repo Rate", "Repo Rate", "Call Money Rate"],
    correct: "3",
    exptext: "✅ This is the Repo Rate, which stands for repurchase agreement. 📌 Repo means the Bank gives, reverse means the Bank takes. ❌ The Bank Rate is for the long term, and the Reverse Repo Rate is when the Bank borrows."
  },
  31: {
    questext: "Consider the following statements:\n1. The Reverse Repo Rate is the rate at which the Reserve Bank borrows from commercial banks.\n2. The Reverse Repo Rate is always higher than the Repo Rate.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 The Reserve Bank pays less for the money it takes than it charges on the money it gives. ❌ Statement 2 is wrong because the Reverse Repo Rate is always lower than the Repo Rate."
  },
  32: {
    questext: "To control inflation, the Reserve Bank of India will generally",
    options: ["lower the Repo Rate", "raise the Repo Rate", "lower the Bank Rate", "buy government securities"],
    correct: "2",
    exptext: "✅ A higher Repo Rate makes borrowing costly, so the money supply and demand fall and inflation is curbed. 📌 High rate, cool economy. ❌ Lowering rates makes loans cheaper and would increase demand."
  },
  33: {
    type: "concept", icon: "🔒", accent: "#f97316", pauseTimer: true,
    title: "Cash Reserve Ratio and Statutory Liquidity Ratio",
    html: `
      <p class="cp-lead">Every bank must keep a part of its money aside and cannot lend all of it. The two compulsory reserves are the <b>Cash Reserve Ratio (CRR)</b> and the <b>Statutory Liquidity Ratio (SLR)</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/20.png" alt="Two vaults. Left vault labelled CRR: only cash, kept with the Reserve Bank, no interest. R" data-caption="The two reserves differ in what they hold and where they are kept." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/21.png" alt="Two arrows. CRR rises: less money to lend, money supply falls, inflation is curbed. CRR fa" data-caption="A higher reserve ratio removes money from lending and a lower one adds money." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The <b>Cash Reserve Ratio</b> is the minimum percentage of a bank's total deposits that it must keep as cash with the Reserve Bank. The bank earns no interest on this money. It applies to all scheduled banks, both private and public sector. The <b>Statutory Liquidity Ratio</b> is the minimum percentage of Net Demand and Time Liabilities that a bank must keep in cash, gold or government securities. This is kept with the bank itself, not with the Reserve Bank, and the bank earns interest on the securities.</p>
      <table><thead><tr><th>Point</th><th>Cash Reserve Ratio</th><th>Statutory Liquidity Ratio</th></tr></thead><tbody><tr><td>Form of the reserve</td><td>Cash only</td><td>Cash, gold and government securities</td></tr><tr><td>Where it is kept</td><td>With the Reserve Bank</td><td>With the bank itself</td></tr><tr><td>Interest</td><td>No interest earned</td><td>Interest earned on government securities</td></tr><tr><td>Effect</td><td>Controls the money supply directly</td><td>Controls bank credit and liquidity</td></tr></tbody></table>
      <p class="cp-lead">The word statutory means related to law. If either ratio is raised, banks have less money to lend and inflation is controlled. If either ratio is lowered, banks can lend more and growth is stimulated.</p>
      <div class="cp-note trap">Cash Reserve Ratio is cash only and stays with the Reserve Bank. Statutory Liquidity Ratio is wider and stays with the bank.</div>
      <div class="cp-note exam">Questions often ask where each reserve is kept and whether interest is earned.</div>
    `
  },
  34: {
    questext: "The Cash Reserve Ratio is the minimum percentage of a bank's total deposits that it must keep",
    options: ["in gold with itself", "in government securities", "as cash with the Reserve Bank of India", "as loans to farmers"],
    correct: "3",
    exptext: "✅ Cash Reserve Ratio money is kept as cash with the Reserve Bank, and no interest is paid. 📌 C for Cash, and it goes to the central bank. ❌ Gold and securities belong to the Statutory Liquidity Ratio."
  },
  35: {
    questext: "Consider the following statements:\n1. Banks earn interest on the Cash Reserve Ratio balance.\n2. Banks can keep gold and government securities to meet the Statutory Liquidity Ratio.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Cash with the Reserve Bank earns nothing. ❌ Statement 1 is wrong because no interest is earned on the Cash Reserve Ratio balance."
  },
  36: {
    questext: "Which of the following is NOT an asset that counts for the Statutory Liquidity Ratio?",
    options: ["Cash in hand", "Gold", "Government securities", "Deposits kept with the Reserve Bank as the Cash Reserve Ratio"],
    correct: "4",
    exptext: "✅ The Cash Reserve Ratio balance is separate and is kept with the Reserve Bank. 📌 The Statutory Liquidity Ratio is held with the bank itself. ❌ Cash in hand, gold and government securities all count."
  },
  37: {
    type: "concept", icon: "📈", accent: "#06b6d4", pauseTimer: true,
    title: "Open Market Operations and Market Stabilisation Scheme",
    html: `
      <p class="cp-lead">Through <b>Open Market Operations (OMO)</b> the Reserve Bank buys or sells government securities in the open market to change the money supply. The <b>Market Stabilisation Scheme (MSS)</b> is a special scheme to remove extra money from the market.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/22.png" alt="Two arrows between Reserve Bank and Market. Top arrow: Reserve Bank buys government securi" data-caption="Buying adds money to the market and selling removes money from it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Banking_Sector/23.png" alt="Flow: Foreign money flows in, Reserve Bank issues bonds, extra money is absorbed, funds ar" data-caption="The Market Stabilisation Scheme absorbs extra money into a separate account." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Action</th><th>Effect on money</th><th>When it is used</th></tr></thead><tbody><tr><td>Reserve Bank buys government securities</td><td>Adds money, so the money supply rises</td><td>In a recession or deflation</td></tr><tr><td>Reserve Bank sells government securities</td><td>Removes money, so the money supply falls</td><td>To control inflation</td></tr></tbody></table>
      <p class="cp-lead">The Market Stabilisation Scheme was adopted in 2004 to handle large inflows of foreign money. The Reserve Bank issues bonds to absorb the extra money, and the funds are kept in a separate account with the Reserve Bank. They are not used for the expenditure of the government.</p>
      <div class="cp-note trap">Buying securities puts money into the market, and selling securities pulls money out. Many learners reverse this.</div>
      <div class="cp-note exam">Remember that the Market Stabilisation Scheme began in 2004 and its money is not used for government spending.</div>
    `
  },
  38: {
    questext: "To control inflation, the Reserve Bank of India under Open Market Operations will",
    options: ["buy government securities", "sell government securities", "lower the Cash Reserve Ratio", "lower the Repo Rate"],
    correct: "2",
    exptext: "✅ Selling securities takes money out of the market, so the money supply falls. 📌 Sell to shrink. ❌ Buying securities adds money, which is done in a recession."
  },
  39: {
    questext: "Consider the following statements about the Market Stabilisation Scheme:\n1. It was adopted in 2004 to manage large foreign capital inflows.\n2. The funds collected under it are used for the expenditure of the government.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Think of a separate locked account. ❌ Statement 2 is wrong because the money is kept in a separate account with the Reserve Bank and is not spent by the government."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Banking_Sector/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a classic bank building with columns, a few real-looking gold coins and a subtle rising chart line" },
  "images/General_Awareness/Economics/Banking_Sector/1.png": { t: "fig", about: "Three boxes in a row: Public, Bank, Borrowers, joined by arrows labelled Deposit and Loan." },
  "images/General_Awareness/Economics/Banking_Sector/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"busy bank branch counter customer India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/2.png. an Indian bank branch with a customer being served at the counter",
  "images/General_Awareness/Economics/Banking_Sector/3.png": { t: "fig", about: "Profit chain: Bank Margin minus Operational Cost equals Gross Profit, then Gross Profit minus Corporate Tax equals Net Profit." },
  "images/General_Awareness/Economics/Banking_Sector/4.png": { t: "fig", about: "Two rows. Top row: Performing Asset, borrower pays principal plus interest on time, bank receives money. Bottom row: Non-Performing Asset, borrower stops paying, bank waits 90 days, loan declared NPA." },
  "images/General_Awareness/Economics/Banking_Sector/5.png": { t: "fig", about: "Chain of four boxes: NPAs rise, Profit falls, Balance sheet turns negative, Liquidity crisis." },
  "images/General_Awareness/Economics/Banking_Sector/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"National Company Law Tribunal building bench photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/6.png. a tribunal building or courtroom, to show where such cases are heard",
  "images/General_Awareness/Economics/Banking_Sector/7.png": { t: "fig", about: "Tree: Insolvency and Bankruptcy Code 2016 at the left, linked to Insolvency, Bankruptcy and the regulator Insolvency and Bankruptcy Board of India; below, National Company Law Tribunal for companies and Debt Recovery Tribunal for individuals." },
  "images/General_Awareness/Economics/Banking_Sector/8.png": { t: "fig", about: "Two column comparison. Insolvency: unable to pay debts, a financial condition. Bankruptcy: declared by a court or tribunal, a legal status." },
  "images/General_Awareness/Economics/Banking_Sector/9.png": { t: "fig", about: "Two boxes joined by a double arrow labelled works together. Left box: NARCL buys the bad loans. Right box: IDRCL manages the recovery." },
  "images/General_Awareness/Economics/Banking_Sector/10.png": { t: "fig", about: "Two pie charts side by side. NARCL: 51 percent public sector banks, 49 percent private sector banks. IDRCL: 51 percent private sector banks, 49 percent public sector banks." },
  "images/General_Awareness/Economics/Banking_Sector/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Reserve Bank of India headquarters Mumbai building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/11.png. the Reserve Bank of India head office building in Mumbai",
  "images/General_Awareness/Economics/Banking_Sector/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"C. D. Deshmukh first Indian governor Reserve Bank of India portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/12.png. portrait of the first Indian Governor of the Reserve Bank",
  "images/General_Awareness/Economics/Banking_Sector/13.png": { t: "fig", about: "Central box: Reserve Bank of India. Left branch: Central Bank of India, formed by the Reserve Bank of India Act 1934. Right branch: Regulator of banks by the Banking Regulation Act 1949, making rules and issuing or cancelling bank licences." },
  "images/General_Awareness/Economics/Banking_Sector/14.png": { t: "fig", about: "Mind map with Reserve Bank of India at the centre and eight branches: Issue of Currency, Banker to Government, Banker's Bank, Controller of Credit, Custodian of Foreign Exchange Reserves, Lender of Last Resort, Regulator of Banks, Clearing House." },
  "images/General_Awareness/Economics/Banking_Sector/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian rupee currency notes assorted denominations photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Banking_Sector/15.png. a spread of Indian currency notes",
  "images/General_Awareness/Economics/Banking_Sector/16.png": { t: "fig", about: "Two boxes under the heading Monetary Policy Tools. Left box: Quantitative Tools, affect the total amount of credit. Right box: Qualitative Tools, affect specific sectors." },
  "images/General_Awareness/Economics/Banking_Sector/17.png": { t: "fig", about: "Two chains. Left: Interest rate rises, loans become costly, money supply falls, demand falls, prices fall. Right: Interest rate falls, loans become cheap, money supply rises, demand rises, production and jobs rise." },
  "images/General_Awareness/Economics/Banking_Sector/18.png": { t: "fig", about: "Three boxes side by side. Bank Rate: Reserve Bank lends to banks, long term, no securities needed. Repo Rate: Reserve Bank lends to banks, short term, against government securities. Reverse Repo Rate: Reserve Bank borrows from banks, short term." },
  "images/General_Awareness/Economics/Banking_Sector/19.png": { t: "fig", about: "Two arrows. Top: rate goes up, borrowing becomes costly, money supply falls, inflation is controlled. Bottom: rate goes down, loans become cheap, credit flows, growth is stimulated." },
  "images/General_Awareness/Economics/Banking_Sector/20.png": { t: "fig", about: "Two vaults. Left vault labelled CRR: only cash, kept with the Reserve Bank, no interest. Right vault labelled SLR: cash, gold and government securities, kept with the bank itself, interest earned on securities." },
  "images/General_Awareness/Economics/Banking_Sector/21.png": { t: "fig", about: "Two arrows. CRR rises: less money to lend, money supply falls, inflation is curbed. CRR falls: more money to lend, credit grows." },
  "images/General_Awareness/Economics/Banking_Sector/22.png": { t: "fig", about: "Two arrows between Reserve Bank and Market. Top arrow: Reserve Bank buys government securities, money goes into the market, money supply rises. Bottom arrow: Reserve Bank sells government securities, money comes out of the market, money supply falls." },
  "images/General_Awareness/Economics/Banking_Sector/23.png": { t: "fig", about: "Flow: Foreign money flows in, Reserve Bank issues bonds, extra money is absorbed, funds are kept in a separate account with the Reserve Bank." }
});

/* CHANGE LOG
   - Insolvency and Bankruptcy Board of India was constituted in 2016 under the Code (the book showed 2017).
   - Insolvency is defined as inability to pay debts and bankruptcy as a legal declaration by a court or tribunal; the book's wording was reversed in meaning.
   - Current values of Bank Rate, Repo Rate, Reverse Repo Rate, Cash Reserve Ratio and Statutory Liquidity Ratio are not written on the pages because they change with every policy review; the fixed relationships between the rates are taught instead.
   - The one rupee note is issued by the Government of India through the Ministry of Finance; the Reserve Bank issues notes of two rupees and above.
   - The registration year of the bad banks is left out of the pages because the book's date needs checking.
*/