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

/* Field: General_Awareness · Subject: Economics · Chapter: Budget · 11 concept pages (+ overview) · 38 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Economics/Budget/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "UNION BUDGET",
      line2: "FUNDS + DEFICITS",
      line3: "ECONOMIC SURVEY",
      badge: "FULL CLASS",
      ribbon: "FACTS • FORMULAS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Union Budget Complete Chapter | Article 112, Deficits, Funds | Economics for SSC CGL",
      altTitles: ["Types of Deficits and Their Formulas in One Class", "Consolidated Fund, Public Account and Contingency Fund Made Easy"],
      description: "The Union Budget is one of the most scoring chapters in Economics. In this class you learn what a budget is, how it is presented, who holds which records, and how the deficits are calculated, step by step and in simple words.\n\n📌 IN THIS CLASS\n✅ Article 112 and the Annual Financial Statement\n✅ Historical facts and records of Finance Ministers\n✅ Railway Budget merger and Gender Budget\n✅ Economic Survey and the three government funds\n✅ Revenue Budget, Capital Budget and deficits\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Budget\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Budget #Economy",
      tags: ["union budget", "budget for ssc cgl", "budget gk", "article 112", "annual financial statement", "economic survey", "consolidated fund of india", "public account", "contingency fund", "contingency fund of india", "revenue budget", "capital budget", "fiscal deficit", "primary deficit", "revenue deficit", "effective revenue deficit", "budget deficit", "types of deficit", "frbm act 2003", "fiscal responsibility", "railway budget merger", "acworth committee", "bibek debroy committee", "gender budget", "finance minister records", "Budget for all exams"],
      hashtags: ["SSCCGL", "Budget", "Economy"],
      thumbText: "UNION BUDGET COMPLETE CHAPTER",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📊 New class is live: Union Budget, from Article 112 to the five deficits. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Meaning and Article 112\n00:00 Historical facts\n00:00 Railway Budget\n00:00 Economic Survey\n00:00 Government accounts\n00:00 Deficits and FRBM",
      playlist: "Economics — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Union Budget of India</u>: what a budget is, how it is made and presented, the funds of the government, and the types of deficits. The Budget is a favourite topic of the Staff Selection Commission, so we will learn every fact slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>11</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>38</b><span>Questions</span></div>
        <div class="cp-stat"><b>~60 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Meaning and Constitutional Basis of Budget</b><br>What a budget is, what Article 112 says, who presents it and who prepares it.</li>
        <li><b>Historical Facts</b><br>The first budget of India, the first budget of independent India, and the records of the Finance Ministers.</li>
        <li><b>Current Finance Minister, Gender Budget and Presentation Date</b><br>Who holds the record today, when the Gender Budget began, and why the date moved to 1 February.</li>
        <li><b>Evolution of Railway Budget</b><br>When the Railway Budget was separated, when it was merged back, and which committees suggested it.</li>
        <li><b>Budget Years and Data Used in Budget</b><br>How the financial year runs and which three years of data a budget shows.</li>
        <li><b>Economic Survey</b><br>What the Economic Survey is, who prepares it, and how it guides the Budget.</li>
        <li><b>Accounts of the Government of India</b><br>The three funds: Consolidated Fund of India, Public Account and Contingency Fund of India.</li>
        <li><b>Revenue Budget and Capital Budget</b><br>How receipts and expenditure are split into revenue items and capital items.</li>
        <li><b>Types of Deficits and the FRBM Act, 2003</b><br>The five deficits with their formulas, and the law that controls them.</li>
        <li><b>Practice</b><br>Exam style questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on Article 112, the record of Finance Ministers, the three government funds and the deficit formulas come again and again in General Awareness papers, so every fact and formula in this class is worth remembering.</div>
    `
  },
  2: {
    type: "concept", icon: "📜", accent: "#0ea5e9", pauseTimer: true,
    title: "Meaning and Constitutional Basis of Budget",
    html: `
      <p class="cp-lead">A budget is a statement of the expected income and expenditure of the government for a financial year. <u>In simple words, the government receives income and spends money, and the document that shows this plan is called the Budget.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/1.png" alt="Two-column picture: left column INCOME (taxes, fees, profits) with an arrow going in, righ" data-caption="A budget is the plan of income and spending." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/2.png" alt="Parliament House New Delhi photo" data-caption="The Parliament House, where the Budget is presented every year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Article of the Constitution</td><td>Article 112</td></tr><tr><td>Name used in Article 112</td><td>Annual Financial Statement, not the word Budget</td></tr><tr><td>Laid in the name of</td><td>The President of India</td></tr><tr><td>Presented by</td><td>The Finance Minister</td></tr><tr><td>Prepared by</td><td>The Department of Economic Affairs under the Ministry of Finance</td></tr></tbody></table>
      <p class="cp-lead">Article 112 says that the Government of India will place an Annual Financial Statement before Parliament every year. The President causes this statement to be laid before both Houses of Parliament.</p>
      <div class="cp-note trap">The word Budget is not used anywhere in the Constitution. The Constitution uses the words Annual Financial Statement.</div>
      <div class="cp-note remember">Laid in the name of the President, presented by the Finance Minister, prepared by the Department of Economic Affairs.</div>
    `
  },
  3: {
    questext: "Under which Article of the Constitution is the Annual Financial Statement laid before Parliament?",
    options: ["Article 112", "Article 110", "Article 266", "Article 280"],
    correct: "1",
    exptext: "✅ Article 112 requires the Annual Financial Statement to be laid before Parliament every year. 📌 Think of 112 as the Budget Article. ❌ Article 266 is wrong because it deals with the Consolidated Fund and the Public Account."
  },
  4: {
    questext: "Which term is used for the Budget in the Constitution of India?",
    options: ["Annual Financial Statement", "Finance Bill", "Appropriation Account", "Annual Revenue Plan"],
    correct: "1",
    exptext: "✅ The Constitution uses the words Annual Financial Statement, and it never uses the word Budget. 📌 Budget is the popular name only. ❌ Finance Bill is wrong because that is the Bill that gives legal effect to tax proposals."
  },
  5: {
    questext: "The Budget is prepared by which of the following?",
    options: ["Department of Revenue", "Department of Expenditure", "Department of Financial Services", "Department of Economic Affairs"],
    correct: "4",
    exptext: "✅ The Department of Economic Affairs under the Ministry of Finance prepares the Budget. 📌 Economic Affairs plans the economy and the Budget. ❌ The Department of Revenue is wrong because it looks after tax collection."
  },
  6: {
    questext: "Consider the following statements about the Budget:\n1. The Budget is laid before Parliament in the name of the President.\n2. The Budget is presented by the Prime Minister.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because the statement is laid in the name of the President. 📌 The President lays it and the Finance Minister presents it. ❌ Statement 2 is wrong because the Finance Minister presents the Budget."
  },
  7: {
    type: "concept", icon: "🕰️", accent: "#22c55e", pauseTimer: true,
    title: "Historical Facts",
    html: `
      <p class="cp-lead">The history of the Budget has many firsts and records that the examination likes to ask. <u>Learn each fact with its name, its date and its number.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/3.png" alt="Timeline with two markers: 7 April 1860 James Wilson, first Budget of India; 26 November 1" data-caption="The first two landmark Budgets on one timeline." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/4.png" alt="Morarji Desai finance minister budget portrait photo" data-caption="Morarji Desai, who presented the most Budgets in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>First Budget in India</td><td>Proposed by James Wilson on 7 April 1860, during the period of Viceroy Lord Canning</td></tr><tr><td>First Budget of independent India</td><td>Proposed by the first Finance Minister, R. K. Shanmukham Chetty, on 26 November 1947</td></tr><tr><td>Most Budgets presented</td><td>Morarji Desai, with 10 Budgets</td></tr><tr><td>P. Chidambaram</td><td>Presented the Budget 9 times</td></tr><tr><td>Pranab Mukherjee</td><td>Presented the Budget 8 times</td></tr></tbody></table>
      <p class="cp-lead">Notice the order of the records: Morarji Desai has 10, P. Chidambaram has 9 and Pranab Mukherjee has 8. Each name goes one step down.</p>
      <div class="cp-note trap">Do not mix the first Budget of India with the first Budget of independent India. The first was in 1860 under British rule, and the second was in 1947 after independence.</div>
      <div class="cp-note remember">Remember 10, 9, 8 for Desai, Chidambaram and Mukherjee.</div>
    `
  },
  8: {
    questext: "Who proposed the first Budget in India on 7 April 1860?",
    options: ["James Wilson", "R. K. Shanmukham Chetty", "Lord Canning", "Morarji Desai"],
    correct: "1",
    exptext: "✅ James Wilson proposed the first Budget on 7 April 1860. 📌 Wilson is the first name in the list. ❌ Lord Canning is tempting, but he was the Viceroy at that time and not the person who proposed the Budget."
  },
  9: {
    questext: "Who presented the first Budget of independent India on 26 November 1947?",
    options: ["John Mathai", "Morarji Desai", "James Wilson", "R. K. Shanmukham Chetty"],
    correct: "4",
    exptext: "✅ R. K. Shanmukham Chetty, the first Finance Minister of independent India, presented the first Budget. 📌 November 1947 belongs to Chetty. ❌ Morarji Desai is wrong because he is known for the record number of Budgets."
  },
  10: {
    questext: "Who holds the record for presenting the highest number of Budgets in India?",
    options: ["Morarji Desai", "P. Chidambaram", "Pranab Mukherjee", "Nirmala Sitharaman"],
    correct: "1",
    exptext: "✅ Morarji Desai presented 10 Budgets, which is the highest. 📌 Remember 10, 9, 8. ❌ P. Chidambaram is wrong because he presented 9 Budgets."
  },
  11: {
    questext: "Consider the following statements about the Budgets of India:\n1. The first Budget in India was proposed in 1860.\n2. Pranab Mukherjee presented the Budget 9 times.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Both 1 and 2", "Only 1", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Only statement 1 is correct, as the first Budget was proposed in 1860. 📌 Pranab Mukherjee is the 8 in the list. ❌ Statement 2 is wrong because he presented the Budget 8 times, and 9 is the number of P. Chidambaram."
  },
  12: {
    type: "concept", icon: "👩‍💼", accent: "#f59e0b", pauseTimer: true,
    title: "Current Finance Minister, Gender Budget and Presentation Date",
    html: `
      <p class="cp-lead">Three more Budget facts are important: the present Finance Minister, the Gender Budget, and the date of presentation. <u>Each one has a year or a number that you must remember.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/5.png" alt="Three cards in a row: card one Nirmala Sitharaman 9 Budgets, card two Gender Budget 2005-0" data-caption="The three facts of this page on three cards." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/6.png" alt="Nirmala Sitharaman Finance Minister Budget Parliament photo" data-caption="The Finance Minister on Budget day outside Parliament." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Topic</th><th>Fact</th></tr></thead><tbody><tr><td>Current Finance Minister</td><td>Nirmala Sitharaman, who has presented 9 Budgets consecutively and equalled the record of P. Chidambaram</td></tr><tr><td>First full-time female Finance Minister</td><td>Nirmala Sitharaman</td></tr><tr><td>Finance portfolio held temporarily</td><td>Indira Gandhi, as Prime Minister</td></tr><tr><td>Gender Budget</td><td>Introduced in 2005-06 for separate allocation of funds for women and female welfare</td></tr><tr><td>Presentation date</td><td>Shifted from the end of February to 1 February from 2017</td></tr></tbody></table>
      <p class="cp-lead">The date was moved to 1 February so that Parliament can pass the Budget before the new financial year begins on 1 April. In this way the funds are available from the very first day of the year.</p>
      <div class="cp-note trap">Indira Gandhi held the finance portfolio only for a short time while she was the Prime Minister. She is not called a full-time Finance Minister.</div>
    `
  },
  13: {
    questext: "Who is the first full-time female Finance Minister of India?",
    options: ["Nirmala Sitharaman", "Indira Gandhi", "Sushma Swaraj", "Smriti Irani"],
    correct: "1",
    exptext: "✅ Nirmala Sitharaman is the first full-time female Finance Minister. 📌 Indira Gandhi held the post only temporarily. ❌ Indira Gandhi is wrong because she held the finance portfolio for a short time as Prime Minister."
  },
  14: {
    questext: "In which year was the Gender Budget introduced in India?",
    options: ["2005-06", "2001-02", "2010-11", "2017-18"],
    correct: "1",
    exptext: "✅ The Gender Budget was introduced in 2005-06. 📌 Think of 2005 as the start of the Gender Budget. ❌ 2017-18 is wrong because that is the year when the Railway Budget was merged and the date was set to 1 February."
  },
  15: {
    questext: "From which year was the Budget presentation date shifted to 1 February?",
    options: ["2014", "2015", "2016", "2017"],
    correct: "4",
    exptext: "✅ The date was shifted from the end of February to 1 February from 2017. 📌 The change came together with the merger of the two Budgets. ❌ 2016 is wrong because that was the year of the decision to merge the Railway Budget."
  },
  16: {
    questext: "What is the main reason for shifting the Budget date to 1 February?",
    options: ["To end the financial year earlier", "To present the Budget on a holiday", "To ensure that funds are available from the start of the financial year on 1 April", "To give more time for the Economic Survey"],
    correct: "3",
    exptext: "✅ An earlier date lets Parliament pass the Budget before 1 April, so funds are available from the start of the year. 📌 Early Budget means early funds. ❌ The first option is wrong because the financial year still ends on 31 March."
  },
  17: {
    type: "concept", icon: "🚆", accent: "#ef4444", pauseTimer: true,
    title: "Evolution of Railway Budget",
    html: `
      <p class="cp-lead">For many years India had two Budgets, the General Budget and a separate Railway Budget. <u>The two were separated in 1921 and merged again in 2016.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/7.png" alt="Timeline with three markers: 1921 Railway Budget separated (Acworth Committee), 2016 merge" data-caption="Separation, merger and first merged Budget on a timeline." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/8.png" alt="Indian Railways train passing station photo" data-caption="Indian Railways, whose Budget was merged with the General Budget." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Stage</th><th>Year</th><th>Detail</th></tr></thead><tbody><tr><td>Separation</td><td>1921</td><td>The Railway Budget was separated from the General Budget on the recommendation of the Acworth Committee</td></tr><tr><td>Merger</td><td>2016</td><td>The Railway Budget was merged back with the General Budget on the recommendation of the Bibek Debroy Committee</td></tr><tr><td>Implementation</td><td>2017-18</td><td>The first merged Budget was presented for the financial year 2017-18</td></tr></tbody></table>
      <p class="cp-lead">Railways was a very large part of the government spending in 1921, so a separate Budget was kept for it. Later the railways became a smaller part of the whole spending, so the two Budgets were joined for simplicity.</p>
      <div class="cp-note trap">The merger was decided in 2016, but the first merged Budget was presented for the financial year 2017-18.</div>
      <div class="cp-note remember">Acworth separated it in 1921, and Debroy merged it in 2016.</div>
    `
  },
  18: {
    questext: "In which year was the Railway Budget separated from the General Budget?",
    options: ["1921", "1947", "1950", "2016"],
    correct: "1",
    exptext: "✅ The Railway Budget was separated in 1921. 📌 Separated first, merged later. ❌ 2016 is wrong because that is the year of the merger."
  },
  19: {
    questext: "The merger of the Railway Budget with the General Budget was based on the recommendation of which committee?",
    options: ["Acworth Committee", "Rangarajan Committee", "Kelkar Committee", "Bibek Debroy Committee"],
    correct: "4",
    exptext: "✅ The Bibek Debroy Committee recommended the merger. 📌 Debroy means merged. ❌ The Acworth Committee is tempting, but it recommended the separation in 1921."
  },
  20: {
    questext: "For which financial year was the first merged Budget presented?",
    options: ["2015-16", "2016-17", "2018-19", "2017-18"],
    correct: "4",
    exptext: "✅ The first merged Budget was presented for the financial year 2017-18. 📌 The date change and the merger came together. ❌ 2016-17 is wrong because that year still had a separate Railway Budget."
  },
  21: {
    type: "concept", icon: "📅", accent: "#8b5cf6", pauseTimer: true,
    title: "Budget Years and Data Used in Budget",
    html: `
      <p class="cp-lead">A financial year in India runs from 1 April to 31 March. <u>Each Budget shows the data of three years: the previous year, the current year and the coming year.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/9.png" alt="Calendar bar from 1 April 2024 to 31 March 2025 labelled Financial Year 2024-25, with the " data-caption="A financial year runs from April to March." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/10.png" alt="Three boxes in a row labelled Previous year: Actual Data, Current year: Estimated Data, Co" data-caption="The three years of data shown in every Budget." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Budget year</th><th>Previous year</th><th>Current year</th><th>Coming year</th></tr></thead><tbody><tr><td>Budget for 2024-25</td><td>2022-23, actual data</td><td>2023-24, estimated data</td><td>2024-25, estimated data</td></tr><tr><td>Budget for 2026-27</td><td>2024-25, actual data</td><td>2025-26, estimated data</td><td>2026-27, estimated data</td></tr></tbody></table>
      <p class="cp-lead">The data of the previous year is real, because the year is over and the accounts are closed. The data of the current year and the coming year is only an estimate, because the money is still being earned and spent.</p>
      <div class="cp-note tip">For the financial year 2024-25, the period is 1 April 2024 to 31 March 2025, and the Budget for it was proposed on 1 February 2024.</div>
      <div class="cp-note trap">A financial year starts in April of one year and ends in March of the next year, so it does not match the calendar year.</div>
    `
  },
  22: {
    questext: "For the financial year 2024-25, what is the period?",
    options: ["1 January 2024 to 31 December 2024", "1 July 2024 to 30 June 2025", "1 April 2025 to 31 March 2026", "1 April 2024 to 31 March 2025"],
    correct: "4",
    exptext: "✅ The financial year 2024-25 runs from 1 April 2024 to 31 March 2025. 📌 April to March is the Indian financial year. ❌ The calendar year is wrong because the financial year does not start in January."
  },
  23: {
    questext: "In the Budget for the financial year 2024-25, which type of data is shown for the year 2022-23?",
    options: ["Estimated data", "Real or actual data", "Predicted data", "Interim data"],
    correct: "2",
    exptext: "✅ The year 2022-23 is the previous year, so its data is real or actual. 📌 Past is actual and future is estimated. ❌ Estimated data is wrong because that belongs to the current and coming years."
  },
  24: {
    questext: "How many years of income and expenditure data does a Budget generally present?",
    options: ["One year", "Two years", "Five years", "Three years"],
    correct: "4",
    exptext: "✅ A Budget generally presents data for three years: the previous year, the current year and the coming year. 📌 Past, present and future. ❌ Two years is wrong because the current year is shown along with the previous and coming years."
  },
  25: {
    type: "concept", icon: "🔍", accent: "#14b8a6", pauseTimer: true,
    title: "Economic Survey",
    html: `
      <p class="cp-lead">The Economic Survey is the yearly report on the state of the economy. <u>It is released by the Ministry of Finance just before the Budget.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/11.png" alt="Tree diagram: top box Current Economic Situation, two branches Sectors which are underperf" data-caption="How the Economic Survey looks at weak and strong sectors." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/12.png" alt="Chief Economic Adviser Economic Survey release Parliament photo" data-caption="The Economic Survey is released before the Budget every year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Released by</td><td>Ministry of Finance, shortly before the Budget</td></tr><tr><td>Prepared by</td><td>The Chief Economic Adviser of the Government of India</td></tr><tr><td>Chief Economic Adviser for the Survey 2023-24</td><td>V. Anantha Nageswaran</td></tr><tr><td>What it shows</td><td>The current economic situation of the country</td></tr><tr><td>What it identifies</td><td>Sectors that are underperforming, the reasons for poor performance, and solutions for improvement</td></tr><tr><td>What it highlights</td><td>Sectors that are performing well</td></tr></tbody></table>
      <p class="cp-lead">The Economic Survey is like a report card of the economy. The Budget then uses its suggestions, so the funds given in the Budget mainly depend on the recommendations of the Economic Survey.</p>
      <div class="cp-note trap">The Economic Survey is not the Budget. It does not allot money. It only describes the economy and suggests what to do.</div>
      <div class="cp-note exam">Remember that the Chief Economic Adviser prepares the Survey, and the Finance Minister presents the Budget.</div>
    `
  },
  26: {
    questext: "The Economic Survey is prepared under the guidance of which authority?",
    options: ["Governor of the Reserve Bank of India", "Chief Economic Adviser to the Government of India", "Comptroller and Auditor General", "Chairperson of the Finance Commission"],
    correct: "2",
    exptext: "✅ The Chief Economic Adviser to the Government of India prepares the Economic Survey. 📌 Economic Survey and Economic Adviser go together. ❌ The Reserve Bank governor is wrong because the Survey is a Ministry of Finance document."
  },
  27: {
    questext: "Which of the following is NOT a feature of the Economic Survey?",
    options: ["It shows the current economic situation", "It identifies underperforming sectors", "It allots funds to ministries", "It highlights well performing sectors"],
    correct: "3",
    exptext: "✅ The Economic Survey does not allot funds. Funds are allotted through the Budget. 📌 Survey describes, Budget allots. ❌ The other three options are wrong because they are real features of the Survey."
  },
  28: {
    questext: "Who was the Chief Economic Adviser when the Economic Survey 2023-24 was prepared?",
    options: ["Raghuram Rajan", "Arvind Subramanian", "Kaushik Basu", "V. Anantha Nageswaran"],
    correct: "4",
    exptext: "✅ V. Anantha Nageswaran was the Chief Economic Adviser who prepared the Survey 2023-24. 📌 Nageswaran is the name linked with this Survey. ❌ Raghuram Rajan, Arvind Subramanian and Kaushik Basu were earlier advisers or economists, but not for this Survey."
  },
  29: {
    type: "concept", icon: "🏦", accent: "#ec4899", pauseTimer: true,
    title: "Accounts of the Government of India",
    html: `
      <p class="cp-lead">The money of the Government of India is kept in three accounts. <u>They are the Consolidated Fund of India, the Public Account and the Contingency Fund of India.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/13.png" alt="Three tall boxes side by side: Consolidated Fund of India (Article 266 clause 1, Parliamen" data-caption="The three accounts of the government with their Articles." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/14.png" alt="Simple picture of three money containers: a large treasure chest labelled main fund, a pig" data-caption="Memory picture: main chest, held money, emergency box." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/15.png" alt="Reserve Bank of India Mumbai headquarters photo" data-caption="The Reserve Bank of India building, banker to the government." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Account</th><th>Article</th><th>Authority</th><th>Details</th></tr></thead><tbody><tr><td>Consolidated Fund of India</td><td>Article 266(1)</td><td>Parliament</td><td>To withdraw money, Parliament must pass an Appropriation Bill</td></tr><tr><td>Public Account</td><td>Article 266(2)</td><td>Ministry of Finance</td><td>Money the government holds on behalf of others, such as provident funds and post office deposits</td></tr><tr><td>Contingency Fund of India</td><td>Article 267</td><td>President of India</td><td>An emergency fund of 30,000 crore rupees kept for emergency situations</td></tr></tbody></table>
      <p class="cp-lead">The Consolidated Fund is the main account where all the income of the government is collected and from which spending is done. The Public Account is like a bank deposit, because the government only holds the money for others. The Contingency Fund is a small emergency reserve.</p>
      <div class="cp-note trap">Money in the Public Account is not the income of the government. It belongs to the people who have deposited it, so the government must return it.</div>
      <div class="cp-note remember">Consolidated 266(1), Public 266(2), Contingency 267.</div>
    `
  },
  30: {
    questext: "Under which Article is the Contingency Fund of India established?",
    options: ["Article 266(1)", "Article 266(2)", "Article 112", "Article 267"],
    correct: "4",
    exptext: "✅ The Contingency Fund of India is established under Article 267. 📌 Consolidated and Public are 266, and Contingency is 267. ❌ Article 266(1) is wrong because it is the Consolidated Fund."
  },
  31: {
    questext: "Which of the following is kept in the Public Account of India?",
    options: ["Income Tax collected", "Provident fund deposits", "Corporate Tax collected", "Customs Duty collected"],
    correct: "2",
    exptext: "✅ Provident fund deposits are kept in the Public Account, because the government holds them for others. 📌 Public Account is the government's banker account. ❌ The tax collections are wrong because they go to the Consolidated Fund of India."
  },
  32: {
    questext: "What is the size of the Contingency Fund of India?",
    options: ["5,000 crore rupees", "10,000 crore rupees", "50,000 crore rupees", "30,000 crore rupees"],
    correct: "4",
    exptext: "✅ The Contingency Fund of India is an emergency fund of 30,000 crore rupees. 📌 Remember 30,000. ❌ The other amounts are wrong because they are not the size of this fund."
  },
  33: {
    questext: "Consider the following statements about the accounts of the Government of India:\n1. The Consolidated Fund of India is under Article 266(1).\n2. The Contingency Fund of India is operated by the Parliament.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Contingency Fund belongs to the President for sudden needs. ❌ Statement 2 is wrong because the authority over the Contingency Fund is the President of India, and not the Parliament."
  },
  34: {
    type: "concept", icon: "📊", accent: "#f97316", pauseTimer: true,
    title: "Revenue Budget",
    html: `
      <p class="cp-lead">The Revenue Budget deals with revenue receipts and revenue expenditure. <u>Revenue items generally do not create any direct liability or any asset of a capital nature.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/16.png" alt="Tree diagram: top box Revenue Budget, two branches Revenue Receipts (Tax revenue: direct a" data-caption="The two sides of the Revenue Budget." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/17.png" alt="Simple balance picture: left pan Revenue Receipts, right pan Revenue Expenditure, with the" data-caption="Revenue Budget compares receipts and spending of a regular nature." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Revenue Receipts</th><th>Revenue Expenditure</th></tr></thead><tbody><tr><td>Tax revenue: direct taxes and indirect taxes</td><td>Subsidies</td></tr><tr><td>Non-tax revenue: interest receipts</td><td>Expenditure on welfare schemes</td></tr><tr><td>Non-tax revenue: profit of public sector undertakings</td><td>Scholarships, widow pensions, old age pensions and allowances</td></tr><tr><td>Non-tax revenue: fees, fines and punishment</td><td>Interest payment</td></tr><tr><td>Non-tax revenue: grant or aid received from foreign countries</td><td>Grant or aid to foreign countries</td></tr><tr><td>Non-tax revenue: other receipts</td><td>Grants to State Governments and salaries, allowances and expenses of government employees, ministers, offices and the police</td></tr></tbody></table>
      <p class="cp-lead">Revenue receipts are the regular earnings of the government, such as taxes. Revenue expenditure is the regular spending, such as salaries, subsidies and interest. This spending does not build any lasting asset.</p>
      <div class="cp-note trap">Interest payment is a revenue expenditure, and interest received is a revenue receipt. Loans themselves belong to the Capital Budget.</div>
      <div class="cp-note tip">Think of the household: the monthly salary is a revenue receipt, and the monthly grocery bill is a revenue expenditure.</div>
    `
  },
  35: {
    questext: "Which of the following is a revenue receipt of the government?",
    options: ["Recovery of loans", "Disinvestment proceeds", "Tax revenue", "Borrowings"],
    correct: "3",
    exptext: "✅ Tax revenue is a revenue receipt. 📌 Regular earnings are revenue receipts. ❌ Recovery of loans, disinvestment and borrowings are wrong because they are capital receipts."
  },
  36: {
    questext: "Which of the following is a revenue expenditure?",
    options: ["Building a new airport", "Payment of subsidies", "Repayment of a loan", "Building a railway line"],
    correct: "2",
    exptext: "✅ Subsidies are a regular spending that creates no asset, so they are revenue expenditure. 📌 Revenue spending creates no lasting asset. ❌ Airports and railway lines are wrong because they are capital expenditure."
  },
  37: {
    questext: "Which of the following is a non-tax revenue of the government?",
    options: ["Direct taxes", "Indirect taxes", "Profit of public sector undertakings", "Disinvestment proceeds"],
    correct: "3",
    exptext: "✅ The profit of public sector undertakings is a non-tax revenue. 📌 Non-tax means not from taxes, but still regular. ❌ Direct and indirect taxes are wrong because they are tax revenue."
  },
  38: {
    type: "concept", icon: "🏗️", accent: "#84cc16", pauseTimer: true,
    title: "Capital Budget",
    html: `
      <p class="cp-lead">The Capital Budget deals with capital receipts and capital expenditure. <u>Capital items usually create a liability or an asset, or change the asset and liability position of the government.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/18.png" alt="Tree diagram: top box Capital Budget, two branches Capital Receipts (disinvestment, loan r" data-caption="The two sides of the Capital Budget." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/19.png" alt="Air India aircraft airport disinvestment photo" data-caption="Air India, an example of disinvestment by the government." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Capital Receipts</th><th>Capital Expenditure</th></tr></thead><tbody><tr><td>Disinvestment, for example Air India</td><td>Investment or expenditure in infrastructure development, such as roads, railways, ports and airports</td></tr><tr><td>Loan receipts, that is, money borrowed</td><td>Loans given to others</td></tr><tr><td>Loan recovery</td><td>Loan payment, that is, repayment of loans</td></tr></tbody></table>
      <p class="cp-lead">Disinvestment means that the government sells a part of its share in a company. Money received from it is a capital receipt, because the government gives up a part of its asset.</p>
      <div class="cp-note trap">A loan taken creates a liability, so it is a capital receipt. A loan repaid reduces the liability, so it is a capital expenditure.</div>
      <div class="cp-note remember">Revenue means no asset or liability. Capital means asset or liability.</div>
    `
  },
  39: {
    questext: "Which of the following is a capital receipt?",
    options: ["Tax revenue", "Disinvestment proceeds", "Profit of public sector undertakings", "Interest received"],
    correct: "2",
    exptext: "✅ Disinvestment proceeds are a capital receipt, because the government sells a part of its asset. 📌 Sale of an asset is capital. ❌ The other options are wrong because they are regular earnings, so they are revenue receipts."
  },
  40: {
    questext: "Which of the following is a capital expenditure?",
    options: ["Payment of salaries", "Payment of subsidies", "Spending on building roads and ports", "Payment of interest"],
    correct: "3",
    exptext: "✅ Spending on roads and ports creates assets, so it is a capital expenditure. 📌 Capital expenditure builds something lasting. ❌ Salaries, subsidies and interest are wrong because they are revenue expenditure."
  },
  41: {
    questext: "Consider the following statements about the Capital Budget:\n1. Capital items usually create a liability or an asset.\n2. Interest payment is a part of the Capital Budget.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Only 1", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 1 is correct. 📌 Interest is a regular cost, so it is revenue. ❌ Statement 2 is wrong because interest payment is a part of the Revenue Budget."
  },
  42: {
    type: "concept", icon: "➖", accent: "#06b6d4", pauseTimer: true,
    title: "Types of Deficits of Government of India",
    html: `
      <p class="cp-lead">A deficit means that the government spends more than it earns. <u>India measures this gap in five ways, and each one has its own formula.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/20.png" alt="Five stacked formula boxes: Budget Deficit, Fiscal Deficit, Primary Deficit, Revenue Defic" data-caption="The five deficits and their formulas in one picture." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/21.png" alt="Step ladder: Revenue Deficit at the bottom, then Fiscal Deficit, then Primary Deficit by r" data-caption="How the deficits are related to each other." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Deficit</th><th>Formula</th></tr></thead><tbody><tr><td>Budget Deficit</td><td>Total Expenditure minus Total Income or Receipts</td></tr><tr><td>Fiscal Deficit</td><td>Total Expenditure minus Total Receipts, except net borrowings of the Government of India</td></tr><tr><td>Primary Deficit</td><td>Fiscal Deficit minus Net Interest Payment</td></tr><tr><td>Revenue Deficit</td><td>Revenue Expenditure minus Revenue Receipts</td></tr><tr><td>Effective Revenue Deficit</td><td>Revenue Deficit minus grants for the creation of capital assets</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Fiscal Deficit</small>Fiscal Deficit = Total Expenditure − Total Receipts (except borrowings)</div>
      <div class="cp-formula" translate="no"><small>Primary Deficit</small>Primary Deficit = Fiscal Deficit − Net Interest Payment</div>
      <p class="cp-lead">The Fiscal Deficit shows how much the government must borrow in that year. The Primary Deficit removes the interest paid on old loans, so it shows the borrowing needed only for the new spending of the year.</p>
      <div class="cp-note trap">Revenue Deficit uses only revenue items, while Fiscal Deficit uses total expenditure. Do not swap them.</div>
      <div class="cp-note exam">Fiscal Deficit and Primary Deficit are the two most asked formulas.</div>
    `
  },
  43: {
    questext: "Which of the following correctly gives the Primary Deficit?",
    options: ["Fiscal Deficit minus Net Interest Payment", "Fiscal Deficit plus Net Interest Payment", "Revenue Deficit minus Net Interest Payment", "Total Expenditure minus Total Receipts"],
    correct: "1",
    exptext: "✅ Primary Deficit is Fiscal Deficit minus Net Interest Payment. 📌 Primary means without interest. ❌ Revenue Deficit minus interest is wrong because the starting point is the Fiscal Deficit."
  },
  44: {
    questext: "Revenue Deficit is equal to which of the following?",
    options: ["Total Expenditure minus Total Receipts", "Fiscal Deficit minus Net Interest Payment", "Revenue Expenditure minus Revenue Receipts", "Capital Expenditure minus Capital Receipts"],
    correct: "3",
    exptext: "✅ Revenue Deficit is Revenue Expenditure minus Revenue Receipts. 📌 Revenue with revenue. ❌ Total Expenditure minus Total Receipts is wrong because that uses all items and is close to the Fiscal Deficit."
  },
  45: {
    questext: "Fiscal Deficit is calculated as Total Expenditure minus which of the following?",
    options: ["Revenue Receipts", "Total Receipts except net borrowings", "Capital Receipts only", "Net Interest Payment"],
    correct: "2",
    exptext: "✅ Fiscal Deficit is Total Expenditure minus Total Receipts, leaving out net borrowings. 📌 The gap shows the borrowing needed. ❌ Revenue Receipts alone is wrong because it ignores capital receipts."
  },
  46: {
    questext: "Effective Revenue Deficit is equal to which of the following?",
    options: ["Fiscal Deficit minus Net Interest Payment", "Revenue Deficit minus grants for the creation of capital assets", "Revenue Deficit plus grants for the creation of capital assets", "Total Expenditure minus Total Receipts"],
    correct: "2",
    exptext: "✅ Effective Revenue Deficit is Revenue Deficit minus grants for the creation of capital assets. 📌 Effective means after removing grants that build assets. ❌ Adding the grants is wrong because the grants are taken out."
  },
  47: {
    questext: "Consider the following statements about deficits:\n1. Primary Deficit is calculated by removing the net interest payment from the Fiscal Deficit.\n2. Revenue Deficit is calculated using total expenditure and total receipts.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Both 1 and 2", "Only 1", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Only statement 1 is correct. 📌 Revenue Deficit uses only revenue items. ❌ Statement 2 is wrong because Revenue Deficit is Revenue Expenditure minus Revenue Receipts."
  },
  48: {
    type: "concept", icon: "⚖️", accent: "#a855f7", pauseTimer: true,
    title: "FRBM Act, 2003",
    html: `
      <p class="cp-lead">FRBM stands for Fiscal Responsibility and Budget Management. <u>The FRBM Act, 2003 aims to promote fiscal discipline and to control the deficit of the Government.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/22.png" alt="Central box FRBM Act 2003 with two arrows pointing to Fiscal discipline and Control of def" data-caption="The two aims of the FRBM Act, 2003." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Budget/23.png" alt="Ministry of Finance North Block Delhi photo" data-caption="The Ministry of Finance, which works to keep the deficit in control." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Full name</td><td>Fiscal Responsibility and Budget Management Act</td></tr><tr><td>Year</td><td>2003</td></tr><tr><td>First aim</td><td>To promote fiscal discipline</td></tr><tr><td>Second aim</td><td>To control the deficit of the Government</td></tr></tbody></table>
      <p class="cp-lead">Fiscal discipline means that the government should not spend much more than it earns. The Act puts a limit on the deficit so that the government does not keep borrowing without control.</p>
      <div class="cp-note trap">FRBM is a law about the deficit, not about tax rates. It does not decide how much tax is charged.</div>
      <div class="cp-note remember">FRBM Act 2003 means control the deficit and keep fiscal discipline.</div>
    `
  },
  49: {
    questext: "What does FRBM stand for in the FRBM Act, 2003?",
    options: ["Fiscal Revenue and Budget Management", "Fiscal Responsibility and Budget Management", "Financial Rules and Budget Monitoring", "Fiscal Regulation and Bank Management"],
    correct: "2",
    exptext: "✅ FRBM stands for Fiscal Responsibility and Budget Management. 📌 Responsibility is the key word. ❌ The other expansions are wrong because they use names that are not in the Act."
  },
  50: {
    questext: "What is the main aim of the FRBM Act, 2003?",
    options: ["To fix the rates of taxes", "To promote fiscal discipline and control the deficit", "To increase the salaries of employees", "To regulate the banking sector"],
    correct: "2",
    exptext: "✅ The Act aims to promote fiscal discipline and control the deficit of the Government. 📌 FRBM means control the deficit. ❌ Fixing tax rates is wrong because that is done through the Finance Bill and the Goods and Services Tax Council."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Budget/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined rupee sign, a few real-looking gold coins and a subtle rising chart line" },
  "images/General_Awareness/Economics/Budget/1.png": { t: "fig", about: "Two-column picture: left column INCOME (taxes, fees, profits) with an arrow going in, right column EXPENDITURE (salaries, roads, schools) with an arrow going out, with the title BUDGET above them." },
  "images/General_Awareness/Economics/Budget/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Parliament House New Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Budget/2.png. the Parliament House building in New Delhi",
  "images/General_Awareness/Economics/Budget/3.png": { t: "fig", about: "Timeline with two markers: 7 April 1860 James Wilson, first Budget of India; 26 November 1947 R. K. Shanmukham Chetty, first Budget of independent India." },
  "images/General_Awareness/Economics/Budget/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Morarji Desai finance minister budget portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Budget/4.png. a portrait of Morarji Desai",
  "images/General_Awareness/Economics/Budget/5.png": { t: "fig", about: "Three cards in a row: card one Nirmala Sitharaman 9 Budgets, card two Gender Budget 2005-06, card three Budget date 1 February from 2017." },
  "images/General_Awareness/Economics/Budget/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nirmala Sitharaman Finance Minister Budget Parliament photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Budget/6.png. the Finance Minister at Parliament on Budget day",
  "images/General_Awareness/Economics/Budget/7.png": { t: "fig", about: "Timeline with three markers: 1921 Railway Budget separated (Acworth Committee), 2016 merged back (Bibek Debroy Committee), 2017-18 first merged Budget." },
  "images/General_Awareness/Economics/Budget/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian Railways train passing station photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Budget/8.png. an Indian Railways passenger train passing a station",
  "images/General_Awareness/Economics/Budget/9.png": { t: "fig", about: "Calendar bar from 1 April 2024 to 31 March 2025 labelled Financial Year 2024-25, with the Budget presented on 1 February 2024 marked before the start." },
  "images/General_Awareness/Economics/Budget/10.png": { t: "fig", about: "Three boxes in a row labelled Previous year: Actual Data, Current year: Estimated Data, Coming year: Estimated Data." },
  "images/General_Awareness/Economics/Budget/11.png": { t: "fig", about: "Tree diagram: top box Current Economic Situation, two branches Sectors which are underperforming and Sectors which are performing well; under underperforming two small boxes Reasons and Solutions." },
  "images/General_Awareness/Economics/Budget/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chief Economic Adviser Economic Survey release Parliament photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Budget/12.png. the Economic Survey being released with the Chief Economic Adviser",
  "images/General_Awareness/Economics/Budget/13.png": { t: "fig", about: "Three tall boxes side by side: Consolidated Fund of India (Article 266 clause 1, Parliament), Public Account (Article 266 clause 2, Ministry of Finance), Contingency Fund (Article 267, President of India, 30,000 crore rupees)." },
  "images/General_Awareness/Economics/Budget/14.png": { t: "fig", about: "Simple picture of three money containers: a large treasure chest labelled main fund, a piggy bank labelled held for others, a small red emergency box labelled emergency." },
  "images/General_Awareness/Economics/Budget/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Reserve Bank of India Mumbai headquarters photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Budget/15.png. the Reserve Bank of India building where government accounts are maintained",
  "images/General_Awareness/Economics/Budget/16.png": { t: "fig", about: "Tree diagram: top box Revenue Budget, two branches Revenue Receipts (Tax revenue: direct and indirect taxes; Non-tax revenue) and Revenue Expenditure (subsidies, salaries, pensions, interest payment)." },
  "images/General_Awareness/Economics/Budget/17.png": { t: "fig", about: "Simple balance picture: left pan Revenue Receipts, right pan Revenue Expenditure, with the note Interest is part of revenue." },
  "images/General_Awareness/Economics/Budget/18.png": { t: "fig", about: "Tree diagram: top box Capital Budget, two branches Capital Receipts (disinvestment, loan receipts, loan recovery) and Capital Expenditure (infrastructure investment, loans given, loan repayment)." },
  "images/General_Awareness/Economics/Budget/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Air India aircraft airport disinvestment photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Budget/19.png. an Air India passenger aircraft at an airport",
  "images/General_Awareness/Economics/Budget/20.png": { t: "fig", about: "Five stacked formula boxes: Budget Deficit, Fiscal Deficit, Primary Deficit, Revenue Deficit, Effective Revenue Deficit, each with its formula in short labels." },
  "images/General_Awareness/Economics/Budget/21.png": { t: "fig", about: "Step ladder: Revenue Deficit at the bottom, then Fiscal Deficit, then Primary Deficit by removing interest, with labels showing what is added or removed at each step." },
  "images/General_Awareness/Economics/Budget/22.png": { t: "fig", about: "Central box FRBM Act 2003 with two arrows pointing to Fiscal discipline and Control of deficit, and a downward arrow beside the word Deficit." },
  "images/General_Awareness/Economics/Budget/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ministry of Finance North Block Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Budget/23.png. the North Block building in Delhi that houses the Ministry of Finance"
});

/* CHANGE LOG
   - Public Account: the earlier line that it relates to long-term borrowings was corrected; it holds money that the government keeps as a banker, such as provident funds and small savings. LIC was removed from the examples.
   - Consolidated Fund: money is withdrawn only after Parliament passes an Appropriation Bill, which was corrected from the earlier mention of the Finance Bill.
   - Effective Revenue Deficit: it is Revenue Deficit minus grants for the creation of capital assets, which replaces the earlier wording of grants to the State.
   - Economic Survey: it is tabled shortly before the Budget, so the fixed date of 31 January was replaced; the Survey 2025-26 was tabled on 29 January 2026.
   - Second Budget and Railway Minister: the claim that John Mathai presented the second Budget and was the first Railway Minister was removed because it could not be verified.
   - Current Finance Minister: Nirmala Sitharaman presented her ninth consecutive Budget on 1 February 2026, equalling the nine Budgets of P. Chidambaram, whose nine were not consecutive.
   - Budget 2024-25: the Budget presented on 1 February 2024 was an interim Budget; the full Budget was presented later in July 2024.
   - Budget Deficit: it is no longer reported separately because the Fiscal Deficit is used instead.
*/





