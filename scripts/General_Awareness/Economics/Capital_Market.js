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

/* Field: General_Awareness · Subject: Economics · Chapter: Capital_Market · 11 concept pages (+ overview) · 19 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "📈", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Capital Market",
    thumb: {
      image: "images/General_Awareness/Economics/Capital_Market/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "CAPITAL MARKET",
      line2: "SEBI • SENSEX • NIFTY",
      line3: "FULL CHAPTER",
      badge: "COMPLETE",
      ribbon: "NOTES • FACTS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Capital Market Complete Chapter | SEBI, Sensex, Nifty, IPO | General Awareness",
      altTitles: ["Capital Market in One Video for All Government Exams", "SEBI, BSE, NSE, IPO and FPO Made Easy"],
      description: "The Capital Market is a short and scoring chapter of Economics in General Awareness. In this class we learn it step by step in simple words.\n\n📌 IN THIS CLASS\n✅ Money market and capital market\n✅ SEBI, shares, bonds and debentures\n✅ Bull and bear, BSE and NSE, Sensex and Nifty\n✅ Primary and secondary market, IPO and FPO\n✅ Angel investors and venture capitalists\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#CapitalMarket #SEBI #GeneralAwareness",
      tags: ["capital market", "money market", "sebi functions", "sensex and nifty", "bse and nse", "bull and bear market", "ipo and fpo", "primary market", "secondary market", "equity share", "preference share", "bond and debenture", "treasury bill", "commercial paper", "angel investor", "venture capital", "private placement", "stock exchange india", "economics for ssc", "general awareness", "static gk economics", "government exam economics", "share market basics", "securities market", "debt security", "SSC CGL", "UPSC", "Banking", "Capital Market Economics class"],
      hashtags: ["CapitalMarket", "SEBI", "GeneralAwareness"],
      thumbText: "CAPITAL MARKET FULL CHAPTER",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📈 New class is live: Capital Market complete chapter. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Economics — General Awareness Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Capital Market</u>: how money is raised through shares and bonds, who watches the market, and how the stock exchanges work. These ideas are asked directly in every General Awareness paper.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>11</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>19</b><span>Questions</span></div>
        <div class="cp-stat"><b>~41 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Money Market and Capital Market</b><br>The difference between short-term and long-term financial markets, and the regulator of each.</li>
        <li><b>Securities and Their Types</b><br>What a security is, and how shares, bonds, debentures, bills and commercial paper differ in risk and return.</li>
        <li><b>Investors and Stock Exchanges</b><br>Bull and bear investors, the Bombay Stock Exchange, the National Stock Exchange, and what a rise or fall of the Sensex and the Nifty means.</li>
        <li><b>Primary and Secondary Market</b><br>Where new securities are issued and where old securities are traded.</li>
        <li><b>Ways of Raising Money and Special Investors</b><br>Private placement, the Initial Public Offering, the Follow-on Public Offer, angel investors and venture capitalists.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Full forms, years of establishment, the number of companies in each index and the regulator of each market are repeated again and again in government exams.</div>
    `
  },
  2: {
    type: "concept", icon: "💹", accent: "#22c55e", pauseTimer: true,
    title: "Financial Market: Money Market and Capital Market",
    html: `
      <p class="cp-lead">The financial market is the place where money is borrowed and lent. <u>It is divided by time: the money market is for the short term and the capital market is for the long term.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/1.png" alt="Two-column comparison cards. Money Market: short term less than 1 year, regulator RBI, sma" data-caption="The money market and the capital market compared by time and regulator." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/2.png" alt="Timeline bar: left part up to 1 year labelled Money Market, right part beyond 1 year label" data-caption="A one-year line separates the money market from the capital market." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Basis</th><th>Money Market</th><th>Capital Market</th></tr></thead><tbody><tr><td>Examples of instruments</td><td>Treasury bills, commercial paper, call money</td><td>Shares, bonds, debentures</td></tr><tr><td>Regulator</td><td>Reserve Bank of India</td><td>Securities and Exchange Board of India</td></tr><tr><td>Duration</td><td>Short term: less than 1 year</td><td>Long term: more than 1 year</td></tr><tr><td>Amount of money</td><td>Generally small amounts</td><td>Generally huge amounts</td></tr></tbody></table>
      <p class="cp-lead">A company that needs money for a few weeks goes to the money market. A company that needs money for many years to build a factory goes to the capital market and sells shares or bonds.</p>
      <div class="cp-note trap">The Reserve Bank of India regulates the money market, but the Securities and Exchange Board of India regulates the capital market. Do not swap them.</div>
      <div class="cp-note exam">Remember one year as the dividing line: less than one year is the money market and more than one year is the capital market.</div>
    `
  },
  3: {
    questext: "The regulator of the capital market in India is:",
    options: ["SEBI", "Reserve Bank of India", "NABARD", "Ministry of Finance"],
    correct: "1",
    exptext: "✅ The Securities and Exchange Board of India regulates the capital market. 📌 S for Securities, S for SEBI. ❌ The Reserve Bank is wrong because it regulates the money market."
  },
  4: {
    questext: "The capital market deals with financial instruments of a period of:",
    options: ["Less than 1 year", "Only one day", "Up to 3 months", "More than 1 year"],
    correct: "4",
    exptext: "✅ The capital market is the long-term market, with periods of more than one year. 📌 Capital means long-term capital. ❌ Less than one year is wrong because that is the money market."
  },
  5: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "SEBI — Securities and Exchange Board of India",
    html: `
      <p class="cp-lead">SEBI is the regulator of the securities market of India. <u>Its job is to protect the interests of investors and to keep the market fair.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/3.png" alt="SEBI Bhavan Bandra Kurla Complex Mumbai building photo" data-caption="The head office of the Securities and Exchange Board of India in Mumbai." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/4.png" alt="Shield diagram: a shield labelled Investor in the centre with three arrows labelled Regula" data-caption="The Securities and Exchange Board of India protects investors and regulates the market." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Full name</td><td>Securities and Exchange Board of India</td></tr><tr><td>Set up</td><td>1988</td></tr><tr><td>Statutory power</td><td>Received through the SEBI Act, 1992</td></tr><tr><td>Headquarters</td><td>Mumbai</td></tr><tr><td>Chairperson</td><td>Tuhin Kanta Pandey</td></tr><tr><td>Main work</td><td>Regulates the securities market and protects investors</td></tr></tbody></table>
      <p class="cp-lead">SEBI was first set up in 1988 as an ordinary body. It became a statutory body, which means a body with powers given by law, through the SEBI Act of 1992.</p>
      <div class="cp-note trap">SEBI began in 1988, but its legal powers came in 1992. Questions may use either year, so read the wording.</div>
      <div class="cp-note exam">Remember Mumbai for the headquarters and the SEBI Act, 1992 for the law.</div>
    `
  },
  6: {
    questext: "The Securities and Exchange Board of India got statutory powers through an Act of which year?",
    options: ["1988", "1999", "1992", "2005"],
    correct: "2",
    exptext: "✅ The SEBI Act of 1992 gave it statutory powers. 📌 Born 1988, powers 1992. ❌ 1988 is wrong because that is the year SEBI was first set up without legal powers."
  },
  7: {
    questext: "Where is the headquarters of the Securities and Exchange Board of India?",
    options: ["New Delhi", "Kolkata", "Mumbai", "Hyderabad"],
    correct: "2",
    exptext: "✅ SEBI has its headquarters in Mumbai. 📌 The market capital, Mumbai. ❌ New Delhi is wrong because the Reserve Bank and SEBI both sit in Mumbai."
  },
  8: {
    type: "concept", icon: "🧾", accent: "#ef4444", pauseTimer: true,
    title: "Security: Share Security and Debt Security",
    html: `
      <p class="cp-lead">A security is a paper or a digital record that shows you have given money to a company. <u>There are two main kinds: share security and debt security.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/5.png" alt="Two flow diagrams. Left: Share Security, Investor gives money to Company, gets transfer of" data-caption="Share security gives ownership and high risk, while debt security gives fixed interest and low risk." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/6.png" alt="Balance scale: one side labelled Owner (shareholder), other side labelled Lender (bondhold" data-caption="A shareholder is an owner of the company, while a bondholder is only a lender." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Share security</th><th>Debt security</th></tr></thead><tbody><tr><td>What the investor gets</td><td>A part of the ownership of the company</td><td>A promise of repayment with interest</td></tr><tr><td>Return</td><td>Profit or loss, not fixed</td><td>Fixed interest rate</td></tr><tr><td>Risk</td><td>High</td><td>Low</td></tr><tr><td>Relationship</td><td>Investor becomes an owner</td><td>Company borrows money from the investor</td></tr></tbody></table>
      <p class="cp-lead">If the company earns a big profit, a shareholder can gain a lot. If the company makes a loss, a shareholder can lose a lot. A lender gets the fixed interest in both cases, so the risk and the gain are both smaller.</p>
      <div class="cp-note trap">A bond holder is a lender, not an owner. Only a share holder owns a part of the company.</div>
      <div class="cp-note exam">Remember the rule: high risk goes with a high possible profit or loss, and low risk goes with a lower, fixed return.</div>
    `
  },
  9: {
    questext: "Which of the following gives the investor a fixed rate of interest?",
    options: ["Equity share", "Ownership right", "Share security", "Debt security"],
    correct: "4",
    exptext: "✅ A debt security pays a fixed interest because the company borrows from the investor. 📌 Debt means lending, interest is fixed. ❌ Equity share is wrong because its return depends on the company profit."
  },
  10: {
    questext: "Which of the following carries the highest risk for an investor?",
    options: ["Government bond", "Treasury bill", "Debenture", "Equity share"],
    correct: "4",
    exptext: "✅ An equity share has a profit or loss that is not fixed, so the risk is highest. 📌 Owners carry the risk. ❌ A government bond is wrong because it gives a fixed return with a very low risk."
  },
  11: {
    type: "concept", icon: "📊", accent: "#8b5cf6", pauseTimer: true,
    title: "Share Security: Equity Share and Preference Share",
    html: `
      <p class="cp-lead">Share security is divided into <b>equity shares</b> and <b>preference shares</b>. <u>Equity shareholders get voting rights, while preference shareholders get a fixed dividend first.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/7.png" alt="Split card. Preference Share: fixed dividend paid first, no ordinary voting rights, lower " data-caption="Preference shares and equity shares compared by dividend, voting and risk." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/8.png" alt="Diagram: Company connected by a double arrow to Board of Directors, with a note Decision m" data-caption="The Board of Directors makes decisions for the company and is elected by equity shareholders." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Preference share</th><th>Equity share</th></tr></thead><tbody><tr><td>Dividend</td><td>Fixed and paid first</td><td>Not fixed and paid after preference holders</td></tr><tr><td>Voting rights</td><td>No ordinary voting rights</td><td>Has voting rights</td></tr><tr><td>Held by</td><td>Investors who want steady income</td><td>Common or retail investors and promoters</td></tr><tr><td>Risk</td><td>Lower</td><td>Higher</td></tr></tbody></table>
      <p class="cp-lead">A dividend is the part of the net profit that a company pays to its shareholders. The Board of Directors is the group that takes the decisions of the company, and equity shareholders use their votes to elect the directors.</p>
      <div class="cp-note trap">Voting rights belong to equity shareholders, not to preference shareholders.</div>
      <div class="cp-note exam">Remember: preference means first in line for the dividend, and equity means the voting power.</div>
    `
  },
  12: {
    questext: "Which type of shareholders have voting rights in the election of the Board of Directors?",
    options: ["Preference shareholders", "Bond holders", "Equity shareholders", "Debenture holders"],
    correct: "2",
    exptext: "✅ Equity shareholders hold voting rights. 📌 Equity equals voice. ❌ Preference shareholders are wrong because they get a fixed dividend but no ordinary voting rights."
  },
  13: {
    questext: "Consider the following statements about shares:\n1. Preference shareholders are paid their dividend before equity shareholders.\n2. Equity shareholders have no voting rights.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Preference means first for the dividend. ❌ Statement 2 is wrong because equity shareholders do have voting rights."
  },
  14: {
    type: "concept", icon: "📜", accent: "#14b8a6", pauseTimer: true,
    title: "Debt Security: Bond, Debenture, Bills and Commercial Paper",
    html: `
      <p class="cp-lead">Debt securities are tools by which a company or the government borrows money. <u>Bonds and debentures are long term, while bills and commercial paper are short term.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/9.png" alt="Three boxes in a row. Bond or Debenture: long term more than 1 year, issued by companies o" data-caption="The three main debt securities, compared by time and issuer." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/10.png" alt="Timeline from short to long: Treasury Bill and Commercial Paper under 1 year, Bond and Deb" data-caption="Short-term debt securities mature within a year, long-term ones take more than a year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Instrument</th><th>Duration</th><th>Issued by</th></tr></thead><tbody><tr><td>Bond or Debenture</td><td>Long term: more than 1 year</td><td>Companies or institutions</td></tr><tr><td>Bill or Commercial Paper</td><td>Short term: less than 1 year</td><td>Companies</td></tr><tr><td>Treasury Bill (T-Bill)</td><td>Short term</td><td>Government</td></tr></tbody></table>
      <p class="cp-lead">A Treasury Bill is a short-term debt security issued by the Government of India. It is considered very safe because the government promises to repay. Commercial paper is issued by companies for short-term needs.</p>
      <div class="cp-note trap">A Treasury Bill is issued by the government, while commercial paper is issued by companies.</div>
      <div class="cp-note exam">Long term is more than one year (bond and debenture); short term is less than one year (bills and commercial paper).</div>
    `
  },
  15: {
    questext: "A Treasury Bill is a:",
    options: ["Long-term debt security issued by a company", "Long-term bond of a bank", "Share of a company", "Short-term debt security issued by the government"],
    correct: "4",
    exptext: "✅ A Treasury Bill is a short-term debt security of the government. 📌 T for Treasury, T for Time-short. ❌ A long-term company security is wrong because that describes a bond or a debenture."
  },
  16: {
    questext: "Which of the following is a long-term debt security?",
    options: ["Commercial paper", "Treasury Bill", "Debenture", "Call money"],
    correct: "2",
    exptext: "✅ A debenture is a long-term debt security of more than one year. 📌 Bonds and debentures are the long ones. ❌ Commercial paper is wrong because it is a short-term security."
  },
  17: {
    type: "concept", icon: "🐂", accent: "#3b82f6", pauseTimer: true,
    title: "Investors: Bull and Bear",
    html: `
      <p class="cp-lead">Investors are named after two animals. <u>A bull investor expects the market to rise, and a bear investor expects it to fall.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/11.png" alt="Two panels. Left: a bull with an upward arrow, labelled Bull Investor, expects share marke" data-caption="The bull investor expects prices to rise, while the bear investor expects them to fall." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/12.png" alt="Charging Bull statue Wall Street New York photo" data-caption="The Charging Bull statue in New York, a symbol of a rising share market." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Investor type</th><th>Expectation</th><th>Effect on demand and value</th><th>Market movement</th></tr></thead><tbody><tr><td>Bull investor</td><td>Believes the share market will rise soon</td><td>Demand for shares increases and value rises</td><td>Share market goes up</td></tr><tr><td>Bear investor</td><td>Believes the share market will fall soon</td><td>Demand for shares and value falls</td><td>Share market goes down</td></tr></tbody></table>
      <p class="cp-lead">A bull attacks by thrusting its horns upwards, so it stands for a rising market. A bear attacks by swiping its paws downwards, so it stands for a falling market.</p>
      <div class="cp-note trap">Do not mix the two. Bull means rise and bear means fall.</div>
      <div class="cp-note exam">A bullish market is positive, and a bearish market is weak or negative.</div>
    `
  },
  18: {
    questext: "An investor who believes that the share market will fall in the near future is called a:",
    options: ["Bull investor", "Angel investor", "Bear investor", "Venture investor"],
    correct: "3",
    exptext: "✅ A bear investor expects the market to fall. 📌 Bear paws swipe down. ❌ A bull investor is wrong because a bull expects the market to rise."
  },
  19: {
    type: "concept", icon: "🏢", accent: "#ec4899", pauseTimer: true,
    title: "BSE and NSE",
    html: `
      <p class="cp-lead">India has two major stock exchanges. <u>They are the Bombay Stock Exchange (BSE) and the National Stock Exchange (NSE).</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/13.png" alt="Bombay Stock Exchange building Dalal Street Mumbai photo" data-caption="The Bombay Stock Exchange building on Dalal Street in Mumbai." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/14.png" alt="National Stock Exchange of India Exchange Plaza Mumbai building photo" data-caption="The National Stock Exchange building in Mumbai." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Stock exchange</th><th>Set up</th><th>Index</th><th>Index meaning</th></tr></thead><tbody><tr><td>Bombay Stock Exchange (BSE)</td><td>1875</td><td>SENSEX</td><td>Index of the top 30 listed companies; Asia's first stock exchange</td></tr><tr><td>National Stock Exchange (NSE)</td><td>1992</td><td>NIFTY</td><td>Index of the top 50 listed companies</td></tr></tbody></table>
      <p class="cp-lead">A stock exchange is a market where shares are bought and sold. An index is a number that shows how a group of important companies is performing. The Sensex follows 30 companies of the BSE, and the Nifty follows 50 companies of the NSE.</p>
      <div class="cp-note trap">Sensex has 30 companies and Nifty has 50. Do not swap them.</div>
      <div class="cp-note exam">The BSE is Asia's first stock exchange (1875), and the NSE came much later in 1992.</div>
    `
  },
  20: {
    questext: "The Sensex is the index of which stock exchange?",
    options: ["Bombay Stock Exchange", "National Stock Exchange", "Calcutta Stock Exchange", "Madras Stock Exchange"],
    correct: "1",
    exptext: "✅ The Sensex is the index of the Bombay Stock Exchange. 📌 S for Sensex, B for Bombay (both in the same market tower). ❌ The National Stock Exchange is wrong because its index is the Nifty."
  },
  21: {
    questext: "How many companies are included in the Nifty index?",
    options: ["30", "500", "100", "50"],
    correct: "4",
    exptext: "✅ The Nifty includes the top 50 listed companies of the NSE. 📌 Nifty fifty. ❌ 30 is wrong because that is the number of companies in the Sensex."
  },
  22: {
    questext: "Consider the following statements about stock exchanges:\n1. The Bombay Stock Exchange was set up in 1875.\n2. The National Stock Exchange is older than the Bombay Stock Exchange.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 BSE came first, in 1875. ❌ Statement 2 is wrong because the NSE was set up in 1992, much later than the BSE."
  },
  23: {
    type: "concept", icon: "📉", accent: "#06b6d4", pauseTimer: true,
    title: "Movement of the Sensex and the Nifty",
    html: `
      <p class="cp-lead">When the index moves, it shows the mood of investors. <u>A rising index means bullish feeling, and a falling index means bearish feeling.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/15.png" alt="Two panels for SENSEX and NIFTY. SENSEX up: bull type investors stronger than bear type. S" data-caption="Index movement shows whether bull or bear type investors are stronger." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/16.png" alt="Line chart with a rising line labelled Index up equals positive market, and a falling line" data-caption="A rising index shows a positive market and a falling index shows a weak market." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Situation</th><th>Investor sentiment</th><th>Result</th></tr></thead><tbody><tr><td>Index up</td><td>Bullish sentiment</td><td>Market is positive</td></tr><tr><td>Index down</td><td>Bearish sentiment</td><td>Market is weak or negative</td></tr></tbody></table>
      <p class="cp-lead">The Nifty usually moves in the same direction as the Sensex, because both follow big companies. The Nifty shows the NSE and the Sensex shows the BSE.</p>
      <div class="cp-note trap">A fall in the Sensex does not mean every share falls. It means that the overall mood is negative.</div>
      <div class="cp-note exam">Index up means bull investors dominate; index down means bear investors dominate.</div>
    `
  },
  24: {
    questext: "A continuous fall in the Sensex generally shows that:",
    options: ["Bull investors are stronger", "The Nifty is closed", "Bear investors are stronger", "Shares are free of risk"],
    correct: "3",
    exptext: "✅ A falling index shows that bear investors dominate the market. 📌 Down means bear. ❌ Bull investors being stronger is wrong because that would push the index up."
  },
  25: {
    type: "concept", icon: "🔁", accent: "#84cc16", pauseTimer: true,
    title: "Primary Market and Secondary Market",
    html: `
      <p class="cp-lead">The securities market has two parts. <u>In the primary market new securities are issued, and in the secondary market old securities are traded.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/17.png" alt="Two flow diagrams. Primary Market: Company issues new securities directly to Investor, exa" data-caption="In the primary market the company sells new securities; in the secondary market investors trade with each other." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/18.png" alt="Arrow chain: Company, Primary Market, Investor, Secondary Market, another Investor." data-caption="Securities first come from the company and later pass from investor to investor." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Primary market</th><th>Secondary market</th></tr></thead><tbody><tr><td>Company issues securities directly to the investor</td><td>Investor buys or sells securities with another investor</td></tr><tr><td>New securities are issued</td><td>Existing securities are traded</td></tr><tr><td>Example: IPO and FPO</td><td>Example: intra-day trading</td></tr></tbody></table>
      <p class="cp-lead">In the primary market the company receives the money. In the secondary market the money goes to the selling investor, not to the company.</p>
      <div class="cp-note trap">The company gets money only in the primary market. Trading on the stock exchange later does not give any new money to the company.</div>
      <div class="cp-note exam">IPO and FPO belong to the primary market. Stock exchange trading is the secondary market.</div>
    `
  },
  26: {
    questext: "In which market does a company issue new securities directly to investors?",
    options: ["Primary market", "Secondary market", "Call money market", "Bullion market"],
    correct: "1",
    exptext: "✅ New securities are issued in the primary market. 📌 Primary means first. ❌ Secondary market is wrong because existing securities are traded there."
  },
  27: {
    type: "concept", icon: "🚀", accent: "#f97316", pauseTimer: true,
    title: "Types of Investment: Private Placement, IPO and FPO",
    html: `
      <p class="cp-lead">A company can raise money in different ways. <u>It can sell shares to a few chosen investors, or it can offer them to the public.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/19.png" alt="Three-row ladder: Private Placement, shares for limited chosen investors; IPO, first publi" data-caption="The three routes to raise money: private placement, IPO and FPO." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/20.png" alt="Life Insurance Corporation of India IPO listing bell ringing ceremony photo" data-caption="A company being listed at the stock exchange after its Initial Public Offering." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Full form or meaning</th><th>Main feature</th></tr></thead><tbody><tr><td>Private Placement</td><td>Placement of shares for limited investors</td><td>Not offered to the general public; usually for selected investors</td></tr><tr><td>IPO</td><td>Initial Public Offering or Offer</td><td>First time offer of shares to common or retail investors</td></tr><tr><td>FPO</td><td>Follow-on Public Offer or Offering</td><td>A listed company issues shares again after the IPO to raise more capital</td></tr></tbody></table>
      <p class="cp-lead">A company that has already been listed is a company whose shares are traded on a stock exchange. Examples of companies that came with an IPO are LIC and Paytm.</p>
      <div class="cp-note trap">An IPO is the first offer to the public. An FPO is a later offer by a company that is already listed.</div>
      <div class="cp-note exam">IPO equals first public offer; FPO equals second, third or later public offer.</div>
    `
  },
  28: {
    questext: "What does IPO stand for?",
    options: ["Initial Public Offering", "Indian Public Offer", "Internal Private Offer", "Initial Private Order"],
    correct: "1",
    exptext: "✅ IPO means Initial Public Offering or Offer, when a company offers shares to the public for the first time. 📌 I for Initial means the first one. ❌ Internal Private Offer is wrong because an IPO is a public offer."
  },
  29: {
    questext: "A listed company issuing shares again to the public after its IPO is called:",
    options: ["Private placement", "Angel funding", "Bonus issue", "Follow-on Public Offer"],
    correct: "4",
    exptext: "✅ A Follow-on Public Offer is a later public issue by a listed company. 📌 Follow-on means follow after the IPO. ❌ Private placement is wrong because it is for limited chosen investors, not the public."
  },
  30: {
    type: "concept", icon: "👼", accent: "#a855f7", pauseTimer: true,
    title: "Other Important Terms: Angel Investors and Venture Capitalists",
    html: `
      <p class="cp-lead">Start-ups need money before they can go to the stock market. <u>Angel investors and venture capitalists give this early money.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/21.png" alt="Two-step staircase: Angel Investor at the first step funding a new idea, Venture Capitalis" data-caption="Angel investors come first, venture capitalists next, and an IPO may follow." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Capital_Market/22.png" alt="Balance scale: high risk and high return on one side, long-term investment on the other, l" data-caption="Angel investors accept high risk for a high return over a long period." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Term</th><th>Meaning</th><th>Risk, return and duration</th></tr></thead><tbody><tr><td>Angel investor</td><td>Invests in start-ups and new companies</td><td>High risk and high return; long-term investment</td></tr><tr><td>Venture capitalist</td><td>Invests in promising companies that have started to grow</td><td>Opportunistic investor; usually shorter-term investment</td></tr></tbody></table>
      <p class="cp-lead">An angel investor often backs a company at the very beginning. A venture capitalist usually comes a little later and invests a larger amount, hoping to sell at a profit after some time.</p>
      <div class="cp-note trap">Do not call an angel investor a short-term investor. Angel investment is long term with high risk.</div>
      <div class="cp-note exam">Angel means the earliest start-up money. Venture capital comes after and is more opportunistic.</div>
    `
  },
  31: {
    questext: "Which investor invests in start-ups and new companies with high risk, high return and a long-term view?",
    options: ["Angel investor", "Bear investor", "Bull investor", "Preference shareholder"],
    correct: "1",
    exptext: "✅ Angel investors fund start-ups and new companies for the long term. 📌 Angels help at the start. ❌ Bear investor is wrong because that term describes an investor expecting a falling market."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Capital_Market/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a stock exchange building with columns, a few real-looking gold coins, a rising chart line and a small bull figure" },
  "images/General_Awareness/Economics/Capital_Market/1.png": { t: "fig", about: "Two-column comparison cards. Money Market: short term less than 1 year, regulator RBI, small amounts. Capital Market: long term more than 1 year, regulator SEBI, huge amounts." },
  "images/General_Awareness/Economics/Capital_Market/2.png": { t: "fig", about: "Timeline bar: left part up to 1 year labelled Money Market, right part beyond 1 year labelled Capital Market." },
  "images/General_Awareness/Economics/Capital_Market/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"SEBI Bhavan Bandra Kurla Complex Mumbai building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Capital_Market/3.png. a photo of the head office of the regulator",
  "images/General_Awareness/Economics/Capital_Market/4.png": { t: "fig", about: "Shield diagram: a shield labelled Investor in the centre with three arrows labelled Regulate the market, Protect investors, Develop the market." },
  "images/General_Awareness/Economics/Capital_Market/5.png": { t: "fig", about: "Two flow diagrams. Left: Share Security, Investor gives money to Company, gets transfer of ownership rights, risk high so profit or loss high. Right: Debt Security, Investor lends money to Company, gets fixed interest, risk low so profit or loss low." },
  "images/General_Awareness/Economics/Capital_Market/6.png": { t: "fig", about: "Balance scale: one side labelled Owner (shareholder), other side labelled Lender (bondholder)." },
  "images/General_Awareness/Economics/Capital_Market/7.png": { t: "fig", about: "Split card. Preference Share: fixed dividend paid first, no ordinary voting rights, lower risk. Equity Share: dividend paid after preference holders, full voting rights, higher risk." },
  "images/General_Awareness/Economics/Capital_Market/8.png": { t: "fig", about: "Diagram: Company connected by a double arrow to Board of Directors, with a note Decision making body, and equity shareholders electing the Board." },
  "images/General_Awareness/Economics/Capital_Market/9.png": { t: "fig", about: "Three boxes in a row. Bond or Debenture: long term more than 1 year, issued by companies or institutions. Commercial Paper: short term less than 1 year, issued by companies. Treasury Bill: short term, issued by the government." },
  "images/General_Awareness/Economics/Capital_Market/10.png": { t: "fig", about: "Timeline from short to long: Treasury Bill and Commercial Paper under 1 year, Bond and Debenture over 1 year." },
  "images/General_Awareness/Economics/Capital_Market/11.png": { t: "fig", about: "Two panels. Left: a bull with an upward arrow, labelled Bull Investor, expects share market to rise, demand for shares increases. Right: a bear with a downward arrow, labelled Bear Investor, expects share market to fall, demand for shares falls." },
  "images/General_Awareness/Economics/Capital_Market/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Charging Bull statue Wall Street New York photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Capital_Market/12.png. a photo of the bull statue near the stock exchange",
  "images/General_Awareness/Economics/Capital_Market/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bombay Stock Exchange building Dalal Street Mumbai photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Capital_Market/13.png. a photo of the Bombay Stock Exchange tower",
  "images/General_Awareness/Economics/Capital_Market/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"National Stock Exchange of India Exchange Plaza Mumbai building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Capital_Market/14.png. a photo of the National Stock Exchange building",
  "images/General_Awareness/Economics/Capital_Market/15.png": { t: "fig", about: "Two panels for SENSEX and NIFTY. SENSEX up: bull type investors stronger than bear type. SENSEX down: bear type investors stronger than bull type. NIFTY up or down: same as SENSEX." },
  "images/General_Awareness/Economics/Capital_Market/16.png": { t: "fig", about: "Line chart with a rising line labelled Index up equals positive market, and a falling line labelled Index down equals weak market." },
  "images/General_Awareness/Economics/Capital_Market/17.png": { t: "fig", about: "Two flow diagrams. Primary Market: Company issues new securities directly to Investor, example IPO or FPO. Secondary Market: Investor sells existing securities to another Investor, example intra-day trading." },
  "images/General_Awareness/Economics/Capital_Market/18.png": { t: "fig", about: "Arrow chain: Company, Primary Market, Investor, Secondary Market, another Investor." },
  "images/General_Awareness/Economics/Capital_Market/19.png": { t: "fig", about: "Three-row ladder: Private Placement, shares for limited chosen investors; IPO, first public offer to retail investors; FPO, further public offer by an already listed company." },
  "images/General_Awareness/Economics/Capital_Market/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Life Insurance Corporation of India IPO listing bell ringing ceremony photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Capital_Market/20.png. a photo of a listing ceremony of a company at the stock exchange",
  "images/General_Awareness/Economics/Capital_Market/21.png": { t: "fig", about: "Two-step staircase: Angel Investor at the first step funding a new idea, Venture Capitalist at the second step funding a growing start-up, then IPO at the top." },
  "images/General_Awareness/Economics/Capital_Market/22.png": { t: "fig", about: "Balance scale: high risk and high return on one side, long-term investment on the other, labelled Angel Investor." }
});

/* CHANGE LOG
   - Money market is described by the short-term instruments it trades (treasury bills, commercial paper, call money) instead of 'banking sector'.
   - Preference shares: holders get a fixed dividend before equity holders and usually no ordinary voting rights; they are not described as 'promoters' shares'.
   - Commercial paper maturity is 7 days to 1 year (a fixed '35 days' is not taught). Treasury bills are issued by the Government of India for 91, 182 and 364 days.
   - SEBI was set up in 1988 and became a statutory body through the SEBI Act, 1992. Chairperson Tuhin Kanta Pandey (since March 2025) checked against current sources.
   - Venture capitalists are described as investors in start-ups that have started to grow, usually for a shorter period than angel investors.
*/