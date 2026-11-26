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

/* Field: General_Awareness · Subject: Economics · Chapter: External_Sector_of_India · 12 concept pages (+ overview) · 28 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🌍", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — External Sector of India",
    thumb: {
      image: "images/General_Awareness/Economics/External_Sector_of_India/thumbnail.png",
      banner: "ECONOMICS • GENERAL AWARENESS",
      line1: "EXTERNAL SECTOR",
      line2: "BALANCE OF PAYMENTS",
      line3: "EXCHANGE RATE",
      badge: "FULL CHAPTER",
      ribbon: "BoP • FOREX • TRADE • WTO",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "External Sector of India in One Class | Balance of Payments, Forex, WTO | SSC CGL",
      altTitles: ["Current Account vs Capital Account Easy Trick", "FDI vs FPI and Devaluation vs Depreciation Explained"],
      description: "The external sector is a favourite topic of the Staff Selection Commission exams. In this class we learn the Balance of Payments, forex reserves, exchange rates, trade barriers and the World Trade Organization in a simple order.\n\n📌 IN THIS CLASS\n✅ Balance of Payments and its crisis\n✅ Forex reserve and Special Drawing Rights\n✅ Current account and capital account\n✅ Exchange rate and trade\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #BalanceOfPayments #Economics",
      tags: ["external sector of india", "balance of payments", "bop crisis", "current account deficit", "capital account", "fdi vs fpi", "forex reserve", "special drawing rights", "devaluation vs depreciation", "exchange rate", "wto", "economics for ssc cgl", "general awareness economics", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "important questions", "concept class", "one shot", "static GK", "External Sector of India class", "External Sector o"],
      hashtags: ["SSCCGL", "BalanceOfPayments", "Economics"],
      thumbText: "EXTERNAL SECTOR OF INDIA",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📊 New class is live: External Sector of India with Balance of Payments, forex, exchange rate and WTO. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "General Awareness — Economics"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how India deals with the rest of the world</u>: the Balance of Payments, foreign exchange reserves, exchange rates, trade and the World Trade Organization. These ideas are asked again and again in the Staff Selection Commission exams, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>12</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>28</b><span>Questions</span></div>
        <div class="cp-stat"><b>~52 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>External Sector and the Balance of Payments Account</b><br>What the external sector is and how a country keeps a record of money coming in and going out.</li>
        <li><b>Impact of Balance of Payments Crisis</b><br>What goes wrong when a country runs short of foreign money, and how India solved its crisis of 1990.</li>
        <li><b>Parts of Foreign Exchange Reserve and Special Drawing Rights</b><br>What a country keeps in reserve and what the emergency reserve with the International Monetary Fund is.</li>
        <li><b>Current Account and Capital Account</b><br>The two main parts of the Balance of Payments, with surplus, deficit, trade partners and the difference between Foreign Direct Investment and Foreign Portfolio Investment.</li>
        <li><b>Exchange Rate, Trade and the World Trade Organization</b><br>How the value of the rupee moves, what it does to exports and imports, and how trade barriers and the World Trade Organization work.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions come from simple pairs such as surplus versus deficit, direct versus portfolio investment and devaluation versus depreciation, and they are easy marks once you know the pattern.</div>
    `
  },
  2: {
    type: "concept", icon: "🌍", accent: "#22c55e", pauseTimer: true,
    title: "External Sector and Balance of Payments Account",
    html: `
      <p class="cp-lead">The <b>external sector</b> is the part of an economy that deals with the rest of the world. <u>Its main record is the Balance of Payments account.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/1.png" alt="Reserve Bank of India headquarters Mumbai photo" data-caption="The head office of the Reserve Bank of India in Mumbai." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/2.png" alt="A country box in the centre with two arrows: Money coming in from the world, Money going o" data-caption="The Balance of Payments records money moving in and out." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Every country buys and sells things from other countries, and it also lends, borrows and invests abroad. The Balance of Payments (BoP) account is a systematic record of all these money dealings between a country and the rest of the world during a given period, usually one year.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Meaning</td><td>Record of all economic transactions between a country and the rest of the world</td></tr><tr><td>Period</td><td>A given period, usually a year</td></tr><tr><td>Who keeps the account</td><td>Reserve Bank of India</td></tr><tr><td>Two main parts</td><td>Current account and capital account</td></tr></tbody></table>
      <p class="cp-lead">Think of it as the yearly bank passbook of the whole country with the world.</p>
      <div class="cp-note trap">The Balance of Payments is not the same as the budget. The budget is the government's own income and spending, while the Balance of Payments covers the whole country's dealings with other countries.</div>
      <div class="cp-note exam">Remember "BoP means a record of all foreign dealings, kept by the Reserve Bank of India".</div>
    `
  },
  3: {
    questext: "The Balance of Payments account of India is managed and held by which institution?",
    options: ["Ministry of Finance", "Securities and Exchange Board of India", "National Institution for Transforming India", "Reserve Bank of India"],
    correct: "4",
    exptext: "✅ The Reserve Bank of India maintains the Balance of Payments account. 📌 BoP, RBI. ❌ The Ministry of Finance prepares the budget, not this record."
  },
  4: {
    questext: "The Balance of Payments is a record of:",
    options: ["Government income and spending", "Only exports of goods", "All economic transactions between a country and the rest of the world", "Only foreign loans"],
    correct: "3",
    exptext: "✅ It records all economic dealings with the rest of the world in a period. 📌 Payments to and from the world. ❌ Government income and spending is the budget."
  },
  5: {
    type: "concept", icon: "⚠️", accent: "#f59e0b", pauseTimer: true,
    title: "Impact of BoP Crisis on Economy",
    html: `
      <p class="cp-lead">A <b>Balance of Payments crisis</b> happens when a country runs short of foreign money. <u>It leads to a foreign exchange reserve crisis, which then causes a dollar crisis.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/3.png" alt="Sri Lanka economic crisis 2022 fuel queue photo" data-caption="A fuel queue in Sri Lanka during its crisis of 2022." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/4.png" alt="Three boxes joined by arrows: BoP Crisis, Forex Reserve Crisis, Dollar Crisis." data-caption="One crisis leads to the next." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/5.png" alt="Three columns: Imports fall, Raw materials and energy fall, Foreign debt problem; each wit" data-caption="The three groups of effects of a Balance of Payments crisis." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Effect</th><th>What happens</th></tr></thead><tbody><tr><td>Imports of goods and services fall</td><td>Less supply at home, so prices rise and inflation increases</td></tr><tr><td>Imports of raw materials and energy fall</td><td>Less crude oil and gas, so production falls, growth turns negative, unemployment and poverty rise, and recession can occur</td></tr><tr><td>Foreign debt trouble</td><td>The government fails to repay loans, the country can become a defaulter, and its sovereign credit rating falls</td></tr></tbody></table>
      <p class="cp-lead">A <b>sovereign credit rating</b> tells lenders how safe it is to lend to a country. When it falls, borrowing becomes costlier.</p>
      <p class="cp-lead">Pakistan, Sri Lanka and Bangladesh have faced a Balance of Payments crisis in recent years. India faced one in 1990. The usual cure is a <b>bailout package</b> from the International Monetary Fund (IMF), also called a dollar package. India was helped by the International Monetary Fund in 1990, and the help came with major economic reforms.</p>
      <div class="cp-note trap">A Balance of Payments crisis makes imports fall and prices rise. Do not say that it lowers inflation.</div>
      <div class="cp-note exam">Remember "1990 crisis, International Monetary Fund help, reforms of 1991".</div>
    `
  },
  6: {
    questext: "In which year did India face a Balance of Payments crisis?",
    options: ["1980", "1990", "1998", "2008"],
    correct: "2",
    exptext: "✅ India faced a Balance of Payments crisis in 1990, which led to the reforms of 1991. 📌 1990 crisis, 1991 reforms. ❌ 1998 is the year of Pokhran-II."
  },
  7: {
    questext: "Which institution issues a bailout package to a country facing a Balance of Payments crisis?",
    options: ["World Trade Organization", "Reserve Bank of India", "United Nations Educational, Scientific and Cultural Organization", "International Monetary Fund"],
    correct: "4",
    exptext: "✅ The International Monetary Fund gives the bailout package, also called a dollar package. 📌 Crisis means International Monetary Fund. ❌ The World Trade Organization deals with trade rules."
  },
  8: {
    questext: "Consider the following statements about a Balance of Payments crisis:\n1. It reduces the import of goods and raises inflation.\n2. It improves the sovereign credit rating of the country.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, since fewer imports cause supply shortage and higher prices. 📌 Crisis lowers trust. ❌ Statement 2 is wrong because the credit rating falls."
  },
  9: {
    type: "concept", icon: "🏦", accent: "#ef4444", pauseTimer: true,
    title: "Parts of Forex Reserve of Any Country",
    html: `
      <p class="cp-lead">The <b>foreign exchange reserve</b>, or forex reserve, is the stock of foreign money and assets that a country's central bank keeps for emergencies. <u>It is the country's savings for dealing with the world.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/6.png" alt="Reserve Bank of India gold reserve bars photo" data-caption="Gold bars held as a part of the reserve." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/7.png" alt="United States dollar banknotes stack photo" data-caption="United States dollar notes, the main reserve currency." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/8.png" alt="Three boxes under the title Forex Reserve: Foreign currency assets mostly dollars, Gold, S" data-caption="The main parts of a forex reserve." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Part</th><th>Fact</th></tr></thead><tbody><tr><td>Foreign currency assets</td><td>Mostly United States dollars; this is the largest part</td></tr><tr><td>Gold</td><td>Held by the Reserve Bank of India</td></tr><tr><td>Special Drawing Rights and reserve position</td><td>Held with the International Monetary Fund</td></tr></tbody></table>
      <p class="cp-lead">The reserve is used to pay for imports, to repay foreign loans and to calm sharp falls in the value of the rupee. Most of India's foreign currency holdings are in United States dollars.</p>
      <div class="cp-note trap">Do not count external debt or embassy buildings as a forex reserve. Debt is money owed, not money saved.</div>
      <div class="cp-note exam">Remember "forex reserve equals dollars, gold and Special Drawing Rights".</div>
    `
  },
  10: {
    questext: "Most of India's foreign currency holdings are in which currency?",
    options: ["Euro", "British Pound", "United States Dollar", "Japanese Yen"],
    correct: "3",
    exptext: "✅ The foreign currency holdings are mostly in United States dollars. 📌 Reserve means dollar. ❌ Euro is a smaller part."
  },
  11: {
    questext: "Which of the following is NOT a part of the forex reserve of a country?",
    options: ["Gold", "External debt", "Foreign currency assets", "Special Drawing Rights"],
    correct: "2",
    exptext: "✅ External debt is money owed to others, so it cannot be a reserve. 📌 Reserve means savings, not loans. ❌ The other three are all parts of the reserve."
  },
  12: {
    type: "concept", icon: "🪙", accent: "#8b5cf6", pauseTimer: true,
    title: "India's Emergency Reserve in IMF — SDR",
    html: `
      <p class="cp-lead"><b>Special Drawing Rights</b> (SDR) are an international reserve asset created by the International Monetary Fund in 1969. <u>They are not a currency.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/9.png" alt="International Monetary Fund headquarters Washington photo" data-caption="The headquarters of the International Monetary Fund in Washington." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/10.png" alt="Five round coins in a row: US Dollar, Euro, British Pound, Japanese Yen, Chinese Yuan, joi" data-caption="The five currencies that decide the value of the Special Drawing Right." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The value of a Special Drawing Right is based on a basket of five major world currencies. A member country can use it in an emergency to get foreign money, so it works like an emergency reserve held with the International Monetary Fund.</p>
      <table><thead><tr><th>Basket currency</th><th>Country or region</th></tr></thead><tbody><tr><td>United States Dollar</td><td>United States</td></tr><tr><td>Euro</td><td>European Union countries</td></tr><tr><td>British Pound</td><td>United Kingdom</td></tr><tr><td>Japanese Yen</td><td>Japan</td></tr><tr><td>Chinese Yuan (Renminbi)</td><td>China</td></tr></tbody></table>
      <div class="cp-note trap">The Special Drawing Right is an asset, not a currency note or coin, so you cannot spend it in a shop.</div>
      <div class="cp-note exam">Remember "SDR, 1969, International Monetary Fund, five currencies".</div>
    `
  },
  13: {
    questext: "Special Drawing Rights were created by which organisation?",
    options: ["World Bank", "World Trade Organization", "Reserve Bank of India", "International Monetary Fund"],
    correct: "4",
    exptext: "✅ The International Monetary Fund created them in 1969. 📌 SDR, IMF. ❌ The World Bank is a different institution."
  },
  14: {
    questext: "Which of the following currencies is a part of the Special Drawing Rights basket?",
    options: ["Indian Rupee", "Russian Rouble", "Chinese Yuan", "Swiss Franc"],
    correct: "3",
    exptext: "✅ The basket has the dollar, euro, pound, yen and Chinese yuan. 📌 Five currencies from five big economies. ❌ The rupee is not in the basket."
  },
  15: {
    type: "concept", icon: "⚖️", accent: "#14b8a6", pauseTimer: true,
    title: "Structure of BoP Account",
    html: `
      <p class="cp-lead">The Balance of Payments account records two kinds of flows: <b>inflow</b> of dollars, which is money coming into India, and <b>outflow</b> of dollars, which is money going out of India.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/11.png" alt="A box labelled India with a green arrow coming in labelled Inflow of dollars and a red arr" data-caption="Dollars flow into and out of India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/12.png" alt="Two columns: Current account for goods and services trade, Capital account for financial t" data-caption="The two accounts of the Balance of Payments." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Account</th><th>What it records</th></tr></thead><tbody><tr><td>Current account (Trade account)</td><td>Import and export of goods and services, that is, trade in visible and invisible items</td></tr><tr><td>Capital account</td><td>Financial transactions such as investment, loans, grants and deposits</td></tr></tbody></table>
      <p class="cp-lead">One simple way to remember: the current account is about buying and selling things, and the capital account is about money lent, borrowed or invested.</p>
      <div class="cp-note trap">Foreign investment is not in the current account. It is a capital account item.</div>
      <div class="cp-note exam">Remember "current account equals trade, capital account equals finance".</div>
    `
  },
  16: {
    questext: "Which account of the Balance of Payments records the import and export of goods and services?",
    options: ["Capital account", "Current account", "Savings account", "Reserve account"],
    correct: "2",
    exptext: "✅ The current account, also called the trade account, records trade. 📌 Current means trade. ❌ The capital account records financial transactions."
  },
  17: {
    questext: "Foreign investment, loans and grants are recorded in which account?",
    options: ["Capital account", "Current account", "Trade account", "Merchandise account"],
    correct: "1",
    exptext: "✅ These are financial transactions, so they are in the capital account. 📌 Capital means finance. ❌ The current account is for trade in goods and services."
  },
  18: {
    type: "concept", icon: "🚢", accent: "#ec4899", pauseTimer: true,
    title: "Current Account (Trade Account)",
    html: `
      <p class="cp-lead">The <b>current account</b> records the trade of goods and services. <u>When we export, dollars come in. When we import, dollars go out.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/13.png" alt="Container ship port India Mundra photo" data-caption="A cargo ship loading containers at an Indian port." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/14.png" alt="Indian software company office IT park photo" data-caption="An information technology office, a source of service exports." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/15.png" alt="Three scale pictures: Surplus with inflow heavier, Balance with equal sides, Deficit with " data-caption="The three situations of the current account." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Trade</th><th>Effect</th></tr></thead><tbody><tr><td>Export</td><td>Dollars come in, which helps a Balance of Payments surplus</td></tr><tr><td>Import</td><td>Dollars go out, which increases the Balance of Payments deficit</td></tr></tbody></table>
      <table><thead><tr><th>Kind of item</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Merchandise or visible items</td><td>Physical goods</td><td>Machinery, electronics, textiles</td></tr><tr><td>Invisible items</td><td>Services</td><td>Software, tourism, banking</td></tr></tbody></table>
      <table><thead><tr><th>Situation</th><th>Short form</th><th>Meaning</th><th>Type of economy</th></tr></thead><tbody><tr><td>Current account surplus</td><td>CAS</td><td>Inflow of dollars is more than outflow, export bill is bigger</td><td>Export economy, for example China</td></tr><tr><td>Current account balance</td><td>CAB</td><td>Inflow equals outflow, an ideal case that is not practically possible</td><td>Not practical</td></tr><tr><td>Current account deficit</td><td>CAD</td><td>Inflow is less than outflow, import bill is bigger</td><td>Import economy, for example India</td></tr></tbody></table>
      <p class="cp-lead">India has a current account deficit. India's largest deficit is with China, and its surplus is with the United States. Remittances, which are money sent home by Indians working abroad, are also counted in the current account.</p>
      <table><thead><tr><th>India's top trade partners</th><th>Order</th></tr></thead><tbody><tr><td>By total trade (exports plus imports)</td><td>China, then the United States, then the United Arab Emirates</td></tr><tr><td>Largest deficit with</td><td>China</td></tr><tr><td>Largest surplus with</td><td>United States</td></tr></tbody></table>
      <div class="cp-note trap">The current account deficit is not the same as the budget deficit. One is about the world, the other is about the government.</div>
      <div class="cp-note exam">Remember "CAD with China, CAS with the United States, India is an import economy".</div>
    `
  },
  19: {
    questext: "Which of the following is an invisible item in the current account?",
    options: ["Machinery", "Textiles", "Electronics", "Software services"],
    correct: "4",
    exptext: "✅ Services such as software are invisible items. 📌 Invisible means service. ❌ Machinery, textiles and electronics are physical goods."
  },
  20: {
    questext: "With which country does India have its largest current account deficit?",
    options: ["United States", "United Arab Emirates", "China", "Japan"],
    correct: "3",
    exptext: "✅ India buys far more from China than it sells to it. 📌 Deficit with China, surplus with the United States. ❌ India has a surplus with the United States."
  },
  21: {
    questext: "A current account deficit means that:",
    options: ["Inflow of dollars is more than outflow", "Inflow of dollars is less than outflow", "Inflow of dollars is equal to outflow", "There is no trade"],
    correct: "2",
    exptext: "✅ Deficit means the import bill is bigger than the export bill. 📌 Deficit, dollars go out more. ❌ Inflow more than outflow is a surplus."
  },
  22: {
    questext: "Consider the following statements about the current account:\n1. India has a current account deficit.\n2. India's largest current account surplus is with China.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Surplus with the United States, deficit with China. ❌ Statement 2 is wrong because the largest surplus is with the United States."
  },
  23: {
    type: "concept", icon: "💼", accent: "#3b82f6", pauseTimer: true,
    title: "Capital Account",
    html: `
      <p class="cp-lead">The <b>capital account</b> records all financial transactions between India and the rest of the world, both inflow and outflow.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/16.png" alt="Four boxes under the title Capital Account: Foreign investment, External debt or loans, Ex" data-caption="The four main parts of the capital account." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/17.png" alt="Non-Resident Indian bank deposit remittance photo" data-caption="A Non-Resident Indian depositing money in an Indian bank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Part</th><th>Items</th></tr></thead><tbody><tr><td>Foreign investment</td><td>Foreign Direct Investment (FDI) and Foreign Portfolio Investment (FPI)</td></tr><tr><td>External debt or loans</td><td>Government loans, private sector loans and External Commercial Borrowings (ECBs), which are loans taken from foreign lenders by Indian companies</td></tr><tr><td>External grant or aid</td><td>Government grants and aid, and grants from private bodies or non-governmental organisations</td></tr><tr><td>External deposit</td><td>Non-Resident Indian deposits</td></tr></tbody></table>
      <p class="cp-lead">A <b>Non-Resident Indian</b> is an Indian citizen who lives abroad. When such a person keeps money in an Indian bank, dollars flow in, so it is a capital account item.</p>
      <div class="cp-note trap">Remittances, which are money sent home as support to families, belong to the current account, while Non-Resident Indian deposits belong to the capital account.</div>
      <div class="cp-note exam">Remember "capital account equals investment, loans, aid and deposits".</div>
    `
  },
  24: {
    questext: "External Commercial Borrowings are recorded in which account?",
    options: ["Capital account", "Current account", "Trade account", "Merchandise account"],
    correct: "1",
    exptext: "✅ They are loans from foreign lenders, so they are a capital account item. 📌 Loans, capital account. ❌ The current account is for goods and services."
  },
  25: {
    questext: "Which of the following is a component of the capital account?",
    options: ["Export of textiles", "Import of machinery", "Tourism earnings", "Non-Resident Indian deposits"],
    correct: "4",
    exptext: "✅ Non-Resident Indian deposits are a financial inflow, so they are in the capital account. 📌 Deposit, capital. ❌ The other options are trade in goods or services."
  },
  26: {
    type: "concept", icon: "🏭", accent: "#f97316", pauseTimer: true,
    title: "FDI versus FPI",
    html: `
      <p class="cp-lead"><b>Foreign Direct Investment</b> (FDI) means a foreign investor builds or buys a real business in India. <b>Foreign Portfolio Investment</b> (FPI) means a foreign investor buys shares or bonds without running the company.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/18.png" alt="New factory construction site India photo" data-caption="A new factory being built, an example of greenfield investment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/19.png" alt="Two stock market arrows: one entering a factory labelled Direct, long term, stable; the ot" data-caption="Direct investment stays long, portfolio investment can leave fast." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Foreign Direct Investment</th><th>Foreign Portfolio Investment</th></tr></thead><tbody><tr><td>Meaning</td><td>Investor takes part in running a business</td><td>Investor buys shares and bonds for returns</td></tr><tr><td>Kind</td><td>Greenfield (new infrastructure) or brownfield (existing business)</td><td>Market investment</td></tr><tr><td>Use</td><td>Builds new industry and infrastructure</td><td>Moves money in and out of the stock market</td></tr><tr><td>Jobs</td><td>Large-scale employment</td><td>Small-scale employment</td></tr><tr><td>Time</td><td>Long-term</td><td>Short-term</td></tr><tr><td>Effect on economy</td><td>More stable</td><td>More volatile, can exit quickly</td></tr></tbody></table>
      <p class="cp-lead"><b>Greenfield</b> investment means building something new on empty land. <b>Brownfield</b> investment means buying or expanding something that already exists.</p>
      <div class="cp-note trap">Do not call portfolio investment stable. Because investors can sell and leave in a day, it is called hot money.</div>
      <div class="cp-note exam">Remember "FDI is long term and stable, FPI is short term and volatile".</div>
    `
  },
  27: {
    questext: "Which of the following is more stable for the economy?",
    options: ["Foreign Portfolio Investment", "Short-term loans", "Foreign Direct Investment", "Speculative money"],
    correct: "3",
    exptext: "✅ Foreign Direct Investment is long-term and builds real assets. 📌 Direct stays. ❌ Portfolio money can exit quickly."
  },
  28: {
    questext: "Greenfield investment refers to:",
    options: ["Buying shares in the stock market", "Building new infrastructure or industry", "Buying government bonds", "Giving a loan to a bank"],
    correct: "2",
    exptext: "✅ Greenfield means creating a new project. 📌 Green means new. ❌ Buying shares is portfolio investment."
  },
  29: {
    questext: "Consider the following statements:\n1. Foreign Direct Investment creates large-scale employment.\n2. Foreign Portfolio Investment is a long-term investment.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Direct means long and big, portfolio means short and quick. ❌ Statement 2 is wrong because portfolio investment is short-term."
  },
  30: {
    type: "concept", icon: "💱", accent: "#84cc16", pauseTimer: true,
    title: "Currency Exchange Rate",
    html: `
      <p class="cp-lead">The <b>exchange rate</b> is the rate at which one currency is exchanged for another. <u>For example, how many rupees we pay for one United States dollar.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/20.png" alt="Currency exchange counter board rupee dollar rate photo" data-caption="An exchange counter board showing the rate of the rupee." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/21.png" alt="Two boxes: Floating rate with demand and supply pulling, Fixed rate with the central bank " data-caption="Floating rates move with the market, fixed rates are held by the central bank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Floating exchange rate</th><th>Fixed exchange rate</th></tr></thead><tbody><tr><td>Decided by</td><td>Market forces of demand and supply</td><td>Central bank</td></tr><tr><td>Movement</td><td>Changes every day</td><td>Fixed or controlled</td></tr><tr><td>Followed by</td><td>India and most countries</td><td>China historically</td></tr></tbody></table>
      <table><thead><tr><th>Type</th><th>Word for fall in value</th><th>Word for rise in value</th></tr></thead><tbody><tr><td>Floating rate</td><td>Depreciation</td><td>Appreciation</td></tr><tr><td>Fixed rate</td><td>Devaluation</td><td>Revaluation</td></tr></tbody></table>
      <p class="cp-lead">India follows a market-determined rate, and the Reserve Bank of India steps in only to stop sudden big swings. Remember that a fall by market forces is depreciation, and a fall by a government decision is devaluation.</p>
      <div class="cp-note trap">Many students swap depreciation and devaluation. Depreciation is a market fall, devaluation is an official cut.</div>
      <div class="cp-note exam">Remember "floating: depreciation and appreciation; fixed: devaluation and revaluation".</div>
    `
  },
  31: {
    questext: "In a fixed exchange rate system, an official decrease in the value of the currency is called:",
    options: ["Devaluation", "Depreciation", "Appreciation", "Revaluation"],
    correct: "1",
    exptext: "✅ An official cut in a fixed rate is devaluation. 📌 Devaluation is decided by the government. ❌ Depreciation is a market-driven fall."
  },
  32: {
    questext: "Which exchange rate system does India follow?",
    options: ["Fixed exchange rate", "Barter system", "Gold standard", "Floating exchange rate"],
    correct: "4",
    exptext: "✅ India follows a market-determined floating rate. 📌 India floats. ❌ A fixed rate was used by countries like China historically."
  },
  33: {
    type: "concept", icon: "📉", accent: "#06b6d4", pauseTimer: true,
    title: "Impact of Devaluation / Appreciation on Trade",
    html: `
      <p class="cp-lead">When a currency becomes <b>weaker</b>, exports rise and imports fall. When it becomes <b>stronger</b>, exports fall and imports rise.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/22.png" alt="Two scales: Rupee weaker, 1 dollar equals 100 rupees, arrow up on Exports, arrow down on I" data-caption="A weaker rupee helps exports, a stronger rupee helps imports." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/23.png" alt="Indian rupee and United States dollar notes photo" data-caption="Indian rupee and United States dollar notes side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Currency weakens (devaluation or depreciation)</th><th>Currency strengthens (appreciation or revaluation)</th></tr></thead><tbody><tr><td>Exports</td><td>Increase, because they are cheaper for foreign buyers</td><td>Decrease, because they are costlier for foreign buyers</td></tr><tr><td>Imports</td><td>Decrease, because they are costlier for home buyers</td><td>Increase, because they are cheaper for home buyers</td></tr></tbody></table>
      <p class="cp-lead">Example with round numbers for practice: suppose one dollar equals 96 rupees. If the rate moves to 100 rupees, the rupee is weaker, so an Indian product priced at 100 rupees costs a foreign buyer less than before. Exports rise. If the rate moves to 90 rupees, the rupee is stronger, the same product costs the foreign buyer more, and exports fall.</p>
      <div class="cp-note trap">A weaker rupee does not mean a stronger economy. It only makes exports cheaper, while imports such as crude oil become costlier.</div>
      <div class="cp-note exam">Remember "weak currency, export up, import down".</div>
    `
  },
  34: {
    questext: "What is the effect of a fall in the value of the rupee on exports and imports?",
    options: ["Exports decrease and imports increase", "Both increase", "Exports increase and imports decrease", "Both decrease"],
    correct: "3",
    exptext: "✅ A weaker rupee makes exports cheaper and imports costlier. 📌 Weak currency helps exports. ❌ The reverse happens when the rupee becomes stronger."
  },
  35: {
    questext: "When the rupee appreciates, which of the following happens?",
    options: ["Exports become cheaper", "Imports become cheaper", "Imports become costlier", "Exports increase"],
    correct: "2",
    exptext: "✅ A stronger rupee makes imports cheaper for Indian buyers. 📌 Strong currency helps imports. ❌ Exports become costlier for foreign buyers."
  },
  36: {
    type: "concept", icon: "🛃", accent: "#a855f7", pauseTimer: true,
    title: "Foreign / External Trade and Trade Barriers",
    html: `
      <p class="cp-lead"><b>Foreign trade</b> is the export and import of goods and services between India and other countries. It is regulated by the <b>Directorate General of Foreign Trade</b> (DGFT), which works under the Ministry of Commerce and Industry.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/24.png" alt="Customs officers container inspection port India photo" data-caption="Customs officers checking containers at an Indian port." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/25.png" alt="Two branches: Tariff barrier with customs duty on export and import, Non-tariff barrier wi" data-caption="Tariff and non-tariff barriers are the two kinds of trade barriers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Barrier</th><th>Meaning</th><th>Examples</th></tr></thead><tbody><tr><td>Tariff barrier</td><td>Customs duty on exports and imports</td><td>Higher duty on imports to make them costlier</td></tr><tr><td>Non-tariff barrier</td><td>Any barrier other than a tariff</td><td>Child labour rules, carbon emission standards, sanitary and phyto-sanitary standards</td></tr></tbody></table>
      <p class="cp-lead">A government uses customs duty as a tool. If a country has a surplus of a product, it can lower the duty on exports so that more is sold abroad. If it has a deficit, it can raise the duty on exports to keep goods at home and lower the duty on imports to bring more in.</p>
      <p class="cp-lead"><b>Sanitary and phyto-sanitary standards</b> are health rules for food, animals and plants.</p>
      <div class="cp-note trap">Customs duty is a tariff barrier. Quality and safety rules are non-tariff barriers.</div>
      <div class="cp-note exam">Remember "DGFT regulates trade, tariff means duty, non-tariff means other rules".</div>
    `
  },
  37: {
    questext: "The Directorate General of Foreign Trade works under which ministry?",
    options: ["Ministry of Commerce and Industry", "Ministry of Finance", "Ministry of External Affairs", "Ministry of Home Affairs"],
    correct: "1",
    exptext: "✅ It works under the Ministry of Commerce and Industry. 📌 Foreign trade means commerce. ❌ The Ministry of Finance handles taxes and the budget."
  },
  38: {
    questext: "Which of the following is a non-tariff barrier?",
    options: ["Customs duty on imports", "Customs duty on exports", "Tax on income", "Sanitary and phyto-sanitary standards"],
    correct: "4",
    exptext: "✅ Health standards for goods are rules other than duty, so they are non-tariff barriers. 📌 Not a tax equals non-tariff. ❌ Customs duty is a tariff barrier."
  },
  39: {
    type: "concept", icon: "🌐", accent: "#e11d48", pauseTimer: true,
    title: "WTO — World Trade Organization",
    html: `
      <p class="cp-lead">The <b>World Trade Organization</b> (WTO) is the global body that works to promote free foreign trade and globalisation among its member countries.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/26.png" alt="World Trade Organization headquarters Geneva building photo" data-caption="The headquarters of the World Trade Organization in Geneva." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/External_Sector_of_India/27.png" alt="Barriers shown as a wall with two bricks labelled Tariff and Non-tariff being removed, wit" data-caption="The World Trade Organization works to remove trade barriers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Full form</td><td>World Trade Organization</td></tr><tr><td>Objective</td><td>To promote free, barrier-free foreign trade</td></tr><tr><td>Second objective</td><td>To promote globalisation</td></tr><tr><td>Work</td><td>Eliminate tariff and non-tariff barriers between member nations for free and fair trade</td></tr></tbody></table>
      <p class="cp-lead"><b>Globalisation</b> means that the economies of the world become more closely linked through trade, investment and ideas.</p>
      <div class="cp-note trap">The World Trade Organization deals with trade, while the International Monetary Fund deals with the balance of payments and money problems.</div>
      <div class="cp-note exam">Remember "WTO equals free and fair trade, IMF equals money help".</div>
    `
  },
  40: {
    questext: "The main objective of the World Trade Organization is to:",
    options: ["Give loans to poor countries", "Print world currency", "Promote free and fair trade", "Fix exchange rates"],
    correct: "3",
    exptext: "✅ It works to remove trade barriers between members. 📌 WTO means trade. ❌ Giving loans is the work of the International Monetary Fund and the World Bank."
  },
  41: {
    questext: "The World Trade Organization works to eliminate which of the following?",
    options: ["Only tariff barriers", "Both tariff and non-tariff barriers", "Only non-tariff barriers", "Neither of them"],
    correct: "2",
    exptext: "✅ It aims to remove both tariff and non-tariff barriers. 📌 Both kinds of walls. ❌ Choosing only one leaves out half of its work."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/External_Sector_of_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a spinning globe, a stack of gold coins, a cargo ship silhouette and a subtle rising chart line" },
  "images/General_Awareness/Economics/External_Sector_of_India/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Reserve Bank of India headquarters Mumbai photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/1.png. RBI office",
  "images/General_Awareness/Economics/External_Sector_of_India/2.png": { t: "fig", about: "A country box in the centre with two arrows: Money coming in from the world, Money going out to the world; title Balance of Payments." },
  "images/General_Awareness/Economics/External_Sector_of_India/3.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sri Lanka economic crisis 2022 fuel queue photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/3.png. Sri Lanka",
  "images/General_Awareness/Economics/External_Sector_of_India/4.png": { t: "fig", about: "Three boxes joined by arrows: BoP Crisis, Forex Reserve Crisis, Dollar Crisis." },
  "images/General_Awareness/Economics/External_Sector_of_India/5.png": { t: "fig", about: "Three columns: Imports fall, Raw materials and energy fall, Foreign debt problem; each with two short results." },
  "images/General_Awareness/Economics/External_Sector_of_India/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Reserve Bank of India gold reserve bars photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/6.png. gold",
  "images/General_Awareness/Economics/External_Sector_of_India/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"United States dollar banknotes stack photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/7.png. dollars",
  "images/General_Awareness/Economics/External_Sector_of_India/8.png": { t: "fig", about: "Three boxes under the title Forex Reserve: Foreign currency assets mostly dollars, Gold, Special Drawing Rights with the International Monetary Fund." },
  "images/General_Awareness/Economics/External_Sector_of_India/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"International Monetary Fund headquarters Washington photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/9.png. IMF",
  "images/General_Awareness/Economics/External_Sector_of_India/10.png": { t: "fig", about: "Five round coins in a row: US Dollar, Euro, British Pound, Japanese Yen, Chinese Yuan, joined into one basket labelled Special Drawing Rights." },
  "images/General_Awareness/Economics/External_Sector_of_India/11.png": { t: "fig", about: "A box labelled India with a green arrow coming in labelled Inflow of dollars and a red arrow going out labelled Outflow of dollars." },
  "images/General_Awareness/Economics/External_Sector_of_India/12.png": { t: "fig", about: "Two columns: Current account for goods and services trade, Capital account for financial transactions such as investment, loans, grants, deposits." },
  "images/General_Awareness/Economics/External_Sector_of_India/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Container ship port India Mundra photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/13.png. port",
  "images/General_Awareness/Economics/External_Sector_of_India/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian software company office IT park photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/14.png. software",
  "images/General_Awareness/Economics/External_Sector_of_India/15.png": { t: "fig", about: "Three scale pictures: Surplus with inflow heavier, Balance with equal sides, Deficit with outflow heavier." },
  "images/General_Awareness/Economics/External_Sector_of_India/16.png": { t: "fig", about: "Four boxes under the title Capital Account: Foreign investment, External debt or loans, External grant or aid, External deposit." },
  "images/General_Awareness/Economics/External_Sector_of_India/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Non-Resident Indian bank deposit remittance photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/17.png. NRI",
  "images/General_Awareness/Economics/External_Sector_of_India/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"New factory construction site India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/18.png. greenfield",
  "images/General_Awareness/Economics/External_Sector_of_India/19.png": { t: "fig", about: "Two stock market arrows: one entering a factory labelled Direct, long term, stable; the other touching a share chart labelled Portfolio, short term, can exit quickly." },
  "images/General_Awareness/Economics/External_Sector_of_India/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Currency exchange counter board rupee dollar rate photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/20.png. rates",
  "images/General_Awareness/Economics/External_Sector_of_India/21.png": { t: "fig", about: "Two boxes: Floating rate with demand and supply pulling, Fixed rate with the central bank holding it steady." },
  "images/General_Awareness/Economics/External_Sector_of_India/22.png": { t: "fig", about: "Two scales: Rupee weaker, 1 dollar equals 100 rupees, arrow up on Exports, arrow down on Imports; Rupee stronger, 1 dollar equals 90 rupees, arrow down on Exports, arrow up on Imports." },
  "images/General_Awareness/Economics/External_Sector_of_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian rupee and United States dollar notes photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/23.png. currency",
  "images/General_Awareness/Economics/External_Sector_of_India/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Customs officers container inspection port India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/24.png. customs",
  "images/General_Awareness/Economics/External_Sector_of_India/25.png": { t: "fig", about: "Two branches: Tariff barrier with customs duty on export and import, Non-tariff barrier with other rules such as quality and safety standards." },
  "images/General_Awareness/Economics/External_Sector_of_India/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"World Trade Organization headquarters Geneva building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/External_Sector_of_India/26.png. WTO",
  "images/General_Awareness/Economics/External_Sector_of_India/27.png": { t: "fig", about: "Barriers shown as a wall with two bricks labelled Tariff and Non-tariff being removed, with the title WTO works to remove barriers." }
});

/* CHANGE LOG
   - The three parts of the forex reserve are given in the standard form: foreign currency assets (mostly United States dollars), gold, and Special Drawing Rights with the reserve position in the International Monetary Fund. External debt and embassy buildings are not part of the reserve, so they were removed.
   - Remittances are placed in the current account (as transfers), while Non-Resident Indian deposits stay in the capital account.
   - Brownfield investment is linked to Foreign Direct Investment into existing facilities, not to Foreign Portfolio Investment; Foreign Portfolio Investment means buying shares and bonds without control over the company.
   - Devaluation and revaluation are used for fixed exchange rates, and depreciation and appreciation for floating exchange rates; the labels were put in the right groups.
   - India's exchange rate is described as market determined, with the Reserve Bank of India stepping in to reduce sharp swings.
   - The rupee numbers in the example are round figures for practice, not today's rate.
   - Top trade partners: China became India's largest trading partner in 2025-26, followed by the United States and the United Arab Emirates, so the order China, United States, United Arab Emirates is kept.
*/