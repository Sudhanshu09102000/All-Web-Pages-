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

/* Field: General_Awareness · Subject: Economics · Chapter: Classification_of_Economies · 7 concept pages (+ overview) · 13 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌍", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Classification of Economies",
    thumb: {
      image: "images/General_Awareness/Economics/Classification_of_Economies/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "TYPES OF ECONOMY",
      line2: "CAPITALIST • SOCIALIST • MIXED",
      line3: "FULL CHAPTER",
      badge: "COMPLETE",
      ribbon: "NOTES • FACTS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Classification of Economies | Capitalist, Socialist, Mixed | General Awareness",
      altTitles: ["Types of Economy in One Video for All Government Exams", "Capitalism, Socialism, Mixed Economy and World Bank Income Groups"],
      description: "Classification of Economies is a short and scoring chapter of Economics in General Awareness. In this class we learn it step by step in simple words.\n\n📌 IN THIS CLASS\n✅ Capitalist, socialist and mixed economy\n✅ Agricultural, industrial and service economy\n✅ Developed, developing and least developed economy\n✅ India as a lower middle income economy\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#Economy #GeneralAwareness #Economics",
      tags: ["classification of economies", "types of economy", "capitalist economy", "socialist economy", "mixed economy", "adam smith", "karl marx", "keynes", "laissez faire", "pump priming", "service economy", "agricultural economy", "world bank income groups", "developed developing economy", "per capita income", "lower middle income india", "economics for ssc", "general awareness", "static gk economics", "government exam economics", "indian economy basics", "economic systems", "free economy", "public sector private sector", "ssification of Economies Ec"],
      hashtags: ["Economy", "GeneralAwareness", "Economics"],
      thumbText: "TYPES OF ECONOMY FULL CHAPTER",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "🌍 New class is live: Classification of Economies. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "Economics — General Awareness Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how economies are classified</u>: by the role of the government, by the sector that earns the most, and by the stage of development. Every exam asks direct questions from this chapter.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>7</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>13</b><span>Questions</span></div>
        <div class="cp-stat"><b>~27 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Types of Economy by Government Role</b><br>Capitalist, socialist and mixed economies: who owns the resources, who sets prices, and what is good and bad in each.</li>
        <li><b>Classification by Sector Contribution</b><br>Agricultural, industrial and service economies, and why India is a service economy by income but an agricultural economy by jobs.</li>
        <li><b>Classification by Stage of Development</b><br>Developed, developing and least developed economies as grouped by the World Bank using per capita income.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> Founders of each system, examples, the sector order and the World Bank group of India are favourite one-line questions.</div>
    `
  },
  2: {
    type: "concept", icon: "🧭", accent: "#22c55e", pauseTimer: true,
    title: "Types of Economy by Government Role",
    html: `
      <p class="cp-lead">An economy can be classified by how much the government interferes in it. <u>On this basis there are three types: capitalist, socialist and mixed.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/1.png" alt="Spectrum line from left to right: Capitalist Economy (no government control), Mixed Econom" data-caption="Three economies arranged by the amount of government control." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/2.png" alt="Three coloured boxes: Capitalist Economy, Socialist Economy, Mixed Economy, each with one " data-caption="The three types of economy based on government intervention." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Government role</th><th>Ownership of resources</th></tr></thead><tbody><tr><td>Capitalist</td><td>No intervention</td><td>Private sector</td></tr><tr><td>Socialist</td><td>Full control</td><td>Public sector, that is the government</td></tr><tr><td>Mixed</td><td>Indirect intervention</td><td>Both private and public sectors</td></tr></tbody></table>
      <p class="cp-lead">The key question is: who owns the land, factories and other resources, and who decides what to produce and at what price? The three types give three different answers.</p>
      <div class="cp-note trap">Do not think a pure capitalist or a pure socialist economy exists in the modern world. Most countries today are close to mixed.</div>
      <div class="cp-note exam">Remember the three names and their founders: Adam Smith, Karl Marx and J. M. Keynes.</div>
    `
  },
  3: {
    questext: "On the basis of government intervention, economies are classified into how many types?",
    options: ["Three", "Two", "Four", "Five"],
    correct: "1",
    exptext: "✅ There are three types: capitalist, socialist and mixed. 📌 Think: private, public, both. ❌ Two is wrong because it leaves out the mixed economy."
  },
  4: {
    type: "concept", icon: "💼", accent: "#f59e0b", pauseTimer: true,
    title: "Capitalist Economy (Capitalism)",
    html: `
      <p class="cp-lead">In a capitalist economy the market is free and resources belong to private owners. <u>Adam Smith is called the Father of Capitalism.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/3.png" alt="Balance diagram: left side labelled Advantages with Economic freedom, growth, innovation, " data-caption="The main advantages and the main disadvantage of a capitalist economy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/4.png" alt="The Wealth of Nations Adam Smith book first edition photo" data-caption="The Wealth of Nations by Adam Smith, the founding book of capitalism." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Father of Capitalism</td><td>Adam Smith</td></tr><tr><td>Book</td><td>The Wealth of Nations</td></tr><tr><td>Policy</td><td>Laissez-faire (non-intervention)</td></tr><tr><td>Government role</td><td>No intervention</td></tr><tr><td>Type</td><td>Free economy</td></tr><tr><td>Ownership</td><td>Private sector</td></tr><tr><td>Examples</td><td>USA, Western Europe, Canada and Australia</td></tr></tbody></table>
      <p class="cp-lead">Laissez-faire is a French phrase that means "let them do". It says the government should leave the market alone. Supply and demand are free from government control, and individuals can own and trade property freely.</p>
      <table><thead><tr><th>Advantage (due to freedom)</th><th>Disadvantage</th></tr></thead><tbody><tr><td>Full economic freedom</td><td>Income inequality rises</td></tr><tr><td>Economic activity and growth rise</td><td>The rich-poor divide widens</td></tr><tr><td>Unemployment and poverty fall</td><td>No safety net for the weaker sections</td></tr><tr><td>Innovation and start-ups grow</td><td>Wealth stays with private owners</td></tr><tr><td>No monopoly, healthy competition</td><td></td></tr><tr><td>Better quality and lower prices</td><td></td></tr></tbody></table>
      <div class="cp-note trap">The same freedom that creates growth also creates inequality, because there is no government help for the weak.</div>
      <div class="cp-note exam">Remember: Adam Smith, The Wealth of Nations, laissez-faire, free economy.</div>
    `
  },
  5: {
    questext: "Who is known as the Father of Capitalism?",
    options: ["Karl Marx", "J. M. Keynes", "Adam Smith", "Amartya Sen"],
    correct: "2",
    exptext: "✅ Adam Smith, author of The Wealth of Nations, is the Father of Capitalism. 📌 Smith, Shop, Single market. ❌ Karl Marx is wrong because he is linked with socialism."
  },
  6: {
    questext: "Which policy is associated with a capitalist economy?",
    options: ["Pump priming", "Public ownership", "Five-year planning", "Laissez-faire"],
    correct: "4",
    exptext: "✅ Laissez-faire means non-intervention by the government. 📌 Leave it alone. ❌ Pump priming is wrong because it is government spending used in a mixed economy."
  },
  7: {
    type: "concept", icon: "☭", accent: "#ef4444", pauseTimer: true,
    title: "Socialist Economy (Socialism)",
    html: `
      <p class="cp-lead">In a socialist economy the government owns the resources and controls the market. <u>Karl Marx is called the Father of Socialism.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/5.png" alt="Balance diagram: left side Advantage with income equality and no rich-poor divide; right s" data-caption="A socialist economy gives equality but weakens growth and choice." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/6.png" alt="Soviet Union flag and Moscow Kremlin photo" data-caption="The Kremlin in Moscow, the centre of the former Soviet Union." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Father of Socialism</td><td>Karl Marx</td></tr><tr><td>Example</td><td>The former USSR (Soviet Union)</td></tr><tr><td>Ownership</td><td>100 percent public sector</td></tr><tr><td>Private sector</td><td>Not present</td></tr><tr><td>Resources</td><td>Fully under government control</td></tr><tr><td>Supply and demand</td><td>Controlled by the government</td></tr></tbody></table>
      <p class="cp-lead">Because the government decides everything, incomes are close to equal and there is no rich-poor gap. But people have no economic freedom, so there is less innovation and growth, and a monopoly of the government can lower quality and raise prices.</p>
      <div class="cp-note trap">Socialism gives equality, not growth. It is the opposite of capitalism in almost every row of the table.</div>
      <div class="cp-note exam">Remember: Karl Marx, USSR, 100 percent public sector.</div>
    `
  },
  8: {
    questext: "In which type of economy is there no private sector and the government controls all resources?",
    options: ["Capitalist economy", "Mixed economy", "Socialist economy", "Free economy"],
    correct: "2",
    exptext: "✅ A socialist economy has full government ownership. 📌 Socialist means state-owned. ❌ Mixed economy is wrong because it has both private and public sectors."
  },
  9: {
    questext: "Consider the following statements about a socialist economy:\n1. It gives income equality and no rich-poor divide.\n2. It encourages a strong start-up culture and healthy competition.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Equality is the one big gain. ❌ Statement 2 is wrong because lack of freedom reduces innovation and competition."
  },
  10: {
    type: "concept", icon: "⚖️", accent: "#8b5cf6", pauseTimer: true,
    title: "Mixed Economy",
    html: `
      <p class="cp-lead">A mixed economy has both a private sector and a public sector. <u>The government does not control everything, but it guides the economy and cares for weaker sections.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/7.png" alt="Venn style picture: left circle Private Sector, right circle Public Sector, overlap labell" data-caption="A mixed economy combines the private sector and the public sector." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/8.png" alt="Pump diagram: government spending flows into the economy like water priming a pump, leadin" data-caption="Pump priming: government spending that starts the flow of growth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Feature</th><th>Detail</th></tr></thead><tbody><tr><td>Linked thinker</td><td>John Maynard Keynes</td></tr><tr><td>Theory</td><td>Pump Priming Theory</td></tr><tr><td>Government role</td><td>Indirect intervention</td></tr><tr><td>Sectors</td><td>Both private and public</td></tr><tr><td>Example</td><td>India</td></tr><tr><td>Purpose</td><td>Welfare of poorer sections of society</td></tr></tbody></table>
      <p class="cp-lead">Pump priming means the government spends money at the start, like pouring a little water into a pump, so that private spending and growth begin to flow. In a mixed economy, supply and demand work freely, but under government watch. Private property exists, and economic freedom exists with rules.</p>
      <table><thead><tr><th>Impact on the economy</th><th>Result</th></tr></thead><tbody><tr><td>Economic activities and GDP growth</td><td>Rise</td></tr><tr><td>Unemployment and poverty</td><td>Fall</td></tr><tr><td>Innovation and start-up culture</td><td>Rise</td></tr><tr><td>Monopoly</td><td>Absent; healthy competition</td></tr><tr><td>Quality of goods and services</td><td>Rises</td></tr><tr><td>Prices, inequality and rich-poor divide</td><td>Fall</td></tr></tbody></table>
      <div class="cp-note trap">A mixed economy is not half-capitalist and half-socialist at random. It allows the market to work and uses the government to protect the weak.</div>
      <div class="cp-note exam">Remember: Keynes, pump priming, India, both sectors.</div>
    `
  },
  11: {
    questext: "India is an example of which type of economy?",
    options: ["Capitalist economy", "Socialist economy", "Mixed economy", "Traditional economy"],
    correct: "2",
    exptext: "✅ India has both private and public sectors, so it is a mixed economy. 📌 India equals mix. ❌ Capitalist economy is wrong because India does not leave everything to private owners."
  },
  12: {
    questext: "The Pump Priming Theory is associated with:",
    options: ["Adam Smith", "Karl Marx", "J. M. Keynes", "Alfred Marshall"],
    correct: "2",
    exptext: "✅ J. M. Keynes supported government spending to start growth. 📌 K for Keynes, K for kick-start. ❌ Adam Smith is wrong because he supported non-intervention."
  },
  13: {
    type: "concept", icon: "🏭", accent: "#14b8a6", pauseTimer: true,
    title: "Classification Based on Sector Contribution",
    html: `
      <p class="cp-lead">Economies can also be classified by the sector that contributes the most to the income and jobs of the country. <u>The three sectors are agriculture, industry and services.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/9.png" alt="Three-step staircase. Under-developed: Agriculture greater than Industry greater than Serv" data-caption="The sector order of under-developed, developing and developed countries." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/10.png" alt="Three icons: a farmer with a plough, a factory chimney, a laptop with a bank, labelled Agr" data-caption="The three sector-based types of economy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Characteristic of</th><th>Sector order</th></tr></thead><tbody><tr><td>Agricultural economy</td><td>Under-developed countries</td><td>Agriculture, then Industry, then Service</td></tr><tr><td>Industrial or manufacturing economy</td><td>Developing countries</td><td>Industry, then Service, then Agriculture</td></tr><tr><td>Service economy</td><td>Developed countries</td><td>Service, then Industry, then Agriculture</td></tr></tbody></table>
      <p class="cp-lead">As a country grows richer, people move from farming to factories and finally to services such as banking, trade, transport and information technology.</p>
      <div class="cp-note trap">The order of sectors changes with the stage of development. Do not memorise one fixed order for all countries.</div>
      <div class="cp-note exam">Remember: agriculture for poor countries, industry for developing countries, services for rich countries.</div>
    `
  },
  14: {
    questext: "A service economy is generally the characteristic of:",
    options: ["Under-developed countries", "Least developed countries", "Developed countries", "Tribal economies"],
    correct: "3",
    exptext: "✅ In developed countries the service sector is the largest. 📌 Rich countries serve, poor countries farm. ❌ Under-developed countries are wrong because their largest sector is agriculture."
  },
  15: {
    type: "concept", icon: "🇮🇳", accent: "#3b82f6", pauseTimer: true,
    title: "Indian Economy: Dual Classification",
    html: `
      <p class="cp-lead">India has two different labels depending on what is measured. <u>By income India is a service economy, but by jobs India is an agricultural economy.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/11.png" alt="Two pie style cards. Card 1 Contribution to GDP: Service 55 to 57 percent, Industry 26 to " data-caption="India by share of GDP and by share of employment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/12.png" alt="Two arrows from India: one to the label Service Economy by GDP, another to the label Agric" data-caption="India is a service economy by income and an agricultural economy by employment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Basis</th><th>Sector order</th><th>India is a...</th></tr></thead><tbody><tr><td>Contribution to GDP</td><td>Service (55 to 57 percent), then Industry (26 to 28 percent), then Agriculture (15 to 17 percent)</td><td>Service economy</td></tr><tr><td>Contribution to employment</td><td>Agriculture employs the largest share of workers</td><td>Agricultural economy</td></tr></tbody></table>
      <p class="cp-lead">This gap means that a very large number of workers earn income from a sector that produces a small share of the national income. That is one reason why many Indian farm families have low incomes.</p>
      <div class="cp-note trap">Do not say India is only a service economy or only an agricultural economy. The answer depends on the basis in the question.</div>
      <div class="cp-note exam">GDP basis gives Service; employment basis gives Agriculture.</div>
    `
  },
  16: {
    questext: "On the basis of contribution to Gross Domestic Product, India is considered a:",
    options: ["Service economy", "Agricultural economy", "Manufacturing economy", "Mining economy"],
    correct: "1",
    exptext: "✅ The service sector has the largest share of India's GDP. 📌 GDP equals service. ❌ Agricultural economy is wrong because that label comes from the employment basis."
  },
  17: {
    questext: "On the basis of employment structure, India is generally classified as a/an:",
    options: ["Service economy", "Industrial economy", "Mixed service economy", "Agricultural economy"],
    correct: "4",
    exptext: "✅ Agriculture employs the largest share of workers. 📌 Jobs equals farms. ❌ Service economy is wrong because that is the label on the GDP basis."
  },
  18: {
    type: "concept", icon: "💵", accent: "#ec4899", pauseTimer: true,
    title: "Classification Based on Stage of Development",
    html: `
      <p class="cp-lead">The World Bank divides economies by <b>Per Capita Income (PCI)</b>. <u>The groups are high income, middle income and low income, which are often called developed, developing and least developed.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/13.png" alt="Three ladder steps: Low Income (poor countries, least developed), Middle Income with two s" data-caption="The income ladder of the World Bank, with India on the lower middle step." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Classification_of_Economies/14.png" alt="Formula picture: Per Capita Income equals Total National Income divided by Total Populatio" data-caption="Per capita income is the national income shared among all people of the country." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-formula" translate="no"><small>Per Capita Income (PCI)</small>PCI = Total National Income ÷ Total Population</div>
      <table><thead><tr><th>Group</th><th>Also called</th><th>World Bank income limits (from July 2026)</th></tr></thead><tbody><tr><td>Developed (High income)</td><td>Rich countries</td><td>More than 14,375 US dollars</td></tr><tr><td>Developing (Middle income): Upper middle</td><td>Middle PCI countries</td><td>4,636 to 14,375 US dollars</td></tr><tr><td>Developing (Middle income): Lower middle</td><td>Middle PCI countries</td><td>1,176 to 4,635 US dollars</td></tr><tr><td>Least developed (Low income)</td><td>Poor countries</td><td>1,175 US dollars or less</td></tr></tbody></table>
      <p class="cp-lead">The World Bank uses Gross National Income per capita to place a country in a group, and it updates the limits every July. India is placed in the Lower Middle Income group, so it is called a developing economy.</p>
      <div class="cp-example"><b>Example:</b> If a country has a total national income of 100 units and a population of 10 persons, its per capita income is 10 units. A country with a larger PCI is richer on average.</div>
      <div class="cp-note trap">Per capita income is an average. It does not show how fairly the income is shared among people.</div>
      <div class="cp-note exam">India is a lower middle income, developing economy according to the World Bank.</div>
    `
  },
  19: {
    questext: "According to the World Bank criteria, India is classified as a:",
    options: ["High income economy", "Upper middle income economy", "Low income economy", "Lower middle income economy"],
    correct: "4",
    exptext: "✅ India falls in the Lower Middle Income group, which makes it a developing economy. 📌 India is in the lower middle rung. ❌ Upper middle income is wrong because India's per capita income is below that limit."
  },
  20: {
    questext: "Per capita income is calculated as:",
    options: ["Total national income divided by total population", "Total population divided by total national income", "Total exports minus total imports", "Total savings divided by total investment"],
    correct: "1",
    exptext: "✅ Per capita income is the national income divided by the population. 📌 Per head means divide by heads. ❌ Population divided by income is wrong because it flips the formula."
  },
  21: {
    questext: "Which institution decides whether a country is developed, developing or least developed on the basis of per capita income?",
    options: ["International Monetary Fund", "World Trade Organization", "World Bank", "United Nations Development Programme"],
    correct: "3",
    exptext: "✅ The World Bank groups countries by per capita income. 📌 Bank with the income groups. ❌ The International Monetary Fund is wrong because it focuses on exchange rates and balance of payments."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Classification_of_Economies/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a globe, a few real-looking gold coins, a small factory silhouette and a subtle rising chart line" },
  "images/General_Awareness/Economics/Classification_of_Economies/1.png": { t: "fig", about: "Spectrum line from left to right: Capitalist Economy (no government control), Mixed Economy (indirect control), Socialist Economy (full government control)." },
  "images/General_Awareness/Economics/Classification_of_Economies/2.png": { t: "fig", about: "Three coloured boxes: Capitalist Economy, Socialist Economy, Mixed Economy, each with one icon (a shop, a government building, both together)." },
  "images/General_Awareness/Economics/Classification_of_Economies/3.png": { t: "fig", about: "Balance diagram: left side labelled Advantages with Economic freedom, growth, innovation, healthy competition; right side labelled Disadvantage with Income inequality and rich-poor divide." },
  "images/General_Awareness/Economics/Classification_of_Economies/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"The Wealth of Nations Adam Smith book first edition photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Classification_of_Economies/4.png. a photo of the first edition of the famous book",
  "images/General_Awareness/Economics/Classification_of_Economies/5.png": { t: "fig", about: "Balance diagram: left side Advantage with income equality and no rich-poor divide; right side Disadvantages with no freedom, low growth, high unemployment, monopoly, high prices, no competition." },
  "images/General_Awareness/Economics/Classification_of_Economies/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Soviet Union flag and Moscow Kremlin photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Classification_of_Economies/6.png. a photo showing the Kremlin in Moscow",
  "images/General_Awareness/Economics/Classification_of_Economies/7.png": { t: "fig", about: "Venn style picture: left circle Private Sector, right circle Public Sector, overlap labelled Mixed Economy with India." },
  "images/General_Awareness/Economics/Classification_of_Economies/8.png": { t: "fig", about: "Pump diagram: government spending flows into the economy like water priming a pump, leading to more output and jobs." },
  "images/General_Awareness/Economics/Classification_of_Economies/9.png": { t: "fig", about: "Three-step staircase. Under-developed: Agriculture greater than Industry greater than Service. Developing: Industry greater than Service greater than Agriculture. Developed: Service greater than Industry greater than Agriculture." },
  "images/General_Awareness/Economics/Classification_of_Economies/10.png": { t: "fig", about: "Three icons: a farmer with a plough, a factory chimney, a laptop with a bank, labelled Agricultural, Industrial or Manufacturing, Service economy." },
  "images/General_Awareness/Economics/Classification_of_Economies/11.png": { t: "fig", about: "Two pie style cards. Card 1 Contribution to GDP: Service 55 to 57 percent, Industry 26 to 28 percent, Agriculture 15 to 17 percent. Card 2 Employment: Agriculture employs the largest share of workers." },
  "images/General_Awareness/Economics/Classification_of_Economies/12.png": { t: "fig", about: "Two arrows from India: one to the label Service Economy by GDP, another to the label Agricultural Economy by employment." },
  "images/General_Awareness/Economics/Classification_of_Economies/13.png": { t: "fig", about: "Three ladder steps: Low Income (poor countries, least developed), Middle Income with two sub-steps Lower Middle and Upper Middle (developing), High Income (rich countries, developed). India is marked on Lower Middle." },
  "images/General_Awareness/Economics/Classification_of_Economies/14.png": { t: "fig", about: "Formula picture: Per Capita Income equals Total National Income divided by Total Population, with a pie being shared among many people." }
});

/* CHANGE LOG
   - World Bank income limits are updated to the current ones (effective 1 July 2026): low income up to 1,175 US dollars, lower middle 1,176 to 4,635, upper middle 4,636 to 14,375, high above 14,375. The limits change every July, so questions in this set test the group, not the number.
   - World Bank uses Gross National Income per capita (Atlas method); 'developed' and 'least developed' are taught as high income and low income groups.
   - The 'invisible hand' phrase belongs to Adam Smith's free market, so it is not used for government. Keynes is taught as the thinker who supported government spending (pump priming).
   - Employment: agriculture employs the largest share of workers in India; the order of the other two sectors is not fixed, because it changes between surveys.
   - The USSR is described as a former socialist country (it broke up in 1991).
*/