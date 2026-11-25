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

/* Field: General_Awareness · Subject: Economics · Chapter: GDP_GNP_National_Income · 23 concept pages (+ overview) · 67 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — GDP, GNP and National Income",
    thumb: {
      image: "images/General_Awareness/Economics/GDP_GNP_National_Income/thumbnail.png",
      banner: "ECONOMICS FOR COMPETITIVE EXAMS",
      line1: "GDP • GNP",
      line2: "NATIONAL INCOME",
      line3: "INFLATION & POLICIES",
      badge: "FULL CHAPTER",
      ribbon: "FORMULAS • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "GDP, GNP, NDP, NNP & National Income Explained | SSC CGL Economics",
      altTitles: ["GDP vs GNP Easy Trick | National Income Formulas for SSC", "Inflation, Monetary Policy and Fiscal Policy in One Class"],
      description: "GDP, GNP and National Income are the most repeated topics of Economics in every competitive exam. In this class we learn them step by step, in very simple words.\n\n📌 IN THIS CLASS\n✅ GDP, GSDP and India's domestic boundary\n✅ GNP, NDP, NNP and National Income formulas\n✅ Real GDP, per capita income and methods of counting\n✅ Inflation, monetary policy and fiscal policy\n✅ National Statistics Office and quarters\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Economics #GDP",
      tags: ["gdp gnp national income", "gdp and gnp difference", "national income formulas", "economics for ssc cgl", "ssc cgl economics", "gdp in hindi", "gdp", "gnp", "ndp", "nnp", "national income", "per capita income", "nominal gdp real gdp", "gdp growth rate", "inflation and deflation", "monetary policy", "fiscal policy", "factor cost market price", "expenditure method gdp", "gsdp", "gdp deflator", "optimum inflation rate", "nso india", "general awareness economics", "railway economics", "banking economics", "economics tricks", "ssc chsl economics", "SSC CGL"],
      hashtags: ["SSCCGL", "Economics", "GDP"],
      thumbText: "GDP • GNP • NATIONAL INCOME",
      pinnedComment: "📌 Solve the questions and write your answers below 👇",
      communityPost: "📊 New class is live: GDP, GNP and National Income. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "General Awareness — Economics Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on GDP, GNP, National Income and the policies that keep an economy healthy</u>. This chapter gives sure marks in General Awareness, so we will learn it slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>23</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>67</b><span>Questions</span></div>
        <div class="cp-stat"><b>~113 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>GDP, GSDP and India's Domestic Boundary</b><br>What Gross Domestic Product means, which production counts, and what the domestic boundary of India includes.</li>
        <li><b>GNP, NDP, NNP and National Income</b><br>How the different product measures are linked, and the simple formulas that connect them, including market price and factor cost.</li>
        <li><b>Real GDP, Per Capita Income and Methods of Counting</b><br>Why inflation changes the picture, how the average income per person is found, and the three ways to count national income.</li>
        <li><b>Micro and Macro Economics, Growth Rate</b><br>How small units and the whole nation are studied, and what a rising or falling growth rate tells us.</li>
        <li><b>Inflation, Deflation, Monetary and Fiscal Policy</b><br>What problems an economy faces, and how the Reserve Bank of India and the government solve them.</li>
        <li><b>National Statistics Office</b><br>Who releases the data, and how the financial year is divided into four quarters.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> every Staff Selection Commission paper asks several questions from this chapter, and the same formulas and policy ideas return in Banking, Railways and Defence examinations.</div>
    `
  },
  2: {
    type: "concept", icon: "🏭", accent: "#f59e0b", pauseTimer: true,
    title: "GDP - Gross Domestic Product",
    html: `
      <p class="cp-lead">Gross Domestic Product (GDP) is the <b>total final money value</b> of all goods and services produced inside a country in one financial year. <u>Think of it as the yearly report card of the country's production.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/1.png" alt="Tree diagram: GDP at the top, three branches: Gross Value (sum of all goods and services)," data-caption="GDP has three ideas: gross value, domestic territory and product value." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/2.png" alt="India factory production line manufacturing photo" data-caption="A factory in India: goods made inside the country count in its GDP." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-note tip">"Final" means we count only the finished product that reaches the buyer. Flour sold to a bakery is not counted again once the bread is counted.</div>
      <table><thead><tr><th>Word in the definition</th><th>What it means</th></tr></thead><tbody><tr><td>Gross</td><td>The total of everything, added together</td></tr><tr><td>Domestic</td><td>Produced inside the boundary of the country</td></tr><tr><td>Product</td><td>Goods such as phones and cars, and services such as teaching and banking</td></tr><tr><td>Financial year</td><td>The period from 1 April to 31 March</td></tr></tbody></table>
      <p class="cp-lead">It does not matter who produces. A foreign company that makes goods inside India adds to India's GDP, just like an Indian company does. Only the <u>place of production</u> matters.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/3.png" alt="Simple world picture: three circles labelled India, China, USA, each with the text All pro" data-caption="In each country, all production inside its boundary counts, whoever produces it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">India's GDP ranks sixth largest in the world by nominal GDP. The order is: United States, China, Germany, Japan, United Kingdom, India.</div>
      <div class="cp-mnemonic">Remember the top six as "U C G J U I": United States, China, Germany, Japan, United Kingdom, India.</div>
    `
  },
  3: {
    questext: "Gross Domestic Product of a country counts the final value of goods and services produced",
    options: ["only by its own citizens, anywhere in the world", "by anyone, inside its domestic boundary", "only by its government companies", "only for export to other countries"],
    correct: "2",
    exptext: "✅ GDP depends on the place of production, so everyone producing inside the boundary is counted. 📌 Domestic means place. ❌ Option 1 describes Gross National Product, which depends on the nationality of the producer."
  },
  4: {
    questext: "A mobile phone company from China produces phones in a factory inside India. This production is counted in",
    options: ["China's Gross Domestic Product", "India's Gross Domestic Product", "both countries' Gross Domestic Product", "neither country's Gross Domestic Product"],
    correct: "2",
    exptext: "✅ The factory is inside India, so the production adds to India's Gross Domestic Product. 📌 Place decides Gross Domestic Product. ❌ China's Gross Domestic Product is wrong because the production did not happen inside China."
  },
  5: {
    questext: "According to the International Monetary Fund's 2026 estimates, which of the following is the correct order of the largest economies by nominal Gross Domestic Product, from first to sixth?",
    options: ["United States, China, Japan, Germany, United Kingdom, India", "China, United States, Germany, Japan, India, United Kingdom", "United States, China, Germany, Japan, United Kingdom, India", "United States, Germany, China, Japan, India, United Kingdom"],
    correct: "3",
    exptext: "✅ The order is United States, China, Germany, Japan, United Kingdom, India. 📌 Use the memory line U C G J U I. ❌ Option 1 is tempting but Germany is larger than Japan."
  },
  6: {
    questext: "Which of the following statements about Gross Domestic Product is correct?\n1. It includes the final value of goods and services only.\n2. It is counted for one financial year.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Gross Domestic Product counts only final goods and services, and it is measured for one financial year. 📌 Final and yearly. ❌ Counting middle goods again would double count the same value."
  },
  7: {
    type: "concept", icon: "🗺️", accent: "#3b82f6", pauseTimer: true,
    title: "GSDP - Gross State Domestic Product",
    html: `
      <p class="cp-lead">Just as India has a Gross Domestic Product, each state has its own. The <b>Gross State Domestic Product (GSDP)</b> is the Gross Domestic Product of one Indian state.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/4.png" alt="Mumbai skyline Bandra Worli sea link photo" data-caption="Mumbai skyline: Maharashtra has the highest Gross State Domestic Product in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/5.png" alt="Chennai Tamil Nadu automobile manufacturing plant photo" data-caption="Tamil Nadu is a major car-making state and has the second highest state product." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-formula" translate="no"><small>Idea</small>Sum of all GSDP of states and union territories is close to the country's GDP</div>
      <p class="cp-lead">To find GSDP we use the same rule as for GDP, but the boundary is the state, not the country. All final goods and services produced inside that state in one year are counted.</p>
      <table><thead><tr><th>Rank</th><th>State</th></tr></thead><tbody><tr><td>1</td><td>Maharashtra</td></tr><tr><td>2</td><td>Tamil Nadu</td></tr><tr><td>3</td><td>Uttar Pradesh</td></tr><tr><td>4</td><td>Karnataka</td></tr></tbody></table>
      <div class="cp-note exam">The top four states by GSDP in order are Maharashtra, Tamil Nadu, Uttar Pradesh and Karnataka.</div>
      <div class="cp-note trap">Do not mix up size and growth. A state can have a very high GSDP but a different position for growth rate or income per person.</div>
    `
  },
  8: {
    questext: "Gross State Domestic Product (GSDP) is the",
    options: ["Gross Domestic Product of an individual Indian state", "total savings of state governments", "total taxes collected by a state", "national income divided by the number of states"],
    correct: "1",
    exptext: "✅ GSDP is simply the Gross Domestic Product of one state. 📌 State plus Gross Domestic Product. ❌ Option 3 confuses production with tax collection, which is only a small part of a state's finances."
  },
  9: {
    questext: "Which state has the highest Gross State Domestic Product in India?",
    options: ["Tamil Nadu", "Uttar Pradesh", "Maharashtra", "Karnataka"],
    correct: "3",
    exptext: "✅ Maharashtra has the largest state economy. 📌 The order is Maharashtra, Tamil Nadu, Uttar Pradesh, Karnataka. ❌ Uttar Pradesh is tempting because of its large population, but it is third in output."
  },
  10: {
    type: "concept", icon: "🧭", accent: "#06b6d4", pauseTimer: true,
    title: "India's Domestic Boundary",
    html: `
      <p class="cp-lead">To count Gross Domestic Product we must first know what is inside the country's boundary. India's domestic boundary is wider than just the land we can see on the map.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/6.png" alt="Side-view schematic of sea zones from the coast: Land and Baseline, Territorial Sea up to " data-caption="The sea zones of a coastal country, measured outward from the baseline." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/7.png" alt="Indian Embassy building abroad photo" data-caption="Indian embassies abroad are counted as part of India's domestic boundary." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/8.png" alt="Chabahar Port Iran Shahid Beheshti terminal photo" data-caption="Chabahar Port in Iran is an Indian asset abroad taken on lease." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Part</th><th>Details</th></tr></thead><tbody><tr><td>Land boundary</td><td>28 states and 8 union territories</td></tr><tr><td>Water boundary</td><td>Territorial sea of 12 nautical miles from the coast, under the United Nations Convention on the Law of the Sea</td></tr><tr><td>Contiguous zone</td><td>12 to 24 nautical miles from the baseline</td></tr><tr><td>Exclusive Economic Zone</td><td>Up to 200 nautical miles from the baseline</td></tr><tr><td>Air boundary</td><td>About 100 kilometres above the earth, called the Karman Line</td></tr><tr><td>Diplomatic missions</td><td>Embassies, consulates and high commissions abroad are counted as India's territory</td></tr><tr><td>Foreign assets</td><td>Military bases abroad and assets taken on lease, for example Chabahar Port in Iran</td></tr></tbody></table>
      <p class="cp-lead">The Exclusive Economic Zone is the sea area where India has the right to use resources such as fish, oil and gas. A nautical mile is a sea distance of about 1.85 kilometres.</p>
      <div class="cp-note trap">The territorial sea is 12 nautical miles, but the Exclusive Economic Zone goes up to 200 nautical miles. Students often swap these two numbers.</div>
      <div class="cp-note exam">Air boundary: 100 kilometres (Karman Line). Territorial sea: 12 nautical miles. Contiguous zone: up to 24 nautical miles. Exclusive Economic Zone: 200 nautical miles.</div>
    `
  },
  11: {
    questext: "The Exclusive Economic Zone of a coastal country extends up to how many nautical miles from the baseline?",
    options: ["12", "24", "100", "200"],
    correct: "4",
    exptext: "✅ The Exclusive Economic Zone extends up to 200 nautical miles from the baseline. 📌 Two hundred for resources. ❌ Twelve is the territorial sea, and twenty-four is the outer limit of the contiguous zone."
  },
  12: {
    questext: "Which line is taken as the air boundary of a country, at about 100 kilometres above the earth's surface?",
    options: ["Plimsoll Line", "Karman Line", "Radcliffe Line", "Durand Line"],
    correct: "2",
    exptext: "✅ The Karman Line, about 100 kilometres above the earth, is the usual edge of the air boundary. 📌 K for Karman, K for kilometres. ❌ The Durand Line and the Radcliffe Line are land borders, not heights."
  },
  13: {
    questext: "Which of the following are counted inside India's domestic boundary for Gross Domestic Product?\n1. Indian embassies and consulates in foreign countries.\n2. Indian assets taken on lease abroad, for example Chabahar Port in Iran.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both Indian diplomatic missions abroad and India's foreign assets are counted in the domestic boundary. 📌 Think of them as small pieces of India outside India. ❌ Saying only one is correct ignores either the missions or the assets."
  },
  14: {
    type: "concept", icon: "🇮🇳", accent: "#eab308", pauseTimer: true,
    title: "GNP - Gross National Product",
    html: `
      <p class="cp-lead">Gross National Product (GNP) is the total final money value of goods and services produced by <b>Indian producers</b>, whether they work in India or abroad, in one financial year. <u>The key is nationality, not location.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/9.png" alt="Tree diagram: GNP at the top splits into Indian producers inside India and Indian producer" data-caption="GNP counts Indian producers wherever they work, at home or abroad." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/10.png" alt="Indian IT company office abroad TCS Infosys overseas photo" data-caption="An Indian company working abroad adds to India's Gross National Product." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-note tip">Producers means both individuals and companies. An Indian engineer working in London and an Indian company working in Dubai both count.</div>
      <table><thead><tr><th>Question</th><th>Gross Domestic Product</th><th>Gross National Product</th></tr></thead><tbody><tr><td>What decides it?</td><td>Place of production</td><td>Nationality of the producer</td></tr><tr><td>Indian company in India</td><td>Counted</td><td>Counted</td></tr><tr><td>Indian company abroad</td><td>Not counted</td><td>Counted</td></tr><tr><td>Foreign company in India</td><td>Counted</td><td>Not counted</td></tr></tbody></table>
      <p class="cp-lead">The easy way to remember is: <u>Domestic means Do it inside the boundary. National means Nationality of the producer.</u></p>
      <div class="cp-mnemonic">Domestic = Place. National = Person (nationality).</div>
    `
  },
  15: {
    questext: "Gross National Product is defined mainly by",
    options: ["the nationality of the producer", "the place of production", "the size of the government budget", "the number of exports"],
    correct: "1",
    exptext: "✅ Gross National Product counts what the nationals of a country produce, in any place. 📌 National means nationality. ❌ Place of production is the key idea for Gross Domestic Product, not for Gross National Product."
  },
  16: {
    questext: "An Indian company produces goods in Dubai. Where is this production counted?",
    options: ["India's Gross National Product", "India's Gross Domestic Product only", "Both India's Gross Domestic Product and Gross National Product", "Neither"],
    correct: "1",
    exptext: "✅ The producer is Indian, so it adds to India's Gross National Product. The place is Dubai, so it is not in India's Gross Domestic Product. 📌 Indian owner, count it in National. ❌ Option 3 forgets that Dubai is outside the Indian boundary."
  },
  17: {
    type: "concept", icon: "⚖️", accent: "#64748b", pauseTimer: true,
    title: "GDP versus GNP - Core Difference",
    html: `
      <p class="cp-lead">Gross Domestic Product and Gross National Product sound alike, but they ask <b>two different questions</b>. GDP asks "where was it produced?" and GNP asks "who produced it?"</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/11.png" alt="Two-column comparison picture: left column GDP with a location pin icon and the words Dome" data-caption="GDP follows the place of production; GNP follows the nationality of the producer." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/12.png" alt="Venn-style picture: left circle Foreign producers inside India, middle overlap Indian prod" data-caption="Indian producers inside India are counted in both; foreign and Indian-abroad producers split the rest." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>GDP</th><th>GNP</th></tr></thead><tbody><tr><td>Defined by</td><td>Domestic boundary</td><td>Producer's nationality</td></tr><tr><td>Who is included</td><td>All producers inside the boundary, Indian and foreign</td><td>Only Indian producers, in India and abroad</td></tr><tr><td>What matters</td><td>Location</td><td>Nationality</td></tr></tbody></table>
      <div class="cp-note tip">Producers who are Indian and work inside India are counted in both measures. The difference comes only from foreign producers inside India and Indian producers abroad.</div>
      <div class="cp-formula" translate="no"><small>Sum up</small>GDP = Place of production &nbsp;|&nbsp; GNP = Nationality of producer</div>
    `
  },
  18: {
    questext: "Which of the following is the main difference between Gross Domestic Product and Gross National Product?",
    options: ["One includes taxes and the other does not", "One is based on place and the other on nationality", "One is for services and the other for goods", "One is measured monthly and the other yearly"],
    correct: "2",
    exptext: "✅ Gross Domestic Product is based on the place of production, while Gross National Product is based on the nationality of the producer. 📌 Domestic is place, national is nationality. ❌ Taxes do not separate the two; both are product measures."
  },
  19: {
    questext: "Which of the following statements is correct?\n1. Gross Domestic Product includes production by foreign companies inside India.\n2. Gross National Product includes production by Indian companies abroad.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Gross Domestic Product counts every producer inside India, and Gross National Product counts Indian producers anywhere. 📌 Place versus person. ❌ Choosing only one forgets that both rules are true at the same time."
  },
  20: {
    questext: "Which of the following is NOT included in India's Gross Domestic Product?",
    options: ["Production by a Japanese company inside India", "Production by an Indian company inside India", "Production by an Indian company in the United Kingdom", "Production by Indian farmers in India"],
    correct: "3",
    exptext: "✅ Production in the United Kingdom is outside India's boundary, so it is not in India's Gross Domestic Product. 📌 Outside the boundary is not domestic. ❌ Option 1 is tempting but foreign producers inside India are counted."
  },
  21: {
    type: "concept", icon: "🧩", accent: "#22c55e", pauseTimer: true,
    title: "GDP versus GNP - Practical Examples",
    html: `
      <p class="cp-lead">The best way to learn the difference is to take real examples and ask two quick questions: <u>Where was it produced? Who produced it?</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/13.png" alt="Four small cards in a row: Air India at American airport, Google in India, Indian worker R" data-caption="Four everyday cases, each counted in one country's GDP and another country's GNP." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/14.png" alt="Air India aircraft at John F Kennedy airport New York photo" data-caption="An Air India aircraft at an American airport: an Indian company producing a service abroad." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Example</th><th>Counted in Gross Domestic Product</th><th>Counted in Gross National Product</th></tr></thead><tbody><tr><td>Air India at an American airport</td><td>United States, because production is inside the United States</td><td>India, because the producer is an Indian company</td></tr><tr><td>Google or Facebook in India</td><td>India, because production is inside India</td><td>United States, because the producer is an American company</td></tr><tr><td>An Indian worker named Rahul working in the United Kingdom</td><td>United Kingdom, because production is inside the United Kingdom</td><td>India, because the producer is an Indian citizen</td></tr><tr><td>Vivo or Oppo in India</td><td>India, because production is inside India</td><td>China, because the producer is a Chinese company</td></tr></tbody></table>
      <div class="cp-note trap">Look at the place first for Gross Domestic Product and at the passport or ownership first for Gross National Product. Never mix the two checks.</div>
      <div class="cp-mnemonic">Place decides the first measure, nationality decides the second.</div>
    `
  },
  22: {
    questext: "An Indian worker earns income while working in the United Kingdom. This production is counted in",
    options: ["India's Gross Domestic Product and United Kingdom's Gross National Product", "United Kingdom's Gross Domestic Product and India's Gross National Product", "India's Gross Domestic Product only", "United Kingdom's Gross National Product only"],
    correct: "2",
    exptext: "✅ The work is done inside the United Kingdom, so it is in that country's Gross Domestic Product. The worker is Indian, so it is in India's Gross National Product. 📌 Place and person split. ❌ Option 1 swaps the two ideas."
  },
  23: {
    questext: "The production of Google in India is counted in",
    options: ["India's Gross National Product", "United States' Gross Domestic Product", "India's Gross Domestic Product and United States' Gross National Product", "United States' Gross Domestic Product and India's Gross National Product"],
    correct: "3",
    exptext: "✅ Production inside India is in India's Gross Domestic Product, and since the company is American it is in the United States' Gross National Product. 📌 Domestic is the place, national is the owner. ❌ Option 4 reverses the places."
  },
  24: {
    questext: "Vivo and Oppo are Chinese companies producing mobile phones in India. Their production is counted in",
    options: ["China's Gross Domestic Product", "India's Gross National Product", "India's Gross Domestic Product and China's Gross National Product", "China's Gross Domestic Product and India's Gross National Product"],
    correct: "3",
    exptext: "✅ The factories are in India, so India's Gross Domestic Product counts it. The companies are Chinese, so it adds to China's Gross National Product. 📌 Same rule as Google in India. ❌ India's Gross National Product counts only Indian producers."
  },
  25: {
    type: "concept", icon: "➕", accent: "#14b8a6", pauseTimer: true,
    title: "GNP Formula and Net Factor Income",
    html: `
      <p class="cp-lead">GNP and GDP differ only by income that crosses the border. So if we know GDP, we can find GNP by <b>adding the net income that comes from abroad</b>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/15.png" alt="Flow picture: a box labelled India in the centre, an arrow coming in labelled Income inflo" data-caption="Income comes into India from abroad and goes out of India to abroad." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-formula" translate="no"><small>Formula</small>GNP = GDP + (Income inflow from abroad to India) − (Income outflow from India to abroad)</div>
      <div class="cp-formula" translate="no"><small>Short form</small>GNP = GDP + Net Inflow Income from Abroad to India</div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Income inflow from abroad to India</td><td>Earned by Indian companies and individuals working or producing abroad</td></tr><tr><td>Income outflow from India to abroad</td><td>Earned by foreign companies and individuals working or producing in India</td></tr><tr><td>Net inflow</td><td>Income inflow minus income outflow</td></tr></tbody></table>
      <p class="cp-lead">If Indians earn more abroad than foreigners earn in India, net inflow is positive and GNP is bigger than GDP. If foreigners earn more in India, net inflow is negative and GNP is smaller than GDP.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/16.png" alt="Worked example picture: GDP 100, inflow 10, outflow 6, net inflow 4, GNP 104, shown as a s" data-caption="With GDP of 100, inflow of 10 and outflow of 6, the Gross National Product is 104." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note exam">For India, income outflow is usually larger than inflow, so India's Gross National Product is generally lower than its Gross Domestic Product.</div>
    `
  },
  26: {
    questext: "Which of the following correctly gives Gross National Product?",
    options: ["GDP minus net inflow of income from abroad", "GDP plus net inflow of income from abroad", "GDP plus depreciation", "GDP minus indirect tax"],
    correct: "2",
    exptext: "✅ Gross National Product equals Gross Domestic Product plus net inflow of income from abroad. 📌 Add what Indians earn abroad, subtract what foreigners earn here. ❌ Option 1 reverses the sign of the net inflow."
  },
  27: {
    questext: "Gross Domestic Product is 500 and net inflow of income from abroad is minus 20 (a net outflow). What is the Gross National Product?",
    options: ["520", "500", "480", "400"],
    correct: "3",
    exptext: "✅ Gross National Product is 500 plus (minus 20), which is 480. 📌 A net outflow reduces Gross National Product. ❌ 520 is wrong because it adds the outflow instead of subtracting it."
  },
  28: {
    questext: "Income outflow from India to abroad means",
    options: ["income earned by Indian companies abroad", "income earned by foreign companies and individuals producing in India", "taxes collected by India", "subsidies paid by India"],
    correct: "2",
    exptext: "✅ Income outflow is the income that foreign producers earn inside India and send out. 📌 Out of India, so it is the foreigners' earning. ❌ Option 1 is the inflow, because that income comes into India."
  },
  29: {
    type: "concept", icon: "📉", accent: "#84cc16", pauseTimer: true,
    title: "NDP and NNP - Net Products",
    html: `
      <p class="cp-lead">Machines and buildings get old while they are used. This loss in value is called <b>depreciation</b>. When we subtract it from the gross figure, we get the <u>net</u> figure.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/17.png" alt="Picture of a factory machine with a worn gear and a small downward arrow labelled Wear and" data-caption="Machines wear out with use, and this loss in value is depreciation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/18.png" alt="old rusted factory machinery wear and tear photo" data-caption="Old machinery loses value with use, which is called depreciation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Measure</th><th>Formula</th><th>Based on</th></tr></thead><tbody><tr><td>Net Domestic Product (NDP)</td><td>NDP = GDP minus Depreciation</td><td>Domestic boundary</td></tr><tr><td>Net National Product (NNP)</td><td>NNP = GNP minus Depreciation</td><td>Nationality</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Remember</small>Gross = Net + Depreciation &nbsp;|&nbsp; Net = Gross − Depreciation</div>
      <div class="cp-note tip">Depreciation is also called Capital Consumption Allowance (CCA). It is the wear and tear of machines, equipment and buildings used in production.</div>
      <div class="cp-note trap">Net is always smaller than gross. If an option shows a net figure larger than the gross figure, it is wrong.</div>
    `
  },
  30: {
    questext: "Net Domestic Product is equal to",
    options: ["GDP plus Depreciation", "GDP minus Depreciation", "GNP minus Depreciation", "GNP plus Depreciation"],
    correct: "2",
    exptext: "✅ Net Domestic Product is Gross Domestic Product minus depreciation. 📌 Net means after removing wear and tear. ❌ Option 3 is the formula for Net National Product, which uses Gross National Product."
  },
  31: {
    questext: "Depreciation is also known as",
    options: ["Capital Consumption Allowance", "Factor income", "Indirect tax", "Net inflow"],
    correct: "1",
    exptext: "✅ Depreciation, the wear and tear of capital goods, is also called Capital Consumption Allowance. 📌 Capital is used up. ❌ Indirect tax is a tax, not a loss in the value of machines."
  },
  32: {
    questext: "Gross National Product is 900 and depreciation is 100. What is the Net National Product?",
    options: ["1000", "900", "800", "700"],
    correct: "3",
    exptext: "✅ Net National Product is 900 minus 100, which is 800. 📌 Net is smaller than gross. ❌ 1000 adds depreciation instead of subtracting it."
  },
  33: {
    type: "concept", icon: "💰", accent: "#10b981", pauseTimer: true,
    title: "National Income",
    html: `
      <p class="cp-lead">National Income is the <b>total income earned by all the people of a country in a year</b>. In exams it is written as Net National Product at Factor Cost.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/19.png" alt="Formula picture: National Income = Net National Product at Factor Cost, with the letters F" data-caption="National Income equals Net National Product at Factor Cost." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/20.png" alt="Five factor icons in a row labelled Land, Labour, Capital, Technology, Entrepreneur's prof" data-caption="Land, labour, capital, technology and profit are the factors of production." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-formula" translate="no"><small>National Income</small>National Income = Net National Product at Factor Cost</div>
      <p class="cp-lead">Factor Cost (FC) is the cost of the factors of production: land, labour, capital, machinery, technology, raw material and the producer's profit. In simple words it is the <u>cost of the product before tax</u>.</p>
      <div class="cp-note tip">The word "net" in the formula tells us depreciation is already removed, and the words "factor cost" tell us taxes are not included.</div>
      <div class="cp-note exam">National Income = NNP at FC. Also remember that National Income is based on nationality, because it comes from Net National Product.</div>
    `
  },
  34: {
    questext: "National Income is equal to",
    options: ["Gross Domestic Product at market price", "Net National Product at factor cost", "Gross National Product at market price", "Net Domestic Product at market price"],
    correct: "2",
    exptext: "✅ National Income is Net National Product at factor cost. 📌 Net, National, Factor cost. ❌ Gross National Product at market price still has depreciation and taxes inside it."
  },
  35: {
    questext: "Which of the following is NOT a factor of production?",
    options: ["Land", "Labour", "Capital", "Indirect tax"],
    correct: "4",
    exptext: "✅ Indirect tax is paid to the government and is not a factor of production. 📌 Factors earn rent, wages, interest and profit. ❌ Land, labour and capital are all factors that earn income."
  },
  36: {
    questext: "Which of the following statements about National Income is correct?\n1. It is calculated at factor cost.\n2. It is based on the producer's nationality.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ National Income comes from Net National Product, so it uses nationality, and it is valued at factor cost. 📌 Net National Product at factor cost. ❌ Choosing only one statement misses part of the definition."
  },
  37: {
    type: "concept", icon: "🏷️", accent: "#64748b", pauseTimer: true,
    title: "Market Price versus Factor Cost",
    html: `
      <p class="cp-lead">The same product can be valued in two ways. <b>Market price</b> is what the buyer pays in the shop. <b>Factor cost</b> is what the producer spends on the factors of production.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/21.png" alt="Price tag picture: a product with Factor Cost 100, plus Indirect Tax 20, minus Subsidy 5, " data-caption="Market price equals factor cost plus indirect tax minus subsidy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/22.png" alt="Two small boxes: left Market Price with the words Includes taxes, Excludes subsidies; righ" data-caption="Market price includes taxes; factor cost includes subsidies." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-formula" translate="no"><small>Main formula</small>Market Price = Factor Cost + Indirect Tax − Subsidy</div>
      <p class="cp-lead">Why does this work? The government adds an indirect tax on top of the cost, so the buyer pays more. A subsidy is help from the government that lowers the price, so it is subtracted to reach the market price.</p>
      <table><thead><tr><th>Measure</th><th>Formula</th></tr></thead><tbody><tr><td>GDP at market price</td><td>GDP at factor cost + Indirect Tax − Subsidy</td></tr><tr><td>GNP at market price</td><td>GNP at factor cost + Indirect Tax − Subsidy</td></tr><tr><td>NDP at market price</td><td>NDP at factor cost + Indirect Tax − Subsidy</td></tr><tr><td>NNP at market price</td><td>NNP at factor cost + Indirect Tax − Subsidy</td></tr></tbody></table>
      <div class="cp-note trap">To go from market price to factor cost, do the opposite: subtract indirect tax and add subsidy.</div>
      <div class="cp-mnemonic">Market price has tax, so MP is higher than FC when tax is more than subsidy.</div>
    `
  },
  38: {
    questext: "Which of the following correctly gives the market price?",
    options: ["Factor cost + Indirect tax − Subsidy", "Factor cost − Indirect tax + Subsidy", "Factor cost + Indirect tax + Subsidy", "Factor cost − Indirect tax − Subsidy"],
    correct: "1",
    exptext: "✅ Market price equals factor cost plus indirect tax minus subsidy. 📌 Market price includes taxes and excludes subsidies. ❌ Option 2 is the formula to go from market price back to factor cost."
  },
  39: {
    questext: "Factor cost includes",
    options: ["taxes and excludes subsidies", "taxes and subsidies both", "neither taxes nor subsidies", "subsidies and excludes taxes"],
    correct: "4",
    exptext: "✅ Factor cost excludes taxes and includes subsidies, which is the opposite of market price. 📌 Factor cost is the cost before tax. ❌ Option 1 describes market price."
  },
  40: {
    questext: "Gross Domestic Product at factor cost is 800, indirect tax is 100 and subsidy is 40. What is Gross Domestic Product at market price?",
    options: ["660", "740", "860", "940"],
    correct: "3",
    exptext: "✅ Market price is 800 plus 100 minus 40, which is 860. 📌 Add tax, subtract subsidy. ❌ 940 is wrong because it adds the subsidy instead of subtracting it."
  },
  41: {
    type: "concept", icon: "🧮", accent: "#22c55e", pauseTimer: true,
    title: "National Income - All Equivalent Formulas",
    html: `
      <p class="cp-lead">National Income can be reached from different starting points. All the formulas below give the <b>same answer</b>. Learn the pattern: <u>move to national, move to net, move to factor cost</u>.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/23.png" alt="Staircase picture with four steps from top to bottom: GDP at market price, GNP at market p" data-caption="From GDP at market price down to National Income in three steps." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Formula</th><th>National Income</th></tr></thead><tbody><tr><td>Basic</td><td>NNP at factor cost</td></tr><tr><td>Formula 1</td><td>GNP at factor cost − Depreciation</td></tr><tr><td>Formula 2</td><td>GDP at factor cost + Net inflow from abroad − Depreciation</td></tr><tr><td>Formula 3</td><td>NNP at market price − Indirect tax + Subsidy</td></tr><tr><td>Formula 4</td><td>GNP at market price − Indirect tax + Subsidy − Depreciation</td></tr><tr><td>Formula 5</td><td>GDP at market price + Net inflow from abroad − Indirect tax + Subsidy − Depreciation</td></tr></tbody></table>
      <p class="cp-lead">Why are there so many? Each formula starts from a different measure and then fixes three things: the place becomes nationality (add net inflow), gross becomes net (subtract depreciation), and market price becomes factor cost (subtract indirect tax, add subsidy).</p>
      <div class="cp-formula" translate="no"><small>Longest formula</small>National Income = GDP at MP + Net Inflow − Indirect Tax + Subsidy − Depreciation</div>
      <div class="cp-note trick">Check three questions in order. Is it domestic? Add net inflow. Is it gross? Subtract depreciation. Is it market price? Subtract indirect tax and add subsidy.</div>
    `
  },
  42: {
    questext: "National Income is equal to",
    options: ["NNP at market price − Indirect tax + Subsidy", "NNP at market price + Indirect tax − Subsidy", "GNP at factor cost + Depreciation", "GDP at factor cost − Net inflow"],
    correct: "1",
    exptext: "✅ To move from market price to factor cost we subtract indirect tax and add subsidy, so National Income is NNP at market price minus indirect tax plus subsidy. 📌 Remove the tax. ❌ Option 2 moves in the wrong direction."
  },
  43: {
    questext: "Which of the following is the correct formula for National Income starting from GDP at market price?",
    options: ["GDP at MP − Net inflow − Indirect tax + Subsidy − Depreciation", "GDP at MP + Net inflow − Indirect tax + Subsidy − Depreciation", "GDP at MP + Net inflow + Indirect tax − Subsidy − Depreciation", "GDP at MP + Net inflow − Indirect tax + Subsidy + Depreciation"],
    correct: "2",
    exptext: "✅ Add net inflow to become national, subtract indirect tax and add subsidy to reach factor cost, and subtract depreciation to become net. 📌 Three fixes. ❌ Other options change one of these signs."
  },
  44: {
    questext: "Gross National Product at factor cost is 1000 and depreciation is 150. What is the National Income?",
    options: ["850", "1000", "1150", "1300"],
    correct: "1",
    exptext: "✅ National Income is Gross National Product at factor cost minus depreciation, so 1000 minus 150 is 850. 📌 Gross to net means subtract. ❌ 1150 adds depreciation instead of subtracting it."
  },
  45: {
    type: "concept", icon: "🎈", accent: "#14b8a6", pauseTimer: true,
    title: "Nominal GDP versus Real GDP",
    html: `
      <p class="cp-lead">Prices rise every year. If GDP rises only because prices rose, the country has not really produced more. So economists use two kinds of GDP, one <b>with</b> the effect of inflation and one <b>without</b> it.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/24.png" alt="Two-column comparison picture: left Nominal GDP with current prices and Inflation included" data-caption="Nominal GDP includes inflation; real GDP removes it." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/25.png" alt="Simple example picture: Year 1 apples 10 at price 10 equals 100; Year 2 apples 10 at price" data-caption="Prices rose but apples did not, so nominal GDP rose while real GDP stayed the same." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Nominal GDP</th><th>Real GDP</th></tr></thead><tbody><tr><td>Effect of inflation</td><td>Included</td><td>Excluded</td></tr><tr><td>Prices used</td><td>Current market prices</td><td>Constant prices of the base year</td></tr><tr><td>Also called</td><td>GDP at current price</td><td>GDP at constant price</td></tr><tr><td>Use for comparison</td><td>Less accurate</td><td>More accurate</td></tr></tbody></table>
      <p class="cp-lead">The <b>base year</b> is the reference year whose prices are used to find real GDP. India's base year for national accounts is now 2022-23.</p>
      <div class="cp-note trap">A rise in nominal GDP does not always mean more production. Always check real GDP for true growth.</div>
      <div class="cp-note exam">Nominal GDP is GDP at market price (current price). Real GDP is measured at constant prices of the base year. India's base year is 2022-23.</div>
    `
  },
  46: {
    questext: "Which Gross Domestic Product is used for a more accurate comparison between years?",
    options: ["Nominal Gross Domestic Product", "Real Gross Domestic Product", "Gross Domestic Product at current price", "Gross Domestic Product with inflation"],
    correct: "2",
    exptext: "✅ Real Gross Domestic Product removes the effect of inflation, so it compares true production. 📌 Real equals reality. ❌ The other options all include price rises."
  },
  47: {
    questext: "The base year used for India's national accounts since the new series released in February 2026 is",
    options: ["2004-05", "2011-12", "2022-23", "2025-26"],
    correct: "3",
    exptext: "✅ The new series released on 27 February 2026 uses 2022-23 as the base year, replacing 2011-12. 📌 Base year changes about every five years. ❌ 2011-12 was the older base year."
  },
  48: {
    questext: "Which of the following statements is correct?\n1. Nominal Gross Domestic Product is measured at current prices.\n2. Real Gross Domestic Product includes the effect of inflation.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. Real Gross Domestic Product removes the effect of inflation. 📌 Real is clean of price rise. ❌ Statement 2 describes nominal Gross Domestic Product."
  },
  49: {
    type: "concept", icon: "👥", accent: "#84cc16", pauseTimer: true,
    title: "Per Capita Income",
    html: `
      <p class="cp-lead">Per capita income is the <b>average income of one person</b> in a country. It is used to judge the standard of living and economic well-being of the people.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/26.png" alt="Picture of a large pie labelled GDP being divided into equal slices among a crowd of simpl" data-caption="Per capita income divides the country's product equally among its people." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-formula" translate="no"><small>Formula</small>Per Capita Income = GDP ÷ Population</div>
      <table><thead><tr><th>Type</th><th>Formula</th></tr></thead><tbody><tr><td>Nominal per capita income</td><td>Nominal GDP ÷ Population (GDP at market price ÷ Population)</td></tr><tr><td>Real per capita income</td><td>Real GDP ÷ Population (GDP at constant price ÷ Population)</td></tr></tbody></table>
      <p class="cp-lead">Real per capita income is used to compare living standards between years or between countries, because it removes the effect of inflation. A larger population with the same GDP makes the average smaller.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/27.png" alt="crowded Indian street market people daily life photo" data-caption="A large population shares India's income, so the average per person is small." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Per capita income is only an average. It does not show how income is shared between the rich and the poor.</div>
    `
  },
  50: {
    questext: "Per capita income is calculated as",
    options: ["GDP × Population", "GDP ÷ Population", "Population ÷ GDP", "GDP − Population"],
    correct: "2",
    exptext: "✅ Per capita income equals GDP divided by population. 📌 Per person means divide by people. ❌ Multiplying makes no sense because the average per head must be smaller than the total."
  },
  51: {
    questext: "Which measure is best for comparing the living standards of two countries?",
    options: ["Nominal per capita income", "Real per capita income", "Total GDP", "Total population"],
    correct: "2",
    exptext: "✅ Real per capita income removes inflation and shows the average per person, so it is best for comparison. 📌 Real plus per person. ❌ Total GDP ignores the population size."
  },
  52: {
    type: "concept", icon: "🧱", accent: "#e11d48", pauseTimer: true,
    title: "Methods of Counting National Income",
    html: `
      <p class="cp-lead">There are <b>three ways</b> to count the same national income. We can add up production, add up incomes, or add up spending. All three should give the same answer.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/28.png" alt="Triangle picture with three sides: Production method (value added), Income method (wages, " data-caption="Three methods, one answer: production, income and expenditure." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Method</th><th>Idea</th><th>What it includes</th></tr></thead><tbody><tr><td>Production method</td><td>Also called the value added method</td><td>Sum of value added at each stage of production</td></tr><tr><td>Income method</td><td>Based on the income earned by factors</td><td>Wages, rent, interest and profit</td></tr><tr><td>Expenditure method</td><td>Based on total spending in the economy</td><td>GDP = C + G + I + X − M</td></tr></tbody></table>
      <p class="cp-lead">Value added is the extra value created at each stage. A farmer sells wheat for 10, a mill makes flour worth 15 and a bakery makes bread worth 25. The value added by the bakery is 10, so we never count the same wheat twice.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/29.png" alt="Three-step chain: Wheat 10, Flour 15, Bread 25, with value added shown as 10, 5 and 10 und" data-caption="Value added at each stage is added up, so nothing is counted twice." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note tip">The production method is also called the value added method. It avoids double counting of the same item.</div>
    `
  },
  53: {
    questext: "The production method of counting national income is also called",
    options: ["Expenditure method", "Value added method", "Income method", "Tax method"],
    correct: "2",
    exptext: "✅ The production method adds the value created at each stage, so it is called the value added method. 📌 Production means value added. ❌ The income method adds up wages, rent, interest and profit."
  },
  54: {
    questext: "Wages, rent, interest and profit are added up in which method?",
    options: ["Production method", "Expenditure method", "Income method", "Value method"],
    correct: "3",
    exptext: "✅ The income method adds up what the factors of production earn: wages, rent, interest and profit. 📌 Income equals earnings. ❌ The expenditure method adds spending."
  },
  55: {
    questext: "Which of the following is a method of counting national income?\n1. Production method\n2. Expenditure method\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both the production method and the expenditure method are used, along with the income method. 📌 Three methods in total. ❌ Choosing only one forgets the other."
  },
  56: {
    type: "concept", icon: "➗", accent: "#d946ef", pauseTimer: true,
    title: "Expenditure Method Formula",
    html: `
      <p class="cp-lead">In the expenditure method we add up all the <b>spending</b> in the economy. The formula uses five letters, and each letter is one kind of spending.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/30.png" alt="Balance picture with five blocks labelled C Private spending, G Government spending, I Inv" data-caption="Five parts of spending: C, G, I and X are added, and M is subtracted." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-formula" translate="no"><small>Expenditure method</small>GDP = C + G + I + X − M</div>
      <table><thead><tr><th>Letter</th><th>Stands for</th><th>Details</th></tr></thead><tbody><tr><td>C</td><td>Private expenditure</td><td>Spending by individuals and by private sector companies</td></tr><tr><td>G</td><td>Government consumption</td><td>Government spending on goods and services</td></tr><tr><td>I</td><td>Investment</td><td>Private sector investment and public sector investment</td></tr><tr><td>X</td><td>Exports</td><td>Value of goods and services sold to other countries</td></tr><tr><td>M</td><td>Imports</td><td>Value of goods and services bought from other countries, which is subtracted</td></tr></tbody></table>
      <p class="cp-lead">Why do we subtract imports? Imports are goods made in other countries. Our spending on them is not our production, so we remove it. The difference X minus M is called net exports.</p>
      <div class="cp-mnemonic">C G I X M: "Consumers, Government, Investors, X-port, Minus import."</div>
      <div class="cp-note trap">Imports are subtracted, not added. Exports are added because foreigners spend money on goods made in our country.</div>
    `
  },
  57: {
    questext: "In the formula GDP = C + G + I + X − M, the letter M stands for",
    options: ["Money supply", "Imports", "Market price", "Manufacturing"],
    correct: "2",
    exptext: "✅ M stands for imports, which are subtracted. 📌 X is export, M is minus import. ❌ Money supply is a different idea and does not appear in this formula."
  },
  58: {
    questext: "In the expenditure method, which of the following is added to find Gross Domestic Product?",
    options: ["Imports", "Exports", "Depreciation", "Subsidy"],
    correct: "2",
    exptext: "✅ Exports are added, because foreigners spend on our goods. 📌 Add exports, subtract imports. ❌ Imports are subtracted because they are foreign production."
  },
  59: {
    questext: "The letter I in the expenditure formula includes\n1. Private sector investment.\n2. Public sector investment.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Investment includes both private sector investment and public sector investment. 📌 Investment is by all sectors. ❌ Choosing only one leaves out half of the answer."
  },
  60: {
    type: "concept", icon: "🔬", accent: "#c026d3", pauseTimer: true,
    title: "Micro versus Macro Economics",
    html: `
      <p class="cp-lead">Economics can be studied from two views. <b>Micro economics</b> looks at one small unit, such as one person or one company. <b>Macro economics</b> looks at the whole country at once.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/31.png" alt="Two-column comparison picture: left Micro Economics with icons of a single shop, a single " data-caption="Micro studies small units; macro studies the whole national economy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <table><thead><tr><th>Micro Economics</th><th>Macro Economics</th></tr></thead><tbody><tr><td>Studies an individual, a company or a small unit</td><td>Studies the economy at the national level</td></tr><tr><td>Producer behaviour theory: law of supply, so when price rises, supply rises</td><td>Fiscal policy and budget taxation</td></tr><tr><td>Consumer behaviour theory: law of demand, so when price rises, demand falls</td><td>Monetary policy and the banking sector</td></tr><tr><td>Cost theory: finding the best cost of a product</td><td>Unemployment, poverty, inflation, deflation and recession</td></tr><tr><td></td><td>Balance of payments, current account, capital account and current account deficit</td></tr><tr><td></td><td>Currency exchange rate and foreign trade</td></tr><tr><td></td><td>GDP, GNP, NDP, NNP, National Income and per capita income</td></tr></tbody></table>
      <p class="cp-lead">The easy test is the size of the subject. If the question is about one shop or one buyer, it is micro. If it is about the whole country, such as inflation or GDP, it is macro.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/32.png" alt="Mind-map picture: centre Macro Economics with six branches labelled Fiscal policy, Monetar" data-caption="The main topics that macro economics studies." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-note trap">Supply and demand theories belong to micro economics, but inflation, GDP and unemployment belong to macro economics.</div>
    `
  },
  61: {
    questext: "Which of the following is studied under macro economics?",
    options: ["Law of demand", "Law of supply", "Cost theory of a product", "National Income"],
    correct: "4",
    exptext: "✅ National Income is measured for the whole country, so it is part of macro economics. 📌 Whole country means macro. ❌ Demand, supply and cost theory deal with single buyers and sellers, which is micro economics."
  },
  62: {
    questext: "Which of the following statements is correct?\n1. Micro economics studies an individual or a company.\n2. Inflation and unemployment are studied under macro economics.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Micro economics studies small units, and macro economics studies national problems like inflation and unemployment. 📌 Small is micro, national is macro. ❌ Choosing one statement misses that both are true."
  },
  63: {
    type: "concept", icon: "📈", accent: "#ef4444", pauseTimer: true,
    title: "GDP Growth Rate",
    html: `
      <p class="cp-lead">The GDP growth rate tells us <b>how much the GDP has increased or decreased compared with the previous year</b>. A positive rate means the economy grew, and a negative rate means it shrank.</p>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/33.png" alt="Bar picture: base year 2022-23 GDP 100 rupees; next year options 110, 105, 102 and 95 with" data-caption="Starting from 100, the next year's GDP gives growth rates of 10, 5, 2 or minus 5 percent." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
      <div class="cp-formula" translate="no"><small>Formula</small>Growth Rate = <span class="cp-frac"><i>New GDP − Old GDP</i><i>Old GDP</i></span> × 100</div>
      <table><thead><tr><th>Positive growth rate</th><th>Negative growth rate</th></tr></thead><tbody><tr><td>GDP is increasing</td><td>GDP is decreasing</td></tr><tr><td>High: 6 to 10 percent, average: 4 to 5 percent, low: 0 to 3 percent</td><td>Shows economic contraction, called a recession</td></tr><tr><td>Sign of a growing economy</td><td>Government needs corrective measures</td></tr></tbody></table>
      <p class="cp-lead">Example: GDP was 100 rupees in the base year. If it becomes 110, the growth rate is 10 percent. If it becomes 95, the growth rate is minus 5 percent, because the economy has shrunk.</p>
      <div class="cp-note trap">A low but positive growth rate, such as 2 percent, is a slowdown, not a recession. A recession means the growth rate is negative.</div>
      <div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/34.png" alt="Two small arrow pictures: left upward bars labelled Positive growth, GDP has increased; ri" data-caption="Positive growth means GDP increased; negative growth means GDP decreased." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div>
    `
  },
  64: {
    questext: "GDP of a country was 200 last year and is 220 this year. What is the GDP growth rate?",
    options: ["5 percent", "10 percent", "15 percent", "20 percent"],
    correct: "2",
    exptext: "✅ The growth is 20 on a base of 200, which is 10 percent. 📌 Divide the change by the old value. ❌ 20 percent is wrong because it divides by the change, not the old GDP."
  },
  65: {
    questext: "A negative GDP growth rate indicates",
    options: ["economic recession", "rising prosperity", "fall in prices only", "rise in exports"],
    correct: "1",
    exptext: "✅ A negative growth rate means GDP has fallen, which shows contraction or recession. 📌 Minus growth equals recession. ❌ Rising prosperity needs a positive rate."
  },
  66: {
    questext: "Which of the following is a sign of a growing economy?",
    options: ["Positive growth rate of GDP", "Negative growth rate of GDP", "Falling GDP", "Contraction of production"],
    correct: "1",
    exptext: "✅ A positive growth rate means GDP is increasing. 📌 Plus sign, growing. ❌ The other options all describe a shrinking economy."
  },
  67: {
    type: "concept", icon: "🌡️", accent: "#3b82f6", pauseTimer: true,
    title: "Inflation and the Optimum Inflation Rate",
    html: `
      <p class="cp-lead"><b>Inflation</b> is a continuous rise in the general level of prices. If inflation is too high, buyers suffer. If prices fall too much, producers suffer. So the economy needs a balance, called the <u>optimum inflation rate of 4 percent</u>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/35.png" alt="Balance scale picture: left side Consumer who feels high prices, right side Producer who f" data-caption="At 4 percent inflation, neither consumers nor producers are hurt." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/36.png" alt="vegetable market price rise inflation India photo" data-caption="Rising prices of vegetables are an easy everyday sign of inflation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p class="cp-lead">At the optimum rate, neither the consumer feels that prices are too high, nor does the producer feel that prices are too low. Producers get a fair profit, so both pillars of the economy, buyers and sellers, stay satisfied.</p>
      <table><thead><tr><th>Condition</th><th>What it means</th><th>Problem name</th></tr></thead><tbody><tr><td>Inflation rate above 4 percent</td><td>Prices are rising too fast</td><td>Inflation</td></tr><tr><td>Inflation rate near 4 percent</td><td>Balance for buyers and sellers</td><td>Optimum rate</td></tr><tr><td>Very low prices, with growth falling or negative</td><td>Low demand, falling production and rising unemployment</td><td>Deflation or economic recession</td></tr></tbody></table>
      <div class="cp-note exam">Optimum inflation rate: 4 percent. The two problems of an economy are inflation (rate above 4 percent) and deflation or economic recession.</div>
      <div class="cp-note tip">Deflation means a fall in the general price level. It often comes together with a recession, when growth is negative and unemployment is high.</div>
    `
  },
  68: {
    questext: "What is the optimum inflation rate for the Indian economy?",
    options: ["2 percent", "4 percent", "6 percent", "8 percent"],
    correct: "2",
    exptext: "✅ The optimum inflation rate is 4 percent. 📌 Four keeps both sides happy. ❌ Six is the upper edge of the comfort zone, not the target."
  },
  69: {
    questext: "Which of the following is called a problem of inflation?",
    options: ["Inflation rate above 4 percent", "Inflation rate equal to 4 percent", "Positive growth rate of GDP", "Falling unemployment"],
    correct: "1",
    exptext: "✅ When the inflation rate rises above the optimum 4 percent, it becomes a problem. 📌 More than four is a problem. ❌ A rate equal to 4 percent is the balanced level."
  },
  70: {
    questext: "Which of the following statements is correct?\n1. At the optimum inflation rate, consumers and producers are both satisfied.\n2. Deflation and economic recession are problems of an economy.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ At the optimum rate both sides are satisfied, and deflation or recession is the other big problem. 📌 Two problems: inflation and deflation. ❌ Choosing one statement ignores the other true statement."
  },
  71: {
    type: "concept", icon: "🔥", accent: "#a855f7", pauseTimer: true,
    title: "Reasons Behind Inflation and Steps to Counter It",
    html: `
      <p class="cp-lead">Inflation starts when <b>demand is larger than supply</b>. More buying chases fewer goods, so prices go up. The chain below shows how more money in the economy leads to this problem.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/37.png" alt="Chain diagram: Inflation above 4 percent, then Price of goods and services up, then branch" data-caption="How higher demand and more money supply push prices up." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/38.png" alt="Reverse chain diagram: Inflation brought down, then Demand down and Supply up; Money suppl" data-caption="To control inflation the same steps are reversed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Reasons for inflation</th><th>Steps to counter inflation</th></tr></thead><tbody><tr><td>Demand increases</td><td>Decrease demand</td></tr><tr><td>Supply decreases</td><td>Increase supply and production</td></tr><tr><td>Money supply increases</td><td>Decrease money supply</td></tr><tr><td>Reserve Bank of India lowers interest rate</td><td>Reserve Bank of India raises interest rate</td></tr><tr><td>Government increases public expenditure</td><td>Government decreases public expenditure</td></tr><tr><td>Tax rate falls, subsidy rises, spending on welfare and infrastructure rises</td><td>Tax rate rises, subsidy falls, spending on welfare and infrastructure falls</td></tr></tbody></table>
      <p class="cp-lead">In simple words, when interest rates are low, loans are cheap, people borrow and spend, and demand rises. To cool prices, the Reserve Bank of India (RBI) raises interest rates so that borrowing and spending fall.</p>
      <div class="cp-note trap">To control inflation, the interest rate goes up and public spending goes down. Do not mix this with the steps for recession, which go in the opposite way.</div>
    `
  },
  72: {
    questext: "To control inflation, the Reserve Bank of India will generally",
    options: ["lower the interest rate", "raise the interest rate", "increase money supply", "increase subsidies"],
    correct: "2",
    exptext: "✅ A higher interest rate reduces borrowing, money supply and demand, which cools prices. 📌 Inflation up, rate up. ❌ Lowering the rate pushes demand up and worsens inflation."
  },
  73: {
    questext: "Which of the following steps by the government helps to control inflation?",
    options: ["Reduce tax rates", "Increase subsidies", "Reduce public expenditure", "Increase welfare spending"],
    correct: "3",
    exptext: "✅ Cutting public expenditure takes money out of the economy and lowers demand. 📌 Spend less to cool prices. ❌ Lower taxes and more subsidies or welfare spending put more money in people's hands, which raises demand."
  },
  74: {
    questext: "Which of the following can be a reason for inflation?\n1. Increase in demand.\n2. Decrease in supply.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Prices rise when demand goes up or when supply goes down. 📌 More buyers, fewer goods. ❌ Choosing only one statement leaves out the other cause."
  },
  75: {
    type: "concept", icon: "🧊", accent: "#0ea5e9", pauseTimer: true,
    title: "Reasons Behind Deflation and Economic Recession, and Steps to Counter Them",
    html: `
      <p class="cp-lead">In a recession the problem is the opposite: <b>demand and supply both fall</b>. Growth slows or turns negative, factories close and unemployment and poverty rise.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/39.png" alt="Chain diagram: Deflation or Economic recession, GDP growth rate down or negative, Unemploy" data-caption="How a fall in demand and money supply leads to recession." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/40.png" alt="Solution chain diagram: Deflation or Economic recession, then Demand up and Supply and pro" data-caption="The cure for recession is more demand, more production and more money supply." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Reasons for recession</th><th>Steps to counter recession</th></tr></thead><tbody><tr><td>Demand falls</td><td>Increase demand</td></tr><tr><td>Supply falls</td><td>Increase supply and production</td></tr><tr><td>Money supply falls</td><td>Increase money supply</td></tr><tr><td>Interest rate is high</td><td>Reserve Bank of India lowers interest rate</td></tr><tr><td>Public expenditure falls</td><td>Government increases public expenditure</td></tr><tr><td>Spending on welfare and infrastructure is low</td><td>Lower tax rate, higher subsidy, more spending on welfare and infrastructure</td></tr></tbody></table>
      <p class="cp-lead">In simple words, the government and the Reserve Bank of India now want people to spend more. Cheaper loans and more government spending create jobs, jobs create income, and income creates more demand.</p>
      <div class="cp-note tip">The steps to counter recession are the exact opposite of the steps to counter inflation. Learn one chain and reverse it for the other.</div>
    `
  },
  76: {
    questext: "To tackle an economic recession, the Reserve Bank of India will generally",
    options: ["raise the interest rate", "lower the interest rate", "reduce money supply", "reduce public spending"],
    correct: "2",
    exptext: "✅ A lower interest rate makes loans cheaper, which raises spending, demand and production. 📌 Recession, rate down. ❌ Raising the rate would pull money out of the economy and deepen the recession."
  },
  77: {
    questext: "Which of the following steps by the government helps to overcome a recession?",
    options: ["Increase public expenditure", "Reduce public expenditure", "Increase tax rates", "Reduce subsidies"],
    correct: "1",
    exptext: "✅ More public expenditure puts money in the economy, raising demand and production. 📌 Spend more to revive growth. ❌ Higher taxes and fewer subsidies take money away from people."
  },
  78: {
    questext: "Which of the following correctly shows a situation of economic recession?",
    options: ["Positive growth rate and high demand", "Negative growth rate and high unemployment", "High inflation and high supply", "Low unemployment and rising output"],
    correct: "2",
    exptext: "✅ In a recession GDP growth is negative and unemployment is high. 📌 Minus growth, jobs lost. ❌ Option 1 and option 4 describe a healthy economy."
  },
  79: {
    type: "concept", icon: "🏦", accent: "#2dd4bf", pauseTimer: true,
    title: "Monetary Policy",
    html: `
      <p class="cp-lead"><b>Monetary policy</b> is the plan made by the <u>Reserve Bank of India (RBI)</u> to control money and loans in the economy. It works through the banking sector, mainly by changing the interest rate.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/41.png" alt="Reserve Bank of India headquarters Mumbai photo" data-caption="The Reserve Bank of India makes the country's monetary policy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/42.png" alt="Two-branch flow chart: left branch Interest rate up, Money supply down, Demand down, Infla" data-caption="Higher interest rates cool inflation; lower interest rates revive production." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>When used</th><th>Steps</th><th>Other names</th></tr></thead><tbody><tr><td>Contractionary</td><td>To control inflation</td><td>Interest rate up, money supply down, demand down</td><td>Dear, Tight or Hawkish monetary policy</td></tr><tr><td>Expansionary</td><td>To solve deflation or recession</td><td>Interest rate down, money supply up, demand and production up</td><td>Cheap, Easy or Dovish monetary policy</td></tr></tbody></table>
      <div class="cp-note tip">Think of the words: Hawk is fierce and bites inflation. Dove is gentle and helps growth.</div>
      <div class="cp-note trap">Monetary policy is made by the Reserve Bank of India. Fiscal policy is made by the government. Never swap these two.</div>
      <div class="cp-mnemonic">Hawk equals High rates. Dove equals Down rates.</div>
    `
  },
  80: {
    questext: "Monetary policy in India is formed by",
    options: ["the Finance Ministry", "the Reserve Bank of India", "the National Statistics Office", "the Planning Commission"],
    correct: "2",
    exptext: "✅ The Reserve Bank of India designs monetary policy through the banking sector. 📌 Money and banks mean the Reserve Bank of India. ❌ The Finance Ministry makes fiscal policy."
  },
  81: {
    questext: "A hawkish monetary policy is also known as",
    options: ["easy monetary policy", "cheap monetary policy", "tight monetary policy", "dovish monetary policy"],
    correct: "3",
    exptext: "✅ A hawkish policy raises interest rates and is called tight, dear or contractionary. 📌 Hawk equals tight. ❌ Easy, cheap and dovish are names of the expansionary policy."
  },
  82: {
    questext: "Which of the following statements about monetary policy is correct?\n1. Contractionary monetary policy is used to control inflation.\n2. Expansionary monetary policy is used to solve recession.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ A tight policy cools inflation and an easy policy revives a recession. 📌 Tight for inflation, easy for recession. ❌ Choosing only one statement misses the other true statement."
  },
  83: {
    type: "concept", icon: "🏛️", accent: "#0f766e", pauseTimer: true,
    title: "Fiscal Policy",
    html: `
      <p class="cp-lead"><b>Fiscal policy</b> is the plan made by the <u>government</u>, both the Central Government and the State Governments, to control the economy through spending and taxes. Its two components are <b>taxation</b> and the <b>budget</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/43.png" alt="Union Budget India Parliament budget session photo" data-caption="The Union Budget is the main tool of India's fiscal policy." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/44.png" alt="Two-branch flow chart: left branch Public expenditure up, Money supply up, Demand up, Prod" data-caption="More public spending revives growth; less public spending cools inflation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>When used</th><th>Steps</th><th>Name</th></tr></thead><tbody><tr><td>Expansionary</td><td>To solve deflation or recession</td><td>Public expenditure up, money supply up, demand and production up</td><td>Fiscal stimulus policy</td></tr><tr><td>Contractionary</td><td>To control inflation</td><td>Public expenditure down, money supply down, demand down</td><td>Fiscal discipline or fiscal consolidation policy</td></tr></tbody></table>
      <div class="cp-note tip">Public expenditure is the money the government spends. Spending more adds money to the economy, and spending less takes money out of it.</div>
      <div class="cp-note trap">Do not confuse fiscal stimulus with fiscal discipline. Stimulus means spend more to push the economy up, and discipline means spend less to bring prices and the deficit down.</div>
    `
  },
  84: {
    questext: "Fiscal policy is formed by",
    options: ["the Reserve Bank of India", "the government", "commercial banks", "the National Statistics Office"],
    correct: "2",
    exptext: "✅ Fiscal policy is made by the Central and State Governments using taxation and the budget. 📌 Fiscal means government. ❌ The Reserve Bank of India makes monetary policy."
  },
  85: {
    questext: "Which of the following is a component of fiscal policy?",
    options: ["Interest rate", "Taxation", "Bank rate", "Cash reserve ratio"],
    correct: "2",
    exptext: "✅ Taxation and the budget are the two components of fiscal policy. 📌 Fiscal means tax plus budget. ❌ Interest rate, bank rate and cash reserve ratio are tools of monetary policy."
  },
  86: {
    questext: "The fiscal stimulus policy involves",
    options: ["increasing public expenditure", "reducing public expenditure", "increasing interest rates", "reducing money supply"],
    correct: "1",
    exptext: "✅ Fiscal stimulus means the government spends more to boost demand and production. 📌 Stimulus equals spend more. ❌ Reducing public expenditure is fiscal consolidation or discipline."
  },
  87: {
    questext: "Which of the following statements is correct?\n1. Fiscal consolidation policy reduces public expenditure.\n2. Fiscal stimulus policy is used to solve recession.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Consolidation cuts spending, and stimulus raises spending to solve recession. 📌 Cut or push. ❌ Choosing one statement misses the other true statement."
  },
  88: {
    type: "concept", icon: "📊", accent: "#b45309", pauseTimer: true,
    title: "National Statistics Office and Quarters",
    html: `
      <p class="cp-lead">All the economic data such as GDP, GNP, NDP, NNP, National Income and per capita income is released by the <b>National Statistics Office (NSO)</b> on a <u>quarterly basis</u>, that is, four times in a year.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/45.png" alt="Ministry of Statistics and Programme Implementation Sardar Patel Bhawan New Delhi photo" data-caption="The National Statistics Office works under this ministry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/GDP_GNP_National_Income/46.png" alt="Calendar wheel with the financial year from 1 April to 31 March divided into four parts: A" data-caption="The financial year is divided into four quarters of three months each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Details</th></tr></thead><tbody><tr><td>Full name</td><td>National Statistics Office</td></tr><tr><td>Ministry</td><td>Ministry of Statistics and Programme Implementation</td></tr><tr><td>Founded</td><td>2019</td></tr><tr><td>Formed by merging</td><td>National Sample Survey Office (NSSO) and Central Statistics Office (CSO)</td></tr></tbody></table>
      <table><thead><tr><th>Quarter</th><th>Months</th></tr></thead><tbody><tr><td>First quarter</td><td>April to June</td></tr><tr><td>Second quarter</td><td>July to September</td></tr><tr><td>Third quarter</td><td>October to December</td></tr><tr><td>Fourth quarter</td><td>January to March</td></tr></tbody></table>
      <div class="cp-note exam">The financial year runs from 1 April to 31 March. NSO was formed in 2019 by merging NSSO and CSO, and it releases GDP data quarterly.</div>
    `
  },
  89: {
    questext: "The National Statistics Office was formed in 2019 by merging",
    options: ["NITI Aayog and the Finance Commission", "NSSO and CSO", "RBI and SEBI", "Census Office and NSSO"],
    correct: "2",
    exptext: "✅ The National Sample Survey Office and the Central Statistics Office were merged to form the National Statistics Office. 📌 Two statistics bodies became one. ❌ The other pairs are not statistics offices."
  },
  90: {
    questext: "The third quarter of the Indian financial year covers the months of",
    options: ["April to June", "July to September", "October to December", "January to March"],
    correct: "3",
    exptext: "✅ The third quarter is from October to December. 📌 Q1 April, Q2 July, Q3 October, Q4 January. ❌ January to March is the fourth quarter."
  },
  91: {
    questext: "The National Statistics Office works under the",
    options: ["Ministry of Finance", "Ministry of Statistics and Programme Implementation", "Ministry of Commerce", "NITI Aayog"],
    correct: "2",
    exptext: "✅ The National Statistics Office is part of the Ministry of Statistics and Programme Implementation. 📌 Statistics ministry runs statistics office. ❌ The Ministry of Finance prepares the budget, not the national statistics."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/GDP_GNP_National_Income/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined rupee symbol, a few real-looking gold coins and a subtle rising chart line" },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/1.png": { t: "fig", about: "Tree diagram: GDP at the top, three branches: Gross Value (sum of all goods and services), Domestic Territory (India's boundary), Product Value (goods and services in money)." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"India factory production line manufacturing photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/2.png. A factory floor in India, to show goods being produced inside the country",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/3.png": { t: "fig", about: "Simple world picture: three circles labelled India, China, USA, each with the text \"All production inside this country, by anyone\"." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Mumbai skyline Bandra Worli sea link photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/4.png. Mumbai, the financial capital of Maharashtra, the state with the highest GSDP",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chennai Tamil Nadu automobile manufacturing plant photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/5.png. A car factory in Tamil Nadu, which has the second largest state economy",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/6.png": { t: "fig", about: "Side-view schematic of sea zones from the coast: Land and Baseline, Territorial Sea up to 12 nautical miles, Contiguous Zone up to 24 nautical miles, Exclusive Economic Zone up to 200 nautical miles, Continental Shelf, High Seas." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian Embassy building abroad photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/7.png. An Indian embassy building in a foreign country, treated as Indian territory",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chabahar Port Iran Shahid Beheshti terminal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/8.png. Chabahar Port in Iran, which India operates on lease",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/9.png": { t: "fig", about: "Tree diagram: GNP at the top splits into Indian producers inside India and Indian producers abroad, both feeding into total GNP." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian IT company office abroad TCS Infosys overseas photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/10.png. An Indian company office in a foreign country, whose production counts in India's GNP",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/11.png": { t: "fig", about: "Two-column comparison picture: left column GDP with a location pin icon and the words Domestic boundary, right column GNP with a person icon and the words Producer's nationality." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/12.png": { t: "fig", about: "Venn-style picture: left circle Foreign producers inside India, middle overlap Indian producers inside India, right circle Indian producers abroad; GDP bracket covers left and middle, GNP bracket covers middle and right." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/13.png": { t: "fig", about: "Four small cards in a row: Air India at American airport, Google in India, Indian worker Rahul in United Kingdom, Vivo in India; each card has two small tags GDP and GNP with the country name." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Air India aircraft at John F Kennedy airport New York photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/14.png. An Air India aircraft at an airport in the United States",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/15.png": { t: "fig", about: "Flow picture: a box labelled India in the centre, an arrow coming in labelled Income inflow from abroad, an arrow going out labelled Income outflow to abroad, and a formula strip below." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/16.png": { t: "fig", about: "Worked example picture: GDP 100, inflow 10, outflow 6, net inflow 4, GNP 104, shown as a small bar chart with labels." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/17.png": { t: "fig", about: "Picture of a factory machine with a worn gear and a small downward arrow labelled Wear and tear, next to a formula strip Gross minus Depreciation equals Net." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"old rusted factory machinery wear and tear photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/18.png. An old worn machine, showing the wear and tear that depreciation measures",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/19.png": { t: "fig", about: "Formula picture: National Income = Net National Product at Factor Cost, with the letters FC explained as Factor Cost in a small box." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/20.png": { t: "fig", about: "Five factor icons in a row labelled Land, Labour, Capital, Technology, Entrepreneur's profit, with the words Cost before tax below." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/21.png": { t: "fig", about: "Price tag picture: a product with Factor Cost 100, plus Indirect Tax 20, minus Subsidy 5, equals Market Price 115, drawn as a simple stacked bar." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/22.png": { t: "fig", about: "Two small boxes: left Market Price with the words Includes taxes, Excludes subsidies; right Factor Cost with the words Excludes taxes, Includes subsidies." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/23.png": { t: "fig", about: "Staircase picture with four steps from top to bottom: GDP at market price, GNP at market price, NNP at market price, NNP at factor cost which is National Income; arrows between steps labelled Add net inflow, Subtract depreciation, Subtract indirect tax and add subsidy." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/24.png": { t: "fig", about: "Two-column comparison picture: left Nominal GDP with current prices and Inflation included; right Real GDP with constant base year prices and Inflation removed." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/25.png": { t: "fig", about: "Simple example picture: Year 1 apples 10 at price 10 equals 100; Year 2 apples 10 at price 12 equals 120, labelled Nominal rose but real stayed 100." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/26.png": { t: "fig", about: "Picture of a large pie labelled GDP being divided into equal slices among a crowd of simple people icons, with the words GDP divided by Population." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"crowded Indian street market people daily life photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/27.png. A busy Indian market, showing a large population sharing the national income",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/28.png": { t: "fig", about: "Triangle picture with three sides: Production method (value added), Income method (wages, rent, interest, profit), Expenditure method (spending), all pointing to the centre labelled National Income." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/29.png": { t: "fig", about: "Three-step chain: Wheat 10, Flour 15, Bread 25, with value added shown as 10, 5 and 10 under each stage." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/30.png": { t: "fig", about: "Balance picture with five blocks labelled C Private spending, G Government spending, I Investment, X Exports, M Imports with M drawn as subtracted." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/31.png": { t: "fig", about: "Two-column comparison picture: left Micro Economics with icons of a single shop, a single family and a single company; right Macro Economics with icons of a country map, a bank and a government building." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/32.png": { t: "fig", about: "Mind-map picture: centre Macro Economics with six branches labelled Fiscal policy, Monetary policy, Banking sector, Inflation and unemployment, Balance of payments, GDP and National Income." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/33.png": { t: "fig", about: "Bar picture: base year 2022-23 GDP 100 rupees; next year options 110, 105, 102 and 95 with growth rates 10 percent, 5 percent, 2 percent and minus 5 percent; positive ones in green, negative one in red." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/34.png": { t: "fig", about: "Two small arrow pictures: left upward bars labelled Positive growth, GDP has increased; right downward bars labelled Negative growth, GDP has decreased." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/35.png": { t: "fig", about: "Balance scale picture: left side Consumer who feels high prices, right side Producer who feels low prices, centre pointer at 4 percent labelled Optimum inflation." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"vegetable market price rise inflation India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/36.png. Shoppers at an Indian vegetable market, where price rises are felt first",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/37.png": { t: "fig", about: "Chain diagram: Inflation above 4 percent, then Price of goods and services up, then branches Demand up and Supply down; Demand up leads to Money supply up; from there two boxes: Reserve Bank of India with Interest rate down, Government with Public expenditure up (tax rate down, subsidy up, welfare spending up, infrastructure spending up)." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/38.png": { t: "fig", about: "Reverse chain diagram: Inflation brought down, then Demand down and Supply up; Money supply down; Reserve Bank of India with Interest rate up, Government with Public expenditure down (tax rate up, subsidy down, welfare spending down, infrastructure spending down)." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/39.png": { t: "fig", about: "Chain diagram: Deflation or Economic recession, GDP growth rate down or negative, Unemployment and poverty at peak, then branches Demand down and Supply down; Money supply down; Reserve Bank of India with Interest rate up, Government with Public expenditure down." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/40.png": { t: "fig", about: "Solution chain diagram: Deflation or Economic recession, then Demand up and Supply and production up; Money supply up; Reserve Bank of India with Interest rate down, Government with Public expenditure up (tax rate down, subsidy up, welfare spending up, infrastructure spending up)." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/41.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Reserve Bank of India headquarters Mumbai photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/41.png. The head office of the Reserve Bank of India in Mumbai",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/42.png": { t: "fig", about: "Two-branch flow chart: left branch Interest rate up, Money supply down, Demand down, Inflation down labelled Contractionary, Dear, Tight or Hawkish policy; right branch Interest rate down, Money supply up, Demand up, Production up, Recession solved labelled Expansionary, Cheap, Easy or Dovish policy." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/43.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Union Budget India Parliament budget session photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/43.png. Parliament House in New Delhi, where the Union Budget is presented",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/44.png": { t: "fig", about: "Two-branch flow chart: left branch Public expenditure up, Money supply up, Demand up, Production up, Recession solved labelled Fiscal stimulus policy; right branch Public expenditure down, Money supply down, Demand down, Inflation down labelled Fiscal discipline or Fiscal consolidation policy." },
  "images/General_Awareness/Economics/GDP_GNP_National_Income/45.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ministry of Statistics and Programme Implementation Sardar Patel Bhawan New Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/GDP_GNP_National_Income/45.png. The building in New Delhi that houses the Ministry of Statistics and Programme Implementation",
  "images/General_Awareness/Economics/GDP_GNP_National_Income/46.png": { t: "fig", about: "Calendar wheel with the financial year from 1 April to 31 March divided into four parts: April to June first quarter, July to September second quarter, October to December third quarter, January to March fourth quarter." }
});

/* CHANGE LOG
   - Base year for India's GDP is written as 2022-23. The older 2011-12 base year was replaced by the new series released on 27 February 2026.
   - Real GDP is described as GDP measured at constant (base year) prices, instead of calling it GDP at base price, because base price is a different term in national accounts.
   - Deflation is described as a fall in the general price level. A low growth rate is called a slowdown, and a negative growth rate is called a recession; the two are not called the same thing.
   - Law of demand is written as: when price rises, demand falls. The older shorthand with an inverse sign was replaced by a plain sentence.
   - India's GDP rank is written as sixth largest by nominal GDP, following the International Monetary Fund's 2026 estimates; rankings can change with each yearly estimate.
   - Top states by GSDP kept as Maharashtra, Tamil Nadu, Uttar Pradesh and Karnataka, which matches the latest full-year state data.
*/