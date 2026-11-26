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

/* Field: General_Awareness · Subject: Economics · Chapter: International_Financial_Institutions_and_Agriculture · 18 concept pages (+ overview) · 38 questions */

window.TEST_DATA = {
  1: {
    type: "concept", icon: "🏛️", accent: "#6366f1", pauseTimer: true,
    title: "Class Overview — International Financial Institutions and Agriculture",
    thumb: {
      image: "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/thumbnail.png",
      banner: "ECONOMICS • GENERAL AWARENESS",
      line1: "WORLD BANKS",
      line2: "AND AGRICULTURE",
      line3: "MSP • REVOLUTIONS",
      badge: "FULL CHAPTER",
      ribbon: "IMF • WORLD BANK • MSP • GREEN REVOLUTION",
      burst: "",
      mode: "creator"
    },
    yt: {
      title: "IMF, World Bank, ADB, NDB, AIIB and Agriculture in India | SSC CGL Economics",
      altTitles: ["MSP, Green Revolution and Colour Revolutions Easy Table", "IMF vs World Bank Full Comparison for SSC CGL"],
      description: "International institutions and agriculture are favourite topics of the Staff Selection Commission exams. In this class we learn the International Monetary Fund, the World Bank, three Asian banks, Minimum Support Price, types of farming and all the agricultural revolutions in a simple order.\n\n📌 IN THIS CLASS\n✅ International Monetary Fund and World Bank\n✅ ADB, NDB and AIIB\n✅ Minimum Support Price\n✅ Types of farming\n✅ Colour revolutions\n\n⏱️ CHAPTERS\n00:00 Class overview\n\n👍 Like, share, subscribe.\n\n#SSCCGL #IMF #Agriculture",
      tags: ["imf and world bank", "brettonwoods twins", "adb ndb aiib", "gatt to wto", "minimum support price", "msp crops list", "contract farming", "organic farming sikkim", "green revolution", "operation flood", "colour revolutions", "economics for ssc cgl", "general awareness economics", "SSC CGL", "UPSC", "Banking", "Railways", "Defence", "competitive exams", "full class", "tricks", "questions", "MCQ", "previous year questions", "exam preparation", "important questions", "concept class", "one shot", "static GK", "International Financial Instit", "Economics class"],
      hashtags: ["SSCCGL", "IMF", "Agriculture"],
      thumbText: "IMF, WORLD BANK AND AGRICULTURE",
      pinnedComment: "📌 Solve the questions and write your score below 👇",
      communityPost: "📊 New class is live: IMF, World Bank, ADB, NDB, AIIB plus MSP and agricultural revolutions. Try the questions and tell me your score! 🎯",
      chapters: "00:00 Class overview",
      playlist: "General Awareness — Economics"
    },
    html: `
      <p class="cp-lead">A <u>simple, step-by-step class in two parts</u>: first the big international banks and trade bodies, and then farming in India, with prices, farming types and the colourful list of agricultural revolutions. Both parts give many short facts that the Staff Selection Commission exams like to ask.</p>
      <div class="cp-stats">
        <div class="cp-stat"><b>18</b><span>Concept pages</span></div>
        <div class="cp-stat"><b>38</b><span>Questions</span></div>
        <div class="cp-stat"><b>~74 min</b><span>Time needed</span></div>
      </div>
      <div class="cp-divider">Your roadmap</div>
      <ul class="cp-timeline">
        <li><b>International Financial Institutions</b><br>The International Monetary Fund, the World Bank, and the three Asian banks: who set them up, where they sit and who holds how much.</li>
        <li><b>Bretton Woods, GATT and the World Trade Organization</b><br>How the world money system was planned in 1944 and how the old trade agreement became the World Trade Organization.</li>
        <li><b>Agriculture in India and Minimum Support Price</b><br>How much farming matters to the economy and how the government protects farmers' prices.</li>
        <li><b>Types of Farming</b><br>Contract, cooperative and organic farming, explained with simple examples.</li>
        <li><b>Revolutions in Agriculture</b><br>The Green Revolution, Operation Flood and the other colour revolutions with the product linked to each.</li>
      </ul>
      <div class="cp-note exam"><b>Why it matters:</b> questions ask for headquarters, stakeholders, full forms and the product linked to each revolution, and these are easy marks once you remember the pairs.</div>
    `
  },
  2: {
    type: "concept", icon: "🏛️", accent: "#22c55e", pauseTimer: true,
    title: "Major International Financial Institutions",
    html: `
      <p class="cp-lead">International financial institutions are banks and funds that many countries own together. <u>They lend money and give financial help across the world.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/1.png" alt="International Monetary Fund headquarters Washington photo" data-caption="The headquarters of the International Monetary Fund in Washington." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/2.png" alt="World Bank headquarters Washington photo" data-caption="The headquarters of the World Bank in Washington." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/3.png" alt="Five boxes in a row with short names: IMF, World Bank, ADB, NDB, AIIB." data-caption="The five major international financial institutions." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Short form</th><th>Full name</th></tr></thead><tbody><tr><td>IMF</td><td>International Monetary Fund</td></tr><tr><td>World Bank or IBRD</td><td>International Bank for Reconstruction and Development</td></tr><tr><td>ADB</td><td>Asian Development Bank</td></tr><tr><td>NDB</td><td>New Development Bank, also called the BRICS Bank</td></tr><tr><td>AIIB</td><td>Asian Infrastructure Investment Bank</td></tr></tbody></table>
      <p class="cp-lead">The first two are global and the last three are Asian or regional in their focus. Each has its own headquarters, members and rules about who holds how much, which we will learn one by one.</p>
      <div class="cp-note trap">Do not mix the New Development Bank with the Asian Development Bank. The first is the BRICS Bank, and the second was set up in 1966.</div>
      <div class="cp-note exam">Remember "IMF and World Bank in Washington, ADB in Manila, NDB in Shanghai, AIIB in Beijing".</div>
    `
  },
  3: {
    questext: "Which of the following is also called the BRICS Bank?",
    options: ["Asian Development Bank", "Asian Infrastructure Investment Bank", "International Monetary Fund", "New Development Bank"],
    correct: "4",
    exptext: "✅ The New Development Bank was set up by the BRICS countries. 📌 BRICS Bank, NDB. ❌ The Asian Development Bank is much older."
  },
  4: {
    questext: "The full form of IBRD is:",
    options: ["Indian Bank for Rural Development", "International Board for Regional Development", "International Bank for Reconstruction and Development", "Inter-Bank Reserve Department"],
    correct: "3",
    exptext: "✅ IBRD stands for International Bank for Reconstruction and Development, the World Bank. 📌 Reconstruction after war. ❌ The other options are not real institutions."
  },
  5: {
    type: "concept", icon: "🕰️", accent: "#f59e0b", pauseTimer: true,
    title: "Historical Background — Brettonwoods Conference (1944)",
    html: `
      <p class="cp-lead">In 1944, while World War II was ending, leaders met at <b>Bretton Woods</b> in the United States to plan the money system of the world after the war.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/4.png" alt="Bretton Woods Conference 1944 Mount Washington Hotel photo" data-caption="The Bretton Woods Conference of 1944 in New Hampshire." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/5.png" alt="Timeline strip: World War II 1939 to 1945, Bretton Woods Conference 1944, Cold War 1945 to" data-caption="The conference came near the end of the war." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Institution</th><th>Short role</th></tr></thead><tbody><tr><td>International Monetary Fund</td><td>Financial stability and support for member countries facing Balance of Payments trouble</td></tr><tr><td>IBRD or World Bank</td><td>Development loans to poor and less developed nations</td></tr><tr><td>GATT (General Agreement on Tariffs and Trade)</td><td>A framework for international trade rules, which later became the World Trade Organization</td></tr></tbody></table>
      <p class="cp-lead">The International Monetary Fund and the International Bank for Reconstruction and Development together are called the <b>Bretton Woods Twins</b>, because they were born from the same conference.</p>
      <div class="cp-note trap">The twins are the International Monetary Fund and the World Bank. The General Agreement on Tariffs and Trade is not one of them.</div>
      <div class="cp-note exam">Remember "1944, Bretton Woods, IMF plus World Bank equals twins".</div>
    `
  },
  6: {
    questext: "The Bretton Woods Twins are:",
    options: ["IMF and World Trade Organization", "IMF and World Bank", "World Bank and Asian Development Bank", "New Development Bank and Asian Infrastructure Investment Bank"],
    correct: "2",
    exptext: "✅ The International Monetary Fund and the World Bank were born at the Bretton Woods Conference. 📌 Same conference, twins. ❌ The World Trade Organization came much later, in 1995."
  },
  7: {
    questext: "In which year was the Bretton Woods Conference held?",
    options: ["1939", "1947", "1995", "1944"],
    correct: "4",
    exptext: "✅ It was held in 1944, near the end of the World War II. 📌 1944 for twins. ❌ 1995 is the year the World Trade Organization began."
  },
  8: {
    type: "concept", icon: "🔁", accent: "#ef4444", pauseTimer: true,
    title: "GATT → WTO",
    html: `
      <p class="cp-lead">The <b>General Agreement on Tariffs and Trade</b> (GATT) was a set of trade rules. After long talks it was turned into the <b>World Trade Organization</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/6.png" alt="Flow with four boxes: GATT, Uruguay Round 1986 to 1993, Marrakesh Agreement 1994, WTO 1995" data-caption="The path from GATT to the World Trade Organization." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/7.png" alt="Marrakesh Agreement 1994 signing Morocco photo" data-caption="The signing of the Marrakesh Agreement in 1994." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Step</th><th>Fact</th></tr></thead><tbody><tr><td>General Agreement on Tariffs and Trade</td><td>Rules for world trade, founded in 1947</td></tr><tr><td>Uruguay Round</td><td>Long trade talks from 1986 to 1993</td></tr><tr><td>Marrakesh Agreement</td><td>Signed in 1994</td></tr><tr><td>World Trade Organization</td><td>Started on 1 January 1995</td></tr></tbody></table>
      <p class="cp-lead">GATT was only an agreement, but the World Trade Organization is a full organisation with power to settle trade disputes.</p>
      <div class="cp-note trap">The talks that created the World Trade Organization were the Uruguay Round, and the agreement was signed at Marrakesh.</div>
      <div class="cp-note exam">Remember "GATT, Uruguay, Marrakesh, WTO".</div>
    `
  },
  9: {
    questext: "Which round of talks led to the creation of the World Trade Organization?",
    options: ["Doha Round", "Tokyo Round", "Uruguay Round", "Kennedy Round"],
    correct: "3",
    exptext: "✅ The Uruguay Round of 1986 to 1993 led to it. 📌 U for Uruguay, U for the start of the World Trade Organization. ❌ The Doha Round came later."
  },
  10: {
    type: "concept", icon: "🌐", accent: "#8b5cf6", pauseTimer: true,
    title: "WTO (World Trade Organisation)",
    html: `
      <p class="cp-lead">The <b>World Trade Organization</b> began on <b>1 January 1995</b> and has its headquarters in <b>Geneva, Switzerland</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/8.png" alt="World Trade Organization headquarters Geneva building photo" data-caption="The headquarters of the World Trade Organization in Geneva." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/9.png" alt="A globe with two arrows labelled Free trade among nations and Globalisation." data-caption="The two objectives of the World Trade Organization." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Key point</th><th>Details</th></tr></thead><tbody><tr><td>Established</td><td>1 January 1995</td></tr><tr><td>Headquarters</td><td>Geneva, Switzerland</td></tr><tr><td>Objective 1</td><td>To promote free trade among nations</td></tr><tr><td>Objective 2</td><td>To promote globalisation</td></tr></tbody></table>
      <p class="cp-lead">Free trade means trade with little or no barriers. Globalisation means economies becoming closely linked.</p>
      <div class="cp-note trap">The headquarters is in Geneva, not in Washington. Washington is the home of the International Monetary Fund and the World Bank.</div>
      <div class="cp-note exam">Remember "WTO, 1995, Geneva".</div>
    `
  },
  11: {
    questext: "Where is the headquarters of the World Trade Organization?",
    options: ["Washington", "Geneva", "Manila", "Beijing"],
    correct: "2",
    exptext: "✅ It is in Geneva, Switzerland. 📌 Geneva for trade. ❌ Washington has the International Monetary Fund."
  },
  12: {
    questext: "The World Trade Organization was established in:",
    options: ["1995", "1944", "1947", "1991"],
    correct: "1",
    exptext: "✅ It began on 1 January 1995. 📌 GATT 1947, WTO 1995. ❌ 1947 is the year of the General Agreement on Tariffs and Trade."
  },
  13: {
    type: "concept", icon: "⚖️", accent: "#14b8a6", pauseTimer: true,
    title: "IMF vs World Bank / IBRD — Detailed Comparison",
    html: `
      <p class="cp-lead">The International Monetary Fund and the World Bank look alike, but their jobs are different. <u>The International Monetary Fund helps in money trouble, and the World Bank helps in development.</u></p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/10.png" alt="Two columns: IMF with Balance of Payments help, World Bank with development loans for poor" data-caption="The International Monetary Fund and the World Bank compared." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/11.png" alt="Kristalina Georgieva IMF Managing Director portrait photo" data-caption="Kristalina Georgieva, Managing Director of the International Monetary Fund." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/12.png" alt="Ajay Banga World Bank President portrait photo" data-caption="Ajay Banga, President of the World Bank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Feature</th><th>International Monetary Fund</th><th>World Bank (IBRD)</th></tr></thead><tbody><tr><td>Founded</td><td>Planned at the Bretton Woods Conference, 1944</td><td>Planned at the Bretton Woods Conference, 1944</td></tr><tr><td>Headquarters</td><td>Washington DC, United States</td><td>Washington DC, United States</td></tr><tr><td>Purpose</td><td>Loans and help to member countries in a Balance of Payments or dollar crisis</td><td>Loans to developing and less developed countries to remove poverty and build infrastructure</td></tr><tr><td>Head</td><td>Traditionally a European</td><td>Traditionally an American</td></tr><tr><td>Present head</td><td>Kristalina Georgieva</td><td>Ajay Banga</td></tr></tbody></table>
      <div class="cp-note trap">Both are in Washington, so the headquarters can never be the difference. The difference is the purpose.</div>
      <div class="cp-note exam">Remember "IMF equals crisis help, World Bank equals development loans".</div>
    `
  },
  14: {
    questext: "Which institution gives loans to member countries facing a Balance of Payments crisis?",
    options: ["World Bank", "Asian Development Bank", "World Trade Organization", "International Monetary Fund"],
    correct: "4",
    exptext: "✅ The International Monetary Fund helps countries in a Balance of Payments crisis. 📌 IMF equals crisis. ❌ The World Bank gives development loans."
  },
  15: {
    questext: "Who is the present head of the World Bank?",
    options: ["Kristalina Georgieva", "Dilma Rousseff", "Ajay Banga", "Masatsugu Asakawa"],
    correct: "3",
    exptext: "✅ Ajay Banga is the President of the World Bank. 📌 Banga for the bank. ❌ Kristalina Georgieva heads the International Monetary Fund."
  },
  16: {
    questext: "Consider the following statements:\n1. The head of the International Monetary Fund is traditionally a European.\n2. The head of the World Bank is traditionally an Asian.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Europe for the fund, America for the bank. ❌ Statement 2 is wrong because the World Bank head is traditionally an American."
  },
  17: {
    type: "concept", icon: "💵", accent: "#ec4899", pauseTimer: true,
    title: "IMF — Additional Key Facts",
    html: `
      <p class="cp-lead">Each member country of the International Monetary Fund has a <b>quota</b>, which is its share of the fund. A bigger quota means a bigger voice.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/13.png" alt="Bar chart with two bars: United States about 17 percent largest, India about 2.8 percent." data-caption="The quota shares of the United States and India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/14.png" alt="Five coins in a basket: Dollar, Euro, Pound, Yen, Yuan, with the title Special Drawing Rig" data-caption="The five currencies of the Special Drawing Rights basket." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Largest stakeholder</td><td>United States, about 17 percent</td></tr><tr><td>India's share</td><td>About 2.8 percent, among the largest shareholders</td></tr><tr><td>Reserve unit</td><td>Special Drawing Rights (SDR), based on a basket of five currencies</td></tr><tr><td>Basket</td><td>United States Dollar, Euro, British Pound, Japanese Yen, Chinese Yuan (Renminbi)</td></tr></tbody></table>
      <p class="cp-lead">Special Drawing Rights are the fund's own reserve unit. They are not a currency you can spend.</p>
      <div class="cp-note trap">The largest stakeholder is the United States, not China or Japan.</div>
      <div class="cp-note exam">Remember "SDR basket of five, the United States is the biggest holder".</div>
    `
  },
  18: {
    questext: "Which country is the largest stakeholder in the International Monetary Fund?",
    options: ["China", "United States", "Japan", "India"],
    correct: "2",
    exptext: "✅ The United States holds the largest quota, about 17 percent. 📌 Largest quota, largest voice. ❌ India's share is much smaller."
  },
  19: {
    type: "concept", icon: "🧩", accent: "#3b82f6", pauseTimer: true,
    title: "Parts / Organs of the World Bank",
    html: `
      <p class="cp-lead">The <b>World Bank Group</b> has five organs, and each does a different job. <u>Questions often ask which one does what.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/15.png" alt="Five boxes under the title World Bank Group: IBRD, IFC, IDA, MIGA, ICSID, each with one sh" data-caption="The five organs of the World Bank Group." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/16.png" alt="International Finance Corporation office photo" data-caption="An office of the International Finance Corporation." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Short form</th><th>Full name</th><th>Function</th></tr></thead><tbody><tr><td>IBRD</td><td>International Bank for Reconstruction and Development</td><td>Core lending arm</td></tr><tr><td>IFC</td><td>International Finance Corporation</td><td>Supports private sector investment in developing countries</td></tr><tr><td>IDA</td><td>International Development Association</td><td>Concessional (low-cost) loans to low-income countries</td></tr><tr><td>MIGA</td><td>Multilateral Investment Guarantee Agency</td><td>Risk insurance and guarantees to promote foreign investment</td></tr><tr><td>ICSID</td><td>International Centre for Settlement of Investment Disputes</td><td>Settles investment disputes; India is not a member</td></tr></tbody></table>
      <p class="cp-lead">India is <b>not</b> a member of the International Centre for Settlement of Investment Disputes. This is a favourite exam fact.</p>
      <div class="cp-note trap">IDA gives easy loans to the poorest countries, while IBRD lends to middle income countries on normal terms.</div>
      <div class="cp-note exam">Remember the order IBRD, IFC, IDA, MIGA, ICSID, and that India is outside ICSID.</div>
    `
  },
  20: {
    questext: "Which organ of the World Bank Group provides risk insurance to promote foreign investment?",
    options: ["MIGA", "IFC", "IDA", "ICSID"],
    correct: "1",
    exptext: "✅ The Multilateral Investment Guarantee Agency gives risk insurance and guarantees. 📌 M for MIGA, M for managing risk. ❌ IFC supports private investment."
  },
  21: {
    questext: "India is NOT a member of which of the following?",
    options: ["International Finance Corporation", "International Development Association", "Multilateral Investment Guarantee Agency", "International Centre for Settlement of Investment Disputes"],
    correct: "4",
    exptext: "✅ India has not joined the International Centre for Settlement of Investment Disputes. 📌 Other four yes, ICSID no. ❌ India is a member of the others."
  },
  22: {
    questext: "Concessional loans to low-income countries are given by:",
    options: ["IBRD", "IFC", "IDA", "MIGA"],
    correct: "3",
    exptext: "✅ The International Development Association gives low-cost loans to the poorest countries. 📌 D for development of the poor. ❌ IBRD lends on normal terms."
  },
  23: {
    type: "concept", icon: "🌏", accent: "#f97316", pauseTimer: true,
    title: "ADB — Asian Development Bank",
    html: `
      <p class="cp-lead">The <b>Asian Development Bank</b> was set up in <b>1966</b> to help the development of Asia. Its headquarters is in <b>Manila, Philippines</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/17.png" alt="Asian Development Bank headquarters Manila photo" data-caption="The headquarters of the Asian Development Bank in Manila." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/18.png" alt="Bar chart with four bars: Japan 15.6, United States 15.6, China 6.4, India 6.3, with the u" data-caption="The four largest stakeholders of the Asian Development Bank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Key point</th><th>Details</th></tr></thead><tbody><tr><td>Established</td><td>1966</td></tr><tr><td>Headquarters</td><td>Manila, Philippines</td></tr><tr><td>Largest stakeholders</td><td>Japan and the United States, 15.6 percent each, then China, 6.4 percent, then India, 6.3 percent</td></tr><tr><td>India's rank</td><td>Fourth largest stakeholder</td></tr></tbody></table>
      <p class="cp-lead">Japan and the United States hold equal top shares. India is fourth, just behind China.</p>
      <div class="cp-note trap">India is fourth, not first. Japan and the United States are joint first.</div>
      <div class="cp-note exam">Remember "ADB, 1966, Manila, Japan equals United States, India fourth".</div>
    `
  },
  24: {
    questext: "Where is the headquarters of the Asian Development Bank?",
    options: ["Beijing", "Manila", "Shanghai", "Tokyo"],
    correct: "2",
    exptext: "✅ The Asian Development Bank is in Manila, Philippines. 📌 ADB, Manila. ❌ Beijing has the Asian Infrastructure Investment Bank."
  },
  25: {
    questext: "What is India's rank among the stakeholders of the Asian Development Bank?",
    options: ["Fourth", "First", "Second", "Third"],
    correct: "1",
    exptext: "✅ India is the fourth largest, after Japan, the United States and China. 📌 Japan, USA, China, India. ❌ Third place belongs to China."
  },
  26: {
    type: "concept", icon: "🏙️", accent: "#84cc16", pauseTimer: true,
    title: "NDB — New Development Bank (BRICS Bank)",
    html: `
      <p class="cp-lead">The <b>New Development Bank</b> was set up by the five BRICS nations. <u>BRICS stands for Brazil, Russia, India, China and South Africa.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/19.png" alt="New Development Bank headquarters Shanghai building photo" data-caption="The headquarters of the New Development Bank in Shanghai." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/20.png" alt="BRICS summit Fortaleza 2014 leaders photo" data-caption="BRICS leaders at the Fortaleza summit in 2014." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Key point</th><th>Details</th></tr></thead><tbody><tr><td>Established</td><td>2014, through the Fortaleza Declaration</td></tr><tr><td>Headquarters</td><td>Shanghai, China</td></tr><tr><td>Founding members</td><td>Brazil, Russia, India, China, South Africa</td></tr><tr><td>Shares of founders</td><td>Equal, 20 percent each</td></tr></tbody></table>
      <p class="cp-lead">Unlike the International Monetary Fund, no founding member has a bigger vote than another, which is why the bank is called balanced.</p>
      <div class="cp-note trap">In the Asian Development Bank, shares are unequal. In the New Development Bank, the founding five hold equal shares.</div>
      <div class="cp-note exam">Remember "NDB, 2014, Fortaleza, Shanghai, 20 percent each".</div>
    `
  },
  27: {
    questext: "The headquarters of the New Development Bank is in:",
    options: ["Beijing", "New Delhi", "Moscow", "Shanghai"],
    correct: "4",
    exptext: "✅ It is in Shanghai, China. 📌 NDB in Shanghai. ❌ Beijing has the Asian Infrastructure Investment Bank."
  },
  28: {
    questext: "Each founding BRICS nation holds what share in the New Development Bank?",
    options: ["10 percent", "15 percent", "20 percent", "26 percent"],
    correct: "3",
    exptext: "✅ Five equal founders hold 20 percent each. 📌 Five times 20 is 100. ❌ 26 percent is China's share in another bank."
  },
  29: {
    type: "concept", icon: "🏗️", accent: "#06b6d4", pauseTimer: true,
    title: "AIIB — Asian Infrastructure Investment Bank",
    html: `
      <p class="cp-lead">The <b>Asian Infrastructure Investment Bank</b> began in <b>2015</b> and its headquarters is in <b>Beijing, China</b>. It lends for roads, power and other infrastructure.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/21.png" alt="Asian Infrastructure Investment Bank headquarters Beijing building photo" data-caption="The headquarters of the Asian Infrastructure Investment Bank in Beijing." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/22.png" alt="Bar chart with three bars: China 26.6, India 7.6, Russia 6, with the unit percent." data-caption="The three largest shareholders of the Asian Infrastructure Investment Bank." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Key point</th><th>Details</th></tr></thead><tbody><tr><td>Established</td><td>2015</td></tr><tr><td>Headquarters</td><td>Beijing, China</td></tr><tr><td>Largest holder</td><td>China, about 26.6 percent</td></tr><tr><td>Second largest</td><td>India, about 7.6 percent</td></tr><tr><td>Third largest</td><td>Russia, about 6 percent</td></tr></tbody></table>
      <p class="cp-lead">China is far ahead of the rest, and India is the second largest stakeholder.</p>
      <div class="cp-note trap">India is second in the Asian Infrastructure Investment Bank but fourth in the Asian Development Bank.</div>
      <div class="cp-note exam">Remember "AIIB, 2015, Beijing, China first, India second".</div>
    `
  },
  30: {
    questext: "Which country is the largest shareholder of the Asian Infrastructure Investment Bank?",
    options: ["India", "China", "Russia", "Japan"],
    correct: "2",
    exptext: "✅ China holds about 26.6 percent. 📌 AIIB, China leads. ❌ India is second."
  },
  31: {
    questext: "India is the how-manyth largest stakeholder in the Asian Infrastructure Investment Bank?",
    options: ["Second", "First", "Third", "Fourth"],
    correct: "1",
    exptext: "✅ India holds about 7.6 percent and is second. 📌 AIIB: India two, ADB: India four. ❌ Third place is Russia."
  },
  32: {
    type: "concept", icon: "🌾", accent: "#a855f7", pauseTimer: true,
    title: "Agriculture — Contribution to India's Economy",
    html: `
      <p class="cp-lead">Farming has been the base of India's economy, but its <b>share of national output</b> has fallen much faster than its <b>share of jobs</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/23.png" alt="Indian farmer ploughing field photo" data-caption="An Indian farmer working in a field." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/24.png" alt="Three bars: At Independence about 50 percent of output, Today about 15 to 18 percent of ou" data-caption="Farming gives a small share of output but many jobs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Measure</th><th>Approximate value</th></tr></thead><tbody><tr><td>Share of Gross Domestic Product at Independence (1947)</td><td>About half</td></tr><tr><td>Share of Gross Domestic Product now</td><td>About 15 to 18 percent</td></tr><tr><td>Share of employment</td><td>Nearly half of the workforce</td></tr></tbody></table>
      <p class="cp-lead">This gap tells us that too many people depend on a sector that produces a small part of the national income. That is why farm incomes are low and reforms are needed.</p>
      <div class="cp-note trap">The share of farming in output and its share in jobs are very different numbers. Do not mix them.</div>
      <div class="cp-note exam">Remember "output share has fallen to about 15 to 18 percent, but jobs stay near half".</div>
    `
  },
  33: {
    questext: "Roughly what share of India's Gross Domestic Product did agriculture contribute at Independence?",
    options: ["About 10 percent", "About 25 percent", "About 75 percent", "About 50 percent"],
    correct: "4",
    exptext: "✅ Farming gave about half of the national output in 1947. 📌 Half then, a sixth now. ❌ 25 percent is too low for 1947."
  },
  34: {
    questext: "Which statement about agriculture in India is correct?",
    options: ["It gives most of the output but few jobs", "It gives most of the output and most jobs", "It gives a small share of output but nearly half the jobs", "It gives few jobs and little output"],
    correct: "3",
    exptext: "✅ Farming's share of output is small, but it still employs nearly half of the workforce. 📌 Small output, big jobs. ❌ Saying farming gives most of the output reverses the facts."
  },
  35: {
    type: "concept", icon: "💰", accent: "#e11d48", pauseTimer: true,
    title: "MSP — Minimum Support Price",
    html: `
      <p class="cp-lead">The <b>Minimum Support Price</b> (MSP) is the minimum price at which the government buys crops from farmers. <u>It protects farmers when market prices fall.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/25.png" alt="Wheat procurement mandi government purchase photo" data-caption="Wheat being weighed at a government purchase centre." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/26.png" alt="Two boxes joined by an arrow: CACP recommends, CCEA approves, then MSP is announced." data-caption="How the Minimum Support Price is fixed." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Step</th><th>Body</th></tr></thead><tbody><tr><td>Recommends</td><td>Commission for Agricultural Costs and Prices (CACP)</td></tr><tr><td>Approves and announces</td><td>Cabinet Committee on Economic Affairs (CCEA)</td></tr></tbody></table>
      <table><thead><tr><th>Group</th><th>Crops</th></tr></thead><tbody><tr><td>7 cereals</td><td>Wheat, paddy, maize, bajra, jowar, ragi, barley</td></tr><tr><td>5 pulses</td><td>Tur (arhar), chana, masur, urad, moong</td></tr><tr><td>7 oilseeds</td><td>Mustard, soyabean, groundnut, sunflower, niger seed, safflower, sesamum</td></tr><tr><td>3 cash crops</td><td>Raw jute, cotton, copra</td></tr><tr><td>Sugarcane</td><td>Price is called Fair and Remunerative Price (FRP), not MSP</td></tr></tbody></table>
      <p class="cp-lead">The government declares prices for 23 crops in all, which are 22 crops under MSP and sugarcane under the Fair and Remunerative Price.</p>
      <div class="cp-note trap">Only sugarcane has the Fair and Remunerative Price. All the other 22 crops have the Minimum Support Price.</div>
      <div class="cp-note exam">Remember "7 plus 5 plus 7 plus 3 equals 22, plus sugarcane makes 23".</div>
    `
  },
  36: {
    questext: "Who recommends the Minimum Support Price of crops?",
    options: ["Reserve Bank of India", "Commission for Agricultural Costs and Prices", "Finance Commission", "Food Corporation of India"],
    correct: "2",
    exptext: "✅ The Commission for Agricultural Costs and Prices recommends it, and the Cabinet Committee on Economic Affairs approves it. 📌 CACP recommends, CCEA approves. ❌ The Food Corporation buys the crops."
  },
  37: {
    questext: "The price of sugarcane is called:",
    options: ["Fair and Remunerative Price", "Minimum Support Price", "Market Intervention Price", "Issue Price"],
    correct: "1",
    exptext: "✅ Sugarcane has the Fair and Remunerative Price. 📌 Sugarcane, FRP. ❌ All other crops have the Minimum Support Price."
  },
  38: {
    questext: "How many crops are covered under the Minimum Support Price system?",
    options: ["7", "12", "30", "22"],
    correct: "4",
    exptext: "✅ There are 22 crops under MSP, and sugarcane has its own price, making 23 in all. 📌 7, 5, 7, 3. ❌ 23 is the total including sugarcane."
  },
  39: {
    type: "concept", icon: "📝", accent: "#4f46e5", pauseTimer: true,
    title: "Contract Farming",
    html: `
      <p class="cp-lead"><b>Contract farming</b> is a legal agreement between a company and a farmer for farm production. <u>The farmer grows what the company needs.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/27.png" alt="Contract farming potato field company farmer photo" data-caption="A farmer growing a crop for a company under contract." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/28.png" alt="Farmer box and Company box with arrows: Crop to company, Seeds and tools to farmer, Fixed " data-caption="In contract farming, the price is fixed before the crop is grown." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Meaning</th></tr></thead><tbody><tr><td>Parties</td><td>A company and a farmer</td></tr><tr><td>Crop choice</td><td>According to the demand of the company</td></tr><tr><td>Inputs</td><td>Seeds, fertilisers and tools come from the company</td></tr><tr><td>Price</td><td>Decided in advance, so market ups and downs do not affect the farmer</td></tr></tbody></table>
      <p class="cp-lead">The main benefit is that the farmer has no price risk. The company gets steady supply.</p>
      <div class="cp-note trap">In contract farming, the farmer deals with the company directly. In cooperative farming, a society of farmers deals with the company.</div>
      <div class="cp-note exam">Remember "contract farming equals fixed price in advance".</div>
    `
  },
  40: {
    questext: "In contract farming, the price of the crop is:",
    options: ["Decided by the market on the day of sale", "Decided by the farmer's village", "Decided in advance", "Decided after harvest"],
    correct: "3",
    exptext: "✅ The price is fixed in advance, so market changes do not harm the farmer. 📌 Contract, fixed. ❌ Market price is what open selling follows."
  },
  41: {
    type: "concept", icon: "🤝", accent: "#059669", pauseTimer: true,
    title: "Cooperative Farming",
    html: `
      <p class="cp-lead">In <b>cooperative farming</b>, a group of farmers forms a cooperative society, and the society makes a contract farming arrangement with a company.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/29.png" alt="Cooperative society farmers meeting village India photo" data-caption="Farmers of a cooperative society meeting together." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/30.png" alt="Many small farm plots joining into one big plot labelled Cooperative Society, with an arro" data-caption="Small plots are pooled into one big farm." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Meaning</th></tr></thead><tbody><tr><td>Cooperative society</td><td>A group of farmers working together</td></tr><tr><td>Problem solved</td><td>Small land holdings, because farmers pool their land</td></tr><tr><td>Who the company deals with</td><td>The society, not individual farmers</td></tr></tbody></table>
      <p class="cp-lead">Small farmers alone cannot deal well with a big company. Together they are stronger.</p>
      <div class="cp-note trap">Cooperative farming solves the problem of small land holdings. Contract farming alone does not.</div>
      <div class="cp-note exam">Remember "cooperative equals pooled land and a society".</div>
    `
  },
  42: {
    questext: "Cooperative farming is mainly useful to solve which problem?",
    options: ["Shortage of water", "Small land holdings", "High taxes", "Lack of roads"],
    correct: "2",
    exptext: "✅ Farmers pool their small plots, so they work like one big farm. 📌 Co-operate, combine land. ❌ Water supply is solved by irrigation."
  },
  43: {
    type: "concept", icon: "🍃", accent: "#b45309", pauseTimer: true,
    title: "Organic Farming",
    html: `
      <p class="cp-lead"><b>Organic farming</b> is chemical-free farming. <u>It uses bio-fertilisers and bio-pesticides instead of chemical ones.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/31.png" alt="Sikkim organic farming vegetables field photo" data-caption="An organic farm in Sikkim, the first fully organic state." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/32.png" alt="Two sides: Chemical farming crossed out, Organic farming with the words Bio-fertiliser and" data-caption="Organic farming replaces chemicals with natural inputs." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Meaning</td><td>Chemical-free farming</td></tr><tr><td>Inputs</td><td>Bio-fertilisers and bio-pesticides</td></tr><tr><td>Nature</td><td>Friendly to the environment and sustainable</td></tr><tr><td>First fully organic state of India</td><td>Sikkim, in 2016</td></tr></tbody></table>
      <p class="cp-lead">A bio-fertiliser is a natural material, such as compost or living bacteria, that feeds the soil.</p>
      <div class="cp-note trap">Sikkim, not Kerala or Himachal Pradesh, was the first state to adopt organic farming fully.</div>
      <div class="cp-note exam">Remember "organic, no chemicals, Sikkim 2016".</div>
    `
  },
  44: {
    questext: "Which was the first state in India to fully adopt organic farming?",
    options: ["Sikkim", "Kerala", "Himachal Pradesh", "Punjab"],
    correct: "1",
    exptext: "✅ Sikkim became fully organic in 2016. 📌 Sikkim, organic, 2016. ❌ Kerala and Himachal Pradesh have only some organic farming."
  },
  45: {
    questext: "Organic farming uses which of the following instead of chemical fertilisers?",
    options: ["Hybrid seeds", "Chemical pesticides", "Heavy machines", "Bio-fertilisers"],
    correct: "4",
    exptext: "✅ Natural bio-fertilisers and bio-pesticides are used. 📌 Organic, natural. ❌ Chemical pesticides are avoided."
  },
  46: {
    type: "concept", icon: "🌾", accent: "#65a30d", pauseTimer: true,
    title: "Green Revolution",
    html: `
      <p class="cp-lead">The <b>Green Revolution</b> was a big rise in food grain production, started in <b>1966-67</b>, with the use of high yielding seeds, mainly in wheat and paddy.</p>
      <div class="cp-figrow n3"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/33.png" alt="M S Swaminathan portrait photo" data-caption="M. S. Swaminathan, the father of the Green Revolution in India." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/34.png" alt="Norman Borlaug wheat field portrait photo" data-caption="Norman E. Borlaug, the father of the Green Revolution in the world." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/35.png" alt="Map-like schematic, not a map: five boxes Punjab, Haryana, Western Uttar Pradesh, Sri Gang" data-caption="The areas where the Green Revolution was strongest." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Related to</td><td>Farming and food production</td></tr><tr><td>Started</td><td>1966-67</td></tr><tr><td>Programme</td><td>High Yield Variety Seeds Programme (HYVP)</td></tr><tr><td>Focus crops</td><td>Wheat and paddy</td></tr><tr><td>Father in India</td><td>M. S. Swaminathan</td></tr><tr><td>Father in the world</td><td>Norman E. Borlaug</td></tr><tr><td>Strongest in</td><td>Punjab, Haryana, Western Uttar Pradesh, and Sri Ganganagar and Hanumangarh in Rajasthan</td></tr></tbody></table>
      <p class="cp-lead">The country was short of food after wars and droughts, so high yielding seeds were brought to farms. Wheat gains came first, then paddy.</p>
      <div class="cp-note trap">The father in India is Swaminathan, and the father in the world is Borlaug. Questions often swap them.</div>
      <div class="cp-note exam">Remember "Green Revolution, 1966-67, wheat, Swaminathan, Punjab and Haryana".</div>
    `
  },
  47: {
    questext: "Who is known as the father of the Green Revolution in India?",
    options: ["Verghese Kurien", "Norman Borlaug", "M. S. Swaminathan", "Jawaharlal Nehru"],
    correct: "3",
    exptext: "✅ M. S. Swaminathan led it in India. 📌 India, Swaminathan; world, Borlaug. ❌ Verghese Kurien is linked with milk."
  },
  48: {
    questext: "The Green Revolution mainly increased the production of:",
    options: ["Milk", "Wheat and paddy", "Fish", "Eggs"],
    correct: "2",
    exptext: "✅ High yielding seeds raised wheat and paddy production. 📌 Green means grains. ❌ Milk belongs to the White Revolution."
  },
  49: {
    questext: "Consider the following statements about the Green Revolution:\n1. It started in 1966-67.\n2. Norman E. Borlaug is called its father in India.\nWhich of the statements given above is correct?",
    options: ["Only 1", "Only 2", "Both 1 and 2", "Neither 1 nor 2"],
    correct: "1",
    exptext: "✅ Only statement 1 is correct. 📌 Borlaug, world; Swaminathan, India. ❌ Statement 2 is wrong because Borlaug is the father in the world."
  },
  50: {
    type: "concept", icon: "🥛", accent: "#db2777", pauseTimer: true,
    title: "Operation Flood — White Revolution",
    html: `
      <p class="cp-lead"><b>Operation Flood</b> is the programme of the <b>White Revolution</b>. It aimed to increase milk production in India and began in <b>1970-71</b>.</p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/36.png" alt="Verghese Kurien Amul portrait photo" data-caption="Verghese Kurien, the father of the White Revolution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/37.png" alt="Amul dairy cooperative milk collection village photo" data-caption="Villagers delivering milk to a dairy cooperative." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Point</th><th>Fact</th></tr></thead><tbody><tr><td>Related to</td><td>Milk production</td></tr><tr><td>Started</td><td>1970-71</td></tr><tr><td>Father of the White Revolution</td><td>Verghese Kurien</td></tr></tbody></table>
      <p class="cp-lead">Because of this programme, India became one of the largest milk producers in the world.</p>
      <div class="cp-note trap">White means milk and green means grain. Do not swap them.</div>
      <div class="cp-note exam">Remember "White Revolution, milk, Operation Flood, Kurien".</div>
    `
  },
  51: {
    questext: "Operation Flood is related to which product?",
    options: ["Milk", "Wheat", "Fish", "Eggs"],
    correct: "1",
    exptext: "✅ Operation Flood increased milk production. 📌 Flood of milk. ❌ Wheat belongs to the Green Revolution."
  },
  52: {
    questext: "The father of the White Revolution in India is:",
    options: ["M. S. Swaminathan", "Norman Borlaug", "Jawaharlal Nehru", "Verghese Kurien"],
    correct: "4",
    exptext: "✅ Verghese Kurien led Operation Flood. 📌 Kurien for milk. ❌ Swaminathan is linked with the Green Revolution."
  },
  53: {
    type: "concept", icon: "🌈", accent: "#0d9488", pauseTimer: true,
    title: "Agriculture Revolutions",
    html: `
      <p class="cp-lead">Many farm sectors have a colour revolution named after them. <u>Learn the colour together with the product.</u></p>
      <div class="cp-figrow n2"><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/38.png" alt="A colour wheel with ten labelled segments: Blue fish, Red meat and tomato, Golden fruits a" data-caption="The ten colour revolutions and their products." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div><div class="cp-figcell"><div class="cp-fig"><img src="images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/39.png" alt="Fish farming pond India blue revolution photo" data-caption="A fish farm, linked with the Blue Revolution." style="display:block;width:100%;max-width:420px;max-height:240px;height:auto;object-fit:contain;margin:10px auto;border-radius:12px"></div></div></div>
      <table><thead><tr><th>Revolution</th><th>Related area</th></tr></thead><tbody><tr><td>Blue</td><td>Fish production and water resources</td></tr><tr><td>Red</td><td>Meat and tomato production</td></tr><tr><td>Golden</td><td>Horticulture (fruits and vegetables) and honey</td></tr><tr><td>Pink</td><td>Onion and medicines (pharmaceuticals)</td></tr><tr><td>Silver</td><td>Eggs and poultry</td></tr><tr><td>Evergreen</td><td>Sustainable, long-term growth in farm output, linked with M. S. Swaminathan</td></tr><tr><td>Silver Fibre</td><td>Cotton</td></tr><tr><td>Round</td><td>Potato</td></tr><tr><td>Rainbow</td><td>All farming sectors together</td></tr><tr><td>Green Gold</td><td>Bamboo</td></tr></tbody></table>
      <p class="cp-lead">A mnemonic: blue is water, white is milk, silver is eggs, golden is fruit, round is potato.</p>
      <div class="cp-note trap">Silver is eggs and silver fibre is cotton. Do not mix them.</div>
      <div class="cp-note exam">Remember the pairs, because the question usually shows a colour and asks for the product.</div>
    `
  },
  54: {
    questext: "The Blue Revolution is related to:",
    options: ["Milk", "Cotton", "Fish production", "Potato"],
    correct: "3",
    exptext: "✅ Blue stands for water and fish production. 📌 Blue is water. ❌ Milk is the White Revolution."
  },
  55: {
    questext: "The Round Revolution is related to the production of:",
    options: ["Wheat", "Potato", "Onion", "Honey"],
    correct: "2",
    exptext: "✅ The Round Revolution is about potato. 📌 Round potato. ❌ Onion belongs to the Pink Revolution."
  },
  56: {
    questext: "Which revolution is related to cotton production?",
    options: ["Silver Fibre Revolution", "Silver Revolution", "Golden Revolution", "Pink Revolution"],
    correct: "1",
    exptext: "✅ The Silver Fibre Revolution is about cotton. 📌 Fibre, cotton. ❌ The Silver Revolution is about eggs."
  },
  57: {
    questext: "Match the revolution with the product: Golden Revolution, Pink Revolution. Which pair is correct?",
    options: ["Golden: milk, Pink: fish", "Golden: eggs, Pink: cotton", "Golden: potato, Pink: bamboo", "Golden: horticulture and honey, Pink: onion and medicines"],
    correct: "4",
    exptext: "✅ Golden is horticulture and honey, and Pink is onion and medicines. 📌 Golden fruits, pink onion. ❌ The other pairs mix up the products."
  }
};

