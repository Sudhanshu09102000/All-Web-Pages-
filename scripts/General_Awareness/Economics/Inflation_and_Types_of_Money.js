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

/* Field: General_Awareness · Subject: Economics · Chapter: Inflation_and_Types_of_Money · 17 concept pages (+ overview) · 57 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🎯", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — What We Will Learn Today",
    thumb: {
      image: "images/General_Awareness/Economics/Inflation_and_Types_of_Money/thumbnail.png",
      banner: "COMPETITIVE EXAMS 2026",
      line1: "INFLATION",
      line2: "TYPES OF MONEY",
      line3: "M0 TO M4",
      badge: "FULL CLASS",
      ribbon: "TABLES • TRICKS • PRACTICE",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "Inflation and Types of Money Complete Chapter | CPI, WPI, Phillips Curve, M0-M4 | SSC CGL",
      altTitles: ["Stagflation, Reflation and Disinflation Made Easy", "M0 M1 M2 M3 M4 Money Supply and Money Multiplier in One Class"],
      description: "Inflation and Money are two of the most scoring topics in Economics. In this class you learn how prices move, how inflation is measured and what kinds of money exist, step by step and in simple words.\n\n📌 IN THIS CLASS\n✅ Inflation, deflation, stagflation, reflation, disinflation\n✅ Phillips Curve and types of inflation by rate\n✅ Cost-push and demand-pull inflation\n✅ CPI, WPI and GDP deflator\n✅ Types of money and money supply M0 to M4\n✅ Practice questions\n\n⏱️ CHAPTERS\n00:00 Class overview\n00:00 Inflation\n00:00 Types of money\n\n👍 Like, share, subscribe.\n\n#SSCCGL #Inflation #Economy",
      tags: ["inflation", "inflation for ssc cgl", "types of inflation", "deflation", "stagflation", "reflation", "disinflation", "skewflation", "phillips curve", "creeping inflation", "hyperinflation", "headline inflation", "core inflation", "cost push inflation", "demand pull inflation", "cpi", "wpi", "gdp deflator", "fisher quantity theory", "types of money", "legal tender", "token money", "near money", "hot money", "money supply", "m0 m1 m2 m3 m4", "money multiplier", "economics for ssc", "ssc cgl economics", "general awareness", "indian economy gk", "lation and Typ"],
      hashtags: ["SSCCGL", "Inflation", "Economy"],
      thumbText: "INFLATION AND TYPES OF MONEY",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📊 New class is live: Inflation and Types of Money, from the Phillips Curve to M0-M4. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview\n00:00 Inflation and deflation\n00:00 Phillips Curve\n00:00 Types of inflation\n00:00 Inflation indicators\n00:00 Types of money\n00:00 Money supply",
      playlist: "Economics — Fast Track Classes"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class on Inflation and on Types of Money</u>: how prices rise and fall, how inflation is measured, and the different kinds of money and money supply. These topics are asked in almost every General Awareness paper, so we will learn them slowly and clearly.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>17</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>57</b><span>Questions</span></div>
        <div class="cp-stat"><b>~91 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>Inflation and Deflation</b><br>What it means when prices rise or fall continuously, and which policy helps in each case.</li>
        <li><b>Special Forms of Inflation</b><br>Skewflation, stagflation, reflation and disinflation, each with a simple example.</li>
        <li><b>Phillips Curve</b><br>The short-run link between inflation and unemployment, and the exception of stagflation.</li>
        <li><b>Types of Inflation Based on Inflation Rate</b><br>Creeping, walking, running, galloping and hyper inflation, in order of speed.</li>
        <li><b>Headline Inflation, Core Inflation and Causes</b><br>Headline and core inflation, and the two big causes: cost-push and demand-pull.</li>
        <li><b>Indicators of Inflation in Economy</b><br>The Consumer Price Index, the Wholesale Price Index and the Gross Domestic Product deflator, with their base years and publishers.</li>
        <li><b>Fisher's Quantity Theory of Money</b><br>Why more money supply can lead to higher prices.</li>
        <li><b>Types of Money</b><br>Legal tender, token money, credit money, plastic money, hot money, near money and more.</li>
        <li><b>Measurement of Money Supply in India</b><br>The measures M0 to M4, their liquidity order and the money multiplier.</li>
        <li><b>Practice</b><br>Exam style questions after every topic, each with a short explanation in plain words.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions on the Phillips Curve, the inflation ladder, the Consumer Price Index and Wholesale Price Index, and the money supply measures come again and again in General Awareness papers, so every table in this class is worth remembering.</div>
    `
  },
  2: {
    type: "concept", icon: "📈", accent: "#0ea5e9", pauseTimer: true,
    title: "Inflation and Deflation",
    html: `
      <p class="cp-lead">Inflation is a continuous rise in the general price level of goods and services in an economy. <u>Deflation is the opposite: a continuous fall in the general price level.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/1.png" alt="Two panels: left panel Inflation with a price tag arrow going up and the label Purchasing " data-caption="Rising prices in inflation and falling prices in deflation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/2.png" alt="Vegetable market prices rise shopper India photo" data-caption="Shoppers feel inflation when everyday goods become costlier." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Concept</th><th>Price movement</th><th>Broad meaning</th><th>Possible effect</th></tr></thead><tbody><tr><td>Inflation</td><td>Prices rise continuously</td><td>Purchasing power of money falls</td><td>Cost of living increases, and savers and fixed-income groups may suffer</td></tr><tr><td>Deflation</td><td>Prices fall continuously</td><td>Value of money rises but demand may fall</td><td>Firms may cut output, investment and jobs</td></tr></tbody></table>
      <p class="cp-lead">When prices rise, the same rupee buys fewer things. When prices fall, the same rupee buys more, but shops sell less and may reduce production and jobs.</p>
      <p class="cp-lead">A little inflation is normal, but inflation above a comfortable level makes living costly. Deflation can reduce production, demand and employment.</p>
      <table><thead><tr><th>Problem</th><th>What policy usually does</th></tr></thead><tbody><tr><td>High inflation</td><td>The Reserve Bank of India and the government try to reduce demand pressure and control the money supply</td></tr><tr><td>Deflation or recession-like weakness</td><td>Policy tries to increase spending, credit and investment to revive demand</td></tr></tbody></table>
      <div class="cp-note trap">Do not confuse deflation with disinflation. In disinflation, prices are still rising, but the rate of rise becomes slower.</div>
      <div class="cp-note exam">Inflation means prices are rising, and deflation means prices are falling. The correct policy depends on the problem: cooling measures for high inflation and demand support for deflation.</div>
    `
  },
  3: {
    questext: "Which of the following best defines inflation?",
    options: ["A continuous rise in the general price level", "A continuous fall in the general price level", "A one-time rise in the price of one product", "A fall in the value of shares"],
    correct: "1",
    exptext: "✅ Inflation is a continuous rise in the general price level of goods and services. 📌 Inflation means up. ❌ A continuous fall in prices is wrong because that is deflation."
  },
  4: {
    questext: "What happens to the purchasing power of money during inflation?",
    options: ["It rises", "It stays the same", "It falls", "It becomes zero"],
    correct: "3",
    exptext: "✅ Purchasing power falls, because the same money buys fewer goods. 📌 Prices up means money power down. ❌ It rises is wrong because that happens in deflation."
  },
  5: {
    questext: "Which policy approach is usually suitable when inflation is very high?",
    options: ["Reduce demand pressure and control money supply", "Increase spending and credit", "Cut taxes on all goods", "Print more currency"],
    correct: "1",
    exptext: "✅ High inflation needs cooling measures that reduce demand and control the money supply. 📌 Hot prices need cooling. ❌ Increasing spending and credit is wrong because that suits deflation and slowdown."
  },
  6: {
    questext: "Consider the following statements:\n1. Deflation is a continuous fall in the general price level.\n2. In deflation, firms always increase output and jobs.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Deflation hurts production. ❌ Statement 2 is wrong because deflation may force firms to cut output, investment and jobs."
  },
  7: {
    type: "concept", icon: "🧪", accent: "#22c55e", pauseTimer: true,
    title: "Special Forms of Inflation",
    html: `
      <p class="cp-lead">Inflation is not always the same. <u>Four special forms are skewflation, stagflation, reflation and disinflation.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/3.png" alt="Four cards in a row: Skewflation (fruit up, clothes down), Stagflation (prices up, jobs we" data-caption="Four special forms of inflation on four cards." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/4.png" alt="Fruit seller market stall photo India" data-caption="Fruit prices can rise because of off-season shortage." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Meaning</th><th>Simple example</th><th>Important point</th></tr></thead><tbody><tr><td>Skewflation</td><td>Some goods and services become costlier while others become cheaper at the same time</td><td>Fruit prices rise because of off-season shortage while clothing prices fall during a sale</td><td>The rise is uneven or sector-specific, not a uniform rise in all prices</td></tr><tr><td>Stagflation</td><td>Inflation and economic stagnation occur together</td><td>Prices rise, but production and employment remain weak</td><td>It is difficult because inflation and unemployment both become concerns</td></tr><tr><td>Reflation</td><td>A deliberate policy effort to revive demand after deflation or slowdown</td><td>Lower interest rates or higher government spending</td><td>Used to prevent excessive slowdown</td></tr><tr><td>Disinflation</td><td>A reduction in the inflation rate</td><td>Inflation falls from 8 percent to 5 percent</td><td>Prices still rise, but at a slower speed</td></tr></tbody></table>
      <p class="cp-lead">Notice that disinflation is not a fall in prices. It is only a fall in the speed of price rise, so prices keep rising but more slowly.</p>
      <div class="cp-note trap">Disinflation and deflation are different. Deflation means prices fall, while disinflation means prices rise more slowly.</div>
      <div class="cp-note remember">Stagflation is stagnation plus inflation. Reflation means refilling demand.</div>
    `
  },
  8: {
    questext: "Inflation falls from 8 percent to 5 percent. This situation is called which of the following?",
    options: ["Deflation", "Stagflation", "Disinflation", "Reflation"],
    correct: "3",
    exptext: "✅ A fall in the inflation rate, while prices still rise, is called disinflation. 📌 Dis means a lower rate. ❌ Deflation is wrong because prices are still rising."
  },
  9: {
    questext: "Which term describes inflation and economic stagnation occurring together?",
    options: ["Stagflation", "Skewflation", "Reflation", "Disinflation"],
    correct: "1",
    exptext: "✅ Stagflation is the combination of inflation and economic stagnation. 📌 Stagnation plus inflation gives stagflation. ❌ Skewflation is wrong because it means an uneven price rise."
  },
  10: {
    questext: "Fruit prices rise because of an off-season shortage while clothing prices fall during a sale. This is an example of which of the following?",
    options: ["Reflation", "Stagflation", "Disinflation", "Skewflation"],
    correct: "4",
    exptext: "✅ When some prices rise and others fall at the same time, it is skewflation. 📌 Skew means uneven. ❌ Stagflation is wrong because it has weak production and jobs along with rising prices."
  },
  11: {
    questext: "Reflation means which of the following?",
    options: ["A deliberate policy effort to revive demand after deflation or slowdown", "A fall in the inflation rate", "A rise in unemployment", "A very fast rise in prices"],
    correct: "1",
    exptext: "✅ Reflation is a deliberate policy effort to revive demand after deflation or a slowdown. 📌 Re means again, so demand is filled again. ❌ A fall in the inflation rate is wrong because that is disinflation."
  },
  12: {
    type: "concept", icon: "⛓️", accent: "#f59e0b", pauseTimer: true,
    title: "Stagflation Chain",
    html: `
      <p class="cp-lead">Stagflation is a difficult situation because several problems arrive together. <u>Growth is weak, unemployment is high, and yet prices keep rising.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/5.png" alt="Three linked boxes in a chain: GDP growth zero or negative, then Unemployment rises, then " data-caption="The three links in the chain of stagflation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/6.png" alt="Balance picture: left weight labelled Weak growth and jobs, right weight labelled High pri" data-caption="In stagflation, weak growth and high prices occur together." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Step</th><th>What happens</th></tr></thead><tbody><tr><td>First</td><td>Growth of the Gross Domestic Product becomes zero or negative</td></tr><tr><td>Second</td><td>Unemployment tends to rise, because production and demand are weak</td></tr><tr><td>Third</td><td>Prices continue to increase, because of supply-side or cost-side pressure</td></tr></tbody></table>
      <p class="cp-lead">Normally, weak demand pulls prices down. In stagflation, prices still rise because costs of production go up, for example when raw materials or fuel become costlier.</p>
      <div class="cp-note trap">Stagflation is not caused by too much demand. It is caused mainly by supply-side or cost-side pressure while demand stays weak.</div>
      <div class="cp-note remember">Weak growth, high unemployment, and still rising prices.</div>
    `
  },
  13: {
    questext: "Which of the following is a feature of stagflation?",
    options: ["High growth and falling prices", "Zero or negative growth, rising unemployment and rising prices", "High growth and high employment", "Falling prices and falling unemployment"],
    correct: "2",
    exptext: "✅ In stagflation growth is zero or negative, unemployment rises and prices keep rising. 📌 Everything is bad together. ❌ Falling prices is wrong because stagflation has rising prices."
  },
  14: {
    questext: "Prices keep rising in stagflation mainly because of which of the following?",
    options: ["Excess demand", "Supply-side or cost-side pressure", "A fall in the money supply", "A fall in taxes"],
    correct: "2",
    exptext: "✅ Prices keep rising because of supply-side or cost-side pressure. 📌 Costs push prices even when demand is weak. ❌ Excess demand is wrong because demand is weak in stagflation."
  },
  15: {
    type: "concept", icon: "📉", accent: "#ef4444", pauseTimer: true,
    title: "Phillips Curve",
    html: `
      <p class="cp-lead">The Phillips Curve shows an inverse relationship between inflation and unemployment in the short run. <u>When one goes up, the other usually goes down.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/7.png" alt="Downward sloping curve with Unemployment rate on the horizontal axis (3 and 5) and Inflati" data-caption="The Phillips Curve slopes downward from left to right." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/8.png" alt="Three-row comparison picture: Boom-like situation (demand high, unemployment low, inflatio" data-caption="Three situations that explain the Phillips Curve." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Situation</th><th>Demand</th><th>Employment</th><th>Unemployment</th><th>Inflation pressure</th></tr></thead><tbody><tr><td>Boom-like situation</td><td>High</td><td>High</td><td>Low</td><td>High</td></tr><tr><td>Slowdown-like situation</td><td>Low</td><td>Low</td><td>High</td><td>Low</td></tr><tr><td>Stagflation exception</td><td>Weak</td><td>Weak</td><td>High</td><td>High, due to supply or cost factors</td></tr></tbody></table>
      <p class="cp-lead">When demand rises, firms produce more and give more jobs, so unemployment falls, but prices may increase. When unemployment is high, demand is weak, so the pressure on prices is lower.</p>
      <div class="cp-note trap">The inverse relationship is true only in the short run. In stagflation both inflation and unemployment are high, which is an exception to the curve.</div>
      <div class="cp-note remember">High inflation goes with low unemployment, and low inflation goes with high unemployment.</div>
    `
  },
  16: {
    questext: "The Phillips Curve shows the relationship between which two variables?",
    options: ["Inflation and unemployment", "Savings and investment", "Exports and imports", "Taxes and spending"],
    correct: "1",
    exptext: "✅ The Phillips Curve shows the relationship between inflation and unemployment. 📌 Phillips means inflation and jobs. ❌ Savings and investment is wrong because that is not what the curve measures."
  },
  17: {
    questext: "The Phillips Curve shows which kind of relationship in the short run?",
    options: ["A direct relationship", "No relationship", "An inverse relationship", "A fixed relationship"],
    correct: "3",
    exptext: "✅ The relationship is inverse in the short run. 📌 One up means the other down. ❌ A direct relationship is wrong because both do not rise together on the curve."
  },
  18: {
    questext: "Which situation is an exception to the Phillips Curve?",
    options: ["A boom", "A slowdown", "Normal growth", "Stagflation"],
    correct: "4",
    exptext: "✅ In stagflation, both unemployment and inflation are high, which breaks the inverse link. 📌 Stag breaks the curve. ❌ A boom is wrong because it follows the curve with low unemployment and high inflation."
  },
  19: {
    questext: "Consider the following statements about the Phillips Curve:\n1. High inflation is linked with low unemployment on the curve.\n2. The inverse relationship is true for the long run only.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 The curve is a short run idea. ❌ Statement 2 is wrong because the inverse relationship is shown for the short run."
  },
  20: {
    type: "concept", icon: "🪜", accent: "#8b5cf6", pauseTimer: true,
    title: "Types of Inflation Based on Inflation Rate",
    html: `
      <p class="cp-lead">Inflation can be classified by how fast prices rise. <u>The five types are creeping, walking, running, galloping and hyper inflation.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/9.png" alt="Five-step staircase going up with labels Creeping 0 to 3, Walking 3 to 10, Running 10 to 2" data-caption="The inflation ladder from the slowest to the fastest type." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/10.png" alt="Zimbabwe 100 trillion dollar banknote hyperinflation photo" data-caption="A Zimbabwe banknote from a period of hyperinflation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type</th><th>Approximate inflation rate</th><th>Nature</th><th>Economic significance</th></tr></thead><tbody><tr><td>Creeping inflation</td><td>0 to 3 percent</td><td>Very slow rise in prices</td><td>Common in developed economies and generally manageable</td></tr><tr><td>Walking inflation</td><td>3 to 10 percent</td><td>Moderate but noticeable rise</td><td>Commonly seen in many developing and less developed economies</td></tr><tr><td>Running inflation</td><td>10 to 20 percent</td><td>Fast increase in prices</td><td>Creates pressure on household budgets and economic planning</td></tr><tr><td>Galloping or Jumping inflation</td><td>20 to 100 percent</td><td>Very rapid price rise</td><td>Damages saving, purchasing power and confidence</td></tr><tr><td>Hyperinflation</td><td>More than 100 percent</td><td>Extremely uncontrollable price rise</td><td>Currency value collapses and normal economic activity becomes difficult</td></tr></tbody></table>
      <p class="cp-lead">The names show the speed. A creeping animal is slow, a walker is a bit faster, a runner is fast, a galloping horse is very fast, and hyper means out of control.</p>
      <div class="cp-note remember">Creeping, Walking, Running, Galloping, Hyper. As we move up, the speed and danger of price rise increase.</div>
      <div class="cp-note trap">Hyperinflation is the most severe form and is often linked with extreme monetary or political instability.</div>
    `
  },
  21: {
    questext: "Which type of inflation has an approximate rate of 3 to 10 percent?",
    options: ["Creeping inflation", "Walking inflation", "Running inflation", "Galloping inflation"],
    correct: "2",
    exptext: "✅ Walking inflation is the 3 to 10 percent band. 📌 A walker is faster than a creeper. ❌ Creeping inflation is wrong because it is the 0 to 3 percent band."
  },
  22: {
    questext: "Which type of inflation is the most severe, with a rate of more than 100 percent?",
    options: ["Running inflation", "Galloping inflation", "Creeping inflation", "Hyperinflation"],
    correct: "4",
    exptext: "✅ Hyperinflation is the most severe form, with a rate above 100 percent. 📌 Hyper means out of control. ❌ Galloping inflation is tempting, but it covers only 20 to 100 percent."
  },
  23: {
    questext: "Which of the following correctly shows the order from the slowest to the fastest inflation?",
    options: ["Creeping, Walking, Running, Galloping, Hyper", "Walking, Creeping, Running, Galloping, Hyper", "Creeping, Running, Walking, Hyper, Galloping", "Hyper, Galloping, Running, Walking, Creeping"],
    correct: "1",
    exptext: "✅ The ladder is Creeping, Walking, Running, Galloping and Hyper. 📌 Speed rises step by step. ❌ Option 4 is the reverse order, from fastest to slowest."
  },
  24: {
    questext: "Running inflation has an approximate rate of which of the following?",
    options: ["0 to 3 percent", "3 to 10 percent", "10 to 20 percent", "20 to 100 percent"],
    correct: "3",
    exptext: "✅ Running inflation is the 10 to 20 percent band. 📌 Running is a fast pace. ❌ 20 to 100 percent is wrong because that is galloping inflation."
  },
  25: {
    type: "concept", icon: "📰", accent: "#14b8a6", pauseTimer: true,
    title: "Headline Inflation, Core Inflation and Causes",
    html: `
      <p class="cp-lead">Inflation can be seen in different ways. <u>Headline inflation is the full picture, while core inflation leaves out food and fuel.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/11.png" alt="Two circles: a big circle labelled Headline Inflation (whole price index) and a smaller in" data-caption="Core inflation is headline inflation without food and fuel." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/12.png" alt="Two arrows pointing to a price tag: left arrow Cost-push (production cost rises), right ar" data-caption="Two main causes that push prices upward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Concept</th><th>Coverage</th><th>Why it matters</th></tr></thead><tbody><tr><td>Headline inflation</td><td>Overall inflation measured on the basis of the whole price index</td><td>It reflects the broad inflation experience of the economy</td></tr><tr><td>Core inflation</td><td>Inflation after excluding food and fuel items</td><td>Food and fuel prices are volatile, so core inflation helps identify underlying price pressure</td></tr><tr><td>Cost-push inflation</td><td>Inflation caused by a rise in production cost</td><td>Higher wages, raw material cost, taxes or fuel cost can raise final prices</td></tr><tr><td>Demand-pull inflation</td><td>Inflation caused by excess demand</td><td>When demand is greater than supply, sellers may raise prices</td></tr><tr><td>Shrinkflation or hidden inflation</td><td>Quantity or quality falls while the price remains the same or rises silently</td><td>Consumers pay the same or more for less quantity or lower quality</td></tr></tbody></table>
      <p class="cp-lead">Food and fuel prices jump up and down quickly because of weather and global events. Core inflation removes them to show the steady, long-term price pressure.</p>
      <div class="cp-example"><b>Example:</b> A biscuit packet costs the same as last year, but the company has reduced the weight from 100 grams to 90 grams. The price looks unchanged, but this is shrinkflation.</div>
      <div class="cp-note trap">Core inflation does not include food and fuel. If a question says inflation after excluding food and fuel, the answer is core inflation.</div>
    `
  },
  26: {
    questext: "Inflation measured after excluding food and fuel items is called which of the following?",
    options: ["Headline inflation", "Core inflation", "Cost-push inflation", "Demand-pull inflation"],
    correct: "2",
    exptext: "✅ Core inflation excludes food and fuel prices. 📌 Core means the steady centre. ❌ Headline inflation is wrong because it covers the whole price index, including food and fuel."
  },
  27: {
    questext: "Inflation caused by a rise in the cost of production is called which of the following?",
    options: ["Demand-pull inflation", "Core inflation", "Cost-push inflation", "Headline inflation"],
    correct: "3",
    exptext: "✅ A rise in the cost of production pushes prices up, which is cost-push inflation. 📌 Cost pushes. ❌ Demand-pull inflation is wrong because it comes from excess demand."
  },
  28: {
    questext: "A company reduces the quantity in a packet but keeps the price the same. This is called which of the following?",
    options: ["Skewflation", "Reflation", "Disinflation", "Shrinkflation"],
    correct: "4",
    exptext: "✅ When quantity or quality falls while the price stays the same, it is shrinkflation. 📌 Shrink means smaller pack. ❌ Disinflation is wrong because it means a slower rise in prices."
  },
  29: {
    type: "concept", icon: "🏭", accent: "#ec4899", pauseTimer: true,
    title: "Causes of Cost-push Inflation",
    html: `
      <p class="cp-lead">Cost-push inflation starts on the supply side. <u>When it costs more to make goods, sellers raise the price of final goods.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/13.png" alt="Flow diagram: Rising costs boxes (labour, raw material, machinery, tax, capital, electrici" data-caption="How higher input costs push final prices upward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/14.png" alt="Factory workers production line India photo" data-caption="A rise in factory costs can push up the price of goods." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Cause</th><th>Example</th></tr></thead><tbody><tr><td>Labour cost</td><td>Higher wages paid to workers</td></tr><tr><td>Raw material cost</td><td>Costlier steel, cotton or crude oil</td></tr><tr><td>Machinery and capital cost</td><td>Costlier machines and higher interest on loans</td></tr><tr><td>Tax</td><td>Higher tax on inputs</td></tr><tr><td>Electricity cost</td><td>Costlier power for the factory</td></tr></tbody></table>
      <p class="cp-lead">A rise in input prices pushes the price of final goods upward. Supply-side shocks can create inflation even when demand is not very strong.</p>
      <div class="cp-note exam">Remember the word push: costs push prices up from the supply side.</div>
      <div class="cp-note trap">Cost-push inflation can happen even in a weak economy, which is why it is linked with stagflation.</div>
    `
  },
  30: {
    questext: "Which of the following is a cause of cost-push inflation?",
    options: ["Excess demand", "Easy credit", "Rise in raw material cost", "Increase in consumer income"],
    correct: "3",
    exptext: "✅ A rise in raw material cost raises the cost of production, which causes cost-push inflation. 📌 Cost-push starts with costs. ❌ Excess demand, easy credit and higher income are causes of demand-pull inflation."
  },
  31: {
    questext: "Cost-push inflation can occur even when demand is not very strong because of which of the following?",
    options: ["Supply-side shocks", "Excess money supply", "Increase in government spending", "Strong consumer demand"],
    correct: "1",
    exptext: "✅ Supply-side shocks raise costs and prices even when demand is weak. 📌 Cost-push comes from the supply side. ❌ The other options are wrong because they are linked with strong demand."
  },
  32: {
    type: "concept", icon: "🛍️", accent: "#f97316", pauseTimer: true,
    title: "Causes of Demand-pull Inflation",
    html: `
      <p class="cp-lead">Demand-pull inflation starts on the demand side. <u>It is often described as too much money chasing too few goods.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/15.png" alt="Seesaw picture: a heavy left side labelled Demand (many buyers with money) and a light rig" data-caption="When demand is greater than supply, prices are pulled upward." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/16.png" alt="Crowded shopping mall festival season India photo" data-caption="Strong demand during festivals can pull prices up." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Cause</th><th>Meaning</th></tr></thead><tbody><tr><td>Excess demand</td><td>Demand for goods and services is more than the available supply</td></tr><tr><td>High income</td><td>People have more money to spend</td></tr><tr><td>Easy credit</td><td>Loans are easily available, so people spend more</td></tr><tr><td>Increased government spending</td><td>The government spends more, which raises demand</td></tr><tr><td>Strong consumer demand</td><td>Buyers want more goods than the market can supply</td></tr></tbody></table>
      <p class="cp-lead">When sellers see that buyers are ready to pay more, they raise their prices. So the demand pulls prices upward.</p>
      <div class="cp-note remember">Too much money chasing too few goods.</div>
      <div class="cp-note trap">Do not mix the two causes. Demand-pull comes from the demand side, and cost-push comes from the supply side.</div>
    `
  },
  33: {
    questext: "Which of the following is a cause of demand-pull inflation?",
    options: ["Rise in wages", "Rise in raw material cost", "Increase in electricity cost", "Easy credit"],
    correct: "4",
    exptext: "✅ Easy credit raises spending and demand, which causes demand-pull inflation. 📌 More money to spend means higher demand. ❌ Wages, raw materials and electricity are cost-push causes."
  },
  34: {
    questext: "Which statement is often used to describe demand-pull inflation?",
    options: ["Too few goods chasing too much money", "Too much money chasing too few goods", "Costs chasing profits", "Taxes chasing incomes"],
    correct: "2",
    exptext: "✅ Demand-pull inflation is described as too much money chasing too few goods. 📌 Money is more, goods are fewer. ❌ Too few goods chasing too much money is tempting, but it reverses the order of the phrase."
  },
  35: {
    questext: "Consider the following statements:\n1. Demand-pull inflation is caused by excess demand.\n2. Cost-push inflation is caused by excess demand.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Both 1 and 2", "Neither 1 nor 2", "Only 1"],
    correct: "4",
    exptext: "✅ Only statement 1 is correct. 📌 Demand pulls, cost pushes. ❌ Statement 2 is wrong because cost-push inflation is caused by a rise in production cost."
  },
  36: {
    type: "concept", icon: "📏", accent: "#84cc16", pauseTimer: true,
    title: "Indicators of Inflation in Economy",
    html: `
      <p class="cp-lead">Inflation is measured with price indexes. <u>The three main indicators are the Consumer Price Index, the Wholesale Price Index and the Gross Domestic Product deflator.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/17.png" alt="Three boxes: CPI shop and consumer icon labelled Retail prices goods and services; WPI war" data-caption="Three inflation indicators and what each one covers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/18.png" alt="Retail shop customer billing grocery store India photo" data-caption="Retail prices paid by consumers are measured by the Consumer Price Index." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Indicator</th><th>Meaning</th><th>Coverage</th><th>Compiled by</th><th>Key use</th></tr></thead><tbody><tr><td>Consumer Price Index (CPI)</td><td>Index of retail prices paid by consumers</td><td>Goods and services; present base year 2024, earlier base year 2011-12</td><td>National Statistical Office under the Ministry of Statistics and Programme Implementation</td><td>Measures retail inflation faced by consumers</td></tr><tr><td>Wholesale Price Index (WPI)</td><td>Index of wholesale prices</td><td>Only goods; present base year 2022-23, earlier base year 2011-12</td><td>Office of the Economic Adviser, Department for Promotion of Industry and Internal Trade, Ministry of Commerce and Industry</td><td>Measures wholesale price movement</td></tr><tr><td>Gross Domestic Product deflator</td><td>Ratio of nominal Gross Domestic Product to real Gross Domestic Product, multiplied by 100</td><td>Prices of all final goods and services in Gross Domestic Product</td><td>Derived from national income data</td><td>The broadest measure of price changes in the economy</td></tr></tbody></table>
      <p class="cp-lead">The Consumer Price Index follows what an ordinary family pays in shops, so it covers both goods and services. The Wholesale Price Index follows prices at the wholesale stage, so it covers goods only.</p>
      <div class="cp-note trap">The Wholesale Price Index has no services, while the Consumer Price Index has both goods and services.</div>
      <div class="cp-note exam">Remember who compiles them: the National Statistical Office for the Consumer Price Index, and the Office of the Economic Adviser for the Wholesale Price Index.</div>
    `
  },
  37: {
    questext: "Which index measures retail inflation faced by consumers?",
    options: ["Wholesale Price Index", "Consumer Price Index", "Gross Domestic Product deflator", "Index of Industrial Production"],
    correct: "2",
    exptext: "✅ The Consumer Price Index measures retail inflation faced by consumers. 📌 Consumer means retail. ❌ The Wholesale Price Index is wrong because it measures prices at the wholesale stage."
  },
  38: {
    questext: "Which of the following includes only goods and no services?",
    options: ["Consumer Price Index", "Gross Domestic Product deflator", "Wholesale Price Index", "All of them include services"],
    correct: "3",
    exptext: "✅ The Wholesale Price Index includes only goods. 📌 Wholesale means goods only. ❌ The Consumer Price Index is wrong because it includes both goods and services."
  },
  39: {
    questext: "Who compiles the Wholesale Price Index?",
    options: ["National Statistical Office", "Labour Bureau", "Reserve Bank of India", "Office of the Economic Adviser, Ministry of Commerce and Industry"],
    correct: "4",
    exptext: "✅ The Office of the Economic Adviser in the Ministry of Commerce and Industry compiles the Wholesale Price Index. 📌 Commerce handles wholesale. ❌ The National Statistical Office compiles the Consumer Price Index."
  },
  40: {
    questext: "Which is the broadest measure of price changes in the economy?",
    options: ["Consumer Price Index", "Wholesale Price Index", "Gross Domestic Product deflator", "Core inflation"],
    correct: "3",
    exptext: "✅ The Gross Domestic Product deflator covers all final goods and services, so it is the broadest. 📌 Whole economy means widest. ❌ The Consumer Price Index is wrong because it covers only a basket of consumer items."
  },
  41: {
    type: "concept", icon: "🗂️", accent: "#06b6d4", pauseTimer: true,
    title: "CPI Categories",
    html: `
      <p class="cp-lead">The Consumer Price Index has more than one form. <u>Each form is made for a different group of people and is released by a different body.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/19.png" alt="Four boxes: CPI Combined (rural plus urban, National Statistical Office), CPI-IW (industri" data-caption="Four forms of the Consumer Price Index and their publishers." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/20.png" alt="Formula picture: GDP Deflator equals Nominal GDP at market price divided by Real GDP at ba" data-caption="The formula of the Gross Domestic Product deflator." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>CPI category</th><th>Used for</th><th>Released by</th></tr></thead><tbody><tr><td>CPI Combined</td><td>Rural and urban inflation measurement</td><td>National Statistical Office</td></tr><tr><td>CPI-IW</td><td>Industrial workers</td><td>Labour Bureau</td></tr><tr><td>CPI-RL</td><td>Rural labourers</td><td>Labour Bureau</td></tr><tr><td>CPI-AL</td><td>Agricultural labourers</td><td>Labour Bureau</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>GDP Deflator</small>GDP Deflator = (Nominal GDP ÷ Real GDP) × 100</div>
      <p class="cp-lead">Nominal Gross Domestic Product is measured at current market prices, while real Gross Domestic Product is measured at base-year prices. Since the deflator covers the whole Gross Domestic Product basket, it is broader than the Consumer Price Index and the Wholesale Price Index.</p>
      <div class="cp-note remember">Only CPI Combined comes from the National Statistical Office. The other three are from the Labour Bureau.</div>
    `
  },
  42: {
    questext: "The Consumer Price Index for Industrial Workers (CPI-IW) is released by which body?",
    options: ["National Statistical Office", "Labour Bureau", "Reserve Bank of India", "Office of the Economic Adviser"],
    correct: "2",
    exptext: "✅ The Labour Bureau releases CPI-IW. 📌 Workers' indexes come from the Labour Bureau. ❌ The National Statistical Office releases only the combined index."
  },
  43: {
    questext: "Which Consumer Price Index category measures rural and urban inflation together?",
    options: ["CPI-IW", "CPI-RL", "CPI-AL", "CPI Combined"],
    correct: "4",
    exptext: "✅ CPI Combined measures rural and urban inflation together. 📌 Combined means both areas. ❌ CPI-RL is wrong because it is only for rural labourers."
  },
  44: {
    questext: "The Gross Domestic Product deflator is calculated as which of the following?",
    options: ["Real Gross Domestic Product divided by nominal Gross Domestic Product, multiplied by 100", "Nominal Gross Domestic Product divided by real Gross Domestic Product, multiplied by 100", "Nominal Gross Domestic Product minus real Gross Domestic Product", "Real Gross Domestic Product multiplied by nominal Gross Domestic Product"],
    correct: "2",
    exptext: "✅ The deflator is nominal Gross Domestic Product divided by real Gross Domestic Product, multiplied by 100. 📌 Nominal on top. ❌ Real divided by nominal is wrong because it reverses the ratio."
  },
  45: {
    type: "concept", icon: "💱", accent: "#a855f7", pauseTimer: true,
    title: "Fisher's Quantity Theory of Money",
    html: `
      <p class="cp-lead">Fisher's Quantity Theory of Money links the money supply with the price level. <u>Its main idea is: more money supply means more inflation.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/21.png" alt="Formula picture: M V = P T with labels M Money supply, V Velocity of money, P Price level," data-caption="The four parts of Fisher's equation MV = PT." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/22.png" alt="Balance picture: left pan Money supply up with an arrow, right pan Price level up with an " data-caption="If velocity and transactions stay constant, more money raises prices." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-formula" translate="no"><small>Fisher's equation</small>MV = PT</div>
      <table><thead><tr><th>Letter</th><th>Meaning</th></tr></thead><tbody><tr><td>M</td><td>Money supply</td></tr><tr><td>V</td><td>Velocity of money, that is, how fast money changes hands</td></tr><tr><td>P</td><td>Price level</td></tr><tr><td>T</td><td>Volume of transactions</td></tr></tbody></table>
      <p class="cp-lead">If V and T remain constant, an increase in money supply (M) leads to an increase in the price level (P). So more money supply means more inflation.</p>
      <div class="cp-example"><b>Example:</b> If the number of goods in a village stays the same but everyone suddenly gets double the money, sellers will ask higher prices, because more money is chasing the same goods.</div>
      <div class="cp-note trap">The theory works as described only when V and T are constant. If they change, the link may change.</div>
    `
  },
  46: {
    questext: "In Fisher's equation MV = PT, what does V stand for?",
    options: ["Value of goods", "Velocity of money", "Volume of money", "Variation of price"],
    correct: "2",
    exptext: "✅ V stands for the velocity of money. 📌 M is money, V is velocity, P is price, T is transactions. ❌ Volume of money is wrong because that is not part of the equation."
  },
  47: {
    questext: "According to Fisher's Quantity Theory, if V and T are constant, an increase in money supply leads to which of the following?",
    options: ["A fall in the price level", "No change in the price level", "A rise in the price level", "A fall in transactions"],
    correct: "3",
    exptext: "✅ More money supply raises the price level when V and T are constant. 📌 More money means more inflation. ❌ A fall in the price level is wrong because that is the opposite result."
  },
  48: {
    questext: "In Fisher's equation, T stands for which of the following?",
    options: ["Tax rate", "Time", "Total money", "Volume of transactions"],
    correct: "4",
    exptext: "✅ T stands for the volume of transactions. 📌 P and T are on the right side. ❌ Tax rate is wrong because taxes are not part of this equation."
  },
  49: {
    type: "concept", icon: "💵", accent: "#e11d48", pauseTimer: true,
    title: "Types of Money",
    html: `
      <p class="cp-lead">Money has many types, and each type has its own meaning. <u>This page covers six types: accounting money, legal tender, optional money, token money, standard money and plastic money.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/23.png" alt="Six small cards in two rows: Accounting money (rupee, dollar), Legal tender (notes and coi" data-caption="Six types of money, each with a simple icon." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/24.png" alt="Indian rupee coins and notes photo" data-caption="Indian notes and coins are legal tender." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/25.png" alt="Debit card credit card payment machine photo" data-caption="Debit and credit cards are examples of plastic money." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type of money</th><th>Meaning</th><th>Examples or important points</th></tr></thead><tbody><tr><td>Accounting money or proper money</td><td>The currency in which debt, sale of goods and purchasing power are expressed</td><td>Indian rupee, US dollar, pound sterling, euro, rouble, dirham and other national currencies</td></tr><tr><td>Legal tender</td><td>Money that is legally accepted in settlement of debt and payment obligations</td><td>Issued by the government or the central bank; refusal to accept legal tender for a valid payment can be legally problematic</td></tr><tr><td>Optional money or credit money</td><td>Money accepted on the option or faith of the receiver</td><td>Cheques, bank drafts, promissory notes and bills of exchange</td></tr><tr><td>Token money</td><td>Face value is greater than the intrinsic metal value</td><td>Coins are commonly token money, because their metal value is lower than the value written on them</td></tr><tr><td>Standard money</td><td>Actual value and face value are equal</td><td>Historically linked with gold or silver coins of full value</td></tr><tr><td>Plastic money</td><td>Cards used for payment and withdrawal</td><td>Debit cards and credit cards</td></tr></tbody></table>
      <p class="cp-lead">A rupee coin is made of cheap metal that is worth much less than one rupee, so it is token money. An old gold coin was worth the same as the value written on it, so it was standard money.</p>
      <div class="cp-note trap">Token money has face value more than metal value, while standard money has both values equal.</div>
    `
  },
  50: {
    questext: "In which type of money is the face value greater than the intrinsic metal value?",
    options: ["Standard money", "Token money", "Credit money", "Plastic money"],
    correct: "2",
    exptext: "✅ In token money, the face value is greater than the value of the metal. 📌 Token means a symbol of value. ❌ Standard money is wrong because its face value and actual value are equal."
  },
  51: {
    questext: "Cheques and bank drafts are examples of which type of money?",
    options: ["Legal tender", "Token money", "Standard money", "Optional or credit money"],
    correct: "4",
    exptext: "✅ Cheques and drafts are accepted on the faith of the receiver, so they are optional or credit money. 📌 Option means the receiver can refuse. ❌ Legal tender is wrong because it must be accepted for valid payments."
  },
  52: {
    questext: "Debit cards and credit cards are examples of which type of money?",
    options: ["Plastic money", "Metallic money", "Token money", "Standard money"],
    correct: "1",
    exptext: "✅ Debit and credit cards are plastic money. 📌 Cards are plastic. ❌ Metallic money is wrong because it is made of metal such as coins."
  },
  53: {
    questext: "Which type of money has an actual value equal to its face value?",
    options: ["Token money", "Plastic money", "Standard money", "Optional money"],
    correct: "3",
    exptext: "✅ In standard money, the actual value and the face value are equal. 📌 Standard means equal. ❌ Token money is wrong because its metal value is lower than its face value."
  },
  54: {
    type: "concept", icon: "🔥", accent: "#10b981", pauseTimer: true,
    title: "Types of Money: Near Money, Hot Money and Others",
    html: `
      <p class="cp-lead">Some more types of money are used in banking and in international trade. <u>Learn each one by its meaning and a simple example.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/26.png" alt="Six cards in two rows: Near money (gold and silver bars), Hot money (arrows moving between" data-caption="Six more types of money shown with simple pictures." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/27.png" alt="Gold bars and silver bars photo" data-caption="Gold and silver are common examples of near money." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Type of money</th><th>Meaning</th><th>Examples or important points</th></tr></thead><tbody><tr><td>Near money</td><td>An asset that can be quickly and easily converted into money</td><td>Gold and silver are common examples; bonds and savings deposits are also near money</td></tr><tr><td>Hot money</td><td>Short-term capital that moves quickly between countries or markets for higher returns</td><td>Very sensitive to interest rates, exchange rates and market expectations</td></tr><tr><td>Hard currency</td><td>A stable and widely accepted currency of a strong economy</td><td>US dollar, euro, pound sterling and similar strong currencies</td></tr><tr><td>Soft currency</td><td>A currency that is not widely accepted internationally and may be less stable</td><td>Often linked with weaker external acceptability or convertibility</td></tr><tr><td>Caution money</td><td>A security deposit taken before providing a facility or service</td><td>A deposit taken before rent, hostel, contract or service</td></tr><tr><td>Metallic money</td><td>Money made of metal</td><td>Coins made from copper, nickel, silver, gold or alloys</td></tr><tr><td>Paper money</td><td>Money in paper form, issued by the authority of the government or the central bank</td><td>Currency notes are the most common form</td></tr></tbody></table>
      <p class="cp-lead">Hot money is like a visitor who comes for quick profit and leaves quickly. When interest rates abroad become better, it can move out of a country within days.</p>
      <div class="cp-note trap">Hot money is short-term and moves fast, so it can suddenly leave a country and create trouble in the market.</div>
      <div class="cp-note remember">Hard currency is strong and stable. Soft currency is weaker and less accepted abroad.</div>
    `
  },
  55: {
    questext: "Short-term capital that moves quickly between countries for higher returns is called which of the following?",
    options: ["Near money", "Caution money", "Hot money", "Hard currency"],
    correct: "3",
    exptext: "✅ Short-term capital that moves quickly for higher returns is hot money. 📌 Hot money runs fast. ❌ Near money is wrong because it means an asset that can be easily changed into money."
  },
  56: {
    questext: "A security deposit taken before providing a facility, such as a hostel, is called which of the following?",
    options: ["Caution money", "Hot money", "Near money", "Soft currency"],
    correct: "1",
    exptext: "✅ A security deposit taken before a service is caution money. 📌 Caution means security. ❌ Hot money is wrong because it is capital that moves between markets."
  },
  57: {
    questext: "Which of the following is an example of a hard currency?",
    options: ["A currency that is not accepted widely", "The US dollar", "A weak and unstable currency", "A currency with no convertibility"],
    correct: "2",
    exptext: "✅ The US dollar is a stable and widely accepted currency, so it is a hard currency. 📌 Hard means strong. ❌ The other options describe a soft currency."
  },
  58: {
    questext: "Near money is best described as which of the following?",
    options: ["Money made of metal", "Cards used for payment", "A deposit taken before service", "An asset that can be quickly and easily converted into money"],
    correct: "4",
    exptext: "✅ Near money is an asset that can be quickly and easily converted into money. 📌 Near means almost money. ❌ Cards used for payment is wrong because that is plastic money."
  },
  59: {
    type: "concept", icon: "⚖️", accent: "#eab308", pauseTimer: true,
    title: "Legal Tender versus Optional Money",
    html: `
      <p class="cp-lead">Legal tender and optional money differ in one big way. <u>Legal tender must be accepted by law, but optional money is accepted only if the receiver agrees.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/28.png" alt="Two-column comparison: left LEGAL TENDER (notes and coins, must be accepted by law), right" data-caption="Legal tender and optional money compared side by side." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/29.png" alt="Shop counter scene: a customer offering a currency note (accepted, green tick) and a chequ" data-caption="A shopkeeper must take notes but may refuse a cheque." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Legal tender</th><th>Optional or credit money</th></tr></thead><tbody><tr><td>Acceptance</td><td>Must be accepted for valid debt payment under law</td><td>Accepted on trust, convenience and agreement between the parties</td></tr><tr><td>Examples</td><td>Currency notes and coins</td><td>Cheques and drafts</td></tr></tbody></table>
      <p class="cp-lead">A shopkeeper cannot refuse a valid note for a payment. But the shopkeeper can refuse a cheque if there is no trust, because a cheque is only credit money.</p>
      <div class="cp-note trap">Cheques and drafts are not legal tender, even though they are widely used.</div>
      <div class="cp-note exam">Currency notes and coins are legal tender, and cheques and drafts are examples of credit money.</div>
    `
  },
  60: {
    questext: "Which of the following is legal tender?",
    options: ["A cheque", "A bank draft", "A promissory note", "A currency note"],
    correct: "4",
    exptext: "✅ Currency notes and coins are legal tender. 📌 Legal tender must be accepted. ❌ Cheques, drafts and promissory notes are wrong because they are credit money."
  },
  61: {
    questext: "Optional money is accepted on which basis?",
    options: ["Compulsion by law", "Trust, convenience and agreement between parties", "Order of the court", "Order of the central bank"],
    correct: "2",
    exptext: "✅ Optional or credit money is accepted on trust, convenience and agreement. 📌 Option means choice. ❌ Compulsion by law is wrong because that describes legal tender."
  },
  62: {
    questext: "Consider the following statements:\n1. Currency notes and coins are legal tender.\n2. Cheques and drafts are legal tender.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Cheques and drafts are credit money. ❌ Statement 2 is wrong because cheques and drafts are accepted on trust and are not legal tender."
  },
  63: {
    type: "concept", icon: "📦", accent: "#3b82f6", pauseTimer: true,
    title: "Measurement of Money Supply in India",
    html: `
      <p class="cp-lead">Money supply is the total amount of money held by people in an economy in different forms. <u>The Reserve Bank of India measures it in five ways, called M0, M1, M2, M3 and M4.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/30.png" alt="Five nested circles from small to large labelled M0 Reserve Money, M1 Narrow Money, M2, M3" data-caption="The five measures of money supply from the narrowest to the broadest." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/31.png" alt="Reserve Bank of India Mumbai headquarters photo" data-caption="The Reserve Bank of India tracks the money supply." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Measure</th><th>Also known as</th><th>Components</th></tr></thead><tbody><tr><td>M0</td><td>Reserve Money</td><td>Money in circulation plus banks' deposits with the Reserve Bank of India plus other deposits with the Reserve Bank of India</td></tr><tr><td>M1</td><td>Narrow Money</td><td>Currency with the public plus demand deposits with the banking system plus other deposits with the Reserve Bank of India</td></tr><tr><td>M2</td><td>Money with the public plus Post Office savings deposits</td><td>M1 plus Post Office savings deposits</td></tr><tr><td>M3</td><td>Broad Money</td><td>M1 plus time deposits with the banking system</td></tr><tr><td>M4</td><td>Broadest Money</td><td>M3 plus all deposits with post offices except National Savings Certificates</td></tr></tbody></table>
      <p class="cp-lead">The Reserve Bank of India tracks money flow so that monetary policy can be conducted effectively. Money supply indicators help to judge liquidity, inflationary pressure, credit conditions and economic activity.</p>
      <div class="cp-note remember">M0 is the base, M1 is narrow, M3 is broad and M4 is the broadest.</div>
      <div class="cp-note trap">M3 adds time deposits to M1, not to M2. M4 adds post office deposits to M3.</div>
    `
  },
  64: {
    questext: "Which measure of money supply is known as Reserve Money?",
    options: ["M0", "M1", "M3", "M4"],
    correct: "1",
    exptext: "✅ M0 is known as Reserve Money. 📌 Zero is the base. ❌ M1 is wrong because it is known as Narrow Money."
  },
  65: {
    questext: "Which measure of money supply is known as Broad Money?",
    options: ["M1", "M2", "M3", "M4"],
    correct: "3",
    exptext: "✅ M3 is known as Broad Money, and it is M1 plus time deposits with the banking system. 📌 Three means broad. ❌ M4 is wrong because it is the broadest and adds post office deposits."
  },
  66: {
    questext: "M2 is equal to M1 plus which of the following?",
    options: ["Time deposits with banks", "Post Office savings deposits", "Reserve money", "National Savings Certificates"],
    correct: "2",
    exptext: "✅ M2 is M1 plus Post Office savings deposits. 📌 Two goes with post. ❌ Time deposits with banks are added in M3, not in M2."
  },
  67: {
    questext: "Which of the following is the broadest measure of money supply?",
    options: ["M0", "M2", "M3", "M4"],
    correct: "4",
    exptext: "✅ M4 is the broadest, as it is M3 plus all post office deposits except National Savings Certificates. 📌 Four is the last and widest. ❌ M3 is wrong because it does not include post office deposits."
  },
  68: {
    type: "concept", icon: "💧", accent: "#d946ef", pauseTimer: true,
    title: "Liquidity Order",
    html: `
      <p class="cp-lead">Liquidity means how quickly money can be spent. <u>M1 is the most liquid among the common money supply measures.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/32.png" alt="Descending staircase from M1 (most liquid) to M2 to M3 to M4 (least liquid), with an arrow" data-caption="Liquidity falls and coverage widens from M1 to M4." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/33.png" alt="Simple picture: a wallet with cash (very liquid), a savings passbook (less liquid), a fixe" data-caption="Cash is most liquid and a fixed deposit is less liquid." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Detail</th></tr></thead><tbody><tr><td>Most liquid measure</td><td>M1</td></tr><tr><td>Order of liquidity</td><td>M1 is greater than M2, M2 is greater than M3, and M3 is greater than M4</td></tr><tr><td>From M1 to M4</td><td>Coverage becomes broader, but liquidity becomes comparatively lower</td></tr></tbody></table>
      <div class="cp-formula" translate="no"><small>Liquidity order</small>M1 &gt; M2 &gt; M3 &gt; M4</div>
      <p class="cp-lead">Cash in hand can be spent at once, so it is the most liquid. Money locked in a time deposit or a post office account takes more effort to use, so the wider measures are less liquid.</p>
      <div class="cp-note trap">A bigger measure is not more liquid. M4 is the largest, but it is the least liquid.</div>
    `
  },
  69: {
    questext: "Which is the most liquid among the common money supply measures?",
    options: ["M1", "M2", "M3", "M4"],
    correct: "1",
    exptext: "✅ M1 is the most liquid measure. 📌 One is the nearest to cash. ❌ M4 is wrong because it is the broadest and the least liquid."
  },
  70: {
    questext: "Which of the following shows the correct order of liquidity?",
    options: ["M4 > M3 > M2 > M1", "M2 > M1 > M3 > M4", "M1 > M2 > M3 > M4", "M3 > M1 > M2 > M4"],
    correct: "3",
    exptext: "✅ The order of liquidity is M1 greater than M2 greater than M3 greater than M4. 📌 Liquidity falls as the number rises. ❌ Option 1 is wrong because it reverses the order."
  },
  71: {
    questext: "As we move from M1 to M4, what happens?",
    options: ["Coverage becomes narrower and liquidity higher", "Coverage and liquidity both rise", "Coverage becomes broader but liquidity becomes lower", "Coverage and liquidity both fall"],
    correct: "3",
    exptext: "✅ Coverage becomes broader, but liquidity becomes lower. 📌 Wide but less liquid. ❌ Coverage narrower and liquidity higher is wrong because it is the opposite."
  },
  72: {
    type: "concept", icon: "✖️", accent: "#059669", pauseTimer: true,
    title: "Money Multiplier",
    html: `
      <p class="cp-lead">The money multiplier shows how much money supply is created from each unit of reserve money. <u>In India it is measured as the ratio of broad money (M3) to reserve money (M0).</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/34.png" alt="Formula picture: Money Multiplier equals M3 divided by M0, with a small bar M0 of height 1" data-caption="A small base of reserve money supports a larger broad money supply." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/Inflation_and_Types_of_Money/35.png" alt="Example box: M3 equals 120 and M0 equals 20, so Money Multiplier equals 120 divided by 20 " data-caption="A worked example of the money multiplier." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <div class="cp-formula" translate="no"><small>Money Multiplier</small>Money Multiplier = M3 ÷ M0</div>
      <table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody><tr><td>Broad Money</td><td>M3</td></tr><tr><td>Reserve Money</td><td>M0</td></tr><tr><td>Money Multiplier</td><td>Broad Money divided by Reserve Money</td></tr></tbody></table>
      <p class="cp-lead">Banks give loans from the deposits they receive, and those loans come back as new deposits. So a small amount of reserve money supports a much larger money supply, and the multiplier measures how many times larger.</p>
      <div class="cp-example"><b>Example:</b> If broad money is 120 crore rupees and reserve money is 20 crore rupees, the money multiplier is 120 divided by 20, which is 6.</div>
      <div class="cp-note trap">The multiplier uses M3 on top and M0 at the bottom. Do not reverse them.</div>
    `
  },
  73: {
    questext: "In India, the money multiplier is the ratio of which two measures?",
    options: ["M1 to M0", "M3 to M0", "M0 to M3", "M4 to M1"],
    correct: "2",
    exptext: "✅ The money multiplier is M3 divided by M0, that is, broad money divided by reserve money. 📌 Broad over reserve. ❌ M0 to M3 is wrong because it reverses the ratio."
  },
  74: {
    questext: "If broad money is 120 crore rupees and reserve money is 20 crore rupees, what is the money multiplier?",
    options: ["4", "5", "6", "8"],
    correct: "3",
    exptext: "✅ The multiplier is 120 divided by 20, which is 6. 📌 Broad money divided by reserve money. ❌ The other numbers are wrong because they do not match this division."
  },
  75: {
    questext: "Consider the following statements about the money multiplier:\n1. It is the ratio of broad money to reserve money.\n2. It is the ratio of narrow money to broad money.\nWhich of the statements given above is correct?",
    options: ["Only 2", "Both 1 and 2", "Neither 1 nor 2", "Only 1"],
    correct: "4",
    exptext: "✅ Only statement 1 is correct. 📌 Money Multiplier equals M3 divided by M0. ❌ Statement 2 is wrong because narrow money is M1 and it is not used in this ratio."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a thin gold-lined rupee sign, a few real-looking gold coins and a subtle rising price arrow" },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/1.png": { t: "fig", about: "Two panels: left panel Inflation with a price tag arrow going up and the label Purchasing power falls; right panel Deflation with a price tag arrow going down and the label Demand may fall." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Vegetable market prices rise shopper India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/2.png. a shopper buying vegetables at an Indian market",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/3.png": { t: "fig", about: "Four cards in a row: Skewflation (fruit up, clothes down), Stagflation (prices up, jobs weak), Reflation (rate cut arrow, revive), Disinflation (8 down to 5 percent)." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fruit seller market stall photo India\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/4.png. a fruit stall with fruits on display in an Indian market",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/5.png": { t: "fig", about: "Three linked boxes in a chain: GDP growth zero or negative, then Unemployment rises, then Prices keep rising because of supply or cost pressure." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/6.png": { t: "fig", about: "Balance picture: left weight labelled Weak growth and jobs, right weight labelled High prices, with the title Stagflation both at once." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/7.png": { t: "fig", about: "Downward sloping curve with Unemployment rate on the horizontal axis (3 and 5) and Inflation rate on the vertical axis (4 and 2); point at 3 and 4 labelled High inflation equals low unemployment; point at 5 and 2 labelled Low inflation equals high unemployment." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/8.png": { t: "fig", about: "Three-row comparison picture: Boom-like situation (demand high, unemployment low, inflation high), Slowdown-like situation (demand low, unemployment high, inflation low), Stagflation exception (demand weak, unemployment high, inflation high)." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/9.png": { t: "fig", about: "Five-step staircase going up with labels Creeping 0 to 3, Walking 3 to 10, Running 10 to 20, Galloping 20 to 100, Hyper above 100, with a small snail, walker, runner, horse and rocket icon." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/10.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Zimbabwe 100 trillion dollar banknote hyperinflation photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/10.png. a Zimbabwe hundred trillion dollar banknote",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/11.png": { t: "fig", about: "Two circles: a big circle labelled Headline Inflation (whole price index) and a smaller inner circle labelled Core Inflation (without food and fuel)." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/12.png": { t: "fig", about: "Two arrows pointing to a price tag: left arrow Cost-push (production cost rises), right arrow Demand-pull (excess demand)." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/13.png": { t: "fig", about: "Flow diagram: Rising costs boxes (labour, raw material, machinery, tax, capital, electricity) feeding into a box Production cost up, then an arrow to Price of final goods up." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/14.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Factory workers production line India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/14.png. workers on a factory production line in India",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/15.png": { t: "fig", about: "Seesaw picture: a heavy left side labelled Demand (many buyers with money) and a light right side labelled Supply (few goods), with a price arrow rising." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Crowded shopping mall festival season India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/16.png. a crowded shopping mall during a festival",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/17.png": { t: "fig", about: "Three boxes: CPI shop and consumer icon labelled Retail prices goods and services; WPI warehouse icon labelled Wholesale prices only goods; GDP Deflator whole economy icon labelled All final goods and services." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/18.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Retail shop customer billing grocery store India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/18.png. a customer at a grocery shop counter",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/19.png": { t: "fig", about: "Four boxes: CPI Combined (rural plus urban, National Statistical Office), CPI-IW (industrial workers, Labour Bureau), CPI-RL (rural labourers, Labour Bureau), CPI-AL (agricultural labourers, Labour Bureau)." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/20.png": { t: "fig", about: "Formula picture: GDP Deflator equals Nominal GDP at market price divided by Real GDP at base-year price, multiplied by 100." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/21.png": { t: "fig", about: "Formula picture: M V = P T with labels M Money supply, V Velocity of money, P Price level, T Volume of transactions." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/22.png": { t: "fig", about: "Balance picture: left pan Money supply up with an arrow, right pan Price level up with an arrow, with the note V and T stay constant." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/23.png": { t: "fig", about: "Six small cards in two rows: Accounting money (rupee, dollar), Legal tender (notes and coins), Optional money (cheque), Token money (coin), Standard money (gold coin), Plastic money (debit and credit cards)." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/24.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian rupee coins and notes photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/24.png. Indian rupee notes and coins together on a table",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Debit card credit card payment machine photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/25.png. a debit card being used at a payment machine",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/26.png": { t: "fig", about: "Six cards in two rows: Near money (gold and silver bars), Hot money (arrows moving between countries), Hard currency (strong coin), Soft currency (weak coin), Caution money (deposit receipt), Metallic money (coins)." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Gold bars and silver bars photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/27.png. gold bars and silver bars together",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/28.png": { t: "fig", about: "Two-column comparison: left LEGAL TENDER (notes and coins, must be accepted by law), right OPTIONAL MONEY (cheque and draft, accepted on trust)." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/29.png": { t: "fig", about: "Shop counter scene: a customer offering a currency note (accepted, green tick) and a cheque (shopkeeper may refuse, question mark)." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/30.png": { t: "fig", about: "Five nested circles from small to large labelled M0 Reserve Money, M1 Narrow Money, M2, M3 Broad Money, M4 Broadest Money." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Reserve Bank of India Mumbai headquarters photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/Inflation_and_Types_of_Money/31.png. the Reserve Bank of India building in Mumbai",
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/32.png": { t: "fig", about: "Descending staircase from M1 (most liquid) to M2 to M3 to M4 (least liquid), with an arrow Coverage wider and an opposite arrow Liquidity lower." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/33.png": { t: "fig", about: "Simple picture: a wallet with cash (very liquid), a savings passbook (less liquid), a fixed deposit receipt (even less liquid), labelled from most to least liquid." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/34.png": { t: "fig", about: "Formula picture: Money Multiplier equals M3 divided by M0, with a small bar M0 of height 1 and a tall bar M3 of height 4." },
  "images/General_Awareness/Economics/Inflation_and_Types_of_Money/35.png": { t: "fig", about: "Example box: M3 equals 120 and M0 equals 20, so Money Multiplier equals 120 divided by 20 equals 6." }
});

/* CHANGE LOG
   - Consumer Price Index: the base year is now 2024 (new series released on 12 February 2026); the earlier base year was 2011-12 (2012). Both are shown.
   - Wholesale Price Index: the base year is now 2022-23 (new series released in June 2026); the earlier base year was 2011-12. Both are shown.
   - Gross Domestic Product: the base year of national accounts is now 2022-23 (released on 27 February 2026); the earlier base year was 2011-12.
   - Hyperinflation: the rate bands for the five types of inflation are approximate and differ slightly between textbooks.
   - Near money: the examples were widened to include bonds and savings deposits along with gold and silver, because gold and silver are only one example.
   - Hot money and hard currency: wording simplified; no change of fact.
*/