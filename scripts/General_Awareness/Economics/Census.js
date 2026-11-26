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

/* Field: General_Awareness · Subject: Economics · Chapter: Census · 10 concept pages (+ overview) · 30 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "👥", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Census and Population of India",
    thumb: {
      image: "images/General_Awareness/Economics/Census/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "CENSUS",
      line2: "OF INDIA",
      line3: "POPULATION FACTS",
      badge: "FULL CLASS",
      ribbon: "THEORIES • CENSUS 2011 • QUESTIONS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Census of India and Population Theories | Economics for competitive exams",
      altTitles: ["Census 2011 Important Facts in One Class", "Sex Ratio, Literacy and Population Density Census 2011 Tricks"],
      description: "Census questions are asked in almost every General Awareness paper. In this class you learn the Indian Census from the very beginning, in simple words and in the right order.\n\n📌 IN THIS CLASS\n✅ What a Census is and who conducts it\n✅ Malthusian, Optimum, Demographic Transition and Becker theories\n✅ History of the Census from 1872 to today\n✅ Census 2011: population, growth, sex ratio, literacy and density\n✅ Rural, urban, caste, religion, work force and migration data\n✅ Practice questions with easy explanations\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Introduction and theories\n00:00 History of the Census\n00:00 Census 2011 facts\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Census #Economics",
      tags: ["census of india", "census 2011", "indian census", "population theories", "malthusian theory", "demographic transition", "sex ratio census 2011", "literacy rate census 2011", "population density india", "history of census india", "economics for ssc cgl", "general awareness", "static gk economics", "census 2011 important facts", "child sex ratio", "decadal growth rate", "optimum population theory", "becker fertility curve", "rural urban population india", "census one liners", "SSC CGL", "UPSC", "Banking", "Railways", "Census Economics questions"],
      hashtags: ["SSCCGL", "Census", "Economics"],
      thumbText: "CENSUS OF INDIA",
      pinnedComment: "📌 Solve the questions and write your score in the comments 👇",
      communityPost: "📊 New class is live: Census of India and population theories. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Introduction and theories\n00:00 History of the Census\n00:00 Census 2011 facts",
      playlist: "Economics for competitive exams — Full Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on the Indian Census and the population of India</u>. We learn the main population theories, the history of the Census, and the important figures of the 2011 Census that exams ask again and again.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>10</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>30</b><span>Questions</span></div>
        <div class="cp-stat"><b>~50 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Introduction to the Indian Census</b><br>What a Census is, who conducts it, and the basic facts about the world population and India's population.</li>
        <li><b>Population Theories</b><br>Four famous ideas about population: the Malthusian theory, the Optimum theory, the Demographic Transition and Becker's Fertility Curve.</li>
        <li><b>History of the Census</b><br>How the first Census began, which Viceroy started it, and when the regular ten-yearly Census began.</li>
        <li><b>Census 2011 — Key Facts and Population Distribution</b><br>The main figures of the 2011 Census and which states and cities have the highest and lowest population.</li>
        <li><b>Growth Rate, Child Population, Sex Ratio and Child Sex Ratio</b><br>How fast the population grows, how many children there are, and how many women there are for every 1000 men.</li>
        <li><b>Literacy and Population Density</b><br>Who can read and write, which states lead and which lag behind, and how crowded each place is.</li>
        <li><b>Rural and Urban Population, Caste and Religion Data</b><br>Where people live, the share of Scheduled Castes and Scheduled Tribes, and the data on religious communities.</li>
        <li><b>Work Force, Migration and Important Points</b><br>How many people work, who moves from where to where, and the other facts and figures that complete the chapter.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Questions on the Census, sex ratio, literacy and population theories come almost every year in General Awareness papers, and they are fully scoring if the figures are remembered well.</div>
    `
  },
  2: {
    type: "concept", icon: "📋", accent: "#f59e0b", pauseTimer: true,
    title: "Introduction to the Indian Census",
    html: `
      <p class="cp-lead">A Census is the <b>official counting of all the people</b> of a country. In India it is done <u>once in every ten years</u>, and its figures are a favourite of exam setters.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/1.png" alt="Census enumerator visiting house India photo" data-caption="A Census worker visiting a house in India to record details of the family." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/2.png" alt="Timeline of world population milestones: 5 billion on 11 July 1987, then World Population " data-caption="The world population crossed five billion on 11 July 1987." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Meaning</td><td>Official counting of the population every 10 years</td></tr><tr><td>First Census after independence</td><td>1951</td></tr><tr><td>Census Act</td><td>Enacted in 1948</td></tr><tr><td>Conducted by</td><td>Office of the Registrar General and Census Commissioner of India, under the Ministry of Home Affairs</td></tr><tr><td>2011 Census</td><td>15th Census since 1872 and 7th after independence</td></tr><tr><td>World Population Day</td><td>11 July, declared by the United Nations</td></tr></tbody></table>
      <p class="cp-lead">In the 2011 Census, India held <b>17.5 percent</b> of the population of the world. India was also the first country in the world to adopt a Family Planning programme, in 1952.</p>
      <div class="cp-example"><b>Worked example:</b> The Censuses after independence were held in 1951, 1961, 1971, 1981, 1991, 2001 and 2011. Counting them gives seven, so the 2011 Census is the 7th Census after independence.</div>
      <div class="cp-note trap">Do not mix up the two counts. The 2011 Census is the 15th Census overall (counting from 1872), but only the 7th after independence.</div>
      <div class="cp-note info">The 2021 Census was delayed and was not held. The next Census has the reference date of 1 March 2027 and will be the first digital Census of India.</div>
      <div class="cp-note exam">Article 82 of the Constitution deals with the readjustment of seats after each Census. The 84th Amendment froze the seats until the first Census after 2026, and the 87th Amendment based the delimitation on the 2001 Census.</div>
    `
  },
  3: {
    questext: "The 2011 Census was which Census of India after independence?",
    options: ["5th", "6th", "7th", "8th"],
    correct: "3",
    exptext: "✅ It was the 7th Census after independence. 📌 Count the years 1951, 1961, 1971, 1981, 1991, 2001 and 2011. ❌ 15th is wrong here because that number counts all Censuses since 1872."
  },
  4: {
    questext: "Consider the following statements about the Census in India:\n1. The Census is conducted every five years.\n2. The Census Act was enacted in 1948.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct, because the Census Act was made in 1948. 📌 Census means once in ten years, not five. ❌ Statement 1 is wrong because the gap between two Censuses is ten years."
  },
  5: {
    questext: "The world population crossed five billion on which date?",
    options: ["11 July 1987", "11 July 1999", "11 July 1977", "11 July 1989"],
    correct: "1",
    exptext: "✅ The world population crossed five billion on 11 July 1987. 📌 The United Nations later chose 11 July as World Population Day. ❌ 1989 is tempting, but that is the year the United Nations declared the day, not the year of the milestone."
  },
  6: {
    questext: "The Census of India is conducted by the Office of the Registrar General and Census Commissioner, which works under which ministry?",
    options: ["Ministry of Finance", "Ministry of Statistics", "Ministry of Law", "Ministry of Home Affairs"],
    correct: "4",
    exptext: "✅ The office works under the Ministry of Home Affairs. 📌 Counting people is linked to home administration. ❌ The Ministry of Statistics is tempting because it handles surveys, but it does not conduct the Census."
  },
  7: {
    type: "concept", icon: "📈", accent: "#3b82f6", pauseTimer: true,
    title: "Malthusian Theory of Population (1798)",
    html: `
      <p class="cp-lead">Thomas Malthus, a British economist, wrote that <u>population grows much faster than food</u>. He explained this in his book An Essay on the Principle of Population in the year 1798.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/3.png" alt="Thomas Robert Malthus portrait painting" data-caption="Thomas Robert Malthus, the British economist who wrote about population in 1798." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/4.png" alt="Line graph: population as a steeply rising curve labelled Population (1, 2, 4, 8, 16) and " data-caption="The population curve rises much faster than the food grain line." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/5.png" alt="Two-column picture: Positive checks (floods, droughts, epidemics, earthquakes, wars) adopt" data-caption="Nature and humans both keep the population under control in different ways." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Factor</th><th>Type of progression</th><th>Series example</th></tr></thead><tbody><tr><td>Population growth</td><td>Geometric (multiplying)</td><td>1, 2, 4, 8, 16, 32</td></tr><tr><td>Food grain growth</td><td>Arithmetic (adding)</td><td>1, 2, 3, 4, 5</td></tr></tbody></table>
      <p class="cp-lead">In a geometric series each number is multiplied, so it grows very fast. In an arithmetic series the same number is added each time, so it grows slowly. Malthus said that when people grow faster than food, the balance must be set right by checks.</p>
      <div class="cp-example"><b>Worked example:</b> After five steps the population series reaches 16, but the food series reaches only 5. The people are three times more than the food can feed, so hunger and disease follow.</div>
      <div class="cp-note trap">Positive checks (floods, droughts, epidemics, earthquakes and wars) are adopted by nature. Preventive checks (late marriage and celibacy, which means staying unmarried) are adopted by humans.</div>
      <div class="cp-note exam">Remember the pair: <b>Population is Geometric, Food is Arithmetic.</b></div>
    `
  },
  8: {
    questext: "According to the Malthusian theory, which pair correctly shows the growth of population and food grain?",
    options: ["Both grow in geometric progression", "Both grow in arithmetic progression", "Population grows arithmetically and food grows geometrically", "Population grows geometrically and food grows arithmetically"],
    correct: "4",
    exptext: "✅ Malthus said population grows geometrically and food grows arithmetically. 📌 Population multiplies, food only adds. ❌ Option 3 is wrong because it reverses the two."
  },
  9: {
    questext: "Which of the following is a preventive check on population as explained by Malthus?",
    options: ["Famine", "Epidemic", "Late marriage", "War"],
    correct: "3",
    exptext: "✅ Late marriage is a preventive check because humans choose it. 📌 Preventive means people prevent the births themselves. ❌ Famine, epidemic and war are positive checks, which come from nature or conflict."
  },
  10: {
    questext: "Consider the following statements about Malthus's theory:\n1. Positive checks are adopted by humans.\n2. Late marriage and celibacy are preventive checks.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Positive checks come from nature, preventive checks come from humans. ❌ Statement 1 is wrong because positive checks such as floods and epidemics are not chosen by people."
  },
  11: {
    type: "concept", icon: "🎯", accent: "#a855f7", pauseTimer: true,
    title: "Optimum Theory of Population",
    html: `
      <p class="cp-lead">This theory says that <u>a bigger population is not always a problem</u>. People are also the human resource of a country, because they work and produce.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/6.png" alt="Inverted-U hill curve: horizontal axis Population, vertical axis Per capita production, th" data-caption="Per capita production is highest at the optimum population." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/7.png" alt="crowded railway platform India rush hour photo" data-caption="A crowded railway platform, showing a place with more people than resources." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Per capita production means the total production of a country divided by the number of its people. The <b>optimum population</b> is the number of people at which this per capita production is <b>maximum</b>.</p>
      <table><thead><tr><th>Situation</th><th>Meaning</th><th>Where it is seen</th></tr></thead><tbody><tr><td>Population equal to optimum</td><td>Per capita production is highest</td><td>The ideal position</td></tr><tr><td>Population more than optimum</td><td>Over-populated, which is dangerous</td><td>Developing countries</td></tr><tr><td>Population less than optimum</td><td>Under-populated</td><td>Some developed countries</td></tr></tbody></table>
      <div class="cp-example"><b>Worked example:</b> A small farm gives its best harvest per worker with ten workers. With only four workers some land is unused, and with thirty workers they crowd each other, so each person produces less.</div>
      <div class="cp-note trap">Optimum population does not mean the largest population. It means the population at which each person produces the most.</div>
      <div class="cp-note exam">Over-population is mainly a worry of developing countries, while some developed countries are under-populated.</div>
    `
  },
  12: {
    questext: "The optimum population of a country is the population at which",
    options: ["per capita production is maximum", "total population is the largest", "birth rate becomes zero", "death rate is the highest"],
    correct: "1",
    exptext: "✅ Optimum population gives the maximum per capita production. 📌 Think of the best output for each person. ❌ The largest population is tempting, but a larger crowd can reduce what each person produces."
  },
  13: {
    questext: "If the population of a country is more than the optimum population, the country is called",
    options: ["under-populated", "ideal", "stagnant", "over-populated"],
    correct: "4",
    exptext: "✅ It is called over-populated, which is dangerous for the country. 📌 More than optimum means too many people. ❌ Under-populated is the opposite case, where there are too few people."
  },
  14: {
    type: "concept", icon: "🔄", accent: "#eab308", pauseTimer: true,
    title: "Theory of Demographic Transition",
    html: `
      <p class="cp-lead">This theory says that <u>the population of a country changes in stages</u> as the birth rate and the death rate change with development.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/8.png" alt="Graph with five stages along the bottom: birth rate line and death rate line, the gap betw" data-caption="Birth and death rates move through five stages as a country develops." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/9.png" alt="Five boxes in a row labelled Stage 1 to Stage 5 with India marked: before 1921 in Stage 1," data-caption="India has moved from the first stage to the third stage." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Stage</th><th>Birth rate</th><th>Death rate</th><th>Result</th><th>Example</th></tr></thead><tbody><tr><td>1st</td><td>High</td><td>High</td><td>Stable population</td><td>India before 1921</td></tr><tr><td>2nd</td><td>High</td><td>Falls fast</td><td>Population explosion</td><td>India 1921 to 1951</td></tr><tr><td>3rd</td><td>Declining</td><td>Declining fast</td><td>Moderate growth</td><td>India at present</td></tr><tr><td>4th</td><td>Low</td><td>Low</td><td>Stable</td><td>Some developed countries</td></tr><tr><td>5th</td><td>Less than death rate</td><td>Low</td><td>Population decline</td><td>Most developed countries</td></tr></tbody></table>
      <p class="cp-lead">The theory was put forward by Warren Thompson in 1929 and was systematised by Frank Notestein in 1945. C. P. Blaker described the five stages shown above.</p>
      <div class="cp-example"><b>Worked example:</b> In the second stage, medicine and food improve, so the death rate falls fast. Births stay high, so many more people are born than die, and the population explodes.</div>
      <div class="cp-note trap">The population falls only in the fifth stage, when the birth rate goes below the death rate. In the fourth stage it is stable, not falling.</div>
      <div class="cp-note exam">India moved into the second stage after 1921, the year known as the Year of Great Divide.</div>
    `
  },
  15: {
    questext: "Who systematised the theory of Demographic Transition in the year 1945?",
    options: ["Thomas Malthus", "Gary Becker", "Frank Notestein", "C. P. Blaker"],
    correct: "3",
    exptext: "✅ Frank Notestein systematised the theory in 1945. 📌 Thompson began it in 1929 and Notestein organised it in 1945. ❌ Blaker is tempting because he gave the five stages, but he did not systematise the theory."
  },
  16: {
    questext: "In which stage of the Demographic Transition did India remain from 1921 to 1951?",
    options: ["First", "Second", "Third", "Fourth"],
    correct: "2",
    exptext: "✅ India was in the second stage, when the death rate fell fast and the population exploded. 📌 After 1921 the population began to rise quickly. ❌ The first stage is wrong because it ended with the year 1921."
  },
  17: {
    questext: "In which stage of the Demographic Transition does the birth rate fall below the death rate?",
    options: ["First", "Third", "Fourth", "Fifth"],
    correct: "4",
    exptext: "✅ In the fifth stage the birth rate is less than the death rate, so the population declines. 📌 Fifth means fall. ❌ The fourth stage is tempting, but there both rates are low and the population is only stable."
  },
  18: {
    type: "concept", icon: "📉", accent: "#fb7185", pauseTimer: true,
    title: "Becker's Fertility Curve",
    html: `
      <p class="cp-lead">Fertility means the number of children born. This curve, linked to the American economist Gary Becker, shows how <u>fertility changes as the income of people rises</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/10.png" alt="Inverted-U curve: horizontal axis Per capita income, vertical axis Fertility, the left sid" data-caption="Fertility first rises with income and then falls." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/11.png" alt="Three boxes joined by arrows: Low income, Middle income with highest fertility, High incom" data-caption="Fertility is highest at a middle level of income." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Income stage</th><th>What happens to fertility</th></tr></thead><tbody><tr><td>Up to a point</td><td>Per capita income rises and fertility also rises</td></tr><tr><td>Beyond that point</td><td>Per capita income rises but fertility falls, at a declining rate</td></tr></tbody></table>
      <p class="cp-lead">When the curve is drawn, it looks like the upside-down letter U, which is written as the symbol ∩. The shape tells us that more income first brings more children and later brings fewer.</p>
      <div class="cp-example"><b>Worked example:</b> A family with a very low income may have few children. As the income grows, it can afford more children. When the income grows much more, the family chooses fewer children, so the curve turns downward.</div>
      <div class="cp-note trap">The curve is an inverted-U, not a plain U and not a straight line.</div>
      <div class="cp-note exam">Remember: income up, fertility up, and then income up, fertility down.</div>
    `
  },
  19: {
    questext: "What is the shape of Becker's Fertility Curve?",
    options: ["Inverted-U", "U-shaped", "S-shaped", "Straight line"],
    correct: "1",
    exptext: "✅ The curve is an inverted-U. 📌 It rises first and then falls, like a hill. ❌ The U-shape is wrong because that would mean fertility first falls and then rises."
  },
  20: {
    questext: "Consider the following statements about Becker's Fertility Curve:\n1. Fertility rises with per capita income up to a point.\n2. Beyond that point, fertility falls at a declining rate.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. 📌 Income up and fertility up first, then fertility falls. ❌ Only one statement is not enough, because the curve has both a rising part and a falling part."
  },
  21: {
    type: "concept", icon: "🏛️", accent: "#22c55e", pauseTimer: true,
    title: "History of Census",
    html: `
      <p class="cp-lead">The Census in India did not start in one day. <u>First came an incomplete count, then a complete count, and then the regular ten-yearly count.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/12.png" alt="Lord Mayo Viceroy of India portrait" data-caption="Lord Mayo, the Viceroy under whom the first Census began." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/13.png" alt="Lord Ripon Viceroy of India portrait" data-caption="Lord Ripon, the Viceroy of the first complete Census." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/14.png" alt="Timeline with five boxes: 1830 Dacca city Census, 1872 first Census, 1881 first complete C" data-caption="Five key dates in the history of the Indian Census." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Event</th><th>Year and detail</th></tr></thead><tbody><tr><td>First non-synchronised (incomplete) Census</td><td>1872, under Viceroy Lord Mayo</td></tr><tr><td>First complete and synchronised Census</td><td>1881, under Viceroy Lord Ripon</td></tr><tr><td>Census Commissioner of the first complete Census</td><td>W. C. Plowden</td></tr><tr><td>First Census of a city</td><td>Dacca (Dhaka), 1830, conducted by Henry Walter</td></tr></tbody></table>
      <p class="cp-lead">A non-synchronised Census counts different areas at different times. A synchronised Census counts all areas on the same date, so it is more accurate. The 1881 Census was the first one of this kind, and the regular ten-yearly Census continued from then.</p>
      <div class="cp-example"><b>Worked example:</b> From 1881 to 2011 there are 14 Censuses, one in every tenth year. Adding the 1872 Census gives 15, which is why the 2011 Census is called the 15th Census.</div>
      <div class="cp-note trap">1872 and 1881 are often mixed up. The 1872 Census was incomplete, and the 1881 Census was the first complete one.</div>
      <div class="cp-note exam">Remember the pairs: <b>Mayo 1872 (first), Ripon 1881 (complete).</b></div>
    `
  },
  22: {
    questext: "The first Census in India was held in the year 1872 under which Viceroy?",
    options: ["Lord Mayo", "Lord Ripon", "Lord Curzon", "Lord Dalhousie"],
    correct: "1",
    exptext: "✅ The first Census was held in 1872 under Lord Mayo. 📌 Mayo means the first. ❌ Lord Ripon is tempting, but his name belongs to the first complete Census of 1881."
  },
  23: {
    questext: "The first complete and synchronised Census of India was conducted in which year?",
    options: ["1872", "1891", "1901", "1881"],
    correct: "4",
    exptext: "✅ The 1881 Census, under Lord Ripon, was the first complete and synchronised Census. 📌 Synchronised means all areas counted together. ❌ 1872 is wrong because that Census was incomplete."
  },
  24: {
    questext: "Who was the Census Commissioner of the first complete Census of India?",
    options: ["Henry Walter", "W. C. Plowden", "Lord Ripon", "Lord Mayo"],
    correct: "2",
    exptext: "✅ W. C. Plowden was the Census Commissioner of the 1881 Census. 📌 Plowden is the Census man, while Ripon is the Viceroy. ❌ Lord Ripon is wrong because he was the Viceroy, not the Census Commissioner."
  },
  25: {
    questext: "The first Census of a city in India was conducted in which city in 1830?",
    options: ["Calcutta", "Bombay", "Dacca", "Madras"],
    correct: "3",
    exptext: "✅ The first city Census was in Dacca in 1830, conducted by Henry Walter. 📌 Dacca means 1830. ❌ Calcutta is tempting because it was the capital, but the first city count was not held there."
  },
  26: {
    type: "concept", icon: "📆", accent: "#ec4899", pauseTimer: true,
    title: "Census 2011 — Key Facts and Total Population",
    html: `
      <p class="cp-lead">The 2011 Census is the latest completed Census, so <u>most exam questions are based on its figures</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/15.png" alt="Census of India 2011 logo Our Census Our Future" data-caption="The official poster of the 2011 Census of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/16.png" alt="Bar showing total 1210.2 million split into male 623.7 million (51.54 percent) and female " data-caption="Males were a little more than half of the population." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Registrar General and Census Commissioner</td><td>C. Chandramouli</td></tr><tr><td>Official motto</td><td>Our Census, Our Future</td></tr><tr><td>Coverage</td><td>35 States and Union Territories, 640 districts</td></tr><tr><td>Phase 1: House Listing</td><td>April to September 2010</td></tr><tr><td>Phase 2: Population Enumeration</td><td>9 to 28 February 2011</td></tr><tr><td>Total population</td><td>1210.2 million (about 1.21 billion), 17.5 percent of the world</td></tr><tr><td>Male population</td><td>623.7 million (51.54 percent)</td></tr><tr><td>Female population</td><td>586.5 million (48.46 percent)</td></tr></tbody></table>
      <p class="cp-lead">Enumeration means the actual counting of people. In the first phase the houses were listed, and in the second phase every person was counted.</p>
      <div class="cp-example"><b>Worked example:</b> If males are 51.54 percent of the population, females are 100 minus 51.54, which is 48.46 percent. So there were fewer females than males.</div>
      <div class="cp-note trap">The two phases come in this order: House Listing first (2010), then Population Enumeration (February 2011).</div>
      <div class="cp-note exam">In 2011 the population of India was about 1.21 billion, which was 17.5 percent of the world.</div>
    `
  },
  27: {
    questext: "What was the official motto of the 2011 Census of India?",
    options: ["Our People, Our Nation", "Our Census, Our Future", "Count Everyone", "One Nation, One Census"],
    correct: "2",
    exptext: "✅ The motto was Our Census, Our Future. 📌 Census and future go together. ❌ The other lines sound similar but were not the official motto."
  },
  28: {
    questext: "Consider the following statements about the 2011 Census:\n1. The House Listing phase was held from April to September 2010.\n2. The Population Enumeration phase was held in February 2012.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Listing in 2010, counting in February 2011. ❌ Statement 2 is wrong because the enumeration was held from 9 to 28 February 2011."
  },
  29: {
    questext: "What was the total population of India in the 2011 Census?",
    options: ["1028.7 million", "1100.5 million", "1210.2 million", "1320.4 million"],
    correct: "3",
    exptext: "✅ The total population was 1210.2 million, or about 1.21 billion. 📌 Think of 1.21 billion. ❌ 1028.7 million is wrong because it is the figure of the 2001 Census."
  },
  30: {
    type: "concept", icon: "🗺️", accent: "#06b6d4", pauseTimer: true,
    title: "Population Distribution — Highest and Lowest",
    html: `
      <p class="cp-lead">Some places are crowded and some are almost empty. <u>This page shows which state, Union Territory, district and city have the highest and the lowest population.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/17.png" alt="Horizontal bar chart of the three most populous states: Uttar Pradesh longest, Maharashtra" data-caption="Uttar Pradesh, Maharashtra and Bihar have the largest populations." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/18.png" alt="Dibang Valley Arunachal Pradesh landscape photo" data-caption="Dibang Valley in Arunachal Pradesh, the least populated district." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/19.png" alt="Mumbai city skyline aerial photo" data-caption="Mumbai, the most populated city in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Category</th><th>Highest</th><th>Lowest</th></tr></thead><tbody><tr><td>State</td><td>Uttar Pradesh (16 percent of India), then Maharashtra, then Bihar</td><td>Sikkim, then Mizoram, then Arunachal Pradesh</td></tr><tr><td>Union Territory</td><td>Delhi</td><td>Lakshadweep</td></tr><tr><td>District</td><td>Thane (Maharashtra)</td><td>Dibang Valley (Arunachal Pradesh)</td></tr><tr><td>City</td><td>Mumbai</td><td>Kapurthala</td></tr></tbody></table>
      <p class="cp-lead">About one out of every six Indians lives in Uttar Pradesh alone. Among Union Territories by area, Ladakh is the largest and Lakshadweep is the smallest.</p>
      <div class="cp-example"><b>Worked example:</b> Uttar Pradesh has 16 percent of India's people. Since 16 is close to one sixth of 100, we can say about one in every six Indians lives there.</div>
      <div class="cp-note trap">Sikkim has the lowest population among states, but Arunachal Pradesh has the lowest population density. Do not mix the two.</div>
      <div class="cp-note exam">Remember the district pair: <b>Thane is the highest and Dibang Valley is the lowest.</b></div>
    `
  },
  31: {
    questext: "Which district of India has the highest population according to the 2011 Census?",
    options: ["Kolkata", "Pune", "North 24 Parganas", "Thane"],
    correct: "4",
    exptext: "✅ Thane in Maharashtra has the highest population among districts. 📌 Think of Thane near Mumbai. ❌ North 24 Parganas is tempting, but its population is lower than that of Thane."
  },
  32: {
    questext: "Which state has the lowest population in India?",
    options: ["Goa", "Sikkim", "Mizoram", "Arunachal Pradesh"],
    correct: "2",
    exptext: "✅ Sikkim has the lowest population among states. 📌 Sikkim first, then Mizoram, then Arunachal Pradesh. ❌ Arunachal Pradesh is tempting because it has the lowest density, but its population is larger than that of Sikkim."
  },
  33: {
    questext: "Consider the following statements about population distribution:\n1. Uttar Pradesh is the most populous state.\n2. Lakshadweep has the highest population among Union Territories.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Delhi is the biggest Union Territory by population. ❌ Statement 2 is wrong because Lakshadweep has the lowest population, not the highest."
  },
  34: {
    type: "concept", icon: "📈", accent: "#0891b2", pauseTimer: true,
    title: "Growth Rate of Population",
    html: `
      <p class="cp-lead">The growth rate shows <u>how fast the population increases</u>. The <b>decadal growth rate</b> is the percent rise in population during ten years.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/20.png" alt="Line chart of decadal growth rate of India: 1951 13.31, 1961 21.51, 1971 24.80, 1981 24.66" data-caption="The decadal growth rate peaked in 1971 and has fallen since." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/21.png" alt="1918 influenza epidemic India historical photo" data-caption="The influenza epidemic of 1918 caused many deaths in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Category</th><th>Highest growth</th><th>Lowest growth</th></tr></thead><tbody><tr><td>State</td><td>Meghalaya (27.8 percent), then Arunachal Pradesh, then Bihar</td><td>Nagaland (minus 0.47 percent), then Kerala, then Goa</td></tr><tr><td>Union Territory</td><td>Dadra and Nagar Haveli (55.5 percent)</td><td>Not given</td></tr><tr><td>District</td><td>Kurung Kumey, Arunachal Pradesh (111 percent)</td><td>Longleng, Nagaland</td></tr></tbody></table>
      <p class="cp-lead">Between 2001 and 2011 the average yearly growth rate was 1.64 percent, and the decadal growth rate was 17.64 percent (male 17.19 percent and female 18.12 percent). The population rose by 181 million, from 1028.7 million to 1210.2 million. Earlier, India had 238 million people in 1901 and 361 million in 1951.</p>
      <div class="cp-note trap">The highest decadal growth was 24.8 percent in 1961 to 1971. The lowest was minus 0.31 percent in 1911 to 1921, when the population fell.</div>
      <div class="cp-note info">The period 1911 to 1921 is called the Year of Great Divide because famine, plague and the influenza epidemic caused many deaths.</div>
    `
  },
  35: {
    questext: "In which decade did India record the highest decadal population growth rate of 24.8 percent?",
    options: ["1951 to 1961", "1961 to 1971", "1971 to 1981", "1981 to 1991"],
    correct: "2",
    exptext: "✅ The highest decadal growth rate was in 1961 to 1971. 📌 Sixty-one to seventy-one is the peak. ❌ 1971 to 1981 is tempting because the rate was almost the same, but it was slightly lower."
  },
  36: {
    questext: "Which decade is known as the Year of Great Divide in the population history of India?",
    options: ["1901 to 1911", "1921 to 1931", "1911 to 1921", "1931 to 1941"],
    correct: "3",
    exptext: "✅ The decade 1911 to 1921 is called the Year of Great Divide because the growth rate was minus 0.31 percent. 📌 Famine, plague and influenza cut the population. ❌ 1921 to 1931 is wrong because after 1921 the population began to rise fast."
  },
  37: {
    questext: "Which state recorded the lowest (negative) decadal growth rate in the 2011 Census?",
    options: ["Kerala", "Goa", "Bihar", "Nagaland"],
    correct: "4",
    exptext: "✅ Nagaland recorded a negative growth rate of minus 0.47 percent. 📌 Nagaland is the only one below zero. ❌ Kerala is tempting because its growth is also very low, but it is still positive."
  },
  38: {
    questext: "Which state recorded the highest decadal growth rate in the 2011 Census?",
    options: ["Meghalaya", "Bihar", "Arunachal Pradesh", "Uttar Pradesh"],
    correct: "1",
    exptext: "✅ Meghalaya recorded the highest growth rate of 27.8 percent. 📌 Meghalaya, then Arunachal, then Bihar. ❌ Bihar is tempting because it is a very populous state, but its growth rate is lower than that of Meghalaya."
  },
  39: {
    type: "concept", icon: "👶", accent: "#b45309", pauseTimer: true,
    title: "Child Population (0 to 6 Years)",
    html: `
      <p class="cp-lead">The child population means the number of children <u>from birth up to six years of age</u>. It matters because it tells us about the future size of the population.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/22.png" alt="Simple picture of 100 small person icons with 13 coloured in a different colour and labell" data-caption="About thirteen out of every hundred Indians are aged six or below." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Census/23.png" alt="Anganwadi children India photo" data-caption="Young children at an Anganwadi centre in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Fact</th><th>Detail</th></tr></thead><tbody><tr><td>Child population (0 to 6 years)</td><td>158.8 million</td></tr><tr><td>Share of total population</td><td>13.1 percent</td></tr><tr><td>Change compared with 2001</td><td>Decreased by 3.08 percent</td></tr></tbody></table>
      <p class="cp-lead">The number of children fell compared with 2001, even though the total population rose. This shows that families were having fewer children.</p>
      <div class="cp-example"><b>Worked example:</b> If 13.1 percent of 1210.2 million people are children, the number is close to 158.8 million. This matches the figure given for children aged 0 to 6 years.</div>
      <div class="cp-note trap">The age group is 0 to 6 years, not 0 to 14 years. Child sex ratio also uses the 0 to 6 years group.</div>
      <div class="cp-note exam">The child population fell by 3.08 percent from 2001 to 2011.</div>
    `
  },
  40: {
    questext: "What was the share of the child population (0 to 6 years) in the total population in the 2011 Census?",
    options: ["11.1 percent", "12.5 percent", "15.9 percent", "13.1 percent"],
    correct: "4",
    exptext: "✅ The share was 13.1 percent, or 158.8 million children. 📌 Thirteen children in every hundred. ❌ 15.9 percent is wrong because that is too high for 2011."
  },
  41: {
    questext: "The child population in the 2011 Census was 158.8 million. How did it change compared with the 2001 Census?",
    options: ["It increased by 3.08 percent", "It decreased by 3.08 percent", "It remained the same", "It doubled"],
    correct: "2",
    exptext: "✅ The child population decreased by 3.08 percent. 📌 The total grew but children fell. ❌ An increase is wrong because fewer children were counted in 2011."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Census/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a gathering of small, elegant people figures forming the outline of India, a gold-lined magnifying glass and a subtle rising population chart line" },
  "images/General_Awareness/Economics/Census/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Census enumerator visiting house India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/1.png. a Census worker collecting family details at a house door",
  "images/General_Awareness/Economics/Census/2.png": { t: "fig", about: "Timeline of world population milestones: 5 billion on 11 July 1987, then World Population Day on 11 July, each in a rounded box." },
  "images/General_Awareness/Economics/Census/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Thomas Robert Malthus portrait painting\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/3.png. portrait of Thomas Malthus",
  "images/General_Awareness/Economics/Census/4.png": { t: "fig", about: "Line graph: population as a steeply rising curve labelled Population (1, 2, 4, 8, 16) and food grain as a gently rising straight line labelled Food grain (1, 2, 3, 4, 5), the gap between them labelled Shortage of food." },
  "images/General_Awareness/Economics/Census/5.png": { t: "fig", about: "Two-column picture: Positive checks (floods, droughts, epidemics, earthquakes, wars) adopted by nature, and Preventive checks (late marriage, celibacy) adopted by humans." },
  "images/General_Awareness/Economics/Census/6.png": { t: "fig", about: "Inverted-U hill curve: horizontal axis Population, vertical axis Per capita production, the peak labelled Optimum population, the left side labelled Under-populated and the right side labelled Over-populated." },
  "images/General_Awareness/Economics/Census/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"crowded railway platform India rush hour photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/7.png. a very crowded place to show too many people for the resources",
  "images/General_Awareness/Economics/Census/8.png": { t: "fig", about: "Graph with five stages along the bottom: birth rate line and death rate line, the gap between them shaded and labelled Population growth, Stage 1 both high, Stage 2 death rate falls, Stage 5 birth rate below death rate." },
  "images/General_Awareness/Economics/Census/9.png": { t: "fig", about: "Five boxes in a row labelled Stage 1 to Stage 5 with India marked: before 1921 in Stage 1, 1921 to 1951 in Stage 2, now in Stage 3." },
  "images/General_Awareness/Economics/Census/10.png": { t: "fig", about: "Inverted-U curve: horizontal axis Per capita income, vertical axis Fertility, the left side labelled Fertility rises and the right side labelled Fertility falls." },
  "images/General_Awareness/Economics/Census/11.png": { t: "fig", about: "Three boxes joined by arrows: Low income, Middle income with highest fertility, High income with falling fertility." },
  "images/General_Awareness/Economics/Census/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Mayo Viceroy of India portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/12.png. portrait of Lord Mayo, Viceroy of India in 1872",
  "images/General_Awareness/Economics/Census/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Lord Ripon Viceroy of India portrait\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/13.png. portrait of Lord Ripon, Viceroy of India in 1881",
  "images/General_Awareness/Economics/Census/14.png": { t: "fig", about: "Timeline with five boxes: 1830 Dacca city Census, 1872 first Census, 1881 first complete Census, 1948 Census Act, 1951 first Census after independence." },
  "images/General_Awareness/Economics/Census/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Census of India 2011 logo Our Census Our Future\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/15.png. the official Census 2011 logo or poster",
  "images/General_Awareness/Economics/Census/16.png": { t: "fig", about: "Bar showing total 1210.2 million split into male 623.7 million (51.54 percent) and female 586.5 million (48.46 percent)." },
  "images/General_Awareness/Economics/Census/17.png": { t: "fig", about: "Horizontal bar chart of the three most populous states: Uttar Pradesh longest, Maharashtra second, Bihar third, each bar labelled." },
  "images/General_Awareness/Economics/Census/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Dibang Valley Arunachal Pradesh landscape photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/18.png. mountain valley with very few people",
  "images/General_Awareness/Economics/Census/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mumbai city skyline aerial photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/19.png. dense city skyline",
  "images/General_Awareness/Economics/Census/20.png": { t: "fig", about: "Line chart of decadal growth rate of India: 1951 13.31, 1961 21.51, 1971 24.80, 1981 24.66, 1991 23.87, 2001 21.54, 2011 17.64, with the peak at 1971 marked." },
  "images/General_Awareness/Economics/Census/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"1918 influenza epidemic India historical photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/21.png. a historical photo of the influenza epidemic",
  "images/General_Awareness/Economics/Census/22.png": { t: "fig", about: "Simple picture of 100 small person icons with 13 coloured in a different colour and labelled 13.1 percent are children aged 0 to 6 years." },
  "images/General_Awareness/Economics/Census/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Anganwadi children India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Census/23.png. young children at an anganwadi centre"
});

/* CHANGE LOG
   - India is now the most populous country in the world (it passed China in 2023); the older line that called it the second most populous country was replaced.
   - The 2021 Census was delayed and was not held; the next Census has the reference date of 1 March 2027 and will be India's first digital Census with caste enumeration. The older line 'next expected in late 2024' was replaced.
   - Delimitation freeze: the 84th Amendment (2001) freezes the number of seats until the first Census taken after the year 2026, not 'till 2026'.
   - Frank Notestein is credited with systematising the Demographic Transition theory; the label 'Father of Demography' was removed because it is usually given to John Graunt.
   - The 'Father of Indian Census' label was removed because books differ; the facts about Henry Walter (Dacca, 1830) and Lord Mayo (1872) are stated directly.
   - Female population 2011 corrected to 586.5 million (the earlier figure 585.5 million did not match the total).
   - Bihar literacy in 2011 corrected to 63.82 percent; Lakshadweep and Mizoram literacy figures were not given in exact numbers because the earlier figures were doubtful.
   - Census 2011 was not a digital Census; the line calling it the first e-Census was removed.
   - The founder of the Demographic Transition theory is written as Warren Thompson (1929).
   - Largest Union Territory by area is written as Ladakh (since 2019) instead of Andaman and Nicobar Islands.
   - The 3.08 percent fall is written as a fall in the number of children, and the doubtful highest and lowest child population lists were left out.
*/