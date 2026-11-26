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

/* Field: General_Awareness · Subject: Economics · Chapter: Industrial_Policies_and_Industrial_Development_in_India · 17 concept pages (+ overview) · 51 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏭", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "INDIAN ECONOMY",
      line2: "INDUSTRIAL POLICIES",
      line3: "1948 TO MUDRA",
      badge: "FULL CLASS",
      ribbon: "TIMELINE • RATNAS • MSME • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Industrial Policies of India 1948 to 1991 | Maharatna, MSME, MUDRA | SSC CGL Economics",
      altTitles: ["Industrial Policy 1948, 1956, 1991 Made Easy for SSC CGL", "Maharatna Navratna Miniratna, SEZ, CSR and MUDRA in One Class"],
      description: "Industrial policies decide a large share of the Economics questions in General Awareness. In this class you will learn the topic step by step, in simple words.\n\n📌 IN THIS CLASS\n✅ Industrial Policies of 1948, 1956 and 1991\n✅ Index of Industrial Production and the core industries\n✅ Maharatna, Navratna and Miniratna companies\n✅ MSME, SEZ, disinvestment, CSR, Competition Act, IPR and MUDRA\n✅ Practice questions after every topic\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share and subscribe.\n\n#SSCCGL #IndianEconomy #IndustrialPolicy",
      tags: ["industrial policy 1948", "industrial policy 1956", "industrial policy 1991", "industrial policies of india", "indian economy for ssc cgl", "ssc cgl economics", "ssc cgl general awareness", "maharatna navratna miniratna", "maharatna companies list", "navratna companies", "miniratna companies", "index of industrial production", "msme classification", "special economic zones", "disinvestment in india", "csr section 135", "competition act 2002", "intellectual property rights", "mudra yojana", "mudra loan shishu kishor tarun", "ustrial Pol"],
      hashtags: ["SSCCGL", "IndianEconomy", "IndustrialPolicy"],
      thumbText: "INDUSTRIAL POLICIES 1948 TO MUDRA",
      pinnedComment: "📌 Solve the questions after each topic and write your score below 👇",
      communityPost: "🏭 New class is live: Industrial Policies and Industrial Development of India. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "SSC CGL Economics — Full Chapter Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on how India planned and grew its industries</u>, from the first Industrial Policy in 1948 to the Pradhan Mantri Mudra Yojana. Every topic here returns again and again in General Awareness papers, so we will learn each one slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>17</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>51</b><span>Questions</span></div>
        <div class="cp-stat"><b>~85 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Industrial Policies — Quick Timeline</b><br>The six important years from 1948 to 1991 and the one famous feature that belongs to each year.</li>
        <li><b>Industrial Policy, 1948</b><br>How the first policy divided industries into four groups and why it made India a Mixed Economy.</li>
        <li><b>Karve Committee</b><br>Why a committee was set up in 1955 to support small and village industries.</li>
        <li><b>Industrial Policy, 1956</b><br>How the three schedules A, B and C decided which industries belong to the government and which to private owners.</li>
        <li><b>Industrial Policy, 1991 — Key Features</b><br>How the reforms removed licences, opened reserved industries and welcomed foreign investment.</li>
        <li><b>Index of Industrial Production</b><br>How India measures the growth of its factories, mines and power plants every month, and the new base year.</li>
        <li><b>Core Industries</b><br>The basic industries, including newly added iron ore, and the weight each one carries in the index.</li>
        <li><b>Public Sector Undertakings</b><br>What a government company is and who gives special status to it.</li>
        <li><b>Maharatna, Navratna and Miniratna</b><br>The three special ranks given to successful government companies, with their rules and examples.</li>
        <li><b>Micro, Small and Medium Enterprises</b><br>How small businesses are classified by investment and turnover, and why they matter to the economy.</li>
        <li><b>Special Economic Zones</b><br>What these special areas are and how India's export zones began at Kandla.</li>
        <li><b>Disinvestment</b><br>What it means when the government sells its share in a company, and the different types of sale.</li>
        <li><b>National Manufacturing Policy, 2011</b><br>The three big goals set for jobs, share in the economy and growth of factories.</li>
        <li><b>Corporate Social Responsibility</b><br>Which companies must spend money on society and how much they must spend.</li>
        <li><b>Competition Act, 2002</b><br>Why India replaced an old law on monopolies with a new competition law.</li>
        <li><b>Intellectual Property Rights</b><br>Which law protects patents, copyrights, trademarks, geographical indications and designs.</li>
        <li><b>Pradhan Mantri Mudra Yojana</b><br>The loan scheme for small businesses and its loan categories.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> General Awareness papers ask for exact years, numbers of industries, loan limits and company lists from this chapter, so one careful reading gives you many sure marks.</div>
    `
  },
  2: {
    type: "concept", icon: "🗓️", accent: "#0ea5e9", pauseTimer: true,
    title: "Industrial Policies — Quick Timeline",
    html: `
      <p class="cp-lead">An industrial policy is the government's plan that tells us which industries the state will run and which industries private owners may run. <u>Learn the years in order, because every year carries one famous feature.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/1.png" alt="A horizontal timeline with six round dots labelled 1948, 1956, 1969, 1973, 1977 and 1991, " data-caption="Six landmark years of Indian industrial policy placed in order on one line." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/2.png" alt="Syama Prasad Mukherjee portrait photo" data-caption="Syama Prasad Mukherjee, Industry Minister who announced the first Industrial Policy in 1948." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>In a Mixed Economy, both the government and private owners run industries side by side. India chose this path in 1948 and kept it until the big reforms of 1991, when the doors were opened much wider.</p>
      <table><thead><tr><th>Year</th><th>Key feature</th></tr></thead><tbody><tr><td>1948</td><td>First Industrial Policy, announced on 6 April 1948 by Syama Prasad Mukherjee; four categories of industries; declared the Indian economy a Mixed Economy</td></tr><tr><td>1956</td><td>Also called the Economic Constitution of India; the most complete policy with three schedules A, B and C; gave the public sector the central role</td></tr><tr><td>1969</td><td>Monopolies and Restrictive Trade Practices (MRTP) Act passed</td></tr><tr><td>1973</td><td>Concept of Core Industry adopted</td></tr><tr><td>1977</td><td>District Industries Centres (DICs) set up for small and cottage industries</td></tr><tr><td>1991</td><td>New Economic Policy of liberalisation, privatisation and globalisation (LPG), announced by Prime Minister Narasimha Rao on 24 July 1991</td></tr></tbody></table>
      <div class="cp-example"><b>Easy way to see it:</b> 1948 is the first plan, 1956 is the big rulebook, and 1991 is the great opening of the market. Everything in between adds one more tool.</div>
      <div class="cp-note trap">The 1948 policy and the 1956 policy are often swapped. The Mixed Economy declaration belongs to 1948, while the three schedules A, B and C belong to 1956.</div>
      <div class="cp-note exam">Questions ask for the year of one feature, so always attach one keyword to each year: 1948 first policy, 1956 schedules, 1969 MRTP, 1977 DIC, 1991 LPG.</div>
      <div class="cp-mnemonic">48 First, 56 Schedules, 69 MRTP, 77 DIC, 91 LPG.</div>
    `
  },
  3: {
    questext: "Which Industrial Policy declared the Indian economy to be a Mixed Economy?",
    options: ["Industrial Policy of 1956", "Industrial Policy of 1948", "Industrial Policy of 1977", "Industrial Policy of 1991"],
    correct: "2",
    exptext: "✅ The first Industrial Policy, announced in 1948, declared a Mixed Economy. 📌 First policy means first mixed economy. ❌ The 1956 policy is tempting, but it is known for the three schedules and the central role of the public sector."
  },
  4: {
    questext: "The Monopolies and Restrictive Trade Practices Act was passed in which year?",
    options: ["1973", "1956", "1991", "1969"],
    correct: "4",
    exptext: "✅ The Act was passed in 1969. 📌 Remember 69 and MRTP together. ❌ The year 1973 is wrong because it is linked with the idea of Core Industry, and 1991 is the year of liberalisation."
  },
  5: {
    questext: "Consider the following statements about industrial policies of India:\n1. District Industries Centres were established in 1977 for small and cottage industries.\n2. The New Economic Policy was announced by Prime Minister Narasimha Rao on 24 July 1991.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "3",
    exptext: "✅ Both statements are correct. District Industries Centres began in 1977, and the reforms were announced on 24 July 1991. 📌 77 means DIC and 91 means LPG. ❌ Choosing only one option means one date was forgotten."
  },
  6: {
    type: "concept", icon: "🏛️", accent: "#a855f7", pauseTimer: true,
    title: "Industrial Policy, 1948",
    html: `
      <p class="cp-lead">The Industrial Policy of 1948 was the <u>first industrial policy of independent India</u>. It sorted all industries into four groups and decided who may run each group.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/3.png" alt="A four-row ladder diagram: Category 1 Public sector (3 industries), Category 2 Public-cum-" data-caption="The four categories of the 1948 policy, from full government control to free private business." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/4.png" alt="Chittaranjan Locomotive Works railway engine factory photo" data-caption="A railway engine factory, an example of an industry kept for the government." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The first category was kept only for the government because these industries are linked with national safety and need very large money. In the last category, private and cooperative owners were free to work without government control.</p>
      <table><thead><tr><th>Category</th><th>Number of industries</th><th>Description</th></tr></thead><tbody><tr><td>First (Public sector)</td><td>3</td><td>Government monopoly: armaments and war materials, atomic energy, rail transport</td></tr><tr><td>Second (Public-cum-Private)</td><td>6</td><td>Government sets up new units; old private units are allowed to continue</td></tr><tr><td>Third (Controlled Private Sector)</td><td>18</td><td>Private sector working under government control and regulation</td></tr><tr><td>Fourth (Private and Cooperative)</td><td>Rest</td><td>Entirely private sector, free from government control</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A new coal mine falls in the second category, so the government opens it. A private mine that was already running was allowed to continue. A private railway company, however, was not allowed at all because rail transport was in the first category.</div>
      <div class="cp-note trap">Remember the numbers 3, 6, 18 and Rest. The Controlled Private Sector has 18 industries, not 6, and the Public-cum-Private category has 6 industries, not 18.</div>
      <div class="cp-note exam">Questions ask the three industries of the first category: armaments, atomic energy and rail transport.</div>
      <div class="cp-mnemonic">3-6-18 goes from strict to free: Only government, Government first, Government watches, and the Rest are free.</div>
    `
  },
  7: {
    questext: "How many industries were placed in the first category, the public sector, under the Industrial Policy of 1948?",
    options: ["3", "6", "18", "12"],
    correct: "1",
    exptext: "✅ Three industries were kept for the government: armaments, atomic energy and rail transport. 📌 Three industries, three words. ❌ The number 6 belongs to the second category and 18 to the third."
  },
  8: {
    questext: "Under the Industrial Policy of 1948, how many industries were in the Controlled Private Sector?",
    options: ["12", "6", "18", "3"],
    correct: "3",
    exptext: "✅ The third category, the Controlled Private Sector, had 18 industries working under government control. 📌 Think of 18 as the largest controlled group. ❌ Six is tempting, but it is the count of the Public-cum-Private category."
  },
  9: {
    questext: "Which one of the following is NOT a feature of the Industrial Policy of 1948?",
    options: ["It was the first industrial policy of independent India", "It divided industries into four categories", "It kept armaments, atomic energy and rail transport for the government", "It divided industries into Schedules A, B and C"],
    correct: "4",
    exptext: "✅ Schedules A, B and C belong to the Industrial Policy of 1956. 📌 Four categories mean 1948, three schedules mean 1956. ❌ The other options are real features of the 1948 policy."
  },
  10: {
    type: "concept", icon: "🌾", accent: "#84cc16", pauseTimer: true,
    title: "Karve Committee",
    html: `
      <p class="cp-lead">The Karve Committee was a group of experts that studied how <u>small-scale and village industries</u> could grow. It shows that India wanted to support small producers even while it built large factories.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/5.png" alt="village handloom weaving khadi charkha India photo" data-caption="A weaver at a handloom, an example of a small village industry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/6.png" alt="A simple arrow chain: Support to village and small industries, then More jobs in villages," data-caption="How support for small industries leads to more jobs and fairer regional growth." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The committee was set up in 1955 under the chairmanship of D. G. Karve. It advised the government to promote small-scale and village industries so that more people would find work and no region would be left far behind others.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Year of setting up</td><td>1955</td></tr><tr><td>Chairman</td><td>D. G. Karve</td></tr><tr><td>Subject</td><td>Small-scale and village industries</td></tr><tr><td>Main advice</td><td>Promote small and village industries to raise employment and reduce regional imbalance</td></tr><tr><td>Type of industries supported</td><td>Labour-intensive industries, especially in rural areas</td></tr></tbody></table>
      <p>A labour-intensive industry is one that uses many workers and only a little machinery. Such industries give jobs to a large number of villagers. The committee also gave importance to the small-scale industry sector in India's economic planning.</p>
      <div class="cp-note trap">The Karve Committee is about small and village industries. Do not confuse it with committees on banking, tax or foreign trade.</div>
      <div class="cp-note exam">Remember three words together: Karve, 1955, small-scale industries.</div>
    `
  },
  11: {
    questext: "The Karve Committee, set up in 1955, was related to which sector?",
    options: ["Banking reforms", "Small-scale and village industries", "Foreign trade", "Tax collection"],
    correct: "2",
    exptext: "✅ The committee studied small-scale and village industries. 📌 Karve means villages and small units. ❌ Banking, trade and tax are tempting, but they belong to other committees."
  },
  12: {
    questext: "Who was the chairman of the committee set up in 1955 for small-scale and village industries?",
    options: ["Prasanta Chandra Mahalanobis", "Sukhamoy Chakravarty", "Chidambaram Rangarajan", "D. G. Karve"],
    correct: "4",
    exptext: "✅ D. G. Karve chaired this committee. 📌 The committee carries his name. ❌ The other names are famous economists, but they are linked with planning and disinvestment, not with this committee."
  },
  13: {
    type: "concept", icon: "📜", accent: "#ea580c", pauseTimer: true,
    title: "Industrial Policy, 1956",
    html: `
      <p class="cp-lead">The Industrial Policy of 1956 is called the <u>Economic Constitution of India</u>. It was the most complete policy of its time and gave the public sector the central place in the economy.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/7.png" alt="Three stacked boxes: Schedule A (17 industries, only government), Schedule B (12 industrie" data-caption="The three schedules of the 1956 policy, from government-only to private-only." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/8.png" alt="Bharat Heavy Electricals Limited plant Bhopal photo" data-caption="A heavy engineering plant, an example of a public sector industry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>This policy replaced the four categories of 1948 with three schedules. Schedule A was exclusively for the government, which means the government alone could open new units there. Schedule B was shared between the government and private owners, and Schedule C was left to private owners.</p>
      <table><thead><tr><th>Schedule</th><th>Number of industries</th><th>Description</th></tr></thead><tbody><tr><td>A</td><td>17</td><td>Exclusively public sector; complete central government monopoly, the home of public sector undertakings</td></tr><tr><td>B</td><td>12</td><td>Mixed, with both public and private sector</td></tr><tr><td>C</td><td>Rest</td><td>Entirely private sector</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> In Schedule A the government alone starts new units. In Schedule B, the government starts new units, but private units can also work. In Schedule C, private owners may start any unit they like.</div>
      <div class="cp-note trap">Schedule A has 17 industries and Schedule B has 12. Do not swap the numbers. Also remember that the 1948 policy had four categories, while this policy has three schedules.</div>
      <div class="cp-note exam">Remember the phrase Economic Constitution of India with the year 1956.</div>
      <div class="cp-mnemonic">A is All government, B is Both, C is Citizens (private owners).</div>
    `
  },
  14: {
    questext: "Which Industrial Policy is known as the Economic Constitution of India?",
    options: ["Industrial Policy of 1948", "Industrial Policy of 1977", "Industrial Policy of 1956", "Industrial Policy of 1991"],
    correct: "3",
    exptext: "✅ The policy of 1956 is called the Economic Constitution of India. 📌 Constitution means a complete rulebook, which is the 1956 policy. ❌ The 1948 policy was only the first policy and did not have the schedules."
  },
  15: {
    questext: "How many industries were placed in Schedule A of the Industrial Policy of 1956?",
    options: ["12", "17", "18", "8"],
    correct: "2",
    exptext: "✅ Schedule A had 17 industries, reserved exclusively for the government. 📌 A is for All government, and 17 is the largest count. ❌ The number 12 belongs to Schedule B, and 18 belongs to the 1948 third category."
  },
  16: {
    questext: "Consider the following statements about the Industrial Policy of 1956:\n1. Schedule B industries are mixed, with both public and private sectors.\n2. Schedule C industries are exclusively for the public sector.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct, because Schedule B is a mixed group. 📌 B means Both. ❌ Statement 2 is wrong because Schedule C is entirely private, and Schedule A is the public one."
  },
  17: {
    type: "concept", icon: "🔓", accent: "#ef4444", pauseTimer: true,
    title: "Industrial Policy, 1991 — Key Features (LPG Reforms)",
    html: `
      <p class="cp-lead">The reforms of 1991 are known as <u>LPG: liberalisation, privatisation and globalisation</u>. They removed old controls and opened the doors of the Indian market to the world.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/9.png" alt="Three columns with arrows: De-licensing (18 industries down to 5), De-reservation (8 indus" data-caption="The three big changes of the 1991 policy shown as three simple columns." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/10.png" alt="Manmohan Singh Narasimha Rao 1991 economic reforms photo" data-caption="Prime Minister Narasimha Rao with Finance Minister Manmohan Singh during the 1991 reforms." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>De-licensing means removing the need to take a licence, or official permission, before starting an industry. Earlier, 18 industries needed a licence. Now only five industries need one, and these are kept under control for safety and health reasons.</p>
      <table><thead><tr><th>Industries that still need a licence</th><th>Reason</th></tr></thead><tbody><tr><td>Electronics, aerospace and defence-related goods</td><td>National safety</td></tr><tr><td>Gunpowder, industrial explosives and blasting fuses</td><td>Danger to life</td></tr><tr><td>Hazardous chemicals</td><td>Danger to life and environment</td></tr><tr><td>Tobacco, cigarettes and related products</td><td>Public health</td></tr><tr><td>Alcoholic drinks</td><td>Public health</td></tr></tbody></table>
      <p>De-reservation means opening the industries that were kept only for the government. Earlier, 8 industries were reserved for the central government. Now only two remain reserved: nuclear research and related activities, and railway services.</p>
      <p>The third big change was the promotion of foreign investment. Foreign Direct Investment (FDI) was allowed up to 51 percent foreign capital, and it started in India in 1991. Foreign institutional portfolio investment, which means buying shares and bonds, started in 1992.</p>
      <div class="cp-note trap">De-licensing took the licence-needing industries down to 5, while de-reservation took the reserved industries down to 2. Do not mix the two numbers.</div>
      <div class="cp-note exam">Remember the three reserved-and-licence numbers: 18 to 5 (licence), 8 to 2 (reservation) and 51 percent (foreign capital).</div>
    `
  },
  18: {
    questext: "After the reforms of 1991, the number of industries needing a licence was reduced from 18 to how many?",
    options: ["8", "2", "5", "12"],
    correct: "3",
    exptext: "✅ Only 5 industries need a licence now, such as alcohol, tobacco and hazardous chemicals. 📌 Remember 18 to 5 with licence. ❌ The number 2 belongs to de-reservation, so it is a tempting wrong option."
  },
  19: {
    questext: "Which one of the following industries is NOT in the list of industries that still need a licence?",
    options: ["Alcoholic drinks", "Tobacco and cigarettes", "Hazardous chemicals", "Cotton textiles"],
    correct: "4",
    exptext: "✅ Cotton textiles are free from licensing. 📌 Licences are kept only for dangerous or harmful goods. ❌ The other three industries are in the list because they affect public health or safety."
  },
  20: {
    questext: "Which pair of industries is now reserved for the central government after the 1991 de-reservation?",
    options: ["Nuclear research and railway services", "Coal and steel", "Armaments and shipbuilding", "Telephone services and aviation"],
    correct: "1",
    exptext: "✅ Only nuclear research and related activities, and railway services, remain reserved. 📌 The two reserved industries both carry high national risk. ❌ Coal and steel were once reserved, but they are now open."
  },
  21: {
    questext: "In 1991, Foreign Direct Investment was allowed up to what share of foreign capital?",
    options: ["26 percent", "74 percent", "100 percent", "51 percent"],
    correct: "4",
    exptext: "✅ The 1991 policy allowed up to 51 percent foreign capital. 📌 Fifty-one means the foreigner could hold a little more than half. ❌ The option 100 percent is wrong because that limit came much later in some sectors."
  },
  22: {
    type: "concept", icon: "📈", accent: "#14b8a6", pauseTimer: true,
    title: "Index of Industrial Production (IIP)",
    html: `
      <p class="cp-lead">The Index of Industrial Production is a <u>report card of India's factories, mines and power plants</u>. It tells us whether industrial output has gone up or down compared with an earlier period.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/11.png" alt="A circle split into four labelled parts: Mining, Manufacturing, Electricity, and Water Sup" data-caption="The four parts of the Index of Industrial Production and its current base year." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/12.png" alt="India steel plant factory production line photo" data-caption="A steel plant, an example of the manufacturing activity that the index measures." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>An index compares output today with output in a chosen starting year, called the base year. The base year is given the value 100. If the index reaches 120, industrial output is twenty percent higher than in the base year.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Released by</td><td>National Statistics Office (NSO), under the Ministry of Statistics and Programme Implementation</td></tr><tr><td>Current base year</td><td>2022-23, in the new series released from June 2026</td></tr><tr><td>Earlier base year</td><td>2011-12</td></tr><tr><td>Components in the new series</td><td>Mining, Manufacturing, Electricity, and Water supply with sewerage and waste management</td></tr><tr><td>Components in the earlier series</td><td>Mining, Manufacturing and Electricity</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> If the index of a month is 130 and the index of the same month last year is 125, industrial output has grown. The growth rate is found from the difference, which is 5, divided by 125.</div>
      <div class="cp-note trap">Agriculture is not part of this index. Only industrial activities are counted. Also remember that the base year was 2011-12 for many years and changed to 2022-23 in 2026.</div>
      <div class="cp-note exam">Remember two facts: the current base year is 2022-23 and the releasing body is the National Statistics Office.</div>
      <div class="cp-mnemonic">Base year moves forward about once in a decade: 2004-05, then 2011-12, then 2022-23.</div>
    `
  },
  23: {
    questext: "Which organisation releases the Index of Industrial Production?",
    options: ["National Statistics Office", "Reserve Bank of India", "Securities and Exchange Board of India", "Department of Public Enterprises"],
    correct: "1",
    exptext: "✅ The National Statistics Office releases the index. 📌 It is a statistics body, so it gives statistics. ❌ The Reserve Bank of India is tempting because it publishes many economic reports, but it does not release this index."
  },
  24: {
    questext: "The current base year of the Index of Industrial Production, from the new series of 2026, is",
    options: ["2004-05", "1993-94", "2017-18", "2022-23"],
    correct: "4",
    exptext: "✅ The new series uses 2022-23 as the base year. 📌 Each new series moves the base year forward. ❌ The earlier base year was 2011-12, and 2004-05 was one before that, so they are not current."
  },
  25: {
    questext: "Which one of the following is NOT an industrial activity covered by the Index of Industrial Production?",
    options: ["Mining", "Manufacturing", "Agriculture", "Electricity"],
    correct: "3",
    exptext: "✅ Agriculture is not included in the index. 📌 The index measures mines, factories and power only, plus water and waste services in the new series. ❌ Mining, manufacturing and electricity are all covered."
  },
  26: {
    type: "concept", icon: "⚙️", accent: "#f59e0b", pauseTimer: true,
    title: "Core Industries",
    html: `
      <p class="cp-lead">The core industries are the <u>basic industries on which all other industries depend</u>. If they grow well, the whole industrial economy usually grows well.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/13.png" alt="A horizontal bar chart of the nine core industries in order of weight: Electricity 30.9, R" data-caption="Weights of the nine core industries in the revised index, from heaviest to lightest." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/14.png" alt="iron ore open cast mine India photo" data-caption="An iron ore mine, the industry added as the ninth core industry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The core industries are coal, crude oil, natural gas, petroleum refinery products, fertilizers, steel, cement, electricity and iron ore. They are called core because other industries cannot work without their coal, power, fuel, steel or cement. Iron ore was added as the ninth core industry in the revised series because it is used so widely in industry. Before that, there were eight core industries.</p>
      <table><thead><tr><th>Industry</th><th>Weight in the revised index (base year 2022-23)</th></tr></thead><tbody><tr><td>Electricity</td><td>30.9</td></tr><tr><td>Refinery products</td><td>22.6</td></tr><tr><td>Steel</td><td>17.6</td></tr><tr><td>Crude oil</td><td>7.4</td></tr><tr><td>Coal</td><td>5.6</td></tr><tr><td>Iron ore</td><td>4.9</td></tr><tr><td>Cement</td><td>4.4</td></tr><tr><td>Natural gas</td><td>3.8</td></tr><tr><td>Fertilizer</td><td>2.7</td></tr></tbody></table>
      <p>The revised Index of Core Industries has the base year 2022-23. In the earlier series, with base year 2011-12, there were eight industries and refinery products had the highest weight, 28.0. Those eight industries together carried 40.3 percent of the weight of the Index of Industrial Production. The index is released every month by the Office of the Economic Adviser in the Department for Promotion of Industry and Internal Trade, under the Ministry of Commerce and Industry.</p>
      <div class="cp-note trap">In the revised index, electricity has the highest weight. In the earlier eight-industry series, refinery products had the highest weight. In both series, fertilizer has the lowest weight.</div>
      <div class="cp-note exam">Remember the number of core industries is now nine, the newest member is iron ore, and the base year is 2022-23.</div>
    `
  },
  27: {
    questext: "Which of the core industries has the highest weight in the revised Index of Core Industries with base year 2022-23?",
    options: ["Electricity", "Refinery products", "Steel", "Coal"],
    correct: "1",
    exptext: "✅ Electricity has the highest weight, at about 30.9. 📌 Electricity moved to the top, and refinery products moved to second place. ❌ Refinery products had the top weight in the earlier series, so it is a tempting wrong option."
  },
  28: {
    questext: "Which industry was added as the ninth core industry in the revised series with base year 2022-23?",
    options: ["Sugar", "Aluminium", "Iron ore", "Copper"],
    correct: "3",
    exptext: "✅ Iron ore was added because it is used heavily in industry and steel making. 📌 Iron ore feeds the steel industry. ❌ Aluminium and copper are important metals but they were not added."
  },
  29: {
    questext: "Which one of the following is NOT a core industry?",
    options: ["Cement", "Fertilizers", "Natural gas", "Cotton textiles"],
    correct: "4",
    exptext: "✅ Cotton textiles are not a core industry. 📌 Core industries are the basic inputs such as fuel, power and building material. ❌ Cement, fertilizers and natural gas are all core industries."
  },
  30: {
    type: "concept", icon: "🏢", accent: "#3b82f6", pauseTimer: true,
    title: "Public Sector Undertakings (PSUs)",
    html: `
      <p class="cp-lead">A Public Sector Undertaking is a company that the government owns or controls. <u>Where the government holds 51 percent or more of the capital, the enterprise is a Public Sector Undertaking.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/15.png" alt="A simple pie circle with a large 51 percent part labelled Government capital and a smaller" data-caption="A company with 51 percent or more government capital counts as a Public Sector Undertaking." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/16.png" alt="Coal India Limited headquarters Kolkata photo" data-caption="The headquarters of Coal India Limited, a large central government company." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The Industrial Policy of 1956 gave the public sector a central and dominant place in the Indian economy. Many large companies in steel, coal, oil and power were set up by the government under that policy.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Minimum government capital share</td><td>51 percent or more</td></tr><tr><td>Policy that gave a central place to the public sector</td><td>Industrial Policy of 1956</td></tr><tr><td>Body that gives special status to such companies</td><td>Department of Public Enterprises (DPE)</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> If a company has 100 shares and the government holds 51 of them, the government controls the company, so it is a Public Sector Undertaking.</div>
      <div class="cp-note trap">The test is 51 percent or more of capital held by the government, not 49 percent and not 26 percent.</div>
      <div class="cp-note exam">The special status of Maharatna, Navratna and Miniratna is given by the Department of Public Enterprises.</div>
    `
  },
  31: {
    questext: "An enterprise is treated as a Public Sector Undertaking when the government holds at least what share of its capital?",
    options: ["26 percent", "51 percent", "74 percent", "100 percent"],
    correct: "1",
    exptext: "✅ Fifty-one percent or more is the test. 📌 Fifty-one means more than half, so the government has control. ❌ The options 26 percent and 74 percent are common foreign investment limits and do not apply here."
  },
  32: {
    questext: "Which department confers the status of Maharatna, Navratna and Miniratna on government companies?",
    options: ["Department of Economic Affairs", "Department of Public Enterprises", "Department of Revenue", "Department of Expenditure"],
    correct: "2",
    exptext: "✅ The Department of Public Enterprises gives these ranks. 📌 Public sector companies are looked after by the Public Enterprises department. ❌ The other departments are under finance matters, but they do not give company ranks."
  },
  33: {
    type: "concept", icon: "💎", accent: "#ec4899", pauseTimer: true,
    title: "Maharatna, Navratna and Miniratna",
    html: `
      <p class="cp-lead">These are three <u>special ranks given to successful government companies</u>. The higher the rank, the more freedom the company gets to invest and take decisions without asking the government each time.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/17.png" alt="A three-step ladder: bottom step Miniratna (about 74 companies), middle step Navratna (26 " data-caption="The three ranks of government companies, from Miniratna at the bottom to Maharatna at the top." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/18.png" alt="NTPC Limited power plant India photo" data-caption="A power plant of NTPC Limited, one of the Maharatna companies." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/19.png" alt="Airports Authority of India Delhi airport terminal photo" data-caption="A terminal run by the Airports Authority of India, an example of a Miniratna company." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The ranks work like school grades. A company first becomes Miniratna, then Navratna, and then Maharatna if its profits, size and performance keep rising. The Department of Public Enterprises gives these ranks.</p>
      <table><thead><tr><th>Rank</th><th>Number of companies</th><th>Examples</th></tr></thead><tbody><tr><td>Maharatna</td><td>14</td><td>Bharat Heavy Electricals Limited, Bharat Petroleum Corporation Limited, Coal India Limited, GAIL (India) Limited, Hindustan Petroleum Corporation Limited, Indian Oil Corporation Limited, NTPC Limited, Oil and Natural Gas Corporation Limited, Power Grid Corporation of India Limited, Steel Authority of India Limited, Power Finance Corporation Limited, REC Limited, Oil India Limited, Hindustan Aeronautics Limited</td></tr><tr><td>Navratna</td><td>26</td><td>Bharat Electronics Limited, National Aluminium Company Limited, NMDC Limited, RITES Limited, IRCON International Limited, Rail Vikas Nigam Limited, NHPC Limited, SJVN Limited, Indian Renewable Energy Development Agency Limited, Mazagon Dock Shipbuilders Limited, Housing and Urban Development Corporation Limited, Indian Railway Catering and Tourism Corporation Limited, Indian Railway Finance Corporation Limited, RailTel Corporation of India Limited, Solar Energy Corporation of India Limited</td></tr><tr><td>Miniratna</td><td>About 74</td><td>Airports Authority of India, BEML Limited, Cochin Shipyard Limited, Goa Shipyard Limited, Hindustan Copper Limited, MOIL Limited, National Small Industries Corporation, WAPCOS Limited, MECON Limited, Central Electronics Limited</td></tr></tbody></table>
      <p>For the Maharatna rank, a company must already have Navratna status and be listed on an Indian stock exchange. It must also have, on average over the last three years, an annual turnover of more than ₹25,000 crore, a net worth of more than ₹15,000 crore and a net profit after tax of more than ₹5,000 crore. It must also have a significant global presence.</p>
      <p>For the Navratna rank, a company must hold the Miniratna Category-I status and get an Excellent or Very Good rating on its performance agreement with the government in three of the last five years. It must also score at least 60 out of 100 on six measures: net profit, net worth, total manpower cost, profit before depreciation, interest and tax (PBDIT), capital employed and turnover.</p>
      <table><thead><tr><th>Miniratna category</th><th>Criteria</th></tr></thead><tbody><tr><td>Category-I</td><td>Profit in the last three years, positive net worth, and a pre-tax profit of ₹30 crore or more in at least one of those years</td></tr><tr><td>Category-II</td><td>Profit in the last three years and positive net worth</td></tr></tbody></table>
      <div class="cp-note trap">Navratna companies number 26, and Maharatna companies number 14. Do not swap them. A company cannot become Maharatna unless it is already Navratna.</div>
      <div class="cp-note exam">Remember the profit figure for Maharatna: more than ₹5,000 crore of average net profit after tax. For Navratna, remember the score of 60 out of 100.</div>
      <div class="cp-mnemonic">Mini 74, Nav 26, Maha 14: the higher the rank, the fewer the companies.</div>
    `
  },
  34: {
    questext: "How many companies currently hold the Maharatna status?",
    options: ["10", "14", "26", "74"],
    correct: "1",
    exptext: "✅ Fourteen companies hold the Maharatna rank. 📌 The top rank has the smallest group. ❌ The number 26 is the Navratna count, and 74 is the approximate Miniratna count."
  },
  35: {
    questext: "Which one of the following companies is a Maharatna company?",
    options: ["Airports Authority of India", "Hindustan Aeronautics Limited", "Cochin Shipyard Limited", "National Small Industries Corporation"],
    correct: "2",
    exptext: "✅ Hindustan Aeronautics Limited is a Maharatna company. 📌 It joined the Maharatna list in 2024. ❌ The other three are Miniratna companies, which are a lower rank."
  },
  36: {
    questext: "A company must have an average annual net profit after tax of more than which amount over the last three years to get the Maharatna status?",
    options: ["₹1,000 crore", "₹2,500 crore", "₹5,000 crore", "₹25,000 crore"],
    correct: "3",
    exptext: "✅ The average net profit after tax must be above ₹5,000 crore. 📌 Remember 5,000 for profit, 15,000 for net worth and 25,000 for turnover. ❌ The amount ₹25,000 crore is the turnover limit, not the profit limit."
  },
  37: {
    questext: "Consider the following statements about Navratna and Miniratna companies:\n1. A Navratna company must score at least 60 out of 100 on six performance measures.\n2. Miniratna Category-II needs a pre-tax profit of ₹30 crore or more in at least one year.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 The ₹30 crore pre-tax profit test is for Category-I only. ❌ Category-II needs only profit in the last three years and a positive net worth."
  },
  38: {
    questext: "How many Navratna companies are there at present?",
    options: ["14", "74", "10", "26"],
    correct: "4",
    exptext: "✅ There are 26 Navratna companies. 📌 The middle rank has the middle count. ❌ The number 14 is the Maharatna count, and 74 is the approximate Miniratna count."
  },
  39: {
    type: "concept", icon: "🏪", accent: "#16a34a", pauseTimer: true,
    title: "Micro, Small and Medium Enterprises (MSMEs)",
    html: `
      <p class="cp-lead">Micro, Small and Medium Enterprises are the <u>small and middle-sized businesses that give jobs to crores of people</u>. They are sorted into three types by the money invested and the sales made in a year.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/20.png" alt="Three nested boxes of growing size labelled Micro, Small, Medium, each with its investment" data-caption="The three sizes of enterprise with their limits of investment and turnover." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/21.png" alt="small scale industry workshop India photo" data-caption="A small workshop in India, a typical micro or small enterprise." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The idea of the Micro, Small and Medium Enterprise was brought in by the Micro, Small and Medium Enterprises Development Act, 2006. Turnover means the total value of sales in a year, and investment means the money put into plant, machinery and equipment.</p>
      <table><thead><tr><th>Type</th><th>Earlier limit: investment</th><th>Earlier limit: turnover</th><th>Revised limit from 1 April 2025: investment</th><th>Revised limit from 1 April 2025: turnover</th></tr></thead><tbody><tr><td>Micro enterprise</td><td>₹1 crore</td><td>₹5 crore</td><td>₹2.5 crore</td><td>₹10 crore</td></tr><tr><td>Small enterprise</td><td>₹10 crore</td><td>₹50 crore</td><td>₹25 crore</td><td>₹100 crore</td></tr><tr><td>Medium enterprise</td><td>₹50 crore</td><td>₹250 crore</td><td>₹125 crore</td><td>₹500 crore</td></tr></tbody></table>
      <table><thead><tr><th>Contribution</th><th>Approximate figure</th></tr></thead><tbody><tr><td>Share in the gross domestic product (GDP)</td><td>About 30 percent</td></tr><tr><td>Employment</td><td>Over 11 crore people</td></tr><tr><td>Share in India's total exports</td><td>About 45 percent</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A workshop that invested ₹2 crore and sold goods worth ₹8 crore in a year is a micro enterprise under the revised limits. Under the earlier limits, it would have been a small enterprise.</div>
      <div class="cp-note trap">The revised limits are about two and a half times the earlier ones for investment and twice the earlier ones for turnover. Do not mix the two columns.</div>
      <div class="cp-note exam">Remember the Act, the year 2006, and the three figures: about 30 percent of gross domestic product, over 11 crore jobs and about 45 percent of exports.</div>
    `
  },
  40: {
    questext: "The concept of Micro, Small and Medium Enterprises was introduced in India through which Act?",
    options: ["Industries (Development and Regulation) Act, 1951", "Micro, Small and Medium Enterprises Development Act, 2006", "Competition Act, 2002", "Companies Act, 2013"],
    correct: "2",
    exptext: "✅ The Micro, Small and Medium Enterprises Development Act, 2006, introduced the concept. 📌 Remember 2006 with the word Enterprises. ❌ The Competition Act of 2002 and the Companies Act of 2013 deal with other subjects."
  },
  41: {
    questext: "Under the revised limits applicable from 1 April 2025, the maximum investment for a small enterprise is",
    options: ["₹10 crore", "₹125 crore", "₹25 crore", "₹50 crore"],
    correct: "3",
    exptext: "✅ A small enterprise can invest up to ₹25 crore. 📌 Micro 2.5, Small 25 and Medium 125 grow by steps. ❌ The amount ₹10 crore was the earlier limit, so it is a tempting wrong option."
  },
  42: {
    questext: "Consider the following statements about Micro, Small and Medium Enterprises:\n1. They contribute about 45 percent of India's gross domestic product.\n2. They account for about 45 percent of India's total exports.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct, because their share of exports is about 45 percent. 📌 Thirty percent of output, forty-five percent of exports. ❌ Statement 1 is wrong because their share of gross domestic product is about 30 percent."
  },
  43: {
    type: "concept", icon: "🌐", accent: "#06b6d4", pauseTimer: true,
    title: "Special Economic Zones (SEZs)",
    html: `
      <p class="cp-lead">A Special Economic Zone is a <u>special area of the country where the economic laws are more liberal than in the rest of the country</u>. The aim is to speed up industry and attract foreign money.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/22.png" alt="A timeline with four dots: 1965 Export Processing Zone at Kandla, April 2000 Special Econo" data-caption="Four milestones in the story of Special Economic Zones in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/23.png" alt="Kandla Special Economic Zone Gujarat photo" data-caption="The Kandla zone in Gujarat, the first export processing zone in Asia." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>India was the first country in Asia to set up an Export Processing Zone, at Kandla in 1965. An Export Processing Zone is an industrial area where goods are made mainly for export. Later, in April 2000, the government announced a Special Economic Policy, and all Export Processing Zones were converted into Special Economic Zones.</p>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>First Export Processing Zone in Asia</td><td>Kandla, India, in 1965</td></tr><tr><td>Special Economic Policy announced</td><td>April 2000, all Export Processing Zones converted to Special Economic Zones</td></tr><tr><td>Special Economic Zones Act</td><td>2005</td></tr><tr><td>Act effective from</td><td>February 2006</td></tr><tr><td>Objective</td><td>Speed up industrialisation and attract foreign investment</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A company sets up a factory in a Special Economic Zone to make cloth for export. It gets easier rules and tax benefits there, so it can compete better in the world market.</div>
      <div class="cp-note trap">The Export Processing Zone came first in 1965, and the Special Economic Zone came later in 2000. The Act of 2005 became effective in February 2006, not in 2005.</div>
      <div class="cp-note exam">Remember Kandla, 1965, April 2000 and February 2006 as the four anchor points.</div>
    `
  },
  44: {
    questext: "India set up the first Export Processing Zone in Asia at Kandla in which year?",
    options: ["1955", "1965", "1975", "1991"],
    correct: "2",
    exptext: "✅ The Kandla Export Processing Zone was set up in 1965. 📌 Remember 65 with Kandla. ❌ The year 1991 is tempting because it is the year of the big reforms, but zones began much earlier."
  },
  45: {
    questext: "The Special Economic Zones Act, 2005 came into effect from",
    options: ["April 2000", "December 2005", "February 2006", "July 1991"],
    correct: "3",
    exptext: "✅ The Act was passed in 2005 and came into effect in February 2006. 📌 Passed first, effective after. ❌ April 2000 is the date of the Special Economic Policy, not of the Act."
  },
  46: {
    questext: "In which year was the Special Economic Policy announced, converting all Export Processing Zones into Special Economic Zones?",
    options: ["1991", "2005", "2006", "2000"],
    correct: "4",
    exptext: "✅ The policy was announced in April 2000. 📌 The new millennium brought the new zones. ❌ The year 2005 is tempting because the Act was passed then, but the policy came earlier."
  },
  47: {
    type: "concept", icon: "💼", accent: "#8b5cf6", pauseTimer: true,
    title: "Disinvestment",
    html: `
      <p class="cp-lead">Disinvestment means that <u>the government sells its share in public sector companies to private owners or to the public</u>. It brings money to the government and can make companies work better.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/24.png" alt="A simple flow: Government owns 100 percent, then sells shares, then Government keeps contr" data-caption="The two kinds of disinvestment shown as a simple flow from full government ownership." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/25.png" alt="Air India Tata Group handover disinvestment photo" data-caption="The Tata Group taking over Air India, an example of strategic disinvestment." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The word disinvestment was first used in the Interim Budget of 1991. The Rangarajan Committee of 1993 stressed the need for substantial disinvestment. Over time, the department that looks after disinvestment changed its name several times.</p>
      <table><thead><tr><th>Date</th><th>Event</th></tr></thead><tbody><tr><td>10 December 1999</td><td>Department of Disinvestment established as a separate department</td></tr><tr><td>6 September 2001</td><td>Renamed Ministry of Disinvestment</td></tr><tr><td>27 May 2004</td><td>Placed under the Ministry of Finance</td></tr><tr><td>14 April 2016</td><td>Renamed Department of Investment and Public Asset Management (DIPAM)</td></tr></tbody></table>
      <table><thead><tr><th>Type</th><th>Meaning</th></tr></thead><tbody><tr><td>Token disinvestment</td><td>Between 5 and 49 percent of the shares are sold, and the government keeps control</td></tr><tr><td>Strategic disinvestment</td><td>The private sector gets the management control of the public sector company</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> If the government sells 20 percent of a company's shares to the public, it is token disinvestment because the government still owns the majority. If it hands the running of the company to a private owner, it is strategic disinvestment.</div>
      <div class="cp-note trap">In token disinvestment, the government keeps control. In strategic disinvestment, control passes to the private buyer. Do not swap them.</div>
      <div class="cp-note exam">Remember the four dates: 1999, 2001, 2004 and 2016, and the last name, DIPAM.</div>
      <div class="cp-mnemonic">Token is Touch only, Strategic is Sold control.</div>
    `
  },
  48: {
    questext: "In 2016, the Department of Disinvestment was renamed",
    options: ["Ministry of Disinvestment", "Department of Public Enterprises", "Department of Investment and Public Asset Management", "Department of Economic Affairs"],
    correct: "3",
    exptext: "✅ On 14 April 2016, it became the Department of Investment and Public Asset Management. 📌 Remember the short form DIPAM. ❌ Ministry of Disinvestment was the name between 2001 and 2004."
  },
  49: {
    questext: "In strategic disinvestment, what happens to the public sector company?",
    options: ["The government sells 5 percent of shares and keeps control", "The private sector gets the management control", "The company is closed down", "The government buys more shares"],
    correct: "2",
    exptext: "✅ In strategic disinvestment, the private sector gets management control. 📌 Strategic means control changes hands. ❌ Selling a small share and keeping control is token disinvestment."
  },
  50: {
    questext: "Consider the following statements about disinvestment in India:\n1. In token disinvestment, the private sector gets the management control.\n2. The Department of Disinvestment was established as a separate department on 10 December 1999.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "2",
    exptext: "✅ Only statement 2 is correct. 📌 Token means the government keeps control. ❌ Statement 1 is wrong because management control passes to the private sector only in strategic disinvestment."
  },
  51: {
    type: "concept", icon: "🏗️", accent: "#d97706", pauseTimer: true,
    title: "National Manufacturing Policy, 2011",
    html: `
      <p class="cp-lead">The National Manufacturing Policy was announced to <u>make India a strong manufacturing country</u> by raising factory output, jobs and growth. It set three clear goals for a decade.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/26.png" alt="Three target cards in a row: Card 1 100 million extra jobs by 2022, Card 2 Manufacturing s" data-caption="The three main goals of the National Manufacturing Policy of 2011." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/27.png" alt="automobile assembly line factory India photo" data-caption="An automobile assembly line, an example of manufacturing industry." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The policy was announced on 4 November 2011. It wanted factories to give more jobs, add more to the national income and grow faster than before. The target year for the first two goals was 2022.</p>
      <table><thead><tr><th>Objective</th><th>Target</th></tr></thead><tbody><tr><td>Jobs</td><td>Create 100 million extra jobs in a decade, by 2022</td></tr><tr><td>Share in gross domestic product</td><td>Raise the share of manufacturing in gross domestic product to 25 percent by 2022, from about 16 percent</td></tr><tr><td>Growth rate</td><td>Achieve 12 to 14 percent growth in the manufacturing sector</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> If manufacturing makes 16 rupees out of every 100 rupees of national income today, the goal is to raise it to 25 rupees out of every 100 rupees.</div>
      <div class="cp-note trap">The policy set a target of 25 percent share in gross domestic product, not 16 percent. The share of about 16 percent was the starting point.</div>
      <div class="cp-note exam">Remember the date 4 November 2011 and the three numbers: 100 million, 25 percent and 12 to 14 percent.</div>
    `
  },
  52: {
    questext: "The National Manufacturing Policy was announced on",
    options: ["1 April 2010", "15 August 2011", "24 July 1991", "4 November 2011"],
    correct: "4",
    exptext: "✅ The policy was announced on 4 November 2011. 📌 The policy and the year 2011 go together. ❌ The date 24 July 1991 belongs to the New Economic Policy."
  },
  53: {
    questext: "What share of gross domestic product did the National Manufacturing Policy of 2011 aim to reach for manufacturing by 2022?",
    options: ["16 percent", "12 percent", "25 percent", "40 percent"],
    correct: "3",
    exptext: "✅ The target was 25 percent by 2022. 📌 From about 16 to 25 is the big jump. ❌ The figure 16 percent was the starting share, not the target."
  },
  54: {
    type: "concept", icon: "🤝", accent: "#10b981", pauseTimer: true,
    title: "Corporate Social Responsibility (CSR)",
    html: `
      <p class="cp-lead">Corporate Social Responsibility means that <u>big companies must give back to society by spending a part of their profit on good causes</u>. In India, this is a legal rule and not only a choice.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/28.png" alt="Three rounded cards joined to a centre circle labelled CSR 2 percent: Education, Reducing " data-caption="Examples of the good causes on which companies spend their social responsibility funds." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/29.png" alt="company funded school classroom children India photo" data-caption="Children in a classroom built with a company's social responsibility funds." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The rule comes from Section 135 of the Companies Act, 2013. A company must follow it if it passes any one of three tests: net worth, turnover or net profit.</p>
      <table><thead><tr><th>Test</th><th>Limit</th></tr></thead><tbody><tr><td>Net worth</td><td>₹500 crore or more</td></tr><tr><td>Turnover</td><td>₹1,000 crore or more</td></tr><tr><td>Net profit</td><td>₹5 crore or more</td></tr></tbody></table>
      <p>A company that passes any one of these tests must spend 2 percent of its average net profit of the last three years on social responsibility activities. Examples are education, reducing hunger and poverty, and protecting the environment.</p>
      <div class="cp-example"><b>Example:</b> If a company's average net profit for the last three years is ₹100 crore, it must spend at least ₹2 crore on social activities.</div>
      <div class="cp-note trap">Only one test needs to be met, not all three. The spending rate is 2 percent of the average profit of the last three years, not of one year.</div>
      <div class="cp-note exam">Remember Section 135, the Companies Act 2013 and the rate of 2 percent.</div>
    `
  },
  55: {
    questext: "Corporate Social Responsibility in India is governed by which Section of the Companies Act, 2013?",
    options: ["Section 80", "Section 135", "Section 149", "Section 234"],
    correct: "2",
    exptext: "✅ Section 135 deals with Corporate Social Responsibility. 📌 Remember 135 with CSR. ❌ Other sections cover other parts of company law."
  },
  56: {
    questext: "An eligible company must spend what share of its average net profit of the last three years on Corporate Social Responsibility activities?",
    options: ["1 percent", "5 percent", "2 percent", "10 percent"],
    correct: "3",
    exptext: "✅ The required spending is 2 percent of the average net profit of the last three years. 📌 Two percent is the fixed rate. ❌ Five percent is tempting because it matches the net profit limit of ₹5 crore, but it is not the spending rate."
  },
  57: {
    questext: "Consider the following statements about Corporate Social Responsibility under the Companies Act, 2013:\n1. A company must spend 2 percent of its average net profit of the last three years on such activities.\n2. A company is covered only when it meets all three tests of net worth, turnover and net profit together.\nWhich of the statements given above is/are correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Any one test is enough. ❌ Statement 2 is wrong because a company is covered if it meets any one of the three tests."
  },
  58: {
    type: "concept", icon: "⚖️", accent: "#e11d48", pauseTimer: true,
    title: "Competition Act, 2002",
    html: `
      <p class="cp-lead">The Competition Act, 2002 is the law that <u>keeps markets fair and stops companies from becoming unfair monopolies</u>. It replaced an old law that no longer suited the new open economy.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/30.png" alt="A simple flow in four boxes: MRTP Act 1969, Reforms of 1991, SVS Raghavan Committee May 20" data-caption="How the old law on monopolies was replaced by the Competition Act of 2002." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/31.png" alt="Competition Commission of India office New Delhi photo" data-caption="The Competition Commission of India office, the body that enforces the competition law." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>After the reforms of 1991, the Monopolies and Restrictive Trade Practices Act of 1969 became out of date. Its aim had been to control big business, but the new policy wanted competition and growth instead.</p>
      <table><thead><tr><th>Step</th><th>Detail</th></tr></thead><tbody><tr><td>Old law</td><td>Monopolies and Restrictive Trade Practices Act, 1969, became irrelevant after liberalisation</td></tr><tr><td>May 2000</td><td>SVS Raghavan Committee recommended repealing the old Act and bringing in a competition law</td></tr><tr><td>2001</td><td>Competition Bill introduced</td></tr><tr><td>2002</td><td>Competition Act passed</td></tr></tbody></table>
      <p>A monopolistic practice is one in which a single seller or a small group controls the market and can fix high prices. The purpose of the new Act was to let Indian companies compete with multinational companies and to prevent monopolistic practices.</p>
      <div class="cp-note trap">The Competition Bill came in 2001, and the Competition Act came in 2002. The committee that recommended it met in May 2000.</div>
      <div class="cp-note exam">Remember the Raghavan Committee with May 2000 and the replacement of the Monopolies and Restrictive Trade Practices Act.</div>
    `
  },
  59: {
    questext: "Which committee recommended repealing the Monopolies and Restrictive Trade Practices Act and introducing a competition law?",
    options: ["Karve Committee", "Rangarajan Committee", "SVS Raghavan Committee", "Tarapore Committee"],
    correct: "3",
    exptext: "✅ The SVS Raghavan Committee gave this advice in May 2000. 📌 Raghavan led to the Competition Act. ❌ The Karve Committee dealt with small industries, and the Rangarajan Committee dealt with disinvestment."
  },
  60: {
    questext: "The Competition Act, 2002 replaced which earlier law?",
    options: ["Patent Act, 1970", "Companies Act, 1956", "Industrial Policy Resolution of 1956", "Monopolies and Restrictive Trade Practices Act, 1969"],
    correct: "4",
    exptext: "✅ The Competition Act replaced the Monopolies and Restrictive Trade Practices Act of 1969. 📌 Monopoly law gave way to competition law. ❌ The Companies Act of 1956 was a different law about company rules."
  },
  61: {
    type: "concept", icon: "💡", accent: "#0891b2", pauseTimer: true,
    title: "Intellectual Property Rights (IPR)",
    html: `
      <p class="cp-lead">Intellectual property rights protect <u>things created by the human mind</u>, such as inventions, books, brand names and designs. The law lets the creator decide who may use the creation and earn from it.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/32.png" alt="A table-like picture with five icons and labels: Patent (invention), Copyright (book and m" data-caption="The five kinds of intellectual property rights with a simple picture for each." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/33.png" alt="Darjeeling tea garden geographical indication photo" data-caption="A Darjeeling tea garden, a product protected by a geographical indication." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>Each kind of right is protected by its own Act. A patent protects an invention, a copyright protects writing, music and films, a trademark protects a brand name or sign, a geographical indication protects a product linked to a place, and an industrial design protects the shape or pattern of a product.</p>
      <table><thead><tr><th>Type of right</th><th>Governing Act</th><th>Year</th></tr></thead><tbody><tr><td>Patent</td><td>Patent Act</td><td>1970</td></tr><tr><td>Copyright</td><td>Copyright Act</td><td>1957</td></tr><tr><td>Trademark</td><td>Trade Marks Act</td><td>1999</td></tr><tr><td>Geographical Indication</td><td>Geographical Indications of Goods (Registration and Protection) Act</td><td>1999</td></tr><tr><td>Industrial Design</td><td>Designs Act</td><td>2000</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> Only tea grown in the Darjeeling region can be sold under the Darjeeling name. That is a geographical indication. A new medicine formula is protected by a patent for a fixed number of years.</div>
      <div class="cp-note trap">The Trade Marks Act and the Geographical Indications Act are both from 1999. The Designs Act is from 2000, and the Patent Act is from 1970.</div>
      <div class="cp-note exam">Remember the order of years: Copyright 1957, Patent 1970, Trademark 1999, Geographical Indication 1999, Design 2000.</div>
      <div class="cp-mnemonic">57 Copy, 70 Patent, 99 Two marks (Trade and Geography), 2000 Design.</div>
    `
  },
  62: {
    questext: "Which Act governs patents in India?",
    options: ["Copyright Act, 1957", "Trade Marks Act, 1999", "Patent Act, 1970", "Designs Act, 2000"],
    correct: "3",
    exptext: "✅ The Patent Act of 1970 governs patents. 📌 Remember 70 with patents. ❌ The Copyright Act of 1957 protects writing and music, not inventions."
  },
  63: {
    questext: "The Trade Marks Act was passed in which year?",
    options: ["1957", "1970", "2000", "1999"],
    correct: "4",
    exptext: "✅ The Trade Marks Act was passed in 1999. 📌 Trademark and Geographical Indications share the year 1999. ❌ The year 2000 belongs to the Designs Act."
  },
  64: {
    questext: "Which of the following pairs of right and year of its Act is NOT correctly matched?",
    options: ["Copyright and 1957", "Patent and 1970", "Industrial Design and 1999", "Geographical Indication and 1999"],
    correct: "3",
    exptext: "✅ The Designs Act is from 2000, so the pairing with 1999 is wrong. 📌 Design belongs to the year 2000. ❌ The other three pairs are correct."
  },
  65: {
    type: "concept", icon: "💰", accent: "#65a30d", pauseTimer: true,
    title: "Pradhan Mantri Mudra Yojana (MUDRA)",
    html: `
      <p class="cp-lead">The Pradhan Mantri Mudra Yojana gives <u>loans to small businesses that find it hard to get money from banks</u>. The name MUDRA stands for Micro Units Development and Refinance Agency.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/34.png" alt="Four stair steps rising in order: Shishu up to 50,000 rupees, Kishor 50,000 to 5 lakh rupe" data-caption="The loan categories of the scheme, rising by steps with the growth of the business." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/35.png" alt="Narendra Modi launches Mudra Yojana 8 April 2015 photo" data-caption="The Prime Minister launching the Pradhan Mantri Mudra Yojana in New Delhi." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <p>The scheme was launched on 8 April 2015 by Prime Minister Narendra Modi in New Delhi. Its purpose is to give a loan facility to small industries and businesses. The loans are given in three categories named by the stage of the business: Shishu for a baby business, Kishor for a growing one and Tarun for a young, established one. A fourth, higher limit named Tarun Plus was added later.</p>
      <table><thead><tr><th>Category</th><th>Loan amount</th><th>Target</th></tr></thead><tbody><tr><td>Shishu</td><td>Up to ₹50,000</td><td>Early-stage and startup micro businesses</td></tr><tr><td>Kishor</td><td>₹50,000 to ₹5 lakh</td><td>Established businesses that need growth capital</td></tr><tr><td>Tarun</td><td>₹5 lakh to ₹10 lakh</td><td>Larger established businesses</td></tr><tr><td>Tarun Plus</td><td>₹10 lakh to ₹20 lakh</td><td>Introduced in Budget 2024-25 for borrowers who have successfully repaid earlier Tarun loans</td></tr></tbody></table>
      <div class="cp-example"><b>Example:</b> A roadside tea seller who needs ₹40,000 to buy a stove and utensils gets a Shishu loan. A shopkeeper who needs ₹3 lakh to expand the shop gets a Kishor loan.</div>
      <div class="cp-note trap">Shishu, Kishor and Tarun are the three main categories. Tarun Plus is the fourth and higher category introduced in Budget 2024-25. Do not mix up the ranges.</div>
      <div class="cp-note exam">Remember the launch date, 8 April 2015, and the limits 50,000, 5 lakh, 10 lakh and 20 lakh.</div>
      <div class="cp-mnemonic">Shishu = baby, Kishor = teen, Tarun = young adult.</div>
    `
  },
  66: {
    questext: "The Pradhan Mantri Mudra Yojana was launched on",
    options: ["1 April 2014", "8 April 2015", "15 August 2016", "26 January 2015"],
    correct: "2",
    exptext: "✅ The scheme was launched on 8 April 2015. 📌 Remember 8 April and 2015 together. ❌ The other dates are tempting, but they do not match the launch of the scheme."
  },
  67: {
    questext: "Under the Pradhan Mantri Mudra Yojana, a loan of ₹3 lakh falls in which category?",
    options: ["Kishor", "Shishu", "Tarun", "Tarun Plus"],
    correct: "1",
    exptext: "✅ Kishor covers loans from ₹50,000 to ₹5 lakh, so ₹3 lakh falls there. 📌 Match the loan amount to the range. ❌ Tarun starts only above ₹5 lakh."
  },
  68: {
    questext: "What is the loan limit of the Tarun Plus category introduced in Budget 2024-25?",
    options: ["Up to ₹50,000", "₹5 lakh to ₹10 lakh", "₹50,000 to ₹5 lakh", "₹10 lakh to ₹20 lakh"],
    correct: "4",
    exptext: "✅ Tarun Plus gives loans from ₹10 lakh to ₹20 lakh. 📌 It is the top step above Tarun. ❌ The range ₹5 lakh to ₹10 lakh belongs to Tarun."
  },
  69: {
    questext: "What is the full form of MUDRA?",
    options: ["Micro Units Development and Refinance Agency", "Mutual Units Development and Revenue Authority", "Micro Union Development and Rural Assistance", "Medium Units Development and Refinance Agency"],
    correct: "1",
    exptext: "✅ MUDRA stands for Micro Units Development and Refinance Agency. 📌 Micro means small businesses. ❌ The word Medium in option 4 is wrong because the scheme serves micro businesses."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined gear wheel, a small elegant factory with chimneys and a subtle rising chart line" },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/1.png": { t: "fig", about: "A horizontal timeline with six round dots labelled 1948, 1956, 1969, 1973, 1977 and 1991, each dot with a short word under it: Mixed Economy, Economic Constitution, MRTP Act, Core Industry, DIC, New Economic Policy." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Syama Prasad Mukherjee portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/2.png. the Industry Minister who announced the policy of 1948",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/3.png": { t: "fig", about: "A four-row ladder diagram: Category 1 Public sector (3 industries), Category 2 Public-cum-Private (6), Category 3 Controlled Private Sector (18), Category 4 Private and Cooperative (Rest), each row in a different colour." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Chittaranjan Locomotive Works railway engine factory photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/4.png. to show a government-owned railway industry",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/5.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"village handloom weaving khadi charkha India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/5.png. to show a village industry of the kind the committee wanted to promote",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/6.png": { t: "fig", about: "A simple arrow chain: Support to village and small industries, then More jobs in villages, then Fewer gaps between regions, each in a rounded box." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/7.png": { t: "fig", about: "Three stacked boxes: Schedule A (17 industries, only government), Schedule B (12 industries, government and private together), Schedule C (Rest, only private)." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bharat Heavy Electricals Limited plant Bhopal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/8.png. to show a public sector heavy industry",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/9.png": { t: "fig", about: "Three columns with arrows: De-licensing (18 industries down to 5), De-reservation (8 industries down to 2), Foreign Direct Investment (up to 51 percent)." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Manmohan Singh Narasimha Rao 1991 economic reforms photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/10.png. to show the leaders of the 1991 reforms",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/11.png": { t: "fig", about: "A circle split into four labelled parts: Mining, Manufacturing, Electricity, and Water Supply with Sewerage and Waste Management, with a bold centre label IIP and a small label Base Year 2022-23." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"India steel plant factory production line photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/12.png. to show manufacturing, the largest part of industrial output",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/13.png": { t: "fig", about: "A horizontal bar chart of the nine core industries in order of weight: Electricity 30.9, Refinery Products 22.6, Steel 17.6, Crude Oil 7.4, Coal 5.6, Iron Ore 4.9, Cement 4.4, Natural Gas 3.8, Fertilizer 2.7." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"iron ore open cast mine India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/14.png. to show iron ore, the newly added core industry",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/15.png": { t: "fig", about: "A simple pie circle with a large 51 percent part labelled Government capital and a smaller 49 percent part labelled Others." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Coal India Limited headquarters Kolkata photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/16.png. to show a large central public sector company",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/17.png": { t: "fig", about: "A three-step ladder: bottom step Miniratna (about 74 companies), middle step Navratna (26 companies), top step Maharatna (14 companies)." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"NTPC Limited power plant India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/18.png. to show a Maharatna company",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Airports Authority of India Delhi airport terminal photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/19.png. to show a Miniratna company",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/20.png": { t: "fig", about: "Three nested boxes of growing size labelled Micro, Small, Medium, each with its investment and turnover limit from 1 April 2025: Micro 2.5 crore and 10 crore, Small 25 crore and 100 crore, Medium 125 crore and 500 crore." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"small scale industry workshop India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/21.png. to show a small enterprise at work",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/22.png": { t: "fig", about: "A timeline with four dots: 1965 Export Processing Zone at Kandla, April 2000 Special Economic Zone policy, 2005 Special Economic Zones Act, February 2006 Act comes into force." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kandla Special Economic Zone Gujarat photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/23.png. to show the first export processing zone in Asia",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/24.png": { t: "fig", about: "A simple flow: Government owns 100 percent, then sells shares, then Government keeps control (token disinvestment) or Private sector gets control (strategic disinvestment)." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Air India Tata Group handover disinvestment photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/25.png. to show a famous strategic disinvestment",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/26.png": { t: "fig", about: "Three target cards in a row: Card 1 100 million extra jobs by 2022, Card 2 Manufacturing share in gross domestic product from about 16 percent to 25 percent by 2022, Card 3 Manufacturing growth of 12 to 14 percent." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"automobile assembly line factory India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/27.png. to show manufacturing activity",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/28.png": { t: "fig", about: "Three rounded cards joined to a centre circle labelled CSR 2 percent: Education, Reducing hunger and poverty, Protecting the environment." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"company funded school classroom children India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/29.png. to show a CSR education project",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/30.png": { t: "fig", about: "A simple flow in four boxes: MRTP Act 1969, Reforms of 1991, SVS Raghavan Committee May 2000, Competition Act 2002." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Competition Commission of India office New Delhi photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/31.png. to show the body that enforces the competition law",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/32.png": { t: "fig", about: "A table-like picture with five icons and labels: Patent (invention), Copyright (book and music), Trademark (brand name), Geographical Indication (place-linked product), Industrial Design (shape and pattern)." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Darjeeling tea garden geographical indication photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/33.png. to show a product protected by a geographical indication",
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/34.png": { t: "fig", about: "Four stair steps rising in order: Shishu up to 50,000 rupees, Kishor 50,000 to 5 lakh rupees, Tarun 5 to 10 lakh rupees, Tarun Plus 10 to 20 lakh rupees." },
  "images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/35.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Narendra Modi launches Mudra Yojana 8 April 2015 photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India/35.png. to show the launch of the scheme"
});

/* CHANGE LOG
   - Portfolio investment by foreign institutional investors is written as starting in 1992 (the original says 1994).
   - Navratna rule on MoU rating is written as 'Excellent' or 'Very Good' in three of the last five years (the original says three consecutive years).
   - Corporate Social Responsibility limits are written as 'or more' (500 crore, 1,000 crore, 5 crore) because the law says 'or more', not 'more than'.
   - Bharat Sanchar Nigam Limited removed from the Miniratna examples because it is not a profit-making Miniratna company.
   - MSME limits are shown as the old limits and the limits in force from 1 April 2025, so the table reads as current.
   - Tarun Plus is explained as a loan for borrowers who have successfully repaid earlier Tarun loans; MUDRA has three named categories plus Tarun Plus.
   - The count of Maharatna (14), Navratna (26) and Miniratna (about 74) companies was checked against current lists and kept.
   - Index of Industrial Production: the base year is written as 2022-23 (new series from June 2026) with the earlier base year 2011-12 shown alongside; the original gives 2011-12 and three components.
   - Index of Core Industries: written as nine industries with iron ore added and base year 2022-23 (revised series released in July 2026), with the new weights; the original shows eight industries, base year 2011-12 and the old weights.
   - The releasing body of the Index of Industrial Production is written as National Statistics Office, its official name.
   - The Department of Public Enterprises is named without a ministry, because the original ministry name is out of date.
*/