window.IMG_PROMPTS = Object.assign(window.IMG_PROMPTS || {}, {
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/thumbnail.png": { t: "thumb", accent: "#6366f1", objects: "a stack of gold coins, a classical bank building with columns, golden wheat ears and a subtle rising chart line" },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/1.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"International Monetary Fund headquarters Washington photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/1.png. IMF",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/2.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"World Bank headquarters Washington photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/2.png. World Bank",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/3.png": { t: "fig", about: "Five boxes in a row with short names: IMF, World Bank, ADB, NDB, AIIB." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/4.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Bretton Woods Conference 1944 Mount Washington Hotel photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/4.png. conference",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/5.png": { t: "fig", about: "Timeline strip: World War II 1939 to 1945, Bretton Woods Conference 1944, Cold War 1945 to about 1991." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/6.png": { t: "fig", about: "Flow with four boxes: GATT, Uruguay Round 1986 to 1993, Marrakesh Agreement 1994, WTO 1995." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/7.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Marrakesh Agreement 1994 signing Morocco photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/7.png. Marrakesh",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/8.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"World Trade Organization headquarters Geneva building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/8.png. Geneva",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/9.png": { t: "fig", about: "A globe with two arrows labelled Free trade among nations and Globalisation." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/10.png": { t: "fig", about: "Two columns: IMF with Balance of Payments help, World Bank with development loans for poor countries; both with the label Washington." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/11.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Kristalina Georgieva IMF Managing Director portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/11.png. IMF head",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/12.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Ajay Banga World Bank President portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/12.png. World Bank head",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/13.png": { t: "fig", about: "Bar chart with two bars: United States about 17 percent largest, India about 2.8 percent." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/14.png": { t: "fig", about: "Five coins in a basket: Dollar, Euro, Pound, Yen, Yuan, with the title Special Drawing Rights." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/15.png": { t: "fig", about: "Five boxes under the title World Bank Group: IBRD, IFC, IDA, MIGA, ICSID, each with one short word: loans, private, poor, insurance, disputes." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/16.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"International Finance Corporation office photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/16.png. IFC",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/17.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Asian Development Bank headquarters Manila photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/17.png. ADB",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/18.png": { t: "fig", about: "Bar chart with four bars: Japan 15.6, United States 15.6, China 6.4, India 6.3, with the unit percent." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/19.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"New Development Bank headquarters Shanghai building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/19.png. NDB",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/20.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"BRICS summit Fortaleza 2014 leaders photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/20.png. summit",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/21.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Asian Infrastructure Investment Bank headquarters Beijing building photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/21.png. AIIB",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/22.png": { t: "fig", about: "Bar chart with three bars: China 26.6, India 7.6, Russia 6, with the unit percent." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/23.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Indian farmer ploughing field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/23.png. farmer",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/24.png": { t: "fig", about: "Three bars: At Independence about 50 percent of output, Today about 15 to 18 percent of output, Today nearly half of the workforce." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/25.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Wheat procurement mandi government purchase photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/25.png. mandi",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/26.png": { t: "fig", about: "Two boxes joined by an arrow: CACP recommends, CCEA approves, then MSP is announced." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/27.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Contract farming potato field company farmer photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/27.png. contract",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/28.png": { t: "fig", about: "Farmer box and Company box with arrows: Crop to company, Seeds and tools to farmer, Fixed price written in the contract." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/29.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Cooperative society farmers meeting village India photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/29.png. society",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/30.png": { t: "fig", about: "Many small farm plots joining into one big plot labelled Cooperative Society, with an arrow to Company." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/31.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Sikkim organic farming vegetables field photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/31.png. Sikkim",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/32.png": { t: "fig", about: "Two sides: Chemical farming crossed out, Organic farming with the words Bio-fertiliser and Bio-pesticide." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/33.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"M S Swaminathan portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/33.png. Swaminathan",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/34.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Norman Borlaug wheat field portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/34.png. Borlaug",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/35.png": { t: "fig", about: "Map-like schematic, not a map: five boxes Punjab, Haryana, Western Uttar Pradesh, Sri Ganganagar and Hanumangarh in Rajasthan, joined to a wheat ear." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/36.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Verghese Kurien Amul portrait photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/36.png. Kurien",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/37.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Amul dairy cooperative milk collection village photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/37.png. milk",
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/38.png": { t: "fig", about: "A colour wheel with ten labelled segments: Blue fish, Red meat and tomato, Golden fruits and honey, Pink onion and medicine, Silver eggs, Evergreen sustainable farming, Silver Fibre cotton, Round potato, Rainbow all farming, Green Gold bamboo." },
  "images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/39.png": "REAL PHOTO NEEDED (do not generate with AI). Search this text on Google Images: \"Fish farming pond India blue revolution photo\". Download a clear, suitable photo and save it as images/General_Awareness/Economics/International_Financial_Institutions_and_Agriculture/39.png. fish"
});

/* CHANGE LOG
   - The head of the International Monetary Fund is described as traditionally a European, not as always from the European Union; the head of the World Bank is traditionally an American. Current heads: Kristalina Georgieva (second term) and Ajay Banga.
   - The International Monetary Fund and the World Bank were planned at the Bretton Woods Conference in 1944 and began working soon after, so the year 1944 is given as the year of the conference.
   - India's quota share in the International Monetary Fund is given as about 2.8 percent and the share of the United States as about 17 percent; these figures change with quota reviews, so check the latest value before an exam.
   - Agriculture's share of national output and workforce is given as approximate ranges (about one half at Independence, about 15 to 18 percent now, and nearly half of the workforce).
   - MSP is recommended by the Commission for Agricultural Costs and Prices and approved by the Cabinet Committee on Economic Affairs.
   - The Evergreen Revolution is described as sustainable, long-term growth in farm output linked with M. S. Swaminathan, instead of organic farming only.
   - The New Development Bank is described as set up by the five founding BRICS nations with equal 20 percent shares at the start.
*/