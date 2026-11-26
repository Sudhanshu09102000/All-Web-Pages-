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

/* Field: General_Awareness · Subject: Economics · Chapter: Five_Year_Planning · 23 concept pages (+ overview) · 51 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — Five Year Planning in India",
    thumb: {
      image: "images/General_Awareness/Economics/Five_Year_Planning/thumbnail.png",
      banner: "ECONOMICS • GENERAL AWARENESS",
      line1: "FIVE YEAR",
      line2: "PLANNING",
      line3: "FULL CHAPTER",
      badge: "ALL PLANS",
      ribbon: "MODELS • TARGETS • FACTS",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Five Year Plans of India in One Class | Economics for SSC CGL",
      altTitles: ["All Five Year Plans Models and Growth Rates Trick", "Planning Commission vs NITI Aayog Full Chapter"],
      description: "Five Year Planning is a favourite topic of the Staff Selection Commission exams. In this class we learn every plan from 1951 to 2017 in a simple order.\n\n📌 IN THIS CLASS\n✅ Early plans before Independence\n✅ Planning Commission and NITI Aayog\n✅ First to Twelfth Five Year Plans with models, targets and growth\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #FiveYearPlan #Economics",
      tags: ["five year plan", "five year plans of india", "indian economy five year plan", "five year plan ssc cgl", "five year plan tricks", "planning commission", "niti aayog", "bombay plan", "mahalanobis model", "harrod domar model", "planning holiday", "rolling plan", "economics for ssc cgl", "general awareness economics", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "important questions", "concept class", "one shot", "Five Year Planning class"],
      hashtags: ["SSCCGL", "FiveYearPlan", "Economics"],
      thumbText: "FIVE YEAR PLANS OF INDIA",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📊 New class is live: all Five Year Plans of India with models, targets and growth. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "General Awareness — Economics"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on planning in India</u>, from the first ideas before Independence to the Twelfth Five Year Plan and NITI Aayog. Every plan has a few fixed facts that come again and again in the Staff Selection Commission exams, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>23</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>51</b><span>Questions</span></div>
        <div class="cp-stat"><b>~97 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Planning before Independence</b><br>The six early plans: Visvesvaraya, National Planning Committee, Bombay, People's, Gandhian and Sarvodaya. We learn who wrote each one and what it wanted.</li>
        <li><b>Planning Commission and NITI Aayog</b><br>How the old body and the new body differ in structure, approach and leaders, shown side by side in one table.</li>
        <li><b>First to Third Five Year Plans</b><br>Agriculture, heavy industry and self reliance, with the model, the targets and the growth achieved in each plan.</li>
        <li><b>Planning Holidays and the Fourth to Seventh Plans</b><br>Growth with stability, Garibi Hatao, the Rolling Plan and the schemes and events linked to each period.</li>
        <li><b>Eighth to Twelfth Five Year Plans</b><br>The reform period after 1991, growth targets against results, and the end of Five Year Planning.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on Five Year Plans ask for the plan period, the model, the Prime Minister, the focus and the growth figures, and they are easy marks once you know the pattern.</div>
    `
  },
  2: {
    type: "concept", icon: "🏭", accent: "#22c55e", pauseTimer: true,
    title: "Visvesvaraya Plan (1934)",
    html: `
      <p class="cp-lead">The first clear outline of economic planning in India was written by the engineer <b>Mokshagundam Visvesvaraya</b>. <u>It came in 1934, long before Independence.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/1.png" alt="Sir M. Visvesvaraya portrait photo engineer" data-caption="Sir Mokshagundam Visvesvaraya, author of the first Indian planning outline." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/2.png" alt="Planned Economy for India Visvesvaraya 1934 book cover" data-caption="The 1934 work Planned Economy for India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/3.png" alt="Three boxes in a row under the title Ten Year Plan 1934: Double national income, More indu" data-caption="The three goals of the ten year plan of 1934." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">He put the plan in his work <i>Planned Economy for India</i>. The plan was meant for <b>ten years</b>, and it wanted the country to grow in factories as well as in farms.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Year</td><td>1934</td></tr><tr><td>Author</td><td>Mokshagundam Visvesvaraya</td></tr><tr><td>Work</td><td>Planned Economy for India</td></tr><tr><td>Length</td><td>Ten years</td></tr><tr><td>Main goals</td><td>Double national income, raise industrial production, grow small and large industries together</td></tr></tbody></table>
      <p class="cp-lead">In the same year, the Federation of Indian Chambers of Commerce and Industry (FICCI), the leading organisation of Indian businessmen, said the country needed national planning. It also asked for a National Planning Commission to coordinate the work.</p>
      <div class="cp-note tip">Think of 1934 as the starting year of planning thought in India. Three goals are enough to remember: more income, more industry, and both small and large units.</div>
      <div class="cp-note trap">Do not mix this plan with the Bombay Plan of 1944. The Bombay Plan was written by industrialists, while this one was written by one engineer.</div>
      <div class="cp-note exam">Questions usually ask for the author, the year or the length of the plan.</div>
    `
  },
  3: {
    questext: "Who gave the first outline of economic planning in India in the year 1934?",
    options: ["Jawaharlal Nehru", "Prasanta Chandra Mahalanobis", "Manabendra Nath Roy", "Mokshagundam Visvesvaraya"],
    correct: "4",
    exptext: "✅ Mokshagundam Visvesvaraya proposed it in his work Planned Economy for India. 📌 Remember 1934 with Visvesvaraya. ❌ Nehru is wrong because he led the National Planning Committee in 1938."
  },
  4: {
    questext: "For how many years was the Visvesvaraya Plan of 1934 designed?",
    options: ["Five years", "Ten years", "Seven years", "Fifteen years"],
    correct: "2",
    exptext: "✅ The plan was designed for ten years, with the aim of doubling national income. 📌 One engineer, one decade. ❌ Five years is wrong because that length became common only after Independence."
  },
  5: {
    questext: "Consider the following statements about planning in India in 1934:\n1. The Federation of Indian Chambers of Commerce and Industry asked for a National Planning Commission.\n2. The Visvesvaraya Plan gave the greatest priority to agriculture.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because businessmen wanted a central planning body. 📌 The 1934 plan stressed industry; the People's Plan stressed agriculture. ❌ Statement 2 mixes up the two plans."
  },
  6: {
    type: "concept", icon: "🏛️", accent: "#f59e0b", pauseTimer: true,
    title: "National Planning Committee (1938)",
    html: `
      <p class="cp-lead">The Indian National Congress formed the <b>National Planning Committee</b> in 1938 to prepare a detailed blueprint of an economic plan for an independent India.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/4.png" alt="Jawaharlal Nehru 1938 National Planning Committee photo" data-caption="Jawaharlal Nehru, who chaired the National Planning Committee." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/5.png" alt="Subhas Chandra Bose Congress president 1938 photo" data-caption="Subhas Chandra Bose, Congress president when the committee was formed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Subhas Chandra Bose was the Congress president at that time, and he set up the committee. Jawaharlal Nehru was its chairman. This was the first time a political party took planning in hand for the whole country.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Formed by</td><td>Indian National Congress</td></tr><tr><td>Year</td><td>1938</td></tr><tr><td>Congress president</td><td>Subhas Chandra Bose</td></tr><tr><td>Chairman</td><td>Jawaharlal Nehru</td></tr><tr><td>Aim</td><td>A detailed blueprint of an economic plan for independent India</td></tr></tbody></table>
      <p class="cp-lead">The earlier plans came from one person or one group. This committee gave planning a national and political shape, and its ideas were later used when the Planning Commission was set up.</p>
      <div class="cp-note trap">Bose was the Congress president, but Nehru was the chairman of the committee. Examiners like to swap these two names.</div>
      <div class="cp-note exam">Remember the pair "1938, Nehru chairman, Bose president".</div>
    `
  },
  7: {
    questext: "Who was the chairman of the National Planning Committee formed in 1938?",
    options: ["Subhas Chandra Bose", "Sardar Vallabhbhai Patel", "Mokshagundam Visvesvaraya", "Jawaharlal Nehru"],
    correct: "4",
    exptext: "✅ Jawaharlal Nehru chaired the committee. 📌 Nehru chaired, Bose was the party president. ❌ Bose is the tempting option, but he was the Congress president who formed it."
  },
  8: {
    questext: "The National Planning Committee was formed by which body?",
    options: ["Federation of Indian Chambers of Commerce and Industry", "Muslim League", "Indian National Congress", "Imperial Legislative Council"],
    correct: "3",
    exptext: "✅ The Indian National Congress formed the committee in 1938. 📌 Congress and planning go together here. ❌ The Federation of Indian Chambers of Commerce and Industry only demanded a commission in 1934."
  },
  9: {
    type: "concept", icon: "🏢", accent: "#ef4444", pauseTimer: true,
    title: "Bombay Plan (1944)",
    html: `
      <p class="cp-lead">A group of leading Indian industrialists wrote a plan in 1944 that is known as the <b>Bombay Plan</b>. <u>It was a plan by business leaders, not by the government.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/6.png" alt="JRD Tata portrait photo" data-caption="Jehangir Ratanji Dadabhoy Tata, one of the authors of the Bombay Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/7.png" alt="G D Birla portrait photo" data-caption="Ghanshyam Das Birla, an industrialist who helped prepare the plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/8.png" alt="A group of eight name cards around a central title Bombay Plan 1944: Tata, Birla, Thakurda" data-caption="The eight authors placed around the Bombay Plan title." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The authors were Jehangir Ratanji Dadabhoy Tata, Ghanshyam Das Birla, Purshottamdas Thakurdas, Lala Shriram, Kasturbhai Lalbhai, Ardeshir Dalal, Ardeshir Shroff and John Mathai.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Year</td><td>1944</td></tr><tr><td>Written by</td><td>Eight industrialists of Bombay</td></tr><tr><td>Famous names</td><td>J. R. D. Tata and G. D. Birla</td></tr><tr><td>What happened to it</td><td>Political parties and the business class neglected it</td></tr></tbody></table>
      <p class="cp-lead">The plan was not followed in the end. Political parties and even the business class ignored it for various reasons.</p>
      <div class="cp-note trap">The Bombay Plan was written by industrialists, so do not call it a government or Congress plan.</div>
      <div class="cp-note exam">Questions ask for the year 1944, the name of an author, or who prepared it.</div>
    `
  },
  10: {
    questext: "Which of the following persons was NOT among the industrialists who prepared the Bombay Plan of 1944?",
    options: ["J. R. D. Tata", "Jawaharlal Nehru", "G. D. Birla", "Purshottamdas Thakurdas"],
    correct: "2",
    exptext: "✅ Jawaharlal Nehru was a political leader and was not among the industrialist authors. 📌 Bombay Plan equals businessmen. ❌ Tata, Birla and Thakurdas all helped prepare it."
  },
  11: {
    questext: "The Bombay Plan of 1944 was prepared by whom?",
    options: ["The Planning Commission", "The Indian National Congress", "Villagers of Wardha", "A group of industrialists"],
    correct: "4",
    exptext: "✅ Leading industrialists of Bombay wrote it. 📌 Bombay Plan, businessmen's plan. ❌ The Planning Commission did not exist until 1950."
  },
  12: {
    type: "concept", icon: "🌾", accent: "#8b5cf6", pauseTimer: true,
    title: "People's Plan (1944)",
    html: `
      <p class="cp-lead">The <b>People's Plan</b> was written in 1944 by <b>Manabendra Nath Roy</b>, and it gave the greatest importance to agriculture.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/9.png" alt="M N Roy portrait photo" data-caption="Manabendra Nath Roy, author of the People's Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/10.png" alt="Simple wheat field icon in the centre with three labels around it: Agriculture first, Ten " data-caption="The People's Plan put farming at the centre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">The plan was meant for <b>ten years</b>. It wanted the nation to take over all agriculture and production, so that the state, not private owners, would run them.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Year</td><td>1944</td></tr><tr><td>Author</td><td>Manabendra Nath Roy</td></tr><tr><td>Length</td><td>Ten years</td></tr><tr><td>Top priority</td><td>Agriculture</td></tr><tr><td>Main idea</td><td>Nationalisation of all agriculture and production</td></tr></tbody></table>
      <div class="cp-note trap">The People's Plan is about agriculture. The Visvesvaraya Plan and the Bombay Plan are about industry.</div>
      <div class="cp-note exam">Remember "M. N. Roy, People's Plan, agriculture first".</div>
    `
  },
  13: {
    questext: "Which plan of 1944 gave the greatest priority to agriculture?",
    options: ["Bombay Plan", "Visvesvaraya Plan", "People's Plan", "Sarvodaya Plan"],
    correct: "3",
    exptext: "✅ The People's Plan by Manabendra Nath Roy put agriculture first. 📌 People means farmers and villages. ❌ The Bombay Plan is the tempting option, but it was an industrialists' plan."
  },
  14: {
    type: "concept", icon: "🧵", accent: "#14b8a6", pauseTimer: true,
    title: "Gandhian Plan (1944)",
    html: `
      <p class="cp-lead">The <b>Gandhian Plan</b> of 1944 was based on the ideas of Mahatma Gandhi. It wanted villages to grow first, through cottage industries.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/11.png" alt="Mahatma Gandhi spinning charkha photo" data-caption="Mahatma Gandhi at the spinning wheel, a symbol of cottage industry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/12.png" alt="Village in the centre with arrows to Cottage industries, Rural development, Decentralised " data-caption="The Gandhian Plan built the economy from the village upward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">It was written by <b>Sriman Narayan</b>, who was the principal of Wardha Commercial College. The plan stressed <u>economic decentralisation</u>, which means spreading economic power to many villages instead of keeping it in a few cities.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Year</td><td>1944</td></tr><tr><td>Author</td><td>Sriman Narayan</td></tr><tr><td>His post</td><td>Principal, Wardha Commercial College</td></tr><tr><td>Main idea</td><td>Economic decentralisation</td></tr><tr><td>Method</td><td>Rural development through cottage industries</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse the Gandhian Plan with the Sarvodaya Plan. The Gandhian Plan is of 1944 and the Sarvodaya Plan is of 1950.</div>
      <div class="cp-note exam">Remember "Gandhian, Sriman Narayan, cottage industries".</div>
    `
  },
  15: {
    questext: "Who prepared the Gandhian Plan of 1944?",
    options: ["Jayaprakash Narayan", "Sriman Narayan", "Vinoba Bhave", "Manabendra Nath Roy"],
    correct: "2",
    exptext: "✅ Sriman Narayan, principal of Wardha Commercial College, wrote it. 📌 Gandhian plan, Sriman Narayan. ❌ Jayaprakash Narayan is tempting because of the name, but he wrote the Sarvodaya Plan."
  },
  16: {
    type: "concept", icon: "🤝", accent: "#ec4899", pauseTimer: true,
    title: "Sarvodaya Plan (1950)",
    html: `
      <p class="cp-lead">The <b>Sarvodaya Plan</b> was prepared in 1950 by <b>Jayaprakash Narayan</b>. <u>Sarvodaya means the welfare of all.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/13.png" alt="Jayaprakash Narayan portrait photo" data-caption="Jayaprakash Narayan, who prepared the Sarvodaya Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/14.png" alt="Vinoba Bhave Bhoodan movement photo" data-caption="Vinoba Bhave, whose Sarvodaya idea inspired the plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">It was inspired by the Gandhian Plan and by the Sarvodaya idea of Vinoba Bhave. It stressed small and cottage industries and agriculture, and it also gave importance to land reforms and decentralised, participatory planning, where people take part in making the plan.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Year</td><td>1950</td></tr><tr><td>Author</td><td>Jayaprakash Narayan</td></tr><tr><td>Inspired by</td><td>Gandhian Plan and Vinoba Bhave's Sarvodaya idea</td></tr><tr><td>Main ideas</td><td>Small and cottage industries, agriculture, land reforms, participatory planning</td></tr></tbody></table>
      <div class="cp-note trap">The Sarvodaya Plan is the last of the early plans and comes after Independence, in 1950, the same year the Planning Commission was set up.</div>
      <div class="cp-note exam">Remember "Sarvodaya, Jayaprakash Narayan, 1950, land reforms".</div>
    `
  },
  17: {
    questext: "The Sarvodaya Plan of 1950 was prepared by whom?",
    options: ["Sriman Narayan", "Mahatma Gandhi", "Mokshagundam Visvesvaraya", "Jayaprakash Narayan"],
    correct: "4",
    exptext: "✅ Jayaprakash Narayan prepared it, inspired by Gandhian ideas and Vinoba Bhave. 📌 Sarvodaya, Jayaprakash. ❌ Sriman Narayan wrote the earlier Gandhian Plan."
  },
  18: {
    questext: "Consider the following statements about early plans in India:\n1. The People's Plan was prepared by Manabendra Nath Roy.\n2. The Gandhian Plan and the Sarvodaya Plan were both written in 1944.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Gandhian is 1944, Sarvodaya is 1950. ❌ Statement 2 is wrong because the Sarvodaya Plan was prepared in 1950."
  },
  19: {
    type: "concept", icon: "🏛️", accent: "#3b82f6", pauseTimer: true,
    title: "Planning Commission and NITI Aayog",
    html: `
      <p class="cp-lead">The <b>Planning Commission</b> ran Five Year Planning from 1950 to 2014. In 2015 it was replaced by <b>NITI Aayog</b>, which works in a very different way.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/15.png" alt="NITI Aayog building New Delhi photo" data-caption="The NITI Aayog office building in New Delhi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/16.png" alt="Two arrows side by side: Planning Commission with an arrow going from Centre down to State" data-caption="The two bodies work in opposite directions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Planning Commission</th><th>NITI Aayog</th></tr></thead><tbody><tr><td>Period</td><td>15 March 1950 to 13 August 2014</td><td>From 1 January 2015</td></tr><tr><td>Nature</td><td>Executive body, advisory</td><td>Executive body, advisory</td></tr><tr><td>Chairperson</td><td>Prime Minister</td><td>Prime Minister</td></tr><tr><td>Vice Chairperson</td><td>Any economist</td><td>Any economist</td></tr><tr><td>Head of staff</td><td>Secretary, a retired Indian Administrative Service officer</td><td>Chief Executive Officer, a retired Indian Administrative Service officer</td></tr><tr><td>Members</td><td>Expert members and a group of Cabinet ministers</td><td>Governing Council of all Chief Ministers, Chief Ministers of Delhi, Puducherry and Jammu and Kashmir, and Administrators of the other Union Territories</td></tr><tr><td>Type</td><td>Central body, no representation of states</td><td>Federal body, with both state and central governments</td></tr><tr><td>Planning style</td><td>Five Year Plans</td><td>Three year action plan, seven year strategy and fifteen year vision document</td></tr><tr><td>Approach</td><td>Top to bottom</td><td>Bottom to top</td></tr><tr><td>Money</td><td>Had financial rights</td><td>No financial rights</td></tr></tbody></table>
      <p class="cp-lead">The Planning Commission gave money to states and fixed targets from the centre. NITI Aayog only gives advice and ideas, and it asks the states to take part in making the plans.</p>
      <table><thead><tr><th>Office</th><th>Planning Commission</th><th>NITI Aayog</th></tr></thead><tbody><tr><td>First Chairperson</td><td>Jawaharlal Nehru</td><td>Narendra Modi</td></tr><tr><td>First Vice Chairperson</td><td>Gulzarilal Nanda</td><td>Arvind Panagariya</td></tr><tr><td>Last Chairperson or Vice Chairperson</td><td>Manmohan Singh and Montek Singh Ahluwalia</td><td>Present Vice Chairperson is Ashok Lahiri</td></tr><tr><td>Chief Executive Officer</td><td>Not applicable</td><td>First was Sindhushree Khullar; present is Anurag Jain</td></tr></tbody></table>
      <div class="cp-note trap">In the Planning Commission the senior officer was called Secretary, and in NITI Aayog he is called Chief Executive Officer.</div>
      <div class="cp-note exam">Remember "Planning Commission is top to bottom with money, NITI Aayog is bottom to top without money".</div>
    `
  },
  20: {
    questext: "Which of the following is a feature of NITI Aayog but NOT of the Planning Commission?",
    options: ["The Prime Minister is the chairperson", "It is an advisory body", "It works with a bottom to top approach", "It has financial rights"],
    correct: "3",
    exptext: "✅ NITI Aayog works from the states upward, which is a bottom to top approach. 📌 Planning Commission equals top to bottom. ❌ Having financial rights is a feature of the Planning Commission, since NITI Aayog has none."
  },
  21: {
    questext: "Who was the first Vice Chairperson of the Planning Commission?",
    options: ["Montek Singh Ahluwalia", "Gulzarilal Nanda", "Jawaharlal Nehru", "Arvind Panagariya"],
    correct: "2",
    exptext: "✅ Gulzarilal Nanda was the first Vice Chairperson. 📌 Nanda for the Commission, Panagariya for NITI Aayog. ❌ Arvind Panagariya was the first Vice Chairperson of NITI Aayog."
  },
  22: {
    questext: "Consider the following statements about NITI Aayog:\n1. It replaced the Planning Commission from 1 January 2015.\n2. Its Governing Council includes the Chief Ministers of all states.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both are correct. 📌 NITI Aayog is a federal body, so states sit in its council. ❌ Saying only one is correct ignores that it began on 1 January 2015 and has all Chief Ministers as members."
  },
  23: {
    type: "concept", icon: "🌊", accent: "#f97316", pauseTimer: true,
    title: "First Five-Year Plan",
    html: `
      <p class="cp-lead">The First Five Year Plan ran from <b>1951 to 1956</b>. It put the main stress on <b>agriculture and irrigation</b>, because the country had just come out of a food crisis.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/17.png" alt="Bhakra Nangal Dam Sutlej River photo" data-caption="The Bhakra Nangal Dam on the Sutlej River." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/18.png" alt="Hirakud Dam Mahanadi Odisha photo" data-caption="The Hirakud Dam on the Mahanadi River in Odisha." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/19.png" alt="Nagarjuna Sagar Dam Krishna River photo" data-caption="The Nagarjuna Sagar Dam on the Krishna River." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1951 to 1956</td></tr><tr><td>Model</td><td>Harrod-Domar Model</td></tr><tr><td>Presented by</td><td>Jawaharlal Nehru</td></tr><tr><td>Focus</td><td>Agriculture and irrigation</td></tr><tr><td>Target growth</td><td>2.1 percent</td></tr><tr><td>Achieved growth</td><td>3.6 percent</td></tr></tbody></table>
      <p class="cp-lead">The plan was a success, because the growth achieved was higher than the target. Money was spent on big dams, which store water and bring irrigation to dry fields.</p>
      <table><thead><tr><th>Dam</th><th>River</th><th>Special fact</th></tr></thead><tbody><tr><td>Bhakra Nangal</td><td>Sutlej</td><td>Highest straight gravity dam</td></tr><tr><td>Hirakud</td><td>Mahanadi in Odisha</td><td>One of the longest earthen dams in the world</td></tr><tr><td>Nagarjuna Sagar</td><td>Krishna</td><td>Large masonry dam</td></tr></tbody></table>
      <p class="cp-lead">Land reforms began in this plan under the policy of <b>Land to the Tiller</b>, which gave ownership to the people who actually farm the land and aimed to end the Zamindari system. The Community Development Programme was launched in 1952 for overall rural development. The first Indian Institute of Technology was set up at Kharagpur in 1951.</p>
      <div class="cp-note trap">Growth achieved was 3.6 percent against a target of 2.1 percent, so this is one of the few plans where the result was better than the target.</div>
      <div class="cp-note exam">Remember "First plan, Harrod-Domar, agriculture".</div>
    `
  },
  24: {
    questext: "Which model was adopted in the First Five Year Plan of India?",
    options: ["Harrod-Domar Model", "Mahalanobis Model", "Gadgil Formula", "Sandy-Chakravarty Model"],
    correct: "1",
    exptext: "✅ The First Plan was based on the Harrod-Domar Model. 📌 First plan, first model, Harrod-Domar. ❌ The Mahalanobis Model belongs to the Second Plan."
  },
  25: {
    questext: "The Bhakra Nangal Dam, supported in the First Plan, is built on which river?",
    options: ["Mahanadi", "Krishna", "Godavari", "Sutlej"],
    correct: "4",
    exptext: "✅ Bhakra Nangal is on the Sutlej River. 📌 Bhakra, Sutlej, highest gravity dam. ❌ Mahanadi is the river of the Hirakud Dam."
  },
  26: {
    questext: "The Community Development Programme was launched in which year?",
    options: ["1950", "1956", "1952", "1961"],
    correct: "3",
    exptext: "✅ It was launched in 1952 for overall rural development. 📌 First plan, 1952 programme. ❌ 1950 is tempting because it was the year the Planning Commission was set up."
  },
  27: {
    type: "concept", icon: "🏗️", accent: "#84cc16", pauseTimer: true,
    title: "Second Five-Year Plan",
    html: `
      <p class="cp-lead">The Second Five Year Plan ran from <b>1956 to 1961</b>. It stressed <b>rapid industrialisation</b>, with the most weight on basic and heavy industries.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/20.png" alt="Bhilai Steel Plant photo" data-caption="The Bhilai Steel Plant in Chhattisgarh." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/21.png" alt="Rourkela Steel Plant photo" data-caption="The Rourkela Steel Plant in Odisha." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/22.png" alt="Three factory boxes: Rourkela Odisha Germany, Durgapur West Bengal Britain, Bhilai Chhatti" data-caption="Three steel plants and the countries that helped build them." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1956 to 1961</td></tr><tr><td>Model</td><td>P. C. Mahalanobis Model, also called the Nehru-Mahalanobis Model</td></tr><tr><td>Presented by</td><td>Jawaharlal Nehru</td></tr><tr><td>Focus</td><td>Rapid industrialisation, basic and heavy industries</td></tr><tr><td>Target growth</td><td>4.5 percent</td></tr><tr><td>Achieved growth</td><td>4.3 percent</td></tr></tbody></table>
      <table><thead><tr><th>Steel plant</th><th>State</th><th>Helped by</th></tr></thead><tbody><tr><td>Rourkela</td><td>Odisha</td><td>Germany</td></tr><tr><td>Durgapur</td><td>West Bengal</td><td>Britain</td></tr><tr><td>Bhilai</td><td>Chhattisgarh</td><td>Soviet Union</td></tr></tbody></table>
      <p class="cp-lead">Heavy industries make machines and steel, which other factories need. That is why the plan started with them. The Industrial Policy Resolution of 1956 was the basic policy behind this plan.</p>
      <div class="cp-note trap">Do not mix the countries. Remember the order Rourkela, Durgapur, Bhilai as Germany, Britain, Soviet Union.</div>
      <div class="cp-note exam">Questions ask for the model name, the steel plants or the focus on heavy industry.</div>
    `
  },
  28: {
    questext: "The Second Five Year Plan was based on which model?",
    options: ["Harrod-Domar Model", "Mahalanobis Model", "Gadgil Formula", "John Miller Model"],
    correct: "2",
    exptext: "✅ The plan followed the Mahalanobis Model, which stresses heavy industry. 📌 Second plan, steel and Mahalanobis. ❌ Harrod-Domar is the First Plan model."
  },
  29: {
    questext: "The Bhilai Steel Plant was set up with the help of which country?",
    options: ["Soviet Union", "Germany", "Britain", "United States"],
    correct: "1",
    exptext: "✅ The Bhilai Steel Plant was built with Soviet help. 📌 R for Rourkela and Germany, D for Durgapur and Britain, B for Bhilai and the Soviet Union in order. ❌ Germany helped at Rourkela, Odisha."
  },
  30: {
    questext: "Consider the following statements about the Second Five Year Plan:\n1. It stressed rapid industrialisation with heavy industries.\n2. The Durgapur Steel Plant was set up with German help.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Durgapur went with Britain. ❌ Statement 2 is wrong because Germany helped at Rourkela."
  },
  31: {
    type: "concept", icon: "📐", accent: "#06b6d4", pauseTimer: true,
    title: "P. C. Mahalanobis and the Karve Committee (1955)",
    html: `
      <p class="cp-lead"><b>Prasanta Chandra Mahalanobis</b> is called the chief architect of Indian planning. The <b>Karve Committee</b> of 1955 looked at village and small industries.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/23.png" alt="Prasanta Chandra Mahalanobis portrait photo" data-caption="Prasanta Chandra Mahalanobis, chief architect of Indian planning." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/24.png" alt="Indian Statistical Institute Kolkata building photo" data-caption="The Indian Statistical Institute in Kolkata, founded by him." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">Mahalanobis founded the Indian Statistical Institute in Kolkata and started the journal <i>Sankhya</i>. Statistics Day is celebrated every year on his birth anniversary, 29 June.</p>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Mahalanobis title</td><td>Chief architect of Indian planning</td></tr><tr><td>Institute founded</td><td>Indian Statistical Institute, Kolkata</td></tr><tr><td>Journal started</td><td>Sankhya</td></tr><tr><td>Statistics Day</td><td>29 June</td></tr><tr><td>Karve Committee</td><td>1955, also called the Village and Small-Scale Industries Committee</td></tr><tr><td>Chairman</td><td>D. G. Karve</td></tr></tbody></table>
      <p class="cp-lead">The Karve Committee wanted rural development through small industries and cottage units, so that people in villages would find jobs alongside the growth of heavy industry.</p>
      <div class="cp-note trap">Do not call Mahalanobis the father of the First Plan. His model belongs to the Second Plan.</div>
      <div class="cp-note exam">Remember "Mahalanobis, Sankhya, 29 June" and "Karve, 1955, village industries".</div>
    `
  },
  32: {
    questext: "Statistics Day is celebrated in India every year on the birth anniversary of whom?",
    options: ["Mokshagundam Visvesvaraya", "Jawaharlal Nehru", "Verghese Kurien", "Prasanta Chandra Mahalanobis"],
    correct: "4",
    exptext: "✅ It is celebrated on 29 June, the birth anniversary of Mahalanobis. 📌 Statistics Day, Mahalanobis, 29 June. ❌ Visvesvaraya is remembered for engineering and the 1934 plan."
  },
  33: {
    questext: "The Karve Committee of 1955 was concerned with which area?",
    options: ["Banking reform", "Foreign trade", "Village and small-scale industries", "Higher education"],
    correct: "3",
    exptext: "✅ It is also called the Village and Small-Scale Industries Committee. 📌 Karve means village and cottage industries. ❌ The other options are unrelated to its work."
  },
  34: {
    type: "concept", icon: "🇮🇳", accent: "#a855f7", pauseTimer: true,
    title: "Third Five-Year Plan",
    html: `
      <p class="cp-lead">The Third Five Year Plan ran from <b>1961 to 1966</b>. Its aim was a <b>self-reliant and self-generating economy</b>, but wars and drought hurt it badly.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/25.png" alt="PL 480 wheat ship India 1960s photo" data-caption="Wheat from the United States arriving in India in the 1960s." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/26.png" alt="Food Corporation of India godown grain storage photo" data-caption="A Food Corporation of India grain store." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/27.png" alt="Timeline strip with five dots: 1962 India-China war, 1964 Nehru dies, 1965 India-Pakistan " data-caption="The events that disturbed the Third Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1961 to 1966</td></tr><tr><td>Model</td><td>Sandy-Chakravarty Model (John Sandy and Sukhamoy Chakravarty)</td></tr><tr><td>Presented by</td><td>Jawaharlal Nehru</td></tr><tr><td>Focus</td><td>A self-reliant, self-generating economy</td></tr><tr><td>Target growth</td><td>5.6 percent</td></tr><tr><td>Achieved growth</td><td>2.8 percent</td></tr></tbody></table>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1962</td><td>India-China war</td></tr><tr><td>1963</td><td>Unit Trust of India Act passed</td></tr><tr><td>1964</td><td>Industrial Development Bank of India set up on 1 July, Unit Trust of India started on 1 February, Jawaharlal Nehru died</td></tr><tr><td>1965</td><td>Food Corporation of India set up on 14 January, Agricultural Prices Commission set up on 1 January, India-Pakistan war</td></tr><tr><td>1964 and 1965</td><td>Severe drought and famine</td></tr><tr><td>1966</td><td>Tashkent Agreement in January, Lal Bahadur Shastri died</td></tr></tbody></table>
      <p class="cp-lead">India imported wheat from the United States under the Public Law 480 scheme to fight hunger. Gulzarilal Nanda served as Acting Prime Minister after the deaths of Nehru and Shastri. The Agricultural Prices Commission, which recommends the Minimum Support Price, was later renamed the Commission for Agricultural Costs and Prices.</p>
      <div class="cp-note trap">The growth achieved was only 2.8 percent against a target of 5.6 percent, which makes this the weakest plan in numbers so far.</div>
      <div class="cp-note exam">Remember "Third plan, wars and famine, target 5.6, achieved 2.8".</div>
    `
  },
  35: {
    questext: "Under which scheme did India import wheat from the United States during the Third Plan?",
    options: ["Green Revolution", "Public Law 480", "Operation Flood", "Antyodaya"],
    correct: "2",
    exptext: "✅ India imported wheat under the Public Law 480 scheme to fight hunger. 📌 Third plan equals imported wheat. ❌ Operation Flood is about milk and began in 1970."
  },
  36: {
    questext: "The Food Corporation of India was established in which year?",
    options: ["1965", "1956", "1962", "1971"],
    correct: "1",
    exptext: "✅ It was established on 14 January 1965. 📌 The Food Corporation and the Agricultural Prices Commission both came in 1965. ❌ 1971 is wrong because it is the year of the India-Pakistan war."
  },
  37: {
    questext: "Which of the following gave the Third Plan a poor result?",
    options: ["Large foreign investment", "A planning holiday", "Bank nationalisation", "Wars and severe drought"],
    correct: "4",
    exptext: "✅ The wars of 1962 and 1965 and the drought of 1964 and 1965 reduced growth to 2.8 percent. 📌 Wars plus famine equals failure. ❌ A planning holiday came after the plan, not during it."
  },
  38: {
    type: "concept", icon: "⏸️", accent: "#e11d48", pauseTimer: true,
    title: "First Planning Holiday (1966-69)",
    html: `
      <p class="cp-lead">After the Third Plan failed, India did not start a new Five Year Plan. Instead it followed <b>three annual plans</b> from 1966 to 1969, a period called the <b>First Planning Holiday</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/28.png" alt="Indira Gandhi 1966 Prime Minister photo" data-caption="Indira Gandhi, Prime Minister during the first planning holiday." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/29.png" alt="Three boxes in a row: 1966-67 First Annual Plan, 1967-68 Second Annual Plan, 1968-69 Third" data-caption="The three annual plans of the first planning holiday." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1966 to 1969</td></tr><tr><td>Prime Minister</td><td>Indira Gandhi</td></tr><tr><td>Plans</td><td>Three annual plans (1966-67, 1967-68, 1968-69)</td></tr><tr><td>Focus</td><td>Self-reliance</td></tr><tr><td>Also launched</td><td>Green Revolution</td></tr></tbody></table>
      <p class="cp-lead">A <b>holiday</b> here only means a break from a Five Year Plan, not a break from work. The wars, the drought and the shortage of money made it hard to plan for five years ahead, so the country planned one year at a time. In these years the Green Revolution began, with high-yielding seeds, to make India self-sufficient in food.</p>
      <div class="cp-note trap">Do not call it a break in development. It is only a pause in Five Year Plans.</div>
      <div class="cp-note exam">Remember "Planning Holiday, Indira Gandhi, three annual plans, 1966 to 1969".</div>
    `
  },
  39: {
    questext: "How many annual plans were launched during the First Planning Holiday?",
    options: ["Two", "Four", "Three", "Five"],
    correct: "3",
    exptext: "✅ Three annual plans were launched between 1966 and 1969. 📌 Three years, three plans. ❌ Two annual plans belong to the second planning holiday of 1990 to 1992."
  },
  40: {
    questext: "Who was the Prime Minister during the First Planning Holiday?",
    options: ["Lal Bahadur Shastri", "Indira Gandhi", "Gulzarilal Nanda", "Rajiv Gandhi"],
    correct: "2",
    exptext: "✅ Indira Gandhi was Prime Minister from January 1966. 📌 Planning holiday, Indira, Green Revolution. ❌ Shastri died in January 1966, before the plans began."
  },
  41: {
    type: "concept", icon: "🏦", accent: "#10b981", pauseTimer: true,
    title: "Fourth Five-Year Plan",
    html: `
      <p class="cp-lead">The Fourth Five Year Plan ran from <b>1969 to 1974</b> under Prime Minister <b>Indira Gandhi</b>. Its aim was <b>growth with stability</b> and progress towards self-reliance.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/30.png" alt="Verghese Kurien Operation Flood Amul photo" data-caption="Verghese Kurien, the father of the White Revolution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/31.png" alt="Pokhran 1974 Smiling Buddha nuclear test site photo" data-caption="The Pokhran test site where India's first peaceful nuclear test was held." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/32.png" alt="Timeline strip: 1969 bank nationalisation, 1970 Operation Flood, 1971 privy purses end and" data-caption="Key events of the Fourth Plan period." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1969 to 1974</td></tr><tr><td>Prime Minister</td><td>Indira Gandhi</td></tr><tr><td>President</td><td>V. V. Giri</td></tr><tr><td>Model</td><td>Gadgil Formula for sharing central help with states; model credited to Alan Manne and Ashok Rudra</td></tr><tr><td>Focus</td><td>Growth with stability and progressive self-reliance</td></tr><tr><td>Target growth</td><td>5.6 percent</td></tr><tr><td>Achieved growth</td><td>3.3 percent</td></tr></tbody></table>
      <table><thead><tr><th>Year</th><th>Event</th></tr></thead><tbody><tr><td>1969</td><td>Nationalisation of 14 private banks</td></tr><tr><td>1970-71</td><td>Operation Flood for milk production, the White Revolution, led by Verghese Kurien</td></tr><tr><td>1971</td><td>Treaty of friendship with the Soviet Union, end of privy purses, India-Pakistan war</td></tr><tr><td>1972</td><td>Shimla Agreement, an India-Pakistan peace agreement</td></tr><tr><td>1973-74</td><td>Drought Prone Area Programme</td></tr><tr><td>1974</td><td>Operation Smiling Buddha, India's first peaceful nuclear test</td></tr></tbody></table>
      <p class="cp-lead"><b>Nationalisation</b> means that the government takes over private banks so that they serve the whole country. A privy purse was the yearly payment given to former princes, and it ended in 1971.</p>
      <div class="cp-note trap">Do not confuse Operation Flood (milk, 1970) with the Green Revolution (grain, mid 1960s).</div>
      <div class="cp-note exam">Remember "Fourth plan, Gadgil Formula, banks 1969, Operation Flood, Smiling Buddha 1974".</div>
    `
  },
  42: {
    questext: "Verghese Kurien is known as the father of which revolution?",
    options: ["White Revolution", "Green Revolution", "Blue Revolution", "Yellow Revolution"],
    correct: "1",
    exptext: "✅ Verghese Kurien led Operation Flood, which started the White Revolution in milk. 📌 White for milk, Kurien. ❌ The Green Revolution is about food grains."
  },
  43: {
    questext: "Fourteen private banks were nationalised in which year?",
    options: ["1971", "1974", "1980", "1969"],
    correct: "4",
    exptext: "✅ Fourteen major private banks were nationalised in 1969 by Indira Gandhi. 📌 Fourth plan began in 1969 with bank nationalisation. ❌ 1980 is the year six more banks were nationalised."
  },
  44: {
    questext: "Which of the following took place in 1974?",
    options: ["Shimla Agreement", "Nationalisation of banks", "Operation Smiling Buddha", "Operation Flood"],
    correct: "3",
    exptext: "✅ India carried out its first peaceful nuclear test, called Operation Smiling Buddha, in 1974. 📌 1974 is also the first Pokhran. ❌ The Shimla Agreement was signed in 1972."
  },
  45: {
    type: "concept", icon: "🛠️", accent: "#eab308", pauseTimer: true,
    title: "Fifth Five Year Plan (1974-78)",
    html: `
      <p class="cp-lead">The Fifth Plan began in 1974 with the slogan <b>Garibi Hatao</b>, which means remove poverty. It was meant for 1974 to 1979, but it was ended a year early in 1978.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/33.png" alt="Indira Gandhi Garibi Hatao 1971 photo" data-caption="Indira Gandhi, Prime Minister who launched Garibi Hatao." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/34.png" alt="Regional Rural Bank branch India photo" data-caption="A Regional Rural Bank branch serving farmers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1974 to 1978</td></tr><tr><td>Model</td><td>D. P. Dhar</td></tr><tr><td>Prime Minister</td><td>Indira Gandhi</td></tr><tr><td>Focus</td><td>Removing poverty, self-reliance and family planning</td></tr><tr><td>Target growth</td><td>4.4 percent</td></tr><tr><td>Achieved growth</td><td>4.8 percent</td></tr></tbody></table>
      <p class="cp-lead">This was a plan where the result was better than the target. In 1975 the government started the <b>Twenty-Point Programme</b> for the poor. The Minimum Needs Programme, the Food for Work Programme and a hill area development programme were also started. Regional Rural Banks were set up in 1975.</p>
      <div class="cp-note trap">In 1975, Article 352 was used to declare the National Emergency, so you may see this year in questions about Indira Gandhi as well.</div>
      <div class="cp-note exam">Remember "Fifth plan, Garibi Hatao, Twenty-Point Programme, Regional Rural Banks 1975".</div>
    `
  },
  46: {
    questext: "Which slogan is linked with the Fifth Five Year Plan?",
    options: ["Jai Jawan Jai Kisan", "Garibi Hatao", "Make in India", "Sabka Saath"],
    correct: "2",
    exptext: "✅ Garibi Hatao was the slogan of the Fifth Plan under Indira Gandhi. 📌 Fifth plan, poverty. ❌ Jai Jawan Jai Kisan was Lal Bahadur Shastri's slogan."
  },
  47: {
    questext: "The Twenty-Point Programme was started in which year?",
    options: ["1975", "1971", "1978", "1980"],
    correct: "1",
    exptext: "✅ It was started in 1975 during the Fifth Plan. 📌 Twenty-point, 1975, with Regional Rural Banks. ❌ 1971 is the year of Garibi Hatao in the election campaign."
  },
  48: {
    type: "concept", icon: "🔄", accent: "#0ea5e9", pauseTimer: true,
    title: "Rolling Plan (1978-80)",
    html: `
      <p class="cp-lead">The <b>Rolling Plan</b> was introduced in 1978 by Prime Minister <b>Morarji Desai</b>, and it was terminated in 1980. <u>It is a plan that is reviewed and moved forward every year.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/35.png" alt="Morarji Desai Prime Minister 1977 photo" data-caption="Morarji Desai, Prime Minister of the Janata government." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/36.png" alt="A sliding window across years: a three year window labelled 1978-81 moving one box forward" data-caption="A rolling plan is updated every year as it moves forward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1978 to 1980</td></tr><tr><td>Prime Minister</td><td>Morarji Desai</td></tr><tr><td>Idea of continuous planning given by</td><td>Gunnar Myrdal, in his work Asian Drama</td></tr><tr><td>Credit for use in India</td><td>Janata government and D. T. Lakdawala</td></tr><tr><td>Ended</td><td>1980</td></tr></tbody></table>
      <p class="cp-lead">The government changed in 1977, and the new government ended the Fifth Plan in 1978. During this period, high-value currency notes were demonetised, prohibition of liquor was pushed, and the public distribution system and the public insurance scheme were expanded.</p>
      <div class="cp-note trap">The Rolling Plan is not a Five Year Plan. Its length is not fixed, and it is revised each year.</div>
      <div class="cp-note exam">Remember "Rolling Plan, Morarji Desai, Gunnar Myrdal, Lakdawala".</div>
    `
  },
  49: {
    questext: "The idea of continuous or rolling planning was given by which economist?",
    options: ["Amartya Sen", "Alan Manne", "John Miller", "Gunnar Myrdal"],
    correct: "4",
    exptext: "✅ Gunnar Myrdal proposed continuous planning in his work Asian Drama. 📌 Myrdal means rolling. ❌ Alan Manne is linked with the Fourth Plan model."
  },
  50: {
    questext: "Which Prime Minister introduced the Rolling Plan in 1978?",
    options: ["Indira Gandhi", "Charan Singh", "Morarji Desai", "Rajiv Gandhi"],
    correct: "3",
    exptext: "✅ Morarji Desai of the Janata government introduced it. 📌 Rolling plan, Janata, Desai. ❌ Indira Gandhi's government returned in 1980 and ended it."
  },
  51: {
    type: "concept", icon: "🌱", accent: "#d946ef", pauseTimer: true,
    title: "Sixth Five-Year Plan",
    html: `
      <p class="cp-lead">The Sixth Five Year Plan ran from <b>1980 to 1985</b> under Indira Gandhi. It aimed at <b>removing poverty and creating jobs</b>, with a rise in national income and modern technology.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/37.png" alt="NABARD headquarters Mumbai building photo" data-caption="The head office of the National Bank for Agriculture and Rural Development." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/38.png" alt="Four boxes under the title Rural schemes: TRYSEM youth training, IRDP assets, NREP seasona" data-caption="The four rural job schemes of the Sixth Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1980 to 1985</td></tr><tr><td>Prime Minister</td><td>Indira Gandhi</td></tr><tr><td>Focus</td><td>Removing poverty, jobs, higher national income, modern technology</td></tr><tr><td>Target growth</td><td>5.2 percent</td></tr><tr><td>Achieved growth</td><td>5.7 percent</td></tr><tr><td>Result</td><td>Successful</td></tr></tbody></table>
      <table><thead><tr><th>Scheme</th><th>Full form and purpose</th></tr></thead><tbody><tr><td>TRYSEM</td><td>Training of Rural Youth for Self-Employment</td></tr><tr><td>IRDP</td><td>Integrated Rural Development Programme, to give assets to poor families</td></tr><tr><td>NREP</td><td>National Rural Employment Programme, for work in the slack season</td></tr><tr><td>RLEGP</td><td>Rural Landless Labour Employment Guarantee Programme, launched on 15 August 1983</td></tr></tbody></table>
      <p class="cp-lead">The National Bank for Agriculture and Rural Development (NABARD) was set up on 12 July 1982 on the advice of the B. Sivaraman Committee. It gives credit for farming and village industries.</p>
      <div class="cp-note trap">The Sixth Plan is called successful because the achieved growth of 5.7 percent was above the target.</div>
      <div class="cp-note exam">Remember "Sixth plan, TRYSEM, IRDP, NREP, NABARD 1982".</div>
    `
  },
  52: {
    questext: "The National Bank for Agriculture and Rural Development was established on the recommendation of which committee?",
    options: ["Karve Committee", "B. Sivaraman Committee", "Narasimham Committee", "Kelkar Committee"],
    correct: "2",
    exptext: "✅ The B. Sivaraman Committee recommended it, and it began on 12 July 1982. 📌 Sixth plan, Sivaraman, 1982. ❌ The Karve Committee of 1955 dealt with village industries."
  },
  53: {
    questext: "Which of the following schemes was started in the Sixth Five Year Plan to give assets to poor rural families?",
    options: ["Integrated Rural Development Programme", "Mahatma Gandhi National Rural Employment Guarantee Act", "Twenty-Point Programme", "Operation Flood"],
    correct: "1",
    exptext: "✅ The Integrated Rural Development Programme was a key Sixth Plan scheme for assets. 📌 The assets scheme is the Integrated Rural Development Programme. ❌ The Twenty-Point Programme was launched in 1975."
  },
  54: {
    type: "concept", icon: "🌾", accent: "#64748b", pauseTimer: true,
    title: "Seventh Five Year Plan (1985-90)",
    html: `
      <p class="cp-lead">The Seventh Plan ran from <b>1985 to 1990</b> under Prime Minister <b>Rajiv Gandhi</b>. It was based on the <b>John W. Miller Model</b> and stressed food, jobs and productivity.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/39.png" alt="Rajiv Gandhi Prime Minister 1985 photo" data-caption="Rajiv Gandhi, Prime Minister during the Seventh Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/40.png" alt="Three linked circles: Food grain production, Employment creation, Productivity through soc" data-caption="The three goals of the Seventh Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1985 to 1990</td></tr><tr><td>Model</td><td>John W. Miller Model</td></tr><tr><td>Prime Minister</td><td>Rajiv Gandhi</td></tr><tr><td>Focus</td><td>Rapid food grain production, jobs and higher productivity through social justice</td></tr><tr><td>Target growth</td><td>5 percent</td></tr><tr><td>Achieved growth</td><td>6 percent</td></tr></tbody></table>
      <p class="cp-lead">The plan beat its target. But towards its end, in 1990, India faced a serious Balance of Payments crisis, meaning it did not have enough foreign money to pay for imports. This crisis led to the big reforms of 1991, known as Liberalisation, Privatisation and Globalisation.</p>
      <div class="cp-note trap">Growth was 6 percent against a target of 5 percent, but the crisis still came, so good growth does not mean a safe economy.</div>
      <div class="cp-note exam">Remember "Seventh plan, John W. Miller, Rajiv Gandhi, 1990 crisis, 1991 reforms".</div>
    `
  },
  55: {
    questext: "The Seventh Five Year Plan was based on which model?",
    options: ["Mahalanobis Model", "Harrod-Domar Model", "D. P. Dhar Model", "John W. Miller Model"],
    correct: "4",
    exptext: "✅ The Seventh Plan used the John W. Miller Model. 📌 Seventh plan, Miller. ❌ D. P. Dhar is the Fifth Plan model."
  },
  56: {
    questext: "Which crisis of 1990 was followed by the economic reforms of 1991?",
    options: ["Food crisis", "Banking crisis", "Balance of Payments crisis", "Oil price shock only"],
    correct: "3",
    exptext: "✅ India had too little foreign money to pay for imports, so reforms followed. 📌 1990 crisis then 1991 reforms. ❌ A food crisis was the problem of the 1960s."
  },
  57: {
    type: "concept", icon: "⏸️", accent: "#fb7185", pauseTimer: true,
    title: "Second Planning Holiday (1990-92)",
    html: `
      <p class="cp-lead">In 1990 and 1991 the country was in an economic crisis, so it again took a short break from Five Year Plans. This period is the <b>Second Planning Holiday</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/41.png" alt="Manmohan Singh 1991 budget liberalisation photo" data-caption="Manmohan Singh, who presented the reform budget of 1991." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/42.png" alt="Two boxes: Annual Plan 1990-91 and Annual Plan 1991-92, under the title Second Planning Ho" data-caption="Two annual plans filled the gap between the Seventh and Eighth Plans." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1990 to 1992</td></tr><tr><td>Plans</td><td>Two annual plans (1990-91 and 1991-92)</td></tr><tr><td>Reason</td><td>Balance of Payments crisis and the 1991 reforms</td></tr><tr><td>Next plan</td><td>Eighth Plan, 1992 to 1997</td></tr></tbody></table>
      <p class="cp-lead">In 1991 the country opened its economy through the new economic policy. After the break, the Eighth Plan began in 1992.</p>
      <div class="cp-note trap">The first planning holiday had three annual plans, and the second had two.</div>
      <div class="cp-note exam">Remember "first holiday 1966 to 1969 with three plans, second holiday 1990 to 1992 with two".</div>
    `
  },
  58: {
    questext: "How many annual plans were launched during the Second Planning Holiday?",
    options: ["One", "Two", "Three", "Four"],
    correct: "2",
    exptext: "✅ Two annual plans were launched, for 1990-91 and 1991-92. 📌 Second holiday, two plans. ❌ Three annual plans belong to the first holiday."
  },
  59: {
    questext: "The Second Planning Holiday ended when which plan began?",
    options: ["Eighth Plan", "Seventh Plan", "Ninth Plan", "Tenth Plan"],
    correct: "1",
    exptext: "✅ The Eighth Plan began in 1992 after the two annual plans. 📌 After the second break, plan number eight. ❌ The Seventh Plan came before the break."
  },
  60: {
    type: "concept", icon: "🎓", accent: "#2dd4bf", pauseTimer: true,
    title: "Eighth Five Year Plan (1992-97)",
    html: `
      <p class="cp-lead">The Eighth Plan ran from <b>1992 to 1997</b>. It was the first plan after the reforms of 1991, and its focus was <b>Human Resources Development</b>, which means better education, health, jobs and skills for people.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/43.png" alt="P. V. Narasimha Rao Prime Minister portrait photo" data-caption="P. V. Narasimha Rao, Prime Minister during the Eighth Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/44.png" alt="Manmohan Singh Finance Minister 1991 portrait photo" data-caption="Manmohan Singh, Finance Minister during the reforms." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/45.png" alt="Four boxes around the title Human Resources Development: Education, Public health, Employm" data-caption="The four parts of Human Resources Development." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1992 to 1997</td></tr><tr><td>Prime Minister</td><td>P. V. Narasimha Rao</td></tr><tr><td>Finance Minister</td><td>Manmohan Singh</td></tr><tr><td>Focus</td><td>Human Resources Development</td></tr><tr><td>Target growth</td><td>5.6 percent</td></tr><tr><td>Achieved growth</td><td>6.8 percent</td></tr></tbody></table>
      <p class="cp-lead">The old Licence Raj, in which businesses needed government permission for almost everything, came to an end. The plan also tried to remove illiteracy completely and to end the practice of manual scavenging, which is cleaning human waste by hand.</p>
      <div class="cp-note trap">Do not link the Eighth Plan with the nuclear tests. The tests of 1974 and 1998 belong to other plans.</div>
      <div class="cp-note exam">Remember "Eighth plan, human resources, Narasimha Rao, Manmohan Singh, growth 6.8".</div>
    `
  },
  61: {
    questext: "The Eighth Five Year Plan placed the main stress on which area?",
    options: ["Heavy industry", "Self-reliance", "Garibi Hatao", "Human Resources Development"],
    correct: "4",
    exptext: "✅ The Eighth Plan stressed Human Resources Development, such as education, health and jobs. 📌 Eighth plan, human focus. ❌ Heavy industry was the Second Plan's focus."
  },
  62: {
    questext: "Who was the Finance Minister during the Eighth Five Year Plan?",
    options: ["Pranab Mukherjee", "P. Chidambaram", "Manmohan Singh", "Yashwant Sinha"],
    correct: "3",
    exptext: "✅ Manmohan Singh was Finance Minister under Prime Minister P. V. Narasimha Rao. 📌 Rao and Singh made the 1991 reforms. ❌ Yashwant Sinha served later, under Vajpayee."
  },
  63: {
    type: "concept", icon: "🤲", accent: "#c026d3", pauseTimer: true,
    title: "Ninth Five Year Plan (1997-2002)",
    html: `
      <p class="cp-lead">The Ninth Plan ran from <b>1997 to 2002</b> and its focus was <b>growth with justice and equity</b>. It began in the fiftieth year of Independence.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/46.png" alt="Pokhran II nuclear test 1998 Shakti photo" data-caption="The Pokhran test site, where India tested nuclear devices in 1998." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/47.png" alt="Atal Bihari Vajpayee Prime Minister portrait photo" data-caption="Atal Bihari Vajpayee, Prime Minister who led India in 1998." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>1997 to 2002</td></tr><tr><td>Focus</td><td>Growth with justice and equity</td></tr><tr><td>Target growth</td><td>7 percent</td></tr><tr><td>Achieved growth</td><td>5.6 percent</td></tr><tr><td>Prime Minister</td><td>Atal Bihari Vajpayee (from 1998)</td></tr><tr><td>Important event</td><td>May 1998, Pokhran-II, after which India became a declared nuclear power</td></tr></tbody></table>
      <p class="cp-lead">The growth achieved was much lower than the target, so this plan is counted as weaker. The nuclear tests of 1998, also called Operation Shakti, made India a nuclear powered country.</p>
      <div class="cp-note trap">The first peaceful test was Pokhran-I in 1974 under Indira Gandhi, and Pokhran-II was in 1998 under Vajpayee.</div>
      <div class="cp-note exam">Remember "Ninth plan, justice and equity, target 7, achieved 5.6, Pokhran-II".</div>
    `
  },
  64: {
    questext: "The Ninth Five Year Plan had which focus?",
    options: ["Poverty removal", "Growth with justice and equity", "Rapid industrialisation", "Faster and inclusive growth"],
    correct: "2",
    exptext: "✅ The Ninth Plan aimed at growth with justice and equity. 📌 Nine, justice. ❌ Faster and more inclusive growth is the Eleventh Plan focus."
  },
  65: {
    questext: "In which year did India carry out Pokhran-II?",
    options: ["1998", "1974", "1996", "2002"],
    correct: "1",
    exptext: "✅ Pokhran-II took place in May 1998. 📌 1974 first, 1998 second. ❌ 1974 is Pokhran-I, India's first nuclear test."
  },
  66: {
    type: "concept", icon: "💰", accent: "#4f46e5", pauseTimer: true,
    title: "10th Five Year Plan (2002-2007)",
    html: `
      <p class="cp-lead">The Tenth Plan ran from <b>2002 to 2007</b>. Its main aim was to <b>double the per capita income in the next ten years</b>, which means the income of an average person.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/48.png" alt="Rural employment guarantee worker NREGA photo" data-caption="Workers on a rural employment guarantee site." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/49.png" alt="Bar chart with two bars: Target 8 percent and Achieved 7.6 percent, with the title Tenth P" data-caption="The Tenth Plan target and the growth achieved." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>2002 to 2007</td></tr><tr><td>Focus</td><td>Doubling per capita income in ten years</td></tr><tr><td>Target growth</td><td>8 percent</td></tr><tr><td>Achieved growth</td><td>7.6 percent</td></tr><tr><td>Prime Minister</td><td>Atal Bihari Vajpayee, then Manmohan Singh from 2004</td></tr></tbody></table>
      <p class="cp-lead">In 2005 the National Rural Employment Guarantee Act was passed under Prime Minister Manmohan Singh, to reduce rural poverty and to stop workers from leaving villages in search of jobs. In 2009 it was renamed the Mahatma Gandhi National Rural Employment Guarantee Act. From 1 July 2026 it has been replaced by the Viksit Bharat Guarantee for Rozgar and Ajeevika Mission (Gramin) Act, 2025, which promises 125 days of work in a year.</p>
      <div class="cp-note trap">The Act was passed in 2005 and renamed in 2009. Do not swap these two years.</div>
      <div class="cp-note exam">Remember "Tenth plan, double income, target 8, achieved 7.6, 2005 Act, 2009 renamed".</div>
    `
  },
  67: {
    questext: "The National Rural Employment Guarantee Act was passed in which year?",
    options: ["2002", "2007", "2009", "2005"],
    correct: "4",
    exptext: "✅ It was passed in 2005 during the Tenth Plan. 📌 2005 passed, 2009 renamed. ❌ 2009 is the year it was named after Mahatma Gandhi."
  },
  68: {
    questext: "The main objective of the Tenth Five Year Plan was to:",
    options: ["Reduce poverty by half", "Build heavy industries", "Double per capita income in ten years", "End illiteracy"],
    correct: "3",
    exptext: "✅ The Tenth Plan aimed to double per capita income in ten years. 📌 Tenth, double. ❌ Heavy industries were the focus of the Second Plan."
  },
  69: {
    type: "concept", icon: "📈", accent: "#059669", pauseTimer: true,
    title: "11th Five Year Plan (2007-2012)",
    html: `
      <p class="cp-lead">The Eleventh Plan ran from <b>2007 to 2012</b>, under Prime Minister <b>Manmohan Singh</b>, and its aim was <b>faster and more inclusive growth</b>. Inclusive means that the poor and weak also share in the gain.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/50.png" alt="Manmohan Singh Prime Minister portrait photo" data-caption="Manmohan Singh, Prime Minister during the Eleventh and Twelfth Plans." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/51.png" alt="Two bars: Target 9 percent and Achieved 8 percent, with the title Eleventh Plan growth." data-caption="The Eleventh Plan target and the growth achieved." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>2007 to 2012</td></tr><tr><td>Focus</td><td>Faster and more inclusive growth</td></tr><tr><td>Target growth</td><td>9 percent</td></tr><tr><td>Achieved growth</td><td>8 percent</td></tr><tr><td>Prime Minister</td><td>Manmohan Singh</td></tr></tbody></table>
      <p class="cp-lead">The target of 9 percent was the highest set so far, and the country reached 8 percent, which was still a good result.</p>
      <div class="cp-note trap">Faster and inclusive growth belongs to the Eleventh Plan, while the Twelfth Plan adds the word sustainable.</div>
      <div class="cp-note exam">Remember "Eleventh plan, target 9, achieved 8".</div>
    `
  },
  70: {
    questext: "What was the target growth rate of the Eleventh Five Year Plan?",
    options: ["8 percent", "9 percent", "10 percent", "7 percent"],
    correct: "2",
    exptext: "✅ The target was 9 percent, and about 8 percent was achieved. 📌 Eleven, target nine. ❌ 8 percent was the achieved rate."
  },
  71: {
    questext: "Which plan had the focus \"faster and more inclusive growth\"?",
    options: ["Eleventh Plan", "Tenth Plan", "Ninth Plan", "Twelfth Plan"],
    correct: "1",
    exptext: "✅ The Eleventh Plan aimed at faster and more inclusive growth. 📌 Eleven, inclusive. ❌ The Twelfth Plan added the word sustainable."
  },
  72: {
    type: "concept", icon: "🏁", accent: "#b45309", pauseTimer: true,
    title: "12th Five Year Plan (2012-2017)",
    html: `
      <p class="cp-lead">The Twelfth Plan ran from <b>2012 to 2017</b> and it was the <b>last Five Year Plan</b>. Its theme was <b>faster, more inclusive and sustainable growth</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/52.png" alt="NITI Aayog launch 2015 Planning Commission replaced photo" data-caption="The launch of NITI Aayog, which replaced the Planning Commission." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Five_Year_Planning/53.png" alt="Four goal boxes: Growth 8 percent, Agriculture 4 percent, Manufacturing 10 percent, Total " data-caption="The headline goals of the Twelfth Plan." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Period</td><td>2012 to 2017</td></tr><tr><td>Status</td><td>Last Five Year Plan</td></tr><tr><td>Focus</td><td>Faster, more inclusive and sustainable growth</td></tr><tr><td>Target growth</td><td>8 percent</td></tr><tr><td>Plan began under</td><td>Manmohan Singh</td></tr></tbody></table>
      <table><thead><tr><th>Goal</th><th>Target</th></tr></thead><tbody><tr><td>Overall growth</td><td>8 percent</td></tr><tr><td>Agriculture growth</td><td>4 percent</td></tr><tr><td>Manufacturing growth</td><td>10 percent</td></tr><tr><td>Infant mortality rate</td><td>25 per 1000 live births</td></tr><tr><td>Maternal mortality rate</td><td>1 per 1000 live births</td></tr><tr><td>Child sex ratio (age 0 to 6)</td><td>950</td></tr><tr><td>Total fertility rate</td><td>2.1</td></tr></tbody></table>
      <p class="cp-lead">Total fertility rate means the average number of children a woman has in her life. After this plan the Planning Commission was replaced by NITI Aayog in 2015, and no more Five Year Plans were made.</p>
      <div class="cp-note trap">The Twelfth Plan is the last Five Year Plan, but it was not the last plan. The Planning Commission was replaced by NITI Aayog from 1 January 2015, while the plan period ended in 2017.</div>
      <div class="cp-note exam">Remember "Twelfth, last, sustainable, target 8, fertility 2.1".</div>
    `
  },
  73: {
    questext: "Which was the last Five Year Plan of India?",
    options: ["Tenth Plan", "Eleventh Plan", "Thirteenth Plan", "Twelfth Plan"],
    correct: "4",
    exptext: "✅ The Twelfth Plan, for 2012 to 2017, was the last. 📌 After twelve, no more plans. ❌ There was no Thirteenth Plan."
  },
  74: {
    questext: "Consider the following statements about the Twelfth Five Year Plan:\n1. It aimed at faster, more inclusive and sustainable growth.\n2. It set a target of 10 percent growth in agriculture.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Agriculture 4, manufacturing 10. ❌ Statement 2 is wrong because 10 percent was the manufacturing target."
  },
  75: {
    questext: "The Twelfth Plan targeted a total fertility rate of:",
    options: ["1.5", "3.0", "2.1", "2.5"],
    correct: "3",
    exptext: "✅ The plan aimed at a total fertility rate of 2.1 by 2017. 📌 Two point one is the replacement level. ❌ 2.5 is higher than the target."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Five_Year_Planning/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "an old brass Indian map outline, a stack of gold coins, a rolled blueprint and a subtle rising chart line" },
  "images/General_Awareness/Economics/Five_Year_Planning/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sir M. Visvesvaraya portrait photo engineer\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/1.png. a clear portrait of the engineer",
  "images/General_Awareness/Economics/Five_Year_Planning/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Planned Economy for India Visvesvaraya 1934 book cover\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/2.png. the cover of the 1934 work",
  "images/General_Awareness/Economics/Five_Year_Planning/3.png": { t: "fig", about: "Three boxes in a row under the title Ten Year Plan 1934: Double national income, More industrial production, Small and large industries together." },
  "images/General_Awareness/Economics/Five_Year_Planning/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jawaharlal Nehru 1938 National Planning Committee photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/4.png. Nehru as chairman",
  "images/General_Awareness/Economics/Five_Year_Planning/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Subhas Chandra Bose Congress president 1938 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/5.png. Bose as president",
  "images/General_Awareness/Economics/Five_Year_Planning/6.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"JRD Tata portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/6.png. Tata portrait",
  "images/General_Awareness/Economics/Five_Year_Planning/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"G D Birla portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/7.png. Birla portrait",
  "images/General_Awareness/Economics/Five_Year_Planning/8.png": { t: "fig", about: "A group of eight name cards around a central title Bombay Plan 1944: Tata, Birla, Thakurdas, Shriram, Lalbhai, Shroff, Dalal, Mathai." },
  "images/General_Awareness/Economics/Five_Year_Planning/9.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"M N Roy portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/9.png. Roy portrait",
  "images/General_Awareness/Economics/Five_Year_Planning/10.png": { t: "fig", about: "Simple wheat field icon in the centre with three labels around it: Agriculture first, Ten years, Nationalisation of agriculture and production." },
  "images/General_Awareness/Economics/Five_Year_Planning/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mahatma Gandhi spinning charkha photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/11.png. charkha",
  "images/General_Awareness/Economics/Five_Year_Planning/12.png": { t: "fig", about: "Village in the centre with arrows to Cottage industries, Rural development, Decentralised economy." },
  "images/General_Awareness/Economics/Five_Year_Planning/13.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Jayaprakash Narayan portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/13.png. portrait",
  "images/General_Awareness/Economics/Five_Year_Planning/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vinoba Bhave Bhoodan movement photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/14.png. Vinoba",
  "images/General_Awareness/Economics/Five_Year_Planning/15.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"NITI Aayog building New Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/15.png. the NITI Aayog office",
  "images/General_Awareness/Economics/Five_Year_Planning/16.png": { t: "fig", about: "Two arrows side by side: Planning Commission with an arrow going from Centre down to States labelled Top to Bottom, NITI Aayog with an arrow going from States up to Centre labelled Bottom to Top." },
  "images/General_Awareness/Economics/Five_Year_Planning/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhakra Nangal Dam Sutlej River photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/17.png. the dam",
  "images/General_Awareness/Economics/Five_Year_Planning/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Hirakud Dam Mahanadi Odisha photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/18.png. the dam",
  "images/General_Awareness/Economics/Five_Year_Planning/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Nagarjuna Sagar Dam Krishna River photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/19.png. the dam",
  "images/General_Awareness/Economics/Five_Year_Planning/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bhilai Steel Plant photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/20.png. the plant",
  "images/General_Awareness/Economics/Five_Year_Planning/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rourkela Steel Plant photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/21.png. the plant",
  "images/General_Awareness/Economics/Five_Year_Planning/22.png": { t: "fig", about: "Three factory boxes: Rourkela Odisha Germany, Durgapur West Bengal Britain, Bhilai Chhattisgarh Soviet Union." },
  "images/General_Awareness/Economics/Five_Year_Planning/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Prasanta Chandra Mahalanobis portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/23.png. portrait",
  "images/General_Awareness/Economics/Five_Year_Planning/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian Statistical Institute Kolkata building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/24.png. the institute",
  "images/General_Awareness/Economics/Five_Year_Planning/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"PL 480 wheat ship India 1960s photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/25.png. imported wheat",
  "images/General_Awareness/Economics/Five_Year_Planning/26.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Food Corporation of India godown grain storage photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/26.png. grain storage",
  "images/General_Awareness/Economics/Five_Year_Planning/27.png": { t: "fig", about: "Timeline strip with five dots: 1962 India-China war, 1964 Nehru dies, 1965 India-Pakistan war, 1965 drought and famine, 1966 Shastri dies." },
  "images/General_Awareness/Economics/Five_Year_Planning/28.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indira Gandhi 1966 Prime Minister photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/28.png. Indira Gandhi",
  "images/General_Awareness/Economics/Five_Year_Planning/29.png": { t: "fig", about: "Three boxes in a row: 1966-67 First Annual Plan, 1967-68 Second Annual Plan, 1968-69 Third Annual Plan, with the label Self-Reliance above." },
  "images/General_Awareness/Economics/Five_Year_Planning/30.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Verghese Kurien Operation Flood Amul photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/30.png. Kurien",
  "images/General_Awareness/Economics/Five_Year_Planning/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pokhran 1974 Smiling Buddha nuclear test site photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/31.png. test site",
  "images/General_Awareness/Economics/Five_Year_Planning/32.png": { t: "fig", about: "Timeline strip: 1969 bank nationalisation, 1970 Operation Flood, 1971 privy purses end and war, 1972 Shimla Agreement, 1974 Smiling Buddha." },
  "images/General_Awareness/Economics/Five_Year_Planning/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indira Gandhi Garibi Hatao 1971 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/33.png. Indira Gandhi",
  "images/General_Awareness/Economics/Five_Year_Planning/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Regional Rural Bank branch India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/34.png. rural bank",
  "images/General_Awareness/Economics/Five_Year_Planning/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Morarji Desai Prime Minister 1977 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/35.png. Morarji Desai",
  "images/General_Awareness/Economics/Five_Year_Planning/36.png": { t: "fig", about: "A sliding window across years: a three year window labelled 1978-81 moving one box forward each year, with the label Reviewed every year." },
  "images/General_Awareness/Economics/Five_Year_Planning/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"NABARD headquarters Mumbai building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/37.png. NABARD",
  "images/General_Awareness/Economics/Five_Year_Planning/38.png": { t: "fig", about: "Four boxes under the title Rural schemes: TRYSEM youth training, IRDP assets, NREP seasonal jobs, RLEGP landless jobs." },
  "images/General_Awareness/Economics/Five_Year_Planning/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rajiv Gandhi Prime Minister 1985 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/39.png. Rajiv Gandhi",
  "images/General_Awareness/Economics/Five_Year_Planning/40.png": { t: "fig", about: "Three linked circles: Food grain production, Employment creation, Productivity through social justice." },
  "images/General_Awareness/Economics/Five_Year_Planning/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manmohan Singh 1991 budget liberalisation photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/41.png. reforms",
  "images/General_Awareness/Economics/Five_Year_Planning/42.png": { t: "fig", about: "Two boxes: Annual Plan 1990-91 and Annual Plan 1991-92, under the title Second Planning Holiday." },
  "images/General_Awareness/Economics/Five_Year_Planning/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"P. V. Narasimha Rao Prime Minister portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/43.png. Narasimha Rao",
  "images/General_Awareness/Economics/Five_Year_Planning/44.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manmohan Singh Finance Minister 1991 portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/44.png. Manmohan Singh",
  "images/General_Awareness/Economics/Five_Year_Planning/45.png": { t: "fig", about: "Four boxes around the title Human Resources Development: Education, Public health, Employment, Skill development." },
  "images/General_Awareness/Economics/Five_Year_Planning/46.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Pokhran II nuclear test 1998 Shakti photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/46.png. Pokhran",
  "images/General_Awareness/Economics/Five_Year_Planning/47.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Atal Bihari Vajpayee Prime Minister portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/47.png. Vajpayee",
  "images/General_Awareness/Economics/Five_Year_Planning/48.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Rural employment guarantee worker NREGA photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/48.png. NREGA",
  "images/General_Awareness/Economics/Five_Year_Planning/49.png": { t: "fig", about: "Bar chart with two bars: Target 8 percent and Achieved 7.6 percent, with the title Tenth Plan growth." },
  "images/General_Awareness/Economics/Five_Year_Planning/50.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manmohan Singh Prime Minister portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/50.png. Manmohan Singh",
  "images/General_Awareness/Economics/Five_Year_Planning/51.png": { t: "fig", about: "Two bars: Target 9 percent and Achieved 8 percent, with the title Eleventh Plan growth." },
  "images/General_Awareness/Economics/Five_Year_Planning/52.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"NITI Aayog launch 2015 Planning Commission replaced photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Five_Year_Planning/52.png. NITI Aayog",
  "images/General_Awareness/Economics/Five_Year_Planning/53.png": { t: "fig", about: "Four goal boxes: Growth 8 percent, Agriculture 4 percent, Manufacturing 10 percent, Total fertility rate 2.1." }
});

/* CHANGE LOG
   - Hirakud Dam is described as one of the longest earthen dams in the world, because it is not simply the longest dam.
   - Only Indian Institute of Technology Kharagpur (1951) belongs to the First Plan period; the others were set up in later plans, so the page does not list them as First Plan institutions.
   - The Land Ceiling Act date was removed: land ceiling laws were passed by the states over many years, mostly in the 1960s and 1970s.
   - The Third Plan model is given as the Sandy and Chakravarty model; the Gadgil Formula for sharing central help among states belongs to the Fourth Plan.
   - The Tashkent Agreement is dated January 1966 (it was shown as 1965).
   - Operation Pokhran-I is dated 1974 and Pokhran-II May 1998; the 1996 entry under the Eighth Plan was removed because no test took place in 1996.
   - Planning Commission and NITI Aayog leaders updated: NITI Aayog was reconstituted in April 2026 with Ashok Lahiri as Vice Chairperson, and Anurag Jain became Chief Executive Officer in July 2026.
   - The Mahatma Gandhi National Rural Employment Guarantee Act was replaced from 1 July 2026 by the Viksit Bharat Guarantee for Rozgar and Ajeevika Mission (Gramin) Act, 2025, which promises 125 days of work.
   - Rolling Plan spelling and details cleaned: the Janata government ended the Fifth Plan in 1978 and started the Rolling Plan.
*/